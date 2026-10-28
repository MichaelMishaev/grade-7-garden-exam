# Grade 7 Hebrew exam practice

A study hub for exam preparation for students in class ז׳2 (Grade 7, class 2) at שי עגנון school in נתניה (Netanya).

**קהל היעד:** תלמידי כיתה ז׳2 בבית הספר שי עגנון, נתניה.

A mobile-first RTL study hub. Students choose a subject on the home page, then a separate version of its exam. The Hebrew exam for 29.10 has one available version; Physics opens a version list that is empty until its material is provided. Three short Hebrew practice quizzes cover facts versus opinions, question words, and instruction words.

## Run locally

```bash
npm start
```

The server listens on `PORT` or port 3000 and serves only static HTML, CSS, JavaScript, SVG, and PNG files. Open `http://localhost:3000/`.

## Pages

- `index.html`: compact subject selector.
- `subject.html?subject=hebrew` and `?subject=physics`: exam version lists. Add further versions to the `subjects` data in this page.
- `garden-exam.html`: original 20-question reading exam, with review and email submission.
- `practice.html?quiz=facts`, `?quiz=questions`, `?quiz=instructions`: short practice quizzes with immediate Hebrew and English feedback.
- `thanks.html`: confirmation after the full exam is submitted.

The full exam submits the student's name and answers to FormSubmit for forwarding to the configured teacher email. The email address was activated and a test from the original site was confirmed received; a later Railway test stalled at FormSubmit, so delivery from the Railway site remains unconfirmed. Student answers are not stored on this server. An unfinished exam is stored in the browser's `sessionStorage` and cleared after successful submission. Practice quizzes run entirely in the browser.

## Deployment

- Source repository: <https://github.com/MichaelMishaev/grade-7-garden-exam>
- Railway project: `grade-7-exam-study`; service: `web`; environment: `production`
- Custom domain: <https://hitech.agnon.online/> (Cloudflare DNS; Railway hosting and TLS)
- Railway domain: <https://web-production-1a642.up.railway.app/>
- GitHub Pages also serves the same static pages; the Node server is used only by Railway.

## Design references

The compact subject rows adapt the scannable list pattern in [LinkedIn's course list](https://mobbin.com/screens/6e8c4863-601c-4f24-9467-0a2b782ab8a9). The version list follows the separate-item structure in [Insight Timer's course days](https://mobbin.com/screens/86450a91-1ecc-42e6-967e-df3336cc8316). The earlier quiz layout drew on [Brilliant's course catalog](https://mobbin.com/screens/9360c5fd-857f-4ada-b27f-f1e4e70332df) and [Quizlet's question screen](https://mobbin.com/screens/f8af7017-ac7b-4584-bd0c-9845d160911a). All were adapted for Hebrew RTL and a small exam catalog.

The current visual and motion pass references [Duolingo's compact selection rows](https://mobbin.com/screens/ed5fd27f-19fb-48a9-ae0f-4481e5b7671a), [lesson path](https://mobbin.com/screens/a13f2a69-17ab-48d1-b6bd-9b64b5cd426e), and [correct-answer feedback](https://mobbin.com/screens/ef9d6413-1e91-4f2c-8317-25d63ceee5bf). The implementation uses original styling, quick card press feedback, progress transitions, and short answer/result entrances; reduced-motion preferences remove movement. The visual concept is saved at `design/learning-ui-concept.png`.
