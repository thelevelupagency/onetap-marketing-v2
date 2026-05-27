import { Process1 } from "@/components/marketing/sections/process1";
import { BrandAccent } from "@/components/marketing/primitives";

const steps = [
  {
    step: "01",
    title: "Create",
    description:
      "Build your card in 60 seconds. Add your photo, links, gallery, video, and lead capture form.",
    image:
      "https://res.cloudinary.com/dudwjf2pu/image/upload/v1779391976/onetap/static/marketing/202_jd25sb.jpg",
    imageAlt: "Professional building a digital business card on a laptop",
  },
  {
    step: "02",
    title: "Share",
    description:
      "Tap NFC, scan QR, or send your link. Recipients open instantly in their browser — no app needed.",
    image:
      "https://res.cloudinary.com/dudwjf2pu/image/upload/v1779391975/onetap/static/marketing/8718_xmgnm1.jpg",
    imageAlt: "People sharing and viewing content on their phones",
  },
  {
    step: "03",
    title: "Connect",
    description:
      "Contacts save with one tap. Leads flow to your dashboard and CRM automatically.",
    image:
      "https://res.cloudinary.com/dudwjf2pu/image/upload/v1779391975/onetap/static/marketing/13239_k1he5m.jpg",
    imageAlt: "Group celebrating a successful connection",
  },
] as const;

export function HowItWorks() {
  return (
    <div id="how-it-works">
      <Process1
        title={
          <>
            How it <BrandAccent>works</BrandAccent>
          </>
        }
        description="Three steps from zero to everywhere your network needs you."
        steps={steps}
      />
    </div>
  );
}
