import { Process1, type ProcessStep } from "@/components/marketing/sections/process1";
import type { MarketingBandBackground } from "@/content/marketing-copy-types";

interface SolutionHowItWorksProps {
  background: MarketingBandBackground;
  title: string;
  accent?: string;
  description: string;
  steps: readonly ProcessStep[];
}

export function SolutionHowItWorks({
  background,
  title,
  accent,
  description,
  steps,
}: SolutionHowItWorksProps) {
  return (
    <div id="how-it-works" className="scroll-mt-[72px]">
      <Process1
        background={background}
        title={title}
        accent={accent}
        description={description}
        steps={steps}
      />
    </div>
  );
}
