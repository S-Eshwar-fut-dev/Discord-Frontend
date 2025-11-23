"use client";

import React from "react";
import { Friend } from "../../mocks/mockFriends";
import { cn } from "@/lib/utils/cn";

export default function FriendItem({
  friend,
  onClick,
}: {
  friend: Friend;
  onClick?: (f: Friend) => void;
}) {
  const statusColor: Record<Friend["status"], string> = {
    online: "bg-green-500",
    idle: "bg-yellow-400",
    dnd: "bg-red-500",
    offline: "bg-gray-500",
  };

  return (
    <button
      onClick={() => onClick?.(friend)}
      className={cn(
        "flex items-center gap-3 px-2 py-2 rounded-md w-full text-left hover:bg-[#232427] transition"
      )}
    >
      <div className="relative w-10 h-10 flex-shrink-0">
        {friend.avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={friend.avatar}
            alt={friend.username}
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <div className="w-full h-full rounded-full bg-[#2a2b2f] flex items-center justify-center text-xs font-semibold text-white">
            {friend.username[0]}
          </div>
        )}

        <span
          className={cn(
            "absolute right-0 bottom-0 w-3 h-3 rounded-full ring-2 ring-[#0f1113]",
            statusColor[friend.status]
          )}
          aria-hidden
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-medium text-white truncate">
            {friend.username}
          </span>
          {friend.tag && (
            <span className="text-[11px] text-gray-400">{friend.tag}</span>
          )}
        </div>
        <div className="text-xs text-gray-400 truncate">
          {friend.lastMessage ?? ""}
        </div>
      </div>

      {friend.unread ? (
        <div className="ml-2">
          <div className="bg-indigo-500 text-[11px] font-semibold px-2 py-[2px] rounded-full">
            {friend.unread}
          </div>
        </div>
      ) : null}
    </button>
  );
}
