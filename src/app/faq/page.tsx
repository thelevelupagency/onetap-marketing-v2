import { Metadata } from "next";
import { FaqPageContent } from "@/components/marketing/faq-page-content";

export const metadata: Metadata = {
  title: "FAQ | OneTap-Card",
  description: "Answers to common questions about OneTap digital business cards.",
};

export default function FaqPage() {
  return (
    <div className="flex flex-col w-full pt-32 pb-24 bg-brand-cream min-h-screen">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-10">
          <h1 className="font-display text-5xl md:text-7xl text-brand-midnight mb-6">
            Got <span className="italic text-brand-turquoise">questions?</span>
          </h1>
          <p className="text-xl text-brand-midnight/70 max-w-2xl mx-auto">
            Everything you need to know about OneTap digital business cards.
          </p>
        </div>

        <FaqPageContent />
      </div>
    </div>
  );
}
