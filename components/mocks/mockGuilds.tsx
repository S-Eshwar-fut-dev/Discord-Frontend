import { Terminal, Laptop, Gamepad2 } from "lucide-react";

export interface Guild {
  id: string;
  name: string;
  icon: React.ReactNode;
  unread?: boolean;
  mentions?: number;
}

export const mockGuilds: Guild[] = [
  {
    id: "1",
    name: "Eoncord HQ",
    // Use the Lucide Laptop Icon here
    icon: <Laptop size={28} />,
    unread: true,
    mentions: 2,
  },
  {
    id: "2",
    name: "Developers Hub",
    // You can use an <img> tag for custom images
    icon: <Terminal size={28} />,
  },
  {
    id: "3",
    name: "Gamers Club",
    // Use the Lucide Gamepad Icon here
    icon: <Gamepad2 size={28} />,
    unread: true,
  },
];
