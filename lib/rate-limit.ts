const store = new Map<string, { count: number; expiresAt: number }>();

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes per TRD §4.1
const MAX = 3;

export function checkRateLimit(ip: string): { allowed: boolean } {
  const now = Date.now();
  const existing = store.get(ip);

  if (!existing || now > existing.expiresAt) {
    store.set(ip, { count: 1, expiresAt: now + WINDOW_MS });
    return { allowed: true };
  }

  if (existing.count >= MAX) {
    return { allowed: false };
  }

  existing.count++;
  return { allowed: true };
}
