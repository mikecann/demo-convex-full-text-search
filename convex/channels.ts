import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const listChannels = query({
  args: {},
  returns: v.array(
    v.object({
      _id: v.id("channels"),
      _creationTime: v.number(),
      name: v.string(),
    }),
  ),
  handler: async (ctx) => {
    const channels = await ctx.db.query("channels").collect();
    return channels;
  },
});

export const createChannel = mutation({
  args: {
    name: v.string(),
  },
  returns: v.id("channels"),
  handler: async (ctx, args) => {
    return await ctx.db.insert("channels", { name: args.name });
  },
});
