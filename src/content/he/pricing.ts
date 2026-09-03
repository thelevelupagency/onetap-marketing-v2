import { CREATE_BASICS_URL } from "@/lib/constants";

export type PlanTier = "free" | "pro" | "team";

export interface Plan {
  id: PlanTier;
  name: string;
  description: string;
  monthlyPrice: number | null;
  annualPrice: number | null;
  annualBilled?: string;
  cta: string;
  ctaHref: string;
  popular?: boolean;
  features: string[];
}

export type BillingPeriod = "monthly" | "annual";

export type PlanPriceDisplay = {
  current: number;
  previous: number | null;
  billedNote: string | null;
};

/** Display values for plan cards — single source of truth for price formatting. */
export function getPlanPriceDisplay(
  plan: Plan,
  period: BillingPeriod,
): PlanPriceDisplay {
  const monthlyPrice = plan.monthlyPrice;
  const annualPrice = plan.annualPrice;

  if (monthlyPrice === null || annualPrice === null) {
    return { current: 0, previous: null, billedNote: null };
  }

  if (period === "annual") {
    const hasDiscount = annualPrice < monthlyPrice;
    return {
      current: annualPrice,
      previous: hasDiscount ? monthlyPrice : null,
      billedNote: plan.annualBilled ?? null,
    };
  }

  return {
    current: monthlyPrice,
    previous: null,
    billedNote: null,
  };
}

export const plans: Plan[] = [
  {
    id: "free",
    name: "Free",
    description: "כדי להתחיל",
    monthlyPrice: 0,
    annualPrice: 0,
    cta: "התחילו בחינם",
    ctaHref: CREATE_BASICS_URL,
    features: [
      "כרטיס דיגיטלי אחד",
      "פרופיל, קוד QR וקישור לשיתוף",
      "כפתורי יצירת קשר בלחיצה אחת",
      "עד 4 מקטעים - אודות, גלריה, וידאו, נקודות מרכזיות, שאלות נפוצות או המלצות",
      "תבניות התחלתיות",
      "כולל מיתוג OneTap",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    description: "לאנשי מקצוע שרוצים יותר שליטה",
    monthlyPrice: 12,
    annualPrice: 10,
    annualBilled: "חיוב שנתי בסך $120",
    cta: "התחילו תקופת ניסיון ב-Pro",
    ctaHref: CREATE_BASICS_URL,
    popular: true,
    features: [
      "כל מה שכלול ב-Free",
      "כרטיס דיגיטלי אחד",
      "מקטעים ללא הגבלה, כולל טופס לידים",
      "תיבת לידים עם סינון וייצוא ל-CSV",
      "תובנות ל-90 יום",
      "מיתוג מותאם וערכת מותג - ללא לוגו OneTap",
    ],
  },
  {
    id: "team",
    name: "Team",
    description: "לצוותים שצריכים כרטיסים ומיתוג משותפים",
    monthlyPrice: 35,
    annualPrice: 28,
    annualBilled: "חיוב שנתי בסך $336",
    cta: "התחילו עם Team",
    ctaHref: CREATE_BASICS_URL,
    features: [
      "כל מה שכלול ב-Pro",
      "עד 10 כרטיסים ו-10 חברי צוות",
      "סביבת עבודה למנהלים",
      "ערכת מותג משותפת",
      "תובנות צוות לשנה",
      "מרכז לידים",
      "תמיכה בעדיפות גבוהה",
    ],
  },
];

export const comparisonFeatures = [
  { name: "כרטיסים דיגיטליים פעילים", free: "1", pro: "1", team: "עד 10" },
  { name: "חברי צוות", free: "1", pro: "1", team: "עד 10" },
  { name: "מקטעים", free: "עד 4", pro: "ללא הגבלה", team: "ללא הגבלה" },
  { name: "טופס איסוף לידים", free: false, pro: true, team: true },
  { name: "תיבת לידים", free: false, pro: true, team: true },
  { name: "תובנות", free: false, pro: "90 יום", team: "שנה" },
  { name: "מיתוג מותאם", free: false, pro: true, team: true },
  { name: "הסרת מיתוג OneTap", free: false, pro: true, team: true },
  { name: "סביבת עבודה למנהלים", free: false, pro: false, team: true },
  { name: "ערכת מותג משותפת", free: false, pro: false, team: true },
];

export const pricingFaqs = [
  {
    q: "אפשר לעבור בין חיוב חודשי לשנתי?",
    a: "כן. ניתן לעבור בכל רגע דרך הגדרות החיוב. בתוכנית שנתית החיוב מתבצע פעם בשנה, בעלות חודשית מקבילה נמוכה יותר.",
  },
  {
    q: "מה קורה כשמבטלים?",
    a: "הכרטיס נשאר פעיל עד סוף תקופת החיוב. לאחר מכן החשבון חוזר לתוכנית Free - והנתונים שלכם אינם נמחקים.",
  },
  {
    q: "האם קיימת תוכנית Team?",
    a: "כן. Team כוללת את כל מה שב-Pro, ובנוסף עד 10 כרטיסים, 10 חברי צוות, סביבת ניהול וערכת מותג משותפת. אפשר להתחיל עם Team ישירות מהעמוד - ללא שיחת מכירה.",
  },
  {
    q: "האם יש תקופת ניסיון חינמית ל-Pro?",
    a: "כן. מצטרפים חדשים ל-Pro מקבלים 14 ימי ניסיון. אם כבר הייתה לכם בעבר תוכנית OneTap בתשלום, החיוב יתבצע מיד בתהליך התשלום.",
  },
];
