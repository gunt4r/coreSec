import { DEFAULT_LANG, isLang, type Lang } from "@/i18n/langs";

export const PAGES = ["", "privacy", "terms"] as const;

export type Page = (typeof PAGES)[number];

const REFERRAL_CODE = /^[A-Za-z0-9_-]{4,64}$/;

export function isPage(value: unknown): value is Page {
  return typeof value === "string" && (PAGES as readonly string[]).includes(value);
}

export function hrefFor(lang: Lang, page: Page = ""): string {
  const prefix = lang === DEFAULT_LANG ? "" : `/${lang}`;
  if (page) return `${prefix}/${page}`;
  return prefix || "/";
}

type Resolved =
  | { kind: "route"; lang: Lang; page: Page }
  | { kind: "redirect"; to: string }
  | { kind: "referral"; code: string }
  | { kind: "unknown" };

export function resolvePath(pathname: string): Resolved {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) return { kind: "route", lang: DEFAULT_LANG, page: "" };

  const head = segments[0];

  if (head === DEFAULT_LANG) {
    const rest = segments.slice(1);
    const page = rest.length === 1 && isPage(rest[0]) ? rest[0] : "";
    if (rest.length === 0 || page) return { kind: "redirect", to: hrefFor(DEFAULT_LANG, page) };
    return { kind: "unknown" };
  }

  const prefixed = isLang(head) && head !== DEFAULT_LANG;
  const lang: Lang = prefixed ? (head as Lang) : DEFAULT_LANG;
  const rest = prefixed ? segments.slice(1) : segments;

  if (rest.length === 0) return { kind: "route", lang, page: "" };
  if (rest.length === 1 && isPage(rest[0]) && rest[0] !== "") {
    return { kind: "route", lang, page: rest[0] };
  }

  if (!prefixed && segments.length === 1 && REFERRAL_CODE.test(head)) {
    return { kind: "referral", code: head };
  }

  return { kind: "unknown" };
}

export function pageOf(pathname: string): Page {
  const resolved = resolvePath(pathname);
  return resolved.kind === "route" ? resolved.page : "";
}
