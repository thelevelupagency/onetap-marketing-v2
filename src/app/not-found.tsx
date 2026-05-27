import { GetCardCta } from "@/components/marketing/get-card-cta";
import { MarketingContainer, PageShell } from "@/components/marketing/primitives";
import { type as typography } from "@/lib/typography";

export default function NotFound() {
  return (
    <PageShell className="flex min-h-[70vh] items-center justify-center">
      <MarketingContainer width="narrow" className="text-center">
        <h1 className={`${typography.displayError} mb-4`}>404</h1>
        <p className={`${typography.lead} mb-8 max-w-md mx-auto`}>
          This page doesn&apos;t exist — but your next great connection is one tap away.
        </p>
        <GetCardCta href="/" size="sm">
          Back to Home
        </GetCardCta>
      </MarketingContainer>
    </PageShell>
  );
}
