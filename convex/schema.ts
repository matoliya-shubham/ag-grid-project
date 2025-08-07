import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  olympicWinners: defineTable({
    athlete: v.string(),
    age: v.number(),
    country: v.string(),
    year: v.optional(v.number()),
    date: v.optional(v.string()),
    sport: v.string(),
    gold: v.optional(v.number()),
    silver: v.optional(v.number()),
    bronze: v.optional(v.number()),
    total: v.optional(v.number()),
  })
    .index("by_country", ["country"])
    .index("by_sport", ["sport"])
    .index("by_athlete", ["athlete"])
    .index("by_country_sport", ["country", "sport"]),
  settings: defineTable({
    userId: v.optional(v.string()), // Optional: for per-user settings
    tableId: v.string(), // To distinguish multiple grids
    columnState: v.array(
      v.object({
        colId: v.string(),
        hide: v.boolean(),
        width: v.optional(v.number()),
        pinned: v.optional(v.union(v.literal("left"), v.literal("right"))),
        sort: v.optional(v.union(v.literal("asc"), v.literal("desc"))),
        sortIndex: v.optional(v.number()),
        flex: v.optional(v.number()),
        minWidth: v.optional(v.number()),
        maxWidth: v.optional(v.number()),
        resizable: v.optional(v.boolean()),
        suppressMenu: v.optional(v.boolean()),
        suppressMovable: v.optional(v.boolean()),
        suppressSizeToFit: v.optional(v.boolean()),
        suppressAutoSize: v.optional(v.boolean()),
      })
    ),
    columnOrder: v.optional(v.array(v.string())), // Array of column IDs in order
    filterModel: v.optional(v.record(v.string(), v.any())), // Dynamic filter model
    pagination: v.optional(
      v.object({
        pageSize: v.number(),
        currentPage: v.number(),
      })
    ),
    groupState: v.optional(
      v.object({
        rowGroupCols: v.array(
          v.object({
            colId: v.string(),
            displayName: v.optional(v.string()),
          })
        ),
        pivotCols: v.array(
          v.object({
            colId: v.string(),
            displayName: v.optional(v.string()),
          })
        ),
        pivotMode: v.boolean(),
      })
    ),
    sortModel: v.optional(
      v.array(
        v.object({
          colId: v.string(),
          sort: v.union(v.literal("asc"), v.literal("desc")),
          sortIndex: v.number(),
        })
      )
    ),
    rowSelection: v.optional(
      v.union(v.literal("single"), v.literal("multiple"))
    ),
    selectedRows: v.optional(v.array(v.string())), // Array of selected row IDs
    gridOptions: v.optional(
      v.object({
        enableRangeSelection: v.optional(v.boolean()),
        enableRowGroup: v.optional(v.boolean()),
        enablePivot: v.optional(v.boolean()),
        enableFilter: v.optional(v.boolean()),
        enableSorting: v.optional(v.boolean()),
        enableColResize: v.optional(v.boolean()),
        enableColMove: v.optional(v.boolean()),
        enableRowSelection: v.optional(v.boolean()),
        enableCellTextSelection: v.optional(v.boolean()),
        suppressRowClickSelection: v.optional(v.boolean()),
        suppressCellFocus: v.optional(v.boolean()),
        suppressRowHoverHighlight: v.optional(v.boolean()),
        suppressColumnVirtualisation: v.optional(v.boolean()),
        suppressRowVirtualisation: v.optional(v.boolean()),
        rowHeight: v.optional(v.number()),
        headerHeight: v.optional(v.number()),
        rowBuffer: v.optional(v.number()),
        pagination: v.optional(v.boolean()),
        paginationPageSize: v.optional(v.number()),
        paginationPageSizeSelector: v.optional(v.array(v.number())),
      })
    ),
    theme: v.optional(
      v.union(v.literal("light"), v.literal("dark"), v.literal("auto"))
    ),
    density: v.optional(
      v.union(
        v.literal("compact"),
        v.literal("comfortable"),
        v.literal("spacious")
      )
    ),
    locale: v.optional(v.string()), // For internationalization
    timezone: v.optional(v.string()), // For date/time handling
    createdAt: v.string(), // ISO date string
    updatedAt: v.string(), // ISO date string
  }),
});
