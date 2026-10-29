import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createApp } from './server.mjs';
import { contentHash } from './games/afterbell/service.mjs';

test('same-origin game entry, built assets and isolated history work through the main app', async()=>{
  if(process.env.AFTERBELL_TEST_DATABASE_URL)assert.match(new URL(process.env.AFTERBELL_TEST_DATABASE_URL).pathname,/test/i);
  const app=createApp({env:{AFTERBELL_DATABASE_PATH:':memory:', ...(process.env.AFTERBELL_TEST_DATABASE_URL ? {DATABASE_URL:process.env.AFTERBELL_TEST_DATABASE_URL} : {})},db:null});
  await new Promise(resolve=>app.listen(0,'127.0.0.1',resolve));
  const base=`http://127.0.0.1:${app.address().port}`;
  try{
    const home=await(await fetch(base)).text();
    assert.match(home,/class="afterbell-entry" href="games\/afterbell\/play\/index.html"/);
    assert.equal((await fetch(base+'/afterbell-entry.css?v=1')).status,200);
    const response=await fetch(base+'/games/afterbell/play/index.html');
    assert.equal(response.status,200);
    assert.equal(response.headers.get('cache-control'),'no-cache');
    const html=await response.text();
    for(const [,asset] of html.matchAll(/(?:src|href)="(\.\/assets\/[^\"]+)"/g)){
      const r=await fetch(new URL(asset,response.url));assert.equal(r.status,200);assert.match(r.headers.get('content-type'),/javascript|css/);
    }
    const health=await(await fetch(base+'/api/afterbell/health')).json();assert.equal(health.ok,true);
    const {quizzes}=JSON.parse(await readFile(new URL('./games/afterbell/src/content-snapshot.json',import.meta.url),'utf8'));const q=quizzes[0];
    const body={id:crypto.randomUUID(),name:'בדיקת שילוב',quizId:q.id,contentHash:contentHash(q),startedAt:Date.now()-1000,answers:q.questions.map(x=>({id:x.id,choice:x.correct}))};
    const post=origin=>fetch(base+'/api/afterbell/attempts',{method:'POST',headers:{Origin:origin,'Content-Type':'application/json'},body:JSON.stringify(body)});
    assert.equal((await post('https://unknown.invalid')).status,403);
    const saved=await post('http://127.0.0.1:3000');assert.equal(saved.status,200);assert.equal((await saved.json()).saved,true);
    assert.equal((await fetch(base+'/games/afterbell/service.mjs')).status,404);
    assert.equal((await fetch(base+'/games/afterbell/.data/attempts.sqlite')).status,404);
    assert.equal((await fetch(base+'/games/afterbell/node_modules/three/build/three.module.js')).status,404);
  }finally{await new Promise(resolve=>app.close(resolve));}
});
