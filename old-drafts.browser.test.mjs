// Deploying during an exam (docs/TESTING.md "Deploying during an exam"): a tab that still holds a draft written by the
// PREVIOUS production pages must restore it on the new pages without moving an answer to another question, without
// treating an unsent finished draft as sent, and must then send exactly one correct email. The fixtures in
// test-fixtures/old-drafts/ have the exact shapes the previous pages wrote (see git show origin/main:<page>).
// Real headless browser at 390x844; the app runs with db: null and a mocked Resend; nothing leaves the machine.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { createApp } from './server.mjs';

const read = (file) => readFileSync(new URL(file, import.meta.url), 'utf8');
const fixture = (name) => JSON.parse(read(`./test-fixtures/old-drafts/${name}.json`));
const arrayAfter = (source, marker, end) => {
  const start = source.indexOf(marker) + marker.length - 1;
  return runInNewContext(`(${source.slice(start, source.indexOf(end, start) + end.indexOf(']') + 1)})`); // our own page source, evaluated in an empty context
};

const libraryQuestions = arrayAfter(read('./library-exam.js'), 'const questions = [', '\n  ];');
const physicsQuestions = arrayAfter(read('./physics-exam.js'), 'const questions = [', '\n  ];');
const gardenSource = read('./garden-exam.html');
const gardenQuestions = arrayAfter(gardenSource.slice(gardenSource.lastIndexOf('<script>')), 'const questions = [', '\n    ];');
const plainText = (html) => String(html).replace(/\s*(?:<br\s*\/?>\s*)+/gi, '\n').replace(/<[^>]*>/g, '').trim();
const norm = (text) => String(text).replace(/\s+/g, ' ').trim();
const NONE = 'לא נכתבה תשובה';

// What each exam must show and send for a given old draft: [{ question (as the page POSTs it), answer | null (unanswered) }] in screen order.
const expectations = {
  garden: (draft) => ({
    // the old garden page had no shuffle: the order was the source order
    pairs: gardenQuestions.map((question, i) => ({ question, answer: (draft.answers[i] || '').trim() || null })),
    title: (pair) => pair.question
  }),
  library: (draft) => ({
    pairs: draft.order.map((id) => {
      const q = libraryQuestions.find((x) => x.id === id);
      const value = draft.answers[id];
      return { question: `גרסה 2 · הספרייה בהפסקה · ${q.prompt}`, answer: value === undefined ? null : q.type === 'open' ? value.trim() : q.choices[value], id, prompt: q.prompt };
    }),
    title: (pair) => pair.prompt
  }),
  physics: (draft) => ({
    // the old physics page showed the teacher's order and never reordered it
    pairs: physicsQuestions.map((q) => {
      const value = draft.answers[q.id];
      const steps = q.type === 'fill' && typeof draft.work?.[q.id] === 'string' ? draft.work[q.id].trim() : '';
      const answer = value === undefined ? null : q.type === 'mcq' ? q.choices[value] : steps ? `${value.trim()}\nדרך חישוב: ${steps}` : value.trim();
      return { question: plainText(q.prompt), answer, id: q.id };
    }),
    title: (pair) => pair.question
  })
};

let chromium;
try { ({ chromium } = await import('/opt/homebrew/lib/node_modules/playwright/index.mjs')); } catch { /* no browser available */ }

async function withApp(run) {
  const mails = [];
  const env = { APP_ORIGIN: 'http://127.0.0.1:0', RESEND_API_KEY: 'x', RESEND_FROM_EMAIL: 'PrepX <e@x>', NODE_ENV: 'production' };
  const server = createApp({ env, db: null, sendFetch: async (url, config) => { mails.push(JSON.parse(config.body)); return new Response(JSON.stringify({ id: 'mock' }), { status: 200 }); } });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const origin = `http://127.0.0.1:${server.address().port}`;
  env.APP_ORIGIN = origin;
  const browser = await chromium.launch();
  try {
    await run({ origin, mails, browser });
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }
}

// Opens `path` with the old draft already in sessionStorage BEFORE the page scripts run (written once, so reloads keep the live draft).
async function openWithDraft(browser, origin, path, key, draft) {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
  await context.route((url) => !url.href.startsWith(origin), (route) => route.abort());
  const page = await context.newPage();
  const posts = [];
  const errors = [];
  page.on('request', (request) => { if (request.method() === 'POST' && request.url().endsWith('/api/submit-exam')) posts.push(JSON.parse(request.postData())); });
  page.on('pageerror', (error) => errors.push(error.message));
  await page.addInitScript(([k, value]) => { if (!sessionStorage.getItem('__seeded')) { sessionStorage.setItem(k, value); sessionStorage.setItem('__seeded', '1'); } }, [key, JSON.stringify(draft)]);
  await page.goto(`${origin}/${path}?source=inline`);
  return { page, posts, errors };
}

