"use client";

import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import type { BlogHeading } from "@/content/blog/posts";
import { getTocHeadings, resolveTocActiveId } from "@/lib/blog";
import {
  blogScrollStorageKey,
  isNavigationTargetSettled,
  resolveActiveHeadingId,
  scrollHeadingIntoView,
} from "@/lib/blog-reading";

const NAVIGATION_MAX_MS = 5000;
const HASH_RESTORE_MAX_ATTEMPTS = 40;
const SCROLL_SAVE_MS = 150;

export function useBlogScrollSpy(headings: BlogHeading[]) {
  const pathname = usePathname();
  const storageKey = blogScrollStorageKey(pathname);
  const tocHeadings = getTocHeadings(headings);
  const fallbackId = tocHeadings[0]?.id ?? "";
  const [activeId, setActiveId] = useState(fallbackId);
  const [isNavigating, setIsNavigating] = useState(false);
  const navigationLockRef = useRef<string | null>(null);
  const navigationStartedAtRef = useRef(0);
  const restorePendingRef = useRef(false);
  const restoredPathRef = useRef<string | null>(null);

  const syncActiveFromScroll = useCallback(() => {
    if (tocHeadings.length === 0 || navigationLockRef.current || restorePendingRef.current) {
      return;
    }
    const next = resolveActiveHeadingId(tocHeadings);
    if (!next) return;
    setActiveId((current) => (current === next ? current : next));
  }, [tocHeadings]);

  const saveScrollPosition = useCallback(() => {
    if (navigationLockRef.current || restorePendingRef.current) return;
    sessionStorage.setItem(storageKey, String(Math.round(window.scrollY)));
  }, [storageKey]);

  const finishNavigation = useCallback(() => {
    const targetId = navigationLockRef.current;
    if (!targetId) return;

    navigationLockRef.current = null;
    navigationStartedAtRef.current = 0;
    setIsNavigating(false);
    setActiveId(resolveTocActiveId(targetId, headings));
    saveScrollPosition();
  }, [headings, saveScrollPosition]);

  const tryFinishNavigation = useCallback(() => {
    const targetId = navigationLockRef.current;
    if (!targetId) return;

    const timedOut =
      navigationStartedAtRef.current > 0 &&
      performance.now() - navigationStartedAtRef.current > NAVIGATION_MAX_MS;

    if (isNavigationTargetSettled(targetId) || timedOut) {
      finishNavigation();
    }
  }, [finishNavigation]);

  const beginNavigation = useCallback(
    (id: string) => {
      navigationLockRef.current = id;
      navigationStartedAtRef.current = performance.now();
      setIsNavigating(true);
      setActiveId(resolveTocActiveId(id, headings));
    },
    [headings]
  );

  const restoreScrollPosition = useCallback(
    (y: number) => {
      if (!Number.isFinite(y) || y <= 0) return;

      restorePendingRef.current = true;
      window.scrollTo({ top: y, left: 0, behavior: "auto" });

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          restorePendingRef.current = false;
          syncActiveFromScroll();
          saveScrollPosition();
        });
      });
    },
    [saveScrollPosition, syncActiveFromScroll]
  );

  const restoreFromHash = useCallback(
    (hash: string, deferState = false) => {
      restorePendingRef.current = true;
      navigationLockRef.current = hash;
      navigationStartedAtRef.current = performance.now();
      scrollHeadingIntoView(hash, "auto");

      const startStateAndRetry = () => {
        setIsNavigating(true);
        setActiveId(resolveTocActiveId(hash, headings));

        let attempts = 0;
        const retry = () => {
          attempts += 1;
          scrollHeadingIntoView(hash, "auto");
          tryFinishNavigation();

          if (!navigationLockRef.current) {
            restorePendingRef.current = false;
            saveScrollPosition();
            return;
          }

          if (attempts < HASH_RESTORE_MAX_ATTEMPTS) {
            requestAnimationFrame(retry);
          } else {
            finishNavigation();
            restorePendingRef.current = false;
          }
        };

        requestAnimationFrame(retry);
      };

      if (deferState) {
        requestAnimationFrame(startStateAndRetry);
      } else {
        startStateAndRetry();
      }

      const onLoad = () => {
        scrollHeadingIntoView(hash, "auto");
        tryFinishNavigation();
      };
      window.addEventListener("load", onLoad, { once: true });
      return () => window.removeEventListener("load", onLoad);
    },
    [finishNavigation, headings, saveScrollPosition, tryFinishNavigation]
  );

  const handleHeadingClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>, id: string) => {
      e.preventDefault();
      beginNavigation(id);
      scrollHeadingIntoView(id, "smooth");
    },
    [beginNavigation]
  );

  useLayoutEffect(() => {
    if (headings.length === 0 || restoredPathRef.current === pathname) return;
    restoredPathRef.current = pathname;

    const hash = window.location.hash.slice(1);
    if (hash && headings.some((h) => h.id === hash)) {
      return restoreFromHash(hash, true);
    }

    const saved = sessionStorage.getItem(storageKey);
    if (saved) {
      restoreScrollPosition(Number(saved));
    }
  }, [headings, pathname, restoreFromHash, restoreScrollPosition, storageKey]);

  useEffect(() => {
    if (tocHeadings.length === 0) return;

    let scrollFrame = 0;
    let saveTimer = 0;

    const onScroll = () => {
      if (navigationLockRef.current) {
        tryFinishNavigation();
        return;
      }

      if (!restorePendingRef.current) {
        window.clearTimeout(saveTimer);
        saveTimer = window.setTimeout(saveScrollPosition, SCROLL_SAVE_MS);
      }

      cancelAnimationFrame(scrollFrame);
      scrollFrame = requestAnimationFrame(syncActiveFromScroll);
    };

    const mountFrame = requestAnimationFrame(() => {
      if (navigationLockRef.current || restorePendingRef.current) return;
      syncActiveFromScroll();
    });

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    window.addEventListener("scrollend", tryFinishNavigation);

    return () => {
      cancelAnimationFrame(mountFrame);
      cancelAnimationFrame(scrollFrame);
      window.clearTimeout(saveTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("scrollend", tryFinishNavigation);
    };
  }, [tocHeadings, saveScrollPosition, syncActiveFromScroll, tryFinishNavigation]);

  useEffect(() => {
    if (!isNavigating) return;

    let pollFrame = 0;
    const poll = () => {
      tryFinishNavigation();
      if (navigationLockRef.current) {
        pollFrame = requestAnimationFrame(poll);
      }
    };
    pollFrame = requestAnimationFrame(poll);

    return () => cancelAnimationFrame(pollFrame);
  }, [isNavigating, tryFinishNavigation]);

  return { activeId, isNavigating, handleHeadingClick };
}
