---
name: clear-hebrew-questions
description: Project-local PrepX skill for writing, adapting, or clarifying Hebrew exam and practice questions for students aged 12–13, including questions based on examples and requests for similar questions. Preserve exact originals when reproduction is requested.
---

# Clear Hebrew Questions

Scope: this PrepX repository and its worktrees only. Do not install or apply this skill globally or to unrelated projects.

Create questions that a 12–13-year-old can understand without an adult translating the instructions. A student who knows the subject should recognize what to do. The challenge should come from the learning goal, not unnecessarily difficult Hebrew or confusing formatting.

Use Hebrew for student-facing content. Follow the user's communication-language preference for discussion around the work. Default to ages 12–13 unless another audience is specified. Use respectful, natural language without baby talk.

## Understand the request and example

- **Exact copy / same questions:** when the user clearly requests reproduction, preserve the original tasks, options, figures, and wording. Do not silently simplify a teacher's original. Flag confusing wording separately for the user; provide an adapted version only as a separate version when requested. Follow project requirements for verbatim copying.
- **Similar questions / questions like this:** identify the topic, skill, question type, reasoning steps, and difficulty. Create new questions preserving those features while improving wording. Do not copy confusing phrasing or accidentally add a new concept, harder arithmetic, or extra steps.
- **Clarify existing questions:** simplify wording and layout while preserving facts, conditions, meaning, and the correct answer. Solve again after editing.
- **New questions from study material:** use the supplied material and learning goals. Do not introduce knowledge students have not been given unless the task explicitly requires it.

Infer the mode where possible. If “the same” could mean exact reproduction or new variants and the difference matters, ask one concise clarification before writing the dependent content. If essential information or an attachment is unreadable, request the missing part instead of inventing it.

Use samples to calibrate difficulty and format. Without a sample, proceed when the topic is clear, using age-appropriate defaults. Do not require an exam date or a full exam workflow for a few question drafts.

## Write understandable Hebrew

- Use short, direct sentences and familiar words. Prefer “מה ההבדל בין…” over “עמדו על ההבחנה בין…”, and “לפי הקטע” over “בהסתמך על האמור לעיל”.
- State the context first, then ask the question. Include or make accessible the passage, table, picture, and data students need. Never refer to an absent “story”, “diagram”, or “text above”.
- Ask one clear task at a time. Split multi-part tasks into א, ב, ג with explicit instructions for each.
- Use precise verbs: חשבו, בחרו, כתבו, הסבירו, השוו. Replace vague “התייחסו” or “דונו” with the actual expected action. For a comparison, say which feature to compare; for an explanation, say what needs explaining.
- Specify how much to provide when it matters: “כתבו שתי סיבות” or “כתבו דוגמה אחת”. Keep response length proportionate to the task.
- Avoid double negatives, trick wording, unnecessary passive voice, nested clauses, and ambiguous pronouns. Repeat the noun if “הוא”, “זה”, or “שלהם” could refer to several things.
- Prefer positive questions. If a negative is necessary, make **לא** clear and ensure only one intended interpretation.
- Keep essential subject terms. Briefly explain unfamiliar vocabulary only when its meaning is not being tested. Do not reveal the answer by defining the concept being assessed.
- Use consistent names, terms, numbers, and units. Supply necessary conditions explicitly. Do not require guessing an unstated assumption or decoding an unfamiliar real-world situation.
- In reading and Hebrew exercises, preserve the passage and language features being assessed. Simplify instructions without removing the learning goal or giving away the answer.
- Keep hints separate and include them only when requested or appropriate to the exercise. Clear instructions must not become a worked solution.

## Keep formatting easy to scan

Default to numbered questions with a blank line between them. Put a short context or data block before the task. Put each answer choice on its own line, labeled א, ב, ג, ד. Use only as many choices as the requested format needs.

For calculations, separate data from the task when useful, state the required answer unit, and say whether working is required. Keep equations and mixed Hebrew/Latin notation readable; in HTML, use Hebrew RTL and isolate formulas or Latin expressions with LTR direction.

Avoid dense paragraphs, decorative clutter, and tables used only to arrange questions. Use a table when reading a table is part of the task. Do not turn a request for a few questions into a full exam.

Unless the user asks otherwise, put answers and explanations in a separate teacher section after the student questions. Do not reveal answers beside questions. For student-only output, omit that section but still solve every question internally.

## Include the teacher's sketches and pictures

When the teacher's original questions contain sketches, diagrams, graphs, or pictures, include those visuals with the corresponding questions in the delivered material. A mention such as “see the picture” or a link to the whole source document is not a substitute for attaching or embedding the actual visual.

