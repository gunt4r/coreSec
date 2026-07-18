#!/usr/bin/env bash
#
# Restrict the Docker-published web ports (80/443, served by Caddy) so ONLY
# Cloudflare can reach the origin. After this, hitting the raw origin IP
# (80.253.249.163) directly is dropped — visitors must come through Cloudflare,
# which keeps the origin hidden and makes the "blocked IP" problem un-retriggerable.
#
# WHY NOT ufw: Docker publishes ports via its own iptables chains and bypasses
# ufw entirely. The correct place to filter container traffic is DOCKER-USER.
#
# SSH is NOT affected: SSH to the host does not traverse DOCKER-USER, so you
# cannot lock yourself out with this script. Only :80/:443 to containers change.
#
# Run on the VPS as root:  sudo bash scripts/cloudflare-origin-firewall.sh
# Re-run any time to refresh Cloudflare's ranges (idempotent).

set -euo pipefail

if [[ $EUID -ne 0 ]]; then echo "Run as root (sudo)."; exit 1; fi
command -v curl >/dev/null || { echo "curl required"; exit 1; }

PORTS="80,443"
TAG="cf-origin"   # comment tag so we only touch our own rules

apply() {
  local ipt="$1" v4="$2"
  local url_ips
  url_ips=$([[ "$v4" == "4" ]] && echo "https://www.cloudflare.com/ips-v4" || echo "https://www.cloudflare.com/ips-v6")

  # Ensure DOCKER-USER exists (it does when Docker is running).
  $ipt -L DOCKER-USER >/dev/null 2>&1 || { echo "DOCKER-USER chain missing — is Docker running?"; return; }

  # Remove any rules we added before (match our comment tag), leaving Docker's own intact.
  while $ipt -S DOCKER-USER | grep -q -- "--comment \"$TAG\""; do
    local rule
    rule=$($ipt -S DOCKER-USER | grep -- "--comment \"$TAG\"" | head -1 | sed 's/^-A //')
    # shellcheck disable=SC2086
    $ipt -D DOCKER-USER $rule
  done

  # Allow Cloudflare ranges to the web ports (insert at top).
  local ranges
  ranges=$(curl -fsSL "$url_ips")
  [[ -n "$ranges" ]] || { echo "Could not fetch $url_ips"; return; }
  while read -r cidr; do
    [[ -z "$cidr" ]] && continue
    $ipt -I DOCKER-USER -s "$cidr" -p tcp -m multiport --dports "$PORTS" \
        -m comment --comment "$TAG" -j RETURN
  done <<< "$ranges"

  # Drop everyone else on the web ports (appended AFTER the allows above).
  $ipt -A DOCKER-USER -p tcp -m multiport --dports "$PORTS" \
      -m comment --comment "$TAG" -j DROP

  echo "[$([[ $v4 == 4 ]] && echo IPv4 || echo IPv6)] web ports locked to Cloudflare."
}

apply iptables  4
apply ip6tables 6

echo
echo "Done. To make this survive reboots, install persistence and save:"
echo "  apt-get install -y netfilter-persistent iptables-persistent"
echo "  netfilter-persistent save"
echo
echo "To undo: re-run with the DROP removed, or flush our tag:"
echo "  iptables  -S DOCKER-USER | grep '$TAG'   # inspect"
