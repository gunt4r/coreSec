# Backlinks

Nothing in this repo can create a backlink. What the code *can* do is make sure the links you earn
actually count, and that you can tell which ones worked. That part is now done — this document
records what was built, and what only you can do.

## What the site now does correctly

**Every internal link is a real `<a href>`.** The logo, the section links, the language switcher and
the footer used to be `<button>` elements with JavaScript handlers. Crawlers do not click buttons, so
`/privacy`, `/terms`, `/uk` and `/ru` had no incoming links at all and depended entirely on the
sitemap for discovery. They are now anchors, which is also why they can be middle-clicked.

**Referral links pass their equity to the homepage.** This changed, and it matters more than
anything else here. A blogger link looks like:

```
https://coresec.finance/gRmDwT2E46CqD0Lq
```

That path is rewritten to the homepage. It used to be served with `X-Robots-Tag: noindex, nofollow`,
which killed the duplicate — and killed the link. Google drops a `noindex` URL from the index and
stops passing its signals, so every blogger link would have been earning nothing.

The header is gone. The rewritten page already carries `<link rel="canonical" href="https://coresec.finance">`,
which is the correct tool for a tracking URL: Google consolidates the duplicate into the canonical
and the inbound link counts toward the homepage. Attribution is unaffected — the code is still read
from the path into `sessionStorage` and submitted with the form.

If you ever see a referral path itself ranking in search, that is the canonical being ignored, and
the fix is to check that the rewrite is still serving the homepage's canonical — not to reinstate
`noindex`.

**The page is quotable.** `Organization`, `WebSite`, `WebPage`, `Service` and `FAQPage` structured
data ship on every URL, with `sameAs` pointing at your Telegram and Instagram. An OG image renders at
1200×630 so a shared link shows a card rather than a bare URL — this measurably affects whether
anyone clicks a link someone posted for you.

## What only you can do

Ranked by what actually moves a site in this niche.

### 1. The case studies — built, and they are the linkable asset

`/cases` plus four detail pages now exist in all three languages:

```
/cases/bybit-abnormal-asset-origin-appeal
/cases/bybit-withdrawal-compliance-hold
/cases/bybit-manual-transfer-before-closure
/cases/binance-withdrawal-after-release
```

Each one carries the exchange's own screenshot and explains the mechanism behind the freeze —
what "Abnormal Asset Origin" actually scores, why a withdrawal hold is a different problem from an
account freeze, why "verification cannot be completed" is a deadline rather than a dispute. They
are deliberately written to be useful to someone who never contacts you, because that is the only
kind of page anyone links to.

They also do a second job. One page cannot rank for every query. These four target the specific
long-tail searches people actually type mid-crisis — the exact phrases in `problems.items` — which
is how you go from competing for one very hard keyword to owning a set of easy ones.

Each page ships `Article` schema, breadcrumbs, canonical and hreflang, and is in the sitemap.
**Nothing in the case copy states a fact that is not already evidenced in `public/cases/`** — no
invented timelines, no invented client details. Keep it that way if you edit them; the evidence is
the whole value.

### 2. Answer the question where it is already being asked

Search the exact phrases from `problems.items` — "Abnormal Asset Origin", "account under compliance
review Bybit", "Binance withdrawal suspended AML" — on:

- **Reddit** (r/binance, r/Bybit, r/CryptoCurrency), **Bitcointalk**, **Stack Exchange (Bitcoin)**
- Exchange-specific Telegram groups and Discords
- Trustpilot and Sitejabber threads about exchange freezes

These are `nofollow`, and that is fine. They send qualified traffic and they are how the citations
that *are* followed get discovered. The rule that matters: answer the question fully in the post
itself, and link only when the link genuinely adds something. Drive-by link drops get removed and
damage the brand you are trying to build.

### 3. Get listed where a real business gets listed

- **Google Business Profile**, if you have any address you can legitimately verify
- **Crunchbase**, **LinkedIn company page**, **Clutch** — these need the fields in
  `src/i18n/company.ts` filled in first
- Local business registries in your jurisdiction
- Crypto service directories — vet each one; many are link farms and will cost you more than they
  give

Everything here depends on step 4.

### 4. Get `src/i18n/company.ts` right

Legal name, jurisdiction, registration number, founding year, team. This is the bottleneck for the
whole list above — you cannot claim a directory listing, a Crunchbase profile or a press mention
without a legal entity behind it, and in a financial niche Google weighs that heavily.

**The values currently in that file do not check out** — the registration number belongs to an
unrelated dissolved company. See `docs/SEO-TODO.md` §2 before deploying. A directory or journalist
that verifies the number and finds a distillery is a worse outcome than never having listed.

### 5. Journalists cover exchange freezes constantly

When a wave of AML freezes hits an exchange, reporters at CoinDesk, Cointelegraph, DL News and the
local Ukrainian and Russian crypto press look for someone who can explain the mechanics on the
record. You can. Being a named, quotable source is how sites in this niche get links from domains
they could never buy — and it compounds, because the first citation makes the second one easier.

This also requires step 4: nobody quotes an anonymous brand on a financial topic.

## What not to do

Buying links, PBNs, or bulk directory submissions. In a YMYL financial niche these are not a
neutral-expected-value gamble — a manual action here is very hard to recover from, and the site's
whole positioning is that it is the honest option in a category full of scams. Link schemes
contradict the product.

## Measuring it

You already have the tooling.

```bash
npm run gen-refs -- coindesk-mention reddit-bybit-thread partner-blog-anna
```

Give each placement its own code. The Telegram message for every lead then reads
`Referred by: <that code>`, so you know which link produced business rather than which produced
traffic. `?ref=name` works too if a plain query string is easier to hand over.

For links you cannot instrument, Search Console's Links report is the source of truth. Check it
monthly, not daily — new links take weeks to register.
