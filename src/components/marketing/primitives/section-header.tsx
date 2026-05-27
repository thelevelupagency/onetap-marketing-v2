import { cn } from "@/lib/utils";
import { type as typography } from "@/lib/typography";
import { BrandAccent } from "./brand-accent";

interface SectionHeaderProps {
  title: React.ReactNode;
  accent?: React.ReactNode;
  lead?: React.ReactNode;
  align?: "center" | "left";
  className?: string;
  titleClassName?: string;
}

export function SectionHeader({
  title,
  accent,
  lead,
  align = "center",
  className,
  titleClassName,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        align === "center" && "mx-auto max-w-3xl text-center",
        align === "left" && "text-left",
        className
      )}
    >
      <h2 className={cn(typography.sectionTitle, "mb-4", titleClassName)}>
        {title}
        {accent != null ? <> <BrandAccent>{accent}</BrandAccent></> : null}
      </h2>
      {lead ? <p className={typography.sectionLead}>{lead}</p> : null}
    </div>
  );
}
