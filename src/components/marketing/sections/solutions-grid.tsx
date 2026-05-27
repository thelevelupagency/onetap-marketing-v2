"use client";

import { ArrowRight } from "lucide-react";
import {
  MarketingSection,
  MarketingContainer,
  SectionHeader,
  MarketingLinkCard,
} from "@/components/marketing/primitives";
import { CardReveal, MarketingStaggerGrid, Reveal } from "@/components/marketing/motion";
import { solutionsCopy } from "@/content/homepage";
import { solutionIcons } from "@/lib/marketing-icons";
import { type as typography } from "@/lib/typography";
import { cn } from "@/lib/utils";

export function SolutionsGrid() {
  return (
    <MarketingSection background="cream" id="solutions">
      <MarketingContainer width="wide">
        <Reveal>
          <SectionHeader
            title={solutionsCopy.title}
            accent={solutionsCopy.accent}
            lead={solutionsCopy.lead}
          />
        </Reveal>
        <MarketingStaggerGrid columns={2} className="lg:grid-cols-3">
          {solutionsCopy.cards.map((sol, index) => {
            const Icon = solutionIcons[sol.icon];
            return (
              <CardReveal key={sol.title} staggerIndex={index}>
                <MarketingLinkCard
                  href={sol.href}
                  background="white"
                  density="compact"
                  className="flex h-full flex-col"
                >
                  <div
                    className={cn(
                      "mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br",
                      sol.accent
                    )}
                  >
                    <Icon className="h-5 w-5 text-brand-midnight" />
                  </div>
                  <h3
                    className={cn(
                      typography.label,
                      "mb-1.5 text-base font-semibold leading-snug transition-colors group-hover:text-brand-turquoise-dark"
                    )}
                  >
                    {sol.title}
                  </h3>
                  <p
                    className={cn(
                      typography.bodySm,
                      "mb-4 line-clamp-2 flex-1 text-brand-midnight/65"
                    )}
                  >
                    {sol.description}
                  </p>
                  <span className="mt-auto inline-flex items-center text-sm font-medium text-brand-midnight transition-colors group-hover:text-brand-turquoise-dark">
                    {sol.ctaLabel}{" "}
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </MarketingLinkCard>
              </CardReveal>
            );
          })}
        </MarketingStaggerGrid>
      </MarketingContainer>
    </MarketingSection>
  );
}
