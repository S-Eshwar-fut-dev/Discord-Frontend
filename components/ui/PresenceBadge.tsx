"use client";

import React from "react";
import { cn } from "@/lib/utils/cn";

export type PresenceStatus = "online" | "idle" | "dnd" | "offline";

interface PresenceBadgeProps {
  status: PresenceStatus;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function PresenceBadge({
  status,
  size = "md",
  className,
}: PresenceBadgeProps) {
  const statusColors = {
    online: "bg-[#23a55a]",
    idle: "bg-[#f0b232]",
    dnd: "bg-[#f23f43]",
    offline: "bg-[#80848e]",
  };

  const sizes = {
    sm: "w-2 h-2",
    md: "w-3 h-3",
    lg: "w-4 h-4",
  };

  return (
    <span
      className={cn(
        "rounded-full border-2 border-[#2b2d31]",
        statusColors[status],
        sizes[size],
        className
      )}
      aria-label={status}
    />
  );
}
