// components/navigation/members/MembersSidebar.tsx
"use client";

import { useState, useMemo } from "react";
import MemberItem from "./MemberItem";
import MemberPopover from "./MemberPopover";
import { mockMembers, type Member } from "../../mocks/mockMembers";
import { cn } from "@/lib/cn";

export default function MembersSidebar({
  compact = false,
}: {
  compact?: boolean;
}) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // group by role (owner, moderator, members, bots)
  const grouped = useMemo(() => {
    const map = new Map<string, Member[]>();
    for (const m of mockMembers) {
      const role = m.role || "Members";
      if (!map.has(role)) map.set(role, []);
      map.get(role)!.push(m);
    }
    return Array.from(map.entries());
  }, []);

  return (
    <aside
      className={cn(
        "h-full overflow-y-auto bg-[#161617] p-3 text-gray-200",
        compact ? "w-48" : "w-80"
      )}
    >
      <div className="mb-3">
        <div className="text-sm font-semibold text-white flex items-center justify-between">
          <span>Members</span>
          <span className="text-xs text-gray-400">{mockMembers.length}</span>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {grouped.map(([role, members]) => (
          <div key={role}>
            <div className="text-xs text-gray-400 uppercase tracking-wide mb-2 flex items-center justify-between">
              <span>{role}</span>
              <span className="text-[11px] text-gray-500">
                {members.length}
              </span>
            </div>

            <div className="flex flex-col gap-1 relative">
              {members.map((m) => (
                <div key={m.id} className="relative">
                  <MemberItem
                    member={m}
                    onMouseEnter={() => setHoveredId(m.id)}
                    onMouseLeave={() =>
                      setHoveredId((cur) => (cur === m.id ? null : cur))
                    }
                    compact={compact}
                  />

                  {hoveredId === m.id && (
                    <div className="absolute right-full top-0 mr-2">
                      <MemberPopover member={m} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
