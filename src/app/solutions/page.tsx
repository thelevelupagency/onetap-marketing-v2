import { Building2, Users, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solutions | OneTap-Card",
  description: "Industry specific digital business card templates and features."
};

export default function SolutionsPage() {
  return (
    <div className="flex flex-col w-full pt-32 bg-brand-cream">
      <div className="container mx-auto px-6 text-center max-w-4xl mb-24">
        <h1 className="font-serif text-5xl md:text-7xl text-brand-midnight mb-6">
          Built for <span className="italic text-brand-turquoise">your workflow.</span>
        </h1>
        <p className="text-xl md:text-2xl text-brand-midnight/70 font-sans">
          OneTap isn't just a business card. It's a vertical-specific lead generation engine designed for high-performing professionals.
        </p>
      </div>

      {/* Real Estate */}
      <section className="py-24 bg-white border-y border-brand-midnight/5">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="flex-1 space-y-8">
              <div className="w-20 h-20 bg-blue-500/10 rounded-3xl flex items-center justify-center shadow-sm">
                <Building2 size={40} className="text-blue-600" />
              </div>
              <h2 className="font-serif text-5xl text-brand-midnight leading-tight">Real Estate & Finance</h2>
              <p className="text-xl text-brand-midnight/70 font-sans leading-relaxed">
                Close deals faster at open houses. Embed virtual tours, active listings, and direct booking links straight into your digital card.
              </p>
              <div className="bg-blue-50/50 border border-blue-100 p-8 rounded-2xl shadow-sm">
                <p className="text-blue-900 font-medium text-lg">"Increase lead capture by up to 40% at live events."</p>
              </div>
              <Button size="lg" className="bg-brand-midnight text-brand-cream shadow-soft-diffusion rounded-xl h-14 px-8 text-lg hover:-translate-y-1 transition-transform">
                View Real Estate Templates
              </Button>
            </div>
            <div className="flex-1 bg-gray-100 rounded-[2rem] aspect-[4/3] flex items-center justify-center shadow-inner overflow-hidden w-full">
                <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover" alt="Real Estate Open House" />
            </div>
          </div>
        </div>
      </section>

      {/* Teams & Agencies */}
      <section className="py-24 bg-brand-midnight">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row-reverse gap-16 items-center">
            <div className="flex-1 space-y-8">
              <div className="w-20 h-20 bg-brand-turquoise/10 rounded-3xl flex items-center justify-center shadow-sm">
                <Users size={40} className="text-brand-turquoise" />
              </div>
              <h2 className="font-serif text-5xl text-brand-cream leading-tight">Teams & Agencies (B2B)</h2>
              <p className="text-xl text-brand-cream/70 font-sans leading-relaxed">
                Centralized professional identity for your entire office. Utilize Brand Lock to standardize logos across all members, seamlessly trigger Bulk User Import via CSV maps, and command granular analytics via the Admin Dashboard.
              </p>
              <div className="bg-white/5 border border-white/10 p-8 rounded-2xl shadow-sm">
                <p className="text-brand-turquoise font-medium text-lg">Manage 10 to 10,000 cards from a single workspace.</p>
              </div>
              <Button size="lg" className="bg-brand-turquoise text-brand-midnight shadow-soft-diffusion rounded-xl h-14 px-8 text-lg hover:-translate-y-1 transition-transform">
                Explore Enterprise Features
              </Button>
            </div>
            <div className="flex-1 bg-white/5 rounded-[2rem] aspect-[4/3] flex items-center justify-center shadow-inner overflow-hidden w-full">
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover opacity-80 mix-blend-luminosity" alt="Corporate Team" />
            </div>
          </div>
        </div>
      </section>

      {/* Creators & Freelancers */}
      <section className="py-24 bg-brand-cream">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="flex-1 space-y-8">
              <div className="w-20 h-20 bg-fuchsia-500/10 rounded-3xl flex items-center justify-center shadow-sm">
                <Video size={40} className="text-fuchsia-600" />
              </div>
              <h2 className="font-serif text-5xl text-brand-midnight leading-tight">Creators & Freelancers</h2>
              <p className="text-xl text-brand-midnight/70 font-sans leading-relaxed">
                Your customized Link-in-Bio deeply upgraded for professional networking. Embed video introductions straight from TikTok/Youtube, aggregate social hubs, and integrate instant "Pay Me" gateway links directly into the workflow.
              </p>
              <Button size="lg" className="bg-brand-midnight text-brand-cream shadow-soft-diffusion rounded-xl h-14 px-8 text-lg hover:-translate-y-1 transition-transform">
                View Creator Templates
              </Button>
            </div>
            <div className="flex-1 bg-gray-100 rounded-[2rem] aspect-[4/3] flex items-center justify-center shadow-inner overflow-hidden w-full">
                <img src="https://images.unsplash.com/photo-1616469829581-73993eb86b02?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover" alt="Content Creator" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
