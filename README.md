# PrepX

PrepX is a study hub for exam preparation for students in class ז׳2 (Grade 7, class 2) at שי עגנון school in נתניה (Netanya).

**קהל היעד:** תלמידי כיתה ז׳2 בבית הספר שי עגנון, נתניה.

A mobile-first RTL study hub. Students choose a subject on the home page, then a separate version of its exam. The Hebrew exam for 29.10 has one available version. Physics has no exam version yet, but it shows study materials (a PDF summary and an external practice site) and four practice quizzes on measurement. Three short Hebrew practice quizzes cover facts versus opinions, question words, and instruction words.

## Run locally

```bash
npm start
```

The server listens on `PORT` or port 3000. It serves `/api/submit-exam` and static HTML, CSS, JavaScript, SVG, PNG, and PDF files only. Open `http://localhost:3000/`.

## Pages

- `index.html`: compact subject selector.
- `subject.html?subject=hebrew` and `?subject=physics`: exam version lists. Add further versions to the `subjects` data in this page.
- `garden-exam.html`: original 20-question reading exam, with review and email submission.
- `practice.html?quiz=facts`, `?quiz=questions`, `?quiz=instructions`: short Hebrew practice quizzes with immediate Hebrew and English feedback. `?quiz=physics-basics`, `physics-units`, `physics-precision`, `physics-pole`: physics quizzes with Hebrew feedback. Practice is scored out of 100 with 0–3 stars, and the best full-round score is kept in `localStorage` (`prepx-best-<quiz>`) and shown on the subject page. Scoring rules are in `QUESTION-RULES.md`.
- `thanks.html`: confirmation after the full exam is submitted.

The full exam sends the student's name and all 20 answers to the Railway server at `/api/submit-exam`. The server sends a Hebrew email through Resend to `345287@gmail.com`, from `PrepX <exams@netanya.club>`. Student answers are not stored on the app server or written to its logs; Resend processes the email content. The draft stays in `sessionStorage` until Resend accepts the email, and remains available if submission fails. Practice quizzes run entirely in the browser and send nothing.

Railway requires `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `APP_ORIGIN=https://hitech.agnon.online`, and `NODE_ENV=production`. Keep the API key in Railway variables, never in browser code or Git. GitHub Pages submits to the Railway endpoint using an explicitly allowed origin. Identical submissions use Resend's idempotency key (24-hour window). The server accepts at most 100 valid submission attempts per hour per running instance; this in-memory limit resets on restart.

Run the checks with `node --test quiz-core.test.mjs server.test.mjs` (scoring logic and the submission API; Resend is mocked).

On 2026-10-28, a synthetic submission from the live exam reached `thanks.html`; Resend reported it delivered to the teacher address, with the test marker and all 20 answer sections present (email ID `01a182f9-659f-765f-b663-2ad92e7a5267`).

## Deployment

Pushing to `main` on GitHub deploys the site. There is no manual deploy step.

| Where | URL | How it updates |
| --- | --- | --- |
| GitHub repository (public) | <https://github.com/MichaelMishaev/grade-7-garden-exam> | Source of truth |
| Railway, custom domain | <https://hitech.agnon.online/> | Auto-deploys on push to `main` |
| Railway domain | <https://web-production-1a642.up.railway.app/> | Same Railway service |
| GitHub Pages | <https://michaelmishaev.github.io/grade-7-garden-exam/> | Auto-publishes on push to `main` |

### Railway

- Project `grade-7-exam-study`, service `web`, environment `production`, region `europe-west4`, 1 replica.
- Source: GitHub repo above, branch `main`. Built with Railpack; start command `npm start` (runs `server.mjs`).
- Health check: `GET /` must return 200 before a new deployment replaces the old one.
- Railway supplies `PORT`; the email variables listed above must be set as Railway variables.
- The custom domain uses Cloudflare DNS, with Railway handling hosting and TLS.
- To roll back, redeploy an earlier deployment from the Railway dashboard.

### GitHub Pages

Pages serves the repository files directly (`.nojekyll` disables Jekyll), without `server.mjs`. Everything must therefore work as plain static files. A file type missing from the `types` list in `server.mjs` (for example `.webp` or fonts) works on Pages but returns 404 on Railway, so add new asset types there.

### Before you push

- Increase the `?v=` number on any stylesheet link whose CSS changed (for example `styles.css?v=4`), so browsers load the new styles.
- The repository is public. Everything committed is visible, including the fixed teacher email in `server.mjs`.
- Uncommitted local changes are not live. Check `git status` before assuming a change is deployed.

### Checking a deployment

```bash
curl -sI https://hitech.agnon.online/ | head -1   # expect HTTP/2 200
```

Then open the home page, a subject page, a practice quiz, and the exam on a phone-sized screen. Deployment status and logs are in the Railway dashboard for project `grade-7-exam-study`.

## Design references

### PrepX branding

The approved logo combines a violet X mascot with a rounded PrepX wordmark. The transparent PNG is at `assets/branding/prepx-logo.png`; its generation prompt and Mobbin reference are recorded in `assets/branding/prepx-logo-prompt.txt`. It was generated with OpenAI image generation, drawing on the approachable mascot and lettering in [Duolingo's welcome screen](https://mobbin.com/screens/fb4eda98-538d-4bc0-9ef6-bf06ed401c12).

All five pages display the logo as a link to the home page and include PrepX in their browser titles. `branding.css` controls its responsive sizing and keyboard focus indicator. Preserve the PNG's transparency and aspect ratio when reusing it.

The compact subject rows adapt the scannable list pattern in [LinkedIn's course list](https://mobbin.com/screens/6e8c4863-601c-4f24-9467-0a2b782ab8a9). The version list follows the separate-item structure in [Insight Timer's course days](https://mobbin.com/screens/86450a91-1ecc-42e6-967e-df3336cc8316). The earlier quiz layout drew on [Brilliant's course catalog](https://mobbin.com/screens/9360c5fd-857f-4ada-b27f-f1e4e70332df) and [Quizlet's question screen](https://mobbin.com/screens/f8af7017-ac7b-4584-bd0c-9845d160911a). All were adapted for Hebrew RTL and a small exam catalog.

The current visual and motion pass references [Duolingo's compact selection rows](https://mobbin.com/screens/ed5fd27f-19fb-48a9-ae0f-4481e5b7671a), [lesson path](https://mobbin.com/screens/a13f2a69-17ab-48d1-b6bd-9b64b5cd426e), and [correct-answer feedback](https://mobbin.com/screens/ef9d6413-1e91-4f2c-8317-25d63ceee5bf). The implementation uses original styling, quick card press feedback, progress transitions, and short answer/result entrances; reduced-motion preferences remove movement. The visual concept is saved at `design/learning-ui-concept.png`.

The illustrated subject and exam-version icons in `assets/` were generated with OpenAI image generation for this app. `styles.css` styles the home page, `subject.css` styles version pages, and `practice.css` styles quiz interactions.
