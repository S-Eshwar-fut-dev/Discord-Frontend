// API Response Types matching mock server schema
export interface User {
  id: string;
  username: string;
  discriminator: string;
  avatar?: string | null;
  role?: "owner" | "moderator" | "member" | "bot";
}

export interface Guild {
  id: string;
  name: string;
  icon?: string | null;
  unread?: boolean;
}

export interface Channel {
  id: string;
  guildId?: string | null;
  name: string;
  type: "text" | "voice" | "dm";
  topic?: string | null;
}

export interface Attachment {
  url: string;
  filename?: string;
}

export interface Message {
  id: string;
  tempId?: string;
  channelId: string;
  author: User;
  content: string;
  attachments?: Attachment[];
  createdAt: string;
  editedAt?: string | null;
}

export interface PaginatedResponse<T> {
  items: T[];
  nextCursor?: string;
  total: number;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface PresenceUpdate {
  userId: string;
  status: "online" | "idle" | "dnd" | "offline";
  customStatus?: string | null;
}

// API Error
export interface APIError {
  error: string;
  statusCode?: number;
}
