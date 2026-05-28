import { cn } from "@/lib/utils";
import { MarketingSection } from "./marketing-section";
import { MarketingContainer } from "./marketing-container";

/** Centers copy/CTAs on mobile; left-aligns from lg (split sections). */
export const splitCopyColumnClass = "flex flex-col items-center lg:items-start";

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
            "grid items-start gap-marketing-stack-gap lg:grid-cols-2 lg:gap-marketing-grid-gap-md",
            reverseOnMobile && "[&>*:first-child]:order-2 [&>*:last-child]:order-1 lg:[&>*:first-child]:order-1 lg:[&>*:last-child]:order-2"
          )}
        >
          {children}
        </div>
      </MarketingContainer>
    </MarketingSection>
  );
}
