import type { PainPointIconKey } from "@/content/en/homepage";
import { audienceMarqueeItems, howItWorksCopy } from "@/content/he/homepage";
import {
  CARD_SCREENSHOT_AMIRI_REAL_ESTATE,
  CARD_SCREENSHOT_DAVE_UFC,
  CARD_SCREENSHOT_JESSICA_WALSH,
  CARD_SCREENSHOT_KIM_YOGA,
  CARD_SCREENSHOT_KND_LAWYER,
  CARD_SCREENSHOT_ROB_HART,
  CARD_SCREENSHOT_TORRES_BUILDS,
} from "@/lib/phone-screenshots";
import { CARD_HOST_PREFIX } from "@/lib/constants";
import { LOGO_ICON } from "@/lib/logos";

export type SolutionFeatureIconKey =
  | "zap"
  | "link2"
  | "userPlus"
  | "barChart3"
  | "image"
  | "refreshCw"
  | "lock"
  | "users"
  | "upload"
  | "palette"
  | "inbox"
  | "contactRound";

export type FreelancerNicheCard = {
  id: string;
  personaName: string;
  styleLabel: string;
  imageSrc: string;
  slug: string;
  alt: string;
};

export type FreelancerNiche = {
  id: string;
  label: string;
  cards: readonly FreelancerNicheCard[];
};

const freelancerCardJessicaWalsh: FreelancerNicheCard = {
  id: "jessica-walsh",
  personaName: "Jessica Walsh",
  styleLabel: "סוכן/ת נדל״ן",
  imageSrc: CARD_SCREENSHOT_JESSICA_WALSH,
  slug: "sofi-schwartz",
  alt: "כרטיס ביקור דיגיטלי OneTap של Jessica Walsh סוכנת נדל״ן",
};

const freelancerCardTorresBuilds: FreelancerNicheCard = {
  id: "torres-builds",
  personaName: "Mike Torres",
  styleLabel: "שיפוצים",
  imageSrc: CARD_SCREENSHOT_TORRES_BUILDS,
  slug: "franklin-barbershop",
  alt: "כרטיס ביקור דיגיטלי OneTap של Mike Torres שיפוצים",
};

const freelancerCardRobHart: FreelancerNicheCard = {
  id: "rob-hart",
  personaName: "Rob Hart",
  styleLabel: "צילום",
  imageSrc: CARD_SCREENSHOT_ROB_HART,
  slug: "almog-menashe",
  alt: "כרטיס ביקור דיגיטלי OneTap של Rob Hart צילום",
};

const freelancerCardKimYoga: FreelancerNicheCard = {
  id: "kim-yoga",
  personaName: "Kim Yoga",
  styleLabel: "וולנס",
  imageSrc: CARD_SCREENSHOT_KIM_YOGA,
  slug: "almog-menashe",
  alt: "כרטיס ביקור דיגיטלי OneTap של Kim Yoga מדריכה",
};

const freelancerCardKndLawyer: FreelancerNicheCard = {
  id: "knd-lawyer",
  personaName: "K&D Lawyers",
  styleLabel: "משפטי",
  imageSrc: CARD_SCREENSHOT_KND_LAWYER,
  slug: "sofi-schwartz",
  alt: "כרטיס ביקור דיגיטלי OneTap של K&D Lawyers",
};

const freelancerCardDaveUfc: FreelancerNicheCard = {
  id: "dave-ufc",
  personaName: "Dave",
  styleLabel: "אימון",
  imageSrc: CARD_SCREENSHOT_DAVE_UFC,
  slug: "almog-menashe",
  alt: "כרטיס ביקור דיגיטלי OneTap של Dave מאמן UFC",
};

const freelancerCardAmiriRealEstate: FreelancerNicheCard = {
  id: "amiri-real-estate",
  personaName: "Amiri Real Estate",
  styleLabel: "יוקרה",
  imageSrc: CARD_SCREENSHOT_AMIRI_REAL_ESTATE,
  slug: "sofi-schwartz",
  alt: "כרטיס ביקור דיגיטלי OneTap של Amiri Real Estate",
};

export const freelancersHeroCopy = {
  title: "הזהות המקצועית שלכם - בדיגיטל, בתוך",
  accent: "60 שניות.",
  lead: "רכזו את תיק העבודות, הקישורים לרשתות החברתיות ופרטי הקשר בכרטיס דיגיטלי אחד וללא מגע. שתפו באמצעות NFC, קוד QR או קישור אחד - בלי צורך להוריד אפליקציה.",
  cta: "צרו כרטיס בחינם",
} as const;

