---
id: MAZE-001
title: Small maze and capture recovery
slug: small-maze
status: approved
phase: local-prototype
version: 0.5.0
created: 2026-10-30
updated: 2026-10-30
---

# Small maze and capture recovery

Delivery: Implemented with mobile verification. Production release evidence is recorded for each exact deployed commit; prior local run records below remain historical.

## User problem and intended outcome

The existing Afterbell loop repeatedly sends a student to a character, equipment task, questions and back. Changing the subject leaves the same experience. Build a compact maze reached from an additional homepage game button, where exploration, clues, creatures and question traps give varied decisions. Students should experience tension while continuing forward even after repeated mistakes.

This record describes the first implemented local playable slice; it is not a production-release claim. Target: existing teenage PrepX students, keyboard and touch.

## Source requirements and decisions

- SRC-01 — Michael: explore from the world into a small maze with scary creatures, hints and occasional question traps.
- SRC-02 — Michael: correct answers earn money; incorrect answers earn no points and have a consequence. Money here means fictional game coins, separate from academic score.
- SRC-03 — Michael: a short animated capture/punishment scene; the first playful theatrical direction was tentatively preferred. Preserve real tension without insulting the learner.
- SRC-04 — Michael: losing every heart must never restart the maze or erase progress; students may quit if forced to restart.
- SRC-05 — Conversation proposal for the first slice: capture leads to two guided review questions about earlier mistakes, then nearby return with restored hearts. Numerical defaults below remain tunable.
- SRC-07 — Michael, implementation request: add another game button, preserve the old game, implement and test mobile first. This supersedes the original assumption of entering through the existing Afterbell world.
- SRC-08 — Michael: every trap has 1–3 questions, never more; show a more visual first-person view inside the cage while trapped.
- SRC-11 — Michael: more interactions with people and animals, a somewhat larger maze with more routes and discoveries, and more realistic movement.
- SRC-12 — Michael: use local GLM as a critic for the new characters, animals and movement on mobile; find and fix stuck-player and lost-progress bugs.
- SRC-13 — Michael: use fresh agents to review every question for missing paper/story context; make trap activation visually clear and question UI concise.
- SRC-14 — Michael: use a fresh agent to make nearby people greet the player and animals react on approach.
- SRC-10 — Michael: use local GLM as a mobile cage QA critic, focusing on stuck players, progress loss and the three-question trap limit; fix confirmed issues.
- SRC-09 — Michael: use a fresh coding agent to add more interactions.
- SRC-06 — Michael: use parallel critics to identify trapped-player bugs, dead ends and similar major failures.
- POLICY-01 — Repository AGENTS.md, QUESTION-RULES.md and docs/TESTING.md: Hebrew RTL, source-backed content, preserved scoring, privacy and release boundaries. Existing game integration is described in [Afterbell README](../../games/afterbell/README.md).

## Prototype scope and proposed defaults

DEFAULT-01: one handcrafted maze, about 10 minutes as an unvalidated playtest target, not a forced time limit. Three hearts, three seals, two creature types (a patrol creature and a trap guardian), three visual trap types (floor collapse, locked cage, guardian gate), one clue room and one optional treasure branch. Each trap has 1–3 original questions, never more. The default six-question set uses three traps with 2/2/2 questions. Eleven-question sets use four traps with 3/3/3/2. Additional active trap locations preserve the entire selected set; never truncate it or report a partial round as a full score. Three baseline seals remain milestones; the exit also requires every original question across all active traps.

A correct original answer gives 10 coins; a wrong original answer gives none and removes one heart. Initial prototype has no coin deduction, store or mandatory purchases. Creatures create exploration pressure and trigger encounters; they do not stack continuous damage or hit while a question is open. Both path choices eventually reconnect. Seals are awarded for completing encounters, regardless of answer correctness, so mistakes never block the exit.

At zero hearts, the creature captures the character. Suggested scene: it closes a cage and says the Hebrew equivalent of “Caught you! Solve the challenge to escape.” No “bad boy/girl” dialogue. Review uses missed questions with progressively explicit help. Escape restores hearts and resumes nearby. No restart, lost seals, erased exploration or loss of previously earned coins.

## Experience and screen hierarchy

1. PrepX homepage and maze entrance: separate game button, brief goal and enter/return controls.
2. Exploration: maze view, hearts, coins, seal progress and compact objective; optional map/journal and pause.
3. Encounter: eye-level first-person 3D cage with visible foreground bars, padlock, guardian and lantern. A scrollable bottom sheet shows one question at a time, local trap progress (maximum three), choices, locked feedback and source. The actual cage remains visible above it without background blur; hazards freeze while reading.
4. Capture: first-person cell remains visible for a brief skippable capture beat and recovery, including a static reduced-motion equivalent.
5. Escape room: two review steps, clear hints and guided completion; show that original learning score is unchanged. These are a separate recovery encounter with two review questions, not extra original questions added to a trap.
6. Return: overhead maze view, safe nearby location, restored hearts, unchanged expedition progress. Inside the cell, looking left/right, raising the lantern, rattling bars and inspecting the lock affect the scene only; none bypass questions or change rewards.
7. Exit: seals unlock the exit, summary separates original learning performance from review and coins, return to PrepX.

Required states: exploring, question-open, answer-locked/feedback, capturing, recovering-step-1, recovering-step-2, returning, paused and completed. State changes must be idempotent. A pause is an overlay over the current phase; it must not discard that phase.

## Acceptance criteria

