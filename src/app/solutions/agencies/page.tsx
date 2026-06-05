import { Metadata } from "next";
import { PageShell } from "@/components/marketing/primitives";
import { AgenciesSolutionSections } from "@/components/marketing/solutions/agencies-solution-sections";

const title = "Digital Business Cards for Agencies & Teams | OneTap-Card";
const description =
  "Unified branding and centralized control for your organization. Manage team cards, lock brand templates, track leads, and export data from one admin dashboard.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
  },
};

export default function AgenciesPage() {
  return (
    <PageShell offsetTop="none" pageBottom="none" className="bg-brand-cream">
      <AgenciesSolutionSections />
    </PageShell>
  );
}
