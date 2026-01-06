import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

type MessageInputProps = {
  channel: string | null;
};

export default function MessageInput({ channel }: MessageInputProps) {
  const [authorName, setAuthorName] = useState("");
  const [messageBody, setMessageBody] = useState("");

  const createMessage = useMutation(api.messages.createMessage);

  const handleSendMessage = () => {
    if (!channel || !messageBody.trim() || !authorName.trim()) return;
    createMessage({
      body: messageBody.trim(),
      authorName: authorName.trim(),
      channel,
    })
      .then(() => {
        setMessageBody("");
      })
      .catch(console.error);
  };

  if (!channel) return null;

  return (
    <div className="p-4 border-t-2 border-slate-200 dark:border-slate-800">
      <div className="mb-2">
        <input
          type="text"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          placeholder="Your name"
          className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded bg-light dark:bg-dark"
        />
      </div>
      <div className="flex gap-2">
        <textarea
          value={messageBody}
          onChange={(e) => setMessageBody(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          placeholder="Type a message..."
          rows={3}
          className="flex-1 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded bg-light dark:bg-dark resize-none"
        />
        <button
          onClick={handleSendMessage}
          disabled={!messageBody.trim() || !authorName.trim()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </div>
    </div>
  );
}
