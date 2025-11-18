export interface Channel {
  id: string;
  name: string;
  type: "text" | "voice";
  category: string;
  topic?: string;
  locked?: boolean;
  unread?: boolean;
  mentions?: number;
}

export const mockChannels: Channel[] = [
  {
    id: "1",
    name: "general",
    type: "text",
    category: "Text Channels",
    topic: "General chat for everyone",
    unread: true,
  },
  {
    id: "2",
    name: "announcements",
    type: "text",
    category: "Text Channels",
    topic: "Important announcements",
    locked: true,
  },
  {
    id: "3",
    name: "memes",
    type: "text",
    category: "Text Channels",
    mentions: 3,
  },
  {
    id: "4",
    name: "development",
    type: "text",
    category: "Text Channels",
  },
  {
    id: "5",
    name: "General",
    type: "voice",
    category: "Voice Channels",
  },
  {
    id: "6",
    name: "Coding Session",
    type: "voice",
    category: "Voice Channels",
  },
  {
    id: "7",
    name: "AFK",
    type: "voice",
    category: "Voice Channels",
  },
];
