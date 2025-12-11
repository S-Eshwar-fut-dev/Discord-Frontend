"use client";

import React from "react";
import { motion } from "framer-motion";
import { X, Sparkles, Check } from "lucide-react";
import Button from "@/components/ui/Button";

interface ServerBoostModalProps {
  isOpen: boolean;
  onClose: () => void;
  guildName?: string;
}

export default function ServerBoostModal({
  isOpen,
  onClose,
  guildName = "Eoncord HQ",
}: ServerBoostModalProps) {
  if (!isOpen) return null;

  const boostLevels = [
    {
      level: 1,
      boosts: 2,
      perks: [
        "50 Emoji Slots",
        "128 Kbps Audio Quality",
        "Animated Server Icon",
        "Custom Server Invite Background",
      ],
    },
    {
      level: 2,
      boosts: 7,
      perks: [
        "150 Emoji Slots",
        "256 Kbps Audio Quality",
        "Server Banner",
        "50 MB Upload Limit for All Members",
        "HD Video Streaming",
        "Custom Stickers",
        "Custom Role Icons",
      ],
    },
    {
      level: 3,
      boosts: 14,
      perks: [
        "250 Emoji Slots",
        "384 Kbps Audio Quality",
        "Animated Server Banner",
        "Custom Server Invite URL",
        "100 MB Upload Limit for All Members",
        "Premium-tier HD Video",
      ],
    },
  ];

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-5xl mx-4 bg-[#313338] rounded-lg shadow-2xl overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-[#b5bac1] hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <div className="relative bg-gradient-to-br from-[#593695] to-[#5865f2] p-8">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-8 h-8 text-[#faa81a]" />
            <h2 className="text-3xl font-bold text-white">Server Boost</h2>
          </div>
          <p className="text-white/90 text-lg">{guildName}</p>

          {/* Current Status */}
          <div className="mt-6 flex items-center gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3">
              <div className="text-white/70 text-xs font-semibold uppercase mb-1">
                Current Level
              </div>
              <div className="text-white text-2xl font-bold">0</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3">
              <div className="text-white/70 text-xs font-semibold uppercase mb-1">
                Boosts
              </div>
              <div className="text-white text-2xl font-bold">
                0<span className="text-lg font-normal"> / 2</span>
              </div>
            </div>
          </div>
        </div>

        {/* Boost Levels */}
        <div className="p-6 max-h-[60vh] overflow-y-auto custom-scroll">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {boostLevels.map((tier) => (
              <div
                key={tier.level}
                className="bg-[#2b2d31] rounded-lg p-5 border-2 border-[#3f4147] hover:border-[#5865f2] transition-colors"
              >
                {/* Level Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-bold text-white">
                    LEVEL {tier.level}
                  </div>
                  <div className="bg-[#5865f2] text-white text-xs font-bold px-2 py-1 rounded">
                    {tier.boosts} BOOSTS
                  </div>
                </div>

                {/* Perks List */}
                <div className="space-y-2 mb-6">
                  {tier.perks.map((perk, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#23a559] shrink-0 mt-0.5" />
                      <span className="text-sm text-[#dbdee1]">{perk}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Info Box */}
          <div className="mt-6 bg-[#2b2d31] rounded-lg p-4 border-l-4 border-[#5865f2]">
            <h3 className="text-white font-semibold mb-2">
              How do Server Boosts work?
            </h3>
            <p className="text-sm text-[#b5bac1] mb-3">
              Server Boosts help your favorite communities get access to awesome
              perks like better audio quality, more emoji slots, and much more.
              You get 2 Server Boosts with Nitro.
            </p>
            <Button className="bg-[#5865f2] hover:bg-[#4752c4]">
              Learn More
            </Button>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#2b2d31] p-4 flex items-center justify-between border-t border-[#1e1f22]">
          <div className="text-sm text-[#b5bac1]">
            Don't have Nitro?{" "}
            <a
              href="#"
              className="text-[#00a8fc] hover:underline font-semibold"
            >
              Subscribe to unlock boosts
            </a>
          </div>
          <Button
            onClick={onClose}
            variant="secondary"
            className="bg-[#4e5058] hover:bg-[#5d6069]"
          >
            Close
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
