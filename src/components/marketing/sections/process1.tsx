import {
  MarketingContainer,
  MarketingSection,
} from "@/components/marketing/primitives";
import { Process1CtaRow } from "@/components/marketing/sections/process1-cta-row";
import { Process1Intro } from "@/components/marketing/sections/process1-intro";
import { Process1Steps } from "@/components/marketing/sections/process1-steps";
import { CREATE_BASICS_URL } from "@/lib/constants";

export interface ProcessStep {
  step: string;
  title: string;
  highlight?: string;
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
  ctaLabel = "Get your card",
  ctaHref = CREATE_BASICS_URL,
  steps,
}: Process1Props) {
  const stepBadgeBg = background === "cream" ? "bg-white" : "bg-brand-cream";

  return (
    <MarketingSection background={background} spacing="default" className={className}>
      <MarketingContainer width="wide">
        <Process1Intro title={title} accent={accent} description={description} />
        <Process1CtaRow ctaLabel={ctaLabel} ctaHref={ctaHref} />
        <Process1Steps steps={steps} stepBadgeBg={stepBadgeBg} />
      </MarketingContainer>
    </MarketingSection>
  );
}
