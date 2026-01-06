import { v } from "convex/values";
import { query } from "./_generated/server";

export const searchInMessages = query({
  args: {
    query: v.string(),
    channel: v.optional(v.string()),
    authorName: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let queryBuilder = ctx.db
      .query("messages")
      .withSearchIndex("search_body", (q) => {
        let searchQuery = q.search("body", args.query);

        if (args.channel) searchQuery = searchQuery.eq("channel", args.channel);

        if (args.authorName)
          searchQuery = searchQuery.eq("author.name", args.authorName);

        return searchQuery;
      });

    const messages = await queryBuilder.take(10);
    return messages;
  },
});
