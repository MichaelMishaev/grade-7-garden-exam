(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();const yu=[{name:"רחבת הכניסה",x:0,z:10},{name:"שביל הספרייה",x:-10,z:1},{name:"גינת החממה",x:9,z:-5},{name:"דרך המגדל",x:10,z:13},{name:"מצפה הצפון",x:7,z:-16},{name:"שביל הגחליליות",x:-7,z:20}],Oi=[{title:"מסילת הכוכבים",story:"באמצע מופע הכיתה כבה המקרן. שלושה פנסי שמיים התפזרו ברחבי הקמפוס. חברו אותם כדי לצייר שוב כוכבים מעל בית הספר.",sites:[0,2,4],tasks:["sparks","ring","mirror"],sequence:[1,0,2]},{title:"מצעד הגחליליות",story:"הגחליליות יצאו מהאגם לפני שהפנסים נדלקו. הדליקו להן שלוש תחנות אור שיובילו את המצעד עד השער.",sites:[1,3,5],tasks:["mirror","sparks","ring"],sequence:[2,1,0]},{title:"האות מהמצפה",story:"המצפה קלט אות מקוטע. שלוש משואות בקמפוס מחזיקות חלקים ממנו. חברו את האות כדי לחשוף את קבוצת הכוכבים שממנה הגיע.",sites:[3,4,1],tasks:["ring","mirror","sparks"],sequence:[0,2,1]}],bu={sparks:"שובל הניצוצות",ring:"טבעת הרוח",mirror:"מראות הירח"},ic=["ירח ☾","שמש ☀","כוכב ✧"];function Mu(n,e=Math.random){const t=Oi.map((i,r)=>r).filter(i=>i!==n);return{edition:t[Math.floor(e()*t.length)],steps:[0,0,0]}}function Ot(n,e){const t=Oi[n.edition],i=t.tasks[e];return{...yu[t.sites[e]],task:i,title:bu[i],index:e}}function Mi(n,e){const t=Ot(n,e).task;return n.steps[e]==={sparks:7,ring:1,mirror:3}[t]}function Su(n){return!!n&&Number.isInteger(n.edition)&&!!Oi[n.edition]&&Array.isArray(n.steps)&&n.steps.length===3&&n.steps.every((e,t)=>Number.isInteger(e)&&e>=0&&e<={sparks:7,ring:1,mirror:3}[Ot(n,t).task])}function Ns(n){return[[-2,2],[2,1],[0,-2.5]].map(([e,t],i)=>({x:n.x+e,z:n.z+t,bit:i}))}function Eu(n,e,t,i){if(!e.length)return null;const r=e.includes(t)?t:e.sort((l,u)=>{const d=f=>{const p=Ot(n,f);return Math.hypot(p.x-i.x,p.z-i.z)};return d(l)-d(u)})[0],s=Ot(n,r),a=Mi(n,r),o=!a&&s.task==="sparks"&&Ns(s).find(l=>!(n.steps[r]&1<<l.bit)),c=a?"האור מוכן. הפעילו את הפנס וענו על שאלות התרגול.":{sparks:"אספו שלושה ניצוצות בשטח, בכל סדר.",ring:"קפצו לתוך הטבעת, או הפעילו את המתג בבסיס שלה.",mirror:"כוונו שלוש מראות לפי סדר הסמלים שעל הלוח."}[s.task];return{...s,...o||{},id:"relay-"+r+"-"+n.steps[r],title:s.title+" · "+s.name,hint:c,action:"אל הפנס"}}function Tu(n=globalThis.crypto){if(typeof n.randomUUID=="function")return n.randomUUID();const e=n.getRandomValues(new Uint8Array(16));e[6]=e[6]&15|64,e[8]=e[8]&63|128;const t=[...e].map(i=>i.toString(16).padStart(2,"0")).join("");return`${t.slice(0,8)}-${t.slice(8,12)}-${t.slice(12,16)}-${t.slice(16,20)}-${t.slice(20)}`}const Mn=[{id:"bench",name:"הספסל ליד האגם",x:-6,z:10,range:3,kind:"rest",description:"פסק זמן קטן. הספסל לא ישאל מה הספקתם היום.",action:"לשבת לרגע"},{id:"door",name:"דלת המבואה",x:-2,z:-15.5,range:2.8,kind:"toggle",description:"הדלת הידנית של המבואה עדיין עובדת. בפנים: מקום שקט ולוח הפרויקט.",action:"לפתוח את הדלת"},{id:"lamp",name:"פנס הרחבה",x:-2,z:10,range:2.4,kind:"toggle",description:"מפסק מקומי. לפחות דבר אחד כאן לא דורש סיסמה.",action:"לכבות את הפנס"},{id:"basketball",name:"עמדת הקליעה",x:12,z:22,range:2.8,kind:"play",description:"הכדור נמצא על הקו. זריקה רגועה, בלי שעון ובלי טבלת דירוג.",action:"לזרוק לסל"},{id:"locker",name:"ארונית צוות איינשטיין",x:-10,z:-13,range:2.5,kind:"inspect",description:"על הדלת: ״ציוד משותף. רעיונות פחות״. בפנים נשאר פתק מסבב העבודה האחרון.",action:"לפתוח את הארונית"},{id:"noticeboard",name:"לוח ההאקתון",x:-4,z:5,range:2.4,kind:"clue",description:"רשימת סוף יום: כרטיס הגישה עבר מערבה מהספרייה; הגיבוי הונח ממזרח למעבדה; האנטנה נשארה בדרום־מערב. אף אחד לא סימן ״החזרתי״.",action:"לתעד את הרמז ביומן"},{id:"telescope",name:"עמדת תצפית לאגם",x:-8,z:16.7,range:2.5,kind:"observe",description:"עדשה מכוונת לאגם. אפשר להתקרב למראה בלי לרדוף אחרי בעלי החיים.",action:"להביט דרך העדשה"},{id:"water",name:"קערת המים",x:-8.5,z:8,range:2.5,kind:"care",description:"קערה נקייה בפינת הטבע. ממלאים מים ונותנים לבעלי החיים לבחור אם להתקרב.",action:"למלא מים"},{id:"planter",name:"ערוגת המעבדה",x:23,z:-6,range:2.5,kind:"care",description:"פרויקט השקיה שעובד גם בלי Wi-Fi. העלים קצת שמוטים; המשפך עדיין כאן.",action:"להשקות את הערוגה"},{id:"recycling",name:"פינת המחזור",x:5,z:10,range:2.5,kind:"help",description:"שלוש פחיות נשארו אחרי ההאקתון. ״מישהו יאסוף״ עדיין לא הגיע.",action:"לאסוף את הפחיות למחזור"},{id:"solar",name:"לוח תאורת השביל",x:19,z:8,range:2.6,kind:"puzzle",description:"שלושה מתגים, שלושה סימונים. הדליקו רק ירח ועץ כדי להאיר את פינת הטבע. אין קנס ואין לחץ זמן.",action:"לכוון את המתגים"},{id:"bike",name:"עמדת האופניים",x:-21,z:-8.5,range:2.5,kind:"play",description:"הפעמון תקוע בזווית. מיישרים, בודקים צלצול ומקווים שהשומר לא יחשוב שכבר בוקר.",action:"לבדוק את הפעמון"}];function Xr(n={}){const e=n&&typeof n=="object"&&!Array.isArray(n)?n:{},t=r=>Number.isSafeInteger(e[r])?Math.max(0,Math.min(9999,e[r])):0,i=r=>Array.isArray(r)?[...new Set(r.filter(s=>Mn.some(a=>a.id===s)))]:[];return{checkedEquipment:Array.isArray(e.checkedEquipment)?[...new Set(e.checkedEquipment.filter(r=>["card","fuse","antenna"].includes(r)))]:[],visited:i(e.visited),doorOpen:e.doorOpen===!0,lampOn:e.lampOn!==!1,lockerOpen:e.lockerOpen===!0,waterFilled:e.waterFilled===!0,watered:e.watered===!0,recycled:e.recycled===!0,switches:[0,1,2].map(r=>Array.isArray(e.switches)&&e.switches[r]===!0),shots:t("shots"),observations:t("observations"),bells:t("bells"),helped:Array.isArray(e.helped)?[...new Set(e.helped.filter(r=>["owl","pigeon","raccoon"].includes(r)))]:[],animalNotes:Array.isArray(e.animalNotes)?[...new Set(e.animalNotes.filter(r=>Number.isInteger(r)&&r>=0&&r<19))]:[],following:Number.isInteger(e.following)&&e.following>=0&&e.following<16?e.following:null,seated:e.seated===!0}}const Os=n=>n.switches[0]&&!n.switches[1]&&n.switches[2];function zs(n,e){return{bench:e.seated?"יושבים":"פנוי",door:e.doorOpen?"פתוחה":"סגורה",lamp:e.lampOn?"דולק":"כבוי",basketball:`${e.shots} קליעות`,locker:e.lockerOpen?"פתוחה":"סגורה",noticeboard:e.visited.includes("noticeboard")?"הרמז תועד":"רמז חדש",telescope:`${e.observations} תצפיות`,water:e.waterFilled?"הקערה מלאה":"הקערה ריקה",planter:e.watered?"הערוגה הושקתה":"זקוקה למים",recycling:e.recycled?"הרחבה נקייה":"3 פחיות בשטח",solar:Os(e)?"השביל מואר":"התאורה כבויה",bike:`${e.bells} צלצולים`}[n.id]}function bl(n,e){return{bench:e.seated?"לקום ולהמשיך":n.action,door:e.doorOpen?"לסגור את הדלת":n.action,lamp:e.lampOn?n.action:"להדליק את הפנס",locker:e.lockerOpen?"לסגור את הארונית":n.action,water:e.waterFilled?"לצפות ליד קערת המים":n.action,planter:e.watered?"לבדוק את העלים":n.action,recycling:e.recycled?"לבדוק את הפינה הנקייה":n.action,noticeboard:e.visited.includes("noticeboard")?"לקרוא שוב את הרמז":n.action}[n.id]||n.action}const Ze=[{id:"owl",name:"נועה",role:"צוות התוכנה · הספרייה",system:"מסוף הגישה",color:"#91b6c5",x:-13,z:-9,line:"המסוף נתקע וכולם שולחים לי הוראות שונות. אני צריכה לבדוק מה באמת קרה, לא עוד עשר השערות. אפשר לעבור איתי על הדברים אחד־אחד?",choices:["נקשיב למה שכבר בדקה ונבחר יחד צעד אחד","ננסה לשנות הכול בבת אחת","נחליט שהיא לא מבינה ונתפוס פיקוד"],need:0,reply:"מעולה. סוף סוף מישהו שלא מציע לכבות ולהדליק את כל בית הספר.",wrong:"נועה מצביעה על רשימת הבדיקות. היא מבקשת שיתוף פעולה וסדר, לא עוד רעש."},{id:"pigeon",name:"איתי",role:"צוות הרובוטיקה · החממה",system:"מערכת הגיבוי",color:"#b5bd9d",x:13,z:-7,line:"אני מחזיק את בקר הגיבוי כבר רבע שעה, ואף אחד לא שאל אם אני צריך עזרה. לא, הכול בסדר. ברור. רק קצת נגמרות לי הידיים.",choices:["נשאל מה אפשר לקחת ממנו ונתחלק במשימה","נגיד לו להפסיק להתלונן","נתחיל להסביר לו איך לעבוד מהר יותר"],need:0,reply:"קחו את החלק של למצוא ציוד. אני אקח את החלק של לא להפיל את הפרויקט של כל הכיתה.",wrong:"הוא מסתכל על הציוד שבידיים שלו. הבעיה היא עומס, לא חוסר ידע."},{id:"raccoon",name:"אדם",role:"צוות התקשורת · מגדל הקשר",system:"ערוץ הקשר",color:"#c6aa83",x:10,z:14,line:"שמעתם את הרעש מהיער? אני יודע שזאת כנראה חיה. עדיין, מעדיף לא לעבור שם לבד. לא צריך להכריז על זה בקבוצת הכיתה.",choices:["נציע להתקדם יחד ולשמור את זה בינינו","נצלם אותו כדי להצחיק את הקבוצה","נגיד שאין שום סיבה להרגיש ככה"],need:0,reply:"תודה. מסתבר שעבודת צוות היא גם לצאת מהמצגת וללכת ביחד.",wrong:"אדם ביקש חברה ודיסקרטיות. אפשר לעזור בלי לבטל את מה שהוא מרגיש."}],Ht=[{id:"card",name:"כרטיס צוות איינשטיין",short:"כרטיס גישה",x:-21,z:-3,npc:0,hint:"על שולחן העבודה שממערב לספרייה, ליד השביל לאגם.",clue:"על הכרטיס כתוב: צוות איינשטיין — כיתת הייטק. בגב הכרטיס רשומה הערה: נוהל היציאה דורש אימות של שלושת מסופי הפרויקט.",report:"כרטיס הגישה נמצא. המסוף בספרייה יכול להתחבר עכשיו למערכת התרגול."},{id:"fuse",name:"יחידת גיבוי לפרויקט",short:"יחידת גיבוי",x:21,z:3,npc:1,hint:"בארגז הציוד שממזרח לחממה. חפשו את הסימון הצהוב.",clue:"זו יחידת גיבוי לימודית של הרובוטיקה. על המדבקה: מי שלוקח — מחזיר. מתחת, מישהו הוסיף: כן, גם אם זה עובד.",report:"יחידת הגיבוי נמצאה. איתי יוכל להפעיל את התחנה אחרי בדיקת התרגול."},{id:"antenna",name:"אנטנת תחנת הקשר",short:"אנטנה",x:-8,z:22,npc:2,hint:"ליד עמדת הקשר הישנה, בדרום־מערב המתחם.",clue:"מחברת פתוחה ליד האנטנה: צוות התקשורת, ז׳ איינשטיין. כששלוש התחנות פעילות, השער חוזר למצב יציאה. ברקע נשמע רעש — הפעם באמת ברווז.",report:"האנטנה נמצאה. חוזרים לאדם במגדל ומשלימים את בדיקת הקשר."}],hr={x:0,z:-25},Ua=(n,e=Math.random)=>{const t=[...n];for(let i=t.length-1;i>0;i--){const r=Math.floor(e()*(i+1));[t[i],t[r]]=[t[r],t[i]]}return t};function Ml(n){return!!n&&typeof n.id=="string"&&typeof n.title=="string"&&Array.isArray(n.references)&&Array.isArray(n.questions)&&n.questions.length>0&&n.questions.length<=30&&new Set(n.questions.map(e=>e.id)).size===n.questions.length&&n.questions.every(e=>{var t;return typeof e.id=="string"&&typeof e.prompt=="string"&&e.type==="mcq"&&Array.isArray(e.choices)&&e.choices.length>=2&&e.choices.every(i=>typeof i=="string")&&Number.isInteger(e.correct)&&e.correct>=0&&e.correct<e.choices.length&&typeof((t=e.explanation)==null?void 0:t.he)=="string"&&n.references.some(i=>{var r,s;return i.id===((r=e.ref)==null?void 0:r.id)&&(!e.ref.part||((s=i.parts)==null?void 0:s.some(a=>a.part===e.ref.part)))})})}function Au(n,e=Math.random){if(!Ml(n))throw new Error("Invalid quiz");const t=Ua(n.questions,e).map(i=>({...i,options:Ua(i.choices.map((r,s)=>({text:r,original:s})),e)}));return{quizId:n.id,questions:t,assignments:Ze.map((i,r)=>t.filter((s,a)=>a%3===r).map(s=>s.id)),environment:Xr(),answers:{},understood:[],seals:[],items:[],collected:[],elapsed:0,player:{x:0,z:9},startedAt:Date.now(),attemptId:Tu()}}function wu(n,e,t){if(Object.hasOwn(n.answers,e))return null;const i=n.questions.find(s=>s.id===e);if(!i||!Number.isInteger(t)||t<0||t>=i.choices.length)return null;const r={choice:t,correct:t===i.correct};return n.answers[e]=r,r}function yn(n,e){const t=n.assignments[e];return{answered:t.filter(i=>Object.hasOwn(n.answers,i)).length,total:t.length,next:t.find(i=>!Object.hasOwn(n.answers,i))}}function Sl(n){const e={easy:1,medium:1.5,hard:2},t=n.questions.reduce((i,r)=>i+(e[r.difficulty]||1.5),0);return Math.round(n.questions.reduce((i,r)=>{var s;return i+((s=n.answers[r.id])!=null&&s.correct?e[r.difficulty]||1.5:0)},0)/t*100)}const Ru=n=>n>=90?3:n>=75?2:n>=50?1:0;function ti(n){return n.seals.length===3&&Object.keys(n.answers).length===n.questions.length}function El(n,e){try{const t=JSON.parse(n);if(!t||t.quizId!==e.id||typeof t.attemptId!="string"||!Number.isFinite(t.startedAt)||!Number.isFinite(t.elapsed)||t.elapsed<0||!Array.isArray(t.questions)||t.questions.length!==e.questions.length||!t.player||!Number.isFinite(t.player.x)||!Number.isFinite(t.player.z)||Math.abs(t.player.x)>27||Math.abs(t.player.z)>27||t.participantName!==void 0&&(typeof t.participantName!="string"||!t.participantName.trim()||t.participantName.length>60))return null;const i=new Set;for(const r of t.questions){const s=e.questions.find(a=>a.id===r.id);if(!s||i.has(r.id)||JSON.stringify({...r,options:void 0})!==JSON.stringify(s)||(i.add(r.id),!Array.isArray(r.options)||r.options.length!==s.choices.length||new Set(r.options.map(a=>a.original)).size!==r.options.length||r.options.some(a=>s.choices[a.original]!==a.text)))return null}if(!t.answers||typeof t.answers!="object")return null;for(const[r,s]of Object.entries(t.answers)){const a=e.questions.find(o=>o.id===r);if(!a||!Number.isInteger(s.choice)||s.choice<0||s.choice>=a.choices.length||s.correct!==(s.choice===a.correct))return null}return t.assignments=Ze.map((r,s)=>t.questions.filter((a,o)=>o%3===s).map(a=>a.id)),!Array.isArray(t.understood)||t.understood.some(r=>!Ze.some(s=>s.id===r))||(t.items=Array.isArray(t.items)?[...new Set(t.items.filter(r=>Ht.some(s=>s.id===r)))]:[],t.relay&&!Su(t.relay))?null:(t.seals=Ze.filter((r,s)=>(t.relay?Mi(t.relay,s):t.understood.includes(r.id)&&t.items.includes(Ht[s].id))&&yn(t,s).answered===yn(t,s).total).map(r=>r.id),t.collected=Array.isArray(t.collected)?[...new Set(t.collected.filter(r=>Number.isInteger(r)&&r>=0&&r<12))]:[],t.environment=Xr(t.environment),t)}catch{return null}}function Si(n,e,t=n.player){if(ti(n))return{id:"exit",kind:"exit",...hr,title:"השער פתוח — יוצאים הביתה",hint:"לכו בעקבות השביל המואר ולחצו על כפתור היציאה ליד השער.",action:"לשער היציאה"};const i=Ze.map((u,d)=>d).filter(u=>!n.seals.includes(Ze[u].id));if(n.relay)return Eu(n.relay,i,e,t);const r=i.filter(u=>n.understood.includes(Ze[u].id)||n.items.includes(Ht[u].id)),s=r.length?r:i,a=i.includes(e)?e:s.sort((u,d)=>Math.hypot(t.x-Ze[u].x,t.z-Ze[u].z)-Math.hypot(t.x-Ze[d].x,t.z-Ze[d].z))[0],o=Ze[a],c=Ht[a];if(!n.understood.includes(o.id))return{id:o.id+":meet",kind:"npc",index:a,x:o.x,z:o.z,title:`דברו עם ${o.name}`,hint:`${["ליד הספרייה","ליד החממה","ליד מגדל הקשר"][a]} — התקרבו ולחצו על שיחה. ${o.name} מחכה לכם.`,action:`אל ${o.name}`};if(!n.items.includes(c.id))return{id:c.id+":find",kind:"equipment",index:a,x:c.x,z:c.z,title:`מצאו ובדקו ${c.short}`,hint:c.hint,action:"לציוד החסר"};const l=yn(n,a);return{id:o.id+":return",kind:"npc",index:a,x:o.x,z:o.z,title:`החזירו את הציוד ל${o.name}`,hint:`הציוד איתכם. חזרו לתחנה והשלימו ${l.total-l.answered} שאלות כדי להפעיל את ${o.system}.`,action:`חזרה ל${o.name}`}}const lr=[{id:"water",title:"עזרה בפינת הטבע",hint:"מלאו את קערת המים ותנו לארנב להתקרב.",done:n=>n.waterFilled},{id:"locker",title:"הפתק שנשאר מאחור",hint:"פתחו את ארונית הצוות כדי לחשוף רמז לאנטנה.",done:n=>n.visited.includes("locker")},{id:"solar",title:"להחזיר אור לשביל",hint:"כוונו את מתגי התאורה לפי הסימונים שעל המכסה.",done:n=>Os(n)},{id:"basketball",title:"שלוש זריקות להפסקה",hint:"קלעו שלוש פעמים. אפילו השומר צריך הפסקה.",done:n=>n.shots>=3},{id:"telescope",title:"מי מסתובב באגם?",hint:"השתמשו בעמדת התצפית וגלו מי ממשיך בסיור.",done:n=>n.observations>0}],Tl={card:{title:"שחזור קוד הגישה",hint:"על הסורק חרוט הסדר: משולש ← ריבוע ← עיגול. לחצו על הסמלים באותו סדר.",options:["משולש △","ריבוע □","עיגול ○"],sequence:[0,1,2]},fuse:{title:"בדיקת יחידת ההדגמה",hint:"לפי המדבקה: מחברים את הכבל, מפעילים בדיקה, ואז נועלים את המכסה.",options:["בדיקה ◇","נעילת מכסה ▣","חיבור כבל ↔"],sequence:[2,0,1]},antenna:{title:"כיוון האות",hint:"במחברת מסומן ערוץ 5. כוונו את החוגה עד שהאות יציב, ואז אשרו."}};function Cu(n,e,t){var i,r;return((r=(i=Tl[n])==null?void 0:i.sequence)==null?void 0:r[e])===t}var Pu=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function Lu(n){if(Object.prototype.hasOwnProperty.call(n,"__esModule"))return n;var e=n.default;if(typeof e=="function"){var t=function i(){return this instanceof i?Reflect.construct(e,arguments,this.constructor):e.apply(this,arguments)};t.prototype=e.prototype}else t={};return Object.defineProperty(t,"__esModule",{value:!0}),Object.keys(n).forEach(function(i){var r=Object.getOwnPropertyDescriptor(n,i);Object.defineProperty(t,i,r.get?r:{enumerable:!0,get:function(){return n[i]}})}),t}var Ks={exports:{}};const Du={},Iu=Object.freeze(Object.defineProperty({__proto__:null,default:Du},Symbol.toStringTag,{value:"Module"})),rc=Lu(Iu);/**
 * [js-sha256]{@link https://github.com/emn178/js-sha256}
 *
 * @version 0.11.1
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2014-2025
 * @license MIT
 */var sc;function Uu(){return sc||(sc=1,(function(n){(function(){var e="input is invalid type",t=typeof window=="object",i=t?window:{};i.JS_SHA256_NO_WINDOW&&(t=!1);var r=!t&&typeof self=="object",s=!i.JS_SHA256_NO_NODE_JS&&typeof process=="object"&&process.versions&&process.versions.node&&process.type!="renderer";s?i=Pu:r&&(i=self);var a=!i.JS_SHA256_NO_COMMON_JS&&!0&&n.exports,o=!i.JS_SHA256_NO_ARRAY_BUFFER&&typeof ArrayBuffer<"u",c="0123456789abcdef".split(""),l=[-2147483648,8388608,32768,128],u=[24,16,8,0],d=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298],f=["hex","array","digest","arrayBuffer"],p=[];(i.JS_SHA256_NO_NODE_JS||!Array.isArray)&&(Array.isArray=function(g){return Object.prototype.toString.call(g)==="[object Array]"}),o&&(i.JS_SHA256_NO_ARRAY_BUFFER_IS_VIEW||!ArrayBuffer.isView)&&(ArrayBuffer.isView=function(g){return typeof g=="object"&&g.buffer&&g.buffer.constructor===ArrayBuffer});var v=function(g,R){return function(P){return new A(R,!0).update(P)[g]()}},b=function(g){var R=v("hex",g);s&&(R=m(R,g)),R.create=function(){return new A(g)},R.update=function(_){return R.create().update(_)};for(var P=0;P<f.length;++P){var x=f[P];R[x]=v(x,g)}return R},m=function(g,R){var P=rc,x=rc.Buffer,_=R?"sha224":"sha256",C;x.from&&!i.JS_SHA256_NO_BUFFER_FROM?C=x.from:C=function(I){return new x(I)};var N=function(I){if(typeof I=="string")return P.createHash(_).update(I,"utf8").digest("hex");if(I==null)throw new Error(e);return I.constructor===ArrayBuffer&&(I=new Uint8Array(I)),Array.isArray(I)||ArrayBuffer.isView(I)||I.constructor===x?P.createHash(_).update(C(I)).digest("hex"):g(I)};return N},h=function(g,R){return function(P,x){return new E(P,R,!0).update(x)[g]()}},w=function(g){var R=h("hex",g);R.create=function(_){return new E(_,g)},R.update=function(_,C){return R.create(_).update(C)};for(var P=0;P<f.length;++P){var x=f[P];R[x]=h(x,g)}return R};function A(g,R){R?(p[0]=p[16]=p[1]=p[2]=p[3]=p[4]=p[5]=p[6]=p[7]=p[8]=p[9]=p[10]=p[11]=p[12]=p[13]=p[14]=p[15]=0,this.blocks=p):this.blocks=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],g?(this.h0=3238371032,this.h1=914150663,this.h2=812702999,this.h3=4144912697,this.h4=4290775857,this.h5=1750603025,this.h6=1694076839,this.h7=3204075428):(this.h0=1779033703,this.h1=3144134277,this.h2=1013904242,this.h3=2773480762,this.h4=1359893119,this.h5=2600822924,this.h6=528734635,this.h7=1541459225),this.block=this.start=this.bytes=this.hBytes=0,this.finalized=this.hashed=!1,this.first=!0,this.is224=g}A.prototype.update=function(g){if(!this.finalized){var R,P=typeof g;if(P!=="string"){if(P==="object"){if(g===null)throw new Error(e);if(o&&g.constructor===ArrayBuffer)g=new Uint8Array(g);else if(!Array.isArray(g)&&(!o||!ArrayBuffer.isView(g)))throw new Error(e)}else throw new Error(e);R=!0}for(var x,_=0,C,N=g.length,I=this.blocks;_<N;){if(this.hashed&&(this.hashed=!1,I[0]=this.block,this.block=I[16]=I[1]=I[2]=I[3]=I[4]=I[5]=I[6]=I[7]=I[8]=I[9]=I[10]=I[11]=I[12]=I[13]=I[14]=I[15]=0),R)for(C=this.start;_<N&&C<64;++_)I[C>>>2]|=g[_]<<u[C++&3];else for(C=this.start;_<N&&C<64;++_)x=g.charCodeAt(_),x<128?I[C>>>2]|=x<<u[C++&3]:x<2048?(I[C>>>2]|=(192|x>>>6)<<u[C++&3],I[C>>>2]|=(128|x&63)<<u[C++&3]):x<55296||x>=57344?(I[C>>>2]|=(224|x>>>12)<<u[C++&3],I[C>>>2]|=(128|x>>>6&63)<<u[C++&3],I[C>>>2]|=(128|x&63)<<u[C++&3]):(x=65536+((x&1023)<<10|g.charCodeAt(++_)&1023),I[C>>>2]|=(240|x>>>18)<<u[C++&3],I[C>>>2]|=(128|x>>>12&63)<<u[C++&3],I[C>>>2]|=(128|x>>>6&63)<<u[C++&3],I[C>>>2]|=(128|x&63)<<u[C++&3]);this.lastByteIndex=C,this.bytes+=C-this.start,C>=64?(this.block=I[16],this.start=C-64,this.hash(),this.hashed=!0):this.start=C}return this.bytes>4294967295&&(this.hBytes+=this.bytes/4294967296<<0,this.bytes=this.bytes%4294967296),this}},A.prototype.finalize=function(){if(!this.finalized){this.finalized=!0;var g=this.blocks,R=this.lastByteIndex;g[16]=this.block,g[R>>>2]|=l[R&3],this.block=g[16],R>=56&&(this.hashed||this.hash(),g[0]=this.block,g[16]=g[1]=g[2]=g[3]=g[4]=g[5]=g[6]=g[7]=g[8]=g[9]=g[10]=g[11]=g[12]=g[13]=g[14]=g[15]=0),g[14]=this.hBytes<<3|this.bytes>>>29,g[15]=this.bytes<<3,this.hash()}},A.prototype.hash=function(){var g=this.h0,R=this.h1,P=this.h2,x=this.h3,_=this.h4,C=this.h5,N=this.h6,I=this.h7,H=this.blocks,X,Z,re,K,ne,Q,fe,we,Oe,We,ct;for(X=16;X<64;++X)ne=H[X-15],Z=(ne>>>7|ne<<25)^(ne>>>18|ne<<14)^ne>>>3,ne=H[X-2],re=(ne>>>17|ne<<15)^(ne>>>19|ne<<13)^ne>>>10,H[X]=H[X-16]+Z+H[X-7]+re<<0;for(ct=R&P,X=0;X<64;X+=4)this.first?(this.is224?(we=300032,ne=H[0]-1413257819,I=ne-150054599<<0,x=ne+24177077<<0):(we=704751109,ne=H[0]-210244248,I=ne-1521486534<<0,x=ne+143694565<<0),this.first=!1):(Z=(g>>>2|g<<30)^(g>>>13|g<<19)^(g>>>22|g<<10),re=(_>>>6|_<<26)^(_>>>11|_<<21)^(_>>>25|_<<7),we=g&R,K=we^g&P^ct,fe=_&C^~_&N,ne=I+re+fe+d[X]+H[X],Q=Z+K,I=x+ne<<0,x=ne+Q<<0),Z=(x>>>2|x<<30)^(x>>>13|x<<19)^(x>>>22|x<<10),re=(I>>>6|I<<26)^(I>>>11|I<<21)^(I>>>25|I<<7),Oe=x&g,K=Oe^x&R^we,fe=I&_^~I&C,ne=N+re+fe+d[X+1]+H[X+1],Q=Z+K,N=P+ne<<0,P=ne+Q<<0,Z=(P>>>2|P<<30)^(P>>>13|P<<19)^(P>>>22|P<<10),re=(N>>>6|N<<26)^(N>>>11|N<<21)^(N>>>25|N<<7),We=P&x,K=We^P&g^Oe,fe=N&I^~N&_,ne=C+re+fe+d[X+2]+H[X+2],Q=Z+K,C=R+ne<<0,R=ne+Q<<0,Z=(R>>>2|R<<30)^(R>>>13|R<<19)^(R>>>22|R<<10),re=(C>>>6|C<<26)^(C>>>11|C<<21)^(C>>>25|C<<7),ct=R&P,K=ct^R&x^We,fe=C&N^~C&I,ne=_+re+fe+d[X+3]+H[X+3],Q=Z+K,_=g+ne<<0,g=ne+Q<<0,this.chromeBugWorkAround=!0;this.h0=this.h0+g<<0,this.h1=this.h1+R<<0,this.h2=this.h2+P<<0,this.h3=this.h3+x<<0,this.h4=this.h4+_<<0,this.h5=this.h5+C<<0,this.h6=this.h6+N<<0,this.h7=this.h7+I<<0},A.prototype.hex=function(){this.finalize();var g=this.h0,R=this.h1,P=this.h2,x=this.h3,_=this.h4,C=this.h5,N=this.h6,I=this.h7,H=c[g>>>28&15]+c[g>>>24&15]+c[g>>>20&15]+c[g>>>16&15]+c[g>>>12&15]+c[g>>>8&15]+c[g>>>4&15]+c[g&15]+c[R>>>28&15]+c[R>>>24&15]+c[R>>>20&15]+c[R>>>16&15]+c[R>>>12&15]+c[R>>>8&15]+c[R>>>4&15]+c[R&15]+c[P>>>28&15]+c[P>>>24&15]+c[P>>>20&15]+c[P>>>16&15]+c[P>>>12&15]+c[P>>>8&15]+c[P>>>4&15]+c[P&15]+c[x>>>28&15]+c[x>>>24&15]+c[x>>>20&15]+c[x>>>16&15]+c[x>>>12&15]+c[x>>>8&15]+c[x>>>4&15]+c[x&15]+c[_>>>28&15]+c[_>>>24&15]+c[_>>>20&15]+c[_>>>16&15]+c[_>>>12&15]+c[_>>>8&15]+c[_>>>4&15]+c[_&15]+c[C>>>28&15]+c[C>>>24&15]+c[C>>>20&15]+c[C>>>16&15]+c[C>>>12&15]+c[C>>>8&15]+c[C>>>4&15]+c[C&15]+c[N>>>28&15]+c[N>>>24&15]+c[N>>>20&15]+c[N>>>16&15]+c[N>>>12&15]+c[N>>>8&15]+c[N>>>4&15]+c[N&15];return this.is224||(H+=c[I>>>28&15]+c[I>>>24&15]+c[I>>>20&15]+c[I>>>16&15]+c[I>>>12&15]+c[I>>>8&15]+c[I>>>4&15]+c[I&15]),H},A.prototype.toString=A.prototype.hex,A.prototype.digest=function(){this.finalize();var g=this.h0,R=this.h1,P=this.h2,x=this.h3,_=this.h4,C=this.h5,N=this.h6,I=this.h7,H=[g>>>24&255,g>>>16&255,g>>>8&255,g&255,R>>>24&255,R>>>16&255,R>>>8&255,R&255,P>>>24&255,P>>>16&255,P>>>8&255,P&255,x>>>24&255,x>>>16&255,x>>>8&255,x&255,_>>>24&255,_>>>16&255,_>>>8&255,_&255,C>>>24&255,C>>>16&255,C>>>8&255,C&255,N>>>24&255,N>>>16&255,N>>>8&255,N&255];return this.is224||H.push(I>>>24&255,I>>>16&255,I>>>8&255,I&255),H},A.prototype.array=A.prototype.digest,A.prototype.arrayBuffer=function(){this.finalize();var g=new ArrayBuffer(this.is224?28:32),R=new DataView(g);return R.setUint32(0,this.h0),R.setUint32(4,this.h1),R.setUint32(8,this.h2),R.setUint32(12,this.h3),R.setUint32(16,this.h4),R.setUint32(20,this.h5),R.setUint32(24,this.h6),this.is224||R.setUint32(28,this.h7),g};function E(g,R,P){var x,_=typeof g;if(_==="string"){var C=[],N=g.length,I=0,H;for(x=0;x<N;++x)H=g.charCodeAt(x),H<128?C[I++]=H:H<2048?(C[I++]=192|H>>>6,C[I++]=128|H&63):H<55296||H>=57344?(C[I++]=224|H>>>12,C[I++]=128|H>>>6&63,C[I++]=128|H&63):(H=65536+((H&1023)<<10|g.charCodeAt(++x)&1023),C[I++]=240|H>>>18,C[I++]=128|H>>>12&63,C[I++]=128|H>>>6&63,C[I++]=128|H&63);g=C}else if(_==="object"){if(g===null)throw new Error(e);if(o&&g.constructor===ArrayBuffer)g=new Uint8Array(g);else if(!Array.isArray(g)&&(!o||!ArrayBuffer.isView(g)))throw new Error(e)}else throw new Error(e);g.length>64&&(g=new A(R,!0).update(g).array());var X=[],Z=[];for(x=0;x<64;++x){var re=g[x]||0;X[x]=92^re,Z[x]=54^re}A.call(this,R,P),this.update(Z),this.oKeyPad=X,this.inner=!0,this.sharedMemory=P}E.prototype=new A,E.prototype.finalize=function(){if(A.prototype.finalize.call(this),this.inner){this.inner=!1;var g=this.array();A.call(this,this.is224,this.sharedMemory),this.update(this.oKeyPad),this.update(g),A.prototype.finalize.call(this)}};var M=b();M.sha256=M,M.sha224=b(!0),M.sha256.hmac=w(),M.sha224.hmac=w(!0),a?n.exports=M:(i.sha256=M.sha256,i.sha224=M.sha224)})()})(Ks)),Ks.exports}var Fu=Uu();function Nu(n){return Fu.sha256(JSON.stringify(n.questions.map(({id:e,prompt:t,choices:i,correct:r,difficulty:s})=>({id:e,prompt:t,choices:i,correct:r,difficulty:s??null}))))}/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Lo="181",Ou=0,ac=1,zu=2,Al=1,wl=2,Kn=3,Ei=0,ln=1,Pn=2,ni=0,ur=1,oc=2,cc=3,lc=4,Bu=5,Di=100,ku=101,Vu=102,Gu=103,Hu=104,Wu=200,Xu=201,qu=202,$u=203,Fa=204,Na=205,Yu=206,ju=207,Ku=208,Zu=209,Ju=210,Qu=211,ed=212,td=213,nd=214,Oa=0,za=1,Ba=2,fr=3,ka=4,Va=5,Ga=6,Ha=7,Rl=0,id=1,rd=2,yi=0,sd=1,ad=2,od=3,Cl=4,cd=5,ld=6,ud=7,Pl=300,pr=301,mr=302,Wa=303,Xa=304,Bs=306,ws=1e3,ei=1001,qa=1002,mn=1003,dd=1004,jr=1005,bn=1006,Zs=1007,Ui=1008,Gn=1009,Ll=1010,Dl=1011,Nr=1012,Do=1013,zi=1014,kn=1015,vr=1016,Io=1017,Uo=1018,Or=1020,Il=35902,Ul=35899,Fl=1021,Nl=1022,Dn=1023,zr=1026,Br=1027,Fo=1028,No=1029,Oo=1030,zo=1031,Bo=1033,ys=33776,bs=33777,Ms=33778,Ss=33779,$a=35840,Ya=35841,ja=35842,Ka=35843,Za=36196,Ja=37492,Qa=37496,eo=37808,to=37809,no=37810,io=37811,ro=37812,so=37813,ao=37814,oo=37815,co=37816,lo=37817,uo=37818,ho=37819,fo=37820,po=37821,mo=36492,xo=36494,go=36495,_o=36283,vo=36284,yo=36285,bo=36286,hd=3200,fd=3201,Ol=0,pd=1,gi="",tn="srgb",xr="srgb-linear",Rs="linear",_t="srgb",qi=7680,uc=519,md=512,xd=513,gd=514,zl=515,_d=516,vd=517,yd=518,bd=519,dc=35044,hc="300 es",Vn=2e3,Cs=2001;function Bl(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Ps(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Md(){const n=Ps("canvas");return n.style.display="block",n}const fc={};function pc(...n){const e="THREE."+n.shift();console.log(e,...n)}function Ke(...n){const e="THREE."+n.shift();console.warn(e,...n)}function Pt(...n){const e="THREE."+n.shift();console.error(e,...n)}function kr(...n){const e=n.join(" ");e in fc||(fc[e]=!0,Ke(...n))}function Sd(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}class yr{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const qt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Js=Math.PI/180,Ls=180/Math.PI;function qr(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(qt[n&255]+qt[n>>8&255]+qt[n>>16&255]+qt[n>>24&255]+"-"+qt[e&255]+qt[e>>8&255]+"-"+qt[e>>16&15|64]+qt[e>>24&255]+"-"+qt[t&63|128]+qt[t>>8&255]+"-"+qt[t>>16&255]+qt[t>>24&255]+qt[i&255]+qt[i>>8&255]+qt[i>>16&255]+qt[i>>24&255]).toLowerCase()}function ot(n,e,t){return Math.max(e,Math.min(t,n))}function Ed(n,e){return(n%e+e)%e}function Qs(n,e,t){return(1-t)*n+t*e}function Sr(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function on(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}class rt{constructor(e=0,t=0){rt.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ot(this.x,e.x,t.x),this.y=ot(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ot(this.x,e,t),this.y=ot(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(ot(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(ot(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class br{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,a,o){let c=i[r+0],l=i[r+1],u=i[r+2],d=i[r+3],f=s[a+0],p=s[a+1],v=s[a+2],b=s[a+3];if(o<=0){e[t+0]=c,e[t+1]=l,e[t+2]=u,e[t+3]=d;return}if(o>=1){e[t+0]=f,e[t+1]=p,e[t+2]=v,e[t+3]=b;return}if(d!==b||c!==f||l!==p||u!==v){let m=c*f+l*p+u*v+d*b;m<0&&(f=-f,p=-p,v=-v,b=-b,m=-m);let h=1-o;if(m<.9995){const w=Math.acos(m),A=Math.sin(w);h=Math.sin(h*w)/A,o=Math.sin(o*w)/A,c=c*h+f*o,l=l*h+p*o,u=u*h+v*o,d=d*h+b*o}else{c=c*h+f*o,l=l*h+p*o,u=u*h+v*o,d=d*h+b*o;const w=1/Math.sqrt(c*c+l*l+u*u+d*d);c*=w,l*=w,u*=w,d*=w}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,r,s,a){const o=i[r],c=i[r+1],l=i[r+2],u=i[r+3],d=s[a],f=s[a+1],p=s[a+2],v=s[a+3];return e[t]=o*v+u*d+c*p-l*f,e[t+1]=c*v+u*f+l*d-o*p,e[t+2]=l*v+u*p+o*f-c*d,e[t+3]=u*v-o*d-c*f-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(i/2),u=o(r/2),d=o(s/2),f=c(i/2),p=c(r/2),v=c(s/2);switch(a){case"XYZ":this._x=f*u*d+l*p*v,this._y=l*p*d-f*u*v,this._z=l*u*v+f*p*d,this._w=l*u*d-f*p*v;break;case"YXZ":this._x=f*u*d+l*p*v,this._y=l*p*d-f*u*v,this._z=l*u*v-f*p*d,this._w=l*u*d+f*p*v;break;case"ZXY":this._x=f*u*d-l*p*v,this._y=l*p*d+f*u*v,this._z=l*u*v+f*p*d,this._w=l*u*d-f*p*v;break;case"ZYX":this._x=f*u*d-l*p*v,this._y=l*p*d+f*u*v,this._z=l*u*v-f*p*d,this._w=l*u*d+f*p*v;break;case"YZX":this._x=f*u*d+l*p*v,this._y=l*p*d+f*u*v,this._z=l*u*v-f*p*d,this._w=l*u*d-f*p*v;break;case"XZY":this._x=f*u*d-l*p*v,this._y=l*p*d-f*u*v,this._z=l*u*v+f*p*d,this._w=l*u*d+f*p*v;break;default:Ke("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],a=t[1],o=t[5],c=t[9],l=t[2],u=t[6],d=t[10],f=i+o+d;if(f>0){const p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(u-c)*p,this._y=(s-l)*p,this._z=(a-r)*p}else if(i>o&&i>d){const p=2*Math.sqrt(1+i-o-d);this._w=(u-c)/p,this._x=.25*p,this._y=(r+a)/p,this._z=(s+l)/p}else if(o>d){const p=2*Math.sqrt(1+o-i-d);this._w=(s-l)/p,this._x=(r+a)/p,this._y=.25*p,this._z=(c+u)/p}else{const p=2*Math.sqrt(1+d-i-o);this._w=(a-r)/p,this._x=(s+l)/p,this._y=(c+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ot(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,a=e._w,o=t._x,c=t._y,l=t._z,u=t._w;return this._x=i*u+a*o+r*l-s*c,this._y=r*u+a*c+s*o-i*l,this._z=s*u+a*l+i*c-r*o,this._w=a*u-i*o-r*c-s*l,this._onChangeCallback(),this}slerp(e,t){if(t<=0)return this;if(t>=1)return this.copy(e);let i=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,r=-r,s=-s,a=-a,o=-o);let c=1-t;if(o<.9995){const l=Math.acos(o),u=Math.sin(l);c=Math.sin(c*l)/u,t=Math.sin(t*l)/u,this._x=this._x*c+i*t,this._y=this._y*c+r*t,this._z=this._z*c+s*t,this._w=this._w*c+a*t,this._onChangeCallback()}else this._x=this._x*c+i*t,this._y=this._y*c+r*t,this._z=this._z*c+s*t,this._w=this._w*c+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class B{constructor(e=0,t=0,i=0){B.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(mc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(mc.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*r-o*i),u=2*(o*t-s*r),d=2*(s*i-a*t);return this.x=t+c*l+a*d-o*u,this.y=i+c*u+o*l-s*d,this.z=r+c*d+s*u-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ot(this.x,e.x,t.x),this.y=ot(this.y,e.y,t.y),this.z=ot(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ot(this.x,e,t),this.y=ot(this.y,e,t),this.z=ot(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(ot(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,a=t.x,o=t.y,c=t.z;return this.x=r*c-s*o,this.y=s*a-i*c,this.z=i*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return ea.copy(this).projectOnVector(e),this.sub(ea)}reflect(e){return this.sub(ea.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(ot(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ea=new B,mc=new br;class Je{constructor(e,t,i,r,s,a,o,c,l){Je.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,c,l)}set(e,t,i,r,s,a,o,c,l){const u=this.elements;return u[0]=e,u[1]=r,u[2]=o,u[3]=t,u[4]=s,u[5]=c,u[6]=i,u[7]=a,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[3],c=i[6],l=i[1],u=i[4],d=i[7],f=i[2],p=i[5],v=i[8],b=r[0],m=r[3],h=r[6],w=r[1],A=r[4],E=r[7],M=r[2],g=r[5],R=r[8];return s[0]=a*b+o*w+c*M,s[3]=a*m+o*A+c*g,s[6]=a*h+o*E+c*R,s[1]=l*b+u*w+d*M,s[4]=l*m+u*A+d*g,s[7]=l*h+u*E+d*R,s[2]=f*b+p*w+v*M,s[5]=f*m+p*A+v*g,s[8]=f*h+p*E+v*R,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8];return t*a*u-t*o*l-i*s*u+i*o*c+r*s*l-r*a*c}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],d=u*a-o*l,f=o*c-u*s,p=l*s-a*c,v=t*d+i*f+r*p;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);const b=1/v;return e[0]=d*b,e[1]=(r*l-u*i)*b,e[2]=(o*i-r*a)*b,e[3]=f*b,e[4]=(u*t-r*c)*b,e[5]=(r*s-o*t)*b,e[6]=p*b,e[7]=(i*c-l*t)*b,e[8]=(a*t-i*s)*b,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,a,o){const c=Math.cos(s),l=Math.sin(s);return this.set(i*c,i*l,-i*(c*a+l*o)+a+e,-r*l,r*c,-r*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(ta.makeScale(e,t)),this}rotate(e){return this.premultiply(ta.makeRotation(-e)),this}translate(e,t){return this.premultiply(ta.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const ta=new Je,xc=new Je().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),gc=new Je().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Td(){const n={enabled:!0,workingColorSpace:xr,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===_t&&(r.r=ii(r.r),r.g=ii(r.g),r.b=ii(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===_t&&(r.r=dr(r.r),r.g=dr(r.g),r.b=dr(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===gi?Rs:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return kr("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return kr("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[xr]:{primaries:e,whitePoint:i,transfer:Rs,toXYZ:xc,fromXYZ:gc,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:tn},outputColorSpaceConfig:{drawingBufferColorSpace:tn}},[tn]:{primaries:e,whitePoint:i,transfer:_t,toXYZ:xc,fromXYZ:gc,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:tn}}}),n}const dt=Td();function ii(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function dr(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let $i;class Ad{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{$i===void 0&&($i=Ps("canvas")),$i.width=e.width,$i.height=e.height;const r=$i.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=$i}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Ps("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=ii(s[a]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(ii(t[i]/255)*255):t[i]=ii(t[i]);return{data:t,width:e.width,height:e.height}}else return Ke("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let wd=0;class ko{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:wd++}),this.uuid=qr(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(na(r[a].image)):s.push(na(r[a]))}else s=na(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function na(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Ad.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Ke("Texture: Unable to serialize Texture."),{})}let Rd=0;const ia=new B;class jt extends yr{constructor(e=jt.DEFAULT_IMAGE,t=jt.DEFAULT_MAPPING,i=ei,r=ei,s=bn,a=Ui,o=Dn,c=Gn,l=jt.DEFAULT_ANISOTROPY,u=gi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Rd++}),this.uuid=qr(),this.name="",this.source=new ko(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new rt(0,0),this.repeat=new rt(1,1),this.center=new rt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Je,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(ia).x}get height(){return this.source.getSize(ia).y}get depth(){return this.source.getSize(ia).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){Ke(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Ke(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Pl)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ws:e.x=e.x-Math.floor(e.x);break;case ei:e.x=e.x<0?0:1;break;case qa:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ws:e.y=e.y-Math.floor(e.y);break;case ei:e.y=e.y<0?0:1;break;case qa:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}jt.DEFAULT_IMAGE=null;jt.DEFAULT_MAPPING=Pl;jt.DEFAULT_ANISOTROPY=1;class vt{constructor(e=0,t=0,i=0,r=1){vt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*i+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const c=e.elements,l=c[0],u=c[4],d=c[8],f=c[1],p=c[5],v=c[9],b=c[2],m=c[6],h=c[10];if(Math.abs(u-f)<.01&&Math.abs(d-b)<.01&&Math.abs(v-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(d+b)<.1&&Math.abs(v+m)<.1&&Math.abs(l+p+h-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const A=(l+1)/2,E=(p+1)/2,M=(h+1)/2,g=(u+f)/4,R=(d+b)/4,P=(v+m)/4;return A>E&&A>M?A<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(A),r=g/i,s=R/i):E>M?E<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(E),i=g/r,s=P/r):M<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(M),i=R/s,r=P/s),this.set(i,r,s,t),this}let w=Math.sqrt((m-v)*(m-v)+(d-b)*(d-b)+(f-u)*(f-u));return Math.abs(w)<.001&&(w=1),this.x=(m-v)/w,this.y=(d-b)/w,this.z=(f-u)/w,this.w=Math.acos((l+p+h-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ot(this.x,e.x,t.x),this.y=ot(this.y,e.y,t.y),this.z=ot(this.z,e.z,t.z),this.w=ot(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ot(this.x,e,t),this.y=ot(this.y,e,t),this.z=ot(this.z,e,t),this.w=ot(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(ot(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Cd extends yr{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:bn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new vt(0,0,e,t),this.scissorTest=!1,this.viewport=new vt(0,0,e,t);const r={width:e,height:t,depth:i.depth},s=new jt(r);this.textures=[];const a=i.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){const t={minFilter:bn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new ko(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Bi extends Cd{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class kl extends jt{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=mn,this.minFilter=mn,this.wrapR=ei,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Pd extends jt{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=mn,this.minFilter=mn,this.wrapR=ei,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Vi{constructor(e=new B(1/0,1/0,1/0),t=new B(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(wn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(wn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=wn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,wn):wn.fromBufferAttribute(s,a),wn.applyMatrix4(e.matrixWorld),this.expandByPoint(wn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Kr.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Kr.copy(i.boundingBox)),Kr.applyMatrix4(e.matrixWorld),this.union(Kr)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,wn),wn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Er),Zr.subVectors(this.max,Er),Yi.subVectors(e.a,Er),ji.subVectors(e.b,Er),Ki.subVectors(e.c,Er),li.subVectors(ji,Yi),ui.subVectors(Ki,ji),Ai.subVectors(Yi,Ki);let t=[0,-li.z,li.y,0,-ui.z,ui.y,0,-Ai.z,Ai.y,li.z,0,-li.x,ui.z,0,-ui.x,Ai.z,0,-Ai.x,-li.y,li.x,0,-ui.y,ui.x,0,-Ai.y,Ai.x,0];return!ra(t,Yi,ji,Ki,Zr)||(t=[1,0,0,0,1,0,0,0,1],!ra(t,Yi,ji,Ki,Zr))?!1:(Jr.crossVectors(li,ui),t=[Jr.x,Jr.y,Jr.z],ra(t,Yi,ji,Ki,Zr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,wn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(wn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Wn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Wn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Wn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Wn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Wn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Wn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Wn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Wn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Wn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Wn=[new B,new B,new B,new B,new B,new B,new B,new B],wn=new B,Kr=new Vi,Yi=new B,ji=new B,Ki=new B,li=new B,ui=new B,Ai=new B,Er=new B,Zr=new B,Jr=new B,wi=new B;function ra(n,e,t,i,r){for(let s=0,a=n.length-3;s<=a;s+=3){wi.fromArray(n,s);const o=r.x*Math.abs(wi.x)+r.y*Math.abs(wi.y)+r.z*Math.abs(wi.z),c=e.dot(wi),l=t.dot(wi),u=i.dot(wi);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>o)return!1}return!0}const Ld=new Vi,Tr=new B,sa=new B;class Gi{constructor(e=new B,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):Ld.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Tr.subVectors(e,this.center);const t=Tr.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(Tr,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(sa.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Tr.copy(e.center).add(sa)),this.expandByPoint(Tr.copy(e.center).sub(sa))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const Xn=new B,aa=new B,Qr=new B,di=new B,oa=new B,es=new B,ca=new B;class ks{constructor(e=new B,t=new B(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Xn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Xn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Xn.copy(this.origin).addScaledVector(this.direction,t),Xn.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){aa.copy(e).add(t).multiplyScalar(.5),Qr.copy(t).sub(e).normalize(),di.copy(this.origin).sub(aa);const s=e.distanceTo(t)*.5,a=-this.direction.dot(Qr),o=di.dot(this.direction),c=-di.dot(Qr),l=di.lengthSq(),u=Math.abs(1-a*a);let d,f,p,v;if(u>0)if(d=a*c-o,f=a*o-c,v=s*u,d>=0)if(f>=-v)if(f<=v){const b=1/u;d*=b,f*=b,p=d*(d+a*f+2*o)+f*(a*d+f+2*c)+l}else f=s,d=Math.max(0,-(a*f+o)),p=-d*d+f*(f+2*c)+l;else f=-s,d=Math.max(0,-(a*f+o)),p=-d*d+f*(f+2*c)+l;else f<=-v?(d=Math.max(0,-(-a*s+o)),f=d>0?-s:Math.min(Math.max(-s,-c),s),p=-d*d+f*(f+2*c)+l):f<=v?(d=0,f=Math.min(Math.max(-s,-c),s),p=f*(f+2*c)+l):(d=Math.max(0,-(a*s+o)),f=d>0?s:Math.min(Math.max(-s,-c),s),p=-d*d+f*(f+2*c)+l);else f=a>0?-s:s,d=Math.max(0,-(a*f+o)),p=-d*d+f*(f+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(aa).addScaledVector(Qr,f),p}intersectSphere(e,t){Xn.subVectors(e.center,this.origin);const i=Xn.dot(this.direction),r=Xn.dot(Xn)-i*i,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,c=i+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,a,o,c;const l=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,f=this.origin;return l>=0?(i=(e.min.x-f.x)*l,r=(e.max.x-f.x)*l):(i=(e.max.x-f.x)*l,r=(e.min.x-f.x)*l),u>=0?(s=(e.min.y-f.y)*u,a=(e.max.y-f.y)*u):(s=(e.max.y-f.y)*u,a=(e.min.y-f.y)*u),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),d>=0?(o=(e.min.z-f.z)*d,c=(e.max.z-f.z)*d):(o=(e.max.z-f.z)*d,c=(e.min.z-f.z)*d),i>c||o>r)||((o>i||i!==i)&&(i=o),(c<r||r!==r)&&(r=c),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,Xn)!==null}intersectTriangle(e,t,i,r,s){oa.subVectors(t,e),es.subVectors(i,e),ca.crossVectors(oa,es);let a=this.direction.dot(ca),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;di.subVectors(this.origin,e);const c=o*this.direction.dot(es.crossVectors(di,es));if(c<0)return null;const l=o*this.direction.dot(oa.cross(di));if(l<0||c+l>a)return null;const u=-o*di.dot(ca);return u<0?null:this.at(u/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class xt{constructor(e,t,i,r,s,a,o,c,l,u,d,f,p,v,b,m){xt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,c,l,u,d,f,p,v,b,m)}set(e,t,i,r,s,a,o,c,l,u,d,f,p,v,b,m){const h=this.elements;return h[0]=e,h[4]=t,h[8]=i,h[12]=r,h[1]=s,h[5]=a,h[9]=o,h[13]=c,h[2]=l,h[6]=u,h[10]=d,h[14]=f,h[3]=p,h[7]=v,h[11]=b,h[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new xt().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,r=1/Zi.setFromMatrixColumn(e,0).length(),s=1/Zi.setFromMatrixColumn(e,1).length(),a=1/Zi.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),c=Math.cos(r),l=Math.sin(r),u=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const f=a*u,p=a*d,v=o*u,b=o*d;t[0]=c*u,t[4]=-c*d,t[8]=l,t[1]=p+v*l,t[5]=f-b*l,t[9]=-o*c,t[2]=b-f*l,t[6]=v+p*l,t[10]=a*c}else if(e.order==="YXZ"){const f=c*u,p=c*d,v=l*u,b=l*d;t[0]=f+b*o,t[4]=v*o-p,t[8]=a*l,t[1]=a*d,t[5]=a*u,t[9]=-o,t[2]=p*o-v,t[6]=b+f*o,t[10]=a*c}else if(e.order==="ZXY"){const f=c*u,p=c*d,v=l*u,b=l*d;t[0]=f-b*o,t[4]=-a*d,t[8]=v+p*o,t[1]=p+v*o,t[5]=a*u,t[9]=b-f*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const f=a*u,p=a*d,v=o*u,b=o*d;t[0]=c*u,t[4]=v*l-p,t[8]=f*l+b,t[1]=c*d,t[5]=b*l+f,t[9]=p*l-v,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const f=a*c,p=a*l,v=o*c,b=o*l;t[0]=c*u,t[4]=b-f*d,t[8]=v*d+p,t[1]=d,t[5]=a*u,t[9]=-o*u,t[2]=-l*u,t[6]=p*d+v,t[10]=f-b*d}else if(e.order==="XZY"){const f=a*c,p=a*l,v=o*c,b=o*l;t[0]=c*u,t[4]=-d,t[8]=l*u,t[1]=f*d+b,t[5]=a*u,t[9]=p*d-v,t[2]=v*d-p,t[6]=o*u,t[10]=b*d+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Dd,e,Id)}lookAt(e,t,i){const r=this.elements;return dn.subVectors(e,t),dn.lengthSq()===0&&(dn.z=1),dn.normalize(),hi.crossVectors(i,dn),hi.lengthSq()===0&&(Math.abs(i.z)===1?dn.x+=1e-4:dn.z+=1e-4,dn.normalize(),hi.crossVectors(i,dn)),hi.normalize(),ts.crossVectors(dn,hi),r[0]=hi.x,r[4]=ts.x,r[8]=dn.x,r[1]=hi.y,r[5]=ts.y,r[9]=dn.y,r[2]=hi.z,r[6]=ts.z,r[10]=dn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[4],c=i[8],l=i[12],u=i[1],d=i[5],f=i[9],p=i[13],v=i[2],b=i[6],m=i[10],h=i[14],w=i[3],A=i[7],E=i[11],M=i[15],g=r[0],R=r[4],P=r[8],x=r[12],_=r[1],C=r[5],N=r[9],I=r[13],H=r[2],X=r[6],Z=r[10],re=r[14],K=r[3],ne=r[7],Q=r[11],fe=r[15];return s[0]=a*g+o*_+c*H+l*K,s[4]=a*R+o*C+c*X+l*ne,s[8]=a*P+o*N+c*Z+l*Q,s[12]=a*x+o*I+c*re+l*fe,s[1]=u*g+d*_+f*H+p*K,s[5]=u*R+d*C+f*X+p*ne,s[9]=u*P+d*N+f*Z+p*Q,s[13]=u*x+d*I+f*re+p*fe,s[2]=v*g+b*_+m*H+h*K,s[6]=v*R+b*C+m*X+h*ne,s[10]=v*P+b*N+m*Z+h*Q,s[14]=v*x+b*I+m*re+h*fe,s[3]=w*g+A*_+E*H+M*K,s[7]=w*R+A*C+E*X+M*ne,s[11]=w*P+A*N+E*Z+M*Q,s[15]=w*x+A*I+E*re+M*fe,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],c=e[9],l=e[13],u=e[2],d=e[6],f=e[10],p=e[14],v=e[3],b=e[7],m=e[11],h=e[15];return v*(+s*c*d-r*l*d-s*o*f+i*l*f+r*o*p-i*c*p)+b*(+t*c*p-t*l*f+s*a*f-r*a*p+r*l*u-s*c*u)+m*(+t*l*d-t*o*p-s*a*d+i*a*p+s*o*u-i*l*u)+h*(-r*o*u-t*c*d+t*o*f+r*a*d-i*a*f+i*c*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],d=e[9],f=e[10],p=e[11],v=e[12],b=e[13],m=e[14],h=e[15],w=d*m*l-b*f*l+b*c*p-o*m*p-d*c*h+o*f*h,A=v*f*l-u*m*l-v*c*p+a*m*p+u*c*h-a*f*h,E=u*b*l-v*d*l+v*o*p-a*b*p-u*o*h+a*d*h,M=v*d*c-u*b*c-v*o*f+a*b*f+u*o*m-a*d*m,g=t*w+i*A+r*E+s*M;if(g===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/g;return e[0]=w*R,e[1]=(b*f*s-d*m*s-b*r*p+i*m*p+d*r*h-i*f*h)*R,e[2]=(o*m*s-b*c*s+b*r*l-i*m*l-o*r*h+i*c*h)*R,e[3]=(d*c*s-o*f*s-d*r*l+i*f*l+o*r*p-i*c*p)*R,e[4]=A*R,e[5]=(u*m*s-v*f*s+v*r*p-t*m*p-u*r*h+t*f*h)*R,e[6]=(v*c*s-a*m*s-v*r*l+t*m*l+a*r*h-t*c*h)*R,e[7]=(a*f*s-u*c*s+u*r*l-t*f*l-a*r*p+t*c*p)*R,e[8]=E*R,e[9]=(v*d*s-u*b*s-v*i*p+t*b*p+u*i*h-t*d*h)*R,e[10]=(a*b*s-v*o*s+v*i*l-t*b*l-a*i*h+t*o*h)*R,e[11]=(u*o*s-a*d*s-u*i*l+t*d*l+a*i*p-t*o*p)*R,e[12]=M*R,e[13]=(u*b*r-v*d*r+v*i*f-t*b*f-u*i*m+t*d*m)*R,e[14]=(v*o*r-a*b*r-v*i*c+t*b*c+a*i*m-t*o*m)*R,e[15]=(a*d*r-u*o*r+u*i*c-t*d*c-a*i*f+t*o*f)*R,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,a=e.x,o=e.y,c=e.z,l=s*a,u=s*o;return this.set(l*a+i,l*o-r*c,l*c+r*o,0,l*o+r*c,u*o+i,u*c-r*a,0,l*c-r*o,u*c+r*a,s*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,a=t._y,o=t._z,c=t._w,l=s+s,u=a+a,d=o+o,f=s*l,p=s*u,v=s*d,b=a*u,m=a*d,h=o*d,w=c*l,A=c*u,E=c*d,M=i.x,g=i.y,R=i.z;return r[0]=(1-(b+h))*M,r[1]=(p+E)*M,r[2]=(v-A)*M,r[3]=0,r[4]=(p-E)*g,r[5]=(1-(f+h))*g,r[6]=(m+w)*g,r[7]=0,r[8]=(v+A)*R,r[9]=(m-w)*R,r[10]=(1-(f+b))*R,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;let s=Zi.set(r[0],r[1],r[2]).length();const a=Zi.set(r[4],r[5],r[6]).length(),o=Zi.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],Rn.copy(this);const l=1/s,u=1/a,d=1/o;return Rn.elements[0]*=l,Rn.elements[1]*=l,Rn.elements[2]*=l,Rn.elements[4]*=u,Rn.elements[5]*=u,Rn.elements[6]*=u,Rn.elements[8]*=d,Rn.elements[9]*=d,Rn.elements[10]*=d,t.setFromRotationMatrix(Rn),i.x=s,i.y=a,i.z=o,this}makePerspective(e,t,i,r,s,a,o=Vn,c=!1){const l=this.elements,u=2*s/(t-e),d=2*s/(i-r),f=(t+e)/(t-e),p=(i+r)/(i-r);let v,b;if(c)v=s/(a-s),b=a*s/(a-s);else if(o===Vn)v=-(a+s)/(a-s),b=-2*a*s/(a-s);else if(o===Cs)v=-a/(a-s),b=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=d,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=v,l[14]=b,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,r,s,a,o=Vn,c=!1){const l=this.elements,u=2/(t-e),d=2/(i-r),f=-(t+e)/(t-e),p=-(i+r)/(i-r);let v,b;if(c)v=1/(a-s),b=a/(a-s);else if(o===Vn)v=-2/(a-s),b=-(a+s)/(a-s);else if(o===Cs)v=-1/(a-s),b=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=0,l[12]=f,l[1]=0,l[5]=d,l[9]=0,l[13]=p,l[2]=0,l[6]=0,l[10]=v,l[14]=b,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Zi=new B,Rn=new xt,Dd=new B(0,0,0),Id=new B(1,1,1),hi=new B,ts=new B,dn=new B,_c=new xt,vc=new br;class Un{constructor(e=0,t=0,i=0,r=Un.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],c=r[1],l=r[5],u=r[9],d=r[2],f=r[6],p=r[10];switch(t){case"XYZ":this._y=Math.asin(ot(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-ot(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(ot(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-ot(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(ot(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-ot(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,p),this._y=0);break;default:Ke("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return _c.makeRotationFromQuaternion(e),this.setFromRotationMatrix(_c,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return vc.setFromEuler(this),this.setFromQuaternion(vc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Un.DEFAULT_ORDER="XYZ";class Vo{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Ud=0;const yc=new B,Ji=new br,qn=new xt,ns=new B,Ar=new B,Fd=new B,Nd=new br,bc=new B(1,0,0),Mc=new B(0,1,0),Sc=new B(0,0,1),Ec={type:"added"},Od={type:"removed"},Qi={type:"childadded",child:null},la={type:"childremoved",child:null};class Lt extends yr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ud++}),this.uuid=qr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Lt.DEFAULT_UP.clone();const e=new B,t=new Un,i=new br,r=new B(1,1,1);function s(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new xt},normalMatrix:{value:new Je}}),this.matrix=new xt,this.matrixWorld=new xt,this.matrixAutoUpdate=Lt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Lt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Vo,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ji.setFromAxisAngle(e,t),this.quaternion.multiply(Ji),this}rotateOnWorldAxis(e,t){return Ji.setFromAxisAngle(e,t),this.quaternion.premultiply(Ji),this}rotateX(e){return this.rotateOnAxis(bc,e)}rotateY(e){return this.rotateOnAxis(Mc,e)}rotateZ(e){return this.rotateOnAxis(Sc,e)}translateOnAxis(e,t){return yc.copy(e).applyQuaternion(this.quaternion),this.position.add(yc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(bc,e)}translateY(e){return this.translateOnAxis(Mc,e)}translateZ(e){return this.translateOnAxis(Sc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(qn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?ns.copy(e):ns.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Ar.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?qn.lookAt(Ar,ns,this.up):qn.lookAt(ns,Ar,this.up),this.quaternion.setFromRotationMatrix(qn),r&&(qn.extractRotation(r.matrixWorld),Ji.setFromRotationMatrix(qn),this.quaternion.premultiply(Ji.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Pt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Ec),Qi.child=e,this.dispatchEvent(Qi),Qi.child=null):Pt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Od),la.child=e,this.dispatchEvent(la),la.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),qn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),qn.multiply(e.parent.matrixWorld)),e.applyMatrix4(qn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Ec),Qi.child=e,this.dispatchEvent(Qi),Qi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ar,e,Fd),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ar,Nd,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const d=c[l];s(e.shapes,d)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(s(e.materials,this.material[c]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];r.animations.push(s(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),l=a(e.textures),u=a(e.images),d=a(e.shapes),f=a(e.skeletons),p=a(e.animations),v=a(e.nodes);o.length>0&&(i.geometries=o),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),u.length>0&&(i.images=u),d.length>0&&(i.shapes=d),f.length>0&&(i.skeletons=f),p.length>0&&(i.animations=p),v.length>0&&(i.nodes=v)}return i.object=r,i;function a(o){const c=[];for(const l in o){const u=o[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}Lt.DEFAULT_UP=new B(0,1,0);Lt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Lt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Cn=new B,$n=new B,ua=new B,Yn=new B,er=new B,tr=new B,Tc=new B,da=new B,ha=new B,fa=new B,pa=new vt,ma=new vt,xa=new vt;class Ln{constructor(e=new B,t=new B,i=new B){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),Cn.subVectors(e,t),r.cross(Cn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){Cn.subVectors(r,t),$n.subVectors(i,t),ua.subVectors(e,t);const a=Cn.dot(Cn),o=Cn.dot($n),c=Cn.dot(ua),l=$n.dot($n),u=$n.dot(ua),d=a*l-o*o;if(d===0)return s.set(0,0,0),null;const f=1/d,p=(l*c-o*u)*f,v=(a*u-o*c)*f;return s.set(1-p-v,v,p)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,Yn)===null?!1:Yn.x>=0&&Yn.y>=0&&Yn.x+Yn.y<=1}static getInterpolation(e,t,i,r,s,a,o,c){return this.getBarycoord(e,t,i,r,Yn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,Yn.x),c.addScaledVector(a,Yn.y),c.addScaledVector(o,Yn.z),c)}static getInterpolatedAttribute(e,t,i,r,s,a){return pa.setScalar(0),ma.setScalar(0),xa.setScalar(0),pa.fromBufferAttribute(e,t),ma.fromBufferAttribute(e,i),xa.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(pa,s.x),a.addScaledVector(ma,s.y),a.addScaledVector(xa,s.z),a}static isFrontFacing(e,t,i,r){return Cn.subVectors(i,t),$n.subVectors(e,t),Cn.cross($n).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Cn.subVectors(this.c,this.b),$n.subVectors(this.a,this.b),Cn.cross($n).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Ln.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Ln.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return Ln.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return Ln.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Ln.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let a,o;er.subVectors(r,i),tr.subVectors(s,i),da.subVectors(e,i);const c=er.dot(da),l=tr.dot(da);if(c<=0&&l<=0)return t.copy(i);ha.subVectors(e,r);const u=er.dot(ha),d=tr.dot(ha);if(u>=0&&d<=u)return t.copy(r);const f=c*d-u*l;if(f<=0&&c>=0&&u<=0)return a=c/(c-u),t.copy(i).addScaledVector(er,a);fa.subVectors(e,s);const p=er.dot(fa),v=tr.dot(fa);if(v>=0&&p<=v)return t.copy(s);const b=p*l-c*v;if(b<=0&&l>=0&&v<=0)return o=l/(l-v),t.copy(i).addScaledVector(tr,o);const m=u*v-p*d;if(m<=0&&d-u>=0&&p-v>=0)return Tc.subVectors(s,r),o=(d-u)/(d-u+(p-v)),t.copy(r).addScaledVector(Tc,o);const h=1/(m+b+f);return a=b*h,o=f*h,t.copy(i).addScaledVector(er,a).addScaledVector(tr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Vl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},fi={h:0,s:0,l:0},is={h:0,s:0,l:0};function ga(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class at{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=tn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,dt.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=dt.workingColorSpace){return this.r=e,this.g=t,this.b=i,dt.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=dt.workingColorSpace){if(e=Ed(e,1),t=ot(t,0,1),i=ot(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,a=2*i-s;this.r=ga(a,s,e+1/3),this.g=ga(a,s,e),this.b=ga(a,s,e-1/3)}return dt.colorSpaceToWorking(this,r),this}setStyle(e,t=tn){function i(s){s!==void 0&&parseFloat(s)<1&&Ke("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Ke("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);Ke("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=tn){const i=Vl[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Ke("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ii(e.r),this.g=ii(e.g),this.b=ii(e.b),this}copyLinearToSRGB(e){return this.r=dr(e.r),this.g=dr(e.g),this.b=dr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=tn){return dt.workingToColorSpace($t.copy(this),e),Math.round(ot($t.r*255,0,255))*65536+Math.round(ot($t.g*255,0,255))*256+Math.round(ot($t.b*255,0,255))}getHexString(e=tn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=dt.workingColorSpace){dt.workingToColorSpace($t.copy(this),t);const i=$t.r,r=$t.g,s=$t.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let c,l;const u=(o+a)/2;if(o===a)c=0,l=0;else{const d=a-o;switch(l=u<=.5?d/(a+o):d/(2-a-o),a){case i:c=(r-s)/d+(r<s?6:0);break;case r:c=(s-i)/d+2;break;case s:c=(i-r)/d+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=dt.workingColorSpace){return dt.workingToColorSpace($t.copy(this),t),e.r=$t.r,e.g=$t.g,e.b=$t.b,e}getStyle(e=tn){dt.workingToColorSpace($t.copy(this),e);const t=$t.r,i=$t.g,r=$t.b;return e!==tn?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(fi),this.setHSL(fi.h+e,fi.s+t,fi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(fi),e.getHSL(is);const i=Qs(fi.h,is.h,t),r=Qs(fi.s,is.s,t),s=Qs(fi.l,is.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const $t=new at;at.NAMES=Vl;let zd=0;class Hi extends yr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:zd++}),this.uuid=qr(),this.name="",this.type="Material",this.blending=ur,this.side=Ei,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Fa,this.blendDst=Na,this.blendEquation=Di,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new at(0,0,0),this.blendAlpha=0,this.depthFunc=fr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=uc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=qi,this.stencilZFail=qi,this.stencilZPass=qi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){Ke(`Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Ke(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==ur&&(i.blending=this.blending),this.side!==Ei&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Fa&&(i.blendSrc=this.blendSrc),this.blendDst!==Na&&(i.blendDst=this.blendDst),this.blendEquation!==Di&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==fr&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==uc&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==qi&&(i.stencilFail=this.stencilFail),this.stencilZFail!==qi&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==qi&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const c=s[o];delete c.metadata,a.push(c)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class _i extends Hi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new at(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Un,this.combine=Rl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Ut=new B,rs=new rt;let Bd=0;class Sn{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Bd++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=dc,this.updateRanges=[],this.gpuType=kn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)rs.fromBufferAttribute(this,t),rs.applyMatrix3(e),this.setXY(t,rs.x,rs.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Ut.fromBufferAttribute(this,t),Ut.applyMatrix3(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Ut.fromBufferAttribute(this,t),Ut.applyMatrix4(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Ut.fromBufferAttribute(this,t),Ut.applyNormalMatrix(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Ut.fromBufferAttribute(this,t),Ut.transformDirection(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Sr(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=on(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Sr(t,this.array)),t}setX(e,t){return this.normalized&&(t=on(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Sr(t,this.array)),t}setY(e,t){return this.normalized&&(t=on(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Sr(t,this.array)),t}setZ(e,t){return this.normalized&&(t=on(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Sr(t,this.array)),t}setW(e,t){return this.normalized&&(t=on(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=on(t,this.array),i=on(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=on(t,this.array),i=on(i,this.array),r=on(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=on(t,this.array),i=on(i,this.array),r=on(r,this.array),s=on(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==dc&&(e.usage=this.usage),e}}class Gl extends Sn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Hl extends Sn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class Mt extends Sn{constructor(e,t,i){super(new Float32Array(e),t,i)}}let kd=0;const vn=new xt,_a=new Lt,nr=new B,hn=new Vi,wr=new Vi,Vt=new B;class kt extends yr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:kd++}),this.uuid=qr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Bl(e)?Hl:Gl)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Je().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return vn.makeRotationFromQuaternion(e),this.applyMatrix4(vn),this}rotateX(e){return vn.makeRotationX(e),this.applyMatrix4(vn),this}rotateY(e){return vn.makeRotationY(e),this.applyMatrix4(vn),this}rotateZ(e){return vn.makeRotationZ(e),this.applyMatrix4(vn),this}translate(e,t,i){return vn.makeTranslation(e,t,i),this.applyMatrix4(vn),this}scale(e,t,i){return vn.makeScale(e,t,i),this.applyMatrix4(vn),this}lookAt(e){return _a.lookAt(e),_a.updateMatrix(),this.applyMatrix4(_a.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(nr).negate(),this.translate(nr.x,nr.y,nr.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Mt(i,3))}else{const i=Math.min(e.length,t.count);for(let r=0;r<i;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&Ke("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Vi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Pt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new B(-1/0,-1/0,-1/0),new B(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];hn.setFromBufferAttribute(s),this.morphTargetsRelative?(Vt.addVectors(this.boundingBox.min,hn.min),this.boundingBox.expandByPoint(Vt),Vt.addVectors(this.boundingBox.max,hn.max),this.boundingBox.expandByPoint(Vt)):(this.boundingBox.expandByPoint(hn.min),this.boundingBox.expandByPoint(hn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Pt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Gi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Pt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new B,1/0);return}if(e){const i=this.boundingSphere.center;if(hn.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];wr.setFromBufferAttribute(o),this.morphTargetsRelative?(Vt.addVectors(hn.min,wr.min),hn.expandByPoint(Vt),Vt.addVectors(hn.max,wr.max),hn.expandByPoint(Vt)):(hn.expandByPoint(wr.min),hn.expandByPoint(wr.max))}hn.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)Vt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Vt));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],c=this.morphTargetsRelative;for(let l=0,u=o.count;l<u;l++)Vt.fromBufferAttribute(o,l),c&&(nr.fromBufferAttribute(e,l),Vt.add(nr)),r=Math.max(r,i.distanceToSquared(Vt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&Pt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Pt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Sn(new Float32Array(4*i.count),4));const a=this.getAttribute("tangent"),o=[],c=[];for(let P=0;P<i.count;P++)o[P]=new B,c[P]=new B;const l=new B,u=new B,d=new B,f=new rt,p=new rt,v=new rt,b=new B,m=new B;function h(P,x,_){l.fromBufferAttribute(i,P),u.fromBufferAttribute(i,x),d.fromBufferAttribute(i,_),f.fromBufferAttribute(s,P),p.fromBufferAttribute(s,x),v.fromBufferAttribute(s,_),u.sub(l),d.sub(l),p.sub(f),v.sub(f);const C=1/(p.x*v.y-v.x*p.y);isFinite(C)&&(b.copy(u).multiplyScalar(v.y).addScaledVector(d,-p.y).multiplyScalar(C),m.copy(d).multiplyScalar(p.x).addScaledVector(u,-v.x).multiplyScalar(C),o[P].add(b),o[x].add(b),o[_].add(b),c[P].add(m),c[x].add(m),c[_].add(m))}let w=this.groups;w.length===0&&(w=[{start:0,count:e.count}]);for(let P=0,x=w.length;P<x;++P){const _=w[P],C=_.start,N=_.count;for(let I=C,H=C+N;I<H;I+=3)h(e.getX(I+0),e.getX(I+1),e.getX(I+2))}const A=new B,E=new B,M=new B,g=new B;function R(P){M.fromBufferAttribute(r,P),g.copy(M);const x=o[P];A.copy(x),A.sub(M.multiplyScalar(M.dot(x))).normalize(),E.crossVectors(g,x);const C=E.dot(c[P])<0?-1:1;a.setXYZW(P,A.x,A.y,A.z,C)}for(let P=0,x=w.length;P<x;++P){const _=w[P],C=_.start,N=_.count;for(let I=C,H=C+N;I<H;I+=3)R(e.getX(I+0)),R(e.getX(I+1)),R(e.getX(I+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Sn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let f=0,p=i.count;f<p;f++)i.setXYZ(f,0,0,0);const r=new B,s=new B,a=new B,o=new B,c=new B,l=new B,u=new B,d=new B;if(e)for(let f=0,p=e.count;f<p;f+=3){const v=e.getX(f+0),b=e.getX(f+1),m=e.getX(f+2);r.fromBufferAttribute(t,v),s.fromBufferAttribute(t,b),a.fromBufferAttribute(t,m),u.subVectors(a,s),d.subVectors(r,s),u.cross(d),o.fromBufferAttribute(i,v),c.fromBufferAttribute(i,b),l.fromBufferAttribute(i,m),o.add(u),c.add(u),l.add(u),i.setXYZ(v,o.x,o.y,o.z),i.setXYZ(b,c.x,c.y,c.z),i.setXYZ(m,l.x,l.y,l.z)}else for(let f=0,p=t.count;f<p;f+=3)r.fromBufferAttribute(t,f+0),s.fromBufferAttribute(t,f+1),a.fromBufferAttribute(t,f+2),u.subVectors(a,s),d.subVectors(r,s),u.cross(d),i.setXYZ(f+0,u.x,u.y,u.z),i.setXYZ(f+1,u.x,u.y,u.z),i.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Vt.fromBufferAttribute(e,t),Vt.normalize(),e.setXYZ(t,Vt.x,Vt.y,Vt.z)}toNonIndexed(){function e(o,c){const l=o.array,u=o.itemSize,d=o.normalized,f=new l.constructor(c.length*u);let p=0,v=0;for(let b=0,m=c.length;b<m;b++){o.isInterleavedBufferAttribute?p=c[b]*o.data.stride+o.offset:p=c[b]*u;for(let h=0;h<u;h++)f[v++]=l[p++]}return new Sn(f,u,d)}if(this.index===null)return Ke("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new kt,i=this.index.array,r=this.attributes;for(const o in r){const c=r[o],l=e(c,i);t.setAttribute(o,l)}const s=this.morphAttributes;for(const o in s){const c=[],l=s[o];for(let u=0,d=l.length;u<d;u++){const f=l[u],p=e(f,i);c.push(p)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const c in i){const l=i[c];e.data.attributes[c]=l.toJSON(e.data)}const r={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let d=0,f=l.length;d<f;d++){const p=l[d];u.push(p.toJSON(e.data))}u.length>0&&(r[c]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const l in r){const u=r[l];this.setAttribute(l,u.clone(t))}const s=e.morphAttributes;for(const l in s){const u=[],d=s[l];for(let f=0,p=d.length;f<p;f++)u.push(d[f].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,u=a.length;l<u;l++){const d=a[l];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Ac=new xt,Ri=new ks,ss=new Gi,wc=new B,as=new B,os=new B,cs=new B,va=new B,ls=new B,Rc=new B,us=new B;class nn extends Lt{constructor(e=new kt,t=new _i){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){ls.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const u=o[c],d=s[c];u!==0&&(va.fromBufferAttribute(d,e),a?ls.addScaledVector(va,u):ls.addScaledVector(va.sub(t),u))}t.add(ls)}return t}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),ss.copy(i.boundingSphere),ss.applyMatrix4(s),Ri.copy(e.ray).recast(e.near),!(ss.containsPoint(Ri.origin)===!1&&(Ri.intersectSphere(ss,wc)===null||Ri.origin.distanceToSquared(wc)>(e.far-e.near)**2))&&(Ac.copy(s).invert(),Ri.copy(e.ray).applyMatrix4(Ac),!(i.boundingBox!==null&&Ri.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Ri)))}_computeIntersections(e,t,i){let r;const s=this.geometry,a=this.material,o=s.index,c=s.attributes.position,l=s.attributes.uv,u=s.attributes.uv1,d=s.attributes.normal,f=s.groups,p=s.drawRange;if(o!==null)if(Array.isArray(a))for(let v=0,b=f.length;v<b;v++){const m=f[v],h=a[m.materialIndex],w=Math.max(m.start,p.start),A=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let E=w,M=A;E<M;E+=3){const g=o.getX(E),R=o.getX(E+1),P=o.getX(E+2);r=ds(this,h,e,i,l,u,d,g,R,P),r&&(r.faceIndex=Math.floor(E/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const v=Math.max(0,p.start),b=Math.min(o.count,p.start+p.count);for(let m=v,h=b;m<h;m+=3){const w=o.getX(m),A=o.getX(m+1),E=o.getX(m+2);r=ds(this,a,e,i,l,u,d,w,A,E),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(a))for(let v=0,b=f.length;v<b;v++){const m=f[v],h=a[m.materialIndex],w=Math.max(m.start,p.start),A=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let E=w,M=A;E<M;E+=3){const g=E,R=E+1,P=E+2;r=ds(this,h,e,i,l,u,d,g,R,P),r&&(r.faceIndex=Math.floor(E/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const v=Math.max(0,p.start),b=Math.min(c.count,p.start+p.count);for(let m=v,h=b;m<h;m+=3){const w=m,A=m+1,E=m+2;r=ds(this,a,e,i,l,u,d,w,A,E),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}}function Vd(n,e,t,i,r,s,a,o){let c;if(e.side===ln?c=i.intersectTriangle(a,s,r,!0,o):c=i.intersectTriangle(r,s,a,e.side===Ei,o),c===null)return null;us.copy(o),us.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(us);return l<t.near||l>t.far?null:{distance:l,point:us.clone(),object:n}}function ds(n,e,t,i,r,s,a,o,c,l){n.getVertexPosition(o,as),n.getVertexPosition(c,os),n.getVertexPosition(l,cs);const u=Vd(n,e,t,i,as,os,cs,Rc);if(u){const d=new B;Ln.getBarycoord(Rc,as,os,cs,d),r&&(u.uv=Ln.getInterpolatedAttribute(r,o,c,l,d,new rt)),s&&(u.uv1=Ln.getInterpolatedAttribute(s,o,c,l,d,new rt)),a&&(u.normal=Ln.getInterpolatedAttribute(a,o,c,l,d,new B),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const f={a:o,b:c,c:l,normal:new B,materialIndex:0};Ln.getNormal(as,os,cs,f.normal),u.face=f,u.barycoord=d}return u}class Wi extends kt{constructor(e=1,t=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const c=[],l=[],u=[],d=[];let f=0,p=0;v("z","y","x",-1,-1,i,t,e,a,s,0),v("z","y","x",1,-1,i,t,-e,a,s,1),v("x","z","y",1,1,e,i,t,r,a,2),v("x","z","y",1,-1,e,i,-t,r,a,3),v("x","y","z",1,-1,e,t,i,r,s,4),v("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(c),this.setAttribute("position",new Mt(l,3)),this.setAttribute("normal",new Mt(u,3)),this.setAttribute("uv",new Mt(d,2));function v(b,m,h,w,A,E,M,g,R,P,x){const _=E/R,C=M/P,N=E/2,I=M/2,H=g/2,X=R+1,Z=P+1;let re=0,K=0;const ne=new B;for(let Q=0;Q<Z;Q++){const fe=Q*C-I;for(let we=0;we<X;we++){const Oe=we*_-N;ne[b]=Oe*w,ne[m]=fe*A,ne[h]=H,l.push(ne.x,ne.y,ne.z),ne[b]=0,ne[m]=0,ne[h]=g>0?1:-1,u.push(ne.x,ne.y,ne.z),d.push(we/R),d.push(1-Q/P),re+=1}}for(let Q=0;Q<P;Q++)for(let fe=0;fe<R;fe++){const we=f+fe+X*Q,Oe=f+fe+X*(Q+1),We=f+(fe+1)+X*(Q+1),ct=f+(fe+1)+X*Q;c.push(we,Oe,ct),c.push(Oe,We,ct),K+=6}o.addGroup(p,K,x),p+=K,f+=re}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Wi(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function gr(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(Ke("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone():Array.isArray(r)?e[t][i]=r.slice():e[t][i]=r}}return e}function en(n){const e={};for(let t=0;t<n.length;t++){const i=gr(n[t]);for(const r in i)e[r]=i[r]}return e}function Gd(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Wl(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:dt.workingColorSpace}const Hd={clone:gr,merge:en};var Wd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Xd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ai extends Hi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Wd,this.fragmentShader=Xd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=gr(e.uniforms),this.uniformsGroups=Gd(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class Xl extends Lt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new xt,this.projectionMatrix=new xt,this.projectionMatrixInverse=new xt,this.coordinateSystem=Vn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const pi=new B,Cc=new rt,Pc=new rt;class cn extends Xl{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Ls*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Js*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ls*2*Math.atan(Math.tan(Js*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){pi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(pi.x,pi.y).multiplyScalar(-e/pi.z),pi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(pi.x,pi.y).multiplyScalar(-e/pi.z)}getViewSize(e,t){return this.getViewBounds(e,Cc,Pc),t.subVectors(Pc,Cc)}setViewOffset(e,t,i,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Js*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;s+=a.offsetX*r/c,t-=a.offsetY*i/l,r*=a.width/c,i*=a.height/l}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const ir=-90,rr=1;class qd extends Lt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new cn(ir,rr,e,t);r.layers=this.layers,this.add(r);const s=new cn(ir,rr,e,t);s.layers=this.layers,this.add(s);const a=new cn(ir,rr,e,t);a.layers=this.layers,this.add(a);const o=new cn(ir,rr,e,t);o.layers=this.layers,this.add(o);const c=new cn(ir,rr,e,t);c.layers=this.layers,this.add(c);const l=new cn(ir,rr,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,a,o,c]=t;for(const l of t)this.remove(l);if(e===Vn)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Cs)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,c,l,u]=this.children,d=e.getRenderTarget(),f=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),v=e.xr.enabled;e.xr.enabled=!1;const b=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(t,s),e.setRenderTarget(i,1,r),e.render(t,a),e.setRenderTarget(i,2,r),e.render(t,o),e.setRenderTarget(i,3,r),e.render(t,c),e.setRenderTarget(i,4,r),e.render(t,l),i.texture.generateMipmaps=b,e.setRenderTarget(i,5,r),e.render(t,u),e.setRenderTarget(d,f,p),e.xr.enabled=v,i.texture.needsPMREMUpdate=!0}}class ql extends jt{constructor(e=[],t=pr,i,r,s,a,o,c,l,u){super(e,t,i,r,s,a,o,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class $d extends Bi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new ql(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Wi(5,5,5),s=new ai({name:"CubemapFromEquirect",uniforms:gr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:ln,blending:ni});s.uniforms.tEquirect.value=t;const a=new nn(r,s),o=t.minFilter;return t.minFilter===Ui&&(t.minFilter=bn),new qd(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,r);e.setRenderTarget(s)}}class bt extends Lt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Yd={type:"move"};class ya{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new bt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new bt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new B,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new B),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new bt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new B,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new B),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const b of e.hand.values()){const m=t.getJointPose(b,i),h=this._getHandJoint(l,b);m!==null&&(h.matrix.fromArray(m.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,h.jointRadius=m.radius),h.visible=m!==null}const u=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],f=u.position.distanceTo(d.position),p=.02,v=.005;l.inputState.pinching&&f>p+v?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&f<=p-v&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Yd)))}return o!==null&&(o.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new bt;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class Go{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new at(e),this.density=t}clone(){return new Go(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class jd extends Lt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Un,this.environmentIntensity=1,this.environmentRotation=new Un,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class $l extends jt{constructor(e=null,t=1,i=1,r,s,a,o,c,l=mn,u=mn,d,f){super(null,a,o,c,l,u,r,s,d,f),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Lc extends Sn{constructor(e,t,i,r=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const sr=new xt,Dc=new xt,hs=[],Ic=new Vi,Kd=new xt,Rr=new nn,Cr=new Gi;class Zd extends nn{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Lc(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<i;r++)this.setMatrixAt(r,Kd)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Vi),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,sr),Ic.copy(e.boundingBox).applyMatrix4(sr),this.boundingBox.union(Ic)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Gi),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,sr),Cr.copy(e.boundingSphere).applyMatrix4(sr),this.boundingSphere.union(Cr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const i=t.morphTargetInfluences,r=this.morphTexture.source.data.data,s=i.length+1,a=e*s+1;for(let o=0;o<i.length;o++)i[o]=r[a+o]}raycast(e,t){const i=this.matrixWorld,r=this.count;if(Rr.geometry=this.geometry,Rr.material=this.material,Rr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Cr.copy(this.boundingSphere),Cr.applyMatrix4(i),e.ray.intersectsSphere(Cr)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,sr),Dc.multiplyMatrices(i,sr),Rr.matrixWorld=Dc,Rr.raycast(e,hs);for(let a=0,o=hs.length;a<o;a++){const c=hs[a];c.instanceId=s,c.object=this,t.push(c)}hs.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Lc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const i=t.morphTargetInfluences,r=i.length+1;this.morphTexture===null&&(this.morphTexture=new $l(new Float32Array(r*this.count),r,this.count,Fo,kn));const s=this.morphTexture.source.data.data;let a=0;for(let l=0;l<i.length;l++)a+=i[l];const o=this.geometry.morphTargetsRelative?1:1-a,c=r*e;s[c]=o,s.set(i,c+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const ba=new B,Jd=new B,Qd=new Je;class xi{constructor(e=new B(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=ba.subVectors(i,t).cross(Jd.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(ba),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||Qd.getNormalMatrix(e),r=this.coplanarPoint(ba).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ci=new Gi,eh=new rt(.5,.5),fs=new B;class Ho{constructor(e=new xi,t=new xi,i=new xi,r=new xi,s=new xi,a=new xi){this.planes=[e,t,i,r,s,a]}set(e,t,i,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Vn,i=!1){const r=this.planes,s=e.elements,a=s[0],o=s[1],c=s[2],l=s[3],u=s[4],d=s[5],f=s[6],p=s[7],v=s[8],b=s[9],m=s[10],h=s[11],w=s[12],A=s[13],E=s[14],M=s[15];if(r[0].setComponents(l-a,p-u,h-v,M-w).normalize(),r[1].setComponents(l+a,p+u,h+v,M+w).normalize(),r[2].setComponents(l+o,p+d,h+b,M+A).normalize(),r[3].setComponents(l-o,p-d,h-b,M-A).normalize(),i)r[4].setComponents(c,f,m,E).normalize(),r[5].setComponents(l-c,p-f,h-m,M-E).normalize();else if(r[4].setComponents(l-c,p-f,h-m,M-E).normalize(),t===Vn)r[5].setComponents(l+c,p+f,h+m,M+E).normalize();else if(t===Cs)r[5].setComponents(c,f,m,E).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ci.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ci.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ci)}intersectsSprite(e){Ci.center.set(0,0,0);const t=eh.distanceTo(e.center);return Ci.radius=.7071067811865476+t,Ci.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ci)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(fs.x=r.normal.x>0?e.max.x:e.min.x,fs.y=r.normal.y>0?e.max.y:e.min.y,fs.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(fs)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Yl extends Hi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new at(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Ds=new B,Is=new B,Uc=new xt,Pr=new ks,ps=new Gi,Ma=new B,Fc=new B;class th extends Lt{constructor(e=new kt,t=new Yl){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let r=1,s=t.count;r<s;r++)Ds.fromBufferAttribute(t,r-1),Is.fromBufferAttribute(t,r),i[r]=i[r-1],i[r]+=Ds.distanceTo(Is);e.setAttribute("lineDistance",new Mt(i,1))}else Ke("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),ps.copy(i.boundingSphere),ps.applyMatrix4(r),ps.radius+=s,e.ray.intersectsSphere(ps)===!1)return;Uc.copy(r).invert(),Pr.copy(e.ray).applyMatrix4(Uc);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,u=i.index,f=i.attributes.position;if(u!==null){const p=Math.max(0,a.start),v=Math.min(u.count,a.start+a.count);for(let b=p,m=v-1;b<m;b+=l){const h=u.getX(b),w=u.getX(b+1),A=ms(this,e,Pr,c,h,w,b);A&&t.push(A)}if(this.isLineLoop){const b=u.getX(v-1),m=u.getX(p),h=ms(this,e,Pr,c,b,m,v-1);h&&t.push(h)}}else{const p=Math.max(0,a.start),v=Math.min(f.count,a.start+a.count);for(let b=p,m=v-1;b<m;b+=l){const h=ms(this,e,Pr,c,b,b+1,b);h&&t.push(h)}if(this.isLineLoop){const b=ms(this,e,Pr,c,v-1,p,v-1);b&&t.push(b)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function ms(n,e,t,i,r,s,a){const o=n.geometry.attributes.position;if(Ds.fromBufferAttribute(o,r),Is.fromBufferAttribute(o,s),t.distanceSqToSegment(Ds,Is,Ma,Fc)>i)return;Ma.applyMatrix4(n.matrixWorld);const l=e.ray.origin.distanceTo(Ma);if(!(l<e.near||l>e.far))return{distance:l,point:Fc.clone().applyMatrix4(n.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:n}}class jl extends Hi{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new at(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Nc=new xt,Mo=new ks,xs=new Gi,gs=new B;class nh extends Lt{constructor(e=new kt,t=new jl){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const i=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),xs.copy(i.boundingSphere),xs.applyMatrix4(r),xs.radius+=s,e.ray.intersectsSphere(xs)===!1)return;Nc.copy(r).invert(),Mo.copy(e.ray).applyMatrix4(Nc);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=i.index,d=i.attributes.position;if(l!==null){const f=Math.max(0,a.start),p=Math.min(l.count,a.start+a.count);for(let v=f,b=p;v<b;v++){const m=l.getX(v);gs.fromBufferAttribute(d,m),Oc(gs,m,c,r,e,t,this)}}else{const f=Math.max(0,a.start),p=Math.min(d.count,a.start+a.count);for(let v=f,b=p;v<b;v++)gs.fromBufferAttribute(d,v),Oc(gs,v,c,r,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Oc(n,e,t,i,r,s,a){const o=Mo.distanceSqToPoint(n);if(o<t){const c=new B;Mo.closestPointToPoint(n,c),c.applyMatrix4(i);const l=r.ray.origin.distanceTo(c);if(l<r.near||l>r.far)return;s.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class Sa extends jt{constructor(e,t,i,r,s,a,o,c,l){super(e,t,i,r,s,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Kl extends jt{constructor(e,t,i=zi,r,s,a,o=mn,c=mn,l,u=zr,d=1){if(u!==zr&&u!==Br)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:e,height:t,depth:d};super(f,r,s,a,o,c,u,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new ko(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Zl extends jt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class cr extends kt{constructor(e=1,t=1,i=4,r=8,s=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:i,radialSegments:r,heightSegments:s},t=Math.max(0,t),i=Math.max(1,Math.floor(i)),r=Math.max(3,Math.floor(r)),s=Math.max(1,Math.floor(s));const a=[],o=[],c=[],l=[],u=t/2,d=Math.PI/2*e,f=t,p=2*d+f,v=i*2+s,b=r+1,m=new B,h=new B;for(let w=0;w<=v;w++){let A=0,E=0,M=0,g=0;if(w<=i){const x=w/i,_=x*Math.PI/2;E=-u-e*Math.cos(_),M=e*Math.sin(_),g=-e*Math.cos(_),A=x*d}else if(w<=i+s){const x=(w-i)/s;E=-u+x*t,M=e,g=0,A=d+x*f}else{const x=(w-i-s)/i,_=x*Math.PI/2;E=u+e*Math.sin(_),M=e*Math.cos(_),g=e*Math.sin(_),A=d+f+x*d}const R=Math.max(0,Math.min(1,A/p));let P=0;w===0?P=.5/r:w===v&&(P=-.5/r);for(let x=0;x<=r;x++){const _=x/r,C=_*Math.PI*2,N=Math.sin(C),I=Math.cos(C);h.x=-M*I,h.y=E,h.z=M*N,o.push(h.x,h.y,h.z),m.set(-M*I,g,M*N),m.normalize(),c.push(m.x,m.y,m.z),l.push(_+P,R)}if(w>0){const x=(w-1)*b;for(let _=0;_<r;_++){const C=x+_,N=x+_+1,I=w*b+_,H=w*b+_+1;a.push(C,N,I),a.push(N,H,I)}}}this.setIndex(a),this.setAttribute("position",new Mt(o,3)),this.setAttribute("normal",new Mt(c,3)),this.setAttribute("uv",new Mt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new cr(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}}class Zn extends kt{constructor(e=1,t=1,i=1,r=32,s=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:c};const l=this;r=Math.floor(r),s=Math.floor(s);const u=[],d=[],f=[],p=[];let v=0;const b=[],m=i/2;let h=0;w(),a===!1&&(e>0&&A(!0),t>0&&A(!1)),this.setIndex(u),this.setAttribute("position",new Mt(d,3)),this.setAttribute("normal",new Mt(f,3)),this.setAttribute("uv",new Mt(p,2));function w(){const E=new B,M=new B;let g=0;const R=(t-e)/i;for(let P=0;P<=s;P++){const x=[],_=P/s,C=_*(t-e)+e;for(let N=0;N<=r;N++){const I=N/r,H=I*c+o,X=Math.sin(H),Z=Math.cos(H);M.x=C*X,M.y=-_*i+m,M.z=C*Z,d.push(M.x,M.y,M.z),E.set(X,R,Z).normalize(),f.push(E.x,E.y,E.z),p.push(I,1-_),x.push(v++)}b.push(x)}for(let P=0;P<r;P++)for(let x=0;x<s;x++){const _=b[x][P],C=b[x+1][P],N=b[x+1][P+1],I=b[x][P+1];(e>0||x!==0)&&(u.push(_,C,I),g+=3),(t>0||x!==s-1)&&(u.push(C,N,I),g+=3)}l.addGroup(h,g,0),h+=g}function A(E){const M=v,g=new rt,R=new B;let P=0;const x=E===!0?e:t,_=E===!0?1:-1;for(let N=1;N<=r;N++)d.push(0,m*_,0),f.push(0,_,0),p.push(.5,.5),v++;const C=v;for(let N=0;N<=r;N++){const H=N/r*c+o,X=Math.cos(H),Z=Math.sin(H);R.x=x*Z,R.y=m*_,R.z=x*X,d.push(R.x,R.y,R.z),f.push(0,_,0),g.x=X*.5+.5,g.y=Z*.5*_+.5,p.push(g.x,g.y),v++}for(let N=0;N<r;N++){const I=M+N,H=C+N;E===!0?u.push(H,H+1,I):u.push(H+1,H,I),P+=3}l.addGroup(h,P,E===!0?1:2),h+=P}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Zn(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Wo extends Zn{constructor(e=1,t=1,i=32,r=1,s=!1,a=0,o=Math.PI*2){super(0,e,t,i,r,s,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:r,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(e){return new Wo(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Xo extends kt{constructor(e=[],t=[],i=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:r};const s=[],a=[];o(r),l(i),u(),this.setAttribute("position",new Mt(s,3)),this.setAttribute("normal",new Mt(s.slice(),3)),this.setAttribute("uv",new Mt(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(w){const A=new B,E=new B,M=new B;for(let g=0;g<t.length;g+=3)p(t[g+0],A),p(t[g+1],E),p(t[g+2],M),c(A,E,M,w)}function c(w,A,E,M){const g=M+1,R=[];for(let P=0;P<=g;P++){R[P]=[];const x=w.clone().lerp(E,P/g),_=A.clone().lerp(E,P/g),C=g-P;for(let N=0;N<=C;N++)N===0&&P===g?R[P][N]=x:R[P][N]=x.clone().lerp(_,N/C)}for(let P=0;P<g;P++)for(let x=0;x<2*(g-P)-1;x++){const _=Math.floor(x/2);x%2===0?(f(R[P][_+1]),f(R[P+1][_]),f(R[P][_])):(f(R[P][_+1]),f(R[P+1][_+1]),f(R[P+1][_]))}}function l(w){const A=new B;for(let E=0;E<s.length;E+=3)A.x=s[E+0],A.y=s[E+1],A.z=s[E+2],A.normalize().multiplyScalar(w),s[E+0]=A.x,s[E+1]=A.y,s[E+2]=A.z}function u(){const w=new B;for(let A=0;A<s.length;A+=3){w.x=s[A+0],w.y=s[A+1],w.z=s[A+2];const E=m(w)/2/Math.PI+.5,M=h(w)/Math.PI+.5;a.push(E,1-M)}v(),d()}function d(){for(let w=0;w<a.length;w+=6){const A=a[w+0],E=a[w+2],M=a[w+4],g=Math.max(A,E,M),R=Math.min(A,E,M);g>.9&&R<.1&&(A<.2&&(a[w+0]+=1),E<.2&&(a[w+2]+=1),M<.2&&(a[w+4]+=1))}}function f(w){s.push(w.x,w.y,w.z)}function p(w,A){const E=w*3;A.x=e[E+0],A.y=e[E+1],A.z=e[E+2]}function v(){const w=new B,A=new B,E=new B,M=new B,g=new rt,R=new rt,P=new rt;for(let x=0,_=0;x<s.length;x+=9,_+=6){w.set(s[x+0],s[x+1],s[x+2]),A.set(s[x+3],s[x+4],s[x+5]),E.set(s[x+6],s[x+7],s[x+8]),g.set(a[_+0],a[_+1]),R.set(a[_+2],a[_+3]),P.set(a[_+4],a[_+5]),M.copy(w).add(A).add(E).divideScalar(3);const C=m(M);b(g,_+0,w,C),b(R,_+2,A,C),b(P,_+4,E,C)}}function b(w,A,E,M){M<0&&w.x===1&&(a[A]=w.x-1),E.x===0&&E.z===0&&(a[A]=M/2/Math.PI+.5)}function m(w){return Math.atan2(w.z,-w.x)}function h(w){return Math.atan2(-w.y,Math.sqrt(w.x*w.x+w.z*w.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Xo(e.vertices,e.indices,e.radius,e.details)}}class qo extends Xo{constructor(e=1,t=0){const i=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],r=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(i,r,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new qo(e.radius,e.detail)}}class _r extends kt{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(i),c=Math.floor(r),l=o+1,u=c+1,d=e/o,f=t/c,p=[],v=[],b=[],m=[];for(let h=0;h<u;h++){const w=h*f-a;for(let A=0;A<l;A++){const E=A*d-s;v.push(E,-w,0),b.push(0,0,1),m.push(A/o),m.push(1-h/c)}}for(let h=0;h<c;h++)for(let w=0;w<o;w++){const A=w+l*h,E=w+l*(h+1),M=w+1+l*(h+1),g=w+1+l*h;p.push(A,E,g),p.push(E,M,g)}this.setIndex(p),this.setAttribute("position",new Mt(v,3)),this.setAttribute("normal",new Mt(b,3)),this.setAttribute("uv",new Mt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new _r(e.width,e.height,e.widthSegments,e.heightSegments)}}class zn extends kt{constructor(e=.5,t=1,i=32,r=1,s=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:r,thetaStart:s,thetaLength:a},i=Math.max(3,i),r=Math.max(1,r);const o=[],c=[],l=[],u=[];let d=e;const f=(t-e)/r,p=new B,v=new rt;for(let b=0;b<=r;b++){for(let m=0;m<=i;m++){const h=s+m/i*a;p.x=d*Math.cos(h),p.y=d*Math.sin(h),c.push(p.x,p.y,p.z),l.push(0,0,1),v.x=(p.x/t+1)/2,v.y=(p.y/t+1)/2,u.push(v.x,v.y)}d+=f}for(let b=0;b<r;b++){const m=b*(i+1);for(let h=0;h<i;h++){const w=h+m,A=w,E=w+i+1,M=w+i+2,g=w+1;o.push(A,E,g),o.push(E,M,g)}}this.setIndex(o),this.setAttribute("position",new Mt(c,3)),this.setAttribute("normal",new Mt(l,3)),this.setAttribute("uv",new Mt(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new zn(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Us extends kt{constructor(e=1,t=32,i=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const c=Math.min(a+o,Math.PI);let l=0;const u=[],d=new B,f=new B,p=[],v=[],b=[],m=[];for(let h=0;h<=i;h++){const w=[],A=h/i;let E=0;h===0&&a===0?E=.5/t:h===i&&c===Math.PI&&(E=-.5/t);for(let M=0;M<=t;M++){const g=M/t;d.x=-e*Math.cos(r+g*s)*Math.sin(a+A*o),d.y=e*Math.cos(a+A*o),d.z=e*Math.sin(r+g*s)*Math.sin(a+A*o),v.push(d.x,d.y,d.z),f.copy(d).normalize(),b.push(f.x,f.y,f.z),m.push(g+E,1-A),w.push(l++)}u.push(w)}for(let h=0;h<i;h++)for(let w=0;w<t;w++){const A=u[h][w+1],E=u[h][w],M=u[h+1][w],g=u[h+1][w+1];(h!==0||a>0)&&p.push(A,E,g),(h!==i-1||c<Math.PI)&&p.push(E,M,g)}this.setIndex(p),this.setAttribute("position",new Mt(v,3)),this.setAttribute("normal",new Mt(b,3)),this.setAttribute("uv",new Mt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Us(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Fi extends kt{constructor(e=1,t=.4,i=12,r=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:r,arc:s},i=Math.floor(i),r=Math.floor(r);const a=[],o=[],c=[],l=[],u=new B,d=new B,f=new B;for(let p=0;p<=i;p++)for(let v=0;v<=r;v++){const b=v/r*s,m=p/i*Math.PI*2;d.x=(e+t*Math.cos(m))*Math.cos(b),d.y=(e+t*Math.cos(m))*Math.sin(b),d.z=t*Math.sin(m),o.push(d.x,d.y,d.z),u.x=e*Math.cos(b),u.y=e*Math.sin(b),f.subVectors(d,u).normalize(),c.push(f.x,f.y,f.z),l.push(v/r),l.push(p/i)}for(let p=1;p<=i;p++)for(let v=1;v<=r;v++){const b=(r+1)*p+v-1,m=(r+1)*(p-1)+v-1,h=(r+1)*(p-1)+v,w=(r+1)*p+v;a.push(b,m,w),a.push(m,h,w)}this.setIndex(a),this.setAttribute("position",new Mt(o,3)),this.setAttribute("normal",new Mt(c,3)),this.setAttribute("uv",new Mt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Fi(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class mi extends Hi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new at(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new at(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ol,this.normalScale=new rt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Un,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class ih extends Hi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=hd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class rh extends Hi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Vs extends Lt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new at(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class sh extends Vs{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Lt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new at(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Ea=new xt,zc=new B,Bc=new B;class $o{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new rt(512,512),this.mapType=Gn,this.map=null,this.mapPass=null,this.matrix=new xt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ho,this._frameExtents=new rt(1,1),this._viewportCount=1,this._viewports=[new vt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;zc.setFromMatrixPosition(e.matrixWorld),t.position.copy(zc),Bc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Bc),t.updateMatrixWorld(),Ea.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ea,t.coordinateSystem,t.reversedDepth),t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Ea)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class ah extends $o{constructor(){super(new cn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,i=Ls*2*e.angle*this.focus,r=this.mapSize.width/this.mapSize.height*this.aspect,s=e.distance||t.far;(i!==t.fov||r!==t.aspect||s!==t.far)&&(t.fov=i,t.aspect=r,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class oh extends Vs{constructor(e,t,i=0,r=Math.PI/3,s=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Lt.DEFAULT_UP),this.updateMatrix(),this.target=new Lt,this.distance=i,this.angle=r,this.penumbra=s,this.decay=a,this.map=null,this.shadow=new ah}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const kc=new xt,Lr=new B,Ta=new B;class ch extends $o{constructor(){super(new cn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new rt(4,2),this._viewportCount=6,this._viewports=[new vt(2,1,1,1),new vt(0,1,1,1),new vt(3,1,1,1),new vt(1,1,1,1),new vt(3,0,1,1),new vt(1,0,1,1)],this._cubeDirections=[new B(1,0,0),new B(-1,0,0),new B(0,0,1),new B(0,0,-1),new B(0,1,0),new B(0,-1,0)],this._cubeUps=[new B(0,1,0),new B(0,1,0),new B(0,1,0),new B(0,1,0),new B(0,0,1),new B(0,0,-1)]}updateMatrices(e,t=0){const i=this.camera,r=this.matrix,s=e.distance||i.far;s!==i.far&&(i.far=s,i.updateProjectionMatrix()),Lr.setFromMatrixPosition(e.matrixWorld),i.position.copy(Lr),Ta.copy(i.position),Ta.add(this._cubeDirections[t]),i.up.copy(this._cubeUps[t]),i.lookAt(Ta),i.updateMatrixWorld(),r.makeTranslation(-Lr.x,-Lr.y,-Lr.z),kc.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(kc,i.coordinateSystem,i.reversedDepth)}}class Aa extends Vs{constructor(e,t,i=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=r,this.shadow=new ch}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Jl extends Xl{constructor(e=-1,t=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,a=i+e,o=r+t,c=r-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,a=s+l*this.view.width,o-=u*this.view.offsetY,c=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class lh extends $o{constructor(){super(new Jl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Vc extends Vs{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Lt.DEFAULT_UP),this.updateMatrix(),this.target=new Lt,this.shadow=new lh}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class uh extends cn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const Gc=new xt;class dh{constructor(e,t,i=0,r=1/0){this.ray=new ks(e,t),this.near=i,this.far=r,this.camera=null,this.layers=new Vo,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Pt("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Gc.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Gc),this}intersectObject(e,t=!0,i=[]){return So(e,this,i,t),i.sort(Hc),i}intersectObjects(e,t=!0,i=[]){for(let r=0,s=e.length;r<s;r++)So(e[r],this,i,t);return i.sort(Hc),i}}function Hc(n,e){return n.distance-e.distance}function So(n,e,t,i){let r=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(r=!1),r===!0&&i===!0){const s=n.children;for(let a=0,o=s.length;a<o;a++)So(s[a],e,t,!0)}}function Wc(n,e,t,i){const r=hh(i);switch(t){case Fl:return n*e;case Fo:return n*e/r.components*r.byteLength;case No:return n*e/r.components*r.byteLength;case Oo:return n*e*2/r.components*r.byteLength;case zo:return n*e*2/r.components*r.byteLength;case Nl:return n*e*3/r.components*r.byteLength;case Dn:return n*e*4/r.components*r.byteLength;case Bo:return n*e*4/r.components*r.byteLength;case ys:case bs:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Ms:case Ss:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Ya:case Ka:return Math.max(n,16)*Math.max(e,8)/4;case $a:case ja:return Math.max(n,8)*Math.max(e,8)/2;case Za:case Ja:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Qa:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case eo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case to:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case no:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case io:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case ro:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case so:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case ao:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case oo:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case co:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case lo:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case uo:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case ho:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case fo:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case po:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case mo:case xo:case go:return Math.ceil(n/4)*Math.ceil(e/4)*16;case _o:case vo:return Math.ceil(n/4)*Math.ceil(e/4)*8;case yo:case bo:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function hh(n){switch(n){case Gn:case Ll:return{byteLength:1,components:1};case Nr:case Dl:case vr:return{byteLength:2,components:1};case Io:case Uo:return{byteLength:2,components:4};case zi:case Do:case kn:return{byteLength:4,components:1};case Il:case Ul:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Lo}}));typeof window<"u"&&(window.__THREE__?Ke("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Lo);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Ql(){let n=null,e=!1,t=null,i=null;function r(s,a){t(s,a),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function fh(n){const e=new WeakMap;function t(o,c){const l=o.array,u=o.usage,d=l.byteLength,f=n.createBuffer();n.bindBuffer(c,f),n.bufferData(c,l,u),o.onUploadCallback();let p;if(l instanceof Float32Array)p=n.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)p=n.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=n.SHORT;else if(l instanceof Uint32Array)p=n.UNSIGNED_INT;else if(l instanceof Int32Array)p=n.INT;else if(l instanceof Int8Array)p=n.BYTE;else if(l instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:d}}function i(o,c,l){const u=c.array,d=c.updateRanges;if(n.bindBuffer(l,o),d.length===0)n.bufferSubData(l,0,u);else{d.sort((p,v)=>p.start-v.start);let f=0;for(let p=1;p<d.length;p++){const v=d[f],b=d[p];b.start<=v.start+v.count+1?v.count=Math.max(v.count,b.start+b.count-v.start):(++f,d[f]=b)}d.length=f+1;for(let p=0,v=d.length;p<v;p++){const b=d[p];n.bufferSubData(l,b.start*u.BYTES_PER_ELEMENT,u,b.start,b.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(n.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,o,c),l.version=o.version}}return{get:r,remove:s,update:a}}var ph=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,mh=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,xh=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,gh=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,_h=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,vh=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,yh=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,bh=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Mh=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Sh=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Eh=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Th=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Ah=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,wh=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Rh=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Ch=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Ph=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Lh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Dh=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Ih=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Uh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Fh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Nh=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Oh=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,zh=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Bh=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,kh=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Vh=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Gh=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Hh=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Wh="gl_FragColor = linearToOutputTexel( gl_FragColor );",Xh=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,qh=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,$h=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Yh=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,jh=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Kh=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Zh=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Jh=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Qh=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,ef=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,tf=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,nf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,rf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,sf=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,af=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,of=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,cf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lf=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,uf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,df=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,hf=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,ff=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 uv = vec2( roughness, dotNV );
	return texture2D( dfgLUT, uv ).rg;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = DFGApprox( vec3(0.0, 0.0, 1.0), vec3(sqrt(1.0 - dotNV * dotNV), 0.0, dotNV), material.roughness );
	vec2 dfgL = DFGApprox( vec3(0.0, 0.0, 1.0), vec3(sqrt(1.0 - dotNL * dotNL), 0.0, dotNL), material.roughness );
	vec3 FssEss_V = material.specularColor * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColor * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColor + ( 1.0 - material.specularColor ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,pf=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,mf=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,xf=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,gf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,_f=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,vf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,yf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,bf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Mf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Sf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Ef=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Tf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Af=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,wf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Rf=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Cf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Pf=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Lf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Df=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,If=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Uf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ff=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Nf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Of=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,zf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Bf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,kf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Vf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Gf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Hf=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Wf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Xf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,qf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,$f=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Yf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,jf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Kf=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Zf=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Jf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Qf=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,ep=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,tp=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,np=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,ip=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,rp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,sp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,ap=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,op=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,cp=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,lp=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,up=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,dp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,hp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,fp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const pp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,mp=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,xp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,gp=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,_p=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,vp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,yp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,bp=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Mp=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Sp=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Ep=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Tp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ap=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,wp=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Rp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Cp=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Pp=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Lp=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Dp=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Ip=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Up=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Fp=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Np=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Op=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,zp=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Bp=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,kp=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Vp=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Gp=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Hp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Wp=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Xp=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,qp=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,$p=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Qe={alphahash_fragment:ph,alphahash_pars_fragment:mh,alphamap_fragment:xh,alphamap_pars_fragment:gh,alphatest_fragment:_h,alphatest_pars_fragment:vh,aomap_fragment:yh,aomap_pars_fragment:bh,batching_pars_vertex:Mh,batching_vertex:Sh,begin_vertex:Eh,beginnormal_vertex:Th,bsdfs:Ah,iridescence_fragment:wh,bumpmap_pars_fragment:Rh,clipping_planes_fragment:Ch,clipping_planes_pars_fragment:Ph,clipping_planes_pars_vertex:Lh,clipping_planes_vertex:Dh,color_fragment:Ih,color_pars_fragment:Uh,color_pars_vertex:Fh,color_vertex:Nh,common:Oh,cube_uv_reflection_fragment:zh,defaultnormal_vertex:Bh,displacementmap_pars_vertex:kh,displacementmap_vertex:Vh,emissivemap_fragment:Gh,emissivemap_pars_fragment:Hh,colorspace_fragment:Wh,colorspace_pars_fragment:Xh,envmap_fragment:qh,envmap_common_pars_fragment:$h,envmap_pars_fragment:Yh,envmap_pars_vertex:jh,envmap_physical_pars_fragment:of,envmap_vertex:Kh,fog_vertex:Zh,fog_pars_vertex:Jh,fog_fragment:Qh,fog_pars_fragment:ef,gradientmap_pars_fragment:tf,lightmap_pars_fragment:nf,lights_lambert_fragment:rf,lights_lambert_pars_fragment:sf,lights_pars_begin:af,lights_toon_fragment:cf,lights_toon_pars_fragment:lf,lights_phong_fragment:uf,lights_phong_pars_fragment:df,lights_physical_fragment:hf,lights_physical_pars_fragment:ff,lights_fragment_begin:pf,lights_fragment_maps:mf,lights_fragment_end:xf,logdepthbuf_fragment:gf,logdepthbuf_pars_fragment:_f,logdepthbuf_pars_vertex:vf,logdepthbuf_vertex:yf,map_fragment:bf,map_pars_fragment:Mf,map_particle_fragment:Sf,map_particle_pars_fragment:Ef,metalnessmap_fragment:Tf,metalnessmap_pars_fragment:Af,morphinstance_vertex:wf,morphcolor_vertex:Rf,morphnormal_vertex:Cf,morphtarget_pars_vertex:Pf,morphtarget_vertex:Lf,normal_fragment_begin:Df,normal_fragment_maps:If,normal_pars_fragment:Uf,normal_pars_vertex:Ff,normal_vertex:Nf,normalmap_pars_fragment:Of,clearcoat_normal_fragment_begin:zf,clearcoat_normal_fragment_maps:Bf,clearcoat_pars_fragment:kf,iridescence_pars_fragment:Vf,opaque_fragment:Gf,packing:Hf,premultiplied_alpha_fragment:Wf,project_vertex:Xf,dithering_fragment:qf,dithering_pars_fragment:$f,roughnessmap_fragment:Yf,roughnessmap_pars_fragment:jf,shadowmap_pars_fragment:Kf,shadowmap_pars_vertex:Zf,shadowmap_vertex:Jf,shadowmask_pars_fragment:Qf,skinbase_vertex:ep,skinning_pars_vertex:tp,skinning_vertex:np,skinnormal_vertex:ip,specularmap_fragment:rp,specularmap_pars_fragment:sp,tonemapping_fragment:ap,tonemapping_pars_fragment:op,transmission_fragment:cp,transmission_pars_fragment:lp,uv_pars_fragment:up,uv_pars_vertex:dp,uv_vertex:hp,worldpos_vertex:fp,background_vert:pp,background_frag:mp,backgroundCube_vert:xp,backgroundCube_frag:gp,cube_vert:_p,cube_frag:vp,depth_vert:yp,depth_frag:bp,distanceRGBA_vert:Mp,distanceRGBA_frag:Sp,equirect_vert:Ep,equirect_frag:Tp,linedashed_vert:Ap,linedashed_frag:wp,meshbasic_vert:Rp,meshbasic_frag:Cp,meshlambert_vert:Pp,meshlambert_frag:Lp,meshmatcap_vert:Dp,meshmatcap_frag:Ip,meshnormal_vert:Up,meshnormal_frag:Fp,meshphong_vert:Np,meshphong_frag:Op,meshphysical_vert:zp,meshphysical_frag:Bp,meshtoon_vert:kp,meshtoon_frag:Vp,points_vert:Gp,points_frag:Hp,shadow_vert:Wp,shadow_frag:Xp,sprite_vert:qp,sprite_frag:$p},ve={common:{diffuse:{value:new at(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Je},alphaMap:{value:null},alphaMapTransform:{value:new Je},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Je}},envmap:{envMap:{value:null},envMapRotation:{value:new Je},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Je}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Je}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Je},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Je},normalScale:{value:new rt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Je},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Je}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Je}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Je}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new at(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new at(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Je},alphaTest:{value:0},uvTransform:{value:new Je}},sprite:{diffuse:{value:new at(16777215)},opacity:{value:1},center:{value:new rt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Je},alphaMap:{value:null},alphaMapTransform:{value:new Je},alphaTest:{value:0}}},Bn={basic:{uniforms:en([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.fog]),vertexShader:Qe.meshbasic_vert,fragmentShader:Qe.meshbasic_frag},lambert:{uniforms:en([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,ve.lights,{emissive:{value:new at(0)}}]),vertexShader:Qe.meshlambert_vert,fragmentShader:Qe.meshlambert_frag},phong:{uniforms:en([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,ve.lights,{emissive:{value:new at(0)},specular:{value:new at(1118481)},shininess:{value:30}}]),vertexShader:Qe.meshphong_vert,fragmentShader:Qe.meshphong_frag},standard:{uniforms:en([ve.common,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.roughnessmap,ve.metalnessmap,ve.fog,ve.lights,{emissive:{value:new at(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Qe.meshphysical_vert,fragmentShader:Qe.meshphysical_frag},toon:{uniforms:en([ve.common,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.gradientmap,ve.fog,ve.lights,{emissive:{value:new at(0)}}]),vertexShader:Qe.meshtoon_vert,fragmentShader:Qe.meshtoon_frag},matcap:{uniforms:en([ve.common,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,{matcap:{value:null}}]),vertexShader:Qe.meshmatcap_vert,fragmentShader:Qe.meshmatcap_frag},points:{uniforms:en([ve.points,ve.fog]),vertexShader:Qe.points_vert,fragmentShader:Qe.points_frag},dashed:{uniforms:en([ve.common,ve.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Qe.linedashed_vert,fragmentShader:Qe.linedashed_frag},depth:{uniforms:en([ve.common,ve.displacementmap]),vertexShader:Qe.depth_vert,fragmentShader:Qe.depth_frag},normal:{uniforms:en([ve.common,ve.bumpmap,ve.normalmap,ve.displacementmap,{opacity:{value:1}}]),vertexShader:Qe.meshnormal_vert,fragmentShader:Qe.meshnormal_frag},sprite:{uniforms:en([ve.sprite,ve.fog]),vertexShader:Qe.sprite_vert,fragmentShader:Qe.sprite_frag},background:{uniforms:{uvTransform:{value:new Je},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Qe.background_vert,fragmentShader:Qe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Je}},vertexShader:Qe.backgroundCube_vert,fragmentShader:Qe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Qe.cube_vert,fragmentShader:Qe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Qe.equirect_vert,fragmentShader:Qe.equirect_frag},distanceRGBA:{uniforms:en([ve.common,ve.displacementmap,{referencePosition:{value:new B},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Qe.distanceRGBA_vert,fragmentShader:Qe.distanceRGBA_frag},shadow:{uniforms:en([ve.lights,ve.fog,{color:{value:new at(0)},opacity:{value:1}}]),vertexShader:Qe.shadow_vert,fragmentShader:Qe.shadow_frag}};Bn.physical={uniforms:en([Bn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Je},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Je},clearcoatNormalScale:{value:new rt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Je},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Je},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Je},sheen:{value:0},sheenColor:{value:new at(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Je},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Je},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Je},transmissionSamplerSize:{value:new rt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Je},attenuationDistance:{value:0},attenuationColor:{value:new at(0)},specularColor:{value:new at(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Je},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Je},anisotropyVector:{value:new rt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Je}}]),vertexShader:Qe.meshphysical_vert,fragmentShader:Qe.meshphysical_frag};const _s={r:0,b:0,g:0},Pi=new Un,Yp=new xt;function jp(n,e,t,i,r,s,a){const o=new at(0);let c=s===!0?0:1,l,u,d=null,f=0,p=null;function v(A){let E=A.isScene===!0?A.background:null;return E&&E.isTexture&&(E=(A.backgroundBlurriness>0?t:e).get(E)),E}function b(A){let E=!1;const M=v(A);M===null?h(o,c):M&&M.isColor&&(h(M,1),E=!0);const g=n.xr.getEnvironmentBlendMode();g==="additive"?i.buffers.color.setClear(0,0,0,1,a):g==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(n.autoClear||E)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(A,E){const M=v(E);M&&(M.isCubeTexture||M.mapping===Bs)?(u===void 0&&(u=new nn(new Wi(1,1,1),new ai({name:"BackgroundCubeMaterial",uniforms:gr(Bn.backgroundCube.uniforms),vertexShader:Bn.backgroundCube.vertexShader,fragmentShader:Bn.backgroundCube.fragmentShader,side:ln,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(g,R,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),Pi.copy(E.backgroundRotation),Pi.x*=-1,Pi.y*=-1,Pi.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(Pi.y*=-1,Pi.z*=-1),u.material.uniforms.envMap.value=M,u.material.uniforms.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Yp.makeRotationFromEuler(Pi)),u.material.toneMapped=dt.getTransfer(M.colorSpace)!==_t,(d!==M||f!==M.version||p!==n.toneMapping)&&(u.material.needsUpdate=!0,d=M,f=M.version,p=n.toneMapping),u.layers.enableAll(),A.unshift(u,u.geometry,u.material,0,0,null)):M&&M.isTexture&&(l===void 0&&(l=new nn(new _r(2,2),new ai({name:"BackgroundMaterial",uniforms:gr(Bn.background.uniforms),vertexShader:Bn.background.vertexShader,fragmentShader:Bn.background.fragmentShader,side:Ei,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(l)),l.material.uniforms.t2D.value=M,l.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,l.material.toneMapped=dt.getTransfer(M.colorSpace)!==_t,M.matrixAutoUpdate===!0&&M.updateMatrix(),l.material.uniforms.uvTransform.value.copy(M.matrix),(d!==M||f!==M.version||p!==n.toneMapping)&&(l.material.needsUpdate=!0,d=M,f=M.version,p=n.toneMapping),l.layers.enableAll(),A.unshift(l,l.geometry,l.material,0,0,null))}function h(A,E){A.getRGB(_s,Wl(n)),i.buffers.color.setClear(_s.r,_s.g,_s.b,E,a)}function w(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(A,E=1){o.set(A),c=E,h(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(A){c=A,h(o,c)},render:b,addToRenderList:m,dispose:w}}function Kp(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=f(null);let s=r,a=!1;function o(_,C,N,I,H){let X=!1;const Z=d(I,N,C);s!==Z&&(s=Z,l(s.object)),X=p(_,I,N,H),X&&v(_,I,N,H),H!==null&&e.update(H,n.ELEMENT_ARRAY_BUFFER),(X||a)&&(a=!1,E(_,C,N,I),H!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(H).buffer))}function c(){return n.createVertexArray()}function l(_){return n.bindVertexArray(_)}function u(_){return n.deleteVertexArray(_)}function d(_,C,N){const I=N.wireframe===!0;let H=i[_.id];H===void 0&&(H={},i[_.id]=H);let X=H[C.id];X===void 0&&(X={},H[C.id]=X);let Z=X[I];return Z===void 0&&(Z=f(c()),X[I]=Z),Z}function f(_){const C=[],N=[],I=[];for(let H=0;H<t;H++)C[H]=0,N[H]=0,I[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:N,attributeDivisors:I,object:_,attributes:{},index:null}}function p(_,C,N,I){const H=s.attributes,X=C.attributes;let Z=0;const re=N.getAttributes();for(const K in re)if(re[K].location>=0){const Q=H[K];let fe=X[K];if(fe===void 0&&(K==="instanceMatrix"&&_.instanceMatrix&&(fe=_.instanceMatrix),K==="instanceColor"&&_.instanceColor&&(fe=_.instanceColor)),Q===void 0||Q.attribute!==fe||fe&&Q.data!==fe.data)return!0;Z++}return s.attributesNum!==Z||s.index!==I}function v(_,C,N,I){const H={},X=C.attributes;let Z=0;const re=N.getAttributes();for(const K in re)if(re[K].location>=0){let Q=X[K];Q===void 0&&(K==="instanceMatrix"&&_.instanceMatrix&&(Q=_.instanceMatrix),K==="instanceColor"&&_.instanceColor&&(Q=_.instanceColor));const fe={};fe.attribute=Q,Q&&Q.data&&(fe.data=Q.data),H[K]=fe,Z++}s.attributes=H,s.attributesNum=Z,s.index=I}function b(){const _=s.newAttributes;for(let C=0,N=_.length;C<N;C++)_[C]=0}function m(_){h(_,0)}function h(_,C){const N=s.newAttributes,I=s.enabledAttributes,H=s.attributeDivisors;N[_]=1,I[_]===0&&(n.enableVertexAttribArray(_),I[_]=1),H[_]!==C&&(n.vertexAttribDivisor(_,C),H[_]=C)}function w(){const _=s.newAttributes,C=s.enabledAttributes;for(let N=0,I=C.length;N<I;N++)C[N]!==_[N]&&(n.disableVertexAttribArray(N),C[N]=0)}function A(_,C,N,I,H,X,Z){Z===!0?n.vertexAttribIPointer(_,C,N,H,X):n.vertexAttribPointer(_,C,N,I,H,X)}function E(_,C,N,I){b();const H=I.attributes,X=N.getAttributes(),Z=C.defaultAttributeValues;for(const re in X){const K=X[re];if(K.location>=0){let ne=H[re];if(ne===void 0&&(re==="instanceMatrix"&&_.instanceMatrix&&(ne=_.instanceMatrix),re==="instanceColor"&&_.instanceColor&&(ne=_.instanceColor)),ne!==void 0){const Q=ne.normalized,fe=ne.itemSize,we=e.get(ne);if(we===void 0)continue;const Oe=we.buffer,We=we.type,ct=we.bytesPerElement,te=We===n.INT||We===n.UNSIGNED_INT||ne.gpuType===Do;if(ne.isInterleavedBufferAttribute){const ce=ne.data,Ee=ce.stride,Ye=ne.offset;if(ce.isInstancedInterleavedBuffer){for(let Le=0;Le<K.locationSize;Le++)h(K.location+Le,ce.meshPerAttribute);_.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=ce.meshPerAttribute*ce.count)}else for(let Le=0;Le<K.locationSize;Le++)m(K.location+Le);n.bindBuffer(n.ARRAY_BUFFER,Oe);for(let Le=0;Le<K.locationSize;Le++)A(K.location+Le,fe/K.locationSize,We,Q,Ee*ct,(Ye+fe/K.locationSize*Le)*ct,te)}else{if(ne.isInstancedBufferAttribute){for(let ce=0;ce<K.locationSize;ce++)h(K.location+ce,ne.meshPerAttribute);_.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=ne.meshPerAttribute*ne.count)}else for(let ce=0;ce<K.locationSize;ce++)m(K.location+ce);n.bindBuffer(n.ARRAY_BUFFER,Oe);for(let ce=0;ce<K.locationSize;ce++)A(K.location+ce,fe/K.locationSize,We,Q,fe*ct,fe/K.locationSize*ce*ct,te)}}else if(Z!==void 0){const Q=Z[re];if(Q!==void 0)switch(Q.length){case 2:n.vertexAttrib2fv(K.location,Q);break;case 3:n.vertexAttrib3fv(K.location,Q);break;case 4:n.vertexAttrib4fv(K.location,Q);break;default:n.vertexAttrib1fv(K.location,Q)}}}}w()}function M(){P();for(const _ in i){const C=i[_];for(const N in C){const I=C[N];for(const H in I)u(I[H].object),delete I[H];delete C[N]}delete i[_]}}function g(_){if(i[_.id]===void 0)return;const C=i[_.id];for(const N in C){const I=C[N];for(const H in I)u(I[H].object),delete I[H];delete C[N]}delete i[_.id]}function R(_){for(const C in i){const N=i[C];if(N[_.id]===void 0)continue;const I=N[_.id];for(const H in I)u(I[H].object),delete I[H];delete N[_.id]}}function P(){x(),a=!0,s!==r&&(s=r,l(s.object))}function x(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:P,resetDefaultState:x,dispose:M,releaseStatesOfGeometry:g,releaseStatesOfProgram:R,initAttributes:b,enableAttribute:m,disableUnusedAttributes:w}}function Zp(n,e,t){let i;function r(l){i=l}function s(l,u){n.drawArrays(i,l,u),t.update(u,i,1)}function a(l,u,d){d!==0&&(n.drawArraysInstanced(i,l,u,d),t.update(u,i,d))}function o(l,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,u,0,d);let p=0;for(let v=0;v<d;v++)p+=u[v];t.update(p,i,1)}function c(l,u,d,f){if(d===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let v=0;v<l.length;v++)a(l[v],u[v],f[v]);else{p.multiDrawArraysInstancedWEBGL(i,l,0,u,0,f,0,d);let v=0;for(let b=0;b<d;b++)v+=u[b]*f[b];t.update(v,i,1)}}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function Jp(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const R=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(R){return!(R!==Dn&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(R){const P=R===vr&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==Gn&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==kn&&!P)}function c(R){if(R==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const u=c(l);u!==l&&(Ke("WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const d=t.logarithmicDepthBuffer===!0,f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),b=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),h=n.getParameter(n.MAX_VERTEX_ATTRIBS),w=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),A=n.getParameter(n.MAX_VARYING_VECTORS),E=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),M=v>0,g=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:v,maxTextureSize:b,maxCubemapSize:m,maxAttributes:h,maxVertexUniforms:w,maxVaryings:A,maxFragmentUniforms:E,vertexTextures:M,maxSamples:g}}function Qp(n){const e=this;let t=null,i=0,r=!1,s=!1;const a=new xi,o=new Je,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){const p=d.length!==0||f||i!==0||r;return r=f,i=d.length,p},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,f){t=u(d,f,0)},this.setState=function(d,f,p){const v=d.clippingPlanes,b=d.clipIntersection,m=d.clipShadows,h=n.get(d);if(!r||v===null||v.length===0||s&&!m)s?u(null):l();else{const w=s?0:i,A=w*4;let E=h.clippingState||null;c.value=E,E=u(v,f,A,p);for(let M=0;M!==A;++M)E[M]=t[M];h.clippingState=E,this.numIntersection=b?this.numPlanes:0,this.numPlanes+=w}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(d,f,p,v){const b=d!==null?d.length:0;let m=null;if(b!==0){if(m=c.value,v!==!0||m===null){const h=p+b*4,w=f.matrixWorldInverse;o.getNormalMatrix(w),(m===null||m.length<h)&&(m=new Float32Array(h));for(let A=0,E=p;A!==b;++A,E+=4)a.copy(d[A]).applyMatrix4(w,o),a.normal.toArray(m,E),m[E+3]=a.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=b,e.numIntersection=0,m}}function e0(n){let e=new WeakMap;function t(a,o){return o===Wa?a.mapping=pr:o===Xa&&(a.mapping=mr),a}function i(a){if(a&&a.isTexture){const o=a.mapping;if(o===Wa||o===Xa)if(e.has(a)){const c=e.get(a).texture;return t(c,a.mapping)}else{const c=a.image;if(c&&c.height>0){const l=new $d(c.height);return l.fromEquirectangularTexture(n,a),e.set(a,l),a.addEventListener("dispose",r),t(l.texture,a.mapping)}else return null}}return a}function r(a){const o=a.target;o.removeEventListener("dispose",r);const c=e.get(o);c!==void 0&&(e.delete(o),c.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}const vi=4,Xc=[.125,.215,.35,.446,.526,.582],Ii=20,t0=256,Dr=new Jl,qc=new at;let wa=null,Ra=0,Ca=0,Pa=!1;const n0=new B;class $c{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,r=100,s={}){const{size:a=256,position:o=n0}=s;wa=this._renderer.getRenderTarget(),Ra=this._renderer.getActiveCubeFace(),Ca=this._renderer.getActiveMipmapLevel(),Pa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,i,r,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Kc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=jc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(wa,Ra,Ca),this._renderer.xr.enabled=Pa,e.scissorTest=!1,ar(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===pr||e.mapping===mr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),wa=this._renderer.getRenderTarget(),Ra=this._renderer.getActiveCubeFace(),Ca=this._renderer.getActiveMipmapLevel(),Pa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:bn,minFilter:bn,generateMipmaps:!1,type:vr,format:Dn,colorSpace:xr,depthBuffer:!1},r=Yc(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Yc(e,t,i);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=i0(s)),this._blurMaterial=s0(s,e,t),this._ggxMaterial=r0(s,e,t)}return r}_compileMaterial(e){const t=new nn(new kt,e);this._renderer.compile(t,Dr)}_sceneToCubeUV(e,t,i,r,s){const c=new cn(90,1,t,i),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,f=d.autoClear,p=d.toneMapping;d.getClearColor(qc),d.toneMapping=yi,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(r),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new nn(new Wi,new _i({name:"PMREM.Background",side:ln,depthWrite:!1,depthTest:!1})));const b=this._backgroundBox,m=b.material;let h=!1;const w=e.background;w?w.isColor&&(m.color.copy(w),e.background=null,h=!0):(m.color.copy(qc),h=!0);for(let A=0;A<6;A++){const E=A%3;E===0?(c.up.set(0,l[A],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x+u[A],s.y,s.z)):E===1?(c.up.set(0,0,l[A]),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y+u[A],s.z)):(c.up.set(0,l[A],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y,s.z+u[A]));const M=this._cubeSize;ar(r,E*M,A>2?M:0,M,M),d.setRenderTarget(r),h&&d.render(b,c),d.render(e,c)}d.toneMapping=p,d.autoClear=f,e.background=w}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===pr||e.mapping===mr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Kc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=jc());const s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const o=s.uniforms;o.envMap.value=e;const c=this._cubeSize;ar(t,0,0,3*c,2*c),i.setRenderTarget(t),i.render(a,Dr)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=i}_applyGGXFilter(e,t,i){const r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;const c=a.uniforms,l=i/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),d=Math.sqrt(l*l-u*u),f=.05+l*.95,p=d*f,{_lodMax:v}=this,b=this._sizeLods[i],m=3*b*(i>v-vi?i-v+vi:0),h=4*(this._cubeSize-b);c.envMap.value=e.texture,c.roughness.value=p,c.mipInt.value=v-t,ar(s,m,h,3*b,2*b),r.setRenderTarget(s),r.render(o,Dr),c.envMap.value=s.texture,c.roughness.value=0,c.mipInt.value=v-i,ar(e,m,h,3*b,2*b),r.setRenderTarget(e),r.render(o,Dr)}_blur(e,t,i,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,r,"latitudinal",s),this._halfBlur(a,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&Pt("blur direction must be either latitudinal or longitudinal!");const u=3,d=this._lodMeshes[r];d.material=l;const f=l.uniforms,p=this._sizeLods[i]-1,v=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*Ii-1),b=s/v,m=isFinite(s)?1+Math.floor(u*b):Ii;m>Ii&&Ke(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Ii}`);const h=[];let w=0;for(let R=0;R<Ii;++R){const P=R/b,x=Math.exp(-P*P/2);h.push(x),R===0?w+=x:R<m&&(w+=2*x)}for(let R=0;R<h.length;R++)h[R]=h[R]/w;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=h,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:A}=this;f.dTheta.value=v,f.mipInt.value=A-i;const E=this._sizeLods[r],M=3*E*(r>A-vi?r-A+vi:0),g=4*(this._cubeSize-E);ar(t,M,g,3*E,2*E),c.setRenderTarget(t),c.render(d,Dr)}}function i0(n){const e=[],t=[],i=[];let r=n;const s=n-vi+1+Xc.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);e.push(o);let c=1/o;a>n-vi?c=Xc[a-n+vi-1]:a===0&&(c=0),t.push(c);const l=1/(o-2),u=-l,d=1+l,f=[u,u,d,u,d,d,u,u,d,d,u,d],p=6,v=6,b=3,m=2,h=1,w=new Float32Array(b*v*p),A=new Float32Array(m*v*p),E=new Float32Array(h*v*p);for(let g=0;g<p;g++){const R=g%3*2/3-1,P=g>2?0:-1,x=[R,P,0,R+2/3,P,0,R+2/3,P+1,0,R,P,0,R+2/3,P+1,0,R,P+1,0];w.set(x,b*v*g),A.set(f,m*v*g);const _=[g,g,g,g,g,g];E.set(_,h*v*g)}const M=new kt;M.setAttribute("position",new Sn(w,b)),M.setAttribute("uv",new Sn(A,m)),M.setAttribute("faceIndex",new Sn(E,h)),i.push(new nn(M,null)),r>vi&&r--}return{lodMeshes:i,sizeLods:e,sigmas:t}}function Yc(n,e,t){const i=new Bi(n,e,t);return i.texture.mapping=Bs,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function ar(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function r0(n,e,t){return new ai({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:t0,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Gs(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 3.2: Transform view direction to hemisphere configuration
				vec3 Vh = normalize(vec3(alpha * V.x, alpha * V.y, V.z));

				// Section 4.1: Orthonormal basis
				float lensq = Vh.x * Vh.x + Vh.y * Vh.y;
				vec3 T1 = lensq > 0.0 ? vec3(-Vh.y, Vh.x, 0.0) / sqrt(lensq) : vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(Vh, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + Vh.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * Vh;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:ni,depthTest:!1,depthWrite:!1})}function s0(n,e,t){const i=new Float32Array(Ii),r=new B(0,1,0);return new ai({name:"SphericalGaussianBlur",defines:{n:Ii,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Gs(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:ni,depthTest:!1,depthWrite:!1})}function jc(){return new ai({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Gs(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:ni,depthTest:!1,depthWrite:!1})}function Kc(){return new ai({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Gs(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ni,depthTest:!1,depthWrite:!1})}function Gs(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function a0(n){let e=new WeakMap,t=null;function i(o){if(o&&o.isTexture){const c=o.mapping,l=c===Wa||c===Xa,u=c===pr||c===mr;if(l||u){let d=e.get(o);const f=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==f)return t===null&&(t=new $c(n)),d=l?t.fromEquirectangular(o,d):t.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),d.texture;if(d!==void 0)return d.texture;{const p=o.image;return l&&p&&p.height>0||u&&p&&r(p)?(t===null&&(t=new $c(n)),d=l?t.fromEquirectangular(o):t.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),o.addEventListener("dispose",s),d.texture):null}}}return o}function r(o){let c=0;const l=6;for(let u=0;u<l;u++)o[u]!==void 0&&c++;return c===l}function s(o){const c=o.target;c.removeEventListener("dispose",s);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:a}}function o0(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const r=n.getExtension(i);return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const r=t(i);return r===null&&kr("WebGLRenderer: "+i+" extension not supported."),r}}}function c0(n,e,t,i){const r={},s=new WeakMap;function a(d){const f=d.target;f.index!==null&&e.remove(f.index);for(const v in f.attributes)e.remove(f.attributes[v]);f.removeEventListener("dispose",a),delete r[f.id];const p=s.get(f);p&&(e.remove(p),s.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function o(d,f){return r[f.id]===!0||(f.addEventListener("dispose",a),r[f.id]=!0,t.memory.geometries++),f}function c(d){const f=d.attributes;for(const p in f)e.update(f[p],n.ARRAY_BUFFER)}function l(d){const f=[],p=d.index,v=d.attributes.position;let b=0;if(p!==null){const w=p.array;b=p.version;for(let A=0,E=w.length;A<E;A+=3){const M=w[A+0],g=w[A+1],R=w[A+2];f.push(M,g,g,R,R,M)}}else if(v!==void 0){const w=v.array;b=v.version;for(let A=0,E=w.length/3-1;A<E;A+=3){const M=A+0,g=A+1,R=A+2;f.push(M,g,g,R,R,M)}}else return;const m=new(Bl(f)?Hl:Gl)(f,1);m.version=b;const h=s.get(d);h&&e.remove(h),s.set(d,m)}function u(d){const f=s.get(d);if(f){const p=d.index;p!==null&&f.version<p.version&&l(d)}else l(d);return s.get(d)}return{get:o,update:c,getWireframeAttribute:u}}function l0(n,e,t){let i;function r(f){i=f}let s,a;function o(f){s=f.type,a=f.bytesPerElement}function c(f,p){n.drawElements(i,p,s,f*a),t.update(p,i,1)}function l(f,p,v){v!==0&&(n.drawElementsInstanced(i,p,s,f*a,v),t.update(p,i,v))}function u(f,p,v){if(v===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,s,f,0,v);let m=0;for(let h=0;h<v;h++)m+=p[h];t.update(m,i,1)}function d(f,p,v,b){if(v===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let h=0;h<f.length;h++)l(f[h]/a,p[h],b[h]);else{m.multiDrawElementsInstancedWEBGL(i,p,0,s,f,0,b,0,v);let h=0;for(let w=0;w<v;w++)h+=p[w]*b[w];t.update(h,i,1)}}this.setMode=r,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function u0(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(s/3);break;case n.LINES:t.lines+=o*(s/2);break;case n.LINE_STRIP:t.lines+=o*(s-1);break;case n.LINE_LOOP:t.lines+=o*s;break;case n.POINTS:t.points+=o*s;break;default:Pt("WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function d0(n,e,t){const i=new WeakMap,r=new vt;function s(a,o,c){const l=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=u!==void 0?u.length:0;let f=i.get(o);if(f===void 0||f.count!==d){let _=function(){P.dispose(),i.delete(o),o.removeEventListener("dispose",_)};var p=_;f!==void 0&&f.texture.dispose();const v=o.morphAttributes.position!==void 0,b=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,h=o.morphAttributes.position||[],w=o.morphAttributes.normal||[],A=o.morphAttributes.color||[];let E=0;v===!0&&(E=1),b===!0&&(E=2),m===!0&&(E=3);let M=o.attributes.position.count*E,g=1;M>e.maxTextureSize&&(g=Math.ceil(M/e.maxTextureSize),M=e.maxTextureSize);const R=new Float32Array(M*g*4*d),P=new kl(R,M,g,d);P.type=kn,P.needsUpdate=!0;const x=E*4;for(let C=0;C<d;C++){const N=h[C],I=w[C],H=A[C],X=M*g*4*C;for(let Z=0;Z<N.count;Z++){const re=Z*x;v===!0&&(r.fromBufferAttribute(N,Z),R[X+re+0]=r.x,R[X+re+1]=r.y,R[X+re+2]=r.z,R[X+re+3]=0),b===!0&&(r.fromBufferAttribute(I,Z),R[X+re+4]=r.x,R[X+re+5]=r.y,R[X+re+6]=r.z,R[X+re+7]=0),m===!0&&(r.fromBufferAttribute(H,Z),R[X+re+8]=r.x,R[X+re+9]=r.y,R[X+re+10]=r.z,R[X+re+11]=H.itemSize===4?r.w:1)}}f={count:d,texture:P,size:new rt(M,g)},i.set(o,f),o.addEventListener("dispose",_)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let v=0;for(let m=0;m<l.length;m++)v+=l[m];const b=o.morphTargetsRelative?1:1-v;c.getUniforms().setValue(n,"morphTargetBaseInfluence",b),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",f.texture,t),c.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:s}}function h0(n,e,t,i){let r=new WeakMap;function s(c){const l=i.render.frame,u=c.geometry,d=e.get(c,u);if(r.get(d)!==l&&(e.update(d),r.set(d,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),r.get(c)!==l&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),r.set(c,l))),c.isSkinnedMesh){const f=c.skeleton;r.get(f)!==l&&(f.update(),r.set(f,l))}return d}function a(){r=new WeakMap}function o(c){const l=c.target;l.removeEventListener("dispose",o),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:s,dispose:a}}const eu=new jt,Zc=new Kl(1,1),tu=new kl,nu=new Pd,iu=new ql,Jc=[],Qc=[],el=new Float32Array(16),tl=new Float32Array(9),nl=new Float32Array(4);function Mr(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=Jc[r];if(s===void 0&&(s=new Float32Array(r),Jc[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(s,o)}return s}function zt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Bt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Hs(n,e){let t=Qc[e];t===void 0&&(t=new Int32Array(e),Qc[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function f0(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function p0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(zt(t,e))return;n.uniform2fv(this.addr,e),Bt(t,e)}}function m0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(zt(t,e))return;n.uniform3fv(this.addr,e),Bt(t,e)}}function x0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(zt(t,e))return;n.uniform4fv(this.addr,e),Bt(t,e)}}function g0(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(zt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Bt(t,e)}else{if(zt(t,i))return;nl.set(i),n.uniformMatrix2fv(this.addr,!1,nl),Bt(t,i)}}function _0(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(zt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Bt(t,e)}else{if(zt(t,i))return;tl.set(i),n.uniformMatrix3fv(this.addr,!1,tl),Bt(t,i)}}function v0(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(zt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Bt(t,e)}else{if(zt(t,i))return;el.set(i),n.uniformMatrix4fv(this.addr,!1,el),Bt(t,i)}}function y0(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function b0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(zt(t,e))return;n.uniform2iv(this.addr,e),Bt(t,e)}}function M0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(zt(t,e))return;n.uniform3iv(this.addr,e),Bt(t,e)}}function S0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(zt(t,e))return;n.uniform4iv(this.addr,e),Bt(t,e)}}function E0(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function T0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(zt(t,e))return;n.uniform2uiv(this.addr,e),Bt(t,e)}}function A0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(zt(t,e))return;n.uniform3uiv(this.addr,e),Bt(t,e)}}function w0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(zt(t,e))return;n.uniform4uiv(this.addr,e),Bt(t,e)}}function R0(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(Zc.compareFunction=zl,s=Zc):s=eu,t.setTexture2D(e||s,r)}function C0(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||nu,r)}function P0(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||iu,r)}function L0(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||tu,r)}function D0(n){switch(n){case 5126:return f0;case 35664:return p0;case 35665:return m0;case 35666:return x0;case 35674:return g0;case 35675:return _0;case 35676:return v0;case 5124:case 35670:return y0;case 35667:case 35671:return b0;case 35668:case 35672:return M0;case 35669:case 35673:return S0;case 5125:return E0;case 36294:return T0;case 36295:return A0;case 36296:return w0;case 35678:case 36198:case 36298:case 36306:case 35682:return R0;case 35679:case 36299:case 36307:return C0;case 35680:case 36300:case 36308:case 36293:return P0;case 36289:case 36303:case 36311:case 36292:return L0}}function I0(n,e){n.uniform1fv(this.addr,e)}function U0(n,e){const t=Mr(e,this.size,2);n.uniform2fv(this.addr,t)}function F0(n,e){const t=Mr(e,this.size,3);n.uniform3fv(this.addr,t)}function N0(n,e){const t=Mr(e,this.size,4);n.uniform4fv(this.addr,t)}function O0(n,e){const t=Mr(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function z0(n,e){const t=Mr(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function B0(n,e){const t=Mr(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function k0(n,e){n.uniform1iv(this.addr,e)}function V0(n,e){n.uniform2iv(this.addr,e)}function G0(n,e){n.uniform3iv(this.addr,e)}function H0(n,e){n.uniform4iv(this.addr,e)}function W0(n,e){n.uniform1uiv(this.addr,e)}function X0(n,e){n.uniform2uiv(this.addr,e)}function q0(n,e){n.uniform3uiv(this.addr,e)}function $0(n,e){n.uniform4uiv(this.addr,e)}function Y0(n,e,t){const i=this.cache,r=e.length,s=Hs(t,r);zt(i,s)||(n.uniform1iv(this.addr,s),Bt(i,s));for(let a=0;a!==r;++a)t.setTexture2D(e[a]||eu,s[a])}function j0(n,e,t){const i=this.cache,r=e.length,s=Hs(t,r);zt(i,s)||(n.uniform1iv(this.addr,s),Bt(i,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||nu,s[a])}function K0(n,e,t){const i=this.cache,r=e.length,s=Hs(t,r);zt(i,s)||(n.uniform1iv(this.addr,s),Bt(i,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||iu,s[a])}function Z0(n,e,t){const i=this.cache,r=e.length,s=Hs(t,r);zt(i,s)||(n.uniform1iv(this.addr,s),Bt(i,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||tu,s[a])}function J0(n){switch(n){case 5126:return I0;case 35664:return U0;case 35665:return F0;case 35666:return N0;case 35674:return O0;case 35675:return z0;case 35676:return B0;case 5124:case 35670:return k0;case 35667:case 35671:return V0;case 35668:case 35672:return G0;case 35669:case 35673:return H0;case 5125:return W0;case 36294:return X0;case 36295:return q0;case 36296:return $0;case 35678:case 36198:case 36298:case 36306:case 35682:return Y0;case 35679:case 36299:case 36307:return j0;case 35680:case 36300:case 36308:case 36293:return K0;case 36289:case 36303:case 36311:case 36292:return Z0}}class Q0{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=D0(t.type)}}class em{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=J0(t.type)}}class tm{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],i)}}}const La=/(\w+)(\])?(\[|\.)?/g;function il(n,e){n.seq.push(e),n.map[e.id]=e}function nm(n,e,t){const i=n.name,r=i.length;for(La.lastIndex=0;;){const s=La.exec(i),a=La.lastIndex;let o=s[1];const c=s[2]==="]",l=s[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===r){il(t,l===void 0?new Q0(o,n,e):new em(o,n,e));break}else{let d=t.map[o];d===void 0&&(d=new tm(o),il(t,d)),t=d}}}class Es{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(t,r),a=e.getUniformLocation(t,s.name);nm(s,a,this)}}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],c=i[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&i.push(a)}return i}}function rl(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const im=37297;let rm=0;function sm(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}const sl=new Je;function am(n){dt._getMatrix(sl,dt.workingColorSpace,n);const e=`mat3( ${sl.elements.map(t=>t.toFixed(4))} )`;switch(dt.getTransfer(n)){case Rs:return[e,"LinearTransferOETF"];case _t:return[e,"sRGBTransferOETF"];default:return Ke("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function al(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),s=(n.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+sm(n.getShaderSource(e),o)}else return s}function om(n,e){const t=am(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function cm(n,e){let t;switch(e){case sd:t="Linear";break;case ad:t="Reinhard";break;case od:t="Cineon";break;case Cl:t="ACESFilmic";break;case ld:t="AgX";break;case ud:t="Neutral";break;case cd:t="Custom";break;default:Ke("WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const vs=new B;function lm(){dt.getLuminanceCoefficients(vs);const n=vs.x.toFixed(4),e=vs.y.toFixed(4),t=vs.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function um(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ir).join(`
`)}function dm(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function hm(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),a=s.name;let o=1;s.type===n.FLOAT_MAT2&&(o=2),s.type===n.FLOAT_MAT3&&(o=3),s.type===n.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function Ir(n){return n!==""}function ol(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function cl(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const fm=/^[ \t]*#include +<([\w\d./]+)>/gm;function Eo(n){return n.replace(fm,mm)}const pm=new Map;function mm(n,e){let t=Qe[e];if(t===void 0){const i=pm.get(e);if(i!==void 0)t=Qe[i],Ke('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Eo(t)}const xm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ll(n){return n.replace(xm,gm)}function gm(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function ul(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function _m(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Al?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===wl?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Kn&&(e="SHADOWMAP_TYPE_VSM"),e}function vm(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case pr:case mr:e="ENVMAP_TYPE_CUBE";break;case Bs:e="ENVMAP_TYPE_CUBE_UV";break}return e}function ym(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case mr:e="ENVMAP_MODE_REFRACTION";break}return e}function bm(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Rl:e="ENVMAP_BLENDING_MULTIPLY";break;case id:e="ENVMAP_BLENDING_MIX";break;case rd:e="ENVMAP_BLENDING_ADD";break}return e}function Mm(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function Sm(n,e,t,i){const r=n.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=_m(t),l=vm(t),u=ym(t),d=bm(t),f=Mm(t),p=um(t),v=dm(s),b=r.createProgram();let m,h,w=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(Ir).join(`
`),m.length>0&&(m+=`
`),h=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(Ir).join(`
`),h.length>0&&(h+=`
`)):(m=[ul(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ir).join(`
`),h=[ul(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==yi?"#define TONE_MAPPING":"",t.toneMapping!==yi?Qe.tonemapping_pars_fragment:"",t.toneMapping!==yi?cm("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Qe.colorspace_pars_fragment,om("linearToOutputTexel",t.outputColorSpace),lm(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ir).join(`
`)),a=Eo(a),a=ol(a,t),a=cl(a,t),o=Eo(o),o=ol(o,t),o=cl(o,t),a=ll(a),o=ll(o),t.isRawShaderMaterial!==!0&&(w=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,h=["#define varying in",t.glslVersion===hc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===hc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+h);const A=w+m+a,E=w+h+o,M=rl(r,r.VERTEX_SHADER,A),g=rl(r,r.FRAGMENT_SHADER,E);r.attachShader(b,M),r.attachShader(b,g),t.index0AttributeName!==void 0?r.bindAttribLocation(b,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(b,0,"position"),r.linkProgram(b);function R(C){if(n.debug.checkShaderErrors){const N=r.getProgramInfoLog(b)||"",I=r.getShaderInfoLog(M)||"",H=r.getShaderInfoLog(g)||"",X=N.trim(),Z=I.trim(),re=H.trim();let K=!0,ne=!0;if(r.getProgramParameter(b,r.LINK_STATUS)===!1)if(K=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,b,M,g);else{const Q=al(r,M,"vertex"),fe=al(r,g,"fragment");Pt("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(b,r.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+X+`
`+Q+`
`+fe)}else X!==""?Ke("WebGLProgram: Program Info Log:",X):(Z===""||re==="")&&(ne=!1);ne&&(C.diagnostics={runnable:K,programLog:X,vertexShader:{log:Z,prefix:m},fragmentShader:{log:re,prefix:h}})}r.deleteShader(M),r.deleteShader(g),P=new Es(r,b),x=hm(r,b)}let P;this.getUniforms=function(){return P===void 0&&R(this),P};let x;this.getAttributes=function(){return x===void 0&&R(this),x};let _=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return _===!1&&(_=r.getProgramParameter(b,im)),_},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(b),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=rm++,this.cacheKey=e,this.usedTimes=1,this.program=b,this.vertexShader=M,this.fragmentShader=g,this}let Em=0;class Tm{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new Am(e),t.set(e,i)),i}}class Am{constructor(e){this.id=Em++,this.code=e,this.usedTimes=0}}function wm(n,e,t,i,r,s,a){const o=new Vo,c=new Tm,l=new Set,u=[],d=r.logarithmicDepthBuffer,f=r.vertexTextures;let p=r.precision;const v={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function b(x){return l.add(x),x===0?"uv":`uv${x}`}function m(x,_,C,N,I){const H=N.fog,X=I.geometry,Z=x.isMeshStandardMaterial?N.environment:null,re=(x.isMeshStandardMaterial?t:e).get(x.envMap||Z),K=re&&re.mapping===Bs?re.image.height:null,ne=v[x.type];x.precision!==null&&(p=r.getMaxPrecision(x.precision),p!==x.precision&&Ke("WebGLProgram.getParameters:",x.precision,"not supported, using",p,"instead."));const Q=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,fe=Q!==void 0?Q.length:0;let we=0;X.morphAttributes.position!==void 0&&(we=1),X.morphAttributes.normal!==void 0&&(we=2),X.morphAttributes.color!==void 0&&(we=3);let Oe,We,ct,te;if(ne){const ut=Bn[ne];Oe=ut.vertexShader,We=ut.fragmentShader}else Oe=x.vertexShader,We=x.fragmentShader,c.update(x),ct=c.getVertexShaderID(x),te=c.getFragmentShaderID(x);const ce=n.getRenderTarget(),Ee=n.state.buffers.depth.getReversed(),Ye=I.isInstancedMesh===!0,Le=I.isBatchedMesh===!0,et=!!x.map,Dt=!!x.matcap,tt=!!re,yt=!!x.aoMap,O=!!x.lightMap,nt=!!x.bumpMap,it=!!x.normalMap,pt=!!x.displacementMap,be=!!x.emissiveMap,St=!!x.metalnessMap,Fe=!!x.roughnessMap,$e=x.anisotropy>0,L=x.clearcoat>0,y=x.dispersion>0,W=x.iridescence>0,ie=x.sheen>0,ae=x.transmission>0,J=$e&&!!x.anisotropyMap,Re=L&&!!x.clearcoatMap,_e=L&&!!x.clearcoatNormalMap,ze=L&&!!x.clearcoatRoughnessMap,Ce=W&&!!x.iridescenceMap,le=W&&!!x.iridescenceThicknessMap,de=ie&&!!x.sheenColorMap,Ge=ie&&!!x.sheenRoughnessMap,ke=!!x.specularMap,ee=!!x.specularColorMap,qe=!!x.specularIntensityMap,z=ae&&!!x.transmissionMap,ge=ae&&!!x.thicknessMap,pe=!!x.gradientMap,me=!!x.alphaMap,ue=x.alphaTest>0,se=!!x.alphaHash,Se=!!x.extensions;let Xe=yi;x.toneMapped&&(ce===null||ce.isXRRenderTarget===!0)&&(Xe=n.toneMapping);const lt={shaderID:ne,shaderType:x.type,shaderName:x.name,vertexShader:Oe,fragmentShader:We,defines:x.defines,customVertexShaderID:ct,customFragmentShaderID:te,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:p,batching:Le,batchingColor:Le&&I._colorsTexture!==null,instancing:Ye,instancingColor:Ye&&I.instanceColor!==null,instancingMorph:Ye&&I.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:ce===null?n.outputColorSpace:ce.isXRRenderTarget===!0?ce.texture.colorSpace:xr,alphaToCoverage:!!x.alphaToCoverage,map:et,matcap:Dt,envMap:tt,envMapMode:tt&&re.mapping,envMapCubeUVHeight:K,aoMap:yt,lightMap:O,bumpMap:nt,normalMap:it,displacementMap:f&&pt,emissiveMap:be,normalMapObjectSpace:it&&x.normalMapType===pd,normalMapTangentSpace:it&&x.normalMapType===Ol,metalnessMap:St,roughnessMap:Fe,anisotropy:$e,anisotropyMap:J,clearcoat:L,clearcoatMap:Re,clearcoatNormalMap:_e,clearcoatRoughnessMap:ze,dispersion:y,iridescence:W,iridescenceMap:Ce,iridescenceThicknessMap:le,sheen:ie,sheenColorMap:de,sheenRoughnessMap:Ge,specularMap:ke,specularColorMap:ee,specularIntensityMap:qe,transmission:ae,transmissionMap:z,thicknessMap:ge,gradientMap:pe,opaque:x.transparent===!1&&x.blending===ur&&x.alphaToCoverage===!1,alphaMap:me,alphaTest:ue,alphaHash:se,combine:x.combine,mapUv:et&&b(x.map.channel),aoMapUv:yt&&b(x.aoMap.channel),lightMapUv:O&&b(x.lightMap.channel),bumpMapUv:nt&&b(x.bumpMap.channel),normalMapUv:it&&b(x.normalMap.channel),displacementMapUv:pt&&b(x.displacementMap.channel),emissiveMapUv:be&&b(x.emissiveMap.channel),metalnessMapUv:St&&b(x.metalnessMap.channel),roughnessMapUv:Fe&&b(x.roughnessMap.channel),anisotropyMapUv:J&&b(x.anisotropyMap.channel),clearcoatMapUv:Re&&b(x.clearcoatMap.channel),clearcoatNormalMapUv:_e&&b(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ze&&b(x.clearcoatRoughnessMap.channel),iridescenceMapUv:Ce&&b(x.iridescenceMap.channel),iridescenceThicknessMapUv:le&&b(x.iridescenceThicknessMap.channel),sheenColorMapUv:de&&b(x.sheenColorMap.channel),sheenRoughnessMapUv:Ge&&b(x.sheenRoughnessMap.channel),specularMapUv:ke&&b(x.specularMap.channel),specularColorMapUv:ee&&b(x.specularColorMap.channel),specularIntensityMapUv:qe&&b(x.specularIntensityMap.channel),transmissionMapUv:z&&b(x.transmissionMap.channel),thicknessMapUv:ge&&b(x.thicknessMap.channel),alphaMapUv:me&&b(x.alphaMap.channel),vertexTangents:!!X.attributes.tangent&&(it||$e),vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,pointsUvs:I.isPoints===!0&&!!X.attributes.uv&&(et||me),fog:!!H,useFog:x.fog===!0,fogExp2:!!H&&H.isFogExp2,flatShading:x.flatShading===!0&&x.wireframe===!1,sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:Ee,skinning:I.isSkinnedMesh===!0,morphTargets:X.morphAttributes.position!==void 0,morphNormals:X.morphAttributes.normal!==void 0,morphColors:X.morphAttributes.color!==void 0,morphTargetsCount:fe,morphTextureStride:we,numDirLights:_.directional.length,numPointLights:_.point.length,numSpotLights:_.spot.length,numSpotLightMaps:_.spotLightMap.length,numRectAreaLights:_.rectArea.length,numHemiLights:_.hemi.length,numDirLightShadows:_.directionalShadowMap.length,numPointLightShadows:_.pointShadowMap.length,numSpotLightShadows:_.spotShadowMap.length,numSpotLightShadowsWithMaps:_.numSpotLightShadowsWithMaps,numLightProbes:_.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:x.dithering,shadowMapEnabled:n.shadowMap.enabled&&C.length>0,shadowMapType:n.shadowMap.type,toneMapping:Xe,decodeVideoTexture:et&&x.map.isVideoTexture===!0&&dt.getTransfer(x.map.colorSpace)===_t,decodeVideoTextureEmissive:be&&x.emissiveMap.isVideoTexture===!0&&dt.getTransfer(x.emissiveMap.colorSpace)===_t,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===Pn,flipSided:x.side===ln,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:Se&&x.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Se&&x.extensions.multiDraw===!0||Le)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return lt.vertexUv1s=l.has(1),lt.vertexUv2s=l.has(2),lt.vertexUv3s=l.has(3),l.clear(),lt}function h(x){const _=[];if(x.shaderID?_.push(x.shaderID):(_.push(x.customVertexShaderID),_.push(x.customFragmentShaderID)),x.defines!==void 0)for(const C in x.defines)_.push(C),_.push(x.defines[C]);return x.isRawShaderMaterial===!1&&(w(_,x),A(_,x),_.push(n.outputColorSpace)),_.push(x.customProgramCacheKey),_.join()}function w(x,_){x.push(_.precision),x.push(_.outputColorSpace),x.push(_.envMapMode),x.push(_.envMapCubeUVHeight),x.push(_.mapUv),x.push(_.alphaMapUv),x.push(_.lightMapUv),x.push(_.aoMapUv),x.push(_.bumpMapUv),x.push(_.normalMapUv),x.push(_.displacementMapUv),x.push(_.emissiveMapUv),x.push(_.metalnessMapUv),x.push(_.roughnessMapUv),x.push(_.anisotropyMapUv),x.push(_.clearcoatMapUv),x.push(_.clearcoatNormalMapUv),x.push(_.clearcoatRoughnessMapUv),x.push(_.iridescenceMapUv),x.push(_.iridescenceThicknessMapUv),x.push(_.sheenColorMapUv),x.push(_.sheenRoughnessMapUv),x.push(_.specularMapUv),x.push(_.specularColorMapUv),x.push(_.specularIntensityMapUv),x.push(_.transmissionMapUv),x.push(_.thicknessMapUv),x.push(_.combine),x.push(_.fogExp2),x.push(_.sizeAttenuation),x.push(_.morphTargetsCount),x.push(_.morphAttributeCount),x.push(_.numDirLights),x.push(_.numPointLights),x.push(_.numSpotLights),x.push(_.numSpotLightMaps),x.push(_.numHemiLights),x.push(_.numRectAreaLights),x.push(_.numDirLightShadows),x.push(_.numPointLightShadows),x.push(_.numSpotLightShadows),x.push(_.numSpotLightShadowsWithMaps),x.push(_.numLightProbes),x.push(_.shadowMapType),x.push(_.toneMapping),x.push(_.numClippingPlanes),x.push(_.numClipIntersection),x.push(_.depthPacking)}function A(x,_){o.disableAll(),_.supportsVertexTextures&&o.enable(0),_.instancing&&o.enable(1),_.instancingColor&&o.enable(2),_.instancingMorph&&o.enable(3),_.matcap&&o.enable(4),_.envMap&&o.enable(5),_.normalMapObjectSpace&&o.enable(6),_.normalMapTangentSpace&&o.enable(7),_.clearcoat&&o.enable(8),_.iridescence&&o.enable(9),_.alphaTest&&o.enable(10),_.vertexColors&&o.enable(11),_.vertexAlphas&&o.enable(12),_.vertexUv1s&&o.enable(13),_.vertexUv2s&&o.enable(14),_.vertexUv3s&&o.enable(15),_.vertexTangents&&o.enable(16),_.anisotropy&&o.enable(17),_.alphaHash&&o.enable(18),_.batching&&o.enable(19),_.dispersion&&o.enable(20),_.batchingColor&&o.enable(21),_.gradientMap&&o.enable(22),x.push(o.mask),o.disableAll(),_.fog&&o.enable(0),_.useFog&&o.enable(1),_.flatShading&&o.enable(2),_.logarithmicDepthBuffer&&o.enable(3),_.reversedDepthBuffer&&o.enable(4),_.skinning&&o.enable(5),_.morphTargets&&o.enable(6),_.morphNormals&&o.enable(7),_.morphColors&&o.enable(8),_.premultipliedAlpha&&o.enable(9),_.shadowMapEnabled&&o.enable(10),_.doubleSided&&o.enable(11),_.flipSided&&o.enable(12),_.useDepthPacking&&o.enable(13),_.dithering&&o.enable(14),_.transmission&&o.enable(15),_.sheen&&o.enable(16),_.opaque&&o.enable(17),_.pointsUvs&&o.enable(18),_.decodeVideoTexture&&o.enable(19),_.decodeVideoTextureEmissive&&o.enable(20),_.alphaToCoverage&&o.enable(21),x.push(o.mask)}function E(x){const _=v[x.type];let C;if(_){const N=Bn[_];C=Hd.clone(N.uniforms)}else C=x.uniforms;return C}function M(x,_){let C;for(let N=0,I=u.length;N<I;N++){const H=u[N];if(H.cacheKey===_){C=H,++C.usedTimes;break}}return C===void 0&&(C=new Sm(n,_,x,s),u.push(C)),C}function g(x){if(--x.usedTimes===0){const _=u.indexOf(x);u[_]=u[u.length-1],u.pop(),x.destroy()}}function R(x){c.remove(x)}function P(){c.dispose()}return{getParameters:m,getProgramCacheKey:h,getUniforms:E,acquireProgram:M,releaseProgram:g,releaseShaderCache:R,programs:u,dispose:P}}function Rm(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function r(a,o,c){n.get(a)[o]=c}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function Cm(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function dl(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function hl(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function a(d,f,p,v,b,m){let h=n[e];return h===void 0?(h={id:d.id,object:d,geometry:f,material:p,groupOrder:v,renderOrder:d.renderOrder,z:b,group:m},n[e]=h):(h.id=d.id,h.object=d,h.geometry=f,h.material=p,h.groupOrder=v,h.renderOrder=d.renderOrder,h.z=b,h.group=m),e++,h}function o(d,f,p,v,b,m){const h=a(d,f,p,v,b,m);p.transmission>0?i.push(h):p.transparent===!0?r.push(h):t.push(h)}function c(d,f,p,v,b,m){const h=a(d,f,p,v,b,m);p.transmission>0?i.unshift(h):p.transparent===!0?r.unshift(h):t.unshift(h)}function l(d,f){t.length>1&&t.sort(d||Cm),i.length>1&&i.sort(f||dl),r.length>1&&r.sort(f||dl)}function u(){for(let d=e,f=n.length;d<f;d++){const p=n[d];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:o,unshift:c,finish:u,sort:l}}function Pm(){let n=new WeakMap;function e(i,r){const s=n.get(i);let a;return s===void 0?(a=new hl,n.set(i,[a])):r>=s.length?(a=new hl,s.push(a)):a=s[r],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function Lm(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new B,color:new at};break;case"SpotLight":t={position:new B,direction:new B,color:new at,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new B,color:new at,distance:0,decay:0};break;case"HemisphereLight":t={direction:new B,skyColor:new at,groundColor:new at};break;case"RectAreaLight":t={color:new at,position:new B,halfWidth:new B,halfHeight:new B};break}return n[e.id]=t,t}}}function Dm(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new rt};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new rt};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new rt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let Im=0;function Um(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function Fm(n){const e=new Lm,t=Dm(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new B);const r=new B,s=new xt,a=new xt;function o(l){let u=0,d=0,f=0;for(let x=0;x<9;x++)i.probe[x].set(0,0,0);let p=0,v=0,b=0,m=0,h=0,w=0,A=0,E=0,M=0,g=0,R=0;l.sort(Um);for(let x=0,_=l.length;x<_;x++){const C=l[x],N=C.color,I=C.intensity,H=C.distance,X=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)u+=N.r*I,d+=N.g*I,f+=N.b*I;else if(C.isLightProbe){for(let Z=0;Z<9;Z++)i.probe[Z].addScaledVector(C.sh.coefficients[Z],I);R++}else if(C.isDirectionalLight){const Z=e.get(C);if(Z.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const re=C.shadow,K=t.get(C);K.shadowIntensity=re.intensity,K.shadowBias=re.bias,K.shadowNormalBias=re.normalBias,K.shadowRadius=re.radius,K.shadowMapSize=re.mapSize,i.directionalShadow[p]=K,i.directionalShadowMap[p]=X,i.directionalShadowMatrix[p]=C.shadow.matrix,w++}i.directional[p]=Z,p++}else if(C.isSpotLight){const Z=e.get(C);Z.position.setFromMatrixPosition(C.matrixWorld),Z.color.copy(N).multiplyScalar(I),Z.distance=H,Z.coneCos=Math.cos(C.angle),Z.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),Z.decay=C.decay,i.spot[b]=Z;const re=C.shadow;if(C.map&&(i.spotLightMap[M]=C.map,M++,re.updateMatrices(C),C.castShadow&&g++),i.spotLightMatrix[b]=re.matrix,C.castShadow){const K=t.get(C);K.shadowIntensity=re.intensity,K.shadowBias=re.bias,K.shadowNormalBias=re.normalBias,K.shadowRadius=re.radius,K.shadowMapSize=re.mapSize,i.spotShadow[b]=K,i.spotShadowMap[b]=X,E++}b++}else if(C.isRectAreaLight){const Z=e.get(C);Z.color.copy(N).multiplyScalar(I),Z.halfWidth.set(C.width*.5,0,0),Z.halfHeight.set(0,C.height*.5,0),i.rectArea[m]=Z,m++}else if(C.isPointLight){const Z=e.get(C);if(Z.color.copy(C.color).multiplyScalar(C.intensity),Z.distance=C.distance,Z.decay=C.decay,C.castShadow){const re=C.shadow,K=t.get(C);K.shadowIntensity=re.intensity,K.shadowBias=re.bias,K.shadowNormalBias=re.normalBias,K.shadowRadius=re.radius,K.shadowMapSize=re.mapSize,K.shadowCameraNear=re.camera.near,K.shadowCameraFar=re.camera.far,i.pointShadow[v]=K,i.pointShadowMap[v]=X,i.pointShadowMatrix[v]=C.shadow.matrix,A++}i.point[v]=Z,v++}else if(C.isHemisphereLight){const Z=e.get(C);Z.skyColor.copy(C.color).multiplyScalar(I),Z.groundColor.copy(C.groundColor).multiplyScalar(I),i.hemi[h]=Z,h++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ve.LTC_FLOAT_1,i.rectAreaLTC2=ve.LTC_FLOAT_2):(i.rectAreaLTC1=ve.LTC_HALF_1,i.rectAreaLTC2=ve.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=d,i.ambient[2]=f;const P=i.hash;(P.directionalLength!==p||P.pointLength!==v||P.spotLength!==b||P.rectAreaLength!==m||P.hemiLength!==h||P.numDirectionalShadows!==w||P.numPointShadows!==A||P.numSpotShadows!==E||P.numSpotMaps!==M||P.numLightProbes!==R)&&(i.directional.length=p,i.spot.length=b,i.rectArea.length=m,i.point.length=v,i.hemi.length=h,i.directionalShadow.length=w,i.directionalShadowMap.length=w,i.pointShadow.length=A,i.pointShadowMap.length=A,i.spotShadow.length=E,i.spotShadowMap.length=E,i.directionalShadowMatrix.length=w,i.pointShadowMatrix.length=A,i.spotLightMatrix.length=E+M-g,i.spotLightMap.length=M,i.numSpotLightShadowsWithMaps=g,i.numLightProbes=R,P.directionalLength=p,P.pointLength=v,P.spotLength=b,P.rectAreaLength=m,P.hemiLength=h,P.numDirectionalShadows=w,P.numPointShadows=A,P.numSpotShadows=E,P.numSpotMaps=M,P.numLightProbes=R,i.version=Im++)}function c(l,u){let d=0,f=0,p=0,v=0,b=0;const m=u.matrixWorldInverse;for(let h=0,w=l.length;h<w;h++){const A=l[h];if(A.isDirectionalLight){const E=i.directional[d];E.direction.setFromMatrixPosition(A.matrixWorld),r.setFromMatrixPosition(A.target.matrixWorld),E.direction.sub(r),E.direction.transformDirection(m),d++}else if(A.isSpotLight){const E=i.spot[p];E.position.setFromMatrixPosition(A.matrixWorld),E.position.applyMatrix4(m),E.direction.setFromMatrixPosition(A.matrixWorld),r.setFromMatrixPosition(A.target.matrixWorld),E.direction.sub(r),E.direction.transformDirection(m),p++}else if(A.isRectAreaLight){const E=i.rectArea[v];E.position.setFromMatrixPosition(A.matrixWorld),E.position.applyMatrix4(m),a.identity(),s.copy(A.matrixWorld),s.premultiply(m),a.extractRotation(s),E.halfWidth.set(A.width*.5,0,0),E.halfHeight.set(0,A.height*.5,0),E.halfWidth.applyMatrix4(a),E.halfHeight.applyMatrix4(a),v++}else if(A.isPointLight){const E=i.point[f];E.position.setFromMatrixPosition(A.matrixWorld),E.position.applyMatrix4(m),f++}else if(A.isHemisphereLight){const E=i.hemi[b];E.direction.setFromMatrixPosition(A.matrixWorld),E.direction.transformDirection(m),b++}}}return{setup:o,setupView:c,state:i}}function fl(n){const e=new Fm(n),t=[],i=[];function r(u){l.camera=u,t.length=0,i.length=0}function s(u){t.push(u)}function a(u){i.push(u)}function o(){e.setup(t)}function c(u){e.setupView(t,u)}const l={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:l,setupLights:o,setupLightsView:c,pushLight:s,pushShadow:a}}function Nm(n){let e=new WeakMap;function t(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new fl(n),e.set(r,[o])):s>=a.length?(o=new fl(n),a.push(o)):o=a[s],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const Om=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,zm=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Bm(n,e,t){let i=new Ho;const r=new rt,s=new rt,a=new vt,o=new ih({depthPacking:fd}),c=new rh,l={},u=t.maxTextureSize,d={[Ei]:ln,[ln]:Ei,[Pn]:Pn},f=new ai({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new rt},radius:{value:4}},vertexShader:Om,fragmentShader:zm}),p=f.clone();p.defines.HORIZONTAL_PASS=1;const v=new kt;v.setAttribute("position",new Sn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const b=new nn(v,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Al;let h=this.type;this.render=function(g,R,P){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||g.length===0)return;const x=n.getRenderTarget(),_=n.getActiveCubeFace(),C=n.getActiveMipmapLevel(),N=n.state;N.setBlending(ni),N.buffers.depth.getReversed()===!0?N.buffers.color.setClear(0,0,0,0):N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);const I=h!==Kn&&this.type===Kn,H=h===Kn&&this.type!==Kn;for(let X=0,Z=g.length;X<Z;X++){const re=g[X],K=re.shadow;if(K===void 0){Ke("WebGLShadowMap:",re,"has no shadow.");continue}if(K.autoUpdate===!1&&K.needsUpdate===!1)continue;r.copy(K.mapSize);const ne=K.getFrameExtents();if(r.multiply(ne),s.copy(K.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/ne.x),r.x=s.x*ne.x,K.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/ne.y),r.y=s.y*ne.y,K.mapSize.y=s.y)),K.map===null||I===!0||H===!0){const fe=this.type!==Kn?{minFilter:mn,magFilter:mn}:{};K.map!==null&&K.map.dispose(),K.map=new Bi(r.x,r.y,fe),K.map.texture.name=re.name+".shadowMap",K.camera.updateProjectionMatrix()}n.setRenderTarget(K.map),n.clear();const Q=K.getViewportCount();for(let fe=0;fe<Q;fe++){const we=K.getViewport(fe);a.set(s.x*we.x,s.y*we.y,s.x*we.z,s.y*we.w),N.viewport(a),K.updateMatrices(re,fe),i=K.getFrustum(),E(R,P,K.camera,re,this.type)}K.isPointLightShadow!==!0&&this.type===Kn&&w(K,P),K.needsUpdate=!1}h=this.type,m.needsUpdate=!1,n.setRenderTarget(x,_,C)};function w(g,R){const P=e.update(b);f.defines.VSM_SAMPLES!==g.blurSamples&&(f.defines.VSM_SAMPLES=g.blurSamples,p.defines.VSM_SAMPLES=g.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),g.mapPass===null&&(g.mapPass=new Bi(r.x,r.y)),f.uniforms.shadow_pass.value=g.map.texture,f.uniforms.resolution.value=g.mapSize,f.uniforms.radius.value=g.radius,n.setRenderTarget(g.mapPass),n.clear(),n.renderBufferDirect(R,null,P,f,b,null),p.uniforms.shadow_pass.value=g.mapPass.texture,p.uniforms.resolution.value=g.mapSize,p.uniforms.radius.value=g.radius,n.setRenderTarget(g.map),n.clear(),n.renderBufferDirect(R,null,P,p,b,null)}function A(g,R,P,x){let _=null;const C=P.isPointLight===!0?g.customDistanceMaterial:g.customDepthMaterial;if(C!==void 0)_=C;else if(_=P.isPointLight===!0?c:o,n.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){const N=_.uuid,I=R.uuid;let H=l[N];H===void 0&&(H={},l[N]=H);let X=H[I];X===void 0&&(X=_.clone(),H[I]=X,R.addEventListener("dispose",M)),_=X}if(_.visible=R.visible,_.wireframe=R.wireframe,x===Kn?_.side=R.shadowSide!==null?R.shadowSide:R.side:_.side=R.shadowSide!==null?R.shadowSide:d[R.side],_.alphaMap=R.alphaMap,_.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,_.map=R.map,_.clipShadows=R.clipShadows,_.clippingPlanes=R.clippingPlanes,_.clipIntersection=R.clipIntersection,_.displacementMap=R.displacementMap,_.displacementScale=R.displacementScale,_.displacementBias=R.displacementBias,_.wireframeLinewidth=R.wireframeLinewidth,_.linewidth=R.linewidth,P.isPointLight===!0&&_.isMeshDistanceMaterial===!0){const N=n.properties.get(_);N.light=P}return _}function E(g,R,P,x,_){if(g.visible===!1)return;if(g.layers.test(R.layers)&&(g.isMesh||g.isLine||g.isPoints)&&(g.castShadow||g.receiveShadow&&_===Kn)&&(!g.frustumCulled||i.intersectsObject(g))){g.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,g.matrixWorld);const I=e.update(g),H=g.material;if(Array.isArray(H)){const X=I.groups;for(let Z=0,re=X.length;Z<re;Z++){const K=X[Z],ne=H[K.materialIndex];if(ne&&ne.visible){const Q=A(g,ne,x,_);g.onBeforeShadow(n,g,R,P,I,Q,K),n.renderBufferDirect(P,null,I,Q,g,K),g.onAfterShadow(n,g,R,P,I,Q,K)}}}else if(H.visible){const X=A(g,H,x,_);g.onBeforeShadow(n,g,R,P,I,X,null),n.renderBufferDirect(P,null,I,X,g,null),g.onAfterShadow(n,g,R,P,I,X,null)}}const N=g.children;for(let I=0,H=N.length;I<H;I++)E(N[I],R,P,x,_)}function M(g){g.target.removeEventListener("dispose",M);for(const P in l){const x=l[P],_=g.target.uuid;_ in x&&(x[_].dispose(),delete x[_])}}}const km={[Oa]:za,[Ba]:Ga,[ka]:Ha,[fr]:Va,[za]:Oa,[Ga]:Ba,[Ha]:ka,[Va]:fr};function Vm(n,e){function t(){let z=!1;const ge=new vt;let pe=null;const me=new vt(0,0,0,0);return{setMask:function(ue){pe!==ue&&!z&&(n.colorMask(ue,ue,ue,ue),pe=ue)},setLocked:function(ue){z=ue},setClear:function(ue,se,Se,Xe,lt){lt===!0&&(ue*=Xe,se*=Xe,Se*=Xe),ge.set(ue,se,Se,Xe),me.equals(ge)===!1&&(n.clearColor(ue,se,Se,Xe),me.copy(ge))},reset:function(){z=!1,pe=null,me.set(-1,0,0,0)}}}function i(){let z=!1,ge=!1,pe=null,me=null,ue=null;return{setReversed:function(se){if(ge!==se){const Se=e.get("EXT_clip_control");se?Se.clipControlEXT(Se.LOWER_LEFT_EXT,Se.ZERO_TO_ONE_EXT):Se.clipControlEXT(Se.LOWER_LEFT_EXT,Se.NEGATIVE_ONE_TO_ONE_EXT),ge=se;const Xe=ue;ue=null,this.setClear(Xe)}},getReversed:function(){return ge},setTest:function(se){se?ce(n.DEPTH_TEST):Ee(n.DEPTH_TEST)},setMask:function(se){pe!==se&&!z&&(n.depthMask(se),pe=se)},setFunc:function(se){if(ge&&(se=km[se]),me!==se){switch(se){case Oa:n.depthFunc(n.NEVER);break;case za:n.depthFunc(n.ALWAYS);break;case Ba:n.depthFunc(n.LESS);break;case fr:n.depthFunc(n.LEQUAL);break;case ka:n.depthFunc(n.EQUAL);break;case Va:n.depthFunc(n.GEQUAL);break;case Ga:n.depthFunc(n.GREATER);break;case Ha:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}me=se}},setLocked:function(se){z=se},setClear:function(se){ue!==se&&(ge&&(se=1-se),n.clearDepth(se),ue=se)},reset:function(){z=!1,pe=null,me=null,ue=null,ge=!1}}}function r(){let z=!1,ge=null,pe=null,me=null,ue=null,se=null,Se=null,Xe=null,lt=null;return{setTest:function(ut){z||(ut?ce(n.STENCIL_TEST):Ee(n.STENCIL_TEST))},setMask:function(ut){ge!==ut&&!z&&(n.stencilMask(ut),ge=ut)},setFunc:function(ut,gt,Nt){(pe!==ut||me!==gt||ue!==Nt)&&(n.stencilFunc(ut,gt,Nt),pe=ut,me=gt,ue=Nt)},setOp:function(ut,gt,Nt){(se!==ut||Se!==gt||Xe!==Nt)&&(n.stencilOp(ut,gt,Nt),se=ut,Se=gt,Xe=Nt)},setLocked:function(ut){z=ut},setClear:function(ut){lt!==ut&&(n.clearStencil(ut),lt=ut)},reset:function(){z=!1,ge=null,pe=null,me=null,ue=null,se=null,Se=null,Xe=null,lt=null}}}const s=new t,a=new i,o=new r,c=new WeakMap,l=new WeakMap;let u={},d={},f=new WeakMap,p=[],v=null,b=!1,m=null,h=null,w=null,A=null,E=null,M=null,g=null,R=new at(0,0,0),P=0,x=!1,_=null,C=null,N=null,I=null,H=null;const X=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Z=!1,re=0;const K=n.getParameter(n.VERSION);K.indexOf("WebGL")!==-1?(re=parseFloat(/^WebGL (\d)/.exec(K)[1]),Z=re>=1):K.indexOf("OpenGL ES")!==-1&&(re=parseFloat(/^OpenGL ES (\d)/.exec(K)[1]),Z=re>=2);let ne=null,Q={};const fe=n.getParameter(n.SCISSOR_BOX),we=n.getParameter(n.VIEWPORT),Oe=new vt().fromArray(fe),We=new vt().fromArray(we);function ct(z,ge,pe,me){const ue=new Uint8Array(4),se=n.createTexture();n.bindTexture(z,se),n.texParameteri(z,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(z,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Se=0;Se<pe;Se++)z===n.TEXTURE_3D||z===n.TEXTURE_2D_ARRAY?n.texImage3D(ge,0,n.RGBA,1,1,me,0,n.RGBA,n.UNSIGNED_BYTE,ue):n.texImage2D(ge+Se,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ue);return se}const te={};te[n.TEXTURE_2D]=ct(n.TEXTURE_2D,n.TEXTURE_2D,1),te[n.TEXTURE_CUBE_MAP]=ct(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),te[n.TEXTURE_2D_ARRAY]=ct(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),te[n.TEXTURE_3D]=ct(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ce(n.DEPTH_TEST),a.setFunc(fr),nt(!1),it(ac),ce(n.CULL_FACE),yt(ni);function ce(z){u[z]!==!0&&(n.enable(z),u[z]=!0)}function Ee(z){u[z]!==!1&&(n.disable(z),u[z]=!1)}function Ye(z,ge){return d[z]!==ge?(n.bindFramebuffer(z,ge),d[z]=ge,z===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=ge),z===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=ge),!0):!1}function Le(z,ge){let pe=p,me=!1;if(z){pe=f.get(ge),pe===void 0&&(pe=[],f.set(ge,pe));const ue=z.textures;if(pe.length!==ue.length||pe[0]!==n.COLOR_ATTACHMENT0){for(let se=0,Se=ue.length;se<Se;se++)pe[se]=n.COLOR_ATTACHMENT0+se;pe.length=ue.length,me=!0}}else pe[0]!==n.BACK&&(pe[0]=n.BACK,me=!0);me&&n.drawBuffers(pe)}function et(z){return v!==z?(n.useProgram(z),v=z,!0):!1}const Dt={[Di]:n.FUNC_ADD,[ku]:n.FUNC_SUBTRACT,[Vu]:n.FUNC_REVERSE_SUBTRACT};Dt[Gu]=n.MIN,Dt[Hu]=n.MAX;const tt={[Wu]:n.ZERO,[Xu]:n.ONE,[qu]:n.SRC_COLOR,[Fa]:n.SRC_ALPHA,[Ju]:n.SRC_ALPHA_SATURATE,[Ku]:n.DST_COLOR,[Yu]:n.DST_ALPHA,[$u]:n.ONE_MINUS_SRC_COLOR,[Na]:n.ONE_MINUS_SRC_ALPHA,[Zu]:n.ONE_MINUS_DST_COLOR,[ju]:n.ONE_MINUS_DST_ALPHA,[Qu]:n.CONSTANT_COLOR,[ed]:n.ONE_MINUS_CONSTANT_COLOR,[td]:n.CONSTANT_ALPHA,[nd]:n.ONE_MINUS_CONSTANT_ALPHA};function yt(z,ge,pe,me,ue,se,Se,Xe,lt,ut){if(z===ni){b===!0&&(Ee(n.BLEND),b=!1);return}if(b===!1&&(ce(n.BLEND),b=!0),z!==Bu){if(z!==m||ut!==x){if((h!==Di||E!==Di)&&(n.blendEquation(n.FUNC_ADD),h=Di,E=Di),ut)switch(z){case ur:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case oc:n.blendFunc(n.ONE,n.ONE);break;case cc:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case lc:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:Pt("WebGLState: Invalid blending: ",z);break}else switch(z){case ur:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case oc:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case cc:Pt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case lc:Pt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Pt("WebGLState: Invalid blending: ",z);break}w=null,A=null,M=null,g=null,R.set(0,0,0),P=0,m=z,x=ut}return}ue=ue||ge,se=se||pe,Se=Se||me,(ge!==h||ue!==E)&&(n.blendEquationSeparate(Dt[ge],Dt[ue]),h=ge,E=ue),(pe!==w||me!==A||se!==M||Se!==g)&&(n.blendFuncSeparate(tt[pe],tt[me],tt[se],tt[Se]),w=pe,A=me,M=se,g=Se),(Xe.equals(R)===!1||lt!==P)&&(n.blendColor(Xe.r,Xe.g,Xe.b,lt),R.copy(Xe),P=lt),m=z,x=!1}function O(z,ge){z.side===Pn?Ee(n.CULL_FACE):ce(n.CULL_FACE);let pe=z.side===ln;ge&&(pe=!pe),nt(pe),z.blending===ur&&z.transparent===!1?yt(ni):yt(z.blending,z.blendEquation,z.blendSrc,z.blendDst,z.blendEquationAlpha,z.blendSrcAlpha,z.blendDstAlpha,z.blendColor,z.blendAlpha,z.premultipliedAlpha),a.setFunc(z.depthFunc),a.setTest(z.depthTest),a.setMask(z.depthWrite),s.setMask(z.colorWrite);const me=z.stencilWrite;o.setTest(me),me&&(o.setMask(z.stencilWriteMask),o.setFunc(z.stencilFunc,z.stencilRef,z.stencilFuncMask),o.setOp(z.stencilFail,z.stencilZFail,z.stencilZPass)),be(z.polygonOffset,z.polygonOffsetFactor,z.polygonOffsetUnits),z.alphaToCoverage===!0?ce(n.SAMPLE_ALPHA_TO_COVERAGE):Ee(n.SAMPLE_ALPHA_TO_COVERAGE)}function nt(z){_!==z&&(z?n.frontFace(n.CW):n.frontFace(n.CCW),_=z)}function it(z){z!==Ou?(ce(n.CULL_FACE),z!==C&&(z===ac?n.cullFace(n.BACK):z===zu?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Ee(n.CULL_FACE),C=z}function pt(z){z!==N&&(Z&&n.lineWidth(z),N=z)}function be(z,ge,pe){z?(ce(n.POLYGON_OFFSET_FILL),(I!==ge||H!==pe)&&(n.polygonOffset(ge,pe),I=ge,H=pe)):Ee(n.POLYGON_OFFSET_FILL)}function St(z){z?ce(n.SCISSOR_TEST):Ee(n.SCISSOR_TEST)}function Fe(z){z===void 0&&(z=n.TEXTURE0+X-1),ne!==z&&(n.activeTexture(z),ne=z)}function $e(z,ge,pe){pe===void 0&&(ne===null?pe=n.TEXTURE0+X-1:pe=ne);let me=Q[pe];me===void 0&&(me={type:void 0,texture:void 0},Q[pe]=me),(me.type!==z||me.texture!==ge)&&(ne!==pe&&(n.activeTexture(pe),ne=pe),n.bindTexture(z,ge||te[z]),me.type=z,me.texture=ge)}function L(){const z=Q[ne];z!==void 0&&z.type!==void 0&&(n.bindTexture(z.type,null),z.type=void 0,z.texture=void 0)}function y(){try{n.compressedTexImage2D(...arguments)}catch(z){z("WebGLState:",z)}}function W(){try{n.compressedTexImage3D(...arguments)}catch(z){z("WebGLState:",z)}}function ie(){try{n.texSubImage2D(...arguments)}catch(z){z("WebGLState:",z)}}function ae(){try{n.texSubImage3D(...arguments)}catch(z){z("WebGLState:",z)}}function J(){try{n.compressedTexSubImage2D(...arguments)}catch(z){z("WebGLState:",z)}}function Re(){try{n.compressedTexSubImage3D(...arguments)}catch(z){z("WebGLState:",z)}}function _e(){try{n.texStorage2D(...arguments)}catch(z){z("WebGLState:",z)}}function ze(){try{n.texStorage3D(...arguments)}catch(z){z("WebGLState:",z)}}function Ce(){try{n.texImage2D(...arguments)}catch(z){z("WebGLState:",z)}}function le(){try{n.texImage3D(...arguments)}catch(z){z("WebGLState:",z)}}function de(z){Oe.equals(z)===!1&&(n.scissor(z.x,z.y,z.z,z.w),Oe.copy(z))}function Ge(z){We.equals(z)===!1&&(n.viewport(z.x,z.y,z.z,z.w),We.copy(z))}function ke(z,ge){let pe=l.get(ge);pe===void 0&&(pe=new WeakMap,l.set(ge,pe));let me=pe.get(z);me===void 0&&(me=n.getUniformBlockIndex(ge,z.name),pe.set(z,me))}function ee(z,ge){const me=l.get(ge).get(z);c.get(ge)!==me&&(n.uniformBlockBinding(ge,me,z.__bindingPointIndex),c.set(ge,me))}function qe(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},ne=null,Q={},d={},f=new WeakMap,p=[],v=null,b=!1,m=null,h=null,w=null,A=null,E=null,M=null,g=null,R=new at(0,0,0),P=0,x=!1,_=null,C=null,N=null,I=null,H=null,Oe.set(0,0,n.canvas.width,n.canvas.height),We.set(0,0,n.canvas.width,n.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:ce,disable:Ee,bindFramebuffer:Ye,drawBuffers:Le,useProgram:et,setBlending:yt,setMaterial:O,setFlipSided:nt,setCullFace:it,setLineWidth:pt,setPolygonOffset:be,setScissorTest:St,activeTexture:Fe,bindTexture:$e,unbindTexture:L,compressedTexImage2D:y,compressedTexImage3D:W,texImage2D:Ce,texImage3D:le,updateUBOMapping:ke,uniformBlockBinding:ee,texStorage2D:_e,texStorage3D:ze,texSubImage2D:ie,texSubImage3D:ae,compressedTexSubImage2D:J,compressedTexSubImage3D:Re,scissor:de,viewport:Ge,reset:qe}}function Gm(n,e,t,i,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new rt,u=new WeakMap;let d;const f=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(L,y){return p?new OffscreenCanvas(L,y):Ps("canvas")}function b(L,y,W){let ie=1;const ae=$e(L);if((ae.width>W||ae.height>W)&&(ie=W/Math.max(ae.width,ae.height)),ie<1)if(typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&L instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&L instanceof ImageBitmap||typeof VideoFrame<"u"&&L instanceof VideoFrame){const J=Math.floor(ie*ae.width),Re=Math.floor(ie*ae.height);d===void 0&&(d=v(J,Re));const _e=y?v(J,Re):d;return _e.width=J,_e.height=Re,_e.getContext("2d").drawImage(L,0,0,J,Re),Ke("WebGLRenderer: Texture has been resized from ("+ae.width+"x"+ae.height+") to ("+J+"x"+Re+")."),_e}else return"data"in L&&Ke("WebGLRenderer: Image in DataTexture is too big ("+ae.width+"x"+ae.height+")."),L;return L}function m(L){return L.generateMipmaps}function h(L){n.generateMipmap(L)}function w(L){return L.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:L.isWebGL3DRenderTarget?n.TEXTURE_3D:L.isWebGLArrayRenderTarget||L.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function A(L,y,W,ie,ae=!1){if(L!==null){if(n[L]!==void 0)return n[L];Ke("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+L+"'")}let J=y;if(y===n.RED&&(W===n.FLOAT&&(J=n.R32F),W===n.HALF_FLOAT&&(J=n.R16F),W===n.UNSIGNED_BYTE&&(J=n.R8)),y===n.RED_INTEGER&&(W===n.UNSIGNED_BYTE&&(J=n.R8UI),W===n.UNSIGNED_SHORT&&(J=n.R16UI),W===n.UNSIGNED_INT&&(J=n.R32UI),W===n.BYTE&&(J=n.R8I),W===n.SHORT&&(J=n.R16I),W===n.INT&&(J=n.R32I)),y===n.RG&&(W===n.FLOAT&&(J=n.RG32F),W===n.HALF_FLOAT&&(J=n.RG16F),W===n.UNSIGNED_BYTE&&(J=n.RG8)),y===n.RG_INTEGER&&(W===n.UNSIGNED_BYTE&&(J=n.RG8UI),W===n.UNSIGNED_SHORT&&(J=n.RG16UI),W===n.UNSIGNED_INT&&(J=n.RG32UI),W===n.BYTE&&(J=n.RG8I),W===n.SHORT&&(J=n.RG16I),W===n.INT&&(J=n.RG32I)),y===n.RGB_INTEGER&&(W===n.UNSIGNED_BYTE&&(J=n.RGB8UI),W===n.UNSIGNED_SHORT&&(J=n.RGB16UI),W===n.UNSIGNED_INT&&(J=n.RGB32UI),W===n.BYTE&&(J=n.RGB8I),W===n.SHORT&&(J=n.RGB16I),W===n.INT&&(J=n.RGB32I)),y===n.RGBA_INTEGER&&(W===n.UNSIGNED_BYTE&&(J=n.RGBA8UI),W===n.UNSIGNED_SHORT&&(J=n.RGBA16UI),W===n.UNSIGNED_INT&&(J=n.RGBA32UI),W===n.BYTE&&(J=n.RGBA8I),W===n.SHORT&&(J=n.RGBA16I),W===n.INT&&(J=n.RGBA32I)),y===n.RGB&&(W===n.UNSIGNED_INT_5_9_9_9_REV&&(J=n.RGB9_E5),W===n.UNSIGNED_INT_10F_11F_11F_REV&&(J=n.R11F_G11F_B10F)),y===n.RGBA){const Re=ae?Rs:dt.getTransfer(ie);W===n.FLOAT&&(J=n.RGBA32F),W===n.HALF_FLOAT&&(J=n.RGBA16F),W===n.UNSIGNED_BYTE&&(J=Re===_t?n.SRGB8_ALPHA8:n.RGBA8),W===n.UNSIGNED_SHORT_4_4_4_4&&(J=n.RGBA4),W===n.UNSIGNED_SHORT_5_5_5_1&&(J=n.RGB5_A1)}return(J===n.R16F||J===n.R32F||J===n.RG16F||J===n.RG32F||J===n.RGBA16F||J===n.RGBA32F)&&e.get("EXT_color_buffer_float"),J}function E(L,y){let W;return L?y===null||y===zi||y===Or?W=n.DEPTH24_STENCIL8:y===kn?W=n.DEPTH32F_STENCIL8:y===Nr&&(W=n.DEPTH24_STENCIL8,Ke("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===zi||y===Or?W=n.DEPTH_COMPONENT24:y===kn?W=n.DEPTH_COMPONENT32F:y===Nr&&(W=n.DEPTH_COMPONENT16),W}function M(L,y){return m(L)===!0||L.isFramebufferTexture&&L.minFilter!==mn&&L.minFilter!==bn?Math.log2(Math.max(y.width,y.height))+1:L.mipmaps!==void 0&&L.mipmaps.length>0?L.mipmaps.length:L.isCompressedTexture&&Array.isArray(L.image)?y.mipmaps.length:1}function g(L){const y=L.target;y.removeEventListener("dispose",g),P(y),y.isVideoTexture&&u.delete(y)}function R(L){const y=L.target;y.removeEventListener("dispose",R),_(y)}function P(L){const y=i.get(L);if(y.__webglInit===void 0)return;const W=L.source,ie=f.get(W);if(ie){const ae=ie[y.__cacheKey];ae.usedTimes--,ae.usedTimes===0&&x(L),Object.keys(ie).length===0&&f.delete(W)}i.remove(L)}function x(L){const y=i.get(L);n.deleteTexture(y.__webglTexture);const W=L.source,ie=f.get(W);delete ie[y.__cacheKey],a.memory.textures--}function _(L){const y=i.get(L);if(L.depthTexture&&(L.depthTexture.dispose(),i.remove(L.depthTexture)),L.isWebGLCubeRenderTarget)for(let ie=0;ie<6;ie++){if(Array.isArray(y.__webglFramebuffer[ie]))for(let ae=0;ae<y.__webglFramebuffer[ie].length;ae++)n.deleteFramebuffer(y.__webglFramebuffer[ie][ae]);else n.deleteFramebuffer(y.__webglFramebuffer[ie]);y.__webglDepthbuffer&&n.deleteRenderbuffer(y.__webglDepthbuffer[ie])}else{if(Array.isArray(y.__webglFramebuffer))for(let ie=0;ie<y.__webglFramebuffer.length;ie++)n.deleteFramebuffer(y.__webglFramebuffer[ie]);else n.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&n.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&n.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let ie=0;ie<y.__webglColorRenderbuffer.length;ie++)y.__webglColorRenderbuffer[ie]&&n.deleteRenderbuffer(y.__webglColorRenderbuffer[ie]);y.__webglDepthRenderbuffer&&n.deleteRenderbuffer(y.__webglDepthRenderbuffer)}const W=L.textures;for(let ie=0,ae=W.length;ie<ae;ie++){const J=i.get(W[ie]);J.__webglTexture&&(n.deleteTexture(J.__webglTexture),a.memory.textures--),i.remove(W[ie])}i.remove(L)}let C=0;function N(){C=0}function I(){const L=C;return L>=r.maxTextures&&Ke("WebGLTextures: Trying to use "+L+" texture units while this GPU supports only "+r.maxTextures),C+=1,L}function H(L){const y=[];return y.push(L.wrapS),y.push(L.wrapT),y.push(L.wrapR||0),y.push(L.magFilter),y.push(L.minFilter),y.push(L.anisotropy),y.push(L.internalFormat),y.push(L.format),y.push(L.type),y.push(L.generateMipmaps),y.push(L.premultiplyAlpha),y.push(L.flipY),y.push(L.unpackAlignment),y.push(L.colorSpace),y.join()}function X(L,y){const W=i.get(L);if(L.isVideoTexture&&St(L),L.isRenderTargetTexture===!1&&L.isExternalTexture!==!0&&L.version>0&&W.__version!==L.version){const ie=L.image;if(ie===null)Ke("WebGLRenderer: Texture marked for update but no image data found.");else if(ie.complete===!1)Ke("WebGLRenderer: Texture marked for update but image is incomplete");else{te(W,L,y);return}}else L.isExternalTexture&&(W.__webglTexture=L.sourceTexture?L.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,W.__webglTexture,n.TEXTURE0+y)}function Z(L,y){const W=i.get(L);if(L.isRenderTargetTexture===!1&&L.version>0&&W.__version!==L.version){te(W,L,y);return}else L.isExternalTexture&&(W.__webglTexture=L.sourceTexture?L.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,W.__webglTexture,n.TEXTURE0+y)}function re(L,y){const W=i.get(L);if(L.isRenderTargetTexture===!1&&L.version>0&&W.__version!==L.version){te(W,L,y);return}t.bindTexture(n.TEXTURE_3D,W.__webglTexture,n.TEXTURE0+y)}function K(L,y){const W=i.get(L);if(L.version>0&&W.__version!==L.version){ce(W,L,y);return}t.bindTexture(n.TEXTURE_CUBE_MAP,W.__webglTexture,n.TEXTURE0+y)}const ne={[ws]:n.REPEAT,[ei]:n.CLAMP_TO_EDGE,[qa]:n.MIRRORED_REPEAT},Q={[mn]:n.NEAREST,[dd]:n.NEAREST_MIPMAP_NEAREST,[jr]:n.NEAREST_MIPMAP_LINEAR,[bn]:n.LINEAR,[Zs]:n.LINEAR_MIPMAP_NEAREST,[Ui]:n.LINEAR_MIPMAP_LINEAR},fe={[md]:n.NEVER,[bd]:n.ALWAYS,[xd]:n.LESS,[zl]:n.LEQUAL,[gd]:n.EQUAL,[yd]:n.GEQUAL,[_d]:n.GREATER,[vd]:n.NOTEQUAL};function we(L,y){if(y.type===kn&&e.has("OES_texture_float_linear")===!1&&(y.magFilter===bn||y.magFilter===Zs||y.magFilter===jr||y.magFilter===Ui||y.minFilter===bn||y.minFilter===Zs||y.minFilter===jr||y.minFilter===Ui)&&Ke("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(L,n.TEXTURE_WRAP_S,ne[y.wrapS]),n.texParameteri(L,n.TEXTURE_WRAP_T,ne[y.wrapT]),(L===n.TEXTURE_3D||L===n.TEXTURE_2D_ARRAY)&&n.texParameteri(L,n.TEXTURE_WRAP_R,ne[y.wrapR]),n.texParameteri(L,n.TEXTURE_MAG_FILTER,Q[y.magFilter]),n.texParameteri(L,n.TEXTURE_MIN_FILTER,Q[y.minFilter]),y.compareFunction&&(n.texParameteri(L,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(L,n.TEXTURE_COMPARE_FUNC,fe[y.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===mn||y.minFilter!==jr&&y.minFilter!==Ui||y.type===kn&&e.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||i.get(y).__currentAnisotropy){const W=e.get("EXT_texture_filter_anisotropic");n.texParameterf(L,W.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,r.getMaxAnisotropy())),i.get(y).__currentAnisotropy=y.anisotropy}}}function Oe(L,y){let W=!1;L.__webglInit===void 0&&(L.__webglInit=!0,y.addEventListener("dispose",g));const ie=y.source;let ae=f.get(ie);ae===void 0&&(ae={},f.set(ie,ae));const J=H(y);if(J!==L.__cacheKey){ae[J]===void 0&&(ae[J]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,W=!0),ae[J].usedTimes++;const Re=ae[L.__cacheKey];Re!==void 0&&(ae[L.__cacheKey].usedTimes--,Re.usedTimes===0&&x(y)),L.__cacheKey=J,L.__webglTexture=ae[J].texture}return W}function We(L,y,W){return Math.floor(Math.floor(L/W)/y)}function ct(L,y,W,ie){const J=L.updateRanges;if(J.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,y.width,y.height,W,ie,y.data);else{J.sort((le,de)=>le.start-de.start);let Re=0;for(let le=1;le<J.length;le++){const de=J[Re],Ge=J[le],ke=de.start+de.count,ee=We(Ge.start,y.width,4),qe=We(de.start,y.width,4);Ge.start<=ke+1&&ee===qe&&We(Ge.start+Ge.count-1,y.width,4)===ee?de.count=Math.max(de.count,Ge.start+Ge.count-de.start):(++Re,J[Re]=Ge)}J.length=Re+1;const _e=n.getParameter(n.UNPACK_ROW_LENGTH),ze=n.getParameter(n.UNPACK_SKIP_PIXELS),Ce=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,y.width);for(let le=0,de=J.length;le<de;le++){const Ge=J[le],ke=Math.floor(Ge.start/4),ee=Math.ceil(Ge.count/4),qe=ke%y.width,z=Math.floor(ke/y.width),ge=ee,pe=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,qe),n.pixelStorei(n.UNPACK_SKIP_ROWS,z),t.texSubImage2D(n.TEXTURE_2D,0,qe,z,ge,pe,W,ie,y.data)}L.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,_e),n.pixelStorei(n.UNPACK_SKIP_PIXELS,ze),n.pixelStorei(n.UNPACK_SKIP_ROWS,Ce)}}function te(L,y,W){let ie=n.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(ie=n.TEXTURE_2D_ARRAY),y.isData3DTexture&&(ie=n.TEXTURE_3D);const ae=Oe(L,y),J=y.source;t.bindTexture(ie,L.__webglTexture,n.TEXTURE0+W);const Re=i.get(J);if(J.version!==Re.__version||ae===!0){t.activeTexture(n.TEXTURE0+W);const _e=dt.getPrimaries(dt.workingColorSpace),ze=y.colorSpace===gi?null:dt.getPrimaries(y.colorSpace),Ce=y.colorSpace===gi||_e===ze?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,y.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,y.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ce);let le=b(y.image,!1,r.maxTextureSize);le=Fe(y,le);const de=s.convert(y.format,y.colorSpace),Ge=s.convert(y.type);let ke=A(y.internalFormat,de,Ge,y.colorSpace,y.isVideoTexture);we(ie,y);let ee;const qe=y.mipmaps,z=y.isVideoTexture!==!0,ge=Re.__version===void 0||ae===!0,pe=J.dataReady,me=M(y,le);if(y.isDepthTexture)ke=E(y.format===Br,y.type),ge&&(z?t.texStorage2D(n.TEXTURE_2D,1,ke,le.width,le.height):t.texImage2D(n.TEXTURE_2D,0,ke,le.width,le.height,0,de,Ge,null));else if(y.isDataTexture)if(qe.length>0){z&&ge&&t.texStorage2D(n.TEXTURE_2D,me,ke,qe[0].width,qe[0].height);for(let ue=0,se=qe.length;ue<se;ue++)ee=qe[ue],z?pe&&t.texSubImage2D(n.TEXTURE_2D,ue,0,0,ee.width,ee.height,de,Ge,ee.data):t.texImage2D(n.TEXTURE_2D,ue,ke,ee.width,ee.height,0,de,Ge,ee.data);y.generateMipmaps=!1}else z?(ge&&t.texStorage2D(n.TEXTURE_2D,me,ke,le.width,le.height),pe&&ct(y,le,de,Ge)):t.texImage2D(n.TEXTURE_2D,0,ke,le.width,le.height,0,de,Ge,le.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){z&&ge&&t.texStorage3D(n.TEXTURE_2D_ARRAY,me,ke,qe[0].width,qe[0].height,le.depth);for(let ue=0,se=qe.length;ue<se;ue++)if(ee=qe[ue],y.format!==Dn)if(de!==null)if(z){if(pe)if(y.layerUpdates.size>0){const Se=Wc(ee.width,ee.height,y.format,y.type);for(const Xe of y.layerUpdates){const lt=ee.data.subarray(Xe*Se/ee.data.BYTES_PER_ELEMENT,(Xe+1)*Se/ee.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ue,0,0,Xe,ee.width,ee.height,1,de,lt)}y.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ue,0,0,0,ee.width,ee.height,le.depth,de,ee.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ue,ke,ee.width,ee.height,le.depth,0,ee.data,0,0);else Ke("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else z?pe&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,ue,0,0,0,ee.width,ee.height,le.depth,de,Ge,ee.data):t.texImage3D(n.TEXTURE_2D_ARRAY,ue,ke,ee.width,ee.height,le.depth,0,de,Ge,ee.data)}else{z&&ge&&t.texStorage2D(n.TEXTURE_2D,me,ke,qe[0].width,qe[0].height);for(let ue=0,se=qe.length;ue<se;ue++)ee=qe[ue],y.format!==Dn?de!==null?z?pe&&t.compressedTexSubImage2D(n.TEXTURE_2D,ue,0,0,ee.width,ee.height,de,ee.data):t.compressedTexImage2D(n.TEXTURE_2D,ue,ke,ee.width,ee.height,0,ee.data):Ke("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):z?pe&&t.texSubImage2D(n.TEXTURE_2D,ue,0,0,ee.width,ee.height,de,Ge,ee.data):t.texImage2D(n.TEXTURE_2D,ue,ke,ee.width,ee.height,0,de,Ge,ee.data)}else if(y.isDataArrayTexture)if(z){if(ge&&t.texStorage3D(n.TEXTURE_2D_ARRAY,me,ke,le.width,le.height,le.depth),pe)if(y.layerUpdates.size>0){const ue=Wc(le.width,le.height,y.format,y.type);for(const se of y.layerUpdates){const Se=le.data.subarray(se*ue/le.data.BYTES_PER_ELEMENT,(se+1)*ue/le.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,se,le.width,le.height,1,de,Ge,Se)}y.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,le.width,le.height,le.depth,de,Ge,le.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,ke,le.width,le.height,le.depth,0,de,Ge,le.data);else if(y.isData3DTexture)z?(ge&&t.texStorage3D(n.TEXTURE_3D,me,ke,le.width,le.height,le.depth),pe&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,le.width,le.height,le.depth,de,Ge,le.data)):t.texImage3D(n.TEXTURE_3D,0,ke,le.width,le.height,le.depth,0,de,Ge,le.data);else if(y.isFramebufferTexture){if(ge)if(z)t.texStorage2D(n.TEXTURE_2D,me,ke,le.width,le.height);else{let ue=le.width,se=le.height;for(let Se=0;Se<me;Se++)t.texImage2D(n.TEXTURE_2D,Se,ke,ue,se,0,de,Ge,null),ue>>=1,se>>=1}}else if(qe.length>0){if(z&&ge){const ue=$e(qe[0]);t.texStorage2D(n.TEXTURE_2D,me,ke,ue.width,ue.height)}for(let ue=0,se=qe.length;ue<se;ue++)ee=qe[ue],z?pe&&t.texSubImage2D(n.TEXTURE_2D,ue,0,0,de,Ge,ee):t.texImage2D(n.TEXTURE_2D,ue,ke,de,Ge,ee);y.generateMipmaps=!1}else if(z){if(ge){const ue=$e(le);t.texStorage2D(n.TEXTURE_2D,me,ke,ue.width,ue.height)}pe&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,de,Ge,le)}else t.texImage2D(n.TEXTURE_2D,0,ke,de,Ge,le);m(y)&&h(ie),Re.__version=J.version,y.onUpdate&&y.onUpdate(y)}L.__version=y.version}function ce(L,y,W){if(y.image.length!==6)return;const ie=Oe(L,y),ae=y.source;t.bindTexture(n.TEXTURE_CUBE_MAP,L.__webglTexture,n.TEXTURE0+W);const J=i.get(ae);if(ae.version!==J.__version||ie===!0){t.activeTexture(n.TEXTURE0+W);const Re=dt.getPrimaries(dt.workingColorSpace),_e=y.colorSpace===gi?null:dt.getPrimaries(y.colorSpace),ze=y.colorSpace===gi||Re===_e?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,y.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,y.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ze);const Ce=y.isCompressedTexture||y.image[0].isCompressedTexture,le=y.image[0]&&y.image[0].isDataTexture,de=[];for(let se=0;se<6;se++)!Ce&&!le?de[se]=b(y.image[se],!0,r.maxCubemapSize):de[se]=le?y.image[se].image:y.image[se],de[se]=Fe(y,de[se]);const Ge=de[0],ke=s.convert(y.format,y.colorSpace),ee=s.convert(y.type),qe=A(y.internalFormat,ke,ee,y.colorSpace),z=y.isVideoTexture!==!0,ge=J.__version===void 0||ie===!0,pe=ae.dataReady;let me=M(y,Ge);we(n.TEXTURE_CUBE_MAP,y);let ue;if(Ce){z&&ge&&t.texStorage2D(n.TEXTURE_CUBE_MAP,me,qe,Ge.width,Ge.height);for(let se=0;se<6;se++){ue=de[se].mipmaps;for(let Se=0;Se<ue.length;Se++){const Xe=ue[Se];y.format!==Dn?ke!==null?z?pe&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,Se,0,0,Xe.width,Xe.height,ke,Xe.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,Se,qe,Xe.width,Xe.height,0,Xe.data):Ke("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):z?pe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,Se,0,0,Xe.width,Xe.height,ke,ee,Xe.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,Se,qe,Xe.width,Xe.height,0,ke,ee,Xe.data)}}}else{if(ue=y.mipmaps,z&&ge){ue.length>0&&me++;const se=$e(de[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,me,qe,se.width,se.height)}for(let se=0;se<6;se++)if(le){z?pe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,0,0,de[se].width,de[se].height,ke,ee,de[se].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,qe,de[se].width,de[se].height,0,ke,ee,de[se].data);for(let Se=0;Se<ue.length;Se++){const lt=ue[Se].image[se].image;z?pe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,Se+1,0,0,lt.width,lt.height,ke,ee,lt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,Se+1,qe,lt.width,lt.height,0,ke,ee,lt.data)}}else{z?pe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,0,0,ke,ee,de[se]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,qe,ke,ee,de[se]);for(let Se=0;Se<ue.length;Se++){const Xe=ue[Se];z?pe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,Se+1,0,0,ke,ee,Xe.image[se]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,Se+1,qe,ke,ee,Xe.image[se])}}}m(y)&&h(n.TEXTURE_CUBE_MAP),J.__version=ae.version,y.onUpdate&&y.onUpdate(y)}L.__version=y.version}function Ee(L,y,W,ie,ae,J){const Re=s.convert(W.format,W.colorSpace),_e=s.convert(W.type),ze=A(W.internalFormat,Re,_e,W.colorSpace),Ce=i.get(y),le=i.get(W);if(le.__renderTarget=y,!Ce.__hasExternalTextures){const de=Math.max(1,y.width>>J),Ge=Math.max(1,y.height>>J);ae===n.TEXTURE_3D||ae===n.TEXTURE_2D_ARRAY?t.texImage3D(ae,J,ze,de,Ge,y.depth,0,Re,_e,null):t.texImage2D(ae,J,ze,de,Ge,0,Re,_e,null)}t.bindFramebuffer(n.FRAMEBUFFER,L),be(y)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ie,ae,le.__webglTexture,0,pt(y)):(ae===n.TEXTURE_2D||ae>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&ae<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,ie,ae,le.__webglTexture,J),t.bindFramebuffer(n.FRAMEBUFFER,null)}function Ye(L,y,W){if(n.bindRenderbuffer(n.RENDERBUFFER,L),y.depthBuffer){const ie=y.depthTexture,ae=ie&&ie.isDepthTexture?ie.type:null,J=E(y.stencilBuffer,ae),Re=y.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,_e=pt(y);be(y)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,_e,J,y.width,y.height):W?n.renderbufferStorageMultisample(n.RENDERBUFFER,_e,J,y.width,y.height):n.renderbufferStorage(n.RENDERBUFFER,J,y.width,y.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Re,n.RENDERBUFFER,L)}else{const ie=y.textures;for(let ae=0;ae<ie.length;ae++){const J=ie[ae],Re=s.convert(J.format,J.colorSpace),_e=s.convert(J.type),ze=A(J.internalFormat,Re,_e,J.colorSpace),Ce=pt(y);W&&be(y)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Ce,ze,y.width,y.height):be(y)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Ce,ze,y.width,y.height):n.renderbufferStorage(n.RENDERBUFFER,ze,y.width,y.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Le(L,y){if(y&&y.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,L),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const ie=i.get(y.depthTexture);ie.__renderTarget=y,(!ie.__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),X(y.depthTexture,0);const ae=ie.__webglTexture,J=pt(y);if(y.depthTexture.format===zr)be(y)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ae,0,J):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ae,0);else if(y.depthTexture.format===Br)be(y)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ae,0,J):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ae,0);else throw new Error("Unknown depthTexture format")}function et(L){const y=i.get(L),W=L.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==L.depthTexture){const ie=L.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),ie){const ae=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,ie.removeEventListener("dispose",ae)};ie.addEventListener("dispose",ae),y.__depthDisposeCallback=ae}y.__boundDepthTexture=ie}if(L.depthTexture&&!y.__autoAllocateDepthBuffer){if(W)throw new Error("target.depthTexture not supported in Cube render targets");const ie=L.texture.mipmaps;ie&&ie.length>0?Le(y.__webglFramebuffer[0],L):Le(y.__webglFramebuffer,L)}else if(W){y.__webglDepthbuffer=[];for(let ie=0;ie<6;ie++)if(t.bindFramebuffer(n.FRAMEBUFFER,y.__webglFramebuffer[ie]),y.__webglDepthbuffer[ie]===void 0)y.__webglDepthbuffer[ie]=n.createRenderbuffer(),Ye(y.__webglDepthbuffer[ie],L,!1);else{const ae=L.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,J=y.__webglDepthbuffer[ie];n.bindRenderbuffer(n.RENDERBUFFER,J),n.framebufferRenderbuffer(n.FRAMEBUFFER,ae,n.RENDERBUFFER,J)}}else{const ie=L.texture.mipmaps;if(ie&&ie.length>0?t.bindFramebuffer(n.FRAMEBUFFER,y.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=n.createRenderbuffer(),Ye(y.__webglDepthbuffer,L,!1);else{const ae=L.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,J=y.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,J),n.framebufferRenderbuffer(n.FRAMEBUFFER,ae,n.RENDERBUFFER,J)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function Dt(L,y,W){const ie=i.get(L);y!==void 0&&Ee(ie.__webglFramebuffer,L,L.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),W!==void 0&&et(L)}function tt(L){const y=L.texture,W=i.get(L),ie=i.get(y);L.addEventListener("dispose",R);const ae=L.textures,J=L.isWebGLCubeRenderTarget===!0,Re=ae.length>1;if(Re||(ie.__webglTexture===void 0&&(ie.__webglTexture=n.createTexture()),ie.__version=y.version,a.memory.textures++),J){W.__webglFramebuffer=[];for(let _e=0;_e<6;_e++)if(y.mipmaps&&y.mipmaps.length>0){W.__webglFramebuffer[_e]=[];for(let ze=0;ze<y.mipmaps.length;ze++)W.__webglFramebuffer[_e][ze]=n.createFramebuffer()}else W.__webglFramebuffer[_e]=n.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){W.__webglFramebuffer=[];for(let _e=0;_e<y.mipmaps.length;_e++)W.__webglFramebuffer[_e]=n.createFramebuffer()}else W.__webglFramebuffer=n.createFramebuffer();if(Re)for(let _e=0,ze=ae.length;_e<ze;_e++){const Ce=i.get(ae[_e]);Ce.__webglTexture===void 0&&(Ce.__webglTexture=n.createTexture(),a.memory.textures++)}if(L.samples>0&&be(L)===!1){W.__webglMultisampledFramebuffer=n.createFramebuffer(),W.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,W.__webglMultisampledFramebuffer);for(let _e=0;_e<ae.length;_e++){const ze=ae[_e];W.__webglColorRenderbuffer[_e]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,W.__webglColorRenderbuffer[_e]);const Ce=s.convert(ze.format,ze.colorSpace),le=s.convert(ze.type),de=A(ze.internalFormat,Ce,le,ze.colorSpace,L.isXRRenderTarget===!0),Ge=pt(L);n.renderbufferStorageMultisample(n.RENDERBUFFER,Ge,de,L.width,L.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+_e,n.RENDERBUFFER,W.__webglColorRenderbuffer[_e])}n.bindRenderbuffer(n.RENDERBUFFER,null),L.depthBuffer&&(W.__webglDepthRenderbuffer=n.createRenderbuffer(),Ye(W.__webglDepthRenderbuffer,L,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(J){t.bindTexture(n.TEXTURE_CUBE_MAP,ie.__webglTexture),we(n.TEXTURE_CUBE_MAP,y);for(let _e=0;_e<6;_e++)if(y.mipmaps&&y.mipmaps.length>0)for(let ze=0;ze<y.mipmaps.length;ze++)Ee(W.__webglFramebuffer[_e][ze],L,y,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,ze);else Ee(W.__webglFramebuffer[_e],L,y,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0);m(y)&&h(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Re){for(let _e=0,ze=ae.length;_e<ze;_e++){const Ce=ae[_e],le=i.get(Ce);let de=n.TEXTURE_2D;(L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(de=L.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(de,le.__webglTexture),we(de,Ce),Ee(W.__webglFramebuffer,L,Ce,n.COLOR_ATTACHMENT0+_e,de,0),m(Ce)&&h(de)}t.unbindTexture()}else{let _e=n.TEXTURE_2D;if((L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(_e=L.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(_e,ie.__webglTexture),we(_e,y),y.mipmaps&&y.mipmaps.length>0)for(let ze=0;ze<y.mipmaps.length;ze++)Ee(W.__webglFramebuffer[ze],L,y,n.COLOR_ATTACHMENT0,_e,ze);else Ee(W.__webglFramebuffer,L,y,n.COLOR_ATTACHMENT0,_e,0);m(y)&&h(_e),t.unbindTexture()}L.depthBuffer&&et(L)}function yt(L){const y=L.textures;for(let W=0,ie=y.length;W<ie;W++){const ae=y[W];if(m(ae)){const J=w(L),Re=i.get(ae).__webglTexture;t.bindTexture(J,Re),h(J),t.unbindTexture()}}}const O=[],nt=[];function it(L){if(L.samples>0){if(be(L)===!1){const y=L.textures,W=L.width,ie=L.height;let ae=n.COLOR_BUFFER_BIT;const J=L.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Re=i.get(L),_e=y.length>1;if(_e)for(let Ce=0;Ce<y.length;Ce++)t.bindFramebuffer(n.FRAMEBUFFER,Re.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ce,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,Re.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ce,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,Re.__webglMultisampledFramebuffer);const ze=L.texture.mipmaps;ze&&ze.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Re.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Re.__webglFramebuffer);for(let Ce=0;Ce<y.length;Ce++){if(L.resolveDepthBuffer&&(L.depthBuffer&&(ae|=n.DEPTH_BUFFER_BIT),L.stencilBuffer&&L.resolveStencilBuffer&&(ae|=n.STENCIL_BUFFER_BIT)),_e){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Re.__webglColorRenderbuffer[Ce]);const le=i.get(y[Ce]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,le,0)}n.blitFramebuffer(0,0,W,ie,0,0,W,ie,ae,n.NEAREST),c===!0&&(O.length=0,nt.length=0,O.push(n.COLOR_ATTACHMENT0+Ce),L.depthBuffer&&L.resolveDepthBuffer===!1&&(O.push(J),nt.push(J),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,nt)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,O))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),_e)for(let Ce=0;Ce<y.length;Ce++){t.bindFramebuffer(n.FRAMEBUFFER,Re.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ce,n.RENDERBUFFER,Re.__webglColorRenderbuffer[Ce]);const le=i.get(y[Ce]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,Re.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ce,n.TEXTURE_2D,le,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Re.__webglMultisampledFramebuffer)}else if(L.depthBuffer&&L.resolveDepthBuffer===!1&&c){const y=L.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[y])}}}function pt(L){return Math.min(r.maxSamples,L.samples)}function be(L){const y=i.get(L);return L.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function St(L){const y=a.render.frame;u.get(L)!==y&&(u.set(L,y),L.update())}function Fe(L,y){const W=L.colorSpace,ie=L.format,ae=L.type;return L.isCompressedTexture===!0||L.isVideoTexture===!0||W!==xr&&W!==gi&&(dt.getTransfer(W)===_t?(ie!==Dn||ae!==Gn)&&Ke("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Pt("WebGLTextures: Unsupported texture color space:",W)),y}function $e(L){return typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement?(l.width=L.naturalWidth||L.width,l.height=L.naturalHeight||L.height):typeof VideoFrame<"u"&&L instanceof VideoFrame?(l.width=L.displayWidth,l.height=L.displayHeight):(l.width=L.width,l.height=L.height),l}this.allocateTextureUnit=I,this.resetTextureUnits=N,this.setTexture2D=X,this.setTexture2DArray=Z,this.setTexture3D=re,this.setTextureCube=K,this.rebindTextures=Dt,this.setupRenderTarget=tt,this.updateRenderTargetMipmap=yt,this.updateMultisampleRenderTarget=it,this.setupDepthRenderbuffer=et,this.setupFrameBufferTexture=Ee,this.useMultisampledRTT=be}function Hm(n,e){function t(i,r=gi){let s;const a=dt.getTransfer(r);if(i===Gn)return n.UNSIGNED_BYTE;if(i===Io)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Uo)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Il)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Ul)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Ll)return n.BYTE;if(i===Dl)return n.SHORT;if(i===Nr)return n.UNSIGNED_SHORT;if(i===Do)return n.INT;if(i===zi)return n.UNSIGNED_INT;if(i===kn)return n.FLOAT;if(i===vr)return n.HALF_FLOAT;if(i===Fl)return n.ALPHA;if(i===Nl)return n.RGB;if(i===Dn)return n.RGBA;if(i===zr)return n.DEPTH_COMPONENT;if(i===Br)return n.DEPTH_STENCIL;if(i===Fo)return n.RED;if(i===No)return n.RED_INTEGER;if(i===Oo)return n.RG;if(i===zo)return n.RG_INTEGER;if(i===Bo)return n.RGBA_INTEGER;if(i===ys||i===bs||i===Ms||i===Ss)if(a===_t)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===ys)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===bs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Ms)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Ss)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===ys)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===bs)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Ms)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Ss)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===$a||i===Ya||i===ja||i===Ka)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===$a)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Ya)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===ja)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Ka)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Za||i===Ja||i===Qa)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Za||i===Ja)return a===_t?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Qa)return a===_t?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===eo||i===to||i===no||i===io||i===ro||i===so||i===ao||i===oo||i===co||i===lo||i===uo||i===ho||i===fo||i===po)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===eo)return a===_t?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===to)return a===_t?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===no)return a===_t?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===io)return a===_t?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===ro)return a===_t?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===so)return a===_t?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===ao)return a===_t?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===oo)return a===_t?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===co)return a===_t?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===lo)return a===_t?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===uo)return a===_t?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===ho)return a===_t?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===fo)return a===_t?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===po)return a===_t?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===mo||i===xo||i===go)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===mo)return a===_t?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===xo)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===go)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===_o||i===vo||i===yo||i===bo)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===_o)return s.COMPRESSED_RED_RGTC1_EXT;if(i===vo)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===yo)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===bo)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Or?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const Wm=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Xm=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class qm{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new Zl(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new ai({vertexShader:Wm,fragmentShader:Xm,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new nn(new _r(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class $m extends yr{constructor(e,t){super();const i=this;let r=null,s=1,a=null,o="local-floor",c=1,l=null,u=null,d=null,f=null,p=null,v=null;const b=typeof XRWebGLBinding<"u",m=new qm,h={},w=t.getContextAttributes();let A=null,E=null;const M=[],g=[],R=new rt;let P=null;const x=new cn;x.viewport=new vt;const _=new cn;_.viewport=new vt;const C=[x,_],N=new uh;let I=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(te){let ce=M[te];return ce===void 0&&(ce=new ya,M[te]=ce),ce.getTargetRaySpace()},this.getControllerGrip=function(te){let ce=M[te];return ce===void 0&&(ce=new ya,M[te]=ce),ce.getGripSpace()},this.getHand=function(te){let ce=M[te];return ce===void 0&&(ce=new ya,M[te]=ce),ce.getHandSpace()};function X(te){const ce=g.indexOf(te.inputSource);if(ce===-1)return;const Ee=M[ce];Ee!==void 0&&(Ee.update(te.inputSource,te.frame,l||a),Ee.dispatchEvent({type:te.type,data:te.inputSource}))}function Z(){r.removeEventListener("select",X),r.removeEventListener("selectstart",X),r.removeEventListener("selectend",X),r.removeEventListener("squeeze",X),r.removeEventListener("squeezestart",X),r.removeEventListener("squeezeend",X),r.removeEventListener("end",Z),r.removeEventListener("inputsourceschange",re);for(let te=0;te<M.length;te++){const ce=g[te];ce!==null&&(g[te]=null,M[te].disconnect(ce))}I=null,H=null,m.reset();for(const te in h)delete h[te];e.setRenderTarget(A),p=null,f=null,d=null,r=null,E=null,ct.stop(),i.isPresenting=!1,e.setPixelRatio(P),e.setSize(R.width,R.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(te){s=te,i.isPresenting===!0&&Ke("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(te){o=te,i.isPresenting===!0&&Ke("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(te){l=te},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return d===null&&b&&(d=new XRWebGLBinding(r,t)),d},this.getFrame=function(){return v},this.getSession=function(){return r},this.setSession=async function(te){if(r=te,r!==null){if(A=e.getRenderTarget(),r.addEventListener("select",X),r.addEventListener("selectstart",X),r.addEventListener("selectend",X),r.addEventListener("squeeze",X),r.addEventListener("squeezestart",X),r.addEventListener("squeezeend",X),r.addEventListener("end",Z),r.addEventListener("inputsourceschange",re),w.xrCompatible!==!0&&await t.makeXRCompatible(),P=e.getPixelRatio(),e.getSize(R),b&&"createProjectionLayer"in XRWebGLBinding.prototype){let Ee=null,Ye=null,Le=null;w.depth&&(Le=w.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Ee=w.stencil?Br:zr,Ye=w.stencil?Or:zi);const et={colorFormat:t.RGBA8,depthFormat:Le,scaleFactor:s};d=this.getBinding(),f=d.createProjectionLayer(et),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),E=new Bi(f.textureWidth,f.textureHeight,{format:Dn,type:Gn,depthTexture:new Kl(f.textureWidth,f.textureHeight,Ye,void 0,void 0,void 0,void 0,void 0,void 0,Ee),stencilBuffer:w.stencil,colorSpace:e.outputColorSpace,samples:w.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const Ee={antialias:w.antialias,alpha:!0,depth:w.depth,stencil:w.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,t,Ee),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),E=new Bi(p.framebufferWidth,p.framebufferHeight,{format:Dn,type:Gn,colorSpace:e.outputColorSpace,stencilBuffer:w.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}E.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await r.requestReferenceSpace(o),ct.setContext(r),ct.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function re(te){for(let ce=0;ce<te.removed.length;ce++){const Ee=te.removed[ce],Ye=g.indexOf(Ee);Ye>=0&&(g[Ye]=null,M[Ye].disconnect(Ee))}for(let ce=0;ce<te.added.length;ce++){const Ee=te.added[ce];let Ye=g.indexOf(Ee);if(Ye===-1){for(let et=0;et<M.length;et++)if(et>=g.length){g.push(Ee),Ye=et;break}else if(g[et]===null){g[et]=Ee,Ye=et;break}if(Ye===-1)break}const Le=M[Ye];Le&&Le.connect(Ee)}}const K=new B,ne=new B;function Q(te,ce,Ee){K.setFromMatrixPosition(ce.matrixWorld),ne.setFromMatrixPosition(Ee.matrixWorld);const Ye=K.distanceTo(ne),Le=ce.projectionMatrix.elements,et=Ee.projectionMatrix.elements,Dt=Le[14]/(Le[10]-1),tt=Le[14]/(Le[10]+1),yt=(Le[9]+1)/Le[5],O=(Le[9]-1)/Le[5],nt=(Le[8]-1)/Le[0],it=(et[8]+1)/et[0],pt=Dt*nt,be=Dt*it,St=Ye/(-nt+it),Fe=St*-nt;if(ce.matrixWorld.decompose(te.position,te.quaternion,te.scale),te.translateX(Fe),te.translateZ(St),te.matrixWorld.compose(te.position,te.quaternion,te.scale),te.matrixWorldInverse.copy(te.matrixWorld).invert(),Le[10]===-1)te.projectionMatrix.copy(ce.projectionMatrix),te.projectionMatrixInverse.copy(ce.projectionMatrixInverse);else{const $e=Dt+St,L=tt+St,y=pt-Fe,W=be+(Ye-Fe),ie=yt*tt/L*$e,ae=O*tt/L*$e;te.projectionMatrix.makePerspective(y,W,ie,ae,$e,L),te.projectionMatrixInverse.copy(te.projectionMatrix).invert()}}function fe(te,ce){ce===null?te.matrixWorld.copy(te.matrix):te.matrixWorld.multiplyMatrices(ce.matrixWorld,te.matrix),te.matrixWorldInverse.copy(te.matrixWorld).invert()}this.updateCamera=function(te){if(r===null)return;let ce=te.near,Ee=te.far;m.texture!==null&&(m.depthNear>0&&(ce=m.depthNear),m.depthFar>0&&(Ee=m.depthFar)),N.near=_.near=x.near=ce,N.far=_.far=x.far=Ee,(I!==N.near||H!==N.far)&&(r.updateRenderState({depthNear:N.near,depthFar:N.far}),I=N.near,H=N.far),N.layers.mask=te.layers.mask|6,x.layers.mask=N.layers.mask&3,_.layers.mask=N.layers.mask&5;const Ye=te.parent,Le=N.cameras;fe(N,Ye);for(let et=0;et<Le.length;et++)fe(Le[et],Ye);Le.length===2?Q(N,x,_):N.projectionMatrix.copy(x.projectionMatrix),we(te,N,Ye)};function we(te,ce,Ee){Ee===null?te.matrix.copy(ce.matrixWorld):(te.matrix.copy(Ee.matrixWorld),te.matrix.invert(),te.matrix.multiply(ce.matrixWorld)),te.matrix.decompose(te.position,te.quaternion,te.scale),te.updateMatrixWorld(!0),te.projectionMatrix.copy(ce.projectionMatrix),te.projectionMatrixInverse.copy(ce.projectionMatrixInverse),te.isPerspectiveCamera&&(te.fov=Ls*2*Math.atan(1/te.projectionMatrix.elements[5]),te.zoom=1)}this.getCamera=function(){return N},this.getFoveation=function(){if(!(f===null&&p===null))return c},this.setFoveation=function(te){c=te,f!==null&&(f.fixedFoveation=te),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=te)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(N)},this.getCameraTexture=function(te){return h[te]};let Oe=null;function We(te,ce){if(u=ce.getViewerPose(l||a),v=ce,u!==null){const Ee=u.views;p!==null&&(e.setRenderTargetFramebuffer(E,p.framebuffer),e.setRenderTarget(E));let Ye=!1;Ee.length!==N.cameras.length&&(N.cameras.length=0,Ye=!0);for(let tt=0;tt<Ee.length;tt++){const yt=Ee[tt];let O=null;if(p!==null)O=p.getViewport(yt);else{const it=d.getViewSubImage(f,yt);O=it.viewport,tt===0&&(e.setRenderTargetTextures(E,it.colorTexture,it.depthStencilTexture),e.setRenderTarget(E))}let nt=C[tt];nt===void 0&&(nt=new cn,nt.layers.enable(tt),nt.viewport=new vt,C[tt]=nt),nt.matrix.fromArray(yt.transform.matrix),nt.matrix.decompose(nt.position,nt.quaternion,nt.scale),nt.projectionMatrix.fromArray(yt.projectionMatrix),nt.projectionMatrixInverse.copy(nt.projectionMatrix).invert(),nt.viewport.set(O.x,O.y,O.width,O.height),tt===0&&(N.matrix.copy(nt.matrix),N.matrix.decompose(N.position,N.quaternion,N.scale)),Ye===!0&&N.cameras.push(nt)}const Le=r.enabledFeatures;if(Le&&Le.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&b){d=i.getBinding();const tt=d.getDepthInformation(Ee[0]);tt&&tt.isValid&&tt.texture&&m.init(tt,r.renderState)}if(Le&&Le.includes("camera-access")&&b){e.state.unbindTexture(),d=i.getBinding();for(let tt=0;tt<Ee.length;tt++){const yt=Ee[tt].camera;if(yt){let O=h[yt];O||(O=new Zl,h[yt]=O);const nt=d.getCameraImage(yt);O.sourceTexture=nt}}}}for(let Ee=0;Ee<M.length;Ee++){const Ye=g[Ee],Le=M[Ee];Ye!==null&&Le!==void 0&&Le.update(Ye,ce,l||a)}Oe&&Oe(te,ce),ce.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ce}),v=null}const ct=new Ql;ct.setAnimationLoop(We),this.setAnimationLoop=function(te){Oe=te},this.dispose=function(){}}}const Li=new Un,Ym=new xt;function jm(n,e){function t(m,h){m.matrixAutoUpdate===!0&&m.updateMatrix(),h.value.copy(m.matrix)}function i(m,h){h.color.getRGB(m.fogColor.value,Wl(n)),h.isFog?(m.fogNear.value=h.near,m.fogFar.value=h.far):h.isFogExp2&&(m.fogDensity.value=h.density)}function r(m,h,w,A,E){h.isMeshBasicMaterial||h.isMeshLambertMaterial?s(m,h):h.isMeshToonMaterial?(s(m,h),d(m,h)):h.isMeshPhongMaterial?(s(m,h),u(m,h)):h.isMeshStandardMaterial?(s(m,h),f(m,h),h.isMeshPhysicalMaterial&&p(m,h,E)):h.isMeshMatcapMaterial?(s(m,h),v(m,h)):h.isMeshDepthMaterial?s(m,h):h.isMeshDistanceMaterial?(s(m,h),b(m,h)):h.isMeshNormalMaterial?s(m,h):h.isLineBasicMaterial?(a(m,h),h.isLineDashedMaterial&&o(m,h)):h.isPointsMaterial?c(m,h,w,A):h.isSpriteMaterial?l(m,h):h.isShadowMaterial?(m.color.value.copy(h.color),m.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function s(m,h){m.opacity.value=h.opacity,h.color&&m.diffuse.value.copy(h.color),h.emissive&&m.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(m.map.value=h.map,t(h.map,m.mapTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,t(h.alphaMap,m.alphaMapTransform)),h.bumpMap&&(m.bumpMap.value=h.bumpMap,t(h.bumpMap,m.bumpMapTransform),m.bumpScale.value=h.bumpScale,h.side===ln&&(m.bumpScale.value*=-1)),h.normalMap&&(m.normalMap.value=h.normalMap,t(h.normalMap,m.normalMapTransform),m.normalScale.value.copy(h.normalScale),h.side===ln&&m.normalScale.value.negate()),h.displacementMap&&(m.displacementMap.value=h.displacementMap,t(h.displacementMap,m.displacementMapTransform),m.displacementScale.value=h.displacementScale,m.displacementBias.value=h.displacementBias),h.emissiveMap&&(m.emissiveMap.value=h.emissiveMap,t(h.emissiveMap,m.emissiveMapTransform)),h.specularMap&&(m.specularMap.value=h.specularMap,t(h.specularMap,m.specularMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest);const w=e.get(h),A=w.envMap,E=w.envMapRotation;A&&(m.envMap.value=A,Li.copy(E),Li.x*=-1,Li.y*=-1,Li.z*=-1,A.isCubeTexture&&A.isRenderTargetTexture===!1&&(Li.y*=-1,Li.z*=-1),m.envMapRotation.value.setFromMatrix4(Ym.makeRotationFromEuler(Li)),m.flipEnvMap.value=A.isCubeTexture&&A.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=h.reflectivity,m.ior.value=h.ior,m.refractionRatio.value=h.refractionRatio),h.lightMap&&(m.lightMap.value=h.lightMap,m.lightMapIntensity.value=h.lightMapIntensity,t(h.lightMap,m.lightMapTransform)),h.aoMap&&(m.aoMap.value=h.aoMap,m.aoMapIntensity.value=h.aoMapIntensity,t(h.aoMap,m.aoMapTransform))}function a(m,h){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,h.map&&(m.map.value=h.map,t(h.map,m.mapTransform))}function o(m,h){m.dashSize.value=h.dashSize,m.totalSize.value=h.dashSize+h.gapSize,m.scale.value=h.scale}function c(m,h,w,A){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,m.size.value=h.size*w,m.scale.value=A*.5,h.map&&(m.map.value=h.map,t(h.map,m.uvTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,t(h.alphaMap,m.alphaMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest)}function l(m,h){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,m.rotation.value=h.rotation,h.map&&(m.map.value=h.map,t(h.map,m.mapTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,t(h.alphaMap,m.alphaMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest)}function u(m,h){m.specular.value.copy(h.specular),m.shininess.value=Math.max(h.shininess,1e-4)}function d(m,h){h.gradientMap&&(m.gradientMap.value=h.gradientMap)}function f(m,h){m.metalness.value=h.metalness,h.metalnessMap&&(m.metalnessMap.value=h.metalnessMap,t(h.metalnessMap,m.metalnessMapTransform)),m.roughness.value=h.roughness,h.roughnessMap&&(m.roughnessMap.value=h.roughnessMap,t(h.roughnessMap,m.roughnessMapTransform)),h.envMap&&(m.envMapIntensity.value=h.envMapIntensity)}function p(m,h,w){m.ior.value=h.ior,h.sheen>0&&(m.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),m.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(m.sheenColorMap.value=h.sheenColorMap,t(h.sheenColorMap,m.sheenColorMapTransform)),h.sheenRoughnessMap&&(m.sheenRoughnessMap.value=h.sheenRoughnessMap,t(h.sheenRoughnessMap,m.sheenRoughnessMapTransform))),h.clearcoat>0&&(m.clearcoat.value=h.clearcoat,m.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(m.clearcoatMap.value=h.clearcoatMap,t(h.clearcoatMap,m.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,t(h.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(m.clearcoatNormalMap.value=h.clearcoatNormalMap,t(h.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===ln&&m.clearcoatNormalScale.value.negate())),h.dispersion>0&&(m.dispersion.value=h.dispersion),h.iridescence>0&&(m.iridescence.value=h.iridescence,m.iridescenceIOR.value=h.iridescenceIOR,m.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(m.iridescenceMap.value=h.iridescenceMap,t(h.iridescenceMap,m.iridescenceMapTransform)),h.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=h.iridescenceThicknessMap,t(h.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),h.transmission>0&&(m.transmission.value=h.transmission,m.transmissionSamplerMap.value=w.texture,m.transmissionSamplerSize.value.set(w.width,w.height),h.transmissionMap&&(m.transmissionMap.value=h.transmissionMap,t(h.transmissionMap,m.transmissionMapTransform)),m.thickness.value=h.thickness,h.thicknessMap&&(m.thicknessMap.value=h.thicknessMap,t(h.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=h.attenuationDistance,m.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(m.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(m.anisotropyMap.value=h.anisotropyMap,t(h.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=h.specularIntensity,m.specularColor.value.copy(h.specularColor),h.specularColorMap&&(m.specularColorMap.value=h.specularColorMap,t(h.specularColorMap,m.specularColorMapTransform)),h.specularIntensityMap&&(m.specularIntensityMap.value=h.specularIntensityMap,t(h.specularIntensityMap,m.specularIntensityMapTransform))}function v(m,h){h.matcap&&(m.matcap.value=h.matcap)}function b(m,h){const w=e.get(h).light;m.referencePosition.value.setFromMatrixPosition(w.matrixWorld),m.nearDistance.value=w.shadow.camera.near,m.farDistance.value=w.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function Km(n,e,t,i){let r={},s={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(w,A){const E=A.program;i.uniformBlockBinding(w,E)}function l(w,A){let E=r[w.id];E===void 0&&(v(w),E=u(w),r[w.id]=E,w.addEventListener("dispose",m));const M=A.program;i.updateUBOMapping(w,M);const g=e.render.frame;s[w.id]!==g&&(f(w),s[w.id]=g)}function u(w){const A=d();w.__bindingPointIndex=A;const E=n.createBuffer(),M=w.__size,g=w.usage;return n.bindBuffer(n.UNIFORM_BUFFER,E),n.bufferData(n.UNIFORM_BUFFER,M,g),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,A,E),E}function d(){for(let w=0;w<o;w++)if(a.indexOf(w)===-1)return a.push(w),w;return Pt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(w){const A=r[w.id],E=w.uniforms,M=w.__cache;n.bindBuffer(n.UNIFORM_BUFFER,A);for(let g=0,R=E.length;g<R;g++){const P=Array.isArray(E[g])?E[g]:[E[g]];for(let x=0,_=P.length;x<_;x++){const C=P[x];if(p(C,g,x,M)===!0){const N=C.__offset,I=Array.isArray(C.value)?C.value:[C.value];let H=0;for(let X=0;X<I.length;X++){const Z=I[X],re=b(Z);typeof Z=="number"||typeof Z=="boolean"?(C.__data[0]=Z,n.bufferSubData(n.UNIFORM_BUFFER,N+H,C.__data)):Z.isMatrix3?(C.__data[0]=Z.elements[0],C.__data[1]=Z.elements[1],C.__data[2]=Z.elements[2],C.__data[3]=0,C.__data[4]=Z.elements[3],C.__data[5]=Z.elements[4],C.__data[6]=Z.elements[5],C.__data[7]=0,C.__data[8]=Z.elements[6],C.__data[9]=Z.elements[7],C.__data[10]=Z.elements[8],C.__data[11]=0):(Z.toArray(C.__data,H),H+=re.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,N,C.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(w,A,E,M){const g=w.value,R=A+"_"+E;if(M[R]===void 0)return typeof g=="number"||typeof g=="boolean"?M[R]=g:M[R]=g.clone(),!0;{const P=M[R];if(typeof g=="number"||typeof g=="boolean"){if(P!==g)return M[R]=g,!0}else if(P.equals(g)===!1)return P.copy(g),!0}return!1}function v(w){const A=w.uniforms;let E=0;const M=16;for(let R=0,P=A.length;R<P;R++){const x=Array.isArray(A[R])?A[R]:[A[R]];for(let _=0,C=x.length;_<C;_++){const N=x[_],I=Array.isArray(N.value)?N.value:[N.value];for(let H=0,X=I.length;H<X;H++){const Z=I[H],re=b(Z),K=E%M,ne=K%re.boundary,Q=K+ne;E+=ne,Q!==0&&M-Q<re.storage&&(E+=M-Q),N.__data=new Float32Array(re.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=E,E+=re.storage}}}const g=E%M;return g>0&&(E+=M-g),w.__size=E,w.__cache={},this}function b(w){const A={boundary:0,storage:0};return typeof w=="number"||typeof w=="boolean"?(A.boundary=4,A.storage=4):w.isVector2?(A.boundary=8,A.storage=8):w.isVector3||w.isColor?(A.boundary=16,A.storage=12):w.isVector4?(A.boundary=16,A.storage=16):w.isMatrix3?(A.boundary=48,A.storage=48):w.isMatrix4?(A.boundary=64,A.storage=64):w.isTexture?Ke("WebGLRenderer: Texture samplers can not be part of an uniforms group."):Ke("WebGLRenderer: Unsupported uniform value type.",w),A}function m(w){const A=w.target;A.removeEventListener("dispose",m);const E=a.indexOf(A.__bindingPointIndex);a.splice(E,1),n.deleteBuffer(r[A.id]),delete r[A.id],delete s[A.id]}function h(){for(const w in r)n.deleteBuffer(r[w]);a=[],r={},s={}}return{bind:c,update:l,dispose:h}}const Zm=new Uint16Array([11481,15204,11534,15171,11808,15015,12385,14843,12894,14716,13396,14600,13693,14483,13976,14366,14237,14171,14405,13961,14511,13770,14605,13598,14687,13444,14760,13305,14822,13066,14876,12857,14923,12675,14963,12517,14997,12379,15025,12230,15049,12023,15070,11843,15086,11687,15100,11551,15111,11433,15120,11330,15127,11217,15132,11060,15135,10922,15138,10801,15139,10695,15139,10600,13012,14923,13020,14917,13064,14886,13176,14800,13349,14666,13513,14526,13724,14398,13960,14230,14200,14020,14383,13827,14488,13651,14583,13491,14667,13348,14740,13132,14803,12908,14856,12713,14901,12542,14938,12394,14968,12241,14992,12017,15010,11822,15024,11654,15034,11507,15041,11380,15044,11269,15044,11081,15042,10913,15037,10764,15031,10635,15023,10520,15014,10419,15003,10330,13657,14676,13658,14673,13670,14660,13698,14622,13750,14547,13834,14442,13956,14317,14112,14093,14291,13889,14407,13704,14499,13538,14586,13389,14664,13201,14733,12966,14792,12758,14842,12577,14882,12418,14915,12272,14940,12033,14959,11826,14972,11646,14980,11490,14983,11355,14983,11212,14979,11008,14971,10830,14961,10675,14950,10540,14936,10420,14923,10315,14909,10204,14894,10041,14089,14460,14090,14459,14096,14452,14112,14431,14141,14388,14186,14305,14252,14130,14341,13941,14399,13756,14467,13585,14539,13430,14610,13272,14677,13026,14737,12808,14790,12617,14833,12449,14869,12303,14896,12065,14916,11845,14929,11655,14937,11490,14939,11347,14936,11184,14930,10970,14921,10783,14912,10621,14900,10480,14885,10356,14867,10247,14848,10062,14827,9894,14805,9745,14400,14208,14400,14206,14402,14198,14406,14174,14415,14122,14427,14035,14444,13913,14469,13767,14504,13613,14548,13463,14598,13324,14651,13082,14704,12858,14752,12658,14795,12483,14831,12330,14860,12106,14881,11875,14895,11675,14903,11501,14905,11351,14903,11178,14900,10953,14892,10757,14880,10589,14865,10442,14847,10313,14827,10162,14805,9965,14782,9792,14757,9642,14731,9507,14562,13883,14562,13883,14563,13877,14566,13862,14570,13830,14576,13773,14584,13689,14595,13582,14613,13461,14637,13336,14668,13120,14704,12897,14741,12695,14776,12516,14808,12358,14835,12150,14856,11910,14870,11701,14878,11519,14882,11361,14884,11187,14880,10951,14871,10748,14858,10572,14842,10418,14823,10286,14801,10099,14777,9897,14751,9722,14725,9567,14696,9430,14666,9309,14702,13604,14702,13604,14702,13600,14703,13591,14705,13570,14707,13533,14709,13477,14712,13400,14718,13305,14727,13106,14743,12907,14762,12716,14784,12539,14807,12380,14827,12190,14844,11943,14855,11727,14863,11539,14870,11376,14871,11204,14868,10960,14858,10748,14845,10565,14829,10406,14809,10269,14786,10058,14761,9852,14734,9671,14705,9512,14674,9374,14641,9253,14608,9076,14821,13366,14821,13365,14821,13364,14821,13358,14821,13344,14821,13320,14819,13252,14817,13145,14815,13011,14814,12858,14817,12698,14823,12539,14832,12389,14841,12214,14850,11968,14856,11750,14861,11558,14866,11390,14867,11226,14862,10972,14853,10754,14840,10565,14823,10401,14803,10259,14780,10032,14754,9820,14725,9635,14694,9473,14661,9333,14627,9203,14593,8988,14557,8798,14923,13014,14922,13014,14922,13012,14922,13004,14920,12987,14919,12957,14915,12907,14909,12834,14902,12738,14894,12623,14888,12498,14883,12370,14880,12203,14878,11970,14875,11759,14873,11569,14874,11401,14872,11243,14865,10986,14855,10762,14842,10568,14825,10401,14804,10255,14781,10017,14754,9799,14725,9611,14692,9445,14658,9301,14623,9139,14587,8920,14548,8729,14509,8562,15008,12672,15008,12672,15008,12671,15007,12667,15005,12656,15001,12637,14997,12605,14989,12556,14978,12490,14966,12407,14953,12313,14940,12136,14927,11934,14914,11742,14903,11563,14896,11401,14889,11247,14879,10992,14866,10767,14851,10570,14833,10400,14812,10252,14789,10007,14761,9784,14731,9592,14698,9424,14663,9279,14627,9088,14588,8868,14548,8676,14508,8508,14467,8360,15080,12386,15080,12386,15079,12385,15078,12383,15076,12378,15072,12367,15066,12347,15057,12315,15045,12253,15030,12138,15012,11998,14993,11845,14972,11685,14951,11530,14935,11383,14920,11228,14904,10981,14887,10762,14870,10567,14850,10397,14827,10248,14803,9997,14774,9771,14743,9578,14710,9407,14674,9259,14637,9048,14596,8826,14555,8632,14514,8464,14471,8317,14427,8182,15139,12008,15139,12008,15138,12008,15137,12007,15135,12003,15130,11990,15124,11969,15115,11929,15102,11872,15086,11794,15064,11693,15041,11581,15013,11459,14987,11336,14966,11170,14944,10944,14921,10738,14898,10552,14875,10387,14850,10239,14824,9983,14794,9758,14762,9563,14728,9392,14692,9244,14653,9014,14611,8791,14569,8597,14526,8427,14481,8281,14436,8110,14391,7885,15188,11617,15188,11617,15187,11617,15186,11618,15183,11617,15179,11612,15173,11601,15163,11581,15150,11546,15133,11495,15110,11427,15083,11346,15051,11246,15024,11057,14996,10868,14967,10687,14938,10517,14911,10362,14882,10206,14853,9956,14821,9737,14787,9543,14752,9375,14715,9228,14675,8980,14632,8760,14589,8565,14544,8395,14498,8248,14451,8049,14404,7824,14357,7630,15228,11298,15228,11298,15227,11299,15226,11301,15223,11303,15219,11302,15213,11299,15204,11290,15191,11271,15174,11217,15150,11129,15119,11015,15087,10886,15057,10744,15024,10599,14990,10455,14957,10318,14924,10143,14891,9911,14856,9701,14820,9516,14782,9352,14744,9200,14703,8946,14659,8725,14615,8533,14568,8366,14521,8220,14472,7992,14423,7770,14374,7578,14315,7408,15260,10819,15260,10819,15259,10822,15258,10826,15256,10832,15251,10836,15246,10841,15237,10838,15225,10821,15207,10788,15183,10734,15151,10660,15120,10571,15087,10469,15049,10359,15012,10249,14974,10041,14937,9837,14900,9647,14860,9475,14820,9320,14779,9147,14736,8902,14691,8688,14646,8499,14598,8335,14549,8189,14499,7940,14448,7720,14397,7529,14347,7363,14256,7218,15285,10410,15285,10411,15285,10413,15284,10418,15282,10425,15278,10434,15272,10442,15264,10449,15252,10445,15235,10433,15210,10403,15179,10358,15149,10301,15113,10218,15073,10059,15033,9894,14991,9726,14951,9565,14909,9413,14865,9273,14822,9073,14777,8845,14730,8641,14682,8459,14633,8300,14583,8129,14531,7883,14479,7670,14426,7482,14373,7321,14305,7176,14201,6939,15305,9939,15305,9940,15305,9945,15304,9955,15302,9967,15298,9989,15293,10010,15286,10033,15274,10044,15258,10045,15233,10022,15205,9975,15174,9903,15136,9808,15095,9697,15053,9578,15009,9451,14965,9327,14918,9198,14871,8973,14825,8766,14775,8579,14725,8408,14675,8259,14622,8058,14569,7821,14515,7615,14460,7435,14405,7276,14350,7108,14256,6866,14149,6653,15321,9444,15321,9445,15321,9448,15320,9458,15317,9470,15314,9490,15310,9515,15302,9540,15292,9562,15276,9579,15251,9577,15226,9559,15195,9519,15156,9463,15116,9389,15071,9304,15025,9208,14978,9023,14927,8838,14878,8661,14827,8496,14774,8344,14722,8206,14667,7973,14612,7749,14556,7555,14499,7382,14443,7229,14385,7025,14322,6791,14210,6588,14100,6409,15333,8920,15333,8921,15332,8927,15332,8943,15329,8965,15326,9002,15322,9048,15316,9106,15307,9162,15291,9204,15267,9221,15244,9221,15212,9196,15175,9134,15133,9043,15088,8930,15040,8801,14990,8665,14938,8526,14886,8391,14830,8261,14775,8087,14719,7866,14661,7664,14603,7482,14544,7322,14485,7178,14426,6936,14367,6713,14281,6517,14166,6348,14054,6198,15341,8360,15341,8361,15341,8366,15341,8379,15339,8399,15336,8431,15332,8473,15326,8527,15318,8585,15302,8632,15281,8670,15258,8690,15227,8690,15191,8664,15149,8612,15104,8543,15055,8456,15001,8360,14948,8259,14892,8122,14834,7923,14776,7734,14716,7558,14656,7397,14595,7250,14534,7070,14472,6835,14410,6628,14350,6443,14243,6283,14125,6135,14010,5889,15348,7715,15348,7717,15348,7725,15347,7745,15345,7780,15343,7836,15339,7905,15334,8e3,15326,8103,15310,8193,15293,8239,15270,8270,15240,8287,15204,8283,15163,8260,15118,8223,15067,8143,15014,8014,14958,7873,14899,7723,14839,7573,14778,7430,14715,7293,14652,7164,14588,6931,14524,6720,14460,6531,14396,6362,14330,6210,14207,6015,14086,5781,13969,5576,15352,7114,15352,7116,15352,7128,15352,7159,15350,7195,15348,7237,15345,7299,15340,7374,15332,7457,15317,7544,15301,7633,15280,7703,15251,7754,15216,7775,15176,7767,15131,7733,15079,7670,15026,7588,14967,7492,14906,7387,14844,7278,14779,7171,14714,6965,14648,6770,14581,6587,14515,6420,14448,6269,14382,6123,14299,5881,14172,5665,14049,5477,13929,5310,15355,6329,15355,6330,15355,6339,15355,6362,15353,6410,15351,6472,15349,6572,15344,6688,15337,6835,15323,6985,15309,7142,15287,7220,15260,7277,15226,7310,15188,7326,15142,7318,15090,7285,15036,7239,14976,7177,14914,7045,14849,6892,14782,6736,14714,6581,14645,6433,14576,6293,14506,6164,14438,5946,14369,5733,14270,5540,14140,5369,14014,5216,13892,5043,15357,5483,15357,5484,15357,5496,15357,5528,15356,5597,15354,5692,15351,5835,15347,6011,15339,6195,15328,6317,15314,6446,15293,6566,15268,6668,15235,6746,15197,6796,15152,6811,15101,6790,15046,6748,14985,6673,14921,6583,14854,6479,14785,6371,14714,6259,14643,6149,14571,5946,14499,5750,14428,5567,14358,5401,14242,5250,14109,5111,13980,4870,13856,4657,15359,4555,15359,4557,15358,4573,15358,4633,15357,4715,15355,4841,15353,5061,15349,5216,15342,5391,15331,5577,15318,5770,15299,5967,15274,6150,15243,6223,15206,6280,15161,6310,15111,6317,15055,6300,14994,6262,14928,6208,14860,6141,14788,5994,14715,5838,14641,5684,14566,5529,14492,5384,14418,5247,14346,5121,14216,4892,14079,4682,13948,4496,13822,4330,15359,3498,15359,3501,15359,3520,15359,3598,15358,3719,15356,3860,15355,4137,15351,4305,15344,4563,15334,4809,15321,5116,15303,5273,15280,5418,15250,5547,15214,5653,15170,5722,15120,5761,15064,5763,15002,5733,14935,5673,14865,5597,14792,5504,14716,5400,14640,5294,14563,5185,14486,5041,14410,4841,14335,4655,14191,4482,14051,4325,13918,4183,13790,4012,15360,2282,15360,2285,15360,2306,15360,2401,15359,2547,15357,2748,15355,3103,15352,3349,15345,3675,15336,4020,15324,4272,15307,4496,15285,4716,15255,4908,15220,5086,15178,5170,15128,5214,15072,5234,15010,5231,14943,5206,14871,5166,14796,5102,14718,4971,14639,4833,14559,4687,14480,4541,14402,4401,14315,4268,14167,4142,14025,3958,13888,3747,13759,3556,15360,923,15360,925,15360,946,15360,1052,15359,1214,15357,1494,15356,1892,15352,2274,15346,2663,15338,3099,15326,3393,15309,3679,15288,3980,15260,4183,15226,4325,15185,4437,15136,4517,15080,4570,15018,4591,14950,4581,14877,4545,14800,4485,14720,4411,14638,4325,14556,4231,14475,4136,14395,3988,14297,3803,14145,3628,13999,3465,13861,3314,13729,3177,15360,263,15360,264,15360,272,15360,325,15359,407,15358,548,15356,780,15352,1144,15347,1580,15339,2099,15328,2425,15312,2795,15292,3133,15264,3329,15232,3517,15191,3689,15143,3819,15088,3923,15025,3978,14956,3999,14882,3979,14804,3931,14722,3855,14639,3756,14554,3645,14470,3529,14388,3409,14279,3289,14124,3173,13975,3055,13834,2848,13701,2658,15360,49,15360,49,15360,52,15360,75,15359,111,15358,201,15356,283,15353,519,15348,726,15340,1045,15329,1415,15314,1795,15295,2173,15269,2410,15237,2649,15197,2866,15150,3054,15095,3140,15032,3196,14963,3228,14888,3236,14808,3224,14725,3191,14639,3146,14553,3088,14466,2976,14382,2836,14262,2692,14103,2549,13952,2409,13808,2278,13674,2154,15360,4,15360,4,15360,4,15360,13,15359,33,15358,59,15357,112,15353,199,15348,302,15341,456,15331,628,15316,827,15297,1082,15272,1332,15241,1601,15202,1851,15156,2069,15101,2172,15039,2256,14970,2314,14894,2348,14813,2358,14728,2344,14640,2311,14551,2263,14463,2203,14376,2133,14247,2059,14084,1915,13930,1761,13784,1609,13648,1464,15360,0,15360,0,15360,0,15360,3,15359,18,15358,26,15357,53,15354,80,15348,97,15341,165,15332,238,15318,326,15299,427,15275,529,15245,654,15207,771,15161,885,15108,994,15046,1089,14976,1170,14900,1229,14817,1266,14731,1284,14641,1282,14550,1260,14460,1223,14370,1174,14232,1116,14066,1050,13909,981,13761,910,13623,839]);let jn=null;function Jm(){return jn===null&&(jn=new $l(Zm,32,32,Oo,vr),jn.minFilter=bn,jn.magFilter=bn,jn.wrapS=ei,jn.wrapT=ei,jn.generateMipmaps=!1,jn.needsUpdate=!0),jn}class Qm{constructor(e={}){const{canvas:t=Md(),context:i=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=a;const v=new Set([Bo,zo,No]),b=new Set([Gn,zi,Nr,Or,Io,Uo]),m=new Uint32Array(4),h=new Int32Array(4);let w=null,A=null;const E=[],M=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=yi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const g=this;let R=!1;this._outputColorSpace=tn;let P=0,x=0,_=null,C=-1,N=null;const I=new vt,H=new vt;let X=null;const Z=new at(0);let re=0,K=t.width,ne=t.height,Q=1,fe=null,we=null;const Oe=new vt(0,0,K,ne),We=new vt(0,0,K,ne);let ct=!1;const te=new Ho;let ce=!1,Ee=!1;const Ye=new xt,Le=new B,et=new vt,Dt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let tt=!1;function yt(){return _===null?Q:1}let O=i;function nt(S,k){return t.getContext(S,k)}try{const S={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Lo}`),t.addEventListener("webglcontextlost",ue,!1),t.addEventListener("webglcontextrestored",se,!1),t.addEventListener("webglcontextcreationerror",Se,!1),O===null){const k="webgl2";if(O=nt(k,S),O===null)throw nt(k)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(S){throw S("WebGLRenderer: "+S.message),S}let it,pt,be,St,Fe,$e,L,y,W,ie,ae,J,Re,_e,ze,Ce,le,de,Ge,ke,ee,qe,z,ge;function pe(){it=new o0(O),it.init(),qe=new Hm(O,it),pt=new Jp(O,it,e,qe),be=new Vm(O,it),pt.reversedDepthBuffer&&f&&be.buffers.depth.setReversed(!0),St=new u0(O),Fe=new Rm,$e=new Gm(O,it,be,Fe,pt,qe,St),L=new e0(g),y=new a0(g),W=new fh(O),z=new Kp(O,W),ie=new c0(O,W,St,z),ae=new h0(O,ie,W,St),Ge=new d0(O,pt,$e),Ce=new Qp(Fe),J=new wm(g,L,y,it,pt,z,Ce),Re=new jm(g,Fe),_e=new Pm,ze=new Nm(it),de=new jp(g,L,y,be,ae,p,c),le=new Bm(g,ae,pt),ge=new Km(O,St,pt,be),ke=new Zp(O,it,St),ee=new l0(O,it,St),St.programs=J.programs,g.capabilities=pt,g.extensions=it,g.properties=Fe,g.renderLists=_e,g.shadowMap=le,g.state=be,g.info=St}pe();const me=new $m(g,O);this.xr=me,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){const S=it.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=it.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return Q},this.setPixelRatio=function(S){S!==void 0&&(Q=S,this.setSize(K,ne,!1))},this.getSize=function(S){return S.set(K,ne)},this.setSize=function(S,k,$=!0){if(me.isPresenting){Ke("WebGLRenderer: Can't change size while VR device is presenting.");return}K=S,ne=k,t.width=Math.floor(S*Q),t.height=Math.floor(k*Q),$===!0&&(t.style.width=S+"px",t.style.height=k+"px"),this.setViewport(0,0,S,k)},this.getDrawingBufferSize=function(S){return S.set(K*Q,ne*Q).floor()},this.setDrawingBufferSize=function(S,k,$){K=S,ne=k,Q=$,t.width=Math.floor(S*$),t.height=Math.floor(k*$),this.setViewport(0,0,S,k)},this.getCurrentViewport=function(S){return S.copy(I)},this.getViewport=function(S){return S.copy(Oe)},this.setViewport=function(S,k,$,q){S.isVector4?Oe.set(S.x,S.y,S.z,S.w):Oe.set(S,k,$,q),be.viewport(I.copy(Oe).multiplyScalar(Q).round())},this.getScissor=function(S){return S.copy(We)},this.setScissor=function(S,k,$,q){S.isVector4?We.set(S.x,S.y,S.z,S.w):We.set(S,k,$,q),be.scissor(H.copy(We).multiplyScalar(Q).round())},this.getScissorTest=function(){return ct},this.setScissorTest=function(S){be.setScissorTest(ct=S)},this.setOpaqueSort=function(S){fe=S},this.setTransparentSort=function(S){we=S},this.getClearColor=function(S){return S.copy(de.getClearColor())},this.setClearColor=function(){de.setClearColor(...arguments)},this.getClearAlpha=function(){return de.getClearAlpha()},this.setClearAlpha=function(){de.setClearAlpha(...arguments)},this.clear=function(S=!0,k=!0,$=!0){let q=0;if(S){let V=!1;if(_!==null){const he=_.texture.format;V=v.has(he)}if(V){const he=_.texture.type,xe=b.has(he),Ae=de.getClearColor(),Me=de.getClearAlpha(),He=Ae.r,De=Ae.g,Ie=Ae.b;xe?(m[0]=He,m[1]=De,m[2]=Ie,m[3]=Me,O.clearBufferuiv(O.COLOR,0,m)):(h[0]=He,h[1]=De,h[2]=Ie,h[3]=Me,O.clearBufferiv(O.COLOR,0,h))}else q|=O.COLOR_BUFFER_BIT}k&&(q|=O.DEPTH_BUFFER_BIT),$&&(q|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),O.clear(q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ue,!1),t.removeEventListener("webglcontextrestored",se,!1),t.removeEventListener("webglcontextcreationerror",Se,!1),de.dispose(),_e.dispose(),ze.dispose(),Fe.dispose(),L.dispose(),y.dispose(),ae.dispose(),z.dispose(),ge.dispose(),J.dispose(),me.dispose(),me.removeEventListener("sessionstart",rn),me.removeEventListener("sessionend",Tn),sn.stop()};function ue(S){S.preventDefault(),pc("WebGLRenderer: Context Lost."),R=!0}function se(){pc("WebGLRenderer: Context Restored."),R=!1;const S=St.autoReset,k=le.enabled,$=le.autoUpdate,q=le.needsUpdate,V=le.type;pe(),St.autoReset=S,le.enabled=k,le.autoUpdate=$,le.needsUpdate=q,le.type=V}function Se(S){Pt("WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function Xe(S){const k=S.target;k.removeEventListener("dispose",Xe),lt(k)}function lt(S){ut(S),Fe.remove(S)}function ut(S){const k=Fe.get(S).programs;k!==void 0&&(k.forEach(function($){J.releaseProgram($)}),S.isShaderMaterial&&J.releaseShaderCache(S))}this.renderBufferDirect=function(S,k,$,q,V,he){k===null&&(k=Dt);const xe=V.isMesh&&V.matrixWorld.determinant()<0,Ae=un(S,k,$,q,V);be.setMaterial(q,xe);let Me=$.index,He=1;if(q.wireframe===!0){if(Me=ie.getWireframeAttribute($),Me===void 0)return;He=2}const De=$.drawRange,Ie=$.attributes.position;let je=De.start*He,ft=(De.start+De.count)*He;he!==null&&(je=Math.max(je,he.start*He),ft=Math.min(ft,(he.start+he.count)*He)),Me!==null?(je=Math.max(je,0),ft=Math.min(ft,Me.count)):Ie!=null&&(je=Math.max(je,0),ft=Math.min(ft,Ie.count));const wt=ft-je;if(wt<0||wt===1/0)return;z.setup(V,q,Ae,$,Me);let Tt,mt=ke;if(Me!==null&&(Tt=W.get(Me),mt=ee,mt.setIndex(Tt)),V.isMesh)q.wireframe===!0?(be.setLineWidth(q.wireframeLinewidth*yt()),mt.setMode(O.LINES)):mt.setMode(O.TRIANGLES);else if(V.isLine){let Be=q.linewidth;Be===void 0&&(Be=1),be.setLineWidth(Be*yt()),V.isLineSegments?mt.setMode(O.LINES):V.isLineLoop?mt.setMode(O.LINE_LOOP):mt.setMode(O.LINE_STRIP)}else V.isPoints?mt.setMode(O.POINTS):V.isSprite&&mt.setMode(O.TRIANGLES);if(V.isBatchedMesh)if(V._multiDrawInstances!==null)kr("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),mt.renderMultiDrawInstances(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount,V._multiDrawInstances);else if(it.get("WEBGL_multi_draw"))mt.renderMultiDraw(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount);else{const Be=V._multiDrawStarts,At=V._multiDrawCounts,st=V._multiDrawCount,Qt=Me?W.get(Me).bytesPerElement:1,Nn=Fe.get(q).currentProgram.getUniforms();for(let Xt=0;Xt<st;Xt++)Nn.setValue(O,"_gl_DrawID",Xt),mt.render(Be[Xt]/Qt,At[Xt])}else if(V.isInstancedMesh)mt.renderInstances(je,wt,V.count);else if($.isInstancedBufferGeometry){const Be=$._maxInstanceCount!==void 0?$._maxInstanceCount:1/0,At=Math.min($.instanceCount,Be);mt.renderInstances(je,wt,At)}else mt.render(je,wt)};function gt(S,k,$){S.transparent===!0&&S.side===Pn&&S.forceSinglePass===!1?(S.side=ln,S.needsUpdate=!0,oi(S,k,$),S.side=Ei,S.needsUpdate=!0,oi(S,k,$),S.side=Pn):oi(S,k,$)}this.compile=function(S,k,$=null){$===null&&($=S),A=ze.get($),A.init(k),M.push(A),$.traverseVisible(function(V){V.isLight&&V.layers.test(k.layers)&&(A.pushLight(V),V.castShadow&&A.pushShadow(V))}),S!==$&&S.traverseVisible(function(V){V.isLight&&V.layers.test(k.layers)&&(A.pushLight(V),V.castShadow&&A.pushShadow(V))}),A.setupLights();const q=new Set;return S.traverse(function(V){if(!(V.isMesh||V.isPoints||V.isLine||V.isSprite))return;const he=V.material;if(he)if(Array.isArray(he))for(let xe=0;xe<he.length;xe++){const Ae=he[xe];gt(Ae,$,V),q.add(Ae)}else gt(he,$,V),q.add(he)}),A=M.pop(),q},this.compileAsync=function(S,k,$=null){const q=this.compile(S,k,$);return new Promise(V=>{function he(){if(q.forEach(function(xe){Fe.get(xe).currentProgram.isReady()&&q.delete(xe)}),q.size===0){V(S);return}setTimeout(he,10)}it.get("KHR_parallel_shader_compile")!==null?he():setTimeout(he,10)})};let Nt=null;function gn(S){Nt&&Nt(S)}function rn(){sn.stop()}function Tn(){sn.start()}const sn=new Ql;sn.setAnimationLoop(gn),typeof self<"u"&&sn.setContext(self),this.setAnimationLoop=function(S){Nt=S,me.setAnimationLoop(S),S===null?sn.stop():sn.start()},me.addEventListener("sessionstart",rn),me.addEventListener("sessionend",Tn),this.render=function(S,k){if(k!==void 0&&k.isCamera!==!0){Pt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),me.enabled===!0&&me.isPresenting===!0&&(me.cameraAutoUpdate===!0&&me.updateCamera(k),k=me.getCamera()),S.isScene===!0&&S.onBeforeRender(g,S,k,_),A=ze.get(S,M.length),A.init(k),M.push(A),Ye.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),te.setFromProjectionMatrix(Ye,Vn,k.reversedDepth),Ee=this.localClippingEnabled,ce=Ce.init(this.clippingPlanes,Ee),w=_e.get(S,E.length),w.init(),E.push(w),me.enabled===!0&&me.isPresenting===!0){const he=g.xr.getDepthSensingMesh();he!==null&&_n(he,k,-1/0,g.sortObjects)}_n(S,k,0,g.sortObjects),w.finish(),g.sortObjects===!0&&w.sort(fe,we),tt=me.enabled===!1||me.isPresenting===!1||me.hasDepthSensing()===!1,tt&&de.addToRenderList(w,S),this.info.render.frame++,ce===!0&&Ce.beginShadows();const $=A.state.shadowsArray;le.render($,S,k),ce===!0&&Ce.endShadows(),this.info.autoReset===!0&&this.info.reset();const q=w.opaque,V=w.transmissive;if(A.setupLights(),k.isArrayCamera){const he=k.cameras;if(V.length>0)for(let xe=0,Ae=he.length;xe<Ae;xe++){const Me=he[xe];Xi(q,V,S,Me)}tt&&de.render(S);for(let xe=0,Ae=he.length;xe<Ae;xe++){const Me=he[xe];It(w,S,Me,Me.viewport)}}else V.length>0&&Xi(q,V,S,k),tt&&de.render(S),It(w,S,k);_!==null&&x===0&&($e.updateMultisampleRenderTarget(_),$e.updateRenderTargetMipmap(_)),S.isScene===!0&&S.onAfterRender(g,S,k),z.resetDefaultState(),C=-1,N=null,M.pop(),M.length>0?(A=M[M.length-1],ce===!0&&Ce.setGlobalState(g.clippingPlanes,A.state.camera)):A=null,E.pop(),E.length>0?w=E[E.length-1]:w=null};function _n(S,k,$,q){if(S.visible===!1)return;if(S.layers.test(k.layers)){if(S.isGroup)$=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(k);else if(S.isLight)A.pushLight(S),S.castShadow&&A.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||te.intersectsSprite(S)){q&&et.setFromMatrixPosition(S.matrixWorld).applyMatrix4(Ye);const xe=ae.update(S),Ae=S.material;Ae.visible&&w.push(S,xe,Ae,$,et.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||te.intersectsObject(S))){const xe=ae.update(S),Ae=S.material;if(q&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),et.copy(S.boundingSphere.center)):(xe.boundingSphere===null&&xe.computeBoundingSphere(),et.copy(xe.boundingSphere.center)),et.applyMatrix4(S.matrixWorld).applyMatrix4(Ye)),Array.isArray(Ae)){const Me=xe.groups;for(let He=0,De=Me.length;He<De;He++){const Ie=Me[He],je=Ae[Ie.materialIndex];je&&je.visible&&w.push(S,xe,je,$,et.z,Ie)}}else Ae.visible&&w.push(S,xe,Ae,$,et.z,null)}}const he=S.children;for(let xe=0,Ae=he.length;xe<Ae;xe++)_n(he[xe],k,$,q)}function It(S,k,$,q){const{opaque:V,transmissive:he,transparent:xe}=S;A.setupLightsView($),ce===!0&&Ce.setGlobalState(g.clippingPlanes,$),q&&be.viewport(I.copy(q)),V.length>0&&Wt(V,k,$),he.length>0&&Wt(he,k,$),xe.length>0&&Wt(xe,k,$),be.buffers.depth.setTest(!0),be.buffers.depth.setMask(!0),be.buffers.color.setMask(!0),be.setPolygonOffset(!1)}function Xi(S,k,$,q){if(($.isScene===!0?$.overrideMaterial:null)!==null)return;A.state.transmissionRenderTarget[q.id]===void 0&&(A.state.transmissionRenderTarget[q.id]=new Bi(1,1,{generateMipmaps:!0,type:it.has("EXT_color_buffer_half_float")||it.has("EXT_color_buffer_float")?vr:Gn,minFilter:Ui,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:dt.workingColorSpace}));const he=A.state.transmissionRenderTarget[q.id],xe=q.viewport||I;he.setSize(xe.z*g.transmissionResolutionScale,xe.w*g.transmissionResolutionScale);const Ae=g.getRenderTarget(),Me=g.getActiveCubeFace(),He=g.getActiveMipmapLevel();g.setRenderTarget(he),g.getClearColor(Z),re=g.getClearAlpha(),re<1&&g.setClearColor(16777215,.5),g.clear(),tt&&de.render($);const De=g.toneMapping;g.toneMapping=yi;const Ie=q.viewport;if(q.viewport!==void 0&&(q.viewport=void 0),A.setupLightsView(q),ce===!0&&Ce.setGlobalState(g.clippingPlanes,q),Wt(S,$,q),$e.updateMultisampleRenderTarget(he),$e.updateRenderTargetMipmap(he),it.has("WEBGL_multisampled_render_to_texture")===!1){let je=!1;for(let ft=0,wt=k.length;ft<wt;ft++){const Tt=k[ft],{object:mt,geometry:Be,material:At,group:st}=Tt;if(At.side===Pn&&mt.layers.test(q.layers)){const Qt=At.side;At.side=ln,At.needsUpdate=!0,Jt(mt,$,q,Be,At,st),At.side=Qt,At.needsUpdate=!0,je=!0}}je===!0&&($e.updateMultisampleRenderTarget(he),$e.updateRenderTargetMipmap(he))}g.setRenderTarget(Ae,Me,He),g.setClearColor(Z,re),Ie!==void 0&&(q.viewport=Ie),g.toneMapping=De}function Wt(S,k,$){const q=k.isScene===!0?k.overrideMaterial:null;for(let V=0,he=S.length;V<he;V++){const xe=S[V],{object:Ae,geometry:Me,group:He}=xe;let De=xe.material;De.allowOverride===!0&&q!==null&&(De=q),Ae.layers.test($.layers)&&Jt(Ae,k,$,Me,De,He)}}function Jt(S,k,$,q,V,he){S.onBeforeRender(g,k,$,q,V,he),S.modelViewMatrix.multiplyMatrices($.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),V.onBeforeRender(g,k,$,q,S,he),V.transparent===!0&&V.side===Pn&&V.forceSinglePass===!1?(V.side=ln,V.needsUpdate=!0,g.renderBufferDirect($,k,q,V,S,he),V.side=Ei,V.needsUpdate=!0,g.renderBufferDirect($,k,q,V,S,he),V.side=Pn):g.renderBufferDirect($,k,q,V,S,he),S.onAfterRender(g,k,$,q,V,he)}function oi(S,k,$){k.isScene!==!0&&(k=Dt);const q=Fe.get(S),V=A.state.lights,he=A.state.shadowsArray,xe=V.state.version,Ae=J.getParameters(S,V.state,he,k,$),Me=J.getProgramCacheKey(Ae);let He=q.programs;q.environment=S.isMeshStandardMaterial?k.environment:null,q.fog=k.fog,q.envMap=(S.isMeshStandardMaterial?y:L).get(S.envMap||q.environment),q.envMapRotation=q.environment!==null&&S.envMap===null?k.environmentRotation:S.envMapRotation,He===void 0&&(S.addEventListener("dispose",Xe),He=new Map,q.programs=He);let De=He.get(Me);if(De!==void 0){if(q.currentProgram===De&&q.lightsStateVersion===xe)return an(S,Ae),De}else Ae.uniforms=J.getUniforms(S),S.onBeforeCompile(Ae,g),De=J.acquireProgram(Ae,Me),He.set(Me,De),q.uniforms=Ae.uniforms;const Ie=q.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Ie.clippingPlanes=Ce.uniform),an(S,Ae),q.needsLights=Fn(S),q.lightsStateVersion=xe,q.needsLights&&(Ie.ambientLightColor.value=V.state.ambient,Ie.lightProbe.value=V.state.probe,Ie.directionalLights.value=V.state.directional,Ie.directionalLightShadows.value=V.state.directionalShadow,Ie.spotLights.value=V.state.spot,Ie.spotLightShadows.value=V.state.spotShadow,Ie.rectAreaLights.value=V.state.rectArea,Ie.ltc_1.value=V.state.rectAreaLTC1,Ie.ltc_2.value=V.state.rectAreaLTC2,Ie.pointLights.value=V.state.point,Ie.pointLightShadows.value=V.state.pointShadow,Ie.hemisphereLights.value=V.state.hemi,Ie.directionalShadowMap.value=V.state.directionalShadowMap,Ie.directionalShadowMatrix.value=V.state.directionalShadowMatrix,Ie.spotShadowMap.value=V.state.spotShadowMap,Ie.spotLightMatrix.value=V.state.spotLightMatrix,Ie.spotLightMap.value=V.state.spotLightMap,Ie.pointShadowMap.value=V.state.pointShadowMap,Ie.pointShadowMatrix.value=V.state.pointShadowMatrix),q.currentProgram=De,q.uniformsList=null,De}function Ve(S){if(S.uniformsList===null){const k=S.currentProgram.getUniforms();S.uniformsList=Es.seqWithValue(k.seq,S.uniforms)}return S.uniformsList}function an(S,k){const $=Fe.get(S);$.outputColorSpace=k.outputColorSpace,$.batching=k.batching,$.batchingColor=k.batchingColor,$.instancing=k.instancing,$.instancingColor=k.instancingColor,$.instancingMorph=k.instancingMorph,$.skinning=k.skinning,$.morphTargets=k.morphTargets,$.morphNormals=k.morphNormals,$.morphColors=k.morphColors,$.morphTargetsCount=k.morphTargetsCount,$.numClippingPlanes=k.numClippingPlanes,$.numIntersection=k.numClipIntersection,$.vertexAlphas=k.vertexAlphas,$.vertexTangents=k.vertexTangents,$.toneMapping=k.toneMapping}function un(S,k,$,q,V){k.isScene!==!0&&(k=Dt),$e.resetTextureUnits();const he=k.fog,xe=q.isMeshStandardMaterial?k.environment:null,Ae=_===null?g.outputColorSpace:_.isXRRenderTarget===!0?_.texture.colorSpace:xr,Me=(q.isMeshStandardMaterial?y:L).get(q.envMap||xe),He=q.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,De=!!$.attributes.tangent&&(!!q.normalMap||q.anisotropy>0),Ie=!!$.morphAttributes.position,je=!!$.morphAttributes.normal,ft=!!$.morphAttributes.color;let wt=yi;q.toneMapped&&(_===null||_.isXRRenderTarget===!0)&&(wt=g.toneMapping);const Tt=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,mt=Tt!==void 0?Tt.length:0,Be=Fe.get(q),At=A.state.lights;if(ce===!0&&(Ee===!0||S!==N)){const G=S===N&&q.id===C;Ce.setState(q,S,G)}let st=!1;q.version===Be.__version?(Be.needsLights&&Be.lightsStateVersion!==At.state.version||Be.outputColorSpace!==Ae||V.isBatchedMesh&&Be.batching===!1||!V.isBatchedMesh&&Be.batching===!0||V.isBatchedMesh&&Be.batchingColor===!0&&V.colorTexture===null||V.isBatchedMesh&&Be.batchingColor===!1&&V.colorTexture!==null||V.isInstancedMesh&&Be.instancing===!1||!V.isInstancedMesh&&Be.instancing===!0||V.isSkinnedMesh&&Be.skinning===!1||!V.isSkinnedMesh&&Be.skinning===!0||V.isInstancedMesh&&Be.instancingColor===!0&&V.instanceColor===null||V.isInstancedMesh&&Be.instancingColor===!1&&V.instanceColor!==null||V.isInstancedMesh&&Be.instancingMorph===!0&&V.morphTexture===null||V.isInstancedMesh&&Be.instancingMorph===!1&&V.morphTexture!==null||Be.envMap!==Me||q.fog===!0&&Be.fog!==he||Be.numClippingPlanes!==void 0&&(Be.numClippingPlanes!==Ce.numPlanes||Be.numIntersection!==Ce.numIntersection)||Be.vertexAlphas!==He||Be.vertexTangents!==De||Be.morphTargets!==Ie||Be.morphNormals!==je||Be.morphColors!==ft||Be.toneMapping!==wt||Be.morphTargetsCount!==mt)&&(st=!0):(st=!0,Be.__version=q.version);let Qt=Be.currentProgram;st===!0&&(Qt=oi(q,k,V));let Nn=!1,Xt=!1,ci=!1;const T=Qt.getUniforms(),D=Be.uniforms;if(be.useProgram(Qt.program)&&(Nn=!0,Xt=!0,ci=!0),q.id!==C&&(C=q.id,Xt=!0),Nn||N!==S){be.buffers.depth.getReversed()&&S.reversedDepth!==!0&&(S._reversedDepth=!0,S.updateProjectionMatrix()),T.setValue(O,"projectionMatrix",S.projectionMatrix),T.setValue(O,"viewMatrix",S.matrixWorldInverse);const Y=T.map.cameraPosition;Y!==void 0&&Y.setValue(O,Le.setFromMatrixPosition(S.matrixWorld)),pt.logarithmicDepthBuffer&&T.setValue(O,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(q.isMeshPhongMaterial||q.isMeshToonMaterial||q.isMeshLambertMaterial||q.isMeshBasicMaterial||q.isMeshStandardMaterial||q.isShaderMaterial)&&T.setValue(O,"isOrthographic",S.isOrthographicCamera===!0),N!==S&&(N=S,Xt=!0,ci=!0)}if(V.isSkinnedMesh){T.setOptional(O,V,"bindMatrix"),T.setOptional(O,V,"bindMatrixInverse");const G=V.skeleton;G&&(G.boneTexture===null&&G.computeBoneTexture(),T.setValue(O,"boneTexture",G.boneTexture,$e))}V.isBatchedMesh&&(T.setOptional(O,V,"batchingTexture"),T.setValue(O,"batchingTexture",V._matricesTexture,$e),T.setOptional(O,V,"batchingIdTexture"),T.setValue(O,"batchingIdTexture",V._indirectTexture,$e),T.setOptional(O,V,"batchingColorTexture"),V._colorsTexture!==null&&T.setValue(O,"batchingColorTexture",V._colorsTexture,$e));const U=$.morphAttributes;if((U.position!==void 0||U.normal!==void 0||U.color!==void 0)&&Ge.update(V,$,Qt),(Xt||Be.receiveShadow!==V.receiveShadow)&&(Be.receiveShadow=V.receiveShadow,T.setValue(O,"receiveShadow",V.receiveShadow)),q.isMeshGouraudMaterial&&q.envMap!==null&&(D.envMap.value=Me,D.flipEnvMap.value=Me.isCubeTexture&&Me.isRenderTargetTexture===!1?-1:1),q.isMeshStandardMaterial&&q.envMap===null&&k.environment!==null&&(D.envMapIntensity.value=k.environmentIntensity),D.dfgLUT!==void 0&&(D.dfgLUT.value=Jm()),Xt&&(T.setValue(O,"toneMappingExposure",g.toneMappingExposure),Be.needsLights&&$r(D,ci),he&&q.fog===!0&&Re.refreshFogUniforms(D,he),Re.refreshMaterialUniforms(D,q,Q,ne,A.state.transmissionRenderTarget[S.id]),Es.upload(O,Ve(Be),D,$e)),q.isShaderMaterial&&q.uniformsNeedUpdate===!0&&(Es.upload(O,Ve(Be),D,$e),q.uniformsNeedUpdate=!1),q.isSpriteMaterial&&T.setValue(O,"center",V.center),T.setValue(O,"modelViewMatrix",V.modelViewMatrix),T.setValue(O,"normalMatrix",V.normalMatrix),T.setValue(O,"modelMatrix",V.matrixWorld),q.isShaderMaterial||q.isRawShaderMaterial){const G=q.uniformsGroups;for(let Y=0,ye=G.length;Y<ye;Y++){const Te=G[Y];ge.update(Te,Qt),ge.bind(Te,Qt)}}return Qt}function $r(S,k){S.ambientLightColor.needsUpdate=k,S.lightProbe.needsUpdate=k,S.directionalLights.needsUpdate=k,S.directionalLightShadows.needsUpdate=k,S.pointLights.needsUpdate=k,S.pointLightShadows.needsUpdate=k,S.spotLights.needsUpdate=k,S.spotLightShadows.needsUpdate=k,S.rectAreaLights.needsUpdate=k,S.hemisphereLights.needsUpdate=k}function Fn(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return P},this.getActiveMipmapLevel=function(){return x},this.getRenderTarget=function(){return _},this.setRenderTargetTextures=function(S,k,$){const q=Fe.get(S);q.__autoAllocateDepthBuffer=S.resolveDepthBuffer===!1,q.__autoAllocateDepthBuffer===!1&&(q.__useRenderToTexture=!1),Fe.get(S.texture).__webglTexture=k,Fe.get(S.depthTexture).__webglTexture=q.__autoAllocateDepthBuffer?void 0:$,q.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(S,k){const $=Fe.get(S);$.__webglFramebuffer=k,$.__useDefaultFramebuffer=k===void 0};const Hn=O.createFramebuffer();this.setRenderTarget=function(S,k=0,$=0){_=S,P=k,x=$;let q=!0,V=null,he=!1,xe=!1;if(S){const Me=Fe.get(S);if(Me.__useDefaultFramebuffer!==void 0)be.bindFramebuffer(O.FRAMEBUFFER,null),q=!1;else if(Me.__webglFramebuffer===void 0)$e.setupRenderTarget(S);else if(Me.__hasExternalTextures)$e.rebindTextures(S,Fe.get(S.texture).__webglTexture,Fe.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){const Ie=S.depthTexture;if(Me.__boundDepthTexture!==Ie){if(Ie!==null&&Fe.has(Ie)&&(S.width!==Ie.image.width||S.height!==Ie.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");$e.setupDepthRenderbuffer(S)}}const He=S.texture;(He.isData3DTexture||He.isDataArrayTexture||He.isCompressedArrayTexture)&&(xe=!0);const De=Fe.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(De[k])?V=De[k][$]:V=De[k],he=!0):S.samples>0&&$e.useMultisampledRTT(S)===!1?V=Fe.get(S).__webglMultisampledFramebuffer:Array.isArray(De)?V=De[$]:V=De,I.copy(S.viewport),H.copy(S.scissor),X=S.scissorTest}else I.copy(Oe).multiplyScalar(Q).floor(),H.copy(We).multiplyScalar(Q).floor(),X=ct;if($!==0&&(V=Hn),be.bindFramebuffer(O.FRAMEBUFFER,V)&&q&&be.drawBuffers(S,V),be.viewport(I),be.scissor(H),be.setScissorTest(X),he){const Me=Fe.get(S.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+k,Me.__webglTexture,$)}else if(xe){const Me=k;for(let He=0;He<S.textures.length;He++){const De=Fe.get(S.textures[He]);O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0+He,De.__webglTexture,$,Me)}}else if(S!==null&&$!==0){const Me=Fe.get(S.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,Me.__webglTexture,$)}C=-1},this.readRenderTargetPixels=function(S,k,$,q,V,he,xe,Ae=0){if(!(S&&S.isWebGLRenderTarget)){Pt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Me=Fe.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&xe!==void 0&&(Me=Me[xe]),Me){be.bindFramebuffer(O.FRAMEBUFFER,Me);try{const He=S.textures[Ae],De=He.format,Ie=He.type;if(!pt.textureFormatReadable(De)){Pt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!pt.textureTypeReadable(Ie)){Pt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=S.width-q&&$>=0&&$<=S.height-V&&(S.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+Ae),O.readPixels(k,$,q,V,qe.convert(De),qe.convert(Ie),he))}finally{const He=_!==null?Fe.get(_).__webglFramebuffer:null;be.bindFramebuffer(O.FRAMEBUFFER,He)}}},this.readRenderTargetPixelsAsync=async function(S,k,$,q,V,he,xe,Ae=0){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Me=Fe.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&xe!==void 0&&(Me=Me[xe]),Me)if(k>=0&&k<=S.width-q&&$>=0&&$<=S.height-V){be.bindFramebuffer(O.FRAMEBUFFER,Me);const He=S.textures[Ae],De=He.format,Ie=He.type;if(!pt.textureFormatReadable(De))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!pt.textureTypeReadable(Ie))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const je=O.createBuffer();O.bindBuffer(O.PIXEL_PACK_BUFFER,je),O.bufferData(O.PIXEL_PACK_BUFFER,he.byteLength,O.STREAM_READ),S.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+Ae),O.readPixels(k,$,q,V,qe.convert(De),qe.convert(Ie),0);const ft=_!==null?Fe.get(_).__webglFramebuffer:null;be.bindFramebuffer(O.FRAMEBUFFER,ft);const wt=O.fenceSync(O.SYNC_GPU_COMMANDS_COMPLETE,0);return O.flush(),await Sd(O,wt,4),O.bindBuffer(O.PIXEL_PACK_BUFFER,je),O.getBufferSubData(O.PIXEL_PACK_BUFFER,0,he),O.deleteBuffer(je),O.deleteSync(wt),he}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(S,k=null,$=0){const q=Math.pow(2,-$),V=Math.floor(S.image.width*q),he=Math.floor(S.image.height*q),xe=k!==null?k.x:0,Ae=k!==null?k.y:0;$e.setTexture2D(S,0),O.copyTexSubImage2D(O.TEXTURE_2D,$,0,0,xe,Ae,V,he),be.unbindTexture()};const Ys=O.createFramebuffer(),js=O.createFramebuffer();this.copyTextureToTexture=function(S,k,$=null,q=null,V=0,he=null){he===null&&(V!==0?(kr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),he=V,V=0):he=0);let xe,Ae,Me,He,De,Ie,je,ft,wt;const Tt=S.isCompressedTexture?S.mipmaps[he]:S.image;if($!==null)xe=$.max.x-$.min.x,Ae=$.max.y-$.min.y,Me=$.isBox3?$.max.z-$.min.z:1,He=$.min.x,De=$.min.y,Ie=$.isBox3?$.min.z:0;else{const U=Math.pow(2,-V);xe=Math.floor(Tt.width*U),Ae=Math.floor(Tt.height*U),S.isDataArrayTexture?Me=Tt.depth:S.isData3DTexture?Me=Math.floor(Tt.depth*U):Me=1,He=0,De=0,Ie=0}q!==null?(je=q.x,ft=q.y,wt=q.z):(je=0,ft=0,wt=0);const mt=qe.convert(k.format),Be=qe.convert(k.type);let At;k.isData3DTexture?($e.setTexture3D(k,0),At=O.TEXTURE_3D):k.isDataArrayTexture||k.isCompressedArrayTexture?($e.setTexture2DArray(k,0),At=O.TEXTURE_2D_ARRAY):($e.setTexture2D(k,0),At=O.TEXTURE_2D),O.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,k.flipY),O.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),O.pixelStorei(O.UNPACK_ALIGNMENT,k.unpackAlignment);const st=O.getParameter(O.UNPACK_ROW_LENGTH),Qt=O.getParameter(O.UNPACK_IMAGE_HEIGHT),Nn=O.getParameter(O.UNPACK_SKIP_PIXELS),Xt=O.getParameter(O.UNPACK_SKIP_ROWS),ci=O.getParameter(O.UNPACK_SKIP_IMAGES);O.pixelStorei(O.UNPACK_ROW_LENGTH,Tt.width),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,Tt.height),O.pixelStorei(O.UNPACK_SKIP_PIXELS,He),O.pixelStorei(O.UNPACK_SKIP_ROWS,De),O.pixelStorei(O.UNPACK_SKIP_IMAGES,Ie);const T=S.isDataArrayTexture||S.isData3DTexture,D=k.isDataArrayTexture||k.isData3DTexture;if(S.isDepthTexture){const U=Fe.get(S),G=Fe.get(k),Y=Fe.get(U.__renderTarget),ye=Fe.get(G.__renderTarget);be.bindFramebuffer(O.READ_FRAMEBUFFER,Y.__webglFramebuffer),be.bindFramebuffer(O.DRAW_FRAMEBUFFER,ye.__webglFramebuffer);for(let Te=0;Te<Me;Te++)T&&(O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Fe.get(S).__webglTexture,V,Ie+Te),O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Fe.get(k).__webglTexture,he,wt+Te)),O.blitFramebuffer(He,De,xe,Ae,je,ft,xe,Ae,O.DEPTH_BUFFER_BIT,O.NEAREST);be.bindFramebuffer(O.READ_FRAMEBUFFER,null),be.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else if(V!==0||S.isRenderTargetTexture||Fe.has(S)){const U=Fe.get(S),G=Fe.get(k);be.bindFramebuffer(O.READ_FRAMEBUFFER,Ys),be.bindFramebuffer(O.DRAW_FRAMEBUFFER,js);for(let Y=0;Y<Me;Y++)T?O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,U.__webglTexture,V,Ie+Y):O.framebufferTexture2D(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,U.__webglTexture,V),D?O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,G.__webglTexture,he,wt+Y):O.framebufferTexture2D(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,G.__webglTexture,he),V!==0?O.blitFramebuffer(He,De,xe,Ae,je,ft,xe,Ae,O.COLOR_BUFFER_BIT,O.NEAREST):D?O.copyTexSubImage3D(At,he,je,ft,wt+Y,He,De,xe,Ae):O.copyTexSubImage2D(At,he,je,ft,He,De,xe,Ae);be.bindFramebuffer(O.READ_FRAMEBUFFER,null),be.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else D?S.isDataTexture||S.isData3DTexture?O.texSubImage3D(At,he,je,ft,wt,xe,Ae,Me,mt,Be,Tt.data):k.isCompressedArrayTexture?O.compressedTexSubImage3D(At,he,je,ft,wt,xe,Ae,Me,mt,Tt.data):O.texSubImage3D(At,he,je,ft,wt,xe,Ae,Me,mt,Be,Tt):S.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,he,je,ft,xe,Ae,mt,Be,Tt.data):S.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,he,je,ft,Tt.width,Tt.height,mt,Tt.data):O.texSubImage2D(O.TEXTURE_2D,he,je,ft,xe,Ae,mt,Be,Tt);O.pixelStorei(O.UNPACK_ROW_LENGTH,st),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,Qt),O.pixelStorei(O.UNPACK_SKIP_PIXELS,Nn),O.pixelStorei(O.UNPACK_SKIP_ROWS,Xt),O.pixelStorei(O.UNPACK_SKIP_IMAGES,ci),he===0&&k.generateMipmaps&&O.generateMipmap(At),be.unbindTexture()},this.initRenderTarget=function(S){Fe.get(S).__webglFramebuffer===void 0&&$e.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?$e.setTextureCube(S,0):S.isData3DTexture?$e.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?$e.setTexture2DArray(S,0):$e.setTexture2D(S,0),be.unbindTexture()},this.resetState=function(){P=0,x=0,_=null,be.reset(),z.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Vn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=dt._getDrawingBufferColorSpace(e),t.unpackColorSpace=dt._getUnpackColorSpace()}}function ex({scene:n,box:e,ball:t,cyl:i,mesh:r,segment:s,mat:a,sign:o,softPool:c,doorLeaves:l,doorBlocker:u,lampFixture:d}){const f=new Set,p=new Map,v=Q=>(f.add(Q),Q);for(const Q of Mn){const fe=v(r(new zn(.36,.4,24),"#c6b387",Q.x,.09,Q.z));fe.rotation.x=-Math.PI/2,p.set(Q.id,fe)}l.forEach(v),v(d.bulb),e(-10,1.05,-13,.95,2.1,.6,"#50676e"),e(-10,1.05,-12.68,.76,1.9,.02,"#293941");const b=new bt;b.position.set(-10.46,0,-12.63),n.add(b),v(b),e(.46,1.05,0,.9,2.08,.055,"#718380",b),e(.78,1.03,.04,.045,.23,.05,"#c2bfa9",b);const m=v(e(-10,1.1,-12.65,.48,.34,.025,"#d9cfac"));o(-10,2.35,-12.6,2.5,"איינשטיין · ציוד משותף");const h=v(t(-4,2.35,5.13,.055,"#b47e56"));for(const Q of[-.35,.35])s([-8,1.25,16.7],[-8+Q,0,16.7+.35],.025,"#8b9491");s([-8,1.25,16.7],[-8,0,16.25],.025,"#8b9491");const w=r(new Zn(.14,.18,.95,12),"#6b777b",-8,1.45,16.7);w.rotation.z=Math.PI/2,w.rotation.y=-.35;const A=t(-8.46,1.45,16.54,.13,"#7fabb1");A.scale.x=.17,i(-8.5,.12,8,.42,.22,"#9caaa1");const E=v(i(-8.5,.245,8,.36,.015,"#5696a3"));e(23,.3,-6,2,.6,1.2,"#79644d"),e(23,.62,-6,1.85,.03,1.05,"#3e493c");const M=new bt;M.position.set(23,.62,-6),n.add(M),v(M);for(const Q of[-.6,0,.6]){s([Q,0,0],[Q,.72,0],.025,"#708762",M);for(const fe of[-1,1]){const we=t(Q+fe*.14,.45,0,.19,"#7b936c",M);we.scale.set(.8,.35,1.9),we.rotation.z=fe*.7}}i(24.1,.3,-5.8,.25,.55,"#809595"),s([24.1,.4,-5.8],[24.6,.6,-5.8],.065,"#809595"),e(5,.6,10,.85,1.2,.85,"#536d67"),e(5,1.23,10,.96,.12,.96,"#718b7e"),o(5,1.45,10.44,1.7,"מחזור");const g=new bt;n.add(g),v(g);for(let Q=0;Q<3;Q++){const fe=i(4.1+Q*.4,.12,10.8+Q%2*.4,.1,.3,["#a5aaa0","#a98b71","#7b979b"][Q],g);fe.rotation.z=1.2+Q*.2}e(19,.8,8,1.4,1.6,.55,"#465a61");const R=[-.43,0,.43].map(Q=>v(e(19+Q,1.05,8.32,.14,.35,.1,"#b39e78")));o(19,1.9,8.33,2.7,"תאורת השביל","ירח · שמש · עץ");const P=[];for(const[Q,fe]of[[16,7],[13,6],[10,5]]){i(Q,.32,fe,.08,.64,"#52615f");const we=v(t(Q,.67,fe,.13,"#d0bd8c")),Oe=c(Q,fe,3.2);P.push({bulb:we,pool:Oe})}const x=v(t(-21.48,.99,-8.5,.085,"#b6b7a5")),_=[0,1,2].map(Q=>{const fe=v(r(new zn(.22,.24,24),"#d1c49f",-21.48,1.05,-8.4));return fe.visible=!1,fe}),C=v(t(12,.25,22,.24,"#a87848")),N=v(r(new Fi(.242,.01,4,24),"#3d3933",0,0,0,C));N.rotation.x=Math.PI/2;let I=Xr(),H=-1,X=-1,Z=0,re=0;function K(Q,{animate:fe=!0}={}){I=Q,l.forEach((Oe,We)=>{Oe.rotation.y=I.doorOpen?We===0?-Math.PI*.46:Math.PI*.46:0}),u.disabled=I.doorOpen,d.bulb.material=a(I.lampOn?"#d6b884":"#566368",I.lampOn),d.pool.visible=I.lampOn,b.rotation.y=I.lockerOpen?-Math.PI*.65:0,m.visible=I.lockerOpen,h.material=a(I.visited.includes("noticeboard")?"#a4c4a3":"#b47e56"),E.visible=I.waterFilled,M.scale.y=I.watered?1.3:.58,g.visible=!I.recycled;const we=Os(I);R.forEach((Oe,We)=>{Oe.rotation.x=I.switches[We]?-.55:.55,Oe.material=a(I.switches[We]?"#b8cdb0":"#b39e78")}),P.forEach(Oe=>{Oe.bulb.material=a(we?"#dfc58e":"#66716a",we),Oe.pool.visible=we});for(const[Oe,We]of p)We.material=a(I.visited.includes(Oe)?"#8da892":"#c6b387");fe&&I.shots>Z&&(H=0),fe&&I.bells>re&&(X=0),Z=I.shots,re=I.bells}function ne(Q,fe){if(H>=0){H+=Q;const we=Math.min(H/1.35,1);if(C.position.set(12+3.58*we,.25+2.58*we+Math.sin(we*Math.PI)*2.45,22),C.rotation.z-=Q*4,we===1){const Oe=Math.min((H-1.35)/.8,1);C.position.set(15.58-3.58*Oe,2.83*(1-Oe)+Math.sin(Oe*Math.PI)*.45,22),Oe===1&&(H=-1,C.position.set(12,.25,22))}}X>=0&&(X+=Q,x.rotation.z=fe?0:Math.sin(X*34)*.2,_.forEach((we,Oe)=>{we.visible=X<1.2;const We=.6+(X+Oe*.16)*2;we.scale.setScalar(We),we.rotation.y=.6}),X>1.2&&(X=-1,x.rotation.z=0))}return{dynamic:f,sync:K,update:ne,get animation(){return{basketballInFlight:H>=0,bellRinging:X>=0}}}}const tx=JSON.parse('[{"id":"facts","subject_id":"hebrew","exam_id":"hebrew-v1-garden","title":"עובדה או דעה?","description":"מזהים מה אפשר לבדוק ומה מביע מחשבה אישית.","references":[{"id":"garden-passage","kind":"passage","title":"הטקסט „תלמידי כיתה ז׳ הקימו גינה בבית הספר”","url":"garden-exam.html#article","attribution":null,"parts":[{"part":"הכותרת ושורת הפרטים","title":"הכותרת, הכותבת, מקום הפרסום והתאריך"},{"part":"פסקה 1","title":"הקמת הגינה, הכיתות וההשקיה"},{"part":"פסקה 2","title":"ההכנות לפני השתילה ומטרת הפעילות"},{"part":"פסקה 3","title":"דברי התלמידים ומה יקרה בעוד חודש"},{"part":"הטקסט כולו","title":"הטקסט כולו"}]}],"questions":[{"id":"facts-01","position":1,"type":"mcq","topic":null,"difficulty":null,"prompt":"„בפעילות השתתפו שלוש כיתות.” מה זה?","choices":["עובדה","דעה"],"correct":0,"explanation":{"he":"אפשר לבדוק כמה כיתות השתתפו בפעילות.","en":"The number of participating classes can be checked."},"ref":{"id":"garden-passage","part":"פסקה 1"}},{"id":"facts-02","position":2,"type":"mcq","topic":null,"difficulty":null,"prompt":"„שיעורים בגינה מעניינים יותר משיעורים בכיתה.” מה זה?","choices":["עובדה","דעה"],"correct":1,"explanation":{"he":"„מעניינים יותר” הוא שיפוט אישי, ולכן זו דעה.","en":"“More interesting” is a personal judgment, so this is an opinion."},"ref":{"id":"garden-passage","part":"פסקה 3"}},{"id":"facts-03","position":3,"type":"mcq","topic":null,"difficulty":null,"prompt":"„התלמידים שתלו נענע, רוזמרין וחסה.” מה זה?","choices":["עובדה","דעה"],"correct":0,"explanation":{"he":"אפשר לבדוק אילו צמחים נשתלו בגינה.","en":"The plants in the garden can be checked."},"ref":{"id":"garden-passage","part":"פסקה 1"}},{"id":"facts-04","position":4,"type":"mcq","topic":null,"difficulty":null,"prompt":"„נענע היא הצמח הכי מוצלח בגינה.” מה זה?","choices":["עובדה","דעה"],"correct":1,"explanation":{"he":"„הכי מוצלח” מביע הערכה אישית ולא נתון מדיד שהוגדר כאן.","en":"“The best” is a personal evaluation, not a defined measurable fact here."},"ref":{"id":"garden-passage","part":null}},{"id":"facts-05","position":5,"type":"mcq","topic":null,"difficulty":null,"prompt":"„כל כיתה קיבלה אחריות להשקיה ביום אחר בשבוע.” מה זה?","choices":["עובדה","דעה"],"correct":0,"explanation":{"he":"אפשר לבדוק את לוח ההשקיה של הכיתות.","en":"The class watering schedule can be checked."},"ref":{"id":"garden-passage","part":"פסקה 1"}},{"id":"facts-06","position":6,"type":"mcq","topic":null,"difficulty":null,"prompt":"„לדעתי, הפעילות בגינה נהדרת.” מה זה?","choices":["עובדה","דעה"],"correct":1,"explanation":{"he":"המילה „לדעתי” מסמנת במפורש שהדובר מביע דעה.","en":"The word “in my opinion” clearly signals an opinion."},"ref":{"id":"garden-passage","part":null}}]},{"id":"questions","subject_id":"hebrew","exam_id":"hebrew-v1-garden","title":"מילות שאלה","description":"בוחרים את מילת השאלה המתאימה למידע שמחפשים.","references":[{"id":"garden-passage","kind":"passage","title":"הטקסט „תלמידי כיתה ז׳ הקימו גינה בבית הספר”","url":"garden-exam.html#article","attribution":null,"parts":[{"part":"הכותרת ושורת הפרטים","title":"הכותרת, הכותבת, מקום הפרסום והתאריך"},{"part":"פסקה 1","title":"הקמת הגינה, הכיתות וההשקיה"},{"part":"פסקה 2","title":"ההכנות לפני השתילה ומטרת הפעילות"},{"part":"פסקה 3","title":"דברי התלמידים ומה יקרה בעוד חודש"},{"part":"הטקסט כולו","title":"הטקסט כולו"}]}],"questions":[{"id":"questions-01","position":1,"type":"mcq","topic":null,"difficulty":null,"prompt":"איזו מילת שאלה מתאימה לבירור מועד הקמת הגינה?","choices":["מתי","מי","כמה"],"correct":0,"explanation":{"he":"„מתי” מבקשת זמן או מועד.","en":"“When” asks about a time or date."},"ref":{"id":"garden-passage","part":"פסקה 1"}},{"id":"questions-02","position":2,"type":"mcq","topic":null,"difficulty":null,"prompt":"איזו מילת שאלה מתאימה לבירור מספר הכיתות שהשתתפו?","choices":["כיצד","כמה","היכן"],"correct":1,"explanation":{"he":"„כמה” מבקשת מספר או כמות.","en":"“How many” asks for a number or quantity."},"ref":{"id":"garden-passage","part":"פסקה 1"}},{"id":"questions-03","position":3,"type":"mcq","topic":null,"difficulty":null,"prompt":"איזו מילת שאלה מתאימה לשאלה על הסיבה לכך שקראו על הצמחים?","choices":["מדוע","מתי","מי"],"correct":0,"explanation":{"he":"„מדוע” מבקשת סיבה: למה עשו זאת?","en":"“Why” asks for the reason something happened."},"ref":{"id":"garden-passage","part":"פסקה 2"}},{"id":"questions-04","position":4,"type":"mcq","topic":null,"difficulty":null,"prompt":"איזו מילת שאלה מתאימה לבירור המקום שבו הוקמה הגינה?","choices":["כמה","היכן","כיצד"],"correct":1,"explanation":{"he":"„היכן” מבקשת מקום.","en":"“Where” asks about a place."},"ref":{"id":"garden-passage","part":"פסקה 1"}},{"id":"questions-05","position":5,"type":"mcq","topic":null,"difficulty":null,"prompt":"איזו מילת שאלה מתאימה לבירור האופן שבו חילקו את ההשקיה?","choices":["כיצד","מתי","מי"],"correct":0,"explanation":{"he":"„כיצד” מבקשת דרך או אופן פעולה.","en":"“How” asks about the way something was done."},"ref":{"id":"garden-passage","part":"פסקה 1"}},{"id":"questions-06","position":6,"type":"mcq","topic":null,"difficulty":null,"prompt":"איזו מילת שאלה מתאימה לבירור מי הציעה להוסיף פרחים?","choices":["היכן","מי","מדוע"],"correct":1,"explanation":{"he":"„מי” מבקשת לזהות אדם.","en":"“Who” asks which person did something."},"ref":{"id":"garden-passage","part":"פסקה 3"}}]},{"id":"instructions","subject_id":"hebrew","exam_id":"hebrew-v1-garden","title":"מבינים הוראות","description":"מזהים מה בדיוק צריך לעשות לפי מילת ההוראה.","references":[{"id":"garden-passage","kind":"passage","title":"הטקסט „תלמידי כיתה ז׳ הקימו גינה בבית הספר”","url":"garden-exam.html#article","attribution":null,"parts":[{"part":"הכותרת ושורת הפרטים","title":"הכותרת, הכותבת, מקום הפרסום והתאריך"},{"part":"פסקה 1","title":"הקמת הגינה, הכיתות וההשקיה"},{"part":"פסקה 2","title":"ההכנות לפני השתילה ומטרת הפעילות"},{"part":"פסקה 3","title":"דברי התלמידים ומה יקרה בעוד חודש"},{"part":"הטקסט כולו","title":"הטקסט כולו"}]}],"questions":[{"id":"instructions-01","position":1,"type":"mcq","topic":null,"difficulty":null,"prompt":"בשאלה כתוב „העתיקו מהטקסט עובדה”. מה צריך לעשות?","choices":["לכתוב את המילים בדיוק כפי שהן בטקסט","להמציא עובדה חדשה","לכתוב מה חושבים"],"correct":0,"explanation":{"he":"„העתיקו” פירושו להשתמש בניסוח שמופיע בטקסט.","en":"“Copy” means use the wording from the passage."},"ref":{"id":"garden-passage","part":null}},{"id":"instructions-02","position":2,"type":"mcq","topic":null,"difficulty":null,"prompt":"בשאלה כתוב „נמקו”. מה צריך להוסיף לתשובה?","choices":["כותרת בלבד","סיבה שמסבירה את הבחירה","תאריך הפרסום בלבד"],"correct":1,"explanation":{"he":"„נמקו” מבקשת לתת סיבה או ראיה לבחירה.","en":"“Justify” asks for a reason or evidence."},"ref":{"id":"garden-passage","part":null}},{"id":"instructions-03","position":3,"type":"mcq","topic":null,"difficulty":null,"prompt":"בשאלה כתוב „ציינו”. איזו תשובה מתאימה בדרך כלל?","choices":["תשובה קצרה וברורה","סיפור ארוך שלא קשור לשאלה","שאלה חדשה"],"correct":0,"explanation":{"he":"„ציינו” מבקשת למסור את הפרט המבוקש בקצרה.","en":"“State” usually asks for the requested detail briefly."},"ref":{"id":"garden-passage","part":null}},{"id":"instructions-04","position":4,"type":"mcq","topic":null,"difficulty":null,"prompt":"בשאלה כתוב „הסבירו”. מה צריך לעשות?","choices":["לכתוב מילה אחת בלבד","לתאר בפירוט כיצד או מדוע","להעתיק את הכותרת"],"correct":1,"explanation":{"he":"„הסבירו” מבקשת להבהיר את הרעיון בעזרת פירוט או סיבה.","en":"“Explain” asks for details about how or why."},"ref":{"id":"garden-passage","part":null}},{"id":"instructions-05","position":5,"type":"mcq","topic":null,"difficulty":null,"prompt":"בשאלה כתוב „נסחו שאלה מלאה”. איזו תשובה מקיימת את ההוראה?","choices":["„שלוש כיתות”","„כמה כיתות השתתפו בפעילות?”","„כיתות”"],"correct":1,"explanation":{"he":"שאלה מלאה כוללת מילת שאלה ומשפט שלם.","en":"A full question includes a question word and a complete sentence."},"ref":{"id":"garden-passage","part":null}},{"id":"instructions-06","position":6,"type":"mcq","topic":null,"difficulty":null,"prompt":"בשאלה כתוב „הביעו את דעתכם וכתבו נימוק”. מה צריך לכתוב?","choices":["רק עובדה מהטקסט","עמדה אישית וסיבה שתומכת בה","רק את שם הכותבת"],"correct":1,"explanation":{"he":"צריך לציין מה חושבים ולתת סיבה אחת לפחות.","en":"State your view and give at least one supporting reason."},"ref":{"id":"garden-passage","part":null}}]},{"id":"physics-basics","subject_id":"physics","exam_id":"physics-v1-assessment","title":"מדידה ושיטות מדידה","description":"מזהים תוצאות ומבדילים בין מדידה ישירה לעקיפה.","references":[{"id":"physics-pdf","kind":"pdf","title":"סיכום נושא מדידות (PDF)","url":"assets/materials/physics-measurements-grade-7.pdf","attribution":"שרית שרת","parts":[{"part":"עמוד 1","title":"מדידות: מהי מדידה, מדידה ישירה ומדידה עקיפה"},{"part":"עמוד 2","title":"המרת יחידות אורך"},{"part":"עמוד 3","title":"איך מודדים עובי של דף?"},{"part":"עמוד 4","title":"דיוק ומדידה נכונה"},{"part":"עמוד 5","title":"מודדים גובה של עמוד: הרעיון הגאומטרי"},{"part":"עמוד 6","title":"מדידת העמוד בפועל"}]}],"questions":[{"id":"physics-basics-01","position":1,"type":"mcq","topic":null,"difficulty":null,"prompt":"מה חייבים לציין בתוצאת מדידה?","choices":["מספר ויחידת מידה","מספר בלבד","שם כלי המדידה בלבד"],"correct":0,"explanation":{"he":"תוצאת מדידה כוללת מספר ויחידה, למשל 14 ס״מ.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 1"}},{"id":"physics-basics-02","position":2,"type":"mcq","topic":null,"difficulty":null,"prompt":"מדדתם אורך מחברת וקראתם את התוצאה מהסרגל. איזו מדידה זו?","choices":["ישירה","עקיפה","לא מדידה"],"correct":0,"explanation":{"he":"במדידה ישירה קוראים את הגודל המבוקש מכלי המדידה.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 1"}},{"id":"physics-basics-03","position":3,"type":"mcq","topic":null,"difficulty":null,"prompt":"מדדתם עובי של ערימת דפים וחילקתם במספר הדפים. איזו מדידה זו?","choices":["ישירה","עקיפה","הערכה ללא מדידה"],"correct":1,"explanation":{"he":"מודדים גודל אחר ומחשבים ממנו את העובי הממוצע של דף.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 1"}},{"id":"physics-basics-04","position":4,"type":"mcq","topic":null,"difficulty":null,"prompt":"איך מחשבים עובי ממוצע של דף בערימה?","choices":["עובי הערימה חלקי מספר הדפים","מספר הדפים חלקי עובי הערימה","עובי הערימה כפול מספר הדפים"],"correct":0,"explanation":{"he":"מחלקים את עובי הערימה במספר הדפים, לא במספר העמודים.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 3"}},{"id":"physics-basics-05","position":5,"type":"mcq","topic":null,"difficulty":null,"prompt":"ערימה של 100 דפים עובייה 10 מ״מ. מה העובי הממוצע של דף?","choices":["0.1 מ״מ","1 מ״מ","10 מ״מ"],"correct":0,"explanation":{"he":"מחלקים 10 מ״מ ב־100 ומקבלים 0.1 מ״מ לדף.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 3"}},{"id":"physics-basics-06","position":6,"type":"mcq","topic":null,"difficulty":null,"prompt":"למה כדאי למדוד ערימה של דפים מאותו סוג?","choices":["כדי להעריך את העובי הממוצע של דף מהסוג הזה","כי אין צורך לספור את הדפים","כדי לקבל תמיד תוצאה מדויקת לגמרי"],"correct":0,"explanation":{"he":"דפים מאותו סוג מאפשרים אומדן שימושי יותר של עובי דף ממוצע.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 3"}},{"id":"physics-basics-07","position":7,"type":"mcq","topic":null,"difficulty":null,"prompt":"מהי מדידה?","choices":["השוואה ליחידת מידה מוסכמת","ניחוש ללא השוואה","כתיבת שם הגוף"],"correct":0,"explanation":{"he":"מדידה משווה גודל ליחידת מידה מוסכמת.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 1"}},{"id":"physics-basics-08","position":8,"type":"mcq","topic":null,"difficulty":null,"prompt":"מה מתאים לתיאור אורך עיפרון?","choices":["14 ס״מ","14 בלבד","ס״מ בלבד"],"correct":0,"explanation":{"he":"תוצאת מדידה כוללת גם מספר וגם יחידת מידה.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 1"}},{"id":"physics-basics-09","position":9,"type":"mcq","topic":null,"difficulty":null,"prompt":"איזו פעולה היא מדידה עקיפה?","choices":["מדידת ערימת דפים וחלוקה במספר הדפים","קריאת אורך עיפרון מסרגל","קריאת הטמפרטורה ממדחום"],"correct":0,"explanation":{"he":"מודדים את הערימה ומחשבים ממנה את עובי הדף הממוצע.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 1"}},{"id":"physics-basics-10","position":10,"type":"mcq","topic":null,"difficulty":null,"prompt":"ערימה של 50 דפים היא בעובי 5 מ״מ. מה עובי דף ממוצע?","choices":["0.1 מ״מ","10 מ״מ","1 מ״מ"],"correct":0,"explanation":{"he":"מחלקים 5 מ״מ ב־50 דפים ומקבלים 0.1 מ״מ לדף.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 3"}},{"id":"physics-basics-11","position":11,"type":"mcq","topic":null,"difficulty":null,"prompt":"למה מודדים ערימת דפים בלי הכריכה?","choices":["כדי שהכריכה לא תוסיף עובי לתוצאה","כדי לשנות את מספר הדפים","כי הכריכה מחליפה את הסרגל"],"correct":0,"explanation":{"he":"הכריכה אינה דף בערימה ולכן עובייה יטה את החישוב.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 3"}}]},{"id":"physics-units","subject_id":"physics","exam_id":"physics-v1-assessment","title":"המרת יחידות אורך","description":"מתרגלים קילומטרים, מטרים, סנטימטרים ומילימטרים.","references":[{"id":"physics-pdf","kind":"pdf","title":"סיכום נושא מדידות (PDF)","url":"assets/materials/physics-measurements-grade-7.pdf","attribution":"שרית שרת","parts":[{"part":"עמוד 1","title":"מדידות: מהי מדידה, מדידה ישירה ומדידה עקיפה"},{"part":"עמוד 2","title":"המרת יחידות אורך"},{"part":"עמוד 3","title":"איך מודדים עובי של דף?"},{"part":"עמוד 4","title":"דיוק ומדידה נכונה"},{"part":"עמוד 5","title":"מודדים גובה של עמוד: הרעיון הגאומטרי"},{"part":"עמוד 6","title":"מדידת העמוד בפועל"}]}],"questions":[{"id":"physics-units-01","position":1,"type":"mcq","topic":null,"difficulty":null,"prompt":"כמה סנטימטרים יש במטר אחד?","choices":["10","100","1,000"],"correct":1,"explanation":{"he":"מטר אחד שווה ל־100 סנטימטרים.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 2"}},{"id":"physics-units-02","position":2,"type":"mcq","topic":null,"difficulty":null,"prompt":"כמה מילימטרים יש בסנטימטר אחד?","choices":["10","100","1,000"],"correct":0,"explanation":{"he":"סנטימטר אחד שווה ל־10 מילימטרים.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 2"}},{"id":"physics-units-03","position":3,"type":"mcq","topic":null,"difficulty":null,"prompt":"כמה מטרים יש ב־2 קילומטרים?","choices":["200","2,000","20,000"],"correct":1,"explanation":{"he":"קילומטר אחד הוא 1,000 מטרים, ולכן 2 ק״מ הם 2,000 מטרים.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 2"}},{"id":"physics-units-04","position":4,"type":"mcq","topic":null,"difficulty":null,"prompt":"כמה סנטימטרים הם 2.4 מטרים?","choices":["24","240","2,400"],"correct":1,"explanation":{"he":"ממטר לסנטימטר כופלים ב־100: 2.4 × 100 = 240.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 2"}},{"id":"physics-units-05","position":5,"type":"mcq","topic":null,"difficulty":null,"prompt":"כמה מטרים הם 350 סנטימטרים?","choices":["3.5","35","0.35"],"correct":0,"explanation":{"he":"מסנטימטר למטר מחלקים ב־100: 350 ÷ 100 = 3.5.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 2"}},{"id":"physics-units-06","position":6,"type":"mcq","topic":null,"difficulty":null,"prompt":"כמה הם מטר אחד ועוד 25 ס״מ?","choices":["1.25 מטרים","26 מטרים","1.025 מטרים"],"correct":0,"explanation":{"he":"ממירים 25 ס״מ ל־0.25 מטר ואז מחברים: 1 + 0.25 = 1.25.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 2"}},{"id":"physics-units-07","position":7,"type":"mcq","topic":null,"difficulty":null,"prompt":"כמה מילימטרים הם 3 ס״מ?","choices":["30 מ״מ","3 מ״מ","300 מ״מ"],"correct":0,"explanation":{"he":"כל סנטימטר הוא 10 מ״מ, ולכן 3 ס״מ הם 30 מ״מ.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 2"}},{"id":"physics-units-08","position":8,"type":"mcq","topic":null,"difficulty":null,"prompt":"כמה סנטימטרים הם 12 מ״מ?","choices":["1.2 ס״מ","12 ס״מ","120 ס״מ"],"correct":0,"explanation":{"he":"מחלקים את מספר המילימטרים ב־10: התוצאה היא 1.2 ס״מ.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 2"}},{"id":"physics-units-09","position":9,"type":"mcq","topic":null,"difficulty":null,"prompt":"כמה קילומטרים הם 1,500 מטרים?","choices":["1.5 ק״מ","15 ק״מ","0.15 ק״מ"],"correct":0,"explanation":{"he":"מחלקים ב־1,000: 1,500 מטרים הם 1.5 ק״מ.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 2"}},{"id":"physics-units-10","position":10,"type":"mcq","topic":null,"difficulty":null,"prompt":"מה ארוך יותר: 90 ס״מ או מטר אחד?","choices":["מטר אחד","90 ס״מ","הם שווים"],"correct":0,"explanation":{"he":"מטר אחד הוא 100 ס״מ, ולכן הוא ארוך מ־90 ס״מ.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 2"}},{"id":"physics-units-11","position":11,"type":"mcq","topic":null,"difficulty":null,"prompt":"מה קורה לאורך עצמו כשממירים אותו מס״מ למ״מ?","choices":["האורך נשאר זהה","האורך גדל פי 10","האורך קטן פי 10"],"correct":0,"explanation":{"he":"הגוף אינו משתנה; רק המספר והיחידה שבהם מתארים אותו משתנים.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 2"}}]},{"id":"physics-precision","subject_id":"physics","exam_id":"physics-v1-assessment","title":"מודדים נכון","description":"בוחרים כלי מתאים וקוראים את הסרגל בזהירות.","references":[{"id":"physics-pdf","kind":"pdf","title":"סיכום נושא מדידות (PDF)","url":"assets/materials/physics-measurements-grade-7.pdf","attribution":"שרית שרת","parts":[{"part":"עמוד 1","title":"מדידות: מהי מדידה, מדידה ישירה ומדידה עקיפה"},{"part":"עמוד 2","title":"המרת יחידות אורך"},{"part":"עמוד 3","title":"איך מודדים עובי של דף?"},{"part":"עמוד 4","title":"דיוק ומדידה נכונה"},{"part":"עמוד 5","title":"מודדים גובה של עמוד: הרעיון הגאומטרי"},{"part":"עמוד 6","title":"מדידת העמוד בפועל"}]}],"questions":[{"id":"physics-precision-01","position":1,"type":"mcq","topic":null,"difficulty":null,"prompt":"מאיזו נקודה בסרגל מתחילים למדוד אורך?","choices":["מסימון האפס","תמיד מקצה הסרגל","מהמספר 1"],"correct":0,"explanation":{"he":"מצמידים את תחילת הגוף לסימון האפס, שלא תמיד נמצא בקצה הסרגל.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 4"}},{"id":"physics-precision-02","position":2,"type":"mcq","topic":null,"difficulty":null,"prompt":"גוף מתחיל ב־2.0 ס״מ ומסתיים ב־8.2 ס״מ. מה אורכו?","choices":["6.2 ס״מ","8.2 ס״מ","10.2 ס״מ"],"correct":0,"explanation":{"he":"מחסרים את קריאת ההתחלה מקריאת הסיום: 8.2 − 2.0 = 6.2 ס״מ.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 4"}},{"id":"physics-precision-03","position":3,"type":"mcq","topic":null,"difficulty":null,"prompt":"איך מסתכלים על שנתות הסרגל כדי לצמצם טעות קריאה?","choices":["בניצב לסולם","באלכסון ככל האפשר","ממרחק גדול"],"correct":0,"explanation":{"he":"מבט בניצב לסולם מצמצם שגיאת קריאה בגלל זווית ההסתכלות.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 4"}},{"id":"physics-precision-04","position":4,"type":"mcq","topic":null,"difficulty":null,"prompt":"איזה כלי מתאים יותר למדידת אורך של חדר?","choices":["סרט מדידה","סרגל קצר בלבד","שעון"],"correct":0,"explanation":{"he":"סרט מדידה מתאים יותר לאורכו של חדר.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 4"}},{"id":"physics-precision-05","position":5,"type":"mcq","topic":null,"difficulty":null,"prompt":"מה מאפשרות שנתות קטנות יותר על כלי מדידה?","choices":["קריאה מפורטת יותר","ביטול מוחלט של כל טעות","שינוי האורך של הגוף"],"correct":0,"explanation":{"he":"שנתות קטנות מאפשרות לקרוא את המדידה בפירוט רב יותר.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 4"}},{"id":"physics-precision-06","position":6,"type":"mcq","topic":null,"difficulty":null,"prompt":"מדוע חוזרים על מדידה?","choices":["כדי לזהות חריגות ולהקטין השפעת שגיאות אקראיות","כדי לתקן בהכרח כלי פגום","כדי לשנות את גודל הגוף"],"correct":0,"explanation":{"he":"חזרות מסייעות לזהות חריגות, אך אינן מתקנות כלי פגום או שיטה שגויה.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 4"}},{"id":"physics-precision-07","position":7,"type":"mcq","topic":null,"difficulty":null,"prompt":"גוף מתחיל בסימון 3 ס״מ ומסתיים ב־9 ס״מ. מה אורכו?","choices":["6 ס״מ","9 ס״מ","12 ס״מ"],"correct":0,"explanation":{"he":"מחסרים את קריאת ההתחלה מקריאת הסיום: 9 פחות 3 הם 6 ס״מ.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 4"}},{"id":"physics-precision-08","position":8,"type":"mcq","topic":null,"difficulty":null,"prompt":"למה לא תמיד מתחילים למדוד מקצה הסרגל?","choices":["כי סימון האפס יכול להיות רחוק מהקצה","כי הסרגל תמיד מתחיל ב־1","כי אסור להשתמש בסימון האפס"],"correct":0,"explanation":{"he":"חשוב להתחיל מסימון האפס; קצה הסרגל לא תמיד נמצא בדיוק באפס.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 4"}},{"id":"physics-precision-09","position":9,"type":"mcq","topic":null,"difficulty":null,"prompt":"איזה כלי מתאים למדידת אורך של עיפרון?","choices":["סרגל עם שנתות קטנות","שעון עצר","מדחום"],"correct":0,"explanation":{"he":"סרגל עם שנתות מתאימות מאפשר למדוד את אורך העיפרון.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 4"}},{"id":"physics-precision-10","position":10,"type":"mcq","topic":null,"difficulty":null,"prompt":"מה חזרה על מדידה אינה מתקנת בהכרח?","choices":["שיטה שגויה או כלי פגום","טעות אקראית בודדת","תוצאה חריגה שאפשר לזהות"],"correct":0,"explanation":{"he":"חזרה יכולה לעזור לזהות חריגות, אך אינה מתקנת כלי פגום או שיטה שגויה.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 4"}},{"id":"physics-precision-11","position":11,"type":"mcq","topic":null,"difficulty":null,"prompt":"מה כדאי לבדוק לפני שרושמים תוצאה?","choices":["את היחידה, נקודת האפס וזווית ההסתכלות","רק את צבע כלי המדידה","רק את שם הגוף"],"correct":0,"explanation":{"he":"יחידה מתאימה, נקודת אפס נכונה ומבט בניצב עוזרים למדוד נכון.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 4"}}]},{"id":"physics-pole","subject_id":"physics","exam_id":"physics-v1-assessment","title":"מודדים גובה של עמוד","description":"מחשבים גובה בעזרת זווית של 45° ומרחק אופקי.","references":[{"id":"physics-pdf","kind":"pdf","title":"סיכום נושא מדידות (PDF)","url":"assets/materials/physics-measurements-grade-7.pdf","attribution":"שרית שרת","parts":[{"part":"עמוד 1","title":"מדידות: מהי מדידה, מדידה ישירה ומדידה עקיפה"},{"part":"עמוד 2","title":"המרת יחידות אורך"},{"part":"עמוד 3","title":"איך מודדים עובי של דף?"},{"part":"עמוד 4","title":"דיוק ומדידה נכונה"},{"part":"עמוד 5","title":"מודדים גובה של עמוד: הרעיון הגאומטרי"},{"part":"עמוד 6","title":"מדידת העמוד בפועל"}]}],"questions":[{"id":"physics-pole-01","position":1,"type":"mcq","topic":null,"difficulty":null,"prompt":"בשיטת העמוד, באיזו זווית לאופק מכוונים אל ראש העמוד?","choices":["45°","90°","180°"],"correct":0,"explanation":{"he":"מכוונים את קו הראייה בזווית של 45° ביחס לאופק.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 5"}},{"id":"physics-pole-02","position":2,"type":"mcq","topic":null,"difficulty":null,"prompt":"מה שווה למרחק האופקי לעמוד בשיטת 45°?","choices":["גובה ראש העמוד מעל גובה העיניים","גובה העמוד כולו","גובה העיניים"],"correct":0,"explanation":{"he":"במשולש ישר־זווית ושווה־שוקיים שני הניצבים שווים.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 5"}},{"id":"physics-pole-03","position":3,"type":"mcq","topic":null,"difficulty":null,"prompt":"המרחק האופקי לעמוד 6 מטרים וגובה העיניים 1.4 מטרים. מה גובה העמוד?","choices":["7.4 מטרים","6 מטרים","4.6 מטרים"],"correct":0,"explanation":{"he":"מחברים את המרחק האופקי לגובה העיניים: 6 + 1.4 = 7.4 מטרים.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 6"}},{"id":"physics-pole-04","position":4,"type":"mcq","topic":null,"difficulty":null,"prompt":"איזה מרחק מודדים לצורך החישוב?","choices":["המרחק האופקי אל בסיס העמוד","אורך קו הראייה האלכסוני","המרחק מראש העמוד לקרקע באומדן"],"correct":0,"explanation":{"he":"מודדים את המרחק האופקי מהנקודה שמתחת לעין אל בסיס העמוד.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 6"}},{"id":"physics-pole-05","position":5,"type":"mcq","topic":null,"difficulty":null,"prompt":"איזה גובה מוסיפים למרחק האופקי?","choices":["גובה העיניים מעל הקרקע","גובה התלמיד כולו","גובה המשולש שביד"],"correct":0,"explanation":{"he":"מוסיפים את גובה העיניים, כי המשולש מתחיל בגובה העין.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 6"}},{"id":"physics-pole-06","position":6,"type":"mcq","topic":null,"difficulty":null,"prompt":"איזה תנאי נדרש לשיטה המתוארת?","choices":["קרקע אופקית ובסיס העמוד באותו מפלס","העמוד חייב להיות נמוך מהתלמיד","אין צורך לדעת את זווית הראייה"],"correct":0,"explanation":{"he":"הנוסחה מתאימה כאשר הקרקע אופקית ובסיס העמוד באותו מפלס.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 5"}},{"id":"physics-pole-07","position":7,"type":"mcq","topic":null,"difficulty":null,"prompt":"המרחק לעמוד 4 מטרים וגובה העיניים 1.5 מטרים. מה גובה העמוד בשיטת 45°?","choices":["5.5 מטרים","4 מטרים","2.5 מטרים"],"correct":0,"explanation":{"he":"מחברים מרחק אופקי וגובה עיניים: 4 + 1.5 = 5.5 מטרים.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 5"}},{"id":"physics-pole-08","position":8,"type":"mcq","topic":null,"difficulty":null,"prompt":"מה צריך לראות דרך הגליל כשקובעים את נקודת המדידה?","choices":["את ראש העמוד","את בסיס העמוד בלבד","את הקרקע מתחת לעיניים"],"correct":0,"explanation":{"he":"מתקדמים או מתרחקים עד שרואים את ראש העמוד דרך הגליל המכוון ב־45°.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 6"}},{"id":"physics-pole-09","position":9,"type":"mcq","topic":null,"difficulty":null,"prompt":"מהו תפקיד המשולש בעל זווית 45°?","choices":["לעזור לכוון את הגליל בזווית הנכונה לאופק","למדוד ישירות את גובה העמוד","למדוד את עובי העמוד"],"correct":0,"explanation":{"he":"המשולש עוזר לקבע את הגליל בזווית של 45° ביחס לאופק.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 6"}},{"id":"physics-pole-10","position":10,"type":"mcq","topic":null,"difficulty":null,"prompt":"אם המרחק האופקי לעמוד 5 מטרים, מה גובה ראש העמוד מעל גובה העיניים בשיטה זו?","choices":["5 מטרים","10 מטרים","2.5 מטרים"],"correct":0,"explanation":{"he":"בזווית של 45° הניצבים במשולש שווים, ולכן הגובה מעל העיניים שווה למרחק האופקי.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 5"}},{"id":"physics-pole-11","position":11,"type":"mcq","topic":null,"difficulty":null,"prompt":"למה זו מדידה עקיפה?","choices":["כי מודדים מרחק וגובה עיניים ומחשבים מהם את גובה העמוד","כי קוראים את גובה העמוד ישירות מסרגל","כי אין צורך למדוד דבר"],"correct":0,"explanation":{"he":"גובה העמוד מתקבל מחישוב המבוסס על מדידות אחרות.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 6"}}]}]'),Ws={quizzes:tx};function nx(n,e){const t=new bt;n.add(t);const i=new _i({color:"#f3c574"}),r=new _i({color:"#9ef5dc"}),s=new qo(.34),a=new Fi(1.05,.085,8,36),o=new Wi(.55,.76,.12);function c(f,p,v,b,m){const h=new nn(f,i);return h.position.set(v,b,m),p.add(h),h}const l=Array.from({length:3},()=>{const f=new bt;t.add(f);const p=c(a,f,0,1.65,0),v=c(s,f,0,2.9,0);v.scale.setScalar(1.6);const b=[-1,0,1].map(h=>c(o,f,h*.75,.65,0)),m=Array.from({length:3},()=>c(s,t,0,1,0));return{group:f,ring:p,diamond:v,panels:b,sparks:m}}),u=new bt;t.add(u),u.position.set(0,5,-25);const d=[[-3,0,0],[-1,2,0],[1,1,0],[3,3,0],[4,1,0]];for(const[f,p,v]of d)c(s,u,f,p,v);return u.add(new th(new kt().setFromPoints(d.map(f=>new B(...f))),new Yl({color:"#f3c574"}))),t.visible=!1,{sync(f){t.visible=!!f.relay,t.visible&&(u.visible=f.seals.length===3,l.forEach(({group:p,ring:v,diamond:b,panels:m,sparks:h},w)=>{const A=Ot(f.relay,w),E=Mi(f.relay,w);p.position.set(A.x,0,A.z),b.material=v.material=E?r:i,v.rotation.x=A.task==="ring"?0:Math.PI/2,v.position.y=A.task==="ring"?1.65:.16,m.forEach((M,g)=>{M.visible=A.task==="mirror",M.material=f.relay.steps[w]>g?r:i}),Ns(A).forEach((M,g)=>{h[g].position.set(M.x,1,M.z),h[g].visible=A.task==="sparks"&&!(f.relay.steps[w]&1<<g)})}))},tick(f){!t.visible||e||(l.forEach(({diamond:p,sparks:v},b)=>{p.rotation.y=f,p.position.y=2.9+.17*Math.sin(f*2+b);for(const m of v)m.visible&&(m.rotation.y=f*2,m.position.y=1+.18*Math.sin(f*3+m.position.x))}),u.position.y=5+.3*Math.sin(f))}}}function ix(n,e=!1){const t=n[0].index!==null,i=new Set(Object.keys(n[0].attributes)),r=new Set(Object.keys(n[0].morphAttributes)),s={},a={},o=n[0].morphTargetsRelative,c=new kt;let l=0;for(let u=0;u<n.length;++u){const d=n[u];let f=0;if(t!==(d.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const p in d.attributes){if(!i.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+p+'" attribute exists among all geometries, or in none of them.'),null;s[p]===void 0&&(s[p]=[]),s[p].push(d.attributes[p]),f++}if(f!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(o!==d.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const p in d.morphAttributes){if(!r.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;a[p]===void 0&&(a[p]=[]),a[p].push(d.morphAttributes[p])}if(e){let p;if(t)p=d.index.count;else if(d.attributes.position!==void 0)p=d.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,p,u),l+=p}}if(t){let u=0;const d=[];for(let f=0;f<n.length;++f){const p=n[f].index;for(let v=0;v<p.count;++v)d.push(p.getX(v)+u);u+=n[f].attributes.position.count}c.setIndex(d)}for(const u in s){const d=pl(s[u]);if(!d)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;c.setAttribute(u,d)}for(const u in a){const d=a[u][0].length;if(d===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[u]=[];for(let f=0;f<d;++f){const p=[];for(let b=0;b<a[u].length;++b)p.push(a[u][b][f]);const v=pl(p);if(!v)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;c.morphAttributes[u].push(v)}}return c}function pl(n){let e,t,i,r=-1,s=0;for(let l=0;l<n.length;++l){const u=n[l];if(e===void 0&&(e=u.array.constructor),e!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=u.itemSize),t!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=u.normalized),i!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(r===-1&&(r=u.gpuType),r!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;s+=u.count*t}const a=new e(s),o=new Sn(a,t,i);let c=0;for(let l=0;l<n.length;++l){const u=n[l];if(u.isInterleavedBufferAttribute){const d=c/t;for(let f=0,p=u.count;f<p;f++)for(let v=0;v<t;v++){const b=u.getComponent(f,v);o.setComponent(f+d,v,b)}}else a.set(u.array,c);c+=u.count*t}return r!==void 0&&(o.gpuType=r),o}const rx=(n,e)=>Math.hypot(n.x-e.x,n.z-e.z)<=1.8;function Ur(n,e,t,i=.14){const r=Math.hypot(e.x-n.x,e.z-n.z),s=Math.max(1,Math.ceil(r/i));for(let a=0;a<=s;a++){const o=a/s;if(t(n.x+(e.x-n.x)*o,n.z+(e.z-n.z)*o))return!1}return!0}function ml(n,e,t,{step:i=.6,radius:r=1.7,bound:s=27}={}){if(![n.x,n.z,e.x,e.z].every(Number.isFinite)||t(n.x,n.z))return null;if(Math.hypot(n.x-e.x,n.z-e.z)<=r)return[];const a=Math.floor(s*2/i)+1,o=a*a,c=E=>({x:E%a*i-s,z:Math.floor(E/a)*i-s}),l=[],u=new Float64Array(o).fill(1/0),d=new Int32Array(o).fill(-1),f=new Uint8Array(o),p=new Int8Array(o);function v(E){if(E<0||E>=o)return!1;if(!p[E]){const M=c(E);p[E]=t(M.x,M.z)?-1:1}return p[E]>0}const b=E=>Math.max(0,Math.hypot(E.x-e.x,E.z-e.z)-r);function m(E,M){let g=l.length;for(l.push({id:E,priority:M});g>0;){const R=g-1>>1;if(l[R].priority<=M)break;[l[R],l[g]]=[l[g],l[R]],g=R}}function h(){const E=l[0],M=l.pop();if(l.length){l[0]=M;let g=0;for(;;){const R=g*2+1,P=R+1;let x=g;if(R<l.length&&l[R].priority<l[x].priority&&(x=R),P<l.length&&l[P].priority<l[x].priority&&(x=P),x===g)break;[l[g],l[x]]=[l[x],l[g]],g=x}}return E.id}const w=Math.round((n.x+s)/i),A=Math.round((n.z+s)/i);for(let E=-2;E<=2;E++)for(let M=-2;M<=2;M++){const g=w+M,R=A+E;if(g<0||R<0||g>=a||R>=a)continue;const P=R*a+g,x=c(P);v(P)&&Ur(n,x,t)&&(u[P]=Math.hypot(x.x-n.x,x.z-n.z),m(P,u[P]+b(x)))}for(;l.length;){const E=h();if(f[E])continue;f[E]=1;const M=c(E);if(Math.hypot(M.x-e.x,M.z-e.z)<=Math.max(r,i*.72)){const P=[];for(let N=E;N!==-1;N=d[N])P.push(c(N));P.reverse(),r<i&&Ur(P.at(-1),e,t)&&P.push({...e});const x=[];let _=n,C=0;for(;C<P.length;){let N=C;for(;N+1<P.length&&Ur(_,P[N+1],t);)N++;x.push(P[N]),_=P[N],C=N+1}return x}const g=E%a,R=Math.floor(E/a);for(let P=-1;P<=1;P++)for(let x=-1;x<=1;x++){if(!x&&!P)continue;const _=g+x,C=R+P;if(_<0||C<0||_>=a||C>=a)continue;const N=C*a+_;if(f[N]||!v(N)||x&&P&&(!v(R*a+_)||!v(C*a+g)))continue;const I=c(N);if(!Ur(M,I,t))continue;const H=u[E]+i*Math.hypot(x,P);H>=u[N]||(u[N]=H,d[N]=E,m(N,H+b(I)))}}return null}function sx(n,{reduced:e=!1,onMove:t,onInteract:i,onCollect:r,onEnvironmentChange:s}){let a=7919;const o=()=>((a=a*16807%2147483647)-1)/2147483646,c=new jd;c.background=new at("#1a2833"),c.fog=new Go("#1a2833",.011);const l=new cn(46,innerWidth/innerHeight,.1,210),u=new Qm({antialias:!0,powerPreference:"high-performance"});u.setPixelRatio(Math.min(devicePixelRatio,innerWidth<600?1.15:1.5)),u.setSize(innerWidth,innerHeight),u.shadowMap.enabled=!0,u.shadowMap.type=wl,u.outputColorSpace=tn,u.toneMapping=Cl,u.toneMappingExposure=1.25,u.domElement.setAttribute("aria-label","קמפוס בית הספר בתלת־ממד. זזים בחצים או במקשי WASD; אפשר ללחוץ על הקרקע."),n.appendChild(u.domElement),c.add(new sh("#b3c5de","#374039",1.25));const d=new Vc("#a4bdd5",2);d.position.set(-22,34,12),d.castShadow=!0,d.shadow.mapSize.set(innerWidth<600?1024:1536,innerWidth<600?1024:1536),Object.assign(d.shadow.camera,{left:-38,right:38,top:38,bottom:-38,near:.1,far:100}),d.shadow.bias=-6e-4,d.shadow.normalBias=.035,c.add(d);const f=new Vc("#d7a270",.65);f.position.set(12,7,-40),c.add(f);const p=new Map;function v(T,D=!1){const U=`${T}/${D}`;return p.has(U)||p.set(U,new mi({color:T,roughness:.9,...D?{emissive:T,emissiveIntensity:1.15}:{}})),p.get(U)}function b(T){const D=document.createElement("canvas");D.width=D.height=256;const U=D.getContext("2d");U.fillStyle=T==="grass"?"#798073":T==="brick"?"#9b8a79":"#969a9b",U.fillRect(0,0,256,256);for(let Y=0;Y<11e3;Y++){const ye=Math.floor(o()*60),Te=o()*256,Pe=o()*256;U.fillStyle=`rgba(${ye},${ye},${ye},${o()*.13})`,U.fillRect(Te,Pe,T==="grass"?1:2,T==="grass"?4:2)}if(T==="brick"){U.strokeStyle="#6b6f6b",U.lineWidth=2;for(let Y=0;Y<256;Y+=32){U.beginPath(),U.moveTo(0,Y),U.lineTo(256,Y),U.stroke();for(let ye=Y%64?32:0;ye<256;ye+=64)U.beginPath(),U.moveTo(ye,Y),U.lineTo(ye,Y+32),U.stroke()}}const G=new Sa(D);return G.colorSpace=tn,G.wrapS=G.wrapT=ws,G.repeat.set(T==="grass"?26:3,T==="grass"?26:3),G.anisotropy=4,G}const m=new mi({color:"#667560",map:b("grass"),roughness:1}),h=new mi({color:"#a8aba5",map:b("concrete"),roughness:.95}),w=new mi({color:"#b0a698",map:b("brick"),roughness:1}),A=new mi({color:"#717677",map:b("concrete"),roughness:.95});function E(T,D,U,G,Y,ye=c,Te=!1){const Pe=typeof D=="string"?v(D,Te):D,Ue=new nn(T,Pe);return Ue.position.set(U,G,Y),Ue.castShadow=!Te,Ue.receiveShadow=!Te,ye.add(Ue),Ue}const M=(T,D,U,G,Y,ye,Te,Pe=c,Ue=!1)=>E(new Wi(G,Y,ye),Te,T,D,U,Pe,Ue),g=(T,D,U,G,Y,ye=c,Te=1,Pe=!1)=>E(new Us(G,12,8),Y,T,D,U,ye,Pe),R=(T,D,U,G,Y,ye,Te=c,Pe=8)=>E(new Wo(G,Y,Pe),ye,T,D,U,Te),P=(T,D,U,G,Y,ye,Te=c,Pe=10)=>E(new Zn(G,G,Y,Pe),ye,T,D,U,Te);function x(T,D,U,G,Y,ye,Te,Pe=c){const Ue=g(T,D,U,1,Te,Pe);return Ue.scale.set(G,Y,ye),Ue}function _(T,D,U,G,Y=c){const ye=new B(...T),Te=new B(...D),Pe=Te.clone().sub(ye),Ue=E(new Zn(U*.7,U,Pe.length(),7),G,...ye.clone().add(Te).multiplyScalar(.5).toArray(),Y);return Ue.quaternion.setFromUnitVectors(new B(0,1,0),Pe.normalize()),Ue}const C=[],N=(T,D,U)=>C.push({x:T,z:D,r:U});function I(T,D){return Math.abs(T)>27||Math.abs(D)>27||C.some(U=>!U.disabled&&(U.hx!==void 0?Math.abs(T-U.x)<U.hx+.28&&Math.abs(D-U.z)<U.hz+.28:U.r?Math.hypot(T-U.x,D-U.z)<U.r+.35:((T-U.x)/(U.rx+.3))**2+((D-U.z)/(U.rz+.3))**2<1))}function H(T,D,U,G,Y,ye=.03){const Te=E(new Zn(1,1,.045,48),Y,T,ye,D);return Te.scale.set(U,1,G),Te}const X=M(0,-.2,0,180,.3,180,m);X.castShadow=!1;for(let T=0;T<9;T++){const D=T/9*Math.PI*2,U=x(Math.cos(D)*72,3,Math.sin(D)*72,24,9+o()*9,20,"#273c3d");U.castShadow=!1}function Z(T,D=2.3){for(let U=0;U<T.length-1;U++){const G=T[U],Y=T[U+1],ye=Math.hypot(Y[0]-G[0],Y[1]-G[1]),Te=M((G[0]+Y[0])/2,.015,(G[1]+Y[1])/2,D,.055,ye,A);Te.rotation.y=Math.atan2(Y[0]-G[0],Y[1]-G[1]),H(G[0],G[1],D/2,D/2,A,.046)}}Z([[0,25],[0,12],[-3,4],[0,-4],[0,-12]],3.1),Z([[-3,4],[-10,1],[-13,-9],[-15,-17]],2.5),Z([[0,-4],[8,-5],[13,-7],[20,-13]],2.5),Z([[0,12],[10,14],[19,18]],2.5),Z([[-13,-9],[-7,-15],[0,-16],[8,-17],[13,-7]],2.1),Z([[0,-12],[7,-17],[7,-24],[0,-25]],2.2),H(0,9,4.6,3.8,h,.05),H(-17,13,7.1,5.5,"#4c5c52",.025);const re=new mi({color:"#214d5b",roughness:.18,metalness:.45});H(-17,13,6.7,5.2,re,.06),C.push({x:-17,z:13,rx:6.5,rz:5});for(let T=0;T<28;T++){const D=o()*Math.PI*2,U=-17+Math.cos(D)*7,G=13+Math.sin(D)*5.5;for(let Y=0;Y<3;Y++)_([U+Y*.1,0,G],[U+Y*.1+.08,.5+o()*.5,G],.018,"#7a8464")}for(let T=0;T<7;T++){const D=T*.9;H(-17+Math.cos(D)*4.6,13+Math.sin(D)*3,.28,.23,"#71836b",.09)}const K=new mi({color:"#687b83",roughness:.22,metalness:.55}),ne=new mi({color:"#c7b38d",emissive:"#b38551",emissiveIntensity:.55,roughness:.35}),Q=[],fe={x:-2,z:-16.86,hx:1.34,hz:.09};function we(){const T=new bt;T.position.set(-2,0,-20),c.add(T),M(0,4.9,0,12,3.2,6,w,T),M(0,6.65,0,12.6,.35,6.6,h,T),M(0,.03,0,12,.08,6,h,T),M(0,1.65,-2.85,12,3.3,.3,w,T);for(const D of[-1,1])M(D*5.85,1.65,0,.3,3.3,6,w,T),M(D*3.68,1.65,2.9,4.64,3.3,.2,w,T);M(0,1.2,-2.65,5,1.4,.04,"#526660",T),M(0,1.2,-2.6,2.2,.9,.04,"#d6cfb6",T),M(0,.2,3.5,13,.4,1.5,h,T),M(0,.08,4.15,6,.16,.7,h,T);for(const D of[-1,1]){const U=new bt;U.position.set(D*1.34,0,3.14),T.add(U),M(-D*.67,1.65,0,1.32,3.3,.07,K,U),P(-D*1.13,1.5,.08,.025,.5,"#b5b9b6",U),Q.push(U)}M(0,3.7,3.8,3.4,.13,1.5,"#45555d",T);for(const D of[-4.75,-3.15,3.15,4.75])for(const U of[1.9,4.65])M(D,U,3.045,1.3,1.7,.12,"#34424a",T),M(D,U,3.115,1.12,1.5,.03,(D+U)%2>.9?ne:K,T),M(D,U,3.14,.04,1.55,.05,"#9a9e98",T),M(D,U+.02,3.14,1.16,.04,.05,"#9a9e98",T);for(const D of[-5.2,-1.7,1.7,5.2])M(D,3.25,3.11,.15,6.5,.15,"#c4c2b8",T);M(-3.9,7.05,-.8,2,.7,1.1,"#626e73",T);for(let D=0;D<7;D++)M(-4.7+D*.25,7.1,-.2,.05,.45,.05,"#34434b",T);P(4,8,-1,.06,2.7,"#7a868b",T),_([3.5,8.5,-1],[4.5,8.5,-1],.025,"#929a9b",T),C.push(fe,{x:-2,z:-22.85,hx:6,hz:.15},{x:-7.85,z:-20,hx:.15,hz:3},{x:3.85,z:-20,hx:.15,hz:3},{x:-5.68,z:-17.1,hx:2.32,hz:.1},{x:1.68,z:-17.1,hx:2.32,hz:.1})}we();function Oe(T,D,U=!1){const G=new bt;if(G.position.set(T,0,D),c.add(G),M(0,1.9,0,5.5,3.8,4.4,U?"#445e60":w,G),M(0,3.95,0,5.8,.25,4.7,h,G),U){for(const Y of[-2,-.7,.7,2])M(Y,2,2.23,1.05,2.9,.08,K,G),M(Y,2,2.3,.06,3.6,.08,"#a2b2ab",G);for(const Y of[-1.5,0,1.5])M(-2.8,2,Y,.08,2.9,1.1,K,G)}else M(-1.8,2.1,2.25,1.3,1.5,.08,ne,G),M(1.8,2.1,2.25,1.3,1.5,.08,K,G);return M(0,1.5,2.3,1.2,3,.1,"#293b42",G),M(0,1.6,2.37,.9,2.5,.05,K,G),M(0,.12,2.8,3,.24,1.1,h,G),N(T,D,3.45),G}Oe(-17,-12),Oe(18,-11,!0);const We=new bt;We.position.set(16,0,16),c.add(We);for(const T of[-.85,.85])for(const D of[-.85,.85])_([T,0,D],[T*.6,8,D*.6],.085,"#737b7d",We);for(let T=0;T<8;T+=2)_([-.85,T,-.85],[.85,T+2,-.85],.04,"#646f73",We),_([-.85,T,.85],[.85,T+2,.85],.04,"#646f73",We),M(0,T,0,1.8,.08,1.8,"#566269",We);M(0,8.2,0,2.8,.2,2.8,"#59666b",We),P(0,9.5,0,.045,2.6,"#9aa9ad",We),M(0,10.4,0,1.7,.05,.05,"#9aa9ad",We);const ct=E(new Us(.65,16,10,0,Math.PI*2,0,Math.PI/2),"#819398",.85,7.8,.9,We);ct.rotation.x=-Math.PI/2,N(16,16,1.7);function te(T,D){const U=Math.hypot(D[0]-T[0],D[1]-T[1]),G=Math.ceil(U/2.5);for(let Y=0;Y<=G;Y++){const ye=Y/G;M(T[0]+(D[0]-T[0])*ye,1.05,T[1]+(D[1]-T[1])*ye,.07,2.1,.07,"#48585e")}for(const Y of[.5,1.4,2.05])_([T[0],Y,T[1]],[D[0],Y,D[1]],.018,"#738184")}te([-27,-27],[-3,-27]),te([3,-27],[27,-27]),te([-27,-27],[-27,27]),te([27,-27],[27,27]),te([-27,27],[27,27]),M(-2.5,2.4,-25,.38,4.8,.5,h),M(2.5,2.4,-25,.38,4.8,.5,h),M(0,4.8,-25,5.4,.3,.6,"#5b686c");const ce=new bt;c.add(ce);const Ee=[-1,1].map(T=>{const D=new bt;D.position.set(T*2.2,0,-25),ce.add(D);for(let U=0;U<7;U++)M(-T*U*.32,1.9,0,.045,3.8,.08,"#66757a",D);for(const U of[.7,2.7,3.8])M(-T*1,U,0,2.15,.06,.08,"#66757a",D);return D}),Ye=[-1.15,0,1.15].map(T=>M(T,4.8,-24.65,.28,.13,.06,"#b66c4f",c,!0)),Le=new Aa("#accca0",0,8,2);Le.position.set(0,3.5,-25),c.add(Le);function et(T,D,U,G="#d9b574"){const Y=document.createElement("canvas");Y.width=Y.height=64;const ye=Y.getContext("2d"),Te=ye.createRadialGradient(32,32,1,32,32,32);Te.addColorStop(0,"rgba(244,211,153,.24)"),Te.addColorStop(1,"rgba(244,211,153,0)"),ye.fillStyle=Te,ye.fillRect(0,0,64,64);const Pe=new nn(new _r(U,U),new _i({map:new Sa(Y),transparent:!0,depthWrite:!1,color:G}));return Pe.rotation.x=-Math.PI/2,Pe.position.set(T,.11,D),c.add(Pe),Pe}function Dt(T,D){P(T,1.9,D,.045,3.8,"#43525b"),M(T,3.75,D+.24,.15,.13,.65,"#b8b6a3",c);const U=M(T,3.68,D+.35,.11,.025,.4,"#d6b884",c,!0),G=et(T,D+1.1,4.8);return{bulb:U,pool:G}}const tt=Dt(-2,10);[[2,-4],[-12,-7],[12,-5],[10,12],[-5,-13],[6,-22],[2,-25],[-8,2],[18,4]].forEach(T=>Dt(...T));const yt=new Aa("#e5b777",12,14,2);yt.position.set(-2,3.8,-15.5),c.add(yt);function O(T,D,U=0){const G=new bt;G.position.set(T,0,D),G.rotation.y=U,c.add(G);for(let Y=0;Y<4;Y++)M(0,.56,-.33+Y*.22,2.5,.06,.17,"#837864",G);for(let Y=0;Y<3;Y++)M(0,.95+Y*.17,-.48,2.5,.12,.06,"#837864",G);for(const Y of[-.9,.9])M(Y,.27,0,.07,.54,.73,"#3d4a51",G),M(Y,.98,-.48,.06,.84,.06,"#3d4a51",G);N(T,D,1.15)}O(8,15),O(-10,-8,Math.PI/2),O(-6,10),M(11,.015,22,11,.05,7,"#606f6c");for(const T of[5.6,16.4])M(T,.06,22,.04,.01,6.7,"#b8b9ad");for(const T of[18.7,25.3])M(11,.06,T,10.8,.01,.04,"#b8b9ad");const nt=E(new zn(1.75,1.78,48),"#b8b9ad",11,.07,22);nt.rotation.x=-Math.PI/2,P(16.3,1.65,22,.07,3.3,"#6e7b7d"),M(15.95,3.1,22,.08,1.05,1.6,"#9da9a5"),M(15.89,3.05,22,.02,.5,.75,"#c1c6b5");const it=E(new Fi(.27,.025,5,18),"#a87957",15.58,2.83,22);it.rotation.x=Math.PI/2,N(16.3,22,.25);for(let T=0;T<3;T++){const D=-20.5+T*.5,U=E(new Fi(.35,.035,5,12,Math.PI),"#7e898a",D,.35,-8.5);U.rotation.y=Math.PI/2}for(const T of[-22,-21]){const D=E(new Fi(.31,.035,5,18),"#26353d",T,.35,-8.5);D.rotation.y=Math.PI/2}_([-22,.35,-8.5],[-21.5,.9,-8.5],.025,"#93624d"),_([-21,.35,-8.5],[-21.5,.9,-8.5],.025,"#93624d"),_([-22,.35,-8.5],[-21,.35,-8.5],.025,"#93624d");function pt(T,D,U=1){const G=new bt;G.position.set(T,0,D),G.scale.setScalar(U),c.add(G);const Y=(o()-.5)*.6;_([0,0,0],[Y,4.6,0],.19,"#665f51",G);for(let ye=0;ye<4;ye++){const Te=ye*Math.PI*.5+o()*.5,Pe=Math.cos(Te)*(1+o()*.5),Ue=Math.sin(Te)*(1+o()*.5),Ct=3.5+o()*2;_([Y*.6,2.4+ye*.4,0],[Pe,Ct,Ue],.075,"#605c4e",G);const An=x(Pe,Ct+.7,Ue,1.4+o()*.6,1.5+o()*.6,1.3+o()*.6,["#344a3e","#405947","#465b49","#51634c"][ye],G);An.rotation.z=(o()-.5)*.8}N(T,D,.45*U)}for(let T=0;T<56;T++){const D=T%4,U=-29+Math.floor(T/4)*4.1,G=o()*2;pt(D<2?U:(D===2?-29:29)+G,D<2?(D===0?-29:29)+G:U,.75+o()*.45)}[[-23,-8],[-24,-3],[-22,1],[-20,-3],[-8,20],[-5,23],[6,26],[21,5],[24,1],[21,-2],[8,-13],[-7,-5],[-9,-18],[22,22],[-24,22],[-9,16]].forEach(([T,D])=>pt(T,D,.65+o()*.4));for(let T=0;T<120;T++){const D=(o()-.5)*54,U=(o()-.5)*54;if(!(Math.abs(D)<4||C.some(G=>Math.hypot(D-G.x,U-G.z)<(G.r||7)+.8)))if(T%5===0){const G=x(D,.2,U,.45+o()*.3,.25,.4,"#737b72");G.rotation.y=o()*6}else for(let G=0;G<3;G++)_([D+G*.1,0,U],[D+G*.1+.08,.25+o()*.25,U+.06],.012,"#6c7c5d")}function be(T,D,U,G,Y,ye=""){const Te=document.createElement("canvas");Te.width=1024,Te.height=256;const Pe=Te.getContext("2d");Pe.fillStyle="#243139",Pe.fillRect(0,0,1024,256),Pe.strokeStyle="#a5a894",Pe.lineWidth=4,Pe.strokeRect(12,12,1e3,232),Pe.textAlign="center",Pe.direction="rtl",Pe.fillStyle="#e1dfd1",Pe.font="bold 62px Arial",Pe.fillText(Y,512,ye?108:150),ye&&(Pe.font="34px Arial",Pe.fillStyle="#bfc6bb",Pe.fillText(ye,512,190));const Ue=new Sa(Te);Ue.colorSpace=tn,Ue.anisotropy=4;const Ct=new nn(new _r(G,G/4),new _i({map:Ue,side:Pn}));return Ct.position.set(T,D,U),c.add(Ct),Ct}be(-2,5.75,-16.75,10,"בית הספר שי עגנון","כיתה ז׳ איינשטיין · כיתת הייטק"),be(-17,3.55,-9.65,4.4,"01 · ספריית איינשטיין"),be(18,3.55,-8.65,4.4,"02 · מעבדת ההייטק"),be(16,3.2,17.1,3.2,"03 · תחנת הקשר"),be(0,5.55,-24.8,4.8,"יציאה"),M(-4,1.1,5,.07,2.2,.07,"#64716d"),be(-4,2.1,5.1,3.5,"קמפוס שי עגנון","ז׳ איינשטיין · כיתת הייטק"),g(-38,30,-57,1.7,"#bbcbd3",c,3,!0);const St=[];for(let T=0;T<85;T++){const D=o()*Math.PI*2,U=65+o()*35;St.push(Math.cos(D)*U,25+o()*40,Math.sin(D)*U)}const Fe=new kt;Fe.setAttribute("position",new Mt(St,3)),c.add(new nh(Fe,new jl({color:"#bbcad6",size:.08,transparent:!0,opacity:.65})));const $e=new Map;function L(T,D,U){const G=new bt;return G.position.set(D,0,U),c.add(G),M(0,.45,0,.85,.9,.6,"#4b575a",G),M(0,.95,0,1.05,.1,.8,"#7c8580",G),$e.set(T,G),G}const y=L("card",-21,-3);M(0,1.05,0,.48,.035,.3,"#c7c8b8",y),M(-.11,1.073,0,.12,.005,.18,"#507c86",y);for(let T=0;T<3;T++)M(.08,1.073,-.07+T*.065,.17,.005,.015,"#606765",y);const W=L("fuse",21,3),ie=P(0,1.09,0,.07,.45,"#d6ccac",W);ie.rotation.z=Math.PI/2;for(const T of[-.21,.21]){const D=P(T,1.09,0,.075,.07,"#a6b0b2",W);D.rotation.z=Math.PI/2}const ae=L("antenna",-8,22);M(0,1.12,0,.35,.25,.22,"#2e3e48",ae),_([0,1.25,0],[.24,2.05,.02],.018,"#bbc5c1",ae),M(0,1.14,.12,.19,.1,.025,"#718576",ae);const J=Ze.map((T,D)=>{const U=new bt;U.position.set(T.x+1.2,0,T.z-.9),c.add(U),M(0,.65,0,.7,1.3,.45,"#4a585d",U);const G=M(0,1.05,.24,.48,.34,.025,"#a4784e",U,!0);M(0,.67,.25,.45,.06,.05,"#7b8988",U);const Y=new Aa("#e3ae72",0,7,2);return Y.position.set(T.x,2.5,T.z),c.add(Y),{g:U,screen:G,light:Y}}),Re=ex({scene:c,box:M,ball:g,cyl:P,mesh:E,segment:_,mat:v,sign:be,softPool:et,doorLeaves:Q,doorBlocker:fe,lampFixture:tt}),_e={value:new B},ze={value:0},Ce=new Set;c.traverse(T=>{if(T.isMesh)for(const D of[T.material].flat())Ce.add(D)});for(const T of Ce)T.onBeforeCompile=D=>{D.uniforms.sightPlayer=_e,D.uniforms.sightEnabled=ze,D.vertexShader=`varying vec3 vSightPosition;
`+D.vertexShader,D.vertexShader=D.vertexShader.replace("#include <project_vertex>",`#include <project_vertex>
        vSightPosition=(modelMatrix*vec4(transformed,1.0)).xyz;`),D.fragmentShader=`varying vec3 vSightPosition;
uniform vec3 sightPlayer;
uniform float sightEnabled;
`+D.fragmentShader,D.fragmentShader=D.fragmentShader.replace("#include <clipping_planes_fragment>",`#include <clipping_planes_fragment>
        if(sightEnabled>0.5 && vSightPosition.y>0.22){
          vec3 sightLine=sightPlayer-cameraPosition;
          float sightLength=length(sightLine);
          vec3 sightDirection=sightLine/sightLength;
          vec3 sightOffset=vSightPosition-cameraPosition;
          float sightDepth=dot(sightOffset,sightDirection);
          float sightDistance=length(sightOffset-sightDirection*sightDepth);
          if(sightDepth>0.0 && sightDepth<sightLength+0.35 && sightDistance<2.6) discard;
        }`)},T.customProgramCacheKey=()=>"player-sight-corridor-v1";c.updateMatrixWorld(!0);const le=new Set([ce,...Ye,...$e.values(),...J.map(T=>T.g),...Re.dynamic]),de=new Map,Ge=[];c.traverse(T=>{if(!T.isMesh)return;let D=T;for(;D;){if(le.has(D))return;D=D.parent}if(T.material.transparent)return;const U=de.get(T.material)||[];U.push(T.geometry.clone().applyMatrix4(T.matrixWorld)),de.set(T.material,U),Ge.push(T)});for(const[T,D]of de){const U=ix(D);if(!U)continue;const G=new nn(U,T);G.castShadow=!T.isMeshBasicMaterial&&!(T.emissiveIntensity>1),G.receiveShadow=!0,c.add(G);for(const Y of D)Y.dispose()}for(const T of Ge)T.removeFromParent(),T.geometry.dispose();function ke(T="#a26e4e",D="#c7a78b",U="#313236",G=!0){const Y=new bt,ye=[],Te=[];for(const Pe of[-1,1]){const Ue=new bt;Ue.position.set(Pe*.13,.91,0),Y.add(Ue),E(new cr(.1,.59,4,8),"#3e4b55",0,-.36,0,Ue),x(0,-.83,.09,.115,.08,.23,"#27343a",Ue),ye.push(Ue)}E(new cr(.235,.4,4,10),T,0,1.22,0,Y).scale.z=.7,x(0,1.48,-.08,.24,.16,.18,T,Y),P(0,1.57,0,.075,.15,D,Y),x(0,1.77,.015,.17,.215,.16,D,Y),x(0,1.89,-.035,.177,.12,.17,U,Y),x(0,1.82,-.12,.17,.16,.06,U,Y);for(const Pe of[-.065,.065])g(Pe,1.79,.169,.015,"#343833",Y);x(0,1.73,.18,.025,.035,.045,D,Y);for(const Pe of[-1,1]){const Ue=new bt;Ue.position.set(Pe*.27,1.47,0),Y.add(Ue),E(new cr(.075,.36,4,8),T,0,-.21,0,Ue),x(0,-.49,0,.07,.1,.065,D,Ue),Ue.rotation.z=Pe*.09,Te.push(Ue)}if(G){const Pe=E(new cr(.19,.26,4,8),"#33434a",0,1.2,-.24,Y);Pe.scale.z=.55;for(const Ue of[-1,1])M(Ue*.14,1.31,.16,.04,.43,.025,"#c0b69b",Y);M(0,1.2,-.37,.21,.1,.035,"#8b9b91",Y)}return Y.userData={legs:ye,arms:Te},Y}const ee=ke();ee.position.set(0,0,9),c.add(ee);const qe=E(new Zn(.035,.045,.18,8),"#303c42",.3,.92,.13,ee);qe.rotation.x=Math.PI/2,g(.3,.92,.23,.03,"#e6d4a5",ee,1,!0);const z=new Lt;z.position.set(.3,.1,6),ee.add(z);const ge=new oh("#f0dab1",18,13,.36,.65,1.6);ge.position.set(.3,.95,.24),ge.target=z,ee.add(ge);const pe=E(new zn(.43,.46,40),"#b9c2b3",0,.1,9,c,!0);pe.rotation.x=-Math.PI/2;function me(T="#9f704e",D=!1){const U=new bt,G=[];x(0,.48,0,.21,.26,.56,T,U),x(0,.67,.43,.22,.24,.24,T,U);const Y=R(0,.61,.7,.115,.35,"#c7c3ac",U,10);Y.rotation.x=Math.PI/2,g(0,.61,.88,.04,"#293533",U);for(const Te of[-.13,.13])R(Te,.99,.42,.1,.3,T,U,4),R(Te,.99,.45,.055,.18,"#62564c",U,4),g(Te,.73,.59,.022,"#252d2d",U);for(const Te of[-.14,.14])for(const Pe of[-.31,.32]){const Ue=new bt;Ue.position.set(Te,.45,Pe),U.add(Ue),P(0,-.19,0,.045,.4,"#514c44",Ue,7),x(0,-.39,.03,.05,.04,.1,"#353c39",Ue),G.push(Ue)}const ye=x(0,.56,-.76,.16,.17,.49,T,U);return ye.rotation.x=-.4,x(0,.72,-1.1,.13,.13,.2,"#c6c4ae",U),U.userData={legs:G},D&&U.scale.setScalar(.85),U}function ue(T,D){const U=new bt;if(T==="rabbit"){x(0,.24,0,.19,.22,.32,D,U),x(0,.43,.24,.15,.17,.16,D,U);for(const G of[-.075,.075]){const Y=x(G,.71,.2,.04,.21,.045,D,U);Y.rotation.z=G>0?-.15:.15,g(G,.47,.37,.014,"#263330",U)}x(0,.16,-.28,.085,.09,.08,"#bcbdb0",U);for(const G of[-.15,.15])x(G,.07,.13,.08,.06,.16,D,U)}else{x(0,.32,0,.18,.23,.3,D,U),x(0,.59,.18,.13,.14,.13,D,U);const G=R(0,.57,.37,.035,.15,"#ad9367",U,8);G.rotation.x=Math.PI/2;for(const Y of[-.09,.09])g(Y,.62,.28,.012,"#222e30",U);for(const Y of[-.075,.075])P(Y,.08,.04,.016,.16,"#887c62",U,6);x(-.16,.34,-.02,.04,.17,.25,"#58676b",U),x(.16,.34,-.02,.04,.17,.25,"#58676b",U)}return U}const se=Ze.map((T,D)=>{const U=ke(["#65747c","#6c7357","#7c5350"][D],["#b5947b","#c7a88a","#af8c72"][D],["#353231","#3c332c","#292e31"][D],D!==1);U.position.set(T.x,0,T.z),U.rotation.y=.3-D*.45,c.add(U);const G=E(new zn(.65,.68,36),T.color,T.x,.1,T.z,c,!0);G.rotation.x=-Math.PI/2;const Y=g(T.x,2.35,T.z,.065,"#c1b995",c,1,!0);return{g:U,marker:Y,ring:G}}),Se=[];for(let T=0;T<16;T++){const D=T%3===0?"fox":T%3===1?"rabbit":"bird",U=D==="fox"?me("#947553",!0):ue(D,D==="rabbit"?"#9d9d8c":"#7d8a8b");let G=(o()-.5)*43,Y=(o()-.5)*43;for(let ye=0;ye<80&&I(G,Y);ye++)G=(o()-.5)*43,Y=(o()-.5)*43;U.position.set(G,0,Y),c.add(U),Se.push({g:U,type:D,angle:o()*Math.PI*2,speed:.3+o()*.55,turn:o()*4})}for(let T=0;T<3;T++){const D=ue("duck","#8f947b");D.scale.setScalar(1.05),c.add(D),Se.push({g:D,type:"duck",angle:T*2,speed:.3,turn:0})}const Xe=Array.from({length:12},(T,D)=>{const U=[[-4,12],[-8,4],[-14,-3],[-9,-12],[4,-10],[10,-2],[18,2],[19,11],[9,21],[-7,20],[-23,-1],[5,-23]],[G,Y]=U[D];return{x:G,z:Y,mesh:g(G,1.1,Y,.055,"#c9c693",c,1,!0)}}),lt=E(new zn(.26,.3,24),"#c1c9b4",0,.12,0,c,!0);lt.rotation.x=-Math.PI/2,lt.visible=!1;const ut=nx(c,e),gt=new Set;let Nt={x:0,z:0},gn=null,rn=!1,Tn=!1,sn=0,_n=0,It=0,Xi=!1,Wt=Xr(),Jt=!1,oi=!1;const Ve={goal:null,endpoint:null,route:[],following:!1,arrived:!1,blocked:!1,anchor:null,lastPlan:-10};let an=[],un=null,$r=-1;const Fn=new Zd(new zn(.09,.16,8),new _i({color:"#efd09b",transparent:!0,opacity:.95,depthWrite:!1,depthTest:!1,side:Pn}),160);Fn.count=0,Fn.frustumCulled=!1,Fn.renderOrder=2,c.add(Fn);const Hn=new bt;c.add(Hn),Hn.visible=!1;const Ys=E(new zn(.56,.63,32),"#e4be7d",0,.16,0,Hn,!0);Ys.rotation.x=-Math.PI/2;const js=R(0,2.8,0,.22,.5,"#e4be7d",Hn,4);js.rotation.z=Math.PI,E(new Zn(.025,.025,2.3,6),new _i({color:"#e4be7d",transparent:!0,opacity:.3,depthWrite:!1}),0,1.4,0,Hn);const S=new xt,k=new br().setFromEuler(new Un(-Math.PI/2,0,0)),$=new B(1,1,1);function q(){if(Fn.count=0,Hn.visible=rn&&!!Ve.goal,!rn||!Ve.goal)return;const T=Ve.endpoint||Ve.goal;Hn.position.set(T.x,0,T.z);let D={x:ee.position.x,z:ee.position.z},U=0;for(const G of Ve.route){const Y=Math.hypot(G.x-D.x,G.z-D.z),ye=Math.ceil(Y/.75);for(let Te=1;Te<=ye&&U<160;Te++){const Pe=Te/ye;S.compose(new B(D.x+(G.x-D.x)*Pe,.15,D.z+(G.z-D.z)*Pe),k,$),Fn.setMatrixAt(U++,S)}D=G}Fn.count=U,Fn.instanceMatrix.needsUpdate=!0,$r=It}function V(){if(!Ve.goal)return;const T={x:ee.position.x,z:ee.position.z},D=rx(T,Ve.goal)?[]:ml(T,Ve.goal,I);Ve.route=D||[],Ve.endpoint=D===null?null:D.at(-1)||T,Ve.blocked=D===null,Ve.arrived=D!==null&&D.length===0,Ve.anchor=T,Ve.lastPlan=It,Ve.following&&(an=[...Ve.route],un=Ve.blocked||Ve.arrived?null:"guide",un||(Ve.following=!1)),q()}function he(T,D){return!Number.isFinite(T)||!Number.isFinite(D)||Math.abs(T)>27||Math.abs(D)>27?!1:(Ve.goal={x:T,z:D},Ve.following=!1,an=[],un=null,gn=null,V(),!Ve.blocked)}function xe(){Ve.following=!1,an=[],un=null,gn=null,lt.visible=!1}function Ae(){return!rn||Tn||!Ve.goal||(je(),Jt=!1,V(),Ve.blocked||Ve.arrived)?!1:(Ve.following=!0,un="guide",an=[...Ve.route],gt.clear(),Nt={x:0,z:0},!0)}function Me(){let T=0,D=ee.position;for(const U of Ve.route)T+=Math.hypot(U.x-D.x,U.z-D.z),D=U;return{following:Ve.following,arrived:Ve.arrived,blocked:Ve.blocked,goal:Ve.goal&&{...Ve.goal},remaining:+T.toFixed(1),route:Ve.route.map(U=>({...U})),endpoint:Ve.endpoint&&{...Ve.endpoint}}}function He(T){je(),Jt=!1,xe();const D=ml({x:ee.position.x,z:ee.position.z},T,I,{radius:.1});D!=null&&D.length&&(an=D,un="click",lt.position.set(D.at(-1).x,.12,D.at(-1).z),lt.visible=!0)}const De=new B;function Ie(){rn&&!Tn&&_n===0&&(je(),Jt=!1,xe(),sn=5.8)}function je(){Wt.seated&&(Wt.seated=!1,ee.position.set(-6,0,11.8),s==null||s({seated:!1}))}function ft(T,D){Wt=T,Re.sync(T,D),T.seated?(ee.position.set(-6,-.35,10.1),ee.rotation.y=0,oi=!0):oi&&(ee.position.set(-6,0,11.8),oi=!1),se.forEach((U,G)=>{const Y=T.helped.includes(Ze[G].id);U.g.userData.arms[0].rotation.x=Y?-1.1:0,U.g.userData.arms[1].rotation.x=Y?-.45:0,U.ring.material=v(Y?"#bbd0ab":Ze[G].color,!0)})}function wt(T){rn=T,xe(),gt.clear(),Jt=!1,q()}function Tt(T){Tn=T,gt.clear(),Nt={x:0,z:0},gn=null,lt.visible=!1}function mt(){gt.clear(),Nt={x:0,z:0},xe()}window.addEventListener("blur",mt),window.addEventListener("keydown",T=>{!rn||Tn||T.target.matches("input,select,textarea")||(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Space","KeyW","KeyA","KeyS","KeyD"].includes(T.code)&&T.preventDefault(),gt.add(T.code),T.code==="Space"&&Ie(),T.code==="KeyE"&&!T.repeat&&i())}),window.addEventListener("keyup",T=>gt.delete(T.code));const Be=new dh,At=new xi(new B(0,1,0),0);let st=null;u.domElement.addEventListener("pointerdown",T=>{st={x:T.clientX,y:T.clientY}}),u.domElement.addEventListener("pointerup",T=>{if(!rn||Tn||!st||Math.hypot(T.clientX-st.x,T.clientY-st.y)>10)return;Be.setFromCamera(new rt(T.clientX/innerWidth*2-1,1-T.clientY/innerHeight*2),l);const D=new B;Be.ray.intersectPlane(At,D)&&Math.abs(D.x)<27&&Math.abs(D.z)<27&&He({x:D.x,z:D.z})});const Qt=new B(11.5,12.5,15.55);function Nn(T,D=!0){if(Tn||(It+=T,ut.tick(It)),rn&&!Tn){let U=(gt.has("KeyD")||gt.has("ArrowRight")?1:0)-(gt.has("KeyA")||gt.has("ArrowLeft")?1:0)+Nt.x,G=(gt.has("KeyS")||gt.has("ArrowDown")?1:0)-(gt.has("KeyW")||gt.has("ArrowUp")?1:0)+Nt.z,Y=U*.806+G*.592,ye=-U*.592+G*.806;if(U||G)je(),Jt=!1,xe();else if(un){for(;an.length&&Math.hypot(an[0].x-ee.position.x,an[0].z-ee.position.z)<.1;)an.shift(),un==="guide"&&Ve.route.shift();an.length?(gn=an[0],Y=gn.x-ee.position.x,ye=gn.z-ee.position.z):(un==="guide"&&(Ve.arrived=!0,Ve.following=!1),un=null,gn=null,lt.visible=!1,Y=ye=0,q())}gn&&(je(),Jt=!1);const Te=Math.hypot(Y,ye),Pe=Te>.05&&!Wt.seated&&!Jt;if(Pe){const Ue=gt.has("ShiftLeft")||gt.has("ShiftRight")?7.2:4.5,Ct=gn?Math.min(Te,T*Ue):T*Ue,An=ee.position.x+Y/Te*Ct,Yr=ee.position.z+ye/Te*Ct;if(gn)if(Ur(ee.position,{x:An,z:Yr},I))ee.position.x=An,ee.position.z=Yr;else{const vu=un==="guide";xe(),vu&&(Ve.blocked=!0,Ve.lastPlan=It)}else I(An,ee.position.z)||(ee.position.x=An),I(ee.position.x,Yr)||(ee.position.z=Yr);ee.rotation.y=Math.atan2(Y,ye)}Ve.goal&&!Ve.following&&It-Ve.lastPlan>=1&&(!Ve.anchor||Math.hypot(ee.position.x-Ve.anchor.x,ee.position.z-Ve.anchor.z)>1.1||Ve.blocked)&&V(),It-$r>.3&&q(),(_n>0||sn>0)&&(sn-=14*T,_n=Math.max(0,_n+sn*T),_n===0&&(sn=0)),ee.position.y=Wt.seated?-.35:_n+(!e&&Pe?Math.sin(It*14)*.025:0),ee.userData.legs.forEach((Ue,Ct)=>Ue.rotation.x=Wt.seated?-1.3:!e&&Pe?Math.sin(It*10+Ct*Math.PI)*.5:0),ee.userData.arms.forEach((Ue,Ct)=>Ue.rotation.x=Wt.seated?-.35:!e&&Pe?Math.sin(It*10+Ct*Math.PI+Math.PI)*.3:0),pe.position.set(ee.position.x,.1,ee.position.z);for(let Ue=0;Ue<Xe.length;Ue++){const Ct=Xe[Ue];Ct.mesh.visible&&Math.hypot(ee.position.x-Ct.x,ee.position.z-Ct.z)<.95&&(Ct.mesh.visible=!1,r(Ue))}t(ee.position.x,ee.position.z,T)}if(Tn||(Re.update(T,e),Se.forEach((U,G)=>{if(U.type==="duck"){U.g.position.set(-17+Math.cos(It*.13+G*2)*3,.08,13+Math.sin(It*.13+G*2)*2),U.g.rotation.y=-(It*.13+G*2);return}const Y=Wt.following===G,ye=Y?ee.position:Wt.waterFilled&&G===1?{x:-8.5,z:8}:null;let Te=U.speed;if(ye){const Ct=ye.x-U.g.position.x,An=ye.z-U.g.position.z;U.angle=Math.atan2(Ct,An),Te=Math.hypot(Ct,An)>(Y?1.7:.6)?Y?3.2:1:0}else U.turn-=T,U.turn<=0&&(U.angle+=(o()-.5)*2.4,U.turn=2+o()*4);const Pe=U.g.position.x+Math.sin(U.angle)*T*Te,Ue=U.g.position.z+Math.cos(U.angle)*T*Te;I(Pe,Ue)?U.angle+=Math.PI*.7:(U.g.position.x=Pe,U.g.position.z=Ue),U.g.rotation.y=U.angle,!e&&U.g.userData.legs&&U.g.userData.legs.forEach((Ct,An)=>Ct.rotation.x=Math.sin(It*7+An%2*Math.PI)*.35),e||(U.g.position.y=U.type==="rabbit"?Math.abs(Math.sin(It*4+G))*.07:Math.abs(Math.sin(It*5+G))*.015)}),e||Xe.forEach((U,G)=>{U.mesh.position.y=1.1+Math.sin(It*1.3+G)*.12})),rn&&Jt)De.set(-17,.6,13),l.position.set(-9,3.7,18.5),l.lookAt(De);else if(rn){const U=new B(ee.position.x,1,ee.position.z);De.lerp(U,e?1:1-Math.exp(-T*5));const G=Qt.clone().multiplyScalar(innerWidth<600?1.2:1);l.position.copy(De).add(G),l.lookAt(De)}else{const U=innerWidth<600;De.set(U?0:7,1,U?-7:-2),l.position.set(U?35:38,U?25:27,U?39:38),l.lookAt(De)}ze.value=rn&&!Jt?1:0,_e.value.copy(ee.position).y+=1,D&&u.render(c,l)}let Xt=performance.now();function ci(T){const D=Math.min((T-Xt)/1e3,.05);Xt=T,Xi||Nn(D),requestAnimationFrame(ci)}return requestAnimationFrame(ci),window.addEventListener("resize",()=>{l.aspect=innerWidth/innerHeight,l.updateProjectionMatrix(),u.setSize(innerWidth,innerHeight)}),u.domElement.addEventListener("webglcontextlost",T=>{T.preventDefault(),Tt(!0),n.dispatchEvent(new CustomEvent("worldlost"))}),Nn(0),{hideRelay(){ut.sync({})},setActive:wt,setPaused:Tt,jump:Ie,guideTo:he,followGuide:Ae,stopGuide:xe,guidance:Me,setJoystick(T,D){Nt={x:T,z:D},(T||D)&&xe()},setPlayer(T,D){Wt.seated&&je(),Jt=!1,xe(),_n=sn=0,ee.position.set(T,0,D),De.set(T,1,D),Ve.goal&&V()},getPlayer:()=>({x:ee.position.x,z:ee.position.z,y:_n}),animals:()=>Se.map((T,D)=>({id:D,type:T.type,x:+T.g.position.x.toFixed(1),z:+T.g.position.z.toFixed(1),following:Wt.following===D,observed:Wt.animalNotes.includes(D)})),setEnvironment:ft,observe(T){Jt=T,xe(),gt.clear(),Nt={x:0,z:0}},isObserving:()=>Jt,environmentAnimation:()=>Re.animation,performance:()=>({drawCalls:u.info.render.calls,triangles:u.info.render.triangles,pixelRatio:u.getPixelRatio()}),project(T,D,U){const G=new B(T,D,U).project(l);return{x:(G.x+1)/2*innerWidth,y:(1-G.y)/2*innerHeight,visible:G.z<1&&Math.abs(G.x)<1&&Math.abs(G.y)<1}},setProgress(T){ut.sync(T),Xe.forEach((D,U)=>D.mesh.visible=!T.collected.includes(U)),se.forEach((D,U)=>D.marker.visible=!T.relay&&!T.seals.includes(Ze[U].id));for(const[D,U]of $e)U.visible=!T.relay&&!(T.items||[]).includes(D);J.forEach((D,U)=>{const G=T.seals.includes(Ze[U].id);D.screen.material=v(G?"#91aa8b":"#a4784e",!0),D.light.intensity=G?12:0}),Ye.forEach((D,U)=>D.material=v(T.seals.length>U?"#a7c1a0":"#9f684f",!0)),Ee.forEach((D,U)=>D.rotation.y=T.seals.length===3?U===0?-1.35:1.35:0),Le.intensity=T.seals.length===3?10:0},advanceTime(T){Xi=!0;for(let D=0;D<Math.min(T,6e4);D+=1e3/60)Nn(1/60,!1);u.render(c,l)},resumeRealtime(){Xi=!1,Xt=performance.now()},blocked:I,dispose(){u.dispose()}}}const j=n=>document.getElementById(n),Ne=n=>String(n??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),ax=matchMedia("(prefers-reduced-motion: reduce)").matches,ri={get(n){try{return localStorage.getItem(n)}catch{return null}},set(n,e){try{return localStorage.setItem(n,e),!0}catch{return!1}}},Yo="prepx-afterbell-draft-v1",jo="prepx-afterbell-pending-v1";function Ko(){try{const n=JSON.parse(ri.get(jo)||"[]");return Array.isArray(n)?n:[]}catch{return[]}}function ox(n){const e=Ko().filter(t=>t.id!==n.id);return e.push(n),ri.set(jo,JSON.stringify(e))}async function ru(n){try{const e=await fetch("/api/afterbell/attempts",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n),signal:AbortSignal.timeout(6e3)});return!e.ok||(await e.json()).saved!==!0?!1:(ri.set(jo,JSON.stringify(Ko().filter(i=>i.id!==n.id))),!0)}catch{return!1}}async function su(){for(const n of Ko())await ru(n)&&ht==="complete"&&(F==null?void 0:F.attemptId)===n.id&&j("save-status")&&(j("save-status").textContent="✓ התוצאה נשמרה בהיסטוריית המשחק.")}window.addEventListener("online",su);let Ft=null,bi="",Ts=0,Zo=0,fn=null,Gt=0,ki=null,Fs="",To=!1,au=!1,Kt=Ws.quizzes[0],F=null,ht="menu",Jn=null,Ao="snapshot",In=null,xl=null,Qn=null,or=!1,On=null,oe=null,Da=0,wo=null,As=null,gl=0;const Ti=j("dialog"),Vr=j("quiz");Vr.innerHTML=Object.entries({hebrew:"עברית",physics:"פיזיקה"}).map(([n,e])=>`<optgroup label="${e}">${Ws.quizzes.filter(t=>t.subject_id===n).map(t=>`<option value="${Ne(t.id)}">${e} · ${Ne(t.title)}</option>`).join("")}</optgroup>`).join("");const _l=new URLSearchParams(location.search).get("quiz");Ws.quizzes.some(n=>n.id===_l)&&(Vr.value=_l);j("player-name").value=ri.get("prepx-afterbell-name")||"";function Zt(n){j("toast").textContent=n,j("toast").classList.add("visible"),clearTimeout(xl),xl=setTimeout(()=>j("toast").classList.remove("visible"),3300)}function pn(n=!0){if(or)try{On??(On=new AudioContext),On.resume();const e=On.createOscillator(),t=On.createGain();e.connect(t),t.connect(On.destination),e.type="sine",e.frequency.setValueAtTime(n?520:270,On.currentTime),e.frequency.exponentialRampToValueAtTime(n?780:220,On.currentTime+.12),t.gain.setValueAtTime(.035,On.currentTime),t.gain.exponentialRampToValueAtTime(.001,On.currentTime+.25),e.start(),e.stop(On.currentTime+.26)}catch{}}function En(){if(F)try{sessionStorage.setItem(Yo,JSON.stringify(F)),To=!0}catch{To=!1}}function ou(){try{return sessionStorage.getItem(Yo)}catch{return null}}function vl(){try{sessionStorage.removeItem(Yo)}catch{}}function cu(){const n=El(ou(),Kt);j("resume").classList.toggle("hidden",!n)}async function lu(){const n=++gl,e=Vr.value;j("start").disabled=!0,j("relay-start").disabled=!0,j("resume").disabled=!0,j("source-status").textContent="מתחברים לשאלות של PrepX…";let t=Ws.quizzes.find(r=>r.id===e),i="snapshot";try{const r=await fetch(`/api/afterbell/quizzes/${e}`,{signal:AbortSignal.timeout(3500)});if(r.ok){const s=await r.json();s.id===e&&Ml(s)&&(t=s,i="database")}}catch{}n===gl&&(Kt=t,Ao=i,j("source-status").textContent=Ao==="database"?`● ${Kt.questions.length} שאלות מחוברות למאגר PrepX`:`מצב לא מקוון · ${Kt.questions.length} שאלות מעותק מאגר PrepX`,j("start").disabled=!oe,j("relay-start").disabled=!oe,j("resume").disabled=!oe,cu())}Vr.addEventListener("change",()=>{const n=new URL(location.href);n.searchParams.set("quiz",Vr.value),history.replaceState(null,"",n),lu()});function Et(){clearTimeout(In),In=null,Qn=null,Ti.open&&Ti.close(),ht!=="menu"&&ht!=="complete"&&(ht="explore",Jn=null,oe==null||oe.setPaused(!1)),ht==="menu"&&(oe==null||oe.setPaused(!1)),As==null||As.focus()}function Rt(n,e,t){t!=="question"&&t!=="feedback"&&(Jn=null),clearTimeout(In),Qn=null,As=document.activeElement,ht=t,oe==null||oe.setPaused(!0),j("dialog-eyebrow").textContent=n,j("dialog-body").innerHTML=e,Ti.open||Ti.showModal(),j("dialog-body").scrollTop=0,j("close-dialog").focus(),hx(),gu()}j("close-dialog").addEventListener("click",()=>{ht==="complete"?Xs():Et()});Ti.addEventListener("cancel",n=>{n.preventDefault(),ht==="complete"?Xs():Et()});function Jo(n=!1,e=!1){if(!oe)return;const t=j("player-name").value.trim();if(!t){j("player-name").setCustomValidity("רק שם או כינוי, ומתחילים."),j("player-name").reportValidity(),j("player-name").focus();return}if(j("player-name").setCustomValidity(""),ri.set("prepx-afterbell-name",t),F=n?El(ou(),Kt):null,F??(F=Au(Kt)),e&&(F.relay=Mu(Number(ri.get("afterbell-last-relay")??-1)),ri.set("afterbell-last-relay",String(F.relay.edition))),Ft=null,Gt=null,bi="",Zo=Ts=F.elapsed,document.querySelector(".quest-panel .eyebrow").textContent=F.relay?Oi[F.relay.edition].title:"מערכות הקמפוס",Fs=F.participantName||t,F.participantName=Fs,wo=null,ht="explore",j("welcome").classList.add("hidden"),j("hud").classList.remove("hidden"),j("pause").classList.remove("hidden"),document.body.classList.add("playing"),oe.setPlayer(F.player.x,F.player.z),oe.setActive(!0),oe.setPaused(!1),oe.setProgress(F),F.environment=Xr(F.environment),oe.setEnvironment(F.environment,{animate:!1}),oe.resumeRealtime(),xn(),En(),j("world-labels").innerHTML=Ze.map(i=>`<span class="world-label" id="label-${i.id}"><b>${Ze.indexOf(i)+1}</b>${Ne(i.name)}</span>`).join("")+Ht.map(i=>`<span class="world-label equipment-label" id="label-${i.id}">▣ ${Ne(i.short)}</span>`).join("")+'<span class="world-label" id="label-exit">שער היציאה</span><span class="world-label environment-label" id="label-environment"></span>',Gt=Si(F,null,oe.getPlayer()).index??-1,ki=null,bi="",xn(),!n&&F.relay){const i=Oi[F.relay.edition];Rt("תיק שטח 02 · מסילת הכוכבים",`<h2 id="dialog-title">${i.title}</h2><p class="dialog-copy">${i.story}</p><p class="feedback-note">בחרו פנס בעזרת המספרים במפה. אפשר להגיע לבד או עם ״ללכת איתי״. בכל פנס מחכים אתגר שטח ושאלות מתוך ${Ne(Kt.title)}. אין מגבלת זמן.</p><button id="begin-adventure" class="primary">יוצאים בעקבות האור ←</button>`,"tutorial"),j("begin-adventure").onclick=()=>{Et(),Hr()}}else n||(Rt("תדריך · ז׳ איינשטיין",'<h2 id="dialog-title">החשמל נפל. השער נשאר נעול.</h2><p class="school-name">בית הספר שי עגנון · כיתת הייטק</p><p class="dialog-copy">נשארתם אחרי ההאקתון. שלוש תחנות הפרויקט כבו, וביער מסתובב שועל שלא מצא את הדרך החוצה. הצוות שלכם עדיין במתחם.</p><ol class="tutorial-steps"><li>המשימה הקרובה כבר מסומנת. הולכים בעקבות הנקודות המוארות ומקשיבים לאיש הצוות.</li><li>מאתרים את הציוד החסר ומפעילים את בדיקת השטח שלו: קוד, חיבורים או כיוון אות.</li><li>משלימים את שאלות התרגול בכל תחנה, מפעילים את שלוש המערכות ויוצאים בשער הצפוני.</li></ol><p class="feedback-note">אפשר לחקור בכל סדר. ״ללכת איתי״ מוביל אתכם ליעד; ״צריך רמז?״ מסביר מה עושים. משימות הצד מוסיפות אתגרים בדרך. אין לחץ זמן.</p><button id="begin-adventure" class="primary">יוצאים לבדוק את המתחם ←</button>',"tutorial"),j("begin-adventure").onclick=()=>{Et(),Hr(),Zt("המשימה הראשונה מסומנת למעלה. עקבו אחרי הנקודות המוארות, או לחצו על ״ללכת איתי״.")})}j("player-name").addEventListener("input",()=>{j("player-name").setCustomValidity("")});j("relay-start").addEventListener("click",()=>Jo(!1,!0));j("start").addEventListener("click",()=>Jo());j("resume").addEventListener("click",()=>Jo(!0));function Xs(){Et(),ht="menu",oe.hideRelay(),oe.setActive(!1),oe.setPaused(!1),oe.resumeRealtime(),j("welcome").classList.remove("hidden"),j("hud").classList.add("hidden"),j("pause").classList.add("hidden"),document.body.classList.remove("playing"),cu()}function Qo(){if(!F||!oe)return null;const n=oe.getPlayer();if(oe.isObserving())return{type:"observation",d:0};if(F.environment.seated)return{type:"environment",id:"bench",d:0};const e=Mn.find(r=>r.id===Ft);if(e){const r=Math.hypot(n.x-e.x,n.z-e.z);if(r<e.range)return{type:"environment",id:e.id,d:r}}let t=null;if(F.relay)for(let r=0;r<3;r++){const s=Ot(F.relay,r),a=Math.hypot(n.x-s.x,n.z-s.z);if(a<2.8&&!F.seals.includes(Ze[r].id)&&(t={type:"relay",i:r,d:a}),s.task==="sparks")for(const o of Ns(s)){if(F.relay.steps[r]&1<<o.bit)continue;const c=Math.hypot(n.x-o.x,n.z-o.z);c<1.95&&(!t||t.type!=="spark"||c<t.d)&&(t={type:"spark",i:r,bit:o.bit,d:c})}}else Ze.forEach((r,s)=>{const a=Math.hypot(n.x-r.x,n.z-r.z);a<3.5&&(!t||a<t.d)&&(t={type:"npc",i:s,d:a})}),Ht.forEach((r,s)=>{if(F.items.includes(r.id))return;const a=Math.hypot(n.x-r.x,n.z-r.z);a<2.8&&(!t||a<t.d)&&(t={type:"equipment",i:s,d:a})});const i=Math.hypot(n.x-hr.x,n.z-hr.z);return i<3.5&&(!t||i<t.d)&&(t={type:"exit",d:i}),t||(Mn.forEach(r=>{const s=Math.hypot(n.x-r.x,n.z-r.z);s<r.range&&(!t||s<t.d)&&(t={type:"environment",id:r.id,d:s})}),oe.animals().forEach(r=>{if(r.type==="duck")return;const s=Math.hypot(n.x-r.x,n.z-r.z);s<2.4&&(!t||s<t.d-.8)&&(t={type:"animal",id:r.id,d:s})}),t)}function ec(){if(ht!=="explore")return;const n=Qo();if(n){if(n.type==="relay"||n.type==="spark"){_u(n);return}if(n.type==="observation"){oe.observe(!1),Hr();return}if(n.type==="environment"){Co(n.id);return}if(n.type==="animal"){ux(n.id);return}n.type==="exit"?ti(F)?gx():Zt(F.relay?`נותרו ${3-F.seals.length} פנסים להדלקה. בחרו פנס במפה.`:`עוד ${3-F.seals.length} מערכות צריכות לחזור לפעולה. בחרו תחנה במפה.`):n.type==="equipment"?lx(n.i):uu(n.i)}}j("interact").addEventListener("click",ec);const cx=["נ","א","א"];function Gr(n){const e=Ze[n];return`<div class="character-chip"><div class="portrait" aria-hidden="true">${cx[n]}</div><div><h2 id="dialog-title">${Ne(e.name)}</h2><small>${Ne(e.role)}</small></div></div><button class="text-button npc-chat" data-npc-chat="${n}">לשוחח ולעזור לצוות ↗</button>`}function uu(n){const e=Ze[n];if(yn(F,n),F.seals.includes(e.id)){Rt("חברים לדרך",Gr(n)+`<p class="dialog-copy">${n===0?"מסוף הגישה פעיל. רשמתי את התקלה. עכשיו רק צריך להסביר למורה למה התאריך בדוח הוא מחר.":n===1?"מערכת הגיבוי פועלת. פעם הבאה נבדוק אותה לפני שכולם הולכים הביתה. רעיון מהפכני.":"הקשר חזר. אם תשמעו רעש מהיער — הפעם אני הולך לבדוק. עם פנס. ועם מישהו."}</p><button id="back-world" class="primary">ממשיכים לחקור ←</button>`,"dialogue"),j("back-world").onclick=Et;return}if(F.understood.includes(e.id)){F.items.includes(Ht[n].id)?Ni(n):Ro(n);return}const t=Ua(e.choices.map((i,r)=>({text:i,original:r})));Rt("לפני שפותרים, מקשיבים",Gr(n)+`<p class="dialog-copy">${Ne(e.line)}</p><div class="options">${t.map(i=>`<button class="option social" data-choice="${i.original}">${Ne(i.text)}</button>`).join("")}</div><p id="social-feedback" class="feedback-note" role="status"></p>`,"dialogue"),document.querySelectorAll(".social").forEach(i=>i.onclick=()=>{if(Number(i.dataset.choice)!==e.need){j("social-feedback").textContent=e.wrong,pn(!1);return}F.understood.push(e.id),En(),pn(),Ro(n)})}function Ro(n){const e=Ze[n],t=Ht[n],i=F.items.includes(t.id);Rt(`תחנה ${n+1} · ${e.system}`,Gr(n)+`<p class="dialog-copy">${Ne(e.reply)}</p><div class="journal-entry"><h3>${i?"✓ הציוד איתכם":`נדרש: ${Ne(t.name)}`}</h3><p>${Ne(i?t.report:t.hint)}</p></div><p class="feedback-note">${yn(F,n).total} שאלות מהתרגול הנבחר מפעילות את בדיקת התחנה. ציון הלימוד נפרד מהציוד ומהחקירה.</p><button class="primary" id="${i?"begin-questions":"track-equipment"}">${i?"מפעילים את מסוף התרגול":"סימון הציוד במפה"} ←</button>`,"mission"),i?j("begin-questions").onclick=()=>Ni(n):j("track-equipment").onclick=()=>{Gt=n,ki=t.id,Et(),xn(),Zt(t.hint)}}function lx(n){const e=Ht[n],t=Tl[e.id],i=F.environment.checkedEquipment.includes(e.id);fn={id:e.id,step:0,channel:1},Rt("ממצא בשטח · בדיקת ציוד",`<h2 id="dialog-title">${Ne(e.name)}</h2><p class="dialog-copy">${Ne(e.clue)}</p><section class="field-check"><h3>${Ne(t.title)}</h3><p>${Ne(t.hint)}</p><div id="field-controls">${i?"":e.id==="antenna"?'<label for="radio-channel">ערוץ הקשר</label><div class="tuner"><button class="secondary" id="channel-down" aria-label="ערוץ קודם">−</button><output id="radio-channel">1</output><button class="secondary" id="channel-up" aria-label="ערוץ הבא">+</button></div><meter id="signal-meter" min="0" max="5" value="1">עוצמת אות</meter><button class="secondary" id="test-signal">בדיקת האות</button>':`<div class="field-options">${t.options.map((s,a)=>`<button class="secondary" data-operation="${a}">${Ne(s)}</button>`).join("")}</div>`}</div><p id="field-status" role="status">${i?"✓ הבדיקה הושלמה. אפשר לקחת את הציוד.":"בצעו את הבדיקה כדי לשחרר את הציוד. אין לחץ זמן."}</p></section><button class="primary" id="collect-equipment" ${i?"":"disabled"}>לקחת ולהמשיך ←</button>`,"equipment");function r(){F.environment.checkedEquipment.push(e.id),En(),j("field-status").textContent="✓ הבדיקה הצליחה. הציוד מוכן — קחו אותו וחזרו לצוות.",j("field-controls").innerHTML='<div class="field-success">✓ הציוד מגיב</div>',j("collect-equipment").disabled=!1,pn()}if(document.querySelectorAll("[data-operation]").forEach(s=>s.onclick=()=>{const a=fn.step;if(!Cu(e.id,a,Number(s.dataset.operation))){fn.step=0,document.querySelectorAll("[data-operation]").forEach(o=>o.classList.remove("operation-done")),j("field-status").textContent="הסדר עדיין לא מתאים. הרמז נשאר למעלה — מנסים שוב מההתחלה.",pn(!1);return}s.classList.add("operation-done"),fn.step++,j("field-status").textContent=`✓ שלב ${fn.step} מתוך 3`,pn(),fn.step===3&&r()}),!i&&e.id==="antenna"){const s=a=>{fn.channel=Math.max(1,Math.min(7,fn.channel+a)),j("radio-channel").textContent=fn.channel,j("signal-meter").value=5-Math.abs(5-fn.channel),j("field-status").textContent=fn.channel===5?"האות יציב. לחצו על בדיקת האות.":"עדיין יש רעש. בדקו את הערוץ המסומן במחברת."};j("channel-down").onclick=()=>s(-1),j("channel-up").onclick=()=>s(1),j("test-signal").onclick=()=>{fn.channel===5?r():(j("field-status").textContent="הערוץ לא מתאים. במחברת מסומן 5.",pn(!1))}}j("collect-equipment").onclick=()=>{F.environment.checkedEquipment.includes(e.id)&&(F.items.includes(e.id)||F.items.push(e.id),Gt=e.npc,ki=null,Ft=null,En(),oe.setProgress(F),Et(),xn(),pn(),Zt(e.report))}}function Yt(n={},e){F&&(Object.assign(F.environment,n),e&&!F.environment.visited.includes(e)&&F.environment.visited.push(e),oe.setEnvironment(F.environment),En(),xn(),Hr())}function Ia(n){const e=oe.getPlayer();return Math.hypot(e.x-n.x,e.z-n.z)<n.range+.1}function Co(n){const e=Mn.find(r=>r.id===n);if(!e||!Ia(e))return;const t=F.environment;if(n==="solar"){Rt("מנגנון מקומי · חקירה חופשית",`<h2 id="dialog-title">${Ne(e.name)}</h2><p class="dialog-copy">${Ne(e.description)}</p><div class="environment-switches">${["ירח","שמש","עץ"].map((r,s)=>`<button class="secondary env-switch" data-env-switch="${s}" aria-pressed="${t.switches[s]}"><span>${r}</span><b>${t.switches[s]?"פועל":"כבוי"}</b></button>`).join("")}</div><p id="env-puzzle-status" class="feedback" role="status">${Os(t)?"התאורה פועלת. שלושה פנסי שביל נדלקו.":"ההערה על המכסה: ירח ועץ פועלים, שמש כבויה."}</p><button id="env-leave" class="primary">חזרה לשביל ←</button>`,"environment"),document.querySelectorAll("[data-env-switch]").forEach(r=>r.onclick=()=>{if(!Ia(e))return;const s=[...F.environment.switches];s[Number(r.dataset.envSwitch)]=!s[Number(r.dataset.envSwitch)],Yt({switches:s},n),Co(n)}),j("env-leave").onclick=Et;return}const i=n==="locker"&&t.lockerOpen?"הפתק בארונית: ״אדם השאיר את האנטנה ליד עמדת הקשר הישנה בדרום־מערב. אם אתם מחזירים, באמת תחזירו.״":e.description;Rt("חקירה חופשית · ללא ציון",`<div class="environment-heading"><span class="environment-category">${Ne(zs(e,t))}</span><h2 id="dialog-title">${Ne(e.name)}</h2></div><p class="dialog-copy">${Ne(i)}</p><p class="feedback-note">פעולה בקמפוס. אינה מוסיפה שאלות ואינה משנה את ציון התרגול.</p><button id="env-primary" class="primary" data-environment="${n}">${Ne(bl(e,t))} ←</button>`,"environment"),j("env-primary").onclick=()=>{if(!Ia(e))return;const r=F.environment;let s="";if(n==="bench"&&(Yt({seated:!r.seated},n),s=r.seated?"אפשר להישאר רגע. כדי לקום: תנועה או כפתור הפעולה.":"חוזרים לשטח."),n==="door"){const a=oe.getPlayer();if(r.doorOpen&&Math.abs(a.x+2)<1.6&&Math.abs(a.z+16.86)<.75){Zt("זוזו מעט מפתח הדלת לפני שסוגרים אותה.");return}Yt({doorOpen:!r.doorOpen},n),s=r.doorOpen?"הדלת נפתחה. אפשר להיכנס למבואה.":"דלת המבואה נסגרה."}if(n==="lamp"&&(Yt({lampOn:!r.lampOn},n),s=r.lampOn?"הרחבה מוארת שוב.":"הפנס כובה. פנס היד שלכם עדיין פועל."),n==="basketball"){if(oe.environmentAnimation().basketballInFlight){Zt("הכדור בדרך חזרה. עוד רגע.");return}Yt({shots:r.shots+1},n),s=`קליעה ${r.shots}. הכדור חוזר לעמדה.`}if(n==="locker"){if(Yt({lockerOpen:!r.lockerOpen},n),r.lockerOpen){Co(n);return}s="הארונית סגורה. הרמז נשאר ביומן."}n==="noticeboard"&&(Yt({},n),s="שלושת מיקומי הציוד תועדו ביומן. גם כתב היד החשוד."),n==="telescope"&&(Yt({observations:r.observations+1},n),oe.observe(!0),s="תצפית באגם. לחצו על סיום התצפית כדי לחזור."),n==="water"&&(Yt({waterFilled:!0},n),s="הקערה מלאה. ארנב מהחצר מתקרב בקצב שלו."),n==="planter"&&(Yt({watered:!0},n),s="העלים התרוממו. התברר שהפתרון היה מים."),n==="recycling"&&(Yt({recycled:!0},n),s="שלוש פחיות הגיעו למחזור. עכשיו נשאר לסדר את תיקיית הפרויקט."),n==="bike"&&(Yt({bells:r.bells+1},n),pn(),s="הפעמון מצלצל. בדיקת החומרה הסתיימה."),Et(),Zt(s)}}const du={fox:"שועל",rabbit:"ארנב",bird:"ציפור",duck:"ברווז"};function ux(n){const e=oe.animals().find(i=>i.id===n);if(!e)return;const t=oe.getPlayer();Math.hypot(t.x-e.x,t.z-e.z)>2.8||(Yt({animalNotes:[...new Set([...F.environment.animalNotes,n])]}),Rt("יומן טבע · הקמפוס אחרי הלימודים",`<h2 id="dialog-title">${du[e.type]} בשטח</h2><p class="dialog-copy">${e.type==="fox"?"הוא עוצר, מקשיב, וממשיך. נראה שיש לו תוכנית טובה משלנו. אפשר לתת לו ללכת לידכם בקצב שלו.":e.type==="rabbit"?"האוזניים זזות לפני כל השאר. התצפית נשמרה ביומן; אין צורך להתקרב יותר.":e.type==="duck"?"שלושה ברווזים ממשיכים בסיור באגם. כנראה הם לא קיבלו את הודעת הביטול.":"הציפור כבר מכירה את כל הקמפוס. היא לא מתרשמת במיוחד מכיתת ההייטק."}</p>${e.type!=="duck"?`<button id="animal-follow" class="primary">${e.following?"לתת לו להמשיך בדרכו":"ללכת יחד קצת"} ←</button>`:""}<button id="animal-leave" class="secondary">להמשיך לחקור</button>`,"environment"),j("animal-follow")&&(j("animal-follow").onclick=()=>{Yt({following:F.environment.following===n?null:n}),Et(),Zt(F.environment.following===n?"חבר חדש הולך לידכם. אפשר להיפרד דרך אותה פעולת מפגש.":"הוא חוזר לסיבוב שלו בקמפוס.")}),j("animal-leave").onclick=Et)}function dx(n){const e=Ze[n],t=F.environment.helped.includes(e.id),i=[["היומן של נועה מלא בדיקות קטנות. ״כשכל אחד משנה דבר אחר, מתקבלים שלושה באגים ודיון ארוך. נתחיל בעובדות.״","היא מראה את הכיוון של הספרייה: ״כרטיס הצוות נשאר על שולחן העבודה ממערב. תיקי הפרויקט משום מה מסודרים פחות מהקוד.״"],["איתי מצביע על החממה. ״הרובוט היה אמור להשקות. כרגע הוא בעיקר מתעניין בלהיות כבוי.״","״יחידת הגיבוי נמצאת בארגז שממזרח למעבדה. מי שהניח אותה שם קרא לזה פתרון זמני. זה היה בשבוע שעבר.״"],["״הרעש היה מהאגם. בדקתי. ברווז. לא צריך לציין את זה בסיכום ההאקתון.״","״האנטנה נשארה בדרום־מערב. אם נלך יחד לשם, אני אבדוק את השביל ואתם תבדקו שאין עוד ברווז מפתיע.״"]][n];Rt("שיחה עם הצוות",Gr(n)+`<div class="options"><button class="secondary" data-chat-topic="0">איך הולך בינתיים?</button><button class="secondary" data-chat-topic="1">יש עוד רמז לציוד?</button><button id="npc-help" class="primary">${t?"כבר עזרנו · לבדוק מה השתנה":["לעזור לסדר את הבדיקות","לעזור להניח את הבקר","לבדוק יחד את כיוון הרעש"][n]} ←</button></div><p id="npc-chat-reply" class="dialog-copy" role="status"></p><button id="npc-back" class="text-button">בחזרה למשימת התחנה ←</button>`,"conversation"),document.querySelectorAll("[data-chat-topic]").forEach(r=>r.onclick=()=>{j("npc-chat-reply").textContent=i[Number(r.dataset.chatTopic)]}),j("npc-help").onclick=()=>{Yt({helped:[...new Set([...F.environment.helped,e.id])]}),j("npc-chat-reply").textContent=["נועה מסמנת בדיקה אחת ברשימה ומרימה יד בתודה. ״מדהים, אפשר לפתור דברים בלי ישיבה של שעה.״","איתי מניח את הבקר על העמדה. ״עכשיו יש לי יד פנויה. בשביל להצביע על התקלה הבאה.״","אדם מסמן את כיוון האגם. ״תודה שבדקתם איתי. מוכן להחזיר את הקשר.״"][n],j("npc-help").textContent="העזרה תועדה ביומן"},j("npc-back").onclick=()=>uu(n)}function hx(){document.querySelectorAll("[data-npc-chat]").forEach(n=>n.onclick=()=>dx(Number(n.dataset.npcChat)))}function hu(n){const e=Kt.references.find(i=>i.id===n.ref.id);if(!e)return"";let t;try{if(t=new URL(e.url||"subject.html?subject="+Kt.subject_id,"https://hitech.agnon.online/"),!["https:","http:"].includes(t.protocol))return""}catch{return""}return`<a class="reference" target="_blank" rel="noopener noreferrer" href="${Ne(t.href)}">מקור: ${Ne(e.title)}${n.ref.part?" · "+Ne(n.ref.part):""} ↗</a>`}function Ni(n){if(!F.relay&&!F.items.includes(Ht[n].id)){Ro(n);return}const e=yn(F,n);if(!e.next){px(n);return}const t=F.questions.find(i=>i.id===e.next);Jn=t,Rt(F.relay?Ot(F.relay,n).title:`${Ze[n].name} · ${Ze[n].system}`,`<div class="question-meta"><span>${Ne(Kt.title)}</span><span>שאלה ${Object.keys(F.answers).length+1} מתוך ${F.questions.length}</span></div><div class="progress-line"><i style="width:${Object.keys(F.answers).length/F.questions.length*100}%"></i></div><h2 id="dialog-title">${Ne(t.prompt)}</h2>${hu(t)}${F.relay?"":`<button class="text-button npc-chat" data-npc-chat="${n}">רגע לשיחה עם ${Ne(Ze[n].name)} ↗</button>`}<div class="options" id="answer-options">${t.options.map((i,r)=>`<button class="option answer" data-choice="${i.original}"><span class="number">${r+1}</span><span>${Ne(i.text)}</span></button>`).join("")}</div><div id="answer-feedback" aria-live="polite"></div>`,"question"),Jn=t,document.querySelectorAll(".answer").forEach(i=>i.onclick=()=>fx(t,Number(i.dataset.choice),n))}function fx(n,e,t){const i=wu(F,n.id,e);i&&(ht="feedback",En(),xn(),pn(i.correct),document.querySelectorAll(".answer").forEach(r=>{r.disabled=!0;const s=Number(r.dataset.choice);s===n.correct&&r.classList.add("correct"),s===e&&r.classList.add("selected",i.correct?"correct":"wrong")}),j("answer-feedback").innerHTML=`<div class="feedback"><strong>${i.correct?"✓ תשובה נכונה.":"↺ לא הפעם. הנה ההסבר."}</strong><p>${Ne(n.explanation.he)}</p>${n.explanation.en?`<p class="english" lang="en" dir="ltr">${Ne(n.explanation.en)}</p>`:""}</div><button class="text-button" id="hold-feedback">להשהות ולקרוא את ההסבר</button><p class="feedback-note">התשובה נעולה. ההסבר נשאר גם ביומן.</p>`,Qn=()=>Ni(t),In=setTimeout(()=>{Qn=null,Ni(t)},1500),j("hold-feedback").onclick=()=>{clearTimeout(In),In=null,Qn=null,j("hold-feedback").textContent="חזרה להמשך אוטומטי",j("hold-feedback").onclick=()=>{Qn=()=>Ni(t),In=setTimeout(Qn,1500),j("hold-feedback").disabled=!0}})}function px(n){if(!(F.relay?Mi(F.relay,n):F.items.includes(Ht[n].id)&&F.understood.includes(Ze[n].id))||yn(F,n).next)return;const t=Ze[n];if(F.seals.includes(t.id)||F.seals.push(t.id),Gt=Si(F,null,oe.getPlayer()).index??-1,ki=null,Ft=null,En(),oe.setProgress(F),xn(),pn(),F.relay){Rt("פנס שמיים · "+F.seals.length+" מתוך 3",`<div class="relay-star" aria-hidden="true">✧</div><h2 id="dialog-title">${Ot(F.relay,n).name} מואר עכשיו</h2><p class="dialog-copy">${ti(F)?"קבוצת הכוכבים של הכיתה זורחת מעל השער הצפוני. בואו לראות אותה.":"קרן אור נוספת הצטרפה למופע. בחרו איזה פנס להדליק עכשיו."}</p><button id="continue-world" class="primary">חזרה לשטח ←</button>`,"reward"),j("continue-world").onclick=Et;return}Rt(`מערכת ${F.seals.length} מתוך 3 חזרה לפעולה`,Gr(n)+`<div class="score-big" style="font-size:52px">✓</div><h2 class="finish-title">${Ne(t.system)} — פעיל</h2><p class="dialog-copy">${ti(F)?"הגישה, הגיבוי והקשר פעילים. השער הצפוני נפתח. הגיע הזמן לצאת מהמתחם.":"התחנה מגיבה. אפשר להמשיך לכל אחת מהתחנות האחרות. המפה עודכנה."}</p><button id="continue-world" class="primary">${ti(F)?"לשער היציאה":"חזרה לשטח"} ←</button>`,"reward"),j("continue-world").onclick=Et}function xn(){F&&(j("seal-slots").innerHTML=Ze.map((n,e)=>`<button class="seal ${F.seals.includes(n.id)?"done":""} ${Gt===e?"selected":""}" data-npc="${e}" title="${Ne(F.relay?Ot(F.relay,e).title:n.name)}" aria-label="תחנה ${e+1}: ${Ne(F.relay?Ot(F.relay,e).title:n.name)}. ${F.seals.includes(n.id)?"הושלם":"הצגת הכיוון"}" aria-pressed="${Gt===e}">${F.seals.includes(n.id)?"✓":e+1}</button>`).join(""),document.querySelectorAll("[data-npc]").forEach(n=>n.onclick=()=>{Ft=null,Gt=Number(n.dataset.npc),ki=F.understood.includes(Ze[Gt].id)&&!F.items.includes(Ht[Gt].id)?Ht[Gt].id:null,xn()}),j("question-progress").innerHTML=`<bdi dir="ltr">${Object.keys(F.answers).length} / ${F.questions.length}</bdi> שאלות`,j("firefly-count").innerHTML=`✧ <bdi dir="ltr">${F.collected.length} / 12</bdi>`,j("objective").textContent=Si(F,Gt,oe.getPlayer()).title,j("environment-progress")&&(j("environment-progress").textContent=`${F.environment.visited.length}/12 תגליות`),j("quest-sub").textContent=Si(F,Gt,oe.getPlayer()).hint,$s())}function qs(){return Mn.find(n=>n.id===Ft)||Si(F,Gt,oe.getPlayer())}function $s(){var r,s,a;if(!F||!oe)return;const n=qs(),e=n.id,t=Si(F,Gt,oe.getPlayer());e!==bi&&(bi=e,(r=oe.guideTo)==null||r.call(oe,n.x,n.z),j("objective").textContent=Ft?`משימת שטח: ${n.name}`:t.title,j("quest-sub").textContent=Ft?((s=lr.find(o=>o.id===n.id))==null?void 0:s.hint)||n.description:t.hint,Ts=F.elapsed);const i=(a=oe.guidance)==null?void 0:a.call(oe);if(j("follow-path").textContent=i!=null&&i.following?"עצירת ההליכה":i!=null&&i.arrived?"הגעתם — לפעולה":"ללכת איתי",j("follow-path").disabled=ht!=="explore",Ft){const o=lr.find(c=>c.id===Ft);if(o!=null&&o.done(F.environment)){Ft=null,bi="",Zt("✓ משימת הצד הושלמה. חוזרים למסלול הראשי — אפשר לבחור עוד משימת צד.");return}}ht==="explore"&&F.elapsed-Zo>18&&F.elapsed-Ts>25&&(Ts=F.elapsed,Zt(`הצעד הבא: ${t.title}. כפתור ״ללכת איתי״ יוביל אתכם, או פתחו רמז.`))}j("follow-path").onclick=()=>{var e,t,i;if(ht!=="explore")return;const n=(e=oe.guidance)==null?void 0:e.call(oe);if(n!=null&&n.following){(t=oe.stopGuide)==null||t.call(oe);return}if(n!=null&&n.arrived){ec();return}(i=oe.followGuide)==null||i.call(oe),Zt("עוקבים אחרי השביל. תנועה בג׳ויסטיק או בחצים מחזירה לכם את השליטה.")};j("mission-hint").onclick=()=>{if(!F)return;const n=qs(),e=Si(F,Gt,oe.getPlayer());Rt("קשר צוות · הצעד הבא",`<h2 id="dialog-title">${Ne(Ft?n.name:e.title)}</h2><p class="dialog-copy">${Ne(Ft?n.description:e.hint)}</p><ol class="tutorial-steps"><li>הנקודות המוארות עוקפות עצים ומבנים ומובילות ליעד.</li><li>אפשר ללכת לבד או ללחוץ על ״ללכת איתי״. תנועה ידנית עוצרת את ההובלה.</li><li>כשמגיעים, לחצו על כפתור הפעולה הגדול. הוא אומר בדיוק מה אפשר לעשות.</li></ol><button id="hint-return" class="primary">הבנתי, ממשיכים לשטח ←</button><button id="hint-main" class="text-button">חזרה למשימה הראשית</button>`,"hint"),j("hint-return").onclick=Et,j("hint-main").onclick=()=>{Ft=null,bi="",Et(),xn()}};j("side-task").onclick=()=>{F&&(Rt("חקירה חופשית · אתגרי שטח",`<h2 id="dialog-title">עוד משהו לעשות בדרך</h2><p class="dialog-copy">${lr.filter(n=>n.done(F.environment)).length} מתוך ${lr.length} משימות צד הושלמו. בוחרים משימה והשביל מתעדכן. הציון הלימודי נשאר נפרד.</p>${lr.map(n=>`<button class="side-mission ${n.done(F.environment)?"side-done":""}" data-side-mission="${n.id}"><strong>${n.done(F.environment)?"✓ ":""}${Ne(n.title)}</strong><span>${Ne(n.hint)}</span><small>${n.done(F.environment)?"הושלם":"סימון מסלול ←"}</small></button>`).join("")}<button id="side-main" class="text-button">להמשיך במשימה הראשית ←</button>`,"sidequests"),document.querySelectorAll("[data-side-mission]").forEach(n=>n.onclick=()=>{Ft=n.dataset.sideMission,bi="",Et(),$s()}),j("side-main").onclick=()=>{Ft=null,bi="",Et(),xn()})};function Hr(){var c;if(!oe||!F||ht==="menu")return;const n=oe.getPlayer();if($s(),innerWidth<600){const l=document.querySelector(".quest-panel").getBoundingClientRect().bottom;j("map-toggle").style.top=l+12+"px",document.querySelector(".map-panel").style.top=l+66+"px"}else j("map-toggle").style.top="",document.querySelector(".map-panel").style.top="";j("minimap").innerHTML=`<path d="M0 25 L0 12 L-3 4 L0 -4 L0 -12 L7 -17 L7 -24 L0 -25 M-3 4 L-10 1 L-13 -9 M0 -4 L13 -7 M0 12 L10 14" fill="none" stroke="#719480" stroke-width="1.4"/><ellipse cx="-17" cy="13" rx="6.5" ry="5" fill="#467e86"/><rect x="-8" y="-23" width="12" height="6" fill="#718a78" rx="1"/>${Ze.map((l,u)=>{const d=F.relay?{...l,...Ot(F.relay,u)}:l;return`<circle cx="${d.x}" cy="${d.z}" r="2.2" fill="${F.seals.includes(d.id)?"#5f8270":d.color}"/><text x="${d.x}" y="${d.z+1}" font-size="3" text-anchor="middle" fill="#152d30">${F.seals.includes(d.id)?"✓":u+1}</text>`}).join("")}<path d="M-2 -26H2V-23H-2Z" fill="${ti(F)?"#daf69f":"#91a78d"}"/>${Ht.filter(l=>!F.items.includes(l.id)&&(ki===l.id||F.understood.includes(Ze[l.npc].id))).map(l=>`<rect x="${l.x-1.5}" y="${l.z-1.5}" width="3" height="3" fill="#d9b47d"/>`).join("")}${Mn.map(l=>`<circle cx="${l.x}" cy="${l.z}" r="${Ft===l.id?1.6:.7}" fill="${Ft===l.id?"#fff1c7":F.environment.visited.includes(l.id)?"#8ba994":"#b39e7a"}"/>`).join("")}<circle cx="${n.x}" cy="${n.z}" r="2.1" fill="#e8a169" stroke="#fff4cd" stroke-width=".7"/>`,j("location").textContent=n.z<-14?"ליד בית הספר":n.x<-10?"הספרייה והאגם":n.x>8&&n.z>5?"מגדל הפנס":n.x>8?"החממה":"קרחת היער";const e=qs(),t=oe.project(e.x,0,e.z),i=oe.project(n.x,0,n.z);j("compass").style.transform=`rotate(${Math.atan2(t.x-i.x,i.y-t.y)*180/Math.PI}deg)`,j("direction-text").textContent=`${e.name||e.title} · ${Math.round(Math.hypot(n.x-e.x,n.z-e.z))} צעדים`,Ze.forEach(l=>{const u=j("label-"+l.id);if(!u)return;const d=F.relay?Ot(F.relay,Ze.indexOf(l)):l;F.relay&&(u.textContent=Ze.indexOf(l)+1+" · "+d.title);const f=oe.project(d.x,3.7,d.z);u.style.left=f.x+"px",u.style.top=f.y+"px",u.style.display=f.visible?"block":"none",u.classList.toggle("done",F.seals.includes(l.id))}),Ht.forEach(l=>{const u=j("label-"+l.id);if(!u)return;const d=oe.project(l.x,2,l.z),f=Math.hypot(n.x-l.x,n.z-l.z);u.style.left=d.x+"px",u.style.top=d.y+"px",u.style.display=!F.relay&&!F.items.includes(l.id)&&d.visible&&(ki===l.id||f<7)?"block":"none"});const r=j("label-exit"),s=oe.project(hr.x,6.2,hr.z);r&&(r.style.left=s.x+"px",r.style.top=s.y+"px",r.style.display=s.visible?"block":"none");const a=Qo();j("interact").classList.toggle("hidden",!a||ht!=="explore"),a&&(j("interact").innerHTML=a.type==="relay"?Ot(F.relay,a.i).title:a.type==="spark"?"לאסוף ניצוץ ✧":a.type==="observation"?"סיום התצפית <kbd>E</kbd>":a.type==="environment"?`${Ne(a.id==="bench"&&F.environment.seated?"לקום מהספסל":Mn.find(l=>l.id===a.id).name)} <kbd>E</kbd>`:a.type==="animal"?`מפגש עם ${du[(c=oe.animals().find(l=>l.id===a.id))==null?void 0:c.type]||"חיה"} <kbd>E</kbd>`:a.type==="exit"?`${ti(F)?"יוצאים הביתה":"לבדוק את השער"} <kbd>E</kbd>`:a.type==="equipment"?`לבדוק ${Ne(Ht[a.i].short)} <kbd>E</kbd>`:`לדבר עם ${Ne(Ze[a.i].name)} <kbd>E</kbd>`);const o=j("label-environment");if(o){const l=(a==null?void 0:a.type)==="environment"?Mn.find(u=>u.id===a.id):null;if(l&&ht==="explore"){const u=oe.project(l.x,2.2,l.z);o.textContent=zs(l,F.environment)+" · "+l.name,o.style.left=u.x+"px",o.style.top=u.y+"px",o.style.display=u.visible?"block":"none"}else o.style.display="none"}}function Po(){return F.questions.filter(n=>Object.hasOwn(F.answers,n.id)).map(n=>{const e=F.answers[n.id];return`<details class="review-item"><summary>${e.correct?"✓":"↺"} ${Ne(n.prompt)}</summary><p>התשובה שלכם: ${Ne(n.choices[e.choice])}</p><p>התשובה הנכונה: ${Ne(n.choices[n.correct])}</p><p>${Ne(n.explanation.he)}</p>${n.explanation.en?`<p lang="en" dir="ltr">${Ne(n.explanation.en)}</p>`:""}${hu(n)}</details>`}).join("")}function mx(){if(F){if(F.relay){Rt("יומן המסילה",`<h2 id="dialog-title">${Oi[F.relay.edition].title}</h2>${Ze.map((n,e)=>`<div class="journal-entry"><h3>${F.seals.includes(n.id)?"✓":"◇"} ${Ot(F.relay,e).title}</h3><p>${Ot(F.relay,e).name} · ${yn(F,e).answered} מתוך ${yn(F,e).total} שאלות</p></div>`).join("")}${Po()}`,"journal");return}Rt("כל מה שגיליתם",`<h2 id="dialog-title">יומן ההרפתקה</h2>${Ze.map((n,e)=>`<div class="journal-entry"><h3>${F.seals.includes(n.id)?"✓":"◇"} ${Ne(n.name)}</h3><p>${Ne(n.role)} · ${yn(F,e).answered} מתוך ${yn(F,e).total} שאלות</p><p>${e===0?"מצפון־מערב, ליד הספרייה.":e===1?"מצפון־מזרח, ליד החממה.":"מדרום־מזרח, ליד מגדל הפנס."}</p></div>`).join("")}<h3>ציוד וממצאים</h3>${Ht.map(n=>`<div class="journal-entry"><h3>${F.items.includes(n.id)?"✓":"□"} ${Ne(n.name)}</h3><p>${Ne(F.items.includes(n.id)?n.clue:n.hint)}</p></div>`).join("")}<h3>חקירה בקמפוס · ${F.environment.visited.length}/12</h3>${Mn.map(n=>`<div class="journal-entry"><h3>${F.environment.visited.includes(n.id)?"✓":"□"} ${Ne(n.name)}</h3><p>${Ne(zs(n,F.environment))} · ${F.environment.visited.includes(n.id)?Ne(n.description):"אפשר לגלות בשטח. המפה מציגה את המיקום."}</p><button class="text-button" data-track-environment="${n.id}">להציג מיקום במפה ←</button></div>`).join("")}<p class="feedback-note">מפגשי טבע: ${F.environment.animalNotes.length} · עזרה לצוות: ${F.environment.helped.length}/3</p><h3>השאלות שכבר פתרתם</h3><p class="feedback-note">התשובות נעולות. אפשר לקרוא וללמוד מהן בכל רגע.</p>${Po()||'<p class="feedback-note">השאלות יופיעו כאן אחרי שתענו.</p>'}`,"journal"),document.querySelectorAll("[data-track-environment]").forEach(n=>n.onclick=()=>{const e=Mn.find(t=>t.id===n.dataset.trackEnvironment);Ft=e.id,Et(),$s(),document.body.classList.add("map-open"),j("map-toggle").setAttribute("aria-expanded","true"),Zt(`${e.name} סומן במפה.`)})}}j("journal").onclick=mx;const si=document.createElement("button");si.id="map-toggle";si.className="secondary map-toggle";si.textContent="מפה";si.setAttribute("aria-expanded","false");si.setAttribute("aria-controls","minimap");j("hud").appendChild(si);si.onclick=()=>{const n=document.body.classList.toggle("map-open");si.setAttribute("aria-expanded",String(n)),si.textContent=n?"סגירת מפה":"מפה"};const fu=document.createElement("span");fu.id="environment-progress";document.querySelector(".quest-bottom").appendChild(fu);function pu(){if(ht==="menu"||F!=null&&F.relay){Rt("מדריך שטח",'<h2 id="dialog-title">איך מדליקים את השמיים?</h2><div class="journal-entry"><h3>בוחרים פנס</h3><p>בחרו מספר בלוח המשימה. לכו בעזרת החצים או הג׳ויסטיק, או לחצו על ״ללכת איתי״.</p></div><div class="journal-entry"><h3>מחפשים אור</h3><p>אספו ניצוצות, קפצו בטבעת בעזרת רווח או כפתור החץ, וכוונו את המראות לפי הסמלים. בטבעת יש גם מתג קרקע.</p></div><div class="journal-entry"><h3>מציירים כוכבים</h3><p>ליד פנס טעון לחצו על כפתור הפעולה או על E וענו על שאלות התרגול. אחרי שלושה פנסים, פנו אל השער הצפוני.</p></div><p class="feedback-note">במשימת הקמפוס המקורית הצוות מחכה לציוד ליד שלוש התחנות.</p><button id="got-it" class="primary">חזרה ←</button>',ht==="menu"?"menu":"help"),j("got-it").onclick=Et;return}Rt("תדריך שטח",'<h2 id="dialog-title">איך יוצאים מכאן.</h2><div class="journal-entry"><h3>01 · משוטטים</h3><p>מקשי WASD או חצים כדי לזוז, רווח לקפוץ, Shift לרוץ. אפשר ללחוץ על הקרקע. בנייד: גוררים את העיגול וקופצים בכפתור החץ.</p></div><div class="journal-entry"><h3>02 · מקשיבים לחברים</h3><p>מתקרבים לדמות ולוחצים E או על כפתור השיחה. מבינים מה היא צריכה, מאתרים את הציוד שהוא צריך וחוזרים אליו להפעלת מסוף התרגול.</p></div><div class="journal-entry"><h3>03 · פותרים ויוצאים</h3><p>השאלות מגיעות מחומר התרגול שלכם. כל תשובה ננעלת ויש הסבר. אחרי הפעלת שלוש המערכות מגיעים לשער בצפון. אין זמן קצוב ואין קנס על טעות.</p></div><div class="journal-entry"><h3>חקירה חופשית</h3><p>מגלים 12 מקומות לפעולה: יושבים, פותחים דלתות, קולעים לסל, משקים וצופים בטבע. מתקרבים, לוחצים על הכפתור הגדול ובוחרים פעולה. ביומן יש מיקומים ורמזים. החקירה ועזרה לצוות אינן משנות את ציון הלימוד. F למסך מלא. Escape להשהיה.</p></div><button id="got-it" class="primary">חזרה למשימה ←</button>',F&&ht!=="menu"?"help":"menu"),j("got-it").onclick=Et}j("how").onclick=pu;function tc(){if(!(ht==="menu"||ht==="complete")){if(Ti.open){Et();return}Rt("היער יכול לחכות",`<h2 id="dialog-title">רגע לנשום.</h2><p class="dialog-copy">${To?"ההתקדמות נשמרה בלשונית הזאת.":"הדפדפן חסם שמירה מקומית. השאירו את הלשונית פתוחה כדי להמשיך."} העולם ממתין לכם.</p><div class="options"><button id="unpause" class="primary">חזרה ליער ←</button><button id="show-controls" class="secondary">איך משחקים?</button><button id="menu" class="secondary">חזרה למסך הפתיחה</button></div>`,"paused"),j("unpause").onclick=Et,j("show-controls").onclick=pu,j("menu").onclick=Xs}}j("pause").onclick=tc;async function mu(){try{document.fullscreenElement?await document.exitFullscreen():await document.documentElement.requestFullscreen()}catch{Zt("הדפדפן הזה לא מאפשר מסך מלא. אפשר להמשיך לשחק כרגיל.")}}j("fullscreen").onclick=mu;j("sound").onclick=()=>{or=!or,j("sound").setAttribute("aria-pressed",String(or)),j("sound").setAttribute("aria-label",or?"כיבוי צלילים":"הפעלת צלילים"),j("sound").style.color=or?"#d9bd85":"",pn()};window.addEventListener("keydown",n=>{var e;n.target.matches("input,select,textarea")||(n.code==="KeyF"&&(n.preventDefault(),mu()),n.code==="Escape"&&!Ti.open&&(n.preventDefault(),tc()),ht==="question"&&/^Digit[1-4]$/.test(n.code)&&((e=document.querySelectorAll(".answer")[Number(n.code.slice(-1))-1])==null||e.click()))});document.addEventListener("visibilitychange",()=>{document.hidden&&ht==="explore"&&tc(),document.hidden&&In?(clearTimeout(In),In=null):!document.hidden&&ht==="feedback"&&Qn&&(In=setTimeout(Qn,1500))});window.addEventListener("pagehide",En);async function xx(n){return Nu(n)}async function yl(n=F,e=Kt,t=Fs){const i={id:n.attemptId,name:t,quizId:e.id,answers:Object.entries(n.answers).map(([r,s])=>({id:r,choice:s.choice})),startedAt:n.startedAt,contentHash:await xx(e)};return au=ox(i),ru(i)}async function gx(){if(!ti(F)||ht==="complete")return;const n=F,e=Kt,t=Fs,i=F.attemptId;En();const r=Sl(F),s=Ru(r),a=Object.values(F.answers).filter(u=>u.correct).length,o=`prepx-best-${Kt.id}`,c=Number(ri.get(o));(!Number.isFinite(c)||r>c)&&ri.set(o,String(r)),Rt("הגעתם הביתה ✧",`${F.relay?`<svg class="relay-finale" viewBox="0 0 180 64" role="img" aria-label="קבוצת הכוכבים של הכיתה"><polyline points="18,48 57,15 96,35 137,8 162,35"/> ${[[18,48],[57,15],[96,35],[137,8],[162,35]].map(([u,d])=>`<path transform="translate(${u} ${d})" d="M0 -6 L2 -2 6 0 2 2 0 6 -2 2 -6 0 -2 -2Z"/>`).join("")}</svg>`:""}<div class="stars" aria-label="${s} כוכבים מתוך שלושה">${"★".repeat(s)+"☆".repeat(3-s)}</div><h2 class="finish-title" id="dialog-title">${F.relay?"הכוכבים נדלקו מעל בית הספר.":"המערכות פעילות.<br>הדרך החוצה פתוחה."}</h2><p class="finish-title feedback-note">צוות איינשטיין, המשימה הושלמה. בפעם הבאה נשארים להאקתון בשעות האור.</p><div class="score-big">${r}<small> / 100</small></div><div class="stats-row"><div><strong>${a}/${F.questions.length}</strong><small>תשובות נכונות</small></div><div><strong>3</strong><small>${F.relay?"פנסים דולקים":"מערכות פעילות"}</small></div><div><strong>${F.collected.length}</strong><small>גחליליות</small></div></div><p id="save-status" class="saved-note" role="status">שומרים את התוצאה בהיסטוריית המשחק…</p><div class="dialog-actions"><button id="replay" class="primary">משימה חדשה ↺</button><a class="secondary" href="https://hitech.agnon.online/subject.html?subject=${Kt.subject_id}">לחומר הלימוד ↗</a></div><button id="review-results" class="text-button">התשובות וההסברים שלכם <span>↓</span></button><div id="final-review" class="hidden">${Po()}</div>`,"complete"),j("replay").onclick=()=>{vl(),F=null,Xs()},j("review-results").onclick=()=>j("final-review").classList.toggle("hidden"),wo=yl(n,e,t);const l=await wo;if(ht==="complete"&&(F==null?void 0:F.attemptId)===i&&(j("save-status").textContent=l?"✓ התוצאה נשמרה בהיסטוריית המשחק. לא נשלח דוא״ל.":au?"אין חיבור להיסטוריה כרגע. התוצאה נשמרה במכשיר וממתינה לשליחה.":"השמירה נכשלה והדפדפן חסם שמירה מקומית. השאירו את הלשונית פתוחה ונסו שוב.",!l)){const u=document.createElement("button");u.className="text-button",u.textContent="לנסות לשמור שוב",u.onclick=async()=>{u.disabled=!0,await yl(n,e,t)?(j("save-status").textContent="✓ התוצאה נשמרה בהיסטוריית המשחק.",u.remove()):u.disabled=!1},j("save-status").after(u)}l&&(F==null?void 0:F.attemptId)===i&&vl()}try{oe=sx(j("world"),{reduced:ax,onInteract:ec,onEnvironmentChange:n=>{F&&Yt(n)},onCollect:n=>{!F||F.collected.includes(n)||(F.collected.push(n),xn(),En(),pn(),F.collected.length%3===0&&Zt(`${F.collected.length} נקודות טבע תועדו ביומן. החקירה לא משנה את ציון הלימוד.`))},onMove:(n,e,t)=>{F&&(Math.hypot(n-F.player.x,e-F.player.z)>.01&&(Zo=F.elapsed),F.player={x:n,z:e},F.relay&&ht==="explore"&&_x(n,e),F.elapsed+=t,Da+=t,Da>1&&(Da=0,En()))}}),j("loading").classList.add("hidden")}catch{j("loading").innerHTML='<div style="max-width:320px;text-align:center"><h2>היער צריך דפדפן עם תלת־ממד.</h2><p>נסו לעדכן את הדפדפן או להפעיל האצת חומרה.</p><a href="https://hitech.agnon.online/" class="primary">בינתיים, לתרגול הרגיל ←</a></div>',j("start").disabled=!0}j("world").addEventListener("worldlost",()=>{Rt("החיבור לתלת־ממד נעצר",'<h2 id="dialog-title">נשמר לכם מקום ביער.</h2><p class="dialog-copy">רעננו את העמוד ובחרו בהמשך ההרפתקה השמורה.</p><button id="reload" class="primary">רענון וחזרה</button>',"paused"),j("reload").onclick=()=>location.reload()});const Wr=j("joystick");let nc=null;function xu(n){if(nc!==n.pointerId)return;const e=Wr.getBoundingClientRect();let t=(n.clientX-e.left-e.width/2)/36,i=(n.clientY-e.top-e.height/2)/36;const r=Math.max(1,Math.hypot(t,i));t/=r,i/=r,oe==null||oe.setJoystick(t,i),j("stick").style.transform=`translate(${t*28}px,${i*28}px)`}Wr.addEventListener("pointerdown",n=>{nc=n.pointerId,Wr.setPointerCapture(n.pointerId),xu(n)});Wr.addEventListener("pointermove",xu);function gu(){nc=null,oe==null||oe.setJoystick(0,0),j("stick").style.transform=""}for(const n of["pointerup","pointercancel","lostpointercapture"])Wr.addEventListener(n,gu);j("jump").onclick=()=>oe==null?void 0:oe.jump();setInterval(Hr,80);window.render_game_to_text=()=>{var n;return JSON.stringify({mode:ht,coordinateSystem:"x east, z south; y up; world -27..27. Arrow/WASD movement is camera-relative.",source:Ao,quiz:Kt.id,player:oe==null?void 0:oe.getPlayer(),target:Qo(),environment:F?Mn.map(e=>({...e,state:zs(e,F.environment),visited:F.environment.visited.includes(e.id),action:bl(e,F.environment)})):[],environmentState:(F==null?void 0:F.environment)||null,environmentAnimation:oe==null?void 0:oe.environmentAnimation(),observing:(oe==null?void 0:oe.isObserving())||!1,rendering:oe==null?void 0:oe.performance(),relay:F!=null&&F.relay?{...F.relay,stations:[0,1,2].map(e=>Ot(F.relay,e))}:null,mission:F?{objective:Si(F,Gt,oe.getPlayer()),target:qs(),navigation:(n=oe==null?void 0:oe.guidance)==null?void 0:n.call(oe),fieldCheck:fn,sideCompleted:lr.filter(e=>e.done(F.environment)).length}:null,npcs:Ze.map((e,t)=>({id:e.id,x:e.x,z:e.z,understood:(F==null?void 0:F.understood.includes(e.id))||!1,sealed:(F==null?void 0:F.seals.includes(e.id))||!1,progress:F?yn(F,t):null})),equipment:Ht.map(e=>({id:e.id,x:e.x,z:e.z,collected:(F==null?void 0:F.items.includes(e.id))||!1})),exit:{...hr,open:F?ti(F):!1},question:Jn&&["question","feedback"].includes(ht)?{id:Jn.id,prompt:Jn.prompt,options:Jn.options.map(e=>e.text),locked:!!(F!=null&&F.answers[Jn.id])}:null,answered:F?Object.keys(F.answers).length:0,total:Kt.questions.length,score:F?Sl(F):0,fireflies:(F==null?void 0:F.collected.length)||0,elapsed:Math.floor((F==null?void 0:F.elapsed)||0),animals:oe==null?void 0:oe.animals(),paused:Ti.open})};window.advanceTime=n=>oe==null?void 0:oe.advanceTime(n);lu().then(su);function Fr(n,e){const t=F.relay;t.steps[n]!==e&&(t.steps[n]=e,En(),oe.setProgress(F),xn(),pn(),Zt(Mi(t,n)?"✧ הפנס טעון! הפעילו אותו כדי לפתוח את התרגול.":Ot(t,n).task==="sparks"?"✧ ניצוץ נאסף":"✧ המראה מכוונת"))}function _x(n,e){const t=F.relay;for(let i=0;i<3;i++){if(Mi(t,i))continue;const r=Ot(t,i);if(r.task==="sparks")for(const s of Ns(r))Math.hypot(n-s.x,e-s.z)<.95&&Fr(i,t.steps[i]|1<<s.bit);r.task==="ring"&&oe.getPlayer().y>.65&&Math.hypot(n-r.x,e-r.z)<1.95&&Fr(i,1)}}function _u(n){const{i:e}=n,t=F.relay,i=Ot(t,e);if(Gt=e,Ft=null,n.type==="spark"){Fr(e,t.steps[e]|1<<n.bit);return}if(Mi(t,e)){Ni(e);return}if(i.task==="sparks"){Zt("עקבו אחרי הניצוצות הזהובים ואספו את שלושתם."),xn();return}if(i.task==="ring"){Rt("טבעת הרוח",'<h2 id="dialog-title">מרימים את האור</h2><p class="dialog-copy">קפצו בתוך הטבעת בלחיצה על רווח או על חץ הקפיצה. אפשר גם להטעין אותה בעזרת מתג הקרקע.</p><button id="ring-jump" class="primary">חזרה לטבעת ←</button><button id="ground-switch" class="secondary">הפעלת מתג הקרקע</button>',"relay"),j("ring-jump").onclick=Et,j("ground-switch").onclick=()=>{Et(),Fr(e,1)};return}const r=Oi[t.edition].sequence;Rt("מראות הירח",`<h2 id="dialog-title">כוונו את המראות</h2><p class="dialog-copy">הסדר החרוט על הלוח</p><ol class="relay-sequence">${r.map((s,a)=>`<li>${a<t.steps[e]?"✓ ":""}${ic[s]}</li>`).join("")}</ol><div class="field-options">${ic.map((s,a)=>`<button class="secondary" data-mirror="${a}">${s}</button>`).join("")}</div><p id="mirror-feedback" role="status">בחרו את הסמל בשלב ${t.steps[e]+1}.</p>`,"relay"),document.querySelectorAll("[data-mirror]").forEach(s=>s.onclick=()=>{if(Number(s.dataset.mirror)!==r[t.steps[e]]){j("mirror-feedback").textContent="המראה עוד חשוכה. נסו את הסמל המסומן בשלב "+(t.steps[e]+1)+".";return}Fr(e,t.steps[e]+1),Mi(t,e)?(Et(),Ni(e)):_u(n)})}
