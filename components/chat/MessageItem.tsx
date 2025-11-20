"use client";

import React, { useMemo, useState } from "react";
import {
  MoreHorizontal,
  Reply,
  SmilePlus,
  Trash2,
  Edit3,
  AlertCircle,
} from "lucide-react";
import Avatar from "../ui/Avatar";
import { formatTimestamp } from "@/lib/time";
import { cn } from "@/lib/cn";
import type { ChatMessage } from "@/types/chat";

interface MessageItemProps {
  message: ChatMessage;
  isFirstInGroup?: boolean;
  showTimestamp?: boolean;
}

export default React.memo(function MessageItem({
  message,
  isFirstInGroup = true,
  showTimestamp = true,
}: MessageItemProps) {
  const [showActions, setShowActions] = useState(false);
  const timeLabel = useMemo(
    () => formatTimestamp(message.createdAt),
    [message.createdAt]
  );

  const isOptimistic = message.temp || message.optimistic;
  const isSending = message.sending;
  const isFailed = message.failed;

  return (
    <div
      className={cn(
        "group relative px-4 py-0.5 hover:bg-[#2e3035] message-item",
        isFirstInGroup ? "mt-4" : "mt-0.5",
        isOptimistic && "opacity-60",
        isFailed && "opacity-40"
      )}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="flex items-start gap-4">
        {/* Avatar column */}
        <div className="shrink-0 w-10">
          {isFirstInGroup ? (
            <Avatar
              src={message.author.avatar ?? undefined}
              alt={message.author.username}
              size={40}
              status={null} // Changed from explicit null if your type implies optional string, but kept as is if component handles null
              fallback={message.author.username}
            />
          ) : (
            <span className="text-[10px] text-[#949ba4] opacity-0 group-hover:opacity-100 transition-opacity text-right block w-full pr-1 leading-[22px]">
              {timeLabel}
            </span>
          )}
        </div>

        {/* Message content */}
        <div className="flex-1 min-w-0">
          {isFirstInGroup && (
            <div className="flex items-baseline gap-2 mb-0.5">
              <span className="text-sm font-semibold text-white hover:underline cursor-pointer">
                {message.author.username}
              </span>
              <span className="text-xs text-[#949ba4]">{timeLabel}</span>
              {isSending && (
                <span className="text-xs text-[#87888c]">(sending...)</span>
              )}
              {isFailed && (
                <span className="flex items-center gap-1 text-xs text-red-400">
                  <AlertCircle size={12} />
                  Failed to send
                </span>
              )}
            </div>
          )}

          {/* Message text */}
          <div className="text-[15px] text-[#dbdee1] wrap-break-word">
            {message.content}
          </div>

          {/* Attachments */}
          {message.attachments && message.attachments.length > 0 && (
            <div className="mt-2 flex flex-col gap-2">
              {message.attachments.map((attachment, idx) => {
                const isImage = /\.(jpe?g|png|webp|gif)$/i.test(attachment.url);
                return (
                  <div key={idx} className="max-w-[400px]">
                    {isImage ? (
                      <a
                        href={attachment.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block rounded-md overflow-hidden border border-[#3f4147] hover:border-[#4e5058] transition-colors"
                      >
                        <img
                          src={attachment.url}
                          alt={attachment.filename || "attachment"}
                          className="w-full h-auto max-h-[350px] object-contain"
                          loading="lazy"
                        />
                      </a>
                    ) : (
                      <a
                        href={attachment.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-2 bg-[#2b2d31] border border-[#3f4147] rounded hover:bg-[#32353b] transition-colors"
                      >
                        <div className="text-[#b5bac1]">📎</div>
                        <span className="text-sm text-[#00a8fc] hover:underline">
                          {attachment.filename || "Download"}
                        </span>
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Edited indicator */}
          {message.editedAt && (
            <span className="text-[10px] text-[#949ba4] ml-1">(edited)</span>
          )}
        </div>
      </div>

      {/* Hover actions - hide for optimistic/failed messages */}
      {showActions && !isOptimistic && !isFailed && (
        <div className="absolute -top-4 right-4 flex items-center gap-1 bg-[#2b2d31] border border-[#3f4147] rounded-md shadow-lg p-1 z-10">
          <button
            className="p-1.5 hover:bg-[#404249] rounded text-[#b5bac1] hover:text-white transition-colors"
            title="Add reaction"
          >
            <SmilePlus size={18} />
          </button>
          <button
            className="p-1.5 hover:bg-[#404249] rounded text-[#b5bac1] hover:text-white transition-colors"
            title="Reply"
          >
            <Reply size={18} />
          </button>
          <button
            className="p-1.5 hover:bg-[#404249] rounded text-[#b5bac1] hover:text-white transition-colors"
            title="Edit"
          >
            <Edit3 size={18} />
          </button>
          <div className="w-px h-5 bg-[#3f4147] mx-1" />
          <button
            className="p-1.5 hover:bg-[#da373c] rounded text-[#b5bac1] hover:text-white transition-colors"
            title="Delete"
          >
            <Trash2 size={18} />
          </button>
          <button
            className="p-1.5 hover:bg-[#404249] rounded text-[#b5bac1] hover:text-white transition-colors"
            title="More"
          >
            <MoreHorizontal size={18} />
          </button>
        </div>
      )}
    </div>
  );
});
