"use client";

import React from "react";
import { Hash, Volume2, Lock, Settings } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import IconButton from "@/components/ui/IconButton";

interface ChannelItemProps {
  name: string;
  type: "text" | "voice";
  selected?: boolean;
  locked?: boolean;
  unread?: boolean;
  mentions?: number;
  onClick?: () => void;
}

export default function ChannelItem({
  name,
  type,
  selected = false,
  locked = false,
  unread = false,
  mentions = 0,
  onClick,
}: ChannelItemProps) {
  const Icon = type === "text" ? Hash : Volume2;

  return (
    <button
      onClick={onClick}
      className={cn(
        "group w-full flex items-center gap-1.5 px-2 py-1.5 rounded transition-colors text-left",
        selected
          ? "bg-[#404249] text-white"
          : "text-[#949ba4] hover:bg-[#35373c] hover:text-[#dbdee1]"
      )}
    >
      <Icon size={18} className="shrink-0" />

      <span
        className={cn(
          "flex-1 text-sm font-medium truncate",
          unread && !selected && "text-white font-semibold"
        )}
      >
        {name}
      </span>

      {locked && <Lock size={14} className="shrink-0 text-[#87888c]" />}

      {mentions > 0 && (
        <span className="shrink-0 px-1.5 py-0.5 bg-[#f23f43] text-white text-xs font-bold rounded-full min-w-[18px] text-center">
          {mentions > 99 ? "99+" : mentions}
        </span>
      )}

      {selected && (
        <IconButton
          icon={<Settings size={16} />}
          label="Channel settings"
          size="sm"
          className="opacity-0 group-hover:opacity-100"
          onClick={(e) => {
            e.stopPropagation();
            // Handle settings click
          }}
        />
      )}
    </button>
  );
}
