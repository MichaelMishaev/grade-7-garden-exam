# Maze next-step clarity

Teenage players who collect all three seals currently see only a generic interaction button and a vague gate instruction. The existing boss is in the separate bridge arcade mode.

Show a persistent short next-step panel after all traps are resolved, with one action to walk to the exit. Always illuminate the exit route at this stage without requiring a compass purchase. The normal interaction button also guides to the exit, taking precedence over nearby animals. Once complete, promote the existing bridge/boss mode as the next challenge and carry the current subject via its quiz ID. Retain home, review and new-subject actions. Do not alter academic answers, rewards or existing save formats. Resume uses the same derived UI after refresh; navigation uses the existing collision-safe movement path. No automatic navigation to another mode.

## Acceptance criteria
- NS-1: A resumed or newly completed three-seal exploration shows the exit objective and a visible route without a purchased upgrade. Test with saved-state fixture and refresh.
- NS-2: The primary guidance action starts collision-safe travel to the exit; manual movement can interrupt it. Test browser action and movement state.
- NS-3: The finish screen prominently links to the bridge/boss mode with the current quiz ID, explains three bridges then the boss, and retains home/review/new-subject options. Test browser DOM and navigation.
- NS-4: Before all traps are complete the guidance panel is hidden and existing interaction remains. Test fresh mobile view.
- NS-5: Mobile has no horizontal overflow; guidance and next scenario remain keyboard accessible; refresh preserves answers and rewards. Test 390px browser and snapshot equality.

## Visible action cues

Show a compact three-step trail (traps → gate → boss) throughout the maze. Text and check marks distinguish current, completed and future stages without relying on color. Show a contextual action badge above the primary control: walk to next trap when exploring, interact with an available person/animal, enter an adjacent unresolved trap, stop guided walking, or head to the unlocked exit. Guidance is an explicit click and may be interrupted with movement. The compass retains automatic trap-route display; requested walking displays its route temporarily. Render exit breadcrumbs without a purchase requirement.

- NS-6: A fresh run marks traps current, labels exit/boss as later, and offers a useful next-trap action rather than a generic no-op. Browser check.
- NS-7: Walking guidance shows a visible route and stop action. Stop/manual movement interrupt guidance; nearby entity labels retain their actions. Browser check.
- NS-8: Exit breadcrumbs render without a compass, and completed steps use text/checks with the current step exposed to accessibility tools. Mobile visual and DOM check.
