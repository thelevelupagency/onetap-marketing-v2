import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const containerVariants = cva("container mx-auto px-4 md:px-8", {
  variants: {
    width: {
      default: "max-w-5xl",
      narrow: "max-w-3xl",
      wide: "max-w-6xl",
      full: "max-w-7xl",
      prose: "max-w-4xl",
      none: "",
    },
  },
  defaultVariants: {
    width: "default",
  },
});

export function MarketingContainer({
  className,
  width,
  children,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof containerVariants>) {
  return (
    <div className={cn(containerVariants({ width }), className)} {...props}>
      {children}
    </div>
  );
}
