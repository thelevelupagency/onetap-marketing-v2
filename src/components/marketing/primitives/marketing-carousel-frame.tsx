import { cn } from "@/lib/utils";

/**
 * Full viewport-width breakout below `lg`. Does not re-apply horizontal padding
 * (unlike margin-only bleed, which looked identical to inset content).
 */
export const marketingCarouselBleedClass =
  "max-lg:relative max-lg:left-1/2 max-lg:z-0 max-lg:w-screen max-lg:max-w-[100vw] max-lg:-translate-x-1/2";

/**
 * Left-only padding so the first slide aligns with the rest of the page content.
 * No right padding — the peeking next slide becomes the right edge, preserving the
 * edge-to-edge strip feeling.
 */
export const marketingCarouselBleedPaddingClass =
  "max-lg:pl-marketing-gutter-x md:max-lg:pl-marketing-gutter-x-md";

/**
 * Full horizontal padding for dots — keeps them centered within the readable content width.
 */
export const marketingCarouselDotsInsetClass =
  "max-lg:px-marketing-gutter-x md:max-lg:px-marketing-gutter-x-md";

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
