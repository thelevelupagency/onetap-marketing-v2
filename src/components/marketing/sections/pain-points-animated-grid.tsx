"use client";

import { PainPointCard } from "@/components/marketing/primitives";
import { CardReveal, MarketingStaggerGrid } from "@/components/marketing/motion";
import { painPointIcons } from "@/lib/marketing-icons";
import type { PainPointsCopy } from "@/content/marketing-copy-types";

interface PainPointsAnimatedGridProps {
  points: PainPointsCopy["points"];
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
