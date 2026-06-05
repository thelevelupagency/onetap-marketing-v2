"use client";

import { cn } from "@/lib/utils";
import { FeatureCard } from "./feature-card";
import { MarketingCarousel } from "./marketing-carousel";
import { MarketingCarouselContentSlide } from "./marketing-carousel-frame";
import { MARKETING_CAROUSEL_AUTOPLAY_MS } from "@/lib/use-marketing-carousel";

export type FeatureSpotlightItem = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
};

/**
 * Feature list for split-column sections (Card UX, Dashboard).
 *
 * - **Mobile:** full-bleed horizontal peek carousel with slim compact cards.
 * - **Desktop:** vertical carousel with up/down arrows and slim compact cards.
 */
export function FeatureSpotlight({
  items,
  interval = MARKETING_CAROUSEL_AUTOPLAY_MS,
  onDark = false,
  visibleCount,
  cardVariant = "compact",
  cardClassName,
  className,
}: {
  items: FeatureSpotlightItem[];
  interval?: number;
  onDark?: boolean;
  /** How many cards to show at once in the desktop vertical carousel. Defaults to 3. */
  visibleCount?: number;
  /** `compactOnLight` — white cards for cream section backgrounds. */
  cardVariant?: "compact" | "compactOnLight";
  cardClassName?: string;
  className?: string;
}) {
  return (
    <MarketingCarousel
      items={items}
      getKey={(item) => item.title}
      renderItem={(item) => {
        const Icon = item.icon;
        return (
          <MarketingCarouselContentSlide>
            <FeatureCard
              icon={Icon}
              title={item.title}
              description={item.description}
              variant={cardVariant}
              onDark={onDark}
              className={cn("h-full", cardClassName)}
            />
          </MarketingCarouselContentSlide>
        );
      }}
      ariaLabel="Feature highlights"
      desktopMode="vertical"
      onDark={onDark}
      autoplayInterval={interval}
      verticalVisibleCount={visibleCount}
      className={className}
    />
  );
}
