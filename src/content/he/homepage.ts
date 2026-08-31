import { CREATE_BASICS_URL } from "@/lib/constants";
import { LOGO_ICON } from "@/lib/logos";

export const audienceMarqueeItems = [
  "עורך דין",
  "מעצב/ת",
  "זמר/ת",
  "סוכן נדל\"ן",
  "יועץ/ת",
  "צלם/ת",
  "מאמן/ת",
  "מפתח/ת",
  "משווק/ת",
  "אמן/ית",
  "רואה חשבון",
  "יוצר/ת תוכן",
  "איש/ת מכירות",
  "סוכן ביטוח",
  "מפיק/ת אירועים",
  "יזם/ית",
] as const;

export const heroCopy = {
  subheadline:
    "צרו כרטיס ביקור דיגיטלי מקצועי ויפה - בלי אפליקציה. אנשים יוכלו ליצור איתכם קשר, לשמור את הפרטים שלכם, לצפות בעבודות שלכם ולהפוך ללידים אמיתיים - מלינק אחד או קוד QR.",
  microcopy: "בלי אפליקציה · חינם להתחלה · משתפים תוך דקות",
  trustLine:
    "נבנה עבור פרילנסרים, עסקים קטנים, יוצרי תוכן, צוותי מכירות, סוכנויות ואנשי מקצוע ברחבי העולם.",
} as const;

export type PainPointIconKey =
  | "filePenLine"
  | "inbox"
  | "lineChart"
  | "contactRound"
  | "link2"
  | "palette"
  | "users";

export const painPointsCopy = {
  title: "נגמרו",
  accent: "הפשרות.",
  lead: "כרטיסים ישנים, פולואפים שהוחמצו וניחושים - זה נגמר. OneTap שומר על הפרופיל שלכם חי, על הפייפליין מלא ועל התוצאות גלויות.",
  points: [
    {
      icon: "filePenLine" as const,
      title: "נגמרו הפרטים המיושנים",
      description:
        "עדכנו טלפון, לינקים, שירותים או מבצעים בכל זמן - הכרטיס מתעדכן מיידית.",
      accent: "from-brand-navy/10 to-brand-turquoise/10",
    },
    {
      icon: "inbox" as const,
      title: "נגמרו הפולואפים שהוחמצו",
      description:
        "מבקרים יכולים לשמור את איש הקשר שלכם, לשלוח הודעה, לקבוע פגישה או למלא טופס ליד בנגיעה אחת.",
      accent: "from-brand-turquoise-light to-brand-turquoise/20",
    },
    {
      icon: "lineChart" as const,
      title: "נגמרו הניחושים",
      description: "עקבו אחרי צפיות, קליקים, שמירות ולידים מלוח הבקרה שלכם.",
      accent: "from-brand-midnight/10 to-brand-navy/10",
    },
  ],
} as const;

export const howItWorksCopy = {
  title: "איך זה",
  accent: "עובד",
  description: "יוצרים פעם אחת. משתפים בכל מקום. צומחים מהר יותר.",
  steps: [
    {
      step: "01",
      title: "יוצרים",
      description:
        "בנו את הכרטיס שלכם ב-60 שניות. הוסיפו תמונה, לוגו, ביו, כפתורי יצירת קשר, קישורים לרשתות חברתיות, שירותים, גלריה, סרטונים, המלצות וטופס לידים - בלי קוד ובלי עיצוב.",
      image:
        "https://res.cloudinary.com/dudwjf2pu/image/upload/v1779391976/onetap/static/marketing/202_jd25sb.jpg",
      imageAlt: "איש מקצוע בונה כרטיס ביקור דיגיטלי על מחשב נייד",
    },
    {
      step: "02",
      title: "משתפים",
      description:
        "שתפו עם לינק אחד או קוד QR. השתמשו בכרטיס OneTap שלכם בפגישות, אירועים, וואטסאפ, ביו באינסטגרם, לינקדאין, חתימת מייל, כרטיסי NFC, חומרים מודפסים או בכל מקום שהקהל שלכם נמצא.",
      image:
        "https://res.cloudinary.com/dudwjf2pu/image/upload/v1779391975/onetap/static/marketing/8718_xmgnm1.jpg",
      imageAlt: "אנשים משתפים וצופים בתוכן בטלפונים שלהם",
    },
    {
      step: "03",
      title: "מתחברים",
      description:
        "הפכו כל אינטראקציה להזדמנות אמיתית. אנשים יכולים להתקשר, לשלוח מייל, הודעה, לנווט, לעקוב, לקבוע, לשמור את איש הקשר שלכם או לשלוח את הפרטים שלהם ישירות מהכרטיס.",
      image:
        "https://res.cloudinary.com/dudwjf2pu/image/upload/v1779391975/onetap/static/marketing/13239_k1he5m.jpg",
      imageAlt: "קבוצה חוגגת חיבור מוצלח",
    },
  ],
} as const;

