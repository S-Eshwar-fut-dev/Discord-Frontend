// app/dashboard/page.tsx
"use client";

import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

import GuildsRail from "@/components/Navigation/Guild/GuildsRail";
import ChannelsColumn from "@/components/Navigation/Channel/ChannelsColumn";
import MembersSidebar from "@/components/Navigation/Members/MembersSidebar";
import DMSidebar from "@/components/Navigation/dms/DMSidebar";
import ChatView from "@/components/chat/ChatView";
import type { ChatMessage } from "@/components/chat/MessageItem";

export default function DashboardPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const handleSend = useCallback((m: ChatMessage) => {
    setMessages((prev) => [...prev, m]);
  }, []);

  const handleOpenDM = useCallback(
    (friend: { id: string }) => {
      if (!friend?.id) return;
      router.push(`/dm/${friend.id}`);
    },
    [router]
  );

  return (
    // lock full viewport height — no page-level vertical scroll
    <div className="min-h-screen h-screen flex bg-[#0c0d0e] text-white overflow-hidden">
      {/* LEFT: Guilds rail (fixed full height, profile pinned bottom) */}
      <div className="flex-none">
        <GuildsRail />
      </div>

      {/* MIDDLE: channels + dm + chat (flex layout) */}
      <div className="flex-1 flex min-h-0">
        {/* Channels column + DM column (fixed width, internal scroll) */}
        <div className="w-80 border-r border-[#202225] bg-[#1a1b1e] flex flex-col min-h-0">
          {/* Channels header area — not scrollable */}
          <div className="px-3 pt-4">
            <ChannelsColumn />
          </div>

          {/* DMSidebar should scroll internally; it lives under channels */}
          <div className="px-3 mt-6 flex-1 min-h-0 overflow-auto">
            <DMSidebar onOpenDM={handleOpenDM} />
          </div>
        </div>

        {/* Chat area (flex-1) — internal message list will scroll */}
        <div className="flex-1 bg-[#0f1113] min-h-0 flex flex-col">
          <ChatView messages={messages} onSend={handleSend} />
        </div>
      </div>

      {/* RIGHT: Members sidebar (fixed width, internal scroll) */}
      <div className="w-80 border-l border-[#202225] bg-[#1a1b1e] min-h-0 overflow-auto">
        <MembersSidebar />
      </div>
    </div>
  );
}
