"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { type as typography } from "@/lib/typography";
import {
  MarketingSection,
  MarketingContainer,
  SectionHeader,
  MarketingCarousel,
  AudienceMarquee,
} from "@/components/marketing/primitives";
import { Reveal } from "@/components/marketing/motion";
import { socialProofCopy } from "@/content/homepage";
import { MARKETING_CAROUSEL_AUTOPLAY_MS } from "@/lib/use-marketing-carousel";
import type { MarketingBandBackground, SocialProofCopy } from "@/content/marketing-copy-types";

export type { SocialProofCopy } from "@/content/marketing-copy-types";

interface SocialProofProps {
  copy?: SocialProofCopy;
  background?: MarketingBandBackground;
}

function TestimonialCard({
  testimonial,
}: {
  testimonial: SocialProofCopy["testimonials"][number];
}) {
  return (
    <Card
      className={cn(
        "flex h-full flex-col gap-0 bg-white p-6 shadow-sm",
        "transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-diffusion"
      )}
    >
      <div className="mb-4 flex gap-4">
        <Avatar className="size-10 rounded-full ring-1 ring-input">
          <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
        </Avatar>
        <div>
          <p className={typography.label}>{testimonial.name}</p>
          <p className={typography.caption}>{testimonial.role}</p>
        </div>
      </div>
      <p className={cn(typography.bodySm, "flex-1 text-brand-midnight/80")}>
        <q>{testimonial.content}</q>
      </p>
    </Card>
  );
}

export function SocialProof({
  copy = socialProofCopy,
  background = "cream",
}: SocialProofProps) {
  return (
    <MarketingSection background={background} id="social-proof" className="overflow-visible">
      <MarketingContainer width="wide" className="overflow-visible">
        <Reveal>
          <SectionHeader
            title={copy.title}
            accent={copy.accent}
            lead={copy.lead}
            spacingBelow="none"
            className="mb-marketing-header-gap-md"
          />
        </Reveal>

        <Reveal>
          <AudienceMarquee
            audiences={copy.audiences}
            background={background}
            className="mb-marketing-header-gap"
          />
        </Reveal>

        <Reveal delay={0.08} className="overflow-visible">
          <MarketingCarousel
            items={copy.testimonials}
            getKey={(t) => t.name}
            renderItem={(t) => <TestimonialCard testimonial={t} />}
            ariaLabel="Testimonial slides"
            desktopMode="threeUp"
            autoplayInterval={MARKETING_CAROUSEL_AUTOPLAY_MS}
          />
        </Reveal>
      </MarketingContainer>
    </MarketingSection>
  );
}
