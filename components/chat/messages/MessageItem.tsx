"use client";

import React, { useState, useMemo, useCallback } from "react";
import {
  MoreHorizontal,
  Reply,
  SmilePlus,
  Trash2,
  Edit3,
  AlertCircle,
  Pin,
  Copy,
  MessageSquare,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Avatar from "../../ui/Avatar";
import MessageEditor from "./MessageEditor";
import DeleteMessageModal from "../../overlays/DeleteMessageModal";
import { formatTimestamp, formatFullTimestamp } from "@/lib/time";
import { cn } from "@/lib/utils/cn";
import type { ChatMessage } from "@/types/chat";
import ReactionPicker from "../reactions/ReactionPicker";
import ReactionBar from "../reactions/ReactionBar";
import { useReactionsStore } from "@/store/reactions";
import { useThreads } from "@/hooks/useThreads";

export interface MessageItemProps {
  message: ChatMessage;
  isFirstInGroup?: boolean;
  showTimestamp?: boolean;
  currentUserId?: string;
  onReply?: (message: ChatMessage) => void;
  onEdit?: (messageId: string, content: string) => Promise<void>;
  onDelete?: (messageId: string) => Promise<void>;
  onPin?: (message: ChatMessage) => void;
  compact?: boolean;
}

/**
 * Discord-style message with edit/delete functionality
 */
export default React.memo(function MessageItem({
  message,
  isFirstInGroup = true,
  showTimestamp = true,
  currentUserId = "u1",
  onReply,
  onEdit,
  onDelete,
  onPin,
  compact = false,
}: MessageItemProps) {
  const [showActions, setShowActions] = useState(false);
  const [showReactionPicker, setShowReactionPicker] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { openThread } = useThreads();

  const { getReactions, addReaction, removeReaction } = useReactionsStore();
  const reactions = getReactions(message.id);

  const timeLabel = useMemo(
    () => formatTimestamp(message.createdAt),
    [message.createdAt]
  );

  const fullTimestamp = useMemo(
    () => formatFullTimestamp(message.createdAt),
    [message.createdAt]
  );

  const isOptimistic = message.temp || message.optimistic;
  const isSending = message.sending;
  const isFailed = message.failed;
  const isEdited = !!message.editedAt;
  const isOwnMessage = message.author.id === currentUserId;

  // Handle double-click to edit
  const handleDoubleClick = useCallback(() => {
    if (isOwnMessage && onEdit && !isEditing) {
      setIsEditing(true);
    }
  }, [isOwnMessage, onEdit, isEditing]);

  // Save edited message
  const handleSaveEdit = useCallback(
    async (content: string) => {
      if (onEdit) {
        await onEdit(message.id, content);
        setIsEditing(false);
      }
    },
    [message.id, onEdit]
  );

  // Cancel editing
  const handleCancelEdit = useCallback(() => {
    setIsEditing(false);
  }, []);

  // Delete message
  const handleDeleteConfirm = useCallback(async () => {
    if (onDelete) {
      await onDelete(message.id);
    }
  }, [message.id, onDelete]);

  const handleReactionClick = useCallback(
    (emoji: string) => {
      const reaction = reactions.find((r) => r.emoji === emoji);
      if (reaction?.me) {
        removeReaction(message.id, emoji, currentUserId);
      } else {
        addReaction(message.id, emoji, currentUserId);
      }
    },
    [reactions, message.id, currentUserId, addReaction, removeReaction]
  );

  const handleEmojiSelect = useCallback(
    (emoji: string) => {
      addReaction(message.id, emoji, currentUserId);
      setShowReactionPicker(false);
    },
    [message.id, currentUserId, addReaction]
  );

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(message.content);
  }, [message.content]);

  const imageAttachments = useMemo(() => {
    return (
      message.attachments?.filter((att) =>
        /\.(jpe?g|png|webp|gif)$/i.test(att.url)
      ) || []
    );
  }, [message.attachments]);

  const fileAttachments = useMemo(() => {
    return (
      message.attachments?.filter(
        (att) => !/\.(jpe?g|png|webp|gif)$/i.test(att.url)
      ) || []
    );
  }, [message.attachments]);

  return (
    <>
      <motion.div
        initial={isOptimistic ? { opacity: 0, y: 10 } : false}
        animate={{ opacity: isOptimistic ? 0.6 : 1, y: 0 }}
        className={cn(
          "group relative px-4 hover:bg-[#2e3035] transition-colors",
          isFirstInGroup ? "mt-4 pt-0.5" : "mt-0.5",
          isFailed && "opacity-50",
          isEditing && "bg-[#2e3035]"
        )}
        onMouseEnter={() => !isOptimistic && !isEditing && setShowActions(true)}
        onMouseLeave={() => {
          setShowActions(false);
          setShowMoreMenu(false);
        }}
      >
        <div className="flex items-start gap-4 py-0.5">
          {/* Avatar */}
          <div className="shrink-0 w-10 mt-0.5">
            {isFirstInGroup ? (
              <Avatar
                src={message.author.avatar}
                alt={message.author.username}
                size={40}
                status={message.author.status}
                fallback={message.author.username}
              />
            ) : (
              <span
                className={cn(
                  "text-[10px] text-[#949ba4] opacity-0 group-hover:opacity-100 transition-opacity text-right block w-full pr-1 leading-[22px] select-none",
                  compact && "hidden"
                )}
                title={fullTimestamp}
              >
                {timeLabel}
              </span>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Header */}
            {isFirstInGroup && (
              <div className="flex items-baseline gap-2 mb-0.5">
                <button className="text-sm font-semibold text-white hover:underline">
                  {message.author.username}
                </button>

                <time
                  className="text-xs text-[#949ba4]"
                  dateTime={message.createdAt}
                  title={fullTimestamp}
                >
                  {timeLabel}
                </time>

                {isSending && (
                  <span className="text-xs text-[#87888c] italic">
                    (sending...)
                  </span>
                )}
                {isFailed && (
                  <span className="flex items-center gap-1 text-xs text-[#f23f43]">
                    <AlertCircle size={12} />
                    Failed to send
                  </span>
                )}
              </div>
            )}

            {/* Message content or editor */}
            {isEditing ? (
              <MessageEditor
                initialContent={message.content}
                onSave={handleSaveEdit}
                onCancel={handleCancelEdit}
              />
            ) : (
              <>
                <div
                  className="text-[15px] leading-5.5 text-[#dbdee1] wrap-break-word whitespace-pre-wrap"
                  onDoubleClick={handleDoubleClick}
                >
                  {message.content}
                  {isEdited && (
                    <span
                      className="ml-1 text-[10px] text-[#949ba4] cursor-help"
                      title={`Edited ${formatFullTimestamp(message.editedAt!)}`}
                    >
                      (edited)
                    </span>
                  )}
                </div>

                {/* Attachments */}
                {imageAttachments.length > 0 && (
                  <div className="mt-2 flex flex-col gap-2">
                    {imageAttachments.map((attachment, idx) => (
                      <a
                        key={idx}
                        href={attachment.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block max-w-[400px] rounded-md overflow-hidden border border-[#3f4147] hover:border-[#4e5058] transition-colors"
                      >
                        <img
                          src={attachment.url}
                          alt={attachment.filename || "attachment"}
                          className="w-full h-auto max-h-[350px] object-contain"
                          loading="lazy"
                        />
                      </a>
                    ))}
                  </div>
                )}

                {fileAttachments.length > 0 && (
                  <div className="mt-2 flex flex-col gap-2">
                    {fileAttachments.map((attachment, idx) => (
                      <a
                        key={idx}
                        href={attachment.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-2 max-w-[400px] bg-[#2b2d31] border border-[#3f4147] rounded hover:bg-[#32353b] transition-colors"
                      >
                        <div className="text-[#b5bac1]">📎</div>
                        <span className="text-sm text-[#00a8fc] hover:underline truncate">
                          {attachment.filename || "Download"}
                        </span>
                      </a>
                    ))}
                  </div>
                )}

                {/* Reactions */}
                {reactions.length > 0 && (
                  <ReactionBar
                    reactions={reactions}
                    onReactionClick={handleReactionClick}
                    onAddClick={() => setShowReactionPicker(true)}
                    messageId={message.id}
                  />
                )}
              </>
            )}
          </div>
        </div>

        {/* Hover actions */}
        <AnimatePresence>
          {showActions && !isOptimistic && !isFailed && !isEditing && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="absolute -top-4 right-4 flex items-center gap-0.5 bg-[#2b2d31] border border-[#3f4147] rounded-md shadow-xl p-0.5 z-20"
            >
              <ActionButton
                icon={<SmilePlus size={18} />}
                label="Add reaction"
                onClick={() => setShowReactionPicker(!showReactionPicker)}
              />
              <ActionButton
                icon={<MessageSquare size={18} />}
                label="Create Thread"
                onClick={() => openThread(message)}
              />
              {onReply && (
                <ActionButton
                  icon={<Reply size={18} />}
                  label="Reply"
                  onClick={() => onReply(message)}
                />
              )}
              {isOwnMessage && onEdit && (
                <ActionButton
                  icon={<Edit3 size={18} />}
                  label="Edit message"
                  onClick={() => setIsEditing(true)}
                />
              )}
              <div className="w-px h-5 bg-[#3f4147] mx-0.5" />
              <ActionButton
                icon={<Copy size={18} />}
                label="Copy message"
                onClick={handleCopy}
              />
              <div className="relative">
                <ActionButton
                  icon={<MoreHorizontal size={18} />}
                  label="More"
                  onClick={() => setShowMoreMenu(!showMoreMenu)}
                />

                {showMoreMenu && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute top-full right-0 mt-1 w-48 bg-[#111214] border border-[#1e1f22] rounded-md shadow-2xl overflow-hidden z-30"
                  >
                    {onPin && (
                      <button className="w-full px-3 py-2 text-left text-sm text-[#dbdee1] hover:bg-[#5865f2] hover:text-white transition-colors flex items-center gap-2">
                        <Pin size={16} />
                        Pin Message
                      </button>
                    )}
                    {isOwnMessage && onDelete && (
                      <button
                        onClick={() => setShowDeleteModal(true)}
                        className="w-full px-3 py-2 text-left text-sm text-[#f23f43] hover:bg-[#f23f43] hover:text-white transition-colors flex items-center gap-2"
                      >
                        <Trash2 size={16} />
                        Delete Message
                      </button>
                    )}
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reaction picker */}
        <AnimatePresence>
          {showReactionPicker && (
            <div className="absolute -top-2 right-16 z-30">
              <ReactionPicker
                onSelect={handleEmojiSelect}
                onClose={() => setShowReactionPicker(false)}
              />
            </div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Delete confirmation modal */}
      <DeleteMessageModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
        message={message}
      />
    </>
  );
});

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  variant?: "default" | "danger";
}

function ActionButton({
  icon,
  label,
  onClick,
  variant = "default",
}: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      className={cn(
        "p-1.5 rounded hover:bg-[#404249] transition-colors",
        variant === "default"
          ? "text-[#b5bac1] hover:text-white"
          : "text-[#f23f43] hover:text-white hover:bg-[#da373c]"
      )}
    >
      {icon}
    </button>
  );
}
