import {
  GetCardCta,
  MarketingHeroSecondaryCta,
  marketingHeroPrimaryOnDarkClassName,
} from "@/components/marketing/get-card-cta";
import { AnimatedHeroTitle, MarketingPageHero } from "@/components/marketing/primitives";
import { agenciesHeroCopy } from "@/content/solutions";
import { CREATE_BASICS_URL, LOGIN_URL } from "@/lib/constants";
import { type as typography } from "@/lib/typography";

export function AgencyHero() {
  const copy = agenciesHeroCopy;

  return (
    <MarketingPageHero background="midnight">
      <AnimatedHeroTitle
        title={copy.title}
        accent={copy.accent}
        className={`${typography.pageTitle} mb-6 text-brand-cream`}
      />
      <p className={`${typography.lead} mx-auto mb-10 text-brand-cream/70`}>{copy.lead}</p>
      <div className="flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
        <GetCardCta
          href={CREATE_BASICS_URL}
          size="lg"
          showArrow={false}
          placement="agency_hero"
          className={marketingHeroPrimaryOnDarkClassName}
        >
          {copy.primaryCta}
        </GetCardCta>
        <MarketingHeroSecondaryCta href={LOGIN_URL}>
          {copy.secondaryCta}
        </MarketingHeroSecondaryCta>
      </div>
    </MarketingPageHero>
  );
}
