import assert from "node:assert/strict";
import { test } from "node:test";
import { isBotUserAgent, preferredLanguage } from "./lang-detect";

test("preferredLanguage picks the highest-quality supported language", () => {
  assert.equal(preferredLanguage("ru-RU,ru;q=0.9,en;q=0.8"), "ru");
  assert.equal(preferredLanguage("uk-UA,uk;q=0.9,en;q=0.5"), "uk");
  assert.equal(preferredLanguage("en-US,en;q=0.9"), "en");
  assert.equal(preferredLanguage("en-GB,en;q=0.9,ru;q=0.8"), "en");
});

test("preferredLanguage respects q-values regardless of order", () => {
  assert.equal(preferredLanguage("en;q=0.7,ru;q=0.9"), "ru");
  assert.equal(preferredLanguage("ru;q=0.3,en;q=0.9"), "en");
});

test("preferredLanguage falls back to English for unsupported or missing headers", () => {
  assert.equal(preferredLanguage("de-DE,de;q=0.9"), "en");
  assert.equal(preferredLanguage("kk,be;q=0.9"), "en");
  assert.equal(preferredLanguage(""), "en");
  assert.equal(preferredLanguage(null), "en");
});

test("real browser user-agents are not treated as bots", () => {
  for (const ua of [
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36",
    "Mozilla/5.0 (X11; Linux x86_64; rv:153.0) Gecko/20100101 Firefox/153.0",
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
  ]) {
    assert.equal(isBotUserAgent(ua), false, ua);
  }
});

test("crawlers and empty agents are treated as bots so they never get redirected", () => {
  for (const ua of [
    "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
    "Mozilla/5.0 (compatible; YandexBot/3.0; +http://yandex.com/bots)",
    "Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)",
    "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)",
    "TelegramBot (like TwitterBot)",
    "",
    null,
  ]) {
    assert.equal(isBotUserAgent(ua), true, String(ua));
  }
});
