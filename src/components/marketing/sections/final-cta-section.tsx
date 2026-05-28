import { Check } from "lucide-react";
import { GetCardCta } from "@/components/marketing/get-card-cta";
import {
  AnimatedBorderPanel,
  BrandAccent,
  MarketingContainer,
  MarketingSection,
} from "@/components/marketing/primitives";
import { finalCtaCopy } from "@/content/homepage";
import { type as typography } from "@/lib/typography";
import { cn } from "@/lib/utils";

export function FinalCtaSection() {
  return (
    <MarketingSection
      background="white"
      spacing="compact"
      className="border-t border-brand-midnight/8"
    >
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
            {finalCtaCopy.title}{" "}
            <BrandAccent>{finalCtaCopy.accent}</BrandAccent>
          </h2>

          <p
            className={cn(
              typography.sectionLead,
              "mx-auto mb-marketing-header-gap-md max-w-2xl text-pretty text-brand-cream/75"
            )}
          >
            {finalCtaCopy.subheadline}
          </p>

          <div className="flex justify-center">
            <GetCardCta size="lg">{finalCtaCopy.cta}</GetCardCta>
          </div>

          <ul
            className="mt-marketing-stack-gap flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-brand-cream/60"
            aria-label="What's included"
          >
            {finalCtaCopy.microcopyItems.map((item) => (
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
