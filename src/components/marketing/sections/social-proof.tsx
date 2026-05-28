"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { type as typography } from "@/lib/typography";
import {
  MarketingSection,
  MarketingContainer,
  SectionHeader,
} from "@/components/marketing/primitives";
import { CardReveal, MarketingStaggerGrid, Reveal } from "@/components/marketing/motion";
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
  return (
    <MarketingSection
      background={background}
      id="social-proof"
      className="overflow-hidden"
    >
      <MarketingContainer width="full">
        <Reveal>
          <SectionHeader
            title={copy.title}
            accent={copy.accent}
            spacingBelow="none"
            className="mb-marketing-header-gap-md"
          />
        </Reveal>

        <Reveal>
          <ul
            className="mb-marketing-header-gap flex flex-wrap items-center justify-center gap-x-4 gap-y-3 sm:gap-x-5 sm:gap-y-3.5"
            aria-label="Product highlights"
          >
            {copy.stats.map((stat) => (
              <li key={stat} className="list-none">
                <span className="inline-flex rounded-full border border-brand-midnight/10 bg-white px-4 py-2.5 text-center text-sm font-medium leading-snug text-brand-midnight/80 sm:px-5 sm:whitespace-nowrap">
                  {stat}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        <MarketingStaggerGrid columns={3}>
          {copy.testimonials.map((testimonial, index) => (
            <CardReveal key={testimonial.name} staggerIndex={index}>
              <Card
                className={cn(
                  "flex h-full flex-col gap-0 bg-white p-6 shadow-sm ring-brand-midnight/10 transition-transform duration-300 hover:-translate-y-1 hover:shadow-soft-diffusion"
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
                <p className={`${typography.bodySm} flex-1 text-brand-midnight/80`}>
                  <q>{testimonial.content}</q>
                </p>
              </Card>
            </CardReveal>
          ))}
        </MarketingStaggerGrid>
      </MarketingContainer>
    </MarketingSection>
  );
}
