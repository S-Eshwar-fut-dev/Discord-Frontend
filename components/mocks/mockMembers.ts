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
    username: "Eshwar S",
    avatar: "/avatars/a1.png",
    status: "online",
    role: "Owner",
    tag: "#0001",
  },
  {
    id: "2",
    username: "InnocentZERO",
    avatar: "/avatars/a2.png",
    status: "offline",
    role: "Members",
    tag: "#0023",
  },
  {
    id: "3",
    username: "KingDudeDS",
    avatar: "/avatars/a3.png",
    status: "offline",
    role: "Members",
    tag: "#0099",
  },
  {
    id: "4",
    username: "MONJIRO",
    avatar: "/avatars/a4.png",
    status: "idle",
    role: "Moderator",
    tag: "#0456",
  },
  {
    id: "5",
    username: "DevBot",
    avatar: null,
    status: "dnd",
    role: "Bot",
    tag: "",
  },
];
