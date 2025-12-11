"use client";

import React, { useState, useEffect } from "react";
import { Search, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

interface GifPickerProps {
  onSelect: (gifUrl: string) => void;
  onClose: () => void;
}

export default function GifPicker({ onSelect, onClose }: GifPickerProps) {
  const [query, setQuery] = useState("");
  const [gifs, setGifs] = useState<string[]>([]);

  // Mock GIF data - in production, use Tenor/GIPHY API
  const mockGifs = [
    "https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif",
    "https://media.giphy.com/media/l0HlNQ03J5JxX6lva/giphy.gif",
    "https://media.giphy.com/media/26tPnAAJxXTvpLwJy/giphy.gif",
    "https://media.giphy.com/media/26FxCOdhlvEQXbeH6/giphy.gif",
    "https://media.giphy.com/media/3o7TKSjRrfIPjeiVyM/giphy.gif",
    "https://media.giphy.com/media/l0HlSV3uU5DIihQDm/giphy.gif",
  ];

  useEffect(() => {
    // Simulate API call
    setGifs(mockGifs);
  }, [query]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 10 }}
      transition={{ duration: 0.15 }}
      className="absolute bottom-full right-0 mb-2 w-[400px] h-[450px] bg-[#2b2d31] rounded-lg shadow-2xl border border-[#1e1f22] overflow-hidden flex flex-col"
    >
      {/* Search */}
      <div className="p-3 border-b border-[#1e1f22]">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#87888c]"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for GIFs"
            className="w-full pl-10 pr-3 py-2 bg-[#1e1f22] text-[#dbdee1] placeholder-[#87888c] rounded outline-none text-sm focus:ring-1 focus:ring-[#5865f2]"
            autoFocus
          />
        </div>
      </div>

      {/* Trending */}
      {!query && (
        <div className="px-3 py-2 border-b border-[#1e1f22] flex items-center gap-2">
          <TrendingUp size={16} className="text-[#f23f43]" />
          <span className="text-xs font-bold text-[#dbdee1] uppercase">
            Trending GIFs
          </span>
        </div>
      )}

      {/* GIF Grid */}
      <div className="flex-1 overflow-y-auto custom-scroll p-2">
        <div className="grid grid-cols-2 gap-2">
          {gifs.map((gif, index) => (
            <button
              key={index}
              onClick={() => {
                onSelect(gif);
                onClose();
              }}
              className="aspect-square rounded overflow-hidden hover:opacity-80 transition-opacity bg-[#1e1f22]"
            >
              <img src={gif} alt="GIF" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>

        {gifs.length === 0 && (
          <div className="flex items-center justify-center h-full text-[#87888c] text-sm">
            No GIFs found
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-2 border-t border-[#1e1f22] flex items-center justify-center">
        <span className="text-xs text-[#87888c]">Powered by GIPHY</span>
      </div>
    </motion.div>
  );
}
