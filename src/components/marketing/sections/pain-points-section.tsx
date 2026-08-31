import {
  MarketingSection,
  MarketingContainer,
  SectionHeader,
} from "@/components/marketing/primitives";
import { Reveal } from "@/components/marketing/motion";
import { getHomepage } from "@/content/get-content";
import type { MarketingBandBackground, PainPointsCopy } from "@/content/marketing-copy-types";
import type { Locale } from "@/lib/i18n/config";
import { PainPointsAnimatedGrid } from "@/components/marketing/sections/pain-points-animated-grid";

export type { PainPointsCopy } from "@/content/marketing-copy-types";

interface PainPointsSectionProps {
  locale: Locale;
  copy?: PainPointsCopy;
  background?: MarketingBandBackground;
}

export function PainPointsSection({
  locale,
  copy,
  background = "white",
}: PainPointsSectionProps) {
  const resolvedCopy = copy ?? getHomepage(locale).painPointsCopy;
  return (
    <MarketingSection background={background} id="pain-points">
      <MarketingContainer width="wide">
        <Reveal>
          <SectionHeader
            title={resolvedCopy.title}
            accent={resolvedCopy.accent}
            lead={resolvedCopy.lead}
          />
        </Reveal>
        <PainPointsAnimatedGrid points={resolvedCopy.points} />
      </MarketingContainer>
    </MarketingSection>
  );
}
