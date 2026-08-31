import { MarketingSection } from "@/components/marketing/primitives";
import { ProcessGraphTimeline } from "@/components/marketing/sections/process-graph-timeline";
import { getChrome } from "@/content/get-content";
import { CREATE_BASICS_URL } from "@/lib/constants";
import type { Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

interface Process1Props {
  className?: string;
  background?: "cream" | "white";
  locale: Locale;
  title: string;
  accent?: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
  steps: readonly ProcessStep[];
}

export function Process1({
  className,
  background = "white",
  locale,
  title,
  accent,
  description,
  ctaLabel,
  ctaHref = CREATE_BASICS_URL,
  steps,
}: Process1Props) {
  const chrome = getChrome(locale);
  const resolvedCtaLabel = ctaLabel ?? chrome.process.defaultCtaLabel;
  const stepBadgeBg = background === "cream" ? "bg-white" : "bg-brand-cream";

  return (
    <MarketingSection background={background} spacing="default" className={cn("overflow-hidden relative pb-0 md:pb-0 lg:pb-24", className)}>
      <ProcessGraphTimeline
        title={title}
        accent={accent}
        description={description}
        ctaLabel={resolvedCtaLabel}
        ctaHref={ctaHref}
        steps={steps}
        stepBadgeBg={stepBadgeBg}
      />
    </MarketingSection>
  );
}
