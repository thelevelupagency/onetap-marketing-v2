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
      <div
        className={cn(
          "mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br",
          accent
        )}
      >
        <Icon className="h-7 w-7 text-brand-midnight" />
      </div>
      <h3 className={`${typography.subsectionTitle} mb-3`}>{title}</h3>
      <p className={`${typography.bodySm} text-brand-midnight/70`}>{description}</p>
    </div>
  );
}
