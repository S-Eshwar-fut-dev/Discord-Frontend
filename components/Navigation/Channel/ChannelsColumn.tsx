"use client";

import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  ChevronDown,
  Bell,
  Settings,
  User,
  Hash,
  Volume2,
  Plus,
} from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils/cn";

import ChannelCategory from "./ChannelCategory";
import ChannelItem from "./ChannelItem";
import IconButton from "@/components/ui/IconButton";
import CreateChannelModal from "@/components/overlays/CreateChannelModal";
import ChannelSettingsModal from "@/components/overlays/ChannelSettingsModal";
import VoiceControlPanel from "@/components/voice/VoiceControlPanel";
import UserStatusMenu from "@/components/Navigation/User/UserStatusMenu";
import CustomStatusModal from "@/components/overlays/CustomStatusModal";
import UserSettingsModal from "@/components/overlays/UserSettingsModal";
import { mockChannels } from "@/components/mocks/channels";
import { useVoice } from "@/hooks/useVoice";
import { useIdle } from "@/hooks/useIdle";
import { useSessionStore } from "@/store/session";

interface Channel {
  id: string;
  name: string;
  type: "text" | "voice";
  category: string;
  unread?: boolean;
  mentions?: number;
  topic?: string;
}

interface ChannelsColumnProps {
  guildId: string;
  guildName: string;
}

export default function ChannelsColumn({
  guildId,
  guildName,
}: ChannelsColumnProps) {
  const router = useRouter();
  const params = useParams();
  const { user } = useSessionStore();

  const activeChannelId = params.channelId as string;

  const [showServerMenu, setShowServerMenu] = useState(false);
  const [showCreateChannel, setShowCreateChannel] = useState(false);
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [showCustomStatus, setShowCustomStatus] = useState(false);
  const [showUserSettings, setShowUserSettings] = useState(false);
  const [settingsChannel, setSettingsChannel] = useState<Channel | null>(null);

  const [channels, setChannels] = useState<Channel[]>(
    mockChannels as Channel[]
  );

  const { currentChannelId, joinChannel, participants } = useVoice();

  // Initialize Auto-Idle hook
  useIdle();

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
  };

  const handleChannelClick = (channel: Channel) => {
    if (channel.type === "voice") {
      joinChannel(channel.id);
    } else {
      router.push(`/channels/${guildId}/${channel.id}`);
    }
  };

  return (
    <>
      <div className="h-full flex flex-col bg-[#2b2d31]">
        {/* Server Header */}
        <button
          onClick={() => setShowServerMenu(!showServerMenu)}
          className="flex-none h-12 px-4 flex items-center justify-between border-b border-[#1e1f22] hover:bg-[#35373c] transition-colors shadow-sm"
        >
          <span className="font-semibold text-white truncate">{guildName}</span>
          <ChevronDown
            size={18}
            className={cn(
              "text-[#b5bac1] transition-transform shrink-0",
              showServerMenu && "rotate-180"
            )}
          />
        </button>

        {/* Server Menu Dropdown */}
        {showServerMenu && (
          <div className="absolute top-12 left-[72px] w-[220px] bg-[#111214] rounded-md shadow-2xl border border-[#1e1f22] p-2 z-50">
            <MenuItem
              label="Invite People"
              className="text-indigo-400 hover:bg-indigo-500/10"
            />
            <MenuItem label="Server Settings" icon={<Settings size={16} />} />
            <MenuItem
              label="Create Channel"
              icon={<Plus size={16} />}
              onClick={() => {
                setShowCreateChannel(true);
                setShowServerMenu(false);
              }}
            />
            <MenuItem label="Notification Settings" icon={<Bell size={16} />} />

            <div className="my-1 border-t border-[#3f4147]" />

            <MenuItem
              label="Leave Server"
              className="text-red-400 hover:bg-red-500/10"
            />
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
                      selected={activeChannelId === channel.id}
                      unread={channel.unread}
                      mentions={channel.mentions}
                      connectedUsers={
                        channel.type === "voice" &&
                        currentChannelId === channel.id
                          ? participants
                          : []
                      }
                      onClick={() => handleChannelClick(channel)}
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

        {/* Voice Control Panel */}
        <VoiceControlPanel />

        {/* User Profile Bar */}
        <div className="flex-none h-[52px] px-2 flex items-center justify-between bg-[#232428] border-t border-[#1e1f22] relative">
          <div
            className="flex items-center gap-2 min-w-0 hover:bg-[#3f4147] p-1 rounded cursor-pointer transition-colors flex-1"
            onClick={() => setShowStatusMenu(!showStatusMenu)}
          >
            <div className="relative shrink-0">
              <img
                src={user?.avatar || "/avatars/1.png"}
                alt="User"
                className="w-8 h-8 rounded-full"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#23a55a] border-2 border-[#232428] rounded-full" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-semibold text-white truncate">
                {user?.username || "Eshwar"}
              </div>
              <div className="text-xs text-[#87888c] truncate">Online</div>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <IconButton icon={<Bell size={18} />} label="Mute" size="sm" />
            <IconButton
              icon={<Settings size={18} />}
              label="Settings"
              size="sm"
              onClick={() => setShowUserSettings(true)}
            />
          </div>

          {/* Status Menu Popover */}
          <AnimatePresence>
            {showStatusMenu && (
              <UserStatusMenu
                onClose={() => setShowStatusMenu(false)}
                onOpenCustomStatus={() => setShowCustomStatus(true)}
              />
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Modals */}
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

      <CustomStatusModal
        isOpen={showCustomStatus}
        onClose={() => setShowCustomStatus(false)}
      />

      <UserSettingsModal
        isOpen={showUserSettings}
        onClose={() => setShowUserSettings(false)}
      />
    </>
  );
}

// MenuItem Component
function MenuItem({
  label,
  icon,
  className,
  onClick,
}: {
  label: string;
  icon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full px-3 py-2 text-left text-sm rounded transition-colors flex items-center gap-2",
        "text-[#dbdee1] hover:bg-[#35373c]",
        className
      )}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
