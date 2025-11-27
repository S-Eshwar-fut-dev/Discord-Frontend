"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import ChatView from "@/components/chat/ChatView";
import { useChat } from "@/hooks/useChat";
import { mockFriends } from "@/components/mocks/mockFriends";
import { ChatMessage } from "@/types/chat";

interface PageProps {
  params: Promise<{
    guildId: string;
  }>;
}
export default function DMPage({ params }: PageProps) {
  const { guildId } = use(params);
  const friend = mockFriends.find((f) => f.id === guildId);

  if (!friend) {
    notFound();
  }

  const dmChannelId = `dm-${guildId}`;

  const { messages, loading, sendMessage } = useChat({
    channelId: dmChannelId,
    userId: "u1",
  });

  const handleSend = async (message: ChatMessage) => {
    await sendMessage(message.content);
  };
  return (
    <ChatView
      channelId={dmChannelId}
      channelName={friend.username}
      messages={messages}
      currentUserId="u1"
      onSend={handleSend}
      loading={loading}
    />
  );
}
