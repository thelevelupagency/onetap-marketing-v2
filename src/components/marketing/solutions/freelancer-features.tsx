import {
  MarketingSection,
  MarketingContainer,
  SectionHeader,
  FeatureGrid,
  FeatureCard,
} from "@/components/marketing/primitives";
import type { MarketingBandBackground } from "@/content/marketing-copy-types";
import { freelancersFeaturesCopy } from "@/content/solutions";
import { solutionFeatureIcons } from "@/lib/marketing-icons";

interface FreelancerFeaturesProps {
  background?: MarketingBandBackground;
}

export function FreelancerFeatures({ background = "white" }: FreelancerFeaturesProps) {
  return (
    <MarketingSection background={background} spacing="compact">
      <MarketingContainer width="default">
        <SectionHeader
          title={freelancersFeaturesCopy.title}
          accent={freelancersFeaturesCopy.accent}
          lead={freelancersFeaturesCopy.lead}
        />
        <FeatureGrid>
          {freelancersFeaturesCopy.features.map((f) => {
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
