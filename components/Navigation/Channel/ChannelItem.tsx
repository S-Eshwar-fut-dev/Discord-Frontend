"use client";

import React from "react";
import { LucideIcon, Hash, Volume2, Lock, Settings } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import IconButton from "@/components/ui/IconButton";
import Avatar from "@/components/ui/Avatar";

interface ChannelItemProps {
  name: string;
  type: "text" | "voice";
  selected?: boolean;
  locked?: boolean;
  unread?: boolean;
  mentions?: number;
  icon?: LucideIcon | string;
  connectedUsers?: Array<{
    id: string;
    avatar?: string | null;
    username: string;
  }>;
  onClick?: () => void;
}

export default function ChannelItem({
  name,
  type,
  selected = false,
  locked = false,
  unread = false,
  mentions = 0,
  icon: IconProp,
  connectedUsers = [],
  onClick,
}: ChannelItemProps) {
  const Icon = type === "text" ? Hash : Volume2;

  return (
    <div className="mb-0.5">
      <button
        onClick={onClick}
        className={cn(
          "group w-full flex items-center gap-1.5 px-2 py-1.5 rounded transition-all duration-200 text-left relative channel-item",
          selected
            ? "bg-[#404249] text-white channel-item-active"
            : "text-[#949ba4] hover:bg-[#35373c] hover:text-[#dbdee1] channel-item-hover"
        )}
      >
        {/* Channel Icon or Default Icon */}
        {IconProp ? (
          typeof IconProp === "string" ? (
            <span className="shrink-0 text-base leading-none">{IconProp}</span>
          ) : (
            <IconProp size={20} className="shrink-0" />
          )
        ) : (
          <Icon size={20} className="shrink-0" />
        )}

        <span
          className={cn(
            "flex-1 text-sm font-medium truncate",
            unread && !selected && "text-white font-semibold"
          )}
        >
          {name}
        </span>

        {/* Unread Badge */}
        {unread && !selected && !mentions && (
          <div className="shrink-0 w-2 h-2 bg-white rounded-full" />
        )}

        {/* Lock Icon */}
        {locked && <Lock size={14} className="shrink-0 text-[#87888c]" />}

        {/* Mention Badge */}
        {mentions > 0 && (
          <span className="shrink-0 px-1.5 py-0.5 bg-[#f23f43] text-white text-xs font-bold rounded-full min-w-[18px] text-center">
            {mentions > 99 ? "99+" : mentions}
          </span>
        )}

        {/* Settings Icon (on hover for selected) */}
        {selected && (
          <IconButton
            icon={<Settings size={16} />}
            label="Channel settings"
            size="sm"
            className="opacity-0 group-hover:opacity-100"
            onClick={(e) => e.stopPropagation()}
          />
        )}
      </button>

      {/* Connected Users List (Voice Only) */}
      {type === "voice" && connectedUsers.length > 0 && (
        <div className="pl-8 pr-2 pb-1 space-y-1">
          {connectedUsers.map((user) => (
            <div
              key={user.id}
              className="flex items-center gap-2 px-2 py-1 rounded hover:bg-[#35373c] cursor-pointer group/user"
            >
              <Avatar
                src={user.avatar}
                size={24}
                alt={user.username}
                showStatusBadge={false}
              />
              <span className="text-sm text-[#949ba4] group-hover/user:text-[#dbdee1] truncate font-medium">
                {user.username}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
