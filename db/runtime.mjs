import { connect } from './client.mjs';
import * as content from './content.mjs';
import * as submissions from './submissions.mjs';

// Returns null unless DATABASE_URL and at least one flag are set, so the default server behaves exactly as before.
export function createDb(env = process.env) {
  const write = env.DB_WRITE_SUBMISSIONS === '1';
  const read = env.DB_READ_API === '1';
  if (!env.DATABASE_URL || (!write && !read)) return null;
  let pending;
  const sql = () => (pending ??= connect(env.DATABASE_URL));
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
    listSubjects: run(content.listSubjects),
    getSubject: run(content.getSubject),
    getQuiz: run(content.getQuiz),
    getExam: run(content.getExam),
    contentVersion: run(content.contentVersion)
  };
}
