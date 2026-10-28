import { pathToFileURL } from 'node:url';
import { connect } from './client.mjs';
import { extractContent } from './extract.mjs';

// Inserts or updates content rows from the source files. Never deletes: rows missing from the source are only reported.
export async function seed(sql, content = extractContent()) {
  const report = {};
  await sql.begin(async (tx) => {
    const upsert = async (table, rows, columns, hashColumn) => {
      let inserted = 0, updated = 0, unchanged = 0;
      for (const row of rows) {
        const before = await tx`SELECT * FROM ${tx(table)} WHERE id = ${row.id}`;
        const values = Object.fromEntries(columns.map((c) => [c, row[c] ?? null]));
        for (const c of ['choices', 'correct', 'parts']) if (c in values && values[c] !== null) values[c] = tx.json(values[c]);
        if (!before.length) {
          await tx`INSERT INTO ${tx(table)} ${tx(values, columns)}`;
          inserted++;
        } else if (hashColumn ? before[0][hashColumn] === row[hashColumn] : columns.every((c) => JSON.stringify(before[0][c] ?? null) === JSON.stringify(row[c] ?? null))) {
          unchanged++;
        } else {
          await tx`UPDATE ${tx(table)} SET ${tx(values, columns)}${hashColumn ? tx`, updated_at = now()` : tx``} WHERE id = ${row.id}`;
          updated++;
        }
      }
      const known = rows.map((r) => r.id);
      const orphans = (await tx`SELECT id FROM ${tx(table)} WHERE id <> ALL(${known})`).map((r) => r.id);
      report[table] = { inserted, updated, unchanged, ...(orphans.length ? { orphans } : {}) };
    };
    await upsert('subjects', content.subjects, ['id', 'title', 'description', 'art_path', 'sort_order']);
    await upsert('passages', content.passages, ['id', 'title', 'body_html', 'source_file']);
    await upsert('exams', content.exams, ['id', 'subject_id', 'title', 'detail', 'date_label', 'href', 'passage_id', 'question_count', 'sort_order']);
    await upsert('quizzes', content.quizzes, ['id', 'subject_id', 'exam_id', 'title', 'description', 'list_title', 'list_detail', 'sort_order']);
    await upsert('study_references', content.study_references,
      ['id', 'subject_id', 'exam_id', 'quiz_id', 'kind', 'title', 'url', 'attribution', 'parts', 'sort_order']);
    await upsert('questions', content.questions,
      ['id', 'exam_id', 'quiz_id', 'position', 'type', 'topic', 'difficulty', 'prompt', 'choices', 'correct', 'explanation_he', 'explanation_en',
        'reference_id', 'reference_part', 'source_hash'], 'source_hash');
  });
  return report;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const sql = await connect();
  try { console.log(JSON.stringify(await seed(sql), null, 2)); } finally { await sql.end(); }
}
