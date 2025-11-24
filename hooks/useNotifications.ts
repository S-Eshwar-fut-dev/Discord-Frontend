"use client";

import { useEffect } from "react";
import { useNotificationStore } from "@/store/notifications";
import { wsClient } from "@/lib/wsClient";

export function useNotifications() {
  const { addNotification } = useNotificationStore();

  useEffect(() => {
    const handleNewNotification = (data: any) => {
      // data structure depends on your backend event payload
      addNotification({
        type: data.type || "mention",
        guildId: data.guildId,
        guildName: data.guildName || "Unknown Server",
        channelId: data.channelId,
        channelName: data.channelName || "general",
        author: data.author,
        content: data.content,
      });
    };

    // Listen for events
    wsClient.on("notification:create", handleNewNotification);

    // Mock: Simulate a notification coming in after 5 seconds for demo
    const timer = setTimeout(() => {
      addNotification({
        type: "mention",
        guildId: "1",
        guildName: "Eoncord HQ",
        channelId: "1",
        channelName: "general",
        author: {
          id: "u2",
          username: "InnocentZERO",
          avatar: "/avatars/2.png",
        },
        content: "Hey @Eshwar, can you check this PR?",
      });
    }, 5000);

    return () => {
      wsClient.off("notification:create", handleNewNotification);
      clearTimeout(timer);
    };
  }, [addNotification]);
}
