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
  styleLabel: "נדל\"ן",
  imageSrc: CARD_SCREENSHOT_JESSICA_WALSH,
  slug: "sofi-schwartz",
  alt: "כרטיס ביקור דיגיטלי OneTap של Jessica Walsh סוכנת נדל\"ן",
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
  styleLabel: "בריאות",
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
  title: "הזהות שלכם, בדיגיטל תוך",
  accent: "60 שניות.",
  lead: "אחדו פורטפוליו, קישורים לרשתות חברתיות ופרטי קשר לכרטיס אחד ללא מגע. שתפו עם NFC, QR או לינק אחד - בלי להוריד אפליקציה.",
  cta: "צרו את הכרטיס החינמי שלכם",
} as const;

export const freelancersNicheSelectorCopy = {
  title: "תצוגה מקדימה של כרטיסים",
  accent: "לתחום שלכם",
  lead: "בחרו את התחום שלכם כדי לראות ארבעה סגנונות התחלה שאפשר להשיק תוך דקות.",
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
      label: "נדל\"ן",
      cards: [
        freelancerCardJessicaWalsh,
        freelancerCardAmiriRealEstate,
        freelancerCardTorresBuilds,
        freelancerCardKndLawyer,
      ],
    },
    {
      id: "creator",
      label: "יוצרי תוכן",
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
      label: "שירותים עצמאיים",
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
  title: "כל כרטיס",
  accent: "כולל את היסודות.",
  lead: "בנו פעם אחת ב-60 שניות - ואז שתפו, שמרו אנשי קשר והישארו ממותגים מלינק או נגיעה אחת.",
  points: [
    {
      icon: "zap" as SolutionFeatureIconKey,
      title: "שיתוף בנגיעה אחת",
      description: `שתפו דרך NFC, קוד QR או הלינק האישי שלכם (${CARD_HOST_PREFIX}username). לינק אחד עובד בכל מקום שאתם עושים נטוורקינג.`,
      accent: "from-brand-navy/10 to-brand-turquoise/10",
    },
    {
      icon: "contactRound" as SolutionFeatureIconKey,
      title: "שמירת איש קשר מיידית",
      description:
        "מבקרים שומרים את הפרטים שלכם לאנשי הקשר בטלפון עם vCard מובנה - בלי הורדת אפליקציה, בלי חיכוך.",
      accent: "from-brand-turquoise-light to-brand-turquoise/20",
    },
    {
      icon: "palette" as SolutionFeatureIconKey,
      title: "מיתוג מבני מותאם אישית",
      description:
        "שלטו בצבעים, טיפוגרפיה ופריסה כדי שהכרטיס שלכם ייראה בלעדי - לא תבנית גנרית.",
      accent: "from-brand-midnight/10 to-brand-navy/10",
    },
  ],
} as const;

