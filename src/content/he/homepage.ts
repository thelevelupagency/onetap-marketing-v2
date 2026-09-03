import { CREATE_BASICS_URL } from "@/lib/constants";
import { LOGO_ICON } from "@/lib/logos";

export const audienceMarqueeItems = [
  "עורכי דין",
  "מעצבים",
  "זמרים",
  "סוכני נדל״ן",
  "יועצים",
  "צלמים",
  "מאמנים",
  "מפתחים",
  "אנשי שיווק",
  "אמנים",
  "רואי חשבון",
  "יוצרים",
  "נציגי מכירות",
  "סוכני ביטוח",
  "מפיקי אירועים",
  "יזמים",
] as const;

export const heroCopy = {
  subheadline:
    "צרו כרטיס ביקור דיגיטלי מרשים, ללא צורך באפליקציה, שמאפשר לאנשים ליצור איתכם קשר, לשמור את הפרטים שלכם, להכיר את העבודות שלכם ולהפוך ללידים אמיתיים - באמצעות קישור אחד פשוט או קוד QR.",
  microcopy: "ללא אפליקציה · מתחילים בחינם · משתפים בתוך דקות",
  trustLine:
    "נבנה עבור עצמאים, עסקים קטנים, יוצרים, צוותי מכירות, סוכנויות ואנשי מקצוע ברחבי העולם.",
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
  title: "לא מתפשרים",
  accent: "יותר.",
  lead: "נפרדים מכרטיסים לא מעודכנים, מפולואפים שמתפספסים ומניחושים. OneTap שומר על הפרופיל שלכם עדכני, על צינור הלידים פעיל ועל התוצאות ברורות.",
  points: [
    {
      icon: "filePenLine" as const,
      title: "בלי פרטים לא מעודכנים",
      description:
        "עדכנו בכל רגע את מספר הטלפון, הקישורים, השירותים או ההצעות שלכם - והכרטיס מתעדכן מיד.",
      accent: "from-brand-navy/10 to-brand-turquoise/10",
    },
    {
      icon: "inbox" as const,
      title: "בלי לפספס פולואפים",
      description:
        "אפשרו למבקרים לשמור אתכם באנשי הקשר, לשלוח הודעה, לקבוע פגישה או למלא טופס ליד - בלחיצה אחת.",
      accent: "from-brand-turquoise-light to-brand-turquoise/20",
    },
    {
      icon: "lineChart" as const,
      title: "בלי לנחש",
      description: "עקבו אחר צפיות, לחיצות, שמירות ולידים ישירות מלוח הבקרה.",
      accent: "from-brand-midnight/10 to-brand-navy/10",
    },
  ],
} as const;

