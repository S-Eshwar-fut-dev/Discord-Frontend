"use client";

import React, { useState } from "react";
import {
  Search,
  MessageSquare,
  MoreVertical,
  Inbox,
  HelpCircle,
  Users,
} from "lucide-react";
import Avatar from "@/components/ui/Avatar";
import { mockFriends } from "@/components/mocks/mockFriends";
import { cn } from "@/lib/utils/cn";

export default function FriendsView() {
  const [activeTab, setActiveTab] = useState<
    "online" | "all" | "pending" | "blocked"
  >("online");

  return (
    <div className="flex h-full bg-[#313338]">
      {/* Main List Area */}
      <div className="flex-1 flex flex-col min-w-0 border-r border-[#3f4147]/40">
        {/* Header */}
        <div className="h-12 flex items-center justify-between px-4 border-b border-[#26272b] shadow-sm shrink-0">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-[#949ba4] font-bold mr-2">
              <Users size={20} />
              <span className="text-white">Friends</span>
            </div>

            <div className="w-px h-6 bg-[#3f4147]" />

            <div className="flex gap-2">
              <TabButton
                label="Online"
                active={activeTab === "online"}
                onClick={() => setActiveTab("online")}
              />
              <TabButton
                label="All"
                active={activeTab === "all"}
                onClick={() => setActiveTab("all")}
              />
              <TabButton
                label="Pending"
                active={activeTab === "pending"}
                onClick={() => setActiveTab("pending")}
              />
              <TabButton
                label="Blocked"
                active={activeTab === "blocked"}
                onClick={() => setActiveTab("blocked")}
              />
              <button className="bg-[#23a559] text-white px-2 py-0.5 rounded-sm text-sm font-medium ml-2 transition-colors hover:bg-[#1a7f42]">
                Add Friend
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[#b5bac1]">
            <Inbox size={24} className="hover:text-[#dbdee1] cursor-pointer" />
            <HelpCircle
              size={24}
              className="hover:text-[#dbdee1] cursor-pointer"
            />
          </div>
        </div>

        {/* Search Bar */}
        <div className="p-4 pb-2">
          <div className="relative">
            <input
              placeholder="Search"
              className="w-full bg-[#1e1f22] text-[#dbdee1] placeholder-[#949ba4] rounded-sm py-1.5 px-2 pl-3 outline-none focus:ring-0"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 text-[#949ba4]">
              <Search size={18} />
            </div>
          </div>
        </div>

        {/* Friends List */}
        <div className="flex-1 overflow-y-auto custom-scroll p-4 pt-0">
          <div className="text-xs font-bold text-[#949ba4] uppercase mb-4 mt-2">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} —{" "}
            {mockFriends.length}
          </div>

          <div className="space-y-2">
            {mockFriends.map((friend) => (
              <div
                key={friend.id}
                className="group flex items-center justify-between p-2.5 rounded-Ig hover:bg-[#3f4147]/40 border-t border-[#3f4147]/40 hover:border-transparent cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Avatar
                    src={friend.avatar}
                    alt={friend.username}
                    status={friend.status}
                    size={32}
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-white text-sm">
                        {friend.username}
                      </span>
                      <span className="hidden group-hover:inline text-[#b5bac1] text-xs">
                        #{friend.tag?.replace("#", "")}
                      </span>
                    </div>
                    <div className="text-xs text-[#b5bac1] font-medium">
                      {friend.status === "online" ? "Online" : "Offline"}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-[#2b2d31] flex items-center justify-center text-[#b5bac1] hover:text-[#dbdee1] transition-colors border border-[#1e1f22]">
                    <MessageSquare size={18} fill="currentColor" />
                  </div>
                  <div className="w-9 h-9 rounded-full bg-[#2b2d31] flex items-center justify-center text-[#b5bac1] hover:text-[#dbdee1] transition-colors border border-[#1e1f22]">
                    <MoreVertical size={18} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* "Active Now" Sidebar */}
      <div className="w-[360px] shrink-0 p-4 hidden xl:block">
        <h2 className="text-xl font-bold text-white mb-4">Active Now</h2>
        <div className="text-center py-10 px-4">
          <div className="text-white font-bold mb-2">It's quiet for now...</div>
          <p className="text-[#b5bac1] text-sm">
            When a friend starts an activity—like playing a game or hanging out
            on voice—we’ll show it here!
          </p>
        </div>
      </div>
    </div>
  );
}

function TabButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-2 py-0.5 rounded-sm text-[15px] font-medium transition-colors",
        active
          ? "bg-[#404249] text-white"
          : "text-[#b5bac1] hover:bg-[#35373c] hover:text-[#dbdee1]"
      )}
    >
      {label}
    </button>
  );
}
