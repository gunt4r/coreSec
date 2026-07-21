import type { Lang } from "@/i18n/langs";
import { buildSchema } from "@/lib/schema";
import type { Page } from "@/lib/routes";

function serialize(schema: object): string {
  return JSON.stringify(schema).replace(/</g, "\\u003c");
}

export function JsonLd({ lang, page = "" }: { lang: Lang; page?: Page }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serialize(buildSchema(lang, page)) }}
    />
  );
}
