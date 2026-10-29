// In-memory rate limits for server.mjs. Every limit is a per-client bucket PLUS a global one, so a single client cannot
// use up the budget of the whole class, and a whole class (one school NAT address) is not locked out by a small
// per-client number. Everything is bounded in memory and resets on restart.

// The client is the last X-Forwarded-For hop (what Railway's proxy appends; earlier hops are client-controlled), or the
// socket address when there is no proxy.
export function clientOf(request) {
  return String(request.headers['x-forwarded-for'] ?? '').split(',').at(-1).trim() || request.socket?.remoteAddress || 'unknown';
}

// Positive integer from an environment value, else the default.
export function intFrom(value, fallback, { min = 1 } = {}) {
  const number = typeof value === 'string' && /^\d{1,9}$/.test(value.trim()) ? Number(value.trim()) : NaN;
  return Number.isInteger(number) && number >= min ? number : fallback;
}

// take(client) returns null when full (nothing is consumed), otherwise { release } that gives the slot back again
// (used when the request did not complete: a failed email must not cost the student an attempt).
export function createLimiter({ perClient, global, windowMs = 3600000, maxClients = 5000, now = Date.now }) {
  const clients = new Map(); // client -> timestamps, oldest first, at most perClient entries
  let all = [];
  const fresh = (list, t) => { while (list.length && t - list[0] >= windowMs) list.shift(); return list; };
  const prune = (t) => {
    for (const [key, list] of clients) if (!fresh(list, t).length) clients.delete(key);
    // Still too many distinct clients: forget the least recently added ones. The global bucket keeps counting.
    for (const key of clients.keys()) { if (clients.size < maxClients) break; clients.delete(key); }
  };
  return {
    take(client) {
      const t = now();
      fresh(all, t);
      const own = fresh(clients.get(client) ?? [], t);
      if (all.length >= global || own.length >= perClient) return null;
      if (!clients.has(client)) {
        if (clients.size >= maxClients) prune(t);
        clients.set(client, own);
      }
      own.push(t);
      all.push(t);
      return {
        release() {
          const a = all.indexOf(t); if (a >= 0) all.splice(a, 1);
          const o = clients.get(client)?.indexOf(t) ?? -1; if (o >= 0) clients.get(client).splice(o, 1);
        }
      };
    },
    size: () => clients.size
  };
}

// A rolling counter (the OpenAI calls of the last 24 hours): at most `cap` timestamps are ever held.
export function createCounter({ cap, windowMs = 86400000, now = Date.now }) {
  const times = [];
  const fresh = () => { const t = now(); while (times.length && t - times[0] >= windowMs) times.shift(); };
  return {
    available() { fresh(); return times.length < cap; },
    spend() { fresh(); if (times.length < cap) times.push(now()); },
    used() { fresh(); return times.length; }
  };
}

// Caches an async lookup for `ms`; concurrent callers share one call, and a failure is not cached.
export function cachedFor(ms, fn, now = Date.now) {
  let value; let at = -Infinity; let inflight;
  return async () => {
    if (now() - at < ms) return value;
    inflight ??= fn().then((result) => { value = result; at = now(); return result; }).finally(() => { inflight = undefined; });
    return inflight;
  };
}
