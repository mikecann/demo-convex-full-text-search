import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const listMessages = query({
  args: {
    channel: v.string(),
  },
  returns: v.array(
    v.object({
      _id: v.id("messages"),
      _creationTime: v.number(),
      body: v.string(),
      author: v.object({
        name: v.string(),
      }),
      channel: v.string(),
    }),
  ),
  handler: async (ctx, args) => {
    const messages = await ctx.db
      .query("messages")
      .filter((q) => q.eq(q.field("channel"), args.channel))
      .order("asc")
      .collect();

    return messages.sort((a, b) => a._creationTime - b._creationTime);
  },
});

export const createMessage = mutation({
  args: {
    body: v.string(),
    authorName: v.string(),
    channel: v.string(),
  },
  returns: v.id("messages"),
  handler: async (ctx, args) => {
    return await ctx.db.insert("messages", {
      body: args.body,
      author: {
        name: args.authorName,
      },
      channel: args.channel,
    });
  },
});
