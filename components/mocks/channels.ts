import { LucideIcon } from "lucide-react";
import {
  MessageSquare,
  Megaphone,
  Smile,
  Code,
  Volume2,
  Laptop,
  Moon,
} from "lucide-react";
export interface Channel {
  id: string;
  name: string;
  type: "text" | "voice";
  category: string;
  topic?: string;
  locked?: boolean;
  unread?: boolean;
  mentions?: number;
  icon?: LucideIcon; // Emoji or icon identifier
}

export const mockChannels: Channel[] = [
  {
    id: "1",
    name: "general",
    type: "text",
    category: "Text Channels",
    topic: "General chat for everyone",
    unread: true,
    icon: MessageSquare,
  },
  {
    id: "2",
    name: "announcements",
    type: "text",
    category: "Text Channels",
    topic: "Important announcements",
    locked: true,
    icon: Megaphone,
  },
  {
    id: "3",
    name: "memes",
    type: "text",
    category: "Text Channels",
    mentions: 3,
    unread: true,
    icon: Smile,
  },
  {
    id: "4",
    name: "development",
    type: "text",
    category: "Text Channels",
    icon: Code,
  },
  {
    id: "5",
    name: "General",
    type: "voice",
    category: "Voice Channels",
    icon: Volume2,
  },
  {
    id: "6",
    name: "Coding Session",
    type: "voice",
    category: "Voice Channels",
    icon: Laptop,
  },
  {
    id: "7",
    name: "AFK",
    type: "voice",
    category: "Voice Channels",
    icon: Moon,
  },
];
