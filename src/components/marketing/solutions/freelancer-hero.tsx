import { Briefcase } from "lucide-react";
import { GetCardCta } from "@/components/marketing/get-card-cta";
import { MarketingPageHero, MarketingBadge, BrandAccent } from "@/components/marketing/primitives";
import { freelancersHeroCopy } from "@/content/solutions";
import { type as typography } from "@/lib/typography";

export function FreelancerHero() {
  return (
    <MarketingPageHero background="cream">
      <MarketingBadge icon={Briefcase} className="mb-6">
        {freelancersHeroCopy.badge}
      </MarketingBadge>
      <h1 className={`${typography.pageTitle} mb-6`}>
        {freelancersHeroCopy.title} <BrandAccent>{freelancersHeroCopy.accent}</BrandAccent>
      </h1>
      <p className={`${typography.lead} mx-auto mb-10`}>{freelancersHeroCopy.lead}</p>
      <div className="flex justify-center">
        <GetCardCta size="lg">{freelancersHeroCopy.cta}</GetCardCta>
      </div>
    </MarketingPageHero>
  );
}
