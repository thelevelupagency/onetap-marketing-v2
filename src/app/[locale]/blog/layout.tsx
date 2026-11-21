import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n/config";

/**
 * Blog layout pass-through (promo strip is owned by `MarketingPromoShell` in
 * `LocaleLayout` so client-side navigation never drops or duplicates it).
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

  return <>{children}</>;
}
