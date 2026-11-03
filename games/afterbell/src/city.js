import {prepareCargo} from './city-job.js';
import './city.css';
import snapshot from './content-snapshot.json';
import {validQuiz,makeRound,answer,progress,academicScore,starsFor,restoreRound} from './core.js';
import {quizFingerprint} from './fingerprint.js';
import {roles,places,objective,currentJob,inCity} from './city-data.js';
import {cityWorld} from './city-world.js';

const $=id=>document.getElementById(id);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const DRAFT='prepx-festival-city-v1';
const read=(store,key)=>{try{return store.getItem(key);}catch{return null;}};
const put=(store,key,v)=>{try{store.setItem(key,v);}catch{}};
let mode='menu',quiz=snapshot.quizzes[0],source='snapshot',role='courier',round,city,world,loadId=0,saveClock=0,timer,feedback=null;
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
$('quiz').innerHTML=Object.entries({hebrew:'עברית',physics:'פיזיקה',english:'אנגלית'}).map(([id,label])=>`<optgroup label="${label}">${snapshot.quizzes.filter(q=>q.subject_id===id).map(q=>`<option value="${esc(q.id)}">${esc(q.title)}</option>`).join('')}</optgroup>`).join('');
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
 const status=d<=4.3?'הגעתם! לחצו על ״'+o.action+'״.':p.district+' · '+Math.round(d)+' מטר · אפשר לנהוג או ללחוץ על הובלה.';
 if($('status').textContent!==status)$('status').textContent=status;
 const pin=world.project(p);$('pin').hidden=!pin.visible;$('pin').style.left=pin.x+'px';$('pin').style.top=pin.y+'px';
}
function start(resume){
 const old=resume&&restore();if(resume&&!old)return;
 if(old){({city,round}=old);role=city.role;drawRoles();feedback=city.feedback||null;}else{
  feedback=null;
  const name=$('player-name').value.trim();if(!name){$('player-name').setCustomValidity('כתבו שם או כינוי.');$('player-name').reportValidity();return;}
  put(localStorage,'prepx-afterbell-name',name);round=makeRound(quiz);round.participantName=name;
  const lastKey='prepx-city-shift-'+role,edition=read(localStorage,lastKey)==='0'?1:0;put(localStorage,lastKey,String(edition));
  city={role,edition,stage:0,phase:'pickup',x:places.home.x,z:places.home.z+2,driving:false};
 }
 $('welcome').hidden=true;$('hud').hidden=false;mode='explore';world.start(city.x,city.z);world.paint(roles[city.role].color);updateTarget();refresh();save();
 if(city.phase==='quiz')question();if(city.phase==='complete')finish();
}
$('entry').onsubmit=e=>{e.preventDefault();start(false);};$('player-name').oninput=()=>$('player-name').setCustomValidity('');$('resume').onclick=()=>start(true);
function sheet(html,nextMode){
 world.setPaused(true);mode=nextMode;$('sheet').hidden=false;$('hud').inert=true;$('sheet-body').innerHTML=html;$('sheet-body').scrollTop=0;
 const focus=$('sheet-title');if(focus){focus.tabIndex=-1;focus.focus({preventScroll:true});}
}
function closeSheet(){mode='explore';$('sheet').hidden=true;$('hud').inert=false;world.setPaused(false);updateTarget();refresh();$('route').focus({preventScroll:true});}
function reference(q){
 const ref=quiz.references.find(r=>r.id===q.ref.id);if(!ref)return '';
 const u=new URL(ref.url||'/subject.html?subject='+quiz.subject_id,'https://hitech.agnon.online');return ['https:','http:'].includes(u.protocol)?`<a href="${esc(u.href)}" target="_blank" rel="noopener">מקור: ${esc(ref.title)} ${esc(q.ref.part||'')} ↗</a>`:'';
}
function question(){
 const index=city.stage,p=progress(round,index);
 if(!p.next&&!feedback){city.stage++;city.phase=city.stage===3?'final':'pickup';save();closeSheet();toast(city.stage===3?'כל העיר מוכנה! סעו לבמת המזח.':'המסירה הושלמה. המשימה הבאה על המפה.');return;}
 const q=round.questions.find(q=>q.id===(feedback||p.next)),a=round.answers[q.id],job=currentJob(city);
 sheet(`<div class="kicker">✓ ${esc(job[2])} הגיע ליעד · ${esc(quiz.title)}</div><h2 id="sheet-title" dir="auto">${esc(q.prompt)}</h2><small>שאלת תרגול · ${p.answered+(a?0:1)} מתוך ${p.total} במסירה הזאת</small>
 ${q.options.map(o=>`<button data-opt="${o.original}" ${a?'disabled':''} class="${a&&o.original===q.correct?'right':a&&o.original===a.choice?'wrong':''}"><bdi>${esc(o.text)}</bdi></button>`).join('')}
 ${a?`<div class="explain" role="status"><b>${a.correct?'נכון!':'הפעם התשובה שונה.'}</b><p>${esc(q.explanation.he)}</p>${q.explanation.en?`<p dir="ltr" lang="en">${esc(q.explanation.en)}</p>`:''}${reference(q)}</div><button id="next-q" class="cta">${p.next?'לשאלה הבאה':'להמשיך במשמרת'} ←</button>`:reference(q)}`,'question');
 document.querySelectorAll('[data-opt]').forEach(b=>b.onclick=()=>{if(answer(round,q.id,Number(b.dataset.opt))){feedback=city.feedback=q.id;save();question();}});
 if($('next-q'))$('next-q').onclick=()=>{feedback=city.feedback=null;save();question();};
}
function interact(){
 if(mode!=='explore')return;const o=objective(city),p=places[o.place];if(Math.hypot(city.x-p.x,city.z-p.z)>4.3)return;
 world.stop();if(city.stage===3){city.phase='complete';save();finish();return;}
 if(city.phase==='pickup'){prepareCargo(city,sheet,()=>{city.phase='deliver';save();closeSheet();toast('הציוד איתכם. עכשיו '+objective(city).title);},closeSheet);return;}
 city.phase='quiz';save();question();
}
$('action').onclick=interact;
$('route').onclick=()=>{if(mode!=='explore')return;const p=places[objective(city).place];if(Math.hypot(city.x-p.x,city.z-p.z)<=4.3){interact();return;}if(world.moving())world.stop();else if(!world.go(p.x,p.z))toast('הדרך חסומה. נסו לצאת לרחוב.');refresh();};
$('vehicle').onclick=()=>{if(mode!=='explore')return;city.driving=!city.driving;world.drive(city.driving);save();updateTarget();refresh();toast(city.driving?roles[city.role].vehicle+' מוכן לנסיעה':'חזרה להליכה');};
function map(){
 const marks=Object.entries(places).map(([id,p],i)=>`<circle cx="${p.x}" cy="${p.z}" r="8" fill="${id===objective(city).place?'#e97551':'#27675e'}"/><text x="${p.x}" y="${p.z+4}" font-size="12" fill="white" text-anchor="middle">${i+1}</text>`).join('');
 sheet(`<span class="kicker">מפרץ הדר · מפת העיר</span><h2 id="sheet-title">לאן נוסעים?</h2><svg class="district-map" viewBox="-240 -240 480 480" role="img" aria-label="מיקום השחקן ושמונה יעדים"><rect x="-240" y="185" width="480" height="55" fill="#74bec9"/>${Array.from({length:8},(_,i)=>`<path d="M${i*56-224} -240v425 M-240 ${i*56-224}h480" stroke="#eee5cf" stroke-width="6"/>`).join('')}${marks}<circle cx="${city.x}" cy="${city.z}" r="5" fill="#ffcf54" stroke="#403b31"/></svg>${Object.entries(places).map(([id,p],i)=>`<button data-place="${id}">${i+1} · ${p.name} — ${p.district} ${id===objective(city).place?'★ יעד המשימה':''}</button>`).join('')}<button id="close-map" class="cta">חזרה לעיר</button>`,'map');
 document.querySelectorAll('[data-place]').forEach(b=>b.onclick=()=>{closeSheet();const p=places[b.dataset.place];world.go(p.x,p.z);});$('close-map').onclick=closeSheet;
}
$('map').onclick=map;
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
window.addEventListener('keydown',e=>{if(e.repeat)return;if(mode==='map'&&e.code==='Escape'){closeSheet();return;}if(mode!=='explore')return;if(e.code==='KeyE')interact();if(e.code==='KeyV')$('vehicle').click();if(e.code==='KeyM')map();});
window.addEventListener('pagehide',save);
try{world=cityWorld($('scene'),(x,z,dt)=>{if(!city)return;city.x=x;city.z=z;round.elapsed+=dt;saveClock+=dt;if(saveClock>1){save();saveClock=0;}});}
catch{toast('כדי להיכנס לעיר צריך דפדפן עם תמיכה בתלת־ממד.');}
setInterval(refresh,100);drawRoles();loadQuiz();
window.render_game_to_text=()=>JSON.stringify({mode,source,quiz:quiz.id,role:city?.role,stage:city?.stage,phase:city?.phase,coordinateSystem:'x east, z south; metres; city edges ±240 with waterfront at z=188',player:world?.getPlayer(),target:city?objective(city):null,driving:city?.driving,answered:round?Object.keys(round.answers).length:0,rendering:{pixelRatio:world?.pixelRatio}});
window.advanceTime=ms=>{world?.advance(ms);refresh();};
