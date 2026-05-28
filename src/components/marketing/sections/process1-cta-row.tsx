"use client";

import { GetCardCta } from "@/components/marketing/get-card-cta";

interface Process1CtaRowProps {
  ctaLabel: string;
  ctaHref: string;
}

/** Centered CTA — not wrapped in Reveal (motion-a11y: critical CTAs stay static). */
export function Process1CtaRow({ ctaLabel, ctaHref }: Process1CtaRowProps) {
  return (
    <div className="mb-marketing-header-gap-md flex justify-center">
      <GetCardCta href={ctaHref} size="md">
        {ctaLabel}
      </GetCardCta>
    </div>
  );
}
