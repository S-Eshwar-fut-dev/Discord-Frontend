"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

export function SkeletonMessage() {
  return (
    <div className="flex gap-4 px-4 py-2">
      <div className="w-10 h-10 rounded-full bg-[#2b2d31] animate-pulse shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-[#2b2d31] rounded w-1/4 animate-pulse" />
        <div className="h-4 bg-[#2b2d31] rounded w-3/4 animate-pulse" />
      </div>
    </div>
  );
}

export function SkeletonChannel() {
  return (
    <div className="flex items-center gap-3 px-2 py-2">
      <div className="w-5 h-5 rounded bg-[#2b2d31] animate-pulse shrink-0" />
      <div className="h-4 bg-[#2b2d31] rounded flex-1 animate-pulse" />
    </div>
  );
}

export function SkeletonGuild() {
  return <div className="w-12 h-12 rounded-full bg-[#2b2d31] animate-pulse" />;
}

export function SkeletonMember() {
  return (
    <div className="flex items-center gap-3 px-2 py-2">
      <div className="w-8 h-8 rounded-full bg-[#2b2d31] animate-pulse shrink-0" />
      <div className="flex-1 space-y-1">
        <div className="h-3 bg-[#2b2d31] rounded w-3/4 animate-pulse" />
        <div className="h-2 bg-[#2b2d31] rounded w-1/2 animate-pulse" />
      </div>
    </div>
  );
}

export function LoadingOverlay({
  message = "Loading...",
}: {
  message?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-[#313338]/95 backdrop-blur-sm z-200 flex items-center justify-center"
    >
      <div className="flex flex-col items-center gap-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-[#5865f2] border-t-transparent rounded-full"
        />
        <p className="text-white font-medium">{message}</p>
      </div>
    </motion.div>
  );
}
