import { cn } from "@/lib/utils";

/**
 * Standard mobile card width for carousel slides.
 * At 390px (iPhone 15) with 16px left gutter this shows one full card
 * (280px) + ~78px of the next, giving a clear "there's more" signal.
 */
export const MOBILE_CAROUSEL_CARD_WIDTH = 280;

/**
 * Full viewport-width breakout below `lg`. Does not re-apply horizontal
 * padding — the left-only padding from `marketingCarouselBleedPaddingClass`
 * keeps the first slide edge-aligned with page content.
 */
export const marketingCarouselBleedClass =
  "max-lg:relative max-lg:left-1/2 max-lg:z-0 max-lg:w-screen max-lg:max-w-[100vw] max-lg:-translate-x-1/2";

/**
 * Left-only padding so the first slide aligns with the rest of the page.
 * No right padding — the next visible slide provides the visual right edge.
 */
export const marketingCarouselBleedPaddingClass =
  "max-lg:pl-marketing-gutter-x md:max-lg:pl-marketing-gutter-x-md";

/**
 * Full horizontal padding for dots — keeps them centered within the
 * readable content width.
 */
export const marketingCarouselDotsInsetClass =
  "max-lg:px-marketing-gutter-x md:max-lg:px-marketing-gutter-x-md";

/**
 * Slide content wrapper used inside `MarketingCarousel.renderItem`.
 *
 * - **Default** — 280px wide on mobile (consistent card width for
 *   testimonials, solutions, feature cards); full column width on desktop.
 * - **`fit`** — sizes to content (use for phone mocks that have a fixed
 *   pixel width from their scale).
 *
 * `h-full` ensures cards in the same row stretch to equal height via the
 * carousel track's `items-stretch`.
 */
export function MarketingCarouselContentSlide({
  children,
  className,
  fit = false,
}: {
  children: React.ReactNode;
  className?: string;
  /** Size to content (e.g. phone mocks) instead of the standard card width. */
  fit?: boolean;
}) {
  return (
    <div
      className={cn(
        "h-full shrink-0",
        fit ? "w-fit" : "w-[280px] lg:w-full",
        className
      )}
    >
      {children}
    </div>
  );
}

export function MarketingCarouselBleedTrack({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        marketingCarouselBleedClass,
        marketingCarouselBleedPaddingClass,
        className
      )}
    >
      {children}
    </div>
  );
}
