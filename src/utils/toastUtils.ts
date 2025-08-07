import { toast } from "sonner";

export const showLoadingToast = (message: string, description?: string) => {
  return toast.loading(message, {
    description,
  });
};

export const showSuccessToast = (message: string, description?: string) => {
  toast.success(message, {
    description,
  });
};

export const showErrorToast = (message: string, description?: string) => {
  toast.error(message, {
    description,
  });
};

export const dismissToast = (toastId: string | number) => {
  toast.dismiss(toastId);
};

export const showCellUpdateToast = {
  loading: (field: string, athlete: string) =>
    showLoadingToast(
      "Updating cell value...",
      `Updating ${field} for ${athlete}`
    ),
  success: (field: string, value: string | number, athlete: string) =>
    showSuccessToast(
      "Cell updated successfully",
      `${field} updated to ${value} for ${athlete}`
    ),
  error: (field: string, athlete: string, errorMessage: string) =>
    showErrorToast(
      "Failed to update cell value",
      `Error updating ${field} for ${athlete}: ${errorMessage}`
    ),
};

export const showGoldUpdateToast = {
  loading: (count: number) =>
    showLoadingToast(
      "Updating gold medals...",
      `Updating ${count} selected row(s)`
    ),
  success: (count: number) =>
    showSuccessToast(
      "Gold medals updated successfully",
      `Updated ${count} row(s) with +1 gold medal`
    ),
  error: () =>
    showErrorToast(
      "Failed to update gold medals",
      "An error occurred while updating the selected rows"
    ),
};
