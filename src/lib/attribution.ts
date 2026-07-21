"use client";

import { useEffect, useState } from "react";

export type Attribution = {
  ref?: string;
  referrer?: string;
  landedAt: string;
};

const STORAGE_KEY = "attribution";

const MAX_REF = 200;

function readRef(): string | undefined {
  const segment = window.location.pathname.split("/").filter(Boolean)[0];
  if (segment && !segment.includes(".")) {
    return decodeURIComponent(segment).slice(0, MAX_REF);
  }
  const query = new URLSearchParams(window.location.search).get("ref");
  if (query) return query.slice(0, MAX_REF);
  return undefined;
}

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

    setAttribution({
      referrer: document.referrer || undefined,
      landedAt: new Date().toISOString(),
    });
  }, []);

  return attribution;
}
