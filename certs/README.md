# Cloudflare Origin Certificate

Caddy uses a **Cloudflare Origin Certificate** to secure the Cloudflare↔origin
hop (Cloudflare terminates the public TLS at its edge). These files live only on
the server — they are **git-ignored and must never be committed**.

## Generate and install (one time)

1. In the Cloudflare dashboard for `coresec.finance`:
   **SSL/TLS → Origin Server → Create Certificate**.
   - Keep the defaults (RSA, hostnames `coresec.finance` and `*.coresec.finance`,
     15-year validity) and click **Create**.
2. On the VPS, from the repo root, save the two blocks Cloudflare shows you:
   - **Origin Certificate** → `certs/origin.pem`
   - **Private Key** → `certs/origin.key`
3. Lock down the key:
   ```bash
   chmod 600 certs/origin.key
   ```
4. Bring Caddy up with the new mounts:
   ```bash
   docker compose up -d
   ```
5. In Cloudflare, **SSL/TLS → Overview → set mode to Full (strict)**.

> ⚠️ The cert + key must exist **before** `docker compose up`, otherwise Docker
> creates empty directories at those mount paths and Caddy fails to start.

## Rollback to Let's Encrypt

Revert `Caddyfile` (restore `tls {$ACME_EMAIL}`) and remove the two cert mounts
from `docker-compose.yml`, set `DOMAIN`/`ACME_EMAIL` in `.env`, then
`docker compose up -d`. Requires the domain to point directly at the origin
again (grey-cloud in Cloudflare, or move nameservers back).
