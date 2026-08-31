"use client";

import { marketingCarouselBleedClass } from "@/components/marketing/primitives/marketing-carousel-frame";
import type { MarketingBandBackground } from "@/content/marketing-copy-types";
import { useMotionConfig } from "@/lib/motion";
import { useLocale } from "@/components/providers/locale-provider";
import { getChrome } from "@/content/get-content";
import { type as typography } from "@/lib/typography";
import { cn } from "@/lib/utils";

interface AudienceMarqueeProps {
  audiences: readonly string[];
  background?: MarketingBandBackground;
  className?: string;
}

function AudienceMarqueeItem({ label }: { label: string }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-marketing-grid-gap px-4 sm:gap-marketing-grid-gap-md sm:px-5">
      <span
        className={cn(typography.tableHeading, "text-brand-midnight/25 sm:text-xl")}
      >
        {label}
      </span>
      <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-brand-turquoise/35" />
    </span>
  );
}

function AudienceMarqueeTrack({
  audiences,
  trackId,
}: {
  audiences: readonly string[];
  trackId: string;
}) {
  return (
    <>
      {audiences.map((label) => (
        <AudienceMarqueeItem key={`${trackId}-${label}`} label={label} />
      ))}
    </>
  );
}

export function AudienceMarquee({
  audiences,
  background = "cream",
  className,
}: AudienceMarqueeProps) {
  const { prefersReducedMotion } = useMotionConfig();
  const locale = useLocale();
  const chrome = getChrome(locale);
  const fadeFrom = background === "cream" ? "from-brand-cream" : "from-white";

  if (prefersReducedMotion) {
    return (
      <div
        className={cn("flex flex-wrap items-center justify-center gap-x-6 gap-y-3", className)}
        aria-label={chrome.aria.audienceMarquee}
      >
        {audiences.map((label) => (
          <span
            key={label}
            className={cn(typography.tableHeading, "text-base text-brand-midnight/30 sm:text-lg")}
          >
            {label}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div
      dir="ltr"
      className={cn(
        marketingCarouselBleedClass,
        // Marquee keeps physical centering extras at lg; mobile uses logical bleed.
        "relative overflow-hidden max-lg:overflow-hidden lg:left-1/2 lg:w-screen lg:max-w-[100vw] lg:ms-0 lg:-translate-x-1/2",
        className
      )}
      aria-label={chrome.aria.audienceMarquee}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-y-0 start-0 z-10 w-16 bg-gradient-to-r to-transparent sm:w-24",
          fadeFrom
        )}
        aria-hidden
      />
      <div
        className={cn(
          "pointer-events-none absolute inset-y-0 end-0 z-10 w-16 bg-gradient-to-l to-transparent sm:w-24",
          fadeFrom
        )}
        aria-hidden
      />

      <div className="audience-marquee-track flex w-max items-center py-1">
        <div className="flex shrink-0 items-center">
          <AudienceMarqueeTrack audiences={audiences} trackId="a" />
        </div>
        <div className="flex shrink-0 items-center" aria-hidden>
          <AudienceMarqueeTrack audiences={audiences} trackId="b" />
        </div>
      </div>
    </div>
  );
}
