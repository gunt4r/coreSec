// Overridable so the delivery path can be pointed at a local stub without real credentials.
const API = process.env.TELEGRAM_API_URL ?? "https://api.telegram.org";

/** Everything in the message comes from the visitor, so escape it for Telegram's HTML parse mode. */
function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function isTelegramConfigured(): boolean {
  return Boolean(process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID);
}

export async function sendTelegramMessage(html: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    throw new Error("TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID must be set");
  }

  const res = await fetch(`${API}/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: html,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  });

  if (!res.ok) {
    // Telegram puts the real reason in the body; the status alone is rarely enough to debug.
    throw new Error(`Telegram sendMessage failed (${res.status}): ${await res.text()}`);
  }
}

export { escapeHtml };
