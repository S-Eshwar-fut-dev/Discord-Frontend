"use client";

import React, { useState } from "react";
import { ChevronDown, Search, Bell, Users, Settings, Plus } from "lucide-react";
import ChannelCategory from "./ChannelCategory";
import ChannelItem from "./ChannelItem";
import IconButton from "@/components/ui/IconButton";
import CreateChannelModal from "@/components/overlays/CreateChannelModal";
import { mockChannels } from "@/components/mocks/channels";
import ChannelSettingsModal from "@/components/overlays/ChannelSettingsModal";

interface Channel {
  id: string;
  name: string;
  type: "text" | "voice";
  category: string;
  unread?: boolean;
  mentions?: number;
  topic?: string;
}

export default function ChannelsColumn() {
  const [activeChannel, setActiveChannel] = useState("1");
  const [showServerMenu, setShowServerMenu] = useState(false);
  const [showCreateChannel, setShowCreateChannel] = useState(false);
  const [channels, setChannels] = useState<Channel[]>(
    mockChannels as Channel[]
  );
  const [settingsChannel, setSettingsChannel] = useState<Channel | null>(null);
  // Group channels by category
  const groupedChannels = channels.reduce((acc, channel) => {
    if (!acc[channel.category]) {
      acc[channel.category] = [];
    }
    acc[channel.category].push(channel);
    return acc;
  }, {} as Record<string, Channel[]>);

  const handleCreateChannel = (data: {
    name: string;
    type: "text" | "voice";
  }) => {
    const newChannel: Channel = {
      id: `${Date.now()}`,
      name: data.name,
      type: data.type,
      category: "Text Channels",
    };
    setChannels([...channels, newChannel]);
  };

  const handleUpdateChannel = (
    id: string,
    data: { name: string; topic: string }
  ) => {
    setChannels((prev) =>
      prev.map((ch) => (ch.id === id ? { ...ch, ...data } : ch))
    );
  };

  const handleDeleteChannel = (id: string) => {
    setChannels((prev) => prev.filter((ch) => ch.id !== id));
    if (activeChannel === id) setActiveChannel("");
  };

  return (
    <>
      <div className="h-full flex flex-col bg-[#2b2d31]">
        {/* Server Header */}
        <button
          onClick={() => setShowServerMenu(!showServerMenu)}
          className="flex-none h-12 px-4 flex items-center justify-between border-b border-[#1e1f22] hover:bg-[#35373c] transition-colors"
        >
          <span className="font-semibold text-white">Eoncord Server</span>
          <ChevronDown
            size={18}
            className={`text-[#b5bac1] transition-transform ${
              showServerMenu ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Server Menu Dropdown */}
        {showServerMenu && (
          <div className="absolute top-12 left-0 right-0 mx-2 bg-[#111214] rounded-md shadow-2xl border border-[#1e1f22] p-2 z-50">
            <button className="w-full px-3 py-2 text-left text-sm text-indigo-400 hover:bg-[#35373c] rounded transition-colors">
              Invite People
            </button>
            <button className="w-full px-3 py-2 text-left text-sm text-[#dbdee1] hover:bg-[#35373c] rounded transition-colors">
              Server Settings
            </button>
            <button
              onClick={() => {
                setShowCreateChannel(true);
                setShowServerMenu(false);
              }}
              className="w-full px-3 py-2 text-left text-sm text-[#dbdee1] hover:bg-[#35373c] rounded transition-colors"
            >
              Create Channel
            </button>
            <div className="my-1 border-t border-[#3f4147]" />
            <button className="w-full px-3 py-2 text-left text-sm text-[#dbdee1] hover:bg-[#35373c] rounded transition-colors">
              Notification Settings
            </button>
            <button className="w-full px-3 py-2 text-left text-sm text-[#dbdee1] hover:bg-[#35373c] rounded transition-colors">
              Privacy Settings
            </button>
            <div className="my-1 border-t border-[#3f4147]" />
            <button className="w-full px-3 py-2 text-left text-sm text-red-400 hover:bg-[#35373c] rounded transition-colors">
              Leave Server
            </button>
          </div>
        )}

        {/* Channels List */}
        <div className="flex-1 overflow-y-auto custom-scroll px-2 py-2">
          {Object.entries(groupedChannels).map(
            ([category, categoryChannels]) => (
              <ChannelCategory
                key={category}
                name={category}
                onCreateChannel={() => setShowCreateChannel(true)}
              >
                {categoryChannels.map((channel) => (
                  <div key={channel.id} className="group/item relative">
                    <ChannelItem
                      name={channel.name}
                      type={channel.type}
                      selected={activeChannel === channel.id}
                      unread={channel.unread}
                      mentions={channel.mentions}
                      onClick={() => setActiveChannel(channel.id)}
                    />
                    {/* Settings Gear - Appears on Hover */}
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover/item:opacity-100 transition-opacity">
                      <IconButton
                        icon={<Settings size={14} />}
                        label="Edit Channel"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSettingsChannel(channel);
                        }}
                      />
                    </div>
                  </div>
                ))}
              </ChannelCategory>
            )
          )}
        </div>

        {/* User Profile Bar */}
        <div className="flex-none h-14 px-2 flex items-center justify-between bg-[#232428] border-t border-[#1e1f22]">
          <div className="flex items-center gap-2 min-w-0">
            <div className="relative">
              <img
                src="/avatars/1.png"
                alt="User"
                className="w-8 h-8 rounded-full"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#23a55a] border-2 border-[#232428] rounded-full" />
            </div>
            <div className="min-w-0">
              <div className="text-sm font-semibold text-white truncate">
                Eshwar
              </div>
              <div className="text-xs text-[#87888c]">Online</div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <IconButton icon={<Bell size={18} />} label="Mute" size="sm" />
            <IconButton
              icon={<Settings size={18} />}
              label="Settings"
              size="sm"
            />
          </div>
        </div>
      </div>

      <ChannelSettingsModal
        channel={settingsChannel}
        onClose={() => setSettingsChannel(null)}
        onSave={handleUpdateChannel}
        onDelete={handleDeleteChannel}
      />

      <CreateChannelModal
        isOpen={showCreateChannel}
        onClose={() => setShowCreateChannel(false)}
        onSubmit={handleCreateChannel}
      />
    </>
  );
}
