"use client";

import { type MouseEvent, type ReactNode } from "react";
import {
  appendAttributionParams,
  appendLocaleParam,
  getMergedAttributionParams,
} from "@/lib/constants";
import { navigateToApp, type MetaCtaPlacement } from "@/lib/meta-pixel";
import { useLocale } from "@/components/providers/locale-provider";
import { useMarketingPromo } from "@/components/providers/marketing-promo-provider";
import { useIsClient } from "@/lib/use-is-client";
import type { Locale } from "@/lib/i18n/config";

interface AppOutboundLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  /** Conversion placement. Omit or pass null to forward click IDs without firing a Meta event (login). */
  placement?: MetaCtaPlacement | null;
  onClick?: () => void;
  /** When `_blank`, opens attributed URL in a new tab (still stamps fbclid/UTMs/lang/promo). */
  target?: "_blank";
  rel?: string;
  /** Set false on Free-plan CTAs so landing `?billing=` does not override Free. */
  preserveBilling?: boolean;
}

function isModifiedClick(event: MouseEvent<HTMLAnchorElement>): boolean {
  return (
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey ||
    event.button !== 0
  );
}

export function handleAppOutboundClick(
  event: MouseEvent<HTMLAnchorElement>,
  href: string,
  placement?: MetaCtaPlacement | null,
  locale?: Locale,
  target?: "_blank",
  validatedPromoSlug?: string | null,
  preserveBilling = true,
): void {
  if (!href.startsWith("http")) {
    return;
  }
  const attributed = navigateToApp(
    href,
    placement,
    locale,
    validatedPromoSlug,
    { preserveBilling },
  );
  if (isModifiedClick(event)) {
    event.currentTarget.href = attributed;
    return;
  }
  event.preventDefault();
  if (target === "_blank") {
    window.open(attributed, "_blank", "noopener,noreferrer");
    return;
  }
  window.location.assign(attributed);
}

/**
 * Href for the anchor. Live query and stored first-touch are read only after
 * hydration so the server and first client render match. Click still runs
 * `navigateToApp`, which writes attribution and fires the Meta event.
 */
function attributedAnchorHref(
  href: string,
  locale: Locale,
  forwardSlug: string | null | undefined,
  includeLiveQuery: boolean,
  preserveBilling: boolean,
): string {
  const source = includeLiveQuery
    ? getMergedAttributionParams(new URLSearchParams(window.location.search))
    : new URLSearchParams();
  return appendLocaleParam(
    appendAttributionParams(href, source, forwardSlug, { preserveBilling }),
    locale,
  );
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
  preserveBilling = true,
}: AppOutboundLinkProps) {
  const locale = useLocale();
  const { forwardSlug } = useMarketingPromo();
  const isClient = useIsClient();
  const attributedHref = attributedAnchorHref(
    href,
    locale,
    forwardSlug,
    isClient,
    preserveBilling,
  );

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
        handleAppOutboundClick(
          event,
          href,
          placement,
          locale,
          target,
          forwardSlug,
          preserveBilling,
        );
      }}
    >
      {children}
    </a>
  );
}