| ID | Given / when | Observable expected result | Source |
|---|---|---|---|
| MAZE-001-AC01 | Enter the maze from its own homepage button | An additional homepage button launches one small fixed-layout maze. Afterbell retains its existing button. A safe voluntary exit returns to PrepX without erasing the active tab expedition. | SRC-01 |
| MAZE-001-AC02 | Explore the prototype | One entrance, three collectible seals, one final exit, two creature types and three trap presentations are present. At least one optional branch and one clue room contain no academic question. | DEFAULT-01 |
| MAZE-001-AC03 | Reach every objective | All seals and the exit are reachable; no seal is behind a gate requiring itself. Wrong-answer routes and decorative dead ends have a traversable return or onward path. Coins and consumables are never mandatory to finish. | SRC-06 |
| MAZE-001-AC04 | Discover a clue | A visible environmental clue helps with a later obstacle. The journal retains discovered clues; a clue is never the sole inaccessible key to progress. | SRC-01 |
| MAZE-001-AC05 | Trigger a question trap | A valid source-backed practice question appears with clear options, feedback and source reference. Movement hazards and creatures pause during questions, feedback, journal, pause and recovery; no answer countdown applies. | SRC-01 |
| MAZE-001-AC06 | Submit an original answer | First submission locks once. Correct earns 10 fictional coins once; incorrect earns zero and removes exactly one heart. Correct feedback opens the route; wrong feedback also releases the player to a reachable route. No trap requires repeated correct answers to release movement. | SRC-02 |
| MAZE-001-AC07 | Lose the final heart | Exactly one capture transition occurs at zero. A skippable roughly 3-second scene shows a creature capturing the character, with playful challenge dialogue and no personal insults. Input cannot submit another answer or apply another penalty during the transition. | SRC-03 |
| MAZE-001-AC08 | Enter capture recovery | Maze position, seals, coins, completed encounters, original answers and discovered clues remain intact. Recovery is a separate state; it cannot trigger hazards or another capture. | SRC-04 |
| MAZE-001-AC09 | Complete two review steps | Use earlier missed source questions with original meaning and grading intact. If only one distinct missed item exists, reuse it as a clearly labelled second review. Review answers never grant coins, overwrite first answers, or improve the academic score. | SRC-05 |
| MAZE-001-AC10 | Miss recovery questions repeatedly | Each wrong review answer reveals more help. After two wrong tries per review step, display the source explanation and correct solution with a guided continue action. Two review steps always permit escape; there is no life loss or endless correctness gate. | SRC-04 |
| MAZE-001-AC11 | Escape capture | Restore three hearts and return to a tested safe tile near capture, outside walls, locked doors and creature hitboxes. The triggering encounter stays resolved; a 5-second hazard grace period prevents immediate recapture. If the nearby tile is invalid, use the last safe checkpoint while preserving progress. | SRC-04 |
| MAZE-001-AC12 | Reload at any encounter phase | Restore the latest valid state during question, locked feedback, capture, each recovery step and return. No duplicated reward/penalty, reset maze, forgotten seal or stuck overlay occurs. If saving is unavailable, show a warning and keep the current in-memory session playable. | SRC-06 |
| MAZE-001-AC13 | Finish the maze | Three seals open the exit without requiring a perfect score. Every unique question in the selected prototype set receives an original attempt before completion; exhausted questions do not create blocking traps. Summary separates learning score, review practice and fictional coins. | SRC-02 |
| MAZE-001-AC14 | Open invalid/unavailable content | Use the existing validated content fallback. If no valid source content exists, offer retry and safe return without consuming hearts or inventing academic content. Resume uses the attempt content version rather than silently changing question identities. | SRC-06 |
| MAZE-001-AC15 | Use mobile or keyboard | At 390x844 touch and 1280x800 keyboard, movement, answers, capture skip, hints and safe exit are usable. Hebrew RTL text stays readable and unobscured. Question controls have visible focus and textual state cues. | POLICY-01 |
| MAZE-001-AC16 | Enable reduced motion or mute | Use a static/shortened capture equivalent, with identical state transitions. Visual cues communicate hazards without sound. No strobe effect or required camera shake. | POLICY-01 |
| MAZE-001-AC17 | Pause or leave the maze | Pause suspends simulation and grace timers. Leaving during a question/capture/recovery preserves the phase for resume; it cannot restore hearts, reroll questions or create free coins. | SRC-06 |
| MAZE-001-AC18 | Keep existing product boundaries | Formal exams and teacher-email flows remain unchanged. No new student data, public leaderboard, payment, production writes or external grading service is introduced. Existing game persistence contracts require explicit design before modification. | POLICY-01 |
| MAZE-001-AC19 | Collect seals or open routes | Seals are permanent and never consumed; opened routes never relock. Check the full gate/seal dependency graph for cycles. After every encounter and recovery, a path exists to remaining objectives and eventual exit under current inventory. | SRC-06 |
| MAZE-001-AC20 | Save an answer or recovery transition | Commit answer lock, reward or heart change, resolved encounter and phase as one versioned state update before animation. Replay the same event safely with no second effect. | SRC-06 |
| MAZE-001-AC21 | Load missing or inconsistent recovery data | Reconstruct reviews from recorded missed questions and pinned source content. With no usable missed content, show a non-scored environmental guided escape instead of an empty question panel. Preserve valid inventory/progress; never silently wipe the expedition. | SRC-06 |
| MAZE-001-AC22 | Open the same active expedition twice | Choose and document a single active controller or isolated per-tab expedition. Concurrent tabs must not overwrite one shared expedition or duplicate rewards; storage failure is visibly disclosed. | SRC-06 |
| MAZE-001-AC23 | Enter any active trap | Its assignment contains 1–3 original questions and the header counts within that trap. Longer selected sets add active trap locations instead of adding a fourth question or dropping content. All original questions remain required for exit. | SRC-08 |
| MAZE-001-AC24 | Enter question, feedback, capture or recovery | Render a real perspective view from inside the cell with foreground bars/lock, a guardian beyond them and the player lantern. Keep at least 180px of unblurred scene visible above the scrollable sheet at 320px and 390px; return to overhead view on escape. | SRC-08 |
| MAZE-001-AC25 | Use scene controls | Look left/right, toggle the lantern, rattle bars and inspect the lock; show corresponding camera/light/guardian/lock feedback. Original answers, coins, hearts and score do not change. Pause blocks actions/timers, reduced motion suppresses shaking, and interacting during feedback stops auto-advance for reading. | SRC-09 |
| MAZE-001-AC26 | Explore the expanded maze | A connected23×17 world preserves every old walkable tile and all question/exit coordinates. New east garden and south ruins loops provide several return routes. No existing save is placed in a wall. | SRC-11 |
| MAZE-001-AC27 | Meet residents and wildlife | Two human characters, fox, rabbit, owl, water pump, lamp and bench offer contextual actions. Talking enables guidance/lights; water attracts the fox to drink and enables following; other discoveries have visible persistent responses. These actions never award academic points, coins or hearts. | SRC-11 |
| MAZE-001-AC28 | Reload or recover after exploring | All eight discovery flags, lights, bowl and fox behavior survive reload/capture/recovery. Older saves without world state load safe defaults without losing original answers, coins or earned seals. | SRC-11 |
| MAZE-001-AC29 | Walk using touch, keyboard or a path | Continuous physical movement accelerates/brakes, retains speed through held straight segments, turns smoothly, and animates limbs by distance. Tap finishes one reachable cell; holding repeats; release stops at a center. Walls, pause and cage encounters cannot be bypassed by motion. | SRC-11 |
| MAZE-001-AC30 | Use the new world on a phone | Nearby actions name the person/animal/object, conversations use designed RTL dialogs, map/journal identify new areas and discoveries, touch targets remain usable at320px and390px, and academic traps still contain only1–3 original questions. | SRC-11 |
| MAZE-001-AC31 | Read any of the62 bundled questions in isolation | Each has reviewed standalone wording or short essential story/apparatus context. Canonical choices, answer indices, IDs, source data and saves stay unchanged. Changed live/saved variants retain their original wording rather than stale context. | SRC-13 |
| MAZE-001-AC32 | Answer a trap question | Essential setup is visible before the answers. Source, ordinary explanation and cage tools are secondary accessible disclosures. Opening feedback explanation stops auto-advance. All answers remain reachable from320px upward. | SRC-13 |
| MAZE-001-AC33 | Walk into a trap | A skippable900ms first-person gate-closing beat makes activation clear. Pause freezes it; reduced motion opens the question immediately; skip/reload/next question cannot replay or strand the transition. Academic state is committed independently. | SRC-13 |
| MAZE-001-AC34 | Approach either person or any of the three animals | A short accessible nonmodal greeting/reaction appears and the entity visually acknowledges the player. Movement/manual conversation remain available. Lingering does not repeat announcements; an animal cannot suppress a nearby person's hello. | SRC-14 |
| MAZE-001-AC35 | Pause, enter a question or leave greeting range | Speech hides appropriately, freezes during pause, and clears on leaving range. Greetings never award coins, answer questions, change hearts or alter saved world discoveries. | SRC-14 |

