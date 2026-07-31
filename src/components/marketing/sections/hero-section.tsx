"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SlugClaimCta } from "@/components/marketing/slug-claim-cta";
import { AnimatedPhoneGrid } from "@/components/marketing/phones/animated-phone-grid";
import {
  MarketingBadge,
  BrandAccent,
  MarketingContainer,
  MarketingSection,
} from "@/components/marketing/primitives";
import { RevealItem, RevealStagger } from "@/components/marketing/motion";
import { HERO_MOBILE_MOUNT_TOKENS, useMotionConfig } from "@/lib/motion";
import { marketingOutlineCtaClassName } from "@/components/marketing/get-card-cta";
import { heroCopy } from "@/content/homepage";
import { type as typography } from "@/lib/typography";
import { cn } from "@/lib/utils";

const HERO_INTRO_STAGGER = HERO_MOBILE_MOUNT_TOKENS.staggerChildren;

export function HeroSection() {
  const [slug, setSlug] = useState("");
  const { isMobile } = useMotionConfig();

  const ctaBlock = (
    <div className="flex w-full flex-col items-center justify-center gap-3 lg:flex-row lg:items-start max-w-4xl mx-auto">
      <SlugClaimCta slug={slug} onSlugChange={setSlug} size="wide" className="w-full lg:flex-1" />
      <Link href="#how-it-works" className="w-full max-w-2xl lg:max-w-none lg:w-auto shrink-0 flex justify-center">
        <Button size="lg" variant="brandOutline" className={cn(marketingOutlineCtaClassName, "h-14 px-8 rounded-full text-base !w-full lg:!w-auto")}>
          See how it works
        </Button>
      </Link>
    </div>
  );

  const microcopyBlock = (
    <div className="text-center">
      <p className="mt-3 text-sm text-brand-midnight/50">{heroCopy.microcopy}</p>
      <p className="mt-1 text-sm text-brand-midnight/60">{heroCopy.trustLine}</p>
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
            <RevealItem>
              <MarketingBadge icon={Sparkles} className="mb-6 hover:bg-brand-turquoise/30">
                {heroCopy.badge}
              </MarketingBadge>
            </RevealItem>

            <RevealItem>
              <h1 className={`${typography.hero} mb-6 text-center max-w-5xl`}>
                Your Digital Business Card in <BrandAccent>One Tap.</BrandAccent>{" "}
                <br className="block sm:hidden" />
                Appear Everywhere.
              </h1>
            </RevealItem>

            <RevealItem>
              <p className={`${typography.lead} mx-auto mb-8 max-w-2xl text-center`}>
                {heroCopy.subheadline}
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
