"use client";

import React, { useState } from "react";
import { X, Volume2, Video } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface VoiceChannelSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  channelName?: string;
}

export default function VoiceChannelSettings({
  isOpen,
  onClose,
  channelName = "Stream Room",
}: VoiceChannelSettingsProps) {
  const [bitrate, setBitrate] = useState(64);
  const [videoQuality, setVideoQuality] = useState<"auto" | "720p">("auto");
  const [slowmode, setSlowmode] = useState("off");
  const [ageRestricted, setAgeRestricted] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex bg-[#313338]">
      {/* Sidebar */}
      <div className="w-[218px] shrink-0 bg-[#2b2d31] flex flex-col items-end py-[60px] px-2">
        <div className="w-[190px] space-y-0.5">
          <div className="px-2.5 pb-1.5 text-xs font-bold text-[#949ba4] uppercase mb-2">
            <Volume2 className="inline w-3 h-3 mr-1" />
            {channelName}
          </div>

          <SidebarItem label="Overview" isActive />
          <SidebarItem label="Permissions" />
          <SidebarItem label="Invites" />
          <SidebarItem label="Advanced" />

          <div className="h-px bg-[#3f4147] my-2 mx-2" />

          <button className="w-full flex items-center justify-between px-2.5 py-1.5 rounded text-[#949ba4] hover:bg-[#35373c] hover:text-[#f23f43] transition-colors text-left">
            <span className="text-sm font-medium">Delete Channel</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 max-w-[740px] min-w-[460px] py-[60px] px-10 overflow-y-auto custom-scroll">
          <h2 className="text-xl font-bold text-white mb-6">Overview</h2>

          {/* Channel Name */}
          <div className="mb-6">
            <label className="block text-xs font-bold uppercase text-[#b5bac1] mb-2">
              Channel Name
            </label>
            <input
              type="text"
              value={channelName}
              className="w-full px-3 py-2.5 bg-[#1e1f22] text-[#dbdee1] rounded outline-none focus:ring-1 focus:ring-[#00a8fc]"
            />
          </div>

          <div className="h-px bg-[#3f4147] my-6" />

          {/* Slowmode */}
          <div className="mb-6">
            <label className="block text-xs font-bold uppercase text-[#b5bac1] mb-2">
              Slowmode
            </label>
            <select
              value={slowmode}
              onChange={(e) => setSlowmode(e.target.value)}
              className="w-full px-3 py-2.5 bg-[#1e1f22] text-[#dbdee1] rounded outline-none cursor-pointer"
            >
              <option value="off">Off</option>
              <option value="5s">5 seconds</option>
              <option value="10s">10 seconds</option>
              <option value="15s">15 seconds</option>
              <option value="30s">30 seconds</option>
              <option value="1m">1 minute</option>
              <option value="2m">2 minutes</option>
              <option value="5m">5 minutes</option>
              <option value="10m">10 minutes</option>
              <option value="15m">15 minutes</option>
              <option value="30m">30 minutes</option>
              <option value="1h">1 hour</option>
              <option value="2h">2 hours</option>
              <option value="6h">6 hours</option>
            </select>
            <p className="text-xs text-[#b5bac1] mt-2">
              Members will be restricted to sending one message and creating one
              thread per this interval, unless they have Bypass Slowmode, Manage
              Channel, or Manage Messages permissions.{" "}
              <span className="text-[#00a8fc] cursor-pointer hover:underline">
                This will change on 24 February 2026.
              </span>
            </p>
          </div>

          <div className="h-px bg-[#3f4147] my-6" />

          {/* Age-Restricted Channel */}
          <div className="mb-6">
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative flex items-center mt-1">
                <input
                  type="checkbox"
                  checked={ageRestricted}
                  onChange={(e) => setAgeRestricted(e.target.checked)}
                  className="peer w-9 h-5 cursor-pointer appearance-none rounded-full bg-[#80848e] transition-colors checked:bg-[#23a559]"
                />
                <div className="absolute left-0.5 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-4" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-white group-hover:underline">
                  Age-Restricted Channel
                </div>
                <p className="text-xs text-[#b5bac1] mt-1">
                  Users will need to confirm they are of over the legal age to
                  view in the content in this channel. Age-restricted channels
                  are exempt from the explicit content filter.
                </p>
              </div>
            </label>
          </div>

          <div className="h-px bg-[#3f4147] my-6" />

          {/* Bitrate */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-bold uppercase text-[#b5bac1]">
                Bitrate
              </label>
              <span className="text-sm text-[#dbdee1] font-medium">
                {bitrate}kbps
              </span>
            </div>
            <input
              type="range"
              min="8"
              max="96"
              step="1"
              value={bitrate}
              onChange={(e) => setBitrate(Number(e.target.value))}
              className="w-full h-2 bg-[#1e1f22] rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #5865f2 0%, #5865f2 ${
                  ((bitrate - 8) / (96 - 8)) * 100
                }%, #1e1f22 ${
                  ((bitrate - 8) / (96 - 8)) * 100
                }%, #1e1f22 100%)`,
              }}
            />
            <div className="flex justify-between mt-2">
              <span className="text-xs text-[#949ba4]">8kbps</span>
              <span className="text-xs text-[#949ba4]">64kbps</span>
              <span className="text-xs text-[#949ba4]">96kbps</span>
            </div>
            <p className="text-xs text-[#f0b232] mt-2">
              ⚠ ALL THE BITS! Going above 64 kbps may adversely affect people on
              poor connections.
            </p>
          </div>

          <div className="h-px bg-[#3f4147] my-6" />

          {/* Video Quality */}
          <div className="mb-6">
            <label className="block text-xs font-bold uppercase text-[#b5bac1] mb-3">
              Video Quality
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center">
                  <input
                    type="radio"
                    name="videoQuality"
                    checked={videoQuality === "auto"}
                    onChange={() => setVideoQuality("auto")}
                    className="peer w-5 h-5 cursor-pointer appearance-none rounded-full border-2 border-[#80848e] transition-colors checked:border-[#5865f2] checked:border-[6px]"
                  />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-white group-hover:underline">
                    Auto
                  </div>
                  <p className="text-xs text-[#b5bac1] mt-0.5">
                    Adjust for optimal performance
                  </p>
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center">
                  <input
                    type="radio"
                    name="videoQuality"
                    checked={videoQuality === "720p"}
                    onChange={() => setVideoQuality("720p")}
                    className="peer w-5 h-5 cursor-pointer appearance-none rounded-full border-2 border-[#80848e] transition-colors checked:border-[#5865f2] checked:border-[6px]"
                  />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-white group-hover:underline">
                    720p
                  </div>
                  <p className="text-xs text-[#b5bac1] mt-0.5">
                    Crisp video at the expense of bandwidth
                  </p>
                </div>
              </label>
            </div>
          </div>

          <div className="h-px bg-[#3f4147] my-6" />

          {/* User Limit */}
          <div className="mb-6">
            <label className="block text-xs font-bold uppercase text-[#b5bac1] mb-2">
              User Limit
            </label>
            <input
              type="number"
              placeholder="No limit"
              className="w-full px-3 py-2.5 bg-[#1e1f22] text-[#dbdee1] placeholder-[#87888c] rounded outline-none focus:ring-1 focus:ring-[#00a8fc]"
            />
            <p className="text-xs text-[#b5bac1] mt-2">
              Users with permission to Move Members can still join when the
              limit is reached.
            </p>
          </div>
        </div>
      </div>

      {/* Close Button */}
      <div className="shrink-0 w-[60px] flex flex-col pt-[60px]">
        <button
          onClick={onClose}
          className="group flex flex-col items-center gap-1 text-[#949ba4] hover:text-[#dbdee1] fixed"
        >
          <div className="w-9 h-9 rounded-full border-2 border-[#949ba4] group-hover:border-[#dbdee1] flex items-center justify-center transition-colors bg-[#313338]">
            <X size={20} />
          </div>
          <span className="text-[11px] font-bold uppercase">Esc</span>
        </button>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          box-shadow: 0 0 0 4px #5865f2;
        }
        .slider::-moz-range-thumb {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          border: none;
          box-shadow: 0 0 0 4px #5865f2;
        }
      `}</style>
    </div>
  );
}

function SidebarItem({
  label,
  isActive = false,
}: {
  label: string;
  isActive?: boolean;
}) {
  return (
    <button
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
