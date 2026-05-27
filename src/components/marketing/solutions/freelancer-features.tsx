import { Zap, Link2, UserPlus } from "lucide-react";
import {
  MarketingSection,
  MarketingContainer,
  FeatureGrid,
  FeatureCard,
} from "@/components/marketing/primitives";

const features = [
  {
    icon: Zap,
    title: "60-second setup",
    description:
      "Launch your card before your next coffee meeting. No design skills required.",
  },
  {
    icon: Link2,
    title: "Link-in-bio replacement",
    description:
      "One beautiful URL for your entire professional presence — portfolio, socials, and contact.",
  },
  {
    icon: UserPlus,
    title: "Automatic lead capture",
    description: "Built-in forms capture prospect details and notify you instantly.",
  },
] as const;

export function FreelancerFeatures() {
  return (
    <MarketingSection background="white" spacing="compact">
      <MarketingContainer width="default">
        <FeatureGrid>
          {features.map((f) => (
            <FeatureCard key={f.title} variant="plain" {...f} />
          ))}
        </FeatureGrid>
      </MarketingContainer>
    </MarketingSection>
  );
}
