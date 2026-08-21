"use client";

import React, { useRef, useState, useEffect, ReactNode } from "react";
import Image from "next/image";
import { IPhone13ProMaxMockup } from "./iphone-13-pro-max-mockup";
import { CARD_SCREENSHOTS } from "@/lib/phone-screenshots";
import { useMotionConfig } from "@/lib/motion";

interface InfiniteTrackProps {
  children: ReactNode;
  direction?: "left" | "right";
  speed?: number;
  className?: string;
}

function InfiniteTrack({
  children,
  direction = "right",
  speed = 1,
  className = "",
}: InfiniteTrackProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const animationRef = useRef<number>(0);
  const { prefersReducedMotion } = useMotionConfig();

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    // Initial positioning in the middle duplicated set
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
      ref={containerRef}
      className={`hide-scrollbar overflow-x-scroll flex items-center ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
      aria-label="Digital card examples carousel"
    >
      <div ref={contentRef} className="flex flex-row gap-6 items-center w-max">
        {/* Quadruplicated Content for 100% Seamless Infinite Manual & Auto Scrolling */}
        {children}
        {children}
        {children}
        {children}
      </div>
    </div>
  );
}

const realMockScreenshots = CARD_SCREENSHOTS;

export function AnimatedPhoneGrid() {
  const renderPhone = (item: { src: string; alt: string }, idx: number) => (
    <div key={idx} className="shrink-0 pointer-events-none">
      <IPhone13ProMaxMockup scale={0.16}>
        <div className="w-full h-full bg-brand-navy flex items-center justify-center relative overflow-hidden">
          <Image
            src={item.src}
            alt={item.alt}
            fill
            priority={idx < 3}
            className="object-cover object-top"
            unoptimized
          />
        </div>
      </IPhone13ProMaxMockup>
    </div>
  );

  return (
    <div className="w-full h-[480px] relative flex justify-center items-center overflow-hidden">
      <InfiniteTrack direction="right" speed={1.2} className="w-full h-full">
        {realMockScreenshots.map((item, i) => renderPhone(item, i))}
      </InfiniteTrack>
    </div>
  );
}
