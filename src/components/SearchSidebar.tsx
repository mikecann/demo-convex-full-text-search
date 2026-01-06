import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function SearchSidebar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchChannel, setSearchChannel] = useState<string>("");
  const [searchAuthor, setSearchAuthor] = useState("");

  const channels = useQuery(api.channels.listChannels);
  const searchResults = useQuery(
    api.search.searchInMessages,
    searchQuery
      ? {
          query: searchQuery,
          channel: searchChannel || undefined,
          authorName: searchAuthor || undefined,
        }
      : "skip",
  );

  return (
    <div className="w-[30%] flex flex-col border-l-2 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
      <div className="p-4 border-b-2 border-slate-200 dark:border-slate-800">
        <h2 className="text-xl font-bold mb-4">Search Messages</h2>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">
              Search Text
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search message content..."
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded bg-light dark:bg-dark"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Filter by Channel
            </label>
            <select
              value={searchChannel}
              onChange={(e) => setSearchChannel(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded bg-light dark:bg-dark"
            >
              <option value="">All channels</option>
              {channels?.map((channel) => (
                <option key={channel._id} value={channel.name}>
                  #{channel.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Filter by Author
            </label>
            <input
              type="text"
              value={searchAuthor}
              onChange={(e) => setSearchAuthor(e.target.value)}
              placeholder="Author name..."
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded bg-light dark:bg-dark"
            />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {!searchQuery ? (
          <div className="text-slate-500 text-center mt-8">
            Enter a search query to find messages
          </div>
        ) : searchResults === undefined ? (
          <div className="text-slate-500">Searching...</div>
        ) : searchResults.length === 0 ? (
          <div className="text-slate-500">No messages found</div>
        ) : (
          <div className="space-y-4">
            {searchResults.map((message) => (
              <div
                key={message._id}
                className="border-b border-slate-200 dark:border-slate-700 pb-3"
              >
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-semibold">{message.author.name}</span>
                  <span className="text-xs text-slate-500">
                    #{message.channel}
                  </span>
                  <span className="text-xs text-slate-500">
                    {new Date(message._creationTime).toLocaleString()}
                  </span>
                </div>
                <div className="text-slate-700 dark:text-slate-300">
                  {message.body}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
