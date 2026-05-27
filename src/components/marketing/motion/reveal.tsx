"use client";

import {
  motion,
  type HTMLMotionProps,
  type Variants,
} from "framer-motion";
import { useMotionConfig } from "@/lib/motion";
import type { RevealDirection } from "@/lib/motion";

type MotionDivProps = HTMLMotionProps<"div">;

export interface RevealProps extends Omit<MotionDivProps, "initial" | "whileInView" | "viewport" | "variants" | "transition"> {
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
  const { viewport, enterTransition, revealVariant } = useMotionConfig();
  const variants = revealVariant(direction);

  if (mode === "mount") {
    return (
      <motion.div
        initial="hidden"
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
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={variants}
      transition={enterTransition(delay)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export interface RevealStaggerProps extends Omit<MotionDivProps, "initial" | "whileInView" | "viewport" | "variants"> {
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
  const { viewport, staggerContainerVariant } = useMotionConfig();
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
        initial="hidden"
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
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
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
  const { enterTransition, staggerItemVariant } = useMotionConfig();

  return (
    <motion.div
      variants={staggerItemVariant()}
      transition={enterTransition(delay)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