export type CardUxIconKey =
  | "zap"
  | "contactRound"
  | "userPlus"
  | "barChart3"
  | "image"
  | "refreshCw"
  | "smartphone"
  | "globe";

export const cardUxCopy = {
  title: "יותר מכרטיס.",
  accent: "מיקרוסייט מקצועי.",
  lead: "פרופיל מותאם למובייל שנבנה להרשים מבקרים ולהפוך תשומת לב לפעולה.",
  features: [
    {
      icon: "zap" as const,
      label: "פעולות קשר בנגיעה אחת",
      description: "התקשרו, שלחו מייל, וואטסאפ, SMS, נווטו או בקרו באתר שלכם בנגיעה אחת.",
    },
    {
      icon: "contactRound" as const,
      label: "שמירה לאנשי קשר",
      description: "מבקרים שומרים את הפרטים שלכם ישירות לטלפון.",
    },
    {
      icon: "userPlus" as const,
      label: "טופס לכידת לידים",
      description: "אספו שמות, מיילים, מספרי טלפון והודעות מלקוחות פוטנציאליים.",
    },
    {
      icon: "barChart3" as const,
      label: "אנליטיקס ותובנות",
      description: "עקבו אחרי צפיות, קליקים, שמירות ושליחות טפסים מלוח הבקרה שלכם.",
    },
    {
      icon: "image" as const,
      label: "מדיה עשירה ופורטפוליו",
      description: "הציגו תמונות, סרטונים, שירותים, המלצות, תפריטים או מקרי בוחן.",
    },
    {
      icon: "refreshCw" as const,
      label: "תמיד מעודכן",
      description: "עורכים פעם אחת - כל מבקר עתידי רואה את הגרסה האחרונה.",
    },
    {
      icon: "smartphone" as const,
      label: "מוכן ל-NFC ו-QR",
      description: "שתפו מיידית בנגיעה או סריקה - בלי אפליקציה בשום צד.",
    },
    {
      icon: "globe" as const,
      label: "גלובלי ורב-לשוני",
      description: "נבנה עבור אנשי מקצוע בכל שוק, שפה ומיקום.",
    },
  ],
} as const;

export type SolutionIconKey =
  | "briefcase"
  | "home"
  | "sparkles"
  | "building2"
  | "users"
  | "scale";

