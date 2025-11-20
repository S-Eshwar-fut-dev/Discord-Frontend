"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/types/api";

interface SessionState {
  user: User | null;
  setUser: (user: User | null) => void;
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
      name: "eoncord-session",
      partialize: (state) => ({ user: state.user }),
    }
  )
);
