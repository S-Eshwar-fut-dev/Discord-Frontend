"use client";

import GuildsRail from "@/components/Navigation/GuildsRail";
import ChannelsColumn from "@/components/Navigation/ChannelsColumn";
import MembersColumn from "@/components/Navigation/MembersColumn";

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left narrow guild rail */}
      <div className="flex-none">
        <GuildsRail />
      </div>

      {/* Left sidebar + main chat area container */}
      <div className="flex-1 flex">
        {/* Channels / middle column */}
        <div className="w-80 border-r border-[#202225]">
          <ChannelsColumn />
        </div>

        {/* Chat view (placeholder) */}
        <div className="flex-1">
          <div className="h-full p-6 bg-[#0f1113]">
            <div className="w-full h-full rounded-lg bg-[#111214] ring-1 ring-black/30 p-4">
              <h2 className="text-xl font-semibold">Welcome to Eoncord</h2>
              <p className="text-sm text-gray-300 mt-2">
                Select a channel to start chatting — this is a mock chat view to
                build later.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right members column */}
      <div className="w-80 border-l border-[#202225]">
        <MembersColumn />
      </div>
    </div>
  );
}
