# מבוך הצללים — Shadow Maze

A separate, mobile-first 3D practice game. The PrepX homepage has an additional **מבוך הצללים** button; **אחרי הצלצול** remains available and its implementation is unchanged.

## Play locally

From the repository root, `npm start` serves the committed build at `/games/maze/play/index.html`. Use the homepage to choose either game. The maze itself requires no database, name, email or external grading service.

To develop or rebuild:

```sh
cd games/maze
npm ci
npm run dev
npm run build
npm test
npm run test:browser
```

Development preview is `http://127.0.0.1:5188/`. The Vite proxy expects the main app on port 4328 for public study-content requests and references. If it is unavailable, the validated bundled question snapshot still works with a visible offline label. Browser acceptance defaults to the development URL; set `MAZE_QA_URL=http://127.0.0.1:4328/games/maze/play/index.html` to check the real static build through the main server.

The production-compatible build lives in `play/`. Rebuild it after changing source; the main server needs no configuration or new extension support. Source and dependencies are isolated under this directory. The existing Heebo font is bundled under Afterbell's SIL Open Font License; maze and creature geometry are original.

## Game loop

Choose an existing practice set, enter the stone maze, collect three seals and find the glowing exit. The whole selected set is included. Questions and choices shuffle without changing original source answers.

- Walk with the on-screen direction pad, keyboard arrows/WASD, or tap a visible path. E inspects a nearby trap or exit; F toggles fullscreen; Escape pauses.
- Every trap has **1–3 original questions, never more**. Six-question sets use three traps (2/2/2); eleven-question sets use four traps (3/3/3/2), preserving the whole selected set. Three trap presentations and two roaming creatures lead to question encounters. Creatures cannot deal passive or repeated contact damage.
- A correct first answer gives 10 fictional coins. An incorrect first answer gives none and costs one heart. Completing a room gives its seal regardless of correctness.
- Every trap shows a real first-person cage with visible bars, padlock, guardian and player lantern above the scrollable question sheet. Look left/right, raise/lower the lantern, rattle bars or inspect the lock using the cell controls. These actions affect only the scene; interacting during feedback pauses auto-advance.
- At zero hearts, a short skippable first-person capture scene leads to a separate two-question recovery encounter based on earlier mistakes. Wrong review answers reveal help; after two wrong attempts, the solution and guided continuation guarantee escape. Review cannot change original score or coins.
- Escape restores three hearts at a safe nearby tile with five seconds of creature protection. Seals, answered questions, coins and exploration remain intact. No maze restart occurs.
- Map, journal, questions, feedback and pause suspend danger. Reduced motion replaces capture animation with immediate access to the recovery step. No time limit applies.
- The exit requires all original questions across every active trap as well as the three milestone seals. Its summary separates original learning score, fictional coins and captures. Read-only answer review includes explanations and source links.

## State and privacy

`prepx-shadow-maze-session-v1` in sessionStorage holds the pinned question version and this tab's expedition. Tabs are independent after any initial browser copy; they never share a mutable localStorage expedition. No maze POST, name collection, teacher email, new backend contract or database write is introduced. Existing exam/practice and Afterbell records are untouched.

Denied storage leaves the current in-memory game playable with a visible warning. Valid saved states are repaired/resumed where possible. Old trap allocations are remapped to the three-question cap; validated earned-seal evidence prevents losing milestones on reload. Unrecoverable malformed saves show retry/return options and a deliberate separate-expedition action. The latter archives and verifies the exact original before saving a new run; if archiving fails, the original stays untouched and the new run remains in memory. A failed storage read also disables writes so a fresh fallback cannot overwrite an unread old save. Closing the tab can remove its session; this is not cross-device account storage.

## Verification

- `npm test`: content fidelity, source-index mapping, timeout fallback, first-answer locking, duplicate events, safe navigation, creature contact, capture/review restoration, corruption repair and no score inflation. Includes every correctness combination for the six-question set and all-wrong runs for bank sizes 1–30 with reload after every transition.
- `npm run test:browser`: real DOM controls and actual WebGL, mobile first, full original/review all-wrong run, full correct run, interruptions, responsive sizes and zero result POSTs. It uses the existing public snapshot as a test oracle, never production student data.
- `node tests/cage-critic-browser.mjs`: mobile landscape/short portrait, scene controls, blocked storage, asymmetric read failure, corrupt-save backup/recovery and ordinary progress restoration.
- `node tests/mobile-expedition-browser.mjs`: fresh touch-only11-question expedition, deliberately forced capture/guided escape, cage/recovery/escape/completion reloads, actual homepage return/reopening, and unanswered-API loading fallback. Defaults to the built local app on4328; set `MAZE_QA_URL` for the public build. Uses isolated sessions and never submits student data.
- Repository regression: `node --test *.test.mjs db/*.test.mjs`. Database-dependent checks skip without isolated database variables. Source questions, database schema and email contracts are unchanged, so no seed, migration or real email submission is required for this local game addition.
- The existing web-game skill client exercises actual keyboard movement and records `render_game_to_text` / `advanceTime` state. Local screenshots/reports are generated under ignored/uncommitted `output/` evidence paths.

Detailed acceptance and review evidence: [feature record](../../features/maze-game/small-maze.md). Physical-phone GPU/touch acceptance and production deployment are separate from local browser emulation. Nothing here authorizes a push to main or a production release.


## Living world and movement

The expanded23×17 maze adds a connected eastern garden and southern ruins. Old paths and saved question coordinates remain valid. A scout and keeper offer conversations, route guidance and lighting. A fox, rabbit and owl react to the player; filling the water bowl attracts the fox, and helping it enables path-safe following. Pump, lamp and bench actions persist in this tab and remain separate from learning score/coins.

Tap a direction for one step; hold it to keep walking. Keyboard and tap-to-path share the same continuous controller, with acceleration/braking and smooth turns. Physics position drives the visible figure; logical quest events commit at tile centers. Pausing freezes motion; restore uses the safe completed tile and retains all academic/world discoveries. Opening a cage stops navigation. The map/journal and “הגן והדמויות” action expose the new routes and discoveries.

Additional verification: `node --test tests/movement.test.mjs tests/world.test.mjs`; `node tests/world-browser.mjs`. Maze game HTML revalidates on navigation; retain the previous published hashed asset pair when publishing the first transition from the original cache policy.

## Question clarity and nearby greetings

All62 questions were reviewed against their local sources. `question-presentation.js` adds short maze-only setup or clearer display wording for29 items, without editing canonical choices, grading or saved question identities. Essential context stays visible; source details, explanations and cage tools expand on request. A skippable900ms closing gate marks a new trap; pause freezes it, reduced motion skips movement, and reload resumes the question directly.

Approaching either person produces a short Hebrew hello and wave. Fox, rabbit and owl acknowledge the player visually. These accessible nonmodal greetings never interrupt movement or grant academic rewards; cooldown and approach hysteresis prevent repeated announcements. `tests/trap-ux-browser.mjs`, `tests/world-browser.mjs` and the presentation/greeting unit tests cover these flows. See the [complete question audit](../../features/maze-game/question-context-audit.md).
