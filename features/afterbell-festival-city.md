# Festival City

Students open Afterbell and choose a subject, a nickname and a city job. A courier, technician or reporter helps prepare the waterfront festival. Each shift has three physical errands. The player walks or drives to pick up a specific object, delivers it to a named resident, then answers the next group of questions from their selected quiz. Completing the shift opens the festival. The primary world is a sunny 480 × 480 coastal city, with districts connected by streets, a working vehicle, homes, shops, civic buildings, a park and a pier. The previous campus remains a separate destination.

Brookhaven RP is the reference for homes, vehicles and city roleplay. All buildings, characters, writing and visual assets in this city are original. The first release is single-player.
Reference: https://www.brookhavenrp.com/guides/history

| ID | Acceptance |
|---|---|
| C1 | On a phone the first screen states the goal. Starting shows the specific first destination and action without dismissing a tutorial. |
| C2 | The player can leave the route, drive or walk across districts, and use directions. Picking up and delivering require physical proximity. |
| C3 | A delivery opens visible selected-subject questions. First answers lock, explanations and source references remain readable, and misses allow the story to advance. |
| C4 | Reload restores the role, vehicle, cargo, position, answers and current phase. Finishing saves through the existing game history contract, with retry on failure. |
| C5 | Completing all three jobs opens the waterfront celebration. The original campus and its saves remain reachable. |

## Festival outfitter and city life
Students earn 5 coins per correct first answer and 15 when a delivery's questions are finished, independent of the academic score. The outfitter in the city HUD shows prices and balance. Gear belongs to the player's local nickname on this browser.

| ID | Observable check |
|---|---|
| C6 | Wrong answers earn zero. Reloading feedback or a completed shift never pays twice. The next shift keeps the balance. |
| C7 | Buying equips an affordable item once. Owned items can be removed and equipped freely. Insufficient funds disable purchase. |
| C8 | A cap and jacket change the walking hero. The optional guide drone follows walking and driving players and points toward the current destination. |
| C9 | Cars traverse both street axes, residents walk and stop on sidewalks, and planes fly over the city while the hero is stationary. Opening a modal pauses the simulation. |

## City streets and new stock
C10. Guided vehicle travel from the HUD, map, or a tapped destination joins a nearby street, stays on the road network between access points, and reaches the selected address. A blocked street requires a road detour. Manual steering can interrupt the trip. Walking keeps its pedestrian routes.
C11. Players can buy, equip and remove a scarf, glasses, a backpack and a roof beacon with earned coins. The first three appear on the hero and the beacon appears on the van. Ownership persists with the existing wallet.

C12. The van shop sells five stackable cosmetic upgrades with distinct silhouettes or colors: rally stripes, a spoiler, neon underglow, a rear spare wheel, and a surfboard. Each can be removed and re-equipped without another charge. Driving players see vehicle stock first. Reload restores purchases and the fully decorated van can finish the same road routes.

C13. A van striking moving traffic loses forward motion at contact and briefly rocks on its suspension. One continuous contact gives one impact cue. Steering away restores control; reduced-motion players receive a text cue without rocking.
C14. Guided vans anticipate slower, crossing and opposing traffic, yield with the route intact, then resume or take a clear road detour. Walking, rewards and delivery progress are unaffected.

## Neighborhoods and city dispatch
The player can explore beyond the original grid during a shift, monitor simulated local events and visit a safe observation point. The low-poly city uses original models. Incidents run on the shift clock and do not change academic scoring or require intervention from a student.

| ID | Acceptance check |
|---|---|
| C15 | The map and physical road grid agree in the added districts. Travel from an original address to new landmarks and back, on foot and by guided van. Old shifts still resume. |
| C16 | A non-graphic fight, a fire, a traffic accident and a jam each show a distinct cause, scene, response and clearance. Responders and bystanders change behavior across phases. |
| C17 | Affected traffic slows, queues or takes a detour. A cleared scene releases its road restriction. |
| C18 | Hebrew city dispatch shows the incident location, current status and an observation route. The mission remains available and reload preserves the simulation clock. |

## Street discovery progression — November 4
User request: GTA-style free roaming, taking cars, fast driving, and more tasks revealing vehicles and places. This single-player learning game keeps its original city assets and adds physical vehicle access and a persistent discovery career. No combat or changes to study content, grades, APIs or databases are included.

Flow: start/resume → walk to a parked or street car → take it if its model is unlocked → drive, boost or brake → leave it at the actual stopping point → complete delivery question groups and exploration contracts → unlock models and northern/eastern districts. The mission board shows each requirement and provides routes to available contracts. Learning tasks count after every question in a delivery group is answered (wrong answers still advance). Six one-time exploration contracts require physical arrival, with walking or driving conditions. Career completion IDs persist per local nickname; vehicle positions and current vehicle persist in the tab's existing draft. Restarting a shift keeps career progress. Storage failure leaves the career usable for the current page; the UI reports that persistence is unavailable.

