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

C19. A moving player van contacting a walking resident causes one short hop, small knockback and recovery. The landing remains within the city and clear of solid buildings. Sustained overlap does not retrigger the reaction. Auto-drive yields to residents. A stationary van and a walking hero do not cause knockback. Reduced motion keeps the short displacement and recovery without the hop or tumble.

C20. Scene visits offer an urgent guided drive that accelerates on clear streets, passes a slower car only when the road and opposing traffic allow it, and takes an early detour if blocked. Manual input or cancelling directions ends urgent mode. The van slows for pedestrians and arriving at the scene ends the rush.
C21. Dispatch and on-scene captions name the responding crew, explain the current visible action and say what happens next. Firefighting, towing, police separation and alternating traffic have distinct movement cues matching the phase.

## Field expeditions in the expanded bay
Students can explore connected western and northern districts from the existing city entry point. A Hebrew RTL field journal offers six optional assignments for the selected subject. A student accepts one, travels or rides the tram, works with the station's materials, retries with feedback, and stamps the journal. Field practice is separate from graded shift answers. The current assignment and stamps use the existing session draft. Old drafts start with an empty journal.
- EXP-1. Bounds cover at least four times the former area. Six signed stations join the same streets and map. Check geometry and routes.
- EXP-2. Each subject offers six contextual activities across at least four interaction formats. Check subject switch, errors, retries and completion.
- EXP-3. Accepting, abandoning and resuming preserve shift progress. A finished activity has one stamp per shift. Check mobile browser, reload and keyboard controls.

## Physical street interactions
Driving students should see contact rather than clipping. Loose benches, bins, crates and cones are pushed with a short tumble and friction; buildings, trunks, poles and parked vehicles remain solid. Building hits stop the van and shed cosmetic bumper/panel parts. Damage is visual for the current play session, resets on starting or resuming a shift, and never changes rewards or academic results. Reduced motion suppresses tumbling. No structural building destruction is assumed.
C22. The van footprint cannot cross fixed scenery, including at diagonal angles or maximum speed. Test oriented contact and a browser wall approach.
C23. Loose street objects move on impact, settle outside fixed walls, and remain collidable at their new position. Test push, blocked push, settling and a browser collision.
C24. A building contact sheds a visible car part once per contact, with bounded debris and a Hebrew cue. Repeated contact cannot emit unlimited parts. Pause freezes physics; a new shift repairs the van. Verify browser state and screenshot.
