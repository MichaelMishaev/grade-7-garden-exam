---
name: prepx-new-exam
description: Use when the user provides study material (a reference PDF, link or text) and an exam date and wants a new PrepX exam or practice set created — questions, answers, explanations, reference links, DB content, tests. Also use for "add an exam", "make questions from this summary", "new subject/version", or adding questions to an existing exam. The user supplies the reference and date; this skill builds everything else.
---

# PrepX: build a new exam from a reference

**Read `docs/TESTING.md` first: it is the single source of truth for how every test behaves; where this skill differs, it wins.** (E.g. questions and options are always shuffled per student, even in verbatim teacher exams; only the wording is verbatim.)

The user provides **(1) the reference** (study material) and **(2) the exam date**. You (optionally with Codex or GLM for a second opinion) write the questions and wire everything up. Rule 1: **every question must follow the reference**, and every answer must be verifiable in it.

**Hard rule: every exam ends by emailing the student's name and all answers to the teacher.** Same endpoint `/api/submit-exam`, same Resend account (`RESEND_API_KEY`, `RESEND_FROM_EMAIL`), same sender, teacher, rate limit and origin rules; no new env vars or credentials. A new exam needs: its own entry in the `exams` table in `server.mjs` (`count`, `subject`, `idempotencyPrefix`, `title`, `subtitle`) and `exam: '<exam id>'` in its payload; tests like `server.exams.test.mjs` (count accepted, ±1 rejected, subject/body, same Authorization/from/to as garden, idempotency key); the shared flow copied from `library-exam.html` + `library-exam.js` (start with required name → questions → review → results → send → `thanks.html`), checked by a parity test like `physics-exam.parity.test.mjs`; its `<exam>-exam-draft-v1` / `<exam>-exam-result-v1` keys handled in `thanks.html`. **Self-graded-only exams are not allowed.** (Practice quizzes in `practice.html` are not exams and send nothing.) Never let a browser check reach the real endpoint: mock Resend (`createApp({ env, sendFetch: mock })`) and `page.route` anything bound for hitech.agnon.online.

Read first, never from memory: `CLAUDE.md`, `README.md` (Database section), `QUESTION-RULES.md`. They are the source of truth for schema, question rules, draft keys and flags.

## 0. Intake (ask only for what is missing)

| Need | Notes |
|---|---|
| Reference | PDF / URL / pasted text. Several is fine. Must be study material students may open. |
| Exam date | Shown on the subject page (`date` in the `subjects` data). |
| Subject + version title | e.g. `physics`, "גרסה 1 · משימת הערכה". New subject = add it to the `subjects` object. |
| Format | Number of questions (15–25, `QUESTION-RULES.md`), types, graded vs teacher-graded, teacher-graded parts. Default: 20. Every exam is emailed to the teacher (hard rule above). |
| Attribution | Name of whoever wrote the reference (shown on the page). Confirm the user may reuse third-party material. |

If the reference is not in the repo, copy it to `assets/materials/<slug>.pdf` (file types served: `.html .css .js .svg .png .pdf`, see `server.mjs` `types`). Never commit secrets or unrelated files; read the whole reference (use the Read tool with `pages` for PDFs) before writing a question.

## 0b. Exact reproduction comes first

If the reference **contains the exam's actual tasks** (a task sheet, a teacher's practice site, a past exam), the exam must be **exactly as in the reference**: same tasks, same wording, same order, same options, same answers and model solutions, same figures. Copy them verbatim; never paraphrase, "improve", reorder, drop or add tasks. Save the original as a test fixture and add a test that the exam's data is identical to it. Only write new questions when the user asks for that (when the reference is plain study material with no tasks, or for extra practice), and say so in the report. Anything that cannot be reproduced faithfully is reported, not silently changed.

## 1. Plan the coverage

List the reference's parts (pages / paragraphs / sections). Map each to a topic tag. Make sure every important part has at least one question; note anything the reference does **not** cover and do **not** ask about it.

## 2. Write the questions

- Follow `QUESTION-RULES.md`: ≥3 types, ~40% easy / 40% medium / 20% hard, topic tag, Hebrew explanation on every graded question, one correct answer, shuffle-friendly choices (no "all of the above", no position clues).
- Each question carries `ref: { id, part }`, for example `part: 'עמוד 3'` or `'פסקה 2'`. The explanation should cite the same part. If the reference states no answer, the question is out.
- Numbers must be computed, not guessed: run them (`node -e`) and re-check against the reference. For numeric answers define the accepted value, tolerance and unit.
- Open (written) questions get a model answer and a short self-check list.
- Stable ids: `<exam>-NN`; never renumber an existing exam (drafts are keyed by id or index).
- Optional second opinion: run the finished set past Codex (`codex:rescue`) or the `glm` skill with the reference, asking only "which answers/explanations contradict the reference?". Never send student data.

