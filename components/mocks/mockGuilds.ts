export interface Guild {
  id: string;
  name: string;
  icon: string;
  unread?: boolean;
  mentions?: number;
}

export const mockGuilds: Guild[] = [
  {
    id: "1",
    name: "Eoncord HQ",
    icon: "/servers/server1.png",
    unread: true,
    mentions: 2,
  },
  {
    id: "2",
    name: "Developers Hub",
    icon: "/servers/server2.png",
  },
  {
    id: "3",
    name: "Gamers Club",
    icon: "/servers/server3.png",
    unread: true,
  },
];
