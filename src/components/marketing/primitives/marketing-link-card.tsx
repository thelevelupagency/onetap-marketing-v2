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
      density: {
        default: "",
        compact: "p-5",
      },
    },
    compoundVariants: [
      {
        density: "compact",
        className: "rounded-2xl",
      },
    ],
    defaultVariants: {
      radius: "xl",
      lift: true,
      background: "white",
      density: "default",
    },
  }
);

export function MarketingLinkCard({
  href,
  className,
  radius,
  lift,
  background,
  density,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
} & VariantProps<typeof linkCardVariants>) {
  return (
    <Link
      href={href}
      className={cn(linkCardVariants({ radius, lift, background, density }), className)}
    >
      {children}
    </Link>
  );
}
