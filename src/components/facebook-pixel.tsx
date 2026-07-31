"use client";

import { useEffect } from "react";

const PIXEL_ID = "28591060267192525";
const FLAG = "fb_ref";
const LEAD_PENDING = "fb_lead_pending";

type Fbq = {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  loaded: boolean;
  version: string;
  push: Fbq;
};

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

export function isFacebookVisitor(): boolean {
  if (typeof window === "undefined") return false;
  const ref = new URLSearchParams(window.location.search).get("ref");
  if (ref === "facebook") {
    try {
      sessionStorage.setItem(FLAG, "1");
    } catch {
      return true;
    }
    return true;
  }
  try {
    return sessionStorage.getItem(FLAG) === "1";
  } catch {
    return false;
  }
}

function bootstrap(): void {
  if (window.fbq) return;

  const fbq = function (this: unknown, ...args: unknown[]) {
    if (fbq.callMethod) {
      fbq.callMethod(...args);
    } else {
      fbq.queue.push(args);
    }
  } as Fbq;

  fbq.queue = [];
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.push = fbq;

  window.fbq = fbq;
  window._fbq = fbq;

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);
}

function ensurePixel(): void {
  bootstrap();
  window.fbq?.("init", PIXEL_ID);
}

export function FacebookPixel() {
  useEffect(() => {
    if (!isFacebookVisitor()) return;
    ensurePixel();
    window.fbq?.("track", "PageView");
  }, []);

  return null;
}

export function hasLeadPending(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return sessionStorage.getItem(LEAD_PENDING) === "1";
  } catch {
    return false;
  }
}

export function markLeadPending(): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(LEAD_PENDING, "1");
  } catch {
    return;
  }
}

export function fireLeadIfPending(): void {
  if (typeof window === "undefined") return;
  if (!isFacebookVisitor()) return;

  let pending = false;
  try {
    pending = sessionStorage.getItem(LEAD_PENDING) === "1";
    if (pending) sessionStorage.removeItem(LEAD_PENDING);
  } catch {
    return;
  }
  if (!pending) return;

  ensurePixel();
  window.fbq?.("track", "Lead");
}
