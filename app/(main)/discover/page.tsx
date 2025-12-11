"use client";

import React, { useState } from "react";
import {
  Search,
  TrendingUp,
  Users,
  Gamepad2,
  Music,
  BookOpen,
  Palette,
  Wrench,
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface DiscoverServer {
  id: string;
  name: string;
  description: string;
  icon: string;
  banner?: string;
  memberCount: number;
  onlineCount: number;
  verified?: boolean;
  partnered?: boolean;
  categories: string[];
}

const mockServers: DiscoverServer[] = [
  {
    id: "1",
    name: "Midjourney",
    description:
      "The official server for Midjourney, a text-to-image AI where your imagination is the only limit.",
    icon: "/server1.png",
    banner:
      "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=600&h=200&fit=crop",
    memberCount: 20024932,
    onlineCount: 752995,
    verified: true,
    partnered: true,
    categories: ["AI", "Art"],
  },
  {
    id: "2",
    name: "Genshin Impact Official",
    description:
      "Welcome to Teyvat, Traveler! This is the official server to discuss with others about Genshin Impact!",
    icon: "/server2.png",
    banner:
      "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=600&h=200&fit=crop",
    memberCount: 2203813,
    onlineCount: 414004,
    verified: true,
    partnered: true,
    categories: ["Gaming"],
  },
  {
    id: "3",
    name: "Marvel Rivals",
    description:
      "The official Discord server for Marvel Rivals. Find the latest news and discuss with the community!",
    icon: "/server3.png",
    banner:
      "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=600&h=200&fit=crop",
    memberCount: 1213273,
    onlineCount: 544153,
    verified: true,
    categories: ["Gaming"],
  },
];

const categories = [
  { id: "all", name: "Home", icon: <Search size={20} /> },
  { id: "gaming", name: "Gaming", icon: <Gamepad2 size={20} /> },
  { id: "music", name: "Music", icon: <Music size={20} /> },
  { id: "education", name: "Education", icon: <BookOpen size={20} /> },
  { id: "creative", name: "Creative Arts", icon: <Palette size={20} /> },
  { id: "tech", name: "Science & Tech", icon: <Wrench size={20} /> },
];

export default function DiscoverPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredServers = mockServers.filter(
    (server) =>
      server.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      server.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-screen w-screen flex bg-[#313338] text-white overflow-hidden">
      {/* Sidebar */}
      <div className="w-60 bg-[#2b2d31] border-r border-[#1e1f22] flex flex-col">
        <div className="p-4 border-b border-[#1e1f22]">
          <h1 className="text-base font-semibold text-white flex items-center gap-2">
            <Search size={20} className="text-[#b5bac1]" />
            Discover
          </h1>
        </div>

        <div className="flex-1 overflow-y-auto custom-scroll p-2">
          <div className="space-y-0.5">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-2 py-2 rounded transition-colors text-left",
                  activeCategory === category.id
                    ? "bg-[#404249] text-white"
                    : "text-[#b5bac1] hover:bg-[#35373c] hover:text-[#dbdee1]"
                )}
              >
                {category.icon}
                <span className="text-sm font-medium">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="h-14 px-6 border-b border-[#1e1f22] flex items-center gap-4 shrink-0">
          <div className="flex items-center gap-2 text-[#949ba4]">
            <Search size={20} />
            <span className="text-sm font-semibold">Discover</span>
          </div>
          <div className="flex-1">
            <div className="relative max-w-md">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Explore communities"
                className="w-full bg-[#1e1f22] text-[#dbdee1] placeholder-[#87888c] px-3 py-1.5 rounded text-sm outline-none focus:ring-1 focus:ring-[#5865f2]"
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto custom-scroll">
          <div className="max-w-7xl mx-auto p-6">
            {/* Featured Section */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="text-[#f23f43]" size={20} />
                <h2 className="text-xl font-bold text-white">
                  Featured Servers
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredServers.map((server) => (
                  <ServerCard key={server.id} server={server} />
                ))}
              </div>
            </div>

            {/* Categories Grid */}
            {filteredServers.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-32 h-32 mb-4 opacity-20">
                  <Search size={128} className="text-[#b5bac1]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  No servers found
                </h3>
                <p className="text-[#b5bac1]">
                  Try adjusting your search or explore different categories
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ServerCard({ server }: { server: DiscoverServer }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#2b2d31] rounded-lg overflow-hidden hover:bg-[#313338] transition-colors cursor-pointer group"
    >
      {/* Banner */}
      {server.banner && (
        <div className="h-[120px] relative overflow-hidden">
          <img
            src={server.banner}
            alt=""
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#2b2d31] to-transparent" />
        </div>
      )}

      <div className="p-4">
        {/* Icon & Title */}
        <div className="flex items-start gap-3 mb-3">
          <div className="w-12 h-12 rounded-full bg-[#1e1f22] flex items-center justify-center shrink-0 overflow-hidden">
            {server.icon ? (
              <img
                src={server.icon}
                alt={server.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-xl font-bold text-white">
                {server.name.charAt(0)}
              </span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-white truncate">
                {server.name}
              </h3>
              {server.verified && (
                <div className="w-4 h-4 rounded-full bg-[#5865f2] flex items-center justify-center shrink-0">
                  <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M13 4L6 11L3 8"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
              {server.partnered && (
                <div className="text-xs bg-[#5865f2] text-white px-1.5 py-0.5 rounded font-bold">
                  PARTNER
                </div>
              )}
            </div>
            <p className="text-xs text-[#b5bac1] line-clamp-2 leading-snug">
              {server.description}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 pt-3 border-t border-[#1e1f22]">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[#23a559]" />
            <span className="text-xs text-[#b5bac1] font-medium">
              {formatNumber(server.onlineCount)} online
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[#80848e]" />
            <span className="text-xs text-[#b5bac1] font-medium">
              {formatNumber(server.memberCount)} members
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
  return num.toString();
}
