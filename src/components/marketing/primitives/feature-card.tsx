import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { type as typography } from "@/lib/typography";

const featureCardVariants = cva("", {
  variants: {
    variant: {
      plain: "p-8 text-center",
      elevated: "rounded-3xl border border-brand-midnight/5 bg-brand-cream p-8",
      compact:
        "flex h-full gap-3.5 rounded-2xl border border-brand-midnight/5 bg-brand-cream p-4 shadow-sm text-left",
    },
    onDark: {
      true: "",
      false: "",
    },
  },
  compoundVariants: [
    {
      variant: "compact",
      onDark: true,
      className: "border-white/10 bg-white/5 shadow-none",
    },
  ],
  defaultVariants: {
    variant: "plain",
    onDark: false,
  },
});

export function FeatureCard({
  icon: Icon,
  title,
  description,
  variant,
  onDark,
  className,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  className?: string;
} & VariantProps<typeof featureCardVariants>) {
  const isCompact = variant === "compact";

  if (isCompact) {
    return (
      <div className={cn(featureCardVariants({ variant, onDark }), className)}>
        <div
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
            onDark ? "bg-brand-turquoise/20" : "bg-brand-turquoise/10"
          )}
        >
          <Icon
            className={cn(
              "h-5 w-5",
              onDark ? "text-brand-turquoise" : "text-brand-turquoise-dark"
            )}
          />
        </div>
        <div className="min-w-0 flex-1">
          <h3
            className={cn(
              typography.label,
              "mb-1 text-base font-semibold leading-snug",
              onDark ? "text-brand-cream" : "text-brand-midnight"
            )}
          >
            {title}
          </h3>
          <p
            className={cn(
              onDark ? "text-sm leading-relaxed text-brand-cream/75" : typography.bodySm
            )}
          >
            {description}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(featureCardVariants({ variant, onDark }), className)}>
      <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-turquoise/10">
        <Icon className="h-7 w-7 text-brand-turquoise-dark" />
      </div>
      <h3 className={cn(typography.subsectionTitle, "mb-3")}>{title}</h3>
      <p className={typography.bodySm}>{description}</p>
    </div>
  );
}
