"use client";

import { motion, useReducedMotion } from "framer-motion";

type FloatWrapProps = {
  delay?: number;
  duration?: number;
  children: React.ReactNode;
};

/** Gentle vertical float loop; disabled when user prefers reduced motion. */
export function FloatWrap({
  delay = 0,
  duration = 5,
  children,
}: FloatWrapProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
    >
      {children}
    </motion.div>
  );
}
