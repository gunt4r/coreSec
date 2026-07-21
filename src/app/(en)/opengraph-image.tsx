import { renderOgImage } from "@/lib/og-image";

export { alt, size, contentType } from "@/lib/og-image";

export default function OpengraphImage() {
  return renderOgImage();
}
