import test from 'node:test';
import assert from 'node:assert/strict';
import { MAZE_LAYOUTS, selectMazeLayout, MAZE, START, EXIT, CLUE, TREASURE, ENCOUNTERS, EXTRA_ENCOUNTERS, CREATURES, pathTo, isWalkable, createState, restoreState, transition } from '../core.js';
import { WORLD_ENTITIES, WATER_BOWL } from '../world.js';
import snapshot from '../content-snapshot.js';
const questions=snapshot.quizzes[0].questions;

test('three distinct connected mazes keep every landmark, NPC and patrol reachable',()=>{
  assert.equal(new Set(MAZE_LAYOUTS.map(layout=>layout.tiles.join('\n'))).size,3);
  for(const layout of MAZE_LAYOUTS){
    selectMazeLayout(layout.id);
    for(let y=0;y<MAZE.length;y++)for(let x=0;x<MAZE[0].length;x++)if(isWalkable(x,y))assert.ok(pathTo(START,{x,y}),`${layout.id}: ${x},${y}`);
    for(const point of [EXIT,CLUE,TREASURE,WATER_BOWL,...ENCOUNTERS,...EXTRA_ENCOUNTERS,...WORLD_ENTITIES,...WORLD_ENTITIES.flatMap(e=>e.path||[]),...CREATURES.flatMap(e=>e.path)])assert.ok(pathTo(START,point),`${layout.id}: landmark ${JSON.stringify(point)}`);
    const state=createState(questions);assert.equal(state.layoutId,layout.id);
    assert.equal(restoreState(state,questions).layoutId,layout.id);
  }
  selectMazeLayout();
});
test('gifts are cosmetic, collected once, and survive refresh; old saves do not replay gifts',()=>{
  const original=createState(questions);
  const state={...original,resolved:['floor'],giftsSeen:[]};
  const gift=transition(state,{type:'collect-gift',id:'floor'},questions);
  assert.deepEqual(gift.giftsSeen,['floor']);
  assert.equal(gift.coins,0);assert.deepEqual(gift.answers,{});assert.deepEqual(gift.seals,[]);
  assert.strictEqual(transition(gift,{type:'collect-gift',id:'floor'},questions),gift);
  assert.strictEqual(transition(state,{type:'collect-gift',id:'cage'},questions),state);
  for(const id of original.assignments.floor)original.answers[id]={choice:questions.find(q=>q.id===id).correct};
  const pending=restoreState(original,questions);assert.ok(pending.resolved.includes('floor'));assert.deepEqual(pending.giftsSeen,[]);
  const restored=restoreState(transition(pending,{type:'collect-gift',id:'floor'},questions),questions);assert.deepEqual(restored.giftsSeen,['floor']);
  delete original.giftsSeen;delete original.layoutId;
  const legacy=restoreState(original,questions);assert.equal(legacy.layoutId,'classic');assert.deepEqual(legacy.giftsSeen,['floor']);
  assert.equal(restoreState({...original,layoutId:'unknown'},questions),null);
});

test('completion illustration stays stable on refresh and malformed art is ignored',()=>{
 const state=createState(questions);
 assert.equal(restoreState({...state,completionArt:2},questions).completionArt,2);
 assert.equal(restoreState({...state,completionArt:0},questions).completionArt,0);
 assert.equal(restoreState({...state,completionArt:99},questions).completionArt,undefined);
});
