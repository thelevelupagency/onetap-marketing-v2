"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CREATE_BASICS_URL } from "@/lib/constants";

export const primaryCtaClassName =
  "bg-brand-navy text-brand-cream hover:bg-brand-turquoise hover:text-brand-midnight rounded-full shadow-soft-diffusion";

interface GetCardCtaProps {
  href?: string;
  children?: React.ReactNode;
  /** lg = hero; nav = navbar (compact); sm = in-content */
  size?: "lg" | "nav" | "sm";
  className?: string;
}

export function GetCardCta({
  href = CREATE_BASICS_URL,
  children = "Get your card free",
  size = "lg",
  className,
}: GetCardCtaProps) {
  const showArrow = size !== "nav";

  return (
    <Link href={href}>
      <Button
        size={size === "nav" ? "default" : size === "sm" ? "sm" : "lg"}
        className={cn(
          primaryCtaClassName,
          size === "lg" && "h-14 px-8 text-lg w-full sm:w-auto",
          size === "nav" && "h-8 px-6 text-sm w-auto",
          size === "sm" && "h-11 px-6 text-sm",
          className
        )}
      >
        {children}
        {showArrow ? <ArrowRight className="ml-2 w-5 h-5 shrink-0" /> : null}
      </Button>
    </Link>
  );
}
