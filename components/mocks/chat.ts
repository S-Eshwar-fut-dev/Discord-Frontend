import { ChatMessage } from "@/components/chat/MessageItem";

export const mockMessages: ChatMessage[] = [
  {
    id: "1",
    channelId: "general",
    author: {
      id: "u1",
      username: "Eshwar",
      avatar: "/avatars/1.png",
      status: "online",
    },
    content: "Yo bruh, welcome to Eoncord 😎",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    channelId: "general",
    author: {
      id: "u2",
      username: "InnocentZERO",
      avatar: "/avatars/2.png",
      status: "offline",
    },
    content: "Thankyou bruh",
    createdAt: new Date().toISOString(),
  },
];
