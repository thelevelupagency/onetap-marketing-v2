"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { MarketingBadge, MarketingContainer } from "@/components/marketing/primitives";
import { RevealStagger, RevealItem } from "@/components/marketing/motion/reveal";
import { GetCardCta } from "@/components/marketing/get-card-cta";
import { useMotionConfig } from "@/lib/motion";
import { type as typography } from "@/lib/typography";
import { cn } from "@/lib/utils";
import type { ProcessStep } from "@/components/marketing/sections/process1";

interface ProcessGraphTimelineProps {
  title: string;
  accent?: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
  steps: readonly ProcessStep[];
  stepBadgeBg?: string;
}

// Desktop node coordinates for viewBox "0 0 1200 680"
// Ultra-subtle, smooth stock growth curve:
// Node 1 (Step 01): x = 340, y = 420
// Node 2 (Step 02): x = 600, y = 270
// Node 3 (Step 03): x = 860, y = 140
const DESKTOP_NODES = [
  { x: 340, y: 420, watermarkX: "20%", watermarkY: "44%" },
  { x: 600, y: 270, watermarkX: "44%", watermarkY: "23%" },
  { x: 860, y: 140, watermarkX: "68%", watermarkY: "2%" },
] as const;

export function ProcessGraphTimeline({
  title,
  accent,
  description,
  ctaLabel = "Get your card free",
  ctaHref,
  steps,
}: ProcessGraphTimelineProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ratiosRef = useRef<Map<number, number>>(new Map());
  const { enterTransition, prefersReducedMotion } = useMotionConfig();

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

  const handleStepClick = useCallback((index: number) => {
    setActiveIndex(index);
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      const el = stepRefs.current[index];
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, []);

  useEffect(() => {
    // Disable scroll-based step switching on desktop viewports (lg: 1024px+)
    // Desktop active step is controlled exclusively by click and hover for optimal desktop UI/UX
    if (typeof window !== "undefined" && window.innerWidth >= 1024) {
      return;
    }

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
          threshold: [0, 0.2, 0.5, 0.8, 1],
          rootMargin: "-15% 0px -35% 0px",
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

  // Ultra-subtle, smooth growth curve: starts low (-80, 540) -> Step 1 (340, 420) -> subtle micro-dip (470, 430) -> Step 2 (600, 270) -> subtle micro-dip (730, 280) -> Step 3 (860, 140) -> End inclined (1280, 80)
  const desktopCurvePath =
    "M -80,540 C 50,540 220,440 340,420 C 410,415 440,432 470,430 C 510,428 560,278 600,270 C 640,265 690,282 730,280 C 770,278 820,148 860,140 C 920,135 980,152 1020,150 C 1090,145 1200,90 1280,80";

  // Soft gradient area fill under the curve
  const desktopAreaPath =
    "M -80,540 C 50,540 220,440 340,420 C 410,415 440,432 470,430 C 510,428 560,278 600,270 C 640,265 690,282 730,280 C 770,278 820,148 860,140 C 920,135 980,152 1020,150 C 1090,145 1200,90 1280,80 L 1280,680 L -80,680 Z";

  return (
    <div className="relative w-full overflow-visible">
      {/* Container-Aligned Header Layer with Staggered Scroll Reveal */}
      <MarketingContainer width="wide" className="relative z-30 pointer-events-none">
        {/* MOBILE HEADER (< lg screen) */}
        <RevealStagger className="mb-8 flex flex-col items-start lg:hidden pointer-events-auto">
          <RevealItem>
            <MarketingBadge className="mb-3">The Process</MarketingBadge>
          </RevealItem>
          <RevealItem delay={0.1}>
            <h2 className={cn(typography.sectionTitle, "mb-3 text-brand-midnight")}>
              {title}{" "}
              {accent ? (
                <span className="bg-gradient-to-r from-brand-turquoise to-cyan-500 bg-clip-text text-transparent">
                  {accent}
                </span>
              ) : null}
            </h2>
          </RevealItem>
          <RevealItem delay={0.2}>
            <p className={cn(typography.bodySm, "mb-6 text-brand-midnight/70 max-w-xl")}>
              {description}
            </p>
          </RevealItem>
          <RevealItem delay={0.3}>
            <GetCardCta href={ctaHref} size="md" placement="process">
              {ctaLabel}
            </GetCardCta>
          </RevealItem>
        </RevealStagger>

        {/* DESKTOP HEADER (lg+ screen: absolute overlay aligned with site grid) */}
        <RevealStagger className="hidden lg:flex flex-col items-start max-w-md pointer-events-auto">
          <RevealItem>
            <MarketingBadge className="mb-3">The Process</MarketingBadge>
          </RevealItem>
          <RevealItem delay={0.1}>
            <h2 className={cn(typography.sectionTitle, "mb-3 text-brand-midnight")}>
              {title}{" "}
              {accent ? (
                <span className="bg-gradient-to-r from-brand-turquoise to-cyan-500 bg-clip-text text-transparent">
                  {accent}
                </span>
              ) : null}
            </h2>
          </RevealItem>
          <RevealItem delay={0.2}>
            <p className={cn(typography.bodySm, "mb-6 text-brand-midnight/75 max-w-sm leading-relaxed")}>
              {description}
            </p>
          </RevealItem>
          <RevealItem delay={0.3}>
            <GetCardCta href={ctaHref} size="md" placement="process">
              {ctaLabel}
            </GetCardCta>
          </RevealItem>
        </RevealStagger>
      </MarketingContainer>

      {/* FULL-SECTION FULL-BLEED GRAPH TIMELINE CANVAS */}
      <div className="relative w-full min-h-[660px] lg:min-h-[700px] -mt-0 lg:-mt-48 overflow-visible">

        {/* DESKTOP FULL-SECTION GRAPH (lg and above) */}
        <div className="relative hidden size-full lg:block overflow-visible">
          {/* Ambient persistent glow highlights */}
          <div className="pointer-events-none absolute top-1/4 left-1/3 size-96 rounded-full bg-brand-turquoise/15 blur-3xl" />
          <div className="pointer-events-none absolute top-0 right-10 size-96 rounded-full bg-cyan-400/15 blur-3xl" />

          {/* Watermark numbers in background */}
          {steps.map((step, index) => {
            const isActive = index === activeIndex;
            const pos = DESKTOP_NODES[index] || DESKTOP_NODES[0];

            return (
              <div
                key={`watermark-${step.step}`}
                className={cn(
                  "pointer-events-none absolute select-none font-display font-black leading-none transition-all duration-500 z-0",
                  isActive
                    ? "text-brand-turquoise/25 scale-110"
                    : "text-brand-midnight/5 scale-100"
                )}
                style={{
                  left: pos.watermarkX,
                  top: pos.watermarkY,
                  fontSize: "180px",
                }}
                aria-hidden
              >
                {index + 1}
              </div>
            );
          })}

          {/* SVG Canvas stretching 100% full width across section background */}
          <div className="relative h-[660px] lg:h-[700px] w-full overflow-visible">
            <svg
              className="absolute inset-0 size-full pointer-events-none overflow-visible"
              viewBox="0 0 1200 680"
              preserveAspectRatio="none"
              aria-hidden
            >
              <defs>
                {/* Vibrant persistent gradient */}
                <linearGradient id="fullBleedGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00F2FE" stopOpacity="0.85" />
                  <stop offset="50%" stopColor="#00F2FE" stopOpacity="1" />
                  <stop offset="100%" stopColor="#38BDF8" stopOpacity="1" />
                </linearGradient>

                {/* Soft gradient fill under graph area */}
                <linearGradient id="fullBleedAreaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#00F2FE" stopOpacity="0.14" />
                  <stop offset="100%" stopColor="#00F2FE" stopOpacity="0.0" />
                </linearGradient>

                {/* Persistent high-luminance blur glow filter with unclipped bounds */}
                <filter id="fullBleedGlowFilter" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="6" result="blur1" />
                  <feGaussianBlur stdDeviation="14" result="blur2" />
                  <feMerge>
                    <feMergeNode in="blur2" />
                    <feMergeNode in="blur1" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Faint Horizontal Chart Trendlines */}
              <line x1="-200" y1="160" x2="1400" y2="160" stroke="rgba(15,23,42,0.04)" strokeDasharray="4 4" />
              <line x1="-200" y1="320" x2="1400" y2="320" stroke="rgba(15,23,42,0.04)" strokeDasharray="4 4" />
              <line x1="-200" y1="480" x2="1400" y2="480" stroke="rgba(15,23,42,0.04)" strokeDasharray="4 4" />

              {/* Subtle Gradient Area Fill Under Graph */}
              <path
                d={desktopAreaPath}
                fill="url(#fullBleedAreaGradient)"
              />

              {/* Persistent Glow Stroke */}
              <path
                d={desktopCurvePath}
                fill="none"
                stroke="#00F2FE"
                strokeWidth="12"
                strokeOpacity="0.35"
                filter="url(#fullBleedGlowFilter)"
              />

              {/* Base Glowing Guide Line */}
              <path
                d={desktopCurvePath}
                fill="none"
                stroke="url(#fullBleedGradient)"
                strokeWidth="4"
                strokeDasharray="6 6"
                className="opacity-50"
              />

              {/* Dynamic Animated Scroll Path */}
              <motion.path
                d={desktopCurvePath}
                fill="none"
                stroke="url(#fullBleedGradient)"
                strokeWidth="4.5"
                strokeLinecap="round"
                initial={{ pathLength: 0.33 }}
                animate={{ pathLength: (activeIndex + 1) / steps.length }}
                transition={enterTransition(0)}
              />

              {/* Infinite Travelling Light / Glow Beam Pulse along path */}
              <motion.path
                d={desktopCurvePath}
                fill="none"
                stroke="#00F2FE"
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray="140 1200"
                initial={{ strokeDashoffset: 1340 }}
                animate={{ strokeDashoffset: [-140, -1340] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                }}
                filter="url(#fullBleedGlowFilter)"
              />
            </svg>

            {/* Nodes directly ON the curve with click selection & hover emphasis (no scroll-intersection tracking on desktop) */}
            <div className="relative size-full overflow-visible">
              {steps.map((step, index) => {
                const isActive = index === activeIndex;
                const pos = DESKTOP_NODES[index] || DESKTOP_NODES[0];

                return (
                  <motion.div
                    key={step.step}
                    ref={(el) => {
                      stepRefs.current[index] = el;
                    }}
                    onClick={() => handleStepClick(index)}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-10"
                    style={{
                      left: `${(pos.x / 1200) * 100}%`,
                      top: `${(pos.y / 680) * 100}%`,
                    }}
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={enterTransition(index * 0.15)}
                  >
                    {/* Node Dot Marker - Selected on click & highlighted on hover */}
                    <div className="relative flex items-center justify-center">
                      <div
                        className={cn(
                          "absolute -inset-3 rounded-full blur-md transition-all duration-300",
                          isActive ? "bg-brand-turquoise/40 animate-pulse" : "bg-brand-turquoise/25 opacity-0 group-hover:opacity-100"
                        )}
                      />

                      <div
                        className={cn(
                          "relative size-9 rounded-full border-2 bg-white transition-all duration-300 flex items-center justify-center shadow-lg",
                          isActive
                            ? "border-brand-navy ring-4 ring-brand-turquoise/30 scale-110 shadow-soft-diffusion"
                            : "border-brand-navy/80 group-hover:border-brand-navy group-hover:scale-110"
                        )}
                      >
                        <div
                          className={cn(
                            "size-3.5 rounded-full transition-colors duration-300",
                            isActive ? "bg-brand-turquoise" : "bg-brand-midnight/40 group-hover:bg-brand-turquoise/80"
                          )}
                        />
                      </div>
                    </div>

                    {/* Step Card - Solid White Background (bg-white) with Pure CSS Hover & Click Selection */}
                    <div
                      className={cn(
                        "absolute left-1/2 w-64 xl:w-72 -translate-x-1/2 top-8 mt-2 rounded-3xl border-2 bg-white p-6 shadow-sm transition-all duration-300 opacity-100",
                        isActive
                          ? "border-brand-navy shadow-soft-diffusion ring-2 ring-brand-navy/20 z-30 scale-105 -translate-y-1.5"
                          : "border-brand-navy shadow-sm z-20 hover:-translate-y-1.5 hover:shadow-soft-diffusion scale-100"
                      )}
                    >
                      <h3 className={cn(typography.cardTitle, "font-semibold leading-snug text-brand-midnight mb-2")}>
                        {step.title}
                      </h3>
                      <p className={cn(typography.bodySm, "text-brand-midnight/70 leading-relaxed")}>
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* MOBILE TIMELINE (< lg screen) */}
        <MarketingContainer width="wide" className="block lg:hidden">
          <div className="relative w-full pt-2 pb-0">
            {/* Continuous Vertical Timeline Line: Starts below mobile header (top-6) and extends 100% to exact section bottom edge (-bottom-24) */}
            <div
              className="absolute left-6 top-6 -bottom-24 w-1 pointer-events-none z-0"
              aria-hidden
            >
              {/* Base Guide Glow Line */}
              <div className="size-full bg-gradient-to-b from-brand-turquoise via-cyan-400 to-brand-turquoise opacity-40 rounded-full blur-[1px]" />
              <div className="absolute inset-0 size-full bg-gradient-to-b from-brand-turquoise via-cyan-400 to-brand-turquoise opacity-70 rounded-full shadow-[0_0_12px_#00F2FE]" />
              
              {/* Dynamic Active Progress Height */}
              <motion.div
                className="w-full bg-brand-turquoise rounded-full origin-top shadow-[0_0_16px_#00F2FE]"
                initial={{ scaleY: 0.33 }}
                animate={{ scaleY: (activeIndex + 1) / steps.length }}
                transition={enterTransition(0)}
              />

              {/* Infinite Travelling Light / Glow Beam Pulse along full vertical section line */}
              <motion.div
                className="absolute left-0 w-full h-24 bg-gradient-to-b from-transparent via-[#00F2FE] to-transparent rounded-full shadow-[0_0_20px_#00F2FE]"
                initial={{ top: "-10%" }}
                animate={{ top: "110%" }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </div>

            {/* Vertical Stacked Mobile Step Cards with Auto Scroll-Focus and Smooth Scroll-To-Click Behavior */}
            <div className="flex flex-col gap-8">
              {steps.map((step, index) => {
                const isActive = index === activeIndex;

                return (
                  <motion.div
                    key={step.step}
                    ref={(el) => {
                      stepRefs.current[index] = el;
                    }}
                    onClick={() => handleStepClick(index)}
                    initial={prefersReducedMotion ? false : { opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={enterTransition(index * 0.12)}
                    className="relative flex items-start gap-4 pl-2 cursor-pointer"
                  >
                    {/* Node Dot Marker - Active focus matching desktop */}
                    <div className="relative z-10 mt-2 flex shrink-0 items-center justify-center">
                      <div
                        className={cn(
                          "absolute -inset-2.5 rounded-full blur-md transition-all duration-300",
                          isActive ? "bg-brand-turquoise/40 animate-pulse" : "bg-brand-turquoise/25 opacity-0"
                        )}
                      />
                      <div
                        className={cn(
                          "relative size-8 rounded-full border-2 bg-white flex items-center justify-center transition-all duration-300 shadow-md",
                          isActive
                            ? "border-brand-navy ring-4 ring-brand-turquoise/30 scale-110 shadow-soft-diffusion"
                            : "border-brand-navy/80 scale-100"
                        )}
                      >
                        <div
                          className={cn(
                            "size-3 rounded-full transition-colors duration-300",
                            isActive ? "bg-brand-turquoise" : "bg-brand-midnight/40"
                          )}
                        />
                      </div>
                    </div>

                    {/* Mobile Card - Focus elevation & ring animation on scroll matching desktop click/active state */}
                    <div
                      className={cn(
                        "relative flex-1 rounded-3xl border-2 bg-white p-5 transition-all duration-300 overflow-hidden opacity-100",
                        isActive
                          ? "border-brand-navy ring-2 ring-brand-navy/20 shadow-soft-diffusion scale-105 -translate-y-1 z-20"
                          : "border-brand-navy shadow-sm scale-100 translate-y-0 z-10"
                      )}
                    >
                      <span
                        className={cn(
                          "absolute right-4 top-2 select-none font-display font-black text-6xl leading-none transition-colors duration-300 pointer-events-none",
                          isActive ? "text-brand-turquoise/20" : "text-brand-midnight/5"
                        )}
                        aria-hidden
                      >
                        {index + 1}
                      </span>

                      <div className="relative z-10">
                        <h3 className={cn(typography.cardTitle, "font-semibold leading-snug text-brand-midnight mb-2")}>
                          {step.title}
                        </h3>
                        <p className={cn(typography.bodySm, "text-brand-midnight/70 leading-relaxed")}>
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </MarketingContainer>

      </div>
    </div>
  );
}
