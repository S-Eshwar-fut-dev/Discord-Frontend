"use client";

import React from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { Reaction } from "@/types/reaction";

interface ReactionBarProps {
  reactions: Reaction[];
  onReactionClick: (emoji: string) => void;
  onAddClick: () => void;
  messageId: string;
}

export default function ReactionBar({
  reactions,
  onReactionClick,
  onAddClick,
  messageId,
}: ReactionBarProps) {
  if (reactions.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap gap-1 mt-1"
    >
      {reactions.map((reaction) => (
        <motion.button
          key={`${messageId}-${reaction.emoji}`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onReactionClick(reaction.emoji)}
          className={cn(
            "flex items-center gap-1 px-1.5 py-0.5 rounded border transition-colors",
            reaction.me
              ? "bg-[#5865f2]/20 border-[#5865f2] text-white"
              : "bg-[#2b2d31] border-[#3f4147] text-[#dbdee1] hover:border-[#5865f2]/50"
          )}
          title={`${reaction.count} reaction${reaction.count > 1 ? "s" : ""}`}
        >
          <span className="text-sm">{reaction.emoji}</span>
          <span className="text-xs font-medium">{reaction.count}</span>
        </motion.button>
      ))}

      {/* Add Reaction Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onAddClick}
        className="flex items-center justify-center w-6 h-6 rounded border border-[#3f4147] hover:border-[#5865f2]/50 bg-[#2b2d31] transition-colors"
        title="Add reaction"
      >
        <Plus size={14} className="text-[#b5bac1]" />
      </motion.button>
    </motion.div>
  );
}
