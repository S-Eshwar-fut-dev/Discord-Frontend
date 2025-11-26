"use client";

import React, { useState, useEffect } from "react";
import {
  User,
  Bell,
  Shield,
  Palette,
  Key,
  Activity,
  LogOut,
  X,
  Laptop,
  Gift,
  CreditCard,
  Globe,
  Monitor,
  Check,
  MoreHorizontal,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Avatar from "@/components/ui/Avatar";
import { useSessionStore } from "@/store/session";

interface UserSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UserSettingsModal({
  isOpen,
  onClose,
}: UserSettingsModalProps) {
  const [activeTab, setActiveTab] = useState("account");
  const { user } = useSessionStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex bg-[#313338] animate-in fade-in duration-200 font-sans">
      {/* 1. Left Sidebar */}
      <div className="w-[218px] shrink-0 bg-[#2b2d31] flex flex-col items-end py-[60px] px-2 overflow-y-auto custom-scroll">
        <div className="w-[190px] space-y-0.5 pb-4">
          <div className="px-2.5 pb-1.5 text-xs font-bold text-[#949ba4] uppercase mb-1">
            User Settings
          </div>
          <SidebarItem
            id="account"
            label="My Account"
            active={activeTab}
            onClick={setActiveTab}
          />
          <SidebarItem
            id="profiles"
            label="Profiles"
            active={activeTab}
            onClick={setActiveTab}
          />
          <SidebarItem
            id="privacy"
            label="Privacy & Safety"
            active={activeTab}
            onClick={setActiveTab}
          />
          <SidebarItem
            id="authorized"
            label="Authorized Apps"
            active={activeTab}
            onClick={setActiveTab}
          />
          <SidebarItem
            id="devices"
            label="Devices"
            active={activeTab}
            onClick={setActiveTab}
          />
          <SidebarItem
            id="connections"
            label="Connections"
            active={activeTab}
            onClick={setActiveTab}
          />
          <SidebarItem
            id="friend-requests"
            label="Friend Requests"
            active={activeTab}
            onClick={setActiveTab}
          />

          <div className="h-px bg-[#3f4147] my-2 mx-2" />

          <div className="px-2.5 pb-1.5 text-xs font-bold text-[#949ba4] uppercase mb-1">
            Billing Settings
          </div>
          <SidebarItem
            id="nitro"
            label="Nitro"
            active={activeTab}
            onClick={setActiveTab}
          />
          <SidebarItem
            id="boost"
            label="Server Boost"
            active={activeTab}
            onClick={setActiveTab}
          />
          <SidebarItem
            id="subs"
            label="Subscriptions"
            active={activeTab}
            onClick={setActiveTab}
          />
          <SidebarItem
            id="billing"
            label="Billing"
            active={activeTab}
            onClick={setActiveTab}
          />

          <div className="h-px bg-[#3f4147] my-2 mx-2" />

          <div className="px-2.5 pb-1.5 text-xs font-bold text-[#949ba4] uppercase mb-1">
            App Settings
          </div>
          <SidebarItem
            id="appearance"
            label="Appearance"
            active={activeTab}
            onClick={setActiveTab}
          />
          <SidebarItem
            id="accessibility"
            label="Accessibility"
            active={activeTab}
            onClick={setActiveTab}
          />
          <SidebarItem
            id="voice"
            label="Voice & Video"
            active={activeTab}
            onClick={setActiveTab}
          />
          <SidebarItem
            id="chat"
            label="Text & Images"
            active={activeTab}
            onClick={setActiveTab}
          />
          <SidebarItem
            id="notifications"
            label="Notifications"
            active={activeTab}
            onClick={setActiveTab}
          />
          <SidebarItem
            id="keybinds"
            label="Keybinds"
            active={activeTab}
            onClick={setActiveTab}
          />
          <SidebarItem
            id="language"
            label="Language"
            active={activeTab}
            onClick={setActiveTab}
          />
          <SidebarItem
            id="streamer"
            label="Streamer Mode"
            active={activeTab}
            onClick={setActiveTab}
          />
          <SidebarItem
            id="advanced"
            label="Advanced"
            active={activeTab}
            onClick={setActiveTab}
          />

          <div className="h-px bg-[#3f4147] my-2 mx-2" />

          <div className="px-2.5 pb-1.5 text-xs font-bold text-[#949ba4] uppercase mb-1">
            Activity Settings
          </div>
          <SidebarItem
            id="status"
            label="Activity Status"
            active={activeTab}
            onClick={setActiveTab}
          />

          <div className="h-px bg-[#3f4147] my-2 mx-2" />

          <button className="w-full flex items-center justify-between px-2.5 py-1.5 rounded text-[#949ba4] hover:bg-[#35373c] hover:text-[#dbdee1] transition-colors group text-left">
            <span className="text-sm font-medium">Log Out</span>
            <LogOut size={16} />
          </button>
        </div>
      </div>

      {/* 2. Main Content */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#313338]">
        <div className="flex-1 max-w-[740px] min-w-[460px] py-[60px] px-10 overflow-y-auto custom-scroll">
          {activeTab === "account" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-200">
              <h2 className="text-xl font-bold text-white mb-6">My Account</h2>

              {/* Profile Card */}
              <div className="bg-[#1e1f22] rounded-lg overflow-hidden">
                {/* Banner */}
                <div className="h-[100px] bg-[#5865f2]" />

                <div className="px-4 pb-4 relative">
                  {/* Avatar */}
                  <div className="absolute -top-10 left-4 p-1.5 bg-[#1e1f22] rounded-full">
                    <Avatar
                      src={user?.avatar}
                      alt={user?.username}
                      size={80}
                      status="online"
                    />
                    <div
                      className="absolute bottom-0 right-0 bg-[#f23f43] rounded-full p-1 border-4 border-[#1e1f22]"
                      title="Edit Status"
                    >
                      <div className="w-3 h-3 bg-white rounded-full" />
                    </div>
                  </div>

                  <div className="flex justify-between items-end mt-2 mb-5 pl-[100px]">
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {user?.username}
                      </h3>
                      <p className="text-sm text-[#b5bac1]">
                        #{user?.discriminator || "0000"}
                      </p>
                    </div>
                    <Button size="sm">Edit User Profile</Button>
                  </div>

                  {/* Info Fields */}
                  <div className="bg-[#2b2d31] rounded-lg p-4 space-y-4">
                    <AccountField
                      label="Display Name"
                      value={user?.username || "Eshwar S"}
                    />
                    <AccountField
                      label="Username"
                      value={user?.username || "eshwar"}
                    />
                    <AccountField
                      label="Email"
                      value="eshwar@example.com"
                      isHidden
                    />
                    <AccountField
                      label="Phone Number"
                      value="+91 **********89"
                      isHidden
                    />
                  </div>
                </div>
              </div>

              <div className="h-px bg-[#3f4147]" />

              {/* Password & Auth */}
              <div>
                <h3 className="text-lg font-bold text-white mb-4">
                  Password and Authentication
                </h3>
                <Button size="sm" className="bg-[#5865f2] mb-4">
                  Change Password
                </Button>

                <div className="space-y-4">
                  <div className="flex flex-col gap-1">
                    <h4 className="text-xs font-bold text-[#b5bac1] uppercase">
                      Two-Factor Authentication
                    </h4>
                    <p className="text-sm text-[#b5bac1]">
                      Protect your Discord account with an extra layer of
                      security. Once configured, you'll be required to enter
                      both your password and an authentication code from your
                      mobile phone in order to sign in.
                    </p>
                  </div>
                  <Button
                    size="sm"
                    className="bg-[#2b2d31] text-white hover:bg-[#35373c]"
                  >
                    Enable Two-Factor Auth
                  </Button>
                </div>
              </div>

              <div className="h-px bg-[#3f4147]" />

              {/* Removal */}
              <div>
                <h3 className="text-xs font-bold text-[#b5bac1] uppercase mb-2">
                  Account Removal
                </h3>
                <p className="text-sm text-[#b5bac1] mb-4">
                  Disabling your account means you can recover it at any time
                  after taking this action.
                </p>
                <div className="flex gap-4">
                  <Button size="sm" className="bg-[#da373c] hover:bg-[#a12828]">
                    Delete Account
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="border border-[#da373c] text-[#da373c] hover:bg-[#da373c]/10"
                  >
                    Disable Account
                  </Button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "appearance" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-200">
              <h2 className="text-xl font-bold text-white mb-6">Appearance</h2>

              <div>
                <h3 className="text-xs font-bold text-[#b5bac1] uppercase mb-3">
                  Theme
                </h3>
                <div className="flex gap-4">
                  <ThemeOption label="Dark" color="bg-[#2b2d31]" active />
                  <ThemeOption label="Light" color="bg-[#ffffff]" />
                  <ThemeOption
                    label="Sync with computer"
                    color="bg-[#2b2d31]"
                  />
                </div>
              </div>

              <div className="h-px bg-[#3f4147]" />

              <div>
                <h3 className="text-xs font-bold text-[#b5bac1] uppercase mb-3">
                  Message Display
                </h3>
                <div className="bg-[#2b2d31] rounded-lg p-4 space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      <Avatar src="/avatars/1.png" size={40} />
                    </div>
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-white font-medium">Cozy</span>
                        <span className="text-xs text-[#949ba4]">
                          Today at 12:42 PM
                        </span>
                      </div>
                      <p className="text-[#dbdee1]">
                        Modern, beautiful, and easy on the eyes.
                      </p>
                    </div>
                  </div>
                  <div className="h-px bg-[#3f4147]" />
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs text-[#949ba4] w-[50px] text-right">
                      12:42 PM
                    </span>
                    <span className="text-white font-medium">Compact</span>
                    <span className="text-[#dbdee1]">
                      Fits more messages on screen at one time. #IRC
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Placeholder for other tabs */}
          {activeTab !== "account" && activeTab !== "appearance" && (
            <div className="flex flex-col items-center justify-center h-full text-[#b5bac1] animate-in fade-in">
              <div className="w-64 h-64 bg-[url('https://discord.com/assets/e9baf4b505eb54129f832556ea16538e.svg')] bg-contain bg-no-repeat opacity-10 mb-4" />
              <h3 className="text-lg font-bold text-white">
                Under Construction
              </h3>
              <p>This section is not implemented yet.</p>
            </div>
          )}
        </div>
      </div>

      {/* 3. Close Button Column */}
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

// --- Subcomponents ---

function SidebarItem({
  id,
  label,
  active,
  onClick,
}: {
  id: string;
  label: string;
  active: string;
  onClick: (id: string) => void;
}) {
  return (
    <button
      onClick={() => onClick(id)}
      className={cn(
        "w-full text-left px-2.5 py-1.5 rounded-sm text-[15px] font-medium transition-colors mb-0.5",
        active === id
          ? "bg-[#404249] text-white"
          : "text-[#b5bac1] hover:bg-[#35373c] hover:text-[#dbdee1]"
      )}
    >
      {label}
    </button>
  );
}

function AccountField({
  label,
  value,
  isHidden,
}: {
  label: string;
  value: string;
  isHidden?: boolean;
}) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <div className="text-xs font-bold text-[#b5bac1] uppercase mb-1">
          {label}
        </div>
        <div className="text-white">{isHidden ? "********" : value}</div>
      </div>
      <Button size="sm" variant="secondary">
        Edit
      </Button>
    </div>
  );
}

function ThemeOption({
  label,
  color,
  active,
}: {
  label: string;
  color: string;
  active?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2 cursor-pointer">
      <div
        className={cn(
          "w-32 h-24 rounded-lg border-4 flex items-center justify-center relative overflow-hidden",
          active ? "border-[#5865f2]" : "border-[#2b2d31]"
        )}
      >
        <div className={cn("w-full h-full", color)} />
        {active && (
          <div className="absolute top-1 right-1 bg-[#5865f2] rounded-full p-0.5 border-2 border-[#2b2d31]">
            <Check size={12} className="text-white" />
          </div>
        )}
      </div>
      <span className="text-sm text-[#b5bac1] font-medium ml-1">{label}</span>
    </div>
  );
}
