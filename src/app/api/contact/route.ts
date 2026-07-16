import { NextResponse } from "next/server";
import { escapeHtml, isTelegramConfigured, sendTelegramMessage } from "@/lib/telegram";
import { decodeRef } from "@/lib/ref";

type Attribution = {
  ref?: string;
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

const MAX_REF = 200;

function text(value: unknown, max = 2000): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim().slice(0, max) : undefined;
}

/** The client is not trusted: re-apply caps here before anything reaches Telegram. */
function parseAttribution(value: unknown): Attribution | undefined {
  if (typeof value !== "object" || value === null) return undefined;
  const { ref, referrer } = value as Record<string, unknown>;
  return { ref: text(ref, MAX_REF), referrer: text(referrer, 300) };
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

  const ref = lead.attribution?.ref;
  if (ref) {
    const nickname = decodeRef(ref);
    if (nickname) {
      lines.push(`• Referred by: <code>${escapeHtml(nickname)}</code>`);
    } else {
      lines.push(`• Ref: <code>${escapeHtml(ref)}</code>`);
    }
  }

  if (lead.attribution?.referrer) {
    lines.push(`• Referrer: ${escapeHtml(lead.attribution.referrer)}`);
  }

  if (!ref && !lead.attribution?.referrer) {
    lines.push("• Direct — no referral");
  }

  return lines.join("\n");
}

export async function POST(request: Request) {
  const lead = parseLead(await request.json().catch(() => null));

  if (!lead) {
    return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
  }

  // A missing config must never look like success: that silently drops the lead while the
  // visitor is told we received it.
  if (!isTelegramConfigured()) {
    console.error(
      "[contact] TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID are not set — lead NOT delivered:\n" +
        formatMessage(lead),
    );
    return NextResponse.json({ error: "Delivery not configured" }, { status: 500 });
  }

  try {
    await sendTelegramMessage(formatMessage(lead));
  } catch (error) {
    // Tell the visitor it failed rather than pretending — the form shows its error state and they can retry.
    console.error("[contact] Telegram delivery failed", error);
    return NextResponse.json({ error: "Delivery failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
