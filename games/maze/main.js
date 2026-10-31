import { createState, restoreState, transition, currentQuestion, progress, MAZE_LAYOUTS, selectMazeLayout, MAZE, encountersFor, EXIT, pathTo, isWalkable, rewardBalance } from './core.js';
import { loadMazeContent, normalizeMazeContent, MAZE_QUIZZES, DEFAULT_QUIZ_ID } from './content.js';
import { createMazeRenderer } from './renderer.js';
import { ANSWER_REACTION_MS } from './answer-reaction.js';
import '../../quiz-core.js';
import {createMovement,advanceMovement,syncMovement} from './movement.js';
import {WORLD_ENTITIES,nearbyWorldEntity,worldEntityPosition} from './world.js';
import { createInteractions, reduceInteraction, interactionLabels } from './interactions.js';
import { questionPresentation } from './question-presentation.js';
import { createGreetings, advanceGreetings } from './greetings.js';
import completionAtlas from './art/escape-moments.png';
import { COMPLETION_ART, isCompletionArt, chooseCompletionArt } from './completion-art.js';

const $ = id => document.getElementById(id);
const SESSION_KEY = 'prepx-shadow-maze-session-v1';
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const dialog = $('game-dialog');
let content, state, renderer, started = false, panel = null, autoTimer = null, readFeedback = false;
let storageAvailable = true, switchingAdventure = false;
let route = [], lastFrame = 0, previousFocus = null, persistElapsed = 0;
let movement=null, queuedDirection=null, pointerDirection=null, pendingInteract=false, guidePath=[];
let interaction = createInteractions();
let greetings = createGreetings();
let trapEntry = null;
let answerReaction = null;
const trapEntryDuration = 900;
const giftNames=['גביש אור','מפתח הירח','כוכב השומר','אבן להבה','פנינת ההד','נוצת הלחישות','אבן רונות','טיפת אור','קשת זהב','יהלום הכספת'];
const trappedPhases = new Set(['question','feedback','capture','review','review-feedback']);
const held = new Set();
let joystickPointer = null;
function clearPointerDirections(){
  const pointer=joystickPointer;
  joystickPointer=null;pointerDirection=null;
  const joystick=$('movement-joystick');
  joystick?.querySelector('.joystick-thumb').style.setProperty('transform','translate(0px,0px)');
  if(pointer!==null&&joystick?.hasPointerCapture(pointer))joystick.releasePointerCapture(pointer);
}
const pendingGift = () => state?.phase === 'explore' ? state.resolved.find(id => !state.giftsSeen.includes(id)) : null;
const activeRooms = () => encountersFor(content.questions);
const visibleGreeting = () => started&&state?.phase==='explore'&&!state.paused&&!panel?greetings.active:null;
function renderGreeting(){
  const active=visibleGreeting(),bubble=$('nearby-greeting');
  bubble.hidden=!active;
  if(active&&bubble.dataset.sequence!==String(active.sequence)){
    $('greeting-name').textContent=active.name;
    $('greeting-text').textContent=active.text;
    bubble.dataset.sequence=String(active.sequence);
  }
}
const viewOptions = () => ({intro:!started,reducedMotion:reducedMotion.matches,encounters:activeRooms(),interaction,answerReaction,guidePath,greeting:visibleGreeting(),trapEntry:trapEntry?1-trapEntry.remaining/trapEntryDuration:null,movement:movement?{x:movement.position.x,y:movement.position.y,speed:movement.speed,heading:movement.heading,moving:movement.moving||movement.speed>0}:undefined});
function interactionContext(){const room=state.assignments[state.activeEncounter]||[];return {phase:state.phase,paused:state.paused,reducedMotion:reducedMotion.matches,reviewIndex:state.review?.index||0,answered:room.filter(id=>state.answers[id]).length,total:room.length};}
function sceneControls(){return `<details class="cell-tools" id="cell-tools"><summary>לבדוק את הכלוב</summary><div class="cell-controls" aria-label="פעולות בתוך הכלוב">${['look-left','look-right','lantern','rattle','inspect'].map(action=>`<button type="button" data-cell-action="${action}" aria-label="${escapeText(interactionLabels[action])}"${action==='lantern'?` aria-pressed="${interaction.lanternRaised}"`:''}>${escapeText(({'look-left':'שמאלה','look-right':'ימינה',lantern:'פנס',rattle:'סורגים',inspect:'מנעול'})[action])}</button>`).join('')}</div><p id="cell-notice" class="cell-notice" role="status">${escapeText(interaction.notice||'בחרו פעולה כדי להסתכל סביב.')}</p></details>`;}
function interactWithCell(action){
  if(state.phase==='feedback')pauseFeedbackReading('המעבר נעצר בזמן שבודקים את הכלוב.');
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
  if (!content || !state || !storageAvailable || switchingAdventure) return;
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
  if (action.type === 'answer' || action.type === 'review-answer') {
    answerReaction = { correct: action.type === 'answer' ? state.lastAnswer.correct : state.review.correct, elapsedMs: 0 };
  } else if (!trappedPhases.has(state.phase) || ['continue','guided-continue','skip-capture'].includes(action.type)) answerReaction = null;
  if(movement)movement=syncMovement(movement,state.player);
  if(state.phase!=='explore'){
    held.clear();clearPointerDirections();queuedDirection=null;pendingInteract=false;
    if(movement)movement={...createMovement(state.player),heading:movement.heading};
  }
  if (oldPhase === 'explore' && trappedPhases.has(state.phase)) interaction=createInteractions();
  if(oldPhase==='explore'&&state.phase==='question'&&!reducedMotion.matches)trapEntry={remaining:trapEntryDuration,encounter:state.activeEncounter};
  if(state.phase!=='question')trapEntry=null;
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
  dialog.classList.remove('gift-sheet','rewards-sheet');
  dialog.classList.toggle('cell-sheet',inCell);
  dialog.classList.toggle('trap-entry',inCell&&!!trapEntry);
  const saveNotice=storageAvailable?'':`<p class="dialog-save-warning" role="status">${unsavedMessage}</p>`;
  const exitMenu=started&&!panel&&state.phase!=='complete'?`<button id="encounter-menu" class="reading-button">${trapEntry?'השהיה':`השהיה או יציאה · ${storageAvailable?'ההתקדמות נשמרת':'ללא שמירה'}`}</button>`:'';
  $('dialog-content').innerHTML = saveNotice + html + (inCell&&!trapEntry?sceneControls():'') + exitMenu;
  bind('encounter-menu', () => openPanel('pause'));
  document.querySelectorAll('[data-cell-action]').forEach(el=>el.addEventListener('click',()=>interactWithCell(el.dataset.cellAction)));
  document.querySelectorAll('.cell-tools,.feedback-explanation').forEach(el=>el.addEventListener('toggle',()=>{if(el.open&&state.phase==='feedback')pauseFeedbackReading();}));
  if (!dialog.open) { previousFocus = document.activeElement; dialog.showModal(); }
  dialog.scrollTop = 0;
  queueMicrotask(() => $('dialog-content').querySelector('#skip-trap-entry,[data-choice],#continue-button,#skip-capture,#guided-continue,#close-panel,#resume-button')?.focus({preventScroll:true}));
}
const button = (id,label,primary=true) => `<button id="${id}" class="button ${primary?'primary':''}">${label}</button>`;
const heading = (kicker,title) => `<div class="dialog-kicker"><span>${kicker}</span><span>מבוך הצללים</span></div>${title?`<h2 id="dialog-title">${title}</h2>`:''}`;
function bind(id,fn) { $(id)?.addEventListener('click',fn); }
function continueFeedback() { readFeedback = false; dispatch({type:'continue'}); }
function pauseFeedbackReading(message='המעבר נעצר') {
  if(state.phase!=='feedback')return;
  readFeedback=true;stopAuto();
  if($('read-feedback'))$('read-feedback').textContent=message;
  if($('feedback-actions'))$('feedback-actions').hidden=false;
  if(!$('continue-button')){
    $('feedback-actions')?.insertAdjacentHTML('beforeend',button('continue-button','להמשיך אחרי הקריאה'));
    bind('continue-button',continueFeedback);
  }
}
function finishTrapEntry(){trapEntry=null;renderUi();renderer?.render(state,viewOptions());}
function renderTrapEntry(){
  const room=activeRooms().find(room=>room.id===state.activeEncounter);
  showDialog(heading('מלכודת הופעלה',text(room?.title||'הכלוב נסגר'))+'<p class="trap-entry-message">השער נסגר. עונים ומשתחררים.</p>'+button('skip-trap-entry','לשאלות ←'));
  bind('skip-trap-entry',finishTrapEntry);
}
function renderQuestion() {
  const reviewing = state.phase.startsWith('review');
  const q = currentQuestion(state,content.questions);
  if (reviewing && state.review?.guided) {
    showDialog(heading('חדר ההיחלצות','הדרך החוצה פתוחה')+'<p>הרימו את הידית. ההתקדמות נשמרת.</p>'+button('guided-continue','לפתוח ולהשתחרר'));
    bind('guided-continue',()=>dispatch({type:'guided-continue'})); return;
  }
  if (!q) { showDialog(heading('אפשר להמשיך','חומר התרגול אינו זמין')+'<p>אפשר לחזור לעמוד הבית. ההתקדמות התקינה נשמרה בלשונית הזו.</p><a class="dialog-link" href="/index.html">חזרה ל־PrepX</a>'); return; }
  const room = activeRooms().find(e=>e.id===state.activeEncounter);
  const assigned=state.assignments[state.activeEncounter]||[];
  const trapAnswered=assigned.filter(id=>state.answers[id]).length;
  const presentation=questionPresentation(q);
  const hint = reviewing && state.review.hint ? `<p class="explanation">רמז: ${text(q.explanation.he)}</p>` : '';
  showDialog(heading(reviewing?`חדר ההיחלצות · שלב ${state.review.index+1} מתוך 2`:`${text(room?.title)} · שאלה ${trapAnswered+1} מתוך ${assigned.length}`,'')+
    (presentation.context?`<p class="question-context" id="question-context">${text(presentation.context)}</p>`:'')+`<h2 id="dialog-title">${text(presentation.prompt)}</h2>`+
    (reviewing?'<p class="small-note">חזרה עם רמזים · בלי איבוד לבבות</p>':'')+hint+
    `<div class="answers">${q.options.map((option,index)=>`<button class="answer" data-choice="${option.original}"><span class="answer-index">${index+1}</span><span>${text(option.text)}</span></button>`).join('')}</div><details class="question-source" id="question-source"><summary>מקור השאלה</summary>${sourceHtml(q)}</details>`);
  document.querySelectorAll('[data-choice]').forEach(el=>{
    // A release from the outgoing feedback screen cannot become a new answer.
    let pressedHere=false;
    el.addEventListener('pointerdown',()=>{pressedHere=true;});
    el.addEventListener('pointercancel',()=>{pressedHere=false;});
    el.addEventListener('keydown',event=>{if(event.repeat&&['Enter',' '].includes(event.key))event.preventDefault();});
    el.addEventListener('click',event=>{
      const freshPress=pressedHere;pressedHere=false;
      if(event.detail>0&&!freshPress)return;
      if(state.phase!==(reviewing?'review':'question')||currentQuestion(state,content.questions)?.id!==q.id)return;
      readFeedback = false;
      dispatch({type:reviewing?'review-answer':'answer',choice:Number(el.dataset.choice)});
    });
  });
}
function renderFeedback() {
  const reviewing = state.phase === 'review-feedback';
  const q = currentQuestion(state,content.questions);
  const correct = reviewing ? state.review.correct : state.lastAnswer?.correct;
  const guided = reviewing && !correct && state.review.wrong>=2;
  const label = correct ? (reviewing?'השרשרת משתחררת!':'תשובה נכונה!') : (reviewing?'יש עוד דרך לפתור':'תשובה לא נכונה');
  const detail = correct ? (reviewing?'עוד שרשרת השתחררה.':'+10 מטבעות') : (reviewing?'מנסים שוב עם רמז.':'לב אחד ירד · ממשיכים מכאן');
  const answerText = q ? `<p>התשובה הנכונה: <strong>${text(q.choices[q.correct])}</strong></p>` : '';
  showDialog(heading(reviewing?'חדר ההיחלצות':'תוצאת המלכודת','')+
    `<div class="feedback-label"><span class="feedback-mark ${correct?'':'wrong'}" aria-hidden="true">${correct?'✓':'↘'}</span><h2 id="dialog-title">${label}</h2></div><p>${detail}</p>`+
    (guided||!reviewing||correct?answerText:'')+(reviewing?explanationHtml(q):`<details class="feedback-explanation" id="feedback-explanation"><summary>למה זו התשובה?</summary>${explanationHtml(q)}</details>`)+
    `<div class="dialog-actions" id="feedback-actions"${!reviewing&&!readFeedback?' hidden':''}>${reviewing?button('continue-button',guided?'הבנתי, לשחרר את השרשרת':!correct?'לנסות עם רמז':'לשלב הבא'):readFeedback?button('continue-button','להמשיך אחרי הקריאה'):''}</div>`+
    (!reviewing?'<button id="read-feedback" class="reading-button">לעצור ולקרוא</button>':''));
  bind('continue-button',continueFeedback);
  bind('read-feedback',()=>{pauseFeedbackReading();$('feedback-explanation').open=true;});
  if (!reviewing && !readFeedback) autoTimer=setTimeout(()=>{if(state.phase==='feedback'&&!state.paused&&!panel)continueFeedback();},1500);
}
function renderCapture() {
  showDialog(heading('נתפסתם','שתי שרשראות. דרך אחת החוצה.')+
    '<p>שתי שאלות עם רמזים ישחררו אתכם. ההתקדמות נשמרת.</p>'+button('skip-capture','להשתחרר עם רמזים'));
  bind('skip-capture',()=>dispatch({type:'skip-capture'}));
}
function renderSummary(reviewOnly=false) {
  if(!isCompletionArt(state.completionArt)){
    let previous=null;
    if(storageAvailable){try{const value=sessionStorage.getItem(SESSION_KEY+'-last-completion-art');previous=value===null?null:Number(value);}catch{markStorageUnavailable();}}
    state.completionArt=chooseCompletionArt(null,previous);save();
    if(storageAvailable){try{sessionStorage.setItem(SESSION_KEY+'-last-completion-art',String(state.completionArt));}catch{/* The run itself is saved; decoration history is optional. */}}
  }
  const art=COMPLETION_ART[state.completionArt];
  const pr=progress(state,content.questions);
  const stars=globalThis.QuizCore?.starsFor(pr.score)||0;
  const rows=reviewOnly?content.questions.filter(q=>state.answers[q.id]).map(q=>`<div class="review-item"><strong>${state.answers[q.id].correct?'✓':'↘'} ${text(q.prompt)}</strong><p>התשובה שלכם: ${text(q.choices[state.answers[q.id].choice])}</p><p>התשובה הנכונה: ${text(q.choices[q.correct])}</p>${explanationHtml(q)}</div>`).join(''):'';
  showDialog(`<section class="completion-screen" data-completion-art="${state.completionArt}"><div class="completion-picture" role="img" aria-label="${escapeText(art.alt)}" style="background-image:url('${escapeText(completionAtlas)}');background-position:center ${art.position}"></div><div class="completion-copy">`+
    heading('ההרפתקה הושלמה',text(art.title))+`<p class="completion-message">${text(art.message)}</p><p class="completion-stars" aria-label="${stars} כוכבים מתוך 3">${'★'.repeat(stars)}${'☆'.repeat(3-stars)}</p><div class="result-grid completion-results"><div><strong>${pr.score}</strong><small>ציון ידע מתוך 100</small></div><div><strong>${state.coins}</strong><small>מטבעות</small></div><div><strong>${state.captureCount}</strong><small>היחלצויות</small></div></div><div class="completion-actions"><a class="dialog-link button primary" id="completion-home" href="/index.html">בחזרה הביתה ↗</a>${button('completion-rewards','האוסף והשדרוגים',false)}${button('change-subject','הרפתקה חדשה · החלפת נושא',false)}${reviewOnly?button('back-to-celebration','חזרה לחגיגה',false):'<button id="review-result" class="reading-button">לעבור על התשובות</button>'}</div><p class="small-note completion-score-note">הציון מבוסס על התשובות הראשונות. ההיחלצות אינה משנה אותו.</p>${rows}</div></section>`);
  bind('completion-rewards',()=>openPanel('rewards'));
  bind('review-result',()=>renderSummary(true));
  bind('back-to-celebration',()=>renderSummary(false));
  bind('change-subject',showSubjectPicker);
  $('completion-home').focus({preventScroll:true});
}

