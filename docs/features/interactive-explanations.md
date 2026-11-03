# Interactive explanations

## Intent and scope
Add Home → Explanations → Computer Science → if / else for Grade 7 beginners.
Michael explicitly requested English and an easy interactive playground. New content
uses English/LTR; existing Hebrew pages retain their language. Use Python as a labelled
implementation default. This is an unscored explanatory lesson with embedded knowledge
checks, not a new exam or practice round. No identity, scores, persistence, DB, email,
API, dependencies or deployment changes. Refresh resets the lesson.

## Experience
Explain conditions, True/False, mutually exclusive branches, indentation, and continuing
after the branch. The playground lets learners edit score, operator and pass mark,
updates code/branch/output immediately, and offers true/false/boundary presets.
A finite animation follows input → condition → chosen branch → continuation, with
play/pause, step, restart and cancellation on edits. Invalid/empty input pauses execution,
shows an actionable error and clears stale results; valid input recovers immediately.
Five inline questions reveal correct answers and English explanations immediately,
lock the chosen response, remain on screen for reading, and have individual retry buttons.
Each cites a local lesson section, not external study material. No timed quiz or score.

## Reference lock and decisions (before implementation)
Direct build against PrepX's existing design system. Research: existing index/styles,
Open Design localhost API design systems `duolingo` and `github`, and Refero bundled
motion and craft guidance (live Refero tools unavailable).

| Decision | Source and role | Reason |
| --- | --- | --- |
| White canvas, green CTA, rounded bordered panels | PrepX/styles + Open Design Duolingo | Preserve approachable existing learning UI |
| Monospace, numbered code rows and output pane | Open Design GitHub, code-only role | Make execution easy to follow |
| Plain English, LTR, simple numeric example | User request | Reduce beginner reading load |
| Branch diagram with one active route | User animation request | Show exclusive execution visually |
| Native controls, no decorative movement | Refero craft/motion + animate | Keyboard, touch, reduced-motion support |

## Acceptance criteria and planned verification
| ID | Observable result | Check | Status |
| --- | --- | --- | --- |
| EX-01 | Home links to English explanations; Computer Science links to lesson; back links work | Browser navigation | Passed locally |
| EX-02 | Lesson defines both branches, indentation and continuation; code is labelled Python | Content inspection | Passed locally |
| EX-03 | Score/operator/threshold update code, condition, selected branch and output without submit; equality boundary is correct for all six operators | Unit + browser | Passed locally |
| EX-04 | Play traverses four states once; pause holds; step advances; restart resets; edit cancels pending work | Browser | Passed locally |
| EX-05 | Five questions show correct/incorrect text, correct answer, rationale and source immediately; chosen answers lock; retry resets | Browser | Passed locally |
| EX-06 | Empty/out-of-range input clears stale result, explains recovery; valid input restores result | Unit + browser | Passed locally |
| EX-07 | 390×844 and desktop have no page overflow; keyboard controls and 44px targets; reduced motion removes movement | Browser and screenshots | Passed locally |
| EX-08 | Existing automated regression suite passes without production services | Node tests | Passed locally |

## Verification boundaries
Repository exam-specific email/DB flows do not apply to this unscored lesson. Run
non-destructive automated tests; DB/e2e reset schemas and require separate permission
under the repository hard rule. No production push authorized. Human educational
acceptance and physical-device testing remain separate from browser checks.

## Verification evidence — 2026-11-03
- Implemented on `codex/if-else-explanations` in an isolated worktree; not shipped.
- Node 24.22.2: full non-destructive suite, 129 total, 119 passed, 10 DB/e2e skipped, zero failures. Focused tests re-passed after the playback label correction.
- Chromium at 390×844 and 1280×900: navigation, all 18 boundary comparisons, threshold edits, both branches and continuation, play/pause/step/restart/replay, edit cancellation, empty/range/fraction validation and recovery passed.
- All five checkpoints checked with wrong and correct responses, locking, source links, retry and keyboard activation. Keyboard numeric changes and tab navigation passed. Reduced-motion step preserved without transforms.
- Screenshots inspected: `output/playwright/if-else-mobile.png`, `if-else-desktop.png`, `if-else-answer.png`, `explanations-desktop.png`. Reference lock preserved.
- Syntax and diff whitespace checks passed. Preview uses local createApp with no credentials/database and outbound email blocked. No production or student data accessed.
- DB reset tests, DB migration/seed (no content/schema changes), real email/AI, physical devices, screen readers, and human educational acceptance were not run.
- Browser tooling fallback: supplied wrapper references an unavailable CLI command; used official `@playwright/cli`. System Node has a missing dylib; used installed Node 24 without changing the machine.

