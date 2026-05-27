"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useMotionConfig } from "@/lib/motion";

const GRID_GAP_CLASSES = {
  default: "gap-marketing-grid-gap md:gap-marketing-grid-gap-md",
  tight: "gap-marketing-stack-gap-sm",
  loose: "gap-marketing-stack-gap md:gap-marketing-grid-gap-md",
} as const;

export interface CardRevealProps {
  children: React.ReactNode;
  className?: string;
  /** When several cards intersect at once, cascade using grid stagger spacing. */
  staggerIndex?: number;
  /** Extra delay on top of {@link staggerIndex} (seconds). */
  delay?: number;
}

/**
 * Each card reveals on its own scroll intersection (not when the grid container enters).
 * Stronger offset than section-level Reveal so the motion is easy to notice.
 */
export function CardReveal({
  children,
  className,
  staggerIndex,
  delay = 0,
}: CardRevealProps) {
  const { cardViewport, cardRevealVariant, cardEnterTransition, cardTokens } =
    useMotionConfig();
  const staggerDelay =
    staggerIndex != null ? staggerIndex * cardTokens.staggerChildren : 0;

  return (
    <motion.div
      className={cn("h-full", className)}
      initial="hidden"
      whileInView="visible"
      viewport={cardViewport}
      variants={cardRevealVariant()}
      transition={cardEnterTransition(staggerDelay + delay)}
    >
      {children}
    </motion.div>
  );
}

export interface MarketingStaggerGridProps {
  columns?: 2 | 3;
  gap?: keyof typeof GRID_GAP_CLASSES;
  className?: string;
  children: React.ReactNode;
}

/** Responsive card grid with tokenized gaps; pair with {@link CardReveal} per item. */
export function MarketingStaggerGrid({
  columns = 3,
  gap = "default",
  className,
  children,
}: MarketingStaggerGridProps) {
  return (
    <div
      className={cn(
        "grid",
        GRID_GAP_CLASSES[gap],
        columns === 3 && "md:grid-cols-3",
        columns === 2 && "md:grid-cols-2",
        className
      )}
    >
      {children}
    </div>
  );
}
