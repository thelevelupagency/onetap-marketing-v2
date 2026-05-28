import {
  MarketingSection,
  MarketingContainer,
  SectionHeader,
  FeatureGrid,
  FeatureCard,
} from "@/components/marketing/primitives";
import type { MarketingBandBackground } from "@/content/marketing-copy-types";
import { agenciesFeaturesCopy } from "@/content/solutions";
import { solutionFeatureIcons } from "@/lib/marketing-icons";

interface AgencyFeaturesProps {
  background?: MarketingBandBackground;
}

export function AgencyFeatures({ background = "white" }: AgencyFeaturesProps) {
  return (
    <MarketingSection background={background} spacing="compact">
      <MarketingContainer width="default">
        <SectionHeader
          title={agenciesFeaturesCopy.title}
          accent={agenciesFeaturesCopy.accent}
          lead={agenciesFeaturesCopy.lead}
        />
        <FeatureGrid>
          {agenciesFeaturesCopy.features.map((f) => {
            const Icon = solutionFeatureIcons[f.icon];
            return (
              <FeatureCard key={f.title} variant="elevated" icon={Icon} title={f.title} description={f.description} />
            );
          })}
        </FeatureGrid>
      </MarketingContainer>
    </MarketingSection>
  );
}
