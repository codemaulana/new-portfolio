interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

export function checkRateLimit({
  key,
  limit,
  windowMs,
}: {
  key: string;
  limit: number;
  windowMs: number;
}) {
  const now = Date.now();
  const current = store.get(key);

  if (!current || now > current.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1, retryAfterSeconds: 0 };
  }

  if (current.count >= limit) {
    const retryAfterSeconds = Math.ceil((current.resetAt - now) / 1000);
    return { allowed: false, remaining: 0, retryAfterSeconds };
  }

  current.count += 1;
  store.set(key, current);

  return { allowed: true, remaining: limit - current.count, retryAfterSeconds: 0 };
}

export function resetRateLimit(key: string) {
  store.delete(key);
}