const reviewItems = (page) => page.$$eval('#review-list .review-item', (els) => els.map((el) => [el.firstChild.textContent, el.lastChild.textContent]));

// Review screen == expectation: right question order, right answer on the right question, flags kept.
async function assertReview(page, expected, flaggedPositions = []) {
  await page.click('#review-button');
  await page.waitForSelector('#review.active');
  const items = await reviewItems(page);
  assert.equal(items.length, expected.pairs.length);
  expected.pairs.forEach((pair, i) => {
    const [title, summary] = items[i];
    assert.ok(norm(title).startsWith(`${i + 1}. ${norm(expected.title(pair))}`), `question ${i + 1} title`);
    assert.equal(norm(summary), pair.answer === null ? NONE : norm(pair.answer.replace(/\n/g, ' · ')), `answer on question ${i + 1}`);
    assert.equal(title.includes('⚑'), flaggedPositions.includes(i), `flag on question ${i + 1}`);
  });
  return items;
}

// Answers whatever is still empty, one question at a time through the review list, then returns to the review screen.
async function fillMissing(page) {
  for (let guard = 0; guard < 60; guard++) {
    if (!(await page.locator('#review.active').count())) await page.click('#review-button');
    await page.waitForSelector('#review.active');
    const index = (await reviewItems(page)).findIndex(([, summary]) => summary === NONE);
    if (index === -1) return;
    await page.locator('#review-list .review-item').nth(index).click();
    const before = await page.textContent('#counter');
    const kind = await page.evaluate(() => {
      const el = (id) => document.getElementById(id);
      if (el('choices') && !el('choices').hidden && document.querySelector('#choices input:not(:disabled)')) return 'choice';
      if (el('number-answer-box') && !el('number-answer-box').hidden && !el('number-answer').disabled) return 'number';
      return el('answer') && !el('answer').disabled ? 'text' : 'none';
    });
    assert.notEqual(kind, 'none', `question ${index + 1} must be answerable`);
    if (kind === 'choice') await page.locator('#choices label').first().click();
    else { await page.fill(kind === 'number' ? '#number-answer' : '#answer', kind === 'number' ? '1' : 'תשובה חדשה'); await page.click('#confirm'); }
    await page.waitForFunction((was) => document.getElementById('counter').textContent !== was || document.querySelector('#review.active'), before, { timeout: 6000 });
  }
  assert.fail('could not answer every question');
}

// The payload the page POSTed and the email the (mock) provider got: one each, with the exact question/answer pairs.
function assertSent({ posts, mails }, expected, shown) {
  assert.equal(posts.length, 1, 'exactly one submission from the page');
  assert.equal(mails.length, 1, 'exactly one email reached the provider');
  const { answers } = posts[0];
  assert.equal(answers.length, expected.pairs.length);
  expected.pairs.forEach((pair, i) => {
    assert.equal(norm(answers[i].question), norm(pair.question), `question ${i + 1} sent`);
    if (pair.answer !== null) assert.equal(answers[i].answer, pair.answer, `answer ${i + 1} sent`);
    else assert.equal(norm(answers[i].answer.replace(/\n/g, ' · ')), norm(shown[i][1]), `new answer ${i + 1} sent as shown on review`);
    assert.notEqual(answers[i].answer, NONE, `answer ${i + 1} is real`);
    assert.ok(mails[0].text.includes(answers[i].answer.split('\n')[0]), `answer ${i + 1} is in the email`);
  });
  assert.equal((mails[0].text.match(/^\d+\. /gm) || []).length, expected.pairs.length);
}

const options = { skip: !chromium && 'Playwright is not installed', timeout: 240000 };
const first = (text) => norm(text).slice(0, 20);

test('garden: a mid-exam old draft keeps the original order, the answers on their questions, and sends one correct email', options, () => withApp(async ({ origin, mails, browser }) => {
  const draft = fixture('garden-mid');
  const { page, posts, errors } = await openWithDraft(browser, origin, 'garden-exam.html', 'garden-exam-draft-v1', draft);
  assert.equal(await page.inputValue('#student-name'), draft.name);
  await page.click('#begin');
  // 7 answered in the old (unshuffled) order: the next open question is the 8th, and it is question index 7
  assert.equal(await page.textContent('#counter'), 'שאלה 8 מתוך 20');
  assert.equal(await page.textContent('#question-title'), gardenQuestions[7]);
  assert.deepEqual(await page.evaluate(() => JSON.parse(sessionStorage.getItem('garden-exam-draft-v1')).order), Array.from({ length: 20 }, (_, i) => i));
  const expected = expectations.garden(draft);
  await assertReview(page, expected);
  await fillMissing(page);
  const shown = await reviewItems(page);
  await page.click('#finish');
  await page.waitForSelector('#done-banner:not([hidden])');
  assertSent({ posts, mails }, expected, shown);
  await page.reload();
  await page.waitForSelector('#results.active');
  await page.waitForTimeout(400);
  assert.equal(mails.length, 1, 'a reload does not resend');
  assert.deepEqual(errors, []);
}));