## UX revision — Duolingo reference lock (2026-11-03)
User requested a Mobbin-based Duolingo UX improvement. Preserve English default,
Hebrew instructions, live editable values, immediate feedback and 3-second steps.
Research inspected five Mobbin screen previews:
- https://mobbin.com/screens/9fb54ed6-d4c9-465e-9f54-37d24bc8bcae — focused task and stable primary action.
- https://mobbin.com/screens/5e803e18-c7f2-4be5-abdc-68a604009cc2 — clear progress and generous task space.
- https://mobbin.com/screens/46846d71-0727-4d42-8d3d-73e2336bb3d0 — persistent explanatory feedback.
- https://mobbin.com/screens/12e43447-33df-4196-ba31-8c2fc8deabb9 — positive feedback with one continue action.
- https://mobbin.com/screens/9e684a14-b781-4560-a472-f525c8655a64 — selected answer and feedback hierarchy.

Decision ledger: Duolingo owns white surfaces, green primary actions, tactile borders,
focused stages and feedback hierarchy; existing GitHub-inspired code styling stays
inside the code panel. No new imagery or decorative animation. Add Learn/Playground/
Quick check stages with hash navigation, an explicit English/Hebrew instruction switch,
compact help, four-step execution progress, sticky playback controls, a mobile code/path
view switch, and one checkpoint at a time with retained answers and a finish state.

Revision acceptance checks (Not run before implementation): stage navigation and source
links reveal their panels; language switching preserves playback and inputs; mobile
code/path views keep controls visible; all six comparisons still work; all five questions
retain immediate feedback, locking and retry while Continue/Back preserve answers;
completion/restart works; mobile/desktop, keyboard and reduced motion remain usable.

UX revision verification: passed focused Node tests (5/5), syntax and whitespace checks.
Chromium at 390×844 and 1280×1000 passed stages/source links, English/Hebrew controls,
compact help, four-step progress, code/path views, validation and all six comparisons,
all five correct/wrong feedback paths, locking/retry, Back/Continue, retained answers,
completion/reset, no horizontal overflow, and reduced motion. Screenshots inspected:
`output/playwright/ux-mobile-playing.png`, `ux-mobile-feedback.png` and desktop workspace.
No dependencies, API/database, exams or production changes. Broad regression suite was
not repeated for this UI revision; the earlier run is recorded separately above.

## Production baseline correction — 2026-11-03
Michael identified that the preview used an obsolete homepage. The initial branch was
based on `365b8c7`; preserved all feature files in a temporary backup, fetched main, and
fast-forwarded this feature branch to `5f573f4`. Its index.html was byte-identical to the
live production homepage fetched during this check. Reapplied only the explanations
stylesheet and header navigation link to that homepage. The small `{ }` header action
opens the explanations category; desktop also shows its text label. This preserves the
production calendar-first layout, all three subjects, both games, PWA and date chips.

Verified nine focused tests (lesson, PWA, calendar layout and calendar wheel/keyboard/
touch scrolling): all passed, including original first-screen checks at 320–1440px.
Compared local/live screenshots at 390×844; verified desktop screenshot and the local
home → explanations → lesson path, Hebrew playback and question feedback. Preview
server restarted against current code, with no credentials/database and email blocked.
No production deployment or main-branch push. Earlier 119-test evidence describes the
old baseline; it does not establish the full current production regression suite.

## Kids-first simplification and bilingual instructions — 2026-11-03
Michael requested an explicit English/Hebrew instruction switch and said the lesson had
too much text for children, asking for fresh agents. Two fresh reviews independently
identified repeated headings and control bands above the example. A separate fresh
agent verified the implementation in its own browser.

Changes: compact header with a persistent language switch; one short task sentence;
primary score slider synchronized with numeric input; optional comparison/threshold
inside Change the rule; short collapsed help; short execution captions; diagram-first
mobile view. Desktop retains score presets, while mobile uses the slider and number
field to avoid redundant controls. Instructions, labels, play/pause/reset, errors,
branch states and captions switch together. Python and printed output stay English.
Questions remain English and retain their existing immediate-feedback flow.

