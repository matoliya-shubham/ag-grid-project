# AG Grid Project

A React-based data grid solution leveraging **AG Grid** with advanced server-side features for handling large, dynamic datasets efficiently.

---

## ​ Features

- **Server-Side Row Model**
  - Utilizes lazy loading and infinite scrolling to fetch data on demand, enabling smooth performance even with huge datasets.
    [oai_citation:0‡ag-grid.com](https://www.ag-grid.com/javascript-data-grid/server-side-model/?utm_source=chatgpt.com)
- **Server-Side Grouping, Aggregation & Pivoting**
  - Performs complex data operations—grouping, aggregations, pivot views—on the server side to optimize rendering and responsiveness.
    [oai_citation:1‡ag-grid.com](https://www.ag-grid.com/javascript-data-grid/server-side-model/?utm_source=chatgpt.com)
- **Dynamic Data Loading**
  - Fetches and displays only what’s necessary—parent rows initially, followed by child data when groups expand.
    [oai_citation:2‡ag-grid.com](https://www.ag-grid.com/javascript-data-grid/server-side-model/?utm_source=chatgpt.com)
- **Modular Architecture**
  - Registers only the required AG Grid modules (e.g., Server-Side Row Model, Enterprise features) to reduce bundle size and keep the app performant.
    [oai_citation:3‡ag-grid.com](https://www.ag-grid.com/javascript-data-grid/modules/?utm_source=chatgpt.com)
- **Enterprise Capabilities**
  - Integrates enterprise-level features like Excel export, tool panels, custom filters, context menus, and more for advanced interactivity and user experience.
    [oai_citation:4‡npm](https://www.npmjs.com/package/ag-grid-community?utm_source=chatgpt.com) [oai_citation:5‡ag-grid.com](https://www.ag-grid.com/javascript-data-grid/community-vs-enterprise/?utm_source=chatgpt.com)

---

## Tech Stack & Structure

- **Frontend**: React + AG Grid, configured to use the Server-Side Row Model and relevant modules.
- **Backend**: Acts as a data source, serving paginated/grouped data on demand. Compatible with REST, GraphQL, or other server implementations.
- **Configuration**: Modular registration using `ModuleRegistry` or per-grid `modules` prop for optimal bundle control.
  [oai_citation:6‡ag-grid.com](https://www.ag-grid.com/javascript-data-grid/modules/?utm_source=chatgpt.com)

---

## Installation

```bash
git clone https://github.com/matoliya-shubham/ag-grid-project.git
cd ag-grid-project
npm install
npm start
```