export const solutionsCopy = {
  title: "נבנה עבור",
  accent: "כל איש מקצוע",
  lead: "בין אם אתם מוכרים, יוצרים, מייעצים, מלמדים, נותנים שירות או מנהלים צוות - OneTap עוזר לכם להציג את עצמכם בצורה מקצועית ולהקל על אנשים לפעול.",
  cards: [
    {
      icon: "briefcase" as const,
      title: "פרילנסרים ויועצים",
      description:
        "שירותים, פורטפוליו, המלצות ואפשרויות יצירת קשר בפרופיל אחד מלוטש.",
      ctaLabel: "בנו את הפרופיל האישי שלכם",
      href: "/solutions/freelancers",
      accent: "from-brand-navy/10 to-brand-turquoise/10",
      image: howItWorksCopy.steps[0].image,
      imageAlt: "פרילנסר עובד על כרטיס ביקור דיגיטלי",
    },
    {
      icon: "home" as const,
      title: "סוכנים",
      description:
        "נכסים, סיורים, טפסי הרשמה, וואטסאפ וקישורי תיאום בכרטיס אחד.",
      ctaLabel: "צרו את כרטיס הנדל\"ן שלכם",
      href: CREATE_BASICS_URL,
      accent: "from-brand-turquoise/15 to-brand-navy/10",
      image:
        "https://res.cloudinary.com/dudwjf2pu/image/upload/v1757706607/NFC/screenshots/home-interior_full_dvc_oyw2mr.png",
      imageAlt: "כרטיס דיגיטלי של סוכן נדל\"ן על טלפון",
    },
    {
      icon: "sparkles" as const,
      title: "יוצרי תוכן ומשפיענים",
      description:
        "רשתות חברתיות, מדיה קיט, פורטפוליו, שיתופי פעולה וקישורי תיאום במקום אחד.",
      ctaLabel: "השיקו את כרטיס היוצר שלכם",
      href: "/solutions/freelancers#creators",
      accent: "from-brand-turquoise-light to-brand-turquoise/20",
      image:
        "https://res.cloudinary.com/dudwjf2pu/image/upload/v1757706588/NFC/screenshots/fitness_full_dvc_gxcheq.png",
      imageAlt: "כרטיס פרופיל יוצר תוכן על טלפון",
    },
    {
      icon: "building2" as const,
      title: "עסקים קטנים",
      description:
        "שעות פעילות, מיקום, תפריט, שירותים, ביקורות ומבצעים במיני-סייט למובייל.",
      ctaLabel: "בנו את הכרטיס העסקי שלכם",
      href: CREATE_BASICS_URL,
      accent: "from-brand-midnight/10 to-brand-navy/10",
      image:
        "https://res.cloudinary.com/dudwjf2pu/image/upload/v1757706625/NFC/screenshots/barber_full_dvc_e9fmqv.png",
      imageAlt: "כרטיס דיגיטלי של עסק קטן על טלפון",
    },
    {
      icon: "users" as const,
      title: "צוותות וסוכנויות",
      description:
        "כרטיסים ממותגים לכל חבר צוות, לכידת לידים ותובנות נטוורקינג.",
      ctaLabel: "גלו כרטיסי צוות",
      href: "/solutions/agencies",
      accent: "from-brand-navy/15 to-brand-midnight/10",
      image: howItWorksCopy.steps[2].image,
      imageAlt: "צוות משתף פעולה עם כרטיסי ביקור דיגיטליים",
    },
    {
      icon: "scale" as const,
      title: "עורכי דין ואנשי פיננסים",
      description:
        "תעודות, שירותים וערוצי יצירת קשר בפרופיל שבונה אמון.",
      ctaLabel: "צרו פרופיל מקצועי מהימן",
      href: CREATE_BASICS_URL,
      accent: "from-brand-midnight/5 to-brand-turquoise/15",
      image: howItWorksCopy.steps[1].image,
      imageAlt: "איש מקצוע משתף פרטי קשר מכרטיס דיגיטלי",
    },
  ],
} as const;

export type DashboardIconKey = "edit3" | "barChart3" | "inbox" | "palette" | "users";

