import test from 'node:test';
import assert from 'node:assert/strict';
import { createState, transition, restoreState, isWalkable, pathTo } from '../core.js';
import { createWorld, interactWorld, updateWorld, worldEntityPosition, normalizeWorld, WORLD_ENTITIES } from '../world.js';
const rabbit = WORLD_ENTITIES.find(e=>e.id==='rabbit');
const questions=Array.from({length:6},(_,i)=>({id:`rabbit-${i}`,prompt:'שאלה',choices:['א','ב'],correct:0,explanation:{he:'הסבר'},ref:{id:'test',part:null}}));
const learning=state=>JSON.stringify({answers:state.answers,hearts:state.hearts,coins:state.coins,seals:state.seals});

test('approaching rabbit reacts; only explicit nearby feeding starts friendship and follows once',()=>{
 let world=createWorld();
 world=interactWorld(world,'rabbit',rabbit).world;
 assert.ok(world.rabbitCalm);assert.equal(world.rabbitFed,false);assert.equal(world.rabbitFollowing,false);
 assert.match(world.dialogue.text,/גזר/);
 assert.equal(interactWorld(world,'rabbit',{x:1,y:1},0,'feed'),null);
 assert.equal(interactWorld(world,'fox',{x:19,y:7},0,'feed'),null);
 world=interactWorld(world,'rabbit',rabbit,0,'feed').world;
 assert.ok(world.rabbitFed);assert.ok(world.rabbitFollowing);
 assert.deepEqual(interactWorld(world,'rabbit',rabbit,0,'feed').world,world);
 assert.equal(world.waterFilled,false);assert.equal(world.foxFollowing,false);
});
test('fed rabbit hops only along walkable adjacent tiles and waits next to player',()=>{
 let world=interactWorld(createWorld(),'rabbit',rabbit,0,'feed').world;
 const player={x:15,y:11};
 for(let ms=480;ms<30000;ms+=480){
  const before={...world.rabbit};world=updateWorld(world,{type:'tick',elapsedMs:ms,player},pathTo);
  assert.ok(isWalkable(world.rabbit.x,world.rabbit.y));
  assert.ok(Math.abs(before.x-world.rabbit.x)+Math.abs(before.y-world.rabbit.y)<=1);
  const rendered=worldEntityPosition(rabbit,ms+210,world);
  assert.ok(isWalkable(Math.round(rendered.x),Math.round(rendered.y)));
 }
 assert.equal(pathTo(world.rabbit,player).length,1);
});
test('rabbit friendship survives refresh and capture without changing learning; pause freezes hops',()=>{
 let state=createState(questions);state.player={x:rabbit.x,y:rabbit.y};
 const before=learning(state);state=transition(state,{type:'world-interact',entityId:'rabbit',intent:'feed'},questions);
 assert.equal(learning(state),before);
 state=restoreState(state,questions);assert.ok(state.world.rabbitFed&&state.world.rabbitFollowing);
 const paused={...state,paused:true};assert.strictEqual(transition(paused,{type:'tick',ms:1000},questions),paused);
 state.hearts=0;state.phase='capture';const position={...state.world.rabbit};
 state=transition(state,{type:'skip-capture'},questions);state=transition(state,{type:'guided-continue'},questions);
 assert.equal(state.phase,'explore');assert.ok(state.world.rabbitFollowing);assert.deepEqual(state.world.rabbit,position);
});
test('legacy and malformed rabbit saves normalize safely',()=>{
 const legacy=createWorld();delete legacy.rabbit;delete legacy.rabbitMoveMs;delete legacy.rabbitFed;delete legacy.rabbitFollowing;
 assert.deepEqual(normalizeWorld(legacy,isWalkable).rabbit,createWorld().rabbit);
 const corrupt={...createWorld(),rabbitFollowing:true,rabbitFed:false,rabbit:{x:0,y:0,previous:{x:9,y:9},startedMs:1e20},rabbitMoveMs:1e20};
 const normalized=normalizeWorld(corrupt,isWalkable,1000);assert.deepEqual(normalized.rabbit,createWorld().rabbit);assert.equal(normalized.rabbitFollowing,false);assert.equal(normalized.rabbitMoveMs,0);
});
