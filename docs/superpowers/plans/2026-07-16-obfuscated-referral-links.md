# Obfuscated Referral Links Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give bloggers referral links whose nickname is hidden behind an opaque code (`/k3Xf9aQ2vP`), decoded server-side so Telegram still shows the real nickname.

**Architecture:** A stateless, reversible codec (`src/lib/ref.ts`) keyed off `REF_SECRET` encodes/decodes nicknames. A CLI script generates links. Next.js middleware rewrites code-paths to the homepage; the client captures only the referral (path segment or `?ref=`, nothing else); the contact route decodes it before sending to Telegram.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript 5.9, Node 26. Tests use Node's built-in `node:test` runner via the `tsx` loader. No other new runtime dependencies.

## Global Constraints

- Threat model is **"just not obvious"** — reversible obfuscation only. No HMAC auth tags, no signatures, no forgery protection.
- Codec is **server-side only**; the browser forwards the raw code and never decodes.
- **Only the referral is captured.** The ref comes from the path segment or a `?ref=` query param; every other query param (`fbclid`, `utm_*`, …) is ignored.
- `REF_SECRET` is a single secret; no rotation/migration path (rotating it invalidates old links — acceptable).
- Codec functions **never throw on decode** — `decodeRef` returns `null` on any bad input.
- `MAX_REF = 200` (byte/char cap on any ref value, applied client- and server-side).
- Default base URL: `https://protectcryptoland.com` (overridable via `REF_BASE_URL`).
- `@/*` maps to `./src/*` (tsconfig paths). New standalone files (script, tests) use **relative** extensionless imports; the Next app route uses the `@/` alias.

---

### Task 1: Codec + tooling

**Files:**
- Create: `src/lib/ref.ts`
- Test: `src/lib/ref.test.ts`
- Modify: `package.json` (add `tsx` devDep + `test` and `gen-refs` scripts)
- Modify: `.env.example` (document `REF_SECRET`, `REF_BASE_URL`)
- Modify: `.env` (add a real `REF_SECRET` so downstream tasks work end-to-end)

**Interfaces:**
- Produces: `encodeRef(nickname: string): string` and `decodeRef(code: string): string | null`, exported from `src/lib/ref.ts`. `encodeRef` throws if `REF_SECRET` is unset; `decodeRef` never throws (returns `null`). Both read `process.env.REF_SECRET` lazily **at call time**, not at import.

- [ ] **Step 1: Install tsx and add npm scripts**

Run:
```bash
npm install -D tsx
```
Then edit `package.json` `scripts` to add these two entries (keep existing ones):
```json
    "test": "node --import tsx --test \"src/**/*.test.ts\" \"scripts/**/*.test.ts\"",
    "gen-refs": "node --env-file-if-exists=.env --import tsx scripts/gen-refs.ts"
```

- [ ] **Step 2: Write the failing codec test**

Create `src/lib/ref.test.ts`:
```ts
process.env.REF_SECRET ||= "test-secret-do-not-use-in-prod";

import { test } from "node:test";
import assert from "node:assert/strict";
import { encodeRef, decodeRef } from "./ref";

test("round-trips a range of nicknames", () => {
  for (const name of ["boyarskiy", "cryptoAnna", "joe", "Ирина", "a", "🚀nick"]) {
    assert.equal(decodeRef(encodeRef(name)), name);
  }
});

test("same nickname yields varied codes that all decode back", () => {
  const codes = new Set<string>();
  for (let i = 0; i < 20; i++) {
    const code = encodeRef("boyarskiy");
    codes.add(code);
    assert.equal(decodeRef(code), "boyarskiy");
  }
  assert.ok(codes.size > 1, "expected the random nonce to vary the code");
});

test("decodeRef returns null on empty input", () => {
  assert.equal(decodeRef(""), null);
});

test("decodeRef never throws on garbage", () => {
  assert.doesNotThrow(() => decodeRef("~~~not-valid~~~"));
  assert.doesNotThrow(() => decodeRef("%%%%"));
});
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npm test`
Expected: FAIL — cannot find module `./ref` (file not created yet).

- [ ] **Step 4: Write the codec**

