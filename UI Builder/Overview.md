# ServiceNow UI Builder — Safety Issues Workspace

> A custom workspace application I built using **ServiceNow UI Builder**. The project involved building two separate workspaces from scratch — one for end users to view and log their own safety issues, and one for admins to monitor all open issues across the organization with live filtering and analytics. Everything was built on top of a custom scoped table and wired together using data resources and event mappings inside UI Builder.

---

## 📚 Skills I Developed

| Area                          | Skills                                                                                                        |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------- |
| **UI Builder**                | Building multi-page workspace experiences, configuring layouts with columns and resizable panes               |
| **Data Resources**            | Setting up Look Up, Create Record, and Form Controller data resources and connecting them to components       |
| **Components**                | Working with Donut charts, Bar charts, Single score widgets, Card views, List components, and Form components |
| **Event Mapping**             | Chaining button click events to Execute, Open/Close modal, and Refresh actions                                |
| **Modal Dialogs**             | Building and triggering modeless dialogs for record creation without leaving the page                         |
| **Record Pages**              | Configuring custom record views with Form Controller, Activity Stream, and Attachments                        |
| **Filtering & Interactivity** | Wiring a dropdown component to dynamically filter a list based on selected location                           |

---

## 🏗️ Project Overview

The app is built around a custom **Safety Issues** table (`x_snc_safety_iss`) and has three main pieces:

- **Safety Issues Workspace** — the end-user facing landing page where staff can see their own open issues and submit new ones
- **Safety Issue Record Page** — a custom record view built in UI Builder for viewing and managing individual issue records
- **Safety Issues Admin Workspace** — a manager/admin dashboard with org-wide analytics and location-based filtering

---

## ✅ Build Breakdown

### Part 1 — Safety Issues Workspace (End-User View)

The end-user landing page gives each user a personal view of their safety issues. I built this page using a multi-column layout and wired up the following components:

- A **header banner** with the workspace title
- A **shield/checkmark image** as a visual brand element on the left column
- A **Donut chart** on the right, connected to a data resource that shows the current user's open issues broken down by priority in real time
- A **tabbed list/card view** at the bottom — users can toggle between a list view and a card view, with each card showing the issue number, priority, state, and a direct "Go to Record" button

  ![Safety Issues Workspace — UI Builder editor view](Assets/SafetyIssueWorkSpace.png)


---

### Part 2 — Log a Safety Issue Modal

I wired up a **"Log a Safety Issue" modal dialog** on the workspace page. When triggered, it opens a form overlay where the user fills in a short description and hits submit. On the button click I configured three chained events in sequence:

1. **EXECUTE** — fires the `Create Safety Record` data resource to write the new record to the table
2. **Open or close modal dialog** — closes the modal after the record is created
3. **REFRESH** — triggers the `Look Up Issues` data resource to reload the list so the new entry shows up immediately without a page refresh
   ![Log a Safety Issue modal with event chain configured in UI Builder](screenshots/03-submit-modal-builder.png)

---

### Part 3 — Safety Issue Record Page

Rather than using the default platform form, I built a fully custom record page for individual safety issue records. The layout uses a **resizable panes** structure with:

- A **Form component** on the left connected to the `Form Controller` data resource — displaying fields like Number, Category, Priority, Short Description, Assigned To, Opened By, Location, and State
- A **Notes section** with a Comments field below the main form
- An **Activity Stream** panel showing field change history and posted comments, with a Compose section for adding new ones
- An **Attachments panel** on the right rail
  The record page is scoped to the `x_snc_safety_iss` table and resolves the record using `sysId` passed through the URL parameters.

![Safety Issue record — live preview](screenshots/04-record-form-preview.png)

![Safety Issue record — UI Builder editor with Form Controller wired up](screenshots/05-record-form-builder.png)

---

### Part 4 — Safety Issues Admin Workspace

The admin workspace is a separate page built for managers and admins that gives a full org-wide view. I set up three analytics widgets across the top and a dynamically filterable list below.

**Analytics header widgets:**

- **Open Issues by Location** — a vertical bar chart grouping all open issues by location, making it easy to see which sites are generating the most activity
- **Open Issues by Priority** — a donut chart breaking down the full org's open issues by priority level (Critical, High, Moderate, Low) with a live total count in the center
- **Unassigned Safety Issues** — a single score widget showing a live count of issues with no assigned user, so admins can spot gaps quickly
  **Location filter + dynamic list:**

Below the charts I added a **location dropdown** that's wired to the `Issue Locations` data resource. Selecting a location dynamically filters the **Open Safety Issues by Location** list underneath — showing Number, Priority, State, Short Description, and Location for just that site. The list header also shows a live record count so you always know how many issues are open at the selected location.

![Admin Workspace — UI Builder editor showing the list component config](screenshots/06-admin-workspace-builder.png)

![Admin Workspace — location dropdown open with all locations listed](screenshots/07-admin-workspace-filter.png)

![Admin Workspace — filtered to Colorado Springs showing 5 open issues](screenshots/08-admin-workspace-filtered.png)

![Admin Workspace — full live view](screenshots/09-admin-workspace-live.png)

---

## 🛠️ Technical Details

| Item                | Detail                                                                                                                                         |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| **Platform**        | ServiceNow UI Builder                                                                                                                          |
| **Custom Table**    | `x_snc_safety_iss` (Safety Issues)                                                                                                             |
| **Workspace**       | Safety WS                                                                                                                                      |
| **Pages Built**     | Safety Landing Page, Safety Issue Record Page, Safety Issues Admin Workspace                                                                   |
| **Data Resources**  | Look Up Issues, Create Safety Record, Look Up User Location, Issue Locations, Form Controller                                                  |
| **Components Used** | Donut chart, Vertical bar chart, Single score, List - Simple, Card View, Modeless dialog, Dropdown, Form, Activity Stream Compose, Attachments |
| **Event Mappings**  | Button click → Execute data resource → Open/close modal → Refresh data resource                                                                |

---

## 🛠️ Platform

- **ServiceNow** Personal Developer Instance (PDI)
- Built using: UI Builder, Workspace Experience
