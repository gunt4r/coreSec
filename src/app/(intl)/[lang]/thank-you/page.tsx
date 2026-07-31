import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ThankYou } from "@/components/thank-you";
import { DEFAULT_LANG, isLang } from "@/i18n/langs";
import { buildThankYouMetadata } from "@/lib/seo";

type Params = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang) || lang === DEFAULT_LANG) notFound();
  return buildThankYouMetadata(lang);
}

export default async function ThankYouPage({ params }: Params) {
  const { lang } = await params;
  if (!isLang(lang) || lang === DEFAULT_LANG) notFound();
  return <ThankYou />;
}
