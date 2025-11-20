"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import GuildsRail from "@/components/Navigation/Guild/GuildsRail";
import ChannelsColumn from "@/components/Navigation/Channel/ChannelsColumn";
import MembersSidebar from "@/components/Navigation/Members/MembersSidebar";
import ChatView from "@/components/chat/ChatView";
import { useAuth } from "@/hooks/useAuth";
import { useChat } from "@/hooks/useChat";
import Spinner from "@/components/ui/Spinner";

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [currentChannel, setCurrentChannel] = useState("c-general");

  const {
    messages,
    loading: chatLoading,
    error: chatError,
    hasMore,
    sendMessage,
    loadMore,
    retry,
  } = useChat({
    channelId: currentChannel,
    userId: user?.id || "",
    initialLoad: true,
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/sign-in");
    }
  }, [user, authLoading, router]);

  // Show loading state while checking auth
  if (authLoading || !user) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-[#313338]">
        <div className="flex flex-col items-center gap-4">
          <Spinner size="lg" />
          <p className="text-[#b5bac1]">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex bg-[#313338] text-white overflow-hidden">
      {/* Guilds Rail - Fixed width, full height */}
      <div className="flex-none w-[72px] bg-[#1e1f22] border-r border-[#1e1f22]">
        <GuildsRail />
      </div>

      {/* Channels Sidebar - Fixed width, internal scroll */}
      <div className="flex-none w-60 bg-[#2b2d31] border-r border-[#1e1f22] flex flex-col min-h-0">
        <ChannelsColumn />
      </div>

      {/* Main Chat Area - Flexible, internal scroll */}
      <div className="flex-1 flex flex-col min-h-0 min-w-0 bg-[#313338]">
        {chatError ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <p className="text-red-400 mb-4">{chatError}</p>
              <button
                onClick={retry}
                className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-md"
              >
                Retry
              </button>
            </div>
          </div>
        ) : (
          <ChatView
            channelId={currentChannel}
            channelName="general"
            channelTopic="Welcome to the general channel"
            messages={messages}
            onSend={sendMessage}
            loading={chatLoading}
            hasMore={hasMore}
            onLoadMore={loadMore}
          />
        )}
      </div>

      {/* Members Sidebar - Fixed width, internal scroll */}
      <div className="flex-none w-60 bg-[#2b2d31] border-l border-[#1e1f22] overflow-y-auto custom-scroll">
        <MembersSidebar />
      </div>
    </div>
  );
}
