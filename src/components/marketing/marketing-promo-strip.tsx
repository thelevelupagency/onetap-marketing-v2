import type { CSSProperties } from "react";
import { AppOutboundLink } from "@/components/marketing/app-outbound-link";
import { SIGNUP_PRO_URL, SIGNUP_TEAM_URL } from "@/lib/constants";
import type { Locale } from "@/lib/i18n/config";
import type { PublicPromoDiscount } from "@/lib/promotions/promo-price";
import {
  resolveStripSentence,
  type PublicMarketingPromoCampaign,
} from "@/lib/promotions/public-promo";
import { cn } from "@/lib/utils";

/**
 * One non-blocking strip under the fixed nav. Never a pop-up.
 * Renders nothing when the sentence is missing.
 *
 * A campaign `theme` is applied via inline CSS custom properties so the hex
 * palette renders identically to the app. A null theme keeps the brand tokens.
 */
export function MarketingPromoStrip({
  campaign,
  discount,
  locale,
}: {
  campaign: PublicMarketingPromoCampaign | null;
  discount?: PublicPromoDiscount | null;
  locale: Locale;
}) {
  const sentence = resolveStripSentence(campaign, locale);
  if (!sentence) return null;

  const isTeamOnly =
    Boolean(discount) &&
    !discount!.eligiblePlans.includes("pro") &&
    discount!.eligiblePlans.includes("team");
  const targetHref = isTeamOnly ? SIGNUP_TEAM_URL : SIGNUP_PRO_URL;

  const theme = campaign?.theme ?? null;
  const themeStyle: CSSProperties | undefined = theme
    ? ({
        "--promo-bg": theme.background,
        "--promo-fg": theme.foreground,
        "--promo-btn-bg": theme.buttonBackground,
        "--promo-btn-fg": theme.buttonForeground,
        "--promo-accent": theme.accent,
      } as CSSProperties)
    : undefined;

  return (
    <div
      className={cn(
        "fixed inset-x-0 top-[72px] z-[99] flex h-10 items-center justify-center px-4 text-center",
        theme
          ? "bg-[var(--promo-bg)] text-[var(--promo-fg)]"
          : "border-b border-brand-midnight/10 bg-brand-navy text-brand-cream",
      )}
      style={themeStyle}
      data-marketing-promo-strip
    >
      <AppOutboundLink
        href={targetHref}
        placement="promo_strip"
        className="text-sm font-medium underline-offset-4 hover:underline"
      >
        {sentence}
      </AppOutboundLink>
    </div>
  );
}
