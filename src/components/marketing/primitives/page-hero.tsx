import { cn } from "@/lib/utils";
import { type as typography } from "@/lib/typography";
import { BrandAccent } from "./brand-accent";
import { MarketingContainer } from "./marketing-container";

interface PageHeroProps {
  title: React.ReactNode;
  accent?: React.ReactNode;
  lead?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

export function PageHero({ title, accent, lead, className, children }: PageHeroProps) {
  return (
    <MarketingContainer width="prose" className={cn("mb-marketing-header-gap text-center", className)}>
      <h1 className={cn(typography.pageTitle, "mb-6")}>
        {title}
        {accent != null ? <> <BrandAccent>{accent}</BrandAccent></> : null}
      </h1>
      {lead ? <p className={typography.lead}>{lead}</p> : null}
      {children}
    </MarketingContainer>
  );
}
