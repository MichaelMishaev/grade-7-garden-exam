# PrepX — Tests: Single Source of Truth

"Test" in this document means a test **students take**: an exam or a practice quiz. (Code tests are in `CLAUDE.md`.)

Status: these are the agreed rules. Where the current code differs, see [Conflicts with the current code](#conflicts-with-the-current-code). Until that list is cleared, the code is behind this document, not the other way round.

## 1. Test identity

- Every test has a **unique, permanent code**: a subject prefix plus a running number (`HEB-001`, `HEB-002`, `PHY-001`, `PRA-001`). It is assigned once, stored with the test (the server `exams` table and the DB) and never reused or changed.
- Every email shows the **test code** and the **attempt number** for that name and test, e.g. `HEB-002 · attempt 3`. The code is also in the subject.

## 2. Question types

All five are allowed in every test:

| Type | Input | Graded by |
|---|---|---|
| Choice | radio, one answer | system |
| True/false | radio | system |
| Checkbox | select several | system, **all or nothing** (exactly the right set) |
| Numeric | number + working, confirm button | system |
| Open text | free text, confirm button | AI (see §9) |

## 3. Answering and feedback

- **Radio (choice, true/false):** clicking an answer submits it instantly, shows correct or wrong, and after about **1.5 seconds** moves to the next question. No "check" or "next" button. With `prefers-reduced-motion` there is no slide, only the pause.
- **Checkbox, numeric, open text:** an **"אישור"** button under the field, disabled until something is entered. Enter also confirms numeric answers (not open text, where Enter is a new line). Confirming locks the answer and auto-advances after about 1.5 s. Checkbox and numeric show correct or wrong. **Open text shows no verdict** on screen (the "ממתינה לבדיקת המורה" label is removed from the screen; it stays in the email).
- **Locking:** in exams and practice, a submitted answer is locked. The student may go back to earlier questions, but they are **read-only**. Nothing can be edited.
- **Practice retry** means starting a **new round**. Inside a round, answers lock like in exams.

## 4. Order and shuffle

- **Always shuffle** the order of the questions and the order of the choices, for every test, per student.
- Exams reproduced from a teacher's original (e.g. physics) keep the **wording** of every task, option, answer, explanation and figure verbatim. Only the order is random.

## 5. Content every question must carry

- A **reference** to the study material (`ref: { id, part }`), pointing to a part that exists in `subject.html`. A test fails if it is missing or wrong.
- A **Hebrew explanation** on every auto-gradable question. Practice also has an **English** explanation (`dir="ltr"`).
- Every **open question** also carries a **model answer, a rubric** (the points a good answer contains) and a **maximum score**, written when the test is made.
- If the reference contains the test's actual tasks, copy them verbatim (fixture + identity test). Never paraphrase, reorder-by-hand, drop or add.

## 6. Flow of an exam

start (study material, required name, privacy line) → questions (visible timer, progress, collapsible study material, flag "סימון לבדיקה חוזרת") → review (finishing is blocked until **every** question is answered, open text included; a flag does not block) → **finish** → checking screen → read-only summary + designed "you're done" screen.

- **Timer:** counts up, visible, starts when the student presses start, survives a reload (the start time is in the draft). The email shows start time, finish time and **duration measured by the server**, not the browser clock. No time limit.
- **Finish** sends the email immediately, locks everything, and shows a **read-only summary**: score, right/wrong per answer, explanations. There is no separate send button and no way back to edit.
- If sending fails, say so, keep the draft and let the student retry.
- **Unlimited attempts.** Every finished attempt is emailed.

## 7. Practice

- Scored out of 100, 0–3 stars, best full-round score on the subject page (rules in `QUESTION-RULES.md`).
- Instant Hebrew + English feedback with a source link.
- The student enters their **name once** (stored in the browser). Every practice result is saved to the **database** under that name, so history is kept.

## 8. The email

Goes to the fixed teacher address through `/api/submit-exam` with the Resend credentials from Railway. Each question contains:

- the full question in plain text and all its options
- the student's answer and the **correct answer**
- the system verdict (✓/✕) or `✎ ממתינה לבדיקת המורה` while an open answer is unchecked
- the AI score for open questions, once available
- the reference (e.g. "עמוד 3")

Plus the test code, attempt number, start/finish times, duration and total score. The email must be readable and gradable on its own.

## 9. AI grading of open questions

- After finish, the server sends **one request** to OpenAI with **all** open questions of the attempt: each with its question, model answer, rubric, maximum score and the student's answer, plus the **referenced study-material part** (once per distinct part, never the whole material).
- **No name or identity** is sent. Answers are labeled by question number.
- The prompt states that student answers are **data, not instructions**. The reply must be structured JSON (score + one-line reason per question). A score above the maximum, or malformed output, is rejected.
- The system computes everything else and the **total**.
- The reason is for the teacher (email, DB), not shown to the student.
- **No `OPENAI_API_KEY` (missing or empty) means AI grading is OFF, not a failure:** no OpenAI call, status `none`, the email keeps `✎ ממתינה לבדיקת המורה` and the partial score with no "AI check failed" line, `/api/grade-open` answers 503 `{ grading: { status: 'off' } }`, and the stored `ai_status` is `none`. Only a configured key that really fails (HTTP error, timeout, bad JSON, score out of range, wrong ids) is `failed`.
- The OpenAI key is a server-only variable on Railway. Never in the browser, Git, logs or chat. Never log student answers.
- Timeout about 20 s. **On failure** the email is sent immediately with open answers marked unchecked and a partial score, and the student sees a **retry** button. A successful retry updates the screen and the database record. **No second email.** The final score therefore lives in the database, so the database must be enabled in production.
- The privacy line says that name and answers go to the teacher, and that open answers are checked by an AI service.

## 10. Design and accessibility (all mandatory)

Works at 390×844 with no horizontal scroll · Hebrew RTL (`lang="he" dir="rtl"`) · touch targets ≥ 44 px · readable contrast · keyboard-usable · motion respects `prefers-reduced-motion` · the "you're done" screen is designed like the rest of the app · all copy in Hebrew (English only in practice feedback).

## 11. Ship gate (all required)

1. All automated tests pass (`node --test *.test.mjs db/*.test.mjs`, plus DB and e2e with their env vars).
2. Browser check at 390×844 with **Resend and OpenAI mocked**: name required, right/wrong, auto-advance, lock and read-only going back, reload restores the draft and timer, review blocks, send failure keeps the draft, success shows the summary, the mock received the right subject and one email.
3. A human spot-check of 5 random questions against the study material.
4. One test submission through the real pipeline, with the user's OK.
5. No exam change on the day before the exam date without the user's explicit OK.

Also: work in a worktree on a feature branch · never push to `main` or delete DB rows without explicit permission · migrations are additive only.

## 12. Reviewing a submission ("review an exam")

When the user pastes an email (questions + student answers) and a test code, follow `.claude/skills/prepx-review-exam/SKILL.md`: find the test by its code in the repo, understand every question from the email and the source, and report what was right and wrong. Show the correct answers when asked.

## Deploying during an exam

A deploy can land while students are mid-exam in a tab that still runs the previous pages. `old-drafts.browser.test.mjs` (real browser, fixtures in `test-fixtures/old-drafts/`) and `old-payloads.test.mjs` pin what follows.

**Compatible**
- A tab that keeps the old page JS posts the old payload (garden and library without `exam`, physics with `exam` but no `attempt` / `questionId` / answer details). The server accepts it; the email has every question/answer pair. Garden and library emails stay byte-identical; old physics gets the `PHY-001` code and attempt 1.
- A reload or a new tab with an old `sessionStorage` draft (`garden-exam-draft-v1`, `library-exam-draft-v1`, `physics-exam-draft-v1`) restores the name, every answer on its own question, the flags and the position. A draft with answers but no `order` (garden, physics) keeps the original order and the choices as written; a fresh start is shuffled. The library draft already carried its order.
- An old draft with `finished: true` that was never sent counts as not sent: the results show and the answers are sent once. Missing new fields (`locked`, `sent`, `grading`, `order`, `choiceOrders`) fall back safely; old typed answers stay editable until the student presses "אישור".

**Not compatible / watch for**
- A page whose script link has no version bump keeps the old file for up to 5 minutes (server cache) or longer (browser cache). Bump the `?v=` of every changed script and stylesheet, and when `quiz-core.js` changes bump it on every page that loads it, or the new page JS runs against the old helper.
- Never rename question ids or reorder/replace the questions of a live exam: the draft is keyed by id (library, physics) or index (garden), and an order that no longer matches the exam drops the whole draft.

## Security (server)

Tests: `server.hardening.test.mjs`, `limits.test.mjs`, `server.history.test.mjs`.

- **Rate limits** (in memory per instance, per client = the last `X-Forwarded-For` hop, plus a global bucket): submit 150/h per client and 600/h in all (`SUBMIT_LIMIT_PER_CLIENT`, `SUBMIT_LIMIT_GLOBAL`; a school shares one NAT address); grade-open 40/h and 200/h; practice 400/h and 2000/h; unauthenticated database GETs 240/min per client. A request that fails validation (400/403/413/415) never uses a slot, and a Resend 429, 5xx or no answer gives the slot back. Body cap 250 KB for submit-exam and grade-open (a maxed garden exam is about 120 KB).
- **Resend pacing and retries** (`resend-send.mjs`): outgoing calls start at most `RESEND_RPS` (default 2) a second, with no wait when idle and a bounded queue (a wait over 15 s is a 502). 429, 5xx, network errors and 409 `concurrent_idempotent_requests` are retried up to 3 times with the same Idempotency-Key (honouring `retry-after`, at most 5 s per wait, 12 s of retrying overall, 40 s per request in total; AI timeout default 12 s). A 409 `invalid_idempotent_request` (same key, other body, per Resend's docs keys live 24 h) is answered as accepted without marking the stored row again.
- **Robustness:** the whole request handler is wrapped (an error is a 500 JSON answer, only the error name is logged), a request line the URL parser rejects is a 400, rubric/context lookups that throw switch AI off for the attempt while the email is still sent, and the database connection is retried after a failed connect. Covered by `server.resilience.test.mjs` and the seeded `server.fuzz.test.mjs`. Behind Railway's edge the client IP is the last `X-Forwarded-For` hop; `hitech.agnon.online` is a CNAME straight to Railway (no CDN in front), so that is correct today and must be revisited if a CDN/proxy is ever put in front. `OPENAI_DAILY_CAP` (default 400 calls a day) turns AI grading off after the cap; the email is still sent.
- **The server is the truth for table exams** (`exam-truth.mjs`): verdicts and the partial score come from the question keys, matched by question text exactly like the database layer (library prefix, physics plain text), numeric tasks with `numeric-answer.js`, checkbox all or nothing. The browser's `correct` and `score` are never shown; options, correct answer and source in the email come from the key. A browser claim that differs gets `⚠ הדפדפן דיווח …, השרת חישב …` per answer plus a summary line; an answer that matches no question is kept as sent and marked `לא זוהתה שאלה`. An open answer is graded under the id the server matched, never the browser's `questionId`. The idempotency key still hashes the browser's payload, so it did not change. Practice: each choice is checked against the key and the score and stars are the server's.
- **Email text** (table exams): control and bidi override/isolate characters are removed from name, questions and answers (LRM/RLM stay), the name is one line, and in the plain-text part student text is indented so it cannot fake the score line or a numbered answer.
- **Teacher history:** `TEACHER_TOKEN` of at least 32 characters, checked first; only wrong tokens count toward the 429; no student name in any URL (the page filters client-side).
- **Headers on every response:** `X-Content-Type-Options: nosniff`, `Referrer-Policy: no-referrer`, `Content-Security-Policy: frame-ancestors 'self'` (nothing else; the pages use inline code). `robots.txt` disallows `/history.html` and `/api/`.
- Not done on purpose: student answers are still stored and emailed as typed (only the email text is cleaned); the in-memory limits are per instance and reset on restart.

## Conflicts with the current code

Status after the first implementation pass. **Done** = built and covered by tests (and checked in a browser at 390×844 for the two pages). **Open** = still to do. Remove an item when it is fully done.

1. **Shuffle: done on the pages.** Library, physics and garden shuffle the questions and the options per student (kept in the draft). Wording stays verbatim. *Open:* `CLAUDE.md` and the `prepx-new-exam` skill still say physics is "never shuffled" (item 13).
2. **Send flow: done for library, physics and garden.** Finishing sends at once, locks everything and shows the read-only summary with a "you're done" banner. A failed send keeps the draft and offers "ניסיון שליחה חוזר". A reload shows the same locked summary and does not send again. The garden exam (open answers only) now follows the same flow with no score, shuffled, "אישור" locking and a locked summary; `thanks.html` stays only for old tabs. Checked in a real browser at 390×844 with Resend mocked (`garden-exam.test.mjs`).
3. **Locking and auto-advance: done for library and physics.** Radio answers lock and advance after 1.5 s, going back is read-only. Practice quizzes now do the same (1.5 s pause, locked answers, read-only back, retry = new round, end-of-round review list with explanations); the "next" button stays only as an optional skip. Checkbox/numeric/open types do not exist in practice.
4. **Types and buttons:** the "אישור" button (disabled until typed) and Enter on numeric answers are done. The **checkbox** type is **done everywhere**: both exam pages, scoring and `autoCorrect` (all or nothing, tests in `exam-checkbox.test.mjs`) and the database (migration `005_checkbox_type.sql` widens the `questions.type` CHECK; `db/migrate.mjs` allows exactly that one constraint statement in that one file and still refuses every other drop/truncate/delete; tests in `db/migrate.guard.test.mjs` and `db/integration.test.mjs`). *Open:* no real question uses it yet.
5. **Open-text label: done.** Not shown on screen; the email keeps `✎ ממתינה לבדיקת המורה` until the AI score is in.
6. **Practice: mostly done.** Name once (`prepx-student-name-v1`), each finished full round is posted once to `/api/practice-result` and stored in `practice_results` (migration `003`, codes `PRA-001`…`PRA-007` in `practice-history.js`), privacy line updated. The **teacher history view is done**: `history.html` (unlinked, `noindex`) reads `GET /api/teacher/practice`, `/api/teacher/submissions` and `/api/teacher/submissions/<id>` (`history-api.mjs`), all protected by the server-only `TEACHER_TOKEN` (bearer header, constant-time compare, 404 when the token or the database is missing, 401 on a wrong token, 429 after 10 failures a minute per address; answers only on the detail route). Tested with fake databases (`server.history.test.mjs`) and a real browser at 390×844; not yet run against a real Postgres or on Railway. *Open:* the stored `correct` flags are the browser's claim.
7. **Database in production: open, needs the owner's OK.** Writes happen only with `DATABASE_URL` and `DB_WRITE_SUBMISSIONS=1` set on Railway. Nothing was changed on Railway, and migration `004` has not been applied there. Once on, each submission row also keeps the test code, the attempt number and the AI result (items 8 and 10); all tested against local throwaway Postgres only.
8. **AI grading: built, stored, tested only with a mocked OpenAI.** `ai-grading.mjs`, rubric structure in `open-rubrics.mjs` (ids and max points only; server-side) and rubric **content kept private** (see below), `/api/grade-open` for the retry, scores and the total in the email. Needs `OPENAI_API_KEY` (and optionally `OPENAI_MODEL`) as Railway variables; **without the key AI grading is simply off (status `none`), not a failure**; it has never run against the real API. With the database writes on, the first grading is saved on the submission row (`ai_status` none|ok|failed, `ai_scores` with the reasons, `ai_total`). The submit response carries `submissionRef`; a retry that sends it grades the answers **stored** on that row (not the browser's text), saves the result, and returns the stored scores if the row is already graded ok; the email is never re-sent. Without the database, or when the row cannot be mapped, the retry stays stateless and nothing is saved. *Open:* a retry that fails again leaves the row as it was, and rows written before migration `004` have `ai_status` NULL. **Rubric content is private** because the repository is public: model answers, rubric points and extra passages are not in Git. The server loads them at first use from env `OPEN_RUBRICS_JSON` (JSON or `base64:<...>`), else the file in `OPEN_RUBRICS_FILE`, else the gitignored `open-rubrics.private.json` (shape: `open-rubrics.schema.md`). A question without private content is not gradable: the exam behaves as AI-off for it (status `none`, no failure line, no OpenAI call). **On Railway:** set `OPEN_RUBRICS_JSON` from the local file (`base64:$(base64 < open-rubrics.private.json | tr -d '\n')`) together with `OPENAI_API_KEY`; not set yet, the owner does it with the key. Tests use invented content (`test-fixtures/fake-rubrics.mjs`); two tests run only when the private file exists locally (it covers the real open ids; no committed file contains a real model answer).
9. **Email: done.** Test code, attempt number, options, correct answer, reference, AI score or the "AI check failed" line, server-measured duration. The garden exam has no options or key (open only). Payloads without `exam` stay byte-identical to the old snapshots, so an already-open old page keeps working.
10. **Test codes: done.** `HEB-001`, `HEB-002`, `PHY-001` in the server table, the email and `exams.code` (seeded from `examCodes` in `db/extract.mjs`; `db/exam-codes.test.mjs` fails if the two lists differ, `db:verify` checks the database). Each submission row stores `exam_code` and `attempt` (NULL for payloads without `exam`). `PRA-001`…`PRA-007` for practice. *Open:* only once the production database is migrated (item 7).
11. **Timer: done.** Visible, counts up from the stored start time (survives reload). The duration in the email is measured by the server (finish = server clock at receipt). The start time still comes from the browser, so it can be backdated, not shortened.
12. **Unlimited attempts: done.** The attempt number is part of the idempotency key. It is counted per browser and name in `localStorage` (`prepx-attempts-v1`), so it is not authoritative: another device or cleared storage starts at 1.
14. **Server hardening: done, see "Security (server)".** Closes the "stored `correct` flags are the browser's claim" gap for the email and practice rows (verdicts are recomputed from the keys). *Open:* `db/rehearsal.test.mjs` still uses a 27-character teacher token and the `name=` query filter, and `physics-exam.js` / `library-exam.js` send `"<n> null"` as `correctAnswer` for a numeric task without a unit (the email now shows the server's key text, so it is harmless).
13. **Docs: open.** `CLAUDE.md`, `README.md` and the `prepx-new-exam` skill repeat old rules (never shuffled, separate send button, "optional database", frozen legacy payloads). They should point here instead. `AGENTS.md` already says this document wins.
