import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const pageShellVariants = cva("flex w-full flex-col bg-brand-cream", {
  variants: {
    /** Use `none` when the first child is a fold hero (`MarketingPageHero` / `spacing="hero"`). */
    offsetTop: {
      default: "pt-marketing-page-top",
      none: "",
    },
    /**
     * Use `none` when the last section is a full-bleed band (e.g. `CtaBand`) that should meet the footer.
     * Layout `flex-1` already fills the viewport; avoid `min-h-screen` here (it leaves a cream gap).
     */
    pageBottom: {
      default: "pb-marketing-page-bottom",
      none: "",
    },
  },
  defaultVariants: {
    offsetTop: "default",
    pageBottom: "default",
  },
});

export function PageShell({
  className,
  offsetTop,
  pageBottom,
  children,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof pageShellVariants>) {
  return (
    <div className={cn(pageShellVariants({ offsetTop, pageBottom }), className)} {...props}>
      {children}
    </div>
  );
}
