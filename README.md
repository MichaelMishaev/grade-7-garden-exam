# PrepX

PrepX is a study hub for exam preparation for students in class ז׳2 (Grade 7, class 2) at שי עגנון school in נתניה (Netanya).

**קהל היעד:** תלמידי כיתה ז׳2 בבית הספר שי עגנון, נתניה.

A mobile-first RTL study hub. Students choose a subject on the home page, then a separate version of its exam. The Hebrew exam for 29.10 has one available version. Physics includes a 27-question assessment, study materials, and four practice quizzes on measurement. Three short Hebrew practice quizzes cover facts versus opinions, question words, and instruction words.

## Run locally

```bash
npm start
```

The server listens on `PORT` or port 3000. It serves `/api/submit-exam` and static HTML, CSS, JavaScript, SVG, PNG, and PDF files only. Open `http://localhost:3000/`.

## Pages

- `index.html`: compact subject selector.
- `subject.html?subject=hebrew` and `?subject=physics`: exam version lists. Add further versions to the `subjects` data in this page. Each version lists its own study material under **חומר לימוד** (`references` in the `subjects` data): the reading passage for the Hebrew versions, and the teacher's summary PDF (`assets/materials/physics-measurements-grade-7.pdf`) plus her practice site for physics. Every question names the part it follows (`ref: { id, part }`, e.g. `עמוד 3`, `פסקה 2`).
- `physics-exam.html` + `physics-exam.js` (+ `numeric-answer.js`): physics version 1, "משימת הערכה במדידות", the 27 tasks of the teacher שרית שרת's practice site, reproduced verbatim (texts, options, answers, explanations, figures, order; checked by `physics-exam.test.mjs` against `test-fixtures/sarit-physics7-sections.json`). Self-checked, with optional submission of all answers by email to the teacher; optional server-side storage follows the database write flag. Choice and numeric answers are checked like her site (first comma is a decimal mark, no units, exact to 1e-8); written answers show her model answer and her "בדקו:" list as a self-check. The summary shows current and first-check counts, like her report. Draft in `sessionStorage` under `physics-exam-draft-v1`.
- `garden-exam.html`: original 20-question reading exam, with review and email submission.
- `practice.html?quiz=facts`, `?quiz=questions`, `?quiz=instructions`: short Hebrew practice quizzes with immediate Hebrew and English feedback. After each answer the feedback shows its source (e.g. "מקור: עמוד 3 בסיכום") with a link to the reference. `?quiz=physics-basics`, `physics-units`, `physics-precision`, `physics-pole`: physics quizzes with Hebrew feedback. Practice is scored out of 100 with 0–3 stars, and the best full-round score is kept in `localStorage` (`prepx-best-<quiz>`) and shown on the subject page. Scoring rules are in `QUESTION-RULES.md`.
- `thanks.html`: confirmation after the full exam is submitted.

The Hebrew exams send the student's name and all 20 answers; the physics assessment sends the name and all 27 answers to the Railway server at `/api/submit-exam`. The server sends a Hebrew email through Resend to `345287@gmail.com`, from `PrepX <exams@netanya.club>`. Student answers are never written to the server logs; Resend processes the email content. If the optional database is enabled (see [Database](#database)), the name and answers are also saved there, with no automatic deletion. The draft stays in `sessionStorage` until Resend accepts the email, and remains available if submission fails. Practice quizzes run entirely in the browser and send nothing.

Railway requires `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `APP_ORIGIN=https://hitech.agnon.online`, and `NODE_ENV=production`. Keep the API key in Railway variables, never in browser code or Git. GitHub Pages submits to the Railway endpoint using an explicitly allowed origin. Identical submissions use Resend's idempotency key (24-hour window). The server accepts at most 100 valid submission attempts per hour per running instance; this in-memory limit resets on restart.

