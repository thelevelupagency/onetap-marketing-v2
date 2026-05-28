import { GetCardCta } from "@/components/marketing/get-card-cta";
import { FinalCtaSection } from "@/components/marketing/sections/final-cta-section";
import { MarketingContainer, PageShell } from "@/components/marketing/primitives";
import { type as typography } from "@/lib/typography";

export default function NotFound() {
  return (
    <PageShell pageBottom="none">
      <div className="flex min-h-[50vh] flex-col items-center justify-center py-marketing-section-y-compact">
        <MarketingContainer width="narrow" className="text-center">
          <h1 className={`${typography.displayError} mb-4`}>404</h1>
          <p className={`${typography.lead} mx-auto mb-8 max-w-md`}>
            This page doesn&apos;t exist — but your next great connection is one tap away.
          </p>
          <GetCardCta href="/" size="sm">
            Back to Home
          </GetCardCta>
        </MarketingContainer>
      </div>
      <FinalCtaSection />
    </PageShell>
  );
}
