import { MarketingSection, SectionHeader } from "@/components/marketing/primitives";

type ExampleSectionProps = {
  className?: string;
};

export function ExampleSection({ className }: ExampleSectionProps) {
  return (
    <MarketingSection className={className}>
      <SectionHeader
        title="Section"
        accent="title"
        description="Optional supporting copy."
      />
      {/* Section body */}
    </MarketingSection>
  );
}
