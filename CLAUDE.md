# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

PrepX: a mobile-first Hebrew (RTL) exam-prep site for class ז׳2 at שי עגנון school, Netanya. Plain static HTML/CSS/JS with no framework, no build step, and no test or lint tooling. The only npm dependency is `postgres`, used by the optional database layer.

## Commands

```bash
npm start            # node server.mjs → http://localhost:3000 (override with PORT)
```

There is nothing to build or lint. Run `node --test *.test.mjs db/*.test.mjs` for scoring, references, the verbatim physics exam, the submission API and the database layer (Postgres tests skip unless `TEST_DATABASE_URL` / `E2E_DATABASE_URL` is set). Verify changes by loading the pages in a browser (mobile viewport first; every page is `lang="he" dir="rtl"`).

## Architecture

**Two hosts serve the same files.** GitHub Pages serves the repo directly (`.nojekyll`), and Railway runs `server.mjs` (service `web`, custom domain https://hitech.agnon.online/). Static pages work on both hosts; email submission requires the Railway API. GitHub Pages calls the canonical Railway endpoint with an explicit CORS origin.

**`server.mjs` serves static files and `/api/submit-exam`.** The submission API validates 20 Hebrew answers or 27 physics answers, keeps Resend credentials server-side, sends to a fixed teacher, deduplicates through Resend, and limits attempts. Static files use GET/HEAD, only the extensions in its `types` map (`.html .css .js .svg .png`), and 404s any path segment starting with `.`. Adding a new asset type (e.g. `.webp`, `.json`, `.ico`, fonts) requires adding it to `types`, or it will 404 on Railway while still working on GitHub Pages. Responses are cached for 5 minutes.

**Cache busting is manual.** Stylesheets are linked with a version query (`styles.css?v=4`, `practice.css?v=2`). Bump the `?v=` number in every page that links a stylesheet when you change it.

**Page flow and where content lives:**
- `index.html` → subject list (static links to `subject.html?subject=<key>`).
- `subject.html` → reads `?subject=` and renders exam versions from the inline `subjects` object in its `<script>`. Add exam versions or subjects there (each variant has an `id` = exam id and its own `references`, shown as "חומר לימוד"; `practiceQuizzes` puts quiz rows inside the version). The Hebrew practice-quiz links are static markup in the same page; the physics rows are built from `subjects.physics.quizzes`.
- **References rule:** every question follows a part of its exam's study material: `ref: { id, part }` in `library-exam.js`, `physics-exam.js` and `practice.js` (garden: by index in `db/extract.mjs`). Parts must exist in the reference's `parts` list in `subject.html`; `db/extract.test.mjs` fails otherwise. Physics refs are `physics-pdf` `עמוד 1`–`עמוד 6` or `physics-site` `פרק 1`–`פרק 4` (only where the PDF does not cover the topic).
- `physics-exam.html` + `physics-exam.js` + `numeric-answer.js` → the teacher שרית שרת's 27-task assessment, **verbatim** from her practice site (`physics-exam.test.mjs` compares it byte for byte with `test-fixtures/sarit-physics7-sections.json`; never edit those texts). Self-checked, with a teacher email submission after all questions are answered. Draft key `physics-exam-draft-v1`.
- `practice.html` + `practice.js` → reads `?quiz=` (`facts` | `questions` | `instructions`) and runs a self-graded quiz from the `quizzes` object in `practice.js`. Each question has `choices`, a `correct` index, and Hebrew (`he`) and English (`en`) explanations. Nothing is sent anywhere.
- `garden-exam.html` → the full 20-question open-answer exam; all logic is inline. Questions are in the inline `questions` array. On submit it POSTs JSON to `/api/submit-exam`, which emails the teacher through Resend. GitHub Pages uses `https://hitech.agnon.online/api/submit-exam`. Provider acceptance redirects to `thanks.html`; failures keep the draft.
- `thanks.html` → also clears the exam draft.

**Exam drafts** are kept in `sessionStorage` under `garden-exam-draft-v1` (also `library-exam-draft-v1`, `physics-exam-draft-v1`; never reuse a key). That key appears in both `garden-exam.html` and `thanks.html`; change both together. Server-side storage is optional and off by default: with `DATABASE_URL` and `DB_WRITE_SUBMISSIONS=1`, submissions (name and answers) are saved to Postgres and kept with no automatic deletion.

**Database (optional, off by default):** `db/` holds the Postgres schema (`001_init.sql`; `002_references.sql` adds `study_references` and `questions.reference_id/reference_part`), `extract.mjs` (reads questions from the page sources, which remain the source of truth), `seed.mjs`, `verify.mjs` and the server-side layer. Flags: `DATABASE_URL`, `DB_WRITE_SUBMISSIONS=1` (save before emailing; a DB failure or >2s delay must never stop the email), `DB_READ_API=1` (`/api/subjects|quizzes|exams`, `/api/health`). With the flags off, behavior must stay identical to the no-database server. Migrations are additive only; never delete database rows without explicit permission and a backup. After changing any question text, re-run `npm run db:seed` and `npm run db:verify`. `content-api.js` loads API content with inline fallback; practice, subject and all three exam pages use the API by default (`?source=inline` forces inline). Exam pages use API questions only when identical to the inline arrays (order, ids, prompts, answers, references), so the inline data stays authoritative. Never log the `postgres` error object (it can contain parameters); log `error.code` only.

**Resend configuration:** `RESEND_API_KEY` and `RESEND_FROM_EMAIL` are private Railway variables. `APP_ORIGIN` is the canonical app origin; set `NODE_ENV=production` in production. Never log student answers or credentials. Local checks mock Resend (`node --test server.test.mjs`); only a real provider delivery event or inbox receipt proves delivery.

**Styling:** `styles.css` (index/subject) and `practice.css` (practice) define CSS custom properties at the top (green palette, `--ease-out`). Both include a `prefers-reduced-motion` block that removes movement; keep new animations inside that contract. `garden-exam.html` and `thanks.html` carry their own inline styles.

## Conventions

- All user-facing copy is Hebrew. Practice feedback is shown in both Hebrew and English (English elements use `dir="ltr"`).
- Design references (Mobbin screens) and the deployment details are listed in `README.md`; the visual concept is `design/learning-ui-concept.png`.
