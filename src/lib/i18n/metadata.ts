import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n/config";
import { LOCALE_META, getLocaleAlternates, localizePath } from "@/lib/i18n/config";
import { getSiteUrl } from "@/lib/site-url";

export function buildLocaleMetadata(options: {
  locale: Locale;
  title: string;
  description: string;
  path: string;
  openGraph?: boolean;
}): Metadata {
  const siteUrl = getSiteUrl();
  const barePath = options.path.startsWith("/") ? options.path : `/${options.path}`;
  const localized = localizePath(barePath, options.locale);
  const canonical = `${siteUrl}${localized === "/" ? "" : localized}`;
  const languages = getLocaleAlternates(barePath, siteUrl);
  const meta = LOCALE_META[options.locale];

  const metadata: Metadata = {
    title: options.title,
    description: options.description,
    alternates: {
      canonical,
      languages,
    },
    openGraph: options.openGraph !== false
      ? {
          title: options.title,
          description: options.description,
          locale: meta.ogLocale,
          url: canonical,
        }
      : undefined,
  };

  return metadata;
}
