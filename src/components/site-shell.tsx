import { Manrope } from "next/font/google";
import { LanguageProvider } from "@/i18n/language-provider";
import type { Lang } from "@/i18n/langs";
import "@/app/globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

export function SiteShell({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return (
    <html lang={lang} className={manrope.variable}>
      <body className="bg-cream font-sans text-ink">
        <LanguageProvider lang={lang}>{children}</LanguageProvider>
      </body>
    </html>
  );
}
