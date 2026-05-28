/** Prevents infinite reload when handling `back_forward` navigation. */
export const BACK_NAV_RELOAD_GUARD_KEY = "onetap-back-nav-reload-done";

/**
 * Inline script in root layout — runs before React hydrates.
 * Reloads once on Back (`back_forward`) or Safari bfcache (`pageshow` + `persisted`).
 * Must stay in sync with {@link BACK_NAV_RELOAD_GUARD_KEY}.
 */
export const BACK_NAV_RELOAD_INLINE_SCRIPT = `(function(){var g="${BACK_NAV_RELOAD_GUARD_KEY}";function r(){location.reload()}try{if(sessionStorage.getItem(g)==="1"){sessionStorage.removeItem(g);return}var n=performance.getEntriesByType("navigation")[0];if(n&&n.type==="back_forward"){sessionStorage.setItem(g,"1");r();return}}catch(e){}window.addEventListener("pageshow",function(e){if(e.persisted)r()})})();`;