Acceptance: at390×844 the task, interactive score, decision diagram and Play appear
without long introductory copy; at1280×900 both code and diagram are visible. Language
switches preserve values, view, playback and question answers. Help/rule settings stay
collapsed until requested. Code semantics, 3-second pacing, reduced motion, production
homepage/calendar/PWA are preserved.

Verification: independent QA passed slider/number sync, >= versus > at60, reversible
language switching, state preservation, rule/help collapse, mobile view switch,3-second
playback, validation, all five questions with back/retry/completion/reset, desktop panels
and no page errors. Mobile duplicate preset row was removed after screenshot review.
Nine focused Node/browser tests passed (lesson, PWA, production calendar layout and
wheel/keyboard/touch scrolling), plus syntax and whitespace checks. No deployment.
No testing with actual children or physical-device/screen-reader acceptance performed.
Final fresh-agent visual recheck passed: at390×844 in Hebrew the language switch spans
y10–54, final diagram node y567–615, and Play y703–751 (unobscured and before fold).
At1280×900 both panels fit, final node ends aty751 and Play ends aty890. Final screenshots
`kids-independent-final-hebrew.png` and `kids-independent-final-desktop.png` inspected.

## Designed discovery entry — 2026-11-03
Michael rejected the header-only navigation treatment and requested a designed page.
Replaced that shortcut with a visible Explanations section after the existing games on
Home, with a small original branch diagram and a Computer Science feature card. Designed
the dedicated explanations page around one category and an if/else lesson preview, short
copy, included activities, bilingual availability, and a single Start action. No fake
categories, decorative motion, new dependencies, or generated assets.

Reference lock remains PrepX/Duolingo white surfaces, green actions and tactile borders;
code-native branch graphics explain the actual lesson. Mobile stacks preview and lesson
information, desktop shows them side by side.

Verification: nine focused tests passed; browser checked Home section → discovery →
lesson, keyboard launch, Hebrew instructions, and no mobile/desktop page overflow.
Screenshots inspected: discovery-home-section-mobile.png, discovery-hub-mobile.png and
discovery-hub-desktop.png. The calendar test now checks the existing core through the
games rather than footer position, since the requested new section intentionally extends
the page below that core; it also asserts the designed section and absence of header
shortcut. Original calendar/subject/game positions remain unchanged. Not deployed.

## Visual learning screen — 2026-11-03
Michael requested a designed kids screen after seeing the raw Python/output panel.
The default view is now a visual decision board at every viewport, with a score tile,
condition card, two illustrated branch cards, selected/skipped text and a shared
continuation tile. Green marks the selected True route; blue marks a selected False
route (False is a valid path, not a wrong answer). Python is a secondary toggle on all
sizes. Its output is a designed result card with waiting/success/practice symbols and
a separate continuation badge. Print literals remain English and unchanged.

Desktop uses a control rail beside the board; mobile stacks the score and board.
Language controls, three-second playback and question feedback are preserved. Fresh
independent QA checked behavior. Root browser checks passed all18 comparisons, exactly
one selected route, result waiting/true/false states, continuation timing, Hebrew phase
labels, keyboard slider and reduced motion. Invalid score text is sized for mobile.
Desktop screenshot inspected: designed-screen12-desktop.png; at1280×900 the final tile
ends aty659, the dock starts aty691 and Play ends aty809 (no overlap).

## Home illustration and discovery language picker — 2026-11-03
Michael explicitly requested fresh agents for both followups. One fresh agent generated
a transparent child-friendly robot selecting one path using the built-in image_gen;
original1254×1254 RGBA PNG copied unchanged to assets/explanations-choice-robot.png,
with generation prompt alongside it. Root integrated it into the homepage feature card
and inspected rendering at390×844. Existing caption/CTA remains live HTML.

A separate fresh agent implemented explanations-language.js and the discovery picker.
It translates page copy/accessibility labels, switches Hebrew prose/page to RTL, and
keeps the actual code/output diagram LTR. The selected language is encoded in ?lang=,
survives reload, carries into the lesson and back, with no browser storage. Root added
lesson URL initialization and responsive picker/RTL styling. A language change preserves
lesson inputs and playback position. The literal code and printed output stay English.

Integrated browser checks passed: image decoding/natural size, home/card navigation,
keyboard language selection, Hebrew/English reversal, reload, mobile/desktop overflow,
lesson handoff/back and playback/value preservation. Screenshots inspected:
home-robot-final.png, hub-hebrew-picker-mobile.png, hub-hebrew-picker-desktop.png.
Nine focused automated tests, module syntax and whitespace checks passed. Not deployed.

