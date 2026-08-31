import { cn } from "@/lib/utils";

/**
 * Standard mobile card width for carousel slides.
 * At 390px (iPhone 15) with 16px start gutter this shows one full card
 * (280px) + ~78px of the next, giving a clear "there's more" signal.
 */
export const MOBILE_CAROUSEL_CARD_WIDTH = 280;

/**
 * Full viewport-width breakout below `lg`.
 * Uses logical `ms-[calc(50%-50vw)]` so the strip centers correctly in both
 * LTR and RTL (physical `left-1/2 -translate-x-1/2` mis-aligns under `dir=rtl`).
 */
export const marketingCarouselBleedClass =
  "max-lg:relative max-lg:z-0 max-lg:w-screen max-lg:max-w-[100vw] max-lg:ms-[calc(50%-50vw)] max-lg:overflow-visible";

/**
 * Logical start padding so the first slide aligns with page content gutters
 * in both locales (left in EN, right in HE). Peek fills the end edge.
 */
export const marketingCarouselBleedPaddingClass =
  "max-lg:ps-marketing-gutter-x md:max-lg:ps-marketing-gutter-x-md";

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
