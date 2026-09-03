import type { Locale } from "@/lib/i18n/config";
import { LOCALES, isLocale, parseLocale } from "@/lib/i18n/config";

export function generateLocaleStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function resolveLocaleParam(
  params: Promise<{ locale: string }>,
): Promise<Locale> {
  const { locale } = await params;
  if (!isLocale(locale)) {
    return parseLocale(locale);
  }
  return locale;
}
