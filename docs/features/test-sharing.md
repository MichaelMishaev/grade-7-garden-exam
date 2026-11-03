# Share tests

Students and parents can share any exam or practice quiz from its subject page.
Default: share the specific test's existing public URL on the current host (including
GitHub Pages' subdirectory), never the subject URL, draft, name, answers or score.

Flow: a secondary Hebrew button beside each test opens the native share sheet.
Without native sharing, or on a non-cancellation error, copy the URL. If clipboard
access fails, show a labelled, selectable URL for manual copying. Cancellation is
silent; the button is enabled again after every outcome. No persisted state,
server/API, question, grading or submission changes.

Design lock: existing subject-page green primary actions and white quiz cards;
sharing uses a secondary bordered button. Preserve RTL, 44px targets, keyboard
focus, and an announced inline status (Refero craft-details accessibility guidance).
No new animation or imagery.

| ID | Observable acceptance criterion | Verification |
| --- | --- | --- |
| SH-1 | Every rendered exam and quiz on Hebrew, physics and English pages has one separately operable share button; starting the test still works. | Mobile browser check |
| SH-2 | Native share receives the test title and its exact public URL, including quiz identity and host subdirectory. No student data is included. | Mock native share in browser |
| SH-3 | No native API or native failure copies the URL and announces Hebrew success; cancellation is silent. | Mock API outcomes in browser |
| SH-4 | Clipboard denial exposes a labelled readonly URL, selected for copying; retry works. | Mock clipboard rejection in browser |
| SH-5 | At 390×844 controls are at least 44px, there is no horizontal overflow, keyboard focus is visible and feedback is announced. | Browser geometry and screenshot |

Status: implemented. SH-1 through SH-5 pass in `share-test.browser.test.mjs`
(2 tests covering all 11 entries and the API-disabled fallback), plus a reviewed
390×844 screenshot. The existing suite passed 307 tests with 8 database-dependent
skips; full-stack e2e skipped 10 tests without its database flag. Additive migration,
seed and verification passed on a newly created, isolated local database. Tests
that reset schemas were not enabled; no existing database was reset or changed.
Native sharing was mocked; physical-device share sheets were not exercised.

## In-test sharing extension

The same control appears below the header inside all four exam pages and the
practice page, outside the changing question/result screens, so it remains
available throughout an attempt. It shares a fresh test URL: preserve only the
`quiz` selector for practice, discard other query parameters and fragments.
Title is read when sharing, after asynchronous quiz content has loaded.

| ID | Observable acceptance criterion | Verification |
| --- | --- | --- |
| SH-6 | All 11 test URLs show a share button inside the test; the button stays visible during questions and results. | Focused mobile browser test |
| SH-7 | In-test sharing contains only the exam path or practice path plus quiz id, and no draft, name, source or fragment. | Mock share on every test URL |
| SH-8 | Copy/manual fallbacks work inside tests and do not change stored attempts or submit answers. | Focused browser test |

Extension verification: SH-6–SH-8 pass in the expanded sharing browser suite
(4 tests total). Full automated run: 311 passed, 8 database-dependent skips;
full-stack e2e: 10 database-dependent skips. Reviewed exam and practice screenshots
at 390×844; isolated local migration/seed/verify passed with zero content changes.
