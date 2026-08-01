import { cva, type VariantProps } from "class-variance-authority";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const marketingBadgeVariants = cva(
  "inline-flex items-center justify-center rounded-full font-sans transition-all duration-300 select-none group/badge",
  {
    variants: {
      tone: {
        default:
          "bg-brand-turquoise/10 backdrop-blur-md text-brand-midnight border border-brand-turquoise/30 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.7),0_2px_8px_-2px_rgba(42,157,143,0.18)] hover:border-brand-turquoise/60 hover:bg-brand-turquoise/20 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.9),0_4px_14px_-2px_rgba(42,157,143,0.28)]",
        light:
          "bg-white/90 backdrop-blur-md text-brand-midnight border border-brand-border/80 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.9),0_2px_8px_-2px_rgba(22,27,38,0.06)] hover:border-brand-turquoise/40 hover:bg-white hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,1),0_4px_12px_-2px_rgba(22,27,38,0.1)]",
        onDark:
          "bg-brand-midnight/80 backdrop-blur-md text-brand-turquoise border border-brand-turquoise/35 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_2px_12px_-2px_rgba(42,157,143,0.3)] hover:border-brand-turquoise/60 hover:bg-brand-midnight hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_4px_16px_-2px_rgba(42,157,143,0.4)]",
        navy:
          "bg-brand-navy text-brand-cream border border-brand-navy/60 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_2px_8px_-2px_rgba(42,70,120,0.3)] hover:bg-brand-navy/90 hover:border-brand-navy/80",
        accent:
          "bg-gradient-to-r from-brand-turquoise/15 via-brand-navy/10 to-brand-turquoise/15 backdrop-blur-md text-brand-midnight border border-brand-turquoise/40 shadow-[0_0_12px_rgba(42,157,143,0.15)] hover:border-brand-turquoise/60",
      },
      size: {
        sm: "h-6 px-2.5 py-0.5 text-[11px] font-semibold tracking-wider uppercase gap-1.5",
        md: "h-7 px-3.5 py-1 text-xs font-semibold tracking-wide gap-2",
        lg: "h-8 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase gap-2",
      },
      interactive: {
        true: "hover:scale-[1.02] active:scale-[0.98] cursor-default",
        false: "",
      },
    },
    defaultVariants: {
      tone: "default",
      size: "md",
      interactive: true,
    },
  }
);

export interface MarketingBadgeProps
  extends Omit<React.ComponentProps<typeof Badge>, "variant">,
    VariantProps<typeof marketingBadgeVariants> {
  icon?: React.ComponentType<{ className?: string }>;
  dot?: boolean;
}

export function MarketingBadge({
  className,
  tone,
  size,
  interactive,
  dot,
  icon: Icon,
  children,
  ...props
}: MarketingBadgeProps) {
  return (
    <Badge
      className={cn(
        marketingBadgeVariants({ tone, size, interactive }),
        className
      )}
      {...props}
    >
      {dot ? (
        <span className="relative flex h-2 w-2 items-center justify-center shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-turquoise opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-turquoise" />
        </span>
      ) : null}
      {Icon ? (
        <Icon className="size-3.5 shrink-0 text-brand-turquoise transition-transform duration-300 group-hover/badge:scale-110" />
      ) : null}
      {children}
    </Badge>
  );
}

