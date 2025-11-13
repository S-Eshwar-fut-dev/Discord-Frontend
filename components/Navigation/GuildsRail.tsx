// app/dashboard/GuildsRail.tsx
"use client";

import { useState } from "react";
import { Plus, Settings, User, LogOut } from "lucide-react";

const mockGuilds = [
  { id: "home", label: "Eshwar", short: "Es", color: "#6b9cff" },
  { id: "es", label: "Eshwar S", short: "ES", color: "#8b5cf6" },
  { id: "fm", label: "Fm", short: "Fm", color: "#fb7185" },
  { id: "wd", label: "W-D", short: "W-D", color: "#34d399" },
];

export default function GuildsRail() {
  const [active, setActive] = useState<string>("home");
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <div className="flex flex-col items-center gap-3 px-3 py-4 bg-[#0b0c0d] border-r border-[#111213] min-h-screen">
      {/* Top logo */}
      <div className="mb-2">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#5865F2] to-[#5C7CFA] flex items-center justify-center text-white font-black text-lg">
          Dc
        </div>
      </div>

      {/* Guild icons */}
      <div className="flex flex-col gap-3">
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
            <span className="text-white text-sm font-semibold">{g.short}</span>
            {active === g.id ? (
              <span className="absolute -left-3 w-1.5 h-10 rounded-r-full bg-indigo-500" />
            ) : null}
          </button>
        ))}
      </div>

      {/* add server */}
      <div className="mt-2">
        <button
          title="Create or join"
          className="w-12 h-12 rounded-2xl flex items-center justify-center bg-[#111214] hover:bg-[#232427] transition text-white"
        >
          <Plus size={18} />
        </button>
      </div>

      <div className="mt-auto w-full flex flex-col items-center">
        {/* User avatar button */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu((s) => !s)}
            className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[#101113] hover:bg-[#1b1b1d] transition"
          >
            <img
              src="/avatars/1.png"
              alt="me"
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-semibold">Eshwar S</span>
              <span className="text-[11px] text-green-400">Online</span>
            </div>
          </button>

          {/* small dropdown */}
          {showUserMenu && (
            <div className="absolute bottom-14 left-0 w-48 bg-[#232427] ring-1 ring-black/40 rounded-md p-2 shadow-lg">
              <button className="w-full flex items-center gap-2 px-3 py-2 rounded-md hover:bg-[#2b2d31]">
                <User size={16} /> Profile
              </button>
              <button className="w-full flex items-center gap-2 px-3 py-2 rounded-md hover:bg-[#2b2d31]">
                <Settings size={16} /> Settings
              </button>
              <div className="border-t border-[#2a2b2d] my-2" />
              <button className="w-full flex items-center gap-2 px-3 py-2 rounded-md hover:bg-[#2b2d31] text-rose-400">
                <LogOut size={16} /> Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
