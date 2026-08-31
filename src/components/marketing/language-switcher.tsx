"use client";

import Link from "next/link";
import { Check, Globe } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLocale } from "@/components/providers/locale-provider";
import { getChrome } from "@/content/get-content";
import {
  LOCALES,
  LOCALE_META,
  getLocaleMeta,
  localizePath,
  stripLocalePrefix,
  type Locale,
} from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

type LanguageSwitcherProps = {
  className?: string;
  /** Compact icon for nav; on-dark styles for footer */
  variant?: "nav" | "footer";
};

export function LanguageSwitcher({ className, variant = "nav" }: LanguageSwitcherProps) {
  const pathname = usePathname() || "/";
  const searchParams = useSearchParams();
  const current = useLocale();
  const chrome = getChrome(current);
  const meta = getLocaleMeta(current);
  const bare = stripLocalePrefix(pathname);
  const qs = searchParams?.toString();
  const query = qs ? `?${qs}` : "";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              variant === "footer"
                ? "text-brand-cream/60 hover:bg-white/10 hover:text-brand-turquoise"
                : "text-brand-midnight/60 hover:bg-brand-midnight/5 hover:text-brand-midnight",
              className,
            )}
            aria-label={chrome.language.switchTo}
          />
        }
      >
        <Globe className="h-5 w-5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        style={{ direction: meta.dir }}
        className="min-w-44 text-start"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel>{chrome.language.switchTo}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {LOCALES.map((locale: Locale) => {
            const href = `${localizePath(bare, locale)}${query}`;
            const selected = locale === current;
            const localeMeta = LOCALE_META[locale];
            return (
              <DropdownMenuItem
                key={locale}
                disabled={selected}
                render={
                  <Link
                    href={href}
                    hrefLang={localeMeta.htmlLang}
                    aria-current={selected ? "page" : undefined}
                  />
                }
                className={cn(selected && "bg-accent text-accent-foreground")}
              >
                <span className="flex-1">{localeMeta.nativeLabel}</span>
                {selected ? <Check className="h-4 w-4" /> : null}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
