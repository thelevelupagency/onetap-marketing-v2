import { NextRequest, NextResponse } from "next/server";
import {
  DEFAULT_LOCALE,
  isLocale,
  type Locale,
} from "@/lib/i18n/config";
import { LOCALE_HEADER } from "@/lib/i18n/locale-header";
import { PROMO_SLUG_HEADER, PROMO_SLUG_QUERY_KEY, sanitizePromoSlug } from "@/lib/constants";

const PUBLIC_FILE = /\.[^/]+$/;

function applyLocaleAndPromoHeaders(
  request: NextRequest,
  locale: Locale,
): { requestHeaders: Headers; promo: string | null } {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(LOCALE_HEADER, locale);
  // Drop any inbound client spoof of the promo header, then set from the query.
  requestHeaders.delete(PROMO_SLUG_HEADER);
  const promo = sanitizePromoSlug(
    request.nextUrl.searchParams.get(PROMO_SLUG_QUERY_KEY),
  );
  if (promo) {
    requestHeaders.set(PROMO_SLUG_HEADER, promo);
  }
  return { requestHeaders, promo };
}

function withResponseHeaders(response: NextResponse, locale: Locale): NextResponse {
  response.headers.set(LOCALE_HEADER, locale);
  return response;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/sitemap.xml" ||
    pathname === "/robots.txt" ||
    pathname === "/llms.txt" ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];

  // Canonical English: redirect /en and /en/... → unprefixed
  if (first === DEFAULT_LOCALE) {
    const rest = segments.slice(1).join("/");
    const url = request.nextUrl.clone();
    url.pathname = rest ? `/${rest}` : "/";
    return NextResponse.redirect(url, 301);
  }

  if (first && isLocale(first)) {
    const { requestHeaders } = applyLocaleAndPromoHeaders(request, first);
    return withResponseHeaders(
      NextResponse.next({ request: { headers: requestHeaders } }),
      first,
    );
  }

  // Unprefixed paths → rewrite to /en/... (URL stays unprefixed)
  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? `/${DEFAULT_LOCALE}` : `/${DEFAULT_LOCALE}${pathname}`;
  const { requestHeaders } = applyLocaleAndPromoHeaders(request, DEFAULT_LOCALE);
  return withResponseHeaders(
    NextResponse.rewrite(url, { request: { headers: requestHeaders } }),
    DEFAULT_LOCALE,
  );
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
