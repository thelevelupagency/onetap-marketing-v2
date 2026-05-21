import { Metadata } from "next";
import Link from "next/link";
import { Briefcase, Zap, Link2, UserPlus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LOGIN_URL } from "@/lib/constants";
import { MarketingPhonePreview } from "@/components/marketing/marketing-phone-preview";

export const metadata: Metadata = {
  title: "OneTap for Freelancers | Digital Business Cards",
  description: "Capture 80% more inquiries with a professional digital business card built for freelancers.",
};

const features = [
  { icon: Zap, title: "60-second setup", description: "Launch your card before your next coffee meeting. No design skills required." },
  { icon: Link2, title: "Link-in-bio replacement", description: "One beautiful URL for your entire professional presence — portfolio, socials, and contact." },
  { icon: UserPlus, title: "Automatic lead capture", description: "Built-in forms capture prospect details and notify you instantly." },
];

export default function FreelancersPage() {
  return (
    <div className="flex flex-col w-full bg-brand-cream">
      <section className="pt-32 pb-20 container mx-auto px-6 text-center max-w-4xl">
        <Badge className="mb-6 bg-brand-turquoise/20 text-brand-midnight border-brand-turquoise/30">
          <Briefcase className="w-3 h-3 mr-1" /> For Freelancers
        </Badge>
        <h1 className="font-display text-5xl md:text-7xl text-brand-midnight mb-6">
          Win more clients with <span className="italic text-brand-turquoise">every handshake.</span>
        </h1>
        <p className="text-xl text-brand-midnight/70 mb-10 max-w-2xl mx-auto">
          Freelancers using OneTap report 80% more inquiries. Look professional, capture leads, and follow up faster.
        </p>
        <Link href={LOGIN_URL}>
          <Button size="lg" className="bg-brand-midnight text-brand-cream rounded-full h-14 px-8 text-lg">
            Create your free card <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </Link>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((f) => (
              <div key={f.title} className="text-center p-8">
                <div className="w-14 h-14 mx-auto mb-6 bg-brand-turquoise/10 rounded-2xl flex items-center justify-center">
                  <f.icon className="w-7 h-7 text-brand-turquoise-dark" />
                </div>
                <h3 className="font-display text-xl text-brand-midnight mb-3">{f.title}</h3>
                <p className="text-brand-midnight/60">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="creators" className="py-20 bg-brand-cream">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge className="mb-4 bg-fuchsia-500/10 text-fuchsia-700 border-fuchsia-200">For Creators</Badge>
              <h2 className="font-display text-4xl text-brand-midnight mb-6">
                5x faster <span className="italic text-brand-turquoise">exposure</span>
              </h2>
              <p className="text-lg text-brand-midnight/70 mb-8 leading-relaxed">
                Showcase your gallery, embed videos, and link every platform from one stunning mobile profile. Your audience saves your contact in one tap.
              </p>
              <Link href={LOGIN_URL}>
                <Button className="bg-brand-midnight text-brand-cream rounded-full">Start creating</Button>
              </Link>
            </div>
            <div className="flex justify-center lg:justify-end leading-none">
              <MarketingPhonePreview scale={0.48} url="almog-menashe" alt="Creator OneTap card preview" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-brand-midnight text-brand-cream text-center">
        <div className="container mx-auto px-6 max-w-2xl">
          <h2 className="font-display text-4xl mb-6">Ready to stand out?</h2>
          <p className="text-brand-cream/70 mb-8">Join thousands of freelancers who never hand out a paper card again.</p>
          <Link href={LOGIN_URL}>
            <Button size="lg" className="bg-brand-turquoise text-brand-midnight rounded-full h-14 px-8">
              Get started free
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
