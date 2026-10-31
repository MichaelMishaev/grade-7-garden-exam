# Physics practice: teacher reference parity

Michael requested that the four short physics quizzes use the exact questions from
https://physics7-measurement-sarit.sarityarongaya.chatgpt.site/.

Grade 7 students enter from the physics subject page. The existing quiz URLs stay:
physics-basics, physics-units, physics-precision, physics-pole. They now correspond
to the reference's four chapters, with 11, 5, 6, 5 tasks. Copy every prompt, option,
answer, model solution, explanation and SVG verbatim from the existing verified
teacher fixture. No new question writing and no changes to the full assessment.

Support the original choice, numeric (including optional working) and written
responses in the existing practice screen. Confirming locks an answer. Show the
teacher's solution for self-comparison on written questions, without claiming to
automatically grade them. Retain the existing optional next button; answers automatically advance after
1.5 seconds and explanations remain in the end-of-round review. Keep chapter order (some tasks refer to a preceding task); choice options
may shuffle. Mistakes repeat and mistakes-only retry remain for auto-graded tasks.
A dependent task also displays the preceding task's original data when retried.

Score only the auto-graded questions out of 100. Clearly count written responses
separately; never treat them as correct or wrong. Use a new best-score key for the
new physics content; preserve old stored records and Hebrew quiz scoring. Retrying
starts a new round. Existing practice refresh behavior is unchanged (new round,
no draft). Written responses stay in this browser. Auto-graded results retain the existing
name and history flow; no email or AI grading is added. Michael explicitly
authorized production deployment after local implementation.

Content extraction must retain the new types, correct answers and references.
Stale API quiz content must not replace the verified local physics content, even
when question counts happen to match. Subject labels/counts must agree with the
new chapters. Retain RTL, keyboard use, 44px controls and a layout without overflow
at 390×844. Figures must scale without clipping and feedback preserves HTML maths.

| ID | Acceptance and verification | Status |
| --- | --- | --- |
| PHY-P1 | Fixture identity test proves all 27 tasks, types, answers, options, models, figures and chapter counts | Passed locally |
| PHY-P2 | Mobile browser: all four rounds complete; right/wrong, numeric comma/fraction, confirm/Enter, locked answers, written model feedback, reask and retry work | Passed locally |
| PHY-P3 | Mixed-type results exclude written tasks; revised scores use separate storage; Hebrew regression passes | Passed locally |
| PHY-P4 | Stale API content is rejected; new subject labels/counts and old-score isolation pass browser checks | Passed locally |
| PHY-P5 | Extraction, automated suite, disposable local database seed/verify and full-stack mocked email tests pass | Passed locally |

Implementation defaults: preserve teacher chapter order and the current production
practice behavior (automatic advance, read-only back, history and final review).

## Local verification — 2026-10-31

- `node --test *.test.mjs db/*.test.mjs` with an isolated TEST_DATABASE_URL:
  121 passed, zero skipped or failed.
- `node --test e2e/full-stack.test.mjs` with an isolated E2E_DATABASE_URL:
  8 passed, zero skipped or failed; provider email is mocked.
- Migration, seed and verification on a new isolated local application database:
  112 total content questions, `db matches source`.
- Browser at 390×844: all 27 source tasks completed across all four quizzes;
  comma and fraction inputs, wrong numeric reask, mixed grading, written models,
  answer locking, full retry, mistakes retry, stale API rejection, score isolation,
  source links, zero horizontal overflow and zero JavaScript errors passed.
  Hebrew practice completed with bilingual feedback. No submission POSTs occurred.
- Screenshots were visually inspected after animations settled. Evidence:
  `output/playwright/physics-reference-sync/` (local only, excluded from commits).

The initial implementation above was local only. The subsequent production
integration and verified release are recorded below. The full physics assessment
was not changed.

## Production integration scope

Michael explicitly requested deployment after implementation. Integrate current main
without removing its name/history, 1.5-second advance, read-only back navigation or
end-of-round review. Typed answers lock and follow the same advance behavior.
Practice history stores the score and correctness of auto-graded questions only;
numeric input is validated and graded on the server, then only its verdict is
stored (choice -1 denotes a numeric response). Written responses stay in the
browser review and are never treated as wrong or sent to the history endpoint.

Migration 006 adds a retired flag for obsolete practice catalog rows. Seeding marks
missing practice questions retired and reactivates returning ones; reads and
verification use active content. No question, submission or result row is deleted.
Upgrade verification must cover retirement, idempotent reseeding and reactivation.

Release checks after integrating main: 312 automated tests passed, two private
rubric-file checks skipped; 9 full-stack tests passed using the shipped fake
rubric preload. Focused real-browser tests cover typed locking, automatic advance,
read-only back values, written review and mixed-type history. All four mobile
rounds and the dependent conversion retry passed again. Migration/seed/verify
passed locally; obsolete rows retire, reseeding is idempotent and returning rows
reactivate without deletion. Production rollout authorized by Michael.

## Verified production release — 2026-10-31

- Runtime commit: `4e63f7396871326c4061e3f1944f134a13e48629` on `main`.
- Railway deployment: `2edc5ccb-4b2a-4dc2-a0e9-f06c27b8fffe`, SUCCESS.
- Live site: https://hitech.agnon.online/subject.html?subject=physics.
- Migration 006 applied before rollout. Production seeding updated all 27 practice
  tasks and retired 17 obsolete rows in place. `db/verify.mjs`: `db matches source`.
- Live script, page and history-helper bytes match this release. The public APIs
  return 11/5/6/5 tasks with the exact prompts, types, choices, keys, explanations
  and references. `/api/health` returns `ok: true, db: up`.
- A real browser at 390×844 completed all four live rounds. Numeric wrong/reask,
  full and mistakes-only retry, self-comparison models, scores, source links,
  revised best-score keys and a Hebrew practice regression passed. Zero horizontal
  overflow and zero JavaScript errors. All POSTs blocked; no email or student
  submission was generated. Local live evidence is in
  `output/playwright/physics-reference-sync/live-browser.log` and `live-*.png`.

Status: specified, implemented, tested and deployed. Physical-device testing and
independent student/teacher acceptance were not performed.
