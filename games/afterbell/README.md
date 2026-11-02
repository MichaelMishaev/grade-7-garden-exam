# אחרי הצלצול — PrepX Afterbell

A separate Hebrew RTL, open-world 3D practice game in the PrepX solution. Starlight Relay is the primary adventure. Each new run selects a different edition of the dusk campus relay. Students choose beacon order, collect sparks, jump through a ring or use its ground switch, align mirrors and complete their selected practice set to light a constellation. In the original blackout adventure, students meet three classmates in any order, interpret what they need, recover equipment, complete an existing practice set and restore the exit systems. Nineteen rabbits, foxes, birds and ducks roam independently around the campus. The player and classmates have human proportions and the environment uses a restrained dusk palette, concrete/glass buildings and natural trees. The environment identifies **בית הספר שי עגנון · כיתה ז׳ איינשטיין · כיתת הייטק**.

The field-case selector offers ten additional adventures. Each has three distinct field tasks, a subject recommendation and its own optional objective. The player can also start the original blackout adventure or resume a saved game.

All game code lives in `games/afterbell/`. The home page links to the game through a dedicated card and stylesheet. The existing server delegates only `/api/afterbell/*` to the game service; exam pages and submission behavior retain their existing implementation. No Railway configuration changes are needed.

## Run

Node 24 or newer. From this directory:

```sh
npm ci
npm run build
npm start
```

Open **http://127.0.0.1:4319/**. The standalone server serves the built game, reads public study content from PrepX and saves game attempts in its own local SQLite database. It binds to loopback. No email is sent, and no student information is forwarded to the production content service.

For development, leave `npm start` running and run `npm run dev` in a second terminal. The development preview is **http://127.0.0.1:5177/**. `?quiz=instructions` (or any of the seven quiz IDs) preselects a practice set.

For a phone on the same Wi-Fi, bind explicitly to the computer's private LAN address and allow that exact origin, for example:

```sh
AFTERBELL_HOST=192.168.1.139 AFTERBELL_ORIGIN=http://192.168.1.139:4320 PORT=4320 npm start
```

Open `http://192.168.1.139:4320/` on the phone. The address depends on the computer's network. `127.0.0.1` on a phone refers to the phone itself. Default hosting remains loopback; do not forward this development port through the router. Round IDs and content fingerprints work on local-network HTTP as well as HTTPS.

## Connection to the existing app

- Reads the existing public `GET /api/quizzes/:id` API through a fixed, read-only server adapter. The source is `https://hitech.agnon.online`.
- All seven existing quizzes / 62 questions are supported. Original prompts, choices, correct indices, explanations and references are retained. Question and choice presentation order are shuffled without changing meaning.
- `npm run sync-content` refreshes the offline snapshot from that same API. It fails on unavailable source content; it never invents replacement questions.
- The browser prefers valid live content, then falls back to the checked-in snapshot with an explicit offline label. Existing null reference parts and absent physics English explanations are preserved; the game displays what the database supplies.
- Source links and the PrepX logo return to the current application. Completed rounds link to the relevant subject page.
- The committed build is self-contained under `play/`, including the Hebrew font, and the current app serves `games/afterbell/play/index.html`. The main server delegates `/api/afterbell/*` to the separate game module. On Railway, the service uses the existing server-only `DATABASE_URL` and game-owned additive tables for durable history. No browser build dependencies are required by the main server at runtime. Rebuild and commit `play/` whenever game source changes.
- This is a practice game, not a new exam. Formal exams keep their existing flow and teacher email service.

## Learning and controls

