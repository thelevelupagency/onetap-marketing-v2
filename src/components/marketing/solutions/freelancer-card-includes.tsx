"use client";

import {
  MarketingSection,
  MarketingContainer,
  SectionHeader,
  PainPointCard,
} from "@/components/marketing/primitives";
import { CardReveal, MarketingStaggerGrid, Reveal } from "@/components/marketing/motion";
import type { MarketingBandBackground } from "@/content/marketing-copy-types";
import { getSolutions } from "@/content/get-content";
import type { Locale } from "@/lib/i18n/config";
import { solutionFeatureIcons } from "@/lib/marketing-icons";

interface FreelancerCardIncludesProps {
  locale: Locale;
  background?: MarketingBandBackground;
}

export function FreelancerCardIncludes({ locale, background = "cream" }: FreelancerCardIncludesProps) {
  const copy = getSolutions(locale).freelancersCardIncludesCopy;

  return (
    <MarketingSection background={background} id="card-includes">
      <MarketingContainer width="wide">
        <Reveal>
          <SectionHeader title={copy.title} accent={copy.accent} lead={copy.lead} />
        </Reveal>
        <MarketingStaggerGrid columns={3} className="pt-10 gap-y-12 md:gap-y-marketing-grid-gap-md">
          {copy.points.map((point, index) => {
            const Icon = solutionFeatureIcons[point.icon];
            return (
              <CardReveal key={point.title} staggerIndex={index} className="min-h-0">
                <PainPointCard
                  icon={Icon}
                  title={point.title}
                  description={point.description}
                  accent={point.accent}
                  className="h-full border-2 border-brand-navy bg-white transition-transform duration-300 hover:-translate-y-1 hover:shadow-soft-diffusion"
                />
              </CardReveal>
            );
          })}
        </MarketingStaggerGrid>
      </MarketingContainer>
    </MarketingSection>
  );
}
