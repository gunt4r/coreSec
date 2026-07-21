export const LANGS = ["en", "uk", "ru"] as const;

export type Lang = (typeof LANGS)[number];

export const DEFAULT_LANG: Lang = "en";

export const SECONDARY_LANGS = LANGS.filter((lang) => lang !== DEFAULT_LANG);

export const LANG_LABELS: Record<Lang, string> = {
  en: "EN",
  uk: "UA",
  ru: "RU",
};

export const OG_LOCALES: Record<Lang, string> = {
  en: "en_US",
  uk: "uk_UA",
  ru: "ru_RU",
};

export function isLang(value: unknown): value is Lang {
  return typeof value === "string" && (LANGS as readonly string[]).includes(value);
}
