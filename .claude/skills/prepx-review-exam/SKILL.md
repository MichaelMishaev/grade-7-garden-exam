---
name: prepx-review-exam
description: Use when the user pastes a PrepX exam email or submission (questions + a student's answers) together with a test code or exam id (e.g. HEB-002, physics-v1-assessment) and asks to "review", "check" or "grade" it, to say what was correct or wrong, or to show the correct answers. Not for auditing or editing an exam's code or content.
---

# PrepX: review a submitted exam

"Review an exam" means **grading a submission**, not auditing the exam's code. The user gives you the email text (questions + the student's answers) and the test code. Your job: understand exactly what each question was and tell the user what the student got right and wrong.

Rules and definitions live in `docs/TESTING.md` (single source of truth). Read §2 (types), §8 (email) and §9 (AI grading of open questions) first.

## Steps

1. **Identify the test** from the code or exam id. Find it in the repo: question data lives in `library-exam.js`, `physics-exam.js`, `practice.js`, the inline array in `garden-exam.html`, and `subject.html` (`subjects`, `references`). The server `exams` table in `server.mjs` maps ids to subjects.
2. **Understand every question** from the email and from the source. If they disagree (wording, options, correct answer), say so. Do not silently pick one. The email's text of the question wins for what the student actually saw; the source wins for the answer key.
3. **Grade each answer:**
   - choice / true-false: compare with the correct option.
   - checkbox: correct only if exactly the right set was chosen.
   - numeric: the number is the first line, `דרך חישוב` the working. Numbers are compared like the teacher's site (first comma is the decimal mark, no units, exact to 1e-8). See `numeric-answer.js`.
   - open text: judge against the model answer and rubric if the source has them; otherwise against the cited study-material part. Give a score out of the maximum and a one-line reason. If the email already has an AI score, compare yours with it and flag a large gap.
4. **Cross-check the email's own verdicts** (✓/✕, the stated correct answer, the total) against your grading. Report every mismatch: it is a bug in the system or the key.
5. **Report** a table: `#`, question (short), student answer, correct answer, verdict, and for open text score + reason. End with the total and the list of mismatches. Show the full correct answers and explanations only when the user asks, or always when the student got it wrong and the user said "explain".

## Rules

- Read-only. Never edit an exam, the key, the database or any file while reviewing.
- Never print student names or full answers outside this conversation, and never send them to any service.
- Hebrew text is quoted as written. Do not translate the question when reporting; translate your own comments to the user's language.
- If the test code is unknown or the exam cannot be found, say so and ask. Do not guess.
- Be honest about uncertainty: if an open answer is borderline, say "borderline" and why.
