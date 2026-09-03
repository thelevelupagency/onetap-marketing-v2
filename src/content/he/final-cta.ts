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
    title: "מוכנים לשדרג את",
    accent: "הנטוורקינג שלכם?",
    subheadline:
      "צרו עוד היום כרטיס דיגיטלי מקצועי ותנו לאנשים מקום אחד לראות את כל הפרטים שלכם, ליצור קשר, להכיר ולסמוך עליכם - ולעשות את הצעד הבא.",
    cta: "צרו כרטיס בחינם",
    microcopyItems: ["ללא אפליקציה", "מתחילים בחינם", "הכרטיס באוויר בתוך 60 שניות"],
  },
  pricing: {
    title: "מוכנים",
    accent: "להתחיל?",
    subheadline:
      "השיקו את הכרטיס בתוך דקות עם תוכנית Free - או בחרו ב-Pro או Team כשאתם צריכים יותר יכולות, מיתוג ושליטה בסביבת עבודה משותפת.",
    cta: "צרו כרטיס בחינם",
    microcopyItems: ["תוכנית חינמית זמינה", "ללא אפליקציה", "אפשר לשדרג בכל עת"],
  },
  blog: {
    title: "מוכנים ליישם",
    accent: "את מה שקראתם?",
    subheadline:
      "הפכו את מה שקראתם לכרטיס שאנשים יכולים לשמור, ליצור קשר ולזכור - קישור אחד או קוד QR, ללא אפליקציה.",
    cta: "צרו כרטיס בחינם",
    microcopyItems: ["ללא אפליקציה", "מתחילים בחינם", "משתפים בתוך דקות"],
  },
  faq: {
    title: "מוכנים לראות",
    accent: "איך זה עובד?",
    subheadline:
      "הדרך הטובה ביותר לקבל תשובות היא פשוט לנסות — בנו כרטיס בחינם ושתפו אותו בתוך פחות מדקה.",
    cta: "צרו כרטיס בחינם",
    microcopyItems: ["ללא אפליקציה", "מתחילים בחינם", "הכרטיס באוויר בתוך 60 שניות"],
  },
  freelancers: {
    title: "מוכנים להפוך את הזהות המקצועית",
    accent: "שלכם לדיגיטלית?",
    subheadline:
      "בנו בתוך 60 שניות כרטיס דיגיטלי במיתוג מלא - תיק עבודות, רשתות חברתיות ופרטי קשר בקישור אחד שאפשר לשתף בכל מקום.",
    cta: "צרו כרטיס בחינם",
    microcopyItems: ["ללא אפליקציה", "מתחילים בחינם", "הכרטיס באוויר בתוך 60 שניות"],
  },
  agencies: {
    title: "מוכנים לאחד את",
    accent: "המיתוג של הצוות?",
    subheadline:
      "התחילו עם Team - צרו כרטיסים במיתוג אחיד לכל חברי הצוות, שתפו ערכת מותג ורכזו את כל הלידים בסביבת ניהול אחת.",
    cta: "התחילו עם Team",
    microcopyItems: ["סביבת עבודה לצוות", "ערכת מותג משותפת", "מרכז לידים וייצוא"],
  },
};

export function getFinalCtaCopy(variant: FinalCtaVariant = "default"): FinalCtaCopy {
  return finalCtaVariants[variant];
}
