import { createHmac, randomBytes } from "node:crypto";

/**
 * Reversible, stateless obfuscation for blogger referral codes. NOT encryption:
 * the goal is only that a casual viewer of the URL can't read the nickname.
 * Keyed off REF_SECRET; a random nonce byte masks patterns so similar
 * nicknames don't produce similar-looking codes.
 */

const NONCE_BYTES = 1;

function secret(): string {
  const value = process.env.REF_SECRET;
  if (!value) throw new Error("REF_SECRET is not set");
  return value;
}

/** HMAC-SHA256(secret, nonce || counter), concatenated to `length` bytes. */
function keystream(nonce: Buffer, length: number): Buffer {
  const out = Buffer.alloc(length);
  let offset = 0;
  let counter = 0;
  while (offset < length) {
    const block = createHmac("sha256", secret())
      .update(nonce)
      .update(Buffer.from([counter & 0xff]))
      .digest();
    const n = Math.min(block.length, length - offset);
    block.copy(out, offset, 0, n);
    offset += n;
    counter++;
  }
  return out;
}

export function encodeRef(nickname: string): string {
  const data = Buffer.from(nickname, "utf8");
  const nonce = randomBytes(NONCE_BYTES);
  const ks = keystream(nonce, data.length);
  const masked = Buffer.alloc(data.length);
  for (let i = 0; i < data.length; i++) masked[i] = data[i] ^ ks[i];
  return Buffer.concat([nonce, masked]).toString("base64url");
}

export function decodeRef(code: string): string | null {
  try {
    if (!code) return null;
    const payload = Buffer.from(code, "base64url");
    if (payload.length < NONCE_BYTES) return null;
    const nonce = payload.subarray(0, NONCE_BYTES);
    const masked = payload.subarray(NONCE_BYTES);
    const ks = keystream(Buffer.from(nonce), masked.length);
    const data = Buffer.alloc(masked.length);
    for (let i = 0; i < masked.length; i++) data[i] = masked[i] ^ ks[i];
    const text = data.toString("utf8");
    // Reject inputs whose bytes aren't valid UTF-8 (round-trip changes length).
    if (Buffer.byteLength(text, "utf8") !== data.length) return null;
    return text;
  } catch {
    return null;
  }
}
