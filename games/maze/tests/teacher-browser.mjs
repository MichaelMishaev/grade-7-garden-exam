import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { englishTeacherQuizzes } from '../../english-teacher-content.mjs';

const base = process.env.ENGLISH_GAMES_URL || 'http://127.0.0.1:4358';
const out = new URL('../../../output/english-teacher/',import.meta.url).pathname;
await mkdir(out,{recursive:true});
const quizzes = englishTeacherQuizzes();
const browser = await chromium.launch({args:['--enable-webgl','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
try {
  for (const [name,path,select,start] of [
    ['city','afterbell/play/index.html','#quiz','#start'],
    ['campus','afterbell/play/campus.html','#quiz','#start'],
    ['maze','maze/play/index.html','#quiz-select','#start-button'],
    ['arcade','maze/play/arcade.html','#quiz-select','#new-run']
  ]) {
    for (const quiz of quizzes) {
      const page = await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
      const errors = [];
      page.on('pageerror',e=>errors.push(e.message));
      await page.addInitScript(()=>{Math.random=()=>.999999;});
      await page.route('**/api/**',route=>{
        assert.equal(route.request().method(),'GET','QA must not save or submit');
        return process.env.ENGLISH_GAMES_ACTUAL_CONTENT ? route.continue() : route.fulfill({json:{}});
      });
      await page.goto(`${base}/games/${path}?quiz=${quiz.id}`);
      await page.locator(`${select} option[value="${quiz.id}"]`).waitFor({state:'attached'});
      assert.equal(await page.locator(select).inputValue(),quiz.id);
      assert.equal(await page.locator(`${select} optgroup[label="אנגלית"] option`).count(),11);
      if (await page.locator('#player-name').count()) await page.fill('#player-name','QA');
      await page.locator(`${start}:enabled`).waitFor(); await page.click(start);
      await page.evaluate(()=>window.advanceTime(100));
      assert.ok(JSON.stringify(await page.evaluate(()=>JSON.parse(window.render_game_to_text()))).includes(quiz.id));
      if (name==='city') {
        await page.click('#action');
        const hint = await page.locator('#sheet-body p').first().innerText();
        for (const button of await page.locator('[data-tool]').all()) if (hint.includes(await button.innerText())) { await button.click(); break; }
        await page.click('#route'); await page.evaluate(()=>window.advanceTime(40000)); await page.click('#action');
        const prompt = await page.locator('#sheet-title').innerText();
        const question = quiz.questions.find(q=>q.prompt===prompt); assert.ok(question,quiz.id+' displays its source prompt');
        if (question.context) assert.ok((await page.locator('#sheet-body').innerText()).includes(question.context));
        if (question.image) {
          const img=page.locator('#sheet-body img'); assert.equal(await img.getAttribute('src'),question.image);
          await page.waitForFunction(()=>document.querySelector('#sheet-body img')?.naturalWidth>0,null,{polling:100});
        }
        await page.screenshot({path:`${out}/${quiz.id}-question.png`});
        await page.locator(`[data-opt="${question.correct}"]`).click();
        assert.equal(await page.locator('[data-opt]:enabled').count(),0);
        assert.ok((await page.locator('.explain').innerText()).includes(question.explanation.he));
        const answered = await page.evaluate(()=>JSON.parse(window.render_game_to_text()).answered);
        await page.reload(); await page.locator('#resume:visible').waitFor(); await page.click('#resume');
        assert.equal(await page.evaluate(()=>JSON.parse(window.render_game_to_text()).answered),answered);
        assert.equal(await page.locator('[data-opt]:enabled').count(),0);
      }
      assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
      assert.deepEqual(errors,[]); console.log(`PASS ${name}: ${quiz.id} (${quiz.questions.length} source items)`);
      await page.close();
    }
  }
} finally { await browser.close(); }
