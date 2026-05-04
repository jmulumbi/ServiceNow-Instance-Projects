var RoleDriftUtils = Class.create();
RoleDriftUtils.prototype = {
    initialize: function() {},

    runDriftScan: function() {
        var me = this;
        gs.info('RoleDriftDetector: Starting drift scan at ' + new GlideDateTime());

        var userGR = new GlideRecord('sys_user');
        userGR.addActiveQuery();
        userGR.addNotNullQuery('department');
        userGR.addNotNullQuery('title');
        userGR.query();

        var scanned = 0;
        var flagged = 0;

        while (userGR.next()) {
            var userId     = userGR.sys_id.toString();
            var userDeptId = userGR.department.toString();
            var userTitle  = userGR.title.toString();

            var allowedRoles = me._getAllowedRoles(userDeptId, userTitle);
            if (allowedRoles === null) continue;

            var actualRoles  = me._getUserRoles(userId);
            var driftedRoles = me._getDriftedRoles(actualRoles, allowedRoles);

            for (var i = 0; i < driftedRoles.length; i++) {
                me._createOrUpdateDriftRecord(userGR, driftedRoles[i], userDeptId, userTitle);
                flagged++;
            }

            if (driftedRoles.length === 0) me._markUserClean(userId);
            scanned++;
        }

        gs.info('RoleDriftDetector: Scan complete. Scanned: ' + scanned + ', Flagged: ' + flagged);
    },

    _getAllowedRoles: function(deptId, jobTitle) {
        var baselineGR = new GlideRecord('x_1515169_role_d_0_role_baseline');
        baselineGR.addQuery('department', deptId);
        baselineGR.addQuery('job_title', jobTitle);
        baselineGR.setLimit(1);
        baselineGR.query();

        if (!baselineGR.next()) return null;

        var rolesRaw = baselineGR.getValue('allowed_roles');
        if (!rolesRaw) return [];
        return rolesRaw.split(',');
    },

    _getUserRoles: function(userId) {
        var roles = [];
        var uhrGR = new GlideRecord('sys_user_has_role');
        uhrGR.addQuery('user', userId);
        uhrGR.addQuery('state', 'active');
        uhrGR.query();
        while (uhrGR.next()) {
            roles.push(uhrGR.role.toString());
        }
        return roles;
    },

    _getDriftedRoles: function(actualRoles, allowedRoles) {
        var drifted = [];
        for (var i = 0; i < actualRoles.length; i++) {
            if (allowedRoles.indexOf(actualRoles[i]) === -1) {
                drifted.push(actualRoles[i]);
            }
        }
        return drifted;
    },

    _createOrUpdateDriftRecord: function(userGR, roleId, deptId, jobTitle) {
        var existing = new GlideRecord('x_1515169_role_d_0_role_drift_record');
        existing.addQuery('user', userGR.sys_id.toString());
        existing.addQuery('unexpected_role', roleId);
        existing.addQuery('resolved', false);
        existing.setLimit(1);
        existing.query();

        if (existing.next()) {
            existing.setValue('detected_on', new GlideDateTime());
            existing.update();
            return;
        }

        var ragStatus = this._calculateRAGStatus(userGR.sys_id.toString(), roleId);

        var driftGR = new GlideRecord('x_1515169_role_d_0_role_drift_record');
        driftGR.initialize();
        driftGR.setValue('user', userGR.sys_id.toString());
        driftGR.setValue('unexpected_role', roleId);
        driftGR.setValue('department', deptId);
        driftGR.setValue('job_title', jobTitle);
        driftGR.setValue('rag_status', ragStatus);
        driftGR.setValue('detected_on', new GlideDateTime());
        driftGR.setValue('resolved', false);
        driftGR.insert();
    },

    _calculateRAGStatus: function(userId, roleId) {
        var uhrGR = new GlideRecord('sys_user_has_role');
        uhrGR.addQuery('user', userId);
        uhrGR.addQuery('role', roleId);
        uhrGR.addQuery('state', 'active');
        uhrGR.orderBy('sys_created_on');
        uhrGR.setLimit(1);
        uhrGR.query();

        if (!uhrGR.next()) return 'red';

        var granted = new GlideDateTime(uhrGR.getValue('sys_created_on'));
        var now = new GlideDateTime();
        var diff = GlideDateTime.subtract(granted, now);
        var daysDiff = Math.abs(diff.getRoundedDayPart());

        if (daysDiff < 7) return 'amber';
        return 'red';
    },

    _markUserClean: function(userId) {
        var oldDrift = new GlideRecord('x_1515169_role_d_0_role_drift_record');
        oldDrift.addQuery('user', userId);
        oldDrift.addQuery('resolved', false);
        oldDrift.query();
        while (oldDrift.next()) {
            oldDrift.setValue('resolved', true);
            oldDrift.setValue('rag_status', 'green');
            oldDrift.update();
        }
    },

    type: 'RoleDriftUtils'
};