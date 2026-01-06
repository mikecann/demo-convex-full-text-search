# Convex Full Text Search Demo

This is a demo chat application showcasing **Convex Full Text Search** capabilities. The app demonstrates reactive, real-time search across messages with filtering by channel and author.

## Features

- **Reactive Full Text Search**: Search queries automatically update in real-time as new messages are added
- **Multi-field Filtering**: Filter search results by channel and author name
- **Chat Interface**: Create channels, send messages, and view message history
- **Type-safe Search**: Full TypeScript support for search indexes and queries

## What This Demo Shows

This demo highlights the power of Convex's reactive full text search:

1. **Real-time Updates**: When you search for messages, the results automatically update as new matching messages are added - no manual refresh needed!

2. **Full Text Search Index**: Uses Convex's search index with:
   - Search field: `body` (message content)
   - Filter fields: `channel` and `author.name`

3. **Advanced Features**:
   - Case-insensitive search
   - Prefix matching (type "h" to find words starting with "h")
   - BM25 ranking with proximity scoring
   - Multi-term queries (up to 16 terms)

## Get Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Set up Convex (if you haven't already):

   ```bash
   npx convex dev
   ```

   This will create a Convex project and generate the necessary configuration files.

3. Start the development server:

   ```bash
   npm run dev
   ```

4. The app will open in your browser. You can:
   - Create channels on the left
   - Send messages in channels
   - Search messages in real-time on the right sidebar
   - Filter by channel and author

   **Note**: The app includes placeholder data that gets reset every 24 hours. Try searching for "mike", "hello", or "hi" to see the search in action!

## Project Structure

- `convex/schema.ts` - Database schema with search index definition
- `convex/search.ts` - Full text search query
- `convex/channels.ts` - Channel management functions
- `convex/messages.ts` - Message CRUD operations
- `convex/crons.ts` - Daily data reset cron job
- `src/components/` - React components for the UI

## Key Code Examples

### Defining a Search Index

```typescript
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
```

### Using the Search Index

```typescript
const messages = await ctx.db
  .query("messages")
  .withSearchIndex("search_body", (q) => {
    let searchQuery = q.search("body", args.query);
    if (args.channel) searchQuery = searchQuery.eq("channel", args.channel);
    if (args.authorName)
      searchQuery = searchQuery.eq("author.name", args.authorName);
    return searchQuery;
  })
  .take(10);
```

## Search Limits

- One search index per field per table
- Maximum 16 filter fields per index
- Search queries can have up to 16 terms (words)
- Each term can be up to 32 characters
- Maximum 1024 documents returned per search

## Learn More

- [Convex Full Text Search Documentation](https://docs.convex.dev/search/text-search)
- [Convex Documentation](https://docs.convex.dev/)
- [Stack - Advanced Convex Topics](https://stack.convex.dev/)

## Notes

- The app includes a cron job that resets all data every 24 hours and populates placeholder channels and messages
- Search is powered by [Tantivy](https://github.com/quickwit-oss/tantivy), a high-performance Rust search library
- Results are ranked using BM25 scoring with proximity and term frequency considerations
