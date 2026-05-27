"use client";

import { PainPointCard } from "@/components/marketing/primitives";
import { CardReveal, MarketingStaggerGrid } from "@/components/marketing/motion";
import type { painPointsCopy } from "@/content/homepage";
import { painPointIcons } from "@/lib/marketing-icons";

type PainPoint = (typeof painPointsCopy.points)[number];

interface PainPointsAnimatedGridProps {
  points: readonly PainPoint[];
}

export function PainPointsAnimatedGrid({ points }: PainPointsAnimatedGridProps) {
  return (
    <MarketingStaggerGrid columns={3}>
      {points.map((point, index) => {
        const Icon = painPointIcons[point.icon];
        return (
          <CardReveal key={point.title} staggerIndex={index}>
            <PainPointCard
              icon={Icon}
              title={point.title}
              description={point.description}
              accent={point.accent}
              className="transition-transform duration-300 hover:-translate-y-1 hover:shadow-soft-diffusion"
            />
          </CardReveal>
        );
      })}
    </MarketingStaggerGrid>
  );
}
