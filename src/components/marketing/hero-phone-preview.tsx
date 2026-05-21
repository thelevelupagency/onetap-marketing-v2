"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  MarketingPhonePreview,
  CARD_SCREENSHOT_FITNESS,
  CARD_SCREENSHOT_INTERIOR,
  CARD_SCREENSHOT_BARBER,
} from "@/components/marketing/marketing-phone-preview";
import { PHONE_OUTER_HEIGHT, phoneLayoutDimensions } from "@/lib/phone-mockup";

const FAN_WIDTH = 460;
const CENTER_SCALE = 0.65;
const SIDE_SCALE = 0.56;
const FAN_ROTATION_DEG = 12;
const FAN_CANVAS_H = Math.round(PHONE_OUTER_HEIGHT * CENTER_SCALE);

/** Horizontal bleed from ±12° side phones (bottom-origin rotation). */
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

function FloatWrap({ delay, children }: { delay: number; children: React.ReactNode }) {
  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Hero fan: canvas includes bleed for rotated side phones; scales to column
 * width via ResizeObserver and clips each phone so screenshots stay in frame.
 */
export function HeroPhonePreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const fanScale = useFanScale(containerRef);

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
        <motion.div
          className="absolute bottom-0 z-[1] origin-bottom"
          style={{ left: FAN_BLEED_X }}
          initial={{ opacity: 0, y: 40, rotate: -24 }}
          animate={{ opacity: 0.9, y: 0, rotate: -12 }}
          transition={{ duration: 0.85, delay: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
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
          initial={{ opacity: 0, y: 40, rotate: 24 }}
          animate={{ opacity: 0.9, y: 0, rotate: 12 }}
          transition={{ duration: 0.85, delay: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
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
          initial={{ opacity: 0, y: 48, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <FloatWrap delay={0}>
            <PhoneClipShell scale={CENTER_SCALE}>
              <MarketingPhonePreview
                scale={CENTER_SCALE}
                url="almog-menashe"
                imageSrc={CARD_SCREENSHOT_FITNESS}
                alt="Fitness professional OneTap digital business card"
                priority
              />
            </PhoneClipShell>
          </FloatWrap>
        </motion.div>
      </div>
    </div>
  );
}
