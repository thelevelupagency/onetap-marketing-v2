"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SlugClaimCta } from "@/components/marketing/slug-claim-cta";
import { HeroPhonePreview } from "@/components/marketing/phones/hero-phone-preview";
import {
  MarketingBadge,
  BrandAccent,
  MarketingContainer,
  MarketingSection,
} from "@/components/marketing/primitives";
import { Reveal, RevealItem, RevealStagger } from "@/components/marketing/motion";
import { HERO_MOBILE_MOUNT_TOKENS, useMotionConfig } from "@/lib/motion";
import { marketingOutlineCtaClassName } from "@/components/marketing/get-card-cta";
import { heroCopy } from "@/content/homepage";
import { type as typography } from "@/lib/typography";

const HERO_INTRO_STAGGER = HERO_MOBILE_MOUNT_TOKENS.staggerChildren;

export function HeroSection() {
  const [slug, setSlug] = useState("");
  const centerPhoneSlug = slug.trim() || "your-name";
  const { isMobile } = useMotionConfig();

  const phonePreview = <HeroPhonePreview centerSlug={centerPhoneSlug} />;

  const ctaBlock = (
    <div className="flex w-full flex-col items-center justify-center gap-4 lg:items-stretch lg:justify-start">
      <SlugClaimCta slug={slug} onSlugChange={setSlug} className="mx-auto lg:mx-0" />
      <Link href="#how-it-works" className="w-full sm:w-auto">
        <Button size="lg" variant="brandOutline" className={marketingOutlineCtaClassName}>
          See how it works
        </Button>
      </Link>
    </div>
  );

  const microcopyBlock = (
    <>
      <p className="mt-marketing-stack-gap text-sm text-brand-midnight/50">{heroCopy.microcopy}</p>
      <p className="mt-marketing-stack-gap-sm text-sm text-brand-midnight/60">{heroCopy.trustLine}</p>
    </>
  );

  return (
    <MarketingSection
      id="hero"
      background="cream"
      spacing="hero"
      className="relative flex items-center"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="hero-ambient-blob absolute top-1/4 -left-32 h-96 w-96 rounded-full bg-brand-turquoise/10 blur-3xl" />
        <div
          className="hero-ambient-blob absolute bottom-1/4 -right-32 h-96 w-96 rounded-full bg-brand-navy/5 blur-3xl"
          style={{ animationDelay: "-6s" }}
        />
        <div
          className="hero-ambient-blob absolute top-1/2 right-1/4 h-64 w-64 rounded-full bg-brand-turquoise/5 blur-3xl"
          style={{ animationDelay: "-12s" }}
        />
      </div>

      <MarketingContainer width="full" className="relative z-10">
        <div className="grid items-center gap-marketing-grid-gap lg:grid-cols-2 lg:items-center lg:gap-marketing-stack-gap xl:gap-marketing-grid-gap-md">
          <div className="text-center lg:text-left">
            <RevealStagger
              mode="mount"
              staggerChildren={isMobile ? HERO_INTRO_STAGGER : undefined}
            >
              <RevealItem>
                <MarketingBadge icon={Sparkles} className="mb-6 hover:bg-brand-turquoise/30">
                  {heroCopy.badge}
                </MarketingBadge>
              </RevealItem>

              <RevealItem>
                <h1 className={`${typography.hero} mb-6`}>
                  Your Digital Business Card in <BrandAccent>One Tap.</BrandAccent>
                  <br />
                  Appear Everywhere.
                </h1>
              </RevealItem>

              <RevealItem>
                <p className={`${typography.lead} mx-auto mb-0 max-w-xl lg:mx-0 lg:mb-10`}>
                  {heroCopy.subheadline}
                </p>
              </RevealItem>
            </RevealStagger>

            {/* Mobile: product preview right after headline — before CTAs */}
            <div className="my-marketing-stack-gap lg:hidden">{phonePreview}</div>

            {ctaBlock}

            {isMobile ? (
              <Reveal mode="mount">{microcopyBlock}</Reveal>
            ) : (
              <RevealStagger
                mode="mount"
                staggerChildren={isMobile ? HERO_INTRO_STAGGER : undefined}
              >
                <RevealItem>
                  <p className="mt-marketing-stack-gap text-sm text-brand-midnight/50">
                    {heroCopy.microcopy}
                  </p>
                </RevealItem>
                <RevealItem>
                  <p className="mt-marketing-stack-gap-sm text-sm text-brand-midnight/60">
                    {heroCopy.trustLine}
                  </p>
                </RevealItem>
              </RevealStagger>
            )}
          </div>

          <Reveal
            mode="mount"
            delay={0.2}
            className="m-0 hidden min-w-0 w-full justify-center p-0 leading-none lg:sticky lg:top-28 lg:flex lg:self-start"
          >
            {phonePreview}
          </Reveal>
        </div>
      </MarketingContainer>
    </MarketingSection>
  );
}
