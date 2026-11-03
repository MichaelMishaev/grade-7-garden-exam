# Else-if explanation lesson

## Scope and audience
Michael requested a new else-if section with animation, an interactive playground,
English/Hebrew switching and fresh agents. Add a second Computer Science discovery
lesson alongside if/else. Grade7 beginners; follow the existing designed decision board
and short-copy pattern. Python spelling is `elif`; clearly connect it to “else if”.
Unscored local learning, not an exam; no identity, database, submission or deployment.

## Default teaching model
Use a score0–100, first threshold80, second threshold60. Check `score >=80` first,
then `elif score >=60` only if firstFalse, otherwise else. Outputs “Great work!”,
“You passed!”, “Keep practicing!”; an unindented “Next lesson” follows every outcome.
The conditions overlap on purpose:90 satisfies both comparisons, but only if runs.
Expose score slider/number and3 presets; keep threshold edits in collapsed rule help.
Reject empty/fractional/out-of-range values and invalid threshold order (second<=first
is allowed, equality makes middle branch unreachable and must be explained or rejected;
implementation default: require second<first). No arbitrary code evaluation.

## Experience and behavior
Designed board shows sequential checks and3 possible branches, with exactly one
selected. Distinguish False from “not checked” and selected from executed.3seconds per
animation step; variable path length:input → first check → optional second check →
chosen branch → continuation. Play/pause/step/reset; edits cancel pending work.
Python code is secondary. English/Hebrew instruction control preserves values and
position; lang query carries from discovery and back. New lesson questions also have
English/Hebrew copy, immediate answer/rationale, locking, retry, Back/Continue/completion.
No persistence beyond URL language. Refresh resets interactive values.

## Reference lock
Existing PrepX if/else lesson, approved robot asset and previously inspected Mobbin
Duolingo focused-task/feedback patterns own the design. No new visual system or library.
Green for first branch, blue for second, neutral/amber third; else is valid, not an error.
Keyboard controls,44px targets, mobile390×844 and desktop1280×900, reduced motion.

## Acceptance checks (not run before implementation)
- EI01: discovery has2 distinct lessons; language picker updates both links and copy.
- EI02: scores59/60/79/80/90 choose else/elif/elif/if/if with correct output.
- EI03: at90 the second condition is marked not checked; only the first branch runs.
- EI04: trace conditionally includes second check; pacing/pause/step/reset/cancel work.
- EI05: English/Hebrew switch preserves state, code stays valid Python/LTR.
- EI06: empty/out-of-range/fractional values and invalid thresholds clear stale results;
  recovery resumes; no timer after leaving the playground or hiding the page.
- EI07:5 checks have correct answer/source/rationale, immediate feedback, lock/retry,
  Back/Continue and completion in both languages; switching language retains answers.
- EI08: mobile/desktop render without page overflow or overlapping play controls;
  original if/else, discovery, calendar and PWA focused checks stay green.

Tests: pure model/trace boundary and first-match tests; isolated real-browser flow with
email/API blocked; independent fresh-agent content and visual QA. Deployment not yet
requested for this addition.

## Implementation and verification
Built by a fresh implementation agent, reviewed by a separate fresh content agent and
independently checked by a fresh QA agent. New else-if.html/js/css plus pure and browser
tests; discovery now lists both lessons and preserves language on either link. Existing
if/else behavior retained. Retry focus error found by independent QA was corrected and
covered with a regression. Mobile decorative icons were removed and board spacing
reduced to keep the continuation node clear of the playback dock. All behavioral checks
passed, including first-match semantics, variable trace length, language/state, boundary
values, invalid recovery, bilingual questions, retry/back/completion and reduced motion.
Desktop1280×900 and mobile390×844 inspected. No data/API/provider calls.

User subsequently authorized push together with the PWA app-share feature. Full release
regression and production verification are recorded at release time.

Release checks2026-11-03: full suite333 total,325passed,8skipped,zero failures
(57.5seconds). Followup focused discovery/else-if/app-share browser checks also passed.
Eight skips are environment-dependent database/private-rubric checks; no destructive
DB checks, real provider requests or real OS share sends were run. Userauthorizedpush.
