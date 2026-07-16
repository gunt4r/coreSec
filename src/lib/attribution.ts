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
