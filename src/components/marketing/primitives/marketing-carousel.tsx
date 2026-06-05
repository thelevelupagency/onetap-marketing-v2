"use client";

import { useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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

// ─── Shared constants ─────────────────────────────────────────────────────────

const arrowLight =
  "border-brand-midnight/15 bg-white text-brand-midnight shadow-sm hover:border-brand-turquoise/25 hover:bg-white disabled:opacity-30";
const arrowDark =
  "border-white/15 bg-white/10 text-brand-cream shadow-sm hover:bg-white/15 disabled:opacity-30";

/**
 * Viewport padding to prevent hover-lift shadows being clipped.
 * Uses token equivalents: pt-4 (16px) / pb-8 (32px).
 */
const CAROUSEL_VIEWPORT_PADDING = "pt-4 pb-8";

/**
 * Inter-slide gap used on every carousel track (mobile + desktop).
 * Matches `pl-4` / `-ml-4` — the shadcn default — so mobile and desktop
 * are visually identical at 16px between slides.
 */
const SLIDE_GAP = "pl-marketing-stack-gap-sm";
const SLIDE_GAP_NEGATIVE = "-ml-marketing-stack-gap-sm";

/** Embla disables loop when there are too few slides — duplicate until this minimum. */
const LOOP_MIN_SLIDES = 6;

const loopCarouselOpts = {
  loop: true,
  containScroll: false,
} as const;

function expandItemsForLoop<T>(items: readonly T[]): { items: T[]; sourceLength: number } {
  if (items.length === 0) return { items: [], sourceLength: 0 };
  if (items.length >= LOOP_MIN_SLIDES) return { items: [...items], sourceLength: items.length };
  const copies = Math.ceil(LOOP_MIN_SLIDES / items.length);
  return {
    items: Array.from({ length: copies }, () => items).flat(),
    sourceLength: items.length,
  };
}

// ─── Types ────────────────────────────────────────────────────────────────────

export type CarouselDesktopMode = "threeUp" | "vertical";
export type CarouselDesktopSlideSize = "third" | "half";
export interface MarketingCarouselProps<T> {
  items: readonly T[];
  getKey: (item: T, index: number) => string;
  renderItem: (item: T, index: number) => React.ReactNode;
  ariaLabel: string;
  /** Desktop layout: 3-column horizontal or vertical single-column. Defaults to "threeUp". */
  desktopMode?: CarouselDesktopMode;
  /** Horizontal desktop slide width when desktopMode is threeUp. Defaults to "third". */
  desktopSlideSize?: CarouselDesktopSlideSize;
  onDark?: boolean;
  /** Autoplay interval in ms. Omit or 0 to disable. */
  autoplayInterval?: number;
  /** How many items to show at once in the vertical desktop track. Defaults to 3. */
  verticalVisibleCount?: number;
  /** Center each slide's content within its column (desktop only; e.g. phone mocks). */
  centerSlideItems?: boolean;
  /** Symmetric slide gutters on desktop — removes default left-only pl-4 offset. */
  balancedSlides?: boolean;
  className?: string;
}

/** Internal props shared by all track variants. */
type TrackProps<T> = Omit<
  MarketingCarouselProps<T>,
  "desktopMode" | "className" | "verticalVisibleCount"
> & {
  /** Original item count before loop duplication (for dot indicators). */
  loopSourceLength: number;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const slideItemCenterClass = "items-center justify-center";

function desktopSlideClass(
  basisClass: string,
  {
    centerSlideItems = false,
    balancedSlides = false,
  }: {
    centerSlideItems?: boolean;
    balancedSlides?: boolean;
  }
) {
  return cn(
    basisClass,
    // balancedSlides: equal gutters (px-3 each side, ml-0 on content)
    // default: standard left-only gap (pl-4 from CarouselItem, -ml-4 on content)
    balancedSlides ? "px-3 pl-0" : undefined,
    centerSlideItems && slideItemCenterClass
  );
}

function desktopContentClass(balancedSlides: boolean) {
  return cn(balancedSlides ? "ml-0" : SLIDE_GAP_NEGATIVE, "items-stretch");
}

// ─── Mobile: full-bleed horizontal carousel ──────────────────────────────────

function MobileTrack<T,>({
  items,
  getKey,
  renderItem,
  ariaLabel,
  onDark = false,
  autoplayInterval = 0,
  centerSlideItems = false,
  loopSourceLength,
}: TrackProps<T>) {
  const { setApi, selectedIndex, scrollTo, pausedUntilRef, api } =
    useMarketingCarousel();
  useMarketingCarouselAutoplay(api, autoplayInterval, pausedUntilRef);

  return (
    <div className="relative w-full min-w-0">
      <MarketingCarouselBleedTrack>
        <Carousel
          setApi={setApi}
          opts={{ ...loopCarouselOpts, align: "start" }}
          className="w-full"
        >
          {/*
           * SLIDE_GAP_NEGATIVE + SLIDE_GAP per item = consistent 16px inter-slide gap
           * on both mobile and desktop (matches --marketing-stack-gap-sm / pl-4 token).
           * items-stretch ensures all slides in a row reach the same height.
           */}
          <CarouselContent
            className={cn(SLIDE_GAP_NEGATIVE, "items-stretch")}
            viewportClassName={cn("touch-pan-y", CAROUSEL_VIEWPORT_PADDING)}
          >
            {items.map((item, i) => (
              <CarouselItem
                key={getKey(item, i)}
                className={cn("basis-auto shrink-0 grow-0", SLIDE_GAP)}
              >
                <div
                  className={cn(
                    "flex h-full flex-col",
                    centerSlideItems && slideItemCenterClass
                  )}
                >
                  {renderItem(item, i)}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </MarketingCarouselBleedTrack>

      <MarketingCarouselDots
        count={loopSourceLength}
        selectedIndex={selectedIndex % loopSourceLength}
        onSelect={scrollTo}
        onDark={onDark}
        ariaLabel={ariaLabel}
        className={marketingCarouselDotsInsetClass}
      />
    </div>
  );
}

// ─── Desktop: horizontal 2-up carousel with arrows ───────────────────────────

function DesktopTwoUpTrack<T,>({
  items,
  getKey,
  renderItem,
  ariaLabel,
  onDark = false,
  autoplayInterval = 0,
  centerSlideItems = false,
  balancedSlides = false,
  loopSourceLength,
}: TrackProps<T>) {
  const { setApi, selectedIndex, scrollTo, api, pausedUntilRef } =
    useMarketingCarousel();
  useMarketingCarouselAutoplay(api, autoplayInterval, pausedUntilRef);

  return (
    /*
     * px-14 = 56px — clears the md:-left-12 / md:-right-12 (48px) arrow
     * positioning with 8px breathing room on both sides.
     */
    <div className="relative min-w-0 overflow-visible px-14">
      <Carousel
        setApi={setApi}
        opts={{ ...loopCarouselOpts, align: "start" }}
        className="w-full"
      >
        <CarouselContent
          className={desktopContentClass(balancedSlides)}
          viewportClassName={CAROUSEL_VIEWPORT_PADDING}
        >
          {items.map((item, i) => (
            <CarouselItem
              key={getKey(item, i)}
              className={desktopSlideClass("basis-1/2", {
                centerSlideItems,
                balancedSlides: balancedSlides || centerSlideItems,
              })}
            >
              <div className="flex h-full w-full flex-col items-center justify-center">
                {renderItem(item, i)}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious variant="brandOutline" className={onDark ? arrowDark : arrowLight} />
        <CarouselNext variant="brandOutline" className={onDark ? arrowDark : arrowLight} />
      </Carousel>

      <MarketingCarouselDots
        count={loopSourceLength}
        selectedIndex={selectedIndex % loopSourceLength}
        onSelect={scrollTo}
        onDark={onDark}
        ariaLabel={ariaLabel}
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
  centerSlideItems = false,
  balancedSlides = false,
  loopSourceLength,
}: TrackProps<T>) {
  const { setApi, selectedIndex, scrollTo, api, pausedUntilRef } =
    useMarketingCarousel();
  useMarketingCarouselAutoplay(api, autoplayInterval, pausedUntilRef);

  return (
    <div className="relative min-w-0 overflow-visible px-14">
      <Carousel
        setApi={setApi}
        opts={{ ...loopCarouselOpts, align: "start" }}
        className="w-full"
      >
        <CarouselContent
          className={desktopContentClass(balancedSlides)}
          viewportClassName={CAROUSEL_VIEWPORT_PADDING}
        >
          {items.map((item, i) => (
            <CarouselItem
              key={getKey(item, i)}
              className={desktopSlideClass("basis-1/3", {
                centerSlideItems,
                balancedSlides: balancedSlides || centerSlideItems,
              })}
            >
              <div className="flex h-full w-full flex-col items-center justify-center">
                {renderItem(item, i)}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious variant="brandOutline" className={onDark ? arrowDark : arrowLight} />
        <CarouselNext variant="brandOutline" className={onDark ? arrowDark : arrowLight} />
      </Carousel>

      <MarketingCarouselDots
        count={loopSourceLength}
        selectedIndex={selectedIndex % loopSourceLength}
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
  loopSourceLength,
}: TrackProps<T> & { visibleCount?: number }) {
  const slidesPerView =
    items.length > 0 && items.length <= visibleCount ? 1 : visibleCount;
  const maxIndex = Math.max(0, items.length - slidesPerView);
  const isSingleItemScroll = items.length > 0 && items.length <= visibleCount;
  const [index, setIndex] = useState(0);
  const dotCount = isSingleItemScroll ? loopSourceLength : maxIndex + 1;
  const dotSelectedIndex = isSingleItemScroll ? index % loopSourceLength : index;
  const pausedUntilRef = useRef(0);
  const prefersReducedMotion = useReducedMotion() ?? false;

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
      setIndex(Math.min(i, maxIndex));
    },
    [pause, maxIndex]
  );

  useEffect(() => {
    if (!autoplayInterval || items.length <= 1 || prefersReducedMotion) return;
    const id = setInterval(() => {
      if (Date.now() < pausedUntilRef.current) return;
      setIndex((i) => (i >= maxIndex ? 0 : i + 1));
    }, autoplayInterval);
    return () => clearInterval(id);
  }, [autoplayInterval, items.length, maxIndex, prefersReducedMotion]);

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

  const viewportH =
    slidesPerView * VERTICAL_ITEM_H +
    (slidesPerView - 1) * VERTICAL_GAP +
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
      <div className="flex justify-center pb-3">
        <button type="button" onClick={prev} className={btnClass} aria-label="Previous feature">
          <ChevronUp className="size-4" />
        </button>
      </div>

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
              style={{ height: VERTICAL_ITEM_H, marginTop: i > 0 ? VERTICAL_GAP : 0 }}
            >
              {renderItem(item, i)}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center pt-3">
        <button type="button" onClick={next} className={btnClass} aria-label="Next feature">
          <ChevronDown className="size-4" />
        </button>
      </div>

      <MarketingCarouselDots
        count={dotCount}
        selectedIndex={dotSelectedIndex}
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
 * ### Mobile (< lg)
 * Full-bleed horizontal carousel. Slides are `basis-auto` so each item
 * sizes to its own content — phones render at their fixed scale, cards at
 * a consistent 280px via `MarketingCarouselContentSlide`. Multiple items
 * are visible at once; the gap between slides is 16px on every breakpoint.
 *
 * ### Desktop `threeUp` (Solutions, Testimonials, Niche phones)
 * 3-column horizontal carousel with left/right arrows. Arrow container is
 * 56px (`px-14`) to safely clear the 48px arrow offset.
 *
 * ### Desktop `vertical` (Card UX, Dashboard)
 * Vertical carousel with up/down arrows + drag support. Loops forever.
 */
export function MarketingCarousel<T,>({
  desktopMode = "threeUp",
  desktopSlideSize = "third",
  verticalVisibleCount,
  className,
  autoplayInterval = 0,
  items,
  getKey,
  renderItem,
  ...trackProps
}: MarketingCarouselProps<T>) {
  const isDesktopLg = useIsDesktopLg();
  const mobileAutoplay = isDesktopLg ? 0 : autoplayInterval;
  const desktopAutoplay = isDesktopLg ? autoplayInterval : 0;

  const { loopItems, loopSourceLength } = useMemo(() => {
    const expanded = expandItemsForLoop(items);
    return { loopItems: expanded.items, loopSourceLength: expanded.sourceLength };
  }, [items]);

  const loopGetKey = useCallback(
    (item: T, index: number) =>
      `${getKey(item, index % loopSourceLength)}--${index}`,
    [getKey, loopSourceLength]
  );

  const loopRenderItem = useCallback(
    (item: T, index: number) => renderItem(item, index % loopSourceLength),
    [renderItem, loopSourceLength]
  );

  const sharedTrackProps = {
    ...trackProps,
    items: loopItems,
    getKey: loopGetKey,
    renderItem: loopRenderItem,
    loopSourceLength,
  };

  return (
    <div className={cn("w-full min-w-0", className)}>
      {/* Mobile */}
      <div className="lg:hidden">
        <MobileTrack {...sharedTrackProps} autoplayInterval={mobileAutoplay} />
      </div>

      {/* Desktop */}
      <div className="hidden lg:block">
        {desktopMode === "vertical" ? (
          <DesktopVerticalTrack
            {...trackProps}
            items={items}
            getKey={getKey}
            renderItem={renderItem}
            loopSourceLength={items.length}
            autoplayInterval={desktopAutoplay}
            visibleCount={verticalVisibleCount}
          />
        ) : desktopSlideSize === "half" ? (
          <DesktopTwoUpTrack {...sharedTrackProps} autoplayInterval={desktopAutoplay} />
        ) : (
          <DesktopThreeUpTrack {...sharedTrackProps} autoplayInterval={desktopAutoplay} />
        )}
      </div>
    </div>
  );
}
