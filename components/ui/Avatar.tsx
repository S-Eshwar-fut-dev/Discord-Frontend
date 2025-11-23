"use client";

import React, { useState, useMemo } from "react";
import { cn } from "@/lib/utils/cn";
import PresenceBadge, { type PresenceStatus } from "./PresenceBadge";
import { getInitials } from "@/lib/utils/cn";

export interface AvatarProps {
  src?: string | null;
  alt?: string;
  size?: number;
  status?: PresenceStatus | null;
  className?: string;
  fallback?: string;
  shape?: "circle" | "rounded" | "square";
  showStatusBadge?: boolean;
  onClick?: () => void;
  loading?: "lazy" | "eager";
}

/**
 * Discord-style Avatar component with presence indicator
 */
export default function Avatar({
  src,
  alt = "avatar",
  size = 40,
  status = null,
  className,
  fallback,
  shape = "circle",
  showStatusBadge = true,
  onClick,
  loading = "lazy",
}: AvatarProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  // Generate fallback initials
  const initials = useMemo(() => {
    if (fallback) return getInitials(fallback);
    if (alt) return getInitials(alt);
    return "??";
  }, [fallback, alt]);

  // Generate consistent color based on name
  const backgroundColor = useMemo(() => {
    const colors = [
      "#5865f2", // Blurple
      "#57f287", // Green
      "#fee75c", // Yellow
      "#eb459e", // Pink
      "#ed4245", // Red
      "#f26522", // Orange
    ];
    const str = fallback || alt || "";
    const hash = str.split("").reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);
    return colors[Math.abs(hash) % colors.length];
  }, [fallback, alt]);

  const shapeClasses = {
    circle: "rounded-full",
    rounded: "rounded-lg",
    square: "rounded-none",
  };

  const statusBadgeSize = size > 32 ? "md" : "sm";

  const shouldShowImage = src && !imageError;

  return (
    <div
      className={cn(
        "relative inline-block shrink-0",
        onClick && "cursor-pointer hover:opacity-90 transition-opacity",
        className
      )}
      style={{ width: size, height: size }}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={alt}
    >
      {/* Avatar image or fallback */}
      {shouldShowImage ? (
        <div className="relative w-full h-full">
          <img
            src={src}
            alt={alt}
            width={size}
            height={size}
            loading={loading}
            className={cn(
              "w-full h-full object-cover",
              shapeClasses[shape],
              imageLoading && "opacity-0"
            )}
            draggable={false}
            onLoad={() => setImageLoading(false)}
            onError={() => {
              setImageError(true);
              setImageLoading(false);
            }}
          />
          {imageLoading && (
            <div
              className={cn(
                "absolute inset-0 flex items-center justify-center bg-[#2b2d31] animate-pulse",
                shapeClasses[shape]
              )}
            />
          )}
        </div>
      ) : (
        <div
          className={cn(
            "w-full h-full flex items-center justify-center text-white font-semibold select-none",
            shapeClasses[shape]
          )}
          style={{
            backgroundColor,
            fontSize: size / 2.5,
          }}
        >
          {initials}
        </div>
      )}

      {/* Presence badge */}
      {status && showStatusBadge && (
        <div
          className={cn(
            "absolute",
            shape === "circle" ? "bottom-0 right-0" : "bottom-1 right-1"
          )}
        >
          <PresenceBadge status={status} size={statusBadgeSize} />
        </div>
      )}
    </div>
  );
}

/**
 * Avatar Group - Display multiple avatars with overlap
 */
export interface AvatarGroupProps {
  avatars: Array<{
    src?: string | null;
    alt?: string;
    status?: PresenceStatus | null;
  }>;
  max?: number;
  size?: number;
  className?: string;
}

export function AvatarGroup({
  avatars,
  max = 5,
  size = 32,
  className,
}: AvatarGroupProps) {
  const displayAvatars = avatars.slice(0, max);
  const remaining = Math.max(0, avatars.length - max);

  return (
    <div className={cn("flex items-center", className)}>
      {displayAvatars.map((avatar, index) => (
        <div
          key={index}
          className="relative"
          style={{
            marginLeft: index > 0 ? `-${size * 0.25}px` : 0,
            zIndex: displayAvatars.length - index,
          }}
        >
          <Avatar {...avatar} size={size} className="ring-2 ring-[#313338]" />
        </div>
      ))}

      {remaining > 0 && (
        <div
          className="relative flex items-center justify-center bg-[#2b2d31] text-[#b5bac1] font-semibold rounded-full ring-2 ring-[#313338]"
          style={{
            width: size,
            height: size,
            marginLeft: `-${size * 0.25}px`,
            fontSize: size / 3,
          }}
        >
          +{remaining}
        </div>
      )}
    </div>
  );
}
