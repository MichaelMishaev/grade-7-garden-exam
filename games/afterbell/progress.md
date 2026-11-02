Original prompt: Build a fast, well-designed, funny 3D exam-practice game as a separate application in the existing solution, without touching main code. Research highly rated small games. Follow-up: spooky escape quest with a lost person/animal, multiple characters, existing database questions and answers, and a freely explorable world with roaming animals.

## Boundary and reference lock
- All additions under games/afterbell; original tracked application files untouched. Feature branch codex/breaktime-3d in an isolated worktree.
- Concept: אחרי הצלצול (Afterbell). A lost fox explores a strange night-time school forest. Three quirky characters hold lantern seals; understand their needs, practice existing questions, open the exit.
- Primary direction: A Short Hike's explorable low-poly world and character-led discovery. TOEM contributes humorous requests; Ducklings contributes readable movement and roaming animals. Original geometry and dialogue only.
- Visual lock: full-bleed blue-green nocturnal 3D world, a tiny orange fox, oversized moon, warm lit school and landmarks, mint primary actions, restrained pale HUD, Hebrew type and RTL. Bright navigable ground; no jump scares. Code-native geometry, no placeholder images.
- Local Open Design service health checked; its template catalog returned no relevant game/3D templates. Use direct Three.js implementation for the interactive world.
- Live PrepX /api/subjects and /api/quizzes/facts verified read-only. Database content includes existing null reference parts; preserve those as supplied and show reference title without inventing a part.
- Practice questions/answer indices/explanations are imported intact; game dialogue is separate from assessed content. Full quiz rounds, shuffled questions/options, first answer locks, explanations and review, separate game rewards and academic score.
- Separate service owns game attempt history; never calls submit-exam or changes main server/database. No production publication authorized.

## Work log
- Initialized isolated project, dependency pins and build/dev scripts.
- Implemented Three.js forest, school, lake, greenhouse, library, tower, exit, fox movement/jump/click-to-walk, collisions, 22 roaming animals, collectibles and mobile joystick.
- Implemented source-backed shuffled full rounds, empathetic dialogue, three seals, answer locking, feedback/review, restored progress, score and stars.
- Added isolated SQLite attempt-history service, strict input/content validation, server grading, idempotency, origin/size/rate checks, local offline result queue. Production content is read only; no main app or database mutation.
- Added school/class identity at Michael's request: בית הספר שי עגנון, כיתה ז׳ איינשטיין, כיתת הייטק. Clear three-step tutorial, numbered destinations and live direction arrow.
- Initial regression: original app 115 passed, 2 DB-dependent skipped. Game 7 unit/service tests passed. Full desktop escape and save passed; mobile touch/offline checks passed. First browser run hit an external font load timeout; fonts are now bundled. Later run interrupted by development reload during edits; final rerun required.
- Vite updated to patched 6.4.5; npm audit returned zero vulnerabilities. Immutable scenery batched to reduce render calls; deterministic time stepping renders once per burst.

## Integration review and equipment verification — 2026-10-29
- Extended tests/core.test.mjs to verify equipment-gated restored station seals, complete question/option identity, locked first attempts, source-change rejection, and separation of academic score from exploration rewards. Game unit/service suite: 13 passed.
- Updated tests/browser.mjs for the current school/equipment narrative: keyboard movement/E/jump/Escape/F, sound, social feedback, equipment inspection/collection, feedback hold across visibility changes, draft/order/item restoration, all three stations in nonsequential order, offline save/retry/reload queue drain, final read-only review, and 390px reduced-motion touch controls/target sizes.
- Browser script syntax passed; this revised script has NOT run yet. Further environment-interaction implementation began before final browser execution, so fresh desktop and mobile QA agents should run it after integration stabilizes. Use one WebGL browser context at a time; advanceTime(0) before screenshots stops compositor contention.
- Independent review fixes applied by parent in main.js: paused feedback stays paused after tab return; WebGL failure cannot re-enable Start; completed-save payload freezes before async hashing; save fallback text reflects actual persistence; pending history retries on startup as well as online events.
- Residual service design limit: in-memory public-content versions protect current-process rounds, while retries of already-saved attempts survive restart. A never-saved round from a removed live content version can still be rejected after a service restart if that exact version is absent from the bundled snapshot/current source.

