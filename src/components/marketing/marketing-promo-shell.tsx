import { MarketingPromoStrip } from "@/components/marketing/marketing-promo-strip";
import { MarketingPromoProvider } from "@/components/providers/marketing-promo-provider";
import { PromoQueryCarry } from "@/components/providers/promo-query-carry";
import type { Locale } from "@/lib/i18n/config";
import { loadMarketingPromo } from "@/lib/promotions/load-marketing-promo";

/**
 * Shared promo fetch for the strip and pricing.
 * Always mounted in LocaleLayout so client-side navigation between blog and
 * other routes never drops or duplicates the strip.
 */
export async function MarketingPromoShell({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const promo = await loadMarketingPromo();

  return (
    <MarketingPromoProvider value={promo}>
      <MarketingPromoStrip
        campaign={promo.campaign}
        discount={promo.discount}
        locale={locale}
      />
      <PromoQueryCarry />
      {children}
    </MarketingPromoProvider>
  );
}
