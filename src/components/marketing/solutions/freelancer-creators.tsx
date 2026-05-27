import { GetCardCta } from "@/components/marketing/get-card-cta";
import { MarketingPhonePreview } from "@/components/marketing/phones/marketing-phone-preview";
import {
  SplitContentSection,
  MarketingBadge,
  SectionHeader,
} from "@/components/marketing/primitives";

export function FreelancerCreators() {
  return (
    <SplitContentSection background="cream" id="creators">
      <div>
        <MarketingBadge tone="light" className="mb-4">
          For Creators
        </MarketingBadge>
        <SectionHeader
          align="left"
          title="5x faster"
          accent="exposure"
          lead="Showcase your gallery, embed videos, and link every platform from one stunning mobile profile. Your audience saves your contact in one tap."
          className="mb-8 max-w-none"
          titleClassName="mb-6"
        />
        <GetCardCta size="sm">Start creating</GetCardCta>
      </div>
      <div className="flex justify-center leading-none lg:justify-end">
        <MarketingPhonePreview scale={0.48} url="almog-menashe" alt="Creator OneTap card preview" />
      </div>
    </SplitContentSection>
  );
}
