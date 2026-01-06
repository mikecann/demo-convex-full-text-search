import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

type MessagesListProps = {
  channel: string | null;
};

export default function MessagesList({ channel }: MessagesListProps) {
  const messages = useQuery(
    api.messages.listMessages,
    channel ? { channel } : "skip",
  );

  if (!channel) {
    return (
      <div className="text-slate-500 text-center mt-8">
        Select a channel to view messages
      </div>
    );
  }

  if (messages === undefined) {
    return <div className="text-slate-500">Loading messages...</div>;
  }

  if (messages.length === 0) {
    return (
      <div className="text-slate-500">No messages yet in this channel</div>
    );
  }

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div
          key={message._id}
          className="border-b border-slate-200 dark:border-slate-700 pb-3"
        >
          <div className="flex items-baseline gap-2 mb-1">
            <span className="font-semibold">{message.author.name}</span>
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
  );
}
