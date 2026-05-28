"use client";

import { useInView, type UseInViewOptions } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";
import { isElementInViewport } from "./navigation-restore";
import { MOTION_VIEWPORT } from "./tokens";
import { useMotionConfig } from "./use-motion-config";

const DEFAULT_VIEWPORT = MOTION_VIEWPORT as UseInViewOptions;

/**
 * Controlled scroll reveal: `animate` driven by `useInView` + in-viewport mount check.
 */
export function useRevealVisibility(viewport: UseInViewOptions = DEFAULT_VIEWPORT) {
  const ref = useRef<HTMLDivElement>(null);
  const { prefersReducedMotion } = useMotionConfig();
  const inView = useInView(ref, { ...viewport, amount: viewport.amount ?? 0.2 });
  const [visibleOnMount, setVisibleOnMount] = useState(false);

  const checkInViewport = () => {
    const el = ref.current;
    if (el && isElementInViewport(el)) {
      setVisibleOnMount(true);
    }
  };

  useLayoutEffect(() => {
    if (prefersReducedMotion) return;

    const frame = requestAnimationFrame(() => {
      checkInViewport();
    });

    window.addEventListener("scroll", checkInViewport, { passive: true, once: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", checkInViewport);
    };
  }, [prefersReducedMotion]);

  const visible = prefersReducedMotion || inView || visibleOnMount;

  return {
    ref,
    visible,
    initial: visible ? (false as const) : ("hidden" as const),
    animate: visible ? ("visible" as const) : ("hidden" as const),
  };
}
