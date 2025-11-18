"use client";

import Image from "next/image";
import { mockGuilds } from "../../mocks/mockGuilds";
import GuildIcon from "./GuildIcon";
import ServerTooltip from "./ServerTooltip";

export default function GuildsNav() {
  return (
    <nav className="flex flex-col items-center w-[72px] bg-[#1e1f22] py-3 gap-3 select-none overflow-y-auto border-r border-[#2a2b2f]">
      {/* HOME ICON */}
      <ServerTooltip label="Home">
        <GuildIcon icon="/servers/home.png" isHome />
      </ServerTooltip>

      <div className="w-8 h-[2px] bg-[#2e3136] rounded-full my-1" />

      {/* SERVERS */}
      {mockGuilds.map((g) => (
        <ServerTooltip key={g.id} label={g.name}>
          <GuildIcon icon={g.icon} unread={g.unread} />
        </ServerTooltip>
      ))}

      <div className="w-8 h-[2px] bg-[#2e3136] rounded-full my-1" />

      {/* ADD SERVER */}
      <ServerTooltip label="Add a Server">
        <GuildIcon icon="/servers/add.png" isAction />
      </ServerTooltip>

      {/* DISCOVER */}
      <ServerTooltip label="Explore Discover">
        <GuildIcon icon="/servers/discover.png" isAction />
      </ServerTooltip>
    </nav>
  );
}
