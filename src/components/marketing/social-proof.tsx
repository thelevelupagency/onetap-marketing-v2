"use client";

import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const logos = ["Meridian", "Atlas Co", "Nova Labs", "Peak Agency", "Studio 9", "Vertex", "Bloom", "Arc"];

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
];

export function SocialProof() {
  const list = testimonials.slice(0, 6);

  return (
    <section className="overflow-hidden bg-brand-cream py-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-12 flex flex-col items-center gap-4 text-center">
          <h2 className="font-display text-4xl text-brand-midnight md:text-5xl">
            Join thousands of professionals
          </h2>
          <p className="text-lg text-brand-midnight/70">
            Trusted by freelancers, creators, and agencies worldwide.
          </p>
        </div>

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

        <div className="mt-2 w-full">
          <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 768: 2, 1024: 3 }}>
            <Masonry gutter="20px" columnsCount={3}>
              {list.map((testimonial, idx) => (
                <Card key={idx} className={cn("gap-0 bg-white p-5 shadow-sm ring-brand-midnight/10")}>
                  <div className="flex justify-between">
                    <div className="flex gap-4 leading-5">
                      <Avatar className="size-9 rounded-full ring-1 ring-input">
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      </Avatar>
                      <div className="text-sm">
                        <p className="font-medium text-brand-midnight">{testimonial.name}</p>
                        <p className="text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 leading-7 text-muted-foreground">
                    <q>{testimonial.content}</q>
                  </div>
                </Card>
              ))}
            </Masonry>
          </ResponsiveMasonry>
        </div>
      </div>
    </section>
  );
}
