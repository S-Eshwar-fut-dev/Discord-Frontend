"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronRight, Plus } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import IconButton from "@/components/ui/IconButton";

interface ChannelCategoryProps {
  name: string;
  children: React.ReactNode;
  defaultCollapsed?: boolean;
  onCreateChannel?: () => void;
}

export default function ChannelCategory({
  name,
  children,
  defaultCollapsed = false,
  onCreateChannel,
}: ChannelCategoryProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  return (
    <div className="mt-4">
      {/* Category Header */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="group w-full flex items-center justify-between px-2 py-1 hover:text-[#dbdee1] transition-colors"
      >
        <div className="flex items-center gap-1">
          {collapsed ? (
            <ChevronRight size={12} className="text-[#949ba4]" />
          ) : (
            <ChevronDown size={12} className="text-[#949ba4]" />
          )}
          <span className="text-xs font-semibold uppercase tracking-wide text-[#949ba4]">
            {name}
          </span>
        </div>

        {onCreateChannel && (
          <IconButton
            icon={<Plus size={16} />}
            label="Create Channel"
            size="sm"
            className="opacity-0 group-hover:opacity-100"
            onClick={(e) => {
              e.stopPropagation();
              onCreateChannel();
            }}
          />
        )}
      </button>

      {/* Channels */}
      {!collapsed && <div className="mt-0.5 space-y-0.5">{children}</div>}
    </div>
  );
}