- Clear three-step introduction, numbered system/map markers, selectable destination, equipment clues and a direction arrow.
- Keyboard: WASD/arrows move, Space jumps, Shift runs, C toggles quiet crouching, Q dashes with a cooldown, E interacts, Escape pauses, F toggles fullscreen. Carrying equipment slows movement and disables dash. Click the ground to walk. On phones, use the touch joystick, jump button and nearby-character action.
- The whole selected quiz is distributed across the three scenario stages. Complete the field task, then answer that stage’s questions at the same location. Older drafts still use the three classmates and their original equipment errands. Mistakes never remove points or lives.
- The first answer locks. Feedback explains the answer and links its source. It advances after 1.5 seconds, with an option to pause and read. The journal and completion screen provide read-only review.
- Academic scores use the existing difficulty weights, out of 100. Stars follow 50/75/90 thresholds. Fireflies and social dialogue do not inflate the academic score.
- The gate requires all questions answered and all three systems restored. Completed full rounds update `prepx-best-<quiz>` on the current origin. Separate origins have separate browser storage.
- No countdown, jump scares, paid features, external AI or public leaderboard. Environmental clues are fictional game content; academic questions are never replaced with invented material.

## Ten adventures

The start screen recommends a scenario for the selected study set; every adventure remains selectable. Paired recommendations rotate after a new round. The scenario and field progress are saved with the current per-tab adventure. These fictional field puzzles do not add academic points or replace the source question bank.

| Adventure | Field actions |
| --- | --- |
| תיק הראיות | Inspect six scene objects, link evidence to conclusions, reconstruct four events |
| העד שנעלם | Branching interviews, contradictory timetable entries, physical hideout search |
| חילוץ הרובוט | Program a 5×5 maze, repair four circuit connections, escort a moving robot |
| מודדי הקמפוס | Align ruler endpoints, trace a parcel and calculate area, convert map scale |
| משלוח במידות | Repair a manifest, balance weights, rotate and pack three shapes |
| המעבדה המדויקת | Focus/expose an image, eliminate parallax, sample and reject an outlier |
| סוד הצללים | Position light/predict shadow, compare shadow proportions, record a sundial |
| מחזירים את השועל | Earn physical trust, construct a shelter, manage calm/water/rest |
| האות האחרון | Synchronize waveforms, compose grouped Morse, reconnect a damaged network |
| שליחי הלילה | Plan a budgeted route, complete a four-movement course, deliver coded parcels |

All **30 field task types are exclusive to their adventure**, and each adventure also has a different optional bonus objective. New rounds cannot activate hidden legacy equipment errands; noticeboards describe the current adventure. Shared form controls do not imply a shared puzzle. Numbered world rings, minimap markers, distinct task props, guidance, stage slots and the journal identify the active task. Robot escort requires the companion to arrive; fox trust accumulates only through quiet proximity; the courier course checks actual jumps/dash/landing. Prior unfinished revision-1 puzzles reset to the wider task while completed stages and locked source answers are preserved. Wrong operations explain how to retry, with no academic penalty. The final gate still requires all source questions and all three stages. The detailed specification and acceptance criteria are in `docs/features/afterbell-scenarios.md` at the repository root.

`node tests/qa-scenarios.mjs` tests ten desktop and ten 390×844 mobile adventures against the Vite server (`AFTERBELL_URL`, default port 5177). It mocks content and result saves; no teacher email or production history is written. Academic feedback timers are shortened in the harness; production still uses 1.5 seconds. Revision-2 reports/screenshots use `output/playwright/scenarios-r2/`; historical revision-1 results do not verify this revision. Unit/recovery tests are included in `npm test`. `npm run test:browser:isolation` checks all ten bonus assignments, current noticeboard copy, absence of hidden legacy errands, and compatibility with old saved rounds.

## Legacy adventures and optional field challenges

The closest unfinished teammate is selected at the start. The objective explicitly changes from meeting that teammate, to locating equipment, to returning it, and finally to the exit. Resuming an adventure prefers unfinished work already started. Players can still choose another station or explore freely.

A warm breadcrumb route and destination beacon show collision-safe approaches. **ללכת איתי** optionally walks the player at normal speed; joystick, keyboard or jump immediately return control. The route avoids obstacles rather than teleporting. **צריך רמז?** explains the current action; a quiet reminder appears after prolonged inactivity. The compact mobile objective includes its instruction and keeps map/journal controls below it.

