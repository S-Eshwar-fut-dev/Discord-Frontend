// store/dms.ts
import { create } from "zustand";
import type { ChatMessage, ChatUser } from "@/components/chat/MessageItem";

export type Conversation = {
  id: string; // dm:{userId} or generated uuid for group
  participantId: string;
  participantName: string;
  lastMessage?: ChatMessage | null;
  unread?: number;
};

type DmsState = {
  convos: Conversation[];
  setConvos: (c: Conversation[]) => void;
  upsertConvo: (c: Conversation) => void;
  markRead: (id: string) => void;
};

export const useDmsStore = create<DmsState>((set) => ({
  convos: [],
  setConvos: (c) => set({ convos: c }),
  upsertConvo: (c) =>
    set((s) => {
      const exists = s.convos.find((x) => x.id === c.id);
      if (exists)
        return { convos: [c, ...s.convos.filter((x) => x.id !== c.id)] };
      return { convos: [c, ...s.convos] };
    }),
  markRead: (id) =>
    set((s) => ({
      convos: s.convos.map((c) => (c.id === id ? { ...c, unread: 0 } : c)),
    })),
}));
