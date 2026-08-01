import { type as typography } from "@/lib/typography";
import { cn } from "@/lib/utils";

export interface PainPointCardProps {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean | "true" | "false" }>;
  title: string;
  description: string;
  accent?: string;
  className?: string;
}

export function PainPointCard({
  icon: Icon,
  title,
  description,
  className,
}: PainPointCardProps) {
  return (
    <article
      className={cn(
        "relative flex h-full flex-col items-center text-center rounded-3xl border-2 border-brand-navy bg-brand-cream p-marketing-card-padding pt-12 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-soft-diffusion",
        className
      )}
    >
      <div className="absolute -top-7 left-1/2 -translate-x-1/2 flex h-14 w-14 items-center justify-center rounded-full bg-brand-turquoise text-white shadow-md ring-4 ring-white">
        <Icon className="h-7 w-7 text-white" aria-hidden="true" />
      </div>
      <h3
        className={cn(
          typography.cardTitle,
          "mt-2 font-semibold leading-snug text-brand-midnight"
        )}
      >
        {title}
      </h3>
      <p
        className={cn(
          typography.bodySm,
          "mt-3 flex-1 text-brand-midnight/70 leading-relaxed"
        )}
      >
        {description}
      </p>
    </article>
  );
}
