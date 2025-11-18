"use client";

import React, { useState } from "react";
import { Upload } from "lucide-react";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

interface CreateServerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateServerModal({
  isOpen,
  onClose,
}: CreateServerModalProps) {
  const [serverName, setServerName] = useState("");
  const [serverIcon, setServerIcon] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Handle server creation
    console.log("Create server:", { serverName, serverIcon });

    setLoading(false);
    setServerName("");
    setServerIcon(null);
    onClose();
  };

  const handleIconUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setServerIcon(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Your Server"
      size="sm"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <p className="text-sm text-[#b5bac1] text-center">
          Give your server a personality with a name and icon. You can always
          change it later.
        </p>

        {/* Server Icon Upload */}
        <div className="flex flex-col items-center gap-4">
          <label
            htmlFor="server-icon"
            className="relative w-24 h-24 flex items-center justify-center bg-[#1e1f22] border-2 border-dashed border-[#3f4147] rounded-full cursor-pointer hover:border-[#4e5058] transition-colors group overflow-hidden"
          >
            {serverIcon ? (
              <img
                src={serverIcon}
                alt="Server icon"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center gap-1">
                <Upload size={24} className="text-[#b5bac1]" />
                <span className="text-xs text-[#87888c]">Upload</span>
              </div>
            )}
            <input
              id="server-icon"
              type="file"
              accept="image/*"
              onChange={handleIconUpload}
              className="hidden"
            />
          </label>
          <p className="text-xs text-[#87888c]">Recommended: 512x512</p>
        </div>

        {/* Server Name */}
        <Input
          label="Server Name"
          value={serverName}
          onChange={(e) => setServerName(e.target.value)}
          placeholder="My Awesome Server"
          required
        />

        <div className="flex justify-between items-center pt-2">
          <Button variant="ghost" onClick={onClose} disabled={loading}>
            Back
          </Button>
          <Button type="submit" loading={loading}>
            Create Server
          </Button>
        </div>
      </form>
    </Modal>
  );
}
