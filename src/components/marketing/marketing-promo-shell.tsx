import { Suspense } from "react";
import { headers } from "next/headers";
import { MarketingPromoProvider } from "@/components/providers/marketing-promo-provider";
import { MarketingPromoStrip } from "@/components/marketing/marketing-promo-strip";
import { PROMO_SLUG_HEADER } from "@/lib/constants";
import type { Locale } from "@/lib/i18n/config";
import { fetchPublicPromoCampaign } from "@/lib/promotions/public-promo";

async function MarketingPromoContent({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const headerStore = await headers();
  const promoSlug = headerStore.get(PROMO_SLUG_HEADER);
  const campaign = await fetchPublicPromoCampaign(promoSlug);

  return (
    <MarketingPromoProvider campaign={campaign}>
      <MarketingPromoStrip campaign={campaign} locale={locale} />
      {children}
    </MarketingPromoProvider>
  );
}

/** One server fetch shared by the strip and pricing price badges. */
export function MarketingPromoShell({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <MarketingPromoProvider campaign={null}>{children}</MarketingPromoProvider>
      }
    >
      <MarketingPromoContent locale={locale}>{children}</MarketingPromoContent>
    </Suspense>
  );
}
