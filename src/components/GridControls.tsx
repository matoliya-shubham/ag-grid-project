import React from "react";

interface GridControlsProps {
  isLoading: boolean;
  loadedRowCount: number;
  totalRowCount: number | null;
  onIncrementGold: () => void;
}

export const GridControls: React.FC<GridControlsProps> = ({
  isLoading,
  loadedRowCount,
  totalRowCount,
  onIncrementGold,
}) => {
  return (
    <div className="flex justify-between mb-2">
      <div className="flex items-center gap-4">
        <button
          className={`px-2 py-1 rounded-md transition-colors ${
            isLoading
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 cursor-pointer text-white hover:bg-blue-600"
          }`}
          onClick={onIncrementGold}
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
  );
};
