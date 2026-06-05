"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { MarketingPhonePreview } from "@/components/marketing/phones/marketing-phone-preview";
import {
  CARD_SCREENSHOT_BARBER,
  CARD_SCREENSHOT_FITNESS,
  CARD_SCREENSHOT_INTERIOR,
} from "@/lib/phone-screenshots";
import { FloatWrap } from "@/components/marketing/phones/float-wrap";
import { EASE_OUT, useMotionConfig } from "@/lib/motion";
import { PHONE_OUTER_HEIGHT, phoneLayoutDimensions } from "@/lib/phone-mockup";

const FAN_WIDTH = 460;
const CENTER_SCALE = 0.65;
const SIDE_SCALE = 0.56;
const FAN_ROTATION_DEG = 12;
const MOBILE_FAN_ROTATION_DEG = 8;
const FAN_CANVAS_H = Math.round(PHONE_OUTER_HEIGHT * CENTER_SCALE);

const MOBILE_PHONE_EASE = EASE_OUT;
const MOBILE_PHONE_DURATION = 0.48;

/** Horizontal bleed from ±rotation side phones (bottom-origin rotation). */
function horizontalBleedForRotation(width: number, height: number, degrees: number): number {
  const rad = (degrees * Math.PI) / 180;
  const sin = Math.sin(rad);
  const cos = Math.cos(rad);
  const corners: [number, number][] = [
    [0, 0],
    [width, 0],
    [width, -height],
    [0, -height],
  ];
  let minX = 0;
  let maxX = width;
  for (const [x, y] of corners) {
    const xr = x * cos + y * sin;
    minX = Math.min(minX, xr);
    maxX = Math.max(maxX, xr);
  }
  return Math.ceil(Math.max(-minX, maxX - width));
}

const sideLayout = phoneLayoutDimensions(SIDE_SCALE);
const FAN_BLEED_X = horizontalBleedForRotation(
  sideLayout.width,
  sideLayout.height,
  FAN_ROTATION_DEG
);
const FAN_CANVAS_W = FAN_WIDTH + FAN_BLEED_X * 2;

const MOBILE_FAN_BLEED_X = horizontalBleedForRotation(
  sideLayout.width,
  sideLayout.height,
  MOBILE_FAN_ROTATION_DEG
);

function useFanScale(containerRef: React.RefObject<HTMLDivElement | null>) {
  const [fanScale, setFanScale] = useState(1);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      const width = el.getBoundingClientRect().width;
      setFanScale(Math.min(1, width / FAN_CANVAS_W));
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [containerRef]);

  return fanScale;
}

function PhoneClipShell({
  scale,
  children,
}: {
  scale: number;
  children: React.ReactNode;
}) {
  const layout = phoneLayoutDimensions(scale);

  return (
    <div
      className="overflow-hidden isolate"
      style={{
        width: layout.width,
        height: layout.height,
        borderRadius: layout.outerRadius,
      }}
    >
      {children}
    </div>
  );
}

/**
 * Hero fan: canvas includes bleed for rotated side phones; scales to column
 * width via ResizeObserver and clips each phone so screenshots stay in frame.
 */
interface HeroPhonePreviewProps {
  /** Live slug for the center phone Safari bar (defaults to demo slug). */
  centerSlug?: string;
}

