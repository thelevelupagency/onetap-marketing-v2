import { Metadata } from "next";
import { PageShell } from "@/components/marketing/primitives";
import { FreelancersSolutionSections } from "@/components/marketing/solutions/freelancers-solution-sections";

const title = "Digital Business Cards for Freelancers & Creators | OneTap-Card";
const description =
  "Create a stunning, fully branded digital business card in 60 seconds. Share your portfolio, links, and contact details with one tap via NFC or QR code.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
  },
};

export default function FreelancersPage() {
  return (
    <PageShell offsetTop="none" pageBottom="none" className="bg-brand-cream">
      <FreelancersSolutionSections />
    </PageShell>
  );
}
