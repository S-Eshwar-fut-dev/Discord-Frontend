"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Clock } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface ReactionPickerProps {
  onSelect: (emoji: string) => void;
  onClose: () => void;
}

// Popular emoji categories
const EMOJI_CATEGORIES = {
  frequent: ["👍", "❤️", "😂", "😮", "😢", "🙏", "👏", "🔥"],
  people: [
    "😀",
    "😃",
    "😄",
    "😁",
    "😅",
    "😂",
    "🤣",
    "😊",
    "😇",
    "🙂",
    "🙃",
    "😉",
    "😌",
    "😍",
    "🥰",
    "😘",
    "😗",
    "😙",
    "😚",
    "😋",
    "😛",
    "😝",
    "😜",
    "🤪",
    "🤨",
    "🧐",
    "🤓",
    "😎",
    "🥳",
    "😏",
    "😒",
    "😞",
  ],
  nature: [
    "🐶",
    "🐱",
    "🐭",
    "🐹",
    "🐰",
    "🦊",
    "🐻",
    "🐼",
    "🐨",
    "🐯",
    "🦁",
    "🐮",
    "🐷",
    "🐸",
    "🐵",
    "🐔",
    "🌸",
    "🌺",
    "🌻",
    "🌷",
    "🌹",
    "🥀",
    "🌴",
    "🌳",
  ],
  food: [
    "🍎",
    "🍊",
    "🍋",
    "🍌",
    "🍉",
    "🍇",
    "🍓",
    "🫐",
    "🍒",
    "🍑",
    "🥭",
    "🍍",
    "🥥",
    "🥝",
    "🍅",
    "🥑",
    "🍆",
    "🥦",
    "🥬",
    "🥒",
    "🌶️",
    "🌽",
    "🥕",
    "🫑",
  ],
  activities: [
    "⚽",
    "🏀",
    "🏈",
    "⚾",
    "🥎",
    "🎾",
    "🏐",
    "🏉",
    "🥏",
    "🎱",
    "🪀",
    "🏓",
    "🏸",
    "🏒",
    "🏑",
    "🥍",
    "🏹",
    "🎣",
    "🤿",
    "🥊",
    "🥋",
    "🎽",
    "🛹",
    "🛼",
  ],
  objects: [
    "⌚",
    "📱",
    "💻",
    "⌨️",
    "🖥️",
    "🖨️",
    "🖱️",
    "🖲️",
    "🕹️",
    "🗜️",
    "💾",
    "💿",
    "📀",
    "📼",
    "📷",
    "📸",
    "📹",
    "🎥",
    "📽️",
    "🎞️",
    "📞",
    "☎️",
    "📟",
    "📠",
  ],
  symbols: [
    "❤️",
    "🧡",
    "💛",
    "💚",
    "💙",
    "💜",
    "🖤",
    "🤍",
    "🤎",
    "💔",
    "❣️",
    "💕",
    "💞",
    "💓",
    "💗",
    "💖",
    "💘",
    "💝",
    "💟",
    "☮️",
    "✝️",
    "☪️",
    "🕉️",
    "☸️",
  ],
};

const CATEGORY_LABELS = {
  frequent: "Frequently Used",
  people: "Smileys & People",
  nature: "Animals & Nature",
  food: "Food & Drink",
  activities: "Activities",
  objects: "Objects",
  symbols: "Symbols",
};

export default function ReactionPicker({
  onSelect,
  onClose,
}: ReactionPickerProps) {
  const [activeCategory, setActiveCategory] =
    useState<keyof typeof EMOJI_CATEGORIES>("frequent");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEmojis = searchQuery
    ? Object.values(EMOJI_CATEGORIES)
        .flat()
        .filter((emoji) => emoji.includes(searchQuery))
    : EMOJI_CATEGORIES[activeCategory];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 10 }}
      transition={{ duration: 0.15 }}
      className="absolute bottom-full right-0 mb-2 w-80 bg-[#2b2d31] rounded-lg shadow-2xl border border-[#1e1f22] overflow-hidden z-50"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Search */}
      <div className="p-3 border-b border-[#1e1f22]">
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#87888c]"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search emoji"
            className="w-full pl-9 pr-3 py-2 bg-[#1e1f22] text-[#dbdee1] placeholder-[#87888c] rounded outline-none text-sm"
            autoFocus
          />
        </div>
      </div>

      {/* Category Tabs */}
      {!searchQuery && (
        <div className="flex gap-1 px-2 py-2 border-b border-[#1e1f22] overflow-x-auto">
          {Object.keys(EMOJI_CATEGORIES).map((category) => (
            <button
              key={category}
              onClick={() =>
                setActiveCategory(category as keyof typeof EMOJI_CATEGORIES)
              }
              className={cn(
                "px-3 py-1.5 rounded text-xs font-medium transition-colors whitespace-nowrap",
                activeCategory === category
                  ? "bg-[#5865f2] text-white"
                  : "text-[#b5bac1] hover:bg-[#35373c]"
              )}
            >
              {CATEGORY_LABELS[category as keyof typeof CATEGORY_LABELS]}
            </button>
          ))}
        </div>
      )}

      {/* Emoji Grid */}
      <div className="p-2 max-h-64 overflow-y-auto custom-scroll">
        <div className="grid grid-cols-8 gap-1">
          {filteredEmojis.map((emoji, index) => (
            <button
              key={`${emoji}-${index}`}
              onClick={() => {
                onSelect(emoji);
                onClose();
              }}
              className="w-10 h-10 flex items-center justify-center text-2xl hover:bg-[#35373c] rounded transition-colors"
              title={emoji}
            >
              {emoji}
            </button>
          ))}
        </div>

        {filteredEmojis.length === 0 && (
          <div className="text-center py-8 text-sm text-[#87888c]">
            No emoji found
          </div>
        )}
      </div>
    </motion.div>
  );
}
