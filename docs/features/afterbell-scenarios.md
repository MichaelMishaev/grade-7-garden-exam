# Afterbell: ten playable scenarios

Status: revision 2 implemented and locally verified; not committed or deployed. User request (2026-10-31): subjects currently repeat the same tasks; create and test ten scenarios, new interactions and movements, then implement.

## Outcome and boundary
Grade 7 students choose a source-backed practice set and a recommended adventure (or any of ten adventures). Each adventure has three field stages with distinct routes and a mix of mechanics. Completing a field stage opens one third of the selected quiz, then advances to the next field stage. All three stages and all original questions are required before exiting. This replaces the repetitive social → fetch equipment → return loop for new rounds. Existing drafts without a scenario retain their original flow. No new academic questions, grading changes, service/API/database changes, production writes or deployment.

## Scenario catalogue
| ID | Hebrew title | Recommended study set | Three field stages |
|---|---|---|---|
| evidence | תיק הראיות | facts | inspect scene objects; connect evidence to conclusions; reconstruct four events |
| witness | העד שנעלם | questions | interview two witnesses; compare timetable claims; search actual hideouts |
| robot | חילוץ הרובוט | instructions | program a 5×5 maze; repair four wires; escort a moving robot |
| survey | מודדי הקמפוס | physics-basics | align ruler endpoints; trace a parcel and calculate area; scale two map dimensions |
| freight | משלוח במידות | physics-units | repair a unit manifest; balance weights; rotate and pack three shapes |
| optics | המעבדה המדויקת | physics-precision | focus/expose an image; remove parallax; sample and reject an outlier |
| shadow | סוד הצללים | physics-pole | manipulate light/shadow; compare shadow proportions; record sundial observations |
| rescue | מחזירים את השועל | facts | earn physical fox trust; construct a shelter; manage calm/water/rest |
| relay | האות האחרון | questions | synchronize waves; compose grouped Morse; reconnect a damaged network |
| courier | שליחי הלילה | instructions | plan a budgeted route; complete four movement sensors; deliver coded parcels |

Fictional field puzzle clues are supplied on screen; they do not claim to replace academic content. Academic prompts, options, correct indices, references and scoring stay source-identical.

## State and recovery
Store scenario ID, completed field stage count, current substep and carried-tool status in the existing per-tab round draft. Validate resumed state and bound indices; unknown/malformed scenario state rejects the draft. Refresh resumes the current field stage and locked answers; interviews, samples, packing, trust and escort position are retained. Revision-1 unfinished operations restart in the wider task; completed stages and locked academic answers remain intact. Completed field stages are idempotent. Escape/cancel closes a puzzle without awarding completion. Wrong attempts give specific feedback and retry without score penalty. Subject change selects a matching recommendation; explicit scenario selection stays available. New rounds rotate among recommendations when there is more than one, avoiding the last adventure when possible; last choice stored locally without identity.

## Controls and visual lock
Preserve the supplied screenshot's dusk campus, Hebrew RTL, Heebo typography, amber primary actions and existing panel geometry. Add a compact scenario selector and stage status; keep all game controls at least 44px. Code-native numbered world markers and props identify actual field targets. C crouches/touch toggle; Q dashes/touch button with cooldown; Space jumps. Escort requires the robot to arrive, trust requires quiet physical proximity, and the course requires real jumps/dash/landing; movement never bypasses collisions. No countdown or loss of academic points. Pausing freezes field progress. Guidance leads to the next marker but does not complete jump/crouch/puzzle actions. Keep reduced-motion support and current privacy/save behavior.

Design evidence: user screenshot and existing shipped campus are primary reference; bundled refero-design craft guidance supplies native form labels, focus-visible, touch targets and modal scroll containment. Refero tools unavailable; local Open Design health returned OK, but the work is existing Three.js gameplay with no new visual template needed.

