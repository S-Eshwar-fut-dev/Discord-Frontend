"use client";

import { useRouter, usePathname } from "next/navigation";
import { Plus, Compass, MessageSquare } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils/cn";
import CreateServerModal from "@/components/overlays/CreateServerModal";
import GuildIcon from "./GuildIcon";
import { mockGuilds } from "@/components/mocks/mockGuilds";

interface GuildsRailProps {
  activeGuildId?: string;
}

export default function GuildsRail({ activeGuildId }: GuildsRailProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [showCreateModal, setShowCreateModal] = useState(false);

  const isDMActive = pathname.startsWith("/channels/@me");

  const handleGuildClick = (guildId: string) => {
    if (guildId === "@me") {
      router.push("/channels/@me");
    } else {
      // Navigate to first text channel of the guild
      router.push(`/channels/${guildId}/1`);
    }
  };

  return (
    <>
      <nav className="w-[72px] h-screen flex flex-col items-center py-3 bg-[#1E1F22] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {/* Home Button (DMs) - Replaced Discord logo with chat icon */}
        <div className="mb-2">
          <GuildTooltip label="Direct Messages">
            <button
              onClick={() => handleGuildClick("@me")}
              className={cn(
                "relative w-12 h-12 flex items-center justify-center rounded-3xl transition-all duration-200 group",
                isDMActive
                  ? "rounded-2xl bg-[#5865f2]"
                  : "bg-[#313338] hover:bg-[#5865f2] hover:rounded-2xl"
              )}
            >
              <MessageSquare size={28} className="text-white" />

              {/* Active Indicator */}
              {isDMActive && (
                <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-10 rounded-r-full bg-white transition-all" />
              )}

              {/* Hover Indicator */}
              {!isDMActive && (
                <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-5 scale-0 group-hover:scale-100 rounded-r-full bg-white transition-all" />
              )}
            </button>
          </GuildTooltip>
        </div>

        {/* Separator */}
        <div className="w-8 h-0.5 bg-[#35363C] rounded-lg mb-2 shrink-0" />

        {/* Guild List */}
        <div className="flex flex-col gap-2 w-full items-center">
          {mockGuilds.map((guild) => (
            <GuildTooltip key={guild.id} label={guild.name}>
              <GuildIcon
                name={guild.name}
                icon={guild.icon}
                isActive={activeGuildId === guild.id}
                unread={guild.unread}
                mentions={guild.mentions}
                onClick={() => handleGuildClick(guild.id)}
              />
            </GuildTooltip>
          ))}
        </div>

        {/* Separator */}
        <div className="w-8 h-0.5 bg-[#35363C] rounded-lg my-2 shrink-0" />

        {/* Add Server Button */}
        <div className="mb-2">
          <GuildTooltip label="Add a Server">
            <button
              onClick={() => setShowCreateModal(true)}
              className={cn(
                "group relative flex items-center justify-center w-12 h-12 transition-all duration-200",
                "rounded-3xl bg-[#313338] text-[#23a559]",
                "hover:rounded-2xl hover:bg-[#23a559] hover:text-white"
              )}
            >
              <Plus size={24} className="transition-colors" />
            </button>
          </GuildTooltip>
        </div>

        {/* Explore Button */}
        <div className="mb-2">
          <GuildTooltip label="Explore Discoverable Servers">
            <button
              className={cn(
                "group relative flex items-center justify-center w-12 h-12 transition-all duration-200",
                "rounded-3xl bg-[#313338] text-[#23a559]",
                "hover:rounded-2xl hover:bg-[#23a559] hover:text-white"
              )}
            >
              <Compass size={24} className="transition-colors" />
            </button>
          </GuildTooltip>
        </div>
      </nav>

      <CreateServerModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />
    </>
  );
}

// Tooltip Component
function GuildTooltip({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative group flex items-center justify-center">
      {children}

      {/* Tooltip */}
      <div className="invisible group-hover:visible absolute left-[60px] px-3 py-1 rounded-md bg-black text-white text-xs whitespace-nowrap shadow-xl z-50 pointer-events-none">
        {label}
        {/* Arrow */}
        <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-black" />
      </div>
    </div>
  );
}