export const freelancersNicheSelectorCopy = {
  title: "צפו בכרטיסים שמתאימים",
  accent: "לתחום שלכם",
  lead: "בחרו את התחום שלכם וצפו בארבעה סגנונות התחלתיים שאפשר להשיק בתוך דקות.",
} as const;

export const freelancersNicheManifest = {
  defaultNicheId: "photography",
  niches: [
    {
      id: "photography",
      label: "צילום",
      cards: [
        freelancerCardRobHart,
        freelancerCardKimYoga,
        freelancerCardJessicaWalsh,
        freelancerCardDaveUfc,
      ],
    },
    {
      id: "design",
      label: "עיצוב",
      cards: [
        freelancerCardTorresBuilds,
        freelancerCardRobHart,
        freelancerCardKimYoga,
        freelancerCardAmiriRealEstate,
      ],
    },
    {
      id: "fitness",
      label: "כושר ואימון",
      cards: [
        freelancerCardDaveUfc,
        freelancerCardKimYoga,
        freelancerCardRobHart,
        freelancerCardTorresBuilds,
      ],
    },
    {
      id: "consulting",
      label: "ייעוץ",
      cards: [
        freelancerCardKndLawyer,
        freelancerCardAmiriRealEstate,
        freelancerCardJessicaWalsh,
        freelancerCardTorresBuilds,
      ],
    },
    {
      id: "real-estate",
      label: "נדל״ן",
      cards: [
        freelancerCardJessicaWalsh,
        freelancerCardAmiriRealEstate,
        freelancerCardTorresBuilds,
        freelancerCardKndLawyer,
      ],
    },
    {
      id: "creator",
      label: "יוצרים",
      cards: [
        freelancerCardRobHart,
        freelancerCardKimYoga,
        freelancerCardDaveUfc,
        freelancerCardJessicaWalsh,
      ],
    },
    {
      id: "marketing",
      label: "שיווק",
      cards: [
        freelancerCardAmiriRealEstate,
        freelancerCardJessicaWalsh,
        freelancerCardRobHart,
        freelancerCardKndLawyer,
      ],
    },
    {
      id: "freelance",
      label: "שירותי פרילנס",
      cards: [
        freelancerCardTorresBuilds,
        freelancerCardRobHart,
        freelancerCardDaveUfc,
        freelancerCardKimYoga,
      ],
    },
  ] as const satisfies readonly FreelancerNiche[],
} as const;

export const freelancersCardIncludesCopy = {
  title: "כל כרטיס כולל את",
  accent: "כל מה שחיוני.",
  lead: "בונים פעם אחת בתוך 60 שניות - ואז משתפים, מאפשרים שמירה לאנשי קשר ושומרים על מיתוג עקבי, מקישור אחד או בהצמדה.",
  points: [
    {
      icon: "zap" as SolutionFeatureIconKey,
      title: "שיתוף בלחיצה אחת",
      description: `שתפו באמצעות NFC, קוד QR או הקישור הקבוע שלכם (${CARD_HOST_PREFIX}username). קישור אחד שעובד בכל מקום שבו אתם יוצרים קשרים.`,
      accent: "from-brand-navy/10 to-brand-turquoise/10",
    },
    {
      icon: "contactRound" as SolutionFeatureIconKey,
      title: "שמירה מיידית לאנשי קשר",
      description:
        "מבקרים שומרים את הפרטים שלכם באנשי הקשר באמצעות vCard מובנה - בלי להוריד אפליקציה ובלי חיכוך.",
      accent: "from-brand-turquoise-light to-brand-turquoise/20",
    },
    {
      icon: "palette" as SolutionFeatureIconKey,
      title: "מיתוג מותאם אישית",
      description:
        "שלטו בצבעים, בטיפוגרפיה ובפריסה, כדי שהכרטיס ייראה ייחודי לכם - ולא כמו עוד תבנית גנרית.",
      accent: "from-brand-midnight/10 to-brand-navy/10",
    },
  ],
} as const;

