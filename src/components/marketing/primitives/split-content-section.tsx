import { cn } from "@/lib/utils";
import { MarketingSection } from "./marketing-section";
import { MarketingContainer } from "./marketing-container";

export function SplitContentSection({
  background = "cream",
  width = "default",
  reverseOnMobile = false,
  id,
  className,
  children,
}: {
  background?: "cream" | "white";
  width?: "default" | "full";
  reverseOnMobile?: boolean;
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <MarketingSection background={background} spacing="compact" id={id} className={className}>
      <MarketingContainer width={width}>
        <div
          className={cn(
            "grid items-start gap-10 lg:grid-cols-2 lg:gap-12",
            reverseOnMobile && "[&>*:first-child]:order-2 [&>*:last-child]:order-1 lg:[&>*:first-child]:order-1 lg:[&>*:last-child]:order-2"
          )}
        >
          {children}
        </div>
      </MarketingContainer>
    </MarketingSection>
  );
}
