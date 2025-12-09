import { ChatMessage } from "@/types/chat";

export const mockMessages: ChatMessage[] = [
  {
    id: "1",
    channelId: "general",
    author: {
      id: "u1",
      username: "Eshwar S",
      avatar: "https://i.pravatar.cc/150?u=204",
      status: "online",
    },
    content: "Hey everyone! Welcome to Eoncord 🎉",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
  },
  {
    id: "2",
    channelId: "general",
    author: {
      id: "u2",
      username: "InnocentZero",
      avatar: "https://i.pravatar.cc/150?u=2",
      status: "offline",
    },
    content: "Thanks! This looks amazing",
    createdAt: new Date(
      Date.now() - 1000 * 60 * 60 * 24 * 2 + 1000 * 60 * 2
    ).toISOString(),
  },
  {
    id: "3",
    channelId: "general",
    author: {
      id: "u2",
      username: "InnocentZERO",
      avatar: "https://i.pravatar.cc/150?u=2",
      status: "offline",
    },
    content: "The UI is really clean",
    createdAt: new Date(
      Date.now() - 1000 * 60 * 60 * 24 * 2 + 1000 * 60 * 3
    ).toISOString(),
  },
  {
    id: "4",
    channelId: "general",
    author: {
      id: "u3",
      username: "KingDudeDS",
      avatar: "https://i.pravatar.cc/150?u=16",
      status: "idle",
    },
    content: "When are we launching this?",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // Yesterday
  },
  {
    id: "5",
    channelId: "general",
    author: {
      id: "u1",
      username: "Eshwar",
      avatar: "https://i.pravatar.cc/150?u=204",
      status: "online",
    },
    content: "Working on it! Should be ready soon.",
    createdAt: new Date(
      Date.now() - 1000 * 60 * 60 * 24 + 1000 * 60 * 5
    ).toISOString(),
  },
  {
    id: "6",
    channelId: "general",
    author: {
      id: "u1",
      username: "Eshwar",
      avatar: "https://i.pravatar.cc/150?u=204",
      status: "online",
    },
    content: "Just need to polish a few more components",
    createdAt: new Date(
      Date.now() - 1000 * 60 * 60 * 24 + 1000 * 60 * 6
    ).toISOString(),
  },
  {
    id: "7",
    channelId: "general",
    author: {
      id: "u4",
      username: "MONJIRO",
      avatar: "https://i.pravatar.cc/150?u=50",
      status: "dnd",
    },
    content: "I can help with testing if you need",
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
  },
  {
    id: "8",
    channelId: "general",
    author: {
      id: "u1",
      username: "Eshwar",
      avatar: "https://i.pravatar.cc/150?u=204",
      status: "online",
    },
    content: "That would be great! Let me know what you find.",
    createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 mins ago
  },
];
