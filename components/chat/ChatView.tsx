"use client";

import React, { useCallback } from "react";
import MessageListVirtual from "./messages/MessageListVirtual";
import Composer from "./Composer";
import ChannelHeader from "./ChannelHeader";
import type { ChatMessage } from "@/types/chat";
import { wsClient } from "@/lib/wsClient";
import TypingIndicator from "./TypingIndicator";

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

/**
 * Main chat view with message editing and deletion
 */
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
  // Handle edit message
  const handleEdit = useCallback(
    async (messageId: string, content: string) => {
      if (onEditMessage) {
        await onEditMessage(messageId, content);
      } else {
        // Fallback: Send via WebSocket
        if (wsClient.isConnected) {
          wsClient.send("message:update", {
            messageId,
            content,
          });
        }
      }
    },
    [onEditMessage]
  );

  // Handle delete message
  const handleDelete = useCallback(
    async (messageId: string) => {
      if (onDeleteMessage) {
        await onDeleteMessage(messageId);
      } else {
        // Fallback: Send via WebSocket
        if (wsClient.isConnected) {
          wsClient.send("message:delete", {
            messageId,
          });
        }
      }
    },
    [onDeleteMessage]
  );

  return (
    <div className="flex flex-col h-full w-full">
      {/* Channel Header */}
      <ChannelHeader
        channelName={channelName}
        channelTopic={channelTopic}
        memberCount={0}
      />

      {/* Messages Area */}
      <div className="flex-1 min-h-0">
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
      </div>
      <TypingIndicator channelId={channelId} />
      {/* Composer */}
      <Composer channelId={channelId} onSend={onSend} />
    </div>
  );
}
