"use client";

import React from "react";

export default function UnreadMarker() {
  return (
    <div className="unread-marker mx-4 my-2">
      <div className="absolute top-1/2 left-4 -translate-y-1/2 px-1.5 py-0.5 bg-[#f23f43] rounded text-white text-[10px] font-bold">
        NEW
      </div>
    </div>
  );
}
