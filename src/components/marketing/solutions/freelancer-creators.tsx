import { GetCardCta } from "@/components/marketing/get-card-cta";
import { MarketingPhonePreview } from "@/components/marketing/phones/marketing-phone-preview";
import {
  SplitContentSection,
  splitCopyColumnClass,
  MarketingBadge,
  SectionHeader,
} from "@/components/marketing/primitives";
import type { MarketingBandBackground } from "@/content/marketing-copy-types";
import { freelancersCreatorsCopy } from "@/content/solutions";
import { PHONE_CREATORS_SCALE } from "@/lib/phone-mockup";

interface FreelancerCreatorsProps {
  background?: MarketingBandBackground;
}

export function FreelancerCreators({ background = "white" }: FreelancerCreatorsProps) {
  return (
    <SplitContentSection background={background} id="creators">
      <div className={splitCopyColumnClass}>
        <MarketingBadge tone="light" className="mb-4">
          {freelancersCreatorsCopy.badge}
        </MarketingBadge>
        <SectionHeader
          align="left"
          title={freelancersCreatorsCopy.title}
          accent={freelancersCreatorsCopy.accent}
          lead={freelancersCreatorsCopy.lead}
          className="max-w-none"
          titleClassName="mb-6"
        />
        <div className="flex w-full justify-center lg:justify-start">
          <GetCardCta size="md">{freelancersCreatorsCopy.cta}</GetCardCta>
        </div>
      </div>
      <div className="flex justify-center leading-none lg:justify-end">
        <MarketingPhonePreview
          scale={PHONE_CREATORS_SCALE}
          alt={freelancersCreatorsCopy.phoneAlt}
        />
      </div>
    </SplitContentSection>
  );
}
