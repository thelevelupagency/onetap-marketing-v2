"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { StepIllustration } from "@/components/marketing/sections/step-illustration";
import { useMotionConfig } from "@/lib/motion";
import { type as typography } from "@/lib/typography";
import { cn } from "@/lib/utils";
import type { ProcessStep } from "@/components/marketing/sections/process1";

interface Process1StepsProps {
  steps: readonly ProcessStep[];
  stepBadgeBg: string;
}

export function Process1Steps({ steps, stepBadgeBg }: Process1StepsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);
  const ratiosRef = useRef<Map<number, number>>(new Map());
  const { enterTransition, isMobile } = useMotionConfig();

  const updateActiveFromRatios = useCallback(() => {
    let best = 0;
    let maxRatio = 0;
    ratiosRef.current.forEach((ratio, index) => {
      if (ratio > maxRatio) {
        maxRatio = ratio;
        best = index;
      }
    });
    if (maxRatio > 0) setActiveIndex(best);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const ratios = ratiosRef.current;

    steps.forEach((_, index) => {
      const el = stepRefs.current[index];
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            ratios.set(index, entry.intersectionRatio);
          });
          updateActiveFromRatios();
        },
        {
          threshold: [0, 0.25, 0.5, 0.75, 1],
          rootMargin: "-12% 0px -38% 0px",
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((o) => o.disconnect());
      ratios.clear();
    };
  }, [steps, updateActiveFromRatios]);

  const progressScale =
    steps.length > 1 ? (activeIndex + 1) / steps.length : 1;

  return (
    <ul className="relative w-full lg:pl-20">
      {!isMobile ? (
        <div
          className="pointer-events-none absolute top-0 left-0 hidden h-full w-px overflow-hidden bg-brand-midnight/10 lg:block"
          aria-hidden
        >
          <motion.div
            className="h-full w-full origin-top bg-brand-turquoise will-change-transform"
            initial={false}
            animate={{ scaleY: progressScale }}
            transition={enterTransition(0)}
          />
        </div>
      ) : null}

      {steps.map((step, index) => {
        const isActive = index === activeIndex;

        return (
          <li
            key={step.step}
            ref={(el) => {
              stepRefs.current[index] = el;
            }}
            id={index === 0 ? "step-create" : undefined}
            className={cn(
              "relative flex flex-col gap-marketing-grid-gap border-t border-brand-midnight/10 py-marketing-grid-gap-md first:border-t-0 lg:gap-marketing-grid-gap-md lg:py-marketing-grid-gap-md",
              "transition-opacity duration-500 ease-out",
              isActive ? "opacity-100" : "opacity-55"
            )}
          >
            <StepIllustration className="absolute top-marketing-grid-gap-md right-0 text-brand-turquoise lg:top-marketing-grid-gap-md" />

            <div className="flex items-start gap-marketing-grid-gap pr-8">
              <div
                className={cn(
                  "flex size-12 shrink-0 items-center justify-center px-4 py-1 font-display text-sm font-bold tracking-tight text-brand-midnight",
                  "ring-2 transition-[box-shadow] duration-500",
                  stepBadgeBg,
                  isActive ? "ring-brand-turquoise/40" : "ring-transparent"
                )}
              >
                {step.step}
              </div>
              <div className="min-w-0 flex-1">
                <p
                  className={cn(
                    `${typography.eyebrow} mb-2 min-h-[1.25rem] text-brand-turquoise-dark transition-opacity duration-500`,
                    step.highlight ? "opacity-100" : "opacity-0"
                  )}
                  aria-hidden={!step.highlight}
                >
                  {step.highlight ?? "\u00a0"}
                </p>
                <h3 className={`${typography.stepTitle} mb-4`}>{step.title}</h3>
                <p className={`${typography.bodySm} max-w-2xl`}>{step.description}</p>
              </div>
            </div>

            <div
              className={cn(
                "relative aspect-video w-full overflow-hidden rounded-2xl border shadow-sm transition-[border-color,box-shadow] duration-500",
                isActive
                  ? "border-brand-turquoise/25 shadow-soft-diffusion"
                  : "border-brand-midnight/5"
              )}
            >
              <Image
                src={step.image}
                alt={step.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
