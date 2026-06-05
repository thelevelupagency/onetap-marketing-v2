import { Building2 } from "lucide-react";
import {
  GetCardCta,
  MarketingHeroSecondaryCta,
  marketingHeroPrimaryOnDarkClassName,
} from "@/components/marketing/get-card-cta";
import { MarketingPageHero, MarketingBadge, BrandAccent } from "@/components/marketing/primitives";
import { agenciesHeroCopy } from "@/content/solutions";
import { LOGIN_URL, SIGNUP_URL } from "@/lib/constants";
import { type as typography } from "@/lib/typography";

export function AgencyHero() {
  const copy = agenciesHeroCopy;

  return (
    <MarketingPageHero background="midnight">
      <MarketingBadge tone="onDark" icon={Building2} className="mb-6">
        {copy.badge}
      </MarketingBadge>
      <h1 className={`${typography.pageTitle} mb-6 text-brand-cream`}>
        {copy.title} <BrandAccent>{copy.accent}</BrandAccent>
      </h1>
      <p className={`${typography.lead} mx-auto mb-10 text-brand-cream/70`}>{copy.lead}</p>
      <div className="flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
        <GetCardCta
          href={SIGNUP_URL}
          size="lg"
          showArrow={false}
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
