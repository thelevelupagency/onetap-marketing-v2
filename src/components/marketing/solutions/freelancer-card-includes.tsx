"use client";

import {
  MarketingSection,
  MarketingContainer,
  SectionHeader,
  PainPointCard,
} from "@/components/marketing/primitives";
import { CardReveal, MarketingStaggerGrid, Reveal } from "@/components/marketing/motion";
import type { MarketingBandBackground } from "@/content/marketing-copy-types";
import { freelancersCardIncludesCopy } from "@/content/solutions";
import { solutionFeatureIcons } from "@/lib/marketing-icons";

interface FreelancerCardIncludesProps {
  background?: MarketingBandBackground;
}

export function FreelancerCardIncludes({ background = "cream" }: FreelancerCardIncludesProps) {
  const copy = freelancersCardIncludesCopy;

  return (
    <MarketingSection background={background} id="card-includes">
      <MarketingContainer width="wide">
        <Reveal>
          <SectionHeader title={copy.title} accent={copy.accent} lead={copy.lead} />
        </Reveal>
        <MarketingStaggerGrid columns={3}>
          {copy.points.map((point, index) => {
            const Icon = solutionFeatureIcons[point.icon];
            return (
              <CardReveal key={point.title} staggerIndex={index} className="min-h-0">
                <PainPointCard
                  icon={Icon}
                  title={point.title}
                  description={point.description}
                  accent={point.accent}
                  className="h-full border-brand-midnight/8 bg-white transition-transform duration-300 hover:-translate-y-1 hover:shadow-soft-diffusion"
                />
              </CardReveal>
            );
          })}
        </MarketingStaggerGrid>
      </MarketingContainer>
    </MarketingSection>
  );
}
