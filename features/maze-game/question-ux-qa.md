# Maze question and encounter UX verification — 2026-10-30

Scope: anonymous student, Hebrew RTL, approach residents/animals → enter trap → read essential context → answer → optionally read explanation → continue/capture/reload. Three fresh agents handled content, trap presentation and proximity reactions; root reviewed and tested their integration. No canonical exam, question bank, score, API or database change.

## Findings and fixes

| ID | Impact | Finding | Fix and evidence |
| --- | --- | --- | --- |
| Q01 | Medium | All11 pole questions assume the original apparatus/method; shuffled numerical tasks omit the45° condition. | Reviewed rendered PDF pages5–6; short visible setup per question, including angle/level ground/data where needed. No angle or ground-condition answer printed on the items asking for it. See complete62-question audit and presentation tests. |
| Q02 | Medium | Generic worksheet references and repeated game instructions obscure the actual question. |29 display adaptations,33 standalone items unchanged; essential context before answers; optional source/tools/explanation disclosures. Canonical academic data remains identical. Mobile screenshots show concise fact classification and complete pole setup. |
| U01 | Medium | Entering a trap jumps immediately to a question without a clear event. | New browser regression first failed against the previous build. Skippable900ms gate/bars/camera closure now changes actual canvas pixels; pause freezes it, reduced motion skips it, reload and next question cannot strand/replay it. |
| U02 | Medium | Nearby people/animals wait silently for the action button. | All five living entities acknowledge approach without a modal; human wave/facing and animal reactions. Real-control browser observations cover every speaker, no lingering spam, pause/resume and unchanged resources. |
| U03 | Medium | A following animal could consume the nearby keeper's greeting opportunity. | Fresh-agent controller initially dropped the second eligible speaker. Root review caught it; pending nearby speakers remain eligible. Dedicated competing-speaker regression passes. |

## Scoped checklist coverage

| Checklist | Status | Evidence |
| --- | --- | --- |
| UX-02, UX-07, UX-09 | PASS | Question/context/answers first; concrete labels; sources and tools secondary; entry clearly names trap activation. |
| UX-10, UX-11 | PASS | Reload retains first answers/coins/world discoveries; all62 questions audited against their source; changed live variants cannot receive stale context. |
| UX-21, UX-22 | PASS | Visible gate/rewards/greetings; immutable first answers; duplicate-input and reload regressions remain green. |
| UX-32 | PASS | Optional details collapsed; opening feedback explanation pauses automatic progression; essential setup never collapsed. |
| UX-35 | PASS in browser emulation |390×844 and844×390 touch flows, pause/capture/recovery/reload, both overlapping-finger release orders. Physical phone validation remains BLOCKED without device access. |
| UX-36 | PASS for tested controls | Keyboard source disclosure, native dialog focus, visible focus styles, polite atomic greeting status and textual verdicts. Manual screen-reader/device evaluation untested. |
| UX-37, UX-40 | PASS | Hebrew RTL screenshots; numeric/pole context; long options and mixed units; no essential text truncation. |
| UX-38, UX-39 | PASS | Scrollable question sheet; reachable last answer and exit;44px controls/disclosure targets; no hover dependence. |
| UX-41 | PASS |320/375/768/1024/1440px checks: no document or sheet horizontal overflow. |
| UX-42 | PASS | Product-styled entry/question/feedback/world dialogs; native semantic disclosures; skip/pause/continue paths tested. |
| UX-44 | PASS for question flow | Scroll-end geometry recorded for each width in trap-ux/report.json. Final action stays within viewport with bounded bottom clearance. Entry intentionally keeps its skip button near the thumb during the brief900ms scene. |

Verification:87 unit/content/world/movement/presentation/greeting checks; full gameplay, cage save/migration, adversarial cage/mobile-touch, world and trap-UX browser scripts. Repository286 passed/8 database-dependent skipped. Exact browser totals/build and release evidence are recorded in the feature record and ignored output reports. All browser reports have zero application errors and zero POSTs. Standard web-game client reached the scout using real keys; image/state inspected. Its sole console404 is the expected disabled local `/api/quizzes/facts`; bundled fallback remains usable.

Fresh source/live parity check: all seven current public quiz APIs match the reviewed canonical prompts/options/answers;29 adaptations apply. Root also inspected PDF pages5–6 and garden/source tasks. This is scoped functional/design evidence, not a claim of complete accessibility or physical-device performance certification. No GLM review was requested or claimed for this revision.
