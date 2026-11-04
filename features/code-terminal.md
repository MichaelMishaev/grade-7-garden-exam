# CODE-TERMINAL — Coding terminal hub

## Specification

Students need a direct home-screen entry to a coding workspace that can grow beyond the if/else lesson. Flow: Home → מסוף קוד → choose a subject (currently only if / else) → existing guided terminal. A separate כתיבה חופשית entry opens an unrestricted-by-missions editor using the existing Python subset interpreter.

Confirmed requirement: keep Python syntax. Supported: assignments, numbers/strings/booleans, arithmetic, comparisons, print, if/elif/else; not full Python or pseudocode. No new interpreter, exams, questions, scoring, APIs or database changes. Free code executes locally, is never submitted, and is saved in this tab's sessionStorage under a new dedicated key. If storage fails, editing/running remains available and the page says saving is unavailable. Reset restores the starter; browser back returns to the subject picker without discarding code.

Design lock: use the supplied home screenshot and existing PrepX components: white canvas, Hebrew RTL, green learning action, existing subject rows and dark editor/output windows. Code and program output stay LTR. No new imagery; subsequent user requests added a slow, highlighted editor-change animation. Reuse existing CSS tokens/components; touch controls ≥44px, visible keyboard focus, no page overflow at 390×844. New topics can be added as independent subject links without changing the home entry.

## Acceptance criteria

| ID | Observable behavior | Verification | Status |
|---|---|---|---|
| CT-01 | Home has a visible מסוף קוד entry before explanations, linking to the hub | Mobile browser | Passed |
| CT-02 | Hub lists only if / else as a subject and a separate free-coding option | Browser | Passed |
| CT-03 | Subject opens existing guided terminal in Hebrew; missions still run | Existing terminal browser regression + new navigation check | Passed |
| CT-04 | Free coding runs valid Python-subset code without mission gating; errors include a line number, empty output is explicit, unsupported syntax fails gracefully | Browser + runner unit tests | Passed |
| CT-05 | Free draft survives refresh and navigation back/forward; blocked storage leaves editor usable with accurate notice; reset updates draft | Browser | Passed |
| CT-06 | Hebrew UI, LTR editor/output, keyboard run/indent, ≥44px controls, no 390px overflow, no runtime errors | Mobile browser and screenshot inspection | Passed |
| CT-07 | Limits and supported syntax are visible; code is never sent to an API | Browser request inspection + runner limit tests | Passed |

## Delivery

Implemented and locally verified on `codex/terminal-subject-hub`.

- New browser flow passes at 390×844; picker also checked at 1280px. Screenshots inspected for home, picker, and editor. No overflow, runtime errors, or write requests.
- Existing runner + guided terminal: 10/10 focused checks passed. New terminal browser regression passed.
- Full suite with local test Postgres: 359 checks, 356 passed, 2 skipped, 1 unrelated failure in `db/integration.test.mjs:23` (reference-count assertion expects 9, current source yields 17).
- Full-stack with local e2e Postgres and mocked services: 9/10 passed; `e2e/full-stack.test.mjs:205` expects AI status `failed`, receives `none`. Exam/AI code is unchanged by this feature.
- JavaScript syntax check and `git diff --check` passed. No new questions/content, so standalone app seed/migrate and question spot checks were not applicable. No real submission or deployment performed.
- Preview artifacts: `output/playwright/terminal-{home,picker,free}-mobile.png` (not for commit).

Publishing requires explicit authorization.

## Follow-up: readable child-facing tasks (2026-11-04)

User request: Hebrew tasks must be RTL, gentle, and understandable without deciphering a crowded screen. Reusable guidance is installed at `~/.codex/skills/kid-learning-tasks/SKILL.md`.

Scope: rewrite the six existing mission instructions without changing executable examples/checks; show numbered actions and expected output with a Hebrew explanation of English literals; isolate inline code as LTR. Task header/actions/progress inherit the selected language direction. Put Run and Continue inside the task card, and put help and extra tools behind collapsed disclosures. Remove the repeated introductory instructions. Preserve the earlier slow editor change animation.

Acceptance: a beginner can run task 1 from the card, see the expected result, continue, and change the number in task 2 using the card action. All six missions have visible steps/results, correctly aligned Hebrew progress/actions, LTR code fragments, and no mobile overflow. Help stays optional; switching English/Hebrew updates the whole task. Verify using focused runner/unit/browser checks and screenshots. Child comprehension still needs human observation; automated completion does not establish that.

Follow-up verification: 17 focused checks passed (runner, all six mission solutions, existing lesson behavior, terminal hub/free coding, Hebrew RTL actions/progress, optional help, direct task actions, English switching, 390px/1280px overflow). Skill frontmatter/name validated. Reviewed the actual refreshed integrated-browser task and mobile screenshots. No live deployment or student usability study.
