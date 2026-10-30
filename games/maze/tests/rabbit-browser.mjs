import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {MAZE,ENCOUNTERS,CREATURES,isWalkable} from '../core.js';
const url=process.env.MAZE_QA_URL||'http://127.0.0.1:5188/';
const output=new URL('../../../output/maze/rabbit/',import.meta.url).pathname;await mkdir(output,{recursive:true});
const browser=await chromium.launch({headless:true,args:['--enable-webgl','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
await context.addInitScript(()=>{window.requestAnimationFrame=()=>0;});
const page=await context.newPage(),errors=[],checks=[],writes=[];
page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>{if(r.method()!=='GET')writes.push(r.url());});
await page.route('**/api/quizzes/**',r=>r.fulfill({status:404,contentType:'application/json',body:'{}'}));
const check=(name,value)=>{assert.ok(value,name);checks.push(name);console.log('PASS',name);};
const read=()=>page.evaluate(()=>JSON.parse(window.render_game_to_text()));
const advance=ms=>page.evaluate(ms=>window.advanceTime(ms),ms);
const start=async()=>{await page.waitForFunction(()=>window.render_game_to_text&&!document.querySelector('#start-button').disabled,null,{polling:50});await page.locator('#start-button').tap();};
const academic=s=>JSON.stringify({hearts:s.hearts,coins:s.coins,seals:s.seals,progress:s.progress});
const blocked=new Set([...ENCOUNTERS,...CREATURES.flatMap(e=>e.path)].map(e=>`${e.x},${e.y}`));
function path(from,to){const queue=[{...from,path:[]}],seen=new Set([`${from.x},${from.y}`]);for(const point of queue){if(point.x===to.x&&point.y===to.y)return point.path;for(const[dx,dy]of[[0,-1],[1,0],[0,1],[-1,0]]){const x=point.x+dx,y=point.y+dy,key=`${x},${y}`;if(MAZE[y]?.[x]&&MAZE[y][x]!=='#'&&!blocked.has(key)&&!seen.has(key)){seen.add(key);queue.push({x,y,path:[...point.path,{x,y}]});}}}throw new Error('No safe route');}
async function walk(target){for(let guard=0;guard<200;guard++){const s=await read();assert.equal(s.phase,'explore');if(s.player.x===target.x&&s.player.y===target.y)return;const next=path(s.player,target)[0];const direction=next.x>s.player.x?'right':next.x<s.player.x?'left':next.y>s.player.y?'down':'up';await page.locator(`[data-direction="${direction}"]`).tap();await advance(900);}throw new Error('Walking stuck');}
try{
 await page.goto(url);await start();await walk({x:21,y:11});
 check('rabbit approach action is offered near the rabbit',(await page.locator('#interact-button').textContent()).includes('בשקט'));
 const before=academic(await read());await page.locator('#interact-button').tap();
 check('approaching rabbit opens a visible dialog and explicit carrot action',await page.locator('#feed-rabbit').isVisible()&&(await read()).panel==='world'&&(await read()).world.rabbitCalm);
 check('approach alone does not silently start following',!(await read()).world.rabbitFollowing);
 await page.screenshot({path:output+'approach-mobile.png',fullPage:true});
 await page.locator('#feed-rabbit').tap();
 check('feeding changes friendship and offers a clear way to continue',(await read()).world.rabbitFed&&(await read()).world.rabbitFollowing&&await page.locator('#close-panel').isVisible()&&!await page.locator('#feed-rabbit').count());
 check('feeding leaves learning hearts and fictional currency unchanged',academic(await read())===before);
 const rabbitBefore={...(await read()).world.rabbit};await advance(3000);
 check('feeding dialog keeps hazards and animal movement paused',(await read()).paused&&JSON.stringify((await read()).world.rabbit)===JSON.stringify(rabbitBefore));
 await page.screenshot({path:output+'fed-mobile.png',fullPage:true});await page.locator('#close-panel').tap();
 await walk({x:21,y:15});
 const visited=[];
 for(let i=0;i<12;i++){const previous={...(await read()).world.rabbit};await advance(100);const s=await read(),animal=s.world.rabbit;check('rabbit hop stays on an adjacent walkable tile',isWalkable(animal.x,animal.y)&&Math.abs(previous.x-animal.x)+Math.abs(previous.y-animal.y)<=1);visited.push({x:animal.x,y:animal.y});}
 const followed=await read();check('fed rabbit visibly advances behind touch-controlled player',followed.world.rabbit.y>rabbitBefore.y&&followed.world.rabbit.x===21);check('following changes no original learning state',academic(followed)===before);
 await advance(0);await page.screenshot({path:output+'following-mobile.png',fullPage:true});
 const saved={...followed.world.rabbit};await page.reload();await start();
 check('refresh preserves fed friendship and exact committed rabbit position',(await read()).world.rabbitFed&&(await read()).world.rabbitFollowing&&JSON.stringify((await read()).world.rabbit)===JSON.stringify(saved));
 await page.setViewportSize({width:320,height:568});await advance(0);await page.screenshot({path:output+'following-narrow.png',fullPage:true});
 check('narrow mobile has no horizontal overflow',await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 check('zero page errors or writes',errors.length===0&&writes.length===0);
 await writeFile(output+'report.json',JSON.stringify({url,checks,errors,writes,visited},null,2));
} catch(e){await page.screenshot({path:output+'failure.png',fullPage:true}).catch(()=>{});await writeFile(output+'failure-state.json',JSON.stringify(await read(),null,2));throw e;}finally{await browser.close();}
