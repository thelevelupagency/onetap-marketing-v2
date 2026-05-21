import { Metadata } from "next";
import { PricingPlans } from "@/components/marketing/pricing-plans";
import { PricingComparison } from "@/components/marketing/pricing-comparison";
import { PricingFaq } from "@/components/marketing/pricing-faq";

export const metadata: Metadata = {
  title: "Pricing | OneTap-Card",
  description: "Simple and transparent pricing for individuals and teams.",
};

export default function PricingPage() {
  return (
    <div className="flex flex-col w-full pt-32 pb-24 bg-brand-cream min-h-screen">
      <div className="container mx-auto px-6 text-center max-w-4xl mb-16">
        <h1 className="font-display text-5xl md:text-7xl text-brand-midnight mb-6">
          Simple &<span className="italic text-brand-turquoise ml-4">transparent.</span>
        </h1>
        <p className="text-xl text-brand-midnight/70">
          Whether you&apos;re a solo freelancer or an enterprise team, we have a plan that scales with you.
        </p>
      </div>

      <PricingPlans />
      <PricingComparison />
      <PricingFaq />
    </div>
  );
}
