"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
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
import { heroCopy } from "@/content/homepage";
import { type as typography } from "@/lib/typography";

export function HeroSection() {
  const [slug, setSlug] = useState("");
  const centerPhoneSlug = slug.trim() || "your-name";

  return (
    <MarketingSection
      id="hero"
      background="cream"
      spacing="hero"
      className="relative flex items-center"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-32 h-96 w-96 rounded-full bg-brand-turquoise/10 blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 h-96 w-96 rounded-full bg-brand-navy/5 blur-3xl" />
        <div className="absolute top-1/2 right-1/4 h-64 w-64 rounded-full bg-brand-turquoise/5 blur-3xl" />
      </div>

      <MarketingContainer width="full" className="relative z-10">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:items-center lg:gap-6 xl:gap-10">
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <MarketingBadge icon={Sparkles} className="mb-6 hover:bg-brand-turquoise/30">
                {heroCopy.badge}
              </MarketingBadge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`${typography.hero} mb-6`}
            >
              Your Digital Business Card in <BrandAccent>One Tap.</BrandAccent>
              <br />
              Appear Everywhere.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`${typography.lead} mx-auto mb-10 max-w-xl lg:mx-0`}
            >
              {heroCopy.subheadline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex w-full flex-col items-center justify-center gap-4 lg:items-stretch lg:justify-start"
            >
              <SlugClaimCta slug={slug} onSlugChange={setSlug} className="mx-auto lg:mx-0" />
              <Link href="#how-it-works" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="brandOutline"
                  className="h-14 w-full rounded-full px-8 text-lg sm:w-auto"
                >
                  See how it works
                </Button>
              </Link>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8 text-sm text-brand-midnight/50"
            >
              {heroCopy.microcopy}
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="mt-4 text-sm text-brand-midnight/60"
            >
              {heroCopy.trustLine}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="m-0 flex min-w-0 w-full justify-center p-0 leading-none lg:sticky lg:top-28 lg:self-start"
          >
            <HeroPhonePreview centerSlug={centerPhoneSlug} />
          </motion.div>
        </div>
      </MarketingContainer>
    </MarketingSection>
  );
}
