import { cva, type VariantProps } from "class-variance-authority";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const marketingBadgeVariants = cva("", {
  variants: {
    tone: {
      default: "bg-brand-turquoise/20 text-brand-midnight border-brand-turquoise/30",
      light: "bg-brand-turquoise-light text-brand-turquoise-dark border-brand-turquoise/30",
      onDark: "bg-brand-turquoise/20 text-brand-turquoise border-brand-turquoise/30",
    },
  },
  defaultVariants: {
    tone: "default",
  },
});

export function MarketingBadge({
  className,
  tone,
  icon: Icon,
  children,
  ...props
}: Omit<React.ComponentProps<typeof Badge>, "variant"> &
  VariantProps<typeof marketingBadgeVariants> & {
    icon?: React.ComponentType<{ className?: string }>;
  }) {
  return (
    <Badge className={cn(marketingBadgeVariants({ tone }), className)} {...props}>
      {Icon ? <Icon className="mr-1 h-3 w-3" /> : null}
      {children}
    </Badge>
  );
}
