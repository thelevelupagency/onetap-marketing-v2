"use client";

import { useCallback, useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { buildCreateBasicsUrl, CARD_HOST_PREFIX } from "@/lib/constants";
import { isCardSlugValid, sanitizeCardSlug } from "@/lib/card-slug";
import { primaryCtaClassName } from "@/components/marketing/get-card-cta";

interface SlugClaimCtaProps {
  slug: string;
  onSlugChange: (slug: string) => void;
  className?: string;
}

export function SlugClaimCta({ slug, onSlugChange, className }: SlugClaimCtaProps) {
  const [touched, setTouched] = useState(false);

  const validation = useMemo(() => {
    if (!slug.trim()) return { isValid: true as const, error: undefined };
    return isCardSlugValid(slug);
  }, [slug]);

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
    window.location.href = buildCreateBasicsUrl(slug);
  }, [canSubmit, slug]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate();
  };

  return (
    <form onSubmit={handleSubmit} className={cn("w-full max-w-xl", className)}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
        <div
          className={cn(
            "flex min-h-14 flex-1 overflow-hidden rounded-full border border-brand-midnight/15 bg-white shadow-sm",
            "focus-within:ring-2 focus-within:ring-brand-navy/20 focus-within:ring-offset-2 focus-within:ring-offset-brand-cream",
            showError && "border-destructive focus-within:ring-destructive/30"
          )}
        >
          <span
            className="flex shrink-0 items-center border-r border-brand-midnight/10 bg-brand-midnight/[0.04] px-3 text-xs font-medium text-brand-midnight/55 sm:px-4 sm:text-sm"
            aria-hidden
          >
            {CARD_HOST_PREFIX}
          </span>
          <Input
            type="text"
            inputMode="text"
            autoComplete="off"
            spellCheck={false}
            placeholder="your-name"
            value={slug}
            onChange={(e) => handleSlugInput(e.target.value)}
            onBlur={() => setTouched(true)}
            aria-label="Your card link name"
            aria-invalid={showError}
            className="min-h-14 flex-1 rounded-none border-0 bg-transparent px-3 text-base shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 sm:px-4"
          />
        </div>
        <Button
          type="submit"
          variant="brandPrimary"
          size="lg"
          disabled={!canSubmit}
          className={cn(
            primaryCtaClassName,
            "h-14 shrink-0 px-8 text-lg w-full sm:w-auto"
          )}
        >
          Get your card
          <ArrowRight className="ml-2 h-5 w-5 shrink-0" />
        </Button>
      </div>
      <div className="min-h-5 px-1">
        {showError && validation.error ? (
          <p className="text-sm text-destructive" role="alert">
            {validation.error}
          </p>
        ) : null}
      </div>
    </form>
  );
}
