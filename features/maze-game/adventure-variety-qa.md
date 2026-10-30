# Maze variety and interaction QA — 2026-10-30

Scope: local compiled maze, Hebrew RTL, anonymous player, Chromium mobile emulation. No changes to formal exams, teacher email, database or Afterbell. Three fresh agents implemented/tested feedback input safety, rabbit friendship and the illustrated completion. Root independently checked compiled feedback/rabbit flows and inspected the screenshots. Physical phone/Safari and human enjoyment are NOT TESTED.

## Fixed findings

| Finding | Fix | Evidence |
| --- | --- | --- |
| Saved subject selection was locked with no new-run path | Visible subject picker on intro, pause and completion; verified archive before switching; resume a subject's saved run | `adventures-browser.mjs`: Hebrew→physics→Hebrew, quota-failure and delayed-navigation cases |
| Same routes on every run | Three connected route networks and stone palettes; stable layout per run | `layouts-gifts.test.mjs`: every cell/landmark/patrol reachable; three actual touch-movement expeditions |
| Trap completion lacked a reward moment | Animated crystal/key/star keepsake; hazards freeze; no score/coin changes; persisted collection | Pending/collected-gift reload checks; reduced-motion screenshot |
| Timed Continue disappeared under a late tap | No competing Continue during automatic ordinary feedback; explicit reading mode has a stable continuation; incoming answers require a fresh pointer press | Fresh-agent test independently rerun on compiled game: 12 checks, including held finger, compatibility click and held Enter |
| Rabbit approach silently changed only an internal flag | Opens a dialog, explicit carrot feeding, saved following along adjacent walkable tiles | Compiled rabbit mobile test: 23 checks, no page errors/writes; world/rabbit unit coverage |
| Completion Home link was visually weak and finish screen had no picture | Three original bundled illustrations, prominent Home action, new-adventure/review actions, stable saved art | Compiled completion UI fixtures: 37 checks; actual game checks in `adventures-browser.mjs` |

## UX checklist

| IDs | Status | Evidence or limit |
| --- | --- | --- |
| UX-01 | NOT TESTED | Browser Back/Forward pair not rerun for this delivery; in-app cancel, subject return and reload are covered separately. |
| UX-02, UX-04, UX-08, UX-10, UX-11, UX-12 | PASS | Visible return/new-adventure actions, named subject, progress, cosmetic gift/result meaning and explicit rabbit feeding. |
| UX-05 | PASS | Active run archived/verified before replacement; failed archive keeps original record; gifts, answers, resources, layout and companion restore. Per-tab lifetime is stated. |
| UX-07 | PASS | Reload/capture/pause restoration tested; real OS background/phone-lock behavior NOT TESTED. |
| UX-09, UX-13, UX-21, UX-22, UX-23, UX-43 | PASS | Retry message after storage failure; existing playable content fallback retained; one original coin payout and one cosmetic collection; rabbit gives visible feedback. |
| UX-27, UX-28, UX-29, UX-32 | PASS | New run/return to archived subject, native seven-option labelled selector; optional explanation and cage tools. |
| UX-34 | PASS | Timed transition has no competing Continue action; stale touch release cannot submit a new question; saved-state switch blocks retiring-page autosaves. |
| UX-35, UX-39 | PASS | Emulated mobile touch play, buttons >=44px, movement and rabbit following; physical device NOT TESTED. |
| UX-36, UX-37 | PASS | Hebrew RTL, native dialog, labelled selector/artwork, visible focus, keyboard Enter/Escape and reduced-motion equivalents. Screen-reader device testing NOT TESTED. |
| UX-38, UX-40, UX-41, UX-42, UX-44 | PASS | Completion fixtures at 320/375/768/1024/1440 and 844x390 landscape; no horizontal overflow; Home/final action reachable. Final-note clearance 14.53–19px. Screenshots inspected. Existing question/entry responsive checks cover the same widths. |
| UX-03, UX-06, UX-14–20, UX-24–26, UX-30–31, UX-33 | N/A | No login, list filters, editable data form, destructive workflow, bulk operation or remote search added. Original submitted quiz answers remain locked. |

Evidence: ignored `output/maze/adventures/`, `output/maze/feedback-tap/`, `output/maze/rabbit/`, `output/maze/completion/`; local logs `/tmp/maze-*.log`. Completion UI fixture tests explicitly identify their synthetic setup; gameplay rotation is a separate real-expedition check. No production deployment performed for this delivery.

Final run totals: game units99 passed; actual mobile adventure62 checks; compiled feedback12, rabbit23, completion fixture37 checks, all passed. Shared web-game client start+movement screenshot/state inspected. Broader project tests286 passed/8 DB-dependent skipped.

Extended-suite limit: original browser suite passed73 checks (including all-wrong/two captures and all-correct completion) then timed out waiting for a second tab to become ready. Isolated foreground two-tab probe passed: both tabs enabled Start, phase explore, WebGL healthy, no errors. Added foregrounding to that broad harness, but did not rerun its entire compatibility tail; the full extended suite is NOT marked PASS. This is a recorded verification limit, not a reproduced product failure. No production deployment was performed.
