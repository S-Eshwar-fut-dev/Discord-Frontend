"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";

import GuildsRail from "@/components/Navigation/Guild/GuildsRail";
import ChannelsColumn from "@/components/Navigation/Channel/ChannelsColumn";
import MembersSidebar from "@/components/Navigation/Members/MembersSidebar";
import ChatView from "@/components/chat/ChatView";
import type { ChatMessage } from "@/types/chat";
import { useWebSocket } from "@/services/ws/useMockWebSocket";
import { fetchMessages } from "@/services/api/messages";

export default function DashboardPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentChannel] = useState("c-general");
  const [loading, setLoading] = useState(true);

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

  // WebSocket connection
  const handleNewMessage = useCallback((msg: ChatMessage) => {
    setMessages((prev) => {
      // Replace temp message if it exists
      const filtered = prev.filter((m) => !m.temp || m.id !== msg.id);
      return [...filtered, msg];
    });
  }, []);

  const { sendCreateMessage } = useWebSocket(currentChannel, handleNewMessage);

  const handleSend = useCallback(
    (m: ChatMessage) => {
      // Add temp message immediately
      setMessages((prev) => [...prev, m]);

      // Send to server via WebSocket
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
        <ChatView
          channelId={currentChannel}
          messages={messages}
          onSend={handleSend}
        />
      </div>

      {/* Members Sidebar */}
      <div className="flex-none w-60 bg-[#2b2d31] border-l border-[#1e1f22] overflow-y-auto custom-scroll">
        <MembersSidebar />
      </div>
    </div>
  );
}
