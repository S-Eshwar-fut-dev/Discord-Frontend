"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  username: string;
  email: string;
}

interface SessionState {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      user: null,

      setUser: (user) => {
        set({ user });
      },

      logout: () => {
        set({ user: null });
      },
    }),
    {
      name: "eoncord-session", // key in localStorage
      partialize: (state) => ({ user: state.user }),
    }
  )
);