- Inspect the original pages visually, not only extracted text, so drawings and picture-based answer choices are not missed. Match each visual to its question; shared visuals must remain available to every question that uses them.
- For exact reproduction, reuse the original visual. Extract it or crop the relevant area from the source, keeping all labels, dimensions, units, arrows, scales, legends, and necessary captions readable. Do not distort proportions, mirror it for RTL, cut off information, or include answers from a teacher's answer key.
- For similar questions, keep the same kind of visual support. Reuse the original only when it still matches the new question. If values or conditions change, adapt or accurately redraw the visual so the question, labels, and answer agree. Do not present an adapted drawing as the teacher's unchanged original. Preserve protected originals in exact-copy mode.
- Place the visual next to its question in the requested output format: embed it in a document or page, or attach the image with a clear question number when embedding is unavailable. For app integration, include the actual asset and verify that it loads with the question.
- Check readability at the intended display size, including a phone for PrepX. Allow enlargement when small labels require it. Add a useful Hebrew text alternative without revealing the solution; when interpreting the visual is the tested skill, do not replace it with a description that gives away that interpretation.
- If a required visual is missing, blurry, or cannot be extracted accurately, identify the affected question and request a clearer source. Do not invent measurements, silently omit the visual, or claim that question is complete.

## Check every question before delivering

Read each question as a student seeing it for the first time, without access to the author's intent:

1. **Understandability:** Can the student tell what is happening, what is asked, and what to write or select? Rewrite sentences needing an adult's paraphrase.
2. **Complete context:** Are necessary data, source excerpts, figures, labels, and units present or accessible? Are source pointers real and specific? Never invent references.
3. **Same learning demand:** Compare similar questions with the example's skill and reasoning steps. Simpler language must preserve intended academic difficulty.
4. **Correctness:** Independently solve the final wording. Check arithmetic, units, assumptions, answer key, and explanation. Single-choice questions must have exactly one defensible correct answer. Multi-select instructions must explicitly say to choose all correct answers.
5. **Fair options:** Use plausible distractors based on subject mistakes, with comparable wording. Avoid overlapping answers, grammar clues, conspicuously longer correct choices, and options made wrong only by a language trick. Avoid “all of the above” when choices may shuffle.
6. **Fair grading:** Supply open questions with a model answer and clear scoring points when an answer key or integration requires them. Accept equivalent correct wording instead of demanding the model's exact sentence. Explanations must also use clear Hebrew.
7. **Readable presentation:** Check numbering, separate parts, choice labels, and Hebrew/formula reading order. Student instructions must not depend on teacher-only notes.
8. **Visual completeness:** Compare with the original pages. Is every original sketch or picture included with the correct question, readable, and consistent with the final wording and answer? Open the delivered artifact to verify the images actually appear; file paths or attachment claims alone do not prove inclusion.

Fix failures before returning the set. Do not claim children have tested or understood questions without actual student feedback. If a source is ambiguous, flag the specific ambiguity to the user instead of guessing an answer.

## Examples of clearer instructions

These illustrate wording changes, not fixed templates for every subject.

**Dense:** “בהסתמך על הנתונים המוצגים לעיל, קבעו את הפרש אורכיהם של שני הגופים ונמקו את קביעתכם.”

**Clear:**

אורך עיפרון א הוא 18 ס״מ. אורך עיפרון ב הוא 12 ס״מ.

בכמה ס״מ עיפרון א ארוך מעיפרון ב? כתבו את החישוב.

**Vague:** “התייחסו להחלטתה של הדמות ולמניעיה.”

**Clear, when supported by a supplied passage:**

למה נועה החליטה לחזור הביתה? כתבו סיבה אחת לפי הקטע.

The second example requires an actual passage about Noa. Do not present it as an answerable standalone question without that passage.

## When working inside PrepX

For `/Users/michaelmishayev/Desktop/Projects/examsPractice` and its worktrees, apply this clarity guidance alongside repository rules. Read `AGENTS.md`, `CLAUDE.md`, `QUESTION-RULES.md`, and `docs/TESTING.md`; the latter wins where older documents conflict. Read `.claude/skills/prepx-new-exam/SKILL.md` when creating or integrating an exam or practice set from study material and a date.

Keep required study-material references, explanations, model answers, and rubrics. Preserve protected verbatim originals. Drafting questions alone does not authorize live exam changes, database writes, submission emails, or deployment. For implementation, follow repository worktree, verification, and release rules; this content check does not prove that the app or delivery pipeline works.
