import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { LanguageProvider } from "@/i18n/language-provider";
import { dictionaries } from "@/i18n/translations";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: dictionaries.en.meta.title,
  description: dictionaries.en.meta.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className="bg-cream font-sans text-ink">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
