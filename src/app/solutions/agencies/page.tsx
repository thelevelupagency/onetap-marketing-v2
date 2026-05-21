import { Metadata } from "next";
import Link from "next/link";
import { Building2, Lock, BarChart3, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DashboardSection } from "@/components/marketing/dashboard-section";
import { LOGIN_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "OneTap for Agencies | Team Digital Business Cards",
  description: "Manage team cards at scale with Brand Lock, bulk import, and CRM integrations.",
};

const features = [
  { icon: Lock, title: "Brand Lock", description: "Apply firm branding across every agent card simultaneously." },
  { icon: Users, title: "Bulk User Import", description: "Onboard 10 to 10,000 team members via CSV in minutes." },
  { icon: BarChart3, title: "Team Analytics", description: "Track impressions, leads, and vCard downloads per agent." },
];

export default function AgenciesPage() {
  return (
    <div className="flex flex-col w-full bg-brand-cream">
      <section className="pt-32 pb-20 bg-brand-midnight text-brand-cream">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <Badge className="mb-6 bg-brand-turquoise/20 text-brand-turquoise border-brand-turquoise/30">
            <Building2 className="w-3 h-3 mr-1" /> For Agencies
          </Badge>
          <h1 className="font-display text-5xl md:text-7xl mb-6">
            Scale your team&apos;s identity. <span className="italic text-brand-turquoise">Save 50+ hours.</span>
          </h1>
          <p className="text-xl text-brand-cream/70 mb-10 max-w-2xl mx-auto">
            Centralized professional identity for your entire organization. Brand Lock, bulk import, and CRM sync built in.
          </p>
          <Link href={LOGIN_URL}>
            <Button size="lg" className="bg-brand-turquoise text-brand-midnight rounded-full h-14 px-8 text-lg">
              Book a demo <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      <DashboardSection />

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="font-display text-4xl text-brand-midnight text-center mb-16">
            Enterprise features, <span className="italic text-brand-turquoise">out of the box</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((f) => (
              <div key={f.title} className="p-8 bg-brand-cream rounded-3xl border border-brand-midnight/5">
                <div className="w-14 h-14 mb-6 bg-brand-turquoise/10 rounded-2xl flex items-center justify-center">
                  <f.icon className="w-7 h-7 text-brand-turquoise-dark" />
                </div>
                <h3 className="font-display text-xl text-brand-midnight mb-3">{f.title}</h3>
                <p className="text-brand-midnight/60">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-brand-cream text-center">
        <div className="container mx-auto px-6 max-w-2xl">
          <p className="font-display text-2xl text-brand-midnight mb-8 italic">
            &ldquo;Brand Lock alone saved our legal team weeks of compliance headaches.&rdquo;
          </p>
          <p className="text-brand-midnight/60 mb-8">— Managing Partner, Park & Associates</p>
          <Link href="/pricing">
            <Button size="lg" className="bg-brand-midnight text-brand-cream rounded-full h-14 px-8">
              View Agency pricing
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
