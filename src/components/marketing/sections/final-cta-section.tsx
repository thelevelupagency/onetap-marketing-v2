import { Check } from "lucide-react";
import { GetCardCta } from "@/components/marketing/get-card-cta";
import {
  AnimatedBorderPanel,
  BrandAccent,
  MarketingContainer,
  MarketingSection,
} from "@/components/marketing/primitives";
import { getFinalCtaCopy, type FinalCtaVariant } from "@/content/final-cta";

export type { FinalCtaVariant };
import { type as typography } from "@/lib/typography";
import { cn } from "@/lib/utils";

interface FinalCtaSectionProps {
  variant?: FinalCtaVariant;
}

export function FinalCtaSection({ variant = "default" }: FinalCtaSectionProps) {
  const copy = getFinalCtaCopy(variant);

  return (
    <MarketingSection background="white" spacing="compact">
      <MarketingContainer width="wide">
        <AnimatedBorderPanel
          innerClassName={cn(
            "px-marketing-card-padding py-marketing-section-y-compact text-center",
            "md:px-10 md:py-12"
          )}
        >
          <h2
            className={cn(
              typography.sectionTitle,
              "mb-marketing-header-gap-md text-balance text-brand-cream"
            )}
          >
            {copy.title} <BrandAccent>{copy.accent}</BrandAccent>
          </h2>

          <p
            className={cn(
              typography.sectionLead,
              "mx-auto mb-marketing-header-gap-md max-w-2xl text-pretty text-brand-cream/75"
            )}
          >
            {copy.subheadline}
          </p>

          <div className="flex justify-center">
            <GetCardCta size="lg">{copy.cta}</GetCardCta>
          </div>

          <ul
            className="mt-marketing-stack-gap flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-brand-cream/60"
            aria-label="What's included"
          >
            {copy.microcopyItems.map((item) => (
              <li key={item} className="inline-flex items-center gap-1.5">
                <Check
                  className="h-4 w-4 shrink-0 text-brand-turquoise"
                  aria-hidden
                />
                {item}
              </li>
            ))}
          </ul>
        </AnimatedBorderPanel>
      </MarketingContainer>
    </MarketingSection>
  );
}
