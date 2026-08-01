"use client";

import {
  MarketingSection,
  MarketingContainer,
  SectionHeader,
  AudienceMarquee,
  TestimonialCard,
  InfiniteTestimonialTrack,
} from "@/components/marketing/primitives";
import { Reveal } from "@/components/marketing/motion";
import { socialProofCopy } from "@/content/homepage";
import type { MarketingBandBackground, SocialProofCopy } from "@/content/marketing-copy-types";

export type { SocialProofCopy } from "@/content/marketing-copy-types";

interface SocialProofProps {
  copy?: SocialProofCopy;
  background?: MarketingBandBackground;
}

export function SocialProof({
  copy = socialProofCopy,
  background = "cream",
}: SocialProofProps) {
  const testimonials = copy.testimonials;
  const halfCount = Math.ceil(testimonials.length / 2);
  const row1 = testimonials.slice(0, halfCount);
  const row2 = testimonials.slice(halfCount);

  return (
    <MarketingSection background={background} id="social-proof" className="overflow-hidden">
      <MarketingContainer width="wide" className="overflow-visible">
        <Reveal>
          <SectionHeader
            title={copy.title}
            accent={copy.accent}
            lead={copy.lead}
            spacingBelow="none"
            className="mb-6 sm:mb-8"
          />
        </Reveal>

        <Reveal>
          <AudienceMarquee
            audiences={copy.audiences}
            background={background}
            className="mb-6 sm:mb-8"
          />
        </Reveal>
      </MarketingContainer>

      {/* Dual Row Bi-Directional Infinite Scrolling Tracks */}
      <Reveal delay={0.08} className="overflow-visible">
        <div className="flex flex-col gap-0 sm:gap-1">
          {/* Row 1: Right Moving */}
          <InfiniteTestimonialTrack
            direction="right"
            speed={1.0}
            ariaLabel="Testimonials row 1"
          >
            {row1.map((item, index) => (
              <TestimonialCard key={`row1-${item.name}-${index}`} testimonial={item} />
            ))}
          </InfiniteTestimonialTrack>

          {/* Row 2: Left Moving */}
          <InfiniteTestimonialTrack
            direction="left"
            speed={1.0}
            ariaLabel="Testimonials row 2"
          >
            {row2.map((item, index) => (
              <TestimonialCard key={`row2-${item.name}-${index}`} testimonial={item} />
            ))}
          </InfiniteTestimonialTrack>
        </div>
      </Reveal>
    </MarketingSection>
  );
}
