import { GetCardCta } from "@/components/marketing/get-card-cta";
import { CtaBand } from "@/components/marketing/primitives";
import { type as typography } from "@/lib/typography";

export function FreelancerCta() {
  return (
    <CtaBand title="Ready to" accent="stand out?">
      <p className={`${typography.sectionLead} mb-8 text-brand-cream/70`}>
        Join thousands of freelancers who never hand out a paper card again.
      </p>
      <GetCardCta size="lg">Get started free</GetCardCta>
    </CtaBand>
  );
}
