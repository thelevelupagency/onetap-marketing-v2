import { Process1 } from "@/components/marketing/sections/process1";
import { getHomepage } from "@/content/get-content";
import type { Locale } from "@/lib/i18n/config";

interface HowItWorksProps {
  locale: Locale;
}

export function HowItWorks({ locale }: HowItWorksProps) {
  const { howItWorksCopy } = getHomepage(locale);
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
