import { type as typography } from "@/lib/typography";
import { cn } from "@/lib/utils";

export function PainPointCard({
  icon: Icon,
  title,
  description,
  accent,
  className,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  accent: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex h-full flex-col rounded-3xl border border-brand-midnight/5 bg-brand-cream p-marketing-card-padding shadow-sm",
        className
      )}
    >
      <div className="mb-marketing-stack-gap-sm flex min-h-14 items-start gap-3">
        <div
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br",
            accent
          )}
        >
          <Icon className="h-5 w-5 text-brand-midnight" />
        </div>
        <h3
          className={cn(
            typography.cardTitle,
            "min-w-0 flex-1 font-semibold leading-snug"
          )}
        >
          {title}
        </h3>
      </div>
      <p className={cn(typography.bodySm, "flex-1 text-brand-midnight/70")}>
        {description}
      </p>
    </div>
  );
}
