import { Metadata } from "next";
import { FreelancerHero } from "@/components/marketing/solutions/freelancer-hero";
import { FreelancerFeatures } from "@/components/marketing/solutions/freelancer-features";
import { FreelancerCreators } from "@/components/marketing/solutions/freelancer-creators";
import { FreelancerCta } from "@/components/marketing/solutions/freelancer-cta";

export const metadata: Metadata = {
  title: "OneTap for Freelancers | Digital Business Cards",
  description:
    "Capture 80% more inquiries with a professional digital business card built for freelancers.",
};

export default function FreelancersPage() {
  return (
    <div className="flex w-full flex-col bg-brand-cream">
      <FreelancerHero />
      <FreelancerFeatures />
      <FreelancerCreators />
      <FreelancerCta />
    </div>
  );
}