## Data, scoring and privacy invariants

Reuse the existing supported practice questions, correct answers, explanations and source references. No new academic question bank or teacher exam is created by this feature. Fictional environmental puzzles must be visually distinguished from academic questions.

Record original answers once, using stable question IDs and the attempt content version. Keep review attempts separate. Original accuracy and difficulty weights follow existing QuizCore rules; coins, seals, capture and successful review never inflate that score. Never publish a partial run as a full-round best score.

Persist only the minimal maze state alongside the existing game session boundary: phase, checkpoint, resolved encounter IDs, seals, hearts, fictional coins, original answer IDs and review progress. Avoid a new backend contract in the first slice; inspect existing state/persistence support before implementation. Do not log names or answers or access credentials. If durable completed history needs extra fields, document that separately before changing the API/schema.

## Implementation plan

| Step | Deliverable | Verification | State |
|---|---|---|---|
| 1 | Inspect existing world/navigation/content/session seams and select a small supported quiz | Map entry integration and original score contract; resolve quiz-size fit | Complete locally |
| 2 | Handcraft a compact maze with collision-safe routes, landmarks and its own entrance | Graph reachability plus real movement through all routes | Complete locally |
| 3 | Add encounter state machine, first-answer locking, hearts, coins and seals | Correct/wrong/duplicate/exhausted-bank behavior | Complete locally |
| 4 | Add capture, guided recovery and safe return | All-wrong run; repeated capture; reload phase matrix | Complete locally |
| 5 | Polish Hebrew RTL, mobile controls, atmospheric cues and reduced motion | Two viewport browser checks and muted/reduced-motion flow | Complete locally |
| 6 | Record screenshots, criterion evidence and remaining issues | Focused game checks plus affected repository regression checks | Complete locally |

## QA mapping and evidence

Entries below map to implemented automated checks and the local browser run; they are not production or physical-device evidence.

