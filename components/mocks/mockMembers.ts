// components/navigation/members/mockMembers.ts
export type Member = {
  id: string;
  username: string;
  avatar?: string | null;
  status: "online" | "idle" | "dnd" | "offline";
  role: string;
  tag?: string; // discriminator or short tag like #1234
};

export const mockMembers: Member[] = [
  {
    id: "1",
    username: "",
    avatar: "https://i.pravatar.cc/150?u=204",
    status: "online",
    role: "Owner",
    tag: "#0001",
  },
  {
    id: "2",
    username: "",
    avatar: "https://i.pravatar.cc/150?u=1",
    status: "offline",
    role: "Members",
    tag: "#0023",
  },
  {
    id: "3",
    username: "",
    avatar: "https://i.pravatar.cc/150?u=8",
    status: "offline",
    role: "Members",
    tag: "#0099",
  },
  {
    id: "4",
    username: "",
    avatar: "https://i.pravatar.cc/150?u=4",
    status: "idle",
    role: "Moderator",
    tag: "#0456",
  },
  {
    id: "5",
    username: "DevBot",
    avatar: "https://i.pravatar.cc/150?u=5",
    status: "dnd",
    role: "Bot",
    tag: "",
  },
];