export const freelancersPainPointsCopy = {
  title: "נגמרו",
  accent: "ההזדמנויות האבודות.",
  lead: "עצמאים מלהגלים בין אירועים, הודעות וכלי לינק-אין-ביו - ועדיין מאבדים לידים כשהמעקב איטי או הנוכחות הדיגיטלית נראית מפוזרת.",
  points: [
    {
      icon: "contactRound" as PainPointIconKey,
      title: "נגמרו אנשי הקשר שהולכים לאיבוד אחרי אירועים",
      description:
        "תנו למישהו קישור אחד. הם ישמרו את הפרטים שלכם, ישלחו הודעה או ימלאו טופס ליד לפני שתצאו מהחדר.",
      accent: "from-brand-navy/10 to-brand-turquoise/10",
    },
    {
      icon: "link2" as PainPointIconKey,
      title: "נגמר הלינק-אין-ביו המפוזר",
      description:
        "תיק עבודות, שירותים, רשתות חברתיות ותיאום פגישות חיים בפרופיל מלוטש אחד - לא בחמישה כלים שונים.",
      accent: "from-brand-turquoise-light to-brand-turquoise/20",
    },
    {
      icon: "lineChart" as PainPointIconKey,
      title: "נגמרו הניחושים מה עובד",
      description:
        "ראו אילו פגישות, פוסטים ואירועים באמת מביאים צפיות, לחיצות ופניות.",
      accent: "from-brand-midnight/10 to-brand-navy/10",
    },
  ],
} as const;

export const freelancersHowItWorksCopy = {
  title: "מלחיצת יד ועד",
  accent: "לקוח חדש",
  description: "השיקו תוך דקות. שתפו בכל מקום שאתם עושים נטוורקינג. הפכו תשומת לב לשיחות אמיתיות.",
  steps: [
    {
      step: "01",
      title: "יוצרים",
      description:
        "הוסיפו תמונה, שירותים, תיק עבודות, המלצות, כפתורי יצירת קשר וטופס לידים - בלי מעצב או מפתח.",
      image: howItWorksCopy.steps[0].image,
      imageAlt: howItWorksCopy.steps[0].imageAlt,
    },
    {
      step: "02",
      title: "משתפים",
      description:
        "שלבו את ה-URL של OneTap בחתימת המייל, LinkedIn, WhatsApp, QR בתג כנס או בביו באינסטגרם - תמיד ממותגים.",
      image: howItWorksCopy.steps[1].image,
      imageAlt: howItWorksCopy.steps[1].imageAlt,
    },
    {
      step: "03",
      title: "מתחברים",
      description:
        "לקוחות פוטנציאליים שומרים את איש הקשר, קובעים שיחה או שולחים את הפרטים שלהם מהכרטיס - כך שאתם עוקבים כשאתם עדיין בזיכרון.",
      image: howItWorksCopy.steps[2].image,
      imageAlt: howItWorksCopy.steps[2].imageAlt,
    },
  ],
} as const;

export const freelancersFeaturesCopy = {
  title: "נבנה בשביל איך",
  accent: "שאתם עובדים לבד",
  lead: "כל מה שצריך כדי להיראות אמינים, להישאר זמינים ולהגדיל את צינור הלקוחות - בלי ללהגל בין חמישה כלים.",
  features: [
    {
      icon: "zap" as SolutionFeatureIconKey,
      title: "הקמה ב-60 שניות",
      description:
        "השיקו את הכרטיס לפני הפגישה הבאה מעל קפה. בלי מיומנויות עיצוב.",
    },
    {
      icon: "link2" as SolutionFeatureIconKey,
      title: "תחליף ללינק-אין-ביו",
      description:
        "URL יפה אחד לתיק עבודות, רשתות חברתיות, שירותים ויצירת קשר - תמיד מעודכן.",
    },
    {
      icon: "userPlus" as SolutionFeatureIconKey,
      title: "איסוף לידים אוטומטי",
      description: "טפסים מובנים אוספים פרטי לקוחות פוטנציאליים ומתריעים מיידית.",
    },
    {
      icon: "barChart3" as SolutionFeatureIconKey,
      title: "אנליטיקה ומעורבות",
      description: "עקבו אחר צפיות, לחיצות על כפתורים ושליחות טפסים מלוח בקרה אחד.",
    },
    {
      icon: "image" as SolutionFeatureIconKey,
      title: "תיק עבודות והמלצות",
      description: "הציגו מקרי בוחן, גלריה וציטוטי לקוחות שבונים אמון במהירות.",
    },
    {
      icon: "refreshCw" as SolutionFeatureIconKey,
      title: "תמיד עדכני",
      description: "עדכנו הצעה או פרטי קשר פעם אחת - כל מבקר עתידי רואה את הגרסה האחרונה.",
    },
  ],
} as const;