| Criterion | Check | Result | Evidence |
|---|---|---|---|
| MAZE-001-AC01 | Separate homepage entry/exit browser flow | Pass (local) | games/maze/tests/core.test.mjs, content.test.mjs and browser.mjs; see run record below |
| MAZE-001-AC02 | Layout walkthrough and room inventory | Pass (local) | games/maze/tests/core.test.mjs, content.test.mjs and browser.mjs; see run record below |
| MAZE-001-AC03 | Graph reachability plus collision walkthrough | Pass (local) | games/maze/tests/core.test.mjs, content.test.mjs and browser.mjs; see run record below |
| MAZE-001-AC04 | Discover clue then revisit obstacle | Pass (local) | games/maze/tests/core.test.mjs, content.test.mjs and browser.mjs; see run record below |
| MAZE-001-AC05 | Wrong/right trap and paused-hazard checks | Pass (local) | games/maze/tests/core.test.mjs, content.test.mjs and browser.mjs; see run record below |
| MAZE-001-AC06 | Rapid duplicate input and wrong-answer release tests | Pass (local) | games/maze/tests/core.test.mjs, content.test.mjs and browser.mjs; see run record below |
| MAZE-001-AC07 | Zero-heart duplicate-event/skip check | Pass (local) | games/maze/tests/core.test.mjs, content.test.mjs and browser.mjs; see run record below |
| MAZE-001-AC08 | Snapshot comparison before/after capture | Pass (local) | games/maze/tests/core.test.mjs, content.test.mjs and browser.mjs; see run record below |
| MAZE-001-AC09 | One/two-mistake and score-isolation tests | Pass (local) | games/maze/tests/core.test.mjs, content.test.mjs and browser.mjs; see run record below |
| MAZE-001-AC10 | All-wrong recovery walkthrough | Pass (local) | games/maze/tests/core.test.mjs, content.test.mjs and browser.mjs; see run record below |
| MAZE-001-AC11 | Occupied/invalid respawn and recapture tests | Pass (local) | games/maze/tests/core.test.mjs, content.test.mjs and browser.mjs; see run record below |
| MAZE-001-AC12 | Reload matrix and denied-storage test | Pass (local) | games/maze/tests/core.test.mjs, content.test.mjs and browser.mjs; see run record below |
| MAZE-001-AC13 | All-wrong full-run and exhausted-bank test | Pass (local) | games/maze/tests/core.test.mjs, content.test.mjs and browser.mjs; see run record below |
| MAZE-001-AC14 | Unavailable/mismatched content test | Pass (local) | games/maze/tests/core.test.mjs, content.test.mjs and browser.mjs; see run record below |
| MAZE-001-AC15 | Browser flow at both viewports | Pass (local) | games/maze/tests/core.test.mjs, content.test.mjs and browser.mjs; see run record below |
| MAZE-001-AC16 | Reduced-motion/muted browser check | Pass (local) | games/maze/tests/core.test.mjs, content.test.mjs and browser.mjs; see run record below |
| MAZE-001-AC17 | Pause/exit/resume phase matrix | Pass (local) | games/maze/tests/core.test.mjs, content.test.mjs and browser.mjs; see run record below |
| MAZE-001-AC18 | Scoped diff and existing-contract regression review | Pass (local) | games/maze/tests/core.test.mjs, content.test.mjs and browser.mjs; see run record below |
| MAZE-001-AC19 | Reachability across gate/seal states and both answer outcomes | Pass (local) | games/maze/tests/core.test.mjs, content.test.mjs and browser.mjs; see run record below |
| MAZE-001-AC20 | Reload at transition boundaries and duplicate event replay | Pass (local) | games/maze/tests/core.test.mjs, content.test.mjs and browser.mjs; see run record below |
| MAZE-001-AC21 | Empty review queue, content mismatch and damaged phase tests | Pass (local) | games/maze/tests/core.test.mjs, content.test.mjs and browser.mjs; see run record below |
| MAZE-001-AC22 | Two-tab state isolation/control test | Pass (local) | games/maze/tests/core.test.mjs, content.test.mjs and browser.mjs; see run record below |
| MAZE-001-AC23 | All bank sizes 1–30 assignment tests; 11-question mobile full run | Pass locally | core.test.mjs, content.test.mjs, browser.mjs |
| MAZE-001-AC24 | Mobile 320/390 screenshot inspection; capture/review/reduced-motion and return checks | Pass locally | browser.mjs, output/maze/first-person-question-320.png |
| MAZE-001-AC25 | Pure interaction tests; five real DOM actions; focused feedback interruption checks | Pass locally | interactions.test.mjs, browser.mjs and cage-revision-browser.mjs |
| MAZE-001-AC26 | Complete old-map subset and all-tile reachability tests | Pass locally | core.test.mjs, world.test.mjs |
| MAZE-001-AC27 | Eight real-input encounters, water/fox drinking/following and lighting checks | Pass locally | world-browser.mjs, world.test.mjs, inspected mobile screenshots |
| MAZE-001-AC28 | Reload plus capture/recovery after all eight discoveries | Pass locally | world-browser.mjs, core.test.mjs |
| MAZE-001-AC29 | Frame-rate/velocity/arrival unit tests plus real fractional/held/wall/pause browser checks | Pass locally | movement.test.mjs, world-browser.mjs |
| MAZE-001-AC30 | Expanded mobile and existing gameplay suites using actual continuous movement | Pass locally | browser.mjs, world-browser.mjs, cage revision/critic scripts |
| MAZE-001-AC31 | Complete source-linked audit;62-question adapter coverage and unknown-variant guards | Pass locally | question-context-audit.md; question-presentation.test.mjs |
| MAZE-001-AC32 | Visible context, keyboard source disclosure, feedback reading and five responsive widths | Pass locally | trap-ux-browser.mjs; inspected concise/pole mobile screenshots |
| MAZE-001-AC33 | Actual gate pixels, pause/resume, skip, next-question and reload/reduced-motion checks | Pass locally | trap-ux-browser.mjs; baseline missing-transition failure recorded |
| MAZE-001-AC34 | All five living entities acknowledged through real controls; cooldown and competing-speaker tests | Pass locally | world-browser.mjs; greetings.test.mjs; inspected scout greeting screenshot |
| MAZE-001-AC35 | Greeting pause/resume, range exit and academic/world invariants | Pass locally | greetings.test.mjs; world-browser.mjs; full capture/reload regressions |

