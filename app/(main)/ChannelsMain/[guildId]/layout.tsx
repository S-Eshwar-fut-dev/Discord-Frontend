"use client";

import { use } from "react";
import GuildsRail from "@/components/Navigation/Guild/GuildsRail";
import ChannelsColumn from "@/components/Navigation/Channel/ChannelsColumn";
import MembersSidebar from "@/components/Navigation/Members/MembersSidebar";
import { mockGuilds } from "@/components/mocks/mockGuilds";
import { notFound } from "next/navigation";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{
    guildId: string;
  }>;
}

export default function GuildLayout({ children, params }: LayoutProps) {
  const { guildId } = use(params);
  const guild = mockGuilds.find((g) => g.id === guildId);

  if (!guild) {
    notFound();
  }

  return (
    <div className="h-screen w-screen flex bg-[#313338] text-white overflow-hidden">
      {/* Guilds Rail */}
      <div className="flex-none w-[72px] bg-[#1e1f22]">
        <GuildsRail activeGuildId={guildId} />
      </div>

      {/* Channels Sidebar */}
      <div className="flex-none w-60 bg-[#2b2d31]">
        <ChannelsColumn guildId={guildId} guildName={guild.name} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-0 min-w-0">{children}</div>

      {/* Members Sidebar */}
      <div className="flex-none w-60 bg-[#2b2d31]">
        <MembersSidebar />
      </div>
    </div>
  );
}
