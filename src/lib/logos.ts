/** OneTap logo assets in /public/logos */
export const LOGO_ICON = "/logos/onetap_logo.png";
export const LOGO_WORDMARK_DARK = "/logos/onetap_logo_and_text_dark.png";
export const LOGO_WORDMARK_BRIGHT = "/logos/onetap_logo_and_text_bright.png";

export type LogoTheme = "bright" | "dark";

export function logoWordmarkSrc(theme: LogoTheme): string {
  return theme === "bright" ? LOGO_WORDMARK_BRIGHT : LOGO_WORDMARK_DARK;
}
