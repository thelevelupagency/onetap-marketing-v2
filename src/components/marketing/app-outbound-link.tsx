"use client";

import { useEffect, useState, type MouseEvent, type ReactNode } from "react";
import { navigateToApp, withLandingAttribution, type MetaCtaPlacement } from "@/lib/meta-pixel";

interface AppOutboundLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  /** Conversion placement. Omit or pass null to forward click IDs without firing a Meta event (login). */
  placement?: MetaCtaPlacement | null;
  onClick?: () => void;
}

export function handleAppOutboundClick(
  event: MouseEvent<HTMLAnchorElement>,
  href: string,
  placement?: MetaCtaPlacement | null,
): void {
  if (!href.startsWith("http")) {
    return;
  }
  event.preventDefault();
  window.location.assign(navigateToApp(href, placement));
}

/** External app URL that preserves `fbclid`/UTMs and fires InitiateCheckout or Lead when classified. */
export function AppOutboundLink({
  href,
  children,
  className,
  placement = "get_card",
  onClick,
}: AppOutboundLinkProps) {
  const [attributedHref, setAttributedHref] = useState(href);

  useEffect(() => {
    setAttributedHref(withLandingAttribution(href));
  }, [href]);

  return (
    <a
      href={attributedHref}
      className={className}
      onClick={(event) => {
        onClick?.();
        handleAppOutboundClick(event, href, placement);
      }}
    >
      {children}
    </a>
  );
}