export const freelancersCreatorsCopy = {
  badge: "ליוצרים",
  title: "חשיפה",
  accent: "פי 5",
  lead: "הציגו גלריה, הטמיעו סרטונים וקשרו כל פלטפורמה מפרופיל מובייל מרהיב אחד. הקהל שלכם שומר את איש הקשר שלכם בלחיצה אחת.",
  cta: "התחילו ליצור",
  phoneAlt: "תצוגה מקדימה של כרטיס OneTap ליוצר",
} as const;

export const freelancersSocialProofCopy = {
  title: "הבחירה של עצמאים שנטוורקינג",
  accent: "הוא חלק מהעבודה שלהם.",
  lead: "מיועצים ועד יוצרים - אנשי מקצוע עצמאיים ברחבי העולם סומכים על OneTap כדי להפוך כל היכרות להזדמנות.",
  audiences: audienceMarqueeItems,
  testimonials: [
    {
      name: "Elena Torres",
      role: "אסטרטגית מותג עצמאית",
      headline: "הכול היה מוכן בתוך פחות מדקה",
      content:
        "הקמתי את הכרטיס בתוך פחות מדקה. לקוחות שומרים את הפרטים שלי עוד לפני שאני מסיימת את הצגת המעלית.",
      avatar: LOGO_ICON,
      rating: 5,
    },
    {
      name: "Marcus Chen",
      role: "יועץ עצמאי",
      headline: "מתעניינים יוצרים קשר מהר יותר",
      content:
        "קישור אחד ליומן, לתיק העבודות ול-WhatsApp. אחרי כל שיחת היכרות, מתעניינים מגיעים אליי מהר יותר.",
      avatar: LOGO_ICON,
      rating: 5,
    },
    {
      name: "Priya Shah",
      role: "יועצת שיווק",
      headline: "החלפתי שלושה כלי קישורים בבת אחת",
      content:
        "החלפתי שלושה כלי Link in Bio בכרטיס אחד. לידים חדשים מגיעים לתיבה שלי כבר באותו יום שבו אני פוגשת מישהו באירוע.",
      avatar: LOGO_ICON,
      rating: 5,
    },
    {
      name: "Diego Ramos",
      role: "צלם עצמאי",
      headline: "תהליך חלק כבר מיום הצילום",
      content:
        "בכל יום צילום אני משתף קוד QR אחד. דוגמנים ולקוחות שומרים את הפרטים שלי וצופים בתיק העבודות עוד לפני שהם עוזבים את הסט.",
      avatar: LOGO_ICON,
      rating: 5,
    },
    {
      name: "Sophia Martinez",
      role: "מעצבת פנים",
      headline: "תיק עבודות מרשים במובייל",
      content:
        "שיתוף תיק העבודות האיכותי שלי באמצעות כרטיס NFC מרשים את הלקוחות. קביעת פגישות ייעוץ מעולם לא הייתה פשוטה יותר.",
      avatar: LOGO_ICON,
      rating: 5,
    },
    {
      name: "Liam O'Connor",
      role: "מאמן כושר ואורח חיים",
      headline: "לקוחות קובעים מיד",
      content:
        "לקוחות מצמידים את הטלפון לכרטיס כדי לשמור את הפרטים, לצפות במערכת השבועית ולקבוע אימון ישירות.",
      avatar: LOGO_ICON,
      rating: 5,
    },
  ],
} as const;

export const freelancersPricingHeader = {
  title: "מתחילים בחינם.",
  accent: "משדרגים כשצומחים.",
  lead: "השיקו כרטיס מקצועי ללא עלות. הוסיפו אנליטיקה, מיתוג מותאם ויכולות נוספות כשהעסק גדל.",
} as const;

export const agenciesHeroCopy = {
  title: "מיתוג אחיד.",
  accent: "שליטה מרוכזת.",
  lead: "העניקו לכל חברי הצוות כרטיס דיגיטלי במיתוג אחיד, נהלו משתמשים מסביבת עבודה אחת, שתפו ערכת מותג ואספו את כל הלידים לתיבה אחת.",
  primaryCta: "התחילו עם Team",
  secondaryCta: "כניסה",
} as const;

