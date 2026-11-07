"use client";

import Link from "next/link";
import { appendPromoQueryToHref } from "@/lib/constants";
import { useMarketingPromo } from "@/components/providers/marketing-promo-provider";

type CampaignLinkProps = React.ComponentProps<typeof Link>;

/** Internal link that keeps the validated `?promo=` slug and drops `coupon`. */
export function CampaignLink({ href, ...props }: CampaignLinkProps) {
  const { forwardSlug } = useMarketingPromo();
  const resolved =
    typeof href === "string" ? appendPromoQueryToHref(href, forwardSlug) : href;
  return <Link href={resolved} {...props} />;
}
