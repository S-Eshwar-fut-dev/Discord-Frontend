"use client";

import { useEffect, useCallback } from "react";
import { wsClient } from "@/lib/wsClient";
import { usePresenceStore, type Presence } from "@/store/presence";

interface UsePresenceReturn {
  setStatus: (userId: string, status: Presence["status"]) => void;
  getPresence: (userId: string) => Presence | null;
}

export function usePresence(): UsePresenceReturn {
  const { setPresence, getPresence } = usePresenceStore();

  // Listen to presence updates from WebSocket
  useEffect(() => {
    const handlePresenceUpdate = (data: any) => {
      const presence: Presence = {
        userId: data.userId,
        status: data.status,
        customStatus: data.customStatus,
        updatedAt: Date.now(),
      };
      setPresence(presence);
    };

    wsClient.on("presence:update", handlePresenceUpdate);

    return () => {
      wsClient.off("presence:update", handlePresenceUpdate);
    };
  }, [setPresence]);

  // Send presence update
  const setStatus = useCallback(
    (userId: string, status: Presence["status"]) => {
      if (!wsClient.isConnected) {
        console.warn("WebSocket not connected, cannot set presence");
        return;
      }

      wsClient.send("presence:set", { userId, status });

      // Also update locally immediately
      setPresence({
        userId,
        status,
        updatedAt: Date.now(),
      });
    },
    [setPresence]
  );

  return {
    setStatus,
    getPresence,
  };
}