## Mature revision and parallel QA
- User requested more adult/serious, realistic, much more interaction, mobile-first, fresh agent for environment interaction, two parallel QA agents and Ultra reasoning.
- Parallel agents redesigned world and UI: proportionate teenage explorer/classmates, concrete/glass school, perimeter fencing, sports court, communication mast, natural trees,19roaming animals, flashlight and visibly restored stations; dark charcoal/amber UI. Original scope remains entirely inside games/afterbell.
- Narrative now an after-school hackathon outage. Three classmates (נועה, איתי, אדם) need access card, backup unit and antenna before their source-backed question terminal. Optional environmental interactions being added separately. No new academic questions.
- Core prompt/options/correct identity check: all62snapshot questions exactly match owning PrepX source extraction.
- Ultra review fixed explicit feedback pause surviving tab visibility, WebGL start failure, completed-round save race, name retention without localStorage, truthful failed-save notices, startup/offline queue flush.
- Separate functional QA reproduced an unsavable queued-result bug after content update/service restart; added verified public content-version persistence in game-owned SQLite, and routes dev content through same server adapter. Service restarted.14 unit/service tests pass at this point.
- Last completed baseline browser pass before mature/environment expansion:25checks, no page errors, including full desktop escape/save and mobiletouch/offline/reducedmotion. Must rerun expanded game before claiming final completion.
- Fresh Ultra environmental agent completed12visible/saved activities: bench sit/stand, walkable lobby door, lamp, basketball arc, locker, noticeboard, observation scope, wildlife water bowl, planter, cleanup, three-switch light puzzle, bikebell. Added optional NPC help/conversation and wildlife interaction, plus compactmobileHUD/collapsiblemap and mobileDPR1.15/shadow1024.
- Source stable for QA. Mobile agent has first isolated WebGL window; functional agent continues static/service work in parallel and then runs story/storage/builtservice browser checks. Parent will run unchanged official game-skill client afterward.

## Final verification (2026-10-29)
- Two independent Ultra QA agents: full mobile154/154 checks at390×844 and360×780, zero uncaught/console errors. Covered all12environmentactions, touchjoystick pointer lifecycle, touchjump, benchstand, modalflows, allquests, reload and actuallocalhistorysave.
- Functional QA: core/service16/16; full story43/43; supplemental18/18; zero browser/page errors. Verified actual ground-click navigation around an obstacle, questions/sourceintegrity, itemgates, scorelocking, optionalNPChelp, animalfollow/leave, save503retry, queuedresultreload, poisonqueuecontinuation, invalidsourcefallback, noWebGLfallback, standalonebuiltmobile, and no developmenthooks inproductionbuild.
- Test-only fixed1.8m teleportoffset was inside a tree; corrected harness to use reachable approachpositions. Productcollision behavior was correct. A transientVite navigation interrupted an earlier run; clean stable-source reruns pass.
- Two mobile visual issues fixed: journal position relative to compact HUD, and label stacking behind HUD. Focused final visual recheck:18/18 passed at both mobile sizes, zero browser errors. Final telescope screenshot confirms a visible exit action.
- Parent ran the unchanged official web-game skill client against the final build in development preview: start/tutorial, movement, jump and exploration rendering passed with no error artifact. Inspected output/skill-final/shot-0.png and state-0.json; mode explore, player moved and jumped. Also visually inspected final390px exploration screenshot. All QA browser contexts closed after verification; preview and game service remain available.
- Existing app regression115passed,2DB-dependent skipped; no trackedfiles changed outsidegames/afterbell. No productionDB writes, teacheremails, push or deployment.

## Physical-phone preview address correction
- User reported a black screen on Samsung S24 Ultra using the supplied URL. The supplied127.0.0.1 address cannot reach the computer from a separate phone. Added opt-in private-LAN binding and exact allowed origin; started built preview at http://192.168.1.139:4320 (same Wi-Fi required). No Railway or main-app changes.
- Found and fixed additional LAN HTTP compatibility failures: crypto.randomUUID and crypto.subtle require secure contexts. IDs now fall back to getRandomValues and SHA256 uses bundled js-sha256. All7 quiz hashes match server SHA256;100 fallback IDs valid and unique.18 core/service tests pass; production build passes; official skill client enters explore and moves on actual insecure LAN origin, screenshot inspected with no error artifact.

