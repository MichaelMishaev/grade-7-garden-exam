import { readdirSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { connect } from './client.mjs';
import { extractContent } from './extract.mjs';

// Read-only: returns a list of differences between the database and the source files (empty means identical).
export async function verify(sql, content = extractContent()) {
  const problems = [];
  // Guards against running an old build's scripts: every migration shipped with this code must be recorded as applied.
  const applied = new Set((await sql`SELECT version FROM schema_migrations`).map((r) => r.version));
  for (const file of readdirSync(new URL('./migrations/', import.meta.url)).filter((f) => f.endsWith('.sql')).sort()) {
    if (!applied.has(file)) problems.push(`migration ${file} not applied`);
  }
  for (const table of ['subjects', 'passages', 'exams', 'quizzes', 'study_references', 'questions']) {
    const [{ count }] = await sql`SELECT count(*)::int AS count FROM ${sql(table)}`;
    if (count !== content[table].length) problems.push(`${table}: ${count} rows in db, ${content[table].length} in source`);
  }
  const codes = new Map((await sql`SELECT id, code FROM exams`).map((r) => [r.id, r.code]));
  for (const e of content.exams) if (codes.get(e.id) !== e.code) problems.push(`exam ${e.id}: code ${codes.get(e.id)} in db, ${e.code} in source`);
  const refs = new Map((await sql`SELECT * FROM study_references`).map((r) => [r.id, r]));
  for (const r of content.study_references) {
    const row = refs.get(r.id);
    if (!row) problems.push(`reference ${r.id} missing in db`);
    else if (Object.keys(r).some((k) => JSON.stringify(row[k] ?? null) !== JSON.stringify(r[k] ?? null))) problems.push(`reference ${r.id} differs from source`);
  }
  const rows = new Map((await sql`SELECT id, source_hash FROM questions`).map((r) => [r.id, r.source_hash]));
  for (const q of content.questions) {
    if (!rows.has(q.id)) problems.push(`question ${q.id} missing in db`);
    else if (rows.get(q.id) !== q.source_hash) problems.push(`question ${q.id} differs from source`);
  }
  return problems;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const sql = await connect();
  try {
    const problems = await verify(sql);
    console.log(problems.length ? problems.join('\n') : 'db matches source');
    process.exitCode = problems.length ? 1 : 0;
  } finally { await sql.end(); }
}
