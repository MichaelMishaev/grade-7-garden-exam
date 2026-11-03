import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { englishGameQuiz } from '../../english-content.mjs';

const base = process.env.ENGLISH_GAMES_URL || 'http://127.0.0.1:4358';
const out = new URL('../../../output/english-games/', import.meta.url).pathname;
await mkdir(out, {recursive:true});
const quiz = englishGameQuiz();
const browser = await chromium.launch({args:['--enable-webgl','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
try {
  for (const [name,path,select,start] of [
    ['city','afterbell/play/index.html','#quiz','#start'],
    ['campus','afterbell/play/campus.html','#quiz','#start'],
    ['maze','maze/play/index.html','#quiz-select','#start-button'],
    ['arcade','maze/play/arcade.html','#quiz-select','#new-run']
  ]) {
    for (const live of [false,true]) {
      const page = await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
      const errors = [];
      page.on('pageerror',e=>errors.push(e.message));
      await page.route('**/api/**',route => {
        assert.equal(route.request().method(),'GET','smoke must never save or submit');
        return route.fulfill({json:live?quiz:{}});
      });
      await page.goto(`${base}/games/${path}?quiz=${quiz.id}`);
      await page.locator(`${select} option[value="${quiz.id}"]`).waitFor({state:'attached'});
      assert.equal(await page.locator(select).inputValue(),quiz.id);
      assert.equal(await page.locator(`${select} optgroup[label="אנגלית"] option`).count(),1);
      if (await page.locator('#player-name').count()) await page.fill('#player-name','QA');
      await page.locator(`${start}:enabled`).waitFor();
      assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
      await page.click(start);
      await page.waitForFunction(()=>window.render_game_to_text);
      await page.evaluate(()=>window.advanceTime(300));
      const state = await page.evaluate(()=>JSON.parse(window.render_game_to_text()));
      assert.ok(JSON.stringify(state).includes(quiz.id),name+' selects English');
      await page.screenshot({path:`${out}/${name}-${live?'live':'offline'}.png`});
      assert.deepEqual(errors,[]);
      console.log(`PASS ${name}: English mobile start, ${live?'live':'offline'} content, no page errors`);
      await page.close();
    }
  }
} finally { await browser.close(); }
