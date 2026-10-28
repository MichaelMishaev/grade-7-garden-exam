import { pathToFileURL } from 'node:url';
import { connect } from './client.mjs';
import { extractContent } from './extract.mjs';

// Read-only: returns a list of differences between the database and the source files (empty means identical).
export async function verify(sql, content = extractContent()) {
  const problems = [];
  for (const table of ['subjects', 'passages', 'exams', 'quizzes', 'questions']) {
    const [{ count }] = await sql`SELECT count(*)::int AS count FROM ${sql(table)}`;
    if (count !== content[table].length) problems.push(`${table}: ${count} rows in db, ${content[table].length} in source`);
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
