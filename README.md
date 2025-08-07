# AG Grid Project

A React-based data grid solution leveraging **AG Grid** with advanced server-side features for handling large, dynamic datasets efficiently.

---

## 🏆 Features

- **Infinite Scrolling (Server‑Side Row Model)**  
  Smooth lazy-loading of rows as the user scrolls, fetching data on-demand from the Convex backend to handle very large datasets without blocking the UI.

- **Server‑Side Pagination**
  Backend-driven pagination ensures only the required page of data is requested and rendered, reducing payloads and improving responsiveness.

- **Real‑Time Cell Updates**
  Live updates are pushed from Convex to the client so individual cells update in real time when underlying data changes — ideal for dashboards and collaborative scenarios.

- **Cell Flashing on Change**
  Visual change feedback for updated cells using AG Grid’s feature, providing an immediate, subtle animation when a cell value changes.

- **Update Status Toasts**
  User-friendly toast notifications display success/error status for saves and updates, keeping users informed about backend operations and sync state.

- **Rendered Row Count Display**
  Shows the current number of rendered rows in the table (useful for debugging, UX, and understanding how many rows are loaded vs available on the server).

- **Optimized Rendering & Modular Bundling**
  Only required AG Grid modules are registered to keep the bundle lean and maximize runtime performance.

- **Convex‑Powered Backend Integration**
  Convex serves as the dynamic data source that handles grouping, pagination, and real‑time subscriptions — seamlessly integrated with AG Grid’s server-side model.

- **UX Enhancements**
  Polished interactions such as smooth scrolling, transient row highlights for newly added rows, and contextual UI feedback for user actions.

## Tech Stack & Structure

- **Frontend**: React + AG Grid, configured to use the Server-Side Row Model and relevant modules.
- **Backend**: Acts as a data source, serving paginated/grouped data on demand. Compatible with REST, GraphQL, or other server implementations.
- **Configuration**: Modular registration using `ModuleRegistry` or per-grid `modules` prop for optimal bundle control.

---

## Installation

```bash
git clone https://github.com/matoliya-shubham/ag-grid-project.git
cd ag-grid-project
npm install
npm start
```

## 🔑 Environment Variables

Before starting the project, make sure to create a `.env` file in the root directory with the following variable:

```env
VITE_CONVEX_URL=your_convex_deployment_url
```
