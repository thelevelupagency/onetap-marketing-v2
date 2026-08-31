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
    name: "חינם",
    description: "להתחלה",
    monthlyPrice: 0,
    annualPrice: 0,
    cta: "התחילו בחינם",
    ctaHref: CREATE_BASICS_URL,
    features: [
      "כרטיס דיגיטלי אחד",
      "פרופיל, קוד QR ולינק לשיתוף",
      "כפתורי יצירת קשר בנגיעה אחת",
      "עד 4 סקשנים - אודות, גלריה, וידאו, הדגשות, שאלות נפוצות, המלצות",
      "תבניות בסיסיות",
      "כולל מיתוג OneTap",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    description: "לאנשי מקצוע שרוצים יותר שליטה",
    monthlyPrice: 12,
    annualPrice: 10,
    annualBilled: "חיוב של $120 לשנה",
    cta: "התחילו תקופת ניסיון Pro",
    ctaHref: CREATE_BASICS_URL,
    popular: true,
    features: [
      "הכל מחינם",
      "כרטיס דיגיטלי אחד",
      "סקשנים ללא הגבלה, כולל טופס לידים",
      "תיבת לידים עם פילטרים וייצוא CSV",
      "תובנות ל-90 יום",
      "מיתוג מותאם אישית וערכת מותג - בלי לוגו OneTap",
    ],
  },
  {
    id: "team",
    name: "Team",
    description: "לצוותות שצריכים כרטיסים ומיתוג משותפים",
    monthlyPrice: 35,
    annualPrice: 28,
    annualBilled: "חיוב של $336 לשנה",
    cta: "התחילו Team",
    ctaHref: CREATE_BASICS_URL,
    features: [
      "הכל מ-Pro",
      "עד 10 כרטיסים ו-10 חברים",
      "סביבת עבודה לאדמין",
      "ערכת מותג משותפת",
      "תובנות צוות (שנה)",
      "מרכז לידים",
      "תמיכה עדיפה",
    ],
  },
];

export const comparisonFeatures = [
  { name: "כרטיסים דיגיטליים פעילים", free: "1", pro: "1", team: "עד 10" },
  { name: "חברי צוות", free: "1", pro: "1", team: "עד 10" },
  { name: "סקשנים", free: "עד 4", pro: "ללא הגבלה", team: "ללא הגבלה" },
  { name: "טופס לכידת לידים", free: false, pro: true, team: true },
  { name: "תיבת לידים", free: false, pro: true, team: true },
  { name: "תובנות", free: false, pro: "90 יום", team: "שנה" },
  { name: "מיתוג מותאם אישית", free: false, pro: true, team: true },
  { name: "הסרת מיתוג OneTap", free: false, pro: true, team: true },
  { name: "סביבת עבודה לאדמין", free: false, pro: false, team: true },
  { name: "ערכת מותג משותפת", free: false, pro: false, team: true },
];

export const pricingFaqs = [
  {
    q: "אפשר לעבור בין חיוב חודשי לשנתי?",
    a: "כן. אפשר לעבור בכל עת מהגדרות החיוב. מנויים שנתיים מחויבים פעם בשנה בתעריף חודשי נמוך יותר.",
  },
  {
    q: "מה קורה כשמבטלים?",
    a: "הכרטיס שלכם נשאר פעיל עד סוף תקופת החיוב. לאחר מכן, החשבון חוזר לתוכנית חינם - המידע שלכם לעולם לא נמחק.",
  },
  {
    q: "יש תוכנית Team?",
    a: "כן. Team כולל הכל מ-Pro, בתוספת עד 10 כרטיסים, 10 חברים, סביבת עבודה לאדמין וערכת מותג משותפת. התחילו Team מדף זה - בלי שיחת מכירה.",
  },
  {
    q: "יש תקופת ניסיון חינם ל-Pro?",
    a: "כן. מנויי Pro חדשים מקבלים ניסיון של 14 יום. אם כבר היה לכם מנוי OneTap בתשלום, החיוב מתבצע מיד.",
  },
];
