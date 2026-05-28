import { Metadata } from "next";
import { PageShell } from "@/components/marketing/primitives";
import { FreelancersSolutionSections } from "@/components/marketing/solutions/freelancers-solution-sections";

export const metadata: Metadata = {
  title: "OneTap for Freelancers | Digital Business Cards",
  description:
    "Win more clients with a professional digital card built for freelancers — lead capture, portfolio, analytics, and one link for every channel.",
};

export default function FreelancersPage() {
  return (
    <PageShell offsetTop="none" pageBottom="none" className="bg-brand-cream">
      <FreelancersSolutionSections />
    </PageShell>
  );
}