## Dependencies, unresolved choices and non-goals

Implementation reuses the existing public practice-content snapshot and licensed Hebrew font; the maze owns its navigation, renderer and state. The default quiz is facts (six original questions), with all seven existing practice sets selectable. Maze size and reward values remain playtest defaults; creature art and Hebrew dialogue are implemented. Consult the local Open Design service when producing relevant visuals; use the current image-generation workflow if generated stills are requested.

Deferred: entry from inside the Afterbell world, procedural mazes, subject-specific environments, shops, permanent upgrades, multiplayer, combat systems, long cinematic videos, new exam content and a full world redesign. The first slice must prove exploration and recovery before expanding.

## Completion and review record

- Product direction: requested by Michael; proposed numerical defaults are not playtested.
- Specification: updated to match the separate-game implementation; user usability feedback remains useful for pacing and difficulty.
- Implementation: new games/maze source and built static game; homepage adds a separate card. Final local evidence is recorded below; deployment remains not performed.
- Parallel agent review: identified score inflation, duplicate capture, invalid respawn, exhausted questions and all-wrong recovery as specification risks; incorporated into criteria.
- GLM critique: three local helper calls completed successfully: tension brainstorm, navigation/softlock critique and state/reload critique. Independently reviewed suggestions against this specification; no gameplay tests were performed.
- Additional implementation-phase GLM static critique: two file-reading calls returned critique text but were terminated after not exiting normally (exit 143). Two bounded no-tools retries produced no result before termination. This is advisory code critique, not a clean GLM execution or browser QA pass.
- Independently addressed GLM implementation findings: corrupted saves no longer reset silently; older pinned content can restore when the current snapshot question count changes; unknown quiz links select a valid default instead of retrying forever. Tests cover the saved-content and invalid-link paths.
- Adopted GLM planning findings: permanent non-consumable seals and acyclic dependencies; correct and wrong answers both release traps; safe checkpoints/grace; atomic answer outcome storage; explicit repair for empty recovery state; multi-tab policy. Covered by AC03, AC06, AC11 and AC19–AC22.
- Rejected GLM suggestions: coin-fuelled lantern, new adaptive question tiers, backend-enforced capture, mandatory reserved unseen review questions and replacing zero-heart capture with repeated-trap capture. These expand scope or conflict with agreed source reuse and recovery rules. Restoring hearts while preserving maze progress is recovery, not a maze restart.
- Critical invariant: from every valid encounter/recovery state, a legal sequence of actions reaches the remaining objectives and exit, even when every original answer is wrong. Creature collision must never permanently block the sole traversable route.
- Known limitation: this is a documentation-only feature record and does not make the maze playable.

## Pictures and evidence

[Pictures folder](pictures/README.md) reserves a place for future layouts and screenshots. No mockup is presented as implemented gameplay. Future QA evidence must identify environment and revision; production release needs separate explicit authorization.


## Local implementation QA — 2026-10-30

Branch: `codex/maze-game-spec`, base `2a1e9aa`; changes remain local and uncommitted. Build: `games/maze/play/`, generated from the accompanying source. Main server QA binds loopback with an empty environment/database disabled and external delivery disabled. The browser suite aborts public quiz GET requests to exercise the exact bundled fallback. The web-game skill smoke additionally used a local GET-only public-content fixture proxy; neither setup sends student data or production writes.

### Executed verification

- Maze unit/content: **33 passed**, zero skipped. Includes all 64 correctness combinations for the default six-question set, all-wrong bank sizes 1–30 with reload after every transition, every encounter/patrol recovery tile, source identity/fidelity, old pinned-count restoration, and first-answer coin/score isolation.
- Existing repository regression: **284 passed, 8 skipped, 0 failed** out of 292. Command: `node --test *.test.mjs db/*.test.mjs`. The eight skipped checks require explicit isolated database setup; no database schema/data or question bank changes were made.
- `npm run build`: passed. The Three.js bundle produces Vite's >500 kB advisory (roughly 152 kB gzipped JS); this is not a failed build. Font CSS is self-contained and reused from the existing licensed font.
- Final built-browser acceptance: **88 passed**, zero application/asset errors and zero POSTs; build asset `index-C6VAZfRV.js`. Includes safe return away from the entrance, unknown quiz fallback and a restored older five-question expedition continuing from 10 to 20 coins without replacing the bank. Actual WebGL and visible DOM controls, default phone 390×844, plus 320/375/768/1024/1440 widths. Both game entries remain present on the real homepage. Screenshots include exploration, question, capture, recovery, map and completion.
- Web-game skill client: real keyboard movement through the built game, rendered screenshot and text-state hook inspected; fixture-backed final smoke had no console-error artifact.
- Data side effects: browser report records zero POST requests. No commit, push, deployment, email, seed or migration was performed.

### Findings and fixes

