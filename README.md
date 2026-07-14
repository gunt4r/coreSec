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
Caddy terminates TLS and gets/renews the certificate automatically — there is no certbot step and no
nginx config. The app itself is **not** published to the host; only Caddy's 80/443 are, and it reaches
the app over the internal compose network.

Point your domain's `A` record at the VPS **before** starting, or the certificate cannot be issued.

On the server (needs Docker + the compose plugin):

```bash
git clone https://github.com/gunt4r/coreSec.git
cd coreSec

cp .env.example .env
nano .env                      # set DOMAIN, ACME_EMAIL, TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID

docker compose up -d --build
docker compose logs -f caddy   # watch the certificate get issued
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

**Attribution.** Whatever query string a visitor lands with is captured into `sessionStorage`
(`src/lib/attribution.ts`) and submitted with the form, so you can give each blogger their own link:

```
https://your-site.com/?ref=blogger-anna
https://your-site.com/?ref=blogger-max&utm_source=youtube
```

The parameters are arbitrary — every key/value pair is listed under **Source** in the Telegram message.
A visitor with no query string is reported as `• Direct — no query parameters`, and the referrer is
included when the browser provides one. Last touch wins: landing again with new parameters replaces the
stored ones.

The query string is attacker-controlled, so it is capped (12 params, 40-char keys, 200-char values) on both
the client and the server, and HTML-escaped before it reaches Telegram.

**Behaviour when things go wrong:** if Telegram is unreachable the endpoint returns `502` and the form shows
its error state, rather than telling the visitor it worked and dropping the lead. If the two env vars are
absent the lead is logged to the server console and the form still succeeds — that is a local-dev
convenience, so make sure they are set in production.

## Structure

```
src/
  app/
    layout.tsx              root layout, Manrope font, LanguageProvider
    page.tsx                composes the sections
    globals.css             Tailwind import + brand tokens + keyframes
    api/contact/route.ts    form endpoint (validates, then logs — see below)
  components/               one file per section
  i18n/
    translations.ts         all copy for en / uk / ru
    language-provider.tsx   language context, localStorage + browser-locale detection
```

## Translations

`src/i18n/translations.ts` holds a `Dictionary` type derived from the English dictionary, so `uk` and `ru`
fail to compile if a key is missing. To add a language: add its code to `LANGS`, a label to `LANG_LABELS`,
and a dictionary to `dictionaries`.

The visitor's choice is stored in `localStorage`; on first visit the browser locale is used when it is one
of the supported languages, otherwise English.

## Before launch

- Set `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID`. Leads are delivered to Telegram only; nothing is stored.
- The footer links to `/privacy` and `/terms`, which do not exist yet.
- Placeholder brand: the wordmark ("BRANDNAME"), the contact email, and the Telegram handle are still the
  design's placeholders.
