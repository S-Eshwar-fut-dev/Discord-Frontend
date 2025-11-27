"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import ChatView from "@/components/chat/ChatView";
import { useChat } from "@/hooks/useChat";
import { mockChannels } from "@/components/mocks/channels";
import { mockGuilds } from "@/components/mocks/mockGuilds";
import { ChatMessage } from "@/types/chat";

interface PageProps {
  params: Promise<{
    guildId: string;
    channelId: string;
  }>;
}

export default function ChannelPage({ params }: PageProps) {
  const { guildId, channelId } = use(params);

  // Find guild and channel
  const guild = mockGuilds.find((g) => g.id === guildId);
  const channel = mockChannels.find((c) => c.id === channelId);

  if (!guild || !channel) {
    notFound();
  }

  const { messages, loading, error, hasMore, sendMessage, loadMore } = useChat({
    channelId,
    userId: "u1",
    initialLoad: true,
  });

  const handleSend = async (message: ChatMessage) => {
    await sendMessage(message.content);
  };

  return (
    <ChatView
      channelId={channelId}
      channelName={channel.name}
      channelTopic={channel.topic}
      messages={messages}
      currentUserId="u1"
      onSend={handleSend}
      loading={loading}
      hasMore={hasMore}
      onLoadMore={loadMore}
    />
  );
}
