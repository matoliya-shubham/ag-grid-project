import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Doc } from "./_generated/dataModel";

export const get = query({
  handler: async (ctx) => {
    return await ctx.db.query("olympicWinners").collect();
  },
});

export const create = mutation({
  args: {
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
  },
  handler: async (context, args) => {
    if (!args.athlete || !args.country || !args.sport) {
      throw new Error("athlete, age, country and sport fields are required");
    }

    const document = await context.db.insert("olympicWinners", args);

    return document;
  },
});

export const bulkInsertEntries = mutation({
  args: {
    items: v.array(
      v.object({
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
    ),
  },
  handler: async (ctx, args) => {
    const { items } = args;
    for (const product of items) {
      await ctx.db.insert("olympicWinners", product);
    }
  },
});

export const updateValue = mutation({
  args: {
    id: v.id("olympicWinners"),
    athlete: v.optional(v.string()),
    age: v.optional(v.number()),
    country: v.optional(v.string()),
    year: v.optional(v.number()),
    date: v.optional(v.string()),
    sport: v.optional(v.string()),
    gold: v.optional(v.number()),
    silver: v.optional(v.number()),
    bronze: v.optional(v.number()),
    total: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { id, ...rest } = args;
    const existingDocument: Doc<"olympicWinners"> | null = await ctx.db.get(id);

    if (!existingDocument) {
      throw new Error("Not found");
    }

    await ctx.db.patch(args.id, {
      ...rest,
    });
  },
});
