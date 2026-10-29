import { readdirSync, readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { connect } from './client.mjs';

const dir = new URL('./migrations/', import.meta.url);
// Migrations are additive only; refuse anything that removes data or structure.
const forbidden = /\b(drop|truncate|delete)\b/i;
// The single exception: 005 replaces the questions.type CHECK to allow a new value (no data is removed).
// Only this exact statement, only in this file; every other destructive word is still refused.
const allowedDrops = {
  '005_checkbox_type.sql': /^[ \t]*ALTER TABLE questions DROP CONSTRAINT (?:IF EXISTS )?questions_type_check;[ \t]*$/gm
};

export function assertAdditive(file, text) {
  const rest = allowedDrops[file] ? text.replace(allowedDrops[file], '') : text;
  if (forbidden.test(rest)) throw new Error(`${file} contains a destructive statement`);
}

export async function migrate(sql) {
  await sql`CREATE TABLE IF NOT EXISTS schema_migrations (version text PRIMARY KEY, applied_at timestamptz NOT NULL DEFAULT now())`;
  const done = new Set((await sql`SELECT version FROM schema_migrations`).map((r) => r.version));
  const applied = [];
  for (const file of readdirSync(dir).filter((f) => f.endsWith('.sql')).sort()) {
    if (done.has(file)) continue;
    const text = readFileSync(new URL(file, dir), 'utf8');
    assertAdditive(file, text);
    await sql.begin(async (tx) => {
      await tx.unsafe(text);
      await tx`INSERT INTO schema_migrations (version) VALUES (${file})`;
    });
    applied.push(file);
  }
  return applied;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const sql = await connect();
  try { console.log('applied:', await migrate(sql)); } finally { await sql.end(); }
}