Each missing item now has a hands-on check before collection: a three-symbol access sequence, a three-step backup connection check, or a radio dial with signal-strength feedback. Incorrect operations give a clue and allow retry. Solved checks survive reload. These are fictional equipment mechanisms; existing academic questions and grading are unchanged.

**משימת צד** offers five tracked challenges: fill the wildlife bowl, discover the locker note, restore path lights, make three basketball shots, and observe the lake. Each has a clue, a selected route and a completion state; players can return to the main mission at any point. Side missions and equipment checks never inflate the academic score.

## Environment interaction

Twelve optional activities have visible effects and saved state:

| Object | Interaction |
| --- | --- |
| Lakeside bench | Sit, stand, or stand automatically when moving |
| School lobby door | Open/close hinged doors and enter the lobby |
| Courtyard lamp | Switch its light and ground illumination |
| Basketball station | Throw the ball on an arc and count shots |
| Team locker | Open its door and inspect the note inside |
| Hackathon noticeboard | Record equipment clues in the journal |
| Lakeside telescope | Use a closer observation view |
| Wildlife water bowl | Fill it and let a rabbit approach |
| Lab planter | Water it and see the leaves recover |
| Recycling corner | Clear the three discarded cans |
| Path-light panel | Solve the moon/tree switch combination to light the path |
| Bicycle rack | Test the bell with sound/visible feedback |

Nearby wildlife also supports observation, calm approach and following where appropriate. Classmates have optional conversations and practical help actions. All of these remain separate from the academic score and the source question bank. The contextual action button tells students what is nearby; on phones, the compact objective bar and collapsible map leave the play space visible.

## Data and separation

The game stores a name/nickname once in browser local storage. The active adventure stays in session storage. Completed attempts go to the **game-owned** SQLite database `.data/attempts.sqlite` (ignored by Git), containing nickname, quiz ID, selected source choice indices, server-validated score, content hash and timestamps. Standalone hosting uses SQLite; integrated hosting uses game-owned PostgreSQL tables when `DATABASE_URL` is available. Exam and existing practice records are kept separate.

`POST /api/afterbell/attempts` validates origin, body size, content hash, full question coverage and choices; recomputes the score; uses a UUID for idempotency; rejects conflicting re-use; and has an instance rate limit. No public history/list endpoint is exposed. Server logs never contain names or answers. The separate database also preserves verified public question versions so pending completed rounds can be graded after a service restart or a content update. These versions contain no student information.

Failed saves are queued locally by attempt ID and retried at startup and when the connection returns; completion also offers a retry button. Local storage is not a secure account boundary: shared devices should use their normal browser privacy/session controls. There is no automatic database deletion or retention policy. Back up the game database before any separately authorized data removal.

Hosted game history uses the existing PostgreSQL connection; startup creates only the two game-owned tables if absent. No rows or existing tables are deleted.

Options: `PORT` (default 4319), `AFTERBELL_DATABASE_PATH` (private persistent database location), `AFTERBELL_ORIGIN` (additional exact allowed origin for a future hosted service). No existing application credentials are required.

## Verification

```sh
npm test
npm run test:browser   # while the dev and game servers are running
npm run build
npm audit
```

`tests/browser.mjs` exercises desktop and 390×844 touch, real WebGL rendering, movement/jumping, wildlife, pause, dialogue, locked wrong/correct answers, reload, read-only review, equipment collection, all quests in a different order, the exit and a saved result. Run `node tests/qa-relay.mjs` with the local dev and game servers running to exercise all beacon mechanics, saved progress, score locking, replay and the finale. Dedicated QA scripts cover mobile environmental actions and source/storage failure recovery. It also checks offline and reduced-motion behavior. `tests/qa-guided-trip.mjs` checks a complete guided equipment round trip in the built app (no development hooks, no result/email POSTs); set `PREPX_QA_URL` to verify a hosted build. `tests/qa-mission.mjs` verifies the objective lifecycle, safe guidance, all field puzzles, five side missions and reload recovery; its route-only mode checks all eleven actual-world destinations. Screenshots and reports are ignored under `output/`. Test-only positioning exists only in Vite development with `?test=1`; production builds remove that code.


