"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Check, AtSign, MessageSquare } from "lucide-react";
import { useNotificationStore, type Notification } from "@/store/notifications";
import Avatar from "@/components/ui/Avatar";
import { formatFullTimestamp } from "@/lib/time";
import { cn } from "@/lib/utils/cn";

interface InboxPopoverProps {
  onClose: () => void;
}

export default function InboxPopover({ onClose }: InboxPopoverProps) {
  const { notifications, markAsRead, markAllAsRead } = useNotificationStore();
  const [activeTab, setActiveTab] = useState<"mentions" | "unread">("mentions");

  const unreadNotifications = notifications.filter((n) => !n.read);
  const displayedNotifications =
    activeTab === "mentions" ? notifications : unreadNotifications;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.1 }}
      className="absolute top-12 right-4 w-[480px] max-h-[600px] bg-[#2b2d31] rounded-lg shadow-2xl border border-[#1e1f22] flex flex-col z-50 overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#1e1f22] border-b border-[#111214]">
        <div className="flex items-center gap-2">
          <Mail size={20} className="text-white" />
          <h3 className="font-bold text-white">Inbox</h3>
        </div>
        <div className="flex gap-4 text-xs font-medium">
          <button
            onClick={() => setActiveTab("mentions")}
            className={cn(
              "px-2 py-1 rounded transition-colors",
              activeTab === "mentions"
                ? "bg-[#404249] text-white"
                : "text-[#b5bac1] hover:text-[#dbdee1]"
            )}
          >
            Mentions
          </button>
          <button
            onClick={() => setActiveTab("unread")}
            className={cn(
              "px-2 py-1 rounded transition-colors",
              activeTab === "unread"
                ? "bg-[#404249] text-white"
                : "text-[#b5bac1] hover:text-[#dbdee1]"
            )}
          >
            Unread
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#2b2d31] border-b border-[#1f2023]">
        <span className="text-xs text-[#949ba4] uppercase font-bold">
          {activeTab === "mentions" ? "Recent Mentions" : "Unread Messages"}
        </span>
        <button
          onClick={markAllAsRead}
          className="flex items-center gap-1 text-xs text-[#b5bac1] hover:text-white transition-colors"
        >
          <Check size={14} />
          Mark all read
        </button>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto custom-scroll p-2 space-y-2">
        {displayedNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-[#949ba4]">
            <div className="w-16 h-16 bg-[#313338] rounded-full flex items-center justify-center mb-4">
              <Mail size={32} />
            </div>
            <p>You're all caught up!</p>
          </div>
        ) : (
          displayedNotifications.map((notif) => (
            <NotificationItem
              key={notif.id}
              notification={notif}
              onRead={() => markAsRead(notif.id)}
            />
          ))
        )}
      </div>
    </motion.div>
  );
}

function NotificationItem({
  notification,
  onRead,
}: {
  notification: Notification;
  onRead: () => void;
}) {
  return (
    <div
      className={cn(
        "group relative flex gap-3 p-3 rounded hover:bg-[#313338] transition-colors cursor-pointer border border-transparent hover:border-[#3f4147]",
        !notification.read && "bg-[#313338]/50"
      )}
      onClick={onRead}
    >
      {/* Icon Type */}
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
        {!notification.read && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRead();
            }}
            className="p-1 bg-[#232428] rounded-full hover:text-green-400"
            title="Mark as read"
          >
            <Check size={12} />
          </button>
        )}
      </div>

      <div className="flex-shrink-0 mt-1">
        <Avatar
          src={notification.author.avatar}
          alt={notification.author.username}
          size={32}
        />
      </div>

      <div className="flex-1 min-w-0">
        {/* Header */}
        <div className="flex items-center gap-1.5 mb-1">
          <span className="text-sm font-semibold text-white">
            {notification.author.username}
          </span>
          <span className="text-xs text-[#949ba4]">
            {formatFullTimestamp(notification.timestamp)}
          </span>
          {notification.guildName && (
            <span className="text-[10px] text-[#949ba4] px-1 bg-[#1e1f22] rounded">
              {notification.guildName}
            </span>
          )}
        </div>

        {/* Context */}
        <div className="flex items-center gap-1.5 mb-1 text-xs text-[#949ba4]">
          {notification.type === "reply" ? (
            <MessageSquare size={12} />
          ) : (
            <AtSign size={12} />
          )}
          <span>
            mentioned you in{" "}
            <span className="text-[#dbdee1] font-medium">
              #{notification.channelName}
            </span>
          </span>
        </div>

        {/* Content Preview */}
        <p className="text-sm text-[#dbdee1] opacity-90 line-clamp-3">
          {notification.content}
        </p>
      </div>
    </div>
  );
}
