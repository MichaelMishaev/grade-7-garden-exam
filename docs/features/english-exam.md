# English exam — ENG-001

Michael requests an in-app exam based on the teacher's linked examples, replacing the external-document card. Audience: Grade 7 students preparing for 9 November 2026. Default: 20 original practice questions covering the teacher's four sections: reading, vocabulary, parts of speech/Present Simple, and writing about a person admired. These are new practice tasks, not a claim to reproduce the real exam. Exact textbook vocabulary is limited to what is readable in the teacher's linked exercises.

Flow: home → English subject → material/name → one question at a time → review → finish sends through the existing teacher email endpoint → locked read-only completion summary. English passages, questions and answers are LTR; navigation and feedback are Hebrew. Independent draft/result keys; preserve legacy exams. Reuse existing appearance. Open answers have model answers and rubrics and remain teacher graded; no new AI service or credentials. Michael explicitly approved push to main and deployment on 2026-11-03.

Acceptance criteria:
- ENG-1: Home card opens the local English subject, with a 9.11 exam and teacher reference; browser check.
- ENG-2: 20 stable questions, at least three types, 8 easy/8 medium/4 hard; each has a valid source part; content tests and five-question source spot check.
- ENG-3: Name required, progress, locked submitted answers, 1.5-second advance, reload restores draft and timer, review rejects missing answers; browser checks.
- ENG-4: Finish sends all 20 answers with English identity through existing Resend configuration. Failure keeps draft; success shows a locked read-only summary and reload never resends; mocked API/browser checks.
- ENG-5: Extracted DB content includes English subject/exam/questions/references, submission matching and grading work; automated checks.
- ENG-6: 390×844 has no horizontal overflow, keyboard controls and ≥44px targets; browser check.

Production, real email delivery and physical-device checks are outside local verification.

## Implemented content and evidence — 2026-11-03

20 original questions: 14 multiple choice, 3 true/false, 3 open; 8 easy, 8 medium, 4 hard. Coverage: 5 reading, 4 vocabulary, 3 parts of speech, 7 Present Simple (including written transformation), 1 extended writing. The unseen passage is newly authored because the class handouts are not in the supplied document. Vocabulary comes from the readable linked p12/p20/p28 Wordwall lists; grammar tasks follow the positive/negative/question examples rather than copying them. The writing prompt follows the teacher's “A person I admire” topic. This does not claim to cover every word from unavailable textbook pages.

Sources read: teacher Google Doc (including its hyperlinks), Wordwall resources 36327179, 36327199, 36327212, 10462641, 95521835, 8818577 and 30802053; the linked English Room affirmative exercise and Agendaweb question exercise. Source spot checks: village near river; no Sunday work; journey = מסע; meal = ארוחה; Does + singular subject + base verb.

ENG-1 through ENG-6 passed local verification against the current production base af93223. Automated: 330 tests (328 passed, 2 skipped), with an isolated PostgreSQL database; 10 full-stack tests passed with mocked email and AI. The skips are pre-existing optional checks. English-specific mobile browser coverage verifies required name, shuffled content, right/wrong feedback, answer locks, reload/timer persistence, incomplete-review blocking, send failure, successful retry, retained read-only summary, and no resend on reload. Existing homepage checks pass at 320–1440px, including calendar and past-date chips. Database migration/seed/verification and matching all 20 English answers pass locally. No real student records or emails were created during QA.

Specified, implemented and locally verified. Integrated with origin/main af93223 before release, preserving the current server scoring, attempts, detailed emails and retained read-only summary. Main deployment is authorized and in progress. Real email delivery and physical-device checks remain unverified.
