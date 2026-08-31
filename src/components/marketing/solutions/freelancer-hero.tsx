import { GetCardCta } from "@/components/marketing/get-card-cta";
import { AnimatedHeroTitle, MarketingPageHero } from "@/components/marketing/primitives";
import { getSolutions } from "@/content/get-content";
import type { Locale } from "@/lib/i18n/config";
import { type as typography } from "@/lib/typography";

export function FreelancerHero({ locale }: { locale: Locale }) {
  const { freelancersHeroCopy } = getSolutions(locale);
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
