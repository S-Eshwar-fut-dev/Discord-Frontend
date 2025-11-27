"use client";

import React from "react";
import {
  ChevronRight,
  Upload,
  X,
  Gamepad2,
  GraduationCap,
  Coffee,
  Flag,
} from "lucide-react";
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
      showClose={false}
    >
      {/* Custom Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-[#949ba4] hover:text-[#dbdee1] transition-colors z-50"
      >
        <X size={24} />
      </button>

      <div className="text-center font-sans">
        {step === "start" ? (
          <>
            <h2 className="text-2xl font-bold text-white mb-2 mt-2">
              Create Your Server
            </h2>
            <p className="text-[#b5bac1] mb-6 px-4 text-[15px] leading-snug">
              Your server is where you and your friends hang out. Make yours and
              start talking.
            </p>

            <div className="space-y-2 mb-4 text-left px-1">
              <TemplateButton
                icon={
                  <img
                    src="/discord-logo-white.svg"
                    className="w-6 h-6"
                    alt=""
                  />
                } // Placeholder for custom icon
                label="Create My Own"
                onClick={() => setStep("customize")}
                color="bg-[url('/server1.png')] bg-cover" // Mocking the specific icon from screenshot
                isMain
              />

              <div className="text-xs font-bold text-[#949ba4] uppercase mt-4 mb-2 pl-1">
                Start from a template
              </div>

              <TemplateButton
                icon={<Gamepad2 size={20} />}
                label="Gaming"
                onClick={() => {
                  setServerName("Gaming Server");
                  setStep("customize");
                }}
              />
              <TemplateButton
                icon={<Coffee size={20} />}
                label="School Club"
                onClick={() => {
                  setServerName("School Club");
                  setStep("customize");
                }}
              />
              <TemplateButton
                icon={<GraduationCap size={20} />}
                label="Study Group"
                onClick={() => {
                  setServerName("Study Group");
                  setStep("customize");
                }}
              />
              <TemplateButton
                icon={<Flag size={20} />}
                label="Friends"
                onClick={() => {
                  setServerName("Friends Server");
                  setStep("customize");
                }}
              />
            </div>

            {/* Footer */}
            <div className="bg-[#2b2d31] p-4 -mx-6 -mb-4 mt-6 flex flex-col items-center border-t border-[#1e1f22]">
              <h3 className="text-xl font-bold text-white mb-2">
                Have an invite already?
              </h3>
              <Button
                variant="secondary"
                className="w-full bg-[#4e5058] hover:bg-[#6d6f78] text-white transition-colors"
                onClick={onClose}
              >
                Join a Server
              </Button>
            </div>
          </>
        ) : (
          <form
            onSubmit={handleCreate}
            className="animate-in fade-in slide-in-from-right-4 duration-200"
          >
            <h2 className="text-2xl font-bold text-white mb-2 mt-2">
              Customize Your Server
            </h2>
            <p className="text-[#b5bac1] mb-6 px-8 text-[15px] leading-snug">
              Give your new server a personality with a name and an icon. You
              can always change it later.
            </p>

            {/* Upload Area */}
            <div className="flex justify-center mb-8">
              <div className="relative group">
                <label
                  className={cn(
                    "flex items-center justify-center w-24 h-24 rounded-full border-2 border-dashed border-[#4e5058] cursor-pointer overflow-hidden transition-all bg-[#1e1f22]",
                    iconFile ? "border-none" : "hover:bg-[#1e1f22]/80"
                  )}
                >
                  {iconFile ? (
                    <img
                      src={URL.createObjectURL(iconFile.file)}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-1 text-[#b5bac1]">
                      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#5865f2] text-white mb-1">
                        <Upload size={16} />
                      </div>
                      <span className="text-xs font-bold uppercase">
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

                  {iconFile && (
                    <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <span className="text-xs text-white font-bold">
                        CHANGE
                      </span>
                    </div>
                  )}
                </label>
              </div>
            </div>

            <div className="text-left mb-8 px-1">
              <Input
                label="Server Name"
                value={serverName}
                onChange={(e) => setServerName(e.target.value)}
                placeholder="My Server"
                required
                className="bg-[#1e1f22] border-none"
              />
              <p className="text-[12px] text-[#949ba4] mt-2">
                By creating a server, you agree to Eoncord's{" "}
                <span className="text-[#00a8fc] hover:underline cursor-pointer">
                  Community Guidelines
                </span>
                .
              </p>
            </div>

            {/* Footer */}
            <div className="bg-[#2b2d31] p-4 -mx-6 -mb-4 mt-6 flex justify-between items-center border-t border-[#1e1f22]">
              <button
                type="button"
                onClick={() => setStep("start")}
                className="text-sm text-[#dbdee1] hover:underline font-medium px-2"
              >
                Back
              </button>
              <Button
                type="submit"
                loading={loading}
                disabled={!serverName}
                className="px-8 bg-[#5865f2] hover:bg-[#4752c4]"
              >
                Create
              </Button>
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
}

function TemplateButton({
  icon,
  label,
  onClick,
  color,
  isMain,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  color?: string;
  isMain?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center justify-between p-3 rounded-Ig border border-[#3f4147] hover:bg-[#35373c] transition-colors group bg-[#2b2d31]",
        "mb-2"
      )}
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center text-[#dbdee1]",
            isMain ? "bg-cover" : "bg-[#313338]",
            color
          )}
        >
          {!color && icon}
        </div>
        <span className="font-bold text-[#dbdee1] group-hover:text-white transition-colors">
          {label}
        </span>
      </div>
      <ChevronRight className="text-[#b5bac1] group-hover:text-[#dbdee1]" />
    </button>
  );
}
