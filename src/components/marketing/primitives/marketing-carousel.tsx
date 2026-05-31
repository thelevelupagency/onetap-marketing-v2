"use client";

import { useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsDesktopLg } from "@/lib/motion";
import {
  PAUSE_AFTER_INTERACTION_MS,
  useMarketingCarousel,
  useMarketingCarouselAutoplay,
} from "@/lib/use-marketing-carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  MarketingCarouselBleedTrack,
  marketingCarouselDotsInsetClass,
} from "./marketing-carousel-frame";
import { MarketingCarouselDots } from "./marketing-carousel-dots";

// ─── Shared constants (internal) ─────────────────────────────────────────────

const arrowLight =
  "border-brand-midnight/15 bg-white text-brand-midnight shadow-sm hover:bg-brand-cream disabled:opacity-30";
const arrowDark =
  "border-white/15 bg-white/10 text-brand-cream shadow-sm hover:bg-white/15 disabled:opacity-30";

/** Viewport padding so card hover shadows are not clipped by overflow-hidden. */
const CAROUSEL_VIEWPORT_PADDING = "pt-4 pb-8";

// ─── Types ────────────────────────────────────────────────────────────────────

export type CarouselDesktopMode = "threeUp" | "vertical";

export interface MarketingCarouselProps<T> {
  items: readonly T[];
  getKey: (item: T, index: number) => string;
  renderItem: (item: T, index: number) => React.ReactNode;
  ariaLabel: string;
  /** Desktop layout: 3-column horizontal or vertical single-column. Defaults to "threeUp". */
  desktopMode?: CarouselDesktopMode;
  onDark?: boolean;
  /** Autoplay interval in ms. Omit or 0 to disable. */
  autoplayInterval?: number;
  /** How many items to show at once in the vertical desktop track. Defaults to 3. */
  verticalVisibleCount?: number;
  className?: string;
}

/** Internal props shared by all three track variants. */
type TrackProps<T> = Omit<MarketingCarouselProps<T>, "desktopMode" | "className" | "verticalVisibleCount">;

// ─── Mobile: full-bleed horizontal peek carousel ─────────────────────────────

