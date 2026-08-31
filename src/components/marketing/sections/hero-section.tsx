"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { SlugClaimCta } from "@/components/marketing/slug-claim-cta";
import { AnimatedPhoneGrid } from "@/components/marketing/phones/animated-phone-grid";
import {
  BrandAccent,
  MarketingContainer,
  MarketingSection,
} from "@/components/marketing/primitives";
import { RevealItem, RevealStagger } from "@/components/marketing/motion";
import { HERO_MOBILE_MOUNT_TOKENS, useMotionConfig } from "@/lib/motion";
import { marketingOutlineCtaClassName } from "@/components/marketing/get-card-cta";
import { getChrome, getHomepage } from "@/content/get-content";
import type { Locale } from "@/lib/i18n/config";
import { type as typography } from "@/lib/typography";
import { cn } from "@/lib/utils";

const HERO_INTRO_STAGGER = HERO_MOBILE_MOUNT_TOKENS.staggerChildren;

const HERO_TITLE_CLASS = `${typography.hero} mb-6 text-center max-w-5xl`;
const HERO_TEXT_EFFECT_CLASS = "inline";

function HeroTitle({ prefersReducedMotion, locale }: { prefersReducedMotion: boolean; locale: Locale }) {
  const chrome = getChrome(locale);
  const { title, titleAccent, titleRest } = chrome.hero;
  const fullTitle = `${title} ${titleAccent} ${titleRest}`;

  if (prefersReducedMotion) {
    return (
      <h1 className={HERO_TITLE_CLASS}>
        {title} <BrandAccent>{titleAccent}</BrandAccent>{" "}
        <br className="block sm:hidden" />
        {titleRest}
      </h1>
    );
  }

  return (
    <h1 className={HERO_TITLE_CLASS}>
      <TextGenerateEffect
        words={fullTitle}
        className={HERO_TEXT_EFFECT_CLASS}
        accentWords={titleAccent}
        accentClassName="italic text-brand-turquoise"
        breakBeforeWord={titleRest.split(" ")[0]}
      />
    </h1>
  );
}

interface HeroSectionProps {
  locale: Locale;
}

export function HeroSection({ locale }: HeroSectionProps) {
  const [slug, setSlug] = useState("");
  const { isMobile, prefersReducedMotion } = useMotionConfig();
  const chrome = getChrome(locale);
  const homepage = getHomepage(locale);

  const ctaBlock = (
    <div className="flex w-full flex-col items-center justify-center gap-3 lg:flex-row lg:items-start max-w-4xl mx-auto">
      <SlugClaimCta slug={slug} onSlugChange={setSlug} size="wide" locale={locale} className="w-full lg:flex-1" />
      <Link href="#how-it-works" className="w-full max-w-2xl lg:max-w-none lg:w-auto shrink-0 flex justify-center">
        <Button size="lg" variant="brandOutline" className={cn(marketingOutlineCtaClassName, "h-14 px-8 rounded-full text-base !w-full lg:!w-auto")}>
          {chrome.hero.seeHowItWorks}
        </Button>
      </Link>
    </div>
  );

  const microcopyBlock = (
    <div className="text-center">
      <p className="mt-3 text-sm text-brand-midnight/50">{homepage.heroCopy.microcopy}</p>
      <p className="mt-1 text-sm text-brand-midnight/60">{homepage.heroCopy.trustLine}</p>
    </div>
  );

  return (
    <MarketingSection
      id="hero"
      background="cream"
      spacing="hero"
      className="relative flex flex-col items-center overflow-hidden"
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

      <RevealStagger
        mode="mount"
        staggerChildren={isMobile ? HERO_INTRO_STAGGER : 0.1}
        className="w-full flex flex-col items-center"
      >
        <MarketingContainer width="full" className="relative z-10 text-center">
          <div className="mx-auto max-w-5xl lg:max-w-6xl flex flex-col items-center">
            <HeroTitle prefersReducedMotion={prefersReducedMotion} locale={locale} />

            <RevealItem>
              <p className={`${typography.lead} mx-auto mb-8 max-w-2xl text-center`}>
                {homepage.heroCopy.subheadline}
              </p>
            </RevealItem>

            <RevealItem className="w-full flex justify-center">
              {ctaBlock}
            </RevealItem>

            <RevealItem>
              {microcopyBlock}
            </RevealItem>
          </div>
        </MarketingContainer>

        {/* Infinite Horizontal Phone Row Below Hero Content */}
        <RevealItem className="w-full mt-8 relative z-10">
          <AnimatedPhoneGrid />
        </RevealItem>
      </RevealStagger>
    </MarketingSection>
  );
}
