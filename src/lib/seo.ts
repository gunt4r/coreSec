import type { Metadata } from "next";
import { DEFAULT_LANG, LANGS, OG_LOCALES, type Lang } from "@/i18n/langs";
import { dictionaries } from "@/i18n/translations";
import { caseBySlug } from "@/lib/cases";
import { hrefFor, hrefForCase, hrefForCases, type CaseSlug, type Page } from "@/lib/routes";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://coresec.finance").replace(
  /\/+$/,
  "",
);

export const SITE_NAME = "CORESEC FINANCE";

export function absolute(path: string): string {
  return `${SITE_URL}${path === "/" ? "" : path}` || SITE_URL;
}

type Copy = { title: string; description: string };

type PathFor = (lang: Lang) => string;

function languageAlternates(pathFor: PathFor): Record<string, string> {
  const alternates: Record<string, string> = {};
  for (const lang of LANGS) alternates[lang] = pathFor(lang);
  alternates["x-default"] = pathFor(DEFAULT_LANG);
  return alternates;
}

function metadataFor(lang: Lang, copy: Copy, pathFor: PathFor): Metadata {
  const { title, description } = copy;
  const path = pathFor(lang);

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    category: "finance",
    formatDetection: { email: false, telephone: false, address: false },
    alternates: {
      canonical: path,
      languages: languageAlternates(pathFor),
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title,
      description,
      url: path,
      locale: OG_LOCALES[lang],
      alternateLocale: LANGS.filter((l) => l !== lang).map((l) => OG_LOCALES[l]),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

function copyFor(lang: Lang, page: Page): Copy {
  const dict = dictionaries[lang];
  if (page === "privacy") return dict.legal.privacy;
  if (page === "terms") return dict.legal.terms;
  return dict.meta;
}

export function buildMetadata(lang: Lang, page: Page = ""): Metadata {
  return metadataFor(lang, copyFor(lang, page), (l) => hrefFor(l, page));
}

export function buildCasesMetadata(lang: Lang): Metadata {
  return metadataFor(lang, dictionaries[lang].caseStudies.index, hrefForCases);
}

export function buildCaseMetadata(lang: Lang, slug: CaseSlug): Metadata {
  const file = caseBySlug(slug);
  if (!file) throw new Error(`No case file for slug "${slug}"`);
  const copy = dictionaries[lang].caseStudies.items[file.id];
  return metadataFor(lang, copy, (l) => hrefForCase(l, slug));
}
