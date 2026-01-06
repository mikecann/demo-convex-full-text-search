import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  channels: defineTable({
    name: v.string(),
  }),
  messages: defineTable({
    body: v.string(),
    author: v.object({
      name: v.string(),
    }),
    channel: v.string(),
  }).searchIndex("search_body", {
    searchField: "body",
    filterFields: ["channel", "author.name"],
  }),
});
