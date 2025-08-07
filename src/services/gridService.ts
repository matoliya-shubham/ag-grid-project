import type { IServerSideDatasource } from "ag-grid-community";
import type { FakeServer } from "../types/gridTypes";

export const getServerSideDatasource = (
  server: FakeServer
): IServerSideDatasource => {
  return {
    getRows: (params) => {
      // adding delay to simulate real server call
      setTimeout(() => {
        try {
          const response = server.getResponse(params.request);
          if (response.success) {
            // call the success callback
            params.success({
              rowData: response.rows,
              rowCount: response.lastRow,
            });
          } else {
            // inform the grid request failed
            params.fail();
          }
        } catch (error) {
          // Handle any errors in the server response
          console.error("Error in server datasource:", error);
          params.fail();
        }
      }, 2000);
    },
  };
};