Create `src/lib/ref.ts`:
```ts
import { createHmac, randomBytes } from "node:crypto";

/**
 * Reversible, stateless obfuscation for blogger referral codes. NOT encryption:
 * the goal is only that a casual viewer of the URL can't read the nickname.
 * Keyed off REF_SECRET; a random nonce byte masks patterns so similar
 * nicknames don't produce similar-looking codes.
 */

const NONCE_BYTES = 1;

function secret(): string {
  const value = process.env.REF_SECRET;
  if (!value) throw new Error("REF_SECRET is not set");
  return value;
}

/** HMAC-SHA256(secret, nonce || counter), concatenated to `length` bytes. */
function keystream(nonce: Buffer, length: number): Buffer {
  const out = Buffer.alloc(length);
  let offset = 0;
  let counter = 0;
  while (offset < length) {
    const block = createHmac("sha256", secret())
      .update(nonce)
      .update(Buffer.from([counter & 0xff]))
      .digest();
    const n = Math.min(block.length, length - offset);
    block.copy(out, offset, 0, n);
    offset += n;
    counter++;
  }
  return out;
}

export function encodeRef(nickname: string): string {
  const data = Buffer.from(nickname, "utf8");
  const nonce = randomBytes(NONCE_BYTES);
  const ks = keystream(nonce, data.length);
  const masked = Buffer.alloc(data.length);
  for (let i = 0; i < data.length; i++) masked[i] = data[i] ^ ks[i];
  return Buffer.concat([nonce, masked]).toString("base64url");
}

export function decodeRef(code: string): string | null {
  try {
    if (!code) return null;
    const payload = Buffer.from(code, "base64url");
    if (payload.length < NONCE_BYTES) return null;
    const nonce = payload.subarray(0, NONCE_BYTES);
    const masked = payload.subarray(NONCE_BYTES);
    const ks = keystream(Buffer.from(nonce), masked.length);
    const data = Buffer.alloc(masked.length);
    for (let i = 0; i < masked.length; i++) data[i] = masked[i] ^ ks[i];
    const text = data.toString("utf8");
    // Reject inputs whose bytes aren't valid UTF-8 (round-trip changes length).
    if (Buffer.byteLength(text, "utf8") !== data.length) return null;
    return text;
  } catch {
    return null;
  }
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npm test`
Expected: PASS — all four codec tests pass.

- [ ] **Step 6: Document env vars**

Append to `.env.example`:
```
# Secret for obfuscating blogger referral codes in links. Any long random string.
# Rotating it invalidates previously generated links.
REF_SECRET=
# Base URL the generator script builds links against.
REF_BASE_URL=https://protectcryptoland.com
```

- [ ] **Step 7: Set a real secret in .env**

Run (appends only if not already present):
```bash
grep -q '^REF_SECRET=' .env || printf 'REF_SECRET=%s\n' "$(node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))")" >> .env
```

- [ ] **Step 8: Typecheck and commit**

Run: `npm run typecheck`
Expected: no errors.
```bash
git add src/lib/ref.ts src/lib/ref.test.ts package.json package-lock.json .env.example
git commit -m "feat: add reversible referral-code codec"
```
(Do not commit `.env` — it is gitignored.)

---

### Task 2: Generator script

**Files:**
- Create: `scripts/gen-refs.lib.ts` (pure, testable helpers)
- Create: `scripts/gen-refs.ts` (thin CLI entry)
- Test: `scripts/gen-refs.lib.test.ts`

**Interfaces:**
- Consumes: `encodeRef` from `../src/lib/ref`.
- Produces (from `gen-refs.lib.ts`):
  - `parseUsernames(argv: string[]): string[]` — expands `--file <path>` (one username per line; blank lines and `#` comments skipped) and positional args, in order.
  - `buildLinks(names: string[], baseUrl: string): { name: string; url: string }[]` — `url = "<baseUrl without trailing slash>/<encodeRef(name)>"`.
  - `formatTable(links: { name: string; url: string }[]): string` — right-pads urls to equal width, `"<url>   →  <name>"` per line, joined by `\n`.

- [ ] **Step 1: Write the failing script-lib test**

