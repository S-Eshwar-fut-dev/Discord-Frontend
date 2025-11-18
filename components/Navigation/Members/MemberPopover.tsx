// components/navigation/members/MemberPopover.tsx
"use client";

import { motion } from "framer-motion";
import type { Member } from "../../mocks/mockMembers";

export default function MemberPopover({
  member,
  onClose,
}: {
  member: Member;
  onClose?: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 8 }}
      className="absolute z-50 right-full mr-3 top-0 w-48 rounded-md bg-[#1b1c1e] border border-[#27292b] shadow-lg p-3"
      role="dialog"
      aria-label={`${member.username} actions`}
    >
      <div className="flex items-center gap-3 mb-2">
        {member.avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={member.avatar}
            alt={member.username}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-[#2a2b2f] flex items-center justify-center text-white font-semibold">
            {member.username[0]}
          </div>
        )}

        <div>
          <div className="text-sm font-semibold text-white">
            {member.username}
          </div>
          <div className="text-xs text-gray-400">{member.role}</div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <button className="text-left px-2 py-2 rounded hover:bg-[#232427]">
          Send Message
        </button>
        <button className="text-left px-2 py-2 rounded hover:bg-[#232427]">
          View Profile
        </button>
        <button className="text-left px-2 py-2 rounded hover:bg-[#232427]">
          Add Friend
        </button>
        <div className="border-t border-[#27292b] my-2" />
        <button className="text-left px-2 py-2 rounded hover:bg-[#232427] text-red-400">
          Kick
        </button>
        <button className="text-left px-2 py-2 rounded hover:bg-[#232427] text-red-400">
          Ban
        </button>
      </div>
    </motion.div>
  );
}
