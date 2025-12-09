"use client";

import React, { useEffect, useRef, useState } from "react";
import { Search, Hash, User, Globe, Command } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { useSearch, type SearchResult } from "@/hooks/useSearch";
import Avatar from "@/components/ui/Avatar";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const { query, setQuery, results, handleSelect } = useSearch(isOpen, onClose);
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Auto-focus input
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, results.length));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev === 0 ? Math.max(1, results.length) - 1 : prev - 1
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (results[selectedIndex]) {
          handleSelect(results[selectedIndex]);
        }
      } else if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, results, selectedIndex, handleSelect, onClose]);

  // Reset selection when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-start justify-center pt-24 px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -10 }}
        transition={{ duration: 0.1 }}
        className="relative w-full max-w-[570px] bg-[#313338] rounded-lg shadow-2xl overflow-hidden flex flex-col border border-[#1e1f22]"
      >
        {/* Search Header */}
        <div className="flex items-center px-4 h-14 border-b border-[#1e1f22] bg-[#313338]">
          <Search className="w-5 h-5 text-[#949ba4] mr-3" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Where would you like to go?"
            className="flex-1 bg-transparent text-[#dbdee1] placeholder-[#949ba4] text-[15px] outline-none"
          />
          <div className="flex items-center gap-1 text-xs text-[#949ba4]">
            <span className="bg-[#1e1f22] px-1.5 py-0.5 rounded border border-[#1e1f22]">
              ESC
            </span>
            <span>to close</span>
          </div>
        </div>

        {/* Results List */}
        <div className="max-h-[400px] overflow-y-auto custom-scroll py-2">
          {results.length === 0 && query && (
            <div className="px-16 py-12 text-center">
              <div className="mb-4 flex justify-center">
                <Search className="w-12 h-12 text-[#4e5058]" />
              </div>
              <p className="text-[#949ba4]">
                We couldn't find anything matching "{query}"
              </p>
            </div>
          )}

          {results.length === 0 && !query && (
            <div className="px-4 py-2 text-xs font-bold text-[#949ba4] uppercase tracking-wide">
              Suggested
            </div>
          )}

          <div className="px-2 space-y-0.5">
            {results.map((result, index) => (
              <ResultItem
                key={`${result.type}-${result.id}`}
                result={result}
                selected={index === selectedIndex}
                onClick={() => handleSelect(result)}
                onMouseEnter={() => setSelectedIndex(index)}
              />
            ))}
          </div>
        </div>

        {/* Footer */}
        {results.length > 0 && (
          <div className="px-3 py-2 bg-[#2b2d31] border-t border-[#1e1f22] flex justify-end">
            <div className="flex items-center gap-3 text-xs text-[#949ba4]">
              <div className="flex items-center gap-1">
                <Command size={12} />
                <span>Select</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-base">↵</span>
                <span>Navigate</span>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

function ResultItem({
  result,
  selected,
  onClick,
  onMouseEnter,
}: {
  result: SearchResult;
  selected: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
}) {
  return (
    <button
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      className={cn(
        "w-full flex items-center gap-3 px-3 py-2.5 rounded transition-colors text-left group",
        selected ? "bg-[#404249]" : "hover:bg-[#35373c]"
      )}
    >
      {/* Icon */}
      <div className="shrink-0">
        {result.type === "user" ? (
          <Avatar
            src={result.icon}
            alt={result.title}
            size={24}
            showStatusBadge={false}
          />
        ) : result.type === "channel" ? (
          <Hash className="w-6 h-6 text-[#949ba4]" />
        ) : (
          <div className="w-6 h-6 rounded-full bg-[#5865f2] flex items-center justify-center text-[10px] text-white font-bold">
            {result.title.substring(0, 2).toUpperCase()}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div
          className={cn(
            "font-medium text-sm truncate",
            selected ? "text-white" : "text-[#dbdee1]"
          )}
        >
          {result.title}
        </div>
        {result.subtitle && (
          <div className="text-xs text-[#949ba4] truncate">
            {result.subtitle}
          </div>
        )}
      </div>

      {/* Jump Label */}
      {selected && (
        <div className="text-xs text-[#dbdee1] opacity-50">Jump to</div>
      )}
    </button>
  );
}
