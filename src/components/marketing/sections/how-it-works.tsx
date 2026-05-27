import { Process1 } from "@/components/marketing/sections/process1";
import { howItWorksCopy } from "@/content/homepage";

export function HowItWorks() {
  return (
    <div id="how-it-works" className="scroll-mt-[72px]">
      <Process1
        background="cream"
        title={howItWorksCopy.title}
        accent={howItWorksCopy.accent}
        description={howItWorksCopy.description}
        steps={howItWorksCopy.steps}
      />
    </div>
  );
}
