"use client";

import React, { useRef, useState, useEffect } from "react";
import { Virtuoso, type VirtuosoHandle } from "react-virtuoso";
import MessageItem from "./MessageItem";
import DaySeparator from "./DaySeparator";
import UnreadMarker from "./UnreadMarker";
import Spinner from "../ui/Spinner";
import {
  shouldGroupMessages,
  shouldShowDaySeparator,
  getDaySeparator,
} from "@/lib/utils/messageGrouping";
import { cn } from "@/lib/cn";
import type { ChatMessage } from "@/types/chat";

interface MessageListVirtualProps {
  messages: ChatMessage[];
  unreadMessageId?: string | null;
  loading?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => Promise<void>;
}

type ListItem =
  | { type: "day"; id: string; label: string }
  | { type: "unread"; id: string }
  | { type: "message"; message: ChatMessage; isFirstInGroup: boolean }
  | { type: "loader"; id: string };

export default function MessageListVirtual({
  messages,
  unreadMessageId,
  loading = false,
  hasMore = false,
  onLoadMore,
}: MessageListVirtualProps) {
  const virtuosoRef = useRef<VirtuosoHandle>(null);
  const [atBottom, setAtBottom] = useState(true);
  const [hasTopShadow, setHasTopShadow] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  // Build list items with day separators and grouping
  const listItems: ListItem[] = React.useMemo(() => {
    const items: ListItem[] = [];

    // Add loader at top if has more
    if (hasMore && !loading) {
      items.push({ type: "loader", id: "top-loader" });
    }

    messages.forEach((message, idx) => {
      const prevMessage = idx > 0 ? messages[idx - 1] : undefined;

      // Day separator
      if (shouldShowDaySeparator(message, prevMessage)) {
        items.push({
          type: "day",
          id: `day-${message.id}`,
          label: getDaySeparator(message.createdAt),
        });
      }

      // Unread marker
      if (unreadMessageId && message.id === unreadMessageId) {
        items.push({
          type: "unread",
          id: `unread-${message.id}`,
        });
      }

      // Message
      items.push({
        type: "message",
        message,
        isFirstInGroup: !shouldGroupMessages(message, prevMessage),
      });
    });

    return items;
  }, [messages, unreadMessageId, hasMore, loading]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (atBottom && messages.length > 0) {
      setTimeout(() => {
        virtuosoRef.current?.scrollToIndex({
          index: listItems.length - 1,
          align: "end",
          behavior: "smooth",
        });
      }, 100);
    }
  }, [messages.length, atBottom, listItems.length]);

  // Handle load more
  const handleLoadMore = async () => {
    if (!hasMore || loadingMore || !onLoadMore) return;
    setLoadingMore(true);
    try {
      await onLoadMore();
    } finally {
      setLoadingMore(false);
    }
  };

  // Show initial loading state
  if (loading && messages.length === 0) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Spinner size="lg" />
          <p className="text-sm text-[#87888c]">Loading messages...</p>
        </div>
      </div>
    );
  }

  // Show empty state
  if (!loading && messages.length === 0) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#87888c] mb-2">No messages yet</p>
          <p className="text-sm text-[#6d6f78]">
            Be the first to send a message!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      <Virtuoso
        ref={virtuosoRef}
        data={listItems}
        className={cn(
          "h-full w-full",
          hasTopShadow && "scroll-shadow-top has-scroll"
        )}
        followOutput="smooth"
        alignToBottom
        atBottomStateChange={setAtBottom}
        atTopStateChange={(isAtTop) => setHasTopShadow(!isAtTop)}
        startReached={hasMore ? handleLoadMore : undefined}
        itemContent={(index, item) => {
          if (item.type === "loader") {
            return (
              <div className="flex justify-center py-4">
                {loadingMore ? (
                  <Spinner size="sm" />
                ) : (
                  <button
                    onClick={handleLoadMore}
                    className="text-sm text-[#00a8fc] hover:underline"
                  >
                    Load older messages
                  </button>
                )}
              </div>
            );
          }

          if (item.type === "day") {
            return <DaySeparator label={item.label} />;
          }

          if (item.type === "unread") {
            return <UnreadMarker />;
          }

          return (
            <MessageItem
              message={item.message}
              isFirstInGroup={item.isFirstInGroup}
            />
          );
        }}
        components={{
          Scroller: React.forwardRef((props, ref) => (
            <div {...props} ref={ref} className="custom-scroll" />
          )),
        }}
      />
    </div>
  );
}
