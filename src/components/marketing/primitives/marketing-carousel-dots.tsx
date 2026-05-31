"use client";

import { cn } from "@/lib/utils";

export function MarketingCarouselDots({
  count,
  selectedIndex,
  onSelect,
  onDark = false,
  ariaLabel = "Carousel slides",
  className,
}: {
  count: number;
  selectedIndex: number;
  onSelect: (index: number) => void;
  onDark?: boolean;
  ariaLabel?: string;
  className?: string;
}) {
  if (count <= 1) return null;

  return (
    <div
      className={cn("mt-2 flex justify-center gap-2 md:mt-4", className)}
      role="tablist"
      aria-label={ariaLabel}
    >
      {Array.from({ length: count }, (_, index) => (
        <button
          key={index}
          type="button"
          role="tab"
          aria-selected={index === selectedIndex}
          aria-label={`Go to slide ${index + 1}`}
          onClick={() => onSelect(index)}
          className={cn(
            "h-2 rounded-full transition-all duration-300",
            index === selectedIndex
              ? cn(
                  "w-6",
                  onDark ? "bg-brand-turquoise" : "bg-brand-turquoise-dark"
                )
              : cn(
                  "w-2",
                  onDark
                    ? "bg-white/25 hover:bg-white/40"
                    : "bg-brand-midnight/15 hover:bg-brand-midnight/30"
                )
          )}
        />
      ))}
    </div>
  );
}
