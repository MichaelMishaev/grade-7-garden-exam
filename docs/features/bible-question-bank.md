# Bible exam question bank

Students preparing for 1 Samuel chapters 1–2 need varied attempts without a longer exam. Expand BIB-001 from 20 to 40 referenced questions; each new attempt draws 20 distinct questions at random, balanced at 8 easy, 8 medium and 4 hard so the existing weighted AI rubric maxima remain correct. Each round includes at least one open and one checkbox question, preserving question-type variety. Selection and option order stay fixed during an attempt and after refresh; a retry draws afresh and can overlap. Existing 20-question drafts and pending submissions remain valid. No changes to personal data, email destination or grading-provider configuration are intended.

Each question follows its cited passage in the existing study material. The student still sees a mobile-friendly, accessible Hebrew exam with the same review, locking, AI grading, score out of 100, and teacher email. Missing AI marks remain incomplete and retryable. Randomness does not guarantee a different set on every retry.

| ID | Acceptance criterion | Verification |
| --- | --- | --- |
| BQ-1 | Bank contains 40 unique referenced questions covering chapters 1–2; each new attempt randomly draws 20 unique questions in the specified difficulty mix. | Content and selection tests passed |
| BQ-2 | An in-progress or completed draft retains its original 20 questions, answers and order after refresh or upgrade. | Mobile browser tests passed |
| BQ-3 | Browser and server score only the selected questions, with AI maxima and final score matching their 20-question weights; existing submissions and retries work. | Scoring, mocked AI and queued-email tests passed |
| BQ-4 | Each finished attempt sends precisely 20 answers, with references and the existing locked/retry flow; missing AI grading remains incomplete. | Mobile browser, API and queued-email tests passed |
| BQ-5 | The subject and exam explain the bank and 20-question round in Hebrew, without leaking student data or changing the direct share URL. | Mobile browser and content tests passed |

Verification: 388 broad checks passed (two private-rubric-file checks skipped); the integration test omitted its migration-marker deletion and the full-stack suite passed 10 checks on isolated databases. A database-backed queue test used a mixed old/new set and verified provider failure, restart, retry, 100-point grading and one email with mocks. Twelve browser draws preserved their 20 IDs on reload. Five new questions were spot-checked against the linked chapters. Physical-device use and production rubric coverage were not checked. Production deployment requires separate authorization and a coordinated database seed.
