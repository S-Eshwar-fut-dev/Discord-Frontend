"use client";

import { useState } from "react";
import { Plus, Compass } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import CreateServerModal from "@/components/overlays/CreateServerModal";
import GuildIcon from "./GuildIcon";
import ServerTooltip from "./ServerTooltip";

// Mock Data
const mockGuilds = [
  {
    id: "home",
    label: "Direct Messages",
    short: "Dc",
    icon: "/discord-logo-white.svg",
  }, // Ensure this icon exists in /public or use text
  { id: "es", label: "Eshwar S", short: "ES", color: "#8b5cf6" },
  { id: "fm", label: "Fm", short: "Fm", color: "#fb7185" },
];

export default function GuildsRail() {
  const [active, setActive] = useState<string>("home");
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <>
      {/* Sidebar Container 
        - Fixed width 72px
        - Full viewport height (h-screen)
        - Dark background (#1E1F22)
        - Flex column
        - Hidden Scrollbar logic added to classList
      */}
      <nav
        className={cn(
          "w-[72px] h-screen flex flex-col items-center py-3 select-none",
          "bg-[#1E1F22]",
          "overflow-y-auto",
          // Hide scrollbar but allow scrolling
          "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        )}
      >
        {/* Home Button */}
        <div className="mb-2">
          <ServerTooltip label="Direct Messages">
            <GuildIcon
              name="Direct Messages"
              icon={mockGuilds[0].icon} // Or fallback to text in GuildIcon if null
              isActive={active === "home"}
              onClick={() => setActive("home")}
              isHome
            />
          </ServerTooltip>
        </div>

        {/* Separator */}
        <div className="w-8 h-0.5 bg-[#35363C] rounded-lg mb-2 shrink-0" />

        {/* Guild List */}
        <div className="flex flex-col gap-2 w-full items-center">
          {mockGuilds.slice(1).map((g) => (
            <ServerTooltip key={g.id} label={g.label}>
              <GuildIcon
                name={g.label}
                isActive={active === g.id}
                onClick={() => setActive(g.id)}
              />
            </ServerTooltip>
          ))}
        </div>

        {/* Separator */}
        <div className="w-8 h-0.5 bg-[#35363C] rounded-lg my-2 shrink-0" />

        {/* Add Server Button */}
        <div className="mb-2">
          <ServerTooltip label="Add a Server">
            <button
              onClick={() => setShowCreateModal(true)}
              className={cn(
                "group relative flex items-center justify-center w-12 h-12 transition-all duration-200",
                // Default state: Circle, Dark BG, Green Text
                "rounded-3xl bg-[#313338] text-[#23a559]",
                // Hover state: Squircle, Green BG, White Text
                "hover:rounded-2xl hover:bg-[#23a559] hover:text-white"
              )}
            >
              <Plus size={24} className="transition-colors" />
            </button>
          </ServerTooltip>
        </div>

        {/* Explore Button */}
        <div className="mb-2">
          <ServerTooltip label="Explore Discoverable Servers">
            <button
              className={cn(
                "group relative flex items-center justify-center w-12 h-12 transition-all duration-200",
                "rounded-3xl bg-[#313338] text-[#23a559]",
                "hover:rounded-2xl hover:bg-[#23a559] hover:text-white"
              )}
            >
              <Compass size={24} className="transition-colors" />
            </button>
          </ServerTooltip>
        </div>
      </nav>

      <CreateServerModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />
    </>
  );
}
