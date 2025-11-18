// components/chat/MessageItem.tsx
"use client";

import React, { useMemo } from "react";
import Avatar from "../ui/Avatar";
import { formatMessageTime } from "@/lib/time";

export type ChatUser = {
  id: string;
  username: string;
  avatar?: string | null;
  status?: "online" | "idle" | "dnd" | "offline" | null;
};

export type ChatMessage = {
  id: string;
  channelId: string;
  author: ChatUser;
  content: string;
  attachments?: Array<{ url: string; filename?: string }>;
  createdAt: string; // ISO string
  editedAt?: string | null;
  temp?: boolean; // optimistic frontend-only flag
};

/**
 * MessageItem props:
 * - message: the message to render
 * - isFirstInGroup: whether to render avatar+username (false for grouped messages)
 * - showTimestamp: whether to show timestamp on hover (defaults to small inline)
 */
export default React.memo(function MessageItem({
  message,
  isFirstInGroup = true,
  showTimestamp = true,
}: {
  message: ChatMessage;
  isFirstInGroup?: boolean;
  showTimestamp?: boolean;
}) {
  const timeLabel = useMemo(
    () => formatMessageTime(message.createdAt),
    [message.createdAt]
  );

  return (
    <article
      aria-labelledby={`msg-${message.id}-author`}
      className="flex items-start gap-3 px-4 py-2 select-text group"
    >
      {/* Avatar column - hidden for grouped messages */}
      <div className="flex-shrink-0">
        {isFirstInGroup ? (
          <Avatar
            src={message.author.avatar ?? undefined}
            alt={`${message.author.username} avatar`}
            size={40}
            status={message.author.status ?? null}
          />
        ) : (
          // keep space for alignment
          <div style={{ width: 40 }} />
        )}
      </div>

      {/* Message body */}
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <div className="flex gap-3 items-center min-w-0">
            {isFirstInGroup && (
              <h4
                id={`msg-${message.id}-author`}
                className="text-sm font-semibold text-white truncate"
              >
                {message.author.username}
              </h4>
            )}

            {/* timestamp inline */}
            {showTimestamp && (
              <span className="text-xs text-gray-400 shrink-0">
                {timeLabel}
                {message.temp ? " • sending…" : ""}
              </span>
            )}
          </div>

          {/* right-aligned small actions visible on hover */}
          <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 text-sm flex gap-2">
            {/* Placeholder actions; wire actual handlers later */}
            <button aria-label="React" className="hover:text-gray-200">
              😀
            </button>
            <button aria-label="More" className="hover:text-gray-200">
              ⋯
            </button>
          </div>
        </div>

        {/* Message content */}
        <div className="mt-1 text-sm text-gray-100 break-words whitespace-pre-wrap">
          {message.content}
        </div>

        {/* attachments (images/files) */}
        {message.attachments?.length ? (
          <div className="mt-2 grid grid-cols-1 gap-2">
            {message.attachments.map((a, idx) => {
              const isImage = /\.(jpe?g|png|webp|gif|svg)$/i.test(a.url);
              return (
                <div
                  key={idx}
                  className="rounded-md overflow-hidden border border-[#242526] bg-[#0e0f10] max-w-full"
                >
                  {isImage ? (
                    <img
                      src={a.url}
                      alt={a.filename ?? "attachment"}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-auto object-contain transition-transform duration-200 ease-out hover:scale-105"
                      style={{ maxHeight: 420 }}
                    />
                  ) : (
                    <a
                      href={a.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-3 py-2 bg-[#0e0f10] hover:bg-[#111214] text-xs text-indigo-200"
                    >
                      {a.filename ?? a.url}
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        ) : null}

        {/* edited indicator */}
        {message.editedAt && (
          <div className="text-xs text-gray-500 mt-1">
            edited • {new Date(message.editedAt).toLocaleString()}
          </div>
        )}
      </div>
    </article>
  );
});
