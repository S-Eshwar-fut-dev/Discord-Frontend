"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Search, UserPlus, Users } from "lucide-react";
import DMItem from "./DMItem";
import { mockFriends, type Friend } from "@/components/mocks/mockFriends";
import { useFriendsStore } from "@/store/friends";
import IconButton from "@/components/ui/IconButton";
import { cn } from "@/lib/utils/cn";

interface DMSidebarProps {
  onOpenDM?: (f: Friend) => void;
}

export default function DMSidebar({ onOpenDM }: DMSidebarProps) {
  const { friends, setFriends } = useFriendsStore();
  const [query, setQuery] = useState("");
  const [activeDmId, setActiveDmId] = useState<string | null>(null);

  useEffect(() => {
    setFriends(mockFriends);
  }, [setFriends]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return friends;
    return friends.filter((f) =>
      `${f.username} ${f.tag ?? ""}`.toLowerCase().includes(q)
    );
  }, [friends, query]);

  const online = filtered.filter((f) => f.status === "online");
  const offline = filtered.filter((f) => f.status !== "online");

  const handleOpenDM = (friend: Friend) => {
    setActiveDmId(friend.id);
    onOpenDM?.(friend);
  };

  return (
    <aside className="h-full flex flex-col bg-[#2b2d31] overflow-hidden">
      {/* Header */}
      <div className="flex-none px-3 py-3 border-b border-[#1e1f22]">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-semibold uppercase text-[#949ba4]">
            Direct Messages
          </h2>
          <IconButton
            icon={<UserPlus size={16} />}
            label="Create DM"
            size="sm"
          />
        </div>

        {/* Search */}
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#87888c]"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search conversations"
            className="w-full pl-9 pr-3 py-1.5 bg-[#1e1f22] text-sm text-[#dbdee1] placeholder-[#87888c] rounded outline-none focus:ring-1 focus:ring-[#00a8fc]"
          />
        </div>
      </div>

      {/* Friends button */}
      <div className="flex-none px-2 py-2 border-b border-[#1e1f22]">
        <button className="w-full flex items-center gap-3 px-2 py-2 rounded hover:bg-[#35373c] transition-colors text-left">
          <div className="w-8 h-8 bg-[#5865f2] rounded-full flex items-center justify-center">
            <Users size={18} className="text-white" />
          </div>
          <span className="text-sm font-medium text-[#dbdee1]">Friends</span>
        </button>
      </div>

      {/* DMs list */}
      <div className="flex-1 overflow-y-auto custom-scroll px-2 py-2">
        {/* Online */}
        {online.length > 0 && (
          <div className="mb-4">
            <h3 className="px-2 mb-1 text-xs font-semibold uppercase text-[#949ba4]">
              Online — {online.length}
            </h3>
            <div className="space-y-0.5">
              {online.map((f) => (
                <DMItem
                  key={f.id}
                  friend={f}
                  onClick={handleOpenDM}
                  isActive={activeDmId === f.id}
                />
              ))}
            </div>
          </div>
        )}

        {/* Offline */}
        {offline.length > 0 && (
          <div>
            <h3 className="px-2 mb-1 text-xs font-semibold uppercase text-[#949ba4]">
              Offline — {offline.length}
            </h3>
            <div className="space-y-0.5">
              {offline.map((f) => (
                <DMItem
                  key={f.id}
                  friend={f}
                  onClick={handleOpenDM}
                  isActive={activeDmId === f.id}
                />
              ))}
            </div>
          </div>
        )}

        {filtered.length === 0 && (
          <div className="flex items-center justify-center h-32 text-sm text-[#87888c]">
            No conversations found
          </div>
        )}
      </div>
    </aside>
  );
}
