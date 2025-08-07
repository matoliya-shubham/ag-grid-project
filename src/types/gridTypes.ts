import type { Id } from "../../convex/_generated/dataModel";
import type { IServerSideGetRowsRequest } from "ag-grid-community";

export interface IRow {
  athlete: string;
  age: number;
  country: string;
  year?: number;
  date?: string;
  sport: string;
  gold?: number;
  silver?: number;
  bronze?: number;
  total?: number;
  highlight?: boolean;
  id?: string;
  _id: Id<"olympicWinners">;
  _creationTime: number;
}

export interface ServerResponse {
  success: boolean;
  rows: IRow[];
  lastRow: number;
}

export interface FakeServer {
  getResponse: (request: IServerSideGetRowsRequest) => ServerResponse;
}
