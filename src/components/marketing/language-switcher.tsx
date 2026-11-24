"use client";

import { CampaignLink } from "@/components/marketing/campaign-link";
import { Check, Globe } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
  isRtlLocale,
  localizePath,
  stripLocalePrefix,
  type Locale,
} from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

type LanguageSwitcherProps = {
  className?: string;
  /** Compact icon for nav; on-dark styles for footer; accordion list for mobile sheet */
  variant?: "nav" | "footer" | "sheet";
};

export function LanguageSwitcher({ className, variant = "nav" }: LanguageSwitcherProps) {
  const pathname = usePathname() || "/";
  const searchParams = useSearchParams();
  const current = useLocale();
  const chrome = getChrome(current);
  const isRtl = isRtlLocale(current);
  const bare = stripLocalePrefix(pathname);
  const qs = searchParams?.toString();
  const query = qs ? `?${qs}` : "";

  if (variant === "sheet") {
    return (
      <Accordion dir={isRtl ? "rtl" : "ltr"} className={cn("w-full", className)}>
        <AccordionItem value="language" className="border-b-0">
          <AccordionTrigger className="py-0 text-base font-semibold text-brand-midnight hover:no-underline">
            {chrome.language.switchTo}
          </AccordionTrigger>
          <AccordionContent className="mt-2 flex flex-col gap-1 text-start">
            {LOCALES.map((locale: Locale) => {
              const href = `${localizePath(bare, locale)}${query}`;
              const selected = locale === current;
              const localeMeta = LOCALE_META[locale];
              const rowClassName = cn(
                "flex min-w-0 w-full flex-row items-center gap-4 rounded-md p-3 text-start text-sm leading-none no-underline transition-colors outline-none select-none",
                selected
                  ? "bg-brand-midnight/5 text-brand-midnight"
                  : "text-brand-midnight hover:bg-brand-cream hover:text-brand-midnight",
              );

              if (selected) {
                return (
                  <span
                    key={locale}
                    aria-current="page"
                    className={rowClassName}
                  >
                    <Globe className="size-5 shrink-0 text-brand-turquoise-dark" aria-hidden />
                    <span className="min-w-0 flex-1 text-sm font-semibold text-brand-midnight">
                      {localeMeta.nativeLabel}
                    </span>
                    <Check className="size-4 shrink-0" aria-hidden />
                  </span>
                );
              }

              return (
                <CampaignLink
                  key={locale}
                  href={href}
                  hrefLang={localeMeta.htmlLang}
                  className={rowClassName}
                >
                  <Globe className="size-5 shrink-0 text-brand-turquoise-dark" aria-hidden />
                  <span className="min-w-0 flex-1 text-sm font-semibold text-brand-midnight">
                    {localeMeta.nativeLabel}
                  </span>
                </CampaignLink>
              );
            })}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  }

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
        align={isRtl ? "start" : "end"}
        dir={isRtl ? "rtl" : "ltr"}
        className="min-w-44 text-start"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-start">{chrome.language.switchTo}</DropdownMenuLabel>
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
                  <CampaignLink
                    href={href}
                    hrefLang={localeMeta.htmlLang}
                    aria-current={selected ? "page" : undefined}
                  />
                }
                className={cn("text-start", selected && "bg-accent text-accent-foreground")}
              >
                <span className="flex-1 text-start">{localeMeta.nativeLabel}</span>
                {selected ? <Check className="ms-2 h-4 w-4 shrink-0" /> : null}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
