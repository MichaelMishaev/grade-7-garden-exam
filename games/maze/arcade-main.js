import {loadMazeContent,normalizeMazeContent,MAZE_QUIZZES,DEFAULT_QUIZ_ID} from './content.js';
import {questionPresentation} from './question-presentation.js';
import {createArcadeRenderer} from './arcade-renderer.js';
import {ARCADE_KEY,ACTIVE_PHASES,createArcade,restoreArcade,arcadeTransition,arcadeQuestion,completed,crystals,diamonds,coins,arcadeScore,readyCharge,isSafe,bossPhase,canFire,attackLane,bridgeTile} from './arcade-core.js';
const $=id=>document.getElementById(id),dialog=$('arcade-dialog'),media=matchMedia('(prefers-reduced-motion: reduce)');
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const plain=v=>{const e=document.createElement('template');e.innerHTML=String(v??'');return e.content.textContent||'';};
const text=v=>esc(plain(v));
const button=(id,label,primary=true,disabled=false)=>`<button type="button" class="button ${primary?'primary':''}" id="${id}"${disabled?' disabled':''}>${label}</button>`;
const title=(small,heading)=>`<span class="arcade-run-label">${small}</span><h2 id="dialog-title">${heading}</h2>`;
let state=null,lastCompleted=null,renderer=null,launched=false,panel='intro',storageAvailable=true,recovery=false,busy=false,previousFocus=null,hasSaved=false;
let pointer=null,steer={dx:0,dz:0},lastTime=0,persistMs=0,inputReadyAt=0;
const held=new Set(),physicalKeys=new Set();
const isActive=()=>launched&&state&&!state.paused&&!panel&&ACTIVE_PHASES.includes(state.phase);
function clearInput(){const id=pointer;pointer=null;steer={dx:0,dz:0};held.clear();const el=$('movement-joystick');el.querySelector('.joystick-thumb').style.transform='translate(0px,0px)';if(id!==null&&el.hasPointerCapture(id))el.releasePointerCapture(id);}
function warnStorage(){storageAvailable=false;$('storage-warning').hidden=false;}
function save(){
  if(!state||!storageAvailable||recovery||!launched)return;
  if(state.phase==='victory')lastCompleted=state;
  try{sessionStorage.setItem(ARCADE_KEY,JSON.stringify({version:1,active:state,lastCompleted}));hasSaved=true;}catch{warnStorage();}
}
function apply(action){
  if(!state)return;const old=state,next=arcadeTransition(state,action);if(next===old)return;
  state=next;if(next.generation!==old.generation)clearInput();
  const important=action.type!=='tick'||old.generation!==next.generation||old.phase!==next.phase||old.notice!==next.notice;
  if(important){save();renderUi(true);}else renderUi(false);
}
// A new DOM/phase requires a fresh pointer/key begin. Late compatibility clicks have no token.
function fresh(el,fn){
  if(!el)return;let press=null;
  el.addEventListener('pointerdown',e=>{if(e.button===0&&!el.disabled&&e.timeStamp>=inputReadyAt)press={generation:state?.generation,pointer:e.pointerId};});
  el.addEventListener('pointercancel',()=>press=null);
  el.addEventListener('keydown',e=>{if(['Enter',' '].includes(e.key)&&!e.repeat&&!physicalKeys.has(e.key)&&e.timeStamp>=inputReadyAt)press={generation:state?.generation,key:e.key};});
  el.addEventListener('click',e=>{
    const token=press;press=null;
    const assistive=e.isTrusted&&e.detail===0&&!physicalKeys.size&&pointer===null;
    if(el.disabled||(!token&&!assistive)||token&&token.generation!==state?.generation||e.timeStamp<inputReadyAt)return;
    fn(e);
  });
}
const bind=(id,fn)=>fresh($(id),fn);
function show(html,focusSelector='button:not(:disabled),select,a'){
  clearInput();
  $('dialog-content').innerHTML=html+(!storageAvailable?'<p class="sample-warning" role="status">המשחק אינו נשמר כרגע. שמירה קודמת לא תימחק.</p>':'');
  if(!dialog.open){previousFocus=document.activeElement;dialog.showModal();}
  queueMicrotask(()=>{inputReadyAt=performance.now();$('dialog-content').querySelector(focusSelector)?.focus({preventScroll:true});});
}
function closeDialog(){if(dialog.open)dialog.close();if(previousFocus?.isConnected)previousFocus.focus({preventScroll:true});inputReadyAt=performance.now();}
function openPanel(kind){if(!state||busy)return;clearInput();if(launched)apply({type:'pause'});panel=kind;renderUi(true);}
function closePanel(){panel=launched?null:'intro';if(launched)apply({type:'resume'});renderUi(true);}
function source(q){const ref=q.reference;return `<p class="reference">מקור: <a href="${esc(ref.url)}" target="_blank" rel="noopener noreferrer">${text(ref.title)} · ${text(ref.part||'')}</a></p>`;}
function facts(s){return `<div class="result-grid"><div><strong>${arcadeScore(s)}</strong><small>ציון בסבב של 3 שאלות</small></div><div><strong>${diamonds(s)} ◆</strong><small>יהלומים זמינים</small></div><div><strong>${coins(s)}</strong><small>מטבעות ידע</small></div></div>`;}
function collection(s,readonly=false){
  return `<div class="reward-wallet"><strong>${diamonds(s)} ◆</strong><span>יהלומים לשימוש בסבב הזה</span><small>נאספו ${s.claimed.length+(s.phase==='victory'?1:0)} · נוצלו ${s.purchases.length}</small></div>`+s.answers.map((a,i)=>`<div class="collection-gift ${a?'':'empty-gift'}"><div><strong>${['◆ גביש הגשר','⚿ מפתח הירח','✦ כוכב השומר'][i]}</strong><small>${a?s.claimed.includes(i)?'✓ באוסף שלכם':'הושג! ממתין לאיסוף':'מחכה בשלב '+(i+1)}</small></div>${a&&!s.claimed.includes(i)&&!readonly?button('claim-'+i,'לאסוף · +1 ◆',true):''}</div>`).join('');
}
function intro(){
  const saved=hasSaved&&state&&launched===false&&!recovery;
  show(title('סבב קצר · 3 שאלות מתוך מאגר קיים','שלושה גשרים. שומר אחד.')+'<div class="intro-boss" aria-hidden="true">◆ ◆ ◆</div><p class="arcade-copy">חוצים שלושה גשרים, עונים על שלוש שאלות ואוספים גבישים. בסוף מתחמקים מהשומר ושוברים את המגן שלו. גם אחרי טעות ממשיכים!</p><p class="sample-warning">זהו סבב תרגול קצר, ולא המבחן או כל מאגר השאלות. השאלות ללא הגבלת זמן.</p>'+
    (recovery?'<p role="alert" class="storage-warning">השמירה הקודמת לא ניתנת לשחזור בטוח. היא נשארה ללא שינוי. אפשר לנסות לטעון שוב, או לשחק סבב חדש ללא שמירה.</p>':'')+
    `<label for="quiz-select">במה מתרגלים?</label><select id="quiz-select">${MAZE_QUIZZES.map(q=>`<option value="${q.id}"${q.id===state?.content.id?' selected':''}>${text(q.title)}</option>`).join('')}</select><div class="arcade-buttons">`+
    (saved?button('resume-run',state.phase==='victory'?'להציג את הסבב שהושלם':'להמשיך את הסבב השמור'):recovery?button('retry-save','לנסות לטעון את השמירה שוב'):'' )+
    button('new-run',recovery?'סבב חדש ללא שמירה':saved?'סבב חדש · ארנק חדש מ־0':'להתחיל סבב ארקייד',!saved)+
    (saved&&state.phase!=='victory'?'<small class="small-note">סבב חדש מחליף את ההתקדמות של הסבב הפעיל. הסיכום האחרון שהושלם נשאר באוסף.</small>':'')+
    (lastCompleted?button('last-summary','הסיכום והאוסף של הסבב הקודם',false):'')+'<a class="dialog-link" href="./index.html">למבוך המלא ←</a><a class="dialog-link" href="../../../index.html">חזרה ל־PrepX ↗</a></div>');
  bind('retry-save',()=>location.reload());bind('resume-run',()=>{launched=true;panel=null;if(state.paused)apply({type:'resume'});save();renderUi(true);});
  bind('new-run',newRun);bind('last-summary',()=>{panel='last';renderUi(true);});
}
async function newRun(){
  if(busy)return;busy=true;const id=$('quiz-select').value;
  document.querySelectorAll('#dialog-content button,#quiz-select').forEach(el=>el.disabled=true);
  try{
    const content=await loadMazeContent({quizId:id});
    if(content.questions.length<3)throw new Error('short-bank');
    if(state?.phase==='victory')lastCompleted=state;
    if(recovery){warnStorage();recovery=false;}
    state=createArcade(content);launched=true;panel=null;save();renderUi(true);
  }catch{show(title('אי אפשר להתחיל את הסבב','נדרשות לפחות שלוש שאלות')+'<p>בחרו נושא אחר או חזרו למבוך המלא. השמירה הקודמת נשמרה.</p>'+button('back-intro','בחירת נושא אחר'));bind('back-intro',()=>{panel='intro';renderUi(true);});}
  finally{busy=false;}
}
function renderQuestion(){
  const q=arcadeQuestion(state),present=questionPresentation(q);
  show(title(`גשר ${state.stage+1} מתוך 3 · שאלה ללא הגבלת זמן`,text(present.prompt||q.prompt))+
    (present.context?`<p class="question-context">${text(present.context)}</p>`:'')+
    `<div class="answers">${state.choices[state.stage].map((choice,i)=>`<button class="answer" data-choice="${choice}"><span class="answer-index">${i+1}</span>${text(q.choices[choice])}</button>`).join('')}</div><details><summary>חומר המקור</summary>${source(q)}</details>`+button('question-pause','השהיה או יציאה',false));
  document.querySelectorAll('[data-choice]').forEach(el=>fresh(el,()=>apply({type:'answer',choice:Number(el.dataset.choice),generation:state.generation})));
  bind('question-pause',()=>openPanel('pause'));
}
function renderFeedback(){
  const q=arcadeQuestion(state),correct=state.answers[state.stage].correct;
  show(title('תשובה נעולה · גביש בוס נוסף בדרך',`${correct?'✓ תשובה נכונה!':'↘ תשובה לא נכונה'}`)+`<p>${correct?'+10 מטבעות ידע':'לב ירד, אבל הגביש וההתקדמות שלכם נשארים. אם כל הלבבות ירדו, תקבלו שלושה בנקודה הבטוחה.'}</p><p>התשובה הנכונה: <strong>${text(q.choices[q.correct])}</strong></p><p>${text(q.explanation.he)}</p>`+(q.explanation.en?`<p class="small-note" dir="ltr">${text(q.explanation.en)}</p>`:'')+source(q)+`<div class="collection-gift"><strong>◆ גביש בוס +1</strong><span>${crystals(state)} מתוך 3</span></div><div class="arcade-buttons">`+(!state.claimed.includes(state.stage)?button('claim-feedback','לאסוף את המתנה · +1 יהלום'): '<p class="small-note">✓ המתנה באוסף שלכם</p>')+button('continue-feedback',state.stage===2?'לאזור הבטוח שלפני השומר':'להמשיך לגשר הבא',false)+button('feedback-pause','השהיה או יציאה',false)+'</div>');
  bind('claim-feedback',()=>apply({type:'claim',stage:state.stage}));bind('continue-feedback',()=>apply({type:'continue'}));bind('feedback-pause',()=>openPanel('pause'));
}
function stagePanel(){
  const boss=state.phase==='boss-ready';
  show(title(boss?'כל שלושת הגבישים שלכם':'אזור בטוח · גשר '+(state.stage+1),boss?'מוכנים לפגוש את השומר?':['גשר האור','גשר הגלים','גשר הצללים'][state.stage])+`<p>${boss?'המסלול הזהוב מסמן לאן השומר עומד לפגוע. זוזו הצידה. כשהמגן נפתח, התקדמו לעיגולי הירי ושגרו גביש. כל פגיעה שוברת שכבה אחת.':'גררו את הג׳ויסטיק קדימה כדי לעבור. אבנים מוארות בטוחות; זהב מזהיר מסגירה; אבנים חשוכות מסוכנות. נפלתם? חוזרים לכאן עם ההתקדמות.'}</p><p class="small-note">אפשר לפתוח את האוסף ולקנות מגן או הילוך איטי. שום קנייה אינה חובה.</p><div class="arcade-buttons">`+button('start-challenge',boss?'מוכנים לבוס — מתחילים':'לצאת לגשר')+button('stage-collection','האוסף והחנות',false)+button('stage-pause','השהיה או יציאה',false)+'</div>');
  bind('start-challenge',()=>apply({type:'start'}));bind('stage-collection',()=>openPanel('collection'));bind('stage-pause',()=>openPanel('pause'));
}
function renderCollection(){
  const s=panel==='last'?lastCompleted:state,readonly=panel==='last';
  if(!s){closePanel();return;}
  const shop=readonly?'':[{id:'shield',name:'מגן חד־פעמי',description:'מונע פגיעה פיזית אחת. תשובות לא נכונות עדיין מורידות לב.'},{id:'slow',name:'הילוך איטי',description:'הפעילו בזמן אתגר: חמש שניות משחק בקצב חצי. זמן קריאה אינו נספר.'}].map(item=>{
    const reason=!isSafe(s)?'קנייה באזורי הביניים הבטוחים בלבד':readyCharge(s,item.id)?'כבר יש לכם שימוש מוכן':diamonds(s)<1?'חסר יהלום — אספו מתנה':'';
    return `<div class="reward-item"><div><h3>${item.name}</h3><p>${item.description}</p><small class="reward-reason">${reason||'מחיר: יהלום אחד'}</small></div><button class="button primary" data-buy="${item.id}"${reason?' disabled':''}>לקנות · 1 ◆</button></div>`;
  }).join('');
  show(title(readonly?'הסבב הקודם · לקריאה בלבד':'הזמן נעצר · האוצר של הסבב הזה',readonly?'הסיכום והאוסף הקודם':'האוסף והחנות')+(readonly?facts(s):'')+collection(s,readonly)+shop+'<p class="reward-status" tabindex="-1" role="status">'+text(readonly?'ארנק של סבב קודם אינו עובר לסבב החדש.':s.notice)+'</p>'+button('close-panel',readonly?'חזרה':'חזרה לסבב'));
  for(let i=0;i<3;i++)bind('claim-'+i,()=>apply({type:'claim',stage:i}));
  document.querySelectorAll('[data-buy]').forEach(el=>fresh(el,()=>{apply({type:'buy',item:el.dataset.buy});queueMicrotask(()=>document.querySelector('.reward-status')?.focus({preventScroll:true}));}));
  bind('close-panel',closePanel);
}
function victory(){
  const rows=state.selected.map((id,i)=>{const q=state.content.questions.find(q=>q.id===id),a=state.answers[i];return `<div class="summary-answer"><strong>${a.correct?'✓':'↘'} ${text(q.prompt)}</strong><p>בחרתם: ${text(q.choices[a.choice])}</p><p>התשובה הנכונה: ${text(q.choices[q.correct])}</p><p>${text(q.explanation.he)}</p>${source(q)}</div>`;}).join('');
  show(title('שלוש שכבות נשברו · הסבב הושלם','ניצחתם את שומר הגשרים!')+'<p>כל המתנות נשארות באוסף שלכם, ועוד יהלום בונוס נוסף לארנק.</p>'+facts(state)+`<p class="sample-warning">הציון מתייחס רק לשלוש שאלות הסבב הזה מתוך ${state.content.questions.length} במאגר. זו אינה השלמת המאגר המלא.</p><p class="small-note">זמן תנועה ובוס: ${Math.round(state.activeMs/1000)} שניות, ללא קריאה והשהיה.</p><div class="arcade-buttons">`+button('victory-collection','האוסף והמתנות')+button('another-run','לבחור סבב נוסף · ארנק חדש מ־0',false)+'<a class="dialog-link" href="./index.html">למבוך המלא ←</a><a class="dialog-link" href="../../../index.html">חזרה ל־PrepX ↗</a></div><details><summary>התשובות והמקורות שלכם</summary>'+rows+'</details>');
  bind('victory-collection',()=>openPanel('collection'));bind('another-run',()=>{launched=false;panel='intro';renderUi(true);});
}
function renderUi(change){
  if(!state)return;
  $('hearts').textContent=Array.from({length:3},(_,i)=>i<state.hearts?'♥':'♡').join(' ');$('hearts').setAttribute('aria-label',`${state.hearts} לבבות מתוך 3`);
  $('crystals').textContent=`${crystals(state)} / 3`;$('diamonds').textContent=`${diamonds(state)} ◆`;
  $('stage-label').textContent=['boss','boss-ready','victory'].includes(state.phase)?`שומר הגשרים · ${3-state.boss.hits.length} שכבות מגן`:`גשר ${state.stage+1} מתוך 3 · ${state.content.title}`;
  const bp=bossPhase(state);
  $('objective').textContent=state.phase==='boss'?state.assist?'מצב עזרה: הגיעו לעיגולי הירי ושגרו גביש':bp==='telegraph'?'התרחקו מהמסלול הזהוב':bp==='attack'?'השומר תוקף — זוזו הצידה!':'המגן פתוח! הגיעו לעיגולי הירי ושגרו גביש':state.phase==='victory'?'השומר הובס. כל המתנות באוסף!':`חצו את הגשר ואספו גביש ${state.stage+1} מתוך 3`;
  $('hazard-status').textContent=state.recoverMs>0?'חוזרים לנקודה בטוחה…':state.slowMs>0?`הילוך איטי · ${Math.ceil(state.slowMs/1000)} שניות פעילות`:state.assist?'מצב עזרה פעיל · הציון נשאר ללא שינוי':state.phase==='bridge'?[0,1,2,3].some(r=>bridgeTile(state,r)==='closed')?'✕ חלק מהגשר סגור — חכו בשטח בטוח':[0,1,2,3].some(r=>bridgeTile(state,r)==='warning')?'⚠ הגשר עומד להיסגר — הביטו באבנים':'✓ הגשר פתוח — אפשר לחצות':state.phase==='boss'?`כיוון הפגיעה: ${attackLane(state)<0?'שמאל':attackLane(state)>0?'ימין':'מרכז'}`:'';
  if($('game-notice').textContent!==state.notice)$('game-notice').textContent=state.notice;
  $('movement-joystick').disabled=!isActive()||state.recoverMs>0;
  $('fire-button').disabled=!isActive()||!canFire(state);$('fire-button').textContent=canFire(state)?'שיגור גביש ◆':state.phase==='boss'?'הגיעו לעיגולי הירי':'השומר מחכה מעבר לגשרים';
  $('slow-button').disabled=!isActive()||state.recoverMs>0||!readyCharge(state,'slow')||state.slowMs>0;$('slow-button').textContent=state.slowMs>0?'הילוך איטי פעיל':readyCharge(state,'slow')?'להפעיל הילוך איטי':'הילוך איטי · קונים באוסף';
  $('assist-button').disabled=!isActive()||state.assist;$('pause-button').disabled=!launched;$('collection-button').disabled=!launched;
  if(!change)return;
  if(panel==='intro')intro();else if(panel==='collection'||panel==='last')renderCollection();
  else if(panel==='pause'){
    show(title('הזמן נעצר','הדרך תחכה לכם')+'<p>הגבישים, המתנות והשלב נשארים איתכם. חזרה לסבב מתחילה בנקודה בטוחה.</p><div class="arcade-buttons">'+button('resume-button','להמשיך מאותו מקום')+button('pause-collection','לפתוח את האוסף',false)+button('choose-run','בחירת סבב או נושא',false)+'<a class="dialog-link" href="./index.html">למבוך המלא ←</a><a class="dialog-link" href="../../../index.html">חזרה ל־PrepX ↗</a></div>');
    bind('resume-button',closePanel);bind('pause-collection',()=>{panel='collection';renderUi(true);});bind('choose-run',()=>{launched=false;panel='intro';renderUi(true);});
  }else if(state.phase==='question')renderQuestion();else if(state.phase==='feedback')renderFeedback();else if(isSafe(state))stagePanel();else if(state.phase==='victory')victory();else closeDialog();
}
const joystick=$('movement-joystick');
function steerPointer(e){const b=joystick.getBoundingClientRect(),dx=e.clientX-b.left-b.width/2,dy=e.clientY-b.top-b.height/2,d=Math.hypot(dx,dy),radius=b.width/2-28,scale=d>radius?radius/d:1;joystick.querySelector('.joystick-thumb').style.transform=`translate(${dx*scale}px,${dy*scale}px)`;steer=d<12?{dx:0,dz:0}:{dx:dx/Math.max(radius,d),dz:-dy/Math.max(radius,d)};}
for(const event of ['contextmenu','selectstart'])joystick.addEventListener(event,e=>e.preventDefault());
joystick.addEventListener('pointerdown',e=>{if(e.button!==0||joystick.disabled||pointer!==null||e.timeStamp<inputReadyAt)return;e.preventDefault();pointer=e.pointerId;held.clear();joystick.setPointerCapture(pointer);steerPointer(e);});
joystick.addEventListener('pointermove',e=>{if(e.pointerId===pointer&&isActive()){e.preventDefault();steerPointer(e);}});
for(const event of ['pointerup','pointercancel','lostpointercapture'])joystick.addEventListener(event,e=>{if(e.pointerId===pointer)clearInput();});
bind('pause-button',()=>openPanel('pause'));bind('collection-button',()=>openPanel('collection'));bind('fire-button',()=>apply({type:'fire',window:state.boss.window,generation:state.generation}));bind('slow-button',()=>apply({type:'slow',generation:state.generation}));bind('assist-button',()=>apply({type:'assist',generation:state.generation}));
const keys={ArrowUp:[0,1],ArrowDown:[0,-1],ArrowRight:[1,0],ArrowLeft:[-1,0],w:[0,1],s:[0,-1],d:[1,0],a:[-1,0]};
window.addEventListener('keydown',e=>{
  const key=e.key.length===1?e.key.toLowerCase():e.key,was=physicalKeys.has(e.key);physicalKeys.add(e.key);
  if(e.ctrlKey||e.metaKey||e.altKey)return;
  if(keys[key]&&isActive()&&!dialog.open){e.preventDefault();if(!e.repeat&&!was)held.add(key);}
  if(e.key==='Escape'&&launched&&!dialog.open){e.preventDefault();openPanel('pause');}
  if(key==='e'&&isActive()&&!e.repeat&&!was)apply({type:'fire',window:state.boss.window,generation:state.generation});
  if(key==='f'&&launched&&!dialog.open&&!e.repeat){if(document.fullscreenElement)document.exitFullscreen?.();else document.querySelector('.game-shell').requestFullscreen?.().catch(()=>{});}
});
window.addEventListener('keyup',e=>{physicalKeys.delete(e.key);held.delete(e.key.length===1?e.key.toLowerCase():e.key);});
window.addEventListener('blur',()=>{physicalKeys.clear();clearInput();if(isActive())openPanel('pause');else save();});
document.addEventListener('visibilitychange',()=>{if(document.hidden){physicalKeys.clear();clearInput();if(launched)openPanel('pause');}});
window.addEventListener('pagehide',()=>{clearInput();save();});
dialog.addEventListener('cancel',e=>{e.preventDefault();if(panel==='intro')return;if(panel)closePanel();else openPanel('pause');});
function advance(ms){
  if(!isActive())return;
  const vector=pointer!==null?steer:[...held].reduce((v,k)=>({dx:v.dx+keys[k][0],dz:v.dz+keys[k][1]}),{dx:0,dz:0});
  const length=Math.max(1,Math.hypot(vector.dx,vector.dz));
  apply({type:'tick',ms,dx:vector.dx/length,dz:vector.dz/length});
  persistMs+=ms;if(persistMs>=400){persistMs=0;save();}
}
function draw(){if(state)renderer?.render(state,{reducedMotion:media.matches});}
window.advanceTime=ms=>{for(let r=Math.min(60000,Math.max(0,ms));r>0;r-=16)advance(Math.min(16,r));draw();};
window.render_game_to_text=()=>JSON.stringify(state?{coordinates:'arena x right; z forward/up toward boss; safe start z=1, landing z>=9.8, firing z=6.5..8.5',mode:state.mode,phase:state.phase,stage:state.stage,started:launched,panel,paused:state.paused,player:state.player,generation:state.generation,hearts:state.hearts,crystals:crystals(state),diamonds:diamonds(state),earned:state.claimed.length+(state.phase==='victory'?1:0),coins:coins(state),score:arcadeScore(state),answered:completed(state),selected:state.selected,quizId:state.content.id,source:state.content.source,claimed:state.claimed,purchases:state.purchases,slowMs:state.slowMs,activeMs:state.activeMs,recoverMs:state.recoverMs,clock:state.clock,assist:state.assist,failures:state.failures,boss:{...state.boss,phase:bossPhase(state),target:attackLane(state),canFire:canFire(state)},currentQuestion:state.phase==='question'||state.phase==='feedback'?{id:arcadeQuestion(state).id,options:state.choices[state.stage]}:null,storageAvailable,recovery,hasLastCompleted:!!lastCompleted,joystick:{active:pointer!==null,...steer}}:{phase:'loading'});
function frame(now){const dt=lastTime?Math.min(80,now-lastTime):0;lastTime=now;if(dt>0)advance(dt);draw();requestAnimationFrame(frame);}
async function initialize(){
  let raw=null;
  try{raw=sessionStorage.getItem(ARCADE_KEY);}catch{warnStorage();}
  if(raw){try{
    const saved=JSON.parse(raw);if(saved.version!==1)throw new Error('Invalid save');
    const content=normalizeMazeContent(saved.active.content,{pinned:true});state=restoreArcade(saved.active,content);if(!state)throw new Error('Invalid run');hasSaved=true;
    if(saved.lastCompleted){const c=normalizeMazeContent(saved.lastCompleted.content,{pinned:true});lastCompleted=restoreArcade(saved.lastCompleted,c);if(lastCompleted?.phase!=='victory')throw new Error('Invalid summary');}
  }catch{recovery=true;state=null;lastCompleted=null;}}
  if(!state){const quiz=new URLSearchParams(location.search).get('quiz');state=createArcade(await loadMazeContent({quizId:MAZE_QUIZZES.some(q=>q.id===quiz)?quiz:DEFAULT_QUIZ_ID}));}
  try{renderer=createArcadeRenderer($('maze-canvas'));}catch{
    show(title('הזירה לא נטענה','אי אפשר להפעיל תלת־ממד בדפדפן הזה')+'<p>נסו לרענן או לפתוח בדפדפן מעודכן.</p><a class="dialog-link" href="./index.html">חזרה למבוך</a>');return;
  }
  renderUi(true);draw();requestAnimationFrame(frame);
}
initialize();
