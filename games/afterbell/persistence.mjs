import { mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';

// These two tables belong only to the game. Existing exam/practice tables are
// never read or changed, and initialization only creates missing game tables.
export async function createGameStore({ databaseUrl, databasePath }) {
  if (databaseUrl) {
    const { default: postgres } = await import('postgres');
    const sql = postgres(databaseUrl, { max: 3, connect_timeout: 5, idle_timeout: 20, onnotice: () => {} });
    try {
      await sql.unsafe('CREATE TABLE IF NOT EXISTS afterbell_attempts (id TEXT PRIMARY KEY, name TEXT NOT NULL, quiz_id TEXT NOT NULL, score INTEGER NOT NULL, answers TEXT NOT NULL, content_hash TEXT NOT NULL, started_at DOUBLE PRECISION NOT NULL, received_at BIGINT NOT NULL)');
      await sql.unsafe('CREATE TABLE IF NOT EXISTS afterbell_content_versions (content_hash TEXT PRIMARY KEY, quiz_id TEXT NOT NULL, content TEXT NOT NULL, received_at BIGINT NOT NULL)');
    } catch (error) { await sql.end({ timeout: 1 }); throw error; }
    return {
      async getAttempt(id) { return (await sql.unsafe('SELECT name, quiz_id, score, answers, content_hash, started_at FROM afterbell_attempts WHERE id=$1', [id]))[0]; },
      async insertAttempt(r, now) { await sql.unsafe('INSERT INTO afterbell_attempts(id,name,quiz_id,score,answers,content_hash,started_at,received_at) VALUES($1,$2,$3,$4,$5,$6,$7,$8) ON CONFLICT(id) DO NOTHING', [r.id,r.name,r.quizId,r.score,r.answers,r.contentHash,r.startedAt,now]); },
      async getVersion(hash, quizId) { return (await sql.unsafe('SELECT content FROM afterbell_content_versions WHERE content_hash=$1 AND quiz_id=$2', [hash,quizId]))[0]; },
      async saveVersion(hash, quizId, content, now) { await sql.unsafe('INSERT INTO afterbell_content_versions(content_hash,quiz_id,content,received_at) VALUES($1,$2,$3,$4) ON CONFLICT(content_hash) DO NOTHING', [hash,quizId,content,now]); },
      close() { return sql.end({ timeout: 2 }); }
    };
  }
  if (databasePath !== ':memory:') await mkdir(dirname(databasePath), { recursive: true, mode: 0o700 });
  const { DatabaseSync } = await import('node:sqlite');
  const db = new DatabaseSync(databasePath);
  db.exec('PRAGMA journal_mode=WAL; CREATE TABLE IF NOT EXISTS afterbell_attempts (id TEXT PRIMARY KEY, name TEXT NOT NULL, quiz_id TEXT NOT NULL, score INTEGER NOT NULL, answers TEXT NOT NULL, content_hash TEXT NOT NULL, started_at INTEGER NOT NULL, received_at INTEGER NOT NULL)');
  db.exec('CREATE TABLE IF NOT EXISTS afterbell_content_versions (content_hash TEXT PRIMARY KEY, quiz_id TEXT NOT NULL, content TEXT NOT NULL, received_at INTEGER NOT NULL)');
  const getAttempt = db.prepare('SELECT name, quiz_id, score, answers, content_hash, started_at FROM afterbell_attempts WHERE id=?');
  const insertAttempt = db.prepare('INSERT OR IGNORE INTO afterbell_attempts(id,name,quiz_id,score,answers,content_hash,started_at,received_at) VALUES(?,?,?,?,?,?,?,?)');
  const getVersion = db.prepare('SELECT content FROM afterbell_content_versions WHERE content_hash=? AND quiz_id=?');
  const saveVersion = db.prepare('INSERT OR IGNORE INTO afterbell_content_versions(content_hash,quiz_id,content,received_at) VALUES(?,?,?,?)');
  return {
    async getAttempt(id) { return getAttempt.get(id); },
    async insertAttempt(r, now) { insertAttempt.run(r.id,r.name,r.quizId,r.score,r.answers,r.contentHash,r.startedAt,now); },
    async getVersion(hash, quizId) { return getVersion.get(hash,quizId); },
    async saveVersion(hash, quizId, content, now) { saveVersion.run(hash,quizId,content,now); },
    async close() { db.close(); }
  };
}