## Authorized production integration — 2026-10-29
- Michael explicitly requested pushing and a designed main-app game button. Fast-forwarded feature worktree to latest origin/main9eee371 before integration, preserving three newer exam commits and the dirty live checkout.
- Added the dark campus/compass Hebrew homepage card in index.html and dedicated afterbell-entry.css. Main server lazily delegates only /api/afterbell/*; game code and bundled assets stay in games/afterbell. Committed build needs no main deployment configuration or browser dependencies at runtime.
- Game source now captures public content through /api/afterbell/quizzes/:id. Added narrow PostgreSQL persistence using existing server-only DATABASE_URL, with only two additive game-owned tables, keeping standalone SQLite. Split pure state and UUID code away from Three/hash browser dependencies to keep the Node service self-contained.
- Latest-main root regression283passed,8skipped (six DB checks subsequently exercised with local DB, two private-rubric checks intentionally unavailable). Disposable PostgreSQL database suite45passed; full-stack9passed using repository fake-rubric fixture and mocked external services. Initial full-stack run lacked that fixture and failed the AI-grading test; corrected setup passes without source changes. Local migrate/seed/verify passed in a new disposable database.
- Game19/19 tests passed including actual PostgreSQL concurrent conflict, save, repeat, restart and content-version recovery; main-app save/asset integration1/1 passed with both SQLite and PostgreSQL. Homepage/mobile entry40/40 passed at390px Android DPR3.5 and desktop1440, zero browser errors; screenshot inspected. All62snapshot questions exactly match latest source prompts/options/correct indices.

## Live release verification
- Pushed30fa093 to main under explicit user authorization. Railway deployment85442086-ae4a-45e4-b338-f684ebbc5d9f reachedSUCCESS. Public home card and nested game return200. Apphealth DBup and gamehealth okay; game content alias returns existingquestions. Existing facts/physics-basics API response hashes unchanged across release.
- Live HTTPS home-to-game QA40/40 passed with zero browsererrors, Android390px/DPR3.5 and desktop1440. Confirmed starts, movement, jump, assets/MIME, no devhooks and no overflow after stylesload. Corrected harness to await page load: DOMContentLoaded on a static remote page can precede stylesheet completion, causing a transient intrinsic-logo width measurement; after load both viewports fit exactly. Inspected the live gameplay screenshot. No production student attempt or email was created by QA.

## Engagement and navigation revision
- User reports the live game becomes boring and players get lost. Bound this revision to game-owned files: explicit next steps, nearby first teammate, resume unfinished work, visible safe routes/beacons, optional normal-speed guided walking, clue control, inactivity reminder, three equipment field puzzles and five tracked side missions. Keep open exploration, source questions, academic score and existing data contracts.
- Parent owns mission/main/UI; environment agent owns collision-safe A* navigation and world path rendering; functional and mobile QA agents verify the integrated flows serially on GPU. Early visual pass found the larger mobile panel covering the map toggle; fixed import order and anchor map/journal below the panel. Mission unit tests3passed, route tests4passed, existing game core/service tests18passed; PostgreSQL test skipped here because service/database code is unchanged and its disposable test container was already stopped after the previous release.

- Independent functional QA:101/101 new mission checks,36/36 actual-world route checks across11 destinations,43/43 adapted full-story/recovery checks; zero uncaught errors. Includes real normal-speed guide movement, manual override, safe arrival, all puzzle mistakes/corrections, reload of solved-but-uncollected equipment, source question continuity, five side missions, no score inflation and final exit. Desktop screenshot found a world label over the objective; raised quest/map layers and clipped labels below header, visually confirmed fixed. Mobile regression runs next.
- Added game-HTML-only revalidation in main static server, with a focused integration assertion, to avoid stale index pages referencing missing bundles after updates. Keep previous release assets for the current cache transition; all other static caching is unchanged. Focused main/server integration and submission mocks11/11passed.

- Final mobile QA217/217 plus focused360px puzzles31/31passed, zero browsererrors. Visually confirmed HUD, hints, routes and all three equipment controls at390×844 and360×780; tall antenna dialog remains scrollable and collect reachable. An added QA fixed-offset setup could miss the basketball action; replaced it with collision-safe setup/target verification and made explicitly selected nearby side-goal actions take priority over wandering wildlife/other objects. Clean rerun passed all five side quests and complete-round save.
- Final game unit/service suite25passed with one optional unchanged PostgreSQL test skipped; focused main/static/submission tests11passed. Built final bundle and preserved the previous public bundle/font CSS for cached older HTML.

- Unchanged official web-game skill client passed against the final nested production build served by main app: start, tutorial, visible route and real guided movement from(0,9) to(8.16,12.81), route remaining0.9, no blockedpath or browsererror artifact. Screenshot and textstate inspected. No live student attempt/email was created during QA.

## Guided-return arrival regression
- Initial public HTTPS guided trip found a real status bug on return from the antenna: player at(9.5924,15.6933) was within normal conversation range but follower arrival becamefalse after automatic replanning at1.7417units. The planner used1.7 while movement accepted0.1waypoint tolerance. Added an explicit1.8arrival predicate and regression test for the reproducedposition.
- New durable tests/qa-guided-trip.mjs exercises the built app through normal controls withoutdevhooks: guide toAdam, agree, guide toantenna, solve tuner, collect, guideback and open first database question. POSTattempt/exam requests are intercepted and mustremainzero. Local corrected trip passed with no browsererrors. Game suite26passed, one unchanged optionalPGtestskipped; main builtasset/cache/save integration1passed. No source question or grading change.

## Player occlusion fix — 2026-10-29
- User reports the explorer disappearing behind buildings, making navigation unclear. Isolated branch codex/afterbell-visibility.
- Added a camera-to-player sight corridor through foreground scenery shaders; terrain and physical collisions stay intact. Route dots render over occluders. Disabled cutaway in menu and telescope observation.
- Verified 10 visual scenarios across 390×844 and 1440×1000: north gate, school interior, annex, tree cover and open path. Inspected screenshots; movement, touch/keyboard jump and guided navigation pass with no browser errors.
- Game tests: 26 passed, 1 optional PostgreSQL test skipped. Root regression: 284 passed, 8 DB/private-fixture tests skipped. E2E: 9 skipped without E2E_DATABASE_URL. Build, syntax and diff checks passed; existing bundle-size warning remains. Database seed/verification and real email/production checks are outside this rendering fix; no deployment performed.
- Preserved prior published asset files alongside the new production bundle for cached HTML compatibility. Durable browser regression: tests/qa-visibility.mjs (PREPX_QA_URL defaults to local port 5183).
- Unchanged official web-game client passed against a temporary mocked-content fixture at the gate: explorer moves and jumps with the cutaway visible; screenshot/state inspected, no browser error artifact. Temporary fixture removed.
- Michael authorized testing and pushing this fix. Fast-forwarded the feature branch to origin/main 0e97c97 before final verification: root 285 passed / 8 skipped; game 26 passed / 1 skipped; 10 mobile/desktop visibility scenarios and movement/jump/guide checks passed, zero browser errors. Production bundle regenerated with previous cache-transition assets preserved.

## Starlight Relay · November 2
- The scenario agent proposed a free-order campus light relay. Claude Code reviewed the interaction model before integration and identified save validation, short quizzes, consecutive layouts, accessible ring height and route reachability as acceptance cases.
- Built three authored editions, moving the physical challenges between landmarks. The classic blackout is still selectable. Both modes share the existing question, feedback, score and history pipeline.
- Local verification covered all authored destinations, a full 11-question physics relay, mobile jump and switch, mirror retry, mid-challenge reload, replay, the saved result and constellation. Fixed incidental spark collection changing the chosen destination. The classic browser suite passed 43 checks. The compiled app also opened a database-backed quiz and accepted keyboard interaction at the mirror.
- Student feedback on replay enjoyment and production rollout remain open.

## All-pending release verification — November 2
- Integrated Starlight Relay into current origin/main without conflicts. Root suite: 301 passed, 8 database-dependent skipped. Game suite: 29 passed, 1 optional PostgreSQL check skipped. Rebuilt production bundle matches the authored feature assets; preserved old published bundles for cached HTML.
- Local relay completed all challenges, eleven bundled physics questions, persisted isolated SQLite history, resume and replay. Classic regression: 43 browser checks passed. Official game client movement/jump screenshots and relay/finale screens inspected with no browser error artifact.
- Extended the durable relay QA script for nested built URLs, selectable quiz, and optional intercepted saves. The full built-app relay passes with database-backed facts content and intercepted history.
- Existing production limitation: physics API quizzes now contain open answers unsupported by the multiple-choice game adapter, which returns 503 and uses the bundled quiz fallback. No question or grading changes made in this release.

## Ten-scenario revision — 2026-10-31
- User: every subject repeats the same tasks; create/test ten different scenarios, interactions and movements, then implement.
- Reusing clean feature worktree examsPractice-visibility. Spec: docs/features/afterbell-scenarios.md. New-round scenario flow replaces identical errands; legacy drafts retain old flow. No deployment authorized.
- Scenario contract tests will run before UI/world integration. Preserve source quizzes and existing save API.
- Added ten three-stage adventures and a subject-aware selector that rotates paired recommendations. New rounds complete field actions then source questions at the same location. Legacy drafts retain original errands.
- Added programmable robot grid, visual signal replay, ordered controls, dial tuning, live scanner stabilization, measured routes, crouched tracking, jump sensors and fragile cargo routes. C/Q and touch controls add crouching/dash; cargo slows movement and disables dash. Numbered markers, map markers and scenario journal entries show progress.
- Scenario contract/recovery tests: 13 passed before final browser QA. Existing game/service suite initially 38 passed / 1 optional PostgreSQL skipped. Root suite: 285 passed / 8 fixture/DB-dependent skipped; focused main static/submission checks: 25 passed. E2E: 9 skipped without E2E_DATABASE_URL; no database resets/seed or real email requested.
- Official web-game client exercised actual movement and jump in the new evidence adventure (x=.484,z=8.645,y=.633); screenshot/text state inspected. Removed an overlapping desktop tip exposed by that screenshot. Browser QA continues across ten desktop and ten mobile journeys.

- Final scenario QA: 592 checks / all ten adventures on desktop and 390×844 touch (20 complete journeys), no uncaught browser errors, two fully mocked exit saves. Final nested-build QA: 46 checks on desktop/mobile, all seven subject recommendations, explicit selection, no dev hooks, real guidance/manual override/crouch speed, robot completion button and goal rendering, locked source answer, frozen accepted scanner reading; zero console/page errors and zero saves. Screenshots inspected.
- Fixed visual findings: preserve the executed robot route/goal before clearing stage state, animate token traversal unless reduced motion, freeze the accepted scanner value, remove overlapping desktop hint. Rebuilt game; kept previously published assets. Default npm browser command now runs current scenarios; historical equipment scripts are documented as legacy.
- Final game suite39passed/1optionalPGskip; root285passed/8DB-privatefixture skips; E2E9skipped without its DB. Main static integration passes with final build. No DB writes/seed/reset, real email or production deployment. Remaining human follow-up: Michael playtests engagement and any physical devices.
- Final unchanged official web-game client passed against the nested built page: explorer movement/jump confirmed in text and inspected screenshot, no browser error artifact. Temporary auto-start fixture removed. Integrated browser refreshed and shows all ten scenario options; prior draft remains resumable. Local main server remains on4328.

## Revision 2 — stronger task diversity
- User correction: do not generate the same tasks for any scenarios; tasks must be broader. First version reused mechanics across adventures and is insufficient.
- Updated spec before implementation: 30 exclusive task types, ten independent scenario experiences; multi-action investigations, simulation, construction, calculation, animal care and physical escort/course/delivery. Reuse widgets, not puzzles. Existing source questions/API remain intact.
- Implemented 30 exclusive task kinds and interfaces in scenarios.js / field-tasks.js. World now has task-family props, a collision-aware robot companion, a physical fox, four course markers and gradual quiet-proximity trust. Revision-1 unfinished field actions upgrade safely; completed fields/locked questions survive.
- R2 rules: 34 tests pass, including all 30 task solutions, incomplete/distant rejection, partial reloads, physical gates, packing bounds, robot walls, route budget and Morse grouping. Game suite60passed/1optionalPGskip; root285passed/8DB-privatefixture skips. First nine desktop broader journeys passed; full mobile/current-build verification pending.
- R2 final full journeys:578checks/20desktop-mobile adventures/all30exclusive task types, zero uncaught errors, only2mocked exit saves. Found/fixed courier checkpoint leakage;45rule tests now include all ten consecutive stage chains and ten exclusive bonus objectives.
- Removed invisible legacy equipment actions from new rounds; noticeboards/locker notes show current tasks. Bonus cards now differ across all ten scenarios.44isolation checks passed, including real old-draft compatibility, no errors/writes. Built desktop/mobile robot/evidence/fox checks46passed with no console/page errors or writes.
- Final game71passed/1optionalPGskip; root285passed/8DB-privatefixture skips. Build/static integration pass. No production deployment or commit. Remaining: human engagement/device playtest.
- Final mobile visual review found evidence details incorrectly remaining inside the three-column object grid. Closed that grid; built-page QA now asserts readable clue-card width in both profiles. Final48builtchecks pass. Other mobile task interfaces/screenshots inspected.
- Final official game client passed against the latest nested build; movement/jump and new task header confirmed in state/screenshot. Temporary fixture removed; final static integration and diff checks pass. Integrated browser refreshed to R2; main local server remains4328.
- Final touch review caught a crouch/jump overlap caused by centering the smaller jump button against the joystick. Bottom alignment fixes it; final49builtchecks include all-pairs control-overlap checks. Final app bundle regenerated, no commit/deploy.

## Worker integration · November 2
The production candidate keeps separate launch controls for Starlight Relay, ten field cases, and the original blackout. Existing quiz groups, scoring, stored attempts and prior hashed assets are preserved. The combined build passed 49 scenario browser checks and the full relay journey with its result submission intercepted.

## Beyond the campus
The playable world grew from 54 × 54 to 216 × 216. New Starlight Relay editions send students to three different regions, while old drafts keep their original station coordinates. The atlas records six waystones. Two bridges cross the tidal watercourse, and nine optional jump gates grant a burst of speed. Three patrolling wind spirits slow grounded players without changing academic scoring. Browser checks covered guided travel to all six landmarks, outer-world reload, discovered-only fast travel, touch jumping through all nine gates, wind contact and the original campus guided trip.

## Festival City
The default entry opens a coastal roleplay city. Three jobs each support two shifts through eight landmarks, with walking, drivable vans, manual controls, guided routes, and three role-specific activities. Questions come from the selected PrepX quiz after each delivery. The older campus is linked from the city welcome page and continues to use its own draft. QA exercised the actual homepage entry, three complete jobs, mobile quiz controls, resume and intercepted saves. The campus mirror controls were checked in Chromium and WebKit at 320px and 390px.

## Festival outfitter
Correct answers, completed deliveries, hero gear, a following assistant and autonomous city life. Acceptance criteria C6–C9 are in the Festival City feature record.

Local QA passed all 79 game tests with isolated PostgreSQL. Chromium and WebKit exercised courier (390px), technician (320px), and reporter (1280px) shifts, including locked feedback, coins, gear purchases, companion proximity, moving street actors, reload and replay. Each shift submitted once to an intercepted endpoint.

## Phone camera pickup
Replaced the dialog height cap with content-sized panels in a scrollable overlay. A constrained-height simulation reproduced the clipped heading before the fix. Touch QA verified exit, retry, aim and shutter in Chromium and WebKit at 390px, including a short-height Chromium check. Active play now shows 52 vertical world units on phones instead of 45.

## Street driving and shop additions
The van uses the shared city street grid for guided routes. Short access legs connect addresses to the streets. The shop now includes a scarf, sunglasses, a backpack and a van roof beacon. The city road browser check buys the four items, reloads the shift, visits all eight landmarks, and samples the van between access legs; the road planner test also blocks one street to force a detour.

## Van garage
Five cosmetic upgrades can share the van with the original roof beacon. The shop opens the garage when driving and the character section on foot. Chromium and WebKit bought the gear, removed and re-equipped the spoiler, restored the wallet after reload and drove to all eight landmarks with the upgrades installed.

## Traffic contact
Manual van contact checks oriented vehicle bounds, stops inward movement and gives one impact cue per sustained contact. Normal motion includes a damped suspension rebound and a brief puff of road dust. Guided routes follow directional lanes, predict moving traffic and yield or replan. Tests cover braking for a crossing car, bumper and side clearance, manual recovery, reduced motion, and traffic-aware trips to all eight destinations.
