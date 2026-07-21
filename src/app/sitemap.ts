import type { MetadataRoute } from "next";
import { LANGS } from "@/i18n/langs";
import { PAGES, hrefFor } from "@/lib/routes";
import { absolute } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return PAGES.flatMap((page) =>
    LANGS.map((lang) => ({
      url: absolute(hrefFor(lang, page)),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: page === "" ? 1 : 0.4,
      alternates: {
        languages: Object.fromEntries(LANGS.map((l) => [l, absolute(hrefFor(l, page))])),
      },
    })),
  );
}
