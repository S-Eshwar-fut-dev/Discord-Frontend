"use client";

import { useEffect, useCallback, useRef } from "react";
import { wsClient } from "@/lib/wsClient";
import { useTypingStore } from "@/store/typing";
import { useSessionStore } from "@/store/session";

const TYPING_TIMEOUT = 1500; // Clear typing after 1.5s (updated from 5s)
const SEND_THROTTLE = 2000; // Don't send "I'm typing" more than once every 2s

export function useTyping(channelId: string) {
  const { user: me } = useSessionStore();
  const { addTypingUser, removeTypingUser, typingUsers } = useTypingStore();
  const lastSentRef = useRef<number>(0);
  const clearTimeouts = useRef<Record<string, NodeJS.Timeout>>({});

  // 1. Listen for incoming typing events
  useEffect(() => {
    const handleTypingStart = (data: any) => {
      // data: { channelId, user: { id, username, avatar } }
      if (data.channelId !== channelId) return;
      if (data.user.id === me?.id) return; // Ignore self

      const userId = data.user.id;

      // Add to store
      addTypingUser(channelId, {
        userId,
        username: data.user.username,
        avatar: data.user.avatar,
      });

      // Clear previous timeout for this user
      if (clearTimeouts.current[userId]) {
        clearTimeout(clearTimeouts.current[userId]);
      }

      // Set new timeout to remove user
      clearTimeouts.current[userId] = setTimeout(() => {
        removeTypingUser(channelId, userId);
        delete clearTimeouts.current[userId];
      }, TYPING_TIMEOUT);
    };

    wsClient.on("typing:start", handleTypingStart);

    return () => {
      wsClient.off("typing:start", handleTypingStart);
      // Cleanup timeouts
      Object.values(clearTimeouts.current).forEach(clearTimeout);
    };
  }, [channelId, me?.id, addTypingUser, removeTypingUser]);

  // 2. Function to trigger "I am typing"
  const startTyping = useCallback(() => {
    if (!me || !channelId) return;

    const now = Date.now();
    if (now - lastSentRef.current > SEND_THROTTLE) {
      if (wsClient.isConnected) {
        wsClient.send("typing:start", {
          channelId,
          user: {
            id: me.id,
            username: me.username,
            avatar: me.avatar,
          },
        });
        lastSentRef.current = now;
      }
    }
  }, [channelId, me]);

  return {
    activeTypingUsers: typingUsers[channelId] || [],
    startTyping,
  };
}
