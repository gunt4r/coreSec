"use client";

import { useEffect } from "react";

const PIXEL_ID = "28591060267192525";
const FLAG = "fb_ref";

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

function isFacebookVisit(): boolean {
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

export function FacebookPixel() {
  useEffect(() => {
    if (!isFacebookVisit()) return;
    bootstrap();
    window.fbq?.("init", PIXEL_ID);
    window.fbq?.("track", "PageView");
  }, []);

  return null;
}
