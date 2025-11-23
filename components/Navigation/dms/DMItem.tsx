"use client";

import React from "react";
import { X } from "lucide-react";
import { Friend } from "@/components/mocks/mockFriends";
import Avatar from "@/components/ui/Avatar";
import { cn } from "@/lib/utils/cn";

interface DMItemProps {
  friend: Friend;
  onClick?: (f: Friend) => void;
  onClose?: (f: Friend) => void;
  isActive?: boolean;
}

export default function DMItem({
  friend,
  onClick,
  onClose,
  isActive = false,
}: DMItemProps) {
  return (
    <button
      onClick={() => onClick?.(friend)}
      className={cn(
        "group w-full flex items-center gap-3 px-2 py-2 rounded transition-colors",
        isActive
          ? "bg-[#404249] text-white"
          : "hover:bg-[#35373c] text-[#b5bac1]"
      )}
    >
      <Avatar
        src={friend.avatar ?? undefined}
        alt={friend.username}
        size={32}
        status={friend.status}
        fallback={friend.username}
      />

      <div className="flex-1 min-w-0 text-left">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium truncate">
            {friend.username}
          </span>
          {friend.tag && (
            <span className="text-xs text-[#87888c]">{friend.tag}</span>
          )}
        </div>
        {friend.lastMessage && (
          <div className="text-xs text-[#87888c] truncate">
            {friend.lastMessage}
          </div>
        )}
      </div>

      {/* Unread badge */}
      {friend.unread && friend.unread > 0 ? (
        <div className="flex-none w-5 h-5 flex items-center justify-center bg-[#f23f43] text-white text-xs font-bold rounded-full">
          {friend.unread}
        </div>
      ) : (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose?.(friend);
          }}
          className="flex-none opacity-0 group-hover:opacity-100 p-1 hover:bg-[#2b2d31] rounded transition-opacity"
        >
          <X size={16} />
        </button>
      )}
    </button>
  );
}
