import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { type as typography } from "@/lib/typography";
import {
  MarketingSection,
  MarketingContainer,
  SectionHeader,
} from "@/components/marketing/primitives";

const logos = [
  "Meridian",
  "Atlas Co",
  "Nova Labs",
  "Peak Agency",
  "Studio 9",
  "Vertex",
  "Bloom",
  "Arc",
];

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "VP Sales, Meridian Group",
    content:
      "OneTap replaced our entire stack of paper cards. We captured 3x more leads at our last conference.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "David Park",
    role: "Managing Partner, Park & Associates",
    content:
      "Brand Lock alone saved our legal team weeks of compliance headaches. Every agent looks on-brand, every time.",
    avatar: "https://randomuser.me/api/portraits/men/78.jpg",
  },
  {
    name: "Elena Torres",
    role: "Freelance Brand Strategist",
    content:
      "I set up my card in under a minute. Clients save my contact before I finish my elevator pitch.",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "James Okonkwo",
    role: "Founder, Nova Labs",
    content:
      "Our team shares one brand system across 40 cards. Onboarding a new hire used to take an afternoon — now it is a link and a tap.",
    avatar: "https://randomuser.me/api/portraits/men/62.jpg",
  },
  {
    name: "Priya Shah",
    role: "Creative Director, Studio 9",
    content: "The card looks like our portfolio, not a generic contact block. Prospects mention it in follow-ups.",
    avatar: "https://randomuser.me/api/portraits/women/79.jpg",
  },
  {
    name: "Marcus Chen",
    role: "Account Executive, Vertex",
    content:
      "NFC at events is a cheat code. I stopped carrying stacks of cards and still leave every room with warm leads in my CRM.",
    avatar: "https://randomuser.me/api/portraits/men/52.jpg",
  },
] as const;

export function SocialProof() {
  return (
    <MarketingSection background="cream" className="overflow-hidden">
      <MarketingContainer width="full">
        <SectionHeader
          title="Join thousands of professionals"
          lead="Trusted by freelancers, creators, and agencies worldwide."
          className="mb-12"
        />

        <div className="relative mb-20 overflow-hidden">
          <div className="flex w-max animate-marquee gap-12">
            {[...logos, ...logos].map((logo, i) => (
              <span
                key={`${logo}-${i}`}
                className="shrink-0 whitespace-nowrap font-display text-2xl text-brand-midnight/20"
              >
                {logo}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-2 columns-1 gap-5 md:columns-2 lg:columns-3">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.name}
              className={cn(
                "mb-5 gap-0 break-inside-avoid bg-white p-5 shadow-sm ring-brand-midnight/10"
              )}
            >
              <div className="flex justify-between">
                <div className="flex gap-4 leading-5">
                  <Avatar className="size-9 rounded-full ring-1 ring-input">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                  </Avatar>
                  <div>
                    <p className={typography.label}>{testimonial.name}</p>
                    <p className={typography.caption}>{testimonial.role}</p>
                  </div>
                </div>
              </div>
              <div className={`${typography.bodySm} mt-2`}>
                <q>{testimonial.content}</q>
              </div>
            </Card>
          ))}
        </div>
      </MarketingContainer>
    </MarketingSection>
  );
}
