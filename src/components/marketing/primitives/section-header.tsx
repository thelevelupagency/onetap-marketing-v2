import { cn } from "@/lib/utils";
import { type as typography } from "@/lib/typography";
import { BrandAccent } from "./brand-accent";

interface SectionHeaderProps {
  title: React.ReactNode;
  accent?: React.ReactNode;
  lead?: React.ReactNode;
  align?: "center" | "left";
  /** Section band title (h2) or nested story title (h3) — defaults to section. */
  size?: "section" | "subsection";
  /** Gap below header block before section content. */
  spacingBelow?: "default" | "none";
  /** Light sections (default) or dark/midnight backgrounds. */
  variant?: "default" | "onDark";
  className?: string;
  titleClassName?: string;
}

export function SectionHeader({
  title,
  accent,
  lead,
  align = "center",
  size = "section",
  spacingBelow = "default",
  variant = "default",
  className,
  titleClassName,
}: SectionHeaderProps) {
  const isDark = variant === "onDark";
  const isSubsection = size === "subsection";
  const Heading = isSubsection ? "h3" : "h2";

  return (
    <div
      className={cn(
        align === "center" && "mx-auto max-w-3xl text-center",
        align === "left" &&
          "mx-auto max-w-3xl text-center lg:mx-0 lg:max-w-none lg:text-left",
        spacingBelow === "default" && "mb-marketing-header-gap-md",
        className
      )}
    >
      <Heading
        className={cn(
          isSubsection ? typography.subsectionTitle : typography.sectionTitle,
          isSubsection ? "mb-3" : "mb-4",
          isDark && "text-brand-cream",
          titleClassName
        )}
      >
        {title}
        {accent != null ? (
          <>
            {" "}
            <BrandAccent>{accent}</BrandAccent>
          </>
        ) : null}
      </Heading>
      {lead ? (
        <p
          className={cn(
            isSubsection ? typography.bodySm : typography.sectionLead,
            isDark && "text-brand-cream/70"
          )}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}
