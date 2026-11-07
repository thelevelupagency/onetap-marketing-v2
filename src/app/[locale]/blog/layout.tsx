import { notFound } from "next/navigation";
import { MarketingPromoStrip } from "@/components/marketing/marketing-promo-strip";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { loadMarketingPromo } from "@/lib/promotions/load-marketing-promo";

/**
 * Blog index and posts render the promo strip in this layout.
 * The locale shell skips the strip on these paths so it is not duplicated.
 */
export default async function BlogLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale = localeParam as Locale;
  const promo = await loadMarketingPromo();

  return (
    <>
      <MarketingPromoStrip campaign={promo.campaign} locale={locale} />
      {children}
    </>
  );
}
