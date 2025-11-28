"use client";

import React, { Suspense, lazy } from "react";
import Spinner from "@/components/ui/Spinner";

export function lazyLoadComponent<T extends React.ComponentType<any>>(
  factory: () => Promise<{ default: T }>,
  fallback?: React.ReactNode
) {
  const LazyComponent = lazy(factory);

  return (props: React.ComponentProps<T>) => (
    <Suspense fallback={fallback || <ComponentLoader />}>
      <LazyComponent {...props} />
    </Suspense>
  );
}

function ComponentLoader() {
  return (
    <div className="flex items-center justify-center h-full">
      <Spinner size="lg" />
    </div>
  );
}

// Lazy load heavy components
export const LazyUserSettings = lazyLoadComponent(
  () => import("@/components/overlays/UserSettingsModal")
);

export const LazyThreadSidebar = lazyLoadComponent(
  () => import("@/components/chat/ThreadSidebar")
);

export const LazyUserProfile = lazyLoadComponent(
  () => import("@/components/overlays/UserProfileModal")
);
