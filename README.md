# Grade 7 Hebrew exam practice

A mobile-first RTL study hub. Students choose an exam on the home page. The Hebrew exam for 29.10 is available now; Physics is listed as upcoming until its material is provided. Three short Hebrew practice quizzes cover facts versus opinions, question words, and instruction words.

## Run locally

```bash
npm start
```

The server listens on `PORT` or port 3000 and serves only static HTML, CSS, JavaScript, SVG, and PNG files. Open `http://localhost:3000/`.

## Pages

- `index.html`: exam selector and Hebrew practice choices.
- `garden-exam.html`: original 20-question reading exam, with review and email submission.
- `practice.html?quiz=facts`, `?quiz=questions`, `?quiz=instructions`: short practice quizzes with immediate Hebrew and English feedback.
- `thanks.html`: confirmation after the full exam is submitted.

The full exam submits the student's name and answers to FormSubmit for forwarding to the configured teacher email. The email address was activated and a test from the original site was confirmed received; a later Railway test stalled at FormSubmit, so delivery from the Railway site remains unconfirmed. Student answers are not stored on this server. An unfinished exam is stored in the browser's `sessionStorage` and cleared after successful submission. Practice quizzes run entirely in the browser.

## Deployment

- Source repository: <https://github.com/MichaelMishaev/grade-7-garden-exam>
- Railway project: `grade-7-exam-study`; service: `web`; environment: `production`
- Railway domain: <https://web-production-1a642.up.railway.app/>
- GitHub Pages also serves the same static pages; the Node server is used only by Railway.

## Design references

The hub uses a prominent first exam and a vertical list of short practice choices, adapted for RTL from Mobbin references: [Brilliant course catalog](https://mobbin.com/screens/9360c5fd-857f-4ada-b27f-f1e4e70332df), [Brilliant learning plan](https://mobbin.com/screens/10af6f6b-f0e0-4104-8551-289cbeca755c), [Quizlet question](https://mobbin.com/screens/f8af7017-ac7b-4584-bd0c-9845d160911a), and [Kahoot quiz library](https://mobbin.com/screens/f99622cf-fde9-4136-ab15-4e2ee2608cfc).