Defaults: Toyota and VW are available initially; 1 task unlocks Ford/Model Y, 3 unlock Model 3/BMW, 5 unlock Mercedes, 7 unlock Cybertruck. North opens after 3 tasks including 1 learning group; east opens after 6 tasks including 2 learning groups. Existing drafts already outside these limits retain access to that district. Manual motion, ground-click, guided routes, contracts, map and dispatch all obey the same boundary. No task requires a still-locked district. Boost uses a finite rechargeable meter, Shift/touch; Space/touch brakes when driving and retains walking jump.

| ID | Acceptance | Planned check / status |
|---|---|---|
| C19 | Entry requires a car within 6 metres; exit leaves it at the stop; another model can be taken; locked cars explain task requirement. All visible parked cars are interactive. | Unit rules + compiled-browser car entry/switch/traffic checks passed |
| C20 | Manual driving accelerates, boosts above cruise speed, brakes and recharges; guided routes retain safe traffic yielding. Touch controls provide the same actions. | 110-check desktop/mobile journey passed in Chromium and WebKit |
| C21 | A completed delivery question group awards one unique learning task; repeating callbacks/reloading cannot duplicate it. Six exploration contracts award once on actual arrival with their movement condition. | Rule tests + complete career journey passed |
| C22 | Unlock thresholds match above; north/east reject locked manual and guided entry. Mission board/map show locked destinations and exact requirements; main job remains reachable. | Threshold tests + locked manual/map boundary checks passed |
| C23 | Reload restores taken/parked vehicles and career; new shifts retain career; old drafts and inaccessible storage recover without a crash. | Duplicate, reload, legacy-draft and unavailable-storage checks passed |
| C24 | Hebrew RTL controls fit 390×844, board can scroll, source answers stay locked, and no real result/email is sent by QA. | 390×844 screenshots inspected; touch overlap checks and intercepted saves passed |

Local verification on November 4: 99 game tests passed (1 optional PostgreSQL test skipped), 335 root regressions passed (8 database/private-fixture checks skipped), and main-server compiled-game integration passed. Full career journey: 110 checks across desktop/390×844 in Chromium and WebKit; compiled nested app repeated 110 checks in Chromium. Final compiled edge suite: 18 checks, including actually driving away in a taken traffic car. Official web-game client screenshots and state inspected; no final browser errors. E2E database suite: 10 skipped because E2E_DATABASE_URL was not supplied. No question edits, database migrations/seeding, real result/email submissions or production deployment. Physical-device and human engagement acceptance remain open.

