import { Metadata } from "next";
import { PricingTable } from "@/components/pricing-table";

export const metadata: Metadata = {
  title: "Pricing | OneTap-Card",
  description: "Simple and transparent pricing for individuals and teams."
};

export default function PricingPage() {
  return (
    <div className="flex flex-col w-full pt-32 pb-24 bg-brand-cream min-h-screen">
      <div className="container mx-auto px-6 text-center max-w-4xl mb-16">
        <h1 className="font-serif text-5xl md:text-7xl text-brand-midnight mb-6">
          Simple &
          <span className="italic text-brand-turquoise ml-4">transparent.</span>
        </h1>
        <p className="text-xl md:text-2xl text-brand-midnight/70 font-sans">
          Whether you're a solo freelancer or an enterprise law firm, we have a plan that scales with you. No hidden fees.
        </p>
      </div>

      <PricingTable />
    </div>
  );
}
