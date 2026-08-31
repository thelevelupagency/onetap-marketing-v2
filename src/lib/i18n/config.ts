export const LOCALES = ["en", "he"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_META: Record<
  Locale,
  {
    htmlLang: string;
    dir: "ltr" | "rtl";
    ogLocale: string;
    nativeLabel: string;
    shortLabel: string;
  }
> = {
  en: {
    htmlLang: "en",
    dir: "ltr",
    ogLocale: "en_US",
    nativeLabel: "English",
    shortLabel: "EN",
  },
  he: {
    htmlLang: "he",
    dir: "rtl",
    ogLocale: "he_IL",
    nativeLabel: "עברית",
    shortLabel: "עב",
  },
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function parseLocale(value: string | null | undefined): Locale {
  if (value && isLocale(value)) return value;
  return DEFAULT_LOCALE;
}

/** Strip a leading `/en` or `/he` segment. Returns path starting with `/`. */
export function stripLocalePrefix(pathname: string): string {
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const match = normalized.match(/^\/(en|he)(?=\/|$)/);
  if (!match) return normalized === "" ? "/" : normalized;
  const rest = normalized.slice(match[0].length);
  return rest === "" ? "/" : rest;
}

/**
 * Build a public URL path for a locale.
 * English is unprefixed (`/pricing`); Hebrew uses `/he` (`/he/pricing`).
 */
export function localizePath(path: string, locale: Locale): string {
  const bare = stripLocalePrefix(path);
  const safe = bare.startsWith("/") ? bare : `/${bare}`;
  if (locale === DEFAULT_LOCALE) {
    return safe;
  }
  if (safe === "/") return `/${locale}`;
  return `/${locale}${safe}`;
}

/** Detect locale from a browser pathname (`/he/pricing` → `he`). */
export function localeFromPathname(pathname: string): Locale {
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  if (normalized === "/he" || normalized.startsWith("/he/")) return "he";
  return DEFAULT_LOCALE;
}

export function getLocaleAlternates(
  path: string,
  siteUrl: string,
): Record<string, string> {
  const bare = stripLocalePrefix(path);
  const enPath = localizePath(bare, "en");
  const hePath = localizePath(bare, "he");
  return {
    en: `${siteUrl}${enPath === "/" ? "" : enPath}`,
    he: `${siteUrl}${hePath}`,
    "x-default": `${siteUrl}${enPath === "/" ? "" : enPath}`,
  };
}
