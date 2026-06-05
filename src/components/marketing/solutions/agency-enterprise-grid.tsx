"use client";

import {
  MarketingSection,
  MarketingContainer,
  SectionHeader,
  PainPointCard,
} from "@/components/marketing/primitives";
import { CardReveal, MarketingStaggerGrid, Reveal } from "@/components/marketing/motion";
import type { MarketingBandBackground } from "@/content/marketing-copy-types";
import { agenciesEnterpriseCopy } from "@/content/solutions";
import { solutionFeatureIcons } from "@/lib/marketing-icons";

interface AgencyEnterpriseGridProps {
  background?: MarketingBandBackground;
}

export function AgencyEnterpriseGrid({ background = "white" }: AgencyEnterpriseGridProps) {
  const copy = agenciesEnterpriseCopy;

  return (
    <MarketingSection background={background} spacing="compact" id="enterprise">
      <MarketingContainer width="wide">
        <Reveal>
          <SectionHeader title={copy.title} accent={copy.accent} lead={copy.lead} />
        </Reveal>
        <MarketingStaggerGrid columns={2}>
          {copy.pillars.map((pillar, index) => {
            const Icon = solutionFeatureIcons[pillar.icon];
            return (
              <CardReveal key={pillar.title} staggerIndex={index} className="min-h-0">
                <PainPointCard
                  icon={Icon}
                  title={pillar.title}
                  description={pillar.description}
                  accent={pillar.accent}
                  className="h-full border-brand-midnight/8 transition-transform duration-300 hover:-translate-y-1 hover:shadow-soft-diffusion"
                />
              </CardReveal>
            );
          })}
        </MarketingStaggerGrid>
      </MarketingContainer>
    </MarketingSection>
  );
}
