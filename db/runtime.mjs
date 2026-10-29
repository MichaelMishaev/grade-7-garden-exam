import { connect } from './client.mjs';
import * as content from './content.mjs';
import * as submissions from './submissions.mjs';
import * as practice from './practice.mjs';

// Returns null unless DATABASE_URL and at least one flag are set, so the default server behaves exactly as before.
export function createDb(env = process.env, { connector = connect, now = Date.now } = {}) {
  const write = env.DB_WRITE_SUBMISSIONS === '1';
  const read = env.DB_READ_API === '1';
  if (!env.DATABASE_URL || (!write && !read)) return null;
  // A failed connect is not kept: the next call tries again, but not within a second of the failure (no hammering).
  let pending;
  let failure;
  const sql = () => {
    if (pending) return pending;
    if (failure && now() - failure.at < 1000) return Promise.reject(failure.error);
    const attempt = Promise.resolve().then(() => connector(env.DATABASE_URL));
    pending = attempt;
    attempt.catch((error) => { failure = { at: now(), error }; if (pending === attempt) pending = undefined; });
    return attempt;
  };
  const run = (fn) => async (...args) => fn(await sql(), ...args);
  return {
    flags: { write, read },
    health: async () => {
      try {
        await Promise.race([(async () => (await sql())`SELECT 1`)(), new Promise((_, reject) => setTimeout(reject, 2000).unref())]);
        return true;
      } catch { return false; }
    },
    storeSubmission: run(submissions.storeSubmission),
    markEmail: run(submissions.markEmail),
    updateAiScores: run(submissions.updateAiScores),
    getSubmissionForGrading: run(submissions.getSubmissionForGrading),
    storePracticeResult: run(practice.storePracticeResult),
    listPracticeResults: run(practice.listPracticeResults),
    listPracticeHistory: run(practice.listPracticeHistory),
    listSubmissionHistory: run(submissions.listSubmissionHistory),
    getSubmissionDetail: run(submissions.getSubmissionDetail),
    listSubjects: run(content.listSubjects),
    getSubject: run(content.getSubject),
    getQuiz: run(content.getQuiz),
    getExam: run(content.getExam),
    contentVersion: run(content.contentVersion)
  };
}
