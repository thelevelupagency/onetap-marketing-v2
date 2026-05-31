"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  ContactRound,
  UserPlus,
  type LucideIcon,
} from "lucide-react";
import { FloatWrap } from "@/components/marketing/phones/float-wrap";
import { useMotionConfig } from "@/lib/motion";
import { useRevealVisibility } from "@/lib/motion/use-reveal-visibility";
import { cn } from "@/lib/utils";

export type CardUxBubbleConfig = {
  id: string;
  icon: LucideIcon;
  label: string;
  value: string;
  positionClassName: string;
  floatDelay: number;
  floatDuration: number;
  showLiveDot?: boolean;
};

export const CARD_UX_BUBBLES: CardUxBubbleConfig[] = [
  {
    id: "analytics",
    icon: BarChart3,
    label: "Views this week",
    value: "+847",
    positionClassName:
      "absolute right-0 top-[20%] z-10 max-md:max-w-[9.5rem] md:-right-3",
    floatDelay: 0,
    floatDuration: 5,
    showLiveDot: true,
  },
  {
    id: "leads",
    icon: UserPlus,
    label: "New leads",
    value: "12",
    positionClassName:
      "absolute left-0 top-[46%] z-10 max-md:max-w-[9.5rem] md:-left-6",
    floatDelay: 0.4,
    floatDuration: 5.2,
  },
  {
    id: "save",
    icon: ContactRound,
    label: "Contact saved",
    value: "1 tap",
    positionClassName:
      "absolute -right-1 top-[68%] z-10 hidden sm:block sm:-right-2",
    floatDelay: 0.8,
    floatDuration: 5.5,
  },
];

type PhonePreviewBubbleProps = {
  icon: LucideIcon;
  label: string;
  value: string;
  showLiveDot?: boolean;
  className?: string;
};

export function PhonePreviewBubble({
  icon: Icon,
  label,
  value,
  showLiveDot = false,
  className,
}: PhonePreviewBubbleProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2.5 rounded-2xl border border-brand-midnight/5 bg-white/95 px-3 py-2.5 shadow-soft-diffusion backdrop-blur-md",
        className
      )}
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-brand-turquoise/20 bg-brand-turquoise/10">
        <Icon className="h-4 w-4 text-brand-turquoise-dark" aria-hidden />
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-1.5">
          {showLiveDot ? (
            <span
              className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-turquoise animate-pulse"
              aria-hidden
            />
          ) : null}
          <p className="text-[11px] leading-tight text-brand-midnight/55">{label}</p>
        </div>
        <p className="text-sm font-semibold leading-tight text-brand-midnight">{value}</p>
      </div>
    </div>
  );
}

type CardUxPhoneBubblesProps = {
  className?: string;
};

export function CardUxPhoneBubbles({ className }: CardUxPhoneBubblesProps) {
  const { viewport, tokens, prefersReducedMotion } = useMotionConfig();
  const { ref, initial, animate } = useRevealVisibility({
    ...viewport,
    margin: "-80px",
  });

  const bubbleEnter = prefersReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : { hidden: { opacity: 0, y: 16, scale: 0.92 }, visible: { opacity: 1, y: 0, scale: 1 } };

  const bubbleTransition = prefersReducedMotion
    ? { duration: 0.01 }
    : {
        type: "spring" as const,
        stiffness: tokens.staggerChildren > 0 ? 260 : 200,
        damping: 22,
      };

  const staggerDelay = tokens.staggerChildren || 0.12;

  return (
    <motion.div
      ref={ref}
      className={cn("pointer-events-none absolute inset-0", className)}
      initial={prefersReducedMotion ? false : initial}
      animate={prefersReducedMotion ? "visible" : animate}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: staggerDelay },
        },
      }}
    >
      {CARD_UX_BUBBLES.map((bubble) => (
        <motion.div
          key={bubble.id}
          className={bubble.positionClassName}
          variants={bubbleEnter}
          transition={bubbleTransition}
          {...(prefersReducedMotion
            ? { initial: false as const, animate: "visible" as const }
            : {})}
        >
          <FloatWrap delay={bubble.floatDelay} duration={bubble.floatDuration}>
            <PhonePreviewBubble
              icon={bubble.icon}
              label={bubble.label}
              value={bubble.value}
              showLiveDot={bubble.showLiveDot}
            />
          </FloatWrap>
        </motion.div>
      ))}
    </motion.div>
  );
}
