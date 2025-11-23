"use client";

import React, { useState } from "react";
import { Hash, Volume2 } from "lucide-react";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";

interface CreateChannelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: { name: string; type: "text" | "voice" }) => void;
}

export default function CreateChannelModal({
  isOpen,
  onClose,
  onSubmit,
}: CreateChannelModalProps) {
  const [name, setName] = useState("");
  const [type, setType] = useState<"text" | "voice">("text");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 500));

    onSubmit?.({ name, type });
    setLoading(false);
    setName("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Channel" size="sm">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Channel Type */}
        <div>
          <label className="block text-xs font-semibold uppercase text-[#b5bac1] mb-3">
            Channel Type
          </label>
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => setType("text")}
              className={cn(
                "w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-colors text-left",
                type === "text"
                  ? "border-[#00a8fc] bg-[#00a8fc]/10"
                  : "border-[#3f4147] hover:border-[#4e5058]"
              )}
            >
              <Hash size={24} className="text-[#b5bac1]" />
              <div>
                <div className="text-sm font-semibold text-white">
                  Text Channel
                </div>
                <div className="text-xs text-[#87888c]">
                  Send messages, images, GIFs, emoji, and more
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setType("voice")}
              className={cn(
                "w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-colors text-left",
                type === "voice"
                  ? "border-[#00a8fc] bg-[#00a8fc]/10"
                  : "border-[#3f4147] hover:border-[#4e5058]"
              )}
            >
              <Volume2 size={24} className="text-[#b5bac1]" />
              <div>
                <div className="text-sm font-semibold text-white">
                  Voice Channel
                </div>
                <div className="text-xs text-[#87888c]">
                  Hang out together with voice and video
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Channel Name */}
        <Input
          label="Channel Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="new-channel"
          required
        />

        <div className="flex justify-end gap-3 pt-2">
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" loading={loading}>
            Create Channel
          </Button>
        </div>
      </form>
    </Modal>
  );
}