export const freelancersPainPointsCopy = {
  title: "נגמרו",
  accent: "ההזדמנויות האבודות.",
  lead: "פרילנסרים מלהגלים בין אירועים, הודעות וכלי לינק-אין-ביו - ועדיין מאבדים לידים כשהמעקב איטי או הנוכחות הדיגיטלית נראית מפוזרת.",
  points: [
    {
      icon: "contactRound" as PainPointIconKey,
      title: "נגמרו אנשי הקשר שהולכים לאיבוד אחרי אירועים",
      description:
        "תנו למישהו לינק אחד. הם ישמרו את הפרטים שלכם, ישלחו הודעה או ימלאו טופס ליד לפני שתצאו מהחדר.",
      accent: "from-brand-navy/10 to-brand-turquoise/10",
    },
    {
      icon: "link2" as PainPointIconKey,
      title: "נגמר הלינק-אין-ביו המפוזר",
      description:
        "פורטפוליו, שירותים, רשתות חברתיות ותיאום פגישות חיים בפרופיל מלוטש אחד - לא בחמישה כלים שונים.",
      accent: "from-brand-turquoise-light to-brand-turquoise/20",
    },
    {
      icon: "lineChart" as PainPointIconKey,
      title: "נגמרו הניחושים מה עובד",
      description:
        "ראו אילו פגישות, פוסטים ואירועים באמת מביאים צפיות, קליקים ופניות.",
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
        "הוסיפו תמונה, שירותים, פורטפוליו, המלצות, כפתורי יצירת קשר וטופס לידים - בלי מעצב או מפתח.",
      image: howItWorksCopy.steps[0].image,
      imageAlt: howItWorksCopy.steps[0].imageAlt,
    },
    {
      step: "02",
      title: "משתפים",
      description:
        "שלבו את ה-URL של OneTap בחתימת המייל, לינקדאין, וואטסאפ, QR בתג כנס או ביו באינסטגרם - תמיד ממותגים.",
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
        "URL יפה אחד לפורטפוליו, רשתות חברתיות, שירותים ויצירת קשר - תמיד מעודכן.",
    },
    {
      icon: "userPlus" as SolutionFeatureIconKey,
      title: "לכידת לידים אוטומטית",
      description: "טפסים מובנים אוספים פרטי לקוחות פוטנציאליים ומתריעים מיידית.",
    },
    {
      icon: "barChart3" as SolutionFeatureIconKey,
      title: "אנליטיקס מעורבות",
      description: "עקבו אחרי צפיות, קליקים על כפתורים ושליחות טפסים מלוח בקרה אחד.",
    },
    {
      icon: "image" as SolutionFeatureIconKey,
      title: "פורטפוליו והמלצות",
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
  badge: "ליוצרי תוכן",
  title: "חשיפה",
  accent: "פי 5",
  lead: "הציגו גלריה, הטמיעו סרטונים וקשרו כל פלטפורמה מפרופיל מובייל מרהיב אחד. הקהל שלכם שומר את איש הקשר שלכם בנגיעה אחת.",
  cta: "התחילו ליצור",
  phoneAlt: "תצוגה מקדימה של כרטיס OneTap ליוצר תוכן",
} as const;

export const freelancersSocialProofCopy = {
  title: "פרילנסרים שסומכים",
  accent: "ועושים נטוורקינג לפרנסה.",
  lead: "מיועצים ועד יוצרי תוכן - אנשי מקצוע עצמאיים בכל העולם סומכים על OneTap כדי להפוך כל היכרות למשמעותית.",
  audiences: audienceMarqueeItems,
  testimonials: [
    {
      name: "Elena Torres",
      role: "אסטרטגית מותג עצמאית",
      headline: "הקמתי תוך פחות מדקה",
      content:
        "הקמתי את הכרטיס תוך פחות מדקה. לקוחות שומרים את איש הקשר שלי עוד לפני שאני מסיימת את ה-pitch.",
      avatar: LOGO_ICON,
      rating: 5,
    },
    {
      name: "Marcus Chen",
      role: "יועץ עצמאי",
      headline: "חיבור מהיר יותר ללקוחות",
      content:
        "לינק אחד ליומן, פורטפוליו ווואטסאפ. לקוחות פוטנציאליים מגיעים אליי מהר יותר אחרי כל שיחת היכרות.",
      avatar: LOGO_ICON,
      rating: 5,
    },
    {
      name: "Priya Shah",
      role: "יועצת שיווק",
      headline: "החליפה 3 כלי לינקים בבת אחת",
      content:
        "החלפתי שלושה כלי לינק-אין-ביו בכרטיס אחד. לידים חדשים מגיעים לתיבה שלי באותו יום שאני פוגשת מישהו באירוע.",
      avatar: LOGO_ICON,
      rating: 5,
    },
    {
      name: "Diego Ramos",
      role: "צלם עצמאי",
      headline: "קליטה חלקה לצילומים",
      content:
        "בכל צילום אני משתף קוד QR אחד. דוגמנים ולקוחות שומרים את הפרטים שלי וגולשים בפורטפוליו לפני שעוזבים את הסט.",
      avatar: LOGO_ICON,
      rating: 5,
    },
    {
      name: "Sophia Martinez",
      role: "מעצבת פנים",
      headline: "פורטפוליו מדהים למובייל",
      content:
        "שיתוף הפורטפוליו שלי ברזולוציה גבוהה דרך כרטיס NFC מרשים לקוחות. קביעת ייעוצים מעולם לא הייתה חלקה יותר.",
      avatar: LOGO_ICON,
      rating: 5,
    },
    {
      name: "Liam O'Connor",
      role: "מאמן כושר ובריאות",
      headline: "הזמנות מיידיות מלקוחות",
      content:
        "לקוחות נוגעים בכרטיס שלי כדי לשמור את פרטי הקשר, לצפות בלוחות זמנים שבועיים ולקבוע אימונים אישיים.",
      avatar: LOGO_ICON,
      rating: 5,
    },
  ],
} as const;

export const freelancersPricingHeader = {
  title: "התחילו בחינם.",
  accent: "שדרגו כשתצמחו.",
  lead: "השיקו את הכרטיס המקצועי שלכם ללא עלות. הוסיפו אנליטיקס, מיתוג מותאם אישית ועוד כשהעסק מתרחב.",
} as const;

export const agenciesHeroCopy = {
  title: "מיתוג אחיד.",
  accent: "שליטה מרכזית.",
  lead: "תנו לכל חבר צוות כרטיס דיגיטלי ממותג, נהלו חברים מסביבת עבודה אחת, שתפו ערכת מותג ואספו לידים בתיבה אחת.",
  primaryCta: "התחילו Team",
  secondaryCta: "התחברות",
} as const;

export const agenciesWorkspaceCopy = {
  title: "נהלו את כל",
  accent: "הצוות",
  lead: "הוסיפו חברי צוות, הקצו תפקידים ועקבו אחרי ביצועים מלוח בקרה אחד של סביבת העבודה.",
  cta: "התחילו Team",
} as const;

export const agenciesGovernanceCopy = {
  title: "שתפו את המותג.",
  accent: "החזיקו בכל ליד.",
  lead: "ערכת מותג משותפת ומרכז לידים נותנים לאדמינים מקום אחד לשמור על כרטיסים עקביים - ולראות לאן כל ליד מגיע.",
  brandLock: {
    badge: "ערכת מותג משותפת",
    title: "שמרו על",
    accent: "עקביות מותגית",
    lead: "שתפו לוגואים, צבעים ותבניות כך שכל כרטיס של חבר צוות מתחיל ממותג.",
    capabilities: [
      {
        icon: "lock" as SolutionFeatureIconKey,
        title: "שתפו מיתוג משרדי",
        description:
          "שימו לוגואים, צבעים ותבניות מאושרות בערכה אחת כך שכרטיסים חדשים מתחילים ממותגים.",
      },
      {
        icon: "palette" as SolutionFeatureIconKey,
        title: "ספריית תבניות",
        description: "פרסו פריסות מאושרות כך שכרטיסים חדשים יורשים את הסטנדרטים שלכם מהיום הראשון.",
      },
      {
        icon: "users" as SolutionFeatureIconKey,
        title: "שליטה מבוססת תפקידים",
        description: "אדמינים מנהלים את סביבת העבודה; חברי צוות מעדכנים את הביו, הקישורים ואפשרויות יצירת הקשר שלהם.",
      },
      {
        icon: "refreshCw" as SolutionFeatureIconKey,
        title: "עדכוני ערכה משותפים",
        description:
          "עדכנו את הערכה פעם אחת - כרטיסים חדשים מקבלים את הצבעים והתבניות האחרונים.",
      },
    ],
    imageAlt: "הגדרות ערכת מותג משותפת של OneTap לצבעים ולוגואים צוותיים",
  },
  leads: {
    badge: "מרכז לידים",
    title: "לכידת לידים",
    accent: "מרכזית",
    lead: "כל ליד מכל נציג זורם לתצוגת אדמין אחת - סננו, שייכו וייצאו כשצריך.",
    capabilities: [
      {
        icon: "inbox" as SolutionFeatureIconKey,
        title: "תיבה אחת לצוות",
        description: "נגיעות NFC, סריקות QR ושליחות טפסים מכל נציג מגיעות למרכז לידים אחד.",
      },
      {
        icon: "users" as SolutionFeatureIconKey,
        title: "שיוך לנציג",
        description: "ראו מי לכד כל ליד ואיזה ערוץ הביא את האינטראקציה.",
      },
      {
        icon: "upload" as SolutionFeatureIconKey,
        title: "ייצוא לפי דרישה",
        description: "הורידו גיבויי CSV או העבירו ל-CRM בלי העברה ידנית.",
      },
      {
        icon: "barChart3" as SolutionFeatureIconKey,
        title: "סינון ושיוך",
        description:
          "חתכו לידים לפי נציג, ערוץ או תאריך ונתבו מעקבים בלי לעזוב את לוח הבקרה.",
      },
    ],
    imageAlt: "מרכז לידים של OneTap המציג לכידות צוותיות עם שיוך נציגים וערוצים",
  },
} as const;

export const agenciesEnterpriseCopy = {
  title: "נבנה עבור",
  accent: "צוותות בקנה מידה",
  lead: "כל מה שהארגון שלכם צריך כדי להגן על שלמות המותג, לקלוט מהר ולהוכיח ROI מנטוורקינג.",
  pillars: [
    {
      icon: "lock" as SolutionFeatureIconKey,
      title: "בעלות על המידע",
      description:
        "אדמינים מחזיקים בכל יומן אינטראקציות. בדקו לכידות במרכז הלידים וייצאו ל-CSV כשצריך גיבוי או העברה.",
      accent: "from-brand-navy/10 to-brand-turquoise/10",
    },
    {
      icon: "upload" as SolutionFeatureIconKey,
      title: "קליטה מיידית",
      description:
        "הוסיפו חברי צוות, הקצו תפקידים ופרסו תבניות מותג משותפות כך שנציגים חדשים משיקים כרטיסים ממותגים תוך דקות.",
      accent: "from-brand-turquoise-light to-brand-turquoise/20",
    },
    {
      icon: "barChart3" as SolutionFeatureIconKey,
      title: "אנליטיקס צוותי",
      description:
        "עקבו אחרי צפיות, לידים ושמירות vCard לכל נציג מלוח הבקרה של האדמין - זהו טופ פרפורמרים ואמנו עם נתונים אמיתיים.",
      accent: "from-brand-midnight/10 to-brand-navy/10",
    },
    {
      icon: "inbox" as SolutionFeatureIconKey,
      title: "ניתוב לידים",
      description:
        "שייכו פניות לנציג הנכון ושמרו על מעקבים בתנועה - בלי תיבות דואר מפוזרות או העברות שהולכות לאיבוד.",
      accent: "from-brand-turquoise/10 to-brand-navy/10",
    },
  ],
} as const;

export const agenciesSocialProofCopy = {
  title: "צוותות שנשארים",
  accent: "ממותגים ביחד.",
  lead: "סוכנויות וצוותי מכירות משתמשים ב-OneTap כדי לשתף כרטיסים, ערכת מותג ותיבת לידים אחת.",
  audiences: audienceMarqueeItems,
  testimonials: [
    {
      name: "James Okonkwo",
      role: "מייסד, Nova Labs",
      headline: "מערכת מיתוג צוותית אחידה",
      content:
        "הצוות שלנו משתף ערכת מותג אחת. קליטת עובד חדש זה עכשיו לינק ונגיעה.",
      avatar: LOGO_ICON,
      rating: 5,
    },
    {
      name: "Sarah Kim",
      role: "מנהלת תפעול, Meridian Group",
      headline: "המשפטית אישרה את הערכה פעם אחת",
      content:
        "ערכת המותג המשותפת עצרה עיצובי כרטיס חד-פעמיים. כל כרטיס סוכן מתחיל מהצבעים והלוגו שכבר אישרנו.",
      avatar: LOGO_ICON,
      rating: 5,
    },
    {
      name: "David Ortiz",
      role: "שותף מנהל, Park & Associates",
      headline: "השקה ממותגת בלי שריפות",
      content:
        "הזמנו את הצוות, שיתפנו את הערכה וכל כרטיס חדש התחיל ממותג מהיום הראשון.",
      avatar: LOGO_ICON,
      rating: 5,
    },
    {
      name: "Amara Patel",
      role: "צלמת פורטרטים וחתונות",
      headline: "יצירת לידים חלקה",
      content:
        "טופס הפניות שלי ב-OneTap לוכד העדפות חבילות צילום מיידית כשאני פוגשת זוגות בתערוכות כלות.",
      avatar: LOGO_ICON,
      rating: 5,
    },
    {
      name: "Alexandre Dubois",
      role: "ספר ובעל סטודיו",
      headline: "אף פעם לא מאבדים לקוח חוזר",
      content:
        "אני מחלק כרטיסי NFC של OneTap ללקוחות שנכנסים. הם שומרים את המספר שלי וקובעים את התספורת הבאה לפני שיוצאים.",
      avatar: LOGO_ICON,
      rating: 5,
    },
    {
      name: "Marcus Chen",
      role: "סוכן נדל\"ן",
      headline: "כלי חיוני לבתים פתוחים",
      content:
        "לינק אחד לנכסים, סיורים וירטואליים וצ׳אט וואטסאפ ישיר. לקוחות פוטנציאליים פונים מיד אחרי הסיורים.",
      avatar: LOGO_ICON,
      rating: 5,
    },
  ],
} as const;

export const agenciesPricingHeader = {
  title: "תוכניות לצוותות",
  accent: "שמתרחבים.",
  lead: "השוו מקומות Team, ערכת מותג משותפת ואנליטיקס. התחילו עם תוכנית שמתאימה לצוות שלכם - שדרגו ככל שתצמחו.",
} as const;
