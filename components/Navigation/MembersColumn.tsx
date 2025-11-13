// app/dashboard/MembersColumn.tsx
"use client";

import { useState } from "react";
import { Search } from "lucide-react";

const members = [
  {
    id: "m1",
    name: "InnocentZERO",
    avatar: "/avatars/2.png",
    status: "offline",
    role: "Member",
  },
  {
    id: "m2",
    name: "KingDudeDS",
    avatar: "/avatars/3.png",
    status: "offline",
    role: "Member",
  },
  {
    id: "m3",
    name: "Eshwar S",
    avatar: "/avatars/1.png",
    status: "online",
    role: "Owner",
  },
];

export default function MembersColumn() {
  const [q, setQ] = useState("");

  const filtered = members.filter((m) =>
    m.name.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="h-full p-4 bg-[#0f1113]">
      <div className="mb-3 flex items-center justify-between">
        <h4 className="text-sm font-semibold">Friends</h4>
        <div className="text-xs text-gray-400">All</div>
      </div>

      <div className="mb-3">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-3 text-gray-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search"
            className="w-full pl-10 pr-3 py-2 rounded-md bg-[#121214] text-sm placeholder-gray-500 outline-none ring-1 ring-[#1f2022] focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((m) => (
          <div key={m.id} className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={m.avatar}
                  className="w-10 h-10 rounded-full object-cover"
                  alt={m.name}
                />
                <span
                  className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-[#0f1113] ${
                    m.status === "online" ? "bg-green-400" : "bg-gray-600"
                  }`}
                />
              </div>
              <div>
                <div className="text-sm font-medium">{m.name}</div>
                <div className="text-xs text-gray-400">{m.role}</div>
              </div>
            </div>
            <div className="text-gray-400">⋯</div>
          </div>
        ))}
      </div>

      <div className="mt-auto pt-4 border-t border-[#202225] text-xs text-gray-400">
        <div className="font-semibold text-sm mb-1">Active Now</div>
        <div className="text-sm text-gray-400">It's quiet for now…</div>
      </div>
    </div>
  );
}
