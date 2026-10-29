# PrepX — About the App

PrepX is a mobile-first, Hebrew (RTL) exam-prep site for class ז׳2 (Grade 7, class 2) at שי עגנון school, Netanya. Students pick a subject, study the teacher's material, practise with quizzes, and take an exam whose answers are emailed to the teacher.

- **Live:** https://hitech.agnon.online/ (Railway). Pushing to `main` auto-deploys it.
- **Also served by:** GitHub Pages (static pages only; email submission calls the Railway API).
- **Stack:** plain static HTML/CSS/JS, one Node server (`server.mjs`), no framework, no build step. The only npm dependency is `postgres`, used by an optional database layer.
- **Language:** all user-facing copy is Hebrew; every page is `lang="he" dir="rtl"`.

## What students can do

| Area | Pages | What it does |
|---|---|---|
| Subjects | `index.html`, `subject.html?subject=<key>` | Lists subjects, exam versions, study material ("חומר לימוד") and practice quizzes |
| Exams | `garden-exam.html`, `library-exam.html`, `physics-exam.html` | Full exams; answers are emailed to the teacher |
| Practice | `practice.html?quiz=<key>` | Self-graded quizzes with instant Hebrew/English feedback; nothing is sent anywhere |
| Finish | `thanks.html` | End of every exam: clears drafts, shows the summary |

## The shared exam flow

All exams look and behave the same:

start (study material + required name) → questions (progress, collapsible material, flag "סימון לבדיקה חוזרת") → review (blocks finishing until every question is answered) → results (partial score, topics, explanations) → "שליחת כל התשובות למורה" → `thanks.html`.

`library-exam.html` + `library-exam.js` is the reference implementation. Self-graded-only exams are not allowed.

## How submission works

Every exam POSTs the student's name and answers to `/api/submit-exam` on the Railway server. The server validates the payload, keeps Resend credentials private, sends the email to a fixed teacher address, deduplicates through Resend, and rate-limits attempts. Exams are told apart by the `exam` field (garden/library send none and are byte-for-byte frozen; physics sends `physics-v1-assessment`). Drafts live in `sessionStorage` until Resend accepts the email.

## Optional database

PostgreSQL (off by default) can hold exam/quiz content and saved submissions. With the flags off, behaviour must be identical to the no-database server. Migrations are additive only; rows are never deleted without explicit permission and a backup. The page sources remain the source of truth for questions.

## Where things live

- `CLAUDE.md` / `AGENTS.md` — instructions for AI agents working in this repo
- `README.md` (root) — deployment, pages and database details
- `QUESTION-RULES.md` — practice scoring rules
- `.claude/skills/prepx-new-exam/` — how to build a new exam from study material
- `docs/` — single sources of truth (this folder)
- `docs/TESTING.md` — *to be created: the single source of truth for tests*
