"use client";

import React from "react";
import { Upload, ChevronRight, Camera } from "lucide-react";
import Modal from "@/components/modals/Modal";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useCreateServer } from "@/hooks/useCreateServer";
import { cn } from "@/lib/utils/cn";

interface CreateServerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateServerModal({
  isOpen,
  onClose,
}: CreateServerModalProps) {
  const {
    step,
    setStep,
    serverName,
    setServerName,
    iconFile,
    addFiles,
    loading,
    handleCreate,
  } = useCreateServer(onClose);

  const handleIconSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      addFiles([e.target.files[0]]);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title=""
      size="md"
      showClose={true}
    >
      <div className="text-center">
        {step === "start" ? (
          <>
            <h2 className="text-2xl font-bold text-white mb-2">
              Create Your Server
            </h2>
            <p className="text-[#b5bac1] mb-6 px-4">
              Your server is where you and your friends hang out. Make yours and
              start talking.
            </p>

            <div className="space-y-2 mb-4 text-left">
              <button
                onClick={() => setStep("customize")}
                className="w-full flex items-center justify-between p-4 rounded-lg border border-[#3f4147] hover:bg-[#35373c] transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <img
                    src="/server1.png"
                    alt="Create"
                    className="w-10 h-10 object-cover rounded"
                  />
                  <span className="font-bold text-[#dbdee1]">
                    Create My Own
                  </span>
                </div>
                <ChevronRight className="text-[#b5bac1]" />
              </button>

              <div className="text-xs font-bold text-[#949ba4] uppercase mt-4 mb-2">
                Start from a template
              </div>

              {["Gaming", "School Club", "Study Group"].map((label) => (
                <button
                  key={label}
                  onClick={() => {
                    setServerName(`${label} Server`);
                    setStep("customize");
                  }}
                  className="w-full flex items-center justify-between p-4 rounded-lg border border-[#3f4147] hover:bg-[#35373c] transition-colors"
                >
                  <span className="font-bold text-[#dbdee1]">{label}</span>
                  <ChevronRight className="text-[#b5bac1]" />
                </button>
              ))}
            </div>

            <div className="bg-[#2b2d31] p-4 -mx-6 -mb-4 mt-6">
              <div className="text-center">
                <h3 className="text-xl font-bold text-white mb-2">
                  Have an invite already?
                </h3>
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={onClose}
                >
                  Join a Server
                </Button>
              </div>
            </div>
          </>
        ) : (
          <form onSubmit={handleCreate}>
            <h2 className="text-2xl font-bold text-white mb-2">
              Customize Your Server
            </h2>
            <p className="text-[#b5bac1] mb-6 px-4">
              Give your new server a personality with a name and an icon. You
              can always change it later.
            </p>

            {/* Upload Area */}
            <div className="flex justify-center mb-6">
              <div className="relative group">
                <label
                  className={cn(
                    "flex items-center justify-center w-24 h-24 rounded-full border-2 border-dashed border-[#4e5058] cursor-pointer overflow-hidden transition-all",
                    iconFile ? "border-none" : "hover:bg-[#2b2d31]"
                  )}
                >
                  {iconFile ? (
                    <img
                      src={URL.createObjectURL(iconFile.file)}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-1">
                      <Camera className="text-[#b5bac1]" size={24} />
                      <span className="text-xs font-bold text-[#b5bac1] uppercase">
                        Upload
                      </span>
                    </div>
                  )}
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleIconSelect}
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <span className="text-xs text-white font-bold">CHANGE</span>
                  </div>
                </label>
              </div>
            </div>

            <div className="text-left mb-8">
              <Input
                label="Server Name"
                value={serverName}
                onChange={(e) => setServerName(e.target.value)}
                placeholder="My Server"
                required
              />
              <p className="text-xs text-[#949ba4] mt-2">
                By creating a server, you agree to Eoncord's Community
                Guidelines.
              </p>
            </div>

            <div className="bg-[#2b2d31] p-4 -mx-6 -mb-4 mt-6 flex justify-between items-center">
              <button
                type="button"
                onClick={() => setStep("start")}
                className="text-sm text-[#dbdee1] hover:underline font-medium"
              >
                Back
              </button>
              <Button type="submit" loading={loading} disabled={!serverName}>
                Create
              </Button>
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
}
