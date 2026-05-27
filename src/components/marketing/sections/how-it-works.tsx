import { Process1 } from "@/components/marketing/sections/process1";
import { BrandAccent } from "@/components/marketing/primitives";
import { howItWorksCopy } from "@/content/homepage";

export function HowItWorks() {
  return (
    <div id="how-it-works">
      <Process1
        background="cream"
        title={
          <>
            {howItWorksCopy.title} <BrandAccent>{howItWorksCopy.accent}</BrandAccent>
          </>
        }
        description={howItWorksCopy.description}
        steps={howItWorksCopy.steps}
      />
    </div>
  );
}
