import { renderOgImage } from "@/lib/og-image";
import { SECONDARY_LANGS } from "@/i18n/langs";

export { alt, size, contentType } from "@/lib/og-image";

export function generateStaticParams() {
  return SECONDARY_LANGS.map((lang) => ({ lang }));
}

export default function OpengraphImage() {
  return renderOgImage();
}
