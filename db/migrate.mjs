import { readdirSync, readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { connect } from './client.mjs';

const dir = new URL('./migrations/', import.meta.url);
// Migrations are additive only; refuse anything that removes data or structure.
const forbidden = /\b(drop|truncate|delete)\b/i;

export async function migrate(sql) {
  await sql`CREATE TABLE IF NOT EXISTS schema_migrations (version text PRIMARY KEY, applied_at timestamptz NOT NULL DEFAULT now())`;
  const done = new Set((await sql`SELECT version FROM schema_migrations`).map((r) => r.version));
  const applied = [];
  for (const file of readdirSync(dir).filter((f) => f.endsWith('.sql')).sort()) {
    if (done.has(file)) continue;
    const text = readFileSync(new URL(file, dir), 'utf8');
    if (forbidden.test(text)) throw new Error(`${file} contains a destructive statement`);
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
