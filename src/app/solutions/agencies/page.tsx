import { Metadata } from "next";
import { PageShell } from "@/components/marketing/primitives";
import { AgencyHero } from "@/components/marketing/solutions/agency-hero";
import { DashboardSection } from "@/components/marketing/sections/dashboard-section";
import { AgencyFeatures } from "@/components/marketing/solutions/agency-features";
import { AgencyQuote } from "@/components/marketing/solutions/agency-quote";

export const metadata: Metadata = {
  title: "OneTap for Agencies | Team Digital Business Cards",
  description:
    "Manage team cards at scale with Brand Lock, bulk import, and CRM integrations.",
};

export default function AgenciesPage() {
  return (
    <PageShell offsetTop="none" className="bg-brand-cream">
      <AgencyHero />
      <DashboardSection variant="light" />
      <AgencyFeatures />
      <AgencyQuote />
    </PageShell>
  );
}
