import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { type as typography } from "@/lib/typography";

const featureCardVariants = cva("", {
  variants: {
    variant: {
      plain: "p-8 text-center",
      elevated: "rounded-3xl border border-brand-midnight/5 bg-brand-cream p-8",
    },
  },
  defaultVariants: {
    variant: "plain",
  },
});

export function FeatureCard({
  icon: Icon,
  title,
  description,
  variant,
  className,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  className?: string;
} & VariantProps<typeof featureCardVariants>) {
  return (
    <div className={cn(featureCardVariants({ variant }), className)}>
      <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-turquoise/10">
        <Icon className="h-7 w-7 text-brand-turquoise-dark" />
      </div>
      <h3 className={cn(typography.subsectionTitle, "mb-3")}>{title}</h3>
      <p className={typography.bodySm}>{description}</p>
    </div>
  );
}