function openPanel(kind) {
  if (!started || (state.phase==='complete'&&kind!=='rewards')) return;
  stopAuto(); route=[]; held.clear(); clearPointerDirections();queuedDirection=null; panel=kind; dispatch({type:'pause'}); renderUi();
}
function closePanel() { panel=null; dispatch({type:'resume'}); renderUi(); }
function renderPanel() {
  if(panel==='rewards') { renderRewards(); }
  else if(panel==='map') {
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
    const rabbit=dialogue?.entityId==='rabbit';
    showDialog(heading(human?'מפגש עם סייר השבילים':'מפגש בגן',text(dialogue?.title||'אורח בשביל'))+`<p>${text(dialogue?.text||'יש עוד הרבה לגלות בין השבילים.')}</p><p class="small-note" id="world-topic-text">אפשר לעצור, לשאול ולהכיר את המקום. אין כאן שאלת מבחן.</p><div class="dialog-actions">${rabbit&&!state.world.rabbitFed?button('feed-rabbit','לתת לארנב גזר 🥕'):''}${rabbit?'':button('world-topic','מה עוד יש באזור?',false)}${button('close-panel',rabbit&&state.world.rabbitFollowing?'לצאת לדרך יחד':'להמשיך לחקור')}</div>`);
    bind('close-panel',closePanel);
    bind('feed-rabbit',()=>{
      dispatch({type:'resume'});
      dispatch({type:'world-interact',entityId:'rabbit',intent:'feed'});
      dispatch({type:'pause'});
      renderer?.render(state,viewOptions());
    });
    bind('world-topic',()=>{$('world-topic-text').textContent=human?'השביל המואר מוביל למלכודת שטרם סיימתם. בגן המזרחי תמצאו שומרת, משאבה ובעלי חיים. המעברים הדרומיים חוזרים לחצר — אין צורך להתחיל מחדש.':'כשממלאים את קערת המים, השועל מגיע לשתות. אפשר להתקרב אליו ולהציע לו ללכת איתכם. בחורבות מחכה ינשוף, ובין השיחים מסתתר ארנב.';});
  } else if(panel==='journal') {
    showDialog(heading('יומן הדרך · הזמן נעצר','רמזים שנשארים איתכם')+`<p class="small-note">מתנות שנאספו: ${state.giftsSeen.length} ✧</p><ul class="hint-list"><li>מצאו את המלכודות המסומנות בחותם זוהר. בכל אחת עד שלוש שאלות.</li><li>השלמת השאלות נותנת חותם, גם אחרי טעות.</li><li>כדי להשתחרר מכלוב, אפשר להיעזר ברמזים. אחרי שתי טעויות תקבלו פתרון מודרך.</li>${state.clues.length?'<li>החריטה שגיליתם: שלושה חותמים פותחים את השער. לא צריך לענות נכון על הכול.</li>':'<li>חפשו חריטה מוארת על קיר המבוך.</li>'}${state.treasureCollected?'<li>גיליתם את חדר האוצר הסודי!</li>':''}<li>מפגשים בגנים ובחורבות: ${Object.keys(state.world.interactions).length} מתוך ${WORLD_ENTITIES.length}.</li>${state.world.scoutGuided?'<li>הסייר סימן את הדרך למלכודת הקרובה שטרם הושלמה.</li>':''}${state.world.waterFilled?'<li>מילאתם את קערת המים בגן.</li>':''}${state.world.foxFollowing?'<li>השועל מכיר אתכם ומלווה אתכם בשביל.</li>':''}</ul>`+button('close-panel','חזרה להרפתקה'));
    bind('close-panel',closePanel);
  } else {
    showDialog(heading('המשחק בהשהיה','הדרך תחכה לכם')+`<p>${storageAvailable?'ההתקדמות נשמרת בלשונית הזו.':'ההתקדמות אינה נשמרת. הישארו בלשונית הזו כדי להמשיך.'} הלבבות, היצורים והמלכודות מחכים עד שתחזרו.</p><p class="small-note">תנועה: החצים או WASD. אפשר ללחוץ על שביל. E לבדיקה מקרוב. F למסך מלא.</p>`+button('resume-button','להמשיך מאותו מקום')+`<a class="dialog-link" href="/index.html">חזרה ל־PrepX · ${storageAvailable?'ההתקדמות תישמר':'ללא שמירה'}</a>`);
    $('dialog-content').insertAdjacentHTML('beforeend',button('change-subject','הרפתקה חדשה · החלפת נושא',false));
    bind('change-subject',showSubjectPicker);
    bind('resume-button',closePanel);
  }
}
function renderUi() {
  if(!state)return;
  renderGreeting();
  const inCell=started&&trappedPhases.has(state.phase);
  document.body.dataset.encounter=String(inCell);
  $('maze-canvas').setAttribute('aria-label',inCell?'מבט מגוף ראשון בתוך כלוב. מעבר לסורגים עומד השומר. השתמשו בכפתורי הכלוב כדי להביט, להאיר ולבדוק.':'מבוך תלת־ממדי. תנועה עם החצים או WASD, או לחיצה על שביל.');
  $('hearts').textContent=Array.from({length:3},(_,i)=>i<state.hearts?'♥':'♡').join(' ');
  $('hearts').setAttribute('aria-label',`${state.hearts} לבבות מתוך 3`);
  $('coins').textContent=state.coins;
  $('diamonds').textContent=rewardBalance(state);
  $('rewards-button').disabled=!started;
  $('rewards-button').setAttribute('aria-label',`${rewardBalance(state)} יהלומים. פתיחת האוסף והשדרוגים`);
  $('seals').textContent=`${state.seals.length} / 3`;
  $('offline-badge').hidden=!content.offline;
  const pr=progress(state,content.questions);
  guidePath=[];
  if(state.world.scoutGuided||state.rewardPurchases.includes('compass')){for(const room of activeRooms().filter(e=>!state.resolved.includes(e.id))){const p=pathTo(state.player,room);if(p&&(!guidePath.length||p.length<guidePath.length))guidePath=p;}}
  if(!guidePath.length&&pr.complete&&state.rewardPurchases.includes('compass'))guidePath=pathTo(state.player,EXIT)||[];
  $('location-label').textContent=inCell?'בתוך הכלוב · מבט מגוף ראשון':pr.complete?'שער היציאה מחכה':MAZE_LAYOUTS.find(layout=>layout.id===state.layoutId).title;
  $('objective-text').textContent=pr.complete?'סיימתם את המלכודות. מצאו את השער הזוהר.':`מלכודות ${pr.trapsResolved} מתוך ${pr.trapsTotal} · ${pr.answered} מתוך ${pr.total} שאלות`;
  $('notice').textContent=state.notice||`מפגשים בעולם: ${Object.keys(state.world.interactions).length} מתוך ${WORLD_ENTITIES.length}. הסייר מחכה בשבילים, ובגן המזרחי יש עוד דמויות ובעלי חיים.`;
  document.querySelectorAll('#movement-joystick,#interact-button').forEach(el=>el.disabled=!started||state.paused||state.phase!=='explore');
  if(!started)return;
  if(panel){renderPanel();return;}
  if(state.paused){panel='pause';renderPanel();return;}
  if(pendingGift())renderGift();
  else if(trapEntry&&state.phase==='question')renderTrapEntry();
  else if(state.phase==='question'||state.phase==='review')renderQuestion();
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
  if(movement?.target){pendingInteract=true;held.clear();clearPointerDirections();route=[];queuedDirection=null;return;}
  pendingInteract=false;
  const entity=nearbyWorldEntity(state.player,state.world,state.elapsedMs);
  if(entity){dispatch({type:'world-interact',entityId:entity.id});if(entity.kind==='human'||entity.id==='rabbit')openPanel('world');renderer?.render(state,viewOptions());}
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
  greetings=createGreetings();
  $('nearby-greeting').removeAttribute('data-sequence');
  started=true;document.body.dataset.intro='false';$('intro').hidden=true;
  if(state.paused)state=transition(state,{type:'resume'},content.questions);
  panel=null;movement=createMovement(state.player);save();renderUi();updateExploreContext();renderer.resize();$('maze-canvas').focus({preventScroll:true});
}
$('start-button').addEventListener('click',start);
$('pause-button').addEventListener('click',()=>openPanel('pause'));
$('map-button').addEventListener('click',()=>openPanel('map'));
$('journal-button').addEventListener('click',()=>openPanel('journal'));
$('rewards-button').addEventListener('click',()=>openPanel('rewards'));
$('world-map-button').addEventListener('click',()=>openPanel('map'));
$('interact-button').addEventListener('click',handleInteract);
const joystick=$('movement-joystick');
function steerJoystick(event){
  const box=joystick.getBoundingClientRect(),radius=box.width/2-28;
  const dx=event.clientX-box.left-box.width/2,dy=event.clientY-box.top-box.height/2;
  const distance=Math.hypot(dx,dy),scale=distance>radius?radius/distance:1;
  joystick.querySelector('.joystick-thumb').style.transform=`translate(${dx*scale}px,${dy*scale}px)`;
  pointerDirection=distance<12?null:Math.abs(dx)>Math.abs(dy)?(dx>0?'right':'left'):(dy>0?'down':'up');
  route=[];queuedDirection=null;
}
joystick.addEventListener('contextmenu',event=>event.preventDefault());
joystick.addEventListener('selectstart',event=>event.preventDefault());
joystick.addEventListener('pointerdown',event=>{
  if(event.button!==0||joystick.disabled||joystickPointer!==null)return;
  event.preventDefault();joystickPointer=event.pointerId;
  joystick.setPointerCapture(event.pointerId);held.clear();steerJoystick(event);
});
joystick.addEventListener('pointermove',event=>{
  if(event.pointerId!==joystickPointer)return;
  event.preventDefault();steerJoystick(event);
});
for(const type of ['pointerup','pointercancel','lostpointercapture'])joystick.addEventListener(type,event=>{
  if(event.pointerId!==joystickPointer)return;
  clearPointerDirections();queuedDirection=null;
});
dialog.addEventListener('cancel',event=>{event.preventDefault();if(panel==='subjects'){if(!$('cancel-subject')?.disabled)$('cancel-subject')?.click();}else if(panel)closePanel();else if(pendingGift())dispatch({type:'collect-gift',id:pendingGift()});else if(state.phase==='explore')closeDialog();});
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
window.addEventListener('blur',()=>{held.clear();clearPointerDirections();queuedDirection=null;route=[];});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&started&&!state.paused&&state.phase!=='complete')openPanel('pause');});
$('maze-canvas').addEventListener('click',event=>{
  if(!started||dialog.open||state.phase!=='explore')return;
  const destination=renderer.cellFromPointer(event.clientX,event.clientY);
  if(destination&&isWalkable(destination.x,destination.y)){held.clear();clearPointerDirections();queuedDirection=null;const from=movement?.target||state.player;route=pathTo(from,destination)||[];if(movement?.target)route.unshift({...movement.target});}
});
function advance(ms) {
  if(!state||!started||pendingGift())return;
  if(trapEntry&&!state.paused&&!panel){trapEntry.remaining=Math.max(0,trapEntry.remaining-ms);if(trapEntry.remaining===0||reducedMotion.matches)finishTrapEntry();}
  if(answerReaction&&!state.paused&&!panel){
    answerReaction.elapsedMs=Math.min(ANSWER_REACTION_MS,answerReaction.elapsedMs+ms);
    if(answerReaction.elapsedMs>=ANSWER_REACTION_MS)answerReaction=null;
  }
  interaction=reduceInteraction(interaction,{type:'tick',dt:ms},interactionContext());
  dispatch({type:'tick',ms,moving:!!movement?.target});
  if(reducedMotion.matches&&state.phase==='capture')dispatch({type:'skip-capture'});
  greetings=advanceGreetings(greetings,{dt:ms,player:movement?.position||state.player,world:state.world,elapsedMs:state.elapsedMs,phase:state.phase,paused:state.paused||!started});
  renderGreeting();
}
window.advanceTime=ms=>{for(let remaining=Math.min(ms,60000);remaining>0;remaining-=16.667){const dt=Math.min(16.667,remaining);advanceWalking(dt);advance(dt);}renderer?.render(state,viewOptions());};
window.render_game_to_text=()=>JSON.stringify(state?{
  coordinates:'tile origin upper-left; x right/east, y down/south; directions are world axes',
  layoutId:state.layoutId,gifts:state.giftsSeen,rewards:{earned:state.giftsSeen.length,balance:rewardBalance(state),purchases:state.rewardPurchases},guidePath,pendingGift:pendingGift(),maze:MAZE,quizId:content.id,started,phase:state.phase,paused:state.paused,player:state.player,movement,greeting:visibleGreeting(),world:state.world,worldEntities:WORLD_ENTITIES.map(e=>({...e,position:worldEntityPosition(e,state.elapsedMs,state.world)})),nearbyEntity:nearbyWorldEntity(state.player,state.world,state.elapsedMs)?.id||null,hearts:state.hearts,coins:state.coins,seals:state.seals,
  progress:progress(state,content.questions),activeEncounter:state.activeEncounter,review:state.review,captureCount:state.captureCount,
  captureMs:state.captureMs,elapsedMs:state.elapsedMs,graceMs:state.graceMs,
  currentQuestion:currentQuestion(state,content.questions)?{id:currentQuestion(state,content.questions).id,options:currentQuestion(state,content.questions).options}:null,
  encounters:activeRooms().map(e=>({...e,resolved:state.resolved.includes(e.id),questions:state.assignments[e.id].length,answered:state.assignments[e.id].filter(id=>state.answers[id]).length})),exit:EXIT,clues:state.clues,treasureCollected:state.treasureCollected,notice:state.notice,
  source:content.source,contentVersion:content.version,storageAvailable,panel,trapEntry:trapEntry?{active:true,elapsedMs:trapEntryDuration-trapEntry.remaining,remainingMs:trapEntry.remaining,encounter:trapEntry.encounter}:null,view:trappedPhases.has(state.phase)&&started?'first-person-cage':'maze',interaction,answerReaction,joystick:{active:joystickPointer!==null,direction:pointerDirection}
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
  select.innerHTML=Object.entries({hebrew:'עברית',physics:'פיזיקה'}).map(([subject,label])=>`<optgroup label="${label}">${MAZE_QUIZZES.filter(quiz=>quiz.subjectId===subject).map(quiz=>`<option value="${escapeText(quiz.id)}">${label} · ${text(quiz.title)}</option>`).join('')}</optgroup>`).join('');
  select.value=content.id;
  const existing=Object.keys(state.answers).length>0||state.visited.length>1;
  select.disabled=existing;
  $('new-adventure-button').hidden=!existing;
  $('start-button').textContent=existing?'להמשיך מאותו מקום':'להיכנס למבוך ←';
  $('start-button').disabled=false;
  select.addEventListener('change',async()=>{
    select.disabled=true;$('start-button').disabled=true;$('start-button').textContent='טוענים את חומר התרגול…';
    try{content=await loadMazeContent({quizId:select.value});state=createState(content.questions);movement=createMovement(state.player);save();renderUi();$('start-button').textContent='להיכנס למבוך ←';}
    catch{$('notice').textContent='לא הצלחנו לטעון תרגול. אפשר לנסות שוב או לחזור ל־PrepX.';}
    finally{select.disabled=false;$('start-button').disabled=false;}
  });
  $('layout-name').textContent=MAZE_LAYOUTS.find(layout=>layout.id===state.layoutId).title;
  renderUi();requestAnimationFrame(frame);
}
function giftArt(index) {
  const shapes=[
    '<polygon points="20,24 50,8 80,24 94,46 50,96 6,46" fill="#f2c477"/><path d="M20 24 34 46 50 8 66 46 80 24M6 46H94M34 46 50 96 66 46" fill="none" stroke="#fff2c9" stroke-width="3"/><path d="M66 46H94L50 96Z" fill="#ac7139"/><path d="M20 24 6 46H34Z" fill="#fff0bc"/>',
    '<circle cx="50" cy="28" r="20" fill="none" stroke="#f2c477" stroke-width="12"/><path d="M50 49V94M50 72H72M50 86H65" fill="none" stroke="#f2c477" stroke-width="12" stroke-linecap="round"/>',
    '<path d="m50 5 13 30 32 4-24 23 7 33-28-17-28 17 7-33L5 39l32-4Z" fill="#f2c477" stroke="#fff0bb" stroke-width="3"/><path d="M50 5V78L29 62Z" fill="#fff0bb"/>'
  ];
  return `<svg viewBox="0 0 100 104" width="106" height="110" aria-hidden="true">${shapes[index%3]}</svg>`;
}
function renderRewards() {
  const balance=rewardBalance(state),purchases=state.rewardPurchases;
  const items=[
    {id:'lantern',name:'פנס אור משופר',description:'מאיר שטח רחב יותר סביבכם, וגם בתוך הכלוב.'},
    {id:'compass',name:'מצפן הדרך',description:'מסמן שביל זוהר למלכודת הבאה, ובסוף אל היציאה.'},
    {id:'heart',name:'לב נוסף',description:'מחזיר לב אחד שחסר. אפשר לקנות שוב כשצריך.'},
  ];
  const collection=activeRooms().map((room,index)=>{
    const earned=state.giftsSeen.includes(room.id);
    return `<li class="collection-item ${earned?'earned':'locked'}" data-gift="${room.id}"><span class="collection-art" aria-hidden="true">${giftArt(index)}</span><strong>${giftNames[index]||'גביש אור'}</strong><small>${earned?'✓ באוסף שלכם':text(room.title)}</small></li>`;
  }).join('');
  const shop=items.map(item=>{
    const owned=item.id!=='heart'&&purchases.includes(item.id);
    const reason=owned?'כבר פעיל':state.phase==='complete'?'ההרפתקה הושלמה':state.phase!=='explore'?'זמין כשתחזרו למבוך':item.id==='heart'&&state.hearts>=3?'כל הלבבות מלאים':balance<1?'חסר יהלום — השלימו מלכודת':'';
    return `<li class="reward-item"><div><h3>${item.name}</h3><p>${item.description}</p><small class="reward-reason">${reason||'מחיר: יהלום אחד'}</small></div><button class="button ${owned?'':'primary'}" data-buy-reward="${item.id}" ${reason?'disabled':''}>${owned?'✓ פעיל':'לקנות · 1 ◆'}</button></li>`;
  }).join('');
  showDialog(heading('האוצר שלכם · בהרפתקה הזו','אוסף ושדרוגים')+`<div class="reward-wallet"><strong><bdi>${balance}</bdi> ◆</strong><span>יהלומים זמינים</span><small>נאספו ${state.giftsSeen.length} · נוצלו ${purchases.length}</small></div><p class="small-note">כל מלכודת שהושלמה מעניקה מתנה ויהלום. קנייה משתמשת ביהלום; המתנה נשארת באוסף. הכול נשמר עם ההרפתקה הזו.</p><h3>המתנות שלכם · ${state.giftsSeen.length}/${activeRooms().length}</h3><ul class="gift-collection">${collection}</ul><h3>מה יעזור בדרך?</h3><ul class="reward-shop">${shop}</ul><p class="reward-status" role="status" tabindex="-1">${text(state.notice||'בחרו שדרוג שיעזור לכם להמשיך.')}</p>`+button('close-panel',state.phase==='complete'?'חזרה לחגיגה':'חזרה למבוך'));
  dialog.classList.add('rewards-sheet');
  bind('close-panel',closePanel);
  document.querySelectorAll('[data-buy-reward]').forEach(el=>el.addEventListener('click',()=>{
    const item=el.dataset.buyReward;
    dispatch({type:'buy-reward',item});
    renderer?.render(state,viewOptions());
    queueMicrotask(()=>document.querySelector('.reward-status')?.focus({preventScroll:true}));
  }));
}
function renderGift() {
  const id=pendingGift(), index=activeRooms().findIndex(room=>room.id===id);
  showDialog(heading('המלכודת הושלמה!','מתנה לדרך')+`<div class="gift-scene" aria-hidden="true"><div class="gift-rays"></div><div class="gift-gem">${giftArt(index)}</div>${Array.from({length:12},(_,i)=>`<i style="--i:${i}"></i>`).join('')}</div><h3 class="gift-name">${giftNames[index]||'גביש אור'}</h3><p class="gift-description">+1 יהלום לשדרוגים · המתנה נשארת באוסף שלכם!</p>`+button('collect-gift','לקחת ולהמשיך ←')+button('collect-and-shop','לקחת ולפתוח את האוסף',false));
  dialog.classList.add('gift-sheet');
  $('collect-gift').focus({preventScroll:true});
  bind('collect-gift',()=>{dialog.classList.remove('gift-sheet');dispatch({type:'collect-gift',id});});
  bind('collect-and-shop',()=>{dispatch({type:'collect-gift',id});openPanel('rewards');});
}
function showSubjectPicker() {
  stopAuto();held.clear();clearPointerDirections();queuedDirection=null;route=[];
  if(started&&state.phase!=='complete')dispatch({type:'pause'});
  panel='subjects';
  showDialog(heading('הרפתקה חדשה','מה מתרגלים עכשיו?')+`<label for="new-subject">נושא לתרגול</label><select id="new-subject">${Object.entries({hebrew:'עברית',physics:'פיזיקה'}).map(([subject,label])=>`<optgroup label="${label}">${MAZE_QUIZZES.filter(quiz=>quiz.subjectId===subject).map(quiz=>`<option value="${escapeText(quiz.id)}">${label} · ${text(quiz.title)}</option>`).join('')}</optgroup>`).join('')}</select><p class="small-note">ההרפתקה הנוכחית תישמר בלשונית הזו. הרפתקה חדשה מתחילה במבוך אחר.</p><p id="subject-error" role="status"></p>`+button('new-subject-start','להתחיל הרפתקה חדשה')+button('resume-subject','לחזור להרפתקה השמורה בנושא הזה',false)+button('cancel-subject','חזרה למשחק',false));
  dialog.classList.remove('gift-sheet');
  $('new-subject').value=MAZE_QUIZZES.find(quiz=>quiz.id!==content.id)?.id||content.id;
  const update=()=>{try{$('resume-subject').hidden=!sessionStorage.getItem(SESSION_KEY+'-subject-'+$('new-subject').value);}catch{$('resume-subject').hidden=true;}};
  update();$('new-subject').addEventListener('change',update);
  bind('new-subject-start',()=>switchSubject(false));bind('resume-subject',()=>switchSubject(true));
  bind('cancel-subject',()=>{panel=null;if(started){dispatch({type:'resume'});renderUi();}else closeDialog();});
  $('new-subject').focus({preventScroll:true});
}
async function switchSubject(resume) {
  const quizId=$('new-subject').value;
  document.querySelectorAll('#dialog-content button,#new-subject').forEach(el=>el.disabled=true);
  try {
    if(!storageAvailable)throw new Error('Storage unavailable');
    // Prepare all data first. Keep the current run intact if loading or archiving fails.
    let next;
    if(resume){
      const key=sessionStorage.getItem(SESSION_KEY+'-subject-'+quizId);
      next=sessionStorage.getItem(key);
      const parsed=JSON.parse(next), normalized=normalizeMazeContent(parsed.content,{pinned:true});
      if(normalized.id!==quizId||!restoreState(parsed.state,normalized.questions))throw new Error('Invalid archived run');
    }else{
      const nextContent=await loadMazeContent({quizId});
      const index=MAZE_LAYOUTS.findIndex(layout=>layout.id===state.layoutId);
      selectMazeLayout(MAZE_LAYOUTS[(index+1)%MAZE_LAYOUTS.length].id);
      next=JSON.stringify({content:nextContent,state:createState(nextContent.questions)});
    }
    selectMazeLayout(state.layoutId);
    const current=JSON.stringify({content,state}), key=SESSION_KEY+'-run-'+Date.now();
    sessionStorage.setItem(key,current);
    if(sessionStorage.getItem(key)!==current)throw new Error('Archive not verified');
    sessionStorage.setItem(SESSION_KEY+'-subject-'+content.id,key);
    switchingAdventure=true;
    sessionStorage.setItem(SESSION_KEY,next);
    location.reload();
  }catch{
    switchingAdventure=false;
    selectMazeLayout(state.layoutId);
    $('subject-error').textContent='לא הצלחנו לפתוח הרפתקה. המשחק הנוכחי נשאר כאן; אפשר לנסות שוב.';
    document.querySelectorAll('#dialog-content button,#new-subject').forEach(el=>el.disabled=false);
  }
}
$('new-adventure-button').addEventListener('click',showSubjectPicker);

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
    content=nextContent;selectMazeLayout();state=createState(content.questions);
    renderer ||= createMazeRenderer($('maze-canvas'));
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
    try{renderer=createMazeRenderer($('maze-canvas'));}catch{$('renderer-error').hidden=false;return;}
    initializeIntro();
  }catch{$('start-button').textContent='לנסות לטעון שוב';$('start-button').disabled=false;$('start-button').onclick=()=>location.reload();$('notice').textContent='חומר התרגול לא נטען. אפשר לנסות שוב בלי לאבד התקדמות.';}
}
boot();