export const howItWorksCopy = {
  title: "כך זה",
  accent: "עובד",
  description: "יוצרים פעם אחת. משתפים בכל מקום. צומחים מהר יותר.",
  steps: [
    {
      step: "01",
      title: "יוצרים",
      description:
        "בנו את הכרטיס שלכם בתוך 60 שניות. הוסיפו תמונה, לוגו, תיאור, כפתורי יצירת קשר, קישורים לרשתות חברתיות, שירותים, גלריה, סרטונים, המלצות וטופס לידים - ללא צורך בידע בתכנות או בעיצוב.",
      image:
        "https://res.cloudinary.com/dudwjf2pu/image/upload/v1779391976/onetap/static/marketing/202_jd25sb.jpg",
      imageAlt: "איש מקצוע בונה כרטיס ביקור דיגיטלי על מחשב נייד",
    },
    {
      step: "02",
      title: "משתפים",
      description:
        "שתפו באמצעות קישור אחד או קוד QR. השתמשו בכרטיס OneTap בפגישות, באירועים, ב-WhatsApp, בביו באינסטגרם, ב-LinkedIn, בחתימת המייל, בכרטיסי NFC, בחומרים מודפסים - ובכל מקום שבו הקהל שלכם נמצא.",
      image:
        "https://res.cloudinary.com/dudwjf2pu/image/upload/v1779391975/onetap/static/marketing/8718_xmgnm1.jpg",
      imageAlt: "אנשים משתפים וצופים בתוכן בטלפונים שלהם",
    },
    {
      step: "03",
      title: "מתחברים",
      description:
        "הפכו כל אינטראקציה להזדמנות אמיתית. מהכרטיס ניתן להתקשר, לשלוח מייל או הודעה, לנווט, לעקוב, לקבוע פגישה, לשמור אתכם באנשי הקשר או להשאיר פרטים.",
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
  accent: "מיני-אתר מקצועי.",
  lead: "פרופיל שמותאם קודם כול למובייל, נועד להרשים מבקרים ולהפוך תשומת לב לפעולה.",
  features: [
    {
      icon: "zap" as const,
      label: "פעולות יצירת קשר בלחיצה אחת",
      description: "התקשרות, מייל, WhatsApp, SMS, ניווט או מעבר לאתר - בלחיצה אחת.",
    },
    {
      icon: "contactRound" as const,
      label: "שמירה לאנשי קשר",
      description: "אפשרו למבקרים לשמור את הפרטים שלכם ישירות בטלפון.",
    },
    {
      icon: "userPlus" as const,
      label: "טופס איסוף לידים",
      description: "אספו שמות, כתובות מייל, מספרי טלפון והודעות מלקוחות פוטנציאליים.",
    },
    {
      icon: "barChart3" as const,
      label: "נתונים ותובנות",
      description: "עקבו מלוח הבקרה אחר צפיות, לחיצות, שמירות ושליחת טפסים.",
    },
    {
      icon: "image" as const,
      label: "מדיה עשירה ותיק עבודות",
      description: "הציגו תמונות, סרטונים, שירותים, המלצות, תפריטים או מקרי בוחן.",
    },
    {
      icon: "refreshCw" as const,
      label: "תמיד מעודכן",
      description: "מעדכנים פעם אחת - וכל מבקר מעתה רואה את הגרסה העדכנית ביותר.",
    },
    {
      icon: "smartphone" as const,
      label: "מוכן ל-NFC ולקוד QR",
      description: "שתפו מיד בהצמדה או בסריקה - ללא צורך באפליקציה אצל אף אחד מהצדדים.",
    },
    {
      icon: "globe" as const,
      label: "גלובלי ורב-לשוני",
      description: "נבנה עבור אנשי מקצוע במגוון שווקים, שפות ומיקומים.",
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
  title: "נבנה לכל",
  accent: "אנשי המקצוע",
  lead: "בין אם אתם מוכרים, יוצרים, מייעצים, מלמדים, נותנים שירות או מנהלים צוות - OneTap עוזר לכם להציג את עצמכם באופן מקצועי ולהקל על אנשים לעשות את הצעד הבא.",
  cards: [
    {
      icon: "briefcase" as const,
      title: "עצמאים ויועצים",
      description:
        "שירותים, תיק עבודות, המלצות ואפשרויות יצירת קשר - בפרופיל מקצועי אחד.",
      ctaLabel: "בנו את הפרופיל המקצועי שלכם",
      href: "/solutions/freelancers",
      accent: "from-brand-navy/10 to-brand-turquoise/10",
      image: howItWorksCopy.steps[0].image,
      imageAlt: "עצמאי עובד על כרטיס ביקור דיגיטלי",
    },
    {
      icon: "home" as const,
      title: "סוכני נדל״ן",
      description:
        "נכסים, סיורים, טופסי התעניינות, WhatsApp וקישורים לקביעת פגישה - בכרטיס אחד.",
      ctaLabel: "צרו כרטיס נדל״ן",
      href: CREATE_BASICS_URL,
      accent: "from-brand-turquoise/15 to-brand-navy/10",
      image:
        "https://res.cloudinary.com/dudwjf2pu/image/upload/v1757706607/NFC/screenshots/home-interior_full_dvc_oyw2mr.png",
      imageAlt: "כרטיס דיגיטלי של סוכן נדל״ן על טלפון",
    },
    {
      icon: "sparkles" as const,
      title: "יוצרים ומשפיענים",
      description:
        "רשתות חברתיות, Media Kit, תיק עבודות, שיתופי פעולה וקישורי הזמנה - במקום אחד.",
      ctaLabel: "השיקו את הכרטיס שלכם",
      href: "/solutions/freelancers#creators",
      accent: "from-brand-turquoise-light to-brand-turquoise/20",
      image:
        "https://res.cloudinary.com/dudwjf2pu/image/upload/v1757706588/NFC/screenshots/fitness_full_dvc_gxcheq.png",
      imageAlt: "כרטיס פרופיל יוצר על טלפון",
    },
    {
      icon: "building2" as const,
      title: "עסקים קטנים",
      description:
        "שעות פעילות, מיקום, תפריט, שירותים, ביקורות והצעות - במיני-אתר מותאם למובייל.",
      ctaLabel: "בנו את הכרטיס העסקי שלכם",
      href: CREATE_BASICS_URL,
      accent: "from-brand-midnight/10 to-brand-navy/10",
      image:
        "https://res.cloudinary.com/dudwjf2pu/image/upload/v1757706625/NFC/screenshots/barber_full_dvc_e9fmqv.png",
      imageAlt: "כרטיס דיגיטלי של עסק קטן על טלפון",
    },
    {
      icon: "users" as const,
      title: "צוותים וסוכנויות",
      description:
        "כרטיסים במיתוג אחיד לכל חברי הצוות, איסוף לידים ותובנות על יצירת קשרים.",
      ctaLabel: "גלו את פתרון הכרטיסים לצוותים",
      href: "/solutions/agencies",
      accent: "from-brand-navy/15 to-brand-midnight/10",
      image: howItWorksCopy.steps[2].image,
      imageAlt: "צוות משתף פעולה עם כרטיסי ביקור דיגיטליים",
    },
    {
      icon: "scale" as const,
      title: "עורכי דין, רואי חשבון ויועצים",
      description:
        "הסמכות, שירותים וערוצי קשר בפרופיל שבונה אמון.",
      ctaLabel: "צרו פרופיל שמעורר אמון",
      href: CREATE_BASICS_URL,
      accent: "from-brand-midnight/5 to-brand-turquoise/15",
      image: howItWorksCopy.steps[1].image,
      imageAlt: "איש מקצוע משתף פרטי קשר מכרטיס דיגיטלי",
    },
  ],
} as const;

export type DashboardIconKey = "edit3" | "barChart3" | "inbox" | "palette" | "users";

export const dashboardCopy = {
  title: "מרכז השליטה",
  accent: "המקצועי שלכם.",
  subheadline:
    "נהלו את הכרטיס, עדכנו תוכן, עקבו אחר מעורבות ואספו לידים - הכול מלוח בקרה עוצמתי אחד.",
  imageUrl:
    "https://res.cloudinary.com/dudwjf2pu/image/upload/v1779393898/onetap/static/marketing/%D7%A6%D7%99%D7%9C%D7%95%D7%9D_%D7%9E%D7%A1%D7%9A_2026-05-13_%D7%91-20.56.31_gtx3y5.png",
  imageAlt: "לוח בקרה של OneTap עם סקירת כרטיס, אנליטיקה ותצוגת טלפון חיה",
  features: [
    {
      icon: "edit3" as const,
      title: "עריכה בזמן אמת",
      description: "עדכנו בכל רגע את הפרופיל, הקישורים, השירותים או המיתוג.",
    },
    {
      icon: "barChart3" as const,
      title: "אנליטיקה חכמה",
      description:
        "הבינו על מה אנשים לוחצים, מהיכן מגיע העניין ואילו פעולות מייצרות לידים.",
    },
    {
      icon: "inbox" as const,
      title: "ניהול לידים",
      description: "קבלו פניות ישירות מהכרטיס וחזרו אליהן מהר יותר.",
    },
    {
      icon: "palette" as const,
      title: "שליטה במותג",
      description: "שמרו על צבעים, לוגו, סגנון ומסר אחידים בכל כרטיס.",
    },
    {
      icon: "users" as const,
      title: "מוכן לצוותים",
      description:
        "צרו כרטיסים למספר אנשים, שמרו על מיתוג אחיד ונהלו משתמשים ככל שהעסק גדל.",
    },
  ],
} as const;

export const socialProofCopy = {
  title: "מקצוענים שמשתפים OneTap",
  accent: "ונשארים בזיכרון.",
  lead: "עצמאים, יוצרים וצוותים משתמשים ב-OneTap כדי לשתף כרטיס חי ועדכני אחד.",
  audiences: audienceMarqueeItems,
  testimonials: [
    {
      name: "Elena Torres",
      role: "אסטרטגית מותג עצמאית",
      headline: "הכול היה מוכן בתוך פחות מדקה",
      content:
        "לקוחות שומרים את פרטי הקשר שלי עוד לפני שאני מסיימת את הצגת המעלית. זה שינה לחלוטין את תהליך הקליטה של לקוחות חדשים.",
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
    {
      name: "James Okonkwo",
      role: "מייסד, Nova Labs",
      headline: "מיתוג משותף לכל הצוות",
      content:
        "עובדים חדשים מקבלים כרטיס במיתוג שלנו מתוך ערכת המותג המשותפת. ההקמה מסתכמת בקישור ולחיצה, במקום עוד בקשת עיצוב.",
      avatar: LOGO_ICON,
      rating: 5,
    },
    {
      name: "Priya Shah",
      role: "יועצת שיווק",
      headline: "החלפתי שלושה כלי קישורים בבת אחת",
      content:
        "לידים חדשים מגיעים ישירות לתיבה שלי כבר באותו יום שבו אני פוגשת אנשים בכנסי נטוורקינג מקצועיים.",
      avatar: LOGO_ICON,
      rating: 5,
    },
    {
      name: "Sarah Kim",
      role: "סמנכ״לית מכירות, Brightpath",
      headline: "סוף סוף רואים על מה לוחצים",
      content:
        "התובנות מראות אילו אירועים מביאים צפיות ומילוי טפסים. אנשי המכירות שלנו מבצעים פולואפ לפי מה שאנשים באמת השתמשו בו.",
      avatar: LOGO_ICON,
      rating: 5,
    },
    {
      name: "David Ortiz",
      role: "שותף מנהל, Park & Co",
      headline: "מיתוג אחיד בלי לרדוף אחרי קבצים",
      content:
        "המחלקה המשפטית אישרה את הערכה המשותפת פעם אחת. כל כרטיס של חבר צוות חדש מתחיל ממנה, במקום מעיצוב חד-פעמי.",
      avatar: LOGO_ICON,
      rating: 5,
    },
    {
      name: "Sophia Martinez",
      role: "מעצבת פנים",
      headline: "תיק עבודות מרשים במובייל",
      content:
        "שיתוף תיק העבודות האיכותי שלי באמצעות כרטיס NFC מרשים את הלקוחות בכל פעם. קביעת פגישות ייעוץ מעולם לא הייתה פשוטה יותר.",
      avatar: LOGO_ICON,
      rating: 5,
    },
    {
      name: "Liam O'Connor",
      role: "מאמן כושר ואורח חיים",
      headline: "לקוחות קובעים מיד",
      content:
        "לקוחות מצמידים את הטלפון לכרטיס, שומרים את פרטי הקשר שלי, צופים במערכת השבועית וקובעים אימון ישירות.",
      avatar: LOGO_ICON,
      rating: 5,
    },
    {
      name: "Amara Patel",
      role: "צלמת פורטרטים וחתונות",
      headline: "יצירת לידים בלי מאמץ",
      content:
        "טופס ההתעניינות שלי ב-OneTap אוסף מיד את העדפות חבילת הצילום, בדיוק כשאני פוגשת זוגות בתערוכות חתונה.",
      avatar: LOGO_ICON,
      rating: 5,
    },
    {
      name: "Alexandre Dubois",
      role: "ספר ובעל סטודיו",
      headline: "אף לקוח חוזר לא הולך לאיבוד",
      content:
        "אני מציע ללקוחות מזדמנים להצמיד את הטלפון לכרטיס ה-NFC של OneTap. הם שומרים את המספר וקובעים את התספורת הבאה עוד לפני היציאה.",
      avatar: LOGO_ICON,
      rating: 5,
    },
  ],
} as const;

export const homepagePricingHeader = {
  title: "מחירים פשוטים.",
  accent: "תמורה מצוינת.",
  lead: "מתחילים בחינם ומשדרגים כשצומחים. בלי עמלות נסתרות ובלי הפתעות.",
} as const;
