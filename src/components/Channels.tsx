import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

type ChannelsProps = {
  selectedChannel: string | null;
  onSelectChannel: (channelName: string) => void;
};

export default function Channels({
  selectedChannel,
  onSelectChannel,
}: ChannelsProps) {
  const [newChannelName, setNewChannelName] = useState("");
  const [showCreateChannel, setShowCreateChannel] = useState(false);

  const channels = useQuery(api.channels.listChannels);
  const createChannel = useMutation(api.channels.createChannel);

  const handleCreateChannel = () => {
    if (!newChannelName.trim()) return;
    createChannel({ name: newChannelName.trim() })
      .then(() => {
        setNewChannelName("");
        setShowCreateChannel(false);
      })
      .catch(console.error);
  };

  return (
    <div className="p-4 border-b-2 border-slate-200 dark:border-slate-800">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-bold">Channels</h2>
        <button
          onClick={() => setShowCreateChannel(!showCreateChannel)}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          + New Channel
        </button>
      </div>
      {showCreateChannel ? (
        <div className="flex gap-2 mt-2">
          <input
            type="text"
            value={newChannelName}
            onChange={(e) => setNewChannelName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleCreateChannel();
              if (e.key === "Escape") {
                setShowCreateChannel(false);
                setNewChannelName("");
              }
            }}
            placeholder="Channel name"
            className="flex-1 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded bg-light dark:bg-dark"
            autoFocus
          />
          <button
            onClick={handleCreateChannel}
            className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Create
          </button>
          <button
            onClick={() => {
              setShowCreateChannel(false);
              setNewChannelName("");
            }}
            className="px-3 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      ) : null}
      <div className="mt-2 space-y-1">
        {channels === undefined ? (
          <div className="text-sm text-slate-500">Loading channels...</div>
        ) : channels.length === 0 ? (
          <div className="text-sm text-slate-500">No channels yet</div>
        ) : (
          channels.map((channel) => (
            <button
              key={channel._id}
              onClick={() => onSelectChannel(channel.name)}
              className={`w-full text-left px-3 py-2 rounded ${
                selectedChannel === channel.name
                  ? "bg-blue-500 text-white"
                  : "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              #{channel.name}
            </button>
          ))
        )}
      </div>
    </div>
  );
}
