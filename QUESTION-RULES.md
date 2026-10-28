# Question Rules

Rules for every exam and practice quiz on PrepX. Status: partly implemented. Scoring, stars, re-asking and shuffling are in code (`quiz-core.js`, `practice.js`). Topic tags, difficulty values, question types beyond `mcq`, mark-for-review and XP are still planned.

## Content rules

1. Each exam has **15 to 25 questions**. Long exams are hard on a phone for 7th graders.
2. Use **at least 3 question types** per exam.
3. Difficulty mix: about **40% easy, 40% medium, 20% hard**. Start with easy questions.
4. Every question has a **topic tag**, so results can show strengths and weak spots per topic.
5. Every auto-graded question has a **Hebrew explanation** (practice also shows English with `dir="ltr"`).
6. **Shuffle** question order and choice order on every attempt.
7. One correct answer per question, except explicit multi-select questions.

## UX rules

1. One question per screen with a progress bar ("שאלה 7 מתוך 15").
2. Tap targets of at least 44px. Mobile first, RTL.
3. Back/forward navigation and a "mark for review" flag.
4. A review screen before submit lists unanswered and flagged questions.
5. Autosave drafts to `sessionStorage` (same pattern as `garden-exam-draft-v1`).
6. No timer by default. A timer is allowed only in an optional challenge mode.
7. No negative marking.
8. Never rely on color alone for right/wrong: add an icon and text.
9. Animations are **occasional celebrations**, not on every answer: a 3-correct streak, finishing a topic, a high score. All motion stays inside the `prefers-reduced-motion` contract.

## Question types

`mcq` (multiple choice), `truefalse`, `match`, `order`, `fill`, `open`.
All are auto-graded except `open`, which the teacher grades.

## Schema

```js
{
  id: "garden-07",            // unique, stable
  type: "mcq",                // mcq | truefalse | match | order | fill | open
  topic: "plants",            // used for per-topic results
  difficulty: "easy",         // easy | medium | hard
  prompt: "…",                // Hebrew
  choices: ["…", "…"],        // mcq / truefalse; pairs for match; items for order
  correct: 1,                 // mcq: index | multi-select: array | order: array | fill: array of accepted strings
  explanation: { he: "…", en: "…" }   // not needed for `open`
}
```

This is the target schema. Practice questions in `practice.js` currently use `{ text, choices, correct, he, en }`. At runtime they get `id: "q<index>"`, `type: "mcq"` and `difficulty: "medium"`.

## Scoring

Implemented in `quiz-core.js` (exposed as `globalThis.QuizCore`, tested by `quiz-core.test.mjs`). Only practice quizzes are scored; the full exam is open answers and has no automatic score.

### Weights

| Difficulty | Weight |
|---|---|
| easy | 1 |
| medium | 1.5 |
| hard | 2 |

A missing or unknown difficulty counts as medium. A question is worth `weight / sum(all weights) × 100` points, so a perfect run is always exactly 100. Exact values are kept internally and the returned numbers are rounded; students never see decimals. Current practice questions set no difficulty, so all weigh the same.

### Partial credit

`results[id]` is a fraction from 0 to 1 (clamped; missing counts as 0), so `scoreQuiz` already supports partial credit. Practice currently records only 1 or 0 per question, because every practice question is single-answer multiple choice. Partial-credit types (`match`, `order`, multi-select) are not implemented yet.

### `scoreQuiz`

```js
const WEIGHT = { easy: 1, medium: 1.5, hard: 2 };

function scoreQuiz(questions, results) {
  // results[id] = fraction 0..1; `open` questions are pending (teacher-graded)
  const total = questions.reduce((s, q) => s + weightOf(q), 0);   // unknown difficulty → medium
  if (!total) return { earned: 0, pending: 0, max: 100, percent: 0 };
  let earned = 0, pending = 0;
  for (const q of questions) {
    const pts = (weightOf(q) / total) * 100;
    if (q.type === "open") pending += pts;
    else earned += pts * clamp01(results[q.id]);
  }
  earned = Math.round(earned);
  pending = Math.round(pending);
  const gradable = 100 - pending;
  const percent = gradable > 0 ? Math.min(100, Math.round(earned / gradable * 100)) : 0;
  return { earned, pending, max: 100, percent };
}
```

