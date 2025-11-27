"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";

import { useReactionsStore } from "@/store/reactions";
import GuildsRail from "@/components/Navigation/Guild/GuildsRail";
import ChannelsColumn from "@/components/Navigation/Channel/ChannelsColumn";
import MembersSidebar from "@/components/Navigation/Members/MembersSidebar";
import ChatView from "@/components/chat/ChatView";
import type { ChatMessage } from "@/types/chat";
import { useWebSocket } from "@/services/ws/useMockWebSocket";
import { fetchMessages } from "@/services/api/messages";
import { wsClient } from "@/lib/wsClient";
import FriendsView from "@/components/friends/FriendsView";

export default function DashboardPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentChannel] = useState("c-general");
  const [currentUserId] = useState("u1");
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"chat" | "friends">("chat");

  // Load initial messages
  useEffect(() => {
    async function loadMessages() {
      try {
        setLoading(true);
        const response = await fetchMessages(currentChannel, 50);
        setMessages(response.items);
      } catch (error) {
        console.error("Failed to load messages:", error);
      } finally {
        setLoading(false);
      }
    }

    loadMessages();
  }, [currentChannel]);

  // WebSocket listeners
  useEffect(() => {
    const handleReactionAdd = (data: any) => {
      const { messageId, emoji, userId } = data;
      useReactionsStore.getState().addReaction(messageId, emoji, userId);
    };

    const handleReactionRemove = (data: any) => {
      const { messageId, emoji, userId } = data;
      useReactionsStore.getState().removeReaction(messageId, emoji, userId);
    };

    const handleMessageUpdated = (data: any) => {
      const updatedMessage = data as ChatMessage;
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === updatedMessage.id
            ? { ...updatedMessage, editedAt: new Date().toISOString() }
            : msg
        )
      );
    };

    const handleMessageDeleted = (data: any) => {
      const { messageId } = data;
      setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
    };

    wsClient.on("reaction:add", handleReactionAdd);
    wsClient.on("reaction:remove", handleReactionRemove);
    wsClient.on("message:updated", handleMessageUpdated);
    wsClient.on("message:deleted", handleMessageDeleted);

    return () => {
      wsClient.off("reaction:add", handleReactionAdd);
      wsClient.off("reaction:remove", handleReactionRemove);
      wsClient.off("message:updated", handleMessageUpdated);
      wsClient.off("message:deleted", handleMessageDeleted);
    };
  }, []);

  // Handle new messages
  const handleNewMessage = useCallback((msg: ChatMessage) => {
    setMessages((prev) => {
      const filtered = prev.filter((m) => !m.temp || m.id !== msg.id);
      return [...filtered, msg];
    });
  }, []);

  const { sendCreateMessage } = useWebSocket(currentChannel, handleNewMessage);

  // Handle send message
  const handleSend = useCallback(
    (m: ChatMessage) => {
      // Add temp message
      setMessages((prev) => [...prev, m]);

      // Send via WebSocket
      sendCreateMessage({
        channelId: m.channelId,
        content: m.content,
        authorId: m.author.id,
        tempId: m.id,
        attachments: m.attachments,
      });
    },
    [sendCreateMessage]
  );

  // Handle edit message
  const handleEditMessage = useCallback(
    async (messageId: string, content: string) => {
      // Optimistic update
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId
            ? {
                ...msg,
                content,
                editedAt: new Date().toISOString(),
              }
            : msg
        )
      );

      // Send via WebSocket
      if (wsClient.isConnected) {
        wsClient.send("message:update", {
          messageId,
          content,
        });
      }
    },
    []
  );

  // Handle delete message
  const handleDeleteMessage = useCallback(async (messageId: string) => {
    // Optimistic delete
    setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
    if (wsClient.isConnected) {
      wsClient.send("message:delete", {
        messageId,
      });
    }
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-[#313338] text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" />
          <p>Loading messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex bg-[#313338] text-white overflow-hidden">
      {/* Guilds Rail */}
      <div className="flex-none w-[72px] bg-[#1e1f22] border-r border-[#1e1f22]">
        <GuildsRail />
      </div>

      {/* Channels Sidebar */}
      <div className="flex-none w-60 bg-[#2b2d31] border-r border-[#1e1f22] flex flex-col min-h-0">
        <ChannelsColumn />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-h-0 min-w-0 bg-[#313338]">
        {view === "friends" ? (
          <FriendsView />
        ) : (
          <ChatView
            channelId={currentChannel}
            channelName="general"
            channelTopic="General chat for everyone"
            messages={messages}
            currentUserId={currentUserId}
            onSend={handleSend}
            onEditMessage={handleEditMessage}
            onDeleteMessage={handleDeleteMessage}
          />
        )}
      </div>

      {/* Members Sidebar */}
      <div className="flex-none w-60 bg-[#2b2d31] border-l border-[#1e1f22] overflow-y-auto custom-scroll">
        <MembersSidebar />
      </div>
    </div>
  );
}
