import type { Transition, ViewportOptions } from "framer-motion";

/** Brand ease-out — matches hero phone fan-in. */
export const EASE_OUT: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

export const MOTION_VIEWPORT: ViewportOptions = {
  once: true,
  amount: 0.2,
  margin: "0px 0px -10% 0px",
};

/** Per-card grids: fire when each card is meaningfully on screen, not when the grid top peeks in. */
export const MOTION_CARD_VIEWPORT: ViewportOptions = {
  once: true,
  amount: 0.4,
  margin: "0px 0px -8% 0px",
};

export type MotionBreakpoint = "desktop" | "mobile" | "reduced";

export interface MotionTokenSet {
  durationEnter: number;
  durationMicro: number;
  offsetY: number;
  offsetX: number;
  staggerChildren: number;
  ease: Transition["ease"];
}

const DESKTOP_TOKENS: MotionTokenSet = {
  durationEnter: 0.55,
  durationMicro: 0.25,
  offsetY: 24,
  offsetX: 32,
  staggerChildren: 0.1,
  ease: EASE_OUT,
};

const MOBILE_TOKENS: MotionTokenSet = {
  durationEnter: 0.4,
  durationMicro: 0.2,
  offsetY: 16,
  offsetX: 0,
  staggerChildren: 0.08,
  ease: EASE_OUT,
};

/** Card grid items — slightly larger travel so stagger reads on small screens. */
const MOBILE_CARD_TOKENS: MotionTokenSet = {
  ...MOBILE_TOKENS,
  durationEnter: 0.48,
  offsetY: 28,
  staggerChildren: 0.1,
};

const DESKTOP_CARD_TOKENS: MotionTokenSet = {
  ...DESKTOP_TOKENS,
  durationEnter: 0.62,
  offsetY: 36,
  staggerChildren: 0.14,
};

/** Tighter hero fold timing on small screens (badge → headline → lead). */
export const HERO_MOBILE_MOUNT_TOKENS: MotionTokenSet = {
  ...MOBILE_TOKENS,
  durationEnter: 0.38,
  offsetY: 12,
  staggerChildren: 0.045,
};

const REDUCED_TOKENS: MotionTokenSet = {
  durationEnter: 0.01,
  durationMicro: 0.01,
  offsetY: 0,
  offsetX: 0,
  staggerChildren: 0,
  ease: "linear",
};

export function getMotionTokens(breakpoint: MotionBreakpoint): MotionTokenSet {
  if (breakpoint === "reduced") return REDUCED_TOKENS;
  if (breakpoint === "mobile") return MOBILE_TOKENS;
  return DESKTOP_TOKENS;
}

export function getCardMotionTokens(breakpoint: MotionBreakpoint): MotionTokenSet {
  if (breakpoint === "reduced") return REDUCED_TOKENS;
  if (breakpoint === "mobile") return MOBILE_CARD_TOKENS;
  return DESKTOP_CARD_TOKENS;
}

export function enterTransition(
  tokens: MotionTokenSet,
  delay = 0
): Transition {
  return {
    duration: tokens.durationEnter,
    delay,
    ease: tokens.ease,
  };
}

export function microTransition(tokens: MotionTokenSet): Transition {
  return {
    duration: tokens.durationMicro,
    ease: tokens.ease,
  };
}
