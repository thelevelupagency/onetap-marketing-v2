import { headers } from "next/headers";
import { MarketingPromoStrip } from "@/components/marketing/marketing-promo-strip";
import { MarketingPromoProvider } from "@/components/providers/marketing-promo-provider";
import { PromoQueryCarry } from "@/components/providers/promo-query-carry";
import { PATHNAME_HEADER } from "@/lib/constants";
import type { Locale } from "@/lib/i18n/config";
import { loadMarketingPromo } from "@/lib/promotions/load-marketing-promo";
import { isMarketingBlogPath } from "@/lib/promotions/promo-navigation";

/**
 * Shared promo fetch for the strip and pricing.
 * Blog routes render the strip from `blog/layout.tsx` so it is part of that
 * layout's HTML, not only a streamed suspense slot on the locale shell.
 */
export async function MarketingPromoShell({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const promo = await loadMarketingPromo();
  const headerStore = await headers();
  const pathname = headerStore.get(PATHNAME_HEADER) ?? "";
  const showStrip = !isMarketingBlogPath(pathname);

  return (
    <MarketingPromoProvider value={promo}>
      {showStrip ? <MarketingPromoStrip campaign={promo.campaign} locale={locale} /> : null}
      <PromoQueryCarry />
      {children}
    </MarketingPromoProvider>
  );
}
