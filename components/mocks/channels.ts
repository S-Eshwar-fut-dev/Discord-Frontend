export interface Channel {
  id: string;
  name: string;
  type: "text" | "voice";
  category: string;
  topic?: string;
  locked?: boolean;
  unread?: boolean;
  mentions?: number;
  icon?: string; // Emoji or icon identifier
}

export const mockChannels: Channel[] = [
  {
    id: "1",
    name: "general",
    type: "text",
    category: "Text Channels",
    topic: "General chat for everyone",
    unread: true,
    icon: "💬",
  },
  {
    id: "2",
    name: "announcements",
    type: "text",
    category: "Text Channels",
    topic: "Important announcements",
    locked: true,
    icon: "📢",
  },
  {
    id: "3",
    name: "memes",
    type: "text",
    category: "Text Channels",
    mentions: 3,
    unread: true,
    icon: "😂",
  },
  {
    id: "4",
    name: "development",
    type: "text",
    category: "Text Channels",
    icon: "💻",
  },
  {
    id: "5",
    name: "General",
    type: "voice",
    category: "Voice Channels",
    icon: "🔊",
  },
  {
    id: "6",
    name: "Coding Session",
    type: "voice",
    category: "Voice Channels",
    icon: "👨‍💻",
  },
  {
    id: "7",
    name: "AFK",
    type: "voice",
    category: "Voice Channels",
    icon: "💤",
  },
];
