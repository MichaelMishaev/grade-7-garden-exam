import {prepareCargo} from './city-job.js';
import './city.css';
import {items,emptyWallet,pay,toggleItem} from './city-wallet.js';
import snapshot from './content-snapshot.json';
import {validQuiz,makeRound,answer,progress,academicScore,starsFor,restoreRound} from './core.js';
import {quizFingerprint} from './fingerprint.js';
import {roles,places,objective,currentJob,inCity,CITY_BOUNDS,northSouthStreets,eastWestStreets,streetEnds} from './city-data.js';
import {cityWorld} from './city-world.js';

const $=id=>document.getElementById(id);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const DRAFT='prepx-festival-city-v1';
const read=(store,key)=>{try{return store.getItem(key);}catch{return null;}};
const put=(store,key,v)=>{try{store.setItem(key,v);}catch{}};
let mode='menu',quiz=snapshot.quizzes[0],source='snapshot',role='courier',round,city,world,loadId=0,saveClock=0,timer,feedback=null;
let followedEvent=null;
const incidentPhase={reported:'דיווח ראשוני',responding:'צוות בדרך',working:'צוות במקום',clearing:'חזרה לשגרה'};
function toast(msg){$('notice').textContent=msg;clearTimeout(timer);timer=setTimeout(()=>$('notice').textContent='',2600);}
function save(){if(city&&round)put(sessionStorage,DRAFT,JSON.stringify({city,round}));}
function restore(){
 try{
  const {city:c,round:r}=JSON.parse(read(sessionStorage,DRAFT));
  if(!Object.hasOwn(roles,c.role)||!Number.isInteger(c.stage)||c.stage<0||c.stage>3||!['pickup','deliver','quiz','final','complete'].includes(c.phase)||!Number.isFinite(c.x)||!Number.isFinite(c.z)||!inCity(c.x,c.z))return null;
  if((c.stage===3)!==['final','complete'].includes(c.phase))return null;
  // The shared quiz draft only stores campus coordinates. City positions live in the city record.
  const valid=restoreRound(JSON.stringify(r),quiz);if(!valid)return null;
  for(let i=0;i<c.stage;i++)if(progress(valid,i).next)return null;
  if(c.feedback&&(!valid.answers[c.feedback]||!valid.assignments[c.stage]?.includes(c.feedback)))return null;
  return {city:c,round:valid};
 }catch{return null;}
}
const savedQuiz=(()=>{try{return JSON.parse(read(sessionStorage,DRAFT))?.round?.quizId;}catch{return null;}})();
$('quiz').innerHTML=['hebrew','physics'].map(id=>`<optgroup label="${id==='hebrew'?'עברית':'פיזיקה'}">${snapshot.quizzes.filter(q=>q.subject_id===id).map(q=>`<option value="${esc(q.id)}">${esc(q.title)}</option>`).join('')}</optgroup>`).join('');
const requested=new URLSearchParams(location.search).get('quiz')||savedQuiz;
if(snapshot.quizzes.some(q=>q.id===requested))$('quiz').value=requested;
$('player-name').value=read(localStorage,'prepx-afterbell-name')||'';
if(requested)$('campus-link').href='./campus.html?quiz='+encodeURIComponent(requested);
function drawRoles(){$('roles').innerHTML=Object.entries(roles).map(([id,r])=>`<button type="button" data-role="${id}" aria-pressed="${role===id}">${r.icon} ${r.name}</button>`).join('');}
$('roles').onclick=e=>{const b=e.target.closest('[data-role]');if(b){role=b.dataset.role;drawRoles();}};
async function loadQuiz(){
 const id=$('quiz').value,version=++loadId;let q=snapshot.quizzes.find(q=>q.id===id),src='snapshot';$('start').disabled=true;$('resume').hidden=true;
 try{const res=await fetch('/api/afterbell/quizzes/'+encodeURIComponent(id),{signal:AbortSignal.timeout(3500)});if(res.ok){const live=await res.json();if(live.id===id&&validQuiz(live)){q=live;src='database';}}}catch{}
 if(loadId!==version)return;quiz=q;source=src;$('start').disabled=!world;$('resume').hidden=!restore();$('campus-link').href='./campus.html?quiz='+encodeURIComponent(id);
}
$('quiz').onchange=loadQuiz;
function updateTarget(){const obj=objective(city),p=places[obj.place];world.target(p);world.drive(city.driving);world.cargo(city.phase==='deliver');
 $('chapter').textContent=roles[city.role].icon+' '+roles[city.role].name+' · משימה '+Math.min(city.stage+1,3)+' מתוך 3';
 $('goal').textContent=obj.title;$('vehicle').textContent=city.driving?'לצאת מהרכב':'לעלות לרכב';$('action').textContent=obj.action;$('pin').textContent=p.name;
}
function refresh(){
 if(!city||mode!=='explore')return;
 const o=objective(city),p=places[o.place],d=Math.hypot(city.x-p.x,city.z-p.z);
 $('action').hidden=d>4.3;
 const routeLabel=d<=4.3?'לבצע את הפעולה':world.moving()?'לעצור בדרך':'הובלה ליעד';
 if($('route').textContent!==routeLabel)$('route').textContent=routeLabel;
 const status=d<=4.3?'הגעתם! לחצו על ״'+o.action+'״.':world.yielding()?'מאטים ונותנים זכות קדימה.':p.district+' · '+Math.round(d)+' מטר · אפשר לנהוג או ללחוץ על הובלה.';
 if($('status').textContent!==status)$('status').textContent=status;
 const events=world.events(),count=String(events.length);
 if($('calls').textContent!==count){$('calls').textContent=count;$('dispatch').setAttribute('aria-label','מוקד העיר · דיווחים פעילים: '+count);}
 const selected=events.find(e=>e.id===followedEvent);
 if(followedEvent&&!selected){followedEvent=null;toast('הדיווח נסגר. אפשר להמשיך במשמרת.');}
 const watching=selected&&Math.hypot(city.x-selected.observer.x,city.z-selected.observer.z)<12;
 if(watching&&$('notice').textContent.startsWith('נסיעה דחופה')){clearTimeout(timer);$('notice').textContent='';}
 $('scene-guide').hidden=!watching;
 if(watching){
  const now=selected.stageLabel||incidentPhase[selected.phase],next=selected.nextStep||'';
  if($('scene-now').textContent!==now)$('scene-now').textContent=now;
  if($('scene-next').textContent!==next)$('scene-next').textContent=next;
 }
 $('goal').textContent=selected?'נסיעה דחופה · '+selected.title:objective(city).title;
 if(watching)$('goal').textContent='בזירה · '+selected.title;
 else if(selected){
  const travel=world.yielding()?'מחפשים מעבר פנוי':'מתקדמים לזירה';
  $('status').textContent=travel+' · '+Math.round(Math.hypot(city.x-selected.observer.x,city.z-selected.observer.z))+' מ׳';
 }
 const nearby=selected||events.find(e=>Math.hypot(e.x-city.x,e.z-city.z)<18);
 const report=nearby?nearby.title+' · '+(nearby.stageLabel||incidentPhase[nearby.phase]):'';
 $('scene-report').hidden=!nearby;if($('scene-report').textContent!==report)$('scene-report').textContent=report;
 const pin=world.project(p);$('pin').hidden=!pin.visible;$('pin').style.left=pin.x+'px';$('pin').style.top=pin.y+'px';
}
let wallet=emptyWallet();
const fallbackWallets=new Map();
function walletKey(){return 'prepx-city-wallet-v1:'+round.participantName;}
function syncWallet(change){
 const key=walletKey();
 const update=()=>{
  if(!round||walletKey()!==key)return;
  try{wallet=JSON.parse(localStorage.getItem(key))||fallbackWallets.get(key)||emptyWallet();}
  catch{wallet=fallbackWallets.get(key)||emptyWallet();}
  pay(wallet,round,city.stage);
  change?.(wallet);
  fallbackWallets.set(key,wallet);
  try{localStorage.setItem(key,JSON.stringify(wallet));}catch{toast('המטבעות זמינים רק עד לסגירת הדף.');}
  $('coins').textContent=wallet.coins;
  world.outfit(roles[city.role].color,wallet.equipped);
 };
 return navigator.locks?navigator.locks.request(key,update):Promise.resolve(update());
}
function shop(vehicle=city.driving){
 clearTimeout(timer);$('notice').textContent='';
 const listing=items.filter(item=>Boolean(item.vehicle)===vehicle).map(item=>{
  const owned=wallet.owned.includes(item.id), equipped=wallet.equipped.includes(item.id);
  const label=equipped?'להסיר':owned?'לצייד':'לקנות · '+item.price+' 🪙';
  return `<div class="stock"><div><strong>${item.name}</strong><small>${item.detail}</small></div><button data-item="${item.id}" ${!owned&&wallet.coins<item.price?'disabled':''}>${label}</button></div>`;
 }).join('');
 sheet(`<span class="kicker">ציוד למשמרת</span><h2 id="sheet-title">חנות הפסטיבל</h2><p>בארנק שלכם: <b>${wallet.coins} מטבעות</b></p><p>תשובה נכונה מזכה ב־5 מטבעות והשלמת מסירה ב־15.</p><div class="stock-tabs" role="group" aria-label="סוג הציוד"><button id="hero-stock" aria-pressed="${!vehicle}">ציוד לדמות</button><button id="van-stock" aria-pressed="${vehicle}">המוסך</button></div>${listing}<button class="cta" id="leave-shop">חזרה לעיר</button>`,'shop');
 for(const [id,showVan] of [['hero-stock',false],['van-stock',true]]){
  $(id).onclick=()=>{shop(showVan);$(id).focus();};
 }
 $('leave-shop').onclick=()=>{closeSheet();$('shop').focus();};
 document.querySelectorAll('[data-item]').forEach(b=>b.onclick=async()=>{
  b.disabled=true;await syncWallet(w=>toggleItem(w,b.dataset.item));if(mode==='shop'){shop(vehicle);document.querySelector('[data-item="'+b.dataset.item+'"]').focus();}
 });
}
$('shop').onclick=async()=>{await syncWallet();if(mode==='explore')shop();};
function start(resume){
 const old=resume&&restore();if(resume&&!old)return;
 if(old){({city,round}=old);role=city.role;drawRoles();feedback=city.feedback||null;}else{
  feedback=null;
  const name=$('player-name').value.trim();if(!name){$('player-name').setCustomValidity('כתבו שם או כינוי.');$('player-name').reportValidity();return;}
  put(localStorage,'prepx-afterbell-name',name);round=makeRound(quiz);round.participantName=name;
  const lastKey='prepx-city-shift-'+role,edition=read(localStorage,lastKey)==='0'?1:0;put(localStorage,lastKey,String(edition));
  city={role,edition,stage:0,phase:'pickup',x:places.home.x,z:places.home.z+2,driving:false};
 }
 $('welcome').hidden=true;$('hud').hidden=false;mode='explore';followedEvent=null;world.start(city.x,city.z,round.elapsed);syncWallet();updateTarget();refresh();save();
 if(city.phase==='quiz')question();if(city.phase==='complete')finish();
}
$('entry').onsubmit=e=>{e.preventDefault();start(false);};$('player-name').oninput=()=>$('player-name').setCustomValidity('');$('resume').onclick=()=>start(true);
function sheet(html,nextMode){
 world.setPaused(true);mode=nextMode;$('sheet').hidden=false;$('hud').inert=true;$('sheet-body').innerHTML=html;$('sheet').scrollTop=0;
 const focus=$('sheet-title');if(focus){focus.tabIndex=-1;focus.focus({preventScroll:true});}
}
function closeSheet(){mode='explore';$('sheet').hidden=true;$('hud').inert=false;world.setPaused(false);updateTarget();refresh();$('route').focus({preventScroll:true});}
function reference(q){
 const ref=quiz.references.find(r=>r.id===q.ref.id);if(!ref)return '';
 const u=new URL(ref.url||'/subject.html?subject='+quiz.subject_id,'https://hitech.agnon.online');return ['https:','http:'].includes(u.protocol)?`<a href="${esc(u.href)}" target="_blank" rel="noopener">מקור: ${esc(ref.title)} ${esc(q.ref.part||'')} ↗</a>`:'';
}
function question(){
 const index=city.stage,p=progress(round,index);
 if(!p.next&&!feedback){city.stage++;syncWallet();city.phase=city.stage===3?'final':'pickup';save();closeSheet();toast(city.stage===3?'כל העיר מוכנה! קיבלתם 15 מטבעות.':'המסירה הושלמה · קיבלתם 15 מטבעות.');return;}
 const q=round.questions.find(q=>q.id===(feedback||p.next)),a=round.answers[q.id],job=currentJob(city);
 sheet(`<div class="kicker">✓ ${esc(job[2])} הגיע ליעד · ${esc(quiz.title)}</div><h2 id="sheet-title">${esc(q.prompt)}</h2><small>שאלת תרגול · ${p.answered+(a?0:1)} מתוך ${p.total} במסירה הזאת</small>
 ${q.options.map(o=>`<button data-opt="${o.original}" ${a?'disabled':''} class="${a&&o.original===q.correct?'right':a&&o.original===a.choice?'wrong':''}">${esc(o.text)}</button>`).join('')}
 ${a?`<div class="explain" role="status"><b>${a.correct?'נכון! +5 מטבעות':'הפעם התשובה שונה.'}</b><p>${esc(q.explanation.he)}</p>${q.explanation.en?`<p dir="ltr" lang="en">${esc(q.explanation.en)}</p>`:''}${reference(q)}</div><button id="next-q" class="cta">${p.next?'לשאלה הבאה':'להמשיך במשמרת'} ←</button>`:reference(q)}`,'question');
 document.querySelectorAll('[data-opt]').forEach(b=>b.onclick=()=>{if(answer(round,q.id,Number(b.dataset.opt))){feedback=city.feedback=q.id;save();syncWallet();question();}});
 if($('next-q'))$('next-q').onclick=()=>{feedback=city.feedback=null;save();question();};
}
function interact(){
 if(mode!=='explore')return;const o=objective(city),p=places[o.place];if(Math.hypot(city.x-p.x,city.z-p.z)>4.3)return;
 world.stop();if(city.stage===3){city.phase='complete';save();finish();return;}
 if(city.phase==='pickup'){prepareCargo(city,sheet,()=>{city.phase='deliver';save();closeSheet();toast('הציוד איתכם. עכשיו '+objective(city).title);},closeSheet);return;}
 city.phase='quiz';save();question();
}
$('action').onclick=interact;
$('route').onclick=()=>{if(mode!=='explore')return;followedEvent=null;world.observe(null);const p=places[objective(city).place];if(Math.hypot(city.x-p.x,city.z-p.z)<=4.3){interact();return;}if(world.moving())world.stop();else if(!world.go(p.x,p.z))toast('הדרך חסומה. נסו לצאת לרחוב.');refresh();};
$('vehicle').onclick=()=>{if(mode!=='explore')return;city.driving=!city.driving;world.drive(city.driving);save();updateTarget();refresh();toast(city.driving?roles[city.role].vehicle+' מוכן לנסיעה':'חזרה להליכה');};
function map(){
 const {west,east,north,south}=CITY_BOUNDS,width=east-west,height=south-north+32;
 const target=objective(city).place,entries=Object.entries(places);
 const incidents=world.events?.()||[];
 const roads=[...northSouthStreets.map(x=>`M${x} ${streetEnds.north}V${streetEnds.south}`),...eastWestStreets.map(z=>`M${west} ${z}H${east}`)].join(' ');
 const marks=entries.map(([id,p],i)=>`<circle cx="${p.x}" cy="${p.z}" r="12" fill="${id===target?'#b74929':'#27675e'}"/><text x="${p.x}" y="${p.z+5}" font-size="16" fill="white" text-anchor="middle">${i+1}</text>`).join('');
 const alerts=incidents.map(event=>`<g transform="translate(${event.x} ${event.z})"><title>${esc(event.title)}</title><path d="M0 -9L9 8H-9Z" fill="#a53428" stroke="white"/><text y="5" font-size="11" text-anchor="middle" fill="white">!</text></g>`).join('');
 const stops=entries.map(([id,p],i)=>`<button data-place="${id}">${i+1} · ${p.name} — ${p.district} ${id===target?'★ יעד המשימה':''}</button>`).join('');
 sheet(`<span class="kicker">מפרץ הדר · מפת העיר</span><h2 id="sheet-title">לאן נוסעים?</h2><svg class="district-map" style="display:block;height:auto;max-height:340px" viewBox="${west-4} ${north-4} ${width+8} ${height+8}" role="img" aria-label="מיקום השחקן, ${entries.length} יעדים ואירועי העיר"><rect x="${west}" y="${north}" width="${width}" height="128" fill="#c5ddc8"/><rect x="224" y="-224" width="128" height="224" fill="#cad6cf"/><rect x="224" y="0" width="128" height="188" fill="#ead8b6"/><rect x="${west}" y="${south}" width="${width}" height="32" fill="#74bec9"/><path d="${roads}" stroke="#eee5cf" stroke-width="6"/>${marks}${alerts}<circle cx="${city.x}" cy="${city.z}" r="5" fill="#ffcf54" stroke="#403b31"/></svg><p>● אתם כאן · ★ יעד המשימה${incidents.length?' · ⚠ אירועים פעילים':''}</p>${stops}<button id="close-map" class="cta">חזרה לעיר</button>`,'map');
 document.querySelectorAll('[data-place]').forEach(b=>b.onclick=()=>{closeSheet();const p=places[b.dataset.place];if(!world.go(p.x,p.z))toast('לא נמצא מסלול ליעד הזה. נסו להתקרב לרחוב.');});$('close-map').onclick=closeSheet;
}
$('map').onclick=map;
function dispatch(){
 if(mode!=='explore')return;
 const events=world.events();
 const reports=events.map((event,i)=>{
  const distance=Math.round(Math.hypot(city.x-event.observer.x,city.z-event.observer.z));
  return `<section class="city-report"><small>${incidentPhase[event.phase]} · ${esc(event.district)} · ${esc(event.place)}</small><h3>${esc(event.title)}</h3><p><b>${esc(event.stageLabel||incidentPhase[event.phase])}</b> · ${esc(event.crew||'')}</p><p>${esc(event.detail)}</p><p class="next-step">בהמשך — ${esc(event.nextStep||'חזרה לשגרה')}</p>${event.queued?`<p>כלי רכב בהמתנה: ${event.queued}</p>`:''}<button data-observe="${i}">נסיעה דחופה לזירה · ${distance} מ׳</button></section>`;
 }).join('');
 sheet(`<div class="kicker">רדיו המפרץ · דיווחי שטח</div><h2 id="sheet-title">מוקד העיר</h2>${reports||'<p>כרגע אין דיווחים פעילים.</p>'}<button class="cta" id="close-dispatch">חזרה לעיר</button>`,'dispatch');
 $('close-dispatch').onclick=()=>{closeSheet();$('dispatch').focus();};
 document.querySelectorAll('[data-observe]').forEach(b=>b.onclick=()=>{
  const event=events[Number(b.dataset.observe)],{observer}=event;closeSheet();
  if(!world.respondTo(event))toast('הגישה חסומה כרגע. אפשר לנסות שוב בהמשך.');
  else{city.driving=true;updateTarget();save();followedEvent=event.id;toast('נסיעה דחופה · בדרך לזירה');}
 });
}
$('dispatch').onclick=dispatch;
$('leave-scene').onclick=()=>{followedEvent=null;world.observe(null);world.stop();$('scene-guide').hidden=true;refresh();};
async function finish(){
 const attempt=round.attemptId,score=academicScore(round);world.target(null);world.celebrate();
 const bestKey='prepx-best-'+quiz.id;if(score>Number(read(localStorage,bestKey)||0))put(localStorage,bestKey,String(score));
 sheet(`<div class="kicker">✦ המשמרת הושלמה · שלוש מסירות</div><h2 id="sheet-title">פסטיבל המפרץ נפתח!</h2><div class="big-score">${score}/100</div><p>${'★'.repeat(starsFor(score))+'☆'.repeat(3-starsFor(score))} · ${esc(quiz.title)}</p><details><summary>התשובות וההסברים</summary>${round.questions.map(q=>`<p><b>${esc(q.prompt)}</b><br>התשובה שלכם: ${esc(q.choices[round.answers[q.id].choice])}<br>התשובה הנכונה: ${esc(q.choices[q.correct])}<br>${esc(q.explanation.he)}</p>`).join('')}</details><p id="saved" role="status">שומרים את התוצאה…</p><button id="watch" disabled>לצאת אל המופע ✦</button><button id="again" class="cta" disabled>למשמרת חדשה ←</button>`,'complete');
 const retry=async()=>{const btn=$('save-retry');if(btn)btn.disabled=true;
 try{const payload={id:attempt,name:round.participantName,quizId:quiz.id,contentHash:quizFingerprint(quiz),startedAt:round.startedAt,answers:Object.entries(round.answers).map(([id,a])=>({id,choice:a.choice}))};
 const res=await fetch('/api/afterbell/attempts',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload),signal:AbortSignal.timeout(6500)});if(!res.ok||!(await res.json()).saved)throw Error();
 $('saved').textContent='✓ התוצאה נשמרה בהיסטוריית המשחק.';btn?.remove();}catch{$('saved').textContent='השמירה לא הצליחה. המשמרת נשמרה בלשונית הזאת לניסיון חוזר.';if(!btn){const b=document.createElement('button');b.id='save-retry';b.textContent='לנסות לשמור שוב';b.onclick=retry;$('saved').after(b);}else btn.disabled=false;}finally{$('again').disabled=false;$('watch').disabled=false;}};
 await retry();$('watch').onclick=()=>{closeSheet();$('goal').textContent='פסטיבל המפרץ פתוח';$('action').textContent='לסיכום המשמרת';toast('יום הפסטיבל הסתיים בהצלחה. אפשר להמשיך לטייל בעיר.');};$('again').onclick=()=>{if($('save-retry')&&!confirm('התוצאה טרם נשמרה. להתחיל בכל זאת משמרת חדשה?'))return;try{sessionStorage.removeItem(DRAFT);}catch{}city=round=null;mode='menu';$('sheet').hidden=true;$('hud').hidden=true;$('hud').inert=false;$('welcome').hidden=false;$('resume').hidden=true;world.reset();};
}
let pointer=null;
function stick(e){const r=$('joystick').getBoundingClientRect(),x=(e.clientX-r.left-r.width/2)/30,z=(e.clientY-r.top-r.height/2)/30,d=Math.max(1,Math.hypot(x,z));world.setStick(x/d,z/d);$('joystick').firstElementChild.style.transform=`translate(${x/d*24}px,${z/d*24}px)`;}
$('joystick').onpointerdown=e=>{if(pointer!==null)return;pointer=e.pointerId;e.currentTarget.setPointerCapture(pointer);stick(e);};$('joystick').onpointermove=e=>{if(pointer===e.pointerId)stick(e);};
for(const type of ['pointerup','pointercancel','lostpointercapture'])$('joystick').addEventListener(type,e=>{if(pointer!==e.pointerId)return;pointer=null;world.setStick(0,0);$('joystick').firstElementChild.style.transform='';});
window.addEventListener('keydown',e=>{if(e.repeat)return;if(mode==='shop'&&e.code==='Escape'){$('leave-shop').click();return;}if(mode==='dispatch'&&e.code==='Escape'){$('close-dispatch').click();return;}if(mode==='map'&&e.code==='Escape'){closeSheet();return;}if(mode!=='explore')return;if(e.code==='KeyE')interact();if(e.code==='KeyV')$('vehicle').click();if(e.code==='KeyM')map();});
window.addEventListener('pagehide',save);
try{world=cityWorld($('scene'),(x,z,dt)=>{if(!city)return;city.x=x;city.z=z;round.elapsed+=dt;saveClock+=dt;if(saveClock>1){save();saveClock=0;}},kind=>toast(kind==='person'?'הולך רגל מעד · האטו ושמרו מרחק':'התנגשות ברכב · אפשר להמשיך לנסוע'));}
catch{toast('כדי להיכנס לעיר צריך דפדפן עם תמיכה בתלת־ממד.');}
setInterval(refresh,100);drawRoles();loadQuiz();
window.render_game_to_text=()=>JSON.stringify({mode,source,quiz:quiz.id,role:city?.role,stage:city?.stage,phase:city?.phase,coordinateSystem:'x east, z south; metres; x -240 to 352, z -352 to 188 at the waterfront',player:world?.getPlayer(),target:city?objective(city):null,driving:city?.driving,answered:round?Object.keys(round.answers).length:0,wallet:{coins:wallet.coins,equipped:wallet.equipped},life:world?.life(),rendering:{pixelRatio:world?.pixelRatio}});
window.advanceTime=ms=>{world?.advance(ms);refresh();};
