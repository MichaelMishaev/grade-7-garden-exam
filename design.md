# PrepX design guide

## Purpose

PrepX helps a Grade 7 student choose a school exam, pick a version, and study in short sessions on a phone. The interface should feel encouraging and lively while keeping the reading material and questions easy to understand. The primary UI language is Hebrew; the page direction is right to left. Practice feedback also includes a short English explanation.

## Student journey

1. **Home:** choose a subject from a small set of illustrated cards. Show only information that helps the student choose, such as the exam date or available practice.
2. **Subject:** see each exam version as a separate card. Put topic practice below the versions. If no version exists, explain that clearly while still showing any available study material.
3. **Practice:** answer one question at a time, see immediate feedback and an explanation, then continue. Show progress throughout and offer a way to retry at the end.
4. **Full exam:** read the passage, answer all 20 questions, review answers, then submit them. Keep the passage available for rereading and preserve an unfinished session in the browser.

Do not invent exam dates, versions, or question content. A new subject can have materials or practice before a full exam version is ready.

## Visual direction

The visual concept is [learning-ui-concept.png](design/learning-ui-concept.png). It uses a bright green primary subject card, a quiet neutral secondary card, large dark headings, generous white space, rounded surfaces, and playful study illustrations. The experience takes inspiration from Duolingo's approachable learning UI, with its own PrepX identity and original assets.

| Element | Treatment |
| --- | --- |
| Canvas | White, uncluttered, with one clear next action per section. |
| Primary green | `#58cc02` for progress, primary buttons, and positive states; `#46a302` for depth and darker accents. |
| Soft green | `#e9fbdc` and pale green gradients for available exam versions and success feedback. |
| Text | Dark blue gray around `#273541`; secondary text around `#687987`. |
| Borders and depth | Pale `#e5e9ec` borders, rounded corners, and shallow bottom shadows that make cards and buttons feel pressable. |
| Other accents | Blue for navigation and focus, purple for the PrepX mascot and some lesson icons, warm coral for incorrect answers. |

Use bold, legible Hebrew headings and simple body text. The CSS font stack starts with Arial and Noto Sans Hebrew. Keep question text and explanations readable rather than compressing them to fit a card.

## Brand and artwork

The PrepX wordmark and violet X mascot live in `assets/branding/prepx-logo.png`; `branding.css` controls the lockup's size and focus treatment. Keep its transparency and aspect ratio. The generated subject artwork is in `assets/books.png` and `assets/atom.png`; the exam version illustration is `assets/exam-sheet.png`. These images are decorative in the interface, so their HTML `alt` text is empty when nearby text already names the subject or version.

Keep new artwork coherent with these assets: simple silhouettes, saturated color, soft depth, and enough clear space to read at phone size. Do not place essential instructions inside an image. The logo generation brief is saved in `assets/branding/prepx-logo-prompt.txt`.

## Components and states

- **Subject card:** the artwork, subject name, date or availability, and arrow form one large link. The active Hebrew card is green; a subject without an exam version uses a neutral treatment.
- **Version card:** show a distinct title, availability label, short description, date, and question count when known. Each version has its own destination.
- **Practice row:** use a compact lesson number, topic title, short description, and obvious action. The entire row is a link.
- **Question screen:** show one question, large answer targets, a visible progress bar, and a clear next button after answering.
- **Feedback:** green for correct and warm coral for incorrect; state the result in words and explain it in Hebrew and English. Color and animation must not be the only signals.
- **Practice result:** show 0–3 stars (★/☆ with a text label), the score out of 100, and an encouraging Hebrew and English message. A low score (below 50) uses amber rather than red. Offer "practice again", plus "mistakes only" when there are misses. Confetti appears only for 90 and above and never under reduced motion.
- **Best-score badge:** on the subject page, a practice row the student has completed shows its saved best score with stars, for example "★★☆ · 80".
- **Empty state:** say what is unavailable and direct the student toward available study material or another subject.
- **Full exam:** allow a return to the reading passage, show question progress, make validation errors specific, and let the student review and edit before sending.

## Motion

Use short entrance and press animations to make actions feel responsive. Current transitions are roughly 140–260 ms: cards rise slightly on entry, press down on activation, progress fills smoothly, and answer feedback appears with a small movement. Keep motion subtle enough that it never delays the next action. Under `prefers-reduced-motion: reduce`, replace movement with a brief fade or remove it.

## Mobile, RTL, and accessibility

- Design for a narrow phone first. Check 320 px and 390 px widths for horizontal overflow, clipped Hebrew text, and comfortable answer targets; then check tablet and desktop widths.
- Keep document direction `rtl`. Set `dir="ltr"` on the English feedback text so punctuation reads correctly.
- Keep navigation, reading order, and arrows understandable in RTL. Use semantic links for destinations and buttons for actions.
- Provide a visible keyboard focus indicator, meaningful headings, labeled fields, and text feedback announced to assistive technology.
- Keep tappable controls at least about 44 px high where practical. Do not rely on hover for any required information.
- Preserve readable contrast on the bright green surfaces and allow text to wrap rather than shrink excessively.

## Source map and references

- `styles.css`: home and shared card styles.
- `subject.css`: subject, version, and topic-list styles.
- `practice.css`: short quiz, progress, answer, and feedback styles.
- `branding.css`: PrepX logo sizing and focus state.
- `quiz-core.js`: shared scoring, stars and feedback tiers (rules in `QUESTION-RULES.md`).
- `garden-exam.html`: full exam's page-specific styles and flow.

Reference patterns: [Duolingo selection rows](https://mobbin.com/screens/ed5fd27f-19fb-48a9-ae0f-4481e5b7671a), [lesson path](https://mobbin.com/screens/a13f2a69-17ab-48d1-b6bd-9b64b5cd426e), and [answer feedback](https://mobbin.com/screens/ef9d6413-1e91-4f2c-8317-25d63ceee5bf). Use them for interaction ideas, not for copying their artwork or layout verbatim.
