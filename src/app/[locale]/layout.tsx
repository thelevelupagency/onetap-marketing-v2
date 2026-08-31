import { notFound } from "next/navigation";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { getChrome } from "@/content/get-content";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { generateLocaleStaticParams } from "@/lib/i18n/locale-params";

export function generateStaticParams() {
  return generateLocaleStaticParams();
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) {
    notFound();
  }
  const locale = localeParam as Locale;
  const chrome = getChrome(locale);

  return (
    <>
      <Navigation chrome={chrome} locale={locale} />
      <div className="flex-1">{children}</div>
      <Footer />
    </>
  );
}
