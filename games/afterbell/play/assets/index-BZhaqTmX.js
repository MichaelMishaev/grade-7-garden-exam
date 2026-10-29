(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();function Jl(i=globalThis.crypto){if(typeof i.randomUUID=="function")return i.randomUUID();const e=i.getRandomValues(new Uint8Array(16));e[6]=e[6]&15|64,e[8]=e[8]&63|128;const t=[...e].map(n=>n.toString(16).padStart(2,"0")).join("");return`${t.slice(0,8)}-${t.slice(8,12)}-${t.slice(12,16)}-${t.slice(16,20)}-${t.slice(20)}`}const pn=[{id:"bench",name:"הספסל ליד האגם",x:-6,z:10,range:3,kind:"rest",description:"פסק זמן קטן. הספסל לא ישאל מה הספקתם היום.",action:"לשבת לרגע"},{id:"door",name:"דלת המבואה",x:-2,z:-15.5,range:2.8,kind:"toggle",description:"הדלת הידנית של המבואה עדיין עובדת. בפנים: מקום שקט ולוח הפרויקט.",action:"לפתוח את הדלת"},{id:"lamp",name:"פנס הרחבה",x:-2,z:10,range:2.4,kind:"toggle",description:"מפסק מקומי. לפחות דבר אחד כאן לא דורש סיסמה.",action:"לכבות את הפנס"},{id:"basketball",name:"עמדת הקליעה",x:12,z:22,range:2.8,kind:"play",description:"הכדור נמצא על הקו. זריקה רגועה, בלי שעון ובלי טבלת דירוג.",action:"לזרוק לסל"},{id:"locker",name:"ארונית צוות איינשטיין",x:-10,z:-13,range:2.5,kind:"inspect",description:"על הדלת: ״ציוד משותף. רעיונות פחות״. בפנים נשאר פתק מסבב העבודה האחרון.",action:"לפתוח את הארונית"},{id:"noticeboard",name:"לוח ההאקתון",x:-4,z:5,range:2.4,kind:"clue",description:"רשימת סוף יום: כרטיס הגישה עבר מערבה מהספרייה; הגיבוי הונח ממזרח למעבדה; האנטנה נשארה בדרום־מערב. אף אחד לא סימן ״החזרתי״.",action:"לתעד את הרמז ביומן"},{id:"telescope",name:"עמדת תצפית לאגם",x:-8,z:16.7,range:2.5,kind:"observe",description:"עדשה מכוונת לאגם. אפשר להתקרב למראה בלי לרדוף אחרי בעלי החיים.",action:"להביט דרך העדשה"},{id:"water",name:"קערת המים",x:-8.5,z:8,range:2.5,kind:"care",description:"קערה נקייה בפינת הטבע. ממלאים מים ונותנים לבעלי החיים לבחור אם להתקרב.",action:"למלא מים"},{id:"planter",name:"ערוגת המעבדה",x:23,z:-6,range:2.5,kind:"care",description:"פרויקט השקיה שעובד גם בלי Wi-Fi. העלים קצת שמוטים; המשפך עדיין כאן.",action:"להשקות את הערוגה"},{id:"recycling",name:"פינת המחזור",x:5,z:10,range:2.5,kind:"help",description:"שלוש פחיות נשארו אחרי ההאקתון. ״מישהו יאסוף״ עדיין לא הגיע.",action:"לאסוף את הפחיות למחזור"},{id:"solar",name:"לוח תאורת השביל",x:19,z:8,range:2.6,kind:"puzzle",description:"שלושה מתגים, שלושה סימונים. הדליקו רק ירח ועץ כדי להאיר את פינת הטבע. אין קנס ואין לחץ זמן.",action:"לכוון את המתגים"},{id:"bike",name:"עמדת האופניים",x:-21,z:-8.5,range:2.5,kind:"play",description:"הפעמון תקוע בזווית. מיישרים, בודקים צלצול ומקווים שהשומר לא יחשוב שכבר בוקר.",action:"לבדוק את הפעמון"}];function Ir(i={}){const e=i&&typeof i=="object"&&!Array.isArray(i)?i:{},t=r=>Number.isSafeInteger(e[r])?Math.max(0,Math.min(9999,e[r])):0,n=r=>Array.isArray(r)?[...new Set(r.filter(s=>pn.some(a=>a.id===s)))]:[];return{checkedEquipment:Array.isArray(e.checkedEquipment)?[...new Set(e.checkedEquipment.filter(r=>["card","fuse","antenna"].includes(r)))]:[],visited:n(e.visited),doorOpen:e.doorOpen===!0,lampOn:e.lampOn!==!1,lockerOpen:e.lockerOpen===!0,waterFilled:e.waterFilled===!0,watered:e.watered===!0,recycled:e.recycled===!0,switches:[0,1,2].map(r=>Array.isArray(e.switches)&&e.switches[r]===!0),shots:t("shots"),observations:t("observations"),bells:t("bells"),helped:Array.isArray(e.helped)?[...new Set(e.helped.filter(r=>["owl","pigeon","raccoon"].includes(r)))]:[],animalNotes:Array.isArray(e.animalNotes)?[...new Set(e.animalNotes.filter(r=>Number.isInteger(r)&&r>=0&&r<19))]:[],following:Number.isInteger(e.following)&&e.following>=0&&e.following<16?e.following:null,seated:e.seated===!0}}const vs=i=>i.switches[0]&&!i.switches[1]&&i.switches[2];function bs(i,e){return{bench:e.seated?"יושבים":"פנוי",door:e.doorOpen?"פתוחה":"סגורה",lamp:e.lampOn?"דולק":"כבוי",basketball:`${e.shots} קליעות`,locker:e.lockerOpen?"פתוחה":"סגורה",noticeboard:e.visited.includes("noticeboard")?"הרמז תועד":"רמז חדש",telescope:`${e.observations} תצפיות`,water:e.waterFilled?"הקערה מלאה":"הקערה ריקה",planter:e.watered?"הערוגה הושקתה":"זקוקה למים",recycling:e.recycled?"הרחבה נקייה":"3 פחיות בשטח",solar:vs(e)?"השביל מואר":"התאורה כבויה",bike:`${e.bells} צלצולים`}[i.id]}function Jc(i,e){return{bench:e.seated?"לקום ולהמשיך":i.action,door:e.doorOpen?"לסגור את הדלת":i.action,lamp:e.lampOn?i.action:"להדליק את הפנס",locker:e.lockerOpen?"לסגור את הארונית":i.action,water:e.waterFilled?"לצפות ליד קערת המים":i.action,planter:e.watered?"לבדוק את העלים":i.action,recycling:e.recycled?"לבדוק את הפינה הנקייה":i.action,noticeboard:e.visited.includes("noticeboard")?"לקרוא שוב את הרמז":i.action}[i.id]||i.action}const tt=[{id:"owl",name:"נועה",role:"צוות התוכנה · הספרייה",system:"מסוף הגישה",color:"#91b6c5",x:-13,z:-9,line:"המסוף נתקע וכולם שולחים לי הוראות שונות. אני צריכה לבדוק מה באמת קרה, לא עוד עשר השערות. אפשר לעבור איתי על הדברים אחד־אחד?",choices:["נקשיב למה שכבר בדקה ונבחר יחד צעד אחד","ננסה לשנות הכול בבת אחת","נחליט שהיא לא מבינה ונתפוס פיקוד"],need:0,reply:"מעולה. סוף סוף מישהו שלא מציע לכבות ולהדליק את כל בית הספר.",wrong:"נועה מצביעה על רשימת הבדיקות. היא מבקשת שיתוף פעולה וסדר, לא עוד רעש."},{id:"pigeon",name:"איתי",role:"צוות הרובוטיקה · החממה",system:"מערכת הגיבוי",color:"#b5bd9d",x:13,z:-7,line:"אני מחזיק את בקר הגיבוי כבר רבע שעה, ואף אחד לא שאל אם אני צריך עזרה. לא, הכול בסדר. ברור. רק קצת נגמרות לי הידיים.",choices:["נשאל מה אפשר לקחת ממנו ונתחלק במשימה","נגיד לו להפסיק להתלונן","נתחיל להסביר לו איך לעבוד מהר יותר"],need:0,reply:"קחו את החלק של למצוא ציוד. אני אקח את החלק של לא להפיל את הפרויקט של כל הכיתה.",wrong:"הוא מסתכל על הציוד שבידיים שלו. הבעיה היא עומס, לא חוסר ידע."},{id:"raccoon",name:"אדם",role:"צוות התקשורת · מגדל הקשר",system:"ערוץ הקשר",color:"#c6aa83",x:10,z:14,line:"שמעתם את הרעש מהיער? אני יודע שזאת כנראה חיה. עדיין, מעדיף לא לעבור שם לבד. לא צריך להכריז על זה בקבוצת הכיתה.",choices:["נציע להתקדם יחד ולשמור את זה בינינו","נצלם אותו כדי להצחיק את הקבוצה","נגיד שאין שום סיבה להרגיש ככה"],need:0,reply:"תודה. מסתבר שעבודת צוות היא גם לצאת מהמצגת וללכת ביחד.",wrong:"אדם ביקש חברה ודיסקרטיות. אפשר לעזור בלי לבטל את מה שהוא מרגיש."}],kt=[{id:"card",name:"כרטיס צוות איינשטיין",short:"כרטיס גישה",x:-21,z:-3,npc:0,hint:"על שולחן העבודה שממערב לספרייה, ליד השביל לאגם.",clue:"על הכרטיס כתוב: צוות איינשטיין — כיתת הייטק. בגב הכרטיס רשומה הערה: נוהל היציאה דורש אימות של שלושת מסופי הפרויקט.",report:"כרטיס הגישה נמצא. המסוף בספרייה יכול להתחבר עכשיו למערכת התרגול."},{id:"fuse",name:"יחידת גיבוי לפרויקט",short:"יחידת גיבוי",x:21,z:3,npc:1,hint:"בארגז הציוד שממזרח לחממה. חפשו את הסימון הצהוב.",clue:"זו יחידת גיבוי לימודית של הרובוטיקה. על המדבקה: מי שלוקח — מחזיר. מתחת, מישהו הוסיף: כן, גם אם זה עובד.",report:"יחידת הגיבוי נמצאה. איתי יוכל להפעיל את התחנה אחרי בדיקת התרגול."},{id:"antenna",name:"אנטנת תחנת הקשר",short:"אנטנה",x:-8,z:22,npc:2,hint:"ליד עמדת הקשר הישנה, בדרום־מערב המתחם.",clue:"מחברת פתוחה ליד האנטנה: צוות התקשורת, ז׳ איינשטיין. כששלוש התחנות פעילות, השער חוזר למצב יציאה. ברקע נשמע רעש — הפעם באמת ברווז.",report:"האנטנה נמצאה. חוזרים לאדם במגדל ומשלימים את בדיקת הקשר."}],Qi={x:0,z:-25},_a=(i,e=Math.random)=>{const t=[...i];for(let n=t.length-1;n>0;n--){const r=Math.floor(e()*(n+1));[t[n],t[r]]=[t[r],t[n]]}return t};function Qc(i){return!!i&&typeof i.id=="string"&&typeof i.title=="string"&&Array.isArray(i.references)&&Array.isArray(i.questions)&&i.questions.length>0&&i.questions.length<=30&&new Set(i.questions.map(e=>e.id)).size===i.questions.length&&i.questions.every(e=>{var t;return typeof e.id=="string"&&typeof e.prompt=="string"&&e.type==="mcq"&&Array.isArray(e.choices)&&e.choices.length>=2&&e.choices.every(n=>typeof n=="string")&&Number.isInteger(e.correct)&&e.correct>=0&&e.correct<e.choices.length&&typeof((t=e.explanation)==null?void 0:t.he)=="string"&&i.references.some(n=>{var r,s;return n.id===((r=e.ref)==null?void 0:r.id)&&(!e.ref.part||((s=n.parts)==null?void 0:s.some(a=>a.part===e.ref.part)))})})}function Ql(i,e=Math.random){if(!Qc(i))throw new Error("Invalid quiz");const t=_a(i.questions,e).map(n=>({...n,options:_a(n.choices.map((r,s)=>({text:r,original:s})),e)}));return{quizId:i.id,questions:t,assignments:tt.map((n,r)=>t.filter((s,a)=>a%3===r).map(s=>s.id)),environment:Ir(),answers:{},understood:[],seals:[],items:[],collected:[],elapsed:0,player:{x:0,z:9},startedAt:Date.now(),attemptId:Jl()}}function eu(i,e,t){if(Object.hasOwn(i.answers,e))return null;const n=i.questions.find(s=>s.id===e);if(!n||!Number.isInteger(t)||t<0||t>=n.choices.length)return null;const r={choice:t,correct:t===n.correct};return i.answers[e]=r,r}function In(i,e){const t=i.assignments[e];return{answered:t.filter(n=>Object.hasOwn(i.answers,n)).length,total:t.length,next:t.find(n=>!Object.hasOwn(i.answers,n))}}function el(i){const e={easy:1,medium:1.5,hard:2},t=i.questions.reduce((n,r)=>n+(e[r.difficulty]||1.5),0);return Math.round(i.questions.reduce((n,r)=>{var s;return n+((s=i.answers[r.id])!=null&&s.correct?e[r.difficulty]||1.5:0)},0)/t*100)}const tu=i=>i>=90?3:i>=75?2:i>=50?1:0;function ci(i){return i.seals.length===3&&Object.keys(i.answers).length===i.questions.length}function tl(i,e){try{const t=JSON.parse(i);if(!t||t.quizId!==e.id||typeof t.attemptId!="string"||!Number.isFinite(t.startedAt)||!Number.isFinite(t.elapsed)||t.elapsed<0||!Array.isArray(t.questions)||t.questions.length!==e.questions.length||!t.player||!Number.isFinite(t.player.x)||!Number.isFinite(t.player.z)||Math.abs(t.player.x)>27||Math.abs(t.player.z)>27||t.participantName!==void 0&&(typeof t.participantName!="string"||!t.participantName.trim()||t.participantName.length>60))return null;const n=new Set;for(const r of t.questions){const s=e.questions.find(a=>a.id===r.id);if(!s||n.has(r.id)||JSON.stringify({...r,options:void 0})!==JSON.stringify(s)||(n.add(r.id),!Array.isArray(r.options)||r.options.length!==s.choices.length||new Set(r.options.map(a=>a.original)).size!==r.options.length||r.options.some(a=>s.choices[a.original]!==a.text)))return null}if(!t.answers||typeof t.answers!="object")return null;for(const[r,s]of Object.entries(t.answers)){const a=e.questions.find(o=>o.id===r);if(!a||!Number.isInteger(s.choice)||s.choice<0||s.choice>=a.choices.length||s.correct!==(s.choice===a.correct))return null}return t.assignments=tt.map((r,s)=>t.questions.filter((a,o)=>o%3===s).map(a=>a.id)),!Array.isArray(t.understood)||t.understood.some(r=>!tt.some(s=>s.id===r))?null:(t.items=Array.isArray(t.items)?[...new Set(t.items.filter(r=>kt.some(s=>s.id===r)))]:[],t.seals=tt.filter((r,s)=>t.understood.includes(r.id)&&t.items.includes(kt[s].id)&&In(t,s).answered===In(t,s).total).map(r=>r.id),t.collected=Array.isArray(t.collected)?[...new Set(t.collected.filter(r=>Number.isInteger(r)&&r>=0&&r<12))]:[],t.environment=Ir(t.environment),t)}catch{return null}}function li(i,e,t=i.player){if(ci(i))return{id:"exit",kind:"exit",...Qi,title:"השער פתוח — יוצאים הביתה",hint:"לכו בעקבות השביל המואר ולחצו על כפתור היציאה ליד השער.",action:"לשער היציאה"};const n=tt.map((u,d)=>d).filter(u=>!i.seals.includes(tt[u].id)),r=n.filter(u=>i.understood.includes(tt[u].id)||i.items.includes(kt[u].id)),s=r.length?r:n,a=n.includes(e)?e:s.sort((u,d)=>Math.hypot(t.x-tt[u].x,t.z-tt[u].z)-Math.hypot(t.x-tt[d].x,t.z-tt[d].z))[0],o=tt[a],c=kt[a];if(!i.understood.includes(o.id))return{id:o.id+":meet",kind:"npc",index:a,x:o.x,z:o.z,title:`דברו עם ${o.name}`,hint:`${["ליד הספרייה","ליד החממה","ליד מגדל הקשר"][a]} — התקרבו ולחצו על שיחה. ${o.name} מחכה לכם.`,action:`אל ${o.name}`};if(!i.items.includes(c.id))return{id:c.id+":find",kind:"equipment",index:a,x:c.x,z:c.z,title:`מצאו ובדקו ${c.short}`,hint:c.hint,action:"לציוד החסר"};const l=In(i,a);return{id:o.id+":return",kind:"npc",index:a,x:o.x,z:o.z,title:`החזירו את הציוד ל${o.name}`,hint:`הציוד איתכם. חזרו לתחנה והשלימו ${l.total-l.answered} שאלות כדי להפעיל את ${o.system}.`,action:`חזרה ל${o.name}`}}const ji=[{id:"water",title:"עזרה בפינת הטבע",hint:"מלאו את קערת המים ותנו לארנב להתקרב.",done:i=>i.waterFilled},{id:"locker",title:"הפתק שנשאר מאחור",hint:"פתחו את ארונית הצוות כדי לחשוף רמז לאנטנה.",done:i=>i.visited.includes("locker")},{id:"solar",title:"להחזיר אור לשביל",hint:"כוונו את מתגי התאורה לפי הסימונים שעל המכסה.",done:i=>vs(i)},{id:"basketball",title:"שלוש זריקות להפסקה",hint:"קלעו שלוש פעמים. אפילו השומר צריך הפסקה.",done:i=>i.shots>=3},{id:"telescope",title:"מי מסתובב באגם?",hint:"השתמשו בעמדת התצפית וגלו מי ממשיך בסיור.",done:i=>i.observations>0}],nl={card:{title:"שחזור קוד הגישה",hint:"על הסורק חרוט הסדר: משולש ← ריבוע ← עיגול. לחצו על הסמלים באותו סדר.",options:["משולש △","ריבוע □","עיגול ○"],sequence:[0,1,2]},fuse:{title:"בדיקת יחידת ההדגמה",hint:"לפי המדבקה: מחברים את הכבל, מפעילים בדיקה, ואז נועלים את המכסה.",options:["בדיקה ◇","נעילת מכסה ▣","חיבור כבל ↔"],sequence:[2,0,1]},antenna:{title:"כיוון האות",hint:"במחברת מסומן ערוץ 5. כוונו את החוגה עד שהאות יציב, ואז אשרו."}};function nu(i,e,t){var n,r;return((r=(n=nl[i])==null?void 0:n.sequence)==null?void 0:r[e])===t}var iu=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function ru(i){if(Object.prototype.hasOwnProperty.call(i,"__esModule"))return i;var e=i.default;if(typeof e=="function"){var t=function n(){return this instanceof n?Reflect.construct(e,arguments,this.constructor):e.apply(this,arguments)};t.prototype=e.prototype}else t={};return Object.defineProperty(t,"__esModule",{value:!0}),Object.keys(i).forEach(function(n){var r=Object.getOwnPropertyDescriptor(i,n);Object.defineProperty(t,n,r.get?r:{enumerable:!0,get:function(){return i[n]}})}),t}var Us={exports:{}};const su={},au=Object.freeze(Object.defineProperty({__proto__:null,default:su},Symbol.toStringTag,{value:"Module"})),Oo=ru(au);/**
 * [js-sha256]{@link https://github.com/emn178/js-sha256}
 *
 * @version 0.11.1
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2014-2025
 * @license MIT
 */var zo;function ou(){return zo||(zo=1,(function(i){(function(){var e="input is invalid type",t=typeof window=="object",n=t?window:{};n.JS_SHA256_NO_WINDOW&&(t=!1);var r=!t&&typeof self=="object",s=!n.JS_SHA256_NO_NODE_JS&&typeof process=="object"&&process.versions&&process.versions.node&&process.type!="renderer";s?n=iu:r&&(n=self);var a=!n.JS_SHA256_NO_COMMON_JS&&!0&&i.exports,o=!n.JS_SHA256_NO_ARRAY_BUFFER&&typeof ArrayBuffer<"u",c="0123456789abcdef".split(""),l=[-2147483648,8388608,32768,128],u=[24,16,8,0],d=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298],f=["hex","array","digest","arrayBuffer"],p=[];(n.JS_SHA256_NO_NODE_JS||!Array.isArray)&&(Array.isArray=function(g){return Object.prototype.toString.call(g)==="[object Array]"}),o&&(n.JS_SHA256_NO_ARRAY_BUFFER_IS_VIEW||!ArrayBuffer.isView)&&(ArrayBuffer.isView=function(g){return typeof g=="object"&&g.buffer&&g.buffer.constructor===ArrayBuffer});var v=function(g,A){return function(I){return new R(A,!0).update(I)[g]()}},M=function(g){var A=v("hex",g);s&&(A=m(A,g)),A.create=function(){return new R(g)},A.update=function(_){return A.create().update(_)};for(var I=0;I<f.length;++I){var x=f[I];A[x]=v(x,g)}return A},m=function(g,A){var I=Oo,x=Oo.Buffer,_=A?"sha224":"sha256",T;x.from&&!n.JS_SHA256_NO_BUFFER_FROM?T=x.from:T=function(L){return new x(L)};var F=function(L){if(typeof L=="string")return I.createHash(_).update(L,"utf8").digest("hex");if(L==null)throw new Error(e);return L.constructor===ArrayBuffer&&(L=new Uint8Array(L)),Array.isArray(L)||ArrayBuffer.isView(L)||L.constructor===x?I.createHash(_).update(T(L)).digest("hex"):g(L)};return F},h=function(g,A){return function(I,x){return new w(I,A,!0).update(x)[g]()}},P=function(g){var A=h("hex",g);A.create=function(_){return new w(_,g)},A.update=function(_,T){return A.create(_).update(T)};for(var I=0;I<f.length;++I){var x=f[I];A[x]=h(x,g)}return A};function R(g,A){A?(p[0]=p[16]=p[1]=p[2]=p[3]=p[4]=p[5]=p[6]=p[7]=p[8]=p[9]=p[10]=p[11]=p[12]=p[13]=p[14]=p[15]=0,this.blocks=p):this.blocks=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],g?(this.h0=3238371032,this.h1=914150663,this.h2=812702999,this.h3=4144912697,this.h4=4290775857,this.h5=1750603025,this.h6=1694076839,this.h7=3204075428):(this.h0=1779033703,this.h1=3144134277,this.h2=1013904242,this.h3=2773480762,this.h4=1359893119,this.h5=2600822924,this.h6=528734635,this.h7=1541459225),this.block=this.start=this.bytes=this.hBytes=0,this.finalized=this.hashed=!1,this.first=!0,this.is224=g}R.prototype.update=function(g){if(!this.finalized){var A,I=typeof g;if(I!=="string"){if(I==="object"){if(g===null)throw new Error(e);if(o&&g.constructor===ArrayBuffer)g=new Uint8Array(g);else if(!Array.isArray(g)&&(!o||!ArrayBuffer.isView(g)))throw new Error(e)}else throw new Error(e);A=!0}for(var x,_=0,T,F=g.length,L=this.blocks;_<F;){if(this.hashed&&(this.hashed=!1,L[0]=this.block,this.block=L[16]=L[1]=L[2]=L[3]=L[4]=L[5]=L[6]=L[7]=L[8]=L[9]=L[10]=L[11]=L[12]=L[13]=L[14]=L[15]=0),A)for(T=this.start;_<F&&T<64;++_)L[T>>>2]|=g[_]<<u[T++&3];else for(T=this.start;_<F&&T<64;++_)x=g.charCodeAt(_),x<128?L[T>>>2]|=x<<u[T++&3]:x<2048?(L[T>>>2]|=(192|x>>>6)<<u[T++&3],L[T>>>2]|=(128|x&63)<<u[T++&3]):x<55296||x>=57344?(L[T>>>2]|=(224|x>>>12)<<u[T++&3],L[T>>>2]|=(128|x>>>6&63)<<u[T++&3],L[T>>>2]|=(128|x&63)<<u[T++&3]):(x=65536+((x&1023)<<10|g.charCodeAt(++_)&1023),L[T>>>2]|=(240|x>>>18)<<u[T++&3],L[T>>>2]|=(128|x>>>12&63)<<u[T++&3],L[T>>>2]|=(128|x>>>6&63)<<u[T++&3],L[T>>>2]|=(128|x&63)<<u[T++&3]);this.lastByteIndex=T,this.bytes+=T-this.start,T>=64?(this.block=L[16],this.start=T-64,this.hash(),this.hashed=!0):this.start=T}return this.bytes>4294967295&&(this.hBytes+=this.bytes/4294967296<<0,this.bytes=this.bytes%4294967296),this}},R.prototype.finalize=function(){if(!this.finalized){this.finalized=!0;var g=this.blocks,A=this.lastByteIndex;g[16]=this.block,g[A>>>2]|=l[A&3],this.block=g[16],A>=56&&(this.hashed||this.hash(),g[0]=this.block,g[16]=g[1]=g[2]=g[3]=g[4]=g[5]=g[6]=g[7]=g[8]=g[9]=g[10]=g[11]=g[12]=g[13]=g[14]=g[15]=0),g[14]=this.hBytes<<3|this.bytes>>>29,g[15]=this.bytes<<3,this.hash()}},R.prototype.hash=function(){var g=this.h0,A=this.h1,I=this.h2,x=this.h3,_=this.h4,T=this.h5,F=this.h6,L=this.h7,V=this.blocks,X,K,se,j,ne,ee,fe,Ce,Oe,He,ut;for(X=16;X<64;++X)ne=V[X-15],K=(ne>>>7|ne<<25)^(ne>>>18|ne<<14)^ne>>>3,ne=V[X-2],se=(ne>>>17|ne<<15)^(ne>>>19|ne<<13)^ne>>>10,V[X]=V[X-16]+K+V[X-7]+se<<0;for(ut=A&I,X=0;X<64;X+=4)this.first?(this.is224?(Ce=300032,ne=V[0]-1413257819,L=ne-150054599<<0,x=ne+24177077<<0):(Ce=704751109,ne=V[0]-210244248,L=ne-1521486534<<0,x=ne+143694565<<0),this.first=!1):(K=(g>>>2|g<<30)^(g>>>13|g<<19)^(g>>>22|g<<10),se=(_>>>6|_<<26)^(_>>>11|_<<21)^(_>>>25|_<<7),Ce=g&A,j=Ce^g&I^ut,fe=_&T^~_&F,ne=L+se+fe+d[X]+V[X],ee=K+j,L=x+ne<<0,x=ne+ee<<0),K=(x>>>2|x<<30)^(x>>>13|x<<19)^(x>>>22|x<<10),se=(L>>>6|L<<26)^(L>>>11|L<<21)^(L>>>25|L<<7),Oe=x&g,j=Oe^x&A^Ce,fe=L&_^~L&T,ne=F+se+fe+d[X+1]+V[X+1],ee=K+j,F=I+ne<<0,I=ne+ee<<0,K=(I>>>2|I<<30)^(I>>>13|I<<19)^(I>>>22|I<<10),se=(F>>>6|F<<26)^(F>>>11|F<<21)^(F>>>25|F<<7),He=I&x,j=He^I&g^Oe,fe=F&L^~F&_,ne=T+se+fe+d[X+2]+V[X+2],ee=K+j,T=A+ne<<0,A=ne+ee<<0,K=(A>>>2|A<<30)^(A>>>13|A<<19)^(A>>>22|A<<10),se=(T>>>6|T<<26)^(T>>>11|T<<21)^(T>>>25|T<<7),ut=A&I,j=ut^A&x^He,fe=T&F^~T&L,ne=_+se+fe+d[X+3]+V[X+3],ee=K+j,_=g+ne<<0,g=ne+ee<<0,this.chromeBugWorkAround=!0;this.h0=this.h0+g<<0,this.h1=this.h1+A<<0,this.h2=this.h2+I<<0,this.h3=this.h3+x<<0,this.h4=this.h4+_<<0,this.h5=this.h5+T<<0,this.h6=this.h6+F<<0,this.h7=this.h7+L<<0},R.prototype.hex=function(){this.finalize();var g=this.h0,A=this.h1,I=this.h2,x=this.h3,_=this.h4,T=this.h5,F=this.h6,L=this.h7,V=c[g>>>28&15]+c[g>>>24&15]+c[g>>>20&15]+c[g>>>16&15]+c[g>>>12&15]+c[g>>>8&15]+c[g>>>4&15]+c[g&15]+c[A>>>28&15]+c[A>>>24&15]+c[A>>>20&15]+c[A>>>16&15]+c[A>>>12&15]+c[A>>>8&15]+c[A>>>4&15]+c[A&15]+c[I>>>28&15]+c[I>>>24&15]+c[I>>>20&15]+c[I>>>16&15]+c[I>>>12&15]+c[I>>>8&15]+c[I>>>4&15]+c[I&15]+c[x>>>28&15]+c[x>>>24&15]+c[x>>>20&15]+c[x>>>16&15]+c[x>>>12&15]+c[x>>>8&15]+c[x>>>4&15]+c[x&15]+c[_>>>28&15]+c[_>>>24&15]+c[_>>>20&15]+c[_>>>16&15]+c[_>>>12&15]+c[_>>>8&15]+c[_>>>4&15]+c[_&15]+c[T>>>28&15]+c[T>>>24&15]+c[T>>>20&15]+c[T>>>16&15]+c[T>>>12&15]+c[T>>>8&15]+c[T>>>4&15]+c[T&15]+c[F>>>28&15]+c[F>>>24&15]+c[F>>>20&15]+c[F>>>16&15]+c[F>>>12&15]+c[F>>>8&15]+c[F>>>4&15]+c[F&15];return this.is224||(V+=c[L>>>28&15]+c[L>>>24&15]+c[L>>>20&15]+c[L>>>16&15]+c[L>>>12&15]+c[L>>>8&15]+c[L>>>4&15]+c[L&15]),V},R.prototype.toString=R.prototype.hex,R.prototype.digest=function(){this.finalize();var g=this.h0,A=this.h1,I=this.h2,x=this.h3,_=this.h4,T=this.h5,F=this.h6,L=this.h7,V=[g>>>24&255,g>>>16&255,g>>>8&255,g&255,A>>>24&255,A>>>16&255,A>>>8&255,A&255,I>>>24&255,I>>>16&255,I>>>8&255,I&255,x>>>24&255,x>>>16&255,x>>>8&255,x&255,_>>>24&255,_>>>16&255,_>>>8&255,_&255,T>>>24&255,T>>>16&255,T>>>8&255,T&255,F>>>24&255,F>>>16&255,F>>>8&255,F&255];return this.is224||V.push(L>>>24&255,L>>>16&255,L>>>8&255,L&255),V},R.prototype.array=R.prototype.digest,R.prototype.arrayBuffer=function(){this.finalize();var g=new ArrayBuffer(this.is224?28:32),A=new DataView(g);return A.setUint32(0,this.h0),A.setUint32(4,this.h1),A.setUint32(8,this.h2),A.setUint32(12,this.h3),A.setUint32(16,this.h4),A.setUint32(20,this.h5),A.setUint32(24,this.h6),this.is224||A.setUint32(28,this.h7),g};function w(g,A,I){var x,_=typeof g;if(_==="string"){var T=[],F=g.length,L=0,V;for(x=0;x<F;++x)V=g.charCodeAt(x),V<128?T[L++]=V:V<2048?(T[L++]=192|V>>>6,T[L++]=128|V&63):V<55296||V>=57344?(T[L++]=224|V>>>12,T[L++]=128|V>>>6&63,T[L++]=128|V&63):(V=65536+((V&1023)<<10|g.charCodeAt(++x)&1023),T[L++]=240|V>>>18,T[L++]=128|V>>>12&63,T[L++]=128|V>>>6&63,T[L++]=128|V&63);g=T}else if(_==="object"){if(g===null)throw new Error(e);if(o&&g.constructor===ArrayBuffer)g=new Uint8Array(g);else if(!Array.isArray(g)&&(!o||!ArrayBuffer.isView(g)))throw new Error(e)}else throw new Error(e);g.length>64&&(g=new R(A,!0).update(g).array());var X=[],K=[];for(x=0;x<64;++x){var se=g[x]||0;X[x]=92^se,K[x]=54^se}R.call(this,A,I),this.update(K),this.oKeyPad=X,this.inner=!0,this.sharedMemory=I}w.prototype=new R,w.prototype.finalize=function(){if(R.prototype.finalize.call(this),this.inner){this.inner=!1;var g=this.array();R.call(this,this.is224,this.sharedMemory),this.update(this.oKeyPad),this.update(g),R.prototype.finalize.call(this)}};var S=M();S.sha256=S,S.sha224=M(!0),S.sha256.hmac=P(),S.sha224.hmac=P(!0),a?i.exports=S:(n.sha256=S.sha256,n.sha224=S.sha224)})()})(Us)),Us.exports}var cu=ou();function lu(i){return cu.sha256(JSON.stringify(i.questions.map(({id:e,prompt:t,choices:n,correct:r,difficulty:s})=>({id:e,prompt:t,choices:n,correct:r,difficulty:s??null}))))}/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const po="181",uu=0,Bo=1,du=2,il=1,rl=2,Gn=3,ui=0,sn=1,vn=2,$n=0,Ki=1,ko=2,Vo=3,Go=4,hu=5,vi=100,fu=101,pu=102,mu=103,xu=104,gu=200,_u=201,vu=202,bu=203,va=204,ba=205,Mu=206,yu=207,Su=208,Eu=209,Tu=210,Au=211,wu=212,Ru=213,Cu=214,Ma=0,ya=1,Sa=2,er=3,Ea=4,Ta=5,Aa=6,wa=7,sl=0,Pu=1,Lu=2,oi=0,Du=1,Iu=2,Uu=3,al=4,Fu=5,Nu=6,Ou=7,ol=300,tr=301,nr=302,Ra=303,Ca=304,Ms=306,hs=1e3,qn=1001,Pa=1002,un=1003,zu=1004,Or=1005,fn=1006,Fs=1007,Mi=1008,Un=1009,cl=1010,ll=1011,Tr=1012,mo=1013,Si=1014,Ln=1015,ar=1016,xo=1017,go=1018,Ar=1020,ul=35902,dl=35899,hl=1021,fl=1022,Mn=1023,wr=1026,Rr=1027,_o=1028,vo=1029,bo=1030,Mo=1031,yo=1033,as=33776,os=33777,cs=33778,ls=33779,La=35840,Da=35841,Ia=35842,Ua=35843,Fa=36196,Na=37492,Oa=37496,za=37808,Ba=37809,ka=37810,Va=37811,Ga=37812,Ha=37813,Wa=37814,Xa=37815,qa=37816,$a=37817,Ya=37818,ja=37819,Ka=37820,Za=37821,Ja=36492,Qa=36494,eo=36495,to=36283,no=36284,io=36285,ro=36286,Bu=3200,ku=3201,pl=0,Vu=1,si="",Jt="srgb",ir="srgb-linear",fs="linear",mt="srgb",Li=7680,Ho=519,Gu=512,Hu=513,Wu=514,ml=515,Xu=516,qu=517,$u=518,Yu=519,Wo=35044,Xo="300 es",Dn=2e3,ps=2001;function xl(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function ms(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function ju(){const i=ms("canvas");return i.style.display="block",i}const qo={};function $o(...i){const e="THREE."+i.shift();console.log(e,...i)}function je(...i){const e="THREE."+i.shift();console.warn(e,...i)}function wt(...i){const e="THREE."+i.shift();console.error(e,...i)}function Cr(...i){const e=i.join(" ");e in qo||(qo[e]=!0,je(...i))}function Ku(i,e,t){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}class or{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const r=n[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const r=n.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const Wt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Ns=Math.PI/180,xs=180/Math.PI;function Ur(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Wt[i&255]+Wt[i>>8&255]+Wt[i>>16&255]+Wt[i>>24&255]+"-"+Wt[e&255]+Wt[e>>8&255]+"-"+Wt[e>>16&15|64]+Wt[e>>24&255]+"-"+Wt[t&63|128]+Wt[t>>8&255]+"-"+Wt[t>>16&255]+Wt[t>>24&255]+Wt[n&255]+Wt[n>>8&255]+Wt[n>>16&255]+Wt[n>>24&255]).toLowerCase()}function ot(i,e,t){return Math.max(e,Math.min(t,i))}function Zu(i,e){return(i%e+e)%e}function Os(i,e,t){return(1-t)*i+t*e}function fr(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function tn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}class lt{constructor(e=0,t=0){lt.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ot(this.x,e.x,t.x),this.y=ot(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ot(this.x,e,t),this.y=ot(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ot(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(ot(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*r+e.x,this.y=s*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class cr{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,a,o){let c=n[r+0],l=n[r+1],u=n[r+2],d=n[r+3],f=s[a+0],p=s[a+1],v=s[a+2],M=s[a+3];if(o<=0){e[t+0]=c,e[t+1]=l,e[t+2]=u,e[t+3]=d;return}if(o>=1){e[t+0]=f,e[t+1]=p,e[t+2]=v,e[t+3]=M;return}if(d!==M||c!==f||l!==p||u!==v){let m=c*f+l*p+u*v+d*M;m<0&&(f=-f,p=-p,v=-v,M=-M,m=-m);let h=1-o;if(m<.9995){const P=Math.acos(m),R=Math.sin(P);h=Math.sin(h*P)/R,o=Math.sin(o*P)/R,c=c*h+f*o,l=l*h+p*o,u=u*h+v*o,d=d*h+M*o}else{c=c*h+f*o,l=l*h+p*o,u=u*h+v*o,d=d*h+M*o;const P=1/Math.sqrt(c*c+l*l+u*u+d*d);c*=P,l*=P,u*=P,d*=P}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,r,s,a){const o=n[r],c=n[r+1],l=n[r+2],u=n[r+3],d=s[a],f=s[a+1],p=s[a+2],v=s[a+3];return e[t]=o*v+u*d+c*p-l*f,e[t+1]=c*v+u*f+l*d-o*p,e[t+2]=l*v+u*p+o*f-c*d,e[t+3]=u*v-o*d-c*f-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),u=o(r/2),d=o(s/2),f=c(n/2),p=c(r/2),v=c(s/2);switch(a){case"XYZ":this._x=f*u*d+l*p*v,this._y=l*p*d-f*u*v,this._z=l*u*v+f*p*d,this._w=l*u*d-f*p*v;break;case"YXZ":this._x=f*u*d+l*p*v,this._y=l*p*d-f*u*v,this._z=l*u*v-f*p*d,this._w=l*u*d+f*p*v;break;case"ZXY":this._x=f*u*d-l*p*v,this._y=l*p*d+f*u*v,this._z=l*u*v+f*p*d,this._w=l*u*d-f*p*v;break;case"ZYX":this._x=f*u*d-l*p*v,this._y=l*p*d+f*u*v,this._z=l*u*v-f*p*d,this._w=l*u*d+f*p*v;break;case"YZX":this._x=f*u*d+l*p*v,this._y=l*p*d+f*u*v,this._z=l*u*v-f*p*d,this._w=l*u*d-f*p*v;break;case"XZY":this._x=f*u*d-l*p*v,this._y=l*p*d-f*u*v,this._z=l*u*v+f*p*d,this._w=l*u*d+f*p*v;break;default:je("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],r=t[4],s=t[8],a=t[1],o=t[5],c=t[9],l=t[2],u=t[6],d=t[10],f=n+o+d;if(f>0){const p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(u-c)*p,this._y=(s-l)*p,this._z=(a-r)*p}else if(n>o&&n>d){const p=2*Math.sqrt(1+n-o-d);this._w=(u-c)/p,this._x=.25*p,this._y=(r+a)/p,this._z=(s+l)/p}else if(o>d){const p=2*Math.sqrt(1+o-n-d);this._w=(s-l)/p,this._x=(r+a)/p,this._y=.25*p,this._z=(c+u)/p}else{const p=2*Math.sqrt(1+d-n-o);this._w=(a-r)/p,this._x=(s+l)/p,this._y=(c+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ot(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,r=e._y,s=e._z,a=e._w,o=t._x,c=t._y,l=t._z,u=t._w;return this._x=n*u+a*o+r*l-s*c,this._y=r*u+a*c+s*o-n*l,this._z=s*u+a*l+n*c-r*o,this._w=a*u-n*o-r*c-s*l,this._onChangeCallback(),this}slerp(e,t){if(t<=0)return this;if(t>=1)return this.copy(e);let n=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,s=-s,a=-a,o=-o);let c=1-t;if(o<.9995){const l=Math.acos(o),u=Math.sin(l);c=Math.sin(c*l)/u,t=Math.sin(t*l)/u,this._x=this._x*c+n*t,this._y=this._y*c+r*t,this._z=this._z*c+s*t,this._w=this._w*c+a*t,this._onChangeCallback()}else this._x=this._x*c+n*t,this._y=this._y*c+r*t,this._z=this._z*c+s*t,this._w=this._w*c+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class G{constructor(e=0,t=0,n=0){G.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Yo.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Yo.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,r=this.z,s=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*r-o*n),u=2*(o*t-s*r),d=2*(s*n-a*t);return this.x=t+c*l+a*d-o*u,this.y=n+c*u+o*l-s*d,this.z=r+c*d+s*u-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ot(this.x,e.x,t.x),this.y=ot(this.y,e.y,t.y),this.z=ot(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ot(this.x,e,t),this.y=ot(this.y,e,t),this.z=ot(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ot(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,r=e.y,s=e.z,a=t.x,o=t.y,c=t.z;return this.x=r*c-s*o,this.y=s*a-n*c,this.z=n*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return zs.copy(this).projectOnVector(e),this.sub(zs)}reflect(e){return this.sub(zs.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(ot(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const zs=new G,Yo=new cr;class Ke{constructor(e,t,n,r,s,a,o,c,l){Ke.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,c,l)}set(e,t,n,r,s,a,o,c,l){const u=this.elements;return u[0]=e,u[1]=r,u[2]=o,u[3]=t,u[4]=s,u[5]=c,u[6]=n,u[7]=a,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],u=n[4],d=n[7],f=n[2],p=n[5],v=n[8],M=r[0],m=r[3],h=r[6],P=r[1],R=r[4],w=r[7],S=r[2],g=r[5],A=r[8];return s[0]=a*M+o*P+c*S,s[3]=a*m+o*R+c*g,s[6]=a*h+o*w+c*A,s[1]=l*M+u*P+d*S,s[4]=l*m+u*R+d*g,s[7]=l*h+u*w+d*A,s[2]=f*M+p*P+v*S,s[5]=f*m+p*R+v*g,s[8]=f*h+p*w+v*A,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8];return t*a*u-t*o*l-n*s*u+n*o*c+r*s*l-r*a*c}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],d=u*a-o*l,f=o*c-u*s,p=l*s-a*c,v=t*d+n*f+r*p;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);const M=1/v;return e[0]=d*M,e[1]=(r*l-u*n)*M,e[2]=(o*n-r*a)*M,e[3]=f*M,e[4]=(u*t-r*c)*M,e[5]=(r*s-o*t)*M,e[6]=p*M,e[7]=(n*c-l*t)*M,e[8]=(a*t-n*s)*M,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,a,o){const c=Math.cos(s),l=Math.sin(s);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-r*l,r*c,-r*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Bs.makeScale(e,t)),this}rotate(e){return this.premultiply(Bs.makeRotation(-e)),this}translate(e,t){return this.premultiply(Bs.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Bs=new Ke,jo=new Ke().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ko=new Ke().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Ju(){const i={enabled:!0,workingColorSpace:ir,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===mt&&(r.r=Yn(r.r),r.g=Yn(r.g),r.b=Yn(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===mt&&(r.r=Zi(r.r),r.g=Zi(r.g),r.b=Zi(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===si?fs:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return Cr("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return Cr("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[ir]:{primaries:e,whitePoint:n,transfer:fs,toXYZ:jo,fromXYZ:Ko,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Jt},outputColorSpaceConfig:{drawingBufferColorSpace:Jt}},[Jt]:{primaries:e,whitePoint:n,transfer:mt,toXYZ:jo,fromXYZ:Ko,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Jt}}}),i}const dt=Ju();function Yn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Zi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Di;class Qu{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Di===void 0&&(Di=ms("canvas")),Di.width=e.width,Di.height=e.height;const r=Di.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),n=Di}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=ms("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Yn(s[a]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Yn(t[n]/255)*255):t[n]=Yn(t[n]);return{data:t,width:e.width,height:e.height}}else return je("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let ed=0;class So{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:ed++}),this.uuid=Ur(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(ks(r[a].image)):s.push(ks(r[a]))}else s=ks(r);n.url=s}return t||(e.images[this.uuid]=n),n}}function ks(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Qu.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(je("Texture: Unable to serialize Texture."),{})}let td=0;const Vs=new G;class Yt extends or{constructor(e=Yt.DEFAULT_IMAGE,t=Yt.DEFAULT_MAPPING,n=qn,r=qn,s=fn,a=Mi,o=Mn,c=Un,l=Yt.DEFAULT_ANISOTROPY,u=si){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:td++}),this.uuid=Ur(),this.name="",this.source=new So(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new lt(0,0),this.repeat=new lt(1,1),this.center=new lt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ke,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Vs).x}get height(){return this.source.getSize(Vs).y}get depth(){return this.source.getSize(Vs).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){je(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){je(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==ol)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case hs:e.x=e.x-Math.floor(e.x);break;case qn:e.x=e.x<0?0:1;break;case Pa:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case hs:e.y=e.y-Math.floor(e.y);break;case qn:e.y=e.y<0?0:1;break;case Pa:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Yt.DEFAULT_IMAGE=null;Yt.DEFAULT_MAPPING=ol;Yt.DEFAULT_ANISOTROPY=1;class xt{constructor(e=0,t=0,n=0,r=1){xt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s;const c=e.elements,l=c[0],u=c[4],d=c[8],f=c[1],p=c[5],v=c[9],M=c[2],m=c[6],h=c[10];if(Math.abs(u-f)<.01&&Math.abs(d-M)<.01&&Math.abs(v-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(d+M)<.1&&Math.abs(v+m)<.1&&Math.abs(l+p+h-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const R=(l+1)/2,w=(p+1)/2,S=(h+1)/2,g=(u+f)/4,A=(d+M)/4,I=(v+m)/4;return R>w&&R>S?R<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(R),r=g/n,s=A/n):w>S?w<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(w),n=g/r,s=I/r):S<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(S),n=A/s,r=I/s),this.set(n,r,s,t),this}let P=Math.sqrt((m-v)*(m-v)+(d-M)*(d-M)+(f-u)*(f-u));return Math.abs(P)<.001&&(P=1),this.x=(m-v)/P,this.y=(d-M)/P,this.z=(f-u)/P,this.w=Math.acos((l+p+h-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ot(this.x,e.x,t.x),this.y=ot(this.y,e.y,t.y),this.z=ot(this.z,e.z,t.z),this.w=ot(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ot(this.x,e,t),this.y=ot(this.y,e,t),this.z=ot(this.z,e,t),this.w=ot(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ot(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class nd extends or{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:fn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new xt(0,0,e,t),this.scissorTest=!1,this.viewport=new xt(0,0,e,t);const r={width:e,height:t,depth:n.depth},s=new Yt(r);this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:fn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new So(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ei extends nd{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class gl extends Yt{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=un,this.minFilter=un,this.wrapR=qn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class id extends Yt{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=un,this.minFilter=un,this.wrapR=qn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class wi{constructor(e=new G(1/0,1/0,1/0),t=new G(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(xn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(xn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=xn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,xn):xn.fromBufferAttribute(s,a),xn.applyMatrix4(e.matrixWorld),this.expandByPoint(xn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),zr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),zr.copy(n.boundingBox)),zr.applyMatrix4(e.matrixWorld),this.union(zr)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,xn),xn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(pr),Br.subVectors(this.max,pr),Ii.subVectors(e.a,pr),Ui.subVectors(e.b,pr),Fi.subVectors(e.c,pr),Zn.subVectors(Ui,Ii),Jn.subVectors(Fi,Ui),fi.subVectors(Ii,Fi);let t=[0,-Zn.z,Zn.y,0,-Jn.z,Jn.y,0,-fi.z,fi.y,Zn.z,0,-Zn.x,Jn.z,0,-Jn.x,fi.z,0,-fi.x,-Zn.y,Zn.x,0,-Jn.y,Jn.x,0,-fi.y,fi.x,0];return!Gs(t,Ii,Ui,Fi,Br)||(t=[1,0,0,0,1,0,0,0,1],!Gs(t,Ii,Ui,Fi,Br))?!1:(kr.crossVectors(Zn,Jn),t=[kr.x,kr.y,kr.z],Gs(t,Ii,Ui,Fi,Br))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,xn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(xn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Nn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Nn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Nn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Nn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Nn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Nn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Nn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Nn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Nn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Nn=[new G,new G,new G,new G,new G,new G,new G,new G],xn=new G,zr=new wi,Ii=new G,Ui=new G,Fi=new G,Zn=new G,Jn=new G,fi=new G,pr=new G,Br=new G,kr=new G,pi=new G;function Gs(i,e,t,n,r){for(let s=0,a=i.length-3;s<=a;s+=3){pi.fromArray(i,s);const o=r.x*Math.abs(pi.x)+r.y*Math.abs(pi.y)+r.z*Math.abs(pi.z),c=e.dot(pi),l=t.dot(pi),u=n.dot(pi);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>o)return!1}return!0}const rd=new wi,mr=new G,Hs=new G;class lr{constructor(e=new G,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):rd.setFromPoints(e).getCenter(n);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;mr.subVectors(e,this.center);const t=mr.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(mr,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Hs.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(mr.copy(e.center).add(Hs)),this.expandByPoint(mr.copy(e.center).sub(Hs))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const On=new G,Ws=new G,Vr=new G,Qn=new G,Xs=new G,Gr=new G,qs=new G;class Eo{constructor(e=new G,t=new G(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,On)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=On.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(On.copy(this.origin).addScaledVector(this.direction,t),On.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Ws.copy(e).add(t).multiplyScalar(.5),Vr.copy(t).sub(e).normalize(),Qn.copy(this.origin).sub(Ws);const s=e.distanceTo(t)*.5,a=-this.direction.dot(Vr),o=Qn.dot(this.direction),c=-Qn.dot(Vr),l=Qn.lengthSq(),u=Math.abs(1-a*a);let d,f,p,v;if(u>0)if(d=a*c-o,f=a*o-c,v=s*u,d>=0)if(f>=-v)if(f<=v){const M=1/u;d*=M,f*=M,p=d*(d+a*f+2*o)+f*(a*d+f+2*c)+l}else f=s,d=Math.max(0,-(a*f+o)),p=-d*d+f*(f+2*c)+l;else f=-s,d=Math.max(0,-(a*f+o)),p=-d*d+f*(f+2*c)+l;else f<=-v?(d=Math.max(0,-(-a*s+o)),f=d>0?-s:Math.min(Math.max(-s,-c),s),p=-d*d+f*(f+2*c)+l):f<=v?(d=0,f=Math.min(Math.max(-s,-c),s),p=f*(f+2*c)+l):(d=Math.max(0,-(a*s+o)),f=d>0?s:Math.min(Math.max(-s,-c),s),p=-d*d+f*(f+2*c)+l);else f=a>0?-s:s,d=Math.max(0,-(a*f+o)),p=-d*d+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(Ws).addScaledVector(Vr,f),p}intersectSphere(e,t){On.subVectors(e.center,this.origin);const n=On.dot(this.direction),r=On.dot(On)-n*n,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,a,o,c;const l=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,f=this.origin;return l>=0?(n=(e.min.x-f.x)*l,r=(e.max.x-f.x)*l):(n=(e.max.x-f.x)*l,r=(e.min.x-f.x)*l),u>=0?(s=(e.min.y-f.y)*u,a=(e.max.y-f.y)*u):(s=(e.max.y-f.y)*u,a=(e.min.y-f.y)*u),n>a||s>r||((s>n||isNaN(n))&&(n=s),(a<r||isNaN(r))&&(r=a),d>=0?(o=(e.min.z-f.z)*d,c=(e.max.z-f.z)*d):(o=(e.max.z-f.z)*d,c=(e.min.z-f.z)*d),n>c||o>r)||((o>n||n!==n)&&(n=o),(c<r||r!==r)&&(r=c),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,On)!==null}intersectTriangle(e,t,n,r,s){Xs.subVectors(t,e),Gr.subVectors(n,e),qs.crossVectors(Xs,Gr);let a=this.direction.dot(qs),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Qn.subVectors(this.origin,e);const c=o*this.direction.dot(Gr.crossVectors(Qn,Gr));if(c<0)return null;const l=o*this.direction.dot(Xs.cross(Qn));if(l<0||c+l>a)return null;const u=-o*Qn.dot(qs);return u<0?null:this.at(u/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class gt{constructor(e,t,n,r,s,a,o,c,l,u,d,f,p,v,M,m){gt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,c,l,u,d,f,p,v,M,m)}set(e,t,n,r,s,a,o,c,l,u,d,f,p,v,M,m){const h=this.elements;return h[0]=e,h[4]=t,h[8]=n,h[12]=r,h[1]=s,h[5]=a,h[9]=o,h[13]=c,h[2]=l,h[6]=u,h[10]=d,h[14]=f,h[3]=p,h[7]=v,h[11]=M,h[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new gt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,r=1/Ni.setFromMatrixColumn(e,0).length(),s=1/Ni.setFromMatrixColumn(e,1).length(),a=1/Ni.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,r=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(r),l=Math.sin(r),u=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const f=a*u,p=a*d,v=o*u,M=o*d;t[0]=c*u,t[4]=-c*d,t[8]=l,t[1]=p+v*l,t[5]=f-M*l,t[9]=-o*c,t[2]=M-f*l,t[6]=v+p*l,t[10]=a*c}else if(e.order==="YXZ"){const f=c*u,p=c*d,v=l*u,M=l*d;t[0]=f+M*o,t[4]=v*o-p,t[8]=a*l,t[1]=a*d,t[5]=a*u,t[9]=-o,t[2]=p*o-v,t[6]=M+f*o,t[10]=a*c}else if(e.order==="ZXY"){const f=c*u,p=c*d,v=l*u,M=l*d;t[0]=f-M*o,t[4]=-a*d,t[8]=v+p*o,t[1]=p+v*o,t[5]=a*u,t[9]=M-f*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const f=a*u,p=a*d,v=o*u,M=o*d;t[0]=c*u,t[4]=v*l-p,t[8]=f*l+M,t[1]=c*d,t[5]=M*l+f,t[9]=p*l-v,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const f=a*c,p=a*l,v=o*c,M=o*l;t[0]=c*u,t[4]=M-f*d,t[8]=v*d+p,t[1]=d,t[5]=a*u,t[9]=-o*u,t[2]=-l*u,t[6]=p*d+v,t[10]=f-M*d}else if(e.order==="XZY"){const f=a*c,p=a*l,v=o*c,M=o*l;t[0]=c*u,t[4]=-d,t[8]=l*u,t[1]=f*d+M,t[5]=a*u,t[9]=p*d-v,t[2]=v*d-p,t[6]=o*u,t[10]=M*d+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(sd,e,ad)}lookAt(e,t,n){const r=this.elements;return on.subVectors(e,t),on.lengthSq()===0&&(on.z=1),on.normalize(),ei.crossVectors(n,on),ei.lengthSq()===0&&(Math.abs(n.z)===1?on.x+=1e-4:on.z+=1e-4,on.normalize(),ei.crossVectors(n,on)),ei.normalize(),Hr.crossVectors(on,ei),r[0]=ei.x,r[4]=Hr.x,r[8]=on.x,r[1]=ei.y,r[5]=Hr.y,r[9]=on.y,r[2]=ei.z,r[6]=Hr.z,r[10]=on.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],u=n[1],d=n[5],f=n[9],p=n[13],v=n[2],M=n[6],m=n[10],h=n[14],P=n[3],R=n[7],w=n[11],S=n[15],g=r[0],A=r[4],I=r[8],x=r[12],_=r[1],T=r[5],F=r[9],L=r[13],V=r[2],X=r[6],K=r[10],se=r[14],j=r[3],ne=r[7],ee=r[11],fe=r[15];return s[0]=a*g+o*_+c*V+l*j,s[4]=a*A+o*T+c*X+l*ne,s[8]=a*I+o*F+c*K+l*ee,s[12]=a*x+o*L+c*se+l*fe,s[1]=u*g+d*_+f*V+p*j,s[5]=u*A+d*T+f*X+p*ne,s[9]=u*I+d*F+f*K+p*ee,s[13]=u*x+d*L+f*se+p*fe,s[2]=v*g+M*_+m*V+h*j,s[6]=v*A+M*T+m*X+h*ne,s[10]=v*I+M*F+m*K+h*ee,s[14]=v*x+M*L+m*se+h*fe,s[3]=P*g+R*_+w*V+S*j,s[7]=P*A+R*T+w*X+S*ne,s[11]=P*I+R*F+w*K+S*ee,s[15]=P*x+R*L+w*se+S*fe,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],a=e[1],o=e[5],c=e[9],l=e[13],u=e[2],d=e[6],f=e[10],p=e[14],v=e[3],M=e[7],m=e[11],h=e[15];return v*(+s*c*d-r*l*d-s*o*f+n*l*f+r*o*p-n*c*p)+M*(+t*c*p-t*l*f+s*a*f-r*a*p+r*l*u-s*c*u)+m*(+t*l*d-t*o*p-s*a*d+n*a*p+s*o*u-n*l*u)+h*(-r*o*u-t*c*d+t*o*f+r*a*d-n*a*f+n*c*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],d=e[9],f=e[10],p=e[11],v=e[12],M=e[13],m=e[14],h=e[15],P=d*m*l-M*f*l+M*c*p-o*m*p-d*c*h+o*f*h,R=v*f*l-u*m*l-v*c*p+a*m*p+u*c*h-a*f*h,w=u*M*l-v*d*l+v*o*p-a*M*p-u*o*h+a*d*h,S=v*d*c-u*M*c-v*o*f+a*M*f+u*o*m-a*d*m,g=t*P+n*R+r*w+s*S;if(g===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/g;return e[0]=P*A,e[1]=(M*f*s-d*m*s-M*r*p+n*m*p+d*r*h-n*f*h)*A,e[2]=(o*m*s-M*c*s+M*r*l-n*m*l-o*r*h+n*c*h)*A,e[3]=(d*c*s-o*f*s-d*r*l+n*f*l+o*r*p-n*c*p)*A,e[4]=R*A,e[5]=(u*m*s-v*f*s+v*r*p-t*m*p-u*r*h+t*f*h)*A,e[6]=(v*c*s-a*m*s-v*r*l+t*m*l+a*r*h-t*c*h)*A,e[7]=(a*f*s-u*c*s+u*r*l-t*f*l-a*r*p+t*c*p)*A,e[8]=w*A,e[9]=(v*d*s-u*M*s-v*n*p+t*M*p+u*n*h-t*d*h)*A,e[10]=(a*M*s-v*o*s+v*n*l-t*M*l-a*n*h+t*o*h)*A,e[11]=(u*o*s-a*d*s-u*n*l+t*d*l+a*n*p-t*o*p)*A,e[12]=S*A,e[13]=(u*M*r-v*d*r+v*n*f-t*M*f-u*n*m+t*d*m)*A,e[14]=(v*o*r-a*M*r-v*n*c+t*M*c+a*n*m-t*o*m)*A,e[15]=(a*d*r-u*o*r+u*n*c-t*d*c-a*n*f+t*o*f)*A,this}scale(e){const t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),r=Math.sin(t),s=1-n,a=e.x,o=e.y,c=e.z,l=s*a,u=s*o;return this.set(l*a+n,l*o-r*c,l*c+r*o,0,l*o+r*c,u*o+n,u*c-r*a,0,l*c-r*o,u*c+r*a,s*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,a){return this.set(1,n,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){const r=this.elements,s=t._x,a=t._y,o=t._z,c=t._w,l=s+s,u=a+a,d=o+o,f=s*l,p=s*u,v=s*d,M=a*u,m=a*d,h=o*d,P=c*l,R=c*u,w=c*d,S=n.x,g=n.y,A=n.z;return r[0]=(1-(M+h))*S,r[1]=(p+w)*S,r[2]=(v-R)*S,r[3]=0,r[4]=(p-w)*g,r[5]=(1-(f+h))*g,r[6]=(m+P)*g,r[7]=0,r[8]=(v+R)*A,r[9]=(m-P)*A,r[10]=(1-(f+M))*A,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){const r=this.elements;let s=Ni.set(r[0],r[1],r[2]).length();const a=Ni.set(r[4],r[5],r[6]).length(),o=Ni.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],gn.copy(this);const l=1/s,u=1/a,d=1/o;return gn.elements[0]*=l,gn.elements[1]*=l,gn.elements[2]*=l,gn.elements[4]*=u,gn.elements[5]*=u,gn.elements[6]*=u,gn.elements[8]*=d,gn.elements[9]*=d,gn.elements[10]*=d,t.setFromRotationMatrix(gn),n.x=s,n.y=a,n.z=o,this}makePerspective(e,t,n,r,s,a,o=Dn,c=!1){const l=this.elements,u=2*s/(t-e),d=2*s/(n-r),f=(t+e)/(t-e),p=(n+r)/(n-r);let v,M;if(c)v=s/(a-s),M=a*s/(a-s);else if(o===Dn)v=-(a+s)/(a-s),M=-2*a*s/(a-s);else if(o===ps)v=-a/(a-s),M=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=d,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=v,l[14]=M,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,r,s,a,o=Dn,c=!1){const l=this.elements,u=2/(t-e),d=2/(n-r),f=-(t+e)/(t-e),p=-(n+r)/(n-r);let v,M;if(c)v=1/(a-s),M=a/(a-s);else if(o===Dn)v=-2/(a-s),M=-(a+s)/(a-s);else if(o===ps)v=-1/(a-s),M=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=0,l[12]=f,l[1]=0,l[5]=d,l[9]=0,l[13]=p,l[2]=0,l[6]=0,l[10]=v,l[14]=M,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Ni=new G,gn=new gt,sd=new G(0,0,0),ad=new G(1,1,1),ei=new G,Hr=new G,on=new G,Zo=new gt,Jo=new cr;class Sn{constructor(e=0,t=0,n=0,r=Sn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],c=r[1],l=r[5],u=r[9],d=r[2],f=r[6],p=r[10];switch(t){case"XYZ":this._y=Math.asin(ot(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-ot(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(ot(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-ot(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(ot(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-ot(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,p),this._y=0);break;default:je("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Zo.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Zo,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Jo.setFromEuler(this),this.setFromQuaternion(Jo,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Sn.DEFAULT_ORDER="XYZ";class To{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let od=0;const Qo=new G,Oi=new cr,zn=new gt,Wr=new G,xr=new G,cd=new G,ld=new cr,ec=new G(1,0,0),tc=new G(0,1,0),nc=new G(0,0,1),ic={type:"added"},ud={type:"removed"},zi={type:"childadded",child:null},$s={type:"childremoved",child:null};class Rt extends or{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:od++}),this.uuid=Ur(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Rt.DEFAULT_UP.clone();const e=new G,t=new Sn,n=new cr,r=new G(1,1,1);function s(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new gt},normalMatrix:{value:new Ke}}),this.matrix=new gt,this.matrixWorld=new gt,this.matrixAutoUpdate=Rt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Rt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new To,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Oi.setFromAxisAngle(e,t),this.quaternion.multiply(Oi),this}rotateOnWorldAxis(e,t){return Oi.setFromAxisAngle(e,t),this.quaternion.premultiply(Oi),this}rotateX(e){return this.rotateOnAxis(ec,e)}rotateY(e){return this.rotateOnAxis(tc,e)}rotateZ(e){return this.rotateOnAxis(nc,e)}translateOnAxis(e,t){return Qo.copy(e).applyQuaternion(this.quaternion),this.position.add(Qo.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(ec,e)}translateY(e){return this.translateOnAxis(tc,e)}translateZ(e){return this.translateOnAxis(nc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(zn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Wr.copy(e):Wr.set(e,t,n);const r=this.parent;this.updateWorldMatrix(!0,!1),xr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?zn.lookAt(xr,Wr,this.up):zn.lookAt(Wr,xr,this.up),this.quaternion.setFromRotationMatrix(zn),r&&(zn.extractRotation(r.matrixWorld),Oi.setFromRotationMatrix(zn),this.quaternion.premultiply(Oi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(wt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(ic),zi.child=e,this.dispatchEvent(zi),zi.child=null):wt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(ud),$s.child=e,this.dispatchEvent($s),$s.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),zn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),zn.multiply(e.parent.matrixWorld)),e.applyMatrix4(zn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(ic),zi.child=e,this.dispatchEvent(zi),zi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(xr,e,cd),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(xr,ld,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const d=c[l];s(e.shapes,d)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(s(e.materials,this.material[c]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];r.animations.push(s(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),l=a(e.textures),u=a(e.images),d=a(e.shapes),f=a(e.skeletons),p=a(e.animations),v=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),f.length>0&&(n.skeletons=f),p.length>0&&(n.animations=p),v.length>0&&(n.nodes=v)}return n.object=r,n;function a(o){const c=[];for(const l in o){const u=o[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const r=e.children[n];this.add(r.clone())}return this}}Rt.DEFAULT_UP=new G(0,1,0);Rt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Rt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const _n=new G,Bn=new G,Ys=new G,kn=new G,Bi=new G,ki=new G,rc=new G,js=new G,Ks=new G,Zs=new G,Js=new xt,Qs=new xt,ea=new xt;class bn{constructor(e=new G,t=new G,n=new G){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),_n.subVectors(e,t),r.cross(_n);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){_n.subVectors(r,t),Bn.subVectors(n,t),Ys.subVectors(e,t);const a=_n.dot(_n),o=_n.dot(Bn),c=_n.dot(Ys),l=Bn.dot(Bn),u=Bn.dot(Ys),d=a*l-o*o;if(d===0)return s.set(0,0,0),null;const f=1/d,p=(l*c-o*u)*f,v=(a*u-o*c)*f;return s.set(1-p-v,v,p)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,kn)===null?!1:kn.x>=0&&kn.y>=0&&kn.x+kn.y<=1}static getInterpolation(e,t,n,r,s,a,o,c){return this.getBarycoord(e,t,n,r,kn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,kn.x),c.addScaledVector(a,kn.y),c.addScaledVector(o,kn.z),c)}static getInterpolatedAttribute(e,t,n,r,s,a){return Js.setScalar(0),Qs.setScalar(0),ea.setScalar(0),Js.fromBufferAttribute(e,t),Qs.fromBufferAttribute(e,n),ea.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Js,s.x),a.addScaledVector(Qs,s.y),a.addScaledVector(ea,s.z),a}static isFrontFacing(e,t,n,r){return _n.subVectors(n,t),Bn.subVectors(e,t),_n.cross(Bn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return _n.subVectors(this.c,this.b),Bn.subVectors(this.a,this.b),_n.cross(Bn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return bn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return bn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,s){return bn.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return bn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return bn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,r=this.b,s=this.c;let a,o;Bi.subVectors(r,n),ki.subVectors(s,n),js.subVectors(e,n);const c=Bi.dot(js),l=ki.dot(js);if(c<=0&&l<=0)return t.copy(n);Ks.subVectors(e,r);const u=Bi.dot(Ks),d=ki.dot(Ks);if(u>=0&&d<=u)return t.copy(r);const f=c*d-u*l;if(f<=0&&c>=0&&u<=0)return a=c/(c-u),t.copy(n).addScaledVector(Bi,a);Zs.subVectors(e,s);const p=Bi.dot(Zs),v=ki.dot(Zs);if(v>=0&&p<=v)return t.copy(s);const M=p*l-c*v;if(M<=0&&l>=0&&v<=0)return o=l/(l-v),t.copy(n).addScaledVector(ki,o);const m=u*v-p*d;if(m<=0&&d-u>=0&&p-v>=0)return rc.subVectors(s,r),o=(d-u)/(d-u+(p-v)),t.copy(r).addScaledVector(rc,o);const h=1/(m+M+f);return a=M*h,o=f*h,t.copy(n).addScaledVector(Bi,a).addScaledVector(ki,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const _l={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ti={h:0,s:0,l:0},Xr={h:0,s:0,l:0};function ta(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class ct{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Jt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,dt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=dt.workingColorSpace){return this.r=e,this.g=t,this.b=n,dt.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=dt.workingColorSpace){if(e=Zu(e,1),t=ot(t,0,1),n=ot(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=ta(a,s,e+1/3),this.g=ta(a,s,e),this.b=ta(a,s,e-1/3)}return dt.colorSpaceToWorking(this,r),this}setStyle(e,t=Jt){function n(s){s!==void 0&&parseFloat(s)<1&&je("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:je("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);je("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Jt){const n=_l[e.toLowerCase()];return n!==void 0?this.setHex(n,t):je("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Yn(e.r),this.g=Yn(e.g),this.b=Yn(e.b),this}copyLinearToSRGB(e){return this.r=Zi(e.r),this.g=Zi(e.g),this.b=Zi(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Jt){return dt.workingToColorSpace(Xt.copy(this),e),Math.round(ot(Xt.r*255,0,255))*65536+Math.round(ot(Xt.g*255,0,255))*256+Math.round(ot(Xt.b*255,0,255))}getHexString(e=Jt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=dt.workingColorSpace){dt.workingToColorSpace(Xt.copy(this),t);const n=Xt.r,r=Xt.g,s=Xt.b,a=Math.max(n,r,s),o=Math.min(n,r,s);let c,l;const u=(o+a)/2;if(o===a)c=0,l=0;else{const d=a-o;switch(l=u<=.5?d/(a+o):d/(2-a-o),a){case n:c=(r-s)/d+(r<s?6:0);break;case r:c=(s-n)/d+2;break;case s:c=(n-r)/d+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=dt.workingColorSpace){return dt.workingToColorSpace(Xt.copy(this),t),e.r=Xt.r,e.g=Xt.g,e.b=Xt.b,e}getStyle(e=Jt){dt.workingToColorSpace(Xt.copy(this),e);const t=Xt.r,n=Xt.g,r=Xt.b;return e!==Jt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(ti),this.setHSL(ti.h+e,ti.s+t,ti.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(ti),e.getHSL(Xr);const n=Os(ti.h,Xr.h,t),r=Os(ti.s,Xr.s,t),s=Os(ti.l,Xr.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Xt=new ct;ct.NAMES=_l;let dd=0;class ur extends or{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:dd++}),this.uuid=Ur(),this.name="",this.type="Material",this.blending=Ki,this.side=ui,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=va,this.blendDst=ba,this.blendEquation=vi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ct(0,0,0),this.blendAlpha=0,this.depthFunc=er,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ho,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Li,this.stencilZFail=Li,this.stencilZPass=Li,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){je(`Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){je(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ki&&(n.blending=this.blending),this.side!==ui&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==va&&(n.blendSrc=this.blendSrc),this.blendDst!==ba&&(n.blendDst=this.blendDst),this.blendEquation!==vi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==er&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ho&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Li&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Li&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Li&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const a=[];for(const o in s){const c=s[o];delete c.metadata,a.push(c)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class $i extends ur{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ct(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Sn,this.combine=sl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Lt=new G,qr=new lt;let hd=0;class mn{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:hd++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Wo,this.updateRanges=[],this.gpuType=Ln,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)qr.fromBufferAttribute(this,t),qr.applyMatrix3(e),this.setXY(t,qr.x,qr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Lt.fromBufferAttribute(this,t),Lt.applyMatrix3(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Lt.fromBufferAttribute(this,t),Lt.applyMatrix4(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Lt.fromBufferAttribute(this,t),Lt.applyNormalMatrix(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Lt.fromBufferAttribute(this,t),Lt.transformDirection(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=fr(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=tn(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=fr(t,this.array)),t}setX(e,t){return this.normalized&&(t=tn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=fr(t,this.array)),t}setY(e,t){return this.normalized&&(t=tn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=fr(t,this.array)),t}setZ(e,t){return this.normalized&&(t=tn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=fr(t,this.array)),t}setW(e,t){return this.normalized&&(t=tn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=tn(t,this.array),n=tn(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=tn(t,this.array),n=tn(n,this.array),r=tn(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=tn(t,this.array),n=tn(n,this.array),r=tn(r,this.array),s=tn(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Wo&&(e.usage=this.usage),e}}class vl extends mn{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class bl extends mn{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class At extends mn{constructor(e,t,n){super(new Float32Array(e),t,n)}}let fd=0;const dn=new gt,na=new Rt,Vi=new G,cn=new wi,gr=new wi,zt=new G;class jt extends or{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:fd++}),this.uuid=Ur(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(xl(e)?bl:vl)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Ke().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return dn.makeRotationFromQuaternion(e),this.applyMatrix4(dn),this}rotateX(e){return dn.makeRotationX(e),this.applyMatrix4(dn),this}rotateY(e){return dn.makeRotationY(e),this.applyMatrix4(dn),this}rotateZ(e){return dn.makeRotationZ(e),this.applyMatrix4(dn),this}translate(e,t,n){return dn.makeTranslation(e,t,n),this.applyMatrix4(dn),this}scale(e,t,n){return dn.makeScale(e,t,n),this.applyMatrix4(dn),this}lookAt(e){return na.lookAt(e),na.updateMatrix(),this.applyMatrix4(na.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Vi).negate(),this.translate(Vi.x,Vi.y,Vi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new At(n,3))}else{const n=Math.min(e.length,t.count);for(let r=0;r<n;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&je("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new wi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){wt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new G(-1/0,-1/0,-1/0),new G(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){const s=t[n];cn.setFromBufferAttribute(s),this.morphTargetsRelative?(zt.addVectors(this.boundingBox.min,cn.min),this.boundingBox.expandByPoint(zt),zt.addVectors(this.boundingBox.max,cn.max),this.boundingBox.expandByPoint(zt)):(this.boundingBox.expandByPoint(cn.min),this.boundingBox.expandByPoint(cn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&wt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new lr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){wt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new G,1/0);return}if(e){const n=this.boundingSphere.center;if(cn.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];gr.setFromBufferAttribute(o),this.morphTargetsRelative?(zt.addVectors(cn.min,gr.min),cn.expandByPoint(zt),zt.addVectors(cn.max,gr.max),cn.expandByPoint(zt)):(cn.expandByPoint(gr.min),cn.expandByPoint(gr.max))}cn.getCenter(n);let r=0;for(let s=0,a=e.count;s<a;s++)zt.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(zt));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],c=this.morphTargetsRelative;for(let l=0,u=o.count;l<u;l++)zt.fromBufferAttribute(o,l),c&&(Vi.fromBufferAttribute(e,l),zt.add(Vi)),r=Math.max(r,n.distanceToSquared(zt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&wt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){wt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new mn(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],c=[];for(let I=0;I<n.count;I++)o[I]=new G,c[I]=new G;const l=new G,u=new G,d=new G,f=new lt,p=new lt,v=new lt,M=new G,m=new G;function h(I,x,_){l.fromBufferAttribute(n,I),u.fromBufferAttribute(n,x),d.fromBufferAttribute(n,_),f.fromBufferAttribute(s,I),p.fromBufferAttribute(s,x),v.fromBufferAttribute(s,_),u.sub(l),d.sub(l),p.sub(f),v.sub(f);const T=1/(p.x*v.y-v.x*p.y);isFinite(T)&&(M.copy(u).multiplyScalar(v.y).addScaledVector(d,-p.y).multiplyScalar(T),m.copy(d).multiplyScalar(p.x).addScaledVector(u,-v.x).multiplyScalar(T),o[I].add(M),o[x].add(M),o[_].add(M),c[I].add(m),c[x].add(m),c[_].add(m))}let P=this.groups;P.length===0&&(P=[{start:0,count:e.count}]);for(let I=0,x=P.length;I<x;++I){const _=P[I],T=_.start,F=_.count;for(let L=T,V=T+F;L<V;L+=3)h(e.getX(L+0),e.getX(L+1),e.getX(L+2))}const R=new G,w=new G,S=new G,g=new G;function A(I){S.fromBufferAttribute(r,I),g.copy(S);const x=o[I];R.copy(x),R.sub(S.multiplyScalar(S.dot(x))).normalize(),w.crossVectors(g,x);const T=w.dot(c[I])<0?-1:1;a.setXYZW(I,R.x,R.y,R.z,T)}for(let I=0,x=P.length;I<x;++I){const _=P[I],T=_.start,F=_.count;for(let L=T,V=T+F;L<V;L+=3)A(e.getX(L+0)),A(e.getX(L+1)),A(e.getX(L+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new mn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,p=n.count;f<p;f++)n.setXYZ(f,0,0,0);const r=new G,s=new G,a=new G,o=new G,c=new G,l=new G,u=new G,d=new G;if(e)for(let f=0,p=e.count;f<p;f+=3){const v=e.getX(f+0),M=e.getX(f+1),m=e.getX(f+2);r.fromBufferAttribute(t,v),s.fromBufferAttribute(t,M),a.fromBufferAttribute(t,m),u.subVectors(a,s),d.subVectors(r,s),u.cross(d),o.fromBufferAttribute(n,v),c.fromBufferAttribute(n,M),l.fromBufferAttribute(n,m),o.add(u),c.add(u),l.add(u),n.setXYZ(v,o.x,o.y,o.z),n.setXYZ(M,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let f=0,p=t.count;f<p;f+=3)r.fromBufferAttribute(t,f+0),s.fromBufferAttribute(t,f+1),a.fromBufferAttribute(t,f+2),u.subVectors(a,s),d.subVectors(r,s),u.cross(d),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)zt.fromBufferAttribute(e,t),zt.normalize(),e.setXYZ(t,zt.x,zt.y,zt.z)}toNonIndexed(){function e(o,c){const l=o.array,u=o.itemSize,d=o.normalized,f=new l.constructor(c.length*u);let p=0,v=0;for(let M=0,m=c.length;M<m;M++){o.isInterleavedBufferAttribute?p=c[M]*o.data.stride+o.offset:p=c[M]*u;for(let h=0;h<u;h++)f[v++]=l[p++]}return new mn(f,u,d)}if(this.index===null)return je("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new jt,n=this.index.array,r=this.attributes;for(const o in r){const c=r[o],l=e(c,n);t.setAttribute(o,l)}const s=this.morphAttributes;for(const o in s){const c=[],l=s[o];for(let u=0,d=l.length;u<d;u++){const f=l[u],p=e(f,n);c.push(p)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const r={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let d=0,f=l.length;d<f;d++){const p=l[d];u.push(p.toJSON(e.data))}u.length>0&&(r[c]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const r=e.attributes;for(const l in r){const u=r[l];this.setAttribute(l,u.clone(t))}const s=e.morphAttributes;for(const l in s){const u=[],d=s[l];for(let f=0,p=d.length;f<p;f++)u.push(d[f].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,u=a.length;l<u;l++){const d=a[l];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const sc=new gt,mi=new Eo,$r=new lr,ac=new G,Yr=new G,jr=new G,Kr=new G,ia=new G,Zr=new G,oc=new G,Jr=new G;class rn extends Rt{constructor(e=new jt,t=new $i){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){Zr.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const u=o[c],d=s[c];u!==0&&(ia.fromBufferAttribute(d,e),a?Zr.addScaledVector(ia,u):Zr.addScaledVector(ia.sub(t),u))}t.add(Zr)}return t}raycast(e,t){const n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),$r.copy(n.boundingSphere),$r.applyMatrix4(s),mi.copy(e.ray).recast(e.near),!($r.containsPoint(mi.origin)===!1&&(mi.intersectSphere($r,ac)===null||mi.origin.distanceToSquared(ac)>(e.far-e.near)**2))&&(sc.copy(s).invert(),mi.copy(e.ray).applyMatrix4(sc),!(n.boundingBox!==null&&mi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,mi)))}_computeIntersections(e,t,n){let r;const s=this.geometry,a=this.material,o=s.index,c=s.attributes.position,l=s.attributes.uv,u=s.attributes.uv1,d=s.attributes.normal,f=s.groups,p=s.drawRange;if(o!==null)if(Array.isArray(a))for(let v=0,M=f.length;v<M;v++){const m=f[v],h=a[m.materialIndex],P=Math.max(m.start,p.start),R=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let w=P,S=R;w<S;w+=3){const g=o.getX(w),A=o.getX(w+1),I=o.getX(w+2);r=Qr(this,h,e,n,l,u,d,g,A,I),r&&(r.faceIndex=Math.floor(w/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const v=Math.max(0,p.start),M=Math.min(o.count,p.start+p.count);for(let m=v,h=M;m<h;m+=3){const P=o.getX(m),R=o.getX(m+1),w=o.getX(m+2);r=Qr(this,a,e,n,l,u,d,P,R,w),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(a))for(let v=0,M=f.length;v<M;v++){const m=f[v],h=a[m.materialIndex],P=Math.max(m.start,p.start),R=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let w=P,S=R;w<S;w+=3){const g=w,A=w+1,I=w+2;r=Qr(this,h,e,n,l,u,d,g,A,I),r&&(r.faceIndex=Math.floor(w/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const v=Math.max(0,p.start),M=Math.min(c.count,p.start+p.count);for(let m=v,h=M;m<h;m+=3){const P=m,R=m+1,w=m+2;r=Qr(this,a,e,n,l,u,d,P,R,w),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}}function pd(i,e,t,n,r,s,a,o){let c;if(e.side===sn?c=n.intersectTriangle(a,s,r,!0,o):c=n.intersectTriangle(r,s,a,e.side===ui,o),c===null)return null;Jr.copy(o),Jr.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(Jr);return l<t.near||l>t.far?null:{distance:l,point:Jr.clone(),object:i}}function Qr(i,e,t,n,r,s,a,o,c,l){i.getVertexPosition(o,Yr),i.getVertexPosition(c,jr),i.getVertexPosition(l,Kr);const u=pd(i,e,t,n,Yr,jr,Kr,oc);if(u){const d=new G;bn.getBarycoord(oc,Yr,jr,Kr,d),r&&(u.uv=bn.getInterpolatedAttribute(r,o,c,l,d,new lt)),s&&(u.uv1=bn.getInterpolatedAttribute(s,o,c,l,d,new lt)),a&&(u.normal=bn.getInterpolatedAttribute(a,o,c,l,d,new G),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const f={a:o,b:c,c:l,normal:new G,materialIndex:0};bn.getNormal(Yr,jr,Kr,f.normal),u.face=f,u.barycoord=d}return u}class dr extends jt{constructor(e=1,t=1,n=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const c=[],l=[],u=[],d=[];let f=0,p=0;v("z","y","x",-1,-1,n,t,e,a,s,0),v("z","y","x",1,-1,n,t,-e,a,s,1),v("x","z","y",1,1,e,n,t,r,a,2),v("x","z","y",1,-1,e,n,-t,r,a,3),v("x","y","z",1,-1,e,t,n,r,s,4),v("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(c),this.setAttribute("position",new At(l,3)),this.setAttribute("normal",new At(u,3)),this.setAttribute("uv",new At(d,2));function v(M,m,h,P,R,w,S,g,A,I,x){const _=w/A,T=S/I,F=w/2,L=S/2,V=g/2,X=A+1,K=I+1;let se=0,j=0;const ne=new G;for(let ee=0;ee<K;ee++){const fe=ee*T-L;for(let Ce=0;Ce<X;Ce++){const Oe=Ce*_-F;ne[M]=Oe*P,ne[m]=fe*R,ne[h]=V,l.push(ne.x,ne.y,ne.z),ne[M]=0,ne[m]=0,ne[h]=g>0?1:-1,u.push(ne.x,ne.y,ne.z),d.push(Ce/A),d.push(1-ee/I),se+=1}}for(let ee=0;ee<I;ee++)for(let fe=0;fe<A;fe++){const Ce=f+fe+X*ee,Oe=f+fe+X*(ee+1),He=f+(fe+1)+X*(ee+1),ut=f+(fe+1)+X*ee;c.push(Ce,Oe,ut),c.push(Oe,He,ut),j+=6}o.addGroup(p,j,x),p+=j,f+=se}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new dr(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function rr(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const r=i[t][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(je("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone():Array.isArray(r)?e[t][n]=r.slice():e[t][n]=r}}return e}function Zt(i){const e={};for(let t=0;t<i.length;t++){const n=rr(i[t]);for(const r in n)e[r]=n[r]}return e}function md(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Ml(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:dt.workingColorSpace}const xd={clone:rr,merge:Zt};var gd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,_d=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Kn extends ur{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=gd,this.fragmentShader=_d,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=rr(e.uniforms),this.uniformsGroups=md(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class yl extends Rt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new gt,this.projectionMatrix=new gt,this.projectionMatrixInverse=new gt,this.coordinateSystem=Dn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const ni=new G,cc=new lt,lc=new lt;class nn extends yl{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=xs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Ns*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return xs*2*Math.atan(Math.tan(Ns*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){ni.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ni.x,ni.y).multiplyScalar(-e/ni.z),ni.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ni.x,ni.y).multiplyScalar(-e/ni.z)}getViewSize(e,t){return this.getViewBounds(e,cc,lc),t.subVectors(lc,cc)}setViewOffset(e,t,n,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Ns*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;s+=a.offsetX*r/c,t-=a.offsetY*n/l,r*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Gi=-90,Hi=1;class vd extends Rt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new nn(Gi,Hi,e,t);r.layers=this.layers,this.add(r);const s=new nn(Gi,Hi,e,t);s.layers=this.layers,this.add(s);const a=new nn(Gi,Hi,e,t);a.layers=this.layers,this.add(a);const o=new nn(Gi,Hi,e,t);o.layers=this.layers,this.add(o);const c=new nn(Gi,Hi,e,t);c.layers=this.layers,this.add(c);const l=new nn(Gi,Hi,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,r,s,a,o,c]=t;for(const l of t)this.remove(l);if(e===Dn)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===ps)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,c,l,u]=this.children,d=e.getRenderTarget(),f=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),v=e.xr.enabled;e.xr.enabled=!1;const M=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,r),e.render(t,s),e.setRenderTarget(n,1,r),e.render(t,a),e.setRenderTarget(n,2,r),e.render(t,o),e.setRenderTarget(n,3,r),e.render(t,c),e.setRenderTarget(n,4,r),e.render(t,l),n.texture.generateMipmaps=M,e.setRenderTarget(n,5,r),e.render(t,u),e.setRenderTarget(d,f,p),e.xr.enabled=v,n.texture.needsPMREMUpdate=!0}}class Sl extends Yt{constructor(e=[],t=tr,n,r,s,a,o,c,l,u){super(e,t,n,r,s,a,o,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class bd extends Ei{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Sl(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new dr(5,5,5),s=new Kn({name:"CubemapFromEquirect",uniforms:rr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:sn,blending:$n});s.uniforms.tEquirect.value=t;const a=new rn(r,s),o=t.minFilter;return t.minFilter===Mi&&(t.minFilter=fn),new vd(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,r);e.setRenderTarget(s)}}class Tt extends Rt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Md={type:"move"};class ra{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Tt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Tt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new G,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new G),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Tt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new G,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new G),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const M of e.hand.values()){const m=t.getJointPose(M,n),h=this._getHandJoint(l,M);m!==null&&(h.matrix.fromArray(m.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,h.jointRadius=m.radius),h.visible=m!==null}const u=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],f=u.position.distanceTo(d.position),p=.02,v=.005;l.inputState.pinching&&f>p+v?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&f<=p-v&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Md)))}return o!==null&&(o.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Tt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class Ao{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new ct(e),this.density=t}clone(){return new Ao(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class yd extends Rt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Sn,this.environmentIntensity=1,this.environmentRotation=new Sn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class El extends Yt{constructor(e=null,t=1,n=1,r,s,a,o,c,l=un,u=un,d,f){super(null,a,o,c,l,u,r,s,d,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class uc extends mn{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Wi=new gt,dc=new gt,es=[],hc=new wi,Sd=new gt,_r=new rn,vr=new lr;class Ed extends rn{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new uc(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<n;r++)this.setMatrixAt(r,Sd)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new wi),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Wi),hc.copy(e.boundingBox).applyMatrix4(Wi),this.boundingBox.union(hc)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new lr),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Wi),vr.copy(e.boundingSphere).applyMatrix4(Wi),this.boundingSphere.union(vr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,s=n.length+1,a=e*s+1;for(let o=0;o<n.length;o++)n[o]=r[a+o]}raycast(e,t){const n=this.matrixWorld,r=this.count;if(_r.geometry=this.geometry,_r.material=this.material,_r.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),vr.copy(this.boundingSphere),vr.applyMatrix4(n),e.ray.intersectsSphere(vr)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,Wi),dc.multiplyMatrices(n,Wi),_r.matrixWorld=dc,_r.raycast(e,es);for(let a=0,o=es.length;a<o;a++){const c=es[a];c.instanceId=s,c.object=this,t.push(c)}es.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new uc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new El(new Float32Array(r*this.count),r,this.count,_o,Ln));const s=this.morphTexture.source.data.data;let a=0;for(let l=0;l<n.length;l++)a+=n[l];const o=this.geometry.morphTargetsRelative?1:1-a,c=r*e;s[c]=o,s.set(n,c+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const sa=new G,Td=new G,Ad=new Ke;class ri{constructor(e=new G(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const r=sa.subVectors(n,t).cross(Td.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(sa),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Ad.getNormalMatrix(e),r=this.coplanarPoint(sa).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const xi=new lr,wd=new lt(.5,.5),ts=new G;class wo{constructor(e=new ri,t=new ri,n=new ri,r=new ri,s=new ri,a=new ri){this.planes=[e,t,n,r,s,a]}set(e,t,n,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Dn,n=!1){const r=this.planes,s=e.elements,a=s[0],o=s[1],c=s[2],l=s[3],u=s[4],d=s[5],f=s[6],p=s[7],v=s[8],M=s[9],m=s[10],h=s[11],P=s[12],R=s[13],w=s[14],S=s[15];if(r[0].setComponents(l-a,p-u,h-v,S-P).normalize(),r[1].setComponents(l+a,p+u,h+v,S+P).normalize(),r[2].setComponents(l+o,p+d,h+M,S+R).normalize(),r[3].setComponents(l-o,p-d,h-M,S-R).normalize(),n)r[4].setComponents(c,f,m,w).normalize(),r[5].setComponents(l-c,p-f,h-m,S-w).normalize();else if(r[4].setComponents(l-c,p-f,h-m,S-w).normalize(),t===Dn)r[5].setComponents(l+c,p+f,h+m,S+w).normalize();else if(t===ps)r[5].setComponents(c,f,m,w).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),xi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),xi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(xi)}intersectsSprite(e){xi.center.set(0,0,0);const t=wd.distanceTo(e.center);return xi.radius=.7071067811865476+t,xi.applyMatrix4(e.matrixWorld),this.intersectsSphere(xi)}intersectsSphere(e){const t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const r=t[n];if(ts.x=r.normal.x>0?e.max.x:e.min.x,ts.y=r.normal.y>0?e.max.y:e.min.y,ts.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(ts)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Tl extends ur{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ct(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const fc=new gt,so=new Eo,ns=new lr,is=new G;class Rd extends Rt{constructor(e=new jt,t=new Tl){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ns.copy(n.boundingSphere),ns.applyMatrix4(r),ns.radius+=s,e.ray.intersectsSphere(ns)===!1)return;fc.copy(r).invert(),so.copy(e.ray).applyMatrix4(fc);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,d=n.attributes.position;if(l!==null){const f=Math.max(0,a.start),p=Math.min(l.count,a.start+a.count);for(let v=f,M=p;v<M;v++){const m=l.getX(v);is.fromBufferAttribute(d,m),pc(is,m,c,r,e,t,this)}}else{const f=Math.max(0,a.start),p=Math.min(d.count,a.start+a.count);for(let v=f,M=p;v<M;v++)is.fromBufferAttribute(d,v),pc(is,v,c,r,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function pc(i,e,t,n,r,s,a){const o=so.distanceSqToPoint(i);if(o<t){const c=new G;so.closestPointToPoint(i,c),c.applyMatrix4(n);const l=r.ray.origin.distanceTo(c);if(l<r.near||l>r.far)return;s.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class aa extends Yt{constructor(e,t,n,r,s,a,o,c,l){super(e,t,n,r,s,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Al extends Yt{constructor(e,t,n=Si,r,s,a,o=un,c=un,l,u=wr,d=1){if(u!==wr&&u!==Rr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:e,height:t,depth:d};super(f,r,s,a,o,c,u,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new So(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class wl extends Yt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Yi extends jt{constructor(e=1,t=1,n=4,r=8,s=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:r,heightSegments:s},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),r=Math.max(3,Math.floor(r)),s=Math.max(1,Math.floor(s));const a=[],o=[],c=[],l=[],u=t/2,d=Math.PI/2*e,f=t,p=2*d+f,v=n*2+s,M=r+1,m=new G,h=new G;for(let P=0;P<=v;P++){let R=0,w=0,S=0,g=0;if(P<=n){const x=P/n,_=x*Math.PI/2;w=-u-e*Math.cos(_),S=e*Math.sin(_),g=-e*Math.cos(_),R=x*d}else if(P<=n+s){const x=(P-n)/s;w=-u+x*t,S=e,g=0,R=d+x*f}else{const x=(P-n-s)/n,_=x*Math.PI/2;w=u+e*Math.sin(_),S=e*Math.cos(_),g=e*Math.sin(_),R=d+f+x*d}const A=Math.max(0,Math.min(1,R/p));let I=0;P===0?I=.5/r:P===v&&(I=-.5/r);for(let x=0;x<=r;x++){const _=x/r,T=_*Math.PI*2,F=Math.sin(T),L=Math.cos(T);h.x=-S*L,h.y=w,h.z=S*F,o.push(h.x,h.y,h.z),m.set(-S*L,g,S*F),m.normalize(),c.push(m.x,m.y,m.z),l.push(_+I,A)}if(P>0){const x=(P-1)*M;for(let _=0;_<r;_++){const T=x+_,F=x+_+1,L=P*M+_,V=P*M+_+1;a.push(T,F,L),a.push(F,V,L)}}}this.setIndex(a),this.setAttribute("position",new At(o,3)),this.setAttribute("normal",new At(c,3)),this.setAttribute("uv",new At(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Yi(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}}class Hn extends jt{constructor(e=1,t=1,n=1,r=32,s=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:c};const l=this;r=Math.floor(r),s=Math.floor(s);const u=[],d=[],f=[],p=[];let v=0;const M=[],m=n/2;let h=0;P(),a===!1&&(e>0&&R(!0),t>0&&R(!1)),this.setIndex(u),this.setAttribute("position",new At(d,3)),this.setAttribute("normal",new At(f,3)),this.setAttribute("uv",new At(p,2));function P(){const w=new G,S=new G;let g=0;const A=(t-e)/n;for(let I=0;I<=s;I++){const x=[],_=I/s,T=_*(t-e)+e;for(let F=0;F<=r;F++){const L=F/r,V=L*c+o,X=Math.sin(V),K=Math.cos(V);S.x=T*X,S.y=-_*n+m,S.z=T*K,d.push(S.x,S.y,S.z),w.set(X,A,K).normalize(),f.push(w.x,w.y,w.z),p.push(L,1-_),x.push(v++)}M.push(x)}for(let I=0;I<r;I++)for(let x=0;x<s;x++){const _=M[x][I],T=M[x+1][I],F=M[x+1][I+1],L=M[x][I+1];(e>0||x!==0)&&(u.push(_,T,L),g+=3),(t>0||x!==s-1)&&(u.push(T,F,L),g+=3)}l.addGroup(h,g,0),h+=g}function R(w){const S=v,g=new lt,A=new G;let I=0;const x=w===!0?e:t,_=w===!0?1:-1;for(let F=1;F<=r;F++)d.push(0,m*_,0),f.push(0,_,0),p.push(.5,.5),v++;const T=v;for(let F=0;F<=r;F++){const V=F/r*c+o,X=Math.cos(V),K=Math.sin(V);A.x=x*K,A.y=m*_,A.z=x*X,d.push(A.x,A.y,A.z),f.push(0,_,0),g.x=X*.5+.5,g.y=K*.5*_+.5,p.push(g.x,g.y),v++}for(let F=0;F<r;F++){const L=S+F,V=T+F;w===!0?u.push(V,V+1,L):u.push(V+1,V,L),I+=3}l.addGroup(h,I,w===!0?1:2),h+=I}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Hn(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Ro extends Hn{constructor(e=1,t=1,n=32,r=1,s=!1,a=0,o=Math.PI*2){super(0,e,t,n,r,s,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(e){return new Ro(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class sr extends jt{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(n),c=Math.floor(r),l=o+1,u=c+1,d=e/o,f=t/c,p=[],v=[],M=[],m=[];for(let h=0;h<u;h++){const P=h*f-a;for(let R=0;R<l;R++){const w=R*d-s;v.push(w,-P,0),M.push(0,0,1),m.push(R/o),m.push(1-h/c)}}for(let h=0;h<c;h++)for(let P=0;P<o;P++){const R=P+l*h,w=P+l*(h+1),S=P+1+l*(h+1),g=P+1+l*h;p.push(R,w,g),p.push(w,S,g)}this.setIndex(p),this.setAttribute("position",new At(v,3)),this.setAttribute("normal",new At(M,3)),this.setAttribute("uv",new At(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new sr(e.width,e.height,e.widthSegments,e.heightSegments)}}class Cn extends jt{constructor(e=.5,t=1,n=32,r=1,s=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:s,thetaLength:a},n=Math.max(3,n),r=Math.max(1,r);const o=[],c=[],l=[],u=[];let d=e;const f=(t-e)/r,p=new G,v=new lt;for(let M=0;M<=r;M++){for(let m=0;m<=n;m++){const h=s+m/n*a;p.x=d*Math.cos(h),p.y=d*Math.sin(h),c.push(p.x,p.y,p.z),l.push(0,0,1),v.x=(p.x/t+1)/2,v.y=(p.y/t+1)/2,u.push(v.x,v.y)}d+=f}for(let M=0;M<r;M++){const m=M*(n+1);for(let h=0;h<n;h++){const P=h+m,R=P,w=P+n+1,S=P+n+2,g=P+1;o.push(R,w,g),o.push(w,S,g)}}this.setIndex(o),this.setAttribute("position",new At(c,3)),this.setAttribute("normal",new At(l,3)),this.setAttribute("uv",new At(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Cn(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class gs extends jt{constructor(e=1,t=32,n=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const c=Math.min(a+o,Math.PI);let l=0;const u=[],d=new G,f=new G,p=[],v=[],M=[],m=[];for(let h=0;h<=n;h++){const P=[],R=h/n;let w=0;h===0&&a===0?w=.5/t:h===n&&c===Math.PI&&(w=-.5/t);for(let S=0;S<=t;S++){const g=S/t;d.x=-e*Math.cos(r+g*s)*Math.sin(a+R*o),d.y=e*Math.cos(a+R*o),d.z=e*Math.sin(r+g*s)*Math.sin(a+R*o),v.push(d.x,d.y,d.z),f.copy(d).normalize(),M.push(f.x,f.y,f.z),m.push(g+w,1-R),P.push(l++)}u.push(P)}for(let h=0;h<n;h++)for(let P=0;P<t;P++){const R=u[h][P+1],w=u[h][P],S=u[h+1][P],g=u[h+1][P+1];(h!==0||a>0)&&p.push(R,w,g),(h!==n-1||c<Math.PI)&&p.push(w,S,g)}this.setIndex(p),this.setAttribute("position",new At(v,3)),this.setAttribute("normal",new At(M,3)),this.setAttribute("uv",new At(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new gs(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Ji extends jt{constructor(e=1,t=.4,n=12,r=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:s},n=Math.floor(n),r=Math.floor(r);const a=[],o=[],c=[],l=[],u=new G,d=new G,f=new G;for(let p=0;p<=n;p++)for(let v=0;v<=r;v++){const M=v/r*s,m=p/n*Math.PI*2;d.x=(e+t*Math.cos(m))*Math.cos(M),d.y=(e+t*Math.cos(m))*Math.sin(M),d.z=t*Math.sin(m),o.push(d.x,d.y,d.z),u.x=e*Math.cos(M),u.y=e*Math.sin(M),f.subVectors(d,u).normalize(),c.push(f.x,f.y,f.z),l.push(v/r),l.push(p/n)}for(let p=1;p<=n;p++)for(let v=1;v<=r;v++){const M=(r+1)*p+v-1,m=(r+1)*(p-1)+v-1,h=(r+1)*(p-1)+v,P=(r+1)*p+v;a.push(M,m,P),a.push(m,h,P)}this.setIndex(a),this.setAttribute("position",new At(o,3)),this.setAttribute("normal",new At(c,3)),this.setAttribute("uv",new At(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ji(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class ii extends ur{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ct(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ct(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=pl,this.normalScale=new lt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Sn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Cd extends ur{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Bu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Pd extends ur{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class ys extends Rt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ct(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class Ld extends ys{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Rt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ct(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const oa=new gt,mc=new G,xc=new G;class Co{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new lt(512,512),this.mapType=Un,this.map=null,this.mapPass=null,this.matrix=new gt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new wo,this._frameExtents=new lt(1,1),this._viewportCount=1,this._viewports=[new xt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;mc.setFromMatrixPosition(e.matrixWorld),t.position.copy(mc),xc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(xc),t.updateMatrixWorld(),oa.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(oa,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(oa)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class Dd extends Co{constructor(){super(new nn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,n=xs*2*e.angle*this.focus,r=this.mapSize.width/this.mapSize.height*this.aspect,s=e.distance||t.far;(n!==t.fov||r!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=r,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class Id extends ys{constructor(e,t,n=0,r=Math.PI/3,s=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Rt.DEFAULT_UP),this.updateMatrix(),this.target=new Rt,this.distance=n,this.angle=r,this.penumbra=s,this.decay=a,this.map=null,this.shadow=new Dd}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const gc=new gt,br=new G,ca=new G;class Ud extends Co{constructor(){super(new nn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new lt(4,2),this._viewportCount=6,this._viewports=[new xt(2,1,1,1),new xt(0,1,1,1),new xt(3,1,1,1),new xt(1,1,1,1),new xt(3,0,1,1),new xt(1,0,1,1)],this._cubeDirections=[new G(1,0,0),new G(-1,0,0),new G(0,0,1),new G(0,0,-1),new G(0,1,0),new G(0,-1,0)],this._cubeUps=[new G(0,1,0),new G(0,1,0),new G(0,1,0),new G(0,1,0),new G(0,0,1),new G(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,r=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),br.setFromMatrixPosition(e.matrixWorld),n.position.copy(br),ca.copy(n.position),ca.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(ca),n.updateMatrixWorld(),r.makeTranslation(-br.x,-br.y,-br.z),gc.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(gc,n.coordinateSystem,n.reversedDepth)}}class la extends ys{constructor(e,t,n=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=r,this.shadow=new Ud}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Rl extends yl{constructor(e=-1,t=1,n=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-e,a=n+e,o=r+t,c=r-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,a=s+l*this.view.width,o-=u*this.view.offsetY,c=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Fd extends Co{constructor(){super(new Rl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class _c extends ys{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Rt.DEFAULT_UP),this.updateMatrix(),this.target=new Rt,this.shadow=new Fd}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Nd extends nn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const vc=new gt;class Od{constructor(e,t,n=0,r=1/0){this.ray=new Eo(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new To,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):wt("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return vc.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(vc),this}intersectObject(e,t=!0,n=[]){return ao(e,this,n,t),n.sort(bc),n}intersectObjects(e,t=!0,n=[]){for(let r=0,s=e.length;r<s;r++)ao(e[r],this,n,t);return n.sort(bc),n}}function bc(i,e){return i.distance-e.distance}function ao(i,e,t,n){let r=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(r=!1),r===!0&&n===!0){const s=i.children;for(let a=0,o=s.length;a<o;a++)ao(s[a],e,t,!0)}}function Mc(i,e,t,n){const r=zd(n);switch(t){case hl:return i*e;case _o:return i*e/r.components*r.byteLength;case vo:return i*e/r.components*r.byteLength;case bo:return i*e*2/r.components*r.byteLength;case Mo:return i*e*2/r.components*r.byteLength;case fl:return i*e*3/r.components*r.byteLength;case Mn:return i*e*4/r.components*r.byteLength;case yo:return i*e*4/r.components*r.byteLength;case as:case os:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case cs:case ls:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Da:case Ua:return Math.max(i,16)*Math.max(e,8)/4;case La:case Ia:return Math.max(i,8)*Math.max(e,8)/2;case Fa:case Na:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Oa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case za:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ba:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case ka:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Va:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Ga:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Ha:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Wa:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Xa:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case qa:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case $a:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Ya:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case ja:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Ka:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Za:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Ja:case Qa:case eo:return Math.ceil(i/4)*Math.ceil(e/4)*16;case to:case no:return Math.ceil(i/4)*Math.ceil(e/4)*8;case io:case ro:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function zd(i){switch(i){case Un:case cl:return{byteLength:1,components:1};case Tr:case ll:case ar:return{byteLength:2,components:1};case xo:case go:return{byteLength:2,components:4};case Si:case mo:case Ln:return{byteLength:4,components:1};case ul:case dl:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:po}}));typeof window<"u"&&(window.__THREE__?je("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=po);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Cl(){let i=null,e=!1,t=null,n=null;function r(s,a){t(s,a),n=i.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function Bd(i){const e=new WeakMap;function t(o,c){const l=o.array,u=o.usage,d=l.byteLength,f=i.createBuffer();i.bindBuffer(c,f),i.bufferData(c,l,u),o.onUploadCallback();let p;if(l instanceof Float32Array)p=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)p=i.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=i.SHORT;else if(l instanceof Uint32Array)p=i.UNSIGNED_INT;else if(l instanceof Int32Array)p=i.INT;else if(l instanceof Int8Array)p=i.BYTE;else if(l instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,c,l){const u=c.array,d=c.updateRanges;if(i.bindBuffer(l,o),d.length===0)i.bufferSubData(l,0,u);else{d.sort((p,v)=>p.start-v.start);let f=0;for(let p=1;p<d.length;p++){const v=d[f],M=d[p];M.start<=v.start+v.count+1?v.count=Math.max(v.count,M.start+M.count-v.start):(++f,d[f]=M)}d.length=f+1;for(let p=0,v=d.length;p<v;p++){const M=d[p];i.bufferSubData(l,M.start*u.BYTES_PER_ELEMENT,u,M.start,M.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(i.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:r,remove:s,update:a}}var kd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Vd=`#ifdef USE_ALPHAHASH
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
#endif`,Gd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Hd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Wd=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Xd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,qd=`#ifdef USE_AOMAP
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
#endif`,$d=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Yd=`#ifdef USE_BATCHING
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
#endif`,jd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Kd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Zd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Jd=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Qd=`#ifdef USE_IRIDESCENCE
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
#endif`,eh=`#ifdef USE_BUMPMAP
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
#endif`,th=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,nh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,ih=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,rh=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,sh=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,ah=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,oh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,ch=`#if defined( USE_COLOR_ALPHA )
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
#endif`,lh=`#define PI 3.141592653589793
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
} // validated`,uh=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,dh=`vec3 transformedNormal = objectNormal;
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
#endif`,hh=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,fh=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,ph=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,mh=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,xh="gl_FragColor = linearToOutputTexel( gl_FragColor );",gh=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,_h=`#ifdef USE_ENVMAP
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
#endif`,vh=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,bh=`#ifdef USE_ENVMAP
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
#endif`,Mh=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,yh=`#ifdef USE_ENVMAP
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
#endif`,Sh=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Eh=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Th=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Ah=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,wh=`#ifdef USE_GRADIENTMAP
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
}`,Rh=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Ch=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Ph=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Lh=`uniform bool receiveShadow;
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
#endif`,Dh=`#ifdef USE_ENVMAP
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
#endif`,Ih=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Uh=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Fh=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Nh=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Oh=`PhysicalMaterial material;
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
#endif`,zh=`uniform sampler2D dfgLUT;
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
}`,Bh=`
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
#endif`,kh=`#if defined( RE_IndirectDiffuse )
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
#endif`,Vh=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Gh=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Hh=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Wh=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Xh=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,qh=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,$h=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Yh=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,jh=`#if defined( USE_POINTS_UV )
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
#endif`,Kh=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Zh=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Jh=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Qh=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,ef=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,tf=`#ifdef USE_MORPHTARGETS
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
#endif`,nf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,rf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,sf=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,af=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,of=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,cf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,lf=`#ifdef USE_NORMALMAP
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
#endif`,uf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,df=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,hf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,ff=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,pf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,mf=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,xf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,gf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,_f=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,vf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,bf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Mf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,yf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Sf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Ef=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Tf=`float getShadowMask() {
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
}`,Af=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,wf=`#ifdef USE_SKINNING
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
#endif`,Rf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Cf=`#ifdef USE_SKINNING
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
#endif`,Pf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Lf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Df=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,If=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Uf=`#ifdef USE_TRANSMISSION
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
#endif`,Ff=`#ifdef USE_TRANSMISSION
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
#endif`,Nf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Of=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,zf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Bf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const kf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Vf=`uniform sampler2D t2D;
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
}`,Gf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Hf=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Wf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Xf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,qf=`#include <common>
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
}`,$f=`#if DEPTH_PACKING == 3200
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
}`,Yf=`#define DISTANCE
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
}`,jf=`#define DISTANCE
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
}`,Kf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Zf=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Jf=`uniform float scale;
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
}`,Qf=`uniform vec3 diffuse;
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
}`,ep=`#include <common>
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
}`,tp=`uniform vec3 diffuse;
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
}`,np=`#define LAMBERT
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
}`,ip=`#define LAMBERT
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
}`,rp=`#define MATCAP
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
}`,sp=`#define MATCAP
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
}`,ap=`#define NORMAL
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
}`,op=`#define NORMAL
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
}`,cp=`#define PHONG
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
}`,lp=`#define PHONG
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
}`,up=`#define STANDARD
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
}`,dp=`#define STANDARD
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
}`,hp=`#define TOON
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
}`,fp=`#define TOON
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
}`,pp=`uniform float size;
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
}`,mp=`uniform vec3 diffuse;
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
}`,xp=`#include <common>
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
}`,gp=`uniform vec3 color;
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
}`,_p=`uniform float rotation;
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
}`,vp=`uniform vec3 diffuse;
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
}`,Ze={alphahash_fragment:kd,alphahash_pars_fragment:Vd,alphamap_fragment:Gd,alphamap_pars_fragment:Hd,alphatest_fragment:Wd,alphatest_pars_fragment:Xd,aomap_fragment:qd,aomap_pars_fragment:$d,batching_pars_vertex:Yd,batching_vertex:jd,begin_vertex:Kd,beginnormal_vertex:Zd,bsdfs:Jd,iridescence_fragment:Qd,bumpmap_pars_fragment:eh,clipping_planes_fragment:th,clipping_planes_pars_fragment:nh,clipping_planes_pars_vertex:ih,clipping_planes_vertex:rh,color_fragment:sh,color_pars_fragment:ah,color_pars_vertex:oh,color_vertex:ch,common:lh,cube_uv_reflection_fragment:uh,defaultnormal_vertex:dh,displacementmap_pars_vertex:hh,displacementmap_vertex:fh,emissivemap_fragment:ph,emissivemap_pars_fragment:mh,colorspace_fragment:xh,colorspace_pars_fragment:gh,envmap_fragment:_h,envmap_common_pars_fragment:vh,envmap_pars_fragment:bh,envmap_pars_vertex:Mh,envmap_physical_pars_fragment:Dh,envmap_vertex:yh,fog_vertex:Sh,fog_pars_vertex:Eh,fog_fragment:Th,fog_pars_fragment:Ah,gradientmap_pars_fragment:wh,lightmap_pars_fragment:Rh,lights_lambert_fragment:Ch,lights_lambert_pars_fragment:Ph,lights_pars_begin:Lh,lights_toon_fragment:Ih,lights_toon_pars_fragment:Uh,lights_phong_fragment:Fh,lights_phong_pars_fragment:Nh,lights_physical_fragment:Oh,lights_physical_pars_fragment:zh,lights_fragment_begin:Bh,lights_fragment_maps:kh,lights_fragment_end:Vh,logdepthbuf_fragment:Gh,logdepthbuf_pars_fragment:Hh,logdepthbuf_pars_vertex:Wh,logdepthbuf_vertex:Xh,map_fragment:qh,map_pars_fragment:$h,map_particle_fragment:Yh,map_particle_pars_fragment:jh,metalnessmap_fragment:Kh,metalnessmap_pars_fragment:Zh,morphinstance_vertex:Jh,morphcolor_vertex:Qh,morphnormal_vertex:ef,morphtarget_pars_vertex:tf,morphtarget_vertex:nf,normal_fragment_begin:rf,normal_fragment_maps:sf,normal_pars_fragment:af,normal_pars_vertex:of,normal_vertex:cf,normalmap_pars_fragment:lf,clearcoat_normal_fragment_begin:uf,clearcoat_normal_fragment_maps:df,clearcoat_pars_fragment:hf,iridescence_pars_fragment:ff,opaque_fragment:pf,packing:mf,premultiplied_alpha_fragment:xf,project_vertex:gf,dithering_fragment:_f,dithering_pars_fragment:vf,roughnessmap_fragment:bf,roughnessmap_pars_fragment:Mf,shadowmap_pars_fragment:yf,shadowmap_pars_vertex:Sf,shadowmap_vertex:Ef,shadowmask_pars_fragment:Tf,skinbase_vertex:Af,skinning_pars_vertex:wf,skinning_vertex:Rf,skinnormal_vertex:Cf,specularmap_fragment:Pf,specularmap_pars_fragment:Lf,tonemapping_fragment:Df,tonemapping_pars_fragment:If,transmission_fragment:Uf,transmission_pars_fragment:Ff,uv_pars_fragment:Nf,uv_pars_vertex:Of,uv_vertex:zf,worldpos_vertex:Bf,background_vert:kf,background_frag:Vf,backgroundCube_vert:Gf,backgroundCube_frag:Hf,cube_vert:Wf,cube_frag:Xf,depth_vert:qf,depth_frag:$f,distanceRGBA_vert:Yf,distanceRGBA_frag:jf,equirect_vert:Kf,equirect_frag:Zf,linedashed_vert:Jf,linedashed_frag:Qf,meshbasic_vert:ep,meshbasic_frag:tp,meshlambert_vert:np,meshlambert_frag:ip,meshmatcap_vert:rp,meshmatcap_frag:sp,meshnormal_vert:ap,meshnormal_frag:op,meshphong_vert:cp,meshphong_frag:lp,meshphysical_vert:up,meshphysical_frag:dp,meshtoon_vert:hp,meshtoon_frag:fp,points_vert:pp,points_frag:mp,shadow_vert:xp,shadow_frag:gp,sprite_vert:_p,sprite_frag:vp},Me={common:{diffuse:{value:new ct(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ke},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ke}},envmap:{envMap:{value:null},envMapRotation:{value:new Ke},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ke}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ke}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ke},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ke},normalScale:{value:new lt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ke},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ke}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ke}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ke}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ct(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ct(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0},uvTransform:{value:new Ke}},sprite:{diffuse:{value:new ct(16777215)},opacity:{value:1},center:{value:new lt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ke},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0}}},Pn={basic:{uniforms:Zt([Me.common,Me.specularmap,Me.envmap,Me.aomap,Me.lightmap,Me.fog]),vertexShader:Ze.meshbasic_vert,fragmentShader:Ze.meshbasic_frag},lambert:{uniforms:Zt([Me.common,Me.specularmap,Me.envmap,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.fog,Me.lights,{emissive:{value:new ct(0)}}]),vertexShader:Ze.meshlambert_vert,fragmentShader:Ze.meshlambert_frag},phong:{uniforms:Zt([Me.common,Me.specularmap,Me.envmap,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.fog,Me.lights,{emissive:{value:new ct(0)},specular:{value:new ct(1118481)},shininess:{value:30}}]),vertexShader:Ze.meshphong_vert,fragmentShader:Ze.meshphong_frag},standard:{uniforms:Zt([Me.common,Me.envmap,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.roughnessmap,Me.metalnessmap,Me.fog,Me.lights,{emissive:{value:new ct(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ze.meshphysical_vert,fragmentShader:Ze.meshphysical_frag},toon:{uniforms:Zt([Me.common,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.gradientmap,Me.fog,Me.lights,{emissive:{value:new ct(0)}}]),vertexShader:Ze.meshtoon_vert,fragmentShader:Ze.meshtoon_frag},matcap:{uniforms:Zt([Me.common,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.fog,{matcap:{value:null}}]),vertexShader:Ze.meshmatcap_vert,fragmentShader:Ze.meshmatcap_frag},points:{uniforms:Zt([Me.points,Me.fog]),vertexShader:Ze.points_vert,fragmentShader:Ze.points_frag},dashed:{uniforms:Zt([Me.common,Me.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ze.linedashed_vert,fragmentShader:Ze.linedashed_frag},depth:{uniforms:Zt([Me.common,Me.displacementmap]),vertexShader:Ze.depth_vert,fragmentShader:Ze.depth_frag},normal:{uniforms:Zt([Me.common,Me.bumpmap,Me.normalmap,Me.displacementmap,{opacity:{value:1}}]),vertexShader:Ze.meshnormal_vert,fragmentShader:Ze.meshnormal_frag},sprite:{uniforms:Zt([Me.sprite,Me.fog]),vertexShader:Ze.sprite_vert,fragmentShader:Ze.sprite_frag},background:{uniforms:{uvTransform:{value:new Ke},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ze.background_vert,fragmentShader:Ze.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ke}},vertexShader:Ze.backgroundCube_vert,fragmentShader:Ze.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ze.cube_vert,fragmentShader:Ze.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ze.equirect_vert,fragmentShader:Ze.equirect_frag},distanceRGBA:{uniforms:Zt([Me.common,Me.displacementmap,{referencePosition:{value:new G},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ze.distanceRGBA_vert,fragmentShader:Ze.distanceRGBA_frag},shadow:{uniforms:Zt([Me.lights,Me.fog,{color:{value:new ct(0)},opacity:{value:1}}]),vertexShader:Ze.shadow_vert,fragmentShader:Ze.shadow_frag}};Pn.physical={uniforms:Zt([Pn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ke},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ke},clearcoatNormalScale:{value:new lt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ke},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ke},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ke},sheen:{value:0},sheenColor:{value:new ct(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ke},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ke},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ke},transmissionSamplerSize:{value:new lt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ke},attenuationDistance:{value:0},attenuationColor:{value:new ct(0)},specularColor:{value:new ct(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ke},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ke},anisotropyVector:{value:new lt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ke}}]),vertexShader:Ze.meshphysical_vert,fragmentShader:Ze.meshphysical_frag};const rs={r:0,b:0,g:0},gi=new Sn,bp=new gt;function Mp(i,e,t,n,r,s,a){const o=new ct(0);let c=s===!0?0:1,l,u,d=null,f=0,p=null;function v(R){let w=R.isScene===!0?R.background:null;return w&&w.isTexture&&(w=(R.backgroundBlurriness>0?t:e).get(w)),w}function M(R){let w=!1;const S=v(R);S===null?h(o,c):S&&S.isColor&&(h(S,1),w=!0);const g=i.xr.getEnvironmentBlendMode();g==="additive"?n.buffers.color.setClear(0,0,0,1,a):g==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||w)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(R,w){const S=v(w);S&&(S.isCubeTexture||S.mapping===Ms)?(u===void 0&&(u=new rn(new dr(1,1,1),new Kn({name:"BackgroundCubeMaterial",uniforms:rr(Pn.backgroundCube.uniforms),vertexShader:Pn.backgroundCube.vertexShader,fragmentShader:Pn.backgroundCube.fragmentShader,side:sn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(g,A,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),gi.copy(w.backgroundRotation),gi.x*=-1,gi.y*=-1,gi.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(gi.y*=-1,gi.z*=-1),u.material.uniforms.envMap.value=S,u.material.uniforms.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=w.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(bp.makeRotationFromEuler(gi)),u.material.toneMapped=dt.getTransfer(S.colorSpace)!==mt,(d!==S||f!==S.version||p!==i.toneMapping)&&(u.material.needsUpdate=!0,d=S,f=S.version,p=i.toneMapping),u.layers.enableAll(),R.unshift(u,u.geometry,u.material,0,0,null)):S&&S.isTexture&&(l===void 0&&(l=new rn(new sr(2,2),new Kn({name:"BackgroundMaterial",uniforms:rr(Pn.background.uniforms),vertexShader:Pn.background.vertexShader,fragmentShader:Pn.background.fragmentShader,side:ui,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(l)),l.material.uniforms.t2D.value=S,l.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,l.material.toneMapped=dt.getTransfer(S.colorSpace)!==mt,S.matrixAutoUpdate===!0&&S.updateMatrix(),l.material.uniforms.uvTransform.value.copy(S.matrix),(d!==S||f!==S.version||p!==i.toneMapping)&&(l.material.needsUpdate=!0,d=S,f=S.version,p=i.toneMapping),l.layers.enableAll(),R.unshift(l,l.geometry,l.material,0,0,null))}function h(R,w){R.getRGB(rs,Ml(i)),n.buffers.color.setClear(rs.r,rs.g,rs.b,w,a)}function P(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(R,w=1){o.set(R),c=w,h(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(R){c=R,h(o,c)},render:M,addToRenderList:m,dispose:P}}function yp(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=f(null);let s=r,a=!1;function o(_,T,F,L,V){let X=!1;const K=d(L,F,T);s!==K&&(s=K,l(s.object)),X=p(_,L,F,V),X&&v(_,L,F,V),V!==null&&e.update(V,i.ELEMENT_ARRAY_BUFFER),(X||a)&&(a=!1,w(_,T,F,L),V!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(V).buffer))}function c(){return i.createVertexArray()}function l(_){return i.bindVertexArray(_)}function u(_){return i.deleteVertexArray(_)}function d(_,T,F){const L=F.wireframe===!0;let V=n[_.id];V===void 0&&(V={},n[_.id]=V);let X=V[T.id];X===void 0&&(X={},V[T.id]=X);let K=X[L];return K===void 0&&(K=f(c()),X[L]=K),K}function f(_){const T=[],F=[],L=[];for(let V=0;V<t;V++)T[V]=0,F[V]=0,L[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:T,enabledAttributes:F,attributeDivisors:L,object:_,attributes:{},index:null}}function p(_,T,F,L){const V=s.attributes,X=T.attributes;let K=0;const se=F.getAttributes();for(const j in se)if(se[j].location>=0){const ee=V[j];let fe=X[j];if(fe===void 0&&(j==="instanceMatrix"&&_.instanceMatrix&&(fe=_.instanceMatrix),j==="instanceColor"&&_.instanceColor&&(fe=_.instanceColor)),ee===void 0||ee.attribute!==fe||fe&&ee.data!==fe.data)return!0;K++}return s.attributesNum!==K||s.index!==L}function v(_,T,F,L){const V={},X=T.attributes;let K=0;const se=F.getAttributes();for(const j in se)if(se[j].location>=0){let ee=X[j];ee===void 0&&(j==="instanceMatrix"&&_.instanceMatrix&&(ee=_.instanceMatrix),j==="instanceColor"&&_.instanceColor&&(ee=_.instanceColor));const fe={};fe.attribute=ee,ee&&ee.data&&(fe.data=ee.data),V[j]=fe,K++}s.attributes=V,s.attributesNum=K,s.index=L}function M(){const _=s.newAttributes;for(let T=0,F=_.length;T<F;T++)_[T]=0}function m(_){h(_,0)}function h(_,T){const F=s.newAttributes,L=s.enabledAttributes,V=s.attributeDivisors;F[_]=1,L[_]===0&&(i.enableVertexAttribArray(_),L[_]=1),V[_]!==T&&(i.vertexAttribDivisor(_,T),V[_]=T)}function P(){const _=s.newAttributes,T=s.enabledAttributes;for(let F=0,L=T.length;F<L;F++)T[F]!==_[F]&&(i.disableVertexAttribArray(F),T[F]=0)}function R(_,T,F,L,V,X,K){K===!0?i.vertexAttribIPointer(_,T,F,V,X):i.vertexAttribPointer(_,T,F,L,V,X)}function w(_,T,F,L){M();const V=L.attributes,X=F.getAttributes(),K=T.defaultAttributeValues;for(const se in X){const j=X[se];if(j.location>=0){let ne=V[se];if(ne===void 0&&(se==="instanceMatrix"&&_.instanceMatrix&&(ne=_.instanceMatrix),se==="instanceColor"&&_.instanceColor&&(ne=_.instanceColor)),ne!==void 0){const ee=ne.normalized,fe=ne.itemSize,Ce=e.get(ne);if(Ce===void 0)continue;const Oe=Ce.buffer,He=Ce.type,ut=Ce.bytesPerElement,te=He===i.INT||He===i.UNSIGNED_INT||ne.gpuType===mo;if(ne.isInterleavedBufferAttribute){const oe=ne.data,we=oe.stride,Ye=ne.offset;if(oe.isInstancedInterleavedBuffer){for(let De=0;De<j.locationSize;De++)h(j.location+De,oe.meshPerAttribute);_.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=oe.meshPerAttribute*oe.count)}else for(let De=0;De<j.locationSize;De++)m(j.location+De);i.bindBuffer(i.ARRAY_BUFFER,Oe);for(let De=0;De<j.locationSize;De++)R(j.location+De,fe/j.locationSize,He,ee,we*ut,(Ye+fe/j.locationSize*De)*ut,te)}else{if(ne.isInstancedBufferAttribute){for(let oe=0;oe<j.locationSize;oe++)h(j.location+oe,ne.meshPerAttribute);_.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=ne.meshPerAttribute*ne.count)}else for(let oe=0;oe<j.locationSize;oe++)m(j.location+oe);i.bindBuffer(i.ARRAY_BUFFER,Oe);for(let oe=0;oe<j.locationSize;oe++)R(j.location+oe,fe/j.locationSize,He,ee,fe*ut,fe/j.locationSize*oe*ut,te)}}else if(K!==void 0){const ee=K[se];if(ee!==void 0)switch(ee.length){case 2:i.vertexAttrib2fv(j.location,ee);break;case 3:i.vertexAttrib3fv(j.location,ee);break;case 4:i.vertexAttrib4fv(j.location,ee);break;default:i.vertexAttrib1fv(j.location,ee)}}}}P()}function S(){I();for(const _ in n){const T=n[_];for(const F in T){const L=T[F];for(const V in L)u(L[V].object),delete L[V];delete T[F]}delete n[_]}}function g(_){if(n[_.id]===void 0)return;const T=n[_.id];for(const F in T){const L=T[F];for(const V in L)u(L[V].object),delete L[V];delete T[F]}delete n[_.id]}function A(_){for(const T in n){const F=n[T];if(F[_.id]===void 0)continue;const L=F[_.id];for(const V in L)u(L[V].object),delete L[V];delete F[_.id]}}function I(){x(),a=!0,s!==r&&(s=r,l(s.object))}function x(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:I,resetDefaultState:x,dispose:S,releaseStatesOfGeometry:g,releaseStatesOfProgram:A,initAttributes:M,enableAttribute:m,disableUnusedAttributes:P}}function Sp(i,e,t){let n;function r(l){n=l}function s(l,u){i.drawArrays(n,l,u),t.update(u,n,1)}function a(l,u,d){d!==0&&(i.drawArraysInstanced(n,l,u,d),t.update(u,n,d))}function o(l,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,u,0,d);let p=0;for(let v=0;v<d;v++)p+=u[v];t.update(p,n,1)}function c(l,u,d,f){if(d===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let v=0;v<l.length;v++)a(l[v],u[v],f[v]);else{p.multiDrawArraysInstancedWEBGL(n,l,0,u,0,f,0,d);let v=0;for(let M=0;M<d;M++)v+=u[M]*f[M];t.update(v,n,1)}}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function Ep(i,e,t,n){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(A){return!(A!==Mn&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){const I=A===ar&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==Un&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==Ln&&!I)}function c(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const u=c(l);u!==l&&(je("WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const d=t.logarithmicDepthBuffer===!0,f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),M=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),h=i.getParameter(i.MAX_VERTEX_ATTRIBS),P=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),R=i.getParameter(i.MAX_VARYING_VECTORS),w=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),S=v>0,g=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:v,maxTextureSize:M,maxCubemapSize:m,maxAttributes:h,maxVertexUniforms:P,maxVaryings:R,maxFragmentUniforms:w,vertexTextures:S,maxSamples:g}}function Tp(i){const e=this;let t=null,n=0,r=!1,s=!1;const a=new ri,o=new Ke,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){const p=d.length!==0||f||n!==0||r;return r=f,n=d.length,p},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,f){t=u(d,f,0)},this.setState=function(d,f,p){const v=d.clippingPlanes,M=d.clipIntersection,m=d.clipShadows,h=i.get(d);if(!r||v===null||v.length===0||s&&!m)s?u(null):l();else{const P=s?0:n,R=P*4;let w=h.clippingState||null;c.value=w,w=u(v,f,R,p);for(let S=0;S!==R;++S)w[S]=t[S];h.clippingState=w,this.numIntersection=M?this.numPlanes:0,this.numPlanes+=P}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(d,f,p,v){const M=d!==null?d.length:0;let m=null;if(M!==0){if(m=c.value,v!==!0||m===null){const h=p+M*4,P=f.matrixWorldInverse;o.getNormalMatrix(P),(m===null||m.length<h)&&(m=new Float32Array(h));for(let R=0,w=p;R!==M;++R,w+=4)a.copy(d[R]).applyMatrix4(P,o),a.normal.toArray(m,w),m[w+3]=a.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=M,e.numIntersection=0,m}}function Ap(i){let e=new WeakMap;function t(a,o){return o===Ra?a.mapping=tr:o===Ca&&(a.mapping=nr),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===Ra||o===Ca)if(e.has(a)){const c=e.get(a).texture;return t(c,a.mapping)}else{const c=a.image;if(c&&c.height>0){const l=new bd(c.height);return l.fromEquirectangularTexture(i,a),e.set(a,l),a.addEventListener("dispose",r),t(l.texture,a.mapping)}else return null}}return a}function r(a){const o=a.target;o.removeEventListener("dispose",r);const c=e.get(o);c!==void 0&&(e.delete(o),c.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}const ai=4,yc=[.125,.215,.35,.446,.526,.582],bi=20,wp=256,Mr=new Rl,Sc=new ct;let ua=null,da=0,ha=0,fa=!1;const Rp=new G;class Ec{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,s={}){const{size:a=256,position:o=Rp}=s;ua=this._renderer.getRenderTarget(),da=this._renderer.getActiveCubeFace(),ha=this._renderer.getActiveMipmapLevel(),fa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,r,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=wc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ac(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(ua,da,ha),this._renderer.xr.enabled=fa,e.scissorTest=!1,Xi(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===tr||e.mapping===nr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ua=this._renderer.getRenderTarget(),da=this._renderer.getActiveCubeFace(),ha=this._renderer.getActiveMipmapLevel(),fa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:fn,minFilter:fn,generateMipmaps:!1,type:ar,format:Mn,colorSpace:ir,depthBuffer:!1},r=Tc(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Tc(e,t,n);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Cp(s)),this._blurMaterial=Lp(s,e,t),this._ggxMaterial=Pp(s,e,t)}return r}_compileMaterial(e){const t=new rn(new jt,e);this._renderer.compile(t,Mr)}_sceneToCubeUV(e,t,n,r,s){const c=new nn(90,1,t,n),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,f=d.autoClear,p=d.toneMapping;d.getClearColor(Sc),d.toneMapping=oi,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(r),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new rn(new dr,new $i({name:"PMREM.Background",side:sn,depthWrite:!1,depthTest:!1})));const M=this._backgroundBox,m=M.material;let h=!1;const P=e.background;P?P.isColor&&(m.color.copy(P),e.background=null,h=!0):(m.color.copy(Sc),h=!0);for(let R=0;R<6;R++){const w=R%3;w===0?(c.up.set(0,l[R],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x+u[R],s.y,s.z)):w===1?(c.up.set(0,0,l[R]),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y+u[R],s.z)):(c.up.set(0,l[R],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y,s.z+u[R]));const S=this._cubeSize;Xi(r,w*S,R>2?S:0,S,S),d.setRenderTarget(r),h&&d.render(M,c),d.render(e,c)}d.toneMapping=p,d.autoClear=f,e.background=P}_textureToCubeUV(e,t){const n=this._renderer,r=e.mapping===tr||e.mapping===nr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=wc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ac());const s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const o=s.uniforms;o.envMap.value=e;const c=this._cubeSize;Xi(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(a,Mr)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=n}_applyGGXFilter(e,t,n){const r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;const c=a.uniforms,l=n/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),d=Math.sqrt(l*l-u*u),f=.05+l*.95,p=d*f,{_lodMax:v}=this,M=this._sizeLods[n],m=3*M*(n>v-ai?n-v+ai:0),h=4*(this._cubeSize-M);c.envMap.value=e.texture,c.roughness.value=p,c.mipInt.value=v-t,Xi(s,m,h,3*M,2*M),r.setRenderTarget(s),r.render(o,Mr),c.envMap.value=s.texture,c.roughness.value=0,c.mipInt.value=v-n,Xi(e,m,h,3*M,2*M),r.setRenderTarget(e),r.render(o,Mr)}_blur(e,t,n,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,r,"latitudinal",s),this._halfBlur(a,e,n,n,r,"longitudinal",s)}_halfBlur(e,t,n,r,s,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&wt("blur direction must be either latitudinal or longitudinal!");const u=3,d=this._lodMeshes[r];d.material=l;const f=l.uniforms,p=this._sizeLods[n]-1,v=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*bi-1),M=s/v,m=isFinite(s)?1+Math.floor(u*M):bi;m>bi&&je(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${bi}`);const h=[];let P=0;for(let A=0;A<bi;++A){const I=A/M,x=Math.exp(-I*I/2);h.push(x),A===0?P+=x:A<m&&(P+=2*x)}for(let A=0;A<h.length;A++)h[A]=h[A]/P;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=h,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:R}=this;f.dTheta.value=v,f.mipInt.value=R-n;const w=this._sizeLods[r],S=3*w*(r>R-ai?r-R+ai:0),g=4*(this._cubeSize-w);Xi(t,S,g,3*w,2*w),c.setRenderTarget(t),c.render(d,Mr)}}function Cp(i){const e=[],t=[],n=[];let r=i;const s=i-ai+1+yc.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);e.push(o);let c=1/o;a>i-ai?c=yc[a-i+ai-1]:a===0&&(c=0),t.push(c);const l=1/(o-2),u=-l,d=1+l,f=[u,u,d,u,d,d,u,u,d,d,u,d],p=6,v=6,M=3,m=2,h=1,P=new Float32Array(M*v*p),R=new Float32Array(m*v*p),w=new Float32Array(h*v*p);for(let g=0;g<p;g++){const A=g%3*2/3-1,I=g>2?0:-1,x=[A,I,0,A+2/3,I,0,A+2/3,I+1,0,A,I,0,A+2/3,I+1,0,A,I+1,0];P.set(x,M*v*g),R.set(f,m*v*g);const _=[g,g,g,g,g,g];w.set(_,h*v*g)}const S=new jt;S.setAttribute("position",new mn(P,M)),S.setAttribute("uv",new mn(R,m)),S.setAttribute("faceIndex",new mn(w,h)),n.push(new rn(S,null)),r>ai&&r--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function Tc(i,e,t){const n=new Ei(i,e,t);return n.texture.mapping=Ms,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Xi(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function Pp(i,e,t){return new Kn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:wp,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Ss(),fragmentShader:`

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
		`,blending:$n,depthTest:!1,depthWrite:!1})}function Lp(i,e,t){const n=new Float32Array(bi),r=new G(0,1,0);return new Kn({name:"SphericalGaussianBlur",defines:{n:bi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Ss(),fragmentShader:`

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
		`,blending:$n,depthTest:!1,depthWrite:!1})}function Ac(){return new Kn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ss(),fragmentShader:`

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
		`,blending:$n,depthTest:!1,depthWrite:!1})}function wc(){return new Kn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ss(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:$n,depthTest:!1,depthWrite:!1})}function Ss(){return`

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
	`}function Dp(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const c=o.mapping,l=c===Ra||c===Ca,u=c===tr||c===nr;if(l||u){let d=e.get(o);const f=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==f)return t===null&&(t=new Ec(i)),d=l?t.fromEquirectangular(o,d):t.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),d.texture;if(d!==void 0)return d.texture;{const p=o.image;return l&&p&&p.height>0||u&&p&&r(p)?(t===null&&(t=new Ec(i)),d=l?t.fromEquirectangular(o):t.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),o.addEventListener("dispose",s),d.texture):null}}}return o}function r(o){let c=0;const l=6;for(let u=0;u<l;u++)o[u]!==void 0&&c++;return c===l}function s(o){const c=o.target;c.removeEventListener("dispose",s);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function Ip(i){const e={};function t(n){if(e[n]!==void 0)return e[n];const r=i.getExtension(n);return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const r=t(n);return r===null&&Cr("WebGLRenderer: "+n+" extension not supported."),r}}}function Up(i,e,t,n){const r={},s=new WeakMap;function a(d){const f=d.target;f.index!==null&&e.remove(f.index);for(const v in f.attributes)e.remove(f.attributes[v]);f.removeEventListener("dispose",a),delete r[f.id];const p=s.get(f);p&&(e.remove(p),s.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function o(d,f){return r[f.id]===!0||(f.addEventListener("dispose",a),r[f.id]=!0,t.memory.geometries++),f}function c(d){const f=d.attributes;for(const p in f)e.update(f[p],i.ARRAY_BUFFER)}function l(d){const f=[],p=d.index,v=d.attributes.position;let M=0;if(p!==null){const P=p.array;M=p.version;for(let R=0,w=P.length;R<w;R+=3){const S=P[R+0],g=P[R+1],A=P[R+2];f.push(S,g,g,A,A,S)}}else if(v!==void 0){const P=v.array;M=v.version;for(let R=0,w=P.length/3-1;R<w;R+=3){const S=R+0,g=R+1,A=R+2;f.push(S,g,g,A,A,S)}}else return;const m=new(xl(f)?bl:vl)(f,1);m.version=M;const h=s.get(d);h&&e.remove(h),s.set(d,m)}function u(d){const f=s.get(d);if(f){const p=d.index;p!==null&&f.version<p.version&&l(d)}else l(d);return s.get(d)}return{get:o,update:c,getWireframeAttribute:u}}function Fp(i,e,t){let n;function r(f){n=f}let s,a;function o(f){s=f.type,a=f.bytesPerElement}function c(f,p){i.drawElements(n,p,s,f*a),t.update(p,n,1)}function l(f,p,v){v!==0&&(i.drawElementsInstanced(n,p,s,f*a,v),t.update(p,n,v))}function u(f,p,v){if(v===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,s,f,0,v);let m=0;for(let h=0;h<v;h++)m+=p[h];t.update(m,n,1)}function d(f,p,v,M){if(v===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let h=0;h<f.length;h++)l(f[h]/a,p[h],M[h]);else{m.multiDrawElementsInstancedWEBGL(n,p,0,s,f,0,M,0,v);let h=0;for(let P=0;P<v;P++)h+=p[P]*M[P];t.update(h,n,1)}}this.setMode=r,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function Np(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(s/3);break;case i.LINES:t.lines+=o*(s/2);break;case i.LINE_STRIP:t.lines+=o*(s-1);break;case i.LINE_LOOP:t.lines+=o*s;break;case i.POINTS:t.points+=o*s;break;default:wt("WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function Op(i,e,t){const n=new WeakMap,r=new xt;function s(a,o,c){const l=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=u!==void 0?u.length:0;let f=n.get(o);if(f===void 0||f.count!==d){let _=function(){I.dispose(),n.delete(o),o.removeEventListener("dispose",_)};var p=_;f!==void 0&&f.texture.dispose();const v=o.morphAttributes.position!==void 0,M=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,h=o.morphAttributes.position||[],P=o.morphAttributes.normal||[],R=o.morphAttributes.color||[];let w=0;v===!0&&(w=1),M===!0&&(w=2),m===!0&&(w=3);let S=o.attributes.position.count*w,g=1;S>e.maxTextureSize&&(g=Math.ceil(S/e.maxTextureSize),S=e.maxTextureSize);const A=new Float32Array(S*g*4*d),I=new gl(A,S,g,d);I.type=Ln,I.needsUpdate=!0;const x=w*4;for(let T=0;T<d;T++){const F=h[T],L=P[T],V=R[T],X=S*g*4*T;for(let K=0;K<F.count;K++){const se=K*x;v===!0&&(r.fromBufferAttribute(F,K),A[X+se+0]=r.x,A[X+se+1]=r.y,A[X+se+2]=r.z,A[X+se+3]=0),M===!0&&(r.fromBufferAttribute(L,K),A[X+se+4]=r.x,A[X+se+5]=r.y,A[X+se+6]=r.z,A[X+se+7]=0),m===!0&&(r.fromBufferAttribute(V,K),A[X+se+8]=r.x,A[X+se+9]=r.y,A[X+se+10]=r.z,A[X+se+11]=V.itemSize===4?r.w:1)}}f={count:d,texture:I,size:new lt(S,g)},n.set(o,f),o.addEventListener("dispose",_)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let v=0;for(let m=0;m<l.length;m++)v+=l[m];const M=o.morphTargetsRelative?1:1-v;c.getUniforms().setValue(i,"morphTargetBaseInfluence",M),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",f.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:s}}function zp(i,e,t,n){let r=new WeakMap;function s(c){const l=n.render.frame,u=c.geometry,d=e.get(c,u);if(r.get(d)!==l&&(e.update(d),r.set(d,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),r.get(c)!==l&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,l))),c.isSkinnedMesh){const f=c.skeleton;r.get(f)!==l&&(f.update(),r.set(f,l))}return d}function a(){r=new WeakMap}function o(c){const l=c.target;l.removeEventListener("dispose",o),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:s,dispose:a}}const Pl=new Yt,Rc=new Al(1,1),Ll=new gl,Dl=new id,Il=new Sl,Cc=[],Pc=[],Lc=new Float32Array(16),Dc=new Float32Array(9),Ic=new Float32Array(4);function hr(i,e,t){const n=i[0];if(n<=0||n>0)return i;const r=e*t;let s=Cc[r];if(s===void 0&&(s=new Float32Array(r),Cc[r]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(s,o)}return s}function Nt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Ot(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Es(i,e){let t=Pc[e];t===void 0&&(t=new Int32Array(e),Pc[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Bp(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function kp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Nt(t,e))return;i.uniform2fv(this.addr,e),Ot(t,e)}}function Vp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Nt(t,e))return;i.uniform3fv(this.addr,e),Ot(t,e)}}function Gp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Nt(t,e))return;i.uniform4fv(this.addr,e),Ot(t,e)}}function Hp(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Nt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Ot(t,e)}else{if(Nt(t,n))return;Ic.set(n),i.uniformMatrix2fv(this.addr,!1,Ic),Ot(t,n)}}function Wp(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Nt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Ot(t,e)}else{if(Nt(t,n))return;Dc.set(n),i.uniformMatrix3fv(this.addr,!1,Dc),Ot(t,n)}}function Xp(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Nt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Ot(t,e)}else{if(Nt(t,n))return;Lc.set(n),i.uniformMatrix4fv(this.addr,!1,Lc),Ot(t,n)}}function qp(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function $p(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Nt(t,e))return;i.uniform2iv(this.addr,e),Ot(t,e)}}function Yp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Nt(t,e))return;i.uniform3iv(this.addr,e),Ot(t,e)}}function jp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Nt(t,e))return;i.uniform4iv(this.addr,e),Ot(t,e)}}function Kp(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Zp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Nt(t,e))return;i.uniform2uiv(this.addr,e),Ot(t,e)}}function Jp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Nt(t,e))return;i.uniform3uiv(this.addr,e),Ot(t,e)}}function Qp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Nt(t,e))return;i.uniform4uiv(this.addr,e),Ot(t,e)}}function e0(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s;this.type===i.SAMPLER_2D_SHADOW?(Rc.compareFunction=ml,s=Rc):s=Pl,t.setTexture2D(e||s,r)}function t0(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||Dl,r)}function n0(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||Il,r)}function i0(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||Ll,r)}function r0(i){switch(i){case 5126:return Bp;case 35664:return kp;case 35665:return Vp;case 35666:return Gp;case 35674:return Hp;case 35675:return Wp;case 35676:return Xp;case 5124:case 35670:return qp;case 35667:case 35671:return $p;case 35668:case 35672:return Yp;case 35669:case 35673:return jp;case 5125:return Kp;case 36294:return Zp;case 36295:return Jp;case 36296:return Qp;case 35678:case 36198:case 36298:case 36306:case 35682:return e0;case 35679:case 36299:case 36307:return t0;case 35680:case 36300:case 36308:case 36293:return n0;case 36289:case 36303:case 36311:case 36292:return i0}}function s0(i,e){i.uniform1fv(this.addr,e)}function a0(i,e){const t=hr(e,this.size,2);i.uniform2fv(this.addr,t)}function o0(i,e){const t=hr(e,this.size,3);i.uniform3fv(this.addr,t)}function c0(i,e){const t=hr(e,this.size,4);i.uniform4fv(this.addr,t)}function l0(i,e){const t=hr(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function u0(i,e){const t=hr(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function d0(i,e){const t=hr(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function h0(i,e){i.uniform1iv(this.addr,e)}function f0(i,e){i.uniform2iv(this.addr,e)}function p0(i,e){i.uniform3iv(this.addr,e)}function m0(i,e){i.uniform4iv(this.addr,e)}function x0(i,e){i.uniform1uiv(this.addr,e)}function g0(i,e){i.uniform2uiv(this.addr,e)}function _0(i,e){i.uniform3uiv(this.addr,e)}function v0(i,e){i.uniform4uiv(this.addr,e)}function b0(i,e,t){const n=this.cache,r=e.length,s=Es(t,r);Nt(n,s)||(i.uniform1iv(this.addr,s),Ot(n,s));for(let a=0;a!==r;++a)t.setTexture2D(e[a]||Pl,s[a])}function M0(i,e,t){const n=this.cache,r=e.length,s=Es(t,r);Nt(n,s)||(i.uniform1iv(this.addr,s),Ot(n,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||Dl,s[a])}function y0(i,e,t){const n=this.cache,r=e.length,s=Es(t,r);Nt(n,s)||(i.uniform1iv(this.addr,s),Ot(n,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||Il,s[a])}function S0(i,e,t){const n=this.cache,r=e.length,s=Es(t,r);Nt(n,s)||(i.uniform1iv(this.addr,s),Ot(n,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||Ll,s[a])}function E0(i){switch(i){case 5126:return s0;case 35664:return a0;case 35665:return o0;case 35666:return c0;case 35674:return l0;case 35675:return u0;case 35676:return d0;case 5124:case 35670:return h0;case 35667:case 35671:return f0;case 35668:case 35672:return p0;case 35669:case 35673:return m0;case 5125:return x0;case 36294:return g0;case 36295:return _0;case 36296:return v0;case 35678:case 36198:case 36298:case 36306:case 35682:return b0;case 35679:case 36299:case 36307:return M0;case 35680:case 36300:case 36308:case 36293:return y0;case 36289:case 36303:case 36311:case 36292:return S0}}class T0{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=r0(t.type)}}class A0{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=E0(t.type)}}class w0{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],n)}}}const pa=/(\w+)(\])?(\[|\.)?/g;function Uc(i,e){i.seq.push(e),i.map[e.id]=e}function R0(i,e,t){const n=i.name,r=n.length;for(pa.lastIndex=0;;){const s=pa.exec(n),a=pa.lastIndex;let o=s[1];const c=s[2]==="]",l=s[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===r){Uc(t,l===void 0?new T0(o,i,e):new A0(o,i,e));break}else{let d=t.map[o];d===void 0&&(d=new w0(o),Uc(t,d)),t=d}}}class us{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){const s=e.getActiveUniform(t,r),a=e.getUniformLocation(t,s.name);R0(s,a,this)}}setValue(e,t,n,r){const s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){const r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,r)}}static seqWithValue(e,t){const n=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&n.push(a)}return n}}function Fc(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const C0=37297;let P0=0;function L0(i,e){const t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const Nc=new Ke;function D0(i){dt._getMatrix(Nc,dt.workingColorSpace,i);const e=`mat3( ${Nc.elements.map(t=>t.toFixed(4))} )`;switch(dt.getTransfer(i)){case fs:return[e,"LinearTransferOETF"];case mt:return[e,"sRGBTransferOETF"];default:return je("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Oc(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=(i.getShaderInfoLog(e)||"").trim();if(n&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+L0(i.getShaderSource(e),o)}else return s}function I0(i,e){const t=D0(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function U0(i,e){let t;switch(e){case Du:t="Linear";break;case Iu:t="Reinhard";break;case Uu:t="Cineon";break;case al:t="ACESFilmic";break;case Nu:t="AgX";break;case Ou:t="Neutral";break;case Fu:t="Custom";break;default:je("WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const ss=new G;function F0(){dt.getLuminanceCoefficients(ss);const i=ss.x.toFixed(4),e=ss.y.toFixed(4),t=ss.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function N0(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(yr).join(`
`)}function O0(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function z0(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const s=i.getActiveAttrib(e,r),a=s.name;let o=1;s.type===i.FLOAT_MAT2&&(o=2),s.type===i.FLOAT_MAT3&&(o=3),s.type===i.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function yr(i){return i!==""}function zc(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Bc(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const B0=/^[ \t]*#include +<([\w\d./]+)>/gm;function oo(i){return i.replace(B0,V0)}const k0=new Map;function V0(i,e){let t=Ze[e];if(t===void 0){const n=k0.get(e);if(n!==void 0)t=Ze[n],je('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return oo(t)}const G0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function kc(i){return i.replace(G0,H0)}function H0(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Vc(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function W0(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===il?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===rl?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Gn&&(e="SHADOWMAP_TYPE_VSM"),e}function X0(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case tr:case nr:e="ENVMAP_TYPE_CUBE";break;case Ms:e="ENVMAP_TYPE_CUBE_UV";break}return e}function q0(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case nr:e="ENVMAP_MODE_REFRACTION";break}return e}function $0(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case sl:e="ENVMAP_BLENDING_MULTIPLY";break;case Pu:e="ENVMAP_BLENDING_MIX";break;case Lu:e="ENVMAP_BLENDING_ADD";break}return e}function Y0(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function j0(i,e,t,n){const r=i.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=W0(t),l=X0(t),u=q0(t),d=$0(t),f=Y0(t),p=N0(t),v=O0(s),M=r.createProgram();let m,h,P=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(yr).join(`
`),m.length>0&&(m+=`
`),h=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(yr).join(`
`),h.length>0&&(h+=`
`)):(m=[Vc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(yr).join(`
`),h=[Vc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==oi?"#define TONE_MAPPING":"",t.toneMapping!==oi?Ze.tonemapping_pars_fragment:"",t.toneMapping!==oi?U0("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ze.colorspace_pars_fragment,I0("linearToOutputTexel",t.outputColorSpace),F0(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(yr).join(`
`)),a=oo(a),a=zc(a,t),a=Bc(a,t),o=oo(o),o=zc(o,t),o=Bc(o,t),a=kc(a),o=kc(o),t.isRawShaderMaterial!==!0&&(P=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,h=["#define varying in",t.glslVersion===Xo?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Xo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+h);const R=P+m+a,w=P+h+o,S=Fc(r,r.VERTEX_SHADER,R),g=Fc(r,r.FRAGMENT_SHADER,w);r.attachShader(M,S),r.attachShader(M,g),t.index0AttributeName!==void 0?r.bindAttribLocation(M,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(M,0,"position"),r.linkProgram(M);function A(T){if(i.debug.checkShaderErrors){const F=r.getProgramInfoLog(M)||"",L=r.getShaderInfoLog(S)||"",V=r.getShaderInfoLog(g)||"",X=F.trim(),K=L.trim(),se=V.trim();let j=!0,ne=!0;if(r.getProgramParameter(M,r.LINK_STATUS)===!1)if(j=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,M,S,g);else{const ee=Oc(r,S,"vertex"),fe=Oc(r,g,"fragment");wt("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(M,r.VALIDATE_STATUS)+`

Material Name: `+T.name+`
Material Type: `+T.type+`

Program Info Log: `+X+`
`+ee+`
`+fe)}else X!==""?je("WebGLProgram: Program Info Log:",X):(K===""||se==="")&&(ne=!1);ne&&(T.diagnostics={runnable:j,programLog:X,vertexShader:{log:K,prefix:m},fragmentShader:{log:se,prefix:h}})}r.deleteShader(S),r.deleteShader(g),I=new us(r,M),x=z0(r,M)}let I;this.getUniforms=function(){return I===void 0&&A(this),I};let x;this.getAttributes=function(){return x===void 0&&A(this),x};let _=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return _===!1&&(_=r.getProgramParameter(M,C0)),_},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(M),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=P0++,this.cacheKey=e,this.usedTimes=1,this.program=M,this.vertexShader=S,this.fragmentShader=g,this}let K0=0;class Z0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new J0(e),t.set(e,n)),n}}class J0{constructor(e){this.id=K0++,this.code=e,this.usedTimes=0}}function Q0(i,e,t,n,r,s,a){const o=new To,c=new Z0,l=new Set,u=[],d=r.logarithmicDepthBuffer,f=r.vertexTextures;let p=r.precision;const v={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function M(x){return l.add(x),x===0?"uv":`uv${x}`}function m(x,_,T,F,L){const V=F.fog,X=L.geometry,K=x.isMeshStandardMaterial?F.environment:null,se=(x.isMeshStandardMaterial?t:e).get(x.envMap||K),j=se&&se.mapping===Ms?se.image.height:null,ne=v[x.type];x.precision!==null&&(p=r.getMaxPrecision(x.precision),p!==x.precision&&je("WebGLProgram.getParameters:",x.precision,"not supported, using",p,"instead."));const ee=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,fe=ee!==void 0?ee.length:0;let Ce=0;X.morphAttributes.position!==void 0&&(Ce=1),X.morphAttributes.normal!==void 0&&(Ce=2),X.morphAttributes.color!==void 0&&(Ce=3);let Oe,He,ut,te;if(ne){const et=Pn[ne];Oe=et.vertexShader,He=et.fragmentShader}else Oe=x.vertexShader,He=x.fragmentShader,c.update(x),ut=c.getVertexShaderID(x),te=c.getFragmentShaderID(x);const oe=i.getRenderTarget(),we=i.state.buffers.depth.getReversed(),Ye=L.isInstancedMesh===!0,De=L.isBatchedMesh===!0,Je=!!x.map,Ct=!!x.matcap,Qe=!!se,_t=!!x.aoMap,N=!!x.lightMap,nt=!!x.bumpMap,it=!!x.normalMap,ft=!!x.displacementMap,Ae=!!x.emissiveMap,St=!!x.metalnessMap,Ue=!!x.roughnessMap,$e=x.anisotropy>0,C=x.clearcoat>0,b=x.dispersion>0,W=x.iridescence>0,re=x.sheen>0,ae=x.transmission>0,Z=$e&&!!x.anisotropyMap,Pe=C&&!!x.clearcoatMap,ve=C&&!!x.clearcoatNormalMap,Fe=C&&!!x.clearcoatRoughnessMap,Le=W&&!!x.iridescenceMap,le=W&&!!x.iridescenceThicknessMap,J=re&&!!x.sheenColorMap,We=re&&!!x.sheenRoughnessMap,ze=!!x.specularMap,ye=!!x.specularColorMap,Xe=!!x.specularIntensityMap,O=ae&&!!x.transmissionMap,_e=ae&&!!x.thicknessMap,pe=!!x.gradientMap,he=!!x.alphaMap,ue=x.alphaTest>0,ie=!!x.alphaHash,xe=!!x.extensions;let ke=oi;x.toneMapped&&(oe===null||oe.isXRRenderTarget===!0)&&(ke=i.toneMapping);const st={shaderID:ne,shaderType:x.type,shaderName:x.name,vertexShader:Oe,fragmentShader:He,defines:x.defines,customVertexShaderID:ut,customFragmentShaderID:te,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:p,batching:De,batchingColor:De&&L._colorsTexture!==null,instancing:Ye,instancingColor:Ye&&L.instanceColor!==null,instancingMorph:Ye&&L.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:oe===null?i.outputColorSpace:oe.isXRRenderTarget===!0?oe.texture.colorSpace:ir,alphaToCoverage:!!x.alphaToCoverage,map:Je,matcap:Ct,envMap:Qe,envMapMode:Qe&&se.mapping,envMapCubeUVHeight:j,aoMap:_t,lightMap:N,bumpMap:nt,normalMap:it,displacementMap:f&&ft,emissiveMap:Ae,normalMapObjectSpace:it&&x.normalMapType===Vu,normalMapTangentSpace:it&&x.normalMapType===pl,metalnessMap:St,roughnessMap:Ue,anisotropy:$e,anisotropyMap:Z,clearcoat:C,clearcoatMap:Pe,clearcoatNormalMap:ve,clearcoatRoughnessMap:Fe,dispersion:b,iridescence:W,iridescenceMap:Le,iridescenceThicknessMap:le,sheen:re,sheenColorMap:J,sheenRoughnessMap:We,specularMap:ze,specularColorMap:ye,specularIntensityMap:Xe,transmission:ae,transmissionMap:O,thicknessMap:_e,gradientMap:pe,opaque:x.transparent===!1&&x.blending===Ki&&x.alphaToCoverage===!1,alphaMap:he,alphaTest:ue,alphaHash:ie,combine:x.combine,mapUv:Je&&M(x.map.channel),aoMapUv:_t&&M(x.aoMap.channel),lightMapUv:N&&M(x.lightMap.channel),bumpMapUv:nt&&M(x.bumpMap.channel),normalMapUv:it&&M(x.normalMap.channel),displacementMapUv:ft&&M(x.displacementMap.channel),emissiveMapUv:Ae&&M(x.emissiveMap.channel),metalnessMapUv:St&&M(x.metalnessMap.channel),roughnessMapUv:Ue&&M(x.roughnessMap.channel),anisotropyMapUv:Z&&M(x.anisotropyMap.channel),clearcoatMapUv:Pe&&M(x.clearcoatMap.channel),clearcoatNormalMapUv:ve&&M(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Fe&&M(x.clearcoatRoughnessMap.channel),iridescenceMapUv:Le&&M(x.iridescenceMap.channel),iridescenceThicknessMapUv:le&&M(x.iridescenceThicknessMap.channel),sheenColorMapUv:J&&M(x.sheenColorMap.channel),sheenRoughnessMapUv:We&&M(x.sheenRoughnessMap.channel),specularMapUv:ze&&M(x.specularMap.channel),specularColorMapUv:ye&&M(x.specularColorMap.channel),specularIntensityMapUv:Xe&&M(x.specularIntensityMap.channel),transmissionMapUv:O&&M(x.transmissionMap.channel),thicknessMapUv:_e&&M(x.thicknessMap.channel),alphaMapUv:he&&M(x.alphaMap.channel),vertexTangents:!!X.attributes.tangent&&(it||$e),vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!X.attributes.uv&&(Je||he),fog:!!V,useFog:x.fog===!0,fogExp2:!!V&&V.isFogExp2,flatShading:x.flatShading===!0&&x.wireframe===!1,sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:we,skinning:L.isSkinnedMesh===!0,morphTargets:X.morphAttributes.position!==void 0,morphNormals:X.morphAttributes.normal!==void 0,morphColors:X.morphAttributes.color!==void 0,morphTargetsCount:fe,morphTextureStride:Ce,numDirLights:_.directional.length,numPointLights:_.point.length,numSpotLights:_.spot.length,numSpotLightMaps:_.spotLightMap.length,numRectAreaLights:_.rectArea.length,numHemiLights:_.hemi.length,numDirLightShadows:_.directionalShadowMap.length,numPointLightShadows:_.pointShadowMap.length,numSpotLightShadows:_.spotShadowMap.length,numSpotLightShadowsWithMaps:_.numSpotLightShadowsWithMaps,numLightProbes:_.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:x.dithering,shadowMapEnabled:i.shadowMap.enabled&&T.length>0,shadowMapType:i.shadowMap.type,toneMapping:ke,decodeVideoTexture:Je&&x.map.isVideoTexture===!0&&dt.getTransfer(x.map.colorSpace)===mt,decodeVideoTextureEmissive:Ae&&x.emissiveMap.isVideoTexture===!0&&dt.getTransfer(x.emissiveMap.colorSpace)===mt,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===vn,flipSided:x.side===sn,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:xe&&x.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(xe&&x.extensions.multiDraw===!0||De)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return st.vertexUv1s=l.has(1),st.vertexUv2s=l.has(2),st.vertexUv3s=l.has(3),l.clear(),st}function h(x){const _=[];if(x.shaderID?_.push(x.shaderID):(_.push(x.customVertexShaderID),_.push(x.customFragmentShaderID)),x.defines!==void 0)for(const T in x.defines)_.push(T),_.push(x.defines[T]);return x.isRawShaderMaterial===!1&&(P(_,x),R(_,x),_.push(i.outputColorSpace)),_.push(x.customProgramCacheKey),_.join()}function P(x,_){x.push(_.precision),x.push(_.outputColorSpace),x.push(_.envMapMode),x.push(_.envMapCubeUVHeight),x.push(_.mapUv),x.push(_.alphaMapUv),x.push(_.lightMapUv),x.push(_.aoMapUv),x.push(_.bumpMapUv),x.push(_.normalMapUv),x.push(_.displacementMapUv),x.push(_.emissiveMapUv),x.push(_.metalnessMapUv),x.push(_.roughnessMapUv),x.push(_.anisotropyMapUv),x.push(_.clearcoatMapUv),x.push(_.clearcoatNormalMapUv),x.push(_.clearcoatRoughnessMapUv),x.push(_.iridescenceMapUv),x.push(_.iridescenceThicknessMapUv),x.push(_.sheenColorMapUv),x.push(_.sheenRoughnessMapUv),x.push(_.specularMapUv),x.push(_.specularColorMapUv),x.push(_.specularIntensityMapUv),x.push(_.transmissionMapUv),x.push(_.thicknessMapUv),x.push(_.combine),x.push(_.fogExp2),x.push(_.sizeAttenuation),x.push(_.morphTargetsCount),x.push(_.morphAttributeCount),x.push(_.numDirLights),x.push(_.numPointLights),x.push(_.numSpotLights),x.push(_.numSpotLightMaps),x.push(_.numHemiLights),x.push(_.numRectAreaLights),x.push(_.numDirLightShadows),x.push(_.numPointLightShadows),x.push(_.numSpotLightShadows),x.push(_.numSpotLightShadowsWithMaps),x.push(_.numLightProbes),x.push(_.shadowMapType),x.push(_.toneMapping),x.push(_.numClippingPlanes),x.push(_.numClipIntersection),x.push(_.depthPacking)}function R(x,_){o.disableAll(),_.supportsVertexTextures&&o.enable(0),_.instancing&&o.enable(1),_.instancingColor&&o.enable(2),_.instancingMorph&&o.enable(3),_.matcap&&o.enable(4),_.envMap&&o.enable(5),_.normalMapObjectSpace&&o.enable(6),_.normalMapTangentSpace&&o.enable(7),_.clearcoat&&o.enable(8),_.iridescence&&o.enable(9),_.alphaTest&&o.enable(10),_.vertexColors&&o.enable(11),_.vertexAlphas&&o.enable(12),_.vertexUv1s&&o.enable(13),_.vertexUv2s&&o.enable(14),_.vertexUv3s&&o.enable(15),_.vertexTangents&&o.enable(16),_.anisotropy&&o.enable(17),_.alphaHash&&o.enable(18),_.batching&&o.enable(19),_.dispersion&&o.enable(20),_.batchingColor&&o.enable(21),_.gradientMap&&o.enable(22),x.push(o.mask),o.disableAll(),_.fog&&o.enable(0),_.useFog&&o.enable(1),_.flatShading&&o.enable(2),_.logarithmicDepthBuffer&&o.enable(3),_.reversedDepthBuffer&&o.enable(4),_.skinning&&o.enable(5),_.morphTargets&&o.enable(6),_.morphNormals&&o.enable(7),_.morphColors&&o.enable(8),_.premultipliedAlpha&&o.enable(9),_.shadowMapEnabled&&o.enable(10),_.doubleSided&&o.enable(11),_.flipSided&&o.enable(12),_.useDepthPacking&&o.enable(13),_.dithering&&o.enable(14),_.transmission&&o.enable(15),_.sheen&&o.enable(16),_.opaque&&o.enable(17),_.pointsUvs&&o.enable(18),_.decodeVideoTexture&&o.enable(19),_.decodeVideoTextureEmissive&&o.enable(20),_.alphaToCoverage&&o.enable(21),x.push(o.mask)}function w(x){const _=v[x.type];let T;if(_){const F=Pn[_];T=xd.clone(F.uniforms)}else T=x.uniforms;return T}function S(x,_){let T;for(let F=0,L=u.length;F<L;F++){const V=u[F];if(V.cacheKey===_){T=V,++T.usedTimes;break}}return T===void 0&&(T=new j0(i,_,x,s),u.push(T)),T}function g(x){if(--x.usedTimes===0){const _=u.indexOf(x);u[_]=u[u.length-1],u.pop(),x.destroy()}}function A(x){c.remove(x)}function I(){c.dispose()}return{getParameters:m,getProgramCacheKey:h,getUniforms:w,acquireProgram:S,releaseProgram:g,releaseShaderCache:A,programs:u,dispose:I}}function em(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function r(a,o,c){i.get(a)[o]=c}function s(){i=new WeakMap}return{has:e,get:t,remove:n,update:r,dispose:s}}function tm(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function Gc(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Hc(){const i=[];let e=0;const t=[],n=[],r=[];function s(){e=0,t.length=0,n.length=0,r.length=0}function a(d,f,p,v,M,m){let h=i[e];return h===void 0?(h={id:d.id,object:d,geometry:f,material:p,groupOrder:v,renderOrder:d.renderOrder,z:M,group:m},i[e]=h):(h.id=d.id,h.object=d,h.geometry=f,h.material=p,h.groupOrder=v,h.renderOrder=d.renderOrder,h.z=M,h.group=m),e++,h}function o(d,f,p,v,M,m){const h=a(d,f,p,v,M,m);p.transmission>0?n.push(h):p.transparent===!0?r.push(h):t.push(h)}function c(d,f,p,v,M,m){const h=a(d,f,p,v,M,m);p.transmission>0?n.unshift(h):p.transparent===!0?r.unshift(h):t.unshift(h)}function l(d,f){t.length>1&&t.sort(d||tm),n.length>1&&n.sort(f||Gc),r.length>1&&r.sort(f||Gc)}function u(){for(let d=e,f=i.length;d<f;d++){const p=i[d];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:r,init:s,push:o,unshift:c,finish:u,sort:l}}function nm(){let i=new WeakMap;function e(n,r){const s=i.get(n);let a;return s===void 0?(a=new Hc,i.set(n,[a])):r>=s.length?(a=new Hc,s.push(a)):a=s[r],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function im(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new G,color:new ct};break;case"SpotLight":t={position:new G,direction:new G,color:new ct,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new G,color:new ct,distance:0,decay:0};break;case"HemisphereLight":t={direction:new G,skyColor:new ct,groundColor:new ct};break;case"RectAreaLight":t={color:new ct,position:new G,halfWidth:new G,halfHeight:new G};break}return i[e.id]=t,t}}}function rm(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new lt};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new lt};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new lt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let sm=0;function am(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function om(i){const e=new im,t=rm(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new G);const r=new G,s=new gt,a=new gt;function o(l){let u=0,d=0,f=0;for(let x=0;x<9;x++)n.probe[x].set(0,0,0);let p=0,v=0,M=0,m=0,h=0,P=0,R=0,w=0,S=0,g=0,A=0;l.sort(am);for(let x=0,_=l.length;x<_;x++){const T=l[x],F=T.color,L=T.intensity,V=T.distance,X=T.shadow&&T.shadow.map?T.shadow.map.texture:null;if(T.isAmbientLight)u+=F.r*L,d+=F.g*L,f+=F.b*L;else if(T.isLightProbe){for(let K=0;K<9;K++)n.probe[K].addScaledVector(T.sh.coefficients[K],L);A++}else if(T.isDirectionalLight){const K=e.get(T);if(K.color.copy(T.color).multiplyScalar(T.intensity),T.castShadow){const se=T.shadow,j=t.get(T);j.shadowIntensity=se.intensity,j.shadowBias=se.bias,j.shadowNormalBias=se.normalBias,j.shadowRadius=se.radius,j.shadowMapSize=se.mapSize,n.directionalShadow[p]=j,n.directionalShadowMap[p]=X,n.directionalShadowMatrix[p]=T.shadow.matrix,P++}n.directional[p]=K,p++}else if(T.isSpotLight){const K=e.get(T);K.position.setFromMatrixPosition(T.matrixWorld),K.color.copy(F).multiplyScalar(L),K.distance=V,K.coneCos=Math.cos(T.angle),K.penumbraCos=Math.cos(T.angle*(1-T.penumbra)),K.decay=T.decay,n.spot[M]=K;const se=T.shadow;if(T.map&&(n.spotLightMap[S]=T.map,S++,se.updateMatrices(T),T.castShadow&&g++),n.spotLightMatrix[M]=se.matrix,T.castShadow){const j=t.get(T);j.shadowIntensity=se.intensity,j.shadowBias=se.bias,j.shadowNormalBias=se.normalBias,j.shadowRadius=se.radius,j.shadowMapSize=se.mapSize,n.spotShadow[M]=j,n.spotShadowMap[M]=X,w++}M++}else if(T.isRectAreaLight){const K=e.get(T);K.color.copy(F).multiplyScalar(L),K.halfWidth.set(T.width*.5,0,0),K.halfHeight.set(0,T.height*.5,0),n.rectArea[m]=K,m++}else if(T.isPointLight){const K=e.get(T);if(K.color.copy(T.color).multiplyScalar(T.intensity),K.distance=T.distance,K.decay=T.decay,T.castShadow){const se=T.shadow,j=t.get(T);j.shadowIntensity=se.intensity,j.shadowBias=se.bias,j.shadowNormalBias=se.normalBias,j.shadowRadius=se.radius,j.shadowMapSize=se.mapSize,j.shadowCameraNear=se.camera.near,j.shadowCameraFar=se.camera.far,n.pointShadow[v]=j,n.pointShadowMap[v]=X,n.pointShadowMatrix[v]=T.shadow.matrix,R++}n.point[v]=K,v++}else if(T.isHemisphereLight){const K=e.get(T);K.skyColor.copy(T.color).multiplyScalar(L),K.groundColor.copy(T.groundColor).multiplyScalar(L),n.hemi[h]=K,h++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Me.LTC_FLOAT_1,n.rectAreaLTC2=Me.LTC_FLOAT_2):(n.rectAreaLTC1=Me.LTC_HALF_1,n.rectAreaLTC2=Me.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=d,n.ambient[2]=f;const I=n.hash;(I.directionalLength!==p||I.pointLength!==v||I.spotLength!==M||I.rectAreaLength!==m||I.hemiLength!==h||I.numDirectionalShadows!==P||I.numPointShadows!==R||I.numSpotShadows!==w||I.numSpotMaps!==S||I.numLightProbes!==A)&&(n.directional.length=p,n.spot.length=M,n.rectArea.length=m,n.point.length=v,n.hemi.length=h,n.directionalShadow.length=P,n.directionalShadowMap.length=P,n.pointShadow.length=R,n.pointShadowMap.length=R,n.spotShadow.length=w,n.spotShadowMap.length=w,n.directionalShadowMatrix.length=P,n.pointShadowMatrix.length=R,n.spotLightMatrix.length=w+S-g,n.spotLightMap.length=S,n.numSpotLightShadowsWithMaps=g,n.numLightProbes=A,I.directionalLength=p,I.pointLength=v,I.spotLength=M,I.rectAreaLength=m,I.hemiLength=h,I.numDirectionalShadows=P,I.numPointShadows=R,I.numSpotShadows=w,I.numSpotMaps=S,I.numLightProbes=A,n.version=sm++)}function c(l,u){let d=0,f=0,p=0,v=0,M=0;const m=u.matrixWorldInverse;for(let h=0,P=l.length;h<P;h++){const R=l[h];if(R.isDirectionalLight){const w=n.directional[d];w.direction.setFromMatrixPosition(R.matrixWorld),r.setFromMatrixPosition(R.target.matrixWorld),w.direction.sub(r),w.direction.transformDirection(m),d++}else if(R.isSpotLight){const w=n.spot[p];w.position.setFromMatrixPosition(R.matrixWorld),w.position.applyMatrix4(m),w.direction.setFromMatrixPosition(R.matrixWorld),r.setFromMatrixPosition(R.target.matrixWorld),w.direction.sub(r),w.direction.transformDirection(m),p++}else if(R.isRectAreaLight){const w=n.rectArea[v];w.position.setFromMatrixPosition(R.matrixWorld),w.position.applyMatrix4(m),a.identity(),s.copy(R.matrixWorld),s.premultiply(m),a.extractRotation(s),w.halfWidth.set(R.width*.5,0,0),w.halfHeight.set(0,R.height*.5,0),w.halfWidth.applyMatrix4(a),w.halfHeight.applyMatrix4(a),v++}else if(R.isPointLight){const w=n.point[f];w.position.setFromMatrixPosition(R.matrixWorld),w.position.applyMatrix4(m),f++}else if(R.isHemisphereLight){const w=n.hemi[M];w.direction.setFromMatrixPosition(R.matrixWorld),w.direction.transformDirection(m),M++}}}return{setup:o,setupView:c,state:n}}function Wc(i){const e=new om(i),t=[],n=[];function r(u){l.camera=u,t.length=0,n.length=0}function s(u){t.push(u)}function a(u){n.push(u)}function o(){e.setup(t)}function c(u){e.setupView(t,u)}const l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:l,setupLights:o,setupLightsView:c,pushLight:s,pushShadow:a}}function cm(i){let e=new WeakMap;function t(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new Wc(i),e.set(r,[o])):s>=a.length?(o=new Wc(i),a.push(o)):o=a[s],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const lm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,um=`uniform sampler2D shadow_pass;
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
}`;function dm(i,e,t){let n=new wo;const r=new lt,s=new lt,a=new xt,o=new Cd({depthPacking:ku}),c=new Pd,l={},u=t.maxTextureSize,d={[ui]:sn,[sn]:ui,[vn]:vn},f=new Kn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new lt},radius:{value:4}},vertexShader:lm,fragmentShader:um}),p=f.clone();p.defines.HORIZONTAL_PASS=1;const v=new jt;v.setAttribute("position",new mn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const M=new rn(v,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=il;let h=this.type;this.render=function(g,A,I){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||g.length===0)return;const x=i.getRenderTarget(),_=i.getActiveCubeFace(),T=i.getActiveMipmapLevel(),F=i.state;F.setBlending($n),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const L=h!==Gn&&this.type===Gn,V=h===Gn&&this.type!==Gn;for(let X=0,K=g.length;X<K;X++){const se=g[X],j=se.shadow;if(j===void 0){je("WebGLShadowMap:",se,"has no shadow.");continue}if(j.autoUpdate===!1&&j.needsUpdate===!1)continue;r.copy(j.mapSize);const ne=j.getFrameExtents();if(r.multiply(ne),s.copy(j.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/ne.x),r.x=s.x*ne.x,j.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/ne.y),r.y=s.y*ne.y,j.mapSize.y=s.y)),j.map===null||L===!0||V===!0){const fe=this.type!==Gn?{minFilter:un,magFilter:un}:{};j.map!==null&&j.map.dispose(),j.map=new Ei(r.x,r.y,fe),j.map.texture.name=se.name+".shadowMap",j.camera.updateProjectionMatrix()}i.setRenderTarget(j.map),i.clear();const ee=j.getViewportCount();for(let fe=0;fe<ee;fe++){const Ce=j.getViewport(fe);a.set(s.x*Ce.x,s.y*Ce.y,s.x*Ce.z,s.y*Ce.w),F.viewport(a),j.updateMatrices(se,fe),n=j.getFrustum(),w(A,I,j.camera,se,this.type)}j.isPointLightShadow!==!0&&this.type===Gn&&P(j,I),j.needsUpdate=!1}h=this.type,m.needsUpdate=!1,i.setRenderTarget(x,_,T)};function P(g,A){const I=e.update(M);f.defines.VSM_SAMPLES!==g.blurSamples&&(f.defines.VSM_SAMPLES=g.blurSamples,p.defines.VSM_SAMPLES=g.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),g.mapPass===null&&(g.mapPass=new Ei(r.x,r.y)),f.uniforms.shadow_pass.value=g.map.texture,f.uniforms.resolution.value=g.mapSize,f.uniforms.radius.value=g.radius,i.setRenderTarget(g.mapPass),i.clear(),i.renderBufferDirect(A,null,I,f,M,null),p.uniforms.shadow_pass.value=g.mapPass.texture,p.uniforms.resolution.value=g.mapSize,p.uniforms.radius.value=g.radius,i.setRenderTarget(g.map),i.clear(),i.renderBufferDirect(A,null,I,p,M,null)}function R(g,A,I,x){let _=null;const T=I.isPointLight===!0?g.customDistanceMaterial:g.customDepthMaterial;if(T!==void 0)_=T;else if(_=I.isPointLight===!0?c:o,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){const F=_.uuid,L=A.uuid;let V=l[F];V===void 0&&(V={},l[F]=V);let X=V[L];X===void 0&&(X=_.clone(),V[L]=X,A.addEventListener("dispose",S)),_=X}if(_.visible=A.visible,_.wireframe=A.wireframe,x===Gn?_.side=A.shadowSide!==null?A.shadowSide:A.side:_.side=A.shadowSide!==null?A.shadowSide:d[A.side],_.alphaMap=A.alphaMap,_.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,_.map=A.map,_.clipShadows=A.clipShadows,_.clippingPlanes=A.clippingPlanes,_.clipIntersection=A.clipIntersection,_.displacementMap=A.displacementMap,_.displacementScale=A.displacementScale,_.displacementBias=A.displacementBias,_.wireframeLinewidth=A.wireframeLinewidth,_.linewidth=A.linewidth,I.isPointLight===!0&&_.isMeshDistanceMaterial===!0){const F=i.properties.get(_);F.light=I}return _}function w(g,A,I,x,_){if(g.visible===!1)return;if(g.layers.test(A.layers)&&(g.isMesh||g.isLine||g.isPoints)&&(g.castShadow||g.receiveShadow&&_===Gn)&&(!g.frustumCulled||n.intersectsObject(g))){g.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,g.matrixWorld);const L=e.update(g),V=g.material;if(Array.isArray(V)){const X=L.groups;for(let K=0,se=X.length;K<se;K++){const j=X[K],ne=V[j.materialIndex];if(ne&&ne.visible){const ee=R(g,ne,x,_);g.onBeforeShadow(i,g,A,I,L,ee,j),i.renderBufferDirect(I,null,L,ee,g,j),g.onAfterShadow(i,g,A,I,L,ee,j)}}}else if(V.visible){const X=R(g,V,x,_);g.onBeforeShadow(i,g,A,I,L,X,null),i.renderBufferDirect(I,null,L,X,g,null),g.onAfterShadow(i,g,A,I,L,X,null)}}const F=g.children;for(let L=0,V=F.length;L<V;L++)w(F[L],A,I,x,_)}function S(g){g.target.removeEventListener("dispose",S);for(const I in l){const x=l[I],_=g.target.uuid;_ in x&&(x[_].dispose(),delete x[_])}}}const hm={[Ma]:ya,[Sa]:Aa,[Ea]:wa,[er]:Ta,[ya]:Ma,[Aa]:Sa,[wa]:Ea,[Ta]:er};function fm(i,e){function t(){let O=!1;const _e=new xt;let pe=null;const he=new xt(0,0,0,0);return{setMask:function(ue){pe!==ue&&!O&&(i.colorMask(ue,ue,ue,ue),pe=ue)},setLocked:function(ue){O=ue},setClear:function(ue,ie,xe,ke,st){st===!0&&(ue*=ke,ie*=ke,xe*=ke),_e.set(ue,ie,xe,ke),he.equals(_e)===!1&&(i.clearColor(ue,ie,xe,ke),he.copy(_e))},reset:function(){O=!1,pe=null,he.set(-1,0,0,0)}}}function n(){let O=!1,_e=!1,pe=null,he=null,ue=null;return{setReversed:function(ie){if(_e!==ie){const xe=e.get("EXT_clip_control");ie?xe.clipControlEXT(xe.LOWER_LEFT_EXT,xe.ZERO_TO_ONE_EXT):xe.clipControlEXT(xe.LOWER_LEFT_EXT,xe.NEGATIVE_ONE_TO_ONE_EXT),_e=ie;const ke=ue;ue=null,this.setClear(ke)}},getReversed:function(){return _e},setTest:function(ie){ie?oe(i.DEPTH_TEST):we(i.DEPTH_TEST)},setMask:function(ie){pe!==ie&&!O&&(i.depthMask(ie),pe=ie)},setFunc:function(ie){if(_e&&(ie=hm[ie]),he!==ie){switch(ie){case Ma:i.depthFunc(i.NEVER);break;case ya:i.depthFunc(i.ALWAYS);break;case Sa:i.depthFunc(i.LESS);break;case er:i.depthFunc(i.LEQUAL);break;case Ea:i.depthFunc(i.EQUAL);break;case Ta:i.depthFunc(i.GEQUAL);break;case Aa:i.depthFunc(i.GREATER);break;case wa:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}he=ie}},setLocked:function(ie){O=ie},setClear:function(ie){ue!==ie&&(_e&&(ie=1-ie),i.clearDepth(ie),ue=ie)},reset:function(){O=!1,pe=null,he=null,ue=null,_e=!1}}}function r(){let O=!1,_e=null,pe=null,he=null,ue=null,ie=null,xe=null,ke=null,st=null;return{setTest:function(et){O||(et?oe(i.STENCIL_TEST):we(i.STENCIL_TEST))},setMask:function(et){_e!==et&&!O&&(i.stencilMask(et),_e=et)},setFunc:function(et,It,Gt){(pe!==et||he!==It||ue!==Gt)&&(i.stencilFunc(et,It,Gt),pe=et,he=It,ue=Gt)},setOp:function(et,It,Gt){(ie!==et||xe!==It||ke!==Gt)&&(i.stencilOp(et,It,Gt),ie=et,xe=It,ke=Gt)},setLocked:function(et){O=et},setClear:function(et){st!==et&&(i.clearStencil(et),st=et)},reset:function(){O=!1,_e=null,pe=null,he=null,ue=null,ie=null,xe=null,ke=null,st=null}}}const s=new t,a=new n,o=new r,c=new WeakMap,l=new WeakMap;let u={},d={},f=new WeakMap,p=[],v=null,M=!1,m=null,h=null,P=null,R=null,w=null,S=null,g=null,A=new ct(0,0,0),I=0,x=!1,_=null,T=null,F=null,L=null,V=null;const X=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let K=!1,se=0;const j=i.getParameter(i.VERSION);j.indexOf("WebGL")!==-1?(se=parseFloat(/^WebGL (\d)/.exec(j)[1]),K=se>=1):j.indexOf("OpenGL ES")!==-1&&(se=parseFloat(/^OpenGL ES (\d)/.exec(j)[1]),K=se>=2);let ne=null,ee={};const fe=i.getParameter(i.SCISSOR_BOX),Ce=i.getParameter(i.VIEWPORT),Oe=new xt().fromArray(fe),He=new xt().fromArray(Ce);function ut(O,_e,pe,he){const ue=new Uint8Array(4),ie=i.createTexture();i.bindTexture(O,ie),i.texParameteri(O,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(O,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let xe=0;xe<pe;xe++)O===i.TEXTURE_3D||O===i.TEXTURE_2D_ARRAY?i.texImage3D(_e,0,i.RGBA,1,1,he,0,i.RGBA,i.UNSIGNED_BYTE,ue):i.texImage2D(_e+xe,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ue);return ie}const te={};te[i.TEXTURE_2D]=ut(i.TEXTURE_2D,i.TEXTURE_2D,1),te[i.TEXTURE_CUBE_MAP]=ut(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),te[i.TEXTURE_2D_ARRAY]=ut(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),te[i.TEXTURE_3D]=ut(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),oe(i.DEPTH_TEST),a.setFunc(er),nt(!1),it(Bo),oe(i.CULL_FACE),_t($n);function oe(O){u[O]!==!0&&(i.enable(O),u[O]=!0)}function we(O){u[O]!==!1&&(i.disable(O),u[O]=!1)}function Ye(O,_e){return d[O]!==_e?(i.bindFramebuffer(O,_e),d[O]=_e,O===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=_e),O===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=_e),!0):!1}function De(O,_e){let pe=p,he=!1;if(O){pe=f.get(_e),pe===void 0&&(pe=[],f.set(_e,pe));const ue=O.textures;if(pe.length!==ue.length||pe[0]!==i.COLOR_ATTACHMENT0){for(let ie=0,xe=ue.length;ie<xe;ie++)pe[ie]=i.COLOR_ATTACHMENT0+ie;pe.length=ue.length,he=!0}}else pe[0]!==i.BACK&&(pe[0]=i.BACK,he=!0);he&&i.drawBuffers(pe)}function Je(O){return v!==O?(i.useProgram(O),v=O,!0):!1}const Ct={[vi]:i.FUNC_ADD,[fu]:i.FUNC_SUBTRACT,[pu]:i.FUNC_REVERSE_SUBTRACT};Ct[mu]=i.MIN,Ct[xu]=i.MAX;const Qe={[gu]:i.ZERO,[_u]:i.ONE,[vu]:i.SRC_COLOR,[va]:i.SRC_ALPHA,[Tu]:i.SRC_ALPHA_SATURATE,[Su]:i.DST_COLOR,[Mu]:i.DST_ALPHA,[bu]:i.ONE_MINUS_SRC_COLOR,[ba]:i.ONE_MINUS_SRC_ALPHA,[Eu]:i.ONE_MINUS_DST_COLOR,[yu]:i.ONE_MINUS_DST_ALPHA,[Au]:i.CONSTANT_COLOR,[wu]:i.ONE_MINUS_CONSTANT_COLOR,[Ru]:i.CONSTANT_ALPHA,[Cu]:i.ONE_MINUS_CONSTANT_ALPHA};function _t(O,_e,pe,he,ue,ie,xe,ke,st,et){if(O===$n){M===!0&&(we(i.BLEND),M=!1);return}if(M===!1&&(oe(i.BLEND),M=!0),O!==hu){if(O!==m||et!==x){if((h!==vi||w!==vi)&&(i.blendEquation(i.FUNC_ADD),h=vi,w=vi),et)switch(O){case Ki:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ko:i.blendFunc(i.ONE,i.ONE);break;case Vo:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Go:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:wt("WebGLState: Invalid blending: ",O);break}else switch(O){case Ki:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ko:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Vo:wt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Go:wt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:wt("WebGLState: Invalid blending: ",O);break}P=null,R=null,S=null,g=null,A.set(0,0,0),I=0,m=O,x=et}return}ue=ue||_e,ie=ie||pe,xe=xe||he,(_e!==h||ue!==w)&&(i.blendEquationSeparate(Ct[_e],Ct[ue]),h=_e,w=ue),(pe!==P||he!==R||ie!==S||xe!==g)&&(i.blendFuncSeparate(Qe[pe],Qe[he],Qe[ie],Qe[xe]),P=pe,R=he,S=ie,g=xe),(ke.equals(A)===!1||st!==I)&&(i.blendColor(ke.r,ke.g,ke.b,st),A.copy(ke),I=st),m=O,x=!1}function N(O,_e){O.side===vn?we(i.CULL_FACE):oe(i.CULL_FACE);let pe=O.side===sn;_e&&(pe=!pe),nt(pe),O.blending===Ki&&O.transparent===!1?_t($n):_t(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),a.setFunc(O.depthFunc),a.setTest(O.depthTest),a.setMask(O.depthWrite),s.setMask(O.colorWrite);const he=O.stencilWrite;o.setTest(he),he&&(o.setMask(O.stencilWriteMask),o.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),o.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),Ae(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?oe(i.SAMPLE_ALPHA_TO_COVERAGE):we(i.SAMPLE_ALPHA_TO_COVERAGE)}function nt(O){_!==O&&(O?i.frontFace(i.CW):i.frontFace(i.CCW),_=O)}function it(O){O!==uu?(oe(i.CULL_FACE),O!==T&&(O===Bo?i.cullFace(i.BACK):O===du?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):we(i.CULL_FACE),T=O}function ft(O){O!==F&&(K&&i.lineWidth(O),F=O)}function Ae(O,_e,pe){O?(oe(i.POLYGON_OFFSET_FILL),(L!==_e||V!==pe)&&(i.polygonOffset(_e,pe),L=_e,V=pe)):we(i.POLYGON_OFFSET_FILL)}function St(O){O?oe(i.SCISSOR_TEST):we(i.SCISSOR_TEST)}function Ue(O){O===void 0&&(O=i.TEXTURE0+X-1),ne!==O&&(i.activeTexture(O),ne=O)}function $e(O,_e,pe){pe===void 0&&(ne===null?pe=i.TEXTURE0+X-1:pe=ne);let he=ee[pe];he===void 0&&(he={type:void 0,texture:void 0},ee[pe]=he),(he.type!==O||he.texture!==_e)&&(ne!==pe&&(i.activeTexture(pe),ne=pe),i.bindTexture(O,_e||te[O]),he.type=O,he.texture=_e)}function C(){const O=ee[ne];O!==void 0&&O.type!==void 0&&(i.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function b(){try{i.compressedTexImage2D(...arguments)}catch(O){O("WebGLState:",O)}}function W(){try{i.compressedTexImage3D(...arguments)}catch(O){O("WebGLState:",O)}}function re(){try{i.texSubImage2D(...arguments)}catch(O){O("WebGLState:",O)}}function ae(){try{i.texSubImage3D(...arguments)}catch(O){O("WebGLState:",O)}}function Z(){try{i.compressedTexSubImage2D(...arguments)}catch(O){O("WebGLState:",O)}}function Pe(){try{i.compressedTexSubImage3D(...arguments)}catch(O){O("WebGLState:",O)}}function ve(){try{i.texStorage2D(...arguments)}catch(O){O("WebGLState:",O)}}function Fe(){try{i.texStorage3D(...arguments)}catch(O){O("WebGLState:",O)}}function Le(){try{i.texImage2D(...arguments)}catch(O){O("WebGLState:",O)}}function le(){try{i.texImage3D(...arguments)}catch(O){O("WebGLState:",O)}}function J(O){Oe.equals(O)===!1&&(i.scissor(O.x,O.y,O.z,O.w),Oe.copy(O))}function We(O){He.equals(O)===!1&&(i.viewport(O.x,O.y,O.z,O.w),He.copy(O))}function ze(O,_e){let pe=l.get(_e);pe===void 0&&(pe=new WeakMap,l.set(_e,pe));let he=pe.get(O);he===void 0&&(he=i.getUniformBlockIndex(_e,O.name),pe.set(O,he))}function ye(O,_e){const he=l.get(_e).get(O);c.get(_e)!==he&&(i.uniformBlockBinding(_e,he,O.__bindingPointIndex),c.set(_e,he))}function Xe(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},ne=null,ee={},d={},f=new WeakMap,p=[],v=null,M=!1,m=null,h=null,P=null,R=null,w=null,S=null,g=null,A=new ct(0,0,0),I=0,x=!1,_=null,T=null,F=null,L=null,V=null,Oe.set(0,0,i.canvas.width,i.canvas.height),He.set(0,0,i.canvas.width,i.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:oe,disable:we,bindFramebuffer:Ye,drawBuffers:De,useProgram:Je,setBlending:_t,setMaterial:N,setFlipSided:nt,setCullFace:it,setLineWidth:ft,setPolygonOffset:Ae,setScissorTest:St,activeTexture:Ue,bindTexture:$e,unbindTexture:C,compressedTexImage2D:b,compressedTexImage3D:W,texImage2D:Le,texImage3D:le,updateUBOMapping:ze,uniformBlockBinding:ye,texStorage2D:ve,texStorage3D:Fe,texSubImage2D:re,texSubImage3D:ae,compressedTexSubImage2D:Z,compressedTexSubImage3D:Pe,scissor:J,viewport:We,reset:Xe}}function pm(i,e,t,n,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new lt,u=new WeakMap;let d;const f=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(C,b){return p?new OffscreenCanvas(C,b):ms("canvas")}function M(C,b,W){let re=1;const ae=$e(C);if((ae.width>W||ae.height>W)&&(re=W/Math.max(ae.width,ae.height)),re<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const Z=Math.floor(re*ae.width),Pe=Math.floor(re*ae.height);d===void 0&&(d=v(Z,Pe));const ve=b?v(Z,Pe):d;return ve.width=Z,ve.height=Pe,ve.getContext("2d").drawImage(C,0,0,Z,Pe),je("WebGLRenderer: Texture has been resized from ("+ae.width+"x"+ae.height+") to ("+Z+"x"+Pe+")."),ve}else return"data"in C&&je("WebGLRenderer: Image in DataTexture is too big ("+ae.width+"x"+ae.height+")."),C;return C}function m(C){return C.generateMipmaps}function h(C){i.generateMipmap(C)}function P(C){return C.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?i.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function R(C,b,W,re,ae=!1){if(C!==null){if(i[C]!==void 0)return i[C];je("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let Z=b;if(b===i.RED&&(W===i.FLOAT&&(Z=i.R32F),W===i.HALF_FLOAT&&(Z=i.R16F),W===i.UNSIGNED_BYTE&&(Z=i.R8)),b===i.RED_INTEGER&&(W===i.UNSIGNED_BYTE&&(Z=i.R8UI),W===i.UNSIGNED_SHORT&&(Z=i.R16UI),W===i.UNSIGNED_INT&&(Z=i.R32UI),W===i.BYTE&&(Z=i.R8I),W===i.SHORT&&(Z=i.R16I),W===i.INT&&(Z=i.R32I)),b===i.RG&&(W===i.FLOAT&&(Z=i.RG32F),W===i.HALF_FLOAT&&(Z=i.RG16F),W===i.UNSIGNED_BYTE&&(Z=i.RG8)),b===i.RG_INTEGER&&(W===i.UNSIGNED_BYTE&&(Z=i.RG8UI),W===i.UNSIGNED_SHORT&&(Z=i.RG16UI),W===i.UNSIGNED_INT&&(Z=i.RG32UI),W===i.BYTE&&(Z=i.RG8I),W===i.SHORT&&(Z=i.RG16I),W===i.INT&&(Z=i.RG32I)),b===i.RGB_INTEGER&&(W===i.UNSIGNED_BYTE&&(Z=i.RGB8UI),W===i.UNSIGNED_SHORT&&(Z=i.RGB16UI),W===i.UNSIGNED_INT&&(Z=i.RGB32UI),W===i.BYTE&&(Z=i.RGB8I),W===i.SHORT&&(Z=i.RGB16I),W===i.INT&&(Z=i.RGB32I)),b===i.RGBA_INTEGER&&(W===i.UNSIGNED_BYTE&&(Z=i.RGBA8UI),W===i.UNSIGNED_SHORT&&(Z=i.RGBA16UI),W===i.UNSIGNED_INT&&(Z=i.RGBA32UI),W===i.BYTE&&(Z=i.RGBA8I),W===i.SHORT&&(Z=i.RGBA16I),W===i.INT&&(Z=i.RGBA32I)),b===i.RGB&&(W===i.UNSIGNED_INT_5_9_9_9_REV&&(Z=i.RGB9_E5),W===i.UNSIGNED_INT_10F_11F_11F_REV&&(Z=i.R11F_G11F_B10F)),b===i.RGBA){const Pe=ae?fs:dt.getTransfer(re);W===i.FLOAT&&(Z=i.RGBA32F),W===i.HALF_FLOAT&&(Z=i.RGBA16F),W===i.UNSIGNED_BYTE&&(Z=Pe===mt?i.SRGB8_ALPHA8:i.RGBA8),W===i.UNSIGNED_SHORT_4_4_4_4&&(Z=i.RGBA4),W===i.UNSIGNED_SHORT_5_5_5_1&&(Z=i.RGB5_A1)}return(Z===i.R16F||Z===i.R32F||Z===i.RG16F||Z===i.RG32F||Z===i.RGBA16F||Z===i.RGBA32F)&&e.get("EXT_color_buffer_float"),Z}function w(C,b){let W;return C?b===null||b===Si||b===Ar?W=i.DEPTH24_STENCIL8:b===Ln?W=i.DEPTH32F_STENCIL8:b===Tr&&(W=i.DEPTH24_STENCIL8,je("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===Si||b===Ar?W=i.DEPTH_COMPONENT24:b===Ln?W=i.DEPTH_COMPONENT32F:b===Tr&&(W=i.DEPTH_COMPONENT16),W}function S(C,b){return m(C)===!0||C.isFramebufferTexture&&C.minFilter!==un&&C.minFilter!==fn?Math.log2(Math.max(b.width,b.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?b.mipmaps.length:1}function g(C){const b=C.target;b.removeEventListener("dispose",g),I(b),b.isVideoTexture&&u.delete(b)}function A(C){const b=C.target;b.removeEventListener("dispose",A),_(b)}function I(C){const b=n.get(C);if(b.__webglInit===void 0)return;const W=C.source,re=f.get(W);if(re){const ae=re[b.__cacheKey];ae.usedTimes--,ae.usedTimes===0&&x(C),Object.keys(re).length===0&&f.delete(W)}n.remove(C)}function x(C){const b=n.get(C);i.deleteTexture(b.__webglTexture);const W=C.source,re=f.get(W);delete re[b.__cacheKey],a.memory.textures--}function _(C){const b=n.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),n.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let re=0;re<6;re++){if(Array.isArray(b.__webglFramebuffer[re]))for(let ae=0;ae<b.__webglFramebuffer[re].length;ae++)i.deleteFramebuffer(b.__webglFramebuffer[re][ae]);else i.deleteFramebuffer(b.__webglFramebuffer[re]);b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer[re])}else{if(Array.isArray(b.__webglFramebuffer))for(let re=0;re<b.__webglFramebuffer.length;re++)i.deleteFramebuffer(b.__webglFramebuffer[re]);else i.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&i.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let re=0;re<b.__webglColorRenderbuffer.length;re++)b.__webglColorRenderbuffer[re]&&i.deleteRenderbuffer(b.__webglColorRenderbuffer[re]);b.__webglDepthRenderbuffer&&i.deleteRenderbuffer(b.__webglDepthRenderbuffer)}const W=C.textures;for(let re=0,ae=W.length;re<ae;re++){const Z=n.get(W[re]);Z.__webglTexture&&(i.deleteTexture(Z.__webglTexture),a.memory.textures--),n.remove(W[re])}n.remove(C)}let T=0;function F(){T=0}function L(){const C=T;return C>=r.maxTextures&&je("WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+r.maxTextures),T+=1,C}function V(C){const b=[];return b.push(C.wrapS),b.push(C.wrapT),b.push(C.wrapR||0),b.push(C.magFilter),b.push(C.minFilter),b.push(C.anisotropy),b.push(C.internalFormat),b.push(C.format),b.push(C.type),b.push(C.generateMipmaps),b.push(C.premultiplyAlpha),b.push(C.flipY),b.push(C.unpackAlignment),b.push(C.colorSpace),b.join()}function X(C,b){const W=n.get(C);if(C.isVideoTexture&&St(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&W.__version!==C.version){const re=C.image;if(re===null)je("WebGLRenderer: Texture marked for update but no image data found.");else if(re.complete===!1)je("WebGLRenderer: Texture marked for update but image is incomplete");else{te(W,C,b);return}}else C.isExternalTexture&&(W.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,W.__webglTexture,i.TEXTURE0+b)}function K(C,b){const W=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&W.__version!==C.version){te(W,C,b);return}else C.isExternalTexture&&(W.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,W.__webglTexture,i.TEXTURE0+b)}function se(C,b){const W=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&W.__version!==C.version){te(W,C,b);return}t.bindTexture(i.TEXTURE_3D,W.__webglTexture,i.TEXTURE0+b)}function j(C,b){const W=n.get(C);if(C.version>0&&W.__version!==C.version){oe(W,C,b);return}t.bindTexture(i.TEXTURE_CUBE_MAP,W.__webglTexture,i.TEXTURE0+b)}const ne={[hs]:i.REPEAT,[qn]:i.CLAMP_TO_EDGE,[Pa]:i.MIRRORED_REPEAT},ee={[un]:i.NEAREST,[zu]:i.NEAREST_MIPMAP_NEAREST,[Or]:i.NEAREST_MIPMAP_LINEAR,[fn]:i.LINEAR,[Fs]:i.LINEAR_MIPMAP_NEAREST,[Mi]:i.LINEAR_MIPMAP_LINEAR},fe={[Gu]:i.NEVER,[Yu]:i.ALWAYS,[Hu]:i.LESS,[ml]:i.LEQUAL,[Wu]:i.EQUAL,[$u]:i.GEQUAL,[Xu]:i.GREATER,[qu]:i.NOTEQUAL};function Ce(C,b){if(b.type===Ln&&e.has("OES_texture_float_linear")===!1&&(b.magFilter===fn||b.magFilter===Fs||b.magFilter===Or||b.magFilter===Mi||b.minFilter===fn||b.minFilter===Fs||b.minFilter===Or||b.minFilter===Mi)&&je("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(C,i.TEXTURE_WRAP_S,ne[b.wrapS]),i.texParameteri(C,i.TEXTURE_WRAP_T,ne[b.wrapT]),(C===i.TEXTURE_3D||C===i.TEXTURE_2D_ARRAY)&&i.texParameteri(C,i.TEXTURE_WRAP_R,ne[b.wrapR]),i.texParameteri(C,i.TEXTURE_MAG_FILTER,ee[b.magFilter]),i.texParameteri(C,i.TEXTURE_MIN_FILTER,ee[b.minFilter]),b.compareFunction&&(i.texParameteri(C,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(C,i.TEXTURE_COMPARE_FUNC,fe[b.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===un||b.minFilter!==Or&&b.minFilter!==Mi||b.type===Ln&&e.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||n.get(b).__currentAnisotropy){const W=e.get("EXT_texture_filter_anisotropic");i.texParameterf(C,W.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,r.getMaxAnisotropy())),n.get(b).__currentAnisotropy=b.anisotropy}}}function Oe(C,b){let W=!1;C.__webglInit===void 0&&(C.__webglInit=!0,b.addEventListener("dispose",g));const re=b.source;let ae=f.get(re);ae===void 0&&(ae={},f.set(re,ae));const Z=V(b);if(Z!==C.__cacheKey){ae[Z]===void 0&&(ae[Z]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,W=!0),ae[Z].usedTimes++;const Pe=ae[C.__cacheKey];Pe!==void 0&&(ae[C.__cacheKey].usedTimes--,Pe.usedTimes===0&&x(b)),C.__cacheKey=Z,C.__webglTexture=ae[Z].texture}return W}function He(C,b,W){return Math.floor(Math.floor(C/W)/b)}function ut(C,b,W,re){const Z=C.updateRanges;if(Z.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,b.width,b.height,W,re,b.data);else{Z.sort((le,J)=>le.start-J.start);let Pe=0;for(let le=1;le<Z.length;le++){const J=Z[Pe],We=Z[le],ze=J.start+J.count,ye=He(We.start,b.width,4),Xe=He(J.start,b.width,4);We.start<=ze+1&&ye===Xe&&He(We.start+We.count-1,b.width,4)===ye?J.count=Math.max(J.count,We.start+We.count-J.start):(++Pe,Z[Pe]=We)}Z.length=Pe+1;const ve=i.getParameter(i.UNPACK_ROW_LENGTH),Fe=i.getParameter(i.UNPACK_SKIP_PIXELS),Le=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,b.width);for(let le=0,J=Z.length;le<J;le++){const We=Z[le],ze=Math.floor(We.start/4),ye=Math.ceil(We.count/4),Xe=ze%b.width,O=Math.floor(ze/b.width),_e=ye,pe=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,Xe),i.pixelStorei(i.UNPACK_SKIP_ROWS,O),t.texSubImage2D(i.TEXTURE_2D,0,Xe,O,_e,pe,W,re,b.data)}C.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,ve),i.pixelStorei(i.UNPACK_SKIP_PIXELS,Fe),i.pixelStorei(i.UNPACK_SKIP_ROWS,Le)}}function te(C,b,W){let re=i.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(re=i.TEXTURE_2D_ARRAY),b.isData3DTexture&&(re=i.TEXTURE_3D);const ae=Oe(C,b),Z=b.source;t.bindTexture(re,C.__webglTexture,i.TEXTURE0+W);const Pe=n.get(Z);if(Z.version!==Pe.__version||ae===!0){t.activeTexture(i.TEXTURE0+W);const ve=dt.getPrimaries(dt.workingColorSpace),Fe=b.colorSpace===si?null:dt.getPrimaries(b.colorSpace),Le=b.colorSpace===si||ve===Fe?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Le);let le=M(b.image,!1,r.maxTextureSize);le=Ue(b,le);const J=s.convert(b.format,b.colorSpace),We=s.convert(b.type);let ze=R(b.internalFormat,J,We,b.colorSpace,b.isVideoTexture);Ce(re,b);let ye;const Xe=b.mipmaps,O=b.isVideoTexture!==!0,_e=Pe.__version===void 0||ae===!0,pe=Z.dataReady,he=S(b,le);if(b.isDepthTexture)ze=w(b.format===Rr,b.type),_e&&(O?t.texStorage2D(i.TEXTURE_2D,1,ze,le.width,le.height):t.texImage2D(i.TEXTURE_2D,0,ze,le.width,le.height,0,J,We,null));else if(b.isDataTexture)if(Xe.length>0){O&&_e&&t.texStorage2D(i.TEXTURE_2D,he,ze,Xe[0].width,Xe[0].height);for(let ue=0,ie=Xe.length;ue<ie;ue++)ye=Xe[ue],O?pe&&t.texSubImage2D(i.TEXTURE_2D,ue,0,0,ye.width,ye.height,J,We,ye.data):t.texImage2D(i.TEXTURE_2D,ue,ze,ye.width,ye.height,0,J,We,ye.data);b.generateMipmaps=!1}else O?(_e&&t.texStorage2D(i.TEXTURE_2D,he,ze,le.width,le.height),pe&&ut(b,le,J,We)):t.texImage2D(i.TEXTURE_2D,0,ze,le.width,le.height,0,J,We,le.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){O&&_e&&t.texStorage3D(i.TEXTURE_2D_ARRAY,he,ze,Xe[0].width,Xe[0].height,le.depth);for(let ue=0,ie=Xe.length;ue<ie;ue++)if(ye=Xe[ue],b.format!==Mn)if(J!==null)if(O){if(pe)if(b.layerUpdates.size>0){const xe=Mc(ye.width,ye.height,b.format,b.type);for(const ke of b.layerUpdates){const st=ye.data.subarray(ke*xe/ye.data.BYTES_PER_ELEMENT,(ke+1)*xe/ye.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ue,0,0,ke,ye.width,ye.height,1,J,st)}b.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ue,0,0,0,ye.width,ye.height,le.depth,J,ye.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ue,ze,ye.width,ye.height,le.depth,0,ye.data,0,0);else je("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else O?pe&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ue,0,0,0,ye.width,ye.height,le.depth,J,We,ye.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ue,ze,ye.width,ye.height,le.depth,0,J,We,ye.data)}else{O&&_e&&t.texStorage2D(i.TEXTURE_2D,he,ze,Xe[0].width,Xe[0].height);for(let ue=0,ie=Xe.length;ue<ie;ue++)ye=Xe[ue],b.format!==Mn?J!==null?O?pe&&t.compressedTexSubImage2D(i.TEXTURE_2D,ue,0,0,ye.width,ye.height,J,ye.data):t.compressedTexImage2D(i.TEXTURE_2D,ue,ze,ye.width,ye.height,0,ye.data):je("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):O?pe&&t.texSubImage2D(i.TEXTURE_2D,ue,0,0,ye.width,ye.height,J,We,ye.data):t.texImage2D(i.TEXTURE_2D,ue,ze,ye.width,ye.height,0,J,We,ye.data)}else if(b.isDataArrayTexture)if(O){if(_e&&t.texStorage3D(i.TEXTURE_2D_ARRAY,he,ze,le.width,le.height,le.depth),pe)if(b.layerUpdates.size>0){const ue=Mc(le.width,le.height,b.format,b.type);for(const ie of b.layerUpdates){const xe=le.data.subarray(ie*ue/le.data.BYTES_PER_ELEMENT,(ie+1)*ue/le.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ie,le.width,le.height,1,J,We,xe)}b.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,le.width,le.height,le.depth,J,We,le.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,ze,le.width,le.height,le.depth,0,J,We,le.data);else if(b.isData3DTexture)O?(_e&&t.texStorage3D(i.TEXTURE_3D,he,ze,le.width,le.height,le.depth),pe&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,le.width,le.height,le.depth,J,We,le.data)):t.texImage3D(i.TEXTURE_3D,0,ze,le.width,le.height,le.depth,0,J,We,le.data);else if(b.isFramebufferTexture){if(_e)if(O)t.texStorage2D(i.TEXTURE_2D,he,ze,le.width,le.height);else{let ue=le.width,ie=le.height;for(let xe=0;xe<he;xe++)t.texImage2D(i.TEXTURE_2D,xe,ze,ue,ie,0,J,We,null),ue>>=1,ie>>=1}}else if(Xe.length>0){if(O&&_e){const ue=$e(Xe[0]);t.texStorage2D(i.TEXTURE_2D,he,ze,ue.width,ue.height)}for(let ue=0,ie=Xe.length;ue<ie;ue++)ye=Xe[ue],O?pe&&t.texSubImage2D(i.TEXTURE_2D,ue,0,0,J,We,ye):t.texImage2D(i.TEXTURE_2D,ue,ze,J,We,ye);b.generateMipmaps=!1}else if(O){if(_e){const ue=$e(le);t.texStorage2D(i.TEXTURE_2D,he,ze,ue.width,ue.height)}pe&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,J,We,le)}else t.texImage2D(i.TEXTURE_2D,0,ze,J,We,le);m(b)&&h(re),Pe.__version=Z.version,b.onUpdate&&b.onUpdate(b)}C.__version=b.version}function oe(C,b,W){if(b.image.length!==6)return;const re=Oe(C,b),ae=b.source;t.bindTexture(i.TEXTURE_CUBE_MAP,C.__webglTexture,i.TEXTURE0+W);const Z=n.get(ae);if(ae.version!==Z.__version||re===!0){t.activeTexture(i.TEXTURE0+W);const Pe=dt.getPrimaries(dt.workingColorSpace),ve=b.colorSpace===si?null:dt.getPrimaries(b.colorSpace),Fe=b.colorSpace===si||Pe===ve?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Fe);const Le=b.isCompressedTexture||b.image[0].isCompressedTexture,le=b.image[0]&&b.image[0].isDataTexture,J=[];for(let ie=0;ie<6;ie++)!Le&&!le?J[ie]=M(b.image[ie],!0,r.maxCubemapSize):J[ie]=le?b.image[ie].image:b.image[ie],J[ie]=Ue(b,J[ie]);const We=J[0],ze=s.convert(b.format,b.colorSpace),ye=s.convert(b.type),Xe=R(b.internalFormat,ze,ye,b.colorSpace),O=b.isVideoTexture!==!0,_e=Z.__version===void 0||re===!0,pe=ae.dataReady;let he=S(b,We);Ce(i.TEXTURE_CUBE_MAP,b);let ue;if(Le){O&&_e&&t.texStorage2D(i.TEXTURE_CUBE_MAP,he,Xe,We.width,We.height);for(let ie=0;ie<6;ie++){ue=J[ie].mipmaps;for(let xe=0;xe<ue.length;xe++){const ke=ue[xe];b.format!==Mn?ze!==null?O?pe&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,xe,0,0,ke.width,ke.height,ze,ke.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,xe,Xe,ke.width,ke.height,0,ke.data):je("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):O?pe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,xe,0,0,ke.width,ke.height,ze,ye,ke.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,xe,Xe,ke.width,ke.height,0,ze,ye,ke.data)}}}else{if(ue=b.mipmaps,O&&_e){ue.length>0&&he++;const ie=$e(J[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,he,Xe,ie.width,ie.height)}for(let ie=0;ie<6;ie++)if(le){O?pe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,0,0,J[ie].width,J[ie].height,ze,ye,J[ie].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,Xe,J[ie].width,J[ie].height,0,ze,ye,J[ie].data);for(let xe=0;xe<ue.length;xe++){const st=ue[xe].image[ie].image;O?pe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,xe+1,0,0,st.width,st.height,ze,ye,st.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,xe+1,Xe,st.width,st.height,0,ze,ye,st.data)}}else{O?pe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,0,0,ze,ye,J[ie]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,Xe,ze,ye,J[ie]);for(let xe=0;xe<ue.length;xe++){const ke=ue[xe];O?pe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,xe+1,0,0,ze,ye,ke.image[ie]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,xe+1,Xe,ze,ye,ke.image[ie])}}}m(b)&&h(i.TEXTURE_CUBE_MAP),Z.__version=ae.version,b.onUpdate&&b.onUpdate(b)}C.__version=b.version}function we(C,b,W,re,ae,Z){const Pe=s.convert(W.format,W.colorSpace),ve=s.convert(W.type),Fe=R(W.internalFormat,Pe,ve,W.colorSpace),Le=n.get(b),le=n.get(W);if(le.__renderTarget=b,!Le.__hasExternalTextures){const J=Math.max(1,b.width>>Z),We=Math.max(1,b.height>>Z);ae===i.TEXTURE_3D||ae===i.TEXTURE_2D_ARRAY?t.texImage3D(ae,Z,Fe,J,We,b.depth,0,Pe,ve,null):t.texImage2D(ae,Z,Fe,J,We,0,Pe,ve,null)}t.bindFramebuffer(i.FRAMEBUFFER,C),Ae(b)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,re,ae,le.__webglTexture,0,ft(b)):(ae===i.TEXTURE_2D||ae>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ae<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,re,ae,le.__webglTexture,Z),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ye(C,b,W){if(i.bindRenderbuffer(i.RENDERBUFFER,C),b.depthBuffer){const re=b.depthTexture,ae=re&&re.isDepthTexture?re.type:null,Z=w(b.stencilBuffer,ae),Pe=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ve=ft(b);Ae(b)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ve,Z,b.width,b.height):W?i.renderbufferStorageMultisample(i.RENDERBUFFER,ve,Z,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,Z,b.width,b.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Pe,i.RENDERBUFFER,C)}else{const re=b.textures;for(let ae=0;ae<re.length;ae++){const Z=re[ae],Pe=s.convert(Z.format,Z.colorSpace),ve=s.convert(Z.type),Fe=R(Z.internalFormat,Pe,ve,Z.colorSpace),Le=ft(b);W&&Ae(b)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Le,Fe,b.width,b.height):Ae(b)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Le,Fe,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,Fe,b.width,b.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function De(C,b){if(b&&b.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,C),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const re=n.get(b.depthTexture);re.__renderTarget=b,(!re.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),X(b.depthTexture,0);const ae=re.__webglTexture,Z=ft(b);if(b.depthTexture.format===wr)Ae(b)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ae,0,Z):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ae,0);else if(b.depthTexture.format===Rr)Ae(b)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ae,0,Z):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ae,0);else throw new Error("Unknown depthTexture format")}function Je(C){const b=n.get(C),W=C.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==C.depthTexture){const re=C.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),re){const ae=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,re.removeEventListener("dispose",ae)};re.addEventListener("dispose",ae),b.__depthDisposeCallback=ae}b.__boundDepthTexture=re}if(C.depthTexture&&!b.__autoAllocateDepthBuffer){if(W)throw new Error("target.depthTexture not supported in Cube render targets");const re=C.texture.mipmaps;re&&re.length>0?De(b.__webglFramebuffer[0],C):De(b.__webglFramebuffer,C)}else if(W){b.__webglDepthbuffer=[];for(let re=0;re<6;re++)if(t.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer[re]),b.__webglDepthbuffer[re]===void 0)b.__webglDepthbuffer[re]=i.createRenderbuffer(),Ye(b.__webglDepthbuffer[re],C,!1);else{const ae=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Z=b.__webglDepthbuffer[re];i.bindRenderbuffer(i.RENDERBUFFER,Z),i.framebufferRenderbuffer(i.FRAMEBUFFER,ae,i.RENDERBUFFER,Z)}}else{const re=C.texture.mipmaps;if(re&&re.length>0?t.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=i.createRenderbuffer(),Ye(b.__webglDepthbuffer,C,!1);else{const ae=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Z=b.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,Z),i.framebufferRenderbuffer(i.FRAMEBUFFER,ae,i.RENDERBUFFER,Z)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ct(C,b,W){const re=n.get(C);b!==void 0&&we(re.__webglFramebuffer,C,C.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),W!==void 0&&Je(C)}function Qe(C){const b=C.texture,W=n.get(C),re=n.get(b);C.addEventListener("dispose",A);const ae=C.textures,Z=C.isWebGLCubeRenderTarget===!0,Pe=ae.length>1;if(Pe||(re.__webglTexture===void 0&&(re.__webglTexture=i.createTexture()),re.__version=b.version,a.memory.textures++),Z){W.__webglFramebuffer=[];for(let ve=0;ve<6;ve++)if(b.mipmaps&&b.mipmaps.length>0){W.__webglFramebuffer[ve]=[];for(let Fe=0;Fe<b.mipmaps.length;Fe++)W.__webglFramebuffer[ve][Fe]=i.createFramebuffer()}else W.__webglFramebuffer[ve]=i.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){W.__webglFramebuffer=[];for(let ve=0;ve<b.mipmaps.length;ve++)W.__webglFramebuffer[ve]=i.createFramebuffer()}else W.__webglFramebuffer=i.createFramebuffer();if(Pe)for(let ve=0,Fe=ae.length;ve<Fe;ve++){const Le=n.get(ae[ve]);Le.__webglTexture===void 0&&(Le.__webglTexture=i.createTexture(),a.memory.textures++)}if(C.samples>0&&Ae(C)===!1){W.__webglMultisampledFramebuffer=i.createFramebuffer(),W.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,W.__webglMultisampledFramebuffer);for(let ve=0;ve<ae.length;ve++){const Fe=ae[ve];W.__webglColorRenderbuffer[ve]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,W.__webglColorRenderbuffer[ve]);const Le=s.convert(Fe.format,Fe.colorSpace),le=s.convert(Fe.type),J=R(Fe.internalFormat,Le,le,Fe.colorSpace,C.isXRRenderTarget===!0),We=ft(C);i.renderbufferStorageMultisample(i.RENDERBUFFER,We,J,C.width,C.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ve,i.RENDERBUFFER,W.__webglColorRenderbuffer[ve])}i.bindRenderbuffer(i.RENDERBUFFER,null),C.depthBuffer&&(W.__webglDepthRenderbuffer=i.createRenderbuffer(),Ye(W.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(Z){t.bindTexture(i.TEXTURE_CUBE_MAP,re.__webglTexture),Ce(i.TEXTURE_CUBE_MAP,b);for(let ve=0;ve<6;ve++)if(b.mipmaps&&b.mipmaps.length>0)for(let Fe=0;Fe<b.mipmaps.length;Fe++)we(W.__webglFramebuffer[ve][Fe],C,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,Fe);else we(W.__webglFramebuffer[ve],C,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0);m(b)&&h(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Pe){for(let ve=0,Fe=ae.length;ve<Fe;ve++){const Le=ae[ve],le=n.get(Le);let J=i.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(J=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(J,le.__webglTexture),Ce(J,Le),we(W.__webglFramebuffer,C,Le,i.COLOR_ATTACHMENT0+ve,J,0),m(Le)&&h(J)}t.unbindTexture()}else{let ve=i.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(ve=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ve,re.__webglTexture),Ce(ve,b),b.mipmaps&&b.mipmaps.length>0)for(let Fe=0;Fe<b.mipmaps.length;Fe++)we(W.__webglFramebuffer[Fe],C,b,i.COLOR_ATTACHMENT0,ve,Fe);else we(W.__webglFramebuffer,C,b,i.COLOR_ATTACHMENT0,ve,0);m(b)&&h(ve),t.unbindTexture()}C.depthBuffer&&Je(C)}function _t(C){const b=C.textures;for(let W=0,re=b.length;W<re;W++){const ae=b[W];if(m(ae)){const Z=P(C),Pe=n.get(ae).__webglTexture;t.bindTexture(Z,Pe),h(Z),t.unbindTexture()}}}const N=[],nt=[];function it(C){if(C.samples>0){if(Ae(C)===!1){const b=C.textures,W=C.width,re=C.height;let ae=i.COLOR_BUFFER_BIT;const Z=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Pe=n.get(C),ve=b.length>1;if(ve)for(let Le=0;Le<b.length;Le++)t.bindFramebuffer(i.FRAMEBUFFER,Pe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Le,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Pe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Le,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Pe.__webglMultisampledFramebuffer);const Fe=C.texture.mipmaps;Fe&&Fe.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Pe.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Pe.__webglFramebuffer);for(let Le=0;Le<b.length;Le++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(ae|=i.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(ae|=i.STENCIL_BUFFER_BIT)),ve){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Pe.__webglColorRenderbuffer[Le]);const le=n.get(b[Le]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,le,0)}i.blitFramebuffer(0,0,W,re,0,0,W,re,ae,i.NEAREST),c===!0&&(N.length=0,nt.length=0,N.push(i.COLOR_ATTACHMENT0+Le),C.depthBuffer&&C.resolveDepthBuffer===!1&&(N.push(Z),nt.push(Z),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,nt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,N))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ve)for(let Le=0;Le<b.length;Le++){t.bindFramebuffer(i.FRAMEBUFFER,Pe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Le,i.RENDERBUFFER,Pe.__webglColorRenderbuffer[Le]);const le=n.get(b[Le]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Pe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Le,i.TEXTURE_2D,le,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Pe.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&c){const b=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[b])}}}function ft(C){return Math.min(r.maxSamples,C.samples)}function Ae(C){const b=n.get(C);return C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function St(C){const b=a.render.frame;u.get(C)!==b&&(u.set(C,b),C.update())}function Ue(C,b){const W=C.colorSpace,re=C.format,ae=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||W!==ir&&W!==si&&(dt.getTransfer(W)===mt?(re!==Mn||ae!==Un)&&je("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):wt("WebGLTextures: Unsupported texture color space:",W)),b}function $e(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(l.width=C.naturalWidth||C.width,l.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(l.width=C.displayWidth,l.height=C.displayHeight):(l.width=C.width,l.height=C.height),l}this.allocateTextureUnit=L,this.resetTextureUnits=F,this.setTexture2D=X,this.setTexture2DArray=K,this.setTexture3D=se,this.setTextureCube=j,this.rebindTextures=Ct,this.setupRenderTarget=Qe,this.updateRenderTargetMipmap=_t,this.updateMultisampleRenderTarget=it,this.setupDepthRenderbuffer=Je,this.setupFrameBufferTexture=we,this.useMultisampledRTT=Ae}function mm(i,e){function t(n,r=si){let s;const a=dt.getTransfer(r);if(n===Un)return i.UNSIGNED_BYTE;if(n===xo)return i.UNSIGNED_SHORT_4_4_4_4;if(n===go)return i.UNSIGNED_SHORT_5_5_5_1;if(n===ul)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===dl)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===cl)return i.BYTE;if(n===ll)return i.SHORT;if(n===Tr)return i.UNSIGNED_SHORT;if(n===mo)return i.INT;if(n===Si)return i.UNSIGNED_INT;if(n===Ln)return i.FLOAT;if(n===ar)return i.HALF_FLOAT;if(n===hl)return i.ALPHA;if(n===fl)return i.RGB;if(n===Mn)return i.RGBA;if(n===wr)return i.DEPTH_COMPONENT;if(n===Rr)return i.DEPTH_STENCIL;if(n===_o)return i.RED;if(n===vo)return i.RED_INTEGER;if(n===bo)return i.RG;if(n===Mo)return i.RG_INTEGER;if(n===yo)return i.RGBA_INTEGER;if(n===as||n===os||n===cs||n===ls)if(a===mt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===as)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===os)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===cs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ls)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===as)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===os)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===cs)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ls)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===La||n===Da||n===Ia||n===Ua)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===La)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Da)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Ia)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ua)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Fa||n===Na||n===Oa)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Fa||n===Na)return a===mt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Oa)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===za||n===Ba||n===ka||n===Va||n===Ga||n===Ha||n===Wa||n===Xa||n===qa||n===$a||n===Ya||n===ja||n===Ka||n===Za)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===za)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ba)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===ka)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Va)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Ga)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ha)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Wa)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Xa)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===qa)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===$a)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ya)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===ja)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Ka)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Za)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ja||n===Qa||n===eo)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===Ja)return a===mt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Qa)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===eo)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===to||n===no||n===io||n===ro)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===to)return s.COMPRESSED_RED_RGTC1_EXT;if(n===no)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===io)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===ro)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ar?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const xm=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,gm=`
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

}`;class _m{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new wl(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Kn({vertexShader:xm,fragmentShader:gm,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new rn(new sr(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class vm extends or{constructor(e,t){super();const n=this;let r=null,s=1,a=null,o="local-floor",c=1,l=null,u=null,d=null,f=null,p=null,v=null;const M=typeof XRWebGLBinding<"u",m=new _m,h={},P=t.getContextAttributes();let R=null,w=null;const S=[],g=[],A=new lt;let I=null;const x=new nn;x.viewport=new xt;const _=new nn;_.viewport=new xt;const T=[x,_],F=new Nd;let L=null,V=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(te){let oe=S[te];return oe===void 0&&(oe=new ra,S[te]=oe),oe.getTargetRaySpace()},this.getControllerGrip=function(te){let oe=S[te];return oe===void 0&&(oe=new ra,S[te]=oe),oe.getGripSpace()},this.getHand=function(te){let oe=S[te];return oe===void 0&&(oe=new ra,S[te]=oe),oe.getHandSpace()};function X(te){const oe=g.indexOf(te.inputSource);if(oe===-1)return;const we=S[oe];we!==void 0&&(we.update(te.inputSource,te.frame,l||a),we.dispatchEvent({type:te.type,data:te.inputSource}))}function K(){r.removeEventListener("select",X),r.removeEventListener("selectstart",X),r.removeEventListener("selectend",X),r.removeEventListener("squeeze",X),r.removeEventListener("squeezestart",X),r.removeEventListener("squeezeend",X),r.removeEventListener("end",K),r.removeEventListener("inputsourceschange",se);for(let te=0;te<S.length;te++){const oe=g[te];oe!==null&&(g[te]=null,S[te].disconnect(oe))}L=null,V=null,m.reset();for(const te in h)delete h[te];e.setRenderTarget(R),p=null,f=null,d=null,r=null,w=null,ut.stop(),n.isPresenting=!1,e.setPixelRatio(I),e.setSize(A.width,A.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(te){s=te,n.isPresenting===!0&&je("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(te){o=te,n.isPresenting===!0&&je("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(te){l=te},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return d===null&&M&&(d=new XRWebGLBinding(r,t)),d},this.getFrame=function(){return v},this.getSession=function(){return r},this.setSession=async function(te){if(r=te,r!==null){if(R=e.getRenderTarget(),r.addEventListener("select",X),r.addEventListener("selectstart",X),r.addEventListener("selectend",X),r.addEventListener("squeeze",X),r.addEventListener("squeezestart",X),r.addEventListener("squeezeend",X),r.addEventListener("end",K),r.addEventListener("inputsourceschange",se),P.xrCompatible!==!0&&await t.makeXRCompatible(),I=e.getPixelRatio(),e.getSize(A),M&&"createProjectionLayer"in XRWebGLBinding.prototype){let we=null,Ye=null,De=null;P.depth&&(De=P.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,we=P.stencil?Rr:wr,Ye=P.stencil?Ar:Si);const Je={colorFormat:t.RGBA8,depthFormat:De,scaleFactor:s};d=this.getBinding(),f=d.createProjectionLayer(Je),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),w=new Ei(f.textureWidth,f.textureHeight,{format:Mn,type:Un,depthTexture:new Al(f.textureWidth,f.textureHeight,Ye,void 0,void 0,void 0,void 0,void 0,void 0,we),stencilBuffer:P.stencil,colorSpace:e.outputColorSpace,samples:P.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const we={antialias:P.antialias,alpha:!0,depth:P.depth,stencil:P.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,t,we),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),w=new Ei(p.framebufferWidth,p.framebufferHeight,{format:Mn,type:Un,colorSpace:e.outputColorSpace,stencilBuffer:P.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}w.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await r.requestReferenceSpace(o),ut.setContext(r),ut.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function se(te){for(let oe=0;oe<te.removed.length;oe++){const we=te.removed[oe],Ye=g.indexOf(we);Ye>=0&&(g[Ye]=null,S[Ye].disconnect(we))}for(let oe=0;oe<te.added.length;oe++){const we=te.added[oe];let Ye=g.indexOf(we);if(Ye===-1){for(let Je=0;Je<S.length;Je++)if(Je>=g.length){g.push(we),Ye=Je;break}else if(g[Je]===null){g[Je]=we,Ye=Je;break}if(Ye===-1)break}const De=S[Ye];De&&De.connect(we)}}const j=new G,ne=new G;function ee(te,oe,we){j.setFromMatrixPosition(oe.matrixWorld),ne.setFromMatrixPosition(we.matrixWorld);const Ye=j.distanceTo(ne),De=oe.projectionMatrix.elements,Je=we.projectionMatrix.elements,Ct=De[14]/(De[10]-1),Qe=De[14]/(De[10]+1),_t=(De[9]+1)/De[5],N=(De[9]-1)/De[5],nt=(De[8]-1)/De[0],it=(Je[8]+1)/Je[0],ft=Ct*nt,Ae=Ct*it,St=Ye/(-nt+it),Ue=St*-nt;if(oe.matrixWorld.decompose(te.position,te.quaternion,te.scale),te.translateX(Ue),te.translateZ(St),te.matrixWorld.compose(te.position,te.quaternion,te.scale),te.matrixWorldInverse.copy(te.matrixWorld).invert(),De[10]===-1)te.projectionMatrix.copy(oe.projectionMatrix),te.projectionMatrixInverse.copy(oe.projectionMatrixInverse);else{const $e=Ct+St,C=Qe+St,b=ft-Ue,W=Ae+(Ye-Ue),re=_t*Qe/C*$e,ae=N*Qe/C*$e;te.projectionMatrix.makePerspective(b,W,re,ae,$e,C),te.projectionMatrixInverse.copy(te.projectionMatrix).invert()}}function fe(te,oe){oe===null?te.matrixWorld.copy(te.matrix):te.matrixWorld.multiplyMatrices(oe.matrixWorld,te.matrix),te.matrixWorldInverse.copy(te.matrixWorld).invert()}this.updateCamera=function(te){if(r===null)return;let oe=te.near,we=te.far;m.texture!==null&&(m.depthNear>0&&(oe=m.depthNear),m.depthFar>0&&(we=m.depthFar)),F.near=_.near=x.near=oe,F.far=_.far=x.far=we,(L!==F.near||V!==F.far)&&(r.updateRenderState({depthNear:F.near,depthFar:F.far}),L=F.near,V=F.far),F.layers.mask=te.layers.mask|6,x.layers.mask=F.layers.mask&3,_.layers.mask=F.layers.mask&5;const Ye=te.parent,De=F.cameras;fe(F,Ye);for(let Je=0;Je<De.length;Je++)fe(De[Je],Ye);De.length===2?ee(F,x,_):F.projectionMatrix.copy(x.projectionMatrix),Ce(te,F,Ye)};function Ce(te,oe,we){we===null?te.matrix.copy(oe.matrixWorld):(te.matrix.copy(we.matrixWorld),te.matrix.invert(),te.matrix.multiply(oe.matrixWorld)),te.matrix.decompose(te.position,te.quaternion,te.scale),te.updateMatrixWorld(!0),te.projectionMatrix.copy(oe.projectionMatrix),te.projectionMatrixInverse.copy(oe.projectionMatrixInverse),te.isPerspectiveCamera&&(te.fov=xs*2*Math.atan(1/te.projectionMatrix.elements[5]),te.zoom=1)}this.getCamera=function(){return F},this.getFoveation=function(){if(!(f===null&&p===null))return c},this.setFoveation=function(te){c=te,f!==null&&(f.fixedFoveation=te),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=te)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(F)},this.getCameraTexture=function(te){return h[te]};let Oe=null;function He(te,oe){if(u=oe.getViewerPose(l||a),v=oe,u!==null){const we=u.views;p!==null&&(e.setRenderTargetFramebuffer(w,p.framebuffer),e.setRenderTarget(w));let Ye=!1;we.length!==F.cameras.length&&(F.cameras.length=0,Ye=!0);for(let Qe=0;Qe<we.length;Qe++){const _t=we[Qe];let N=null;if(p!==null)N=p.getViewport(_t);else{const it=d.getViewSubImage(f,_t);N=it.viewport,Qe===0&&(e.setRenderTargetTextures(w,it.colorTexture,it.depthStencilTexture),e.setRenderTarget(w))}let nt=T[Qe];nt===void 0&&(nt=new nn,nt.layers.enable(Qe),nt.viewport=new xt,T[Qe]=nt),nt.matrix.fromArray(_t.transform.matrix),nt.matrix.decompose(nt.position,nt.quaternion,nt.scale),nt.projectionMatrix.fromArray(_t.projectionMatrix),nt.projectionMatrixInverse.copy(nt.projectionMatrix).invert(),nt.viewport.set(N.x,N.y,N.width,N.height),Qe===0&&(F.matrix.copy(nt.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale)),Ye===!0&&F.cameras.push(nt)}const De=r.enabledFeatures;if(De&&De.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&M){d=n.getBinding();const Qe=d.getDepthInformation(we[0]);Qe&&Qe.isValid&&Qe.texture&&m.init(Qe,r.renderState)}if(De&&De.includes("camera-access")&&M){e.state.unbindTexture(),d=n.getBinding();for(let Qe=0;Qe<we.length;Qe++){const _t=we[Qe].camera;if(_t){let N=h[_t];N||(N=new wl,h[_t]=N);const nt=d.getCameraImage(_t);N.sourceTexture=nt}}}}for(let we=0;we<S.length;we++){const Ye=g[we],De=S[we];Ye!==null&&De!==void 0&&De.update(Ye,oe,l||a)}Oe&&Oe(te,oe),oe.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:oe}),v=null}const ut=new Cl;ut.setAnimationLoop(He),this.setAnimationLoop=function(te){Oe=te},this.dispose=function(){}}}const _i=new Sn,bm=new gt;function Mm(i,e){function t(m,h){m.matrixAutoUpdate===!0&&m.updateMatrix(),h.value.copy(m.matrix)}function n(m,h){h.color.getRGB(m.fogColor.value,Ml(i)),h.isFog?(m.fogNear.value=h.near,m.fogFar.value=h.far):h.isFogExp2&&(m.fogDensity.value=h.density)}function r(m,h,P,R,w){h.isMeshBasicMaterial||h.isMeshLambertMaterial?s(m,h):h.isMeshToonMaterial?(s(m,h),d(m,h)):h.isMeshPhongMaterial?(s(m,h),u(m,h)):h.isMeshStandardMaterial?(s(m,h),f(m,h),h.isMeshPhysicalMaterial&&p(m,h,w)):h.isMeshMatcapMaterial?(s(m,h),v(m,h)):h.isMeshDepthMaterial?s(m,h):h.isMeshDistanceMaterial?(s(m,h),M(m,h)):h.isMeshNormalMaterial?s(m,h):h.isLineBasicMaterial?(a(m,h),h.isLineDashedMaterial&&o(m,h)):h.isPointsMaterial?c(m,h,P,R):h.isSpriteMaterial?l(m,h):h.isShadowMaterial?(m.color.value.copy(h.color),m.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function s(m,h){m.opacity.value=h.opacity,h.color&&m.diffuse.value.copy(h.color),h.emissive&&m.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(m.map.value=h.map,t(h.map,m.mapTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,t(h.alphaMap,m.alphaMapTransform)),h.bumpMap&&(m.bumpMap.value=h.bumpMap,t(h.bumpMap,m.bumpMapTransform),m.bumpScale.value=h.bumpScale,h.side===sn&&(m.bumpScale.value*=-1)),h.normalMap&&(m.normalMap.value=h.normalMap,t(h.normalMap,m.normalMapTransform),m.normalScale.value.copy(h.normalScale),h.side===sn&&m.normalScale.value.negate()),h.displacementMap&&(m.displacementMap.value=h.displacementMap,t(h.displacementMap,m.displacementMapTransform),m.displacementScale.value=h.displacementScale,m.displacementBias.value=h.displacementBias),h.emissiveMap&&(m.emissiveMap.value=h.emissiveMap,t(h.emissiveMap,m.emissiveMapTransform)),h.specularMap&&(m.specularMap.value=h.specularMap,t(h.specularMap,m.specularMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest);const P=e.get(h),R=P.envMap,w=P.envMapRotation;R&&(m.envMap.value=R,_i.copy(w),_i.x*=-1,_i.y*=-1,_i.z*=-1,R.isCubeTexture&&R.isRenderTargetTexture===!1&&(_i.y*=-1,_i.z*=-1),m.envMapRotation.value.setFromMatrix4(bm.makeRotationFromEuler(_i)),m.flipEnvMap.value=R.isCubeTexture&&R.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=h.reflectivity,m.ior.value=h.ior,m.refractionRatio.value=h.refractionRatio),h.lightMap&&(m.lightMap.value=h.lightMap,m.lightMapIntensity.value=h.lightMapIntensity,t(h.lightMap,m.lightMapTransform)),h.aoMap&&(m.aoMap.value=h.aoMap,m.aoMapIntensity.value=h.aoMapIntensity,t(h.aoMap,m.aoMapTransform))}function a(m,h){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,h.map&&(m.map.value=h.map,t(h.map,m.mapTransform))}function o(m,h){m.dashSize.value=h.dashSize,m.totalSize.value=h.dashSize+h.gapSize,m.scale.value=h.scale}function c(m,h,P,R){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,m.size.value=h.size*P,m.scale.value=R*.5,h.map&&(m.map.value=h.map,t(h.map,m.uvTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,t(h.alphaMap,m.alphaMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest)}function l(m,h){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,m.rotation.value=h.rotation,h.map&&(m.map.value=h.map,t(h.map,m.mapTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,t(h.alphaMap,m.alphaMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest)}function u(m,h){m.specular.value.copy(h.specular),m.shininess.value=Math.max(h.shininess,1e-4)}function d(m,h){h.gradientMap&&(m.gradientMap.value=h.gradientMap)}function f(m,h){m.metalness.value=h.metalness,h.metalnessMap&&(m.metalnessMap.value=h.metalnessMap,t(h.metalnessMap,m.metalnessMapTransform)),m.roughness.value=h.roughness,h.roughnessMap&&(m.roughnessMap.value=h.roughnessMap,t(h.roughnessMap,m.roughnessMapTransform)),h.envMap&&(m.envMapIntensity.value=h.envMapIntensity)}function p(m,h,P){m.ior.value=h.ior,h.sheen>0&&(m.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),m.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(m.sheenColorMap.value=h.sheenColorMap,t(h.sheenColorMap,m.sheenColorMapTransform)),h.sheenRoughnessMap&&(m.sheenRoughnessMap.value=h.sheenRoughnessMap,t(h.sheenRoughnessMap,m.sheenRoughnessMapTransform))),h.clearcoat>0&&(m.clearcoat.value=h.clearcoat,m.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(m.clearcoatMap.value=h.clearcoatMap,t(h.clearcoatMap,m.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,t(h.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(m.clearcoatNormalMap.value=h.clearcoatNormalMap,t(h.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===sn&&m.clearcoatNormalScale.value.negate())),h.dispersion>0&&(m.dispersion.value=h.dispersion),h.iridescence>0&&(m.iridescence.value=h.iridescence,m.iridescenceIOR.value=h.iridescenceIOR,m.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(m.iridescenceMap.value=h.iridescenceMap,t(h.iridescenceMap,m.iridescenceMapTransform)),h.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=h.iridescenceThicknessMap,t(h.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),h.transmission>0&&(m.transmission.value=h.transmission,m.transmissionSamplerMap.value=P.texture,m.transmissionSamplerSize.value.set(P.width,P.height),h.transmissionMap&&(m.transmissionMap.value=h.transmissionMap,t(h.transmissionMap,m.transmissionMapTransform)),m.thickness.value=h.thickness,h.thicknessMap&&(m.thicknessMap.value=h.thicknessMap,t(h.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=h.attenuationDistance,m.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(m.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(m.anisotropyMap.value=h.anisotropyMap,t(h.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=h.specularIntensity,m.specularColor.value.copy(h.specularColor),h.specularColorMap&&(m.specularColorMap.value=h.specularColorMap,t(h.specularColorMap,m.specularColorMapTransform)),h.specularIntensityMap&&(m.specularIntensityMap.value=h.specularIntensityMap,t(h.specularIntensityMap,m.specularIntensityMapTransform))}function v(m,h){h.matcap&&(m.matcap.value=h.matcap)}function M(m,h){const P=e.get(h).light;m.referencePosition.value.setFromMatrixPosition(P.matrixWorld),m.nearDistance.value=P.shadow.camera.near,m.farDistance.value=P.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function ym(i,e,t,n){let r={},s={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(P,R){const w=R.program;n.uniformBlockBinding(P,w)}function l(P,R){let w=r[P.id];w===void 0&&(v(P),w=u(P),r[P.id]=w,P.addEventListener("dispose",m));const S=R.program;n.updateUBOMapping(P,S);const g=e.render.frame;s[P.id]!==g&&(f(P),s[P.id]=g)}function u(P){const R=d();P.__bindingPointIndex=R;const w=i.createBuffer(),S=P.__size,g=P.usage;return i.bindBuffer(i.UNIFORM_BUFFER,w),i.bufferData(i.UNIFORM_BUFFER,S,g),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,R,w),w}function d(){for(let P=0;P<o;P++)if(a.indexOf(P)===-1)return a.push(P),P;return wt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(P){const R=r[P.id],w=P.uniforms,S=P.__cache;i.bindBuffer(i.UNIFORM_BUFFER,R);for(let g=0,A=w.length;g<A;g++){const I=Array.isArray(w[g])?w[g]:[w[g]];for(let x=0,_=I.length;x<_;x++){const T=I[x];if(p(T,g,x,S)===!0){const F=T.__offset,L=Array.isArray(T.value)?T.value:[T.value];let V=0;for(let X=0;X<L.length;X++){const K=L[X],se=M(K);typeof K=="number"||typeof K=="boolean"?(T.__data[0]=K,i.bufferSubData(i.UNIFORM_BUFFER,F+V,T.__data)):K.isMatrix3?(T.__data[0]=K.elements[0],T.__data[1]=K.elements[1],T.__data[2]=K.elements[2],T.__data[3]=0,T.__data[4]=K.elements[3],T.__data[5]=K.elements[4],T.__data[6]=K.elements[5],T.__data[7]=0,T.__data[8]=K.elements[6],T.__data[9]=K.elements[7],T.__data[10]=K.elements[8],T.__data[11]=0):(K.toArray(T.__data,V),V+=se.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,F,T.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(P,R,w,S){const g=P.value,A=R+"_"+w;if(S[A]===void 0)return typeof g=="number"||typeof g=="boolean"?S[A]=g:S[A]=g.clone(),!0;{const I=S[A];if(typeof g=="number"||typeof g=="boolean"){if(I!==g)return S[A]=g,!0}else if(I.equals(g)===!1)return I.copy(g),!0}return!1}function v(P){const R=P.uniforms;let w=0;const S=16;for(let A=0,I=R.length;A<I;A++){const x=Array.isArray(R[A])?R[A]:[R[A]];for(let _=0,T=x.length;_<T;_++){const F=x[_],L=Array.isArray(F.value)?F.value:[F.value];for(let V=0,X=L.length;V<X;V++){const K=L[V],se=M(K),j=w%S,ne=j%se.boundary,ee=j+ne;w+=ne,ee!==0&&S-ee<se.storage&&(w+=S-ee),F.__data=new Float32Array(se.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=w,w+=se.storage}}}const g=w%S;return g>0&&(w+=S-g),P.__size=w,P.__cache={},this}function M(P){const R={boundary:0,storage:0};return typeof P=="number"||typeof P=="boolean"?(R.boundary=4,R.storage=4):P.isVector2?(R.boundary=8,R.storage=8):P.isVector3||P.isColor?(R.boundary=16,R.storage=12):P.isVector4?(R.boundary=16,R.storage=16):P.isMatrix3?(R.boundary=48,R.storage=48):P.isMatrix4?(R.boundary=64,R.storage=64):P.isTexture?je("WebGLRenderer: Texture samplers can not be part of an uniforms group."):je("WebGLRenderer: Unsupported uniform value type.",P),R}function m(P){const R=P.target;R.removeEventListener("dispose",m);const w=a.indexOf(R.__bindingPointIndex);a.splice(w,1),i.deleteBuffer(r[R.id]),delete r[R.id],delete s[R.id]}function h(){for(const P in r)i.deleteBuffer(r[P]);a=[],r={},s={}}return{bind:c,update:l,dispose:h}}const Sm=new Uint16Array([11481,15204,11534,15171,11808,15015,12385,14843,12894,14716,13396,14600,13693,14483,13976,14366,14237,14171,14405,13961,14511,13770,14605,13598,14687,13444,14760,13305,14822,13066,14876,12857,14923,12675,14963,12517,14997,12379,15025,12230,15049,12023,15070,11843,15086,11687,15100,11551,15111,11433,15120,11330,15127,11217,15132,11060,15135,10922,15138,10801,15139,10695,15139,10600,13012,14923,13020,14917,13064,14886,13176,14800,13349,14666,13513,14526,13724,14398,13960,14230,14200,14020,14383,13827,14488,13651,14583,13491,14667,13348,14740,13132,14803,12908,14856,12713,14901,12542,14938,12394,14968,12241,14992,12017,15010,11822,15024,11654,15034,11507,15041,11380,15044,11269,15044,11081,15042,10913,15037,10764,15031,10635,15023,10520,15014,10419,15003,10330,13657,14676,13658,14673,13670,14660,13698,14622,13750,14547,13834,14442,13956,14317,14112,14093,14291,13889,14407,13704,14499,13538,14586,13389,14664,13201,14733,12966,14792,12758,14842,12577,14882,12418,14915,12272,14940,12033,14959,11826,14972,11646,14980,11490,14983,11355,14983,11212,14979,11008,14971,10830,14961,10675,14950,10540,14936,10420,14923,10315,14909,10204,14894,10041,14089,14460,14090,14459,14096,14452,14112,14431,14141,14388,14186,14305,14252,14130,14341,13941,14399,13756,14467,13585,14539,13430,14610,13272,14677,13026,14737,12808,14790,12617,14833,12449,14869,12303,14896,12065,14916,11845,14929,11655,14937,11490,14939,11347,14936,11184,14930,10970,14921,10783,14912,10621,14900,10480,14885,10356,14867,10247,14848,10062,14827,9894,14805,9745,14400,14208,14400,14206,14402,14198,14406,14174,14415,14122,14427,14035,14444,13913,14469,13767,14504,13613,14548,13463,14598,13324,14651,13082,14704,12858,14752,12658,14795,12483,14831,12330,14860,12106,14881,11875,14895,11675,14903,11501,14905,11351,14903,11178,14900,10953,14892,10757,14880,10589,14865,10442,14847,10313,14827,10162,14805,9965,14782,9792,14757,9642,14731,9507,14562,13883,14562,13883,14563,13877,14566,13862,14570,13830,14576,13773,14584,13689,14595,13582,14613,13461,14637,13336,14668,13120,14704,12897,14741,12695,14776,12516,14808,12358,14835,12150,14856,11910,14870,11701,14878,11519,14882,11361,14884,11187,14880,10951,14871,10748,14858,10572,14842,10418,14823,10286,14801,10099,14777,9897,14751,9722,14725,9567,14696,9430,14666,9309,14702,13604,14702,13604,14702,13600,14703,13591,14705,13570,14707,13533,14709,13477,14712,13400,14718,13305,14727,13106,14743,12907,14762,12716,14784,12539,14807,12380,14827,12190,14844,11943,14855,11727,14863,11539,14870,11376,14871,11204,14868,10960,14858,10748,14845,10565,14829,10406,14809,10269,14786,10058,14761,9852,14734,9671,14705,9512,14674,9374,14641,9253,14608,9076,14821,13366,14821,13365,14821,13364,14821,13358,14821,13344,14821,13320,14819,13252,14817,13145,14815,13011,14814,12858,14817,12698,14823,12539,14832,12389,14841,12214,14850,11968,14856,11750,14861,11558,14866,11390,14867,11226,14862,10972,14853,10754,14840,10565,14823,10401,14803,10259,14780,10032,14754,9820,14725,9635,14694,9473,14661,9333,14627,9203,14593,8988,14557,8798,14923,13014,14922,13014,14922,13012,14922,13004,14920,12987,14919,12957,14915,12907,14909,12834,14902,12738,14894,12623,14888,12498,14883,12370,14880,12203,14878,11970,14875,11759,14873,11569,14874,11401,14872,11243,14865,10986,14855,10762,14842,10568,14825,10401,14804,10255,14781,10017,14754,9799,14725,9611,14692,9445,14658,9301,14623,9139,14587,8920,14548,8729,14509,8562,15008,12672,15008,12672,15008,12671,15007,12667,15005,12656,15001,12637,14997,12605,14989,12556,14978,12490,14966,12407,14953,12313,14940,12136,14927,11934,14914,11742,14903,11563,14896,11401,14889,11247,14879,10992,14866,10767,14851,10570,14833,10400,14812,10252,14789,10007,14761,9784,14731,9592,14698,9424,14663,9279,14627,9088,14588,8868,14548,8676,14508,8508,14467,8360,15080,12386,15080,12386,15079,12385,15078,12383,15076,12378,15072,12367,15066,12347,15057,12315,15045,12253,15030,12138,15012,11998,14993,11845,14972,11685,14951,11530,14935,11383,14920,11228,14904,10981,14887,10762,14870,10567,14850,10397,14827,10248,14803,9997,14774,9771,14743,9578,14710,9407,14674,9259,14637,9048,14596,8826,14555,8632,14514,8464,14471,8317,14427,8182,15139,12008,15139,12008,15138,12008,15137,12007,15135,12003,15130,11990,15124,11969,15115,11929,15102,11872,15086,11794,15064,11693,15041,11581,15013,11459,14987,11336,14966,11170,14944,10944,14921,10738,14898,10552,14875,10387,14850,10239,14824,9983,14794,9758,14762,9563,14728,9392,14692,9244,14653,9014,14611,8791,14569,8597,14526,8427,14481,8281,14436,8110,14391,7885,15188,11617,15188,11617,15187,11617,15186,11618,15183,11617,15179,11612,15173,11601,15163,11581,15150,11546,15133,11495,15110,11427,15083,11346,15051,11246,15024,11057,14996,10868,14967,10687,14938,10517,14911,10362,14882,10206,14853,9956,14821,9737,14787,9543,14752,9375,14715,9228,14675,8980,14632,8760,14589,8565,14544,8395,14498,8248,14451,8049,14404,7824,14357,7630,15228,11298,15228,11298,15227,11299,15226,11301,15223,11303,15219,11302,15213,11299,15204,11290,15191,11271,15174,11217,15150,11129,15119,11015,15087,10886,15057,10744,15024,10599,14990,10455,14957,10318,14924,10143,14891,9911,14856,9701,14820,9516,14782,9352,14744,9200,14703,8946,14659,8725,14615,8533,14568,8366,14521,8220,14472,7992,14423,7770,14374,7578,14315,7408,15260,10819,15260,10819,15259,10822,15258,10826,15256,10832,15251,10836,15246,10841,15237,10838,15225,10821,15207,10788,15183,10734,15151,10660,15120,10571,15087,10469,15049,10359,15012,10249,14974,10041,14937,9837,14900,9647,14860,9475,14820,9320,14779,9147,14736,8902,14691,8688,14646,8499,14598,8335,14549,8189,14499,7940,14448,7720,14397,7529,14347,7363,14256,7218,15285,10410,15285,10411,15285,10413,15284,10418,15282,10425,15278,10434,15272,10442,15264,10449,15252,10445,15235,10433,15210,10403,15179,10358,15149,10301,15113,10218,15073,10059,15033,9894,14991,9726,14951,9565,14909,9413,14865,9273,14822,9073,14777,8845,14730,8641,14682,8459,14633,8300,14583,8129,14531,7883,14479,7670,14426,7482,14373,7321,14305,7176,14201,6939,15305,9939,15305,9940,15305,9945,15304,9955,15302,9967,15298,9989,15293,10010,15286,10033,15274,10044,15258,10045,15233,10022,15205,9975,15174,9903,15136,9808,15095,9697,15053,9578,15009,9451,14965,9327,14918,9198,14871,8973,14825,8766,14775,8579,14725,8408,14675,8259,14622,8058,14569,7821,14515,7615,14460,7435,14405,7276,14350,7108,14256,6866,14149,6653,15321,9444,15321,9445,15321,9448,15320,9458,15317,9470,15314,9490,15310,9515,15302,9540,15292,9562,15276,9579,15251,9577,15226,9559,15195,9519,15156,9463,15116,9389,15071,9304,15025,9208,14978,9023,14927,8838,14878,8661,14827,8496,14774,8344,14722,8206,14667,7973,14612,7749,14556,7555,14499,7382,14443,7229,14385,7025,14322,6791,14210,6588,14100,6409,15333,8920,15333,8921,15332,8927,15332,8943,15329,8965,15326,9002,15322,9048,15316,9106,15307,9162,15291,9204,15267,9221,15244,9221,15212,9196,15175,9134,15133,9043,15088,8930,15040,8801,14990,8665,14938,8526,14886,8391,14830,8261,14775,8087,14719,7866,14661,7664,14603,7482,14544,7322,14485,7178,14426,6936,14367,6713,14281,6517,14166,6348,14054,6198,15341,8360,15341,8361,15341,8366,15341,8379,15339,8399,15336,8431,15332,8473,15326,8527,15318,8585,15302,8632,15281,8670,15258,8690,15227,8690,15191,8664,15149,8612,15104,8543,15055,8456,15001,8360,14948,8259,14892,8122,14834,7923,14776,7734,14716,7558,14656,7397,14595,7250,14534,7070,14472,6835,14410,6628,14350,6443,14243,6283,14125,6135,14010,5889,15348,7715,15348,7717,15348,7725,15347,7745,15345,7780,15343,7836,15339,7905,15334,8e3,15326,8103,15310,8193,15293,8239,15270,8270,15240,8287,15204,8283,15163,8260,15118,8223,15067,8143,15014,8014,14958,7873,14899,7723,14839,7573,14778,7430,14715,7293,14652,7164,14588,6931,14524,6720,14460,6531,14396,6362,14330,6210,14207,6015,14086,5781,13969,5576,15352,7114,15352,7116,15352,7128,15352,7159,15350,7195,15348,7237,15345,7299,15340,7374,15332,7457,15317,7544,15301,7633,15280,7703,15251,7754,15216,7775,15176,7767,15131,7733,15079,7670,15026,7588,14967,7492,14906,7387,14844,7278,14779,7171,14714,6965,14648,6770,14581,6587,14515,6420,14448,6269,14382,6123,14299,5881,14172,5665,14049,5477,13929,5310,15355,6329,15355,6330,15355,6339,15355,6362,15353,6410,15351,6472,15349,6572,15344,6688,15337,6835,15323,6985,15309,7142,15287,7220,15260,7277,15226,7310,15188,7326,15142,7318,15090,7285,15036,7239,14976,7177,14914,7045,14849,6892,14782,6736,14714,6581,14645,6433,14576,6293,14506,6164,14438,5946,14369,5733,14270,5540,14140,5369,14014,5216,13892,5043,15357,5483,15357,5484,15357,5496,15357,5528,15356,5597,15354,5692,15351,5835,15347,6011,15339,6195,15328,6317,15314,6446,15293,6566,15268,6668,15235,6746,15197,6796,15152,6811,15101,6790,15046,6748,14985,6673,14921,6583,14854,6479,14785,6371,14714,6259,14643,6149,14571,5946,14499,5750,14428,5567,14358,5401,14242,5250,14109,5111,13980,4870,13856,4657,15359,4555,15359,4557,15358,4573,15358,4633,15357,4715,15355,4841,15353,5061,15349,5216,15342,5391,15331,5577,15318,5770,15299,5967,15274,6150,15243,6223,15206,6280,15161,6310,15111,6317,15055,6300,14994,6262,14928,6208,14860,6141,14788,5994,14715,5838,14641,5684,14566,5529,14492,5384,14418,5247,14346,5121,14216,4892,14079,4682,13948,4496,13822,4330,15359,3498,15359,3501,15359,3520,15359,3598,15358,3719,15356,3860,15355,4137,15351,4305,15344,4563,15334,4809,15321,5116,15303,5273,15280,5418,15250,5547,15214,5653,15170,5722,15120,5761,15064,5763,15002,5733,14935,5673,14865,5597,14792,5504,14716,5400,14640,5294,14563,5185,14486,5041,14410,4841,14335,4655,14191,4482,14051,4325,13918,4183,13790,4012,15360,2282,15360,2285,15360,2306,15360,2401,15359,2547,15357,2748,15355,3103,15352,3349,15345,3675,15336,4020,15324,4272,15307,4496,15285,4716,15255,4908,15220,5086,15178,5170,15128,5214,15072,5234,15010,5231,14943,5206,14871,5166,14796,5102,14718,4971,14639,4833,14559,4687,14480,4541,14402,4401,14315,4268,14167,4142,14025,3958,13888,3747,13759,3556,15360,923,15360,925,15360,946,15360,1052,15359,1214,15357,1494,15356,1892,15352,2274,15346,2663,15338,3099,15326,3393,15309,3679,15288,3980,15260,4183,15226,4325,15185,4437,15136,4517,15080,4570,15018,4591,14950,4581,14877,4545,14800,4485,14720,4411,14638,4325,14556,4231,14475,4136,14395,3988,14297,3803,14145,3628,13999,3465,13861,3314,13729,3177,15360,263,15360,264,15360,272,15360,325,15359,407,15358,548,15356,780,15352,1144,15347,1580,15339,2099,15328,2425,15312,2795,15292,3133,15264,3329,15232,3517,15191,3689,15143,3819,15088,3923,15025,3978,14956,3999,14882,3979,14804,3931,14722,3855,14639,3756,14554,3645,14470,3529,14388,3409,14279,3289,14124,3173,13975,3055,13834,2848,13701,2658,15360,49,15360,49,15360,52,15360,75,15359,111,15358,201,15356,283,15353,519,15348,726,15340,1045,15329,1415,15314,1795,15295,2173,15269,2410,15237,2649,15197,2866,15150,3054,15095,3140,15032,3196,14963,3228,14888,3236,14808,3224,14725,3191,14639,3146,14553,3088,14466,2976,14382,2836,14262,2692,14103,2549,13952,2409,13808,2278,13674,2154,15360,4,15360,4,15360,4,15360,13,15359,33,15358,59,15357,112,15353,199,15348,302,15341,456,15331,628,15316,827,15297,1082,15272,1332,15241,1601,15202,1851,15156,2069,15101,2172,15039,2256,14970,2314,14894,2348,14813,2358,14728,2344,14640,2311,14551,2263,14463,2203,14376,2133,14247,2059,14084,1915,13930,1761,13784,1609,13648,1464,15360,0,15360,0,15360,0,15360,3,15359,18,15358,26,15357,53,15354,80,15348,97,15341,165,15332,238,15318,326,15299,427,15275,529,15245,654,15207,771,15161,885,15108,994,15046,1089,14976,1170,14900,1229,14817,1266,14731,1284,14641,1282,14550,1260,14460,1223,14370,1174,14232,1116,14066,1050,13909,981,13761,910,13623,839]);let Vn=null;function Em(){return Vn===null&&(Vn=new El(Sm,32,32,bo,ar),Vn.minFilter=fn,Vn.magFilter=fn,Vn.wrapS=qn,Vn.wrapT=qn,Vn.generateMipmaps=!1,Vn.needsUpdate=!0),Vn}class Tm{constructor(e={}){const{canvas:t=ju(),context:n=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=a;const v=new Set([yo,Mo,vo]),M=new Set([Un,Si,Tr,Ar,xo,go]),m=new Uint32Array(4),h=new Int32Array(4);let P=null,R=null;const w=[],S=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=oi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const g=this;let A=!1;this._outputColorSpace=Jt;let I=0,x=0,_=null,T=-1,F=null;const L=new xt,V=new xt;let X=null;const K=new ct(0);let se=0,j=t.width,ne=t.height,ee=1,fe=null,Ce=null;const Oe=new xt(0,0,j,ne),He=new xt(0,0,j,ne);let ut=!1;const te=new wo;let oe=!1,we=!1;const Ye=new gt,De=new G,Je=new xt,Ct={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Qe=!1;function _t(){return _===null?ee:1}let N=n;function nt(y,B){return t.getContext(y,B)}try{const y={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${po}`),t.addEventListener("webglcontextlost",ue,!1),t.addEventListener("webglcontextrestored",ie,!1),t.addEventListener("webglcontextcreationerror",xe,!1),N===null){const B="webgl2";if(N=nt(B,y),N===null)throw nt(B)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(y){throw y("WebGLRenderer: "+y.message),y}let it,ft,Ae,St,Ue,$e,C,b,W,re,ae,Z,Pe,ve,Fe,Le,le,J,We,ze,ye,Xe,O,_e;function pe(){it=new Ip(N),it.init(),Xe=new mm(N,it),ft=new Ep(N,it,e,Xe),Ae=new fm(N,it),ft.reversedDepthBuffer&&f&&Ae.buffers.depth.setReversed(!0),St=new Np(N),Ue=new em,$e=new pm(N,it,Ae,Ue,ft,Xe,St),C=new Ap(g),b=new Dp(g),W=new Bd(N),O=new yp(N,W),re=new Up(N,W,St,O),ae=new zp(N,re,W,St),We=new Op(N,ft,$e),Le=new Tp(Ue),Z=new Q0(g,C,b,it,ft,O,Le),Pe=new Mm(g,Ue),ve=new nm,Fe=new cm(it),J=new Mp(g,C,b,Ae,ae,p,c),le=new dm(g,ae,ft),_e=new ym(N,St,ft,Ae),ze=new Sp(N,it,St),ye=new Fp(N,it,St),St.programs=Z.programs,g.capabilities=ft,g.extensions=it,g.properties=Ue,g.renderLists=ve,g.shadowMap=le,g.state=Ae,g.info=St}pe();const he=new vm(g,N);this.xr=he,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){const y=it.get("WEBGL_lose_context");y&&y.loseContext()},this.forceContextRestore=function(){const y=it.get("WEBGL_lose_context");y&&y.restoreContext()},this.getPixelRatio=function(){return ee},this.setPixelRatio=function(y){y!==void 0&&(ee=y,this.setSize(j,ne,!1))},this.getSize=function(y){return y.set(j,ne)},this.setSize=function(y,B,q=!0){if(he.isPresenting){je("WebGLRenderer: Can't change size while VR device is presenting.");return}j=y,ne=B,t.width=Math.floor(y*ee),t.height=Math.floor(B*ee),q===!0&&(t.style.width=y+"px",t.style.height=B+"px"),this.setViewport(0,0,y,B)},this.getDrawingBufferSize=function(y){return y.set(j*ee,ne*ee).floor()},this.setDrawingBufferSize=function(y,B,q){j=y,ne=B,ee=q,t.width=Math.floor(y*q),t.height=Math.floor(B*q),this.setViewport(0,0,y,B)},this.getCurrentViewport=function(y){return y.copy(L)},this.getViewport=function(y){return y.copy(Oe)},this.setViewport=function(y,B,q,Y){y.isVector4?Oe.set(y.x,y.y,y.z,y.w):Oe.set(y,B,q,Y),Ae.viewport(L.copy(Oe).multiplyScalar(ee).round())},this.getScissor=function(y){return y.copy(He)},this.setScissor=function(y,B,q,Y){y.isVector4?He.set(y.x,y.y,y.z,y.w):He.set(y,B,q,Y),Ae.scissor(V.copy(He).multiplyScalar(ee).round())},this.getScissorTest=function(){return ut},this.setScissorTest=function(y){Ae.setScissorTest(ut=y)},this.setOpaqueSort=function(y){fe=y},this.setTransparentSort=function(y){Ce=y},this.getClearColor=function(y){return y.copy(J.getClearColor())},this.setClearColor=function(){J.setClearColor(...arguments)},this.getClearAlpha=function(){return J.getClearAlpha()},this.setClearAlpha=function(){J.setClearAlpha(...arguments)},this.clear=function(y=!0,B=!0,q=!0){let Y=0;if(y){let k=!1;if(_!==null){const de=_.texture.format;k=v.has(de)}if(k){const de=_.texture.type,ge=M.has(de),Re=J.getClearColor(),Se=J.getClearAlpha(),Ge=Re.r,qe=Re.g,Ie=Re.b;ge?(m[0]=Ge,m[1]=qe,m[2]=Ie,m[3]=Se,N.clearBufferuiv(N.COLOR,0,m)):(h[0]=Ge,h[1]=qe,h[2]=Ie,h[3]=Se,N.clearBufferiv(N.COLOR,0,h))}else Y|=N.COLOR_BUFFER_BIT}B&&(Y|=N.DEPTH_BUFFER_BIT),q&&(Y|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),N.clear(Y)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ue,!1),t.removeEventListener("webglcontextrestored",ie,!1),t.removeEventListener("webglcontextcreationerror",xe,!1),J.dispose(),ve.dispose(),Fe.dispose(),Ue.dispose(),C.dispose(),b.dispose(),ae.dispose(),O.dispose(),_e.dispose(),Z.dispose(),he.dispose(),he.removeEventListener("sessionstart",Ut),he.removeEventListener("sessionend",Ri),Pt.stop()};function ue(y){y.preventDefault(),$o("WebGLRenderer: Context Lost."),A=!0}function ie(){$o("WebGLRenderer: Context Restored."),A=!1;const y=St.autoReset,B=le.enabled,q=le.autoUpdate,Y=le.needsUpdate,k=le.type;pe(),St.autoReset=y,le.enabled=B,le.autoUpdate=q,le.needsUpdate=Y,le.type=k}function xe(y){wt("WebGLRenderer: A WebGL context could not be created. Reason: ",y.statusMessage)}function ke(y){const B=y.target;B.removeEventListener("dispose",ke),st(B)}function st(y){et(y),Ue.remove(y)}function et(y){const B=Ue.get(y).programs;B!==void 0&&(B.forEach(function(q){Z.releaseProgram(q)}),y.isShaderMaterial&&Z.releaseShaderCache(y))}this.renderBufferDirect=function(y,B,q,Y,k,de){B===null&&(B=Ct);const ge=k.isMesh&&k.matrixWorld.determinant()<0,Re=Ps(y,B,q,Y,k);Ae.setMaterial(Y,ge);let Se=q.index,Ge=1;if(Y.wireframe===!0){if(Se=re.getWireframeAttribute(q),Se===void 0)return;Ge=2}const qe=q.drawRange,Ie=q.attributes.position;let rt=qe.start*Ge,ht=(qe.start+qe.count)*Ge;de!==null&&(rt=Math.max(rt,de.start*Ge),ht=Math.min(ht,(de.start+de.count)*Ge)),Se!==null?(rt=Math.max(rt,0),ht=Math.min(ht,Se.count)):Ie!=null&&(rt=Math.max(rt,0),ht=Math.min(ht,Ie.count));const Et=ht-rt;if(Et<0||Et===1/0)return;O.setup(k,Y,Re,q,Se);let vt,pt=ze;if(Se!==null&&(vt=W.get(Se),pt=ye,pt.setIndex(vt)),k.isMesh)Y.wireframe===!0?(Ae.setLineWidth(Y.wireframeLinewidth*_t()),pt.setMode(N.LINES)):pt.setMode(N.TRIANGLES);else if(k.isLine){let Ne=Y.linewidth;Ne===void 0&&(Ne=1),Ae.setLineWidth(Ne*_t()),k.isLineSegments?pt.setMode(N.LINES):k.isLineLoop?pt.setMode(N.LINE_LOOP):pt.setMode(N.LINE_STRIP)}else k.isPoints?pt.setMode(N.POINTS):k.isSprite&&pt.setMode(N.TRIANGLES);if(k.isBatchedMesh)if(k._multiDrawInstances!==null)Cr("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),pt.renderMultiDrawInstances(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount,k._multiDrawInstances);else if(it.get("WEBGL_multi_draw"))pt.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{const Ne=k._multiDrawStarts,bt=k._multiDrawCounts,at=k._multiDrawCount,E=Se?W.get(Se).bytesPerElement:1,U=Ue.get(Y).currentProgram.getUniforms();for(let D=0;D<at;D++)U.setValue(N,"_gl_DrawID",D),pt.render(Ne[D]/E,bt[D])}else if(k.isInstancedMesh)pt.renderInstances(rt,Et,k.count);else if(q.isInstancedBufferGeometry){const Ne=q._maxInstanceCount!==void 0?q._maxInstanceCount:1/0,bt=Math.min(q.instanceCount,Ne);pt.renderInstances(rt,Et,bt)}else pt.render(rt,Et)};function It(y,B,q){y.transparent===!0&&y.side===vn&&y.forceSinglePass===!1?(y.side=sn,y.needsUpdate=!0,hi(y,B,q),y.side=ui,y.needsUpdate=!0,hi(y,B,q),y.side=vn):hi(y,B,q)}this.compile=function(y,B,q=null){q===null&&(q=y),R=Fe.get(q),R.init(B),S.push(R),q.traverseVisible(function(k){k.isLight&&k.layers.test(B.layers)&&(R.pushLight(k),k.castShadow&&R.pushShadow(k))}),y!==q&&y.traverseVisible(function(k){k.isLight&&k.layers.test(B.layers)&&(R.pushLight(k),k.castShadow&&R.pushShadow(k))}),R.setupLights();const Y=new Set;return y.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;const de=k.material;if(de)if(Array.isArray(de))for(let ge=0;ge<de.length;ge++){const Re=de[ge];It(Re,q,k),Y.add(Re)}else It(de,q,k),Y.add(de)}),R=S.pop(),Y},this.compileAsync=function(y,B,q=null){const Y=this.compile(y,B,q);return new Promise(k=>{function de(){if(Y.forEach(function(ge){Ue.get(ge).currentProgram.isReady()&&Y.delete(ge)}),Y.size===0){k(y);return}setTimeout(de,10)}it.get("KHR_parallel_shader_compile")!==null?de():setTimeout(de,10)})};let Gt=null;function Fn(y){Gt&&Gt(y)}function Ut(){Pt.stop()}function Ri(){Pt.start()}const Pt=new Cl;Pt.setAnimationLoop(Fn),typeof self<"u"&&Pt.setContext(self),this.setAnimationLoop=function(y){Gt=y,he.setAnimationLoop(y),y===null?Pt.stop():Pt.start()},he.addEventListener("sessionstart",Ut),he.addEventListener("sessionend",Ri),this.render=function(y,B){if(B!==void 0&&B.isCamera!==!0){wt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(A===!0)return;if(y.matrixWorldAutoUpdate===!0&&y.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),he.enabled===!0&&he.isPresenting===!0&&(he.cameraAutoUpdate===!0&&he.updateCamera(B),B=he.getCamera()),y.isScene===!0&&y.onBeforeRender(g,y,B,_),R=Fe.get(y,S.length),R.init(B),S.push(R),Ye.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),te.setFromProjectionMatrix(Ye,Dn,B.reversedDepth),we=this.localClippingEnabled,oe=Le.init(this.clippingPlanes,we),P=ve.get(y,w.length),P.init(),w.push(P),he.enabled===!0&&he.isPresenting===!0){const de=g.xr.getDepthSensingMesh();de!==null&&Kt(de,B,-1/0,g.sortObjects)}Kt(y,B,0,g.sortObjects),P.finish(),g.sortObjects===!0&&P.sort(fe,Ce),Qe=he.enabled===!1||he.isPresenting===!1||he.hasDepthSensing()===!1,Qe&&J.addToRenderList(P,y),this.info.render.frame++,oe===!0&&Le.beginShadows();const q=R.state.shadowsArray;le.render(q,y,B),oe===!0&&Le.endShadows(),this.info.autoReset===!0&&this.info.reset();const Y=P.opaque,k=P.transmissive;if(R.setupLights(),B.isArrayCamera){const de=B.cameras;if(k.length>0)for(let ge=0,Re=de.length;ge<Re;ge++){const Se=de[ge];Ve(Y,k,y,Se)}Qe&&J.render(y);for(let ge=0,Re=de.length;ge<Re;ge++){const Se=de[ge];Ci(P,y,Se,Se.viewport)}}else k.length>0&&Ve(Y,k,y,B),Qe&&J.render(y),Ci(P,y,B);_!==null&&x===0&&($e.updateMultisampleRenderTarget(_),$e.updateRenderTargetMipmap(_)),y.isScene===!0&&y.onAfterRender(g,y,B),O.resetDefaultState(),T=-1,F=null,S.pop(),S.length>0?(R=S[S.length-1],oe===!0&&Le.setGlobalState(g.clippingPlanes,R.state.camera)):R=null,w.pop(),w.length>0?P=w[w.length-1]:P=null};function Kt(y,B,q,Y){if(y.visible===!1)return;if(y.layers.test(B.layers)){if(y.isGroup)q=y.renderOrder;else if(y.isLOD)y.autoUpdate===!0&&y.update(B);else if(y.isLight)R.pushLight(y),y.castShadow&&R.pushShadow(y);else if(y.isSprite){if(!y.frustumCulled||te.intersectsSprite(y)){Y&&Je.setFromMatrixPosition(y.matrixWorld).applyMatrix4(Ye);const ge=ae.update(y),Re=y.material;Re.visible&&P.push(y,ge,Re,q,Je.z,null)}}else if((y.isMesh||y.isLine||y.isPoints)&&(!y.frustumCulled||te.intersectsObject(y))){const ge=ae.update(y),Re=y.material;if(Y&&(y.boundingSphere!==void 0?(y.boundingSphere===null&&y.computeBoundingSphere(),Je.copy(y.boundingSphere.center)):(ge.boundingSphere===null&&ge.computeBoundingSphere(),Je.copy(ge.boundingSphere.center)),Je.applyMatrix4(y.matrixWorld).applyMatrix4(Ye)),Array.isArray(Re)){const Se=ge.groups;for(let Ge=0,qe=Se.length;Ge<qe;Ge++){const Ie=Se[Ge],rt=Re[Ie.materialIndex];rt&&rt.visible&&P.push(y,ge,rt,q,Je.z,Ie)}}else Re.visible&&P.push(y,ge,Re,q,Je.z,null)}}const de=y.children;for(let ge=0,Re=de.length;ge<Re;ge++)Kt(de[ge],B,q,Y)}function Ci(y,B,q,Y){const{opaque:k,transmissive:de,transparent:ge}=y;R.setupLightsView(q),oe===!0&&Le.setGlobalState(g.clippingPlanes,q),Y&&Ae.viewport(L.copy(Y)),k.length>0&&Ht(k,B,q),de.length>0&&Ht(de,B,q),ge.length>0&&Ht(ge,B,q),Ae.buffers.depth.setTest(!0),Ae.buffers.depth.setMask(!0),Ae.buffers.color.setMask(!0),Ae.setPolygonOffset(!1)}function Ve(y,B,q,Y){if((q.isScene===!0?q.overrideMaterial:null)!==null)return;R.state.transmissionRenderTarget[Y.id]===void 0&&(R.state.transmissionRenderTarget[Y.id]=new Ei(1,1,{generateMipmaps:!0,type:it.has("EXT_color_buffer_half_float")||it.has("EXT_color_buffer_float")?ar:Un,minFilter:Mi,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:dt.workingColorSpace}));const de=R.state.transmissionRenderTarget[Y.id],ge=Y.viewport||L;de.setSize(ge.z*g.transmissionResolutionScale,ge.w*g.transmissionResolutionScale);const Re=g.getRenderTarget(),Se=g.getActiveCubeFace(),Ge=g.getActiveMipmapLevel();g.setRenderTarget(de),g.getClearColor(K),se=g.getClearAlpha(),se<1&&g.setClearColor(16777215,.5),g.clear(),Qe&&J.render(q);const qe=g.toneMapping;g.toneMapping=oi;const Ie=Y.viewport;if(Y.viewport!==void 0&&(Y.viewport=void 0),R.setupLightsView(Y),oe===!0&&Le.setGlobalState(g.clippingPlanes,Y),Ht(y,q,Y),$e.updateMultisampleRenderTarget(de),$e.updateRenderTargetMipmap(de),it.has("WEBGL_multisampled_render_to_texture")===!1){let rt=!1;for(let ht=0,Et=B.length;ht<Et;ht++){const vt=B[ht],{object:pt,geometry:Ne,material:bt,group:at}=vt;if(bt.side===vn&&pt.layers.test(Y.layers)){const E=bt.side;bt.side=sn,bt.needsUpdate=!0,en(pt,q,Y,Ne,bt,at),bt.side=E,bt.needsUpdate=!0,rt=!0}}rt===!0&&($e.updateMultisampleRenderTarget(de),$e.updateRenderTargetMipmap(de))}g.setRenderTarget(Re,Se,Ge),g.setClearColor(K,se),Ie!==void 0&&(Y.viewport=Ie),g.toneMapping=qe}function Ht(y,B,q){const Y=B.isScene===!0?B.overrideMaterial:null;for(let k=0,de=y.length;k<de;k++){const ge=y[k],{object:Re,geometry:Se,group:Ge}=ge;let qe=ge.material;qe.allowOverride===!0&&Y!==null&&(qe=Y),Re.layers.test(q.layers)&&en(Re,B,q,Se,qe,Ge)}}function en(y,B,q,Y,k,de){y.onBeforeRender(g,B,q,Y,k,de),y.modelViewMatrix.multiplyMatrices(q.matrixWorldInverse,y.matrixWorld),y.normalMatrix.getNormalMatrix(y.modelViewMatrix),k.onBeforeRender(g,B,q,Y,y,de),k.transparent===!0&&k.side===vn&&k.forceSinglePass===!1?(k.side=sn,k.needsUpdate=!0,g.renderBufferDirect(q,B,Y,k,y,de),k.side=ui,k.needsUpdate=!0,g.renderBufferDirect(q,B,Y,k,y,de),k.side=vn):g.renderBufferDirect(q,B,Y,k,y,de),y.onAfterRender(g,B,q,Y,k,de)}function hi(y,B,q){B.isScene!==!0&&(B=Ct);const Y=Ue.get(y),k=R.state.lights,de=R.state.shadowsArray,ge=k.state.version,Re=Z.getParameters(y,k.state,de,B,q),Se=Z.getProgramCacheKey(Re);let Ge=Y.programs;Y.environment=y.isMeshStandardMaterial?B.environment:null,Y.fog=B.fog,Y.envMap=(y.isMeshStandardMaterial?b:C).get(y.envMap||Y.environment),Y.envMapRotation=Y.environment!==null&&y.envMap===null?B.environmentRotation:y.envMapRotation,Ge===void 0&&(y.addEventListener("dispose",ke),Ge=new Map,Y.programs=Ge);let qe=Ge.get(Se);if(qe!==void 0){if(Y.currentProgram===qe&&Y.lightsStateVersion===ge)return wn(y,Re),qe}else Re.uniforms=Z.getUniforms(y),y.onBeforeCompile(Re,g),qe=Z.acquireProgram(Re,Se),Ge.set(Se,qe),Y.uniforms=Re.uniforms;const Ie=Y.uniforms;return(!y.isShaderMaterial&&!y.isRawShaderMaterial||y.clipping===!0)&&(Ie.clippingPlanes=Le.uniform),wn(y,Re),Y.needsLights=Fr(y),Y.lightsStateVersion=ge,Y.needsLights&&(Ie.ambientLightColor.value=k.state.ambient,Ie.lightProbe.value=k.state.probe,Ie.directionalLights.value=k.state.directional,Ie.directionalLightShadows.value=k.state.directionalShadow,Ie.spotLights.value=k.state.spot,Ie.spotLightShadows.value=k.state.spotShadow,Ie.rectAreaLights.value=k.state.rectArea,Ie.ltc_1.value=k.state.rectAreaLTC1,Ie.ltc_2.value=k.state.rectAreaLTC2,Ie.pointLights.value=k.state.point,Ie.pointLightShadows.value=k.state.pointShadow,Ie.hemisphereLights.value=k.state.hemi,Ie.directionalShadowMap.value=k.state.directionalShadowMap,Ie.directionalShadowMatrix.value=k.state.directionalShadowMatrix,Ie.spotShadowMap.value=k.state.spotShadowMap,Ie.spotLightMatrix.value=k.state.spotLightMatrix,Ie.spotLightMap.value=k.state.spotLightMap,Ie.pointShadowMap.value=k.state.pointShadowMap,Ie.pointShadowMatrix.value=k.state.pointShadowMatrix),Y.currentProgram=qe,Y.uniformsList=null,qe}function An(y){if(y.uniformsList===null){const B=y.currentProgram.getUniforms();y.uniformsList=us.seqWithValue(B.seq,y.uniforms)}return y.uniformsList}function wn(y,B){const q=Ue.get(y);q.outputColorSpace=B.outputColorSpace,q.batching=B.batching,q.batchingColor=B.batchingColor,q.instancing=B.instancing,q.instancingColor=B.instancingColor,q.instancingMorph=B.instancingMorph,q.skinning=B.skinning,q.morphTargets=B.morphTargets,q.morphNormals=B.morphNormals,q.morphColors=B.morphColors,q.morphTargetsCount=B.morphTargetsCount,q.numClippingPlanes=B.numClippingPlanes,q.numIntersection=B.numClipIntersection,q.vertexAlphas=B.vertexAlphas,q.vertexTangents=B.vertexTangents,q.toneMapping=B.toneMapping}function Ps(y,B,q,Y,k){B.isScene!==!0&&(B=Ct),$e.resetTextureUnits();const de=B.fog,ge=Y.isMeshStandardMaterial?B.environment:null,Re=_===null?g.outputColorSpace:_.isXRRenderTarget===!0?_.texture.colorSpace:ir,Se=(Y.isMeshStandardMaterial?b:C).get(Y.envMap||ge),Ge=Y.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,qe=!!q.attributes.tangent&&(!!Y.normalMap||Y.anisotropy>0),Ie=!!q.morphAttributes.position,rt=!!q.morphAttributes.normal,ht=!!q.morphAttributes.color;let Et=oi;Y.toneMapped&&(_===null||_.isXRRenderTarget===!0)&&(Et=g.toneMapping);const vt=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,pt=vt!==void 0?vt.length:0,Ne=Ue.get(Y),bt=R.state.lights;if(oe===!0&&(we===!0||y!==F)){const be=y===F&&Y.id===T;Le.setState(Y,y,be)}let at=!1;Y.version===Ne.__version?(Ne.needsLights&&Ne.lightsStateVersion!==bt.state.version||Ne.outputColorSpace!==Re||k.isBatchedMesh&&Ne.batching===!1||!k.isBatchedMesh&&Ne.batching===!0||k.isBatchedMesh&&Ne.batchingColor===!0&&k.colorTexture===null||k.isBatchedMesh&&Ne.batchingColor===!1&&k.colorTexture!==null||k.isInstancedMesh&&Ne.instancing===!1||!k.isInstancedMesh&&Ne.instancing===!0||k.isSkinnedMesh&&Ne.skinning===!1||!k.isSkinnedMesh&&Ne.skinning===!0||k.isInstancedMesh&&Ne.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&Ne.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&Ne.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&Ne.instancingMorph===!1&&k.morphTexture!==null||Ne.envMap!==Se||Y.fog===!0&&Ne.fog!==de||Ne.numClippingPlanes!==void 0&&(Ne.numClippingPlanes!==Le.numPlanes||Ne.numIntersection!==Le.numIntersection)||Ne.vertexAlphas!==Ge||Ne.vertexTangents!==qe||Ne.morphTargets!==Ie||Ne.morphNormals!==rt||Ne.morphColors!==ht||Ne.toneMapping!==Et||Ne.morphTargetsCount!==pt)&&(at=!0):(at=!0,Ne.__version=Y.version);let E=Ne.currentProgram;at===!0&&(E=hi(Y,B,k));let U=!1,D=!1,H=!1;const $=E.getUniforms(),me=Ne.uniforms;if(Ae.useProgram(E.program)&&(U=!0,D=!0,H=!0),Y.id!==T&&(T=Y.id,D=!0),U||F!==y){Ae.buffers.depth.getReversed()&&y.reversedDepth!==!0&&(y._reversedDepth=!0,y.updateProjectionMatrix()),$.setValue(N,"projectionMatrix",y.projectionMatrix),$.setValue(N,"viewMatrix",y.matrixWorldInverse);const Ee=$.map.cameraPosition;Ee!==void 0&&Ee.setValue(N,De.setFromMatrixPosition(y.matrixWorld)),ft.logarithmicDepthBuffer&&$.setValue(N,"logDepthBufFC",2/(Math.log(y.far+1)/Math.LN2)),(Y.isMeshPhongMaterial||Y.isMeshToonMaterial||Y.isMeshLambertMaterial||Y.isMeshBasicMaterial||Y.isMeshStandardMaterial||Y.isShaderMaterial)&&$.setValue(N,"isOrthographic",y.isOrthographicCamera===!0),F!==y&&(F=y,D=!0,H=!0)}if(k.isSkinnedMesh){$.setOptional(N,k,"bindMatrix"),$.setOptional(N,k,"bindMatrixInverse");const be=k.skeleton;be&&(be.boneTexture===null&&be.computeBoneTexture(),$.setValue(N,"boneTexture",be.boneTexture,$e))}k.isBatchedMesh&&($.setOptional(N,k,"batchingTexture"),$.setValue(N,"batchingTexture",k._matricesTexture,$e),$.setOptional(N,k,"batchingIdTexture"),$.setValue(N,"batchingIdTexture",k._indirectTexture,$e),$.setOptional(N,k,"batchingColorTexture"),k._colorsTexture!==null&&$.setValue(N,"batchingColorTexture",k._colorsTexture,$e));const Te=q.morphAttributes;if((Te.position!==void 0||Te.normal!==void 0||Te.color!==void 0)&&We.update(k,q,E),(D||Ne.receiveShadow!==k.receiveShadow)&&(Ne.receiveShadow=k.receiveShadow,$.setValue(N,"receiveShadow",k.receiveShadow)),Y.isMeshGouraudMaterial&&Y.envMap!==null&&(me.envMap.value=Se,me.flipEnvMap.value=Se.isCubeTexture&&Se.isRenderTargetTexture===!1?-1:1),Y.isMeshStandardMaterial&&Y.envMap===null&&B.environment!==null&&(me.envMapIntensity.value=B.environmentIntensity),me.dfgLUT!==void 0&&(me.dfgLUT.value=Em()),D&&($.setValue(N,"toneMappingExposure",g.toneMappingExposure),Ne.needsLights&&Ls(me,H),de&&Y.fog===!0&&Pe.refreshFogUniforms(me,de),Pe.refreshMaterialUniforms(me,Y,ee,ne,R.state.transmissionRenderTarget[y.id]),us.upload(N,An(Ne),me,$e)),Y.isShaderMaterial&&Y.uniformsNeedUpdate===!0&&(us.upload(N,An(Ne),me,$e),Y.uniformsNeedUpdate=!1),Y.isSpriteMaterial&&$.setValue(N,"center",k.center),$.setValue(N,"modelViewMatrix",k.modelViewMatrix),$.setValue(N,"normalMatrix",k.normalMatrix),$.setValue(N,"modelMatrix",k.matrixWorld),Y.isShaderMaterial||Y.isRawShaderMaterial){const be=Y.uniformsGroups;for(let Ee=0,Mt=be.length;Ee<Mt;Ee++){const Ft=be[Ee];_e.update(Ft,E),_e.bind(Ft,E)}}return E}function Ls(y,B){y.ambientLightColor.needsUpdate=B,y.lightProbe.needsUpdate=B,y.directionalLights.needsUpdate=B,y.directionalLightShadows.needsUpdate=B,y.pointLights.needsUpdate=B,y.pointLightShadows.needsUpdate=B,y.spotLights.needsUpdate=B,y.spotLightShadows.needsUpdate=B,y.rectAreaLights.needsUpdate=B,y.hemisphereLights.needsUpdate=B}function Fr(y){return y.isMeshLambertMaterial||y.isMeshToonMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isShadowMaterial||y.isShaderMaterial&&y.lights===!0}this.getActiveCubeFace=function(){return I},this.getActiveMipmapLevel=function(){return x},this.getRenderTarget=function(){return _},this.setRenderTargetTextures=function(y,B,q){const Y=Ue.get(y);Y.__autoAllocateDepthBuffer=y.resolveDepthBuffer===!1,Y.__autoAllocateDepthBuffer===!1&&(Y.__useRenderToTexture=!1),Ue.get(y.texture).__webglTexture=B,Ue.get(y.depthTexture).__webglTexture=Y.__autoAllocateDepthBuffer?void 0:q,Y.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(y,B){const q=Ue.get(y);q.__webglFramebuffer=B,q.__useDefaultFramebuffer=B===void 0};const Ds=N.createFramebuffer();this.setRenderTarget=function(y,B=0,q=0){_=y,I=B,x=q;let Y=!0,k=null,de=!1,ge=!1;if(y){const Se=Ue.get(y);if(Se.__useDefaultFramebuffer!==void 0)Ae.bindFramebuffer(N.FRAMEBUFFER,null),Y=!1;else if(Se.__webglFramebuffer===void 0)$e.setupRenderTarget(y);else if(Se.__hasExternalTextures)$e.rebindTextures(y,Ue.get(y.texture).__webglTexture,Ue.get(y.depthTexture).__webglTexture);else if(y.depthBuffer){const Ie=y.depthTexture;if(Se.__boundDepthTexture!==Ie){if(Ie!==null&&Ue.has(Ie)&&(y.width!==Ie.image.width||y.height!==Ie.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");$e.setupDepthRenderbuffer(y)}}const Ge=y.texture;(Ge.isData3DTexture||Ge.isDataArrayTexture||Ge.isCompressedArrayTexture)&&(ge=!0);const qe=Ue.get(y).__webglFramebuffer;y.isWebGLCubeRenderTarget?(Array.isArray(qe[B])?k=qe[B][q]:k=qe[B],de=!0):y.samples>0&&$e.useMultisampledRTT(y)===!1?k=Ue.get(y).__webglMultisampledFramebuffer:Array.isArray(qe)?k=qe[q]:k=qe,L.copy(y.viewport),V.copy(y.scissor),X=y.scissorTest}else L.copy(Oe).multiplyScalar(ee).floor(),V.copy(He).multiplyScalar(ee).floor(),X=ut;if(q!==0&&(k=Ds),Ae.bindFramebuffer(N.FRAMEBUFFER,k)&&Y&&Ae.drawBuffers(y,k),Ae.viewport(L),Ae.scissor(V),Ae.setScissorTest(X),de){const Se=Ue.get(y.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+B,Se.__webglTexture,q)}else if(ge){const Se=B;for(let Ge=0;Ge<y.textures.length;Ge++){const qe=Ue.get(y.textures[Ge]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+Ge,qe.__webglTexture,q,Se)}}else if(y!==null&&q!==0){const Se=Ue.get(y.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Se.__webglTexture,q)}T=-1},this.readRenderTargetPixels=function(y,B,q,Y,k,de,ge,Re=0){if(!(y&&y.isWebGLRenderTarget)){wt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Se=Ue.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&ge!==void 0&&(Se=Se[ge]),Se){Ae.bindFramebuffer(N.FRAMEBUFFER,Se);try{const Ge=y.textures[Re],qe=Ge.format,Ie=Ge.type;if(!ft.textureFormatReadable(qe)){wt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ft.textureTypeReadable(Ie)){wt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=y.width-Y&&q>=0&&q<=y.height-k&&(y.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+Re),N.readPixels(B,q,Y,k,Xe.convert(qe),Xe.convert(Ie),de))}finally{const Ge=_!==null?Ue.get(_).__webglFramebuffer:null;Ae.bindFramebuffer(N.FRAMEBUFFER,Ge)}}},this.readRenderTargetPixelsAsync=async function(y,B,q,Y,k,de,ge,Re=0){if(!(y&&y.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Se=Ue.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&ge!==void 0&&(Se=Se[ge]),Se)if(B>=0&&B<=y.width-Y&&q>=0&&q<=y.height-k){Ae.bindFramebuffer(N.FRAMEBUFFER,Se);const Ge=y.textures[Re],qe=Ge.format,Ie=Ge.type;if(!ft.textureFormatReadable(qe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ft.textureTypeReadable(Ie))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const rt=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,rt),N.bufferData(N.PIXEL_PACK_BUFFER,de.byteLength,N.STREAM_READ),y.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+Re),N.readPixels(B,q,Y,k,Xe.convert(qe),Xe.convert(Ie),0);const ht=_!==null?Ue.get(_).__webglFramebuffer:null;Ae.bindFramebuffer(N.FRAMEBUFFER,ht);const Et=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await Ku(N,Et,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,rt),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,de),N.deleteBuffer(rt),N.deleteSync(Et),de}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(y,B=null,q=0){const Y=Math.pow(2,-q),k=Math.floor(y.image.width*Y),de=Math.floor(y.image.height*Y),ge=B!==null?B.x:0,Re=B!==null?B.y:0;$e.setTexture2D(y,0),N.copyTexSubImage2D(N.TEXTURE_2D,q,0,0,ge,Re,k,de),Ae.unbindTexture()};const Is=N.createFramebuffer(),Pi=N.createFramebuffer();this.copyTextureToTexture=function(y,B,q=null,Y=null,k=0,de=null){de===null&&(k!==0?(Cr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),de=k,k=0):de=0);let ge,Re,Se,Ge,qe,Ie,rt,ht,Et;const vt=y.isCompressedTexture?y.mipmaps[de]:y.image;if(q!==null)ge=q.max.x-q.min.x,Re=q.max.y-q.min.y,Se=q.isBox3?q.max.z-q.min.z:1,Ge=q.min.x,qe=q.min.y,Ie=q.isBox3?q.min.z:0;else{const Te=Math.pow(2,-k);ge=Math.floor(vt.width*Te),Re=Math.floor(vt.height*Te),y.isDataArrayTexture?Se=vt.depth:y.isData3DTexture?Se=Math.floor(vt.depth*Te):Se=1,Ge=0,qe=0,Ie=0}Y!==null?(rt=Y.x,ht=Y.y,Et=Y.z):(rt=0,ht=0,Et=0);const pt=Xe.convert(B.format),Ne=Xe.convert(B.type);let bt;B.isData3DTexture?($e.setTexture3D(B,0),bt=N.TEXTURE_3D):B.isDataArrayTexture||B.isCompressedArrayTexture?($e.setTexture2DArray(B,0),bt=N.TEXTURE_2D_ARRAY):($e.setTexture2D(B,0),bt=N.TEXTURE_2D),N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,B.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,B.unpackAlignment);const at=N.getParameter(N.UNPACK_ROW_LENGTH),E=N.getParameter(N.UNPACK_IMAGE_HEIGHT),U=N.getParameter(N.UNPACK_SKIP_PIXELS),D=N.getParameter(N.UNPACK_SKIP_ROWS),H=N.getParameter(N.UNPACK_SKIP_IMAGES);N.pixelStorei(N.UNPACK_ROW_LENGTH,vt.width),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,vt.height),N.pixelStorei(N.UNPACK_SKIP_PIXELS,Ge),N.pixelStorei(N.UNPACK_SKIP_ROWS,qe),N.pixelStorei(N.UNPACK_SKIP_IMAGES,Ie);const $=y.isDataArrayTexture||y.isData3DTexture,me=B.isDataArrayTexture||B.isData3DTexture;if(y.isDepthTexture){const Te=Ue.get(y),be=Ue.get(B),Ee=Ue.get(Te.__renderTarget),Mt=Ue.get(be.__renderTarget);Ae.bindFramebuffer(N.READ_FRAMEBUFFER,Ee.__webglFramebuffer),Ae.bindFramebuffer(N.DRAW_FRAMEBUFFER,Mt.__webglFramebuffer);for(let Ft=0;Ft<Se;Ft++)$&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Ue.get(y).__webglTexture,k,Ie+Ft),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Ue.get(B).__webglTexture,de,Et+Ft)),N.blitFramebuffer(Ge,qe,ge,Re,rt,ht,ge,Re,N.DEPTH_BUFFER_BIT,N.NEAREST);Ae.bindFramebuffer(N.READ_FRAMEBUFFER,null),Ae.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(k!==0||y.isRenderTargetTexture||Ue.has(y)){const Te=Ue.get(y),be=Ue.get(B);Ae.bindFramebuffer(N.READ_FRAMEBUFFER,Is),Ae.bindFramebuffer(N.DRAW_FRAMEBUFFER,Pi);for(let Ee=0;Ee<Se;Ee++)$?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Te.__webglTexture,k,Ie+Ee):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Te.__webglTexture,k),me?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,be.__webglTexture,de,Et+Ee):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,be.__webglTexture,de),k!==0?N.blitFramebuffer(Ge,qe,ge,Re,rt,ht,ge,Re,N.COLOR_BUFFER_BIT,N.NEAREST):me?N.copyTexSubImage3D(bt,de,rt,ht,Et+Ee,Ge,qe,ge,Re):N.copyTexSubImage2D(bt,de,rt,ht,Ge,qe,ge,Re);Ae.bindFramebuffer(N.READ_FRAMEBUFFER,null),Ae.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else me?y.isDataTexture||y.isData3DTexture?N.texSubImage3D(bt,de,rt,ht,Et,ge,Re,Se,pt,Ne,vt.data):B.isCompressedArrayTexture?N.compressedTexSubImage3D(bt,de,rt,ht,Et,ge,Re,Se,pt,vt.data):N.texSubImage3D(bt,de,rt,ht,Et,ge,Re,Se,pt,Ne,vt):y.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,de,rt,ht,ge,Re,pt,Ne,vt.data):y.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,de,rt,ht,vt.width,vt.height,pt,vt.data):N.texSubImage2D(N.TEXTURE_2D,de,rt,ht,ge,Re,pt,Ne,vt);N.pixelStorei(N.UNPACK_ROW_LENGTH,at),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,E),N.pixelStorei(N.UNPACK_SKIP_PIXELS,U),N.pixelStorei(N.UNPACK_SKIP_ROWS,D),N.pixelStorei(N.UNPACK_SKIP_IMAGES,H),de===0&&B.generateMipmaps&&N.generateMipmap(bt),Ae.unbindTexture()},this.initRenderTarget=function(y){Ue.get(y).__webglFramebuffer===void 0&&$e.setupRenderTarget(y)},this.initTexture=function(y){y.isCubeTexture?$e.setTextureCube(y,0):y.isData3DTexture?$e.setTexture3D(y,0):y.isDataArrayTexture||y.isCompressedArrayTexture?$e.setTexture2DArray(y,0):$e.setTexture2D(y,0),Ae.unbindTexture()},this.resetState=function(){I=0,x=0,_=null,Ae.reset(),O.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Dn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=dt._getDrawingBufferColorSpace(e),t.unpackColorSpace=dt._getUnpackColorSpace()}}function Am({scene:i,box:e,ball:t,cyl:n,mesh:r,segment:s,mat:a,sign:o,softPool:c,doorLeaves:l,doorBlocker:u,lampFixture:d}){const f=new Set,p=new Map,v=ee=>(f.add(ee),ee);for(const ee of pn){const fe=v(r(new Cn(.36,.4,24),"#c6b387",ee.x,.09,ee.z));fe.rotation.x=-Math.PI/2,p.set(ee.id,fe)}l.forEach(v),v(d.bulb),e(-10,1.05,-13,.95,2.1,.6,"#50676e"),e(-10,1.05,-12.68,.76,1.9,.02,"#293941");const M=new Tt;M.position.set(-10.46,0,-12.63),i.add(M),v(M),e(.46,1.05,0,.9,2.08,.055,"#718380",M),e(.78,1.03,.04,.045,.23,.05,"#c2bfa9",M);const m=v(e(-10,1.1,-12.65,.48,.34,.025,"#d9cfac"));o(-10,2.35,-12.6,2.5,"איינשטיין · ציוד משותף");const h=v(t(-4,2.35,5.13,.055,"#b47e56"));for(const ee of[-.35,.35])s([-8,1.25,16.7],[-8+ee,0,16.7+.35],.025,"#8b9491");s([-8,1.25,16.7],[-8,0,16.25],.025,"#8b9491");const P=r(new Hn(.14,.18,.95,12),"#6b777b",-8,1.45,16.7);P.rotation.z=Math.PI/2,P.rotation.y=-.35;const R=t(-8.46,1.45,16.54,.13,"#7fabb1");R.scale.x=.17,n(-8.5,.12,8,.42,.22,"#9caaa1");const w=v(n(-8.5,.245,8,.36,.015,"#5696a3"));e(23,.3,-6,2,.6,1.2,"#79644d"),e(23,.62,-6,1.85,.03,1.05,"#3e493c");const S=new Tt;S.position.set(23,.62,-6),i.add(S),v(S);for(const ee of[-.6,0,.6]){s([ee,0,0],[ee,.72,0],.025,"#708762",S);for(const fe of[-1,1]){const Ce=t(ee+fe*.14,.45,0,.19,"#7b936c",S);Ce.scale.set(.8,.35,1.9),Ce.rotation.z=fe*.7}}n(24.1,.3,-5.8,.25,.55,"#809595"),s([24.1,.4,-5.8],[24.6,.6,-5.8],.065,"#809595"),e(5,.6,10,.85,1.2,.85,"#536d67"),e(5,1.23,10,.96,.12,.96,"#718b7e"),o(5,1.45,10.44,1.7,"מחזור");const g=new Tt;i.add(g),v(g);for(let ee=0;ee<3;ee++){const fe=n(4.1+ee*.4,.12,10.8+ee%2*.4,.1,.3,["#a5aaa0","#a98b71","#7b979b"][ee],g);fe.rotation.z=1.2+ee*.2}e(19,.8,8,1.4,1.6,.55,"#465a61");const A=[-.43,0,.43].map(ee=>v(e(19+ee,1.05,8.32,.14,.35,.1,"#b39e78")));o(19,1.9,8.33,2.7,"תאורת השביל","ירח · שמש · עץ");const I=[];for(const[ee,fe]of[[16,7],[13,6],[10,5]]){n(ee,.32,fe,.08,.64,"#52615f");const Ce=v(t(ee,.67,fe,.13,"#d0bd8c")),Oe=c(ee,fe,3.2);I.push({bulb:Ce,pool:Oe})}const x=v(t(-21.48,.99,-8.5,.085,"#b6b7a5")),_=[0,1,2].map(ee=>{const fe=v(r(new Cn(.22,.24,24),"#d1c49f",-21.48,1.05,-8.4));return fe.visible=!1,fe}),T=v(t(12,.25,22,.24,"#a87848")),F=v(r(new Ji(.242,.01,4,24),"#3d3933",0,0,0,T));F.rotation.x=Math.PI/2;let L=Ir(),V=-1,X=-1,K=0,se=0;function j(ee,{animate:fe=!0}={}){L=ee,l.forEach((Oe,He)=>{Oe.rotation.y=L.doorOpen?He===0?-Math.PI*.46:Math.PI*.46:0}),u.disabled=L.doorOpen,d.bulb.material=a(L.lampOn?"#d6b884":"#566368",L.lampOn),d.pool.visible=L.lampOn,M.rotation.y=L.lockerOpen?-Math.PI*.65:0,m.visible=L.lockerOpen,h.material=a(L.visited.includes("noticeboard")?"#a4c4a3":"#b47e56"),w.visible=L.waterFilled,S.scale.y=L.watered?1.3:.58,g.visible=!L.recycled;const Ce=vs(L);A.forEach((Oe,He)=>{Oe.rotation.x=L.switches[He]?-.55:.55,Oe.material=a(L.switches[He]?"#b8cdb0":"#b39e78")}),I.forEach(Oe=>{Oe.bulb.material=a(Ce?"#dfc58e":"#66716a",Ce),Oe.pool.visible=Ce});for(const[Oe,He]of p)He.material=a(L.visited.includes(Oe)?"#8da892":"#c6b387");fe&&L.shots>K&&(V=0),fe&&L.bells>se&&(X=0),K=L.shots,se=L.bells}function ne(ee,fe){if(V>=0){V+=ee;const Ce=Math.min(V/1.35,1);if(T.position.set(12+3.58*Ce,.25+2.58*Ce+Math.sin(Ce*Math.PI)*2.45,22),T.rotation.z-=ee*4,Ce===1){const Oe=Math.min((V-1.35)/.8,1);T.position.set(15.58-3.58*Oe,2.83*(1-Oe)+Math.sin(Oe*Math.PI)*.45,22),Oe===1&&(V=-1,T.position.set(12,.25,22))}}X>=0&&(X+=ee,x.rotation.z=fe?0:Math.sin(X*34)*.2,_.forEach((Ce,Oe)=>{Ce.visible=X<1.2;const He=.6+(X+Oe*.16)*2;Ce.scale.setScalar(He),Ce.rotation.y=.6}),X>1.2&&(X=-1,x.rotation.z=0))}return{dynamic:f,sync:j,update:ne,get animation(){return{basketballInFlight:V>=0,bellRinging:X>=0}}}}const wm=JSON.parse('[{"id":"facts","subject_id":"hebrew","exam_id":"hebrew-v1-garden","title":"עובדה או דעה?","description":"מזהים מה אפשר לבדוק ומה מביע מחשבה אישית.","references":[{"id":"garden-passage","kind":"passage","title":"הטקסט „תלמידי כיתה ז׳ הקימו גינה בבית הספר”","url":"garden-exam.html#article","attribution":null,"parts":[{"part":"הכותרת ושורת הפרטים","title":"הכותרת, הכותבת, מקום הפרסום והתאריך"},{"part":"פסקה 1","title":"הקמת הגינה, הכיתות וההשקיה"},{"part":"פסקה 2","title":"ההכנות לפני השתילה ומטרת הפעילות"},{"part":"פסקה 3","title":"דברי התלמידים ומה יקרה בעוד חודש"},{"part":"הטקסט כולו","title":"הטקסט כולו"}]}],"questions":[{"id":"facts-01","position":1,"type":"mcq","topic":null,"difficulty":null,"prompt":"„בפעילות השתתפו שלוש כיתות.” מה זה?","choices":["עובדה","דעה"],"correct":0,"explanation":{"he":"אפשר לבדוק כמה כיתות השתתפו בפעילות.","en":"The number of participating classes can be checked."},"ref":{"id":"garden-passage","part":"פסקה 1"}},{"id":"facts-02","position":2,"type":"mcq","topic":null,"difficulty":null,"prompt":"„שיעורים בגינה מעניינים יותר משיעורים בכיתה.” מה זה?","choices":["עובדה","דעה"],"correct":1,"explanation":{"he":"„מעניינים יותר” הוא שיפוט אישי, ולכן זו דעה.","en":"“More interesting” is a personal judgment, so this is an opinion."},"ref":{"id":"garden-passage","part":"פסקה 3"}},{"id":"facts-03","position":3,"type":"mcq","topic":null,"difficulty":null,"prompt":"„התלמידים שתלו נענע, רוזמרין וחסה.” מה זה?","choices":["עובדה","דעה"],"correct":0,"explanation":{"he":"אפשר לבדוק אילו צמחים נשתלו בגינה.","en":"The plants in the garden can be checked."},"ref":{"id":"garden-passage","part":"פסקה 1"}},{"id":"facts-04","position":4,"type":"mcq","topic":null,"difficulty":null,"prompt":"„נענע היא הצמח הכי מוצלח בגינה.” מה זה?","choices":["עובדה","דעה"],"correct":1,"explanation":{"he":"„הכי מוצלח” מביע הערכה אישית ולא נתון מדיד שהוגדר כאן.","en":"“The best” is a personal evaluation, not a defined measurable fact here."},"ref":{"id":"garden-passage","part":null}},{"id":"facts-05","position":5,"type":"mcq","topic":null,"difficulty":null,"prompt":"„כל כיתה קיבלה אחריות להשקיה ביום אחר בשבוע.” מה זה?","choices":["עובדה","דעה"],"correct":0,"explanation":{"he":"אפשר לבדוק את לוח ההשקיה של הכיתות.","en":"The class watering schedule can be checked."},"ref":{"id":"garden-passage","part":"פסקה 1"}},{"id":"facts-06","position":6,"type":"mcq","topic":null,"difficulty":null,"prompt":"„לדעתי, הפעילות בגינה נהדרת.” מה זה?","choices":["עובדה","דעה"],"correct":1,"explanation":{"he":"המילה „לדעתי” מסמנת במפורש שהדובר מביע דעה.","en":"The word “in my opinion” clearly signals an opinion."},"ref":{"id":"garden-passage","part":null}}]},{"id":"questions","subject_id":"hebrew","exam_id":"hebrew-v1-garden","title":"מילות שאלה","description":"בוחרים את מילת השאלה המתאימה למידע שמחפשים.","references":[{"id":"garden-passage","kind":"passage","title":"הטקסט „תלמידי כיתה ז׳ הקימו גינה בבית הספר”","url":"garden-exam.html#article","attribution":null,"parts":[{"part":"הכותרת ושורת הפרטים","title":"הכותרת, הכותבת, מקום הפרסום והתאריך"},{"part":"פסקה 1","title":"הקמת הגינה, הכיתות וההשקיה"},{"part":"פסקה 2","title":"ההכנות לפני השתילה ומטרת הפעילות"},{"part":"פסקה 3","title":"דברי התלמידים ומה יקרה בעוד חודש"},{"part":"הטקסט כולו","title":"הטקסט כולו"}]}],"questions":[{"id":"questions-01","position":1,"type":"mcq","topic":null,"difficulty":null,"prompt":"איזו מילת שאלה מתאימה לבירור מועד הקמת הגינה?","choices":["מתי","מי","כמה"],"correct":0,"explanation":{"he":"„מתי” מבקשת זמן או מועד.","en":"“When” asks about a time or date."},"ref":{"id":"garden-passage","part":"פסקה 1"}},{"id":"questions-02","position":2,"type":"mcq","topic":null,"difficulty":null,"prompt":"איזו מילת שאלה מתאימה לבירור מספר הכיתות שהשתתפו?","choices":["כיצד","כמה","היכן"],"correct":1,"explanation":{"he":"„כמה” מבקשת מספר או כמות.","en":"“How many” asks for a number or quantity."},"ref":{"id":"garden-passage","part":"פסקה 1"}},{"id":"questions-03","position":3,"type":"mcq","topic":null,"difficulty":null,"prompt":"איזו מילת שאלה מתאימה לשאלה על הסיבה לכך שקראו על הצמחים?","choices":["מדוע","מתי","מי"],"correct":0,"explanation":{"he":"„מדוע” מבקשת סיבה: למה עשו זאת?","en":"“Why” asks for the reason something happened."},"ref":{"id":"garden-passage","part":"פסקה 2"}},{"id":"questions-04","position":4,"type":"mcq","topic":null,"difficulty":null,"prompt":"איזו מילת שאלה מתאימה לבירור המקום שבו הוקמה הגינה?","choices":["כמה","היכן","כיצד"],"correct":1,"explanation":{"he":"„היכן” מבקשת מקום.","en":"“Where” asks about a place."},"ref":{"id":"garden-passage","part":"פסקה 1"}},{"id":"questions-05","position":5,"type":"mcq","topic":null,"difficulty":null,"prompt":"איזו מילת שאלה מתאימה לבירור האופן שבו חילקו את ההשקיה?","choices":["כיצד","מתי","מי"],"correct":0,"explanation":{"he":"„כיצד” מבקשת דרך או אופן פעולה.","en":"“How” asks about the way something was done."},"ref":{"id":"garden-passage","part":"פסקה 1"}},{"id":"questions-06","position":6,"type":"mcq","topic":null,"difficulty":null,"prompt":"איזו מילת שאלה מתאימה לבירור מי הציעה להוסיף פרחים?","choices":["היכן","מי","מדוע"],"correct":1,"explanation":{"he":"„מי” מבקשת לזהות אדם.","en":"“Who” asks which person did something."},"ref":{"id":"garden-passage","part":"פסקה 3"}}]},{"id":"instructions","subject_id":"hebrew","exam_id":"hebrew-v1-garden","title":"מבינים הוראות","description":"מזהים מה בדיוק צריך לעשות לפי מילת ההוראה.","references":[{"id":"garden-passage","kind":"passage","title":"הטקסט „תלמידי כיתה ז׳ הקימו גינה בבית הספר”","url":"garden-exam.html#article","attribution":null,"parts":[{"part":"הכותרת ושורת הפרטים","title":"הכותרת, הכותבת, מקום הפרסום והתאריך"},{"part":"פסקה 1","title":"הקמת הגינה, הכיתות וההשקיה"},{"part":"פסקה 2","title":"ההכנות לפני השתילה ומטרת הפעילות"},{"part":"פסקה 3","title":"דברי התלמידים ומה יקרה בעוד חודש"},{"part":"הטקסט כולו","title":"הטקסט כולו"}]}],"questions":[{"id":"instructions-01","position":1,"type":"mcq","topic":null,"difficulty":null,"prompt":"בשאלה כתוב „העתיקו מהטקסט עובדה”. מה צריך לעשות?","choices":["לכתוב את המילים בדיוק כפי שהן בטקסט","להמציא עובדה חדשה","לכתוב מה חושבים"],"correct":0,"explanation":{"he":"„העתיקו” פירושו להשתמש בניסוח שמופיע בטקסט.","en":"“Copy” means use the wording from the passage."},"ref":{"id":"garden-passage","part":null}},{"id":"instructions-02","position":2,"type":"mcq","topic":null,"difficulty":null,"prompt":"בשאלה כתוב „נמקו”. מה צריך להוסיף לתשובה?","choices":["כותרת בלבד","סיבה שמסבירה את הבחירה","תאריך הפרסום בלבד"],"correct":1,"explanation":{"he":"„נמקו” מבקשת לתת סיבה או ראיה לבחירה.","en":"“Justify” asks for a reason or evidence."},"ref":{"id":"garden-passage","part":null}},{"id":"instructions-03","position":3,"type":"mcq","topic":null,"difficulty":null,"prompt":"בשאלה כתוב „ציינו”. איזו תשובה מתאימה בדרך כלל?","choices":["תשובה קצרה וברורה","סיפור ארוך שלא קשור לשאלה","שאלה חדשה"],"correct":0,"explanation":{"he":"„ציינו” מבקשת למסור את הפרט המבוקש בקצרה.","en":"“State” usually asks for the requested detail briefly."},"ref":{"id":"garden-passage","part":null}},{"id":"instructions-04","position":4,"type":"mcq","topic":null,"difficulty":null,"prompt":"בשאלה כתוב „הסבירו”. מה צריך לעשות?","choices":["לכתוב מילה אחת בלבד","לתאר בפירוט כיצד או מדוע","להעתיק את הכותרת"],"correct":1,"explanation":{"he":"„הסבירו” מבקשת להבהיר את הרעיון בעזרת פירוט או סיבה.","en":"“Explain” asks for details about how or why."},"ref":{"id":"garden-passage","part":null}},{"id":"instructions-05","position":5,"type":"mcq","topic":null,"difficulty":null,"prompt":"בשאלה כתוב „נסחו שאלה מלאה”. איזו תשובה מקיימת את ההוראה?","choices":["„שלוש כיתות”","„כמה כיתות השתתפו בפעילות?”","„כיתות”"],"correct":1,"explanation":{"he":"שאלה מלאה כוללת מילת שאלה ומשפט שלם.","en":"A full question includes a question word and a complete sentence."},"ref":{"id":"garden-passage","part":null}},{"id":"instructions-06","position":6,"type":"mcq","topic":null,"difficulty":null,"prompt":"בשאלה כתוב „הביעו את דעתכם וכתבו נימוק”. מה צריך לכתוב?","choices":["רק עובדה מהטקסט","עמדה אישית וסיבה שתומכת בה","רק את שם הכותבת"],"correct":1,"explanation":{"he":"צריך לציין מה חושבים ולתת סיבה אחת לפחות.","en":"State your view and give at least one supporting reason."},"ref":{"id":"garden-passage","part":null}}]},{"id":"physics-basics","subject_id":"physics","exam_id":"physics-v1-assessment","title":"מדידה ושיטות מדידה","description":"מזהים תוצאות ומבדילים בין מדידה ישירה לעקיפה.","references":[{"id":"physics-pdf","kind":"pdf","title":"סיכום נושא מדידות (PDF)","url":"assets/materials/physics-measurements-grade-7.pdf","attribution":"שרית שרת","parts":[{"part":"עמוד 1","title":"מדידות: מהי מדידה, מדידה ישירה ומדידה עקיפה"},{"part":"עמוד 2","title":"המרת יחידות אורך"},{"part":"עמוד 3","title":"איך מודדים עובי של דף?"},{"part":"עמוד 4","title":"דיוק ומדידה נכונה"},{"part":"עמוד 5","title":"מודדים גובה של עמוד: הרעיון הגאומטרי"},{"part":"עמוד 6","title":"מדידת העמוד בפועל"}]}],"questions":[{"id":"physics-basics-01","position":1,"type":"mcq","topic":null,"difficulty":null,"prompt":"מה חייבים לציין בתוצאת מדידה?","choices":["מספר ויחידת מידה","מספר בלבד","שם כלי המדידה בלבד"],"correct":0,"explanation":{"he":"תוצאת מדידה כוללת מספר ויחידה, למשל 14 ס״מ.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 1"}},{"id":"physics-basics-02","position":2,"type":"mcq","topic":null,"difficulty":null,"prompt":"מדדתם אורך מחברת וקראתם את התוצאה מהסרגל. איזו מדידה זו?","choices":["ישירה","עקיפה","לא מדידה"],"correct":0,"explanation":{"he":"במדידה ישירה קוראים את הגודל המבוקש מכלי המדידה.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 1"}},{"id":"physics-basics-03","position":3,"type":"mcq","topic":null,"difficulty":null,"prompt":"מדדתם עובי של ערימת דפים וחילקתם במספר הדפים. איזו מדידה זו?","choices":["ישירה","עקיפה","הערכה ללא מדידה"],"correct":1,"explanation":{"he":"מודדים גודל אחר ומחשבים ממנו את העובי הממוצע של דף.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 1"}},{"id":"physics-basics-04","position":4,"type":"mcq","topic":null,"difficulty":null,"prompt":"איך מחשבים עובי ממוצע של דף בערימה?","choices":["עובי הערימה חלקי מספר הדפים","מספר הדפים חלקי עובי הערימה","עובי הערימה כפול מספר הדפים"],"correct":0,"explanation":{"he":"מחלקים את עובי הערימה במספר הדפים, לא במספר העמודים.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 3"}},{"id":"physics-basics-05","position":5,"type":"mcq","topic":null,"difficulty":null,"prompt":"ערימה של 100 דפים עובייה 10 מ״מ. מה העובי הממוצע של דף?","choices":["0.1 מ״מ","1 מ״מ","10 מ״מ"],"correct":0,"explanation":{"he":"מחלקים 10 מ״מ ב־100 ומקבלים 0.1 מ״מ לדף.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 3"}},{"id":"physics-basics-06","position":6,"type":"mcq","topic":null,"difficulty":null,"prompt":"למה כדאי למדוד ערימה של דפים מאותו סוג?","choices":["כדי להעריך את העובי הממוצע של דף מהסוג הזה","כי אין צורך לספור את הדפים","כדי לקבל תמיד תוצאה מדויקת לגמרי"],"correct":0,"explanation":{"he":"דפים מאותו סוג מאפשרים אומדן שימושי יותר של עובי דף ממוצע.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 3"}},{"id":"physics-basics-07","position":7,"type":"mcq","topic":null,"difficulty":null,"prompt":"מהי מדידה?","choices":["השוואה ליחידת מידה מוסכמת","ניחוש ללא השוואה","כתיבת שם הגוף"],"correct":0,"explanation":{"he":"מדידה משווה גודל ליחידת מידה מוסכמת.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 1"}},{"id":"physics-basics-08","position":8,"type":"mcq","topic":null,"difficulty":null,"prompt":"מה מתאים לתיאור אורך עיפרון?","choices":["14 ס״מ","14 בלבד","ס״מ בלבד"],"correct":0,"explanation":{"he":"תוצאת מדידה כוללת גם מספר וגם יחידת מידה.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 1"}},{"id":"physics-basics-09","position":9,"type":"mcq","topic":null,"difficulty":null,"prompt":"איזו פעולה היא מדידה עקיפה?","choices":["מדידת ערימת דפים וחלוקה במספר הדפים","קריאת אורך עיפרון מסרגל","קריאת הטמפרטורה ממדחום"],"correct":0,"explanation":{"he":"מודדים את הערימה ומחשבים ממנה את עובי הדף הממוצע.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 1"}},{"id":"physics-basics-10","position":10,"type":"mcq","topic":null,"difficulty":null,"prompt":"ערימה של 50 דפים היא בעובי 5 מ״מ. מה עובי דף ממוצע?","choices":["0.1 מ״מ","10 מ״מ","1 מ״מ"],"correct":0,"explanation":{"he":"מחלקים 5 מ״מ ב־50 דפים ומקבלים 0.1 מ״מ לדף.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 3"}},{"id":"physics-basics-11","position":11,"type":"mcq","topic":null,"difficulty":null,"prompt":"למה מודדים ערימת דפים בלי הכריכה?","choices":["כדי שהכריכה לא תוסיף עובי לתוצאה","כדי לשנות את מספר הדפים","כי הכריכה מחליפה את הסרגל"],"correct":0,"explanation":{"he":"הכריכה אינה דף בערימה ולכן עובייה יטה את החישוב.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 3"}}]},{"id":"physics-units","subject_id":"physics","exam_id":"physics-v1-assessment","title":"המרת יחידות אורך","description":"מתרגלים קילומטרים, מטרים, סנטימטרים ומילימטרים.","references":[{"id":"physics-pdf","kind":"pdf","title":"סיכום נושא מדידות (PDF)","url":"assets/materials/physics-measurements-grade-7.pdf","attribution":"שרית שרת","parts":[{"part":"עמוד 1","title":"מדידות: מהי מדידה, מדידה ישירה ומדידה עקיפה"},{"part":"עמוד 2","title":"המרת יחידות אורך"},{"part":"עמוד 3","title":"איך מודדים עובי של דף?"},{"part":"עמוד 4","title":"דיוק ומדידה נכונה"},{"part":"עמוד 5","title":"מודדים גובה של עמוד: הרעיון הגאומטרי"},{"part":"עמוד 6","title":"מדידת העמוד בפועל"}]}],"questions":[{"id":"physics-units-01","position":1,"type":"mcq","topic":null,"difficulty":null,"prompt":"כמה סנטימטרים יש במטר אחד?","choices":["10","100","1,000"],"correct":1,"explanation":{"he":"מטר אחד שווה ל־100 סנטימטרים.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 2"}},{"id":"physics-units-02","position":2,"type":"mcq","topic":null,"difficulty":null,"prompt":"כמה מילימטרים יש בסנטימטר אחד?","choices":["10","100","1,000"],"correct":0,"explanation":{"he":"סנטימטר אחד שווה ל־10 מילימטרים.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 2"}},{"id":"physics-units-03","position":3,"type":"mcq","topic":null,"difficulty":null,"prompt":"כמה מטרים יש ב־2 קילומטרים?","choices":["200","2,000","20,000"],"correct":1,"explanation":{"he":"קילומטר אחד הוא 1,000 מטרים, ולכן 2 ק״מ הם 2,000 מטרים.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 2"}},{"id":"physics-units-04","position":4,"type":"mcq","topic":null,"difficulty":null,"prompt":"כמה סנטימטרים הם 2.4 מטרים?","choices":["24","240","2,400"],"correct":1,"explanation":{"he":"ממטר לסנטימטר כופלים ב־100: 2.4 × 100 = 240.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 2"}},{"id":"physics-units-05","position":5,"type":"mcq","topic":null,"difficulty":null,"prompt":"כמה מטרים הם 350 סנטימטרים?","choices":["3.5","35","0.35"],"correct":0,"explanation":{"he":"מסנטימטר למטר מחלקים ב־100: 350 ÷ 100 = 3.5.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 2"}},{"id":"physics-units-06","position":6,"type":"mcq","topic":null,"difficulty":null,"prompt":"כמה הם מטר אחד ועוד 25 ס״מ?","choices":["1.25 מטרים","26 מטרים","1.025 מטרים"],"correct":0,"explanation":{"he":"ממירים 25 ס״מ ל־0.25 מטר ואז מחברים: 1 + 0.25 = 1.25.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 2"}},{"id":"physics-units-07","position":7,"type":"mcq","topic":null,"difficulty":null,"prompt":"כמה מילימטרים הם 3 ס״מ?","choices":["30 מ״מ","3 מ״מ","300 מ״מ"],"correct":0,"explanation":{"he":"כל סנטימטר הוא 10 מ״מ, ולכן 3 ס״מ הם 30 מ״מ.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 2"}},{"id":"physics-units-08","position":8,"type":"mcq","topic":null,"difficulty":null,"prompt":"כמה סנטימטרים הם 12 מ״מ?","choices":["1.2 ס״מ","12 ס״מ","120 ס״מ"],"correct":0,"explanation":{"he":"מחלקים את מספר המילימטרים ב־10: התוצאה היא 1.2 ס״מ.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 2"}},{"id":"physics-units-09","position":9,"type":"mcq","topic":null,"difficulty":null,"prompt":"כמה קילומטרים הם 1,500 מטרים?","choices":["1.5 ק״מ","15 ק״מ","0.15 ק״מ"],"correct":0,"explanation":{"he":"מחלקים ב־1,000: 1,500 מטרים הם 1.5 ק״מ.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 2"}},{"id":"physics-units-10","position":10,"type":"mcq","topic":null,"difficulty":null,"prompt":"מה ארוך יותר: 90 ס״מ או מטר אחד?","choices":["מטר אחד","90 ס״מ","הם שווים"],"correct":0,"explanation":{"he":"מטר אחד הוא 100 ס״מ, ולכן הוא ארוך מ־90 ס״מ.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 2"}},{"id":"physics-units-11","position":11,"type":"mcq","topic":null,"difficulty":null,"prompt":"מה קורה לאורך עצמו כשממירים אותו מס״מ למ״מ?","choices":["האורך נשאר זהה","האורך גדל פי 10","האורך קטן פי 10"],"correct":0,"explanation":{"he":"הגוף אינו משתנה; רק המספר והיחידה שבהם מתארים אותו משתנים.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 2"}}]},{"id":"physics-precision","subject_id":"physics","exam_id":"physics-v1-assessment","title":"מודדים נכון","description":"בוחרים כלי מתאים וקוראים את הסרגל בזהירות.","references":[{"id":"physics-pdf","kind":"pdf","title":"סיכום נושא מדידות (PDF)","url":"assets/materials/physics-measurements-grade-7.pdf","attribution":"שרית שרת","parts":[{"part":"עמוד 1","title":"מדידות: מהי מדידה, מדידה ישירה ומדידה עקיפה"},{"part":"עמוד 2","title":"המרת יחידות אורך"},{"part":"עמוד 3","title":"איך מודדים עובי של דף?"},{"part":"עמוד 4","title":"דיוק ומדידה נכונה"},{"part":"עמוד 5","title":"מודדים גובה של עמוד: הרעיון הגאומטרי"},{"part":"עמוד 6","title":"מדידת העמוד בפועל"}]}],"questions":[{"id":"physics-precision-01","position":1,"type":"mcq","topic":null,"difficulty":null,"prompt":"מאיזו נקודה בסרגל מתחילים למדוד אורך?","choices":["מסימון האפס","תמיד מקצה הסרגל","מהמספר 1"],"correct":0,"explanation":{"he":"מצמידים את תחילת הגוף לסימון האפס, שלא תמיד נמצא בקצה הסרגל.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 4"}},{"id":"physics-precision-02","position":2,"type":"mcq","topic":null,"difficulty":null,"prompt":"גוף מתחיל ב־2.0 ס״מ ומסתיים ב־8.2 ס״מ. מה אורכו?","choices":["6.2 ס״מ","8.2 ס״מ","10.2 ס״מ"],"correct":0,"explanation":{"he":"מחסרים את קריאת ההתחלה מקריאת הסיום: 8.2 − 2.0 = 6.2 ס״מ.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 4"}},{"id":"physics-precision-03","position":3,"type":"mcq","topic":null,"difficulty":null,"prompt":"איך מסתכלים על שנתות הסרגל כדי לצמצם טעות קריאה?","choices":["בניצב לסולם","באלכסון ככל האפשר","ממרחק גדול"],"correct":0,"explanation":{"he":"מבט בניצב לסולם מצמצם שגיאת קריאה בגלל זווית ההסתכלות.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 4"}},{"id":"physics-precision-04","position":4,"type":"mcq","topic":null,"difficulty":null,"prompt":"איזה כלי מתאים יותר למדידת אורך של חדר?","choices":["סרט מדידה","סרגל קצר בלבד","שעון"],"correct":0,"explanation":{"he":"סרט מדידה מתאים יותר לאורכו של חדר.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 4"}},{"id":"physics-precision-05","position":5,"type":"mcq","topic":null,"difficulty":null,"prompt":"מה מאפשרות שנתות קטנות יותר על כלי מדידה?","choices":["קריאה מפורטת יותר","ביטול מוחלט של כל טעות","שינוי האורך של הגוף"],"correct":0,"explanation":{"he":"שנתות קטנות מאפשרות לקרוא את המדידה בפירוט רב יותר.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 4"}},{"id":"physics-precision-06","position":6,"type":"mcq","topic":null,"difficulty":null,"prompt":"מדוע חוזרים על מדידה?","choices":["כדי לזהות חריגות ולהקטין השפעת שגיאות אקראיות","כדי לתקן בהכרח כלי פגום","כדי לשנות את גודל הגוף"],"correct":0,"explanation":{"he":"חזרות מסייעות לזהות חריגות, אך אינן מתקנות כלי פגום או שיטה שגויה.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 4"}},{"id":"physics-precision-07","position":7,"type":"mcq","topic":null,"difficulty":null,"prompt":"גוף מתחיל בסימון 3 ס״מ ומסתיים ב־9 ס״מ. מה אורכו?","choices":["6 ס״מ","9 ס״מ","12 ס״מ"],"correct":0,"explanation":{"he":"מחסרים את קריאת ההתחלה מקריאת הסיום: 9 פחות 3 הם 6 ס״מ.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 4"}},{"id":"physics-precision-08","position":8,"type":"mcq","topic":null,"difficulty":null,"prompt":"למה לא תמיד מתחילים למדוד מקצה הסרגל?","choices":["כי סימון האפס יכול להיות רחוק מהקצה","כי הסרגל תמיד מתחיל ב־1","כי אסור להשתמש בסימון האפס"],"correct":0,"explanation":{"he":"חשוב להתחיל מסימון האפס; קצה הסרגל לא תמיד נמצא בדיוק באפס.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 4"}},{"id":"physics-precision-09","position":9,"type":"mcq","topic":null,"difficulty":null,"prompt":"איזה כלי מתאים למדידת אורך של עיפרון?","choices":["סרגל עם שנתות קטנות","שעון עצר","מדחום"],"correct":0,"explanation":{"he":"סרגל עם שנתות מתאימות מאפשר למדוד את אורך העיפרון.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 4"}},{"id":"physics-precision-10","position":10,"type":"mcq","topic":null,"difficulty":null,"prompt":"מה חזרה על מדידה אינה מתקנת בהכרח?","choices":["שיטה שגויה או כלי פגום","טעות אקראית בודדת","תוצאה חריגה שאפשר לזהות"],"correct":0,"explanation":{"he":"חזרה יכולה לעזור לזהות חריגות, אך אינה מתקנת כלי פגום או שיטה שגויה.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 4"}},{"id":"physics-precision-11","position":11,"type":"mcq","topic":null,"difficulty":null,"prompt":"מה כדאי לבדוק לפני שרושמים תוצאה?","choices":["את היחידה, נקודת האפס וזווית ההסתכלות","רק את צבע כלי המדידה","רק את שם הגוף"],"correct":0,"explanation":{"he":"יחידה מתאימה, נקודת אפס נכונה ומבט בניצב עוזרים למדוד נכון.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 4"}}]},{"id":"physics-pole","subject_id":"physics","exam_id":"physics-v1-assessment","title":"מודדים גובה של עמוד","description":"מחשבים גובה בעזרת זווית של 45° ומרחק אופקי.","references":[{"id":"physics-pdf","kind":"pdf","title":"סיכום נושא מדידות (PDF)","url":"assets/materials/physics-measurements-grade-7.pdf","attribution":"שרית שרת","parts":[{"part":"עמוד 1","title":"מדידות: מהי מדידה, מדידה ישירה ומדידה עקיפה"},{"part":"עמוד 2","title":"המרת יחידות אורך"},{"part":"עמוד 3","title":"איך מודדים עובי של דף?"},{"part":"עמוד 4","title":"דיוק ומדידה נכונה"},{"part":"עמוד 5","title":"מודדים גובה של עמוד: הרעיון הגאומטרי"},{"part":"עמוד 6","title":"מדידת העמוד בפועל"}]}],"questions":[{"id":"physics-pole-01","position":1,"type":"mcq","topic":null,"difficulty":null,"prompt":"בשיטת העמוד, באיזו זווית לאופק מכוונים אל ראש העמוד?","choices":["45°","90°","180°"],"correct":0,"explanation":{"he":"מכוונים את קו הראייה בזווית של 45° ביחס לאופק.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 5"}},{"id":"physics-pole-02","position":2,"type":"mcq","topic":null,"difficulty":null,"prompt":"מה שווה למרחק האופקי לעמוד בשיטת 45°?","choices":["גובה ראש העמוד מעל גובה העיניים","גובה העמוד כולו","גובה העיניים"],"correct":0,"explanation":{"he":"במשולש ישר־זווית ושווה־שוקיים שני הניצבים שווים.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 5"}},{"id":"physics-pole-03","position":3,"type":"mcq","topic":null,"difficulty":null,"prompt":"המרחק האופקי לעמוד 6 מטרים וגובה העיניים 1.4 מטרים. מה גובה העמוד?","choices":["7.4 מטרים","6 מטרים","4.6 מטרים"],"correct":0,"explanation":{"he":"מחברים את המרחק האופקי לגובה העיניים: 6 + 1.4 = 7.4 מטרים.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 6"}},{"id":"physics-pole-04","position":4,"type":"mcq","topic":null,"difficulty":null,"prompt":"איזה מרחק מודדים לצורך החישוב?","choices":["המרחק האופקי אל בסיס העמוד","אורך קו הראייה האלכסוני","המרחק מראש העמוד לקרקע באומדן"],"correct":0,"explanation":{"he":"מודדים את המרחק האופקי מהנקודה שמתחת לעין אל בסיס העמוד.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 6"}},{"id":"physics-pole-05","position":5,"type":"mcq","topic":null,"difficulty":null,"prompt":"איזה גובה מוסיפים למרחק האופקי?","choices":["גובה העיניים מעל הקרקע","גובה התלמיד כולו","גובה המשולש שביד"],"correct":0,"explanation":{"he":"מוסיפים את גובה העיניים, כי המשולש מתחיל בגובה העין.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 6"}},{"id":"physics-pole-06","position":6,"type":"mcq","topic":null,"difficulty":null,"prompt":"איזה תנאי נדרש לשיטה המתוארת?","choices":["קרקע אופקית ובסיס העמוד באותו מפלס","העמוד חייב להיות נמוך מהתלמיד","אין צורך לדעת את זווית הראייה"],"correct":0,"explanation":{"he":"הנוסחה מתאימה כאשר הקרקע אופקית ובסיס העמוד באותו מפלס.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 5"}},{"id":"physics-pole-07","position":7,"type":"mcq","topic":null,"difficulty":null,"prompt":"המרחק לעמוד 4 מטרים וגובה העיניים 1.5 מטרים. מה גובה העמוד בשיטת 45°?","choices":["5.5 מטרים","4 מטרים","2.5 מטרים"],"correct":0,"explanation":{"he":"מחברים מרחק אופקי וגובה עיניים: 4 + 1.5 = 5.5 מטרים.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 5"}},{"id":"physics-pole-08","position":8,"type":"mcq","topic":null,"difficulty":null,"prompt":"מה צריך לראות דרך הגליל כשקובעים את נקודת המדידה?","choices":["את ראש העמוד","את בסיס העמוד בלבד","את הקרקע מתחת לעיניים"],"correct":0,"explanation":{"he":"מתקדמים או מתרחקים עד שרואים את ראש העמוד דרך הגליל המכוון ב־45°.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 6"}},{"id":"physics-pole-09","position":9,"type":"mcq","topic":null,"difficulty":null,"prompt":"מהו תפקיד המשולש בעל זווית 45°?","choices":["לעזור לכוון את הגליל בזווית הנכונה לאופק","למדוד ישירות את גובה העמוד","למדוד את עובי העמוד"],"correct":0,"explanation":{"he":"המשולש עוזר לקבע את הגליל בזווית של 45° ביחס לאופק.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 6"}},{"id":"physics-pole-10","position":10,"type":"mcq","topic":null,"difficulty":null,"prompt":"אם המרחק האופקי לעמוד 5 מטרים, מה גובה ראש העמוד מעל גובה העיניים בשיטה זו?","choices":["5 מטרים","10 מטרים","2.5 מטרים"],"correct":0,"explanation":{"he":"בזווית של 45° הניצבים במשולש שווים, ולכן הגובה מעל העיניים שווה למרחק האופקי.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 5"}},{"id":"physics-pole-11","position":11,"type":"mcq","topic":null,"difficulty":null,"prompt":"למה זו מדידה עקיפה?","choices":["כי מודדים מרחק וגובה עיניים ומחשבים מהם את גובה העמוד","כי קוראים את גובה העמוד ישירות מסרגל","כי אין צורך למדוד דבר"],"correct":0,"explanation":{"he":"גובה העמוד מתקבל מחישוב המבוסס על מדידות אחרות.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 6"}}]}]'),Ts={quizzes:wm};function Rm(i,e=!1){const t=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),r=new Set(Object.keys(i[0].morphAttributes)),s={},a={},o=i[0].morphTargetsRelative,c=new jt;let l=0;for(let u=0;u<i.length;++u){const d=i[u];let f=0;if(t!==(d.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const p in d.attributes){if(!n.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+p+'" attribute exists among all geometries, or in none of them.'),null;s[p]===void 0&&(s[p]=[]),s[p].push(d.attributes[p]),f++}if(f!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(o!==d.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const p in d.morphAttributes){if(!r.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;a[p]===void 0&&(a[p]=[]),a[p].push(d.morphAttributes[p])}if(e){let p;if(t)p=d.index.count;else if(d.attributes.position!==void 0)p=d.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,p,u),l+=p}}if(t){let u=0;const d=[];for(let f=0;f<i.length;++f){const p=i[f].index;for(let v=0;v<p.count;++v)d.push(p.getX(v)+u);u+=i[f].attributes.position.count}c.setIndex(d)}for(const u in s){const d=Xc(s[u]);if(!d)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;c.setAttribute(u,d)}for(const u in a){const d=a[u][0].length;if(d===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[u]=[];for(let f=0;f<d;++f){const p=[];for(let M=0;M<a[u].length;++M)p.push(a[u][M][f]);const v=Xc(p);if(!v)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;c.morphAttributes[u].push(v)}}return c}function Xc(i){let e,t,n,r=-1,s=0;for(let l=0;l<i.length;++l){const u=i[l];if(e===void 0&&(e=u.array.constructor),e!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=u.itemSize),t!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=u.normalized),n!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(r===-1&&(r=u.gpuType),r!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;s+=u.count*t}const a=new e(s),o=new mn(a,t,n);let c=0;for(let l=0;l<i.length;++l){const u=i[l];if(u.isInterleavedBufferAttribute){const d=c/t;for(let f=0,p=u.count;f<p;f++)for(let v=0;v<t;v++){const M=u.getComponent(f,v);o.setComponent(f+d,v,M)}}else a.set(u.array,c);c+=u.count*t}return r!==void 0&&(o.gpuType=r),o}function Sr(i,e,t,n=.14){const r=Math.hypot(e.x-i.x,e.z-i.z),s=Math.max(1,Math.ceil(r/n));for(let a=0;a<=s;a++){const o=a/s;if(t(i.x+(e.x-i.x)*o,i.z+(e.z-i.z)*o))return!1}return!0}function qc(i,e,t,{step:n=.6,radius:r=1.7,bound:s=27}={}){if(![i.x,i.z,e.x,e.z].every(Number.isFinite)||t(i.x,i.z))return null;if(Math.hypot(i.x-e.x,i.z-e.z)<=r)return[];const a=Math.floor(s*2/n)+1,o=a*a,c=w=>({x:w%a*n-s,z:Math.floor(w/a)*n-s}),l=[],u=new Float64Array(o).fill(1/0),d=new Int32Array(o).fill(-1),f=new Uint8Array(o),p=new Int8Array(o);function v(w){if(w<0||w>=o)return!1;if(!p[w]){const S=c(w);p[w]=t(S.x,S.z)?-1:1}return p[w]>0}const M=w=>Math.max(0,Math.hypot(w.x-e.x,w.z-e.z)-r);function m(w,S){let g=l.length;for(l.push({id:w,priority:S});g>0;){const A=g-1>>1;if(l[A].priority<=S)break;[l[A],l[g]]=[l[g],l[A]],g=A}}function h(){const w=l[0],S=l.pop();if(l.length){l[0]=S;let g=0;for(;;){const A=g*2+1,I=A+1;let x=g;if(A<l.length&&l[A].priority<l[x].priority&&(x=A),I<l.length&&l[I].priority<l[x].priority&&(x=I),x===g)break;[l[g],l[x]]=[l[x],l[g]],g=x}}return w.id}const P=Math.round((i.x+s)/n),R=Math.round((i.z+s)/n);for(let w=-2;w<=2;w++)for(let S=-2;S<=2;S++){const g=P+S,A=R+w;if(g<0||A<0||g>=a||A>=a)continue;const I=A*a+g,x=c(I);v(I)&&Sr(i,x,t)&&(u[I]=Math.hypot(x.x-i.x,x.z-i.z),m(I,u[I]+M(x)))}for(;l.length;){const w=h();if(f[w])continue;f[w]=1;const S=c(w);if(Math.hypot(S.x-e.x,S.z-e.z)<=Math.max(r,n*.72)){const I=[];for(let F=w;F!==-1;F=d[F])I.push(c(F));I.reverse(),r<n&&Sr(I.at(-1),e,t)&&I.push({...e});const x=[];let _=i,T=0;for(;T<I.length;){let F=T;for(;F+1<I.length&&Sr(_,I[F+1],t);)F++;x.push(I[F]),_=I[F],T=F+1}return x}const g=w%a,A=Math.floor(w/a);for(let I=-1;I<=1;I++)for(let x=-1;x<=1;x++){if(!x&&!I)continue;const _=g+x,T=A+I;if(_<0||T<0||_>=a||T>=a)continue;const F=T*a+_;if(f[F]||!v(F)||x&&I&&(!v(A*a+_)||!v(T*a+g)))continue;const L=c(F);if(!Sr(S,L,t))continue;const V=u[w]+n*Math.hypot(x,I);V>=u[F]||(u[F]=V,d[F]=w,m(F,V+M(L)))}}return null}function Cm(i,{reduced:e=!1,onMove:t,onInteract:n,onCollect:r,onEnvironmentChange:s}){let a=7919;const o=()=>((a=a*16807%2147483647)-1)/2147483646,c=new yd;c.background=new ct("#1a2833"),c.fog=new Ao("#1a2833",.011);const l=new nn(46,innerWidth/innerHeight,.1,210),u=new Tm({antialias:!0,powerPreference:"high-performance"});u.setPixelRatio(Math.min(devicePixelRatio,innerWidth<600?1.15:1.5)),u.setSize(innerWidth,innerHeight),u.shadowMap.enabled=!0,u.shadowMap.type=rl,u.outputColorSpace=Jt,u.toneMapping=al,u.toneMappingExposure=1.25,u.domElement.setAttribute("aria-label","קמפוס בית הספר בתלת־ממד. זזים בחצים או במקשי WASD; אפשר ללחוץ על הקרקע."),i.appendChild(u.domElement),c.add(new Ld("#b3c5de","#374039",1.25));const d=new _c("#a4bdd5",2);d.position.set(-22,34,12),d.castShadow=!0,d.shadow.mapSize.set(innerWidth<600?1024:1536,innerWidth<600?1024:1536),Object.assign(d.shadow.camera,{left:-38,right:38,top:38,bottom:-38,near:.1,far:100}),d.shadow.bias=-6e-4,d.shadow.normalBias=.035,c.add(d);const f=new _c("#d7a270",.65);f.position.set(12,7,-40),c.add(f);const p=new Map;function v(E,U=!1){const D=`${E}/${U}`;return p.has(D)||p.set(D,new ii({color:E,roughness:.9,...U?{emissive:E,emissiveIntensity:1.15}:{}})),p.get(D)}function M(E){const U=document.createElement("canvas");U.width=U.height=256;const D=U.getContext("2d");D.fillStyle=E==="grass"?"#798073":E==="brick"?"#9b8a79":"#969a9b",D.fillRect(0,0,256,256);for(let $=0;$<11e3;$++){const me=Math.floor(o()*60),Te=o()*256,be=o()*256;D.fillStyle=`rgba(${me},${me},${me},${o()*.13})`,D.fillRect(Te,be,E==="grass"?1:2,E==="grass"?4:2)}if(E==="brick"){D.strokeStyle="#6b6f6b",D.lineWidth=2;for(let $=0;$<256;$+=32){D.beginPath(),D.moveTo(0,$),D.lineTo(256,$),D.stroke();for(let me=$%64?32:0;me<256;me+=64)D.beginPath(),D.moveTo(me,$),D.lineTo(me,$+32),D.stroke()}}const H=new aa(U);return H.colorSpace=Jt,H.wrapS=H.wrapT=hs,H.repeat.set(E==="grass"?26:3,E==="grass"?26:3),H.anisotropy=4,H}const m=new ii({color:"#667560",map:M("grass"),roughness:1}),h=new ii({color:"#a8aba5",map:M("concrete"),roughness:.95}),P=new ii({color:"#b0a698",map:M("brick"),roughness:1}),R=new ii({color:"#717677",map:M("concrete"),roughness:.95});function w(E,U,D,H,$,me=c,Te=!1){const be=typeof U=="string"?v(U,Te):U,Ee=new rn(E,be);return Ee.position.set(D,H,$),Ee.castShadow=!Te,Ee.receiveShadow=!Te,me.add(Ee),Ee}const S=(E,U,D,H,$,me,Te,be=c,Ee=!1)=>w(new dr(H,$,me),Te,E,U,D,be,Ee),g=(E,U,D,H,$,me=c,Te=1,be=!1)=>w(new gs(H,12,8),$,E,U,D,me,be),A=(E,U,D,H,$,me,Te=c,be=8)=>w(new Ro(H,$,be),me,E,U,D,Te),I=(E,U,D,H,$,me,Te=c,be=10)=>w(new Hn(H,H,$,be),me,E,U,D,Te);function x(E,U,D,H,$,me,Te,be=c){const Ee=g(E,U,D,1,Te,be);return Ee.scale.set(H,$,me),Ee}function _(E,U,D,H,$=c){const me=new G(...E),Te=new G(...U),be=Te.clone().sub(me),Ee=w(new Hn(D*.7,D,be.length(),7),H,...me.clone().add(Te).multiplyScalar(.5).toArray(),$);return Ee.quaternion.setFromUnitVectors(new G(0,1,0),be.normalize()),Ee}const T=[],F=(E,U,D)=>T.push({x:E,z:U,r:D});function L(E,U){return Math.abs(E)>27||Math.abs(U)>27||T.some(D=>!D.disabled&&(D.hx!==void 0?Math.abs(E-D.x)<D.hx+.28&&Math.abs(U-D.z)<D.hz+.28:D.r?Math.hypot(E-D.x,U-D.z)<D.r+.35:((E-D.x)/(D.rx+.3))**2+((U-D.z)/(D.rz+.3))**2<1))}function V(E,U,D,H,$,me=.03){const Te=w(new Hn(1,1,.045,48),$,E,me,U);return Te.scale.set(D,1,H),Te}const X=S(0,-.2,0,180,.3,180,m);X.castShadow=!1;for(let E=0;E<9;E++){const U=E/9*Math.PI*2,D=x(Math.cos(U)*72,3,Math.sin(U)*72,24,9+o()*9,20,"#273c3d");D.castShadow=!1}function K(E,U=2.3){for(let D=0;D<E.length-1;D++){const H=E[D],$=E[D+1],me=Math.hypot($[0]-H[0],$[1]-H[1]),Te=S((H[0]+$[0])/2,.015,(H[1]+$[1])/2,U,.055,me,R);Te.rotation.y=Math.atan2($[0]-H[0],$[1]-H[1]),V(H[0],H[1],U/2,U/2,R,.046)}}K([[0,25],[0,12],[-3,4],[0,-4],[0,-12]],3.1),K([[-3,4],[-10,1],[-13,-9],[-15,-17]],2.5),K([[0,-4],[8,-5],[13,-7],[20,-13]],2.5),K([[0,12],[10,14],[19,18]],2.5),K([[-13,-9],[-7,-15],[0,-16],[8,-17],[13,-7]],2.1),K([[0,-12],[7,-17],[7,-24],[0,-25]],2.2),V(0,9,4.6,3.8,h,.05),V(-17,13,7.1,5.5,"#4c5c52",.025);const se=new ii({color:"#214d5b",roughness:.18,metalness:.45});V(-17,13,6.7,5.2,se,.06),T.push({x:-17,z:13,rx:6.5,rz:5});for(let E=0;E<28;E++){const U=o()*Math.PI*2,D=-17+Math.cos(U)*7,H=13+Math.sin(U)*5.5;for(let $=0;$<3;$++)_([D+$*.1,0,H],[D+$*.1+.08,.5+o()*.5,H],.018,"#7a8464")}for(let E=0;E<7;E++){const U=E*.9;V(-17+Math.cos(U)*4.6,13+Math.sin(U)*3,.28,.23,"#71836b",.09)}const j=new ii({color:"#687b83",roughness:.22,metalness:.55}),ne=new ii({color:"#c7b38d",emissive:"#b38551",emissiveIntensity:.55,roughness:.35}),ee=[],fe={x:-2,z:-16.86,hx:1.34,hz:.09};function Ce(){const E=new Tt;E.position.set(-2,0,-20),c.add(E),S(0,4.9,0,12,3.2,6,P,E),S(0,6.65,0,12.6,.35,6.6,h,E),S(0,.03,0,12,.08,6,h,E),S(0,1.65,-2.85,12,3.3,.3,P,E);for(const U of[-1,1])S(U*5.85,1.65,0,.3,3.3,6,P,E),S(U*3.68,1.65,2.9,4.64,3.3,.2,P,E);S(0,1.2,-2.65,5,1.4,.04,"#526660",E),S(0,1.2,-2.6,2.2,.9,.04,"#d6cfb6",E),S(0,.2,3.5,13,.4,1.5,h,E),S(0,.08,4.15,6,.16,.7,h,E);for(const U of[-1,1]){const D=new Tt;D.position.set(U*1.34,0,3.14),E.add(D),S(-U*.67,1.65,0,1.32,3.3,.07,j,D),I(-U*1.13,1.5,.08,.025,.5,"#b5b9b6",D),ee.push(D)}S(0,3.7,3.8,3.4,.13,1.5,"#45555d",E);for(const U of[-4.75,-3.15,3.15,4.75])for(const D of[1.9,4.65])S(U,D,3.045,1.3,1.7,.12,"#34424a",E),S(U,D,3.115,1.12,1.5,.03,(U+D)%2>.9?ne:j,E),S(U,D,3.14,.04,1.55,.05,"#9a9e98",E),S(U,D+.02,3.14,1.16,.04,.05,"#9a9e98",E);for(const U of[-5.2,-1.7,1.7,5.2])S(U,3.25,3.11,.15,6.5,.15,"#c4c2b8",E);S(-3.9,7.05,-.8,2,.7,1.1,"#626e73",E);for(let U=0;U<7;U++)S(-4.7+U*.25,7.1,-.2,.05,.45,.05,"#34434b",E);I(4,8,-1,.06,2.7,"#7a868b",E),_([3.5,8.5,-1],[4.5,8.5,-1],.025,"#929a9b",E),T.push(fe,{x:-2,z:-22.85,hx:6,hz:.15},{x:-7.85,z:-20,hx:.15,hz:3},{x:3.85,z:-20,hx:.15,hz:3},{x:-5.68,z:-17.1,hx:2.32,hz:.1},{x:1.68,z:-17.1,hx:2.32,hz:.1})}Ce();function Oe(E,U,D=!1){const H=new Tt;if(H.position.set(E,0,U),c.add(H),S(0,1.9,0,5.5,3.8,4.4,D?"#445e60":P,H),S(0,3.95,0,5.8,.25,4.7,h,H),D){for(const $ of[-2,-.7,.7,2])S($,2,2.23,1.05,2.9,.08,j,H),S($,2,2.3,.06,3.6,.08,"#a2b2ab",H);for(const $ of[-1.5,0,1.5])S(-2.8,2,$,.08,2.9,1.1,j,H)}else S(-1.8,2.1,2.25,1.3,1.5,.08,ne,H),S(1.8,2.1,2.25,1.3,1.5,.08,j,H);return S(0,1.5,2.3,1.2,3,.1,"#293b42",H),S(0,1.6,2.37,.9,2.5,.05,j,H),S(0,.12,2.8,3,.24,1.1,h,H),F(E,U,3.45),H}Oe(-17,-12),Oe(18,-11,!0);const He=new Tt;He.position.set(16,0,16),c.add(He);for(const E of[-.85,.85])for(const U of[-.85,.85])_([E,0,U],[E*.6,8,U*.6],.085,"#737b7d",He);for(let E=0;E<8;E+=2)_([-.85,E,-.85],[.85,E+2,-.85],.04,"#646f73",He),_([-.85,E,.85],[.85,E+2,.85],.04,"#646f73",He),S(0,E,0,1.8,.08,1.8,"#566269",He);S(0,8.2,0,2.8,.2,2.8,"#59666b",He),I(0,9.5,0,.045,2.6,"#9aa9ad",He),S(0,10.4,0,1.7,.05,.05,"#9aa9ad",He);const ut=w(new gs(.65,16,10,0,Math.PI*2,0,Math.PI/2),"#819398",.85,7.8,.9,He);ut.rotation.x=-Math.PI/2,F(16,16,1.7);function te(E,U){const D=Math.hypot(U[0]-E[0],U[1]-E[1]),H=Math.ceil(D/2.5);for(let $=0;$<=H;$++){const me=$/H;S(E[0]+(U[0]-E[0])*me,1.05,E[1]+(U[1]-E[1])*me,.07,2.1,.07,"#48585e")}for(const $ of[.5,1.4,2.05])_([E[0],$,E[1]],[U[0],$,U[1]],.018,"#738184")}te([-27,-27],[-3,-27]),te([3,-27],[27,-27]),te([-27,-27],[-27,27]),te([27,-27],[27,27]),te([-27,27],[27,27]),S(-2.5,2.4,-25,.38,4.8,.5,h),S(2.5,2.4,-25,.38,4.8,.5,h),S(0,4.8,-25,5.4,.3,.6,"#5b686c");const oe=new Tt;c.add(oe);const we=[-1,1].map(E=>{const U=new Tt;U.position.set(E*2.2,0,-25),oe.add(U);for(let D=0;D<7;D++)S(-E*D*.32,1.9,0,.045,3.8,.08,"#66757a",U);for(const D of[.7,2.7,3.8])S(-E*1,D,0,2.15,.06,.08,"#66757a",U);return U}),Ye=[-1.15,0,1.15].map(E=>S(E,4.8,-24.65,.28,.13,.06,"#b66c4f",c,!0)),De=new la("#accca0",0,8,2);De.position.set(0,3.5,-25),c.add(De);function Je(E,U,D,H="#d9b574"){const $=document.createElement("canvas");$.width=$.height=64;const me=$.getContext("2d"),Te=me.createRadialGradient(32,32,1,32,32,32);Te.addColorStop(0,"rgba(244,211,153,.24)"),Te.addColorStop(1,"rgba(244,211,153,0)"),me.fillStyle=Te,me.fillRect(0,0,64,64);const be=new rn(new sr(D,D),new $i({map:new aa($),transparent:!0,depthWrite:!1,color:H}));return be.rotation.x=-Math.PI/2,be.position.set(E,.11,U),c.add(be),be}function Ct(E,U){I(E,1.9,U,.045,3.8,"#43525b"),S(E,3.75,U+.24,.15,.13,.65,"#b8b6a3",c);const D=S(E,3.68,U+.35,.11,.025,.4,"#d6b884",c,!0),H=Je(E,U+1.1,4.8);return{bulb:D,pool:H}}const Qe=Ct(-2,10);[[2,-4],[-12,-7],[12,-5],[10,12],[-5,-13],[6,-22],[2,-25],[-8,2],[18,4]].forEach(E=>Ct(...E));const _t=new la("#e5b777",12,14,2);_t.position.set(-2,3.8,-15.5),c.add(_t);function N(E,U,D=0){const H=new Tt;H.position.set(E,0,U),H.rotation.y=D,c.add(H);for(let $=0;$<4;$++)S(0,.56,-.33+$*.22,2.5,.06,.17,"#837864",H);for(let $=0;$<3;$++)S(0,.95+$*.17,-.48,2.5,.12,.06,"#837864",H);for(const $ of[-.9,.9])S($,.27,0,.07,.54,.73,"#3d4a51",H),S($,.98,-.48,.06,.84,.06,"#3d4a51",H);F(E,U,1.15)}N(8,15),N(-10,-8,Math.PI/2),N(-6,10),S(11,.015,22,11,.05,7,"#606f6c");for(const E of[5.6,16.4])S(E,.06,22,.04,.01,6.7,"#b8b9ad");for(const E of[18.7,25.3])S(11,.06,E,10.8,.01,.04,"#b8b9ad");const nt=w(new Cn(1.75,1.78,48),"#b8b9ad",11,.07,22);nt.rotation.x=-Math.PI/2,I(16.3,1.65,22,.07,3.3,"#6e7b7d"),S(15.95,3.1,22,.08,1.05,1.6,"#9da9a5"),S(15.89,3.05,22,.02,.5,.75,"#c1c6b5");const it=w(new Ji(.27,.025,5,18),"#a87957",15.58,2.83,22);it.rotation.x=Math.PI/2,F(16.3,22,.25);for(let E=0;E<3;E++){const U=-20.5+E*.5,D=w(new Ji(.35,.035,5,12,Math.PI),"#7e898a",U,.35,-8.5);D.rotation.y=Math.PI/2}for(const E of[-22,-21]){const U=w(new Ji(.31,.035,5,18),"#26353d",E,.35,-8.5);U.rotation.y=Math.PI/2}_([-22,.35,-8.5],[-21.5,.9,-8.5],.025,"#93624d"),_([-21,.35,-8.5],[-21.5,.9,-8.5],.025,"#93624d"),_([-22,.35,-8.5],[-21,.35,-8.5],.025,"#93624d");function ft(E,U,D=1){const H=new Tt;H.position.set(E,0,U),H.scale.setScalar(D),c.add(H);const $=(o()-.5)*.6;_([0,0,0],[$,4.6,0],.19,"#665f51",H);for(let me=0;me<4;me++){const Te=me*Math.PI*.5+o()*.5,be=Math.cos(Te)*(1+o()*.5),Ee=Math.sin(Te)*(1+o()*.5),Mt=3.5+o()*2;_([$*.6,2.4+me*.4,0],[be,Mt,Ee],.075,"#605c4e",H);const Ft=x(be,Mt+.7,Ee,1.4+o()*.6,1.5+o()*.6,1.3+o()*.6,["#344a3e","#405947","#465b49","#51634c"][me],H);Ft.rotation.z=(o()-.5)*.8}F(E,U,.45*D)}for(let E=0;E<56;E++){const U=E%4,D=-29+Math.floor(E/4)*4.1,H=o()*2;ft(U<2?D:(U===2?-29:29)+H,U<2?(U===0?-29:29)+H:D,.75+o()*.45)}[[-23,-8],[-24,-3],[-22,1],[-20,-3],[-8,20],[-5,23],[6,26],[21,5],[24,1],[21,-2],[8,-13],[-7,-5],[-9,-18],[22,22],[-24,22],[-9,16]].forEach(([E,U])=>ft(E,U,.65+o()*.4));for(let E=0;E<120;E++){const U=(o()-.5)*54,D=(o()-.5)*54;if(!(Math.abs(U)<4||T.some(H=>Math.hypot(U-H.x,D-H.z)<(H.r||7)+.8)))if(E%5===0){const H=x(U,.2,D,.45+o()*.3,.25,.4,"#737b72");H.rotation.y=o()*6}else for(let H=0;H<3;H++)_([U+H*.1,0,D],[U+H*.1+.08,.25+o()*.25,D+.06],.012,"#6c7c5d")}function Ae(E,U,D,H,$,me=""){const Te=document.createElement("canvas");Te.width=1024,Te.height=256;const be=Te.getContext("2d");be.fillStyle="#243139",be.fillRect(0,0,1024,256),be.strokeStyle="#a5a894",be.lineWidth=4,be.strokeRect(12,12,1e3,232),be.textAlign="center",be.direction="rtl",be.fillStyle="#e1dfd1",be.font="bold 62px Arial",be.fillText($,512,me?108:150),me&&(be.font="34px Arial",be.fillStyle="#bfc6bb",be.fillText(me,512,190));const Ee=new aa(Te);Ee.colorSpace=Jt,Ee.anisotropy=4;const Mt=new rn(new sr(H,H/4),new $i({map:Ee,side:vn}));return Mt.position.set(E,U,D),c.add(Mt),Mt}Ae(-2,5.75,-16.75,10,"בית הספר שי עגנון","כיתה ז׳ איינשטיין · כיתת הייטק"),Ae(-17,3.55,-9.65,4.4,"01 · ספריית איינשטיין"),Ae(18,3.55,-8.65,4.4,"02 · מעבדת ההייטק"),Ae(16,3.2,17.1,3.2,"03 · תחנת הקשר"),Ae(0,5.55,-24.8,4.8,"יציאה"),S(-4,1.1,5,.07,2.2,.07,"#64716d"),Ae(-4,2.1,5.1,3.5,"קמפוס שי עגנון","ז׳ איינשטיין · כיתת הייטק"),g(-38,30,-57,1.7,"#bbcbd3",c,3,!0);const St=[];for(let E=0;E<85;E++){const U=o()*Math.PI*2,D=65+o()*35;St.push(Math.cos(U)*D,25+o()*40,Math.sin(U)*D)}const Ue=new jt;Ue.setAttribute("position",new At(St,3)),c.add(new Rd(Ue,new Tl({color:"#bbcad6",size:.08,transparent:!0,opacity:.65})));const $e=new Map;function C(E,U,D){const H=new Tt;return H.position.set(U,0,D),c.add(H),S(0,.45,0,.85,.9,.6,"#4b575a",H),S(0,.95,0,1.05,.1,.8,"#7c8580",H),$e.set(E,H),H}const b=C("card",-21,-3);S(0,1.05,0,.48,.035,.3,"#c7c8b8",b),S(-.11,1.073,0,.12,.005,.18,"#507c86",b);for(let E=0;E<3;E++)S(.08,1.073,-.07+E*.065,.17,.005,.015,"#606765",b);const W=C("fuse",21,3),re=I(0,1.09,0,.07,.45,"#d6ccac",W);re.rotation.z=Math.PI/2;for(const E of[-.21,.21]){const U=I(E,1.09,0,.075,.07,"#a6b0b2",W);U.rotation.z=Math.PI/2}const ae=C("antenna",-8,22);S(0,1.12,0,.35,.25,.22,"#2e3e48",ae),_([0,1.25,0],[.24,2.05,.02],.018,"#bbc5c1",ae),S(0,1.14,.12,.19,.1,.025,"#718576",ae);const Z=tt.map((E,U)=>{const D=new Tt;D.position.set(E.x+1.2,0,E.z-.9),c.add(D),S(0,.65,0,.7,1.3,.45,"#4a585d",D);const H=S(0,1.05,.24,.48,.34,.025,"#a4784e",D,!0);S(0,.67,.25,.45,.06,.05,"#7b8988",D);const $=new la("#e3ae72",0,7,2);return $.position.set(E.x,2.5,E.z),c.add($),{g:D,screen:H,light:$}}),Pe=Am({scene:c,box:S,ball:g,cyl:I,mesh:w,segment:_,mat:v,sign:Ae,softPool:Je,doorLeaves:ee,doorBlocker:fe,lampFixture:Qe});c.updateMatrixWorld(!0);const ve=new Set([oe,...Ye,...$e.values(),...Z.map(E=>E.g),...Pe.dynamic]),Fe=new Map,Le=[];c.traverse(E=>{if(!E.isMesh)return;let U=E;for(;U;){if(ve.has(U))return;U=U.parent}if(E.material.transparent)return;const D=Fe.get(E.material)||[];D.push(E.geometry.clone().applyMatrix4(E.matrixWorld)),Fe.set(E.material,D),Le.push(E)});for(const[E,U]of Fe){const D=Rm(U);if(!D)continue;const H=new rn(D,E);H.castShadow=!E.isMeshBasicMaterial&&!(E.emissiveIntensity>1),H.receiveShadow=!0,c.add(H);for(const $ of U)$.dispose()}for(const E of Le)E.removeFromParent(),E.geometry.dispose();function le(E="#a26e4e",U="#c7a78b",D="#313236",H=!0){const $=new Tt,me=[],Te=[];for(const be of[-1,1]){const Ee=new Tt;Ee.position.set(be*.13,.91,0),$.add(Ee),w(new Yi(.1,.59,4,8),"#3e4b55",0,-.36,0,Ee),x(0,-.83,.09,.115,.08,.23,"#27343a",Ee),me.push(Ee)}w(new Yi(.235,.4,4,10),E,0,1.22,0,$).scale.z=.7,x(0,1.48,-.08,.24,.16,.18,E,$),I(0,1.57,0,.075,.15,U,$),x(0,1.77,.015,.17,.215,.16,U,$),x(0,1.89,-.035,.177,.12,.17,D,$),x(0,1.82,-.12,.17,.16,.06,D,$);for(const be of[-.065,.065])g(be,1.79,.169,.015,"#343833",$);x(0,1.73,.18,.025,.035,.045,U,$);for(const be of[-1,1]){const Ee=new Tt;Ee.position.set(be*.27,1.47,0),$.add(Ee),w(new Yi(.075,.36,4,8),E,0,-.21,0,Ee),x(0,-.49,0,.07,.1,.065,U,Ee),Ee.rotation.z=be*.09,Te.push(Ee)}if(H){const be=w(new Yi(.19,.26,4,8),"#33434a",0,1.2,-.24,$);be.scale.z=.55;for(const Ee of[-1,1])S(Ee*.14,1.31,.16,.04,.43,.025,"#c0b69b",$);S(0,1.2,-.37,.21,.1,.035,"#8b9b91",$)}return $.userData={legs:me,arms:Te},$}const J=le();J.position.set(0,0,9),c.add(J);const We=w(new Hn(.035,.045,.18,8),"#303c42",.3,.92,.13,J);We.rotation.x=Math.PI/2,g(.3,.92,.23,.03,"#e6d4a5",J,1,!0);const ze=new Rt;ze.position.set(.3,.1,6),J.add(ze);const ye=new Id("#f0dab1",18,13,.36,.65,1.6);ye.position.set(.3,.95,.24),ye.target=ze,J.add(ye);const Xe=w(new Cn(.43,.46,40),"#b9c2b3",0,.1,9,c,!0);Xe.rotation.x=-Math.PI/2;function O(E="#9f704e",U=!1){const D=new Tt,H=[];x(0,.48,0,.21,.26,.56,E,D),x(0,.67,.43,.22,.24,.24,E,D);const $=A(0,.61,.7,.115,.35,"#c7c3ac",D,10);$.rotation.x=Math.PI/2,g(0,.61,.88,.04,"#293533",D);for(const Te of[-.13,.13])A(Te,.99,.42,.1,.3,E,D,4),A(Te,.99,.45,.055,.18,"#62564c",D,4),g(Te,.73,.59,.022,"#252d2d",D);for(const Te of[-.14,.14])for(const be of[-.31,.32]){const Ee=new Tt;Ee.position.set(Te,.45,be),D.add(Ee),I(0,-.19,0,.045,.4,"#514c44",Ee,7),x(0,-.39,.03,.05,.04,.1,"#353c39",Ee),H.push(Ee)}const me=x(0,.56,-.76,.16,.17,.49,E,D);return me.rotation.x=-.4,x(0,.72,-1.1,.13,.13,.2,"#c6c4ae",D),D.userData={legs:H},U&&D.scale.setScalar(.85),D}function _e(E,U){const D=new Tt;if(E==="rabbit"){x(0,.24,0,.19,.22,.32,U,D),x(0,.43,.24,.15,.17,.16,U,D);for(const H of[-.075,.075]){const $=x(H,.71,.2,.04,.21,.045,U,D);$.rotation.z=H>0?-.15:.15,g(H,.47,.37,.014,"#263330",D)}x(0,.16,-.28,.085,.09,.08,"#bcbdb0",D);for(const H of[-.15,.15])x(H,.07,.13,.08,.06,.16,U,D)}else{x(0,.32,0,.18,.23,.3,U,D),x(0,.59,.18,.13,.14,.13,U,D);const H=A(0,.57,.37,.035,.15,"#ad9367",D,8);H.rotation.x=Math.PI/2;for(const $ of[-.09,.09])g($,.62,.28,.012,"#222e30",D);for(const $ of[-.075,.075])I($,.08,.04,.016,.16,"#887c62",D,6);x(-.16,.34,-.02,.04,.17,.25,"#58676b",D),x(.16,.34,-.02,.04,.17,.25,"#58676b",D)}return D}const pe=tt.map((E,U)=>{const D=le(["#65747c","#6c7357","#7c5350"][U],["#b5947b","#c7a88a","#af8c72"][U],["#353231","#3c332c","#292e31"][U],U!==1);D.position.set(E.x,0,E.z),D.rotation.y=.3-U*.45,c.add(D);const H=w(new Cn(.65,.68,36),E.color,E.x,.1,E.z,c,!0);H.rotation.x=-Math.PI/2;const $=g(E.x,2.35,E.z,.065,"#c1b995",c,1,!0);return{g:D,marker:$,ring:H}}),he=[];for(let E=0;E<16;E++){const U=E%3===0?"fox":E%3===1?"rabbit":"bird",D=U==="fox"?O("#947553",!0):_e(U,U==="rabbit"?"#9d9d8c":"#7d8a8b");let H=(o()-.5)*43,$=(o()-.5)*43;for(let me=0;me<80&&L(H,$);me++)H=(o()-.5)*43,$=(o()-.5)*43;D.position.set(H,0,$),c.add(D),he.push({g:D,type:U,angle:o()*Math.PI*2,speed:.3+o()*.55,turn:o()*4})}for(let E=0;E<3;E++){const U=_e("duck","#8f947b");U.scale.setScalar(1.05),c.add(U),he.push({g:U,type:"duck",angle:E*2,speed:.3,turn:0})}const ue=Array.from({length:12},(E,U)=>{const D=[[-4,12],[-8,4],[-14,-3],[-9,-12],[4,-10],[10,-2],[18,2],[19,11],[9,21],[-7,20],[-23,-1],[5,-23]],[H,$]=D[U];return{x:H,z:$,mesh:g(H,1.1,$,.055,"#c9c693",c,1,!0)}}),ie=w(new Cn(.26,.3,24),"#c1c9b4",0,.12,0,c,!0);ie.rotation.x=-Math.PI/2,ie.visible=!1;const xe=new Set;let ke={x:0,z:0},st=null,et=!1,It=!1,Gt=0,Fn=0,Ut=0,Ri=!1,Pt=Ir(),Kt=!1,Ci=!1;const Ve={goal:null,endpoint:null,route:[],following:!1,arrived:!1,blocked:!1,anchor:null,lastPlan:-10};let Ht=[],en=null,hi=-1;const An=new Ed(new Cn(.09,.16,8),new $i({color:"#efd09b",transparent:!0,opacity:.82,depthWrite:!1,side:vn}),160);An.count=0,An.frustumCulled=!1,c.add(An);const wn=new Tt;c.add(wn),wn.visible=!1;const Ps=w(new Cn(.56,.63,32),"#e4be7d",0,.16,0,wn,!0);Ps.rotation.x=-Math.PI/2;const Ls=A(0,2.8,0,.22,.5,"#e4be7d",wn,4);Ls.rotation.z=Math.PI,w(new Hn(.025,.025,2.3,6),new $i({color:"#e4be7d",transparent:!0,opacity:.3,depthWrite:!1}),0,1.4,0,wn);const Fr=new gt,Ds=new cr().setFromEuler(new Sn(-Math.PI/2,0,0)),Is=new G(1,1,1);function Pi(){if(An.count=0,wn.visible=et&&!!Ve.goal,!et||!Ve.goal)return;const E=Ve.endpoint||Ve.goal;wn.position.set(E.x,0,E.z);let U={x:J.position.x,z:J.position.z},D=0;for(const H of Ve.route){const $=Math.hypot(H.x-U.x,H.z-U.z),me=Math.ceil($/.75);for(let Te=1;Te<=me&&D<160;Te++){const be=Te/me;Fr.compose(new G(U.x+(H.x-U.x)*be,.15,U.z+(H.z-U.z)*be),Ds,Is),An.setMatrixAt(D++,Fr)}U=H}An.count=D,An.instanceMatrix.needsUpdate=!0,hi=Ut}function y(){if(!Ve.goal)return;const E={x:J.position.x,z:J.position.z},U=qc(E,Ve.goal,L);Ve.route=U||[],Ve.endpoint=U===null?null:U.at(-1)||E,Ve.blocked=U===null,Ve.arrived=U!==null&&U.length===0,Ve.anchor=E,Ve.lastPlan=Ut,Ve.following&&(Ht=[...Ve.route],en=Ve.blocked||Ve.arrived?null:"guide",en||(Ve.following=!1)),Pi()}function B(E,U){return!Number.isFinite(E)||!Number.isFinite(U)||Math.abs(E)>27||Math.abs(U)>27?!1:(Ve.goal={x:E,z:U},Ve.following=!1,Ht=[],en=null,st=null,y(),!Ve.blocked)}function q(){Ve.following=!1,Ht=[],en=null,st=null,ie.visible=!1}function Y(){return!et||It||!Ve.goal||(Se(),Kt=!1,y(),Ve.blocked||Ve.arrived)?!1:(Ve.following=!0,en="guide",Ht=[...Ve.route],xe.clear(),ke={x:0,z:0},!0)}function k(){let E=0,U=J.position;for(const D of Ve.route)E+=Math.hypot(D.x-U.x,D.z-U.z),U=D;return{following:Ve.following,arrived:Ve.arrived,blocked:Ve.blocked,goal:Ve.goal&&{...Ve.goal},remaining:+E.toFixed(1),route:Ve.route.map(D=>({...D})),endpoint:Ve.endpoint&&{...Ve.endpoint}}}function de(E){Se(),Kt=!1,q();const U=qc({x:J.position.x,z:J.position.z},E,L,{radius:.1});U!=null&&U.length&&(Ht=U,en="click",ie.position.set(U.at(-1).x,.12,U.at(-1).z),ie.visible=!0)}const ge=new G;function Re(){et&&!It&&Fn===0&&(Se(),Kt=!1,q(),Gt=5.8)}function Se(){Pt.seated&&(Pt.seated=!1,J.position.set(-6,0,11.8),s==null||s({seated:!1}))}function Ge(E,U){Pt=E,Pe.sync(E,U),E.seated?(J.position.set(-6,-.35,10.1),J.rotation.y=0,Ci=!0):Ci&&(J.position.set(-6,0,11.8),Ci=!1),pe.forEach((D,H)=>{const $=E.helped.includes(tt[H].id);D.g.userData.arms[0].rotation.x=$?-1.1:0,D.g.userData.arms[1].rotation.x=$?-.45:0,D.ring.material=v($?"#bbd0ab":tt[H].color,!0)})}function qe(E){et=E,q(),xe.clear(),Kt=!1,Pi()}function Ie(E){It=E,xe.clear(),ke={x:0,z:0},st=null,ie.visible=!1}function rt(){xe.clear(),ke={x:0,z:0},q()}window.addEventListener("blur",rt),window.addEventListener("keydown",E=>{!et||It||E.target.matches("input,select,textarea")||(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Space","KeyW","KeyA","KeyS","KeyD"].includes(E.code)&&E.preventDefault(),xe.add(E.code),E.code==="Space"&&Re(),E.code==="KeyE"&&!E.repeat&&n())}),window.addEventListener("keyup",E=>xe.delete(E.code));const ht=new Od,Et=new ri(new G(0,1,0),0);let vt=null;u.domElement.addEventListener("pointerdown",E=>{vt={x:E.clientX,y:E.clientY}}),u.domElement.addEventListener("pointerup",E=>{if(!et||It||!vt||Math.hypot(E.clientX-vt.x,E.clientY-vt.y)>10)return;ht.setFromCamera(new lt(E.clientX/innerWidth*2-1,1-E.clientY/innerHeight*2),l);const U=new G;ht.ray.intersectPlane(Et,U)&&Math.abs(U.x)<27&&Math.abs(U.z)<27&&de({x:U.x,z:U.z})});const pt=new G(11.5,12.5,15.55);function Ne(E,U=!0){if(It||(Ut+=E),et&&!It){let D=(xe.has("KeyD")||xe.has("ArrowRight")?1:0)-(xe.has("KeyA")||xe.has("ArrowLeft")?1:0)+ke.x,H=(xe.has("KeyS")||xe.has("ArrowDown")?1:0)-(xe.has("KeyW")||xe.has("ArrowUp")?1:0)+ke.z,$=D*.806+H*.592,me=-D*.592+H*.806;if(D||H)Se(),Kt=!1,q();else if(en){for(;Ht.length&&Math.hypot(Ht[0].x-J.position.x,Ht[0].z-J.position.z)<.1;)Ht.shift(),en==="guide"&&Ve.route.shift();Ht.length?(st=Ht[0],$=st.x-J.position.x,me=st.z-J.position.z):(en==="guide"&&(Ve.arrived=!0,Ve.following=!1),en=null,st=null,ie.visible=!1,$=me=0,Pi())}st&&(Se(),Kt=!1);const Te=Math.hypot($,me),be=Te>.05&&!Pt.seated&&!Kt;if(be){const Ee=xe.has("ShiftLeft")||xe.has("ShiftRight")?7.2:4.5,Mt=st?Math.min(Te,E*Ee):E*Ee,Ft=J.position.x+$/Te*Mt,Nr=J.position.z+me/Te*Mt;if(st)if(Sr(J.position,{x:Ft,z:Nr},L))J.position.x=Ft,J.position.z=Nr;else{const Zl=en==="guide";q(),Zl&&(Ve.blocked=!0,Ve.lastPlan=Ut)}else L(Ft,J.position.z)||(J.position.x=Ft),L(J.position.x,Nr)||(J.position.z=Nr);J.rotation.y=Math.atan2($,me)}Ve.goal&&!Ve.following&&Ut-Ve.lastPlan>=1&&(!Ve.anchor||Math.hypot(J.position.x-Ve.anchor.x,J.position.z-Ve.anchor.z)>1.1||Ve.blocked)&&y(),Ut-hi>.3&&Pi(),(Fn>0||Gt>0)&&(Gt-=14*E,Fn=Math.max(0,Fn+Gt*E),Fn===0&&(Gt=0)),J.position.y=Pt.seated?-.35:Fn+(!e&&be?Math.sin(Ut*14)*.025:0),J.userData.legs.forEach((Ee,Mt)=>Ee.rotation.x=Pt.seated?-1.3:!e&&be?Math.sin(Ut*10+Mt*Math.PI)*.5:0),J.userData.arms.forEach((Ee,Mt)=>Ee.rotation.x=Pt.seated?-.35:!e&&be?Math.sin(Ut*10+Mt*Math.PI+Math.PI)*.3:0),Xe.position.set(J.position.x,.1,J.position.z);for(let Ee=0;Ee<ue.length;Ee++){const Mt=ue[Ee];Mt.mesh.visible&&Math.hypot(J.position.x-Mt.x,J.position.z-Mt.z)<.95&&(Mt.mesh.visible=!1,r(Ee))}t(J.position.x,J.position.z,E)}if(It||(Pe.update(E,e),he.forEach((D,H)=>{if(D.type==="duck"){D.g.position.set(-17+Math.cos(Ut*.13+H*2)*3,.08,13+Math.sin(Ut*.13+H*2)*2),D.g.rotation.y=-(Ut*.13+H*2);return}const $=Pt.following===H,me=$?J.position:Pt.waterFilled&&H===1?{x:-8.5,z:8}:null;let Te=D.speed;if(me){const Mt=me.x-D.g.position.x,Ft=me.z-D.g.position.z;D.angle=Math.atan2(Mt,Ft),Te=Math.hypot(Mt,Ft)>($?1.7:.6)?$?3.2:1:0}else D.turn-=E,D.turn<=0&&(D.angle+=(o()-.5)*2.4,D.turn=2+o()*4);const be=D.g.position.x+Math.sin(D.angle)*E*Te,Ee=D.g.position.z+Math.cos(D.angle)*E*Te;L(be,Ee)?D.angle+=Math.PI*.7:(D.g.position.x=be,D.g.position.z=Ee),D.g.rotation.y=D.angle,!e&&D.g.userData.legs&&D.g.userData.legs.forEach((Mt,Ft)=>Mt.rotation.x=Math.sin(Ut*7+Ft%2*Math.PI)*.35),e||(D.g.position.y=D.type==="rabbit"?Math.abs(Math.sin(Ut*4+H))*.07:Math.abs(Math.sin(Ut*5+H))*.015)}),e||ue.forEach((D,H)=>{D.mesh.position.y=1.1+Math.sin(Ut*1.3+H)*.12})),et&&Kt)ge.set(-17,.6,13),l.position.set(-9,3.7,18.5),l.lookAt(ge);else if(et){const D=new G(J.position.x,1,J.position.z);ge.lerp(D,e?1:1-Math.exp(-E*5));const H=pt.clone().multiplyScalar(innerWidth<600?1.2:1);l.position.copy(ge).add(H),l.lookAt(ge)}else{const D=innerWidth<600;ge.set(D?0:7,1,D?-7:-2),l.position.set(D?35:38,D?25:27,D?39:38),l.lookAt(ge)}U&&u.render(c,l)}let bt=performance.now();function at(E){const U=Math.min((E-bt)/1e3,.05);bt=E,Ri||Ne(U),requestAnimationFrame(at)}return requestAnimationFrame(at),window.addEventListener("resize",()=>{l.aspect=innerWidth/innerHeight,l.updateProjectionMatrix(),u.setSize(innerWidth,innerHeight)}),u.domElement.addEventListener("webglcontextlost",E=>{E.preventDefault(),Ie(!0),i.dispatchEvent(new CustomEvent("worldlost"))}),Ne(0),{setActive:qe,setPaused:Ie,jump:Re,guideTo:B,followGuide:Y,stopGuide:q,guidance:k,setJoystick(E,U){ke={x:E,z:U},(E||U)&&q()},setPlayer(E,U){Pt.seated&&Se(),Kt=!1,q(),J.position.set(E,0,U),ge.set(E,1,U),Ve.goal&&y()},getPlayer:()=>({x:J.position.x,z:J.position.z,y:Fn}),animals:()=>he.map((E,U)=>({id:U,type:E.type,x:+E.g.position.x.toFixed(1),z:+E.g.position.z.toFixed(1),following:Pt.following===U,observed:Pt.animalNotes.includes(U)})),setEnvironment:Ge,observe(E){Kt=E,q(),xe.clear(),ke={x:0,z:0}},isObserving:()=>Kt,environmentAnimation:()=>Pe.animation,performance:()=>({drawCalls:u.info.render.calls,triangles:u.info.render.triangles,pixelRatio:u.getPixelRatio()}),project(E,U,D){const H=new G(E,U,D).project(l);return{x:(H.x+1)/2*innerWidth,y:(1-H.y)/2*innerHeight,visible:H.z<1&&Math.abs(H.x)<1&&Math.abs(H.y)<1}},setProgress(E){ue.forEach((U,D)=>U.mesh.visible=!E.collected.includes(D)),pe.forEach((U,D)=>U.marker.visible=!E.seals.includes(tt[D].id));for(const[U,D]of $e)D.visible=!(E.items||[]).includes(U);Z.forEach((U,D)=>{const H=E.seals.includes(tt[D].id);U.screen.material=v(H?"#91aa8b":"#a4784e",!0),U.light.intensity=H?12:0}),Ye.forEach((U,D)=>U.material=v(E.seals.length>D?"#a7c1a0":"#9f684f",!0)),we.forEach((U,D)=>U.rotation.y=E.seals.length===3?D===0?-1.35:1.35:0),De.intensity=E.seals.length===3?10:0},advanceTime(E){Ri=!0;for(let U=0;U<Math.min(E,6e4);U+=1e3/60)Ne(1/60,!1);u.render(c,l)},resumeRealtime(){Ri=!1,bt=performance.now()},blocked:L,dispose(){u.dispose()}}}const Q=i=>document.getElementById(i),Be=i=>String(i??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),Pm=matchMedia("(prefers-reduced-motion: reduce)").matches,Ti={get(i){try{return localStorage.getItem(i)}catch{return null}},set(i,e){try{return localStorage.setItem(i,e),!0}catch{return!1}}},Po="prepx-afterbell-draft-v1",Lo="prepx-afterbell-pending-v1";function Do(){try{const i=JSON.parse(Ti.get(Lo)||"[]");return Array.isArray(i)?i:[]}catch{return[]}}function Lm(i){const e=Do().filter(t=>t.id!==i.id);return e.push(i),Ti.set(Lo,JSON.stringify(e))}async function Ul(i){try{const e=await fetch("/api/afterbell/attempts",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i),signal:AbortSignal.timeout(6e3)});return!e.ok||(await e.json()).saved!==!0?!1:(Ti.set(Lo,JSON.stringify(Do().filter(n=>n.id!==i.id))),!0)}catch{return!1}}async function Fl(){for(const i of Do())await Ul(i)&&yt==="complete"&&(z==null?void 0:z.attemptId)===i.id&&Q("save-status")&&(Q("save-status").textContent="✓ התוצאה נשמרה בהיסטוריית המשחק.")}window.addEventListener("online",Fl);let Bt=null,yi="",ma=0,Nl=0,ln=null,$t=0,Ai=null,_s="",co=!1,Ol=!1,Qt=Ts.quizzes[0],z=null,yt="menu",Wn=null,lo="snapshot",yn=null,$c=null,Xn=null,qi=!1,Rn=null,ce=null,xa=0,uo=null,ds=null,Yc=0;const di=Q("dialog"),Pr=Q("quiz");Pr.innerHTML=Ts.quizzes.map(i=>`<option value="${i.id}">${Be(i.title)}</option>`).join("");const jc=new URLSearchParams(location.search).get("quiz");Ts.quizzes.some(i=>i.id===jc)&&(Pr.value=jc);Q("player-name").value=Ti.get("prepx-afterbell-name")||"";function an(i){Q("toast").textContent=i,Q("toast").classList.add("visible"),clearTimeout($c),$c=setTimeout(()=>Q("toast").classList.remove("visible"),3300)}function hn(i=!0){if(qi)try{Rn??(Rn=new AudioContext),Rn.resume();const e=Rn.createOscillator(),t=Rn.createGain();e.connect(t),t.connect(Rn.destination),e.type="sine",e.frequency.setValueAtTime(i?520:270,Rn.currentTime),e.frequency.exponentialRampToValueAtTime(i?780:220,Rn.currentTime+.12),t.gain.setValueAtTime(.035,Rn.currentTime),t.gain.exponentialRampToValueAtTime(.001,Rn.currentTime+.25),e.start(),e.stop(Rn.currentTime+.26)}catch{}}function En(){if(z)try{sessionStorage.setItem(Po,JSON.stringify(z)),co=!0}catch{co=!1}}function zl(){try{return sessionStorage.getItem(Po)}catch{return null}}function Kc(){try{sessionStorage.removeItem(Po)}catch{}}function Bl(){const i=tl(zl(),Qt);Q("resume").classList.toggle("hidden",!i)}async function kl(){const i=++Yc,e=Pr.value;Q("start").disabled=!0,Q("resume").disabled=!0,Q("source-status").textContent="מתחברים לשאלות של PrepX…";let t=Ts.quizzes.find(r=>r.id===e),n="snapshot";try{const r=await fetch(`/api/afterbell/quizzes/${e}`,{signal:AbortSignal.timeout(3500)});if(r.ok){const s=await r.json();s.id===e&&Qc(s)&&(t=s,n="database")}}catch{}i===Yc&&(Qt=t,lo=n,Q("source-status").textContent=lo==="database"?`● ${Qt.questions.length} שאלות מחוברות למאגר PrepX`:`מצב לא מקוון · ${Qt.questions.length} שאלות מעותק מאגר PrepX`,Q("start").disabled=!ce,Q("resume").disabled=!ce,Bl())}Pr.addEventListener("change",()=>{const i=new URL(location.href);i.searchParams.set("quiz",Pr.value),history.replaceState(null,"",i),kl()});function Dt(){clearTimeout(yn),yn=null,Xn=null,di.open&&di.close(),yt!=="menu"&&yt!=="complete"&&(yt="explore",Wn=null,ce==null||ce.setPaused(!1)),yt==="menu"&&(ce==null||ce.setPaused(!1)),ds==null||ds.focus()}function Vt(i,e,t){t!=="question"&&t!=="feedback"&&(Wn=null),clearTimeout(yn),Xn=null,ds=document.activeElement,yt=t,ce==null||ce.setPaused(!0),Q("dialog-eyebrow").textContent=i,Q("dialog-body").innerHTML=e,di.open||di.showModal(),Q("dialog-body").scrollTop=0,Q("close-dialog").focus(),Nm(),Kl()}Q("close-dialog").addEventListener("click",()=>{yt==="complete"?As():Dt()});di.addEventListener("cancel",i=>{i.preventDefault(),yt==="complete"?As():Dt()});function Vl(i=!1){if(!ce)return;const e=Q("player-name").value.trim();if(!e){Q("player-name").setCustomValidity("רק שם או כינוי, ומתחילים."),Q("player-name").reportValidity(),Q("player-name").focus();return}Q("player-name").setCustomValidity(""),Ti.set("prepx-afterbell-name",e),z=i?tl(zl(),Qt):null,z??(z=Ql(Qt)),_s=z.participantName||e,z.participantName=_s,uo=null,yt="explore",Q("welcome").classList.add("hidden"),Q("hud").classList.remove("hidden"),Q("pause").classList.remove("hidden"),document.body.classList.add("playing"),ce.setPlayer(z.player.x,z.player.z),ce.setActive(!0),ce.setPaused(!1),ce.setProgress(z),z.environment=Ir(z.environment),ce.setEnvironment(z.environment,{animate:!1}),ce.resumeRealtime(),Tn(),En(),Q("world-labels").innerHTML=tt.map(t=>`<span class="world-label" id="label-${t.id}"><b>${tt.indexOf(t)+1}</b>${Be(t.name)}</span>`).join("")+kt.map(t=>`<span class="world-label equipment-label" id="label-${t.id}">▣ ${Be(t.short)}</span>`).join("")+'<span class="world-label" id="label-exit">שער היציאה</span><span class="world-label environment-label" id="label-environment"></span>',$t=li(z,null,ce.getPlayer()).index??-1,Ai=null,yi="",Tn(),i||(Vt("תדריך · ז׳ איינשטיין",'<h2 id="dialog-title">החשמל נפל. השער נשאר נעול.</h2><p class="school-name">בית הספר שי עגנון · כיתת הייטק</p><p class="dialog-copy">נשארתם אחרי ההאקתון. שלוש תחנות הפרויקט כבו, וביער מסתובב שועל שלא מצא את הדרך החוצה. הצוות שלכם עדיין במתחם.</p><ol class="tutorial-steps"><li>המשימה הקרובה כבר מסומנת. הולכים בעקבות הנקודות המוארות ומקשיבים לאיש הצוות.</li><li>מאתרים את הציוד החסר ומפעילים את בדיקת השטח שלו: קוד, חיבורים או כיוון אות.</li><li>משלימים את שאלות התרגול בכל תחנה, מפעילים את שלוש המערכות ויוצאים בשער הצפוני.</li></ol><p class="feedback-note">אפשר לחקור בכל סדר. ״ללכת איתי״ מוביל אתכם ליעד; ״צריך רמז?״ מסביר מה עושים. משימות הצד מוסיפות אתגרים בדרך. אין לחץ זמן.</p><button id="begin-adventure" class="primary">יוצאים לבדוק את המתחם ←</button>',"tutorial"),Q("begin-adventure").onclick=()=>{Dt(),Cs(),an("המשימה הראשונה מסומנת למעלה. עקבו אחרי הנקודות המוארות, או לחצו על ״ללכת איתי״.")})}Q("player-name").addEventListener("input",()=>{Q("player-name").setCustomValidity("")});Q("start").addEventListener("click",()=>Vl());Q("resume").addEventListener("click",()=>Vl(!0));function As(){Dt(),yt="menu",ce.setActive(!1),ce.setPaused(!1),ce.resumeRealtime(),Q("welcome").classList.remove("hidden"),Q("hud").classList.add("hidden"),Q("pause").classList.add("hidden"),document.body.classList.remove("playing"),Bl()}function Io(){if(!z||!ce)return null;const i=ce.getPlayer();if(ce.isObserving())return{type:"observation",d:0};if(z.environment.seated)return{type:"environment",id:"bench",d:0};const e=pn.find(r=>r.id===Bt);if(e){const r=Math.hypot(i.x-e.x,i.z-e.z);if(r<e.range)return{type:"environment",id:e.id,d:r}}let t=null;tt.forEach((r,s)=>{const a=Math.hypot(i.x-r.x,i.z-r.z);a<3.5&&(!t||a<t.d)&&(t={type:"npc",i:s,d:a})}),kt.forEach((r,s)=>{if(z.items.includes(r.id))return;const a=Math.hypot(i.x-r.x,i.z-r.z);a<2.8&&(!t||a<t.d)&&(t={type:"equipment",i:s,d:a})});const n=Math.hypot(i.x-Qi.x,i.z-Qi.z);return n<3.5&&(!t||n<t.d)&&(t={type:"exit",d:n}),t||(pn.forEach(r=>{const s=Math.hypot(i.x-r.x,i.z-r.z);s<r.range&&(!t||s<t.d)&&(t={type:"environment",id:r.id,d:s})}),ce.animals().forEach(r=>{if(r.type==="duck")return;const s=Math.hypot(i.x-r.x,i.z-r.z);s<2.4&&(!t||s<t.d-.8)&&(t={type:"animal",id:r.id,d:s})}),t)}function Uo(){if(yt!=="explore")return;const i=Io();if(i){if(i.type==="observation"){ce.observe(!1),Cs();return}if(i.type==="environment"){fo(i.id);return}if(i.type==="animal"){Um(i.id);return}i.type==="exit"?ci(z)?Vm():an(`עוד ${3-z.seals.length} מערכות צריכות לחזור לפעולה. בחרו תחנה במפה.`):i.type==="equipment"?Im(i.i):Gl(i.i)}}Q("interact").addEventListener("click",Uo);const Dm=["נ","א","א"];function Lr(i){const e=tt[i];return`<div class="character-chip"><div class="portrait" aria-hidden="true">${Dm[i]}</div><div><h2 id="dialog-title">${Be(e.name)}</h2><small>${Be(e.role)}</small></div></div><button class="text-button npc-chat" data-npc-chat="${i}">לשוחח ולעזור לצוות ↗</button>`}function Gl(i){const e=tt[i];if(In(z,i),z.seals.includes(e.id)){Vt("חברים לדרך",Lr(i)+`<p class="dialog-copy">${i===0?"מסוף הגישה פעיל. רשמתי את התקלה. עכשיו רק צריך להסביר למורה למה התאריך בדוח הוא מחר.":i===1?"מערכת הגיבוי פועלת. פעם הבאה נבדוק אותה לפני שכולם הולכים הביתה. רעיון מהפכני.":"הקשר חזר. אם תשמעו רעש מהיער — הפעם אני הולך לבדוק. עם פנס. ועם מישהו."}</p><button id="back-world" class="primary">ממשיכים לחקור ←</button>`,"dialogue"),Q("back-world").onclick=Dt;return}if(z.understood.includes(e.id)){z.items.includes(kt[i].id)?Er(i):ho(i);return}const t=_a(e.choices.map((n,r)=>({text:n,original:r})));Vt("לפני שפותרים, מקשיבים",Lr(i)+`<p class="dialog-copy">${Be(e.line)}</p><div class="options">${t.map(n=>`<button class="option social" data-choice="${n.original}">${Be(n.text)}</button>`).join("")}</div><p id="social-feedback" class="feedback-note" role="status"></p>`,"dialogue"),document.querySelectorAll(".social").forEach(n=>n.onclick=()=>{if(Number(n.dataset.choice)!==e.need){Q("social-feedback").textContent=e.wrong,hn(!1);return}z.understood.push(e.id),En(),hn(),ho(i)})}function ho(i){const e=tt[i],t=kt[i],n=z.items.includes(t.id);Vt(`תחנה ${i+1} · ${e.system}`,Lr(i)+`<p class="dialog-copy">${Be(e.reply)}</p><div class="journal-entry"><h3>${n?"✓ הציוד איתכם":`נדרש: ${Be(t.name)}`}</h3><p>${Be(n?t.report:t.hint)}</p></div><p class="feedback-note">${In(z,i).total} שאלות מהתרגול הנבחר מפעילות את בדיקת התחנה. ציון הלימוד נפרד מהציוד ומהחקירה.</p><button class="primary" id="${n?"begin-questions":"track-equipment"}">${n?"מפעילים את מסוף התרגול":"סימון הציוד במפה"} ←</button>`,"mission"),n?Q("begin-questions").onclick=()=>Er(i):Q("track-equipment").onclick=()=>{$t=i,Ai=t.id,Dt(),Tn(),an(t.hint)}}function Im(i){const e=kt[i],t=nl[e.id],n=z.environment.checkedEquipment.includes(e.id);ln={id:e.id,step:0,channel:1},Vt("ממצא בשטח · בדיקת ציוד",`<h2 id="dialog-title">${Be(e.name)}</h2><p class="dialog-copy">${Be(e.clue)}</p><section class="field-check"><h3>${Be(t.title)}</h3><p>${Be(t.hint)}</p><div id="field-controls">${n?"":e.id==="antenna"?'<label for="radio-channel">ערוץ הקשר</label><div class="tuner"><button class="secondary" id="channel-down" aria-label="ערוץ קודם">−</button><output id="radio-channel">1</output><button class="secondary" id="channel-up" aria-label="ערוץ הבא">+</button></div><meter id="signal-meter" min="0" max="5" value="1">עוצמת אות</meter><button class="secondary" id="test-signal">בדיקת האות</button>':`<div class="field-options">${t.options.map((s,a)=>`<button class="secondary" data-operation="${a}">${Be(s)}</button>`).join("")}</div>`}</div><p id="field-status" role="status">${n?"✓ הבדיקה הושלמה. אפשר לקחת את הציוד.":"בצעו את הבדיקה כדי לשחרר את הציוד. אין לחץ זמן."}</p></section><button class="primary" id="collect-equipment" ${n?"":"disabled"}>לקחת ולהמשיך ←</button>`,"equipment");function r(){z.environment.checkedEquipment.push(e.id),En(),Q("field-status").textContent="✓ הבדיקה הצליחה. הציוד מוכן — קחו אותו וחזרו לצוות.",Q("field-controls").innerHTML='<div class="field-success">✓ הציוד מגיב</div>',Q("collect-equipment").disabled=!1,hn()}if(document.querySelectorAll("[data-operation]").forEach(s=>s.onclick=()=>{const a=ln.step;if(!nu(e.id,a,Number(s.dataset.operation))){ln.step=0,document.querySelectorAll("[data-operation]").forEach(o=>o.classList.remove("operation-done")),Q("field-status").textContent="הסדר עדיין לא מתאים. הרמז נשאר למעלה — מנסים שוב מההתחלה.",hn(!1);return}s.classList.add("operation-done"),ln.step++,Q("field-status").textContent=`✓ שלב ${ln.step} מתוך 3`,hn(),ln.step===3&&r()}),!n&&e.id==="antenna"){const s=a=>{ln.channel=Math.max(1,Math.min(7,ln.channel+a)),Q("radio-channel").textContent=ln.channel,Q("signal-meter").value=5-Math.abs(5-ln.channel),Q("field-status").textContent=ln.channel===5?"האות יציב. לחצו על בדיקת האות.":"עדיין יש רעש. בדקו את הערוץ המסומן במחברת."};Q("channel-down").onclick=()=>s(-1),Q("channel-up").onclick=()=>s(1),Q("test-signal").onclick=()=>{ln.channel===5?r():(Q("field-status").textContent="הערוץ לא מתאים. במחברת מסומן 5.",hn(!1))}}Q("collect-equipment").onclick=()=>{z.environment.checkedEquipment.includes(e.id)&&(z.items.includes(e.id)||z.items.push(e.id),$t=e.npc,Ai=null,Bt=null,En(),ce.setProgress(z),Dt(),Tn(),hn(),an(e.report))}}function qt(i={},e){z&&(Object.assign(z.environment,i),e&&!z.environment.visited.includes(e)&&z.environment.visited.push(e),ce.setEnvironment(z.environment),En(),Tn(),Cs())}function ga(i){const e=ce.getPlayer();return Math.hypot(e.x-i.x,e.z-i.z)<i.range+.1}function fo(i){const e=pn.find(r=>r.id===i);if(!e||!ga(e))return;const t=z.environment;if(i==="solar"){Vt("מנגנון מקומי · חקירה חופשית",`<h2 id="dialog-title">${Be(e.name)}</h2><p class="dialog-copy">${Be(e.description)}</p><div class="environment-switches">${["ירח","שמש","עץ"].map((r,s)=>`<button class="secondary env-switch" data-env-switch="${s}" aria-pressed="${t.switches[s]}"><span>${r}</span><b>${t.switches[s]?"פועל":"כבוי"}</b></button>`).join("")}</div><p id="env-puzzle-status" class="feedback" role="status">${vs(t)?"התאורה פועלת. שלושה פנסי שביל נדלקו.":"ההערה על המכסה: ירח ועץ פועלים, שמש כבויה."}</p><button id="env-leave" class="primary">חזרה לשביל ←</button>`,"environment"),document.querySelectorAll("[data-env-switch]").forEach(r=>r.onclick=()=>{if(!ga(e))return;const s=[...z.environment.switches];s[Number(r.dataset.envSwitch)]=!s[Number(r.dataset.envSwitch)],qt({switches:s},i),fo(i)}),Q("env-leave").onclick=Dt;return}const n=i==="locker"&&t.lockerOpen?"הפתק בארונית: ״אדם השאיר את האנטנה ליד עמדת הקשר הישנה בדרום־מערב. אם אתם מחזירים, באמת תחזירו.״":e.description;Vt("חקירה חופשית · ללא ציון",`<div class="environment-heading"><span class="environment-category">${Be(bs(e,t))}</span><h2 id="dialog-title">${Be(e.name)}</h2></div><p class="dialog-copy">${Be(n)}</p><p class="feedback-note">פעולה בקמפוס. אינה מוסיפה שאלות ואינה משנה את ציון התרגול.</p><button id="env-primary" class="primary" data-environment="${i}">${Be(Jc(e,t))} ←</button>`,"environment"),Q("env-primary").onclick=()=>{if(!ga(e))return;const r=z.environment;let s="";if(i==="bench"&&(qt({seated:!r.seated},i),s=r.seated?"אפשר להישאר רגע. כדי לקום: תנועה או כפתור הפעולה.":"חוזרים לשטח."),i==="door"){const a=ce.getPlayer();if(r.doorOpen&&Math.abs(a.x+2)<1.6&&Math.abs(a.z+16.86)<.75){an("זוזו מעט מפתח הדלת לפני שסוגרים אותה.");return}qt({doorOpen:!r.doorOpen},i),s=r.doorOpen?"הדלת נפתחה. אפשר להיכנס למבואה.":"דלת המבואה נסגרה."}if(i==="lamp"&&(qt({lampOn:!r.lampOn},i),s=r.lampOn?"הרחבה מוארת שוב.":"הפנס כובה. פנס היד שלכם עדיין פועל."),i==="basketball"){if(ce.environmentAnimation().basketballInFlight){an("הכדור בדרך חזרה. עוד רגע.");return}qt({shots:r.shots+1},i),s=`קליעה ${r.shots}. הכדור חוזר לעמדה.`}if(i==="locker"){if(qt({lockerOpen:!r.lockerOpen},i),r.lockerOpen){fo(i);return}s="הארונית סגורה. הרמז נשאר ביומן."}i==="noticeboard"&&(qt({},i),s="שלושת מיקומי הציוד תועדו ביומן. גם כתב היד החשוד."),i==="telescope"&&(qt({observations:r.observations+1},i),ce.observe(!0),s="תצפית באגם. לחצו על סיום התצפית כדי לחזור."),i==="water"&&(qt({waterFilled:!0},i),s="הקערה מלאה. ארנב מהחצר מתקרב בקצב שלו."),i==="planter"&&(qt({watered:!0},i),s="העלים התרוממו. התברר שהפתרון היה מים."),i==="recycling"&&(qt({recycled:!0},i),s="שלוש פחיות הגיעו למחזור. עכשיו נשאר לסדר את תיקיית הפרויקט."),i==="bike"&&(qt({bells:r.bells+1},i),hn(),s="הפעמון מצלצל. בדיקת החומרה הסתיימה."),Dt(),an(s)}}const Hl={fox:"שועל",rabbit:"ארנב",bird:"ציפור",duck:"ברווז"};function Um(i){const e=ce.animals().find(n=>n.id===i);if(!e)return;const t=ce.getPlayer();Math.hypot(t.x-e.x,t.z-e.z)>2.8||(qt({animalNotes:[...new Set([...z.environment.animalNotes,i])]}),Vt("יומן טבע · הקמפוס אחרי הלימודים",`<h2 id="dialog-title">${Hl[e.type]} בשטח</h2><p class="dialog-copy">${e.type==="fox"?"הוא עוצר, מקשיב, וממשיך. נראה שיש לו תוכנית טובה משלנו. אפשר לתת לו ללכת לידכם בקצב שלו.":e.type==="rabbit"?"האוזניים זזות לפני כל השאר. התצפית נשמרה ביומן; אין צורך להתקרב יותר.":e.type==="duck"?"שלושה ברווזים ממשיכים בסיור באגם. כנראה הם לא קיבלו את הודעת הביטול.":"הציפור כבר מכירה את כל הקמפוס. היא לא מתרשמת במיוחד מכיתת ההייטק."}</p>${e.type!=="duck"?`<button id="animal-follow" class="primary">${e.following?"לתת לו להמשיך בדרכו":"ללכת יחד קצת"} ←</button>`:""}<button id="animal-leave" class="secondary">להמשיך לחקור</button>`,"environment"),Q("animal-follow")&&(Q("animal-follow").onclick=()=>{qt({following:z.environment.following===i?null:i}),Dt(),an(z.environment.following===i?"חבר חדש הולך לידכם. אפשר להיפרד דרך אותה פעולת מפגש.":"הוא חוזר לסיבוב שלו בקמפוס.")}),Q("animal-leave").onclick=Dt)}function Fm(i){const e=tt[i],t=z.environment.helped.includes(e.id),n=[["היומן של נועה מלא בדיקות קטנות. ״כשכל אחד משנה דבר אחר, מתקבלים שלושה באגים ודיון ארוך. נתחיל בעובדות.״","היא מראה את הכיוון של הספרייה: ״כרטיס הצוות נשאר על שולחן העבודה ממערב. תיקי הפרויקט משום מה מסודרים פחות מהקוד.״"],["איתי מצביע על החממה. ״הרובוט היה אמור להשקות. כרגע הוא בעיקר מתעניין בלהיות כבוי.״","״יחידת הגיבוי נמצאת בארגז שממזרח למעבדה. מי שהניח אותה שם קרא לזה פתרון זמני. זה היה בשבוע שעבר.״"],["״הרעש היה מהאגם. בדקתי. ברווז. לא צריך לציין את זה בסיכום ההאקתון.״","״האנטנה נשארה בדרום־מערב. אם נלך יחד לשם, אני אבדוק את השביל ואתם תבדקו שאין עוד ברווז מפתיע.״"]][i];Vt("שיחה עם הצוות",Lr(i)+`<div class="options"><button class="secondary" data-chat-topic="0">איך הולך בינתיים?</button><button class="secondary" data-chat-topic="1">יש עוד רמז לציוד?</button><button id="npc-help" class="primary">${t?"כבר עזרנו · לבדוק מה השתנה":["לעזור לסדר את הבדיקות","לעזור להניח את הבקר","לבדוק יחד את כיוון הרעש"][i]} ←</button></div><p id="npc-chat-reply" class="dialog-copy" role="status"></p><button id="npc-back" class="text-button">בחזרה למשימת התחנה ←</button>`,"conversation"),document.querySelectorAll("[data-chat-topic]").forEach(r=>r.onclick=()=>{Q("npc-chat-reply").textContent=n[Number(r.dataset.chatTopic)]}),Q("npc-help").onclick=()=>{qt({helped:[...new Set([...z.environment.helped,e.id])]}),Q("npc-chat-reply").textContent=["נועה מסמנת בדיקה אחת ברשימה ומרימה יד בתודה. ״מדהים, אפשר לפתור דברים בלי ישיבה של שעה.״","איתי מניח את הבקר על העמדה. ״עכשיו יש לי יד פנויה. בשביל להצביע על התקלה הבאה.״","אדם מסמן את כיוון האגם. ״תודה שבדקתם איתי. מוכן להחזיר את הקשר.״"][i],Q("npc-help").textContent="העזרה תועדה ביומן"},Q("npc-back").onclick=()=>Gl(i)}function Nm(){document.querySelectorAll("[data-npc-chat]").forEach(i=>i.onclick=()=>Fm(Number(i.dataset.npcChat)))}function Wl(i){const e=Qt.references.find(n=>n.id===i.ref.id);if(!e)return"";let t;try{if(t=new URL(e.url||"subject.html?subject="+Qt.subject_id,"https://hitech.agnon.online/"),!["https:","http:"].includes(t.protocol))return""}catch{return""}return`<a class="reference" target="_blank" rel="noopener noreferrer" href="${Be(t.href)}">מקור: ${Be(e.title)}${i.ref.part?" · "+Be(i.ref.part):""} ↗</a>`}function Er(i){if(!z.items.includes(kt[i].id)){ho(i);return}const e=In(z,i);if(!e.next){zm(i);return}const t=z.questions.find(n=>n.id===e.next);Wn=t,Vt(`${tt[i].name} · ${tt[i].system}`,`<div class="question-meta"><span>${Be(Qt.title)}</span><span>שאלה ${Object.keys(z.answers).length+1} מתוך ${z.questions.length}</span></div><div class="progress-line"><i style="width:${Object.keys(z.answers).length/z.questions.length*100}%"></i></div><h2 id="dialog-title">${Be(t.prompt)}</h2>${Wl(t)}<button class="text-button npc-chat" data-npc-chat="${i}">רגע לשיחה עם ${Be(tt[i].name)} ↗</button><div class="options" id="answer-options">${t.options.map((n,r)=>`<button class="option answer" data-choice="${n.original}"><span class="number">${r+1}</span><span>${Be(n.text)}</span></button>`).join("")}</div><div id="answer-feedback" aria-live="polite"></div>`,"question"),Wn=t,document.querySelectorAll(".answer").forEach(n=>n.onclick=()=>Om(t,Number(n.dataset.choice),i))}function Om(i,e,t){const n=eu(z,i.id,e);n&&(yt="feedback",En(),Tn(),hn(n.correct),document.querySelectorAll(".answer").forEach(r=>{r.disabled=!0;const s=Number(r.dataset.choice);s===i.correct&&r.classList.add("correct"),s===e&&r.classList.add("selected",n.correct?"correct":"wrong")}),Q("answer-feedback").innerHTML=`<div class="feedback"><strong>${n.correct?"✓ תשובה נכונה.":"↺ לא הפעם. הנה ההסבר."}</strong><p>${Be(i.explanation.he)}</p>${i.explanation.en?`<p class="english" lang="en" dir="ltr">${Be(i.explanation.en)}</p>`:""}</div><button class="text-button" id="hold-feedback">להשהות ולקרוא את ההסבר</button><p class="feedback-note">התשובה נעולה. ההסבר נשאר גם ביומן.</p>`,Xn=()=>Er(t),yn=setTimeout(()=>{Xn=null,Er(t)},1500),Q("hold-feedback").onclick=()=>{clearTimeout(yn),yn=null,Xn=null,Q("hold-feedback").textContent="חזרה להמשך אוטומטי",Q("hold-feedback").onclick=()=>{Xn=()=>Er(t),yn=setTimeout(Xn,1500),Q("hold-feedback").disabled=!0}})}function zm(i){if(!z.items.includes(kt[i].id)||!z.understood.includes(tt[i].id)||In(z,i).next)return;const e=tt[i];z.seals.includes(e.id)||z.seals.push(e.id),$t=li(z,null,ce.getPlayer()).index??-1,Ai=null,Bt=null,En(),ce.setProgress(z),Tn(),hn(),Vt(`מערכת ${z.seals.length} מתוך 3 חזרה לפעולה`,Lr(i)+`<div class="score-big" style="font-size:52px">✓</div><h2 class="finish-title">${Be(e.system)} — פעיל</h2><p class="dialog-copy">${ci(z)?"הגישה, הגיבוי והקשר פעילים. השער הצפוני נפתח. הגיע הזמן לצאת מהמתחם.":"התחנה מגיבה. אפשר להמשיך לכל אחת מהתחנות האחרות. המפה עודכנה."}</p><button id="continue-world" class="primary">${ci(z)?"לשער היציאה":"חזרה לשטח"} ←</button>`,"reward"),Q("continue-world").onclick=Dt}function Tn(){z&&(Q("seal-slots").innerHTML=tt.map((i,e)=>`<button class="seal ${z.seals.includes(i.id)?"done":""} ${$t===e?"selected":""}" data-npc="${e}" title="${Be(i.name)}" aria-label="חבר ${e+1}: ${Be(i.name)}. ${z.seals.includes(i.id)?"הושלם":"הצגת הכיוון"}" aria-pressed="${$t===e}">${z.seals.includes(i.id)?"✓":e+1}</button>`).join(""),document.querySelectorAll("[data-npc]").forEach(i=>i.onclick=()=>{Bt=null,$t=Number(i.dataset.npc),Ai=z.understood.includes(tt[$t].id)&&!z.items.includes(kt[$t].id)?kt[$t].id:null,Tn()}),Q("question-progress").innerHTML=`<bdi dir="ltr">${Object.keys(z.answers).length} / ${z.questions.length}</bdi> שאלות`,Q("firefly-count").innerHTML=`✧ <bdi dir="ltr">${z.collected.length} / 12</bdi>`,Q("objective").textContent=li(z,$t,ce.getPlayer()).title,Q("environment-progress")&&(Q("environment-progress").textContent=`${z.environment.visited.length}/12 תגליות`),Q("quest-sub").textContent=li(z,$t,ce.getPlayer()).hint,Rs())}function ws(){return pn.find(i=>i.id===Bt)||li(z,$t,ce.getPlayer())}function Rs(){var r,s,a;if(!z||!ce)return;const i=ws(),e=i.id,t=li(z,$t,ce.getPlayer());e!==yi&&(yi=e,(r=ce.guideTo)==null||r.call(ce,i.x,i.z),Q("objective").textContent=Bt?`משימת שטח: ${i.name}`:t.title,Q("quest-sub").textContent=Bt?((s=ji.find(o=>o.id===i.id))==null?void 0:s.hint)||i.description:t.hint,ma=z.elapsed);const n=(a=ce.guidance)==null?void 0:a.call(ce);if(Q("follow-path").textContent=n!=null&&n.following?"עצירת ההליכה":n!=null&&n.arrived?"הגעתם — לפעולה":"ללכת איתי",Q("follow-path").disabled=yt!=="explore",Bt){const o=ji.find(c=>c.id===Bt);if(o!=null&&o.done(z.environment)){Bt=null,yi="",an("✓ משימת הצד הושלמה. חוזרים למסלול הראשי — אפשר לבחור עוד משימת צד.");return}}yt==="explore"&&z.elapsed-Nl>18&&z.elapsed-ma>25&&(ma=z.elapsed,an(`הצעד הבא: ${t.title}. כפתור ״ללכת איתי״ יוביל אתכם, או פתחו רמז.`))}Q("follow-path").onclick=()=>{var e,t,n;if(yt!=="explore")return;const i=(e=ce.guidance)==null?void 0:e.call(ce);if(i!=null&&i.following){(t=ce.stopGuide)==null||t.call(ce);return}if(i!=null&&i.arrived){Uo();return}(n=ce.followGuide)==null||n.call(ce),an("עוקבים אחרי השביל. תנועה בג׳ויסטיק או בחצים מחזירה לכם את השליטה.")};Q("mission-hint").onclick=()=>{if(!z)return;const i=ws(),e=li(z,$t,ce.getPlayer());Vt("קשר צוות · הצעד הבא",`<h2 id="dialog-title">${Be(Bt?i.name:e.title)}</h2><p class="dialog-copy">${Be(Bt?i.description:e.hint)}</p><ol class="tutorial-steps"><li>הנקודות המוארות עוקפות עצים ומבנים ומובילות ליעד.</li><li>אפשר ללכת לבד או ללחוץ על ״ללכת איתי״. תנועה ידנית עוצרת את ההובלה.</li><li>כשמגיעים, לחצו על כפתור הפעולה הגדול. הוא אומר בדיוק מה אפשר לעשות.</li></ol><button id="hint-return" class="primary">הבנתי, ממשיכים לשטח ←</button><button id="hint-main" class="text-button">חזרה למשימה הראשית</button>`,"hint"),Q("hint-return").onclick=Dt,Q("hint-main").onclick=()=>{Bt=null,yi="",Dt(),Tn()}};Q("side-task").onclick=()=>{z&&(Vt("חקירה חופשית · אתגרי שטח",`<h2 id="dialog-title">עוד משהו לעשות בדרך</h2><p class="dialog-copy">${ji.filter(i=>i.done(z.environment)).length} מתוך ${ji.length} משימות צד הושלמו. בוחרים משימה והשביל מתעדכן. הציון הלימודי נשאר נפרד.</p>${ji.map(i=>`<button class="side-mission ${i.done(z.environment)?"side-done":""}" data-side-mission="${i.id}"><strong>${i.done(z.environment)?"✓ ":""}${Be(i.title)}</strong><span>${Be(i.hint)}</span><small>${i.done(z.environment)?"הושלם":"סימון מסלול ←"}</small></button>`).join("")}<button id="side-main" class="text-button">להמשיך במשימה הראשית ←</button>`,"sidequests"),document.querySelectorAll("[data-side-mission]").forEach(i=>i.onclick=()=>{Bt=i.dataset.sideMission,yi="",Dt(),Rs()}),Q("side-main").onclick=()=>{Bt=null,yi="",Dt(),Tn()})};function Cs(){var c;if(!ce||!z)return;const i=ce.getPlayer();if(Rs(),innerWidth<600){const l=document.querySelector(".quest-panel").getBoundingClientRect().bottom;Q("map-toggle").style.top=l+12+"px",document.querySelector(".map-panel").style.top=l+66+"px"}else Q("map-toggle").style.top="",document.querySelector(".map-panel").style.top="";Q("minimap").innerHTML=`<path d="M0 25 L0 12 L-3 4 L0 -4 L0 -12 L7 -17 L7 -24 L0 -25 M-3 4 L-10 1 L-13 -9 M0 -4 L13 -7 M0 12 L10 14" fill="none" stroke="#719480" stroke-width="1.4"/><ellipse cx="-17" cy="13" rx="6.5" ry="5" fill="#467e86"/><rect x="-8" y="-23" width="12" height="6" fill="#718a78" rx="1"/>${tt.map(l=>`<circle cx="${l.x}" cy="${l.z}" r="2.2" fill="${z.seals.includes(l.id)?"#5f8270":l.color}"/><text x="${l.x}" y="${l.z+1}" font-size="3" text-anchor="middle" fill="#152d30">${z.seals.includes(l.id)?"✓":tt.indexOf(l)+1}</text>`).join("")}<path d="M-2 -26H2V-23H-2Z" fill="${ci(z)?"#daf69f":"#91a78d"}"/>${kt.filter(l=>!z.items.includes(l.id)&&(Ai===l.id||z.understood.includes(tt[l.npc].id))).map(l=>`<rect x="${l.x-1.5}" y="${l.z-1.5}" width="3" height="3" fill="#d9b47d"/>`).join("")}${pn.map(l=>`<circle cx="${l.x}" cy="${l.z}" r="${Bt===l.id?1.6:.7}" fill="${Bt===l.id?"#fff1c7":z.environment.visited.includes(l.id)?"#8ba994":"#b39e7a"}"/>`).join("")}<circle cx="${i.x}" cy="${i.z}" r="2.1" fill="#e8a169" stroke="#fff4cd" stroke-width=".7"/>`,Q("location").textContent=i.z<-14?"ליד בית הספר":i.x<-10?"הספרייה והאגם":i.x>8&&i.z>5?"מגדל הפנס":i.x>8?"החממה":"קרחת היער";const e=ws(),t=ce.project(e.x,0,e.z),n=ce.project(i.x,0,i.z);Q("compass").style.transform=`rotate(${Math.atan2(t.x-n.x,n.y-t.y)*180/Math.PI}deg)`,Q("direction-text").textContent=`${e.name||e.title} · ${Math.round(Math.hypot(i.x-e.x,i.z-e.z))} צעדים`,tt.forEach(l=>{const u=Q("label-"+l.id);if(!u)return;const d=ce.project(l.x,3.7,l.z);u.style.left=d.x+"px",u.style.top=d.y+"px",u.style.display=d.visible?"block":"none",u.classList.toggle("done",z.seals.includes(l.id))}),kt.forEach(l=>{const u=Q("label-"+l.id);if(!u)return;const d=ce.project(l.x,2,l.z),f=Math.hypot(i.x-l.x,i.z-l.z);u.style.left=d.x+"px",u.style.top=d.y+"px",u.style.display=!z.items.includes(l.id)&&d.visible&&(Ai===l.id||f<7)?"block":"none"});const r=Q("label-exit"),s=ce.project(Qi.x,6.2,Qi.z);r&&(r.style.left=s.x+"px",r.style.top=s.y+"px",r.style.display=s.visible?"block":"none");const a=Io();Q("interact").classList.toggle("hidden",!a||yt!=="explore"),a&&(Q("interact").innerHTML=a.type==="observation"?"סיום התצפית <kbd>E</kbd>":a.type==="environment"?`${Be(a.id==="bench"&&z.environment.seated?"לקום מהספסל":pn.find(l=>l.id===a.id).name)} <kbd>E</kbd>`:a.type==="animal"?`מפגש עם ${Hl[(c=ce.animals().find(l=>l.id===a.id))==null?void 0:c.type]||"חיה"} <kbd>E</kbd>`:a.type==="exit"?`${ci(z)?"יוצאים הביתה":"לבדוק את השער"} <kbd>E</kbd>`:a.type==="equipment"?`לבדוק ${Be(kt[a.i].short)} <kbd>E</kbd>`:`לדבר עם ${Be(tt[a.i].name)} <kbd>E</kbd>`);const o=Q("label-environment");if(o){const l=(a==null?void 0:a.type)==="environment"?pn.find(u=>u.id===a.id):null;if(l&&yt==="explore"){const u=ce.project(l.x,2.2,l.z);o.textContent=bs(l,z.environment)+" · "+l.name,o.style.left=u.x+"px",o.style.top=u.y+"px",o.style.display=u.visible?"block":"none"}else o.style.display="none"}}function Xl(){return z.questions.filter(i=>Object.hasOwn(z.answers,i.id)).map(i=>{const e=z.answers[i.id];return`<details class="review-item"><summary>${e.correct?"✓":"↺"} ${Be(i.prompt)}</summary><p>התשובה שלכם: ${Be(i.choices[e.choice])}</p><p>התשובה הנכונה: ${Be(i.choices[i.correct])}</p><p>${Be(i.explanation.he)}</p>${i.explanation.en?`<p lang="en" dir="ltr">${Be(i.explanation.en)}</p>`:""}${Wl(i)}</details>`}).join("")}function Bm(){z&&(Vt("כל מה שגיליתם",`<h2 id="dialog-title">יומן ההרפתקה</h2>${tt.map((i,e)=>`<div class="journal-entry"><h3>${z.seals.includes(i.id)?"✓":"◇"} ${Be(i.name)}</h3><p>${Be(i.role)} · ${In(z,e).answered} מתוך ${In(z,e).total} שאלות</p><p>${e===0?"מצפון־מערב, ליד הספרייה.":e===1?"מצפון־מזרח, ליד החממה.":"מדרום־מזרח, ליד מגדל הפנס."}</p></div>`).join("")}<h3>ציוד וממצאים</h3>${kt.map(i=>`<div class="journal-entry"><h3>${z.items.includes(i.id)?"✓":"□"} ${Be(i.name)}</h3><p>${Be(z.items.includes(i.id)?i.clue:i.hint)}</p></div>`).join("")}<h3>חקירה בקמפוס · ${z.environment.visited.length}/12</h3>${pn.map(i=>`<div class="journal-entry"><h3>${z.environment.visited.includes(i.id)?"✓":"□"} ${Be(i.name)}</h3><p>${Be(bs(i,z.environment))} · ${z.environment.visited.includes(i.id)?Be(i.description):"אפשר לגלות בשטח. המפה מציגה את המיקום."}</p><button class="text-button" data-track-environment="${i.id}">להציג מיקום במפה ←</button></div>`).join("")}<p class="feedback-note">מפגשי טבע: ${z.environment.animalNotes.length} · עזרה לצוות: ${z.environment.helped.length}/3</p><h3>השאלות שכבר פתרתם</h3><p class="feedback-note">התשובות נעולות. אפשר לקרוא וללמוד מהן בכל רגע.</p>${Xl()||'<p class="feedback-note">השאלות יופיעו כאן אחרי שתענו.</p>'}`,"journal"),document.querySelectorAll("[data-track-environment]").forEach(i=>i.onclick=()=>{const e=pn.find(t=>t.id===i.dataset.trackEnvironment);Bt=e.id,Dt(),Rs(),document.body.classList.add("map-open"),Q("map-toggle").setAttribute("aria-expanded","true"),an(`${e.name} סומן במפה.`)}))}Q("journal").onclick=Bm;const jn=document.createElement("button");jn.id="map-toggle";jn.className="secondary map-toggle";jn.textContent="מפה";jn.setAttribute("aria-expanded","false");jn.setAttribute("aria-controls","minimap");Q("hud").appendChild(jn);jn.onclick=()=>{const i=document.body.classList.toggle("map-open");jn.setAttribute("aria-expanded",String(i)),jn.textContent=i?"סגירת מפה":"מפה"};const ql=document.createElement("span");ql.id="environment-progress";document.querySelector(".quest-bottom").appendChild(ql);function $l(){Vt("תדריך שטח",'<h2 id="dialog-title">איך יוצאים מכאן.</h2><div class="journal-entry"><h3>01 · משוטטים</h3><p>מקשי WASD או חצים כדי לזוז, רווח לקפוץ, Shift לרוץ. אפשר ללחוץ על הקרקע. בנייד: גוררים את העיגול וקופצים בכפתור החץ.</p></div><div class="journal-entry"><h3>02 · מקשיבים לחברים</h3><p>מתקרבים לדמות ולוחצים E או על כפתור השיחה. מבינים מה היא צריכה, מאתרים את הציוד שהוא צריך וחוזרים אליו להפעלת מסוף התרגול.</p></div><div class="journal-entry"><h3>03 · פותרים ויוצאים</h3><p>השאלות מגיעות מחומר התרגול שלכם. כל תשובה ננעלת ויש הסבר. אחרי הפעלת שלוש המערכות מגיעים לשער בצפון. אין זמן קצוב ואין קנס על טעות.</p></div><div class="journal-entry"><h3>חקירה חופשית</h3><p>מגלים 12 מקומות לפעולה: יושבים, פותחים דלתות, קולעים לסל, משקים וצופים בטבע. מתקרבים, לוחצים על הכפתור הגדול ובוחרים פעולה. ביומן יש מיקומים ורמזים. החקירה ועזרה לצוות אינן משנות את ציון הלימוד. F למסך מלא. Escape להשהיה.</p></div><button id="got-it" class="primary">חזרה למשימה ←</button>',z&&yt!=="menu"?"help":"menu"),Q("got-it").onclick=Dt}Q("how").onclick=$l;function Fo(){if(!(yt==="menu"||yt==="complete")){if(di.open){Dt();return}Vt("היער יכול לחכות",`<h2 id="dialog-title">רגע לנשום.</h2><p class="dialog-copy">${co?"ההתקדמות נשמרה בלשונית הזאת.":"הדפדפן חסם שמירה מקומית. השאירו את הלשונית פתוחה כדי להמשיך."} העולם ממתין לכם.</p><div class="options"><button id="unpause" class="primary">חזרה ליער ←</button><button id="show-controls" class="secondary">איך משחקים?</button><button id="menu" class="secondary">חזרה למסך הפתיחה</button></div>`,"paused"),Q("unpause").onclick=Dt,Q("show-controls").onclick=$l,Q("menu").onclick=As}}Q("pause").onclick=Fo;async function Yl(){try{document.fullscreenElement?await document.exitFullscreen():await document.documentElement.requestFullscreen()}catch{an("הדפדפן הזה לא מאפשר מסך מלא. אפשר להמשיך לשחק כרגיל.")}}Q("fullscreen").onclick=Yl;Q("sound").onclick=()=>{qi=!qi,Q("sound").setAttribute("aria-pressed",String(qi)),Q("sound").setAttribute("aria-label",qi?"כיבוי צלילים":"הפעלת צלילים"),Q("sound").style.color=qi?"#d9bd85":"",hn()};window.addEventListener("keydown",i=>{var e;i.target.matches("input,select,textarea")||(i.code==="KeyF"&&(i.preventDefault(),Yl()),i.code==="Escape"&&!di.open&&(i.preventDefault(),Fo()),yt==="question"&&/^Digit[1-4]$/.test(i.code)&&((e=document.querySelectorAll(".answer")[Number(i.code.slice(-1))-1])==null||e.click()))});document.addEventListener("visibilitychange",()=>{document.hidden&&yt==="explore"&&Fo(),document.hidden&&yn?(clearTimeout(yn),yn=null):!document.hidden&&yt==="feedback"&&Xn&&(yn=setTimeout(Xn,1500))});window.addEventListener("pagehide",En);async function km(i){return lu(i)}async function Zc(i=z,e=Qt,t=_s){const n={id:i.attemptId,name:t,quizId:e.id,answers:Object.entries(i.answers).map(([r,s])=>({id:r,choice:s.choice})),startedAt:i.startedAt,contentHash:await km(e)};return Ol=Lm(n),Ul(n)}async function Vm(){if(!ci(z)||yt==="complete")return;const i=z,e=Qt,t=_s,n=z.attemptId;En();const r=el(z),s=tu(r),a=Object.values(z.answers).filter(u=>u.correct).length,o=`prepx-best-${Qt.id}`,c=Number(Ti.get(o));(!Number.isFinite(c)||r>c)&&Ti.set(o,String(r)),Vt("הגעתם הביתה ✧",`<div class="stars" aria-label="${s} כוכבים מתוך שלושה">${"★".repeat(s)+"☆".repeat(3-s)}</div><h2 class="finish-title" id="dialog-title">המערכות פעילות.<br>הדרך החוצה פתוחה.</h2><p class="finish-title feedback-note">צוות איינשטיין, המשימה הושלמה. בפעם הבאה נשארים להאקתון בשעות האור.</p><div class="score-big">${r}<small> / 100</small></div><div class="stats-row"><div><strong>${a}/${z.questions.length}</strong><small>תשובות נכונות</small></div><div><strong>3</strong><small>מערכות פעילות</small></div><div><strong>${z.collected.length}</strong><small>גחליליות</small></div></div><p id="save-status" class="saved-note" role="status">שומרים את התוצאה בהיסטוריית המשחק…</p><div class="dialog-actions"><button id="replay" class="primary">משימה חדשה ↺</button><a class="secondary" href="https://hitech.agnon.online/subject.html?subject=${Qt.subject_id}">לחומר הלימוד ↗</a></div><button id="review-results" class="text-button">התשובות וההסברים שלכם <span>↓</span></button><div id="final-review" class="hidden">${Xl()}</div>`,"complete"),Q("replay").onclick=()=>{Kc(),z=null,As()},Q("review-results").onclick=()=>Q("final-review").classList.toggle("hidden"),uo=Zc(i,e,t);const l=await uo;if(yt==="complete"&&(z==null?void 0:z.attemptId)===n&&(Q("save-status").textContent=l?"✓ התוצאה נשמרה בהיסטוריית המשחק. לא נשלח דוא״ל.":Ol?"אין חיבור להיסטוריה כרגע. התוצאה נשמרה במכשיר וממתינה לשליחה.":"השמירה נכשלה והדפדפן חסם שמירה מקומית. השאירו את הלשונית פתוחה ונסו שוב.",!l)){const u=document.createElement("button");u.className="text-button",u.textContent="לנסות לשמור שוב",u.onclick=async()=>{u.disabled=!0,await Zc(i,e,t)?(Q("save-status").textContent="✓ התוצאה נשמרה בהיסטוריית המשחק.",u.remove()):u.disabled=!1},Q("save-status").after(u)}l&&(z==null?void 0:z.attemptId)===n&&Kc()}try{ce=Cm(Q("world"),{reduced:Pm,onInteract:Uo,onEnvironmentChange:i=>{z&&qt(i)},onCollect:i=>{!z||z.collected.includes(i)||(z.collected.push(i),Tn(),En(),hn(),z.collected.length%3===0&&an(`${z.collected.length} נקודות טבע תועדו ביומן. החקירה לא משנה את ציון הלימוד.`))},onMove:(i,e,t)=>{z&&(Math.hypot(i-z.player.x,e-z.player.z)>.01&&(Nl=z.elapsed),z.player={x:i,z:e},z.elapsed+=t,xa+=t,xa>1&&(xa=0,En()))}}),Q("loading").classList.add("hidden")}catch{Q("loading").innerHTML='<div style="max-width:320px;text-align:center"><h2>היער צריך דפדפן עם תלת־ממד.</h2><p>נסו לעדכן את הדפדפן או להפעיל האצת חומרה.</p><a href="https://hitech.agnon.online/" class="primary">בינתיים, לתרגול הרגיל ←</a></div>',Q("start").disabled=!0}Q("world").addEventListener("worldlost",()=>{Vt("החיבור לתלת־ממד נעצר",'<h2 id="dialog-title">נשמר לכם מקום ביער.</h2><p class="dialog-copy">רעננו את העמוד ובחרו בהמשך ההרפתקה השמורה.</p><button id="reload" class="primary">רענון וחזרה</button>',"paused"),Q("reload").onclick=()=>location.reload()});const Dr=Q("joystick");let No=null;function jl(i){if(No!==i.pointerId)return;const e=Dr.getBoundingClientRect();let t=(i.clientX-e.left-e.width/2)/36,n=(i.clientY-e.top-e.height/2)/36;const r=Math.max(1,Math.hypot(t,n));t/=r,n/=r,ce==null||ce.setJoystick(t,n),Q("stick").style.transform=`translate(${t*28}px,${n*28}px)`}Dr.addEventListener("pointerdown",i=>{No=i.pointerId,Dr.setPointerCapture(i.pointerId),jl(i)});Dr.addEventListener("pointermove",jl);function Kl(){No=null,ce==null||ce.setJoystick(0,0),Q("stick").style.transform=""}for(const i of["pointerup","pointercancel","lostpointercapture"])Dr.addEventListener(i,Kl);Q("jump").onclick=()=>ce==null?void 0:ce.jump();setInterval(Cs,80);window.render_game_to_text=()=>{var i;return JSON.stringify({mode:yt,coordinateSystem:"x east, z south; y up; world -27..27. Arrow/WASD movement is camera-relative.",source:lo,quiz:Qt.id,player:ce==null?void 0:ce.getPlayer(),target:Io(),environment:z?pn.map(e=>({...e,state:bs(e,z.environment),visited:z.environment.visited.includes(e.id),action:Jc(e,z.environment)})):[],environmentState:(z==null?void 0:z.environment)||null,environmentAnimation:ce==null?void 0:ce.environmentAnimation(),observing:(ce==null?void 0:ce.isObserving())||!1,rendering:ce==null?void 0:ce.performance(),mission:z?{objective:li(z,$t,ce.getPlayer()),target:ws(),navigation:(i=ce==null?void 0:ce.guidance)==null?void 0:i.call(ce),fieldCheck:ln,sideCompleted:ji.filter(e=>e.done(z.environment)).length}:null,npcs:tt.map((e,t)=>({id:e.id,x:e.x,z:e.z,understood:(z==null?void 0:z.understood.includes(e.id))||!1,sealed:(z==null?void 0:z.seals.includes(e.id))||!1,progress:z?In(z,t):null})),equipment:kt.map(e=>({id:e.id,x:e.x,z:e.z,collected:(z==null?void 0:z.items.includes(e.id))||!1})),exit:{...Qi,open:z?ci(z):!1},question:Wn&&["question","feedback"].includes(yt)?{id:Wn.id,prompt:Wn.prompt,options:Wn.options.map(e=>e.text),locked:!!(z!=null&&z.answers[Wn.id])}:null,answered:z?Object.keys(z.answers).length:0,total:Qt.questions.length,score:z?el(z):0,fireflies:(z==null?void 0:z.collected.length)||0,elapsed:Math.floor((z==null?void 0:z.elapsed)||0),animals:ce==null?void 0:ce.animals(),paused:di.open})};window.advanceTime=i=>ce==null?void 0:ce.advanceTime(i);kl().then(Fl);
