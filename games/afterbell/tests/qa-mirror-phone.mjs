import {chromium,webkit} from 'playwright';
import assert from 'node:assert/strict';
import {mkdir,readFile} from 'node:fs/promises';
import {makeRound} from '../src/core.js';
import {station} from '../src/relay.js';
const base=process.env.CAMPUS_QA_URL||'http://127.0.0.1:4347/games/afterbell/play/campus.html';
const {quizzes}=JSON.parse(await readFile(new URL('../src/content-snapshot.json',import.meta.url)));
const raw=makeRound(quizzes[0]);raw.relay={edition:0,steps:[0,0,0]};raw.participantName='QA';
const site=station(raw.relay,2);raw.player={x:site.x,z:site.z};
await mkdir('output',{recursive:true});
for(const engine of [chromium,webkit]){
 const browser=await engine.launch();try{
 const page=await browser.newPage({viewport:{width:390,height:742},hasTouch:true,isMobile:true});
 await page.addInitScript(r=>{localStorage.setItem('prepx-afterbell-name','QA');sessionStorage.setItem('prepx-afterbell-draft-v1',JSON.stringify(r));},raw);
 await page.goto(base+'?quiz='+quizzes[0].id);await page.tap('#resume');await page.tap('#interact');
 for(const width of [390,320]){
 await page.setViewportSize({width,height:width===320?568:742});
 const first=page.locator('[data-mirror]').first();await first.waitFor();
 const rect=await first.boundingBox();assert.ok(rect&&rect.height>=44&&rect.y>0&&rect.y+rect.height<(width===320?568:742));
 await first.tap();assert.ok(await page.locator('#mirror-feedback').isVisible());
 await page.screenshot({path:'output/mirror-'+engine.name()+'-'+width+'.png'});
 }
 console.log('PASS visible mirror controls and feedback '+engine.name());
 }finally{await browser.close();}
}
