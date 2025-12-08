"use client";

import React from "react";
import { cn } from "@/lib/utils/cn";

interface GuildIconProps {
  // 1. Allow 'icon' to be a string URL OR a React Component
  icon?: React.ReactNode | string;
  name: string;
  unread?: boolean;
  mentions?: number;
  isActive?: boolean;
  isHome?: boolean;
  onClick?: () => void;
}

export default function GuildIcon({
  icon,
  name,
  unread = false,
  mentions = 0,
  isActive = false,
  onClick,
}: GuildIconProps) {
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="relative group">
      {/* Unread indicator */}
      {(unread || mentions > 0) && !isActive && (
        <div
          className={cn(
            "absolute -left-1 top-1/2 -translate-y-1/2 w-2 rounded-r-full bg-white transition-all",
            mentions > 0 ? "h-10" : "h-2"
          )}
        />
      )}

      {/* Active indicator */}
      {isActive && (
        <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-10 rounded-r-full bg-white transition-all" />
      )}

      <button
        onClick={onClick}
        className={cn(
          "relative w-12 h-12 flex items-center justify-center rounded-3xl transition-all duration-200 overflow-hidden", // Added overflow-hidden to clip images correctly
          "group-hover:rounded-2xl",
          isActive
            ? "rounded-2xl bg-[#5865f2] text-white"
            : "bg-[#313338] text-[#dbdee1] hover:bg-[#5865f2] hover:text-white"
        )}
        title={name}
      >
        {/* 2. LOGIC UPDATE: Handle String vs Component */}
        {!icon ? (
          <span className="text-sm font-medium">{initials}</span>
        ) : typeof icon === "string" ? (
          <img src={icon} alt={name} className="w-full h-full object-cover" />
        ) : (
          /* If it is a Component (like <Laptop />), render it directly */
          icon
        )}

        {mentions > 0 && (
          <div className="absolute -bottom-1 -right-1 min-w-[18px] h-[18px] px-1 flex items-center justify-center bg-[#f23f43] text-white text-xs font-bold rounded-full border-2 border-[#1e1f22]">
            {mentions > 99 ? "99+" : mentions}
          </div>
        )}
      </button>

      {/* Tooltip */}
      <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-3 py-2 bg-[#111214] text-white text-sm font-semibold rounded-md shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
        {name}
        {/* Tooltip Arrow */}
        <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-[#111214]" />
      </div>
    </div>
  );
}
