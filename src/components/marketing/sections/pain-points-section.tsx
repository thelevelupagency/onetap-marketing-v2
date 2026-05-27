import {
  MarketingSection,
  MarketingContainer,
  SectionHeader,
  PainPointCard,
} from "@/components/marketing/primitives";
import { painPointsCopy } from "@/content/homepage";
import { painPointIcons } from "@/lib/marketing-icons";

export function PainPointsSection() {
  return (
    <MarketingSection background="white" id="pain-points">
      <MarketingContainer width="wide">
        <SectionHeader
          title={painPointsCopy.title}
          accent={painPointsCopy.accent}
          lead={painPointsCopy.lead}
        />
        <div className="grid gap-8 md:grid-cols-3">
          {painPointsCopy.points.map((point) => {
            const Icon = painPointIcons[point.icon];
            return (
              <PainPointCard
                key={point.title}
                icon={Icon}
                title={point.title}
                description={point.description}
                accent={point.accent}
              />
            );
          })}
        </div>
      </MarketingContainer>
    </MarketingSection>
  );
}
