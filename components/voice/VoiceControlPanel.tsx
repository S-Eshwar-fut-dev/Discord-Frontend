"use client";

import React from "react";
import { PhoneOff, Mic, MicOff, Headphones, Signal } from "lucide-react";
import { useVoice } from "@/hooks/useVoice";
import { cn } from "@/lib/utils/cn";

export default function VoiceControlPanel() {
  const { currentChannelId, leaveChannel, isMuted, toggleMute } = useVoice();

  if (!currentChannelId) return null;

  return (
    <div className="px-2 pb-2 bg-[#232428]">
      <div className="bg-[#1e1f22] rounded-lg p-2 flex items-center justify-between border border-[#2b2d31]">
        {/* Connection Info */}
        <div className="flex items-center gap-2 min-w-0 cursor-pointer hover:underline">
          <div className="flex-none text-[#23a559]">
            <Signal size={20} />
          </div>
          <div className="min-w-0 flex flex-col">
            <span className="text-[#23a559] text-xs font-bold uppercase">
              Voice Connected
            </span>
            <span className="text-[#dbdee1] text-xs truncate">
              General / Voice Channels
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <button
            onClick={toggleMute}
            className="p-1.5 rounded hover:bg-[#2b2d31] text-[#dbdee1] transition-colors"
          >
            {isMuted ? (
              <MicOff size={18} className="text-red-400" />
            ) : (
              <Mic size={18} />
            )}
          </button>

          <button
            onClick={leaveChannel}
            className="p-1.5 rounded hover:bg-[#2b2d31] text-[#dbdee1] transition-colors group"
            title="Disconnect"
          >
            <PhoneOff size={18} className="group-hover:text-[#dbdee1]" />
          </button>
        </div>
      </div>
    </div>
  );
}
