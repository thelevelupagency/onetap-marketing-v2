import { headers } from "next/headers";
import { GetCardCta } from "@/components/marketing/get-card-cta";
import { FinalCtaSection } from "@/components/marketing/sections/final-cta-section";
import { MarketingContainer, PageShell } from "@/components/marketing/primitives";
import { getChrome } from "@/content/get-content";
import {
  DEFAULT_LOCALE,
  localizePath,
  parseLocale,
  type Locale,
} from "@/lib/i18n/config";
import { LOCALE_HEADER } from "@/lib/i18n/locale-header";
import { type as typography } from "@/lib/typography";

async function readRequestLocale(): Promise<Locale> {
  const headerStore = await headers();
  return parseLocale(headerStore.get(LOCALE_HEADER) ?? DEFAULT_LOCALE);
}

export default async function NotFound() {
  const locale = await readRequestLocale();
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
