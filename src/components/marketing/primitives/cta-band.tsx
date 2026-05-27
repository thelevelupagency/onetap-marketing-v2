import { MarketingSection } from "./marketing-section";
import { MarketingContainer } from "./marketing-container";
import { BrandAccent } from "./brand-accent";
import { type as typography } from "@/lib/typography";
import { cn } from "@/lib/utils";

export function CtaBand({
  title,
  accent,
  children,
  className,
  containerWidth = "narrow",
  titleClassName,
}: {
  title: React.ReactNode;
  accent?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  /** Narrow for short CTAs; wide for slug-claim forms. */
  containerWidth?: "narrow" | "wide";
  titleClassName?: string;
}) {
  return (
    <MarketingSection background="midnight" spacing="compact" className={className}>
      <MarketingContainer
        width={containerWidth === "wide" ? "wide" : "narrow"}
        className="text-center"
      >
        <h2
          className={cn(
            typography.sectionTitle,
            "mb-6 text-balance text-brand-cream",
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
        </h2>
        {children}
      </MarketingContainer>
    </MarketingSection>
  );
}