## Acceptance criteria and planned evidence
| ID | Observable outcome | Verification method (results below) |
|---|---|---|
| SC01 | Exactly ten selectable IDs, each with 3 stages, unique route/mechanic signature; all 7 quiz sets receive relevant defaults | unit catalogue tests |
| SC02 | Default subject change alters recommended adventure; explicit selection controls new round; repeated play rotates paired recommendations | unit + browser selection |
| SC03 | All 10 scenarios can finish field stages; wrong order/value/program fails with retry and no academic-score effect | unit reducer + browser ten complete journeys |
| SC04 | Checkpoints require proximity and actual jump/crouch/carry state; distant/wrong actions cannot complete | unit + browser controls |
| SC05 | Each stage unlocks its source questions only after field completion; locked first answers, full coverage and final gate remain required | browser complete journeys + core tests |
| SC06 | Refresh restores field substeps and solved stage pending quiz; old drafts still work; malformed new drafts rejected | unit + browser reload |
| SC07 | Dash cooldown, crouch speed/pose, carrying restrictions, manual guide override and pause behave visibly | browser keyboard/touch + official game client |
| SC08 | At 390×844 and desktop, selector, HUD, puzzles, controls and numbered markers are usable, no overflow or new browser errors | screenshots inspected + browser tests |
| SC09 | Final built nested page works on port 4328; service and main mocked submission regressions pass; no real attempt/email POSTs in QA | built smoke + test suites |

Human engagement acceptance remains Michael's playtest; automated completion does not prove fun. Production publication requires explicit authorization.


## Revision 1 verification — historical, 2026-10-31

- SC01–SC06: 13 scenario catalogue/rule/recovery tests pass. All 10 mechanic sequences differ. Existing core/source tests retain all 62 academic questions and first-answer scoring.
- SC03–SC08: `tests/qa-scenarios.mjs` passed **592 checks across 20 complete journeys** (all 10 adventures on desktop 1440×1000 and touch 390×844 with reduced motion). Covers wrong-operation retries, all field stages, complete question coverage, gated exit, four reload/resume cases, journal, movement/crouch/dash/pause, route reachability and two intercepted final saves. Zero uncaught browser errors; no real history writes or email.
- SC01, SC02, SC07–SC09: `tests/qa-scenarios-built.mjs` passed **46 checks** on the actual nested build at port 4328: all seven subjects select relevant recommendations, explicit scenario override, normal guided movement, manual interruption, slower crouch movement, robot route and final token position, completion-to-question button, locking, frozen accepted scanner reading, touch targets and no horizontal overflow. Zero console/page errors and zero result POSTs. No positioning hooks exist in that build.
- Visual QA inspected desktop/mobile field markers, cargo, sequence, robot grid and scanner. Corrected reset-to-start robot rendering, animated program execution with a reduced-motion fallback, froze accepted scanner readings, and removed a desktop control/hint overlap. These presentation fixes were rechecked in the built suite after the 20-journey run.
- Game unit/service suite: **39 passed, 1 optional PostgreSQL test skipped**. Repository regression: **285 passed, 8 DB/private-fixture checks skipped**. Focused main/static/submission mocks: **25 passed**; final built asset integration passed. E2E: 9 skipped without E2E_DATABASE_URL. No database seed/reset or real email was needed for this game-only change.
- Build, JS syntax and whitespace checks pass. Existing bundle-size warning remains. Previous published assets are retained for cached older HTML.
- Evidence (local, not for commit): `output/playwright/scenarios/report.json`, `output/playwright/scenarios-built/report.json`, and their screenshots. Physical-device acceptance and Michael's engagement/playtest feedback are outstanding; automated completion verifies behavior, not enjoyment. Production publication remains unauthorized.

## Revision 2 — no repeated tasks across adventures (2026-10-31)

Michael rejected the first version because its adventures recombined the same tasks. The previous verification proves only revision 1. Revision 2 replaces that task catalogue; its verification is recorded below.

Each adventure now owns three distinct task types (30 unique IDs); no task type may appear in another adventure. Sharing a button, range input or SVG renderer is fine; reusing a puzzle with another title/target/route is not. Each stage has multiple meaningful operations or a physical-world requirement, its own evidence and solution rules, and a visible consequence. The three source-question segments remain between stages; academic content/grading stays unchanged.

