"use client";

import { useSyncExternalStore } from "react";

function subscribeNoop() {
  return () => {};
}

/** True after the client has hydrated — safe for scroll/hash-derived UI. */
export function useHasHydrated() {
  return useSyncExternalStore(subscribeNoop, () => true, () => false);
}