| Finding | Evidence | Fix and verification |
|---|---|---|
| Escape opened then immediately canceled pause | Real built-browser keyboard reproduction | Prevent default Escape behavior before opening pause; fullscreen/Escape regression passed. |
| Narrow patrol corridor could return to entrance | Core review of adjacent-only safe-tile fallback; regression reproduction at patrol (12,5) | Breadth-first nearest-safe search; no entrance fallback; every encounter/patrol return tested within five reachable steps. |
| Invalid saved state silently started a new expedition | GLM static finding independently confirmed in initial boot code | Preserve old save, show retry/safe exit; corrupt-save browser check passed. |
| Older pinned content rejected after snapshot count change | GLM static scenario, reproduced with older five-question bank | Self-consistent pinned normalization separate from strict live-set validation; dedicated roundtrip test passed. |
| Invalid quiz link offered an endless retry | GLM static scenario independently confirmed | Known default and visible notice; focused browser verification recorded with final suite. |

### UX checklist scope

| Checklist | Status | Evidence / limitation |
|---|---|---|
| UX-01 | Partial | Home exit and reload restoration checked; arbitrary browser history sequences not exhaustively tested. |
| UX-02,04,08,10,11,12 | Pass locally | Separate entry, visible objective/status, trap continuation, guided recovery and honest completion summary. |
| UX-05,07,13 | Pass locally | Capture/review reload, denied storage warning/playability, corrupt-save preservation, explicit retry/exit. |
| UX-09,14,16,17,43 | Pass for applicable game controls | No typing forms; questions have clear choices, locked feedback and guided continuation. |
| UX-18,20 | N/A | No repeated personal-information forms or editable submitted answers. |
| UX-21,22,24,26 | Pass locally | Visible feedback, duplicate-action core tests, bounded content fallback, independent tab sessions. |
| UX-03,06,15,19,23,25,27–34 | N/A to this slice | No login, search/table editor, typed identity, payment, destructive operation, shared remote write or bulk workflow. |
| UX-35 | Pass in emulation; physical device not run | Touch controls and full gameplay at 390px; six responsive widths. |
| UX-36 | Partial | Keyboard, focus containment, text cues and reduced motion exercised; no complete screen-reader/assistive-technology audit. |
| UX-37–42 | Pass for scoped browser checks | Hebrew RTL, no horizontal overflow, visible >=44px controls, scrollable designed dialogs, readable inspected screenshots. Zoom/large-type extremes are not exhaustive. |
| UX-44 | Pass locally | Controls stay in normal flow below the canvas with one safe-area allowance; no fixed navigation or duplicated clearance. Screenshots show reachable final actions. |

### Remaining boundaries

Physical iPhone/Android GPU performance, long-session battery use, subjective fear/pacing, and a teacher/student usability session remain unverified. There is no public deployment. This adds a game, not a new formal exam; unchanged exam delivery/teacher email gates were not invoked. The existing Afterbell source and build have no diff.


## Trap-limit and first-person revision — 2026-10-30

The latest user rules supersede the original three-room allocation. Each active trap now has 1–3 original questions. Eleven-question practice uses four traps (3/3/3/2), preserving every source question. Existing saves are remapped without changing original answers/coins; validated seal evidence preserves already-earned milestones through reload even if a remapped room has another pending question. The exit still requires every original question.

The first-person cell is a separate rendered Three.js scene with a PerspectiveCamera, foreground bars and gate, padlock, chained mechanism, stone walls, torches, guardian and player-held lantern. It remains visible above the question sheet on phones; the scene is not a static illustration or blurred background. Gate unlocking follows room completion, including a final wrong answer, and guided recovery can unlock after the second wrong review attempt.

A fresh coding agent implemented a pure scene-interaction module; root integrated the controls and renderer effects. Camera look, lantern light/beam, brief bar/guardian reaction, and lock progress/glow never touch academic state. Interactions during feedback pause automatic advancement. Pause and reduced motion retain their protections.

Verification for this revision: 112 built-browser checks passed with zero application/asset errors and zero POSTs, including the 11-question full run (score100, coins110), both mobile first-person layouts, all five scene actions and original save/recovery checks. A final focused save/feedback check records its own results below. Unit counts and final build identity are recorded after the last run; prior run records above remain historical. No deployment was performed, and no prior GLM result is claimed as a review of this revision.


### Final revision evidence

- Build: `index-BjdS61kZ.js` / `index-BHczODWj.css`; `npm run build` passed.
- Core/content/interaction checks: **46 passed**, zero skipped/failed.
- Expanded gameplay/browser run: **112 passed**, zero errors/POSTs. Final focused build checks: **13 passed**, zero errors/POSTs (`output/maze/cage-revision-report.json`). This is a separate targeted run after the old-save proof and feedback-interaction fixes, not a claim that every earlier check was rerun.
- Final focused checks preserve an old eleven-question expedition's earned cage seal and 40 coins through migration/reload, allow its pending remapped question within the cap, and record exactly one subsequent 10-coin payout. Feedback lantern/bar interactions stop automatic advancement; explicit continuation still works.
- Independent canvas-pixel check: lantern and look controls changed actual rendered pixels while original academic progress remained identical. Screenshots `output/maze-interaction-before.png`, `maze-interaction-lantern.png`, `maze-interaction-look.png` were inspected.
- Web-game skill client reached an actual trap with normal keyboard steps; first-person screenshot and text state inspected under `output/maze-cage-skill-trap/`, no console-error artifact.
- Mobile evidence: first-person scene remains above the sheet at 320px and390px, with foreground bars, guardian, lock and lantern visible. Long explanations/references scroll inside the panel; both answer actions remain reachable.
- No Afterbell source/build diff, production mutation, commit, push or deployment. Physical-device performance remains unverified.


