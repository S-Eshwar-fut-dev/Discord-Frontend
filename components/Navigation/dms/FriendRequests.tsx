"use client";

import React from "react";

export default function FriendRequests({
  count = 0,
  onOpen,
}: {
  count?: number;
  onOpen?: () => void;
}) {
  return (
    <div className="flex items-center justify-between px-3 py-2 rounded-md bg-[#141516]">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-md bg-[#232427] flex items-center justify-center text-sm font-semibold">
          FR
        </div>
        <div>
          <div className="text-sm font-semibold text-white">
            Friend Requests
          </div>
          <div className="text-xs text-gray-400">Approve or ignore</div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="text-xs text-gray-300 font-semibold">{count}</div>
        <button
          onClick={onOpen}
          className="px-2 py-1 rounded-md bg-[#232427] hover:bg-[#2b2d31]"
        >
          Open
        </button>
      </div>
    </div>
  );
}
