# AGENTS.md

Instructions for Codex (and any other coding agent) working in this repository. Claude Code reads `CLAUDE.md`; both tools share the same rules and the same skills.

## Read first

1. `CLAUDE.md`: architecture, conventions, database flags, draft keys. It is the source of truth; follow it as if it were written here.
2. `README.md`: deployment, Database section, local Docker setup.
3. `QUESTION-RULES.md`: how every exam and quiz question must be written and scored.
4. `docs/TESTING.md`: **single source of truth for the tests students take** (question types, feedback, locking, flow, email, AI grading, ship gate). Where it conflicts with older text elsewhere, it wins; its last section lists the code still to change.

## Skills (shared with Claude Code)

Skills live in `.claude/skills/<name>/SKILL.md`. Read the file and follow it step by step when the task matches its description:

- `.claude/skills/prepx-new-exam/SKILL.md`: **creating a new exam or practice set from a reference (study material) and an exam date.** The user supplies the reference and the date; you write the questions, wire the pages, seed the database, test, and report. Every question must cite a part of the reference.
- `.claude/skills/prepx-review-exam/SKILL.md`: **"review an exam"**: the user pastes a submission email (questions + a student's answers) and a test code; you grade it and say what was right and wrong. Read-only.
- `.claude/skills/prepx-scores/SKILL.md`: how scoring, stars and best-score badges work.

## Hard rules

- Production is live: students use https://hitech.agnon.online/ and pushing to `main` auto-deploys it. Never push to `main` or change Railway settings without the user's explicit OK, and never ship exam-page changes the day before an exam without it.
- Work in a git worktree on a feature branch; never touch uncommitted files in the live checkout.
- Stage files by explicit path (never `git add .` or `git add -A`); show the file list before committing; never commit secrets, `.env*`, dumps or `output/`.
- Never delete database rows, drop tables, or run destructive SQL without explicit per-action permission and a verified backup. Migrations are additive only.
- Never log or print student names, answers, `DATABASE_URL`, or API keys.
- All user-facing copy is Hebrew (RTL). Questions must be consistent with their reference.
- Run the checks from the `prepx-new-exam` skill (section 4) before claiming anything works.
- Every exam (new ones too) follows the library exam's flow and ends by emailing the student's name and answers to the teacher through `/api/submit-exam` with the same Resend credentials, with its own entry in the server `exams` table, tests and the `thanks.html` flow; self-graded-only exams are not allowed.
