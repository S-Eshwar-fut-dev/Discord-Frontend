"use client";

import React from "react";
import { cn } from "@/lib/utils/cn";

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  label: string;
  size?: "sm" | "md" | "lg";
}

export default function IconButton({
  icon,
  label,
  size = "md",
  className,
  ...props
}: IconButtonProps) {
  const sizes = {
    sm: "h-7 w-7",
    md: "h-9 w-9",
    lg: "h-11 w-11",
  };

  return (
    <button
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex items-center justify-center rounded-md",
        "text-[#b5bac1] hover:text-[#dbdee1] hover:bg-[#35373c]",
        "transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        sizes[size],
        className
      )}
      {...props}
    >
      {icon}
    </button>
  );
}
