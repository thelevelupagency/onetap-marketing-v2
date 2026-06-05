"use client";

import {
  MarketingSection,
  MarketingContainer,
  SectionHeader,
  MarketingCarousel,
  MarketingCarouselCard,
  MarketingCarouselContentSlide,
} from "@/components/marketing/primitives";
import { Reveal } from "@/components/marketing/motion";
import { solutionsCopy } from "@/content/homepage";
import { MARKETING_CAROUSEL_AUTOPLAY_MS } from "@/lib/use-marketing-carousel";

export function SolutionsGrid() {
  return (
    <MarketingSection background="cream" id="solutions" className="overflow-visible">
      <MarketingContainer width="wide" className="overflow-visible">
        <Reveal>
          <SectionHeader
            title={solutionsCopy.title}
            accent={solutionsCopy.accent}
            lead={solutionsCopy.lead}
          />
        </Reveal>

        <Reveal delay={0.08} className="overflow-visible">
          <MarketingCarousel
            items={solutionsCopy.cards}
            getKey={(card) => card.title}
            renderItem={(card) => (
              <MarketingCarouselContentSlide>
                <MarketingCarouselCard
                  variant="image"
                  href={card.href}
                  image={card.image}
                  imageAlt={card.imageAlt}
                  title={card.title}
                  description={card.description}
                  ctaLabel={card.ctaLabel}
                />
              </MarketingCarouselContentSlide>
            )}
            ariaLabel="Solution slides"
            desktopMode="threeUp"
            autoplayInterval={MARKETING_CAROUSEL_AUTOPLAY_MS}
          />
        </Reveal>
      </MarketingContainer>
    </MarketingSection>
  );
}
