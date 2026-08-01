import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex min-h-[1.625rem] w-fit shrink-0 items-center justify-center gap-1.5 overflow-hidden rounded-full border border-transparent px-3 py-0.5 text-xs font-semibold tracking-wide whitespace-nowrap transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 [&>svg]:pointer-events-none [&>svg]:size-3.5!",
  {
    variants: {
      variant: {
        default:
          "bg-brand-navy text-brand-cream border-brand-navy/30 shadow-2xs [a]:hover:bg-brand-navy/90",
        secondary:
          "bg-brand-turquoise/15 text-brand-midnight border-brand-turquoise/30 [a]:hover:bg-brand-turquoise/25",
        destructive:
          "bg-destructive/10 text-destructive border-destructive/20 focus-visible:ring-destructive/20 [a]:hover:bg-destructive/20",
        outline:
          "border-brand-border/80 bg-white/60 backdrop-blur-xs text-brand-midnight [a]:hover:bg-white [a]:hover:border-brand-navy/30",
        ghost:
          "hover:bg-brand-turquoise/15 hover:text-brand-midnight",
        link: "text-brand-turquoise underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }
