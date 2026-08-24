import { GetCardCta } from "@/components/marketing/get-card-cta";
import { AnimatedHeroTitle, MarketingPageHero } from "@/components/marketing/primitives";
import { freelancersHeroCopy } from "@/content/solutions";
import { type as typography } from "@/lib/typography";

export function FreelancerHero() {
  return (
    <MarketingPageHero background="cream">
      <AnimatedHeroTitle
        title={freelancersHeroCopy.title}
        accent={freelancersHeroCopy.accent}
        className={`${typography.pageTitle} mb-6`}
      />
      <p className={`${typography.lead} mx-auto mb-10`}>{freelancersHeroCopy.lead}</p>
      <div className="flex justify-center">
        <GetCardCta size="lg" placement="freelancer_hero">{freelancersHeroCopy.cta}</GetCardCta>
      </div>
    </MarketingPageHero>
  );
}
