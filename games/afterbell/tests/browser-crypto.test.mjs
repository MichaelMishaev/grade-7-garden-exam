import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { attemptId } from '../src/browser-crypto.js';
import { quizFingerprint } from '../src/fingerprint.js';
test('LAN HTTP without randomUUID still creates unique RFC4122 version 4 IDs',()=>{
  const provider={getRandomValues:bytes=>crypto.getRandomValues(bytes)};
  const ids=Array.from({length:100},()=>attemptId(provider));
  assert.equal(new Set(ids).size,100);
  for(const id of ids)assert.match(id,/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
});
test('portable quiz fingerprints exactly match server SHA256 for all question sets',async()=>{
  const {quizzes}=JSON.parse(await readFile(new URL('../src/content-snapshot.json',import.meta.url),'utf8'));
  for(const q of quizzes){
    const text=JSON.stringify(q.questions.map(({id,prompt,choices,correct,difficulty})=>({id,prompt,choices,correct,difficulty:difficulty??null})));
    assert.equal(quizFingerprint(q),createHash('sha256').update(text).digest('hex'));
  }
});
