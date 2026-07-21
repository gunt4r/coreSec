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
| "No win, no fee on recovery" | `hero.detail` | Is that actually your pricing? |
| "Free first review" / "free case review" | hero, process, closing CTA | Confirm the first review really is free |
| "reviewed within 24 hours" | proof strip, form, FAQ | Was already on the site — still true? |
| "in English, Ukrainian or Russian" | `why` item 05 | Confirm you can service all three |
| Exchange list (Binance, Bybit, Coinbase, Kraken, OKX, KuCoin) | `src/i18n/company.ts` | Only list ones you have actually handled |

## 2. Fill in `src/i18n/company.ts` — 5 minutes

Five fields are deliberately blank. They are the claims a client or a regulator can check, so I
would not guess them:

```ts
legalName: ""            // e.g. "Coresec Finance OÜ"
jurisdiction: ""         // e.g. "Registered in Estonia"
registrationNumber: ""   // company number
foundedYear: ""          // e.g. "2021"
team: []                 // { name, role, background } — see the TeamMember type
```

Everything renders fine while they are empty — the footer and legal pages just show less. Filling
them lights up the identity line automatically.

**This is the single biggest remaining SEO win.** The audit's "0 EEAT signals" finding is mostly
this: a named team with real backgrounds, anchored to a real legal entity in a real jurisdiction,
is what separates a site Google trusts in a financial niche from one it does not. Everything else
on the page is now in place to support it.

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
- Watch Coverage for a week. Referral URLs are served with `noindex, nofollow`, so seeing them
  reported as "Excluded by noindex" is correct, not a problem.

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
- **Referral links still work unchanged** and now carry `noindex`, so they stop competing with your
  canonical homepage in search.
