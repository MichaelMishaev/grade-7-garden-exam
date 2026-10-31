# PrepX installation

Students can install PrepX from the home-page header and recognize it by the existing app logo. Audience: students using mobile and desktop browsers. Entry: install icon opposite the calendar in the home header. Use the existing green controls, rounded border, Hebrew RTL copy and violet PrepX branding (reference lock: existing header/calendar and branding.css; accessibility: Refero craft-details).

Flow: click install → native browser prompt if available; otherwise a styled, dismissible dialog with platform-specific instructions. Cancellation allows retry when the browser permits. Standalone launch hides the install action. Assumptions: home-page entry is sufficient; installation does not enable offline exams. No changes to questions, grading, submission, authentication or database. No student data enters caches; network failures on navigation show a dedicated offline page. Only that public fallback is cached. Manifest URLs are relative for Railway and GitHub Pages subpaths.

| ID | Acceptance criterion | Verification |
| --- | --- | --- |
| PWA-1 | Manifest defines PrepX, standalone mode, relative start/scope, and valid 192/512 PNG logo icons plus Apple icon. | HTTP and image validation |
| PWA-2 | Header install target is at least 44px and fits at 320/390/1440px, with Hebrew accessible label. | Browser layout and screenshot |
| PWA-3 | Available native prompt is invoked once per event; cancellation/failure recovers; installed state hides button. | Browser simulated platform events; real-device install not run |
| PWA-4 | Fallback dialog shows logo, Hebrew instructions, close control, Escape/backdrop dismissal and returns focus. | Browser keyboard/mobile checks |
| PWA-5 | Worker handles failed navigation with offline screen; API and student content are never cached. | Browser offline/cache inspection and worker test |
| PWA-6 | Existing exam checks remain green. | Repository automated checks; DB availability recorded separately |

Status: specified; implementation and checks pending. Production deployment requires explicit permission under repository instructions.

## Verification — 2026-10-31

Implemented locally on `codex/pwa-install` in the isolated `examsPractice-pwa` worktree. Not deployed.

- PWA-1 PASS: manifest HTTP MIME/cache headers, 192/512 PNG dimensions, browser manifest parsing; Apple PNG 180px.
- PWA-2 PASS: browser layout at 320, 375, 390, 768, 1024 and 1440px; 48px button, no header overlap or page overflow. Screenshots: `output/playwright/install-header-mobile.png`, `install-help-mobile.png` (local artifacts).
- PWA-3 PASS for simulated prompt cancellation, prompt exception recovery, appinstalled event and standalone launch; actual OS installation NOT TESTED. Chromium's installability report lists only `in-incognito`, because the automation uses an isolated context.
- PWA-4 PASS: rendered Hebrew modal, logo, close button, Escape dismissal, focus restoration and iPhone user-agent instruction branch. Physical iPhone/Safari and screen reader NOT TESTED.
- PWA-5 PASS: worker controls page after reload, offline navigation shows fallback, retry returns to requested subject; CacheStorage holds only offline.html. Regression test verifies API/non-navigation bypass and subpath fallback resolution.
- PWA-6 PASS: existing suite 117/117 with local Postgres, e2e 8/8, new PWA regressions 2/2. Local migrate/seed/verify succeeded, with no content changes. Runtime Node 26.3.0 differs from declared Node 24.x.

UX checklist scope: install header and guidance dialog. UX-02/04/08/09/10/12/24/25/33/37/38/39/40/41/42 PASS for discoverable labeled action, retry/dismissal, focus restoration, Hebrew RTL, 48px targets and responsive fit. UX-34 screen-reader/device behavior NOT TESTED. Student forms, permissions, account/session flows, destructive actions and question/reference spot checks N/A: none changed. Full exam browser submission regression NOT RUN: automated exam/API/e2e regressions passed; no exam logic changed. Production/provider delivery NOT RUN: no production action was authorized. Baseline browser 404s for favicon.ico and optional `/api/subjects/physics` with DB API off remain out of scope.

Install behavior follows browser-owned native prompt availability: https://web.dev/learn/pwa/installation-prompt . The app-owned fallback explains installation rather than claiming it succeeded.
