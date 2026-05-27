import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const sectionVariants = cva("w-full", {
  variants: {
    background: {
      cream: "bg-brand-cream",
      white: "bg-white",
      midnight: "bg-brand-midnight text-brand-cream",
      transparent: "bg-transparent",
    },
    spacing: {
      default: "py-24",
      compact: "py-16",
      none: "",
    },
  },
  defaultVariants: {
    background: "cream",
    spacing: "default",
  },
});

export function MarketingSection({
  className,
  background,
  spacing,
  id,
  children,
  ...props
}: React.ComponentProps<"section"> & VariantProps<typeof sectionVariants>) {
  return (
    <section
      id={id}
      className={cn(sectionVariants({ background, spacing }), className)}
      {...props}
    >
      {children}
    </section>
  );
}
