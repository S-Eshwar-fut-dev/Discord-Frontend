import { apiClient } from "./client";

export interface Guild {
  id: string;
  name: string;
  icon?: string | null;
  unread?: boolean;
}

export async function fetchGuilds(): Promise<Guild[]> {
  return apiClient.get<Guild[]>("/api/guilds");
}

export async function createGuild(data: {
  name: string;
  icon?: string;
}): Promise<Guild> {
  return apiClient.post<Guild>("/api/guilds", data);
}
