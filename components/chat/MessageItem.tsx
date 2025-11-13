// components/chat/MessageItem.tsx
"use client";

import React from "react";

export type ChatUser = {
  id: string;
  username: string;
  avatar?: string;
};

export type ChatMessage = {
  id: string;
  channelId: string;
  author: ChatUser;
  content: string;
  createdAt: string; // ISO
  temp?: boolean;
};

export default function MessageItem({ message }: { message: ChatMessage }) {
  const time = new Date(message.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="flex items-start gap-3 px-4 py-3">
      <img
        src={message.author.avatar ?? "/avatars/1.png"}
        alt={message.author.username}
        className="w-10 h-10 rounded-full object-cover flex-shrink-0"
      />
      <div className="flex-1">
        <div className="flex items-baseline gap-3">
          <span className="font-semibold text-sm text-white">
            {message.author.username}
          </span>
          <span className="text-xs text-gray-400">{time}</span>
          {message.temp && (
            <span className="ml-2 text-xs text-indigo-300">Sending…</span>
          )}
        </div>
        <div className="mt-1 text-sm text-gray-100 leading-relaxed">
          {message.content}
        </div>
      </div>
    </div>
  );
}
