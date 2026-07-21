import { DEFAULT_LANG, isLang, type Lang } from "@/i18n/langs";

export const PAGES = ["", "privacy", "terms"] as const;

export type Page = (typeof PAGES)[number];

export const CASES_SEGMENT = "cases";

export const CASE_SLUGS = [
  "bybit-abnormal-asset-origin-appeal",
  "bybit-withdrawal-compliance-hold",
  "bybit-manual-transfer-before-closure",
  "binance-withdrawal-after-release",
] as const;

export type CaseSlug = (typeof CASE_SLUGS)[number];

const REFERRAL_CODE = /^[A-Za-z0-9_-]{4,64}$/;

export function isPage(value: unknown): value is Page {
  return typeof value === "string" && (PAGES as readonly string[]).includes(value);
}

export function isCaseSlug(value: unknown): value is CaseSlug {
  return typeof value === "string" && (CASE_SLUGS as readonly string[]).includes(value);
}

function prefix(lang: Lang): string {
  return lang === DEFAULT_LANG ? "" : `/${lang}`;
}

export function hrefFor(lang: Lang, page: Page = ""): string {
  const base = prefix(lang);
  if (page) return `${base}/${page}`;
  return base || "/";
}

export function hrefForCases(lang: Lang): string {
  return `${prefix(lang)}/${CASES_SEGMENT}`;
}

export function hrefForCase(lang: Lang, slug: CaseSlug): string {
  return `${prefix(lang)}/${CASES_SEGMENT}/${slug}`;
}

type Resolved =
  | { kind: "route"; lang: Lang; page: Page }
  | { kind: "cases"; lang: Lang }
  | { kind: "case"; lang: Lang; slug: CaseSlug }
  | { kind: "redirect"; to: string }
  | { kind: "referral"; code: string }
  | { kind: "unknown" };

function hrefOf(resolved: Resolved): string {
  if (resolved.kind === "case") return hrefForCase(resolved.lang, resolved.slug);
  if (resolved.kind === "cases") return hrefForCases(resolved.lang);
  if (resolved.kind === "route") return hrefFor(resolved.lang, resolved.page);
  return hrefFor(DEFAULT_LANG);
}

function resolveRest(lang: Lang, rest: string[]): Resolved | null {
  if (rest.length === 0) return { kind: "route", lang, page: "" };

  if (rest.length === 1) {
    if (rest[0] === CASES_SEGMENT) return { kind: "cases", lang };
    if (isPage(rest[0]) && rest[0] !== "") return { kind: "route", lang, page: rest[0] };
    return null;
  }

  if (rest.length === 2 && rest[0] === CASES_SEGMENT && isCaseSlug(rest[1])) {
    return { kind: "case", lang, slug: rest[1] };
  }

  return null;
}

export function resolvePath(pathname: string): Resolved {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) return { kind: "route", lang: DEFAULT_LANG, page: "" };

  const head = segments[0];

  if (head === DEFAULT_LANG) {
    const resolved = resolveRest(DEFAULT_LANG, segments.slice(1));
    if (!resolved) return { kind: "unknown" };
    return { kind: "redirect", to: hrefOf(resolved) };
  }

  const prefixed = isLang(head) && head !== DEFAULT_LANG;
  const lang: Lang = prefixed ? (head as Lang) : DEFAULT_LANG;
  const rest = prefixed ? segments.slice(1) : segments;

  const resolved = resolveRest(lang, rest);
  if (resolved) return resolved;

  if (!prefixed && segments.length === 1 && REFERRAL_CODE.test(head)) {
    return { kind: "referral", code: head };
  }

  return { kind: "unknown" };
}

export function pageOf(pathname: string): Page {
  const resolved = resolvePath(pathname);
  return resolved.kind === "route" ? resolved.page : "";
}

export function swapLang(pathname: string, next: Lang): string {
  const resolved = resolvePath(pathname);
  if (resolved.kind === "case") return hrefForCase(next, resolved.slug);
  if (resolved.kind === "cases") return hrefForCases(next);
  if (resolved.kind === "route") return hrefFor(next, resolved.page);
  return hrefFor(next);
}
