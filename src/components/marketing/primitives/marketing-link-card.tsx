import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const linkCardVariants = cva(
  "group border border-brand-midnight/5 transition-all duration-300 hover:shadow-soft-diffusion",
  {
    variants: {
      radius: {
        lg: "rounded-2xl",
        xl: "rounded-3xl",
      },
      lift: {
        true: "hover:-translate-y-1",
        false: "",
      },
      background: {
        white: "bg-white",
        cream: "bg-brand-cream",
      },
    },
    defaultVariants: {
      radius: "xl",
      lift: true,
      background: "white",
    },
  }
);

export function MarketingLinkCard({
  href,
  className,
  radius,
  lift,
  background,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
} & VariantProps<typeof linkCardVariants>) {
  return (
    <Link
      href={href}
      className={cn(linkCardVariants({ radius, lift, background }), className)}
    >
      {children}
    </Link>
  );
}
