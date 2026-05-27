import Link from "next/link";
import { Building2, ArrowRight } from "lucide-react";
import { LOGIN_URL } from "@/lib/constants";
import { MarketingPageHero, MarketingBadge, BrandAccent } from "@/components/marketing/primitives";
import { MarketingPrimaryButton } from "@/components/marketing/get-card-cta";
import { type as typography } from "@/lib/typography";

export function AgencyHero() {
  return (
    <MarketingPageHero background="midnight">
      <MarketingBadge tone="onDark" icon={Building2} className="mb-6">
        For Agencies
      </MarketingBadge>
      <h1 className={`${typography.pageTitle} mb-6 text-brand-cream`}>
        Scale your team&apos;s identity. <BrandAccent>Save 50+ hours.</BrandAccent>
      </h1>
      <p className={`${typography.lead} mx-auto mb-10 text-brand-cream/70`}>
        Centralized professional identity for your entire organization. Brand Lock, bulk import,
        and CRM sync built in.
      </p>
      <Link href={LOGIN_URL}>
        <MarketingPrimaryButton className="bg-brand-turquoise text-brand-midnight hover:bg-brand-turquoise/90 hover:text-brand-midnight">
          Book a demo <ArrowRight className="ml-2 h-5 w-5" />
        </MarketingPrimaryButton>
      </Link>
    </MarketingPageHero>
  );
}
