import type { Variants } from "framer-motion";
import type { MotionTokenSet } from "./tokens";

export type RevealDirection = "up" | "left" | "right" | "none";

/** Collapse horizontal slides to fade-up on mobile (plan: calmer mobile motion). */
export function resolveRevealDirection(
  direction: RevealDirection,
  isMobile: boolean
): RevealDirection {
  if (isMobile && (direction === "left" || direction === "right")) {
    return "up";
  }
  return direction;
}

function hiddenState(
  tokens: MotionTokenSet,
  direction: RevealDirection
): { opacity: number; x?: number; y?: number } {
  const base = { opacity: 0 };
  if (direction === "up") return { ...base, y: tokens.offsetY };
  if (direction === "left") return { ...base, x: -tokens.offsetX };
  if (direction === "right") return { ...base, x: tokens.offsetX };
  return base;
}

const visibleState = { opacity: 1, x: 0, y: 0 };

export function fadeUpVariant(tokens: MotionTokenSet): Variants {
  return {
    hidden: hiddenState(tokens, "up"),
    visible: visibleState,
  };
}

export function fadeInVariant(tokens: MotionTokenSet): Variants {
  return {
    hidden: hiddenState(tokens, "none"),
    visible: visibleState,
  };
}

export function slideInVariant(
  tokens: MotionTokenSet,
  direction: "left" | "right"
): Variants {
  return {
    hidden: hiddenState(tokens, direction),
    visible: visibleState,
  };
}

export function revealVariant(
  tokens: MotionTokenSet,
  direction: RevealDirection = "up"
): Variants {
  if (direction === "none") return fadeInVariant(tokens);
  if (direction === "left" || direction === "right") {
    return slideInVariant(tokens, direction);
  }
  return fadeUpVariant(tokens);
}

export function staggerContainerVariant(tokens: MotionTokenSet): Variants {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: tokens.staggerChildren,
        delayChildren: 0,
      },
    },
  };
}

export function staggerItemVariant(tokens: MotionTokenSet): Variants {
  return fadeUpVariant(tokens);
}
