"use client";

import React, { useState, useRef, useEffect } from "react";
import { Plus, Gift, Sticker, Smile } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import type { ChatMessage, ChatUser } from "@/types/chat";
import IconButton from "../ui/IconButton";
import { cn } from "@/lib/utils/cn";

// Default mock user - replace with real session
const DEFAULT_USER: ChatUser = {
  id: "u1",
  username: "Eshwar",
  avatar: "/avatars/1.png",
  status: "online",
};

interface ComposerProps {
  channelId?: string;
  me?: ChatUser;
  onSend?: (m: ChatMessage) => void;
}

export default function Composer({
  channelId = "general",
  me = DEFAULT_USER,
  onSend,
}: ComposerProps) {
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  }, [text]);

  async function handleSend() {
    const trimmed = text.trim();
    if (!trimmed || sending) return;

    setSending(true);

    const tempId = "temp_" + uuidv4().slice(0, 8);
    const tempMessage: ChatMessage = {
      id: tempId,
      channelId,
      author: me,
      content: trimmed,
      createdAt: new Date().toISOString(),
      temp: true,
    };

    onSend?.(tempMessage);
    setText("");

    setTimeout(() => {
      setSending(false);
    }, 300);
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
        <IconButton
          icon={<Plus size={20} />}
          label="Add attachments"
          className="text-[#b5bac1] hover:text-white"
        />

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
    </div>
  );
}