| Adventure | Exclusive tasks |
|---|---|
| Evidence | inspect a scene and collect actual evidence; connect each clue to its supported conclusion; reorder a four-event timeline |
| Witness | branching interviews with two witnesses; locate contradictory timetable entries; choose and physically search hideouts |
| Robot | program a larger obstacle grid; connect a four-wire circuit without a short; physically escort a moving robot that must arrive too |
| Survey | align ruler endpoints and record length; trace a land parcel and calculate area; calibrate a map scale and two dimensions |
| Freight | convert a manifest and choose a suitable vehicle; distribute physical weights across a balance; rotate and pack three shapes without overlap |
| Optics | focus/expose a blurred target; eliminate parallax between two sightlines; take five samples and reject an outlier |
| Shadows | position a light and predict shadow direction; compare reference/mast shadow proportions; record and compare two sundial observations |
| Wildlife | earn a fox's trust through sustained quiet proximity; lay out a shelter with a clear entrance; manage the animal's calm/water/rest needs |
| Radio | synchronize waveform frequency/phase; compose grouped Morse SOS; reconnect a network around a damaged node |
| Courier | plan a delivery route within a distance budget and key dependency; complete a four-part jump/dash course; deliver distinct parcels to actual lockers |

AC R2-01: exactly 30 distinct task IDs, with no intersection between scenario task sets; unit catalogue test.
AC R2-02: every task rejects a representative wrong/incomplete action and accepts its own complete solution; reducer tests for all 30.
AC R2-03: inspect/interview/sample/packing/circuit/network tasks cannot be passed by one generic confirmation; tests exercise required intermediate state.
AC R2-04: robot escort requires the companion, fox trust requires quiet proximity for three seconds, courier course requires its actual movement, searches/lockers require being at the selected location; unit and real-browser checks.
AC R2-05: partial task state survives reload; revision-1 unfinished field operations reset safely while completed stages and locked academic answers stay intact. Bounds-checked local state; no API/schema change.
AC R2-06: all 30 task interfaces work on desktop and 390×844 touch with no overflow, reachable retry/finish controls, source-answer locking and final gating; browser journeys and inspected screenshots. Human fun acceptance remains a playtest.


AC R2-07: the ten optional bonus objectives also have ten different environment IDs. New rounds cannot interact with the hidden legacy equipment. Noticeboards show the selected adventure, while old saved rounds retain their equipment flow. Unit + focused browser isolation checks.

## Revision 2 verification — current

- **45 scenario/rule tests passed**, including all 30 exclusive task kinds, individual and consecutive solutions, partial reload, migration from revision 1, physical requirements, limits/bounds, and ten unique bonus assignments.
- **578 checks across 20 complete browser journeys passed:** all 30 tasks on desktop 1440×1000 and emulated touch 390×844, real robot companion movement, physical course actions, gradual fox trust, partial trust/packing recovery, correct source question coverage and first-answer locking, final gate and two mocked exit saves. Zero uncaught browser errors; no real history writes or email. The run caught a courier checkpoint leak; resetting task-local state at transitions fixed it and ten consecutive-stage regressions now cover it.
- **44 focused isolation checks passed:** ten different optional objectives, no hidden legacy equipment actions in any new adventure, current task descriptions on noticeboards, and an actual legacy saved round still exposes its original equipment. No errors or result writes.
- Built page: **49 checks passed** across desktop/mobile on the nested port-4328 page. Covers the larger robot maze, a multi-operation evidence investigation (rejecting speculation), physical fox trust, pause, source answer locking, subject recommendations, absence of dev positioning hooks, and unique bonus cards. Zero console/page errors and result POSTs.
- Game/service suite: **71 passed, 1 optional PostgreSQL skipped**. Main repository regression: **285 passed, 8 DB/private-fixture checks skipped**. Final static integration passed. No schema, academic content, submission API, production data or deployment changes. DB-specific/end-to-end suites remain unverified in this client-only revision.
- Build, JS syntax and whitespace checks pass; the existing bundle-size warning remains. Evidence: `output/playwright/scenarios-r2/`, `scenarios-r2-built/`, and `scenarios-r2-isolation/`. Mobile screenshots and desktop puzzles/world actors were visually inspected. Physical-device and human engagement acceptance remain a playtest.

- Final mobile visual review caught narrow evidence cards caused by an unclosed grid. Corrected the layout and added readable-card-width assertions to both built-page viewport checks; all built checks pass.
- Final touch-layout check also caught a small crouch/jump overlap. Bottom-aligned the jump button with the joystick and added a rectangle-overlap assertion; all 49 final built checks pass.
