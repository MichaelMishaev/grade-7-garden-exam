import {questionMedia} from '../../english-question-media.js';
import {HOME,landmarks,regionAt,skyGates} from './territory.js';
import {atlasMap,atlasPage} from './atlas.js';
import { editions, newRelay, station, symbols, charged, sparksAt } from './relay.js';
import { SCENARIOS, scenarioById, recommendedScenario, newScenario, scenarioStage, scenarioStep, scenarioGoal, fieldAction, taskData, tickField } from './scenarios.js';
import { mountFieldTask } from './field-tasks.js';
import './scenarios.css';
import { nextObjective, extraMissions, sideMission, EQUIPMENT_CHECKS, checkOperation } from './mission.js';
import { quizFingerprint } from './fingerprint.js';
import './style.css';
import './environment.css';
import './mission.css';
import { ENVIRONMENT, normalizeEnvironment, environmentStatus, environmentAction, puzzleSolved } from './environment.js';
import snapshot from './content-snapshot.json';
import { createWorld } from './world.js';
import { NPCS, EQUIPMENT, EXIT, makeRound, validQuiz, answer, progress, academicScore, starsFor, canEscape, restoreRound, shuffle } from './core.js';
const $ = id => document.getElementById(id);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' })[c]);
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const storage = { get(key) { try { return localStorage.getItem(key); } catch { return null; } }, set(key,v) { try { localStorage.setItem(key,v);return true; } catch {return false;} } };
const DRAFT = 'prepx-afterbell-draft-v1';
const PENDING = 'prepx-afterbell-pending-v1';
function pendingResults(){try{const a=JSON.parse(storage.get(PENDING)||'[]');return Array.isArray(a)?a:[];}catch{return [];}}
function queueResult(payload){const a=pendingResults().filter(p=>p.id!==payload.id);a.push(payload);return storage.set(PENDING,JSON.stringify(a));}
async function sendResult(payload){try{const response=await fetch('/api/afterbell/attempts',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload),signal:AbortSignal.timeout(6000)});if(!response.ok)return false;const result=await response.json();if(result.saved!==true)return false;storage.set(PENDING,JSON.stringify(pendingResults().filter(p=>p.id!==payload.id)));return true;}catch{return false;}}
async function flushPending(){for(const payload of pendingResults()){if(!await sendResult(payload))continue;if(mode==='complete'&&round?.attemptId===payload.id&&$('save-status'))$('save-status').textContent='✓ התוצאה נשמרה בהיסטוריית המשחק.';}}
window.addEventListener('online',flushPending);
let atlasTarget=null;
let trackedEnvironment=null, objectiveKey='', lastRadioAt=0, lastMovementAt=0, fieldCheck=null;
let guidedNpc=0, guidedEquipment=null, participantName='', draftStored=false, resultQueued=false;
let quiz=snapshot.quizzes[0], round=null, mode='menu', activeNpc=null, activeQuestion=null, source='snapshot', feedbackTimer=null, toastTimer=null, autoAdvance=null, sound=false, audio=null, world=null, saveCounter=0, finishPromise=null, dialogReturn=null, loadingGeneration=0;
const dialog=$('dialog');
const quizSelect=$('quiz');
quizSelect.innerHTML=Object.entries({hebrew:'עברית',physics:'פיזיקה',english:'אנגלית'}).map(([subject,label])=>`<optgroup label="${label}">${snapshot.quizzes.filter(q=>q.subject_id===subject).map(q=>`<option value="${esc(q.id)}">${label} · ${esc(q.title)}</option>`).join('')}</optgroup>`).join('');
const scenarioSelect=$('scenario');
scenarioSelect.innerHTML=SCENARIOS.map((s,i)=>`<option value="${s.id}">${String(i+1).padStart(2,'0')} · ${esc(s.title)}</option>`).join('');
function previewScenario(){const s=scenarioById(scenarioSelect.value);$('scenario-preview').textContent=s.brief;}
scenarioSelect.onchange=previewScenario;
const requested=new URLSearchParams(location.search).get('quiz');
if(snapshot.quizzes.some(q=>q.id===requested))quizSelect.value=requested;
scenarioSelect.value=recommendedScenario(quizSelect.value,storage.get('prepx-afterbell-last-scenario'));previewScenario();
$('player-name').value=storage.get('prepx-afterbell-name')||'';
function toast(text){$('toast').textContent=text;$('toast').classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').classList.remove('visible'),3300);}
function beep(correct=true){if(!sound)return;try{audio??=new AudioContext();audio.resume();const o=audio.createOscillator(),g=audio.createGain();o.connect(g);g.connect(audio.destination);o.type='sine';o.frequency.setValueAtTime(correct?520:270,audio.currentTime);o.frequency.exponentialRampToValueAtTime(correct?780:220,audio.currentTime+.12);g.gain.setValueAtTime(.035,audio.currentTime);g.gain.exponentialRampToValueAtTime(.001,audio.currentTime+.25);o.start();o.stop(audio.currentTime+.26);}catch{}}
function saveDraft(){if(!round)return;try{sessionStorage.setItem(DRAFT,JSON.stringify(round));draftStored=true;}catch{draftStored=false;}}
function readDraft(){try{return sessionStorage.getItem(DRAFT);}catch{return null;}}
function clearDraft(){try{sessionStorage.removeItem(DRAFT);}catch{}}
function updateResume(){const saved=restoreRound(readDraft(),quiz);$('resume').classList.toggle('hidden',!saved);}
async function loadQuiz(){
  const generation=++loadingGeneration, id=quizSelect.value;
  $('start').disabled=true;$('scenario-start').disabled=$('relay-start').disabled=true;$('resume').disabled=true;$('source-status').textContent='מתחברים לשאלות של PrepX…';
  let next=snapshot.quizzes.find(q=>q.id===id), nextSource='snapshot';
  try {const response=await fetch(`/api/afterbell/quizzes/${id}`,{signal:AbortSignal.timeout(3500)});if(response.ok){const data=await response.json();if(data.id===id&&validQuiz(data)){next=data;nextSource='database';}}}catch{}
  if(generation!==loadingGeneration)return;
  quiz=next;source=nextSource;
  $('source-status').textContent=source==='database'?`● ${quiz.questions.length} שאלות מחוברות למאגר PrepX`:`מצב לא מקוון · ${quiz.questions.length} שאלות מעותק מאגר PrepX`;
  $('start').disabled=!world;$('scenario-start').disabled=$('relay-start').disabled=!world;$('resume').disabled=!world;updateResume();
}
quizSelect.addEventListener('change',()=>{scenarioSelect.value=recommendedScenario(quizSelect.value,storage.get('prepx-afterbell-last-scenario'));previewScenario();const u=new URL(location.href);u.searchParams.set('quiz',quizSelect.value);history.replaceState(null,'',u);loadQuiz();});
function closeDialog(){clearTimeout(feedbackTimer);feedbackTimer=null;autoAdvance=null;if(dialog.open)dialog.close();if(mode!=='menu'&&mode!=='complete'){mode='explore';activeQuestion=null;world?.setPaused(false);}if(mode==='menu')world?.setPaused(false);dialogReturn?.focus();}
function openDialog(eyebrow,html,nextMode){if(nextMode!=='question'&&nextMode!=='feedback')activeQuestion=null;clearTimeout(feedbackTimer);autoAdvance=null;dialogReturn=document.activeElement;mode=nextMode;world?.setPaused(true);$('dialog-eyebrow').textContent=eyebrow;$('dialog-body').innerHTML=html;if(!dialog.open)dialog.showModal();$('dialog-body').scrollTop=0;$('close-dialog').focus();bindNpcConversation();releaseStick();}
$('close-dialog').addEventListener('click',()=>{if(mode==='complete'){returnToMenu();}else closeDialog();});
dialog.addEventListener('cancel',e=>{e.preventDefault();if(mode==='complete')returnToMenu();else closeDialog();});
function start(resume=false,relay=false,fieldCase=false){
  if(!world)return;
  const name=$('player-name').value.trim();if(!name){$('player-name').setCustomValidity('רק שם או כינוי, ומתחילים.');$('player-name').reportValidity();$('player-name').focus();return;}
  $('player-name').setCustomValidity('');storage.set('prepx-afterbell-name',name);
  round=resume?restoreRound(readDraft(),quiz):null;round??=makeRound(quiz);
  if(relay){round.relay=newRelay(Number(storage.get('afterbell-last-relay')??-1));storage.set('afterbell-last-relay',String(round.relay.edition));}
  if(!resume&&fieldCase){round.scenario=newScenario(scenarioSelect.value);storage.set('prepx-afterbell-last-scenario',round.scenario.id);}
  atlasTarget=null;trackedEnvironment=null;guidedNpc=null;objectiveKey='';lastMovementAt=lastRadioAt=round.elapsed;
  document.querySelector('.quest-panel .eyebrow').textContent=round.relay?editions[round.relay.edition].title:'מערכות הקמפוס';
  participantName=round.participantName||name;round.participantName=participantName;finishPromise=null;
  trackedEnvironment=null;objectiveKey='';
  mode='explore';$('welcome').classList.add('hidden');$('hud').classList.remove('hidden');$('pause').classList.remove('hidden');document.body.classList.add('playing');
  world.setPlayer(round.player.x,round.player.z);world.setActive(true);world.setPaused(false);world.setProgress(round);round.environment=normalizeEnvironment(round.environment);world.setEnvironment(round.environment,{animate:false});world.resumeRealtime();updateHud();saveDraft();
  $('scenario-heading').textContent=round.relay?editions[round.relay.edition].title:round.scenario?`${scenarioById(round.scenario.id).title} · תיק שטח`:'מערכות הקמפוס';
  $('world-labels').innerHTML=NPCS.map(n=>`<span class="world-label" id="label-${n.id}"><b>${NPCS.indexOf(n)+1}</b>${esc(n.name)}</span>`).join('')+EQUIPMENT.map(e=>`<span class="world-label equipment-label" id="label-${e.id}">▣ ${esc(e.short)}</span>`).join('')+'<span class="world-label" id="label-exit">שער היציאה</span><span class="world-label environment-label" id="label-environment"></span><span class="world-label" id="label-field"></span>';
  guidedNpc=nextObjective(round,null,world.getPlayer()).index??-1;guidedEquipment=null;objectiveKey='';updateHud();
  if(!resume&&round.relay){
    const edition=editions[round.relay.edition];
    openDialog('תיק שטח 02 · מסילת הכוכבים',`<h2 id="dialog-title">${edition.title}</h2><p class="dialog-copy">${edition.story}</p><p class="feedback-note">בחרו פנס בעזרת המספרים. באטלס תמצאו את שלושת חבלי הארץ, גשרים ואבני דרך למעבר מהיר. אפשר להגיע לבד או עם ״ללכת איתי״. בכל פנס מחכים אתגר שטח ושאלות מתוך ${esc(quiz.title)}. אין מגבלת זמן.</p><button id="begin-adventure" class="primary">יוצאים בעקבות האור ←</button>`,'tutorial');
    $('begin-adventure').onclick=()=>{closeDialog();updateMap();};
  }else if(!resume&&round.scenario){const scenario=scenarioById(round.scenario.id);openDialog('תיק שטח · '+scenario.title,`<h2 id="dialog-title">${esc(scenario.title)}</h2><p class="dialog-copy">${esc(scenario.brief)}</p><ol class="tutorial-steps">${scenario.steps.map(step=>`<li>${esc(step.title)}</li>`).join('')}</ol><p class="feedback-note">בכל שלב: משימת שטח אחרת ואז שאלות מ${esc(quiz.title)}. C להליכה שקטה, Q לזינוק קצר, רווח לקפיצה. בנייד יש כפתורים. עם מטען הולכים לאט. אין לחץ זמן או קנס על טעויות בשטח.</p><button id="begin-adventure" class="primary">למשימה הראשונה ←</button>`,'tutorial');$('begin-adventure').onclick=()=>{closeDialog();updateMap();};}
  else if(!resume){openDialog('תדריך · ז׳ איינשטיין',`<h2 id="dialog-title">החשמל נפל. השער נשאר נעול.</h2><p class="school-name">בית הספר שי עגנון · כיתת הייטק</p><p class="dialog-copy">נשארתם אחרי ההאקתון. שלוש תחנות הפרויקט כבו, וביער מסתובב שועל שלא מצא את הדרך החוצה. הצוות שלכם עדיין במתחם.</p><ol class="tutorial-steps"><li>המשימה הקרובה כבר מסומנת. הולכים בעקבות הנקודות המוארות ומקשיבים לאיש הצוות.</li><li>מאתרים את הציוד החסר ומפעילים את בדיקת השטח שלו: קוד, חיבורים או כיוון אות.</li><li>משלימים את שאלות התרגול בכל תחנה, מפעילים את שלוש המערכות ויוצאים בשער הצפוני.</li></ol><p class="feedback-note">אפשר לחקור בכל סדר. ״ללכת איתי״ מוביל אתכם ליעד; ״צריך רמז?״ מסביר מה עושים. משימות הצד מוסיפות אתגרים בדרך. אין לחץ זמן.</p><button id="begin-adventure" class="primary">יוצאים לבדוק את המתחם ←</button>`,'tutorial');$('begin-adventure').onclick=()=>{closeDialog();updateMap();toast('המשימה הראשונה מסומנת למעלה. עקבו אחרי הנקודות המוארות, או לחצו על ״ללכת איתי״.');};}
}
$('player-name').addEventListener('input',()=>{$('player-name').setCustomValidity('');});
$('scenario-start').onclick=()=>start(false,false,true);$('relay-start').addEventListener('click',()=>start(false,true));$('start').addEventListener('click',()=>start());$('resume').addEventListener('click',()=>start(true));
function returnToMenu(){closeDialog();mode='menu';world.hideRelay();world.setActive(false);scenarioSelect.value=recommendedScenario(quizSelect.value,storage.get('prepx-afterbell-last-scenario'));previewScenario();world.setPaused(false);world.resumeRealtime();$('welcome').classList.remove('hidden');$('hud').classList.add('hidden');$('pause').classList.add('hidden');document.body.classList.remove('playing');updateResume();}
function nearest(){if(!round||!world)return null;const p=world.getPlayer();const field=round.scenario&&scenarioGoal(round);if(field&&Math.hypot(p.x-field.x,p.z-field.z)<2.2)return {type:'scenario',d:0};if(world.isObserving())return {type:'observation',d:0};if(round.environment.seated)return {type:'environment',id:'bench',d:0};const selected=ENVIRONMENT.find(e=>e.id===trackedEnvironment);if(selected){const d=Math.hypot(p.x-selected.x,p.z-selected.z);if(d<selected.range)return {type:'environment',id:selected.id,d};}let best=null;
  if(round.relay){
    for(let i=0;i<3;i++){
      const site=station(round.relay,i),d=Math.hypot(p.x-site.x,p.z-site.z);
      if(d<2.8&&!round.seals.includes(NPCS[i].id))best={type:'relay',i,d};
      if(site.task==='sparks')for(const spark of sparksAt(site)){
        if(round.relay.steps[i]&(1<<spark.bit))continue;
        const distance=Math.hypot(p.x-spark.x,p.z-spark.z);
        if(distance<1.95&&(!best||best.type!=='spark'||distance<best.d))best={type:'spark',i,bit:spark.bit,d:distance};
      }
    }
  }else{
  NPCS.forEach((n,i)=>{const d=Math.hypot(p.x-n.x,p.z-n.z);if(d<3.5&&(!best||d<best.d))best={type:'npc',i,d};});
  EQUIPMENT.forEach((e,i)=>{if(round.scenario||round.items.includes(e.id))return;const d=Math.hypot(p.x-e.x,p.z-e.z);if(d<2.8&&(!best||d<best.d))best={type:'equipment',i,d};});
  }
  const d=Math.hypot(p.x-EXIT.x,p.z-EXIT.z);if(d<3.5&&(!best||d<best.d))best={type:'exit',d};if(best)return best;
  ENVIRONMENT.forEach(e=>{const d=Math.hypot(p.x-e.x,p.z-e.z);if(d<e.range&&(!best||d<best.d))best={type:'environment',id:e.id,d};});
  world.animals().forEach(a=>{if(a.type==='duck')return;const d=Math.hypot(p.x-a.x,p.z-a.z);if(d<2.4&&(!best||d<best.d-.8))best={type:'animal',id:a.id,d};});return best;
}
function interact(){if(mode!=='explore')return;const n=nearest();if(!n)return;if(n.type==='relay'||n.type==='spark'){relayInteract(n);return;}if(n.type==='scenario'){inspectScenario();return;}if(n.type==='observation'){world.observe(false);updateMap();return;}if(n.type==='environment'){inspectEnvironment(n.id);return;}if(n.type==='animal'){inspectAnimal(n.id);return;}if(n.type==='exit'){if(canEscape(round))finish();else toast(round.relay?`נותרו ${3-round.seals.length} פנסים להדלקה. בחרו פנס במפה.`:`עוד ${3-round.seals.length} מערכות צריכות לחזור לפעולה. בחרו תחנה במפה.`);}else if(n.type==='equipment')inspectEquipment(n.i);else talk(n.i);}
$('interact').addEventListener('click',interact);
const initials=['נ','א','א'];
function character(i){const n=NPCS[i];return `<div class="character-chip"><div class="portrait" aria-hidden="true">${initials[i]}</div><div><h2 id="dialog-title">${esc(n.name)}</h2><small>${esc(n.role)}</small></div></div><button class="text-button npc-chat" data-npc-chat="${i}">לשוחח ולעזור לצוות ↗</button>`;}
function talk(i){if(round.scenario){const goal=scenarioGoal(round);if(goal){toast(goal.hint);return;}toast('כל משימות השטח הושלמו. השער פתוח.');return;}activeNpc=i;const n=NPCS[i],p=progress(round,i);
  if(round.seals.includes(n.id)){openDialog('חברים לדרך',character(i)+`<p class="dialog-copy">${i===0?'מסוף הגישה פעיל. רשמתי את התקלה. עכשיו רק צריך להסביר למורה למה התאריך בדוח הוא מחר.':i===1?'מערכת הגיבוי פועלת. פעם הבאה נבדוק אותה לפני שכולם הולכים הביתה. רעיון מהפכני.':'הקשר חזר. אם תשמעו רעש מהיער — הפעם אני הולך לבדוק. עם פנס. ועם מישהו.'}</p><button id="back-world" class="primary">ממשיכים לחקור ←</button>`,'dialogue');$('back-world').onclick=closeDialog;return;}
  if(round.understood.includes(n.id)){if(!round.items.includes(EQUIPMENT[i].id))equipmentMission(i);else showQuestion(i);return;}
  const choices=shuffle(n.choices.map((text,original)=>({text,original})));
  openDialog('לפני שפותרים, מקשיבים',character(i)+`<p class="dialog-copy">${esc(n.line)}</p><div class="options">${choices.map(c=>`<button class="option social" data-choice="${c.original}">${esc(c.text)}</button>`).join('')}</div><p id="social-feedback" class="feedback-note" role="status"></p>`,'dialogue');
  document.querySelectorAll('.social').forEach(b=>b.onclick=()=>{if(Number(b.dataset.choice)!==n.need){$('social-feedback').textContent=n.wrong;beep(false);return;}
    round.understood.push(n.id);saveDraft();beep();equipmentMission(i);
  });
}
function equipmentMission(i){
  const n=NPCS[i],e=EQUIPMENT[i],has=round.items.includes(e.id);
  openDialog(`תחנה ${i+1} · ${n.system}`,character(i)+`<p class="dialog-copy">${esc(n.reply)}</p><div class="journal-entry"><h3>${has?'✓ הציוד איתכם':`נדרש: ${esc(e.name)}`}</h3><p>${has?esc(e.report):esc(e.hint)}</p></div><p class="feedback-note">${progress(round,i).total} שאלות מהתרגול הנבחר מפעילות את בדיקת התחנה. ציון הלימוד נפרד מהציוד ומהחקירה.</p><button class="primary" id="${has?'begin-questions':'track-equipment'}">${has?'מפעילים את מסוף התרגול':'סימון הציוד במפה'} ←</button>`,'mission');
  if(has)$('begin-questions').onclick=()=>showQuestion(i);
  else $('track-equipment').onclick=()=>{guidedNpc=i;guidedEquipment=e.id;closeDialog();updateHud();toast(e.hint);};
}
function inspectScenario(){
 const step=scenarioStep(round),index=scenarioStage(round);if(!step)return;
 const goal=scenarioGoal(round),p=world.getPlayer();if(Math.hypot(p.x-goal.x,p.z-goal.z)>2.2)return;
 if(round.scenario.completed.includes(index)){
  if(!round.items.includes(EQUIPMENT[index].id))round.items.push(EQUIPMENT[index].id);
  if(!round.understood.includes(NPCS[index].id))round.understood.push(NPCS[index].id);
  saveDraft();world.setProgress(round);showQuestion(index);return;
 }
 if(['robot-escort','rescue-trust','courier-course'].includes(step.kind)){
  const result=fieldAction(round,{type:step.kind==='rescue-trust'?'befriend':'checkpoint'},p,{...world.movement(),companion:world.getCompanion()});saveDraft();objectiveKey='';updateHud();toast(result.message);return;
 }
 openDialog(`תיק שטח · שלב ${index+1}/3`, `<h2 id="dialog-title">${esc(step.title)}</h2><p class="dialog-copy">${esc(step.hint)}</p><div class="field-check scenario-puzzle"><div id="task-workspace"></div><p id="scenario-status" role="status">משימת שטח · אינה משנה את ציון הלימוד</p><button id="field-to-quiz" class="primary hidden">✓ הושלם — לשאלות התרגול ←</button></div>`,'field');
 let controls;
 controls=mountFieldTask($('task-workspace'),round,(action,paint=true)=>{
  const result=fieldAction(round,action,world.getPlayer(),{...world.movement(),companion:world.getCompanion()});saveDraft();
  if(paint)$('scenario-status').textContent=result.message;
  if(result.walk){closeDialog();objectiveKey='';updateHud();toast(result.message);return result;}
  if(result.complete){controls.render();$('task-workspace').querySelectorAll('button,input,select').forEach(el=>el.disabled=true);$('field-to-quiz').classList.remove('hidden');$('field-to-quiz').focus();world.setProgress(round);updateHud();beep();}
  return result;
 });
 $('field-to-quiz').onclick=()=>inspectScenario();
}

function inspectEquipment(i){const e=EQUIPMENT[i],spec=EQUIPMENT_CHECKS[e.id],checked=round.environment.checkedEquipment.includes(e.id);
  fieldCheck={id:e.id,step:0,channel:1};
  openDialog('ממצא בשטח · בדיקת ציוד',`<h2 id="dialog-title">${esc(e.name)}</h2><p class="dialog-copy">${esc(e.clue)}</p><section class="field-check"><h3>${esc(spec.title)}</h3><p>${esc(spec.hint)}</p><div id="field-controls">${checked?'':e.id==='antenna'?'<label for="radio-channel">ערוץ הקשר</label><div class="tuner"><button class="secondary" id="channel-down" aria-label="ערוץ קודם">−</button><output id="radio-channel">1</output><button class="secondary" id="channel-up" aria-label="ערוץ הבא">+</button></div><meter id="signal-meter" min="0" max="5" value="1">עוצמת אות</meter><button class="secondary" id="test-signal">בדיקת האות</button>':`<div class="field-options">${spec.options.map((o,j)=>`<button class="secondary" data-operation="${j}">${esc(o)}</button>`).join('')}</div>`}</div><p id="field-status" role="status">${checked?'✓ הבדיקה הושלמה. אפשר לקחת את הציוד.':'בצעו את הבדיקה כדי לשחרר את הציוד. אין לחץ זמן.'}</p></section><button class="primary" id="collect-equipment" ${checked?'':'disabled'}>לקחת ולהמשיך ←</button>`,'equipment');
  function solved(){round.environment.checkedEquipment.push(e.id);saveDraft();$('field-status').textContent='✓ הבדיקה הצליחה. הציוד מוכן — קחו אותו וחזרו לצוות.';$('field-controls').innerHTML='<div class="field-success">✓ הציוד מגיב</div>';$('collect-equipment').disabled=false;beep();}
  document.querySelectorAll('[data-operation]').forEach(b=>b.onclick=()=>{const step=fieldCheck.step;if(!checkOperation(e.id,step,Number(b.dataset.operation))){fieldCheck.step=0;document.querySelectorAll('[data-operation]').forEach(b=>b.classList.remove('operation-done'));$('field-status').textContent='הסדר עדיין לא מתאים. הרמז נשאר למעלה — מנסים שוב מההתחלה.';beep(false);return;}b.classList.add('operation-done');fieldCheck.step++;$('field-status').textContent=`✓ שלב ${fieldCheck.step} מתוך 3`;beep();if(fieldCheck.step===3)solved();});
  if(!checked&&e.id==='antenna'){const tune=delta=>{fieldCheck.channel=Math.max(1,Math.min(7,fieldCheck.channel+delta));$('radio-channel').textContent=fieldCheck.channel;$('signal-meter').value=5-Math.abs(5-fieldCheck.channel);$('field-status').textContent=fieldCheck.channel===5?'האות יציב. לחצו על בדיקת האות.':'עדיין יש רעש. בדקו את הערוץ המסומן במחברת.';};$('channel-down').onclick=()=>tune(-1);$('channel-up').onclick=()=>tune(1);$('test-signal').onclick=()=>{if(fieldCheck.channel===5)solved();else{$('field-status').textContent='הערוץ לא מתאים. במחברת מסומן 5.';beep(false);}};}
  $('collect-equipment').onclick=()=>{if(!round.environment.checkedEquipment.includes(e.id))return;if(!round.items.includes(e.id))round.items.push(e.id);guidedNpc=e.npc;guidedEquipment=null;trackedEnvironment=null;saveDraft();world.setProgress(round);closeDialog();updateHud();beep();toast(e.report);};
}

function commitEnvironment(patch={},id){
  if(!round)return;Object.assign(round.environment,patch);
  if(id&&!round.environment.visited.includes(id))round.environment.visited.push(id);
  world.setEnvironment(round.environment);saveDraft();updateHud();updateMap();
}
function canUseEnvironment(e){const p=world.getPlayer();return Math.hypot(p.x-e.x,p.z-e.z)<e.range+.1;}
function inspectEnvironment(id){
  const e=ENVIRONMENT.find(e=>e.id===id);if(!e||!canUseEnvironment(e))return;
  const s=round.environment;
  if(id==='solar'){
    openDialog('מנגנון מקומי · חקירה חופשית',`<h2 id="dialog-title">${esc(e.name)}</h2><p class="dialog-copy">${esc(e.description)}</p><div class="environment-switches">${['ירח','שמש','עץ'].map((name,i)=>`<button class="secondary env-switch" data-env-switch="${i}" aria-pressed="${s.switches[i]}"><span>${name}</span><b>${s.switches[i]?'פועל':'כבוי'}</b></button>`).join('')}</div><p id="env-puzzle-status" class="feedback" role="status">${puzzleSolved(s)?'התאורה פועלת. שלושה פנסי שביל נדלקו.':'ההערה על המכסה: ירח ועץ פועלים, שמש כבויה.'}</p><button id="env-leave" class="primary">חזרה לשביל ←</button>`,'environment');
    document.querySelectorAll('[data-env-switch]').forEach(b=>b.onclick=()=>{if(!canUseEnvironment(e))return;const switches=[...round.environment.switches];switches[Number(b.dataset.envSwitch)]=!switches[Number(b.dataset.envSwitch)];commitEnvironment({switches},id);inspectEnvironment(id);});$('env-leave').onclick=closeDialog;return;
  }
  const note=round.scenario&&['locker','noticeboard'].includes(id)?scenarioById(round.scenario.id).brief+' '+scenarioById(round.scenario.id).steps.map(step=>step.title).join(' · '):id==='locker'&&s.lockerOpen?'הפתק בארונית: ״אדם השאיר את האנטנה ליד עמדת הקשר הישנה בדרום־מערב. אם אתם מחזירים, באמת תחזירו.״':e.description;
  openDialog('חקירה חופשית · ללא ציון',`<div class="environment-heading"><span class="environment-category">${esc(environmentStatus(e,s))}</span><h2 id="dialog-title">${esc(e.name)}</h2></div><p class="dialog-copy">${esc(note)}</p><p class="feedback-note">פעולה בקמפוס. אינה מוסיפה שאלות ואינה משנה את ציון התרגול.</p><button id="env-primary" class="primary" data-environment="${id}">${esc(environmentAction(e,s))} ←</button>`,'environment');
  $('env-primary').onclick=()=>{
    if(!canUseEnvironment(e))return;
    const state=round.environment;let message='';
    if(id==='bench'){commitEnvironment({seated:!state.seated},id);message=state.seated?'אפשר להישאר רגע. כדי לקום: תנועה או כפתור הפעולה.':'חוזרים לשטח.';}
    if(id==='door'){
      const p=world.getPlayer();if(state.doorOpen&&Math.abs(p.x+2)<1.6&&Math.abs(p.z+16.86)<.75){toast('זוזו מעט מפתח הדלת לפני שסוגרים אותה.');return;}
      commitEnvironment({doorOpen:!state.doorOpen},id);message=state.doorOpen?'הדלת נפתחה. אפשר להיכנס למבואה.':'דלת המבואה נסגרה.';
    }
    if(id==='lamp'){commitEnvironment({lampOn:!state.lampOn},id);message=state.lampOn?'הרחבה מוארת שוב.':'הפנס כובה. פנס היד שלכם עדיין פועל.';}
    if(id==='basketball'){if(world.environmentAnimation().basketballInFlight){toast('הכדור בדרך חזרה. עוד רגע.');return;}commitEnvironment({shots:state.shots+1},id);message=`קליעה ${state.shots}. הכדור חוזר לעמדה.`;}
    if(id==='locker'){commitEnvironment({lockerOpen:!state.lockerOpen},id);if(state.lockerOpen){inspectEnvironment(id);return;}message='הארונית סגורה. הרמז נשאר ביומן.';}
    if(id==='noticeboard'){commitEnvironment({},id);message=round.scenario?'שלוש המשימות של תיק השטח מופיעות ביומן.':'שלושת מיקומי הציוד תועדו ביומן. גם כתב היד החשוד.';}
    if(id==='telescope'){commitEnvironment({observations:state.observations+1},id);world.observe(true);message='תצפית באגם. לחצו על סיום התצפית כדי לחזור.';}
    if(id==='water'){commitEnvironment({waterFilled:true},id);message='הקערה מלאה. ארנב מהחצר מתקרב בקצב שלו.';}
    if(id==='planter'){commitEnvironment({watered:true},id);message='העלים התרוממו. התברר שהפתרון היה מים.';}
    if(id==='recycling'){commitEnvironment({recycled:true},id);message='שלוש פחיות הגיעו למחזור. עכשיו נשאר לסדר את תיקיית הפרויקט.';}
    if(id==='bike'){commitEnvironment({bells:state.bells+1},id);beep();message='הפעמון מצלצל. בדיקת החומרה הסתיימה.';}
    closeDialog();toast(message);
  };
}
const animalNames={fox:'שועל',rabbit:'ארנב',bird:'ציפור',duck:'ברווז'};
function inspectAnimal(id){
  const a=world.animals().find(a=>a.id===id);if(!a)return;
  const p=world.getPlayer();if(Math.hypot(p.x-a.x,p.z-a.z)>2.8)return;
  commitEnvironment({animalNotes:[...new Set([...round.environment.animalNotes,id])]});
  openDialog('יומן טבע · הקמפוס אחרי הלימודים',`<h2 id="dialog-title">${animalNames[a.type]} בשטח</h2><p class="dialog-copy">${a.type==='fox'?'הוא עוצר, מקשיב, וממשיך. נראה שיש לו תוכנית טובה משלנו. אפשר לתת לו ללכת לידכם בקצב שלו.':a.type==='rabbit'?'האוזניים זזות לפני כל השאר. התצפית נשמרה ביומן; אין צורך להתקרב יותר.':a.type==='duck'?'שלושה ברווזים ממשיכים בסיור באגם. כנראה הם לא קיבלו את הודעת הביטול.':'הציפור כבר מכירה את כל הקמפוס. היא לא מתרשמת במיוחד מכיתת ההייטק.'}</p>${a.type!=='duck'?`<button id="animal-follow" class="primary">${a.following?'לתת לו להמשיך בדרכו':'ללכת יחד קצת'} ←</button>`:''}<button id="animal-leave" class="secondary">להמשיך לחקור</button>`,'environment');
  if($('animal-follow'))$('animal-follow').onclick=()=>{commitEnvironment({following:round.environment.following===id?null:id});closeDialog();toast(round.environment.following===id?'חבר חדש הולך לידכם. אפשר להיפרד דרך אותה פעולת מפגש.':'הוא חוזר לסיבוב שלו בקמפוס.');};$('animal-leave').onclick=closeDialog;
}
function npcConversation(i){
  const n=NPCS[i],helped=round.environment.helped.includes(n.id);
  const topics=[['היומן של נועה מלא בדיקות קטנות. ״כשכל אחד משנה דבר אחר, מתקבלים שלושה באגים ודיון ארוך. נתחיל בעובדות.״','היא מראה את הכיוון של הספרייה: ״כרטיס הצוות נשאר על שולחן העבודה ממערב. תיקי הפרויקט משום מה מסודרים פחות מהקוד.״'],['איתי מצביע על החממה. ״הרובוט היה אמור להשקות. כרגע הוא בעיקר מתעניין בלהיות כבוי.״','״יחידת הגיבוי נמצאת בארגז שממזרח למעבדה. מי שהניח אותה שם קרא לזה פתרון זמני. זה היה בשבוע שעבר.״'],['״הרעש היה מהאגם. בדקתי. ברווז. לא צריך לציין את זה בסיכום ההאקתון.״','״האנטנה נשארה בדרום־מערב. אם נלך יחד לשם, אני אבדוק את השביל ואתם תבדקו שאין עוד ברווז מפתיע.״']][i];
  openDialog('שיחה עם הצוות',character(i)+`<div class="options"><button class="secondary" data-chat-topic="0">איך הולך בינתיים?</button><button class="secondary" data-chat-topic="1">יש עוד רמז לציוד?</button><button id="npc-help" class="primary">${helped?'כבר עזרנו · לבדוק מה השתנה':['לעזור לסדר את הבדיקות','לעזור להניח את הבקר','לבדוק יחד את כיוון הרעש'][i]} ←</button></div><p id="npc-chat-reply" class="dialog-copy" role="status"></p><button id="npc-back" class="text-button">בחזרה למשימת התחנה ←</button>`,'conversation');
  document.querySelectorAll('[data-chat-topic]').forEach(b=>b.onclick=()=>{$('npc-chat-reply').textContent=topics[Number(b.dataset.chatTopic)];});
  $('npc-help').onclick=()=>{commitEnvironment({helped:[...new Set([...round.environment.helped,n.id])]});$('npc-chat-reply').textContent=['נועה מסמנת בדיקה אחת ברשימה ומרימה יד בתודה. ״מדהים, אפשר לפתור דברים בלי ישיבה של שעה.״','איתי מניח את הבקר על העמדה. ״עכשיו יש לי יד פנויה. בשביל להצביע על התקלה הבאה.״','אדם מסמן את כיוון האגם. ״תודה שבדקתם איתי. מוכן להחזיר את הקשר.״'][i];$('npc-help').textContent='העזרה תועדה ביומן';};$('npc-back').onclick=()=>talk(i);
}
function bindNpcConversation(){document.querySelectorAll('[data-npc-chat]').forEach(b=>b.onclick=()=>npcConversation(Number(b.dataset.npcChat)));}

function reference(q){const ref=quiz.references.find(r=>r.id===q.ref.id);if(!ref)return '';let url;try{url=new URL(ref.url||'subject.html?subject='+quiz.subject_id,'https://hitech.agnon.online/');if(!['https:','http:'].includes(url.protocol))return '';}catch{return '';}
  return `<a class="reference" target="_blank" rel="noopener noreferrer" href="${esc(url.href)}">מקור: ${esc(ref.title)}${q.ref.part?' · '+esc(q.ref.part):''} ↗</a>`;
}
function showQuestion(i){if(round.scenario&&!round.scenario.completed.includes(i)){closeDialog();toast('משלימים קודם את משימת השטח.');return;}if(!round.relay&&!round.items.includes(EQUIPMENT[i].id)){equipmentMission(i);return;}const p=progress(round,i);if(!p.next){awardSeal(i);return;}const q=round.questions.find(q=>q.id===p.next);activeQuestion=q;activeNpc=i;
  openDialog(round.relay?station(round.relay,i).title:`${NPCS[i].name} · ${NPCS[i].system}`, `<div class="question-meta"><span>${esc(quiz.title)}</span><span>שאלה ${Object.keys(round.answers).length+1} מתוך ${round.questions.length}</span></div><div class="progress-line"><i style="width:${Object.keys(round.answers).length/round.questions.length*100}%"></i></div><h2 id="dialog-title" dir="auto">${esc(q.prompt)}</h2>${questionMedia(q)}${reference(q)}${round.relay?'':`<button class="text-button npc-chat" data-npc-chat="${i}">רגע לשיחה עם ${esc(NPCS[i].name)} ↗</button>`}<div class="options" id="answer-options">${q.options.map((o,j)=>`<button class="option answer" data-choice="${o.original}"><span class="number">${j+1}</span><span dir="auto">${esc(o.text)}</span></button>`).join('')}</div><div id="answer-feedback" aria-live="polite"></div>`, 'question');
  activeQuestion=q;
  document.querySelectorAll('.answer').forEach(b=>b.onclick=()=>submitAnswer(q,Number(b.dataset.choice),i));
}
function submitAnswer(q,choice,i){const result=answer(round,q.id,choice);if(!result)return;mode='feedback';saveDraft();updateHud();beep(result.correct);
  document.querySelectorAll('.answer').forEach(b=>{b.disabled=true;const v=Number(b.dataset.choice);if(v===q.correct)b.classList.add('correct');if(v===choice)b.classList.add('selected',result.correct?'correct':'wrong');});
  $('answer-feedback').innerHTML=`<div class="feedback"><strong>${result.correct?'✓ תשובה נכונה.':'↺ לא הפעם. הנה ההסבר.'}</strong><p>${esc(q.explanation.he)}</p>${q.explanation.en?`<p class="english" lang="en" dir="ltr">${esc(q.explanation.en)}</p>`:''}</div><button class="text-button" id="hold-feedback">להשהות ולקרוא את ההסבר</button><p class="feedback-note">התשובה נעולה. ההסבר נשאר גם ביומן.</p>`;
  autoAdvance=()=>showQuestion(i);feedbackTimer=setTimeout(()=>{autoAdvance=null;showQuestion(i);},1500);
  $('hold-feedback').onclick=()=>{clearTimeout(feedbackTimer);feedbackTimer=null;autoAdvance=null;$('hold-feedback').textContent='חזרה להמשך אוטומטי';$('hold-feedback').onclick=()=>{autoAdvance=()=>showQuestion(i);feedbackTimer=setTimeout(autoAdvance,1500);$('hold-feedback').disabled=true;};};
}
function awardSeal(i){if(round.scenario&&!round.scenario.completed.includes(i))return;const ready=round.relay?charged(round.relay,i):round.items.includes(EQUIPMENT[i].id)&&round.understood.includes(NPCS[i].id);if(!ready||progress(round,i).next)return;const n=NPCS[i];if(!round.seals.includes(n.id))round.seals.push(n.id);guidedNpc=nextObjective(round,null,world.getPlayer()).index??-1;guidedEquipment=null;trackedEnvironment=null;saveDraft();world.setProgress(round);updateHud();beep();
  if(round.relay){
    openDialog('פנס שמיים · '+round.seals.length+' מתוך 3',`<div class="relay-star" aria-hidden="true">✧</div><h2 id="dialog-title">${station(round.relay,i).name} מואר עכשיו</h2><p class="dialog-copy">${canEscape(round)?'קבוצת הכוכבים של הכיתה זורחת מעל השער הצפוני. בואו לראות אותה.':'קרן אור נוספת הצטרפה למופע. בחרו איזה פנס להדליק עכשיו.'}</p><button id="continue-world" class="primary">חזרה לשטח ←</button>`,'reward');$('continue-world').onclick=closeDialog;return;
  }
  openDialog(`מערכת ${round.seals.length} מתוך 3 חזרה לפעולה`,character(i)+`<div class="score-big" style="font-size:52px">✓</div><h2 class="finish-title">${esc(n.system)} — פעיל</h2><p class="dialog-copy">${canEscape(round)?'הגישה, הגיבוי והקשר פעילים. השער הצפוני נפתח. הגיע הזמן לצאת מהמתחם.':(round.scenario?'שלב התיק הושלם. משימת השטח הבאה כבר מסומנת במפה.':'התחנה מגיבה. אפשר להמשיך לכל אחת מהתחנות האחרות. המפה עודכנה.')}</p><button id="continue-world" class="primary">${canEscape(round)?'לשער היציאה':'חזרה לשטח'} ←</button>`,'reward');$('continue-world').onclick=closeDialog;
}
function updateHud(){if(!round)return;$('seal-slots').innerHTML=NPCS.map((n,i)=>`<button class="seal ${round.seals.includes(n.id)?'done':''} ${(round.scenario?scenarioStage(round)===i:guidedNpc===i)?'selected':''}" data-npc="${i}" title="${esc(round.relay?station(round.relay,i).title:round.scenario?scenarioById(round.scenario.id).steps[i].title:n.name)}" aria-label="תחנה ${i+1}: ${esc(round.relay?station(round.relay,i).title:n.name)}. ${round.seals.includes(n.id)?'הושלם':'הצגת הכיוון'}" aria-pressed="${guidedNpc===i}">${round.seals.includes(n.id)?'✓':i+1}</button>`).join('');
  document.querySelectorAll('[data-npc]').forEach(b=>b.onclick=()=>{atlasTarget=null;if(round.scenario){trackedEnvironment=null;objectiveKey='';updateMission();toast('משימות התיק מתקדמות לפי הסדר. המשימה הנוכחית מסומנת.');return;}trackedEnvironment=null;guidedNpc=Number(b.dataset.npc);guidedEquipment=round.understood.includes(NPCS[guidedNpc].id)&&!round.items.includes(EQUIPMENT[guidedNpc].id)?EQUIPMENT[guidedNpc].id:null;updateHud();});
  $('question-progress').innerHTML=`<bdi dir="ltr">${Object.keys(round.answers).length} / ${round.questions.length}</bdi> שאלות`;$('firefly-count').innerHTML=`✧ <bdi dir="ltr">${round.collected.length} / 12</bdi>`;
  $('objective').textContent=nextObjective(round,guidedNpc,world.getPlayer()).title;if($('environment-progress'))$('environment-progress').textContent=`${round.environment.visited.length}/12 תגליות`;
  $('quest-sub').textContent=nextObjective(round,guidedNpc,world.getPlayer()).hint;updateMission();
}

function currentGoal(){return atlasTarget||ENVIRONMENT.find(e=>e.id===trackedEnvironment)||nextObjective(round,guidedNpc,world.getPlayer());}
function updateMission(){
  if(!round||!world)return;world.setCarrying(!!round.scenario?.carrying);const motion=world.movement();$('crouch').setAttribute('aria-pressed',String(motion.crouching));$('crouch').disabled=motion.carrying;$('dash').disabled=motion.carrying||motion.crouching||motion.dashCooldown>0;$('dash').textContent=motion.carrying?'נושאים ציוד':motion.dashCooldown>0?`זינוק · ${motion.dashCooldown.toFixed(1)}`:'זינוק Q';const step=round.scenario&&scenarioStep(round);world.setScenario(step,round.scenario?.checkpoint,round.scenario?.completed.includes(scenarioStage(round)));world.setCompanion(step?.entity,round.attemptId+':'+(step?.kind||''),step?{x:taskData(round).robotX??step.x+(step.entity==='fox'?0:1),z:taskData(round).robotZ??step.z+(step.entity==='fox'?0:1)}:null);
  const goal=currentGoal(),key=goal.id,main=atlasTarget||nextObjective(round,guidedNpc,world.getPlayer());
  if(key!==objectiveKey){objectiveKey=key;world.guideTo?.(goal.x,goal.z);$('objective').textContent=trackedEnvironment?`משימת שטח: ${goal.name}`:main.title;$('quest-sub').textContent=trackedEnvironment?(extraMissions(round).find(m=>m.id===goal.id)?.hint||goal.description):main.hint;lastRadioAt=round.elapsed;}
  if(step?.kind==='rescue-trust'&&!round.scenario.completed.includes(scenarioStage(round)))$('quest-sub').textContent=step.hint+` · אמון: ${Math.round((taskData(round).trust||0)/3*100)}%`;
  const navigation=world.guidance?.();$('follow-path').textContent=navigation?.following?'עצירת ההליכה':navigation?.arrived?'הגעתם — לפעולה':'ללכת איתי';
  $('follow-path').disabled=mode!=='explore';
  if(trackedEnvironment){const side=extraMissions(round).find(m=>m.id===trackedEnvironment);if(side?.done(round.environment)){trackedEnvironment=null;objectiveKey='';toast('✓ משימת הצד הושלמה. חוזרים למסלול הראשי — אפשר לבחור עוד משימת צד.');return;}}
  if(mode==='explore'&&round.elapsed-lastMovementAt>18&&round.elapsed-lastRadioAt>25){lastRadioAt=round.elapsed;toast(`הצעד הבא: ${main.title}. כפתור ״ללכת איתי״ יוביל אתכם, או פתחו רמז.`);}
}
$('follow-path').onclick=()=>{if(mode!=='explore')return;const nav=world.guidance?.();if(nav?.following){world.stopGuide?.();return;}if(nav?.arrived){interact();return;}world.followGuide?.();toast('עוקבים אחרי השביל. תנועה בג׳ויסטיק או בחצים מחזירה לכם את השליטה.');};
$('mission-hint').onclick=()=>{if(!round)return;const goal=currentGoal(),main=nextObjective(round,guidedNpc,world.getPlayer());openDialog('קשר צוות · הצעד הבא',`<h2 id="dialog-title">${esc(trackedEnvironment?goal.name:main.title)}</h2><p class="dialog-copy">${esc(trackedEnvironment?goal.description:main.hint)}</p><ol class="tutorial-steps"><li>הנקודות המוארות עוקפות עצים ומבנים ומובילות ליעד.</li><li>אפשר ללכת לבד או ללחוץ על ״ללכת איתי״. תנועה ידנית עוצרת את ההובלה.</li><li>כשמגיעים, לחצו על כפתור הפעולה הגדול. הוא אומר בדיוק מה אפשר לעשות.</li></ol><button id="hint-return" class="primary">הבנתי, ממשיכים לשטח ←</button><button id="hint-main" class="text-button">חזרה למשימה הראשית</button>`,'hint');$('hint-return').onclick=closeDialog;$('hint-main').onclick=()=>{atlasTarget=null;trackedEnvironment=null;objectiveKey='';closeDialog();updateHud();};};
$('side-task').onclick=()=>{if(!round)return;openDialog('חקירה חופשית · אתגרי שטח',`<h2 id="dialog-title">עוד משהו לעשות בדרך</h2><p class="dialog-copy">${extraMissions(round).filter(m=>m.done(round.environment)).length} מתוך ${extraMissions(round).length} משימות צד הושלמו. בוחרים משימה והשביל מתעדכן. הציון הלימודי נשאר נפרד.</p>${extraMissions(round).map(m=>`<button class="side-mission ${m.done(round.environment)?'side-done':''}" data-side-mission="${m.id}"><strong>${m.done(round.environment)?'✓ ':''}${esc(m.title)}</strong><span>${esc(m.hint)}</span><small>${m.done(round.environment)?'הושלם':'סימון מסלול ←'}</small></button>`).join('')}<button id="side-main" class="text-button">להמשיך במשימה הראשית ←</button>`,'sidequests');document.querySelectorAll('[data-side-mission]').forEach(b=>b.onclick=()=>{atlasTarget=null;trackedEnvironment=b.dataset.sideMission;objectiveKey='';closeDialog();updateMission();});$('side-main').onclick=()=>{atlasTarget=null;trackedEnvironment=null;objectiveKey='';closeDialog();updateHud();};};

function updateMap(){if(!world||!round||mode==='menu')return;const p=world.getPlayer();updateMission();if(innerWidth<600){const edge=document.querySelector('.quest-panel').getBoundingClientRect().bottom;$('map-toggle').style.top=(edge+12)+'px';document.querySelector('.map-panel').style.top=(edge+66)+'px';}else{$('map-toggle').style.top='';document.querySelector('.map-panel').style.top='';}const outside=Math.max(Math.abs(p.x),Math.abs(p.z))>27;
  const wide=outside||round.relay?.territory===1||!!atlasTarget;
  $('minimap').setAttribute('viewBox',wide?'-110 -110 220 220':'-30 -30 60 60');
  $('minimap').innerHTML=wide?atlasMap(round):`<path d="M0 25 L0 12 L-3 4 L0 -4 L0 -12 L7 -17 L7 -24 L0 -25 M-3 4 L-10 1 L-13 -9 M0 -4 L13 -7 M0 12 L10 14" fill="none" stroke="#719480" stroke-width="1.4"/><ellipse cx="-17" cy="13" rx="6.5" ry="5" fill="#467e86"/><rect x="-8" y="-23" width="12" height="6" fill="#718a78" rx="1"/>${NPCS.map((npc,i)=>{const n=round.relay?{...npc,...station(round.relay,i)}:npc;return `<circle cx="${n.x}" cy="${n.z}" r="2.2" fill="${round.seals.includes(n.id)?'#5f8270':n.color}"/><text x="${n.x}" y="${n.z+1}" font-size="3" text-anchor="middle" fill="#152d30">${round.seals.includes(n.id)?'✓':i+1}</text>`}).join('')}<path d="M-2 -26H2V-23H-2Z" fill="${canEscape(round)?'#daf69f':'#91a78d'}"/>${EQUIPMENT.filter(e=>!round.items.includes(e.id)&&(guidedEquipment===e.id||round.understood.includes(NPCS[e.npc].id))).map(e=>`<rect x="${e.x-1.5}" y="${e.z-1.5}" width="3" height="3" fill="#d9b47d"/>`).join('')}${round.scenario&&scenarioStep(round)?(scenarioStep(round).points||[scenarioStep(round)]).map((point,i)=>`<circle cx="${point.x}" cy="${point.z}" r="1.6" fill="#fff1c7"/><text x="${point.x}" y="${point.z+1}" font-size="2.7" text-anchor="middle" fill="#152d30">${i+1}</text>`).join(''):''}${ENVIRONMENT.map(e=>`<circle cx="${e.x}" cy="${e.z}" r="${trackedEnvironment===e.id?1.6:.7}" fill="${trackedEnvironment===e.id?'#fff1c7':round.environment.visited.includes(e.id)?'#8ba994':'#b39e7a'}"/>`).join('')}<circle cx="${p.x}" cy="${p.z}" r="2.1" fill="#e8a169" stroke="#fff4cd" stroke-width=".7"/>`;
  $('location').textContent=outside?regionAt(p.x,p.z):p.z<-14?'ליד בית הספר':p.x<-10?'הספרייה והאגם':p.x>8&&p.z>5?'מגדל הפנס':p.x>8?'החממה':'קרחת היער';
  const goal=currentGoal();const targetPoint=world.project(goal.x,0,goal.z),playerPoint=world.project(p.x,0,p.z);$('compass').style.transform=`rotate(${Math.atan2(targetPoint.x-playerPoint.x,playerPoint.y-targetPoint.y)*180/Math.PI}deg)`;$('direction-text').textContent=`${goal.name||goal.title} · ${Math.round(Math.hypot(p.x-goal.x,p.z-goal.z))} צעדים` ;
  NPCS.forEach(n=>{const el=$('label-'+n.id);if(!el)return;const site=round.relay?station(round.relay,NPCS.indexOf(n)):n; if(round.relay)el.textContent=(NPCS.indexOf(n)+1)+' · '+site.title;const point=world.project(site.x,3.7,site.z);el.style.left=point.x+'px';el.style.top=point.y+'px';el.style.display=point.visible&&!round.scenario?'block':'none';el.classList.toggle('done',round.seals.includes(n.id));});
  EQUIPMENT.forEach(e=>{const label=$('label-'+e.id);if(!label)return;const point=world.project(e.x,2,e.z),distance=Math.hypot(p.x-e.x,p.z-e.z);label.style.left=point.x+'px';label.style.top=point.y+'px';label.style.display=!round.relay&&!round.scenario&&!round.items.includes(e.id)&&point.visible&&(guidedEquipment===e.id||distance<7)?'block':'none';});
  const exit=$('label-exit'),point=world.project(EXIT.x,6.2,EXIT.z);if(exit){exit.style.left=point.x+'px';exit.style.top=point.y+'px';exit.style.display=point.visible?'block':'none';}
  const fieldLabel=$('label-field');if(fieldLabel){const goal=round.scenario&&scenarioGoal(round);if(goal){const point=world.project(goal.x,2,goal.z);fieldLabel.textContent=goal.title;fieldLabel.style.left=point.x+'px';fieldLabel.style.top=point.y+'px';fieldLabel.style.display=point.visible?'block':'none';}else fieldLabel.style.display='none';}
  const n=nearest();$('interact').classList.toggle('hidden',!n||mode!=='explore');if(n)$('interact').innerHTML=n.type==='relay'?station(round.relay,n.i).title:n.type==='spark'?'לאסוף ניצוץ ✧':n.type==='scenario'?`${round.scenario.completed.includes(scenarioStage(round))?'לשאלות התרגול':esc(scenarioStep(round).title)} <kbd>E</kbd>`:n.type==='observation'?'סיום התצפית <kbd>E</kbd>':n.type==='environment'?`${esc(n.id==='bench'&&round.environment.seated?'לקום מהספסל':ENVIRONMENT.find(e=>e.id===n.id).name)} <kbd>E</kbd>`:n.type==='animal'?`מפגש עם ${animalNames[world.animals().find(a=>a.id===n.id)?.type]||'חיה'} <kbd>E</kbd>`:n.type==='exit'?`${canEscape(round)?'יוצאים הביתה':'לבדוק את השער'} <kbd>E</kbd>`:n.type==='equipment'?`לבדוק ${esc(EQUIPMENT[n.i].short)} <kbd>E</kbd>`:`לדבר עם ${esc(NPCS[n.i].name)} <kbd>E</kbd>`;
  const label=$('label-environment');if(label){const e=n?.type==='environment'?ENVIRONMENT.find(e=>e.id===n.id):null;if(e&&mode==='explore'){const point=world.project(e.x,2.2,e.z);label.textContent=environmentStatus(e,round.environment)+' · '+e.name;label.style.left=point.x+'px';label.style.top=point.y+'px';label.style.display=point.visible&&!round.scenario?'block':'none';}else label.style.display='none';}
}
function reviewHtml(){return round.questions.filter(q=>Object.hasOwn(round.answers,q.id)).map(q=>{const a=round.answers[q.id];return `<details class="review-item"><summary>${a.correct?'✓':'↺'} ${esc(q.prompt)}</summary><p>התשובה שלכם: ${esc(q.choices[a.choice])}</p><p>התשובה הנכונה: ${esc(q.choices[q.correct])}</p><p>${esc(q.explanation.he)}</p>${q.explanation.en?`<p lang="en" dir="ltr">${esc(q.explanation.en)}</p>`:''}${reference(q)}</details>`;}).join('');}
function journal(){if(!round)return;if(round.relay){openDialog('יומן המסילה',`<h2 id="dialog-title">${editions[round.relay.edition].title}</h2>${NPCS.map((n,i)=>`<div class="journal-entry"><h3>${round.seals.includes(n.id)?'✓':'◇'} ${station(round.relay,i).title}</h3><p>${station(round.relay,i).name} · ${progress(round,i).answered} מתוך ${progress(round,i).total} שאלות</p></div>`).join('')}${reviewHtml()}`,'journal');return;}if(round.scenario){const scenario=scenarioById(round.scenario.id);openDialog('יומן תיק השטח',`<h2 id="dialog-title">${esc(scenario.title)}</h2><p class="dialog-copy">${esc(scenario.brief)}</p>${scenario.steps.map((step,i)=>`<div class="journal-entry"><h3>${round.seals.includes(NPCS[i].id)?'✓':round.scenario.completed.includes(i)?'◇':'□'} ${i+1} · ${esc(step.title)}</h3><p>${esc(step.hint)}</p><p>${round.scenario.completed.includes(i)?'משימת השטח הושלמה':'משימת השטח ממתינה'} · ${progress(round,i).answered}/${progress(round,i).total} שאלות</p></div>`).join('')}<p class="feedback-note">משימות השטח והחקירה נפרדות מציון הלימוד. התשובות שכבר נמסרו נעולות.</p><h3>התשובות וההסברים</h3>${reviewHtml()||'<p class="feedback-note">השאלות יופיעו כאן אחרי שתענו.</p>'}`,'journal');return;}openDialog('כל מה שגיליתם',`<h2 id="dialog-title">יומן ההרפתקה</h2>${round.scenario?`<h3>${esc(scenarioById(round.scenario.id).title)}</h3>${scenarioById(round.scenario.id).steps.map((step,i)=>`<p>${round.scenario.completed.includes(i)?'✓':'◇'} ${esc(step.title)}</p>`).join('')}`:''}${NPCS.map((n,i)=>`<div class="journal-entry"><h3>${round.seals.includes(n.id)?'✓':'◇'} ${esc(n.name)}</h3><p>${esc(n.role)} · ${progress(round,i).answered} מתוך ${progress(round,i).total} שאלות</p><p>${i===0?'מצפון־מערב, ליד הספרייה.':i===1?'מצפון־מזרח, ליד החממה.':'מדרום־מזרח, ליד מגדל הפנס.'}</p></div>`).join('')}<h3>ציוד וממצאים</h3>${EQUIPMENT.map(e=>`<div class="journal-entry"><h3>${round.items.includes(e.id)?'✓':'□'} ${esc(e.name)}</h3><p>${esc(round.items.includes(e.id)?e.clue:e.hint)}</p></div>`).join('')}<h3>חקירה בקמפוס · ${round.environment.visited.length}/12</h3>${ENVIRONMENT.map(e=>`<div class="journal-entry"><h3>${round.environment.visited.includes(e.id)?'✓':'□'} ${esc(e.name)}</h3><p>${esc(environmentStatus(e,round.environment))} · ${round.environment.visited.includes(e.id)?esc(e.description):'אפשר לגלות בשטח. המפה מציגה את המיקום.'}</p><button class="text-button" data-track-environment="${e.id}">להציג מיקום במפה ←</button></div>`).join('')}<p class="feedback-note">מפגשי טבע: ${round.environment.animalNotes.length} · עזרה לצוות: ${round.environment.helped.length}/3</p><h3>השאלות שכבר פתרתם</h3><p class="feedback-note">התשובות נעולות. אפשר לקרוא וללמוד מהן בכל רגע.</p>${reviewHtml()||'<p class="feedback-note">השאלות יופיעו כאן אחרי שתענו.</p>'}`,'journal');document.querySelectorAll('[data-track-environment]').forEach(b=>b.onclick=()=>{const e=ENVIRONMENT.find(e=>e.id===b.dataset.trackEnvironment);trackedEnvironment=e.id;closeDialog();updateMission();document.body.classList.add('map-open');$('map-toggle').setAttribute('aria-expanded','true');toast(`${e.name} סומן במפה.`);});}
$('journal').onclick=journal;
const mapToggle=document.createElement('button');mapToggle.id='map-toggle';mapToggle.className='secondary map-toggle';mapToggle.textContent='מפה';mapToggle.setAttribute('aria-expanded','false');mapToggle.setAttribute('aria-controls','minimap');$('hud').appendChild(mapToggle);mapToggle.onclick=()=>{const open=document.body.classList.toggle('map-open');mapToggle.setAttribute('aria-expanded',String(open));mapToggle.textContent=open?'סגירת מפה':'מפה';};
const envProgress=document.createElement('span');envProgress.id='environment-progress';document.querySelector('.quest-bottom').appendChild(envProgress);
function how(){if(round?.scenario){const scenario=mode==='menu'?scenarioById(scenarioSelect.value):scenarioById(round.scenario.id);openDialog('תדריך שטח · '+scenario.title,`<h2 id="dialog-title">${esc(scenario.title)}</h2><p class="dialog-copy">${esc(scenario.brief)}</p><ol class="tutorial-steps">${scenario.steps.map(step=>`<li>${esc(step.title)} — ${esc(step.hint)}</li>`).join('')}</ol><p class="feedback-note">WASD או חצים לתנועה, רווח לקפיצה, C להליכה שקטה, Q לזינוק עם התאוששות קצרה. עם מטען הולכים לאט ולא מזנקים. בנייד: ג׳ויסטיק וכפתורי קפיצה, שקט וזינוק. אחרי כל משימת שטח משלימים שאלות מהתרגול; אפשר לחזור ולקרוא תשובות ביומן. אחרי שלושה שלבים, יוצאים בשער.</p><button id="got-it" class="primary">חזרה למשימה ←</button>`,mode==='menu'?'menu':'help');$('got-it').onclick=closeDialog;return;}if(mode==='menu'||round?.relay){openDialog('מדריך שטח',`<h2 id="dialog-title">איך מדליקים את השמיים?</h2><div class="journal-entry"><h3>בוחרים פנס</h3><p>בחרו מספר בלוח המשימה. לכו בעזרת החצים או הג׳ויסטיק, או לחצו על ״ללכת איתי״.</p></div><div class="journal-entry"><h3>מחפשים אור</h3><p>אספו ניצוצות, קפצו בטבעת בעזרת רווח או כפתור החץ, וכוונו את המראות לפי הסמלים. בטבעת יש גם מתג קרקע.</p></div><div class="journal-entry"><h3>מציירים כוכבים</h3><p>ליד פנס טעון לחצו על כפתור הפעולה או על E וענו על שאלות התרגול. אחרי שלושה פנסים, פנו אל השער הצפוני.</p></div><p class="feedback-note">במשימת הקמפוס המקורית הצוות מחכה לציוד ליד שלוש התחנות.</p><button id="got-it" class="primary">חזרה ←</button>`,mode==='menu'?'menu':'help');$('got-it').onclick=closeDialog;return;}openDialog('תדריך שטח',`<h2 id="dialog-title">איך יוצאים מכאן.</h2><div class="journal-entry"><h3>01 · משוטטים</h3><p>מקשי WASD או חצים כדי לזוז, רווח לקפוץ, Shift לרוץ. אפשר ללחוץ על הקרקע. בנייד: גוררים את העיגול וקופצים בכפתור החץ.</p></div><div class="journal-entry"><h3>02 · מקשיבים לחברים</h3><p>מתקרבים לדמות ולוחצים E או על כפתור השיחה. מבינים מה היא צריכה, מאתרים את הציוד שהוא צריך וחוזרים אליו להפעלת מסוף התרגול.</p></div><div class="journal-entry"><h3>03 · פותרים ויוצאים</h3><p>השאלות מגיעות מחומר התרגול שלכם. כל תשובה ננעלת ויש הסבר. אחרי הפעלת שלוש המערכות מגיעים לשער בצפון. אין זמן קצוב ואין קנס על טעות.</p></div><div class="journal-entry"><h3>חקירה חופשית</h3><p>מגלים 12 מקומות לפעולה: יושבים, פותחים דלתות, קולעים לסל, משקים וצופים בטבע. מתקרבים, לוחצים על הכפתור הגדול ובוחרים פעולה. ביומן יש מיקומים ורמזים. החקירה ועזרה לצוות אינן משנות את ציון הלימוד. F למסך מלא. Escape להשהיה.</p></div><button id="got-it" class="primary">חזרה למשימה ←</button>`,round&&mode!=='menu'?'help':'menu');$('got-it').onclick=closeDialog;}
$('how').onclick=how;
function pause(){if(mode==='menu'||mode==='complete')return;if(dialog.open){closeDialog();return;}openDialog('היער יכול לחכות',`<h2 id="dialog-title">רגע לנשום.</h2><p class="dialog-copy">${draftStored?'ההתקדמות נשמרה בלשונית הזאת.':'הדפדפן חסם שמירה מקומית. השאירו את הלשונית פתוחה כדי להמשיך.'} העולם ממתין לכם.</p><div class="options"><button id="unpause" class="primary">חזרה ליער ←</button><button id="show-controls" class="secondary">איך משחקים?</button><button id="menu" class="secondary">חזרה למסך הפתיחה</button></div>`,'paused');$('unpause').onclick=closeDialog;$('show-controls').onclick=how;$('menu').onclick=returnToMenu;}
$('pause').onclick=pause;
async function fullscreen(){try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen();}catch{toast('הדפדפן הזה לא מאפשר מסך מלא. אפשר להמשיך לשחק כרגיל.');}}
$('fullscreen').onclick=fullscreen;$('sound').onclick=()=>{sound=!sound;$('sound').setAttribute('aria-pressed',String(sound));$('sound').setAttribute('aria-label',sound?'כיבוי צלילים':'הפעלת צלילים');$('sound').style.color=sound?'#d9bd85':'';beep();};
window.addEventListener('keydown',e=>{if(e.target.matches('input,select,textarea'))return;if(e.code==='KeyF'){e.preventDefault();fullscreen();}if(e.code==='Escape'&&!dialog.open){e.preventDefault();pause();}if(mode==='question'&&/^Digit[1-4]$/.test(e.code)){document.querySelectorAll('.answer')[Number(e.code.slice(-1))-1]?.click();}});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&mode==='explore')pause();if(document.hidden&&feedbackTimer){clearTimeout(feedbackTimer);feedbackTimer=null;}else if(!document.hidden&&mode==='feedback'&&autoAdvance){feedbackTimer=setTimeout(autoAdvance,1500);}});
window.addEventListener('pagehide',saveDraft);
async function fingerprint(q){return quizFingerprint(q);}
async function persistResult(completedRound=round,completedQuiz=quiz,completedName=participantName){
  const payload={id:completedRound.attemptId,name:completedName,quizId:completedQuiz.id,answers:Object.entries(completedRound.answers).map(([id,a])=>({id,choice:a.choice})),startedAt:completedRound.startedAt,contentHash:await fingerprint(completedQuiz)};
  resultQueued=queueResult(payload);return sendResult(payload);
}
async function finish(){if(!canEscape(round)||mode==='complete')return;const finishedRound=round,finishedQuiz=quiz,finishedName=participantName,finishedId=round.attemptId;saveDraft();const score=academicScore(round),stars=starsFor(score),correct=Object.values(round.answers).filter(a=>a.correct).length;const key=`prepx-best-${quiz.id}`,old=Number(storage.get(key));if(!Number.isFinite(old)||score>old)storage.set(key,String(score));
  openDialog('הגעתם הביתה ✧',`${round.relay?`<svg class="relay-finale" viewBox="0 0 180 64" role="img" aria-label="קבוצת הכוכבים של הכיתה"><polyline points="18,48 57,15 96,35 137,8 162,35"/> ${[[18,48],[57,15],[96,35],[137,8],[162,35]].map(([x,y])=>`<path transform="translate(${x} ${y})" d="M0 -6 L2 -2 6 0 2 2 0 6 -2 2 -6 0 -2 -2Z"/>`).join('')}</svg>`:''}<div class="stars" aria-label="${stars} כוכבים מתוך שלושה">${'★'.repeat(stars)+'☆'.repeat(3-stars)}</div><h2 class="finish-title" id="dialog-title">${round.relay?'הכוכבים נדלקו מעל בית הספר.':'המערכות פעילות.<br>הדרך החוצה פתוחה.'}</h2><p class="finish-title feedback-note">צוות איינשטיין, המשימה הושלמה. בפעם הבאה נשארים להאקתון בשעות האור.</p><div class="score-big">${score}<small> / 100</small></div><div class="stats-row"><div><strong>${correct}/${round.questions.length}</strong><small>תשובות נכונות</small></div><div><strong>3</strong><small>${round.relay?'פנסים דולקים':'מערכות פעילות'}</small></div><div><strong>${round.collected.length}</strong><small>גחליליות</small></div></div><p id="save-status" class="saved-note" role="status">שומרים את התוצאה בהיסטוריית המשחק…</p><div class="dialog-actions"><button id="replay" class="primary">משימה חדשה ↺</button><a class="secondary" href="https://hitech.agnon.online/subject.html?subject=${quiz.subject_id}">לחומר הלימוד ↗</a></div><button id="review-results" class="text-button">התשובות וההסברים שלכם <span>↓</span></button><div id="final-review" class="hidden">${reviewHtml()}</div>`,'complete');
  $('replay').onclick=()=>{clearDraft();round=null;returnToMenu();};$('review-results').onclick=()=>$('final-review').classList.toggle('hidden');
  finishPromise=persistResult(finishedRound,finishedQuiz,finishedName);const saved=await finishPromise;
  if(mode==='complete'&&round?.attemptId===finishedId){$('save-status').textContent=saved?'✓ התוצאה נשמרה בהיסטוריית המשחק. לא נשלח דוא״ל.':(resultQueued?'אין חיבור להיסטוריה כרגע. התוצאה נשמרה במכשיר וממתינה לשליחה.':'השמירה נכשלה והדפדפן חסם שמירה מקומית. השאירו את הלשונית פתוחה ונסו שוב.');if(!saved){const retry=document.createElement('button');retry.className='text-button';retry.textContent='לנסות לשמור שוב';retry.onclick=async()=>{retry.disabled=true;const ok=await persistResult(finishedRound,finishedQuiz,finishedName);if(ok){$('save-status').textContent='✓ התוצאה נשמרה בהיסטוריית המשחק.';retry.remove();}else retry.disabled=false;};$('save-status').after(retry);}}
  if(saved&&round?.attemptId===finishedId)clearDraft();
}
try {world=createWorld($('world'),{reduced,onInteract:interact,onGust:()=>toast('רוח נגדית! קפצו מעל שומר הרוח כדי לשמור על התנופה.'),onEnvironmentChange:patch=>{if(round)commitEnvironment(patch);},onCollect:id=>{if(!round||round.collected.includes(id))return;round.collected.push(id);updateHud();saveDraft();beep();if(round.collected.length%3===0)toast(`${round.collected.length} נקודות טבע תועדו ביומן. החקירה לא משנה את ציון הלימוד.`);},onMove:(x,z,dt)=>{if(!round)return;if(Math.hypot(x-round.player.x,z-round.player.z)>.01)lastMovementAt=round.elapsed;round.player={x,z};if(mode==='explore')exploreTerritory(x,z);if(round.relay&&mode==='explore')touchRelay(x,z);round.elapsed+=dt;if(round.scenario){const step=scenarioStep(round),motion={...world.movement(),companion:world.getCompanion()};tickField(round,world.getPlayer(),motion,dt);if(step?.kind==='robot-escort'&&motion.companion){const data=taskData(round);data.robotX=motion.companion.x;data.robotZ=motion.companion.z;}if(mode==='explore'&&step?.kind==='courier-course'&&!round.scenario.completed.includes(scenarioStage(round))){const result=fieldAction(round,{type:'checkpoint'},world.getPlayer(),motion);if(result.ok){saveDraft();objectiveKey='';updateHud();toast(result.message);}}}saveCounter+=dt;if(saveCounter>1){saveCounter=0;saveDraft();}}});
  $('loading').classList.add('hidden');
} catch {$('loading').innerHTML='<div style="max-width:320px;text-align:center"><h2>היער צריך דפדפן עם תלת־ממד.</h2><p>נסו לעדכן את הדפדפן או להפעיל האצת חומרה.</p><a href="https://hitech.agnon.online/" class="primary">בינתיים, לתרגול הרגיל ←</a></div>';$('start').disabled=true;}
$('world').addEventListener('worldlost',()=>{openDialog('החיבור לתלת־ממד נעצר','<h2 id="dialog-title">נשמר לכם מקום ביער.</h2><p class="dialog-copy">רעננו את העמוד ובחרו בהמשך ההרפתקה השמורה.</p><button id="reload" class="primary">רענון וחזרה</button>','paused');$('reload').onclick=()=>location.reload();});
const joystick=$('joystick');let joyPointer=null;
function moveStick(e){if(joyPointer!==e.pointerId)return;const r=joystick.getBoundingClientRect();let x=(e.clientX-r.left-r.width/2)/36,z=(e.clientY-r.top-r.height/2)/36;const d=Math.max(1,Math.hypot(x,z));x/=d;z/=d;world?.setJoystick(x,z);$('stick').style.transform=`translate(${x*28}px,${z*28}px)`;}
joystick.addEventListener('pointerdown',e=>{joyPointer=e.pointerId;joystick.setPointerCapture(e.pointerId);moveStick(e);});joystick.addEventListener('pointermove',moveStick);
function releaseStick(){joyPointer=null;world?.setJoystick(0,0);$('stick').style.transform='';}
for(const type of ['pointerup','pointercancel','lostpointercapture'])joystick.addEventListener(type,releaseStick);
$('jump').onclick=()=>world?.jump();
$('crouch').onclick=()=>{world?.setCrouching(!world.movement().crouching);updateMap();};$('dash').onclick=()=>{world?.dash();updateMap();};
setInterval(updateMap,80);
window.render_game_to_text=()=>JSON.stringify({mode,coordinateSystem:'x east, z south; y up; world -108..108. Arrow/WASD movement is camera-relative.',source,quiz:quiz.id,territory:round?{region:regionAt(round.player.x,round.player.z),stones:round.stones,skyGates:round.skyGates,wind:world?.windState()}:null,scenario:round?.scenario?{...round.scenario,title:scenarioById(round.scenario.id).title,stage:scenarioStage(round),step:scenarioStep(round)}:null,movement:world?{...world.movement(),companion:world.getCompanion()}:null,player:world?.getPlayer(),target:nearest(),environment:round?ENVIRONMENT.map(e=>({...e,state:environmentStatus(e,round.environment),visited:round.environment.visited.includes(e.id),action:environmentAction(e,round.environment)})):[],environmentState:round?.environment||null,environmentAnimation:world?.environmentAnimation(),observing:world?.isObserving()||false,rendering:world?.performance(),relay:round?.relay?{...round.relay,stations:[0,1,2].map(i=>station(round.relay,i))}:null,mission:round?{objective:nextObjective(round,guidedNpc,world.getPlayer()),target:currentGoal(),navigation:world?.guidance?.(),fieldCheck,sideCompleted:extraMissions(round).filter(m=>m.done(round.environment)).length}:null,npcs:NPCS.map((n,i)=>({id:n.id,x:n.x,z:n.z,understood:round?.understood.includes(n.id)||false,sealed:round?.seals.includes(n.id)||false,progress:round?progress(round,i):null})),equipment:EQUIPMENT.map(e=>({id:e.id,x:e.x,z:e.z,collected:round?.items.includes(e.id)||false})),exit:{...EXIT,open:round?canEscape(round):false},question:activeQuestion&&['question','feedback'].includes(mode)?{id:activeQuestion.id,prompt:activeQuestion.prompt,options:activeQuestion.options.map(o=>o.text),locked:!!round?.answers[activeQuestion.id]}:null,answered:round?Object.keys(round.answers).length:0,total:quiz.questions.length,score:round?academicScore(round):0,fireflies:round?.collected.length||0,elapsed:Math.floor(round?.elapsed||0),animals:world?.animals(),paused:dialog.open});
window.advanceTime=ms=>world?.advanceTime(ms);
// Test observability uses the same movement, collision and interaction functions as real play.
if(import.meta.env.DEV&&new URLSearchParams(location.search).get('test')==='1')window.__afterbell={walkTo:(x,z)=>{if(!world.blocked(x,z)){world.setPlayer(x,z);round.player={x,z};saveDraft();updateMap();}},interact,finish,round:()=>round,world};
loadQuiz().then(flushPending);

