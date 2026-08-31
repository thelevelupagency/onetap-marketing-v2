import { NextRequest, NextResponse } from "next/server";
import {
  DEFAULT_LOCALE,
  isLocale,
  type Locale,
} from "@/lib/i18n/config";
import { LOCALE_HEADER } from "@/lib/i18n/locale-header";

const PUBLIC_FILE = /\.[^/]+$/;

function withLocaleHeader(response: NextResponse, locale: Locale): NextResponse {
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
    return withLocaleHeader(NextResponse.next(), first);
  }

  // Unprefixed paths → rewrite to /en/... (URL stays unprefixed)
  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? `/${DEFAULT_LOCALE}` : `/${DEFAULT_LOCALE}${pathname}`;
  return withLocaleHeader(NextResponse.rewrite(url), DEFAULT_LOCALE);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