function MobileTrack<T,>({
  items,
  getKey,
  renderItem,
  ariaLabel,
  onDark = false,
  autoplayInterval = 0,
}: TrackProps<T>) {
  const { setApi, selectedIndex, snapCount, scrollTo, pausedUntilRef, api } =
    useMarketingCarousel();
  useMarketingCarouselAutoplay(api, autoplayInterval, pausedUntilRef);

  const arrowClass = onDark ? arrowDark : arrowLight;

  return (
    <div className="relative w-full min-w-0">
      <MarketingCarouselBleedTrack>
        <Carousel
          setApi={setApi}
          opts={{ loop: true, align: "start", containScroll: "trimSnaps" }}
          className="w-full"
        >
          <CarouselContent
            className="ml-0 items-stretch"
            viewportClassName={cn("touch-pan-y", CAROUSEL_VIEWPORT_PADDING)}
          >
            {items.map((item, i) => (
              <CarouselItem key={getKey(item, i)} className="basis-[88%] pr-3">
                <div className="flex h-full flex-col">{renderItem(item, i)}</div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious variant="brandOutline" className={arrowClass} />
          <CarouselNext variant="brandOutline" className={arrowClass} />
        </Carousel>
      </MarketingCarouselBleedTrack>

      <MarketingCarouselDots
        count={snapCount}
        selectedIndex={selectedIndex}
        onSelect={scrollTo}
        onDark={onDark}
        ariaLabel={ariaLabel}
        className={marketingCarouselDotsInsetClass}
      />
    </div>
  );
}

// ─── Desktop: horizontal 3-up carousel with arrows ───────────────────────────

function DesktopThreeUpTrack<T,>({
  items,
  getKey,
  renderItem,
  ariaLabel,
  onDark = false,
  autoplayInterval = 0,
}: TrackProps<T>) {
  const { setApi, selectedIndex, snapCount, scrollTo, api, pausedUntilRef } =
    useMarketingCarousel();
  useMarketingCarouselAutoplay(api, autoplayInterval, pausedUntilRef);

  return (
    <div className="relative min-w-0 overflow-visible px-10 xl:px-14">
      <Carousel
        setApi={setApi}
        opts={{ align: "start", loop: true, containScroll: "trimSnaps" }}
        className="w-full"
      >
        <CarouselContent
          className="-ml-4 items-stretch"
          viewportClassName={CAROUSEL_VIEWPORT_PADDING}
        >
          {items.map((item, i) => (
            <CarouselItem key={getKey(item, i)} className="basis-1/3 pl-4">
              <div className="flex h-full flex-col">{renderItem(item, i)}</div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious variant="brandOutline" className={onDark ? arrowDark : arrowLight} />
        <CarouselNext variant="brandOutline" className={onDark ? arrowDark : arrowLight} />
      </Carousel>

      <MarketingCarouselDots
        count={snapCount}
        selectedIndex={selectedIndex}
        onSelect={scrollTo}
        onDark={onDark}
        ariaLabel={ariaLabel}
      />
    </div>
  );
}

// ─── Desktop: vertical carousel with top/bottom arrows ───────────────────────

const VERTICAL_ITEM_H = 96;  // px — total height of each card slot
const VERTICAL_GAP = 12;     // px — gap between cards
const VERTICAL_VISIBLE = 3;  // how many cards are visible at once
const VERTICAL_PAD_X = 8;   // px — horizontal buffer so box-shadows aren't clipped
const VERTICAL_PAD_Y = 4;   // px — vertical buffer so box-shadows aren't clipped

/**
 * Pure CSS-transition vertical carousel — no Embla.
 * Drag: window-level mousemove/mouseup so the cursor can leave the
 * viewport without breaking the gesture.
 */
function DesktopVerticalTrack<T,>({
  items,
  getKey,
  renderItem,
  ariaLabel,
  onDark = false,
  autoplayInterval = 0,
  visibleCount = VERTICAL_VISIBLE,
}: TrackProps<T> & { visibleCount?: number }) {
  const maxIndex = Math.max(0, items.length - visibleCount);
  const [index, setIndex] = useState(0);
  const pausedUntilRef = useRef(0);
  const prefersReducedMotion = useReducedMotion() ?? false;

  // Drag state — ref holds the live value to avoid stale closures in window
  // listeners; state drives re-renders for the live visual offset.
  const dragStartY = useRef<number | null>(null);
  const dragOffsetRef = useRef(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const pause = useCallback(() => {
    pausedUntilRef.current = Date.now() + PAUSE_AFTER_INTERACTION_MS;
  }, []);

  const prev = useCallback(() => {
    pause();
    setIndex((i) => (i <= 0 ? maxIndex : i - 1));
  }, [pause, maxIndex]);

  const next = useCallback(() => {
    pause();
    setIndex((i) => (i >= maxIndex ? 0 : i + 1));
  }, [pause, maxIndex]);

  const goTo = useCallback(
    (i: number) => {
      pause();
      setIndex(((i % (maxIndex + 1)) + (maxIndex + 1)) % (maxIndex + 1));
    },
    [pause, maxIndex]
  );

  // Autoplay
  useEffect(() => {
    if (!autoplayInterval || maxIndex === 0 || prefersReducedMotion) return;
    const id = setInterval(() => {
      if (Date.now() < pausedUntilRef.current) return;
      setIndex((i) => (i >= maxIndex ? 0 : i + 1));
    }, autoplayInterval);
    return () => clearInterval(id);
  }, [autoplayInterval, maxIndex, prefersReducedMotion]);

  // Window-level drag listeners — attached only while dragging so they don't
  // accumulate. Committing reads from refs to avoid stale closure issues.
  useEffect(() => {
    if (!isDragging) return;

    const onMove = (e: MouseEvent) => {
      if (dragStartY.current === null) return;
      const offset = dragStartY.current - e.clientY;
      dragOffsetRef.current = offset;
      setDragOffset(offset);
    };

    const onUp = () => {
      const delta = dragOffsetRef.current;
      dragStartY.current = null;
      dragOffsetRef.current = 0;
      setDragOffset(0);
      setIsDragging(false);

      // ~1/3 of a slot is enough to commit to the next/prev item
      const threshold = (VERTICAL_ITEM_H + VERTICAL_GAP) / 3;
      if (delta > threshold) {
        setIndex((i) => (i >= maxIndex ? 0 : i + 1));
      } else if (delta < -threshold) {
        setIndex((i) => (i <= 0 ? maxIndex : i - 1));
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [isDragging, maxIndex]);

  // Content height for exactly visibleCount items + their gaps.
  // Adding 2×VERTICAL_PAD_Y creates breathing room above/below so shadows
  // and borders at the scroll boundary are never clipped.
  const viewportH =
    visibleCount * VERTICAL_ITEM_H +
    (visibleCount - 1) * VERTICAL_GAP +
    2 * VERTICAL_PAD_Y;
  const translateY = index * (VERTICAL_ITEM_H + VERTICAL_GAP);

  const btnClass = cn(
    "inline-flex size-8 items-center justify-center rounded-full border transition-colors",
    onDark ? arrowDark : arrowLight
  );

  return (
    <div
      className="flex w-full flex-col outline-none"
      role="region"
      aria-label={ariaLabel}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowUp") { e.preventDefault(); prev(); }
        else if (e.key === "ArrowDown") { e.preventDefault(); next(); }
      }}
    >
      {/* Up arrow */}
      <div className="flex justify-center pb-3">
        <button type="button" onClick={prev} className={btnClass} aria-label="Previous feature">
          <ChevronUp className="size-4" />
        </button>
      </div>

      {/* Clipping viewport — drag initiates here.
          -mx + px: negative-margin trick so horizontal box-shadows are not
          clipped while items still fill the original column width.
          paddingTop/Bottom: gives shadows room at the scroll boundaries. */}
      <div
        className={cn("overflow-hidden", isDragging ? "cursor-grabbing select-none" : "cursor-grab")}
        style={{
          height: viewportH,
          marginLeft: -VERTICAL_PAD_X,
          marginRight: -VERTICAL_PAD_X,
          paddingLeft: VERTICAL_PAD_X,
          paddingRight: VERTICAL_PAD_X,
          paddingTop: VERTICAL_PAD_Y,
          paddingBottom: VERTICAL_PAD_Y,
        }}
        onMouseDown={(e) => {
          e.preventDefault();
          pause();
          dragStartY.current = e.clientY;
          setIsDragging(true);
        }}
      >
        <div
          className="flex flex-col"
          style={{
            transform: `translateY(-${translateY + dragOffset}px)`,
            transition:
              isDragging || prefersReducedMotion
                ? "none"
                : "transform 300ms ease-in-out",
          }}
        >
          {items.map((item, i) => (
            <div
              key={getKey(item, i)}
              className="w-full shrink-0"
              style={{
                height: VERTICAL_ITEM_H,
                marginTop: i > 0 ? VERTICAL_GAP : 0,
              }}
            >
              {renderItem(item, i)}
            </div>
          ))}
        </div>
      </div>

      {/* Down arrow */}
      <div className="flex justify-center pt-3">
        <button type="button" onClick={next} className={btnClass} aria-label="Next feature">
          <ChevronDown className="size-4" />
        </button>
      </div>

      <MarketingCarouselDots
        count={maxIndex + 1}
        selectedIndex={index}
        onSelect={goTo}
        onDark={onDark}
        ariaLabel={ariaLabel}
      />
    </div>
  );
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Unified marketing carousel that adapts across breakpoints.
 *
 * - **Mobile (all sections):** Full-bleed horizontal peek carousel.
 * - **Desktop `threeUp` (Solutions, Testimonials):** 3-column horizontal
 *   carousel with left/right arrows.
 * - **Desktop `vertical` (Card UX, Dashboard):** Vertical carousel with
 *   up/down arrows, slim feature cards, and ArrowUp/ArrowDown keyboard support.
 */
export function MarketingCarousel<T,>({
  desktopMode = "threeUp",
  verticalVisibleCount,
  className,
  autoplayInterval = 0,
  ...trackProps
}: MarketingCarouselProps<T>) {
  const isDesktopLg = useIsDesktopLg();
  const mobileAutoplay = isDesktopLg ? 0 : autoplayInterval;
  const desktopAutoplay = isDesktopLg ? autoplayInterval : 0;

  return (
    <div className={cn("w-full min-w-0", className)}>
      {/* Mobile */}
      <div className="lg:hidden">
        <MobileTrack {...trackProps} autoplayInterval={mobileAutoplay} />
      </div>

      {/* Desktop */}
      <div className="hidden lg:block">
        {desktopMode === "vertical" ? (
          <DesktopVerticalTrack
            {...trackProps}
            autoplayInterval={desktopAutoplay}
            visibleCount={verticalVisibleCount}
          />
        ) : (
          <DesktopThreeUpTrack {...trackProps} autoplayInterval={desktopAutoplay} />
        )}
      </div>
    </div>
  );
}
