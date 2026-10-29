# אחרי הצלצול — PrepX Afterbell

A separate Hebrew RTL, open-world 3D practice game in the PrepX solution. Students explore a school campus after a hackathon power outage, meet three classmates in any order, interpret what they need, recover equipment, complete an existing practice set and restore the exit systems. Nineteen rabbits, foxes, birds and ducks roam independently around the campus. The player and classmates have human proportions and the environment uses a restrained dusk palette, concrete/glass buildings and natural trees. The environment identifies **בית הספר שי עגנון · כיתה ז׳ איינשטיין · כיתת הייטק**.

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
- Keyboard: WASD/arrows move, Space jumps, Shift runs, E talks, Escape pauses, F toggles fullscreen. Click the ground to walk. On phones, use the touch joystick, jump button and nearby-character action.
- The whole selected quiz is distributed across the three classmates. Visit them in any order. Understand their needs, find the missing card/backup unit/antenna, then complete the assigned questions to restore their station. Mistakes never remove points or lives.
- The first answer locks. Feedback explains the answer and links its source. It advances after 1.5 seconds, with an option to pause and read. The journal and completion screen provide read-only review.
- Academic scores use the existing difficulty weights, out of 100. Stars follow 50/75/90 thresholds. Fireflies and social dialogue do not inflate the academic score.
- The gate requires all questions answered and all three systems restored. Completed full rounds update `prepx-best-<quiz>` on the current origin. Separate origins have separate browser storage.
- No countdown, jump scares, paid features, external AI or public leaderboard. Environmental clues are fictional game content; academic questions are never replaced with invented material.

## Clear next steps and field challenges

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

`tests/browser.mjs` exercises desktop and 390×844 touch, real WebGL rendering, movement/jumping, wildlife, pause, dialogue, locked wrong/correct answers, reload, read-only review, equipment collection, all quests in a different order, the exit and a saved result. Dedicated QA scripts cover mobile environmental actions and source/storage failure recovery. It also checks offline and reduced-motion behavior. `tests/qa-mission.mjs` verifies the objective lifecycle, safe guidance, all field puzzles, five side missions and reload recovery; its route-only mode checks all eleven actual-world destinations. Screenshots and reports are ignored under `output/`. Test-only positioning exists only in Vite development with `?test=1`; production builds remove that code.

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
