"use client";

import { useSyncExternalStore } from "react";

// Nothing to subscribe to — the value only differs between the server
// snapshot and the client one.
const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

/**
 * Persisted zustand stores only read localStorage after the first client
 * render. Anything derived from them has to wait for that, otherwise the
 * server markup disagrees with the client and the empty state flashes before
 * the real data lands.
 */
export function useHydrated() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
