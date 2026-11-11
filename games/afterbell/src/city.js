import {questionMedia} from '../../english-question-media.js';
import {prepareCargo} from './city-job.js';
import './city.css';
import {items,emptyWallet,pay,toggleItem,witness,streakBonus,bestStreak,itemOpen,newlyUnlocked,nextUnlock} from './city-wallet.js';
import snapshot from './content-snapshot.json';
import {validQuiz,makeRound,answer,progress,academicScore,starsFor,restoreRound} from './core.js';
import {quizFingerprint} from './fingerprint.js';
import {CAR_SPEED,CAR_TASKS,contracts,careerFrom,learningTasks,awardTask,completeContract,districtOpen,districtRequirement} from './city-discovery.js';
import {CAR_BRANDS} from './city-cars.js';
import {roles,places,objective,currentJob,inCity,CITY_BOUNDS,northSouthStreets,eastWestStreets,streetEnds} from './city-data.js';
import {cityWorld} from './city-world.js';
import {emptyProgress,progressFrom,levelFor,apply,learningGain,recordRace,dailyStatus,BADGES,XP} from './city-progress.js';
import {createPlay,RACES,MEDALS,MEDAL_ICON,formatTime,zoneOf,ZONE_NAMES,ZONE_BONUS} from './city-activities.js';
import {cityAudio} from './city-audio.js';
import {mountCarPreview} from './city-car-preview.js';
import {UPGRADES,MAX_TIER,upgradesFrom,nextTier,buyUpgrade,totalTiers,carStats,carRating} from './city-upgrades.js';
// Two small bars per car: speed and handling, with the player's garage upgrades applied.
function carBars(brand){const r=carRating(brand,wallet.upgrades),bar=(name,v)=>`<span class="car-stat" role="img" aria-label="${name} ${Math.round(v*10)} מתוך 10"><small>${name}</small><i><b style="width:${Math.round(v*100)}%"></b></i></span>`;return `<span class="car-stats">${bar('מהירות',r.speed)}${bar('שליטה',r.handling)}</span>`;}

