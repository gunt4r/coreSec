import type { MetadataRoute } from "next";
import { DEFAULT_LANG, LANGS, type Lang } from "@/i18n/langs";
import { CASE_SLUGS, PAGES, hrefFor, hrefForCase, hrefForCases } from "@/lib/routes";
import { absolute } from "@/lib/seo";

type Entry = MetadataRoute.Sitemap[number];

function group(pathFor: (lang: Lang) => string, priority: number): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const languages = {
    ...Object.fromEntries(LANGS.map((l) => [l, absolute(pathFor(l))])),
    "x-default": absolute(pathFor(DEFAULT_LANG)),
  };

  return LANGS.map(
    (lang): Entry => ({
      url: absolute(pathFor(lang)),
      lastModified,
      changeFrequency: "monthly",
      priority,
      alternates: { languages },
    }),
  );
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...PAGES.flatMap((page) => group((lang) => hrefFor(lang, page), page === "" ? 1 : 0.4)),
    ...group(hrefForCases, 0.9),
    ...CASE_SLUGS.flatMap((slug) => group((lang) => hrefForCase(lang, slug), 0.8)),
  ];
}
