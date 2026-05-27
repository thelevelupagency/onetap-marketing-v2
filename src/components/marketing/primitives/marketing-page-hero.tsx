import { cn } from "@/lib/utils";
import { MarketingSection } from "./marketing-section";
import { MarketingContainer } from "./marketing-container";

type MarketingPageHeroProps = React.ComponentProps<typeof MarketingSection> & {
  children: React.ReactNode;
  containerClassName?: string;
};

/** Fold hero for solution and similar landing pages (nav offset + tighter bottom). */
export function MarketingPageHero({
  background = "cream",
  children,
  className,
  containerClassName,
  ...props
}: MarketingPageHeroProps) {
  return (
    <MarketingSection
      background={background}
      spacing="hero"
      className={className}
      {...props}
    >
      <MarketingContainer width="prose" className={cn("text-center", containerClassName)}>
        {children}
      </MarketingContainer>
    </MarketingSection>
  );
}
