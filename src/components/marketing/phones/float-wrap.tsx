"use client";

import { motion } from "framer-motion";
import { useMotionConfig } from "@/lib/motion";

type FloatWrapProps = {
  delay?: number;
  duration?: number;
  children: React.ReactNode;
};

/** Gentle vertical float loop; disabled when user prefers reduced motion or on mobile. */
export function FloatWrap({
  delay = 0,
  duration = 5,
  children,
}: FloatWrapProps) {
  const { disableFloat, prefersReducedMotion, isMobile } = useMotionConfig();

  if (disableFloat || prefersReducedMotion) {
    return <>{children}</>;
  }

  const amplitude = isMobile ? 4 : 8;

  return (
    <motion.div
      animate={{ y: [0, -amplitude, 0] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
    >
      {children}
    </motion.div>
  );
}
