"use client";

import { useSyncExternalStore } from "react";

function subscribeMedia(query: string, callback: () => void) {
  const mql = window.matchMedia(query);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getMediaSnapshot(query: string): boolean {
  return window.matchMedia(query).matches;
}

function getMediaServerSnapshot(): boolean {
  return false;
}

/** Matches Tailwind `md` breakpoint (768px). */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (callback) => subscribeMedia(query, callback),
    () => getMediaSnapshot(query),
    getMediaServerSnapshot
  );
}

export function useIsMobile(): boolean {
  return useMediaQuery("(max-width: 767px)");
}

/** Matches Tailwind `lg` breakpoint (1024px). */
export function useIsDesktopLg(): boolean {
  return useMediaQuery("(min-width: 1024px)");
}
