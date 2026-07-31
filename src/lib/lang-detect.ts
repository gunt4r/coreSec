import { DEFAULT_LANG, isLang, type Lang } from "@/i18n/langs";

const BOT_PATTERN =
  /bot|crawl|spider|slurp|mediapartners|adsbot|feedfetcher|facebookexternalhit|whatsapp|telegram|twitter|linkedin|embedly|quora|pinterest|reddit|applebot|yandex|mail\.ru|sputnik|petal|semrush|ahrefs|mj12|dotbot|duckduck|baidu|sogou|bingpreview|google-inspectiontool|googleother|apis-google|chrome-lighthouse|headlesschrome|monitoring|uptime|pingdom|statuscake|gtmetrix|phantomjs|python-requests|curl|wget|go-http|node-fetch|axios|okhttp|java\/|libwww/i;

export function isBotUserAgent(ua: string | null | undefined): boolean {
  if (!ua) return true;
  return BOT_PATTERN.test(ua);
}

export function preferredLanguage(header: string | null | undefined): Lang {
  if (!header) return DEFAULT_LANG;

  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const qParam = params.find((p) => p.trim().startsWith("q="));
      const q = qParam ? Number(qParam.split("=")[1]) : 1;
      return {
        base: tag.trim().toLowerCase().split("-")[0],
        q: Number.isFinite(q) ? q : 0,
      };
    })
    .filter((entry) => entry.base && entry.q > 0)
    .sort((a, b) => b.q - a.q);

  for (const { base } of ranked) {
    if (isLang(base)) return base;
  }
  return DEFAULT_LANG;
}
