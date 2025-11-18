"use client";

import React, { useState } from "react";
import {
  User,
  Bell,
  Shield,
  Palette,
  Key,
  Activity,
  LogOut,
  X,
} from "lucide-react";
import { cn } from "@/lib/cn";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Avatar from "@/components/ui/Avatar";

interface SettingsTab {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const tabs: SettingsTab[] = [
  { id: "account", label: "My Account", icon: <User size={18} /> },
  { id: "notifications", label: "Notifications", icon: <Bell size={18} /> },
  { id: "privacy", label: "Privacy & Safety", icon: <Shield size={18} /> },
  { id: "appearance", label: "Appearance", icon: <Palette size={18} /> },
  { id: "security", label: "Security", icon: <Key size={18} /> },
  { id: "activity", label: "Activity", icon: <Activity size={18} /> },
];

interface UserSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UserSettingsModal({
  isOpen,
  onClose,
}: UserSettingsModalProps) {
  const [activeTab, setActiveTab] = useState("account");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex bg-[#313338]">
      {/* Sidebar */}
      <div className="w-64 bg-[#2b2d31] flex flex-col">
        <div className="flex-1 overflow-y-auto custom-scroll p-4">
          <h2 className="text-xs font-semibold uppercase text-[#949ba4] mb-2 px-2">
            User Settings
          </h2>
          <nav className="space-y-0.5">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded text-left transition-colors",
                  activeTab === tab.id
                    ? "bg-[#404249] text-white"
                    : "text-[#b5bac1] hover:bg-[#35373c] hover:text-[#dbdee1]"
                )}
              >
                {tab.icon}
                <span className="text-sm font-medium">{tab.label}</span>
              </button>
            ))}
          </nav>

          <div className="my-3 border-t border-[#3f4147]" />

          <button className="w-full flex items-center gap-3 px-3 py-2 rounded text-left text-red-400 hover:bg-[#35373c] transition-colors">
            <LogOut size={18} />
            <span className="text-sm font-medium">Log Out</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="h-14 flex items-center justify-between px-6 border-b border-[#26272b]">
          <h1 className="text-xl font-semibold text-white">
            {tabs.find((t) => t.id === activeTab)?.label}
          </h1>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#35373c] transition-colors"
          >
            <X size={20} className="text-[#b5bac1]" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto custom-scroll p-6">
          {activeTab === "account" && <AccountSettings />}
          {activeTab === "notifications" && <NotificationSettings />}
          {activeTab === "privacy" && <PrivacySettings />}
          {activeTab === "appearance" && <AppearanceSettings />}
          {activeTab === "security" && <SecuritySettings />}
          {activeTab === "activity" && <ActivitySettings />}
        </div>
      </div>
    </div>
  );
}

function AccountSettings() {
  return (
    <div className="max-w-2xl space-y-6">
      {/* Profile */}
      <div className="bg-[#2b2d31] rounded-lg p-6">
        <h3 className="text-sm font-semibold uppercase text-[#b5bac1] mb-4">
          Profile
        </h3>

        <div className="flex items-start gap-6">
          <Avatar
            src="/avatars/1.png"
            alt="User"
            size={80}
            status="online"
            fallback="E"
          />
          <div className="flex-1 space-y-4">
            <Input label="Username" defaultValue="Eshwar" />
            <Input label="Display Name" defaultValue="Eshwar S" />
            <Input
              label="Email"
              defaultValue="eshwar@example.com"
              type="email"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button>Save Changes</Button>
        </div>
      </div>

      {/* Password */}
      <div className="bg-[#2b2d31] rounded-lg p-6">
        <h3 className="text-sm font-semibold uppercase text-[#b5bac1] mb-4">
          Password
        </h3>
        <Button variant="secondary">Change Password</Button>
      </div>
    </div>
  );
}

function NotificationSettings() {
  return (
    <div className="max-w-2xl space-y-6">
      <div className="bg-[#2b2d31] rounded-lg p-6">
        <h3 className="text-sm font-semibold uppercase text-[#b5bac1] mb-4">
          Notification Settings
        </h3>
        <p className="text-sm text-[#b5bac1]">
          Configure how you receive notifications...
        </p>
      </div>
    </div>
  );
}

function PrivacySettings() {
  return (
    <div className="max-w-2xl space-y-6">
      <div className="bg-[#2b2d31] rounded-lg p-6">
        <h3 className="text-sm font-semibold uppercase text-[#b5bac1] mb-4">
          Privacy & Safety
        </h3>
        <p className="text-sm text-[#b5bac1]">
          Manage your privacy and safety settings...
        </p>
      </div>
    </div>
  );
}

function AppearanceSettings() {
  return (
    <div className="max-w-2xl space-y-6">
      <div className="bg-[#2b2d31] rounded-lg p-6">
        <h3 className="text-sm font-semibold uppercase text-[#b5bac1] mb-4">
          Appearance
        </h3>
        <p className="text-sm text-[#b5bac1]">
          Customize how Eoncord looks on your device...
        </p>
      </div>
    </div>
  );
}

function SecuritySettings() {
  return (
    <div className="max-w-2xl space-y-6">
      <div className="bg-[#2b2d31] rounded-lg p-6">
        <h3 className="text-sm font-semibold uppercase text-[#b5bac1] mb-4">
          Two-Factor Authentication
        </h3>
        <p className="text-sm text-[#b5bac1] mb-4">
          Protect your account with an extra layer of security.
        </p>
        <Button>Enable 2FA</Button>
      </div>
    </div>
  );
}

function ActivitySettings() {
  return (
    <div className="max-w-2xl space-y-6">
      <div className="bg-[#2b2d31] rounded-lg p-6">
        <h3 className="text-sm font-semibold uppercase text-[#b5bac1] mb-4">
          Activity Status
        </h3>
        <p className="text-sm text-[#b5bac1]">
          Control what others see about your activity...
        </p>
      </div>
    </div>
  );
}
