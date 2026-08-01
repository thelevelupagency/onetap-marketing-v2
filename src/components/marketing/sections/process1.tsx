import { MarketingSection } from "@/components/marketing/primitives";
import { ProcessGraphTimeline } from "@/components/marketing/sections/process-graph-timeline";
import { CREATE_BASICS_URL } from "@/lib/constants";
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
  title,
  accent,
  description,
  ctaLabel = "Get your card free",
  ctaHref = CREATE_BASICS_URL,
  steps,
}: Process1Props) {
  const stepBadgeBg = background === "cream" ? "bg-white" : "bg-brand-cream";

  return (
    <MarketingSection background={background} spacing="default" className={cn("overflow-hidden relative pb-0 md:pb-0 lg:pb-24", className)}>
      <ProcessGraphTimeline
        title={title}
        accent={accent}
        description={description}
        ctaLabel={ctaLabel}
        ctaHref={ctaHref}
        steps={steps}
        stepBadgeBg={stepBadgeBg}
      />
    </MarketingSection>
  );
}
