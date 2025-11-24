"use client";

import React, { useState, useEffect } from "react";
import { Trash2, X, Hash, Volume2, Lock, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

interface ChannelSettingsModalProps {
  channel: {
    id: string;
    name: string;
    type: "text" | "voice";
    topic?: string;
  } | null;
  onClose: () => void;
  onSave: (id: string, data: { name: string; topic: string }) => void;
  onDelete: (id: string) => void;
}

type Tab = "overview" | "permissions" | "invites";

export default function ChannelSettingsModal({
  channel,
  onClose,
  onSave,
  onDelete,
}: ChannelSettingsModalProps) {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [name, setName] = useState("");
  const [topic, setTopic] = useState("");
  const [hasChanges, setHasChanges] = useState(false);

  // Reset state when channel opens
  useEffect(() => {
    if (channel) {
      setName(channel.name);
      setTopic(channel.topic || "");
      setHasChanges(false);
    }
  }, [channel]);

  // Track changes
  useEffect(() => {
    if (!channel) return;
    const changed = name !== channel.name || topic !== (channel.topic || "");
    setHasChanges(changed);
  }, [name, topic, channel]);

  // Handle Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!channel) return null;

  const handleSaveChanges = () => {
    onSave(channel.id, { name, topic });
    setHasChanges(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-100 flex bg-[#313338] animate-in fade-in duration-200">
      {/* 1. Left Sidebar */}
      <div className="w-[218px] shrink-0 bg-[#2b2d31] flex flex-col items-end py-[60px] px-2">
        <div className="w-[190px] space-y-0.5">
          <div className="px-2.5 pb-1.5 text-xs font-bold text-[#949ba4] uppercase truncate mb-2">
            {channel.type === "text" ? (
              <Hash className="inline w-3 h-3 mr-1" />
            ) : (
              <Volume2 className="inline w-3 h-3 mr-1" />
            )}
            {channel.name}
          </div>

          <SidebarItem
            label="Overview"
            isActive={activeTab === "overview"}
            onClick={() => setActiveTab("overview")}
          />
          <SidebarItem
            label="Permissions"
            isActive={activeTab === "permissions"}
            onClick={() => setActiveTab("permissions")}
          />
          <SidebarItem
            label="Invites"
            isActive={activeTab === "invites"}
            onClick={() => setActiveTab("invites")}
          />

          <div className="h-px bg-[#3f4147] my-2 mx-2" />

          <button
            onClick={() => {
              if (confirm("Are you sure you want to delete this channel?")) {
                onDelete(channel.id);
                onClose();
              }
            }}
            className="w-full flex items-center justify-between px-2.5 py-1.5 rounded text-[#949ba4] hover:bg-[#35373c] hover:text-[#f23f43] transition-colors group text-left"
          >
            <span className="text-sm font-medium">Delete Channel</span>
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* 2. Main Content */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#313338]">
        <div className="flex-1 max-w-[740px] min-w-[460px] py-[60px] px-10 overflow-y-auto custom-scroll">
          {activeTab === "overview" && (
            <div className="space-y-8">
              <h2 className="text-xl font-bold text-white mb-6">Overview</h2>

              {/* Channel Name */}
              <div className="space-y-2">
                <Input
                  label="Channel Name"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value.replace(/\s+/g, "-").toLowerCase())
                  }
                  className="bg-[#1e1f22] border-none"
                />
              </div>

              {/* Channel Topic */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase text-[#b5bac1]">
                  Channel Topic
                </label>
                <textarea
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Let everyone know how to use this channel!"
                  rows={4}
                  className="w-full px-3 py-2.5 bg-[#1e1f22] text-[#dbdee1] placeholder-[#87888c] rounded-md outline-none resize-none font-medium text-sm"
                />
              </div>

              <div className="h-px bg-[#3f4147]" />

              {/* Archive (Mock) */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-[#dbdee1]">
                    Archive Channel
                  </h3>
                  <p className="text-xs text-[#949ba4] mt-1">
                    Send this channel into hibernation.
                  </p>
                </div>
                <div className="relative inline-block w-10 h-6 rounded-full bg-[#80848e] cursor-not-allowed opacity-50">
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full" />
                </div>
              </div>
            </div>
          )}

          {activeTab === "permissions" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white mb-4">Permissions</h2>
              <div className="bg-[#2b2d31] rounded-md p-4 border border-[#1e1f22] flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#3f4147] flex items-center justify-center">
                  <Lock className="text-[#b5bac1]" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">
                    Advanced Permissions
                  </h3>
                  <p className="text-sm text-[#949ba4] mt-1">
                    Permissions are synchronized with the category{" "}
                    <strong>Text Channels</strong>.
                  </p>
                </div>
                <Button variant="secondary" className="mt-2">
                  Edit Permissions
                </Button>
              </div>
            </div>
          )}

          {activeTab === "invites" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white mb-4">Invites</h2>
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <Shield size={48} className="text-[#4e5058] mb-4" />
                <p className="text-[#949ba4]">
                  No active invites for this channel.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* 3. Save Changes Bar (Floating) */}
        <AnimatePresence>
          {hasChanges && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[700px] bg-[#111214] p-3 rounded-lg flex items-center justify-between shadow-2xl z-50"
            >
              <span className="text-white font-medium ml-2">
                Careful — you have unsaved changes!
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setName(channel.name);
                    setTopic(channel.topic || "");
                  }}
                  className="text-sm text-white hover:underline px-3"
                >
                  Reset
                </button>
                <Button
                  onClick={handleSaveChanges}
                  className="bg-[#23a559] hover:bg-[#1a7f42] text-white px-6"
                >
                  Save Changes
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 4. Close Button Column */}
      <div className="shrink-0 w-[60px] flex flex-col pt-[60px]">
        <div className="flex flex-col items-center gap-2 fixed">
          <button
            onClick={onClose}
            className="group flex flex-col items-center gap-1 text-[#949ba4] hover:text-[#dbdee1]"
          >
            <div className="w-9 h-9 rounded-full border-2 border-[#949ba4] group-hover:border-[#dbdee1] flex items-center justify-center transition-colors bg-[#313338]">
              <X size={20} />
            </div>
            <span className="text-[11px] font-bold uppercase">Esc</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function SidebarItem({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left px-2.5 py-1.5 rounded-sm text-[15px] font-medium transition-colors mb-0.5",
        isActive
          ? "bg-[#404249] text-white"
          : "text-[#b5bac1] hover:bg-[#35373c] hover:text-[#dbdee1]"
      )}
    >
      {label}
    </button>
  );
}
