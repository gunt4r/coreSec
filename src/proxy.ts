import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { DEFAULT_LANG } from "@/i18n/langs";
import { isBotUserAgent, preferredLanguage } from "@/lib/lang-detect";
import { resolvePath, swapLang } from "@/lib/routes";

const LANG_COOKIE = "lang";

const LANG_COOKIE_OPTIONS = {
  path: "/",
  maxAge: 60 * 60 * 24 * 365,
  sameSite: "lax",
} as const;

const LOCALIZABLE = new Set(["route", "cases", "case", "thankyou"]);

function languageRedirect(request: NextRequest): NextResponse | null {
  if (request.cookies.has(LANG_COOKIE)) return null;
  if (isBotUserAgent(request.headers.get("user-agent"))) return null;

  const preferred = preferredLanguage(request.headers.get("accept-language"));

  if (preferred === DEFAULT_LANG) {
    const stay = NextResponse.next();
    stay.cookies.set(LANG_COOKIE, DEFAULT_LANG, LANG_COOKIE_OPTIONS);
    return stay;
  }

  const target = request.nextUrl.clone();
  target.pathname = swapLang(request.nextUrl.pathname, preferred);
  const redirect = NextResponse.redirect(target, 307);
  redirect.cookies.set(LANG_COOKIE, preferred, LANG_COOKIE_OPTIONS);
  return redirect;
}

export function proxy(request: NextRequest) {
  const resolved = resolvePath(request.nextUrl.pathname);

  if (resolved.kind === "redirect") {
    const target = request.nextUrl.clone();
    target.pathname = resolved.to;
    return NextResponse.redirect(target, 308);
  }

  if (resolved.kind === "referral") {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.rewrite(url);
  }

  if (LOCALIZABLE.has(resolved.kind) && "lang" in resolved && resolved.lang === DEFAULT_LANG) {
    const redirect = languageRedirect(request);
    if (redirect) return redirect;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.).*)"],
};
