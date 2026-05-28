import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LOGIN_URL } from "@/lib/constants";
import { MarketingPrimaryButton } from "@/components/marketing/get-card-cta";
import {
  SplitContentSection,
  splitCopyColumnClass,
  MarketingBadge,
  SectionHeader,
} from "@/components/marketing/primitives";
import type { MarketingBandBackground } from "@/content/marketing-copy-types";
import { agenciesTeamSplitCopy } from "@/content/solutions";

interface AgencyTeamSplitProps {
  background?: MarketingBandBackground;
}

export function AgencyTeamSplit({ background = "cream" }: AgencyTeamSplitProps) {
  return (
    <SplitContentSection background={background} width="default">
      <div className={splitCopyColumnClass}>
        <MarketingBadge tone="light" className="mb-4">
          {agenciesTeamSplitCopy.badge}
        </MarketingBadge>
        <SectionHeader
          align="left"
          title={agenciesTeamSplitCopy.title}
          accent={agenciesTeamSplitCopy.accent}
          lead={agenciesTeamSplitCopy.lead}
          className="max-w-none"
          titleClassName="mb-6"
        />
        <div className="flex w-full justify-center lg:justify-start">
          <Link href={LOGIN_URL} className="w-full sm:w-auto">
            <MarketingPrimaryButton size="md" className="w-full sm:w-auto">
              {agenciesTeamSplitCopy.cta} <ArrowRight className="ml-2 h-5 w-5" />
            </MarketingPrimaryButton>
          </Link>
        </div>
      </div>
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-brand-midnight/10 bg-white shadow-soft-diffusion">
        <Image
          src={agenciesTeamSplitCopy.imageUrl}
          alt={agenciesTeamSplitCopy.imageAlt}
          fill
          className="object-cover object-top"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>
    </SplitContentSection>
  );
}
