"use client";

import { usePathname } from "next/navigation";
import { CampaignLink } from "@/components/marketing/campaign-link";
import { Button } from "@/components/ui/button";
import { MarketingContainer, PageShell } from "@/components/marketing/primitives";
import { getChrome } from "@/content/get-content";
import { localeFromPathname, localizePath } from "@/lib/i18n/config";
import { type as typography } from "@/lib/typography";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const pathname = usePathname() ?? "/";
  const locale = localeFromPathname(pathname);
  const chrome = getChrome(locale);

  return (
    <PageShell pageBottom="default">
      <div className="flex min-h-[50vh] flex-col items-center justify-center py-marketing-section-y-compact">
        <MarketingContainer width="narrow" className="text-center">
          <h1 className={`${typography.sectionTitle} mb-4`}>
            {chrome.error.title}
          </h1>
          <p className={`${typography.lead} mx-auto mb-8 max-w-md`}>
            {chrome.error.message}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button
              type="button"
              variant="brandPrimary"
              size="lg"
              className="rounded-full"
              onClick={() => reset()}
            >
              {chrome.error.tryAgain}
            </Button>
            <Button
              variant="brandOutline"
              size="lg"
              className="rounded-full"
              render={<CampaignLink href={localizePath("/", locale)} />}
              nativeButton={false}
            >
              {chrome.notFound.backHome}
            </Button>
          </div>
        </MarketingContainer>
      </div>
    </PageShell>
  );
}
