# CORE SEC — Crypto Account Recovery Landing

Next.js (App Router) landing page with a three-language switcher (EN / UA / RU), built from the Figma design.

## Stack

- Next.js 16 + React 19, TypeScript
- Tailwind CSS v4 (design tokens live in `src/app/globals.css` under `@theme`)
- `motion` for scroll and entrance animations, `lucide-react` for icons
- Docker (multi-stage, `output: "standalone"`)

## Local development

```bash
npm install
npm run dev          # http://localhost:3000
```

Other scripts: `npm run build`, `npm start`, `npm run typecheck`.

> ESLint is not wired up. `eslint-config-next`'s peer ranges currently send npm into a very long
> dependency-resolution backtrack on this toolchain, so `tsc --noEmit` is the quality gate instead.

## Deployment (VPS + Caddy)

`docker compose` runs two containers: the Next.js app, and Caddy in front of it as a reverse proxy.
Cloudflare sits in front and terminates the public TLS; Caddy holds a Cloudflare Origin Certificate
for the Cloudflare↔origin hop. The app itself is **not** published to the host; only Caddy's 80/443
are, and it reaches the app over the internal compose network.

See `certs/README.md` for the Origin certificate, and `docs/OPERATIONS.md` for the things that will
bite you (why the firewall must use `DOCKER-USER`, why the cert files must exist before `up`).

On the server (needs Docker + the compose plugin):

```bash
git clone https://github.com/gunt4r/coreSec.git
cd coreSec

cp .env.example .env
nano .env                      # DOMAIN, NEXT_PUBLIC_SITE_URL, TELEGRAM_*, REF_SECRET

docker compose up -d --build
docker compose logs -f caddy   # should start clean, no ACME activity
```

That is the whole deploy. To ship an update:

```bash
git pull && docker compose up -d --build
```

Useful:

```bash
docker compose ps                 # what is running
docker compose logs -f web        # app logs, incl. Telegram delivery failures
docker compose down               # stop (certificates survive in the caddy_data volume)
```

Notes:

- **`docker compose` fails fast if `.env` is incomplete** — `DOMAIN`, `TELEGRAM_BOT_TOKEN` and
  `TELEGRAM_CHAT_ID` are required, so you cannot accidentally boot a site that silently drops leads.
- Ports 80 and 443 must be open in the VPS firewall. Caddy redirects HTTP to HTTPS on its own.
- The certificate lives in the `caddy_data` volume. Don't delete it casually — Let's Encrypt rate-limits
  re-issuance.
- `next build` runs inside the image build and wants roughly 1–2 GB of RAM. On a 1 GB VPS, add swap first.
- Setting `DOMAIN=:80` serves plain HTTP with no certificate — useful for an IP-only box or a local test.

## Docker (local)

```bash
docker compose up --build      # needs .env; serves on http://localhost via Caddy
```

## Telegram delivery + lead attribution

Form submissions are sent to a Telegram chat. Copy `.env.example` to `.env` and fill in:

```
TELEGRAM_BOT_TOKEN=...   # from @BotFather
TELEGRAM_CHAT_ID=...     # the chat/group that receives leads
```

**Attribution.** Each blogger gets a link with an obfuscated code in the path:

```bash
npm run gen-refs -- blogger-anna blogger-max     # needs REF_SECRET
# https://coresec.finance/hDJlS9pYLwkdZADClw   →  blogger-anna
```

The code is captured into `sessionStorage` (`src/lib/attribution.ts`) and submitted with the form,
then decoded server-side so the Telegram message reads `Referred by: blogger-anna`. `?ref=name` also
works as a plain fallback. A visitor with neither is reported as `• Direct — no referral`, and the
browser referrer is included when available. Last touch wins.

Language prefixes and real pages are never mistaken for referral codes — both the proxy and the
client share `resolvePath()` in `src/lib/routes.ts`, covered by `src/lib/routes.test.ts`. **Any new
top-level route must be added to `PAGES` there**, or visitors to it get attributed to a blogger of
that name.

The code is attacker-controlled, so it is capped at 200 chars on both the client and the server, and
HTML-escaped before it reaches Telegram. The endpoint is also rate-limited (5 per 10 minutes per IP)
with a honeypot field; see `src/lib/rate-limit.ts`.

`REF_SECRET` must match between the generator and production, and rotating it breaks attribution for
every link already handed out — see `docs/OPERATIONS.md`.

**Behaviour when things go wrong:** if Telegram is unreachable the endpoint returns `502` and the form shows
its error state, rather than telling the visitor it worked and dropping the lead. If the two env vars are
absent the lead is logged to the server console and the form still succeeds — that is a local-dev
convenience, so make sure they are set in production.

## Structure

```
src/
  app/
    (en)/                   English at "/" — page, privacy, terms
    (intl)/[lang]/          /uk and /ru — same pages, prerendered per language
    globals.css             Tailwind import + brand tokens + fluid type scale
    robots.ts sitemap.ts    generated from src/lib/routes.ts
    api/contact/route.ts    form endpoint (rate-limited, honeypot, then Telegram)
  components/               one file per section, plus site-shell / site-home
  i18n/
    translations.ts         all copy for en / uk / ru
    langs.ts                language codes, kept tiny for the middleware bundle
    company.ts              company facts — fill these in, see docs/SEO-TODO.md
    language-provider.tsx   language comes from the route; switching navigates
  lib/
    routes.ts               single source of truth for URLs and referral codes
    seo.ts schema.ts        metadata, canonical, hreflang, JSON-LD
```

Both route groups are root layouts (`app/layout.tsx` deliberately does not exist), which is what
lets `<html lang>` be correct per language while every page stays statically generated.

## Translations

`src/i18n/translations.ts` holds a `Dictionary` type derived from the English dictionary, so `uk` and `ru`
fail to compile if a key is missing. To add a language: add its code to `LANGS`, a label to `LANG_LABELS`,
and a dictionary to `dictionaries`.

The language lives in the URL: English at `/`, Ukrainian at `/uk`, Russian at `/ru`. Switching
navigates rather than swapping state, so each language is server-rendered and crawlable.

Browser-locale auto-detection is deliberately absent — redirecting on `Accept-Language` would mean
Googlebot, which crawls from the US, only ever sees English.

## Before launch

See **`docs/SEO-TODO.md`** — it lists what still needs a human: filling `src/i18n/company.ts`,
confirming the commercial claims in the copy, enabling HSTS in Cloudflare, setting
`NEXT_PUBLIC_SITE_URL`, and submitting the sitemap.
