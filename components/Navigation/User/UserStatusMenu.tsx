"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Moon,
  Circle,
  MinusCircle,
  CircleDot,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { usePresence } from "@/hooks/usePresence";
import { useSessionStore } from "@/store/session";
import type { PresenceStatus } from "@/components/ui/PresenceBadge";

interface UserStatusMenuProps {
  onClose: () => void;
  onOpenCustomStatus: () => void;
}

export default function UserStatusMenu({
  onClose,
  onOpenCustomStatus,
}: UserStatusMenuProps) {
  const { user } = useSessionStore();
  const { setStatus } = usePresence();

  const handleStatusChange = (status: PresenceStatus) => {
    if (user) {
      setStatus(user.id, status);
    }
    onClose();
  };

  const menuItems = [
    {
      id: "online",
      label: "Online",
      sub: null,
      color: "bg-[#23a55a]",
      icon: <div className="w-2.5 h-2.5 rounded-full bg-[#23a55a]" />,
    },
    {
      id: "idle",
      label: "Idle",
      sub: null,
      color: "bg-[#f0b232]",
      icon: <Moon size={14} className="text-[#f0b232] fill-current" />,
    },
    {
      id: "dnd",
      label: "Do Not Disturb",
      sub: "You will not receive any desktop notifications.",
      color: "bg-[#f23f43]",
      icon: <MinusCircle size={14} className="text-[#f23f43] fill-current" />,
    },
    {
      id: "offline",
      label: "Invisible",
      sub: "You will not appear online, but will have full access.",
      color: "bg-[#80848e]",
      icon: <CircleDot size={14} className="text-[#80848e]" />,
    },
  ];

  return (
    <>
      {/* Invisible backdrop to close menu */}
      <div className="fixed inset-0 z-40" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.95 }}
        transition={{ duration: 0.1 }}
        className="absolute bottom-[60px] left-2 w-[220px] bg-[#111214] rounded-lg shadow-2xl border border-[#1e1f22] p-2 z-50"
      >
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleStatusChange(item.id as PresenceStatus)}
            className="group w-full flex items-center justify-between px-2 py-2 rounded hover:bg-[#4752c4] transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 flex items-center justify-center">
                {item.icon}
              </div>
              <div>
                <div className="text-sm font-medium text-[#dbdee1] group-hover:text-white">
                  {item.label}
                </div>
                {item.sub && (
                  <div className="text-[10px] text-[#949ba4] group-hover:text-gray-200 leading-tight mt-0.5 max-w-40">
                    {item.sub}
                  </div>
                )}
              </div>
            </div>
          </button>
        ))}

        <div className="h-px bg-[#1e1f22] my-1.5 mx-1" />

        <button
          onClick={() => {
            onOpenCustomStatus();
            onClose();
          }}
          className="group w-full flex items-center justify-between px-2 py-2 rounded hover:bg-[#4752c4] transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-3 h-3" /> {/* Spacer */}
            <div className="text-sm font-medium text-[#dbdee1] group-hover:text-white">
              Set Custom Status
            </div>
          </div>
        </button>
      </motion.div>
    </>
  );
}
