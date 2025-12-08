"use client";

import React, { useState, useMemo } from "react";
import { Search } from "lucide-react";
import MemberItem from "./MemberItem";
import { mockMembers, type Member } from "@/components/mocks/mockMembers";
import { cn } from "@/lib/utils/cn";
import { motion } from "framer-motion";

interface MembersSidebarProps {
  compact?: boolean;
}

export default function MembersSidebar({
  compact = false,
}: MembersSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Group members by role and filter by search
  const groupedMembers = useMemo(() => {
    const filtered = mockMembers.filter((m) =>
      m.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const groups = new Map<string, Member[]>();
    filtered.forEach((member) => {
      const role = member.role || "Members";
      if (!groups.has(role)) groups.set(role, []);
      groups.get(role)!.push(member);
    });

    // Sort by online status within each group
    groups.forEach((members) => {
      members.sort((a, b) => {
        const statusOrder = { online: 0, idle: 1, dnd: 2, offline: 3 };
        return statusOrder[a.status] - statusOrder[b.status];
      });
    });

    return Array.from(groups.entries());
  }, [searchQuery]);

  const totalMembers = mockMembers.length;
  const onlineMembers = mockMembers.filter((m) => m.status === "online").length;

  return (
    <motion.aside
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2 }}
      className="h-full flex flex-col bg-[#2b2d31]"
    >
      {/* Header */}
      <div className="flex-none px-3 py-4 border-b border-[#1e1f22]">
        <h2 className="text-xs font-semibold uppercase text-[#949ba4] mb-3">
          Members — {totalMembers}
        </h2>

        {/* Search */}
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#87888c]"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search members"
            className="w-full pl-9 pr-3 py-1.5 bg-[#1e1f22] text-sm text-[#dbdee1] placeholder-[#87888c] rounded outline-none focus:ring-1 focus:ring-[#00a8fc]"
          />
        </div>
      </div>

      {/* Members list */}
      <div className="flex-1 overflow-y-auto custom-scroll px-2 py-2">
        {groupedMembers.map(([role, members]) => (
          <div key={role} className="mb-4">
            {/* Role header */}
            <div className="flex items-center justify-between px-2 mb-1">
              <h3 className="text-xs font-semibold uppercase text-[#949ba4]">
                {role}
              </h3>
              <span className="text-xs text-[#87888c]">{members.length}</span>
            </div>

            {/* Members */}
            <div className="space-y-0.5">
              {members.map((member) => (
                <MemberItem key={member.id} member={member} compact={compact} />
              ))}
            </div>
          </div>
        ))}

        {groupedMembers.length === 0 && (
          <div className="flex items-center justify-center h-32 text-sm text-[#87888c]">
            No members found
          </div>
        )}
      </div>
    </motion.aside>
  );
}
