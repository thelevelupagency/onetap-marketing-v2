import { NextRequest, NextResponse } from "next/server";
import {
  DEFAULT_LOCALE,
  isLocale,
  type Locale,
} from "@/lib/i18n/config";
import { LOCALE_HEADER } from "@/lib/i18n/locale-header";
import {
  PATHNAME_HEADER,
  PROMO_REJECT_COOKIE,
  PROMO_REJECTED_HEADER,
  PROMO_SLUG_HEADER,
} from "@/lib/constants";
import { planPromoNavigation, readPromoAlias } from "@/lib/promotions/promo-navigation";
import { readPublicPromo, slugAfterPublicPromoRead } from "@/lib/promotions/public-promo";

const PUBLIC_FILE = /\.[^/]+$/;

/**
 * Confirm `?promo=` / `?coupon=` against the public promo route.
 * A timeout, network error, 408, 429, or 5xx keeps the sanitized slug and
 * does not count as unknown/expired. Only a completed read with no current
 * matching campaign returns null, which strips the param and sets the reject cookie.
 */
async function validatedSlugFor(request: NextRequest): Promise<string | null> {
  const alias = readPromoAlias(request.nextUrl.searchParams);
  if (alias.kind === "none" || !alias.slug) return null;
  const read = await readPublicPromo(alias.slug, { revalidate: false });
  return slugAfterPublicPromoRead(alias.slug, read);
}

function applyRequestHeaders(
  request: NextRequest,
  locale: Locale,
  requestedSlug: string | null,
  rejected: boolean,
): Headers {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(LOCALE_HEADER, locale);
  requestHeaders.set(PATHNAME_HEADER, request.nextUrl.pathname);
  requestHeaders.delete(PROMO_SLUG_HEADER);
  requestHeaders.delete(PROMO_REJECTED_HEADER);
  if (rejected) {
    requestHeaders.set(PROMO_REJECTED_HEADER, "1");
  } else if (requestedSlug) {
    requestHeaders.set(PROMO_SLUG_HEADER, requestedSlug);
  }
  return requestHeaders;
}

function stampRejectCookie(response: NextResponse, plan: { setRejectCookie: boolean; clearRejectCookie: boolean }, secure: boolean) {
  if (plan.setRejectCookie) {
    response.cookies.set(PROMO_REJECT_COOKIE, "1", {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 120,
      secure,
    });
  } else if (plan.clearRejectCookie) {
    response.cookies.set(PROMO_REJECT_COOKIE, "", {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 0,
      secure,
    });
  }
}

export async function middleware(request: NextRequest) {
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

  const validatedSlug = await validatedSlugFor(request);
  const plan = planPromoNavigation({
    search: request.nextUrl.searchParams,
    validatedSlug,
    rejectCookie: request.cookies.get(PROMO_REJECT_COOKIE)?.value === "1",
  });

  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];
  const localeRedirect = first === DEFAULT_LOCALE;
  const secure = request.nextUrl.protocol === "https:";

  if (localeRedirect || plan.redirectTo) {
    const url = request.nextUrl.clone();
    if (localeRedirect) {
      const rest = segments.slice(1).join("/");
      url.pathname = rest ? `/${rest}` : "/";
    }
    if (plan.redirectTo) {
      const search = plan.redirectTo.toString();
      url.search = search ? `?${search}` : "";
    }
    const response = NextResponse.redirect(url, plan.redirectTo ? 307 : 301);
    stampRejectCookie(response, plan, secure);
    return response;
  }

  if (first && isLocale(first)) {
    const requestHeaders = applyRequestHeaders(request, first, plan.requestedSlug, plan.rejected);
    const response = NextResponse.next({ request: { headers: requestHeaders } });
    response.headers.set(LOCALE_HEADER, first);
    stampRejectCookie(response, plan, secure);
    return response;
  }

  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? `/${DEFAULT_LOCALE}` : `/${DEFAULT_LOCALE}${pathname}`;
  const requestHeaders = applyRequestHeaders(
    request,
    DEFAULT_LOCALE,
    plan.requestedSlug,
    plan.rejected,
  );
  const response = NextResponse.rewrite(url, { request: { headers: requestHeaders } });
  response.headers.set(LOCALE_HEADER, DEFAULT_LOCALE);
  stampRejectCookie(response, plan, secure);
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
