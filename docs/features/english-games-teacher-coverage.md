# English game coverage — teacher links

Requested 2026-11-03: recheck every link in the teacher's document and expand the games to cover the accessible material. The original ENG-001 exam and existing 13-question game bank remain unchanged.

## Scope and acceptance

- Inventory all 11 exercise links from the teacher document, including the nested grammar links.
- Add one selectable game bank per readable exercise (10 banks). Keep each round at 30 questions or fewer; preserve source item order/IDs in the fixture, while gameplay shuffles questions/choices.
- Cover every verified word pair, sorting item, or question from those sources. Multiple-choice originals retain prompt, options and answer key; matching, sorting and fill-in activities receive a documented single-choice adapter. Source images remain linked, with an explicit affirmative/negative instruction where the original image supplied context.
- Every new question has Hebrew and English explanations and a source reference registered on the English subject page. Show contextual instructions and source images in all four games, including after reload.
- Exclude and report three erroneous source items: p20 pepper → להכין, salt → מלך; sorting item tierd. Do not silently correct or teach them.
- Oxford Questions 2 is unavailable (forbidden response in a browser). Keep its link and report the gap. Class reading passages, textbook pages and writing exercises are not included in the supplied document, so full exam-material coverage cannot be claimed.
- Preserve all existing game banks, result identities and progress; no changes to exam questions, grading, email or student data.
- Verify fixture-to-game identity/coverage, references, scoring, all selectors and mobile rendering. Run existing game tests, required repository/DB checks that are non-destructive, builds and focused browser playthroughs. Do not reset any database schema to run an e2e test.

## Source lock

`games/english-teacher-sources.json` records the ten readable sources, their item data and answer keys, explicit exclusions, the blocked Oxford URL, and missing classroom/book material. Captured 2026-11-03 from the public teacher links and their public activity models. It contains no student data or credentials.

## Link-by-link result

| Teacher link | Checked result | Added game items |
| --- | --- | ---: |
| [Vocabulary p12](https://wordwall.net/he/resource/36327179) | 25 word pairs verified | 25 |
| [Vocabulary p20](https://wordwall.net/he/resource/36327199) | 27 pairs; two incorrect translations excluded | 25 |
| [Vocabulary p28](https://wordwall.net/he/resource/36327212) | 17 word pairs verified | 17 |
| [Parts of Speech sorting](https://wordwall.net/he/resource/10462641) | 30 sorting items; misspelled `tierd` excluded | 29 |
| [Parts of Speech Quiz](https://wordwall.net/he/resource/95521835) | 10 original prompts/options/keys | 10 |
| [Affirmative 1](https://www.english-room.com/grammar/presentsimpletense_affirmative_1.htm) | Browser and original answer arrays read; all 15 gaps | 15 |
| [Affirmative 2](https://www.english-4u.de/en/tenses-exercises/present-simple.htm) | Original exercise text and all 15 answers read | 15 |
| [Negative 1](https://wordwall.net/resource/8818577) | 9 prompts/options/keys; original image URLs retained | 9 |
| [Negative 2](https://wordwall.net/resource/30802053) | 12 prompts/options/keys; original image URLs retained | 12 |
| [Questions 1](https://agendaweb.org/exercises/verbs/do-does.htm) | All 12 original do/does questions and answers read | 12 |
| [Questions 2 — Oxford](https://elt.oup.com/student/solutions/elementary/grammar/grammar_01_022e?cc=global&selLanguage=en) | Forbidden browser response; no exercise content available | 0 |

169 new items, across ten banks. Together with the unchanged 13-item exam selection, English has 182 game items across eleven selectable sets. All 62 Hebrew/physics game questions remain unchanged. These are game practice sets, not additional teacher-submitted exams.

Matching and sorting activities are adapted to one-choice questions using the original word/category pairs. Fill-in activities keep the original sentences and answer keys and add grammatical distractors. The two negative activities retain their original prompt/options/key/images, with a separate affirmative/negative context line to keep the task unambiguous if an external image does not load. Original spelling in other verbatim prompts and choices is retained.

The referenced images use the teacher activity's public image URLs and require a network connection. All answer text, context and explanations are bundled for fallback use. None of the source requests send student names or answers.

## Verification before publication

- Game unit/service/content tests: 205 passed, 1 Postgres-dependent skipped. Covers every source item, exact choice prompts/options/keys, exclusions, subject reference registration, all-bank grading/saves and pinned context/images.
- Repository tests: 309 passed, 8 environment-dependent skipped. Additive local migration/seed/verification passed; 8 reference rows inserted, no question or student rows changed. Database-reset integration/e2e suites were not rerun because project instructions require explicit per-action authorization for destructive SQL; the previously observed private-rubric AI-retry failure is unrelated.
- Browser: all 40 combinations (10 new banks × City/campus/Maze/Arcade) passed at 390×844. City checks include the actual question, source image/context, first-answer lock, Hebrew/English feedback and reload recovery. All twenty original source-image URLs returned HTTP 200.
- A separate Maze touch-navigation test reached an actual negative question with its source image, scored/locked a correct answer and restored it after reload. Arcade's existing 50-check suite passed using the new Negative 1 bank. All test writes were intercepted; no real emails or student records.
- Six independent source spot checks passed (journey, meal, eats, am, doesn't play, Does). Visually inspected source images and question layout in City and Maze, plus the standard game-skill client's Arcade screenshot/state. Both builds and source whitespace checks passed; generated Three.js shader strings retain upstream trailing whitespace, and existing large-chunk warnings remain.
