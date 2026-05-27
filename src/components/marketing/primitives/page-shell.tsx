import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const pageShellVariants = cva(
  "flex min-h-screen w-full flex-col bg-brand-cream pb-marketing-page-bottom",
  {
    variants: {
      /** Use `none` when the first child is a fold hero (`MarketingPageHero` / `spacing="hero"`). */
      offsetTop: {
        default: "pt-marketing-page-top",
        none: "",
      },
    },
    defaultVariants: {
      offsetTop: "default",
    },
  }
);

export function PageShell({
  className,
  offsetTop,
  children,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof pageShellVariants>) {
  return (
    <div className={cn(pageShellVariants({ offsetTop }), className)} {...props}>
      {children}
    </div>
  );
}
