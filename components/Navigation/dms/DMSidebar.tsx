// components/Navigation/dms/DMSidebar.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, UserPlus } from "lucide-react";
import DMItem from "./DMItem";
import FriendRequests from "./FriendRequests";
import { mockFriends, type Friend } from "../../mocks/mockFriends";
import { useFriendsStore } from "@/store/friends";
import AddFriendModal from "../../overlays/AddFriendModal";
import { cn } from "@/lib/cn";

export default function DMSidebar({
  onOpenDM,
}: {
  onOpenDM?: (f: Friend) => void;
}) {
  const { friends, setFriends } = useFriendsStore();
  const [query, setQuery] = useState("");
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    setFriends(mockFriends);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return friends;
    return friends.filter((f) =>
      `${f.username} ${f.tag ?? ""}`.toLowerCase().includes(q)
    );
  }, [friends, query]);

  const online = filtered.filter((f) => f.status === "online");
  const offline = filtered.filter((f) => f.status !== "online");

  return (
    <aside className="p-3 bg-[#111214] rounded-md">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-white">Direct Messages</h3>
        <button
          onClick={() => setShowAdd(true)}
          title="Add Friend"
          className="p-1 rounded-md hover:bg-[#232427]"
        >
          <UserPlus />
        </button>
      </div>

      <div className="mb-3">
        <FriendRequests
          count={2}
          onOpen={() => console.log("open friend reqs")}
        />
      </div>

      <div className="flex items-center gap-2 px-2">
        <div className="relative flex-1">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Search />
          </div>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search or start a conversation"
            className="w-full pl-10 pr-3 py-2 rounded-md bg-[#141516] text-white placeholder-gray-500 outline-none ring-1 ring-[#1f2022]"
          />
        </div>
      </div>

      <div className="mt-3 space-y-3">
        {/* Online section */}
        <div>
          <div className="text-xs text-gray-400 uppercase tracking-wide mb-2 flex items-center justify-between">
            <span>Online — {online.length}</span>
          </div>
          <div className="flex flex-col gap-1">
            {online.length === 0 ? (
              <div className="px-3 py-2 text-sm text-gray-400">
                No one online
              </div>
            ) : (
              online.map((f) => (
                <DMItem
                  key={f.id}
                  friend={f}
                  onClick={(fr) => onOpenDM?.(fr)}
                />
              ))
            )}
          </div>
        </div>

        {/* All friends */}
        <div>
          <div className="text-xs text-gray-400 uppercase tracking-wide mb-2 flex items-center justify-between">
            <span>All Friends — {filtered.length}</span>
          </div>
          <div className="flex flex-col gap-1">
            {offline.length === 0 ? (
              <div className="px-3 py-2 text-sm text-gray-400">No friends</div>
            ) : (
              offline.map((f) => (
                <DMItem
                  key={f.id}
                  friend={f}
                  onClick={(fr) => onOpenDM?.(fr)}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {showAdd && <AddFriendModal onClose={() => setShowAdd(false)} />}
    </aside>
  );
}