function advanceRelay(i,value){
  const r=round.relay;
  if(r.steps[i]===value)return;
  r.steps[i]=value;saveDraft();world.setProgress(round);updateHud();beep();
  toast(charged(r,i)?'✧ הפנס טעון! הפעילו אותו כדי לפתוח את התרגול.':station(r,i).task==='sparks'?'✧ ניצוץ נאסף':'✧ המראה מכוונת');
}
function touchRelay(x,z){
  const r=round.relay;
  for(let i=0;i<3;i++){
    if(charged(r,i))continue;
    const s=station(r,i);
    if(s.task==='sparks')for(const p of sparksAt(s)){
      if(Math.hypot(x-p.x,z-p.z)<.95)advanceRelay(i,r.steps[i]|(1<<p.bit));
    }
    if(s.task==='ring'&&world.getPlayer().y>.65&&Math.hypot(x-s.x,z-s.z)<1.95)advanceRelay(i,1);
  }
}
function relayInteract(target){
  const {i}=target,r=round.relay,s=station(r,i);
  guidedNpc=i;trackedEnvironment=null;
  if(target.type==='spark'){advanceRelay(i,r.steps[i]|(1<<target.bit));return;}
  if(charged(r,i)){showQuestion(i);return;}
  if(s.task==='sparks'){toast('עקבו אחרי הניצוצות הזהובים ואספו את שלושתם.');updateHud();return;}
  if(s.task==='ring'){
    openDialog('טבעת הרוח',`<h2 id="dialog-title">מרימים את האור</h2><p class="dialog-copy">קפצו בתוך הטבעת בלחיצה על רווח או על חץ הקפיצה. אפשר גם להטעין אותה בעזרת מתג הקרקע.</p><button id="ring-jump" class="primary">חזרה לטבעת ←</button><button id="ground-switch" class="secondary">הפעלת מתג הקרקע</button>`,'relay');
    $('ring-jump').onclick=closeDialog;$('ground-switch').onclick=()=>{closeDialog();advanceRelay(i,1);};return;
  }
  const sequence=editions[r.edition].sequence;
  openDialog('מראות הירח',`<h2 id="dialog-title">כוונו את המראות</h2><p class="dialog-copy">הסדר החרוט על הלוח</p><ol class="relay-sequence">${sequence.map((v,j)=>`<li>${j<r.steps[i]?'✓ ':''}${symbols[v]}</li>`).join('')}</ol><div class="field-options">${symbols.map((label,j)=>`<button class="secondary" data-mirror="${j}">${label}</button>`).join('')}</div><p id="mirror-feedback" role="status">בחרו את הסמל בשלב ${r.steps[i]+1}.</p>`,'relay');
  document.querySelectorAll('[data-mirror]').forEach(b=>b.onclick=()=>{
    if(Number(b.dataset.mirror)!==sequence[r.steps[i]]){$('mirror-feedback').textContent='המראה עוד חשוכה. נסו את הסמל המסומן בשלב '+(r.steps[i]+1)+'.';return;}
    advanceRelay(i,r.steps[i]+1);
    if(charged(r,i)){closeDialog();showQuestion(i);}else relayInteract(target);
  });
}

