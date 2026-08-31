"use client";

import type { ReactNode } from "react";
import {
  useInfiniteScrollTrack,
  type InfiniteScrollDirection,
} from "@/lib/motion/use-infinite-scroll-track";
import { cn } from "@/lib/utils";

export interface InfiniteScrollTrackProps {
  children: ReactNode;
  direction?: InfiniteScrollDirection;
  speed?: number;
  /** Outer wrapper (pins dir=ltr for scrollLeft math). */
  className?: string;
  /** Scrollport element. */
  scrollClassName?: string;
  /** Inner flex row. */
  contentClassName?: string;
  ariaLabel?: string;
}

/**
 * Horizontal infinite scroll track. Always dir=ltr on the scroll container
 * so scrollLeft animation works under page-level RTL.
 */
export function InfiniteScrollTrack({
  children,
  direction = "right",
  speed = 1,
  className,
  scrollClassName,
  contentClassName,
  ariaLabel,
}: InfiniteScrollTrackProps) {
  const { containerRef, contentRef, pauseHandlers } = useInfiniteScrollTrack({
    direction,
    speed,
  });

  return (
    <div dir="ltr" className={className} aria-label={ariaLabel}>
      <div
        ref={containerRef}
        className={cn(
          "hide-scrollbar flex overflow-x-scroll",
          scrollClassName
        )}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        {...pauseHandlers}
      >
        <div
          ref={contentRef}
          className={cn("flex w-max flex-row items-center", contentClassName)}
        >
          {children}
          {children}
          {children}
          {children}
        </div>
      </div>
    </div>
  );
}
