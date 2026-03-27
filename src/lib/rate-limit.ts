type Bucket = {
  count: number;
  resetAt: number;
};

const WINDOW_MS = 60_000;
const LIMIT = 20;
const buckets = new Map<string, Bucket>();

export function consumeRateLimit(key: string): { allowed: boolean; retryAfter: number } {
  const now = Date.now();
  const current = buckets.get(key);

  if (!current || now >= current.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, retryAfter: 0 };
  }

  if (current.count >= LIMIT) {
    return { allowed: false, retryAfter: Math.ceil((current.resetAt - now) / 1000) };
  }

  current.count += 1;
  buckets.set(key, current);
  return { allowed: true, retryAfter: 0 };
}