## Focused mobile cage critic QA — 2026-10-30

Build `index-tB-AkaQK.js` / `index-BqSDdB5i.css`. This revision changes mobile presentation and save-status honesty, not question assignment or academic scoring.

| Finding | Reproduction and initial failure | Fix | Verification |
|---|---|---|---|
| Landscape cage obscured by question sheet | At844×390 with HebrewRTL, enter first trap through real controls. Both viewport and fixed sheet align right; the sheet covers almost the whole cage. New side-by-side separation assertion failed. | Explicit inline margins place the cage on the opposite side from the sheet in landscape. | `cage-critic-browser.mjs`; landscape screenshot inspected after fix. |
| False saved-progress claim under denied storage | Deny sessionStorage, enter a question, open pause. Existing outer warning is covered by the modal; the menu still says progress is saved. New in-dialog warning assertion failed. | Track unavailable storage, show a warning inside each active dialog, update entry/privacy and pause/exit copy, and keep in-memory play available. | Denied-storage question/pause/resume checks passed; warning screenshot inspected. |

Independent executed checks: **46 unit/content/interaction passed**, **112 gameplay-browser passed**, **13 save/reload-browser passed**, and **12 adversarial mobile checks passed**. All browser reports record zero application errors and zero POSTs. The eleven-question source set still completes at100/110coins across3/3/3/2 traps. Original answers, earned seals and coins survive supported reload/pause/capture paths; blocked browser storage is explicitly disclosed rather than represented as durable saving.

Reproducible focused command: `node games/maze/tests/cage-critic-browser.mjs`. It covers landscape, 320×568 short-screen scrolling, all five scene actions, feedback pause, regular reload and unavailable storage. Existing save/reload script now identifies a built asset path instead of hardcoding an old bundle hash, so rebuilds do not create a false QA failure.

Evidence: `output/maze/cage-critic/report.json`, `landscape-cage.png`, `short-portrait-cage.png`, `denied-storage-question.png`; full gameplay and migration reports remain under `output/maze/`. GLM execution status is recorded below, separately from independent browser verification.

GLM status: the first invocation lacked worktree access, a second hit its turn limit, and the bounded worktree pass timed out after writing `output/maze/glm-mobile-critic.md`. That report explicitly states its browser commands were permission-denied and were NOT RUN. A final no-tools, supplied-excerpt critique completed successfully (exit0) and identified the read-failure/write-success overwrite path. These are code/evidence critiques; all claimed browser executions were independently performed by Codex. No provider substitution was used.

No production data, name, answer submission, deployment, commit or push was performed. Physical-device validation remains separate from Chromium phone emulation.


### GLM findings independently verified and fixed

1. **Actual progress overwrite after a read error.** With a valid saved answer and10coins, make only `sessionStorage.getItem` fail while writes still work, then press Start. Initial browser reproduction changed stored progress to0answers/0coins. `save()` now refuses writes after storage becomes unavailable, leaving the old record untouched; when reads recover, the original expedition can resume. Regression covers asymmetric storage failure rather than only both-read-and-write denial.
2. **Unrecoverable-save retry loop.** A malformed save previously offered only retry of the same invalid record or exit, making this tab unable to start a playable run. A deliberate “separate expedition” action now archives and reads back the exact old record before persisting a new run. If backup storage fails, the new run stays in memory and the original key remains untouched. No automatic reset occurs, and no save is deleted.
3. **Corrupt timer freezes patrols.** GLM flagged unbounded restored counters. Independent isolated reproduction with six active questions and `elapsedMs=Number.MAX_VALUE` hung the patrol tick; the owned child was stopped at1second. Restore now rejects timers beyond `Number.MAX_SAFE_INTEGER` while retaining answers, coins and seals. A dedicated core regression confirms the repaired simulation advances and normal fractional frame timing survives.

The static report's missing direct look-center button is a UX proposal, not a confirmed trapping condition: existing opposite-direction controls can return yaw to0. The reported arbitrary captureCount statistic does not control the question cap; no unrelated counter redesign was added.

The three-question assignment bound remained valid in code, synthetic bank sizes1–30, legacy save migration and the full eleven-question mobile run. Neither code critique nor browser QA found a new cap violation. Separate two-question recovery remains isolated from original scoring.

Final QA results and build identity are recorded below after the last test run. Current patches remain local and uncommitted; Afterbell is unchanged.


### Final mobile-critic verification

Final build: `index-BVwLyHTR.js` / `index-BqSDdB5i.css`. **47 unit/content/interaction checks passed**, **112 full gameplay browser checks passed**, **13 save/migration checks passed**, and **18 adversarial critic checks passed** (143 browser assertions total across the three runs). Zero application errors and zero POSTs. Final web-game skill client reached the actual cage with normal keyboard controls; screenshot and text state inspected, no console-error artifact.

Normal persistence, recovery and the three-question trap bound passed. Read-only storage faults leave the prior saved10coins/oneanswer record intact; subsequent restored reads recover it. Explicit corrupt-save recovery preserves the exact old record and remains resumable after reload. Corrupt giant timers repair before simulation instead of hanging the patrol loop. Landscape cage and question controls remain separate and usable. No physical-phone or production-deployment claim is made.


## Living-world expansion — 2026-10-30

The maze grows from17×13 to23×17 while preserving every old traversable tile, existing source-question assignment, original trap coordinates and exit. The garden and ruins add connected exploration loops. The old game remains separate.

