import { Briefcase } from "lucide-react";
import { GetCardCta } from "@/components/marketing/get-card-cta";
import { MarketingPageHero, MarketingBadge, BrandAccent } from "@/components/marketing/primitives";
import { type as typography } from "@/lib/typography";

export function FreelancerHero() {
  return (
    <MarketingPageHero background="cream">
      <MarketingBadge icon={Briefcase} className="mb-6">
        For Freelancers
      </MarketingBadge>
      <h1 className={`${typography.pageTitle} mb-6`}>
        Win more clients with <BrandAccent>every handshake.</BrandAccent>
      </h1>
      <p className={`${typography.lead} mx-auto mb-10`}>
        Freelancers using OneTap report 80% more inquiries. Look professional, capture leads,
        and follow up faster.
      </p>
      <GetCardCta size="lg">Create your free card</GetCardCta>
    </MarketingPageHero>
  );
}
