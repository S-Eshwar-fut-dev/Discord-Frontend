"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Plus,
  Gift,
  Smile,
  Paperclip,
  X,
  Image as ImageIcon,
} from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import type { ChatMessage, ChatUser } from "@/types/chat";
import IconButton from "../ui/IconButton";
import FilePreview from "./fileuploads/FilePreview";
import { useFileUpload } from "@/hooks/useFileUpload";
import { cn } from "@/lib/utils/cn";
import { useTyping } from "@/hooks/useTyping";
import ReactionPicker from "./reactions/ReactionPicker";
import GifPicker from "./GifPicker";
import { AnimatePresence } from "framer-motion";

const DEFAULT_USER: ChatUser = {
  id: "u1",
  username: "Eshwar",
  avatar: "/avatars/1.png",
  status: "online",
};

interface ComposerProps {
  channelId?: string;
  me?: ChatUser;
  onSend?: (m: ChatMessage) => void;
}

export default function Composer({
  channelId = "general",
  me = DEFAULT_USER,
  onSend,
}: ComposerProps) {
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showGifPicker, setShowGifPicker] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { startTyping } = useTyping(channelId);

  const { files, uploading, addFiles, removeFile, uploadFiles, clearFiles } =
    useFileUpload();

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  }, [text]);

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length > 0) {
      addFiles(selectedFiles);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Handle drag and drop
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length > 0) {
      addFiles(droppedFiles);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    if (e.target.value.length > 0) {
      startTyping();
    }
  };

  // Handle GIF selection
  const handleGifSelect = async (gifUrl: string) => {
    setSending(true);

    try {
      const tempId = "temp_" + uuidv4().slice(0, 8);
      const tempMessage: ChatMessage = {
        id: tempId,
        channelId,
        author: me,
        content: "",
        attachments: [{ url: gifUrl, filename: "gif" }],
        createdAt: new Date().toISOString(),
        temp: true,
      };

      onSend?.(tempMessage);
    } catch (error) {
      console.error("Failed to send GIF:", error);
    } finally {
      setSending(false);
    }
  };

  // Handle send message
  async function handleSend() {
    const trimmed = text.trim();
    if ((!trimmed && files.length === 0) || sending || uploading) return;

    setSending(true);

    try {
      const uploadedFiles = await uploadFiles();

      const tempId = "temp_" + uuidv4().slice(0, 8);
      const tempMessage: ChatMessage = {
        id: tempId,
        channelId,
        author: me,
        content: trimmed || "",
        attachments: uploadedFiles,
        createdAt: new Date().toISOString(),
        temp: true,
      };

      onSend?.(tempMessage);
      setText("");
      clearFiles();
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setSending(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div onDrop={handleDrop} onDragOver={handleDragOver} className="relative">
      {/* File Preview */}
      <FilePreview files={files} onRemove={removeFile} uploading={uploading} />

      {/* Emoji Picker */}
      <AnimatePresence>
        {showEmojiPicker && (
          <div className="absolute bottom-full right-4 mb-2">
            <ReactionPicker
              onSelect={(emoji) => {
                setText((prev) => prev + emoji);
                setShowEmojiPicker(false);
                textareaRef.current?.focus();
              }}
              onClose={() => setShowEmojiPicker(false)}
            />
          </div>
        )}
      </AnimatePresence>

      {/* GIF Picker */}
      <AnimatePresence>
        {showGifPicker && (
          <div className="absolute bottom-full right-4">
            <GifPicker
              onSelect={handleGifSelect}
              onClose={() => setShowGifPicker(false)}
            />
          </div>
        )}
      </AnimatePresence>

      {/* Input Area */}
      <div className="px-4 pb-6">
        <div className="flex items-end gap-4 bg-[#383a40] rounded-lg px-4 py-3">
          {/* File Upload Button */}
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileSelect}
            className="hidden"
            accept="image/*,.pdf,.txt,.zip"
          />

          <IconButton
            icon={<Plus size={20} />}
            label="Add attachments"
            className="text-[#b5bac1] hover:text-white shrink-0"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
          />

          {/* Text Input */}
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={text}
              onChange={handleTextChange}
              onKeyDown={handleKeyDown}
              placeholder={
                files.length > 0 ? "Add a message..." : `Message #${channelId}`
              }
              rows={1}
              className={cn(
                "w-full bg-transparent text-[#dbdee1] placeholder-[#87888c]",
                "resize-none outline-none",
                "max-h-[200px] overflow-y-auto custom-scroll"
              )}
              disabled={sending || uploading}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <IconButton
              icon={<Gift size={20} />}
              label="Send a gift"
              className="text-[#b5bac1] hover:text-white"
            />
            <IconButton
              icon={<ImageIcon size={20} />}
              label="Send a GIF"
              className={cn(
                "text-[#b5bac1] hover:text-white",
                showGifPicker && "text-white bg-[#4e5058]"
              )}
              onClick={() => {
                setShowGifPicker(!showGifPicker);
                setShowEmojiPicker(false);
              }}
            />
            <IconButton
              icon={<Smile size={20} />}
              label="Add emoji"
              className={cn(
                "text-[#b5bac1] hover:text-white",
                showEmojiPicker && "text-white bg-[#4e5058]"
              )}
              onClick={() => {
                setShowEmojiPicker(!showEmojiPicker);
                setShowGifPicker(false);
              }}
            />
          </div>
        </div>

        {/* Character/File Count */}
        <div className="mt-2 flex items-center justify-between text-xs">
          {files.length > 0 && (
            <span className="text-[#949ba4]">
              {files.length} file{files.length > 1 ? "s" : ""} attached
            </span>
          )}

          {text.length > 1900 && (
            <span
              className={cn(
                "ml-auto",
                text.length > 2000 ? "text-red-400" : "text-[#949ba4]"
              )}
            >
              {text.length} / 2000
            </span>
          )}
        </div>

        {/* Upload Status */}
        {uploading && (
          <div className="mt-2 text-xs text-[#87888c] italic">
            Uploading files...
          </div>
        )}
      </div>
    </div>
  );
}
