import { GetCardCta } from "@/components/marketing/get-card-cta";
import { MarketingPhonePreview } from "@/components/marketing/phones/marketing-phone-preview";
import {
  SplitContentSection,
  splitCopyColumnClass,
  MarketingBadge,
  SectionHeader,
} from "@/components/marketing/primitives";
import type { MarketingBandBackground } from "@/content/marketing-copy-types";
import { getSolutions } from "@/content/get-content";
import type { Locale } from "@/lib/i18n/config";
import { PHONE_CREATORS_SCALE } from "@/lib/phone-mockup";
import { CARD_SCREENSHOT_ROB_HART } from "@/lib/phone-screenshots";

interface FreelancerCreatorsProps {
  locale: Locale;
  background?: MarketingBandBackground;
}

export function FreelancerCreators({ locale, background = "white" }: FreelancerCreatorsProps) {
  const { freelancersCreatorsCopy } = getSolutions(locale);
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
          imageSrc={CARD_SCREENSHOT_ROB_HART}
          alt={freelancersCreatorsCopy.phoneAlt}
        />
      </div>
    </SplitContentSection>
  );
}
