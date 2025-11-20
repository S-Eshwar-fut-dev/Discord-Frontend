// types/api.ts

export type ID = string;

export interface User {
  id: ID;
  username: string;
  discriminator?: string;
  avatar?: string | null;
  role?: "owner" | "moderator" | "member" | "bot";
  status?: "online" | "idle" | "dnd" | "offline" | null; // ✅ ADD THIS LINE
}

export interface Guild {
  id: ID;
  name: string;
  icon?: string | null;
  unread?: boolean;
}

export interface Channel {
  id: ID;
  guildId?: ID | null;
  name: string;
  type: "text" | "voice" | "dm";
}

export interface Attachment {
  url: string;
  filename?: string;
}

export interface Message {
  id: ID;
  channelId: ID;
  author: User;
  content: string;
  attachments?: Attachment[];
  createdAt: string;
  editedAt?: string | null;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface MessageResponse {
  items: Message[];
  nextCursor?: string;
  total: number;
}
