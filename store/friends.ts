import { create } from "zustand";
import type { Friend } from "@/components/mocks/mockFriends";

type FriendsState = {
  friends: Friend[];
  setFriends: (f: Friend[]) => void;
  addFriend: (f: Friend) => void;
  updateFriend: (id: string, patch: Partial<Friend>) => void;
};

export const useFriendsStore = create<FriendsState>((set) => ({
  friends: [],
  setFriends: (f) => set({ friends: f }),
  addFriend: (f) => set((s) => ({ friends: [f, ...s.friends] })),
  updateFriend: (id, patch) =>
    set((s) => ({
      friends: s.friends.map((fr) => (fr.id === id ? { ...fr, ...patch } : fr)),
    })),
}));
