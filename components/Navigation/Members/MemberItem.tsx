"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils/cn";
import Avatar from "@/components/ui/Avatar";
import type { Member } from "@/components/mocks/mockMembers";

interface MemberItemProps {
  member: Member;
  compact?: boolean;
  onClick?: () => void;
}

export default React.memo(function MemberItem({
  member,
  compact = false,
  onClick,
}: MemberItemProps) {
  const [showPopover, setShowPopover] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={onClick}
        onMouseEnter={() => setShowPopover(true)}
        onMouseLeave={() => setShowPopover(false)}
        className={cn(
          "w-full flex items-center gap-3 px-2 rounded group",
          "hover:bg-[#35373c] transition-colors text-left",
          compact ? "py-1" : "py-2"
        )}
      >
        <Avatar
          src={member.avatar ?? undefined}
          alt={member.username}
          size={compact ? 28 : 32}
          status={member.status}
          fallback={member.username}
        />

        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-[#dbdee1] truncate">
            {member.username}
          </div>
          {!compact && member.tag && (
            <div className="text-xs text-[#87888c] truncate">{member.tag}</div>
          )}
        </div>
      </button>

      {/* Member Popover - show on hover */}
      {showPopover && (
        <div className="absolute left-full ml-2 top-0 z-50 w-64 bg-[#111214] rounded-lg shadow-2xl border border-[#1e1f22] p-4 pointer-events-none">
          <div className="flex flex-col items-center">
            <Avatar
              src={member.avatar ?? undefined}
              alt={member.username}
              size={80}
              status={member.status}
              fallback={member.username}
            />
            <h3 className="mt-3 text-xl font-bold text-white">
              {member.username}
            </h3>
            {member.tag && (
              <p className="text-sm text-[#87888c]">{member.tag}</p>
            )}
            <div className="mt-3 w-full">
              <div className="text-xs font-semibold text-[#b5bac1] uppercase mb-2">
                Roles
              </div>
              <div className="flex flex-wrap gap-1">
                <span className="px-2 py-1 bg-[#5865f2] text-white text-xs rounded">
                  {member.role}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});
