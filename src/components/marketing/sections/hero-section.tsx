"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SlugClaimCta } from "@/components/marketing/slug-claim-cta";
import { HeroPhonePreview } from "@/components/marketing/phones/hero-phone-preview";
import { MarketingBadge, BrandAccent, MarketingContainer } from "@/components/marketing/primitives";
import { type as typography } from "@/lib/typography";

export function HeroSection() {
  const [slug, setSlug] = useState("");
  const centerPhoneSlug = slug.trim() || "your-name";

  return (
    <section className="relative flex items-center bg-brand-cream pt-24 pb-8 lg:pt-28 lg:pb-12">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-32 h-96 w-96 rounded-full bg-brand-turquoise/10 blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 h-96 w-96 rounded-full bg-brand-navy/5 blur-3xl" />
        <div className="absolute top-1/2 right-1/4 h-64 w-64 rounded-full bg-brand-turquoise/5 blur-3xl" />
      </div>

      <MarketingContainer width="full" className="relative z-10">
        <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-2 lg:items-center lg:gap-6 xl:gap-10">
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <MarketingBadge icon={Sparkles} className="mb-6 hover:bg-brand-turquoise/30">
                Digital business cards, reimagined
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
              Create a stunning personal microsite, share it with a tap or scan, and capture
              leads automatically — no app required for recipients.
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
              No credit card required · Setup in 60 seconds
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="m-0 flex min-w-0 w-full justify-center p-0 leading-none"
          >
            <HeroPhonePreview centerSlug={centerPhoneSlug} />
          </motion.div>
        </div>
      </MarketingContainer>
    </section>
  );
}