export const dashboardCopy = {
  title: "מרכז הפיקוד",
  accent: "המקצועי שלכם.",
  subheadline:
    "נהלו את הכרטיס שלכם, עדכנו תוכן, עקבו אחרי מעורבות ואספו לידים מלוח בקרה אחד עוצמתי.",
  imageUrl:
    "https://res.cloudinary.com/dudwjf2pu/image/upload/v1779393898/onetap/static/marketing/%D7%A6%D7%99%D7%9C%D7%95%D7%9D_%D7%9E%D7%A1%D7%9A_2026-05-13_%D7%91-20.56.31_gtx3y5.png",
  imageAlt: "לוח בקרה של OneTap עם סקירת כרטיס, אנליטיקס ותצוגת טלפון חיה",
  features: [
    {
      icon: "edit3" as const,
      title: "עריכה בזמן אמת",
      description: "עדכנו פרופיל, קישורים, שירותים או מיתוג בכל עת.",
    },
    {
      icon: "barChart3" as const,
      title: "אנליטיקס חכם",
      description:
        "הבינו מה אנשים לוחצים, מאיפה מגיע העניין ואילו פעולות מביאות לידים.",
    },
    {
      icon: "inbox" as const,
      title: "ניהול לידים",
      description: "קבלו פניות ישירות מהכרטיס שלכם ועקבו אחריהן מהר יותר.",
    },
    {
      icon: "palette" as const,
      title: "שליטה במותג",
      description: "שמרו על צבעים, לוגו, סגנון ומסר עקביים בכל כרטיס.",
    },
    {
      icon: "users" as const,
      title: "מוכן לצוות",
      description:
        "צרו כרטיסים למספר אנשים, תקננו מיתוג ונהלו משתמשים ככל שהעסק גדל.",
    },
  ],
} as const;

export const socialProofCopy = {
  title: "אנשי מקצוע שמשתפים OneTap",
  accent: "ונזכרים בהם.",
  lead: "פרילנסרים, יוצרי תוכן וצוותים משתמשים ב-OneTap כדי לשתף כרטיס חי אחד.",
  audiences: audienceMarqueeItems,
  testimonials: [
    {
      name: "Elena Torres",
      role: "אסטרטגית מותג עצמאית",
      headline: "הקמתי תוך פחות מדקה",
      content:
        "לקוחות שומרים את איש הקשר שלי עוד לפני שאני מסיימת את ה-pitch. זה שינה לחלוטין את תהליך קליטת הלקוחות שלי.",
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
    {
      name: "James Okonkwo",
      role: "מייסד, Nova Labs",
      headline: "מיתוג צוותי אחיד",
      content:
        "עובדים חדשים מקבלים כרטיס ממותג מהערכה המשותפת. ההקמה היא לינק ונגיעה במקום בקשת עיצוב נוספת.",
      avatar: LOGO_ICON,
      rating: 5,
    },
    {
      name: "Priya Shah",
      role: "יועצת שיווק",
      headline: "החליפה 3 כלי לינקים בבת אחת",
      content:
        "לידים חדשים מגיעים ישירות לתיבה שלי באותו יום שאני פוגשת מישהו בכנס נטוורקינג.",
      avatar: LOGO_ICON,
      rating: 5,
    },
    {
      name: "Sarah Kim",
      role: "סמנכ\"לית מכירות, Brightpath",
      headline: "סוף סוף רואים מה נלחץ",
      content:
        "התובנות מראות אילו אירועים מביאים צפיות ושליחות טפסים. הנציגים שלנו עוקבים אחרי מה שאנשים באמת השתמשו.",
      avatar: LOGO_ICON,
      rating: 5,
    },
    {
      name: "David Ortiz",
      role: "שותף מנהל, Park & Co",
      headline: "ממותגים בלי לרדוף אחרי קבצים",
      content:
        "המחלקה המשפטית אישרה את הערכה פעם אחת. כל כרטיס של חבר צוות חדש מתחיל מהערכה הזו במקום עיצוב חד-פעמי.",
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
  ],
} as const;

export const homepagePricingHeader = {
  title: "תמחור פשוט.",
  accent: "תמורה מירבית.",
  lead: "התחילו בחינם ושדרגו כשתצמחו. בלי עלויות נסתרות, בלי הפתעות.",
} as const;
