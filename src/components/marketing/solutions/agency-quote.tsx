import Link from "next/link";
import { MarketingPrimaryButton } from "@/components/marketing/get-card-cta";
import { MarketingSection, MarketingContainer } from "@/components/marketing/primitives";
import { type as typography } from "@/lib/typography";

export function AgencyQuote() {
  return (
    <MarketingSection background="cream" spacing="compact" className="text-center">
      <MarketingContainer width="narrow">
        <p className={`${typography.subsectionTitle} mb-8 italic`}>
          &ldquo;Brand Lock alone saved our legal team weeks of compliance headaches.&rdquo;
        </p>
        <p className={`${typography.caption} mb-8`}>— Managing Partner, Park & Associates</p>
        <Link href="/pricing">
          <MarketingPrimaryButton>View Agency pricing</MarketingPrimaryButton>
        </Link>
      </MarketingContainer>
    </MarketingSection>
  );
}
