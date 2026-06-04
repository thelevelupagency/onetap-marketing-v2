"use client";

import { useEffect, useRef, useState } from "react";
import {
  BLOG_READING_REGION_ID,
  getRegionReadingProgress,
} from "@/lib/blog-reading";
import { useIsDesktopLg, useMotionConfig } from "@/lib/motion";

const SMOOTHING = 0.14;

export function BlogReadingProgress() {
  const [scale, setScale] = useState(0);
  const targetRef = useRef(0);
  const displayRef = useRef(0);
  const frameRef = useRef(0);
  const isDesktopLg = useIsDesktopLg();
  const { prefersReducedMotion } = useMotionConfig();

  useEffect(() => {
    if (isDesktopLg) return;

    function readTarget() {
      const region = document.getElementById(BLOG_READING_REGION_ID);
      if (!region) {
        targetRef.current = 0;
        return;
      }
      targetRef.current = getRegionReadingProgress(region);
    }

    function tick() {
      const target = targetRef.current;
      const current = displayRef.current;
      const next = prefersReducedMotion
        ? target
        : current + (target - current) * SMOOTHING;

      const settled = Math.abs(next - target) < 0.0005;
      const value = settled ? target : next;
      displayRef.current = value;
      setScale(value);

      if (!settled) {
        frameRef.current = requestAnimationFrame(tick);
      }
    }

    function onScroll() {
      readTarget();
      cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(tick);
    }

    readTarget();
    displayRef.current = targetRef.current;
    setScale(targetRef.current);

    const region = document.getElementById(BLOG_READING_REGION_ID);
    const resizeObserver =
      region &&
      new ResizeObserver(() => {
        onScroll();
      });

    if (region) resizeObserver?.observe(region);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frameRef.current);
      resizeObserver?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isDesktopLg, prefersReducedMotion]);

  return (
    <div
      className="pointer-events-none fixed top-[72px] right-0 left-0 z-[99] h-1 bg-brand-midnight/5 lg:hidden"
      aria-hidden
    >
      <div
        className="h-full w-full origin-left bg-brand-turquoise will-change-transform"
        style={{ transform: `scaleX(${scale})` }}
      />
    </div>
  );
}
