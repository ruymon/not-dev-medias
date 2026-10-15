"use client";

import { useEffect } from "react";

/** Registers the offline worker. Production only: in dev it would cache HMR. */
export function ServiceWorker() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;

    const version = process.env.NEXT_PUBLIC_BUILD_ID ?? "dev";
    navigator.serviceWorker
      .register(`/sw.js?v=${encodeURIComponent(version)}`)
      .catch((error) => console.error("Service worker failed:", error));
  }, []);

  return null;
}
