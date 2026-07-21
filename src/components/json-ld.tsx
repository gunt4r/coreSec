import type { Lang } from "@/i18n/langs";
import { buildSchema, type SchemaPage } from "@/lib/schema";
import type { CaseSlug } from "@/lib/routes";

function serialize(schema: object): string {
  return JSON.stringify(schema).replace(/</g, "\\u003c");
}

export function JsonLd({
  lang,
  page = "",
  slug,
}: {
  lang: Lang;
  page?: SchemaPage;
  slug?: CaseSlug;
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serialize(buildSchema(lang, page, slug)) }}
    />
  );
}
