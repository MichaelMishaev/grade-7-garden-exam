import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
const base=process.env.PREPX_QA_URL||'http://127.0.0.1:4321';
const out='output/playwright/home-entry';
await mkdir(out,{recursive:true});
const checks=[],errors=[],failedAssets=[],assets=[],screenshots=[];
function check(name,passed,detail){checks.push({name,passed:!!passed,...(detail?{detail}:{})});console.log(`${passed?'PASS':'FAIL'} ${name}`);}
async function shot(page,name){if(await page.evaluate(()=>typeof window.advanceTime==='function')){await page.evaluate(()=>advanceTime(16));await page.waitForTimeout(120);}const path=`${out}/${name}.png`;await page.screenshot({path,animations:'disabled',scale:'css',timeout:15000});screenshots.push(path);}
const browser=await chromium.launch({headless:true,args:['--enable-webgl']});
try{
  for(const profile of [
    {name:'android-390',viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:3.5,userAgent:'Mozilla/5.0 (Linux; Android 14; Pixel 8 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36'},
    {name:'desktop-1440',viewport:{width:1440,height:1000},isMobile:false,hasTouch:false,deviceScaleFactor:1}
  ]){
    const {name,...options}=profile,context=await browser.newContext({...options,reducedMotion:'reduce'}),page=await context.newPage();
    page.on('pageerror',error=>errors.push({profile:name,message:error.message}));
    page.on('console',message=>{if(message.type()==='error'&&!message.text().includes('Failed to load resource'))errors.push({profile:name,message:message.text()});});
    page.on('response',response=>{const url=new URL(response.url());if(url.pathname.startsWith('/games/afterbell/play/assets/')){const asset={profile:name,path:url.pathname,status:response.status(),type:response.headers()['content-type']};assets.push(asset);if(!response.ok())failedAssets.push(asset);}});
    page.on('requestfailed',request=>{if(request.url().includes('/games/afterbell/play/assets/'))failedAssets.push({profile:name,path:new URL(request.url()).pathname,error:request.failure()?.errorText});});
    const home=await page.goto(base+'/',{waitUntil:'load'});
    check(`${name}: homepage loads`,home.status()===200);
    const card=page.locator('.afterbell-entry');
    check(`${name}: game card exists once`,await card.count()===1);
    check(`${name}: card links to nested production build`,await card.getAttribute('href')==='games/afterbell/play/index.html');
    check(`${name}: homepage remains Hebrew RTL`,await page.evaluate(()=>document.documentElement.lang==='he'&&document.documentElement.dir==='rtl'));
    check(`${name}: homepage has no horizontal overflow`,await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
    check(`${name}: learning links are intact`,await page.locator('.exam-list a').count()===2);
    await shot(page,`homepage-top-${name}`);
    await card.scrollIntoViewIfNeeded();
    check(`${name}: card fits width`,await card.evaluate(el=>{const r=el.getBoundingClientRect();return r.left>=0&&r.right<=innerWidth;}));
    check(`${name}: card action target is at least 44px`,await page.locator('.afterbell-action').evaluate(el=>{const r=el.getBoundingClientRect();return r.width>=44&&r.height>=44;}));
    check(`${name}: reduced motion disables card movement`,await card.evaluate(el=>getComputedStyle(el).transitionDuration==='0s'));
    await shot(page,`homepage-card-${name}`);
    if(profile.isMobile)await card.tap();else{await card.focus();await page.keyboard.press('Enter');}
    await page.waitForURL('**/games/afterbell/play/index.html');
    await page.waitForFunction(()=>typeof render_game_to_text==='function'&&!document.getElementById('start').disabled,null,{timeout:30000});
    await page.evaluate(()=>advanceTime(16));
    check(`${name}: homepage link opens built game`,new URL(page.url()).pathname==='/games/afterbell/play/index.html');
    check(`${name}: production positioning hooks are absent`,await page.evaluate(()=>typeof window.__afterbell==='undefined'));
    check(`${name}: production bundle has no Vite client`,await page.evaluate(()=>![...document.scripts].some(s=>s.src.includes('@vite/client')||s.src.includes('/src/'))));
    check(`${name}: game starts from a valid content source`,await page.evaluate(()=>['database','snapshot'].includes(JSON.parse(render_game_to_text()).source)));
    check(`${name}: game page has no horizontal overflow`,await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
    if(profile.isMobile){check('Android profile has DPR 3.5',await page.evaluate(()=>devicePixelRatio===3.5));check('high-DPR renderer caps render resolution',await page.evaluate(()=>JSON.parse(render_game_to_text()).rendering.pixelRatio<=1.6));}
    await shot(page,`built-welcome-${name}`);
    await page.locator('#player-name').fill('בדיקת קישור');
    if(profile.isMobile)await page.locator('#start').tap();else await page.locator('#start').click();
    if(profile.isMobile)await page.locator('#begin-adventure').tap();else await page.locator('#begin-adventure').click();
    await page.evaluate(()=>advanceTime(16));
    check(`${name}: synthetic round enters exploration`,await page.evaluate(()=>JSON.parse(render_game_to_text()).mode==='explore'));
    if(profile.isMobile){
      check('Android touch controls are visible',await page.locator('#joystick').isVisible()&&await page.locator('#jump').isVisible());
      const cdp=await context.newCDPSession(page),r=await page.locator('#joystick').boundingBox(),x=r.x+r.width/2,y=r.y+r.height/2,before=await page.evaluate(()=>JSON.parse(render_game_to_text()).player);
      await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x+32,y}]});await page.evaluate(()=>advanceTime(600));await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
      const after=await page.evaluate(()=>JSON.parse(render_game_to_text()).player);check('Android production touch movement works',Math.hypot(before.x-after.x,before.z-after.z)>1);
      await page.evaluate(()=>advanceTime(500));const stopped=await page.evaluate(()=>JSON.parse(render_game_to_text()).player);check('Android production touch release stops movement',Math.hypot(stopped.x-after.x,stopped.z-after.z)<.01);
      await page.locator('#jump').tap();await page.evaluate(()=>advanceTime(140));check('Android production touch jump works',await page.evaluate(()=>JSON.parse(render_game_to_text()).player.y>0));await page.evaluate(()=>advanceTime(1000));
    }else{
      const before=await page.evaluate(()=>JSON.parse(render_game_to_text()).player);await page.keyboard.down('ArrowLeft');await page.evaluate(()=>advanceTime(600));await page.keyboard.up('ArrowLeft');const after=await page.evaluate(()=>JSON.parse(render_game_to_text()).player);check('desktop production keyboard movement works',Math.hypot(before.x-after.x,before.z-after.z)>1);
    }
    await shot(page,`built-exploration-${name}`);
    await context.close();
  }
  check('nested JavaScript and CSS assets all return HTTP 200',assets.length>=4&&failedAssets.length===0&&assets.every(a=>a.status===200),failedAssets.length?failedAssets:undefined);
  check('nested asset MIME types are valid',assets.every(a=>a.path.endsWith('.js')?a.type?.includes('javascript'):a.path.endsWith('.css')?a.type?.includes('text/css'):true));
  check('no uncaught browser errors',errors.length===0,errors.length?errors:undefined);
}catch(error){checks.push({name:'QA execution',passed:false,error:error.message});console.error('QA execution failed: '+error.message);}
finally{await browser.close();await writeFile(`${out}/report.json`,JSON.stringify({checks,errors,failedAssets,assets,screenshots},null,2));}
console.log(JSON.stringify({passed:checks.filter(c=>c.passed).length,failed:checks.filter(c=>!c.passed),errors,report:`${out}/report.json`},null,2));
if(checks.some(c=>!c.passed))process.exitCode=1;
