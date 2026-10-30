import test from 'node:test';
import assert from 'node:assert/strict';
import {COMPLETION_ART,chooseCompletionArt,isCompletionArt} from '../completion-art.js';
test('three complete escape illustrations are described and have distinct atlas positions',()=>{
 assert.equal(COMPLETION_ART.length,3);assert.equal(new Set(COMPLETION_ART.map(art=>art.position)).size,3);
 assert.ok(COMPLETION_ART.every(art=>art.title&&art.message&&art.alt));
});
test('a completed run keeps its art while successive runs never immediately repeat',()=>{
 for(let previous=0;previous<3;previous++){
  const next=chooseCompletionArt(null,previous);assert.notEqual(next,previous);assert.ok(isCompletionArt(next));
  assert.equal(chooseCompletionArt(next,previous),next);
 }
 assert.equal(chooseCompletionArt(null,null,()=>0),0);assert.equal(chooseCompletionArt(null,null,()=>.99999),2);
});
test('corrupt art values cannot point outside the illustration atlas',()=>{
 for(const value of [-1,3,Infinity,NaN,'1',null,{},1.5])assert.equal(isCompletionArt(value),false);
 assert.equal(chooseCompletionArt(88,88,()=>.5),1);
});
