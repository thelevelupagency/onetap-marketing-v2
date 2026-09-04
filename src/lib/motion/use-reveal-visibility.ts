"use client";

import { useInView, type UseInViewOptions } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";
import { isElementInViewport } from "./navigation-restore";
import { MOTION_VIEWPORT } from "./tokens";
import { useMotionConfig } from "./use-motion-config";

const DEFAULT_VIEWPORT = MOTION_VIEWPORT as UseInViewOptions;

/**
 * Controlled scroll reveal: `animate` driven by `useInView` + in-viewport fallback.
 * Fallback keeps listening until visible so below-fold mockups cannot stay at opacity 0
 * when IntersectionObserver is flaky (mobile WebKit + overflow-x: clip).
 */
export function useRevealVisibility(viewport: UseInViewOptions = DEFAULT_VIEWPORT) {
  const ref = useRef<HTMLDivElement>(null);
  const { prefersReducedMotion } = useMotionConfig();
  const inView = useInView(ref, {
    ...viewport,
    amount: viewport.amount ?? MOTION_VIEWPORT.amount ?? 0,
  });
  const [visibleOnMount, setVisibleOnMount] = useState(false);

  useLayoutEffect(() => {
    if (prefersReducedMotion || visibleOnMount) return;

    const checkInViewport = () => {
      const el = ref.current;
      if (el && isElementInViewport(el)) {
        setVisibleOnMount(true);
      }
    };

    const frame = requestAnimationFrame(() => {
      checkInViewport();
    });

    window.addEventListener("scroll", checkInViewport, { passive: true });
    window.addEventListener("resize", checkInViewport, { passive: true });
    window.addEventListener("pageshow", checkInViewport);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", checkInViewport);
      window.removeEventListener("resize", checkInViewport);
      window.removeEventListener("pageshow", checkInViewport);
    };
  }, [prefersReducedMotion, visibleOnMount]);

  const visible = prefersReducedMotion || inView || visibleOnMount;

  return {
    ref,
    visible,
    initial: visible ? (false as const) : ("hidden" as const),
    animate: visible ? ("visible" as const) : ("hidden" as const),
  };
}
