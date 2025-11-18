"use client";

import { useEffect, useState } from "react";
import FriendItem from "./FriendItem";
import { mockFriends, type Friend } from "../../mocks/mockFriends";
import { useFriendsStore } from "@/store/friends";
import AddFriendModal from "../../overlays/AddFriendModal";
import { Search } from "lucide-react";

export default function DMList({
  onOpenChat,
}: {
  onOpenChat?: (friend: Friend) => void;
}) {
  const { friends, setFriends } = useFriendsStore();
  const [query, setQuery] = useState("");
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    setFriends(mockFriends);
  }, []);

  const filtered = friends.filter((f) =>
    `${f.username} ${f.tag ?? ""}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="mt-4">
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

        <button
          onClick={() => setShowAdd(true)}
          title="Add Friend"
          className="px-3 py-2 rounded-md bg-[#232427] hover:bg-[#2b2d31]"
        >
          Add
        </button>
      </div>

      <div className="mt-3 flex flex-col gap-1">
        {filtered.length === 0 ? (
          <div className="px-3 py-2 text-sm text-gray-400">No friends</div>
        ) : (
          filtered.map((f) => (
            <FriendItem
              key={f.id}
              friend={f}
              onClick={(fr) => onOpenChat?.(fr)}
            />
          ))
        )}
      </div>

      {showAdd && <AddFriendModal onClose={() => setShowAdd(false)} />}
    </div>
  );
}
