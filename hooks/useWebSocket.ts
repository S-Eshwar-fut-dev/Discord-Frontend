"use client";

import { useEffect, useState } from "react";
import { wsClient } from "@/lib/wsClient";

/**
 * Simple hook to track WebSocket connection status
 */
export function useWebSocket() {
  const [connected, setConnected] = useState(wsClient.isConnected);
  const [reconnecting, setReconnecting] = useState(false);

  useEffect(() => {
    // Check connection status periodically
    const interval = setInterval(() => {
      setConnected(wsClient.isConnected);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return {
    connected,
    reconnecting,
    wsClient,
  };
}
