"use client";

import {
  motion,
  type HTMLMotionProps,
  type UseInViewOptions,
  type Variants,
} from "framer-motion";
import { useMotionConfig } from "@/lib/motion";
import type { RevealDirection } from "@/lib/motion";
import { useRevealVisibility } from "@/lib/motion/use-reveal-visibility";

type MotionDivProps = HTMLMotionProps<"div">;

export interface RevealProps extends Omit<MotionDivProps, "initial" | "animate" | "whileInView" | "viewport" | "variants" | "transition"> {
  direction?: RevealDirection;
  /** Mount animation (hero) vs scroll reveal (default). */
  mode?: "scroll" | "mount";
  delay?: number;
}

export function Reveal({
  direction = "up",
  mode = "scroll",
  delay = 0,
  children,
  ...props
}: RevealProps) {
  const { viewport, enterTransition, revealVariant, prefersReducedMotion } =
    useMotionConfig();
  const { ref, initial, animate } = useRevealVisibility(
    viewport as UseInViewOptions
  );
  const variants = revealVariant(direction);

  if (mode === "mount") {
    return (
      <motion.div
        initial={prefersReducedMotion ? false : "hidden"}
        animate="visible"
        variants={variants}
        transition={enterTransition(delay)}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      variants={variants}
      transition={enterTransition(delay)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export interface RevealStaggerProps extends Omit<MotionDivProps, "initial" | "animate" | "whileInView" | "viewport" | "variants"> {
  mode?: "scroll" | "mount";
  /** Override default stagger interval between children (seconds). */
  staggerChildren?: number;
}

export function RevealStagger({
  mode = "scroll",
  staggerChildren,
  children,
  ...props
}: RevealStaggerProps) {
  const { viewport, staggerContainerVariant, prefersReducedMotion } =
    useMotionConfig();
  const { ref, initial, animate } = useRevealVisibility(
    viewport as UseInViewOptions
  );
  const container: Variants =
    staggerChildren != null
      ? {
          hidden: {},
          visible: {
            transition: { staggerChildren, delayChildren: 0 },
          },
        }
      : staggerContainerVariant();

  if (mode === "mount") {
    return (
      <motion.div
        initial={prefersReducedMotion ? false : "hidden"}
        animate="visible"
        variants={container}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      variants={container}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export interface RevealItemProps extends Omit<MotionDivProps, "variants" | "transition"> {
  delay?: number;
}

export function RevealItem({ delay = 0, children, ...props }: RevealItemProps) {
  const { enterTransition, staggerItemVariant, prefersReducedMotion } =
    useMotionConfig();

  return (
    <motion.div
      variants={staggerItemVariant()}
      transition={enterTransition(delay)}
      {...(prefersReducedMotion
        ? { initial: false as const, animate: "visible" as const }
        : {})}
      {...props}
    >
      {children}
    </motion.div>
  );
}
