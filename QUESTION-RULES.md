# Question Rules

Rules for every exam and practice quiz on PrepX. Status: draft, not yet implemented in code.

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

## Scoring

### Weights

| Difficulty | Weight |
|---|---|
| easy | 1 |
| medium | 1.5 |
| hard | 2 |

A question is worth `weight / sum(all weights) × 100` points, so a perfect run is always exactly 100. Keep exact values internally and **show the score rounded**; students never see decimals.

### Partial credit

`match`, `order` and multi-select give the fraction of correct parts (3 of 4 correct = 75% of that question's points). Everything else is all or nothing.

### Draft function

```js
const WEIGHT = { easy: 1, medium: 1.5, hard: 2 };

function score(questions, results) {
  // results[id] = fraction 0..1 for auto-graded questions, null for open (ungraded)
  const total = questions.reduce((s, q) => s + WEIGHT[q.difficulty], 0);
  let earned = 0, pending = 0;
  for (const q of questions) {
    const pts = (WEIGHT[q.difficulty] / total) * 100;
    if (q.type === "open") pending += pts;
    else earned += pts * (results[q.id] ?? 0);
  }
  return { earned: Math.round(earned), pending: Math.round(pending), max: 100 };
}
```

When `pending > 0` the score is partial: show "ציון חלקי: {earned}/{100 − pending}" and note that the rest awaits the teacher.

### Score display

- Students see their score on the result screen immediately.
- **Below 50:** show an encouraging Hebrew message and a prominent "נסה שוב" button (no red failure styling).
- Praise improvement over previous attempts ("שיפרת ב-15 נקודות").
- Scoring runs in the browser, so it can be tampered with. Treat it as feedback; the teacher's grading is the source of truth for graded exams.

### Email

- The FormSubmit mail to the teacher includes the score (and "partial" status when open answers are pending).
- An optional parent-email field is sent as FormSubmit `_cc`. It is **optional**, labeled as such, and the mail to the parent includes the score.
- Delivery from the Railway domain is still unconfirmed. This cannot be verified locally.

## Learning rules (practice mode)

- Immediate feedback with an explanation after each answer. In exam mode, feedback comes at the end.
- "Retry wrong answers only" after finishing.
- Missed questions are re-asked later in the same session.
- Results show progress per topic.
- Stars: 1 at 50%, 2 at 75%, 3 at 90%. XP per correct answer, with a streak bonus. Hints cost a little XP, in practice mode only.

## Privacy

Collect only name and class (plus the optional parent email). Nothing is stored server-side.
