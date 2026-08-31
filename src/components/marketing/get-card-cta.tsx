"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AppOutboundLink } from "@/components/marketing/app-outbound-link";
import { CREATE_BASICS_URL } from "@/lib/constants";
import type { MetaCtaPlacement } from "@/lib/meta-pixel";

export const primaryCtaClassName = "rounded-full";

/** Shared marketing CTA heights — hero/final use lg; in-section use md. */
export const marketingCtaSizes = {
  lg: "h-14 px-8 text-lg",
  md: "h-12 px-7 text-base",
  sm: "h-11 px-6 text-sm",
} as const;

export const marketingCtaWidths = "w-full sm:w-auto";

/** Shared hero / final CTA shell — height, padding, radius, width. */
export const marketingCtaShellClassName = cn(
  primaryCtaClassName,
  marketingCtaSizes.lg,
  marketingCtaWidths,
  "inline-flex items-center justify-center gap-2 font-medium"
);

export const marketingOutlineCtaClassName = marketingCtaShellClassName;

/** Midnight hero dual CTAs — same shell; primary fills, secondary stays outline. */
export const marketingHeroPrimaryOnDarkClassName = cn(
  marketingCtaShellClassName,
  "border-transparent bg-brand-turquoise text-brand-midnight shadow-none hover:bg-brand-turquoise/90 hover:text-brand-midnight"
);

export const marketingHeroSecondaryOnDarkClassName = cn(
  marketingCtaShellClassName,
  "border-white/20 bg-transparent text-brand-cream shadow-none hover:bg-white/10 hover:text-brand-cream"
);

interface MarketingPrimaryButtonProps
  extends Omit<React.ComponentProps<typeof Button>, "size"> {
  children: React.ReactNode;
  size?: "lg" | "md" | "sm" | "default";
}

/** Primary marketing button without a fixed signup link wrapper */
export function MarketingPrimaryButton({
  children,
  size = "lg",
  className,
  ...props
}: MarketingPrimaryButtonProps) {
  return (
    <Button
      variant="brandPrimary"
      size={size === "lg" ? "lg" : size === "sm" ? "sm" : "default"}
      className={cn(
        primaryCtaClassName,
        size === "lg" && marketingCtaSizes.lg,
        size === "md" && marketingCtaSizes.md,
        size === "sm" && marketingCtaSizes.sm,
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
}

interface GetCardCtaProps {
  href?: string;
  children?: React.ReactNode;
  /** lg = hero & final CTA; md = in-section; nav = navbar; sm = dense UI; mobileNav = sheet footer */
  size?: "lg" | "md" | "nav" | "sm" | "mobileNav";
  /** Defaults to true; set false when paired with {@link MarketingHeroSecondaryCta}. */
  showArrow?: boolean;
  className?: string;
  onClick?: () => void;
  placement?: MetaCtaPlacement | null;
}

function CtaAnchor({
  href,
  className,
  children,
  onClick,
  placement,
}: {
  href: string;
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  placement?: MetaCtaPlacement | null;
}) {
  if (href.startsWith("http")) {
    return (
      <AppOutboundLink href={href} className={className} placement={placement} onClick={onClick}>
        {children}
      </AppOutboundLink>
    );
  }
  return (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

export function GetCardCta({
  href = CREATE_BASICS_URL,
  children = "Get your card free",
  size = "lg",
  showArrow = true,
  className,
  onClick,
  placement = "get_card",
}: GetCardCtaProps) {
  const showArrowIcon = showArrow && size !== "nav";

  return (
    <Button
      variant="brandPrimary"
      size={size === "nav" ? "default" : size === "sm" ? "sm" : "lg"}
      className={cn(
        size === "lg" && marketingCtaShellClassName,
        size !== "lg" && primaryCtaClassName,
        size === "md" && cn(marketingCtaSizes.md, marketingCtaWidths),
        size === "nav" && "h-8 px-6 text-sm w-auto",
        size === "sm" && cn(marketingCtaSizes.sm, marketingCtaWidths),
        size === "mobileNav" && "h-12 w-full px-6 text-base",
        className
      )}
      render={<CtaAnchor href={href} onClick={onClick} placement={placement} />}
      nativeButton={false}
    >
      {children}
      {showArrowIcon ? <ArrowRight className="ms-2 h-5 w-5 shrink-0 rtl:rotate-180" /> : null}
    </Button>
  );
}

/** Outline partner for {@link GetCardCta} on midnight heroes — identical shell, no arrow. */
export function MarketingHeroSecondaryCta({
  href,
  children,
  className,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Button
      variant="brandOutline"
      size="lg"
      className={cn(marketingHeroSecondaryOnDarkClassName, className)}
      render={<CtaAnchor href={href} onClick={onClick} placement={null} />}
      nativeButton={false}
    >
      {children}
    </Button>
  );
}
