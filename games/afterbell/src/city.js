import {questionMedia} from '../../english-question-media.js';
import {prepareCargo} from './city-job.js';
import './city.css';
import {items,emptyWallet,pay,toggleItem,witness,streakBonus,bestStreak} from './city-wallet.js';
import snapshot from './content-snapshot.json';
import {validQuiz,makeRound,answer,progress,academicScore,starsFor,restoreRound} from './core.js';
import {quizFingerprint} from './fingerprint.js';
import {CAR_SPEED,CAR_TASKS,contracts,careerFrom,learningTasks,awardTask,completeContract,districtOpen,districtRequirement} from './city-discovery.js';
import {CAR_BRANDS} from './city-cars.js';
import {roles,places,objective,currentJob,inCity,CITY_BOUNDS,northSouthStreets,eastWestStreets,streetEnds} from './city-data.js';
import {cityWorld} from './city-world.js';

const $=id=>document.getElementById(id);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const DRAFT='prepx-festival-city-v1';
const read=(store,key)=>{try{return store.getItem(key);}catch{return null;}};
const put=(store,key,v)=>{try{store.setItem(key,v);}catch{}};
let mode='menu',quiz=snapshot.quizzes[0],source='snapshot',role='courier',round,city,world,loadId=0,saveClock=0,timer,feedback=null;
let followedEvent=null,career=careerFrom(null),careerStorageWarning=false;
function careerKey(){return 'prepx-city-discovery-v1:'+round.participantName;}
function persistCareer(){
 city.career=career;
 try{localStorage.setItem(careerKey(),JSON.stringify(career));}catch{if(!careerStorageWarning){toast('הגילויים זמינים בלשונית הזאת; השמירה במכשיר אינה זמינה.');careerStorageWarning=true;}}
 world.setCareer(career);save();
}
function reward(id){
 if(!awardTask(career,id))return;persistCareer();toast('✦ משימה הושלמה! '+career.done.length+' גילויים · בדקו מה נפתח בלוח הגילויים');ping($('discoveries'));
}
function activeObjective(){
 const task=contracts.find(t=>t.id===city.contract&&!career.done.includes(t.id));
 return task?{place:task.place,title:task.detail,action:'להשלים גילוי'}:objective(city);
}
function vehicleLabel(){
 const nearby=world.nearbyVehicle(),v=world.drivingState();
 const text=city.driving?'לצאת מהרכב':nearby?(nearby.available?'לקחת רכב':'רכב נעול'):'חפשו רכב';
 const name=city.driving?v.vehicle?.name:nearby?.name;
 const label=text+(name?'<small class="btn-sub" dir="ltr">'+esc(name)+'</small>':'');
 if($('vehicle').innerHTML!==label)$('vehicle').innerHTML=label;
 $('drive-controls').hidden=!city.driving;
 $('hud').classList.toggle('is-driving',city.driving);
 $('speed-readout').textContent=city.driving?v.speed+' קמ״ש · טורבו '+v.boost+'%':'התקרבו לרכב כדי לקחת אותו';
}
const incidentIcon={fight:'👮',fire:'🔥',crash:'🚗',jam:'🚧',spill:'📦',rescue:'🐱'};
const incidentPhase={reported:'דיווח ראשוני',responding:'צוות בדרך',working:'צוות במקום',clearing:'חזרה לשגרה'};
// Short attention animations on HUD controls; the CSS drops them under reduced motion.
function ping(el,cls='ping'){el.classList.remove(cls);void el.offsetWidth;el.classList.add(cls);setTimeout(()=>el.classList.remove(cls),900);}
function toast(msg){$('notice').textContent=msg;clearTimeout(timer);timer=setTimeout(()=>$('notice').textContent='',2600);}
function save(){if(city&&round){city.fleet=world?.fleetState();}if(city&&round)put(sessionStorage,DRAFT,JSON.stringify({city,round}));}
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
$('quiz').innerHTML=Object.entries({hebrew:'עברית',physics:'פיזיקה',english:'אנגלית'}).map(([id,label])=>`<optgroup label="${label}">${snapshot.quizzes.filter(q=>q.subject_id===id).map(q=>`<option value="${esc(q.id)}">${esc(q.title)}</option>`).join('')}</optgroup>`).join('');
const requested=new URLSearchParams(location.search).get('quiz')||savedQuiz;
if(snapshot.quizzes.some(q=>q.id===requested))$('quiz').value=requested;
$('player-name').value=read(localStorage,'prepx-afterbell-name')||'';
if(requested)$('campus-link').href='./campus.html?quiz='+encodeURIComponent(requested);
function drawRoles(){$('roles').innerHTML=Object.entries(roles).map(([id,r])=>`<button type="button" data-role="${id}" aria-pressed="${role===id}">${r.icon} ${r.name}<small class="role-car">משימות פותחות רכבים חדשים</small></button>`).join('');}
$('roles').onclick=e=>{const b=e.target.closest('[data-role]');if(b){role=b.dataset.role;drawRoles();}};
async function loadQuiz(){
 const id=$('quiz').value,version=++loadId;let q=snapshot.quizzes.find(q=>q.id===id),src='snapshot';$('start').disabled=true;$('resume').hidden=true;
 try{const res=await fetch('/api/afterbell/quizzes/'+encodeURIComponent(id),{signal:AbortSignal.timeout(3500)});if(res.ok){const live=await res.json();if(live.id===id&&validQuiz(live)){q=live;src='database';}}}catch{}
 if(loadId!==version)return;quiz=q;source=src;$('start').disabled=!world;const saved=restore();$('resume').hidden=!saved;if(saved)$('resume').textContent=`המשך המשמרת · ${roles[saved.city.role].icon} משימה ${Math.min(saved.city.stage+1,3)}/3`;$('campus-link').href='./campus.html?quiz='+encodeURIComponent(id);renderBest();
}
$('quiz').onchange=loadQuiz;
function renderBest(){
 const best=Number(read(localStorage,'prepx-best-'+quiz.id)||0),shifts=Number(read(localStorage,'prepx-city-shifts-'+quiz.id)||0);
 const unplayed=Object.keys(roles).filter(r=>read(localStorage,'prepx-city-shift-'+r)===null);
 const nudge=shifts&&unplayed.length?`<span class="nudge">💡 עוד משימות מגלות רכבים ואזורים חדשים. נסו משמרת ${esc(roles[unplayed[0]].name)}.</span>`:'';
 $('best').hidden=false;
 $('best').innerHTML=nudge+(shifts?`<b>${'★'.repeat(starsFor(best))+'☆'.repeat(3-starsFor(best))}</b> השיא שלכם: <b>${best}/100</b> · ${shifts===1?'משמרת אחת הושלמה':shifts+' משמרות הושלמו'}${best<100?' · אפשר לשפר!':' · שיא מושלם!'}`:'🚀 המשמרת הראשונה בנושא הזה · כל תשובה נכונה שווה מטבעות לחנות');
}
function setMissionTitle(title){
 $('goal').textContent=title;
 $('mission-summary').textContent=title;
}
const missionToggle=$('mission-toggle');
missionToggle.onclick=()=>missionToggle.setAttribute('aria-expanded',String(missionToggle.getAttribute('aria-expanded')==='false'));
function updateTarget(){const obj=activeObjective(),p=places[obj.place];world.target(p);world.cargo(city.phase==='deliver');
 $('chapter').textContent=roles[city.role].icon+' '+roles[city.role].name+' · משימה '+Math.min(city.stage+1,3)+' מתוך 3';
 const step=city.stage*2+(city.phase==='deliver'||city.phase==='quiz'?1:0);
 [...$('shift-bar').children].forEach((seg,i)=>{seg.className=step>=i*2+2?'done':step===i*2+1?'half':'';});
 setMissionTitle(obj.title);vehicleLabel();$('action').textContent=obj.action;$('pin').textContent=p.name;
}
function refresh(){
 if(!city||mode!=='explore')return;
 vehicleLabel();
 const o=activeObjective(),p=places[o.place],d=Math.hypot(city.x-p.x,city.z-p.z);
 $('action').hidden=d>4.3;
 const routeLabel=d<=4.3?'לבצע את הפעולה':world.moving()?'לעצור בדרך':'הובלה ליעד';
 if($('route').textContent!==routeLabel)$('route').textContent=routeLabel;
 const gate=city.x>215&&!districtOpen(career,225,city.z)?districtRequirement(225,city.z):city.z< -215&&!districtOpen(career,city.x,-225)?districtRequirement(city.x,-225):null;
 const status=gate?'🔒 '+gate.name+' · נדרשות '+gate.tasks+' משימות ובהן '+gate.learning+' קבוצות תרגול':d<=4.3?'הגעתם! לחצו על ״'+o.action+'״.':city.driving&&!world.moving()&&d<14?'היעד קרוב. צאו מהרכב והמשיכו ברגל.':world.yielding()?'מאטים ונותנים זכות קדימה.':p.district+' · '+Math.round(d)+' מטר · אפשר לנהוג או ללחוץ על הובלה.';
 if($('status').textContent!==status)$('status').textContent=status;
 const events=world.events(),count=String(events.length);
 if($('calls').textContent!==count){$('calls').textContent=count;$('dispatch').setAttribute('aria-label','מוקד העיר · דיווחים פעילים: '+count);$('dispatch').classList.toggle('alert',events.length>0);}
 const selected=events.find(e=>e.id===followedEvent);
 announceEvents(events,selected);
 if(selected&&!claimedWitness.has(selected.id)&&Math.hypot(city.x-selected.observer.x,city.z-selected.observer.z)<9){
  claimedWitness.add(selected.id);
  syncWallet(w=>{if(witness(w,round,selected.id))toast('📝 דיווח עדים נרשם · '+selected.title+' · +10 מטבעות');});
 }
 if(followedEvent&&!selected){followedEvent=null;toast('הדיווח נסגר. אפשר להמשיך במשמרת.');}
 const nearby=selected||events.find(e=>Math.hypot(e.x-city.x,e.z-city.z)<18);
 const report=nearby?(incidentIcon[nearby.type]||'📍')+' '+nearby.title+' · '+incidentPhase[nearby.phase]+' · '+Math.round(Math.hypot(nearby.x-city.x,nearby.z-city.z))+' מ׳':'';
 $('scene-report').hidden=!nearby;if($('scene-report').textContent!==report)$('scene-report').textContent=report;
 const pin=world.project(p);$('pin').hidden=!pin.visible;$('pin').style.left=pin.x+'px';$('pin').style.top=pin.y+'px';
}
const knownEvents=new Set(),claimedWitness=new Set();let followedPhase='';
// Say out loud when something new happens in the city, so the dispatch badge is not the only cue.
function announceEvents(events,selected){
 for(const e of events){
  if(knownEvents.has(e.id))continue;knownEvents.add(e.id);
  if(mode==='explore'&&knownEvents.size>1){toast((incidentIcon[e.type]||'🚨')+' דיווח חדש · '+e.title+' · '+e.district);ping($('dispatch'));}
 }
 if(selected){
  if(followedPhase&&followedPhase!==selected.phase&&mode==='explore')toast('עדכון מהשטח · '+selected.title+': '+incidentPhase[selected.phase]);
  followedPhase=selected.phase;
 }else followedPhase='';
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
  if($('coins').textContent!==String(wallet.coins)){$('coins').textContent=wallet.coins;if(mode==='explore')ping($('shop'),'bump');}
  world.outfit(roles[city.role].color,wallet.equipped,city.role);
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
 sheet(`<span class="kicker">ציוד למשמרת</span><h2 id="sheet-title">חנות הפסטיבל</h2><p>בארנק שלכם: <b>${wallet.coins} מטבעות</b></p><p>תשובה נכונה מזכה ב־5 מטבעות, כל שלוש נכונות ברצף ב־5 בונוס, השלמת מסירה ב־15 ודיווח עדים ממוקד העיר ב־10.</p><div class="stock-tabs" role="group" aria-label="סוג הציוד"><button id="hero-stock" aria-pressed="${!vehicle}">ציוד לדמות</button><button id="van-stock" aria-pressed="${vehicle}">המוסך</button></div>${listing}<button class="cta" id="leave-shop">חזרה לעיר</button>`,'shop');
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
 let stored;try{stored=JSON.parse(read(localStorage,careerKey()));}catch{}
 career=careerFrom(stored||city.career);
 if(!city.discoveryRevision){career.legacyEast ||= city.x>224;career.legacyNorth ||= city.z< -224;city.discoveryRevision=1;}
 if(!contracts.some(t=>t.id===city.contract&&!career.done.includes(t.id)))city.contract=null;
 if(!city.fleet&&city.driving)city.fleet={active:'parked-0',cars:[{id:'parked-0',x:city.x,z:city.z,heading:0}]};
 world.setCareer(career);world.restoreFleet(city.fleet);city.driving=Boolean(world.drivingState().vehicle);
 for(let i=0;i<city.stage;i++)awardTask(career,round.attemptId+':delivery:'+i);
 persistCareer();
 missionToggle.setAttribute('aria-expanded','false');$('welcome').hidden=true;$('hud').hidden=false;mode='explore';followedEvent=null;world.start(city.x,city.z,round.elapsed);syncWallet();updateTarget();refresh();save();
 if(city.phase==='quiz')question();if(city.phase==='complete')finish();
}
$('entry').onsubmit=e=>{e.preventDefault();start(false);};$('player-name').oninput=()=>$('player-name').setCustomValidity('');$('resume').onclick=()=>start(true);
function sheet(html,nextMode){
 clearTimeout(timer);$('notice').textContent='';
 world.setPaused(true);mode=nextMode;$('sheet').hidden=false;$('hud').inert=true;$('sheet-body').innerHTML=html;$('sheet').scrollTop=0;
 const focus=$('sheet-title');if(focus){focus.tabIndex=-1;focus.focus({preventScroll:true});}
}
function closeSheet(){mode='explore';$('sheet').hidden=true;$('hud').inert=false;world.setPaused(false);updateTarget();refresh();(missionToggle.offsetWidth&&missionToggle.getAttribute('aria-expanded')==='false'?missionToggle:$('route')).focus({preventScroll:true});}
function reference(q){
 const ref=quiz.references.find(r=>r.id===q.ref.id);if(!ref)return '';
 const u=new URL(ref.url||'/subject.html?subject='+quiz.subject_id,'https://hitech.agnon.online');return ['https:','http:'].includes(u.protocol)?`<a href="${esc(u.href)}" target="_blank" rel="noopener">מקור: ${esc(ref.title)} ${esc(q.ref.part||'')} ↗</a>`:'';
}
let streak=0;
function question(){
 const index=city.stage,p=progress(round,index);
 if(!p.next&&!feedback){reward(round.attemptId+':delivery:'+city.stage);city.stage++;syncWallet();city.phase=city.stage===3?'final':'pickup';save();closeSheet();toast(city.stage===3?'כל העיר מוכנה! קיבלתם 15 מטבעות.':'המסירה הושלמה · קיבלתם 15 מטבעות.');return;}
 const q=round.questions.find(q=>q.id===(feedback||p.next)),a=round.answers[q.id],job=currentJob(city);
 sheet(`<div class="kicker">✓ ${esc(job[2])} הגיע ליעד · ${esc(quiz.title)}</div><h2 id="sheet-title" dir="auto">${esc(q.prompt)}</h2>${questionMedia(q)}<small class="q-meta"><span>שאלת תרגול · ${p.answered+(a?0:1)} מתוך ${p.total} במסירה הזאת</span><span class="q-coins">🪙 ${wallet.coins}</span></small>
 ${q.options.map(o=>`<button data-opt="${o.original}" ${a?'disabled':''} class="${a&&o.original===q.correct?'right':a&&o.original===a.choice?'wrong':''}"><bdi>${esc(o.text)}</bdi></button>`).join('')}
 ${a?`<div class="explain" role="status"><b>${a.correct?'נכון! +5 מטבעות':'הפעם התשובה שונה.'}</b>${a.correct&&streak>=2?`<p class="streak">🔥 ${streak} נכונות ברצף${streak%3===0?' · +5 בונוס':streak%3===2?' · עוד אחת לבונוס':''}</p>`:''}<p>${esc(q.explanation.he)}</p>${q.explanation.en?`<p dir="ltr" lang="en">${esc(q.explanation.en)}</p>`:''}${reference(q)}</div><button id="next-q" class="cta">${p.next?'לשאלה הבאה':'המסירה הושלמה · +15 🪙 · להמשיך'} ←</button>`:reference(q)}`,'question');
 document.querySelectorAll('[data-opt]').forEach(b=>b.onclick=()=>{if(answer(round,q.id,Number(b.dataset.opt))){streak=round.answers[q.id]?.correct?streak+1:0;feedback=city.feedback=q.id;save();syncWallet();question();}});
 if($('next-q'))$('next-q').onclick=()=>{feedback=city.feedback=null;save();question();};
}
function interact(){
 if(mode!=='explore')return;const o=activeObjective(),p=places[o.place];if(Math.hypot(city.x-p.x,city.z-p.z)>4.3)return;
 world.stop();if(city.contract){
  const task=contracts.find(t=>t.id===city.contract);
  if(!completeContract(career,city.contract,city,places)){toast(task.drive?'הגיעו לנקודה בתוך רכב.':'צאו מהרכב והגיעו לנקודה ברגל.');return;}
  city.contract=null;persistCareer();updateTarget();refresh();toast('✦ גילוי הושלם! '+career.done.length+' משימות · בדקו רכבים ואזורים חדשים בלוח');return;
 }if(city.stage===3){city.phase='complete';save();finish();return;}
 if(city.phase==='pickup'){prepareCargo(city,sheet,()=>{city.phase='deliver';save();closeSheet();toast('הציוד איתכם. עכשיו '+objective(city).title);},closeSheet);return;}
 city.phase='quiz';save();question();
}
$('action').onclick=interact;
$('route').onclick=()=>{if(mode!=='explore')return;if(missionToggle.getAttribute('aria-expanded')==='true'){missionToggle.setAttribute('aria-expanded','false');missionToggle.focus({preventScroll:true});}const p=places[activeObjective().place];if(Math.hypot(city.x-p.x,city.z-p.z)<=4.3){interact();return;}if(world.moving())world.stop();else if(!world.go(p.x,p.z))toast('הדרך חסומה. נסו לצאת לרחוב.');refresh();};
$('vehicle').onclick=()=>{if(mode!=='explore')return;const result=world.toggleVehicle();if(result.error){toast(result.error);return;}city.driving=result.driving;save();updateTarget();refresh();toast(city.driving?world.carName()+' · Shift לטורבו, רווח לבלימה':'הרכב נשאר כאן. אפשר לקחת רכב אחר.');};
function discoveryBoard(){
 const count=career.done.length,learning=learningTasks(career);
 const tasks=contracts.map(t=>{const p=places[t.place],done=career.done.includes(t.id),open=districtOpen(career,p.x,p.z),r=districtRequirement(p.x,p.z);return `<section class="discovery-task"><strong>${done?'✓':'◇'} ${esc(t.name)}</strong><p>${esc(t.detail)}</p>${done?'<small>הושלם</small>':open?`<button data-contract="${t.id}">לצאת למשימה · ${Math.round(Math.hypot(city.x-p.x,city.z-p.z))} מ׳</button>`:`<small>🔒 ${r.tasks} משימות ובהן ${r.learning} קבוצות תרגול</small>`}</section>`;}).join('');
 const cars=Object.entries(CAR_TASKS).map(([id,n])=>`<li>${count>=n?'✓':'🔒'} <bdi>${esc(CAR_BRANDS[id].name)}</bdi> · ${n===0?'זמין מההתחלה':n+' משימות'} · ${Math.round(CAR_SPEED[id]*3.6)} קמ״ש במשחק</li>`).join('');
 sheet(`<div class="kicker">גלו · תרגלו · פתחו דרכים</div><h2 id="sheet-title">לוח הגילויים</h2><p>${count} משימות הושלמו · ${learning} קבוצות תרגול</p><p>כל מסירה עם כל שאלות התרגול שלה שווה משימה. גם הגילויים שלמטה פותחים רכבים. טעויות לא עוצרות את ההתקדמות.</p><button id="main-job">לחזור למשמרת ולתרגול</button><h3>העיר מתרחבת איתכם</h3><p>${districtOpen(career,0,-250)?'✓':'🔒'} הצפון · 3 משימות ובהן קבוצת תרגול אחת<br>${districtOpen(career,250,0)?'✓':'🔒'} נמל המזרח · 6 משימות ובהן 2 קבוצות תרגול</p>${tasks}<h3>הרכבים שתוכלו לקחת ברחוב</h3><ul class="car-unlocks">${cars}</ul><button id="close-discoveries" class="cta">חזרה לעיר</button>`,'discoveries');
 $('main-job').onclick=()=>{city.contract=null;save();closeSheet();};
 $('close-discoveries').onclick=closeSheet;
 document.querySelectorAll('[data-contract]').forEach(b=>b.onclick=()=>{city.contract=b.dataset.contract;save();closeSheet();const p=places[activeObjective().place];world.go(p.x,p.z);refresh();});
}
$('discoveries').onclick=()=>{if(mode==='explore')discoveryBoard();};
for(const [id,set] of [['boost',v=>world.setBoost(v)],['brake',v=>world.setBrake(v)]]){
 const b=$(id);b.onpointerdown=e=>{b.setPointerCapture(e.pointerId);set(true);};
 for(const type of ['pointerup','pointercancel','lostpointercapture'])b.addEventListener(type,()=>set(false));
}

