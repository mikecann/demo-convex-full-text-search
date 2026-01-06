import { useState } from "react";
import Channels from "./components/Channels";
import MessagesList from "./components/MessagesList";
import MessageInput from "./components/MessageInput";
import SearchSidebar from "./components/SearchSidebar";

export default function App() {
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);

  return (
    <>
      <header className="sticky top-0 z-10 bg-light dark:bg-dark p-4 border-b-2 border-slate-200 dark:border-slate-800">
        Convex + React Chat
      </header>
      <main className="flex h-[calc(100vh-73px)]">
        <div className="flex-1 flex flex-col border-r-2 border-slate-200 dark:border-slate-800">
          <Channels
            selectedChannel={selectedChannel}
            onSelectChannel={setSelectedChannel}
          />
          <div className="flex-1 overflow-y-auto p-4">
            <MessagesList channel={selectedChannel} />
          </div>
          <MessageInput channel={selectedChannel} />
        </div>
        <SearchSidebar />
      </main>
    </>
  );
}
