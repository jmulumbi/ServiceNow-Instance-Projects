ServiceNow Administration Fundamentals — Capstone Project

A hands-on capstone completed as part of the ServiceNow Administration Fundamentals course. This repository documents the skills developed throughout the course and the end-to-end scenario built during the capstone: configuring a support workflow for a fictional product called the Strawberry sFone.


📚 Skills Learned
Throughout the course, the following ServiceNow administration competencies were developed:
AreaSkillsForm ConfigurationCreating custom fields, configuring form views, adding choice field values via Form BuilderUser AdministrationCreating user groups, adding group members, assigning roles, setting manager hierarchiesService CatalogImporting catalog items via Update Sets, configuring catalog item recordsWorkflow AutomationBuilding flows in Workflow Studio with triggers, approvals, conditional logic, catalog tasks, and email actionsKnowledge ManagementCreating knowledge base categories and articles, applying role-based security to articlesTask AssignmentConfiguring Services and Service Offerings for automatic incident assignmentNotificationsBuilding email notifications with dynamic field variables and dot-walking for recipientsAnalytics & ReportingCreating data visualizations in the Analytics Center, scheduling reports to stakeholder groups

🏗️ Capstone Overview
The capstone simulates a real-world scenario where a company — Strawberry — has released a new mobile device called the sFone. As the ServiceNow administrator, the goal was to configure the platform end-to-end to support sFone-related incidents, service requests, and internal knowledge — all tied together with automation and reporting.

✅ Task Breakdown
Task 1 — Update Incident Management
Module Reference: Configure Applications for Business
Modified the Incident form to support sFone troubleshooting by:

Creating a new sFone Model (String) field and adding it to the Default form view
Adding sFone as a new choice in the Category field
Submitting a test Non-P1 sFone incident to verify the changes


📸 Screenshot needed: Incident form showing the sFone category selected and the sFone Model field visible


Task 2 — User Administration
Module Reference: Configure Applications for Business
Set up the support team by:

Creating a new Strawberry Support group under the Service Desk parent group, managed by Fred Luddy
Adding members: Beth Anglin, Bud Richman, David Loo, Waldo Edberg
Creating a new user Kara Prince directly from the group record
Adding the Manager field to the User form and assigning Fred Luddy as Kara's manager


📸 Screenshot needed: Strawberry Support group record showing the Group Members tab with all 5 members listed


Task 3 — Automate Service Catalog Item Fulfillment
Module Reference: Configure Self Service
Imported and automated the Strawberry sFone Service Catalog item by:

Importing the catalog item via Update Set (XML)
Building a Strawberry Workflow in Workflow Studio with:

Trigger: Service Catalog
Action 1: Ask for Approval (routed to requester's manager)
Action 2: Wait for Condition (Approved or Rejected)
Flow Logic — If Approved: Three sequential catalog tasks — Order, Configure, Deliver
Flow Logic — Else If Rejected: Send Email notification to requester + End Flow
Final Action: Update Record → State = Closed Complete


Activating the flow and associating it with the Strawberry sFone catalog item
Testing by impersonating David Loo (requester) and Bud Richman (approver)


📸 Screenshots needed:

Completed Strawberry Workflow canvas showing all steps (trigger → actions → if/else logic)
Workflow execution details showing all steps as Completed



Task 4 — Update Knowledge Base
Module Reference: Configure Self Service
Populated the IT Knowledge Base with sFone support content by:

Enabling Instant Publish on the IT Knowledge Base
Creating a new sFone category
Publishing a Requester Article — "Requesting an sFone from the Service Catalog" — accessible to all IT KB users
Publishing a Fulfiller Article — "Supporting sFone Service Catalog Requests" — restricted to users with the itil role


📸 Screenshot needed: Published articles list filtered to the sFone category, showing both articles


Task 5 — Enhance Task Assignment and Communication
Module Reference: Enable Productivity
Configured automatic assignment and critical incident alerting by:

Creating a Telephone Services service (Support Group: Service Desk)
Creating a Strawberry sFone service offering under Telephone Services (Support Group: Strawberry Support) — enabling automatic assignment group population on incidents
Building a P1 sFone Incident email notification triggered when:

Category = sFone
Priority = 1 – Critical
Assignment Group = Strawberry Support
Sent to: the Strawberry Support group manager (dot-walked)


Testing by creating a Priority 1 sFone incident and verifying the outbox


📸 Screenshots needed:

Incident form showing Assignment Group auto-populated to Strawberry Support
System Outbox showing the P1 sFone notification email sent to fred.luddy@example.com



Task 6 — Schedule a Visualization
Module Reference: Enable Productivity
Built an analytics report and automated its distribution by:

Creating a Pie Chart visualization — "Active sFone Incidents by Priority" — sourced from the Incident table, filtered to Category = sFone, grouped by Priority
Scheduling the visualization to be emailed to Strawberry Support daily at 08:30 with the subject "Current sFone Active Incidents Count"


📸 Screenshot needed: The completed pie chart visualization showing incident data broken down by priority

🛠️ Platform

ServiceNow Personal Developer Instance (PDI)
Course: ServiceNow Administration Fundamentals
© 2025 ServiceNow, Inc.