## 3. Wire it in

1. Question data: an inline array in the exam page source, same pattern as `library-exam.js` / `physics-exam.js`, so `db/extract.mjs` reads it from the page (the files remain the source of truth; do not retype into SQL).
2. Page: copy `library-exam.html` + `library-exam.js` (the shared flow; `physics-exam.html` shows how to add numeric answers and figures without changing the flow). New sessionStorage key `<exam>-draft-v1`, never reuse an existing one. RTL, mobile first, tap targets ≥44px, no timer, no negative marking, motion inside `prefers-reduced-motion`.
3. `subject.html`: add the version to `subjects.<subject>.variants` with `title`, `detail`, `date`, `count`, `href`, and its **own reference** (`references: [...]`). The reference shows as "חומר לימוד" next to that version.
4. `db/extract.mjs` (+ its tests): include the new exam, references and question refs. Expected counts in `db/extract.test.mjs` change; update them deliberately.
5. Bump `?v=` on every changed script/stylesheet link (CLAUDE.md).
6. Email to the teacher (always): add the exam to the server `exams` table with the **next free permanent test code** (`HEB-`/`PHY-`/new subject prefix + running number; never reuse or change one; keep `db/extract.mjs` in step), send `exam: '<exam id>'`, `attempt`, and per answer `questionId`, the prompt as plain text (`plainText`), `options`, `correctAnswer`, `reference`, `correct` on auto-graded answers and the partial `score`; every open question needs a model answer, rubric and maximum in `open-rubrics.mjs` (server-side only, for the AI check); make sure `db/submissions.mjs` `matchExam` recognises it (unit + integration test). The exam page must follow `docs/TESTING.md` (single source of truth: question types incl. checkbox, instant feedback, locked answers, always-shuffled questions and options, visible timer, finish sends and shows a read-only summary). The legacy no-`exam` payloads stay byte-identical for old tabs only (`server.exams.test.mjs` snapshots).

## 4. Verify (all of it, show the output)

```bash
docker start prepx-pg   # local Postgres on :54329 (password dev)
TEST_DATABASE_URL=postgres://postgres:dev@localhost:54329/prepx_test node --test db/*.test.mjs *.test.mjs
E2E_DATABASE_URL=postgres://postgres:dev@localhost:54329/prepx_e2e node --test e2e/full-stack.test.mjs
DATABASE_URL=postgres://postgres:dev@localhost:54329/prepx_app npm run db:migrate && npm run db:seed && npm run db:verify
```

- Tests must also fail when a question has no reference or points to a part that does not exist (keep that test passing).
- Browser check at 390×844 (Playwright MCP, or headless Playwright if it is locked) against an in-process app with Resend mocked: subject page shows the date and the exam's reference link; name required; answer right and wrong; reload restores the draft; review blocks unanswered; results view; send failure keeps the draft; send success lands on `thanks.html` with the draft cleared; the mock received the right subject and 1 email; side-by-side screenshots with the library exam; with `DB_READ_API=0` the page still works from inline data.
- A human spot check of 5 random questions against the reference.

## 5. Ship (gates; do not skip)

- Work in a git worktree on a feature branch. Never touch the live checkout's uncommitted files.
- **Commit** only with explicit paths (never `git add .`), show the file list first, end with the Co-Authored-By line from CLAUDE.md.
- **Pushing to `main` auto-deploys to production** (Railway) while students use it. Confirm with the user first, and do not push exam-page changes the day before an exam without an explicit OK.
- Order for production: merge → wait for the deploy health check → `railway ssh -- sh -c 'cd /app && node db/migrate.mjs && node db/seed.mjs && node db/verify.mjs'` (idempotent, additive, private network) → check `https://hitech.agnon.online/` pages and `/api/health`.
- Never delete DB rows or drop tables without explicit per-action permission and a backup. `migrate.mjs` refuses `drop/truncate/delete`.
- Rollback: unset `DB_READ_API` / `DB_WRITE_SUBMISSIONS` on Railway `web`, or redeploy the previous deployment.

## 6. Report

Say what was built (file list, counts per type/difficulty/topic, coverage of the reference), what the reference does not cover, what was verified and what was not, and any decision that was yours rather than the user's.
