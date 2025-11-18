// components/chat/Composer.tsx
"use client";

import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import type { ChatMessage, ChatUser } from "./MessageItem";

export default function Composer({
  channelId,
  me,
  onSend,
}: {
  channelId?: string;
  me?: ChatUser;
  onSend?: (m: ChatMessage) => void;
}) {
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);

  async function handleSend() {
    if (!text.trim()) return;
    setSending(true);

    const tempId = "temp_" + uuidv4().slice(0, 8);
    const tempMessage: ChatMessage = {
      id: tempId,
      channelId: channelId ?? "general",
      author: me ?? { id: "me", username: "You" },
      content: text,
      createdAt: new Date().toISOString(),
      temp: true,
    };

    // optimistic local send via callback
    onSend?.(tempMessage);

    // reset input & sending state
    setText("");
    setTimeout(() => setSending(false), 400);
  }

  function handleKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="p-4 border-t border-[#202225] bg-[#0f1113]">
      <div className="flex items-start gap-3">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKey}
          placeholder={`Message #${channelId ?? "general"}`}
          className="flex-1 resize-none rounded-md bg-[#111214] text-white placeholder-gray-400 px-3 py-3 outline-none ring-1 ring-[#1f2022] focus:ring-indigo-500"
          rows={2}
        />
        <div className="flex flex-col gap-2">
          <button
            onClick={handleSend}
            className={`px-4 py-2 rounded-md font-semibold ${
              sending ? "bg-indigo-400/80" : "bg-indigo-500 hover:bg-indigo-600"
            }`}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
