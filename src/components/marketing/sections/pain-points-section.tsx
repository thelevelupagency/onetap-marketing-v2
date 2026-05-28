import {
  MarketingSection,
  MarketingContainer,
  SectionHeader,
} from "@/components/marketing/primitives";
import { Reveal } from "@/components/marketing/motion";
import { painPointsCopy } from "@/content/homepage";
import type { MarketingBandBackground, PainPointsCopy } from "@/content/marketing-copy-types";
import { PainPointsAnimatedGrid } from "@/components/marketing/sections/pain-points-animated-grid";

export type { PainPointsCopy } from "@/content/marketing-copy-types";

interface PainPointsSectionProps {
  copy?: PainPointsCopy;
  background?: MarketingBandBackground;
}

export function PainPointsSection({
  copy = painPointsCopy,
  background = "white",
}: PainPointsSectionProps) {
  return (
    <MarketingSection background={background} id="pain-points">
      <MarketingContainer width="wide">
        <Reveal>
          <SectionHeader
            title={copy.title}
            accent={copy.accent}
            lead={copy.lead}
          />
        </Reveal>
        <PainPointsAnimatedGrid points={copy.points} />
      </MarketingContainer>
    </MarketingSection>
  );
}
