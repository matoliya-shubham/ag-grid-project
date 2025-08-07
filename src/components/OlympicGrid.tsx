import React, { useRef, useMemo, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  type ColDef,
  type GridReadyEvent,
  type CellValueChangedEvent,
  type GetRowIdParams,
  type RowSelectionOptions,
  type ServerSideTransaction,
  NumberEditorModule,
  TextEditorModule,
  TextFilterModule,
  NumberFilterModule,
  ValidationModule,
  HighlightChangesModule,
  PaginationModule,
  RowApiModule,
  EventApiModule,
} from "ag-grid-community";
import { ModuleRegistry } from "ag-grid-community";
import {
  ServerSideRowModelApiModule,
  ServerSideRowModelModule,
} from "ag-grid-enterprise";
import { toast } from "sonner";
import type { IOlympicData } from "../types/olympicData";
import { getServerSideDatasource } from "../services/gridService";
import { useGridData } from "../hooks/useGridData";
import { showCellUpdateToast, showGoldUpdateToast } from "../utils/toastUtils";

ModuleRegistry.registerModules([
  NumberEditorModule,
  TextEditorModule,
  TextFilterModule,
  NumberFilterModule,
  ServerSideRowModelModule,
  ServerSideRowModelApiModule,
  HighlightChangesModule,
  PaginationModule,
  RowApiModule,
  EventApiModule,
  ...(process.env.NODE_ENV !== "production" ? [ValidationModule] : []),
]);

export const OlympicGrid: React.FC = () => {
  const gridRef = useRef<AgGridReact>(null);
  const {
    loadedRowCount,
    totalRowCount,
    error,
    isLoading,
    getFakeServer,
    loadGridData,
    updateCellValue,
    updateGoldForSelectedRows,
    setError,
  } = useGridData();

  // Column Definitions: Defines the columns to be displayed.
  const [columnDefs] = React.useState<ColDef[]>([
    { field: "athlete", minWidth: 220 },
    { field: "country", minWidth: 200 },
    { field: "year" },
    { field: "sport", minWidth: 200 },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" },
  ]);

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      editable: true,
      flex: 1,
      minWidth: 100,
      filter: true,
      enableCellChangeFlash: true,
    };
  }, []);

  const onGridReady = useCallback(
    async (params: GridReadyEvent) => {
      try {
        const data = await loadGridData();
        const server = getFakeServer(data);
        const datasource = getServerSideDatasource(server);
        params.api!.setGridOption("serverSideDatasource", datasource);
      } catch (error) {
        console.error("Error in onGridReady:", error);
      }
    },
    [loadGridData, getFakeServer]
  );

  const onCellValueChanged = useCallback(
    (event: CellValueChangedEvent) => {
      try {
        const { data, colDef, newValue } = event;
        if (!data?._id || !colDef?.field) {
          console.error("Invalid cell value change event:", event);
          toast.error("Invalid cell data", {
            description: "Unable to update cell value due to invalid data",
          });
          return;
        }
        const field = colDef.field!;

        updateCellValue(data._id, field, newValue)
          .then(() => {
            // show success
            showCellUpdateToast.success(field, newValue, data.athlete);

            const transaction: ServerSideTransaction = {
              update: data,
            };
            gridRef.current?.api.applyServerSideTransaction(transaction);
          })
          .catch((error) => {
            // show error
            console.error("Error updating cell value:", error);
            showCellUpdateToast.error(field, data.athlete, error.message);
          });
      } catch (error) {
        console.error("Error in onCellValueChanged:", error);
        toast.error("Failed to process cell value change", {
          description: "An unexpected error occurred while updating the cell",
        });
        setError("Failed to process cell value change");
      }
    },
    [updateCellValue, setError]
  );

  const incrementGoldForUS = useCallback(async () => {
    try {
      const selectedRows = gridRef.current?.api.getSelectedNodes();
      if (!selectedRows || selectedRows.length === 0) {
        toast.error("No rows selected", {
          description:
            "Please select rows to update before clicking the button",
        });
        setError("No rows selected. Please select rows to update.");
        return;
      }

      await updateGoldForSelectedRows(selectedRows);

      // show success
      showGoldUpdateToast.success(selectedRows.length);

      // Apply server-side transactions to update the grid
      selectedRows.forEach((rowData) => {
        if (rowData.data) {
          const transaction: ServerSideTransaction = {
            update: [
              {
                ...rowData.data,
                gold: (rowData.data.gold || 0) + 1,
              },
            ],
          };
          gridRef.current?.api?.applyServerSideTransaction(transaction);
        }
      });
    } catch (error) {
      console.error("Error in incrementGoldForUS:", error);
      showGoldUpdateToast.error();
    }
  }, [updateGoldForSelectedRows, setError]);

  const rowSelection = useMemo<
    RowSelectionOptions | "single" | "multiple"
  >(() => {
    return { mode: "multiRow" };
  }, []);

  const getRowId = useCallback(
    (params: GetRowIdParams) => `${params.data._id}`,
    []
  );

  // Handle error state with toast
  React.useEffect(() => {
    if (error) {
      toast.error("Application Error", {
        description: error,
        action: {
          label: "Retry",
          onClick: () => {
            setError(null);
            window.location.reload();
          },
        },
      });
    }
  }, [error, setError]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            onClick={() => {
              setError(null);
              window.location.reload();
            }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-3/4 h-[38rem] m-auto mt-4 transition-all duration-300 scroll-smooth">
      <div className="flex justify-between mb-2">
        <div className="flex items-center gap-4">
          <button
            className={`px-2 py-1 rounded-md transition-colors ${
              isLoading
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 cursor-pointer text-white hover:bg-blue-600"
            }`}
            onClick={incrementGoldForUS}
            disabled={isLoading}
          >
            {isLoading ? "Fetching data..." : "Inc GOLD for Selected Rows"}
          </button>
        </div>
        {totalRowCount && (
          <div className="text-sm w-max border-[0.1px] px-6 py-2">
            Showing {loadedRowCount} / {totalRowCount}
          </div>
        )}
      </div>
      <AgGridReact<IOlympicData>
        ref={gridRef}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowModelType={"serverSide"}
        suppressServerSideFullWidthLoadingRow={true}
        cacheBlockSize={0}
        blockLoadDebounceMillis={200}
        onGridReady={onGridReady}
        onCellValueChanged={onCellValueChanged}
        serverSideInitialRowCount={20}
        rowSelection={rowSelection}
        getRowId={getRowId}
      />
    </div>
  );
};
