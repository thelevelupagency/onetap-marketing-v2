import { Metadata } from "next";
import { PageShell } from "@/components/marketing/primitives";
import { AgenciesSolutionSections } from "@/components/marketing/solutions/agencies-solution-sections";

export const metadata: Metadata = {
  title: "OneTap for Agencies | Team Digital Business Cards",
  description:
    "Scale your team's professional identity with Brand Lock, bulk import, team analytics, and centralized lead management.",
};

export default function AgenciesPage() {
  return (
    <PageShell offsetTop="none" pageBottom="none" className="bg-brand-cream">
      <AgenciesSolutionSections />
    </PageShell>
  );
}
