import { GetCardCta } from "@/components/marketing/get-card-cta";
import { MarketingLaptopPreview } from "@/components/marketing/phones/marketing-laptop-preview";
import {
  MarketingSection,
  MarketingContainer,
  SectionHeader,
} from "@/components/marketing/primitives";
import { Reveal } from "@/components/marketing/motion";
import type { MarketingBandBackground } from "@/content/marketing-copy-types";
import { agenciesWorkspaceCopy } from "@/content/solutions";
import { SIGNUP_URL } from "@/lib/constants";

interface AgencyWorkspaceSimulatorProps {
  background?: MarketingBandBackground;
}

export function AgencyWorkspaceSimulator({
  background = "white",
}: AgencyWorkspaceSimulatorProps) {
  const copy = agenciesWorkspaceCopy;

  return (
    <MarketingSection
      background={background}
      spacing="compact"
      id="workspace"
      className="relative overflow-visible"
    >
      <div
        className="pointer-events-none absolute -top-24 right-0 h-[400px] w-[400px] rounded-full bg-brand-navy/5 blur-3xl"
        aria-hidden
      />

      <MarketingContainer width="wide" className="relative z-10">
        <Reveal>
          <SectionHeader
            title={copy.title}
            accent={copy.accent}
            lead={copy.lead}
            spacingBelow="none"
          />
        </Reveal>

        <Reveal direction="up" className="mt-6 flex justify-center md:mt-8">
          <MarketingLaptopPreview priority />
        </Reveal>

        <div className="flex justify-center pt-marketing-stack-gap">
          <GetCardCta href={SIGNUP_URL} size="md">
            {copy.cta}
          </GetCardCta>
        </div>
      </MarketingContainer>
    </MarketingSection>
  );
}
