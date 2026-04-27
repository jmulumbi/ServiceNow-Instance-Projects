# ServiceNow Flow Designer — Social Media Response Automation

A two-part automation project built in **ServiceNow Flow Designer** as part of the Now Learning training curriculum. The project automates social media monitor management — from approval routing to negative comment escalation — using no-code/low-code workflow tools.

**Platform:** ServiceNow (Now Learning lab)
**Application scope:** Global / Social Media Management
**Type:** Flow + Subflow

---

## Overview

| | Component | Type | Purpose |
|---|---|---|---|
| Step 1 | Social Media Response Approvals | Flow | Routes monitor records through approval based on priority |
| Step 2 | Social Media Comment Checker | Subflow | Detects high negative comment volume and auto-creates Problem records |

---

## Step 1 — Social Media Response Approvals Flow

Triggers automatically when a Monitor record's **State changes to "In Review" (State = 2)** and routes it through an approval process based on priority level.

### How it works

**Trigger:** Record Updated — Monitor table, State changes to 2

**High-priority path (Priority ≥ 2 — Brand Damaging)**
1. Sets record state → `Pending Approval`
2. Sends approval request to the **Social Media Managers** group
3. If rejected → sets state to `Assigned`, ends flow
4. If approved → sets state to `Approved`, ends flow

**Standard path (Priority < 2)**
1. Sets record state → `Pending Approval`
2. Sends approval request to the **Assignment group's Manager**
3. If rejected → sets state to `Assigned`, ends flow
4. If approved → sets state to `Approved`

<!-- IMAGE: Flow diagram overview (full canvas view) -->
![Flow overview](images/flow-overview.png)

<!-- IMAGE: Close-up of the trigger and first branch (steps 1–4) -->
![Trigger and priority branch](images/flow-steps-1-4.png)

<!-- IMAGE: The false/standard path (steps 9–13) -->
![Standard approval path](images/flow-steps-9-13.png)

<!-- IMAGE: List view showing all 13 steps -->
![Full step list](images/flow-list-view.png)

---

## Step 2 — Social Media Comment Checker Subflow

A **reusable subflow** that can be called from any flow in the Social Media Management application. It checks whether negative social media comments are spiking for a given source and automatically creates a Problem record if one does not already exist.

### How it works

**Input:** `Source` (social media platform / configuration item name)

1. Looks up Monitor records — filters by Source, date (on or after 2026-03-23), and Type = Negative
2. Checks if negative count > 2 (high volume threshold)
3. If high: looks up active Problem records for that Configuration Item
4. If no active problem exists:
   - Looks up the Configuration Item record by name
   - Creates a new Problem record linked to it
5. Iterates through all matching Monitor records (For Each loop)
6. Updates each Monitor record
7. Returns a `Subflow Result` string output

<!-- IMAGE: Subflow canvas — full view showing all steps -->
![Subflow overview](images/subflow-overview.png)

<!-- IMAGE: If conditions (steps 2 and 4) showing threshold and problem check logic -->
![Subflow conditions](images/subflow-conditions.png)

<!-- IMAGE: For Each loop and Update Monitor Record (steps 7–8) -->
![For Each and update step](images/subflow-for-each.png)

---

## Skills demonstrated

- Trigger configuration with field-level conditions (Record Updated)
- Conditional branching — If/Else with nested logic
- Ask For Approval with dynamic group and manager routing
- Multi-path flow design with proper End Flow termination
- Subflow design — Inputs & Outputs, reusable architecture
- Look Up Records with multi-condition filters (date range, type, active status)
- Cross-table record creation (Problem from Monitor data)
- For Each loop to iterate over a record collection
- Data pill referencing across multiple steps
- Error Handler awareness

---
