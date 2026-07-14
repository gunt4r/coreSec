# BrandName — Crypto Account Recovery Landing

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

## Docker

```bash
docker compose up --build      # http://localhost:3000
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
