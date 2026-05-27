import { MarketingSection } from "./marketing-section";
import { MarketingContainer } from "./marketing-container";
import { type as typography } from "@/lib/typography";
import { cn } from "@/lib/utils";

export function CtaBand({
  title,
  children,
  className,
}: {
  title: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <MarketingSection background="midnight" spacing="compact" className={className}>
      <MarketingContainer width="narrow" className="text-center">
        <h2 className={cn(typography.sectionTitle, "mb-6 text-brand-cream")}>{title}</h2>
        {children}
      </MarketingContainer>
    </MarketingSection>
  );
}
