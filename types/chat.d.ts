import type { Message, User, Attachment } from "./api";

// Extended chat types for frontend use
export interface ChatMessage extends Message {
  // Frontend-specific fields
  temp?: boolean;
  sending?: boolean;
  failed?: boolean;
  optimistic?: boolean;
}

// Alias for compatibility (some components expect ChatUser)
export type ChatUser = User;

export interface SendMessagePayload {
  channelId: string;
  content: string;
  attachments?: Attachment[];
  tempId?: string;
}

export interface MessageCreateEvent {
  type: "message:created";
  payload: Message;
  tempId?: string | null;
}

export interface PresenceUpdateEvent {
  type: "presence:update";
  payload: {
    userId: string;
    status: "online" | "idle" | "dnd" | "offline";
    customStatus?: string | null;
  };
}

export type WSMessage = MessageCreateEvent | PresenceUpdateEvent;

export interface ChatState {
  messages: ChatMessage[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  cursor?: string;
}