## Release validation — 2026-11-03
User explicitly authorized pushing all feature changes to main. Full current-baseline
suite passed:326 tests total,318 passed,8 skipped,zero failures (56.4seconds). Added a
durable explanation browser test covering image load, bilingual discovery/reload,
language handoff, default visual board, slider boundary/strict comparison,3-second
pacing, state preservation, optional Python result, validation and question feedback.
Aligned the second legacy footer-fit assertion with the intentionally extended home
while preserving first-screen visibility of the existing core content. Browser logs and
screenshots are local artifacts and excluded from the release.

## Write-code stage — 2026-11-03
Michael asked for a text code editor "in Apple style terminal" inside the if / else lesson so a
kid can practice writing if / else statements, understand what the windows are, and try with help.
Added a fourth lesson stage, `#terminal` ("Write code"), between Playground and Quick check.

- `code-runner.js`: a safe interpreter for a Python subset (assignments, `print()` with several
  arguments, `if` / `elif` / `else`, the six comparisons, `+ - * / %`, strings, numbers, True/False,
  comments, 2- or 4-space indentation). No `eval`; variables live in a `Map`; 200-line / 5000-step
  caps. Errors carry a code and a 1-based line number; `describeError` turns them into kid
  language in English or Hebrew ("Line 2: an if, elif or else line must end with a colon").
  `missions` holds four tasks (run and change, fix the broken program, write your own if / else,
  three paths with elif), each with a starter, hint, solution and an output check.
- `code-terminal.js`: the UI. macOS-style windows (traffic lights, title bar) for the editor
  (`textarea` with a synced line-number gutter) and the Terminal (`$ python3 if_else.py` prompt,
  output, red error line, yellow "not the expected output" note, green mission-done line).
  Tab and the ⇥ Indent button insert four spaces (phones have no Tab key); Enter keeps the
  current indentation and adds four spaces after a colon; ⌘/Ctrl+Enter runs. On an error the
  offending line is selected in the editor. Hint toggles, Show me loads the solution, Reset
  restores the starter; Next mission unlocks only after the check passes. Drafts per mission are
  kept in memory only; refresh resets, like the rest of the lesson.
- Bilingual through the lesson's existing `data-copy` dictionary plus the module's own copy table;
  code, gutter and output stay LTR in Hebrew. Mobile editor font is 16px so iOS does not zoom.
- Tests: `code-runner.test.mjs` (interpreter, errors, missions) and
  `if-else-terminal.browser.test.mjs` (missions flow, error message, indent helpers, Hebrew, no
  horizontal overflow at 390 and 1280). `explanations.browser.test.mjs` now waits for the lesson
  module before asserting the Hebrew `lang` attribute (the extra module imports made the old
  race visible). Cache versions bumped: `explanations.css?v=15`, `if-else.js?v=14`. The hub lists
  "⌨ Code editor" for lesson 1.

### Kid clarity pass — 2026-11-03
Michael: "terminal not clear to kids". Replaced the `$ python3 if_else.py` prompt with
"▶ Running your code…", added green badges on both windows ("YOUR CODE · tap to edit",
"THE COMPUTER ANSWERS"), a numbered three-step how-to above the mission card, the
"What are these two dark windows?" help open by default with plainer wording, and a
"your code works, but the mission is not done yet" note that points back to the green card.
The hub card got a black terminal-style button straight into `if-else.html#terminal`.

### Easy mode for struggling 12-year-olds — 2026-11-03
Michael: "must be easy to use for 12 years old kids that try to study and its hard".
Six missions now start with zero typing: 1 just press Run (pre-solved, `startsSolved`),
2 tap the 🔢 "Change the number" suggestion then Run, 3 fix two mistakes, 4 type a four-line
if / else, 5 add an elif (the ➕ suggestion gives the structure, the kid edits the number and
the word), 6 free play. Every mission card has a dashed "👉 do this now" line naming the exact
button; a finished card turns green with "🎉 Done! Tap Next mission". After two unsuccessful
runs the hint opens by itself, prefixed "💡 Here is a hint:". Error messages were shortened to
one action each. "Try a change" suggestion chips (`suggestions` in code-runner.js) edit the code
for the learner and explain what to look for; chips that do not fit the current code are greyed.
