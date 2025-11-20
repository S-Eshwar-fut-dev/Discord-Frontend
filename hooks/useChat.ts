"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { apiClient } from "@/lib/api";
import { wsClient } from "@/lib/wsClient";
import type { ChatMessage, SendMessagePayload } from "@/types/chat";
import type { Message } from "@/types/api";
import { v4 as uuidv4 } from "uuid";

interface UseChatOptions {
  channelId: string;
  userId: string;
  initialLoad?: boolean;
  limit?: number;
}

interface UseChatReturn {
  messages: ChatMessage[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  sendMessage: (content: string) => Promise<void>;
  loadMore: () => Promise<void>;
  retry: () => Promise<void>;
}

export function useChat({
  channelId,
  userId,
  initialLoad = true,
  limit = 50,
}: UseChatOptions): UseChatReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cursor, setCursor] = useState<string | undefined>();
  const [hasMore, setHasMore] = useState(true);

  const isInitialized = useRef(false);
  const optimisticMessages = useRef(new Map<string, ChatMessage>());

  // Load messages from API
  const loadMessages = useCallback(
    async (loadCursor?: string) => {
      if (!channelId) return;

      setLoading(true);
      setError(null);

      try {
        const response = await apiClient.getMessages(
          channelId,
          limit,
          loadCursor
        );

        const newMessages: ChatMessage[] = response.items.map((msg) => ({
          ...msg,
          temp: false,
        }));

        setMessages((prev) => {
          if (loadCursor) {
            // Loading older messages - prepend
            return [...newMessages, ...prev];
          } else {
            // Initial load - replace
            return newMessages;
          }
        });

        setCursor(response.nextCursor);
        setHasMore(!!response.nextCursor);
      } catch (err) {
        const errorMsg =
          err instanceof Error ? err.message : "Failed to load messages";
        setError(errorMsg);
        console.error("Failed to load messages:", err);
      } finally {
        setLoading(false);
      }
    },
    [channelId, limit]
  );

  // Load more (older) messages
  const loadMore = useCallback(async () => {
    if (!hasMore || loading) return;
    await loadMessages(cursor);
  }, [hasMore, loading, cursor, loadMessages]);

  // Retry on error
  const retry = useCallback(async () => {
    await loadMessages();
  }, [loadMessages]);

  // Send message with optimistic update
  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || !channelId || !userId) return;

      const tempId = `temp_${uuidv4().slice(0, 8)}`;

      // Create optimistic message
      const optimisticMsg: ChatMessage = {
        id: tempId,
        tempId,
        channelId,
        author: {
          id: userId,
          username: "You",
          discriminator: "0000",
        },
        content: content.trim(),
        createdAt: new Date().toISOString(),
        temp: true,
        sending: true,
        optimistic: true,
      };

      // Add to state immediately (optimistic UI)
      optimisticMessages.current.set(tempId, optimisticMsg);
      setMessages((prev) => [...prev, optimisticMsg]);

      try {
        // Send via WebSocket
        if (wsClient.isConnected) {
          wsClient.send("message:create", {
            channelId,
            authorId: userId,
            content: content.trim(),
            tempId,
          });
        } else {
          // Fallback to REST API
          await apiClient.createMessage(channelId, content.trim(), userId);

          // Remove optimistic message since REST doesn't return tempId
          optimisticMessages.current.delete(tempId);
          setMessages((prev) => prev.filter((m) => m.tempId !== tempId));
        }
      } catch (err) {
        console.error("Failed to send message:", err);

        // Mark as failed
        setMessages((prev) =>
          prev.map((m) =>
            m.tempId === tempId ? { ...m, sending: false, failed: true } : m
          )
        );

        optimisticMessages.current.delete(tempId);
      }
    },
    [channelId, userId]
  );

  // Handle incoming WebSocket messages
  useEffect(() => {
    if (!channelId) return;

    const handleMessageCreated = (data: any) => {
      const message: Message = data;
      const tempId = (data as any).tempId;

      // Skip if not for this channel
      if (message.channelId !== channelId) return;

      // If this is a response to our optimistic message, replace it
      if (tempId && optimisticMessages.current.has(tempId)) {
        optimisticMessages.current.delete(tempId);
        setMessages((prev) =>
          prev.map((m) =>
            m.tempId === tempId
              ? {
                  ...message,
                  temp: false,
                  sending: false,
                  failed: false,
                  optimistic: false,
                }
              : m
          )
        );
      } else {
        // New message from someone else or from REST fallback
        setMessages((prev) => {
          // Check if message already exists
          if (prev.some((m) => m.id === message.id)) {
            return prev;
          }
          return [...prev, { ...message, temp: false }];
        });
      }
    };

    wsClient.on("message:created", handleMessageCreated);

    return () => {
      wsClient.off("message:created", handleMessageCreated);
    };
  }, [channelId]);

  // Connect WebSocket on mount
  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;

    wsClient.connect().catch((err) => {
      console.error("Failed to connect WebSocket:", err);
    });

    return () => {
      // Don't disconnect on unmount - keep connection alive
      // wsClient.disconnect();
    };
  }, []);

  // Load initial messages
  useEffect(() => {
    if (initialLoad && channelId && !isInitialized.current) {
      loadMessages();
    }
  }, [channelId, initialLoad, loadMessages]);

  // Clear messages when channel changes
  useEffect(() => {
    setMessages([]);
    optimisticMessages.current.clear();
    setCursor(undefined);
    setHasMore(true);
    setError(null);

    if (channelId) {
      loadMessages();
    }
  }, [channelId]);

  return {
    messages,
    loading,
    error,
    hasMore,
    sendMessage,
    loadMore,
    retry,
  };
}
