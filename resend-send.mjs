// Outgoing Resend calls for server.mjs: paced (Resend allows only a few requests a second per team, and a class
// finishing together would hit HTTP 429) and retried with the SAME Idempotency-Key, so a retry can never send twice.
// Nothing is logged here. Time and sleeping are injectable so tests run fast.

const ATTEMPT_TIMEOUT_MS = 15000;
const MAX_RETRIES = 3;
const RETRY_CAP_MS = 5000;     // one wait between attempts
const RETRY_BUDGET_MS = 12000; // no new retry is started after this long since the first attempt began
const MAX_PACING_WAIT_MS = 15000; // a request that would wait longer in line is refused (bounded queue)

export class ResendBusyError extends Error {
  constructor() { super('Resend queue is full'); this.name = 'ResendBusyError'; }
}

// What Resend answers for a conflicting Idempotency-Key (docs: resend.com/docs/dashboard/emails/idempotency-keys):
// 409 invalid_idempotent_request = this key was already used with a different payload (the email went out earlier);
// 409 concurrent_idempotent_requests = the first request with the key is still running (retry later).
export const isAlreadyAccepted = (status, data) => status === 409 && data?.name === 'invalid_idempotent_request';
const isConcurrent = (status, data) => status === 409 && data?.name === 'concurrent_idempotent_requests';

export function createResendSender({ fetchImpl, rps = 2, now = Date.now, sleep = ms => new Promise(resolve => setTimeout(resolve, ms)) }) {
  const perSecond = Math.max(1, Math.floor(rps));
  const starts = []; // the last `perSecond` start times handed out, ascending

  // Waits for this request's start slot: at most `perSecond` starts in any second. Idle = no wait. Slots are handed
  // out in order, so nothing is lost or reordered.
  async function pace(deadline) {
    const t = now();
    let start = t;
    if (starts.length >= perSecond) start = Math.max(start, starts[starts.length - perSecond] + 1000);
    start = Math.max(start, starts.at(-1) ?? 0);
    const wait = start - t;
    if (wait > Math.min(MAX_PACING_WAIT_MS, Math.max(0, deadline - t - 2000))) throw new ResendBusyError();
    starts.push(start);
    if (starts.length > perSecond) starts.shift();
    if (wait > 0) await sleep(wait);
  }

  // Resolves to { status, ok, data } of the final attempt; throws when every attempt failed without an answer
  // (network error / timeout) or the queue is full. `deadline` is the absolute time the whole request must be done by.
  return async function send(url, init, { deadline = now() + 40000 } = {}) {
    const began = now();
    let lastError;
    let last;
    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      await pace(deadline);
      let retryAfter;
      const remaining = deadline - now();
      if (remaining < 1000 && attempt > 0) { if (last && !lastError) return last; throw lastError ?? new Error('Resend unavailable'); }
      try {
        const result = await fetchImpl(url, { ...init, signal: AbortSignal.timeout(Math.max(1000, Math.min(ATTEMPT_TIMEOUT_MS, remaining))) });
        const data = await result.json().catch(() => ({}));
        const retryable = result.status === 429 || result.status >= 500 || isConcurrent(result.status, data);
        if (!retryable || attempt === MAX_RETRIES) return { status: result.status, ok: result.ok, data };
        const header = Number(result.headers?.get?.('retry-after'));
        retryAfter = Number.isFinite(header) && header >= 0 ? header * 1000 : undefined;
        lastError = undefined;
        last = { status: result.status, ok: result.ok, data };
      } catch (error) {
        if (error instanceof ResendBusyError) throw error;
        lastError = error;
        if (attempt === MAX_RETRIES) throw error;
      }
      const delay = Math.min(retryAfter ?? 500 * 2 ** attempt, RETRY_CAP_MS);
      if (now() + delay - began > RETRY_BUDGET_MS || now() + delay > deadline - 1000) {
        if (lastError) throw lastError;
        return last;
      }
      await sleep(delay);
    }
    throw lastError ?? new Error('Resend unavailable');
  };
}
