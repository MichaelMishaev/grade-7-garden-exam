---
name: prepx-scores
description: Use when asked about PrepX scores, grading, points, stars, weights, partial credit, best-score badges, or the score shown in the exam email — to explain, check, compute, or change how scoring works. Also use before editing quiz-core.js, QUESTION-RULES.md scoring sections, or practice quiz questions (difficulty/type affect score).
---

# PrepX scores

Single source of truth: **`QUESTION-RULES.md` → "Scoring"** (rules) and **`quiz-core.js`** (code). Read both before answering; never answer from memory, the doc and code change.

## Where things live

| What | File |
|---|---|
| Rules (weights, partial credit, display, email) | `QUESTION-RULES.md` |
| Scoring code: `scoreQuiz`, `starsFor`, `feedbackTier`, `WEIGHT` | `quiz-core.js` |
| Tests for the above | `quiz-core.test.mjs` (`node --test quiz-core.test.mjs`) |
| Quiz questions (`difficulty`, `type`, `correct`) | `practice.js` (`quizzes`) |
| Result screen, best score saved to `localStorage` key `prepx-best-<quiz>` | `practice.js` |
| Best-score badge + stars on subject page | `subject.html` (`showBestScores`) |
| Score in teacher email | `email-template.mjs`, `server.mjs` |

## Current model (verify against code before quoting)

- Weight by difficulty: easy 1, medium 1.5, hard 2 (unknown difficulty → medium).
- Question points = `weight / sum(weights) × 100`; perfect run = 100; rounded for display.
- Partial credit only for match / order / multi-select; others all-or-nothing.
- `open` questions are **pending** (teacher grades); score is then partial: `earned / (100 − pending)`.
- Stars from `percent`: ≥90 → 3, ≥75 → 2, ≥50 → 1, else 0. Feedback tier: ≥90 great, ≥50 ok, else low (encouraging, no red).
- Scores run client-side → feedback only; teacher grade is the truth.

## Workflows

**Explain / give a score:** read the doc + `quiz-core.js`, then answer with the formula. For a concrete case, compute it by running:
```bash
node -e "require('./quiz-core.js');const{scoreQuiz,starsFor}=globalThis.QuizCore;const qs=[{id:1,difficulty:'easy'},{id:2,difficulty:'hard'}];const r=scoreQuiz(qs,{1:1,2:0.5});console.log(r,starsFor(r.percent))"
```
Replace `qs`/results with the real case.

**Check doc vs code (drift check):** compare the weights, thresholds, partial-credit rules, storage key and email description in `QUESTION-RULES.md`/`README.md` against `quiz-core.js`, `practice.js`, `subject.html`, `email-template.mjs`. Report each mismatch with file:line. Then run `node --test quiz-core.test.mjs server.test.mjs`.

**Check a quiz's score setup:** in `practice.js`, every question needs a valid `difficulty` and `correct`; list quizzes with their question count and weight mix, and the points each question is worth.

**Change scoring:** update `quiz-core.js` + `quiz-core.test.mjs` first (tests must pass), then update `QUESTION-RULES.md` and any hard-coded copy (Hebrew result text, badge aria-label, email template) in the same change. Bump `?v=` on any stylesheet you touch.

## Rules

- All user-facing score copy is Hebrew; practice feedback also in English (`dir="ltr"`).
- Never log student answers; no student data stored server-side.
- Report only what you verified. If doc and code disagree, say so and trust the code.
