import { v } from "convex/values";
import { internalMutation } from "./_generated/server";

export const resetData = internalMutation({
  args: {},
  returns: v.null(),
  handler: async (ctx) => {
    // Delete all messages
    const messages = await ctx.db.query("messages").collect();
    for (const message of messages) {
      await ctx.db.delete(message._id);
    }

    // Delete all channels
    const channels = await ctx.db.query("channels").collect();
    for (const channel of channels) {
      await ctx.db.delete(channel._id);
    }

    // Create placeholder channels
    await ctx.db.insert("channels", { name: "general" });
    await ctx.db.insert("channels", { name: "random" });
    await ctx.db.insert("channels", { name: "help" });

    // Create placeholder messages
    const placeholderMessages = [
      {
        channel: "general",
        authorName: "Alice",
        body: "Welcome to the general channel! Feel free to introduce yourself.",
      },
      {
        channel: "general",
        authorName: "Bob",
        body: "Hey everyone! Excited to be here.",
      },
      {
        channel: "general",
        authorName: "Charlie",
        body: "This is a great place to chat about anything.",
      },
      {
        channel: "random",
        authorName: "Diana",
        body: "Random thoughts go here! What's on your mind?",
      },
      {
        channel: "random",
        authorName: "Eve",
        body: "I love how random this channel is!",
      },
      {
        channel: "help",
        authorName: "Admin",
        body: "Need help? Ask your questions here and we'll assist you.",
      },
      {
        channel: "help",
        authorName: "Support",
        body: "Remember to search existing messages before asking new questions.",
      },
    ];

    for (const msg of placeholderMessages) {
      await ctx.db.insert("messages", {
        body: msg.body,
        author: {
          name: msg.authorName,
        },
        channel: msg.channel,
      });
    }

    return null;
  },
});
