import type {
  AuthResponse,
  Guild,
  Channel,
  Message,
  PaginatedResponse,
  APIError,
  User,
  Attachment,
} from "@/types/api";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

class APIClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    // Try to restore token from localStorage
    if (typeof window !== "undefined") {
      this.token = localStorage.getItem("eoncord_token");
    }
  }

  setToken(token: string | null) {
    this.token = token;
    if (typeof window !== "undefined") {
      if (token) {
        localStorage.setItem("eoncord_token", token);
      } else {
        localStorage.removeItem("eoncord_token");
      }
    }
  }

  getToken(): string | null {
    return this.token;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string>),
    };

    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }

    const url = `${this.baseURL}${endpoint}`;

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        const error: APIError = await response.json().catch(() => ({
          error: response.statusText,
          statusCode: response.status,
        }));
        throw new Error(error.error || "API request failed");
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Unknown API error");
    }
  }

  // Auth endpoints
  async login(username: string): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ username }),
    });
    this.setToken(response.token);
    return response;
  }

  async signup(username: string): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ username }),
    });
    this.setToken(response.token);
    return response;
  }

  async getMe(): Promise<{ user: User }> {
    return this.request<{ user: User }>("/api/auth/me");
  }

  // Guild endpoints
  async getGuilds(): Promise<Guild[]> {
    return this.request<Guild[]>("/api/guilds");
  }

  async createGuild(name: string, icon?: string): Promise<Guild> {
    return this.request<Guild>("/api/guilds", {
      method: "POST",
      body: JSON.stringify({ name, icon }),
    });
  }

  // Channel endpoints
  async getChannels(guildId?: string): Promise<Channel[]> {
    const query = guildId ? `?guildId=${guildId}` : "";
    return this.request<Channel[]>(`/api/channels${query}`);
  }

  async createChannel(
    name: string,
    type: "text" | "voice",
    guildId?: string
  ): Promise<Channel> {
    return this.request<Channel>("/api/channels", {
      method: "POST",
      body: JSON.stringify({ name, type, guildId }),
    });
  }

  // Message endpoints
  async getMessages(
    channelId: string,
    limit = 50,
    cursor?: string
  ): Promise<PaginatedResponse<Message>> {
    const params = new URLSearchParams({
      channelId,
      limit: limit.toString(),
    });
    if (cursor) params.set("cursor", cursor);

    return this.request<PaginatedResponse<Message>>(
      `/api/messages?${params.toString()}`
    );
  }

  async createMessage(
    channelId: string,
    content: string,
    authorId: string,
    attachments?: Attachment[]
  ): Promise<Message> {
    return this.request<Message>("/api/messages", {
      method: "POST",
      body: JSON.stringify({ channelId, content, authorId, attachments }),
    });
  }

  // Upload endpoint
  async uploadFile(file: File): Promise<{ url: string }> {
    const formData = new FormData();
    formData.append("file", file);

    const headers: HeadersInit = {};
    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }

    const response = await fetch(`${this.baseURL}/api/uploads`, {
      method: "POST",
      headers,
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Upload failed");
    }

    return response.json();
  }
}

// Export singleton instance
export const apiClient = new APIClient(API_BASE_URL);

// Export class for testing
export { APIClient };
