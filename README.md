# AG Grid Project

A React-based data grid solution leveraging **AG Grid** with advanced server-side features for handling large, dynamic datasets efficiently.

---

## ​ Features

- **Server-Side Row Model**
  - Utilizes lazy loading and infinite scrolling to fetch data on demand, enabling smooth performance even with huge datasets.
    
- **Server-Side Grouping, Aggregation & Pivoting**
  - Performs complex data operations—grouping, aggregations, pivot views—on the server side to optimize rendering and responsiveness.
    
- **Dynamic Data Loading**
  - Fetches and displays only what’s necessary—parent rows initially, followed by child data when groups expand.
    
- **Modular Architecture**
  - Registers only the required AG Grid modules (e.g., Server-Side Row Model, Enterprise features) to reduce bundle size and keep the app performant.
   
- **Enterprise Capabilities**
  - Integrates enterprise-level features like Excel export, tool panels, custom filters, context menus, and more for advanced interactivity and user experience.

---

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
