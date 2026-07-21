#!/usr/bin/env bash

set -euo pipefail

if [[ $EUID -ne 0 ]]; then echo "Run as root (sudo)."; exit 1; fi
command -v curl >/dev/null || { echo "curl required"; exit 1; }

PORTS="80,443"
TAG="cf-origin"

apply() {
  local ipt="$1" v4="$2"
  local url_ips
  url_ips=$([[ "$v4" == "4" ]] && echo "https://www.cloudflare.com/ips-v4" || echo "https://www.cloudflare.com/ips-v6")

  $ipt -L DOCKER-USER >/dev/null 2>&1 || { echo "DOCKER-USER chain missing — is Docker running?"; return; }

  while $ipt -S DOCKER-USER | grep -q -- "--comment \"$TAG\""; do
    local rule
    rule=$($ipt -S DOCKER-USER | grep -- "--comment \"$TAG\"" | head -1 | sed 's/^-A //')
    $ipt -D DOCKER-USER $rule
  done

  local ranges
  ranges=$(curl -fsSL "$url_ips")
  [[ -n "$ranges" ]] || { echo "Could not fetch $url_ips"; return; }
  while read -r cidr; do
    [[ -z "$cidr" ]] && continue
    $ipt -I DOCKER-USER -s "$cidr" -p tcp -m multiport --dports "$PORTS" \
        -m comment --comment "$TAG" -j RETURN
  done <<< "$ranges"

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
echo "  iptables  -S DOCKER-USER | grep '$TAG'"
