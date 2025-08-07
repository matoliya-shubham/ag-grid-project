# Project Structure

This project has been reorganized into a clean, scalable folder structure following React best practices.

## 📁 Folder Structure

```
src/
├── components/          # Reusable UI components
│   ├── OlympicGrid.tsx # Main grid component
│   ├── ErrorBoundary.tsx # Error handling component
│   ├── GridControls.tsx # Grid control buttons
│   ├── CustomLoadingCellRenderer.tsx # Custom cell renderer
│   ├── Spinner.tsx     # Loading spinner component
│   └── index.ts        # Component exports
├── hooks/              # Custom React hooks
│   ├── useGridData.ts  # Grid data management hook
│   └── index.ts        # Hook exports
├── services/           # Business logic and API calls
│   ├── gridService.ts  # Grid-related services
│   └── index.ts        # Service exports
├── types/              # TypeScript type definitions
│   ├── olympicData.ts  # Olympic data interfaces
│   ├── gridTypes.ts    # Grid-specific types
│   └── index.ts        # Type exports
├── utils/              # Utility functions
│   ├── gridUtils.ts    # Grid utility functions
│   └── index.ts        # Utility exports
├── constants/          # Application constants
│   ├── olympicData.ts  # Olympic data constants
│   └── index.ts        # Constant exports
├── styles/             # CSS and styling
│   └── index.css       # Global styles
├── assets/             # Static assets
│   └── react.svg       # Images and icons
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── vite-env.d.ts       # Vite environment types
```

## 🏗️ Architecture Benefits

### **Separation of Concerns**

- **Components**: Pure UI components with minimal business logic
- **Hooks**: Custom hooks for data management and side effects
- **Services**: Business logic and API interactions
- **Types**: Centralized type definitions
- **Utils**: Reusable utility functions

### **Scalability**

- Easy to add new components, hooks, or services
- Clear import paths with index files
- Modular structure supports team development

### **Maintainability**

- Related code is grouped together
- Clear file naming conventions
- Easy to locate and modify specific functionality

### **Reusability**

- Components can be easily reused across the application
- Hooks encapsulate complex logic
- Services can be shared between components

## 📦 Key Features

### **Error Handling**

- `ErrorBoundary` component for catching React errors
- Comprehensive error states in hooks
- User-friendly error messages

### **Type Safety**

- Full TypeScript support
- Proper type definitions for all interfaces
- Type-safe API calls and data handling

### **Performance**

- Optimized React hooks with proper dependencies
- Efficient data fetching and caching
- Minimal re-renders with useCallback and useMemo

### **Developer Experience**

- Clean import paths
- Consistent code organization
- Easy to understand and modify

## 🚀 Usage

The main application is now much cleaner:

```tsx
// App.tsx - Simple and focused
import React from "react";
import { OlympicGrid } from "./components/OlympicGrid";
import { ErrorBoundary } from "./components/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <h1 className="font-semibold text-center text-2xl mt-8">
        Ag Grid React Table
      </h1>
      <OlympicGrid />
    </ErrorBoundary>
  );
}
```

All complex logic has been moved to appropriate hooks, services, and components, making the codebase more maintainable and scalable.