function map(){
 const {west,east,north,south}=CITY_BOUNDS,width=east-west,height=south-north+32;
 const target=activeObjective().place,entries=Object.entries(places);
 const incidents=world.events?.()||[];
 const roads=[...northSouthStreets.map(x=>`M${x} ${streetEnds.north}V${streetEnds.south}`),...eastWestStreets.map(z=>`M${west} ${z}H${east}`)].join(' ');
 const marks=entries.map(([id,p],i)=>`<circle cx="${p.x}" cy="${p.z}" r="12" fill="${!districtOpen(career,p.x,p.z)?'#88918e':id===target?'#b74929':'#27675e'}"/><text x="${p.x}" y="${p.z+5}" font-size="16" fill="white" text-anchor="middle">${i+1}</text>`).join('');
 const alerts=incidents.map(event=>`<g transform="translate(${event.x} ${event.z})"><title>${esc(event.title)}</title><path d="M0 -9L9 8H-9Z" fill="#a53428" stroke="white"/><text y="5" font-size="11" text-anchor="middle" fill="white">!</text></g>`).join('');
 const cars=world.vehicles().filter(v=>v.parked&&v.id!==world.drivingState().vehicle?.id&&districtOpen(career,v.x,v.z)).sort((a,b)=>Math.hypot(a.x-city.x,a.z-city.z)-Math.hypot(b.x-city.x,b.z-city.z)).slice(0,12);
 const carStops=cars.map((v,i)=>`<button data-car="${i}">${v.available?'🚘':'🔒'} <bdi>${esc(v.name)}</bdi> · ${Math.round(Math.hypot(v.x-city.x,v.z-city.z))} מ׳ · ${Math.round(CAR_SPEED[v.brand]*3.6)} קמ״ש${v.available?'':' · '+CAR_TASKS[v.brand]+' משימות'}</button>`).join('');
 const stops=entries.map(([id,p],i)=>`<button data-place="${id}" ${districtOpen(career,p.x,p.z)?'':'disabled'}>${districtOpen(career,p.x,p.z)?'':'🔒 '}${i+1} · ${p.name} — ${p.district} ${id===target?'★ יעד המשימה':''}</button>`).join('');
 sheet(`<span class="kicker">מפרץ הדר · מפת העיר</span><h2 id="sheet-title">לאן נוסעים?</h2><svg class="district-map" style="display:block;height:auto;max-height:340px" viewBox="${west-4} ${north-4} ${width+8} ${height+8}" role="img" aria-label="מיקום השחקן, ${entries.length} יעדים ואירועי העיר"><rect x="${west}" y="${north}" width="${width}" height="128" fill="#c5ddc8"/><rect x="224" y="-224" width="128" height="224" fill="#cad6cf"/><rect x="224" y="0" width="128" height="188" fill="#ead8b6"/><rect x="${west}" y="${south}" width="${width}" height="32" fill="#74bec9"/><path d="${roads}" stroke="#eee5cf" stroke-width="6"/>${marks}${alerts}<circle cx="${city.x}" cy="${city.z}" r="5" fill="#ffcf54" stroke="#403b31"/></svg><p>אזורים אפורים נעולים. הצפון: 3 משימות + תרגול. הנמל: 6 משימות + 2 תרגולים.</p><p>● אתם כאן · ★ יעד המשימה${incidents.length?' · ⚠ אירועים פעילים':''}</p>${stops}<h3>רכבים חונים בסביבה</h3>${carStops}<button id="close-map" class="cta">חזרה לעיר</button>`,'map');
 document.querySelectorAll('[data-car]').forEach(b=>b.onclick=()=>{const v=cars[Number(b.dataset.car)];closeSheet();world.seekCar(v.id);world.go(v.x,v.z);toast(v.available?'התקרבו לרכב ולחצו על לקיחת רכב.':'אפשר לראות את הרכב. כדי לקחת אותו נדרשות '+CAR_TASKS[v.brand]+' משימות.');});
 document.querySelectorAll('[data-place]').forEach(b=>b.onclick=()=>{closeSheet();const p=places[b.dataset.place];if(!world.go(p.x,p.z))toast('לא נמצא מסלול ליעד הזה. נסו להתקרב לרחוב.');});$('close-map').onclick=closeSheet;
}
$('map').onclick=map;
function dispatch(){
 if(mode!=='explore')return;
 const events=world.events();
 const reports=events.map((event,i)=>({event,i,distance:Math.round(Math.hypot(city.x-event.observer.x,city.z-event.observer.z))})).sort((a,b)=>a.distance-b.distance).map(({event,i,distance})=>{
  const following=event.id===followedEvent;
  return `<section class="city-report${following?' following':''}">${following?'<div class="kicker">● בדרך לשם</div>':''}<small>${incidentPhase[event.phase]} · ${esc(event.district)} · ${esc(event.place)}</small><h3>${incidentIcon[event.type]||'📍'} ${esc(event.title)}</h3><p>${esc(event.detail)}</p>${event.queued?`<p>כלי רכב בהמתנה: ${event.queued}</p>`:''}<button data-observe="${i}" ${districtOpen(career,event.observer.x,event.observer.z)?'':'disabled'}>${districtOpen(career,event.observer.x,event.observer.z)?'':'🔒 האזור עדיין נעול · '}${wallet.earnings[round.attemptId+':witness:'+event.id]?'':'+10 🪙 · '}הובלה לנקודת תצפית · ${distance} מ׳</button></section>`;
 }).join('');
 sheet(`<div class="kicker">רדיו המפרץ · דיווחי שטח</div><h2 id="sheet-title">מוקד העיר</h2>${reports||'<p>כרגע אין דיווחים פעילים.</p>'}<button class="cta" id="close-dispatch">חזרה לעיר</button>`,'dispatch');
 $('close-dispatch').onclick=()=>{closeSheet();$('dispatch').focus();};
 document.querySelectorAll('[data-observe]').forEach(b=>b.onclick=()=>{
  const event=events[Number(b.dataset.observe)],{observer}=event;closeSheet();
  if(!world.go(observer.x,observer.z))toast('הגישה חסומה כרגע. אפשר לנסות שוב בהמשך.');
  else{world.observe(event.id);followedEvent=event.id;toast('בדרך לנקודת תצפית · המשימה נשמרת.');}
 });
}
$('dispatch').onclick=dispatch;
let finishSaved=null;
async function finish(){
 const attempt=round.attemptId,score=academicScore(round);world.target(null);world.celebrate();finishSaved=null;
 const bestKey='prepx-best-'+quiz.id,previous=Number(read(localStorage,bestKey)||0),record=score>previous;if(record)put(localStorage,bestKey,String(score));
 const shiftsKey='prepx-city-shifts-'+quiz.id,countedKey='prepx-city-counted-'+attempt;
 if(!read(localStorage,countedKey)){put(localStorage,shiftsKey,String(Number(read(localStorage,shiftsKey)||0)+1));put(localStorage,countedKey,'1');}
 const wrong=round.questions.filter(q=>!round.answers[q.id]?.correct);
 const render=()=>{
  const earned=Object.entries(wallet.earnings).filter(([k])=>k===attempt||k.startsWith(attempt+':witness:')).reduce((n,[,v])=>n+v,0);
  const witnessed=Object.keys(wallet.earnings).filter(k=>k.startsWith(attempt+':witness:')).length,correct=round.questions.length-wrong.length;
  const stats=`<div class="shift-stats"><div><b>${correct}/${round.questions.length}</b><small>תשובות נכונות</small></div><div><b>🔥 ${bestStreak(round)}</b><small>הרצף הארוך</small></div><div><b>${earned} 🪙</b><small>מטבעות מהמשמרת</small></div><div><b>${witnessed}</b><small>דיווחי עדים</small></div></div>`;
  sheet(`<div class="kicker">✦ המשמרת הושלמה · שלוש מסירות</div><h2 id="sheet-title">פסטיבל המפרץ נפתח!</h2><div class="big-score">${score}/100</div><p>${'★'.repeat(starsFor(score))+'☆'.repeat(3-starsFor(score))} · ${esc(quiz.title)}${record&&previous?' · <b class="record">🏆 שיא חדש!</b>':''}</p>${stats}${wrong.length?`<button id="review-wrong" class="review-btn">📚 לחזור על ${wrong.length===1?'הטעות':'ה־'+wrong.length+' טעויות'} · בלי לחץ, בלי מטבעות</button>`:'<p class="perfect">💯 כל התשובות נכונות. אין מה לחזור עליו!</p>'}<details><summary>התשובות וההסברים</summary>${round.questions.map(q=>`<p><b>${esc(q.prompt)}</b><br>התשובה שלכם: ${esc(q.choices[round.answers[q.id].choice])}<br>התשובה הנכונה: ${esc(q.choices[q.correct])}<br>${esc(q.explanation.he)}</p>`).join('')}</details><p id="saved" role="status">${finishSaved?esc(finishSaved.text):'שומרים את התוצאה…'}</p><button id="watch" ${finishSaved?'':'disabled'}>לצאת אל המופע ✦</button><button id="again" class="cta" ${finishSaved?'':'disabled'}>למשמרת חדשה ←</button>`,'complete');
  if(finishSaved?.retry)addRetry();
  if($('review-wrong'))$('review-wrong').onclick=()=>reviewWrong(wrong,0,0,render);
  $('watch').onclick=()=>{closeSheet();setMissionTitle('פסטיבל המפרץ פתוח');$('action').textContent='לסיכום המשמרת';toast('יום הפסטיבל הסתיים בהצלחה. אפשר להמשיך לטייל בעיר.');};
  $('again').onclick=()=>{if($('save-retry')&&!confirm('התוצאה טרם נשמרה. להתחיל בכל זאת משמרת חדשה?'))return;try{sessionStorage.removeItem(DRAFT);}catch{}city=round=null;mode='menu';$('sheet').hidden=true;$('hud').hidden=true;$('hud').inert=false;$('welcome').hidden=false;$('resume').hidden=true;world.reset();};
 };
 const addRetry=()=>{if($('save-retry')||!$('saved'))return;const b=document.createElement('button');b.id='save-retry';b.textContent='לנסות לשמור שוב';b.onclick=retry;$('saved').after(b);};
 const retry=async()=>{const btn=$('save-retry');if(btn)btn.disabled=true;
 try{const payload={id:attempt,name:round.participantName,quizId:quiz.id,contentHash:quizFingerprint(quiz),startedAt:round.startedAt,answers:Object.entries(round.answers).map(([id,a])=>({id,choice:a.choice}))};
 const res=await fetch('/api/afterbell/attempts',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload),signal:AbortSignal.timeout(6500)});if(!res.ok||!(await res.json()).saved)throw Error();
 finishSaved={text:'✓ התוצאה נשמרה בהיסטוריית המשחק.',retry:false};if($('saved'))$('saved').textContent=finishSaved.text;btn?.remove();}
 catch{finishSaved={text:'השמירה לא הצליחה. המשמרת נשמרה בלשונית הזאת לניסיון חוזר.',retry:true};if($('saved'))$('saved').textContent=finishSaved.text;if(!btn)addRetry();else btn.disabled=false;}
 finally{if(mode==='complete'){$('again').disabled=false;$('watch').disabled=false;}}};
 render();await retry();
}
// Re-ask the questions answered wrongly, with the same shuffled options and the
// explanation after each one. Nothing is scored or paid: this is for remembering.
function reviewWrong(wrong,i,got,back){
 if(i>=wrong.length){toast(`החזרה הושלמה · ${got} מתוך ${wrong.length} נכונות עכשיו 💪`);back();return;}
 const q=wrong[i];let picked=null;
 const draw=()=>{
  const done=picked!==null;
  sheet(`<div class="kicker">📚 חזרה על הטעויות · ${i+1} מתוך ${wrong.length}</div><h2 id="sheet-title" dir="auto">${esc(q.prompt)}</h2>${questionMedia(q)}<small class="q-meta"><span>בפעם הקודמת: ${esc(q.choices[round.answers[q.id].choice])}</span><span>בלי מטבעות</span></small>
 ${q.options.map(o=>`<button data-opt="${o.original}" ${done?'disabled':''} class="${done&&o.original===q.correct?'right':done&&o.original===picked?'wrong':''}"><bdi>${esc(o.text)}</bdi></button>`).join('')}
 ${done?`<div class="explain" role="status"><b>${picked===q.correct?'נכון! עכשיו זה יושב.':'עדיין לא. התשובה הנכונה מסומנת.'}</b><p>${esc(q.explanation.he)}</p>${q.explanation.en?`<p dir="ltr" lang="en">${esc(q.explanation.en)}</p>`:''}${reference(q)}</div><button id="next-q" class="cta">${i+1<wrong.length?'לשאלה הבאה':'לסיכום המשמרת'} ←</button>`:`<button id="skip-review" class="link-btn">לדלג לסיכום</button>`}`,'review');
  document.querySelectorAll('[data-opt]').forEach(b=>b.onclick=()=>{picked=Number(b.dataset.opt);if(picked===q.correct)got++;draw();});
  if($('next-q'))$('next-q').onclick=()=>reviewWrong(wrong,i+1,got,back);
  if($('skip-review'))$('skip-review').onclick=back;
 };
 draw();
}
let pointer=null;
function stick(e){const r=$('joystick').getBoundingClientRect(),x=(e.clientX-r.left-r.width/2)/30,z=(e.clientY-r.top-r.height/2)/30,d=Math.max(1,Math.hypot(x,z));world.setStick(x/d,z/d);$('joystick').firstElementChild.style.transform=`translate(${x/d*24}px,${z/d*24}px)`;}
$('joystick').onpointerdown=e=>{if(pointer!==null)return;pointer=e.pointerId;e.currentTarget.setPointerCapture(pointer);stick(e);};$('joystick').onpointermove=e=>{if(pointer===e.pointerId)stick(e);};
for(const type of ['pointerup','pointercancel','lostpointercapture'])$('joystick').addEventListener(type,e=>{if(pointer!==e.pointerId)return;pointer=null;world.setStick(0,0);$('joystick').firstElementChild.style.transform='';});
window.addEventListener('keydown',e=>{if(e.repeat)return;if(mode==='discoveries'&&e.code==='Escape'){closeSheet();return;}if(mode==='shop'&&e.code==='Escape'){$('leave-shop').click();return;}if(mode==='dispatch'&&e.code==='Escape'){$('close-dispatch').click();return;}if(mode==='map'&&e.code==='Escape'){closeSheet();return;}if(mode==='question'||mode==='review'){const n=Number(e.key);if(n>=1&&n<=4){const opts=document.querySelectorAll('[data-opt]');opts[n-1]?.click();}if(e.key==='Enter'&&$('next-q'))$('next-q').click();return;}if(mode!=='explore')return;if(e.code==='KeyE')interact();if(e.code==='KeyV')$('vehicle').click();if(e.code==='KeyM')map();if(e.code==='KeyJ')discoveryBoard();if(e.code==='KeyF'){if(document.fullscreenElement)document.exitFullscreen?.();else document.documentElement.requestFullscreen?.();}});
window.addEventListener('pagehide',save);
try{world=cityWorld($('scene'),(x,z,dt)=>{if(!city)return;city.x=x;city.z=z;round.elapsed+=dt;saveClock+=dt;if(saveClock>1){save();saveClock=0;}},()=>toast('התנגשות ברכב · אפשר להמשיך לנסוע'));}
catch{toast('כדי להיכנס לעיר צריך דפדפן עם תמיכה בתלת־ממד.');}
setInterval(refresh,100);drawRoles();loadQuiz();
window.render_game_to_text=()=>JSON.stringify({mode,source,quiz:quiz.id,role:city?.role,stage:city?.stage,phase:city?.phase,coordinateSystem:'x east, z south; metres; x -240 to 352, z -352 to 188 at the waterfront',player:world?.getPlayer(),target:city?activeObjective():null,driving:city?.driving,discovery:{...career,learning:learningTasks(career),contract:city?.contract},vehicle:world?.drivingState(),nearbyVehicle:world?.nearbyVehicle(),vehicles:world?.vehicles(),answered:round?Object.keys(round.answers).length:0,wallet:{coins:wallet.coins,equipped:wallet.equipped},life:world?.life(),rendering:{pixelRatio:world?.pixelRatio}});
window.advanceTime=ms=>{world?.advance(ms);refresh();};
