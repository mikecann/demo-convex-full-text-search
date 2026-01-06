# Convex Functions

This directory contains the Convex backend functions for the Full Text Search demo.

## File Structure

- `schema.ts` - Database schema with search index definitions
- `search.ts` - Full text search query function
- `channels.ts` - Channel management (list, create)
- `messages.ts` - Message operations (list, create)
- `resetData.ts` - Internal mutation to reset and seed placeholder data
- `crons.ts` - Cron job configuration (runs resetData daily)

## Key Concepts

This demo showcases Convex's Full Text Search capabilities. The search index is defined in `schema.ts` and used in `search.ts` to enable real-time, reactive search across messages.

For more information, see the main [README.md](../README.md) in the project root.