function exploreTerritory(x,z){
  if(Math.max(Math.abs(x),Math.abs(z))<25&&!atlasTarget)return;
  const stone=landmarks.find(s=>Math.hypot(x-s.x,z-s.z)<3);
  if(stone&&!round.stones.includes(stone.id)){
    round.stones.push(stone.id);saveDraft();toast('✧ התגלתה אבן דרך · '+stone.name);beep();
  }
  if(atlasTarget&&Math.hypot(x-atlasTarget.x,z-atlasTarget.z)<2){
    atlasTarget=null;objectiveKey='';updateMission();
  }
  if(world.getPlayer().y<.55)return;
  const gate=skyGates.findIndex(([gx,gz],i)=>!round.skyGates.includes(i)&&Math.hypot(x-gx,z-gz)<1.65);
  if(gate<0)return;
  round.skyGates.push(gate);world.catchWind();world.setProgress(round);saveDraft();beep();
  const region=Math.floor(gate/3);
  const complete=[0,1,2].every(j=>round.skyGates.includes(region*3+j));
  toast(complete?'★ מסלול הרוח הושלם · '+regionAt(x,z):`✧ טבעת שמיים ${round.skyGates.length}/9 · חמש שניות של תנופה!`);
}
function showAtlas(){
  if(mode!=='explore')return;
  openDialog('מפת העולם · '+regionAt(round.player.x,round.player.z),atlasPage(round),'atlas');
  const sites=[HOME,...landmarks];
  document.querySelectorAll('[data-walk]').forEach(b=>b.onclick=()=>{
    const s=sites.find(s=>s.id===b.dataset.walk);
    atlasTarget={...s,title:s.name,hint:'עקבו אחרי השביל עד אבן הדרך.'};trackedEnvironment=null;objectiveKey='';
    closeDialog();updateMission();world.followGuide();
  });
  document.querySelectorAll('[data-travel]').forEach(b=>b.onclick=()=>{
    const s=sites.find(s=>s.id===b.dataset.travel);
    if(!round.relay||!s||(s!==HOME&&!round.stones.includes(s.id)))return;
    closeDialog();atlasTarget=null;objectiveKey='';world.setPlayer(s.x,s.z);round.player={x:s.x,z:s.z};saveDraft();updateHud();toast('הגעתם אל '+s.name);
  });
  $('atlas-back').onclick=()=>{atlasTarget=null;objectiveKey='';closeDialog();updateHud();};
}
$('atlas').onclick=showAtlas;
window.addEventListener('keydown',e=>{if(e.code==='KeyM'&&!e.repeat&&mode==='explore'){e.preventDefault();showAtlas();}});
