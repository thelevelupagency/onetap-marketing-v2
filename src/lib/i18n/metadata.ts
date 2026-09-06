import type { Metadata } from "next";
import { DEFAULT_OG_IMAGE, DEFAULT_OG_IMAGE_URL } from "@/lib/constants";
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
  const includeOpenGraph = options.openGraph !== false;

  const metadata: Metadata = {
    title: options.title,
    description: options.description,
    alternates: {
      canonical,
      languages,
    },
    openGraph: includeOpenGraph
      ? {
          title: options.title,
          description: options.description,
          locale: meta.ogLocale,
          url: canonical,
          images: [DEFAULT_OG_IMAGE],
        }
      : undefined,
    twitter: includeOpenGraph
      ? {
          card: "summary_large_image",
          title: options.title,
          description: options.description,
          images: [DEFAULT_OG_IMAGE_URL],
        }
      : undefined,
  };

  return metadata;
}
