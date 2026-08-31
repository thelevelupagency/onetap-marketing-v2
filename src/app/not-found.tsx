import { GetCardCta } from "@/components/marketing/get-card-cta";
import { FinalCtaSection } from "@/components/marketing/sections/final-cta-section";
import { MarketingContainer, PageShell } from "@/components/marketing/primitives";
import { getChrome } from "@/content/get-content";
import { DEFAULT_LOCALE, localizePath } from "@/lib/i18n/config";
import { type as typography } from "@/lib/typography";

export default function NotFound() {
  // Root not-found has no [locale] param; default to English chrome + home.
  const locale = DEFAULT_LOCALE;
  const chrome = getChrome(locale);

  return (
    <PageShell pageBottom="none">
      <div className="flex min-h-[50vh] flex-col items-center justify-center py-marketing-section-y-compact">
        <MarketingContainer width="narrow" className="text-center">
          <h1 className={`${typography.displayError} mb-4`}>404</h1>
          <p className={`${typography.lead} mx-auto mb-8 max-w-md`}>
            {chrome.notFound.message}
          </p>
          <GetCardCta href={localizePath("/", locale)} size="sm">
            {chrome.notFound.backHome}
          </GetCardCta>
        </MarketingContainer>
      </div>
      <FinalCtaSection locale={locale} />
    </PageShell>
  );
}