const $=id=>document.getElementById(id);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const DRAFT='prepx-festival-city-v1';
const read=(store,key)=>{try{return store.getItem(key);}catch{return null;}};
const put=(store,key,v)=>{try{store.setItem(key,v);}catch{}};
let mode='menu',quiz=snapshot.quizzes[0],source='snapshot',role='courier',round,city,world,loadId=0,saveClock=0,timer,feedback=null;
let followedEvent=null,career=careerFrom(null),careerStorageWarning=false;
let saga=emptyProgress(),play=null,driven=0,lastSpot=null,weatherSeen='';
const audio=cityAudio(),near=(a,b)=>Math.hypot(a.x-b.x,a.z-b.z);
function progressKey(){return 'prepx-city-progress-v1:'+round.participantName;}
function loadProgress(name){try{return progressFrom(JSON.parse(localStorage.getItem('prepx-city-progress-v1:'+name)));}catch{return emptyProgress();}}
function saveProgress(){try{localStorage.setItem(progressKey(),JSON.stringify(saga));}catch{}}
// Floating reward lines: several can show at once, unlike the single status toast.
function pop(text,kind=''){
 const fx=$('fx'),el=document.createElement('div');el.className='pop '+kind;el.textContent=text;fx.append(el);
 while(fx.children.length>4)fx.firstElementChild.remove();
 setTimeout(()=>el.remove(),kind==='big'?4200:2600);
}
function drawRank(){
 const l=levelFor(saga.xp),done=dailyStatus(saga).filter(c=>c.done).length;
 $('rank-level').textContent=l.level;$('rank-title').textContent=l.title;
 $('rank-sub').textContent=(l.max?'הדרגה הגבוהה ביותר':'עוד '+(l.span-l.into)+' נק׳ לדרגה הבאה')+' · אתגרים '+done+'/3';
 $('xp-fill').style.width=(l.max?100:Math.round(l.into/l.span*100))+'%';
}
// Every reward goes through here: experience, statistics, coins, and whatever they unlock.
function gain(change,coins=0){
 if(!round)return;
 const result=apply(saga,change,{totalStars:world.stars().length,totalRaces:RACES.length}),total=coins+result.coins;
 saveProgress();
 if(total)syncWallet(w=>{w.coins+=total;});
 if(result.xp)pop('+'+result.xp+' XP','xp');
 if(coins)pop('+'+coins+' 🪙','coin');
 for(const e of result.events){
  if(e.type==='level'){pop('⭐ דרגה '+e.level+' · '+e.title+' · +'+e.coins+' 🪙','big');audio.play('level');}
  else if(e.type==='daily'){pop('✓ אתגר יומי · '+e.label+' · +'+e.coins+' 🪙','daily');audio.play('finish');}
  else if(e.type==='sweep')pop('🎉 כל אתגרי היום הושלמו · +'+e.coins+' 🪙','big');
  else if(e.type==='badge')pop(e.icon+' תג חדש · '+e.name+' · +'+e.coins+' 🪙','daily');
 }
 drawRank();
}
function learn(result=null){const g=learningGain(saga,round,city.stage,result);if(g)gain(g);}
function careerKey(){return 'prepx-city-discovery-v1:'+round.participantName;}
function persistCareer(){
 city.career=career;
 try{localStorage.setItem(careerKey(),JSON.stringify(career));}catch{if(!careerStorageWarning){toast('הגילויים זמינים בלשונית הזאת; השמירה במכשיר אינה זמינה.');careerStorageWarning=true;}}
 world.setCareer(career);save();
}
// Missions put shop items on sale. Only a live completion calls this, never a restore.
function announceUnlocks(before){
 const fresh=newlyUnlocked(before,career.done.length,levelFor(saga.xp).level);if(!fresh.length)return;
 pop('🛍️ חדש בחנות: '+fresh.map(i=>i.name).join(' · '),'big');$('shop').classList.add('fresh');$('mission-toggle').classList.add('fresh');ping($('shop'));
}
function reward(id){
 const before=career.done.length;if(!awardTask(career,id))return;persistCareer();announceUnlocks(before);toast('✦ משימה הושלמה! '+career.done.length+' גילויים · בדקו מה נפתח בלוח הגילויים');ping($('discoveries'));
}
// What the player is heading to right now: an activity in progress, a chosen waypoint,
// an exploration contract or the shift's own delivery. `point` may be null in free roam.
function activeObjective(){
 const live=play?.target();
 if(live){
  const st=play.state();
  return {point:live,auto:true,action:'',title:st.run?'🏁 '+st.run.name+' · '+live.name:(st.gig.kind==='ride'?'🚕 ':'⚡ ')+st.gig.who+' ← '+st.gig.toName};
 }
 if(city.waypoint)return {point:city.waypoint,auto:true,action:'',title:'בדרך אל '+city.waypoint.name};
 const task=contracts.find(t=>t.id===city.contract&&!career.done.includes(t.id));
 if(task)return {place:task.place,point:places[task.place],title:task.detail,action:'להשלים גילוי'};
 if(city.phase==='complete')return {point:null,action:'',title:'העיר פתוחה · הסעות, מרוצים וכוכבים'};
 const o=objective(city);return {...o,point:places[o.place]};
}
// The one action button serves the nearest thing that can be done here.
function contextAction(){
 const o=activeObjective();
 if(o.point&&!o.auto&&near(city,o.point)<=4.3)return {kind:'mission',label:o.action};
 return play?.near({x:city.x,z:city.z,driving:city.driving})||null;
}
function drawAction(){
 const a=mode==='explore'?contextAction():null;$('action').hidden=!a;
 if(a&&$('action').textContent!==a.label)$('action').textContent=a.label;
 $('action').classList.toggle('side',Boolean(a&&a.kind!=='mission'));
}
function vehicleLabel(){
 const nearby=world.nearbyVehicle(),v=world.drivingState();
 const text=city.driving?'לצאת מהרכב':nearby?(nearby.available?'לקחת רכב':'רכב נעול'):'חפשו רכב';
 const name=city.driving?v.vehicle?.name:nearby?.name;
 const label=text+(name?'<small class="btn-sub" dir="ltr">'+esc(name)+'</small>':'');
 if($('vehicle').innerHTML!==label)$('vehicle').innerHTML=label;
 $('drive-controls').hidden=!city.driving;
 $('hud').classList.toggle('is-driving',city.driving);
 $('speed-readout').textContent=city.driving?v.speed+(totalTiers(v.upgrades)?' / '+v.topSpeed:'')+' קמ״ש · טורבו '+v.boost+'%'+(totalTiers(v.upgrades)?' · 🔧'+totalTiers(v.upgrades):''):'התקרבו לרכב כדי לקחת אותו';
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
 const name=$('player-name').value.trim(),mine=name?loadProgress(name):null,rank=mine&&levelFor(mine.xp);
 const teaser=mine&&mine.xp?`<span class="rank-teaser">⭐ דרגה ${rank.level} · ${esc(rank.title)} · אתגרי היום ${dailyStatus(mine).filter(c=>c.done).length}/3 · ${mine.stars.length} כוכבים</span>`:'';
 $('best').innerHTML=teaser+nudge+(shifts?`<b>${'★'.repeat(starsFor(best))+'☆'.repeat(3-starsFor(best))}</b> השיא שלכם: <b>${best}/100</b> · ${shifts===1?'משמרת אחת הושלמה':shifts+' משמרות הושלמו'}${best<100?' · אפשר לשפר!':' · שיא מושלם!'}`:'🚀 המשמרת הראשונה בנושא הזה · כל תשובה נכונה שווה מטבעות לחנות');
}
function setMissionTitle(title){
 $('goal').textContent=title;
 $('mission-summary').textContent=title;
}
const missionToggle=$('mission-toggle');
missionToggle.onclick=()=>missionToggle.setAttribute('aria-expanded',String(missionToggle.getAttribute('aria-expanded')==='false'));
function updateTarget(){const obj=activeObjective(),p=obj.point;world.target(p);world.cargo(city.phase==='deliver');
 $('chapter').textContent=roles[city.role].icon+' '+roles[city.role].name+' · משימה '+Math.min(city.stage+1,3)+' מתוך 3';
 const step=city.stage*2+(city.phase==='deliver'||city.phase==='quiz'?1:0);
 [...$('shift-bar').children].forEach((seg,i)=>{seg.className=step>=i*2+2?'done':step===i*2+1?'half':'';});
 setMissionTitle(obj.title);vehicleLabel();drawAction();$('pin').textContent=p?.name||'';
}
function refresh(){
 if(!city||mode!=='explore')return;
 vehicleLabel();
 const o=activeObjective(),p=o.point,d=p?near(city,p):Infinity,arrived=!o.auto&&d<=4.3;
 if(city.waypoint&&d<12){city.waypoint=null;save();updateTarget();return;}
 drawAction();drawBanner();drawMinimap();drawSky();
 const routeLabel=arrived?'לבצע את הפעולה':world.moving()?'לעצור בדרך':'הובלה ליעד';
 if($('route').textContent!==routeLabel)$('route').textContent=routeLabel;
 const gate=city.x>215&&!districtOpen(career,225,city.z)?districtRequirement(225,city.z):city.z< -215&&!districtOpen(career,city.x,-225)?districtRequirement(city.x,-225):null;
 const status=gate?'🔒 '+gate.name+' · נדרשות '+gate.tasks+' משימות ובהן '+gate.learning+' קבוצות תרגול':!p?'סעו לאן שתרצו. P פותח את הפרופיל: אתגרים, מרוצים ונוסעים.':arrived?'הגעתם! לחצו על ״'+o.action+'״.':city.driving&&!world.moving()&&d<14&&!o.auto?'היעד קרוב. צאו מהרכב והמשיכו ברגל.':world.yielding()?'מאטים ונותנים זכות קדימה.':p.district+' · '+Math.round(d)+' מטר'+(o.auto?'':' · אפשר לנהוג או ללחוץ על הובלה.');
 if($('status').textContent!==status)$('status').textContent=status;
 const events=world.events(),count=String(events.length);
 if($('calls').textContent!==count){$('calls').textContent=count;$('dispatch').setAttribute('aria-label','מוקד העיר · דיווחים פעילים: '+count);$('dispatch').classList.toggle('alert',events.length>0);}
 const selected=events.find(e=>e.id===followedEvent);
 announceEvents(events,selected);
 if(selected&&!claimedWitness.has(selected.id)&&Math.hypot(city.x-selected.observer.x,city.z-selected.observer.z)<9){
  claimedWitness.add(selected.id);
  syncWallet(w=>{if(witness(w,round,selected.id)){toast('📝 דיווח עדים נרשם · '+selected.title+' · +10 מטבעות');audio.play('coin');gain({xp:XP.witness,stats:{witness:1}});}});
 }
 if(followedEvent&&!selected){followedEvent=null;toast('הדיווח נסגר. אפשר להמשיך במשמרת.');}
 const nearby=selected||events.find(e=>Math.hypot(e.x-city.x,e.z-city.z)<18);
 const report=nearby?(incidentIcon[nearby.type]||'📍')+' '+nearby.title+' · '+incidentPhase[nearby.phase]+' · '+Math.round(Math.hypot(nearby.x-city.x,nearby.z-city.z))+' מ׳':'';
 $('scene-report').hidden=!nearby;if($('scene-report').textContent!==report)$('scene-report').textContent=report;
 const pin=p?world.project(p):{visible:false};$('pin').hidden=!pin.visible;if(pin.visible){$('pin').style.left=pin.x+'px';$('pin').style.top=pin.y+'px';}
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
  world.outfit(roles[city.role].color,wallet.equipped,city.role,items.find(i=>i.paint&&wallet.equipped.includes(i.id))?.paint||null);
  world.setUpgrades(upgradesFrom(wallet.upgrades));
 };
 return navigator.locks?navigator.locks.request(key,update):Promise.resolve(update());
}
// Garage performance upgrades. Renders into #upgrade-panel inside the garage tab; buying re-renders the shop.
function upgradePanel(){
 const el=$('upgrade-panel');if(!el)return;
 const missions=career.done.length,tiers=upgradesFrom(wallet.upgrades);
 const drive=world.drivingState().vehicle;
 el.innerHTML=`<h3 class="upgrade-title">שדרוגי ביצועים</h3>${drive?`<p class="upgrade-car"><bdi>${esc(drive.name)}</bdi> עם השדרוגים שלכם${carBars(drive.brand)}</p>`:''}<p class="upgrade-note">השדרוגים עוברים איתכם לכל רכב שתיקחו. כל דרגה נפתחת אחרי עוד משימות · השלמתם ${missions} משימות.</p>`+UPGRADES.map(u=>{
  const n=nextTier(wallet,u.id,missions),t=tiers[u.id];
  const bar=Array.from({length:MAX_TIER},(_,i)=>`<i class="${i<t?'on':''}"></i>`).join('');
  const label=n.state==='max'?'✓ דרגה מלאה':n.state==='locked'?'🔒 '+n.need+' משימות':'לשדרג · '+n.price+' 🪙';
  const next=n.state==='max'?'הרכב בשיא הביצועים בתחום הזה.':n.state==='locked'?'🔒 נפתח אחרי '+n.need+' משימות · '+n.step+' · '+n.price+' 🪙':'הדרגה הבאה: '+n.step;
  return `<div class="stock upgrade${n.state==='locked'?' locked':''}"><div><strong>${u.icon} ${u.name} <span class="tier">דרגה ${t}/${MAX_TIER}</span></strong><span class="upgrade-bar" role="img" aria-label="דרגה ${t} מתוך ${MAX_TIER}">${bar}</span><small>${u.detail} · ${next}</small></div><button data-upgrade="${u.id}" ${n.state==='ready'?'':'disabled'}>${label}</button></div>`;
 }).join('');
 el.querySelectorAll('[data-upgrade]').forEach(b=>b.onclick=async()=>{
  b.disabled=true;let bought=false;const line=b.dataset.upgrade;
  await syncWallet(w=>{bought=buyUpgrade(w,line,career.done.length);});
  if(mode==='shop'){shop(true);document.querySelector('[data-upgrade="'+line+'"]')?.focus();}
  if(bought){audio.play('coin');toast('🔧 '+UPGRADES.find(u=>u.id===line).name+' שודרג לדרגה '+upgradesFrom(wallet.upgrades)[line]+'!');}
 });
}
function shop(vehicle=city.driving){
 clearTimeout(timer);$('notice').textContent='';
 const level=levelFor(saga.xp).level,tasks=career.done.length;$('shop').classList.remove('fresh');$('mission-toggle').classList.remove('fresh');
 // Locked items stay listed so players see what the next missions bring.
 const listing=items.filter(item=>Boolean(item.vehicle)===vehicle).map(item=>{
  const owned=wallet.owned.includes(item.id), equipped=wallet.equipped.includes(item.id);
  const locked=!owned&&!itemOpen(item,level,tasks);
  const why=[item.tasks>tasks?'נפתח אחרי '+item.tasks+' משימות':'',item.level>level?'בדרגה '+item.level:''].filter(Boolean).join(' · ');
  const label=locked?'🔒 '+(item.tasks>tasks?item.tasks+' משימות':'דרגה '+item.level):equipped?'להסיר':owned?'לצייד':'לקנות · '+item.price+' 🪙';
  return `<div class="stock${locked?' locked':''}"><div><strong>${item.paint?`<i class="swatch" style="background:${item.paint}"></i>`:''}${item.name}</strong><small>${locked?'🔒 '+why+' · '+item.price+' 🪙':item.detail}</small></div><button data-item="${item.id}" ${locked||(!owned&&wallet.coins<item.price)?'disabled':''}>${label}</button></div>`;
 }).join('');
 const next=nextUnlock(tasks);
 const ahead=next?`<p class="next-unlock">${next.tasks-tasks===1?'המשימה הבאה פותחת':'בעוד '+(next.tasks-tasks)+' משימות נפתחים'}: <b>${next.items.map(i=>i.name).join(' · ')}</b> · ${tasks} משימות הושלמו</p>`:'<p class="next-unlock">כל פריטי החנות פתוחים. כל הכבוד!</p>';
 sheet(`<span class="kicker">ציוד למשמרת</span><h2 id="sheet-title">חנות הפסטיבל</h2><p>בארנק שלכם: <b>${wallet.coins} מטבעות</b></p><p>תשובה נכונה מזכה ב־5 מטבעות, כל שלוש נכונות ברצף ב־5 בונוס, השלמת מסירה ב־15 ודיווח עדים ב־10. הסעות, מרוצים, כוכבים ואתגרים יומיים מוסיפים עוד. כל משימה שתשלימו מוסיפה פריטים חדשים לחנות.</p>${ahead}<div class="stock-tabs" role="group" aria-label="סוג הציוד"><button id="hero-stock" aria-pressed="${!vehicle}">ציוד לדמות</button><button id="van-stock" aria-pressed="${vehicle}">המוסך</button></div>${vehicle?'<div id="car-preview"></div><div id="upgrade-panel"></div>':''}${listing}<button class="cta" id="leave-shop">חזרה לעיר</button>`,'shop');
 for(const [id,showVan] of [['hero-stock',false],['van-stock',true]]){
  $(id).onclick=()=>{shop(showVan);$(id).focus();};
 }
 $('leave-shop').onclick=()=>{closeSheet();$('shop').focus();};
 upgradePanel();
 // Close-up of the car being driven (or the nearest one); it frees itself when the sheet closes.
 if(vehicle&&$('car-preview')){const g=world.garageCar();mountCarPreview($('car-preview'),g.brand,g.paint);}
 document.querySelectorAll('[data-item]').forEach(b=>b.onclick=async()=>{
  b.disabled=true;await syncWallet(w=>toggleItem(w,b.dataset.item,levelFor(saga.xp).level,career.done.length));audio.play('coin');if(mode==='shop'){shop(vehicle);document.querySelector('[data-item="'+b.dataset.item+'"]').focus();}
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
 saga=loadProgress(round.participantName);city.waypoint=null;driven=0;lastSpot=null;weatherSeen='';
 play=createPlay({places,stars:world.stars(),collected:saga.stars,isOpen:(x,z)=>districtOpen(career,x,z),isFree:(x,z)=>!world.solidAt(x,z),seed:Number(new URLSearchParams(location.search).get('playSeed'))||Math.floor(Math.random()*2**31)});
 world.setPlay(()=>play.state());audio.start();
 world.setCareer(career);world.restoreFleet(city.fleet);city.driving=Boolean(world.drivingState().vehicle);
 for(let i=0;i<city.stage;i++)awardTask(career,round.attemptId+':delivery:'+i);
 persistCareer();
 missionToggle.setAttribute('aria-expanded','false');$('welcome').hidden=true;$('hud').hidden=false;mode='explore';followedEvent=null;world.start(city.x,city.z,round.elapsed);syncWallet();learn();drawRank();updateTarget();refresh();save();
 if(!old&&!saga.xp)pop('חדש בעיר: נוסעים 🚕 · מרוצים 🏁 · כוכבים ⭐ · לחצו P לפרופיל','big');
 if(city.phase==='quiz')question();if(city.phase==='complete')finish();
}
$('entry').onsubmit=e=>{e.preventDefault();start(false);};$('player-name').oninput=()=>{$('player-name').setCustomValidity('');renderBest();};$('resume').onclick=()=>start(true);
function sheet(html,nextMode){
 clearTimeout(timer);$('notice').textContent='';
 world.setPaused(true);mode=nextMode;$('activity').hidden=true;audio.quiet();$('sheet').hidden=false;$('hud').inert=true;$('sheet-body').innerHTML=html;$('sheet').scrollTop=0;
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
 if(!p.next&&!feedback){reward(round.attemptId+':delivery:'+city.stage);city.stage++;syncWallet();learn();audio.play('finish');city.phase=city.stage===3?'final':'pickup';save();closeSheet();toast(city.stage===3?'כל העיר מוכנה! קיבלתם 15 מטבעות.':'המסירה הושלמה · קיבלתם 15 מטבעות.');return;}
 const q=round.questions.find(q=>q.id===(feedback||p.next)),a=round.answers[q.id],job=currentJob(city);
 sheet(`<div class="kicker">✓ ${esc(job[2])} הגיע ליעד · ${esc(quiz.title)}</div><h2 id="sheet-title" dir="auto">${esc(q.prompt)}</h2>${questionMedia(q)}<small class="q-meta"><span>שאלת תרגול · ${p.answered+(a?0:1)} מתוך ${p.total} במסירה הזאת</span><span class="q-coins">🪙 ${wallet.coins}</span></small>
 ${q.options.map(o=>`<button data-opt="${o.original}" ${a?'disabled':''} class="${a&&o.original===q.correct?'right':a&&o.original===a.choice?'wrong':''}"><bdi>${esc(o.text)}</bdi></button>`).join('')}
 ${a?`<div class="explain" role="status"><b>${a.correct?'נכון! +5 מטבעות':'הפעם התשובה שונה.'}</b>${a.correct&&streak>=2?`<p class="streak">🔥 ${streak} נכונות ברצף${streak%3===0?' · +5 בונוס':streak%3===2?' · עוד אחת לבונוס':''}</p>`:''}<p>${esc(q.explanation.he)}</p>${q.explanation.en?`<p dir="ltr" lang="en">${esc(q.explanation.en)}</p>`:''}${reference(q)}</div><button id="next-q" class="cta">${p.next?'לשאלה הבאה':'המסירה הושלמה · +15 🪙 · להמשיך'} ←</button>`:reference(q)}`,'question');
 document.querySelectorAll('[data-opt]').forEach(b=>b.onclick=()=>{if(answer(round,q.id,Number(b.dataset.opt))){streak=round.answers[q.id]?.correct?streak+1:0;audio.play(streak?'right':'wrong');feedback=city.feedback=q.id;save();syncWallet();learn();question();}});
 if($('next-q'))$('next-q').onclick=()=>{feedback=city.feedback=null;save();question();};
}
function interact(){
 if(mode!=='explore')return;const a=contextAction();if(!a)return;
 if(a.kind!=='mission'){world.stop();handle(play.act({x:city.x,z:city.z,driving:city.driving}));return;}
 const o=activeObjective();
 world.stop();if(city.contract){
  const task=contracts.find(t=>t.id===city.contract);
  const before=career.done.length;
  if(!completeContract(career,city.contract,city,places)){toast(task.drive?'הגיעו לנקודה בתוך רכב.':'צאו מהרכב והגיעו לנקודה ברגל.');return;}
  city.contract=null;persistCareer();announceUnlocks(before);updateTarget();refresh();toast('✦ גילוי הושלם! '+career.done.length+' משימות · בדקו רכבים ואזורים חדשים בלוח');audio.play('finish');gain({xp:XP.contract,stats:{contracts:1}});return;
 }if(city.stage===3){city.phase='complete';save();finish();return;}
 if(city.phase==='pickup'){prepareCargo(city,sheet,()=>{city.phase='deliver';save();closeSheet();audio.play('door');toast('הציוד איתכם. עכשיו '+objective(city).title);},closeSheet);return;}
 city.phase='quiz';save();question();
}
// Turns what happened in an activity into rewards, sound and messages.
const MEDAL_COINS=[0,10,20,35];
function handle(events){
 for(const e of events){
  if(e.type==='hint')toast(e.text);
  else if(e.type==='star'){
   audio.play('star');
   if(e.shower){gain({xp:XP.showerStar,stats:{showerStars:1}},2);continue;}
   saga.stars.push(e.star.id);
   const all=world.stars(),zone=all.filter(s=>s.zone===e.star.zone),have=zone.filter(s=>saga.stars.includes(s.id)).length,complete=have===zone.length;
   gain({xp:XP.star,stats:{stars:1}},3+(complete?ZONE_BONUS:0));
   toast(complete?'🌟 כל הכוכבים של '+ZONE_NAMES[e.star.zone]+' נאספו! +'+ZONE_BONUS+' 🪙':'⭐ כוכב פסטיבל · '+saga.stars.length+' מתוך '+all.length+' · '+ZONE_NAMES[e.star.zone]+' '+have+'/'+zone.length);
  }
  else if(e.type==='race-start'){audio.play('go');toast('🏁 '+e.race.name+' · '+e.race.length+' מ׳ · זהב עד '+formatTime(e.race.times[3]));}
  else if(e.type==='checkpoint')audio.play('checkpoint');
  else if(e.type==='race-finish'){
   const old=saga.races[e.race.id]?.medal||0,r=recordRace(saga,e.race.id,e.time,e.medal);
   audio.play('finish');
   gain({xp:XP.raceFinish+(r.better?XP.medal[e.medal]-XP.medal[old]:0),stats:{race:1,medal:e.medal?1:0,gold:e.medal===3?1:0}},2+(r.better?MEDAL_COINS[e.medal]-MEDAL_COINS[old]:0));
   raceResult(e,r);
  }
  else if(e.type==='race-cancel'){audio.play('cancel');toast(e.reason==='left'?'יצאתם מהרכב · המרוץ בוטל.':e.reason==='timeout'?'עבר זמן רב מדי בין הנקודות · המרוץ בוטל.':'המרוץ בוטל. אפשר לחזור לקו הזינוק בכל רגע.');}
  else if(e.type==='gig-board'){audio.play('door');toast(e.gig.kind==='ride'?'🚕 '+e.gig.who+' ברכב · אל '+places[e.gig.to].name+' · נסיעה חלקה מזכה בטיפ':'⚡ '+e.gig.who+' · אל '+places[e.gig.to].name+' · עד '+formatTime(e.gig.par)+' לבונוס');}
  else if(e.type==='gig-done'){
   const ride=e.gig.kind==='ride';audio.play('coin');world.stop();
   gain({xp:ride?XP.ride+(e.clean?XP.cleanRide:0):e.inTime?XP.express:10,stats:ride?{rides:1,cleanRide:e.clean?1:0}:{express:e.inTime?1:0}},e.coins);
   toast(ride?'✓ הגענו אל '+places[e.gig.to].name+(e.gig.comfort>=90?' · נסיעה חלקה ✨':e.gig.comfort<60?' · הנסיעה הייתה קופצנית':'')+(e.inTime?' · בזמן!':''):e.inTime?'⚡ המשלוח הגיע בזמן! בונוס מהירות':'המשלוח נמסר, אבל באיחור. בפעם הבאה מהר יותר.');
  }
  else if(e.type==='gig-cancel'){audio.play('cancel');toast(e.reason==='left'?'יצאתם מהרכב · ההסעה בוטלה.':'ההסעה בוטלה. יש עוד נוסעים בעיר.');}
  else if(e.type==='shower-start'){audio.play('star');pop('🌠 גשם כוכבים ליד '+e.shower.name+'! '+e.shower.total+' כוכבים · 80 שניות','big');}
  else if(e.type==='shower-end')toast(e.got?'🌠 גשם הכוכבים נגמר · אספתם '+e.got+' מתוך '+e.total:'🌠 גשם הכוכבים נגמר. הבא יגיע בקרוב.');
 }
 if(events.length){saveProgress();if(mode==='explore'){updateTarget();refresh();}}
}
function raceResult(e,r){
 const t=e.race.times,next=e.medal<3?' · ל'+MEDALS[e.medal+1]+' חסרות '+(e.time-t[e.medal+1]).toFixed(1)+' שנ׳':'';
 sheet(`<div class="kicker">🏁 ${esc(e.race.name)} · ${e.race.length} מ׳</div><h2 id="sheet-title">${e.medal?MEDAL_ICON[e.medal]+' מדליית '+MEDALS[e.medal]+'!':'סיימתם את המסלול'}</h2><div class="big-score">${formatTime(e.time)}</div><p>${r.improved&&r.previous?'<b class="record">🏆 שיא אישי חדש!</b> השיא הקודם: '+formatTime(r.previous):r.previous?'השיא שלכם: '+formatTime(saga.races[e.race.id].best):'זמן ראשון במסלול הזה'}${next}</p><div class="shift-stats medals"><div><b>🥇 ${formatTime(t[3])}</b><small>זהב</small></div><div><b>🥈 ${formatTime(t[2])}</b><small>כסף</small></div><div><b>🥉 ${formatTime(t[1])}</b><small>ארד</small></div></div><p>${e.medal===3?'זמן מושלם. נסו מסלול אחר!':'רכב מהיר יותר עוזר: משימות ותרגול פותחים רכבים חדשים.'}</p><button id="race-again">לנסות שוב · הובלה לקו הזינוק</button><button id="race-close" class="cta">חזרה לעיר</button>`,'race');
 $('race-close').onclick=closeSheet;
 $('race-again').onclick=()=>{city.waypoint={x:e.race.start.x,z:e.race.start.z,name:'קו הזינוק · '+e.race.name,district:'מרוץ רחוב'};save();closeSheet();world.go(e.race.start.x,e.race.start.z);};
}
$('action').onclick=interact;
$('route').onclick=()=>{if(mode!=='explore')return;if(missionToggle.getAttribute('aria-expanded')==='true'){missionToggle.setAttribute('aria-expanded','false');missionToggle.focus({preventScroll:true});}const o=activeObjective(),p=o.point;if(!p){toast('אין יעד כרגע. בחרו נוסע, מרוץ או מקום בפרופיל (P) או במפה (M).');return;}if(!o.auto&&near(city,p)<=4.3){interact();return;}if(play?.racing()){toast('🏁 במרוץ נוהגים בעצמכם. בהצלחה!');return;}if(world.moving())world.stop();else if(!world.go(p.x,p.z))toast('הדרך חסומה. נסו לצאת לרחוב.');refresh();};
$('vehicle').onclick=()=>{if(mode!=='explore')return;const result=world.toggleVehicle();if(result.error){toast(result.error);return;}city.driving=result.driving;audio.play('door');save();updateTarget();refresh();toast(city.driving?world.carName()+' · Shift לטורבו, רווח לבלימה':'הרכב נשאר כאן. אפשר לקחת רכב אחר.');};
function discoveryBoard(){
 const count=career.done.length,learning=learningTasks(career);
 const tasks=contracts.map(t=>{const p=places[t.place],done=career.done.includes(t.id),open=districtOpen(career,p.x,p.z),r=districtRequirement(p.x,p.z);return `<section class="discovery-task"><strong>${done?'✓':'◇'} ${esc(t.name)}</strong><p>${esc(t.detail)}</p>${done?'<small>הושלם</small>':open?`<button data-contract="${t.id}">לצאת למשימה · ${Math.round(Math.hypot(city.x-p.x,city.z-p.z))} מ׳</button>`:`<small>🔒 ${r.tasks} משימות ובהן ${r.learning} קבוצות תרגול</small>`}</section>`;}).join('');
 const cars=Object.entries(CAR_TASKS).map(([id,n])=>`<li>${count>=n?'✓':'🔒'} <bdi>${esc(CAR_BRANDS[id].name)}</bdi> · ${n===0?'זמין מההתחלה':n+' משימות'} · ${Math.round(CAR_SPEED[id]*3.6)} קמ״ש במשחק${carBars(id)}</li>`).join('');
 sheet(`<div class="kicker">גלו · תרגלו · פתחו דרכים</div><h2 id="sheet-title">לוח הגילויים</h2><p>${count} משימות הושלמו · ${learning} קבוצות תרגול</p><p>כל מסירה עם כל שאלות התרגול שלה שווה משימה. גם הגילויים שלמטה פותחים רכבים. טעויות לא עוצרות את ההתקדמות.</p><button id="main-job">לחזור למשמרת ולתרגול</button><h3>העיר מתרחבת איתכם</h3><p>${districtOpen(career,0,-250)?'✓':'🔒'} הצפון · 3 משימות ובהן קבוצת תרגול אחת<br>${districtOpen(career,250,0)?'✓':'🔒'} נמל המזרח · 6 משימות ובהן 2 קבוצות תרגול</p>${tasks}<h3>הרכבים שתוכלו לקחת ברחוב</h3><ul class="car-unlocks">${cars}</ul><button id="close-discoveries" class="cta">חזרה לעיר</button>`,'discoveries');
 $('main-job').onclick=()=>{city.contract=null;save();closeSheet();};
 $('close-discoveries').onclick=closeSheet;
 document.querySelectorAll('[data-contract]').forEach(b=>b.onclick=()=>{city.contract=b.dataset.contract;city.waypoint=null;save();closeSheet();const p=activeObjective().point;world.go(p.x,p.z);refresh();});
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
 const carStops=cars.map((v,i)=>`<button data-car="${i}">${v.available?'🚘':'🔒'} <bdi>${esc(v.name)}</bdi> · ${Math.round(Math.hypot(v.x-city.x,v.z-city.z))} מ׳ · ${Math.round(CAR_SPEED[v.brand]*3.6)} קמ״ש${v.available?'':' · '+CAR_TASKS[v.brand]+' משימות'}${carBars(v.brand)}</button>`).join('');
 const stops=entries.map(([id,p],i)=>`<button data-place="${id}" ${districtOpen(career,p.x,p.z)?'':'disabled'}>${districtOpen(career,p.x,p.z)?'':'🔒 '}${i+1} · ${p.name} — ${p.district} ${id===target?'★ יעד המשימה':''}</button>`).join('');
 sheet(`<span class="kicker">מפרץ הדר · מפת העיר</span><h2 id="sheet-title">לאן נוסעים?</h2><svg class="district-map" style="display:block;height:auto;max-height:340px" viewBox="${west-4} ${north-4} ${width+8} ${height+8}" role="img" aria-label="מיקום השחקן, ${entries.length} יעדים ואירועי העיר"><rect x="${west}" y="${north}" width="${width}" height="128" fill="#c5ddc8"/><rect x="224" y="-224" width="128" height="224" fill="#cad6cf"/><rect x="224" y="0" width="128" height="188" fill="#ead8b6"/><rect x="${west}" y="${south}" width="${width}" height="32" fill="#74bec9"/><path d="${roads}" stroke="#eee5cf" stroke-width="6"/>${marks}${alerts}<circle cx="${city.x}" cy="${city.z}" r="5" fill="#ffcf54" stroke="#403b31"/></svg><p>אזורים אפורים נעולים. הצפון: 3 משימות + תרגול. הנמל: 6 משימות + 2 תרגולים.</p><p>● אתם כאן · ★ יעד המשימה${incidents.length?' · ⚠ אירועים פעילים':''}</p>${stops}<h3>רכבים חונים בסביבה</h3>${carStops}<button id="close-map" class="cta">חזרה לעיר</button>`,'map');
 document.querySelectorAll('[data-car]').forEach(b=>b.onclick=()=>{const v=cars[Number(b.dataset.car)];closeSheet();world.seekCar(v.id);world.go(v.x,v.z);toast(v.available?'התקרבו לרכב ולחצו על לקיחת רכב.':'אפשר לראות את הרכב. כדי לקחת אותו נדרשות '+CAR_TASKS[v.brand]+' משימות.');});
 document.querySelectorAll('[data-place]').forEach(b=>b.onclick=()=>{const p=places[b.dataset.place];guide({x:p.x,z:p.z,name:p.name,district:p.district});});$('close-map').onclick=closeSheet;
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
 learn({stars:starsFor(score),perfect:wrong.length===0});
 const render=()=>{
  const rank=levelFor(saga.xp);
  const earned=Object.entries(wallet.earnings).filter(([k])=>k===attempt||k.startsWith(attempt+':witness:')).reduce((n,[,v])=>n+v,0);
  const witnessed=Object.keys(wallet.earnings).filter(k=>k.startsWith(attempt+':witness:')).length,correct=round.questions.length-wrong.length;
  const stats=`<div class="shift-stats"><div><b>${correct}/${round.questions.length}</b><small>תשובות נכונות</small></div><div><b>🔥 ${bestStreak(round)}</b><small>הרצף הארוך</small></div><div><b>${earned} 🪙</b><small>מטבעות מהמשמרת</small></div><div><b>${witnessed}</b><small>דיווחי עדים</small></div></div>`;
  sheet(`<div class="kicker">✦ המשמרת הושלמה · שלוש מסירות</div><h2 id="sheet-title">פסטיבל המפרץ נפתח!</h2><div class="big-score">${score}/100</div><p>${'★'.repeat(starsFor(score))+'☆'.repeat(3-starsFor(score))} · ${esc(quiz.title)}${record&&previous?' · <b class="record">🏆 שיא חדש!</b>':''}</p>${stats}<p class="rank-line">⭐ דרגה ${rank.level} · ${esc(rank.title)}${rank.max?'':' · עוד '+(rank.span-rank.into)+' XP לדרגה הבאה'}</p>${wrong.length?`<button id="review-wrong" class="review-btn">📚 לחזור על ${wrong.length===1?'הטעות':'ה־'+wrong.length+' טעויות'} · בלי לחץ, בלי מטבעות</button>`:'<p class="perfect">💯 כל התשובות נכונות. אין מה לחזור עליו!</p>'}<details><summary>התשובות וההסברים</summary>${round.questions.map(q=>`<p><b>${esc(q.prompt)}</b><br>התשובה שלכם: ${esc(q.choices[round.answers[q.id].choice])}<br>התשובה הנכונה: ${esc(q.choices[q.correct])}<br>${esc(q.explanation.he)}</p>`).join('')}</details><p id="saved" role="status">${finishSaved?esc(finishSaved.text):'שומרים את התוצאה…'}</p><button id="watch" ${finishSaved?'':'disabled'}>להמשיך בעיר · הסעות, מרוצים וכוכבים ✦</button><button id="again" class="cta" ${finishSaved?'':'disabled'}>למשמרת חדשה ←</button>`,'complete');
  if(finishSaved?.retry)addRetry();
  if($('review-wrong'))$('review-wrong').onclick=()=>reviewWrong(wrong,0,0,render);
  $('watch').onclick=()=>{closeSheet();toast('הפסטיבל נפתח! העיר שלכם: נוסעים, מרוצים וכוכבים מחכים. P לפרופיל.');};
  $('again').onclick=()=>{if($('save-retry')&&!confirm('התוצאה טרם נשמרה. להתחיל בכל זאת משמרת חדשה?'))return;try{sessionStorage.removeItem(DRAFT);}catch{}city=round=play=null;world.setPlay(()=>null);audio.quiet();$('fx').textContent='';mode='menu';$('sheet').hidden=true;$('hud').hidden=true;$('hud').inert=false;$('welcome').hidden=false;$('resume').hidden=true;world.reset();};
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
function drawBanner(){
 const st=play?.state(),el=$('activity');let text='',cancel=false;
 if(st?.run){const r=st.run;text='🏁 '+r.name+' · '+r.next+'/'+r.total+' · '+formatTime(r.time)+' · 🥇 '+formatTime(r.times[3]);cancel=true;}
 else if(st?.gig){const g=st.gig;cancel=true;text=g.kind==='ride'?'🚕 '+g.who+' ← '+g.toName+' · נוחות '+g.comfort+'% · '+formatTime(g.time)+' / '+formatTime(g.par):'⚡ '+g.who+' ← '+g.toName+' · '+formatTime(g.time)+' / '+formatTime(g.par);if(g.onFoot)text='חזרו לרכב! '+text;}
 else if(st?.shower)text='🌠 גשם כוכבים · '+st.shower.name+' · '+st.shower.got+'/'+st.shower.total+' · '+Math.ceil(st.shower.left)+' שנ׳';
 el.hidden=!text||mode!=='explore';if($('activity-text').textContent!==text)$('activity-text').textContent=text;$('activity-cancel').hidden=!cancel;
}
$('activity-cancel').onclick=()=>{if(play&&mode==='explore')handle(play.cancel());};
function drawSky(){
 const a=world.atmosphere(),v=world.drivingState();
 const label=(a.night?'🌙 ':a.rain>.3?'🌧 ':'☀️ ')+a.clock;if($('clock').textContent!==label)$('clock').textContent=label;
 const phase=a.rain>.3?'rain':a.night?'night':'day';
 if(phase!==weatherSeen){
  if(weatherSeen&&phase==='rain')toast('🌧 מתחיל לרדת גשם · הכביש רטוב, בולמים מוקדם יותר');
  else if(weatherSeen&&phase==='night')toast('🌙 ערב בעיר המפרץ · האורות נדלקים');
  weatherSeen=phase;
 }
 audio.drive({driving:city.driving&&mode==='explore',speed:v.speed/3.6,max:v.maxSpeed/3.6,boosting:v.boosting,rain:mode==='explore'?a.rain:0});
}
// Live minimap, turned the same way as the camera so "up" on the stick is "up" on the map.
const MAP_RANGE=150;
function drawMinimap(){
 const c=$('minimap');if(!c.offsetWidth)return;
 const g=c.getContext('2d'),S=c.width,k=S/2/MAP_RANGE,me=world.pose(),{west,east,north,south}=CITY_BOUNDS;
 const sx=(x,z)=>S/2+(.815*(x-me.x)-.58*(z-me.z))*k,sy=(x,z)=>S/2+(.58*(x-me.x)+.815*(z-me.z))*k;
 g.setTransform(1,0,0,1,0,0);g.clearRect(0,0,S,S);g.save();g.beginPath();g.arc(S/2,S/2,S/2-2,0,Math.PI*2);g.clip();
 g.fillStyle='#7cc4cf';g.fillRect(0,0,S,S);
 g.setTransform(.815*k,.58*k,-.58*k,.815*k,S/2-(.815*me.x-.58*me.z)*k,S/2-(.58*me.x+.815*me.z)*k);
 g.fillStyle='#bfe0b4';g.fillRect(west,north,east-west,south-north);
 g.fillStyle='#8f9c97';if(!districtOpen(career,0,-250))g.fillRect(west,north,east-west,128);if(!districtOpen(career,250,0))g.fillRect(224,north,east-224,south-north);
 g.strokeStyle='#f6eed9';g.lineWidth=9;g.beginPath();
 for(const x of northSouthStreets)if(Math.abs(x-me.x)<MAP_RANGE*1.5){g.moveTo(x,streetEnds.north);g.lineTo(x,streetEnds.south);}
 for(const z of eastWestStreets)if(Math.abs(z-me.z)<MAP_RANGE*1.5){g.moveTo(west,z);g.lineTo(east,z);}
 g.stroke();
 for(const p of Object.values(places)){g.fillStyle=p.color;g.fillRect(p.x-8,p.z-17,16,12);}
 g.setTransform(1,0,0,1,0,0);
 const dot=(x,z,r,fill,stroke)=>{g.beginPath();g.arc(sx(x,z),sy(x,z),r,0,Math.PI*2);g.fillStyle=fill;g.fill();if(stroke){g.strokeStyle=stroke;g.lineWidth=2;g.stroke();}};
 const st=play?.state();
 if(st){
  for(const s of world.stars())if(!st.collected.has(s.id)&&Math.hypot(s.x-me.x,s.z-me.z)<80&&districtOpen(career,s.x,s.z))dot(s.x,s.z,5,'#ffcf3a','#8a5a00');
  if(st.shower){g.beginPath();g.arc(sx(st.shower.x,st.shower.z),sy(st.shower.x,st.shower.z),52*k,0,Math.PI*2);g.strokeStyle='#ffcf3a';g.lineWidth=3;g.setLineDash([8,6]);g.stroke();g.setLineDash([]);for(const s of st.shower.stars)if(!s.got)dot(s.x,s.z,4,'#fff2a8','#8a5a00');}
  g.font='22px sans-serif';g.textAlign='center';g.textBaseline='middle';
  if(!st.run&&!st.gig){
   for(const o of st.offers){dot(o.x,o.z,13,o.kind==='ride'?'#ffd24a':'#ff8a4a','#3a2b12');g.fillText(o.kind==='ride'?'🚕':'⚡',sx(o.x,o.z),sy(o.x,o.z)+1);}
   for(const r of RACES)if(districtOpen(career,r.start.x,r.start.z)){dot(r.start.x,r.start.z,13,'#fff','#8a2f25');g.fillText('🏁',sx(r.start.x,r.start.z),sy(r.start.x,r.start.z)+1);}
  }
 }
 for(const e of world.events())dot(e.x,e.z,8,'#c9392b','#fff');
 const target=activeObjective().point;
 if(target){
  let tx=sx(target.x,target.z)-S/2,ty=sy(target.x,target.z)-S/2;const far=Math.hypot(tx,ty),edge=S/2-16;
  if(far>edge){tx*=edge/far;ty*=edge/far;}
  g.beginPath();g.arc(S/2+tx,S/2+ty,far>edge?9:12,0,Math.PI*2);g.fillStyle='#ec5a3c';g.fill();g.strokeStyle='#fff';g.lineWidth=3;g.stroke();
 }
 // The player arrow points where the character or car is facing.
 const hx=.815*Math.sin(me.heading)-.58*Math.cos(me.heading),hy=.58*Math.sin(me.heading)+.815*Math.cos(me.heading),a=Math.atan2(hy,hx);
 g.translate(S/2,S/2);g.rotate(a);g.beginPath();g.moveTo(15,0);g.lineTo(-10,9);g.lineTo(-5,0);g.lineTo(-10,-9);g.closePath();g.fillStyle='#17413b';g.fill();g.strokeStyle='#fff';g.lineWidth=3;g.stroke();
 g.setTransform(1,0,0,1,0,0);g.restore();
}
function guide(point){city.waypoint=point;city.contract=null;save();closeSheet();if(!world.go(point.x,point.z))toast('היעד מסומן במפה הקטנה. צאו לרחוב והתחילו לנסוע.');refresh();}
function profile(){
 if(!play)return;
 const l=levelFor(saga.xp),st=play.state(),all=world.stars(),me={x:city.x,z:city.z},away=p=>Math.round(near(me,p));
 const daily=dailyStatus(saga).map(c=>`<li class="${c.done?'done':''}"><span>${c.icon}</span><div><b>${esc(c.label)}</b><i class="bar"><i style="width:${Math.round(c.have/c.goal*100)}%"></i></i></div><small>${c.done?'✓':c.unit==='m'?'<bdi dir="ltr">'+(c.have/1000).toFixed(1)+' / '+c.goal/1000+'</bdi> ק״מ':'<bdi dir="ltr">'+c.have+' / '+c.goal+'</bdi>'}</small></li>`).join('');
 const rides=st.run||st.gig?'<p>סיימו קודם את הפעילות הנוכחית.</p>':st.offers.map((o,i)=>`<button data-offer="${i}">${o.kind==='ride'?'🚕':'⚡'} ${esc(o.who)} · ${esc(places[o.from].name)} ← ${esc(places[o.to].name)} · כ־${o.fare} 🪙<small class="btn-sub">הובלה לשם · ${away(o)} מ׳</small></button>`).join('')||'<p>כרגע אין נוסעים שמחכים.</p>';
 const races=RACES.map((r,i)=>{const mine=saga.races[r.id],open=districtOpen(career,r.start.x,r.start.z);return `<button data-race="${i}" ${open&&!st.run&&!st.gig?'':'disabled'}>${open?mine?.medal?MEDAL_ICON[mine.medal]:'🏁':'🔒'} ${esc(r.name)} · ${r.length} מ׳${mine?' · שיא '+formatTime(mine.best):''}<small class="btn-sub">${open?esc(r.detail)+' · 🥇 '+formatTime(r.times[3])+' · 🥈 '+formatTime(r.times[2])+' · 🥉 '+formatTime(r.times[1]):'האזור עדיין נעול'}</small></button>`;}).join('');
 const zones=Object.entries(ZONE_NAMES).map(([id,name])=>{const z=all.filter(s=>s.zone===id);return name+' '+z.filter(s=>saga.stars.includes(s.id)).length+'/'+z.length;}).join(' · ');
 const badges=BADGES.map(b=>`<li class="${saga.badges.includes(b.id)?'have':''}" title="${esc(b.detail)}"><span>${b.icon}</span><b>${esc(b.name)}</b><small>${esc(b.detail)}</small></li>`).join('');
 const s=saga.stats;
 sheet(`<div class="kicker">${esc(round.participantName)} · הפרופיל שלי</div><h2 id="sheet-title">⭐ דרגה ${l.level} · ${esc(l.title)}</h2><div class="xp-line"><i class="bar"><i style="width:${l.max?100:Math.round(l.into/l.span*100)}%"></i></i><small>${l.max?'<bdi dir="ltr">'+saga.xp+' XP</bdi> · הדרגה הגבוהה ביותר':'<bdi dir="ltr">'+saga.xp+' / '+l.next+' XP</bdi>'}</small></div><p>תשובות נכונות בתרגול נותנות הכי הרבה XP. הסעות, מרוצים וכוכבים מוסיפים עוד.</p>
 <h3>אתגרי היום</h3><ul class="daily">${daily}</ul>
 ${st.shower?`<button id="go-shower" class="shower-btn">🌠 גשם כוכבים ליד ${esc(st.shower.name)} · ${Math.ceil(st.shower.left)} שנ׳ · הובלה לשם</button>`:''}
 <h3>נוסעים ומשלוחים</h3><p>עצרו ליד מי שמחכה ולחצו על כפתור הפעולה. נסיעה חלקה ובזמן מזכה בטיפ.</p>${rides}
 <h3>מרוצי רחוב</h3><p>הגיעו ברכב לשער המשובץ והתחילו. הזמנים קבועים, ולכן רכב מהיר יותר מקרב לזהב.</p>${races}
 <h3>כוכבי הפסטיבל · ${saga.stars.length}/${all.length}</h3><p>${zones}. כוכבים קרובים מופיעים במפה הקטנה. כל אזור שלם מזכה ב־${ZONE_BONUS} 🪙.</p>
 <h3>תגים · ${saga.badges.length}/${BADGES.length}</h3><ul class="badges">${badges}</ul>
 <p class="stat-line">${(s.metres/1000).toFixed(1)} ק״מ נהיגה · ${s.rides} הסעות · ${s.race} מרוצים · ${s.correct} תשובות נכונות · ${s.shifts} משמרות</p>
 <button id="close-profile" class="cta">חזרה לעיר</button>`,'profile');
 $('close-profile').onclick=closeSheet;
 if($('go-shower'))$('go-shower').onclick=()=>guide({x:st.shower.x,z:st.shower.z,name:'גשם הכוכבים · '+st.shower.name,district:'אירוע בעיר'});
 document.querySelectorAll('[data-offer]').forEach(b=>b.onclick=()=>{const o=st.offers[Number(b.dataset.offer)];guide({x:o.x,z:o.z,name:o.who,district:places[o.from].name});});
 document.querySelectorAll('[data-race]').forEach(b=>b.onclick=()=>{const r=RACES[Number(b.dataset.race)];guide({x:r.start.x,z:r.start.z,name:'קו הזינוק · '+r.name,district:'מרוץ רחוב'});});
}
$('profile').onclick=()=>{if(mode==='explore')profile();};$('minimap').onclick=()=>{if(mode==='explore')map();};
function drawSound(){$('sound').textContent=audio.enabled()?'🔊':'🔇';$('sound').setAttribute('aria-pressed',String(audio.enabled()));}
$('sound').onclick=()=>{audio.toggle();drawSound();};drawSound();
$('horn').onclick=()=>{if(mode==='explore'&&city?.driving)audio.play('horn');};
let pointer=null;
function stick(e){const r=$('joystick').getBoundingClientRect(),x=(e.clientX-r.left-r.width/2)/30,z=(e.clientY-r.top-r.height/2)/30,d=Math.max(1,Math.hypot(x,z));world.setStick(x/d,z/d);$('joystick').firstElementChild.style.transform=`translate(${x/d*24}px,${z/d*24}px)`;}
$('joystick').onpointerdown=e=>{if(pointer!==null)return;pointer=e.pointerId;e.currentTarget.setPointerCapture(pointer);stick(e);};$('joystick').onpointermove=e=>{if(pointer===e.pointerId)stick(e);};
for(const type of ['pointerup','pointercancel','lostpointercapture'])$('joystick').addEventListener(type,e=>{if(pointer!==e.pointerId)return;pointer=null;world.setStick(0,0);$('joystick').firstElementChild.style.transform='';});
window.addEventListener('keydown',e=>{if(e.repeat)return;if(mode==='discoveries'&&e.code==='Escape'){closeSheet();return;}if(mode==='shop'&&e.code==='Escape'){$('leave-shop').click();return;}if(mode==='dispatch'&&e.code==='Escape'){$('close-dispatch').click();return;}if(['map','profile','race'].includes(mode)&&e.code==='Escape'){closeSheet();return;}if(mode==='question'||mode==='review'){const n=Number(e.key);if(n>=1&&n<=4){const opts=document.querySelectorAll('[data-opt]');opts[n-1]?.click();}if(e.key==='Enter'&&$('next-q'))$('next-q').click();return;}if(mode!=='explore')return;if(e.code==='KeyE')interact();if(e.code==='KeyV')$('vehicle').click();if(e.code==='KeyM')map();if(e.code==='KeyJ')discoveryBoard();if(e.code==='KeyP')profile();if(e.code==='KeyH')$('horn').click();if(e.code==='KeyF'){if(document.fullscreenElement)document.exitFullscreen?.();else document.documentElement.requestFullscreen?.();}});
window.addEventListener('pagehide',save);
function step(x,z,dt,info){
 if(!city)return;city.x=x;city.z=z;round.elapsed+=dt;saveClock+=dt;if(saveClock>1){save();saveClock=0;}
 if(!play||mode!=='explore')return;
 // Distance driven feeds the daily goal and the badges, counted in whole 100 m.
 if(info.driving&&lastSpot)driven+=Math.min(8,Math.hypot(x-lastSpot.x,z-lastSpot.z));
 lastSpot={x,z};
 if(driven>=100){driven-=100;gain({stats:{metres:100}});}
 const events=play.tick({x,z,dt,driving:info.driving,speed:info.speed});
 if(events.length)handle(events);
}
try{world=cityWorld($('scene'),step,power=>{toast(power>.6?'התנגשות חזקה! · סעו בזהירות':'התנגשות קלה · אפשר להמשיך לנסוע');audio.play('crash',power);if(play){play.crash(power,carStats(wallet.upgrades).comfort);gain({stats:{crashes:1}});}try{navigator.vibrate?.(Math.round(40+140*power));}catch{}});}
catch{toast('כדי להיכנס לעיר צריך דפדפן עם תמיכה בתלת־ממד.');}
setInterval(refresh,100);drawRoles();loadQuiz();
window.render_game_to_text=()=>JSON.stringify({mode,source,quiz:quiz.id,role:city?.role,stage:city?.stage,phase:city?.phase,coordinateSystem:'x east, z south; metres; x -240 to 352, z -352 to 188 at the waterfront',player:world?.getPlayer(),target:city?activeObjective():null,driving:city?.driving,discovery:{...career,learning:learningTasks(career),contract:city?.contract},vehicle:world?.drivingState(),nearbyVehicle:world?.nearbyVehicle(),vehicles:world?.vehicles(),answered:round?Object.keys(round.answers).length:0,wallet:{coins:wallet.coins,equipped:wallet.equipped},life:world?.life(),rendering:{pixelRatio:world?.pixelRatio,...world?.renderStats()},progress:{xp:saga.xp,level:levelFor(saga.xp).level,stars:saga.stars.length,badges:saga.badges,races:saga.races,stats:saga.stats,daily:dailyStatus(saga).map(c=>({stat:c.stat,have:c.have,goal:c.goal,done:c.done}))},play:play?(({run,gig,offers,shower})=>({run,gig,offers,shower:shower&&{name:shower.name,got:shower.got,total:shower.total,left:shower.left,stars:shower.stars}}))(play.state()):null,action:city&&mode==='explore'?contextAction():null,atmosphere:world?.atmosphere(),totalStars:world?.stars().length});
window.advanceTime=ms=>{world?.advance(ms);refresh();};
