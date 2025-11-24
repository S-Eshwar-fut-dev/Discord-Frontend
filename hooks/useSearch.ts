"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { mockGuilds } from "@/components/mocks/mockGuilds";
import { mockChannels } from "@/components/mocks/channels";
import { mockFriends } from "@/components/mocks/mockFriends";

export type SearchResultType = "server" | "channel" | "user";

export interface SearchResult {
  id: string;
  type: SearchResultType;
  title: string;
  subtitle?: string;
  icon?: string;
  url: string;
}

export function useSearch(isOpen: boolean, onClose: () => void) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  // Reset query when closed
  useEffect(() => {
    if (!isOpen) setQuery("");
  }, [isOpen]);

  // Mock Search Logic - In production, replace with API calls
  const results = useMemo(() => {
    if (!query.trim()) return [];

    const q = query.toLowerCase();
    const allResults: SearchResult[] = [];

    // 1. Servers
    mockGuilds.forEach((guild) => {
      if (guild.name.toLowerCase().includes(q)) {
        allResults.push({
          id: guild.id,
          type: "server",
          title: guild.name,
          subtitle: "Server",
          icon: guild.icon,
          url: `/channels/${guild.id}`,
        });
      }
    });

    // 2. Channels (Mock - assuming flattened list for demo)
    mockChannels.forEach((channel) => {
      if (channel.name.toLowerCase().includes(q)) {
        allResults.push({
          id: channel.id,
          type: "channel",
          title: `#${channel.name}`,
          subtitle: channel.category,
          url: `/channels/1/${channel.id}`, // Mock guild ID 1
        });
      }
    });

    // 3. Friends / Users
    mockFriends.forEach((friend) => {
      if (friend.username.toLowerCase().includes(q)) {
        allResults.push({
          id: friend.id,
          type: "user",
          title: friend.username,
          subtitle: friend.status,
          icon: friend.avatar || undefined,
          url: `/channels/me/${friend.id}`,
        });
      }
    });

    return allResults;
  }, [query]);

  const handleSelect = (result: SearchResult) => {
    router.push(result.url);
    onClose();
  };

  return {
    query,
    setQuery,
    results,
    handleSelect,
  };
}
