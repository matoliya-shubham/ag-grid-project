import { useState, useCallback } from "react";
import { useConvex, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { IRow, FakeServer } from "../types/gridTypes";
import type { IServerSideGetRowsRequest } from "ag-grid-community";
import type { Id } from "../../convex/_generated/dataModel";

export const useGridData = () => {
  const convex = useConvex();
  const update = useMutation(api.olympicWinners.updateValue);
  const [loadedRowCount, setLoadedRowCount] = useState(0);
  const [totalRowCount, setTotalRowCount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getFakeServer = useCallback(
    (allData: IRow[]): FakeServer => {
      return {
        getResponse: (request: IServerSideGetRowsRequest) => {
          try {
            // take a slice of the total rows
            const rowsThisPage = allData.slice(
              request.startRow,
              request.endRow
            );
            setLoadedRowCount(
              Math.max(loadedRowCount, request.endRow as number)
            );
            const lastRow = allData.length;

            return {
              success: true,
              rows: rowsThisPage,
              lastRow: lastRow,
            };
          } catch (error) {
            console.error("Error in fake server response:", error);
            return {
              success: false,
              rows: [],
              lastRow: 0,
            };
          }
        },
      };
    },
    [loadedRowCount]
  );

  const loadGridData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await convex.query(api.olympicWinners.get);
      if (data) {
        setTotalRowCount(data.length);
      }

      return data || [];
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to load data";
      setError(errorMessage);
      console.error("Error loading grid data:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [convex]);

  const updateCellValue = useCallback(
    async (
      id: Id<"olympicWinners">,
      field: string,
      newValue: string | number
    ) => {
      try {
        let valueToUpdate = newValue;
        if (typeof newValue === "string" && !isNaN(Number(newValue))) {
          valueToUpdate = Number(newValue);
        }

        await update({ id, [field]: valueToUpdate });
      } catch (error) {
        console.error("Error updating cell value:", error);
        setError("Failed to update cell value");
        throw error;
      }
    },
    [update]
  );

  const updateGoldForSelectedRows = useCallback(
    async (selectedRows: { data: IRow }[]) => {
      try {
        setIsLoading(true);
        setError(null);

        if (!selectedRows || selectedRows.length === 0) {
          setError("No rows selected. Please select rows to update.");
          return;
        }

        // Update each row in the database
        const updatePromises = selectedRows.map((rowData) => {
          if (!rowData.data?._id) {
            throw new Error("Invalid row data");
          }
          return update({
            id: rowData.data._id,
            gold: (rowData.data.gold || 0) + 1,
          });
        });

        await Promise.all(updatePromises);
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Failed to update gold count";
        setError(errorMessage);
        console.error("Error in updateGoldForSelectedRows:", error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [update]
  );

  return {
    loadedRowCount,
    totalRowCount,
    error,
    isLoading,
    getFakeServer,
    loadGridData,
    updateCellValue,
    updateGoldForSelectedRows,
    setError,
  };
};