## Higher-detail cars and performance tiers — November 4
User correction: cars must look realistic and advanced cars requiring more completed tasks must be faster. Replace the box silhouettes with original sculpted vehicle meshes: tapered body sections, distinct sedan/SUV/pickup/bus/wedge profiles, round tires/alloy rims, separated glazing/roof/pillars, mirrors, handles, lamps and trim. Use reflective physical paint/glass and an environment reflection, following the material treatment in the Three.js car example (https://threejs.org/examples/webgl_materials_car.html). Keep the existing city, Hebrew controls, progression and saves. This is real-time original geometry; photorealism is a visual acceptance target requiring owner review, not a claim from a passing unit test.

Reference lock: preserve original model identities and city scale; borrow automotive clear-coat, dark reflective glazing, metal wheels and crisp lamp detail from the Three.js automotive example. Code-native 3D meshes are the required media, with shared geometry/materials and geometry-aware instancing so ambient traffic has the same silhouettes as drivable cars. No external model downloads, dependencies or runtime network calls. Open Design health passed; this change requires authored Three.js mesh geometry rather than a page template.

| ID | Acceptance | Check |
|---|---|---|
| C25 | All eight models have curved body geometry, circular tires/rims, separate glazing, mirrors and distinct body profiles; traffic and parked/driven cars retain actual geometry and material properties. | Mesh/material tests passed; desktop/mobile gameplay screenshots inspected |
| C26 | Every higher task tier has a higher cruise and boosted speed than every lower tier. Existing task thresholds and unlock records are preserved. | All eight models passed measured cruise/boost distance and tier-order comparisons |
| C27 | Unlock board and car-map entries show model speed beside required tasks; the speedometer reflects movement and stopping. Mobile controls and current fleet saves still work. | 110 career + 18 edge checks, eight-model performance UI checks and compiled smoke/integration passed |

Car-revision validation: 101 game tests passed, 1 optional PostgreSQL check skipped. Desktop/390×844 career: 110 checks; car/recovery edges: 18 checks; eight-model deterministic browser benchmark verified actual cruise/boost travel, strict higher-tier speed ordering, stopped speedometer and board values without console/page errors. An initially obstructed benchmark route was replaced with a clear street direction; production collisions remain in place. Compiled app/static integration and official game-client smoke passed, and desktop/mobile screenshots were inspected. Large existing vendor chunk warning remains; no production, database or formal-exam changes. Visual photorealism and physical-phone performance remain owner acceptance items.

## Running gait and solid vehicle contact
User correction: faster translation must visibly animate arms and legs, and vehicles must not pass through each other. Add an articulated player gait driven by actual distance traveled: opposing arms/legs, bending knees/elbows and moving feet, returning to rest when stationary. Keep run speed, task progression and source questions. Decorative bounce respects reduced motion; essential limb articulation remains visible. Use one shared swept footprint check for player driving, ambient traffic and parked cars, including rotation; passing contact stops movement, while vehicles already overlapping in old drafts can move apart. Guided travel anticipates the whole fleet and car-map destinations use a stopping point outside the parked car.

| ID | Acceptance | Check |
|---|---|---|
| C28 | Moving on foot visibly changes both arms/legs and knee/elbow/foot positions; idle returns to rest; driving hides the runner; keyboard/touch use the same gait. | Pure pose + actual mesh-angle browser checks passed; mobile stride screenshots inspected |
| C29 | Player and ambient cars stop before overlapping parked or moving cars, including crossings, rotations and boosted travel; separation from legacy overlaps is possible. | Swept-contact tests and 11-check compiled contact simulation passed |
| C30 | Car entry/exit, default running, guided destinations, task progress and reload retain their behavior. | 118 desktop/mobile career checks + 18 car/recovery edge checks passed |

Solid-contact guidance routes around parked-vehicle clearance, limits lookahead to the planned stopping point, and stops beside occupied destinations. The HUD prompts the driver to exit and continue on foot; egress favors the current destination. Incoming traffic leaves maneuvering space ahead without blocking adjacent lanes. Car rendering uses the physical collision heading. Test journeys use the real 4.3-unit task interaction radius and pedestrian approaches for walking tasks.

Final local C28–C30 validation: 105 game tests passed, 1 optional PostgreSQL check skipped; compiled desktop/mobile full career 118 checks passed, car/recovery edges 18 passed, and articulated-running/contact simulation 11 passed with no new fleet overlaps across 20 simulated seconds. The official game client passed two compiled-page bursts; screenshots/state inspected with no final browser error artifact. Main-server game integration and diff checks passed. Software-WebGL parallel checks encountered startup/input timeouts; sequential visible-browser reruns passed. No production deployment, real result/email, question edits or database changes. Physical-device acceptance remains open.

## Rolling wheels and steering
All four tires, rims and spokes rotate around their axle as the vehicle covers ground. The front pair also pivots with steering. Stationary cars do not gain wheel rotation from throttle alone. Traffic keeps its scripted routes and animates from actual accepted movement. Manual steering follows a curved path, slows for sharp turns and reverses at a lower speed. Guided routes, speed tiers and swept contact remain the basis for the existing tasks and saved vehicles.

| ID | Acceptance | Check |
|---|---|---|
| C31 | Player and moving traffic wheels roll from displacement, including reverse. Front wheels steer and recenter. Parked cars and blocked wheels stay still. | Wheel mesh tests and compiled collision simulation passed |
| C32 | Manual turns change the car heading progressively. Driving still obeys contact, boundaries and model speeds, and guided tasks remain reachable. | Steering math and 118 desktop/mobile career checks passed |

## Acceleration, braking and coasting
Manual throttle builds speed progressively. Releasing movement input keeps the car rolling in its last travel direction while speed falls to zero. Brake input overrides throttle and stops the car faster. Boost raises the target speed while accelerating, and wheel roll follows actual travel. Guided arrivals and solid contact still stop the car at their existing boundaries.

| ID | Acceptance |
|---|---|
| C33 | Keyboard and touch driving build speed, coast on release, and brake smoothly. |
| C34 | Wheels roll while coasting and stop at contact. Braking prevents acceleration even with throttle held. |

## Driving direction and mobile fit

| ID | Acceptance | Check |
|---|---|---|
| C35 | Keyboard up and down drive forward and reverse relative to the car. Left and right steer. The touch joystick drives in screen directions. | Compiled desktop checks from opposite headings and after a turn, plus mobile touch checks for cardinal and diagonal directions |
| C36 | The joystick, speed indicator, brake, turbo and mission controls fit on touch screens in both orientations. Brake and turbo work while the joystick is held. Releasing input lets the car coast. | Compiled Chromium touch at 320×568, 568×320 and 844×390 |
