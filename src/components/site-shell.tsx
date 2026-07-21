import { Manrope } from "next/font/google";
import { LanguageProvider } from "@/i18n/language-provider";
import { dictionaries } from "@/i18n/translations";
import type { Lang } from "@/i18n/langs";
import "@/app/globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

const revealFallback = ".reveal,.reveal-line{opacity:1;transform:none}";

export function SiteShell({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return (
    <html lang={lang} className={manrope.variable}>
      <body className="bg-cream font-sans text-ink">
        <noscript>
          <style>{revealFallback}</style>
        </noscript>
        <LanguageProvider lang={lang} dictionary={dictionaries[lang]}>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
