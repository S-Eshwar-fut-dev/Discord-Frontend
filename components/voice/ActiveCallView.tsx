"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Mic, MicOff } from "lucide-react";
import Avatar from "@/components/ui/Avatar";
import { useVoice } from "@/hooks/useVoice";
import { cn } from "@/lib/utils/cn";

export default function ActiveCallView() {
  const { participants, simulateSpeaking } = useVoice();

  // Simulate speaking animation loop
  useEffect(() => {
    const interval = setInterval(simulateSpeaking, 500);
    return () => clearInterval(interval);
  }, [simulateSpeaking]);

  return (
    <div className="h-full bg-[#000000] flex items-center justify-center p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-5xl">
        {participants.map((user) => (
          <div
            key={user.id}
            className="relative bg-[#1e1f22] rounded-xl aspect-video flex items-center justify-center border-2 border-transparent transition-all"
            style={{
              borderColor: user.speaking ? "#23a559" : "transparent",
            }}
          >
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <Avatar
                  src={user.avatar}
                  alt={user.username}
                  size={80}
                  showStatusBadge={false}
                  className={cn(
                    "border-4 border-[#1e1f22]",
                    user.speaking &&
                      "scale-110 transition-transform duration-200"
                  )}
                />
                {user.muted && (
                  <div className="absolute bottom-0 right-0 bg-[#1e1f22] p-1 rounded-full">
                    <MicOff size={20} className="text-[#f23f43]" />
                  </div>
                )}
              </div>

              <span className="text-white font-semibold bg-black/50 px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                {user.username}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