export const agenciesWorkspaceCopy = {
  title: "נהלו את כל הצוות",
  accent: "במקום אחד",
  lead: "הוסיפו חברי צוות, הקצו תפקידים ועקבו אחר ביצועים - מלוח בקרה אחד.",
  cta: "התחילו עם Team",
} as const;

export const agenciesGovernanceCopy = {
  title: "שתפו את המותג.",
  accent: "קחו בעלות על כל ליד.",
  lead: "ערכת מותג משותפת ומרכז הלידים מעניקים למנהלים מקום אחד לשמור על אחידות הכרטיסים - ולראות לאן מגיע כל ליד.",
  brandLock: {
    badge: "ערכת מותג משותפת",
    title: "שמרו על",
    accent: "אחידות המותג",
    lead: "שתפו לוגואים, צבעים ותבניות, כדי שכל כרטיס חדש יתחיל במיתוג הנכון.",
    capabilities: [
      {
        icon: "lock" as SolutionFeatureIconKey,
        title: "שתפו את מיתוג הארגון",
        description:
          "רכזו לוגואים, צבעים ותבניות מאושרות בערכה אחת, כך שכל כרטיס חדש יתחיל במיתוג אחיד.",
      },
      {
        icon: "palette" as SolutionFeatureIconKey,
        title: "ספריית תבניות",
        description: "החילו פריסות מאושרות, כדי שכרטיסים חדשים יעמדו בסטנדרטים שלכם מהיום הראשון.",
      },
      {
        icon: "users" as SolutionFeatureIconKey,
        title: "שליטה לפי תפקיד",
        description: "מנהלים שולטים בסביבת העבודה; חברי הצוות מעדכנים בעצמם את התיאור, הקישורים ואפשרויות יצירת הקשר.",
      },
      {
        icon: "refreshCw" as SolutionFeatureIconKey,
        title: "עדכונים לערכה המשותפת",
        description:
          "עדכנו את הערכה פעם אחת - וכרטיסים חדשים יקבלו את הצבעים והתבניות העדכניים.",
      },
    ],
    imageAlt: "הגדרות ערכת מותג משותפת של OneTap לצבעים ולוגואים צוותיים",
  },
  leads: {
    badge: "מרכז הלידים",
    title: "איסוף לידים",
    accent: "מרוכז",
    lead: "כל ליד מכל נציג מגיע לתצוגת ניהול אחת - סננו, הקצו וייצאו לפי הצורך.",
    capabilities: [
      {
        icon: "inbox" as SolutionFeatureIconKey,
        title: "תיבה אחת לכל הצוות",
        description: "הצמדות NFC, סריקות QR וטפסים שנשלחו מכל נציג מגיעים למרכז לידים אחד.",
      },
      {
        icon: "users" as SolutionFeatureIconKey,
        title: "שיוך לנציג",
        description: "ראו מי קלט כל ליד ואיזה ערוץ הוביל לאינטראקציה.",
      },
      {
        icon: "upload" as SolutionFeatureIconKey,
        title: "ייצוא לפי דרישה",
        description: "הורידו גיבוי CSV או העבירו ל-CRM בלי העברה ידנית.",
      },
      {
        icon: "barChart3" as SolutionFeatureIconKey,
        title: "סינון והקצאה",
        description:
          "סננו לידים לפי נציג, ערוץ או תאריך, והפנו פולואפים בלי לצאת מלוח הבקרה.",
      },
    ],
    imageAlt: "מרכז לידים של OneTap המציג לכידות צוותיות עם שיוך נציגים וערוצים",
  },
} as const;