test('garden: an old draft with all 20 answers restores in order and sends once', options, () => withApp(async ({ origin, mails, browser }) => {
  const draft = fixture('garden-all-answered');
  const { page, posts, errors } = await openWithDraft(browser, origin, 'garden-exam.html', 'garden-exam-draft-v1', draft);
  await page.click('#begin');
  assert.equal(await page.textContent('#counter'), 'שאלה 20 מתוך 20');
  const expected = expectations.garden(draft);
  await assertReview(page, expected);
  const shown = await reviewItems(page);
  await page.click('#finish');
  await page.waitForSelector('#done-banner:not([hidden])');
  assertSent({ posts, mails }, expected, shown);
  assert.deepEqual(errors, []);
}));

test('library: a mid-exam old draft keeps its order, answers (radio and typed), flag and position, and sends once', options, () => withApp(async ({ origin, mails, browser }) => {
  const draft = fixture('library-mid');
  const { page, posts, errors } = await openWithDraft(browser, origin, 'library-exam.html', 'library-exam-draft-v1', draft);
  assert.equal(await page.inputValue('#student-name'), draft.name);
  await page.click('#begin');
  const expected = expectations.library(draft);
  assert.equal(await page.textContent('#counter'), `שאלה ${draft.current + 1} מתוך 20`);
  assert.equal(first(await page.textContent('#question-title')), first(expected.pairs[draft.current].prompt));
  // a radio answered by the old page shows as picked and locked; the typed open answer is still there
  await page.click('#previous');
  assert.equal(await page.locator('#choices input:checked').count() + (await page.inputValue('#answer')).length > 0, true);
  await assertReview(page, expected, [draft.order.indexOf(draft.flags[0])]);
  await fillMissing(page);
  const shown = await reviewItems(page);
  await page.click('#finish');
  await page.waitForSelector('#done-banner:not([hidden])');
  assertSent({ posts, mails }, expected, shown);
  await page.reload();
  await page.waitForSelector('#results.active');
  await page.waitForTimeout(400);
  assert.equal(mails.length, 1, 'a reload does not resend');
  assert.deepEqual(errors, []);
}));

test('library: an old finished-but-unsent draft is sent (not treated as sent) with the right pairs', options, () => withApp(async ({ origin, mails, browser }) => {
  const draft = fixture('library-finished-unsent');
  const { page, posts, errors } = await openWithDraft(browser, origin, 'library-exam.html', 'library-exam-draft-v1', draft);
  await page.waitForSelector('#done-banner:not([hidden])');
  assertSent({ posts, mails }, expectations.library(draft), []);
  assert.equal(await page.evaluate(() => JSON.parse(sessionStorage.getItem('library-exam-draft-v1')).sent), true);
  assert.deepEqual(errors, []);
}));

test('physics: a mid-exam old draft keeps the teacher order, choice/number/working/open answers and position, and sends once', options, () => withApp(async ({ origin, mails, browser }) => {
  const draft = fixture('physics-mid');
  const { page, posts, errors } = await openWithDraft(browser, origin, 'physics-exam.html', 'physics-exam-draft-v1', draft);
  assert.equal(await page.inputValue('#student-name'), draft.name);
  await page.click('#begin');
  const expected = expectations.physics(draft);
  assert.equal(await page.textContent('#counter'), `שאלה ${draft.current + 1} מתוך 27`);
  assert.equal(first(await page.textContent('#question-title')), first(expected.pairs[draft.current].question));
  // the numeric task with working (id 12) comes back with both the number and the working
  await page.click('#review-button');
  await page.locator('#review-list .review-item').nth(11).click();
  assert.equal(await page.inputValue('#number-answer'), draft.answers['physics-exam-12']);
  assert.equal(await page.inputValue('#work'), draft.work['physics-exam-12']);
  await assertReview(page, expected, [4]);
  await fillMissing(page);
  const shown = await reviewItems(page);
  await page.click('#finish');
  await page.waitForSelector('#done-banner:not([hidden])');
  assertSent({ posts, mails }, expected, shown);
  await page.reload();
  await page.waitForSelector('#results.active');
  await page.waitForTimeout(400);
  assert.equal(mails.length, 1, 'a reload does not resend');
  assert.deepEqual(errors, []);
}));

test('physics: an old finished-but-unsent draft is sent (not treated as sent) with the right pairs', options, () => withApp(async ({ origin, mails, browser }) => {
  const draft = fixture('physics-finished-unsent');
  const { page, posts, errors } = await openWithDraft(browser, origin, 'physics-exam.html', 'physics-exam-draft-v1', draft);
  await page.waitForSelector('#done-banner:not([hidden])');
  assertSent({ posts, mails }, expectations.physics(draft), []);
  assert.equal(posts[0].exam, 'physics-v1-assessment');
  assert.deepEqual(errors, []);
}));
