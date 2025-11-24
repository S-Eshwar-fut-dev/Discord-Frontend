"use client";

import React from "react";
import { X, File as FileIcon, Image as ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import type { UploadFile } from "@/hooks/useFileUpload";

interface FilePreviewProps {
  files: UploadFile[];
  onRemove: (id: string) => void;
  uploading?: boolean;
}

export default function FilePreview({
  files,
  onRemove,
  uploading = false,
}: FilePreviewProps) {
  if (files.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="px-4 pb-2"
    >
      <div className="bg-[#2b2d31] rounded-lg p-3 border border-[#3f4147]">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-[#b5bac1]">
            Attachments ({files.length})
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          <AnimatePresence mode="popLayout">
            {files.map((file) => (
              <FilePreviewItem
                key={file.id}
                file={file}
                onRemove={() => onRemove(file.id)}
                disabled={uploading}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

interface FilePreviewItemProps {
  file: UploadFile;
  onRemove: () => void;
  disabled?: boolean;
}

function FilePreviewItem({ file, onRemove, disabled }: FilePreviewItemProps) {
  const isImage = file.file.type.startsWith("image/");
  const previewUrl = isImage ? URL.createObjectURL(file.file) : null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className={cn(
        "relative group rounded-lg overflow-hidden border-2 transition-colors",
        file.status === "error"
          ? "border-[#f23f43]"
          : file.status === "success"
          ? "border-[#23a55a]"
          : "border-[#3f4147]"
      )}
    >
      {/* Preview */}
      <div className="aspect-square bg-[#1e1f22] flex items-center justify-center relative">
        {isImage && previewUrl ? (
          <img
            src={previewUrl}
            alt={file.file.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <FileIcon size={32} className="text-[#b5bac1]" />
        )}

        {/* Progress overlay */}
        {file.status === "uploading" && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <div className="relative w-16 h-16">
              <svg className="w-full h-full -rotate-90">
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  className="text-[#3f4147]"
                />
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 28}`}
                  strokeDashoffset={`${
                    2 * Math.PI * 28 * (1 - file.progress / 100)
                  }`}
                  className="text-[#5865f2] transition-all duration-300"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-white text-sm font-bold">
                {file.progress}%
              </div>
            </div>
          </div>
        )}

        {/* Error overlay */}
        {file.status === "error" && (
          <div className="absolute inset-0 bg-[#f23f43]/20 flex items-center justify-center">
            <div className="text-[#f23f43] text-xs text-center px-2">
              {file.error || "Failed"}
            </div>
          </div>
        )}

        {/* Remove button */}
        {!disabled && file.status !== "uploading" && (
          <button
            onClick={onRemove}
            className="absolute top-1 right-1 p-1 bg-[#1e1f22] rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#f23f43]"
          >
            <X size={14} className="text-white" />
          </button>
        )}
      </div>

      {/* Filename */}
      <div className="p-2 bg-[#1e1f22]">
        <p className="text-xs text-[#b5bac1] truncate" title={file.file.name}>
          {file.file.name}
        </p>
        <p className="text-[10px] text-[#87888c]">
          {formatFileSize(file.file.size)}
        </p>
      </div>
    </motion.div>
  );
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
