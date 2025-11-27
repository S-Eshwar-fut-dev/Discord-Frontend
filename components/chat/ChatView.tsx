"use client";

import React, { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MessageListVirtual from "./messages/MessageListVirtual";
import Composer from "./Composer";
import ChannelHeader from "./ChannelHeader";
import type { ChatMessage } from "@/types/chat";
import { wsClient } from "@/lib/wsClient";
import TypingIndicator from "./TypingIndicator";
import { useThreads } from "@/hooks/useThreads";
import ThreadSidebar from "@/components/chat/ThreadSidebar";
import WelcomeMessage from "./WelcomeMessage";

export interface ChatViewProps {
  channelId?: string;
  channelName?: string;
  channelTopic?: string;
  messages: ChatMessage[];
  currentUserId?: string;
  onSend: (message: ChatMessage) => void;
  onEditMessage?: (messageId: string, content: string) => Promise<void>;
  onDeleteMessage?: (messageId: string) => Promise<void>;
  loading?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => Promise<void>;
  unreadMessageId?: string | null;
}

export default function ChatView({
  channelId = "general",
  channelName = "general",
  channelTopic,
  messages,
  currentUserId = "u1",
  onSend,
  onEditMessage,
  onDeleteMessage,
  loading = false,
  hasMore = false,
  onLoadMore,
  unreadMessageId,
}: ChatViewProps) {
  const { activeThread } = useThreads();
  const [showMembers, setShowMembers] = useState(true);

  const handleEdit = useCallback(
    async (messageId: string, content: string) => {
      if (onEditMessage) {
        await onEditMessage(messageId, content);
      } else {
        if (wsClient.isConnected) {
          wsClient.send("message:update", { messageId, content });
        }
      }
    },
    [onEditMessage]
  );

  const handleDelete = useCallback(
    async (messageId: string) => {
      if (onDeleteMessage) {
        await onDeleteMessage(messageId);
      } else {
        if (wsClient.isConnected) {
          wsClient.send("message:delete", { messageId });
        }
      }
    },
    [onDeleteMessage]
  );

  return (
    <div className="flex flex-1 min-h-0 relative">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-h-0 min-w-0 bg-[#313338]">
        {/* Channel Header */}
        <ChannelHeader
          channelName={channelName}
          channelTopic={channelTopic}
          memberCount={0}
        />

        {/* Messages Area */}
        <div className="flex-1 min-h-0 relative">
          {messages.length === 0 && !loading ? (
            <WelcomeMessage channelName={channelName} />
          ) : (
            <MessageListVirtual
              messages={messages}
              currentUserId={currentUserId}
              unreadMessageId={unreadMessageId}
              loading={loading}
              hasMore={hasMore}
              onLoadMore={onLoadMore}
              onEditMessage={handleEdit}
              onDeleteMessage={handleDelete}
            />
          )}
        </div>

        {/* Typing Indicator + Composer */}
        <div className="relative bg-[#313338] shrink-0">
          <TypingIndicator channelId={channelId} />
          <Composer channelId={channelId} onSend={onSend} />
        </div>
      </div>

      {/* Thread Sidebar */}
      <AnimatePresence>
        {activeThread && (
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="w-[420px] shrink-0"
          >
            <ThreadSidebar />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
