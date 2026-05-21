import Link from "next/link";
import { Briefcase, Sparkles, Building2, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const solutions = [
  {
    icon: Briefcase,
    title: "Freelancers",
    stat: "80% more inquiries",
    description: "Stand out at every meeting. Capture leads automatically and look professional from day one.",
    href: "/solutions/freelancers",
    accent: "from-blue-500/10 to-brand-turquoise/10",
  },
  {
    icon: Sparkles,
    title: "Creators",
    stat: "5x faster exposure",
    description: "One link for your entire brand. Gallery, video, and socials in a beautiful mobile-first profile.",
    href: "/solutions/freelancers#creators",
    accent: "from-fuchsia-500/10 to-purple-500/10",
  },
  {
    icon: Building2,
    title: "Agencies",
    stat: "50+ hours saved",
    description: "Brand Lock, bulk import, and team analytics. Manage hundreds of cards from one dashboard.",
    href: "/solutions/agencies",
    accent: "from-brand-midnight/10 to-brand-turquoise/10",
  },
];

export function SolutionsGrid() {
  return (
    <section className="py-24 bg-white" id="solutions">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-4xl md:text-5xl text-brand-midnight mb-4">
            Built for <span className="italic text-brand-turquoise">every professional</span>
          </h2>
          <p className="text-lg text-brand-midnight/70">
            Whether you fly solo or manage a team of hundreds, OneTap scales with you.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {solutions.map((sol) => (
            <Link
              key={sol.title}
              href={sol.href}
              className="group bg-brand-cream rounded-3xl p-8 border border-brand-midnight/5 hover:shadow-soft-diffusion hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${sol.accent} flex items-center justify-center mb-6`}>
                <sol.icon className="w-7 h-7 text-brand-midnight" />
              </div>
              <Badge className="mb-4 bg-brand-turquoise/20 text-brand-midnight border-brand-turquoise/30 text-xs">
                {sol.stat}
              </Badge>
              <h3 className="font-display text-2xl text-brand-midnight mb-3 group-hover:text-brand-turquoise-dark transition-colors">
                {sol.title}
              </h3>
              <p className="text-brand-midnight/60 mb-6 leading-relaxed">{sol.description}</p>
              <span className="inline-flex items-center text-sm font-medium text-brand-midnight group-hover:text-brand-turquoise-dark transition-colors">
                Learn more <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
