import type { Metadata } from "next";
import { LANGS, OG_LOCALES, type Lang } from "@/i18n/langs";
import { dictionaries } from "@/i18n/translations";
import { hrefFor, type Page } from "@/lib/routes";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://coresec.finance").replace(
  /\/+$/,
  "",
);

export const SITE_NAME = "CORESEC FINANCE";

export function absolute(path: string): string {
  return `${SITE_URL}${path === "/" ? "" : path}` || SITE_URL;
}

function languageAlternates(page: Page): Record<string, string> {
  const alternates: Record<string, string> = {};
  for (const lang of LANGS) alternates[lang] = hrefFor(lang, page);
  alternates["x-default"] = hrefFor("en", page);
  return alternates;
}

type Copy = { title: string; description: string };

function copyFor(lang: Lang, page: Page): Copy {
  const dict = dictionaries[lang];
  if (page === "privacy") return dict.legal.privacy;
  if (page === "terms") return dict.legal.terms;
  return dict.meta;
}

export function buildMetadata(lang: Lang, page: Page = ""): Metadata {
  const { title, description } = copyFor(lang, page);
  const path = hrefFor(lang, page);

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    applicationName: SITE_NAME,
    alternates: {
      canonical: path,
      languages: languageAlternates(page),
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
