"use client";

import React, { useState, useRef, useEffect } from "react";
import { Plus, Gift, Sticker, Smile } from "lucide-react";
import IconButton from "../ui/IconButton";
import { cn } from "@/lib/cn";

interface ComposerProps {
  channelId?: string;
  onSend?: (content: string) => Promise<void>;
}

export default function Composer({
  channelId = "general",
  onSend,
}: ComposerProps) {
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  }, [text]);

  async function handleSend() {
    const trimmed = text.trim();
    if (!trimmed || sending || !onSend) return;

    setSending(true);

    try {
      await onSend(trimmed);
      setText("");
    } catch (err) {
      console.error("Failed to send message:", err);
    } finally {
      setSending(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="px-4 pb-6">
      <div className="flex items-end gap-4 bg-[#383a40] rounded-lg px-4 py-3">
        {/* Attachment button */}
        <IconButton
          icon={<Plus size={20} />}
          label="Add attachments"
          className="text-[#b5bac1] hover:text-white"
        />

        {/* Text input */}
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Message #${channelId}`}
            rows={1}
            className={cn(
              "w-full bg-transparent text-[#dbdee1] placeholder-[#87888c]",
              "resize-none outline-none",
              "max-h-[200px] overflow-y-auto custom-scroll"
            )}
            disabled={sending}
          />
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <IconButton
            icon={<Gift size={20} />}
            label="Send gift"
            className="text-[#b5bac1] hover:text-white"
          />
          <IconButton
            icon={<Sticker size={20} />}
            label="Send sticker"
            className="text-[#b5bac1] hover:text-white"
          />
          <IconButton
            icon={<Smile size={20} />}
            label="Add emoji"
            className="text-[#b5bac1] hover:text-white"
          />
        </div>
      </div>

      {/* Character count (optional) */}
      {text.length > 1900 && (
        <div className="mt-2 text-xs text-right">
          <span
            className={cn(
              text.length > 2000 ? "text-red-400" : "text-[#949ba4]"
            )}
          >
            {text.length} / 2000
          </span>
        </div>
      )}

      {/* Sending indicator */}
      {sending && (
        <div className="mt-2 text-xs text-[#87888c]">Sending message...</div>
      )}
    </div>
  );
}
