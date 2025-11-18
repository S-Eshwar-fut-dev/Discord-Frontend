// components/chat/ChatView.tsx
"use client";

import MessageListVirtual from "./MessageListVirtual";
import Composer from "./Composer";
import type { ChatMessage } from "./MessageItem";

export default function ChatView({
  channelId,
  messages,
  onSend,
}: {
  channelId?: string; // <-- added optional channelId prop
  messages: ChatMessage[];
  onSend: (message: ChatMessage) => void;
}) {
  return (
    <div className="flex flex-col h-full w-full bg-[#0f1113]">
      {/* Optional channel header */}
      <div className="px-4 py-3 border-b border-[#202225]">
        <div className="flex items-center justify-between">
          <div className="text-lg font-semibold">#{channelId ?? "general"}</div>
          <div className="text-sm text-gray-400">Search • Pins • Members</div>
        </div>
      </div>

      {/* Message list */}
      <div className="flex-1 overflow-hidden">
        <MessageListVirtual messages={messages} />
      </div>

      {/* Composer */}
      <div className="border-t border-[#232428] p-3 bg-[#111214]">
        <Composer channelId={channelId} onSend={onSend} />
      </div>
    </div>
  );
}
