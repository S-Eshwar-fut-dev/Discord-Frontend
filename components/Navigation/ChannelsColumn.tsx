// app/dashboard/ChannelsColumn.tsx
"use client";

import { useState } from "react";
import { Search, Plus, Hash, Settings, UserPlus } from "lucide-react";

const channels = [
  { id: "general", name: "general", type: "text" },
  { id: "announcements", name: "announcements", type: "text" },
  { id: "voice-1", name: "General", type: "voice" },
];

const dms = [
  {
    id: "u1",
    name: "InnocentZERO",
    avatar: "/avatars/2.png",
    status: "offline",
  },
  { id: "u2", name: "KingDudeDS", avatar: "/avatars/3.png", status: "offline" },
];

export default function ChannelsColumn() {
  const [activeChannel, setActiveChannel] = useState<string>("general");
  const [query, setQuery] = useState("");
  const [showCreate, setShowCreate] = useState(false);

  const filteredDMs = dms.filter((d) =>
    d.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col bg-[#0f1113]">
      {/* header */}
      <div className="px-4 py-3 border-b border-[#202225] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h3 className="font-semibold">Eshwar S's server</h3>
          <button className="text-xs text-gray-400 px-2 py-1 rounded-md bg-[#1b1c1d]">
            # general
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-md hover:bg-[#1b1c1d]">
            <Settings size={16} />
          </button>
        </div>
      </div>

      {/* search */}
      <div className="px-3 py-2 border-b border-[#202225]">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-3 text-gray-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-3 py-2 rounded-md bg-[#121214] text-sm placeholder-gray-500 outline-none ring-1 ring-[#1f2022] focus:ring-indigo-500"
            placeholder="Search or start a conversation"
          />
        </div>
      </div>

      {/* channels list */}
      <div className="px-3 py-3 overflow-auto">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs text-gray-400 font-semibold">
            Text Channels
          </div>
          <button
            onClick={() => setShowCreate(true)}
            className="p-1 rounded-full hover:bg-[#1b1c1d]"
            title="Create channel"
          >
            <Plus size={14} />
          </button>
        </div>

        <div className="space-y-1">
          {channels
            .filter((c) => c.type === "text")
            .map((c) => (
              <div
                key={c.id}
                onClick={() => setActiveChannel(c.id)}
                className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer ${
                  activeChannel === c.id ? "bg-[#232428]" : "hover:bg-[#151617]"
                }`}
              >
                <Hash size={14} className="text-gray-400" />
                <span className="text-sm">{c.name}</span>
                {activeChannel === c.id && (
                  <div className="ml-auto flex items-center gap-2 text-gray-300">
                    <button
                      title="Members"
                      className="p-1 hover:bg-[#1b1b1d] rounded-md"
                    >
                      <UserPlus size={14} />
                    </button>
                    <button
                      title="Channel settings"
                      className="p-1 hover:bg-[#1b1b1d] rounded-md"
                    >
                      <Settings size={14} />
                    </button>
                  </div>
                )}
              </div>
            ))}
        </div>

        {/* voice channels header */}
        <div className="mt-4 text-xs text-gray-400 font-semibold flex items-center justify-between">
          <span>Voice Channels</span>
          <button className="p-1 rounded-full hover:bg-[#1b1c1d]">
            <Plus size={12} />
          </button>
        </div>

        <div className="mt-2">
          {channels
            .filter((c) => c.type === "voice")
            .map((c) => (
              <div
                key={c.id}
                className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#151617]"
              >
                <span className="text-gray-400">🔊</span>
                <span className="text-sm">{c.name}</span>
              </div>
            ))}
        </div>

        {/* Direct messages */}
        <div className="mt-6">
          <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
            <span>Direct Messages</span>
            <button className="p-1 rounded-full hover:bg-[#1b1c1d]">
              <Plus size={12} />
            </button>
          </div>

          <div className="space-y-2">
            {filteredDMs.map((d) => (
              <div
                key={d.id}
                className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#151617] cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-gray-600 overflow-hidden">
                  <img
                    src={d.avatar}
                    alt={d.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium">{d.name}</div>
                  <div className="text-xs text-gray-400">Offline</div>
                </div>
                <div className="text-gray-400">⋯</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Create channel modal (basic) */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowCreate(false)}
          />
          <div className="relative w-[520px] rounded-lg bg-[#2b2d31] p-6 ring-1 ring-black/40 shadow-xl">
            <h3 className="text-lg font-semibold mb-2">Create Channel</h3>
            <input
              className="w-full rounded-md bg-[#141516] px-3 py-2 mb-3"
              placeholder="Channel name"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowCreate(false)}
                className="px-3 py-2 rounded-md bg-[#141516]"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowCreate(false)}
                className="px-3 py-2 rounded-md bg-indigo-500"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
