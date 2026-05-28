"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CREATE_BASICS_URL } from "@/lib/constants";

export const primaryCtaClassName = "rounded-full";

/** Shared marketing CTA heights — hero/final use lg; in-section use md. */
export const marketingCtaSizes = {
  lg: "h-14 px-8 text-lg",
  md: "h-12 px-7 text-base",
  sm: "h-11 px-6 text-sm",
} as const;

export const marketingCtaWidths = "w-full sm:w-auto";

export const marketingOutlineCtaClassName = cn(
  primaryCtaClassName,
  marketingCtaSizes.lg,
  marketingCtaWidths
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
  className?: string;
  onClick?: () => void;
}

function CtaAnchor({
  href,
  className,
  children,
  onClick,
}: {
  href: string;
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}) {
  if (href.startsWith("http")) {
    return (
      <a href={href} className={className} onClick={onClick}>
        {children}
      </a>
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
  className,
  onClick,
}: GetCardCtaProps) {
  const showArrow = size !== "nav";

  return (
    <Button
      variant="brandPrimary"
      size={size === "nav" ? "default" : size === "sm" ? "sm" : "lg"}
      className={cn(
        primaryCtaClassName,
        size === "lg" && cn(marketingCtaSizes.lg, marketingCtaWidths),
        size === "md" && cn(marketingCtaSizes.md, marketingCtaWidths),
        size === "nav" && "h-8 px-6 text-sm w-auto",
        size === "sm" && cn(marketingCtaSizes.sm, marketingCtaWidths),
        size === "mobileNav" && "h-12 w-full px-6 text-base",
        className
      )}
      render={<CtaAnchor href={href} onClick={onClick} />}
      nativeButton={false}
    >
      {children}
      {showArrow ? <ArrowRight className="ml-2 h-5 w-5 shrink-0" /> : null}
    </Button>
  );
}
