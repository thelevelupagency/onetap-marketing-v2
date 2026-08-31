"use client";

import type { ReactNode } from "react";
import { InfiniteScrollTrack } from "@/components/marketing/primitives/infinite-scroll-track";
import type { InfiniteScrollDirection } from "@/lib/motion/use-infinite-scroll-track";
import { cn } from "@/lib/utils";

export interface InfiniteTestimonialTrackProps {
  children: ReactNode;
  direction?: InfiniteScrollDirection;
  speed?: number;
  className?: string;
  ariaLabel?: string;
}

export function InfiniteTestimonialTrack({
  children,
  direction = "right",
  speed = 1.0,
  className,
  ariaLabel = "Testimonials carousel",
}: InfiniteTestimonialTrackProps) {
  return (
    <InfiniteScrollTrack
      direction={direction}
      speed={speed}
      ariaLabel={ariaLabel}
      className={cn("relative w-full overflow-hidden py-0.5", className)}
      scrollClassName="select-none cursor-grab items-center pt-4 pb-2 active:cursor-grabbing sm:pt-5 sm:pb-3"
      contentClassName="items-stretch gap-6 sm:gap-8"
    >
      {children}
    </InfiniteScrollTrack>
  );
}
