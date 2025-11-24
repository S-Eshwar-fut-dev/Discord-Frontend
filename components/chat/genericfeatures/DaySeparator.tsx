"use client";

import React from "react";

interface DaySeparatorProps {
  label: string;
}

export default function DaySeparator({ label }: DaySeparatorProps) {
  return (
    <div className="day-separator my-4 mx-4">
      <span className="px-2 text-xs font-semibold text-[#949ba4]">{label}</span>
    </div>
  );
}
