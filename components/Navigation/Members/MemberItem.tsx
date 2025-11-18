// components/navigation/members/MemberItem.tsx
"use client";

import Image from "next/image";
import { memo } from "react";
import { cn } from "@/lib/cn";
import type { Member } from "../../mocks/mockMembers";

export default memo(function MemberItem({
  member,
  onMouseEnter,
  onMouseLeave,
  compact = false,
}: {
  member: Member;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  compact?: boolean;
}) {
  const statusColorMap: Record<Member["status"], string> = {
    online: "bg-green-500",
    idle: "bg-yellow-400",
    dnd: "bg-red-500",
    offline: "bg-gray-500",
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={cn(
        "flex items-center gap-3 px-2 py-2 rounded-md hover:bg-[#2b2d31] transition-colors",
        compact ? "py-1" : ""
      )}
      aria-label={`${member.username} ${member.status}`}
    >
      <div className="relative flex-shrink-0 w-9 h-9">
        {member.avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={member.avatar}
            alt={`${member.username} avatar`}
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <div className="w-full h-full rounded-full bg-[#2a2b2f] flex items-center justify-center text-xs font-semibold text-white">
            {member.username.substring(0, 1).toUpperCase()}
          </div>
        )}

        <span
          className={cn(
            "absolute right-0 bottom-0 w-3 h-3 rounded-full ring-2 ring-[#0f1113]",
            statusColorMap[member.status]
          )}
          aria-hidden
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-medium text-white truncate">
            {member.username}
          </span>
          {member.tag ? (
            <span className="text-[11px] text-gray-400">{member.tag}</span>
          ) : null}
        </div>
        <div className="text-xs text-gray-400 truncate">{member.role}</div>
      </div>
    </div>
  );
});