Create `scripts/gen-refs.lib.test.ts`:
```ts
process.env.REF_SECRET ||= "test-secret-do-not-use-in-prod";

import { test } from "node:test";
import assert from "node:assert/strict";
import { writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { randomBytes } from "node:crypto";
import { parseUsernames, buildLinks, formatTable } from "./gen-refs.lib";
import { decodeRef } from "../src/lib/ref";

test("parseUsernames reads positional args", () => {
  assert.deepEqual(parseUsernames(["a", "b"]), ["a", "b"]);
});

test("parseUsernames reads a --file, skipping blanks and # comments", () => {
  const path = join(tmpdir(), `refs-${randomBytes(6).toString("hex")}.txt`);
  writeFileSync(path, "# comment\nboyarskiy\n\n  cryptoAnna  \n");
  assert.deepEqual(parseUsernames(["--file", path]), ["boyarskiy", "cryptoAnna"]);
});

test("parseUsernames combines file and positional args in order", () => {
  const path = join(tmpdir(), `refs-${randomBytes(6).toString("hex")}.txt`);
  writeFileSync(path, "fromfile\n");
  assert.deepEqual(parseUsernames(["--file", path, "extra"]), ["fromfile", "extra"]);
});

test("buildLinks produces decodable urls under the base url", () => {
  const links = buildLinks(["joe"], "https://x.com/");
  assert.equal(links.length, 1);
  assert.ok(links[0].url.startsWith("https://x.com/"));
  const code = links[0].url.slice("https://x.com/".length);
  assert.equal(decodeRef(code), "joe");
});

test("formatTable aligns and shows each nickname", () => {
  const out = formatTable([
    { name: "joe", url: "https://x.com/aa" },
    { name: "anna", url: "https://x.com/bbbbb" },
  ]);
  const lines = out.split("\n");
  assert.equal(lines.length, 2);
  assert.ok(lines[0].includes("→") && lines[0].includes("joe"));
  assert.ok(lines[1].includes("anna"));
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL — cannot find module `./gen-refs.lib`.

- [ ] **Step 3: Write the script-lib helpers**

Create `scripts/gen-refs.lib.ts`:
```ts
import { readFileSync } from "node:fs";
import { encodeRef } from "../src/lib/ref";

export function parseUsernames(argv: string[]): string[] {
  const names: string[] = [];
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--file") {
      const path = argv[++i];
      if (!path) throw new Error("--file requires a path");
      for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith("#")) names.push(trimmed);
      }
    } else {
      names.push(arg);
    }
  }
  return names;
}

export function buildLinks(names: string[], baseUrl: string): { name: string; url: string }[] {
  const base = baseUrl.replace(/\/+$/, "");
  return names.map((name) => ({ name, url: `${base}/${encodeRef(name)}` }));
}