`percent` is the score out of the auto-graded part only, so pending open questions do not lower it. No page uses `pending` yet: practice has no `open` questions, and the planned partial display ("ציון חלקי: {earned}/{100 − pending}") is not built.

### Stars and feedback

| Score | Stars (`starsFor`) | Tier (`feedbackTier`) |
|---|---|---|
| 90–100 | 3 | `great` |
| 75–89 | 2 | `ok` |
| 50–74 | 1 | `ok` |
| 0–49 | 0 | `low` |

### Score display (practice)

- The result screen shows stars, "{earned} מתוך 100", the number correct on the first attempt, and a Hebrew + English message for the tier. `low` is encouraging and uses amber, not red, with an emphasized "לתרגל שוב" button. That button is always shown.
- `great` launches confetti, except under `prefers-reduced-motion: reduce`.
- **Best score:** after a full round, the score is saved to `localStorage` key `prepx-best-<quiz>` only if it beats the previous best. "Mistakes only" rounds are never saved. Beating an earlier best shows "שיפרתם ב-{n} נקודות מהניסיון הטוב ביותר הקודם!".
- `subject.html` reads the same keys (read-only) and adds a badge to each practice row: stars + best score, e.g. "★★☆ · 80". It skips missing, malformed or out-of-range values, and storage errors.
- Scoring runs in the browser, so it can be tampered with. Treat it as feedback; the teacher's grading is the source of truth.

### Email (full exam)

- `garden-exam.html` POSTs `{ name, answers: [{ question, answer }] }` (exactly 20 answers) to `/api/submit-exam` in `server.mjs`. GitHub Pages posts to `https://hitech.agnon.online/api/submit-exam`.
- The server sends one email through Resend to a **fixed teacher address** (any recipient in the request is ignored), with a plain-text body and an RTL HTML version from `email-template.mjs`. Student input is HTML-escaped. There is no score and no parent copy.
- Checks: allowed `Origin` only, `application/json`, body up to 100 KB, name up to 120 characters, each question up to 1,000 and each answer up to 3,000 characters. It returns 503 if `RESEND_API_KEY` or `RESEND_FROM_EMAIL` is missing.
- Duplicates: identical submissions share a Resend `Idempotency-Key` (SHA-256 of name and answers).
- Rate limit: 100 valid attempts per hour per server instance, kept in memory (429 with `Retry-After: 3600`).
- The page clears the draft and opens `thanks.html` only after Resend accepts the email. Otherwise the draft stays and the student is asked to check with the teacher before retrying.
- Acceptance by Resend is not delivery. Only a provider delivery event or inbox receipt proves the email arrived. `server.test.mjs` uses a mocked Resend.

## Learning rules (practice mode)

Implemented in `practice.js`:

- Questions and choices are shuffled on every round (`shuffled`, `shuffleChoices`).
- Immediate feedback with a Hebrew explanation after each answer, plus English when the question has it. The physics quizzes are Hebrew-only.
- Only the first attempt counts. A missed question is re-asked 3 positions later in the same round, with reshuffled choices (`scheduleReask`). Re-asks do not change the score or streak.
- A streak badge appears at every 3 correct answers in a row (`streakCelebrates`).
- "לחזור רק על הטעויות" starts a round with only the missed questions (`missedQuestions`).
- Stars: 1 at 50, 2 at 75, 3 at 90.

Not implemented yet: per-topic results, XP, streak bonus, hints.

## Privacy

The exam collects only the student's name and answers. Drafts stay in `sessionStorage`; practice best scores stay in `localStorage`. The app server stores nothing and does not log answers; Resend processes the email content.
