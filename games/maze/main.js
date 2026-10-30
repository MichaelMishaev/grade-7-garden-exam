import { createState, restoreState, transition, currentQuestion, progress, MAZE, encountersFor, EXIT, pathTo, isWalkable } from './core.js';
import { loadMazeContent, normalizeMazeContent, MAZE_QUIZZES, DEFAULT_QUIZ_ID } from './content.js';
import { createMazeRenderer } from './renderer.js';
import '../../quiz-core.js';
import {createMovement,advanceMovement,syncMovement} from './movement.js';
import {WORLD_ENTITIES,nearbyWorldEntity,worldEntityPosition} from './world.js';
import { createInteractions, reduceInteraction, interactionLabels } from './interactions.js';

const $ = id => document.getElementById(id);
const SESSION_KEY = 'prepx-shadow-maze-session-v1';
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const dialog = $('game-dialog');
let content, state, renderer, started = false, panel = null, autoTimer = null, readFeedback = false;
let storageAvailable = true;
let route = [], lastFrame = 0, previousFocus = null, persistElapsed = 0;
let movement=null, queuedDirection=null, pointerDirection=null, pendingInteract=false, guidePath=[];
let interaction = createInteractions();
const trappedPhases = new Set(['question','feedback','capture','review','review-feedback']);
const held = new Set();
const activeRooms = () => encountersFor(content.questions);
const viewOptions = () => ({intro:!started,reducedMotion:reducedMotion.matches,encounters:activeRooms(),interaction,guidePath,movement:movement?{x:movement.position.x,y:movement.position.y,speed:movement.speed,heading:movement.heading,moving:movement.moving||movement.speed>0}:undefined});
function interactionContext(){const room=state.assignments[state.activeEncounter]||[];return {phase:state.phase,paused:state.paused,reducedMotion:reducedMotion.matches,reviewIndex:state.review?.index||0,answered:room.filter(id=>state.answers[id]).length,total:room.length};}
function sceneControls(){return `<div class="cell-controls" aria-label="פעולות בתוך הכלוב">${['look-left','look-right','lantern','rattle','inspect'].map(action=>`<button type="button" data-cell-action="${action}" aria-label="${escapeText(interactionLabels[action])}"${action==='lantern'?` aria-pressed="${interaction.lanternRaised}"`:''}>${escapeText(({'look-left':'שמאלה','look-right':'ימינה',lantern:'פנס',rattle:'סורגים',inspect:'מנעול'})[action])}</button>`).join('')}</div><p id="cell-notice" class="cell-notice" role="status">${escapeText(interaction.notice||'אפשר להביט לצדדים, להרים את הפנס ולבדוק את הכלוב.')}</p>`;}
function interactWithCell(action){
  if(state.phase==='feedback'){readFeedback=true;stopAuto();if($('read-feedback'))$('read-feedback').textContent='המעבר נעצר בזמן שבודקים את הכלוב.';}
  interaction=reduceInteraction(interaction,action,interactionContext());
  if($('cell-notice'))$('cell-notice').textContent=interaction.notice;
  document.querySelector('[data-cell-action="lantern"]')?.setAttribute('aria-pressed',String(interaction.lanternRaised));
  renderer?.render(state,viewOptions());
}
const direction = { up: [0,-1], right: [1,0], down: [0,1], left: [-1,0] };
const escapeText = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function plain(value) { const el = document.createElement('template'); el.innerHTML = String(value ?? ''); return el.content.textContent || ''; }
const text = value => escapeText(plain(value));
function safeSource(reference) {
  try { const url = new URL(reference?.url, new URL('../../', location.href)); return ['http:','https:'].includes(url.protocol) ? url.href : null; } catch { return null; }
}
function sourceHtml(question) {
  const ref = question?.reference;
  const title = text([ref?.title || question?.ref?.id, ref?.part || question?.ref?.part].filter(Boolean).join(' · '));
  const url = safeSource(ref);
  return title ? `<div class="reference">מקור: ${url ? `<a href="${escapeText(url)}" target="_blank" rel="noopener noreferrer">${title} ↗</a>` : title}</div>` : '';
}
function explanationHtml(question) {
  return `<p class="explanation">${text(question?.explanation?.he || '')}</p>${question?.explanation?.en ? `<p class="small-note" dir="ltr">${text(question.explanation.en)}</p>` : ''}${sourceHtml(question)}`;
}
const unsavedMessage = 'ההתקדמות אינה נשמרת בדפדפן הזה. אפשר להמשיך עכשיו, אבל יציאה או רענון עלולים לאבד אותה.';
function markStorageUnavailable() {
  storageAvailable=false;
  $('storage-warning').hidden=false;
  const privacy=document.querySelector('.privacy');
  if(privacy)privacy.textContent=unsavedMessage+' אין שליחת תשובות או שם.';
  if($('encounter-menu'))$('encounter-menu').textContent='השהיה או יציאה · ללא שמירה';
  if(dialog.open&&!document.querySelector('.dialog-save-warning')){
    const warning=document.createElement('p');warning.className='dialog-save-warning';warning.setAttribute('role','status');warning.textContent=unsavedMessage;$('dialog-content').prepend(warning);
  }
}
function save() {
  if (!content || !state || !storageAvailable) return;
  try { sessionStorage.setItem(SESSION_KEY, JSON.stringify({content, state})); }
  catch { markStorageUnavailable(); }
}
function stopAuto() { clearTimeout(autoTimer); autoTimer = null; }
function dispatch(action) {
  if (!state) return;
  const next = transition(state, action, content.questions);
  if (next === state) return;
  const oldPhase = state.phase, oldQuestion = currentQuestion(state, content.questions)?.id;
  state = next;
  if(movement)movement=syncMovement(movement,state.player);
  if(state.phase!=='explore'){
    held.clear();pointerDirection=null;queuedDirection=null;pendingInteract=false;
    if(movement)movement={...createMovement(state.player),heading:movement.heading};
  }
  if (oldPhase === 'explore' && trappedPhases.has(state.phase)) interaction=createInteractions();
  if (action.type !== 'tick' || state.phase !== oldPhase) save();
  if (state.phase !== 'explore') route = [];
  if (oldPhase !== state.phase || oldQuestion !== currentQuestion(state, content.questions)?.id || action.type !== 'tick') {
    stopAuto(); renderUi();
  }
}
function closeDialog() {
  if (dialog.open) dialog.close();
  if (previousFocus?.isConnected) previousFocus.focus({preventScroll:true});
}
function showDialog(html, focusSelector = 'button') {
  const inCell=trappedPhases.has(state.phase)&&!panel;
  dialog.classList.toggle('cell-sheet',inCell);
  const saveNotice=storageAvailable?'':`<p class="dialog-save-warning" role="status">${unsavedMessage}</p>`;
  const exitMenu=started&&!panel&&state.phase!=='complete'?`<button id="encounter-menu" class="reading-button">השהיה או יציאה · ${storageAvailable?'ההתקדמות נשמרת':'ללא שמירה'}</button>`:'';
  $('dialog-content').innerHTML = saveNotice + (inCell?sceneControls():'') + html + exitMenu;
  bind('encounter-menu', () => openPanel('pause'));
  document.querySelectorAll('[data-cell-action]').forEach(el=>el.addEventListener('click',()=>interactWithCell(el.dataset.cellAction)));
  if (!dialog.open) { previousFocus = document.activeElement; dialog.showModal(); }
  dialog.scrollTop = 0;
  queueMicrotask(() => $('dialog-content').querySelector('[data-choice],#continue-button,#skip-capture,#guided-continue,#close-panel,#resume-button')?.focus({preventScroll:true}));
}
const button = (id,label,primary=true) => `<button id="${id}" class="button ${primary?'primary':''}">${label}</button>`;
const heading = (kicker,title) => `<div class="dialog-kicker"><span>${kicker}</span><span>מבוך הצללים</span></div>${title?`<h2 id="dialog-title">${title}</h2>`:''}`;
function bind(id,fn) { $(id)?.addEventListener('click',fn); }
function continueFeedback() { readFeedback = false; dispatch({type:'continue'}); }
function renderQuestion() {
  const reviewing = state.phase.startsWith('review');
  const q = currentQuestion(state,content.questions);
  if (reviewing && state.review?.guided) {
    showDialog(heading('חדר ההיחלצות','הדרך החוצה עדיין פתוחה')+'<p>אין כרגע שאלת חזרה זמינה. חפשו את הידית המוארת והרימו אותה כדי לפתוח את הכלוב. ההתקדמות שלכם נשמרת.</p>'+button('guided-continue','להרים את הידית ולהשתחרר'));
    bind('guided-continue',()=>dispatch({type:'guided-continue'})); return;
  }
  if (!q) { showDialog(heading('אפשר להמשיך','חומר התרגול אינו זמין')+'<p>אפשר לחזור לעמוד הבית. ההתקדמות התקינה נשמרה בלשונית הזו.</p><a class="dialog-link" href="/index.html">חזרה ל־PrepX</a>'); return; }
  const room = activeRooms().find(e=>e.id===state.activeEncounter);
  const assigned=state.assignments[state.activeEncounter]||[];
  const trapAnswered=assigned.filter(id=>state.answers[id]).length;
  const hint = reviewing && state.review.hint ? `<p class="explanation">רמז: ${text(q.explanation.he)}</p>` : '';
  showDialog(heading(reviewing?`חדר ההיחלצות · שלב ${state.review.index+1} מתוך 2`:`${text(room?.title)} · שאלה ${trapAnswered+1} מתוך ${assigned.length}`,text(q.prompt))+
    (reviewing?'<p class="small-note">חוזרים לשאלה שפגשנו. אין איבוד לבבות ואין שינוי בציון המקורי.</p>':'<p class="small-note">1–3 שאלות בכל מלכודת. היצורים מחכים בזמן שחושבים.</p>')+hint+
    `<div class="answers">${q.options.map((option,index)=>`<button class="answer" data-choice="${option.original}"><span class="answer-index">${index+1}</span><span>${text(option.text)}</span></button>`).join('')}</div>`+sourceHtml(q));
  document.querySelectorAll('[data-choice]').forEach(el=>el.addEventListener('click',()=>{
    if (!['question','review'].includes(state.phase)) return;
    readFeedback = false;
    dispatch({type:reviewing?'review-answer':'answer',choice:Number(el.dataset.choice)});
  }));
}
function renderFeedback() {
  const reviewing = state.phase === 'review-feedback';
  const q = currentQuestion(state,content.questions);
  const correct = reviewing ? state.review.correct : state.lastAnswer?.correct;
  const guided = reviewing && !correct && state.review.wrong>=2;
  const label = correct ? (reviewing?'השרשרת משתחררת!':'תשובה נכונה!') : (reviewing?'יש עוד דרך לפתור':'המלכודת הופעלה');
  const detail = correct ? (reviewing?'עוד צעד בדרך החוצה.':'הרווחתם 10 מטבעות. הדרך נפתחת.') : (reviewing?'הרמזים יעזרו לכם להשתחרר. לא איבדתם לב נוסף.':'לב אחד ירד. אין מטבעות על השאלה הזו, והדרך נשארת פתוחה.');
  const answerText = q ? `<p>התשובה הנכונה: <strong>${text(q.choices[q.correct])}</strong></p>` : '';
  showDialog(heading(reviewing?'חדר ההיחלצות':'תוצאת המלכודת','')+
    `<div class="feedback-label"><span class="feedback-mark ${correct?'':'wrong'}" aria-hidden="true">${correct?'✓':'↘'}</span><h2 id="dialog-title">${label}</h2></div><p>${detail}</p>`+
    (guided||!reviewing||correct?answerText:'')+explanationHtml(q)+
    `<div class="dialog-actions">${button('continue-button',guided?'הבנתי, לשחרר את השרשרת':reviewing&&!correct?'לנסות עם רמז':reviewing?'לשלב הבא':'להמשיך בדרך')}</div>`+
    (!reviewing?'<button id="read-feedback" class="reading-button">להישאר ולקרוא · עצירת המעבר האוטומטי</button>':''));
  bind('continue-button',continueFeedback);
  bind('read-feedback',()=>{readFeedback=true;stopAuto();$('read-feedback').textContent='המעבר נעצר. המשיכו כשתהיו מוכנים.';});
  if (!reviewing && !readFeedback) autoTimer=setTimeout(()=>{if(state.phase==='feedback'&&!state.paused&&!panel)continueFeedback();},1500);
}
function renderCapture() {
  const q=content.questions.find(q=>q.id===state.lastAnswer?.id);
  showDialog(heading('נתפסתם · ההרפתקה ממשיכה','״תפסתי אתכם! נראה איך תשתחררו…״')+
    '<p>אתם בתוך הכלוב. השומר מעבר לסורגים, אבל ההתקדמות נשארת שלכם. שתי שאלות עם רמזים ישחררו אתכם.</p>'+
    (q?`<p class="small-note">על השאלה האחרונה: ${text(q.explanation.he)}</p>`:'')+button('skip-capture','לחדר ההיחלצות'));
  bind('skip-capture',()=>dispatch({type:'skip-capture'}));
}
function renderSummary(reviewOnly=false) {
  const pr=progress(state,content.questions);
  const stars=globalThis.QuizCore?.starsFor(pr.score)||0;
  const rows=content.questions.filter(q=>state.answers[q.id]).map(q=>`<div class="review-item"><strong>${state.answers[q.id].correct?'✓':'↘'} ${text(q.prompt)}</strong><p>התשובה שלכם: ${text(q.choices[state.answers[q.id].choice])}</p><p>התשובה הנכונה: ${text(q.choices[q.correct])}</p>${explanationHtml(q)}</div>`).join('');
  showDialog(heading('השער פתוח','יצאתם ממבוך הצללים!')+`<p>כל שלושת החותמים שלכם. גם דרך עם טעויות מובילה החוצה.</p><div class="result-grid"><div><strong>${pr.score}</strong><small>ציון ידע מתוך 100</small></div><div><strong>${state.coins}</strong><small>מטבעות משחק</small></div><div><strong>${state.captureCount}</strong><small>היחלצויות</small></div></div><p class="small-note">${'★'.repeat(stars)}${'☆'.repeat(3-stars)} · הציון מבוסס על התשובות הראשונות בלבד. החזרה בחדר ההיחלצות אינה משנה אותו.</p>`+
    (reviewOnly?rows:button('review-result','לעבור על התשובות',false))+'<a class="dialog-link" href="/index.html">בחזרה ל־PrepX · לבחור הרפתקה אחרת</a>');
  bind('review-result',()=>renderSummary(true));
}
function openPanel(kind) {
  if (!started || state.phase==='complete') return;
  stopAuto(); route=[]; held.clear(); pointerDirection=null;queuedDirection=null; panel=kind; dispatch({type:'pause'}); renderUi();
}
function closePanel() { panel=null; dispatch({type:'resume'}); renderUi(); }
function renderPanel() {
  if(panel==='map') {
    const cells=MAZE.map((row,y)=>[...row].map((cell,x)=>{
      const player=x===state.player.x&&y===state.player.y;
      const room=activeRooms().find(e=>e.x===x&&e.y===y);
      const entity=WORLD_ENTITIES.find(e=>{const p=worldEntityPosition(e,state.elapsedMs,state.world);return Math.round(p.x)===x&&Math.round(p.y)===y;});
      const mark=player?'●':entity?(entity.kind==='human'?'♟':'·'):room?(state.resolved.includes(room.id)?'✓':'✧'):x===EXIT.x&&y===EXIT.y?'↗':cell==='S'?'⌂':'';
      return `<span class="map-cell ${cell==='#'?'wall':''} ${state.visited.includes(`${x},${y}`)?'visited':''} ${room?'seal':''} ${player?'player':''}" aria-hidden="true">${mark}</span>`;
    }).join('')).join('');
    showDialog(heading('מפה · הזמן נעצר','מצאו את הדרך שלכם')+`<div class="map-grid" style="grid-template-columns:repeat(${MAZE[0].length},1fr);aspect-ratio:${MAZE[0].length}/${MAZE.length}" role="img" aria-label="מפת המבוך. נקודה מסמנת אתכם, כוכב מסמן מלכודת, חץ מסמן יציאה.">${cells}</div><p class="map-legend">● אתם כאן · ✧ מלכודת · ✓ הושלמה · ♟ דמות · ↗ יציאה<br>הגן המזרחי והחורבות בדרום מחוברים למבוך בכמה מעברים. חפשו דמויות, חיות ומשאבת מים.</p>`+button('close-panel','חזרה למבוך'));
    bind('close-panel',closePanel);
  } else if(panel==='world') {
    const dialogue=state.world.dialogue;
    const human=dialogue?.entityId==='scout';
    showDialog(heading(human?'מפגש עם סייר השבילים':'מפגש בגן',text(dialogue?.title||'אורח בשביל'))+`<p>${text(dialogue?.text||'יש עוד הרבה לגלות בין השבילים.')}</p><p class="small-note" id="world-topic-text">אפשר לעצור, לשאול ולהכיר את המקום. אין כאן שאלת מבחן.</p><div class="dialog-actions">${button('world-topic','מה עוד יש באזור?',false)}${button('close-panel','להמשיך לחקור')}</div>`);
    bind('close-panel',closePanel);
    bind('world-topic',()=>{$('world-topic-text').textContent=human?'השביל המואר מוביל למלכודת שטרם סיימתם. בגן המזרחי תמצאו שומרת, משאבה ובעלי חיים. המעברים הדרומיים חוזרים לחצר — אין צורך להתחיל מחדש.':'כשממלאים את קערת המים, השועל מגיע לשתות. אפשר להתקרב אליו ולהציע לו ללכת איתכם. בחורבות מחכה ינשוף, ובין השיחים מסתתר ארנב.';});
  } else if(panel==='journal') {
    showDialog(heading('יומן הדרך · הזמן נעצר','רמזים שנשארים איתכם')+`<ul class="hint-list"><li>מצאו את המלכודות המסומנות בחותם זוהר. בכל אחת עד שלוש שאלות.</li><li>השלמת השאלות נותנת חותם, גם אחרי טעות.</li><li>כדי להשתחרר מכלוב, אפשר להיעזר ברמזים. אחרי שתי טעויות תקבלו פתרון מודרך.</li>${state.clues.length?'<li>החריטה שגיליתם: שלושה חותמים פותחים את השער. לא צריך לענות נכון על הכול.</li>':'<li>חפשו חריטה מוארת על קיר המבוך.</li>'}${state.treasureCollected?'<li>גיליתם את חדר האוצר הסודי!</li>':''}<li>מפגשים בגנים ובחורבות: ${Object.keys(state.world.interactions).length} מתוך ${WORLD_ENTITIES.length}.</li>${state.world.scoutGuided?'<li>הסייר סימן את הדרך למלכודת הקרובה שטרם הושלמה.</li>':''}${state.world.waterFilled?'<li>מילאתם את קערת המים בגן.</li>':''}${state.world.foxFollowing?'<li>השועל מכיר אתכם ומלווה אתכם בשביל.</li>':''}</ul>`+button('close-panel','חזרה להרפתקה'));
    bind('close-panel',closePanel);
  } else {
    showDialog(heading('המשחק בהשהיה','הדרך תחכה לכם')+`<p>${storageAvailable?'ההתקדמות נשמרת בלשונית הזו.':'ההתקדמות אינה נשמרת. הישארו בלשונית הזו כדי להמשיך.'} הלבבות, היצורים והמלכודות מחכים עד שתחזרו.</p><p class="small-note">תנועה: החצים או WASD. אפשר ללחוץ על שביל. E לבדיקה מקרוב. F למסך מלא.</p>`+button('resume-button','להמשיך מאותו מקום')+`<a class="dialog-link" href="/index.html">חזרה ל־PrepX · ${storageAvailable?'ההתקדמות תישמר':'ללא שמירה'}</a>`);
    bind('resume-button',closePanel);
  }
}
function renderUi() {
  if(!state)return;
  const inCell=started&&trappedPhases.has(state.phase);
  document.body.dataset.encounter=String(inCell);
  $('maze-canvas').setAttribute('aria-label',inCell?'מבט מגוף ראשון בתוך כלוב. מעבר לסורגים עומד השומר. השתמשו בכפתורי הכלוב כדי להביט, להאיר ולבדוק.':'מבוך תלת־ממדי. תנועה עם החצים או WASD, או לחיצה על שביל.');
  $('hearts').textContent=Array.from({length:3},(_,i)=>i<state.hearts?'♥':'♡').join(' ');
  $('hearts').setAttribute('aria-label',`${state.hearts} לבבות מתוך 3`);
  $('coins').textContent=state.coins;
  $('seals').textContent=`${state.seals.length} / 3`;
  $('offline-badge').hidden=!content.offline;
  const pr=progress(state,content.questions);
  guidePath=[];
  if(state.world.scoutGuided){for(const room of activeRooms().filter(e=>!state.resolved.includes(e.id))){const p=pathTo(state.player,room);if(p&&(!guidePath.length||p.length<guidePath.length))guidePath=p;}}
  $('location-label').textContent=inCell?'בתוך הכלוב · מבט מגוף ראשון':pr.complete?'שער היציאה מחכה':'מסדרונות הצללים';
  $('objective-text').textContent=pr.complete?'סיימתם את המלכודות. מצאו את השער הזוהר.':`מלכודות ${pr.trapsResolved} מתוך ${pr.trapsTotal} · ${pr.answered} מתוך ${pr.total} שאלות`;
  $('notice').textContent=state.notice||`מפגשים בעולם: ${Object.keys(state.world.interactions).length} מתוך ${WORLD_ENTITIES.length}. הסייר מחכה בשבילים, ובגן המזרחי יש עוד דמויות ובעלי חיים.`;
  document.querySelectorAll('[data-direction],#interact-button').forEach(el=>el.disabled=!started||state.paused||state.phase!=='explore');
  if(!started)return;
  if(panel){renderPanel();return;}
  if(state.paused){panel='pause';renderPanel();return;}
  if(state.phase==='question'||state.phase==='review')renderQuestion();
  else if(state.phase==='feedback'||state.phase==='review-feedback')renderFeedback();
  else if(state.phase==='capture')renderCapture();
  else if(state.phase==='complete')renderSummary();
  else closeDialog();
}
function step(name) {
  if(!started||dialog.open||panel||state.phase!=='explore')return;
  if(direction[name]){route=[];queuedDirection=name;}
}
function handleInteract(){
  if(!started||state.paused||state.phase!=='explore')return;
  if(movement?.target){pendingInteract=true;held.clear();pointerDirection=null;route=[];queuedDirection=null;return;}
  pendingInteract=false;
  const entity=nearbyWorldEntity(state.player,state.world,state.elapsedMs);
  if(entity){dispatch({type:'world-interact',entityId:entity.id});if(entity.kind==='human')openPanel('world');}
  else dispatch({type:'interact'});
}
function updateExploreContext(){
  if(!started||state.phase!=='explore'||state.paused)return;
  const entity=nearbyWorldEntity(state.player,state.world,state.elapsedMs);
  const label=entity?.actionLabel||'לבדוק מקרוב';
  if($('interact-button').textContent!==label)$('interact-button').textContent=label;
}
function advanceWalking(ms){
  if(!movement||!started)return;
  const name=pointerDirection||[...held].at(-1)||queuedDirection;
  const vector=name?direction[name]:null;
  const wasTarget=movement.target;
  let continuous=!!(pointerDirection||held.size);
  if(!vector&&route.length>1){const a=route[0],b=route[1];continuous=b.x-a.x===a.x-movement.origin.x&&b.y-a.y===a.y-movement.origin.y;}
  const result=advanceMovement(movement,{direction:vector?{dx:vector[0],dy:vector[1]}:undefined,nextCell:!vector?route[0]:undefined,continuous,canWalk:isWalkable,paused:state.paused||state.phase!=='explore'||dialog.open,dt:ms/1000});
  movement=result.movement;
  if(queuedDirection&&(movement.target||result.arrived||!isWalkable(movement.origin.x+(vector?.[0]||0),movement.origin.y+(vector?.[1]||0))))queuedDirection=null;
  if(result.arrived){
    if(route[0]?.x===result.arrived.x&&route[0]?.y===result.arrived.y)route.shift();
    dispatch({type:'move',dx:result.arrived.dx,dy:result.arrived.dy});
    if(pendingInteract)handleInteract();
  }
  if(!wasTarget&&!movement.target&&!result.arrived&&vector)queuedDirection=null;
  updateExploreContext();
}
function start() {
  if(!state||!renderer)return;
  started=true;document.body.dataset.intro='false';$('intro').hidden=true;
  if(state.paused)state=transition(state,{type:'resume'},content.questions);
  panel=null;movement=createMovement(state.player);save();renderUi();updateExploreContext();renderer.resize();$('maze-canvas').focus({preventScroll:true});
}
$('start-button').addEventListener('click',start);
$('pause-button').addEventListener('click',()=>openPanel('pause'));
$('map-button').addEventListener('click',()=>openPanel('map'));
$('journal-button').addEventListener('click',()=>openPanel('journal'));
$('world-map-button').addEventListener('click',()=>openPanel('map'));
$('interact-button').addEventListener('click',handleInteract);
document.querySelectorAll('[data-direction]').forEach(el=>{
  el.addEventListener('pointerdown',event=>{if(event.button!==0||el.disabled)return;event.preventDefault();el.setPointerCapture(event.pointerId);pointerDirection=el.dataset.direction;step(pointerDirection);});
  for(const type of ['pointerup','pointercancel','lostpointercapture'])el.addEventListener(type,()=>{pointerDirection=null;});
  el.addEventListener('click',event=>{if(event.detail===0)step(el.dataset.direction);});
});
dialog.addEventListener('cancel',event=>{event.preventDefault();if(panel)closePanel();else if(state.phase==='explore')closeDialog();});
const keyDirection={ArrowUp:'up',ArrowRight:'right',ArrowDown:'down',ArrowLeft:'left',w:'up',d:'right',s:'down',a:'left'};
window.addEventListener('keydown',event=>{
  if(event.ctrlKey||event.metaKey||event.altKey)return;
  const name=keyDirection[event.key]||keyDirection[event.key.toLowerCase()];
  if(name&&started&&!dialog.open){event.preventDefault();if(!event.repeat){route=[];step(name);held.add(name);}}
  if(event.key==='Escape'&&started&&!dialog.open){event.preventDefault();openPanel('pause');}
  if(event.key.toLowerCase()==='e'&&started&&!dialog.open)handleInteract();
  if(event.key.toLowerCase()==='f'&&started&&!dialog.open){if(document.fullscreenElement)document.exitFullscreen?.();else document.querySelector('.game-shell').requestFullscreen?.().catch(()=>{});}
});
window.addEventListener('keyup',event=>held.delete(keyDirection[event.key]||keyDirection[event.key.toLowerCase()]));
window.addEventListener('blur',()=>{held.clear();pointerDirection=null;route=[];});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&started&&!state.paused&&state.phase!=='complete')openPanel('pause');});
$('maze-canvas').addEventListener('click',event=>{
  if(!started||dialog.open||state.phase!=='explore')return;
  const destination=renderer.cellFromPointer(event.clientX,event.clientY);
  if(destination&&isWalkable(destination.x,destination.y)){held.clear();pointerDirection=null;queuedDirection=null;const from=movement?.target||state.player;route=pathTo(from,destination)||[];if(movement?.target)route.unshift({...movement.target});}
});
function advance(ms) {
  if(!state||!started)return;
  interaction=reduceInteraction(interaction,{type:'tick',dt:ms},interactionContext());
  dispatch({type:'tick',ms,moving:!!movement?.target});
  if(reducedMotion.matches&&state.phase==='capture')dispatch({type:'skip-capture'});
}
window.advanceTime=ms=>{for(let remaining=Math.min(ms,60000);remaining>0;remaining-=16.667){const dt=Math.min(16.667,remaining);advanceWalking(dt);advance(dt);}renderer?.render(state,viewOptions());};
window.render_game_to_text=()=>JSON.stringify(state?{
  coordinates:'tile origin upper-left; x right/east, y down/south; directions are world axes',
  started,phase:state.phase,paused:state.paused,player:state.player,movement,world:state.world,worldEntities:WORLD_ENTITIES.map(e=>({...e,position:worldEntityPosition(e,state.elapsedMs,state.world)})),nearbyEntity:nearbyWorldEntity(state.player,state.world,state.elapsedMs)?.id||null,hearts:state.hearts,coins:state.coins,seals:state.seals,
  progress:progress(state,content.questions),activeEncounter:state.activeEncounter,review:state.review,captureCount:state.captureCount,
  captureMs:state.captureMs,elapsedMs:state.elapsedMs,graceMs:state.graceMs,
  currentQuestion:currentQuestion(state,content.questions)?{id:currentQuestion(state,content.questions).id,options:currentQuestion(state,content.questions).options}:null,
  encounters:activeRooms().map(e=>({...e,resolved:state.resolved.includes(e.id),questions:state.assignments[e.id].length,answered:state.assignments[e.id].filter(id=>state.answers[id]).length})),exit:EXIT,clues:state.clues,treasureCollected:state.treasureCollected,notice:state.notice,
  source:content.source,contentVersion:content.version,storageAvailable,panel,view:trappedPhases.has(state.phase)&&started?'first-person-cage':'maze',interaction
}:{phase:'loading'});
function frame(now) {
  const dt=lastFrame?Math.min(100,now-lastFrame):0;lastFrame=now;
  if(state){
    advanceWalking(dt);
    advance(dt);
    persistElapsed+=dt;if(persistElapsed>1500){save();persistElapsed=0;}
    renderer?.render(state,viewOptions());
  }
  requestAnimationFrame(frame);
}
function initializeIntro() {
  movement=createMovement(state.player);guidePath=[];
  const select=$('quiz-select');
  select.innerHTML=MAZE_QUIZZES.map(quiz=>`<option value="${escapeText(quiz.id)}">${text(quiz.title)}</option>`).join('');
  select.value=content.id;
  const existing=Object.keys(state.answers).length>0||state.visited.length>1;
  select.disabled=existing;
  $('start-button').textContent=existing?'להמשיך מאותו מקום':'להיכנס למבוך ←';
  $('start-button').disabled=false;
  select.addEventListener('change',async()=>{
    select.disabled=true;$('start-button').disabled=true;$('start-button').textContent='טוענים את חומר התרגול…';
    try{content=await loadMazeContent({quizId:select.value});state=createState(content.questions);movement=createMovement(state.player);save();renderUi();$('start-button').textContent='להיכנס למבוך ←';}
    catch{$('notice').textContent='לא הצלחנו לטעון תרגול. אפשר לנסות שוב או לחזור ל־PrepX.';}
    finally{select.disabled=false;$('start-button').disabled=false;}
  });
  renderUi();requestAnimationFrame(frame);
}
async function startSeparateExpedition(savedText, trigger) {
  trigger.disabled=true;
  try {
    const nextContent=await loadMazeContent({quizId:DEFAULT_QUIZ_ID});
    try {
      const backupKey=SESSION_KEY+'-unrestorable-'+Date.now();
      sessionStorage.setItem(backupKey,savedText);
      if(sessionStorage.getItem(backupKey)!==savedText)throw new Error('Backup verification failed');
    } catch { markStorageUnavailable(); }
    // If archiving fails, save() stays disabled: the original record remains untouched.
    content=nextContent;state=createState(content.questions);
    $('start-button').onclick=null;$('quiz-select').hidden=false;
    document.querySelector('.recovery-actions')?.remove();
    initializeIntro();start();
  } catch {
    trigger.disabled=false;
    $('notice').textContent='לא הצלחנו לפתוח הרפתקה נפרדת. השמירה הקודמת נשארה ללא שינוי.';
  }
}
async function boot() {
  document.body.dataset.intro='true';
  try{renderer=createMazeRenderer($('maze-canvas'));}catch{$('renderer-error').hidden=false;return;}
  try {
    let pinned=null, recoveryProblem=false, savedText=null;
    try{savedText=sessionStorage.getItem(SESSION_KEY);}catch{markStorageUnavailable();}
    if(savedText){
      try{const saved=JSON.parse(savedText);const normalized=normalizeMazeContent(saved.content, {pinned:true});const restored=restoreState(saved.state,normalized.questions);if(restored)pinned={content:normalized,state:restored};else recoveryProblem=true;}
      catch{recoveryProblem=true;}
    }
    if(recoveryProblem){
      $('start-button').textContent='לנסות לשחזר שוב';$('start-button').disabled=false;
      $('notice').textContent='לא הצלחנו לשחזר את ההרפתקה. השמירה הקודמת נשארה ללא שינוי.';
      $('start-button').onclick=()=>location.reload();
      $('quiz-select').hidden=true;
      const actions=document.createElement('div');actions.className='recovery-actions';
      const separate=document.createElement('button');separate.id='new-expedition-button';separate.className='button';separate.textContent='הרפתקה נפרדת · שמירת העותק הישן';
      separate.addEventListener('click',()=>startSeparateExpedition(savedText,separate));actions.append(separate);
      const link=document.createElement('a');link.className='dialog-link';link.href='/index.html';link.textContent='חזרה ל־PrepX בלי לשנות את השמירה';actions.append(link);$('start-button').after(actions);
      return;
    }
    if(pinned){content=pinned.content;state=pinned.state;}
    else {
      const requested=new URLSearchParams(location.search).get('quiz')||DEFAULT_QUIZ_ID;
      const supported=MAZE_QUIZZES.some(quiz=>quiz.id===requested);
      content=await loadMazeContent({quizId:supported?requested:DEFAULT_QUIZ_ID});state=createState(content.questions);
      if(!supported)state.notice='הקישור הפנה לתרגול לא מוכר. בחרנו תרגול זמין; אפשר לבחור אחר לפני הכניסה.';
    }
    initializeIntro();
  }catch{$('start-button').textContent='לנסות לטעון שוב';$('start-button').disabled=false;$('start-button').onclick=()=>location.reload();$('notice').textContent='חומר התרגול לא נטען. אפשר לנסות שוב בלי לאבד התקדמות.';}
}
boot();