export const agenciesEnterpriseCopy = {
  title: "נבנה לצוותים",
  accent: "שצומחים",
  lead: "כל מה שהארגון צריך כדי לשמור על אחידות המותג, לצרף עובדים במהירות ולהוכיח את ההחזר על ההשקעה בנטוורקינג.",
  pillars: [
    {
      icon: "lock" as SolutionFeatureIconKey,
      title: "בעלות על הנתונים",
      description:
        "למנהלים יש בעלות על כל נתוני האינטראקציות. בודקים את הלידים במרכז הלידים ומייצאים ל-CSV בכל פעם שנדרש גיבוי או מעבר למערכת אחרת.",
      accent: "from-brand-navy/10 to-brand-turquoise/10",
    },
    {
      icon: "upload" as SolutionFeatureIconKey,
      title: "קליטה מיידית לצוות",
      description:
        "הוסיפו חברי צוות, הקצו תפקידים והחילו תבניות מותג משותפות, כדי שנציגים חדשים ישיקו כרטיסים ממותגים בתוך דקות.",
      accent: "from-brand-turquoise-light to-brand-turquoise/20",
    },
    {
      icon: "barChart3" as SolutionFeatureIconKey,
      title: "אנליטיקה לצוות",
      description:
        "עקבו מלוח הניהול אחר צפיות, לידים ושמירות vCard לכל נציג - זהו מצטיינים ושפרו ביצועים על בסיס נתונים אמיתיים.",
      accent: "from-brand-midnight/10 to-brand-navy/10",
    },
    {
      icon: "inbox" as SolutionFeatureIconKey,
      title: "ניתוב לידים",
      description:
        "הקצו פניות לנציג המתאים ושמרו על רצף הפולואפ - בלי תיבות מפוזרות ובלי העברות שמתפספסות.",
      accent: "from-brand-turquoise/10 to-brand-navy/10",
    },
  ],
} as const;

export const agenciesSocialProofCopy = {
  title: "צוותים שנשארים יחד",
  accent: "באותו קו מותגי.",
  lead: "סוכנויות וצוותי מכירות משתמשים ב-OneTap כדי לשתף כרטיסים, ערכת מותג ותיבת לידים אחת.",
  audiences: audienceMarqueeItems,
  testimonials: [
    {
      name: "James Okonkwo",
      role: "מייסד, Nova Labs",
      headline: "מערכת מיתוג אחידה לצוות",
      content:
        "הצוות שלנו משתף ערכת מותג אחת. קליטת עובד חדש מסתכמת עכשיו בקישור ולחיצה.",
      avatar: LOGO_ICON,
      rating: 5,
    },
    {
      name: "Sarah Kim",
      role: "מנהלת תפעול, Meridian Group",
      headline: "המחלקה המשפטית אישרה פעם אחת",
      content:
        "ערכת המותג המשותפת עצרה עיצובים חד-פעמיים. כל כרטיס של סוכן מתחיל מהצבעים ומהלוגו שכבר אישרנו.",
      avatar: LOGO_ICON,
      rating: 5,
    },
    {
      name: "David Ortiz",
      role: "שותף מנהל, Park & Associates",
      headline: "השקה במיתוג אחיד, בלי לחץ",
      content:
        "הזמנו את כל הצוות, שיתפנו את הערכה, וכל כרטיס חדש התחיל במיתוג הנכון מהיום הראשון.",
      avatar: LOGO_ICON,
      rating: 5,
    },
    {
      name: "Amara Patel",
      role: "צלמת פורטרטים וחתונות",
      headline: "יצירת לידים בלי מאמץ",
      content:
        "טופס ההתעניינות שלי ב-OneTap אוסף מיד את העדפות חבילת הצילום כשאני פוגשת זוגות בתערוכות חתונה.",
      avatar: LOGO_ICON,
      rating: 5,
    },
    {
      name: "Alexandre Dubois",
      role: "ספר ובעל סטודיו",
      headline: "אף לקוח חוזר לא הולך לאיבוד",
      content:
        "אני מציע ללקוחות מזדמנים להצמיד את הטלפון לכרטיס ה-NFC של OneTap. הם שומרים את המספר וקובעים את התספורת הבאה לפני היציאה.",
      avatar: LOGO_ICON,
      rating: 5,
    },
    {
      name: "Marcus Chen",
      role: "סוכן נדל״ן",
      headline: "כלי חיוני לימים פתוחים",
      content:
        "קישור אחד לנכסים, לסיורים וירטואליים ולשיחת WhatsApp ישירה. מתעניינים יוצרים קשר מיד אחרי הסיור.",
      avatar: LOGO_ICON,
      rating: 5,
    },
  ],
} as const;

export const agenciesPricingHeader = {
  title: "תוכניות לצוותים",
  accent: "שצומחים.",
  lead: "השוו בין מספר המשתמשים ב-Team, ערכת המותג המשותפת והאנליטיקה. התחילו בתוכנית שמתאימה לגודל הצוות - ושדרגו ככל שאתם צומחים.",
} as const;
