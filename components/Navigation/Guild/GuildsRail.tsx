// components/Navigation/Guild/GuildsRail.tsx
"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

const mockGuilds = [
  {
    id: "home",
    label: "Home",
    short: "Dc",
    color: "#6b9cff",
    icon: "/servers/home.png",
  },
  {
    id: "es",
    label: "Eshwar S",
    short: "ES",
    color: "#8b5cf6",
    icon: "/servers/server1.png",
  },
  {
    id: "fm",
    label: "Fm",
    short: "Fm",
    color: "#fb7185",
    icon: "/servers/server2.png",
  },
];

export default function GuildsRail() {
  const [active, setActive] = useState<string>("home");
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <nav className="w-[72px] h-screen flex flex-col justify-between items-center bg-[#0b0c0d] border-r border-[#111213] py-3 select-none">
      {/* top area: logo + guilds */}
      <div className="flex flex-col items-center gap-3 w-full">
        {/* logo */}
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#5865F2] to-[#5C7CFA] flex items-center justify-center text-white font-black text-lg">
          Dc
        </div>

        <div className="flex flex-col gap-3 overflow-auto no-scrollbar max-h-[60vh]">
          {mockGuilds.map((g) => (
            <button
              key={g.id}
              title={g.label}
              onClick={() => setActive(g.id)}
              className={`w-12 h-12 rounded-2xl flex items-center justify-center transition relative
                ${
                  active === g.id
                    ? "ring-2 ring-indigo-500 bg-[#2f3136]"
                    : "bg-[#18191b] hover:bg-[#232427]"
                }`}
            >
              <span className="text-white text-sm font-semibold">
                {g.short}
              </span>
              {active === g.id && (
                <span className="absolute -left-3 w-1.5 h-10 rounded-r-full bg-indigo-500" />
              )}
            </button>
          ))}
        </div>

        <div className="mt-2">
          <button
            title="Create or join"
            className="w-12 h-12 rounded-2xl flex items-center justify-center bg-[#111214] hover:bg-[#232427] transition text-white"
          >
            <Plus size={18} />
          </button>
        </div>
      </div>

      {/* bottom area: profile (pinned by justify-between) */}
      <div className="w-full px-3 pb-4">
        <div className="relative">
          <button
            onClick={() => setShowUserMenu((s) => !s)}
            className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[#101113] hover:bg-[#1b1b1d] w-full"
          >
            <img
              src="/avatars/1.png"
              alt="me"
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="hidden md:flex flex-col text-left truncate">
              <span className="text-xs font-semibold truncate">Eshwar S</span>
              <span className="text-[11px] text-green-400">Online</span>
            </div>
          </button>

          {showUserMenu && (
            <div className="absolute bottom-14 left-0 w-48 bg-[#232427] ring-1 ring-black/40 rounded-md p-2 shadow-lg">
              <button className="w-full flex items-center gap-2 px-3 py-2 rounded-md hover:bg-[#2b2d31]">
                Profile
              </button>
              <button className="w-full flex items-center gap-2 px-3 py-2 rounded-md hover:bg-[#2b2d31]">
                Settings
              </button>
              <div className="border-t border-[#2a2b2d] my-2" />
              <button className="w-full flex items-center gap-2 px-3 py-2 rounded-md hover:bg-[#2b2d31] text-rose-400">
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
