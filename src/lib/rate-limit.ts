type Bucket = { hits: number[] };

const buckets = new Map<string, Bucket>();

const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;
const MAX_TRACKED_CLIENTS = 10_000;

export function clientKey(request: Request): string {
  const headers = request.headers;
  const candidate =
    headers.get("cf-connecting-ip") ||
    headers.get("x-real-ip") ||
    headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return candidate || "unknown";
}

export function rateLimit(key: string, now = Date.now()): { allowed: boolean; retryAfter: number } {
  if (buckets.size > MAX_TRACKED_CLIENTS) buckets.clear();

  const bucket = buckets.get(key) ?? { hits: [] };
  bucket.hits = bucket.hits.filter((at) => now - at < WINDOW_MS);

  if (bucket.hits.length >= MAX_HITS) {
    buckets.set(key, bucket);
    const oldest = bucket.hits[0];
    return { allowed: false, retryAfter: Math.ceil((WINDOW_MS - (now - oldest)) / 1000) };
  }

  bucket.hits.push(now);
  buckets.set(key, bucket);
  return { allowed: true, retryAfter: 0 };
}

export function resetRateLimits(): void {
  buckets.clear();
}