Run the checks with `node --test *.test.mjs db/*.test.mjs` (scoring logic, the submission API, content extraction, references, the physics exam against the teacher's original data, the numeric checker and the database layer; Resend is mocked). Tests that need Postgres are skipped unless `TEST_DATABASE_URL` or `E2E_DATABASE_URL` is set (see [Database](#database)).

On 2026-10-28, a synthetic submission from the live exam reached `thanks.html`; Resend reported it delivered to the teacher address, with the test marker and all 20 answer sections present (email ID `01a182f9-659f-765f-b663-2ad92e7a5267`).

## Database

PostgreSQL holds the exam and quiz content (subjects, exams, quizzes, study references, questions with answers, explanations and their reference part) and, optionally, student submissions. **It is off by default.** With no `DATABASE_URL` or flags, the server behaves exactly as described above, and the pages use their inline data.

| Variable | Effect |
| --- | --- |
| `DATABASE_URL` | Postgres connection string. Nothing database-related runs without it. |
| `DB_WRITE_SUBMISSIONS=1` | `/api/submit-exam` saves the submission (name, answers, start/finish times, email status) before sending the email. A slow or failing database never blocks or fails the email: the server waits at most 2 seconds. |
| `DB_READ_API=1` | Enables `GET /api/subjects`, `/api/subjects/:id`, `/api/quizzes/:id` and `/api/exams/:id`, plus `/api/health`. Same allowed origins as the submit endpoint. |

**Student data is kept.** With the write flag on, student names and answers are stored with no automatic deletion. The teacher email is still sent as before. Deleting any data needs an explicit decision and a backup first; no script here deletes anything.

Files:

- `db/migrations/001_init.sql`: the schema. Migrations are additive only; `db/migrate.mjs` refuses `DROP`, `TRUNCATE` and `DELETE`.
- `db/migrations/002_references.sql`: adds `study_references` (`id, subject_id, exam_id, quiz_id, kind pdf|site|passage, title, url, attribution, parts jsonb [{part, title}], sort_order`; `references` is reserved in SQL) and nullable `questions.reference_id` (FK) + `questions.reference_part`.
- `db/extract.mjs`: reads the questions and answers out of `garden-exam.html`, `library-exam.js`, `physics-exam.js`, `practice.js` and `subject.html` (exam versions and their `references`). The files stay the source of truth; nothing is retyped. Garden's questions are a plain string array, so their passage parts are mapped by index in `extract.mjs`. `source_hash` includes the reference id and part.
- Physics exam column shapes (the CHECK on `questions.type` is unchanged): her `choice` → `mcq` (`correct` = index of her answer); `num` → `fill` (`choices` null, `correct` = `{ "value": 325, "tolerance": 1e-8, "unit": "ס״מ" }`; `unit` is informational, read from the prompt, never shown or checked); `text` → `open` (`correct` = her short key text, `explanation_he` = her model answer HTML including "בדקו:"). Prompts and explanations keep her HTML (`<br>`, `<strong>`, `<bdi>`). Figures and chapter intros stay page-only.
- `db/seed.mjs`: inserts or updates the content (never deletes). `db/verify.mjs` compares the database with the source files and exits 1 on any difference.
- `db/runtime.mjs`, `db/content.mjs`, `db/submissions.mjs`: the server-side database layer. `postgres` is the only npm dependency; it is loaded lazily, so the server starts without a database.
- `content-api.js`: the pages load their content from the API **by default** and fall back to the inline data on any error, a timeout of 1.5 seconds, or a failed validity check, so GitHub Pages, outages and a server with `DB_READ_API` off behave exactly as before. `?source=inline` forces the inline data (debugging).
  - `practice.html`: quizzes from `/api/quizzes/:id` (same question count required). Its `prepx-content-source` meta tag is shipped as `api`.
  - `subject.html`: subject texts, exam versions and the physics quiz list from `/api/subjects/:id`, used only when the exam count, hrefs, linked practice quizzes and quiz ids match the inline `subjects` object. The Hebrew practice-quiz rows stay static markup.
  - `garden-exam.html`, `library-exam.js`, `physics-exam.js`: questions from `/api/exams/:id`, used only when identical to the inline arrays (count, order, ids, prompts, choices, answers, references), because drafts are keyed by index or id and the server recognises the exam by the prompt strings. The reading passage stays inline.
  - API shapes: every question has `ref: { id, part } | null`; `/api/exams/:id` and each exam in `/api/subjects/:id` have `references: [{ id, kind, title, url, attribution, parts }]`; `/api/quizzes/:id` has the references its questions use. `subject.html` requires the same reference ids and keeps the inline references.
  - After changing content, edit the page source, then `npm run db:seed` and `npm run db:verify`; otherwise the pages fall back to the inline data until the database matches.

Run it locally with Docker:

```bash
npm install
docker compose up -d --build         # Postgres on :54330, app on :3010, migrated and seeded
npm run db:migrate && npm run db:seed && npm run db:verify   # against DATABASE_URL, outside compose
E2E_DATABASE_URL=postgres://postgres:dev@localhost:54330/prepx node --test e2e/full-stack.test.mjs
```

The integration and end-to-end tests drop and recreate the `public` schema of the database they are given. Point them only at a throwaway database (`TEST_DATABASE_URL` must contain `test` in its name).

Railway rollout checklist: `railway ssh` can land in the previous (still serving) container while the new build is deploying, and that container runs the old `db/` scripts, so migrate prints `applied: []` and the old verify passes without applying anything. So: (1) wait until the new deployment shows SUCCESS and the live page source shows the new build; (2) run `node db/migrate.mjs && node db/seed.mjs && node db/verify.mjs` and confirm `applied: [ '002_references.sql' ]` (first time) and `db matches source` (verify now also fails on unapplied migrations); (3) check `GET /api/exams/physics-v1-assessment` returns 200 with 27 questions and `GET /api/subjects/hebrew` includes `references`.

Railway rollout (not done yet): add a Postgres service, run `db:migrate`, `db:seed` and `db:verify` against it, take a `pg_dump -Fc` backup outside the repo, then set `DATABASE_URL` and the flags on `web`. Unsetting the flags restores the previous behavior.

## Deployment

Pushing to `main` on GitHub deploys the site. There is no manual deploy step.

| Where | URL | How it updates |
| --- | --- | --- |
| GitHub repository (public) | <https://github.com/MichaelMishaev/grade-7-garden-exam> | Source of truth |
| Railway, custom domain | <https://hitech.agnon.online/> | Auto-deploys on push to `main` |
| Railway domain | <https://web-production-1a642.up.railway.app/> | Same Railway service |
| GitHub Pages | <https://michaelmishaev.github.io/grade-7-garden-exam/> | Auto-publishes on push to `main` |

### Railway

- Project `grade-7-exam-study`, service `web`, environment `production`, region `europe-west4`, 1 replica.
- Source: GitHub repo above, branch `main`. Built with Railpack; start command `npm start` (runs `server.mjs`).
- Health check: `GET /` must return 200 before a new deployment replaces the old one.
- Railway supplies `PORT`; the email variables listed above must be set as Railway variables.
- The custom domain uses Cloudflare DNS, with Railway handling hosting and TLS.
- To roll back, redeploy an earlier deployment from the Railway dashboard.

### GitHub Pages

Pages serves the repository files directly (`.nojekyll` disables Jekyll), without `server.mjs`. Everything must therefore work as plain static files. A file type missing from the `types` list in `server.mjs` (for example `.webp` or fonts) works on Pages but returns 404 on Railway, so add new asset types there.

### Before you push

- Increase the `?v=` number on any stylesheet link whose CSS changed (for example `styles.css?v=4`), so browsers load the new styles.
- The repository is public. Everything committed is visible, including the fixed teacher email in `server.mjs`.
- Uncommitted local changes are not live. Check `git status` before assuming a change is deployed.

### Checking a deployment

```bash
curl -sI https://hitech.agnon.online/ | head -1   # expect HTTP/2 200
```

Then open the home page, a subject page, a practice quiz, and the exam on a phone-sized screen. Deployment status and logs are in the Railway dashboard for project `grade-7-exam-study`.

## Design references

### PrepX branding

The approved logo combines a violet X mascot with a rounded PrepX wordmark. The transparent PNG is at `assets/branding/prepx-logo.png`; its generation prompt and Mobbin reference are recorded in `assets/branding/prepx-logo-prompt.txt`. It was generated with OpenAI image generation, drawing on the approachable mascot and lettering in [Duolingo's welcome screen](https://mobbin.com/screens/fb4eda98-538d-4bc0-9ef6-bf06ed401c12).

All five pages display the logo as a link to the home page and include PrepX in their browser titles. `branding.css` controls its responsive sizing and keyboard focus indicator. Preserve the PNG's transparency and aspect ratio when reusing it.

The compact subject rows adapt the scannable list pattern in [LinkedIn's course list](https://mobbin.com/screens/6e8c4863-601c-4f24-9467-0a2b782ab8a9). The version list follows the separate-item structure in [Insight Timer's course days](https://mobbin.com/screens/86450a91-1ecc-42e6-967e-df3336cc8316). The earlier quiz layout drew on [Brilliant's course catalog](https://mobbin.com/screens/9360c5fd-857f-4ada-b27f-f1e4e70332df) and [Quizlet's question screen](https://mobbin.com/screens/f8af7017-ac7b-4584-bd0c-9845d160911a). All were adapted for Hebrew RTL and a small exam catalog.

The current visual and motion pass references [Duolingo's compact selection rows](https://mobbin.com/screens/ed5fd27f-19fb-48a9-ae0f-4481e5b7671a), [lesson path](https://mobbin.com/screens/a13f2a69-17ab-48d1-b6bd-9b64b5cd426e), and [correct-answer feedback](https://mobbin.com/screens/ef9d6413-1e91-4f2c-8317-25d63ceee5bf). The implementation uses original styling, quick card press feedback, progress transitions, and short answer/result entrances; reduced-motion preferences remove movement. The visual concept is saved at `design/learning-ui-concept.png`.

The illustrated subject and exam-version icons in `assets/` were generated with OpenAI image generation for this app. `styles.css` styles the home page, `subject.css` styles version pages, and `practice.css` styles quiz interactions.
