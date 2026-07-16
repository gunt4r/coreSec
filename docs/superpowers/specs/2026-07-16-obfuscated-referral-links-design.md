# Obfuscated Referral Links — Design

**Date:** 2026-07-16
**Status:** Approved for planning

## Problem

Bloggers drive traffic to the landing page with a referral tag in the URL. Today
that tag is a plain query param (`?ref=blogger-x`): it captured by
`src/lib/attribution.ts`, stored in session storage, and forwarded verbatim to
Telegram by `src/app/api/contact/route.ts` when a lead submits the contact form.

Because the nickname sits in the URL in plain text, a blogger's audience can
glance at the link and see who referred them, strip the tag, or swap it. We want
the link to carry an **opaque string** that we turn back into the nickname on our
end.

## Goal & Non-Goals

**Goal:** The referral tag should not be obvious to a casual viewer of the URL,
and the nickname should still reach our Telegram feed.

**Threat model (explicitly chosen):** "Just not obvious." We are NOT defending
against:
- A determined attacker who collects many links and reverse-engineers the scheme.
- Forgery of valid-looking codes.

So we do **not** need signatures, HMAC authentication tags, or key management
beyond a single secret. A reversible, keyed obfuscation is sufficient.

**Non-goals:** cryptographic secrecy, tamper-proofing, per-blogger analytics
dashboards, click tracking. Out of scope.

## Link Format

Clean path segment so the URL looks like an ordinary page:

```
https://protectcryptoland.com/k3Xf9aQ2vP
```

**Only the referral is read.** The app captures the ref from exactly two places
and ignores every other query parameter:

- the **path segment** — `/k3Xf9aQ2vP` (the obfuscated code), and
- a **`?ref=` query param** — for plain/legacy links.

Everything else (`fbclid`, `utm_*`, `gclid`, …) is dropped. This is deliberate:
Meta appends `?fbclid=…` after the path when a link is clicked from Instagram
(`/k3Xf9aQ2vP?fbclid=…`), so reading the path segment and ignoring the query
handles that automatically and keeps the Telegram feed clean. The old
multi-param capture (the `MAX_PARAMS` map) is removed entirely.

## Architecture

Three pieces sharing one codec module, so the generator script and the server can
never drift apart.

```
scripts/gen-refs.ts  ──uses──►  src/lib/ref.ts  ◄──uses──  src/app/api/contact/route.ts
   (encode: name→code)          (encode/decode)             (decode: code→name)

Browser:  /k3Xf9aQ2vP  ──►  src/middleware.ts (rewrite → homepage)
                        ──►  src/lib/attribution.ts (capture raw code)
                        ──►  POST /api/contact { attribution: { ref: "k3Xf9aQ2vP" } }
```

### 1. Codec — `src/lib/ref.ts`

Two pure functions, stateless, keyed off `REF_SECRET` (from env):

- `encodeRef(nickname: string): string`
- `decodeRef(code: string): string | null` — returns `null` on any malformed or
  undecodable input (never throws).

**Algorithm (tiny keyed stream transform):**

1. Generate a 1-byte random `nonce`.
2. Derive a keystream: `HMAC-SHA256(REF_SECRET, nonce)`, extended by re-hashing
   if the nickname is longer than 32 bytes (rare; nicknames are short).
3. `payload = nonce || (utf8(nickname) XOR keystream)`.
4. `code = base64url(payload)` (no padding).

Decode reverses it: base64url-decode, split off the nonce, re-derive the same
keystream, XOR back, UTF-8 decode. Any failure (bad base64, empty, invalid
UTF-8) returns `null`.

**Why this shape:** reversible and stateless (no lookup table to keep in sync),
and the random nonce means the same nickname yields different-looking codes each
run, so two similar usernames never produce visibly similar codes. `node:crypto`
provides HMAC; no new dependency for the codec itself.

**Secret rotation:** single secret, no migration path (per decision). If
`REF_SECRET` is ever changed, previously generated links stop decoding — the
plan will simply regenerate and re-send. This is documented, not engineered
around.

**Codec is server-side only.** The browser never decodes; it forwards the raw
code. So the algorithm and secret never ship in client JS.

### 2. Generator script — `scripts/gen-refs.ts`

Run via an npm script backed by `tsx` (added as a devDependency):

```
npm run gen-refs -- bloggerX cryptoAnna joe        # usernames as args
npm run gen-refs -- --file bloggers.txt            # one username per line
npm run gen-refs -- --file bloggers.txt extraGuy   # both; args appended
```

- Accepts usernames from **both** a `--file` (one per line, blank lines and
  `#` comments ignored) and positional args.
