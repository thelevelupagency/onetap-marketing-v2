"use client";

import React, { useRef, useState, useEffect, ReactNode } from "react";
import { useMotionConfig } from "@/lib/motion";
import { cn } from "@/lib/utils";

export interface InfiniteTestimonialTrackProps {
  children: ReactNode;
  direction?: "left" | "right";
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
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const animationRef = useRef<number>(0);
  const { prefersReducedMotion } = useMotionConfig();

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    // Initial position set to buffer in middle duplicated set
    const singleSetWidth = content.scrollWidth / 4;
    if (container.scrollLeft === 0 && singleSetWidth > 0) {
      container.scrollLeft = singleSetWidth;
    }

    let pos = container.scrollLeft;

    const handleScroll = () => {
      if (!container || !content) return;
      const setWidth = content.scrollWidth / 4;
      if (setWidth <= 0) return;

      // Keep scroll position seamlessly within middle buffer sets
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

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden py-0.5",
        className
      )}
      aria-label={ariaLabel}
    >
      <div
        ref={containerRef}
        className="hide-scrollbar flex items-center overflow-x-scroll pt-4 pb-2 sm:pt-5 sm:pb-3 select-none cursor-grab active:cursor-grabbing"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <div ref={contentRef} className="flex flex-row gap-6 sm:gap-8 items-stretch w-max">
          {/* Quadruplicated items for 100% seamless infinite scroll wrapping */}
          {children}
          {children}
          {children}
          {children}
        </div>
      </div>
    </div>
  );
}
