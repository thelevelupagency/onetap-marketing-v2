"use client";

import { useEffect, useState, type MouseEvent, type ReactNode } from "react";
import { navigateToApp, withLandingAttribution, type MetaCtaPlacement } from "@/lib/meta-pixel";
import { useLocale } from "@/components/providers/locale-provider";
import type { Locale } from "@/lib/i18n/config";

interface AppOutboundLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  /** Conversion placement. Omit or pass null to forward click IDs without firing a Meta event (login). */
  placement?: MetaCtaPlacement | null;
  onClick?: () => void;
  /** When `_blank`, opens attributed URL in a new tab (still stamps fbclid/UTMs/lang/coupon). */
  target?: "_blank";
  rel?: string;
}

export function handleAppOutboundClick(
  event: MouseEvent<HTMLAnchorElement>,
  href: string,
  placement?: MetaCtaPlacement | null,
  locale?: Locale,
  target?: "_blank",
): void {
  if (!href.startsWith("http")) {
    return;
  }
  event.preventDefault();
  const attributed = navigateToApp(href, placement, locale);
  if (target === "_blank") {
    window.open(attributed, "_blank", "noopener,noreferrer");
    return;
  }
  window.location.assign(attributed);
}

/** External app URL that preserves `fbclid`/UTMs/`lang` and fires InitiateCheckout or Lead when classified. */
export function AppOutboundLink({
  href,
  children,
  className,
  placement = "get_card",
  onClick,
  target,
  rel,
}: AppOutboundLinkProps) {
  const locale = useLocale();
  const [attributedHref, setAttributedHref] = useState(href);

  useEffect(() => {
    setAttributedHref(withLandingAttribution(href, locale));
  }, [href, locale]);

  const resolvedRel =
    rel ?? (target === "_blank" ? "noopener noreferrer" : undefined);

  return (
    <a
      href={attributedHref}
      className={className}
      target={target}
      rel={resolvedRel}
      onClick={(event) => {
        onClick?.();
        handleAppOutboundClick(event, href, placement, locale, target);
      }}
    >
      {children}
    </a>
  );
}
