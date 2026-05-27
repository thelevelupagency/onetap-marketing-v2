"use client";

import { useReducedMotion } from "framer-motion";
import {
  enterTransition,
  getCardMotionTokens,
  getMotionTokens,
  MOTION_CARD_VIEWPORT,
  MOTION_VIEWPORT,
  type MotionTokenSet,
} from "./tokens";
import {
  fadeInVariant,
  fadeUpVariant,
  resolveRevealDirection,
  revealVariant,
  staggerContainerVariant,
  staggerItemVariant,
  type RevealDirection,
} from "./variants";
import { useIsMobile } from "./use-media-query";

export interface MotionConfig {
  tokens: MotionTokenSet;
  cardTokens: MotionTokenSet;
  viewport: typeof MOTION_VIEWPORT;
  cardViewport: typeof MOTION_CARD_VIEWPORT;
  prefersReducedMotion: boolean;
  isMobile: boolean;
  disableFloat: boolean;
  enterTransition: (delay?: number) => ReturnType<typeof enterTransition>;
  cardEnterTransition: (delay?: number) => ReturnType<typeof enterTransition>;
  revealVariant: (direction?: RevealDirection) => ReturnType<typeof revealVariant>;
  cardRevealVariant: () => ReturnType<typeof fadeUpVariant>;
  fadeUpVariant: () => ReturnType<typeof fadeUpVariant>;
  fadeInVariant: () => ReturnType<typeof fadeInVariant>;
  staggerContainerVariant: () => ReturnType<typeof staggerContainerVariant>;
  staggerItemVariant: () => ReturnType<typeof staggerItemVariant>;
}

export function useMotionConfig(): MotionConfig {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const isMobile = useIsMobile();

  const breakpoint = prefersReducedMotion
    ? "reduced"
    : isMobile
      ? "mobile"
      : "desktop";

  const tokens = getMotionTokens(breakpoint);
  const cardTokens = getCardMotionTokens(breakpoint);
  const disableFloat = prefersReducedMotion || isMobile;

  return {
    tokens,
    cardTokens,
    viewport: MOTION_VIEWPORT,
    cardViewport: MOTION_CARD_VIEWPORT,
    prefersReducedMotion,
    isMobile,
    disableFloat,
    enterTransition: (delay = 0) => enterTransition(tokens, delay),
    cardEnterTransition: (delay = 0) => enterTransition(cardTokens, delay),
    revealVariant: (direction = "up") =>
      revealVariant(tokens, resolveRevealDirection(direction, isMobile)),
    cardRevealVariant: () => fadeUpVariant(cardTokens),
    fadeUpVariant: () => fadeUpVariant(tokens),
    fadeInVariant: () => fadeInVariant(tokens),
    staggerContainerVariant: () => staggerContainerVariant(tokens),
    staggerItemVariant: () => staggerItemVariant(tokens),
  };
}
