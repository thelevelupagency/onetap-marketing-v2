import { MarketingSection } from "./marketing-section";
import { MarketingContainer } from "./marketing-container";

export function SplitContentSection({
  background = "cream",
  id,
  children,
}: {
  background?: "cream" | "white";
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <MarketingSection background={background} spacing="compact" id={id}>
      <MarketingContainer width="default">
        <div className="grid items-center gap-16 lg:grid-cols-2">{children}</div>
      </MarketingContainer>
    </MarketingSection>
  );
}
