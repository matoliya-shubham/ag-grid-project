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

export default App;
