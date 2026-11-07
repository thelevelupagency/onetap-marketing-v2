import { AppOutboundLink } from "@/components/marketing/app-outbound-link";
import { SIGNUP_URL } from "@/lib/constants";
import type { Locale } from "@/lib/i18n/config";
import {
  resolveStripSentence,
  type PublicMarketingPromoCampaign,
} from "@/lib/promotions/public-promo";
import { cn } from "@/lib/utils";

/**
 * One non-blocking strip under the fixed nav. Never a pop-up.
 * Renders nothing when the sentence is missing.
 */
export function MarketingPromoStrip({
  campaign,
  locale,
}: {
  campaign: PublicMarketingPromoCampaign | null;
  locale: Locale;
}) {
  const sentence = resolveStripSentence(campaign, locale);
  if (!sentence) return null;

  return (
    <div
      className={cn(
        "fixed inset-x-0 top-[72px] z-[99] flex h-10 items-center justify-center",
        "border-b border-brand-midnight/10 bg-brand-navy px-4 text-center",
      )}
      data-marketing-promo-strip
    >
      <AppOutboundLink
        href={SIGNUP_URL}
        placement="get_card"
        className="text-sm font-medium text-brand-cream underline-offset-4 hover:underline"
      >
        {sentence}
      </AppOutboundLink>
    </div>
  );
}
