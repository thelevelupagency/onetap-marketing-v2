import { BACK_NAV_RELOAD_INLINE_SCRIPT } from "@/lib/motion/back-navigation-reload";

/** Reload on Back / bfcache before React hydrates (same effect as a manual refresh). */
export function BackNavigationReloadScript() {
  return (
    <script
      id="back-nav-reload"
      dangerouslySetInnerHTML={{ __html: BACK_NAV_RELOAD_INLINE_SCRIPT }}
    />
  );
}
