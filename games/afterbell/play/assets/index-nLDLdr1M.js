(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const Si=108,Tr={id:"campus",name:"קמפוס שי עגנון",x:0,z:9},ha=[{name:"ביצות הגאות",color:"#719f9c",sites:[{id:"mill",name:"טחנת הגאות",x:59,z:12},{id:"dock",name:"רציף הפנסים",x:84,z:54}]},{name:"מחצבת הענבר",color:"#cc9a62",sites:[{id:"arch",name:"קשת הענבר",x:-62,z:14},{id:"mine",name:"מכרה הגבישים",x:-86,z:60}]},{name:"רכס הכוכבים",color:"#a3a6d9",sites:[{id:"dome",name:"מצפה השחר",x:-15,z:-72},{id:"array",name:"מעגל האנטנות",x:62,z:-82}]}],Ji=ha.flatMap(n=>n.sites.map(e=>({...e,region:n.name,color:n.color}))),Tu=[[[19,12],[27,12],[45,12],[59,12],[73,28],[84,54]],[[-10,1],[-20,0],[-27,0],[-40,0],[-62,14],[-76,33],[-86,60]],[[7,-24],[0,-27],[-6,-44],[-15,-72],[9,-86],[44,-82],[62,-82]],[[62,-82],[73,-56],[62,-26],[59,12]],[[-86,60],[-60,83],[-20,80],[0,67],[0,27],[0,25]],[[0,67],[35,58],[45,54],[84,54]]],Io=[12,54];function Gd(n,e){return Math.abs(n-45)<3.6&&e>-40&&e<91&&Io.every(t=>Math.abs(e-t)>2.1)}function La(n,e){return Math.max(Math.abs(n),Math.abs(e))<=27?Tr.name:e<-38?ha[2].name:n<0?ha[1].name:ha[0].name}function Hd(n){return Array.isArray(n)?Ji.filter(e=>n.includes(e.id)).map(e=>e.id):[]}const Zs=[[33,12],[50,12],[73,28],[-36,0],[-54,10],[-76,33],[-5,-42],[-14,-64],[25,-84]];function Au(n){const e=n.player,t=Tu.map(r=>`<polyline points="${r.map(o=>o.join(",")).join(" ")}" fill="none" stroke="#b0a27e" stroke-width="1.4"/>`).join(""),i=Zs.map(([r,o],a)=>`<circle cx="${r}" cy="${o}" r="1.65" fill="${n.skyGates.includes(a)?"#92d4b0":"#edbe66"}"/>`).join(""),s=Ji.map((r,o)=>`<circle cx="${r.x}" cy="${r.z}" r="5" fill="${r.color}"/><text x="${r.x}" y="${r.z+2.4}" text-anchor="middle" font-size="7" fill="#12242c">${o+1}</text>`).join("");return`<rect x="-108" y="-108" width="216" height="216" fill="#243c38"/><ellipse cx="16" cy="-73" rx="82" ry="31" fill="#41485b"/><ellipse cx="-73" cy="28" rx="35" ry="76" fill="#685646"/><path d="M45 -40V91" stroke="#559296" stroke-width="7"/>${t}${i}<rect x="-27" y="-27" width="54" height="54" fill="#617063" stroke="#98a88a"/>${s}<circle cx="${e.x}" cy="${e.z}" r="3.1" stroke="#fff4c7" fill="#ed9855"/>`}function Wd(n){const e=n.stones.length;return`<h2 id="dialog-title">אטלס השבילים</h2><p class="dialog-copy">חפשו את אבני הדרך. אחרי ביקור ראשון אפשר לחזור אליהן בקפיצה במסילת הכוכבים.</p><svg viewBox="-110 -110 220 220" class="atlas-chart" role="img" aria-label="שלושה חבלי ארץ, השבילים וששת היעדים">${Au(n)}</svg><p class="feedback-note">אבני דרך ${e}/6 · טבעות שמיים ${n.skyGates.length}/${Zs.length}. קפצו דרך טבעת זהב לקבלת תנופה. בכל אזור שלוש טבעות ושומר רוח שמאט אתכם במגע.</p>${[Tr,...Ji].map((t,i)=>{const s=t===Tr||n.stones.includes(t.id);return`<div class="atlas-row"><div><strong>${i?i+" · ":""}${t.name}</strong><small>${t.region||"נקודת המוצא"} · ${Math.round(Math.hypot(n.player.x-t.x,n.player.z-t.z))} צעדים</small></div><button class="secondary" data-walk="${t.id}">הליכה</button>${s&&n.relay?`<button class="secondary" data-travel="${t.id}">מעבר</button>`:""}</div>`}).join("")}<button id="atlas-back" class="text-button">חזרה למסלול המשימה ←</button>`}const $d=[{name:"רחבת הכניסה",x:0,z:10},{name:"שביל הספרייה",x:-10,z:1},{name:"גינת החממה",x:9,z:-5},{name:"דרך המגדל",x:10,z:13},{name:"מצפה הצפון",x:7,z:-16},{name:"שביל הגחליליות",x:-7,z:20}],qi=[{title:"מסילת הכוכבים",story:"באמצע מופע הכיתה כבה המקרן. שלושה פנסי שמיים התפזרו מעבר לשער. חברו אותם כדי לצייר שוב כוכבים מעל בית הספר.",sites:[0,2,4],tasks:["sparks","ring","mirror"],sequence:[1,0,2]},{title:"מצעד הגחליליות",story:"הגחליליות יצאו מהביצות לפני שהפנסים נדלקו. הדליקו להן שלוש תחנות אור שיובילו את המצעד עד השער.",sites:[1,3,5],tasks:["mirror","sparks","ring"],sequence:[2,1,0]},{title:"האות מהמצפה",story:"המצפה קלט אות מקוטע. שלוש משואות ברחבי הארץ מחזיקות חלקים ממנו. חברו את האות כדי לחשוף את קבוצת הכוכבים שממנה הגיע.",sites:[3,4,1],tasks:["ring","mirror","sparks"],sequence:[0,2,1]}],qd={sparks:"שובל הניצוצות",ring:"טבעת הרוח",mirror:"מראות הירח"},cl=["ירח ☾","שמש ☀","כוכב ✧"];function Xd(n,e=Math.random){const t=qi.map((i,s)=>s).filter(i=>i!==n);return{territory:1,edition:t[Math.floor(e()*t.length)],steps:[0,0,0]}}function $t(n,e){const t=qi[n.edition],i=t.tasks[e];return{...(n.territory===1?Ji:$d)[t.sites[e]],task:i,title:qd[i],index:e}}function Qi(n,e){const t=$t(n,e).task;return n.steps[e]==={sparks:7,ring:1,mirror:3}[t]}function jd(n){return!!n&&(n.territory===void 0||n.territory===1)&&Number.isInteger(n.edition)&&!!qi[n.edition]&&Array.isArray(n.steps)&&n.steps.length===3&&n.steps.every((e,t)=>Number.isInteger(e)&&e>=0&&e<={sparks:7,ring:1,mirror:3}[$t(n,t).task])}function Da(n){return[[-2,2],[2,1],[0,-2.5]].map(([e,t],i)=>({x:n.x+e,z:n.z+t,bit:i}))}function Yd(n,e,t,i){if(!e.length)return null;const s=e.includes(t)?t:e.sort((c,u)=>{const d=f=>{const h=$t(n,f);return Math.hypot(h.x-i.x,h.z-i.z)};return d(c)-d(u)})[0],r=$t(n,s),o=Qi(n,s),a=!o&&r.task==="sparks"&&Da(r).find(c=>!(n.steps[s]&1<<c.bit)),l=o?"האור מוכן. הפעילו את הפנס וענו על שאלות התרגול.":{sparks:"אספו שלושה ניצוצות בשטח, בכל סדר.",ring:"קפצו לתוך הטבעת, או הפעילו את המתג בבסיס שלה.",mirror:"כוונו שלוש מראות לפי סדר הסמלים שעל הלוח."}[r.task];return{...r,...a||{},id:"relay-"+s+"-"+n.steps[s],title:r.title+" · "+r.name,hint:l,action:"אל הפנס"}}const wt=(n,e,t,i,s,r={})=>({kind:n,title:e,hint:t,x:i,z:s,...r}),Br=(n,e,t,i,s={})=>wt(n,e,t,...i[0],{points:i.map(([r,o])=>({x:r,z:o})),...s}),Ma=[{id:"evidence",title:"תיק הראיות",quizzes:["facts"],brief:"חוקרים זירת תקלה: בודקים ממצאים, בונים קשרים ומשחזרים את הערב מתוך ראיות.",steps:[wt("evidence-scene","בדיקת זירת התקלה","בדקו כל פריט בזירה. אספו רק שלושה ממצאים שאפשר לבדוק; השערה אינה ראיה.",-4,12),wt("evidence-board","לוח הקשרים","חברו כל ממצא למסקנה היחידה שהוא תומך בה. אין להסיק מעבר למה שנמצא.",-14,-3),wt("evidence-timeline","שחזור ארבעת האירועים","סדרו את הכרטיסים לפי חותמות הזמן שעליהם. הזיזו כרטיס למעלה או למטה, ואז הגישו את השחזור.",4,-10)]},{id:"witness",title:"העד שנעלם",quizzes:["questions"],brief:"חוקרים שתי עדויות, מזהים סתירה ובוחרים היכן לחפש את העד בעולם.",steps:[wt("witness-interview","ראיון עם שני עדים","עברו בין נועה ואיתי. שאלו שאלות על מקום, זמן ואדם; אספו שלושה פרטים שימושיים לפני הסיכום.",10,-2),wt("witness-timetable","העדות שלא מסתדרת","לוח המצלמות מציב את איתי בחממה ב־18:10 וב־18:20. סמנו את שתי הטענות שסותרות את הלוח.",18,2),Br("witness-search","חיפוש לפי העדות","העד תיאר מים ומקום ישיבה. בחרו אתר חיפוש, לכו אליו ובדקו אותו. חיפוש שגוי נותן רמז נוסף.",[[19,11],[4,-10],[-7,20]])]},{id:"robot",title:"חילוץ הרובוט",quizzes:["instructions"],brief:"לא עוד אתחול פשוט: מתכנתים מעקף, מתקנים מעגל ומלווים רובוט אמיתי בחזרה לתחנה.",steps:[wt("robot-route","תוכנית חילוץ במבוך","תכנתו מסלול ברשת 5×5: מ־S בפינה העליונה השמאלית אל G בפינה התחתונה הימנית. הימנעו מתאים חסומים.",4,-10),wt("robot-circuit","תיקון ארבעה חיבורים","חברו כל יציאה בצבע ובצורה המתאימים. בוחרים יציאה ואז כניסה; חיבור לא מתאים לא נשמר.",18,2),Br("robot-escort","מלווים את הרובוט הביתה","הרובוט נע לאט מכם. הובילו אותו דרך שלוש תחנות וחכו שיגיע לפני אישור כל תחנה.",[[19,11],[9,21],[-7,20]],{entity:"robot"})]},{id:"survey",title:"מודדי הקמפוס",quizzes:["physics-basics"],brief:"יוצאים לסקר אמיתי: מודדים מקטע, תוחמים חלקה ומתרגמים שרטוט למפת שטח.",steps:[wt("survey-ruler","מדידה בין שתי נקודות","כוונו את קצוות הסרגל לשני הסימונים שעל המוט, ואז רשמו את האורך ביניהם. קוראים את ההפרש, לא את קצה הסרגל.",-4,12),wt("survey-parcel","תיחום חלקת הקרקע","סמנו את כל המשבצות בתוך הגבול בצורת ר׳. כל משבצת היא מטר רבוע אחד. חשבו את שטח החלקה.",-14,-3),wt("survey-scale","משרטוט למפת השטח","קנה המידה: כל סנטימטר בשרטוט הוא 10 מטרים בשטח. המבנה ברוחב 4 ס״מ ובעומק 3 ס״מ. מלאו את שתי המידות.",4,-10)]},{id:"freight",title:"משלוח במידות",quizzes:["physics-units"],brief:"מפעילים מרכז שילוח: מתקנים יחידות, מאזנים מטען ואורזים חלקים בעלי צורות שונות.",steps:[wt("freight-manifest","תיקון תעודת המשלוח","לוח באורך 250 ס״מ וצינור באורך 0.8 מ׳ צריכים לצאת. השלימו את ההמרות ובחרו רכב שהלוח נכנס אליו.",18,2),wt("freight-balance","איזון שלושה משקולות","חלקו את המשקולות 2, 3 ו־5 ק״ג בין שתי הכפות. כל משקולת חייבת להימצא על כף, ושני הצדדים צריכים להתאזן.",19,11),wt("freight-packing","אריזה ללא חפיפה","הארגז הוא רשת ⁦4×3⁩. בחרו חלק, סובבו בעת הצורך ולחצו על משבצת להצבת הפינה שלו. ארזו את שלושת החלקים בלי חריגה או חפיפה.",-4,12)]},{id:"optics",title:"המעבדה המדויקת",quizzes:["physics-precision"],brief:"עובדים כמו צוות מעבדה: ממקדים תמונה, מתקנים זווית הסתכלות ובודקים מדידות חוזרות.",steps:[wt("optics-focus","מיקוד וחשיפה","כוונו בנפרד את המיקוד ואת החשיפה עד ששלושת הסימנים חדים וברורים. רק אז צלמו את לוח הכיול.",-9,-12),wt("optics-parallax","ביטול שגיאת ההסתכלות","בכל עין יישרו את הכוונת עם הקו המרכזי. שני המבטים צריכים להיפגש באותו סימון, ולא רק להיראות קרובים.",4,-10),wt("optics-samples","סדרת מדידות חוזרות","קחו חמש מדידות. סמנו את הקריאה החריגה, והקלידו את הממוצע של ארבע הקריאות שנותרו.",10,-2)]},{id:"shadow",title:"סוד הצללים",quizzes:["physics-pole"],brief:"לומדים את המגדל דרך האור: מניעים מקור אור, משווים יחסים וקוראים שעון שמש.",steps:[wt("shadow-light","מי מזיז את הצל?","הציבו את מקור האור בצד המזרחי, ואז סמנו לאיזה צד נופל הצל. נוגעים במקור ובצל בנפרד.",9,21),wt("shadow-height","גובה מתוך שני צללים","עמוד הייחוס בגובה 2 מטרים מטיל צל באורך 3 מטרים. צל המגדל באורך 9 מטרים. כוונו את עמוד הייחוס ורשמו את גובה המגדל.",10,-2),wt("shadow-sundial","שתי תצפיות בשעון השמש","העבירו את השעה ל־10 ול־14 ושמרו תצפית בכל שעה. לאחר מכן בחרו באיזו תצפית הצל קצר יותר.",-9,-12)]},{id:"rescue",title:"מחזירים את השועל",quizzes:["facts"],brief:"השועל הוא שותף למשימה: מרוויחים את אמונו, בונים לו מחסה ומטפלים בשלושה צרכים שונים.",steps:[wt("rescue-trust","מרוויחים את אמון השועל","התקרבו לשועל בהליכה שקטה והישארו לידו שלוש שניות. קימה או התרחקות מפחיתות אמון; אין לחץ זמן.",-7,20,{entity:"fox"}),wt("rescue-shelter","בונים פינת מחסה","מקמו מים בצד השמאלי, מצע בשורה האחורית וגגון במרכז. השאירו את המשבצת הקדמית האמצעית פנויה ככניסה.",-14,-3),wt("rescue-care","קוראים את צורכי השועל","הרגיעו את השועל לפני הצעת מים. אחרי השתייה אפשר לתת לו לנוח במחסה. עקבו אחרי מדדי השקט, המים והמנוחה.",-9,-12)]},{id:"relay",title:"האות האחרון",quizzes:["questions"],brief:"מקימים קשר מחדש: מסנכרנים גל, משדרים הודעת מורס ומשקמים רשת עם צומת תקול.",steps:[wt("relay-wave","סנכרון שני גלים","כוונו תדירות ומופע עד שהגל שלכם חופף לגל המקווקו. כיוון נכון של כפתור אחד בלבד אינו מספיק.",9,21),wt("relay-morse","משדרים SOS","טבלת הקוד: S היא שלוש נקודות; O היא שלושה קווים. שדרו אות, סיימו אות, והמשיכו עד להודעה SOS.",19,11),wt("relay-network","מעקף לצומת שנפל","חברו את התחנה משמאל אל התחנה מימין דרך התחנות התקינות שביניהן. הצומת האדום תקול ואסור להשתמש בו.",18,2)]},{id:"courier",title:"שליחי הלילה",quizzes:["instructions"],brief:"משלוח עם החלטות ותנועה: מתכננים מסלול, עוברים מסלול תנועה ומוסרים כל חבילה לארונית הנכונה.",steps:[wt("courier-plan","מסלול עם תקציב מרחק","אוספים מפתח במחסן לפני הכניסה למעבדה, ומסיימים בשער. התקציב הוא 14 יחידות דרך. בחרו סדר עצירות ובדקו את הסכום.",-4,12),Br("courier-course","מסלול ארבע התנועות","סימון 1: קפיצה. סימון 2: זינוק ב־Q. סימון 3: קפיצה. סימון 4: נחיתה ועמידה. השלימו את התנועות בשטח, לא מתוך חלון.",[[-8,4],[-14,-3],[-9,-12],[4,-10]]),Br("courier-lockers","כל חבילה לארונית שלה","לכל ארונית קוד אחרת. הגיעו אליה ובחרו חבילה שהקוד שעליה הפוך לקוד הארונית. מסירה שגויה נשארת בתיק.",[[10,-2],[18,2],[19,11]])]}],Cn=n=>Ma.find(e=>e.id===n);function Dc(n,e){const t=Ma.filter(i=>i.quizzes.includes(n));return(t.find(i=>i.id!==e)||t[0]||Ma[0]).id}const Ru=n=>({id:n,revision:2,completed:[],checkpoint:0,sequence:[],commands:[],carrying:!1,data:{}});function Uo(n,e=0){return e>5?!1:n===null||typeof n=="boolean"?!0:typeof n=="number"?Number.isFinite(n)&&Math.abs(n)<1e4:typeof n=="string"?n.length<=80:Array.isArray(n)?n.length<=64&&n.every(t=>Uo(t,e+1)):!!n&&typeof n=="object"&&Object.keys(n).length<=32&&Object.entries(n).every(([t,i])=>!["__proto__","constructor","prototype"].includes(t)&&t.length<=40&&Uo(i,e+1))}function Kd(n){var e;if(!n||!Cn(n.id)||!Array.isArray(n.completed)||n.completed.length>3||n.completed.some((t,i)=>t!==i)||!Number.isInteger(n.checkpoint)||n.checkpoint<0||n.checkpoint>3||!Array.isArray(n.sequence)||n.sequence.length>3||!Array.isArray(n.commands)||n.commands.length>16||typeof n.carrying!="boolean"||n.revision!==void 0&&n.revision!==2||n.revision===2&&(!Uo(n.data)||Array.isArray(n.data)||typeof n.data!="object"||!n.data))return null;if(n.revision===2){const t=n.data,i=["inspected","evidence","links","order","notes","claims","commands","wires","cells","bins","samples","observations","layout","edges","route","delivered"];for(const s of i)if(t[s]!==void 0&&(!Array.isArray(t[s])||t[s].some(r=>!Number.isFinite(r))))return null;for(const[s,r]of[["links",3],["order",4],["bins",3],["placements",3],["layout",3]])if(t[s]!==void 0&&(!Array.isArray(t[s])||t[s].length!==r))return null;if((e=t.placements)!=null&&e.some(s=>s!==null&&(!Number.isInteger(s.x)||!Number.isInteger(s.y)||typeof s.rotate!="boolean"))||t.letters!==void 0&&(!Array.isArray(t.letters)||t.letters.length>3||t.letters.some(s=>!["...","---"].includes(s)))||t.current!==void 0&&(typeof t.current!="string"||!/^[-.]{0,3}$/.test(t.current)))return null}return{...Ru(n.id),completed:[...n.completed],checkpoint:n.revision===2?n.checkpoint:0,data:n.revision===2?structuredClone(n.data):{}}}function ti(n){return["owl","pigeon","raccoon"].findIndex(e=>!n.seals.includes(e))<0?3:["owl","pigeon","raccoon"].findIndex(e=>!n.seals.includes(e))}function On(n){var e,t;return(t=Cn((e=n.scenario)==null?void 0:e.id))==null?void 0:t.steps[ti(n)]}function Ri(n){const e=On(n);if(!e)return{};const t=n.scenario;return t.data.task!==e.kind&&(t.data={task:e.kind},t.checkpoint=0),t.data}function rr(n){var r,o;const e=ti(n),t=On(n);if(!t)return null;Ri(n);const i=n.scenario.completed.includes(e),s=(i?(r=t.points)==null?void 0:r.at(-1):(o=t.points)==null?void 0:o[n.scenario.checkpoint])||t;return{id:`scenario:${n.scenario.id}:${e}:${n.scenario.checkpoint}:${i}`,kind:"scenario",index:e,...s,title:i?"משימת השטח הושלמה — לתיק הלימוד":t.title,hint:i?"לחצו על פעולה כדי להמשיך לשאלות.":t.hint,action:i?"לשאלות התרגול":"למשימת השטח"}}const Cu=["צילום: שלושה חלונות מוארים","ניחוש: מישהו כנראה נשאר בכיתה","לוג: הפסקת חשמל ב־18:12","דעה: זה המסוף הכי גרוע","כרטיס כניסה חתום ב־18:05","שמועה: התקלה קרתה בגלל שועל"],Zd=[{label:"18:12 · הפסקת חשמל",time:12},{label:"18:20 · נעילת המבנה",time:20},{label:"18:00 · פתיחת המעבדה",time:0},{label:"18:05 · כניסת הצוות",time:5}],Er=[[0,1],[1,3],[3,4],[4,5],[1,2],[2,5],[0,3],[3,5]],Pu=[0,1,2,3,4,8];function Lu(n){let e=0,t=0;const i=[{x:e,z:t}];for(const s of n){const r=[[1,0],[0,1],[-1,0],[0,-1]][s];if(!r)return{ok:!1,trail:i};if(e+=r[0],t+=r[1],i.push({x:e,z:t}),e<0||e>4||t<0||t>4||[[1,1],[2,1],[2,2],[3,3]].some(o=>o[0]===e&&o[1]===t))return{ok:!1,trail:i}}return{ok:e===4&&t===4,trail:i}}function Fo(n){const e=[[2,2],[2,1],[1,2]],t=[];for(let i=0;i<3;i++){const s=n==null?void 0:n[i];if(!s)continue;let[r,o]=e[i];s.rotate&&([r,o]=[o,r]);for(let a=0;a<o;a++)for(let l=0;l<r;l++){const c=s.x+l,u=s.y+a;if(c<0||c>3||u<0||u>2)return null;const d=u*4+c;if(t.some(f=>f.id===d))return null;t.push({id:d,piece:i})}}return t}function Du(n){const e=[[0,3,8,12],[3,0,4,10],[8,4,0,5],[12,10,5,0]];let t=0,i=0;for(const s of n)t+=e[i][s+1],i=s+1;return t}const fr=(n,e)=>Array.isArray(n)&&n.length===e.length&&[...n].sort((t,i)=>t-i).every((t,i)=>t===[...e].sort((s,r)=>s-r)[i]),Ps=(n,e)=>n.includes(e)?n.filter(t=>t!==e):[...n,e];function No(n,e,t={x:0,z:0},i={}){const s=n.scenario,r=On(n),o=ti(n);if(!s||!r)return{ok:!1,message:"אין משימת שטח פעילה."};if(s.completed.includes(o))return{ok:!0,complete:!0,message:"השלב כבר הושלם."};const a=Ri(n),l=rr(n);if(Math.hypot(t.x-l.x,t.z-l.z)>2.2)return{ok:!1,message:"התקרבו למקום המשימה בשטח."};const c=r.kind,u=e.value;let d=!1,f="הפעולה עוד לא משלימה את המשימה. בדקו את הנתונים ונסו שוב.",h=!0;if(e.type==="reset")return s.data={task:c},{ok:!0,message:"משימת השטח אופסה. אפשר לנסות דרך אחרת."};if(e.type==="clear"&&["a","b","c","number","vehicle","answer","selected","rotate"].includes(e.key)&&delete a[e.key],e.type==="set"&&typeof e.key=="string"&&["a","b","c","number","vehicle","answer","selected","rotate"].includes(e.key)&&Number.isFinite(u)&&Math.abs(u)<1e3&&(a[e.key]=u),c==="evidence-scene"&&(a.inspected??(a.inspected=[]),a.evidence??(a.evidence=[]),e.type==="inspect"&&Number.isInteger(u)&&u>=0&&u<6&&(a.inspected=Ps(a.inspected,u),f=Cu[u]),e.type==="collect"&&a.inspected.includes(u)&&(a.evidence=Ps(a.evidence,u),f="הממצא עודכן בתיק הראיות."),e.type==="submit"&&(d=fr(a.evidence,[0,2,4]))),c==="evidence-board"&&(a.links??(a.links=[-1,-1,-1]),e.type==="link"&&[0,1,2].includes(e.row)&&[0,1,2].includes(u)&&(a.links[e.row]=u),e.type==="submit"&&(d=a.links.every((p,_)=>p===[2,0,1][_]))),c==="evidence-timeline"){if(a.order??(a.order=[0,1,2,3]),e.type==="move"&&Number.isInteger(e.row)&&[0,1,2,3].includes(e.row)&&[-1,1].includes(u)){const p=e.row+u;p>=0&&p<4&&([a.order[e.row],a.order[p]]=[a.order[p],a.order[e.row]])}e.type==="submit"&&(d=a.order.every((p,_)=>p===[2,3,0,1][_]))}if(c==="witness-interview"){if(a.notes??(a.notes=[]),e.type==="ask"&&[0,1].includes(e.row)&&[0,1,2].includes(u)){const p=e.row*3+u;a.notes.includes(p)||a.notes.push(p),f=[["נועה: הייתי בספרייה.","נועה: ראיתי את השעון מציג 18:10.","נועה: איתי עבר ליד החממה."],["איתי: שמעתי מים ליד מקום ישיבה.","איתי: הסתכלתי בשעון ב־18:20.","איתי: העד היה לבד."]][e.row][u]}e.type==="submit"&&(d=[0,1,3].every(p=>a.notes.includes(p)))}if(c==="witness-timetable"&&(a.claims??(a.claims=[]),e.type==="claim"&&[0,1,2,3].includes(u)&&(a.claims=Ps(a.claims,u)),e.type==="submit"&&(d=fr(a.claims,[1,3]))),c==="witness-search"){if(e.type==="search"&&[0,1,2].includes(u))return s.checkpoint=u,{ok:!0,walk:!0,message:"אתר החיפוש סומן. לכו אליו ובדקו בשטח."};e.type==="find"&&(d=s.checkpoint===2,f=d?"העד נמצא ליד המים והספסל.":"אין כאן עד. חפשו מקום שיש בו גם מים וגם ישיבה.")}if(c==="robot-route"&&(a.commands??(a.commands=[]),e.type==="command"&&[0,1,2,3].includes(u)&&a.commands.length<16&&a.commands.push(u),e.type==="execute"&&(a.executed=!0,d=Lu(a.commands).ok,f="הרובוט לא הגיע ליעד. בדקו את הרשת והמחסומים.")),c==="robot-circuit"&&(a.wires??(a.wires=[]),e.type==="wire"&&[0,1,2,3].includes(e.row)&&[0,1,2,3].includes(u)&&(u===[2,0,3,1][e.row]?(a.wires=Ps(a.wires,e.row),f="החיבור תקין."):(h=!1,f="הצורה והצבע אינם תואמים. החיבור לא נשמר.")),e.type==="submit"&&(d=fr(a.wires,[0,1,2,3]))),c==="robot-escort"&&e.type==="checkpoint"){const p=i.companion;if(!p||Math.hypot(p.x-l.x,p.z-l.z)>3)return{ok:!1,message:"חכו לרובוט. גם הוא צריך להגיע לתחנה."};if(s.checkpoint<2)return s.checkpoint++,{ok:!0,walk:!0,message:"הרובוט הגיע. ממשיכים יחד לתחנה הבאה."};d=!0}if(c==="survey-ruler"&&e.type==="submit"&&(d=a.a===2&&a.b===9&&a.number===7),c==="survey-parcel"&&(a.cells??(a.cells=[]),e.type==="cell"&&Number.isInteger(u)&&u>=0&&u<12&&(a.cells=Ps(a.cells,u)),e.type==="submit"&&(d=fr(a.cells,Pu)&&a.number===6)),c==="survey-scale"&&e.type==="submit"&&(d=a.a===40&&a.b===30),c==="freight-manifest"&&e.type==="submit"&&(d=a.a===2.5&&a.b===80&&a.vehicle===1),c==="freight-balance"&&(a.bins??(a.bins=[-1,-1,-1]),e.type==="bin"&&[0,1,2].includes(e.row)&&[0,1].includes(u)&&(a.bins[e.row]=u),e.type==="submit")){const p=[2,3,5],_=a.bins.reduce((m,E,T)=>m+(E===0?p[T]:0),0),x=a.bins.reduce((m,E,T)=>m+(E===1?p[T]:0),0);d=a.bins.every(m=>m>=0)&&_===x}if(c==="freight-packing"){if(a.placements??(a.placements=[null,null,null]),e.type==="place"&&[0,1,2].includes(a.selected)&&Number.isInteger(u)&&u>=0&&u<12){const p=[...a.placements];p[a.selected]={x:u%4,y:Math.floor(u/4),rotate:a.rotate===1},Fo(p)?(a.placements=p,f="החלק הוצב בארגז."):(h=!1,f="החלק חורג מהארגז או חופף לחלק אחר.")}e.type==="submit"&&(d=a.placements.every(Boolean)&&Fo(a.placements)!==null)}if(c==="optics-focus"&&e.type==="submit"&&(d=a.a===7&&a.b===3),c==="optics-parallax"&&e.type==="submit"&&(d=a.a===0&&a.b===0),c==="optics-samples"&&(a.samples??(a.samples=[]),e.type==="sample"&&a.samples.length<5&&a.samples.push([4.1,4.2,9.8,4.2,4.3][a.samples.length]),e.type==="submit"&&(d=a.samples.length===5&&a.selected===2&&Math.abs(a.number-4.2)<.001)),c==="shadow-light"&&e.type==="submit"&&(d=a.a===1&&a.b===3),c==="shadow-height"&&e.type==="submit"&&(d=a.a===2&&a.number===6),c==="shadow-sundial"&&(a.observations??(a.observations=[]),e.type==="observe"&&[10,14].includes(a.a)&&!a.observations.includes(a.a)&&a.observations.push(a.a),e.type==="submit"&&(d=fr(a.observations,[10,14])&&a.answer===14)),c==="rescue-trust"&&e.type==="befriend"&&(d=(a.trust||0)>=3,f="התכופפו ליד השועל והמתינו עד שמד האמון יתמלא."),c==="rescue-shelter"&&(a.layout??(a.layout=[-1,-1,-1]),e.type==="shelter"&&[0,1,2].includes(a.selected)&&Number.isInteger(u)&&u>=0&&u<9&&(a.layout[a.selected]=u),e.type==="submit"&&(d=a.layout[0]%3===0&&a.layout[1]<3&&a.layout[1]>=0&&a.layout[2]===4&&new Set(a.layout).size===3&&!a.layout.includes(7))),c==="rescue-care"&&(a.calm??(a.calm=0),a.water??(a.water=0),a.rest??(a.rest=0),e.type==="care"&&(u===0&&(a.calm=Math.min(3,a.calm+1),f="השועל נרגע קצת."),u===1&&(a.calm<3?(h=!1,f="השועל עדיין חושש. קודם יוצרים שקט."):(a.water=Math.min(2,a.water+1),f="השועל שותה.")),u===2&&(a.water<2?(h=!1,f="השועל עדיין צריך מים לפני מנוחה."):(a.rest=1,f="השועל נח במחסה."))),e.type==="submit"&&(d=a.calm===3&&a.water===2&&a.rest===1)),c==="relay-wave"&&e.type==="submit"&&(d=a.a===3&&a.b===2),c==="relay-morse"&&(a.letters??(a.letters=[]),a.current??(a.current=""),e.type==="symbol"&&[".","-"].includes(u)&&a.current.length<3&&(a.current+=u),e.type==="letter"&&(["...","---"].includes(a.current)&&a.letters.length<3?(a.letters.push(a.current),a.current="",f="האות שודרה."):(h=!1,f="אות מכילה שלוש נקודות או שלושה קווים. אפסו אם צריך.")),e.type==="submit"&&(d=JSON.stringify(a.letters)===JSON.stringify(["...","---","..."])&&a.current==="")),c==="relay-network"&&(a.edges??(a.edges=[]),e.type==="edge"&&Number.isInteger(u)&&u>=0&&u<Er.length&&(a.edges=Ps(a.edges,u)),e.type==="submit")){const p=new Set([0]);for(let _=0;_<6;_++)for(const x of a.edges){const[m,E]=Er[x];p.has(m)&&p.add(E),p.has(E)&&p.add(m)}d=[0,1,3,4,5].every(_=>p.has(_))&&!a.edges.some(_=>Er[_].includes(2))}if(c==="courier-plan"&&(a.route??(a.route=[]),e.type==="stop"&&[0,1,2].includes(u)&&!a.route.includes(u)&&a.route.push(u),e.type==="submit"&&(d=a.route.length===3&&a.route.indexOf(0)<a.route.indexOf(1)&&a.route.at(-1)===2&&Du(a.route)<=14)),c==="courier-course"&&e.type==="checkpoint"){if(!(s.checkpoint===1?i.dashing:s.checkpoint===3?t.y===0:t.y>.25))return{ok:!1,message:s.checkpoint===1?"הטבעת דורשת זינוק ב־Q.":s.checkpoint===3?"נחתו ועמדו בסימון האחרון.":"קפצו בתוך הטבעת."};if(s.checkpoint<3)return s.checkpoint++,{ok:!0,walk:!0,message:"החיישן הופעל. התנועה הבאה מסומנת."};d=!0}if(c==="courier-lockers"&&(a.delivered??(a.delivered=[]),e.type==="deliver"&&[0,1,2].includes(u))){if(u!==[1,2,0][s.checkpoint]||a.delivered.includes(u))return{ok:!1,message:"קוד החבילה לא מתאים לארונית. החבילה נשארה בתיק."};if(a.delivered.push(u),s.checkpoint<2)return s.checkpoint++,{ok:!0,walk:!0,message:"החבילה נמסרה. הארונית הבאה מסומנת."};d=!0}return d?(s.completed.push(o),s.carrying=!1,{ok:!0,complete:!0,message:"✓ משימת השטח הושלמה. ממשיכים לתיק הלימוד."}):{ok:e.type==="submit"||e.type==="execute"||e.type==="befriend"?!1:h,message:f}}function Jd(n,e,t,i){var o;const s=On(n);if(!s||n.scenario.completed.includes(ti(n)))return;const r=Ri(n);if(s.kind==="rescue-trust"){const a=((o=t.companion)==null?void 0:o.type)==="fox"?t.companion:s,l=Math.hypot(e.x-a.x,e.z-a.z)<2.2;r.trust=Math.max(0,Math.min(3,(r.trust||0)+(l&&t.crouching&&!t.dashing?i:-i*.5)))}}const Ci=n=>String(n??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),ht=(n,e,t="",i="",s="")=>`<button class="secondary task-action" data-action="${e}" data-value="${t}" data-row="${i}" ${s}>${Ci(n)}</button>`,It=(n="בדיקת המשימה")=>`<button class="primary task-action" data-action="submit" data-value="" data-row="">${Ci(n)}</button>`,Ni=(n,e,t="")=>`<label class="task-input">${Ci(n)}<input type="number" inputmode="decimal" step="any" data-key="${e}" value="${t??""}"></label>`,ii=(n,e,t,i,s)=>`<label class="task-input">${Ci(n)} <output data-readout="${e}">${t}</output><input type="range" min="${i}" max="${s}" step="1" data-key="${e}" value="${t}"></label>`,si=n=>`<div class="task-card">${n}</div>`,In=(n,e="0 0 260 150")=>`<svg class="task-diagram" viewBox="${e}" role="img" aria-label="תרשים המשימה">${n}</svg>`,sn=(n,e,t,i,s="#d6b783",r=3)=>`<line x1="${n}" y1="${e}" x2="${t}" y2="${i}" stroke="${s}" stroke-width="${r}"/>`,Zt=(n,e,t)=>`<text x="${n}" y="${e}" text-anchor="middle" fill="#edf1e9" font-size="12">${Ci(t)}</text>`,os=(n,e,t,i="#a8cbbb")=>`<circle cx="${n}" cy="${e}" r="${t}" fill="${i}"/>`,Xa=(n,e,t,i)=>`<div class="task-grid" style="--columns:${e}">${Array.from({length:n},(s,r)=>ht(i(r).label,t,r,"",`aria-label="משבצת ${r+1}: ${Ci(i(r).label||"פנויה")}" aria-pressed="${!!i(r).selected}" style="${i(r).style||""}"`)).join("")}</div>`,ll=["צפון ↑","מזרח →","דרום ↓","מערב ←"];function cn(n,e){if(n==="robot-route"){const t=Lu(e.commands||[]),i=e.executed?t.trail.at(-1):{x:0,z:0};return In(Array.from({length:25},(s,r)=>{const o=r%5,a=Math.floor(r/5),l=[[1,1],[2,1],[2,2],[3,3]].some(c=>c[0]===o&&c[1]===a);return`<rect x="${o*40+2}" y="${a*40+2}" width="36" height="36" fill="${l?"#875d4c":"#29434b"}"/>`+Zt(o*40+20,a*40+25,r===0?"S":r===24?"G":l?"×":"")}).join("")+(e.executed?`<polyline points="${t.trail.map(s=>`${s.x*40+20},${s.z*40+20}`).join(" ")}" fill="none" stroke="#f0d19a" stroke-width="3"/>`:"")+`<circle id="task-robot" cx="${i.x*40+20}" cy="${i.z*40+20}" r="9" fill="#b7ddc4"/>`,"0 0 200 200")}if(n==="robot-circuit")return In([0,1,2,3].map(t=>{const i=[2,0,3,1][t];return os(35,25+t*32,8,["#97c2dd","#d6b783","#9ac19a","#e1e8dd"][t])+os(225,25+t*32,8,["#d6b783","#e1e8dd","#97c2dd","#9ac19a"][t])+((e.wires||[]).includes(t)?sn(45,25+t*32,215,25+i*32):"")}).join(""));if(n==="survey-ruler")return In('<rect x="40" y="32" width="140" height="14" fill="#d6b783"/>'+Array.from({length:13},(t,i)=>sn(i*20,65,i*20,78)+Zt(i*20,95,i)).join("")+sn((e.a??0)*20,10,(e.a??0)*20,105,"#a9d8c3")+sn((e.b??12)*20,10,(e.b??12)*20,105,"#d5a69b"),"0 0 250 115");if(n==="survey-scale")return In('<rect x="45" y="20" width="160" height="100" fill="#29434b" stroke="#e0c28a"/>'+Zt(125,12,"4 ס״מ")+Zt(225,75,"3 ס״מ")+Zt(125,145,"1 ס״מ = 10 מ׳"));if(n==="freight-balance"){const t=e.bins||[-1,-1,-1],i=[2,3,5],s=i.reduce((o,a,l)=>o+(t[l]===0?a:0),0),r=i.reduce((o,a,l)=>o+(t[l]===1?a:0),0);return In(`<g transform="rotate(${(r-s)*2} 130 55)">${sn(30,55,230,55)}${sn(40,55,40,110)}${sn(220,55,220,110)}<path d="M10 110Q40 145 70 110M190 110Q220 145 250 110" fill="#64877b"/>${Zt(40,100,s+" ק״ג")}${Zt(220,100,r+" ק״ג")}</g><path d="M115 145L130 55L145 145Z" fill="#b39d77"/>`)}if(n==="optics-focus"){const t=Math.abs((e.a??0)-7)*.7,i=Math.max(.25,1-Math.abs((e.b??0)-3)*.15);return`<div class="focus-target" style="filter:blur(${t}px) brightness(${i})">${In('<path d="M35 115V25H65V115M100 115V45H130V115M165 115V65H195V115" fill="none" stroke="#e6e9d3" stroke-width="8"/>')}</div>`}if(n==="optics-parallax")return`<div class="sight-pair">${[e.a??-3,e.b??3].map((t,i)=>In(sn(65,15,65,105,"#e9d2a5",6)+sn(65+t*12,5,65+t*12,115,"#95c7bd",2)+sn(20,60,110,60,"#95c7bd",2)+Zt(65,135,i?"עין ימין":"עין שמאל"),"0 0 130 145")).join("")}</div>`;if(n==="optics-samples")return In((e.samples||[]).map((t,i)=>os(30+i*45,130-t*10,6,e.selected===i?"#dc9b83":"#a9d5bd")+Zt(30+i*45,148,t)).join(""));if(n==="shadow-light"){const t=e.a??0,i=[0,85,0,-85][t],s=[-50,0,50,0][t];return In(os(130+i,75+s,12,"#f1d69d")+sn(130,75,130-i*.8,75-s*.8,"#8ba0a7",12)+os(130,75,8)+Zt(130,14,"צפון")+Zt(245,78,"מזרח")+Zt(130,145,"דרום")+Zt(15,78,"מערב"))}if(n==="shadow-height")return In(sn(30,120,30,120-(e.a??1)*20,"#adc8af",7)+sn(125,120,125,10,"#c9b17e",9)+sn(30,125,90,125,"#879b9f",5)+sn(125,125,250,125,"#879b9f",5)+Zt(60,145,"צל: 3 מ׳")+Zt(190,145,"צל: 9 מ׳")+Zt(30,15,"ייחוס"));if(n==="shadow-sundial"){const t=e.a??9,i=(t-13)*.32,s=t===10?75:t===14?45:55+Math.abs(t-13)*8;return In('<ellipse cx="130" cy="80" rx="110" ry="55" fill="#29434b"/>'+sn(130,80,130+Math.sin(i)*s,80+Math.cos(i)*s,"#d6bd89",7)+os(130,80,6)+Zt(130,22,`${t}:00`))}if(n==="rescue-trust")return`<meter min="0" max="3" value="${e.trust||0}"></meter><p>${Math.round((e.trust||0)/3*100)}% אמון</p>`;if(n==="rescue-care")return["שקט","מים","מנוחה"].map((t,i)=>`<label>${t}<meter min="0" max="${[3,2,1][i]}" value="${[e.calm||0,e.water||0,e.rest||0][i]}"></meter></label>`).join("");if(n==="relay-wave"){const t=(i,s)=>Array.from({length:80},(r,o)=>`${o*3.2},${75+Math.sin(o/79*Math.PI*2*i+s)*38}`).join(" ");return In(`<polyline points="${t(3,2)}" fill="none" stroke="#f1d49a" stroke-dasharray="5 4" stroke-width="3"/><polyline points="${t(e.a??1,e.b??0)}" fill="none" stroke="#95cabb" stroke-width="2"/>`)}if(n==="relay-network"){const t=[[15,70],[65,20],[65,120],[125,70],[185,20],[245,70]];return In(Er.map(([i,s],r)=>sn(...t[i],...t[s],(e.edges||[]).includes(r)?"#edce93":"#42606a",(e.edges||[]).includes(r)?4:1)).join("")+t.map(([i,s],r)=>os(i,s,12,r===2?"#b77b67":"#83af9c")+Zt(i,s+4,r+1)).join(""))}return""}function Qd(n,e,t){const i=On(e),s=i.kind;let r=Ri(e);function o(){var u,d,f,h;r=Ri(e);let l="";const c=p=>`aria-pressed="${p}"`;if(s==="evidence-scene"&&(l='<p>זירת המעבדה · שישה פריטים לבדיקה</p><div class="task-grid" style="--columns:3">'+["חלונות ▤","כיסא ◇","יומן ▥","מסוף ▣","כרטיס ▱","עקבות ⋮"].map((p,_)=>{var x;return ht(p,"inspect",_,"",c((x=r.inspected)==null?void 0:x.includes(_)))}).join("")+"</div>"+(r.inspected||[]).map(p=>{var _;return si(`<p>${Ci(Cu[p])}</p>${ht((_=r.evidence)!=null&&_.includes(p)?"✓ בתיק":"לתיק הראיות","collect",p)}`)}).join("")+It("סיכום שלוש הראיות")),s==="evidence-board"&&(l=["צילום שלושה חלונות","לוג הפסקת חשמל","כרטיס כניסה חתום"].map((p,_)=>`<label class="task-input">${p}<select data-link-row="${_}"><option value="-1">בחרו מסקנה</option>${["מועד התקלה ידוע","הצוות נכנס לפני התקלה","נראו שלושה מקורות אור"].map((x,m)=>{var E;return`<option value="${m}" ${((E=r.links)==null?void 0:E[_])===m?"selected":""}>${x}</option>`}).join("")}</select></label>`).join("")+It("בדיקת הקשרים")),s==="evidence-timeline"&&(l=(r.order||[0,1,2,3]).map((p,_)=>si(`<strong>${Ci(Zd[p].label)}</strong><div class="task-row">${ht("למעלה ↑","move",-1,_,_===0?"disabled":"")}${ht("למטה ↓","move",1,_,_===3?"disabled":"")}</div>`)).join("")+It("הגשת השחזור")),s==="witness-interview"&&(l=["נועה · הספרייה","איתי · החממה"].map((p,_)=>si(`<h3>${p}</h3><div class="task-row">${["איפה היית?","מתי זה קרה?","את מי ראית?"].map((x,m)=>{var E;return ht(x,"ask",m,_,c((E=r.notes)==null?void 0:E.includes(_*3+m)))}).join("")}</div>`)).join("")+`<p>פרטי עדות שנאספו: ${((u=r.notes)==null?void 0:u.length)||0}</p>`+It("סיכום הראיונות")),s==="witness-timetable"&&(l=si("<p>מצלמות: 18:10 · נועה בספרייה, איתי בחממה<br>18:20 · איתי עדיין בחממה</p>")+["נועה בספרייה ב־18:10","איתי בספרייה ב־18:10","איתי בחממה ב־18:20","איתי ליד האגם ב־18:20"].map((p,_)=>{var x;return ht(p,"claim",_,"",c((x=r.claims)==null?void 0:x.includes(_)))}).join("")+It("בדיקת הסתירות")),s==="witness-search"&&(l=si(`<p>אתר נוכחי: ${["מגדל הקשר","המעבדה","הספסל ליד האגם"][e.scenario.checkpoint]}</p>${ht("בדיקת המקום הזה","find")}`)+["מגדל הקשר","המעבדה","הספסל ליד האגם"].map((p,_)=>ht("לחפש: "+p,"search",_)).join("")),s==="robot-route"&&(l=`<div data-preview>${cn(s,r)}</div><p dir="ltr">${(r.commands||[]).map(p=>["→","↓","←","↑"][p]).join(" ")||"S → G"}</p><div class="program-controls" dir="ltr">${["מזרחה →","דרומה ↓","מערבה ←","צפונה ↑"].map((p,_)=>ht(p,"command",_)).join("")}</div>${ht("הרצת המסלול","execute")}`),s==="robot-circuit"&&(l=`<div data-preview>${cn(s,r)}</div><h3>בוחרים יציאה</h3><div class="task-grid" style="--columns:2">${["△ כחול","○ זהוב","□ ירוק","◇ לבן"].map((p,_)=>ht(p,"set",_,"",`data-key="selected" ${c(r.selected===_)}`)).join("")}</div><h3>מחברים לכניסה</h3><div class="task-grid" style="--columns:2">${["○ זהוב","◇ לבן","△ כחול","□ ירוק"].map((p,_)=>ht(p,"wire",_,r.selected??-1)).join("")}</div><p>${((d=r.wires)==null?void 0:d.length)||0}/4 חיבורים תקינים</p>`+It("בדיקת המעגל")),s==="survey-ruler"&&(l=`<div data-preview>${cn(s,r)}</div>`+ii("קצה ראשון","a",r.a??0,0,12)+ii("קצה שני","b",r.b??12,0,12)+Ni("האורך בין הקצוות","number",r.number)+It("תיעוד המדידה")),s==="survey-parcel"&&(l=Xa(12,4,"cell",p=>{var _,x;return{label:(_=r.cells)!=null&&_.includes(p)?"✓":"",selected:(x=r.cells)==null?void 0:x.includes(p),style:Pu.includes(p)?"border-color:#e2c18b;background:#304a42":"background:#172630"}})+Ni("שטח החלקה במטרים רבועים","number",r.number)+It("שמירת גבולות ושטח")),s==="survey-scale"&&(l=`<div data-preview>${cn(s,r)}</div>`+Ni("רוחב המבנה בשטח, במטרים","a",r.a)+Ni("עומק המבנה בשטח, במטרים","b",r.b)+It("שמירת מפת השטח")),s==="freight-manifest"&&(l=si("<p>לוח: 250 ס״מ · צינור: 0.8 מ׳</p>")+Ni("אורך הלוח במטרים","a",r.a)+Ni("אורך הצינור בסנטימטרים","b",r.b)+"<h3>רכב הובלה</h3>"+["טנדר · אורך תא 2 מ׳","משאית · אורך תא 3 מ׳"].map((p,_)=>ht(p,"set",_,"",`data-key="vehicle" ${c(r.vehicle===_)}`)).join("")+It("אישור תעודת המשלוח")),s==="freight-balance"&&(l=`<div data-preview>${cn(s,r)}</div>`+[2,3,5].map((p,_)=>{var x,m;return si(`<strong>${p} ק״ג</strong><div class="task-row">${ht("כף שמאל","bin",0,_,c(((x=r.bins)==null?void 0:x[_])===0))}${ht("כף ימין","bin",1,_,c(((m=r.bins)==null?void 0:m[_])===1))}</div>`)}).join("")+It("שקילת המטען")),s==="freight-packing"){const p=Fo(r.placements)||[];l='<div class="task-row">'+["ריבוע ⁦2×2⁩","מלבן ⁦2×1⁩","צינור ⁦1×2⁩"].map((_,x)=>ht(_,"set",x,"",`data-key="selected" ${c(r.selected===x)}`)).join("")+"</div>"+ht(r.rotate?"✓ סיבוב של רבע סיבוב":"סיבוב החלק ↻","set",r.rotate?0:1,"",'data-key="rotate"')+Xa(12,4,"place",_=>{const x=p.find(m=>m.id===_);return{label:x?["א","ב","ג"][x.piece]:"·",style:x?`background:${["#5e8177","#8a7257","#5d7890"][x.piece]}`:""}})+It("סגירת הארגז")}s==="optics-focus"&&(l=`<div data-preview>${cn(s,r)}</div>`+ii("מיקוד","a",r.a??0,0,10)+ii("חשיפה","b",r.b??0,0,8)+It("צילום לוח הכיול")),s==="optics-parallax"&&(l=`<div data-preview>${cn(s,r)}</div>`+ii("זווית עין שמאל","a",r.a??-3,-4,4)+ii("זווית עין ימין","b",r.b??3,-4,4)+It("אישור יישור המבטים")),s==="optics-samples"&&(l=`<div data-preview>${cn(s,r)}</div>${ht("קחו מדידה נוספת","sample","","",(((f=r.samples)==null?void 0:f.length)||0)>=5?"disabled":"")}<p>${((h=r.samples)==null?void 0:h.length)||0}/5 מדידות</p>`+(r.samples||[]).map((p,_)=>ht(`${p} · ${r.selected===_?"✓ חריגה":"סימון כחריגה"}`,"set",_,"",'data-key="selected"')).join("")+Ni("ממוצע ארבע המדידות התקינות","number",r.number)+It("אישור סדרת המדידות")),s==="shadow-light"&&(l=`<div data-preview>${cn(s,r)}</div><h3>מיקום מקור האור</h3><div class="task-grid" style="--columns:2">${ll.map((p,_)=>ht(p,"set",_,"",`data-key="a" ${c(r.a===_)}`)).join("")}</div><h3>כיוון הצל</h3><div class="task-grid" style="--columns:2">${ll.map((p,_)=>ht(p,"set",_,"",`data-key="b" ${c(r.b===_)}`)).join("")}</div>`+It("בדיקת התחזית")),s==="shadow-height"&&(l=`<div data-preview>${cn(s,r)}</div>`+ii("גובה עמוד הייחוס במטרים","a",r.a??1,1,4)+Ni("גובה המגדל במטרים","number",r.number)+It("רישום גובה המגדל")),s==="shadow-sundial"&&(l=`<div data-preview>${cn(s,r)}</div>`+ii("שעת התצפית","a",r.a??9,9,17)+ht("שמירת התצפית","observe")+`<p>תצפיות שנשמרו: ${(r.observations||[]).map(p=>`${p}:00 · צל ${p===10?5:3} מ׳`).join(" / ")||"עדיין אין"}</p><h3>באיזו שעה הצל קצר יותר?</h3>`+[10,14].map(p=>ht(p+":00","set",p,"",`data-key="answer" ${c(r.answer===p)}`)).join("")+It("סיכום התצפיות")),s==="rescue-trust"&&(l=`<div data-preview>${cn(s,r)}</div>`+ht("להציע חברות לשועל","befriend")),s==="rescue-shelter"&&(l='<div class="task-row">'+["קערת מים","מצע רך","גגון"].map((p,_)=>ht(p,"set",_,"",`data-key="selected" ${c(r.selected===_)}`)).join("")+"</div>"+Xa(9,3,"shelter",p=>({label:p===7?"כניסה":(r.layout||[]).includes(p)?["מים","מצע","גגון"][(r.layout||[]).indexOf(p)]:"·",style:p===7?"border-color:#d7c08d":""}))+It("בדיקת המחסה")),s==="rescue-care"&&(l=`<div data-preview>${cn(s,r)}</div>`+["יוצרים שקט ליד השועל","מציעים קערת מים","נותנים לנוח במחסה"].map((p,_)=>ht(p,"care",_)).join("")+It("בדיקת צורכי השועל")),s==="relay-wave"&&(l=`<div data-preview>${cn(s,r)}</div>`+ii("תדירות","a",r.a??1,1,6)+ii("מופע","b",r.b??0,0,5)+It("נעילת הסנכרון")),s==="relay-morse"&&(l=si(`<p dir="ltr" class="morse-code">${(r.letters||[]).join(" / ")} / ${Ci(r.current||"")}</p><div class="task-row">${ht("נקודה ·","symbol",".")}${ht("קו —","symbol","-")}${ht("סיום אות","letter")}</div>`)+It("שידור ההודעה")),s==="relay-network"&&(l=`<div data-preview>${cn(s,r)}</div><div class="task-grid" style="--columns:2">${Er.map(([p,_],x)=>{var m;return ht(`תחנה ${p+1} ↔ תחנה ${_+1}`,"edge",x,"",c((m=r.edges)==null?void 0:m.includes(x)))}).join("")}</div>`+It("בדיקת חיבור הרשת")),s==="courier-plan"&&(l=si("<p>כניסה→מחסן: 3 · כניסה→מעבדה: 8 · כניסה→שער: 12<br>מחסן→מעבדה: 4 · מחסן→שער: 10 · מעבדה→שער: 5</p>")+'<div class="task-row">'+["מחסן ומפתח","מעבדה","שער"].map((p,_)=>{var x;return ht(p,"stop",_,"",(x=r.route)!=null&&x.includes(_)?"disabled":"")}).join("")+`</div><p>${(r.route||[]).map(p=>["מחסן","מעבדה","שער"][p]).join(" ← ")||"בחרו עצירה ראשונה"}</p><strong>מרחק: ${Du(r.route||[])} / 14</strong>`+It("אישור תוכנית המסירה")),s==="courier-lockers"&&(l=si(`<h3>ארונית ${e.scenario.checkpoint+1} · קוד <bdi>${["4A","7C","2B"][e.scenario.checkpoint]}</bdi></h3><p>הקוד שעל החבילה צריך להיות הפוך לקוד הארונית.</p>`)+["B2","A4","C7"].map((p,_)=>ht((r.delivered||[]).includes(_)?`✓ ${p} נמסרה`:`מסירת חבילה ${p}`,"deliver",_,"",(r.delivered||[]).includes(_)?"disabled":"")).join("")),n.innerHTML=`<div class="task-workspace" data-task-kind="${s}">${l}<button class="text-button" data-action="reset" data-value="" data-row="">איפוס משימת השטח</button></div>`}function a(){const l=n.querySelector("[data-preview]");l&&(l.innerHTML=cn(s,r));for(const c of n.querySelectorAll("[data-readout]"))c.textContent=r[c.dataset.readout]??""}return n.onclick=l=>{const c=l.target.closest("button[data-action]");if(!c||!n.contains(c))return;let u=c.dataset.value;u!==""&&Number.isFinite(Number(u))&&(u=Number(u));const d={type:c.dataset.action,value:u,row:c.dataset.row===""?void 0:Number(c.dataset.row),key:c.dataset.key},f=t(d);if(!f.complete&&!f.walk){o();const h=[...n.querySelectorAll("button[data-action]")].find(p=>p.dataset.action===c.dataset.action&&p.dataset.value===c.dataset.value&&p.dataset.row===c.dataset.row&&p.dataset.key===c.dataset.key);h==null||h.focus({preventScroll:!0})}},n.oninput=l=>{const c=l.target;c.matches("input[data-key]")&&(t({type:c.value===""?"clear":"set",key:c.dataset.key,value:Number(c.value)},!1),a())},n.onchange=l=>{const c=l.target;c.matches("select[data-link-row]")&&t({type:"link",row:Number(c.dataset.linkRow),value:Number(c.value)})},o(),{render:o,refreshPreview:a}}function ef(n=globalThis.crypto){if(typeof n.randomUUID=="function")return n.randomUUID();const e=n.getRandomValues(new Uint8Array(16));e[6]=e[6]&15|64,e[8]=e[8]&63|128;const t=[...e].map(i=>i.toString(16).padStart(2,"0")).join("");return`${t.slice(0,8)}-${t.slice(8,12)}-${t.slice(12,16)}-${t.slice(16,20)}-${t.slice(20)}`}const kn=[{id:"bench",name:"הספסל ליד האגם",x:-6,z:10,range:3,kind:"rest",description:"פסק זמן קטן. הספסל לא ישאל מה הספקתם היום.",action:"לשבת לרגע"},{id:"door",name:"דלת המבואה",x:-2,z:-15.5,range:2.8,kind:"toggle",description:"הדלת הידנית של המבואה עדיין עובדת. בפנים: מקום שקט ולוח הפרויקט.",action:"לפתוח את הדלת"},{id:"lamp",name:"פנס הרחבה",x:-2,z:10,range:2.4,kind:"toggle",description:"מפסק מקומי. לפחות דבר אחד כאן לא דורש סיסמה.",action:"לכבות את הפנס"},{id:"basketball",name:"עמדת הקליעה",x:12,z:22,range:2.8,kind:"play",description:"הכדור נמצא על הקו. זריקה רגועה, בלי שעון ובלי טבלת דירוג.",action:"לזרוק לסל"},{id:"locker",name:"ארונית צוות איינשטיין",x:-10,z:-13,range:2.5,kind:"inspect",description:"על הדלת: ״ציוד משותף. רעיונות פחות״. בפנים נשאר פתק מסבב העבודה האחרון.",action:"לפתוח את הארונית"},{id:"noticeboard",name:"לוח ההאקתון",x:-4,z:5,range:2.4,kind:"clue",description:"רשימת סוף יום: כרטיס הגישה עבר מערבה מהספרייה; הגיבוי הונח ממזרח למעבדה; האנטנה נשארה בדרום־מערב. אף אחד לא סימן ״החזרתי״.",action:"לתעד את הרמז ביומן"},{id:"telescope",name:"עמדת תצפית לאגם",x:-8,z:16.7,range:2.5,kind:"observe",description:"עדשה מכוונת לאגם. אפשר להתקרב למראה בלי לרדוף אחרי בעלי החיים.",action:"להביט דרך העדשה"},{id:"water",name:"קערת המים",x:-8.5,z:8,range:2.5,kind:"care",description:"קערה נקייה בפינת הטבע. ממלאים מים ונותנים לבעלי החיים לבחור אם להתקרב.",action:"למלא מים"},{id:"planter",name:"ערוגת המעבדה",x:23,z:-6,range:2.5,kind:"care",description:"פרויקט השקיה שעובד גם בלי Wi-Fi. העלים קצת שמוטים; המשפך עדיין כאן.",action:"להשקות את הערוגה"},{id:"recycling",name:"פינת המחזור",x:5,z:10,range:2.5,kind:"help",description:"שלוש פחיות נשארו אחרי ההאקתון. ״מישהו יאסוף״ עדיין לא הגיע.",action:"לאסוף את הפחיות למחזור"},{id:"solar",name:"לוח תאורת השביל",x:19,z:8,range:2.6,kind:"puzzle",description:"שלושה מתגים, שלושה סימונים. הדליקו רק ירח ועץ כדי להאיר את פינת הטבע. אין קנס ואין לחץ זמן.",action:"לכוון את המתגים"},{id:"bike",name:"עמדת האופניים",x:-21,z:-8.5,range:2.5,kind:"play",description:"הפעמון תקוע בזווית. מיישרים, בודקים צלצול ומקווים שהשומר לא יחשוב שכבר בוקר.",action:"לבדוק את הפעמון"}];function Fr(n={}){const e=n&&typeof n=="object"&&!Array.isArray(n)?n:{},t=s=>Number.isSafeInteger(e[s])?Math.max(0,Math.min(9999,e[s])):0,i=s=>Array.isArray(s)?[...new Set(s.filter(r=>kn.some(o=>o.id===r)))]:[];return{checkedEquipment:Array.isArray(e.checkedEquipment)?[...new Set(e.checkedEquipment.filter(s=>["card","fuse","antenna"].includes(s)))]:[],visited:i(e.visited),doorOpen:e.doorOpen===!0,lampOn:e.lampOn!==!1,lockerOpen:e.lockerOpen===!0,waterFilled:e.waterFilled===!0,watered:e.watered===!0,recycled:e.recycled===!0,switches:[0,1,2].map(s=>Array.isArray(e.switches)&&e.switches[s]===!0),shots:t("shots"),observations:t("observations"),bells:t("bells"),helped:Array.isArray(e.helped)?[...new Set(e.helped.filter(s=>["owl","pigeon","raccoon"].includes(s)))]:[],animalNotes:Array.isArray(e.animalNotes)?[...new Set(e.animalNotes.filter(s=>Number.isInteger(s)&&s>=0&&s<19))]:[],following:Number.isInteger(e.following)&&e.following>=0&&e.following<16?e.following:null,seated:e.seated===!0}}const Nr=n=>n.switches[0]&&!n.switches[1]&&n.switches[2];function Ia(n,e){return{bench:e.seated?"יושבים":"פנוי",door:e.doorOpen?"פתוחה":"סגורה",lamp:e.lampOn?"דולק":"כבוי",basketball:`${e.shots} קליעות`,locker:e.lockerOpen?"פתוחה":"סגורה",noticeboard:e.visited.includes("noticeboard")?"הרמז תועד":"רמז חדש",telescope:`${e.observations} תצפיות`,water:e.waterFilled?"הקערה מלאה":"הקערה ריקה",planter:e.watered?"הערוגה הושקתה":"זקוקה למים",recycling:e.recycled?"הרחבה נקייה":"3 פחיות בשטח",solar:Nr(e)?"השביל מואר":"התאורה כבויה",bike:`${e.bells} צלצולים`}[n.id]}function Iu(n,e){return{bench:e.seated?"לקום ולהמשיך":n.action,door:e.doorOpen?"לסגור את הדלת":n.action,lamp:e.lampOn?n.action:"להדליק את הפנס",locker:e.lockerOpen?"לסגור את הארונית":n.action,water:e.waterFilled?"לצפות ליד קערת המים":n.action,planter:e.watered?"לבדוק את העלים":n.action,recycling:e.recycled?"לבדוק את הפינה הנקייה":n.action,noticeboard:e.visited.includes("noticeboard")?"לקרוא שוב את הרמז":n.action}[n.id]||n.action}const Ye=[{id:"owl",name:"נועה",role:"צוות התוכנה · הספרייה",system:"מסוף הגישה",color:"#91b6c5",x:-13,z:-9,line:"המסוף נתקע וכולם שולחים לי הוראות שונות. אני צריכה לבדוק מה באמת קרה, לא עוד עשר השערות. אפשר לעבור איתי על הדברים אחד־אחד?",choices:["נקשיב למה שכבר בדקה ונבחר יחד צעד אחד","ננסה לשנות הכול בבת אחת","נחליט שהיא לא מבינה ונתפוס פיקוד"],need:0,reply:"מעולה. סוף סוף מישהו שלא מציע לכבות ולהדליק את כל בית הספר.",wrong:"נועה מצביעה על רשימת הבדיקות. היא מבקשת שיתוף פעולה וסדר, לא עוד רעש."},{id:"pigeon",name:"איתי",role:"צוות הרובוטיקה · החממה",system:"מערכת הגיבוי",color:"#b5bd9d",x:13,z:-7,line:"אני מחזיק את בקר הגיבוי כבר רבע שעה, ואף אחד לא שאל אם אני צריך עזרה. לא, הכול בסדר. ברור. רק קצת נגמרות לי הידיים.",choices:["נשאל מה אפשר לקחת ממנו ונתחלק במשימה","נגיד לו להפסיק להתלונן","נתחיל להסביר לו איך לעבוד מהר יותר"],need:0,reply:"קחו את החלק של למצוא ציוד. אני אקח את החלק של לא להפיל את הפרויקט של כל הכיתה.",wrong:"הוא מסתכל על הציוד שבידיים שלו. הבעיה היא עומס, לא חוסר ידע."},{id:"raccoon",name:"אדם",role:"צוות התקשורת · מגדל הקשר",system:"ערוץ הקשר",color:"#c6aa83",x:10,z:14,line:"שמעתם את הרעש מהיער? אני יודע שזאת כנראה חיה. עדיין, מעדיף לא לעבור שם לבד. לא צריך להכריז על זה בקבוצת הכיתה.",choices:["נציע להתקדם יחד ולשמור את זה בינינו","נצלם אותו כדי להצחיק את הקבוצה","נגיד שאין שום סיבה להרגיש ככה"],need:0,reply:"תודה. מסתבר שעבודת צוות היא גם לצאת מהמצגת וללכת ביחד.",wrong:"אדם ביקש חברה ודיסקרטיות. אפשר לעזור בלי לבטל את מה שהוא מרגיש."}],Gt=[{id:"card",name:"כרטיס צוות איינשטיין",short:"כרטיס גישה",x:-21,z:-3,npc:0,hint:"על שולחן העבודה שממערב לספרייה, ליד השביל לאגם.",clue:"על הכרטיס כתוב: צוות איינשטיין — כיתת הייטק. בגב הכרטיס רשומה הערה: נוהל היציאה דורש אימות של שלושת מסופי הפרויקט.",report:"כרטיס הגישה נמצא. המסוף בספרייה יכול להתחבר עכשיו למערכת התרגול."},{id:"fuse",name:"יחידת גיבוי לפרויקט",short:"יחידת גיבוי",x:21,z:3,npc:1,hint:"בארגז הציוד שממזרח לחממה. חפשו את הסימון הצהוב.",clue:"זו יחידת גיבוי לימודית של הרובוטיקה. על המדבקה: מי שלוקח — מחזיר. מתחת, מישהו הוסיף: כן, גם אם זה עובד.",report:"יחידת הגיבוי נמצאה. איתי יוכל להפעיל את התחנה אחרי בדיקת התרגול."},{id:"antenna",name:"אנטנת תחנת הקשר",short:"אנטנה",x:-8,z:22,npc:2,hint:"ליד עמדת הקשר הישנה, בדרום־מערב המתחם.",clue:"מחברת פתוחה ליד האנטנה: צוות התקשורת, ז׳ איינשטיין. כששלוש התחנות פעילות, השער חוזר למצב יציאה. ברקע נשמע רעש — הפעם באמת ברווז.",report:"האנטנה נמצאה. חוזרים לאדם במגדל ומשלימים את בדיקת הקשר."}],Js={x:0,z:-25},Oo=(n,e=Math.random)=>{const t=[...n];for(let i=t.length-1;i>0;i--){const s=Math.floor(e()*(i+1));[t[i],t[s]]=[t[s],t[i]]}return t};function Uu(n){return!!n&&typeof n.id=="string"&&typeof n.title=="string"&&Array.isArray(n.references)&&Array.isArray(n.questions)&&n.questions.length>0&&n.questions.length<=30&&new Set(n.questions.map(e=>e.id)).size===n.questions.length&&n.questions.every(e=>{var t;return typeof e.id=="string"&&typeof e.prompt=="string"&&e.type==="mcq"&&Array.isArray(e.choices)&&e.choices.length>=2&&e.choices.every(i=>typeof i=="string")&&Number.isInteger(e.correct)&&e.correct>=0&&e.correct<e.choices.length&&typeof((t=e.explanation)==null?void 0:t.he)=="string"&&n.references.some(i=>{var s,r;return i.id===((s=e.ref)==null?void 0:s.id)&&(!e.ref.part||((r=i.parts)==null?void 0:r.some(o=>o.part===e.ref.part)))})})}function tf(n,e=Math.random){if(!Uu(n))throw new Error("Invalid quiz");const t=Oo(n.questions,e).map(i=>({...i,options:Oo(i.choices.map((s,r)=>({text:s,original:r})),e)}));return{quizId:n.id,questions:t,assignments:Ye.map((i,s)=>t.filter((r,o)=>o%3===s).map(r=>r.id)),environment:Fr(),stones:[],skyGates:[],answers:{},understood:[],seals:[],items:[],collected:[],elapsed:0,player:{x:0,z:9},startedAt:Date.now(),attemptId:ef()}}function nf(n,e,t){if(Object.hasOwn(n.answers,e))return null;const i=n.questions.find(r=>r.id===e);if(!i||!Number.isInteger(t)||t<0||t>=i.choices.length)return null;const s={choice:t,correct:t===i.correct};return n.answers[e]=s,s}function An(n,e){const t=n.assignments[e];return{answered:t.filter(i=>Object.hasOwn(n.answers,i)).length,total:t.length,next:t.find(i=>!Object.hasOwn(n.answers,i))}}function Fu(n){const e={easy:1,medium:1.5,hard:2},t=n.questions.reduce((i,s)=>i+(e[s.difficulty]||1.5),0);return Math.round(n.questions.reduce((i,s)=>{var r;return i+((r=n.answers[s.id])!=null&&r.correct?e[s.difficulty]||1.5:0)},0)/t*100)}const sf=n=>n>=90?3:n>=75?2:n>=50?1:0;function Pi(n){return n.seals.length===3&&Object.keys(n.answers).length===n.questions.length}function Nu(n,e){try{const t=JSON.parse(n);if(!t||t.quizId!==e.id||typeof t.attemptId!="string"||!Number.isFinite(t.startedAt)||!Number.isFinite(t.elapsed)||t.elapsed<0||!Array.isArray(t.questions)||t.questions.length!==e.questions.length||!t.player||!Number.isFinite(t.player.x)||!Number.isFinite(t.player.z)||Math.abs(t.player.x)>Si||Math.abs(t.player.z)>Si||t.participantName!==void 0&&(typeof t.participantName!="string"||!t.participantName.trim()||t.participantName.length>60))return null;const i=new Set;for(const s of t.questions){const r=e.questions.find(o=>o.id===s.id);if(!r||i.has(s.id)||JSON.stringify({...s,options:void 0})!==JSON.stringify(r)||(i.add(s.id),!Array.isArray(s.options)||s.options.length!==r.choices.length||new Set(s.options.map(o=>o.original)).size!==s.options.length||s.options.some(o=>r.choices[o.original]!==o.text)))return null}if(!t.answers||typeof t.answers!="object")return null;for(const[s,r]of Object.entries(t.answers)){const o=e.questions.find(a=>a.id===s);if(!o||!Number.isInteger(r.choice)||r.choice<0||r.choice>=o.choices.length||r.correct!==(r.choice===o.correct))return null}if(t.assignments=Ye.map((s,r)=>t.questions.filter((o,a)=>a%3===r).map(o=>o.id)),!Array.isArray(t.understood)||t.understood.some(s=>!Ye.some(r=>r.id===s))||(t.items=Array.isArray(t.items)?[...new Set(t.items.filter(s=>Gt.some(r=>r.id===s)))]:[],t.relay&&!jd(t.relay)))return null;if(t.seals=Ye.filter((s,r)=>(t.relay?Qi(t.relay,r):t.understood.includes(s.id)&&t.items.includes(Gt[r].id))&&An(t,r).answered===An(t,r).total).map(s=>s.id),t.collected=Array.isArray(t.collected)?[...new Set(t.collected.filter(s=>Number.isInteger(s)&&s>=0&&s<12))]:[],t.scenario!==void 0){if(t.scenario=Kd(t.scenario),!t.scenario)return null;t.seals=t.seals.filter(s=>t.scenario.completed.includes(Ye.findIndex(r=>r.id===s)))}return t.stones=Hd(t.stones),t.skyGates=Zs.map((s,r)=>r).filter(s=>Array.isArray(t.skyGates)&&t.skyGates.includes(s)),t.environment=Fr(t.environment),t}catch{return null}}function es(n,e,t=n.player){if(Pi(n))return{id:"exit",kind:"exit",...Js,title:"השער פתוח — יוצאים הביתה",hint:"לכו בעקבות השביל המואר ולחצו על כפתור היציאה ליד השער.",action:"לשער היציאה"};if(n.scenario)return rr(n);const i=Ye.map((u,d)=>d).filter(u=>!n.seals.includes(Ye[u].id));if(n.relay)return Yd(n.relay,i,e,t);const s=i.filter(u=>n.understood.includes(Ye[u].id)||n.items.includes(Gt[u].id)),r=s.length?s:i,o=i.includes(e)?e:r.sort((u,d)=>Math.hypot(t.x-Ye[u].x,t.z-Ye[u].z)-Math.hypot(t.x-Ye[d].x,t.z-Ye[d].z))[0],a=Ye[o],l=Gt[o];if(!n.understood.includes(a.id))return{id:a.id+":meet",kind:"npc",index:o,x:a.x,z:a.z,title:`דברו עם ${a.name}`,hint:`${["ליד הספרייה","ליד החממה","ליד מגדל הקשר"][o]} — התקרבו ולחצו על שיחה. ${a.name} מחכה לכם.`,action:`אל ${a.name}`};if(!n.items.includes(l.id))return{id:l.id+":find",kind:"equipment",index:o,x:l.x,z:l.z,title:`מצאו ובדקו ${l.short}`,hint:l.hint,action:"לציוד החסר"};const c=An(n,o);return{id:a.id+":return",kind:"npc",index:o,x:a.x,z:a.z,title:`החזירו את הציוד ל${a.name}`,hint:`הציוד איתכם. חזרו לתחנה והשלימו ${c.total-c.answered} שאלות כדי להפעיל את ${a.system}.`,action:`חזרה ל${a.name}`}}const rf=[{id:"water",title:"עזרה בפינת הטבע",hint:"מלאו את קערת המים ותנו לארנב להתקרב.",done:n=>n.waterFilled},{id:"locker",title:"הפתק שנשאר מאחור",hint:"פתחו את ארונית הצוות כדי לחשוף רמז לאנטנה.",done:n=>n.visited.includes("locker")},{id:"solar",title:"להחזיר אור לשביל",hint:"כוונו את מתגי התאורה לפי הסימונים שעל המכסה.",done:n=>Nr(n)},{id:"basketball",title:"שלוש זריקות להפסקה",hint:"קלעו שלוש פעמים. אפילו השומר צריך הפסקה.",done:n=>n.shots>=3},{id:"telescope",title:"מי מסתובב באגם?",hint:"השתמשו בעמדת התצפית וגלו מי ממשיך בסיור.",done:n=>n.observations>0}],Ou={card:{title:"שחזור קוד הגישה",hint:"על הסורק חרוט הסדר: משולש ← ריבוע ← עיגול. לחצו על הסמלים באותו סדר.",options:["משולש △","ריבוע □","עיגול ○"],sequence:[0,1,2]},fuse:{title:"בדיקת יחידת ההדגמה",hint:"לפי המדבקה: מחברים את הכבל, מפעילים בדיקה, ואז נועלים את המכסה.",options:["בדיקה ◇","נעילת מכסה ▣","חיבור כבל ↔"],sequence:[2,0,1]},antenna:{title:"כיוון האות",hint:"במחברת מסומן ערוץ 5. כוונו את החוגה עד שהאות יציב, ואז אשרו."}};function af(n,e,t){var i,s;return((s=(i=Ou[n])==null?void 0:i.sequence)==null?void 0:s[e])===t}function js(n){if(!(n!=null&&n.scenario))return rf;const e={evidence:"lamp",witness:"telescope",robot:"planter",survey:"door",freight:"recycling",optics:"bench",shadow:"solar",rescue:"water",relay:"bike",courier:"basketball"},t=kn.find(r=>r.id===e[n.scenario.id]);if(!t)return[];const i={lamp:"בדיקת התאורה בזירה",telescope:"תצפית בעקבות העד",planter:"עזרה בחממת הרובוטיקה",door:"סקר הכניסה למבנה",recycling:"פינוי אזור השילוח",bench:"עמדת תצפית יציבה",solar:"להחזיר אור למסלול הצללים",water:"מים לחיות הקמפוס",bike:"בדיקת אות גיבוי קולי",basketball:"תרגול קליעה בין משלוחים"},s=r=>t.id==="solar"?Nr(r):t.id==="water"?r.waterFilled:t.id==="planter"?r.watered:t.id==="recycling"?r.recycled:t.id==="basketball"?r.shots>0:t.id==="telescope"?r.observations>0:t.id==="bike"?r.bells>0:r.visited.includes(t.id);return[{...t,title:i[t.id],hint:t.description,done:s}]}var of=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function cf(n){if(Object.prototype.hasOwnProperty.call(n,"__esModule"))return n;var e=n.default;if(typeof e=="function"){var t=function i(){return this instanceof i?Reflect.construct(e,arguments,this.constructor):e.apply(this,arguments)};t.prototype=e.prototype}else t={};return Object.defineProperty(t,"__esModule",{value:!0}),Object.keys(n).forEach(function(i){var s=Object.getOwnPropertyDescriptor(n,i);Object.defineProperty(t,i,s.get?s:{enumerable:!0,get:function(){return n[i]}})}),t}var ja={exports:{}};const lf={},uf=Object.freeze(Object.defineProperty({__proto__:null,default:lf},Symbol.toStringTag,{value:"Module"})),ul=cf(uf);/**
 * [js-sha256]{@link https://github.com/emn178/js-sha256}
 *
 * @version 0.11.1
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2014-2025
 * @license MIT
 */var dl;function df(){return dl||(dl=1,(function(n){(function(){var e="input is invalid type",t=typeof window=="object",i=t?window:{};i.JS_SHA256_NO_WINDOW&&(t=!1);var s=!t&&typeof self=="object",r=!i.JS_SHA256_NO_NODE_JS&&typeof process=="object"&&process.versions&&process.versions.node&&process.type!="renderer";r?i=of:s&&(i=self);var o=!i.JS_SHA256_NO_COMMON_JS&&!0&&n.exports,a=!i.JS_SHA256_NO_ARRAY_BUFFER&&typeof ArrayBuffer<"u",l="0123456789abcdef".split(""),c=[-2147483648,8388608,32768,128],u=[24,16,8,0],d=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298],f=["hex","array","digest","arrayBuffer"],h=[];(i.JS_SHA256_NO_NODE_JS||!Array.isArray)&&(Array.isArray=function(g){return Object.prototype.toString.call(g)==="[object Array]"}),a&&(i.JS_SHA256_NO_ARRAY_BUFFER_IS_VIEW||!ArrayBuffer.isView)&&(ArrayBuffer.isView=function(g){return typeof g=="object"&&g.buffer&&g.buffer.constructor===ArrayBuffer});var p=function(g,R){return function(D){return new T(R,!0).update(D)[g]()}},_=function(g){var R=p("hex",g);r&&(R=x(R,g)),R.create=function(){return new T(g)},R.update=function(b){return R.create().update(b)};for(var D=0;D<f.length;++D){var v=f[D];R[v]=p(v,g)}return R},x=function(g,R){var D=ul,v=ul.Buffer,b=R?"sha224":"sha256",A;v.from&&!i.JS_SHA256_NO_BUFFER_FROM?A=v.from:A=function(U){return new v(U)};var N=function(U){if(typeof U=="string")return D.createHash(b).update(U,"utf8").digest("hex");if(U==null)throw new Error(e);return U.constructor===ArrayBuffer&&(U=new Uint8Array(U)),Array.isArray(U)||ArrayBuffer.isView(U)||U.constructor===v?D.createHash(b).update(A(U)).digest("hex"):g(U)};return N},m=function(g,R){return function(D,v){return new C(D,R,!0).update(v)[g]()}},E=function(g){var R=m("hex",g);R.create=function(b){return new C(b,g)},R.update=function(b,A){return R.create(b).update(A)};for(var D=0;D<f.length;++D){var v=f[D];R[v]=m(v,g)}return R};function T(g,R){R?(h[0]=h[16]=h[1]=h[2]=h[3]=h[4]=h[5]=h[6]=h[7]=h[8]=h[9]=h[10]=h[11]=h[12]=h[13]=h[14]=h[15]=0,this.blocks=h):this.blocks=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],g?(this.h0=3238371032,this.h1=914150663,this.h2=812702999,this.h3=4144912697,this.h4=4290775857,this.h5=1750603025,this.h6=1694076839,this.h7=3204075428):(this.h0=1779033703,this.h1=3144134277,this.h2=1013904242,this.h3=2773480762,this.h4=1359893119,this.h5=2600822924,this.h6=528734635,this.h7=1541459225),this.block=this.start=this.bytes=this.hBytes=0,this.finalized=this.hashed=!1,this.first=!0,this.is224=g}T.prototype.update=function(g){if(!this.finalized){var R,D=typeof g;if(D!=="string"){if(D==="object"){if(g===null)throw new Error(e);if(a&&g.constructor===ArrayBuffer)g=new Uint8Array(g);else if(!Array.isArray(g)&&(!a||!ArrayBuffer.isView(g)))throw new Error(e)}else throw new Error(e);R=!0}for(var v,b=0,A,N=g.length,U=this.blocks;b<N;){if(this.hashed&&(this.hashed=!1,U[0]=this.block,this.block=U[16]=U[1]=U[2]=U[3]=U[4]=U[5]=U[6]=U[7]=U[8]=U[9]=U[10]=U[11]=U[12]=U[13]=U[14]=U[15]=0),R)for(A=this.start;b<N&&A<64;++b)U[A>>>2]|=g[b]<<u[A++&3];else for(A=this.start;b<N&&A<64;++b)v=g.charCodeAt(b),v<128?U[A>>>2]|=v<<u[A++&3]:v<2048?(U[A>>>2]|=(192|v>>>6)<<u[A++&3],U[A>>>2]|=(128|v&63)<<u[A++&3]):v<55296||v>=57344?(U[A>>>2]|=(224|v>>>12)<<u[A++&3],U[A>>>2]|=(128|v>>>6&63)<<u[A++&3],U[A>>>2]|=(128|v&63)<<u[A++&3]):(v=65536+((v&1023)<<10|g.charCodeAt(++b)&1023),U[A>>>2]|=(240|v>>>18)<<u[A++&3],U[A>>>2]|=(128|v>>>12&63)<<u[A++&3],U[A>>>2]|=(128|v>>>6&63)<<u[A++&3],U[A>>>2]|=(128|v&63)<<u[A++&3]);this.lastByteIndex=A,this.bytes+=A-this.start,A>=64?(this.block=U[16],this.start=A-64,this.hash(),this.hashed=!0):this.start=A}return this.bytes>4294967295&&(this.hBytes+=this.bytes/4294967296<<0,this.bytes=this.bytes%4294967296),this}},T.prototype.finalize=function(){if(!this.finalized){this.finalized=!0;var g=this.blocks,R=this.lastByteIndex;g[16]=this.block,g[R>>>2]|=c[R&3],this.block=g[16],R>=56&&(this.hashed||this.hash(),g[0]=this.block,g[16]=g[1]=g[2]=g[3]=g[4]=g[5]=g[6]=g[7]=g[8]=g[9]=g[10]=g[11]=g[12]=g[13]=g[14]=g[15]=0),g[14]=this.hBytes<<3|this.bytes>>>29,g[15]=this.bytes<<3,this.hash()}},T.prototype.hash=function(){var g=this.h0,R=this.h1,D=this.h2,v=this.h3,b=this.h4,A=this.h5,N=this.h6,U=this.h7,H=this.blocks,q,Z,ie,Q,te,ne,fe,Pe,ze,Je,ft;for(q=16;q<64;++q)te=H[q-15],Z=(te>>>7|te<<25)^(te>>>18|te<<14)^te>>>3,te=H[q-2],ie=(te>>>17|te<<15)^(te>>>19|te<<13)^te>>>10,H[q]=H[q-16]+Z+H[q-7]+ie<<0;for(ft=R&D,q=0;q<64;q+=4)this.first?(this.is224?(Pe=300032,te=H[0]-1413257819,U=te-150054599<<0,v=te+24177077<<0):(Pe=704751109,te=H[0]-210244248,U=te-1521486534<<0,v=te+143694565<<0),this.first=!1):(Z=(g>>>2|g<<30)^(g>>>13|g<<19)^(g>>>22|g<<10),ie=(b>>>6|b<<26)^(b>>>11|b<<21)^(b>>>25|b<<7),Pe=g&R,Q=Pe^g&D^ft,fe=b&A^~b&N,te=U+ie+fe+d[q]+H[q],ne=Z+Q,U=v+te<<0,v=te+ne<<0),Z=(v>>>2|v<<30)^(v>>>13|v<<19)^(v>>>22|v<<10),ie=(U>>>6|U<<26)^(U>>>11|U<<21)^(U>>>25|U<<7),ze=v&g,Q=ze^v&R^Pe,fe=U&b^~U&A,te=N+ie+fe+d[q+1]+H[q+1],ne=Z+Q,N=D+te<<0,D=te+ne<<0,Z=(D>>>2|D<<30)^(D>>>13|D<<19)^(D>>>22|D<<10),ie=(N>>>6|N<<26)^(N>>>11|N<<21)^(N>>>25|N<<7),Je=D&v,Q=Je^D&g^ze,fe=N&U^~N&b,te=A+ie+fe+d[q+2]+H[q+2],ne=Z+Q,A=R+te<<0,R=te+ne<<0,Z=(R>>>2|R<<30)^(R>>>13|R<<19)^(R>>>22|R<<10),ie=(A>>>6|A<<26)^(A>>>11|A<<21)^(A>>>25|A<<7),ft=R&D,Q=ft^R&v^Je,fe=A&N^~A&U,te=b+ie+fe+d[q+3]+H[q+3],ne=Z+Q,b=g+te<<0,g=te+ne<<0,this.chromeBugWorkAround=!0;this.h0=this.h0+g<<0,this.h1=this.h1+R<<0,this.h2=this.h2+D<<0,this.h3=this.h3+v<<0,this.h4=this.h4+b<<0,this.h5=this.h5+A<<0,this.h6=this.h6+N<<0,this.h7=this.h7+U<<0},T.prototype.hex=function(){this.finalize();var g=this.h0,R=this.h1,D=this.h2,v=this.h3,b=this.h4,A=this.h5,N=this.h6,U=this.h7,H=l[g>>>28&15]+l[g>>>24&15]+l[g>>>20&15]+l[g>>>16&15]+l[g>>>12&15]+l[g>>>8&15]+l[g>>>4&15]+l[g&15]+l[R>>>28&15]+l[R>>>24&15]+l[R>>>20&15]+l[R>>>16&15]+l[R>>>12&15]+l[R>>>8&15]+l[R>>>4&15]+l[R&15]+l[D>>>28&15]+l[D>>>24&15]+l[D>>>20&15]+l[D>>>16&15]+l[D>>>12&15]+l[D>>>8&15]+l[D>>>4&15]+l[D&15]+l[v>>>28&15]+l[v>>>24&15]+l[v>>>20&15]+l[v>>>16&15]+l[v>>>12&15]+l[v>>>8&15]+l[v>>>4&15]+l[v&15]+l[b>>>28&15]+l[b>>>24&15]+l[b>>>20&15]+l[b>>>16&15]+l[b>>>12&15]+l[b>>>8&15]+l[b>>>4&15]+l[b&15]+l[A>>>28&15]+l[A>>>24&15]+l[A>>>20&15]+l[A>>>16&15]+l[A>>>12&15]+l[A>>>8&15]+l[A>>>4&15]+l[A&15]+l[N>>>28&15]+l[N>>>24&15]+l[N>>>20&15]+l[N>>>16&15]+l[N>>>12&15]+l[N>>>8&15]+l[N>>>4&15]+l[N&15];return this.is224||(H+=l[U>>>28&15]+l[U>>>24&15]+l[U>>>20&15]+l[U>>>16&15]+l[U>>>12&15]+l[U>>>8&15]+l[U>>>4&15]+l[U&15]),H},T.prototype.toString=T.prototype.hex,T.prototype.digest=function(){this.finalize();var g=this.h0,R=this.h1,D=this.h2,v=this.h3,b=this.h4,A=this.h5,N=this.h6,U=this.h7,H=[g>>>24&255,g>>>16&255,g>>>8&255,g&255,R>>>24&255,R>>>16&255,R>>>8&255,R&255,D>>>24&255,D>>>16&255,D>>>8&255,D&255,v>>>24&255,v>>>16&255,v>>>8&255,v&255,b>>>24&255,b>>>16&255,b>>>8&255,b&255,A>>>24&255,A>>>16&255,A>>>8&255,A&255,N>>>24&255,N>>>16&255,N>>>8&255,N&255];return this.is224||H.push(U>>>24&255,U>>>16&255,U>>>8&255,U&255),H},T.prototype.array=T.prototype.digest,T.prototype.arrayBuffer=function(){this.finalize();var g=new ArrayBuffer(this.is224?28:32),R=new DataView(g);return R.setUint32(0,this.h0),R.setUint32(4,this.h1),R.setUint32(8,this.h2),R.setUint32(12,this.h3),R.setUint32(16,this.h4),R.setUint32(20,this.h5),R.setUint32(24,this.h6),this.is224||R.setUint32(28,this.h7),g};function C(g,R,D){var v,b=typeof g;if(b==="string"){var A=[],N=g.length,U=0,H;for(v=0;v<N;++v)H=g.charCodeAt(v),H<128?A[U++]=H:H<2048?(A[U++]=192|H>>>6,A[U++]=128|H&63):H<55296||H>=57344?(A[U++]=224|H>>>12,A[U++]=128|H>>>6&63,A[U++]=128|H&63):(H=65536+((H&1023)<<10|g.charCodeAt(++v)&1023),A[U++]=240|H>>>18,A[U++]=128|H>>>12&63,A[U++]=128|H>>>6&63,A[U++]=128|H&63);g=A}else if(b==="object"){if(g===null)throw new Error(e);if(a&&g.constructor===ArrayBuffer)g=new Uint8Array(g);else if(!Array.isArray(g)&&(!a||!ArrayBuffer.isView(g)))throw new Error(e)}else throw new Error(e);g.length>64&&(g=new T(R,!0).update(g).array());var q=[],Z=[];for(v=0;v<64;++v){var ie=g[v]||0;q[v]=92^ie,Z[v]=54^ie}T.call(this,R,D),this.update(Z),this.oKeyPad=q,this.inner=!0,this.sharedMemory=D}C.prototype=new T,C.prototype.finalize=function(){if(T.prototype.finalize.call(this),this.inner){this.inner=!1;var g=this.array();T.call(this,this.is224,this.sharedMemory),this.update(this.oKeyPad),this.update(g),T.prototype.finalize.call(this)}};var P=_();P.sha256=P,P.sha224=_(!0),P.sha256.hmac=E(),P.sha224.hmac=E(!0),o?n.exports=P:(i.sha256=P.sha256,i.sha224=P.sha224)})()})(ja)),ja.exports}var ff=df();function hf(n){return ff.sha256(JSON.stringify(n.questions.map(({id:e,prompt:t,choices:i,correct:s,difficulty:r})=>({id:e,prompt:t,choices:i,correct:s,difficulty:r??null}))))}/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Ic="181",pf=0,fl=1,mf=2,zu=1,ku=2,yi=3,ts=0,Pn=1,Gn=2,Li=0,Ys=1,hl=2,pl=3,ml=4,xf=5,ps=100,gf=101,_f=102,vf=103,bf=104,yf=200,Mf=201,Sf=202,Ef=203,zo=204,ko=205,wf=206,Tf=207,Af=208,Rf=209,Cf=210,Pf=211,Lf=212,Df=213,If=214,Bo=0,Vo=1,Go=2,Qs=3,Ho=4,Wo=5,$o=6,qo=7,Bu=0,Uf=1,Ff=2,Xi=0,Nf=1,Of=2,zf=3,Vu=4,kf=5,Bf=6,Vf=7,Gu=300,er=301,tr=302,Xo=303,jo=304,Ua=306,Sa=1e3,Ai=1001,Yo=1002,Bn=1003,Gf=1004,Vr=1005,Hn=1006,Ya=1007,gs=1008,ui=1009,Hu=1010,Wu=1011,Ar=1012,Uc=1013,_s=1014,ci=1015,ar=1016,Fc=1017,Nc=1018,Rr=1020,$u=35902,qu=35899,Xu=1021,ju=1022,Qn=1023,Cr=1026,Pr=1027,Oc=1028,zc=1029,kc=1030,Bc=1031,Vc=1033,pa=33776,ma=33777,xa=33778,ga=33779,Ko=35840,Zo=35841,Jo=35842,Qo=35843,ec=36196,tc=37492,nc=37496,ic=37808,sc=37809,rc=37810,ac=37811,oc=37812,cc=37813,lc=37814,uc=37815,dc=37816,fc=37817,hc=37818,pc=37819,mc=37820,xc=37821,gc=36492,_c=36494,vc=36495,bc=36283,yc=36284,Mc=36285,Sc=36286,Hf=3200,Wf=3201,Yu=0,$f=1,Wi="",Mn="srgb",nr="srgb-linear",Ea="linear",Mt="srgb",Ls=7680,xl=519,qf=512,Xf=513,jf=514,Ku=515,Yf=516,Kf=517,Zf=518,Jf=519,gl=35044,_l="300 es",li=2e3,wa=2001;function Zu(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Ta(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Qf(){const n=Ta("canvas");return n.style.display="block",n}const vl={};function bl(...n){const e="THREE."+n.shift();console.log(e,...n)}function Ze(...n){const e="THREE."+n.shift();console.warn(e,...n)}function Ot(...n){const e="THREE."+n.shift();console.error(e,...n)}function Lr(...n){const e=n.join(" ");e in vl||(vl[e]=!0,Ze(...n))}function eh(n,e,t){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}class or{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const s=i[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}}const ln=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Ka=Math.PI/180,Aa=180/Math.PI;function Or(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(ln[n&255]+ln[n>>8&255]+ln[n>>16&255]+ln[n>>24&255]+"-"+ln[e&255]+ln[e>>8&255]+"-"+ln[e>>16&15|64]+ln[e>>24&255]+"-"+ln[t&63|128]+ln[t>>8&255]+"-"+ln[t>>16&255]+ln[t>>24&255]+ln[i&255]+ln[i>>8&255]+ln[i>>16&255]+ln[i>>24&255]).toLowerCase()}function ut(n,e,t){return Math.max(e,Math.min(t,n))}function th(n,e){return(n%e+e)%e}function Za(n,e,t){return(1-t)*n+t*e}function hr(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function Tn(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}class rt{constructor(e=0,t=0){rt.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ut(this.x,e.x,t.x),this.y=ut(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ut(this.x,e,t),this.y=ut(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(ut(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(ut(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*i-o*s+e.x,this.y=r*s+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class cr{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,o,a){let l=i[s+0],c=i[s+1],u=i[s+2],d=i[s+3],f=r[o+0],h=r[o+1],p=r[o+2],_=r[o+3];if(a<=0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d;return}if(a>=1){e[t+0]=f,e[t+1]=h,e[t+2]=p,e[t+3]=_;return}if(d!==_||l!==f||c!==h||u!==p){let x=l*f+c*h+u*p+d*_;x<0&&(f=-f,h=-h,p=-p,_=-_,x=-x);let m=1-a;if(x<.9995){const E=Math.acos(x),T=Math.sin(E);m=Math.sin(m*E)/T,a=Math.sin(a*E)/T,l=l*m+f*a,c=c*m+h*a,u=u*m+p*a,d=d*m+_*a}else{l=l*m+f*a,c=c*m+h*a,u=u*m+p*a,d=d*m+_*a;const E=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=E,c*=E,u*=E,d*=E}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,s,r,o){const a=i[s],l=i[s+1],c=i[s+2],u=i[s+3],d=r[o],f=r[o+1],h=r[o+2],p=r[o+3];return e[t]=a*p+u*d+l*h-c*f,e[t+1]=l*p+u*f+c*d-a*h,e[t+2]=c*p+u*h+a*f-l*d,e[t+3]=u*p-a*d-l*f-c*h,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(i/2),u=a(s/2),d=a(r/2),f=l(i/2),h=l(s/2),p=l(r/2);switch(o){case"XYZ":this._x=f*u*d+c*h*p,this._y=c*h*d-f*u*p,this._z=c*u*p+f*h*d,this._w=c*u*d-f*h*p;break;case"YXZ":this._x=f*u*d+c*h*p,this._y=c*h*d-f*u*p,this._z=c*u*p-f*h*d,this._w=c*u*d+f*h*p;break;case"ZXY":this._x=f*u*d-c*h*p,this._y=c*h*d+f*u*p,this._z=c*u*p+f*h*d,this._w=c*u*d-f*h*p;break;case"ZYX":this._x=f*u*d-c*h*p,this._y=c*h*d+f*u*p,this._z=c*u*p-f*h*d,this._w=c*u*d+f*h*p;break;case"YZX":this._x=f*u*d+c*h*p,this._y=c*h*d+f*u*p,this._z=c*u*p-f*h*d,this._w=c*u*d-f*h*p;break;case"XZY":this._x=f*u*d-c*h*p,this._y=c*h*d-f*u*p,this._z=c*u*p+f*h*d,this._w=c*u*d+f*h*p;break;default:Ze("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],s=t[4],r=t[8],o=t[1],a=t[5],l=t[9],c=t[2],u=t[6],d=t[10],f=i+a+d;if(f>0){const h=.5/Math.sqrt(f+1);this._w=.25/h,this._x=(u-l)*h,this._y=(r-c)*h,this._z=(o-s)*h}else if(i>a&&i>d){const h=2*Math.sqrt(1+i-a-d);this._w=(u-l)/h,this._x=.25*h,this._y=(s+o)/h,this._z=(r+c)/h}else if(a>d){const h=2*Math.sqrt(1+a-i-d);this._w=(r-c)/h,this._x=(s+o)/h,this._y=.25*h,this._z=(l+u)/h}else{const h=2*Math.sqrt(1+d-i-a);this._w=(o-s)/h,this._x=(r+c)/h,this._y=(l+u)/h,this._z=.25*h}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ut(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,s=e._y,r=e._z,o=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+o*a+s*c-r*l,this._y=s*u+o*l+r*a-i*c,this._z=r*u+o*c+i*l-s*a,this._w=o*u-i*a-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t<=0)return this;if(t>=1)return this.copy(e);let i=e._x,s=e._y,r=e._z,o=e._w,a=this.dot(e);a<0&&(i=-i,s=-s,r=-r,o=-o,a=-a);let l=1-t;if(a<.9995){const c=Math.acos(a),u=Math.sin(c);l=Math.sin(l*c)/u,t=Math.sin(t*c)/u,this._x=this._x*l+i*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+o*t,this._onChangeCallback()}else this._x=this._x*l+i*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+o*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class B{constructor(e=0,t=0,i=0){B.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(yl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(yl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(e){const t=this.x,i=this.y,s=this.z,r=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*s-a*i),u=2*(a*t-r*s),d=2*(r*i-o*t);return this.x=t+l*c+o*d-a*u,this.y=i+l*u+a*c-r*d,this.z=s+l*d+r*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ut(this.x,e.x,t.x),this.y=ut(this.y,e.y,t.y),this.z=ut(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ut(this.x,e,t),this.y=ut(this.y,e,t),this.z=ut(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(ut(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,s=e.y,r=e.z,o=t.x,a=t.y,l=t.z;return this.x=s*l-r*a,this.y=r*o-i*l,this.z=i*a-s*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Ja.copy(this).projectOnVector(e),this.sub(Ja)}reflect(e){return this.sub(Ja.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(ut(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ja=new B,yl=new cr;class et{constructor(e,t,i,s,r,o,a,l,c){et.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,o,a,l,c)}set(e,t,i,s,r,o,a,l,c){const u=this.elements;return u[0]=e,u[1]=s,u[2]=a,u[3]=t,u[4]=r,u[5]=l,u[6]=i,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],u=i[4],d=i[7],f=i[2],h=i[5],p=i[8],_=s[0],x=s[3],m=s[6],E=s[1],T=s[4],C=s[7],P=s[2],g=s[5],R=s[8];return r[0]=o*_+a*E+l*P,r[3]=o*x+a*T+l*g,r[6]=o*m+a*C+l*R,r[1]=c*_+u*E+d*P,r[4]=c*x+u*T+d*g,r[7]=c*m+u*C+d*R,r[2]=f*_+h*E+p*P,r[5]=f*x+h*T+p*g,r[8]=f*m+h*C+p*R,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*a*c-i*r*u+i*a*l+s*r*c-s*o*l}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=u*o-a*c,f=a*l-u*r,h=c*r-o*l,p=t*d+i*f+s*h;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/p;return e[0]=d*_,e[1]=(s*c-u*i)*_,e[2]=(a*i-s*o)*_,e[3]=f*_,e[4]=(u*t-s*l)*_,e[5]=(s*r-a*t)*_,e[6]=h*_,e[7]=(i*l-c*t)*_,e[8]=(o*t-i*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*o+c*a)+o+e,-s*c,s*l,-s*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Qa.makeScale(e,t)),this}rotate(e){return this.premultiply(Qa.makeRotation(-e)),this}translate(e,t){return this.premultiply(Qa.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Qa=new et,Ml=new et().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Sl=new et().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function nh(){const n={enabled:!0,workingColorSpace:nr,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===Mt&&(s.r=Di(s.r),s.g=Di(s.g),s.b=Di(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===Mt&&(s.r=Ks(s.r),s.g=Ks(s.g),s.b=Ks(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Wi?Ea:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Lr("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Lr("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[nr]:{primaries:e,whitePoint:i,transfer:Ea,toXYZ:Ml,fromXYZ:Sl,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Mn},outputColorSpaceConfig:{drawingBufferColorSpace:Mn}},[Mn]:{primaries:e,whitePoint:i,transfer:Mt,toXYZ:Ml,fromXYZ:Sl,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Mn}}}),n}const mt=nh();function Di(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Ks(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Ds;class ih{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Ds===void 0&&(Ds=Ta("canvas")),Ds.width=e.width,Ds.height=e.height;const s=Ds.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),i=Ds}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Ta("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Di(r[o]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Di(t[i]/255)*255):t[i]=Di(t[i]);return{data:t,width:e.width,height:e.height}}else return Ze("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let sh=0;class Gc{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:sh++}),this.uuid=Or(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(eo(s[o].image)):r.push(eo(s[o]))}else r=eo(s);i.url=r}return t||(e.images[this.uuid]=i),i}}function eo(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?ih.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Ze("Texture: Unable to serialize Texture."),{})}let rh=0;const to=new B;class pn extends or{constructor(e=pn.DEFAULT_IMAGE,t=pn.DEFAULT_MAPPING,i=Ai,s=Ai,r=Hn,o=gs,a=Qn,l=ui,c=pn.DEFAULT_ANISOTROPY,u=Wi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:rh++}),this.uuid=Or(),this.name="",this.source=new Gc(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new rt(0,0),this.repeat=new rt(1,1),this.center=new rt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new et,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(to).x}get height(){return this.source.getSize(to).y}get depth(){return this.source.getSize(to).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){Ze(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Ze(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Gu)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Sa:e.x=e.x-Math.floor(e.x);break;case Ai:e.x=e.x<0?0:1;break;case Yo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Sa:e.y=e.y-Math.floor(e.y);break;case Ai:e.y=e.y<0?0:1;break;case Yo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}pn.DEFAULT_IMAGE=null;pn.DEFAULT_MAPPING=Gu;pn.DEFAULT_ANISOTROPY=1;class St{constructor(e=0,t=0,i=0,s=1){St.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*i+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r;const l=e.elements,c=l[0],u=l[4],d=l[8],f=l[1],h=l[5],p=l[9],_=l[2],x=l[6],m=l[10];if(Math.abs(u-f)<.01&&Math.abs(d-_)<.01&&Math.abs(p-x)<.01){if(Math.abs(u+f)<.1&&Math.abs(d+_)<.1&&Math.abs(p+x)<.1&&Math.abs(c+h+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const T=(c+1)/2,C=(h+1)/2,P=(m+1)/2,g=(u+f)/4,R=(d+_)/4,D=(p+x)/4;return T>C&&T>P?T<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(T),s=g/i,r=R/i):C>P?C<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(C),i=g/s,r=D/s):P<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(P),i=R/r,s=D/r),this.set(i,s,r,t),this}let E=Math.sqrt((x-p)*(x-p)+(d-_)*(d-_)+(f-u)*(f-u));return Math.abs(E)<.001&&(E=1),this.x=(x-p)/E,this.y=(d-_)/E,this.z=(f-u)/E,this.w=Math.acos((c+h+m-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ut(this.x,e.x,t.x),this.y=ut(this.y,e.y,t.y),this.z=ut(this.z,e.z,t.z),this.w=ut(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ut(this.x,e,t),this.y=ut(this.y,e,t),this.z=ut(this.z,e,t),this.w=ut(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(ut(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class ah extends or{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Hn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new St(0,0,e,t),this.scissorTest=!1,this.viewport=new St(0,0,e,t);const s={width:e,height:t,depth:i.depth},r=new pn(s);this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){const t={minFilter:Hn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new Gc(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class vs extends ah{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Ju extends pn{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Bn,this.minFilter=Bn,this.wrapR=Ai,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class oh extends pn{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Bn,this.minFilter=Bn,this.wrapR=Ai,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ms{constructor(e=new B(1/0,1/0,1/0),t=new B(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(jn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(jn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=jn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,jn):jn.fromBufferAttribute(r,o),jn.applyMatrix4(e.matrixWorld),this.expandByPoint(jn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Gr.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Gr.copy(i.boundingBox)),Gr.applyMatrix4(e.matrixWorld),this.union(Gr)}const s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,jn),jn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(pr),Hr.subVectors(this.max,pr),Is.subVectors(e.a,pr),Us.subVectors(e.b,pr),Fs.subVectors(e.c,pr),Oi.subVectors(Us,Is),zi.subVectors(Fs,Us),cs.subVectors(Is,Fs);let t=[0,-Oi.z,Oi.y,0,-zi.z,zi.y,0,-cs.z,cs.y,Oi.z,0,-Oi.x,zi.z,0,-zi.x,cs.z,0,-cs.x,-Oi.y,Oi.x,0,-zi.y,zi.x,0,-cs.y,cs.x,0];return!no(t,Is,Us,Fs,Hr)||(t=[1,0,0,0,1,0,0,0,1],!no(t,Is,Us,Fs,Hr))?!1:(Wr.crossVectors(Oi,zi),t=[Wr.x,Wr.y,Wr.z],no(t,Is,Us,Fs,Hr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,jn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(jn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(mi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),mi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),mi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),mi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),mi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),mi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),mi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),mi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(mi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const mi=[new B,new B,new B,new B,new B,new B,new B,new B],jn=new B,Gr=new Ms,Is=new B,Us=new B,Fs=new B,Oi=new B,zi=new B,cs=new B,pr=new B,Hr=new B,Wr=new B,ls=new B;function no(n,e,t,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){ls.fromArray(n,r);const a=s.x*Math.abs(ls.x)+s.y*Math.abs(ls.y)+s.z*Math.abs(ls.z),l=e.dot(ls),c=t.dot(ls),u=i.dot(ls);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const ch=new Ms,mr=new B,io=new B;class Ss{constructor(e=new B,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):ch.setFromPoints(e).getCenter(i);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;mr.subVectors(e,this.center);const t=mr.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(mr,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(io.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(mr.copy(e.center).add(io)),this.expandByPoint(mr.copy(e.center).sub(io))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const xi=new B,so=new B,$r=new B,ki=new B,ro=new B,qr=new B,ao=new B;class Fa{constructor(e=new B,t=new B(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,xi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=xi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(xi.copy(this.origin).addScaledVector(this.direction,t),xi.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){so.copy(e).add(t).multiplyScalar(.5),$r.copy(t).sub(e).normalize(),ki.copy(this.origin).sub(so);const r=e.distanceTo(t)*.5,o=-this.direction.dot($r),a=ki.dot(this.direction),l=-ki.dot($r),c=ki.lengthSq(),u=Math.abs(1-o*o);let d,f,h,p;if(u>0)if(d=o*l-a,f=o*a-l,p=r*u,d>=0)if(f>=-p)if(f<=p){const _=1/u;d*=_,f*=_,h=d*(d+o*f+2*a)+f*(o*d+f+2*l)+c}else f=r,d=Math.max(0,-(o*f+a)),h=-d*d+f*(f+2*l)+c;else f=-r,d=Math.max(0,-(o*f+a)),h=-d*d+f*(f+2*l)+c;else f<=-p?(d=Math.max(0,-(-o*r+a)),f=d>0?-r:Math.min(Math.max(-r,-l),r),h=-d*d+f*(f+2*l)+c):f<=p?(d=0,f=Math.min(Math.max(-r,-l),r),h=f*(f+2*l)+c):(d=Math.max(0,-(o*r+a)),f=d>0?r:Math.min(Math.max(-r,-l),r),h=-d*d+f*(f+2*l)+c);else f=o>0?-r:r,d=Math.max(0,-(o*f+a)),h=-d*d+f*(f+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(so).addScaledVector($r,f),h}intersectSphere(e,t){xi.subVectors(e.center,this.origin);const i=xi.dot(this.direction),s=xi.dot(xi)-i*i,r=e.radius*e.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,f=this.origin;return c>=0?(i=(e.min.x-f.x)*c,s=(e.max.x-f.x)*c):(i=(e.max.x-f.x)*c,s=(e.min.x-f.x)*c),u>=0?(r=(e.min.y-f.y)*u,o=(e.max.y-f.y)*u):(r=(e.max.y-f.y)*u,o=(e.min.y-f.y)*u),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),d>=0?(a=(e.min.z-f.z)*d,l=(e.max.z-f.z)*d):(a=(e.max.z-f.z)*d,l=(e.min.z-f.z)*d),i>l||a>s)||((a>i||i!==i)&&(i=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,xi)!==null}intersectTriangle(e,t,i,s,r){ro.subVectors(t,e),qr.subVectors(i,e),ao.crossVectors(ro,qr);let o=this.direction.dot(ao),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;ki.subVectors(this.origin,e);const l=a*this.direction.dot(qr.crossVectors(ki,qr));if(l<0)return null;const c=a*this.direction.dot(ro.cross(ki));if(c<0||l+c>o)return null;const u=-a*ki.dot(ao);return u<0?null:this.at(u/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class vt{constructor(e,t,i,s,r,o,a,l,c,u,d,f,h,p,_,x){vt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,o,a,l,c,u,d,f,h,p,_,x)}set(e,t,i,s,r,o,a,l,c,u,d,f,h,p,_,x){const m=this.elements;return m[0]=e,m[4]=t,m[8]=i,m[12]=s,m[1]=r,m[5]=o,m[9]=a,m[13]=l,m[2]=c,m[6]=u,m[10]=d,m[14]=f,m[3]=h,m[7]=p,m[11]=_,m[15]=x,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new vt().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,s=1/Ns.setFromMatrixColumn(e,0).length(),r=1/Ns.setFromMatrixColumn(e,1).length(),o=1/Ns.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,s=e.y,r=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){const f=o*u,h=o*d,p=a*u,_=a*d;t[0]=l*u,t[4]=-l*d,t[8]=c,t[1]=h+p*c,t[5]=f-_*c,t[9]=-a*l,t[2]=_-f*c,t[6]=p+h*c,t[10]=o*l}else if(e.order==="YXZ"){const f=l*u,h=l*d,p=c*u,_=c*d;t[0]=f+_*a,t[4]=p*a-h,t[8]=o*c,t[1]=o*d,t[5]=o*u,t[9]=-a,t[2]=h*a-p,t[6]=_+f*a,t[10]=o*l}else if(e.order==="ZXY"){const f=l*u,h=l*d,p=c*u,_=c*d;t[0]=f-_*a,t[4]=-o*d,t[8]=p+h*a,t[1]=h+p*a,t[5]=o*u,t[9]=_-f*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const f=o*u,h=o*d,p=a*u,_=a*d;t[0]=l*u,t[4]=p*c-h,t[8]=f*c+_,t[1]=l*d,t[5]=_*c+f,t[9]=h*c-p,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const f=o*l,h=o*c,p=a*l,_=a*c;t[0]=l*u,t[4]=_-f*d,t[8]=p*d+h,t[1]=d,t[5]=o*u,t[9]=-a*u,t[2]=-c*u,t[6]=h*d+p,t[10]=f-_*d}else if(e.order==="XZY"){const f=o*l,h=o*c,p=a*l,_=a*c;t[0]=l*u,t[4]=-d,t[8]=c*u,t[1]=f*d+_,t[5]=o*u,t[9]=h*d-p,t[2]=p*d-h,t[6]=a*u,t[10]=_*d+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(lh,e,uh)}lookAt(e,t,i){const s=this.elements;return Un.subVectors(e,t),Un.lengthSq()===0&&(Un.z=1),Un.normalize(),Bi.crossVectors(i,Un),Bi.lengthSq()===0&&(Math.abs(i.z)===1?Un.x+=1e-4:Un.z+=1e-4,Un.normalize(),Bi.crossVectors(i,Un)),Bi.normalize(),Xr.crossVectors(Un,Bi),s[0]=Bi.x,s[4]=Xr.x,s[8]=Un.x,s[1]=Bi.y,s[5]=Xr.y,s[9]=Un.y,s[2]=Bi.z,s[6]=Xr.z,s[10]=Un.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],u=i[1],d=i[5],f=i[9],h=i[13],p=i[2],_=i[6],x=i[10],m=i[14],E=i[3],T=i[7],C=i[11],P=i[15],g=s[0],R=s[4],D=s[8],v=s[12],b=s[1],A=s[5],N=s[9],U=s[13],H=s[2],q=s[6],Z=s[10],ie=s[14],Q=s[3],te=s[7],ne=s[11],fe=s[15];return r[0]=o*g+a*b+l*H+c*Q,r[4]=o*R+a*A+l*q+c*te,r[8]=o*D+a*N+l*Z+c*ne,r[12]=o*v+a*U+l*ie+c*fe,r[1]=u*g+d*b+f*H+h*Q,r[5]=u*R+d*A+f*q+h*te,r[9]=u*D+d*N+f*Z+h*ne,r[13]=u*v+d*U+f*ie+h*fe,r[2]=p*g+_*b+x*H+m*Q,r[6]=p*R+_*A+x*q+m*te,r[10]=p*D+_*N+x*Z+m*ne,r[14]=p*v+_*U+x*ie+m*fe,r[3]=E*g+T*b+C*H+P*Q,r[7]=E*R+T*A+C*q+P*te,r[11]=E*D+T*N+C*Z+P*ne,r[15]=E*v+T*U+C*ie+P*fe,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],d=e[6],f=e[10],h=e[14],p=e[3],_=e[7],x=e[11],m=e[15];return p*(+r*l*d-s*c*d-r*a*f+i*c*f+s*a*h-i*l*h)+_*(+t*l*h-t*c*f+r*o*f-s*o*h+s*c*u-r*l*u)+x*(+t*c*d-t*a*h-r*o*d+i*o*h+r*a*u-i*c*u)+m*(-s*a*u-t*l*d+t*a*f+s*o*d-i*o*f+i*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=e[9],f=e[10],h=e[11],p=e[12],_=e[13],x=e[14],m=e[15],E=d*x*c-_*f*c+_*l*h-a*x*h-d*l*m+a*f*m,T=p*f*c-u*x*c-p*l*h+o*x*h+u*l*m-o*f*m,C=u*_*c-p*d*c+p*a*h-o*_*h-u*a*m+o*d*m,P=p*d*l-u*_*l-p*a*f+o*_*f+u*a*x-o*d*x,g=t*E+i*T+s*C+r*P;if(g===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/g;return e[0]=E*R,e[1]=(_*f*r-d*x*r-_*s*h+i*x*h+d*s*m-i*f*m)*R,e[2]=(a*x*r-_*l*r+_*s*c-i*x*c-a*s*m+i*l*m)*R,e[3]=(d*l*r-a*f*r-d*s*c+i*f*c+a*s*h-i*l*h)*R,e[4]=T*R,e[5]=(u*x*r-p*f*r+p*s*h-t*x*h-u*s*m+t*f*m)*R,e[6]=(p*l*r-o*x*r-p*s*c+t*x*c+o*s*m-t*l*m)*R,e[7]=(o*f*r-u*l*r+u*s*c-t*f*c-o*s*h+t*l*h)*R,e[8]=C*R,e[9]=(p*d*r-u*_*r-p*i*h+t*_*h+u*i*m-t*d*m)*R,e[10]=(o*_*r-p*a*r+p*i*c-t*_*c-o*i*m+t*a*m)*R,e[11]=(u*a*r-o*d*r-u*i*c+t*d*c+o*i*h-t*a*h)*R,e[12]=P*R,e[13]=(u*_*s-p*d*s+p*i*f-t*_*f-u*i*x+t*d*x)*R,e[14]=(p*a*s-o*_*s-p*i*l+t*_*l+o*i*x-t*a*x)*R,e[15]=(o*d*s-u*a*s+u*i*l-t*d*l-o*i*f+t*a*f)*R,this}scale(e){const t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),s=Math.sin(t),r=1-i,o=e.x,a=e.y,l=e.z,c=r*o,u=r*a;return this.set(c*o+i,c*a-s*l,c*l+s*a,0,c*a+s*l,u*a+i,u*l-s*o,0,c*l-s*a,u*l+s*o,r*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,o){return this.set(1,i,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){const s=this.elements,r=t._x,o=t._y,a=t._z,l=t._w,c=r+r,u=o+o,d=a+a,f=r*c,h=r*u,p=r*d,_=o*u,x=o*d,m=a*d,E=l*c,T=l*u,C=l*d,P=i.x,g=i.y,R=i.z;return s[0]=(1-(_+m))*P,s[1]=(h+C)*P,s[2]=(p-T)*P,s[3]=0,s[4]=(h-C)*g,s[5]=(1-(f+m))*g,s[6]=(x+E)*g,s[7]=0,s[8]=(p+T)*R,s[9]=(x-E)*R,s[10]=(1-(f+_))*R,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){const s=this.elements;let r=Ns.set(s[0],s[1],s[2]).length();const o=Ns.set(s[4],s[5],s[6]).length(),a=Ns.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],Yn.copy(this);const c=1/r,u=1/o,d=1/a;return Yn.elements[0]*=c,Yn.elements[1]*=c,Yn.elements[2]*=c,Yn.elements[4]*=u,Yn.elements[5]*=u,Yn.elements[6]*=u,Yn.elements[8]*=d,Yn.elements[9]*=d,Yn.elements[10]*=d,t.setFromRotationMatrix(Yn),i.x=r,i.y=o,i.z=a,this}makePerspective(e,t,i,s,r,o,a=li,l=!1){const c=this.elements,u=2*r/(t-e),d=2*r/(i-s),f=(t+e)/(t-e),h=(i+s)/(i-s);let p,_;if(l)p=r/(o-r),_=o*r/(o-r);else if(a===li)p=-(o+r)/(o-r),_=-2*o*r/(o-r);else if(a===wa)p=-o/(o-r),_=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=d,c[9]=h,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,s,r,o,a=li,l=!1){const c=this.elements,u=2/(t-e),d=2/(i-s),f=-(t+e)/(t-e),h=-(i+s)/(i-s);let p,_;if(l)p=1/(o-r),_=o/(o-r);else if(a===li)p=-2/(o-r),_=-(o+r)/(o-r);else if(a===wa)p=-1/(o-r),_=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=0,c[12]=f,c[1]=0,c[5]=d,c[9]=0,c[13]=h,c[2]=0,c[6]=0,c[10]=p,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Ns=new B,Yn=new vt,lh=new B(0,0,0),uh=new B(1,1,1),Bi=new B,Xr=new B,Un=new B,El=new vt,wl=new cr;class ni{constructor(e=0,t=0,i=0,s=ni.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const s=e.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],u=s[9],d=s[2],f=s[6],h=s[10];switch(t){case"XYZ":this._y=Math.asin(ut(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,h),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ut(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,h),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(ut(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,h),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-ut(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,h),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(ut(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(a,h));break;case"XZY":this._z=Math.asin(-ut(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,h),this._y=0);break;default:Ze("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return El.makeRotationFromQuaternion(e),this.setFromRotationMatrix(El,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return wl.setFromEuler(this),this.setFromQuaternion(wl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ni.DEFAULT_ORDER="XYZ";class Hc{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let dh=0;const Tl=new B,Os=new cr,gi=new vt,jr=new B,xr=new B,fh=new B,hh=new cr,Al=new B(1,0,0),Rl=new B(0,1,0),Cl=new B(0,0,1),Pl={type:"added"},ph={type:"removed"},zs={type:"childadded",child:null},oo={type:"childremoved",child:null};class zt extends or{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:dh++}),this.uuid=Or(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=zt.DEFAULT_UP.clone();const e=new B,t=new ni,i=new cr,s=new B(1,1,1);function r(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new vt},normalMatrix:{value:new et}}),this.matrix=new vt,this.matrixWorld=new vt,this.matrixAutoUpdate=zt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=zt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Hc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Os.setFromAxisAngle(e,t),this.quaternion.multiply(Os),this}rotateOnWorldAxis(e,t){return Os.setFromAxisAngle(e,t),this.quaternion.premultiply(Os),this}rotateX(e){return this.rotateOnAxis(Al,e)}rotateY(e){return this.rotateOnAxis(Rl,e)}rotateZ(e){return this.rotateOnAxis(Cl,e)}translateOnAxis(e,t){return Tl.copy(e).applyQuaternion(this.quaternion),this.position.add(Tl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Al,e)}translateY(e){return this.translateOnAxis(Rl,e)}translateZ(e){return this.translateOnAxis(Cl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(gi.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?jr.copy(e):jr.set(e,t,i);const s=this.parent;this.updateWorldMatrix(!0,!1),xr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?gi.lookAt(xr,jr,this.up):gi.lookAt(jr,xr,this.up),this.quaternion.setFromRotationMatrix(gi),s&&(gi.extractRotation(s.matrixWorld),Os.setFromRotationMatrix(gi),this.quaternion.premultiply(Os.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Ot("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Pl),zs.child=e,this.dispatchEvent(zs),zs.child=null):Ot("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(ph),oo.child=e,this.dispatchEvent(oo),oo.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),gi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),gi.multiply(e.parent.matrixWorld)),e.applyMatrix4(gi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Pl),zs.child=e,this.dispatchEvent(zs),zs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){const o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(xr,e,fh),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(xr,hh,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const d=l[c];r(e.shapes,d)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(e.materials,this.material[l]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(r(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),d=o(e.shapes),f=o(e.skeletons),h=o(e.animations),p=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),d.length>0&&(i.shapes=d),f.length>0&&(i.skeletons=f),h.length>0&&(i.animations=h),p.length>0&&(i.nodes=p)}return i.object=s,i;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}}zt.DEFAULT_UP=new B(0,1,0);zt.DEFAULT_MATRIX_AUTO_UPDATE=!0;zt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Kn=new B,_i=new B,co=new B,vi=new B,ks=new B,Bs=new B,Ll=new B,lo=new B,uo=new B,fo=new B,ho=new St,po=new St,mo=new St;class Jn{constructor(e=new B,t=new B,i=new B){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),Kn.subVectors(e,t),s.cross(Kn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){Kn.subVectors(s,t),_i.subVectors(i,t),co.subVectors(e,t);const o=Kn.dot(Kn),a=Kn.dot(_i),l=Kn.dot(co),c=_i.dot(_i),u=_i.dot(co),d=o*c-a*a;if(d===0)return r.set(0,0,0),null;const f=1/d,h=(c*l-a*u)*f,p=(o*u-a*l)*f;return r.set(1-h-p,p,h)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,vi)===null?!1:vi.x>=0&&vi.y>=0&&vi.x+vi.y<=1}static getInterpolation(e,t,i,s,r,o,a,l){return this.getBarycoord(e,t,i,s,vi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,vi.x),l.addScaledVector(o,vi.y),l.addScaledVector(a,vi.z),l)}static getInterpolatedAttribute(e,t,i,s,r,o){return ho.setScalar(0),po.setScalar(0),mo.setScalar(0),ho.fromBufferAttribute(e,t),po.fromBufferAttribute(e,i),mo.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(ho,r.x),o.addScaledVector(po,r.y),o.addScaledVector(mo,r.z),o}static isFrontFacing(e,t,i,s){return Kn.subVectors(i,t),_i.subVectors(e,t),Kn.cross(_i).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Kn.subVectors(this.c,this.b),_i.subVectors(this.a,this.b),Kn.cross(_i).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Jn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Jn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,r){return Jn.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return Jn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Jn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,s=this.b,r=this.c;let o,a;ks.subVectors(s,i),Bs.subVectors(r,i),lo.subVectors(e,i);const l=ks.dot(lo),c=Bs.dot(lo);if(l<=0&&c<=0)return t.copy(i);uo.subVectors(e,s);const u=ks.dot(uo),d=Bs.dot(uo);if(u>=0&&d<=u)return t.copy(s);const f=l*d-u*c;if(f<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(i).addScaledVector(ks,o);fo.subVectors(e,r);const h=ks.dot(fo),p=Bs.dot(fo);if(p>=0&&h<=p)return t.copy(r);const _=h*c-l*p;if(_<=0&&c>=0&&p<=0)return a=c/(c-p),t.copy(i).addScaledVector(Bs,a);const x=u*p-h*d;if(x<=0&&d-u>=0&&h-p>=0)return Ll.subVectors(r,s),a=(d-u)/(d-u+(h-p)),t.copy(s).addScaledVector(Ll,a);const m=1/(x+_+f);return o=_*m,a=f*m,t.copy(i).addScaledVector(ks,o).addScaledVector(Bs,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Qu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Vi={h:0,s:0,l:0},Yr={h:0,s:0,l:0};function xo(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class ot{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Mn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,mt.colorSpaceToWorking(this,t),this}setRGB(e,t,i,s=mt.workingColorSpace){return this.r=e,this.g=t,this.b=i,mt.colorSpaceToWorking(this,s),this}setHSL(e,t,i,s=mt.workingColorSpace){if(e=th(e,1),t=ut(t,0,1),i=ut(i,0,1),t===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+t):i+t-i*t,o=2*i-r;this.r=xo(o,r,e+1/3),this.g=xo(o,r,e),this.b=xo(o,r,e-1/3)}return mt.colorSpaceToWorking(this,s),this}setStyle(e,t=Mn){function i(r){r!==void 0&&parseFloat(r)<1&&Ze("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Ze("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);Ze("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Mn){const i=Qu[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Ze("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Di(e.r),this.g=Di(e.g),this.b=Di(e.b),this}copyLinearToSRGB(e){return this.r=Ks(e.r),this.g=Ks(e.g),this.b=Ks(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Mn){return mt.workingToColorSpace(un.copy(this),e),Math.round(ut(un.r*255,0,255))*65536+Math.round(ut(un.g*255,0,255))*256+Math.round(ut(un.b*255,0,255))}getHexString(e=Mn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=mt.workingColorSpace){mt.workingToColorSpace(un.copy(this),t);const i=un.r,s=un.g,r=un.b,o=Math.max(i,s,r),a=Math.min(i,s,r);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const d=o-a;switch(c=u<=.5?d/(o+a):d/(2-o-a),o){case i:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-i)/d+2;break;case r:l=(i-s)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=mt.workingColorSpace){return mt.workingToColorSpace(un.copy(this),t),e.r=un.r,e.g=un.g,e.b=un.b,e}getStyle(e=Mn){mt.workingToColorSpace(un.copy(this),e);const t=un.r,i=un.g,s=un.b;return e!==Mn?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(Vi),this.setHSL(Vi.h+e,Vi.s+t,Vi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Vi),e.getHSL(Yr);const i=Za(Vi.h,Yr.h,t),s=Za(Vi.s,Yr.s,t),r=Za(Vi.l,Yr.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const un=new ot;ot.NAMES=Qu;let mh=0;class Es extends or{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:mh++}),this.uuid=Or(),this.name="",this.type="Material",this.blending=Ys,this.side=ts,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=zo,this.blendDst=ko,this.blendEquation=ps,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ot(0,0,0),this.blendAlpha=0,this.depthFunc=Qs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=xl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ls,this.stencilZFail=Ls,this.stencilZPass=Ls,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){Ze(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Ze(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Ys&&(i.blending=this.blending),this.side!==ts&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==zo&&(i.blendSrc=this.blendSrc),this.blendDst!==ko&&(i.blendDst=this.blendDst),this.blendEquation!==ps&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Qs&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==xl&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ls&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Ls&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Ls&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(t){const r=s(e.textures),o=s(e.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class oi extends Es{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ot(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ni,this.combine=Bu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Vt=new B,Kr=new rt;let xh=0;class Wn{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:xh++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=gl,this.updateRanges=[],this.gpuType=ci,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Kr.fromBufferAttribute(this,t),Kr.applyMatrix3(e),this.setXY(t,Kr.x,Kr.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Vt.fromBufferAttribute(this,t),Vt.applyMatrix3(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Vt.fromBufferAttribute(this,t),Vt.applyMatrix4(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Vt.fromBufferAttribute(this,t),Vt.applyNormalMatrix(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Vt.fromBufferAttribute(this,t),Vt.transformDirection(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=hr(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Tn(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=hr(t,this.array)),t}setX(e,t){return this.normalized&&(t=Tn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=hr(t,this.array)),t}setY(e,t){return this.normalized&&(t=Tn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=hr(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Tn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=hr(t,this.array)),t}setW(e,t){return this.normalized&&(t=Tn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Tn(t,this.array),i=Tn(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=Tn(t,this.array),i=Tn(i,this.array),s=Tn(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=Tn(t,this.array),i=Tn(i,this.array),s=Tn(s,this.array),r=Tn(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==gl&&(e.usage=this.usage),e}}class ed extends Wn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class td extends Wn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class Tt extends Wn{constructor(e,t,i){super(new Float32Array(e),t,i)}}let gh=0;const Vn=new vt,go=new zt,Vs=new B,Fn=new Ms,gr=new Ms,Jt=new B;class Kt extends or{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:gh++}),this.uuid=Or(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Zu(e)?td:ed)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new et().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Vn.makeRotationFromQuaternion(e),this.applyMatrix4(Vn),this}rotateX(e){return Vn.makeRotationX(e),this.applyMatrix4(Vn),this}rotateY(e){return Vn.makeRotationY(e),this.applyMatrix4(Vn),this}rotateZ(e){return Vn.makeRotationZ(e),this.applyMatrix4(Vn),this}translate(e,t,i){return Vn.makeTranslation(e,t,i),this.applyMatrix4(Vn),this}scale(e,t,i){return Vn.makeScale(e,t,i),this.applyMatrix4(Vn),this}lookAt(e){return go.lookAt(e),go.updateMatrix(),this.applyMatrix4(go.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Vs).negate(),this.translate(Vs.x,Vs.y,Vs.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let s=0,r=e.length;s<r;s++){const o=e[s];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Tt(i,3))}else{const i=Math.min(e.length,t.count);for(let s=0;s<i;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Ze("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ms);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ot("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new B(-1/0,-1/0,-1/0),new B(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){const r=t[i];Fn.setFromBufferAttribute(r),this.morphTargetsRelative?(Jt.addVectors(this.boundingBox.min,Fn.min),this.boundingBox.expandByPoint(Jt),Jt.addVectors(this.boundingBox.max,Fn.max),this.boundingBox.expandByPoint(Jt)):(this.boundingBox.expandByPoint(Fn.min),this.boundingBox.expandByPoint(Fn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ot('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ss);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ot("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new B,1/0);return}if(e){const i=this.boundingSphere.center;if(Fn.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];gr.setFromBufferAttribute(a),this.morphTargetsRelative?(Jt.addVectors(Fn.min,gr.min),Fn.expandByPoint(Jt),Jt.addVectors(Fn.max,gr.max),Fn.expandByPoint(Jt)):(Fn.expandByPoint(gr.min),Fn.expandByPoint(gr.max))}Fn.getCenter(i);let s=0;for(let r=0,o=e.count;r<o;r++)Jt.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(Jt));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)Jt.fromBufferAttribute(a,c),l&&(Vs.fromBufferAttribute(e,c),Jt.add(Vs)),s=Math.max(s,i.distanceToSquared(Jt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Ot('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Ot("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Wn(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let D=0;D<i.count;D++)a[D]=new B,l[D]=new B;const c=new B,u=new B,d=new B,f=new rt,h=new rt,p=new rt,_=new B,x=new B;function m(D,v,b){c.fromBufferAttribute(i,D),u.fromBufferAttribute(i,v),d.fromBufferAttribute(i,b),f.fromBufferAttribute(r,D),h.fromBufferAttribute(r,v),p.fromBufferAttribute(r,b),u.sub(c),d.sub(c),h.sub(f),p.sub(f);const A=1/(h.x*p.y-p.x*h.y);isFinite(A)&&(_.copy(u).multiplyScalar(p.y).addScaledVector(d,-h.y).multiplyScalar(A),x.copy(d).multiplyScalar(h.x).addScaledVector(u,-p.x).multiplyScalar(A),a[D].add(_),a[v].add(_),a[b].add(_),l[D].add(x),l[v].add(x),l[b].add(x))}let E=this.groups;E.length===0&&(E=[{start:0,count:e.count}]);for(let D=0,v=E.length;D<v;++D){const b=E[D],A=b.start,N=b.count;for(let U=A,H=A+N;U<H;U+=3)m(e.getX(U+0),e.getX(U+1),e.getX(U+2))}const T=new B,C=new B,P=new B,g=new B;function R(D){P.fromBufferAttribute(s,D),g.copy(P);const v=a[D];T.copy(v),T.sub(P.multiplyScalar(P.dot(v))).normalize(),C.crossVectors(g,v);const A=C.dot(l[D])<0?-1:1;o.setXYZW(D,T.x,T.y,T.z,A)}for(let D=0,v=E.length;D<v;++D){const b=E[D],A=b.start,N=b.count;for(let U=A,H=A+N;U<H;U+=3)R(e.getX(U+0)),R(e.getX(U+1)),R(e.getX(U+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Wn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let f=0,h=i.count;f<h;f++)i.setXYZ(f,0,0,0);const s=new B,r=new B,o=new B,a=new B,l=new B,c=new B,u=new B,d=new B;if(e)for(let f=0,h=e.count;f<h;f+=3){const p=e.getX(f+0),_=e.getX(f+1),x=e.getX(f+2);s.fromBufferAttribute(t,p),r.fromBufferAttribute(t,_),o.fromBufferAttribute(t,x),u.subVectors(o,r),d.subVectors(s,r),u.cross(d),a.fromBufferAttribute(i,p),l.fromBufferAttribute(i,_),c.fromBufferAttribute(i,x),a.add(u),l.add(u),c.add(u),i.setXYZ(p,a.x,a.y,a.z),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(x,c.x,c.y,c.z)}else for(let f=0,h=t.count;f<h;f+=3)s.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),u.subVectors(o,r),d.subVectors(s,r),u.cross(d),i.setXYZ(f+0,u.x,u.y,u.z),i.setXYZ(f+1,u.x,u.y,u.z),i.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Jt.fromBufferAttribute(e,t),Jt.normalize(),e.setXYZ(t,Jt.x,Jt.y,Jt.z)}toNonIndexed(){function e(a,l){const c=a.array,u=a.itemSize,d=a.normalized,f=new c.constructor(l.length*u);let h=0,p=0;for(let _=0,x=l.length;_<x;_++){a.isInterleavedBufferAttribute?h=l[_]*a.data.stride+a.offset:h=l[_]*u;for(let m=0;m<u;m++)f[p++]=c[h++]}return new Wn(f,u,d)}if(this.index===null)return Ze("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Kt,i=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=e(l,i);t.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let u=0,d=c.length;u<d;u++){const f=c[u],h=e(f,i);l.push(h)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let d=0,f=c.length;d<f;d++){const h=c[d];u.push(h.toJSON(e.data))}u.length>0&&(s[l]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const s=e.attributes;for(const c in s){const u=s[c];this.setAttribute(c,u.clone(t))}const r=e.morphAttributes;for(const c in r){const u=[],d=r[c];for(let f=0,h=d.length;f<h;f++)u.push(d[f].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,u=o.length;c<u;c++){const d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Dl=new vt,us=new Fa,Zr=new Ss,Il=new B,Jr=new B,Qr=new B,ea=new B,_o=new B,ta=new B,Ul=new B,na=new B;class en extends zt{constructor(e=new Kt,t=new oi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(s,e);const a=this.morphTargetInfluences;if(r&&a){ta.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const u=a[l],d=r[l];u!==0&&(_o.fromBufferAttribute(d,e),o?ta.addScaledVector(_o,u):ta.addScaledVector(_o.sub(t),u))}t.add(ta)}return t}raycast(e,t){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Zr.copy(i.boundingSphere),Zr.applyMatrix4(r),us.copy(e.ray).recast(e.near),!(Zr.containsPoint(us.origin)===!1&&(us.intersectSphere(Zr,Il)===null||us.origin.distanceToSquared(Il)>(e.far-e.near)**2))&&(Dl.copy(r).invert(),us.copy(e.ray).applyMatrix4(Dl),!(i.boundingBox!==null&&us.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,us)))}_computeIntersections(e,t,i){let s;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,d=r.attributes.normal,f=r.groups,h=r.drawRange;if(a!==null)if(Array.isArray(o))for(let p=0,_=f.length;p<_;p++){const x=f[p],m=o[x.materialIndex],E=Math.max(x.start,h.start),T=Math.min(a.count,Math.min(x.start+x.count,h.start+h.count));for(let C=E,P=T;C<P;C+=3){const g=a.getX(C),R=a.getX(C+1),D=a.getX(C+2);s=ia(this,m,e,i,c,u,d,g,R,D),s&&(s.faceIndex=Math.floor(C/3),s.face.materialIndex=x.materialIndex,t.push(s))}}else{const p=Math.max(0,h.start),_=Math.min(a.count,h.start+h.count);for(let x=p,m=_;x<m;x+=3){const E=a.getX(x),T=a.getX(x+1),C=a.getX(x+2);s=ia(this,o,e,i,c,u,d,E,T,C),s&&(s.faceIndex=Math.floor(x/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let p=0,_=f.length;p<_;p++){const x=f[p],m=o[x.materialIndex],E=Math.max(x.start,h.start),T=Math.min(l.count,Math.min(x.start+x.count,h.start+h.count));for(let C=E,P=T;C<P;C+=3){const g=C,R=C+1,D=C+2;s=ia(this,m,e,i,c,u,d,g,R,D),s&&(s.faceIndex=Math.floor(C/3),s.face.materialIndex=x.materialIndex,t.push(s))}}else{const p=Math.max(0,h.start),_=Math.min(l.count,h.start+h.count);for(let x=p,m=_;x<m;x+=3){const E=x,T=x+1,C=x+2;s=ia(this,o,e,i,c,u,d,E,T,C),s&&(s.faceIndex=Math.floor(x/3),t.push(s))}}}}function _h(n,e,t,i,s,r,o,a){let l;if(e.side===Pn?l=i.intersectTriangle(o,r,s,!0,a):l=i.intersectTriangle(s,r,o,e.side===ts,a),l===null)return null;na.copy(a),na.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(na);return c<t.near||c>t.far?null:{distance:c,point:na.clone(),object:n}}function ia(n,e,t,i,s,r,o,a,l,c){n.getVertexPosition(a,Jr),n.getVertexPosition(l,Qr),n.getVertexPosition(c,ea);const u=_h(n,e,t,i,Jr,Qr,ea,Ul);if(u){const d=new B;Jn.getBarycoord(Ul,Jr,Qr,ea,d),s&&(u.uv=Jn.getInterpolatedAttribute(s,a,l,c,d,new rt)),r&&(u.uv1=Jn.getInterpolatedAttribute(r,a,l,c,d,new rt)),o&&(u.normal=Jn.getInterpolatedAttribute(o,a,l,c,d,new B),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const f={a,b:l,c,normal:new B,materialIndex:0};Jn.getNormal(Jr,Qr,ea,f.normal),u.face=f,u.barycoord=d}return u}class ws extends Kt{constructor(e=1,t=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],u=[],d=[];let f=0,h=0;p("z","y","x",-1,-1,i,t,e,o,r,0),p("z","y","x",1,-1,i,t,-e,o,r,1),p("x","z","y",1,1,e,i,t,s,o,2),p("x","z","y",1,-1,e,i,-t,s,o,3),p("x","y","z",1,-1,e,t,i,s,r,4),p("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new Tt(c,3)),this.setAttribute("normal",new Tt(u,3)),this.setAttribute("uv",new Tt(d,2));function p(_,x,m,E,T,C,P,g,R,D,v){const b=C/R,A=P/D,N=C/2,U=P/2,H=g/2,q=R+1,Z=D+1;let ie=0,Q=0;const te=new B;for(let ne=0;ne<Z;ne++){const fe=ne*A-U;for(let Pe=0;Pe<q;Pe++){const ze=Pe*b-N;te[_]=ze*E,te[x]=fe*T,te[m]=H,c.push(te.x,te.y,te.z),te[_]=0,te[x]=0,te[m]=g>0?1:-1,u.push(te.x,te.y,te.z),d.push(Pe/R),d.push(1-ne/D),ie+=1}}for(let ne=0;ne<D;ne++)for(let fe=0;fe<R;fe++){const Pe=f+fe+q*ne,ze=f+fe+q*(ne+1),Je=f+(fe+1)+q*(ne+1),ft=f+(fe+1)+q*ne;l.push(Pe,ze,ft),l.push(ze,Je,ft),Q+=6}a.addGroup(h,Q,v),h+=Q,f+=ie}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ws(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function ir(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const s=n[t][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(Ze("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone():Array.isArray(s)?e[t][i]=s.slice():e[t][i]=s}}return e}function yn(n){const e={};for(let t=0;t<n.length;t++){const i=ir(n[t]);for(const s in i)e[s]=i[s]}return e}function vh(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function nd(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:mt.workingColorSpace}const bh={clone:ir,merge:yn};var yh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Mh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ui extends Es{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=yh,this.fragmentShader=Mh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ir(e.uniforms),this.uniformsGroups=vh(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class id extends zt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new vt,this.projectionMatrix=new vt,this.projectionMatrixInverse=new vt,this.coordinateSystem=li,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Gi=new B,Fl=new rt,Nl=new rt;class Rn extends id{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Aa*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Ka*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Aa*2*Math.atan(Math.tan(Ka*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Gi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Gi.x,Gi.y).multiplyScalar(-e/Gi.z),Gi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Gi.x,Gi.y).multiplyScalar(-e/Gi.z)}getViewSize(e,t){return this.getViewBounds(e,Fl,Nl),t.subVectors(Nl,Fl)}setViewOffset(e,t,i,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Ka*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,t-=o.offsetY*i/c,s*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Gs=-90,Hs=1;class Sh extends zt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Rn(Gs,Hs,e,t);s.layers=this.layers,this.add(s);const r=new Rn(Gs,Hs,e,t);r.layers=this.layers,this.add(r);const o=new Rn(Gs,Hs,e,t);o.layers=this.layers,this.add(o);const a=new Rn(Gs,Hs,e,t);a.layers=this.layers,this.add(a);const l=new Rn(Gs,Hs,e,t);l.layers=this.layers,this.add(l);const c=new Rn(Gs,Hs,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,s,r,o,a,l]=t;for(const c of t)this.remove(c);if(e===li)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===wa)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,u]=this.children,d=e.getRenderTarget(),f=e.getActiveCubeFace(),h=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,s),e.render(t,r),e.setRenderTarget(i,1,s),e.render(t,o),e.setRenderTarget(i,2,s),e.render(t,a),e.setRenderTarget(i,3,s),e.render(t,l),e.setRenderTarget(i,4,s),e.render(t,c),i.texture.generateMipmaps=_,e.setRenderTarget(i,5,s),e.render(t,u),e.setRenderTarget(d,f,h),e.xr.enabled=p,i.texture.needsPMREMUpdate=!0}}class sd extends pn{constructor(e=[],t=er,i,s,r,o,a,l,c,u){super(e,t,i,s,r,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Eh extends vs{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new sd(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new ws(5,5,5),r=new Ui({name:"CubemapFromEquirect",uniforms:ir(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Pn,blending:Li});r.uniforms.tEquirect.value=t;const o=new en(s,r),a=t.minFilter;return t.minFilter===gs&&(t.minFilter=Hn),new Sh(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,i=!0,s=!0){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,s);e.setRenderTarget(r)}}class dt extends zt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const wh={type:"move"};class vo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new dt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new dt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new B,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new B),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new dt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new B,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new B),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const _ of e.hand.values()){const x=t.getJointPose(_,i),m=this._getHandJoint(c,_);x!==null&&(m.matrix.fromArray(x.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=x.radius),m.visible=x!==null}const u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],f=u.position.distanceTo(d.position),h=.02,p=.005;c.inputState.pinching&&f>h+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=h-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(wh)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new dt;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class Wc{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new ot(e),this.density=t}clone(){return new Wc(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Th extends zt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ni,this.environmentIntensity=1,this.environmentRotation=new ni,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class rd extends pn{constructor(e=null,t=1,i=1,s,r,o,a,l,c=Bn,u=Bn,d,f){super(null,o,a,l,c,u,s,r,d,f),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ol extends Wn{constructor(e,t,i,s=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Ws=new vt,zl=new vt,sa=[],kl=new Ms,Ah=new vt,_r=new en,vr=new Ss;class Rh extends en{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Ol(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,Ah)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Ms),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Ws),kl.copy(e.boundingBox).applyMatrix4(Ws),this.boundingBox.union(kl)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ss),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Ws),vr.copy(e.boundingSphere).applyMatrix4(Ws),this.boundingSphere.union(vr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const i=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=i.length+1,o=e*r+1;for(let a=0;a<i.length;a++)i[a]=s[o+a]}raycast(e,t){const i=this.matrixWorld,s=this.count;if(_r.geometry=this.geometry,_r.material=this.material,_r.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),vr.copy(this.boundingSphere),vr.applyMatrix4(i),e.ray.intersectsSphere(vr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Ws),zl.multiplyMatrices(i,Ws),_r.matrixWorld=zl,_r.raycast(e,sa);for(let o=0,a=sa.length;o<a;o++){const l=sa[o];l.instanceId=r,l.object=this,t.push(l)}sa.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Ol(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const i=t.morphTargetInfluences,s=i.length+1;this.morphTexture===null&&(this.morphTexture=new rd(new Float32Array(s*this.count),s,this.count,Oc,ci));const r=this.morphTexture.source.data.data;let o=0;for(let c=0;c<i.length;c++)o+=i[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=s*e;r[l]=a,r.set(i,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const bo=new B,Ch=new B,Ph=new et;class Hi{constructor(e=new B(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const s=bo.subVectors(i,t).cross(Ch.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(bo),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(i,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||Ph.getNormalMatrix(e),s=this.coplanarPoint(bo).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ds=new Ss,Lh=new rt(.5,.5),ra=new B;class $c{constructor(e=new Hi,t=new Hi,i=new Hi,s=new Hi,r=new Hi,o=new Hi){this.planes=[e,t,i,s,r,o]}set(e,t,i,s,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=li,i=!1){const s=this.planes,r=e.elements,o=r[0],a=r[1],l=r[2],c=r[3],u=r[4],d=r[5],f=r[6],h=r[7],p=r[8],_=r[9],x=r[10],m=r[11],E=r[12],T=r[13],C=r[14],P=r[15];if(s[0].setComponents(c-o,h-u,m-p,P-E).normalize(),s[1].setComponents(c+o,h+u,m+p,P+E).normalize(),s[2].setComponents(c+a,h+d,m+_,P+T).normalize(),s[3].setComponents(c-a,h-d,m-_,P-T).normalize(),i)s[4].setComponents(l,f,x,C).normalize(),s[5].setComponents(c-l,h-f,m-x,P-C).normalize();else if(s[4].setComponents(c-l,h-f,m-x,P-C).normalize(),t===li)s[5].setComponents(c+l,h+f,m+x,P+C).normalize();else if(t===wa)s[5].setComponents(l,f,x,C).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ds.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ds.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ds)}intersectsSprite(e){ds.center.set(0,0,0);const t=Lh.distanceTo(e.center);return ds.radius=.7071067811865476+t,ds.applyMatrix4(e.matrixWorld),this.intersectsSphere(ds)}intersectsSphere(e){const t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const s=t[i];if(ra.x=s.normal.x>0?e.max.x:e.min.x,ra.y=s.normal.y>0?e.max.y:e.min.y,ra.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(ra)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class ad extends Es{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ot(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Ra=new B,Ca=new B,Bl=new vt,br=new Fa,aa=new Ss,yo=new B,Vl=new B;class Dh extends zt{constructor(e=new Kt,t=new ad){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let s=1,r=t.count;s<r;s++)Ra.fromBufferAttribute(t,s-1),Ca.fromBufferAttribute(t,s),i[s]=i[s-1],i[s]+=Ra.distanceTo(Ca);e.setAttribute("lineDistance",new Tt(i,1))}else Ze("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),aa.copy(i.boundingSphere),aa.applyMatrix4(s),aa.radius+=r,e.ray.intersectsSphere(aa)===!1)return;Bl.copy(s).invert(),br.copy(e.ray).applyMatrix4(Bl);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,u=i.index,f=i.attributes.position;if(u!==null){const h=Math.max(0,o.start),p=Math.min(u.count,o.start+o.count);for(let _=h,x=p-1;_<x;_+=c){const m=u.getX(_),E=u.getX(_+1),T=oa(this,e,br,l,m,E,_);T&&t.push(T)}if(this.isLineLoop){const _=u.getX(p-1),x=u.getX(h),m=oa(this,e,br,l,_,x,p-1);m&&t.push(m)}}else{const h=Math.max(0,o.start),p=Math.min(f.count,o.start+o.count);for(let _=h,x=p-1;_<x;_+=c){const m=oa(this,e,br,l,_,_+1,_);m&&t.push(m)}if(this.isLineLoop){const _=oa(this,e,br,l,p-1,h,p-1);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function oa(n,e,t,i,s,r,o){const a=n.geometry.attributes.position;if(Ra.fromBufferAttribute(a,s),Ca.fromBufferAttribute(a,r),t.distanceSqToSegment(Ra,Ca,yo,Vl)>i)return;yo.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(yo);if(!(c<e.near||c>e.far))return{distance:c,point:Vl.clone().applyMatrix4(n.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:n}}class od extends Es{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ot(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Gl=new vt,Ec=new Fa,ca=new Ss,la=new B;class Ih extends zt{constructor(e=new Kt,t=new od){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),ca.copy(i.boundingSphere),ca.applyMatrix4(s),ca.radius+=r,e.ray.intersectsSphere(ca)===!1)return;Gl.copy(s).invert(),Ec.copy(e.ray).applyMatrix4(Gl);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=i.index,d=i.attributes.position;if(c!==null){const f=Math.max(0,o.start),h=Math.min(c.count,o.start+o.count);for(let p=f,_=h;p<_;p++){const x=c.getX(p);la.fromBufferAttribute(d,x),Hl(la,x,l,s,e,t,this)}}else{const f=Math.max(0,o.start),h=Math.min(d.count,o.start+o.count);for(let p=f,_=h;p<_;p++)la.fromBufferAttribute(d,p),Hl(la,p,l,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Hl(n,e,t,i,s,r,o){const a=Ec.distanceSqToPoint(n);if(a<t){const l=new B;Ec.closestPointToPoint(n,l),l.applyMatrix4(i);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class Mo extends pn{constructor(e,t,i,s,r,o,a,l,c){super(e,t,i,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class cd extends pn{constructor(e,t,i=_s,s,r,o,a=Bn,l=Bn,c,u=Cr,d=1){if(u!==Cr&&u!==Pr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:e,height:t,depth:d};super(f,s,r,o,a,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Gc(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class ld extends pn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Xs extends Kt{constructor(e=1,t=1,i=4,s=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:i,radialSegments:s,heightSegments:r},t=Math.max(0,t),i=Math.max(1,Math.floor(i)),s=Math.max(3,Math.floor(s)),r=Math.max(1,Math.floor(r));const o=[],a=[],l=[],c=[],u=t/2,d=Math.PI/2*e,f=t,h=2*d+f,p=i*2+r,_=s+1,x=new B,m=new B;for(let E=0;E<=p;E++){let T=0,C=0,P=0,g=0;if(E<=i){const v=E/i,b=v*Math.PI/2;C=-u-e*Math.cos(b),P=e*Math.sin(b),g=-e*Math.cos(b),T=v*d}else if(E<=i+r){const v=(E-i)/r;C=-u+v*t,P=e,g=0,T=d+v*f}else{const v=(E-i-r)/i,b=v*Math.PI/2;C=u+e*Math.sin(b),P=e*Math.cos(b),g=e*Math.sin(b),T=d+f+v*d}const R=Math.max(0,Math.min(1,T/h));let D=0;E===0?D=.5/s:E===p&&(D=-.5/s);for(let v=0;v<=s;v++){const b=v/s,A=b*Math.PI*2,N=Math.sin(A),U=Math.cos(A);m.x=-P*U,m.y=C,m.z=P*N,a.push(m.x,m.y,m.z),x.set(-P*U,g,P*N),x.normalize(),l.push(x.x,x.y,x.z),c.push(b+D,R)}if(E>0){const v=(E-1)*_;for(let b=0;b<s;b++){const A=v+b,N=v+b+1,U=E*_+b,H=E*_+b+1;o.push(A,N,U),o.push(N,H,U)}}}this.setIndex(o),this.setAttribute("position",new Tt(a,3)),this.setAttribute("normal",new Tt(l,3)),this.setAttribute("uv",new Tt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Xs(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}}class Ei extends Kt{constructor(e=1,t=1,i=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const u=[],d=[],f=[],h=[];let p=0;const _=[],x=i/2;let m=0;E(),o===!1&&(e>0&&T(!0),t>0&&T(!1)),this.setIndex(u),this.setAttribute("position",new Tt(d,3)),this.setAttribute("normal",new Tt(f,3)),this.setAttribute("uv",new Tt(h,2));function E(){const C=new B,P=new B;let g=0;const R=(t-e)/i;for(let D=0;D<=r;D++){const v=[],b=D/r,A=b*(t-e)+e;for(let N=0;N<=s;N++){const U=N/s,H=U*l+a,q=Math.sin(H),Z=Math.cos(H);P.x=A*q,P.y=-b*i+x,P.z=A*Z,d.push(P.x,P.y,P.z),C.set(q,R,Z).normalize(),f.push(C.x,C.y,C.z),h.push(U,1-b),v.push(p++)}_.push(v)}for(let D=0;D<s;D++)for(let v=0;v<r;v++){const b=_[v][D],A=_[v+1][D],N=_[v+1][D+1],U=_[v][D+1];(e>0||v!==0)&&(u.push(b,A,U),g+=3),(t>0||v!==r-1)&&(u.push(A,N,U),g+=3)}c.addGroup(m,g,0),m+=g}function T(C){const P=p,g=new rt,R=new B;let D=0;const v=C===!0?e:t,b=C===!0?1:-1;for(let N=1;N<=s;N++)d.push(0,x*b,0),f.push(0,b,0),h.push(.5,.5),p++;const A=p;for(let N=0;N<=s;N++){const H=N/s*l+a,q=Math.cos(H),Z=Math.sin(H);R.x=v*Z,R.y=x*b,R.z=v*q,d.push(R.x,R.y,R.z),f.push(0,b,0),g.x=q*.5+.5,g.y=Z*.5*b+.5,h.push(g.x,g.y),p++}for(let N=0;N<s;N++){const U=P+N,H=A+N;C===!0?u.push(H,H+1,U):u.push(H+1,H,U),D+=3}c.addGroup(m,D,C===!0?1:2),m+=D}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ei(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class qc extends Ei{constructor(e=1,t=1,i=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,i,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new qc(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Na extends Kt{constructor(e=[],t=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:s};const r=[],o=[];a(s),c(i),u(),this.setAttribute("position",new Tt(r,3)),this.setAttribute("normal",new Tt(r.slice(),3)),this.setAttribute("uv",new Tt(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(E){const T=new B,C=new B,P=new B;for(let g=0;g<t.length;g+=3)h(t[g+0],T),h(t[g+1],C),h(t[g+2],P),l(T,C,P,E)}function l(E,T,C,P){const g=P+1,R=[];for(let D=0;D<=g;D++){R[D]=[];const v=E.clone().lerp(C,D/g),b=T.clone().lerp(C,D/g),A=g-D;for(let N=0;N<=A;N++)N===0&&D===g?R[D][N]=v:R[D][N]=v.clone().lerp(b,N/A)}for(let D=0;D<g;D++)for(let v=0;v<2*(g-D)-1;v++){const b=Math.floor(v/2);v%2===0?(f(R[D][b+1]),f(R[D+1][b]),f(R[D][b])):(f(R[D][b+1]),f(R[D+1][b+1]),f(R[D+1][b]))}}function c(E){const T=new B;for(let C=0;C<r.length;C+=3)T.x=r[C+0],T.y=r[C+1],T.z=r[C+2],T.normalize().multiplyScalar(E),r[C+0]=T.x,r[C+1]=T.y,r[C+2]=T.z}function u(){const E=new B;for(let T=0;T<r.length;T+=3){E.x=r[T+0],E.y=r[T+1],E.z=r[T+2];const C=x(E)/2/Math.PI+.5,P=m(E)/Math.PI+.5;o.push(C,1-P)}p(),d()}function d(){for(let E=0;E<o.length;E+=6){const T=o[E+0],C=o[E+2],P=o[E+4],g=Math.max(T,C,P),R=Math.min(T,C,P);g>.9&&R<.1&&(T<.2&&(o[E+0]+=1),C<.2&&(o[E+2]+=1),P<.2&&(o[E+4]+=1))}}function f(E){r.push(E.x,E.y,E.z)}function h(E,T){const C=E*3;T.x=e[C+0],T.y=e[C+1],T.z=e[C+2]}function p(){const E=new B,T=new B,C=new B,P=new B,g=new rt,R=new rt,D=new rt;for(let v=0,b=0;v<r.length;v+=9,b+=6){E.set(r[v+0],r[v+1],r[v+2]),T.set(r[v+3],r[v+4],r[v+5]),C.set(r[v+6],r[v+7],r[v+8]),g.set(o[b+0],o[b+1]),R.set(o[b+2],o[b+3]),D.set(o[b+4],o[b+5]),P.copy(E).add(T).add(C).divideScalar(3);const A=x(P);_(g,b+0,E,A),_(R,b+2,T,A),_(D,b+4,C,A)}}function _(E,T,C,P){P<0&&E.x===1&&(o[T]=E.x-1),C.x===0&&C.z===0&&(o[T]=P/2/Math.PI+.5)}function x(E){return Math.atan2(E.z,-E.x)}function m(E){return Math.atan2(-E.y,Math.sqrt(E.x*E.x+E.z*E.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Na(e.vertices,e.indices,e.radius,e.details)}}class Xc extends Na{constructor(e=1,t=0){const i=(1+Math.sqrt(5))/2,s=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Xc(e.radius,e.detail)}}class jc extends Na{constructor(e=1,t=0){const i=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(i,s,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new jc(e.radius,e.detail)}}class sr extends Kt{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};const r=e/2,o=t/2,a=Math.floor(i),l=Math.floor(s),c=a+1,u=l+1,d=e/a,f=t/l,h=[],p=[],_=[],x=[];for(let m=0;m<u;m++){const E=m*f-o;for(let T=0;T<c;T++){const C=T*d-r;p.push(C,-E,0),_.push(0,0,1),x.push(T/a),x.push(1-m/l)}}for(let m=0;m<l;m++)for(let E=0;E<a;E++){const T=E+c*m,C=E+c*(m+1),P=E+1+c*(m+1),g=E+1+c*m;h.push(T,C,g),h.push(C,P,g)}this.setIndex(h),this.setAttribute("position",new Tt(p,3)),this.setAttribute("normal",new Tt(_,3)),this.setAttribute("uv",new Tt(x,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new sr(e.width,e.height,e.widthSegments,e.heightSegments)}}class Zn extends Kt{constructor(e=.5,t=1,i=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:s,thetaStart:r,thetaLength:o},i=Math.max(3,i),s=Math.max(1,s);const a=[],l=[],c=[],u=[];let d=e;const f=(t-e)/s,h=new B,p=new rt;for(let _=0;_<=s;_++){for(let x=0;x<=i;x++){const m=r+x/i*o;h.x=d*Math.cos(m),h.y=d*Math.sin(m),l.push(h.x,h.y,h.z),c.push(0,0,1),p.x=(h.x/t+1)/2,p.y=(h.y/t+1)/2,u.push(p.x,p.y)}d+=f}for(let _=0;_<s;_++){const x=_*(i+1);for(let m=0;m<i;m++){const E=m+x,T=E,C=E+i+1,P=E+i+2,g=E+1;a.push(T,C,g),a.push(C,P,g)}}this.setIndex(a),this.setAttribute("position",new Tt(l,3)),this.setAttribute("normal",new Tt(c,3)),this.setAttribute("uv",new Tt(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Zn(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Dr extends Kt{constructor(e=1,t=32,i=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(o+a,Math.PI);let c=0;const u=[],d=new B,f=new B,h=[],p=[],_=[],x=[];for(let m=0;m<=i;m++){const E=[],T=m/i;let C=0;m===0&&o===0?C=.5/t:m===i&&l===Math.PI&&(C=-.5/t);for(let P=0;P<=t;P++){const g=P/t;d.x=-e*Math.cos(s+g*r)*Math.sin(o+T*a),d.y=e*Math.cos(o+T*a),d.z=e*Math.sin(s+g*r)*Math.sin(o+T*a),p.push(d.x,d.y,d.z),f.copy(d).normalize(),_.push(f.x,f.y,f.z),x.push(g+C,1-T),E.push(c++)}u.push(E)}for(let m=0;m<i;m++)for(let E=0;E<t;E++){const T=u[m][E+1],C=u[m][E],P=u[m+1][E],g=u[m+1][E+1];(m!==0||o>0)&&h.push(T,C,g),(m!==i-1||l<Math.PI)&&h.push(C,P,g)}this.setIndex(h),this.setAttribute("position",new Tt(p,3)),this.setAttribute("normal",new Tt(_,3)),this.setAttribute("uv",new Tt(x,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Dr(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class ji extends Kt{constructor(e=1,t=.4,i=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:s,arc:r},i=Math.floor(i),s=Math.floor(s);const o=[],a=[],l=[],c=[],u=new B,d=new B,f=new B;for(let h=0;h<=i;h++)for(let p=0;p<=s;p++){const _=p/s*r,x=h/i*Math.PI*2;d.x=(e+t*Math.cos(x))*Math.cos(_),d.y=(e+t*Math.cos(x))*Math.sin(_),d.z=t*Math.sin(x),a.push(d.x,d.y,d.z),u.x=e*Math.cos(_),u.y=e*Math.sin(_),f.subVectors(d,u).normalize(),l.push(f.x,f.y,f.z),c.push(p/s),c.push(h/i)}for(let h=1;h<=i;h++)for(let p=1;p<=s;p++){const _=(s+1)*h+p-1,x=(s+1)*(h-1)+p-1,m=(s+1)*(h-1)+p,E=(s+1)*h+p;o.push(_,x,E),o.push(x,m,E)}this.setIndex(o),this.setAttribute("position",new Tt(a,3)),this.setAttribute("normal",new Tt(l,3)),this.setAttribute("uv",new Tt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ji(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Mi extends Es{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ot(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ot(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Yu,this.normalScale=new rt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ni,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Uh extends Es{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Hf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Fh extends Es{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Oa extends zt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ot(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class Nh extends Oa{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(zt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ot(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const So=new vt,Wl=new B,$l=new B;class Yc{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new rt(512,512),this.mapType=ui,this.map=null,this.mapPass=null,this.matrix=new vt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new $c,this._frameExtents=new rt(1,1),this._viewportCount=1,this._viewports=[new St(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;Wl.setFromMatrixPosition(e.matrixWorld),t.position.copy(Wl),$l.setFromMatrixPosition(e.target.matrixWorld),t.lookAt($l),t.updateMatrixWorld(),So.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(So,t.coordinateSystem,t.reversedDepth),t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(So)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class Oh extends Yc{constructor(){super(new Rn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,i=Aa*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(i!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=i,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class zh extends Oa{constructor(e,t,i=0,s=Math.PI/3,r=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(zt.DEFAULT_UP),this.updateMatrix(),this.target=new zt,this.distance=i,this.angle=s,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new Oh}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const ql=new vt,yr=new B,Eo=new B;class kh extends Yc{constructor(){super(new Rn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new rt(4,2),this._viewportCount=6,this._viewports=[new St(2,1,1,1),new St(0,1,1,1),new St(3,1,1,1),new St(1,1,1,1),new St(3,0,1,1),new St(1,0,1,1)],this._cubeDirections=[new B(1,0,0),new B(-1,0,0),new B(0,0,1),new B(0,0,-1),new B(0,1,0),new B(0,-1,0)],this._cubeUps=[new B(0,1,0),new B(0,1,0),new B(0,1,0),new B(0,1,0),new B(0,0,1),new B(0,0,-1)]}updateMatrices(e,t=0){const i=this.camera,s=this.matrix,r=e.distance||i.far;r!==i.far&&(i.far=r,i.updateProjectionMatrix()),yr.setFromMatrixPosition(e.matrixWorld),i.position.copy(yr),Eo.copy(i.position),Eo.add(this._cubeDirections[t]),i.up.copy(this._cubeUps[t]),i.lookAt(Eo),i.updateMatrixWorld(),s.makeTranslation(-yr.x,-yr.y,-yr.z),ql.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ql,i.coordinateSystem,i.reversedDepth)}}class wo extends Oa{constructor(e,t,i=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new kh}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class ud extends id{constructor(e=-1,t=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-e,o=i+e,a=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Bh extends Yc{constructor(){super(new ud(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Xl extends Oa{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(zt.DEFAULT_UP),this.updateMatrix(),this.target=new zt,this.shadow=new Bh}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Vh extends Rn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const jl=new vt;class Gh{constructor(e,t,i=0,s=1/0){this.ray=new Fa(e,t),this.near=i,this.far=s,this.camera=null,this.layers=new Hc,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Ot("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return jl.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(jl),this}intersectObject(e,t=!0,i=[]){return wc(e,this,i,t),i.sort(Yl),i}intersectObjects(e,t=!0,i=[]){for(let s=0,r=e.length;s<r;s++)wc(e[s],this,i,t);return i.sort(Yl),i}}function Yl(n,e){return n.distance-e.distance}function wc(n,e,t,i){let s=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(s=!1),s===!0&&i===!0){const r=n.children;for(let o=0,a=r.length;o<a;o++)wc(r[o],e,t,!0)}}function Kl(n,e,t,i){const s=Hh(i);switch(t){case Xu:return n*e;case Oc:return n*e/s.components*s.byteLength;case zc:return n*e/s.components*s.byteLength;case kc:return n*e*2/s.components*s.byteLength;case Bc:return n*e*2/s.components*s.byteLength;case ju:return n*e*3/s.components*s.byteLength;case Qn:return n*e*4/s.components*s.byteLength;case Vc:return n*e*4/s.components*s.byteLength;case pa:case ma:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case xa:case ga:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Zo:case Qo:return Math.max(n,16)*Math.max(e,8)/4;case Ko:case Jo:return Math.max(n,8)*Math.max(e,8)/2;case ec:case tc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case nc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case ic:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case sc:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case rc:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case ac:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case oc:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case cc:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case lc:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case uc:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case dc:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case fc:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case hc:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case pc:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case mc:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case xc:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case gc:case _c:case vc:return Math.ceil(n/4)*Math.ceil(e/4)*16;case bc:case yc:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Mc:case Sc:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Hh(n){switch(n){case ui:case Hu:return{byteLength:1,components:1};case Ar:case Wu:case ar:return{byteLength:2,components:1};case Fc:case Nc:return{byteLength:2,components:4};case _s:case Uc:case ci:return{byteLength:4,components:1};case $u:case qu:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ic}}));typeof window<"u"&&(window.__THREE__?Ze("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ic);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function dd(){let n=null,e=!1,t=null,i=null;function s(r,o){t(r,o),i=n.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function Wh(n){const e=new WeakMap;function t(a,l){const c=a.array,u=a.usage,d=c.byteLength,f=n.createBuffer();n.bindBuffer(l,f),n.bufferData(l,c,u),a.onUploadCallback();let h;if(c instanceof Float32Array)h=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)h=n.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?h=n.HALF_FLOAT:h=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)h=n.SHORT;else if(c instanceof Uint32Array)h=n.UNSIGNED_INT;else if(c instanceof Int32Array)h=n.INT;else if(c instanceof Int8Array)h=n.BYTE;else if(c instanceof Uint8Array)h=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)h=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:h,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function i(a,l,c){const u=l.array,d=l.updateRanges;if(n.bindBuffer(c,a),d.length===0)n.bufferSubData(c,0,u);else{d.sort((h,p)=>h.start-p.start);let f=0;for(let h=1;h<d.length;h++){const p=d[f],_=d[h];_.start<=p.start+p.count+1?p.count=Math.max(p.count,_.start+_.count-p.start):(++f,d[f]=_)}d.length=f+1;for(let h=0,p=d.length;h<p;h++){const _=d[h];n.bufferSubData(c,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(n.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}var $h=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,qh=`#ifdef USE_ALPHAHASH
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
#endif`,Xh=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,jh=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Yh=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Kh=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Zh=`#ifdef USE_AOMAP
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
#endif`,Jh=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Qh=`#ifdef USE_BATCHING
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
#endif`,ep=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,tp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,np=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,ip=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,sp=`#ifdef USE_IRIDESCENCE
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
#endif`,rp=`#ifdef USE_BUMPMAP
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
#endif`,ap=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,op=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,cp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,lp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,up=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,dp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,fp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,hp=`#if defined( USE_COLOR_ALPHA )
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
#endif`,pp=`#define PI 3.141592653589793
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
} // validated`,mp=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,xp=`vec3 transformedNormal = objectNormal;
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
#endif`,gp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,_p=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,vp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,bp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,yp="gl_FragColor = linearToOutputTexel( gl_FragColor );",Mp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Sp=`#ifdef USE_ENVMAP
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
#endif`,Ep=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,wp=`#ifdef USE_ENVMAP
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
#endif`,Tp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Ap=`#ifdef USE_ENVMAP
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
#endif`,Rp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Cp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Pp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Lp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Dp=`#ifdef USE_GRADIENTMAP
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
}`,Ip=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Up=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Fp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Np=`uniform bool receiveShadow;
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
#endif`,Op=`#ifdef USE_ENVMAP
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
#endif`,zp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,kp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Bp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Vp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Gp=`PhysicalMaterial material;
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
#endif`,Hp=`uniform sampler2D dfgLUT;
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
}`,Wp=`
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
#endif`,$p=`#if defined( RE_IndirectDiffuse )
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
#endif`,qp=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Xp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,jp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Yp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Kp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Zp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Jp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Qp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,e0=`#if defined( USE_POINTS_UV )
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
#endif`,t0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,n0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,i0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,s0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,r0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,a0=`#ifdef USE_MORPHTARGETS
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
#endif`,o0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,c0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,l0=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,u0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,d0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,f0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,h0=`#ifdef USE_NORMALMAP
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
#endif`,p0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,m0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,x0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,g0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,_0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,v0=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,b0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,y0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,M0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,S0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,E0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,w0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,T0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,A0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,R0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,C0=`float getShadowMask() {
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
}`,P0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,L0=`#ifdef USE_SKINNING
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
#endif`,D0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,I0=`#ifdef USE_SKINNING
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
#endif`,U0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,F0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,N0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,O0=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,z0=`#ifdef USE_TRANSMISSION
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
#endif`,k0=`#ifdef USE_TRANSMISSION
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
#endif`,B0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,V0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,G0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,H0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const W0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,$0=`uniform sampler2D t2D;
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
}`,q0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,X0=`#ifdef ENVMAP_TYPE_CUBE
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
}`,j0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Y0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,K0=`#include <common>
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
}`,Z0=`#if DEPTH_PACKING == 3200
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
}`,J0=`#define DISTANCE
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
}`,Q0=`#define DISTANCE
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
}`,em=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,tm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,nm=`uniform float scale;
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
}`,im=`uniform vec3 diffuse;
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
}`,sm=`#include <common>
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
}`,rm=`uniform vec3 diffuse;
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
}`,am=`#define LAMBERT
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
}`,om=`#define LAMBERT
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
}`,cm=`#define MATCAP
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
}`,lm=`#define MATCAP
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
}`,um=`#define NORMAL
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
}`,dm=`#define NORMAL
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
}`,fm=`#define PHONG
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
}`,hm=`#define PHONG
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
}`,pm=`#define STANDARD
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
}`,mm=`#define STANDARD
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
}`,xm=`#define TOON
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
}`,gm=`#define TOON
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
}`,_m=`uniform float size;
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
}`,vm=`uniform vec3 diffuse;
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
}`,bm=`#include <common>
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
}`,ym=`uniform vec3 color;
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
}`,Mm=`uniform float rotation;
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
}`,Sm=`uniform vec3 diffuse;
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
}`,tt={alphahash_fragment:$h,alphahash_pars_fragment:qh,alphamap_fragment:Xh,alphamap_pars_fragment:jh,alphatest_fragment:Yh,alphatest_pars_fragment:Kh,aomap_fragment:Zh,aomap_pars_fragment:Jh,batching_pars_vertex:Qh,batching_vertex:ep,begin_vertex:tp,beginnormal_vertex:np,bsdfs:ip,iridescence_fragment:sp,bumpmap_pars_fragment:rp,clipping_planes_fragment:ap,clipping_planes_pars_fragment:op,clipping_planes_pars_vertex:cp,clipping_planes_vertex:lp,color_fragment:up,color_pars_fragment:dp,color_pars_vertex:fp,color_vertex:hp,common:pp,cube_uv_reflection_fragment:mp,defaultnormal_vertex:xp,displacementmap_pars_vertex:gp,displacementmap_vertex:_p,emissivemap_fragment:vp,emissivemap_pars_fragment:bp,colorspace_fragment:yp,colorspace_pars_fragment:Mp,envmap_fragment:Sp,envmap_common_pars_fragment:Ep,envmap_pars_fragment:wp,envmap_pars_vertex:Tp,envmap_physical_pars_fragment:Op,envmap_vertex:Ap,fog_vertex:Rp,fog_pars_vertex:Cp,fog_fragment:Pp,fog_pars_fragment:Lp,gradientmap_pars_fragment:Dp,lightmap_pars_fragment:Ip,lights_lambert_fragment:Up,lights_lambert_pars_fragment:Fp,lights_pars_begin:Np,lights_toon_fragment:zp,lights_toon_pars_fragment:kp,lights_phong_fragment:Bp,lights_phong_pars_fragment:Vp,lights_physical_fragment:Gp,lights_physical_pars_fragment:Hp,lights_fragment_begin:Wp,lights_fragment_maps:$p,lights_fragment_end:qp,logdepthbuf_fragment:Xp,logdepthbuf_pars_fragment:jp,logdepthbuf_pars_vertex:Yp,logdepthbuf_vertex:Kp,map_fragment:Zp,map_pars_fragment:Jp,map_particle_fragment:Qp,map_particle_pars_fragment:e0,metalnessmap_fragment:t0,metalnessmap_pars_fragment:n0,morphinstance_vertex:i0,morphcolor_vertex:s0,morphnormal_vertex:r0,morphtarget_pars_vertex:a0,morphtarget_vertex:o0,normal_fragment_begin:c0,normal_fragment_maps:l0,normal_pars_fragment:u0,normal_pars_vertex:d0,normal_vertex:f0,normalmap_pars_fragment:h0,clearcoat_normal_fragment_begin:p0,clearcoat_normal_fragment_maps:m0,clearcoat_pars_fragment:x0,iridescence_pars_fragment:g0,opaque_fragment:_0,packing:v0,premultiplied_alpha_fragment:b0,project_vertex:y0,dithering_fragment:M0,dithering_pars_fragment:S0,roughnessmap_fragment:E0,roughnessmap_pars_fragment:w0,shadowmap_pars_fragment:T0,shadowmap_pars_vertex:A0,shadowmap_vertex:R0,shadowmask_pars_fragment:C0,skinbase_vertex:P0,skinning_pars_vertex:L0,skinning_vertex:D0,skinnormal_vertex:I0,specularmap_fragment:U0,specularmap_pars_fragment:F0,tonemapping_fragment:N0,tonemapping_pars_fragment:O0,transmission_fragment:z0,transmission_pars_fragment:k0,uv_pars_fragment:B0,uv_pars_vertex:V0,uv_vertex:G0,worldpos_vertex:H0,background_vert:W0,background_frag:$0,backgroundCube_vert:q0,backgroundCube_frag:X0,cube_vert:j0,cube_frag:Y0,depth_vert:K0,depth_frag:Z0,distanceRGBA_vert:J0,distanceRGBA_frag:Q0,equirect_vert:em,equirect_frag:tm,linedashed_vert:nm,linedashed_frag:im,meshbasic_vert:sm,meshbasic_frag:rm,meshlambert_vert:am,meshlambert_frag:om,meshmatcap_vert:cm,meshmatcap_frag:lm,meshnormal_vert:um,meshnormal_frag:dm,meshphong_vert:fm,meshphong_frag:hm,meshphysical_vert:pm,meshphysical_frag:mm,meshtoon_vert:xm,meshtoon_frag:gm,points_vert:_m,points_frag:vm,shadow_vert:bm,shadow_frag:ym,sprite_vert:Mm,sprite_frag:Sm},ve={common:{diffuse:{value:new ot(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new et},alphaMap:{value:null},alphaMapTransform:{value:new et},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new et}},envmap:{envMap:{value:null},envMapRotation:{value:new et},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new et}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new et}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new et},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new et},normalScale:{value:new rt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new et},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new et}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new et}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new et}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ot(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ot(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new et},alphaTest:{value:0},uvTransform:{value:new et}},sprite:{diffuse:{value:new ot(16777215)},opacity:{value:1},center:{value:new rt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new et},alphaMap:{value:null},alphaMapTransform:{value:new et},alphaTest:{value:0}}},ai={basic:{uniforms:yn([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.fog]),vertexShader:tt.meshbasic_vert,fragmentShader:tt.meshbasic_frag},lambert:{uniforms:yn([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,ve.lights,{emissive:{value:new ot(0)}}]),vertexShader:tt.meshlambert_vert,fragmentShader:tt.meshlambert_frag},phong:{uniforms:yn([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,ve.lights,{emissive:{value:new ot(0)},specular:{value:new ot(1118481)},shininess:{value:30}}]),vertexShader:tt.meshphong_vert,fragmentShader:tt.meshphong_frag},standard:{uniforms:yn([ve.common,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.roughnessmap,ve.metalnessmap,ve.fog,ve.lights,{emissive:{value:new ot(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:tt.meshphysical_vert,fragmentShader:tt.meshphysical_frag},toon:{uniforms:yn([ve.common,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.gradientmap,ve.fog,ve.lights,{emissive:{value:new ot(0)}}]),vertexShader:tt.meshtoon_vert,fragmentShader:tt.meshtoon_frag},matcap:{uniforms:yn([ve.common,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,{matcap:{value:null}}]),vertexShader:tt.meshmatcap_vert,fragmentShader:tt.meshmatcap_frag},points:{uniforms:yn([ve.points,ve.fog]),vertexShader:tt.points_vert,fragmentShader:tt.points_frag},dashed:{uniforms:yn([ve.common,ve.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:tt.linedashed_vert,fragmentShader:tt.linedashed_frag},depth:{uniforms:yn([ve.common,ve.displacementmap]),vertexShader:tt.depth_vert,fragmentShader:tt.depth_frag},normal:{uniforms:yn([ve.common,ve.bumpmap,ve.normalmap,ve.displacementmap,{opacity:{value:1}}]),vertexShader:tt.meshnormal_vert,fragmentShader:tt.meshnormal_frag},sprite:{uniforms:yn([ve.sprite,ve.fog]),vertexShader:tt.sprite_vert,fragmentShader:tt.sprite_frag},background:{uniforms:{uvTransform:{value:new et},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:tt.background_vert,fragmentShader:tt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new et}},vertexShader:tt.backgroundCube_vert,fragmentShader:tt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:tt.cube_vert,fragmentShader:tt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:tt.equirect_vert,fragmentShader:tt.equirect_frag},distanceRGBA:{uniforms:yn([ve.common,ve.displacementmap,{referencePosition:{value:new B},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:tt.distanceRGBA_vert,fragmentShader:tt.distanceRGBA_frag},shadow:{uniforms:yn([ve.lights,ve.fog,{color:{value:new ot(0)},opacity:{value:1}}]),vertexShader:tt.shadow_vert,fragmentShader:tt.shadow_frag}};ai.physical={uniforms:yn([ai.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new et},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new et},clearcoatNormalScale:{value:new rt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new et},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new et},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new et},sheen:{value:0},sheenColor:{value:new ot(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new et},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new et},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new et},transmissionSamplerSize:{value:new rt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new et},attenuationDistance:{value:0},attenuationColor:{value:new ot(0)},specularColor:{value:new ot(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new et},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new et},anisotropyVector:{value:new rt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new et}}]),vertexShader:tt.meshphysical_vert,fragmentShader:tt.meshphysical_frag};const ua={r:0,b:0,g:0},fs=new ni,Em=new vt;function wm(n,e,t,i,s,r,o){const a=new ot(0);let l=r===!0?0:1,c,u,d=null,f=0,h=null;function p(T){let C=T.isScene===!0?T.background:null;return C&&C.isTexture&&(C=(T.backgroundBlurriness>0?t:e).get(C)),C}function _(T){let C=!1;const P=p(T);P===null?m(a,l):P&&P.isColor&&(m(P,1),C=!0);const g=n.xr.getEnvironmentBlendMode();g==="additive"?i.buffers.color.setClear(0,0,0,1,o):g==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||C)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function x(T,C){const P=p(C);P&&(P.isCubeTexture||P.mapping===Ua)?(u===void 0&&(u=new en(new ws(1,1,1),new Ui({name:"BackgroundCubeMaterial",uniforms:ir(ai.backgroundCube.uniforms),vertexShader:ai.backgroundCube.vertexShader,fragmentShader:ai.backgroundCube.fragmentShader,side:Pn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(g,R,D){this.matrixWorld.copyPosition(D.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),fs.copy(C.backgroundRotation),fs.x*=-1,fs.y*=-1,fs.z*=-1,P.isCubeTexture&&P.isRenderTargetTexture===!1&&(fs.y*=-1,fs.z*=-1),u.material.uniforms.envMap.value=P,u.material.uniforms.flipEnvMap.value=P.isCubeTexture&&P.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=C.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Em.makeRotationFromEuler(fs)),u.material.toneMapped=mt.getTransfer(P.colorSpace)!==Mt,(d!==P||f!==P.version||h!==n.toneMapping)&&(u.material.needsUpdate=!0,d=P,f=P.version,h=n.toneMapping),u.layers.enableAll(),T.unshift(u,u.geometry,u.material,0,0,null)):P&&P.isTexture&&(c===void 0&&(c=new en(new sr(2,2),new Ui({name:"BackgroundMaterial",uniforms:ir(ai.background.uniforms),vertexShader:ai.background.vertexShader,fragmentShader:ai.background.fragmentShader,side:ts,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=P,c.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,c.material.toneMapped=mt.getTransfer(P.colorSpace)!==Mt,P.matrixAutoUpdate===!0&&P.updateMatrix(),c.material.uniforms.uvTransform.value.copy(P.matrix),(d!==P||f!==P.version||h!==n.toneMapping)&&(c.material.needsUpdate=!0,d=P,f=P.version,h=n.toneMapping),c.layers.enableAll(),T.unshift(c,c.geometry,c.material,0,0,null))}function m(T,C){T.getRGB(ua,nd(n)),i.buffers.color.setClear(ua.r,ua.g,ua.b,C,o)}function E(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(T,C=1){a.set(T),l=C,m(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(T){l=T,m(a,l)},render:_,addToRenderList:x,dispose:E}}function Tm(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=f(null);let r=s,o=!1;function a(b,A,N,U,H){let q=!1;const Z=d(U,N,A);r!==Z&&(r=Z,c(r.object)),q=h(b,U,N,H),q&&p(b,U,N,H),H!==null&&e.update(H,n.ELEMENT_ARRAY_BUFFER),(q||o)&&(o=!1,C(b,A,N,U),H!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(H).buffer))}function l(){return n.createVertexArray()}function c(b){return n.bindVertexArray(b)}function u(b){return n.deleteVertexArray(b)}function d(b,A,N){const U=N.wireframe===!0;let H=i[b.id];H===void 0&&(H={},i[b.id]=H);let q=H[A.id];q===void 0&&(q={},H[A.id]=q);let Z=q[U];return Z===void 0&&(Z=f(l()),q[U]=Z),Z}function f(b){const A=[],N=[],U=[];for(let H=0;H<t;H++)A[H]=0,N[H]=0,U[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:A,enabledAttributes:N,attributeDivisors:U,object:b,attributes:{},index:null}}function h(b,A,N,U){const H=r.attributes,q=A.attributes;let Z=0;const ie=N.getAttributes();for(const Q in ie)if(ie[Q].location>=0){const ne=H[Q];let fe=q[Q];if(fe===void 0&&(Q==="instanceMatrix"&&b.instanceMatrix&&(fe=b.instanceMatrix),Q==="instanceColor"&&b.instanceColor&&(fe=b.instanceColor)),ne===void 0||ne.attribute!==fe||fe&&ne.data!==fe.data)return!0;Z++}return r.attributesNum!==Z||r.index!==U}function p(b,A,N,U){const H={},q=A.attributes;let Z=0;const ie=N.getAttributes();for(const Q in ie)if(ie[Q].location>=0){let ne=q[Q];ne===void 0&&(Q==="instanceMatrix"&&b.instanceMatrix&&(ne=b.instanceMatrix),Q==="instanceColor"&&b.instanceColor&&(ne=b.instanceColor));const fe={};fe.attribute=ne,ne&&ne.data&&(fe.data=ne.data),H[Q]=fe,Z++}r.attributes=H,r.attributesNum=Z,r.index=U}function _(){const b=r.newAttributes;for(let A=0,N=b.length;A<N;A++)b[A]=0}function x(b){m(b,0)}function m(b,A){const N=r.newAttributes,U=r.enabledAttributes,H=r.attributeDivisors;N[b]=1,U[b]===0&&(n.enableVertexAttribArray(b),U[b]=1),H[b]!==A&&(n.vertexAttribDivisor(b,A),H[b]=A)}function E(){const b=r.newAttributes,A=r.enabledAttributes;for(let N=0,U=A.length;N<U;N++)A[N]!==b[N]&&(n.disableVertexAttribArray(N),A[N]=0)}function T(b,A,N,U,H,q,Z){Z===!0?n.vertexAttribIPointer(b,A,N,H,q):n.vertexAttribPointer(b,A,N,U,H,q)}function C(b,A,N,U){_();const H=U.attributes,q=N.getAttributes(),Z=A.defaultAttributeValues;for(const ie in q){const Q=q[ie];if(Q.location>=0){let te=H[ie];if(te===void 0&&(ie==="instanceMatrix"&&b.instanceMatrix&&(te=b.instanceMatrix),ie==="instanceColor"&&b.instanceColor&&(te=b.instanceColor)),te!==void 0){const ne=te.normalized,fe=te.itemSize,Pe=e.get(te);if(Pe===void 0)continue;const ze=Pe.buffer,Je=Pe.type,ft=Pe.bytesPerElement,re=Je===n.INT||Je===n.UNSIGNED_INT||te.gpuType===Uc;if(te.isInterleavedBufferAttribute){const oe=te.data,Ee=oe.stride,We=te.offset;if(oe.isInstancedInterleavedBuffer){for(let Ie=0;Ie<Q.locationSize;Ie++)m(Q.location+Ie,oe.meshPerAttribute);b.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=oe.meshPerAttribute*oe.count)}else for(let Ie=0;Ie<Q.locationSize;Ie++)x(Q.location+Ie);n.bindBuffer(n.ARRAY_BUFFER,ze);for(let Ie=0;Ie<Q.locationSize;Ie++)T(Q.location+Ie,fe/Q.locationSize,Je,ne,Ee*ft,(We+fe/Q.locationSize*Ie)*ft,re)}else{if(te.isInstancedBufferAttribute){for(let oe=0;oe<Q.locationSize;oe++)m(Q.location+oe,te.meshPerAttribute);b.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=te.meshPerAttribute*te.count)}else for(let oe=0;oe<Q.locationSize;oe++)x(Q.location+oe);n.bindBuffer(n.ARRAY_BUFFER,ze);for(let oe=0;oe<Q.locationSize;oe++)T(Q.location+oe,fe/Q.locationSize,Je,ne,fe*ft,fe/Q.locationSize*oe*ft,re)}}else if(Z!==void 0){const ne=Z[ie];if(ne!==void 0)switch(ne.length){case 2:n.vertexAttrib2fv(Q.location,ne);break;case 3:n.vertexAttrib3fv(Q.location,ne);break;case 4:n.vertexAttrib4fv(Q.location,ne);break;default:n.vertexAttrib1fv(Q.location,ne)}}}}E()}function P(){D();for(const b in i){const A=i[b];for(const N in A){const U=A[N];for(const H in U)u(U[H].object),delete U[H];delete A[N]}delete i[b]}}function g(b){if(i[b.id]===void 0)return;const A=i[b.id];for(const N in A){const U=A[N];for(const H in U)u(U[H].object),delete U[H];delete A[N]}delete i[b.id]}function R(b){for(const A in i){const N=i[A];if(N[b.id]===void 0)continue;const U=N[b.id];for(const H in U)u(U[H].object),delete U[H];delete N[b.id]}}function D(){v(),o=!0,r!==s&&(r=s,c(r.object))}function v(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:D,resetDefaultState:v,dispose:P,releaseStatesOfGeometry:g,releaseStatesOfProgram:R,initAttributes:_,enableAttribute:x,disableUnusedAttributes:E}}function Am(n,e,t){let i;function s(c){i=c}function r(c,u){n.drawArrays(i,c,u),t.update(u,i,1)}function o(c,u,d){d!==0&&(n.drawArraysInstanced(i,c,u,d),t.update(u,i,d))}function a(c,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,u,0,d);let h=0;for(let p=0;p<d;p++)h+=u[p];t.update(h,i,1)}function l(c,u,d,f){if(d===0)return;const h=e.get("WEBGL_multi_draw");if(h===null)for(let p=0;p<c.length;p++)o(c[p],u[p],f[p]);else{h.multiDrawArraysInstancedWEBGL(i,c,0,u,0,f,0,d);let p=0;for(let _=0;_<d;_++)p+=u[_]*f[_];t.update(p,i,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function Rm(n,e,t,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const R=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(R){return!(R!==Qn&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(R){const D=R===ar&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==ui&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==ci&&!D)}function l(R){if(R==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(Ze("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const d=t.logarithmicDepthBuffer===!0,f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),h=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),p=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_TEXTURE_SIZE),x=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),m=n.getParameter(n.MAX_VERTEX_ATTRIBS),E=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),T=n.getParameter(n.MAX_VARYING_VECTORS),C=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),P=p>0,g=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:h,maxVertexTextures:p,maxTextureSize:_,maxCubemapSize:x,maxAttributes:m,maxVertexUniforms:E,maxVaryings:T,maxFragmentUniforms:C,vertexTextures:P,maxSamples:g}}function Cm(n){const e=this;let t=null,i=0,s=!1,r=!1;const o=new Hi,a=new et,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){const h=d.length!==0||f||i!==0||s;return s=f,i=d.length,h},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,f){t=u(d,f,0)},this.setState=function(d,f,h){const p=d.clippingPlanes,_=d.clipIntersection,x=d.clipShadows,m=n.get(d);if(!s||p===null||p.length===0||r&&!x)r?u(null):c();else{const E=r?0:i,T=E*4;let C=m.clippingState||null;l.value=C,C=u(p,f,T,h);for(let P=0;P!==T;++P)C[P]=t[P];m.clippingState=C,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=E}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(d,f,h,p){const _=d!==null?d.length:0;let x=null;if(_!==0){if(x=l.value,p!==!0||x===null){const m=h+_*4,E=f.matrixWorldInverse;a.getNormalMatrix(E),(x===null||x.length<m)&&(x=new Float32Array(m));for(let T=0,C=h;T!==_;++T,C+=4)o.copy(d[T]).applyMatrix4(E,a),o.normal.toArray(x,C),x[C+3]=o.constant}l.value=x,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,x}}function Pm(n){let e=new WeakMap;function t(o,a){return a===Xo?o.mapping=er:a===jo&&(o.mapping=tr),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===Xo||a===jo)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new Eh(l.height);return c.fromEquirectangularTexture(n,o),e.set(o,c),o.addEventListener("dispose",s),t(c.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function r(){e=new WeakMap}return{get:i,dispose:r}}const $i=4,Zl=[.125,.215,.35,.446,.526,.582],ms=20,Lm=256,Mr=new ud,Jl=new ot;let To=null,Ao=0,Ro=0,Co=!1;const Dm=new B;class Ql{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,s=100,r={}){const{size:o=256,position:a=Dm}=r;To=this._renderer.getRenderTarget(),Ao=this._renderer.getActiveCubeFace(),Ro=this._renderer.getActiveMipmapLevel(),Co=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,s,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=nu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=tu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(To,Ao,Ro),this._renderer.xr.enabled=Co,e.scissorTest=!1,$s(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===er||e.mapping===tr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),To=this._renderer.getRenderTarget(),Ao=this._renderer.getActiveCubeFace(),Ro=this._renderer.getActiveMipmapLevel(),Co=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Hn,minFilter:Hn,generateMipmaps:!1,type:ar,format:Qn,colorSpace:nr,depthBuffer:!1},s=eu(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=eu(e,t,i);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Im(r)),this._blurMaterial=Fm(r,e,t),this._ggxMaterial=Um(r,e,t)}return s}_compileMaterial(e){const t=new en(new Kt,e);this._renderer.compile(t,Mr)}_sceneToCubeUV(e,t,i,s,r){const l=new Rn(90,1,t,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,f=d.autoClear,h=d.toneMapping;d.getClearColor(Jl),d.toneMapping=Xi,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new en(new ws,new oi({name:"PMREM.Background",side:Pn,depthWrite:!1,depthTest:!1})));const _=this._backgroundBox,x=_.material;let m=!1;const E=e.background;E?E.isColor&&(x.color.copy(E),e.background=null,m=!0):(x.color.copy(Jl),m=!0);for(let T=0;T<6;T++){const C=T%3;C===0?(l.up.set(0,c[T],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+u[T],r.y,r.z)):C===1?(l.up.set(0,0,c[T]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+u[T],r.z)):(l.up.set(0,c[T],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+u[T]));const P=this._cubeSize;$s(s,C*P,T>2?P:0,P,P),d.setRenderTarget(s),m&&d.render(_,l),d.render(e,l)}d.toneMapping=h,d.autoClear=f,e.background=E}_textureToCubeUV(e,t){const i=this._renderer,s=e.mapping===er||e.mapping===tr;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=nu()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=tu());const r=s?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=r;const a=r.uniforms;a.envMap.value=e;const l=this._cubeSize;$s(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(o,Mr)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=i}_applyGGXFilter(e,t,i){const s=this._renderer,r=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[i];a.material=o;const l=o.uniforms,c=i/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),d=Math.sqrt(c*c-u*u),f=.05+c*.95,h=d*f,{_lodMax:p}=this,_=this._sizeLods[i],x=3*_*(i>p-$i?i-p+$i:0),m=4*(this._cubeSize-_);l.envMap.value=e.texture,l.roughness.value=h,l.mipInt.value=p-t,$s(r,x,m,3*_,2*_),s.setRenderTarget(r),s.render(a,Mr),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=p-i,$s(e,x,m,3*_,2*_),s.setRenderTarget(e),s.render(a,Mr)}_blur(e,t,i,s,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,s,"latitudinal",r),this._halfBlur(o,e,i,i,s,"longitudinal",r)}_halfBlur(e,t,i,s,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&Ot("blur direction must be either latitudinal or longitudinal!");const u=3,d=this._lodMeshes[s];d.material=c;const f=c.uniforms,h=this._sizeLods[i]-1,p=isFinite(r)?Math.PI/(2*h):2*Math.PI/(2*ms-1),_=r/p,x=isFinite(r)?1+Math.floor(u*_):ms;x>ms&&Ze(`sigmaRadians, ${r}, is too large and will clip, as it requested ${x} samples when the maximum is set to ${ms}`);const m=[];let E=0;for(let R=0;R<ms;++R){const D=R/_,v=Math.exp(-D*D/2);m.push(v),R===0?E+=v:R<x&&(E+=2*v)}for(let R=0;R<m.length;R++)m[R]=m[R]/E;f.envMap.value=e.texture,f.samples.value=x,f.weights.value=m,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:T}=this;f.dTheta.value=p,f.mipInt.value=T-i;const C=this._sizeLods[s],P=3*C*(s>T-$i?s-T+$i:0),g=4*(this._cubeSize-C);$s(t,P,g,3*C,2*C),l.setRenderTarget(t),l.render(d,Mr)}}function Im(n){const e=[],t=[],i=[];let s=n;const r=n-$i+1+Zl.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);e.push(a);let l=1/a;o>n-$i?l=Zl[o-n+$i-1]:o===0&&(l=0),t.push(l);const c=1/(a-2),u=-c,d=1+c,f=[u,u,d,u,d,d,u,u,d,d,u,d],h=6,p=6,_=3,x=2,m=1,E=new Float32Array(_*p*h),T=new Float32Array(x*p*h),C=new Float32Array(m*p*h);for(let g=0;g<h;g++){const R=g%3*2/3-1,D=g>2?0:-1,v=[R,D,0,R+2/3,D,0,R+2/3,D+1,0,R,D,0,R+2/3,D+1,0,R,D+1,0];E.set(v,_*p*g),T.set(f,x*p*g);const b=[g,g,g,g,g,g];C.set(b,m*p*g)}const P=new Kt;P.setAttribute("position",new Wn(E,_)),P.setAttribute("uv",new Wn(T,x)),P.setAttribute("faceIndex",new Wn(C,m)),i.push(new en(P,null)),s>$i&&s--}return{lodMeshes:i,sizeLods:e,sigmas:t}}function eu(n,e,t){const i=new vs(n,e,t);return i.texture.mapping=Ua,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function $s(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function Um(n,e,t){return new Ui({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Lm,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:za(),fragmentShader:`

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
		`,blending:Li,depthTest:!1,depthWrite:!1})}function Fm(n,e,t){const i=new Float32Array(ms),s=new B(0,1,0);return new Ui({name:"SphericalGaussianBlur",defines:{n:ms,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:za(),fragmentShader:`

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
		`,blending:Li,depthTest:!1,depthWrite:!1})}function tu(){return new Ui({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:za(),fragmentShader:`

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
		`,blending:Li,depthTest:!1,depthWrite:!1})}function nu(){return new Ui({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:za(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Li,depthTest:!1,depthWrite:!1})}function za(){return`

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
	`}function Nm(n){let e=new WeakMap,t=null;function i(a){if(a&&a.isTexture){const l=a.mapping,c=l===Xo||l===jo,u=l===er||l===tr;if(c||u){let d=e.get(a);const f=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return t===null&&(t=new Ql(n)),d=c?t.fromEquirectangular(a,d):t.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),d.texture;if(d!==void 0)return d.texture;{const h=a.image;return c&&h&&h.height>0||u&&h&&s(h)?(t===null&&(t=new Ql(n)),d=c?t.fromEquirectangular(a):t.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),a.addEventListener("dispose",r),d.texture):null}}}return a}function s(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:o}}function Om(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const s=n.getExtension(i);return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const s=t(i);return s===null&&Lr("WebGLRenderer: "+i+" extension not supported."),s}}}function zm(n,e,t,i){const s={},r=new WeakMap;function o(d){const f=d.target;f.index!==null&&e.remove(f.index);for(const p in f.attributes)e.remove(f.attributes[p]);f.removeEventListener("dispose",o),delete s[f.id];const h=r.get(f);h&&(e.remove(h),r.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(d,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,t.memory.geometries++),f}function l(d){const f=d.attributes;for(const h in f)e.update(f[h],n.ARRAY_BUFFER)}function c(d){const f=[],h=d.index,p=d.attributes.position;let _=0;if(h!==null){const E=h.array;_=h.version;for(let T=0,C=E.length;T<C;T+=3){const P=E[T+0],g=E[T+1],R=E[T+2];f.push(P,g,g,R,R,P)}}else if(p!==void 0){const E=p.array;_=p.version;for(let T=0,C=E.length/3-1;T<C;T+=3){const P=T+0,g=T+1,R=T+2;f.push(P,g,g,R,R,P)}}else return;const x=new(Zu(f)?td:ed)(f,1);x.version=_;const m=r.get(d);m&&e.remove(m),r.set(d,x)}function u(d){const f=r.get(d);if(f){const h=d.index;h!==null&&f.version<h.version&&c(d)}else c(d);return r.get(d)}return{get:a,update:l,getWireframeAttribute:u}}function km(n,e,t){let i;function s(f){i=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function l(f,h){n.drawElements(i,h,r,f*o),t.update(h,i,1)}function c(f,h,p){p!==0&&(n.drawElementsInstanced(i,h,r,f*o,p),t.update(h,i,p))}function u(f,h,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,h,0,r,f,0,p);let x=0;for(let m=0;m<p;m++)x+=h[m];t.update(x,i,1)}function d(f,h,p,_){if(p===0)return;const x=e.get("WEBGL_multi_draw");if(x===null)for(let m=0;m<f.length;m++)c(f[m]/o,h[m],_[m]);else{x.multiDrawElementsInstancedWEBGL(i,h,0,r,f,0,_,0,p);let m=0;for(let E=0;E<p;E++)m+=h[E]*_[E];t.update(m,i,1)}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function Bm(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=a*(r/3);break;case n.LINES:t.lines+=a*(r/2);break;case n.LINE_STRIP:t.lines+=a*(r-1);break;case n.LINE_LOOP:t.lines+=a*r;break;case n.POINTS:t.points+=a*r;break;default:Ot("WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function Vm(n,e,t){const i=new WeakMap,s=new St;function r(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=u!==void 0?u.length:0;let f=i.get(a);if(f===void 0||f.count!==d){let b=function(){D.dispose(),i.delete(a),a.removeEventListener("dispose",b)};var h=b;f!==void 0&&f.texture.dispose();const p=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,x=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],E=a.morphAttributes.normal||[],T=a.morphAttributes.color||[];let C=0;p===!0&&(C=1),_===!0&&(C=2),x===!0&&(C=3);let P=a.attributes.position.count*C,g=1;P>e.maxTextureSize&&(g=Math.ceil(P/e.maxTextureSize),P=e.maxTextureSize);const R=new Float32Array(P*g*4*d),D=new Ju(R,P,g,d);D.type=ci,D.needsUpdate=!0;const v=C*4;for(let A=0;A<d;A++){const N=m[A],U=E[A],H=T[A],q=P*g*4*A;for(let Z=0;Z<N.count;Z++){const ie=Z*v;p===!0&&(s.fromBufferAttribute(N,Z),R[q+ie+0]=s.x,R[q+ie+1]=s.y,R[q+ie+2]=s.z,R[q+ie+3]=0),_===!0&&(s.fromBufferAttribute(U,Z),R[q+ie+4]=s.x,R[q+ie+5]=s.y,R[q+ie+6]=s.z,R[q+ie+7]=0),x===!0&&(s.fromBufferAttribute(H,Z),R[q+ie+8]=s.x,R[q+ie+9]=s.y,R[q+ie+10]=s.z,R[q+ie+11]=H.itemSize===4?s.w:1)}}f={count:d,texture:D,size:new rt(P,g)},i.set(a,f),a.addEventListener("dispose",b)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,t);else{let p=0;for(let x=0;x<c.length;x++)p+=c[x];const _=a.morphTargetsRelative?1:1-p;l.getUniforms().setValue(n,"morphTargetBaseInfluence",_),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",f.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:r}}function Gm(n,e,t,i){let s=new WeakMap;function r(l){const c=i.render.frame,u=l.geometry,d=e.get(l,u);if(s.get(d)!==c&&(e.update(d),s.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;s.get(f)!==c&&(f.update(),s.set(f,c))}return d}function o(){s=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:o}}const fd=new pn,iu=new cd(1,1),hd=new Ju,pd=new oh,md=new sd,su=[],ru=[],au=new Float32Array(16),ou=new Float32Array(9),cu=new Float32Array(4);function lr(n,e,t){const i=n[0];if(i<=0||i>0)return n;const s=e*t;let r=su[s];if(r===void 0&&(r=new Float32Array(s),su[s]=r),e!==0){i.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,n[o].toArray(r,a)}return r}function jt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Yt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function ka(n,e){let t=ru[e];t===void 0&&(t=new Int32Array(e),ru[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function Hm(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function Wm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(jt(t,e))return;n.uniform2fv(this.addr,e),Yt(t,e)}}function $m(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(jt(t,e))return;n.uniform3fv(this.addr,e),Yt(t,e)}}function qm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(jt(t,e))return;n.uniform4fv(this.addr,e),Yt(t,e)}}function Xm(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(jt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Yt(t,e)}else{if(jt(t,i))return;cu.set(i),n.uniformMatrix2fv(this.addr,!1,cu),Yt(t,i)}}function jm(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(jt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Yt(t,e)}else{if(jt(t,i))return;ou.set(i),n.uniformMatrix3fv(this.addr,!1,ou),Yt(t,i)}}function Ym(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(jt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Yt(t,e)}else{if(jt(t,i))return;au.set(i),n.uniformMatrix4fv(this.addr,!1,au),Yt(t,i)}}function Km(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function Zm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(jt(t,e))return;n.uniform2iv(this.addr,e),Yt(t,e)}}function Jm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(jt(t,e))return;n.uniform3iv(this.addr,e),Yt(t,e)}}function Qm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(jt(t,e))return;n.uniform4iv(this.addr,e),Yt(t,e)}}function ex(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function tx(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(jt(t,e))return;n.uniform2uiv(this.addr,e),Yt(t,e)}}function nx(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(jt(t,e))return;n.uniform3uiv(this.addr,e),Yt(t,e)}}function ix(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(jt(t,e))return;n.uniform4uiv(this.addr,e),Yt(t,e)}}function sx(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(iu.compareFunction=Ku,r=iu):r=fd,t.setTexture2D(e||r,s)}function rx(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||pd,s)}function ax(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||md,s)}function ox(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||hd,s)}function cx(n){switch(n){case 5126:return Hm;case 35664:return Wm;case 35665:return $m;case 35666:return qm;case 35674:return Xm;case 35675:return jm;case 35676:return Ym;case 5124:case 35670:return Km;case 35667:case 35671:return Zm;case 35668:case 35672:return Jm;case 35669:case 35673:return Qm;case 5125:return ex;case 36294:return tx;case 36295:return nx;case 36296:return ix;case 35678:case 36198:case 36298:case 36306:case 35682:return sx;case 35679:case 36299:case 36307:return rx;case 35680:case 36300:case 36308:case 36293:return ax;case 36289:case 36303:case 36311:case 36292:return ox}}function lx(n,e){n.uniform1fv(this.addr,e)}function ux(n,e){const t=lr(e,this.size,2);n.uniform2fv(this.addr,t)}function dx(n,e){const t=lr(e,this.size,3);n.uniform3fv(this.addr,t)}function fx(n,e){const t=lr(e,this.size,4);n.uniform4fv(this.addr,t)}function hx(n,e){const t=lr(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function px(n,e){const t=lr(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function mx(n,e){const t=lr(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function xx(n,e){n.uniform1iv(this.addr,e)}function gx(n,e){n.uniform2iv(this.addr,e)}function _x(n,e){n.uniform3iv(this.addr,e)}function vx(n,e){n.uniform4iv(this.addr,e)}function bx(n,e){n.uniform1uiv(this.addr,e)}function yx(n,e){n.uniform2uiv(this.addr,e)}function Mx(n,e){n.uniform3uiv(this.addr,e)}function Sx(n,e){n.uniform4uiv(this.addr,e)}function Ex(n,e,t){const i=this.cache,s=e.length,r=ka(t,s);jt(i,r)||(n.uniform1iv(this.addr,r),Yt(i,r));for(let o=0;o!==s;++o)t.setTexture2D(e[o]||fd,r[o])}function wx(n,e,t){const i=this.cache,s=e.length,r=ka(t,s);jt(i,r)||(n.uniform1iv(this.addr,r),Yt(i,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||pd,r[o])}function Tx(n,e,t){const i=this.cache,s=e.length,r=ka(t,s);jt(i,r)||(n.uniform1iv(this.addr,r),Yt(i,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||md,r[o])}function Ax(n,e,t){const i=this.cache,s=e.length,r=ka(t,s);jt(i,r)||(n.uniform1iv(this.addr,r),Yt(i,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||hd,r[o])}function Rx(n){switch(n){case 5126:return lx;case 35664:return ux;case 35665:return dx;case 35666:return fx;case 35674:return hx;case 35675:return px;case 35676:return mx;case 5124:case 35670:return xx;case 35667:case 35671:return gx;case 35668:case 35672:return _x;case 35669:case 35673:return vx;case 5125:return bx;case 36294:return yx;case 36295:return Mx;case 36296:return Sx;case 35678:case 36198:case 36298:case 36306:case 35682:return Ex;case 35679:case 36299:case 36307:return wx;case 35680:case 36300:case 36308:case 36293:return Tx;case 36289:case 36303:case 36311:case 36292:return Ax}}class Cx{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=cx(t.type)}}class Px{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Rx(t.type)}}class Lx{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(e,t[a.id],i)}}}const Po=/(\w+)(\])?(\[|\.)?/g;function lu(n,e){n.seq.push(e),n.map[e.id]=e}function Dx(n,e,t){const i=n.name,s=i.length;for(Po.lastIndex=0;;){const r=Po.exec(i),o=Po.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){lu(t,c===void 0?new Cx(a,n,e):new Px(a,n,e));break}else{let d=t.map[a];d===void 0&&(d=new Lx(a),lu(t,d)),t=d}}}class _a{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const r=e.getActiveUniform(t,s),o=e.getUniformLocation(t,r.name);Dx(r,o,this)}}setValue(e,t,i,s){const r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){const s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,o=t.length;r!==o;++r){const a=t[r],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,s)}}static seqWithValue(e,t){const i=[];for(let s=0,r=e.length;s!==r;++s){const o=e[s];o.id in t&&i.push(o)}return i}}function uu(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const Ix=37297;let Ux=0;function Fx(n,e){const t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}const du=new et;function Nx(n){mt._getMatrix(du,mt.workingColorSpace,n);const e=`mat3( ${du.elements.map(t=>t.toFixed(4))} )`;switch(mt.getTransfer(n)){case Ea:return[e,"LinearTransferOETF"];case Mt:return[e,"sRGBTransferOETF"];default:return Ze("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function fu(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=(n.getShaderInfoLog(e)||"").trim();if(i&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const a=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+Fx(n.getShaderSource(e),a)}else return r}function Ox(n,e){const t=Nx(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function zx(n,e){let t;switch(e){case Nf:t="Linear";break;case Of:t="Reinhard";break;case zf:t="Cineon";break;case Vu:t="ACESFilmic";break;case Bf:t="AgX";break;case Vf:t="Neutral";break;case kf:t="Custom";break;default:Ze("WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const da=new B;function kx(){mt.getLuminanceCoefficients(da);const n=da.x.toFixed(4),e=da.y.toFixed(4),t=da.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Bx(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Sr).join(`
`)}function Vx(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function Gx(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(e,s),o=r.name;let a=1;r.type===n.FLOAT_MAT2&&(a=2),r.type===n.FLOAT_MAT3&&(a=3),r.type===n.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:n.getAttribLocation(e,o),locationSize:a}}return t}function Sr(n){return n!==""}function hu(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function pu(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Hx=/^[ \t]*#include +<([\w\d./]+)>/gm;function Tc(n){return n.replace(Hx,$x)}const Wx=new Map;function $x(n,e){let t=tt[e];if(t===void 0){const i=Wx.get(e);if(i!==void 0)t=tt[i],Ze('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Tc(t)}const qx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function mu(n){return n.replace(qx,Xx)}function Xx(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function xu(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}function jx(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===zu?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===ku?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===yi&&(e="SHADOWMAP_TYPE_VSM"),e}function Yx(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case er:case tr:e="ENVMAP_TYPE_CUBE";break;case Ua:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Kx(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case tr:e="ENVMAP_MODE_REFRACTION";break}return e}function Zx(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Bu:e="ENVMAP_BLENDING_MULTIPLY";break;case Uf:e="ENVMAP_BLENDING_MIX";break;case Ff:e="ENVMAP_BLENDING_ADD";break}return e}function Jx(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function Qx(n,e,t,i){const s=n.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=jx(t),c=Yx(t),u=Kx(t),d=Zx(t),f=Jx(t),h=Bx(t),p=Vx(r),_=s.createProgram();let x,m,E=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(x=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Sr).join(`
`),x.length>0&&(x+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Sr).join(`
`),m.length>0&&(m+=`
`)):(x=[xu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Sr).join(`
`),m=[xu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Xi?"#define TONE_MAPPING":"",t.toneMapping!==Xi?tt.tonemapping_pars_fragment:"",t.toneMapping!==Xi?zx("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",tt.colorspace_pars_fragment,Ox("linearToOutputTexel",t.outputColorSpace),kx(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Sr).join(`
`)),o=Tc(o),o=hu(o,t),o=pu(o,t),a=Tc(a),a=hu(a,t),a=pu(a,t),o=mu(o),a=mu(a),t.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,x=[h,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+x,m=["#define varying in",t.glslVersion===_l?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===_l?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const T=E+x+o,C=E+m+a,P=uu(s,s.VERTEX_SHADER,T),g=uu(s,s.FRAGMENT_SHADER,C);s.attachShader(_,P),s.attachShader(_,g),t.index0AttributeName!==void 0?s.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function R(A){if(n.debug.checkShaderErrors){const N=s.getProgramInfoLog(_)||"",U=s.getShaderInfoLog(P)||"",H=s.getShaderInfoLog(g)||"",q=N.trim(),Z=U.trim(),ie=H.trim();let Q=!0,te=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(Q=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,_,P,g);else{const ne=fu(s,P,"vertex"),fe=fu(s,g,"fragment");Ot("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+A.name+`
Material Type: `+A.type+`

Program Info Log: `+q+`
`+ne+`
`+fe)}else q!==""?Ze("WebGLProgram: Program Info Log:",q):(Z===""||ie==="")&&(te=!1);te&&(A.diagnostics={runnable:Q,programLog:q,vertexShader:{log:Z,prefix:x},fragmentShader:{log:ie,prefix:m}})}s.deleteShader(P),s.deleteShader(g),D=new _a(s,_),v=Gx(s,_)}let D;this.getUniforms=function(){return D===void 0&&R(this),D};let v;this.getAttributes=function(){return v===void 0&&R(this),v};let b=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return b===!1&&(b=s.getProgramParameter(_,Ix)),b},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Ux++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=P,this.fragmentShader=g,this}let eg=0;class tg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new ng(e),t.set(e,i)),i}}class ng{constructor(e){this.id=eg++,this.code=e,this.usedTimes=0}}function ig(n,e,t,i,s,r,o){const a=new Hc,l=new tg,c=new Set,u=[],d=s.logarithmicDepthBuffer,f=s.vertexTextures;let h=s.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(v){return c.add(v),v===0?"uv":`uv${v}`}function x(v,b,A,N,U){const H=N.fog,q=U.geometry,Z=v.isMeshStandardMaterial?N.environment:null,ie=(v.isMeshStandardMaterial?t:e).get(v.envMap||Z),Q=ie&&ie.mapping===Ua?ie.image.height:null,te=p[v.type];v.precision!==null&&(h=s.getMaxPrecision(v.precision),h!==v.precision&&Ze("WebGLProgram.getParameters:",v.precision,"not supported, using",h,"instead."));const ne=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,fe=ne!==void 0?ne.length:0;let Pe=0;q.morphAttributes.position!==void 0&&(Pe=1),q.morphAttributes.normal!==void 0&&(Pe=2),q.morphAttributes.color!==void 0&&(Pe=3);let ze,Je,ft,re;if(te){const xt=ai[te];ze=xt.vertexShader,Je=xt.fragmentShader}else ze=v.vertexShader,Je=v.fragmentShader,l.update(v),ft=l.getVertexShaderID(v),re=l.getFragmentShaderID(v);const oe=n.getRenderTarget(),Ee=n.state.buffers.depth.getReversed(),We=U.isInstancedMesh===!0,Ie=U.isBatchedMesh===!0,it=!!v.map,Bt=!!v.matcap,Qe=!!ie,Et=!!v.aoMap,O=!!v.lightMap,st=!!v.bumpMap,nt=!!v.normalMap,gt=!!v.displacementMap,Re=!!v.emissiveMap,Ct=!!v.metalnessMap,Fe=!!v.roughnessMap,Ve=v.anisotropy>0,I=v.clearcoat>0,S=v.dispersion>0,$=v.iridescence>0,se=v.sheen>0,ce=v.transmission>0,ee=Ve&&!!v.anisotropyMap,De=I&&!!v.clearcoatMap,_e=I&&!!v.clearcoatNormalMap,Ne=I&&!!v.clearcoatRoughnessMap,Le=$&&!!v.iridescenceMap,le=$&&!!v.iridescenceThicknessMap,pe=se&&!!v.sheenColorMap,$e=se&&!!v.sheenRoughnessMap,ke=!!v.specularMap,Me=!!v.specularColorMap,qe=!!v.specularIntensityMap,z=ce&&!!v.transmissionMap,ge=ce&&!!v.thicknessMap,K=!!v.gradientMap,xe=!!v.alphaMap,ue=v.alphaTest>0,ae=!!v.alphaHash,we=!!v.extensions;let je=Xi;v.toneMapped&&(oe===null||oe.isXRRenderTarget===!0)&&(je=n.toneMapping);const yt={shaderID:te,shaderType:v.type,shaderName:v.name,vertexShader:ze,fragmentShader:Je,defines:v.defines,customVertexShaderID:ft,customFragmentShaderID:re,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:h,batching:Ie,batchingColor:Ie&&U._colorsTexture!==null,instancing:We,instancingColor:We&&U.instanceColor!==null,instancingMorph:We&&U.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:oe===null?n.outputColorSpace:oe.isXRRenderTarget===!0?oe.texture.colorSpace:nr,alphaToCoverage:!!v.alphaToCoverage,map:it,matcap:Bt,envMap:Qe,envMapMode:Qe&&ie.mapping,envMapCubeUVHeight:Q,aoMap:Et,lightMap:O,bumpMap:st,normalMap:nt,displacementMap:f&&gt,emissiveMap:Re,normalMapObjectSpace:nt&&v.normalMapType===$f,normalMapTangentSpace:nt&&v.normalMapType===Yu,metalnessMap:Ct,roughnessMap:Fe,anisotropy:Ve,anisotropyMap:ee,clearcoat:I,clearcoatMap:De,clearcoatNormalMap:_e,clearcoatRoughnessMap:Ne,dispersion:S,iridescence:$,iridescenceMap:Le,iridescenceThicknessMap:le,sheen:se,sheenColorMap:pe,sheenRoughnessMap:$e,specularMap:ke,specularColorMap:Me,specularIntensityMap:qe,transmission:ce,transmissionMap:z,thicknessMap:ge,gradientMap:K,opaque:v.transparent===!1&&v.blending===Ys&&v.alphaToCoverage===!1,alphaMap:xe,alphaTest:ue,alphaHash:ae,combine:v.combine,mapUv:it&&_(v.map.channel),aoMapUv:Et&&_(v.aoMap.channel),lightMapUv:O&&_(v.lightMap.channel),bumpMapUv:st&&_(v.bumpMap.channel),normalMapUv:nt&&_(v.normalMap.channel),displacementMapUv:gt&&_(v.displacementMap.channel),emissiveMapUv:Re&&_(v.emissiveMap.channel),metalnessMapUv:Ct&&_(v.metalnessMap.channel),roughnessMapUv:Fe&&_(v.roughnessMap.channel),anisotropyMapUv:ee&&_(v.anisotropyMap.channel),clearcoatMapUv:De&&_(v.clearcoatMap.channel),clearcoatNormalMapUv:_e&&_(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ne&&_(v.clearcoatRoughnessMap.channel),iridescenceMapUv:Le&&_(v.iridescenceMap.channel),iridescenceThicknessMapUv:le&&_(v.iridescenceThicknessMap.channel),sheenColorMapUv:pe&&_(v.sheenColorMap.channel),sheenRoughnessMapUv:$e&&_(v.sheenRoughnessMap.channel),specularMapUv:ke&&_(v.specularMap.channel),specularColorMapUv:Me&&_(v.specularColorMap.channel),specularIntensityMapUv:qe&&_(v.specularIntensityMap.channel),transmissionMapUv:z&&_(v.transmissionMap.channel),thicknessMapUv:ge&&_(v.thicknessMap.channel),alphaMapUv:xe&&_(v.alphaMap.channel),vertexTangents:!!q.attributes.tangent&&(nt||Ve),vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,pointsUvs:U.isPoints===!0&&!!q.attributes.uv&&(it||xe),fog:!!H,useFog:v.fog===!0,fogExp2:!!H&&H.isFogExp2,flatShading:v.flatShading===!0&&v.wireframe===!1,sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:Ee,skinning:U.isSkinnedMesh===!0,morphTargets:q.morphAttributes.position!==void 0,morphNormals:q.morphAttributes.normal!==void 0,morphColors:q.morphAttributes.color!==void 0,morphTargetsCount:fe,morphTextureStride:Pe,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:v.dithering,shadowMapEnabled:n.shadowMap.enabled&&A.length>0,shadowMapType:n.shadowMap.type,toneMapping:je,decodeVideoTexture:it&&v.map.isVideoTexture===!0&&mt.getTransfer(v.map.colorSpace)===Mt,decodeVideoTextureEmissive:Re&&v.emissiveMap.isVideoTexture===!0&&mt.getTransfer(v.emissiveMap.colorSpace)===Mt,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===Gn,flipSided:v.side===Pn,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:we&&v.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(we&&v.extensions.multiDraw===!0||Ie)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return yt.vertexUv1s=c.has(1),yt.vertexUv2s=c.has(2),yt.vertexUv3s=c.has(3),c.clear(),yt}function m(v){const b=[];if(v.shaderID?b.push(v.shaderID):(b.push(v.customVertexShaderID),b.push(v.customFragmentShaderID)),v.defines!==void 0)for(const A in v.defines)b.push(A),b.push(v.defines[A]);return v.isRawShaderMaterial===!1&&(E(b,v),T(b,v),b.push(n.outputColorSpace)),b.push(v.customProgramCacheKey),b.join()}function E(v,b){v.push(b.precision),v.push(b.outputColorSpace),v.push(b.envMapMode),v.push(b.envMapCubeUVHeight),v.push(b.mapUv),v.push(b.alphaMapUv),v.push(b.lightMapUv),v.push(b.aoMapUv),v.push(b.bumpMapUv),v.push(b.normalMapUv),v.push(b.displacementMapUv),v.push(b.emissiveMapUv),v.push(b.metalnessMapUv),v.push(b.roughnessMapUv),v.push(b.anisotropyMapUv),v.push(b.clearcoatMapUv),v.push(b.clearcoatNormalMapUv),v.push(b.clearcoatRoughnessMapUv),v.push(b.iridescenceMapUv),v.push(b.iridescenceThicknessMapUv),v.push(b.sheenColorMapUv),v.push(b.sheenRoughnessMapUv),v.push(b.specularMapUv),v.push(b.specularColorMapUv),v.push(b.specularIntensityMapUv),v.push(b.transmissionMapUv),v.push(b.thicknessMapUv),v.push(b.combine),v.push(b.fogExp2),v.push(b.sizeAttenuation),v.push(b.morphTargetsCount),v.push(b.morphAttributeCount),v.push(b.numDirLights),v.push(b.numPointLights),v.push(b.numSpotLights),v.push(b.numSpotLightMaps),v.push(b.numHemiLights),v.push(b.numRectAreaLights),v.push(b.numDirLightShadows),v.push(b.numPointLightShadows),v.push(b.numSpotLightShadows),v.push(b.numSpotLightShadowsWithMaps),v.push(b.numLightProbes),v.push(b.shadowMapType),v.push(b.toneMapping),v.push(b.numClippingPlanes),v.push(b.numClipIntersection),v.push(b.depthPacking)}function T(v,b){a.disableAll(),b.supportsVertexTextures&&a.enable(0),b.instancing&&a.enable(1),b.instancingColor&&a.enable(2),b.instancingMorph&&a.enable(3),b.matcap&&a.enable(4),b.envMap&&a.enable(5),b.normalMapObjectSpace&&a.enable(6),b.normalMapTangentSpace&&a.enable(7),b.clearcoat&&a.enable(8),b.iridescence&&a.enable(9),b.alphaTest&&a.enable(10),b.vertexColors&&a.enable(11),b.vertexAlphas&&a.enable(12),b.vertexUv1s&&a.enable(13),b.vertexUv2s&&a.enable(14),b.vertexUv3s&&a.enable(15),b.vertexTangents&&a.enable(16),b.anisotropy&&a.enable(17),b.alphaHash&&a.enable(18),b.batching&&a.enable(19),b.dispersion&&a.enable(20),b.batchingColor&&a.enable(21),b.gradientMap&&a.enable(22),v.push(a.mask),a.disableAll(),b.fog&&a.enable(0),b.useFog&&a.enable(1),b.flatShading&&a.enable(2),b.logarithmicDepthBuffer&&a.enable(3),b.reversedDepthBuffer&&a.enable(4),b.skinning&&a.enable(5),b.morphTargets&&a.enable(6),b.morphNormals&&a.enable(7),b.morphColors&&a.enable(8),b.premultipliedAlpha&&a.enable(9),b.shadowMapEnabled&&a.enable(10),b.doubleSided&&a.enable(11),b.flipSided&&a.enable(12),b.useDepthPacking&&a.enable(13),b.dithering&&a.enable(14),b.transmission&&a.enable(15),b.sheen&&a.enable(16),b.opaque&&a.enable(17),b.pointsUvs&&a.enable(18),b.decodeVideoTexture&&a.enable(19),b.decodeVideoTextureEmissive&&a.enable(20),b.alphaToCoverage&&a.enable(21),v.push(a.mask)}function C(v){const b=p[v.type];let A;if(b){const N=ai[b];A=bh.clone(N.uniforms)}else A=v.uniforms;return A}function P(v,b){let A;for(let N=0,U=u.length;N<U;N++){const H=u[N];if(H.cacheKey===b){A=H,++A.usedTimes;break}}return A===void 0&&(A=new Qx(n,b,v,r),u.push(A)),A}function g(v){if(--v.usedTimes===0){const b=u.indexOf(v);u[b]=u[u.length-1],u.pop(),v.destroy()}}function R(v){l.remove(v)}function D(){l.dispose()}return{getParameters:x,getProgramCacheKey:m,getUniforms:C,acquireProgram:P,releaseProgram:g,releaseShaderCache:R,programs:u,dispose:D}}function sg(){let n=new WeakMap;function e(o){return n.has(o)}function t(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function s(o,a,l){n.get(o)[a]=l}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:r}}function rg(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function gu(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function _u(){const n=[];let e=0;const t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function o(d,f,h,p,_,x){let m=n[e];return m===void 0?(m={id:d.id,object:d,geometry:f,material:h,groupOrder:p,renderOrder:d.renderOrder,z:_,group:x},n[e]=m):(m.id=d.id,m.object=d,m.geometry=f,m.material=h,m.groupOrder=p,m.renderOrder=d.renderOrder,m.z=_,m.group=x),e++,m}function a(d,f,h,p,_,x){const m=o(d,f,h,p,_,x);h.transmission>0?i.push(m):h.transparent===!0?s.push(m):t.push(m)}function l(d,f,h,p,_,x){const m=o(d,f,h,p,_,x);h.transmission>0?i.unshift(m):h.transparent===!0?s.unshift(m):t.unshift(m)}function c(d,f){t.length>1&&t.sort(d||rg),i.length>1&&i.sort(f||gu),s.length>1&&s.sort(f||gu)}function u(){for(let d=e,f=n.length;d<f;d++){const h=n[d];if(h.id===null)break;h.id=null,h.object=null,h.geometry=null,h.material=null,h.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:a,unshift:l,finish:u,sort:c}}function ag(){let n=new WeakMap;function e(i,s){const r=n.get(i);let o;return r===void 0?(o=new _u,n.set(i,[o])):s>=r.length?(o=new _u,r.push(o)):o=r[s],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function og(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new B,color:new ot};break;case"SpotLight":t={position:new B,direction:new B,color:new ot,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new B,color:new ot,distance:0,decay:0};break;case"HemisphereLight":t={direction:new B,skyColor:new ot,groundColor:new ot};break;case"RectAreaLight":t={color:new ot,position:new B,halfWidth:new B,halfHeight:new B};break}return n[e.id]=t,t}}}function cg(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new rt};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new rt};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new rt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let lg=0;function ug(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function dg(n){const e=new og,t=cg(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new B);const s=new B,r=new vt,o=new vt;function a(c){let u=0,d=0,f=0;for(let v=0;v<9;v++)i.probe[v].set(0,0,0);let h=0,p=0,_=0,x=0,m=0,E=0,T=0,C=0,P=0,g=0,R=0;c.sort(ug);for(let v=0,b=c.length;v<b;v++){const A=c[v],N=A.color,U=A.intensity,H=A.distance,q=A.shadow&&A.shadow.map?A.shadow.map.texture:null;if(A.isAmbientLight)u+=N.r*U,d+=N.g*U,f+=N.b*U;else if(A.isLightProbe){for(let Z=0;Z<9;Z++)i.probe[Z].addScaledVector(A.sh.coefficients[Z],U);R++}else if(A.isDirectionalLight){const Z=e.get(A);if(Z.color.copy(A.color).multiplyScalar(A.intensity),A.castShadow){const ie=A.shadow,Q=t.get(A);Q.shadowIntensity=ie.intensity,Q.shadowBias=ie.bias,Q.shadowNormalBias=ie.normalBias,Q.shadowRadius=ie.radius,Q.shadowMapSize=ie.mapSize,i.directionalShadow[h]=Q,i.directionalShadowMap[h]=q,i.directionalShadowMatrix[h]=A.shadow.matrix,E++}i.directional[h]=Z,h++}else if(A.isSpotLight){const Z=e.get(A);Z.position.setFromMatrixPosition(A.matrixWorld),Z.color.copy(N).multiplyScalar(U),Z.distance=H,Z.coneCos=Math.cos(A.angle),Z.penumbraCos=Math.cos(A.angle*(1-A.penumbra)),Z.decay=A.decay,i.spot[_]=Z;const ie=A.shadow;if(A.map&&(i.spotLightMap[P]=A.map,P++,ie.updateMatrices(A),A.castShadow&&g++),i.spotLightMatrix[_]=ie.matrix,A.castShadow){const Q=t.get(A);Q.shadowIntensity=ie.intensity,Q.shadowBias=ie.bias,Q.shadowNormalBias=ie.normalBias,Q.shadowRadius=ie.radius,Q.shadowMapSize=ie.mapSize,i.spotShadow[_]=Q,i.spotShadowMap[_]=q,C++}_++}else if(A.isRectAreaLight){const Z=e.get(A);Z.color.copy(N).multiplyScalar(U),Z.halfWidth.set(A.width*.5,0,0),Z.halfHeight.set(0,A.height*.5,0),i.rectArea[x]=Z,x++}else if(A.isPointLight){const Z=e.get(A);if(Z.color.copy(A.color).multiplyScalar(A.intensity),Z.distance=A.distance,Z.decay=A.decay,A.castShadow){const ie=A.shadow,Q=t.get(A);Q.shadowIntensity=ie.intensity,Q.shadowBias=ie.bias,Q.shadowNormalBias=ie.normalBias,Q.shadowRadius=ie.radius,Q.shadowMapSize=ie.mapSize,Q.shadowCameraNear=ie.camera.near,Q.shadowCameraFar=ie.camera.far,i.pointShadow[p]=Q,i.pointShadowMap[p]=q,i.pointShadowMatrix[p]=A.shadow.matrix,T++}i.point[p]=Z,p++}else if(A.isHemisphereLight){const Z=e.get(A);Z.skyColor.copy(A.color).multiplyScalar(U),Z.groundColor.copy(A.groundColor).multiplyScalar(U),i.hemi[m]=Z,m++}}x>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ve.LTC_FLOAT_1,i.rectAreaLTC2=ve.LTC_FLOAT_2):(i.rectAreaLTC1=ve.LTC_HALF_1,i.rectAreaLTC2=ve.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=d,i.ambient[2]=f;const D=i.hash;(D.directionalLength!==h||D.pointLength!==p||D.spotLength!==_||D.rectAreaLength!==x||D.hemiLength!==m||D.numDirectionalShadows!==E||D.numPointShadows!==T||D.numSpotShadows!==C||D.numSpotMaps!==P||D.numLightProbes!==R)&&(i.directional.length=h,i.spot.length=_,i.rectArea.length=x,i.point.length=p,i.hemi.length=m,i.directionalShadow.length=E,i.directionalShadowMap.length=E,i.pointShadow.length=T,i.pointShadowMap.length=T,i.spotShadow.length=C,i.spotShadowMap.length=C,i.directionalShadowMatrix.length=E,i.pointShadowMatrix.length=T,i.spotLightMatrix.length=C+P-g,i.spotLightMap.length=P,i.numSpotLightShadowsWithMaps=g,i.numLightProbes=R,D.directionalLength=h,D.pointLength=p,D.spotLength=_,D.rectAreaLength=x,D.hemiLength=m,D.numDirectionalShadows=E,D.numPointShadows=T,D.numSpotShadows=C,D.numSpotMaps=P,D.numLightProbes=R,i.version=lg++)}function l(c,u){let d=0,f=0,h=0,p=0,_=0;const x=u.matrixWorldInverse;for(let m=0,E=c.length;m<E;m++){const T=c[m];if(T.isDirectionalLight){const C=i.directional[d];C.direction.setFromMatrixPosition(T.matrixWorld),s.setFromMatrixPosition(T.target.matrixWorld),C.direction.sub(s),C.direction.transformDirection(x),d++}else if(T.isSpotLight){const C=i.spot[h];C.position.setFromMatrixPosition(T.matrixWorld),C.position.applyMatrix4(x),C.direction.setFromMatrixPosition(T.matrixWorld),s.setFromMatrixPosition(T.target.matrixWorld),C.direction.sub(s),C.direction.transformDirection(x),h++}else if(T.isRectAreaLight){const C=i.rectArea[p];C.position.setFromMatrixPosition(T.matrixWorld),C.position.applyMatrix4(x),o.identity(),r.copy(T.matrixWorld),r.premultiply(x),o.extractRotation(r),C.halfWidth.set(T.width*.5,0,0),C.halfHeight.set(0,T.height*.5,0),C.halfWidth.applyMatrix4(o),C.halfHeight.applyMatrix4(o),p++}else if(T.isPointLight){const C=i.point[f];C.position.setFromMatrixPosition(T.matrixWorld),C.position.applyMatrix4(x),f++}else if(T.isHemisphereLight){const C=i.hemi[_];C.direction.setFromMatrixPosition(T.matrixWorld),C.direction.transformDirection(x),_++}}}return{setup:a,setupView:l,state:i}}function vu(n){const e=new dg(n),t=[],i=[];function s(u){c.camera=u,t.length=0,i.length=0}function r(u){t.push(u)}function o(u){i.push(u)}function a(){e.setup(t)}function l(u){e.setupView(t,u)}const c={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function fg(n){let e=new WeakMap;function t(s,r=0){const o=e.get(s);let a;return o===void 0?(a=new vu(n),e.set(s,[a])):r>=o.length?(a=new vu(n),o.push(a)):a=o[r],a}function i(){e=new WeakMap}return{get:t,dispose:i}}const hg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,pg=`uniform sampler2D shadow_pass;
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
}`;function mg(n,e,t){let i=new $c;const s=new rt,r=new rt,o=new St,a=new Uh({depthPacking:Wf}),l=new Fh,c={},u=t.maxTextureSize,d={[ts]:Pn,[Pn]:ts,[Gn]:Gn},f=new Ui({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new rt},radius:{value:4}},vertexShader:hg,fragmentShader:pg}),h=f.clone();h.defines.HORIZONTAL_PASS=1;const p=new Kt;p.setAttribute("position",new Wn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new en(p,f),x=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=zu;let m=this.type;this.render=function(g,R,D){if(x.enabled===!1||x.autoUpdate===!1&&x.needsUpdate===!1||g.length===0)return;const v=n.getRenderTarget(),b=n.getActiveCubeFace(),A=n.getActiveMipmapLevel(),N=n.state;N.setBlending(Li),N.buffers.depth.getReversed()===!0?N.buffers.color.setClear(0,0,0,0):N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);const U=m!==yi&&this.type===yi,H=m===yi&&this.type!==yi;for(let q=0,Z=g.length;q<Z;q++){const ie=g[q],Q=ie.shadow;if(Q===void 0){Ze("WebGLShadowMap:",ie,"has no shadow.");continue}if(Q.autoUpdate===!1&&Q.needsUpdate===!1)continue;s.copy(Q.mapSize);const te=Q.getFrameExtents();if(s.multiply(te),r.copy(Q.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/te.x),s.x=r.x*te.x,Q.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/te.y),s.y=r.y*te.y,Q.mapSize.y=r.y)),Q.map===null||U===!0||H===!0){const fe=this.type!==yi?{minFilter:Bn,magFilter:Bn}:{};Q.map!==null&&Q.map.dispose(),Q.map=new vs(s.x,s.y,fe),Q.map.texture.name=ie.name+".shadowMap",Q.camera.updateProjectionMatrix()}n.setRenderTarget(Q.map),n.clear();const ne=Q.getViewportCount();for(let fe=0;fe<ne;fe++){const Pe=Q.getViewport(fe);o.set(r.x*Pe.x,r.y*Pe.y,r.x*Pe.z,r.y*Pe.w),N.viewport(o),Q.updateMatrices(ie,fe),i=Q.getFrustum(),C(R,D,Q.camera,ie,this.type)}Q.isPointLightShadow!==!0&&this.type===yi&&E(Q,D),Q.needsUpdate=!1}m=this.type,x.needsUpdate=!1,n.setRenderTarget(v,b,A)};function E(g,R){const D=e.update(_);f.defines.VSM_SAMPLES!==g.blurSamples&&(f.defines.VSM_SAMPLES=g.blurSamples,h.defines.VSM_SAMPLES=g.blurSamples,f.needsUpdate=!0,h.needsUpdate=!0),g.mapPass===null&&(g.mapPass=new vs(s.x,s.y)),f.uniforms.shadow_pass.value=g.map.texture,f.uniforms.resolution.value=g.mapSize,f.uniforms.radius.value=g.radius,n.setRenderTarget(g.mapPass),n.clear(),n.renderBufferDirect(R,null,D,f,_,null),h.uniforms.shadow_pass.value=g.mapPass.texture,h.uniforms.resolution.value=g.mapSize,h.uniforms.radius.value=g.radius,n.setRenderTarget(g.map),n.clear(),n.renderBufferDirect(R,null,D,h,_,null)}function T(g,R,D,v){let b=null;const A=D.isPointLight===!0?g.customDistanceMaterial:g.customDepthMaterial;if(A!==void 0)b=A;else if(b=D.isPointLight===!0?l:a,n.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){const N=b.uuid,U=R.uuid;let H=c[N];H===void 0&&(H={},c[N]=H);let q=H[U];q===void 0&&(q=b.clone(),H[U]=q,R.addEventListener("dispose",P)),b=q}if(b.visible=R.visible,b.wireframe=R.wireframe,v===yi?b.side=R.shadowSide!==null?R.shadowSide:R.side:b.side=R.shadowSide!==null?R.shadowSide:d[R.side],b.alphaMap=R.alphaMap,b.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,b.map=R.map,b.clipShadows=R.clipShadows,b.clippingPlanes=R.clippingPlanes,b.clipIntersection=R.clipIntersection,b.displacementMap=R.displacementMap,b.displacementScale=R.displacementScale,b.displacementBias=R.displacementBias,b.wireframeLinewidth=R.wireframeLinewidth,b.linewidth=R.linewidth,D.isPointLight===!0&&b.isMeshDistanceMaterial===!0){const N=n.properties.get(b);N.light=D}return b}function C(g,R,D,v,b){if(g.visible===!1)return;if(g.layers.test(R.layers)&&(g.isMesh||g.isLine||g.isPoints)&&(g.castShadow||g.receiveShadow&&b===yi)&&(!g.frustumCulled||i.intersectsObject(g))){g.modelViewMatrix.multiplyMatrices(D.matrixWorldInverse,g.matrixWorld);const U=e.update(g),H=g.material;if(Array.isArray(H)){const q=U.groups;for(let Z=0,ie=q.length;Z<ie;Z++){const Q=q[Z],te=H[Q.materialIndex];if(te&&te.visible){const ne=T(g,te,v,b);g.onBeforeShadow(n,g,R,D,U,ne,Q),n.renderBufferDirect(D,null,U,ne,g,Q),g.onAfterShadow(n,g,R,D,U,ne,Q)}}}else if(H.visible){const q=T(g,H,v,b);g.onBeforeShadow(n,g,R,D,U,q,null),n.renderBufferDirect(D,null,U,q,g,null),g.onAfterShadow(n,g,R,D,U,q,null)}}const N=g.children;for(let U=0,H=N.length;U<H;U++)C(N[U],R,D,v,b)}function P(g){g.target.removeEventListener("dispose",P);for(const D in c){const v=c[D],b=g.target.uuid;b in v&&(v[b].dispose(),delete v[b])}}}const xg={[Bo]:Vo,[Go]:$o,[Ho]:qo,[Qs]:Wo,[Vo]:Bo,[$o]:Go,[qo]:Ho,[Wo]:Qs};function gg(n,e){function t(){let z=!1;const ge=new St;let K=null;const xe=new St(0,0,0,0);return{setMask:function(ue){K!==ue&&!z&&(n.colorMask(ue,ue,ue,ue),K=ue)},setLocked:function(ue){z=ue},setClear:function(ue,ae,we,je,yt){yt===!0&&(ue*=je,ae*=je,we*=je),ge.set(ue,ae,we,je),xe.equals(ge)===!1&&(n.clearColor(ue,ae,we,je),xe.copy(ge))},reset:function(){z=!1,K=null,xe.set(-1,0,0,0)}}}function i(){let z=!1,ge=!1,K=null,xe=null,ue=null;return{setReversed:function(ae){if(ge!==ae){const we=e.get("EXT_clip_control");ae?we.clipControlEXT(we.LOWER_LEFT_EXT,we.ZERO_TO_ONE_EXT):we.clipControlEXT(we.LOWER_LEFT_EXT,we.NEGATIVE_ONE_TO_ONE_EXT),ge=ae;const je=ue;ue=null,this.setClear(je)}},getReversed:function(){return ge},setTest:function(ae){ae?oe(n.DEPTH_TEST):Ee(n.DEPTH_TEST)},setMask:function(ae){K!==ae&&!z&&(n.depthMask(ae),K=ae)},setFunc:function(ae){if(ge&&(ae=xg[ae]),xe!==ae){switch(ae){case Bo:n.depthFunc(n.NEVER);break;case Vo:n.depthFunc(n.ALWAYS);break;case Go:n.depthFunc(n.LESS);break;case Qs:n.depthFunc(n.LEQUAL);break;case Ho:n.depthFunc(n.EQUAL);break;case Wo:n.depthFunc(n.GEQUAL);break;case $o:n.depthFunc(n.GREATER);break;case qo:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}xe=ae}},setLocked:function(ae){z=ae},setClear:function(ae){ue!==ae&&(ge&&(ae=1-ae),n.clearDepth(ae),ue=ae)},reset:function(){z=!1,K=null,xe=null,ue=null,ge=!1}}}function s(){let z=!1,ge=null,K=null,xe=null,ue=null,ae=null,we=null,je=null,yt=null;return{setTest:function(xt){z||(xt?oe(n.STENCIL_TEST):Ee(n.STENCIL_TEST))},setMask:function(xt){ge!==xt&&!z&&(n.stencilMask(xt),ge=xt)},setFunc:function(xt,mn,on){(K!==xt||xe!==mn||ue!==on)&&(n.stencilFunc(xt,mn,on),K=xt,xe=mn,ue=on)},setOp:function(xt,mn,on){(ae!==xt||we!==mn||je!==on)&&(n.stencilOp(xt,mn,on),ae=xt,we=mn,je=on)},setLocked:function(xt){z=xt},setClear:function(xt){yt!==xt&&(n.clearStencil(xt),yt=xt)},reset:function(){z=!1,ge=null,K=null,xe=null,ue=null,ae=null,we=null,je=null,yt=null}}}const r=new t,o=new i,a=new s,l=new WeakMap,c=new WeakMap;let u={},d={},f=new WeakMap,h=[],p=null,_=!1,x=null,m=null,E=null,T=null,C=null,P=null,g=null,R=new ot(0,0,0),D=0,v=!1,b=null,A=null,N=null,U=null,H=null;const q=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Z=!1,ie=0;const Q=n.getParameter(n.VERSION);Q.indexOf("WebGL")!==-1?(ie=parseFloat(/^WebGL (\d)/.exec(Q)[1]),Z=ie>=1):Q.indexOf("OpenGL ES")!==-1&&(ie=parseFloat(/^OpenGL ES (\d)/.exec(Q)[1]),Z=ie>=2);let te=null,ne={};const fe=n.getParameter(n.SCISSOR_BOX),Pe=n.getParameter(n.VIEWPORT),ze=new St().fromArray(fe),Je=new St().fromArray(Pe);function ft(z,ge,K,xe){const ue=new Uint8Array(4),ae=n.createTexture();n.bindTexture(z,ae),n.texParameteri(z,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(z,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let we=0;we<K;we++)z===n.TEXTURE_3D||z===n.TEXTURE_2D_ARRAY?n.texImage3D(ge,0,n.RGBA,1,1,xe,0,n.RGBA,n.UNSIGNED_BYTE,ue):n.texImage2D(ge+we,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ue);return ae}const re={};re[n.TEXTURE_2D]=ft(n.TEXTURE_2D,n.TEXTURE_2D,1),re[n.TEXTURE_CUBE_MAP]=ft(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),re[n.TEXTURE_2D_ARRAY]=ft(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),re[n.TEXTURE_3D]=ft(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),oe(n.DEPTH_TEST),o.setFunc(Qs),st(!1),nt(fl),oe(n.CULL_FACE),Et(Li);function oe(z){u[z]!==!0&&(n.enable(z),u[z]=!0)}function Ee(z){u[z]!==!1&&(n.disable(z),u[z]=!1)}function We(z,ge){return d[z]!==ge?(n.bindFramebuffer(z,ge),d[z]=ge,z===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=ge),z===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=ge),!0):!1}function Ie(z,ge){let K=h,xe=!1;if(z){K=f.get(ge),K===void 0&&(K=[],f.set(ge,K));const ue=z.textures;if(K.length!==ue.length||K[0]!==n.COLOR_ATTACHMENT0){for(let ae=0,we=ue.length;ae<we;ae++)K[ae]=n.COLOR_ATTACHMENT0+ae;K.length=ue.length,xe=!0}}else K[0]!==n.BACK&&(K[0]=n.BACK,xe=!0);xe&&n.drawBuffers(K)}function it(z){return p!==z?(n.useProgram(z),p=z,!0):!1}const Bt={[ps]:n.FUNC_ADD,[gf]:n.FUNC_SUBTRACT,[_f]:n.FUNC_REVERSE_SUBTRACT};Bt[vf]=n.MIN,Bt[bf]=n.MAX;const Qe={[yf]:n.ZERO,[Mf]:n.ONE,[Sf]:n.SRC_COLOR,[zo]:n.SRC_ALPHA,[Cf]:n.SRC_ALPHA_SATURATE,[Af]:n.DST_COLOR,[wf]:n.DST_ALPHA,[Ef]:n.ONE_MINUS_SRC_COLOR,[ko]:n.ONE_MINUS_SRC_ALPHA,[Rf]:n.ONE_MINUS_DST_COLOR,[Tf]:n.ONE_MINUS_DST_ALPHA,[Pf]:n.CONSTANT_COLOR,[Lf]:n.ONE_MINUS_CONSTANT_COLOR,[Df]:n.CONSTANT_ALPHA,[If]:n.ONE_MINUS_CONSTANT_ALPHA};function Et(z,ge,K,xe,ue,ae,we,je,yt,xt){if(z===Li){_===!0&&(Ee(n.BLEND),_=!1);return}if(_===!1&&(oe(n.BLEND),_=!0),z!==xf){if(z!==x||xt!==v){if((m!==ps||C!==ps)&&(n.blendEquation(n.FUNC_ADD),m=ps,C=ps),xt)switch(z){case Ys:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case hl:n.blendFunc(n.ONE,n.ONE);break;case pl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case ml:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:Ot("WebGLState: Invalid blending: ",z);break}else switch(z){case Ys:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case hl:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case pl:Ot("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case ml:Ot("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ot("WebGLState: Invalid blending: ",z);break}E=null,T=null,P=null,g=null,R.set(0,0,0),D=0,x=z,v=xt}return}ue=ue||ge,ae=ae||K,we=we||xe,(ge!==m||ue!==C)&&(n.blendEquationSeparate(Bt[ge],Bt[ue]),m=ge,C=ue),(K!==E||xe!==T||ae!==P||we!==g)&&(n.blendFuncSeparate(Qe[K],Qe[xe],Qe[ae],Qe[we]),E=K,T=xe,P=ae,g=we),(je.equals(R)===!1||yt!==D)&&(n.blendColor(je.r,je.g,je.b,yt),R.copy(je),D=yt),x=z,v=!1}function O(z,ge){z.side===Gn?Ee(n.CULL_FACE):oe(n.CULL_FACE);let K=z.side===Pn;ge&&(K=!K),st(K),z.blending===Ys&&z.transparent===!1?Et(Li):Et(z.blending,z.blendEquation,z.blendSrc,z.blendDst,z.blendEquationAlpha,z.blendSrcAlpha,z.blendDstAlpha,z.blendColor,z.blendAlpha,z.premultipliedAlpha),o.setFunc(z.depthFunc),o.setTest(z.depthTest),o.setMask(z.depthWrite),r.setMask(z.colorWrite);const xe=z.stencilWrite;a.setTest(xe),xe&&(a.setMask(z.stencilWriteMask),a.setFunc(z.stencilFunc,z.stencilRef,z.stencilFuncMask),a.setOp(z.stencilFail,z.stencilZFail,z.stencilZPass)),Re(z.polygonOffset,z.polygonOffsetFactor,z.polygonOffsetUnits),z.alphaToCoverage===!0?oe(n.SAMPLE_ALPHA_TO_COVERAGE):Ee(n.SAMPLE_ALPHA_TO_COVERAGE)}function st(z){b!==z&&(z?n.frontFace(n.CW):n.frontFace(n.CCW),b=z)}function nt(z){z!==pf?(oe(n.CULL_FACE),z!==A&&(z===fl?n.cullFace(n.BACK):z===mf?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Ee(n.CULL_FACE),A=z}function gt(z){z!==N&&(Z&&n.lineWidth(z),N=z)}function Re(z,ge,K){z?(oe(n.POLYGON_OFFSET_FILL),(U!==ge||H!==K)&&(n.polygonOffset(ge,K),U=ge,H=K)):Ee(n.POLYGON_OFFSET_FILL)}function Ct(z){z?oe(n.SCISSOR_TEST):Ee(n.SCISSOR_TEST)}function Fe(z){z===void 0&&(z=n.TEXTURE0+q-1),te!==z&&(n.activeTexture(z),te=z)}function Ve(z,ge,K){K===void 0&&(te===null?K=n.TEXTURE0+q-1:K=te);let xe=ne[K];xe===void 0&&(xe={type:void 0,texture:void 0},ne[K]=xe),(xe.type!==z||xe.texture!==ge)&&(te!==K&&(n.activeTexture(K),te=K),n.bindTexture(z,ge||re[z]),xe.type=z,xe.texture=ge)}function I(){const z=ne[te];z!==void 0&&z.type!==void 0&&(n.bindTexture(z.type,null),z.type=void 0,z.texture=void 0)}function S(){try{n.compressedTexImage2D(...arguments)}catch(z){z("WebGLState:",z)}}function $(){try{n.compressedTexImage3D(...arguments)}catch(z){z("WebGLState:",z)}}function se(){try{n.texSubImage2D(...arguments)}catch(z){z("WebGLState:",z)}}function ce(){try{n.texSubImage3D(...arguments)}catch(z){z("WebGLState:",z)}}function ee(){try{n.compressedTexSubImage2D(...arguments)}catch(z){z("WebGLState:",z)}}function De(){try{n.compressedTexSubImage3D(...arguments)}catch(z){z("WebGLState:",z)}}function _e(){try{n.texStorage2D(...arguments)}catch(z){z("WebGLState:",z)}}function Ne(){try{n.texStorage3D(...arguments)}catch(z){z("WebGLState:",z)}}function Le(){try{n.texImage2D(...arguments)}catch(z){z("WebGLState:",z)}}function le(){try{n.texImage3D(...arguments)}catch(z){z("WebGLState:",z)}}function pe(z){ze.equals(z)===!1&&(n.scissor(z.x,z.y,z.z,z.w),ze.copy(z))}function $e(z){Je.equals(z)===!1&&(n.viewport(z.x,z.y,z.z,z.w),Je.copy(z))}function ke(z,ge){let K=c.get(ge);K===void 0&&(K=new WeakMap,c.set(ge,K));let xe=K.get(z);xe===void 0&&(xe=n.getUniformBlockIndex(ge,z.name),K.set(z,xe))}function Me(z,ge){const xe=c.get(ge).get(z);l.get(ge)!==xe&&(n.uniformBlockBinding(ge,xe,z.__bindingPointIndex),l.set(ge,xe))}function qe(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},te=null,ne={},d={},f=new WeakMap,h=[],p=null,_=!1,x=null,m=null,E=null,T=null,C=null,P=null,g=null,R=new ot(0,0,0),D=0,v=!1,b=null,A=null,N=null,U=null,H=null,ze.set(0,0,n.canvas.width,n.canvas.height),Je.set(0,0,n.canvas.width,n.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:oe,disable:Ee,bindFramebuffer:We,drawBuffers:Ie,useProgram:it,setBlending:Et,setMaterial:O,setFlipSided:st,setCullFace:nt,setLineWidth:gt,setPolygonOffset:Re,setScissorTest:Ct,activeTexture:Fe,bindTexture:Ve,unbindTexture:I,compressedTexImage2D:S,compressedTexImage3D:$,texImage2D:Le,texImage3D:le,updateUBOMapping:ke,uniformBlockBinding:Me,texStorage2D:_e,texStorage3D:Ne,texSubImage2D:se,texSubImage3D:ce,compressedTexSubImage2D:ee,compressedTexSubImage3D:De,scissor:pe,viewport:$e,reset:qe}}function _g(n,e,t,i,s,r,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new rt,u=new WeakMap;let d;const f=new WeakMap;let h=!1;try{h=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function p(I,S){return h?new OffscreenCanvas(I,S):Ta("canvas")}function _(I,S,$){let se=1;const ce=Ve(I);if((ce.width>$||ce.height>$)&&(se=$/Math.max(ce.width,ce.height)),se<1)if(typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&I instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&I instanceof ImageBitmap||typeof VideoFrame<"u"&&I instanceof VideoFrame){const ee=Math.floor(se*ce.width),De=Math.floor(se*ce.height);d===void 0&&(d=p(ee,De));const _e=S?p(ee,De):d;return _e.width=ee,_e.height=De,_e.getContext("2d").drawImage(I,0,0,ee,De),Ze("WebGLRenderer: Texture has been resized from ("+ce.width+"x"+ce.height+") to ("+ee+"x"+De+")."),_e}else return"data"in I&&Ze("WebGLRenderer: Image in DataTexture is too big ("+ce.width+"x"+ce.height+")."),I;return I}function x(I){return I.generateMipmaps}function m(I){n.generateMipmap(I)}function E(I){return I.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:I.isWebGL3DRenderTarget?n.TEXTURE_3D:I.isWebGLArrayRenderTarget||I.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function T(I,S,$,se,ce=!1){if(I!==null){if(n[I]!==void 0)return n[I];Ze("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+I+"'")}let ee=S;if(S===n.RED&&($===n.FLOAT&&(ee=n.R32F),$===n.HALF_FLOAT&&(ee=n.R16F),$===n.UNSIGNED_BYTE&&(ee=n.R8)),S===n.RED_INTEGER&&($===n.UNSIGNED_BYTE&&(ee=n.R8UI),$===n.UNSIGNED_SHORT&&(ee=n.R16UI),$===n.UNSIGNED_INT&&(ee=n.R32UI),$===n.BYTE&&(ee=n.R8I),$===n.SHORT&&(ee=n.R16I),$===n.INT&&(ee=n.R32I)),S===n.RG&&($===n.FLOAT&&(ee=n.RG32F),$===n.HALF_FLOAT&&(ee=n.RG16F),$===n.UNSIGNED_BYTE&&(ee=n.RG8)),S===n.RG_INTEGER&&($===n.UNSIGNED_BYTE&&(ee=n.RG8UI),$===n.UNSIGNED_SHORT&&(ee=n.RG16UI),$===n.UNSIGNED_INT&&(ee=n.RG32UI),$===n.BYTE&&(ee=n.RG8I),$===n.SHORT&&(ee=n.RG16I),$===n.INT&&(ee=n.RG32I)),S===n.RGB_INTEGER&&($===n.UNSIGNED_BYTE&&(ee=n.RGB8UI),$===n.UNSIGNED_SHORT&&(ee=n.RGB16UI),$===n.UNSIGNED_INT&&(ee=n.RGB32UI),$===n.BYTE&&(ee=n.RGB8I),$===n.SHORT&&(ee=n.RGB16I),$===n.INT&&(ee=n.RGB32I)),S===n.RGBA_INTEGER&&($===n.UNSIGNED_BYTE&&(ee=n.RGBA8UI),$===n.UNSIGNED_SHORT&&(ee=n.RGBA16UI),$===n.UNSIGNED_INT&&(ee=n.RGBA32UI),$===n.BYTE&&(ee=n.RGBA8I),$===n.SHORT&&(ee=n.RGBA16I),$===n.INT&&(ee=n.RGBA32I)),S===n.RGB&&($===n.UNSIGNED_INT_5_9_9_9_REV&&(ee=n.RGB9_E5),$===n.UNSIGNED_INT_10F_11F_11F_REV&&(ee=n.R11F_G11F_B10F)),S===n.RGBA){const De=ce?Ea:mt.getTransfer(se);$===n.FLOAT&&(ee=n.RGBA32F),$===n.HALF_FLOAT&&(ee=n.RGBA16F),$===n.UNSIGNED_BYTE&&(ee=De===Mt?n.SRGB8_ALPHA8:n.RGBA8),$===n.UNSIGNED_SHORT_4_4_4_4&&(ee=n.RGBA4),$===n.UNSIGNED_SHORT_5_5_5_1&&(ee=n.RGB5_A1)}return(ee===n.R16F||ee===n.R32F||ee===n.RG16F||ee===n.RG32F||ee===n.RGBA16F||ee===n.RGBA32F)&&e.get("EXT_color_buffer_float"),ee}function C(I,S){let $;return I?S===null||S===_s||S===Rr?$=n.DEPTH24_STENCIL8:S===ci?$=n.DEPTH32F_STENCIL8:S===Ar&&($=n.DEPTH24_STENCIL8,Ze("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===_s||S===Rr?$=n.DEPTH_COMPONENT24:S===ci?$=n.DEPTH_COMPONENT32F:S===Ar&&($=n.DEPTH_COMPONENT16),$}function P(I,S){return x(I)===!0||I.isFramebufferTexture&&I.minFilter!==Bn&&I.minFilter!==Hn?Math.log2(Math.max(S.width,S.height))+1:I.mipmaps!==void 0&&I.mipmaps.length>0?I.mipmaps.length:I.isCompressedTexture&&Array.isArray(I.image)?S.mipmaps.length:1}function g(I){const S=I.target;S.removeEventListener("dispose",g),D(S),S.isVideoTexture&&u.delete(S)}function R(I){const S=I.target;S.removeEventListener("dispose",R),b(S)}function D(I){const S=i.get(I);if(S.__webglInit===void 0)return;const $=I.source,se=f.get($);if(se){const ce=se[S.__cacheKey];ce.usedTimes--,ce.usedTimes===0&&v(I),Object.keys(se).length===0&&f.delete($)}i.remove(I)}function v(I){const S=i.get(I);n.deleteTexture(S.__webglTexture);const $=I.source,se=f.get($);delete se[S.__cacheKey],o.memory.textures--}function b(I){const S=i.get(I);if(I.depthTexture&&(I.depthTexture.dispose(),i.remove(I.depthTexture)),I.isWebGLCubeRenderTarget)for(let se=0;se<6;se++){if(Array.isArray(S.__webglFramebuffer[se]))for(let ce=0;ce<S.__webglFramebuffer[se].length;ce++)n.deleteFramebuffer(S.__webglFramebuffer[se][ce]);else n.deleteFramebuffer(S.__webglFramebuffer[se]);S.__webglDepthbuffer&&n.deleteRenderbuffer(S.__webglDepthbuffer[se])}else{if(Array.isArray(S.__webglFramebuffer))for(let se=0;se<S.__webglFramebuffer.length;se++)n.deleteFramebuffer(S.__webglFramebuffer[se]);else n.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&n.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&n.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let se=0;se<S.__webglColorRenderbuffer.length;se++)S.__webglColorRenderbuffer[se]&&n.deleteRenderbuffer(S.__webglColorRenderbuffer[se]);S.__webglDepthRenderbuffer&&n.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const $=I.textures;for(let se=0,ce=$.length;se<ce;se++){const ee=i.get($[se]);ee.__webglTexture&&(n.deleteTexture(ee.__webglTexture),o.memory.textures--),i.remove($[se])}i.remove(I)}let A=0;function N(){A=0}function U(){const I=A;return I>=s.maxTextures&&Ze("WebGLTextures: Trying to use "+I+" texture units while this GPU supports only "+s.maxTextures),A+=1,I}function H(I){const S=[];return S.push(I.wrapS),S.push(I.wrapT),S.push(I.wrapR||0),S.push(I.magFilter),S.push(I.minFilter),S.push(I.anisotropy),S.push(I.internalFormat),S.push(I.format),S.push(I.type),S.push(I.generateMipmaps),S.push(I.premultiplyAlpha),S.push(I.flipY),S.push(I.unpackAlignment),S.push(I.colorSpace),S.join()}function q(I,S){const $=i.get(I);if(I.isVideoTexture&&Ct(I),I.isRenderTargetTexture===!1&&I.isExternalTexture!==!0&&I.version>0&&$.__version!==I.version){const se=I.image;if(se===null)Ze("WebGLRenderer: Texture marked for update but no image data found.");else if(se.complete===!1)Ze("WebGLRenderer: Texture marked for update but image is incomplete");else{re($,I,S);return}}else I.isExternalTexture&&($.__webglTexture=I.sourceTexture?I.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,$.__webglTexture,n.TEXTURE0+S)}function Z(I,S){const $=i.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&$.__version!==I.version){re($,I,S);return}else I.isExternalTexture&&($.__webglTexture=I.sourceTexture?I.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,$.__webglTexture,n.TEXTURE0+S)}function ie(I,S){const $=i.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&$.__version!==I.version){re($,I,S);return}t.bindTexture(n.TEXTURE_3D,$.__webglTexture,n.TEXTURE0+S)}function Q(I,S){const $=i.get(I);if(I.version>0&&$.__version!==I.version){oe($,I,S);return}t.bindTexture(n.TEXTURE_CUBE_MAP,$.__webglTexture,n.TEXTURE0+S)}const te={[Sa]:n.REPEAT,[Ai]:n.CLAMP_TO_EDGE,[Yo]:n.MIRRORED_REPEAT},ne={[Bn]:n.NEAREST,[Gf]:n.NEAREST_MIPMAP_NEAREST,[Vr]:n.NEAREST_MIPMAP_LINEAR,[Hn]:n.LINEAR,[Ya]:n.LINEAR_MIPMAP_NEAREST,[gs]:n.LINEAR_MIPMAP_LINEAR},fe={[qf]:n.NEVER,[Jf]:n.ALWAYS,[Xf]:n.LESS,[Ku]:n.LEQUAL,[jf]:n.EQUAL,[Zf]:n.GEQUAL,[Yf]:n.GREATER,[Kf]:n.NOTEQUAL};function Pe(I,S){if(S.type===ci&&e.has("OES_texture_float_linear")===!1&&(S.magFilter===Hn||S.magFilter===Ya||S.magFilter===Vr||S.magFilter===gs||S.minFilter===Hn||S.minFilter===Ya||S.minFilter===Vr||S.minFilter===gs)&&Ze("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(I,n.TEXTURE_WRAP_S,te[S.wrapS]),n.texParameteri(I,n.TEXTURE_WRAP_T,te[S.wrapT]),(I===n.TEXTURE_3D||I===n.TEXTURE_2D_ARRAY)&&n.texParameteri(I,n.TEXTURE_WRAP_R,te[S.wrapR]),n.texParameteri(I,n.TEXTURE_MAG_FILTER,ne[S.magFilter]),n.texParameteri(I,n.TEXTURE_MIN_FILTER,ne[S.minFilter]),S.compareFunction&&(n.texParameteri(I,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(I,n.TEXTURE_COMPARE_FUNC,fe[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===Bn||S.minFilter!==Vr&&S.minFilter!==gs||S.type===ci&&e.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||i.get(S).__currentAnisotropy){const $=e.get("EXT_texture_filter_anisotropic");n.texParameterf(I,$.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,s.getMaxAnisotropy())),i.get(S).__currentAnisotropy=S.anisotropy}}}function ze(I,S){let $=!1;I.__webglInit===void 0&&(I.__webglInit=!0,S.addEventListener("dispose",g));const se=S.source;let ce=f.get(se);ce===void 0&&(ce={},f.set(se,ce));const ee=H(S);if(ee!==I.__cacheKey){ce[ee]===void 0&&(ce[ee]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,$=!0),ce[ee].usedTimes++;const De=ce[I.__cacheKey];De!==void 0&&(ce[I.__cacheKey].usedTimes--,De.usedTimes===0&&v(S)),I.__cacheKey=ee,I.__webglTexture=ce[ee].texture}return $}function Je(I,S,$){return Math.floor(Math.floor(I/$)/S)}function ft(I,S,$,se){const ee=I.updateRanges;if(ee.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,S.width,S.height,$,se,S.data);else{ee.sort((le,pe)=>le.start-pe.start);let De=0;for(let le=1;le<ee.length;le++){const pe=ee[De],$e=ee[le],ke=pe.start+pe.count,Me=Je($e.start,S.width,4),qe=Je(pe.start,S.width,4);$e.start<=ke+1&&Me===qe&&Je($e.start+$e.count-1,S.width,4)===Me?pe.count=Math.max(pe.count,$e.start+$e.count-pe.start):(++De,ee[De]=$e)}ee.length=De+1;const _e=n.getParameter(n.UNPACK_ROW_LENGTH),Ne=n.getParameter(n.UNPACK_SKIP_PIXELS),Le=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,S.width);for(let le=0,pe=ee.length;le<pe;le++){const $e=ee[le],ke=Math.floor($e.start/4),Me=Math.ceil($e.count/4),qe=ke%S.width,z=Math.floor(ke/S.width),ge=Me,K=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,qe),n.pixelStorei(n.UNPACK_SKIP_ROWS,z),t.texSubImage2D(n.TEXTURE_2D,0,qe,z,ge,K,$,se,S.data)}I.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,_e),n.pixelStorei(n.UNPACK_SKIP_PIXELS,Ne),n.pixelStorei(n.UNPACK_SKIP_ROWS,Le)}}function re(I,S,$){let se=n.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(se=n.TEXTURE_2D_ARRAY),S.isData3DTexture&&(se=n.TEXTURE_3D);const ce=ze(I,S),ee=S.source;t.bindTexture(se,I.__webglTexture,n.TEXTURE0+$);const De=i.get(ee);if(ee.version!==De.__version||ce===!0){t.activeTexture(n.TEXTURE0+$);const _e=mt.getPrimaries(mt.workingColorSpace),Ne=S.colorSpace===Wi?null:mt.getPrimaries(S.colorSpace),Le=S.colorSpace===Wi||_e===Ne?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,S.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,S.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Le);let le=_(S.image,!1,s.maxTextureSize);le=Fe(S,le);const pe=r.convert(S.format,S.colorSpace),$e=r.convert(S.type);let ke=T(S.internalFormat,pe,$e,S.colorSpace,S.isVideoTexture);Pe(se,S);let Me;const qe=S.mipmaps,z=S.isVideoTexture!==!0,ge=De.__version===void 0||ce===!0,K=ee.dataReady,xe=P(S,le);if(S.isDepthTexture)ke=C(S.format===Pr,S.type),ge&&(z?t.texStorage2D(n.TEXTURE_2D,1,ke,le.width,le.height):t.texImage2D(n.TEXTURE_2D,0,ke,le.width,le.height,0,pe,$e,null));else if(S.isDataTexture)if(qe.length>0){z&&ge&&t.texStorage2D(n.TEXTURE_2D,xe,ke,qe[0].width,qe[0].height);for(let ue=0,ae=qe.length;ue<ae;ue++)Me=qe[ue],z?K&&t.texSubImage2D(n.TEXTURE_2D,ue,0,0,Me.width,Me.height,pe,$e,Me.data):t.texImage2D(n.TEXTURE_2D,ue,ke,Me.width,Me.height,0,pe,$e,Me.data);S.generateMipmaps=!1}else z?(ge&&t.texStorage2D(n.TEXTURE_2D,xe,ke,le.width,le.height),K&&ft(S,le,pe,$e)):t.texImage2D(n.TEXTURE_2D,0,ke,le.width,le.height,0,pe,$e,le.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){z&&ge&&t.texStorage3D(n.TEXTURE_2D_ARRAY,xe,ke,qe[0].width,qe[0].height,le.depth);for(let ue=0,ae=qe.length;ue<ae;ue++)if(Me=qe[ue],S.format!==Qn)if(pe!==null)if(z){if(K)if(S.layerUpdates.size>0){const we=Kl(Me.width,Me.height,S.format,S.type);for(const je of S.layerUpdates){const yt=Me.data.subarray(je*we/Me.data.BYTES_PER_ELEMENT,(je+1)*we/Me.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ue,0,0,je,Me.width,Me.height,1,pe,yt)}S.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ue,0,0,0,Me.width,Me.height,le.depth,pe,Me.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ue,ke,Me.width,Me.height,le.depth,0,Me.data,0,0);else Ze("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else z?K&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,ue,0,0,0,Me.width,Me.height,le.depth,pe,$e,Me.data):t.texImage3D(n.TEXTURE_2D_ARRAY,ue,ke,Me.width,Me.height,le.depth,0,pe,$e,Me.data)}else{z&&ge&&t.texStorage2D(n.TEXTURE_2D,xe,ke,qe[0].width,qe[0].height);for(let ue=0,ae=qe.length;ue<ae;ue++)Me=qe[ue],S.format!==Qn?pe!==null?z?K&&t.compressedTexSubImage2D(n.TEXTURE_2D,ue,0,0,Me.width,Me.height,pe,Me.data):t.compressedTexImage2D(n.TEXTURE_2D,ue,ke,Me.width,Me.height,0,Me.data):Ze("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):z?K&&t.texSubImage2D(n.TEXTURE_2D,ue,0,0,Me.width,Me.height,pe,$e,Me.data):t.texImage2D(n.TEXTURE_2D,ue,ke,Me.width,Me.height,0,pe,$e,Me.data)}else if(S.isDataArrayTexture)if(z){if(ge&&t.texStorage3D(n.TEXTURE_2D_ARRAY,xe,ke,le.width,le.height,le.depth),K)if(S.layerUpdates.size>0){const ue=Kl(le.width,le.height,S.format,S.type);for(const ae of S.layerUpdates){const we=le.data.subarray(ae*ue/le.data.BYTES_PER_ELEMENT,(ae+1)*ue/le.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,ae,le.width,le.height,1,pe,$e,we)}S.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,le.width,le.height,le.depth,pe,$e,le.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,ke,le.width,le.height,le.depth,0,pe,$e,le.data);else if(S.isData3DTexture)z?(ge&&t.texStorage3D(n.TEXTURE_3D,xe,ke,le.width,le.height,le.depth),K&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,le.width,le.height,le.depth,pe,$e,le.data)):t.texImage3D(n.TEXTURE_3D,0,ke,le.width,le.height,le.depth,0,pe,$e,le.data);else if(S.isFramebufferTexture){if(ge)if(z)t.texStorage2D(n.TEXTURE_2D,xe,ke,le.width,le.height);else{let ue=le.width,ae=le.height;for(let we=0;we<xe;we++)t.texImage2D(n.TEXTURE_2D,we,ke,ue,ae,0,pe,$e,null),ue>>=1,ae>>=1}}else if(qe.length>0){if(z&&ge){const ue=Ve(qe[0]);t.texStorage2D(n.TEXTURE_2D,xe,ke,ue.width,ue.height)}for(let ue=0,ae=qe.length;ue<ae;ue++)Me=qe[ue],z?K&&t.texSubImage2D(n.TEXTURE_2D,ue,0,0,pe,$e,Me):t.texImage2D(n.TEXTURE_2D,ue,ke,pe,$e,Me);S.generateMipmaps=!1}else if(z){if(ge){const ue=Ve(le);t.texStorage2D(n.TEXTURE_2D,xe,ke,ue.width,ue.height)}K&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,pe,$e,le)}else t.texImage2D(n.TEXTURE_2D,0,ke,pe,$e,le);x(S)&&m(se),De.__version=ee.version,S.onUpdate&&S.onUpdate(S)}I.__version=S.version}function oe(I,S,$){if(S.image.length!==6)return;const se=ze(I,S),ce=S.source;t.bindTexture(n.TEXTURE_CUBE_MAP,I.__webglTexture,n.TEXTURE0+$);const ee=i.get(ce);if(ce.version!==ee.__version||se===!0){t.activeTexture(n.TEXTURE0+$);const De=mt.getPrimaries(mt.workingColorSpace),_e=S.colorSpace===Wi?null:mt.getPrimaries(S.colorSpace),Ne=S.colorSpace===Wi||De===_e?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,S.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,S.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ne);const Le=S.isCompressedTexture||S.image[0].isCompressedTexture,le=S.image[0]&&S.image[0].isDataTexture,pe=[];for(let ae=0;ae<6;ae++)!Le&&!le?pe[ae]=_(S.image[ae],!0,s.maxCubemapSize):pe[ae]=le?S.image[ae].image:S.image[ae],pe[ae]=Fe(S,pe[ae]);const $e=pe[0],ke=r.convert(S.format,S.colorSpace),Me=r.convert(S.type),qe=T(S.internalFormat,ke,Me,S.colorSpace),z=S.isVideoTexture!==!0,ge=ee.__version===void 0||se===!0,K=ce.dataReady;let xe=P(S,$e);Pe(n.TEXTURE_CUBE_MAP,S);let ue;if(Le){z&&ge&&t.texStorage2D(n.TEXTURE_CUBE_MAP,xe,qe,$e.width,$e.height);for(let ae=0;ae<6;ae++){ue=pe[ae].mipmaps;for(let we=0;we<ue.length;we++){const je=ue[we];S.format!==Qn?ke!==null?z?K&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,we,0,0,je.width,je.height,ke,je.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,we,qe,je.width,je.height,0,je.data):Ze("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):z?K&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,we,0,0,je.width,je.height,ke,Me,je.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,we,qe,je.width,je.height,0,ke,Me,je.data)}}}else{if(ue=S.mipmaps,z&&ge){ue.length>0&&xe++;const ae=Ve(pe[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,xe,qe,ae.width,ae.height)}for(let ae=0;ae<6;ae++)if(le){z?K&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,pe[ae].width,pe[ae].height,ke,Me,pe[ae].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,qe,pe[ae].width,pe[ae].height,0,ke,Me,pe[ae].data);for(let we=0;we<ue.length;we++){const yt=ue[we].image[ae].image;z?K&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,we+1,0,0,yt.width,yt.height,ke,Me,yt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,we+1,qe,yt.width,yt.height,0,ke,Me,yt.data)}}else{z?K&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,ke,Me,pe[ae]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,qe,ke,Me,pe[ae]);for(let we=0;we<ue.length;we++){const je=ue[we];z?K&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,we+1,0,0,ke,Me,je.image[ae]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,we+1,qe,ke,Me,je.image[ae])}}}x(S)&&m(n.TEXTURE_CUBE_MAP),ee.__version=ce.version,S.onUpdate&&S.onUpdate(S)}I.__version=S.version}function Ee(I,S,$,se,ce,ee){const De=r.convert($.format,$.colorSpace),_e=r.convert($.type),Ne=T($.internalFormat,De,_e,$.colorSpace),Le=i.get(S),le=i.get($);if(le.__renderTarget=S,!Le.__hasExternalTextures){const pe=Math.max(1,S.width>>ee),$e=Math.max(1,S.height>>ee);ce===n.TEXTURE_3D||ce===n.TEXTURE_2D_ARRAY?t.texImage3D(ce,ee,Ne,pe,$e,S.depth,0,De,_e,null):t.texImage2D(ce,ee,Ne,pe,$e,0,De,_e,null)}t.bindFramebuffer(n.FRAMEBUFFER,I),Re(S)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,se,ce,le.__webglTexture,0,gt(S)):(ce===n.TEXTURE_2D||ce>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&ce<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,se,ce,le.__webglTexture,ee),t.bindFramebuffer(n.FRAMEBUFFER,null)}function We(I,S,$){if(n.bindRenderbuffer(n.RENDERBUFFER,I),S.depthBuffer){const se=S.depthTexture,ce=se&&se.isDepthTexture?se.type:null,ee=C(S.stencilBuffer,ce),De=S.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,_e=gt(S);Re(S)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,_e,ee,S.width,S.height):$?n.renderbufferStorageMultisample(n.RENDERBUFFER,_e,ee,S.width,S.height):n.renderbufferStorage(n.RENDERBUFFER,ee,S.width,S.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,De,n.RENDERBUFFER,I)}else{const se=S.textures;for(let ce=0;ce<se.length;ce++){const ee=se[ce],De=r.convert(ee.format,ee.colorSpace),_e=r.convert(ee.type),Ne=T(ee.internalFormat,De,_e,ee.colorSpace),Le=gt(S);$&&Re(S)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Le,Ne,S.width,S.height):Re(S)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Le,Ne,S.width,S.height):n.renderbufferStorage(n.RENDERBUFFER,Ne,S.width,S.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Ie(I,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,I),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const se=i.get(S.depthTexture);se.__renderTarget=S,(!se.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),q(S.depthTexture,0);const ce=se.__webglTexture,ee=gt(S);if(S.depthTexture.format===Cr)Re(S)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ce,0,ee):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ce,0);else if(S.depthTexture.format===Pr)Re(S)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ce,0,ee):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ce,0);else throw new Error("Unknown depthTexture format")}function it(I){const S=i.get(I),$=I.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==I.depthTexture){const se=I.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),se){const ce=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,se.removeEventListener("dispose",ce)};se.addEventListener("dispose",ce),S.__depthDisposeCallback=ce}S.__boundDepthTexture=se}if(I.depthTexture&&!S.__autoAllocateDepthBuffer){if($)throw new Error("target.depthTexture not supported in Cube render targets");const se=I.texture.mipmaps;se&&se.length>0?Ie(S.__webglFramebuffer[0],I):Ie(S.__webglFramebuffer,I)}else if($){S.__webglDepthbuffer=[];for(let se=0;se<6;se++)if(t.bindFramebuffer(n.FRAMEBUFFER,S.__webglFramebuffer[se]),S.__webglDepthbuffer[se]===void 0)S.__webglDepthbuffer[se]=n.createRenderbuffer(),We(S.__webglDepthbuffer[se],I,!1);else{const ce=I.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ee=S.__webglDepthbuffer[se];n.bindRenderbuffer(n.RENDERBUFFER,ee),n.framebufferRenderbuffer(n.FRAMEBUFFER,ce,n.RENDERBUFFER,ee)}}else{const se=I.texture.mipmaps;if(se&&se.length>0?t.bindFramebuffer(n.FRAMEBUFFER,S.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=n.createRenderbuffer(),We(S.__webglDepthbuffer,I,!1);else{const ce=I.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ee=S.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,ee),n.framebufferRenderbuffer(n.FRAMEBUFFER,ce,n.RENDERBUFFER,ee)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function Bt(I,S,$){const se=i.get(I);S!==void 0&&Ee(se.__webglFramebuffer,I,I.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),$!==void 0&&it(I)}function Qe(I){const S=I.texture,$=i.get(I),se=i.get(S);I.addEventListener("dispose",R);const ce=I.textures,ee=I.isWebGLCubeRenderTarget===!0,De=ce.length>1;if(De||(se.__webglTexture===void 0&&(se.__webglTexture=n.createTexture()),se.__version=S.version,o.memory.textures++),ee){$.__webglFramebuffer=[];for(let _e=0;_e<6;_e++)if(S.mipmaps&&S.mipmaps.length>0){$.__webglFramebuffer[_e]=[];for(let Ne=0;Ne<S.mipmaps.length;Ne++)$.__webglFramebuffer[_e][Ne]=n.createFramebuffer()}else $.__webglFramebuffer[_e]=n.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){$.__webglFramebuffer=[];for(let _e=0;_e<S.mipmaps.length;_e++)$.__webglFramebuffer[_e]=n.createFramebuffer()}else $.__webglFramebuffer=n.createFramebuffer();if(De)for(let _e=0,Ne=ce.length;_e<Ne;_e++){const Le=i.get(ce[_e]);Le.__webglTexture===void 0&&(Le.__webglTexture=n.createTexture(),o.memory.textures++)}if(I.samples>0&&Re(I)===!1){$.__webglMultisampledFramebuffer=n.createFramebuffer(),$.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,$.__webglMultisampledFramebuffer);for(let _e=0;_e<ce.length;_e++){const Ne=ce[_e];$.__webglColorRenderbuffer[_e]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,$.__webglColorRenderbuffer[_e]);const Le=r.convert(Ne.format,Ne.colorSpace),le=r.convert(Ne.type),pe=T(Ne.internalFormat,Le,le,Ne.colorSpace,I.isXRRenderTarget===!0),$e=gt(I);n.renderbufferStorageMultisample(n.RENDERBUFFER,$e,pe,I.width,I.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+_e,n.RENDERBUFFER,$.__webglColorRenderbuffer[_e])}n.bindRenderbuffer(n.RENDERBUFFER,null),I.depthBuffer&&($.__webglDepthRenderbuffer=n.createRenderbuffer(),We($.__webglDepthRenderbuffer,I,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(ee){t.bindTexture(n.TEXTURE_CUBE_MAP,se.__webglTexture),Pe(n.TEXTURE_CUBE_MAP,S);for(let _e=0;_e<6;_e++)if(S.mipmaps&&S.mipmaps.length>0)for(let Ne=0;Ne<S.mipmaps.length;Ne++)Ee($.__webglFramebuffer[_e][Ne],I,S,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,Ne);else Ee($.__webglFramebuffer[_e],I,S,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0);x(S)&&m(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(De){for(let _e=0,Ne=ce.length;_e<Ne;_e++){const Le=ce[_e],le=i.get(Le);let pe=n.TEXTURE_2D;(I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(pe=I.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(pe,le.__webglTexture),Pe(pe,Le),Ee($.__webglFramebuffer,I,Le,n.COLOR_ATTACHMENT0+_e,pe,0),x(Le)&&m(pe)}t.unbindTexture()}else{let _e=n.TEXTURE_2D;if((I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(_e=I.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(_e,se.__webglTexture),Pe(_e,S),S.mipmaps&&S.mipmaps.length>0)for(let Ne=0;Ne<S.mipmaps.length;Ne++)Ee($.__webglFramebuffer[Ne],I,S,n.COLOR_ATTACHMENT0,_e,Ne);else Ee($.__webglFramebuffer,I,S,n.COLOR_ATTACHMENT0,_e,0);x(S)&&m(_e),t.unbindTexture()}I.depthBuffer&&it(I)}function Et(I){const S=I.textures;for(let $=0,se=S.length;$<se;$++){const ce=S[$];if(x(ce)){const ee=E(I),De=i.get(ce).__webglTexture;t.bindTexture(ee,De),m(ee),t.unbindTexture()}}}const O=[],st=[];function nt(I){if(I.samples>0){if(Re(I)===!1){const S=I.textures,$=I.width,se=I.height;let ce=n.COLOR_BUFFER_BIT;const ee=I.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,De=i.get(I),_e=S.length>1;if(_e)for(let Le=0;Le<S.length;Le++)t.bindFramebuffer(n.FRAMEBUFFER,De.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Le,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,De.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Le,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,De.__webglMultisampledFramebuffer);const Ne=I.texture.mipmaps;Ne&&Ne.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,De.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,De.__webglFramebuffer);for(let Le=0;Le<S.length;Le++){if(I.resolveDepthBuffer&&(I.depthBuffer&&(ce|=n.DEPTH_BUFFER_BIT),I.stencilBuffer&&I.resolveStencilBuffer&&(ce|=n.STENCIL_BUFFER_BIT)),_e){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,De.__webglColorRenderbuffer[Le]);const le=i.get(S[Le]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,le,0)}n.blitFramebuffer(0,0,$,se,0,0,$,se,ce,n.NEAREST),l===!0&&(O.length=0,st.length=0,O.push(n.COLOR_ATTACHMENT0+Le),I.depthBuffer&&I.resolveDepthBuffer===!1&&(O.push(ee),st.push(ee),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,st)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,O))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),_e)for(let Le=0;Le<S.length;Le++){t.bindFramebuffer(n.FRAMEBUFFER,De.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Le,n.RENDERBUFFER,De.__webglColorRenderbuffer[Le]);const le=i.get(S[Le]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,De.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Le,n.TEXTURE_2D,le,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,De.__webglMultisampledFramebuffer)}else if(I.depthBuffer&&I.resolveDepthBuffer===!1&&l){const S=I.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[S])}}}function gt(I){return Math.min(s.maxSamples,I.samples)}function Re(I){const S=i.get(I);return I.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function Ct(I){const S=o.render.frame;u.get(I)!==S&&(u.set(I,S),I.update())}function Fe(I,S){const $=I.colorSpace,se=I.format,ce=I.type;return I.isCompressedTexture===!0||I.isVideoTexture===!0||$!==nr&&$!==Wi&&(mt.getTransfer($)===Mt?(se!==Qn||ce!==ui)&&Ze("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ot("WebGLTextures: Unsupported texture color space:",$)),S}function Ve(I){return typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement?(c.width=I.naturalWidth||I.width,c.height=I.naturalHeight||I.height):typeof VideoFrame<"u"&&I instanceof VideoFrame?(c.width=I.displayWidth,c.height=I.displayHeight):(c.width=I.width,c.height=I.height),c}this.allocateTextureUnit=U,this.resetTextureUnits=N,this.setTexture2D=q,this.setTexture2DArray=Z,this.setTexture3D=ie,this.setTextureCube=Q,this.rebindTextures=Bt,this.setupRenderTarget=Qe,this.updateRenderTargetMipmap=Et,this.updateMultisampleRenderTarget=nt,this.setupDepthRenderbuffer=it,this.setupFrameBufferTexture=Ee,this.useMultisampledRTT=Re}function vg(n,e){function t(i,s=Wi){let r;const o=mt.getTransfer(s);if(i===ui)return n.UNSIGNED_BYTE;if(i===Fc)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Nc)return n.UNSIGNED_SHORT_5_5_5_1;if(i===$u)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===qu)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Hu)return n.BYTE;if(i===Wu)return n.SHORT;if(i===Ar)return n.UNSIGNED_SHORT;if(i===Uc)return n.INT;if(i===_s)return n.UNSIGNED_INT;if(i===ci)return n.FLOAT;if(i===ar)return n.HALF_FLOAT;if(i===Xu)return n.ALPHA;if(i===ju)return n.RGB;if(i===Qn)return n.RGBA;if(i===Cr)return n.DEPTH_COMPONENT;if(i===Pr)return n.DEPTH_STENCIL;if(i===Oc)return n.RED;if(i===zc)return n.RED_INTEGER;if(i===kc)return n.RG;if(i===Bc)return n.RG_INTEGER;if(i===Vc)return n.RGBA_INTEGER;if(i===pa||i===ma||i===xa||i===ga)if(o===Mt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===pa)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===ma)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===xa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===ga)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===pa)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===ma)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===xa)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===ga)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Ko||i===Zo||i===Jo||i===Qo)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Ko)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Zo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Jo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Qo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===ec||i===tc||i===nc)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===ec||i===tc)return o===Mt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===nc)return o===Mt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===ic||i===sc||i===rc||i===ac||i===oc||i===cc||i===lc||i===uc||i===dc||i===fc||i===hc||i===pc||i===mc||i===xc)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===ic)return o===Mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===sc)return o===Mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===rc)return o===Mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===ac)return o===Mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===oc)return o===Mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===cc)return o===Mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===lc)return o===Mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===uc)return o===Mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===dc)return o===Mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===fc)return o===Mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===hc)return o===Mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===pc)return o===Mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===mc)return o===Mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===xc)return o===Mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===gc||i===_c||i===vc)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===gc)return o===Mt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===_c)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===vc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===bc||i===yc||i===Mc||i===Sc)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===bc)return r.COMPRESSED_RED_RGTC1_EXT;if(i===yc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Mc)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Sc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Rr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const bg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,yg=`
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

}`;class Mg{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new ld(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new Ui({vertexShader:bg,fragmentShader:yg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new en(new sr(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Sg extends or{constructor(e,t){super();const i=this;let s=null,r=1,o=null,a="local-floor",l=1,c=null,u=null,d=null,f=null,h=null,p=null;const _=typeof XRWebGLBinding<"u",x=new Mg,m={},E=t.getContextAttributes();let T=null,C=null;const P=[],g=[],R=new rt;let D=null;const v=new Rn;v.viewport=new St;const b=new Rn;b.viewport=new St;const A=[v,b],N=new Vh;let U=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(re){let oe=P[re];return oe===void 0&&(oe=new vo,P[re]=oe),oe.getTargetRaySpace()},this.getControllerGrip=function(re){let oe=P[re];return oe===void 0&&(oe=new vo,P[re]=oe),oe.getGripSpace()},this.getHand=function(re){let oe=P[re];return oe===void 0&&(oe=new vo,P[re]=oe),oe.getHandSpace()};function q(re){const oe=g.indexOf(re.inputSource);if(oe===-1)return;const Ee=P[oe];Ee!==void 0&&(Ee.update(re.inputSource,re.frame,c||o),Ee.dispatchEvent({type:re.type,data:re.inputSource}))}function Z(){s.removeEventListener("select",q),s.removeEventListener("selectstart",q),s.removeEventListener("selectend",q),s.removeEventListener("squeeze",q),s.removeEventListener("squeezestart",q),s.removeEventListener("squeezeend",q),s.removeEventListener("end",Z),s.removeEventListener("inputsourceschange",ie);for(let re=0;re<P.length;re++){const oe=g[re];oe!==null&&(g[re]=null,P[re].disconnect(oe))}U=null,H=null,x.reset();for(const re in m)delete m[re];e.setRenderTarget(T),h=null,f=null,d=null,s=null,C=null,ft.stop(),i.isPresenting=!1,e.setPixelRatio(D),e.setSize(R.width,R.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(re){r=re,i.isPresenting===!0&&Ze("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(re){a=re,i.isPresenting===!0&&Ze("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(re){c=re},this.getBaseLayer=function(){return f!==null?f:h},this.getBinding=function(){return d===null&&_&&(d=new XRWebGLBinding(s,t)),d},this.getFrame=function(){return p},this.getSession=function(){return s},this.setSession=async function(re){if(s=re,s!==null){if(T=e.getRenderTarget(),s.addEventListener("select",q),s.addEventListener("selectstart",q),s.addEventListener("selectend",q),s.addEventListener("squeeze",q),s.addEventListener("squeezestart",q),s.addEventListener("squeezeend",q),s.addEventListener("end",Z),s.addEventListener("inputsourceschange",ie),E.xrCompatible!==!0&&await t.makeXRCompatible(),D=e.getPixelRatio(),e.getSize(R),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let Ee=null,We=null,Ie=null;E.depth&&(Ie=E.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Ee=E.stencil?Pr:Cr,We=E.stencil?Rr:_s);const it={colorFormat:t.RGBA8,depthFormat:Ie,scaleFactor:r};d=this.getBinding(),f=d.createProjectionLayer(it),s.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),C=new vs(f.textureWidth,f.textureHeight,{format:Qn,type:ui,depthTexture:new cd(f.textureWidth,f.textureHeight,We,void 0,void 0,void 0,void 0,void 0,void 0,Ee),stencilBuffer:E.stencil,colorSpace:e.outputColorSpace,samples:E.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const Ee={antialias:E.antialias,alpha:!0,depth:E.depth,stencil:E.stencil,framebufferScaleFactor:r};h=new XRWebGLLayer(s,t,Ee),s.updateRenderState({baseLayer:h}),e.setPixelRatio(1),e.setSize(h.framebufferWidth,h.framebufferHeight,!1),C=new vs(h.framebufferWidth,h.framebufferHeight,{format:Qn,type:ui,colorSpace:e.outputColorSpace,stencilBuffer:E.stencil,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}C.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),ft.setContext(s),ft.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function ie(re){for(let oe=0;oe<re.removed.length;oe++){const Ee=re.removed[oe],We=g.indexOf(Ee);We>=0&&(g[We]=null,P[We].disconnect(Ee))}for(let oe=0;oe<re.added.length;oe++){const Ee=re.added[oe];let We=g.indexOf(Ee);if(We===-1){for(let it=0;it<P.length;it++)if(it>=g.length){g.push(Ee),We=it;break}else if(g[it]===null){g[it]=Ee,We=it;break}if(We===-1)break}const Ie=P[We];Ie&&Ie.connect(Ee)}}const Q=new B,te=new B;function ne(re,oe,Ee){Q.setFromMatrixPosition(oe.matrixWorld),te.setFromMatrixPosition(Ee.matrixWorld);const We=Q.distanceTo(te),Ie=oe.projectionMatrix.elements,it=Ee.projectionMatrix.elements,Bt=Ie[14]/(Ie[10]-1),Qe=Ie[14]/(Ie[10]+1),Et=(Ie[9]+1)/Ie[5],O=(Ie[9]-1)/Ie[5],st=(Ie[8]-1)/Ie[0],nt=(it[8]+1)/it[0],gt=Bt*st,Re=Bt*nt,Ct=We/(-st+nt),Fe=Ct*-st;if(oe.matrixWorld.decompose(re.position,re.quaternion,re.scale),re.translateX(Fe),re.translateZ(Ct),re.matrixWorld.compose(re.position,re.quaternion,re.scale),re.matrixWorldInverse.copy(re.matrixWorld).invert(),Ie[10]===-1)re.projectionMatrix.copy(oe.projectionMatrix),re.projectionMatrixInverse.copy(oe.projectionMatrixInverse);else{const Ve=Bt+Ct,I=Qe+Ct,S=gt-Fe,$=Re+(We-Fe),se=Et*Qe/I*Ve,ce=O*Qe/I*Ve;re.projectionMatrix.makePerspective(S,$,se,ce,Ve,I),re.projectionMatrixInverse.copy(re.projectionMatrix).invert()}}function fe(re,oe){oe===null?re.matrixWorld.copy(re.matrix):re.matrixWorld.multiplyMatrices(oe.matrixWorld,re.matrix),re.matrixWorldInverse.copy(re.matrixWorld).invert()}this.updateCamera=function(re){if(s===null)return;let oe=re.near,Ee=re.far;x.texture!==null&&(x.depthNear>0&&(oe=x.depthNear),x.depthFar>0&&(Ee=x.depthFar)),N.near=b.near=v.near=oe,N.far=b.far=v.far=Ee,(U!==N.near||H!==N.far)&&(s.updateRenderState({depthNear:N.near,depthFar:N.far}),U=N.near,H=N.far),N.layers.mask=re.layers.mask|6,v.layers.mask=N.layers.mask&3,b.layers.mask=N.layers.mask&5;const We=re.parent,Ie=N.cameras;fe(N,We);for(let it=0;it<Ie.length;it++)fe(Ie[it],We);Ie.length===2?ne(N,v,b):N.projectionMatrix.copy(v.projectionMatrix),Pe(re,N,We)};function Pe(re,oe,Ee){Ee===null?re.matrix.copy(oe.matrixWorld):(re.matrix.copy(Ee.matrixWorld),re.matrix.invert(),re.matrix.multiply(oe.matrixWorld)),re.matrix.decompose(re.position,re.quaternion,re.scale),re.updateMatrixWorld(!0),re.projectionMatrix.copy(oe.projectionMatrix),re.projectionMatrixInverse.copy(oe.projectionMatrixInverse),re.isPerspectiveCamera&&(re.fov=Aa*2*Math.atan(1/re.projectionMatrix.elements[5]),re.zoom=1)}this.getCamera=function(){return N},this.getFoveation=function(){if(!(f===null&&h===null))return l},this.setFoveation=function(re){l=re,f!==null&&(f.fixedFoveation=re),h!==null&&h.fixedFoveation!==void 0&&(h.fixedFoveation=re)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(N)},this.getCameraTexture=function(re){return m[re]};let ze=null;function Je(re,oe){if(u=oe.getViewerPose(c||o),p=oe,u!==null){const Ee=u.views;h!==null&&(e.setRenderTargetFramebuffer(C,h.framebuffer),e.setRenderTarget(C));let We=!1;Ee.length!==N.cameras.length&&(N.cameras.length=0,We=!0);for(let Qe=0;Qe<Ee.length;Qe++){const Et=Ee[Qe];let O=null;if(h!==null)O=h.getViewport(Et);else{const nt=d.getViewSubImage(f,Et);O=nt.viewport,Qe===0&&(e.setRenderTargetTextures(C,nt.colorTexture,nt.depthStencilTexture),e.setRenderTarget(C))}let st=A[Qe];st===void 0&&(st=new Rn,st.layers.enable(Qe),st.viewport=new St,A[Qe]=st),st.matrix.fromArray(Et.transform.matrix),st.matrix.decompose(st.position,st.quaternion,st.scale),st.projectionMatrix.fromArray(Et.projectionMatrix),st.projectionMatrixInverse.copy(st.projectionMatrix).invert(),st.viewport.set(O.x,O.y,O.width,O.height),Qe===0&&(N.matrix.copy(st.matrix),N.matrix.decompose(N.position,N.quaternion,N.scale)),We===!0&&N.cameras.push(st)}const Ie=s.enabledFeatures;if(Ie&&Ie.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&_){d=i.getBinding();const Qe=d.getDepthInformation(Ee[0]);Qe&&Qe.isValid&&Qe.texture&&x.init(Qe,s.renderState)}if(Ie&&Ie.includes("camera-access")&&_){e.state.unbindTexture(),d=i.getBinding();for(let Qe=0;Qe<Ee.length;Qe++){const Et=Ee[Qe].camera;if(Et){let O=m[Et];O||(O=new ld,m[Et]=O);const st=d.getCameraImage(Et);O.sourceTexture=st}}}}for(let Ee=0;Ee<P.length;Ee++){const We=g[Ee],Ie=P[Ee];We!==null&&Ie!==void 0&&Ie.update(We,oe,c||o)}ze&&ze(re,oe),oe.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:oe}),p=null}const ft=new dd;ft.setAnimationLoop(Je),this.setAnimationLoop=function(re){ze=re},this.dispose=function(){}}}const hs=new ni,Eg=new vt;function wg(n,e){function t(x,m){x.matrixAutoUpdate===!0&&x.updateMatrix(),m.value.copy(x.matrix)}function i(x,m){m.color.getRGB(x.fogColor.value,nd(n)),m.isFog?(x.fogNear.value=m.near,x.fogFar.value=m.far):m.isFogExp2&&(x.fogDensity.value=m.density)}function s(x,m,E,T,C){m.isMeshBasicMaterial||m.isMeshLambertMaterial?r(x,m):m.isMeshToonMaterial?(r(x,m),d(x,m)):m.isMeshPhongMaterial?(r(x,m),u(x,m)):m.isMeshStandardMaterial?(r(x,m),f(x,m),m.isMeshPhysicalMaterial&&h(x,m,C)):m.isMeshMatcapMaterial?(r(x,m),p(x,m)):m.isMeshDepthMaterial?r(x,m):m.isMeshDistanceMaterial?(r(x,m),_(x,m)):m.isMeshNormalMaterial?r(x,m):m.isLineBasicMaterial?(o(x,m),m.isLineDashedMaterial&&a(x,m)):m.isPointsMaterial?l(x,m,E,T):m.isSpriteMaterial?c(x,m):m.isShadowMaterial?(x.color.value.copy(m.color),x.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(x,m){x.opacity.value=m.opacity,m.color&&x.diffuse.value.copy(m.color),m.emissive&&x.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(x.map.value=m.map,t(m.map,x.mapTransform)),m.alphaMap&&(x.alphaMap.value=m.alphaMap,t(m.alphaMap,x.alphaMapTransform)),m.bumpMap&&(x.bumpMap.value=m.bumpMap,t(m.bumpMap,x.bumpMapTransform),x.bumpScale.value=m.bumpScale,m.side===Pn&&(x.bumpScale.value*=-1)),m.normalMap&&(x.normalMap.value=m.normalMap,t(m.normalMap,x.normalMapTransform),x.normalScale.value.copy(m.normalScale),m.side===Pn&&x.normalScale.value.negate()),m.displacementMap&&(x.displacementMap.value=m.displacementMap,t(m.displacementMap,x.displacementMapTransform),x.displacementScale.value=m.displacementScale,x.displacementBias.value=m.displacementBias),m.emissiveMap&&(x.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,x.emissiveMapTransform)),m.specularMap&&(x.specularMap.value=m.specularMap,t(m.specularMap,x.specularMapTransform)),m.alphaTest>0&&(x.alphaTest.value=m.alphaTest);const E=e.get(m),T=E.envMap,C=E.envMapRotation;T&&(x.envMap.value=T,hs.copy(C),hs.x*=-1,hs.y*=-1,hs.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(hs.y*=-1,hs.z*=-1),x.envMapRotation.value.setFromMatrix4(Eg.makeRotationFromEuler(hs)),x.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,x.reflectivity.value=m.reflectivity,x.ior.value=m.ior,x.refractionRatio.value=m.refractionRatio),m.lightMap&&(x.lightMap.value=m.lightMap,x.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,x.lightMapTransform)),m.aoMap&&(x.aoMap.value=m.aoMap,x.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,x.aoMapTransform))}function o(x,m){x.diffuse.value.copy(m.color),x.opacity.value=m.opacity,m.map&&(x.map.value=m.map,t(m.map,x.mapTransform))}function a(x,m){x.dashSize.value=m.dashSize,x.totalSize.value=m.dashSize+m.gapSize,x.scale.value=m.scale}function l(x,m,E,T){x.diffuse.value.copy(m.color),x.opacity.value=m.opacity,x.size.value=m.size*E,x.scale.value=T*.5,m.map&&(x.map.value=m.map,t(m.map,x.uvTransform)),m.alphaMap&&(x.alphaMap.value=m.alphaMap,t(m.alphaMap,x.alphaMapTransform)),m.alphaTest>0&&(x.alphaTest.value=m.alphaTest)}function c(x,m){x.diffuse.value.copy(m.color),x.opacity.value=m.opacity,x.rotation.value=m.rotation,m.map&&(x.map.value=m.map,t(m.map,x.mapTransform)),m.alphaMap&&(x.alphaMap.value=m.alphaMap,t(m.alphaMap,x.alphaMapTransform)),m.alphaTest>0&&(x.alphaTest.value=m.alphaTest)}function u(x,m){x.specular.value.copy(m.specular),x.shininess.value=Math.max(m.shininess,1e-4)}function d(x,m){m.gradientMap&&(x.gradientMap.value=m.gradientMap)}function f(x,m){x.metalness.value=m.metalness,m.metalnessMap&&(x.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,x.metalnessMapTransform)),x.roughness.value=m.roughness,m.roughnessMap&&(x.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,x.roughnessMapTransform)),m.envMap&&(x.envMapIntensity.value=m.envMapIntensity)}function h(x,m,E){x.ior.value=m.ior,m.sheen>0&&(x.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),x.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(x.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,x.sheenColorMapTransform)),m.sheenRoughnessMap&&(x.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,x.sheenRoughnessMapTransform))),m.clearcoat>0&&(x.clearcoat.value=m.clearcoat,x.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(x.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,x.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(x.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,x.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(x.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,x.clearcoatNormalMapTransform),x.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Pn&&x.clearcoatNormalScale.value.negate())),m.dispersion>0&&(x.dispersion.value=m.dispersion),m.iridescence>0&&(x.iridescence.value=m.iridescence,x.iridescenceIOR.value=m.iridescenceIOR,x.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],x.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(x.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,x.iridescenceMapTransform)),m.iridescenceThicknessMap&&(x.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,x.iridescenceThicknessMapTransform))),m.transmission>0&&(x.transmission.value=m.transmission,x.transmissionSamplerMap.value=E.texture,x.transmissionSamplerSize.value.set(E.width,E.height),m.transmissionMap&&(x.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,x.transmissionMapTransform)),x.thickness.value=m.thickness,m.thicknessMap&&(x.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,x.thicknessMapTransform)),x.attenuationDistance.value=m.attenuationDistance,x.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(x.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(x.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,x.anisotropyMapTransform))),x.specularIntensity.value=m.specularIntensity,x.specularColor.value.copy(m.specularColor),m.specularColorMap&&(x.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,x.specularColorMapTransform)),m.specularIntensityMap&&(x.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,x.specularIntensityMapTransform))}function p(x,m){m.matcap&&(x.matcap.value=m.matcap)}function _(x,m){const E=e.get(m).light;x.referencePosition.value.setFromMatrixPosition(E.matrixWorld),x.nearDistance.value=E.shadow.camera.near,x.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function Tg(n,e,t,i){let s={},r={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(E,T){const C=T.program;i.uniformBlockBinding(E,C)}function c(E,T){let C=s[E.id];C===void 0&&(p(E),C=u(E),s[E.id]=C,E.addEventListener("dispose",x));const P=T.program;i.updateUBOMapping(E,P);const g=e.render.frame;r[E.id]!==g&&(f(E),r[E.id]=g)}function u(E){const T=d();E.__bindingPointIndex=T;const C=n.createBuffer(),P=E.__size,g=E.usage;return n.bindBuffer(n.UNIFORM_BUFFER,C),n.bufferData(n.UNIFORM_BUFFER,P,g),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,T,C),C}function d(){for(let E=0;E<a;E++)if(o.indexOf(E)===-1)return o.push(E),E;return Ot("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(E){const T=s[E.id],C=E.uniforms,P=E.__cache;n.bindBuffer(n.UNIFORM_BUFFER,T);for(let g=0,R=C.length;g<R;g++){const D=Array.isArray(C[g])?C[g]:[C[g]];for(let v=0,b=D.length;v<b;v++){const A=D[v];if(h(A,g,v,P)===!0){const N=A.__offset,U=Array.isArray(A.value)?A.value:[A.value];let H=0;for(let q=0;q<U.length;q++){const Z=U[q],ie=_(Z);typeof Z=="number"||typeof Z=="boolean"?(A.__data[0]=Z,n.bufferSubData(n.UNIFORM_BUFFER,N+H,A.__data)):Z.isMatrix3?(A.__data[0]=Z.elements[0],A.__data[1]=Z.elements[1],A.__data[2]=Z.elements[2],A.__data[3]=0,A.__data[4]=Z.elements[3],A.__data[5]=Z.elements[4],A.__data[6]=Z.elements[5],A.__data[7]=0,A.__data[8]=Z.elements[6],A.__data[9]=Z.elements[7],A.__data[10]=Z.elements[8],A.__data[11]=0):(Z.toArray(A.__data,H),H+=ie.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,N,A.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function h(E,T,C,P){const g=E.value,R=T+"_"+C;if(P[R]===void 0)return typeof g=="number"||typeof g=="boolean"?P[R]=g:P[R]=g.clone(),!0;{const D=P[R];if(typeof g=="number"||typeof g=="boolean"){if(D!==g)return P[R]=g,!0}else if(D.equals(g)===!1)return D.copy(g),!0}return!1}function p(E){const T=E.uniforms;let C=0;const P=16;for(let R=0,D=T.length;R<D;R++){const v=Array.isArray(T[R])?T[R]:[T[R]];for(let b=0,A=v.length;b<A;b++){const N=v[b],U=Array.isArray(N.value)?N.value:[N.value];for(let H=0,q=U.length;H<q;H++){const Z=U[H],ie=_(Z),Q=C%P,te=Q%ie.boundary,ne=Q+te;C+=te,ne!==0&&P-ne<ie.storage&&(C+=P-ne),N.__data=new Float32Array(ie.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=C,C+=ie.storage}}}const g=C%P;return g>0&&(C+=P-g),E.__size=C,E.__cache={},this}function _(E){const T={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(T.boundary=4,T.storage=4):E.isVector2?(T.boundary=8,T.storage=8):E.isVector3||E.isColor?(T.boundary=16,T.storage=12):E.isVector4?(T.boundary=16,T.storage=16):E.isMatrix3?(T.boundary=48,T.storage=48):E.isMatrix4?(T.boundary=64,T.storage=64):E.isTexture?Ze("WebGLRenderer: Texture samplers can not be part of an uniforms group."):Ze("WebGLRenderer: Unsupported uniform value type.",E),T}function x(E){const T=E.target;T.removeEventListener("dispose",x);const C=o.indexOf(T.__bindingPointIndex);o.splice(C,1),n.deleteBuffer(s[T.id]),delete s[T.id],delete r[T.id]}function m(){for(const E in s)n.deleteBuffer(s[E]);o=[],s={},r={}}return{bind:l,update:c,dispose:m}}const Ag=new Uint16Array([11481,15204,11534,15171,11808,15015,12385,14843,12894,14716,13396,14600,13693,14483,13976,14366,14237,14171,14405,13961,14511,13770,14605,13598,14687,13444,14760,13305,14822,13066,14876,12857,14923,12675,14963,12517,14997,12379,15025,12230,15049,12023,15070,11843,15086,11687,15100,11551,15111,11433,15120,11330,15127,11217,15132,11060,15135,10922,15138,10801,15139,10695,15139,10600,13012,14923,13020,14917,13064,14886,13176,14800,13349,14666,13513,14526,13724,14398,13960,14230,14200,14020,14383,13827,14488,13651,14583,13491,14667,13348,14740,13132,14803,12908,14856,12713,14901,12542,14938,12394,14968,12241,14992,12017,15010,11822,15024,11654,15034,11507,15041,11380,15044,11269,15044,11081,15042,10913,15037,10764,15031,10635,15023,10520,15014,10419,15003,10330,13657,14676,13658,14673,13670,14660,13698,14622,13750,14547,13834,14442,13956,14317,14112,14093,14291,13889,14407,13704,14499,13538,14586,13389,14664,13201,14733,12966,14792,12758,14842,12577,14882,12418,14915,12272,14940,12033,14959,11826,14972,11646,14980,11490,14983,11355,14983,11212,14979,11008,14971,10830,14961,10675,14950,10540,14936,10420,14923,10315,14909,10204,14894,10041,14089,14460,14090,14459,14096,14452,14112,14431,14141,14388,14186,14305,14252,14130,14341,13941,14399,13756,14467,13585,14539,13430,14610,13272,14677,13026,14737,12808,14790,12617,14833,12449,14869,12303,14896,12065,14916,11845,14929,11655,14937,11490,14939,11347,14936,11184,14930,10970,14921,10783,14912,10621,14900,10480,14885,10356,14867,10247,14848,10062,14827,9894,14805,9745,14400,14208,14400,14206,14402,14198,14406,14174,14415,14122,14427,14035,14444,13913,14469,13767,14504,13613,14548,13463,14598,13324,14651,13082,14704,12858,14752,12658,14795,12483,14831,12330,14860,12106,14881,11875,14895,11675,14903,11501,14905,11351,14903,11178,14900,10953,14892,10757,14880,10589,14865,10442,14847,10313,14827,10162,14805,9965,14782,9792,14757,9642,14731,9507,14562,13883,14562,13883,14563,13877,14566,13862,14570,13830,14576,13773,14584,13689,14595,13582,14613,13461,14637,13336,14668,13120,14704,12897,14741,12695,14776,12516,14808,12358,14835,12150,14856,11910,14870,11701,14878,11519,14882,11361,14884,11187,14880,10951,14871,10748,14858,10572,14842,10418,14823,10286,14801,10099,14777,9897,14751,9722,14725,9567,14696,9430,14666,9309,14702,13604,14702,13604,14702,13600,14703,13591,14705,13570,14707,13533,14709,13477,14712,13400,14718,13305,14727,13106,14743,12907,14762,12716,14784,12539,14807,12380,14827,12190,14844,11943,14855,11727,14863,11539,14870,11376,14871,11204,14868,10960,14858,10748,14845,10565,14829,10406,14809,10269,14786,10058,14761,9852,14734,9671,14705,9512,14674,9374,14641,9253,14608,9076,14821,13366,14821,13365,14821,13364,14821,13358,14821,13344,14821,13320,14819,13252,14817,13145,14815,13011,14814,12858,14817,12698,14823,12539,14832,12389,14841,12214,14850,11968,14856,11750,14861,11558,14866,11390,14867,11226,14862,10972,14853,10754,14840,10565,14823,10401,14803,10259,14780,10032,14754,9820,14725,9635,14694,9473,14661,9333,14627,9203,14593,8988,14557,8798,14923,13014,14922,13014,14922,13012,14922,13004,14920,12987,14919,12957,14915,12907,14909,12834,14902,12738,14894,12623,14888,12498,14883,12370,14880,12203,14878,11970,14875,11759,14873,11569,14874,11401,14872,11243,14865,10986,14855,10762,14842,10568,14825,10401,14804,10255,14781,10017,14754,9799,14725,9611,14692,9445,14658,9301,14623,9139,14587,8920,14548,8729,14509,8562,15008,12672,15008,12672,15008,12671,15007,12667,15005,12656,15001,12637,14997,12605,14989,12556,14978,12490,14966,12407,14953,12313,14940,12136,14927,11934,14914,11742,14903,11563,14896,11401,14889,11247,14879,10992,14866,10767,14851,10570,14833,10400,14812,10252,14789,10007,14761,9784,14731,9592,14698,9424,14663,9279,14627,9088,14588,8868,14548,8676,14508,8508,14467,8360,15080,12386,15080,12386,15079,12385,15078,12383,15076,12378,15072,12367,15066,12347,15057,12315,15045,12253,15030,12138,15012,11998,14993,11845,14972,11685,14951,11530,14935,11383,14920,11228,14904,10981,14887,10762,14870,10567,14850,10397,14827,10248,14803,9997,14774,9771,14743,9578,14710,9407,14674,9259,14637,9048,14596,8826,14555,8632,14514,8464,14471,8317,14427,8182,15139,12008,15139,12008,15138,12008,15137,12007,15135,12003,15130,11990,15124,11969,15115,11929,15102,11872,15086,11794,15064,11693,15041,11581,15013,11459,14987,11336,14966,11170,14944,10944,14921,10738,14898,10552,14875,10387,14850,10239,14824,9983,14794,9758,14762,9563,14728,9392,14692,9244,14653,9014,14611,8791,14569,8597,14526,8427,14481,8281,14436,8110,14391,7885,15188,11617,15188,11617,15187,11617,15186,11618,15183,11617,15179,11612,15173,11601,15163,11581,15150,11546,15133,11495,15110,11427,15083,11346,15051,11246,15024,11057,14996,10868,14967,10687,14938,10517,14911,10362,14882,10206,14853,9956,14821,9737,14787,9543,14752,9375,14715,9228,14675,8980,14632,8760,14589,8565,14544,8395,14498,8248,14451,8049,14404,7824,14357,7630,15228,11298,15228,11298,15227,11299,15226,11301,15223,11303,15219,11302,15213,11299,15204,11290,15191,11271,15174,11217,15150,11129,15119,11015,15087,10886,15057,10744,15024,10599,14990,10455,14957,10318,14924,10143,14891,9911,14856,9701,14820,9516,14782,9352,14744,9200,14703,8946,14659,8725,14615,8533,14568,8366,14521,8220,14472,7992,14423,7770,14374,7578,14315,7408,15260,10819,15260,10819,15259,10822,15258,10826,15256,10832,15251,10836,15246,10841,15237,10838,15225,10821,15207,10788,15183,10734,15151,10660,15120,10571,15087,10469,15049,10359,15012,10249,14974,10041,14937,9837,14900,9647,14860,9475,14820,9320,14779,9147,14736,8902,14691,8688,14646,8499,14598,8335,14549,8189,14499,7940,14448,7720,14397,7529,14347,7363,14256,7218,15285,10410,15285,10411,15285,10413,15284,10418,15282,10425,15278,10434,15272,10442,15264,10449,15252,10445,15235,10433,15210,10403,15179,10358,15149,10301,15113,10218,15073,10059,15033,9894,14991,9726,14951,9565,14909,9413,14865,9273,14822,9073,14777,8845,14730,8641,14682,8459,14633,8300,14583,8129,14531,7883,14479,7670,14426,7482,14373,7321,14305,7176,14201,6939,15305,9939,15305,9940,15305,9945,15304,9955,15302,9967,15298,9989,15293,10010,15286,10033,15274,10044,15258,10045,15233,10022,15205,9975,15174,9903,15136,9808,15095,9697,15053,9578,15009,9451,14965,9327,14918,9198,14871,8973,14825,8766,14775,8579,14725,8408,14675,8259,14622,8058,14569,7821,14515,7615,14460,7435,14405,7276,14350,7108,14256,6866,14149,6653,15321,9444,15321,9445,15321,9448,15320,9458,15317,9470,15314,9490,15310,9515,15302,9540,15292,9562,15276,9579,15251,9577,15226,9559,15195,9519,15156,9463,15116,9389,15071,9304,15025,9208,14978,9023,14927,8838,14878,8661,14827,8496,14774,8344,14722,8206,14667,7973,14612,7749,14556,7555,14499,7382,14443,7229,14385,7025,14322,6791,14210,6588,14100,6409,15333,8920,15333,8921,15332,8927,15332,8943,15329,8965,15326,9002,15322,9048,15316,9106,15307,9162,15291,9204,15267,9221,15244,9221,15212,9196,15175,9134,15133,9043,15088,8930,15040,8801,14990,8665,14938,8526,14886,8391,14830,8261,14775,8087,14719,7866,14661,7664,14603,7482,14544,7322,14485,7178,14426,6936,14367,6713,14281,6517,14166,6348,14054,6198,15341,8360,15341,8361,15341,8366,15341,8379,15339,8399,15336,8431,15332,8473,15326,8527,15318,8585,15302,8632,15281,8670,15258,8690,15227,8690,15191,8664,15149,8612,15104,8543,15055,8456,15001,8360,14948,8259,14892,8122,14834,7923,14776,7734,14716,7558,14656,7397,14595,7250,14534,7070,14472,6835,14410,6628,14350,6443,14243,6283,14125,6135,14010,5889,15348,7715,15348,7717,15348,7725,15347,7745,15345,7780,15343,7836,15339,7905,15334,8e3,15326,8103,15310,8193,15293,8239,15270,8270,15240,8287,15204,8283,15163,8260,15118,8223,15067,8143,15014,8014,14958,7873,14899,7723,14839,7573,14778,7430,14715,7293,14652,7164,14588,6931,14524,6720,14460,6531,14396,6362,14330,6210,14207,6015,14086,5781,13969,5576,15352,7114,15352,7116,15352,7128,15352,7159,15350,7195,15348,7237,15345,7299,15340,7374,15332,7457,15317,7544,15301,7633,15280,7703,15251,7754,15216,7775,15176,7767,15131,7733,15079,7670,15026,7588,14967,7492,14906,7387,14844,7278,14779,7171,14714,6965,14648,6770,14581,6587,14515,6420,14448,6269,14382,6123,14299,5881,14172,5665,14049,5477,13929,5310,15355,6329,15355,6330,15355,6339,15355,6362,15353,6410,15351,6472,15349,6572,15344,6688,15337,6835,15323,6985,15309,7142,15287,7220,15260,7277,15226,7310,15188,7326,15142,7318,15090,7285,15036,7239,14976,7177,14914,7045,14849,6892,14782,6736,14714,6581,14645,6433,14576,6293,14506,6164,14438,5946,14369,5733,14270,5540,14140,5369,14014,5216,13892,5043,15357,5483,15357,5484,15357,5496,15357,5528,15356,5597,15354,5692,15351,5835,15347,6011,15339,6195,15328,6317,15314,6446,15293,6566,15268,6668,15235,6746,15197,6796,15152,6811,15101,6790,15046,6748,14985,6673,14921,6583,14854,6479,14785,6371,14714,6259,14643,6149,14571,5946,14499,5750,14428,5567,14358,5401,14242,5250,14109,5111,13980,4870,13856,4657,15359,4555,15359,4557,15358,4573,15358,4633,15357,4715,15355,4841,15353,5061,15349,5216,15342,5391,15331,5577,15318,5770,15299,5967,15274,6150,15243,6223,15206,6280,15161,6310,15111,6317,15055,6300,14994,6262,14928,6208,14860,6141,14788,5994,14715,5838,14641,5684,14566,5529,14492,5384,14418,5247,14346,5121,14216,4892,14079,4682,13948,4496,13822,4330,15359,3498,15359,3501,15359,3520,15359,3598,15358,3719,15356,3860,15355,4137,15351,4305,15344,4563,15334,4809,15321,5116,15303,5273,15280,5418,15250,5547,15214,5653,15170,5722,15120,5761,15064,5763,15002,5733,14935,5673,14865,5597,14792,5504,14716,5400,14640,5294,14563,5185,14486,5041,14410,4841,14335,4655,14191,4482,14051,4325,13918,4183,13790,4012,15360,2282,15360,2285,15360,2306,15360,2401,15359,2547,15357,2748,15355,3103,15352,3349,15345,3675,15336,4020,15324,4272,15307,4496,15285,4716,15255,4908,15220,5086,15178,5170,15128,5214,15072,5234,15010,5231,14943,5206,14871,5166,14796,5102,14718,4971,14639,4833,14559,4687,14480,4541,14402,4401,14315,4268,14167,4142,14025,3958,13888,3747,13759,3556,15360,923,15360,925,15360,946,15360,1052,15359,1214,15357,1494,15356,1892,15352,2274,15346,2663,15338,3099,15326,3393,15309,3679,15288,3980,15260,4183,15226,4325,15185,4437,15136,4517,15080,4570,15018,4591,14950,4581,14877,4545,14800,4485,14720,4411,14638,4325,14556,4231,14475,4136,14395,3988,14297,3803,14145,3628,13999,3465,13861,3314,13729,3177,15360,263,15360,264,15360,272,15360,325,15359,407,15358,548,15356,780,15352,1144,15347,1580,15339,2099,15328,2425,15312,2795,15292,3133,15264,3329,15232,3517,15191,3689,15143,3819,15088,3923,15025,3978,14956,3999,14882,3979,14804,3931,14722,3855,14639,3756,14554,3645,14470,3529,14388,3409,14279,3289,14124,3173,13975,3055,13834,2848,13701,2658,15360,49,15360,49,15360,52,15360,75,15359,111,15358,201,15356,283,15353,519,15348,726,15340,1045,15329,1415,15314,1795,15295,2173,15269,2410,15237,2649,15197,2866,15150,3054,15095,3140,15032,3196,14963,3228,14888,3236,14808,3224,14725,3191,14639,3146,14553,3088,14466,2976,14382,2836,14262,2692,14103,2549,13952,2409,13808,2278,13674,2154,15360,4,15360,4,15360,4,15360,13,15359,33,15358,59,15357,112,15353,199,15348,302,15341,456,15331,628,15316,827,15297,1082,15272,1332,15241,1601,15202,1851,15156,2069,15101,2172,15039,2256,14970,2314,14894,2348,14813,2358,14728,2344,14640,2311,14551,2263,14463,2203,14376,2133,14247,2059,14084,1915,13930,1761,13784,1609,13648,1464,15360,0,15360,0,15360,0,15360,3,15359,18,15358,26,15357,53,15354,80,15348,97,15341,165,15332,238,15318,326,15299,427,15275,529,15245,654,15207,771,15161,885,15108,994,15046,1089,14976,1170,14900,1229,14817,1266,14731,1284,14641,1282,14550,1260,14460,1223,14370,1174,14232,1116,14066,1050,13909,981,13761,910,13623,839]);let bi=null;function Rg(){return bi===null&&(bi=new rd(Ag,32,32,kc,ar),bi.minFilter=Hn,bi.magFilter=Hn,bi.wrapS=Ai,bi.wrapT=Ai,bi.generateMipmaps=!1,bi.needsUpdate=!0),bi}class Cg{constructor(e={}){const{canvas:t=Qf(),context:i=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let h;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");h=i.getContextAttributes().alpha}else h=o;const p=new Set([Vc,Bc,zc]),_=new Set([ui,_s,Ar,Rr,Fc,Nc]),x=new Uint32Array(4),m=new Int32Array(4);let E=null,T=null;const C=[],P=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Xi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const g=this;let R=!1;this._outputColorSpace=Mn;let D=0,v=0,b=null,A=-1,N=null;const U=new St,H=new St;let q=null;const Z=new ot(0);let ie=0,Q=t.width,te=t.height,ne=1,fe=null,Pe=null;const ze=new St(0,0,Q,te),Je=new St(0,0,Q,te);let ft=!1;const re=new $c;let oe=!1,Ee=!1;const We=new vt,Ie=new B,it=new St,Bt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Qe=!1;function Et(){return b===null?ne:1}let O=i;function st(w,V){return t.getContext(w,V)}try{const w={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Ic}`),t.addEventListener("webglcontextlost",ue,!1),t.addEventListener("webglcontextrestored",ae,!1),t.addEventListener("webglcontextcreationerror",we,!1),O===null){const V="webgl2";if(O=st(V,w),O===null)throw st(V)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw w("WebGLRenderer: "+w.message),w}let nt,gt,Re,Ct,Fe,Ve,I,S,$,se,ce,ee,De,_e,Ne,Le,le,pe,$e,ke,Me,qe,z,ge;function K(){nt=new Om(O),nt.init(),qe=new vg(O,nt),gt=new Rm(O,nt,e,qe),Re=new gg(O,nt),gt.reversedDepthBuffer&&f&&Re.buffers.depth.setReversed(!0),Ct=new Bm(O),Fe=new sg,Ve=new _g(O,nt,Re,Fe,gt,qe,Ct),I=new Pm(g),S=new Nm(g),$=new Wh(O),z=new Tm(O,$),se=new zm(O,$,Ct,z),ce=new Gm(O,se,$,Ct),$e=new Vm(O,gt,Ve),Le=new Cm(Fe),ee=new ig(g,I,S,nt,gt,z,Le),De=new wg(g,Fe),_e=new ag,Ne=new fg(nt),pe=new wm(g,I,S,Re,ce,h,l),le=new mg(g,ce,gt),ge=new Tg(O,Ct,gt,Re),ke=new Am(O,nt,Ct),Me=new km(O,nt,Ct),Ct.programs=ee.programs,g.capabilities=gt,g.extensions=nt,g.properties=Fe,g.renderLists=_e,g.shadowMap=le,g.state=Re,g.info=Ct}K();const xe=new Sg(g,O);this.xr=xe,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){const w=nt.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=nt.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return ne},this.setPixelRatio=function(w){w!==void 0&&(ne=w,this.setSize(Q,te,!1))},this.getSize=function(w){return w.set(Q,te)},this.setSize=function(w,V,j=!0){if(xe.isPresenting){Ze("WebGLRenderer: Can't change size while VR device is presenting.");return}Q=w,te=V,t.width=Math.floor(w*ne),t.height=Math.floor(V*ne),j===!0&&(t.style.width=w+"px",t.style.height=V+"px"),this.setViewport(0,0,w,V)},this.getDrawingBufferSize=function(w){return w.set(Q*ne,te*ne).floor()},this.setDrawingBufferSize=function(w,V,j){Q=w,te=V,ne=j,t.width=Math.floor(w*j),t.height=Math.floor(V*j),this.setViewport(0,0,w,V)},this.getCurrentViewport=function(w){return w.copy(U)},this.getViewport=function(w){return w.copy(ze)},this.setViewport=function(w,V,j,Y){w.isVector4?ze.set(w.x,w.y,w.z,w.w):ze.set(w,V,j,Y),Re.viewport(U.copy(ze).multiplyScalar(ne).round())},this.getScissor=function(w){return w.copy(Je)},this.setScissor=function(w,V,j,Y){w.isVector4?Je.set(w.x,w.y,w.z,w.w):Je.set(w,V,j,Y),Re.scissor(H.copy(Je).multiplyScalar(ne).round())},this.getScissorTest=function(){return ft},this.setScissorTest=function(w){Re.setScissorTest(ft=w)},this.setOpaqueSort=function(w){fe=w},this.setTransparentSort=function(w){Pe=w},this.getClearColor=function(w){return w.copy(pe.getClearColor())},this.setClearColor=function(){pe.setClearColor(...arguments)},this.getClearAlpha=function(){return pe.getClearAlpha()},this.setClearAlpha=function(){pe.setClearAlpha(...arguments)},this.clear=function(w=!0,V=!0,j=!0){let Y=0;if(w){let G=!1;if(b!==null){const he=b.texture.format;G=p.has(he)}if(G){const he=b.texture.type,be=_.has(he),Se=pe.getClearColor(),de=pe.getClearAlpha(),He=Se.r,Xe=Se.g,Oe=Se.b;be?(x[0]=He,x[1]=Xe,x[2]=Oe,x[3]=de,O.clearBufferuiv(O.COLOR,0,x)):(m[0]=He,m[1]=Xe,m[2]=Oe,m[3]=de,O.clearBufferiv(O.COLOR,0,m))}else Y|=O.COLOR_BUFFER_BIT}V&&(Y|=O.DEPTH_BUFFER_BIT),j&&(Y|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),O.clear(Y)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ue,!1),t.removeEventListener("webglcontextrestored",ae,!1),t.removeEventListener("webglcontextcreationerror",we,!1),pe.dispose(),_e.dispose(),Ne.dispose(),Fe.dispose(),I.dispose(),S.dispose(),ce.dispose(),z.dispose(),ge.dispose(),ee.dispose(),xe.dispose(),xe.removeEventListener("sessionstart",Ts),xe.removeEventListener("sessionend",As),Pt.stop()};function ue(w){w.preventDefault(),bl("WebGLRenderer: Context Lost."),R=!0}function ae(){bl("WebGLRenderer: Context Restored."),R=!1;const w=Ct.autoReset,V=le.enabled,j=le.autoUpdate,Y=le.needsUpdate,G=le.type;K(),Ct.autoReset=w,le.enabled=V,le.autoUpdate=j,le.needsUpdate=Y,le.type=G}function we(w){Ot("WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function je(w){const V=w.target;V.removeEventListener("dispose",je),yt(V)}function yt(w){xt(w),Fe.remove(w)}function xt(w){const V=Fe.get(w).programs;V!==void 0&&(V.forEach(function(j){ee.releaseProgram(j)}),w.isShaderMaterial&&ee.releaseShaderCache(w))}this.renderBufferDirect=function(w,V,j,Y,G,he){V===null&&(V=Bt);const be=G.isMesh&&G.matrixWorld.determinant()<0,Se=En(w,V,j,Y,G);Re.setMaterial(Y,be);let de=j.index,He=1;if(Y.wireframe===!0){if(de=se.getWireframeAttribute(j),de===void 0)return;He=2}const Xe=j.drawRange,Oe=j.attributes.position;let Ke=Xe.start*He,ct=(Xe.start+Xe.count)*He;he!==null&&(Ke=Math.max(Ke,he.start*He),ct=Math.min(ct,(he.start+he.count)*He)),de!==null?(Ke=Math.max(Ke,0),ct=Math.min(ct,de.count)):Oe!=null&&(Ke=Math.max(Ke,0),ct=Math.min(ct,Oe.count));const Te=ct-Ke;if(Te<0||Te===1/0)return;z.setup(G,Y,Se,j,de);let Dt,_t=ke;if(de!==null&&(Dt=$.get(de),_t=Me,_t.setIndex(Dt)),G.isMesh)Y.wireframe===!0?(Re.setLineWidth(Y.wireframeLinewidth*Et()),_t.setMode(O.LINES)):_t.setMode(O.TRIANGLES);else if(G.isLine){let Be=Y.linewidth;Be===void 0&&(Be=1),Re.setLineWidth(Be*Et()),G.isLineSegments?_t.setMode(O.LINES):G.isLineLoop?_t.setMode(O.LINE_LOOP):_t.setMode(O.LINE_STRIP)}else G.isPoints?_t.setMode(O.POINTS):G.isSprite&&_t.setMode(O.TRIANGLES);if(G.isBatchedMesh)if(G._multiDrawInstances!==null)Lr("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),_t.renderMultiDrawInstances(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount,G._multiDrawInstances);else if(nt.get("WEBGL_multi_draw"))_t.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else{const Be=G._multiDrawStarts,Rt=G._multiDrawCounts,lt=G._multiDrawCount,vn=de?$.get(de).bytesPerElement:1,bn=Fe.get(Y).currentProgram.getUniforms();for(let kt=0;kt<lt;kt++)bn.setValue(O,"_gl_DrawID",kt),_t.render(Be[kt]/vn,Rt[kt])}else if(G.isInstancedMesh)_t.renderInstances(Ke,Te,G.count);else if(j.isInstancedBufferGeometry){const Be=j._maxInstanceCount!==void 0?j._maxInstanceCount:1/0,Rt=Math.min(j.instanceCount,Be);_t.renderInstances(Ke,Te,Rt)}else _t.render(Ke,Te)};function mn(w,V,j){w.transparent===!0&&w.side===Gn&&w.forceSinglePass===!1?(w.side=Pn,w.needsUpdate=!0,Sn(w,V,j),w.side=ts,w.needsUpdate=!0,Sn(w,V,j),w.side=Gn):Sn(w,V,j)}this.compile=function(w,V,j=null){j===null&&(j=w),T=Ne.get(j),T.init(V),P.push(T),j.traverseVisible(function(G){G.isLight&&G.layers.test(V.layers)&&(T.pushLight(G),G.castShadow&&T.pushShadow(G))}),w!==j&&w.traverseVisible(function(G){G.isLight&&G.layers.test(V.layers)&&(T.pushLight(G),G.castShadow&&T.pushShadow(G))}),T.setupLights();const Y=new Set;return w.traverse(function(G){if(!(G.isMesh||G.isPoints||G.isLine||G.isSprite))return;const he=G.material;if(he)if(Array.isArray(he))for(let be=0;be<he.length;be++){const Se=he[be];mn(Se,j,G),Y.add(Se)}else mn(he,j,G),Y.add(he)}),T=P.pop(),Y},this.compileAsync=function(w,V,j=null){const Y=this.compile(w,V,j);return new Promise(G=>{function he(){if(Y.forEach(function(be){Fe.get(be).currentProgram.isReady()&&Y.delete(be)}),Y.size===0){G(w);return}setTimeout(he,10)}nt.get("KHR_parallel_shader_compile")!==null?he():setTimeout(he,10)})};let on=null;function di(w){on&&on(w)}function Ts(){Pt.stop()}function As(){Pt.start()}const Pt=new dd;Pt.setAnimationLoop(di),typeof self<"u"&&Pt.setContext(self),this.setAnimationLoop=function(w){on=w,xe.setAnimationLoop(w),w===null?Pt.stop():Pt.start()},xe.addEventListener("sessionstart",Ts),xe.addEventListener("sessionend",As),this.render=function(w,V){if(V!==void 0&&V.isCamera!==!0){Ot("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),V.parent===null&&V.matrixWorldAutoUpdate===!0&&V.updateMatrixWorld(),xe.enabled===!0&&xe.isPresenting===!0&&(xe.cameraAutoUpdate===!0&&xe.updateCamera(V),V=xe.getCamera()),w.isScene===!0&&w.onBeforeRender(g,w,V,b),T=Ne.get(w,P.length),T.init(V),P.push(T),We.multiplyMatrices(V.projectionMatrix,V.matrixWorldInverse),re.setFromProjectionMatrix(We,li,V.reversedDepth),Ee=this.localClippingEnabled,oe=Le.init(this.clippingPlanes,Ee),E=_e.get(w,C.length),E.init(),C.push(E),xe.enabled===!0&&xe.isPresenting===!0){const he=g.xr.getDepthSensingMesh();he!==null&&$n(he,V,-1/0,g.sortObjects)}$n(w,V,0,g.sortObjects),E.finish(),g.sortObjects===!0&&E.sort(fe,Pe),Qe=xe.enabled===!1||xe.isPresenting===!1||xe.hasDepthSensing()===!1,Qe&&pe.addToRenderList(E,w),this.info.render.frame++,oe===!0&&Le.beginShadows();const j=T.state.shadowsArray;le.render(j,w,V),oe===!0&&Le.endShadows(),this.info.autoReset===!0&&this.info.reset();const Y=E.opaque,G=E.transmissive;if(T.setupLights(),V.isArrayCamera){const he=V.cameras;if(G.length>0)for(let be=0,Se=he.length;be<Se;be++){const de=he[be];Ht(Y,G,w,de)}Qe&&pe.render(w);for(let be=0,Se=he.length;be<Se;be++){const de=he[be];xn(E,w,de,de.viewport)}}else G.length>0&&Ht(Y,G,w,V),Qe&&pe.render(w),xn(E,w,V);b!==null&&v===0&&(Ve.updateMultisampleRenderTarget(b),Ve.updateRenderTargetMipmap(b)),w.isScene===!0&&w.onAfterRender(g,w,V),z.resetDefaultState(),A=-1,N=null,P.pop(),P.length>0?(T=P[P.length-1],oe===!0&&Le.setGlobalState(g.clippingPlanes,T.state.camera)):T=null,C.pop(),C.length>0?E=C[C.length-1]:E=null};function $n(w,V,j,Y){if(w.visible===!1)return;if(w.layers.test(V.layers)){if(w.isGroup)j=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(V);else if(w.isLight)T.pushLight(w),w.castShadow&&T.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||re.intersectsSprite(w)){Y&&it.setFromMatrixPosition(w.matrixWorld).applyMatrix4(We);const be=ce.update(w),Se=w.material;Se.visible&&E.push(w,be,Se,j,it.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||re.intersectsObject(w))){const be=ce.update(w),Se=w.material;if(Y&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),it.copy(w.boundingSphere.center)):(be.boundingSphere===null&&be.computeBoundingSphere(),it.copy(be.boundingSphere.center)),it.applyMatrix4(w.matrixWorld).applyMatrix4(We)),Array.isArray(Se)){const de=be.groups;for(let He=0,Xe=de.length;He<Xe;He++){const Oe=de[He],Ke=Se[Oe.materialIndex];Ke&&Ke.visible&&E.push(w,be,Ke,j,it.z,Oe)}}else Se.visible&&E.push(w,be,Se,j,it.z,null)}}const he=w.children;for(let be=0,Se=he.length;be<Se;be++)$n(he[be],V,j,Y)}function xn(w,V,j,Y){const{opaque:G,transmissive:he,transparent:be}=w;T.setupLightsView(j),oe===!0&&Le.setGlobalState(g.clippingPlanes,j),Y&&Re.viewport(U.copy(Y)),G.length>0&&gn(G,V,j),he.length>0&&gn(he,V,j),be.length>0&&gn(be,V,j),Re.buffers.depth.setTest(!0),Re.buffers.depth.setMask(!0),Re.buffers.color.setMask(!0),Re.setPolygonOffset(!1)}function Ht(w,V,j,Y){if((j.isScene===!0?j.overrideMaterial:null)!==null)return;T.state.transmissionRenderTarget[Y.id]===void 0&&(T.state.transmissionRenderTarget[Y.id]=new vs(1,1,{generateMipmaps:!0,type:nt.has("EXT_color_buffer_half_float")||nt.has("EXT_color_buffer_float")?ar:ui,minFilter:gs,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:mt.workingColorSpace}));const he=T.state.transmissionRenderTarget[Y.id],be=Y.viewport||U;he.setSize(be.z*g.transmissionResolutionScale,be.w*g.transmissionResolutionScale);const Se=g.getRenderTarget(),de=g.getActiveCubeFace(),He=g.getActiveMipmapLevel();g.setRenderTarget(he),g.getClearColor(Z),ie=g.getClearAlpha(),ie<1&&g.setClearColor(16777215,.5),g.clear(),Qe&&pe.render(j);const Xe=g.toneMapping;g.toneMapping=Xi;const Oe=Y.viewport;if(Y.viewport!==void 0&&(Y.viewport=void 0),T.setupLightsView(Y),oe===!0&&Le.setGlobalState(g.clippingPlanes,Y),gn(w,j,Y),Ve.updateMultisampleRenderTarget(he),Ve.updateRenderTargetMipmap(he),nt.has("WEBGL_multisampled_render_to_texture")===!1){let Ke=!1;for(let ct=0,Te=V.length;ct<Te;ct++){const Dt=V[ct],{object:_t,geometry:Be,material:Rt,group:lt}=Dt;if(Rt.side===Gn&&_t.layers.test(Y.layers)){const vn=Rt.side;Rt.side=Pn,Rt.needsUpdate=!0,fi(_t,j,Y,Be,Rt,lt),Rt.side=vn,Rt.needsUpdate=!0,Ke=!0}}Ke===!0&&(Ve.updateMultisampleRenderTarget(he),Ve.updateRenderTargetMipmap(he))}g.setRenderTarget(Se,de,He),g.setClearColor(Z,ie),Oe!==void 0&&(Y.viewport=Oe),g.toneMapping=Xe}function gn(w,V,j){const Y=V.isScene===!0?V.overrideMaterial:null;for(let G=0,he=w.length;G<he;G++){const be=w[G],{object:Se,geometry:de,group:He}=be;let Xe=be.material;Xe.allowOverride===!0&&Y!==null&&(Xe=Y),Se.layers.test(j.layers)&&fi(Se,V,j,de,Xe,He)}}function fi(w,V,j,Y,G,he){w.onBeforeRender(g,V,j,Y,G,he),w.modelViewMatrix.multiplyMatrices(j.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),G.onBeforeRender(g,V,j,Y,w,he),G.transparent===!0&&G.side===Gn&&G.forceSinglePass===!1?(G.side=Pn,G.needsUpdate=!0,g.renderBufferDirect(j,V,Y,G,w,he),G.side=ts,G.needsUpdate=!0,g.renderBufferDirect(j,V,Y,G,w,he),G.side=Gn):g.renderBufferDirect(j,V,Y,G,w,he),w.onAfterRender(g,V,j,Y,G,he)}function Sn(w,V,j){V.isScene!==!0&&(V=Bt);const Y=Fe.get(w),G=T.state.lights,he=T.state.shadowsArray,be=G.state.version,Se=ee.getParameters(w,G.state,he,V,j),de=ee.getProgramCacheKey(Se);let He=Y.programs;Y.environment=w.isMeshStandardMaterial?V.environment:null,Y.fog=V.fog,Y.envMap=(w.isMeshStandardMaterial?S:I).get(w.envMap||Y.environment),Y.envMapRotation=Y.environment!==null&&w.envMap===null?V.environmentRotation:w.envMapRotation,He===void 0&&(w.addEventListener("dispose",je),He=new Map,Y.programs=He);let Xe=He.get(de);if(Xe!==void 0){if(Y.currentProgram===Xe&&Y.lightsStateVersion===be)return Rs(w,Se),Xe}else Se.uniforms=ee.getUniforms(w),w.onBeforeCompile(Se,g),Xe=ee.acquireProgram(Se,de),He.set(de,Xe),Y.uniforms=Se.uniforms;const Oe=Y.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Oe.clippingPlanes=Le.uniform),Rs(w,Se),Y.needsLights=ur(w),Y.lightsStateVersion=be,Y.needsLights&&(Oe.ambientLightColor.value=G.state.ambient,Oe.lightProbe.value=G.state.probe,Oe.directionalLights.value=G.state.directional,Oe.directionalLightShadows.value=G.state.directionalShadow,Oe.spotLights.value=G.state.spot,Oe.spotLightShadows.value=G.state.spotShadow,Oe.rectAreaLights.value=G.state.rectArea,Oe.ltc_1.value=G.state.rectAreaLTC1,Oe.ltc_2.value=G.state.rectAreaLTC2,Oe.pointLights.value=G.state.point,Oe.pointLightShadows.value=G.state.pointShadow,Oe.hemisphereLights.value=G.state.hemi,Oe.directionalShadowMap.value=G.state.directionalShadowMap,Oe.directionalShadowMatrix.value=G.state.directionalShadowMatrix,Oe.spotShadowMap.value=G.state.spotShadowMap,Oe.spotLightMatrix.value=G.state.spotLightMatrix,Oe.spotLightMap.value=G.state.spotLightMap,Oe.pointShadowMap.value=G.state.pointShadowMap,Oe.pointShadowMatrix.value=G.state.pointShadowMatrix),Y.currentProgram=Xe,Y.uniformsList=null,Xe}function Ut(w){if(w.uniformsList===null){const V=w.currentProgram.getUniforms();w.uniformsList=_a.seqWithValue(V.seq,w.uniforms)}return w.uniformsList}function Rs(w,V){const j=Fe.get(w);j.outputColorSpace=V.outputColorSpace,j.batching=V.batching,j.batchingColor=V.batchingColor,j.instancing=V.instancing,j.instancingColor=V.instancingColor,j.instancingMorph=V.instancingMorph,j.skinning=V.skinning,j.morphTargets=V.morphTargets,j.morphNormals=V.morphNormals,j.morphColors=V.morphColors,j.morphTargetsCount=V.morphTargetsCount,j.numClippingPlanes=V.numClippingPlanes,j.numIntersection=V.numClipIntersection,j.vertexAlphas=V.vertexAlphas,j.vertexTangents=V.vertexTangents,j.toneMapping=V.toneMapping}function En(w,V,j,Y,G){V.isScene!==!0&&(V=Bt),Ve.resetTextureUnits();const he=V.fog,be=Y.isMeshStandardMaterial?V.environment:null,Se=b===null?g.outputColorSpace:b.isXRRenderTarget===!0?b.texture.colorSpace:nr,de=(Y.isMeshStandardMaterial?S:I).get(Y.envMap||be),He=Y.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,Xe=!!j.attributes.tangent&&(!!Y.normalMap||Y.anisotropy>0),Oe=!!j.morphAttributes.position,Ke=!!j.morphAttributes.normal,ct=!!j.morphAttributes.color;let Te=Xi;Y.toneMapped&&(b===null||b.isXRRenderTarget===!0)&&(Te=g.toneMapping);const Dt=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,_t=Dt!==void 0?Dt.length:0,Be=Fe.get(Y),Rt=T.state.lights;if(oe===!0&&(Ee===!0||w!==N)){const nn=w===N&&Y.id===A;Le.setState(Y,w,nn)}let lt=!1;Y.version===Be.__version?(Be.needsLights&&Be.lightsStateVersion!==Rt.state.version||Be.outputColorSpace!==Se||G.isBatchedMesh&&Be.batching===!1||!G.isBatchedMesh&&Be.batching===!0||G.isBatchedMesh&&Be.batchingColor===!0&&G.colorTexture===null||G.isBatchedMesh&&Be.batchingColor===!1&&G.colorTexture!==null||G.isInstancedMesh&&Be.instancing===!1||!G.isInstancedMesh&&Be.instancing===!0||G.isSkinnedMesh&&Be.skinning===!1||!G.isSkinnedMesh&&Be.skinning===!0||G.isInstancedMesh&&Be.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&Be.instancingColor===!1&&G.instanceColor!==null||G.isInstancedMesh&&Be.instancingMorph===!0&&G.morphTexture===null||G.isInstancedMesh&&Be.instancingMorph===!1&&G.morphTexture!==null||Be.envMap!==de||Y.fog===!0&&Be.fog!==he||Be.numClippingPlanes!==void 0&&(Be.numClippingPlanes!==Le.numPlanes||Be.numIntersection!==Le.numIntersection)||Be.vertexAlphas!==He||Be.vertexTangents!==Xe||Be.morphTargets!==Oe||Be.morphNormals!==Ke||Be.morphColors!==ct||Be.toneMapping!==Te||Be.morphTargetsCount!==_t)&&(lt=!0):(lt=!0,Be.__version=Y.version);let vn=Be.currentProgram;lt===!0&&(vn=Sn(Y,V,G));let bn=!1,kt=!1,ss=!1;const Lt=vn.getUniforms(),tn=Be.uniforms;if(Re.useProgram(vn.program)&&(bn=!0,kt=!0,ss=!0),Y.id!==A&&(A=Y.id,kt=!0),bn||N!==w){Re.buffers.depth.getReversed()&&w.reversedDepth!==!0&&(w._reversedDepth=!0,w.updateProjectionMatrix()),Lt.setValue(O,"projectionMatrix",w.projectionMatrix),Lt.setValue(O,"viewMatrix",w.matrixWorldInverse);const Wt=Lt.map.cameraPosition;Wt!==void 0&&Wt.setValue(O,Ie.setFromMatrixPosition(w.matrixWorld)),gt.logarithmicDepthBuffer&&Lt.setValue(O,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(Y.isMeshPhongMaterial||Y.isMeshToonMaterial||Y.isMeshLambertMaterial||Y.isMeshBasicMaterial||Y.isMeshStandardMaterial||Y.isShaderMaterial)&&Lt.setValue(O,"isOrthographic",w.isOrthographicCamera===!0),N!==w&&(N=w,kt=!0,ss=!0)}if(G.isSkinnedMesh){Lt.setOptional(O,G,"bindMatrix"),Lt.setOptional(O,G,"bindMatrixInverse");const nn=G.skeleton;nn&&(nn.boneTexture===null&&nn.computeBoneTexture(),Lt.setValue(O,"boneTexture",nn.boneTexture,Ve))}G.isBatchedMesh&&(Lt.setOptional(O,G,"batchingTexture"),Lt.setValue(O,"batchingTexture",G._matricesTexture,Ve),Lt.setOptional(O,G,"batchingIdTexture"),Lt.setValue(O,"batchingIdTexture",G._indirectTexture,Ve),Lt.setOptional(O,G,"batchingColorTexture"),G._colorsTexture!==null&&Lt.setValue(O,"batchingColorTexture",G._colorsTexture,Ve));const wn=j.morphAttributes;if((wn.position!==void 0||wn.normal!==void 0||wn.color!==void 0)&&$e.update(G,j,vn),(kt||Be.receiveShadow!==G.receiveShadow)&&(Be.receiveShadow=G.receiveShadow,Lt.setValue(O,"receiveShadow",G.receiveShadow)),Y.isMeshGouraudMaterial&&Y.envMap!==null&&(tn.envMap.value=de,tn.flipEnvMap.value=de.isCubeTexture&&de.isRenderTargetTexture===!1?-1:1),Y.isMeshStandardMaterial&&Y.envMap===null&&V.environment!==null&&(tn.envMapIntensity.value=V.environmentIntensity),tn.dfgLUT!==void 0&&(tn.dfgLUT.value=Rg()),kt&&(Lt.setValue(O,"toneMappingExposure",g.toneMappingExposure),Be.needsLights&&_n(tn,ss),he&&Y.fog===!0&&De.refreshFogUniforms(tn,he),De.refreshMaterialUniforms(tn,Y,ne,te,T.state.transmissionRenderTarget[w.id]),_a.upload(O,Ut(Be),tn,Ve)),Y.isShaderMaterial&&Y.uniformsNeedUpdate===!0&&(_a.upload(O,Ut(Be),tn,Ve),Y.uniformsNeedUpdate=!1),Y.isSpriteMaterial&&Lt.setValue(O,"center",G.center),Lt.setValue(O,"modelViewMatrix",G.modelViewMatrix),Lt.setValue(O,"normalMatrix",G.normalMatrix),Lt.setValue(O,"modelMatrix",G.matrixWorld),Y.isShaderMaterial||Y.isRawShaderMaterial){const nn=Y.uniformsGroups;for(let Wt=0,hi=nn.length;Wt<hi;Wt++){const pi=nn[Wt];ge.update(pi,vn),ge.bind(pi,vn)}}return vn}function _n(w,V){w.ambientLightColor.needsUpdate=V,w.lightProbe.needsUpdate=V,w.directionalLights.needsUpdate=V,w.directionalLightShadows.needsUpdate=V,w.pointLights.needsUpdate=V,w.pointLightShadows.needsUpdate=V,w.spotLights.needsUpdate=V,w.spotLightShadows.needsUpdate=V,w.rectAreaLights.needsUpdate=V,w.hemisphereLights.needsUpdate=V}function ur(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return D},this.getActiveMipmapLevel=function(){return v},this.getRenderTarget=function(){return b},this.setRenderTargetTextures=function(w,V,j){const Y=Fe.get(w);Y.__autoAllocateDepthBuffer=w.resolveDepthBuffer===!1,Y.__autoAllocateDepthBuffer===!1&&(Y.__useRenderToTexture=!1),Fe.get(w.texture).__webglTexture=V,Fe.get(w.depthTexture).__webglTexture=Y.__autoAllocateDepthBuffer?void 0:j,Y.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(w,V){const j=Fe.get(w);j.__webglFramebuffer=V,j.__useDefaultFramebuffer=V===void 0};const Ge=O.createFramebuffer();this.setRenderTarget=function(w,V=0,j=0){b=w,D=V,v=j;let Y=!0,G=null,he=!1,be=!1;if(w){const de=Fe.get(w);if(de.__useDefaultFramebuffer!==void 0)Re.bindFramebuffer(O.FRAMEBUFFER,null),Y=!1;else if(de.__webglFramebuffer===void 0)Ve.setupRenderTarget(w);else if(de.__hasExternalTextures)Ve.rebindTextures(w,Fe.get(w.texture).__webglTexture,Fe.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){const Oe=w.depthTexture;if(de.__boundDepthTexture!==Oe){if(Oe!==null&&Fe.has(Oe)&&(w.width!==Oe.image.width||w.height!==Oe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Ve.setupDepthRenderbuffer(w)}}const He=w.texture;(He.isData3DTexture||He.isDataArrayTexture||He.isCompressedArrayTexture)&&(be=!0);const Xe=Fe.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Xe[V])?G=Xe[V][j]:G=Xe[V],he=!0):w.samples>0&&Ve.useMultisampledRTT(w)===!1?G=Fe.get(w).__webglMultisampledFramebuffer:Array.isArray(Xe)?G=Xe[j]:G=Xe,U.copy(w.viewport),H.copy(w.scissor),q=w.scissorTest}else U.copy(ze).multiplyScalar(ne).floor(),H.copy(Je).multiplyScalar(ne).floor(),q=ft;if(j!==0&&(G=Ge),Re.bindFramebuffer(O.FRAMEBUFFER,G)&&Y&&Re.drawBuffers(w,G),Re.viewport(U),Re.scissor(H),Re.setScissorTest(q),he){const de=Fe.get(w.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+V,de.__webglTexture,j)}else if(be){const de=V;for(let He=0;He<w.textures.length;He++){const Xe=Fe.get(w.textures[He]);O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0+He,Xe.__webglTexture,j,de)}}else if(w!==null&&j!==0){const de=Fe.get(w.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,de.__webglTexture,j)}A=-1},this.readRenderTargetPixels=function(w,V,j,Y,G,he,be,Se=0){if(!(w&&w.isWebGLRenderTarget)){Ot("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let de=Fe.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&be!==void 0&&(de=de[be]),de){Re.bindFramebuffer(O.FRAMEBUFFER,de);try{const He=w.textures[Se],Xe=He.format,Oe=He.type;if(!gt.textureFormatReadable(Xe)){Ot("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!gt.textureTypeReadable(Oe)){Ot("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}V>=0&&V<=w.width-Y&&j>=0&&j<=w.height-G&&(w.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+Se),O.readPixels(V,j,Y,G,qe.convert(Xe),qe.convert(Oe),he))}finally{const He=b!==null?Fe.get(b).__webglFramebuffer:null;Re.bindFramebuffer(O.FRAMEBUFFER,He)}}},this.readRenderTargetPixelsAsync=async function(w,V,j,Y,G,he,be,Se=0){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let de=Fe.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&be!==void 0&&(de=de[be]),de)if(V>=0&&V<=w.width-Y&&j>=0&&j<=w.height-G){Re.bindFramebuffer(O.FRAMEBUFFER,de);const He=w.textures[Se],Xe=He.format,Oe=He.type;if(!gt.textureFormatReadable(Xe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!gt.textureTypeReadable(Oe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ke=O.createBuffer();O.bindBuffer(O.PIXEL_PACK_BUFFER,Ke),O.bufferData(O.PIXEL_PACK_BUFFER,he.byteLength,O.STREAM_READ),w.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+Se),O.readPixels(V,j,Y,G,qe.convert(Xe),qe.convert(Oe),0);const ct=b!==null?Fe.get(b).__webglFramebuffer:null;Re.bindFramebuffer(O.FRAMEBUFFER,ct);const Te=O.fenceSync(O.SYNC_GPU_COMMANDS_COMPLETE,0);return O.flush(),await eh(O,Te,4),O.bindBuffer(O.PIXEL_PACK_BUFFER,Ke),O.getBufferSubData(O.PIXEL_PACK_BUFFER,0,he),O.deleteBuffer(Ke),O.deleteSync(Te),he}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(w,V=null,j=0){const Y=Math.pow(2,-j),G=Math.floor(w.image.width*Y),he=Math.floor(w.image.height*Y),be=V!==null?V.x:0,Se=V!==null?V.y:0;Ve.setTexture2D(w,0),O.copyTexSubImage2D(O.TEXTURE_2D,j,0,0,be,Se,G,he),Re.unbindTexture()};const Ln=O.createFramebuffer(),Dn=O.createFramebuffer();this.copyTextureToTexture=function(w,V,j=null,Y=null,G=0,he=null){he===null&&(G!==0?(Lr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),he=G,G=0):he=0);let be,Se,de,He,Xe,Oe,Ke,ct,Te;const Dt=w.isCompressedTexture?w.mipmaps[he]:w.image;if(j!==null)be=j.max.x-j.min.x,Se=j.max.y-j.min.y,de=j.isBox3?j.max.z-j.min.z:1,He=j.min.x,Xe=j.min.y,Oe=j.isBox3?j.min.z:0;else{const wn=Math.pow(2,-G);be=Math.floor(Dt.width*wn),Se=Math.floor(Dt.height*wn),w.isDataArrayTexture?de=Dt.depth:w.isData3DTexture?de=Math.floor(Dt.depth*wn):de=1,He=0,Xe=0,Oe=0}Y!==null?(Ke=Y.x,ct=Y.y,Te=Y.z):(Ke=0,ct=0,Te=0);const _t=qe.convert(V.format),Be=qe.convert(V.type);let Rt;V.isData3DTexture?(Ve.setTexture3D(V,0),Rt=O.TEXTURE_3D):V.isDataArrayTexture||V.isCompressedArrayTexture?(Ve.setTexture2DArray(V,0),Rt=O.TEXTURE_2D_ARRAY):(Ve.setTexture2D(V,0),Rt=O.TEXTURE_2D),O.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,V.flipY),O.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,V.premultiplyAlpha),O.pixelStorei(O.UNPACK_ALIGNMENT,V.unpackAlignment);const lt=O.getParameter(O.UNPACK_ROW_LENGTH),vn=O.getParameter(O.UNPACK_IMAGE_HEIGHT),bn=O.getParameter(O.UNPACK_SKIP_PIXELS),kt=O.getParameter(O.UNPACK_SKIP_ROWS),ss=O.getParameter(O.UNPACK_SKIP_IMAGES);O.pixelStorei(O.UNPACK_ROW_LENGTH,Dt.width),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,Dt.height),O.pixelStorei(O.UNPACK_SKIP_PIXELS,He),O.pixelStorei(O.UNPACK_SKIP_ROWS,Xe),O.pixelStorei(O.UNPACK_SKIP_IMAGES,Oe);const Lt=w.isDataArrayTexture||w.isData3DTexture,tn=V.isDataArrayTexture||V.isData3DTexture;if(w.isDepthTexture){const wn=Fe.get(w),nn=Fe.get(V),Wt=Fe.get(wn.__renderTarget),hi=Fe.get(nn.__renderTarget);Re.bindFramebuffer(O.READ_FRAMEBUFFER,Wt.__webglFramebuffer),Re.bindFramebuffer(O.DRAW_FRAMEBUFFER,hi.__webglFramebuffer);for(let pi=0;pi<de;pi++)Lt&&(O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Fe.get(w).__webglTexture,G,Oe+pi),O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Fe.get(V).__webglTexture,he,Te+pi)),O.blitFramebuffer(He,Xe,be,Se,Ke,ct,be,Se,O.DEPTH_BUFFER_BIT,O.NEAREST);Re.bindFramebuffer(O.READ_FRAMEBUFFER,null),Re.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else if(G!==0||w.isRenderTargetTexture||Fe.has(w)){const wn=Fe.get(w),nn=Fe.get(V);Re.bindFramebuffer(O.READ_FRAMEBUFFER,Ln),Re.bindFramebuffer(O.DRAW_FRAMEBUFFER,Dn);for(let Wt=0;Wt<de;Wt++)Lt?O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,wn.__webglTexture,G,Oe+Wt):O.framebufferTexture2D(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,wn.__webglTexture,G),tn?O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,nn.__webglTexture,he,Te+Wt):O.framebufferTexture2D(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,nn.__webglTexture,he),G!==0?O.blitFramebuffer(He,Xe,be,Se,Ke,ct,be,Se,O.COLOR_BUFFER_BIT,O.NEAREST):tn?O.copyTexSubImage3D(Rt,he,Ke,ct,Te+Wt,He,Xe,be,Se):O.copyTexSubImage2D(Rt,he,Ke,ct,He,Xe,be,Se);Re.bindFramebuffer(O.READ_FRAMEBUFFER,null),Re.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else tn?w.isDataTexture||w.isData3DTexture?O.texSubImage3D(Rt,he,Ke,ct,Te,be,Se,de,_t,Be,Dt.data):V.isCompressedArrayTexture?O.compressedTexSubImage3D(Rt,he,Ke,ct,Te,be,Se,de,_t,Dt.data):O.texSubImage3D(Rt,he,Ke,ct,Te,be,Se,de,_t,Be,Dt):w.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,he,Ke,ct,be,Se,_t,Be,Dt.data):w.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,he,Ke,ct,Dt.width,Dt.height,_t,Dt.data):O.texSubImage2D(O.TEXTURE_2D,he,Ke,ct,be,Se,_t,Be,Dt);O.pixelStorei(O.UNPACK_ROW_LENGTH,lt),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,vn),O.pixelStorei(O.UNPACK_SKIP_PIXELS,bn),O.pixelStorei(O.UNPACK_SKIP_ROWS,kt),O.pixelStorei(O.UNPACK_SKIP_IMAGES,ss),he===0&&V.generateMipmaps&&O.generateMipmap(Rt),Re.unbindTexture()},this.initRenderTarget=function(w){Fe.get(w).__webglFramebuffer===void 0&&Ve.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?Ve.setTextureCube(w,0):w.isData3DTexture?Ve.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?Ve.setTexture2DArray(w,0):Ve.setTexture2D(w,0),Re.unbindTexture()},this.resetState=function(){D=0,v=0,b=null,Re.reset(),z.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return li}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=mt._getDrawingBufferColorSpace(e),t.unpackColorSpace=mt._getUnpackColorSpace()}}function Pg({scene:n,box:e,ball:t,cyl:i,mesh:s,segment:r,mat:o,sign:a,softPool:l,doorLeaves:c,doorBlocker:u,lampFixture:d}){const f=new Set,h=new Map,p=ne=>(f.add(ne),ne);for(const ne of kn){const fe=p(s(new Zn(.36,.4,24),"#c6b387",ne.x,.09,ne.z));fe.rotation.x=-Math.PI/2,h.set(ne.id,fe)}c.forEach(p),p(d.bulb),e(-10,1.05,-13,.95,2.1,.6,"#50676e"),e(-10,1.05,-12.68,.76,1.9,.02,"#293941");const _=new dt;_.position.set(-10.46,0,-12.63),n.add(_),p(_),e(.46,1.05,0,.9,2.08,.055,"#718380",_),e(.78,1.03,.04,.045,.23,.05,"#c2bfa9",_);const x=p(e(-10,1.1,-12.65,.48,.34,.025,"#d9cfac"));a(-10,2.35,-12.6,2.5,"איינשטיין · ציוד משותף");const m=p(t(-4,2.35,5.13,.055,"#b47e56"));for(const ne of[-.35,.35])r([-8,1.25,16.7],[-8+ne,0,16.7+.35],.025,"#8b9491");r([-8,1.25,16.7],[-8,0,16.25],.025,"#8b9491");const E=s(new Ei(.14,.18,.95,12),"#6b777b",-8,1.45,16.7);E.rotation.z=Math.PI/2,E.rotation.y=-.35;const T=t(-8.46,1.45,16.54,.13,"#7fabb1");T.scale.x=.17,i(-8.5,.12,8,.42,.22,"#9caaa1");const C=p(i(-8.5,.245,8,.36,.015,"#5696a3"));e(23,.3,-6,2,.6,1.2,"#79644d"),e(23,.62,-6,1.85,.03,1.05,"#3e493c");const P=new dt;P.position.set(23,.62,-6),n.add(P),p(P);for(const ne of[-.6,0,.6]){r([ne,0,0],[ne,.72,0],.025,"#708762",P);for(const fe of[-1,1]){const Pe=t(ne+fe*.14,.45,0,.19,"#7b936c",P);Pe.scale.set(.8,.35,1.9),Pe.rotation.z=fe*.7}}i(24.1,.3,-5.8,.25,.55,"#809595"),r([24.1,.4,-5.8],[24.6,.6,-5.8],.065,"#809595"),e(5,.6,10,.85,1.2,.85,"#536d67"),e(5,1.23,10,.96,.12,.96,"#718b7e"),a(5,1.45,10.44,1.7,"מחזור");const g=new dt;n.add(g),p(g);for(let ne=0;ne<3;ne++){const fe=i(4.1+ne*.4,.12,10.8+ne%2*.4,.1,.3,["#a5aaa0","#a98b71","#7b979b"][ne],g);fe.rotation.z=1.2+ne*.2}e(19,.8,8,1.4,1.6,.55,"#465a61");const R=[-.43,0,.43].map(ne=>p(e(19+ne,1.05,8.32,.14,.35,.1,"#b39e78")));a(19,1.9,8.33,2.7,"תאורת השביל","ירח · שמש · עץ");const D=[];for(const[ne,fe]of[[16,7],[13,6],[10,5]]){i(ne,.32,fe,.08,.64,"#52615f");const Pe=p(t(ne,.67,fe,.13,"#d0bd8c")),ze=l(ne,fe,3.2);D.push({bulb:Pe,pool:ze})}const v=p(t(-21.48,.99,-8.5,.085,"#b6b7a5")),b=[0,1,2].map(ne=>{const fe=p(s(new Zn(.22,.24,24),"#d1c49f",-21.48,1.05,-8.4));return fe.visible=!1,fe}),A=p(t(12,.25,22,.24,"#a87848")),N=p(s(new ji(.242,.01,4,24),"#3d3933",0,0,0,A));N.rotation.x=Math.PI/2;let U=Fr(),H=-1,q=-1,Z=0,ie=0;function Q(ne,{animate:fe=!0}={}){U=ne,c.forEach((ze,Je)=>{ze.rotation.y=U.doorOpen?Je===0?-Math.PI*.46:Math.PI*.46:0}),u.disabled=U.doorOpen,d.bulb.material=o(U.lampOn?"#d6b884":"#566368",U.lampOn),d.pool.visible=U.lampOn,_.rotation.y=U.lockerOpen?-Math.PI*.65:0,x.visible=U.lockerOpen,m.material=o(U.visited.includes("noticeboard")?"#a4c4a3":"#b47e56"),C.visible=U.waterFilled,P.scale.y=U.watered?1.3:.58,g.visible=!U.recycled;const Pe=Nr(U);R.forEach((ze,Je)=>{ze.rotation.x=U.switches[Je]?-.55:.55,ze.material=o(U.switches[Je]?"#b8cdb0":"#b39e78")}),D.forEach(ze=>{ze.bulb.material=o(Pe?"#dfc58e":"#66716a",Pe),ze.pool.visible=Pe});for(const[ze,Je]of h)Je.material=o(U.visited.includes(ze)?"#8da892":"#c6b387");fe&&U.shots>Z&&(H=0),fe&&U.bells>ie&&(q=0),Z=U.shots,ie=U.bells}function te(ne,fe){if(H>=0){H+=ne;const Pe=Math.min(H/1.35,1);if(A.position.set(12+3.58*Pe,.25+2.58*Pe+Math.sin(Pe*Math.PI)*2.45,22),A.rotation.z-=ne*4,Pe===1){const ze=Math.min((H-1.35)/.8,1);A.position.set(15.58-3.58*ze,2.83*(1-ze)+Math.sin(ze*Math.PI)*.45,22),ze===1&&(H=-1,A.position.set(12,.25,22))}}q>=0&&(q+=ne,v.rotation.z=fe?0:Math.sin(q*34)*.2,b.forEach((Pe,ze)=>{Pe.visible=q<1.2;const Je=.6+(q+ze*.16)*2;Pe.scale.setScalar(Je),Pe.rotation.y=.6}),q>1.2&&(q=-1,v.rotation.z=0))}return{dynamic:f,sync:Q,update:te,get animation(){return{basketballInFlight:H>=0,bellRinging:q>=0}}}}const Lg=JSON.parse('[{"id":"facts","subject_id":"hebrew","exam_id":"hebrew-v1-garden","title":"עובדה או דעה?","description":"מזהים מה אפשר לבדוק ומה מביע מחשבה אישית.","references":[{"id":"garden-passage","kind":"passage","title":"הטקסט „תלמידי כיתה ז׳ הקימו גינה בבית הספר”","url":"garden-exam.html#article","attribution":null,"parts":[{"part":"הכותרת ושורת הפרטים","title":"הכותרת, הכותבת, מקום הפרסום והתאריך"},{"part":"פסקה 1","title":"הקמת הגינה, הכיתות וההשקיה"},{"part":"פסקה 2","title":"ההכנות לפני השתילה ומטרת הפעילות"},{"part":"פסקה 3","title":"דברי התלמידים ומה יקרה בעוד חודש"},{"part":"הטקסט כולו","title":"הטקסט כולו"}]}],"questions":[{"id":"facts-01","position":1,"type":"mcq","topic":null,"difficulty":null,"prompt":"„בפעילות השתתפו שלוש כיתות.” מה זה?","choices":["עובדה","דעה"],"correct":0,"explanation":{"he":"אפשר לבדוק כמה כיתות השתתפו בפעילות.","en":"The number of participating classes can be checked."},"ref":{"id":"garden-passage","part":"פסקה 1"}},{"id":"facts-02","position":2,"type":"mcq","topic":null,"difficulty":null,"prompt":"„שיעורים בגינה מעניינים יותר משיעורים בכיתה.” מה זה?","choices":["עובדה","דעה"],"correct":1,"explanation":{"he":"„מעניינים יותר” הוא שיפוט אישי, ולכן זו דעה.","en":"“More interesting” is a personal judgment, so this is an opinion."},"ref":{"id":"garden-passage","part":"פסקה 3"}},{"id":"facts-03","position":3,"type":"mcq","topic":null,"difficulty":null,"prompt":"„התלמידים שתלו נענע, רוזמרין וחסה.” מה זה?","choices":["עובדה","דעה"],"correct":0,"explanation":{"he":"אפשר לבדוק אילו צמחים נשתלו בגינה.","en":"The plants in the garden can be checked."},"ref":{"id":"garden-passage","part":"פסקה 1"}},{"id":"facts-04","position":4,"type":"mcq","topic":null,"difficulty":null,"prompt":"„נענע היא הצמח הכי מוצלח בגינה.” מה זה?","choices":["עובדה","דעה"],"correct":1,"explanation":{"he":"„הכי מוצלח” מביע הערכה אישית ולא נתון מדיד שהוגדר כאן.","en":"“The best” is a personal evaluation, not a defined measurable fact here."},"ref":{"id":"garden-passage","part":null}},{"id":"facts-05","position":5,"type":"mcq","topic":null,"difficulty":null,"prompt":"„כל כיתה קיבלה אחריות להשקיה ביום אחר בשבוע.” מה זה?","choices":["עובדה","דעה"],"correct":0,"explanation":{"he":"אפשר לבדוק את לוח ההשקיה של הכיתות.","en":"The class watering schedule can be checked."},"ref":{"id":"garden-passage","part":"פסקה 1"}},{"id":"facts-06","position":6,"type":"mcq","topic":null,"difficulty":null,"prompt":"„לדעתי, הפעילות בגינה נהדרת.” מה זה?","choices":["עובדה","דעה"],"correct":1,"explanation":{"he":"המילה „לדעתי” מסמנת במפורש שהדובר מביע דעה.","en":"The word “in my opinion” clearly signals an opinion."},"ref":{"id":"garden-passage","part":null}}]},{"id":"questions","subject_id":"hebrew","exam_id":"hebrew-v1-garden","title":"מילות שאלה","description":"בוחרים את מילת השאלה המתאימה למידע שמחפשים.","references":[{"id":"garden-passage","kind":"passage","title":"הטקסט „תלמידי כיתה ז׳ הקימו גינה בבית הספר”","url":"garden-exam.html#article","attribution":null,"parts":[{"part":"הכותרת ושורת הפרטים","title":"הכותרת, הכותבת, מקום הפרסום והתאריך"},{"part":"פסקה 1","title":"הקמת הגינה, הכיתות וההשקיה"},{"part":"פסקה 2","title":"ההכנות לפני השתילה ומטרת הפעילות"},{"part":"פסקה 3","title":"דברי התלמידים ומה יקרה בעוד חודש"},{"part":"הטקסט כולו","title":"הטקסט כולו"}]}],"questions":[{"id":"questions-01","position":1,"type":"mcq","topic":null,"difficulty":null,"prompt":"איזו מילת שאלה מתאימה לבירור מועד הקמת הגינה?","choices":["מתי","מי","כמה"],"correct":0,"explanation":{"he":"„מתי” מבקשת זמן או מועד.","en":"“When” asks about a time or date."},"ref":{"id":"garden-passage","part":"פסקה 1"}},{"id":"questions-02","position":2,"type":"mcq","topic":null,"difficulty":null,"prompt":"איזו מילת שאלה מתאימה לבירור מספר הכיתות שהשתתפו?","choices":["כיצד","כמה","היכן"],"correct":1,"explanation":{"he":"„כמה” מבקשת מספר או כמות.","en":"“How many” asks for a number or quantity."},"ref":{"id":"garden-passage","part":"פסקה 1"}},{"id":"questions-03","position":3,"type":"mcq","topic":null,"difficulty":null,"prompt":"איזו מילת שאלה מתאימה לשאלה על הסיבה לכך שקראו על הצמחים?","choices":["מדוע","מתי","מי"],"correct":0,"explanation":{"he":"„מדוע” מבקשת סיבה: למה עשו זאת?","en":"“Why” asks for the reason something happened."},"ref":{"id":"garden-passage","part":"פסקה 2"}},{"id":"questions-04","position":4,"type":"mcq","topic":null,"difficulty":null,"prompt":"איזו מילת שאלה מתאימה לבירור המקום שבו הוקמה הגינה?","choices":["כמה","היכן","כיצד"],"correct":1,"explanation":{"he":"„היכן” מבקשת מקום.","en":"“Where” asks about a place."},"ref":{"id":"garden-passage","part":"פסקה 1"}},{"id":"questions-05","position":5,"type":"mcq","topic":null,"difficulty":null,"prompt":"איזו מילת שאלה מתאימה לבירור האופן שבו חילקו את ההשקיה?","choices":["כיצד","מתי","מי"],"correct":0,"explanation":{"he":"„כיצד” מבקשת דרך או אופן פעולה.","en":"“How” asks about the way something was done."},"ref":{"id":"garden-passage","part":"פסקה 1"}},{"id":"questions-06","position":6,"type":"mcq","topic":null,"difficulty":null,"prompt":"איזו מילת שאלה מתאימה לבירור מי הציעה להוסיף פרחים?","choices":["היכן","מי","מדוע"],"correct":1,"explanation":{"he":"„מי” מבקשת לזהות אדם.","en":"“Who” asks which person did something."},"ref":{"id":"garden-passage","part":"פסקה 3"}}]},{"id":"instructions","subject_id":"hebrew","exam_id":"hebrew-v1-garden","title":"מבינים הוראות","description":"מזהים מה בדיוק צריך לעשות לפי מילת ההוראה.","references":[{"id":"garden-passage","kind":"passage","title":"הטקסט „תלמידי כיתה ז׳ הקימו גינה בבית הספר”","url":"garden-exam.html#article","attribution":null,"parts":[{"part":"הכותרת ושורת הפרטים","title":"הכותרת, הכותבת, מקום הפרסום והתאריך"},{"part":"פסקה 1","title":"הקמת הגינה, הכיתות וההשקיה"},{"part":"פסקה 2","title":"ההכנות לפני השתילה ומטרת הפעילות"},{"part":"פסקה 3","title":"דברי התלמידים ומה יקרה בעוד חודש"},{"part":"הטקסט כולו","title":"הטקסט כולו"}]}],"questions":[{"id":"instructions-01","position":1,"type":"mcq","topic":null,"difficulty":null,"prompt":"בשאלה כתוב „העתיקו מהטקסט עובדה”. מה צריך לעשות?","choices":["לכתוב את המילים בדיוק כפי שהן בטקסט","להמציא עובדה חדשה","לכתוב מה חושבים"],"correct":0,"explanation":{"he":"„העתיקו” פירושו להשתמש בניסוח שמופיע בטקסט.","en":"“Copy” means use the wording from the passage."},"ref":{"id":"garden-passage","part":null}},{"id":"instructions-02","position":2,"type":"mcq","topic":null,"difficulty":null,"prompt":"בשאלה כתוב „נמקו”. מה צריך להוסיף לתשובה?","choices":["כותרת בלבד","סיבה שמסבירה את הבחירה","תאריך הפרסום בלבד"],"correct":1,"explanation":{"he":"„נמקו” מבקשת לתת סיבה או ראיה לבחירה.","en":"“Justify” asks for a reason or evidence."},"ref":{"id":"garden-passage","part":null}},{"id":"instructions-03","position":3,"type":"mcq","topic":null,"difficulty":null,"prompt":"בשאלה כתוב „ציינו”. איזו תשובה מתאימה בדרך כלל?","choices":["תשובה קצרה וברורה","סיפור ארוך שלא קשור לשאלה","שאלה חדשה"],"correct":0,"explanation":{"he":"„ציינו” מבקשת למסור את הפרט המבוקש בקצרה.","en":"“State” usually asks for the requested detail briefly."},"ref":{"id":"garden-passage","part":null}},{"id":"instructions-04","position":4,"type":"mcq","topic":null,"difficulty":null,"prompt":"בשאלה כתוב „הסבירו”. מה צריך לעשות?","choices":["לכתוב מילה אחת בלבד","לתאר בפירוט כיצד או מדוע","להעתיק את הכותרת"],"correct":1,"explanation":{"he":"„הסבירו” מבקשת להבהיר את הרעיון בעזרת פירוט או סיבה.","en":"“Explain” asks for details about how or why."},"ref":{"id":"garden-passage","part":null}},{"id":"instructions-05","position":5,"type":"mcq","topic":null,"difficulty":null,"prompt":"בשאלה כתוב „נסחו שאלה מלאה”. איזו תשובה מקיימת את ההוראה?","choices":["„שלוש כיתות”","„כמה כיתות השתתפו בפעילות?”","„כיתות”"],"correct":1,"explanation":{"he":"שאלה מלאה כוללת מילת שאלה ומשפט שלם.","en":"A full question includes a question word and a complete sentence."},"ref":{"id":"garden-passage","part":null}},{"id":"instructions-06","position":6,"type":"mcq","topic":null,"difficulty":null,"prompt":"בשאלה כתוב „הביעו את דעתכם וכתבו נימוק”. מה צריך לכתוב?","choices":["רק עובדה מהטקסט","עמדה אישית וסיבה שתומכת בה","רק את שם הכותבת"],"correct":1,"explanation":{"he":"צריך לציין מה חושבים ולתת סיבה אחת לפחות.","en":"State your view and give at least one supporting reason."},"ref":{"id":"garden-passage","part":null}}]},{"id":"physics-basics","subject_id":"physics","exam_id":"physics-v1-assessment","title":"מדידה ושיטות מדידה","description":"מזהים תוצאות ומבדילים בין מדידה ישירה לעקיפה.","references":[{"id":"physics-pdf","kind":"pdf","title":"סיכום נושא מדידות (PDF)","url":"assets/materials/physics-measurements-grade-7.pdf","attribution":"שרית שרת","parts":[{"part":"עמוד 1","title":"מדידות: מהי מדידה, מדידה ישירה ומדידה עקיפה"},{"part":"עמוד 2","title":"המרת יחידות אורך"},{"part":"עמוד 3","title":"איך מודדים עובי של דף?"},{"part":"עמוד 4","title":"דיוק ומדידה נכונה"},{"part":"עמוד 5","title":"מודדים גובה של עמוד: הרעיון הגאומטרי"},{"part":"עמוד 6","title":"מדידת העמוד בפועל"}]}],"questions":[{"id":"physics-basics-01","position":1,"type":"mcq","topic":null,"difficulty":null,"prompt":"מה חייבים לציין בתוצאת מדידה?","choices":["מספר ויחידת מידה","מספר בלבד","שם כלי המדידה בלבד"],"correct":0,"explanation":{"he":"תוצאת מדידה כוללת מספר ויחידה, למשל 14 ס״מ.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 1"}},{"id":"physics-basics-02","position":2,"type":"mcq","topic":null,"difficulty":null,"prompt":"מדדתם אורך מחברת וקראתם את התוצאה מהסרגל. איזו מדידה זו?","choices":["ישירה","עקיפה","לא מדידה"],"correct":0,"explanation":{"he":"במדידה ישירה קוראים את הגודל המבוקש מכלי המדידה.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 1"}},{"id":"physics-basics-03","position":3,"type":"mcq","topic":null,"difficulty":null,"prompt":"מדדתם עובי של ערימת דפים וחילקתם במספר הדפים. איזו מדידה זו?","choices":["ישירה","עקיפה","הערכה ללא מדידה"],"correct":1,"explanation":{"he":"מודדים גודל אחר ומחשבים ממנו את העובי הממוצע של דף.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 1"}},{"id":"physics-basics-04","position":4,"type":"mcq","topic":null,"difficulty":null,"prompt":"איך מחשבים עובי ממוצע של דף בערימה?","choices":["עובי הערימה חלקי מספר הדפים","מספר הדפים חלקי עובי הערימה","עובי הערימה כפול מספר הדפים"],"correct":0,"explanation":{"he":"מחלקים את עובי הערימה במספר הדפים, לא במספר העמודים.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 3"}},{"id":"physics-basics-05","position":5,"type":"mcq","topic":null,"difficulty":null,"prompt":"ערימה של 100 דפים עובייה 10 מ״מ. מה העובי הממוצע של דף?","choices":["0.1 מ״מ","1 מ״מ","10 מ״מ"],"correct":0,"explanation":{"he":"מחלקים 10 מ״מ ב־100 ומקבלים 0.1 מ״מ לדף.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 3"}},{"id":"physics-basics-06","position":6,"type":"mcq","topic":null,"difficulty":null,"prompt":"למה כדאי למדוד ערימה של דפים מאותו סוג?","choices":["כדי להעריך את העובי הממוצע של דף מהסוג הזה","כי אין צורך לספור את הדפים","כדי לקבל תמיד תוצאה מדויקת לגמרי"],"correct":0,"explanation":{"he":"דפים מאותו סוג מאפשרים אומדן שימושי יותר של עובי דף ממוצע.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 3"}},{"id":"physics-basics-07","position":7,"type":"mcq","topic":null,"difficulty":null,"prompt":"מהי מדידה?","choices":["השוואה ליחידת מידה מוסכמת","ניחוש ללא השוואה","כתיבת שם הגוף"],"correct":0,"explanation":{"he":"מדידה משווה גודל ליחידת מידה מוסכמת.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 1"}},{"id":"physics-basics-08","position":8,"type":"mcq","topic":null,"difficulty":null,"prompt":"מה מתאים לתיאור אורך עיפרון?","choices":["14 ס״מ","14 בלבד","ס״מ בלבד"],"correct":0,"explanation":{"he":"תוצאת מדידה כוללת גם מספר וגם יחידת מידה.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 1"}},{"id":"physics-basics-09","position":9,"type":"mcq","topic":null,"difficulty":null,"prompt":"איזו פעולה היא מדידה עקיפה?","choices":["מדידת ערימת דפים וחלוקה במספר הדפים","קריאת אורך עיפרון מסרגל","קריאת הטמפרטורה ממדחום"],"correct":0,"explanation":{"he":"מודדים את הערימה ומחשבים ממנה את עובי הדף הממוצע.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 1"}},{"id":"physics-basics-10","position":10,"type":"mcq","topic":null,"difficulty":null,"prompt":"ערימה של 50 דפים היא בעובי 5 מ״מ. מה עובי דף ממוצע?","choices":["0.1 מ״מ","10 מ״מ","1 מ״מ"],"correct":0,"explanation":{"he":"מחלקים 5 מ״מ ב־50 דפים ומקבלים 0.1 מ״מ לדף.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 3"}},{"id":"physics-basics-11","position":11,"type":"mcq","topic":null,"difficulty":null,"prompt":"למה מודדים ערימת דפים בלי הכריכה?","choices":["כדי שהכריכה לא תוסיף עובי לתוצאה","כדי לשנות את מספר הדפים","כי הכריכה מחליפה את הסרגל"],"correct":0,"explanation":{"he":"הכריכה אינה דף בערימה ולכן עובייה יטה את החישוב.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 3"}}]},{"id":"physics-units","subject_id":"physics","exam_id":"physics-v1-assessment","title":"המרת יחידות אורך","description":"מתרגלים קילומטרים, מטרים, סנטימטרים ומילימטרים.","references":[{"id":"physics-pdf","kind":"pdf","title":"סיכום נושא מדידות (PDF)","url":"assets/materials/physics-measurements-grade-7.pdf","attribution":"שרית שרת","parts":[{"part":"עמוד 1","title":"מדידות: מהי מדידה, מדידה ישירה ומדידה עקיפה"},{"part":"עמוד 2","title":"המרת יחידות אורך"},{"part":"עמוד 3","title":"איך מודדים עובי של דף?"},{"part":"עמוד 4","title":"דיוק ומדידה נכונה"},{"part":"עמוד 5","title":"מודדים גובה של עמוד: הרעיון הגאומטרי"},{"part":"עמוד 6","title":"מדידת העמוד בפועל"}]}],"questions":[{"id":"physics-units-01","position":1,"type":"mcq","topic":null,"difficulty":null,"prompt":"כמה סנטימטרים יש במטר אחד?","choices":["10","100","1,000"],"correct":1,"explanation":{"he":"מטר אחד שווה ל־100 סנטימטרים.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 2"}},{"id":"physics-units-02","position":2,"type":"mcq","topic":null,"difficulty":null,"prompt":"כמה מילימטרים יש בסנטימטר אחד?","choices":["10","100","1,000"],"correct":0,"explanation":{"he":"סנטימטר אחד שווה ל־10 מילימטרים.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 2"}},{"id":"physics-units-03","position":3,"type":"mcq","topic":null,"difficulty":null,"prompt":"כמה מטרים יש ב־2 קילומטרים?","choices":["200","2,000","20,000"],"correct":1,"explanation":{"he":"קילומטר אחד הוא 1,000 מטרים, ולכן 2 ק״מ הם 2,000 מטרים.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 2"}},{"id":"physics-units-04","position":4,"type":"mcq","topic":null,"difficulty":null,"prompt":"כמה סנטימטרים הם 2.4 מטרים?","choices":["24","240","2,400"],"correct":1,"explanation":{"he":"ממטר לסנטימטר כופלים ב־100: 2.4 × 100 = 240.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 2"}},{"id":"physics-units-05","position":5,"type":"mcq","topic":null,"difficulty":null,"prompt":"כמה מטרים הם 350 סנטימטרים?","choices":["3.5","35","0.35"],"correct":0,"explanation":{"he":"מסנטימטר למטר מחלקים ב־100: 350 ÷ 100 = 3.5.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 2"}},{"id":"physics-units-06","position":6,"type":"mcq","topic":null,"difficulty":null,"prompt":"כמה הם מטר אחד ועוד 25 ס״מ?","choices":["1.25 מטרים","26 מטרים","1.025 מטרים"],"correct":0,"explanation":{"he":"ממירים 25 ס״מ ל־0.25 מטר ואז מחברים: 1 + 0.25 = 1.25.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 2"}},{"id":"physics-units-07","position":7,"type":"mcq","topic":null,"difficulty":null,"prompt":"כמה מילימטרים הם 3 ס״מ?","choices":["30 מ״מ","3 מ״מ","300 מ״מ"],"correct":0,"explanation":{"he":"כל סנטימטר הוא 10 מ״מ, ולכן 3 ס״מ הם 30 מ״מ.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 2"}},{"id":"physics-units-08","position":8,"type":"mcq","topic":null,"difficulty":null,"prompt":"כמה סנטימטרים הם 12 מ״מ?","choices":["1.2 ס״מ","12 ס״מ","120 ס״מ"],"correct":0,"explanation":{"he":"מחלקים את מספר המילימטרים ב־10: התוצאה היא 1.2 ס״מ.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 2"}},{"id":"physics-units-09","position":9,"type":"mcq","topic":null,"difficulty":null,"prompt":"כמה קילומטרים הם 1,500 מטרים?","choices":["1.5 ק״מ","15 ק״מ","0.15 ק״מ"],"correct":0,"explanation":{"he":"מחלקים ב־1,000: 1,500 מטרים הם 1.5 ק״מ.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 2"}},{"id":"physics-units-10","position":10,"type":"mcq","topic":null,"difficulty":null,"prompt":"מה ארוך יותר: 90 ס״מ או מטר אחד?","choices":["מטר אחד","90 ס״מ","הם שווים"],"correct":0,"explanation":{"he":"מטר אחד הוא 100 ס״מ, ולכן הוא ארוך מ־90 ס״מ.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 2"}},{"id":"physics-units-11","position":11,"type":"mcq","topic":null,"difficulty":null,"prompt":"מה קורה לאורך עצמו כשממירים אותו מס״מ למ״מ?","choices":["האורך נשאר זהה","האורך גדל פי 10","האורך קטן פי 10"],"correct":0,"explanation":{"he":"הגוף אינו משתנה; רק המספר והיחידה שבהם מתארים אותו משתנים.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 2"}}]},{"id":"physics-precision","subject_id":"physics","exam_id":"physics-v1-assessment","title":"מודדים נכון","description":"בוחרים כלי מתאים וקוראים את הסרגל בזהירות.","references":[{"id":"physics-pdf","kind":"pdf","title":"סיכום נושא מדידות (PDF)","url":"assets/materials/physics-measurements-grade-7.pdf","attribution":"שרית שרת","parts":[{"part":"עמוד 1","title":"מדידות: מהי מדידה, מדידה ישירה ומדידה עקיפה"},{"part":"עמוד 2","title":"המרת יחידות אורך"},{"part":"עמוד 3","title":"איך מודדים עובי של דף?"},{"part":"עמוד 4","title":"דיוק ומדידה נכונה"},{"part":"עמוד 5","title":"מודדים גובה של עמוד: הרעיון הגאומטרי"},{"part":"עמוד 6","title":"מדידת העמוד בפועל"}]}],"questions":[{"id":"physics-precision-01","position":1,"type":"mcq","topic":null,"difficulty":null,"prompt":"מאיזו נקודה בסרגל מתחילים למדוד אורך?","choices":["מסימון האפס","תמיד מקצה הסרגל","מהמספר 1"],"correct":0,"explanation":{"he":"מצמידים את תחילת הגוף לסימון האפס, שלא תמיד נמצא בקצה הסרגל.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 4"}},{"id":"physics-precision-02","position":2,"type":"mcq","topic":null,"difficulty":null,"prompt":"גוף מתחיל ב־2.0 ס״מ ומסתיים ב־8.2 ס״מ. מה אורכו?","choices":["6.2 ס״מ","8.2 ס״מ","10.2 ס״מ"],"correct":0,"explanation":{"he":"מחסרים את קריאת ההתחלה מקריאת הסיום: 8.2 − 2.0 = 6.2 ס״מ.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 4"}},{"id":"physics-precision-03","position":3,"type":"mcq","topic":null,"difficulty":null,"prompt":"איך מסתכלים על שנתות הסרגל כדי לצמצם טעות קריאה?","choices":["בניצב לסולם","באלכסון ככל האפשר","ממרחק גדול"],"correct":0,"explanation":{"he":"מבט בניצב לסולם מצמצם שגיאת קריאה בגלל זווית ההסתכלות.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 4"}},{"id":"physics-precision-04","position":4,"type":"mcq","topic":null,"difficulty":null,"prompt":"איזה כלי מתאים יותר למדידת אורך של חדר?","choices":["סרט מדידה","סרגל קצר בלבד","שעון"],"correct":0,"explanation":{"he":"סרט מדידה מתאים יותר לאורכו של חדר.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 4"}},{"id":"physics-precision-05","position":5,"type":"mcq","topic":null,"difficulty":null,"prompt":"מה מאפשרות שנתות קטנות יותר על כלי מדידה?","choices":["קריאה מפורטת יותר","ביטול מוחלט של כל טעות","שינוי האורך של הגוף"],"correct":0,"explanation":{"he":"שנתות קטנות מאפשרות לקרוא את המדידה בפירוט רב יותר.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 4"}},{"id":"physics-precision-06","position":6,"type":"mcq","topic":null,"difficulty":null,"prompt":"מדוע חוזרים על מדידה?","choices":["כדי לזהות חריגות ולהקטין השפעת שגיאות אקראיות","כדי לתקן בהכרח כלי פגום","כדי לשנות את גודל הגוף"],"correct":0,"explanation":{"he":"חזרות מסייעות לזהות חריגות, אך אינן מתקנות כלי פגום או שיטה שגויה.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 4"}},{"id":"physics-precision-07","position":7,"type":"mcq","topic":null,"difficulty":null,"prompt":"גוף מתחיל בסימון 3 ס״מ ומסתיים ב־9 ס״מ. מה אורכו?","choices":["6 ס״מ","9 ס״מ","12 ס״מ"],"correct":0,"explanation":{"he":"מחסרים את קריאת ההתחלה מקריאת הסיום: 9 פחות 3 הם 6 ס״מ.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 4"}},{"id":"physics-precision-08","position":8,"type":"mcq","topic":null,"difficulty":null,"prompt":"למה לא תמיד מתחילים למדוד מקצה הסרגל?","choices":["כי סימון האפס יכול להיות רחוק מהקצה","כי הסרגל תמיד מתחיל ב־1","כי אסור להשתמש בסימון האפס"],"correct":0,"explanation":{"he":"חשוב להתחיל מסימון האפס; קצה הסרגל לא תמיד נמצא בדיוק באפס.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 4"}},{"id":"physics-precision-09","position":9,"type":"mcq","topic":null,"difficulty":null,"prompt":"איזה כלי מתאים למדידת אורך של עיפרון?","choices":["סרגל עם שנתות קטנות","שעון עצר","מדחום"],"correct":0,"explanation":{"he":"סרגל עם שנתות מתאימות מאפשר למדוד את אורך העיפרון.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 4"}},{"id":"physics-precision-10","position":10,"type":"mcq","topic":null,"difficulty":null,"prompt":"מה חזרה על מדידה אינה מתקנת בהכרח?","choices":["שיטה שגויה או כלי פגום","טעות אקראית בודדת","תוצאה חריגה שאפשר לזהות"],"correct":0,"explanation":{"he":"חזרה יכולה לעזור לזהות חריגות, אך אינה מתקנת כלי פגום או שיטה שגויה.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 4"}},{"id":"physics-precision-11","position":11,"type":"mcq","topic":null,"difficulty":null,"prompt":"מה כדאי לבדוק לפני שרושמים תוצאה?","choices":["את היחידה, נקודת האפס וזווית ההסתכלות","רק את צבע כלי המדידה","רק את שם הגוף"],"correct":0,"explanation":{"he":"יחידה מתאימה, נקודת אפס נכונה ומבט בניצב עוזרים למדוד נכון.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 4"}}]},{"id":"physics-pole","subject_id":"physics","exam_id":"physics-v1-assessment","title":"מודדים גובה של עמוד","description":"מחשבים גובה בעזרת זווית של 45° ומרחק אופקי.","references":[{"id":"physics-pdf","kind":"pdf","title":"סיכום נושא מדידות (PDF)","url":"assets/materials/physics-measurements-grade-7.pdf","attribution":"שרית שרת","parts":[{"part":"עמוד 1","title":"מדידות: מהי מדידה, מדידה ישירה ומדידה עקיפה"},{"part":"עמוד 2","title":"המרת יחידות אורך"},{"part":"עמוד 3","title":"איך מודדים עובי של דף?"},{"part":"עמוד 4","title":"דיוק ומדידה נכונה"},{"part":"עמוד 5","title":"מודדים גובה של עמוד: הרעיון הגאומטרי"},{"part":"עמוד 6","title":"מדידת העמוד בפועל"}]}],"questions":[{"id":"physics-pole-01","position":1,"type":"mcq","topic":null,"difficulty":null,"prompt":"בשיטת העמוד, באיזו זווית לאופק מכוונים אל ראש העמוד?","choices":["45°","90°","180°"],"correct":0,"explanation":{"he":"מכוונים את קו הראייה בזווית של 45° ביחס לאופק.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 5"}},{"id":"physics-pole-02","position":2,"type":"mcq","topic":null,"difficulty":null,"prompt":"מה שווה למרחק האופקי לעמוד בשיטת 45°?","choices":["גובה ראש העמוד מעל גובה העיניים","גובה העמוד כולו","גובה העיניים"],"correct":0,"explanation":{"he":"במשולש ישר־זווית ושווה־שוקיים שני הניצבים שווים.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 5"}},{"id":"physics-pole-03","position":3,"type":"mcq","topic":null,"difficulty":null,"prompt":"המרחק האופקי לעמוד 6 מטרים וגובה העיניים 1.4 מטרים. מה גובה העמוד?","choices":["7.4 מטרים","6 מטרים","4.6 מטרים"],"correct":0,"explanation":{"he":"מחברים את המרחק האופקי לגובה העיניים: 6 + 1.4 = 7.4 מטרים.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 6"}},{"id":"physics-pole-04","position":4,"type":"mcq","topic":null,"difficulty":null,"prompt":"איזה מרחק מודדים לצורך החישוב?","choices":["המרחק האופקי אל בסיס העמוד","אורך קו הראייה האלכסוני","המרחק מראש העמוד לקרקע באומדן"],"correct":0,"explanation":{"he":"מודדים את המרחק האופקי מהנקודה שמתחת לעין אל בסיס העמוד.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 6"}},{"id":"physics-pole-05","position":5,"type":"mcq","topic":null,"difficulty":null,"prompt":"איזה גובה מוסיפים למרחק האופקי?","choices":["גובה העיניים מעל הקרקע","גובה התלמיד כולו","גובה המשולש שביד"],"correct":0,"explanation":{"he":"מוסיפים את גובה העיניים, כי המשולש מתחיל בגובה העין.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 6"}},{"id":"physics-pole-06","position":6,"type":"mcq","topic":null,"difficulty":null,"prompt":"איזה תנאי נדרש לשיטה המתוארת?","choices":["קרקע אופקית ובסיס העמוד באותו מפלס","העמוד חייב להיות נמוך מהתלמיד","אין צורך לדעת את זווית הראייה"],"correct":0,"explanation":{"he":"הנוסחה מתאימה כאשר הקרקע אופקית ובסיס העמוד באותו מפלס.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 5"}},{"id":"physics-pole-07","position":7,"type":"mcq","topic":null,"difficulty":null,"prompt":"המרחק לעמוד 4 מטרים וגובה העיניים 1.5 מטרים. מה גובה העמוד בשיטת 45°?","choices":["5.5 מטרים","4 מטרים","2.5 מטרים"],"correct":0,"explanation":{"he":"מחברים מרחק אופקי וגובה עיניים: 4 + 1.5 = 5.5 מטרים.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 5"}},{"id":"physics-pole-08","position":8,"type":"mcq","topic":null,"difficulty":null,"prompt":"מה צריך לראות דרך הגליל כשקובעים את נקודת המדידה?","choices":["את ראש העמוד","את בסיס העמוד בלבד","את הקרקע מתחת לעיניים"],"correct":0,"explanation":{"he":"מתקדמים או מתרחקים עד שרואים את ראש העמוד דרך הגליל המכוון ב־45°.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 6"}},{"id":"physics-pole-09","position":9,"type":"mcq","topic":null,"difficulty":null,"prompt":"מהו תפקיד המשולש בעל זווית 45°?","choices":["לעזור לכוון את הגליל בזווית הנכונה לאופק","למדוד ישירות את גובה העמוד","למדוד את עובי העמוד"],"correct":0,"explanation":{"he":"המשולש עוזר לקבע את הגליל בזווית של 45° ביחס לאופק.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 6"}},{"id":"physics-pole-10","position":10,"type":"mcq","topic":null,"difficulty":null,"prompt":"אם המרחק האופקי לעמוד 5 מטרים, מה גובה ראש העמוד מעל גובה העיניים בשיטה זו?","choices":["5 מטרים","10 מטרים","2.5 מטרים"],"correct":0,"explanation":{"he":"בזווית של 45° הניצבים במשולש שווים, ולכן הגובה מעל העיניים שווה למרחק האופקי.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 5"}},{"id":"physics-pole-11","position":11,"type":"mcq","topic":null,"difficulty":null,"prompt":"למה זו מדידה עקיפה?","choices":["כי מודדים מרחק וגובה עיניים ומחשבים מהם את גובה העמוד","כי קוראים את גובה העמוד ישירות מסרגל","כי אין צורך למדוד דבר"],"correct":0,"explanation":{"he":"גובה העמוד מתקבל מחישוב המבוסס על מדידות אחרות.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 6"}}]}]'),Ba={quizzes:Lg};function Dg({scene:n,box:e,cyl:t,cone:i,segment:s,ellipsoid:r,path:o,groundDisc:a,sign:l,circleObstacle:c}){a(69,28,38,53,"#496d60",-.012),a(-71,32,36,65,"#806749",-.012),a(15,-71,76,30,"#505b70",-.012);for(const d of Tu)o(d,3.3);e(45,.078,25.5,7.2,.07,131,"#478e94");for(const d of Io){for(let f=-5;f<=5;f++)e(45+f,.18,d,.93,.24,4.3,"#a58155");for(const f of[-1,1]){for(const h of[40,45,50])e(h,.8,d+f*2.25,.18,1.55,.18,"#695941");e(45,1.25,d+f*2.25,10.3,.13,.13,"#bb9c72")}}for(let d=0;d<36;d++){const f=-38+d*3.5;if(Io.some(p=>Math.abs(f-p)<4))continue;const h=45+(d%2?4.3:-4.3);for(let p=0;p<3;p++)s([h+p*.32,0,f],[h+p*.35+.25,1+(d+p)%3*.35,f+.15],.07,"#9b9f69")}const u=new dt;u.position.set(57,6.4,6.2),n.add(u),t(57,3,5,.95,6,"#ccb38c"),i(57,6.4,5,1.8,2,"#885c48");for(let d=0;d<4;d++){const f=new dt;f.rotation.z=d*Math.PI/2,u.add(f),e(0,1.9,0,.14,3.9,.14,"#735845",f),e(.37,2.5,0,.66,2.4,.12,"#e0c598",f)}c(57,5,1.1);for(let d=0;d<6;d++)e(84+d,.3,60,.93,.5,7,"#967453"),e(84+d,1.45,63.5,.2,2.9,.2,"#675642");for(const[d,f]of[[-69,9],[-58,9]])r(d,2.6,f,2.6,4.8,2.4,"#b07f52"),c(d,f,2.5);e(-63.5,6.7,9,11.8,2.4,3.7,"#be9464");for(let d=0;d<22;d++){const f=d*.81,h=-85+Math.cos(f)*(7+d%3),p=60+Math.sin(f)*8,_=i(h,1+d%4*.4,p,.85,2.7+d%4,["#cf9b54","#d9b870","#8fa9a8"][d%3],n,5);_.rotation.z=Math.sin(f)*.23,c(h,p,.58)}t(-16,2,-80,5,4,"#829391"),r(-16,4,-80,5.3,4.5,5.3,"#adb3b4"),c(-16,-80,5.3),s([-17,6,-80],[-20,9,-76],.67,"#5f7282");for(let d=0;d<5;d++){const f=62+Math.cos(d*1.25)*7,h=-82+Math.sin(d*1.25)*7;t(f,2,h,.14,4,"#8196a0");const p=r(f,4,h,1.8,.42,1.8,"#b2c2c8");p.rotation.z=.42,c(f,h,.35)}for(let d=0;d<84;d++){const f=Math.sin(d*7.13)*98,h=Math.cos(d*3.71)*99;Math.max(Math.abs(f),Math.abs(h))<35||Ji.some(p=>Math.hypot(f-p.x,h-p.z)<12)||Math.abs(f-45)<9||(f<-32&&h>-38?(r(f,.65,h,2.1,1.6+d%3,1.6,"#967451"),c(f,h,1.6)):(t(f,1.4,h,.28,2.8,"#655b50"),i(f,3.8,h,1.7,4+d%4,h<-38?"#53677a":"#486f5b"),c(f,h,.35)))}for(const d of Ji)a(d.x,d.z,4,4,d.color,.07),e(d.x+3,1.2,d.z-3,.32,2.4,.32,"#d2b682"),l(d.x+3,2.8,d.z-3,4.4,d.name,d.region);return u}function Ig(n,e){const t=new ji(1.15,.1,7,28),i=new oi({color:"#ffdb8d"}),s=Zs.map(([c,u])=>{const d=new en(t,i);return d.position.set(c,1.7,u),n.add(d),d}),r=new Mi({color:"#ac8ac3",emissive:"#633f80",emissiveIntensity:.75}),o=new Xc(.66,0),a=new Dr(.11,8,6),l=[1,4,7].map(c=>{const u=new dt,d=new en(o,r);u.add(d);for(const f of[-.21,.21]){const h=new en(a,i);h.position.set(f,.12,.55),u.add(h)}return n.add(u),{g:u,i:c}});return{touches(c,u){return l.some(({g:d})=>Math.hypot(d.position.x-c,d.position.z-u)<1.25)},sync(c){s.forEach((u,d)=>u.visible=!(c.skyGates||[]).includes(d))},tick(c){for(const{g:u,i:d}of l){const[f,h]=Zs[d],p=c*.85+d;u.position.set(f+Math.sin(p)*2,.72,h+Math.cos(p)*1.3),u.rotation.y=p}e||s.forEach((u,d)=>{u.rotation.y=c*.65+d,u.position.y=1.7+Math.sin(c*2+d)*.12})}}}function Ug(n,e){const t=new dt;n.add(t);const i=new oi({color:"#f3c574"}),s=new oi({color:"#9ef5dc"}),r=new jc(.34),o=new ji(1.05,.085,8,36),a=new ws(.55,.76,.12);function l(f,h,p,_,x){const m=new en(f,i);return m.position.set(p,_,x),h.add(m),m}const c=Array.from({length:3},()=>{const f=new dt;t.add(f);const h=l(o,f,0,1.65,0),p=l(r,f,0,2.9,0);p.scale.setScalar(1.6);const _=[-1,0,1].map(m=>l(a,f,m*.75,.65,0)),x=Array.from({length:3},()=>l(r,t,0,1,0));return{group:f,ring:h,diamond:p,panels:_,sparks:x}}),u=new dt;t.add(u),u.position.set(0,5,-25);const d=[[-3,0,0],[-1,2,0],[1,1,0],[3,3,0],[4,1,0]];for(const[f,h,p]of d)l(r,u,f,h,p);return u.add(new Dh(new Kt().setFromPoints(d.map(f=>new B(...f))),new ad({color:"#f3c574"}))),t.visible=!1,{sync(f){t.visible=!!f.relay,t.visible&&(u.visible=f.seals.length===3,c.forEach(({group:h,ring:p,diamond:_,panels:x,sparks:m},E)=>{const T=$t(f.relay,E),C=Qi(f.relay,E);h.position.set(T.x,0,T.z),_.material=p.material=C?s:i,p.rotation.x=T.task==="ring"?0:Math.PI/2,p.position.y=T.task==="ring"?1.65:.16,x.forEach((P,g)=>{P.visible=T.task==="mirror",P.material=f.relay.steps[E]>g?s:i}),Da(T).forEach((P,g)=>{m[g].position.set(P.x,1,P.z),m[g].visible=T.task==="sparks"&&!(f.relay.steps[E]&1<<g)})}))},tick(f){!t.visible||e||(c.forEach(({diamond:h,sparks:p},_)=>{h.rotation.y=f,h.position.y=2.9+.17*Math.sin(f*2+_);for(const x of p)x.visible&&(x.rotation.y=f*2,x.position.y=1+.18*Math.sin(f*3+x.position.x))}),u.position.y=5+.3*Math.sin(f))}}}function Fg(n,e=!1){const t=n[0].index!==null,i=new Set(Object.keys(n[0].attributes)),s=new Set(Object.keys(n[0].morphAttributes)),r={},o={},a=n[0].morphTargetsRelative,l=new Kt;let c=0;for(let u=0;u<n.length;++u){const d=n[u];let f=0;if(t!==(d.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const h in d.attributes){if(!i.has(h))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+h+'" attribute exists among all geometries, or in none of them.'),null;r[h]===void 0&&(r[h]=[]),r[h].push(d.attributes[h]),f++}if(f!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(a!==d.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const h in d.morphAttributes){if(!s.has(h))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;o[h]===void 0&&(o[h]=[]),o[h].push(d.morphAttributes[h])}if(e){let h;if(t)h=d.index.count;else if(d.attributes.position!==void 0)h=d.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,h,u),c+=h}}if(t){let u=0;const d=[];for(let f=0;f<n.length;++f){const h=n[f].index;for(let p=0;p<h.count;++p)d.push(h.getX(p)+u);u+=n[f].attributes.position.count}l.setIndex(d)}for(const u in r){const d=bu(r[u]);if(!d)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;l.setAttribute(u,d)}for(const u in o){const d=o[u][0].length;if(d===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[u]=[];for(let f=0;f<d;++f){const h=[];for(let _=0;_<o[u].length;++_)h.push(o[u][_][f]);const p=bu(h);if(!p)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;l.morphAttributes[u].push(p)}}return l}function bu(n){let e,t,i,s=-1,r=0;for(let c=0;c<n.length;++c){const u=n[c];if(e===void 0&&(e=u.array.constructor),e!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=u.itemSize),t!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=u.normalized),i!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=u.gpuType),s!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=u.count*t}const o=new e(r),a=new Wn(o,t,i);let l=0;for(let c=0;c<n.length;++c){const u=n[c];if(u.isInterleavedBufferAttribute){const d=l/t;for(let f=0,h=u.count;f<h;f++)for(let p=0;p<t;p++){const _=u.getComponent(f,p);a.setComponent(f+d,p,_)}}else o.set(u.array,l);l+=u.count*t}return s!==void 0&&(a.gpuType=s),a}const Ng=(n,e)=>Math.hypot(n.x-e.x,n.z-e.z)<=1.8;function xs(n,e,t,i=.14){const s=Math.hypot(e.x-n.x,e.z-n.z),r=Math.max(1,Math.ceil(s/i));for(let o=0;o<=r;o++){const a=o/r;if(t(n.x+(e.x-n.x)*a,n.z+(e.z-n.z)*a))return!1}return!0}function fa(n,e,t,{step:i=.6,radius:s=1.7,bound:r=Si}={}){if(![n.x,n.z,e.x,e.z].every(Number.isFinite)||t(n.x,n.z))return null;if(Math.hypot(n.x-e.x,n.z-e.z)<=s)return[];if(!t(e.x,e.z)&&xs(n,e,t))return[{x:e.x,z:e.z}];const o=Math.floor(r*2/i)+1,a=o*o,l=C=>({x:C%o*i-r,z:Math.floor(C/o)*i-r}),c=[],u=new Float64Array(a).fill(1/0),d=new Int32Array(a).fill(-1),f=new Uint8Array(a),h=new Int8Array(a);function p(C){if(C<0||C>=a)return!1;if(!h[C]){const P=l(C);h[C]=t(P.x,P.z)?-1:1}return h[C]>0}const _=C=>Math.max(0,Math.hypot(C.x-e.x,C.z-e.z)-s);function x(C,P){let g=c.length;for(c.push({id:C,priority:P});g>0;){const R=g-1>>1;if(c[R].priority<=P)break;[c[R],c[g]]=[c[g],c[R]],g=R}}function m(){const C=c[0],P=c.pop();if(c.length){c[0]=P;let g=0;for(;;){const R=g*2+1,D=R+1;let v=g;if(R<c.length&&c[R].priority<c[v].priority&&(v=R),D<c.length&&c[D].priority<c[v].priority&&(v=D),v===g)break;[c[g],c[v]]=[c[v],c[g]],g=v}}return C.id}const E=Math.round((n.x+r)/i),T=Math.round((n.z+r)/i);for(let C=-2;C<=2;C++)for(let P=-2;P<=2;P++){const g=E+P,R=T+C;if(g<0||R<0||g>=o||R>=o)continue;const D=R*o+g,v=l(D);p(D)&&xs(n,v,t)&&(u[D]=Math.hypot(v.x-n.x,v.z-n.z),x(D,u[D]+_(v)))}for(;c.length;){const C=m();if(f[C])continue;f[C]=1;const P=l(C);if(Math.hypot(P.x-e.x,P.z-e.z)<=Math.max(s,i*.72)){const D=[];for(let N=C;N!==-1;N=d[N])D.push(l(N));D.reverse(),s<i&&xs(D.at(-1),e,t)&&D.push({...e});const v=[];let b=n,A=0;for(;A<D.length;){let N=A;for(;N+1<D.length&&xs(b,D[N+1],t);)N++;v.push(D[N]),b=D[N],A=N+1}return v}const g=C%o,R=Math.floor(C/o);for(let D=-1;D<=1;D++)for(let v=-1;v<=1;v++){if(!v&&!D)continue;const b=g+v,A=R+D;if(b<0||A<0||b>=o||A>=o)continue;const N=A*o+b;if(f[N]||!p(N)||v&&D&&(!p(R*o+b)||!p(A*o+g)))continue;const U=l(N);if(!xs(P,U,t))continue;const H=u[C]+i*Math.hypot(v,D);H>=u[N]||(u[N]=H,d[N]=C,x(N,H+_(U)))}}return null}function Og(n,{reduced:e=!1,onMove:t,onInteract:i,onCollect:s,onEnvironmentChange:r,onGust:o}){let a=7919;const l=()=>((a=a*16807%2147483647)-1)/2147483646,c=new Th;c.background=new ot("#1a2833"),c.fog=new Wc("#1a2833",.011);const u=new Rn(46,innerWidth/innerHeight,.1,210),d=new Cg({antialias:!0,powerPreference:"high-performance"});d.setPixelRatio(Math.min(devicePixelRatio,innerWidth<600?1.15:1.5)),d.setSize(innerWidth,innerHeight),d.shadowMap.enabled=!0,d.shadowMap.type=ku,d.outputColorSpace=Mn,d.toneMapping=Vu,d.toneMappingExposure=1.25,d.domElement.setAttribute("aria-label","קמפוס בית הספר בתלת־ממד. זזים בחצים או במקשי WASD; אפשר ללחוץ על הקרקע."),n.appendChild(d.domElement),c.add(new Nh("#b3c5de","#374039",1.25));const f=new Xl("#a4bdd5",2);f.position.set(-22,34,12),f.castShadow=!0,f.shadow.mapSize.set(innerWidth<600?1024:1536,innerWidth<600?1024:1536),Object.assign(f.shadow.camera,{left:-38,right:38,top:38,bottom:-38,near:.1,far:100}),f.shadow.bias=-6e-4,f.shadow.normalBias=.035,c.add(f);const h=new Xl("#d7a270",.65);h.position.set(12,7,-40),c.add(h);const p=new Map;function _(y,L=!1){const F=`${y}/${L}`;return p.has(F)||p.set(F,new Mi({color:y,roughness:.9,...L?{emissive:y,emissiveIntensity:1.15}:{}})),p.get(F)}function x(y){const L=document.createElement("canvas");L.width=L.height=256;const F=L.getContext("2d");F.fillStyle=y==="grass"?"#798073":y==="brick"?"#9b8a79":"#969a9b",F.fillRect(0,0,256,256);for(let X=0;X<11e3;X++){const me=Math.floor(l()*60),Ce=l()*256,Ae=l()*256;F.fillStyle=`rgba(${me},${me},${me},${l()*.13})`,F.fillRect(Ce,Ae,y==="grass"?1:2,y==="grass"?4:2)}if(y==="brick"){F.strokeStyle="#6b6f6b",F.lineWidth=2;for(let X=0;X<256;X+=32){F.beginPath(),F.moveTo(0,X),F.lineTo(256,X),F.stroke();for(let me=X%64?32:0;me<256;me+=64)F.beginPath(),F.moveTo(me,X),F.lineTo(me,X+32),F.stroke()}}const k=new Mo(L);return k.colorSpace=Mn,k.wrapS=k.wrapT=Sa,k.repeat.set(y==="grass"?26:3,y==="grass"?26:3),k.anisotropy=4,k}const m=new Mi({color:"#667560",map:x("grass"),roughness:1}),E=new Mi({color:"#a8aba5",map:x("concrete"),roughness:.95}),T=new Mi({color:"#b0a698",map:x("brick"),roughness:1}),C=new Mi({color:"#717677",map:x("concrete"),roughness:.95});function P(y,L,F,k,X,me=c,Ce=!1){const Ae=typeof L=="string"?_(L,Ce):L,Ue=new en(y,Ae);return Ue.position.set(F,k,X),Ue.castShadow=!Ce,Ue.receiveShadow=!Ce,me.add(Ue),Ue}const g=(y,L,F,k,X,me,Ce,Ae=c,Ue=!1)=>P(new ws(k,X,me),Ce,y,L,F,Ae,Ue),R=(y,L,F,k,X,me=c,Ce=1,Ae=!1)=>P(new Dr(k,12,8),X,y,L,F,me,Ae),D=(y,L,F,k,X,me,Ce=c,Ae=8)=>P(new qc(k,X,Ae),me,y,L,F,Ce),v=(y,L,F,k,X,me,Ce=c,Ae=10)=>P(new Ei(k,k,X,Ae),me,y,L,F,Ce);function b(y,L,F,k,X,me,Ce,Ae=c){const Ue=R(y,L,F,1,Ce,Ae);return Ue.scale.set(k,X,me),Ue}function A(y,L,F,k,X=c){const me=new B(...y),Ce=new B(...L),Ae=Ce.clone().sub(me),Ue=P(new Ei(F*.7,F,Ae.length(),7),k,...me.clone().add(Ce).multiplyScalar(.5).toArray(),X);return Ue.quaternion.setFromUnitVectors(new B(0,1,0),Ae.normalize()),Ue}const N=[];let U=null;const H=(y,L)=>Math.floor(y/8)+32*Math.floor(L/8),q=(y,L,F)=>N.push({x:y,z:L,r:F});function Z(y,L,F=0){return Math.abs(y)>Si||Math.abs(L)>Si||Gd(y,L)||(U?U.get(H(y,L))||[]:N).some(k=>!k.disabled&&(k.hx!==void 0?Math.abs(y-k.x)<k.hx+.28+F&&Math.abs(L-k.z)<k.hz+.28+F:k.r?Math.hypot(y-k.x,L-k.z)<k.r+.35+F:((y-k.x)/(k.rx+.3+F))**2+((L-k.z)/(k.rz+.3+F))**2<1))}function ie(y,L,F,k,X,me=.03){const Ce=P(new Ei(1,1,.045,48),X,y,me,L);return Ce.scale.set(F,1,k),Ce}const Q=g(0,-.2,0,260,.3,260,m);Q.castShadow=!1;for(let y=0;y<9;y++){const L=y/9*Math.PI*2,F=b(Math.cos(L)*154,3,Math.sin(L)*154,24,9+l()*9,20,"#273c3d");F.castShadow=!1}function te(y,L=2.3){for(let F=0;F<y.length-1;F++){const k=y[F],X=y[F+1],me=Math.hypot(X[0]-k[0],X[1]-k[1]),Ce=g((k[0]+X[0])/2,.015,(k[1]+X[1])/2,L,.055,me,C);Ce.rotation.y=Math.atan2(X[0]-k[0],X[1]-k[1]),ie(k[0],k[1],L/2,L/2,C,.046)}}te([[0,25],[0,12],[-3,4],[0,-4],[0,-12]],3.1),te([[-3,4],[-10,1],[-13,-9],[-15,-17]],2.5),te([[0,-4],[8,-5],[13,-7],[20,-13]],2.5),te([[0,12],[10,14],[19,18]],2.5),te([[-13,-9],[-7,-15],[0,-16],[8,-17],[13,-7]],2.1),te([[0,-12],[7,-17],[7,-24],[0,-25]],2.2),ie(0,9,4.6,3.8,E,.05),ie(-17,13,7.1,5.5,"#4c5c52",.025);const ne=new Mi({color:"#214d5b",roughness:.18,metalness:.45});ie(-17,13,6.7,5.2,ne,.06),N.push({x:-17,z:13,rx:6.5,rz:5});for(let y=0;y<28;y++){const L=l()*Math.PI*2,F=-17+Math.cos(L)*7,k=13+Math.sin(L)*5.5;for(let X=0;X<3;X++)A([F+X*.1,0,k],[F+X*.1+.08,.5+l()*.5,k],.018,"#7a8464")}for(let y=0;y<7;y++){const L=y*.9;ie(-17+Math.cos(L)*4.6,13+Math.sin(L)*3,.28,.23,"#71836b",.09)}const fe=new Mi({color:"#687b83",roughness:.22,metalness:.55}),Pe=new Mi({color:"#c7b38d",emissive:"#b38551",emissiveIntensity:.55,roughness:.35}),ze=[],Je={x:-2,z:-16.86,hx:1.34,hz:.09};function ft(){const y=new dt;y.position.set(-2,0,-20),c.add(y),g(0,4.9,0,12,3.2,6,T,y),g(0,6.65,0,12.6,.35,6.6,E,y),g(0,.03,0,12,.08,6,E,y),g(0,1.65,-2.85,12,3.3,.3,T,y);for(const L of[-1,1])g(L*5.85,1.65,0,.3,3.3,6,T,y),g(L*3.68,1.65,2.9,4.64,3.3,.2,T,y);g(0,1.2,-2.65,5,1.4,.04,"#526660",y),g(0,1.2,-2.6,2.2,.9,.04,"#d6cfb6",y),g(0,.2,3.5,13,.4,1.5,E,y),g(0,.08,4.15,6,.16,.7,E,y);for(const L of[-1,1]){const F=new dt;F.position.set(L*1.34,0,3.14),y.add(F),g(-L*.67,1.65,0,1.32,3.3,.07,fe,F),v(-L*1.13,1.5,.08,.025,.5,"#b5b9b6",F),ze.push(F)}g(0,3.7,3.8,3.4,.13,1.5,"#45555d",y);for(const L of[-4.75,-3.15,3.15,4.75])for(const F of[1.9,4.65])g(L,F,3.045,1.3,1.7,.12,"#34424a",y),g(L,F,3.115,1.12,1.5,.03,(L+F)%2>.9?Pe:fe,y),g(L,F,3.14,.04,1.55,.05,"#9a9e98",y),g(L,F+.02,3.14,1.16,.04,.05,"#9a9e98",y);for(const L of[-5.2,-1.7,1.7,5.2])g(L,3.25,3.11,.15,6.5,.15,"#c4c2b8",y);g(-3.9,7.05,-.8,2,.7,1.1,"#626e73",y);for(let L=0;L<7;L++)g(-4.7+L*.25,7.1,-.2,.05,.45,.05,"#34434b",y);v(4,8,-1,.06,2.7,"#7a868b",y),A([3.5,8.5,-1],[4.5,8.5,-1],.025,"#929a9b",y),N.push(Je,{x:-2,z:-22.85,hx:6,hz:.15},{x:-7.85,z:-20,hx:.15,hz:3},{x:3.85,z:-20,hx:.15,hz:3},{x:-5.68,z:-17.1,hx:2.32,hz:.1},{x:1.68,z:-17.1,hx:2.32,hz:.1})}ft();function re(y,L,F=!1){const k=new dt;if(k.position.set(y,0,L),c.add(k),g(0,1.9,0,5.5,3.8,4.4,F?"#445e60":T,k),g(0,3.95,0,5.8,.25,4.7,E,k),F){for(const X of[-2,-.7,.7,2])g(X,2,2.23,1.05,2.9,.08,fe,k),g(X,2,2.3,.06,3.6,.08,"#a2b2ab",k);for(const X of[-1.5,0,1.5])g(-2.8,2,X,.08,2.9,1.1,fe,k)}else g(-1.8,2.1,2.25,1.3,1.5,.08,Pe,k),g(1.8,2.1,2.25,1.3,1.5,.08,fe,k);return g(0,1.5,2.3,1.2,3,.1,"#293b42",k),g(0,1.6,2.37,.9,2.5,.05,fe,k),g(0,.12,2.8,3,.24,1.1,E,k),q(y,L,3.45),k}re(-17,-12),re(18,-11,!0);const oe=new dt;oe.position.set(16,0,16),c.add(oe);for(const y of[-.85,.85])for(const L of[-.85,.85])A([y,0,L],[y*.6,8,L*.6],.085,"#737b7d",oe);for(let y=0;y<8;y+=2)A([-.85,y,-.85],[.85,y+2,-.85],.04,"#646f73",oe),A([-.85,y,.85],[.85,y+2,.85],.04,"#646f73",oe),g(0,y,0,1.8,.08,1.8,"#566269",oe);g(0,8.2,0,2.8,.2,2.8,"#59666b",oe),v(0,9.5,0,.045,2.6,"#9aa9ad",oe),g(0,10.4,0,1.7,.05,.05,"#9aa9ad",oe);const Ee=P(new Dr(.65,16,10,0,Math.PI*2,0,Math.PI/2),"#819398",.85,7.8,.9,oe);Ee.rotation.x=-Math.PI/2,q(16,16,1.7);function We(y,L){const F=Math.hypot(L[0]-y[0],L[1]-y[1]),k=Math.ceil(F/2.5);for(let X=0;X<=k;X++){const me=X/k;g(y[0]+(L[0]-y[0])*me,1.05,y[1]+(L[1]-y[1])*me,.07,2.1,.07,"#48585e")}for(const X of[.5,1.4,2.05])A([y[0],X,y[1]],[L[0],X,L[1]],.018,"#738184")}We([-27,-27],[-3,-27]),We([3,-27],[27,-27]),We([-27,-27],[-27,-4]),We([-27,4],[-27,27]),We([27,-27],[27,8]),We([27,16],[27,27]),We([-27,27],[-4,27]),We([4,27],[27,27]),g(-2.5,2.4,-25,.38,4.8,.5,E),g(2.5,2.4,-25,.38,4.8,.5,E),g(0,4.8,-25,5.4,.3,.6,"#5b686c");const Ie=new dt;c.add(Ie);const it=[-1,1].map(y=>{const L=new dt;L.position.set(y*2.2,0,-25),Ie.add(L);for(let F=0;F<7;F++)g(-y*F*.32,1.9,0,.045,3.8,.08,"#66757a",L);for(const F of[.7,2.7,3.8])g(-y*1,F,0,2.15,.06,.08,"#66757a",L);return L}),Bt=[-1.15,0,1.15].map(y=>g(y,4.8,-24.65,.28,.13,.06,"#b66c4f",c,!0)),Qe=new wo("#accca0",0,8,2);Qe.position.set(0,3.5,-25),c.add(Qe);function Et(y,L,F,k="#d9b574"){const X=document.createElement("canvas");X.width=X.height=64;const me=X.getContext("2d"),Ce=me.createRadialGradient(32,32,1,32,32,32);Ce.addColorStop(0,"rgba(244,211,153,.24)"),Ce.addColorStop(1,"rgba(244,211,153,0)"),me.fillStyle=Ce,me.fillRect(0,0,64,64);const Ae=new en(new sr(F,F),new oi({map:new Mo(X),transparent:!0,depthWrite:!1,color:k}));return Ae.rotation.x=-Math.PI/2,Ae.position.set(y,.11,L),c.add(Ae),Ae}function O(y,L){v(y,1.9,L,.045,3.8,"#43525b"),g(y,3.75,L+.24,.15,.13,.65,"#b8b6a3",c);const F=g(y,3.68,L+.35,.11,.025,.4,"#d6b884",c,!0),k=Et(y,L+1.1,4.8);return{bulb:F,pool:k}}const st=O(-2,10);[[2,-4],[-12,-7],[12,-5],[10,12],[-5,-13],[6,-22],[2,-25],[-8,2],[18,4]].forEach(y=>O(...y));const nt=new wo("#e5b777",12,14,2);nt.position.set(-2,3.8,-15.5),c.add(nt);function gt(y,L,F=0){const k=new dt;k.position.set(y,0,L),k.rotation.y=F,c.add(k);for(let X=0;X<4;X++)g(0,.56,-.33+X*.22,2.5,.06,.17,"#837864",k);for(let X=0;X<3;X++)g(0,.95+X*.17,-.48,2.5,.12,.06,"#837864",k);for(const X of[-.9,.9])g(X,.27,0,.07,.54,.73,"#3d4a51",k),g(X,.98,-.48,.06,.84,.06,"#3d4a51",k);q(y,L,1.15)}gt(8,15),gt(-10,-8,Math.PI/2),gt(-6,10),g(11,.015,22,11,.05,7,"#606f6c");for(const y of[5.6,16.4])g(y,.06,22,.04,.01,6.7,"#b8b9ad");for(const y of[18.7,25.3])g(11,.06,y,10.8,.01,.04,"#b8b9ad");const Re=P(new Zn(1.75,1.78,48),"#b8b9ad",11,.07,22);Re.rotation.x=-Math.PI/2,v(16.3,1.65,22,.07,3.3,"#6e7b7d"),g(15.95,3.1,22,.08,1.05,1.6,"#9da9a5"),g(15.89,3.05,22,.02,.5,.75,"#c1c6b5");const Ct=P(new ji(.27,.025,5,18),"#a87957",15.58,2.83,22);Ct.rotation.x=Math.PI/2,q(16.3,22,.25);for(let y=0;y<3;y++){const L=-20.5+y*.5,F=P(new ji(.35,.035,5,12,Math.PI),"#7e898a",L,.35,-8.5);F.rotation.y=Math.PI/2}for(const y of[-22,-21]){const L=P(new ji(.31,.035,5,18),"#26353d",y,.35,-8.5);L.rotation.y=Math.PI/2}A([-22,.35,-8.5],[-21.5,.9,-8.5],.025,"#93624d"),A([-21,.35,-8.5],[-21.5,.9,-8.5],.025,"#93624d"),A([-22,.35,-8.5],[-21,.35,-8.5],.025,"#93624d");function Fe(y,L,F=1){const k=new dt;k.position.set(y,0,L),k.scale.setScalar(F),c.add(k);const X=(l()-.5)*.6;A([0,0,0],[X,4.6,0],.19,"#665f51",k);for(let me=0;me<4;me++){const Ce=me*Math.PI*.5+l()*.5,Ae=Math.cos(Ce)*(1+l()*.5),Ue=Math.sin(Ce)*(1+l()*.5),Ft=3.5+l()*2;A([X*.6,2.4+me*.4,0],[Ae,Ft,Ue],.075,"#605c4e",k);const Xn=b(Ae,Ft+.7,Ue,1.4+l()*.6,1.5+l()*.6,1.3+l()*.6,["#344a3e","#405947","#465b49","#51634c"][me],k);Xn.rotation.z=(l()-.5)*.8}q(y,L,.45*F)}for(let y=0;y<56;y++){const L=y%4,F=-29+Math.floor(y/4)*4.1,k=l()*2;Fe(L<2?F:(L===2?-29:29)+k,L<2?(L===0?-29:29)+k:F,.75+l()*.45)}[[-23,-8],[-24,-3],[-22,1],[-20,-3],[-8,20],[-5,23],[6,26],[21,5],[24,1],[21,-2],[8,-13],[-7,-5],[-9,-18],[22,22],[-24,22],[-9,16]].forEach(([y,L])=>Fe(y,L,.65+l()*.4));for(let y=0;y<120;y++){const L=(l()-.5)*54,F=(l()-.5)*54;if(!(Math.abs(L)<4||N.some(k=>Math.hypot(L-k.x,F-k.z)<(k.r||7)+.8)))if(y%5===0){const k=b(L,.2,F,.45+l()*.3,.25,.4,"#737b72");k.rotation.y=l()*6}else for(let k=0;k<3;k++)A([L+k*.1,0,F],[L+k*.1+.08,.25+l()*.25,F+.06],.012,"#6c7c5d")}function Ve(y,L,F,k,X,me=""){const Ce=document.createElement("canvas");Ce.width=1024,Ce.height=256;const Ae=Ce.getContext("2d");Ae.fillStyle="#243139",Ae.fillRect(0,0,1024,256),Ae.strokeStyle="#a5a894",Ae.lineWidth=4,Ae.strokeRect(12,12,1e3,232),Ae.textAlign="center",Ae.direction="rtl",Ae.fillStyle="#e1dfd1",Ae.font="bold 62px Arial",Ae.fillText(X,512,me?108:150),me&&(Ae.font="34px Arial",Ae.fillStyle="#bfc6bb",Ae.fillText(me,512,190));const Ue=new Mo(Ce);Ue.colorSpace=Mn,Ue.anisotropy=4;const Ft=new en(new sr(k,k/4),new oi({map:Ue,side:Gn}));return Ft.position.set(y,L,F),c.add(Ft),Ft}Ve(-2,5.75,-16.75,10,"בית הספר שי עגנון","כיתה ז׳ איינשטיין · כיתת הייטק"),Ve(-17,3.55,-9.65,4.4,"01 · ספריית איינשטיין"),Ve(18,3.55,-8.65,4.4,"02 · מעבדת ההייטק"),Ve(16,3.2,17.1,3.2,"03 · תחנת הקשר"),Ve(0,5.55,-24.8,4.8,"יציאה"),g(-4,1.1,5,.07,2.2,.07,"#64716d"),Ve(-4,2.1,5.1,3.5,"קמפוס שי עגנון","ז׳ איינשטיין · כיתת הייטק");const I=Dg({scene:c,box:g,cyl:v,cone:D,segment:A,ellipsoid:b,path:te,groundDisc:ie,sign:Ve,circleObstacle:q});U=new Map;for(const y of N){const L=(y.hx??y.r??y.rx)+.4,F=(y.hz??y.r??y.rz)+.4;for(let k=Math.floor((y.x-L)/8);k<=Math.floor((y.x+L)/8);k++)for(let X=Math.floor((y.z-F)/8);X<=Math.floor((y.z+F)/8);X++){const me=k+32*X;U.has(me)||U.set(me,[]),U.get(me).push(y)}}R(-38,30,-57,1.7,"#bbcbd3",c,3,!0);const S=[];for(let y=0;y<85;y++){const L=l()*Math.PI*2,F=65+l()*35;S.push(Math.cos(L)*F,25+l()*40,Math.sin(L)*F)}const $=new Kt;$.setAttribute("position",new Tt(S,3)),c.add(new Ih($,new od({color:"#bbcad6",size:.08,transparent:!0,opacity:.65})));const se=new Map;function ce(y,L,F){const k=new dt;return k.position.set(L,0,F),c.add(k),g(0,.45,0,.85,.9,.6,"#4b575a",k),g(0,.95,0,1.05,.1,.8,"#7c8580",k),se.set(y,k),k}const ee=ce("card",-21,-3);g(0,1.05,0,.48,.035,.3,"#c7c8b8",ee),g(-.11,1.073,0,.12,.005,.18,"#507c86",ee);for(let y=0;y<3;y++)g(.08,1.073,-.07+y*.065,.17,.005,.015,"#606765",ee);const De=ce("fuse",21,3),_e=v(0,1.09,0,.07,.45,"#d6ccac",De);_e.rotation.z=Math.PI/2;for(const y of[-.21,.21]){const L=v(y,1.09,0,.075,.07,"#a6b0b2",De);L.rotation.z=Math.PI/2}const Ne=ce("antenna",-8,22);g(0,1.12,0,.35,.25,.22,"#2e3e48",Ne),A([0,1.25,0],[.24,2.05,.02],.018,"#bbc5c1",Ne),g(0,1.14,.12,.19,.1,.025,"#718576",Ne);const Le=Ye.map((y,L)=>{const F=new dt;F.position.set(y.x+1.2,0,y.z-.9),c.add(F),g(0,.65,0,.7,1.3,.45,"#4a585d",F);const k=g(0,1.05,.24,.48,.34,.025,"#a4784e",F,!0);g(0,.67,.25,.45,.06,.05,"#7b8988",F);const X=new wo("#e3ae72",0,7,2);return X.position.set(y.x,2.5,y.z),c.add(X),{g:F,screen:k,light:X}}),le=Pg({scene:c,box:g,ball:R,cyl:v,mesh:P,segment:A,mat:_,sign:Ve,softPool:Et,doorLeaves:ze,doorBlocker:Je,lampFixture:st}),pe={value:new B},$e={value:0},ke=new Set;c.traverse(y=>{if(y.isMesh)for(const L of[y.material].flat())ke.add(L)});for(const y of ke)y.onBeforeCompile=L=>{L.uniforms.sightPlayer=pe,L.uniforms.sightEnabled=$e,L.vertexShader=`varying vec3 vSightPosition;
`+L.vertexShader,L.vertexShader=L.vertexShader.replace("#include <project_vertex>",`#include <project_vertex>
        vSightPosition=(modelMatrix*vec4(transformed,1.0)).xyz;`),L.fragmentShader=`varying vec3 vSightPosition;
uniform vec3 sightPlayer;
uniform float sightEnabled;
`+L.fragmentShader,L.fragmentShader=L.fragmentShader.replace("#include <clipping_planes_fragment>",`#include <clipping_planes_fragment>
        if(sightEnabled>0.5 && vSightPosition.y>0.22){
          vec3 sightLine=sightPlayer-cameraPosition;
          float sightLength=length(sightLine);
          vec3 sightDirection=sightLine/sightLength;
          vec3 sightOffset=vSightPosition-cameraPosition;
          float sightDepth=dot(sightOffset,sightDirection);
          float sightDistance=length(sightOffset-sightDirection*sightDepth);
          if(sightDepth>0.0 && sightDepth<sightLength+0.35 && sightDistance<2.6) discard;
        }`)},y.customProgramCacheKey=()=>"player-sight-corridor-v1";c.updateMatrixWorld(!0);const Me=new Set([I,Ie,...Bt,...se.values(),...Le.map(y=>y.g),...le.dynamic]),qe=new Map,z=[];c.traverse(y=>{if(!y.isMesh)return;let L=y;for(;L;){if(Me.has(L))return;L=L.parent}if(y.material.transparent)return;const F=qe.get(y.material)||[];F.push(y.geometry.clone().applyMatrix4(y.matrixWorld)),qe.set(y.material,F),z.push(y)});for(const[y,L]of qe){const F=Fg(L);if(!F)continue;const k=new en(F,y);k.castShadow=!y.isMeshBasicMaterial&&!(y.emissiveIntensity>1),k.receiveShadow=!0,c.add(k);for(const X of L)X.dispose()}for(const y of z)y.removeFromParent(),y.geometry.dispose();function ge(y="#a26e4e",L="#c7a78b",F="#313236",k=!0){const X=new dt,me=[],Ce=[];for(const Ae of[-1,1]){const Ue=new dt;Ue.position.set(Ae*.13,.91,0),X.add(Ue),P(new Xs(.1,.59,4,8),"#3e4b55",0,-.36,0,Ue),b(0,-.83,.09,.115,.08,.23,"#27343a",Ue),me.push(Ue)}P(new Xs(.235,.4,4,10),y,0,1.22,0,X).scale.z=.7,b(0,1.48,-.08,.24,.16,.18,y,X),v(0,1.57,0,.075,.15,L,X),b(0,1.77,.015,.17,.215,.16,L,X),b(0,1.89,-.035,.177,.12,.17,F,X),b(0,1.82,-.12,.17,.16,.06,F,X);for(const Ae of[-.065,.065])R(Ae,1.79,.169,.015,"#343833",X);b(0,1.73,.18,.025,.035,.045,L,X);for(const Ae of[-1,1]){const Ue=new dt;Ue.position.set(Ae*.27,1.47,0),X.add(Ue),P(new Xs(.075,.36,4,8),y,0,-.21,0,Ue),b(0,-.49,0,.07,.1,.065,L,Ue),Ue.rotation.z=Ae*.09,Ce.push(Ue)}if(k){const Ae=P(new Xs(.19,.26,4,8),"#33434a",0,1.2,-.24,X);Ae.scale.z=.55;for(const Ue of[-1,1])g(Ue*.14,1.31,.16,.04,.43,.025,"#c0b69b",X);g(0,1.2,-.37,.21,.1,.035,"#8b9b91",X)}return X.userData={legs:me,arms:Ce},X}const K=ge();K.position.set(0,0,9),c.add(K);const xe=P(new Ei(.035,.045,.18,8),"#303c42",.3,.92,.13,K);xe.rotation.x=Math.PI/2,R(.3,.92,.23,.03,"#e6d4a5",K,1,!0);const ue=new zt;ue.position.set(.3,.1,6),K.add(ue);const ae=new zh("#f0dab1",18,13,.36,.65,1.6);ae.position.set(.3,.95,.24),ae.target=ue,K.add(ae);const we=P(new Zn(.43,.46,40),"#b9c2b3",0,.1,9,c,!0);we.rotation.x=-Math.PI/2;function je(y="#9f704e",L=!1){const F=new dt,k=[];b(0,.48,0,.21,.26,.56,y,F),b(0,.67,.43,.22,.24,.24,y,F);const X=D(0,.61,.7,.115,.35,"#c7c3ac",F,10);X.rotation.x=Math.PI/2,R(0,.61,.88,.04,"#293533",F);for(const Ce of[-.13,.13])D(Ce,.99,.42,.1,.3,y,F,4),D(Ce,.99,.45,.055,.18,"#62564c",F,4),R(Ce,.73,.59,.022,"#252d2d",F);for(const Ce of[-.14,.14])for(const Ae of[-.31,.32]){const Ue=new dt;Ue.position.set(Ce,.45,Ae),F.add(Ue),v(0,-.19,0,.045,.4,"#514c44",Ue,7),b(0,-.39,.03,.05,.04,.1,"#353c39",Ue),k.push(Ue)}const me=b(0,.56,-.76,.16,.17,.49,y,F);return me.rotation.x=-.4,b(0,.72,-1.1,.13,.13,.2,"#c6c4ae",F),F.userData={legs:k},L&&F.scale.setScalar(.85),F}function yt(y,L){const F=new dt;if(y==="rabbit"){b(0,.24,0,.19,.22,.32,L,F),b(0,.43,.24,.15,.17,.16,L,F);for(const k of[-.075,.075]){const X=b(k,.71,.2,.04,.21,.045,L,F);X.rotation.z=k>0?-.15:.15,R(k,.47,.37,.014,"#263330",F)}b(0,.16,-.28,.085,.09,.08,"#bcbdb0",F);for(const k of[-.15,.15])b(k,.07,.13,.08,.06,.16,L,F)}else{b(0,.32,0,.18,.23,.3,L,F),b(0,.59,.18,.13,.14,.13,L,F);const k=D(0,.57,.37,.035,.15,"#ad9367",F,8);k.rotation.x=Math.PI/2;for(const X of[-.09,.09])R(X,.62,.28,.012,"#222e30",F);for(const X of[-.075,.075])v(X,.08,.04,.016,.16,"#887c62",F,6);b(-.16,.34,-.02,.04,.17,.25,"#58676b",F),b(.16,.34,-.02,.04,.17,.25,"#58676b",F)}return F}const xt=Ye.map((y,L)=>{const F=ge(["#65747c","#6c7357","#7c5350"][L],["#b5947b","#c7a88a","#af8c72"][L],["#353231","#3c332c","#292e31"][L],L!==1);F.position.set(y.x,0,y.z),F.rotation.y=.3-L*.45,c.add(F);const k=P(new Zn(.65,.68,36),y.color,y.x,.1,y.z,c,!0);k.rotation.x=-Math.PI/2;const X=R(y.x,2.35,y.z,.065,"#c1b995",c,1,!0);return{g:F,marker:X,ring:k}}),mn=[];for(let y=0;y<16;y++){const L=y%3===0?"fox":y%3===1?"rabbit":"bird",F=L==="fox"?je("#947553",!0):yt(L,L==="rabbit"?"#9d9d8c":"#7d8a8b");let k=(l()-.5)*43,X=(l()-.5)*43;for(let me=0;me<80&&Z(k,X);me++)k=(l()-.5)*43,X=(l()-.5)*43;F.position.set(k,0,X),c.add(F),mn.push({g:F,type:L,angle:l()*Math.PI*2,speed:.3+l()*.55,turn:l()*4})}for(let y=0;y<3;y++){const L=yt("duck","#8f947b");L.scale.setScalar(1.05),c.add(L),mn.push({g:L,type:"duck",angle:y*2,speed:.3,turn:0})}const on=Array.from({length:12},(y,L)=>{const F=[[-4,12],[-8,4],[-14,-3],[-9,-12],[4,-10],[10,-2],[18,2],[19,11],[9,21],[-7,20],[-23,-1],[5,-23]],[k,X]=F[L];return{x:k,z:X,mesh:R(k,1.1,X,.055,"#c9c693",c,1,!0)}}),di=P(new Zn(.26,.3,24),"#c1c9b4",0,.12,0,c,!0);di.rotation.x=-Math.PI/2,di.visible=!1;const Ts=Ug(c,e),As=Ig(c,e),Pt=new Set;let $n={x:0,z:0},xn=null,Ht=!1,gn=!1,fi=0,Sn=0,Ut=0,Rs=!1,En=Fr(),_n=!1,ur=!1;const Ge={goal:null,endpoint:null,route:[],following:!1,arrived:!1,blocked:!1,anchor:null,lastPlan:-10};let Ln=[],Dn=null,w=-1,V=!1,j=!1,Y=0,G=0;const he=g(0,1.05,.5,.55,.4,.4,"#d6b783",K);he.visible=!1;const be=Array.from({length:4},(y,L)=>{const F=new dt;c.add(F),F.visible=!1;const k=P(new Zn(.65,.82,24),new oi({color:"#efd09b",depthTest:!1,side:Gn}),0,.19,0,F);k.rotation.x=-Math.PI/2,k.renderOrder=3;for(let X=0;X<=L;X++)g((X-L/2)*.24,.22,0,.12,.06,.28,"#fff1c7",F,!0);return F}),Se=new dt;c.add(Se),Se.visible=!1;const de={};for(const y of["evidence","witness","robot","survey","freight","optics","shadow","rescue","relay","courier"]){const L=new dt;L.visible=!1,Se.add(L),de[y]=L}g(0,.8,0,1.4,1.1,.15,"#6f8582",de.evidence);for(let y=0;y<3;y++)g((y-1)*.4,.85,.1,.28,.45,.03,"#ded8ba",de.evidence);de.witness.add(ge("#657f8c"));function He(){const y=new dt;g(0,.65,0,.7,.65,.5,"#b3bba7",y),g(0,.86,.28,.4,.13,.04,"#cfe9ca",y,!0);for(const L of[-.4,.4]){const F=v(L,.22,0,.18,.12,"#3e5157",y);F.rotation.z=Math.PI/2}return y}de.robot.add(He());for(const y of[-.4,.4])A([y,0,.3],[0,1.2,0],.04,"#acb7a1",de.survey);A([0,0,-.4],[0,1.2,0],.04,"#acb7a1",de.survey),g(0,1.25,0,.6,.2,.3,"#cfb77d",de.survey);for(let y=0;y<3;y++)g((y-1)*.45,.25+(y===1?.5:0),0,.4,.5,.5,["#ac8c61","#8ba58f","#91a7b2"][y],de.freight);g(0,1,0,.65,.4,.5,"#819b9e",de.optics);const Xe=v(0,1,.35,.17,.3,"#d1bd89",de.optics);Xe.rotation.x=Math.PI/2,A([0,0,0],[0,.8,0],.05,"#9ba9a1",de.optics),v(0,1,0,.07,2,"#d4bb88",de.shadow),R(.7,2.2,0,.18,"#f1d8a3",de.shadow,1,!0),g(0,.4,0,1,.8,.8,"#8d9e7c",de.rescue),D(0,1,0,.85,.5,"#a78d65",de.rescue,4),g(0,.25,.42,.4,.5,.03,"#263b40",de.rescue),v(0,1,0,.05,2,"#81969d",de.relay);for(let y=0;y<3;y++)g(0,1.3+y*.3,0,1-y*.2,.05,.05,"#d5bf91",de.relay);g(0,.8,0,.8,1.6,.5,"#738f91",de.courier),g(0,1,.28,.55,.08,.03,"#d5c28e",de.courier,!0);function Oe(y,L=0,F=!1){be.forEach((k,X)=>{var Ce;const me=((Ce=y==null?void 0:y.points)==null?void 0:Ce[X])||(X===0?y:null);k.visible=Ht&&!!me,me&&(k.position.set(me.x,0,me.z),k.scale.setScalar(F?.85:X===L?1.2:.8))}),Se.visible=Ht&&!!y&&!y.points;for(const[k,X]of Object.entries(de))X.visible=(y==null?void 0:y.kind.startsWith(k+"-"))||!1;y&&Se.position.set(y.x+1.2,0,y.z)}const Ke=He(),ct=je("#c49369",!0);c.add(Ke,ct),Ke.visible=ct.visible=!1;const Te={type:null,key:null,x:0,z:0,route:[],planned:-10};function Dt(y,L,F){if(!Ht||!y){Te.type=null,Ke.visible=ct.visible=!1;return}if(Te.key!==L||Te.type!==y){Te.key=L,Te.type=y;let k={x:F.x,z:F.z};if(Z(k.x,k.z)){for(const[X,me]of[[F.x-1,F.z],[F.x,F.z-1],[F.x+1,F.z+1]])if(!Z(X,me)){k={x:X,z:me};break}}Te.x=k.x,Te.z=k.z,Te.route=[],Te.planned=-10}Ke.visible=y==="robot",ct.visible=y==="fox",(y==="robot"?Ke:ct).position.set(Te.x,0,Te.z)}function _t(y){if(Te.type!=="robot")return;if(Math.hypot(Te.x-K.position.x,Te.z-K.position.z)>1.15){for(Ut-Te.planned>.8&&(Te.route=fa({x:Te.x,z:Te.z},K.position,Z,{radius:1.1})||[],Te.planned=Ut);Te.route.length&&Math.hypot(Te.route[0].x-Te.x,Te.route[0].z-Te.z)<.12;)Te.route.shift();const F=Te.route[0];if(F){const k=F.x-Te.x,X=F.z-Te.z,me=Math.hypot(k,X),Ce=Math.min(me,y*2.6),Ae={x:Te.x+k/me*Ce,z:Te.z+X/me*Ce};xs(Te,Ae,Z)&&(Te.x=Ae.x,Te.z=Ae.z,Ke.rotation.y=Math.atan2(k,X))}}Ke.position.set(Te.x,0,Te.z)}function Be(){return Te.type?{type:Te.type,x:Te.x,z:Te.z}:null}function Rt(y){!Ht||gn||j||(V=!!y,Y=0)}function lt(){return!Ht||gn||j||V||G>0?!1:(rs(),_n=!1,qn(),Y=.24,G=1.8,!0)}function vn(){return{crouching:V,carrying:j,dashing:Y>0,dashCooldown:+G.toFixed(2)}}const bn=new Rh(new Zn(.09,.16,8),new oi({color:"#efd09b",transparent:!0,opacity:.95,depthWrite:!1,depthTest:!1,side:Gn}),160);bn.count=0,bn.frustumCulled=!1,bn.renderOrder=2,c.add(bn);const kt=new dt;c.add(kt),kt.visible=!1;const ss=P(new Zn(.56,.63,32),"#e4be7d",0,.16,0,kt,!0);ss.rotation.x=-Math.PI/2;const Lt=D(0,2.8,0,.22,.5,"#e4be7d",kt,4);Lt.rotation.z=Math.PI,P(new Ei(.025,.025,2.3,6),new oi({color:"#e4be7d",transparent:!0,opacity:.3,depthWrite:!1}),0,1.4,0,kt);const tn=new vt,wn=new cr().setFromEuler(new ni(-Math.PI/2,0,0)),nn=new B(1,1,1);function Wt(){if(bn.count=0,kt.visible=Ht&&!!Ge.goal,!Ht||!Ge.goal)return;const y=Ge.endpoint||Ge.goal;kt.position.set(y.x,0,y.z);let L={x:K.position.x,z:K.position.z},F=0;for(const k of Ge.route){const X=Math.hypot(k.x-L.x,k.z-L.z),me=Math.ceil(X/.75);for(let Ce=1;Ce<=me&&F<160;Ce++){const Ae=Ce/me;tn.compose(new B(L.x+(k.x-L.x)*Ae,.15,L.z+(k.z-L.z)*Ae),wn,nn),bn.setMatrixAt(F++,tn)}L=k}bn.count=F,bn.instanceMatrix.needsUpdate=!0,w=Ut}function hi(){if(!Ge.goal)return;const y={x:K.position.x,z:K.position.z},L=Ng(y,Ge.goal)?[]:fa(y,Ge.goal,(F,k)=>Z(F,k,.18))||fa(y,Ge.goal,Z);Ge.route=L||[],Ge.endpoint=L===null?null:L.at(-1)||y,Ge.blocked=L===null,Ge.arrived=L!==null&&L.length===0,Ge.anchor=y,Ge.lastPlan=Ut,Ge.following&&(Ln=[...Ge.route],Dn=Ge.blocked||Ge.arrived?null:"guide",Dn||(Ge.following=!1)),Wt()}function pi(y,L){return!Number.isFinite(y)||!Number.isFinite(L)||Math.abs(y)>Si||Math.abs(L)>Si?!1:(Ge.goal={x:y,z:L},Ge.following=!1,Ln=[],Dn=null,xn=null,hi(),!Ge.blocked)}function qn(){Ge.following=!1,Ln=[],Dn=null,xn=null,di.visible=!1}function Id(){return!Ht||gn||!Ge.goal||(rs(),_n=!1,hi(),Ge.blocked||Ge.arrived)?!1:(Ge.following=!0,Dn="guide",Ln=[...Ge.route],Pt.clear(),$n={x:0,z:0},!0)}function Ud(){let y=0,L=K.position;for(const F of Ge.route)y+=Math.hypot(F.x-L.x,F.z-L.z),L=F;return{following:Ge.following,arrived:Ge.arrived,blocked:Ge.blocked,goal:Ge.goal&&{...Ge.goal},remaining:+y.toFixed(1),route:Ge.route.map(F=>({...F})),endpoint:Ge.endpoint&&{...Ge.endpoint}}}function Fd(y){rs(),_n=!1,qn();const L=fa({x:K.position.x,z:K.position.z},y,Z,{radius:.1});L!=null&&L.length&&(Ln=L,Dn="click",di.position.set(L.at(-1).x,.12,L.at(-1).z),di.visible=!0)}const Fi=new B;function sl(){Ht&&!gn&&Sn===0&&(rs(),_n=!1,qn(),fi=5.8)}function rs(){En.seated&&(En.seated=!1,K.position.set(-6,0,11.8),r==null||r({seated:!1}))}function Nd(y,L){En=y,le.sync(y,L),y.seated?(K.position.set(-6,-.35,10.1),K.rotation.y=0,ur=!0):ur&&(K.position.set(-6,0,11.8),ur=!1),xt.forEach((F,k)=>{const X=y.helped.includes(Ye[k].id);F.g.userData.arms[0].rotation.x=X?-1.1:0,F.g.userData.arms[1].rotation.x=X?-.45:0,F.ring.material=_(X?"#bbd0ab":Ye[k].color,!0)})}function Od(y){Ht=y,Te.key=null,Te.type=null,Ke.visible=ct.visible=!1,V=!1,j=!1,Y=0,G=0,be.forEach(L=>L.visible=!1),Se.visible=!1,qn(),Pt.clear(),_n=!1,Wt()}function rl(y){gn=y,Y=0,Pt.clear(),$n={x:0,z:0},xn=null,di.visible=!1}function zd(){Pt.clear(),$n={x:0,z:0},qn()}window.addEventListener("blur",zd),window.addEventListener("keydown",y=>{!Ht||gn||y.target.matches("input,select,textarea")||(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Space","KeyW","KeyA","KeyS","KeyD"].includes(y.code)&&y.preventDefault(),Pt.add(y.code),y.code==="Space"&&sl(),y.code==="KeyC"&&!y.repeat&&Rt(!V),y.code==="KeyQ"&&!y.repeat&&lt(),y.code==="KeyE"&&!y.repeat&&i())}),window.addEventListener("keyup",y=>Pt.delete(y.code));const al=new Gh,kd=new Hi(new B(0,1,0),0);let zr=null;d.domElement.addEventListener("pointerdown",y=>{zr={x:y.clientX,y:y.clientY}}),d.domElement.addEventListener("pointerup",y=>{if(!Ht||gn||!zr||Math.hypot(y.clientX-zr.x,y.clientY-zr.y)>10)return;al.setFromCamera(new rt(y.clientX/innerWidth*2-1,1-y.clientY/innerHeight*2),u);const L=new B;al.ray.intersectPlane(kd,L)&&Math.abs(L.x)<=Si&&Math.abs(L.z)<=Si&&Fd({x:L.x,z:L.z})});let as=0,Cs=0,dr=0;const Bd=new B(11.5,12.5,15.55);function $a(y,L=!0){if(gn||(Ut+=y,Ts.tick(Ut),As.tick(Ut),e||(I.rotation.z=Ut*.55)),Ht&&!gn){as=Math.max(0,as-y),Cs=Math.max(0,Cs-y),dr=Math.max(0,dr-y),!dr&&Sn<.48&&As.touches(K.position.x,K.position.z)&&(as=0,Cs=1,dr=3,o==null||o()),G=Math.max(0,G-y),Y=Math.max(0,Y-y);let F=(Pt.has("KeyD")||Pt.has("ArrowRight")?1:0)-(Pt.has("KeyA")||Pt.has("ArrowLeft")?1:0)+$n.x,k=(Pt.has("KeyS")||Pt.has("ArrowDown")?1:0)-(Pt.has("KeyW")||Pt.has("ArrowUp")?1:0)+$n.z,X=F*.806+k*.592,me=-F*.592+k*.806;if(F||k)rs(),_n=!1,qn();else if(Dn){for(;Ln.length&&Math.hypot(Ln[0].x-K.position.x,Ln[0].z-K.position.z)<.001;)Ln.shift(),Dn==="guide"&&Ge.route.shift();Ln.length?(xn=Ln[0],X=xn.x-K.position.x,me=xn.z-K.position.z):(Dn==="guide"&&(Ge.arrived=!0,Ge.following=!1),Dn=null,xn=null,di.visible=!1,X=me=0,Wt())}Y>0&&(X=Math.sin(K.rotation.y),me=Math.cos(K.rotation.y),xn=null),xn&&(rs(),_n=!1);const Ce=Math.hypot(X,me),Ae=Ce>(xn?1e-4:.05)&&!En.seated&&!_n;if(Ae){const Ue=j?2.7:V?1.8:Cs>0?2.2:Y>0?11:as>0?12:Pt.has("ShiftLeft")||Pt.has("ShiftRight")?7.2:Math.max(Math.abs(K.position.x),Math.abs(K.position.z))>27?7:4.5,Ft=xn?Math.min(Ce,y*Ue):y*Ue,Xn=K.position.x+X/Ce*Ft,kr=K.position.z+me/Ce*Ft;if(xn)if(xs(K.position,{x:Xn,z:kr},Z))K.position.x=Xn,K.position.z=kr;else{const Vd=Dn==="guide";qn(),Vd&&(Ge.following=!0,hi())}else Z(Xn,K.position.z)||(K.position.x=Xn),Z(K.position.x,kr)||(K.position.z=kr);K.rotation.y=Math.atan2(X,me)}Ge.goal&&!Ge.following&&Ut-Ge.lastPlan>=1&&(!Ge.anchor||Math.hypot(K.position.x-Ge.anchor.x,K.position.z-Ge.anchor.z)>1.1||Ge.blocked)&&hi(),Ut-w>.3&&Wt(),(Sn>0||fi>0)&&(fi-=14*y,Sn=Math.max(0,Sn+fi*y),Sn===0&&(fi=0)),K.scale.y=V?.66:1,he.visible=j,K.position.y=En.seated?-.35:Sn+(!e&&Ae?Math.sin(Ut*14)*.025:0),K.userData.legs.forEach((Ue,Ft)=>Ue.rotation.x=En.seated?-1.3:!e&&Ae?Math.sin(Ut*10+Ft*Math.PI)*.5:0),K.userData.arms.forEach((Ue,Ft)=>Ue.rotation.x=En.seated?-.35:!e&&Ae?Math.sin(Ut*10+Ft*Math.PI+Math.PI)*.3:0),we.position.set(K.position.x,.1,K.position.z);for(let Ue=0;Ue<on.length;Ue++){const Ft=on[Ue];Ft.mesh.visible&&Math.hypot(K.position.x-Ft.x,K.position.z-Ft.z)<.95&&(Ft.mesh.visible=!1,s(Ue))}_t(y),t(K.position.x,K.position.z,y)}if(gn||(le.update(y,e),mn.forEach((F,k)=>{if(F.type==="duck"){F.g.position.set(-17+Math.cos(Ut*.13+k*2)*3,.08,13+Math.sin(Ut*.13+k*2)*2),F.g.rotation.y=-(Ut*.13+k*2);return}const X=En.following===k,me=X?K.position:En.waterFilled&&k===1?{x:-8.5,z:8}:null;let Ce=F.speed;if(me){const Ft=me.x-F.g.position.x,Xn=me.z-F.g.position.z;F.angle=Math.atan2(Ft,Xn),Ce=Math.hypot(Ft,Xn)>(X?1.7:.6)?X?3.2:1:0}else F.turn-=y,F.turn<=0&&(F.angle+=(l()-.5)*2.4,F.turn=2+l()*4);const Ae=F.g.position.x+Math.sin(F.angle)*y*Ce,Ue=F.g.position.z+Math.cos(F.angle)*y*Ce;Z(Ae,Ue)?F.angle+=Math.PI*.7:(F.g.position.x=Ae,F.g.position.z=Ue),F.g.rotation.y=F.angle,!e&&F.g.userData.legs&&F.g.userData.legs.forEach((Ft,Xn)=>Ft.rotation.x=Math.sin(Ut*7+Xn%2*Math.PI)*.35),e||(F.g.position.y=F.type==="rabbit"?Math.abs(Math.sin(Ut*4+k))*.07:Math.abs(Math.sin(Ut*5+k))*.015)}),e||on.forEach((F,k)=>{F.mesh.position.y=1.1+Math.sin(Ut*1.3+k)*.12})),Ht&&_n)Fi.set(-17,.6,13),u.position.set(-9,3.7,18.5),u.lookAt(Fi);else if(Ht){const F=new B(K.position.x,1,K.position.z);Fi.lerp(F,e?1:1-Math.exp(-y*5));const k=Math.min(1,Math.max(0,(Math.max(Math.abs(K.position.x),Math.abs(K.position.z))-25)/12)),X=Bd.clone().multiplyScalar((innerWidth<600?1.2:1)+k*.45);u.position.copy(Fi).add(X),u.lookAt(Fi)}else{const F=innerWidth<600;Fi.set(F?41:30,2,F?3:-1),u.position.set(F?79:92,F?22:29,F?43:54),u.lookAt(Fi)}$e.value=Ht&&!_n?1:0,pe.value.copy(K.position).y+=1,L&&d.render(c,u)}let qa=performance.now();function ol(y){const L=Math.min((y-qa)/1e3,.05);qa=y,Rs||$a(L),requestAnimationFrame(ol)}return requestAnimationFrame(ol),window.addEventListener("resize",()=>{u.aspect=innerWidth/innerHeight,u.updateProjectionMatrix(),d.setSize(innerWidth,innerHeight)}),d.domElement.addEventListener("webglcontextlost",y=>{y.preventDefault(),rl(!0),n.dispatchEvent(new CustomEvent("worldlost"))}),$a(0),{windState:()=>({boost:as,gust:Cs}),catchWind(){as=5},hideRelay(){Ts.sync({})},setActive:Od,setPaused:rl,setCompanion:Dt,getCompanion:Be,jump:sl,dash:lt,setCrouching:Rt,movement:vn,setCarrying(y){j=!!y,j&&(V=!1,Y=0)},setScenario:Oe,guideTo:pi,followGuide:Id,stopGuide:qn,guidance:Ud,setJoystick(y,L){$n={x:y,z:L},(y||L)&&qn()},setPlayer(y,L){En.seated&&rs(),_n=!1,qn(),as=Cs=dr=0,Sn=fi=0,K.position.set(y,0,L),Fi.set(y,1,L),Ge.goal&&hi()},getPlayer:()=>({x:K.position.x,z:K.position.z,y:Sn}),animals:()=>mn.map((y,L)=>({id:L,type:y.type,x:+y.g.position.x.toFixed(1),z:+y.g.position.z.toFixed(1),following:En.following===L,observed:En.animalNotes.includes(L)})),setEnvironment:Nd,observe(y){_n=y,qn(),Pt.clear(),$n={x:0,z:0}},isObserving:()=>_n,environmentAnimation:()=>le.animation,performance:()=>({drawCalls:d.info.render.calls,triangles:d.info.render.triangles,pixelRatio:d.getPixelRatio()}),project(y,L,F){const k=new B(y,L,F).project(u);return{x:(k.x+1)/2*innerWidth,y:(1-k.y)/2*innerHeight,visible:k.z<1&&Math.abs(k.x)<1&&Math.abs(k.y)<1}},setProgress(y){Ts.sync(y),As.sync(y),on.forEach((L,F)=>L.mesh.visible=!y.collected.includes(F)),xt.forEach((L,F)=>L.marker.visible=!y.relay&&!y.scenario&&!y.seals.includes(Ye[F].id));for(const[L,F]of se)F.visible=!y.relay&&!y.scenario&&!(y.items||[]).includes(L);Le.forEach((L,F)=>{const k=y.seals.includes(Ye[F].id);L.screen.material=_(k?"#91aa8b":"#a4784e",!0),L.light.intensity=k?12:0}),Bt.forEach((L,F)=>L.material=_(y.seals.length>F?"#a7c1a0":"#9f684f",!0)),it.forEach((L,F)=>L.rotation.y=y.seals.length===3?F===0?-1.35:1.35:0),Qe.intensity=y.seals.length===3?10:0},advanceTime(y){Rs=!0;for(let L=0;L<Math.min(y,6e4);L+=1e3/60)$a(1/60,!1);d.render(c,u)},resumeRealtime(){Rs=!1,qa=performance.now()},blocked:Z,dispose(){d.dispose()}}}const W=n=>document.getElementById(n),ye=n=>String(n??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),zg=matchMedia("(prefers-reduced-motion: reduce)").matches,zn={get(n){try{return localStorage.getItem(n)}catch{return null}},set(n,e){try{return localStorage.setItem(n,e),!0}catch{return!1}}},Kc="prepx-afterbell-draft-v1",Zc="prepx-afterbell-pending-v1";function Jc(){try{const n=JSON.parse(zn.get(Zc)||"[]");return Array.isArray(n)?n:[]}catch{return[]}}function kg(n){const e=Jc().filter(t=>t.id!==n.id);return e.push(n),zn.set(Zc,JSON.stringify(e))}async function xd(n){try{const e=await fetch("/api/afterbell/attempts",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n),signal:AbortSignal.timeout(6e3)});return!e.ok||(await e.json()).saved!==!0?!1:(zn.set(Zc,JSON.stringify(Jc().filter(i=>i.id!==n.id))),!0)}catch{return!1}}async function gd(){for(const n of Jc())await xd(n)&&at==="complete"&&(M==null?void 0:M.attemptId)===n.id&&W("save-status")&&(W("save-status").textContent="✓ התוצאה נשמרה בהיסטוריית המשחק.")}window.addEventListener("online",gd);let fn=null,Nt=null,an="",va=0,Qc=0,Nn=null,Qt=0,bs=null,Pa="",Ac=!1,_d=!1,rn=Ba.quizzes[0],M=null,at="menu",wi=null,Rc="snapshot",ei=null,yu=null,Ti=null,qs=!1,ri=null,J=null,Lo=0,Cc=null,ba=null,Mu=0;const ns=W("dialog"),Yi=W("quiz");Yi.innerHTML=Object.entries({hebrew:"עברית",physics:"פיזיקה"}).map(([n,e])=>`<optgroup label="${e}">${Ba.quizzes.filter(t=>t.subject_id===n).map(t=>`<option value="${ye(t.id)}">${e} · ${ye(t.title)}</option>`).join("")}</optgroup>`).join("");const is=W("scenario");is.innerHTML=Ma.map((n,e)=>`<option value="${n.id}">${String(e+1).padStart(2,"0")} · ${ye(n.title)}</option>`).join("");function Va(){const n=Cn(is.value);W("scenario-preview").textContent=n.brief}is.onchange=Va;const Su=new URLSearchParams(location.search).get("quiz");Ba.quizzes.some(n=>n.id===Su)&&(Yi.value=Su);is.value=Dc(Yi.value,zn.get("prepx-afterbell-last-scenario"));Va();W("player-name").value=zn.get("prepx-afterbell-name")||"";function At(n){W("toast").textContent=n,W("toast").classList.add("visible"),clearTimeout(yu),yu=setTimeout(()=>W("toast").classList.remove("visible"),3300)}function hn(n=!0){if(qs)try{ri??(ri=new AudioContext),ri.resume();const e=ri.createOscillator(),t=ri.createGain();e.connect(t),t.connect(ri.destination),e.type="sine",e.frequency.setValueAtTime(n?520:270,ri.currentTime),e.frequency.exponentialRampToValueAtTime(n?780:220,ri.currentTime+.12),t.gain.setValueAtTime(.035,ri.currentTime),t.gain.exponentialRampToValueAtTime(.001,ri.currentTime+.25),e.start(),e.stop(ri.currentTime+.26)}catch{}}function qt(){if(M)try{sessionStorage.setItem(Kc,JSON.stringify(M)),Ac=!0}catch{Ac=!1}}function vd(){try{return sessionStorage.getItem(Kc)}catch{return null}}function Eu(){try{sessionStorage.removeItem(Kc)}catch{}}function bd(){const n=Nu(vd(),rn);W("resume").classList.toggle("hidden",!n)}async function yd(){const n=++Mu,e=Yi.value;W("start").disabled=!0,W("scenario-start").disabled=W("relay-start").disabled=!0,W("resume").disabled=!0,W("source-status").textContent="מתחברים לשאלות של PrepX…";let t=Ba.quizzes.find(s=>s.id===e),i="snapshot";try{const s=await fetch(`/api/afterbell/quizzes/${e}`,{signal:AbortSignal.timeout(3500)});if(s.ok){const r=await s.json();r.id===e&&Uu(r)&&(t=r,i="database")}}catch{}n===Mu&&(rn=t,Rc=i,W("source-status").textContent=Rc==="database"?`● ${rn.questions.length} שאלות מחוברות למאגר PrepX`:`מצב לא מקוון · ${rn.questions.length} שאלות מעותק מאגר PrepX`,W("start").disabled=!J,W("scenario-start").disabled=W("relay-start").disabled=!J,W("resume").disabled=!J,bd())}Yi.addEventListener("change",()=>{is.value=Dc(Yi.value,zn.get("prepx-afterbell-last-scenario")),Va();const n=new URL(location.href);n.searchParams.set("quiz",Yi.value),history.replaceState(null,"",n),yd()});function pt(){clearTimeout(ei),ei=null,Ti=null,ns.open&&ns.close(),at!=="menu"&&at!=="complete"&&(at="explore",wi=null,J==null||J.setPaused(!1)),at==="menu"&&(J==null||J.setPaused(!1)),ba==null||ba.focus()}function bt(n,e,t){t!=="question"&&t!=="feedback"&&(wi=null),clearTimeout(ei),Ti=null,ba=document.activeElement,at=t,J==null||J.setPaused(!0),W("dialog-eyebrow").textContent=n,W("dialog-body").innerHTML=e,ns.open||ns.showModal(),W("dialog-body").scrollTop=0,W("close-dialog").focus(),Wg(),Pd()}W("close-dialog").addEventListener("click",()=>{at==="complete"?Ha():pt()});ns.addEventListener("cancel",n=>{n.preventDefault(),at==="complete"?Ha():pt()});function Ga(n=!1,e=!1,t=!1){if(!J)return;const i=W("player-name").value.trim();if(!i){W("player-name").setCustomValidity("רק שם או כינוי, ומתחילים."),W("player-name").reportValidity(),W("player-name").focus();return}if(W("player-name").setCustomValidity(""),zn.set("prepx-afterbell-name",i),M=n?Nu(vd(),rn):null,M??(M=tf(rn)),e&&(M.relay=Xd(Number(zn.get("afterbell-last-relay")??-1)),zn.set("afterbell-last-relay",String(M.relay.edition))),!n&&t&&(M.scenario=Ru(is.value),zn.set("prepx-afterbell-last-scenario",M.scenario.id)),fn=null,Nt=null,Qt=null,an="",Qc=va=M.elapsed,document.querySelector(".quest-panel .eyebrow").textContent=M.relay?qi[M.relay.edition].title:"מערכות הקמפוס",Pa=M.participantName||i,M.participantName=Pa,Cc=null,Nt=null,an="",at="explore",W("welcome").classList.add("hidden"),W("hud").classList.remove("hidden"),W("pause").classList.remove("hidden"),document.body.classList.add("playing"),J.setPlayer(M.player.x,M.player.z),J.setActive(!0),J.setPaused(!1),J.setProgress(M),M.environment=Fr(M.environment),J.setEnvironment(M.environment,{animate:!1}),J.resumeRealtime(),Xt(),qt(),W("scenario-heading").textContent=M.relay?qi[M.relay.edition].title:M.scenario?`${Cn(M.scenario.id).title} · תיק שטח`:"מערכות הקמפוס",W("world-labels").innerHTML=Ye.map(s=>`<span class="world-label" id="label-${s.id}"><b>${Ye.indexOf(s)+1}</b>${ye(s.name)}</span>`).join("")+Gt.map(s=>`<span class="world-label equipment-label" id="label-${s.id}">▣ ${ye(s.short)}</span>`).join("")+'<span class="world-label" id="label-exit">שער היציאה</span><span class="world-label environment-label" id="label-environment"></span><span class="world-label" id="label-field"></span>',Qt=es(M,null,J.getPlayer()).index??-1,bs=null,an="",Xt(),!n&&M.relay){const s=qi[M.relay.edition];bt("תיק שטח 02 · מסילת הכוכבים",`<h2 id="dialog-title">${s.title}</h2><p class="dialog-copy">${s.story}</p><p class="feedback-note">בחרו פנס בעזרת המספרים. באטלס תמצאו את שלושת חבלי הארץ, גשרים ואבני דרך למעבר מהיר. אפשר להגיע לבד או עם ״ללכת איתי״. בכל פנס מחכים אתגר שטח ושאלות מתוך ${ye(rn.title)}. אין מגבלת זמן.</p><button id="begin-adventure" class="primary">יוצאים בעקבות האור ←</button>`,"tutorial"),W("begin-adventure").onclick=()=>{pt(),Zi()}}else if(!n&&M.scenario){const s=Cn(M.scenario.id);bt("תיק שטח · "+s.title,`<h2 id="dialog-title">${ye(s.title)}</h2><p class="dialog-copy">${ye(s.brief)}</p><ol class="tutorial-steps">${s.steps.map(r=>`<li>${ye(r.title)}</li>`).join("")}</ol><p class="feedback-note">בכל שלב: משימת שטח אחרת ואז שאלות מ${ye(rn.title)}. C להליכה שקטה, Q לזינוק קצר, רווח לקפיצה. בנייד יש כפתורים. עם מטען הולכים לאט. אין לחץ זמן או קנס על טעויות בשטח.</p><button id="begin-adventure" class="primary">למשימה הראשונה ←</button>`,"tutorial"),W("begin-adventure").onclick=()=>{pt(),Zi()}}else n||(bt("תדריך · ז׳ איינשטיין",'<h2 id="dialog-title">החשמל נפל. השער נשאר נעול.</h2><p class="school-name">בית הספר שי עגנון · כיתת הייטק</p><p class="dialog-copy">נשארתם אחרי ההאקתון. שלוש תחנות הפרויקט כבו, וביער מסתובב שועל שלא מצא את הדרך החוצה. הצוות שלכם עדיין במתחם.</p><ol class="tutorial-steps"><li>המשימה הקרובה כבר מסומנת. הולכים בעקבות הנקודות המוארות ומקשיבים לאיש הצוות.</li><li>מאתרים את הציוד החסר ומפעילים את בדיקת השטח שלו: קוד, חיבורים או כיוון אות.</li><li>משלימים את שאלות התרגול בכל תחנה, מפעילים את שלוש המערכות ויוצאים בשער הצפוני.</li></ol><p class="feedback-note">אפשר לחקור בכל סדר. ״ללכת איתי״ מוביל אתכם ליעד; ״צריך רמז?״ מסביר מה עושים. משימות הצד מוסיפות אתגרים בדרך. אין לחץ זמן.</p><button id="begin-adventure" class="primary">יוצאים לבדוק את המתחם ←</button>',"tutorial"),W("begin-adventure").onclick=()=>{pt(),Zi(),At("המשימה הראשונה מסומנת למעלה. עקבו אחרי הנקודות המוארות, או לחצו על ״ללכת איתי״.")})}W("player-name").addEventListener("input",()=>{W("player-name").setCustomValidity("")});W("scenario-start").onclick=()=>Ga(!1,!1,!0);W("relay-start").addEventListener("click",()=>Ga(!1,!0));W("start").addEventListener("click",()=>Ga());W("resume").addEventListener("click",()=>Ga(!0));function Ha(){pt(),at="menu",J.hideRelay(),J.setActive(!1),is.value=Dc(Yi.value,zn.get("prepx-afterbell-last-scenario")),Va(),J.setPaused(!1),J.resumeRealtime(),W("welcome").classList.remove("hidden"),W("hud").classList.add("hidden"),W("pause").classList.add("hidden"),document.body.classList.remove("playing"),bd()}function el(){if(!M||!J)return null;const n=J.getPlayer(),e=M.scenario&&rr(M);if(e&&Math.hypot(n.x-e.x,n.z-e.z)<2.2)return{type:"scenario",d:0};if(J.isObserving())return{type:"observation",d:0};if(M.environment.seated)return{type:"environment",id:"bench",d:0};const t=kn.find(r=>r.id===Nt);if(t){const r=Math.hypot(n.x-t.x,n.z-t.z);if(r<t.range)return{type:"environment",id:t.id,d:r}}let i=null;if(M.relay)for(let r=0;r<3;r++){const o=$t(M.relay,r),a=Math.hypot(n.x-o.x,n.z-o.z);if(a<2.8&&!M.seals.includes(Ye[r].id)&&(i={type:"relay",i:r,d:a}),o.task==="sparks")for(const l of Da(o)){if(M.relay.steps[r]&1<<l.bit)continue;const c=Math.hypot(n.x-l.x,n.z-l.z);c<1.95&&(!i||i.type!=="spark"||c<i.d)&&(i={type:"spark",i:r,bit:l.bit,d:c})}}else Ye.forEach((r,o)=>{const a=Math.hypot(n.x-r.x,n.z-r.z);a<3.5&&(!i||a<i.d)&&(i={type:"npc",i:o,d:a})}),Gt.forEach((r,o)=>{if(M.scenario||M.items.includes(r.id))return;const a=Math.hypot(n.x-r.x,n.z-r.z);a<2.8&&(!i||a<i.d)&&(i={type:"equipment",i:o,d:a})});const s=Math.hypot(n.x-Js.x,n.z-Js.z);return s<3.5&&(!i||s<i.d)&&(i={type:"exit",d:s}),i||(kn.forEach(r=>{const o=Math.hypot(n.x-r.x,n.z-r.z);o<r.range&&(!i||o<i.d)&&(i={type:"environment",id:r.id,d:o})}),J.animals().forEach(r=>{if(r.type==="duck")return;const o=Math.hypot(n.x-r.x,n.z-r.z);o<2.4&&(!i||o<i.d-.8)&&(i={type:"animal",id:r.id,d:o})}),i)}function tl(){if(at!=="explore")return;const n=el();if(n){if(n.type==="relay"||n.type==="spark"){Ld(n);return}if(n.type==="scenario"){Sd();return}if(n.type==="observation"){J.observe(!1),Zi();return}if(n.type==="environment"){Lc(n.id);return}if(n.type==="animal"){Gg(n.id);return}n.type==="exit"?Pi(M)?Yg():At(M.relay?`נותרו ${3-M.seals.length} פנסים להדלקה. בחרו פנס במפה.`:`עוד ${3-M.seals.length} מערכות צריכות לחזור לפעולה. בחרו תחנה במפה.`):n.type==="equipment"?Vg(n.i):Md(n.i)}}W("interact").addEventListener("click",tl);const Bg=["נ","א","א"];function Ir(n){const e=Ye[n];return`<div class="character-chip"><div class="portrait" aria-hidden="true">${Bg[n]}</div><div><h2 id="dialog-title">${ye(e.name)}</h2><small>${ye(e.role)}</small></div></div><button class="text-button npc-chat" data-npc-chat="${n}">לשוחח ולעזור לצוות ↗</button>`}function Md(n){if(M.scenario){const i=rr(M);if(i){At(i.hint);return}At("כל משימות השטח הושלמו. השער פתוח.");return}const e=Ye[n];if(An(M,n),M.seals.includes(e.id)){bt("חברים לדרך",Ir(n)+`<p class="dialog-copy">${n===0?"מסוף הגישה פעיל. רשמתי את התקלה. עכשיו רק צריך להסביר למורה למה התאריך בדוח הוא מחר.":n===1?"מערכת הגיבוי פועלת. פעם הבאה נבדוק אותה לפני שכולם הולכים הביתה. רעיון מהפכני.":"הקשר חזר. אם תשמעו רעש מהיער — הפעם אני הולך לבדוק. עם פנס. ועם מישהו."}</p><button id="back-world" class="primary">ממשיכים לחקור ←</button>`,"dialogue"),W("back-world").onclick=pt;return}if(M.understood.includes(e.id)){M.items.includes(Gt[n].id)?Ki(n):Pc(n);return}const t=Oo(e.choices.map((i,s)=>({text:i,original:s})));bt("לפני שפותרים, מקשיבים",Ir(n)+`<p class="dialog-copy">${ye(e.line)}</p><div class="options">${t.map(i=>`<button class="option social" data-choice="${i.original}">${ye(i.text)}</button>`).join("")}</div><p id="social-feedback" class="feedback-note" role="status"></p>`,"dialogue"),document.querySelectorAll(".social").forEach(i=>i.onclick=()=>{if(Number(i.dataset.choice)!==e.need){W("social-feedback").textContent=e.wrong,hn(!1);return}M.understood.push(e.id),qt(),hn(),Pc(n)})}function Pc(n){const e=Ye[n],t=Gt[n],i=M.items.includes(t.id);bt(`תחנה ${n+1} · ${e.system}`,Ir(n)+`<p class="dialog-copy">${ye(e.reply)}</p><div class="journal-entry"><h3>${i?"✓ הציוד איתכם":`נדרש: ${ye(t.name)}`}</h3><p>${ye(i?t.report:t.hint)}</p></div><p class="feedback-note">${An(M,n).total} שאלות מהתרגול הנבחר מפעילות את בדיקת התחנה. ציון הלימוד נפרד מהציוד ומהחקירה.</p><button class="primary" id="${i?"begin-questions":"track-equipment"}">${i?"מפעילים את מסוף התרגול":"סימון הציוד במפה"} ←</button>`,"mission"),i?W("begin-questions").onclick=()=>Ki(n):W("track-equipment").onclick=()=>{Qt=n,bs=t.id,pt(),Xt(),At(t.hint)}}function Sd(){const n=On(M),e=ti(M);if(!n)return;const t=rr(M),i=J.getPlayer();if(Math.hypot(i.x-t.x,i.z-t.z)>2.2)return;if(M.scenario.completed.includes(e)){M.items.includes(Gt[e].id)||M.items.push(Gt[e].id),M.understood.includes(Ye[e].id)||M.understood.push(Ye[e].id),qt(),J.setProgress(M),Ki(e);return}if(["robot-escort","rescue-trust","courier-course"].includes(n.kind)){const r=No(M,{type:n.kind==="rescue-trust"?"befriend":"checkpoint"},i,{...J.movement(),companion:J.getCompanion()});qt(),an="",Xt(),At(r.message);return}bt(`תיק שטח · שלב ${e+1}/3`,`<h2 id="dialog-title">${ye(n.title)}</h2><p class="dialog-copy">${ye(n.hint)}</p><div class="field-check scenario-puzzle"><div id="task-workspace"></div><p id="scenario-status" role="status">משימת שטח · אינה משנה את ציון הלימוד</p><button id="field-to-quiz" class="primary hidden">✓ הושלם — לשאלות התרגול ←</button></div>`,"field");let s;s=Qd(W("task-workspace"),M,(r,o=!0)=>{const a=No(M,r,J.getPlayer(),{...J.movement(),companion:J.getCompanion()});return qt(),o&&(W("scenario-status").textContent=a.message),a.walk?(pt(),an="",Xt(),At(a.message),a):(a.complete&&(s.render(),W("task-workspace").querySelectorAll("button,input,select").forEach(l=>l.disabled=!0),W("field-to-quiz").classList.remove("hidden"),W("field-to-quiz").focus(),J.setProgress(M),Xt(),hn()),a)}),W("field-to-quiz").onclick=()=>Sd()}function Vg(n){const e=Gt[n],t=Ou[e.id],i=M.environment.checkedEquipment.includes(e.id);Nn={id:e.id,step:0,channel:1},bt("ממצא בשטח · בדיקת ציוד",`<h2 id="dialog-title">${ye(e.name)}</h2><p class="dialog-copy">${ye(e.clue)}</p><section class="field-check"><h3>${ye(t.title)}</h3><p>${ye(t.hint)}</p><div id="field-controls">${i?"":e.id==="antenna"?'<label for="radio-channel">ערוץ הקשר</label><div class="tuner"><button class="secondary" id="channel-down" aria-label="ערוץ קודם">−</button><output id="radio-channel">1</output><button class="secondary" id="channel-up" aria-label="ערוץ הבא">+</button></div><meter id="signal-meter" min="0" max="5" value="1">עוצמת אות</meter><button class="secondary" id="test-signal">בדיקת האות</button>':`<div class="field-options">${t.options.map((r,o)=>`<button class="secondary" data-operation="${o}">${ye(r)}</button>`).join("")}</div>`}</div><p id="field-status" role="status">${i?"✓ הבדיקה הושלמה. אפשר לקחת את הציוד.":"בצעו את הבדיקה כדי לשחרר את הציוד. אין לחץ זמן."}</p></section><button class="primary" id="collect-equipment" ${i?"":"disabled"}>לקחת ולהמשיך ←</button>`,"equipment");function s(){M.environment.checkedEquipment.push(e.id),qt(),W("field-status").textContent="✓ הבדיקה הצליחה. הציוד מוכן — קחו אותו וחזרו לצוות.",W("field-controls").innerHTML='<div class="field-success">✓ הציוד מגיב</div>',W("collect-equipment").disabled=!1,hn()}if(document.querySelectorAll("[data-operation]").forEach(r=>r.onclick=()=>{const o=Nn.step;if(!af(e.id,o,Number(r.dataset.operation))){Nn.step=0,document.querySelectorAll("[data-operation]").forEach(a=>a.classList.remove("operation-done")),W("field-status").textContent="הסדר עדיין לא מתאים. הרמז נשאר למעלה — מנסים שוב מההתחלה.",hn(!1);return}r.classList.add("operation-done"),Nn.step++,W("field-status").textContent=`✓ שלב ${Nn.step} מתוך 3`,hn(),Nn.step===3&&s()}),!i&&e.id==="antenna"){const r=o=>{Nn.channel=Math.max(1,Math.min(7,Nn.channel+o)),W("radio-channel").textContent=Nn.channel,W("signal-meter").value=5-Math.abs(5-Nn.channel),W("field-status").textContent=Nn.channel===5?"האות יציב. לחצו על בדיקת האות.":"עדיין יש רעש. בדקו את הערוץ המסומן במחברת."};W("channel-down").onclick=()=>r(-1),W("channel-up").onclick=()=>r(1),W("test-signal").onclick=()=>{Nn.channel===5?s():(W("field-status").textContent="הערוץ לא מתאים. במחברת מסומן 5.",hn(!1))}}W("collect-equipment").onclick=()=>{M.environment.checkedEquipment.includes(e.id)&&(M.items.includes(e.id)||M.items.push(e.id),Qt=e.npc,bs=null,Nt=null,qt(),J.setProgress(M),pt(),Xt(),hn(),At(e.report))}}function dn(n={},e){M&&(Object.assign(M.environment,n),e&&!M.environment.visited.includes(e)&&M.environment.visited.push(e),J.setEnvironment(M.environment),qt(),Xt(),Zi())}function Do(n){const e=J.getPlayer();return Math.hypot(e.x-n.x,e.z-n.z)<n.range+.1}function Lc(n){const e=kn.find(s=>s.id===n);if(!e||!Do(e))return;const t=M.environment;if(n==="solar"){bt("מנגנון מקומי · חקירה חופשית",`<h2 id="dialog-title">${ye(e.name)}</h2><p class="dialog-copy">${ye(e.description)}</p><div class="environment-switches">${["ירח","שמש","עץ"].map((s,r)=>`<button class="secondary env-switch" data-env-switch="${r}" aria-pressed="${t.switches[r]}"><span>${s}</span><b>${t.switches[r]?"פועל":"כבוי"}</b></button>`).join("")}</div><p id="env-puzzle-status" class="feedback" role="status">${Nr(t)?"התאורה פועלת. שלושה פנסי שביל נדלקו.":"ההערה על המכסה: ירח ועץ פועלים, שמש כבויה."}</p><button id="env-leave" class="primary">חזרה לשביל ←</button>`,"environment"),document.querySelectorAll("[data-env-switch]").forEach(s=>s.onclick=()=>{if(!Do(e))return;const r=[...M.environment.switches];r[Number(s.dataset.envSwitch)]=!r[Number(s.dataset.envSwitch)],dn({switches:r},n),Lc(n)}),W("env-leave").onclick=pt;return}const i=M.scenario&&["locker","noticeboard"].includes(n)?Cn(M.scenario.id).brief+" "+Cn(M.scenario.id).steps.map(s=>s.title).join(" · "):n==="locker"&&t.lockerOpen?"הפתק בארונית: ״אדם השאיר את האנטנה ליד עמדת הקשר הישנה בדרום־מערב. אם אתם מחזירים, באמת תחזירו.״":e.description;bt("חקירה חופשית · ללא ציון",`<div class="environment-heading"><span class="environment-category">${ye(Ia(e,t))}</span><h2 id="dialog-title">${ye(e.name)}</h2></div><p class="dialog-copy">${ye(i)}</p><p class="feedback-note">פעולה בקמפוס. אינה מוסיפה שאלות ואינה משנה את ציון התרגול.</p><button id="env-primary" class="primary" data-environment="${n}">${ye(Iu(e,t))} ←</button>`,"environment"),W("env-primary").onclick=()=>{if(!Do(e))return;const s=M.environment;let r="";if(n==="bench"&&(dn({seated:!s.seated},n),r=s.seated?"אפשר להישאר רגע. כדי לקום: תנועה או כפתור הפעולה.":"חוזרים לשטח."),n==="door"){const o=J.getPlayer();if(s.doorOpen&&Math.abs(o.x+2)<1.6&&Math.abs(o.z+16.86)<.75){At("זוזו מעט מפתח הדלת לפני שסוגרים אותה.");return}dn({doorOpen:!s.doorOpen},n),r=s.doorOpen?"הדלת נפתחה. אפשר להיכנס למבואה.":"דלת המבואה נסגרה."}if(n==="lamp"&&(dn({lampOn:!s.lampOn},n),r=s.lampOn?"הרחבה מוארת שוב.":"הפנס כובה. פנס היד שלכם עדיין פועל."),n==="basketball"){if(J.environmentAnimation().basketballInFlight){At("הכדור בדרך חזרה. עוד רגע.");return}dn({shots:s.shots+1},n),r=`קליעה ${s.shots}. הכדור חוזר לעמדה.`}if(n==="locker"){if(dn({lockerOpen:!s.lockerOpen},n),s.lockerOpen){Lc(n);return}r="הארונית סגורה. הרמז נשאר ביומן."}n==="noticeboard"&&(dn({},n),r=M.scenario?"שלוש המשימות של תיק השטח מופיעות ביומן.":"שלושת מיקומי הציוד תועדו ביומן. גם כתב היד החשוד."),n==="telescope"&&(dn({observations:s.observations+1},n),J.observe(!0),r="תצפית באגם. לחצו על סיום התצפית כדי לחזור."),n==="water"&&(dn({waterFilled:!0},n),r="הקערה מלאה. ארנב מהחצר מתקרב בקצב שלו."),n==="planter"&&(dn({watered:!0},n),r="העלים התרוממו. התברר שהפתרון היה מים."),n==="recycling"&&(dn({recycled:!0},n),r="שלוש פחיות הגיעו למחזור. עכשיו נשאר לסדר את תיקיית הפרויקט."),n==="bike"&&(dn({bells:s.bells+1},n),hn(),r="הפעמון מצלצל. בדיקת החומרה הסתיימה."),pt(),At(r)}}const Ed={fox:"שועל",rabbit:"ארנב",bird:"ציפור",duck:"ברווז"};function Gg(n){const e=J.animals().find(i=>i.id===n);if(!e)return;const t=J.getPlayer();Math.hypot(t.x-e.x,t.z-e.z)>2.8||(dn({animalNotes:[...new Set([...M.environment.animalNotes,n])]}),bt("יומן טבע · הקמפוס אחרי הלימודים",`<h2 id="dialog-title">${Ed[e.type]} בשטח</h2><p class="dialog-copy">${e.type==="fox"?"הוא עוצר, מקשיב, וממשיך. נראה שיש לו תוכנית טובה משלנו. אפשר לתת לו ללכת לידכם בקצב שלו.":e.type==="rabbit"?"האוזניים זזות לפני כל השאר. התצפית נשמרה ביומן; אין צורך להתקרב יותר.":e.type==="duck"?"שלושה ברווזים ממשיכים בסיור באגם. כנראה הם לא קיבלו את הודעת הביטול.":"הציפור כבר מכירה את כל הקמפוס. היא לא מתרשמת במיוחד מכיתת ההייטק."}</p>${e.type!=="duck"?`<button id="animal-follow" class="primary">${e.following?"לתת לו להמשיך בדרכו":"ללכת יחד קצת"} ←</button>`:""}<button id="animal-leave" class="secondary">להמשיך לחקור</button>`,"environment"),W("animal-follow")&&(W("animal-follow").onclick=()=>{dn({following:M.environment.following===n?null:n}),pt(),At(M.environment.following===n?"חבר חדש הולך לידכם. אפשר להיפרד דרך אותה פעולת מפגש.":"הוא חוזר לסיבוב שלו בקמפוס.")}),W("animal-leave").onclick=pt)}function Hg(n){const e=Ye[n],t=M.environment.helped.includes(e.id),i=[["היומן של נועה מלא בדיקות קטנות. ״כשכל אחד משנה דבר אחר, מתקבלים שלושה באגים ודיון ארוך. נתחיל בעובדות.״","היא מראה את הכיוון של הספרייה: ״כרטיס הצוות נשאר על שולחן העבודה ממערב. תיקי הפרויקט משום מה מסודרים פחות מהקוד.״"],["איתי מצביע על החממה. ״הרובוט היה אמור להשקות. כרגע הוא בעיקר מתעניין בלהיות כבוי.״","״יחידת הגיבוי נמצאת בארגז שממזרח למעבדה. מי שהניח אותה שם קרא לזה פתרון זמני. זה היה בשבוע שעבר.״"],["״הרעש היה מהאגם. בדקתי. ברווז. לא צריך לציין את זה בסיכום ההאקתון.״","״האנטנה נשארה בדרום־מערב. אם נלך יחד לשם, אני אבדוק את השביל ואתם תבדקו שאין עוד ברווז מפתיע.״"]][n];bt("שיחה עם הצוות",Ir(n)+`<div class="options"><button class="secondary" data-chat-topic="0">איך הולך בינתיים?</button><button class="secondary" data-chat-topic="1">יש עוד רמז לציוד?</button><button id="npc-help" class="primary">${t?"כבר עזרנו · לבדוק מה השתנה":["לעזור לסדר את הבדיקות","לעזור להניח את הבקר","לבדוק יחד את כיוון הרעש"][n]} ←</button></div><p id="npc-chat-reply" class="dialog-copy" role="status"></p><button id="npc-back" class="text-button">בחזרה למשימת התחנה ←</button>`,"conversation"),document.querySelectorAll("[data-chat-topic]").forEach(s=>s.onclick=()=>{W("npc-chat-reply").textContent=i[Number(s.dataset.chatTopic)]}),W("npc-help").onclick=()=>{dn({helped:[...new Set([...M.environment.helped,e.id])]}),W("npc-chat-reply").textContent=["נועה מסמנת בדיקה אחת ברשימה ומרימה יד בתודה. ״מדהים, אפשר לפתור דברים בלי ישיבה של שעה.״","איתי מניח את הבקר על העמדה. ״עכשיו יש לי יד פנויה. בשביל להצביע על התקלה הבאה.״","אדם מסמן את כיוון האגם. ״תודה שבדקתם איתי. מוכן להחזיר את הקשר.״"][n],W("npc-help").textContent="העזרה תועדה ביומן"},W("npc-back").onclick=()=>Md(n)}function Wg(){document.querySelectorAll("[data-npc-chat]").forEach(n=>n.onclick=()=>Hg(Number(n.dataset.npcChat)))}function wd(n){const e=rn.references.find(i=>i.id===n.ref.id);if(!e)return"";let t;try{if(t=new URL(e.url||"subject.html?subject="+rn.subject_id,"https://hitech.agnon.online/"),!["https:","http:"].includes(t.protocol))return""}catch{return""}return`<a class="reference" target="_blank" rel="noopener noreferrer" href="${ye(t.href)}">מקור: ${ye(e.title)}${n.ref.part?" · "+ye(n.ref.part):""} ↗</a>`}function Ki(n){if(M.scenario&&!M.scenario.completed.includes(n)){pt(),At("משלימים קודם את משימת השטח.");return}if(!M.relay&&!M.items.includes(Gt[n].id)){Pc(n);return}const e=An(M,n);if(!e.next){qg(n);return}const t=M.questions.find(i=>i.id===e.next);wi=t,bt(M.relay?$t(M.relay,n).title:`${Ye[n].name} · ${Ye[n].system}`,`<div class="question-meta"><span>${ye(rn.title)}</span><span>שאלה ${Object.keys(M.answers).length+1} מתוך ${M.questions.length}</span></div><div class="progress-line"><i style="width:${Object.keys(M.answers).length/M.questions.length*100}%"></i></div><h2 id="dialog-title">${ye(t.prompt)}</h2>${wd(t)}${M.relay?"":`<button class="text-button npc-chat" data-npc-chat="${n}">רגע לשיחה עם ${ye(Ye[n].name)} ↗</button>`}<div class="options" id="answer-options">${t.options.map((i,s)=>`<button class="option answer" data-choice="${i.original}"><span class="number">${s+1}</span><span>${ye(i.text)}</span></button>`).join("")}</div><div id="answer-feedback" aria-live="polite"></div>`,"question"),wi=t,document.querySelectorAll(".answer").forEach(i=>i.onclick=()=>$g(t,Number(i.dataset.choice),n))}function $g(n,e,t){const i=nf(M,n.id,e);i&&(at="feedback",qt(),Xt(),hn(i.correct),document.querySelectorAll(".answer").forEach(s=>{s.disabled=!0;const r=Number(s.dataset.choice);r===n.correct&&s.classList.add("correct"),r===e&&s.classList.add("selected",i.correct?"correct":"wrong")}),W("answer-feedback").innerHTML=`<div class="feedback"><strong>${i.correct?"✓ תשובה נכונה.":"↺ לא הפעם. הנה ההסבר."}</strong><p>${ye(n.explanation.he)}</p>${n.explanation.en?`<p class="english" lang="en" dir="ltr">${ye(n.explanation.en)}</p>`:""}</div><button class="text-button" id="hold-feedback">להשהות ולקרוא את ההסבר</button><p class="feedback-note">התשובה נעולה. ההסבר נשאר גם ביומן.</p>`,Ti=()=>Ki(t),ei=setTimeout(()=>{Ti=null,Ki(t)},1500),W("hold-feedback").onclick=()=>{clearTimeout(ei),ei=null,Ti=null,W("hold-feedback").textContent="חזרה להמשך אוטומטי",W("hold-feedback").onclick=()=>{Ti=()=>Ki(t),ei=setTimeout(Ti,1500),W("hold-feedback").disabled=!0}})}function qg(n){if(M.scenario&&!M.scenario.completed.includes(n)||!(M.relay?Qi(M.relay,n):M.items.includes(Gt[n].id)&&M.understood.includes(Ye[n].id))||An(M,n).next)return;const t=Ye[n];if(M.seals.includes(t.id)||M.seals.push(t.id),Qt=es(M,null,J.getPlayer()).index??-1,bs=null,Nt=null,qt(),J.setProgress(M),Xt(),hn(),M.relay){bt("פנס שמיים · "+M.seals.length+" מתוך 3",`<div class="relay-star" aria-hidden="true">✧</div><h2 id="dialog-title">${$t(M.relay,n).name} מואר עכשיו</h2><p class="dialog-copy">${Pi(M)?"קבוצת הכוכבים של הכיתה זורחת מעל השער הצפוני. בואו לראות אותה.":"קרן אור נוספת הצטרפה למופע. בחרו איזה פנס להדליק עכשיו."}</p><button id="continue-world" class="primary">חזרה לשטח ←</button>`,"reward"),W("continue-world").onclick=pt;return}bt(`מערכת ${M.seals.length} מתוך 3 חזרה לפעולה`,Ir(n)+`<div class="score-big" style="font-size:52px">✓</div><h2 class="finish-title">${ye(t.system)} — פעיל</h2><p class="dialog-copy">${Pi(M)?"הגישה, הגיבוי והקשר פעילים. השער הצפוני נפתח. הגיע הזמן לצאת מהמתחם.":M.scenario?"שלב התיק הושלם. משימת השטח הבאה כבר מסומנת במפה.":"התחנה מגיבה. אפשר להמשיך לכל אחת מהתחנות האחרות. המפה עודכנה."}</p><button id="continue-world" class="primary">${Pi(M)?"לשער היציאה":"חזרה לשטח"} ←</button>`,"reward"),W("continue-world").onclick=pt}function Xt(){M&&(W("seal-slots").innerHTML=Ye.map((n,e)=>`<button class="seal ${M.seals.includes(n.id)?"done":""} ${(M.scenario?ti(M)===e:Qt===e)?"selected":""}" data-npc="${e}" title="${ye(M.relay?$t(M.relay,e).title:M.scenario?Cn(M.scenario.id).steps[e].title:n.name)}" aria-label="תחנה ${e+1}: ${ye(M.relay?$t(M.relay,e).title:n.name)}. ${M.seals.includes(n.id)?"הושלם":"הצגת הכיוון"}" aria-pressed="${Qt===e}">${M.seals.includes(n.id)?"✓":e+1}</button>`).join(""),document.querySelectorAll("[data-npc]").forEach(n=>n.onclick=()=>{if(fn=null,M.scenario){Nt=null,an="",ys(),At("משימות התיק מתקדמות לפי הסדר. המשימה הנוכחית מסומנת.");return}Nt=null,Qt=Number(n.dataset.npc),bs=M.understood.includes(Ye[Qt].id)&&!M.items.includes(Gt[Qt].id)?Gt[Qt].id:null,Xt()}),W("question-progress").innerHTML=`<bdi dir="ltr">${Object.keys(M.answers).length} / ${M.questions.length}</bdi> שאלות`,W("firefly-count").innerHTML=`✧ <bdi dir="ltr">${M.collected.length} / 12</bdi>`,W("objective").textContent=es(M,Qt,J.getPlayer()).title,W("environment-progress")&&(W("environment-progress").textContent=`${M.environment.visited.length}/12 תגליות`),W("quest-sub").textContent=es(M,Qt,J.getPlayer()).hint,ys())}function Wa(){return fn||kn.find(n=>n.id===Nt)||es(M,Qt,J.getPlayer())}function ys(){var o,a,l,c,u,d;if(!M||!J)return;J.setCarrying(!!((o=M.scenario)!=null&&o.carrying));const n=J.movement();W("crouch").setAttribute("aria-pressed",String(n.crouching)),W("crouch").disabled=n.carrying,W("dash").disabled=n.carrying||n.crouching||n.dashCooldown>0,W("dash").textContent=n.carrying?"נושאים ציוד":n.dashCooldown>0?`זינוק · ${n.dashCooldown.toFixed(1)}`:"זינוק Q";const e=M.scenario&&On(M);J.setScenario(e,(a=M.scenario)==null?void 0:a.checkpoint,(l=M.scenario)==null?void 0:l.completed.includes(ti(M))),J.setCompanion(e==null?void 0:e.entity,M.attemptId+":"+((e==null?void 0:e.kind)||""),e?{x:Ri(M).robotX??e.x+(e.entity==="fox"?0:1),z:Ri(M).robotZ??e.z+(e.entity==="fox"?0:1)}:null);const t=Wa(),i=t.id,s=fn||es(M,Qt,J.getPlayer());i!==an&&(an=i,(c=J.guideTo)==null||c.call(J,t.x,t.z),W("objective").textContent=Nt?`משימת שטח: ${t.name}`:s.title,W("quest-sub").textContent=Nt?((u=js(M).find(f=>f.id===t.id))==null?void 0:u.hint)||t.description:s.hint,va=M.elapsed),(e==null?void 0:e.kind)==="rescue-trust"&&!M.scenario.completed.includes(ti(M))&&(W("quest-sub").textContent=e.hint+` · אמון: ${Math.round((Ri(M).trust||0)/3*100)}%`);const r=(d=J.guidance)==null?void 0:d.call(J);if(W("follow-path").textContent=r!=null&&r.following?"עצירת ההליכה":r!=null&&r.arrived?"הגעתם — לפעולה":"ללכת איתי",W("follow-path").disabled=at!=="explore",Nt){const f=js(M).find(h=>h.id===Nt);if(f!=null&&f.done(M.environment)){Nt=null,an="",At("✓ משימת הצד הושלמה. חוזרים למסלול הראשי — אפשר לבחור עוד משימת צד.");return}}at==="explore"&&M.elapsed-Qc>18&&M.elapsed-va>25&&(va=M.elapsed,At(`הצעד הבא: ${s.title}. כפתור ״ללכת איתי״ יוביל אתכם, או פתחו רמז.`))}W("follow-path").onclick=()=>{var e,t,i;if(at!=="explore")return;const n=(e=J.guidance)==null?void 0:e.call(J);if(n!=null&&n.following){(t=J.stopGuide)==null||t.call(J);return}if(n!=null&&n.arrived){tl();return}(i=J.followGuide)==null||i.call(J),At("עוקבים אחרי השביל. תנועה בג׳ויסטיק או בחצים מחזירה לכם את השליטה.")};W("mission-hint").onclick=()=>{if(!M)return;const n=Wa(),e=es(M,Qt,J.getPlayer());bt("קשר צוות · הצעד הבא",`<h2 id="dialog-title">${ye(Nt?n.name:e.title)}</h2><p class="dialog-copy">${ye(Nt?n.description:e.hint)}</p><ol class="tutorial-steps"><li>הנקודות המוארות עוקפות עצים ומבנים ומובילות ליעד.</li><li>אפשר ללכת לבד או ללחוץ על ״ללכת איתי״. תנועה ידנית עוצרת את ההובלה.</li><li>כשמגיעים, לחצו על כפתור הפעולה הגדול. הוא אומר בדיוק מה אפשר לעשות.</li></ol><button id="hint-return" class="primary">הבנתי, ממשיכים לשטח ←</button><button id="hint-main" class="text-button">חזרה למשימה הראשית</button>`,"hint"),W("hint-return").onclick=pt,W("hint-main").onclick=()=>{fn=null,Nt=null,an="",pt(),Xt()}};W("side-task").onclick=()=>{M&&(bt("חקירה חופשית · אתגרי שטח",`<h2 id="dialog-title">עוד משהו לעשות בדרך</h2><p class="dialog-copy">${js(M).filter(n=>n.done(M.environment)).length} מתוך ${js(M).length} משימות צד הושלמו. בוחרים משימה והשביל מתעדכן. הציון הלימודי נשאר נפרד.</p>${js(M).map(n=>`<button class="side-mission ${n.done(M.environment)?"side-done":""}" data-side-mission="${n.id}"><strong>${n.done(M.environment)?"✓ ":""}${ye(n.title)}</strong><span>${ye(n.hint)}</span><small>${n.done(M.environment)?"הושלם":"סימון מסלול ←"}</small></button>`).join("")}<button id="side-main" class="text-button">להמשיך במשימה הראשית ←</button>`,"sidequests"),document.querySelectorAll("[data-side-mission]").forEach(n=>n.onclick=()=>{fn=null,Nt=n.dataset.sideMission,an="",pt(),ys()}),W("side-main").onclick=()=>{fn=null,Nt=null,an="",pt(),Xt()})};function Zi(){var d,f;if(!J||!M||at==="menu")return;const n=J.getPlayer();if(ys(),innerWidth<600){const h=document.querySelector(".quest-panel").getBoundingClientRect().bottom;W("map-toggle").style.top=h+12+"px",document.querySelector(".map-panel").style.top=h+66+"px"}else W("map-toggle").style.top="",document.querySelector(".map-panel").style.top="";const e=Math.max(Math.abs(n.x),Math.abs(n.z))>27,t=e||((d=M.relay)==null?void 0:d.territory)===1||!!fn;W("minimap").setAttribute("viewBox",t?"-110 -110 220 220":"-30 -30 60 60"),W("minimap").innerHTML=t?Au(M):`<path d="M0 25 L0 12 L-3 4 L0 -4 L0 -12 L7 -17 L7 -24 L0 -25 M-3 4 L-10 1 L-13 -9 M0 -4 L13 -7 M0 12 L10 14" fill="none" stroke="#719480" stroke-width="1.4"/><ellipse cx="-17" cy="13" rx="6.5" ry="5" fill="#467e86"/><rect x="-8" y="-23" width="12" height="6" fill="#718a78" rx="1"/>${Ye.map((h,p)=>{const _=M.relay?{...h,...$t(M.relay,p)}:h;return`<circle cx="${_.x}" cy="${_.z}" r="2.2" fill="${M.seals.includes(_.id)?"#5f8270":_.color}"/><text x="${_.x}" y="${_.z+1}" font-size="3" text-anchor="middle" fill="#152d30">${M.seals.includes(_.id)?"✓":p+1}</text>`}).join("")}<path d="M-2 -26H2V-23H-2Z" fill="${Pi(M)?"#daf69f":"#91a78d"}"/>${Gt.filter(h=>!M.items.includes(h.id)&&(bs===h.id||M.understood.includes(Ye[h.npc].id))).map(h=>`<rect x="${h.x-1.5}" y="${h.z-1.5}" width="3" height="3" fill="#d9b47d"/>`).join("")}${M.scenario&&On(M)?(On(M).points||[On(M)]).map((h,p)=>`<circle cx="${h.x}" cy="${h.z}" r="1.6" fill="#fff1c7"/><text x="${h.x}" y="${h.z+1}" font-size="2.7" text-anchor="middle" fill="#152d30">${p+1}</text>`).join(""):""}${kn.map(h=>`<circle cx="${h.x}" cy="${h.z}" r="${Nt===h.id?1.6:.7}" fill="${Nt===h.id?"#fff1c7":M.environment.visited.includes(h.id)?"#8ba994":"#b39e7a"}"/>`).join("")}<circle cx="${n.x}" cy="${n.z}" r="2.1" fill="#e8a169" stroke="#fff4cd" stroke-width=".7"/>`,W("location").textContent=e?La(n.x,n.z):n.z<-14?"ליד בית הספר":n.x<-10?"הספרייה והאגם":n.x>8&&n.z>5?"מגדל הפנס":n.x>8?"החממה":"קרחת היער";const i=Wa(),s=J.project(i.x,0,i.z),r=J.project(n.x,0,n.z);W("compass").style.transform=`rotate(${Math.atan2(s.x-r.x,r.y-s.y)*180/Math.PI}deg)`,W("direction-text").textContent=`${i.name||i.title} · ${Math.round(Math.hypot(n.x-i.x,n.z-i.z))} צעדים`,Ye.forEach(h=>{const p=W("label-"+h.id);if(!p)return;const _=M.relay?$t(M.relay,Ye.indexOf(h)):h;M.relay&&(p.textContent=Ye.indexOf(h)+1+" · "+_.title);const x=J.project(_.x,3.7,_.z);p.style.left=x.x+"px",p.style.top=x.y+"px",p.style.display=x.visible&&!M.scenario?"block":"none",p.classList.toggle("done",M.seals.includes(h.id))}),Gt.forEach(h=>{const p=W("label-"+h.id);if(!p)return;const _=J.project(h.x,2,h.z),x=Math.hypot(n.x-h.x,n.z-h.z);p.style.left=_.x+"px",p.style.top=_.y+"px",p.style.display=!M.relay&&!M.scenario&&!M.items.includes(h.id)&&_.visible&&(bs===h.id||x<7)?"block":"none"});const o=W("label-exit"),a=J.project(Js.x,6.2,Js.z);o&&(o.style.left=a.x+"px",o.style.top=a.y+"px",o.style.display=a.visible?"block":"none");const l=W("label-field");if(l){const h=M.scenario&&rr(M);if(h){const p=J.project(h.x,2,h.z);l.textContent=h.title,l.style.left=p.x+"px",l.style.top=p.y+"px",l.style.display=p.visible?"block":"none"}else l.style.display="none"}const c=el();W("interact").classList.toggle("hidden",!c||at!=="explore"),c&&(W("interact").innerHTML=c.type==="relay"?$t(M.relay,c.i).title:c.type==="spark"?"לאסוף ניצוץ ✧":c.type==="scenario"?`${M.scenario.completed.includes(ti(M))?"לשאלות התרגול":ye(On(M).title)} <kbd>E</kbd>`:c.type==="observation"?"סיום התצפית <kbd>E</kbd>":c.type==="environment"?`${ye(c.id==="bench"&&M.environment.seated?"לקום מהספסל":kn.find(h=>h.id===c.id).name)} <kbd>E</kbd>`:c.type==="animal"?`מפגש עם ${Ed[(f=J.animals().find(h=>h.id===c.id))==null?void 0:f.type]||"חיה"} <kbd>E</kbd>`:c.type==="exit"?`${Pi(M)?"יוצאים הביתה":"לבדוק את השער"} <kbd>E</kbd>`:c.type==="equipment"?`לבדוק ${ye(Gt[c.i].short)} <kbd>E</kbd>`:`לדבר עם ${ye(Ye[c.i].name)} <kbd>E</kbd>`);const u=W("label-environment");if(u){const h=(c==null?void 0:c.type)==="environment"?kn.find(p=>p.id===c.id):null;if(h&&at==="explore"){const p=J.project(h.x,2.2,h.z);u.textContent=Ia(h,M.environment)+" · "+h.name,u.style.left=p.x+"px",u.style.top=p.y+"px",u.style.display=p.visible&&!M.scenario?"block":"none"}else u.style.display="none"}}function ya(){return M.questions.filter(n=>Object.hasOwn(M.answers,n.id)).map(n=>{const e=M.answers[n.id];return`<details class="review-item"><summary>${e.correct?"✓":"↺"} ${ye(n.prompt)}</summary><p>התשובה שלכם: ${ye(n.choices[e.choice])}</p><p>התשובה הנכונה: ${ye(n.choices[n.correct])}</p><p>${ye(n.explanation.he)}</p>${n.explanation.en?`<p lang="en" dir="ltr">${ye(n.explanation.en)}</p>`:""}${wd(n)}</details>`}).join("")}function Xg(){if(M){if(M.relay){bt("יומן המסילה",`<h2 id="dialog-title">${qi[M.relay.edition].title}</h2>${Ye.map((n,e)=>`<div class="journal-entry"><h3>${M.seals.includes(n.id)?"✓":"◇"} ${$t(M.relay,e).title}</h3><p>${$t(M.relay,e).name} · ${An(M,e).answered} מתוך ${An(M,e).total} שאלות</p></div>`).join("")}${ya()}`,"journal");return}if(M.scenario){const n=Cn(M.scenario.id);bt("יומן תיק השטח",`<h2 id="dialog-title">${ye(n.title)}</h2><p class="dialog-copy">${ye(n.brief)}</p>${n.steps.map((e,t)=>`<div class="journal-entry"><h3>${M.seals.includes(Ye[t].id)?"✓":M.scenario.completed.includes(t)?"◇":"□"} ${t+1} · ${ye(e.title)}</h3><p>${ye(e.hint)}</p><p>${M.scenario.completed.includes(t)?"משימת השטח הושלמה":"משימת השטח ממתינה"} · ${An(M,t).answered}/${An(M,t).total} שאלות</p></div>`).join("")}<p class="feedback-note">משימות השטח והחקירה נפרדות מציון הלימוד. התשובות שכבר נמסרו נעולות.</p><h3>התשובות וההסברים</h3>${ya()||'<p class="feedback-note">השאלות יופיעו כאן אחרי שתענו.</p>'}`,"journal");return}bt("כל מה שגיליתם",`<h2 id="dialog-title">יומן ההרפתקה</h2>${M.scenario?`<h3>${ye(Cn(M.scenario.id).title)}</h3>${Cn(M.scenario.id).steps.map((n,e)=>`<p>${M.scenario.completed.includes(e)?"✓":"◇"} ${ye(n.title)}</p>`).join("")}`:""}${Ye.map((n,e)=>`<div class="journal-entry"><h3>${M.seals.includes(n.id)?"✓":"◇"} ${ye(n.name)}</h3><p>${ye(n.role)} · ${An(M,e).answered} מתוך ${An(M,e).total} שאלות</p><p>${e===0?"מצפון־מערב, ליד הספרייה.":e===1?"מצפון־מזרח, ליד החממה.":"מדרום־מזרח, ליד מגדל הפנס."}</p></div>`).join("")}<h3>ציוד וממצאים</h3>${Gt.map(n=>`<div class="journal-entry"><h3>${M.items.includes(n.id)?"✓":"□"} ${ye(n.name)}</h3><p>${ye(M.items.includes(n.id)?n.clue:n.hint)}</p></div>`).join("")}<h3>חקירה בקמפוס · ${M.environment.visited.length}/12</h3>${kn.map(n=>`<div class="journal-entry"><h3>${M.environment.visited.includes(n.id)?"✓":"□"} ${ye(n.name)}</h3><p>${ye(Ia(n,M.environment))} · ${M.environment.visited.includes(n.id)?ye(n.description):"אפשר לגלות בשטח. המפה מציגה את המיקום."}</p><button class="text-button" data-track-environment="${n.id}">להציג מיקום במפה ←</button></div>`).join("")}<p class="feedback-note">מפגשי טבע: ${M.environment.animalNotes.length} · עזרה לצוות: ${M.environment.helped.length}/3</p><h3>השאלות שכבר פתרתם</h3><p class="feedback-note">התשובות נעולות. אפשר לקרוא וללמוד מהן בכל רגע.</p>${ya()||'<p class="feedback-note">השאלות יופיעו כאן אחרי שתענו.</p>'}`,"journal"),document.querySelectorAll("[data-track-environment]").forEach(n=>n.onclick=()=>{const e=kn.find(t=>t.id===n.dataset.trackEnvironment);Nt=e.id,pt(),ys(),document.body.classList.add("map-open"),W("map-toggle").setAttribute("aria-expanded","true"),At(`${e.name} סומן במפה.`)})}}W("journal").onclick=Xg;const Ii=document.createElement("button");Ii.id="map-toggle";Ii.className="secondary map-toggle";Ii.textContent="מפה";Ii.setAttribute("aria-expanded","false");Ii.setAttribute("aria-controls","minimap");W("hud").appendChild(Ii);Ii.onclick=()=>{const n=document.body.classList.toggle("map-open");Ii.setAttribute("aria-expanded",String(n)),Ii.textContent=n?"סגירת מפה":"מפה"};const Td=document.createElement("span");Td.id="environment-progress";document.querySelector(".quest-bottom").appendChild(Td);function Ad(){if(M!=null&&M.scenario){const n=Cn(at==="menu"?is.value:M.scenario.id);bt("תדריך שטח · "+n.title,`<h2 id="dialog-title">${ye(n.title)}</h2><p class="dialog-copy">${ye(n.brief)}</p><ol class="tutorial-steps">${n.steps.map(e=>`<li>${ye(e.title)} — ${ye(e.hint)}</li>`).join("")}</ol><p class="feedback-note">WASD או חצים לתנועה, רווח לקפיצה, C להליכה שקטה, Q לזינוק עם התאוששות קצרה. עם מטען הולכים לאט ולא מזנקים. בנייד: ג׳ויסטיק וכפתורי קפיצה, שקט וזינוק. אחרי כל משימת שטח משלימים שאלות מהתרגול; אפשר לחזור ולקרוא תשובות ביומן. אחרי שלושה שלבים, יוצאים בשער.</p><button id="got-it" class="primary">חזרה למשימה ←</button>`,at==="menu"?"menu":"help"),W("got-it").onclick=pt;return}if(at==="menu"||M!=null&&M.relay){bt("מדריך שטח",'<h2 id="dialog-title">איך מדליקים את השמיים?</h2><div class="journal-entry"><h3>בוחרים פנס</h3><p>בחרו מספר בלוח המשימה. לכו בעזרת החצים או הג׳ויסטיק, או לחצו על ״ללכת איתי״.</p></div><div class="journal-entry"><h3>מחפשים אור</h3><p>אספו ניצוצות, קפצו בטבעת בעזרת רווח או כפתור החץ, וכוונו את המראות לפי הסמלים. בטבעת יש גם מתג קרקע.</p></div><div class="journal-entry"><h3>מציירים כוכבים</h3><p>ליד פנס טעון לחצו על כפתור הפעולה או על E וענו על שאלות התרגול. אחרי שלושה פנסים, פנו אל השער הצפוני.</p></div><p class="feedback-note">במשימת הקמפוס המקורית הצוות מחכה לציוד ליד שלוש התחנות.</p><button id="got-it" class="primary">חזרה ←</button>',at==="menu"?"menu":"help"),W("got-it").onclick=pt;return}bt("תדריך שטח",'<h2 id="dialog-title">איך יוצאים מכאן.</h2><div class="journal-entry"><h3>01 · משוטטים</h3><p>מקשי WASD או חצים כדי לזוז, רווח לקפוץ, Shift לרוץ. אפשר ללחוץ על הקרקע. בנייד: גוררים את העיגול וקופצים בכפתור החץ.</p></div><div class="journal-entry"><h3>02 · מקשיבים לחברים</h3><p>מתקרבים לדמות ולוחצים E או על כפתור השיחה. מבינים מה היא צריכה, מאתרים את הציוד שהוא צריך וחוזרים אליו להפעלת מסוף התרגול.</p></div><div class="journal-entry"><h3>03 · פותרים ויוצאים</h3><p>השאלות מגיעות מחומר התרגול שלכם. כל תשובה ננעלת ויש הסבר. אחרי הפעלת שלוש המערכות מגיעים לשער בצפון. אין זמן קצוב ואין קנס על טעות.</p></div><div class="journal-entry"><h3>חקירה חופשית</h3><p>מגלים 12 מקומות לפעולה: יושבים, פותחים דלתות, קולעים לסל, משקים וצופים בטבע. מתקרבים, לוחצים על הכפתור הגדול ובוחרים פעולה. ביומן יש מיקומים ורמזים. החקירה ועזרה לצוות אינן משנות את ציון הלימוד. F למסך מלא. Escape להשהיה.</p></div><button id="got-it" class="primary">חזרה למשימה ←</button>',M&&at!=="menu"?"help":"menu"),W("got-it").onclick=pt}W("how").onclick=Ad;function nl(){if(!(at==="menu"||at==="complete")){if(ns.open){pt();return}bt("היער יכול לחכות",`<h2 id="dialog-title">רגע לנשום.</h2><p class="dialog-copy">${Ac?"ההתקדמות נשמרה בלשונית הזאת.":"הדפדפן חסם שמירה מקומית. השאירו את הלשונית פתוחה כדי להמשיך."} העולם ממתין לכם.</p><div class="options"><button id="unpause" class="primary">חזרה ליער ←</button><button id="show-controls" class="secondary">איך משחקים?</button><button id="menu" class="secondary">חזרה למסך הפתיחה</button></div>`,"paused"),W("unpause").onclick=pt,W("show-controls").onclick=Ad,W("menu").onclick=Ha}}W("pause").onclick=nl;async function Rd(){try{document.fullscreenElement?await document.exitFullscreen():await document.documentElement.requestFullscreen()}catch{At("הדפדפן הזה לא מאפשר מסך מלא. אפשר להמשיך לשחק כרגיל.")}}W("fullscreen").onclick=Rd;W("sound").onclick=()=>{qs=!qs,W("sound").setAttribute("aria-pressed",String(qs)),W("sound").setAttribute("aria-label",qs?"כיבוי צלילים":"הפעלת צלילים"),W("sound").style.color=qs?"#d9bd85":"",hn()};window.addEventListener("keydown",n=>{var e;n.target.matches("input,select,textarea")||(n.code==="KeyF"&&(n.preventDefault(),Rd()),n.code==="Escape"&&!ns.open&&(n.preventDefault(),nl()),at==="question"&&/^Digit[1-4]$/.test(n.code)&&((e=document.querySelectorAll(".answer")[Number(n.code.slice(-1))-1])==null||e.click()))});document.addEventListener("visibilitychange",()=>{document.hidden&&at==="explore"&&nl(),document.hidden&&ei?(clearTimeout(ei),ei=null):!document.hidden&&at==="feedback"&&Ti&&(ei=setTimeout(Ti,1500))});window.addEventListener("pagehide",qt);async function jg(n){return hf(n)}async function wu(n=M,e=rn,t=Pa){const i={id:n.attemptId,name:t,quizId:e.id,answers:Object.entries(n.answers).map(([s,r])=>({id:s,choice:r.choice})),startedAt:n.startedAt,contentHash:await jg(e)};return _d=kg(i),xd(i)}async function Yg(){if(!Pi(M)||at==="complete")return;const n=M,e=rn,t=Pa,i=M.attemptId;qt();const s=Fu(M),r=sf(s),o=Object.values(M.answers).filter(u=>u.correct).length,a=`prepx-best-${rn.id}`,l=Number(zn.get(a));(!Number.isFinite(l)||s>l)&&zn.set(a,String(s)),bt("הגעתם הביתה ✧",`${M.relay?`<svg class="relay-finale" viewBox="0 0 180 64" role="img" aria-label="קבוצת הכוכבים של הכיתה"><polyline points="18,48 57,15 96,35 137,8 162,35"/> ${[[18,48],[57,15],[96,35],[137,8],[162,35]].map(([u,d])=>`<path transform="translate(${u} ${d})" d="M0 -6 L2 -2 6 0 2 2 0 6 -2 2 -6 0 -2 -2Z"/>`).join("")}</svg>`:""}<div class="stars" aria-label="${r} כוכבים מתוך שלושה">${"★".repeat(r)+"☆".repeat(3-r)}</div><h2 class="finish-title" id="dialog-title">${M.relay?"הכוכבים נדלקו מעל בית הספר.":"המערכות פעילות.<br>הדרך החוצה פתוחה."}</h2><p class="finish-title feedback-note">צוות איינשטיין, המשימה הושלמה. בפעם הבאה נשארים להאקתון בשעות האור.</p><div class="score-big">${s}<small> / 100</small></div><div class="stats-row"><div><strong>${o}/${M.questions.length}</strong><small>תשובות נכונות</small></div><div><strong>3</strong><small>${M.relay?"פנסים דולקים":"מערכות פעילות"}</small></div><div><strong>${M.collected.length}</strong><small>גחליליות</small></div></div><p id="save-status" class="saved-note" role="status">שומרים את התוצאה בהיסטוריית המשחק…</p><div class="dialog-actions"><button id="replay" class="primary">משימה חדשה ↺</button><a class="secondary" href="https://hitech.agnon.online/subject.html?subject=${rn.subject_id}">לחומר הלימוד ↗</a></div><button id="review-results" class="text-button">התשובות וההסברים שלכם <span>↓</span></button><div id="final-review" class="hidden">${ya()}</div>`,"complete"),W("replay").onclick=()=>{Eu(),M=null,Ha()},W("review-results").onclick=()=>W("final-review").classList.toggle("hidden"),Cc=wu(n,e,t);const c=await Cc;if(at==="complete"&&(M==null?void 0:M.attemptId)===i&&(W("save-status").textContent=c?"✓ התוצאה נשמרה בהיסטוריית המשחק. לא נשלח דוא״ל.":_d?"אין חיבור להיסטוריה כרגע. התוצאה נשמרה במכשיר וממתינה לשליחה.":"השמירה נכשלה והדפדפן חסם שמירה מקומית. השאירו את הלשונית פתוחה ונסו שוב.",!c)){const u=document.createElement("button");u.className="text-button",u.textContent="לנסות לשמור שוב",u.onclick=async()=>{u.disabled=!0,await wu(n,e,t)?(W("save-status").textContent="✓ התוצאה נשמרה בהיסטוריית המשחק.",u.remove()):u.disabled=!1},W("save-status").after(u)}c&&(M==null?void 0:M.attemptId)===i&&Eu()}try{J=Og(W("world"),{reduced:zg,onInteract:tl,onGust:()=>At("רוח נגדית! קפצו מעל שומר הרוח כדי לשמור על התנופה."),onEnvironmentChange:n=>{M&&dn(n)},onCollect:n=>{!M||M.collected.includes(n)||(M.collected.push(n),Xt(),qt(),hn(),M.collected.length%3===0&&At(`${M.collected.length} נקודות טבע תועדו ביומן. החקירה לא משנה את ציון הלימוד.`))},onMove:(n,e,t)=>{if(M){if(Math.hypot(n-M.player.x,e-M.player.z)>.01&&(Qc=M.elapsed),M.player={x:n,z:e},at==="explore"&&Zg(n,e),M.relay&&at==="explore"&&Kg(n,e),M.elapsed+=t,M.scenario){const i=On(M),s={...J.movement(),companion:J.getCompanion()};if(Jd(M,J.getPlayer(),s,t),(i==null?void 0:i.kind)==="robot-escort"&&s.companion){const r=Ri(M);r.robotX=s.companion.x,r.robotZ=s.companion.z}if(at==="explore"&&(i==null?void 0:i.kind)==="courier-course"&&!M.scenario.completed.includes(ti(M))){const r=No(M,{type:"checkpoint"},J.getPlayer(),s);r.ok&&(qt(),an="",Xt(),At(r.message))}}Lo+=t,Lo>1&&(Lo=0,qt())}}}),W("loading").classList.add("hidden")}catch{W("loading").innerHTML='<div style="max-width:320px;text-align:center"><h2>היער צריך דפדפן עם תלת־ממד.</h2><p>נסו לעדכן את הדפדפן או להפעיל האצת חומרה.</p><a href="https://hitech.agnon.online/" class="primary">בינתיים, לתרגול הרגיל ←</a></div>',W("start").disabled=!0}W("world").addEventListener("worldlost",()=>{bt("החיבור לתלת־ממד נעצר",'<h2 id="dialog-title">נשמר לכם מקום ביער.</h2><p class="dialog-copy">רעננו את העמוד ובחרו בהמשך ההרפתקה השמורה.</p><button id="reload" class="primary">רענון וחזרה</button>',"paused"),W("reload").onclick=()=>location.reload()});const Ur=W("joystick");let il=null;function Cd(n){if(il!==n.pointerId)return;const e=Ur.getBoundingClientRect();let t=(n.clientX-e.left-e.width/2)/36,i=(n.clientY-e.top-e.height/2)/36;const s=Math.max(1,Math.hypot(t,i));t/=s,i/=s,J==null||J.setJoystick(t,i),W("stick").style.transform=`translate(${t*28}px,${i*28}px)`}Ur.addEventListener("pointerdown",n=>{il=n.pointerId,Ur.setPointerCapture(n.pointerId),Cd(n)});Ur.addEventListener("pointermove",Cd);function Pd(){il=null,J==null||J.setJoystick(0,0),W("stick").style.transform=""}for(const n of["pointerup","pointercancel","lostpointercapture"])Ur.addEventListener(n,Pd);W("jump").onclick=()=>J==null?void 0:J.jump();W("crouch").onclick=()=>{J==null||J.setCrouching(!J.movement().crouching),Zi()};W("dash").onclick=()=>{J==null||J.dash(),Zi()};setInterval(Zi,80);window.render_game_to_text=()=>{var n;return JSON.stringify({mode:at,coordinateSystem:"x east, z south; y up; world -108..108. Arrow/WASD movement is camera-relative.",source:Rc,quiz:rn.id,territory:M?{region:La(M.player.x,M.player.z),stones:M.stones,skyGates:M.skyGates,wind:J==null?void 0:J.windState()}:null,scenario:M!=null&&M.scenario?{...M.scenario,title:Cn(M.scenario.id).title,stage:ti(M),step:On(M)}:null,movement:J?{...J.movement(),companion:J.getCompanion()}:null,player:J==null?void 0:J.getPlayer(),target:el(),environment:M?kn.map(e=>({...e,state:Ia(e,M.environment),visited:M.environment.visited.includes(e.id),action:Iu(e,M.environment)})):[],environmentState:(M==null?void 0:M.environment)||null,environmentAnimation:J==null?void 0:J.environmentAnimation(),observing:(J==null?void 0:J.isObserving())||!1,rendering:J==null?void 0:J.performance(),relay:M!=null&&M.relay?{...M.relay,stations:[0,1,2].map(e=>$t(M.relay,e))}:null,mission:M?{objective:es(M,Qt,J.getPlayer()),target:Wa(),navigation:(n=J==null?void 0:J.guidance)==null?void 0:n.call(J),fieldCheck:Nn,sideCompleted:js(M).filter(e=>e.done(M.environment)).length}:null,npcs:Ye.map((e,t)=>({id:e.id,x:e.x,z:e.z,understood:(M==null?void 0:M.understood.includes(e.id))||!1,sealed:(M==null?void 0:M.seals.includes(e.id))||!1,progress:M?An(M,t):null})),equipment:Gt.map(e=>({id:e.id,x:e.x,z:e.z,collected:(M==null?void 0:M.items.includes(e.id))||!1})),exit:{...Js,open:M?Pi(M):!1},question:wi&&["question","feedback"].includes(at)?{id:wi.id,prompt:wi.prompt,options:wi.options.map(e=>e.text),locked:!!(M!=null&&M.answers[wi.id])}:null,answered:M?Object.keys(M.answers).length:0,total:rn.questions.length,score:M?Fu(M):0,fireflies:(M==null?void 0:M.collected.length)||0,elapsed:Math.floor((M==null?void 0:M.elapsed)||0),animals:J==null?void 0:J.animals(),paused:ns.open})};window.advanceTime=n=>J==null?void 0:J.advanceTime(n);yd().then(gd);function wr(n,e){const t=M.relay;t.steps[n]!==e&&(t.steps[n]=e,qt(),J.setProgress(M),Xt(),hn(),At(Qi(t,n)?"✧ הפנס טעון! הפעילו אותו כדי לפתוח את התרגול.":$t(t,n).task==="sparks"?"✧ ניצוץ נאסף":"✧ המראה מכוונת"))}function Kg(n,e){const t=M.relay;for(let i=0;i<3;i++){if(Qi(t,i))continue;const s=$t(t,i);if(s.task==="sparks")for(const r of Da(s))Math.hypot(n-r.x,e-r.z)<.95&&wr(i,t.steps[i]|1<<r.bit);s.task==="ring"&&J.getPlayer().y>.65&&Math.hypot(n-s.x,e-s.z)<1.95&&wr(i,1)}}function Ld(n){const{i:e}=n,t=M.relay,i=$t(t,e);if(Qt=e,Nt=null,n.type==="spark"){wr(e,t.steps[e]|1<<n.bit);return}if(Qi(t,e)){Ki(e);return}if(i.task==="sparks"){At("עקבו אחרי הניצוצות הזהובים ואספו את שלושתם."),Xt();return}if(i.task==="ring"){bt("טבעת הרוח",'<h2 id="dialog-title">מרימים את האור</h2><p class="dialog-copy">קפצו בתוך הטבעת בלחיצה על רווח או על חץ הקפיצה. אפשר גם להטעין אותה בעזרת מתג הקרקע.</p><button id="ring-jump" class="primary">חזרה לטבעת ←</button><button id="ground-switch" class="secondary">הפעלת מתג הקרקע</button>',"relay"),W("ring-jump").onclick=pt,W("ground-switch").onclick=()=>{pt(),wr(e,1)};return}const s=qi[t.edition].sequence;bt("מראות הירח",`<h2 id="dialog-title">כוונו את המראות</h2><p class="dialog-copy">הסדר החרוט על הלוח</p><ol class="relay-sequence">${s.map((r,o)=>`<li>${o<t.steps[e]?"✓ ":""}${cl[r]}</li>`).join("")}</ol><div class="field-options">${cl.map((r,o)=>`<button class="secondary" data-mirror="${o}">${r}</button>`).join("")}</div><p id="mirror-feedback" role="status">בחרו את הסמל בשלב ${t.steps[e]+1}.</p>`,"relay"),document.querySelectorAll("[data-mirror]").forEach(r=>r.onclick=()=>{if(Number(r.dataset.mirror)!==s[t.steps[e]]){W("mirror-feedback").textContent="המראה עוד חשוכה. נסו את הסמל המסומן בשלב "+(t.steps[e]+1)+".";return}wr(e,t.steps[e]+1),Qi(t,e)?(pt(),Ki(e)):Ld(n)})}function Zg(n,e){if(Math.max(Math.abs(n),Math.abs(e))<25&&!fn)return;const t=Ji.find(o=>Math.hypot(n-o.x,e-o.z)<3);if(t&&!M.stones.includes(t.id)&&(M.stones.push(t.id),qt(),At("✧ התגלתה אבן דרך · "+t.name),hn()),fn&&Math.hypot(n-fn.x,e-fn.z)<2&&(fn=null,an="",ys()),J.getPlayer().y<.55)return;const i=Zs.findIndex(([o,a],l)=>!M.skyGates.includes(l)&&Math.hypot(n-o,e-a)<1.65);if(i<0)return;M.skyGates.push(i),J.catchWind(),J.setProgress(M),qt(),hn();const s=Math.floor(i/3),r=[0,1,2].every(o=>M.skyGates.includes(s*3+o));At(r?"★ מסלול הרוח הושלם · "+La(n,e):`✧ טבעת שמיים ${M.skyGates.length}/9 · חמש שניות של תנופה!`)}function Dd(){if(at!=="explore")return;bt("מפת העולם · "+La(M.player.x,M.player.z),Wd(M),"atlas");const n=[Tr,...Ji];document.querySelectorAll("[data-walk]").forEach(e=>e.onclick=()=>{const t=n.find(i=>i.id===e.dataset.walk);fn={...t,title:t.name,hint:"עקבו אחרי השביל עד אבן הדרך."},Nt=null,an="",pt(),ys(),J.followGuide()}),document.querySelectorAll("[data-travel]").forEach(e=>e.onclick=()=>{const t=n.find(i=>i.id===e.dataset.travel);!M.relay||!t||t!==Tr&&!M.stones.includes(t.id)||(pt(),fn=null,an="",J.setPlayer(t.x,t.z),M.player={x:t.x,z:t.z},qt(),Xt(),At("הגעתם אל "+t.name))}),W("atlas-back").onclick=()=>{fn=null,an="",pt(),Xt()}}W("atlas").onclick=Dd;window.addEventListener("keydown",n=>{n.code==="KeyM"&&!n.repeat&&at==="explore"&&(n.preventDefault(),Dd())});
