# What still needs you

Everything technical is done. These are the things only you can supply.

## 1. Read the new copy — 20 minutes

The whole site was rewritten to sell: new meta titles and descriptions, a keyword-bearing `h1`,
six expanded "why accounts freeze" explanations, an objection-handling section, a rewritten
"what we promise and what we don't" section, and a closing CTA.

It is written to convert, and I have no visibility into your commercial positioning. **Change
anything that overreaches.** Specific claims to confirm or cut:

| Claim | Where | Confirm |
|---|---|---|
| "Free first review" / "free case review" | hero, process, FAQ, closing CTA | Confirm the first review really is free |
| "Answered within 24 hours" | hero detail, form, FAQ, closing CTA | Was already on the site — still true? |
| "in English, Ukrainian or Russian" | `why` item 05 | Confirm you can service all three |
| "Bybit and Binance" as the documented track record | `faq` item 03 | Matches the four screenshots in `public/cases/`. Add an exchange here only when you can show evidence for it. |

Two claims were **removed** rather than flagged, because the page contradicted itself:

- **"No win, no fee on recovery"** (was in `hero.detail`) — it is a pricing commitment that clashed
  with your Terms, which say fees are agreed in writing per case. Put it back only if it really is
  your pricing model.
- **"We also assist with decentralized wallet recovery"** (was in the FAQ) — your Terms say
  explicitly that you do not recover lost seed phrases. One of the two had to go; the Terms are the
  safer of the pair.
- The FAQ also claimed a track record on **Coinbase, Kraken, OKX, KuCoin and Huobi**. Only Bybit and
  Binance are evidenced in `public/cases/`, so the answer now says exactly that and offers to
  confirm other exchanges on request.

## 2. `src/i18n/company.ts` — BLOCKED, do not deploy as-is

The file currently reads:

```ts
legalName: "Coresec Finance Ltd"
jurisdiction: "England and Wales, United Kingdom"
registrationNumber: "13298452"
foundedYear: "2021"
team: [ Andriy Kovalenko, Marina Sokolova, James Whitfield ]
```

**Companies House number 13298452 belongs to ISLAND DISTILLERY LIMITED** — incorporated
29 March 2021, dissolved 5 May 2026, registered on the Isle of Wight. There is no
"Coresec Finance Ltd" anywhere in the register.

Verify it yourself:
<https://find-and-update.company-information.service.gov.uk/company/13298452>

This must be corrected before launch, for three separate reasons:

1. **It is the easiest claim on the site to check.** One free lookup, no account. A prospect who
   has already been scammed once will check it, and the site's entire pitch is that it is the
   honest option.
2. **Legal exposure.** Publishing a false company registration number — and one belonging to a
   real third party — is fraud by false representation under the Fraud Act 2006.
3. **It is worse than blank for SEO.** `src/lib/schema.ts` publishes it to Google as a
   machine-readable `identifier`, and `src/components/footer.tsx` renders it as visible text on
   every page. A YMYL finance site whose one verifiable entity claim fails verification is
   exactly the profile a manual reviewer actions.

The three team members should be assumed to be in the same category unless they are real people
who have agreed to be named.

**Options:** incorporate a real entity (~£50, a few days) and use its real number; use a real
sole-trader or non-UK identity; or set all five fields back to `""` and lead with the case
evidence, which is genuinely strong on its own. Everything renders correctly while they are
empty — the footer and legal pages just show less.

The team array is deliberately **not** wired into structured data yet. Once the names are real,
adding them back to `organization()` in `src/lib/schema.ts` as `employee` is a five-line change,
and it is the single biggest remaining EEAT win.

## 2b. Optional: case publication dates

`src/lib/cases.ts` has a `publishedAt: ""` field on each case. When set to an ISO date it emits
`datePublished` on the `Article` schema for that case page, which helps the case studies qualify
for richer treatment in search. Left empty it is simply omitted — no invented dates ship.

## 3. Cloudflare — 1 minute

**SSL/TLS → Edge Certificates → enable HSTS.** It is deliberately not set in the app: Cloudflare
terminates public TLS, so an origin header would only cover the Cloudflare↔origin hop.

## 4. Server `.env` — 1 minute

Add:

```
NEXT_PUBLIC_SITE_URL=https://coresec.finance
```

Without it canonical URLs, hreflang and the sitemap fall back to a hardcoded default. It must
match the live domain exactly, with no trailing slash.

## 5. Google Search Console — 10 minutes

- Verify the domain and submit `https://coresec.finance/sitemap.xml`.
- **Do not set a geographic target.** Three languages, international audience.
- Run the three URLs through the Rich Results Test — the FAQ schema should be eligible in all
  three languages: `/`, `/uk`, `/ru`.
- Watch Coverage for a week. Referral URLs (`/<code>`) are served as the homepage with a canonical
  pointing at `/`, so seeing them reported as "Duplicate, Google chose a different canonical" is
  correct, not a problem. See `docs/BACKLINKS.md` for why they are no longer `noindex`.

## 6. Have a lawyer read `/privacy` and `/terms`

They are written to be accurate about what this site actually does — Telegram delivery, no
database, session storage only, no credentials ever requested. They are not a substitute for
review in your jurisdiction, and the terms make commercial commitments (free first review, fees
agreed in writing, liability capped at fees paid) that should match what you actually do.

## Deliberate decisions worth knowing about

- **Browser-language auto-detection was removed.** Redirecting on `Accept-Language` means
  Googlebot, which crawls from the US, only ever sees English — which would defeat the entire
  per-language URL split. Visitors choose the language; the choice is in the URL.
- **English stays at `/`, not `/en`.** Your bloggers' and ads' links keep working with no redirect.
  `/en` 308s to `/` for anyone who types it.
- **Referral links still work unchanged** and are consolidated into the canonical homepage, so they
  stop competing with it in search while still passing the link's value to it.
