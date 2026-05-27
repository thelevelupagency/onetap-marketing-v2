"use client";

import { useState } from "react";
import { SlugClaimCta } from "@/components/marketing/slug-claim-cta";
import { CtaBand } from "@/components/marketing/primitives";
import { Reveal } from "@/components/marketing/motion";
import { finalCtaCopy } from "@/content/homepage";
import { type as typography } from "@/lib/typography";
import { cn } from "@/lib/utils";

export function FinalCtaSection() {
  const [slug, setSlug] = useState("");

  return (
    <CtaBand
      title={finalCtaCopy.title}
      accent={finalCtaCopy.accent}
      containerWidth="wide"
      titleClassName="mb-marketing-header-gap-md"
    >
      <Reveal>
        <p
          className={cn(
            typography.sectionLead,
            "mx-auto mb-marketing-header-gap-md max-w-2xl text-pretty text-brand-cream/70"
          )}
        >
          {finalCtaCopy.subheadline}
        </p>
      </Reveal>
      <SlugClaimCta
        slug={slug}
        onSlugChange={setSlug}
        size="wide"
        surface="dark"
        submitLabel={finalCtaCopy.cta}
        className="mx-auto w-full"
      />
      <Reveal delay={0.08}>
        <p className="mt-marketing-stack-gap flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-brand-cream/50">
          {finalCtaCopy.microcopyItems.map((item, index) => (
            <span key={item} className="inline-flex items-center gap-2">
              {index > 0 ? (
                <span className="text-brand-cream/30" aria-hidden>
                  ·
                </span>
              ) : null}
              {item}
            </span>
          ))}
        </p>
      </Reveal>
    </CtaBand>
  );
}
