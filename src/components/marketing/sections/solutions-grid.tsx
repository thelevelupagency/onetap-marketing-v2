import { Briefcase, Sparkles, Building2, ArrowRight } from "lucide-react";
import {
  MarketingSection,
  MarketingContainer,
  SectionHeader,
  MarketingBadge,
  MarketingLinkCard,
} from "@/components/marketing/primitives";
import { type as typography } from "@/lib/typography";

const solutions = [
  {
    icon: Briefcase,
    title: "Freelancers",
    stat: "80% more inquiries",
    description:
      "Stand out at every meeting. Capture leads automatically and look professional from day one.",
    href: "/solutions/freelancers",
    accent: "from-brand-navy/10 to-brand-turquoise/10",
  },
  {
    icon: Sparkles,
    title: "Creators",
    stat: "5x faster exposure",
    description:
      "One link for your entire brand. Gallery, video, and socials in a beautiful mobile-first profile.",
    href: "/solutions/freelancers#creators",
    accent: "from-brand-turquoise-light to-brand-turquoise/10",
  },
  {
    icon: Building2,
    title: "Agencies",
    stat: "50+ hours saved",
    description:
      "Brand Lock, bulk import, and team analytics. Manage hundreds of cards from one dashboard.",
    href: "/solutions/agencies",
    accent: "from-brand-midnight/10 to-brand-navy/10",
  },
] as const;

export function SolutionsGrid() {
  return (
    <MarketingSection background="white" id="solutions">
      <MarketingContainer width="wide">
        <SectionHeader
          title="Built for"
          accent="every professional"
          lead="Whether you fly solo or manage a team of hundreds, OneTap scales with you."
        />
        <div className="grid gap-8 md:grid-cols-3">
          {solutions.map((sol) => (
            <MarketingLinkCard
              key={sol.title}
              href={sol.href}
              background="cream"
              className="p-marketing-card-padding"
            >
              <div
                className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${sol.accent}`}
              >
                <sol.icon className="h-7 w-7 text-brand-midnight" />
              </div>
              <MarketingBadge className="mb-4 text-xs">{sol.stat}</MarketingBadge>
              <h3
                className={`${typography.subsectionTitle} mb-3 transition-colors group-hover:text-brand-turquoise-dark`}
              >
                {sol.title}
              </h3>
              <p className="mb-6 leading-relaxed text-brand-midnight/60">{sol.description}</p>
              <span className="inline-flex items-center text-sm font-medium text-brand-midnight transition-colors group-hover:text-brand-turquoise-dark">
                Learn more{" "}
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </MarketingLinkCard>
          ))}
        </div>
      </MarketingContainer>
    </MarketingSection>
  );
}
