export type ID = string;

export interface User {
  id: ID;
  username: string;
  discriminator?: string;
  avatar?: string | null;
  role?: "owner" | "moderator" | "member" | "bot";
  status?: "online" | "idle" | "dnd" | "offline" | null;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginRequest {
  username: string;
  password?: string;
}

export interface SignupRequest {
  username: string;
  email?: string;
  password?: string;
  dob?: string;
}

export interface Guild {
  id: ID;
  name: string;
  icon?: string | null;
  ownerId: ID;
  unread?: boolean;
  mentions?: number;
  createdAt: string;
}

export interface CreateGuildRequest {
  name: string;
  icon?: string;
}

export interface Channel {
  id: ID;
  guildId?: ID | null;
  name: string;
  type: "text" | "voice" | "dm";
  topic?: string | null;
  position?: number;
  category?: string | null;
  locked?: boolean;
}

export interface CreateChannelRequest {
  name: string;
  type: "text" | "voice";
  guildId?: ID;
  category?: string;
  topic?: string;
}

export interface UpdateChannelRequest {
  name?: string;
  topic?: string;
  locked?: boolean;
  position?: number;
}

export interface Attachment {
  url: string;
  filename?: string;
  size?: number;
  contentType?: string;
}

export interface Message {
  id: ID;
  channelId: ID;
  author: User;
  content: string;
  attachments?: Attachment[];
  createdAt: string;
  editedAt?: string | null;
  pinned?: boolean;
  mentions?: ID[];
  replyTo?: ID | null;
}

export interface CreateMessageRequest {
  channelId: ID;
  content: string;
  authorId: ID;
  attachments?: Attachment[];
  replyTo?: ID;
}

export interface UpdateMessageRequest {
  content: string;
}

export interface MessageResponse {
  items: Message[];
  nextCursor?: string;
  total: number;
}

export interface PaginationParams {
  limit?: number;
  cursor?: string;
  before?: string;
  after?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  nextCursor?: string;
  prevCursor?: string;
  hasMore: boolean;
}

export interface CursorPagination {
  cursor: string;
  limit: number;
}

export interface OffsetPagination {
  offset: number;
  limit: number;
}
export interface APIError {
  error: string;
  message?: string;
  statusCode: number;
  timestamp?: string;
  path?: string;
  details?: Record<string, any>;
}

export class APIException extends Error {
  statusCode: number;
  details?: Record<string, any>;

  constructor(error: APIError) {
    super(error.message || error.error);
    this.name = "APIException";
    this.statusCode = error.statusCode;
    this.details = error.details;
  }
}

// ============================================================================
// WebSocket Event Types
// ============================================================================

export interface WSEvent<T = any> {
  type: string;
  payload: T;
  timestamp?: string;
}

export interface MessageCreatedEvent extends WSEvent<Message> {
  type: "message:created";
  tempId?: string;
}

export interface MessageUpdatedEvent extends WSEvent<Message> {
  type: "message:updated";
}

export interface MessageDeletedEvent extends WSEvent<{ messageId: ID }> {
  type: "message:deleted";
}

export interface TypingEvent extends WSEvent<{ userId: ID; channelId: ID }> {
  type: "typing:start";
}

export interface PresenceEvent
  extends WSEvent<{
    userId: ID;
    status: "online" | "idle" | "dnd" | "offline";
  }> {
  type: "presence:update";
}
export interface UploadResponse {
  url: string;
  filename: string;
  size: number;
  contentType: string;
}

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}
export interface SearchQuery {
  query: string;
  channelId?: ID;
  guildId?: ID;
  authorId?: ID;
  limit?: number;
  offset?: number;
}

export interface SearchResult<T> {
  items: T[];
  total: number;
  query: string;
}
export interface Notification {
  id: ID;
  userId: ID;
  type: "mention" | "reply" | "dm" | "system";
  messageId?: ID;
  channelId?: ID;
  guildId?: ID;
  read: boolean;
  createdAt: string;
}
export interface Reaction {
  emoji: string;
  count: number;
  users: ID[];
  me: boolean;
}

export interface ReactionEvent
  extends WSEvent<{
    messageId: ID;
    emoji: string;
    userId: ID;
  }> {
  type: "reaction:add" | "reaction:remove";
}
export interface Thread {
  id: ID;
  channelId: ID;
  parentMessageId: ID;
  name?: string;
  messageCount: number;
  participantIds: ID[];
  createdAt: string;
  archivedAt?: string | null;
}
export interface Invite {
  code: string;
  guildId: ID;
  channelId?: ID;
  inviterId: ID;
  expiresAt?: string | null;
  maxUses?: number;
  uses: number;
  createdAt: string;
}
export interface Member {
  id: ID;
  guildId: ID;
  userId: ID;
  nickname?: string | null;
  roles: string[];
  joinedAt: string;
  user: User;
}
export interface Role {
  id: ID;
  guildId: ID;
  name: string;
  color?: string | null;
  permissions: string[];
  position: number;
  mentionable: boolean;
}
