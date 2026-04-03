import { Metadata } from "next";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { TrendingUp, ShieldCheck, Smartphone } from "lucide-react";

export const metadata: Metadata = {
  title: "FAQ & Success Stories | OneTap-Card",
  description: "Learn how top professionals use OneTap to scale their networking."
};

const faqs = [
  {
    q: "Do recipients need an app to use OneTap?",
    a: "No app required. OneTap cards open instantly in any smartphone's browser natively when tapped or scanned via QR code."
  },
  {
    q: "Can I update my info after printing physical cards?",
    a: "Yes, instantly. Your QR code and NFC link point to a dynamic URL. Update your dashboard, and it reflects everywhere in real-time."
  },
  {
    q: "Does it work with NFC?",
    a: "Yes, fully compatible. We support NFC business cards, keychains, and phone tags that link directly to your OneTap profile."
  },
  {
    q: "Is my data secure?",
    a: "Absolutely. OneTap features enterprise-grade security and is fully GDPR compliant. You control exactly what is public."
  },
  {
    q: "What happens if I lose my phone?",
    a: "Your digital identity is safe in the cloud. Simply log in from any new device to instantly access and manage your profile."
  }
];

export default function FaqPage() {
  return (
    <div className="flex flex-col w-full pt-32 pb-0 bg-brand-cream min-h-screen">
      {/* Case Studies */}
      <div className="container mx-auto px-6 max-w-6xl mb-32">
        <div className="text-center mb-16">
          <h1 className="font-serif text-5xl md:text-7xl text-brand-midnight mb-6">
            Proven <span className="italic text-brand-turquoise">results.</span>
          </h1>
          <p className="text-xl text-brand-midnight/70 font-sans max-w-2xl mx-auto">
            See how organizations are transforming their networking pipelines.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-[2rem] border border-brand-midnight/5 shadow-sm hover:shadow-soft-diffusion transition-all duration-300 hover:-translate-y-1">
            <TrendingUp className="text-brand-turquoise w-10 h-10 mb-6" />
            <p className="font-serif text-2xl text-brand-midnight mb-4">"80% more leads in one month."</p>
            <p className="text-brand-midnight/70 font-sans mb-6">
              "Switching our brokerage to OneTap allowed us to capture open-house visitors instantly straight into Salesforce."
            </p>
            <p className="font-bold text-sm text-brand-midnight uppercase tracking-wider">MARCUS REAL ESTATE</p>
          </div>
          
          <div className="bg-brand-midnight p-8 rounded-[2rem] border border-brand-midnight/5 shadow-soft-diffusion text-brand-cream transition-all duration-300 hover:-translate-y-1">
            <ShieldCheck className="text-brand-turquoise w-10 h-10 mb-6" />
            <p className="font-serif text-2xl mb-4">"Zero compliance friction."</p>
            <p className="text-brand-cream/70 font-sans mb-6">
              "Brand Lock keeps our 500+ global attorneys on-brand, while SOC-2 compliance easily passed our IT audits."
            </p>
            <p className="font-bold text-sm text-brand-turquoise uppercase tracking-wider">SILVERMAN LEGAL</p>
          </div>

          <div className="bg-white p-8 rounded-[2rem] border border-brand-midnight/5 shadow-sm hover:shadow-soft-diffusion transition-all duration-300 hover:-translate-y-1">
            <Smartphone className="text-brand-turquoise w-10 h-10 mb-6" />
            <p className="font-serif text-2xl text-brand-midnight mb-4">"Seamless creator networking."</p>
            <p className="text-brand-midnight/70 font-sans mb-6">
              "I dropped my Linktree. OneTap handles my portfolio, my video intros, and my stripe links in one gorgeous UI."
            </p>
            <p className="font-bold text-sm text-brand-midnight uppercase tracking-wider">ELENA DIRECTS</p>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-white py-32 border-y border-brand-midnight/5">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl text-brand-midnight mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-brand-midnight/70 font-sans">
              Clear the friction. Everything you need to know.
            </p>
          </div>

          <Accordion className="w-full space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border border-brand-midnight/10 rounded-2xl px-6 bg-brand-cream/30 data-[state=open]:border-brand-turquoise/50 data-[state=open]:bg-brand-turquoise/5 transition-colors shadow-sm">
                <AccordionTrigger className="font-serif text-xl text-brand-midnight hover:no-underline py-6 text-left">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-brand-midnight/70 font-sans text-base pb-6 leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
