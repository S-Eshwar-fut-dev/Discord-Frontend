"use client";

import React from "react";
import { Wifi, WifiOff } from "lucide-react";
import { useWebSocket } from "@/hooks/useWebSocket";
import { cn } from "@/lib/cn";

interface ConnectionStatusProps {
  className?: string;
}

export default function ConnectionStatus({ className }: ConnectionStatusProps) {
  const { connected } = useWebSocket();

  if (process.env.NODE_ENV === "production") {
    return null; // Don't show in production
  }

  return (
    <div
      className={cn(
        "fixed bottom-4 right-4 px-3 py-2 rounded-lg shadow-lg flex items-center gap-2 text-sm font-medium z-50",
        connected
          ? "bg-green-500/20 text-green-400 border border-green-500/30"
          : "bg-red-500/20 text-red-400 border border-red-500/30",
        className
      )}
    >
      {connected ? (
        <>
          <Wifi size={16} />
          <span>Connected</span>
        </>
      ) : (
        <>
          <WifiOff size={16} />
          <span>Disconnected</span>
        </>
      )}
    </div>
  );
}
