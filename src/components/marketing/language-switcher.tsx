"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { LOCALES, localeFromPathname, localizePath, stripLocalePrefix, LOCALE_META } from "@/lib/i18n/config";
import type { Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

type LanguageSwitcherProps = {
  className?: string;
  /** Compact for nav; expanded for footer */
  variant?: "nav" | "footer";
};

export function LanguageSwitcher({ className, variant = "nav" }: LanguageSwitcherProps) {
  const pathname = usePathname() || "/";
  const searchParams = useSearchParams();
  const current = localeFromPathname(pathname);
  const bare = stripLocalePrefix(pathname);
  const qs = searchParams?.toString();
  const query = qs ? `?${qs}` : "";

  return (
    <div
      className={cn(
        "flex items-center gap-1 text-sm",
        variant === "footer" && "gap-2",
        className,
      )}
      role="navigation"
      aria-label="Language"
    >
      {LOCALES.map((locale: Locale) => {
        const href = `${localizePath(bare, locale)}${query}`;
        const active = locale === current;
        return (
          <Link
            key={locale}
            href={href}
            hrefLang={LOCALE_META[locale].htmlLang}
            className={cn(
              "rounded-full px-2.5 py-1 font-medium transition-colors",
              active
                ? variant === "footer"
                  ? "bg-white/15 text-white"
                  : "bg-brand-midnight/10 text-brand-midnight"
                : variant === "footer"
                  ? "text-brand-cream/50 hover:text-brand-turquoise"
                  : "text-brand-midnight/50 hover:text-brand-midnight",
            )}
            aria-current={active ? "page" : undefined}
          >
            {LOCALE_META[locale].shortLabel}
          </Link>
        );
      })}
    </div>
  );
}
