"use client";

import { useEffect, useState } from "react";

export type Attribution = {
  /** Whatever query params the visitor landed with, e.g. { ref: "blogger-x", utm_source: "yt" }. Empty for direct visits. */
  params: Record<string, string>;
  /** Where they came from, when the browser tells us. */
  referrer?: string;
  landedAt: string;
};

const STORAGE_KEY = "attribution";

// Guard rails: the query string is attacker-controlled and ends up in a Telegram message.
const MAX_PARAMS = 12;
const MAX_KEY = 40;
const MAX_VALUE = 200;

function readParams(search: string): Record<string, string> {
  const params: Record<string, string> = {};
  for (const [key, value] of new URLSearchParams(search)) {
    if (Object.keys(params).length >= MAX_PARAMS) break;
    if (!key || !value) continue;
    params[key.slice(0, MAX_KEY)] = value.slice(0, MAX_VALUE);
  }
  return params;
}

/**
 * Captures the landing query string once per session, so it still reaches the form after the
 * visitor has scrolled, switched language, or followed an in-page anchor.
 * Last touch wins: arriving again with new params overwrites the stored ones.
 */
export function useAttribution(): Attribution | null {
  const [attribution, setAttribution] = useState<Attribution | null>(null);

  useEffect(() => {
    const params = readParams(window.location.search);

    if (Object.keys(params).length > 0) {
      const fresh: Attribution = {
        params,
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

    // Direct visit with no query string — still worth recording the referrer.
    setAttribution({
      params: {},
      referrer: document.referrer || undefined,
      landedAt: new Date().toISOString(),
    });
  }, []);

  return attribution;
}