Residents: a trail scout offers dialogue and a lit route toward the nearest unfinished trap; the garden keeper turns on garden lights and explains local discoveries. Friendly animals are original3D fox/rabbit/owl models. The pump fills a bowl; the fox walks to drink, then can accompany the player along collision-safe waypoints. Rabbit observation, owl attention, a garden lamp and a quiet bench add optional encounters. These are fictional world activities, not new academic questions or fetch quests.

Physical walking now uses a deterministic controller with acceleration, braking, smooth heading and retained velocity across held straight steps. The rendered position moves continuously and limb motion follows distance; logical question/hazard events commit at reached tile centers. Touch hold, keyboard hold and tap-to-walk use the same controller. Pausing freezes motion; new cage events align to the canonical encounter tile; a reload resumes from a safe completed tile while preserving learning/world state. Patrol contact is deferred during between-center travel so an enemy cannot catch the tile the player has visibly left.

Local results: **71 core/content/world/movement/interaction tests passed**; **180 browser checks passed** (112existing gameplay,13migration,18critic,37new-world). New-world checks use real inputs and prove all eight interactions without answering an academic question or changing coins, then retain discoveries through reload/capture/recovery. Existing eleven-question3/3/3/2 cap and first-person cage checks pass. **286 repository checks passed;8 isolated-database checks skipped**. No database/schema/email changes.

World mobile screenshots: `output/maze/world/scout-guidance-mobile.png`, `garden-water-mobile.png`, `world-preserved-after-recovery.png`; standard web-game skill screenshot/state: `output/maze-world-skill/`. Screenshots were opened and inspected. Physical-device performance remains a separate phone test.

Release guard: maze HTML now revalidates like Afterbell HTML; hashed assets remain cacheable. A focused HTTP test first reproduced the maze entry's stale-cache header and then passed the corrected behavior for both games. The previous published maze asset pair remains available across this transition so already-cached entries can load.

The prior deployed baseline was `c4ad29a`. This expansion follows the existing phone-test release target; exact new commit/deployment/live evidence is saved in the release receipt. No previous GLM critique is represented as a review of these new world mechanics.

## Living-world mobile critic follow-up — 2026-10-30

Two input defects confirmed independently: overlapping direction fingers canceled each other when either finger lifted; cancellation or focus loss before the next frame retained a queued step. Direction inputs now track pointer IDs independently, preserve a remaining held finger, and clear queued canceled input. Pause, capture, interaction and focus interruption clear pointer state safely. Existing character, animal, academic and save rules remain unchanged.

`tests/world-critic-browser.mjs` first failed against the previous built game, then passed all **22** assertions against fixed source and build `index-B1HdjKO3.js`. Actual touch events cover both overlapping-finger release orders, cancellation and subsequent movement at390×844 and844×390; before-frame cancellation/blur cases use deterministic lifecycle events. Pause/resume/reload retain the committed position, progress and1–3-question trap bound. The **37** world checks also pass, including all eight discoveries, water/fox behavior and capture/review/reload persistence. Both reports have zero page errors and zero POSTs. **71** game unit tests pass; repository **286** pass and **8** database-dependent checks skip. No database, exam, email or Afterbell change. Standard web-game client screenshot/state inspected; its expected local disabled-API404 uses the bundled fallback. Physical-phone performance remains unverified.

GLM status is **no usable review**, not a QA pass: local helper file-reading attempt exited1 at its14-turn limit; a supplied-source no-tools attempt produced no output over eight minutes and was stopped (exit143). No alternative provider used. Findings and all browser execution above are independent Codex work. Local helper logs are `/tmp/maze-world-glm-qa.log` and `/tmp/maze-world-glm-excerpt.log`; reproducible browser evidence is in `output/maze/world-critic/` and `output/maze/world/`. Release follows the existing authorized phone-test deployment, with exact commit/provider/live checks recorded separately.

## Question context, trap UX and greetings — 2026-10-30

Fresh-agent audits and implementation fulfill SRC-13/14. See [the full62-question source review](question-context-audit.md) and [scoped UX findings/verification](question-ux-qa.md).29 maze-only display adaptations restore missing setup or clarify worksheet wording;33 self-contained prompts remain unchanged. Academic source/choices/answers and saved identities are untouched. Actual gate/bars/camera close in a skippable900ms entry; essential setup stays visible and optional detail is collapsed. Nearby people greet/wave and animals react through a nonmodal accessible bubble, without changing resources or discoveries.

Build `index-ClzFJeYF.js` / `index-BlYgrs3t.css`. **87 unit tests pass**; **243 browser checks pass**:112 full gameplay,13 migration/revision,18 cage critic,22 mobile touch critic,45 world/greeting and33 trap/context/UX. All reports record zero application errors and zero POSTs. **286 repository tests pass;8 isolated-DB checks skip**. Final source/live parity covers all seven banks. Root inspected original PDF pages5–6, garden/source tasks, actual entry/question/pole/greeting screenshots and standard web-game client output. Scroll-ending action clearance measured1.1–12.9px across320/375/768/1024/1440px; final action remains unobscured. A source-preview-only homepage test failure was resolved by running the suite against the actual static app server, with both game entries verified. The expected disabled local quiz API404 falls back to the complete bundled content.

Previous published assets are retained for cached entries. Afterbell, formal exams, database and email contracts have no diff. Physical phone performance and manual screen-reader evaluation remain untested. Release follows the existing authorized phone-test target; exact commit and live checks are recorded separately. No GLM review is claimed for this revision.
