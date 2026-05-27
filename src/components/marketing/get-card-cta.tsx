"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CREATE_BASICS_URL } from "@/lib/constants";

export const primaryCtaClassName = "rounded-full";

interface MarketingPrimaryButtonProps extends React.ComponentProps<typeof Button> {
  children: React.ReactNode;
  size?: "lg" | "sm" | "default";
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
        size === "lg" && "h-14 px-8 text-lg",
        size === "sm" && "h-11 px-6 text-sm",
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
  /** lg = hero; nav = navbar (compact); sm = in-content; mobileNav = full-width sheet footer */
  size?: "lg" | "nav" | "sm" | "mobileNav";
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
        size === "lg" && "h-14 px-8 text-lg w-full sm:w-auto",
        size === "nav" && "h-8 px-6 text-sm w-auto",
        size === "sm" && "h-11 px-6 text-sm",
        size === "mobileNav" && "h-12 w-full px-6 text-base",
        className
      )}
      render={<CtaAnchor href={href} onClick={onClick} />}
      nativeButton={false}
    >
      {children}
      {showArrow ? <ArrowRight className="ml-2 w-5 h-5 shrink-0" /> : null}
    </Button>
  );
}
