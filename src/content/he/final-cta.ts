export type FinalCtaCopy = {
  title: string;
  accent: string;
  subheadline: string;
  cta: string;
  microcopyItems: readonly string[];
};

export type FinalCtaVariant =
  | "default"
  | "pricing"
  | "blog"
  | "faq"
  | "freelancers"
  | "agencies";

export const finalCtaVariants: Record<FinalCtaVariant, FinalCtaCopy> = {
  default: {
    title: "מוכנים לשנות את",
    accent: "הנטוורקינג שלכם?",
    subheadline:
      "צרו את הכרטיס הדיגיטלי המקצועי שלכם היום ותנו לאנשים מקום אחד לצפות בכל הפרטים שלכם, ליצור קשר, לבטוח בכם ולעשות את הצעד הבא.",
    cta: "צרו את הכרטיס שלכם בחינם",
    microcopyItems: ["בלי אפליקציה", "חינם להתחלה", "באוויר תוך 60 שניות"],
  },
  pricing: {
    title: "מוכנים",
    accent: "להתחיל?",
    subheadline:
      "השיקו את הכרטיס שלכם בתוכנית Free תוך דקות - או בחרו Pro או Team כשאתם צריכים יותר עוצמה, מיתוג ושליטה בסביבת עבודה משותפת.",
    cta: "צרו את הכרטיס שלכם בחינם",
    microcopyItems: ["תוכנית Free זמינה", "בלי אפליקציה", "שדרגו בכל עת"],
  },
  blog: {
    title: "מוכנים ליישם",
    accent: "את מה שקראתם?",
    subheadline:
      "הפכו את מה שקראתם לכרטיס שאנשים יכולים לשמור, ליצור קשר ולזכור - לינק אחד או קוד QR, בלי אפליקציה.",
    cta: "צרו את הכרטיס שלכם בחינם",
    microcopyItems: ["בלי אפליקציה", "חינם להתחלה", "משתפים תוך דקות"],
  },
  faq: {
    title: "מוכנים לראות",
    accent: "את זה בפעולה?",
    subheadline:
      "הדרך הטובה ביותר לענות על השאלות שלכם היא לנסות - בנו את הכרטיס החינמי שלכם ושתפו אותו תוך פחות מדקה.",
    cta: "צרו את הכרטיס שלכם בחינם",
    microcopyItems: ["בלי אפליקציה", "חינם להתחלה", "באוויר תוך 60 שניות"],
  },
  freelancers: {
    title: "מוכנים לדיגיטל את",
    accent: "הזהות שלכם?",
    subheadline:
      "בנו כרטיס דיגיטלי ממותג במלואו תוך 60 שניות - פורטפוליו, רשתות חברתיות ופרטי קשר בלינק אחד שאפשר לשתף בכל מקום.",
    cta: "צרו את הכרטיס שלכם בחינם",
    microcopyItems: ["בלי אפליקציה", "חינם להתחלה", "באוויר תוך 60 שניות"],
  },
  agencies: {
    title: "מוכנים לאחד את",
    accent: "המותג של הצוות?",
    subheadline:
      "התחילו Team - הנפיקו כרטיסים ממותגים לכל חבר צוות, שתפו ערכת מותג וריכזו לידים מסביבת עבודה אחת.",
    cta: "התחילו Team",
    microcopyItems: ["סביבת עבודה צוותית", "ערכת מותג משותפת", "מרכז לידים + ייצוא"],
  },
};

export function getFinalCtaCopy(variant: FinalCtaVariant = "default"): FinalCtaCopy {
  return finalCtaVariants[variant];
}
