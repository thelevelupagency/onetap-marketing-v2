import {
  MarketingSection,
  MarketingContainer,
  SectionHeader,
} from "@/components/marketing/primitives";
import { Reveal } from "@/components/marketing/motion";
import { painPointsCopy } from "@/content/homepage";
import { PainPointsAnimatedGrid } from "@/components/marketing/sections/pain-points-animated-grid";

export function PainPointsSection() {
  return (
    <MarketingSection background="white" id="pain-points">
      <MarketingContainer width="wide">
        <Reveal>
          <SectionHeader
            title={painPointsCopy.title}
            accent={painPointsCopy.accent}
            lead={painPointsCopy.lead}
          />
        </Reveal>
        <PainPointsAnimatedGrid points={painPointsCopy.points} />
      </MarketingContainer>
    </MarketingSection>
  );
}
