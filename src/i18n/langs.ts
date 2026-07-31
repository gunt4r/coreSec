export const LANGS = ["en", "uk", "ru", "sr"] as const;

export type Lang = (typeof LANGS)[number];

export const DEFAULT_LANG: Lang = "en";

export const SECONDARY_LANGS = LANGS.filter((lang) => lang !== DEFAULT_LANG);

export const LANG_LABELS: Record<Lang, string> = {
  en: "EN",
  uk: "UA",
  ru: "RU",
  sr: "SR",
};

export const OG_LOCALES: Record<Lang, string> = {
  en: "en_US",
  uk: "uk_UA",
  ru: "ru_RU",
  sr: "sr_RS",
};

export function isLang(value: unknown): value is Lang {
  return typeof value === "string" && (LANGS as readonly string[]).includes(value);
}
