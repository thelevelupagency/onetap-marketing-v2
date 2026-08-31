"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionConfig } from "@/lib/motion";

export type InfiniteScrollDirection = "left" | "right";

export interface UseInfiniteScrollTrackOptions {
  direction?: InfiniteScrollDirection;
  speed?: number;
}

/**
 * scrollLeft-based infinite marquee — container must use dir="ltr".
 */
export function useInfiniteScrollTrack({
  direction = "right",
  speed = 1,
}: UseInfiniteScrollTrackOptions = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const animationRef = useRef<number>(0);
  const { prefersReducedMotion } = useMotionConfig();

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    const singleSetWidth = content.scrollWidth / 4;
    if (container.scrollLeft === 0 && singleSetWidth > 0) {
      container.scrollLeft = singleSetWidth;
    }

    let pos = container.scrollLeft;

    const handleScroll = () => {
      if (!container || !content) return;
      const setWidth = content.scrollWidth / 4;
      if (setWidth <= 0) return;

      if (container.scrollLeft < setWidth * 0.5) {
        container.scrollLeft += setWidth;
      } else if (container.scrollLeft > setWidth * 2.5) {
        container.scrollLeft -= setWidth;
      }
      pos = container.scrollLeft;
    };

    container.addEventListener("scroll", handleScroll, { passive: true });

    const animate = () => {
      if (!isPaused && !prefersReducedMotion && container && content) {
        pos += direction === "right" ? speed : -speed;
        container.scrollLeft = pos;
      } else if (container) {
        pos = container.scrollLeft;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      container.removeEventListener("scroll", handleScroll);
    };
  }, [direction, speed, isPaused, prefersReducedMotion]);

  const pauseHandlers = {
    onMouseEnter: () => setIsPaused(true),
    onMouseLeave: () => setIsPaused(false),
    onTouchStart: () => setIsPaused(true),
    onTouchEnd: () => setIsPaused(false),
  };

  return {
    containerRef,
    contentRef,
    pauseHandlers,
    prefersReducedMotion,
  };
}
