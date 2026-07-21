# Operations

Non-obvious behaviour of the deployment and of a few code paths. The source files carry no
comments, so this is the only place these things are written down.

## Cloudflare sits in front of the origin

Public TLS is terminated by Cloudflare, not by Caddy.

- **Caddy no longer does ACME.** Cloudflare intercepts the `:80`/`:443` challenge traffic, so
  Let's Encrypt cannot validate the origin any more. The Cloudflare **Origin Certificate**
  (`certs/origin.pem` + `certs/origin.key`) is mandatory, not an optimisation. See
  `certs/README.md` for how to generate it.
- The Origin cert covers `coresec.finance` **and** `*.coresec.finance`, so the apex and `www`
  both work from the one file.
- Cloudflare's SSL mode must be **Full (strict)**. "Flexible" causes an infinite redirect loop,
  because Caddy forces HTTPS and Cloudflare would keep speaking HTTP to it.
- `ACME_EMAIL` is still read in `docker-compose.yml` but is unused — it is kept so rolling back
  to Let's Encrypt is a one-line change.

### The cert files must exist before `docker compose up`

They are bind-mounted. If the paths do not exist on the host, **Docker silently creates
directories there** and Caddy fails to start with a confusing error. Create both files first,
then `chmod 600 certs/origin.key`, then bring the stack up.

They are git-ignored (`certs/*.pem`, `certs/*.key`) and must never be committed.

## Firewall: use DOCKER-USER, not ufw

`scripts/cloudflare-origin-firewall.sh` locks ports 80/443 to Cloudflare's published IP ranges.

- **Docker publishes ports through its own iptables chains and bypasses `ufw` entirely.** A `ufw`
  rule will appear to work and will do nothing. `DOCKER-USER` is the only chain that filters
  traffic destined for containers.
- **SSH is unaffected** — traffic to the host does not traverse `DOCKER-USER`, so the script
  cannot lock you out. Only container-bound `:80`/`:443` changes.
- The script is idempotent: it tags its own rules with the comment `cf-origin` and removes them
  before re-adding, so re-running it just refreshes Cloudflare's ranges. Do that periodically —
  Cloudflare adds ranges.
- Rules are not persistent across reboots by default. `apt-get install iptables-persistent &&
  netfilter-persistent save`.

Run it only *after* confirming the site works through Cloudflare, or you will block yourself
before you know whether the proxy path is healthy.

## Referral codes are obfuscation, not encryption

`src/lib/ref.ts` XORs the nickname against an HMAC-SHA256 keystream keyed on `REF_SECRET`, with
a one-byte random nonce so similar nicknames don't produce similar codes.

The goal is only that someone reading the URL cannot see the blogger's name. It is **not**
authenticated and **not** encryption — do not use it for anything that needs to resist tampering.

- `REF_SECRET` must be identical in production to wherever links were generated, or codes decode
  to garbage and attribution silently breaks.
- **Rotating `REF_SECRET` invalidates every link already handed to a blogger.** They keep
  working as URLs (the page still loads) but attribution is lost.
- `REF_SECRET` belongs in the server `.env` only. Never commit a real value to `.env.example`.

## Referral URLs and indexing

`src/proxy.ts` passes real routes through and rewrites everything else to the English homepage.

Referral codes are indistinguishable from junk paths, so they cannot be validated at the edge.
The rewrite keeps `coresec.finance/<code>` working for humans, and the served page carries
`<link rel="canonical" href="https://coresec.finance">`, which is what keeps an unbounded set of
duplicate URLs out of the index.

**The canonical is deliberately doing this alone.** These URLs previously also carried
`X-Robots-Tag: noindex, nofollow`. That was removed: Google drops a `noindex` URL from the index
and stops passing its signals, so every inbound blogger link — the site's main source of external
links — would have earned nothing. A canonical is the correct tool for a tracking URL, because it
consolidates the duplicate *and* credits the inbound link to the homepage. See `docs/BACKLINKS.md`.

If a referral path is ever seen ranking in search, the cause is the canonical not being served —
check that the rewrite still resolves to the homepage rather than reinstating `noindex`.

`src/lib/attribution.ts` reads the referral from the first path segment, so any new top-level
route must also be added to its exclusion list, or visitors to that route get attributed to a
blogger with that name.

## Content Security Policy

`script-src` includes `'unsafe-inline'`. This is deliberate: Next's inline bootstrap script
requires it unless a per-request nonce is used, and nonces force every page to render
dynamically, losing static generation for the whole site.

If the CSP needs to be tightened later, the upgrade is `strict-dynamic` + a nonce generated in
`src/proxy.ts` and threaded through the layout — accept the SSR cost knowingly.

HSTS is **not** set here. Cloudflare terminates public TLS, so HSTS belongs in the Cloudflare
dashboard; an origin-set header would only cover the Cloudflare↔origin hop.

## Form delivery

Leads go to Telegram and are stored nowhere else. If `TELEGRAM_BOT_TOKEN` / `TELEGRAM_CHAT_ID`
are missing the endpoint returns 500 and logs the lead, rather than returning success — a
misconfiguration must never look like a delivered lead.

`TELEGRAM_API_URL` can be overridden to point the delivery path at a local stub during testing.
