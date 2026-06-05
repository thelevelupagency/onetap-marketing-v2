"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { GetCardCta } from "@/components/marketing/get-card-cta";
import { Reveal } from "@/components/marketing/motion";
import { MarketingPhonePreview } from "@/components/marketing/phones/marketing-phone-preview";
import {
  MarketingSection,
  MarketingContainer,
  SectionHeader,
  CategoryFilterPills,
  MarketingCarousel,
  MarketingCarouselContentSlide,
  marketingCarouselBleedClass,
  marketingCarouselBleedPaddingClass,
  type CategoryFilterPill,
} from "@/components/marketing/primitives";
import { type as typography } from "@/lib/typography";
import type { MarketingBandBackground } from "@/content/marketing-copy-types";
import {
  freelancersNicheManifest,
  freelancersNicheSelectorCopy,
  type FreelancerNicheCard,
} from "@/content/solutions";
import { PHONE_CAROUSEL_SCALE } from "@/lib/phone-mockup";
import { MARKETING_CAROUSEL_AUTOPLAY_MS } from "@/lib/use-marketing-carousel";
import { cn } from "@/lib/utils";

interface FreelancerNicheSelectorProps {
  background?: MarketingBandBackground;
}

export function FreelancerNicheSelector({ background = "white" }: FreelancerNicheSelectorProps) {
  const [activeNicheId, setActiveNicheId] = useState<string>(
    freelancersNicheManifest.defaultNicheId
  );
  const pillRefs = useRef(new Map<string, HTMLButtonElement>());

  const activeNiche =
    freelancersNicheManifest.niches.find((niche) => niche.id === activeNicheId) ??
    freelancersNicheManifest.niches[0];

  const isDefaultNiche = activeNicheId === freelancersNicheManifest.defaultNicheId;

  const selectNiche = useCallback((nicheId: string) => {
    setActiveNicheId(nicheId);
  }, []);

  useEffect(() => {
    const el = pillRefs.current.get(activeNicheId);
    el?.scrollIntoView({ inline: "nearest", block: "nearest", behavior: "smooth" });
  }, [activeNicheId]);

  const filterPills: CategoryFilterPill[] = useMemo(
    () =>
      freelancersNicheManifest.niches.map((niche) => ({
        id: niche.id,
        label: niche.label,
        isActive: niche.id === activeNicheId,
        onSelect: () => selectNiche(niche.id),
        pillRef: (el) => {
          if (el) pillRefs.current.set(niche.id, el);
          else pillRefs.current.delete(niche.id);
        },
      })),
    [activeNicheId, selectNiche]
  );

  const renderPhoneSlide = useCallback(
    (card: FreelancerNicheCard, index: number) => (
      <MarketingCarouselContentSlide fit>
        <div className="flex w-full flex-col items-center gap-marketing-stack-gap-sm">
          <MarketingPhonePreview
            scale={PHONE_CAROUSEL_SCALE}
            url={card.slug}
            imageSrc={card.imageSrc}
            alt={card.alt}
            priority={isDefaultNiche && index === 0}
          />
          <div className="w-full text-center">
            <p className={cn(typography.label, "font-semibold")}>{card.personaName}</p>
            <p className={typography.caption}>{card.styleLabel}</p>
          </div>
        </div>
      </MarketingCarouselContentSlide>
    ),
    [isDefaultNiche]
  );

  return (
    <MarketingSection background={background} spacing="compact" className="overflow-visible">
      <MarketingContainer width="wide" className="overflow-visible">
        <SectionHeader
          title={freelancersNicheSelectorCopy.title}
          accent={freelancersNicheSelectorCopy.accent}
          lead={freelancersNicheSelectorCopy.lead}
        />

        <div className="mb-marketing-stack-gap space-y-marketing-stack-gap">
          {/* Mobile: compact horizontal scroll strip */}
          <div className={cn(marketingCarouselBleedClass, marketingCarouselBleedPaddingClass, "lg:hidden")}>
            <CategoryFilterPills
              ariaLabel="Freelancer niches"
              layout="row-scroll"
              density="compact"
              items={filterPills}
            />
          </div>

          {/* Desktop: wrapped compact row */}
          <CategoryFilterPills
            ariaLabel="Freelancer niches"
            layout="row"
            align="center"
            density="compact"
            className="mx-0 hidden max-w-none lg:flex"
            items={filterPills}
          />

          <Reveal direction="up" className="overflow-visible">
            <MarketingCarousel
              key={activeNicheId}
              items={activeNiche.cards}
              getKey={(card) => card.id}
              renderItem={renderPhoneSlide}
              ariaLabel={`${activeNiche.label} card previews`}
              desktopMode="threeUp"
              centerSlideItems
              balancedSlides
              autoplayInterval={MARKETING_CAROUSEL_AUTOPLAY_MS}
            />
          </Reveal>

          <div className="flex justify-center pt-2">
            <GetCardCta size="md">Create Your {activeNiche.label} Card</GetCardCta>
          </div>
        </div>
      </MarketingContainer>
    </MarketingSection>
  );
}
