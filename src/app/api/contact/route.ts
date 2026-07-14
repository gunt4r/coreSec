import { NextResponse } from "next/server";
import { escapeHtml, isTelegramConfigured, sendTelegramMessage } from "@/lib/telegram";

type Attribution = {
  params: Record<string, string>;
  referrer?: string;
  landedAt?: string;
};

type Lead = {
  name: string;
  email: string;
  telegram?: string;
  phone?: string;
  exchange?: string;
  situation?: string;
  lang?: string;
  attribution?: Attribution;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MAX_PARAMS = 12;
const MAX_KEY = 40;
const MAX_VALUE = 200;

function text(value: unknown, max = 2000): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim().slice(0, max) : undefined;
}

/** The client is not trusted: re-apply the same caps here before anything reaches Telegram. */
function parseAttribution(value: unknown): Attribution | undefined {
  if (typeof value !== "object" || value === null) return undefined;
  const { params, referrer } = value as Record<string, unknown>;

  const clean: Record<string, string> = {};
  if (typeof params === "object" && params !== null) {
    for (const [key, raw] of Object.entries(params as Record<string, unknown>)) {
      if (Object.keys(clean).length >= MAX_PARAMS) break;
      const v = text(raw, MAX_VALUE);
      if (v) clean[key.slice(0, MAX_KEY)] = v;
    }
  }

  return { params: clean, referrer: text(referrer, 300) };
}

function parseLead(body: unknown): Lead | null {
  if (typeof body !== "object" || body === null) return null;
  const record = body as Record<string, unknown>;

  const name = text(record.name, 200);
  const email = text(record.email, 200);
  if (!name || name.length < 2) return null;
  if (!email || !EMAIL.test(email)) return null;

  return {
    name,
    email,
    telegram: text(record.telegram, 200),
    phone: text(record.phone, 50),
    exchange: text(record.exchange, 200),
    situation: text(record.situation),
    lang: text(record.lang, 5),
    attribution: parseAttribution(record.attribution),
  };
}

function formatMessage(lead: Lead): string {
  const lines = [
    "🔔 <b>New application</b>",
    "",
    `<b>Name:</b> ${escapeHtml(lead.name)}`,
    `<b>Email:</b> ${escapeHtml(lead.email)}`,
  ];

  if (lead.telegram) lines.push(`<b>Telegram:</b> ${escapeHtml(lead.telegram)}`);
  if (lead.phone) lines.push(`<b>Phone:</b> ${escapeHtml(lead.phone)}`);
  if (lead.exchange) lines.push(`<b>Exchange:</b> ${escapeHtml(lead.exchange)}`);
  if (lead.lang) lines.push(`<b>Language:</b> ${escapeHtml(lead.lang.toUpperCase())}`);

  if (lead.situation) {
    lines.push("", "<b>Situation:</b>", escapeHtml(lead.situation));
  }

  lines.push("", "<b>Source</b>");
  const params = lead.attribution?.params ?? {};
  const entries = Object.entries(params);

  if (entries.length > 0) {
    for (const [key, value] of entries) {
      lines.push(`• ${escapeHtml(key)}: <code>${escapeHtml(value)}</code>`);
    }
  } else {
    lines.push("• Direct — no query parameters");
  }

  if (lead.attribution?.referrer) {
    lines.push(`• Referrer: ${escapeHtml(lead.attribution.referrer)}`);
  }

  return lines.join("\n");
}

export async function POST(request: Request) {
  const lead = parseLead(await request.json().catch(() => null));

  if (!lead) {
    return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
  }

  if (!isTelegramConfigured()) {
    // Keeps the form usable locally without credentials — but a lead would be lost in production.
    console.warn("[contact] Telegram is not configured; lead not delivered", formatMessage(lead));
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    await sendTelegramMessage(formatMessage(lead));
  } catch (error) {
    // Tell the visitor it failed rather than pretending — the form shows its error state and they can retry.
    console.error("[contact] Telegram delivery failed", error);
    return NextResponse.json({ error: "Delivery failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true, delivered: true });
}