export function HeroPhonePreview({ centerSlug = "almog-menashe" }: HeroPhonePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const fanScale = useFanScale(containerRef);
  const { prefersReducedMotion, isMobile, enterTransition } = useMotionConfig();
  const skipInitial = prefersReducedMotion;

  const useMobileFan = isMobile && !prefersReducedMotion;

  const sideDelay = prefersReducedMotion ? 0 : 0.5;
  const sideDelayRight = prefersReducedMotion ? 0 : 0.6;
  const centerDelay = prefersReducedMotion ? 0 : 0.3;
  const duration = prefersReducedMotion ? 0.01 : 0.85;

  const sideInitial = prefersReducedMotion
    ? { opacity: 0 }
    : { opacity: 0, y: 40, rotate: -24 };
  const sideAnimate = prefersReducedMotion
    ? { opacity: 0.9 }
    : { opacity: 0.9, y: 0, rotate: -FAN_ROTATION_DEG };
  const sideInitialRight = prefersReducedMotion
    ? { opacity: 0 }
    : { opacity: 0, y: 40, rotate: 24 };
  const sideAnimateRight = prefersReducedMotion
    ? { opacity: 0.9 }
    : { opacity: 0.9, y: 0, rotate: FAN_ROTATION_DEG };
  const centerInitial = prefersReducedMotion
    ? { opacity: 0 }
    : { opacity: 0, y: 48, scale: 0.92 };
  const centerAnimate = prefersReducedMotion
    ? { opacity: 1 }
    : { opacity: 1, y: 0, scale: 1 };

  const phoneTransition = {
    ...enterTransition(0),
    duration,
    ease: EASE_OUT,
  };

  const mobileTransition = (delay: number) => ({
    duration: MOBILE_PHONE_DURATION,
    delay,
    ease: MOBILE_PHONE_EASE,
  });

  return (
    <div
      ref={containerRef}
      className="relative mx-auto w-full leading-none"
      style={{
        maxWidth: FAN_CANVAS_W,
        aspectRatio: `${FAN_CANVAS_W} / ${FAN_CANVAS_H}`,
      }}
    >
      <div
        className="absolute top-0 left-1/2"
        style={{
          width: FAN_CANVAS_W,
          height: FAN_CANVAS_H,
          transform: `translateX(-50%) scale(${fanScale})`,
          transformOrigin: "top center",
        }}
      >
        {useMobileFan ? (
          <>
            <motion.div
              className="absolute bottom-0 z-[1] origin-bottom"
              style={{ left: MOBILE_FAN_BLEED_X }}
              initial={skipInitial ? false : { opacity: 0, y: 10, rotate: -14 }}
              animate={{ opacity: 0.88, y: 0, rotate: -MOBILE_FAN_ROTATION_DEG }}
              transition={mobileTransition(0.14)}
            >
              <PhoneClipShell scale={SIDE_SCALE}>
                <MarketingPhonePreview
                  scale={SIDE_SCALE}
                  url="sofi-schwartz"
                  imageSrc={CARD_SCREENSHOT_INTERIOR}
                  alt="Interior designer OneTap digital business card"
                />
              </PhoneClipShell>
            </motion.div>

            <motion.div
              className="absolute bottom-0 z-[1] origin-bottom"
              style={{ right: MOBILE_FAN_BLEED_X }}
              initial={skipInitial ? false : { opacity: 0, y: 10, rotate: 14 }}
              animate={{ opacity: 0.88, y: 0, rotate: MOBILE_FAN_ROTATION_DEG }}
              transition={mobileTransition(0.18)}
            >
              <PhoneClipShell scale={SIDE_SCALE}>
                <MarketingPhonePreview
                  scale={SIDE_SCALE}
                  url="franklin-barbershop"
                  imageSrc={CARD_SCREENSHOT_BARBER}
                  alt="Barbershop OneTap digital business card"
                />
              </PhoneClipShell>
            </motion.div>

            <motion.div
              className="absolute bottom-0 left-1/2 z-10 -translate-x-1/2 origin-bottom"
              initial={skipInitial ? false : { opacity: 0, y: 16, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={mobileTransition(0)}
            >
              <PhoneClipShell scale={CENTER_SCALE}>
                <MarketingPhonePreview
                  scale={CENTER_SCALE}
                  url={centerSlug}
                  imageSrc={CARD_SCREENSHOT_FITNESS}
                  alt="Fitness professional OneTap digital business card"
                  priority
                />
              </PhoneClipShell>
            </motion.div>
          </>
        ) : (
          <>
            <motion.div
              className="absolute bottom-0 z-[1] origin-bottom"
              style={{ left: FAN_BLEED_X }}
              initial={skipInitial ? false : sideInitial}
              animate={sideAnimate}
              transition={{ ...phoneTransition, delay: sideDelay }}
            >
              <FloatWrap delay={0.35}>
                <PhoneClipShell scale={SIDE_SCALE}>
                  <MarketingPhonePreview
                    scale={SIDE_SCALE}
                    url="sofi-schwartz"
                    imageSrc={CARD_SCREENSHOT_INTERIOR}
                    alt="Interior designer OneTap digital business card"
                  />
                </PhoneClipShell>
              </FloatWrap>
            </motion.div>

            <motion.div
              className="absolute bottom-0 z-[1] origin-bottom"
              style={{ right: FAN_BLEED_X }}
              initial={skipInitial ? false : sideInitialRight}
              animate={sideAnimateRight}
              transition={{ ...phoneTransition, delay: sideDelayRight }}
            >
              <FloatWrap delay={0.7}>
                <PhoneClipShell scale={SIDE_SCALE}>
                  <MarketingPhonePreview
                    scale={SIDE_SCALE}
                    url="franklin-barbershop"
                    imageSrc={CARD_SCREENSHOT_BARBER}
                    alt="Barbershop OneTap digital business card"
                  />
                </PhoneClipShell>
              </FloatWrap>
            </motion.div>

            <motion.div
              className="absolute bottom-0 left-1/2 z-10 -translate-x-1/2 origin-bottom"
              initial={skipInitial ? false : centerInitial}
              animate={centerAnimate}
              transition={{ ...phoneTransition, delay: centerDelay }}
            >
              <FloatWrap delay={0}>
                <PhoneClipShell scale={CENTER_SCALE}>
                  <MarketingPhonePreview
                    scale={CENTER_SCALE}
                    url={centerSlug}
                    imageSrc={CARD_SCREENSHOT_FITNESS}
                    alt="Fitness professional OneTap digital business card"
                    priority
                  />
                </PhoneClipShell>
              </FloatWrap>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