export function formatTable(links: { name: string; url: string }[]): string {
  const width = Math.max(0, ...links.map((l) => l.url.length));
  return links.map((l) => `${l.url.padEnd(width)}   →  ${l.name}`).join("\n");
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test`
Expected: PASS — all codec and script-lib tests pass.

- [ ] **Step 5: Write the CLI entry**

Create `scripts/gen-refs.ts`:
```ts
import { parseUsernames, buildLinks, formatTable } from "./gen-refs.lib";

function main(): void {
  if (!process.env.REF_SECRET) {
    console.error("REF_SECRET is not set. Add it to .env or pass REF_SECRET=... inline.");
    process.exit(1);
  }
  const baseUrl = process.env.REF_BASE_URL || "https://protectcryptoland.com";

  let names: string[];
  try {
    names = parseUsernames(process.argv.slice(2));
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
    return;
  }

  if (names.length === 0) {
    console.error("No usernames given. Usage: npm run gen-refs -- <user> [user...] [--file list.txt]");
    process.exit(1);
  }

  console.log(formatTable(buildLinks(names, baseUrl)));
}

main();
```

- [ ] **Step 6: Smoke-test the CLI**

Run: `npm run gen-refs -- boyarskiy cryptoAnna joe`
Expected: three aligned lines, each `https://protectcryptoland.com/<code>   →  <name>`.

- [ ] **Step 7: Typecheck and commit**

Run: `npm run typecheck`
Expected: no errors.
```bash
git add scripts/gen-refs.ts scripts/gen-refs.lib.ts scripts/gen-refs.lib.test.ts
git commit -m "feat: add referral link generator script"
```

---

### Task 3: Middleware to serve code-paths

**Files:**
- Create: `src/middleware.ts`

**Interfaces:**
- Produces: a Next.js middleware that rewrites any non-asset, non-api path to `/` (browser URL unchanged), so `/<code>` renders the homepage.

- [ ] **Step 1: Write the middleware**

Create `src/middleware.ts`:
```ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Referral links look like /k3Xf9aQ2vP. There is no such page, so without this
 * they would 404. Rewrite any non-asset path to the homepage; the browser URL
 * is kept, so the client can still read the code from the path.
 */
export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = "/";
  return NextResponse.rewrite(url);
}

export const config = {
  // Everything except /api/*, Next internals, and any path with a file extension.
  matcher: ["/((?!api|_next/static|_next/image|.*\\.).*)"],
};
```

- [ ] **Step 2: Verify build accepts the middleware**

Run: `npm run build`
Expected: build succeeds and the output lists a `Middleware` entry.

- [ ] **Step 3: Manually verify a code-path serves the homepage**

Run `npm run dev`, then in another shell:
```bash
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/k3Xf9aQ2vP
```
Expected: `200` (not `404`). Also confirm `curl http://localhost:3000/logo.svg` still `200`. Stop dev server.

- [ ] **Step 4: Commit**

```bash
git add src/middleware.ts
git commit -m "feat: rewrite referral code-paths to the homepage"
```

---

### Task 4: Capture only the referral

**Files:**
- Modify: `src/lib/attribution.ts` (full rewrite of the hook's data model)

**Interfaces:**
- Produces: `useAttribution(): Attribution | null` where `Attribution = { ref?: string; referrer?: string; landedAt: string }`. `ref` is taken from the first path segment, else the `?ref=` query value; capped at `MAX_REF = 200`. No other query params are read.

- [ ] **Step 1: Rewrite the attribution hook**

Replace the entire contents of `src/lib/attribution.ts` with:
```ts
"use client";

import { useEffect, useState } from "react";

export type Attribution = {
  /** The blogger referral code — from the path segment or ?ref=. Absent for direct visits. */
  ref?: string;
  /** Where they came from, when the browser tells us. */
  referrer?: string;
  landedAt: string;
};

const STORAGE_KEY = "attribution";

// The ref is attacker-controlled and ends up in a Telegram message.
const MAX_REF = 200;

/**
 * Reads the referral from exactly two places and ignores every other query
 * param (fbclid, utm_*, …): the first path segment (obfuscated code), else ?ref=.
 */
function readRef(): string | undefined {
  const segment = window.location.pathname.split("/").filter(Boolean)[0];
  if (segment && !segment.includes(".")) {
    return decodeURIComponent(segment).slice(0, MAX_REF);
  }
  const query = new URLSearchParams(window.location.search).get("ref");
  if (query) return query.slice(0, MAX_REF);
  return undefined;
}

/**
 * Captures the referral once per session so it still reaches the form after the
 * visitor has scrolled, switched language, or followed an in-page anchor.
 * Last touch wins: arriving again with a new ref overwrites the stored one.
 */
export function useAttribution(): Attribution | null {
  const [attribution, setAttribution] = useState<Attribution | null>(null);

  useEffect(() => {
    const ref = readRef();

    if (ref) {
      const fresh: Attribution = {
        ref,
        referrer: document.referrer || undefined,
        landedAt: new Date().toISOString(),
      };
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
      setAttribution(fresh);
      return;
    }

    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setAttribution(JSON.parse(stored) as Attribution);
        return;
      } catch {
        sessionStorage.removeItem(STORAGE_KEY);
      }
    }

    // Direct visit with no ref — still worth recording the referrer.
    setAttribution({
      referrer: document.referrer || undefined,
      landedAt: new Date().toISOString(),
    });
  }, []);

  return attribution;
}
```

- [ ] **Step 2: Find consumers of the old `params` field**

Run: `grep -rn "attribution" src/components src/app --include=*.tsx --include=*.ts`
Expected: identify where `useAttribution()` result is sent to the API (the contact form). Confirm it forwards the whole `attribution` object (not `attribution.params` specifically). If any code reads `.params`, note it for Step 3.

- [ ] **Step 3: Update the contact form if it references `.params`**

If Step 2 found a reference to `attribution.params`, remove it (the form should send the whole `attribution` object as-is). If it already sends the whole object, no change is needed. Show the diff you made (or state "no change needed").

- [ ] **Step 4: Typecheck and commit**

Run: `npm run typecheck`
Expected: no errors.
```bash
git add src/lib/attribution.ts
git commit -m "feat: capture only the referral, drop multi-param attribution"
```

---

### Task 5: Decode the ref in the contact route

**Files:**
- Modify: `src/app/api/contact/route.ts`

**Interfaces:**
- Consumes: `decodeRef` from `@/lib/ref`; `Attribution = { ref?: string; referrer?: string }`.
- Produces: a Telegram Source block that shows `• Referred by: <nickname>` when the ref decodes, `• Ref: <raw>` when it doesn't, plus the referrer line, or `• Direct — no referral`.

- [ ] **Step 1: Update the Attribution type and import**

In `src/app/api/contact/route.ts`, add to the imports at the top:
```ts
import { decodeRef } from "@/lib/ref";
```
Replace the existing `type Attribution = { ... }` block with:
```ts
type Attribution = {
  ref?: string;
  referrer?: string;
  landedAt?: string;
};
```

- [ ] **Step 2: Replace `parseAttribution`**

Replace the whole `parseAttribution` function (and remove the now-unused `MAX_PARAMS`/`MAX_KEY`/`MAX_VALUE` constants) with:
```ts
const MAX_REF = 200;

/** The client is not trusted: re-apply caps here before anything reaches Telegram. */
function parseAttribution(value: unknown): Attribution | undefined {
  if (typeof value !== "object" || value === null) return undefined;
  const { ref, referrer } = value as Record<string, unknown>;
  return { ref: text(ref, MAX_REF), referrer: text(referrer, 300) };
}
```

- [ ] **Step 3: Replace the Source block in `formatMessage`**

In `formatMessage`, replace everything from `lines.push("", "<b>Source</b>");` through the end of the referrer handling (the block that iterated `params`) with:
```ts
  lines.push("", "<b>Source</b>");

  const ref = lead.attribution?.ref;
  if (ref) {
    const nickname = decodeRef(ref);
    if (nickname) {
      lines.push(`• Referred by: <code>${escapeHtml(nickname)}</code>`);
    } else {
      lines.push(`• Ref: <code>${escapeHtml(ref)}</code>`);
    }
  }

  if (lead.attribution?.referrer) {
    lines.push(`• Referrer: ${escapeHtml(lead.attribution.referrer)}`);
  }

  if (!ref && !lead.attribution?.referrer) {
    lines.push("• Direct — no referral");
  }
```

- [ ] **Step 4: Typecheck**

Run: `npm run typecheck`
Expected: no errors (no lingering references to `params`, `MAX_PARAMS`, etc.). If any remain, remove them.

- [ ] **Step 5: End-to-end verification**

Generate a code and drive the real flow:
```bash
npm run gen-refs -- boyarskiy
```
Copy the code from the output URL. Start `npm run dev`. Then POST a lead carrying that code as a decoded ref, simulating what the client sends:
```bash
CODE="<paste the code from the URL>"
curl -s -X POST http://localhost:3000/api/contact \
  -H 'Content-Type: application/json' \
  -d "{\"name\":\"Test Lead\",\"email\":\"t@example.com\",\"attribution\":{\"ref\":\"$CODE\"}}"
```
Because Telegram is unconfigured locally, the route logs the formatted message to the dev-server console. Confirm that log contains `Referred by: boyarskiy` (not the raw code). Stop the dev server.

- [ ] **Step 6: Commit**

```bash
git add src/app/api/contact/route.ts
git commit -m "feat: decode referral code to nickname in Telegram lead"
```

---

## Notes for the implementer

- Run `npm test` after Tasks 1 and 2; it covers the codec and the script helpers. Tasks 3–5 are verified by build, curl, and typecheck as written in their steps.
- If `npm run build` in Task 3 complains that `.env` values are required, that is unrelated to middleware — proceed; the middleware entry is what matters.
- The `.env` file is gitignored; never `git add` it. Only `.env.example` is committed.
