# MAZE-002 logical plan review

Scope: review of the specification for soft locks, resource dead ends, duplicate progress and recovery races. This is a documentation/logic review, not implementation QA or proof of student engagement. User explicitly requested two or three local GLM critics.

## Review provenance

Only `/Users/michaelmishayev/.codex/skills/glm/scripts/glm-run` was used, backed by the configured local ZCode/Z.ai helper. No OpenRouter or substitute provider. Prompts contained the spec or a bounded self-contained progression summary, no student data or secrets. Reviewers had no tools or mutation permissions.

- Initial progression/economy/recovery calls: each stopped at180 seconds with no output. No critique credit given.
- Short recovery retry: completed at117.6 seconds, exit0, four concrete findings. Its prompt was the earlier compact model; owner changes already in draft0.1.1 were considered when triaging it.
- Short progression/economy retries: stopped at120 seconds with no output. Final compact economy retry completed at121.7 seconds, exit0; final progression retry stopped at180 seconds with no output and is not counted as a critique.
- Local raw outputs/status metadata are under `output/maze/arcade-plan-review/` and remain untracked. The ledger below records the durable conclusions without presenting timeouts as reviews.

## Recovery critic: owner dispositions

| Finding | Owner assessment | Resolution in spec / acceptance criteria |
|---|---|---|
| R1: clearing held input does not reject an OS-delayed touch/click after resume | Accepted as an input-identity ambiguity. The critic used jump/dodge examples; the same risk applies to the actual joystick, question and crystal-shot controls. | Per-phase/resume input generations; pointer/key begin must occur after that phase is visibly ready. ARCADE-13/19. |
| R2: slow-motion activation and clock domain undefined | Valid for the summarized earlier plan; mostly resolved by owner draft0.1.1. The suggested scaled duration/cancel-on-death rule would change the intended five active seconds and erase a purchased effect, so that prescription is not adopted. | Explicit activation; five **unscaled** hazard-active seconds, all hazard/exposure clocks scaled consistently, remaining duration frozen through reading/pause/recovery and retained across stages. ARCADE-11. |
| R3: fatal damage and window expiry can schedule competing boss restarts | Accepted; a safe-telegraph promise alone does not establish event priority or preserve same-step accepted hits. | One-step transaction: validate in-window action; third accepted hit wins; otherwise retain nonfinal accepted hit, then checkpoint return supersedes expiry and issues one fresh window. ARCADE-08/18. |
| R4: partial answer/crystal save and undefined repair target when all stages complete but boss partly beaten | Accepted in part. Atomic first-answer/stage/crystal records were already required by draft0.1.1. Valid partial-boss repair needs an explicit target. The suggestion to infer an academic answer/credit from gifts or checkpoints is rejected as unsafe fabrication. | One snapshot key for each transaction; explicit valid-boss resume for0/1/2 hits; corrupt inconsistent records preserve raw data and require recovery choice without invented answers/credits. ARCADE-03/08/14. |

## Economy critic: owner dispositions

| Finding | Owner assessment | Resolution in spec / acceptance criteria |
|---|---|---|
| E1: last boss hit could commit victory before pending gift settlement | The compact review summary left their shared transaction implicit; the full draft already required atomic victory settlement. Accepted as a worthwhile boundary clarification, not proof of a contradiction in the full spec. | One explicitly enumerated final-hit snapshot includes hit/spend, shield removal, victory, every pending gift claim/credit and the bonus marker/credit. A won-but-unsettled valid state is forbidden. ARCADE-09/10/18. |
| E2: preserving purchases could resurrect an already-used shield after checkpoint restore | Accepted. Saving consumption alone does not say it commits with the damage that was prevented or which inventory a checkpoint restores. | Shield consumption, prevented-damage outcome and collision grace are one snapshot; return restores latest committed resource state, never old checkpoint flags. ARCADE-04/11/14. |
| Explicit pass: boss crystal starvation and within-tab duplicate diamond claims | Consistent with owner invariant. Three crystal awards fund exactly three unique hits; damage/misses/purchases cannot reduce that supply. Claims and debits are idempotent. | Retain ARCADE-03/07/08/09/10/12 as required future runtime checks, without calling this model critique product QA. |
| Per-tab copies can carry separate fictional inventories | Expected by the existing per-tab local game boundary; no shared account wallet, transfers or real money are offered. This is not an integrity claim across devices/tabs. | Keep the per-tab scope explicit. Any future account-wide or transferable economy needs a separate server-backed specification. |

## Owner invariants checked

- With three proven stage records and `h` accepted unique boss hits, `h ∈ {0,1,2,3}`, available boss crystals = `3 − h` and remaining shield segments = `3 − h`. Gifts, diamonds, boost purchases, damage and retries cannot change that equation. At `h=3`, the phase is victory.
- No correct-answer, gift-claim, diamond or boost purchase is required to open the boss gate or defeat it. No-purchase/all-wrong completion remains a required test.
- Missed exposures and damage count toward persistent assistance. Assist offers a reachable hazard-free bridge and a safe weak point that remains open, so the spec does not require an endless timed retry loop. Deliberately idle players are not auto-completed.
- State, timers and input must use the same phase/transaction boundaries. A runtime test must still prove this after implementation.

## Additional owner finding

O1: the draft jumped from final feedback directly into active boss combat while the shop was allowed only in safe staging. That left the third stage's reward unusable for an optional pre-boss purchase and made “start when ready” implicit. Resolved by explicit staging-1/2/3 and boss-ready states, paused hazards/boost clocks, explicit Start actions and purchase guards limited to those states. A checkpoint return during an active obstacle does not unlock the shop. ARCADE-02/06/11/13 cover this in the implementation plan.

Documentation status: two requested local GLM critics produced usable reviews (recovery and economy). The third role timed out on every bounded attempt and was not counted. All identified actionable ambiguities have dispositions and corrections in spec0.2.0; no identified plan blocker remains. This is owner-checked specification logic only, not runtime or physical-device QA. No implementation or deployment is authorized by this review record.
