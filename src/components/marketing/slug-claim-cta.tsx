"use client";

import { useCallback, useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { buildCreateBasicsUrl, CARD_HOST_PREFIX } from "@/lib/constants";
import { isCardSlugValid, sanitizeCardSlug } from "@/lib/card-slug";
import { marketingCtaSizes, primaryCtaClassName } from "@/components/marketing/get-card-cta";
import { useLocale } from "@/components/providers/locale-provider";
import { getChrome } from "@/content/get-content";
import { isNonDefaultLocale, isRtlLocale, type Locale } from "@/lib/i18n/config";
import { navigateToApp } from "@/lib/meta-pixel";

interface SlugClaimCtaProps {
  slug: string;
  onSlugChange: (slug: string) => void;
  className?: string;
  submitLabel?: string;
  placeholder?: string;
  ariaLabel?: string;
  layout?: "inline" | "stacked";
  size?: "default" | "wide";
  surface?: "light" | "dark";
  locale?: Locale;
}

export function SlugClaimCta({
  slug,
  onSlugChange,
  className,
  submitLabel,
  placeholder,
  ariaLabel,
  layout = "inline",
  size = "default",
  surface = "light",
  locale: localeProp,
}: SlugClaimCtaProps) {
  const contextLocale = useLocale();
  const locale = localeProp ?? contextLocale;
  const chrome = getChrome(locale);
  const isRtl = isRtlLocale(locale);
  const resolvedSubmitLabel = submitLabel ?? chrome.slugClaim.submitLabel;
  const resolvedPlaceholder = placeholder ?? chrome.slugClaim.placeholder;
  const resolvedAriaLabel = ariaLabel ?? `${chrome.slugClaim.ariaLabelSuffix} ${CARD_HOST_PREFIX}`;
  const [touched, setTouched] = useState(false);
  const isDark = surface === "dark";
  const isStacked = layout === "stacked";
  const isResponsiveRow = layout === "inline";

  const validation = useMemo(() => {
    if (!slug.trim()) return { isValid: true as const, error: undefined };
    return isCardSlugValid(slug, chrome.slugClaim.errors);
  }, [slug, chrome.slugClaim.errors]);

  const canSubmit = !slug.trim() || validation.isValid;

  const showError = touched && slug.trim().length > 0 && !validation.isValid;

  const handleSlugInput = (value: string) => {
    onSlugChange(sanitizeCardSlug(value));
  };

  const navigate = useCallback(() => {
    if (!canSubmit) {
      setTouched(true);
      return;
    }
    window.location.href = navigateToApp(buildCreateBasicsUrl(slug), "hero_slug", locale);
  }, [canSubmit, slug, locale]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate();
  };

  const fieldShell = cn(
    "flex w-full min-h-14 flex-1 overflow-hidden rounded-full border border-brand-midnight/15 bg-white shadow-sm",
    isStacked && "rounded-2xl",
    "focus-within:ring-2 focus-within:ring-brand-turquoise/40 focus-within:ring-offset-2",
    isDark ? "focus-within:ring-offset-brand-midnight" : "focus-within:ring-offset-brand-cream",
    showError && "border-destructive focus-within:ring-destructive/30"
  );

  const prefixClass = cn(
    "flex shrink-0 items-center border-e border-brand-midnight/10 bg-brand-midnight/[0.04] font-medium text-brand-midnight/55",
    isStacked
      ? "px-4 py-3 text-sm sm:px-5 sm:text-base"
      : "px-3 text-xs sm:px-4 sm:text-sm"
  );

  const inputClass = cn(
    "min-w-0 flex-1 rounded-none border-0 bg-transparent text-brand-midnight shadow-none placeholder:text-brand-midnight/40 focus-visible:ring-0 focus-visible:ring-offset-0",
    isStacked
      ? "min-h-14 px-4 text-base sm:px-5 sm:text-lg"
      : "min-h-14 px-3 text-base sm:px-4"
  );

  const slugField = (
    <div className={fieldShell} dir="ltr">
      <span className={prefixClass} title={CARD_HOST_PREFIX}>
        {CARD_HOST_PREFIX}
      </span>
      <Input
        type="text"
        inputMode="text"
        autoComplete="off"
        spellCheck={false}
        dir="ltr"
        placeholder={resolvedPlaceholder}
        value={slug}
        onChange={(e) => handleSlugInput(e.target.value)}
        onBlur={() => setTouched(true)}
        aria-label={resolvedAriaLabel}
        aria-invalid={showError}
        className={inputClass}
      />
    </div>
  );

  const submitButton = (
    <Button
      type="submit"
      variant="brandPrimary"
      size="lg"
      disabled={!canSubmit}
      dir={isRtl ? "rtl" : "ltr"}
      className={cn(
        primaryCtaClassName,
        marketingCtaSizes.lg,
        "shrink-0",
        isStacked ? "mt-4 w-full" : "w-full lg:w-auto"
      )}
    >
      {resolvedSubmitLabel}
      <ArrowRight className="ms-2 h-5 w-5 shrink-0 rtl:-scale-x-100" />
    </Button>
  );

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "w-full",
        isStacked && "max-w-3xl",
        isResponsiveRow && size === "wide" && "max-w-2xl",
        isResponsiveRow && size === "default" && "max-w-xl",
        className
      )}
    >
      {isStacked ? (
        <>
          {slugField}
          {submitButton}
        </>
      ) : (
        <div dir="ltr" className="flex flex-col gap-3 lg:flex-row lg:items-stretch">
          {slugField}
          {submitButton}
        </div>
      )}
      <div
        dir={isRtl ? "rtl" : undefined}
        className={cn(
          "min-h-5 px-1",
          isStacked && "mt-2 text-center",
          // Mobile: centered. Desktop: physical left under the LTR slug field
          // (text-start would pin to the right under dir=rtl).
          isResponsiveRow && "text-center lg:[text-align:left]"
        )}
      >
        {showError && validation.error ? (
          <p
            className={cn("text-sm text-destructive", isDark && "text-red-300")}
            role="alert"
          >
            {validation.error}
          </p>
        ) : isNonDefaultLocale(locale) && chrome.slugClaim.asciiHintPrefix ? (
          <p
            className={cn(
              "text-xs text-brand-midnight/35",
              isDark && "text-brand-cream/35"
            )}
          >
            {chrome.slugClaim.asciiHintPrefix}{" "}
            <span dir="ltr" className="inline-block">
              {chrome.slugClaim.asciiHintChars}
            </span>{" "}
            {chrome.slugClaim.asciiHintSuffix}
          </p>
        ) : null}
      </div>
    </form>
  );
}