`tests/qa-scenarios.mjs` exercises all ten current adventures on desktop and 390×844 touch: field retries, movement restrictions, question locking, completion gates, reload, guidance and mocked saves. `npm run test:browser:built` verifies the nested build (default port 4328) through normal controls without positioning hooks: all seven subject recommendations, the larger robot maze, evidence inspection, physical fox trust, the completion button and locked source answers. Screenshots/reports are under `output/` and must not be committed. Older `browser.mjs`, `qa-mission.mjs` and `qa-guided-trip.mjs` describe the legacy equipment flow; use a legacy saved-round fixture when investigating that flow. The new default browser command covers the current scenario experience.

Test-only positioning exists only in Vite development with `?test=1`; production builds remove that code. Production/public QA must intercept result submissions unless a real result is explicitly authorized.

Verified locally on 2026-10-29: **16 core/service tests**, **43 full-story browser checks**, **18 functional recovery checks**, **154 mobile checks**, and **18 final mobile visual checks** passed with no browser/page errors in the completed QA runs. The unchanged web-game skill client also passed the final start, movement, jump and rendered-scene smoke check. Screenshots and game state were inspected. The mobile checks use browser emulation at 390×844 and 360×780; physical-device acceptance and production deployment are separate.

Engagement revision verified locally: **101 mission checks**, **36 actual-world route checks**, **43 story/recovery checks**, **217 mobile checks** and **31 small-screen puzzle checks** passed with no uncaught browser errors. The game unit/service suite passed 25 tests; its optional PostgreSQL integration test was not rerun in this client-focused revision. Main-server static integration and existing mocked submission checks passed 11 tests. Game HTML revalidates on reload; previous release assets are retained during the cache transition.

The repository's existing regression suite is run from its root: `node --test *.test.mjs db/*.test.mjs`. Database reset suites need their explicit throwaway-database setup; this game does not change the main database or exam submission contract. Production release still requires the repository's deployment and human-review gates.

## Research and design

Reviewed on 2026-10-29:

- [A Short Hike](https://store.steampowered.com/app/1055540/A_Short_Hike/): Steam English reviews 99% positive, "Overwhelmingly Positive". Adapted short, friendly exploration, recognizable landmarks and character encounters.
- [TOEM](https://store.steampowered.com/app/1307580/TOEM_A_Photo_Adventure/): Steam English reviews 98% positive, "Overwhelmingly Positive". Adapted humorous character needs and observation-driven quests.
- [Ducklings](https://www.crazygames.com/game/ducklings): 9.2 rating on CrazyGames, based on the preceding six months. Adapted readable movement and lively roaming animals.

The mature revision also references [Oxenfree](https://store.steampowered.com/app/388880/Oxenfree/) for teenage dialogue and mystery, [Firewatch](https://store.steampowered.com/app/383870/Firewatch/) for atmosphere and navigation, and [Escape Simulator](https://store.steampowered.com/app/1435790/Escape_Simulator/) for environment-based puzzle interactions.

Original Three.js geometry and dialogue; no assets copied from these games. This is stylized realism, not photorealistic rendering. Concrete/glass campus, natural tree silhouettes, teen characters, flashlight, subdued wildlife, dark interface and restrained amber actions. Heebo is bundled under the accompanying SIL Open Font License. Static scenery is merged by material to reduce draw calls. Decorative bobbing and camera easing respect reduced motion; essential player/animal movement remains functional.

For a hosted-build relay check through normal controls, run `AFTERBELL_URL=https://hitech.agnon.online/games/afterbell/play/index.html AFTERBELL_QA_QUIZ=facts AFTERBELL_MOCK_SAVE=1 AFTERBELL_QA_OUTPUT=output/prod-relay node tests/qa-relay.mjs`. The save is intercepted in this mode; it does not create a production result or email. The development-only route sweep remains part of the local run.
