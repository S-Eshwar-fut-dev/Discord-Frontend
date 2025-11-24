"use client";

import React from "react";
import { X, Hash, Bell, MoreVertical, Archive } from "lucide-react";
import { useThreads } from "@/hooks/useThreads";
import MessageListVirtual from "./messages/MessageListVirtual";
import Composer from "./Composer";
import IconButton from "../ui/IconButton";
import { mockMessages } from "@/components/mocks/chat"; // Mock data for now

export default function ThreadSidebar() {
  const { activeThread, closeThread } = useThreads();

  if (!activeThread) return null;

  // In a real app, you'd fetch messages for this specific threadId
  const threadMessages = mockMessages.slice(0, 5);

  return (
    <div className="w-[400px] flex flex-col bg-[#313338] border-l border-[#26272b] h-full shadow-xl z-20">
      {/* Header */}
      <div className="h-12 flex items-center justify-between px-4 border-b border-[#26272b] bg-[#313338]">
        <div className="flex items-center gap-2 min-w-0">
          <Hash size={20} className="text-[#80848e] shrink-0" />
          <h3
            className="font-semibold text-white truncate"
            title={activeThread.name}
          >
            {activeThread.name}
          </h3>
        </div>

        <div className="flex items-center">
          <IconButton icon={<Bell size={18} />} label="Notification Settings" />
          <IconButton
            icon={<X size={20} />}
            label="Close Thread"
            onClick={closeThread}
          />
        </div>
      </div>

      {/* Context Message (Parent) */}
      <div className="px-4 py-4 border-b border-[#26272b] bg-[#2b2d31]">
        <div className="flex items-start gap-3 opacity-70 pointer-events-none">
          <img
            src={activeThread.parentMessage.author.avatar || "/avatars/1.png"}
            alt="avatar"
            className="w-8 h-8 rounded-full mt-1"
          />
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-semibold text-white text-sm">
                {activeThread.parentMessage.author.username}
              </span>
              <span className="text-[10px] text-[#949ba4]">
                Started a thread
              </span>
            </div>
            <p className="text-sm text-[#dbdee1] line-clamp-2">
              {activeThread.parentMessage.content}
            </p>
          </div>
        </div>
      </div>

      {/* Thread Messages */}
      <div className="flex-1 min-h-0">
        <MessageListVirtual
          messages={threadMessages}
          loading={false}
          hasMore={false}
        />
      </div>

      {/* Thread Composer */}
      <div className="p-4 bg-[#313338]">
        <Composer
          channelId={`thread-${activeThread.id}`}
          onSend={(msg) => console.log("Thread msg:", msg)}
        />
      </div>
    </div>
  );
}
