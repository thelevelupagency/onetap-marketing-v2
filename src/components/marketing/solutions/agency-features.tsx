import { Lock, Users, BarChart3 } from "lucide-react";
import {
  MarketingSection,
  MarketingContainer,
  SectionHeader,
  FeatureGrid,
  FeatureCard,
} from "@/components/marketing/primitives";

const features = [
  {
    icon: Lock,
    title: "Brand Lock",
    description: "Apply firm branding across every agent card simultaneously.",
  },
  {
    icon: Users,
    title: "Bulk User Import",
    description: "Onboard 10 to 10,000 team members via CSV in minutes.",
  },
  {
    icon: BarChart3,
    title: "Team Analytics",
    description: "Track impressions, leads, and vCard downloads per agent.",
  },
] as const;

export function AgencyFeatures() {
  return (
    <MarketingSection background="white" spacing="compact">
      <MarketingContainer width="default">
        <SectionHeader title="Enterprise features," accent="out of the box" />
        <FeatureGrid>
          {features.map((f) => (
            <FeatureCard key={f.title} variant="elevated" {...f} />
          ))}
        </FeatureGrid>
      </MarketingContainer>
    </MarketingSection>
  );
}