- Base URL comes from `REF_BASE_URL` env (default
  `https://protectcryptoland.com`), so it works for staging too.
- Output: one aligned line per blogger, link then nickname:

```
https://protectcryptoland.com/9fKx2aQ   →  bloggerX
https://protectcryptoland.com/Lp0vZ3m   →  cryptoAnna
https://protectcryptoland.com/qR7nT1w   →  joe
```

- Loads `.env` so `REF_SECRET` is available (Next already keeps it there;
  the script reads it the same way).
- Exits non-zero with a clear message if `REF_SECRET` is unset or no usernames
  were given.

### 3. Middleware — `src/middleware.ts`

A path like `/k3Xf9aQ2vP` must serve the landing page, not 404.

- Rewrites (internally, browser URL unchanged) any single-segment path that
  looks like a code to `/`, so Next serves the existing homepage.
- Matcher **excludes** `/api/*`, `/_next/*`, and any path containing a `.`
  (static files like `/logo.svg`, `/favicon.ico`). The root `/` is untouched.
- The rewrite does not itself decode; it only keeps the code-bearing URL from
  404ing. Capture happens client-side (below).

### 4. Attribution capture — `src/lib/attribution.ts`

Simplified to a single referral field. The `Attribution` type becomes:

```ts
type Attribution = { ref?: string; referrer?: string; landedAt: string };
```

(The `params: Record<string,string>` map and its `MAX_PARAMS`/`MAX_KEY`/
`MAX_VALUE` loop are removed.)

Capture logic on mount, in precedence order:

1. If `window.location.pathname` is a single non-empty segment that isn't a
   known asset (see middleware matcher), use it as the raw `ref` code.
2. Else, if a `?ref=` query param is present, use its value as `ref`.
3. Otherwise no `ref`.

`referrer` (`document.referrer`) is still recorded — it's genuinely useful
(that's what surfaced `l.instagram.com`). `ref` is length-capped
(`MAX_REF = 200`). The existing per-session storage and "last touch wins"
behavior are preserved.

### 5. Contact route — `src/app/api/contact/route.ts`

- `parseAttribution` reads just `ref` (capped) and `referrer` (capped) —
  re-applied server-side because the client is not trusted. The old params loop
  is gone.
- In `formatMessage`, when `attribution.ref` is present, call `decodeRef`:
  - success → `• Referred by: <nickname>`
  - `null` (e.g. a legacy plain `?ref=boyarskiy`, or garbage) → fall back to
    `• Ref: <raw value>` so nothing is silently lost.
- The `• Referrer: <url>` line stays; `• Direct — no referral` when neither
  `ref` nor `referrer` is present.

## Config

Add to `.env.example`:

```
# Secret for obfuscating blogger referral codes in links. Any random string.
# Rotating it invalidates previously generated links.
REF_SECRET=
# Base URL the generator script builds links against.
REF_BASE_URL=https://protectcryptoland.com
```

## Testing

- **Codec round-trip:** `decodeRef(encodeRef(name)) === name` for a range of
  names (ascii, unicode, long, single char). Different `encodeRef` calls for the
  same name produce different codes (nonce), all of which decode back.
- **decodeRef robustness:** returns `null` for `""`, non-base64, truncated, and
  garbage input — never throws.
- **Generator script:** given args and a fixture file, prints the expected
  number of lines, each with a decodable code; errors clearly when `REF_SECRET`
  is missing or no usernames supplied.
- **Middleware:** a code-shaped path rewrites to homepage; `/api/*`, `/_next/*`,
  and dotted asset paths are left alone.
- **Only-ref capture:** a URL like `/CODE?fbclid=x&utm_source=y` yields
  `ref = CODE` and no other params; `?ref=v&fbclid=x` yields `ref = v` only.
- **End-to-end (manual, via the run/verify skill):** load `/<generated-code>`,
  submit the form, confirm the Telegram payload (or the unconfigured-Telegram
  console log) shows `Referred by: <nickname>`.

## Files Touched

| File | Change |
|------|--------|
| `src/lib/ref.ts` | **new** — encode/decode codec |
| `scripts/gen-refs.ts` | **new** — link generator |
| `src/middleware.ts` | **new** — rewrite code paths to homepage |
| `src/lib/attribution.ts` | capture path-segment code as `attribution.ref` |
| `src/app/api/contact/route.ts` | decode `attribution.ref` → nickname in Telegram |
| `.env.example` | document `REF_SECRET`, `REF_BASE_URL` |
| `package.json` | add `tsx` devDep + `gen-refs` script |
| tests | codec + script + middleware coverage |
