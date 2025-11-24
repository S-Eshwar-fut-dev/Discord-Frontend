import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

export type NotificationType = "mention" | "reply" | "system";

export interface Notification {
  id: string;
  type: NotificationType;
  guildId?: string;
  guildName?: string;
  channelId: string;
  channelName: string;
  author: {
    id: string;
    username: string;
    avatar?: string | null;
  };
  content: string;
  timestamp: string;
  read: boolean;
}

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;

  addNotification: (n: Omit<Notification, "id" | "read" | "timestamp">) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  unreadCount: 0,

  addNotification: (n) =>
    set((state) => {
      const newNotification: Notification = {
        ...n,
        id: uuidv4(),
        timestamp: new Date().toISOString(),
        read: false,
      };
      return {
        notifications: [newNotification, ...state.notifications],
        unreadCount: state.unreadCount + 1,
      };
    }),

  markAsRead: (id) =>
    set((state) => {
      const notifs = state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      );
      return {
        notifications: notifs,
        unreadCount: notifs.filter((n) => !n.read).length,
      };
    }),

  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
      unreadCount: 0,
    })),

  clearNotifications: () => set({ notifications: [], unreadCount: 0 }),
}));
