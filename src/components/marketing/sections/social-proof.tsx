import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { type as typography } from "@/lib/typography";
import {
  MarketingSection,
  MarketingContainer,
  SectionHeader,
} from "@/components/marketing/primitives";
import { socialProofCopy } from "@/content/homepage";

export function SocialProof() {
  return (
    <MarketingSection background="cream" id="social-proof" className="overflow-hidden">
      <MarketingContainer width="full">
        <SectionHeader
          title={socialProofCopy.title}
          accent={socialProofCopy.accent}
          spacingBelow="none"
          className="mb-8"
        />

        <div className="mb-12 flex flex-wrap justify-center gap-3">
          {socialProofCopy.stats.map((stat) => (
            <span
              key={stat}
              className="rounded-full border border-brand-midnight/10 bg-white px-4 py-2 text-sm font-medium text-brand-midnight/80"
            >
              {stat}
            </span>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {socialProofCopy.testimonials.map((testimonial) => (
            <Card
              key={testimonial.name}
              className={cn(
                "flex h-full flex-col gap-0 bg-white p-6 shadow-sm ring-brand-midnight/10"
              )}
            >
              <div className="mb-4 flex gap-4">
                <Avatar className="size-10 rounded-full ring-1 ring-input">
                  <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                </Avatar>
                <div>
                  <p className={typography.label}>{testimonial.name}</p>
                  <p className={typography.caption}>{testimonial.role}</p>
                </div>
              </div>
              <p className={`${typography.bodySm} flex-1 text-brand-midnight/80`}>
                <q>{testimonial.content}</q>
              </p>
            </Card>
          ))}
        </div>
      </MarketingContainer>
    </MarketingSection>
  );
}
