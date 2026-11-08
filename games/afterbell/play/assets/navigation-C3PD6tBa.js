(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const Or=n=>String(n||"").replace(/[&<>"']/g,e=>`&#${e.charCodeAt(0)};`);function Gm(n){const e=n.context?`<p dir="auto">${Or(n.context)}</p>`:"",t=typeof n.image=="string"&&/^https:\/\/user\.cdn\.wordwall\.net\/content-images\/[a-zA-Z0-9/_-]+$/.test(n.image)?`<img src="${Or(n.image)}" alt="${Or(n.imageAlt)}" referrerpolicy="no-referrer" style="display:block;max-width:100%;width:auto;height:100px;object-fit:contain;margin:8px auto">`:"";return e+t}const ga=108,Hl={id:"campus",name:"קמפוס שי עגנון",x:0,z:9},ys=[{name:"ביצות הגאות",color:"#719f9c",sites:[{id:"mill",name:"טחנת הגאות",x:59,z:12},{id:"dock",name:"רציף הפנסים",x:84,z:54}]},{name:"מחצבת הענבר",color:"#cc9a62",sites:[{id:"arch",name:"קשת הענבר",x:-62,z:14},{id:"mine",name:"מכרה הגבישים",x:-86,z:60}]},{name:"רכס הכוכבים",color:"#a3a6d9",sites:[{id:"dome",name:"מצפה השחר",x:-15,z:-72},{id:"array",name:"מעגל האנטנות",x:62,z:-82}]}],Sc=ys.flatMap(n=>n.sites.map(e=>({...e,region:n.name,color:n.color}))),Hm=[[[19,12],[27,12],[45,12],[59,12],[73,28],[84,54]],[[-10,1],[-20,0],[-27,0],[-40,0],[-62,14],[-76,33],[-86,60]],[[7,-24],[0,-27],[-6,-44],[-15,-72],[9,-86],[44,-82],[62,-82]],[[62,-82],[73,-56],[62,-26],[59,12]],[[-86,60],[-60,83],[-20,80],[0,67],[0,27],[0,25]],[[0,67],[35,58],[45,54],[84,54]]],Wl=[12,54];function Wm(n,e){return Math.abs(n-45)<3.6&&e>-40&&e<91&&Wl.every(t=>Math.abs(e-t)>2.1)}function qm(n,e){return Math.max(Math.abs(n),Math.abs(e))<=27?Hl.name:e<-38?ys[2].name:n<0?ys[1].name:ys[0].name}function ql(n){return Array.isArray(n)?Sc.filter(e=>n.includes(e.id)).map(e=>e.id):[]}const Xl=[[33,12],[50,12],[73,28],[-36,0],[-54,10],[-76,33],[-5,-42],[-14,-64],[25,-84]],Yl=[{name:"רחבת הכניסה",x:0,z:10},{name:"שביל הספרייה",x:-10,z:1},{name:"גינת החממה",x:9,z:-5},{name:"דרך המגדל",x:10,z:13},{name:"מצפה הצפון",x:7,z:-16},{name:"שביל הגחליליות",x:-7,z:20}],La=[{title:"מסילת הכוכבים",story:"באמצע מופע הכיתה כבה המקרן. שלושה פנסי שמיים התפזרו מעבר לשער. חברו אותם כדי לצייר שוב כוכבים מעל בית הספר.",sites:[0,2,4],tasks:["sparks","ring","mirror"],sequence:[1,0,2]},{title:"מצעד הגחליליות",story:"הגחליליות יצאו מהביצות לפני שהפנסים נדלקו. הדליקו להן שלוש תחנות אור שיובילו את המצעד עד השער.",sites:[1,3,5],tasks:["mirror","sparks","ring"],sequence:[2,1,0]},{title:"האות מהמצפה",story:"המצפה קלט אות מקוטע. שלוש משואות ברחבי הארץ מחזיקות חלקים ממנו. חברו את האות כדי לחשוף את קבוצת הכוכבים שממנה הגיע.",sites:[3,4,1],tasks:["ring","mirror","sparks"],sequence:[0,2,1]}],jl={sparks:"שובל הניצוצות",ring:"טבעת הרוח",mirror:"מראות הירח"},Xm=["ירח ☾","שמש ☀","כוכב ✧"];function Ym(n,e=Math.random){const t=La.map((i,s)=>s).filter(i=>i!==n);return{territory:1,edition:t[Math.floor(e()*t.length)],steps:[0,0,0]}}function ws(n,e){const t=La[n.edition],i=t.tasks[e];return{...(n.territory===1?Sc:Yl)[t.sites[e]],task:i,title:jl[i],index:e}}function wc(n,e){const t=ws(n,e).task;return n.steps[e]==={sparks:7,ring:1,mirror:3}[t]}function $l(n){return!!n&&(n.territory===void 0||n.territory===1)&&Number.isInteger(n.edition)&&!!La[n.edition]&&Array.isArray(n.steps)&&n.steps.length===3&&n.steps.every((e,t)=>Number.isInteger(e)&&e>=0&&e<={sparks:7,ring:1,mirror:3}[ws(n,t).task])}function Kl(n){return[[-2,2],[2,1],[0,-2.5]].map(([e,t],i)=>({x:n.x+e,z:n.z+t,bit:i}))}function jm(n,e,t,i){if(!e.length)return null;const s=e.includes(t)?t:e.sort((l,h)=>{const u=f=>{const p=ws(n,f);return Math.hypot(p.x-i.x,p.z-i.z)};return u(l)-u(h)})[0],r=ws(n,s),o=wc(n,s),a=!o&&r.task==="sparks"&&Kl(r).find(l=>!(n.steps[s]&1<<l.bit)),c=o?"האור מוכן. הפעילו את הפנס וענו על שאלות התרגול.":{sparks:"אספו שלושה ניצוצות בשטח, בכל סדר.",ring:"קפצו לתוך הטבעת, או הפעילו את המתג בבסיס שלה.",mirror:"כוונו שלוש מראות לפי סדר הסמלים שעל הלוח."}[r.task];return{...r,...a||{},id:"relay-"+s+"-"+n.steps[s],title:r.title+" · "+r.name,hint:c,action:"אל הפנס"}}const it=(n,e,t,i,s,r={})=>({kind:n,title:e,hint:t,x:i,z:s,...r}),$n=(n,e,t,i,s={})=>it(n,e,t,...i[0],{points:i.map(([r,o])=>({x:r,z:o})),...s}),_a=[{id:"evidence",title:"תיק הראיות",quizzes:["facts"],brief:"חוקרים זירת תקלה: בודקים ממצאים, בונים קשרים ומשחזרים את הערב מתוך ראיות.",steps:[it("evidence-scene","בדיקת זירת התקלה","בדקו כל פריט בזירה. אספו רק שלושה ממצאים שאפשר לבדוק; השערה אינה ראיה.",-4,12),it("evidence-board","לוח הקשרים","חברו כל ממצא למסקנה היחידה שהוא תומך בה. אין להסיק מעבר למה שנמצא.",-14,-3),it("evidence-timeline","שחזור ארבעת האירועים","סדרו את הכרטיסים לפי חותמות הזמן שעליהם. הזיזו כרטיס למעלה או למטה, ואז הגישו את השחזור.",4,-10)]},{id:"witness",title:"העד שנעלם",quizzes:["questions"],brief:"חוקרים שתי עדויות, מזהים סתירה ובוחרים היכן לחפש את העד בעולם.",steps:[it("witness-interview","ראיון עם שני עדים","עברו בין נועה ואיתי. שאלו שאלות על מקום, זמן ואדם; אספו שלושה פרטים שימושיים לפני הסיכום.",10,-2),it("witness-timetable","העדות שלא מסתדרת","לוח המצלמות מציב את איתי בחממה ב־18:10 וב־18:20. סמנו את שתי הטענות שסותרות את הלוח.",18,2),$n("witness-search","חיפוש לפי העדות","העד תיאר מים ומקום ישיבה. בחרו אתר חיפוש, לכו אליו ובדקו אותו. חיפוש שגוי נותן רמז נוסף.",[[19,11],[4,-10],[-7,20]])]},{id:"robot",title:"חילוץ הרובוט",quizzes:["instructions"],brief:"לא עוד אתחול פשוט: מתכנתים מעקף, מתקנים מעגל ומלווים רובוט אמיתי בחזרה לתחנה.",steps:[it("robot-route","תוכנית חילוץ במבוך","תכנתו מסלול ברשת 5×5: מ־S בפינה העליונה השמאלית אל G בפינה התחתונה הימנית. הימנעו מתאים חסומים.",4,-10),it("robot-circuit","תיקון ארבעה חיבורים","חברו כל יציאה בצבע ובצורה המתאימים. בוחרים יציאה ואז כניסה; חיבור לא מתאים לא נשמר.",18,2),$n("robot-escort","מלווים את הרובוט הביתה","הרובוט נע לאט מכם. הובילו אותו דרך שלוש תחנות וחכו שיגיע לפני אישור כל תחנה.",[[19,11],[9,21],[-7,20]],{entity:"robot"})]},{id:"survey",title:"מודדי הקמפוס",quizzes:["physics-basics"],brief:"יוצאים לסקר אמיתי: מודדים מקטע, תוחמים חלקה ומתרגמים שרטוט למפת שטח.",steps:[it("survey-ruler","מדידה בין שתי נקודות","כוונו את קצוות הסרגל לשני הסימונים שעל המוט, ואז רשמו את האורך ביניהם. קוראים את ההפרש, לא את קצה הסרגל.",-4,12),it("survey-parcel","תיחום חלקת הקרקע","סמנו את כל המשבצות בתוך הגבול בצורת ר׳. כל משבצת היא מטר רבוע אחד. חשבו את שטח החלקה.",-14,-3),it("survey-scale","משרטוט למפת השטח","קנה המידה: כל סנטימטר בשרטוט הוא 10 מטרים בשטח. המבנה ברוחב 4 ס״מ ובעומק 3 ס״מ. מלאו את שתי המידות.",4,-10)]},{id:"freight",title:"משלוח במידות",quizzes:["physics-units"],brief:"מפעילים מרכז שילוח: מתקנים יחידות, מאזנים מטען ואורזים חלקים בעלי צורות שונות.",steps:[it("freight-manifest","תיקון תעודת המשלוח","לוח באורך 250 ס״מ וצינור באורך 0.8 מ׳ צריכים לצאת. השלימו את ההמרות ובחרו רכב שהלוח נכנס אליו.",18,2),it("freight-balance","איזון שלושה משקולות","חלקו את המשקולות 2, 3 ו־5 ק״ג בין שתי הכפות. כל משקולת חייבת להימצא על כף, ושני הצדדים צריכים להתאזן.",19,11),it("freight-packing","אריזה ללא חפיפה","הארגז הוא רשת ⁦4×3⁩. בחרו חלק, סובבו בעת הצורך ולחצו על משבצת להצבת הפינה שלו. ארזו את שלושת החלקים בלי חריגה או חפיפה.",-4,12)]},{id:"optics",title:"המעבדה המדויקת",quizzes:["physics-precision"],brief:"עובדים כמו צוות מעבדה: ממקדים תמונה, מתקנים זווית הסתכלות ובודקים מדידות חוזרות.",steps:[it("optics-focus","מיקוד וחשיפה","כוונו בנפרד את המיקוד ואת החשיפה עד ששלושת הסימנים חדים וברורים. רק אז צלמו את לוח הכיול.",-9,-12),it("optics-parallax","ביטול שגיאת ההסתכלות","בכל עין יישרו את הכוונת עם הקו המרכזי. שני המבטים צריכים להיפגש באותו סימון, ולא רק להיראות קרובים.",4,-10),it("optics-samples","סדרת מדידות חוזרות","קחו חמש מדידות. סמנו את הקריאה החריגה, והקלידו את הממוצע של ארבע הקריאות שנותרו.",10,-2)]},{id:"shadow",title:"סוד הצללים",quizzes:["physics-pole"],brief:"לומדים את המגדל דרך האור: מניעים מקור אור, משווים יחסים וקוראים שעון שמש.",steps:[it("shadow-light","מי מזיז את הצל?","הציבו את מקור האור בצד המזרחי, ואז סמנו לאיזה צד נופל הצל. נוגעים במקור ובצל בנפרד.",9,21),it("shadow-height","גובה מתוך שני צללים","עמוד הייחוס בגובה 2 מטרים מטיל צל באורך 3 מטרים. צל המגדל באורך 9 מטרים. כוונו את עמוד הייחוס ורשמו את גובה המגדל.",10,-2),it("shadow-sundial","שתי תצפיות בשעון השמש","העבירו את השעה ל־10 ול־14 ושמרו תצפית בכל שעה. לאחר מכן בחרו באיזו תצפית הצל קצר יותר.",-9,-12)]},{id:"rescue",title:"מחזירים את השועל",quizzes:["facts"],brief:"השועל הוא שותף למשימה: מרוויחים את אמונו, בונים לו מחסה ומטפלים בשלושה צרכים שונים.",steps:[it("rescue-trust","מרוויחים את אמון השועל","התקרבו לשועל בהליכה שקטה והישארו לידו שלוש שניות. קימה או התרחקות מפחיתות אמון; אין לחץ זמן.",-7,20,{entity:"fox"}),it("rescue-shelter","בונים פינת מחסה","מקמו מים בצד השמאלי, מצע בשורה האחורית וגגון במרכז. השאירו את המשבצת הקדמית האמצעית פנויה ככניסה.",-14,-3),it("rescue-care","קוראים את צורכי השועל","הרגיעו את השועל לפני הצעת מים. אחרי השתייה אפשר לתת לו לנוח במחסה. עקבו אחרי מדדי השקט, המים והמנוחה.",-9,-12)]},{id:"relay",title:"האות האחרון",quizzes:["questions"],brief:"מקימים קשר מחדש: מסנכרנים גל, משדרים הודעת מורס ומשקמים רשת עם צומת תקול.",steps:[it("relay-wave","סנכרון שני גלים","כוונו תדירות ומופע עד שהגל שלכם חופף לגל המקווקו. כיוון נכון של כפתור אחד בלבד אינו מספיק.",9,21),it("relay-morse","משדרים SOS","טבלת הקוד: S היא שלוש נקודות; O היא שלושה קווים. שדרו אות, סיימו אות, והמשיכו עד להודעה SOS.",19,11),it("relay-network","מעקף לצומת שנפל","חברו את התחנה משמאל אל התחנה מימין דרך התחנות התקינות שביניהן. הצומת האדום תקול ואסור להשתמש בו.",18,2)]},{id:"courier",title:"שליחי הלילה",quizzes:["instructions","english-v1-practice","english-vocabulary-12","english-vocabulary-20","english-vocabulary-28","english-parts-sort","english-parts-quiz","english-negative-1","english-negative-2","english-affirmative-1","english-affirmative-2","english-questions-1"],brief:"משלוח עם החלטות ותנועה: מתכננים מסלול, עוברים מסלול תנועה ומוסרים כל חבילה לארונית הנכונה.",steps:[it("courier-plan","מסלול עם תקציב מרחק","אוספים מפתח במחסן לפני הכניסה למעבדה, ומסיימים בשער. התקציב הוא 14 יחידות דרך. בחרו סדר עצירות ובדקו את הסכום.",-4,12),$n("courier-course","מסלול ארבע התנועות","סימון 1: קפיצה. סימון 2: זינוק ב־Q. סימון 3: קפיצה. סימון 4: נחיתה ועמידה. השלימו את התנועות בשטח, לא מתוך חלון.",[[-8,4],[-14,-3],[-9,-12],[4,-10]]),$n("courier-lockers","כל חבילה לארונית שלה","לכל ארונית קוד אחרת. הגיעו אליה ובחרו חבילה שהקוד שעליה הפוך לקוד הארונית. מסירה שגויה נשארת בתיק.",[[10,-2],[18,2],[19,11]])]}],Ec=n=>_a.find(e=>e.id===n);function $m(n,e){const t=_a.filter(i=>i.quizzes.includes(n));return(t.find(i=>i.id!==e)||t[0]||_a[0]).id}const Jl=n=>({id:n,revision:2,completed:[],checkpoint:0,sequence:[],commands:[],carrying:!1,data:{}});function va(n,e=0){return e>5?!1:n===null||typeof n=="boolean"?!0:typeof n=="number"?Number.isFinite(n)&&Math.abs(n)<1e4:typeof n=="string"?n.length<=80:Array.isArray(n)?n.length<=64&&n.every(t=>va(t,e+1)):!!n&&typeof n=="object"&&Object.keys(n).length<=32&&Object.entries(n).every(([t,i])=>!["__proto__","constructor","prototype"].includes(t)&&t.length<=40&&va(i,e+1))}function Zl(n){var e;if(!n||!Ec(n.id)||!Array.isArray(n.completed)||n.completed.length>3||n.completed.some((t,i)=>t!==i)||!Number.isInteger(n.checkpoint)||n.checkpoint<0||n.checkpoint>3||!Array.isArray(n.sequence)||n.sequence.length>3||!Array.isArray(n.commands)||n.commands.length>16||typeof n.carrying!="boolean"||n.revision!==void 0&&n.revision!==2||n.revision===2&&(!va(n.data)||Array.isArray(n.data)||typeof n.data!="object"||!n.data))return null;if(n.revision===2){const t=n.data,i=["inspected","evidence","links","order","notes","claims","commands","wires","cells","bins","samples","observations","layout","edges","route","delivered"];for(const s of i)if(t[s]!==void 0&&(!Array.isArray(t[s])||t[s].some(r=>!Number.isFinite(r))))return null;for(const[s,r]of[["links",3],["order",4],["bins",3],["placements",3],["layout",3]])if(t[s]!==void 0&&(!Array.isArray(t[s])||t[s].length!==r))return null;if((e=t.placements)!=null&&e.some(s=>s!==null&&(!Number.isInteger(s.x)||!Number.isInteger(s.y)||typeof s.rotate!="boolean"))||t.letters!==void 0&&(!Array.isArray(t.letters)||t.letters.length>3||t.letters.some(s=>!["...","---"].includes(s)))||t.current!==void 0&&(typeof t.current!="string"||!/^[-.]{0,3}$/.test(t.current)))return null}return{...Jl(n.id),completed:[...n.completed],checkpoint:n.revision===2?n.checkpoint:0,data:n.revision===2?structuredClone(n.data):{}}}function xr(n){return["owl","pigeon","raccoon"].findIndex(e=>!n.seals.includes(e))<0?3:["owl","pigeon","raccoon"].findIndex(e=>!n.seals.includes(e))}function gr(n){var e,t;return(t=Ec((e=n.scenario)==null?void 0:e.id))==null?void 0:t.steps[xr(n)]}function Ua(n){const e=gr(n);if(!e)return{};const t=n.scenario;return t.data.task!==e.kind&&(t.data={task:e.kind},t.checkpoint=0),t.data}function Ql(n){var r,o;const e=xr(n),t=gr(n);if(!t)return null;Ua(n);const i=n.scenario.completed.includes(e),s=(i?(r=t.points)==null?void 0:r.at(-1):(o=t.points)==null?void 0:o[n.scenario.checkpoint])||t;return{id:`scenario:${n.scenario.id}:${e}:${n.scenario.checkpoint}:${i}`,kind:"scenario",index:e,...s,title:i?"משימת השטח הושלמה — לתיק הלימוד":t.title,hint:i?"לחצו על פעולה כדי להמשיך לשאלות.":t.hint,action:i?"לשאלות התרגול":"למשימת השטח"}}const eh=["צילום: שלושה חלונות מוארים","ניחוש: מישהו כנראה נשאר בכיתה","לוג: הפסקת חשמל ב־18:12","דעה: זה המסוף הכי גרוע","כרטיס כניסה חתום ב־18:05","שמועה: התקלה קרתה בגלל שועל"],Km=[{label:"18:12 · הפסקת חשמל",time:12},{label:"18:20 · נעילת המבנה",time:20},{label:"18:00 · פתיחת המעבדה",time:0},{label:"18:05 · כניסת הצוות",time:5}],Br=[[0,1],[1,3],[3,4],[4,5],[1,2],[2,5],[0,3],[3,5]],th=[0,1,2,3,4,8];function ih(n){let e=0,t=0;const i=[{x:e,z:t}];for(const s of n){const r=[[1,0],[0,1],[-1,0],[0,-1]][s];if(!r)return{ok:!1,trail:i};if(e+=r[0],t+=r[1],i.push({x:e,z:t}),e<0||e>4||t<0||t>4||[[1,1],[2,1],[2,2],[3,3]].some(o=>o[0]===e&&o[1]===t))return{ok:!1,trail:i}}return{ok:e===4&&t===4,trail:i}}function vo(n){const e=[[2,2],[2,1],[1,2]],t=[];for(let i=0;i<3;i++){const s=n==null?void 0:n[i];if(!s)continue;let[r,o]=e[i];s.rotate&&([r,o]=[o,r]);for(let a=0;a<o;a++)for(let c=0;c<r;c++){const l=s.x+c,h=s.y+a;if(l<0||l>3||h<0||h>2)return null;const u=h*4+l;if(t.some(f=>f.id===u))return null;t.push({id:u,piece:i})}}return t}function nh(n){const e=[[0,3,8,12],[3,0,4,10],[8,4,0,5],[12,10,5,0]];let t=0,i=0;for(const s of n)t+=e[i][s+1],i=s+1;return t}const vn=(n,e)=>Array.isArray(n)&&n.length===e.length&&[...n].sort((t,i)=>t-i).every((t,i)=>t===[...e].sort((s,r)=>s-r)[i]),Xi=(n,e)=>n.includes(e)?n.filter(t=>t!==e):[...n,e];function Jm(n,e,t={x:0,z:0},i={}){const s=n.scenario,r=gr(n),o=xr(n);if(!s||!r)return{ok:!1,message:"אין משימת שטח פעילה."};if(s.completed.includes(o))return{ok:!0,complete:!0,message:"השלב כבר הושלם."};const a=Ua(n),c=Ql(n);if(Math.hypot(t.x-c.x,t.z-c.z)>2.2)return{ok:!1,message:"התקרבו למקום המשימה בשטח."};const l=r.kind,h=e.value;let u=!1,f="הפעולה עוד לא משלימה את המשימה. בדקו את הנתונים ונסו שוב.",p=!0;if(e.type==="reset")return s.data={task:l},{ok:!0,message:"משימת השטח אופסה. אפשר לנסות דרך אחרת."};if(e.type==="clear"&&["a","b","c","number","vehicle","answer","selected","rotate"].includes(e.key)&&delete a[e.key],e.type==="set"&&typeof e.key=="string"&&["a","b","c","number","vehicle","answer","selected","rotate"].includes(e.key)&&Number.isFinite(h)&&Math.abs(h)<1e3&&(a[e.key]=h),l==="evidence-scene"&&(a.inspected??(a.inspected=[]),a.evidence??(a.evidence=[]),e.type==="inspect"&&Number.isInteger(h)&&h>=0&&h<6&&(a.inspected=Xi(a.inspected,h),f=eh[h]),e.type==="collect"&&a.inspected.includes(h)&&(a.evidence=Xi(a.evidence,h),f="הממצא עודכן בתיק הראיות."),e.type==="submit"&&(u=vn(a.evidence,[0,2,4]))),l==="evidence-board"&&(a.links??(a.links=[-1,-1,-1]),e.type==="link"&&[0,1,2].includes(e.row)&&[0,1,2].includes(h)&&(a.links[e.row]=h),e.type==="submit"&&(u=a.links.every((v,b)=>v===[2,0,1][b]))),l==="evidence-timeline"){if(a.order??(a.order=[0,1,2,3]),e.type==="move"&&Number.isInteger(e.row)&&[0,1,2,3].includes(e.row)&&[-1,1].includes(h)){const v=e.row+h;v>=0&&v<4&&([a.order[e.row],a.order[v]]=[a.order[v],a.order[e.row]])}e.type==="submit"&&(u=a.order.every((v,b)=>v===[2,3,0,1][b]))}if(l==="witness-interview"){if(a.notes??(a.notes=[]),e.type==="ask"&&[0,1].includes(e.row)&&[0,1,2].includes(h)){const v=e.row*3+h;a.notes.includes(v)||a.notes.push(v),f=[["נועה: הייתי בספרייה.","נועה: ראיתי את השעון מציג 18:10.","נועה: איתי עבר ליד החממה."],["איתי: שמעתי מים ליד מקום ישיבה.","איתי: הסתכלתי בשעון ב־18:20.","איתי: העד היה לבד."]][e.row][h]}e.type==="submit"&&(u=[0,1,3].every(v=>a.notes.includes(v)))}if(l==="witness-timetable"&&(a.claims??(a.claims=[]),e.type==="claim"&&[0,1,2,3].includes(h)&&(a.claims=Xi(a.claims,h)),e.type==="submit"&&(u=vn(a.claims,[1,3]))),l==="witness-search"){if(e.type==="search"&&[0,1,2].includes(h))return s.checkpoint=h,{ok:!0,walk:!0,message:"אתר החיפוש סומן. לכו אליו ובדקו בשטח."};e.type==="find"&&(u=s.checkpoint===2,f=u?"העד נמצא ליד המים והספסל.":"אין כאן עד. חפשו מקום שיש בו גם מים וגם ישיבה.")}if(l==="robot-route"&&(a.commands??(a.commands=[]),e.type==="command"&&[0,1,2,3].includes(h)&&a.commands.length<16&&a.commands.push(h),e.type==="execute"&&(a.executed=!0,u=ih(a.commands).ok,f="הרובוט לא הגיע ליעד. בדקו את הרשת והמחסומים.")),l==="robot-circuit"&&(a.wires??(a.wires=[]),e.type==="wire"&&[0,1,2,3].includes(e.row)&&[0,1,2,3].includes(h)&&(h===[2,0,3,1][e.row]?(a.wires=Xi(a.wires,e.row),f="החיבור תקין."):(p=!1,f="הצורה והצבע אינם תואמים. החיבור לא נשמר.")),e.type==="submit"&&(u=vn(a.wires,[0,1,2,3]))),l==="robot-escort"&&e.type==="checkpoint"){const v=i.companion;if(!v||Math.hypot(v.x-c.x,v.z-c.z)>3)return{ok:!1,message:"חכו לרובוט. גם הוא צריך להגיע לתחנה."};if(s.checkpoint<2)return s.checkpoint++,{ok:!0,walk:!0,message:"הרובוט הגיע. ממשיכים יחד לתחנה הבאה."};u=!0}if(l==="survey-ruler"&&e.type==="submit"&&(u=a.a===2&&a.b===9&&a.number===7),l==="survey-parcel"&&(a.cells??(a.cells=[]),e.type==="cell"&&Number.isInteger(h)&&h>=0&&h<12&&(a.cells=Xi(a.cells,h)),e.type==="submit"&&(u=vn(a.cells,th)&&a.number===6)),l==="survey-scale"&&e.type==="submit"&&(u=a.a===40&&a.b===30),l==="freight-manifest"&&e.type==="submit"&&(u=a.a===2.5&&a.b===80&&a.vehicle===1),l==="freight-balance"&&(a.bins??(a.bins=[-1,-1,-1]),e.type==="bin"&&[0,1,2].includes(e.row)&&[0,1].includes(h)&&(a.bins[e.row]=h),e.type==="submit")){const v=[2,3,5],b=a.bins.reduce((d,w,S)=>d+(w===0?v[S]:0),0),m=a.bins.reduce((d,w,S)=>d+(w===1?v[S]:0),0);u=a.bins.every(d=>d>=0)&&b===m}if(l==="freight-packing"){if(a.placements??(a.placements=[null,null,null]),e.type==="place"&&[0,1,2].includes(a.selected)&&Number.isInteger(h)&&h>=0&&h<12){const v=[...a.placements];v[a.selected]={x:h%4,y:Math.floor(h/4),rotate:a.rotate===1},vo(v)?(a.placements=v,f="החלק הוצב בארגז."):(p=!1,f="החלק חורג מהארגז או חופף לחלק אחר.")}e.type==="submit"&&(u=a.placements.every(Boolean)&&vo(a.placements)!==null)}if(l==="optics-focus"&&e.type==="submit"&&(u=a.a===7&&a.b===3),l==="optics-parallax"&&e.type==="submit"&&(u=a.a===0&&a.b===0),l==="optics-samples"&&(a.samples??(a.samples=[]),e.type==="sample"&&a.samples.length<5&&a.samples.push([4.1,4.2,9.8,4.2,4.3][a.samples.length]),e.type==="submit"&&(u=a.samples.length===5&&a.selected===2&&Math.abs(a.number-4.2)<.001)),l==="shadow-light"&&e.type==="submit"&&(u=a.a===1&&a.b===3),l==="shadow-height"&&e.type==="submit"&&(u=a.a===2&&a.number===6),l==="shadow-sundial"&&(a.observations??(a.observations=[]),e.type==="observe"&&[10,14].includes(a.a)&&!a.observations.includes(a.a)&&a.observations.push(a.a),e.type==="submit"&&(u=vn(a.observations,[10,14])&&a.answer===14)),l==="rescue-trust"&&e.type==="befriend"&&(u=(a.trust||0)>=3,f="התכופפו ליד השועל והמתינו עד שמד האמון יתמלא."),l==="rescue-shelter"&&(a.layout??(a.layout=[-1,-1,-1]),e.type==="shelter"&&[0,1,2].includes(a.selected)&&Number.isInteger(h)&&h>=0&&h<9&&(a.layout[a.selected]=h),e.type==="submit"&&(u=a.layout[0]%3===0&&a.layout[1]<3&&a.layout[1]>=0&&a.layout[2]===4&&new Set(a.layout).size===3&&!a.layout.includes(7))),l==="rescue-care"&&(a.calm??(a.calm=0),a.water??(a.water=0),a.rest??(a.rest=0),e.type==="care"&&(h===0&&(a.calm=Math.min(3,a.calm+1),f="השועל נרגע קצת."),h===1&&(a.calm<3?(p=!1,f="השועל עדיין חושש. קודם יוצרים שקט."):(a.water=Math.min(2,a.water+1),f="השועל שותה.")),h===2&&(a.water<2?(p=!1,f="השועל עדיין צריך מים לפני מנוחה."):(a.rest=1,f="השועל נח במחסה."))),e.type==="submit"&&(u=a.calm===3&&a.water===2&&a.rest===1)),l==="relay-wave"&&e.type==="submit"&&(u=a.a===3&&a.b===2),l==="relay-morse"&&(a.letters??(a.letters=[]),a.current??(a.current=""),e.type==="symbol"&&[".","-"].includes(h)&&a.current.length<3&&(a.current+=h),e.type==="letter"&&(["...","---"].includes(a.current)&&a.letters.length<3?(a.letters.push(a.current),a.current="",f="האות שודרה."):(p=!1,f="אות מכילה שלוש נקודות או שלושה קווים. אפסו אם צריך.")),e.type==="submit"&&(u=JSON.stringify(a.letters)===JSON.stringify(["...","---","..."])&&a.current==="")),l==="relay-network"&&(a.edges??(a.edges=[]),e.type==="edge"&&Number.isInteger(h)&&h>=0&&h<Br.length&&(a.edges=Xi(a.edges,h)),e.type==="submit")){const v=new Set([0]);for(let b=0;b<6;b++)for(const m of a.edges){const[d,w]=Br[m];v.has(d)&&v.add(w),v.has(w)&&v.add(d)}u=[0,1,3,4,5].every(b=>v.has(b))&&!a.edges.some(b=>Br[b].includes(2))}if(l==="courier-plan"&&(a.route??(a.route=[]),e.type==="stop"&&[0,1,2].includes(h)&&!a.route.includes(h)&&a.route.push(h),e.type==="submit"&&(u=a.route.length===3&&a.route.indexOf(0)<a.route.indexOf(1)&&a.route.at(-1)===2&&nh(a.route)<=14)),l==="courier-course"&&e.type==="checkpoint"){if(!(s.checkpoint===1?i.dashing:s.checkpoint===3?t.y===0:t.y>.25))return{ok:!1,message:s.checkpoint===1?"הטבעת דורשת זינוק ב־Q.":s.checkpoint===3?"נחתו ועמדו בסימון האחרון.":"קפצו בתוך הטבעת."};if(s.checkpoint<3)return s.checkpoint++,{ok:!0,walk:!0,message:"החיישן הופעל. התנועה הבאה מסומנת."};u=!0}if(l==="courier-lockers"&&(a.delivered??(a.delivered=[]),e.type==="deliver"&&[0,1,2].includes(h))){if(h!==[1,2,0][s.checkpoint]||a.delivered.includes(h))return{ok:!1,message:"קוד החבילה לא מתאים לארונית. החבילה נשארה בתיק."};if(a.delivered.push(h),s.checkpoint<2)return s.checkpoint++,{ok:!0,walk:!0,message:"החבילה נמסרה. הארונית הבאה מסומנת."};u=!0}return u?(s.completed.push(o),s.carrying=!1,{ok:!0,complete:!0,message:"✓ משימת השטח הושלמה. ממשיכים לתיק הלימוד."}):{ok:e.type==="submit"||e.type==="execute"||e.type==="befriend"?!1:p,message:f}}function Zm(n,e,t,i){var o;const s=gr(n);if(!s||n.scenario.completed.includes(xr(n)))return;const r=Ua(n);if(s.kind==="rescue-trust"){const a=((o=t.companion)==null?void 0:o.type)==="fox"?t.companion:s,c=Math.hypot(e.x-a.x,e.z-a.z)<2.2;r.trust=Math.max(0,Math.min(3,(r.trust||0)+(c&&t.crouching&&!t.dashing?i:-i*.5)))}}function sh(n=globalThis.crypto){if(typeof n.randomUUID=="function")return n.randomUUID();const e=n.getRandomValues(new Uint8Array(16));e[6]=e[6]&15|64,e[8]=e[8]&63|128;const t=[...e].map(i=>i.toString(16).padStart(2,"0")).join("");return`${t.slice(0,8)}-${t.slice(8,12)}-${t.slice(12,16)}-${t.slice(16,20)}-${t.slice(20)}`}const rh=[{id:"bench",name:"הספסל ליד האגם",x:-6,z:10,range:3,kind:"rest",description:"פסק זמן קטן. הספסל לא ישאל מה הספקתם היום.",action:"לשבת לרגע"},{id:"door",name:"דלת המבואה",x:-2,z:-15.5,range:2.8,kind:"toggle",description:"הדלת הידנית של המבואה עדיין עובדת. בפנים: מקום שקט ולוח הפרויקט.",action:"לפתוח את הדלת"},{id:"lamp",name:"פנס הרחבה",x:-2,z:10,range:2.4,kind:"toggle",description:"מפסק מקומי. לפחות דבר אחד כאן לא דורש סיסמה.",action:"לכבות את הפנס"},{id:"basketball",name:"עמדת הקליעה",x:12,z:22,range:2.8,kind:"play",description:"הכדור נמצא על הקו. זריקה רגועה, בלי שעון ובלי טבלת דירוג.",action:"לזרוק לסל"},{id:"locker",name:"ארונית צוות איינשטיין",x:-10,z:-13,range:2.5,kind:"inspect",description:"על הדלת: ״ציוד משותף. רעיונות פחות״. בפנים נשאר פתק מסבב העבודה האחרון.",action:"לפתוח את הארונית"},{id:"noticeboard",name:"לוח ההאקתון",x:-4,z:5,range:2.4,kind:"clue",description:"רשימת סוף יום: כרטיס הגישה עבר מערבה מהספרייה; הגיבוי הונח ממזרח למעבדה; האנטנה נשארה בדרום־מערב. אף אחד לא סימן ״החזרתי״.",action:"לתעד את הרמז ביומן"},{id:"telescope",name:"עמדת תצפית לאגם",x:-8,z:16.7,range:2.5,kind:"observe",description:"עדשה מכוונת לאגם. אפשר להתקרב למראה בלי לרדוף אחרי בעלי החיים.",action:"להביט דרך העדשה"},{id:"water",name:"קערת המים",x:-8.5,z:8,range:2.5,kind:"care",description:"קערה נקייה בפינת הטבע. ממלאים מים ונותנים לבעלי החיים לבחור אם להתקרב.",action:"למלא מים"},{id:"planter",name:"ערוגת המעבדה",x:23,z:-6,range:2.5,kind:"care",description:"פרויקט השקיה שעובד גם בלי Wi-Fi. העלים קצת שמוטים; המשפך עדיין כאן.",action:"להשקות את הערוגה"},{id:"recycling",name:"פינת המחזור",x:5,z:10,range:2.5,kind:"help",description:"שלוש פחיות נשארו אחרי ההאקתון. ״מישהו יאסוף״ עדיין לא הגיע.",action:"לאסוף את הפחיות למחזור"},{id:"solar",name:"לוח תאורת השביל",x:19,z:8,range:2.6,kind:"puzzle",description:"שלושה מתגים, שלושה סימונים. הדליקו רק ירח ועץ כדי להאיר את פינת הטבע. אין קנס ואין לחץ זמן.",action:"לכוון את המתגים"},{id:"bike",name:"עמדת האופניים",x:-21,z:-8.5,range:2.5,kind:"play",description:"הפעמון תקוע בזווית. מיישרים, בודקים צלצול ומקווים שהשומר לא יחשוב שכבר בוקר.",action:"לבדוק את הפעמון"}];function Tc(n={}){const e=n&&typeof n=="object"&&!Array.isArray(n)?n:{},t=s=>Number.isSafeInteger(e[s])?Math.max(0,Math.min(9999,e[s])):0,i=s=>Array.isArray(s)?[...new Set(s.filter(r=>rh.some(o=>o.id===r)))]:[];return{checkedEquipment:Array.isArray(e.checkedEquipment)?[...new Set(e.checkedEquipment.filter(s=>["card","fuse","antenna"].includes(s)))]:[],visited:i(e.visited),doorOpen:e.doorOpen===!0,lampOn:e.lampOn!==!1,lockerOpen:e.lockerOpen===!0,waterFilled:e.waterFilled===!0,watered:e.watered===!0,recycled:e.recycled===!0,switches:[0,1,2].map(s=>Array.isArray(e.switches)&&e.switches[s]===!0),shots:t("shots"),observations:t("observations"),bells:t("bells"),helped:Array.isArray(e.helped)?[...new Set(e.helped.filter(s=>["owl","pigeon","raccoon"].includes(s)))]:[],animalNotes:Array.isArray(e.animalNotes)?[...new Set(e.animalNotes.filter(s=>Number.isInteger(s)&&s>=0&&s<19))]:[],following:Number.isInteger(e.following)&&e.following>=0&&e.following<16?e.following:null,seated:e.seated===!0}}const ah=n=>n.switches[0]&&!n.switches[1]&&n.switches[2];function Qm(n,e){return{bench:e.seated?"יושבים":"פנוי",door:e.doorOpen?"פתוחה":"סגורה",lamp:e.lampOn?"דולק":"כבוי",basketball:`${e.shots} קליעות`,locker:e.lockerOpen?"פתוחה":"סגורה",noticeboard:e.visited.includes("noticeboard")?"הרמז תועד":"רמז חדש",telescope:`${e.observations} תצפיות`,water:e.waterFilled?"הקערה מלאה":"הקערה ריקה",planter:e.watered?"הערוגה הושקתה":"זקוקה למים",recycling:e.recycled?"הרחבה נקייה":"3 פחיות בשטח",solar:ah(e)?"השביל מואר":"התאורה כבויה",bike:`${e.bells} צלצולים`}[n.id]}function e0(n,e){return{bench:e.seated?"לקום ולהמשיך":n.action,door:e.doorOpen?"לסגור את הדלת":n.action,lamp:e.lampOn?n.action:"להדליק את הפנס",locker:e.lockerOpen?"לסגור את הארונית":n.action,water:e.waterFilled?"לצפות ליד קערת המים":n.action,planter:e.watered?"לבדוק את העלים":n.action,recycling:e.recycled?"לבדוק את הפינה הנקייה":n.action,noticeboard:e.visited.includes("noticeboard")?"לקרוא שוב את הרמז":n.action}[n.id]||n.action}const In=[{id:"owl",name:"נועה",role:"צוות התוכנה · הספרייה",system:"מסוף הגישה",color:"#91b6c5",x:-13,z:-9,line:"המסוף נתקע וכולם שולחים לי הוראות שונות. אני צריכה לבדוק מה באמת קרה, לא עוד עשר השערות. אפשר לעבור איתי על הדברים אחד־אחד?",choices:["נקשיב למה שכבר בדקה ונבחר יחד צעד אחד","ננסה לשנות הכול בבת אחת","נחליט שהיא לא מבינה ונתפוס פיקוד"],need:0,reply:"מעולה. סוף סוף מישהו שלא מציע לכבות ולהדליק את כל בית הספר.",wrong:"נועה מצביעה על רשימת הבדיקות. היא מבקשת שיתוף פעולה וסדר, לא עוד רעש."},{id:"pigeon",name:"איתי",role:"צוות הרובוטיקה · החממה",system:"מערכת הגיבוי",color:"#b5bd9d",x:13,z:-7,line:"אני מחזיק את בקר הגיבוי כבר רבע שעה, ואף אחד לא שאל אם אני צריך עזרה. לא, הכול בסדר. ברור. רק קצת נגמרות לי הידיים.",choices:["נשאל מה אפשר לקחת ממנו ונתחלק במשימה","נגיד לו להפסיק להתלונן","נתחיל להסביר לו איך לעבוד מהר יותר"],need:0,reply:"קחו את החלק של למצוא ציוד. אני אקח את החלק של לא להפיל את הפרויקט של כל הכיתה.",wrong:"הוא מסתכל על הציוד שבידיים שלו. הבעיה היא עומס, לא חוסר ידע."},{id:"raccoon",name:"אדם",role:"צוות התקשורת · מגדל הקשר",system:"ערוץ הקשר",color:"#c6aa83",x:10,z:14,line:"שמעתם את הרעש מהיער? אני יודע שזאת כנראה חיה. עדיין, מעדיף לא לעבור שם לבד. לא צריך להכריז על זה בקבוצת הכיתה.",choices:["נציע להתקדם יחד ולשמור את זה בינינו","נצלם אותו כדי להצחיק את הקבוצה","נגיד שאין שום סיבה להרגיש ככה"],need:0,reply:"תודה. מסתבר שעבודת צוות היא גם לצאת מהמצגת וללכת ביחד.",wrong:"אדם ביקש חברה ודיסקרטיות. אפשר לעזור בלי לבטל את מה שהוא מרגיש."}],yo=[{id:"card",name:"כרטיס צוות איינשטיין",short:"כרטיס גישה",x:-21,z:-3,npc:0,hint:"על שולחן העבודה שממערב לספרייה, ליד השביל לאגם.",clue:"על הכרטיס כתוב: צוות איינשטיין — כיתת הייטק. בגב הכרטיס רשומה הערה: נוהל היציאה דורש אימות של שלושת מסופי הפרויקט.",report:"כרטיס הגישה נמצא. המסוף בספרייה יכול להתחבר עכשיו למערכת התרגול."},{id:"fuse",name:"יחידת גיבוי לפרויקט",short:"יחידת גיבוי",x:21,z:3,npc:1,hint:"בארגז הציוד שממזרח לחממה. חפשו את הסימון הצהוב.",clue:"זו יחידת גיבוי לימודית של הרובוטיקה. על המדבקה: מי שלוקח — מחזיר. מתחת, מישהו הוסיף: כן, גם אם זה עובד.",report:"יחידת הגיבוי נמצאה. איתי יוכל להפעיל את התחנה אחרי בדיקת התרגול."},{id:"antenna",name:"אנטנת תחנת הקשר",short:"אנטנה",x:-8,z:22,npc:2,hint:"ליד עמדת הקשר הישנה, בדרום־מערב המתחם.",clue:"מחברת פתוחה ליד האנטנה: צוות התקשורת, ז׳ איינשטיין. כששלוש התחנות פעילות, השער חוזר למצב יציאה. ברקע נשמע רעש — הפעם באמת ברווז.",report:"האנטנה נמצאה. חוזרים לאדם במגדל ומשלימים את בדיקת הקשר."}],t0={x:0,z:-25},bo=(n,e=Math.random)=>{const t=[...n];for(let i=t.length-1;i>0;i--){const s=Math.floor(e()*(i+1));[t[i],t[s]]=[t[s],t[i]]}return t};function oh(n){return!!n&&typeof n.id=="string"&&typeof n.title=="string"&&Array.isArray(n.references)&&Array.isArray(n.questions)&&n.questions.length>0&&n.questions.length<=30&&new Set(n.questions.map(e=>e.id)).size===n.questions.length&&n.questions.every(e=>{var t;return typeof e.id=="string"&&typeof e.prompt=="string"&&e.type==="mcq"&&Array.isArray(e.choices)&&e.choices.length>=2&&e.choices.every(i=>typeof i=="string")&&Number.isInteger(e.correct)&&e.correct>=0&&e.correct<e.choices.length&&typeof((t=e.explanation)==null?void 0:t.he)=="string"&&n.references.some(i=>{var s,r;return i.id===((s=e.ref)==null?void 0:s.id)&&(!e.ref.part||((r=i.parts)==null?void 0:r.some(o=>o.part===e.ref.part)))})})}function i0(n,e=Math.random){if(!oh(n))throw new Error("Invalid quiz");const t=bo(n.questions,e).map(i=>({...i,options:bo(i.choices.map((s,r)=>({text:s,original:r})),e)}));return{quizId:n.id,questions:t,assignments:In.map((i,s)=>t.filter((r,o)=>o%3===s).map(r=>r.id)),environment:Tc(),stones:[],skyGates:[],answers:{},understood:[],seals:[],items:[],collected:[],elapsed:0,player:{x:0,z:9},startedAt:Date.now(),attemptId:sh()}}function n0(n,e,t){if(Object.hasOwn(n.answers,e))return null;const i=n.questions.find(r=>r.id===e);if(!i||!Number.isInteger(t)||t<0||t>=i.choices.length)return null;const s={choice:t,correct:t===i.correct};return n.answers[e]=s,s}function Mo(n,e){const t=n.assignments[e];return{answered:t.filter(i=>Object.hasOwn(n.answers,i)).length,total:t.length,next:t.find(i=>!Object.hasOwn(n.answers,i))}}function s0(n){const e={easy:1,medium:1.5,hard:2},t=n.questions.reduce((i,s)=>i+(e[s.difficulty]||1.5),0);return Math.round(n.questions.reduce((i,s)=>{var r;return i+((r=n.answers[s.id])!=null&&r.correct?e[s.difficulty]||1.5:0)},0)/t*100)}const r0=n=>n>=90?3:n>=75?2:n>=50?1:0;function a0(n){return n.seals.length===3&&Object.keys(n.answers).length===n.questions.length}function o0(n,e){try{const t=JSON.parse(n);if(!t||t.quizId!==e.id||typeof t.attemptId!="string"||!Number.isFinite(t.startedAt)||!Number.isFinite(t.elapsed)||t.elapsed<0||!Array.isArray(t.questions)||t.questions.length!==e.questions.length||!t.player||!Number.isFinite(t.player.x)||!Number.isFinite(t.player.z)||Math.abs(t.player.x)>ga||Math.abs(t.player.z)>ga||t.participantName!==void 0&&(typeof t.participantName!="string"||!t.participantName.trim()||t.participantName.length>60))return null;const i=new Set;for(const s of t.questions){const r=e.questions.find(o=>o.id===s.id);if(!r||i.has(s.id)||JSON.stringify({...s,options:void 0})!==JSON.stringify(r)||(i.add(s.id),!Array.isArray(s.options)||s.options.length!==r.choices.length||new Set(s.options.map(o=>o.original)).size!==s.options.length||s.options.some(o=>r.choices[o.original]!==o.text)))return null}if(!t.answers||typeof t.answers!="object")return null;for(const[s,r]of Object.entries(t.answers)){const o=e.questions.find(a=>a.id===s);if(!o||!Number.isInteger(r.choice)||r.choice<0||r.choice>=o.choices.length||r.correct!==(r.choice===o.correct))return null}if(t.assignments=In.map((s,r)=>t.questions.filter((o,a)=>a%3===r).map(o=>o.id)),!Array.isArray(t.understood)||t.understood.some(s=>!In.some(r=>r.id===s))||(t.items=Array.isArray(t.items)?[...new Set(t.items.filter(s=>yo.some(r=>r.id===s)))]:[],t.relay&&!$l(t.relay)))return null;if(t.seals=In.filter((s,r)=>(t.relay?wc(t.relay,r):t.understood.includes(s.id)&&t.items.includes(yo[r].id))&&Mo(t,r).answered===Mo(t,r).total).map(s=>s.id),t.collected=Array.isArray(t.collected)?[...new Set(t.collected.filter(s=>Number.isInteger(s)&&s>=0&&s<12))]:[],t.scenario!==void 0){if(t.scenario=Zl(t.scenario),!t.scenario)return null;t.seals=t.seals.filter(s=>t.scenario.completed.includes(In.findIndex(r=>r.id===s)))}return t.stones=ql(t.stones),t.skyGates=Xl.map((s,r)=>r).filter(s=>Array.isArray(t.skyGates)&&t.skyGates.includes(s)),t.environment=Tc(t.environment),t}catch{return null}}var ch=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function lh(n){if(Object.prototype.hasOwnProperty.call(n,"__esModule"))return n;var e=n.default;if(typeof e=="function"){var t=function i(){return this instanceof i?Reflect.construct(e,arguments,this.constructor):e.apply(this,arguments)};t.prototype=e.prototype}else t={};return Object.defineProperty(t,"__esModule",{value:!0}),Object.keys(n).forEach(function(i){var s=Object.getOwnPropertyDescriptor(n,i);Object.defineProperty(t,i,s.get?s:{enumerable:!0,get:function(){return n[i]}})}),t}var zr={exports:{}};const hh={},uh=Object.freeze(Object.defineProperty({__proto__:null,default:hh},Symbol.toStringTag,{value:"Module"})),So=lh(uh);/**
 * [js-sha256]{@link https://github.com/emn178/js-sha256}
 *
 * @version 0.11.1
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2014-2025
 * @license MIT
 */var wo;function dh(){return wo||(wo=1,(function(n){(function(){var e="input is invalid type",t=typeof window=="object",i=t?window:{};i.JS_SHA256_NO_WINDOW&&(t=!1);var s=!t&&typeof self=="object",r=!i.JS_SHA256_NO_NODE_JS&&typeof process=="object"&&process.versions&&process.versions.node&&process.type!="renderer";r?i=ch:s&&(i=self);var o=!i.JS_SHA256_NO_COMMON_JS&&!0&&n.exports,a=!i.JS_SHA256_NO_ARRAY_BUFFER&&typeof ArrayBuffer<"u",c="0123456789abcdef".split(""),l=[-2147483648,8388608,32768,128],h=[24,16,8,0],u=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298],f=["hex","array","digest","arrayBuffer"],p=[];(i.JS_SHA256_NO_NODE_JS||!Array.isArray)&&(Array.isArray=function(g){return Object.prototype.toString.call(g)==="[object Array]"}),a&&(i.JS_SHA256_NO_ARRAY_BUFFER_IS_VIEW||!ArrayBuffer.isView)&&(ArrayBuffer.isView=function(g){return typeof g=="object"&&g.buffer&&g.buffer.constructor===ArrayBuffer});var v=function(g,T){return function(C){return new S(T,!0).update(C)[g]()}},b=function(g){var T=v("hex",g);r&&(T=m(T,g)),T.create=function(){return new S(g)},T.update=function(_){return T.create().update(_)};for(var C=0;C<f.length;++C){var x=f[C];T[x]=v(x,g)}return T},m=function(g,T){var C=So,x=So.Buffer,_=T?"sha224":"sha256",A;x.from&&!i.JS_SHA256_NO_BUFFER_FROM?A=x.from:A=function(I){return new x(I)};var D=function(I){if(typeof I=="string")return C.createHash(_).update(I,"utf8").digest("hex");if(I==null)throw new Error(e);return I.constructor===ArrayBuffer&&(I=new Uint8Array(I)),Array.isArray(I)||ArrayBuffer.isView(I)||I.constructor===x?C.createHash(_).update(A(I)).digest("hex"):g(I)};return D},d=function(g,T){return function(C,x){return new E(C,T,!0).update(x)[g]()}},w=function(g){var T=d("hex",g);T.create=function(_){return new E(_,g)},T.update=function(_,A){return T.create(_).update(A)};for(var C=0;C<f.length;++C){var x=f[C];T[x]=d(x,g)}return T};function S(g,T){T?(p[0]=p[16]=p[1]=p[2]=p[3]=p[4]=p[5]=p[6]=p[7]=p[8]=p[9]=p[10]=p[11]=p[12]=p[13]=p[14]=p[15]=0,this.blocks=p):this.blocks=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],g?(this.h0=3238371032,this.h1=914150663,this.h2=812702999,this.h3=4144912697,this.h4=4290775857,this.h5=1750603025,this.h6=1694076839,this.h7=3204075428):(this.h0=1779033703,this.h1=3144134277,this.h2=1013904242,this.h3=2773480762,this.h4=1359893119,this.h5=2600822924,this.h6=528734635,this.h7=1541459225),this.block=this.start=this.bytes=this.hBytes=0,this.finalized=this.hashed=!1,this.first=!0,this.is224=g}S.prototype.update=function(g){if(!this.finalized){var T,C=typeof g;if(C!=="string"){if(C==="object"){if(g===null)throw new Error(e);if(a&&g.constructor===ArrayBuffer)g=new Uint8Array(g);else if(!Array.isArray(g)&&(!a||!ArrayBuffer.isView(g)))throw new Error(e)}else throw new Error(e);T=!0}for(var x,_=0,A,D=g.length,I=this.blocks;_<D;){if(this.hashed&&(this.hashed=!1,I[0]=this.block,this.block=I[16]=I[1]=I[2]=I[3]=I[4]=I[5]=I[6]=I[7]=I[8]=I[9]=I[10]=I[11]=I[12]=I[13]=I[14]=I[15]=0),T)for(A=this.start;_<D&&A<64;++_)I[A>>>2]|=g[_]<<h[A++&3];else for(A=this.start;_<D&&A<64;++_)x=g.charCodeAt(_),x<128?I[A>>>2]|=x<<h[A++&3]:x<2048?(I[A>>>2]|=(192|x>>>6)<<h[A++&3],I[A>>>2]|=(128|x&63)<<h[A++&3]):x<55296||x>=57344?(I[A>>>2]|=(224|x>>>12)<<h[A++&3],I[A>>>2]|=(128|x>>>6&63)<<h[A++&3],I[A>>>2]|=(128|x&63)<<h[A++&3]):(x=65536+((x&1023)<<10|g.charCodeAt(++_)&1023),I[A>>>2]|=(240|x>>>18)<<h[A++&3],I[A>>>2]|=(128|x>>>12&63)<<h[A++&3],I[A>>>2]|=(128|x>>>6&63)<<h[A++&3],I[A>>>2]|=(128|x&63)<<h[A++&3]);this.lastByteIndex=A,this.bytes+=A-this.start,A>=64?(this.block=I[16],this.start=A-64,this.hash(),this.hashed=!0):this.start=A}return this.bytes>4294967295&&(this.hBytes+=this.bytes/4294967296<<0,this.bytes=this.bytes%4294967296),this}},S.prototype.finalize=function(){if(!this.finalized){this.finalized=!0;var g=this.blocks,T=this.lastByteIndex;g[16]=this.block,g[T>>>2]|=l[T&3],this.block=g[16],T>=56&&(this.hashed||this.hash(),g[0]=this.block,g[16]=g[1]=g[2]=g[3]=g[4]=g[5]=g[6]=g[7]=g[8]=g[9]=g[10]=g[11]=g[12]=g[13]=g[14]=g[15]=0),g[14]=this.hBytes<<3|this.bytes>>>29,g[15]=this.bytes<<3,this.hash()}},S.prototype.hash=function(){var g=this.h0,T=this.h1,C=this.h2,x=this.h3,_=this.h4,A=this.h5,D=this.h6,I=this.h7,B=this.blocks,G,H,Q,W,Y,te,me,Oe,qe,je,Ye;for(G=16;G<64;++G)Y=B[G-15],H=(Y>>>7|Y<<25)^(Y>>>18|Y<<14)^Y>>>3,Y=B[G-2],Q=(Y>>>17|Y<<15)^(Y>>>19|Y<<13)^Y>>>10,B[G]=B[G-16]+H+B[G-7]+Q<<0;for(Ye=T&C,G=0;G<64;G+=4)this.first?(this.is224?(Oe=300032,Y=B[0]-1413257819,I=Y-150054599<<0,x=Y+24177077<<0):(Oe=704751109,Y=B[0]-210244248,I=Y-1521486534<<0,x=Y+143694565<<0),this.first=!1):(H=(g>>>2|g<<30)^(g>>>13|g<<19)^(g>>>22|g<<10),Q=(_>>>6|_<<26)^(_>>>11|_<<21)^(_>>>25|_<<7),Oe=g&T,W=Oe^g&C^Ye,me=_&A^~_&D,Y=I+Q+me+u[G]+B[G],te=H+W,I=x+Y<<0,x=Y+te<<0),H=(x>>>2|x<<30)^(x>>>13|x<<19)^(x>>>22|x<<10),Q=(I>>>6|I<<26)^(I>>>11|I<<21)^(I>>>25|I<<7),qe=x&g,W=qe^x&T^Oe,me=I&_^~I&A,Y=D+Q+me+u[G+1]+B[G+1],te=H+W,D=C+Y<<0,C=Y+te<<0,H=(C>>>2|C<<30)^(C>>>13|C<<19)^(C>>>22|C<<10),Q=(D>>>6|D<<26)^(D>>>11|D<<21)^(D>>>25|D<<7),je=C&x,W=je^C&g^qe,me=D&I^~D&_,Y=A+Q+me+u[G+2]+B[G+2],te=H+W,A=T+Y<<0,T=Y+te<<0,H=(T>>>2|T<<30)^(T>>>13|T<<19)^(T>>>22|T<<10),Q=(A>>>6|A<<26)^(A>>>11|A<<21)^(A>>>25|A<<7),Ye=T&C,W=Ye^T&x^je,me=A&D^~A&I,Y=_+Q+me+u[G+3]+B[G+3],te=H+W,_=g+Y<<0,g=Y+te<<0,this.chromeBugWorkAround=!0;this.h0=this.h0+g<<0,this.h1=this.h1+T<<0,this.h2=this.h2+C<<0,this.h3=this.h3+x<<0,this.h4=this.h4+_<<0,this.h5=this.h5+A<<0,this.h6=this.h6+D<<0,this.h7=this.h7+I<<0},S.prototype.hex=function(){this.finalize();var g=this.h0,T=this.h1,C=this.h2,x=this.h3,_=this.h4,A=this.h5,D=this.h6,I=this.h7,B=c[g>>>28&15]+c[g>>>24&15]+c[g>>>20&15]+c[g>>>16&15]+c[g>>>12&15]+c[g>>>8&15]+c[g>>>4&15]+c[g&15]+c[T>>>28&15]+c[T>>>24&15]+c[T>>>20&15]+c[T>>>16&15]+c[T>>>12&15]+c[T>>>8&15]+c[T>>>4&15]+c[T&15]+c[C>>>28&15]+c[C>>>24&15]+c[C>>>20&15]+c[C>>>16&15]+c[C>>>12&15]+c[C>>>8&15]+c[C>>>4&15]+c[C&15]+c[x>>>28&15]+c[x>>>24&15]+c[x>>>20&15]+c[x>>>16&15]+c[x>>>12&15]+c[x>>>8&15]+c[x>>>4&15]+c[x&15]+c[_>>>28&15]+c[_>>>24&15]+c[_>>>20&15]+c[_>>>16&15]+c[_>>>12&15]+c[_>>>8&15]+c[_>>>4&15]+c[_&15]+c[A>>>28&15]+c[A>>>24&15]+c[A>>>20&15]+c[A>>>16&15]+c[A>>>12&15]+c[A>>>8&15]+c[A>>>4&15]+c[A&15]+c[D>>>28&15]+c[D>>>24&15]+c[D>>>20&15]+c[D>>>16&15]+c[D>>>12&15]+c[D>>>8&15]+c[D>>>4&15]+c[D&15];return this.is224||(B+=c[I>>>28&15]+c[I>>>24&15]+c[I>>>20&15]+c[I>>>16&15]+c[I>>>12&15]+c[I>>>8&15]+c[I>>>4&15]+c[I&15]),B},S.prototype.toString=S.prototype.hex,S.prototype.digest=function(){this.finalize();var g=this.h0,T=this.h1,C=this.h2,x=this.h3,_=this.h4,A=this.h5,D=this.h6,I=this.h7,B=[g>>>24&255,g>>>16&255,g>>>8&255,g&255,T>>>24&255,T>>>16&255,T>>>8&255,T&255,C>>>24&255,C>>>16&255,C>>>8&255,C&255,x>>>24&255,x>>>16&255,x>>>8&255,x&255,_>>>24&255,_>>>16&255,_>>>8&255,_&255,A>>>24&255,A>>>16&255,A>>>8&255,A&255,D>>>24&255,D>>>16&255,D>>>8&255,D&255];return this.is224||B.push(I>>>24&255,I>>>16&255,I>>>8&255,I&255),B},S.prototype.array=S.prototype.digest,S.prototype.arrayBuffer=function(){this.finalize();var g=new ArrayBuffer(this.is224?28:32),T=new DataView(g);return T.setUint32(0,this.h0),T.setUint32(4,this.h1),T.setUint32(8,this.h2),T.setUint32(12,this.h3),T.setUint32(16,this.h4),T.setUint32(20,this.h5),T.setUint32(24,this.h6),this.is224||T.setUint32(28,this.h7),g};function E(g,T,C){var x,_=typeof g;if(_==="string"){var A=[],D=g.length,I=0,B;for(x=0;x<D;++x)B=g.charCodeAt(x),B<128?A[I++]=B:B<2048?(A[I++]=192|B>>>6,A[I++]=128|B&63):B<55296||B>=57344?(A[I++]=224|B>>>12,A[I++]=128|B>>>6&63,A[I++]=128|B&63):(B=65536+((B&1023)<<10|g.charCodeAt(++x)&1023),A[I++]=240|B>>>18,A[I++]=128|B>>>12&63,A[I++]=128|B>>>6&63,A[I++]=128|B&63);g=A}else if(_==="object"){if(g===null)throw new Error(e);if(a&&g.constructor===ArrayBuffer)g=new Uint8Array(g);else if(!Array.isArray(g)&&(!a||!ArrayBuffer.isView(g)))throw new Error(e)}else throw new Error(e);g.length>64&&(g=new S(T,!0).update(g).array());var G=[],H=[];for(x=0;x<64;++x){var Q=g[x]||0;G[x]=92^Q,H[x]=54^Q}S.call(this,T,C),this.update(H),this.oKeyPad=G,this.inner=!0,this.sharedMemory=C}E.prototype=new S,E.prototype.finalize=function(){if(S.prototype.finalize.call(this),this.inner){this.inner=!1;var g=this.array();S.call(this,this.is224,this.sharedMemory),this.update(this.oKeyPad),this.update(g),S.prototype.finalize.call(this)}};var P=b();P.sha256=P,P.sha224=b(!0),P.sha256.hmac=w(),P.sha224.hmac=w(!0),o?n.exports=P:(i.sha256=P.sha256,i.sha224=P.sha224)})()})(zr)),zr.exports}var fh=dh();function c0(n){return fh.sha256(JSON.stringify(n.questions.map(({id:e,prompt:t,choices:i,correct:s,difficulty:r})=>({id:e,prompt:t,choices:i,correct:s,difficulty:r??null}))))}/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const _r="181",Ac=0,ya=1,Rc=2,Na=1,Cc=2,Zt=3,di=0,wt=1,Qt=2,ti=0,Bi=1,ba=2,Ma=3,Sa=4,Pc=5,bi=100,Ic=101,Dc=102,Lc=103,Uc=104,Nc=200,Fc=201,Oc=202,Bc=203,Es=204,Ts=205,zc=206,kc=207,Vc=208,Gc=209,Hc=210,Wc=211,qc=212,Xc=213,Yc=214,As=0,Rs=1,Cs=2,zi=3,Ps=4,Is=5,Ds=6,Ls=7,vr=0,jc=1,$c=2,hi=0,Kc=1,Jc=2,Zc=3,Qc=4,el=5,tl=6,il=7,Fa=300,ki=301,Vi=302,Us=303,Ns=304,Vn=306,Fs=1e3,ei=1001,Os=1002,Ct=1003,nl=1004,Dn=1005,Nt=1006,bs=1007,Mi=1008,$t=1009,Oa=1010,Ba=1011,ln=1012,yr=1013,wi=1014,Yt=1015,Hi=1016,br=1017,Mr=1018,hn=1020,za=35902,ka=35899,Va=1021,Ga=1022,kt=1023,un=1026,dn=1027,Sr=1028,wr=1029,Er=1030,Tr=1031,Ar=1033,Nn=33776,Fn=33777,On=33778,Bn=33779,Bs=35840,zs=35841,ks=35842,Vs=35843,Gs=36196,Hs=37492,Ws=37496,qs=37808,Xs=37809,Ys=37810,js=37811,$s=37812,Ks=37813,Js=37814,Zs=37815,Qs=37816,er=37817,tr=37818,ir=37819,nr=37820,sr=37821,rr=36492,ar=36494,or=36495,cr=36283,lr=36284,hr=36285,ur=36286,sl=3200,rl=3201,Rr=0,al=1,li="",Ut="srgb",Gi="srgb-linear",zn="linear",Ke="srgb",Fi=7680,wa=519,ol=512,cl=513,ll=514,Ha=515,hl=516,ul=517,dl=518,fl=519,Ea=35044,ph=35048,Ta="300 es",jt=2e3,kn=2001;function pl(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function dr(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function ml(){const n=dr("canvas");return n.style.display="block",n}const Eo={};function Aa(...n){const e="THREE."+n.shift();console.log(e,...n)}function Pe(...n){const e="THREE."+n.shift();console.warn(e,...n)}function lt(...n){const e="THREE."+n.shift();console.error(e,...n)}function fn(...n){const e=n.join(" ");e in Eo||(Eo[e]=!0,Pe(...n))}function mh(n,e,t){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}class Wi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const s=i[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}}const yt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],kr=Math.PI/180,fr=180/Math.PI;function Gn(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(yt[n&255]+yt[n>>8&255]+yt[n>>16&255]+yt[n>>24&255]+"-"+yt[e&255]+yt[e>>8&255]+"-"+yt[e>>16&15|64]+yt[e>>24&255]+"-"+yt[t&63|128]+yt[t>>8&255]+"-"+yt[t>>16&255]+yt[t>>24&255]+yt[i&255]+yt[i>>8&255]+yt[i>>16&255]+yt[i>>24&255]).toLowerCase()}function He(n,e,t){return Math.max(e,Math.min(t,n))}function xh(n,e){return(n%e+e)%e}function Vr(n,e,t){return(1-t)*n+t*e}function yn(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function At(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}class Fe{constructor(e=0,t=0){Fe.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=He(this.x,e.x,t.x),this.y=He(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=He(this.x,e,t),this.y=He(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(He(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(He(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*i-o*s+e.x,this.y=r*s+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class mn{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,o,a){let c=i[s+0],l=i[s+1],h=i[s+2],u=i[s+3],f=r[o+0],p=r[o+1],v=r[o+2],b=r[o+3];if(a<=0){e[t+0]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u;return}if(a>=1){e[t+0]=f,e[t+1]=p,e[t+2]=v,e[t+3]=b;return}if(u!==b||c!==f||l!==p||h!==v){let m=c*f+l*p+h*v+u*b;m<0&&(f=-f,p=-p,v=-v,b=-b,m=-m);let d=1-a;if(m<.9995){const w=Math.acos(m),S=Math.sin(w);d=Math.sin(d*w)/S,a=Math.sin(a*w)/S,c=c*d+f*a,l=l*d+p*a,h=h*d+v*a,u=u*d+b*a}else{c=c*d+f*a,l=l*d+p*a,h=h*d+v*a,u=u*d+b*a;const w=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=w,l*=w,h*=w,u*=w}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,i,s,r,o){const a=i[s],c=i[s+1],l=i[s+2],h=i[s+3],u=r[o],f=r[o+1],p=r[o+2],v=r[o+3];return e[t]=a*v+h*u+c*p-l*f,e[t+1]=c*v+h*f+l*u-a*p,e[t+2]=l*v+h*p+a*f-c*u,e[t+3]=h*v-a*u-c*f-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(i/2),h=a(s/2),u=a(r/2),f=c(i/2),p=c(s/2),v=c(r/2);switch(o){case"XYZ":this._x=f*h*u+l*p*v,this._y=l*p*u-f*h*v,this._z=l*h*v+f*p*u,this._w=l*h*u-f*p*v;break;case"YXZ":this._x=f*h*u+l*p*v,this._y=l*p*u-f*h*v,this._z=l*h*v-f*p*u,this._w=l*h*u+f*p*v;break;case"ZXY":this._x=f*h*u-l*p*v,this._y=l*p*u+f*h*v,this._z=l*h*v+f*p*u,this._w=l*h*u-f*p*v;break;case"ZYX":this._x=f*h*u-l*p*v,this._y=l*p*u+f*h*v,this._z=l*h*v-f*p*u,this._w=l*h*u+f*p*v;break;case"YZX":this._x=f*h*u+l*p*v,this._y=l*p*u+f*h*v,this._z=l*h*v-f*p*u,this._w=l*h*u-f*p*v;break;case"XZY":this._x=f*h*u-l*p*v,this._y=l*p*u-f*h*v,this._z=l*h*v+f*p*u,this._w=l*h*u+f*p*v;break;default:Pe("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],s=t[4],r=t[8],o=t[1],a=t[5],c=t[9],l=t[2],h=t[6],u=t[10],f=i+a+u;if(f>0){const p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(h-c)*p,this._y=(r-l)*p,this._z=(o-s)*p}else if(i>a&&i>u){const p=2*Math.sqrt(1+i-a-u);this._w=(h-c)/p,this._x=.25*p,this._y=(s+o)/p,this._z=(r+l)/p}else if(a>u){const p=2*Math.sqrt(1+a-i-u);this._w=(r-l)/p,this._x=(s+o)/p,this._y=.25*p,this._z=(c+h)/p}else{const p=2*Math.sqrt(1+u-i-a);this._w=(o-s)/p,this._x=(r+l)/p,this._y=(c+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(He(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,s=e._y,r=e._z,o=e._w,a=t._x,c=t._y,l=t._z,h=t._w;return this._x=i*h+o*a+s*l-r*c,this._y=s*h+o*c+r*a-i*l,this._z=r*h+o*l+i*c-s*a,this._w=o*h-i*a-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t<=0)return this;if(t>=1)return this.copy(e);let i=e._x,s=e._y,r=e._z,o=e._w,a=this.dot(e);a<0&&(i=-i,s=-s,r=-r,o=-o,a=-a);let c=1-t;if(a<.9995){const l=Math.acos(a),h=Math.sin(l);c=Math.sin(c*l)/h,t=Math.sin(t*l)/h,this._x=this._x*c+i*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+o*t,this._onChangeCallback()}else this._x=this._x*c+i*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+o*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class F{constructor(e=0,t=0,i=0){F.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(To.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(To.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(e){const t=this.x,i=this.y,s=this.z,r=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*s-a*i),h=2*(a*t-r*s),u=2*(r*i-o*t);return this.x=t+c*l+o*u-a*h,this.y=i+c*h+a*l-r*u,this.z=s+c*u+r*h-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=He(this.x,e.x,t.x),this.y=He(this.y,e.y,t.y),this.z=He(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=He(this.x,e,t),this.y=He(this.y,e,t),this.z=He(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(He(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,s=e.y,r=e.z,o=t.x,a=t.y,c=t.z;return this.x=s*c-r*a,this.y=r*o-i*c,this.z=i*a-s*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Gr.copy(this).projectOnVector(e),this.sub(Gr)}reflect(e){return this.sub(Gr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(He(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Gr=new F,To=new mn;class Le{constructor(e,t,i,s,r,o,a,c,l){Le.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,o,a,c,l)}set(e,t,i,s,r,o,a,c,l){const h=this.elements;return h[0]=e,h[1]=s,h[2]=a,h[3]=t,h[4]=r,h[5]=c,h[6]=i,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,o=i[0],a=i[3],c=i[6],l=i[1],h=i[4],u=i[7],f=i[2],p=i[5],v=i[8],b=s[0],m=s[3],d=s[6],w=s[1],S=s[4],E=s[7],P=s[2],g=s[5],T=s[8];return r[0]=o*b+a*w+c*P,r[3]=o*m+a*S+c*g,r[6]=o*d+a*E+c*T,r[1]=l*b+h*w+u*P,r[4]=l*m+h*S+u*g,r[7]=l*d+h*E+u*T,r[2]=f*b+p*w+v*P,r[5]=f*m+p*S+v*g,r[8]=f*d+p*E+v*T,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8];return t*o*h-t*a*l-i*r*h+i*a*c+s*r*l-s*o*c}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=h*o-a*l,f=a*c-h*r,p=l*r-o*c,v=t*u+i*f+s*p;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);const b=1/v;return e[0]=u*b,e[1]=(s*l-h*i)*b,e[2]=(a*i-s*o)*b,e[3]=f*b,e[4]=(h*t-s*c)*b,e[5]=(s*r-a*t)*b,e[6]=p*b,e[7]=(i*c-l*t)*b,e[8]=(o*t-i*r)*b,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,o,a){const c=Math.cos(r),l=Math.sin(r);return this.set(i*c,i*l,-i*(c*o+l*a)+o+e,-s*l,s*c,-s*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Hr.makeScale(e,t)),this}rotate(e){return this.premultiply(Hr.makeRotation(-e)),this}translate(e,t){return this.premultiply(Hr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Hr=new Le,Ao=new Le().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ro=new Le().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function gh(){const n={enabled:!0,workingColorSpace:Gi,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===Ke&&(s.r=ui(s.r),s.g=ui(s.g),s.b=ui(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===Ke&&(s.r=cn(s.r),s.g=cn(s.g),s.b=cn(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===li?zn:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return fn("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return fn("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Gi]:{primaries:e,whitePoint:i,transfer:zn,toXYZ:Ao,fromXYZ:Ro,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Ut},outputColorSpaceConfig:{drawingBufferColorSpace:Ut}},[Ut]:{primaries:e,whitePoint:i,transfer:Ke,toXYZ:Ao,fromXYZ:Ro,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Ut}}}),n}const We=gh();function ui(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function cn(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Yi;class xl{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Yi===void 0&&(Yi=dr("canvas")),Yi.width=e.width,Yi.height=e.height;const s=Yi.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),i=Yi}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=dr("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=ui(r[o]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(ui(t[i]/255)*255):t[i]=ui(t[i]);return{data:t,width:e.width,height:e.height}}else return Pe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let _h=0;class Cr{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:_h++}),this.uuid=Gn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Wr(s[o].image)):r.push(Wr(s[o]))}else r=Wr(s);i.url=r}return t||(e.images[this.uuid]=i),i}}function Wr(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?xl.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Pe("Texture: Unable to serialize Texture."),{})}let vh=0;const qr=new F;class vt extends Wi{constructor(e=vt.DEFAULT_IMAGE,t=vt.DEFAULT_MAPPING,i=ei,s=ei,r=Nt,o=Mi,a=kt,c=$t,l=vt.DEFAULT_ANISOTROPY,h=li){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:vh++}),this.uuid=Gn(),this.name="",this.source=new Cr(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new Fe(0,0),this.repeat=new Fe(1,1),this.center=new Fe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Le,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(qr).x}get height(){return this.source.getSize(qr).y}get depth(){return this.source.getSize(qr).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){Pe(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Pe(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Fa)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Fs:e.x=e.x-Math.floor(e.x);break;case ei:e.x=e.x<0?0:1;break;case Os:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Fs:e.y=e.y-Math.floor(e.y);break;case ei:e.y=e.y<0?0:1;break;case Os:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}vt.DEFAULT_IMAGE=null;vt.DEFAULT_MAPPING=Fa;vt.DEFAULT_ANISOTROPY=1;class Je{constructor(e=0,t=0,i=0,s=1){Je.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*i+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r;const c=e.elements,l=c[0],h=c[4],u=c[8],f=c[1],p=c[5],v=c[9],b=c[2],m=c[6],d=c[10];if(Math.abs(h-f)<.01&&Math.abs(u-b)<.01&&Math.abs(v-m)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+b)<.1&&Math.abs(v+m)<.1&&Math.abs(l+p+d-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const S=(l+1)/2,E=(p+1)/2,P=(d+1)/2,g=(h+f)/4,T=(u+b)/4,C=(v+m)/4;return S>E&&S>P?S<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(S),s=g/i,r=T/i):E>P?E<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(E),i=g/s,r=C/s):P<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(P),i=T/r,s=C/r),this.set(i,s,r,t),this}let w=Math.sqrt((m-v)*(m-v)+(u-b)*(u-b)+(f-h)*(f-h));return Math.abs(w)<.001&&(w=1),this.x=(m-v)/w,this.y=(u-b)/w,this.z=(f-h)/w,this.w=Math.acos((l+p+d-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=He(this.x,e.x,t.x),this.y=He(this.y,e.y,t.y),this.z=He(this.z,e.z,t.z),this.w=He(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=He(this.x,e,t),this.y=He(this.y,e,t),this.z=He(this.z,e,t),this.w=He(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(He(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class gl extends Wi{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Nt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new Je(0,0,e,t),this.scissorTest=!1,this.viewport=new Je(0,0,e,t);const s={width:e,height:t,depth:i.depth},r=new vt(s);this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){const t={minFilter:Nt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new Cr(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ei extends gl{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Wa extends vt{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Ct,this.minFilter=Ct,this.wrapR=ei,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class _l extends vt{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Ct,this.minFilter=Ct,this.wrapR=ei,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ti{constructor(e=new F(1/0,1/0,1/0),t=new F(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Ht.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Ht.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Ht.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Ht):Ht.fromBufferAttribute(r,o),Ht.applyMatrix4(e.matrixWorld),this.expandByPoint(Ht);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Kn.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Kn.copy(i.boundingBox)),Kn.applyMatrix4(e.matrixWorld),this.union(Kn)}const s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Ht),Ht.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(bn),Jn.subVectors(this.max,bn),ji.subVectors(e.a,bn),$i.subVectors(e.b,bn),Ki.subVectors(e.c,bn),pi.subVectors($i,ji),mi.subVectors(Ki,$i),Pi.subVectors(ji,Ki);let t=[0,-pi.z,pi.y,0,-mi.z,mi.y,0,-Pi.z,Pi.y,pi.z,0,-pi.x,mi.z,0,-mi.x,Pi.z,0,-Pi.x,-pi.y,pi.x,0,-mi.y,mi.x,0,-Pi.y,Pi.x,0];return!Xr(t,ji,$i,Ki,Jn)||(t=[1,0,0,0,1,0,0,0,1],!Xr(t,ji,$i,Ki,Jn))?!1:(Zn.crossVectors(pi,mi),t=[Zn.x,Zn.y,Zn.z],Xr(t,ji,$i,Ki,Jn))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Ht).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Ht).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ni[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ni[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ni[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ni[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ni[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ni[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ni[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ni[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ni),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const ni=[new F,new F,new F,new F,new F,new F,new F,new F],Ht=new F,Kn=new Ti,ji=new F,$i=new F,Ki=new F,pi=new F,mi=new F,Pi=new F,bn=new F,Jn=new F,Zn=new F,Ii=new F;function Xr(n,e,t,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){Ii.fromArray(n,r);const a=s.x*Math.abs(Ii.x)+s.y*Math.abs(Ii.y)+s.z*Math.abs(Ii.z),c=e.dot(Ii),l=t.dot(Ii),h=i.dot(Ii);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}const yh=new Ti,Mn=new F,Yr=new F;class Ai{constructor(e=new F,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):yh.setFromPoints(e).getCenter(i);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Mn.subVectors(e,this.center);const t=Mn.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(Mn,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Yr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Mn.copy(e.center).add(Yr)),this.expandByPoint(Mn.copy(e.center).sub(Yr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const si=new F,jr=new F,Qn=new F,xi=new F,$r=new F,es=new F,Kr=new F;class Hn{constructor(e=new F,t=new F(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,si)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=si.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(si.copy(this.origin).addScaledVector(this.direction,t),si.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){jr.copy(e).add(t).multiplyScalar(.5),Qn.copy(t).sub(e).normalize(),xi.copy(this.origin).sub(jr);const r=e.distanceTo(t)*.5,o=-this.direction.dot(Qn),a=xi.dot(this.direction),c=-xi.dot(Qn),l=xi.lengthSq(),h=Math.abs(1-o*o);let u,f,p,v;if(h>0)if(u=o*c-a,f=o*a-c,v=r*h,u>=0)if(f>=-v)if(f<=v){const b=1/h;u*=b,f*=b,p=u*(u+o*f+2*a)+f*(o*u+f+2*c)+l}else f=r,u=Math.max(0,-(o*f+a)),p=-u*u+f*(f+2*c)+l;else f=-r,u=Math.max(0,-(o*f+a)),p=-u*u+f*(f+2*c)+l;else f<=-v?(u=Math.max(0,-(-o*r+a)),f=u>0?-r:Math.min(Math.max(-r,-c),r),p=-u*u+f*(f+2*c)+l):f<=v?(u=0,f=Math.min(Math.max(-r,-c),r),p=f*(f+2*c)+l):(u=Math.max(0,-(o*r+a)),f=u>0?r:Math.min(Math.max(-r,-c),r),p=-u*u+f*(f+2*c)+l);else f=o>0?-r:r,u=Math.max(0,-(o*f+a)),p=-u*u+f*(f+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(jr).addScaledVector(Qn,f),p}intersectSphere(e,t){si.subVectors(e.center,this.origin);const i=si.dot(this.direction),s=si.dot(si)-i*i,r=e.radius*e.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=i-o,c=i+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,o,a,c;const l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return l>=0?(i=(e.min.x-f.x)*l,s=(e.max.x-f.x)*l):(i=(e.max.x-f.x)*l,s=(e.min.x-f.x)*l),h>=0?(r=(e.min.y-f.y)*h,o=(e.max.y-f.y)*h):(r=(e.max.y-f.y)*h,o=(e.min.y-f.y)*h),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(e.min.z-f.z)*u,c=(e.max.z-f.z)*u):(a=(e.max.z-f.z)*u,c=(e.min.z-f.z)*u),i>c||a>s)||((a>i||i!==i)&&(i=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,si)!==null}intersectTriangle(e,t,i,s,r){$r.subVectors(t,e),es.subVectors(i,e),Kr.crossVectors($r,es);let o=this.direction.dot(Kr),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;xi.subVectors(this.origin,e);const c=a*this.direction.dot(es.crossVectors(xi,es));if(c<0)return null;const l=a*this.direction.dot($r.cross(xi));if(l<0||c+l>o)return null;const h=-a*xi.dot(Kr);return h<0?null:this.at(h/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ze{constructor(e,t,i,s,r,o,a,c,l,h,u,f,p,v,b,m){Ze.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,o,a,c,l,h,u,f,p,v,b,m)}set(e,t,i,s,r,o,a,c,l,h,u,f,p,v,b,m){const d=this.elements;return d[0]=e,d[4]=t,d[8]=i,d[12]=s,d[1]=r,d[5]=o,d[9]=a,d[13]=c,d[2]=l,d[6]=h,d[10]=u,d[14]=f,d[3]=p,d[7]=v,d[11]=b,d[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ze().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,s=1/Ji.setFromMatrixColumn(e,0).length(),r=1/Ji.setFromMatrixColumn(e,1).length(),o=1/Ji.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,s=e.y,r=e.z,o=Math.cos(i),a=Math.sin(i),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const f=o*h,p=o*u,v=a*h,b=a*u;t[0]=c*h,t[4]=-c*u,t[8]=l,t[1]=p+v*l,t[5]=f-b*l,t[9]=-a*c,t[2]=b-f*l,t[6]=v+p*l,t[10]=o*c}else if(e.order==="YXZ"){const f=c*h,p=c*u,v=l*h,b=l*u;t[0]=f+b*a,t[4]=v*a-p,t[8]=o*l,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=p*a-v,t[6]=b+f*a,t[10]=o*c}else if(e.order==="ZXY"){const f=c*h,p=c*u,v=l*h,b=l*u;t[0]=f-b*a,t[4]=-o*u,t[8]=v+p*a,t[1]=p+v*a,t[5]=o*h,t[9]=b-f*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){const f=o*h,p=o*u,v=a*h,b=a*u;t[0]=c*h,t[4]=v*l-p,t[8]=f*l+b,t[1]=c*u,t[5]=b*l+f,t[9]=p*l-v,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){const f=o*c,p=o*l,v=a*c,b=a*l;t[0]=c*h,t[4]=b-f*u,t[8]=v*u+p,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-l*h,t[6]=p*u+v,t[10]=f-b*u}else if(e.order==="XZY"){const f=o*c,p=o*l,v=a*c,b=a*l;t[0]=c*h,t[4]=-u,t[8]=l*h,t[1]=f*u+b,t[5]=o*h,t[9]=p*u-v,t[2]=v*u-p,t[6]=a*h,t[10]=b*u+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(bh,e,Mh)}lookAt(e,t,i){const s=this.elements;return Dt.subVectors(e,t),Dt.lengthSq()===0&&(Dt.z=1),Dt.normalize(),gi.crossVectors(i,Dt),gi.lengthSq()===0&&(Math.abs(i.z)===1?Dt.x+=1e-4:Dt.z+=1e-4,Dt.normalize(),gi.crossVectors(i,Dt)),gi.normalize(),ts.crossVectors(Dt,gi),s[0]=gi.x,s[4]=ts.x,s[8]=Dt.x,s[1]=gi.y,s[5]=ts.y,s[9]=Dt.y,s[2]=gi.z,s[6]=ts.z,s[10]=Dt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,o=i[0],a=i[4],c=i[8],l=i[12],h=i[1],u=i[5],f=i[9],p=i[13],v=i[2],b=i[6],m=i[10],d=i[14],w=i[3],S=i[7],E=i[11],P=i[15],g=s[0],T=s[4],C=s[8],x=s[12],_=s[1],A=s[5],D=s[9],I=s[13],B=s[2],G=s[6],H=s[10],Q=s[14],W=s[3],Y=s[7],te=s[11],me=s[15];return r[0]=o*g+a*_+c*B+l*W,r[4]=o*T+a*A+c*G+l*Y,r[8]=o*C+a*D+c*H+l*te,r[12]=o*x+a*I+c*Q+l*me,r[1]=h*g+u*_+f*B+p*W,r[5]=h*T+u*A+f*G+p*Y,r[9]=h*C+u*D+f*H+p*te,r[13]=h*x+u*I+f*Q+p*me,r[2]=v*g+b*_+m*B+d*W,r[6]=v*T+b*A+m*G+d*Y,r[10]=v*C+b*D+m*H+d*te,r[14]=v*x+b*I+m*Q+d*me,r[3]=w*g+S*_+E*B+P*W,r[7]=w*T+S*A+E*G+P*Y,r[11]=w*C+S*D+E*H+P*te,r[15]=w*x+S*I+E*Q+P*me,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],o=e[1],a=e[5],c=e[9],l=e[13],h=e[2],u=e[6],f=e[10],p=e[14],v=e[3],b=e[7],m=e[11],d=e[15];return v*(+r*c*u-s*l*u-r*a*f+i*l*f+s*a*p-i*c*p)+b*(+t*c*p-t*l*f+r*o*f-s*o*p+s*l*h-r*c*h)+m*(+t*l*u-t*a*p-r*o*u+i*o*p+r*a*h-i*l*h)+d*(-s*a*h-t*c*u+t*a*f+s*o*u-i*o*f+i*c*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=e[9],f=e[10],p=e[11],v=e[12],b=e[13],m=e[14],d=e[15],w=u*m*l-b*f*l+b*c*p-a*m*p-u*c*d+a*f*d,S=v*f*l-h*m*l-v*c*p+o*m*p+h*c*d-o*f*d,E=h*b*l-v*u*l+v*a*p-o*b*p-h*a*d+o*u*d,P=v*u*c-h*b*c-v*a*f+o*b*f+h*a*m-o*u*m,g=t*w+i*S+s*E+r*P;if(g===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const T=1/g;return e[0]=w*T,e[1]=(b*f*r-u*m*r-b*s*p+i*m*p+u*s*d-i*f*d)*T,e[2]=(a*m*r-b*c*r+b*s*l-i*m*l-a*s*d+i*c*d)*T,e[3]=(u*c*r-a*f*r-u*s*l+i*f*l+a*s*p-i*c*p)*T,e[4]=S*T,e[5]=(h*m*r-v*f*r+v*s*p-t*m*p-h*s*d+t*f*d)*T,e[6]=(v*c*r-o*m*r-v*s*l+t*m*l+o*s*d-t*c*d)*T,e[7]=(o*f*r-h*c*r+h*s*l-t*f*l-o*s*p+t*c*p)*T,e[8]=E*T,e[9]=(v*u*r-h*b*r-v*i*p+t*b*p+h*i*d-t*u*d)*T,e[10]=(o*b*r-v*a*r+v*i*l-t*b*l-o*i*d+t*a*d)*T,e[11]=(h*a*r-o*u*r-h*i*l+t*u*l+o*i*p-t*a*p)*T,e[12]=P*T,e[13]=(h*b*s-v*u*s+v*i*f-t*b*f-h*i*m+t*u*m)*T,e[14]=(v*a*s-o*b*s-v*i*c+t*b*c+o*i*m-t*a*m)*T,e[15]=(o*u*s-h*a*s+h*i*c-t*u*c-o*i*f+t*a*f)*T,this}scale(e){const t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),s=Math.sin(t),r=1-i,o=e.x,a=e.y,c=e.z,l=r*o,h=r*a;return this.set(l*o+i,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+i,h*c-s*o,0,l*c-s*a,h*c+s*o,r*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,o){return this.set(1,i,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){const s=this.elements,r=t._x,o=t._y,a=t._z,c=t._w,l=r+r,h=o+o,u=a+a,f=r*l,p=r*h,v=r*u,b=o*h,m=o*u,d=a*u,w=c*l,S=c*h,E=c*u,P=i.x,g=i.y,T=i.z;return s[0]=(1-(b+d))*P,s[1]=(p+E)*P,s[2]=(v-S)*P,s[3]=0,s[4]=(p-E)*g,s[5]=(1-(f+d))*g,s[6]=(m+w)*g,s[7]=0,s[8]=(v+S)*T,s[9]=(m-w)*T,s[10]=(1-(f+b))*T,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){const s=this.elements;let r=Ji.set(s[0],s[1],s[2]).length();const o=Ji.set(s[4],s[5],s[6]).length(),a=Ji.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],Wt.copy(this);const l=1/r,h=1/o,u=1/a;return Wt.elements[0]*=l,Wt.elements[1]*=l,Wt.elements[2]*=l,Wt.elements[4]*=h,Wt.elements[5]*=h,Wt.elements[6]*=h,Wt.elements[8]*=u,Wt.elements[9]*=u,Wt.elements[10]*=u,t.setFromRotationMatrix(Wt),i.x=r,i.y=o,i.z=a,this}makePerspective(e,t,i,s,r,o,a=jt,c=!1){const l=this.elements,h=2*r/(t-e),u=2*r/(i-s),f=(t+e)/(t-e),p=(i+s)/(i-s);let v,b;if(c)v=r/(o-r),b=o*r/(o-r);else if(a===jt)v=-(o+r)/(o-r),b=-2*o*r/(o-r);else if(a===kn)v=-o/(o-r),b=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=u,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=v,l[14]=b,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,s,r,o,a=jt,c=!1){const l=this.elements,h=2/(t-e),u=2/(i-s),f=-(t+e)/(t-e),p=-(i+s)/(i-s);let v,b;if(c)v=1/(o-r),b=o/(o-r);else if(a===jt)v=-2/(o-r),b=-(o+r)/(o-r);else if(a===kn)v=-1/(o-r),b=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=0,l[12]=f,l[1]=0,l[5]=u,l[9]=0,l[13]=p,l[2]=0,l[6]=0,l[10]=v,l[14]=b,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Ji=new F,Wt=new Ze,bh=new F(0,0,0),Mh=new F(1,1,1),gi=new F,ts=new F,Dt=new F,Co=new Ze,Po=new mn;class Vt{constructor(e=0,t=0,i=0,s=Vt.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const s=e.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],h=s[9],u=s[2],f=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin(He(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-He(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(He(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-He(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(He(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-He(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:Pe("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Co.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Co,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Po.setFromEuler(this),this.setFromQuaternion(Po,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Vt.DEFAULT_ORDER="XYZ";class Pr{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Sh=0;const Io=new F,Zi=new mn,ri=new Ze,is=new F,Sn=new F,wh=new F,Eh=new mn,Do=new F(1,0,0),Lo=new F(0,1,0),Uo=new F(0,0,1),No={type:"added"},Th={type:"removed"},Qi={type:"childadded",child:null},Jr={type:"childremoved",child:null};class dt extends Wi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Sh++}),this.uuid=Gn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=dt.DEFAULT_UP.clone();const e=new F,t=new Vt,i=new mn,s=new F(1,1,1);function r(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Ze},normalMatrix:{value:new Le}}),this.matrix=new Ze,this.matrixWorld=new Ze,this.matrixAutoUpdate=dt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=dt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Pr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Zi.setFromAxisAngle(e,t),this.quaternion.multiply(Zi),this}rotateOnWorldAxis(e,t){return Zi.setFromAxisAngle(e,t),this.quaternion.premultiply(Zi),this}rotateX(e){return this.rotateOnAxis(Do,e)}rotateY(e){return this.rotateOnAxis(Lo,e)}rotateZ(e){return this.rotateOnAxis(Uo,e)}translateOnAxis(e,t){return Io.copy(e).applyQuaternion(this.quaternion),this.position.add(Io.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Do,e)}translateY(e){return this.translateOnAxis(Lo,e)}translateZ(e){return this.translateOnAxis(Uo,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ri.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?is.copy(e):is.set(e,t,i);const s=this.parent;this.updateWorldMatrix(!0,!1),Sn.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ri.lookAt(Sn,is,this.up):ri.lookAt(is,Sn,this.up),this.quaternion.setFromRotationMatrix(ri),s&&(ri.extractRotation(s.matrixWorld),Zi.setFromRotationMatrix(ri),this.quaternion.premultiply(Zi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(lt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(No),Qi.child=e,this.dispatchEvent(Qi),Qi.child=null):lt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Th),Jr.child=e,this.dispatchEvent(Jr),Jr.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ri.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ri.multiply(e.parent.matrixWorld)),e.applyMatrix4(ri),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(No),Qi.child=e,this.dispatchEvent(Qi),Qi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){const o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Sn,e,wh),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Sn,Eh,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const u=c[l];r(e.shapes,u)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(e.materials,this.material[c]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];s.animations.push(r(e.animations,c))}}if(t){const a=o(e.geometries),c=o(e.materials),l=o(e.textures),h=o(e.images),u=o(e.shapes),f=o(e.skeletons),p=o(e.animations),v=o(e.nodes);a.length>0&&(i.geometries=a),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),h.length>0&&(i.images=h),u.length>0&&(i.shapes=u),f.length>0&&(i.skeletons=f),p.length>0&&(i.animations=p),v.length>0&&(i.nodes=v)}return i.object=s,i;function o(a){const c=[];for(const l in a){const h=a[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}}dt.DEFAULT_UP=new F(0,1,0);dt.DEFAULT_MATRIX_AUTO_UPDATE=!0;dt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const qt=new F,ai=new F,Zr=new F,oi=new F,en=new F,tn=new F,Fo=new F,Qr=new F,ea=new F,ta=new F,ia=new Je,na=new Je,sa=new Je;class zt{constructor(e=new F,t=new F,i=new F){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),qt.subVectors(e,t),s.cross(qt);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){qt.subVectors(s,t),ai.subVectors(i,t),Zr.subVectors(e,t);const o=qt.dot(qt),a=qt.dot(ai),c=qt.dot(Zr),l=ai.dot(ai),h=ai.dot(Zr),u=o*l-a*a;if(u===0)return r.set(0,0,0),null;const f=1/u,p=(l*c-a*h)*f,v=(o*h-a*c)*f;return r.set(1-p-v,v,p)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,oi)===null?!1:oi.x>=0&&oi.y>=0&&oi.x+oi.y<=1}static getInterpolation(e,t,i,s,r,o,a,c){return this.getBarycoord(e,t,i,s,oi)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,oi.x),c.addScaledVector(o,oi.y),c.addScaledVector(a,oi.z),c)}static getInterpolatedAttribute(e,t,i,s,r,o){return ia.setScalar(0),na.setScalar(0),sa.setScalar(0),ia.fromBufferAttribute(e,t),na.fromBufferAttribute(e,i),sa.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(ia,r.x),o.addScaledVector(na,r.y),o.addScaledVector(sa,r.z),o}static isFrontFacing(e,t,i,s){return qt.subVectors(i,t),ai.subVectors(e,t),qt.cross(ai).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return qt.subVectors(this.c,this.b),ai.subVectors(this.a,this.b),qt.cross(ai).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return zt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return zt.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,r){return zt.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return zt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return zt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,s=this.b,r=this.c;let o,a;en.subVectors(s,i),tn.subVectors(r,i),Qr.subVectors(e,i);const c=en.dot(Qr),l=tn.dot(Qr);if(c<=0&&l<=0)return t.copy(i);ea.subVectors(e,s);const h=en.dot(ea),u=tn.dot(ea);if(h>=0&&u<=h)return t.copy(s);const f=c*u-h*l;if(f<=0&&c>=0&&h<=0)return o=c/(c-h),t.copy(i).addScaledVector(en,o);ta.subVectors(e,r);const p=en.dot(ta),v=tn.dot(ta);if(v>=0&&p<=v)return t.copy(r);const b=p*l-c*v;if(b<=0&&l>=0&&v<=0)return a=l/(l-v),t.copy(i).addScaledVector(tn,a);const m=h*v-p*u;if(m<=0&&u-h>=0&&p-v>=0)return Fo.subVectors(r,s),a=(u-h)/(u-h+(p-v)),t.copy(s).addScaledVector(Fo,a);const d=1/(m+b+f);return o=b*d,a=f*d,t.copy(i).addScaledVector(en,o).addScaledVector(tn,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const vl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},_i={h:0,s:0,l:0},ns={h:0,s:0,l:0};function ra(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class Ue{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Ut){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,We.colorSpaceToWorking(this,t),this}setRGB(e,t,i,s=We.workingColorSpace){return this.r=e,this.g=t,this.b=i,We.colorSpaceToWorking(this,s),this}setHSL(e,t,i,s=We.workingColorSpace){if(e=xh(e,1),t=He(t,0,1),i=He(i,0,1),t===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+t):i+t-i*t,o=2*i-r;this.r=ra(o,r,e+1/3),this.g=ra(o,r,e),this.b=ra(o,r,e-1/3)}return We.colorSpaceToWorking(this,s),this}setStyle(e,t=Ut){function i(r){r!==void 0&&parseFloat(r)<1&&Pe("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Pe("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);Pe("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Ut){const i=vl[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Pe("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ui(e.r),this.g=ui(e.g),this.b=ui(e.b),this}copyLinearToSRGB(e){return this.r=cn(e.r),this.g=cn(e.g),this.b=cn(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ut){return We.workingToColorSpace(bt.copy(this),e),Math.round(He(bt.r*255,0,255))*65536+Math.round(He(bt.g*255,0,255))*256+Math.round(He(bt.b*255,0,255))}getHexString(e=Ut){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=We.workingColorSpace){We.workingToColorSpace(bt.copy(this),t);const i=bt.r,s=bt.g,r=bt.b,o=Math.max(i,s,r),a=Math.min(i,s,r);let c,l;const h=(a+o)/2;if(a===o)c=0,l=0;else{const u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case i:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-i)/u+2;break;case r:c=(i-s)/u+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=We.workingColorSpace){return We.workingToColorSpace(bt.copy(this),t),e.r=bt.r,e.g=bt.g,e.b=bt.b,e}getStyle(e=Ut){We.workingToColorSpace(bt.copy(this),e);const t=bt.r,i=bt.g,s=bt.b;return e!==Ut?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(_i),this.setHSL(_i.h+e,_i.s+t,_i.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(_i),e.getHSL(ns);const i=Vr(_i.h,ns.h,t),s=Vr(_i.s,ns.s,t),r=Vr(_i.l,ns.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const bt=new Ue;Ue.NAMES=vl;let Ah=0;class fi extends Wi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ah++}),this.uuid=Gn(),this.name="",this.type="Material",this.blending=Bi,this.side=di,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Es,this.blendDst=Ts,this.blendEquation=bi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ue(0,0,0),this.blendAlpha=0,this.depthFunc=zi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=wa,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Fi,this.stencilZFail=Fi,this.stencilZPass=Fi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){Pe(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Pe(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Bi&&(i.blending=this.blending),this.side!==di&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Es&&(i.blendSrc=this.blendSrc),this.blendDst!==Ts&&(i.blendDst=this.blendDst),this.blendEquation!==bi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==zi&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==wa&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Fi&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Fi&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Fi&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const o=[];for(const a in r){const c=r[a];delete c.metadata,o.push(c)}return o}if(t){const r=s(e.textures),o=s(e.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class qa extends fi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ue(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Vt,this.combine=vr,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const ft=new F,ss=new Fe;let Rh=0;class Ft{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Rh++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Ea,this.updateRanges=[],this.gpuType=Yt,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)ss.fromBufferAttribute(this,t),ss.applyMatrix3(e),this.setXY(t,ss.x,ss.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)ft.fromBufferAttribute(this,t),ft.applyMatrix3(e),this.setXYZ(t,ft.x,ft.y,ft.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)ft.fromBufferAttribute(this,t),ft.applyMatrix4(e),this.setXYZ(t,ft.x,ft.y,ft.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)ft.fromBufferAttribute(this,t),ft.applyNormalMatrix(e),this.setXYZ(t,ft.x,ft.y,ft.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)ft.fromBufferAttribute(this,t),ft.transformDirection(e),this.setXYZ(t,ft.x,ft.y,ft.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=yn(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=At(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=yn(t,this.array)),t}setX(e,t){return this.normalized&&(t=At(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=yn(t,this.array)),t}setY(e,t){return this.normalized&&(t=At(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=yn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=At(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=yn(t,this.array)),t}setW(e,t){return this.normalized&&(t=At(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=At(t,this.array),i=At(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=At(t,this.array),i=At(i,this.array),s=At(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=At(t,this.array),i=At(i,this.array),s=At(s,this.array),r=At(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Ea&&(e.usage=this.usage),e}}class Xa extends Ft{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Ya extends Ft{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class $e extends Ft{constructor(e,t,i){super(new Float32Array(e),t,i)}}let Ch=0;const Bt=new Ze,aa=new dt,nn=new F,Lt=new Ti,wn=new Ti,gt=new F;class xt extends Wi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Ch++}),this.uuid=Gn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(pl(e)?Ya:Xa)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Le().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Bt.makeRotationFromQuaternion(e),this.applyMatrix4(Bt),this}rotateX(e){return Bt.makeRotationX(e),this.applyMatrix4(Bt),this}rotateY(e){return Bt.makeRotationY(e),this.applyMatrix4(Bt),this}rotateZ(e){return Bt.makeRotationZ(e),this.applyMatrix4(Bt),this}translate(e,t,i){return Bt.makeTranslation(e,t,i),this.applyMatrix4(Bt),this}scale(e,t,i){return Bt.makeScale(e,t,i),this.applyMatrix4(Bt),this}lookAt(e){return aa.lookAt(e),aa.updateMatrix(),this.applyMatrix4(aa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(nn).negate(),this.translate(nn.x,nn.y,nn.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let s=0,r=e.length;s<r;s++){const o=e[s];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new $e(i,3))}else{const i=Math.min(e.length,t.count);for(let s=0;s<i;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Pe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ti);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){lt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new F(-1/0,-1/0,-1/0),new F(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){const r=t[i];Lt.setFromBufferAttribute(r),this.morphTargetsRelative?(gt.addVectors(this.boundingBox.min,Lt.min),this.boundingBox.expandByPoint(gt),gt.addVectors(this.boundingBox.max,Lt.max),this.boundingBox.expandByPoint(gt)):(this.boundingBox.expandByPoint(Lt.min),this.boundingBox.expandByPoint(Lt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&lt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ai);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){lt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new F,1/0);return}if(e){const i=this.boundingSphere.center;if(Lt.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];wn.setFromBufferAttribute(a),this.morphTargetsRelative?(gt.addVectors(Lt.min,wn.min),Lt.expandByPoint(gt),gt.addVectors(Lt.max,wn.max),Lt.expandByPoint(gt)):(Lt.expandByPoint(wn.min),Lt.expandByPoint(wn.max))}Lt.getCenter(i);let s=0;for(let r=0,o=e.count;r<o;r++)gt.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(gt));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)gt.fromBufferAttribute(a,l),c&&(nn.fromBufferAttribute(e,l),gt.add(nn)),s=Math.max(s,i.distanceToSquared(gt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&lt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){lt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ft(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let C=0;C<i.count;C++)a[C]=new F,c[C]=new F;const l=new F,h=new F,u=new F,f=new Fe,p=new Fe,v=new Fe,b=new F,m=new F;function d(C,x,_){l.fromBufferAttribute(i,C),h.fromBufferAttribute(i,x),u.fromBufferAttribute(i,_),f.fromBufferAttribute(r,C),p.fromBufferAttribute(r,x),v.fromBufferAttribute(r,_),h.sub(l),u.sub(l),p.sub(f),v.sub(f);const A=1/(p.x*v.y-v.x*p.y);isFinite(A)&&(b.copy(h).multiplyScalar(v.y).addScaledVector(u,-p.y).multiplyScalar(A),m.copy(u).multiplyScalar(p.x).addScaledVector(h,-v.x).multiplyScalar(A),a[C].add(b),a[x].add(b),a[_].add(b),c[C].add(m),c[x].add(m),c[_].add(m))}let w=this.groups;w.length===0&&(w=[{start:0,count:e.count}]);for(let C=0,x=w.length;C<x;++C){const _=w[C],A=_.start,D=_.count;for(let I=A,B=A+D;I<B;I+=3)d(e.getX(I+0),e.getX(I+1),e.getX(I+2))}const S=new F,E=new F,P=new F,g=new F;function T(C){P.fromBufferAttribute(s,C),g.copy(P);const x=a[C];S.copy(x),S.sub(P.multiplyScalar(P.dot(x))).normalize(),E.crossVectors(g,x);const A=E.dot(c[C])<0?-1:1;o.setXYZW(C,S.x,S.y,S.z,A)}for(let C=0,x=w.length;C<x;++C){const _=w[C],A=_.start,D=_.count;for(let I=A,B=A+D;I<B;I+=3)T(e.getX(I+0)),T(e.getX(I+1)),T(e.getX(I+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Ft(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let f=0,p=i.count;f<p;f++)i.setXYZ(f,0,0,0);const s=new F,r=new F,o=new F,a=new F,c=new F,l=new F,h=new F,u=new F;if(e)for(let f=0,p=e.count;f<p;f+=3){const v=e.getX(f+0),b=e.getX(f+1),m=e.getX(f+2);s.fromBufferAttribute(t,v),r.fromBufferAttribute(t,b),o.fromBufferAttribute(t,m),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(i,v),c.fromBufferAttribute(i,b),l.fromBufferAttribute(i,m),a.add(h),c.add(h),l.add(h),i.setXYZ(v,a.x,a.y,a.z),i.setXYZ(b,c.x,c.y,c.z),i.setXYZ(m,l.x,l.y,l.z)}else for(let f=0,p=t.count;f<p;f+=3)s.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),i.setXYZ(f+0,h.x,h.y,h.z),i.setXYZ(f+1,h.x,h.y,h.z),i.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)gt.fromBufferAttribute(e,t),gt.normalize(),e.setXYZ(t,gt.x,gt.y,gt.z)}toNonIndexed(){function e(a,c){const l=a.array,h=a.itemSize,u=a.normalized,f=new l.constructor(c.length*h);let p=0,v=0;for(let b=0,m=c.length;b<m;b++){a.isInterleavedBufferAttribute?p=c[b]*a.data.stride+a.offset:p=c[b]*h;for(let d=0;d<h;d++)f[v++]=l[p++]}return new Ft(f,h,u)}if(this.index===null)return Pe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new xt,i=this.index.array,s=this.attributes;for(const a in s){const c=s[a],l=e(c,i);t.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const c=[],l=r[a];for(let h=0,u=l.length;h<u;h++){const f=l[h],p=e(f,i);c.push(p)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const c in i){const l=i[c];e.data.attributes[c]=l.toJSON(e.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let u=0,f=l.length;u<f;u++){const p=l[u];h.push(p.toJSON(e.data))}h.length>0&&(s[c]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const s=e.attributes;for(const l in s){const h=s[l];this.setAttribute(l,h.clone(t))}const r=e.morphAttributes;for(const l in r){const h=[],u=r[l];for(let f=0,p=u.length;f<p;f++)h.push(u[f].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let l=0,h=o.length;l<h;l++){const u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Oo=new Ze,Di=new Hn,rs=new Ai,Bo=new F,as=new F,os=new F,cs=new F,oa=new F,ls=new F,zo=new F,hs=new F;class Kt extends dt{constructor(e=new xt,t=new qa){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(s,e);const a=this.morphTargetInfluences;if(r&&a){ls.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=a[c],u=r[c];h!==0&&(oa.fromBufferAttribute(u,e),o?ls.addScaledVector(oa,h):ls.addScaledVector(oa.sub(t),h))}t.add(ls)}return t}raycast(e,t){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),rs.copy(i.boundingSphere),rs.applyMatrix4(r),Di.copy(e.ray).recast(e.near),!(rs.containsPoint(Di.origin)===!1&&(Di.intersectSphere(rs,Bo)===null||Di.origin.distanceToSquared(Bo)>(e.far-e.near)**2))&&(Oo.copy(r).invert(),Di.copy(e.ray).applyMatrix4(Oo),!(i.boundingBox!==null&&Di.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Di)))}_computeIntersections(e,t,i){let s;const r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,p=r.drawRange;if(a!==null)if(Array.isArray(o))for(let v=0,b=f.length;v<b;v++){const m=f[v],d=o[m.materialIndex],w=Math.max(m.start,p.start),S=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let E=w,P=S;E<P;E+=3){const g=a.getX(E),T=a.getX(E+1),C=a.getX(E+2);s=us(this,d,e,i,l,h,u,g,T,C),s&&(s.faceIndex=Math.floor(E/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const v=Math.max(0,p.start),b=Math.min(a.count,p.start+p.count);for(let m=v,d=b;m<d;m+=3){const w=a.getX(m),S=a.getX(m+1),E=a.getX(m+2);s=us(this,o,e,i,l,h,u,w,S,E),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let v=0,b=f.length;v<b;v++){const m=f[v],d=o[m.materialIndex],w=Math.max(m.start,p.start),S=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let E=w,P=S;E<P;E+=3){const g=E,T=E+1,C=E+2;s=us(this,d,e,i,l,h,u,g,T,C),s&&(s.faceIndex=Math.floor(E/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const v=Math.max(0,p.start),b=Math.min(c.count,p.start+p.count);for(let m=v,d=b;m<d;m+=3){const w=m,S=m+1,E=m+2;s=us(this,o,e,i,l,h,u,w,S,E),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function Ph(n,e,t,i,s,r,o,a){let c;if(e.side===wt?c=i.intersectTriangle(o,r,s,!0,a):c=i.intersectTriangle(s,r,o,e.side===di,a),c===null)return null;hs.copy(a),hs.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(hs);return l<t.near||l>t.far?null:{distance:l,point:hs.clone(),object:n}}function us(n,e,t,i,s,r,o,a,c,l){n.getVertexPosition(a,as),n.getVertexPosition(c,os),n.getVertexPosition(l,cs);const h=Ph(n,e,t,i,as,os,cs,zo);if(h){const u=new F;zt.getBarycoord(zo,as,os,cs,u),s&&(h.uv=zt.getInterpolatedAttribute(s,a,c,l,u,new Fe)),r&&(h.uv1=zt.getInterpolatedAttribute(r,a,c,l,u,new Fe)),o&&(h.normal=zt.getInterpolatedAttribute(o,a,c,l,u,new F),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const f={a,b:c,c:l,normal:new F,materialIndex:0};zt.getNormal(as,os,cs,f.normal),h.face=f,h.barycoord=u}return h}class xn extends xt{constructor(e=1,t=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const c=[],l=[],h=[],u=[];let f=0,p=0;v("z","y","x",-1,-1,i,t,e,o,r,0),v("z","y","x",1,-1,i,t,-e,o,r,1),v("x","z","y",1,1,e,i,t,s,o,2),v("x","z","y",1,-1,e,i,-t,s,o,3),v("x","y","z",1,-1,e,t,i,s,r,4),v("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(c),this.setAttribute("position",new $e(l,3)),this.setAttribute("normal",new $e(h,3)),this.setAttribute("uv",new $e(u,2));function v(b,m,d,w,S,E,P,g,T,C,x){const _=E/T,A=P/C,D=E/2,I=P/2,B=g/2,G=T+1,H=C+1;let Q=0,W=0;const Y=new F;for(let te=0;te<H;te++){const me=te*A-I;for(let Oe=0;Oe<G;Oe++){const qe=Oe*_-D;Y[b]=qe*w,Y[m]=me*S,Y[d]=B,l.push(Y.x,Y.y,Y.z),Y[b]=0,Y[m]=0,Y[d]=g>0?1:-1,h.push(Y.x,Y.y,Y.z),u.push(Oe/T),u.push(1-te/C),Q+=1}}for(let te=0;te<C;te++)for(let me=0;me<T;me++){const Oe=f+me+G*te,qe=f+me+G*(te+1),je=f+(me+1)+G*(te+1),Ye=f+(me+1)+G*te;c.push(Oe,qe,Ye),c.push(qe,je,Ye),W+=6}a.addGroup(p,W,x),p+=W,f+=Q}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new xn(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function pn(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const s=n[t][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(Pe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone():Array.isArray(s)?e[t][i]=s.slice():e[t][i]=s}}return e}function St(n){const e={};for(let t=0;t<n.length;t++){const i=pn(n[t]);for(const s in i)e[s]=i[s]}return e}function Ih(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function yl(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:We.workingColorSpace}const bl={clone:pn,merge:St};var Dh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Lh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ii extends fi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Dh,this.fragmentShader=Lh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=pn(e.uniforms),this.uniformsGroups=Ih(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class ja extends dt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ze,this.projectionMatrix=new Ze,this.projectionMatrixInverse=new Ze,this.coordinateSystem=jt,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const vi=new F,ko=new Fe,Vo=new Fe;class Rt extends ja{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=fr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(kr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return fr*2*Math.atan(Math.tan(kr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){vi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(vi.x,vi.y).multiplyScalar(-e/vi.z),vi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(vi.x,vi.y).multiplyScalar(-e/vi.z)}getViewSize(e,t){return this.getViewBounds(e,ko,Vo),t.subVectors(Vo,ko)}setViewOffset(e,t,i,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(kr*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,t-=o.offsetY*i/l,s*=o.width/c,i*=o.height/l}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const sn=-90,rn=1;class Ml extends dt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Rt(sn,rn,e,t);s.layers=this.layers,this.add(s);const r=new Rt(sn,rn,e,t);r.layers=this.layers,this.add(r);const o=new Rt(sn,rn,e,t);o.layers=this.layers,this.add(o);const a=new Rt(sn,rn,e,t);a.layers=this.layers,this.add(a);const c=new Rt(sn,rn,e,t);c.layers=this.layers,this.add(c);const l=new Rt(sn,rn,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,s,r,o,a,c]=t;for(const l of t)this.remove(l);if(e===jt)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===kn)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,c,l,h]=this.children,u=e.getRenderTarget(),f=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),v=e.xr.enabled;e.xr.enabled=!1;const b=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,s),e.render(t,r),e.setRenderTarget(i,1,s),e.render(t,o),e.setRenderTarget(i,2,s),e.render(t,a),e.setRenderTarget(i,3,s),e.render(t,c),e.setRenderTarget(i,4,s),e.render(t,l),i.texture.generateMipmaps=b,e.setRenderTarget(i,5,s),e.render(t,h),e.setRenderTarget(u,f,p),e.xr.enabled=v,i.texture.needsPMREMUpdate=!0}}class $a extends vt{constructor(e=[],t=ki,i,s,r,o,a,c,l,h){super(e,t,i,s,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Sl extends Ei{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new $a(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new xn(5,5,5),r=new ii({name:"CubemapFromEquirect",uniforms:pn(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:wt,blending:ti});r.uniforms.tEquirect.value=t;const o=new Kt(s,r),a=t.minFilter;return t.minFilter===Mi&&(t.minFilter=Nt),new Ml(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,i=!0,s=!0){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,s);e.setRenderTarget(r)}}class Ln extends dt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Uh={type:"move"};class Ms{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ln,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ln,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new F,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new F),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ln,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new F,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new F),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(const b of e.hand.values()){const m=t.getJointPose(b,i),d=this._getHandJoint(l,b);m!==null&&(d.matrix.fromArray(m.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=m.radius),d.visible=m!==null}const h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],f=h.position.distanceTo(u.position),p=.02,v=.005;l.inputState.pinching&&f>p+v?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&f<=p-v&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Uh)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Ln;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class Ka{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Ue(e),this.density=t}clone(){return new Ka(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Ja{constructor(e,t=1,i=1e3){this.isFog=!0,this.name="",this.color=new Ue(e),this.near=t,this.far=i}clone(){return new Ja(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Nh extends dt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Vt,this.environmentIntensity=1,this.environmentRotation=new Vt,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Za extends vt{constructor(e=null,t=1,i=1,s,r,o,a,c,l=Ct,h=Ct,u,f){super(null,o,a,c,l,h,s,r,u,f),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ra extends Ft{constructor(e,t,i,s=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const an=new Ze,Go=new Ze,ds=[],Ho=new Ti,Fh=new Ze,En=new Kt,Tn=new Ai;class Oh extends Kt{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Ra(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,Fh)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Ti),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,an),Ho.copy(e.boundingBox).applyMatrix4(an),this.boundingBox.union(Ho)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ai),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,an),Tn.copy(e.boundingSphere).applyMatrix4(an),this.boundingSphere.union(Tn)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const i=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=i.length+1,o=e*r+1;for(let a=0;a<i.length;a++)i[a]=s[o+a]}raycast(e,t){const i=this.matrixWorld,s=this.count;if(En.geometry=this.geometry,En.material=this.material,En.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Tn.copy(this.boundingSphere),Tn.applyMatrix4(i),e.ray.intersectsSphere(Tn)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,an),Go.multiplyMatrices(i,an),En.matrixWorld=Go,En.raycast(e,ds);for(let o=0,a=ds.length;o<a;o++){const c=ds[o];c.instanceId=r,c.object=this,t.push(c)}ds.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Ra(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const i=t.morphTargetInfluences,s=i.length+1;this.morphTexture===null&&(this.morphTexture=new Za(new Float32Array(s*this.count),s,this.count,Sr,Yt));const r=this.morphTexture.source.data.data;let o=0;for(let l=0;l<i.length;l++)o+=i[l];const a=this.geometry.morphTargetsRelative?1:1-o,c=s*e;r[c]=a,r.set(i,c+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const ca=new F,Bh=new F,zh=new Le;class yi{constructor(e=new F(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const s=ca.subVectors(i,t).cross(Bh.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(ca),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(i,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||zh.getNormalMatrix(e),s=this.coplanarPoint(ca).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Li=new Ai,kh=new Fe(.5,.5),fs=new F;class Ir{constructor(e=new yi,t=new yi,i=new yi,s=new yi,r=new yi,o=new yi){this.planes=[e,t,i,s,r,o]}set(e,t,i,s,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=jt,i=!1){const s=this.planes,r=e.elements,o=r[0],a=r[1],c=r[2],l=r[3],h=r[4],u=r[5],f=r[6],p=r[7],v=r[8],b=r[9],m=r[10],d=r[11],w=r[12],S=r[13],E=r[14],P=r[15];if(s[0].setComponents(l-o,p-h,d-v,P-w).normalize(),s[1].setComponents(l+o,p+h,d+v,P+w).normalize(),s[2].setComponents(l+a,p+u,d+b,P+S).normalize(),s[3].setComponents(l-a,p-u,d-b,P-S).normalize(),i)s[4].setComponents(c,f,m,E).normalize(),s[5].setComponents(l-c,p-f,d-m,P-E).normalize();else if(s[4].setComponents(l-c,p-f,d-m,P-E).normalize(),t===jt)s[5].setComponents(l+c,p+f,d+m,P+E).normalize();else if(t===kn)s[5].setComponents(c,f,m,E).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Li.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Li.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Li)}intersectsSprite(e){Li.center.set(0,0,0);const t=kh.distanceTo(e.center);return Li.radius=.7071067811865476+t,Li.applyMatrix4(e.matrixWorld),this.intersectsSphere(Li)}intersectsSphere(e){const t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const s=t[i];if(fs.x=s.normal.x>0?e.max.x:e.min.x,fs.y=s.normal.y>0?e.max.y:e.min.y,fs.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(fs)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class wl extends fi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ue(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const pr=new F,mr=new F,Wo=new Ze,An=new Hn,ps=new Ai,la=new F,qo=new F;class Vh extends dt{constructor(e=new xt,t=new wl){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let s=1,r=t.count;s<r;s++)pr.fromBufferAttribute(t,s-1),mr.fromBufferAttribute(t,s),i[s]=i[s-1],i[s]+=pr.distanceTo(mr);e.setAttribute("lineDistance",new $e(i,1))}else Pe("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),ps.copy(i.boundingSphere),ps.applyMatrix4(s),ps.radius+=r,e.ray.intersectsSphere(ps)===!1)return;Wo.copy(s).invert(),An.copy(e.ray).applyMatrix4(Wo);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,h=i.index,f=i.attributes.position;if(h!==null){const p=Math.max(0,o.start),v=Math.min(h.count,o.start+o.count);for(let b=p,m=v-1;b<m;b+=l){const d=h.getX(b),w=h.getX(b+1),S=ms(this,e,An,c,d,w,b);S&&t.push(S)}if(this.isLineLoop){const b=h.getX(v-1),m=h.getX(p),d=ms(this,e,An,c,b,m,v-1);d&&t.push(d)}}else{const p=Math.max(0,o.start),v=Math.min(f.count,o.start+o.count);for(let b=p,m=v-1;b<m;b+=l){const d=ms(this,e,An,c,b,b+1,b);d&&t.push(d)}if(this.isLineLoop){const b=ms(this,e,An,c,v-1,p,v-1);b&&t.push(b)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function ms(n,e,t,i,s,r,o){const a=n.geometry.attributes.position;if(pr.fromBufferAttribute(a,s),mr.fromBufferAttribute(a,r),t.distanceSqToSegment(pr,mr,la,qo)>i)return;la.applyMatrix4(n.matrixWorld);const l=e.ray.origin.distanceTo(la);if(!(l<e.near||l>e.far))return{distance:l,point:qo.clone().applyMatrix4(n.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:n}}class El extends fi{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ue(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Xo=new Ze,Ca=new Hn,xs=new Ai,gs=new F;class Gh extends dt{constructor(e=new xt,t=new El){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),xs.copy(i.boundingSphere),xs.applyMatrix4(s),xs.radius+=r,e.ray.intersectsSphere(xs)===!1)return;Xo.copy(s).invert(),Ca.copy(e.ray).applyMatrix4(Xo);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=i.index,u=i.attributes.position;if(l!==null){const f=Math.max(0,o.start),p=Math.min(l.count,o.start+o.count);for(let v=f,b=p;v<b;v++){const m=l.getX(v);gs.fromBufferAttribute(u,m),Yo(gs,m,c,s,e,t,this)}}else{const f=Math.max(0,o.start),p=Math.min(u.count,o.start+o.count);for(let v=f,b=p;v<b;v++)gs.fromBufferAttribute(u,v),Yo(gs,v,c,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Yo(n,e,t,i,s,r,o){const a=Ca.distanceSqToPoint(n);if(a<t){const c=new F;Ca.closestPointToPoint(n,c),c.applyMatrix4(i);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class Hh extends vt{constructor(e,t,i,s,r,o,a,c,l){super(e,t,i,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Qa extends vt{constructor(e,t,i=wi,s,r,o,a=Ct,c=Ct,l,h=un,u=1){if(h!==un&&h!==dn)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:e,height:t,depth:u};super(f,s,r,o,a,c,h,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Cr(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class eo extends vt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class to extends xt{constructor(e=1,t=1,i=4,s=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:i,radialSegments:s,heightSegments:r},t=Math.max(0,t),i=Math.max(1,Math.floor(i)),s=Math.max(3,Math.floor(s)),r=Math.max(1,Math.floor(r));const o=[],a=[],c=[],l=[],h=t/2,u=Math.PI/2*e,f=t,p=2*u+f,v=i*2+r,b=s+1,m=new F,d=new F;for(let w=0;w<=v;w++){let S=0,E=0,P=0,g=0;if(w<=i){const x=w/i,_=x*Math.PI/2;E=-h-e*Math.cos(_),P=e*Math.sin(_),g=-e*Math.cos(_),S=x*u}else if(w<=i+r){const x=(w-i)/r;E=-h+x*t,P=e,g=0,S=u+x*f}else{const x=(w-i-r)/i,_=x*Math.PI/2;E=h+e*Math.sin(_),P=e*Math.cos(_),g=e*Math.sin(_),S=u+f+x*u}const T=Math.max(0,Math.min(1,S/p));let C=0;w===0?C=.5/s:w===v&&(C=-.5/s);for(let x=0;x<=s;x++){const _=x/s,A=_*Math.PI*2,D=Math.sin(A),I=Math.cos(A);d.x=-P*I,d.y=E,d.z=P*D,a.push(d.x,d.y,d.z),m.set(-P*I,g,P*D),m.normalize(),c.push(m.x,m.y,m.z),l.push(_+C,T)}if(w>0){const x=(w-1)*b;for(let _=0;_<s;_++){const A=x+_,D=x+_+1,I=w*b+_,B=w*b+_+1;o.push(A,D,I),o.push(D,B,I)}}}this.setIndex(o),this.setAttribute("position",new $e(a,3)),this.setAttribute("normal",new $e(c,3)),this.setAttribute("uv",new $e(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new to(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}}class io extends xt{constructor(e=1,t=32,i=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:s},t=Math.max(3,t);const r=[],o=[],a=[],c=[],l=new F,h=new Fe;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let u=0,f=3;u<=t;u++,f+=3){const p=i+u/t*s;l.x=e*Math.cos(p),l.y=e*Math.sin(p),o.push(l.x,l.y,l.z),a.push(0,0,1),h.x=(o[f]/e+1)/2,h.y=(o[f+1]/e+1)/2,c.push(h.x,h.y)}for(let u=1;u<=t;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new $e(o,3)),this.setAttribute("normal",new $e(a,3)),this.setAttribute("uv",new $e(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new io(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Dr extends xt{constructor(e=1,t=1,i=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const h=[],u=[],f=[],p=[];let v=0;const b=[],m=i/2;let d=0;w(),o===!1&&(e>0&&S(!0),t>0&&S(!1)),this.setIndex(h),this.setAttribute("position",new $e(u,3)),this.setAttribute("normal",new $e(f,3)),this.setAttribute("uv",new $e(p,2));function w(){const E=new F,P=new F;let g=0;const T=(t-e)/i;for(let C=0;C<=r;C++){const x=[],_=C/r,A=_*(t-e)+e;for(let D=0;D<=s;D++){const I=D/s,B=I*c+a,G=Math.sin(B),H=Math.cos(B);P.x=A*G,P.y=-_*i+m,P.z=A*H,u.push(P.x,P.y,P.z),E.set(G,T,H).normalize(),f.push(E.x,E.y,E.z),p.push(I,1-_),x.push(v++)}b.push(x)}for(let C=0;C<s;C++)for(let x=0;x<r;x++){const _=b[x][C],A=b[x+1][C],D=b[x+1][C+1],I=b[x][C+1];(e>0||x!==0)&&(h.push(_,A,I),g+=3),(t>0||x!==r-1)&&(h.push(A,D,I),g+=3)}l.addGroup(d,g,0),d+=g}function S(E){const P=v,g=new Fe,T=new F;let C=0;const x=E===!0?e:t,_=E===!0?1:-1;for(let D=1;D<=s;D++)u.push(0,m*_,0),f.push(0,_,0),p.push(.5,.5),v++;const A=v;for(let D=0;D<=s;D++){const B=D/s*c+a,G=Math.cos(B),H=Math.sin(B);T.x=x*H,T.y=m*_,T.z=x*G,u.push(T.x,T.y,T.z),f.push(0,_,0),g.x=G*.5+.5,g.y=H*.5*_+.5,p.push(g.x,g.y),v++}for(let D=0;D<s;D++){const I=P+D,B=A+D;E===!0?h.push(B,B+1,I):h.push(B+1,B,I),C+=3}l.addGroup(d,C,E===!0?1:2),d+=C}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Dr(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class no extends Dr{constructor(e=1,t=1,i=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,i,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new no(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Wn extends xt{constructor(e=[],t=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:s};const r=[],o=[];a(s),l(i),h(),this.setAttribute("position",new $e(r,3)),this.setAttribute("normal",new $e(r.slice(),3)),this.setAttribute("uv",new $e(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(w){const S=new F,E=new F,P=new F;for(let g=0;g<t.length;g+=3)p(t[g+0],S),p(t[g+1],E),p(t[g+2],P),c(S,E,P,w)}function c(w,S,E,P){const g=P+1,T=[];for(let C=0;C<=g;C++){T[C]=[];const x=w.clone().lerp(E,C/g),_=S.clone().lerp(E,C/g),A=g-C;for(let D=0;D<=A;D++)D===0&&C===g?T[C][D]=x:T[C][D]=x.clone().lerp(_,D/A)}for(let C=0;C<g;C++)for(let x=0;x<2*(g-C)-1;x++){const _=Math.floor(x/2);x%2===0?(f(T[C][_+1]),f(T[C+1][_]),f(T[C][_])):(f(T[C][_+1]),f(T[C+1][_+1]),f(T[C+1][_]))}}function l(w){const S=new F;for(let E=0;E<r.length;E+=3)S.x=r[E+0],S.y=r[E+1],S.z=r[E+2],S.normalize().multiplyScalar(w),r[E+0]=S.x,r[E+1]=S.y,r[E+2]=S.z}function h(){const w=new F;for(let S=0;S<r.length;S+=3){w.x=r[S+0],w.y=r[S+1],w.z=r[S+2];const E=m(w)/2/Math.PI+.5,P=d(w)/Math.PI+.5;o.push(E,1-P)}v(),u()}function u(){for(let w=0;w<o.length;w+=6){const S=o[w+0],E=o[w+2],P=o[w+4],g=Math.max(S,E,P),T=Math.min(S,E,P);g>.9&&T<.1&&(S<.2&&(o[w+0]+=1),E<.2&&(o[w+2]+=1),P<.2&&(o[w+4]+=1))}}function f(w){r.push(w.x,w.y,w.z)}function p(w,S){const E=w*3;S.x=e[E+0],S.y=e[E+1],S.z=e[E+2]}function v(){const w=new F,S=new F,E=new F,P=new F,g=new Fe,T=new Fe,C=new Fe;for(let x=0,_=0;x<r.length;x+=9,_+=6){w.set(r[x+0],r[x+1],r[x+2]),S.set(r[x+3],r[x+4],r[x+5]),E.set(r[x+6],r[x+7],r[x+8]),g.set(o[_+0],o[_+1]),T.set(o[_+2],o[_+3]),C.set(o[_+4],o[_+5]),P.copy(w).add(S).add(E).divideScalar(3);const A=m(P);b(g,_+0,w,A),b(T,_+2,S,A),b(C,_+4,E,A)}}function b(w,S,E,P){P<0&&w.x===1&&(o[S]=w.x-1),E.x===0&&E.z===0&&(o[S]=P/2/Math.PI+.5)}function m(w){return Math.atan2(w.z,-w.x)}function d(w){return Math.atan2(-w.y,Math.sqrt(w.x*w.x+w.z*w.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Wn(e.vertices,e.indices,e.radius,e.details)}}class so extends Wn{constructor(e=1,t=0){const i=(1+Math.sqrt(5))/2,s=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new so(e.radius,e.detail)}}class ro extends Wn{constructor(e=1,t=0){const i=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(i,s,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new ro(e.radius,e.detail)}}class qn extends xt{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};const r=e/2,o=t/2,a=Math.floor(i),c=Math.floor(s),l=a+1,h=c+1,u=e/a,f=t/c,p=[],v=[],b=[],m=[];for(let d=0;d<h;d++){const w=d*f-o;for(let S=0;S<l;S++){const E=S*u-r;v.push(E,-w,0),b.push(0,0,1),m.push(S/a),m.push(1-d/c)}}for(let d=0;d<c;d++)for(let w=0;w<a;w++){const S=w+l*d,E=w+l*(d+1),P=w+1+l*(d+1),g=w+1+l*d;p.push(S,E,g),p.push(E,P,g)}this.setIndex(p),this.setAttribute("position",new $e(v,3)),this.setAttribute("normal",new $e(b,3)),this.setAttribute("uv",new $e(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new qn(e.width,e.height,e.widthSegments,e.heightSegments)}}class ao extends xt{constructor(e=.5,t=1,i=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:s,thetaStart:r,thetaLength:o},i=Math.max(3,i),s=Math.max(1,s);const a=[],c=[],l=[],h=[];let u=e;const f=(t-e)/s,p=new F,v=new Fe;for(let b=0;b<=s;b++){for(let m=0;m<=i;m++){const d=r+m/i*o;p.x=u*Math.cos(d),p.y=u*Math.sin(d),c.push(p.x,p.y,p.z),l.push(0,0,1),v.x=(p.x/t+1)/2,v.y=(p.y/t+1)/2,h.push(v.x,v.y)}u+=f}for(let b=0;b<s;b++){const m=b*(i+1);for(let d=0;d<i;d++){const w=d+m,S=w,E=w+i+1,P=w+i+2,g=w+1;a.push(S,E,g),a.push(E,P,g)}}this.setIndex(a),this.setAttribute("position",new $e(c,3)),this.setAttribute("normal",new $e(l,3)),this.setAttribute("uv",new $e(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ao(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class oo extends xt{constructor(e=1,t=32,i=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const c=Math.min(o+a,Math.PI);let l=0;const h=[],u=new F,f=new F,p=[],v=[],b=[],m=[];for(let d=0;d<=i;d++){const w=[],S=d/i;let E=0;d===0&&o===0?E=.5/t:d===i&&c===Math.PI&&(E=-.5/t);for(let P=0;P<=t;P++){const g=P/t;u.x=-e*Math.cos(s+g*r)*Math.sin(o+S*a),u.y=e*Math.cos(o+S*a),u.z=e*Math.sin(s+g*r)*Math.sin(o+S*a),v.push(u.x,u.y,u.z),f.copy(u).normalize(),b.push(f.x,f.y,f.z),m.push(g+E,1-S),w.push(l++)}h.push(w)}for(let d=0;d<i;d++)for(let w=0;w<t;w++){const S=h[d][w+1],E=h[d][w],P=h[d+1][w],g=h[d+1][w+1];(d!==0||o>0)&&p.push(S,E,g),(d!==i-1||c<Math.PI)&&p.push(E,P,g)}this.setIndex(p),this.setAttribute("position",new $e(v,3)),this.setAttribute("normal",new $e(b,3)),this.setAttribute("uv",new $e(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new oo(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class co extends xt{constructor(e=1,t=.4,i=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:s,arc:r},i=Math.floor(i),s=Math.floor(s);const o=[],a=[],c=[],l=[],h=new F,u=new F,f=new F;for(let p=0;p<=i;p++)for(let v=0;v<=s;v++){const b=v/s*r,m=p/i*Math.PI*2;u.x=(e+t*Math.cos(m))*Math.cos(b),u.y=(e+t*Math.cos(m))*Math.sin(b),u.z=t*Math.sin(m),a.push(u.x,u.y,u.z),h.x=e*Math.cos(b),h.y=e*Math.sin(b),f.subVectors(u,h).normalize(),c.push(f.x,f.y,f.z),l.push(v/s),l.push(p/i)}for(let p=1;p<=i;p++)for(let v=1;v<=s;v++){const b=(s+1)*p+v-1,m=(s+1)*(p-1)+v-1,d=(s+1)*(p-1)+v,w=(s+1)*p+v;o.push(b,m,w),o.push(m,d,w)}this.setIndex(o),this.setAttribute("position",new $e(a,3)),this.setAttribute("normal",new $e(c,3)),this.setAttribute("uv",new $e(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new co(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Tl extends fi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ue(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ue(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Rr,this.normalScale=new Fe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Vt,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Wh extends Tl{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Fe(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return He(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ue(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ue(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ue(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class qh extends fi{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Ue(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ue(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Rr,this.normalScale=new Fe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Vt,this.combine=vr,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Al extends fi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=sl,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Rl extends fi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Xn extends dt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ue(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class Xh extends Xn{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(dt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ue(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const ha=new Ze,jo=new F,$o=new F;class lo{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Fe(512,512),this.mapType=$t,this.map=null,this.mapPass=null,this.matrix=new Ze,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ir,this._frameExtents=new Fe(1,1),this._viewportCount=1,this._viewports=[new Je(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;jo.setFromMatrixPosition(e.matrixWorld),t.position.copy(jo),$o.setFromMatrixPosition(e.target.matrixWorld),t.lookAt($o),t.updateMatrixWorld(),ha.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ha,t.coordinateSystem,t.reversedDepth),t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(ha)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class Yh extends lo{constructor(){super(new Rt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,i=fr*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(i!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=i,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class jh extends Xn{constructor(e,t,i=0,s=Math.PI/3,r=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(dt.DEFAULT_UP),this.updateMatrix(),this.target=new dt,this.distance=i,this.angle=s,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new Yh}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const Ko=new Ze,Rn=new F,ua=new F;class $h extends lo{constructor(){super(new Rt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Fe(4,2),this._viewportCount=6,this._viewports=[new Je(2,1,1,1),new Je(0,1,1,1),new Je(3,1,1,1),new Je(1,1,1,1),new Je(3,0,1,1),new Je(1,0,1,1)],this._cubeDirections=[new F(1,0,0),new F(-1,0,0),new F(0,0,1),new F(0,0,-1),new F(0,1,0),new F(0,-1,0)],this._cubeUps=[new F(0,1,0),new F(0,1,0),new F(0,1,0),new F(0,1,0),new F(0,0,1),new F(0,0,-1)]}updateMatrices(e,t=0){const i=this.camera,s=this.matrix,r=e.distance||i.far;r!==i.far&&(i.far=r,i.updateProjectionMatrix()),Rn.setFromMatrixPosition(e.matrixWorld),i.position.copy(Rn),ua.copy(i.position),ua.add(this._cubeDirections[t]),i.up.copy(this._cubeUps[t]),i.lookAt(ua),i.updateMatrixWorld(),s.makeTranslation(-Rn.x,-Rn.y,-Rn.z),Ko.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ko,i.coordinateSystem,i.reversedDepth)}}class Kh extends Xn{constructor(e,t,i=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new $h}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class ho extends ja{constructor(e=-1,t=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-e,o=i+e,a=s+t,c=s-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Jh extends lo{constructor(){super(new ho(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Zh extends Xn{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(dt.DEFAULT_UP),this.updateMatrix(),this.target=new dt,this.shadow=new Jh}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Cl extends Rt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const Jo=new Ze;class Qh{constructor(e,t,i=0,s=1/0){this.ray=new Hn(e,t),this.near=i,this.far=s,this.camera=null,this.layers=new Pr,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):lt("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Jo.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Jo),this}intersectObject(e,t=!0,i=[]){return Pa(e,this,i,t),i.sort(Zo),i}intersectObjects(e,t=!0,i=[]){for(let s=0,r=e.length;s<r;s++)Pa(e[s],this,i,t);return i.sort(Zo),i}}function Zo(n,e){return n.distance-e.distance}function Pa(n,e,t,i){let s=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(s=!1),s===!0&&i===!0){const r=n.children;for(let o=0,a=r.length;o<a;o++)Pa(r[o],e,t,!0)}}function Qo(n,e,t,i){const s=eu(i);switch(t){case Va:return n*e;case Sr:return n*e/s.components*s.byteLength;case wr:return n*e/s.components*s.byteLength;case Er:return n*e*2/s.components*s.byteLength;case Tr:return n*e*2/s.components*s.byteLength;case Ga:return n*e*3/s.components*s.byteLength;case kt:return n*e*4/s.components*s.byteLength;case Ar:return n*e*4/s.components*s.byteLength;case Nn:case Fn:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case On:case Bn:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case zs:case Vs:return Math.max(n,16)*Math.max(e,8)/4;case Bs:case ks:return Math.max(n,8)*Math.max(e,8)/2;case Gs:case Hs:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Ws:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case qs:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Xs:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Ys:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case js:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case $s:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Ks:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Js:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Zs:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Qs:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case er:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case tr:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case ir:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case nr:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case sr:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case rr:case ar:case or:return Math.ceil(n/4)*Math.ceil(e/4)*16;case cr:case lr:return Math.ceil(n/4)*Math.ceil(e/4)*8;case hr:case ur:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function eu(n){switch(n){case $t:case Oa:return{byteLength:1,components:1};case ln:case Ba:case Hi:return{byteLength:2,components:1};case br:case Mr:return{byteLength:2,components:4};case wi:case yr:case Yt:return{byteLength:4,components:1};case za:case ka:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:_r}}));typeof window<"u"&&(window.__THREE__?Pe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=_r);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Pl(){let n=null,e=!1,t=null,i=null;function s(r,o){t(r,o),i=n.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function tu(n){const e=new WeakMap;function t(a,c){const l=a.array,h=a.usage,u=l.byteLength,f=n.createBuffer();n.bindBuffer(c,f),n.bufferData(c,l,h),a.onUploadCallback();let p;if(l instanceof Float32Array)p=n.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)p=n.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=n.SHORT;else if(l instanceof Uint32Array)p=n.UNSIGNED_INT;else if(l instanceof Int32Array)p=n.INT;else if(l instanceof Int8Array)p=n.BYTE;else if(l instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u}}function i(a,c,l){const h=c.array,u=c.updateRanges;if(n.bindBuffer(l,a),u.length===0)n.bufferSubData(l,0,h);else{u.sort((p,v)=>p.start-v.start);let f=0;for(let p=1;p<u.length;p++){const v=u[f],b=u[p];b.start<=v.start+v.count+1?v.count=Math.max(v.count,b.start+b.count-v.start):(++f,u[f]=b)}u.length=f+1;for(let p=0,v=u.length;p<v;p++){const b=u[p];n.bufferSubData(l,b.start*h.BYTES_PER_ELEMENT,h,b.start,b.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=e.get(a);c&&(n.deleteBuffer(c.buffer),e.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=e.get(a);if(l===void 0)e.set(a,t(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var iu=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,nu=`#ifdef USE_ALPHAHASH
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
#endif`,su=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,ru=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,au=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,ou=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,cu=`#ifdef USE_AOMAP
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
#endif`,lu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,hu=`#ifdef USE_BATCHING
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
#endif`,uu=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,du=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,fu=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,pu=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,mu=`#ifdef USE_IRIDESCENCE
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
#endif`,xu=`#ifdef USE_BUMPMAP
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
#endif`,gu=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,_u=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,vu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,yu=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,bu=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Mu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Su=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,wu=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Eu=`#define PI 3.141592653589793
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
} // validated`,Tu=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Au=`vec3 transformedNormal = objectNormal;
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
#endif`,Ru=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Cu=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Pu=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Iu=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Du="gl_FragColor = linearToOutputTexel( gl_FragColor );",Lu=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Uu=`#ifdef USE_ENVMAP
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
#endif`,Nu=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Fu=`#ifdef USE_ENVMAP
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
#endif`,Ou=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Bu=`#ifdef USE_ENVMAP
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
#endif`,zu=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ku=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Vu=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Gu=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Hu=`#ifdef USE_GRADIENTMAP
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
}`,Wu=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,qu=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Xu=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Yu=`uniform bool receiveShadow;
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
#endif`,ju=`#ifdef USE_ENVMAP
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
#endif`,$u=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Ku=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Ju=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Zu=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Qu=`PhysicalMaterial material;
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
#endif`,ed=`uniform sampler2D dfgLUT;
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
}`,td=`
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
#endif`,id=`#if defined( RE_IndirectDiffuse )
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
#endif`,nd=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,sd=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,rd=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ad=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,od=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,cd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,ld=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,hd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,ud=`#if defined( USE_POINTS_UV )
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
#endif`,dd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,fd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,pd=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,md=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,xd=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,gd=`#ifdef USE_MORPHTARGETS
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
#endif`,_d=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,vd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,yd=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,bd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Md=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Sd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,wd=`#ifdef USE_NORMALMAP
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
#endif`,Ed=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Td=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Ad=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Rd=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Cd=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Pd=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Id=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Dd=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Ld=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Ud=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Nd=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Fd=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Od=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Bd=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,zd=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,kd=`float getShadowMask() {
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
}`,Vd=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Gd=`#ifdef USE_SKINNING
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
#endif`,Hd=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Wd=`#ifdef USE_SKINNING
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
#endif`,qd=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Xd=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Yd=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,jd=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,$d=`#ifdef USE_TRANSMISSION
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
#endif`,Kd=`#ifdef USE_TRANSMISSION
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
#endif`,Jd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Zd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Qd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ef=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const tf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,nf=`uniform sampler2D t2D;
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
}`,sf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,rf=`#ifdef ENVMAP_TYPE_CUBE
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
}`,af=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,of=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cf=`#include <common>
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
}`,lf=`#if DEPTH_PACKING == 3200
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
}`,hf=`#define DISTANCE
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
}`,uf=`#define DISTANCE
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
}`,df=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,ff=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,pf=`uniform float scale;
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
}`,mf=`uniform vec3 diffuse;
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
}`,xf=`#include <common>
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
}`,gf=`uniform vec3 diffuse;
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
}`,_f=`#define LAMBERT
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
}`,vf=`#define LAMBERT
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
}`,yf=`#define MATCAP
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
}`,bf=`#define MATCAP
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
}`,Mf=`#define NORMAL
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
}`,Sf=`#define NORMAL
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
}`,wf=`#define PHONG
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
}`,Ef=`#define PHONG
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
}`,Tf=`#define STANDARD
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
}`,Af=`#define STANDARD
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
}`,Rf=`#define TOON
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
}`,Cf=`#define TOON
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
}`,Pf=`uniform float size;
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
}`,If=`uniform vec3 diffuse;
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
}`,Df=`#include <common>
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
}`,Lf=`uniform vec3 color;
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
}`,Uf=`uniform float rotation;
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
}`,Nf=`uniform vec3 diffuse;
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
}`,Ne={alphahash_fragment:iu,alphahash_pars_fragment:nu,alphamap_fragment:su,alphamap_pars_fragment:ru,alphatest_fragment:au,alphatest_pars_fragment:ou,aomap_fragment:cu,aomap_pars_fragment:lu,batching_pars_vertex:hu,batching_vertex:uu,begin_vertex:du,beginnormal_vertex:fu,bsdfs:pu,iridescence_fragment:mu,bumpmap_pars_fragment:xu,clipping_planes_fragment:gu,clipping_planes_pars_fragment:_u,clipping_planes_pars_vertex:vu,clipping_planes_vertex:yu,color_fragment:bu,color_pars_fragment:Mu,color_pars_vertex:Su,color_vertex:wu,common:Eu,cube_uv_reflection_fragment:Tu,defaultnormal_vertex:Au,displacementmap_pars_vertex:Ru,displacementmap_vertex:Cu,emissivemap_fragment:Pu,emissivemap_pars_fragment:Iu,colorspace_fragment:Du,colorspace_pars_fragment:Lu,envmap_fragment:Uu,envmap_common_pars_fragment:Nu,envmap_pars_fragment:Fu,envmap_pars_vertex:Ou,envmap_physical_pars_fragment:ju,envmap_vertex:Bu,fog_vertex:zu,fog_pars_vertex:ku,fog_fragment:Vu,fog_pars_fragment:Gu,gradientmap_pars_fragment:Hu,lightmap_pars_fragment:Wu,lights_lambert_fragment:qu,lights_lambert_pars_fragment:Xu,lights_pars_begin:Yu,lights_toon_fragment:$u,lights_toon_pars_fragment:Ku,lights_phong_fragment:Ju,lights_phong_pars_fragment:Zu,lights_physical_fragment:Qu,lights_physical_pars_fragment:ed,lights_fragment_begin:td,lights_fragment_maps:id,lights_fragment_end:nd,logdepthbuf_fragment:sd,logdepthbuf_pars_fragment:rd,logdepthbuf_pars_vertex:ad,logdepthbuf_vertex:od,map_fragment:cd,map_pars_fragment:ld,map_particle_fragment:hd,map_particle_pars_fragment:ud,metalnessmap_fragment:dd,metalnessmap_pars_fragment:fd,morphinstance_vertex:pd,morphcolor_vertex:md,morphnormal_vertex:xd,morphtarget_pars_vertex:gd,morphtarget_vertex:_d,normal_fragment_begin:vd,normal_fragment_maps:yd,normal_pars_fragment:bd,normal_pars_vertex:Md,normal_vertex:Sd,normalmap_pars_fragment:wd,clearcoat_normal_fragment_begin:Ed,clearcoat_normal_fragment_maps:Td,clearcoat_pars_fragment:Ad,iridescence_pars_fragment:Rd,opaque_fragment:Cd,packing:Pd,premultiplied_alpha_fragment:Id,project_vertex:Dd,dithering_fragment:Ld,dithering_pars_fragment:Ud,roughnessmap_fragment:Nd,roughnessmap_pars_fragment:Fd,shadowmap_pars_fragment:Od,shadowmap_pars_vertex:Bd,shadowmap_vertex:zd,shadowmask_pars_fragment:kd,skinbase_vertex:Vd,skinning_pars_vertex:Gd,skinning_vertex:Hd,skinnormal_vertex:Wd,specularmap_fragment:qd,specularmap_pars_fragment:Xd,tonemapping_fragment:Yd,tonemapping_pars_fragment:jd,transmission_fragment:$d,transmission_pars_fragment:Kd,uv_pars_fragment:Jd,uv_pars_vertex:Zd,uv_vertex:Qd,worldpos_vertex:ef,background_vert:tf,background_frag:nf,backgroundCube_vert:sf,backgroundCube_frag:rf,cube_vert:af,cube_frag:of,depth_vert:cf,depth_frag:lf,distanceRGBA_vert:hf,distanceRGBA_frag:uf,equirect_vert:df,equirect_frag:ff,linedashed_vert:pf,linedashed_frag:mf,meshbasic_vert:xf,meshbasic_frag:gf,meshlambert_vert:_f,meshlambert_frag:vf,meshmatcap_vert:yf,meshmatcap_frag:bf,meshnormal_vert:Mf,meshnormal_frag:Sf,meshphong_vert:wf,meshphong_frag:Ef,meshphysical_vert:Tf,meshphysical_frag:Af,meshtoon_vert:Rf,meshtoon_frag:Cf,points_vert:Pf,points_frag:If,shadow_vert:Df,shadow_frag:Lf,sprite_vert:Uf,sprite_frag:Nf},ae={common:{diffuse:{value:new Ue(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Le},alphaMap:{value:null},alphaMapTransform:{value:new Le},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Le}},envmap:{envMap:{value:null},envMapRotation:{value:new Le},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Le}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Le}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Le},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Le},normalScale:{value:new Fe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Le},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Le}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Le}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Le}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ue(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ue(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Le},alphaTest:{value:0},uvTransform:{value:new Le}},sprite:{diffuse:{value:new Ue(16777215)},opacity:{value:1},center:{value:new Fe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Le},alphaMap:{value:null},alphaMapTransform:{value:new Le},alphaTest:{value:0}}},Xt={basic:{uniforms:St([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.fog]),vertexShader:Ne.meshbasic_vert,fragmentShader:Ne.meshbasic_frag},lambert:{uniforms:St([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,ae.lights,{emissive:{value:new Ue(0)}}]),vertexShader:Ne.meshlambert_vert,fragmentShader:Ne.meshlambert_frag},phong:{uniforms:St([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,ae.lights,{emissive:{value:new Ue(0)},specular:{value:new Ue(1118481)},shininess:{value:30}}]),vertexShader:Ne.meshphong_vert,fragmentShader:Ne.meshphong_frag},standard:{uniforms:St([ae.common,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.roughnessmap,ae.metalnessmap,ae.fog,ae.lights,{emissive:{value:new Ue(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ne.meshphysical_vert,fragmentShader:Ne.meshphysical_frag},toon:{uniforms:St([ae.common,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.gradientmap,ae.fog,ae.lights,{emissive:{value:new Ue(0)}}]),vertexShader:Ne.meshtoon_vert,fragmentShader:Ne.meshtoon_frag},matcap:{uniforms:St([ae.common,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,{matcap:{value:null}}]),vertexShader:Ne.meshmatcap_vert,fragmentShader:Ne.meshmatcap_frag},points:{uniforms:St([ae.points,ae.fog]),vertexShader:Ne.points_vert,fragmentShader:Ne.points_frag},dashed:{uniforms:St([ae.common,ae.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ne.linedashed_vert,fragmentShader:Ne.linedashed_frag},depth:{uniforms:St([ae.common,ae.displacementmap]),vertexShader:Ne.depth_vert,fragmentShader:Ne.depth_frag},normal:{uniforms:St([ae.common,ae.bumpmap,ae.normalmap,ae.displacementmap,{opacity:{value:1}}]),vertexShader:Ne.meshnormal_vert,fragmentShader:Ne.meshnormal_frag},sprite:{uniforms:St([ae.sprite,ae.fog]),vertexShader:Ne.sprite_vert,fragmentShader:Ne.sprite_frag},background:{uniforms:{uvTransform:{value:new Le},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ne.background_vert,fragmentShader:Ne.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Le}},vertexShader:Ne.backgroundCube_vert,fragmentShader:Ne.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ne.cube_vert,fragmentShader:Ne.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ne.equirect_vert,fragmentShader:Ne.equirect_frag},distanceRGBA:{uniforms:St([ae.common,ae.displacementmap,{referencePosition:{value:new F},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ne.distanceRGBA_vert,fragmentShader:Ne.distanceRGBA_frag},shadow:{uniforms:St([ae.lights,ae.fog,{color:{value:new Ue(0)},opacity:{value:1}}]),vertexShader:Ne.shadow_vert,fragmentShader:Ne.shadow_frag}};Xt.physical={uniforms:St([Xt.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Le},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Le},clearcoatNormalScale:{value:new Fe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Le},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Le},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Le},sheen:{value:0},sheenColor:{value:new Ue(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Le},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Le},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Le},transmissionSamplerSize:{value:new Fe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Le},attenuationDistance:{value:0},attenuationColor:{value:new Ue(0)},specularColor:{value:new Ue(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Le},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Le},anisotropyVector:{value:new Fe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Le}}]),vertexShader:Ne.meshphysical_vert,fragmentShader:Ne.meshphysical_frag};const _s={r:0,b:0,g:0},Ui=new Vt,Ff=new Ze;function Of(n,e,t,i,s,r,o){const a=new Ue(0);let c=r===!0?0:1,l,h,u=null,f=0,p=null;function v(S){let E=S.isScene===!0?S.background:null;return E&&E.isTexture&&(E=(S.backgroundBlurriness>0?t:e).get(E)),E}function b(S){let E=!1;const P=v(S);P===null?d(a,c):P&&P.isColor&&(d(P,1),E=!0);const g=n.xr.getEnvironmentBlendMode();g==="additive"?i.buffers.color.setClear(0,0,0,1,o):g==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||E)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(S,E){const P=v(E);P&&(P.isCubeTexture||P.mapping===Vn)?(h===void 0&&(h=new Kt(new xn(1,1,1),new ii({name:"BackgroundCubeMaterial",uniforms:pn(Xt.backgroundCube.uniforms),vertexShader:Xt.backgroundCube.vertexShader,fragmentShader:Xt.backgroundCube.fragmentShader,side:wt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(g,T,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),Ui.copy(E.backgroundRotation),Ui.x*=-1,Ui.y*=-1,Ui.z*=-1,P.isCubeTexture&&P.isRenderTargetTexture===!1&&(Ui.y*=-1,Ui.z*=-1),h.material.uniforms.envMap.value=P,h.material.uniforms.flipEnvMap.value=P.isCubeTexture&&P.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Ff.makeRotationFromEuler(Ui)),h.material.toneMapped=We.getTransfer(P.colorSpace)!==Ke,(u!==P||f!==P.version||p!==n.toneMapping)&&(h.material.needsUpdate=!0,u=P,f=P.version,p=n.toneMapping),h.layers.enableAll(),S.unshift(h,h.geometry,h.material,0,0,null)):P&&P.isTexture&&(l===void 0&&(l=new Kt(new qn(2,2),new ii({name:"BackgroundMaterial",uniforms:pn(Xt.background.uniforms),vertexShader:Xt.background.vertexShader,fragmentShader:Xt.background.fragmentShader,side:di,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=P,l.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,l.material.toneMapped=We.getTransfer(P.colorSpace)!==Ke,P.matrixAutoUpdate===!0&&P.updateMatrix(),l.material.uniforms.uvTransform.value.copy(P.matrix),(u!==P||f!==P.version||p!==n.toneMapping)&&(l.material.needsUpdate=!0,u=P,f=P.version,p=n.toneMapping),l.layers.enableAll(),S.unshift(l,l.geometry,l.material,0,0,null))}function d(S,E){S.getRGB(_s,yl(n)),i.buffers.color.setClear(_s.r,_s.g,_s.b,E,o)}function w(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(S,E=1){a.set(S),c=E,d(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(S){c=S,d(a,c)},render:b,addToRenderList:m,dispose:w}}function Bf(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=f(null);let r=s,o=!1;function a(_,A,D,I,B){let G=!1;const H=u(I,D,A);r!==H&&(r=H,l(r.object)),G=p(_,I,D,B),G&&v(_,I,D,B),B!==null&&e.update(B,n.ELEMENT_ARRAY_BUFFER),(G||o)&&(o=!1,E(_,A,D,I),B!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(B).buffer))}function c(){return n.createVertexArray()}function l(_){return n.bindVertexArray(_)}function h(_){return n.deleteVertexArray(_)}function u(_,A,D){const I=D.wireframe===!0;let B=i[_.id];B===void 0&&(B={},i[_.id]=B);let G=B[A.id];G===void 0&&(G={},B[A.id]=G);let H=G[I];return H===void 0&&(H=f(c()),G[I]=H),H}function f(_){const A=[],D=[],I=[];for(let B=0;B<t;B++)A[B]=0,D[B]=0,I[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:A,enabledAttributes:D,attributeDivisors:I,object:_,attributes:{},index:null}}function p(_,A,D,I){const B=r.attributes,G=A.attributes;let H=0;const Q=D.getAttributes();for(const W in Q)if(Q[W].location>=0){const te=B[W];let me=G[W];if(me===void 0&&(W==="instanceMatrix"&&_.instanceMatrix&&(me=_.instanceMatrix),W==="instanceColor"&&_.instanceColor&&(me=_.instanceColor)),te===void 0||te.attribute!==me||me&&te.data!==me.data)return!0;H++}return r.attributesNum!==H||r.index!==I}function v(_,A,D,I){const B={},G=A.attributes;let H=0;const Q=D.getAttributes();for(const W in Q)if(Q[W].location>=0){let te=G[W];te===void 0&&(W==="instanceMatrix"&&_.instanceMatrix&&(te=_.instanceMatrix),W==="instanceColor"&&_.instanceColor&&(te=_.instanceColor));const me={};me.attribute=te,te&&te.data&&(me.data=te.data),B[W]=me,H++}r.attributes=B,r.attributesNum=H,r.index=I}function b(){const _=r.newAttributes;for(let A=0,D=_.length;A<D;A++)_[A]=0}function m(_){d(_,0)}function d(_,A){const D=r.newAttributes,I=r.enabledAttributes,B=r.attributeDivisors;D[_]=1,I[_]===0&&(n.enableVertexAttribArray(_),I[_]=1),B[_]!==A&&(n.vertexAttribDivisor(_,A),B[_]=A)}function w(){const _=r.newAttributes,A=r.enabledAttributes;for(let D=0,I=A.length;D<I;D++)A[D]!==_[D]&&(n.disableVertexAttribArray(D),A[D]=0)}function S(_,A,D,I,B,G,H){H===!0?n.vertexAttribIPointer(_,A,D,B,G):n.vertexAttribPointer(_,A,D,I,B,G)}function E(_,A,D,I){b();const B=I.attributes,G=D.getAttributes(),H=A.defaultAttributeValues;for(const Q in G){const W=G[Q];if(W.location>=0){let Y=B[Q];if(Y===void 0&&(Q==="instanceMatrix"&&_.instanceMatrix&&(Y=_.instanceMatrix),Q==="instanceColor"&&_.instanceColor&&(Y=_.instanceColor)),Y!==void 0){const te=Y.normalized,me=Y.itemSize,Oe=e.get(Y);if(Oe===void 0)continue;const qe=Oe.buffer,je=Oe.type,Ye=Oe.bytesPerElement,j=je===n.INT||je===n.UNSIGNED_INT||Y.gpuType===yr;if(Y.isInterleavedBufferAttribute){const J=Y.data,de=J.stride,De=Y.offset;if(J.isInstancedInterleavedBuffer){for(let ve=0;ve<W.locationSize;ve++)d(W.location+ve,J.meshPerAttribute);_.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let ve=0;ve<W.locationSize;ve++)m(W.location+ve);n.bindBuffer(n.ARRAY_BUFFER,qe);for(let ve=0;ve<W.locationSize;ve++)S(W.location+ve,me/W.locationSize,je,te,de*Ye,(De+me/W.locationSize*ve)*Ye,j)}else{if(Y.isInstancedBufferAttribute){for(let J=0;J<W.locationSize;J++)d(W.location+J,Y.meshPerAttribute);_.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=Y.meshPerAttribute*Y.count)}else for(let J=0;J<W.locationSize;J++)m(W.location+J);n.bindBuffer(n.ARRAY_BUFFER,qe);for(let J=0;J<W.locationSize;J++)S(W.location+J,me/W.locationSize,je,te,me*Ye,me/W.locationSize*J*Ye,j)}}else if(H!==void 0){const te=H[Q];if(te!==void 0)switch(te.length){case 2:n.vertexAttrib2fv(W.location,te);break;case 3:n.vertexAttrib3fv(W.location,te);break;case 4:n.vertexAttrib4fv(W.location,te);break;default:n.vertexAttrib1fv(W.location,te)}}}}w()}function P(){C();for(const _ in i){const A=i[_];for(const D in A){const I=A[D];for(const B in I)h(I[B].object),delete I[B];delete A[D]}delete i[_]}}function g(_){if(i[_.id]===void 0)return;const A=i[_.id];for(const D in A){const I=A[D];for(const B in I)h(I[B].object),delete I[B];delete A[D]}delete i[_.id]}function T(_){for(const A in i){const D=i[A];if(D[_.id]===void 0)continue;const I=D[_.id];for(const B in I)h(I[B].object),delete I[B];delete D[_.id]}}function C(){x(),o=!0,r!==s&&(r=s,l(r.object))}function x(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:C,resetDefaultState:x,dispose:P,releaseStatesOfGeometry:g,releaseStatesOfProgram:T,initAttributes:b,enableAttribute:m,disableUnusedAttributes:w}}function zf(n,e,t){let i;function s(l){i=l}function r(l,h){n.drawArrays(i,l,h),t.update(h,i,1)}function o(l,h,u){u!==0&&(n.drawArraysInstanced(i,l,h,u),t.update(h,i,u))}function a(l,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,h,0,u);let p=0;for(let v=0;v<u;v++)p+=h[v];t.update(p,i,1)}function c(l,h,u,f){if(u===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let v=0;v<l.length;v++)o(l[v],h[v],f[v]);else{p.multiDrawArraysInstancedWEBGL(i,l,0,h,0,f,0,u);let v=0;for(let b=0;b<u;b++)v+=h[b]*f[b];t.update(v,i,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function kf(n,e,t,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const T=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(T){return!(T!==kt&&i.convert(T)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(T){const C=T===Hi&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(T!==$t&&i.convert(T)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==Yt&&!C)}function c(T){if(T==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const h=c(l);h!==l&&(Pe("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const u=t.logarithmicDepthBuffer===!0,f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),b=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),d=n.getParameter(n.MAX_VERTEX_ATTRIBS),w=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),S=n.getParameter(n.MAX_VARYING_VECTORS),E=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),P=v>0,g=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:v,maxTextureSize:b,maxCubemapSize:m,maxAttributes:d,maxVertexUniforms:w,maxVaryings:S,maxFragmentUniforms:E,vertexTextures:P,maxSamples:g}}function Vf(n){const e=this;let t=null,i=0,s=!1,r=!1;const o=new yi,a=new Le,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const p=u.length!==0||f||i!==0||s;return s=f,i=u.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){t=h(u,f,0)},this.setState=function(u,f,p){const v=u.clippingPlanes,b=u.clipIntersection,m=u.clipShadows,d=n.get(u);if(!s||v===null||v.length===0||r&&!m)r?h(null):l();else{const w=r?0:i,S=w*4;let E=d.clippingState||null;c.value=E,E=h(v,f,S,p);for(let P=0;P!==S;++P)E[P]=t[P];d.clippingState=E,this.numIntersection=b?this.numPlanes:0,this.numPlanes+=w}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(u,f,p,v){const b=u!==null?u.length:0;let m=null;if(b!==0){if(m=c.value,v!==!0||m===null){const d=p+b*4,w=f.matrixWorldInverse;a.getNormalMatrix(w),(m===null||m.length<d)&&(m=new Float32Array(d));for(let S=0,E=p;S!==b;++S,E+=4)o.copy(u[S]).applyMatrix4(w,a),o.normal.toArray(m,E),m[E+3]=o.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=b,e.numIntersection=0,m}}function Gf(n){let e=new WeakMap;function t(o,a){return a===Us?o.mapping=ki:a===Ns&&(o.mapping=Vi),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===Us||a===Ns)if(e.has(o)){const c=e.get(o).texture;return t(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new Sl(c.height);return l.fromEquirectangularTexture(n,o),e.set(o,l),o.addEventListener("dispose",s),t(l.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function r(){e=new WeakMap}return{get:i,dispose:r}}const Si=4,ec=[.125,.215,.35,.446,.526,.582],Oi=20,Hf=256,Cn=new ho,tc=new Ue;let da=null,fa=0,pa=0,ma=!1;const Wf=new F;class Ia{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,s=100,r={}){const{size:o=256,position:a=Wf}=r;da=this._renderer.getRenderTarget(),fa=this._renderer.getActiveCubeFace(),pa=this._renderer.getActiveMipmapLevel(),ma=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,i,s,c,a),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=sc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=nc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(da,fa,pa),this._renderer.xr.enabled=ma,e.scissorTest=!1,on(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ki||e.mapping===Vi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),da=this._renderer.getRenderTarget(),fa=this._renderer.getActiveCubeFace(),pa=this._renderer.getActiveMipmapLevel(),ma=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Nt,minFilter:Nt,generateMipmaps:!1,type:Hi,format:kt,colorSpace:Gi,depthBuffer:!1},s=ic(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ic(e,t,i);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=qf(r)),this._blurMaterial=Yf(r,e,t),this._ggxMaterial=Xf(r,e,t)}return s}_compileMaterial(e){const t=new Kt(new xt,e);this._renderer.compile(t,Cn)}_sceneToCubeUV(e,t,i,s,r){const c=new Rt(90,1,t,i),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,p=u.toneMapping;u.getClearColor(tc),u.toneMapping=hi,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Kt(new xn,new qa({name:"PMREM.Background",side:wt,depthWrite:!1,depthTest:!1})));const b=this._backgroundBox,m=b.material;let d=!1;const w=e.background;w?w.isColor&&(m.color.copy(w),e.background=null,d=!0):(m.color.copy(tc),d=!0);for(let S=0;S<6;S++){const E=S%3;E===0?(c.up.set(0,l[S],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+h[S],r.y,r.z)):E===1?(c.up.set(0,0,l[S]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+h[S],r.z)):(c.up.set(0,l[S],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+h[S]));const P=this._cubeSize;on(s,E*P,S>2?P:0,P,P),u.setRenderTarget(s),d&&u.render(b,c),u.render(e,c)}u.toneMapping=p,u.autoClear=f,e.background=w}_textureToCubeUV(e,t){const i=this._renderer,s=e.mapping===ki||e.mapping===Vi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=sc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=nc());const r=s?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=r;const a=r.uniforms;a.envMap.value=e;const c=this._cubeSize;on(t,0,0,3*c,2*c),i.setRenderTarget(t),i.render(o,Cn)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=i}_applyGGXFilter(e,t,i){const s=this._renderer,r=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[i];a.material=o;const c=o.uniforms,l=i/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),u=Math.sqrt(l*l-h*h),f=.05+l*.95,p=u*f,{_lodMax:v}=this,b=this._sizeLods[i],m=3*b*(i>v-Si?i-v+Si:0),d=4*(this._cubeSize-b);c.envMap.value=e.texture,c.roughness.value=p,c.mipInt.value=v-t,on(r,m,d,3*b,2*b),s.setRenderTarget(r),s.render(a,Cn),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=v-i,on(e,m,d,3*b,2*b),s.setRenderTarget(e),s.render(a,Cn)}_blur(e,t,i,s,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,s,"latitudinal",r),this._halfBlur(o,e,i,i,s,"longitudinal",r)}_halfBlur(e,t,i,s,r,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&lt("blur direction must be either latitudinal or longitudinal!");const h=3,u=this._lodMeshes[s];u.material=l;const f=l.uniforms,p=this._sizeLods[i]-1,v=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*Oi-1),b=r/v,m=isFinite(r)?1+Math.floor(h*b):Oi;m>Oi&&Pe(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Oi}`);const d=[];let w=0;for(let T=0;T<Oi;++T){const C=T/b,x=Math.exp(-C*C/2);d.push(x),T===0?w+=x:T<m&&(w+=2*x)}for(let T=0;T<d.length;T++)d[T]=d[T]/w;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=d,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:S}=this;f.dTheta.value=v,f.mipInt.value=S-i;const E=this._sizeLods[s],P=3*E*(s>S-Si?s-S+Si:0),g=4*(this._cubeSize-E);on(t,P,g,3*E,2*E),c.setRenderTarget(t),c.render(u,Cn)}}function qf(n){const e=[],t=[],i=[];let s=n;const r=n-Si+1+ec.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);e.push(a);let c=1/a;o>n-Si?c=ec[o-n+Si-1]:o===0&&(c=0),t.push(c);const l=1/(a-2),h=-l,u=1+l,f=[h,h,u,h,u,u,h,h,u,u,h,u],p=6,v=6,b=3,m=2,d=1,w=new Float32Array(b*v*p),S=new Float32Array(m*v*p),E=new Float32Array(d*v*p);for(let g=0;g<p;g++){const T=g%3*2/3-1,C=g>2?0:-1,x=[T,C,0,T+2/3,C,0,T+2/3,C+1,0,T,C,0,T+2/3,C+1,0,T,C+1,0];w.set(x,b*v*g),S.set(f,m*v*g);const _=[g,g,g,g,g,g];E.set(_,d*v*g)}const P=new xt;P.setAttribute("position",new Ft(w,b)),P.setAttribute("uv",new Ft(S,m)),P.setAttribute("faceIndex",new Ft(E,d)),i.push(new Kt(P,null)),s>Si&&s--}return{lodMeshes:i,sizeLods:e,sigmas:t}}function ic(n,e,t){const i=new Ei(n,e,t);return i.texture.mapping=Vn,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function on(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function Xf(n,e,t){return new ii({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Hf,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Lr(),fragmentShader:`

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
		`,blending:ti,depthTest:!1,depthWrite:!1})}function Yf(n,e,t){const i=new Float32Array(Oi),s=new F(0,1,0);return new ii({name:"SphericalGaussianBlur",defines:{n:Oi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Lr(),fragmentShader:`

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
		`,blending:ti,depthTest:!1,depthWrite:!1})}function nc(){return new ii({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Lr(),fragmentShader:`

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
		`,blending:ti,depthTest:!1,depthWrite:!1})}function sc(){return new ii({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Lr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ti,depthTest:!1,depthWrite:!1})}function Lr(){return`

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
	`}function jf(n){let e=new WeakMap,t=null;function i(a){if(a&&a.isTexture){const c=a.mapping,l=c===Us||c===Ns,h=c===ki||c===Vi;if(l||h){let u=e.get(a);const f=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return t===null&&(t=new Ia(n)),u=l?t.fromEquirectangular(a,u):t.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),u.texture;if(u!==void 0)return u.texture;{const p=a.image;return l&&p&&p.height>0||h&&p&&s(p)?(t===null&&(t=new Ia(n)),u=l?t.fromEquirectangular(a):t.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let c=0;const l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function r(a){const c=a.target;c.removeEventListener("dispose",r);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:o}}function $f(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const s=n.getExtension(i);return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const s=t(i);return s===null&&fn("WebGLRenderer: "+i+" extension not supported."),s}}}function Kf(n,e,t,i){const s={},r=new WeakMap;function o(u){const f=u.target;f.index!==null&&e.remove(f.index);for(const v in f.attributes)e.remove(f.attributes[v]);f.removeEventListener("dispose",o),delete s[f.id];const p=r.get(f);p&&(e.remove(p),r.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(u,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,t.memory.geometries++),f}function c(u){const f=u.attributes;for(const p in f)e.update(f[p],n.ARRAY_BUFFER)}function l(u){const f=[],p=u.index,v=u.attributes.position;let b=0;if(p!==null){const w=p.array;b=p.version;for(let S=0,E=w.length;S<E;S+=3){const P=w[S+0],g=w[S+1],T=w[S+2];f.push(P,g,g,T,T,P)}}else if(v!==void 0){const w=v.array;b=v.version;for(let S=0,E=w.length/3-1;S<E;S+=3){const P=S+0,g=S+1,T=S+2;f.push(P,g,g,T,T,P)}}else return;const m=new(pl(f)?Ya:Xa)(f,1);m.version=b;const d=r.get(u);d&&e.remove(d),r.set(u,m)}function h(u){const f=r.get(u);if(f){const p=u.index;p!==null&&f.version<p.version&&l(u)}else l(u);return r.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function Jf(n,e,t){let i;function s(f){i=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function c(f,p){n.drawElements(i,p,r,f*o),t.update(p,i,1)}function l(f,p,v){v!==0&&(n.drawElementsInstanced(i,p,r,f*o,v),t.update(p,i,v))}function h(f,p,v){if(v===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,r,f,0,v);let m=0;for(let d=0;d<v;d++)m+=p[d];t.update(m,i,1)}function u(f,p,v,b){if(v===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let d=0;d<f.length;d++)l(f[d]/o,p[d],b[d]);else{m.multiDrawElementsInstancedWEBGL(i,p,0,r,f,0,b,0,v);let d=0;for(let w=0;w<v;w++)d+=p[w]*b[w];t.update(d,i,1)}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function Zf(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=a*(r/3);break;case n.LINES:t.lines+=a*(r/2);break;case n.LINE_STRIP:t.lines+=a*(r-1);break;case n.LINE_LOOP:t.lines+=a*r;break;case n.POINTS:t.points+=a*r;break;default:lt("WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function Qf(n,e,t){const i=new WeakMap,s=new Je;function r(o,a,c){const l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let f=i.get(a);if(f===void 0||f.count!==u){let x=function(){T.dispose(),i.delete(a),a.removeEventListener("dispose",x)};f!==void 0&&f.texture.dispose();const p=a.morphAttributes.position!==void 0,v=a.morphAttributes.normal!==void 0,b=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],d=a.morphAttributes.normal||[],w=a.morphAttributes.color||[];let S=0;p===!0&&(S=1),v===!0&&(S=2),b===!0&&(S=3);let E=a.attributes.position.count*S,P=1;E>e.maxTextureSize&&(P=Math.ceil(E/e.maxTextureSize),E=e.maxTextureSize);const g=new Float32Array(E*P*4*u),T=new Wa(g,E,P,u);T.type=Yt,T.needsUpdate=!0;const C=S*4;for(let _=0;_<u;_++){const A=m[_],D=d[_],I=w[_],B=E*P*4*_;for(let G=0;G<A.count;G++){const H=G*C;p===!0&&(s.fromBufferAttribute(A,G),g[B+H+0]=s.x,g[B+H+1]=s.y,g[B+H+2]=s.z,g[B+H+3]=0),v===!0&&(s.fromBufferAttribute(D,G),g[B+H+4]=s.x,g[B+H+5]=s.y,g[B+H+6]=s.z,g[B+H+7]=0),b===!0&&(s.fromBufferAttribute(I,G),g[B+H+8]=s.x,g[B+H+9]=s.y,g[B+H+10]=s.z,g[B+H+11]=I.itemSize===4?s.w:1)}}f={count:u,texture:T,size:new Fe(E,P)},i.set(a,f),a.addEventListener("dispose",x)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",o.morphTexture,t);else{let p=0;for(let b=0;b<l.length;b++)p+=l[b];const v=a.morphTargetsRelative?1:1-p;c.getUniforms().setValue(n,"morphTargetBaseInfluence",v),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",f.texture,t),c.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:r}}function ep(n,e,t,i){let s=new WeakMap;function r(c){const l=i.render.frame,h=c.geometry,u=e.get(c,h);if(s.get(u)!==l&&(e.update(u),s.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const f=c.skeleton;s.get(f)!==l&&(f.update(),s.set(f,l))}return u}function o(){s=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:o}}const Il=new vt,rc=new Qa(1,1),Dl=new Wa,Ll=new _l,Ul=new $a,ac=[],oc=[],cc=new Float32Array(16),lc=new Float32Array(9),hc=new Float32Array(4);function gn(n,e,t){const i=n[0];if(i<=0||i>0)return n;const s=e*t;let r=ac[s];if(r===void 0&&(r=new Float32Array(s),ac[s]=r),e!==0){i.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,n[o].toArray(r,a)}return r}function pt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function mt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Ur(n,e){let t=oc[e];t===void 0&&(t=new Int32Array(e),oc[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function tp(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function ip(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(pt(t,e))return;n.uniform2fv(this.addr,e),mt(t,e)}}function np(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(pt(t,e))return;n.uniform3fv(this.addr,e),mt(t,e)}}function sp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(pt(t,e))return;n.uniform4fv(this.addr,e),mt(t,e)}}function rp(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(pt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),mt(t,e)}else{if(pt(t,i))return;hc.set(i),n.uniformMatrix2fv(this.addr,!1,hc),mt(t,i)}}function ap(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(pt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),mt(t,e)}else{if(pt(t,i))return;lc.set(i),n.uniformMatrix3fv(this.addr,!1,lc),mt(t,i)}}function op(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(pt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),mt(t,e)}else{if(pt(t,i))return;cc.set(i),n.uniformMatrix4fv(this.addr,!1,cc),mt(t,i)}}function cp(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function lp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(pt(t,e))return;n.uniform2iv(this.addr,e),mt(t,e)}}function hp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(pt(t,e))return;n.uniform3iv(this.addr,e),mt(t,e)}}function up(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(pt(t,e))return;n.uniform4iv(this.addr,e),mt(t,e)}}function dp(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function fp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(pt(t,e))return;n.uniform2uiv(this.addr,e),mt(t,e)}}function pp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(pt(t,e))return;n.uniform3uiv(this.addr,e),mt(t,e)}}function mp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(pt(t,e))return;n.uniform4uiv(this.addr,e),mt(t,e)}}function xp(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(rc.compareFunction=Ha,r=rc):r=Il,t.setTexture2D(e||r,s)}function gp(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||Ll,s)}function _p(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||Ul,s)}function vp(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||Dl,s)}function yp(n){switch(n){case 5126:return tp;case 35664:return ip;case 35665:return np;case 35666:return sp;case 35674:return rp;case 35675:return ap;case 35676:return op;case 5124:case 35670:return cp;case 35667:case 35671:return lp;case 35668:case 35672:return hp;case 35669:case 35673:return up;case 5125:return dp;case 36294:return fp;case 36295:return pp;case 36296:return mp;case 35678:case 36198:case 36298:case 36306:case 35682:return xp;case 35679:case 36299:case 36307:return gp;case 35680:case 36300:case 36308:case 36293:return _p;case 36289:case 36303:case 36311:case 36292:return vp}}function bp(n,e){n.uniform1fv(this.addr,e)}function Mp(n,e){const t=gn(e,this.size,2);n.uniform2fv(this.addr,t)}function Sp(n,e){const t=gn(e,this.size,3);n.uniform3fv(this.addr,t)}function wp(n,e){const t=gn(e,this.size,4);n.uniform4fv(this.addr,t)}function Ep(n,e){const t=gn(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function Tp(n,e){const t=gn(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function Ap(n,e){const t=gn(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function Rp(n,e){n.uniform1iv(this.addr,e)}function Cp(n,e){n.uniform2iv(this.addr,e)}function Pp(n,e){n.uniform3iv(this.addr,e)}function Ip(n,e){n.uniform4iv(this.addr,e)}function Dp(n,e){n.uniform1uiv(this.addr,e)}function Lp(n,e){n.uniform2uiv(this.addr,e)}function Up(n,e){n.uniform3uiv(this.addr,e)}function Np(n,e){n.uniform4uiv(this.addr,e)}function Fp(n,e,t){const i=this.cache,s=e.length,r=Ur(t,s);pt(i,r)||(n.uniform1iv(this.addr,r),mt(i,r));for(let o=0;o!==s;++o)t.setTexture2D(e[o]||Il,r[o])}function Op(n,e,t){const i=this.cache,s=e.length,r=Ur(t,s);pt(i,r)||(n.uniform1iv(this.addr,r),mt(i,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||Ll,r[o])}function Bp(n,e,t){const i=this.cache,s=e.length,r=Ur(t,s);pt(i,r)||(n.uniform1iv(this.addr,r),mt(i,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||Ul,r[o])}function zp(n,e,t){const i=this.cache,s=e.length,r=Ur(t,s);pt(i,r)||(n.uniform1iv(this.addr,r),mt(i,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||Dl,r[o])}function kp(n){switch(n){case 5126:return bp;case 35664:return Mp;case 35665:return Sp;case 35666:return wp;case 35674:return Ep;case 35675:return Tp;case 35676:return Ap;case 5124:case 35670:return Rp;case 35667:case 35671:return Cp;case 35668:case 35672:return Pp;case 35669:case 35673:return Ip;case 5125:return Dp;case 36294:return Lp;case 36295:return Up;case 36296:return Np;case 35678:case 36198:case 36298:case 36306:case 35682:return Fp;case 35679:case 36299:case 36307:return Op;case 35680:case 36300:case 36308:case 36293:return Bp;case 36289:case 36303:case 36311:case 36292:return zp}}class Vp{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=yp(t.type)}}class Gp{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=kp(t.type)}}class Hp{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(e,t[a.id],i)}}}const xa=/(\w+)(\])?(\[|\.)?/g;function uc(n,e){n.seq.push(e),n.map[e.id]=e}function Wp(n,e,t){const i=n.name,s=i.length;for(xa.lastIndex=0;;){const r=xa.exec(i),o=xa.lastIndex;let a=r[1];const c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){uc(t,l===void 0?new Vp(a,n,e):new Gp(a,n,e));break}else{let u=t.map[a];u===void 0&&(u=new Hp(a),uc(t,u)),t=u}}}class Ss{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const r=e.getActiveUniform(t,s),o=e.getUniformLocation(t,r.name);Wp(r,o,this)}}setValue(e,t,i,s){const r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){const s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,o=t.length;r!==o;++r){const a=t[r],c=i[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,s)}}static seqWithValue(e,t){const i=[];for(let s=0,r=e.length;s!==r;++s){const o=e[s];o.id in t&&i.push(o)}return i}}function dc(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const qp=37297;let Xp=0;function Yp(n,e){const t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}const fc=new Le;function jp(n){We._getMatrix(fc,We.workingColorSpace,n);const e=`mat3( ${fc.elements.map(t=>t.toFixed(4))} )`;switch(We.getTransfer(n)){case zn:return[e,"LinearTransferOETF"];case Ke:return[e,"sRGBTransferOETF"];default:return Pe("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function pc(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=(n.getShaderInfoLog(e)||"").trim();if(i&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const a=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+Yp(n.getShaderSource(e),a)}else return r}function $p(n,e){const t=jp(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Kp(n,e){let t;switch(e){case Kc:t="Linear";break;case Jc:t="Reinhard";break;case Zc:t="Cineon";break;case Qc:t="ACESFilmic";break;case tl:t="AgX";break;case il:t="Neutral";break;case el:t="Custom";break;default:Pe("WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const vs=new F;function Jp(){We.getLuminanceCoefficients(vs);const n=vs.x.toFixed(4),e=vs.y.toFixed(4),t=vs.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Zp(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Un).join(`
`)}function Qp(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function em(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(e,s),o=r.name;let a=1;r.type===n.FLOAT_MAT2&&(a=2),r.type===n.FLOAT_MAT3&&(a=3),r.type===n.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:n.getAttribLocation(e,o),locationSize:a}}return t}function Un(n){return n!==""}function mc(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function xc(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const tm=/^[ \t]*#include +<([\w\d./]+)>/gm;function Da(n){return n.replace(tm,nm)}const im=new Map;function nm(n,e){let t=Ne[e];if(t===void 0){const i=im.get(e);if(i!==void 0)t=Ne[i],Pe('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Da(t)}const sm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function gc(n){return n.replace(sm,rm)}function rm(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function _c(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}function am(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Na?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===Cc?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Zt&&(e="SHADOWMAP_TYPE_VSM"),e}function om(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case ki:case Vi:e="ENVMAP_TYPE_CUBE";break;case Vn:e="ENVMAP_TYPE_CUBE_UV";break}return e}function cm(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case Vi:e="ENVMAP_MODE_REFRACTION";break}return e}function lm(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case vr:e="ENVMAP_BLENDING_MULTIPLY";break;case jc:e="ENVMAP_BLENDING_MIX";break;case $c:e="ENVMAP_BLENDING_ADD";break}return e}function hm(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function um(n,e,t,i){const s=n.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const c=am(t),l=om(t),h=cm(t),u=lm(t),f=hm(t),p=Zp(t),v=Qp(r),b=s.createProgram();let m,d,w=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(Un).join(`
`),m.length>0&&(m+=`
`),d=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(Un).join(`
`),d.length>0&&(d+=`
`)):(m=[_c(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Un).join(`
`),d=[_c(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==hi?"#define TONE_MAPPING":"",t.toneMapping!==hi?Ne.tonemapping_pars_fragment:"",t.toneMapping!==hi?Kp("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ne.colorspace_pars_fragment,$p("linearToOutputTexel",t.outputColorSpace),Jp(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Un).join(`
`)),o=Da(o),o=mc(o,t),o=xc(o,t),a=Da(a),a=mc(a,t),a=xc(a,t),o=gc(o),a=gc(a),t.isRawShaderMaterial!==!0&&(w=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,d=["#define varying in",t.glslVersion===Ta?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Ta?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const S=w+m+o,E=w+d+a,P=dc(s,s.VERTEX_SHADER,S),g=dc(s,s.FRAGMENT_SHADER,E);s.attachShader(b,P),s.attachShader(b,g),t.index0AttributeName!==void 0?s.bindAttribLocation(b,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(b,0,"position"),s.linkProgram(b);function T(A){if(n.debug.checkShaderErrors){const D=s.getProgramInfoLog(b)||"",I=s.getShaderInfoLog(P)||"",B=s.getShaderInfoLog(g)||"",G=D.trim(),H=I.trim(),Q=B.trim();let W=!0,Y=!0;if(s.getProgramParameter(b,s.LINK_STATUS)===!1)if(W=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,b,P,g);else{const te=pc(s,P,"vertex"),me=pc(s,g,"fragment");lt("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(b,s.VALIDATE_STATUS)+`

Material Name: `+A.name+`
Material Type: `+A.type+`

Program Info Log: `+G+`
`+te+`
`+me)}else G!==""?Pe("WebGLProgram: Program Info Log:",G):(H===""||Q==="")&&(Y=!1);Y&&(A.diagnostics={runnable:W,programLog:G,vertexShader:{log:H,prefix:m},fragmentShader:{log:Q,prefix:d}})}s.deleteShader(P),s.deleteShader(g),C=new Ss(s,b),x=em(s,b)}let C;this.getUniforms=function(){return C===void 0&&T(this),C};let x;this.getAttributes=function(){return x===void 0&&T(this),x};let _=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return _===!1&&(_=s.getProgramParameter(b,qp)),_},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(b),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Xp++,this.cacheKey=e,this.usedTimes=1,this.program=b,this.vertexShader=P,this.fragmentShader=g,this}let dm=0;class fm{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new pm(e),t.set(e,i)),i}}class pm{constructor(e){this.id=dm++,this.code=e,this.usedTimes=0}}function mm(n,e,t,i,s,r,o){const a=new Pr,c=new fm,l=new Set,h=[],u=s.logarithmicDepthBuffer,f=s.vertexTextures;let p=s.precision;const v={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function b(x){return l.add(x),x===0?"uv":`uv${x}`}function m(x,_,A,D,I){const B=D.fog,G=I.geometry,H=x.isMeshStandardMaterial?D.environment:null,Q=(x.isMeshStandardMaterial?t:e).get(x.envMap||H),W=Q&&Q.mapping===Vn?Q.image.height:null,Y=v[x.type];x.precision!==null&&(p=s.getMaxPrecision(x.precision),p!==x.precision&&Pe("WebGLProgram.getParameters:",x.precision,"not supported, using",p,"instead."));const te=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,me=te!==void 0?te.length:0;let Oe=0;G.morphAttributes.position!==void 0&&(Oe=1),G.morphAttributes.normal!==void 0&&(Oe=2),G.morphAttributes.color!==void 0&&(Oe=3);let qe,je,Ye,j;if(Y){const Qe=Xt[Y];qe=Qe.vertexShader,je=Qe.fragmentShader}else qe=x.vertexShader,je=x.fragmentShader,c.update(x),Ye=c.getVertexShaderID(x),j=c.getFragmentShaderID(x);const J=n.getRenderTarget(),de=n.state.buffers.depth.getReversed(),De=I.isInstancedMesh===!0,ve=I.isBatchedMesh===!0,ze=!!x.map,_t=!!x.matcap,Be=!!Q,rt=!!x.aoMap,L=!!x.lightMap,ke=!!x.bumpMap,Ve=!!x.normalMap,nt=!!x.displacementMap,xe=!!x.emissiveMap,at=!!x.metalnessMap,be=!!x.roughnessMap,Ie=x.anisotropy>0,R=x.clearcoat>0,y=x.dispersion>0,z=x.iridescence>0,X=x.sheen>0,K=x.transmission>0,q=Ie&&!!x.anisotropyMap,_e=R&&!!x.clearcoatMap,oe=R&&!!x.clearcoatNormalMap,Me=R&&!!x.clearcoatRoughnessMap,ge=z&&!!x.iridescenceMap,Z=z&&!!x.iridescenceThicknessMap,ne=X&&!!x.sheenColorMap,Te=X&&!!x.sheenRoughnessMap,we=!!x.specularMap,he=!!x.specularColorMap,Re=!!x.specularIntensityMap,U=K&&!!x.transmissionMap,ce=K&&!!x.thicknessMap,se=!!x.gradientMap,re=!!x.alphaMap,ee=x.alphaTest>0,$=!!x.alphaHash,fe=!!x.extensions;let Ce=hi;x.toneMapped&&(J===null||J.isXRRenderTarget===!0)&&(Ce=n.toneMapping);const st={shaderID:Y,shaderType:x.type,shaderName:x.name,vertexShader:qe,fragmentShader:je,defines:x.defines,customVertexShaderID:Ye,customFragmentShaderID:j,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:p,batching:ve,batchingColor:ve&&I._colorsTexture!==null,instancing:De,instancingColor:De&&I.instanceColor!==null,instancingMorph:De&&I.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:J===null?n.outputColorSpace:J.isXRRenderTarget===!0?J.texture.colorSpace:Gi,alphaToCoverage:!!x.alphaToCoverage,map:ze,matcap:_t,envMap:Be,envMapMode:Be&&Q.mapping,envMapCubeUVHeight:W,aoMap:rt,lightMap:L,bumpMap:ke,normalMap:Ve,displacementMap:f&&nt,emissiveMap:xe,normalMapObjectSpace:Ve&&x.normalMapType===al,normalMapTangentSpace:Ve&&x.normalMapType===Rr,metalnessMap:at,roughnessMap:be,anisotropy:Ie,anisotropyMap:q,clearcoat:R,clearcoatMap:_e,clearcoatNormalMap:oe,clearcoatRoughnessMap:Me,dispersion:y,iridescence:z,iridescenceMap:ge,iridescenceThicknessMap:Z,sheen:X,sheenColorMap:ne,sheenRoughnessMap:Te,specularMap:we,specularColorMap:he,specularIntensityMap:Re,transmission:K,transmissionMap:U,thicknessMap:ce,gradientMap:se,opaque:x.transparent===!1&&x.blending===Bi&&x.alphaToCoverage===!1,alphaMap:re,alphaTest:ee,alphaHash:$,combine:x.combine,mapUv:ze&&b(x.map.channel),aoMapUv:rt&&b(x.aoMap.channel),lightMapUv:L&&b(x.lightMap.channel),bumpMapUv:ke&&b(x.bumpMap.channel),normalMapUv:Ve&&b(x.normalMap.channel),displacementMapUv:nt&&b(x.displacementMap.channel),emissiveMapUv:xe&&b(x.emissiveMap.channel),metalnessMapUv:at&&b(x.metalnessMap.channel),roughnessMapUv:be&&b(x.roughnessMap.channel),anisotropyMapUv:q&&b(x.anisotropyMap.channel),clearcoatMapUv:_e&&b(x.clearcoatMap.channel),clearcoatNormalMapUv:oe&&b(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Me&&b(x.clearcoatRoughnessMap.channel),iridescenceMapUv:ge&&b(x.iridescenceMap.channel),iridescenceThicknessMapUv:Z&&b(x.iridescenceThicknessMap.channel),sheenColorMapUv:ne&&b(x.sheenColorMap.channel),sheenRoughnessMapUv:Te&&b(x.sheenRoughnessMap.channel),specularMapUv:we&&b(x.specularMap.channel),specularColorMapUv:he&&b(x.specularColorMap.channel),specularIntensityMapUv:Re&&b(x.specularIntensityMap.channel),transmissionMapUv:U&&b(x.transmissionMap.channel),thicknessMapUv:ce&&b(x.thicknessMap.channel),alphaMapUv:re&&b(x.alphaMap.channel),vertexTangents:!!G.attributes.tangent&&(Ve||Ie),vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,pointsUvs:I.isPoints===!0&&!!G.attributes.uv&&(ze||re),fog:!!B,useFog:x.fog===!0,fogExp2:!!B&&B.isFogExp2,flatShading:x.flatShading===!0&&x.wireframe===!1,sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:de,skinning:I.isSkinnedMesh===!0,morphTargets:G.morphAttributes.position!==void 0,morphNormals:G.morphAttributes.normal!==void 0,morphColors:G.morphAttributes.color!==void 0,morphTargetsCount:me,morphTextureStride:Oe,numDirLights:_.directional.length,numPointLights:_.point.length,numSpotLights:_.spot.length,numSpotLightMaps:_.spotLightMap.length,numRectAreaLights:_.rectArea.length,numHemiLights:_.hemi.length,numDirLightShadows:_.directionalShadowMap.length,numPointLightShadows:_.pointShadowMap.length,numSpotLightShadows:_.spotShadowMap.length,numSpotLightShadowsWithMaps:_.numSpotLightShadowsWithMaps,numLightProbes:_.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:x.dithering,shadowMapEnabled:n.shadowMap.enabled&&A.length>0,shadowMapType:n.shadowMap.type,toneMapping:Ce,decodeVideoTexture:ze&&x.map.isVideoTexture===!0&&We.getTransfer(x.map.colorSpace)===Ke,decodeVideoTextureEmissive:xe&&x.emissiveMap.isVideoTexture===!0&&We.getTransfer(x.emissiveMap.colorSpace)===Ke,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===Qt,flipSided:x.side===wt,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:fe&&x.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(fe&&x.extensions.multiDraw===!0||ve)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return st.vertexUv1s=l.has(1),st.vertexUv2s=l.has(2),st.vertexUv3s=l.has(3),l.clear(),st}function d(x){const _=[];if(x.shaderID?_.push(x.shaderID):(_.push(x.customVertexShaderID),_.push(x.customFragmentShaderID)),x.defines!==void 0)for(const A in x.defines)_.push(A),_.push(x.defines[A]);return x.isRawShaderMaterial===!1&&(w(_,x),S(_,x),_.push(n.outputColorSpace)),_.push(x.customProgramCacheKey),_.join()}function w(x,_){x.push(_.precision),x.push(_.outputColorSpace),x.push(_.envMapMode),x.push(_.envMapCubeUVHeight),x.push(_.mapUv),x.push(_.alphaMapUv),x.push(_.lightMapUv),x.push(_.aoMapUv),x.push(_.bumpMapUv),x.push(_.normalMapUv),x.push(_.displacementMapUv),x.push(_.emissiveMapUv),x.push(_.metalnessMapUv),x.push(_.roughnessMapUv),x.push(_.anisotropyMapUv),x.push(_.clearcoatMapUv),x.push(_.clearcoatNormalMapUv),x.push(_.clearcoatRoughnessMapUv),x.push(_.iridescenceMapUv),x.push(_.iridescenceThicknessMapUv),x.push(_.sheenColorMapUv),x.push(_.sheenRoughnessMapUv),x.push(_.specularMapUv),x.push(_.specularColorMapUv),x.push(_.specularIntensityMapUv),x.push(_.transmissionMapUv),x.push(_.thicknessMapUv),x.push(_.combine),x.push(_.fogExp2),x.push(_.sizeAttenuation),x.push(_.morphTargetsCount),x.push(_.morphAttributeCount),x.push(_.numDirLights),x.push(_.numPointLights),x.push(_.numSpotLights),x.push(_.numSpotLightMaps),x.push(_.numHemiLights),x.push(_.numRectAreaLights),x.push(_.numDirLightShadows),x.push(_.numPointLightShadows),x.push(_.numSpotLightShadows),x.push(_.numSpotLightShadowsWithMaps),x.push(_.numLightProbes),x.push(_.shadowMapType),x.push(_.toneMapping),x.push(_.numClippingPlanes),x.push(_.numClipIntersection),x.push(_.depthPacking)}function S(x,_){a.disableAll(),_.supportsVertexTextures&&a.enable(0),_.instancing&&a.enable(1),_.instancingColor&&a.enable(2),_.instancingMorph&&a.enable(3),_.matcap&&a.enable(4),_.envMap&&a.enable(5),_.normalMapObjectSpace&&a.enable(6),_.normalMapTangentSpace&&a.enable(7),_.clearcoat&&a.enable(8),_.iridescence&&a.enable(9),_.alphaTest&&a.enable(10),_.vertexColors&&a.enable(11),_.vertexAlphas&&a.enable(12),_.vertexUv1s&&a.enable(13),_.vertexUv2s&&a.enable(14),_.vertexUv3s&&a.enable(15),_.vertexTangents&&a.enable(16),_.anisotropy&&a.enable(17),_.alphaHash&&a.enable(18),_.batching&&a.enable(19),_.dispersion&&a.enable(20),_.batchingColor&&a.enable(21),_.gradientMap&&a.enable(22),x.push(a.mask),a.disableAll(),_.fog&&a.enable(0),_.useFog&&a.enable(1),_.flatShading&&a.enable(2),_.logarithmicDepthBuffer&&a.enable(3),_.reversedDepthBuffer&&a.enable(4),_.skinning&&a.enable(5),_.morphTargets&&a.enable(6),_.morphNormals&&a.enable(7),_.morphColors&&a.enable(8),_.premultipliedAlpha&&a.enable(9),_.shadowMapEnabled&&a.enable(10),_.doubleSided&&a.enable(11),_.flipSided&&a.enable(12),_.useDepthPacking&&a.enable(13),_.dithering&&a.enable(14),_.transmission&&a.enable(15),_.sheen&&a.enable(16),_.opaque&&a.enable(17),_.pointsUvs&&a.enable(18),_.decodeVideoTexture&&a.enable(19),_.decodeVideoTextureEmissive&&a.enable(20),_.alphaToCoverage&&a.enable(21),x.push(a.mask)}function E(x){const _=v[x.type];let A;if(_){const D=Xt[_];A=bl.clone(D.uniforms)}else A=x.uniforms;return A}function P(x,_){let A;for(let D=0,I=h.length;D<I;D++){const B=h[D];if(B.cacheKey===_){A=B,++A.usedTimes;break}}return A===void 0&&(A=new um(n,_,x,r),h.push(A)),A}function g(x){if(--x.usedTimes===0){const _=h.indexOf(x);h[_]=h[h.length-1],h.pop(),x.destroy()}}function T(x){c.remove(x)}function C(){c.dispose()}return{getParameters:m,getProgramCacheKey:d,getUniforms:E,acquireProgram:P,releaseProgram:g,releaseShaderCache:T,programs:h,dispose:C}}function xm(){let n=new WeakMap;function e(o){return n.has(o)}function t(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function s(o,a,c){n.get(o)[a]=c}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:r}}function gm(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function vc(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function yc(){const n=[];let e=0;const t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function o(u,f,p,v,b,m){let d=n[e];return d===void 0?(d={id:u.id,object:u,geometry:f,material:p,groupOrder:v,renderOrder:u.renderOrder,z:b,group:m},n[e]=d):(d.id=u.id,d.object=u,d.geometry=f,d.material=p,d.groupOrder=v,d.renderOrder=u.renderOrder,d.z=b,d.group=m),e++,d}function a(u,f,p,v,b,m){const d=o(u,f,p,v,b,m);p.transmission>0?i.push(d):p.transparent===!0?s.push(d):t.push(d)}function c(u,f,p,v,b,m){const d=o(u,f,p,v,b,m);p.transmission>0?i.unshift(d):p.transparent===!0?s.unshift(d):t.unshift(d)}function l(u,f){t.length>1&&t.sort(u||gm),i.length>1&&i.sort(f||vc),s.length>1&&s.sort(f||vc)}function h(){for(let u=e,f=n.length;u<f;u++){const p=n[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:a,unshift:c,finish:h,sort:l}}function _m(){let n=new WeakMap;function e(i,s){const r=n.get(i);let o;return r===void 0?(o=new yc,n.set(i,[o])):s>=r.length?(o=new yc,r.push(o)):o=r[s],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function vm(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new F,color:new Ue};break;case"SpotLight":t={position:new F,direction:new F,color:new Ue,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new F,color:new Ue,distance:0,decay:0};break;case"HemisphereLight":t={direction:new F,skyColor:new Ue,groundColor:new Ue};break;case"RectAreaLight":t={color:new Ue,position:new F,halfWidth:new F,halfHeight:new F};break}return n[e.id]=t,t}}}function ym(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Fe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Fe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Fe,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let bm=0;function Mm(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function Sm(n){const e=new vm,t=ym(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new F);const s=new F,r=new Ze,o=new Ze;function a(l){let h=0,u=0,f=0;for(let x=0;x<9;x++)i.probe[x].set(0,0,0);let p=0,v=0,b=0,m=0,d=0,w=0,S=0,E=0,P=0,g=0,T=0;l.sort(Mm);for(let x=0,_=l.length;x<_;x++){const A=l[x],D=A.color,I=A.intensity,B=A.distance,G=A.shadow&&A.shadow.map?A.shadow.map.texture:null;if(A.isAmbientLight)h+=D.r*I,u+=D.g*I,f+=D.b*I;else if(A.isLightProbe){for(let H=0;H<9;H++)i.probe[H].addScaledVector(A.sh.coefficients[H],I);T++}else if(A.isDirectionalLight){const H=e.get(A);if(H.color.copy(A.color).multiplyScalar(A.intensity),A.castShadow){const Q=A.shadow,W=t.get(A);W.shadowIntensity=Q.intensity,W.shadowBias=Q.bias,W.shadowNormalBias=Q.normalBias,W.shadowRadius=Q.radius,W.shadowMapSize=Q.mapSize,i.directionalShadow[p]=W,i.directionalShadowMap[p]=G,i.directionalShadowMatrix[p]=A.shadow.matrix,w++}i.directional[p]=H,p++}else if(A.isSpotLight){const H=e.get(A);H.position.setFromMatrixPosition(A.matrixWorld),H.color.copy(D).multiplyScalar(I),H.distance=B,H.coneCos=Math.cos(A.angle),H.penumbraCos=Math.cos(A.angle*(1-A.penumbra)),H.decay=A.decay,i.spot[b]=H;const Q=A.shadow;if(A.map&&(i.spotLightMap[P]=A.map,P++,Q.updateMatrices(A),A.castShadow&&g++),i.spotLightMatrix[b]=Q.matrix,A.castShadow){const W=t.get(A);W.shadowIntensity=Q.intensity,W.shadowBias=Q.bias,W.shadowNormalBias=Q.normalBias,W.shadowRadius=Q.radius,W.shadowMapSize=Q.mapSize,i.spotShadow[b]=W,i.spotShadowMap[b]=G,E++}b++}else if(A.isRectAreaLight){const H=e.get(A);H.color.copy(D).multiplyScalar(I),H.halfWidth.set(A.width*.5,0,0),H.halfHeight.set(0,A.height*.5,0),i.rectArea[m]=H,m++}else if(A.isPointLight){const H=e.get(A);if(H.color.copy(A.color).multiplyScalar(A.intensity),H.distance=A.distance,H.decay=A.decay,A.castShadow){const Q=A.shadow,W=t.get(A);W.shadowIntensity=Q.intensity,W.shadowBias=Q.bias,W.shadowNormalBias=Q.normalBias,W.shadowRadius=Q.radius,W.shadowMapSize=Q.mapSize,W.shadowCameraNear=Q.camera.near,W.shadowCameraFar=Q.camera.far,i.pointShadow[v]=W,i.pointShadowMap[v]=G,i.pointShadowMatrix[v]=A.shadow.matrix,S++}i.point[v]=H,v++}else if(A.isHemisphereLight){const H=e.get(A);H.skyColor.copy(A.color).multiplyScalar(I),H.groundColor.copy(A.groundColor).multiplyScalar(I),i.hemi[d]=H,d++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ae.LTC_FLOAT_1,i.rectAreaLTC2=ae.LTC_FLOAT_2):(i.rectAreaLTC1=ae.LTC_HALF_1,i.rectAreaLTC2=ae.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=u,i.ambient[2]=f;const C=i.hash;(C.directionalLength!==p||C.pointLength!==v||C.spotLength!==b||C.rectAreaLength!==m||C.hemiLength!==d||C.numDirectionalShadows!==w||C.numPointShadows!==S||C.numSpotShadows!==E||C.numSpotMaps!==P||C.numLightProbes!==T)&&(i.directional.length=p,i.spot.length=b,i.rectArea.length=m,i.point.length=v,i.hemi.length=d,i.directionalShadow.length=w,i.directionalShadowMap.length=w,i.pointShadow.length=S,i.pointShadowMap.length=S,i.spotShadow.length=E,i.spotShadowMap.length=E,i.directionalShadowMatrix.length=w,i.pointShadowMatrix.length=S,i.spotLightMatrix.length=E+P-g,i.spotLightMap.length=P,i.numSpotLightShadowsWithMaps=g,i.numLightProbes=T,C.directionalLength=p,C.pointLength=v,C.spotLength=b,C.rectAreaLength=m,C.hemiLength=d,C.numDirectionalShadows=w,C.numPointShadows=S,C.numSpotShadows=E,C.numSpotMaps=P,C.numLightProbes=T,i.version=bm++)}function c(l,h){let u=0,f=0,p=0,v=0,b=0;const m=h.matrixWorldInverse;for(let d=0,w=l.length;d<w;d++){const S=l[d];if(S.isDirectionalLight){const E=i.directional[u];E.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(m),u++}else if(S.isSpotLight){const E=i.spot[p];E.position.setFromMatrixPosition(S.matrixWorld),E.position.applyMatrix4(m),E.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(m),p++}else if(S.isRectAreaLight){const E=i.rectArea[v];E.position.setFromMatrixPosition(S.matrixWorld),E.position.applyMatrix4(m),o.identity(),r.copy(S.matrixWorld),r.premultiply(m),o.extractRotation(r),E.halfWidth.set(S.width*.5,0,0),E.halfHeight.set(0,S.height*.5,0),E.halfWidth.applyMatrix4(o),E.halfHeight.applyMatrix4(o),v++}else if(S.isPointLight){const E=i.point[f];E.position.setFromMatrixPosition(S.matrixWorld),E.position.applyMatrix4(m),f++}else if(S.isHemisphereLight){const E=i.hemi[b];E.direction.setFromMatrixPosition(S.matrixWorld),E.direction.transformDirection(m),b++}}}return{setup:a,setupView:c,state:i}}function bc(n){const e=new Sm(n),t=[],i=[];function s(h){l.camera=h,t.length=0,i.length=0}function r(h){t.push(h)}function o(h){i.push(h)}function a(){e.setup(t)}function c(h){e.setupView(t,h)}const l={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function wm(n){let e=new WeakMap;function t(s,r=0){const o=e.get(s);let a;return o===void 0?(a=new bc(n),e.set(s,[a])):r>=o.length?(a=new bc(n),o.push(a)):a=o[r],a}function i(){e=new WeakMap}return{get:t,dispose:i}}const Em=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Tm=`uniform sampler2D shadow_pass;
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
}`;function Am(n,e,t){let i=new Ir;const s=new Fe,r=new Fe,o=new Je,a=new Al({depthPacking:rl}),c=new Rl,l={},h=t.maxTextureSize,u={[di]:wt,[wt]:di,[Qt]:Qt},f=new ii({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Fe},radius:{value:4}},vertexShader:Em,fragmentShader:Tm}),p=f.clone();p.defines.HORIZONTAL_PASS=1;const v=new xt;v.setAttribute("position",new Ft(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const b=new Kt(v,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Na;let d=this.type;this.render=function(g,T,C){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||g.length===0)return;const x=n.getRenderTarget(),_=n.getActiveCubeFace(),A=n.getActiveMipmapLevel(),D=n.state;D.setBlending(ti),D.buffers.depth.getReversed()===!0?D.buffers.color.setClear(0,0,0,0):D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);const I=d!==Zt&&this.type===Zt,B=d===Zt&&this.type!==Zt;for(let G=0,H=g.length;G<H;G++){const Q=g[G],W=Q.shadow;if(W===void 0){Pe("WebGLShadowMap:",Q,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;s.copy(W.mapSize);const Y=W.getFrameExtents();if(s.multiply(Y),r.copy(W.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/Y.x),s.x=r.x*Y.x,W.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/Y.y),s.y=r.y*Y.y,W.mapSize.y=r.y)),W.map===null||I===!0||B===!0){const me=this.type!==Zt?{minFilter:Ct,magFilter:Ct}:{};W.map!==null&&W.map.dispose(),W.map=new Ei(s.x,s.y,me),W.map.texture.name=Q.name+".shadowMap",W.camera.updateProjectionMatrix()}n.setRenderTarget(W.map),n.clear();const te=W.getViewportCount();for(let me=0;me<te;me++){const Oe=W.getViewport(me);o.set(r.x*Oe.x,r.y*Oe.y,r.x*Oe.z,r.y*Oe.w),D.viewport(o),W.updateMatrices(Q,me),i=W.getFrustum(),E(T,C,W.camera,Q,this.type)}W.isPointLightShadow!==!0&&this.type===Zt&&w(W,C),W.needsUpdate=!1}d=this.type,m.needsUpdate=!1,n.setRenderTarget(x,_,A)};function w(g,T){const C=e.update(b);f.defines.VSM_SAMPLES!==g.blurSamples&&(f.defines.VSM_SAMPLES=g.blurSamples,p.defines.VSM_SAMPLES=g.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),g.mapPass===null&&(g.mapPass=new Ei(s.x,s.y)),f.uniforms.shadow_pass.value=g.map.texture,f.uniforms.resolution.value=g.mapSize,f.uniforms.radius.value=g.radius,n.setRenderTarget(g.mapPass),n.clear(),n.renderBufferDirect(T,null,C,f,b,null),p.uniforms.shadow_pass.value=g.mapPass.texture,p.uniforms.resolution.value=g.mapSize,p.uniforms.radius.value=g.radius,n.setRenderTarget(g.map),n.clear(),n.renderBufferDirect(T,null,C,p,b,null)}function S(g,T,C,x){let _=null;const A=C.isPointLight===!0?g.customDistanceMaterial:g.customDepthMaterial;if(A!==void 0)_=A;else if(_=C.isPointLight===!0?c:a,n.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0||T.alphaToCoverage===!0){const D=_.uuid,I=T.uuid;let B=l[D];B===void 0&&(B={},l[D]=B);let G=B[I];G===void 0&&(G=_.clone(),B[I]=G,T.addEventListener("dispose",P)),_=G}if(_.visible=T.visible,_.wireframe=T.wireframe,x===Zt?_.side=T.shadowSide!==null?T.shadowSide:T.side:_.side=T.shadowSide!==null?T.shadowSide:u[T.side],_.alphaMap=T.alphaMap,_.alphaTest=T.alphaToCoverage===!0?.5:T.alphaTest,_.map=T.map,_.clipShadows=T.clipShadows,_.clippingPlanes=T.clippingPlanes,_.clipIntersection=T.clipIntersection,_.displacementMap=T.displacementMap,_.displacementScale=T.displacementScale,_.displacementBias=T.displacementBias,_.wireframeLinewidth=T.wireframeLinewidth,_.linewidth=T.linewidth,C.isPointLight===!0&&_.isMeshDistanceMaterial===!0){const D=n.properties.get(_);D.light=C}return _}function E(g,T,C,x,_){if(g.visible===!1)return;if(g.layers.test(T.layers)&&(g.isMesh||g.isLine||g.isPoints)&&(g.castShadow||g.receiveShadow&&_===Zt)&&(!g.frustumCulled||i.intersectsObject(g))){g.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse,g.matrixWorld);const I=e.update(g),B=g.material;if(Array.isArray(B)){const G=I.groups;for(let H=0,Q=G.length;H<Q;H++){const W=G[H],Y=B[W.materialIndex];if(Y&&Y.visible){const te=S(g,Y,x,_);g.onBeforeShadow(n,g,T,C,I,te,W),n.renderBufferDirect(C,null,I,te,g,W),g.onAfterShadow(n,g,T,C,I,te,W)}}}else if(B.visible){const G=S(g,B,x,_);g.onBeforeShadow(n,g,T,C,I,G,null),n.renderBufferDirect(C,null,I,G,g,null),g.onAfterShadow(n,g,T,C,I,G,null)}}const D=g.children;for(let I=0,B=D.length;I<B;I++)E(D[I],T,C,x,_)}function P(g){g.target.removeEventListener("dispose",P);for(const C in l){const x=l[C],_=g.target.uuid;_ in x&&(x[_].dispose(),delete x[_])}}}const Rm={[As]:Rs,[Cs]:Ds,[Ps]:Ls,[zi]:Is,[Rs]:As,[Ds]:Cs,[Ls]:Ps,[Is]:zi};function Cm(n,e){function t(){let U=!1;const ce=new Je;let se=null;const re=new Je(0,0,0,0);return{setMask:function(ee){se!==ee&&!U&&(n.colorMask(ee,ee,ee,ee),se=ee)},setLocked:function(ee){U=ee},setClear:function(ee,$,fe,Ce,st){st===!0&&(ee*=Ce,$*=Ce,fe*=Ce),ce.set(ee,$,fe,Ce),re.equals(ce)===!1&&(n.clearColor(ee,$,fe,Ce),re.copy(ce))},reset:function(){U=!1,se=null,re.set(-1,0,0,0)}}}function i(){let U=!1,ce=!1,se=null,re=null,ee=null;return{setReversed:function($){if(ce!==$){const fe=e.get("EXT_clip_control");$?fe.clipControlEXT(fe.LOWER_LEFT_EXT,fe.ZERO_TO_ONE_EXT):fe.clipControlEXT(fe.LOWER_LEFT_EXT,fe.NEGATIVE_ONE_TO_ONE_EXT),ce=$;const Ce=ee;ee=null,this.setClear(Ce)}},getReversed:function(){return ce},setTest:function($){$?J(n.DEPTH_TEST):de(n.DEPTH_TEST)},setMask:function($){se!==$&&!U&&(n.depthMask($),se=$)},setFunc:function($){if(ce&&($=Rm[$]),re!==$){switch($){case As:n.depthFunc(n.NEVER);break;case Rs:n.depthFunc(n.ALWAYS);break;case Cs:n.depthFunc(n.LESS);break;case zi:n.depthFunc(n.LEQUAL);break;case Ps:n.depthFunc(n.EQUAL);break;case Is:n.depthFunc(n.GEQUAL);break;case Ds:n.depthFunc(n.GREATER);break;case Ls:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}re=$}},setLocked:function($){U=$},setClear:function($){ee!==$&&(ce&&($=1-$),n.clearDepth($),ee=$)},reset:function(){U=!1,se=null,re=null,ee=null,ce=!1}}}function s(){let U=!1,ce=null,se=null,re=null,ee=null,$=null,fe=null,Ce=null,st=null;return{setTest:function(Qe){U||(Qe?J(n.STENCIL_TEST):de(n.STENCIL_TEST))},setMask:function(Qe){ce!==Qe&&!U&&(n.stencilMask(Qe),ce=Qe)},setFunc:function(Qe,Jt,Gt){(se!==Qe||re!==Jt||ee!==Gt)&&(n.stencilFunc(Qe,Jt,Gt),se=Qe,re=Jt,ee=Gt)},setOp:function(Qe,Jt,Gt){($!==Qe||fe!==Jt||Ce!==Gt)&&(n.stencilOp(Qe,Jt,Gt),$=Qe,fe=Jt,Ce=Gt)},setLocked:function(Qe){U=Qe},setClear:function(Qe){st!==Qe&&(n.clearStencil(Qe),st=Qe)},reset:function(){U=!1,ce=null,se=null,re=null,ee=null,$=null,fe=null,Ce=null,st=null}}}const r=new t,o=new i,a=new s,c=new WeakMap,l=new WeakMap;let h={},u={},f=new WeakMap,p=[],v=null,b=!1,m=null,d=null,w=null,S=null,E=null,P=null,g=null,T=new Ue(0,0,0),C=0,x=!1,_=null,A=null,D=null,I=null,B=null;const G=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let H=!1,Q=0;const W=n.getParameter(n.VERSION);W.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec(W)[1]),H=Q>=1):W.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),H=Q>=2);let Y=null,te={};const me=n.getParameter(n.SCISSOR_BOX),Oe=n.getParameter(n.VIEWPORT),qe=new Je().fromArray(me),je=new Je().fromArray(Oe);function Ye(U,ce,se,re){const ee=new Uint8Array(4),$=n.createTexture();n.bindTexture(U,$),n.texParameteri(U,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(U,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let fe=0;fe<se;fe++)U===n.TEXTURE_3D||U===n.TEXTURE_2D_ARRAY?n.texImage3D(ce,0,n.RGBA,1,1,re,0,n.RGBA,n.UNSIGNED_BYTE,ee):n.texImage2D(ce+fe,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ee);return $}const j={};j[n.TEXTURE_2D]=Ye(n.TEXTURE_2D,n.TEXTURE_2D,1),j[n.TEXTURE_CUBE_MAP]=Ye(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),j[n.TEXTURE_2D_ARRAY]=Ye(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),j[n.TEXTURE_3D]=Ye(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),J(n.DEPTH_TEST),o.setFunc(zi),ke(!1),Ve(ya),J(n.CULL_FACE),rt(ti);function J(U){h[U]!==!0&&(n.enable(U),h[U]=!0)}function de(U){h[U]!==!1&&(n.disable(U),h[U]=!1)}function De(U,ce){return u[U]!==ce?(n.bindFramebuffer(U,ce),u[U]=ce,U===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=ce),U===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=ce),!0):!1}function ve(U,ce){let se=p,re=!1;if(U){se=f.get(ce),se===void 0&&(se=[],f.set(ce,se));const ee=U.textures;if(se.length!==ee.length||se[0]!==n.COLOR_ATTACHMENT0){for(let $=0,fe=ee.length;$<fe;$++)se[$]=n.COLOR_ATTACHMENT0+$;se.length=ee.length,re=!0}}else se[0]!==n.BACK&&(se[0]=n.BACK,re=!0);re&&n.drawBuffers(se)}function ze(U){return v!==U?(n.useProgram(U),v=U,!0):!1}const _t={[bi]:n.FUNC_ADD,[Ic]:n.FUNC_SUBTRACT,[Dc]:n.FUNC_REVERSE_SUBTRACT};_t[Lc]=n.MIN,_t[Uc]=n.MAX;const Be={[Nc]:n.ZERO,[Fc]:n.ONE,[Oc]:n.SRC_COLOR,[Es]:n.SRC_ALPHA,[Hc]:n.SRC_ALPHA_SATURATE,[Vc]:n.DST_COLOR,[zc]:n.DST_ALPHA,[Bc]:n.ONE_MINUS_SRC_COLOR,[Ts]:n.ONE_MINUS_SRC_ALPHA,[Gc]:n.ONE_MINUS_DST_COLOR,[kc]:n.ONE_MINUS_DST_ALPHA,[Wc]:n.CONSTANT_COLOR,[qc]:n.ONE_MINUS_CONSTANT_COLOR,[Xc]:n.CONSTANT_ALPHA,[Yc]:n.ONE_MINUS_CONSTANT_ALPHA};function rt(U,ce,se,re,ee,$,fe,Ce,st,Qe){if(U===ti){b===!0&&(de(n.BLEND),b=!1);return}if(b===!1&&(J(n.BLEND),b=!0),U!==Pc){if(U!==m||Qe!==x){if((d!==bi||E!==bi)&&(n.blendEquation(n.FUNC_ADD),d=bi,E=bi),Qe)switch(U){case Bi:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case ba:n.blendFunc(n.ONE,n.ONE);break;case Ma:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Sa:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:lt("WebGLState: Invalid blending: ",U);break}else switch(U){case Bi:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case ba:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Ma:lt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Sa:lt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:lt("WebGLState: Invalid blending: ",U);break}w=null,S=null,P=null,g=null,T.set(0,0,0),C=0,m=U,x=Qe}return}ee=ee||ce,$=$||se,fe=fe||re,(ce!==d||ee!==E)&&(n.blendEquationSeparate(_t[ce],_t[ee]),d=ce,E=ee),(se!==w||re!==S||$!==P||fe!==g)&&(n.blendFuncSeparate(Be[se],Be[re],Be[$],Be[fe]),w=se,S=re,P=$,g=fe),(Ce.equals(T)===!1||st!==C)&&(n.blendColor(Ce.r,Ce.g,Ce.b,st),T.copy(Ce),C=st),m=U,x=!1}function L(U,ce){U.side===Qt?de(n.CULL_FACE):J(n.CULL_FACE);let se=U.side===wt;ce&&(se=!se),ke(se),U.blending===Bi&&U.transparent===!1?rt(ti):rt(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),o.setFunc(U.depthFunc),o.setTest(U.depthTest),o.setMask(U.depthWrite),r.setMask(U.colorWrite);const re=U.stencilWrite;a.setTest(re),re&&(a.setMask(U.stencilWriteMask),a.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),a.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),xe(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?J(n.SAMPLE_ALPHA_TO_COVERAGE):de(n.SAMPLE_ALPHA_TO_COVERAGE)}function ke(U){_!==U&&(U?n.frontFace(n.CW):n.frontFace(n.CCW),_=U)}function Ve(U){U!==Ac?(J(n.CULL_FACE),U!==A&&(U===ya?n.cullFace(n.BACK):U===Rc?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):de(n.CULL_FACE),A=U}function nt(U){U!==D&&(H&&n.lineWidth(U),D=U)}function xe(U,ce,se){U?(J(n.POLYGON_OFFSET_FILL),(I!==ce||B!==se)&&(n.polygonOffset(ce,se),I=ce,B=se)):de(n.POLYGON_OFFSET_FILL)}function at(U){U?J(n.SCISSOR_TEST):de(n.SCISSOR_TEST)}function be(U){U===void 0&&(U=n.TEXTURE0+G-1),Y!==U&&(n.activeTexture(U),Y=U)}function Ie(U,ce,se){se===void 0&&(Y===null?se=n.TEXTURE0+G-1:se=Y);let re=te[se];re===void 0&&(re={type:void 0,texture:void 0},te[se]=re),(re.type!==U||re.texture!==ce)&&(Y!==se&&(n.activeTexture(se),Y=se),n.bindTexture(U,ce||j[U]),re.type=U,re.texture=ce)}function R(){const U=te[Y];U!==void 0&&U.type!==void 0&&(n.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function y(){try{n.compressedTexImage2D(...arguments)}catch(U){U("WebGLState:",U)}}function z(){try{n.compressedTexImage3D(...arguments)}catch(U){U("WebGLState:",U)}}function X(){try{n.texSubImage2D(...arguments)}catch(U){U("WebGLState:",U)}}function K(){try{n.texSubImage3D(...arguments)}catch(U){U("WebGLState:",U)}}function q(){try{n.compressedTexSubImage2D(...arguments)}catch(U){U("WebGLState:",U)}}function _e(){try{n.compressedTexSubImage3D(...arguments)}catch(U){U("WebGLState:",U)}}function oe(){try{n.texStorage2D(...arguments)}catch(U){U("WebGLState:",U)}}function Me(){try{n.texStorage3D(...arguments)}catch(U){U("WebGLState:",U)}}function ge(){try{n.texImage2D(...arguments)}catch(U){U("WebGLState:",U)}}function Z(){try{n.texImage3D(...arguments)}catch(U){U("WebGLState:",U)}}function ne(U){qe.equals(U)===!1&&(n.scissor(U.x,U.y,U.z,U.w),qe.copy(U))}function Te(U){je.equals(U)===!1&&(n.viewport(U.x,U.y,U.z,U.w),je.copy(U))}function we(U,ce){let se=l.get(ce);se===void 0&&(se=new WeakMap,l.set(ce,se));let re=se.get(U);re===void 0&&(re=n.getUniformBlockIndex(ce,U.name),se.set(U,re))}function he(U,ce){const re=l.get(ce).get(U);c.get(ce)!==re&&(n.uniformBlockBinding(ce,re,U.__bindingPointIndex),c.set(ce,re))}function Re(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),h={},Y=null,te={},u={},f=new WeakMap,p=[],v=null,b=!1,m=null,d=null,w=null,S=null,E=null,P=null,g=null,T=new Ue(0,0,0),C=0,x=!1,_=null,A=null,D=null,I=null,B=null,qe.set(0,0,n.canvas.width,n.canvas.height),je.set(0,0,n.canvas.width,n.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:J,disable:de,bindFramebuffer:De,drawBuffers:ve,useProgram:ze,setBlending:rt,setMaterial:L,setFlipSided:ke,setCullFace:Ve,setLineWidth:nt,setPolygonOffset:xe,setScissorTest:at,activeTexture:be,bindTexture:Ie,unbindTexture:R,compressedTexImage2D:y,compressedTexImage3D:z,texImage2D:ge,texImage3D:Z,updateUBOMapping:we,uniformBlockBinding:he,texStorage2D:oe,texStorage3D:Me,texSubImage2D:X,texSubImage3D:K,compressedTexSubImage2D:q,compressedTexSubImage3D:_e,scissor:ne,viewport:Te,reset:Re}}function Pm(n,e,t,i,s,r,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Fe,h=new WeakMap;let u;const f=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(R,y){return p?new OffscreenCanvas(R,y):dr("canvas")}function b(R,y,z){let X=1;const K=Ie(R);if((K.width>z||K.height>z)&&(X=z/Math.max(K.width,K.height)),X<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const q=Math.floor(X*K.width),_e=Math.floor(X*K.height);u===void 0&&(u=v(q,_e));const oe=y?v(q,_e):u;return oe.width=q,oe.height=_e,oe.getContext("2d").drawImage(R,0,0,q,_e),Pe("WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+q+"x"+_e+")."),oe}else return"data"in R&&Pe("WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),R;return R}function m(R){return R.generateMipmaps}function d(R){n.generateMipmap(R)}function w(R){return R.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?n.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function S(R,y,z,X,K=!1){if(R!==null){if(n[R]!==void 0)return n[R];Pe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let q=y;if(y===n.RED&&(z===n.FLOAT&&(q=n.R32F),z===n.HALF_FLOAT&&(q=n.R16F),z===n.UNSIGNED_BYTE&&(q=n.R8)),y===n.RED_INTEGER&&(z===n.UNSIGNED_BYTE&&(q=n.R8UI),z===n.UNSIGNED_SHORT&&(q=n.R16UI),z===n.UNSIGNED_INT&&(q=n.R32UI),z===n.BYTE&&(q=n.R8I),z===n.SHORT&&(q=n.R16I),z===n.INT&&(q=n.R32I)),y===n.RG&&(z===n.FLOAT&&(q=n.RG32F),z===n.HALF_FLOAT&&(q=n.RG16F),z===n.UNSIGNED_BYTE&&(q=n.RG8)),y===n.RG_INTEGER&&(z===n.UNSIGNED_BYTE&&(q=n.RG8UI),z===n.UNSIGNED_SHORT&&(q=n.RG16UI),z===n.UNSIGNED_INT&&(q=n.RG32UI),z===n.BYTE&&(q=n.RG8I),z===n.SHORT&&(q=n.RG16I),z===n.INT&&(q=n.RG32I)),y===n.RGB_INTEGER&&(z===n.UNSIGNED_BYTE&&(q=n.RGB8UI),z===n.UNSIGNED_SHORT&&(q=n.RGB16UI),z===n.UNSIGNED_INT&&(q=n.RGB32UI),z===n.BYTE&&(q=n.RGB8I),z===n.SHORT&&(q=n.RGB16I),z===n.INT&&(q=n.RGB32I)),y===n.RGBA_INTEGER&&(z===n.UNSIGNED_BYTE&&(q=n.RGBA8UI),z===n.UNSIGNED_SHORT&&(q=n.RGBA16UI),z===n.UNSIGNED_INT&&(q=n.RGBA32UI),z===n.BYTE&&(q=n.RGBA8I),z===n.SHORT&&(q=n.RGBA16I),z===n.INT&&(q=n.RGBA32I)),y===n.RGB&&(z===n.UNSIGNED_INT_5_9_9_9_REV&&(q=n.RGB9_E5),z===n.UNSIGNED_INT_10F_11F_11F_REV&&(q=n.R11F_G11F_B10F)),y===n.RGBA){const _e=K?zn:We.getTransfer(X);z===n.FLOAT&&(q=n.RGBA32F),z===n.HALF_FLOAT&&(q=n.RGBA16F),z===n.UNSIGNED_BYTE&&(q=_e===Ke?n.SRGB8_ALPHA8:n.RGBA8),z===n.UNSIGNED_SHORT_4_4_4_4&&(q=n.RGBA4),z===n.UNSIGNED_SHORT_5_5_5_1&&(q=n.RGB5_A1)}return(q===n.R16F||q===n.R32F||q===n.RG16F||q===n.RG32F||q===n.RGBA16F||q===n.RGBA32F)&&e.get("EXT_color_buffer_float"),q}function E(R,y){let z;return R?y===null||y===wi||y===hn?z=n.DEPTH24_STENCIL8:y===Yt?z=n.DEPTH32F_STENCIL8:y===ln&&(z=n.DEPTH24_STENCIL8,Pe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===wi||y===hn?z=n.DEPTH_COMPONENT24:y===Yt?z=n.DEPTH_COMPONENT32F:y===ln&&(z=n.DEPTH_COMPONENT16),z}function P(R,y){return m(R)===!0||R.isFramebufferTexture&&R.minFilter!==Ct&&R.minFilter!==Nt?Math.log2(Math.max(y.width,y.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?y.mipmaps.length:1}function g(R){const y=R.target;y.removeEventListener("dispose",g),C(y),y.isVideoTexture&&h.delete(y)}function T(R){const y=R.target;y.removeEventListener("dispose",T),_(y)}function C(R){const y=i.get(R);if(y.__webglInit===void 0)return;const z=R.source,X=f.get(z);if(X){const K=X[y.__cacheKey];K.usedTimes--,K.usedTimes===0&&x(R),Object.keys(X).length===0&&f.delete(z)}i.remove(R)}function x(R){const y=i.get(R);n.deleteTexture(y.__webglTexture);const z=R.source,X=f.get(z);delete X[y.__cacheKey],o.memory.textures--}function _(R){const y=i.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),i.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let X=0;X<6;X++){if(Array.isArray(y.__webglFramebuffer[X]))for(let K=0;K<y.__webglFramebuffer[X].length;K++)n.deleteFramebuffer(y.__webglFramebuffer[X][K]);else n.deleteFramebuffer(y.__webglFramebuffer[X]);y.__webglDepthbuffer&&n.deleteRenderbuffer(y.__webglDepthbuffer[X])}else{if(Array.isArray(y.__webglFramebuffer))for(let X=0;X<y.__webglFramebuffer.length;X++)n.deleteFramebuffer(y.__webglFramebuffer[X]);else n.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&n.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&n.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let X=0;X<y.__webglColorRenderbuffer.length;X++)y.__webglColorRenderbuffer[X]&&n.deleteRenderbuffer(y.__webglColorRenderbuffer[X]);y.__webglDepthRenderbuffer&&n.deleteRenderbuffer(y.__webglDepthRenderbuffer)}const z=R.textures;for(let X=0,K=z.length;X<K;X++){const q=i.get(z[X]);q.__webglTexture&&(n.deleteTexture(q.__webglTexture),o.memory.textures--),i.remove(z[X])}i.remove(R)}let A=0;function D(){A=0}function I(){const R=A;return R>=s.maxTextures&&Pe("WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+s.maxTextures),A+=1,R}function B(R){const y=[];return y.push(R.wrapS),y.push(R.wrapT),y.push(R.wrapR||0),y.push(R.magFilter),y.push(R.minFilter),y.push(R.anisotropy),y.push(R.internalFormat),y.push(R.format),y.push(R.type),y.push(R.generateMipmaps),y.push(R.premultiplyAlpha),y.push(R.flipY),y.push(R.unpackAlignment),y.push(R.colorSpace),y.join()}function G(R,y){const z=i.get(R);if(R.isVideoTexture&&at(R),R.isRenderTargetTexture===!1&&R.isExternalTexture!==!0&&R.version>0&&z.__version!==R.version){const X=R.image;if(X===null)Pe("WebGLRenderer: Texture marked for update but no image data found.");else if(X.complete===!1)Pe("WebGLRenderer: Texture marked for update but image is incomplete");else{j(z,R,y);return}}else R.isExternalTexture&&(z.__webglTexture=R.sourceTexture?R.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,z.__webglTexture,n.TEXTURE0+y)}function H(R,y){const z=i.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&z.__version!==R.version){j(z,R,y);return}else R.isExternalTexture&&(z.__webglTexture=R.sourceTexture?R.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,z.__webglTexture,n.TEXTURE0+y)}function Q(R,y){const z=i.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&z.__version!==R.version){j(z,R,y);return}t.bindTexture(n.TEXTURE_3D,z.__webglTexture,n.TEXTURE0+y)}function W(R,y){const z=i.get(R);if(R.version>0&&z.__version!==R.version){J(z,R,y);return}t.bindTexture(n.TEXTURE_CUBE_MAP,z.__webglTexture,n.TEXTURE0+y)}const Y={[Fs]:n.REPEAT,[ei]:n.CLAMP_TO_EDGE,[Os]:n.MIRRORED_REPEAT},te={[Ct]:n.NEAREST,[nl]:n.NEAREST_MIPMAP_NEAREST,[Dn]:n.NEAREST_MIPMAP_LINEAR,[Nt]:n.LINEAR,[bs]:n.LINEAR_MIPMAP_NEAREST,[Mi]:n.LINEAR_MIPMAP_LINEAR},me={[ol]:n.NEVER,[fl]:n.ALWAYS,[cl]:n.LESS,[Ha]:n.LEQUAL,[ll]:n.EQUAL,[dl]:n.GEQUAL,[hl]:n.GREATER,[ul]:n.NOTEQUAL};function Oe(R,y){if(y.type===Yt&&e.has("OES_texture_float_linear")===!1&&(y.magFilter===Nt||y.magFilter===bs||y.magFilter===Dn||y.magFilter===Mi||y.minFilter===Nt||y.minFilter===bs||y.minFilter===Dn||y.minFilter===Mi)&&Pe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(R,n.TEXTURE_WRAP_S,Y[y.wrapS]),n.texParameteri(R,n.TEXTURE_WRAP_T,Y[y.wrapT]),(R===n.TEXTURE_3D||R===n.TEXTURE_2D_ARRAY)&&n.texParameteri(R,n.TEXTURE_WRAP_R,Y[y.wrapR]),n.texParameteri(R,n.TEXTURE_MAG_FILTER,te[y.magFilter]),n.texParameteri(R,n.TEXTURE_MIN_FILTER,te[y.minFilter]),y.compareFunction&&(n.texParameteri(R,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(R,n.TEXTURE_COMPARE_FUNC,me[y.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===Ct||y.minFilter!==Dn&&y.minFilter!==Mi||y.type===Yt&&e.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||i.get(y).__currentAnisotropy){const z=e.get("EXT_texture_filter_anisotropic");n.texParameterf(R,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,s.getMaxAnisotropy())),i.get(y).__currentAnisotropy=y.anisotropy}}}function qe(R,y){let z=!1;R.__webglInit===void 0&&(R.__webglInit=!0,y.addEventListener("dispose",g));const X=y.source;let K=f.get(X);K===void 0&&(K={},f.set(X,K));const q=B(y);if(q!==R.__cacheKey){K[q]===void 0&&(K[q]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,z=!0),K[q].usedTimes++;const _e=K[R.__cacheKey];_e!==void 0&&(K[R.__cacheKey].usedTimes--,_e.usedTimes===0&&x(y)),R.__cacheKey=q,R.__webglTexture=K[q].texture}return z}function je(R,y,z){return Math.floor(Math.floor(R/z)/y)}function Ye(R,y,z,X){const q=R.updateRanges;if(q.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,y.width,y.height,z,X,y.data);else{q.sort((Z,ne)=>Z.start-ne.start);let _e=0;for(let Z=1;Z<q.length;Z++){const ne=q[_e],Te=q[Z],we=ne.start+ne.count,he=je(Te.start,y.width,4),Re=je(ne.start,y.width,4);Te.start<=we+1&&he===Re&&je(Te.start+Te.count-1,y.width,4)===he?ne.count=Math.max(ne.count,Te.start+Te.count-ne.start):(++_e,q[_e]=Te)}q.length=_e+1;const oe=n.getParameter(n.UNPACK_ROW_LENGTH),Me=n.getParameter(n.UNPACK_SKIP_PIXELS),ge=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,y.width);for(let Z=0,ne=q.length;Z<ne;Z++){const Te=q[Z],we=Math.floor(Te.start/4),he=Math.ceil(Te.count/4),Re=we%y.width,U=Math.floor(we/y.width),ce=he,se=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,Re),n.pixelStorei(n.UNPACK_SKIP_ROWS,U),t.texSubImage2D(n.TEXTURE_2D,0,Re,U,ce,se,z,X,y.data)}R.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,oe),n.pixelStorei(n.UNPACK_SKIP_PIXELS,Me),n.pixelStorei(n.UNPACK_SKIP_ROWS,ge)}}function j(R,y,z){let X=n.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(X=n.TEXTURE_2D_ARRAY),y.isData3DTexture&&(X=n.TEXTURE_3D);const K=qe(R,y),q=y.source;t.bindTexture(X,R.__webglTexture,n.TEXTURE0+z);const _e=i.get(q);if(q.version!==_e.__version||K===!0){t.activeTexture(n.TEXTURE0+z);const oe=We.getPrimaries(We.workingColorSpace),Me=y.colorSpace===li?null:We.getPrimaries(y.colorSpace),ge=y.colorSpace===li||oe===Me?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,y.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,y.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ge);let Z=b(y.image,!1,s.maxTextureSize);Z=be(y,Z);const ne=r.convert(y.format,y.colorSpace),Te=r.convert(y.type);let we=S(y.internalFormat,ne,Te,y.colorSpace,y.isVideoTexture);Oe(X,y);let he;const Re=y.mipmaps,U=y.isVideoTexture!==!0,ce=_e.__version===void 0||K===!0,se=q.dataReady,re=P(y,Z);if(y.isDepthTexture)we=E(y.format===dn,y.type),ce&&(U?t.texStorage2D(n.TEXTURE_2D,1,we,Z.width,Z.height):t.texImage2D(n.TEXTURE_2D,0,we,Z.width,Z.height,0,ne,Te,null));else if(y.isDataTexture)if(Re.length>0){U&&ce&&t.texStorage2D(n.TEXTURE_2D,re,we,Re[0].width,Re[0].height);for(let ee=0,$=Re.length;ee<$;ee++)he=Re[ee],U?se&&t.texSubImage2D(n.TEXTURE_2D,ee,0,0,he.width,he.height,ne,Te,he.data):t.texImage2D(n.TEXTURE_2D,ee,we,he.width,he.height,0,ne,Te,he.data);y.generateMipmaps=!1}else U?(ce&&t.texStorage2D(n.TEXTURE_2D,re,we,Z.width,Z.height),se&&Ye(y,Z,ne,Te)):t.texImage2D(n.TEXTURE_2D,0,we,Z.width,Z.height,0,ne,Te,Z.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){U&&ce&&t.texStorage3D(n.TEXTURE_2D_ARRAY,re,we,Re[0].width,Re[0].height,Z.depth);for(let ee=0,$=Re.length;ee<$;ee++)if(he=Re[ee],y.format!==kt)if(ne!==null)if(U){if(se)if(y.layerUpdates.size>0){const fe=Qo(he.width,he.height,y.format,y.type);for(const Ce of y.layerUpdates){const st=he.data.subarray(Ce*fe/he.data.BYTES_PER_ELEMENT,(Ce+1)*fe/he.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ee,0,0,Ce,he.width,he.height,1,ne,st)}y.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ee,0,0,0,he.width,he.height,Z.depth,ne,he.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ee,we,he.width,he.height,Z.depth,0,he.data,0,0);else Pe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else U?se&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,ee,0,0,0,he.width,he.height,Z.depth,ne,Te,he.data):t.texImage3D(n.TEXTURE_2D_ARRAY,ee,we,he.width,he.height,Z.depth,0,ne,Te,he.data)}else{U&&ce&&t.texStorage2D(n.TEXTURE_2D,re,we,Re[0].width,Re[0].height);for(let ee=0,$=Re.length;ee<$;ee++)he=Re[ee],y.format!==kt?ne!==null?U?se&&t.compressedTexSubImage2D(n.TEXTURE_2D,ee,0,0,he.width,he.height,ne,he.data):t.compressedTexImage2D(n.TEXTURE_2D,ee,we,he.width,he.height,0,he.data):Pe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):U?se&&t.texSubImage2D(n.TEXTURE_2D,ee,0,0,he.width,he.height,ne,Te,he.data):t.texImage2D(n.TEXTURE_2D,ee,we,he.width,he.height,0,ne,Te,he.data)}else if(y.isDataArrayTexture)if(U){if(ce&&t.texStorage3D(n.TEXTURE_2D_ARRAY,re,we,Z.width,Z.height,Z.depth),se)if(y.layerUpdates.size>0){const ee=Qo(Z.width,Z.height,y.format,y.type);for(const $ of y.layerUpdates){const fe=Z.data.subarray($*ee/Z.data.BYTES_PER_ELEMENT,($+1)*ee/Z.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,$,Z.width,Z.height,1,ne,Te,fe)}y.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,Z.width,Z.height,Z.depth,ne,Te,Z.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,we,Z.width,Z.height,Z.depth,0,ne,Te,Z.data);else if(y.isData3DTexture)U?(ce&&t.texStorage3D(n.TEXTURE_3D,re,we,Z.width,Z.height,Z.depth),se&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,Z.width,Z.height,Z.depth,ne,Te,Z.data)):t.texImage3D(n.TEXTURE_3D,0,we,Z.width,Z.height,Z.depth,0,ne,Te,Z.data);else if(y.isFramebufferTexture){if(ce)if(U)t.texStorage2D(n.TEXTURE_2D,re,we,Z.width,Z.height);else{let ee=Z.width,$=Z.height;for(let fe=0;fe<re;fe++)t.texImage2D(n.TEXTURE_2D,fe,we,ee,$,0,ne,Te,null),ee>>=1,$>>=1}}else if(Re.length>0){if(U&&ce){const ee=Ie(Re[0]);t.texStorage2D(n.TEXTURE_2D,re,we,ee.width,ee.height)}for(let ee=0,$=Re.length;ee<$;ee++)he=Re[ee],U?se&&t.texSubImage2D(n.TEXTURE_2D,ee,0,0,ne,Te,he):t.texImage2D(n.TEXTURE_2D,ee,we,ne,Te,he);y.generateMipmaps=!1}else if(U){if(ce){const ee=Ie(Z);t.texStorage2D(n.TEXTURE_2D,re,we,ee.width,ee.height)}se&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,ne,Te,Z)}else t.texImage2D(n.TEXTURE_2D,0,we,ne,Te,Z);m(y)&&d(X),_e.__version=q.version,y.onUpdate&&y.onUpdate(y)}R.__version=y.version}function J(R,y,z){if(y.image.length!==6)return;const X=qe(R,y),K=y.source;t.bindTexture(n.TEXTURE_CUBE_MAP,R.__webglTexture,n.TEXTURE0+z);const q=i.get(K);if(K.version!==q.__version||X===!0){t.activeTexture(n.TEXTURE0+z);const _e=We.getPrimaries(We.workingColorSpace),oe=y.colorSpace===li?null:We.getPrimaries(y.colorSpace),Me=y.colorSpace===li||_e===oe?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,y.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,y.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Me);const ge=y.isCompressedTexture||y.image[0].isCompressedTexture,Z=y.image[0]&&y.image[0].isDataTexture,ne=[];for(let $=0;$<6;$++)!ge&&!Z?ne[$]=b(y.image[$],!0,s.maxCubemapSize):ne[$]=Z?y.image[$].image:y.image[$],ne[$]=be(y,ne[$]);const Te=ne[0],we=r.convert(y.format,y.colorSpace),he=r.convert(y.type),Re=S(y.internalFormat,we,he,y.colorSpace),U=y.isVideoTexture!==!0,ce=q.__version===void 0||X===!0,se=K.dataReady;let re=P(y,Te);Oe(n.TEXTURE_CUBE_MAP,y);let ee;if(ge){U&&ce&&t.texStorage2D(n.TEXTURE_CUBE_MAP,re,Re,Te.width,Te.height);for(let $=0;$<6;$++){ee=ne[$].mipmaps;for(let fe=0;fe<ee.length;fe++){const Ce=ee[fe];y.format!==kt?we!==null?U?se&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,fe,0,0,Ce.width,Ce.height,we,Ce.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,fe,Re,Ce.width,Ce.height,0,Ce.data):Pe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):U?se&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,fe,0,0,Ce.width,Ce.height,we,he,Ce.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,fe,Re,Ce.width,Ce.height,0,we,he,Ce.data)}}}else{if(ee=y.mipmaps,U&&ce){ee.length>0&&re++;const $=Ie(ne[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,re,Re,$.width,$.height)}for(let $=0;$<6;$++)if(Z){U?se&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,ne[$].width,ne[$].height,we,he,ne[$].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,Re,ne[$].width,ne[$].height,0,we,he,ne[$].data);for(let fe=0;fe<ee.length;fe++){const st=ee[fe].image[$].image;U?se&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,fe+1,0,0,st.width,st.height,we,he,st.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,fe+1,Re,st.width,st.height,0,we,he,st.data)}}else{U?se&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,we,he,ne[$]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,Re,we,he,ne[$]);for(let fe=0;fe<ee.length;fe++){const Ce=ee[fe];U?se&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,fe+1,0,0,we,he,Ce.image[$]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,fe+1,Re,we,he,Ce.image[$])}}}m(y)&&d(n.TEXTURE_CUBE_MAP),q.__version=K.version,y.onUpdate&&y.onUpdate(y)}R.__version=y.version}function de(R,y,z,X,K,q){const _e=r.convert(z.format,z.colorSpace),oe=r.convert(z.type),Me=S(z.internalFormat,_e,oe,z.colorSpace),ge=i.get(y),Z=i.get(z);if(Z.__renderTarget=y,!ge.__hasExternalTextures){const ne=Math.max(1,y.width>>q),Te=Math.max(1,y.height>>q);K===n.TEXTURE_3D||K===n.TEXTURE_2D_ARRAY?t.texImage3D(K,q,Me,ne,Te,y.depth,0,_e,oe,null):t.texImage2D(K,q,Me,ne,Te,0,_e,oe,null)}t.bindFramebuffer(n.FRAMEBUFFER,R),xe(y)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,X,K,Z.__webglTexture,0,nt(y)):(K===n.TEXTURE_2D||K>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,X,K,Z.__webglTexture,q),t.bindFramebuffer(n.FRAMEBUFFER,null)}function De(R,y,z){if(n.bindRenderbuffer(n.RENDERBUFFER,R),y.depthBuffer){const X=y.depthTexture,K=X&&X.isDepthTexture?X.type:null,q=E(y.stencilBuffer,K),_e=y.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,oe=nt(y);xe(y)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,oe,q,y.width,y.height):z?n.renderbufferStorageMultisample(n.RENDERBUFFER,oe,q,y.width,y.height):n.renderbufferStorage(n.RENDERBUFFER,q,y.width,y.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,_e,n.RENDERBUFFER,R)}else{const X=y.textures;for(let K=0;K<X.length;K++){const q=X[K],_e=r.convert(q.format,q.colorSpace),oe=r.convert(q.type),Me=S(q.internalFormat,_e,oe,q.colorSpace),ge=nt(y);z&&xe(y)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,ge,Me,y.width,y.height):xe(y)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ge,Me,y.width,y.height):n.renderbufferStorage(n.RENDERBUFFER,Me,y.width,y.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function ve(R,y){if(y&&y.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,R),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const X=i.get(y.depthTexture);X.__renderTarget=y,(!X.__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),G(y.depthTexture,0);const K=X.__webglTexture,q=nt(y);if(y.depthTexture.format===un)xe(y)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,K,0,q):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,K,0);else if(y.depthTexture.format===dn)xe(y)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,K,0,q):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,K,0);else throw new Error("Unknown depthTexture format")}function ze(R){const y=i.get(R),z=R.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==R.depthTexture){const X=R.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),X){const K=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,X.removeEventListener("dispose",K)};X.addEventListener("dispose",K),y.__depthDisposeCallback=K}y.__boundDepthTexture=X}if(R.depthTexture&&!y.__autoAllocateDepthBuffer){if(z)throw new Error("target.depthTexture not supported in Cube render targets");const X=R.texture.mipmaps;X&&X.length>0?ve(y.__webglFramebuffer[0],R):ve(y.__webglFramebuffer,R)}else if(z){y.__webglDepthbuffer=[];for(let X=0;X<6;X++)if(t.bindFramebuffer(n.FRAMEBUFFER,y.__webglFramebuffer[X]),y.__webglDepthbuffer[X]===void 0)y.__webglDepthbuffer[X]=n.createRenderbuffer(),De(y.__webglDepthbuffer[X],R,!1);else{const K=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,q=y.__webglDepthbuffer[X];n.bindRenderbuffer(n.RENDERBUFFER,q),n.framebufferRenderbuffer(n.FRAMEBUFFER,K,n.RENDERBUFFER,q)}}else{const X=R.texture.mipmaps;if(X&&X.length>0?t.bindFramebuffer(n.FRAMEBUFFER,y.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=n.createRenderbuffer(),De(y.__webglDepthbuffer,R,!1);else{const K=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,q=y.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,q),n.framebufferRenderbuffer(n.FRAMEBUFFER,K,n.RENDERBUFFER,q)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function _t(R,y,z){const X=i.get(R);y!==void 0&&de(X.__webglFramebuffer,R,R.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),z!==void 0&&ze(R)}function Be(R){const y=R.texture,z=i.get(R),X=i.get(y);R.addEventListener("dispose",T);const K=R.textures,q=R.isWebGLCubeRenderTarget===!0,_e=K.length>1;if(_e||(X.__webglTexture===void 0&&(X.__webglTexture=n.createTexture()),X.__version=y.version,o.memory.textures++),q){z.__webglFramebuffer=[];for(let oe=0;oe<6;oe++)if(y.mipmaps&&y.mipmaps.length>0){z.__webglFramebuffer[oe]=[];for(let Me=0;Me<y.mipmaps.length;Me++)z.__webglFramebuffer[oe][Me]=n.createFramebuffer()}else z.__webglFramebuffer[oe]=n.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){z.__webglFramebuffer=[];for(let oe=0;oe<y.mipmaps.length;oe++)z.__webglFramebuffer[oe]=n.createFramebuffer()}else z.__webglFramebuffer=n.createFramebuffer();if(_e)for(let oe=0,Me=K.length;oe<Me;oe++){const ge=i.get(K[oe]);ge.__webglTexture===void 0&&(ge.__webglTexture=n.createTexture(),o.memory.textures++)}if(R.samples>0&&xe(R)===!1){z.__webglMultisampledFramebuffer=n.createFramebuffer(),z.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let oe=0;oe<K.length;oe++){const Me=K[oe];z.__webglColorRenderbuffer[oe]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,z.__webglColorRenderbuffer[oe]);const ge=r.convert(Me.format,Me.colorSpace),Z=r.convert(Me.type),ne=S(Me.internalFormat,ge,Z,Me.colorSpace,R.isXRRenderTarget===!0),Te=nt(R);n.renderbufferStorageMultisample(n.RENDERBUFFER,Te,ne,R.width,R.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+oe,n.RENDERBUFFER,z.__webglColorRenderbuffer[oe])}n.bindRenderbuffer(n.RENDERBUFFER,null),R.depthBuffer&&(z.__webglDepthRenderbuffer=n.createRenderbuffer(),De(z.__webglDepthRenderbuffer,R,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(q){t.bindTexture(n.TEXTURE_CUBE_MAP,X.__webglTexture),Oe(n.TEXTURE_CUBE_MAP,y);for(let oe=0;oe<6;oe++)if(y.mipmaps&&y.mipmaps.length>0)for(let Me=0;Me<y.mipmaps.length;Me++)de(z.__webglFramebuffer[oe][Me],R,y,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Me);else de(z.__webglFramebuffer[oe],R,y,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0);m(y)&&d(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(_e){for(let oe=0,Me=K.length;oe<Me;oe++){const ge=K[oe],Z=i.get(ge);let ne=n.TEXTURE_2D;(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(ne=R.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ne,Z.__webglTexture),Oe(ne,ge),de(z.__webglFramebuffer,R,ge,n.COLOR_ATTACHMENT0+oe,ne,0),m(ge)&&d(ne)}t.unbindTexture()}else{let oe=n.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(oe=R.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(oe,X.__webglTexture),Oe(oe,y),y.mipmaps&&y.mipmaps.length>0)for(let Me=0;Me<y.mipmaps.length;Me++)de(z.__webglFramebuffer[Me],R,y,n.COLOR_ATTACHMENT0,oe,Me);else de(z.__webglFramebuffer,R,y,n.COLOR_ATTACHMENT0,oe,0);m(y)&&d(oe),t.unbindTexture()}R.depthBuffer&&ze(R)}function rt(R){const y=R.textures;for(let z=0,X=y.length;z<X;z++){const K=y[z];if(m(K)){const q=w(R),_e=i.get(K).__webglTexture;t.bindTexture(q,_e),d(q),t.unbindTexture()}}}const L=[],ke=[];function Ve(R){if(R.samples>0){if(xe(R)===!1){const y=R.textures,z=R.width,X=R.height;let K=n.COLOR_BUFFER_BIT;const q=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,_e=i.get(R),oe=y.length>1;if(oe)for(let ge=0;ge<y.length;ge++)t.bindFramebuffer(n.FRAMEBUFFER,_e.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ge,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,_e.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ge,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,_e.__webglMultisampledFramebuffer);const Me=R.texture.mipmaps;Me&&Me.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,_e.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,_e.__webglFramebuffer);for(let ge=0;ge<y.length;ge++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(K|=n.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(K|=n.STENCIL_BUFFER_BIT)),oe){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,_e.__webglColorRenderbuffer[ge]);const Z=i.get(y[ge]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Z,0)}n.blitFramebuffer(0,0,z,X,0,0,z,X,K,n.NEAREST),c===!0&&(L.length=0,ke.length=0,L.push(n.COLOR_ATTACHMENT0+ge),R.depthBuffer&&R.resolveDepthBuffer===!1&&(L.push(q),ke.push(q),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,ke)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,L))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),oe)for(let ge=0;ge<y.length;ge++){t.bindFramebuffer(n.FRAMEBUFFER,_e.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ge,n.RENDERBUFFER,_e.__webglColorRenderbuffer[ge]);const Z=i.get(y[ge]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,_e.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ge,n.TEXTURE_2D,Z,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,_e.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&c){const y=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[y])}}}function nt(R){return Math.min(s.maxSamples,R.samples)}function xe(R){const y=i.get(R);return R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function at(R){const y=o.render.frame;h.get(R)!==y&&(h.set(R,y),R.update())}function be(R,y){const z=R.colorSpace,X=R.format,K=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||z!==Gi&&z!==li&&(We.getTransfer(z)===Ke?(X!==kt||K!==$t)&&Pe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):lt("WebGLTextures: Unsupported texture color space:",z)),y}function Ie(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(l.width=R.naturalWidth||R.width,l.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(l.width=R.displayWidth,l.height=R.displayHeight):(l.width=R.width,l.height=R.height),l}this.allocateTextureUnit=I,this.resetTextureUnits=D,this.setTexture2D=G,this.setTexture2DArray=H,this.setTexture3D=Q,this.setTextureCube=W,this.rebindTextures=_t,this.setupRenderTarget=Be,this.updateRenderTargetMipmap=rt,this.updateMultisampleRenderTarget=Ve,this.setupDepthRenderbuffer=ze,this.setupFrameBufferTexture=de,this.useMultisampledRTT=xe}function Nl(n,e){function t(i,s=li){let r;const o=We.getTransfer(s);if(i===$t)return n.UNSIGNED_BYTE;if(i===br)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Mr)return n.UNSIGNED_SHORT_5_5_5_1;if(i===za)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===ka)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Oa)return n.BYTE;if(i===Ba)return n.SHORT;if(i===ln)return n.UNSIGNED_SHORT;if(i===yr)return n.INT;if(i===wi)return n.UNSIGNED_INT;if(i===Yt)return n.FLOAT;if(i===Hi)return n.HALF_FLOAT;if(i===Va)return n.ALPHA;if(i===Ga)return n.RGB;if(i===kt)return n.RGBA;if(i===un)return n.DEPTH_COMPONENT;if(i===dn)return n.DEPTH_STENCIL;if(i===Sr)return n.RED;if(i===wr)return n.RED_INTEGER;if(i===Er)return n.RG;if(i===Tr)return n.RG_INTEGER;if(i===Ar)return n.RGBA_INTEGER;if(i===Nn||i===Fn||i===On||i===Bn)if(o===Ke)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Nn)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Fn)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===On)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Bn)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Nn)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Fn)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===On)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Bn)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Bs||i===zs||i===ks||i===Vs)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Bs)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===zs)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===ks)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Vs)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Gs||i===Hs||i===Ws)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Gs||i===Hs)return o===Ke?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Ws)return o===Ke?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===qs||i===Xs||i===Ys||i===js||i===$s||i===Ks||i===Js||i===Zs||i===Qs||i===er||i===tr||i===ir||i===nr||i===sr)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===qs)return o===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Xs)return o===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Ys)return o===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===js)return o===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===$s)return o===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Ks)return o===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Js)return o===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Zs)return o===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Qs)return o===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===er)return o===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===tr)return o===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===ir)return o===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===nr)return o===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===sr)return o===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===rr||i===ar||i===or)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===rr)return o===Ke?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===ar)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===or)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===cr||i===lr||i===hr||i===ur)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===cr)return r.COMPRESSED_RED_RGTC1_EXT;if(i===lr)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===hr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===ur)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===hn?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const Im=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Dm=`
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

}`;class Lm{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new eo(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new ii({vertexShader:Im,fragmentShader:Dm,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Kt(new qn(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Um extends Wi{constructor(e,t){super();const i=this;let s=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,f=null,p=null,v=null;const b=typeof XRWebGLBinding<"u",m=new Lm,d={},w=t.getContextAttributes();let S=null,E=null;const P=[],g=[],T=new Fe;let C=null;const x=new Rt;x.viewport=new Je;const _=new Rt;_.viewport=new Je;const A=[x,_],D=new Cl;let I=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let J=P[j];return J===void 0&&(J=new Ms,P[j]=J),J.getTargetRaySpace()},this.getControllerGrip=function(j){let J=P[j];return J===void 0&&(J=new Ms,P[j]=J),J.getGripSpace()},this.getHand=function(j){let J=P[j];return J===void 0&&(J=new Ms,P[j]=J),J.getHandSpace()};function G(j){const J=g.indexOf(j.inputSource);if(J===-1)return;const de=P[J];de!==void 0&&(de.update(j.inputSource,j.frame,l||o),de.dispatchEvent({type:j.type,data:j.inputSource}))}function H(){s.removeEventListener("select",G),s.removeEventListener("selectstart",G),s.removeEventListener("selectend",G),s.removeEventListener("squeeze",G),s.removeEventListener("squeezestart",G),s.removeEventListener("squeezeend",G),s.removeEventListener("end",H),s.removeEventListener("inputsourceschange",Q);for(let j=0;j<P.length;j++){const J=g[j];J!==null&&(g[j]=null,P[j].disconnect(J))}I=null,B=null,m.reset();for(const j in d)delete d[j];e.setRenderTarget(S),p=null,f=null,u=null,s=null,E=null,Ye.stop(),i.isPresenting=!1,e.setPixelRatio(C),e.setSize(T.width,T.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){r=j,i.isPresenting===!0&&Pe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){a=j,i.isPresenting===!0&&Pe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(j){l=j},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return u===null&&b&&(u=new XRWebGLBinding(s,t)),u},this.getFrame=function(){return v},this.getSession=function(){return s},this.setSession=async function(j){if(s=j,s!==null){if(S=e.getRenderTarget(),s.addEventListener("select",G),s.addEventListener("selectstart",G),s.addEventListener("selectend",G),s.addEventListener("squeeze",G),s.addEventListener("squeezestart",G),s.addEventListener("squeezeend",G),s.addEventListener("end",H),s.addEventListener("inputsourceschange",Q),w.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(T),b&&"createProjectionLayer"in XRWebGLBinding.prototype){let de=null,De=null,ve=null;w.depth&&(ve=w.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,de=w.stencil?dn:un,De=w.stencil?hn:wi);const ze={colorFormat:t.RGBA8,depthFormat:ve,scaleFactor:r};u=this.getBinding(),f=u.createProjectionLayer(ze),s.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),E=new Ei(f.textureWidth,f.textureHeight,{format:kt,type:$t,depthTexture:new Qa(f.textureWidth,f.textureHeight,De,void 0,void 0,void 0,void 0,void 0,void 0,de),stencilBuffer:w.stencil,colorSpace:e.outputColorSpace,samples:w.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const de={antialias:w.antialias,alpha:!0,depth:w.depth,stencil:w.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,t,de),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),E=new Ei(p.framebufferWidth,p.framebufferHeight,{format:kt,type:$t,colorSpace:e.outputColorSpace,stencilBuffer:w.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}E.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),Ye.setContext(s),Ye.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function Q(j){for(let J=0;J<j.removed.length;J++){const de=j.removed[J],De=g.indexOf(de);De>=0&&(g[De]=null,P[De].disconnect(de))}for(let J=0;J<j.added.length;J++){const de=j.added[J];let De=g.indexOf(de);if(De===-1){for(let ze=0;ze<P.length;ze++)if(ze>=g.length){g.push(de),De=ze;break}else if(g[ze]===null){g[ze]=de,De=ze;break}if(De===-1)break}const ve=P[De];ve&&ve.connect(de)}}const W=new F,Y=new F;function te(j,J,de){W.setFromMatrixPosition(J.matrixWorld),Y.setFromMatrixPosition(de.matrixWorld);const De=W.distanceTo(Y),ve=J.projectionMatrix.elements,ze=de.projectionMatrix.elements,_t=ve[14]/(ve[10]-1),Be=ve[14]/(ve[10]+1),rt=(ve[9]+1)/ve[5],L=(ve[9]-1)/ve[5],ke=(ve[8]-1)/ve[0],Ve=(ze[8]+1)/ze[0],nt=_t*ke,xe=_t*Ve,at=De/(-ke+Ve),be=at*-ke;if(J.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(be),j.translateZ(at),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert(),ve[10]===-1)j.projectionMatrix.copy(J.projectionMatrix),j.projectionMatrixInverse.copy(J.projectionMatrixInverse);else{const Ie=_t+at,R=Be+at,y=nt-be,z=xe+(De-be),X=rt*Be/R*Ie,K=L*Be/R*Ie;j.projectionMatrix.makePerspective(y,z,X,K,Ie,R),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}}function me(j,J){J===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(J.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(s===null)return;let J=j.near,de=j.far;m.texture!==null&&(m.depthNear>0&&(J=m.depthNear),m.depthFar>0&&(de=m.depthFar)),D.near=_.near=x.near=J,D.far=_.far=x.far=de,(I!==D.near||B!==D.far)&&(s.updateRenderState({depthNear:D.near,depthFar:D.far}),I=D.near,B=D.far),D.layers.mask=j.layers.mask|6,x.layers.mask=D.layers.mask&3,_.layers.mask=D.layers.mask&5;const De=j.parent,ve=D.cameras;me(D,De);for(let ze=0;ze<ve.length;ze++)me(ve[ze],De);ve.length===2?te(D,x,_):D.projectionMatrix.copy(x.projectionMatrix),Oe(j,D,De)};function Oe(j,J,de){de===null?j.matrix.copy(J.matrixWorld):(j.matrix.copy(de.matrixWorld),j.matrix.invert(),j.matrix.multiply(J.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(J.projectionMatrix),j.projectionMatrixInverse.copy(J.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=fr*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return D},this.getFoveation=function(){if(!(f===null&&p===null))return c},this.setFoveation=function(j){c=j,f!==null&&(f.fixedFoveation=j),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=j)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(D)},this.getCameraTexture=function(j){return d[j]};let qe=null;function je(j,J){if(h=J.getViewerPose(l||o),v=J,h!==null){const de=h.views;p!==null&&(e.setRenderTargetFramebuffer(E,p.framebuffer),e.setRenderTarget(E));let De=!1;de.length!==D.cameras.length&&(D.cameras.length=0,De=!0);for(let Be=0;Be<de.length;Be++){const rt=de[Be];let L=null;if(p!==null)L=p.getViewport(rt);else{const Ve=u.getViewSubImage(f,rt);L=Ve.viewport,Be===0&&(e.setRenderTargetTextures(E,Ve.colorTexture,Ve.depthStencilTexture),e.setRenderTarget(E))}let ke=A[Be];ke===void 0&&(ke=new Rt,ke.layers.enable(Be),ke.viewport=new Je,A[Be]=ke),ke.matrix.fromArray(rt.transform.matrix),ke.matrix.decompose(ke.position,ke.quaternion,ke.scale),ke.projectionMatrix.fromArray(rt.projectionMatrix),ke.projectionMatrixInverse.copy(ke.projectionMatrix).invert(),ke.viewport.set(L.x,L.y,L.width,L.height),Be===0&&(D.matrix.copy(ke.matrix),D.matrix.decompose(D.position,D.quaternion,D.scale)),De===!0&&D.cameras.push(ke)}const ve=s.enabledFeatures;if(ve&&ve.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&b){u=i.getBinding();const Be=u.getDepthInformation(de[0]);Be&&Be.isValid&&Be.texture&&m.init(Be,s.renderState)}if(ve&&ve.includes("camera-access")&&b){e.state.unbindTexture(),u=i.getBinding();for(let Be=0;Be<de.length;Be++){const rt=de[Be].camera;if(rt){let L=d[rt];L||(L=new eo,d[rt]=L);const ke=u.getCameraImage(rt);L.sourceTexture=ke}}}}for(let de=0;de<P.length;de++){const De=g[de],ve=P[de];De!==null&&ve!==void 0&&ve.update(De,J,l||o)}qe&&qe(j,J),J.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:J}),v=null}const Ye=new Pl;Ye.setAnimationLoop(je),this.setAnimationLoop=function(j){qe=j},this.dispose=function(){}}}const Ni=new Vt,Nm=new Ze;function Fm(n,e){function t(m,d){m.matrixAutoUpdate===!0&&m.updateMatrix(),d.value.copy(m.matrix)}function i(m,d){d.color.getRGB(m.fogColor.value,yl(n)),d.isFog?(m.fogNear.value=d.near,m.fogFar.value=d.far):d.isFogExp2&&(m.fogDensity.value=d.density)}function s(m,d,w,S,E){d.isMeshBasicMaterial||d.isMeshLambertMaterial?r(m,d):d.isMeshToonMaterial?(r(m,d),u(m,d)):d.isMeshPhongMaterial?(r(m,d),h(m,d)):d.isMeshStandardMaterial?(r(m,d),f(m,d),d.isMeshPhysicalMaterial&&p(m,d,E)):d.isMeshMatcapMaterial?(r(m,d),v(m,d)):d.isMeshDepthMaterial?r(m,d):d.isMeshDistanceMaterial?(r(m,d),b(m,d)):d.isMeshNormalMaterial?r(m,d):d.isLineBasicMaterial?(o(m,d),d.isLineDashedMaterial&&a(m,d)):d.isPointsMaterial?c(m,d,w,S):d.isSpriteMaterial?l(m,d):d.isShadowMaterial?(m.color.value.copy(d.color),m.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(m,d){m.opacity.value=d.opacity,d.color&&m.diffuse.value.copy(d.color),d.emissive&&m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(m.map.value=d.map,t(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.bumpMap&&(m.bumpMap.value=d.bumpMap,t(d.bumpMap,m.bumpMapTransform),m.bumpScale.value=d.bumpScale,d.side===wt&&(m.bumpScale.value*=-1)),d.normalMap&&(m.normalMap.value=d.normalMap,t(d.normalMap,m.normalMapTransform),m.normalScale.value.copy(d.normalScale),d.side===wt&&m.normalScale.value.negate()),d.displacementMap&&(m.displacementMap.value=d.displacementMap,t(d.displacementMap,m.displacementMapTransform),m.displacementScale.value=d.displacementScale,m.displacementBias.value=d.displacementBias),d.emissiveMap&&(m.emissiveMap.value=d.emissiveMap,t(d.emissiveMap,m.emissiveMapTransform)),d.specularMap&&(m.specularMap.value=d.specularMap,t(d.specularMap,m.specularMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);const w=e.get(d),S=w.envMap,E=w.envMapRotation;S&&(m.envMap.value=S,Ni.copy(E),Ni.x*=-1,Ni.y*=-1,Ni.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(Ni.y*=-1,Ni.z*=-1),m.envMapRotation.value.setFromMatrix4(Nm.makeRotationFromEuler(Ni)),m.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=d.reflectivity,m.ior.value=d.ior,m.refractionRatio.value=d.refractionRatio),d.lightMap&&(m.lightMap.value=d.lightMap,m.lightMapIntensity.value=d.lightMapIntensity,t(d.lightMap,m.lightMapTransform)),d.aoMap&&(m.aoMap.value=d.aoMap,m.aoMapIntensity.value=d.aoMapIntensity,t(d.aoMap,m.aoMapTransform))}function o(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,d.map&&(m.map.value=d.map,t(d.map,m.mapTransform))}function a(m,d){m.dashSize.value=d.dashSize,m.totalSize.value=d.dashSize+d.gapSize,m.scale.value=d.scale}function c(m,d,w,S){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.size.value=d.size*w,m.scale.value=S*.5,d.map&&(m.map.value=d.map,t(d.map,m.uvTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function l(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.rotation.value=d.rotation,d.map&&(m.map.value=d.map,t(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function h(m,d){m.specular.value.copy(d.specular),m.shininess.value=Math.max(d.shininess,1e-4)}function u(m,d){d.gradientMap&&(m.gradientMap.value=d.gradientMap)}function f(m,d){m.metalness.value=d.metalness,d.metalnessMap&&(m.metalnessMap.value=d.metalnessMap,t(d.metalnessMap,m.metalnessMapTransform)),m.roughness.value=d.roughness,d.roughnessMap&&(m.roughnessMap.value=d.roughnessMap,t(d.roughnessMap,m.roughnessMapTransform)),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)}function p(m,d,w){m.ior.value=d.ior,d.sheen>0&&(m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),m.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(m.sheenColorMap.value=d.sheenColorMap,t(d.sheenColorMap,m.sheenColorMapTransform)),d.sheenRoughnessMap&&(m.sheenRoughnessMap.value=d.sheenRoughnessMap,t(d.sheenRoughnessMap,m.sheenRoughnessMapTransform))),d.clearcoat>0&&(m.clearcoat.value=d.clearcoat,m.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(m.clearcoatMap.value=d.clearcoatMap,t(d.clearcoatMap,m.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,t(d.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(m.clearcoatNormalMap.value=d.clearcoatNormalMap,t(d.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===wt&&m.clearcoatNormalScale.value.negate())),d.dispersion>0&&(m.dispersion.value=d.dispersion),d.iridescence>0&&(m.iridescence.value=d.iridescence,m.iridescenceIOR.value=d.iridescenceIOR,m.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(m.iridescenceMap.value=d.iridescenceMap,t(d.iridescenceMap,m.iridescenceMapTransform)),d.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=d.iridescenceThicknessMap,t(d.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),d.transmission>0&&(m.transmission.value=d.transmission,m.transmissionSamplerMap.value=w.texture,m.transmissionSamplerSize.value.set(w.width,w.height),d.transmissionMap&&(m.transmissionMap.value=d.transmissionMap,t(d.transmissionMap,m.transmissionMapTransform)),m.thickness.value=d.thickness,d.thicknessMap&&(m.thicknessMap.value=d.thicknessMap,t(d.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=d.attenuationDistance,m.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(m.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(m.anisotropyMap.value=d.anisotropyMap,t(d.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=d.specularIntensity,m.specularColor.value.copy(d.specularColor),d.specularColorMap&&(m.specularColorMap.value=d.specularColorMap,t(d.specularColorMap,m.specularColorMapTransform)),d.specularIntensityMap&&(m.specularIntensityMap.value=d.specularIntensityMap,t(d.specularIntensityMap,m.specularIntensityMapTransform))}function v(m,d){d.matcap&&(m.matcap.value=d.matcap)}function b(m,d){const w=e.get(d).light;m.referencePosition.value.setFromMatrixPosition(w.matrixWorld),m.nearDistance.value=w.shadow.camera.near,m.farDistance.value=w.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function Om(n,e,t,i){let s={},r={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(w,S){const E=S.program;i.uniformBlockBinding(w,E)}function l(w,S){let E=s[w.id];E===void 0&&(v(w),E=h(w),s[w.id]=E,w.addEventListener("dispose",m));const P=S.program;i.updateUBOMapping(w,P);const g=e.render.frame;r[w.id]!==g&&(f(w),r[w.id]=g)}function h(w){const S=u();w.__bindingPointIndex=S;const E=n.createBuffer(),P=w.__size,g=w.usage;return n.bindBuffer(n.UNIFORM_BUFFER,E),n.bufferData(n.UNIFORM_BUFFER,P,g),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,S,E),E}function u(){for(let w=0;w<a;w++)if(o.indexOf(w)===-1)return o.push(w),w;return lt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(w){const S=s[w.id],E=w.uniforms,P=w.__cache;n.bindBuffer(n.UNIFORM_BUFFER,S);for(let g=0,T=E.length;g<T;g++){const C=Array.isArray(E[g])?E[g]:[E[g]];for(let x=0,_=C.length;x<_;x++){const A=C[x];if(p(A,g,x,P)===!0){const D=A.__offset,I=Array.isArray(A.value)?A.value:[A.value];let B=0;for(let G=0;G<I.length;G++){const H=I[G],Q=b(H);typeof H=="number"||typeof H=="boolean"?(A.__data[0]=H,n.bufferSubData(n.UNIFORM_BUFFER,D+B,A.__data)):H.isMatrix3?(A.__data[0]=H.elements[0],A.__data[1]=H.elements[1],A.__data[2]=H.elements[2],A.__data[3]=0,A.__data[4]=H.elements[3],A.__data[5]=H.elements[4],A.__data[6]=H.elements[5],A.__data[7]=0,A.__data[8]=H.elements[6],A.__data[9]=H.elements[7],A.__data[10]=H.elements[8],A.__data[11]=0):(H.toArray(A.__data,B),B+=Q.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,D,A.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(w,S,E,P){const g=w.value,T=S+"_"+E;if(P[T]===void 0)return typeof g=="number"||typeof g=="boolean"?P[T]=g:P[T]=g.clone(),!0;{const C=P[T];if(typeof g=="number"||typeof g=="boolean"){if(C!==g)return P[T]=g,!0}else if(C.equals(g)===!1)return C.copy(g),!0}return!1}function v(w){const S=w.uniforms;let E=0;const P=16;for(let T=0,C=S.length;T<C;T++){const x=Array.isArray(S[T])?S[T]:[S[T]];for(let _=0,A=x.length;_<A;_++){const D=x[_],I=Array.isArray(D.value)?D.value:[D.value];for(let B=0,G=I.length;B<G;B++){const H=I[B],Q=b(H),W=E%P,Y=W%Q.boundary,te=W+Y;E+=Y,te!==0&&P-te<Q.storage&&(E+=P-te),D.__data=new Float32Array(Q.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=E,E+=Q.storage}}}const g=E%P;return g>0&&(E+=P-g),w.__size=E,w.__cache={},this}function b(w){const S={boundary:0,storage:0};return typeof w=="number"||typeof w=="boolean"?(S.boundary=4,S.storage=4):w.isVector2?(S.boundary=8,S.storage=8):w.isVector3||w.isColor?(S.boundary=16,S.storage=12):w.isVector4?(S.boundary=16,S.storage=16):w.isMatrix3?(S.boundary=48,S.storage=48):w.isMatrix4?(S.boundary=64,S.storage=64):w.isTexture?Pe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):Pe("WebGLRenderer: Unsupported uniform value type.",w),S}function m(w){const S=w.target;S.removeEventListener("dispose",m);const E=o.indexOf(S.__bindingPointIndex);o.splice(E,1),n.deleteBuffer(s[S.id]),delete s[S.id],delete r[S.id]}function d(){for(const w in s)n.deleteBuffer(s[w]);o=[],s={},r={}}return{bind:c,update:l,dispose:d}}const Bm=new Uint16Array([11481,15204,11534,15171,11808,15015,12385,14843,12894,14716,13396,14600,13693,14483,13976,14366,14237,14171,14405,13961,14511,13770,14605,13598,14687,13444,14760,13305,14822,13066,14876,12857,14923,12675,14963,12517,14997,12379,15025,12230,15049,12023,15070,11843,15086,11687,15100,11551,15111,11433,15120,11330,15127,11217,15132,11060,15135,10922,15138,10801,15139,10695,15139,10600,13012,14923,13020,14917,13064,14886,13176,14800,13349,14666,13513,14526,13724,14398,13960,14230,14200,14020,14383,13827,14488,13651,14583,13491,14667,13348,14740,13132,14803,12908,14856,12713,14901,12542,14938,12394,14968,12241,14992,12017,15010,11822,15024,11654,15034,11507,15041,11380,15044,11269,15044,11081,15042,10913,15037,10764,15031,10635,15023,10520,15014,10419,15003,10330,13657,14676,13658,14673,13670,14660,13698,14622,13750,14547,13834,14442,13956,14317,14112,14093,14291,13889,14407,13704,14499,13538,14586,13389,14664,13201,14733,12966,14792,12758,14842,12577,14882,12418,14915,12272,14940,12033,14959,11826,14972,11646,14980,11490,14983,11355,14983,11212,14979,11008,14971,10830,14961,10675,14950,10540,14936,10420,14923,10315,14909,10204,14894,10041,14089,14460,14090,14459,14096,14452,14112,14431,14141,14388,14186,14305,14252,14130,14341,13941,14399,13756,14467,13585,14539,13430,14610,13272,14677,13026,14737,12808,14790,12617,14833,12449,14869,12303,14896,12065,14916,11845,14929,11655,14937,11490,14939,11347,14936,11184,14930,10970,14921,10783,14912,10621,14900,10480,14885,10356,14867,10247,14848,10062,14827,9894,14805,9745,14400,14208,14400,14206,14402,14198,14406,14174,14415,14122,14427,14035,14444,13913,14469,13767,14504,13613,14548,13463,14598,13324,14651,13082,14704,12858,14752,12658,14795,12483,14831,12330,14860,12106,14881,11875,14895,11675,14903,11501,14905,11351,14903,11178,14900,10953,14892,10757,14880,10589,14865,10442,14847,10313,14827,10162,14805,9965,14782,9792,14757,9642,14731,9507,14562,13883,14562,13883,14563,13877,14566,13862,14570,13830,14576,13773,14584,13689,14595,13582,14613,13461,14637,13336,14668,13120,14704,12897,14741,12695,14776,12516,14808,12358,14835,12150,14856,11910,14870,11701,14878,11519,14882,11361,14884,11187,14880,10951,14871,10748,14858,10572,14842,10418,14823,10286,14801,10099,14777,9897,14751,9722,14725,9567,14696,9430,14666,9309,14702,13604,14702,13604,14702,13600,14703,13591,14705,13570,14707,13533,14709,13477,14712,13400,14718,13305,14727,13106,14743,12907,14762,12716,14784,12539,14807,12380,14827,12190,14844,11943,14855,11727,14863,11539,14870,11376,14871,11204,14868,10960,14858,10748,14845,10565,14829,10406,14809,10269,14786,10058,14761,9852,14734,9671,14705,9512,14674,9374,14641,9253,14608,9076,14821,13366,14821,13365,14821,13364,14821,13358,14821,13344,14821,13320,14819,13252,14817,13145,14815,13011,14814,12858,14817,12698,14823,12539,14832,12389,14841,12214,14850,11968,14856,11750,14861,11558,14866,11390,14867,11226,14862,10972,14853,10754,14840,10565,14823,10401,14803,10259,14780,10032,14754,9820,14725,9635,14694,9473,14661,9333,14627,9203,14593,8988,14557,8798,14923,13014,14922,13014,14922,13012,14922,13004,14920,12987,14919,12957,14915,12907,14909,12834,14902,12738,14894,12623,14888,12498,14883,12370,14880,12203,14878,11970,14875,11759,14873,11569,14874,11401,14872,11243,14865,10986,14855,10762,14842,10568,14825,10401,14804,10255,14781,10017,14754,9799,14725,9611,14692,9445,14658,9301,14623,9139,14587,8920,14548,8729,14509,8562,15008,12672,15008,12672,15008,12671,15007,12667,15005,12656,15001,12637,14997,12605,14989,12556,14978,12490,14966,12407,14953,12313,14940,12136,14927,11934,14914,11742,14903,11563,14896,11401,14889,11247,14879,10992,14866,10767,14851,10570,14833,10400,14812,10252,14789,10007,14761,9784,14731,9592,14698,9424,14663,9279,14627,9088,14588,8868,14548,8676,14508,8508,14467,8360,15080,12386,15080,12386,15079,12385,15078,12383,15076,12378,15072,12367,15066,12347,15057,12315,15045,12253,15030,12138,15012,11998,14993,11845,14972,11685,14951,11530,14935,11383,14920,11228,14904,10981,14887,10762,14870,10567,14850,10397,14827,10248,14803,9997,14774,9771,14743,9578,14710,9407,14674,9259,14637,9048,14596,8826,14555,8632,14514,8464,14471,8317,14427,8182,15139,12008,15139,12008,15138,12008,15137,12007,15135,12003,15130,11990,15124,11969,15115,11929,15102,11872,15086,11794,15064,11693,15041,11581,15013,11459,14987,11336,14966,11170,14944,10944,14921,10738,14898,10552,14875,10387,14850,10239,14824,9983,14794,9758,14762,9563,14728,9392,14692,9244,14653,9014,14611,8791,14569,8597,14526,8427,14481,8281,14436,8110,14391,7885,15188,11617,15188,11617,15187,11617,15186,11618,15183,11617,15179,11612,15173,11601,15163,11581,15150,11546,15133,11495,15110,11427,15083,11346,15051,11246,15024,11057,14996,10868,14967,10687,14938,10517,14911,10362,14882,10206,14853,9956,14821,9737,14787,9543,14752,9375,14715,9228,14675,8980,14632,8760,14589,8565,14544,8395,14498,8248,14451,8049,14404,7824,14357,7630,15228,11298,15228,11298,15227,11299,15226,11301,15223,11303,15219,11302,15213,11299,15204,11290,15191,11271,15174,11217,15150,11129,15119,11015,15087,10886,15057,10744,15024,10599,14990,10455,14957,10318,14924,10143,14891,9911,14856,9701,14820,9516,14782,9352,14744,9200,14703,8946,14659,8725,14615,8533,14568,8366,14521,8220,14472,7992,14423,7770,14374,7578,14315,7408,15260,10819,15260,10819,15259,10822,15258,10826,15256,10832,15251,10836,15246,10841,15237,10838,15225,10821,15207,10788,15183,10734,15151,10660,15120,10571,15087,10469,15049,10359,15012,10249,14974,10041,14937,9837,14900,9647,14860,9475,14820,9320,14779,9147,14736,8902,14691,8688,14646,8499,14598,8335,14549,8189,14499,7940,14448,7720,14397,7529,14347,7363,14256,7218,15285,10410,15285,10411,15285,10413,15284,10418,15282,10425,15278,10434,15272,10442,15264,10449,15252,10445,15235,10433,15210,10403,15179,10358,15149,10301,15113,10218,15073,10059,15033,9894,14991,9726,14951,9565,14909,9413,14865,9273,14822,9073,14777,8845,14730,8641,14682,8459,14633,8300,14583,8129,14531,7883,14479,7670,14426,7482,14373,7321,14305,7176,14201,6939,15305,9939,15305,9940,15305,9945,15304,9955,15302,9967,15298,9989,15293,10010,15286,10033,15274,10044,15258,10045,15233,10022,15205,9975,15174,9903,15136,9808,15095,9697,15053,9578,15009,9451,14965,9327,14918,9198,14871,8973,14825,8766,14775,8579,14725,8408,14675,8259,14622,8058,14569,7821,14515,7615,14460,7435,14405,7276,14350,7108,14256,6866,14149,6653,15321,9444,15321,9445,15321,9448,15320,9458,15317,9470,15314,9490,15310,9515,15302,9540,15292,9562,15276,9579,15251,9577,15226,9559,15195,9519,15156,9463,15116,9389,15071,9304,15025,9208,14978,9023,14927,8838,14878,8661,14827,8496,14774,8344,14722,8206,14667,7973,14612,7749,14556,7555,14499,7382,14443,7229,14385,7025,14322,6791,14210,6588,14100,6409,15333,8920,15333,8921,15332,8927,15332,8943,15329,8965,15326,9002,15322,9048,15316,9106,15307,9162,15291,9204,15267,9221,15244,9221,15212,9196,15175,9134,15133,9043,15088,8930,15040,8801,14990,8665,14938,8526,14886,8391,14830,8261,14775,8087,14719,7866,14661,7664,14603,7482,14544,7322,14485,7178,14426,6936,14367,6713,14281,6517,14166,6348,14054,6198,15341,8360,15341,8361,15341,8366,15341,8379,15339,8399,15336,8431,15332,8473,15326,8527,15318,8585,15302,8632,15281,8670,15258,8690,15227,8690,15191,8664,15149,8612,15104,8543,15055,8456,15001,8360,14948,8259,14892,8122,14834,7923,14776,7734,14716,7558,14656,7397,14595,7250,14534,7070,14472,6835,14410,6628,14350,6443,14243,6283,14125,6135,14010,5889,15348,7715,15348,7717,15348,7725,15347,7745,15345,7780,15343,7836,15339,7905,15334,8e3,15326,8103,15310,8193,15293,8239,15270,8270,15240,8287,15204,8283,15163,8260,15118,8223,15067,8143,15014,8014,14958,7873,14899,7723,14839,7573,14778,7430,14715,7293,14652,7164,14588,6931,14524,6720,14460,6531,14396,6362,14330,6210,14207,6015,14086,5781,13969,5576,15352,7114,15352,7116,15352,7128,15352,7159,15350,7195,15348,7237,15345,7299,15340,7374,15332,7457,15317,7544,15301,7633,15280,7703,15251,7754,15216,7775,15176,7767,15131,7733,15079,7670,15026,7588,14967,7492,14906,7387,14844,7278,14779,7171,14714,6965,14648,6770,14581,6587,14515,6420,14448,6269,14382,6123,14299,5881,14172,5665,14049,5477,13929,5310,15355,6329,15355,6330,15355,6339,15355,6362,15353,6410,15351,6472,15349,6572,15344,6688,15337,6835,15323,6985,15309,7142,15287,7220,15260,7277,15226,7310,15188,7326,15142,7318,15090,7285,15036,7239,14976,7177,14914,7045,14849,6892,14782,6736,14714,6581,14645,6433,14576,6293,14506,6164,14438,5946,14369,5733,14270,5540,14140,5369,14014,5216,13892,5043,15357,5483,15357,5484,15357,5496,15357,5528,15356,5597,15354,5692,15351,5835,15347,6011,15339,6195,15328,6317,15314,6446,15293,6566,15268,6668,15235,6746,15197,6796,15152,6811,15101,6790,15046,6748,14985,6673,14921,6583,14854,6479,14785,6371,14714,6259,14643,6149,14571,5946,14499,5750,14428,5567,14358,5401,14242,5250,14109,5111,13980,4870,13856,4657,15359,4555,15359,4557,15358,4573,15358,4633,15357,4715,15355,4841,15353,5061,15349,5216,15342,5391,15331,5577,15318,5770,15299,5967,15274,6150,15243,6223,15206,6280,15161,6310,15111,6317,15055,6300,14994,6262,14928,6208,14860,6141,14788,5994,14715,5838,14641,5684,14566,5529,14492,5384,14418,5247,14346,5121,14216,4892,14079,4682,13948,4496,13822,4330,15359,3498,15359,3501,15359,3520,15359,3598,15358,3719,15356,3860,15355,4137,15351,4305,15344,4563,15334,4809,15321,5116,15303,5273,15280,5418,15250,5547,15214,5653,15170,5722,15120,5761,15064,5763,15002,5733,14935,5673,14865,5597,14792,5504,14716,5400,14640,5294,14563,5185,14486,5041,14410,4841,14335,4655,14191,4482,14051,4325,13918,4183,13790,4012,15360,2282,15360,2285,15360,2306,15360,2401,15359,2547,15357,2748,15355,3103,15352,3349,15345,3675,15336,4020,15324,4272,15307,4496,15285,4716,15255,4908,15220,5086,15178,5170,15128,5214,15072,5234,15010,5231,14943,5206,14871,5166,14796,5102,14718,4971,14639,4833,14559,4687,14480,4541,14402,4401,14315,4268,14167,4142,14025,3958,13888,3747,13759,3556,15360,923,15360,925,15360,946,15360,1052,15359,1214,15357,1494,15356,1892,15352,2274,15346,2663,15338,3099,15326,3393,15309,3679,15288,3980,15260,4183,15226,4325,15185,4437,15136,4517,15080,4570,15018,4591,14950,4581,14877,4545,14800,4485,14720,4411,14638,4325,14556,4231,14475,4136,14395,3988,14297,3803,14145,3628,13999,3465,13861,3314,13729,3177,15360,263,15360,264,15360,272,15360,325,15359,407,15358,548,15356,780,15352,1144,15347,1580,15339,2099,15328,2425,15312,2795,15292,3133,15264,3329,15232,3517,15191,3689,15143,3819,15088,3923,15025,3978,14956,3999,14882,3979,14804,3931,14722,3855,14639,3756,14554,3645,14470,3529,14388,3409,14279,3289,14124,3173,13975,3055,13834,2848,13701,2658,15360,49,15360,49,15360,52,15360,75,15359,111,15358,201,15356,283,15353,519,15348,726,15340,1045,15329,1415,15314,1795,15295,2173,15269,2410,15237,2649,15197,2866,15150,3054,15095,3140,15032,3196,14963,3228,14888,3236,14808,3224,14725,3191,14639,3146,14553,3088,14466,2976,14382,2836,14262,2692,14103,2549,13952,2409,13808,2278,13674,2154,15360,4,15360,4,15360,4,15360,13,15359,33,15358,59,15357,112,15353,199,15348,302,15341,456,15331,628,15316,827,15297,1082,15272,1332,15241,1601,15202,1851,15156,2069,15101,2172,15039,2256,14970,2314,14894,2348,14813,2358,14728,2344,14640,2311,14551,2263,14463,2203,14376,2133,14247,2059,14084,1915,13930,1761,13784,1609,13648,1464,15360,0,15360,0,15360,0,15360,3,15359,18,15358,26,15357,53,15354,80,15348,97,15341,165,15332,238,15318,326,15299,427,15275,529,15245,654,15207,771,15161,885,15108,994,15046,1089,14976,1170,14900,1229,14817,1266,14731,1284,14641,1282,14550,1260,14460,1223,14370,1174,14232,1116,14066,1050,13909,981,13761,910,13623,839]);let ci=null;function zm(){return ci===null&&(ci=new Za(Bm,32,32,Er,Hi),ci.minFilter=Nt,ci.magFilter=Nt,ci.wrapS=ei,ci.wrapT=ei,ci.generateMipmaps=!1,ci.needsUpdate=!0),ci}class km{constructor(e={}){const{canvas:t=ml(),context:i=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=o;const v=new Set([Ar,Tr,wr]),b=new Set([$t,wi,ln,hn,br,Mr]),m=new Uint32Array(4),d=new Int32Array(4);let w=null,S=null;const E=[],P=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=hi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const g=this;let T=!1;this._outputColorSpace=Ut;let C=0,x=0,_=null,A=-1,D=null;const I=new Je,B=new Je;let G=null;const H=new Ue(0);let Q=0,W=t.width,Y=t.height,te=1,me=null,Oe=null;const qe=new Je(0,0,W,Y),je=new Je(0,0,W,Y);let Ye=!1;const j=new Ir;let J=!1,de=!1;const De=new Ze,ve=new F,ze=new Je,_t={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Be=!1;function rt(){return _===null?te:1}let L=i;function ke(M,N){return t.getContext(M,N)}try{const M={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${_r}`),t.addEventListener("webglcontextlost",ee,!1),t.addEventListener("webglcontextrestored",$,!1),t.addEventListener("webglcontextcreationerror",fe,!1),L===null){const N="webgl2";if(L=ke(N,M),L===null)throw ke(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(M){throw M("WebGLRenderer: "+M.message),M}let Ve,nt,xe,at,be,Ie,R,y,z,X,K,q,_e,oe,Me,ge,Z,ne,Te,we,he,Re,U,ce;function se(){Ve=new $f(L),Ve.init(),Re=new Nl(L,Ve),nt=new kf(L,Ve,e,Re),xe=new Cm(L,Ve),nt.reversedDepthBuffer&&f&&xe.buffers.depth.setReversed(!0),at=new Zf(L),be=new xm,Ie=new Pm(L,Ve,xe,be,nt,Re,at),R=new Gf(g),y=new jf(g),z=new tu(L),U=new Bf(L,z),X=new Kf(L,z,at,U),K=new ep(L,X,z,at),Te=new Qf(L,nt,Ie),ge=new Vf(be),q=new mm(g,R,y,Ve,nt,U,ge),_e=new Fm(g,be),oe=new _m,Me=new wm(Ve),ne=new Of(g,R,y,xe,K,p,c),Z=new Am(g,K,nt),ce=new Om(L,at,nt,xe),we=new zf(L,Ve,at),he=new Jf(L,Ve,at),at.programs=q.programs,g.capabilities=nt,g.extensions=Ve,g.properties=be,g.renderLists=oe,g.shadowMap=Z,g.state=xe,g.info=at}se();const re=new Um(g,L);this.xr=re,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const M=Ve.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){const M=Ve.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return te},this.setPixelRatio=function(M){M!==void 0&&(te=M,this.setSize(W,Y,!1))},this.getSize=function(M){return M.set(W,Y)},this.setSize=function(M,N,k=!0){if(re.isPresenting){Pe("WebGLRenderer: Can't change size while VR device is presenting.");return}W=M,Y=N,t.width=Math.floor(M*te),t.height=Math.floor(N*te),k===!0&&(t.style.width=M+"px",t.style.height=N+"px"),this.setViewport(0,0,M,N)},this.getDrawingBufferSize=function(M){return M.set(W*te,Y*te).floor()},this.setDrawingBufferSize=function(M,N,k){W=M,Y=N,te=k,t.width=Math.floor(M*k),t.height=Math.floor(N*k),this.setViewport(0,0,M,N)},this.getCurrentViewport=function(M){return M.copy(I)},this.getViewport=function(M){return M.copy(qe)},this.setViewport=function(M,N,k,V){M.isVector4?qe.set(M.x,M.y,M.z,M.w):qe.set(M,N,k,V),xe.viewport(I.copy(qe).multiplyScalar(te).round())},this.getScissor=function(M){return M.copy(je)},this.setScissor=function(M,N,k,V){M.isVector4?je.set(M.x,M.y,M.z,M.w):je.set(M,N,k,V),xe.scissor(B.copy(je).multiplyScalar(te).round())},this.getScissorTest=function(){return Ye},this.setScissorTest=function(M){xe.setScissorTest(Ye=M)},this.setOpaqueSort=function(M){me=M},this.setTransparentSort=function(M){Oe=M},this.getClearColor=function(M){return M.copy(ne.getClearColor())},this.setClearColor=function(){ne.setClearColor(...arguments)},this.getClearAlpha=function(){return ne.getClearAlpha()},this.setClearAlpha=function(){ne.setClearAlpha(...arguments)},this.clear=function(M=!0,N=!0,k=!0){let V=0;if(M){let O=!1;if(_!==null){const ie=_.texture.format;O=v.has(ie)}if(O){const ie=_.texture.type,le=b.has(ie),pe=ne.getClearColor(),ue=ne.getClearAlpha(),Ee=pe.r,Ae=pe.g,ye=pe.b;le?(m[0]=Ee,m[1]=Ae,m[2]=ye,m[3]=ue,L.clearBufferuiv(L.COLOR,0,m)):(d[0]=Ee,d[1]=Ae,d[2]=ye,d[3]=ue,L.clearBufferiv(L.COLOR,0,d))}else V|=L.COLOR_BUFFER_BIT}N&&(V|=L.DEPTH_BUFFER_BIT),k&&(V|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),L.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ee,!1),t.removeEventListener("webglcontextrestored",$,!1),t.removeEventListener("webglcontextcreationerror",fe,!1),ne.dispose(),oe.dispose(),Me.dispose(),be.dispose(),R.dispose(),y.dispose(),K.dispose(),U.dispose(),ce.dispose(),q.dispose(),re.dispose(),re.removeEventListener("sessionstart",uo),re.removeEventListener("sessionend",fo),Ri.stop()};function ee(M){M.preventDefault(),Aa("WebGLRenderer: Context Lost."),T=!0}function $(){Aa("WebGLRenderer: Context Restored."),T=!1;const M=at.autoReset,N=Z.enabled,k=Z.autoUpdate,V=Z.needsUpdate,O=Z.type;se(),at.autoReset=M,Z.enabled=N,Z.autoUpdate=k,Z.needsUpdate=V,Z.type=O}function fe(M){lt("WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function Ce(M){const N=M.target;N.removeEventListener("dispose",Ce),st(N)}function st(M){Qe(M),be.remove(M)}function Qe(M){const N=be.get(M).programs;N!==void 0&&(N.forEach(function(k){q.releaseProgram(k)}),M.isShaderMaterial&&q.releaseShaderCache(M))}this.renderBufferDirect=function(M,N,k,V,O,ie){N===null&&(N=_t);const le=O.isMesh&&O.matrixWorld.determinant()<0,pe=Ol(M,N,k,V,O);xe.setMaterial(V,le);let ue=k.index,Ee=1;if(V.wireframe===!0){if(ue=X.getWireframeAttribute(k),ue===void 0)return;Ee=2}const Ae=k.drawRange,ye=k.attributes.position;let Ge=Ae.start*Ee,et=(Ae.start+Ae.count)*Ee;ie!==null&&(Ge=Math.max(Ge,ie.start*Ee),et=Math.min(et,(ie.start+ie.count)*Ee)),ue!==null?(Ge=Math.max(Ge,0),et=Math.min(et,ue.count)):ye!=null&&(Ge=Math.max(Ge,0),et=Math.min(et,ye.count));const ht=et-Ge;if(ht<0||ht===1/0)return;U.setup(O,V,pe,k,ue);let ut,tt=we;if(ue!==null&&(ut=z.get(ue),tt=he,tt.setIndex(ut)),O.isMesh)V.wireframe===!0?(xe.setLineWidth(V.wireframeLinewidth*rt()),tt.setMode(L.LINES)):tt.setMode(L.TRIANGLES);else if(O.isLine){let Se=V.linewidth;Se===void 0&&(Se=1),xe.setLineWidth(Se*rt()),O.isLineSegments?tt.setMode(L.LINES):O.isLineLoop?tt.setMode(L.LINE_LOOP):tt.setMode(L.LINE_STRIP)}else O.isPoints?tt.setMode(L.POINTS):O.isSprite&&tt.setMode(L.TRIANGLES);if(O.isBatchedMesh)if(O._multiDrawInstances!==null)fn("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),tt.renderMultiDrawInstances(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount,O._multiDrawInstances);else if(Ve.get("WEBGL_multi_draw"))tt.renderMultiDraw(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount);else{const Se=O._multiDrawStarts,ot=O._multiDrawCounts,Xe=O._multiDrawCount,Pt=ue?z.get(ue).bytesPerElement:1,qi=be.get(V).currentProgram.getUniforms();for(let It=0;It<Xe;It++)qi.setValue(L,"_gl_DrawID",It),tt.render(Se[It]/Pt,ot[It])}else if(O.isInstancedMesh)tt.renderInstances(Ge,ht,O.count);else if(k.isInstancedBufferGeometry){const Se=k._maxInstanceCount!==void 0?k._maxInstanceCount:1/0,ot=Math.min(k.instanceCount,Se);tt.renderInstances(Ge,ht,ot)}else tt.render(Ge,ht)};function Jt(M,N,k){M.transparent===!0&&M.side===Qt&&M.forceSinglePass===!1?(M.side=wt,M.needsUpdate=!0,jn(M,N,k),M.side=di,M.needsUpdate=!0,jn(M,N,k),M.side=Qt):jn(M,N,k)}this.compile=function(M,N,k=null){k===null&&(k=M),S=Me.get(k),S.init(N),P.push(S),k.traverseVisible(function(O){O.isLight&&O.layers.test(N.layers)&&(S.pushLight(O),O.castShadow&&S.pushShadow(O))}),M!==k&&M.traverseVisible(function(O){O.isLight&&O.layers.test(N.layers)&&(S.pushLight(O),O.castShadow&&S.pushShadow(O))}),S.setupLights();const V=new Set;return M.traverse(function(O){if(!(O.isMesh||O.isPoints||O.isLine||O.isSprite))return;const ie=O.material;if(ie)if(Array.isArray(ie))for(let le=0;le<ie.length;le++){const pe=ie[le];Jt(pe,k,O),V.add(pe)}else Jt(ie,k,O),V.add(ie)}),S=P.pop(),V},this.compileAsync=function(M,N,k=null){const V=this.compile(M,N,k);return new Promise(O=>{function ie(){if(V.forEach(function(le){be.get(le).currentProgram.isReady()&&V.delete(le)}),V.size===0){O(M);return}setTimeout(ie,10)}Ve.get("KHR_parallel_shader_compile")!==null?ie():setTimeout(ie,10)})};let Gt=null;function Fl(M){Gt&&Gt(M)}function uo(){Ri.stop()}function fo(){Ri.start()}const Ri=new Pl;Ri.setAnimationLoop(Fl),typeof self<"u"&&Ri.setContext(self),this.setAnimationLoop=function(M){Gt=M,re.setAnimationLoop(M),M===null?Ri.stop():Ri.start()},re.addEventListener("sessionstart",uo),re.addEventListener("sessionend",fo),this.render=function(M,N){if(N!==void 0&&N.isCamera!==!0){lt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),re.enabled===!0&&re.isPresenting===!0&&(re.cameraAutoUpdate===!0&&re.updateCamera(N),N=re.getCamera()),M.isScene===!0&&M.onBeforeRender(g,M,N,_),S=Me.get(M,P.length),S.init(N),P.push(S),De.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),j.setFromProjectionMatrix(De,jt,N.reversedDepth),de=this.localClippingEnabled,J=ge.init(this.clippingPlanes,de),w=oe.get(M,E.length),w.init(),E.push(w),re.enabled===!0&&re.isPresenting===!0){const ie=g.xr.getDepthSensingMesh();ie!==null&&Nr(ie,N,-1/0,g.sortObjects)}Nr(M,N,0,g.sortObjects),w.finish(),g.sortObjects===!0&&w.sort(me,Oe),Be=re.enabled===!1||re.isPresenting===!1||re.hasDepthSensing()===!1,Be&&ne.addToRenderList(w,M),this.info.render.frame++,J===!0&&ge.beginShadows();const k=S.state.shadowsArray;Z.render(k,M,N),J===!0&&ge.endShadows(),this.info.autoReset===!0&&this.info.reset();const V=w.opaque,O=w.transmissive;if(S.setupLights(),N.isArrayCamera){const ie=N.cameras;if(O.length>0)for(let le=0,pe=ie.length;le<pe;le++){const ue=ie[le];mo(V,O,M,ue)}Be&&ne.render(M);for(let le=0,pe=ie.length;le<pe;le++){const ue=ie[le];po(w,M,ue,ue.viewport)}}else O.length>0&&mo(V,O,M,N),Be&&ne.render(M),po(w,M,N);_!==null&&x===0&&(Ie.updateMultisampleRenderTarget(_),Ie.updateRenderTargetMipmap(_)),M.isScene===!0&&M.onAfterRender(g,M,N),U.resetDefaultState(),A=-1,D=null,P.pop(),P.length>0?(S=P[P.length-1],J===!0&&ge.setGlobalState(g.clippingPlanes,S.state.camera)):S=null,E.pop(),E.length>0?w=E[E.length-1]:w=null};function Nr(M,N,k,V){if(M.visible===!1)return;if(M.layers.test(N.layers)){if(M.isGroup)k=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(N);else if(M.isLight)S.pushLight(M),M.castShadow&&S.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||j.intersectsSprite(M)){V&&ze.setFromMatrixPosition(M.matrixWorld).applyMatrix4(De);const le=K.update(M),pe=M.material;pe.visible&&w.push(M,le,pe,k,ze.z,null)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||j.intersectsObject(M))){const le=K.update(M),pe=M.material;if(V&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),ze.copy(M.boundingSphere.center)):(le.boundingSphere===null&&le.computeBoundingSphere(),ze.copy(le.boundingSphere.center)),ze.applyMatrix4(M.matrixWorld).applyMatrix4(De)),Array.isArray(pe)){const ue=le.groups;for(let Ee=0,Ae=ue.length;Ee<Ae;Ee++){const ye=ue[Ee],Ge=pe[ye.materialIndex];Ge&&Ge.visible&&w.push(M,le,Ge,k,ze.z,ye)}}else pe.visible&&w.push(M,le,pe,k,ze.z,null)}}const ie=M.children;for(let le=0,pe=ie.length;le<pe;le++)Nr(ie[le],N,k,V)}function po(M,N,k,V){const{opaque:O,transmissive:ie,transparent:le}=M;S.setupLightsView(k),J===!0&&ge.setGlobalState(g.clippingPlanes,k),V&&xe.viewport(I.copy(V)),O.length>0&&Yn(O,N,k),ie.length>0&&Yn(ie,N,k),le.length>0&&Yn(le,N,k),xe.buffers.depth.setTest(!0),xe.buffers.depth.setMask(!0),xe.buffers.color.setMask(!0),xe.setPolygonOffset(!1)}function mo(M,N,k,V){if((k.isScene===!0?k.overrideMaterial:null)!==null)return;S.state.transmissionRenderTarget[V.id]===void 0&&(S.state.transmissionRenderTarget[V.id]=new Ei(1,1,{generateMipmaps:!0,type:Ve.has("EXT_color_buffer_half_float")||Ve.has("EXT_color_buffer_float")?Hi:$t,minFilter:Mi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:We.workingColorSpace}));const ie=S.state.transmissionRenderTarget[V.id],le=V.viewport||I;ie.setSize(le.z*g.transmissionResolutionScale,le.w*g.transmissionResolutionScale);const pe=g.getRenderTarget(),ue=g.getActiveCubeFace(),Ee=g.getActiveMipmapLevel();g.setRenderTarget(ie),g.getClearColor(H),Q=g.getClearAlpha(),Q<1&&g.setClearColor(16777215,.5),g.clear(),Be&&ne.render(k);const Ae=g.toneMapping;g.toneMapping=hi;const ye=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),S.setupLightsView(V),J===!0&&ge.setGlobalState(g.clippingPlanes,V),Yn(M,k,V),Ie.updateMultisampleRenderTarget(ie),Ie.updateRenderTargetMipmap(ie),Ve.has("WEBGL_multisampled_render_to_texture")===!1){let Ge=!1;for(let et=0,ht=N.length;et<ht;et++){const ut=N[et],{object:tt,geometry:Se,material:ot,group:Xe}=ut;if(ot.side===Qt&&tt.layers.test(V.layers)){const Pt=ot.side;ot.side=wt,ot.needsUpdate=!0,xo(tt,k,V,Se,ot,Xe),ot.side=Pt,ot.needsUpdate=!0,Ge=!0}}Ge===!0&&(Ie.updateMultisampleRenderTarget(ie),Ie.updateRenderTargetMipmap(ie))}g.setRenderTarget(pe,ue,Ee),g.setClearColor(H,Q),ye!==void 0&&(V.viewport=ye),g.toneMapping=Ae}function Yn(M,N,k){const V=N.isScene===!0?N.overrideMaterial:null;for(let O=0,ie=M.length;O<ie;O++){const le=M[O],{object:pe,geometry:ue,group:Ee}=le;let Ae=le.material;Ae.allowOverride===!0&&V!==null&&(Ae=V),pe.layers.test(k.layers)&&xo(pe,N,k,ue,Ae,Ee)}}function xo(M,N,k,V,O,ie){M.onBeforeRender(g,N,k,V,O,ie),M.modelViewMatrix.multiplyMatrices(k.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),O.onBeforeRender(g,N,k,V,M,ie),O.transparent===!0&&O.side===Qt&&O.forceSinglePass===!1?(O.side=wt,O.needsUpdate=!0,g.renderBufferDirect(k,N,V,O,M,ie),O.side=di,O.needsUpdate=!0,g.renderBufferDirect(k,N,V,O,M,ie),O.side=Qt):g.renderBufferDirect(k,N,V,O,M,ie),M.onAfterRender(g,N,k,V,O,ie)}function jn(M,N,k){N.isScene!==!0&&(N=_t);const V=be.get(M),O=S.state.lights,ie=S.state.shadowsArray,le=O.state.version,pe=q.getParameters(M,O.state,ie,N,k),ue=q.getProgramCacheKey(pe);let Ee=V.programs;V.environment=M.isMeshStandardMaterial?N.environment:null,V.fog=N.fog,V.envMap=(M.isMeshStandardMaterial?y:R).get(M.envMap||V.environment),V.envMapRotation=V.environment!==null&&M.envMap===null?N.environmentRotation:M.envMapRotation,Ee===void 0&&(M.addEventListener("dispose",Ce),Ee=new Map,V.programs=Ee);let Ae=Ee.get(ue);if(Ae!==void 0){if(V.currentProgram===Ae&&V.lightsStateVersion===le)return _o(M,pe),Ae}else pe.uniforms=q.getUniforms(M),M.onBeforeCompile(pe,g),Ae=q.acquireProgram(pe,ue),Ee.set(ue,Ae),V.uniforms=pe.uniforms;const ye=V.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(ye.clippingPlanes=ge.uniform),_o(M,pe),V.needsLights=zl(M),V.lightsStateVersion=le,V.needsLights&&(ye.ambientLightColor.value=O.state.ambient,ye.lightProbe.value=O.state.probe,ye.directionalLights.value=O.state.directional,ye.directionalLightShadows.value=O.state.directionalShadow,ye.spotLights.value=O.state.spot,ye.spotLightShadows.value=O.state.spotShadow,ye.rectAreaLights.value=O.state.rectArea,ye.ltc_1.value=O.state.rectAreaLTC1,ye.ltc_2.value=O.state.rectAreaLTC2,ye.pointLights.value=O.state.point,ye.pointLightShadows.value=O.state.pointShadow,ye.hemisphereLights.value=O.state.hemi,ye.directionalShadowMap.value=O.state.directionalShadowMap,ye.directionalShadowMatrix.value=O.state.directionalShadowMatrix,ye.spotShadowMap.value=O.state.spotShadowMap,ye.spotLightMatrix.value=O.state.spotLightMatrix,ye.spotLightMap.value=O.state.spotLightMap,ye.pointShadowMap.value=O.state.pointShadowMap,ye.pointShadowMatrix.value=O.state.pointShadowMatrix),V.currentProgram=Ae,V.uniformsList=null,Ae}function go(M){if(M.uniformsList===null){const N=M.currentProgram.getUniforms();M.uniformsList=Ss.seqWithValue(N.seq,M.uniforms)}return M.uniformsList}function _o(M,N){const k=be.get(M);k.outputColorSpace=N.outputColorSpace,k.batching=N.batching,k.batchingColor=N.batchingColor,k.instancing=N.instancing,k.instancingColor=N.instancingColor,k.instancingMorph=N.instancingMorph,k.skinning=N.skinning,k.morphTargets=N.morphTargets,k.morphNormals=N.morphNormals,k.morphColors=N.morphColors,k.morphTargetsCount=N.morphTargetsCount,k.numClippingPlanes=N.numClippingPlanes,k.numIntersection=N.numClipIntersection,k.vertexAlphas=N.vertexAlphas,k.vertexTangents=N.vertexTangents,k.toneMapping=N.toneMapping}function Ol(M,N,k,V,O){N.isScene!==!0&&(N=_t),Ie.resetTextureUnits();const ie=N.fog,le=V.isMeshStandardMaterial?N.environment:null,pe=_===null?g.outputColorSpace:_.isXRRenderTarget===!0?_.texture.colorSpace:Gi,ue=(V.isMeshStandardMaterial?y:R).get(V.envMap||le),Ee=V.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,Ae=!!k.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),ye=!!k.morphAttributes.position,Ge=!!k.morphAttributes.normal,et=!!k.morphAttributes.color;let ht=hi;V.toneMapped&&(_===null||_.isXRRenderTarget===!0)&&(ht=g.toneMapping);const ut=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,tt=ut!==void 0?ut.length:0,Se=be.get(V),ot=S.state.lights;if(J===!0&&(de===!0||M!==D)){const Mt=M===D&&V.id===A;ge.setState(V,M,Mt)}let Xe=!1;V.version===Se.__version?(Se.needsLights&&Se.lightsStateVersion!==ot.state.version||Se.outputColorSpace!==pe||O.isBatchedMesh&&Se.batching===!1||!O.isBatchedMesh&&Se.batching===!0||O.isBatchedMesh&&Se.batchingColor===!0&&O.colorTexture===null||O.isBatchedMesh&&Se.batchingColor===!1&&O.colorTexture!==null||O.isInstancedMesh&&Se.instancing===!1||!O.isInstancedMesh&&Se.instancing===!0||O.isSkinnedMesh&&Se.skinning===!1||!O.isSkinnedMesh&&Se.skinning===!0||O.isInstancedMesh&&Se.instancingColor===!0&&O.instanceColor===null||O.isInstancedMesh&&Se.instancingColor===!1&&O.instanceColor!==null||O.isInstancedMesh&&Se.instancingMorph===!0&&O.morphTexture===null||O.isInstancedMesh&&Se.instancingMorph===!1&&O.morphTexture!==null||Se.envMap!==ue||V.fog===!0&&Se.fog!==ie||Se.numClippingPlanes!==void 0&&(Se.numClippingPlanes!==ge.numPlanes||Se.numIntersection!==ge.numIntersection)||Se.vertexAlphas!==Ee||Se.vertexTangents!==Ae||Se.morphTargets!==ye||Se.morphNormals!==Ge||Se.morphColors!==et||Se.toneMapping!==ht||Se.morphTargetsCount!==tt)&&(Xe=!0):(Xe=!0,Se.__version=V.version);let Pt=Se.currentProgram;Xe===!0&&(Pt=jn(V,N,O));let qi=!1,It=!1,_n=!1;const ct=Pt.getUniforms(),Et=Se.uniforms;if(xe.useProgram(Pt.program)&&(qi=!0,It=!0,_n=!0),V.id!==A&&(A=V.id,It=!0),qi||D!==M){xe.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),ct.setValue(L,"projectionMatrix",M.projectionMatrix),ct.setValue(L,"viewMatrix",M.matrixWorldInverse);const Tt=ct.map.cameraPosition;Tt!==void 0&&Tt.setValue(L,ve.setFromMatrixPosition(M.matrixWorld)),nt.logarithmicDepthBuffer&&ct.setValue(L,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&ct.setValue(L,"isOrthographic",M.isOrthographicCamera===!0),D!==M&&(D=M,It=!0,_n=!0)}if(O.isSkinnedMesh){ct.setOptional(L,O,"bindMatrix"),ct.setOptional(L,O,"bindMatrixInverse");const Mt=O.skeleton;Mt&&(Mt.boneTexture===null&&Mt.computeBoneTexture(),ct.setValue(L,"boneTexture",Mt.boneTexture,Ie))}O.isBatchedMesh&&(ct.setOptional(L,O,"batchingTexture"),ct.setValue(L,"batchingTexture",O._matricesTexture,Ie),ct.setOptional(L,O,"batchingIdTexture"),ct.setValue(L,"batchingIdTexture",O._indirectTexture,Ie),ct.setOptional(L,O,"batchingColorTexture"),O._colorsTexture!==null&&ct.setValue(L,"batchingColorTexture",O._colorsTexture,Ie));const Ot=k.morphAttributes;if((Ot.position!==void 0||Ot.normal!==void 0||Ot.color!==void 0)&&Te.update(O,k,Pt),(It||Se.receiveShadow!==O.receiveShadow)&&(Se.receiveShadow=O.receiveShadow,ct.setValue(L,"receiveShadow",O.receiveShadow)),V.isMeshGouraudMaterial&&V.envMap!==null&&(Et.envMap.value=ue,Et.flipEnvMap.value=ue.isCubeTexture&&ue.isRenderTargetTexture===!1?-1:1),V.isMeshStandardMaterial&&V.envMap===null&&N.environment!==null&&(Et.envMapIntensity.value=N.environmentIntensity),Et.dfgLUT!==void 0&&(Et.dfgLUT.value=zm()),It&&(ct.setValue(L,"toneMappingExposure",g.toneMappingExposure),Se.needsLights&&Bl(Et,_n),ie&&V.fog===!0&&_e.refreshFogUniforms(Et,ie),_e.refreshMaterialUniforms(Et,V,te,Y,S.state.transmissionRenderTarget[M.id]),Ss.upload(L,go(Se),Et,Ie)),V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(Ss.upload(L,go(Se),Et,Ie),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&ct.setValue(L,"center",O.center),ct.setValue(L,"modelViewMatrix",O.modelViewMatrix),ct.setValue(L,"normalMatrix",O.normalMatrix),ct.setValue(L,"modelMatrix",O.matrixWorld),V.isShaderMaterial||V.isRawShaderMaterial){const Mt=V.uniformsGroups;for(let Tt=0,Fr=Mt.length;Tt<Fr;Tt++){const Ci=Mt[Tt];ce.update(Ci,Pt),ce.bind(Ci,Pt)}}return Pt}function Bl(M,N){M.ambientLightColor.needsUpdate=N,M.lightProbe.needsUpdate=N,M.directionalLights.needsUpdate=N,M.directionalLightShadows.needsUpdate=N,M.pointLights.needsUpdate=N,M.pointLightShadows.needsUpdate=N,M.spotLights.needsUpdate=N,M.spotLightShadows.needsUpdate=N,M.rectAreaLights.needsUpdate=N,M.hemisphereLights.needsUpdate=N}function zl(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return x},this.getRenderTarget=function(){return _},this.setRenderTargetTextures=function(M,N,k){const V=be.get(M);V.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,V.__autoAllocateDepthBuffer===!1&&(V.__useRenderToTexture=!1),be.get(M.texture).__webglTexture=N,be.get(M.depthTexture).__webglTexture=V.__autoAllocateDepthBuffer?void 0:k,V.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,N){const k=be.get(M);k.__webglFramebuffer=N,k.__useDefaultFramebuffer=N===void 0};const kl=L.createFramebuffer();this.setRenderTarget=function(M,N=0,k=0){_=M,C=N,x=k;let V=!0,O=null,ie=!1,le=!1;if(M){const ue=be.get(M);if(ue.__useDefaultFramebuffer!==void 0)xe.bindFramebuffer(L.FRAMEBUFFER,null),V=!1;else if(ue.__webglFramebuffer===void 0)Ie.setupRenderTarget(M);else if(ue.__hasExternalTextures)Ie.rebindTextures(M,be.get(M.texture).__webglTexture,be.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){const ye=M.depthTexture;if(ue.__boundDepthTexture!==ye){if(ye!==null&&be.has(ye)&&(M.width!==ye.image.width||M.height!==ye.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Ie.setupDepthRenderbuffer(M)}}const Ee=M.texture;(Ee.isData3DTexture||Ee.isDataArrayTexture||Ee.isCompressedArrayTexture)&&(le=!0);const Ae=be.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(Ae[N])?O=Ae[N][k]:O=Ae[N],ie=!0):M.samples>0&&Ie.useMultisampledRTT(M)===!1?O=be.get(M).__webglMultisampledFramebuffer:Array.isArray(Ae)?O=Ae[k]:O=Ae,I.copy(M.viewport),B.copy(M.scissor),G=M.scissorTest}else I.copy(qe).multiplyScalar(te).floor(),B.copy(je).multiplyScalar(te).floor(),G=Ye;if(k!==0&&(O=kl),xe.bindFramebuffer(L.FRAMEBUFFER,O)&&V&&xe.drawBuffers(M,O),xe.viewport(I),xe.scissor(B),xe.setScissorTest(G),ie){const ue=be.get(M.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+N,ue.__webglTexture,k)}else if(le){const ue=N;for(let Ee=0;Ee<M.textures.length;Ee++){const Ae=be.get(M.textures[Ee]);L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0+Ee,Ae.__webglTexture,k,ue)}}else if(M!==null&&k!==0){const ue=be.get(M.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,ue.__webglTexture,k)}A=-1},this.readRenderTargetPixels=function(M,N,k,V,O,ie,le,pe=0){if(!(M&&M.isWebGLRenderTarget)){lt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ue=be.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&le!==void 0&&(ue=ue[le]),ue){xe.bindFramebuffer(L.FRAMEBUFFER,ue);try{const Ee=M.textures[pe],Ae=Ee.format,ye=Ee.type;if(!nt.textureFormatReadable(Ae)){lt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!nt.textureTypeReadable(ye)){lt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=M.width-V&&k>=0&&k<=M.height-O&&(M.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+pe),L.readPixels(N,k,V,O,Re.convert(Ae),Re.convert(ye),ie))}finally{const Ee=_!==null?be.get(_).__webglFramebuffer:null;xe.bindFramebuffer(L.FRAMEBUFFER,Ee)}}},this.readRenderTargetPixelsAsync=async function(M,N,k,V,O,ie,le,pe=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ue=be.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&le!==void 0&&(ue=ue[le]),ue)if(N>=0&&N<=M.width-V&&k>=0&&k<=M.height-O){xe.bindFramebuffer(L.FRAMEBUFFER,ue);const Ee=M.textures[pe],Ae=Ee.format,ye=Ee.type;if(!nt.textureFormatReadable(Ae))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!nt.textureTypeReadable(ye))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ge=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,Ge),L.bufferData(L.PIXEL_PACK_BUFFER,ie.byteLength,L.STREAM_READ),M.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+pe),L.readPixels(N,k,V,O,Re.convert(Ae),Re.convert(ye),0);const et=_!==null?be.get(_).__webglFramebuffer:null;xe.bindFramebuffer(L.FRAMEBUFFER,et);const ht=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await mh(L,ht,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,Ge),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,ie),L.deleteBuffer(Ge),L.deleteSync(ht),ie}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,N=null,k=0){const V=Math.pow(2,-k),O=Math.floor(M.image.width*V),ie=Math.floor(M.image.height*V),le=N!==null?N.x:0,pe=N!==null?N.y:0;Ie.setTexture2D(M,0),L.copyTexSubImage2D(L.TEXTURE_2D,k,0,0,le,pe,O,ie),xe.unbindTexture()};const Vl=L.createFramebuffer(),Gl=L.createFramebuffer();this.copyTextureToTexture=function(M,N,k=null,V=null,O=0,ie=null){ie===null&&(O!==0?(fn("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ie=O,O=0):ie=0);let le,pe,ue,Ee,Ae,ye,Ge,et,ht;const ut=M.isCompressedTexture?M.mipmaps[ie]:M.image;if(k!==null)le=k.max.x-k.min.x,pe=k.max.y-k.min.y,ue=k.isBox3?k.max.z-k.min.z:1,Ee=k.min.x,Ae=k.min.y,ye=k.isBox3?k.min.z:0;else{const Ot=Math.pow(2,-O);le=Math.floor(ut.width*Ot),pe=Math.floor(ut.height*Ot),M.isDataArrayTexture?ue=ut.depth:M.isData3DTexture?ue=Math.floor(ut.depth*Ot):ue=1,Ee=0,Ae=0,ye=0}V!==null?(Ge=V.x,et=V.y,ht=V.z):(Ge=0,et=0,ht=0);const tt=Re.convert(N.format),Se=Re.convert(N.type);let ot;N.isData3DTexture?(Ie.setTexture3D(N,0),ot=L.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(Ie.setTexture2DArray(N,0),ot=L.TEXTURE_2D_ARRAY):(Ie.setTexture2D(N,0),ot=L.TEXTURE_2D),L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,N.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,N.unpackAlignment);const Xe=L.getParameter(L.UNPACK_ROW_LENGTH),Pt=L.getParameter(L.UNPACK_IMAGE_HEIGHT),qi=L.getParameter(L.UNPACK_SKIP_PIXELS),It=L.getParameter(L.UNPACK_SKIP_ROWS),_n=L.getParameter(L.UNPACK_SKIP_IMAGES);L.pixelStorei(L.UNPACK_ROW_LENGTH,ut.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,ut.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,Ee),L.pixelStorei(L.UNPACK_SKIP_ROWS,Ae),L.pixelStorei(L.UNPACK_SKIP_IMAGES,ye);const ct=M.isDataArrayTexture||M.isData3DTexture,Et=N.isDataArrayTexture||N.isData3DTexture;if(M.isDepthTexture){const Ot=be.get(M),Mt=be.get(N),Tt=be.get(Ot.__renderTarget),Fr=be.get(Mt.__renderTarget);xe.bindFramebuffer(L.READ_FRAMEBUFFER,Tt.__webglFramebuffer),xe.bindFramebuffer(L.DRAW_FRAMEBUFFER,Fr.__webglFramebuffer);for(let Ci=0;Ci<ue;Ci++)ct&&(L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,be.get(M).__webglTexture,O,ye+Ci),L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,be.get(N).__webglTexture,ie,ht+Ci)),L.blitFramebuffer(Ee,Ae,le,pe,Ge,et,le,pe,L.DEPTH_BUFFER_BIT,L.NEAREST);xe.bindFramebuffer(L.READ_FRAMEBUFFER,null),xe.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else if(O!==0||M.isRenderTargetTexture||be.has(M)){const Ot=be.get(M),Mt=be.get(N);xe.bindFramebuffer(L.READ_FRAMEBUFFER,Vl),xe.bindFramebuffer(L.DRAW_FRAMEBUFFER,Gl);for(let Tt=0;Tt<ue;Tt++)ct?L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Ot.__webglTexture,O,ye+Tt):L.framebufferTexture2D(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,Ot.__webglTexture,O),Et?L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Mt.__webglTexture,ie,ht+Tt):L.framebufferTexture2D(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,Mt.__webglTexture,ie),O!==0?L.blitFramebuffer(Ee,Ae,le,pe,Ge,et,le,pe,L.COLOR_BUFFER_BIT,L.NEAREST):Et?L.copyTexSubImage3D(ot,ie,Ge,et,ht+Tt,Ee,Ae,le,pe):L.copyTexSubImage2D(ot,ie,Ge,et,Ee,Ae,le,pe);xe.bindFramebuffer(L.READ_FRAMEBUFFER,null),xe.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else Et?M.isDataTexture||M.isData3DTexture?L.texSubImage3D(ot,ie,Ge,et,ht,le,pe,ue,tt,Se,ut.data):N.isCompressedArrayTexture?L.compressedTexSubImage3D(ot,ie,Ge,et,ht,le,pe,ue,tt,ut.data):L.texSubImage3D(ot,ie,Ge,et,ht,le,pe,ue,tt,Se,ut):M.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,ie,Ge,et,le,pe,tt,Se,ut.data):M.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,ie,Ge,et,ut.width,ut.height,tt,ut.data):L.texSubImage2D(L.TEXTURE_2D,ie,Ge,et,le,pe,tt,Se,ut);L.pixelStorei(L.UNPACK_ROW_LENGTH,Xe),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,Pt),L.pixelStorei(L.UNPACK_SKIP_PIXELS,qi),L.pixelStorei(L.UNPACK_SKIP_ROWS,It),L.pixelStorei(L.UNPACK_SKIP_IMAGES,_n),ie===0&&N.generateMipmaps&&L.generateMipmap(ot),xe.unbindTexture()},this.initRenderTarget=function(M){be.get(M).__webglFramebuffer===void 0&&Ie.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?Ie.setTextureCube(M,0):M.isData3DTexture?Ie.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?Ie.setTexture2DArray(M,0):Ie.setTexture2D(M,0),xe.unbindTexture()},this.resetState=function(){C=0,x=0,_=null,xe.reset(),U.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return jt}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=We._getDrawingBufferColorSpace(e),t.unpackColorSpace=We._getUnpackColorSpace()}}const l0=Object.freeze(Object.defineProperty({__proto__:null,ACESFilmicToneMapping:Qc,AddEquation:bi,AddOperation:$c,AdditiveBlending:ba,AgXToneMapping:tl,AlphaFormat:Va,AlwaysCompare:fl,AlwaysDepth:Rs,AlwaysStencilFunc:wa,ArrayCamera:Cl,BackSide:wt,BasicDepthPacking:sl,Box3:Ti,BoxGeometry:xn,BufferAttribute:Ft,BufferGeometry:xt,ByteType:Oa,Camera:ja,CanvasTexture:Hh,CapsuleGeometry:to,CineonToneMapping:Zc,CircleGeometry:io,ClampToEdgeWrapping:ei,Color:Ue,ColorManagement:We,ConeGeometry:no,ConstantAlphaFactor:Xc,ConstantColorFactor:Wc,CubeCamera:Ml,CubeReflectionMapping:ki,CubeRefractionMapping:Vi,CubeTexture:$a,CubeUVReflectionMapping:Vn,CullFaceBack:ya,CullFaceFront:Rc,CullFaceNone:Ac,CustomBlending:Pc,CustomToneMapping:el,CylinderGeometry:Dr,Data3DTexture:_l,DataArrayTexture:Wa,DataTexture:Za,DepthFormat:un,DepthStencilFormat:dn,DepthTexture:Qa,DirectionalLight:Zh,DoubleSide:Qt,DstAlphaFactor:zc,DstColorFactor:Vc,DynamicDrawUsage:ph,EqualCompare:ll,EqualDepth:Ps,EquirectangularReflectionMapping:Us,EquirectangularRefractionMapping:Ns,Euler:Vt,EventDispatcher:Wi,ExternalTexture:eo,Float32BufferAttribute:$e,FloatType:Yt,Fog:Ja,FogExp2:Ka,FrontSide:di,Frustum:Ir,GLSL3:Ta,GreaterCompare:hl,GreaterDepth:Ds,GreaterEqualCompare:dl,GreaterEqualDepth:Is,Group:Ln,HalfFloatType:Hi,HemisphereLight:Xh,IcosahedronGeometry:so,ImageUtils:xl,InstancedBufferAttribute:Ra,InstancedMesh:Oh,IntType:yr,KeepStencilOp:Fi,Layers:Pr,LessCompare:cl,LessDepth:Cs,LessEqualCompare:Ha,LessEqualDepth:zi,Light:Xn,Line:Vh,LineBasicMaterial:wl,LinearFilter:Nt,LinearMipmapLinearFilter:Mi,LinearMipmapNearestFilter:bs,LinearSRGBColorSpace:Gi,LinearToneMapping:Kc,LinearTransfer:zn,Material:fi,Matrix3:Le,Matrix4:Ze,MaxEquation:Uc,Mesh:Kt,MeshBasicMaterial:qa,MeshDepthMaterial:Al,MeshDistanceMaterial:Rl,MeshLambertMaterial:qh,MeshPhysicalMaterial:Wh,MeshStandardMaterial:Tl,MinEquation:Lc,MirroredRepeatWrapping:Os,MixOperation:jc,MultiplyBlending:Sa,MultiplyOperation:vr,NearestFilter:Ct,NearestMipmapLinearFilter:Dn,NearestMipmapNearestFilter:nl,NeutralToneMapping:il,NeverCompare:ol,NeverDepth:As,NoBlending:ti,NoColorSpace:li,NoToneMapping:hi,NormalBlending:Bi,NotEqualCompare:ul,NotEqualDepth:Ls,Object3D:dt,ObjectSpaceNormalMap:al,OctahedronGeometry:ro,OneFactor:Fc,OneMinusConstantAlphaFactor:Yc,OneMinusConstantColorFactor:qc,OneMinusDstAlphaFactor:kc,OneMinusDstColorFactor:Gc,OneMinusSrcAlphaFactor:Ts,OneMinusSrcColorFactor:Bc,OrthographicCamera:ho,PCFShadowMap:Na,PCFSoftShadowMap:Cc,PMREMGenerator:Ia,PerspectiveCamera:Rt,Plane:yi,PlaneGeometry:qn,PointLight:Kh,Points:Gh,PointsMaterial:El,PolyhedronGeometry:Wn,Quaternion:mn,RED_GREEN_RGTC2_Format:hr,RED_RGTC1_Format:cr,REVISION:_r,RGBADepthPacking:rl,RGBAFormat:kt,RGBAIntegerFormat:Ar,RGBA_ASTC_10x10_Format:ir,RGBA_ASTC_10x5_Format:Qs,RGBA_ASTC_10x6_Format:er,RGBA_ASTC_10x8_Format:tr,RGBA_ASTC_12x10_Format:nr,RGBA_ASTC_12x12_Format:sr,RGBA_ASTC_4x4_Format:qs,RGBA_ASTC_5x4_Format:Xs,RGBA_ASTC_5x5_Format:Ys,RGBA_ASTC_6x5_Format:js,RGBA_ASTC_6x6_Format:$s,RGBA_ASTC_8x5_Format:Ks,RGBA_ASTC_8x6_Format:Js,RGBA_ASTC_8x8_Format:Zs,RGBA_BPTC_Format:rr,RGBA_ETC2_EAC_Format:Ws,RGBA_PVRTC_2BPPV1_Format:Vs,RGBA_PVRTC_4BPPV1_Format:ks,RGBA_S3TC_DXT1_Format:Fn,RGBA_S3TC_DXT3_Format:On,RGBA_S3TC_DXT5_Format:Bn,RGBFormat:Ga,RGB_BPTC_SIGNED_Format:ar,RGB_BPTC_UNSIGNED_Format:or,RGB_ETC1_Format:Gs,RGB_ETC2_Format:Hs,RGB_PVRTC_2BPPV1_Format:zs,RGB_PVRTC_4BPPV1_Format:Bs,RGB_S3TC_DXT1_Format:Nn,RGFormat:Er,RGIntegerFormat:Tr,Ray:Hn,Raycaster:Qh,RedFormat:Sr,RedIntegerFormat:wr,ReinhardToneMapping:Jc,RenderTarget:gl,RepeatWrapping:Fs,ReverseSubtractEquation:Dc,RingGeometry:ao,SIGNED_RED_GREEN_RGTC2_Format:ur,SIGNED_RED_RGTC1_Format:lr,SRGBColorSpace:Ut,SRGBTransfer:Ke,Scene:Nh,ShaderChunk:Ne,ShaderLib:Xt,ShaderMaterial:ii,ShortType:Ba,Source:Cr,Sphere:Ai,SphereGeometry:oo,SpotLight:jh,SrcAlphaFactor:Es,SrcAlphaSaturateFactor:Hc,SrcColorFactor:Oc,StaticDrawUsage:Ea,SubtractEquation:Ic,SubtractiveBlending:Ma,TangentSpaceNormalMap:Rr,Texture:vt,TorusGeometry:co,Triangle:zt,UVMapping:Fa,Uint16BufferAttribute:Xa,Uint32BufferAttribute:Ya,UniformsLib:ae,UniformsUtils:bl,UnsignedByteType:$t,UnsignedInt101111Type:ka,UnsignedInt248Type:hn,UnsignedInt5999Type:za,UnsignedIntType:wi,UnsignedShort4444Type:br,UnsignedShort5551Type:Mr,UnsignedShortType:ln,VSMShadowMap:Zt,Vector2:Fe,Vector3:F,Vector4:Je,WebGLCoordinateSystem:jt,WebGLCubeRenderTarget:Sl,WebGLRenderTarget:Ei,WebGLRenderer:km,WebGLUtils:Nl,WebGPUCoordinateSystem:kn,WebXRController:Ms,ZeroFactor:Nc,createCanvasElement:ml,error:lt,log:Aa,warn:Pe,warnOnce:fn},Symbol.toStringTag,{value:"Module"})),Vm=JSON.parse(`[{"id":"facts","subject_id":"hebrew","exam_id":"hebrew-v1-garden","title":"עובדה או דעה?","description":"מזהים מה אפשר לבדוק ומה מביע מחשבה אישית.","references":[{"id":"garden-passage","kind":"passage","title":"הטקסט „תלמידי כיתה ז׳ הקימו גינה בבית הספר”","url":"garden-exam.html#article","attribution":null,"parts":[{"part":"הכותרת ושורת הפרטים","title":"הכותרת, הכותבת, מקום הפרסום והתאריך"},{"part":"פסקה 1","title":"הקמת הגינה, הכיתות וההשקיה"},{"part":"פסקה 2","title":"ההכנות לפני השתילה ומטרת הפעילות"},{"part":"פסקה 3","title":"דברי התלמידים ומה יקרה בעוד חודש"},{"part":"הטקסט כולו","title":"הטקסט כולו"}]}],"questions":[{"id":"facts-01","position":1,"type":"mcq","topic":null,"difficulty":null,"prompt":"„בפעילות השתתפו שלוש כיתות.” מה זה?","choices":["עובדה","דעה"],"correct":0,"explanation":{"he":"אפשר לבדוק כמה כיתות השתתפו בפעילות.","en":"The number of participating classes can be checked."},"ref":{"id":"garden-passage","part":"פסקה 1"}},{"id":"facts-02","position":2,"type":"mcq","topic":null,"difficulty":null,"prompt":"„שיעורים בגינה מעניינים יותר משיעורים בכיתה.” מה זה?","choices":["עובדה","דעה"],"correct":1,"explanation":{"he":"„מעניינים יותר” הוא שיפוט אישי, ולכן זו דעה.","en":"“More interesting” is a personal judgment, so this is an opinion."},"ref":{"id":"garden-passage","part":"פסקה 3"}},{"id":"facts-03","position":3,"type":"mcq","topic":null,"difficulty":null,"prompt":"„התלמידים שתלו נענע, רוזמרין וחסה.” מה זה?","choices":["עובדה","דעה"],"correct":0,"explanation":{"he":"אפשר לבדוק אילו צמחים נשתלו בגינה.","en":"The plants in the garden can be checked."},"ref":{"id":"garden-passage","part":"פסקה 1"}},{"id":"facts-04","position":4,"type":"mcq","topic":null,"difficulty":null,"prompt":"„נענע היא הצמח הכי מוצלח בגינה.” מה זה?","choices":["עובדה","דעה"],"correct":1,"explanation":{"he":"„הכי מוצלח” מביע הערכה אישית ולא נתון מדיד שהוגדר כאן.","en":"“The best” is a personal evaluation, not a defined measurable fact here."},"ref":{"id":"garden-passage","part":null}},{"id":"facts-05","position":5,"type":"mcq","topic":null,"difficulty":null,"prompt":"„כל כיתה קיבלה אחריות להשקיה ביום אחר בשבוע.” מה זה?","choices":["עובדה","דעה"],"correct":0,"explanation":{"he":"אפשר לבדוק את לוח ההשקיה של הכיתות.","en":"The class watering schedule can be checked."},"ref":{"id":"garden-passage","part":"פסקה 1"}},{"id":"facts-06","position":6,"type":"mcq","topic":null,"difficulty":null,"prompt":"„לדעתי, הפעילות בגינה נהדרת.” מה זה?","choices":["עובדה","דעה"],"correct":1,"explanation":{"he":"המילה „לדעתי” מסמנת במפורש שהדובר מביע דעה.","en":"The word “in my opinion” clearly signals an opinion."},"ref":{"id":"garden-passage","part":null}}]},{"id":"questions","subject_id":"hebrew","exam_id":"hebrew-v1-garden","title":"מילות שאלה","description":"בוחרים את מילת השאלה המתאימה למידע שמחפשים.","references":[{"id":"garden-passage","kind":"passage","title":"הטקסט „תלמידי כיתה ז׳ הקימו גינה בבית הספר”","url":"garden-exam.html#article","attribution":null,"parts":[{"part":"הכותרת ושורת הפרטים","title":"הכותרת, הכותבת, מקום הפרסום והתאריך"},{"part":"פסקה 1","title":"הקמת הגינה, הכיתות וההשקיה"},{"part":"פסקה 2","title":"ההכנות לפני השתילה ומטרת הפעילות"},{"part":"פסקה 3","title":"דברי התלמידים ומה יקרה בעוד חודש"},{"part":"הטקסט כולו","title":"הטקסט כולו"}]}],"questions":[{"id":"questions-01","position":1,"type":"mcq","topic":null,"difficulty":null,"prompt":"איזו מילת שאלה מתאימה לבירור מועד הקמת הגינה?","choices":["מתי","מי","כמה"],"correct":0,"explanation":{"he":"„מתי” מבקשת זמן או מועד.","en":"“When” asks about a time or date."},"ref":{"id":"garden-passage","part":"פסקה 1"}},{"id":"questions-02","position":2,"type":"mcq","topic":null,"difficulty":null,"prompt":"איזו מילת שאלה מתאימה לבירור מספר הכיתות שהשתתפו?","choices":["כיצד","כמה","היכן"],"correct":1,"explanation":{"he":"„כמה” מבקשת מספר או כמות.","en":"“How many” asks for a number or quantity."},"ref":{"id":"garden-passage","part":"פסקה 1"}},{"id":"questions-03","position":3,"type":"mcq","topic":null,"difficulty":null,"prompt":"איזו מילת שאלה מתאימה לשאלה על הסיבה לכך שקראו על הצמחים?","choices":["מדוע","מתי","מי"],"correct":0,"explanation":{"he":"„מדוע” מבקשת סיבה: למה עשו זאת?","en":"“Why” asks for the reason something happened."},"ref":{"id":"garden-passage","part":"פסקה 2"}},{"id":"questions-04","position":4,"type":"mcq","topic":null,"difficulty":null,"prompt":"איזו מילת שאלה מתאימה לבירור המקום שבו הוקמה הגינה?","choices":["כמה","היכן","כיצד"],"correct":1,"explanation":{"he":"„היכן” מבקשת מקום.","en":"“Where” asks about a place."},"ref":{"id":"garden-passage","part":"פסקה 1"}},{"id":"questions-05","position":5,"type":"mcq","topic":null,"difficulty":null,"prompt":"איזו מילת שאלה מתאימה לבירור האופן שבו חילקו את ההשקיה?","choices":["כיצד","מתי","מי"],"correct":0,"explanation":{"he":"„כיצד” מבקשת דרך או אופן פעולה.","en":"“How” asks about the way something was done."},"ref":{"id":"garden-passage","part":"פסקה 1"}},{"id":"questions-06","position":6,"type":"mcq","topic":null,"difficulty":null,"prompt":"איזו מילת שאלה מתאימה לבירור מי הציעה להוסיף פרחים?","choices":["היכן","מי","מדוע"],"correct":1,"explanation":{"he":"„מי” מבקשת לזהות אדם.","en":"“Who” asks which person did something."},"ref":{"id":"garden-passage","part":"פסקה 3"}}]},{"id":"instructions","subject_id":"hebrew","exam_id":"hebrew-v1-garden","title":"מבינים הוראות","description":"מזהים מה בדיוק צריך לעשות לפי מילת ההוראה.","references":[{"id":"garden-passage","kind":"passage","title":"הטקסט „תלמידי כיתה ז׳ הקימו גינה בבית הספר”","url":"garden-exam.html#article","attribution":null,"parts":[{"part":"הכותרת ושורת הפרטים","title":"הכותרת, הכותבת, מקום הפרסום והתאריך"},{"part":"פסקה 1","title":"הקמת הגינה, הכיתות וההשקיה"},{"part":"פסקה 2","title":"ההכנות לפני השתילה ומטרת הפעילות"},{"part":"פסקה 3","title":"דברי התלמידים ומה יקרה בעוד חודש"},{"part":"הטקסט כולו","title":"הטקסט כולו"}]}],"questions":[{"id":"instructions-01","position":1,"type":"mcq","topic":null,"difficulty":null,"prompt":"בשאלה כתוב „העתיקו מהטקסט עובדה”. מה צריך לעשות?","choices":["לכתוב את המילים בדיוק כפי שהן בטקסט","להמציא עובדה חדשה","לכתוב מה חושבים"],"correct":0,"explanation":{"he":"„העתיקו” פירושו להשתמש בניסוח שמופיע בטקסט.","en":"“Copy” means use the wording from the passage."},"ref":{"id":"garden-passage","part":null}},{"id":"instructions-02","position":2,"type":"mcq","topic":null,"difficulty":null,"prompt":"בשאלה כתוב „נמקו”. מה צריך להוסיף לתשובה?","choices":["כותרת בלבד","סיבה שמסבירה את הבחירה","תאריך הפרסום בלבד"],"correct":1,"explanation":{"he":"„נמקו” מבקשת לתת סיבה או ראיה לבחירה.","en":"“Justify” asks for a reason or evidence."},"ref":{"id":"garden-passage","part":null}},{"id":"instructions-03","position":3,"type":"mcq","topic":null,"difficulty":null,"prompt":"בשאלה כתוב „ציינו”. איזו תשובה מתאימה בדרך כלל?","choices":["תשובה קצרה וברורה","סיפור ארוך שלא קשור לשאלה","שאלה חדשה"],"correct":0,"explanation":{"he":"„ציינו” מבקשת למסור את הפרט המבוקש בקצרה.","en":"“State” usually asks for the requested detail briefly."},"ref":{"id":"garden-passage","part":null}},{"id":"instructions-04","position":4,"type":"mcq","topic":null,"difficulty":null,"prompt":"בשאלה כתוב „הסבירו”. מה צריך לעשות?","choices":["לכתוב מילה אחת בלבד","לתאר בפירוט כיצד או מדוע","להעתיק את הכותרת"],"correct":1,"explanation":{"he":"„הסבירו” מבקשת להבהיר את הרעיון בעזרת פירוט או סיבה.","en":"“Explain” asks for details about how or why."},"ref":{"id":"garden-passage","part":null}},{"id":"instructions-05","position":5,"type":"mcq","topic":null,"difficulty":null,"prompt":"בשאלה כתוב „נסחו שאלה מלאה”. איזו תשובה מקיימת את ההוראה?","choices":["„שלוש כיתות”","„כמה כיתות השתתפו בפעילות?”","„כיתות”"],"correct":1,"explanation":{"he":"שאלה מלאה כוללת מילת שאלה ומשפט שלם.","en":"A full question includes a question word and a complete sentence."},"ref":{"id":"garden-passage","part":null}},{"id":"instructions-06","position":6,"type":"mcq","topic":null,"difficulty":null,"prompt":"בשאלה כתוב „הביעו את דעתכם וכתבו נימוק”. מה צריך לכתוב?","choices":["רק עובדה מהטקסט","עמדה אישית וסיבה שתומכת בה","רק את שם הכותבת"],"correct":1,"explanation":{"he":"צריך לציין מה חושבים ולתת סיבה אחת לפחות.","en":"State your view and give at least one supporting reason."},"ref":{"id":"garden-passage","part":null}}]},{"id":"physics-basics","subject_id":"physics","exam_id":"physics-v1-assessment","title":"מדידה ושיטות מדידה","description":"מזהים תוצאות ומבדילים בין מדידה ישירה לעקיפה.","references":[{"id":"physics-pdf","kind":"pdf","title":"סיכום נושא מדידות (PDF)","url":"assets/materials/physics-measurements-grade-7.pdf","attribution":"שרית שרת","parts":[{"part":"עמוד 1","title":"מדידות: מהי מדידה, מדידה ישירה ומדידה עקיפה"},{"part":"עמוד 2","title":"המרת יחידות אורך"},{"part":"עמוד 3","title":"איך מודדים עובי של דף?"},{"part":"עמוד 4","title":"דיוק ומדידה נכונה"},{"part":"עמוד 5","title":"מודדים גובה של עמוד: הרעיון הגאומטרי"},{"part":"עמוד 6","title":"מדידת העמוד בפועל"}]}],"questions":[{"id":"physics-basics-01","position":1,"type":"mcq","topic":null,"difficulty":null,"prompt":"מה חייבים לציין בתוצאת מדידה?","choices":["מספר ויחידת מידה","מספר בלבד","שם כלי המדידה בלבד"],"correct":0,"explanation":{"he":"תוצאת מדידה כוללת מספר ויחידה, למשל 14 ס״מ.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 1"}},{"id":"physics-basics-02","position":2,"type":"mcq","topic":null,"difficulty":null,"prompt":"מדדתם אורך מחברת וקראתם את התוצאה מהסרגל. איזו מדידה זו?","choices":["ישירה","עקיפה","לא מדידה"],"correct":0,"explanation":{"he":"במדידה ישירה קוראים את הגודל המבוקש מכלי המדידה.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 1"}},{"id":"physics-basics-03","position":3,"type":"mcq","topic":null,"difficulty":null,"prompt":"מדדתם עובי של ערימת דפים וחילקתם במספר הדפים. איזו מדידה זו?","choices":["ישירה","עקיפה","הערכה ללא מדידה"],"correct":1,"explanation":{"he":"מודדים גודל אחר ומחשבים ממנו את העובי הממוצע של דף.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 1"}},{"id":"physics-basics-04","position":4,"type":"mcq","topic":null,"difficulty":null,"prompt":"איך מחשבים עובי ממוצע של דף בערימה?","choices":["עובי הערימה חלקי מספר הדפים","מספר הדפים חלקי עובי הערימה","עובי הערימה כפול מספר הדפים"],"correct":0,"explanation":{"he":"מחלקים את עובי הערימה במספר הדפים, לא במספר העמודים.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 3"}},{"id":"physics-basics-05","position":5,"type":"mcq","topic":null,"difficulty":null,"prompt":"ערימה של 100 דפים עובייה 10 מ״מ. מה העובי הממוצע של דף?","choices":["0.1 מ״מ","1 מ״מ","10 מ״מ"],"correct":0,"explanation":{"he":"מחלקים 10 מ״מ ב־100 ומקבלים 0.1 מ״מ לדף.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 3"}},{"id":"physics-basics-06","position":6,"type":"mcq","topic":null,"difficulty":null,"prompt":"למה כדאי למדוד ערימה של דפים מאותו סוג?","choices":["כדי להעריך את העובי הממוצע של דף מהסוג הזה","כי אין צורך לספור את הדפים","כדי לקבל תמיד תוצאה מדויקת לגמרי"],"correct":0,"explanation":{"he":"דפים מאותו סוג מאפשרים אומדן שימושי יותר של עובי דף ממוצע.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 3"}},{"id":"physics-basics-07","position":7,"type":"mcq","topic":null,"difficulty":null,"prompt":"מהי מדידה?","choices":["השוואה ליחידת מידה מוסכמת","ניחוש ללא השוואה","כתיבת שם הגוף"],"correct":0,"explanation":{"he":"מדידה משווה גודל ליחידת מידה מוסכמת.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 1"}},{"id":"physics-basics-08","position":8,"type":"mcq","topic":null,"difficulty":null,"prompt":"מה מתאים לתיאור אורך עיפרון?","choices":["14 ס״מ","14 בלבד","ס״מ בלבד"],"correct":0,"explanation":{"he":"תוצאת מדידה כוללת גם מספר וגם יחידת מידה.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 1"}},{"id":"physics-basics-09","position":9,"type":"mcq","topic":null,"difficulty":null,"prompt":"איזו פעולה היא מדידה עקיפה?","choices":["מדידת ערימת דפים וחלוקה במספר הדפים","קריאת אורך עיפרון מסרגל","קריאת הטמפרטורה ממדחום"],"correct":0,"explanation":{"he":"מודדים את הערימה ומחשבים ממנה את עובי הדף הממוצע.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 1"}},{"id":"physics-basics-10","position":10,"type":"mcq","topic":null,"difficulty":null,"prompt":"ערימה של 50 דפים היא בעובי 5 מ״מ. מה עובי דף ממוצע?","choices":["0.1 מ״מ","10 מ״מ","1 מ״מ"],"correct":0,"explanation":{"he":"מחלקים 5 מ״מ ב־50 דפים ומקבלים 0.1 מ״מ לדף.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 3"}},{"id":"physics-basics-11","position":11,"type":"mcq","topic":null,"difficulty":null,"prompt":"למה מודדים ערימת דפים בלי הכריכה?","choices":["כדי שהכריכה לא תוסיף עובי לתוצאה","כדי לשנות את מספר הדפים","כי הכריכה מחליפה את הסרגל"],"correct":0,"explanation":{"he":"הכריכה אינה דף בערימה ולכן עובייה יטה את החישוב.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 3"}}]},{"id":"physics-units","subject_id":"physics","exam_id":"physics-v1-assessment","title":"המרת יחידות אורך","description":"מתרגלים קילומטרים, מטרים, סנטימטרים ומילימטרים.","references":[{"id":"physics-pdf","kind":"pdf","title":"סיכום נושא מדידות (PDF)","url":"assets/materials/physics-measurements-grade-7.pdf","attribution":"שרית שרת","parts":[{"part":"עמוד 1","title":"מדידות: מהי מדידה, מדידה ישירה ומדידה עקיפה"},{"part":"עמוד 2","title":"המרת יחידות אורך"},{"part":"עמוד 3","title":"איך מודדים עובי של דף?"},{"part":"עמוד 4","title":"דיוק ומדידה נכונה"},{"part":"עמוד 5","title":"מודדים גובה של עמוד: הרעיון הגאומטרי"},{"part":"עמוד 6","title":"מדידת העמוד בפועל"}]}],"questions":[{"id":"physics-units-01","position":1,"type":"mcq","topic":null,"difficulty":null,"prompt":"כמה סנטימטרים יש במטר אחד?","choices":["10","100","1,000"],"correct":1,"explanation":{"he":"מטר אחד שווה ל־100 סנטימטרים.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 2"}},{"id":"physics-units-02","position":2,"type":"mcq","topic":null,"difficulty":null,"prompt":"כמה מילימטרים יש בסנטימטר אחד?","choices":["10","100","1,000"],"correct":0,"explanation":{"he":"סנטימטר אחד שווה ל־10 מילימטרים.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 2"}},{"id":"physics-units-03","position":3,"type":"mcq","topic":null,"difficulty":null,"prompt":"כמה מטרים יש ב־2 קילומטרים?","choices":["200","2,000","20,000"],"correct":1,"explanation":{"he":"קילומטר אחד הוא 1,000 מטרים, ולכן 2 ק״מ הם 2,000 מטרים.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 2"}},{"id":"physics-units-04","position":4,"type":"mcq","topic":null,"difficulty":null,"prompt":"כמה סנטימטרים הם 2.4 מטרים?","choices":["24","240","2,400"],"correct":1,"explanation":{"he":"ממטר לסנטימטר כופלים ב־100: 2.4 × 100 = 240.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 2"}},{"id":"physics-units-05","position":5,"type":"mcq","topic":null,"difficulty":null,"prompt":"כמה מטרים הם 350 סנטימטרים?","choices":["3.5","35","0.35"],"correct":0,"explanation":{"he":"מסנטימטר למטר מחלקים ב־100: 350 ÷ 100 = 3.5.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 2"}},{"id":"physics-units-06","position":6,"type":"mcq","topic":null,"difficulty":null,"prompt":"כמה הם מטר אחד ועוד 25 ס״מ?","choices":["1.25 מטרים","26 מטרים","1.025 מטרים"],"correct":0,"explanation":{"he":"ממירים 25 ס״מ ל־0.25 מטר ואז מחברים: 1 + 0.25 = 1.25.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 2"}},{"id":"physics-units-07","position":7,"type":"mcq","topic":null,"difficulty":null,"prompt":"כמה מילימטרים הם 3 ס״מ?","choices":["30 מ״מ","3 מ״מ","300 מ״מ"],"correct":0,"explanation":{"he":"כל סנטימטר הוא 10 מ״מ, ולכן 3 ס״מ הם 30 מ״מ.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 2"}},{"id":"physics-units-08","position":8,"type":"mcq","topic":null,"difficulty":null,"prompt":"כמה סנטימטרים הם 12 מ״מ?","choices":["1.2 ס״מ","12 ס״מ","120 ס״מ"],"correct":0,"explanation":{"he":"מחלקים את מספר המילימטרים ב־10: התוצאה היא 1.2 ס״מ.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 2"}},{"id":"physics-units-09","position":9,"type":"mcq","topic":null,"difficulty":null,"prompt":"כמה קילומטרים הם 1,500 מטרים?","choices":["1.5 ק״מ","15 ק״מ","0.15 ק״מ"],"correct":0,"explanation":{"he":"מחלקים ב־1,000: 1,500 מטרים הם 1.5 ק״מ.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 2"}},{"id":"physics-units-10","position":10,"type":"mcq","topic":null,"difficulty":null,"prompt":"מה ארוך יותר: 90 ס״מ או מטר אחד?","choices":["מטר אחד","90 ס״מ","הם שווים"],"correct":0,"explanation":{"he":"מטר אחד הוא 100 ס״מ, ולכן הוא ארוך מ־90 ס״מ.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 2"}},{"id":"physics-units-11","position":11,"type":"mcq","topic":null,"difficulty":null,"prompt":"מה קורה לאורך עצמו כשממירים אותו מס״מ למ״מ?","choices":["האורך נשאר זהה","האורך גדל פי 10","האורך קטן פי 10"],"correct":0,"explanation":{"he":"הגוף אינו משתנה; רק המספר והיחידה שבהם מתארים אותו משתנים.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 2"}}]},{"id":"physics-precision","subject_id":"physics","exam_id":"physics-v1-assessment","title":"מודדים נכון","description":"בוחרים כלי מתאים וקוראים את הסרגל בזהירות.","references":[{"id":"physics-pdf","kind":"pdf","title":"סיכום נושא מדידות (PDF)","url":"assets/materials/physics-measurements-grade-7.pdf","attribution":"שרית שרת","parts":[{"part":"עמוד 1","title":"מדידות: מהי מדידה, מדידה ישירה ומדידה עקיפה"},{"part":"עמוד 2","title":"המרת יחידות אורך"},{"part":"עמוד 3","title":"איך מודדים עובי של דף?"},{"part":"עמוד 4","title":"דיוק ומדידה נכונה"},{"part":"עמוד 5","title":"מודדים גובה של עמוד: הרעיון הגאומטרי"},{"part":"עמוד 6","title":"מדידת העמוד בפועל"}]}],"questions":[{"id":"physics-precision-01","position":1,"type":"mcq","topic":null,"difficulty":null,"prompt":"מאיזו נקודה בסרגל מתחילים למדוד אורך?","choices":["מסימון האפס","תמיד מקצה הסרגל","מהמספר 1"],"correct":0,"explanation":{"he":"מצמידים את תחילת הגוף לסימון האפס, שלא תמיד נמצא בקצה הסרגל.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 4"}},{"id":"physics-precision-02","position":2,"type":"mcq","topic":null,"difficulty":null,"prompt":"גוף מתחיל ב־2.0 ס״מ ומסתיים ב־8.2 ס״מ. מה אורכו?","choices":["6.2 ס״מ","8.2 ס״מ","10.2 ס״מ"],"correct":0,"explanation":{"he":"מחסרים את קריאת ההתחלה מקריאת הסיום: 8.2 − 2.0 = 6.2 ס״מ.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 4"}},{"id":"physics-precision-03","position":3,"type":"mcq","topic":null,"difficulty":null,"prompt":"איך מסתכלים על שנתות הסרגל כדי לצמצם טעות קריאה?","choices":["בניצב לסולם","באלכסון ככל האפשר","ממרחק גדול"],"correct":0,"explanation":{"he":"מבט בניצב לסולם מצמצם שגיאת קריאה בגלל זווית ההסתכלות.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 4"}},{"id":"physics-precision-04","position":4,"type":"mcq","topic":null,"difficulty":null,"prompt":"איזה כלי מתאים יותר למדידת אורך של חדר?","choices":["סרט מדידה","סרגל קצר בלבד","שעון"],"correct":0,"explanation":{"he":"סרט מדידה מתאים יותר לאורכו של חדר.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 4"}},{"id":"physics-precision-05","position":5,"type":"mcq","topic":null,"difficulty":null,"prompt":"מה מאפשרות שנתות קטנות יותר על כלי מדידה?","choices":["קריאה מפורטת יותר","ביטול מוחלט של כל טעות","שינוי האורך של הגוף"],"correct":0,"explanation":{"he":"שנתות קטנות מאפשרות לקרוא את המדידה בפירוט רב יותר.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 4"}},{"id":"physics-precision-06","position":6,"type":"mcq","topic":null,"difficulty":null,"prompt":"מדוע חוזרים על מדידה?","choices":["כדי לזהות חריגות ולהקטין השפעת שגיאות אקראיות","כדי לתקן בהכרח כלי פגום","כדי לשנות את גודל הגוף"],"correct":0,"explanation":{"he":"חזרות מסייעות לזהות חריגות, אך אינן מתקנות כלי פגום או שיטה שגויה.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 4"}},{"id":"physics-precision-07","position":7,"type":"mcq","topic":null,"difficulty":null,"prompt":"גוף מתחיל בסימון 3 ס״מ ומסתיים ב־9 ס״מ. מה אורכו?","choices":["6 ס״מ","9 ס״מ","12 ס״מ"],"correct":0,"explanation":{"he":"מחסרים את קריאת ההתחלה מקריאת הסיום: 9 פחות 3 הם 6 ס״מ.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 4"}},{"id":"physics-precision-08","position":8,"type":"mcq","topic":null,"difficulty":null,"prompt":"למה לא תמיד מתחילים למדוד מקצה הסרגל?","choices":["כי סימון האפס יכול להיות רחוק מהקצה","כי הסרגל תמיד מתחיל ב־1","כי אסור להשתמש בסימון האפס"],"correct":0,"explanation":{"he":"חשוב להתחיל מסימון האפס; קצה הסרגל לא תמיד נמצא בדיוק באפס.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 4"}},{"id":"physics-precision-09","position":9,"type":"mcq","topic":null,"difficulty":null,"prompt":"איזה כלי מתאים למדידת אורך של עיפרון?","choices":["סרגל עם שנתות קטנות","שעון עצר","מדחום"],"correct":0,"explanation":{"he":"סרגל עם שנתות מתאימות מאפשר למדוד את אורך העיפרון.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 4"}},{"id":"physics-precision-10","position":10,"type":"mcq","topic":null,"difficulty":null,"prompt":"מה חזרה על מדידה אינה מתקנת בהכרח?","choices":["שיטה שגויה או כלי פגום","טעות אקראית בודדת","תוצאה חריגה שאפשר לזהות"],"correct":0,"explanation":{"he":"חזרה יכולה לעזור לזהות חריגות, אך אינה מתקנת כלי פגום או שיטה שגויה.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 4"}},{"id":"physics-precision-11","position":11,"type":"mcq","topic":null,"difficulty":null,"prompt":"מה כדאי לבדוק לפני שרושמים תוצאה?","choices":["את היחידה, נקודת האפס וזווית ההסתכלות","רק את צבע כלי המדידה","רק את שם הגוף"],"correct":0,"explanation":{"he":"יחידה מתאימה, נקודת אפס נכונה ומבט בניצב עוזרים למדוד נכון.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 4"}}]},{"id":"physics-pole","subject_id":"physics","exam_id":"physics-v1-assessment","title":"מודדים גובה של עמוד","description":"מחשבים גובה בעזרת זווית של 45° ומרחק אופקי.","references":[{"id":"physics-pdf","kind":"pdf","title":"סיכום נושא מדידות (PDF)","url":"assets/materials/physics-measurements-grade-7.pdf","attribution":"שרית שרת","parts":[{"part":"עמוד 1","title":"מדידות: מהי מדידה, מדידה ישירה ומדידה עקיפה"},{"part":"עמוד 2","title":"המרת יחידות אורך"},{"part":"עמוד 3","title":"איך מודדים עובי של דף?"},{"part":"עמוד 4","title":"דיוק ומדידה נכונה"},{"part":"עמוד 5","title":"מודדים גובה של עמוד: הרעיון הגאומטרי"},{"part":"עמוד 6","title":"מדידת העמוד בפועל"}]}],"questions":[{"id":"physics-pole-01","position":1,"type":"mcq","topic":null,"difficulty":null,"prompt":"בשיטת העמוד, באיזו זווית לאופק מכוונים אל ראש העמוד?","choices":["45°","90°","180°"],"correct":0,"explanation":{"he":"מכוונים את קו הראייה בזווית של 45° ביחס לאופק.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 5"}},{"id":"physics-pole-02","position":2,"type":"mcq","topic":null,"difficulty":null,"prompt":"מה שווה למרחק האופקי לעמוד בשיטת 45°?","choices":["גובה ראש העמוד מעל גובה העיניים","גובה העמוד כולו","גובה העיניים"],"correct":0,"explanation":{"he":"במשולש ישר־זווית ושווה־שוקיים שני הניצבים שווים.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 5"}},{"id":"physics-pole-03","position":3,"type":"mcq","topic":null,"difficulty":null,"prompt":"המרחק האופקי לעמוד 6 מטרים וגובה העיניים 1.4 מטרים. מה גובה העמוד?","choices":["7.4 מטרים","6 מטרים","4.6 מטרים"],"correct":0,"explanation":{"he":"מחברים את המרחק האופקי לגובה העיניים: 6 + 1.4 = 7.4 מטרים.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 6"}},{"id":"physics-pole-04","position":4,"type":"mcq","topic":null,"difficulty":null,"prompt":"איזה מרחק מודדים לצורך החישוב?","choices":["המרחק האופקי אל בסיס העמוד","אורך קו הראייה האלכסוני","המרחק מראש העמוד לקרקע באומדן"],"correct":0,"explanation":{"he":"מודדים את המרחק האופקי מהנקודה שמתחת לעין אל בסיס העמוד.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 6"}},{"id":"physics-pole-05","position":5,"type":"mcq","topic":null,"difficulty":null,"prompt":"איזה גובה מוסיפים למרחק האופקי?","choices":["גובה העיניים מעל הקרקע","גובה התלמיד כולו","גובה המשולש שביד"],"correct":0,"explanation":{"he":"מוסיפים את גובה העיניים, כי המשולש מתחיל בגובה העין.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 6"}},{"id":"physics-pole-06","position":6,"type":"mcq","topic":null,"difficulty":null,"prompt":"איזה תנאי נדרש לשיטה המתוארת?","choices":["קרקע אופקית ובסיס העמוד באותו מפלס","העמוד חייב להיות נמוך מהתלמיד","אין צורך לדעת את זווית הראייה"],"correct":0,"explanation":{"he":"הנוסחה מתאימה כאשר הקרקע אופקית ובסיס העמוד באותו מפלס.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 5"}},{"id":"physics-pole-07","position":7,"type":"mcq","topic":null,"difficulty":null,"prompt":"המרחק לעמוד 4 מטרים וגובה העיניים 1.5 מטרים. מה גובה העמוד בשיטת 45°?","choices":["5.5 מטרים","4 מטרים","2.5 מטרים"],"correct":0,"explanation":{"he":"מחברים מרחק אופקי וגובה עיניים: 4 + 1.5 = 5.5 מטרים.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 5"}},{"id":"physics-pole-08","position":8,"type":"mcq","topic":null,"difficulty":null,"prompt":"מה צריך לראות דרך הגליל כשקובעים את נקודת המדידה?","choices":["את ראש העמוד","את בסיס העמוד בלבד","את הקרקע מתחת לעיניים"],"correct":0,"explanation":{"he":"מתקדמים או מתרחקים עד שרואים את ראש העמוד דרך הגליל המכוון ב־45°.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 6"}},{"id":"physics-pole-09","position":9,"type":"mcq","topic":null,"difficulty":null,"prompt":"מהו תפקיד המשולש בעל זווית 45°?","choices":["לעזור לכוון את הגליל בזווית הנכונה לאופק","למדוד ישירות את גובה העמוד","למדוד את עובי העמוד"],"correct":0,"explanation":{"he":"המשולש עוזר לקבע את הגליל בזווית של 45° ביחס לאופק.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 6"}},{"id":"physics-pole-10","position":10,"type":"mcq","topic":null,"difficulty":null,"prompt":"אם המרחק האופקי לעמוד 5 מטרים, מה גובה ראש העמוד מעל גובה העיניים בשיטה זו?","choices":["5 מטרים","10 מטרים","2.5 מטרים"],"correct":0,"explanation":{"he":"בזווית של 45° הניצבים במשולש שווים, ולכן הגובה מעל העיניים שווה למרחק האופקי.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 5"}},{"id":"physics-pole-11","position":11,"type":"mcq","topic":null,"difficulty":null,"prompt":"למה זו מדידה עקיפה?","choices":["כי מודדים מרחק וגובה עיניים ומחשבים מהם את גובה העמוד","כי קוראים את גובה העמוד ישירות מסרגל","כי אין צורך למדוד דבר"],"correct":0,"explanation":{"he":"גובה העמוד מתקבל מחישוב המבוסס על מדידות אחרות.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 6"}}]},{"id":"english-v1-practice","subject_id":"english","exam_id":"english-v1-practice","title":"אנגלית · אוצר מילים ודקדוק","description":"תרגול למבחן 9.11: אוצר מילים, חלקי דיבר והווה פשוט. הבנת הנקרא וכתיבה במבחן המלא.","references":[{"id":"english-teacher-material","kind":"site","title":"חומר המורה ודוגמאות התרגול למבחן באנגלית","url":"https://docs.google.com/document/d/1feJMJs_EXvdRq6xC-TQj_Nzcf6Rh7uYNHxxrG81j1qU/edit","attribution":null,"parts":[{"part":"חלקי דיבר","title":"חלקי דיבר"},{"part":"הווה פשוט — חיוב","title":"הווה פשוט — חיוב"},{"part":"הווה פשוט — שלילה","title":"הווה פשוט — שלילה"},{"part":"הווה פשוט — שאלות","title":"הווה פשוט — שאלות"},{"part":"כתיבה — אדם שאני מעריך","title":"כתיבה — אדם שאני מעריך"}]},{"id":"english-vocabulary-12","kind":"site","title":"אוצר מילים — תרגול המורה לעמוד 12","url":"https://wordwall.net/resource/36327179","attribution":null,"parts":[{"part":"אוצר מילים — עמוד 12","title":"אוצר מילים — עמוד 12"}]},{"id":"english-vocabulary-20","kind":"site","title":"אוצר מילים — תרגול המורה לעמוד 20","url":"https://wordwall.net/resource/36327199","attribution":null,"parts":[{"part":"אוצר מילים — עמוד 20","title":"אוצר מילים — עמוד 20"}]},{"id":"english-vocabulary-28","kind":"site","title":"אוצר מילים — תרגול המורה לעמוד 28","url":"https://wordwall.net/resource/36327212","attribution":null,"parts":[{"part":"אוצר מילים — עמוד 28","title":"אוצר מילים — עמוד 28"}]}],"questions":[{"id":"english-06","position":6,"type":"mcq","topic":"אוצר מילים","difficulty":"easy","prompt":"Choose the Hebrew meaning of “journey”.","choices":["מסע","גשר","בחירה","סכנה"],"correct":0,"explanation":{"he":"בתרגול אוצר המילים בעמוד 12, journey פירושו מסע.","en":""},"ref":{"id":"english-vocabulary-12","part":"אוצר מילים — עמוד 12"}},{"id":"english-07","position":7,"type":"mcq","topic":"אוצר מילים","difficulty":"easy","prompt":"Choose the word that means “זהיר”.","choices":["careful","wide","usual","possible"],"correct":0,"explanation":{"he":"בתרגול עמוד 12, careful פירושו זהיר.","en":""},"ref":{"id":"english-vocabulary-12","part":"אוצר מילים — עמוד 12"}},{"id":"english-08","position":8,"type":"mcq","topic":"אוצר מילים","difficulty":"easy","prompt":"Choose the word that means “ארוחה”.","choices":["meal","bowl","guide","world"],"correct":0,"explanation":{"he":"בתרגול עמוד 20, meal פירושו ארוחה.","en":""},"ref":{"id":"english-vocabulary-20","part":"אוצר מילים — עמוד 20"}},{"id":"english-09","position":9,"type":"mcq","topic":"אוצר מילים","difficulty":"medium","prompt":"Choose the best word: “I want to ___ the school club.”","choices":["join","feed","receive","serve"],"correct":0,"explanation":{"he":"בתרגול עמוד 28, join פירושו להצטרף; מצטרפים למועדון.","en":""},"ref":{"id":"english-vocabulary-28","part":"אוצר מילים — עמוד 28"}},{"id":"english-10","position":10,"type":"mcq","topic":"חלקי דיבר","difficulty":"medium","prompt":"In “The guide helps visitors”, what is the part of speech of “guide”?","choices":["Noun","Verb","Adjective"],"correct":0,"explanation":{"he":"guide מציין אדם ולכן הוא שם עצם במשפט הזה.","en":""},"ref":{"id":"english-teacher-material","part":"חלקי דיבר"}},{"id":"english-11","position":11,"type":"mcq","topic":"חלקי דיבר","difficulty":"medium","prompt":"In “The children walk to school”, what is the part of speech of “walk”?","choices":["Verb","Noun","Adjective"],"correct":0,"explanation":{"he":"walk מתאר פעולה ולכן הוא פועל.","en":""},"ref":{"id":"english-teacher-material","part":"חלקי דיבר"}},{"id":"english-12","position":12,"type":"mcq","topic":"חלקי דיבר","difficulty":"medium","prompt":"In “She is a careful guide”, what is the part of speech of “careful”?","choices":["Adjective","Noun","Verb"],"correct":0,"explanation":{"he":"careful מתאר את המדריכה ולכן הוא שם תואר.","en":""},"ref":{"id":"english-teacher-material","part":"חלקי דיבר"}},{"id":"english-13","position":13,"type":"mcq","topic":"הווה פשוט — חיוב","difficulty":"medium","prompt":"Choose the correct form: “My aunt ___ near the river every day.”","choices":["walks","walk","walking","are walk"],"correct":0,"explanation":{"he":"בהווה פשוט מוסיפים s לפועל עם נושא בגוף שלישי יחיד, כמו my aunt.","en":""},"ref":{"id":"english-teacher-material","part":"הווה פשוט — חיוב"}},{"id":"english-14","position":14,"type":"mcq","topic":"הווה פשוט — חיוב","difficulty":"medium","prompt":"Choose the correct form: “The children ___ English at school.”","choices":["study","studies","studying","is study"],"correct":0,"explanation":{"he":"עם נושא ברבים משתמשים בצורת הבסיס study.","en":""},"ref":{"id":"english-teacher-material","part":"הווה פשוט — חיוב"}},{"id":"english-15","position":15,"type":"mcq","topic":"הווה פשוט — שלילה","difficulty":"medium","prompt":"Choose the correct form: “Maya ___ work on Sundays.”","choices":["doesn’t","don’t","isn’t","aren’t"],"correct":0,"explanation":{"he":"עם Maya משתמשים ב־doesn’t ואחריו פועל בצורת הבסיס.","en":""},"ref":{"id":"english-teacher-material","part":"הווה פשוט — שלילה"}},{"id":"english-16","position":16,"type":"mcq","topic":"הווה פשוט — שלילה","difficulty":"medium","prompt":"Is this sentence grammatically correct? “They don’t lives in a city.”","choices":["True","False"],"correct":1,"explanation":{"he":"אחרי don’t הפועל בצורת הבסיס: They don’t live in a city.","en":""},"ref":{"id":"english-teacher-material","part":"הווה פשוט — שלילה"}},{"id":"english-17","position":17,"type":"mcq","topic":"הווה פשוט — שאלות","difficulty":"hard","prompt":"Choose the correct question.","choices":["Does your aunt help visitors?","Does your aunt helps visitors?","Do your aunt help visitors?","Your aunt does help visitors?"],"correct":0,"explanation":{"he":"שאלה עם your aunt נפתחת ב־Does ואחריו הנושא ופועל הבסיס help.","en":""},"ref":{"id":"english-teacher-material","part":"הווה פשוט — שאלות"}},{"id":"english-18","position":18,"type":"mcq","topic":"הווה פשוט — שאלות","difficulty":"hard","prompt":"Is this sentence grammatically correct? “Do the children study English every day?”","choices":["True","False"],"correct":0,"explanation":{"he":"עם children משתמשים ב־Do, ואחריו הנושא ופועל הבסיס study.","en":""},"ref":{"id":"english-teacher-material","part":"הווה פשוט — שאלות"}}]},{"id":"english-vocabulary-12","subject_id":"english","exam_id":"english-v1-practice","title":"אוצר מילים — תרגול המורה לעמוד 12","description":"כל הפריטים התקינים בתרגיל המורה · 25 שאלות","references":[{"id":"english-vocabulary-12","kind":"site","title":"אוצר מילים — תרגול המורה לעמוד 12","url":"https://wordwall.net/he/resource/36327179?wwmethod=link","attribution":"תרגול שקושר במסמך המורה","parts":[{"part":"אוצר מילים — עמוד 12","title":"אוצר מילים — עמוד 12"}]}],"questions":[{"id":"english-vocabulary-12-01","position":1,"type":"mcq","topic":"אוצר מילים — תרגול המורה לעמוד 12","difficulty":"medium","prompt":"מה פירוש הביטוי “activity”?","choices":["פעילות","גשר","בחירה, ברירה","סכנה"],"correct":0,"explanation":{"he":"בתרגול המורה: activity — פעילות.","en":"The teacher's vocabulary pair is activity — פעילות."},"ref":{"id":"english-vocabulary-12","part":"אוצר מילים — עמוד 12"}},{"id":"english-vocabulary-12-02","position":2,"type":"mcq","topic":"אוצר מילים — תרגול המורה לעמוד 12","difficulty":"medium","prompt":"מה פירוש הביטוי “bridge”?","choices":["גשר","פעילות","בחירה, ברירה","סכנה"],"correct":0,"explanation":{"he":"בתרגול המורה: bridge — גשר.","en":"The teacher's vocabulary pair is bridge — גשר."},"ref":{"id":"english-vocabulary-12","part":"אוצר מילים — עמוד 12"}},{"id":"english-vocabulary-12-03","position":3,"type":"mcq","topic":"אוצר מילים — תרגול המורה לעמוד 12","difficulty":"medium","prompt":"מה פירוש הביטוי “choice”?","choices":["בחירה, ברירה","פעילות","גשר","סכנה"],"correct":0,"explanation":{"he":"בתרגול המורה: choice — בחירה, ברירה.","en":"The teacher's vocabulary pair is choice — בחירה, ברירה."},"ref":{"id":"english-vocabulary-12","part":"אוצר מילים — עמוד 12"}},{"id":"english-vocabulary-12-04","position":4,"type":"mcq","topic":"אוצר מילים — תרגול המורה לעמוד 12","difficulty":"medium","prompt":"מה פירוש הביטוי “danger”?","choices":["סכנה","פעילות","גשר","בחירה, ברירה"],"correct":0,"explanation":{"he":"בתרגול המורה: danger — סכנה.","en":"The teacher's vocabulary pair is danger — סכנה."},"ref":{"id":"english-vocabulary-12","part":"אוצר מילים — עמוד 12"}},{"id":"english-vocabulary-12-05","position":5,"type":"mcq","topic":"אוצר מילים — תרגול המורה לעמוד 12","difficulty":"medium","prompt":"מה פירוש הביטוי “journey”?","choices":["מסע","פעילות","גשר","בחירה, ברירה"],"correct":0,"explanation":{"he":"בתרגול המורה: journey — מסע.","en":"The teacher's vocabulary pair is journey — מסע."},"ref":{"id":"english-vocabulary-12","part":"אוצר מילים — עמוד 12"}},{"id":"english-vocabulary-12-06","position":6,"type":"mcq","topic":"אוצר מילים — תרגול המורה לעמוד 12","difficulty":"medium","prompt":"מה פירוש הביטוי “mountain”?","choices":["הר","פעילות","גשר","בחירה, ברירה"],"correct":0,"explanation":{"he":"בתרגול המורה: mountain — הר.","en":"The teacher's vocabulary pair is mountain — הר."},"ref":{"id":"english-vocabulary-12","part":"אוצר מילים — עמוד 12"}},{"id":"english-vocabulary-12-07","position":7,"type":"mcq","topic":"אוצר מילים — תרגול המורה לעמוד 12","difficulty":"medium","prompt":"מה פירוש הביטוי “river”?","choices":["נהר","פעילות","גשר","בחירה, ברירה"],"correct":0,"explanation":{"he":"בתרגול המורה: river — נהר.","en":"The teacher's vocabulary pair is river — נהר."},"ref":{"id":"english-vocabulary-12","part":"אוצר מילים — עמוד 12"}},{"id":"english-vocabulary-12-08","position":8,"type":"mcq","topic":"אוצר מילים — תרגול המורה לעמוד 12","difficulty":"medium","prompt":"מה פירוש הביטוי “village”?","choices":["כפר","פעילות","גשר","בחירה, ברירה"],"correct":0,"explanation":{"he":"בתרגול המורה: village — כפר.","en":"The teacher's vocabulary pair is village — כפר."},"ref":{"id":"english-vocabulary-12","part":"אוצר מילים — עמוד 12"}},{"id":"english-vocabulary-12-09","position":9,"type":"mcq","topic":"אוצר מילים — תרגול המורה לעמוד 12","difficulty":"medium","prompt":"מה פירוש הביטוי “continue”?","choices":["להמשיך","פעילות","גשר","בחירה, ברירה"],"correct":0,"explanation":{"he":"בתרגול המורה: continue — להמשיך.","en":"The teacher's vocabulary pair is continue — להמשיך."},"ref":{"id":"english-vocabulary-12","part":"אוצר מילים — עמוד 12"}},{"id":"english-vocabulary-12-10","position":10,"type":"mcq","topic":"אוצר מילים — תרגול המורה לעמוד 12","difficulty":"medium","prompt":"מה פירוש הביטוי “depend on”?","choices":["להסתמך על","פעילות","גשר","בחירה, ברירה"],"correct":0,"explanation":{"he":"בתרגול המורה: depend on — להסתמך על.","en":"The teacher's vocabulary pair is depend on — להסתמך על."},"ref":{"id":"english-vocabulary-12","part":"אוצר מילים — עמוד 12"}},{"id":"english-vocabulary-12-11","position":11,"type":"mcq","topic":"אוצר מילים — תרגול המורה לעמוד 12","difficulty":"medium","prompt":"מה פירוש הביטוי “fix”?","choices":["לתקן","פעילות","גשר","בחירה, ברירה"],"correct":0,"explanation":{"he":"בתרגול המורה: fix — לתקן.","en":"The teacher's vocabulary pair is fix — לתקן."},"ref":{"id":"english-vocabulary-12","part":"אוצר מילים — עמוד 12"}},{"id":"english-vocabulary-12-12","position":12,"type":"mcq","topic":"אוצר מילים — תרגול המורה לעמוד 12","difficulty":"medium","prompt":"מה פירוש הביטוי “imagine”?","choices":["לדמיין, להאמין","פעילות","גשר","בחירה, ברירה"],"correct":0,"explanation":{"he":"בתרגול המורה: imagine — לדמיין, להאמין.","en":"The teacher's vocabulary pair is imagine — לדמיין, להאמין."},"ref":{"id":"english-vocabulary-12","part":"אוצר מילים — עמוד 12"}},{"id":"english-vocabulary-12-13","position":13,"type":"mcq","topic":"אוצר מילים — תרגול המורה לעמוד 12","difficulty":"medium","prompt":"מה פירוש הביטוי “prefer”?","choices":["להעדיף","פעילות","גשר","בחירה, ברירה"],"correct":0,"explanation":{"he":"בתרגול המורה: prefer — להעדיף.","en":"The teacher's vocabulary pair is prefer — להעדיף."},"ref":{"id":"english-vocabulary-12","part":"אוצר מילים — עמוד 12"}},{"id":"english-vocabulary-12-14","position":14,"type":"mcq","topic":"אוצר מילים — תרגול המורה לעמוד 12","difficulty":"medium","prompt":"מה פירוש הביטוי “realize”?","choices":["להבין, לקלוט","פעילות","גשר","בחירה, ברירה"],"correct":0,"explanation":{"he":"בתרגול המורה: realize — להבין, לקלוט.","en":"The teacher's vocabulary pair is realize — להבין, לקלוט."},"ref":{"id":"english-vocabulary-12","part":"אוצר מילים — עמוד 12"}},{"id":"english-vocabulary-12-15","position":15,"type":"mcq","topic":"אוצר מילים — תרגול המורה לעמוד 12","difficulty":"medium","prompt":"מה פירוש הביטוי “careful”?","choices":["זהיר","פעילות","גשר","בחירה, ברירה"],"correct":0,"explanation":{"he":"בתרגול המורה: careful — זהיר.","en":"The teacher's vocabulary pair is careful — זהיר."},"ref":{"id":"english-vocabulary-12","part":"אוצר מילים — עמוד 12"}},{"id":"english-vocabulary-12-16","position":16,"type":"mcq","topic":"אוצר מילים — תרגול המורה לעמוד 12","difficulty":"medium","prompt":"מה פירוש הביטוי “dangerous”?","choices":["מסוכן","פעילות","גשר","בחירה, ברירה"],"correct":0,"explanation":{"he":"בתרגול המורה: dangerous — מסוכן.","en":"The teacher's vocabulary pair is dangerous — מסוכן."},"ref":{"id":"english-vocabulary-12","part":"אוצר מילים — עמוד 12"}},{"id":"english-vocabulary-12-17","position":17,"type":"mcq","topic":"אוצר מילים — תרגול המורה לעמוד 12","difficulty":"medium","prompt":"מה פירוש הביטוי “possible”?","choices":["אפשרי","פעילות","גשר","בחירה, ברירה"],"correct":0,"explanation":{"he":"בתרגול המורה: possible — אפשרי.","en":"The teacher's vocabulary pair is possible — אפשרי."},"ref":{"id":"english-vocabulary-12","part":"אוצר מילים — עמוד 12"}},{"id":"english-vocabulary-12-18","position":18,"type":"mcq","topic":"אוצר מילים — תרגול המורה לעמוד 12","difficulty":"medium","prompt":"מה פירוש הביטוי “unusual”?","choices":["יוצא דופן","פעילות","גשר","בחירה, ברירה"],"correct":0,"explanation":{"he":"בתרגול המורה: unusual — יוצא דופן.","en":"The teacher's vocabulary pair is unusual — יוצא דופן."},"ref":{"id":"english-vocabulary-12","part":"אוצר מילים — עמוד 12"}},{"id":"english-vocabulary-12-19","position":19,"type":"mcq","topic":"אוצר מילים — תרגול המורה לעמוד 12","difficulty":"medium","prompt":"מה פירוש הביטוי “usual”?","choices":["רגיל","פעילות","גשר","בחירה, ברירה"],"correct":0,"explanation":{"he":"בתרגול המורה: usual — רגיל.","en":"The teacher's vocabulary pair is usual — רגיל."},"ref":{"id":"english-vocabulary-12","part":"אוצר מילים — עמוד 12"}},{"id":"english-vocabulary-12-20","position":20,"type":"mcq","topic":"אוצר מילים — תרגול המורה לעמוד 12","difficulty":"medium","prompt":"מה פירוש הביטוי “wide”?","choices":["רחב","פעילות","גשר","בחירה, ברירה"],"correct":0,"explanation":{"he":"בתרגול המורה: wide — רחב.","en":"The teacher's vocabulary pair is wide — רחב."},"ref":{"id":"english-vocabulary-12","part":"אוצר מילים — עמוד 12"}},{"id":"english-vocabulary-12-21","position":21,"type":"mcq","topic":"אוצר מילים — תרגול המורה לעמוד 12","difficulty":"medium","prompt":"מה פירוש הביטוי “across”?","choices":["מעבר","פעילות","גשר","בחירה, ברירה"],"correct":0,"explanation":{"he":"בתרגול המורה: across — מעבר.","en":"The teacher's vocabulary pair is across — מעבר."},"ref":{"id":"english-vocabulary-12","part":"אוצר מילים — עמוד 12"}},{"id":"english-vocabulary-12-22","position":22,"type":"mcq","topic":"אוצר מילים — תרגול המורה לעמוד 12","difficulty":"medium","prompt":"מה פירוש הביטוי “any”?","choices":["איזשהו, כל","פעילות","גשר","בחירה, ברירה"],"correct":0,"explanation":{"he":"בתרגול המורה: any — איזשהו, כל.","en":"The teacher's vocabulary pair is any — איזשהו, כל."},"ref":{"id":"english-vocabulary-12","part":"אוצר מילים — עמוד 12"}},{"id":"english-vocabulary-12-23","position":23,"type":"mcq","topic":"אוצר מילים — תרגול המורה לעמוד 12","difficulty":"medium","prompt":"מה פירוש הביטוי “anybody”?","choices":["כל אחד","פעילות","גשר","בחירה, ברירה"],"correct":0,"explanation":{"he":"בתרגול המורה: anybody — כל אחד.","en":"The teacher's vocabulary pair is anybody — כל אחד."},"ref":{"id":"english-vocabulary-12","part":"אוצר מילים — עמוד 12"}},{"id":"english-vocabulary-12-24","position":24,"type":"mcq","topic":"אוצר מילים — תרגול המורה לעמוד 12","difficulty":"medium","prompt":"מה פירוש הביטוי “directly”?","choices":["ישירות","פעילות","גשר","בחירה, ברירה"],"correct":0,"explanation":{"he":"בתרגול המורה: directly — ישירות.","en":"The teacher's vocabulary pair is directly — ישירות."},"ref":{"id":"english-vocabulary-12","part":"אוצר מילים — עמוד 12"}},{"id":"english-vocabulary-12-25","position":25,"type":"mcq","topic":"אוצר מילים — תרגול המורה לעמוד 12","difficulty":"medium","prompt":"מה פירוש הביטוי “next to”?","choices":["ליד","פעילות","גשר","בחירה, ברירה"],"correct":0,"explanation":{"he":"בתרגול המורה: next to — ליד.","en":"The teacher's vocabulary pair is next to — ליד."},"ref":{"id":"english-vocabulary-12","part":"אוצר מילים — עמוד 12"}}]},{"id":"english-vocabulary-20","subject_id":"english","exam_id":"english-v1-practice","title":"אוצר מילים — תרגול המורה לעמוד 20","description":"כל הפריטים התקינים בתרגיל המורה · 25 שאלות","references":[{"id":"english-vocabulary-20","kind":"site","title":"אוצר מילים — תרגול המורה לעמוד 20","url":"https://wordwall.net/he/resource/36327199?wwmethod=link","attribution":"תרגול שקושר במסמך המורה","parts":[{"part":"אוצר מילים — עמוד 20","title":"אוצר מילים — עמוד 20"}]}],"questions":[{"id":"english-vocabulary-20-01","position":1,"type":"mcq","topic":"אוצר מילים — תרגול המורה לעמוד 20","difficulty":"medium","prompt":"מה פירוש הביטוי “bowl”?","choices":["קערה","מדריך","היסטוריה","עבודה"],"correct":0,"explanation":{"he":"בתרגול המורה: bowl — קערה.","en":"The teacher's vocabulary pair is bowl — קערה."},"ref":{"id":"english-vocabulary-20","part":"אוצר מילים — עמוד 20"}},{"id":"english-vocabulary-20-02","position":2,"type":"mcq","topic":"אוצר מילים — תרגול המורה לעמוד 20","difficulty":"medium","prompt":"מה פירוש הביטוי “guide”?","choices":["מדריך","קערה","היסטוריה","עבודה"],"correct":0,"explanation":{"he":"בתרגול המורה: guide — מדריך.","en":"The teacher's vocabulary pair is guide — מדריך."},"ref":{"id":"english-vocabulary-20","part":"אוצר מילים — עמוד 20"}},{"id":"english-vocabulary-20-03","position":3,"type":"mcq","topic":"אוצר מילים — תרגול המורה לעמוד 20","difficulty":"medium","prompt":"מה פירוש הביטוי “history”?","choices":["היסטוריה","קערה","מדריך","עבודה"],"correct":0,"explanation":{"he":"בתרגול המורה: history — היסטוריה.","en":"The teacher's vocabulary pair is history — היסטוריה."},"ref":{"id":"english-vocabulary-20","part":"אוצר מילים — עמוד 20"}},{"id":"english-vocabulary-20-04","position":4,"type":"mcq","topic":"אוצר מילים — תרגול המורה לעמוד 20","difficulty":"medium","prompt":"מה פירוש הביטוי “job”?","choices":["עבודה","קערה","מדריך","היסטוריה"],"correct":0,"explanation":{"he":"בתרגול המורה: job — עבודה.","en":"The teacher's vocabulary pair is job — עבודה."},"ref":{"id":"english-vocabulary-20","part":"אוצר מילים — עמוד 20"}},{"id":"english-vocabulary-20-05","position":5,"type":"mcq","topic":"אוצר מילים — תרגול המורה לעמוד 20","difficulty":"medium","prompt":"מה פירוש הביטוי “lemon”?","choices":["לימון","קערה","מדריך","היסטוריה"],"correct":0,"explanation":{"he":"בתרגול המורה: lemon — לימון.","en":"The teacher's vocabulary pair is lemon — לימון."},"ref":{"id":"english-vocabulary-20","part":"אוצר מילים — עמוד 20"}},{"id":"english-vocabulary-20-06","position":6,"type":"mcq","topic":"אוצר מילים — תרגול המורה לעמוד 20","difficulty":"medium","prompt":"מה פירוש הביטוי “meal”?","choices":["ארוחה","קערה","מדריך","היסטוריה"],"correct":0,"explanation":{"he":"בתרגול המורה: meal — ארוחה.","en":"The teacher's vocabulary pair is meal — ארוחה."},"ref":{"id":"english-vocabulary-20","part":"אוצר מילים — עמוד 20"}},{"id":"english-vocabulary-20-07","position":7,"type":"mcq","topic":"אוצר מילים — תרגול המורה לעמוד 20","difficulty":"medium","prompt":"מה פירוש הביטוי “nation”?","choices":["אומה","קערה","מדריך","היסטוריה"],"correct":0,"explanation":{"he":"בתרגול המורה: nation — אומה.","en":"The teacher's vocabulary pair is nation — אומה."},"ref":{"id":"english-vocabulary-20","part":"אוצר מילים — עמוד 20"}},{"id":"english-vocabulary-20-08","position":8,"type":"mcq","topic":"אוצר מילים — תרגול המורה לעמוד 20","difficulty":"medium","prompt":"מה פירוש הביטוי “oil”?","choices":["שמן","קערה","מדריך","היסטוריה"],"correct":0,"explanation":{"he":"בתרגול המורה: oil — שמן.","en":"The teacher's vocabulary pair is oil — שמן."},"ref":{"id":"english-vocabulary-20","part":"אוצר מילים — עמוד 20"}},{"id":"english-vocabulary-20-11","position":11,"type":"mcq","topic":"אוצר מילים — תרגול המורה לעמוד 20","difficulty":"medium","prompt":"מה פירוש הביטוי “world”?","choices":["עולם","קערה","מדריך","היסטוריה"],"correct":0,"explanation":{"he":"בתרגול המורה: world — עולם.","en":"The teacher's vocabulary pair is world — עולם."},"ref":{"id":"english-vocabulary-20","part":"אוצר מילים — עמוד 20"}},{"id":"english-vocabulary-20-12","position":12,"type":"mcq","topic":"אוצר מילים — תרגול המורה לעמוד 20","difficulty":"medium","prompt":"מה פירוש הביטוי “amaze”?","choices":["להדהים","קערה","מדריך","היסטוריה"],"correct":0,"explanation":{"he":"בתרגול המורה: amaze — להדהים.","en":"The teacher's vocabulary pair is amaze — להדהים."},"ref":{"id":"english-vocabulary-20","part":"אוצר מילים — עמוד 20"}},{"id":"english-vocabulary-20-13","position":13,"type":"mcq","topic":"אוצר מילים — תרגול המורה לעמוד 20","difficulty":"medium","prompt":"מה פירוש הביטוי “fall (fell) in love”?","choices":["להתאהב","קערה","מדריך","היסטוריה"],"correct":0,"explanation":{"he":"בתרגול המורה: fall (fell) in love — להתאהב.","en":"The teacher's vocabulary pair is fall (fell) in love — להתאהב."},"ref":{"id":"english-vocabulary-20","part":"אוצר מילים — עמוד 20"}},{"id":"english-vocabulary-20-14","position":14,"type":"mcq","topic":"אוצר מילים — תרגול המורה לעמוד 20","difficulty":"medium","prompt":"מה פירוש הביטוי “feed”?","choices":["להאכיל","קערה","מדריך","היסטוריה"],"correct":0,"explanation":{"he":"בתרגול המורה: feed — להאכיל.","en":"The teacher's vocabulary pair is feed — להאכיל."},"ref":{"id":"english-vocabulary-20","part":"אוצר מילים — עמוד 20"}},{"id":"english-vocabulary-20-15","position":15,"type":"mcq","topic":"אוצר מילים — תרגול המורה לעמוד 20","difficulty":"medium","prompt":"מה פירוש הביטוי “follow”?","choices":["ללכת בעקבות","קערה","מדריך","היסטוריה"],"correct":0,"explanation":{"he":"בתרגול המורה: follow — ללכת בעקבות.","en":"The teacher's vocabulary pair is follow — ללכת בעקבות."},"ref":{"id":"english-vocabulary-20","part":"אוצר מילים — עמוד 20"}},{"id":"english-vocabulary-20-16","position":16,"type":"mcq","topic":"אוצר מילים — תרגול המורה לעמוד 20","difficulty":"medium","prompt":"מה פירוש הביטוי “open”?","choices":["לפתוח","קערה","מדריך","היסטוריה"],"correct":0,"explanation":{"he":"בתרגול המורה: open — לפתוח.","en":"The teacher's vocabulary pair is open — לפתוח."},"ref":{"id":"english-vocabulary-20","part":"אוצר מילים — עמוד 20"}},{"id":"english-vocabulary-20-17","position":17,"type":"mcq","topic":"אוצר מילים — תרגול המורה לעמוד 20","difficulty":"medium","prompt":"מה פירוש הביטוי “receive”?","choices":["לקבל","קערה","מדריך","היסטוריה"],"correct":0,"explanation":{"he":"בתרגול המורה: receive — לקבל.","en":"The teacher's vocabulary pair is receive — לקבל."},"ref":{"id":"english-vocabulary-20","part":"אוצר מילים — עמוד 20"}},{"id":"english-vocabulary-20-18","position":18,"type":"mcq","topic":"אוצר מילים — תרגול המורה לעמוד 20","difficulty":"medium","prompt":"מה פירוש הביטוי “serve”?","choices":["לשרת, להגיש","קערה","מדריך","היסטוריה"],"correct":0,"explanation":{"he":"בתרגול המורה: serve — לשרת, להגיש.","en":"The teacher's vocabulary pair is serve — לשרת, להגיש."},"ref":{"id":"english-vocabulary-20","part":"אוצר מילים — עמוד 20"}},{"id":"english-vocabulary-20-19","position":19,"type":"mcq","topic":"אוצר מילים — תרגול המורה לעמוד 20","difficulty":"medium","prompt":"מה פירוש הביטוי “shake hands”?","choices":["ללחוץ ידיים","קערה","מדריך","היסטוריה"],"correct":0,"explanation":{"he":"בתרגול המורה: shake hands — ללחוץ ידיים.","en":"The teacher's vocabulary pair is shake hands — ללחוץ ידיים."},"ref":{"id":"english-vocabulary-20","part":"אוצר מילים — עמוד 20"}},{"id":"english-vocabulary-20-20","position":20,"type":"mcq","topic":"אוצר מילים — תרגול המורה לעמוד 20","difficulty":"medium","prompt":"מה פירוש הביטוי “welcome”?","choices":["להגיד שלום, לקבל בברכה","קערה","מדריך","היסטוריה"],"correct":0,"explanation":{"he":"בתרגול המורה: welcome — להגיד שלום, לקבל בברכה.","en":"The teacher's vocabulary pair is welcome — להגיד שלום, לקבל בברכה."},"ref":{"id":"english-vocabulary-20","part":"אוצר מילים — עמוד 20"}},{"id":"english-vocabulary-20-21","position":21,"type":"mcq","topic":"אוצר מילים — תרגול המורה לעמוד 20","difficulty":"medium","prompt":"מה פירוש הביטוי “amazing”?","choices":["מדהים","קערה","מדריך","היסטוריה"],"correct":0,"explanation":{"he":"בתרגול המורה: amazing — מדהים.","en":"The teacher's vocabulary pair is amazing — מדהים."},"ref":{"id":"english-vocabulary-20","part":"אוצר מילים — עמוד 20"}},{"id":"english-vocabulary-20-22","position":22,"type":"mcq","topic":"אוצר מילים — תרגול המורה לעמוד 20","difficulty":"medium","prompt":"מה פירוש הביטוי “certain”?","choices":["בטוח","קערה","מדריך","היסטוריה"],"correct":0,"explanation":{"he":"בתרגול המורה: certain — בטוח.","en":"The teacher's vocabulary pair is certain — בטוח."},"ref":{"id":"english-vocabulary-20","part":"אוצר מילים — עמוד 20"}},{"id":"english-vocabulary-20-23","position":23,"type":"mcq","topic":"אוצר מילים — תרגול המורה לעמוד 20","difficulty":"medium","prompt":"מה פירוש הביטוי “lovely”?","choices":["נעים, נחמד","קערה","מדריך","היסטוריה"],"correct":0,"explanation":{"he":"בתרגול המורה: lovely — נעים, נחמד.","en":"The teacher's vocabulary pair is lovely — נעים, נחמד."},"ref":{"id":"english-vocabulary-20","part":"אוצר מילים — עמוד 20"}},{"id":"english-vocabulary-20-24","position":24,"type":"mcq","topic":"אוצר מילים — תרגול המורה לעמוד 20","difficulty":"medium","prompt":"מה פירוש הביטוי “main”?","choices":["עיקרי","קערה","מדריך","היסטוריה"],"correct":0,"explanation":{"he":"בתרגול המורה: main — עיקרי.","en":"The teacher's vocabulary pair is main — עיקרי."},"ref":{"id":"english-vocabulary-20","part":"אוצר מילים — עמוד 20"}},{"id":"english-vocabulary-20-25","position":25,"type":"mcq","topic":"אוצר מילים — תרגול המורה לעמוד 20","difficulty":"medium","prompt":"מה פירוש הביטוי “typical”?","choices":["טיפוסי","קערה","מדריך","היסטוריה"],"correct":0,"explanation":{"he":"בתרגול המורה: typical — טיפוסי.","en":"The teacher's vocabulary pair is typical — טיפוסי."},"ref":{"id":"english-vocabulary-20","part":"אוצר מילים — עמוד 20"}},{"id":"english-vocabulary-20-26","position":26,"type":"mcq","topic":"אוצר מילים — תרגול המורה לעמוד 20","difficulty":"medium","prompt":"מה פירוש הביטוי “warm”?","choices":["חם (התנהגות)","קערה","מדריך","היסטוריה"],"correct":0,"explanation":{"he":"בתרגול המורה: warm — חם (התנהגות).","en":"The teacher's vocabulary pair is warm — חם (התנהגות)."},"ref":{"id":"english-vocabulary-20","part":"אוצר מילים — עמוד 20"}},{"id":"english-vocabulary-20-27","position":27,"type":"mcq","topic":"אוצר מילים — תרגול המורה לעמוד 20","difficulty":"medium","prompt":"מה פירוש הביטוי “according to”?","choices":["לפי","קערה","מדריך","היסטוריה"],"correct":0,"explanation":{"he":"בתרגול המורה: according to — לפי.","en":"The teacher's vocabulary pair is according to — לפי."},"ref":{"id":"english-vocabulary-20","part":"אוצר מילים — עמוד 20"}}]},{"id":"english-vocabulary-28","subject_id":"english","exam_id":"english-v1-practice","title":"אוצר מילים — תרגול המורה לעמוד 28","description":"כל הפריטים התקינים בתרגיל המורה · 17 שאלות","references":[{"id":"english-vocabulary-28","kind":"site","title":"אוצר מילים — תרגול המורה לעמוד 28","url":"https://wordwall.net/he/resource/36327212?wwmethod=link","attribution":"תרגול שקושר במסמך המורה","parts":[{"part":"אוצר מילים — עמוד 28","title":"אוצר מילים — עמוד 28"}]}],"questions":[{"id":"english-vocabulary-28-01","position":1,"type":"mcq","topic":"אוצר מילים — תרגול המורה לעמוד 28","difficulty":"medium","prompt":"מה פירוש הביטוי “band”?","choices":["להקה","מועדון","טופס","רשימה"],"correct":0,"explanation":{"he":"בתרגול המורה: band — להקה.","en":"The teacher's vocabulary pair is band — להקה."},"ref":{"id":"english-vocabulary-28","part":"אוצר מילים — עמוד 28"}},{"id":"english-vocabulary-28-02","position":2,"type":"mcq","topic":"אוצר מילים — תרגול המורה לעמוד 28","difficulty":"medium","prompt":"מה פירוש הביטוי “club”?","choices":["מועדון","להקה","טופס","רשימה"],"correct":0,"explanation":{"he":"בתרגול המורה: club — מועדון.","en":"The teacher's vocabulary pair is club — מועדון."},"ref":{"id":"english-vocabulary-28","part":"אוצר מילים — עמוד 28"}},{"id":"english-vocabulary-28-03","position":3,"type":"mcq","topic":"אוצר מילים — תרגול המורה לעמוד 28","difficulty":"medium","prompt":"מה פירוש הביטוי “form”?","choices":["טופס","להקה","מועדון","רשימה"],"correct":0,"explanation":{"he":"בתרגול המורה: form — טופס.","en":"The teacher's vocabulary pair is form — טופס."},"ref":{"id":"english-vocabulary-28","part":"אוצר מילים — עמוד 28"}},{"id":"english-vocabulary-28-04","position":4,"type":"mcq","topic":"אוצר מילים — תרגול המורה לעמוד 28","difficulty":"medium","prompt":"מה פירוש הביטוי “list”?","choices":["רשימה","להקה","מועדון","טופס"],"correct":0,"explanation":{"he":"בתרגול המורה: list — רשימה.","en":"The teacher's vocabulary pair is list — רשימה."},"ref":{"id":"english-vocabulary-28","part":"אוצר מילים — עמוד 28"}},{"id":"english-vocabulary-28-05","position":5,"type":"mcq","topic":"אוצר מילים — תרגול המורה לעמוד 28","difficulty":"medium","prompt":"מה פירוש הביטוי “office”?","choices":["משרד","להקה","מועדון","טופס"],"correct":0,"explanation":{"he":"בתרגול המורה: office — משרד.","en":"The teacher's vocabulary pair is office — משרד."},"ref":{"id":"english-vocabulary-28","part":"אוצר מילים — עמוד 28"}},{"id":"english-vocabulary-28-06","position":6,"type":"mcq","topic":"אוצר מילים — תרגול המורה לעמוד 28","difficulty":"medium","prompt":"מה פירוש הביטוי “team”?","choices":["קבוצה","להקה","מועדון","טופס"],"correct":0,"explanation":{"he":"בתרגול המורה: team — קבוצה.","en":"The teacher's vocabulary pair is team — קבוצה."},"ref":{"id":"english-vocabulary-28","part":"אוצר מילים — עמוד 28"}},{"id":"english-vocabulary-28-07","position":7,"type":"mcq","topic":"אוצר מילים — תרגול המורה לעמוד 28","difficulty":"medium","prompt":"מה פירוש הביטוי “theater”?","choices":["תיאטרון","להקה","מועדון","טופס"],"correct":0,"explanation":{"he":"בתרגול המורה: theater — תיאטרון.","en":"The teacher's vocabulary pair is theater — תיאטרון."},"ref":{"id":"english-vocabulary-28","part":"אוצר מילים — עמוד 28"}},{"id":"english-vocabulary-28-08","position":8,"type":"mcq","topic":"אוצר מילים — תרגול המורה לעמוד 28","difficulty":"medium","prompt":"מה פירוש הביטוי “variety”?","choices":["מגוון","להקה","מועדון","טופס"],"correct":0,"explanation":{"he":"בתרגול המורה: variety — מגוון.","en":"The teacher's vocabulary pair is variety — מגוון."},"ref":{"id":"english-vocabulary-28","part":"אוצר מילים — עמוד 28"}},{"id":"english-vocabulary-28-09","position":9,"type":"mcq","topic":"אוצר מילים — תרגול המורה לעמוד 28","difficulty":"medium","prompt":"מה פירוש הביטוי “writing”?","choices":["כתיבה","להקה","מועדון","טופס"],"correct":0,"explanation":{"he":"בתרגול המורה: writing — כתיבה.","en":"The teacher's vocabulary pair is writing — כתיבה."},"ref":{"id":"english-vocabulary-28","part":"אוצר מילים — עמוד 28"}},{"id":"english-vocabulary-28-10","position":10,"type":"mcq","topic":"אוצר מילים — תרגול המורה לעמוד 28","difficulty":"medium","prompt":"מה פירוש הביטוי “fill in”?","choices":["למלא","להקה","מועדון","טופס"],"correct":0,"explanation":{"he":"בתרגול המורה: fill in — למלא.","en":"The teacher's vocabulary pair is fill in — למלא."},"ref":{"id":"english-vocabulary-28","part":"אוצר מילים — עמוד 28"}},{"id":"english-vocabulary-28-11","position":11,"type":"mcq","topic":"אוצר מילים — תרגול המורה לעמוד 28","difficulty":"medium","prompt":"מה פירוש הביטוי “join”?","choices":["להצטרף","להקה","מועדון","טופס"],"correct":0,"explanation":{"he":"בתרגול המורה: join — להצטרף.","en":"The teacher's vocabulary pair is join — להצטרף."},"ref":{"id":"english-vocabulary-28","part":"אוצר מילים — עמוד 28"}},{"id":"english-vocabulary-28-12","position":12,"type":"mcq","topic":"אוצר מילים — תרגול המורה לעמוד 28","difficulty":"medium","prompt":"מה פירוש הביטוי “interested (in)”?","choices":["מעוניין ב...","להקה","מועדון","טופס"],"correct":0,"explanation":{"he":"בתרגול המורה: interested (in) — מעוניין ב....","en":"The teacher's vocabulary pair is interested (in) — מעוניין ב...."},"ref":{"id":"english-vocabulary-28","part":"אוצר מילים — עמוד 28"}},{"id":"english-vocabulary-28-13","position":13,"type":"mcq","topic":"אוצר מילים — תרגול המורה לעמוד 28","difficulty":"medium","prompt":"מה פירוש הביטוי “around here”?","choices":["כאן בסביבה","להקה","מועדון","טופס"],"correct":0,"explanation":{"he":"בתרגול המורה: around here — כאן בסביבה.","en":"The teacher's vocabulary pair is around here — כאן בסביבה."},"ref":{"id":"english-vocabulary-28","part":"אוצר מילים — עמוד 28"}},{"id":"english-vocabulary-28-14","position":14,"type":"mcq","topic":"אוצר מילים — תרגול המורה לעמוד 28","difficulty":"medium","prompt":"מה פירוש הביטוי “I’d love to”?","choices":["אשמח ל-","להקה","מועדון","טופס"],"correct":0,"explanation":{"he":"בתרגול המורה: I’d love to — אשמח ל-.","en":"The teacher's vocabulary pair is I’d love to — אשמח ל-."},"ref":{"id":"english-vocabulary-28","part":"אוצר מילים — עמוד 28"}},{"id":"english-vocabulary-28-15","position":15,"type":"mcq","topic":"אוצר מילים — תרגול המורה לעמוד 28","difficulty":"medium","prompt":"מה פירוש הביטוי “Nice to meet you.”?","choices":["נעים להכיר","להקה","מועדון","טופס"],"correct":0,"explanation":{"he":"בתרגול המורה: Nice to meet you. — נעים להכיר.","en":"The teacher's vocabulary pair is Nice to meet you. — נעים להכיר."},"ref":{"id":"english-vocabulary-28","part":"אוצר מילים — עמוד 28"}},{"id":"english-vocabulary-28-16","position":16,"type":"mcq","topic":"אוצר מילים — תרגול המורה לעמוד 28","difficulty":"medium","prompt":"מה פירוש הביטוי “What about … ?”?","choices":["מה לגבי...?","להקה","מועדון","טופס"],"correct":0,"explanation":{"he":"בתרגול המורה: What about … ? — מה לגבי...?.","en":"The teacher's vocabulary pair is What about … ? — מה לגבי...?."},"ref":{"id":"english-vocabulary-28","part":"אוצר מילים — עמוד 28"}},{"id":"english-vocabulary-28-17","position":17,"type":"mcq","topic":"אוצר מילים — תרגול המורה לעמוד 28","difficulty":"medium","prompt":"מה פירוש הביטוי “would you like … ?”?","choices":["האם תרצה...?","להקה","מועדון","טופס"],"correct":0,"explanation":{"he":"בתרגול המורה: would you like … ? — האם תרצה...?.","en":"The teacher's vocabulary pair is would you like … ? — האם תרצה...?."},"ref":{"id":"english-vocabulary-28","part":"אוצר מילים — עמוד 28"}}]},{"id":"english-parts-sort","subject_id":"english","exam_id":"english-v1-practice","title":"חלקי דיבר — מיון המורה","description":"כל הפריטים התקינים בתרגיל המורה · 29 שאלות","references":[{"id":"english-parts-sort","kind":"site","title":"חלקי דיבר — מיון המורה","url":"https://wordwall.net/he/resource/10462641?wwmethod=link","attribution":"תרגול שקושר במסמך המורה","parts":[{"part":"התרגיל המקורי","title":"התרגיל המקורי"}]}],"questions":[{"id":"english-parts-sort-01","position":1,"type":"mcq","topic":"חלקי דיבר — מיון המורה","difficulty":"medium","prompt":"לאיזו קבוצת חלקי דיבר שייכת המילה “ball” בתרגיל המורה?","choices":["Noun","Verb","Adjective"],"correct":0,"explanation":{"he":"המילה “ball” מסווגת בתרגיל כ־Noun (שם עצם).","en":"In this activity, ball is classified as noun."},"ref":{"id":"english-parts-sort","part":"התרגיל המקורי"}},{"id":"english-parts-sort-02","position":2,"type":"mcq","topic":"חלקי דיבר — מיון המורה","difficulty":"medium","prompt":"לאיזו קבוצת חלקי דיבר שייכת המילה “dog” בתרגיל המורה?","choices":["Noun","Verb","Adjective"],"correct":0,"explanation":{"he":"המילה “dog” מסווגת בתרגיל כ־Noun (שם עצם).","en":"In this activity, dog is classified as noun."},"ref":{"id":"english-parts-sort","part":"התרגיל המקורי"}},{"id":"english-parts-sort-03","position":3,"type":"mcq","topic":"חלקי דיבר — מיון המורה","difficulty":"medium","prompt":"לאיזו קבוצת חלקי דיבר שייכת המילה “table” בתרגיל המורה?","choices":["Noun","Verb","Adjective"],"correct":0,"explanation":{"he":"המילה “table” מסווגת בתרגיל כ־Noun (שם עצם).","en":"In this activity, table is classified as noun."},"ref":{"id":"english-parts-sort","part":"התרגיל המקורי"}},{"id":"english-parts-sort-04","position":4,"type":"mcq","topic":"חלקי דיבר — מיון המורה","difficulty":"medium","prompt":"לאיזו קבוצת חלקי דיבר שייכת המילה “chair” בתרגיל המורה?","choices":["Noun","Verb","Adjective"],"correct":0,"explanation":{"he":"המילה “chair” מסווגת בתרגיל כ־Noun (שם עצם).","en":"In this activity, chair is classified as noun."},"ref":{"id":"english-parts-sort","part":"התרגיל המקורי"}},{"id":"english-parts-sort-05","position":5,"type":"mcq","topic":"חלקי דיבר — מיון המורה","difficulty":"medium","prompt":"לאיזו קבוצת חלקי דיבר שייכת המילה “door” בתרגיל המורה?","choices":["Noun","Verb","Adjective"],"correct":0,"explanation":{"he":"המילה “door” מסווגת בתרגיל כ־Noun (שם עצם).","en":"In this activity, door is classified as noun."},"ref":{"id":"english-parts-sort","part":"התרגיל המקורי"}},{"id":"english-parts-sort-06","position":6,"type":"mcq","topic":"חלקי דיבר — מיון המורה","difficulty":"medium","prompt":"לאיזו קבוצת חלקי דיבר שייכת המילה “window” בתרגיל המורה?","choices":["Noun","Verb","Adjective"],"correct":0,"explanation":{"he":"המילה “window” מסווגת בתרגיל כ־Noun (שם עצם).","en":"In this activity, window is classified as noun."},"ref":{"id":"english-parts-sort","part":"התרגיל המקורי"}},{"id":"english-parts-sort-07","position":7,"type":"mcq","topic":"חלקי דיבר — מיון המורה","difficulty":"medium","prompt":"לאיזו קבוצת חלקי דיבר שייכת המילה “book” בתרגיל המורה?","choices":["Noun","Verb","Adjective"],"correct":0,"explanation":{"he":"המילה “book” מסווגת בתרגיל כ־Noun (שם עצם).","en":"In this activity, book is classified as noun."},"ref":{"id":"english-parts-sort","part":"התרגיל המקורי"}},{"id":"english-parts-sort-08","position":8,"type":"mcq","topic":"חלקי דיבר — מיון המורה","difficulty":"medium","prompt":"לאיזו קבוצת חלקי דיבר שייכת המילה “pen” בתרגיל המורה?","choices":["Noun","Verb","Adjective"],"correct":0,"explanation":{"he":"המילה “pen” מסווגת בתרגיל כ־Noun (שם עצם).","en":"In this activity, pen is classified as noun."},"ref":{"id":"english-parts-sort","part":"התרגיל המקורי"}},{"id":"english-parts-sort-09","position":9,"type":"mcq","topic":"חלקי דיבר — מיון המורה","difficulty":"medium","prompt":"לאיזו קבוצת חלקי דיבר שייכת המילה “glass” בתרגיל המורה?","choices":["Noun","Verb","Adjective"],"correct":0,"explanation":{"he":"המילה “glass” מסווגת בתרגיל כ־Noun (שם עצם).","en":"In this activity, glass is classified as noun."},"ref":{"id":"english-parts-sort","part":"התרגיל המקורי"}},{"id":"english-parts-sort-10","position":10,"type":"mcq","topic":"חלקי דיבר — מיון המורה","difficulty":"medium","prompt":"לאיזו קבוצת חלקי דיבר שייכת המילה “picture” בתרגיל המורה?","choices":["Noun","Verb","Adjective"],"correct":0,"explanation":{"he":"המילה “picture” מסווגת בתרגיל כ־Noun (שם עצם).","en":"In this activity, picture is classified as noun."},"ref":{"id":"english-parts-sort","part":"התרגיל המקורי"}},{"id":"english-parts-sort-11","position":11,"type":"mcq","topic":"חלקי דיבר — מיון המורה","difficulty":"medium","prompt":"לאיזו קבוצת חלקי דיבר שייכת המילה “walk” בתרגיל המורה?","choices":["Noun","Verb","Adjective"],"correct":1,"explanation":{"he":"המילה “walk” מסווגת בתרגיל כ־Verb (פועל).","en":"In this activity, walk is classified as verb."},"ref":{"id":"english-parts-sort","part":"התרגיל המקורי"}},{"id":"english-parts-sort-12","position":12,"type":"mcq","topic":"חלקי דיבר — מיון המורה","difficulty":"medium","prompt":"לאיזו קבוצת חלקי דיבר שייכת המילה “go” בתרגיל המורה?","choices":["Noun","Verb","Adjective"],"correct":1,"explanation":{"he":"המילה “go” מסווגת בתרגיל כ־Verb (פועל).","en":"In this activity, go is classified as verb."},"ref":{"id":"english-parts-sort","part":"התרגיל המקורי"}},{"id":"english-parts-sort-13","position":13,"type":"mcq","topic":"חלקי דיבר — מיון המורה","difficulty":"medium","prompt":"לאיזו קבוצת חלקי דיבר שייכת המילה “drive” בתרגיל המורה?","choices":["Noun","Verb","Adjective"],"correct":1,"explanation":{"he":"המילה “drive” מסווגת בתרגיל כ־Verb (פועל).","en":"In this activity, drive is classified as verb."},"ref":{"id":"english-parts-sort","part":"התרגיל המקורי"}},{"id":"english-parts-sort-14","position":14,"type":"mcq","topic":"חלקי דיבר — מיון המורה","difficulty":"medium","prompt":"לאיזו קבוצת חלקי דיבר שייכת המילה “eat” בתרגיל המורה?","choices":["Noun","Verb","Adjective"],"correct":1,"explanation":{"he":"המילה “eat” מסווגת בתרגיל כ־Verb (פועל).","en":"In this activity, eat is classified as verb."},"ref":{"id":"english-parts-sort","part":"התרגיל המקורי"}},{"id":"english-parts-sort-15","position":15,"type":"mcq","topic":"חלקי דיבר — מיון המורה","difficulty":"medium","prompt":"לאיזו קבוצת חלקי דיבר שייכת המילה “run” בתרגיל המורה?","choices":["Noun","Verb","Adjective"],"correct":1,"explanation":{"he":"המילה “run” מסווגת בתרגיל כ־Verb (פועל).","en":"In this activity, run is classified as verb."},"ref":{"id":"english-parts-sort","part":"התרגיל המקורי"}},{"id":"english-parts-sort-16","position":16,"type":"mcq","topic":"חלקי דיבר — מיון המורה","difficulty":"medium","prompt":"לאיזו קבוצת חלקי דיבר שייכת המילה “swim” בתרגיל המורה?","choices":["Noun","Verb","Adjective"],"correct":1,"explanation":{"he":"המילה “swim” מסווגת בתרגיל כ־Verb (פועל).","en":"In this activity, swim is classified as verb."},"ref":{"id":"english-parts-sort","part":"התרגיל המקורי"}},{"id":"english-parts-sort-17","position":17,"type":"mcq","topic":"חלקי דיבר — מיון המורה","difficulty":"medium","prompt":"לאיזו קבוצת חלקי דיבר שייכת המילה “look” בתרגיל המורה?","choices":["Noun","Verb","Adjective"],"correct":1,"explanation":{"he":"המילה “look” מסווגת בתרגיל כ־Verb (פועל).","en":"In this activity, look is classified as verb."},"ref":{"id":"english-parts-sort","part":"התרגיל המקורי"}},{"id":"english-parts-sort-18","position":18,"type":"mcq","topic":"חלקי דיבר — מיון המורה","difficulty":"medium","prompt":"לאיזו קבוצת חלקי דיבר שייכת המילה “speak” בתרגיל המורה?","choices":["Noun","Verb","Adjective"],"correct":1,"explanation":{"he":"המילה “speak” מסווגת בתרגיל כ־Verb (פועל).","en":"In this activity, speak is classified as verb."},"ref":{"id":"english-parts-sort","part":"התרגיל המקורי"}},{"id":"english-parts-sort-19","position":19,"type":"mcq","topic":"חלקי דיבר — מיון המורה","difficulty":"medium","prompt":"לאיזו קבוצת חלקי דיבר שייכת המילה “buy” בתרגיל המורה?","choices":["Noun","Verb","Adjective"],"correct":1,"explanation":{"he":"המילה “buy” מסווגת בתרגיל כ־Verb (פועל).","en":"In this activity, buy is classified as verb."},"ref":{"id":"english-parts-sort","part":"התרגיל המקורי"}},{"id":"english-parts-sort-20","position":20,"type":"mcq","topic":"חלקי דיבר — מיון המורה","difficulty":"medium","prompt":"לאיזו קבוצת חלקי דיבר שייכת המילה “like” בתרגיל המורה?","choices":["Noun","Verb","Adjective"],"correct":1,"explanation":{"he":"המילה “like” מסווגת בתרגיל כ־Verb (פועל).","en":"In this activity, like is classified as verb."},"ref":{"id":"english-parts-sort","part":"התרגיל המקורי"}},{"id":"english-parts-sort-21","position":21,"type":"mcq","topic":"חלקי דיבר — מיון המורה","difficulty":"medium","prompt":"לאיזו קבוצת חלקי דיבר שייכת המילה “red” בתרגיל המורה?","choices":["Noun","Verb","Adjective"],"correct":2,"explanation":{"he":"המילה “red” מסווגת בתרגיל כ־Adjective (שם תואר).","en":"In this activity, red is classified as adjective."},"ref":{"id":"english-parts-sort","part":"התרגיל המקורי"}},{"id":"english-parts-sort-22","position":22,"type":"mcq","topic":"חלקי דיבר — מיון המורה","difficulty":"medium","prompt":"לאיזו קבוצת חלקי דיבר שייכת המילה “tall” בתרגיל המורה?","choices":["Noun","Verb","Adjective"],"correct":2,"explanation":{"he":"המילה “tall” מסווגת בתרגיל כ־Adjective (שם תואר).","en":"In this activity, tall is classified as adjective."},"ref":{"id":"english-parts-sort","part":"התרגיל המקורי"}},{"id":"english-parts-sort-23","position":23,"type":"mcq","topic":"חלקי דיבר — מיון המורה","difficulty":"medium","prompt":"לאיזו קבוצת חלקי דיבר שייכת המילה “short” בתרגיל המורה?","choices":["Noun","Verb","Adjective"],"correct":2,"explanation":{"he":"המילה “short” מסווגת בתרגיל כ־Adjective (שם תואר).","en":"In this activity, short is classified as adjective."},"ref":{"id":"english-parts-sort","part":"התרגיל המקורי"}},{"id":"english-parts-sort-24","position":24,"type":"mcq","topic":"חלקי דיבר — מיון המורה","difficulty":"medium","prompt":"לאיזו קבוצת חלקי דיבר שייכת המילה “beautiful” בתרגיל המורה?","choices":["Noun","Verb","Adjective"],"correct":2,"explanation":{"he":"המילה “beautiful” מסווגת בתרגיל כ־Adjective (שם תואר).","en":"In this activity, beautiful is classified as adjective."},"ref":{"id":"english-parts-sort","part":"התרגיל המקורי"}},{"id":"english-parts-sort-26","position":26,"type":"mcq","topic":"חלקי דיבר — מיון המורה","difficulty":"medium","prompt":"לאיזו קבוצת חלקי דיבר שייכת המילה “happy” בתרגיל המורה?","choices":["Noun","Verb","Adjective"],"correct":2,"explanation":{"he":"המילה “happy” מסווגת בתרגיל כ־Adjective (שם תואר).","en":"In this activity, happy is classified as adjective."},"ref":{"id":"english-parts-sort","part":"התרגיל המקורי"}},{"id":"english-parts-sort-27","position":27,"type":"mcq","topic":"חלקי דיבר — מיון המורה","difficulty":"medium","prompt":"לאיזו קבוצת חלקי דיבר שייכת המילה “sad” בתרגיל המורה?","choices":["Noun","Verb","Adjective"],"correct":2,"explanation":{"he":"המילה “sad” מסווגת בתרגיל כ־Adjective (שם תואר).","en":"In this activity, sad is classified as adjective."},"ref":{"id":"english-parts-sort","part":"התרגיל המקורי"}},{"id":"english-parts-sort-28","position":28,"type":"mcq","topic":"חלקי דיבר — מיון המורה","difficulty":"medium","prompt":"לאיזו קבוצת חלקי דיבר שייכת המילה “black” בתרגיל המורה?","choices":["Noun","Verb","Adjective"],"correct":2,"explanation":{"he":"המילה “black” מסווגת בתרגיל כ־Adjective (שם תואר).","en":"In this activity, black is classified as adjective."},"ref":{"id":"english-parts-sort","part":"התרגיל המקורי"}},{"id":"english-parts-sort-29","position":29,"type":"mcq","topic":"חלקי דיבר — מיון המורה","difficulty":"medium","prompt":"לאיזו קבוצת חלקי דיבר שייכת המילה “thin” בתרגיל המורה?","choices":["Noun","Verb","Adjective"],"correct":2,"explanation":{"he":"המילה “thin” מסווגת בתרגיל כ־Adjective (שם תואר).","en":"In this activity, thin is classified as adjective."},"ref":{"id":"english-parts-sort","part":"התרגיל המקורי"}},{"id":"english-parts-sort-30","position":30,"type":"mcq","topic":"חלקי דיבר — מיון המורה","difficulty":"medium","prompt":"לאיזו קבוצת חלקי דיבר שייכת המילה “fat” בתרגיל המורה?","choices":["Noun","Verb","Adjective"],"correct":2,"explanation":{"he":"המילה “fat” מסווגת בתרגיל כ־Adjective (שם תואר).","en":"In this activity, fat is classified as adjective."},"ref":{"id":"english-parts-sort","part":"התרגיל המקורי"}}]},{"id":"english-parts-quiz","subject_id":"english","exam_id":"english-v1-practice","title":"חלקי דיבר — שאלון המורה","description":"כל הפריטים התקינים בתרגיל המורה · 10 שאלות","references":[{"id":"english-parts-quiz","kind":"site","title":"חלקי דיבר — שאלון המורה","url":"https://wordwall.net/he/resource/95521835?wwmethod=link","attribution":"תרגול שקושר במסמך המורה","parts":[{"part":"התרגיל המקורי","title":"התרגיל המקורי"}]}],"questions":[{"id":"english-parts-quiz-01","position":1,"type":"mcq","topic":"חלקי דיבר — שאלון המורה","difficulty":"medium","prompt":"Which of these is a verb?","choices":["Run","Table","Blue","Quickly"],"correct":0,"explanation":{"he":"המילה “Run” מסווגת בתרגיל כ־Verb (פועל).","en":"In this activity, Run is classified as verb."},"ref":{"id":"english-parts-quiz","part":"התרגיל המקורי"}},{"id":"english-parts-quiz-02","position":2,"type":"mcq","topic":"חלקי דיבר — שאלון המורה","difficulty":"medium","prompt":"Identify the noun.","choices":["Jump","Happiness","Bright","Swiftly"],"correct":1,"explanation":{"he":"המילה “Happiness” מסווגת בתרגיל כ־Noun (שם עצם).","en":"In this activity, Happiness is classified as noun."},"ref":{"id":"english-parts-quiz","part":"התרגיל המקורי"}},{"id":"english-parts-quiz-03","position":3,"type":"mcq","topic":"חלקי דיבר — שאלון המורה","difficulty":"medium","prompt":"Select the adjective.","choices":["Green","Sing","Dog","Carefully"],"correct":0,"explanation":{"he":"המילה “Green” מסווגת בתרגיל כ־Adjective (שם תואר).","en":"In this activity, Green is classified as adjective."},"ref":{"id":"english-parts-quiz","part":"התרגיל המקורי"}},{"id":"english-parts-quiz-04","position":4,"type":"mcq","topic":"חלקי דיבר — שאלון המורה","difficulty":"medium","prompt":"Which word is a verb?","choices":["Dance","Chair","Red","Slowly"],"correct":0,"explanation":{"he":"המילה “Dance” מסווגת בתרגיל כ־Verb (פועל).","en":"In this activity, Dance is classified as verb."},"ref":{"id":"english-parts-quiz","part":"התרגיל המקורי"}},{"id":"english-parts-quiz-05","position":5,"type":"mcq","topic":"חלקי דיבר — שאלון המורה","difficulty":"medium","prompt":"Choose the noun.","choices":["Joy","Run","Tall","Quickly"],"correct":0,"explanation":{"he":"המילה “Joy” מסווגת בתרגיל כ־Noun (שם עצם).","en":"In this activity, Joy is classified as noun."},"ref":{"id":"english-parts-quiz","part":"התרגיל המקורי"}},{"id":"english-parts-quiz-06","position":6,"type":"mcq","topic":"חלקי דיבר — שאלון המורה","difficulty":"medium","prompt":"Identify the adjective.","choices":["Soft","Eat","Car","Loudly"],"correct":0,"explanation":{"he":"המילה “Soft” מסווגת בתרגיל כ־Adjective (שם תואר).","en":"In this activity, Soft is classified as adjective."},"ref":{"id":"english-parts-quiz","part":"התרגיל המקורי"}},{"id":"english-parts-quiz-07","position":7,"type":"mcq","topic":"חלקי דיבר — שאלון המורה","difficulty":"medium","prompt":"Which of these is a verb?","choices":["Write","Book","Yellow","Gently"],"correct":0,"explanation":{"he":"המילה “Write” מסווגת בתרגיל כ־Verb (פועל).","en":"In this activity, Write is classified as verb."},"ref":{"id":"english-parts-quiz","part":"התרגיל המקורי"}},{"id":"english-parts-quiz-08","position":8,"type":"mcq","topic":"חלקי דיבר — שאלון המורה","difficulty":"medium","prompt":"Select the noun.","choices":["Cat","Run","Bright","Quickly"],"correct":0,"explanation":{"he":"המילה “Cat” מסווגת בתרגיל כ־Noun (שם עצם).","en":"In this activity, Cat is classified as noun."},"ref":{"id":"english-parts-quiz","part":"התרגיל המקורי"}},{"id":"english-parts-quiz-09","position":9,"type":"mcq","topic":"חלקי דיבר — שאלון המורה","difficulty":"medium","prompt":"Choose the adjective.","choices":["Happy","Jump","Tree","Slowly"],"correct":0,"explanation":{"he":"המילה “Happy” מסווגת בתרגיל כ־Adjective (שם תואר).","en":"In this activity, Happy is classified as adjective."},"ref":{"id":"english-parts-quiz","part":"התרגיל המקורי"}},{"id":"english-parts-quiz-10","position":10,"type":"mcq","topic":"חלקי דיבר — שאלון המורה","difficulty":"medium","prompt":"Which word belongs to 'others'?","choices":["Quickly","Sing","Joy","Soft"],"correct":0,"explanation":{"he":"המילה “Quickly” מסווגת בתרגיל כ־Adverb (תואר הפועל).","en":"In this activity, Quickly is classified as adverb."},"ref":{"id":"english-parts-quiz","part":"התרגיל המקורי"}}]},{"id":"english-negative-1","subject_id":"english","exam_id":"english-v1-practice","title":"הווה פשוט — חיוב ושלילה 1","description":"כל הפריטים התקינים בתרגיל המורה · 9 שאלות","references":[{"id":"english-negative-1","kind":"site","title":"הווה פשוט — חיוב ושלילה 1","url":"https://wordwall.net/resource/8818577?wwmethod=link","attribution":"תרגול שקושר במסמך המורה","parts":[{"part":"התרגיל המקורי","title":"התרגיל המקורי"}]}],"questions":[{"id":"english-negative-1-01","position":1,"type":"mcq","topic":"הווה פשוט — חיוב ושלילה 1","difficulty":"medium","prompt":"She ..... at the office.","choices":["doesn't work","work","don't work","works"],"correct":3,"explanation":{"he":"התשובה היא works. בחיוב בהווה פשוט מוסיפים s או es לפועל עם he/she/it; עם I/you/we/they משתמשים בצורת הבסיס. have הופך ל־has בגוף שלישי יחיד.","en":"The answer is works. Affirmative Present Simple adds -s or -es with he/she/it and uses the base form with I/you/we/they. Have becomes has with he/she/it."},"ref":{"id":"english-negative-1","part":"התרגיל המקורי"},"context":"השלימו בחיוב בהווה פשוט.","image":"https://user.cdn.wordwall.net/content-images/user/3239408/070a96e6e56542f285d6409a41771cf9-0","imageAlt":"תמונת ההקשר מתוך תרגיל המורה"},{"id":"english-negative-1-02","position":2,"type":"mcq","topic":"הווה פשוט — חיוב ושלילה 1","difficulty":"medium","prompt":"My father ..... ....... cigarettes. (NOT)","choices":["smokes","smoke","doesn't smoke","don't smoke"],"correct":2,"explanation":{"he":"התשובה היא doesn't smoke. עם he/she/it משתמשים ב־doesn't ובפועל בצורת הבסיס.","en":"The answer is doesn't smoke. Use doesn't plus the base verb with he/she/it."},"ref":{"id":"english-negative-1","part":"התרגיל המקורי"},"context":"השלימו בשלילה בהווה פשוט.","image":"https://user.cdn.wordwall.net/content-images/user/3239408/070a96e6e56542f285d6409a41771cf9-1","imageAlt":"תמונת ההקשר מתוך תרגיל המורה"},{"id":"english-negative-1-03","position":3,"type":"mcq","topic":"הווה פשוט — חיוב ושלילה 1","difficulty":"medium","prompt":"I .... .... meat. (NOT)","choices":["doesn't eat","don't eat","eat","does eat"],"correct":1,"explanation":{"he":"התשובה היא don't eat. עם I/you/we/they משתמשים ב־don't ובפועל בצורת הבסיס.","en":"The answer is don't eat. Use don't plus the base verb with I/you/we/they."},"ref":{"id":"english-negative-1","part":"התרגיל המקורי"},"context":"השלימו בשלילה בהווה פשוט.","image":"https://user.cdn.wordwall.net/content-images/user/3239408/070a96e6e56542f285d6409a41771cf9-2","imageAlt":"תמונת ההקשר מתוך תרגיל המורה"},{"id":"english-negative-1-04","position":4,"type":"mcq","topic":"הווה פשוט — חיוב ושלילה 1","difficulty":"medium","prompt":"We ..... to the radio.","choices":["live","listen","drink","listens"],"correct":1,"explanation":{"he":"התשובה היא listen. בחיוב בהווה פשוט מוסיפים s או es לפועל עם he/she/it; עם I/you/we/they משתמשים בצורת הבסיס. have הופך ל־has בגוף שלישי יחיד.","en":"The answer is listen. Affirmative Present Simple adds -s or -es with he/she/it and uses the base form with I/you/we/they. Have becomes has with he/she/it."},"ref":{"id":"english-negative-1","part":"התרגיל המקורי"},"context":"השלימו בחיוב בהווה פשוט.","image":"https://user.cdn.wordwall.net/content-images/user/3239408/070a96e6e56542f285d6409a41771cf9-3","imageAlt":"תמונת ההקשר מתוך תרגיל המורה"},{"id":"english-negative-1-05","position":5,"type":"mcq","topic":"הווה פשוט — חיוב ושלילה 1","difficulty":"medium","prompt":"Alice and Mark .... ..... in London. (NOT)","choices":["isn't living","doesn't live","don't live","lives"],"correct":2,"explanation":{"he":"התשובה היא don't live. עם I/you/we/they משתמשים ב־don't ובפועל בצורת הבסיס.","en":"The answer is don't live. Use don't plus the base verb with I/you/we/they."},"ref":{"id":"english-negative-1","part":"התרגיל המקורי"},"context":"השלימו בשלילה בהווה פשוט.","image":"https://user.cdn.wordwall.net/content-images/user/3239408/070a96e6e56542f285d6409a41771cf9-4","imageAlt":"תמונת ההקשר מתוך תרגיל המורה"},{"id":"english-negative-1-06","position":6,"type":"mcq","topic":"הווה פשוט — חיוב ושלילה 1","difficulty":"medium","prompt":"You ..... to the cinema at weekends.","choices":["go","play","goes","plays"],"correct":0,"explanation":{"he":"התשובה היא go. בחיוב בהווה פשוט מוסיפים s או es לפועל עם he/she/it; עם I/you/we/they משתמשים בצורת הבסיס. have הופך ל־has בגוף שלישי יחיד.","en":"The answer is go. Affirmative Present Simple adds -s or -es with he/she/it and uses the base form with I/you/we/they. Have becomes has with he/she/it."},"ref":{"id":"english-negative-1","part":"התרגיל המקורי"},"context":"השלימו בחיוב בהווה פשוט.","image":"https://user.cdn.wordwall.net/content-images/user/3239408/070a96e6e56542f285d6409a41771cf9-5","imageAlt":"תמונת ההקשר מתוך תרגיל המורה"},{"id":"english-negative-1-07","position":7,"type":"mcq","topic":"הווה פשוט — חיוב ושלילה 1","difficulty":"medium","prompt":"A teacher ________ in a school.","choices":["doesn't work","work","don't work","works"],"correct":3,"explanation":{"he":"התשובה היא works. בחיוב בהווה פשוט מוסיפים s או es לפועל עם he/she/it; עם I/you/we/they משתמשים בצורת הבסיס. have הופך ל־has בגוף שלישי יחיד.","en":"The answer is works. Affirmative Present Simple adds -s or -es with he/she/it and uses the base form with I/you/we/they. Have becomes has with he/she/it."},"ref":{"id":"english-negative-1","part":"התרגיל המקורי"},"context":"השלימו בחיוב בהווה פשוט.","image":"https://user.cdn.wordwall.net/content-images/user/3239408/070a96e6e56542f285d6409a41771cf9-6","imageAlt":"תמונת ההקשר מתוך תרגיל המורה"},{"id":"english-negative-1-08","position":8,"type":"mcq","topic":"הווה פשוט — חיוב ושלילה 1","difficulty":"medium","prompt":"A ___________ works on a building site.","choices":["farmer","builder","doctor","teacher"],"correct":1,"explanation":{"he":"בנאי (builder) עובד באתר בנייה.","en":"A builder works on a building site."},"ref":{"id":"english-negative-1","part":"התרגיל המקורי"},"context":"בחרו את בעל המקצוע המתאים."},{"id":"english-negative-1-09","position":9,"type":"mcq","topic":"הווה פשוט — חיוב ושלילה 1","difficulty":"medium","prompt":"A waiter _________ in a shop.","choices":["works","work","doesn't work","don't work"],"correct":2,"explanation":{"he":"התשובה היא doesn't work. עם he/she/it משתמשים ב־doesn't ובפועל בצורת הבסיס.","en":"The answer is doesn't work. Use doesn't plus the base verb with he/she/it."},"ref":{"id":"english-negative-1","part":"התרגיל המקורי"},"context":"השלימו בשלילה בהווה פשוט.","image":"https://user.cdn.wordwall.net/content-images/user/3239408/070a96e6e56542f285d6409a41771cf9-7","imageAlt":"תמונת ההקשר מתוך תרגיל המורה"}]},{"id":"english-negative-2","subject_id":"english","exam_id":"english-v1-practice","title":"הווה פשוט — שלילה 2","description":"כל הפריטים התקינים בתרגיל המורה · 12 שאלות","references":[{"id":"english-negative-2","kind":"site","title":"הווה פשוט — שלילה 2","url":"https://wordwall.net/resource/30802053?wwmethod=link","attribution":"תרגול שקושר במסמך המורה","parts":[{"part":"התרגיל המקורי","title":"התרגיל המקורי"}]}],"questions":[{"id":"english-negative-2-01","position":1,"type":"mcq","topic":"הווה פשוט — שלילה 2","difficulty":"medium","prompt":"John ...................................computer games everyday.","choices":["don't plays","dosen't play","doesn't play"],"correct":2,"explanation":{"he":"התשובה היא doesn't play. עם he/she/it משתמשים ב־doesn't ובפועל בצורת הבסיס.","en":"The answer is doesn't play. Use doesn't plus the base verb with he/she/it."},"ref":{"id":"english-negative-2","part":"התרגיל המקורי"},"context":"השלימו בשלילה בהווה פשוט.","image":"https://user.cdn.wordwall.net/content-images/user/5242034/e7237e25c5594578bcfe4eccf6eb31bf-0","imageAlt":"תמונת ההקשר מתוך תרגיל המורה"},{"id":"english-negative-2-02","position":2,"type":"mcq","topic":"הווה פשוט — שלילה 2","difficulty":"medium","prompt":"She .............................. a book in the morning.","choices":["doesn't read","not reads","don't read"],"correct":0,"explanation":{"he":"התשובה היא doesn't read. עם he/she/it משתמשים ב־doesn't ובפועל בצורת הבסיס.","en":"The answer is doesn't read. Use doesn't plus the base verb with he/she/it."},"ref":{"id":"english-negative-2","part":"התרגיל המקורי"},"context":"השלימו בשלילה בהווה פשוט.","image":"https://user.cdn.wordwall.net/content-images/user/5242034/e7237e25c5594578bcfe4eccf6eb31bf-1","imageAlt":"תמונת ההקשר מתוך תרגיל המורה"},{"id":"english-negative-2-03","position":3,"type":"mcq","topic":"הווה פשוט — שלילה 2","difficulty":"medium","prompt":"Phil and Susan ............................. tennis at weekends.","choices":["don't plays","doesn't play","don't play"],"correct":2,"explanation":{"he":"התשובה היא don't play. עם I/you/we/they משתמשים ב־don't ובפועל בצורת הבסיס.","en":"The answer is don't play. Use don't plus the base verb with I/you/we/they."},"ref":{"id":"english-negative-2","part":"התרגיל המקורי"},"context":"השלימו בשלילה בהווה פשוט.","image":"https://user.cdn.wordwall.net/content-images/user/5242034/e7237e25c5594578bcfe4eccf6eb31bf-2","imageAlt":"תמונת ההקשר מתוך תרגיל המורה"},{"id":"english-negative-2-04","position":4,"type":"mcq","topic":"הווה פשוט — שלילה 2","difficulty":"medium","prompt":"I  ................................... at the weekends","choices":["dosen't do karate","doesn't do karate","don't do karate"],"correct":2,"explanation":{"he":"התשובה היא don't do karate. עם I/you/we/they משתמשים ב־don't ובפועל בצורת הבסיס.","en":"The answer is don't do karate. Use don't plus the base verb with I/you/we/they."},"ref":{"id":"english-negative-2","part":"התרגיל המקורי"},"context":"השלימו בשלילה בהווה פשוט.","image":"https://user.cdn.wordwall.net/content-images/user/5242034/e7237e25c5594578bcfe4eccf6eb31bf-3","imageAlt":"תמונת ההקשר מתוך תרגיל המורה"},{"id":"english-negative-2-05","position":5,"type":"mcq","topic":"הווה פשוט — שלילה 2","difficulty":"medium","prompt":"My mum ............................................ at 10PM every night.","choices":["doesn't goes to bed","doesn't go to bed","don't goes to bed"],"correct":1,"explanation":{"he":"התשובה היא doesn't go to bed. עם he/she/it משתמשים ב־doesn't ובפועל בצורת הבסיס.","en":"The answer is doesn't go to bed. Use doesn't plus the base verb with he/she/it."},"ref":{"id":"english-negative-2","part":"התרגיל המקורי"},"context":"השלימו בשלילה בהווה פשוט.","image":"https://user.cdn.wordwall.net/content-images/user/5242034/e7237e25c5594578bcfe4eccf6eb31bf-4","imageAlt":"תמונת ההקשר מתוך תרגיל המורה"},{"id":"english-negative-2-06","position":6,"type":"mcq","topic":"הווה פשוט — שלילה 2","difficulty":"medium","prompt":"They ...................................................... cycling in the mornings.","choices":["don't goes","don't go","not go"],"correct":1,"explanation":{"he":"התשובה היא don't go. עם I/you/we/they משתמשים ב־don't ובפועל בצורת הבסיס.","en":"The answer is don't go. Use don't plus the base verb with I/you/we/they."},"ref":{"id":"english-negative-2","part":"התרגיל המקורי"},"context":"השלימו בשלילה בהווה פשוט.","image":"https://user.cdn.wordwall.net/content-images/user/5242034/e7237e25c5594578bcfe4eccf6eb31bf-5","imageAlt":"תמונת ההקשר מתוך תרגיל המורה"},{"id":"english-negative-2-07","position":7,"type":"mcq","topic":"הווה פשוט — שלילה 2","difficulty":"medium","prompt":"He ................................................. in the evenings.","choices":["doesn't play","doesn't plays","doesn't plais"],"correct":0,"explanation":{"he":"התשובה היא doesn't play. עם he/she/it משתמשים ב־doesn't ובפועל בצורת הבסיס.","en":"The answer is doesn't play. Use doesn't plus the base verb with he/she/it."},"ref":{"id":"english-negative-2","part":"התרגיל המקורי"},"context":"השלימו בשלילה בהווה פשוט.","image":"https://user.cdn.wordwall.net/content-images/user/5242034/e7237e25c5594578bcfe4eccf6eb31bf-6","imageAlt":"תמונת ההקשר מתוך תרגיל המורה"},{"id":"english-negative-2-08","position":8,"type":"mcq","topic":"הווה פשוט — שלילה 2","difficulty":"medium","prompt":"They...................................... yoga on Mondays.","choices":["don't does","don't do","doesn't do"],"correct":1,"explanation":{"he":"התשובה היא don't do. עם I/you/we/they משתמשים ב־don't ובפועל בצורת הבסיס.","en":"The answer is don't do. Use don't plus the base verb with I/you/we/they."},"ref":{"id":"english-negative-2","part":"התרגיל המקורי"},"context":"השלימו בשלילה בהווה פשוט.","image":"https://user.cdn.wordwall.net/content-images/user/5242034/e7237e25c5594578bcfe4eccf6eb31bf-7","imageAlt":"תמונת ההקשר מתוך תרגיל המורה"},{"id":"english-negative-2-09","position":9,"type":"mcq","topic":"הווה פשוט — שלילה 2","difficulty":"medium","prompt":"Peter .......................................... swimming on Wednesdays.","choices":["doesn't go","don't goes","doesn't goes"],"correct":0,"explanation":{"he":"התשובה היא doesn't go. עם he/she/it משתמשים ב־doesn't ובפועל בצורת הבסיס.","en":"The answer is doesn't go. Use doesn't plus the base verb with he/she/it."},"ref":{"id":"english-negative-2","part":"התרגיל המקורי"},"context":"השלימו בשלילה בהווה פשוט.","image":"https://user.cdn.wordwall.net/content-images/user/5242034/e7237e25c5594578bcfe4eccf6eb31bf-8","imageAlt":"תמונת ההקשר מתוך תרגיל המורה"},{"id":"english-negative-2-10","position":10,"type":"mcq","topic":"הווה פשוט — שלילה 2","difficulty":"medium","prompt":"Bill ............................................... TV at night.","choices":["don't watches","doesn't watch","doesn't watches"],"correct":1,"explanation":{"he":"התשובה היא doesn't watch. עם he/she/it משתמשים ב־doesn't ובפועל בצורת הבסיס.","en":"The answer is doesn't watch. Use doesn't plus the base verb with he/she/it."},"ref":{"id":"english-negative-2","part":"התרגיל המקורי"},"context":"השלימו בשלילה בהווה פשוט.","image":"https://user.cdn.wordwall.net/content-images/user/5242034/e7237e25c5594578bcfe4eccf6eb31bf-9","imageAlt":"תמונת ההקשר מתוך תרגיל המורה"},{"id":"english-negative-2-11","position":11,"type":"mcq","topic":"הווה פשוט — שלילה 2","difficulty":"medium","prompt":"We...............  the homework at the weekends","choices":["don't do","doesn't do","doesn't does"],"correct":0,"explanation":{"he":"התשובה היא don't do. עם I/you/we/they משתמשים ב־don't ובפועל בצורת הבסיס.","en":"The answer is don't do. Use don't plus the base verb with I/you/we/they."},"ref":{"id":"english-negative-2","part":"התרגיל המקורי"},"context":"השלימו בשלילה בהווה פשוט.","image":"https://user.cdn.wordwall.net/content-images/user/5242034/e7237e25c5594578bcfe4eccf6eb31bf-10","imageAlt":"תמונת ההקשר מתוך תרגיל המורה"},{"id":"english-negative-2-12","position":12,"type":"mcq","topic":"הווה פשוט — שלילה 2","difficulty":"medium","prompt":"My dad.............with my brothers","choices":["doesn't watches TV","don't watch TV","doesn't watch TV"],"correct":2,"explanation":{"he":"התשובה היא doesn't watch TV. עם he/she/it משתמשים ב־doesn't ובפועל בצורת הבסיס.","en":"The answer is doesn't watch TV. Use doesn't plus the base verb with he/she/it."},"ref":{"id":"english-negative-2","part":"התרגיל המקורי"},"context":"השלימו בשלילה בהווה פשוט.","image":"https://user.cdn.wordwall.net/content-images/user/5242034/e7237e25c5594578bcfe4eccf6eb31bf-11","imageAlt":"תמונת ההקשר מתוך תרגיל המורה"}]},{"id":"english-affirmative-1","subject_id":"english","exam_id":"english-v1-practice","title":"הווה פשוט — חיוב 1","description":"כל הפריטים התקינים בתרגיל המורה · 15 שאלות","references":[{"id":"english-affirmative-1","kind":"site","title":"הווה פשוט — חיוב 1","url":"https://www.english-room.com/grammar/presentsimpletense_affirmative_1.htm","attribution":"תרגול שקושר במסמך המורה","parts":[{"part":"התרגיל המקורי","title":"התרגיל המקורי"}]}],"questions":[{"id":"english-affirmative-1-01","position":1,"type":"mcq","topic":"הווה פשוט — חיוב 1","difficulty":"medium","prompt":"She ___ noodles every Monday. (eat)","choices":["eats","eat","eating"],"correct":0,"explanation":{"he":"התשובה היא eats. בחיוב בהווה פשוט מוסיפים s או es לפועל עם he/she/it; עם I/you/we/they משתמשים בצורת הבסיס. have הופך ל־has בגוף שלישי יחיד.","en":"The answer is eats. Affirmative Present Simple adds -s or -es with he/she/it and uses the base form with I/you/we/they. Have becomes has with he/she/it."},"ref":{"id":"english-affirmative-1","part":"התרגיל המקורי"},"context":"השלימו בחיוב בהווה פשוט בעזרת הפועל שבסוגריים."},{"id":"english-affirmative-1-02","position":2,"type":"mcq","topic":"הווה פשוט — חיוב 1","difficulty":"medium","prompt":"Wichai ___ computer every day. (play)","choices":["plays","play","playing"],"correct":0,"explanation":{"he":"התשובה היא plays. בחיוב בהווה פשוט מוסיפים s או es לפועל עם he/she/it; עם I/you/we/they משתמשים בצורת הבסיס. have הופך ל־has בגוף שלישי יחיד.","en":"The answer is plays. Affirmative Present Simple adds -s or -es with he/she/it and uses the base form with I/you/we/they. Have becomes has with he/she/it."},"ref":{"id":"english-affirmative-1","part":"התרגיל המקורי"},"context":"השלימו בחיוב בהווה פשוט בעזרת הפועל שבסוגריים."},{"id":"english-affirmative-1-03","position":3,"type":"mcq","topic":"הווה פשוט — חיוב 1","difficulty":"medium","prompt":"They ___ English well. (speak)","choices":["speak","speaks","speaking"],"correct":0,"explanation":{"he":"התשובה היא speak. בחיוב בהווה פשוט מוסיפים s או es לפועל עם he/she/it; עם I/you/we/they משתמשים בצורת הבסיס. have הופך ל־has בגוף שלישי יחיד.","en":"The answer is speak. Affirmative Present Simple adds -s or -es with he/she/it and uses the base form with I/you/we/they. Have becomes has with he/she/it."},"ref":{"id":"english-affirmative-1","part":"התרגיל המקורי"},"context":"השלימו בחיוב בהווה פשוט בעזרת הפועל שבסוגריים."},{"id":"english-affirmative-1-04","position":4,"type":"mcq","topic":"הווה פשוט — חיוב 1","difficulty":"medium","prompt":"He ___ television every morning. (watch)","choices":["watches","watch","watching"],"correct":0,"explanation":{"he":"התשובה היא watches. בחיוב בהווה פשוט מוסיפים s או es לפועל עם he/she/it; עם I/you/we/they משתמשים בצורת הבסיס. have הופך ל־has בגוף שלישי יחיד.","en":"The answer is watches. Affirmative Present Simple adds -s or -es with he/she/it and uses the base form with I/you/we/they. Have becomes has with he/she/it."},"ref":{"id":"english-affirmative-1","part":"התרגיל המקורי"},"context":"השלימו בחיוב בהווה פשוט בעזרת הפועל שבסוגריים."},{"id":"english-affirmative-1-05","position":5,"type":"mcq","topic":"הווה פשוט — חיוב 1","difficulty":"medium","prompt":"I ___ up late. (get)","choices":["get","gets","getting"],"correct":0,"explanation":{"he":"התשובה היא get. בחיוב בהווה פשוט מוסיפים s או es לפועל עם he/she/it; עם I/you/we/they משתמשים בצורת הבסיס. have הופך ל־has בגוף שלישי יחיד.","en":"The answer is get. Affirmative Present Simple adds -s or -es with he/she/it and uses the base form with I/you/we/they. Have becomes has with he/she/it."},"ref":{"id":"english-affirmative-1","part":"התרגיל המקורי"},"context":"השלימו בחיוב בהווה פשוט בעזרת הפועל שבסוגריים."},{"id":"english-affirmative-1-06","position":6,"type":"mcq","topic":"הווה פשוט — חיוב 1","difficulty":"medium","prompt":"We ___ pictures every week. (draw)","choices":["draw","draws","drawing"],"correct":0,"explanation":{"he":"התשובה היא draw. בחיוב בהווה פשוט מוסיפים s או es לפועל עם he/she/it; עם I/you/we/they משתמשים בצורת הבסיס. have הופך ל־has בגוף שלישי יחיד.","en":"The answer is draw. Affirmative Present Simple adds -s or -es with he/she/it and uses the base form with I/you/we/they. Have becomes has with he/she/it."},"ref":{"id":"english-affirmative-1","part":"התרגיל המקורי"},"context":"השלימו בחיוב בהווה פשוט בעזרת הפועל שבסוגריים."},{"id":"english-affirmative-1-07","position":7,"type":"mcq","topic":"הווה פשוט — חיוב 1","difficulty":"medium","prompt":"The boys ___ in the pool. (swim)","choices":["swim","swims","swimming"],"correct":0,"explanation":{"he":"התשובה היא swim. בחיוב בהווה פשוט מוסיפים s או es לפועל עם he/she/it; עם I/you/we/they משתמשים בצורת הבסיס. have הופך ל־has בגוף שלישי יחיד.","en":"The answer is swim. Affirmative Present Simple adds -s or -es with he/she/it and uses the base form with I/you/we/they. Have becomes has with he/she/it."},"ref":{"id":"english-affirmative-1","part":"התרגיל המקורי"},"context":"השלימו בחיוב בהווה פשוט בעזרת הפועל שבסוגריים."},{"id":"english-affirmative-1-08","position":8,"type":"mcq","topic":"הווה פשוט — חיוב 1","difficulty":"medium","prompt":"My father ___ a new car. (drive)","choices":["drives","drive","driving"],"correct":0,"explanation":{"he":"התשובה היא drives. בחיוב בהווה פשוט מוסיפים s או es לפועל עם he/she/it; עם I/you/we/they משתמשים בצורת הבסיס. have הופך ל־has בגוף שלישי יחיד.","en":"The answer is drives. Affirmative Present Simple adds -s or -es with he/she/it and uses the base form with I/you/we/they. Have becomes has with he/she/it."},"ref":{"id":"english-affirmative-1","part":"התרגיל המקורי"},"context":"השלימו בחיוב בהווה פשוט בעזרת הפועל שבסוגריים."},{"id":"english-affirmative-1-09","position":9,"type":"mcq","topic":"הווה פשוט — חיוב 1","difficulty":"medium","prompt":"You ___ in the office. (work)","choices":["work","works","working"],"correct":0,"explanation":{"he":"התשובה היא work. בחיוב בהווה פשוט מוסיפים s או es לפועל עם he/she/it; עם I/you/we/they משתמשים בצורת הבסיס. have הופך ל־has בגוף שלישי יחיד.","en":"The answer is work. Affirmative Present Simple adds -s or -es with he/she/it and uses the base form with I/you/we/they. Have becomes has with he/she/it."},"ref":{"id":"english-affirmative-1","part":"התרגיל המקורי"},"context":"השלימו בחיוב בהווה פשוט בעזרת הפועל שבסוגריים."},{"id":"english-affirmative-1-10","position":10,"type":"mcq","topic":"הווה פשוט — חיוב 1","difficulty":"medium","prompt":"Mr. Manit ___ to London. (fly)","choices":["flies","fly","flying"],"correct":0,"explanation":{"he":"התשובה היא flies. בחיוב בהווה פשוט מוסיפים s או es לפועל עם he/she/it; עם I/you/we/they משתמשים בצורת הבסיס. have הופך ל־has בגוף שלישי יחיד.","en":"The answer is flies. Affirmative Present Simple adds -s or -es with he/she/it and uses the base form with I/you/we/they. Have becomes has with he/she/it."},"ref":{"id":"english-affirmative-1","part":"התרגיל המקורי"},"context":"השלימו בחיוב בהווה פשוט בעזרת הפועל שבסוגריים."},{"id":"english-affirmative-1-11","position":11,"type":"mcq","topic":"הווה פשוט — חיוב 1","difficulty":"medium","prompt":"I ___ my homework. (do)","choices":["do","does","doing"],"correct":0,"explanation":{"he":"התשובה היא do. בחיוב בהווה פשוט מוסיפים s או es לפועל עם he/she/it; עם I/you/we/they משתמשים בצורת הבסיס. have הופך ל־has בגוף שלישי יחיד.","en":"The answer is do. Affirmative Present Simple adds -s or -es with he/she/it and uses the base form with I/you/we/they. Have becomes has with he/she/it."},"ref":{"id":"english-affirmative-1","part":"התרגיל המקורי"},"context":"השלימו בחיוב בהווה פשוט בעזרת הפועל שבסוגריים."},{"id":"english-affirmative-1-12","position":12,"type":"mcq","topic":"הווה פשוט — חיוב 1","difficulty":"medium","prompt":"The teacher ___ to school every day. (walk)","choices":["walks","walk","walking"],"correct":0,"explanation":{"he":"התשובה היא walks. בחיוב בהווה פשוט מוסיפים s או es לפועל עם he/she/it; עם I/you/we/they משתמשים בצורת הבסיס. have הופך ל־has בגוף שלישי יחיד.","en":"The answer is walks. Affirmative Present Simple adds -s or -es with he/she/it and uses the base form with I/you/we/they. Have becomes has with he/she/it."},"ref":{"id":"english-affirmative-1","part":"התרגיל המקורי"},"context":"השלימו בחיוב בהווה פשוט בעזרת הפועל שבסוגריים."},{"id":"english-affirmative-1-13","position":13,"type":"mcq","topic":"הווה פשוט — חיוב 1","difficulty":"medium","prompt":"Jack ___ his bicycle. (ride)","choices":["rides","ride","riding"],"correct":0,"explanation":{"he":"התשובה היא rides. בחיוב בהווה פשוט מוסיפים s או es לפועל עם he/she/it; עם I/you/we/they משתמשים בצורת הבסיס. have הופך ל־has בגוף שלישי יחיד.","en":"The answer is rides. Affirmative Present Simple adds -s or -es with he/she/it and uses the base form with I/you/we/they. Have becomes has with he/she/it."},"ref":{"id":"english-affirmative-1","part":"התרגיל המקורי"},"context":"השלימו בחיוב בהווה פשוט בעזרת הפועל שבסוגריים."},{"id":"english-affirmative-1-14","position":14,"type":"mcq","topic":"הווה פשוט — חיוב 1","difficulty":"medium","prompt":"His mother ___ some fruit. (buy)","choices":["buys","buy","buying"],"correct":0,"explanation":{"he":"התשובה היא buys. בחיוב בהווה פשוט מוסיפים s או es לפועל עם he/she/it; עם I/you/we/they משתמשים בצורת הבסיס. have הופך ל־has בגוף שלישי יחיד.","en":"The answer is buys. Affirmative Present Simple adds -s or -es with he/she/it and uses the base form with I/you/we/they. Have becomes has with he/she/it."},"ref":{"id":"english-affirmative-1","part":"התרגיל המקורי"},"context":"השלימו בחיוב בהווה פשוט בעזרת הפועל שבסוגריים."},{"id":"english-affirmative-1-15","position":15,"type":"mcq","topic":"הווה פשוט — חיוב 1","difficulty":"medium","prompt":"The baby ___ every night. (cry)","choices":["cries","cry","crying"],"correct":0,"explanation":{"he":"התשובה היא cries. בחיוב בהווה פשוט מוסיפים s או es לפועל עם he/she/it; עם I/you/we/they משתמשים בצורת הבסיס. have הופך ל־has בגוף שלישי יחיד.","en":"The answer is cries. Affirmative Present Simple adds -s or -es with he/she/it and uses the base form with I/you/we/they. Have becomes has with he/she/it."},"ref":{"id":"english-affirmative-1","part":"התרגיל המקורי"},"context":"השלימו בחיוב בהווה פשוט בעזרת הפועל שבסוגריים."}]},{"id":"english-affirmative-2","subject_id":"english","exam_id":"english-v1-practice","title":"הווה פשוט — חיוב 2","description":"כל הפריטים התקינים בתרגיל המורה · 15 שאלות","references":[{"id":"english-affirmative-2","kind":"site","title":"הווה פשוט — חיוב 2","url":"https://www.english-4u.de/en/tenses-exercises/present-simple.htm","attribution":"תרגול שקושר במסמך המורה","parts":[{"part":"התרגיל המקורי","title":"התרגיל המקורי"}]}],"questions":[{"id":"english-affirmative-2-01","position":1,"type":"mcq","topic":"הווה פשוט — חיוב 2","difficulty":"medium","prompt":"My sister ___(read) a book.","choices":["reads","read","reading"],"correct":0,"explanation":{"he":"התשובה היא reads. בחיוב בהווה פשוט מוסיפים s או es לפועל עם he/she/it; עם I/you/we/they משתמשים בצורת הבסיס. have הופך ל־has בגוף שלישי יחיד.","en":"The answer is reads. Affirmative Present Simple adds -s or -es with he/she/it and uses the base form with I/you/we/they. Have becomes has with he/she/it."},"ref":{"id":"english-affirmative-2","part":"התרגיל המקורי"},"context":"השלימו בחיוב בהווה פשוט בעזרת הפועל שבסוגריים."},{"id":"english-affirmative-2-02","position":2,"type":"mcq","topic":"הווה פשוט — חיוב 2","difficulty":"medium","prompt":"Frank ___(like) dogs.","choices":["likes","like","liking"],"correct":0,"explanation":{"he":"התשובה היא likes. בחיוב בהווה פשוט מוסיפים s או es לפועל עם he/she/it; עם I/you/we/they משתמשים בצורת הבסיס. have הופך ל־has בגוף שלישי יחיד.","en":"The answer is likes. Affirmative Present Simple adds -s or -es with he/she/it and uses the base form with I/you/we/they. Have becomes has with he/she/it."},"ref":{"id":"english-affirmative-2","part":"התרגיל המקורי"},"context":"השלימו בחיוב בהווה פשוט בעזרת הפועל שבסוגריים."},{"id":"english-affirmative-2-03","position":3,"type":"mcq","topic":"הווה פשוט — חיוב 2","difficulty":"medium","prompt":"My parents ___(do) the shopping.","choices":["do","does","doing"],"correct":0,"explanation":{"he":"התשובה היא do. בחיוב בהווה פשוט מוסיפים s או es לפועל עם he/she/it; עם I/you/we/they משתמשים בצורת הבסיס. have הופך ל־has בגוף שלישי יחיד.","en":"The answer is do. Affirmative Present Simple adds -s or -es with he/she/it and uses the base form with I/you/we/they. Have becomes has with he/she/it."},"ref":{"id":"english-affirmative-2","part":"התרגיל המקורי"},"context":"השלימו בחיוב בהווה פשוט בעזרת הפועל שבסוגריים."},{"id":"english-affirmative-2-04","position":4,"type":"mcq","topic":"הווה פשוט — חיוב 2","difficulty":"medium","prompt":"We sometimes ___(meet) in front of the cinema.","choices":["meet","meets","meeting"],"correct":0,"explanation":{"he":"התשובה היא meet. בחיוב בהווה פשוט מוסיפים s או es לפועל עם he/she/it; עם I/you/we/they משתמשים בצורת הבסיס. have הופך ל־has בגוף שלישי יחיד.","en":"The answer is meet. Affirmative Present Simple adds -s or -es with he/she/it and uses the base form with I/you/we/they. Have becomes has with he/she/it."},"ref":{"id":"english-affirmative-2","part":"התרגיל המקורי"},"context":"השלימו בחיוב בהווה פשוט בעזרת הפועל שבסוגריים."},{"id":"english-affirmative-2-05","position":5,"type":"mcq","topic":"הווה פשוט — חיוב 2","difficulty":"medium","prompt":"Uncle George ___(go) to the doctor's.","choices":["goes","go","going"],"correct":0,"explanation":{"he":"התשובה היא goes. בחיוב בהווה פשוט מוסיפים s או es לפועל עם he/she/it; עם I/you/we/they משתמשים בצורת הבסיס. have הופך ל־has בגוף שלישי יחיד.","en":"The answer is goes. Affirmative Present Simple adds -s or -es with he/she/it and uses the base form with I/you/we/they. Have becomes has with he/she/it."},"ref":{"id":"english-affirmative-2","part":"התרגיל המקורי"},"context":"השלימו בחיוב בהווה פשוט בעזרת הפועל שבסוגריים."},{"id":"english-affirmative-2-06","position":6,"type":"mcq","topic":"הווה פשוט — חיוב 2","difficulty":"medium","prompt":"Our friends ___(play) football in the park.","choices":["play","plays","playing"],"correct":0,"explanation":{"he":"התשובה היא play. בחיוב בהווה פשוט מוסיפים s או es לפועל עם he/she/it; עם I/you/we/they משתמשים בצורת הבסיס. have הופך ל־has בגוף שלישי יחיד.","en":"The answer is play. Affirmative Present Simple adds -s or -es with he/she/it and uses the base form with I/you/we/they. Have becomes has with he/she/it."},"ref":{"id":"english-affirmative-2","part":"התרגיל המקורי"},"context":"השלימו בחיוב בהווה פשוט בעזרת הפועל שבסוגריים."},{"id":"english-affirmative-2-07","position":7,"type":"mcq","topic":"הווה פשוט — חיוב 2","difficulty":"medium","prompt":"She ___(go) to the park every Friday.","choices":["goes","go","going"],"correct":0,"explanation":{"he":"התשובה היא goes. בחיוב בהווה פשוט מוסיפים s או es לפועל עם he/she/it; עם I/you/we/they משתמשים בצורת הבסיס. have הופך ל־has בגוף שלישי יחיד.","en":"The answer is goes. Affirmative Present Simple adds -s or -es with he/she/it and uses the base form with I/you/we/they. Have becomes has with he/she/it."},"ref":{"id":"english-affirmative-2","part":"התרגיל המקורי"},"context":"השלימו בחיוב בהווה פשוט בעזרת הפועל שבסוגריים."},{"id":"english-affirmative-2-08","position":8,"type":"mcq","topic":"הווה פשוט — חיוב 2","difficulty":"medium","prompt":"He ___(ride) his bike every day.","choices":["rides","ride","riding"],"correct":0,"explanation":{"he":"התשובה היא rides. בחיוב בהווה פשוט מוסיפים s או es לפועל עם he/she/it; עם I/you/we/they משתמשים בצורת הבסיס. have הופך ל־has בגוף שלישי יחיד.","en":"The answer is rides. Affirmative Present Simple adds -s or -es with he/she/it and uses the base form with I/you/we/they. Have becomes has with he/she/it."},"ref":{"id":"english-affirmative-2","part":"התרגיל המקורי"},"context":"השלימו בחיוב בהווה פשוט בעזרת הפועל שבסוגריים."},{"id":"english-affirmative-2-09","position":9,"type":"mcq","topic":"הווה פשוט — חיוב 2","difficulty":"medium","prompt":"We ___(have) the best ideas.","choices":["have","has","having"],"correct":0,"explanation":{"he":"התשובה היא have. בחיוב בהווה פשוט מוסיפים s או es לפועל עם he/she/it; עם I/you/we/they משתמשים בצורת הבסיס. have הופך ל־has בגוף שלישי יחיד.","en":"The answer is have. Affirmative Present Simple adds -s or -es with he/she/it and uses the base form with I/you/we/they. Have becomes has with he/she/it."},"ref":{"id":"english-affirmative-2","part":"התרגיל המקורי"},"context":"השלימו בחיוב בהווה פשוט בעזרת הפועל שבסוגריים."},{"id":"english-affirmative-2-10","position":10,"type":"mcq","topic":"הווה פשוט — חיוב 2","difficulty":"medium","prompt":"Carol ___(say) goodbye.","choices":["says","say","saying"],"correct":0,"explanation":{"he":"התשובה היא says. בחיוב בהווה פשוט מוסיפים s או es לפועל עם he/she/it; עם I/you/we/they משתמשים בצורת הבסיס. have הופך ל־has בגוף שלישי יחיד.","en":"The answer is says. Affirmative Present Simple adds -s or -es with he/she/it and uses the base form with I/you/we/they. Have becomes has with he/she/it."},"ref":{"id":"english-affirmative-2","part":"התרגיל המקורי"},"context":"השלימו בחיוב בהווה פשוט בעזרת הפועל שבסוגריים."},{"id":"english-affirmative-2-11","position":11,"type":"mcq","topic":"הווה פשוט — חיוב 2","difficulty":"medium","prompt":"She ___(be) the best singer in our class.","choices":["is","am","are"],"correct":0,"explanation":{"he":"התשובה היא is. ל־be בהווה הצורות am עם I, הצורה is עם he/she/it, והצורה are עם you/we/they.","en":"The answer is is. Be takes am with I, is with he/she/it, and are with you/we/they."},"ref":{"id":"english-affirmative-2","part":"התרגיל המקורי"},"context":"השלימו בחיוב בהווה פשוט בעזרת הפועל שבסוגריים."},{"id":"english-affirmative-2-12","position":12,"type":"mcq","topic":"הווה פשוט — חיוב 2","difficulty":"medium","prompt":"My sister ___(live) in a big house.","choices":["lives","live","living"],"correct":0,"explanation":{"he":"התשובה היא lives. בחיוב בהווה פשוט מוסיפים s או es לפועל עם he/she/it; עם I/you/we/they משתמשים בצורת הבסיס. have הופך ל־has בגוף שלישי יחיד.","en":"The answer is lives. Affirmative Present Simple adds -s or -es with he/she/it and uses the base form with I/you/we/they. Have becomes has with he/she/it."},"ref":{"id":"english-affirmative-2","part":"התרגיל המקורי"},"context":"השלימו בחיוב בהווה פשוט בעזרת הפועל שבסוגריים."},{"id":"english-affirmative-2-13","position":13,"type":"mcq","topic":"הווה פשוט — חיוב 2","difficulty":"medium","prompt":"The children ___(eat) hamburgers.","choices":["eat","eats","eating"],"correct":0,"explanation":{"he":"התשובה היא eat. בחיוב בהווה פשוט מוסיפים s או es לפועל עם he/she/it; עם I/you/we/they משתמשים בצורת הבסיס. have הופך ל־has בגוף שלישי יחיד.","en":"The answer is eat. Affirmative Present Simple adds -s or -es with he/she/it and uses the base form with I/you/we/they. Have becomes has with he/she/it."},"ref":{"id":"english-affirmative-2","part":"התרגיל המקורי"},"context":"השלימו בחיוב בהווה פשוט בעזרת הפועל שבסוגריים."},{"id":"english-affirmative-2-14","position":14,"type":"mcq","topic":"הווה פשוט — חיוב 2","difficulty":"medium","prompt":"Bill ___(have) got two notebooks.","choices":["has","have","having"],"correct":0,"explanation":{"he":"התשובה היא has. בחיוב בהווה פשוט מוסיפים s או es לפועל עם he/she/it; עם I/you/we/they משתמשים בצורת הבסיס. have הופך ל־has בגוף שלישי יחיד.","en":"The answer is has. Affirmative Present Simple adds -s or -es with he/she/it and uses the base form with I/you/we/they. Have becomes has with he/she/it."},"ref":{"id":"english-affirmative-2","part":"התרגיל המקורי"},"context":"השלימו בחיוב בהווה פשוט בעזרת הפועל שבסוגריים."},{"id":"english-affirmative-2-15","position":15,"type":"mcq","topic":"הווה פשוט — חיוב 2","difficulty":"medium","prompt":"I ___(be) at home.","choices":["am","is","are"],"correct":0,"explanation":{"he":"התשובה היא am. ל־be בהווה הצורות am עם I, הצורה is עם he/she/it, והצורה are עם you/we/they.","en":"The answer is am. Be takes am with I, is with he/she/it, and are with you/we/they."},"ref":{"id":"english-affirmative-2","part":"התרגיל המקורי"},"context":"השלימו בחיוב בהווה פשוט בעזרת הפועל שבסוגריים."}]},{"id":"english-questions-1","subject_id":"english","exam_id":"english-v1-practice","title":"הווה פשוט — שאלות do / does","description":"כל הפריטים התקינים בתרגיל המורה · 12 שאלות","references":[{"id":"english-questions-1","kind":"site","title":"הווה פשוט — שאלות do / does","url":"https://agendaweb.org/exercises/verbs/do-does.htm","attribution":"תרגול שקושר במסמך המורה","parts":[{"part":"התרגיל המקורי","title":"התרגיל המקורי"}]}],"questions":[{"id":"english-questions-1-01","position":1,"type":"mcq","topic":"הווה פשוט — שאלות do / does","difficulty":"medium","prompt":"What time ___ you go to bed ?","choices":["do","does"],"correct":0,"explanation":{"he":"התשובה היא do. בשאלה בהווה פשוט משתמשים ב־does עם he/she/it וב־do עם I/you/we/they; הפועל העיקרי נשאר בצורת הבסיס.","en":"The answer is do. Questions use does with he/she/it and do with I/you/we/they, followed by the base verb."},"ref":{"id":"english-questions-1","part":"התרגיל המקורי"}},{"id":"english-questions-1-02","position":2,"type":"mcq","topic":"הווה פשוט — שאלות do / does","difficulty":"medium","prompt":"___ your dog like bread ?","choices":["Do","Does"],"correct":1,"explanation":{"he":"התשובה היא Does. בשאלה בהווה פשוט משתמשים ב־does עם he/she/it וב־do עם I/you/we/they; הפועל העיקרי נשאר בצורת הבסיס.","en":"The answer is Does. Questions use does with he/she/it and do with I/you/we/they, followed by the base verb."},"ref":{"id":"english-questions-1","part":"התרגיל המקורי"}},{"id":"english-questions-1-03","position":3,"type":"mcq","topic":"הווה פשוט — שאלות do / does","difficulty":"medium","prompt":"Where ___ he go on hollidays ?","choices":["do","does"],"correct":1,"explanation":{"he":"התשובה היא does. בשאלה בהווה פשוט משתמשים ב־does עם he/she/it וב־do עם I/you/we/they; הפועל העיקרי נשאר בצורת הבסיס.","en":"The answer is does. Questions use does with he/she/it and do with I/you/we/they, followed by the base verb."},"ref":{"id":"english-questions-1","part":"התרגיל המקורי"}},{"id":"english-questions-1-04","position":4,"type":"mcq","topic":"הווה פשוט — שאלות do / does","difficulty":"medium","prompt":"___ your mum read comics ?","choices":["Do","Does"],"correct":1,"explanation":{"he":"התשובה היא Does. בשאלה בהווה פשוט משתמשים ב־does עם he/she/it וב־do עם I/you/we/they; הפועל העיקרי נשאר בצורת הבסיס.","en":"The answer is Does. Questions use does with he/she/it and do with I/you/we/they, followed by the base verb."},"ref":{"id":"english-questions-1","part":"התרגיל המקורי"}},{"id":"english-questions-1-05","position":5,"type":"mcq","topic":"הווה פשוט — שאלות do / does","difficulty":"medium","prompt":"What ___ you do on Mondays ?","choices":["do","does"],"correct":0,"explanation":{"he":"התשובה היא do. בשאלה בהווה פשוט משתמשים ב־does עם he/she/it וב־do עם I/you/we/they; הפועל העיקרי נשאר בצורת הבסיס.","en":"The answer is do. Questions use does with he/she/it and do with I/you/we/they, followed by the base verb."},"ref":{"id":"english-questions-1","part":"התרגיל המקורי"}},{"id":"english-questions-1-06","position":6,"type":"mcq","topic":"הווה פשוט — שאלות do / does","difficulty":"medium","prompt":"Why ___ I drink so much milk ?","choices":["do","does"],"correct":0,"explanation":{"he":"התשובה היא do. בשאלה בהווה פשוט משתמשים ב־does עם he/she/it וב־do עם I/you/we/they; הפועל העיקרי נשאר בצורת הבסיס.","en":"The answer is do. Questions use does with he/she/it and do with I/you/we/they, followed by the base verb."},"ref":{"id":"english-questions-1","part":"התרגיל המקורי"}},{"id":"english-questions-1-07","position":7,"type":"mcq","topic":"הווה פשוט — שאלות do / does","difficulty":"medium","prompt":"When ___ your parents have lunch ?","choices":["do","does"],"correct":0,"explanation":{"he":"התשובה היא do. בשאלה בהווה פשוט משתמשים ב־does עם he/she/it וב־do עם I/you/we/they; הפועל העיקרי נשאר בצורת הבסיס.","en":"The answer is do. Questions use does with he/she/it and do with I/you/we/they, followed by the base verb."},"ref":{"id":"english-questions-1","part":"התרגיל המקורי"}},{"id":"english-questions-1-08","position":8,"type":"mcq","topic":"הווה פשוט — שאלות do / does","difficulty":"medium","prompt":"___ she like pizza ?","choices":["Do","Does"],"correct":1,"explanation":{"he":"התשובה היא Does. בשאלה בהווה פשוט משתמשים ב־does עם he/she/it וב־do עם I/you/we/they; הפועל העיקרי נשאר בצורת הבסיס.","en":"The answer is Does. Questions use does with he/she/it and do with I/you/we/they, followed by the base verb."},"ref":{"id":"english-questions-1","part":"התרגיל המקורי"}},{"id":"english-questions-1-09","position":9,"type":"mcq","topic":"הווה פשוט — שאלות do / does","difficulty":"medium","prompt":"___ they teach Spanish ?","choices":["Do","Does"],"correct":0,"explanation":{"he":"התשובה היא Do. בשאלה בהווה פשוט משתמשים ב־does עם he/she/it וב־do עם I/you/we/they; הפועל העיקרי נשאר בצורת הבסיס.","en":"The answer is Do. Questions use does with he/she/it and do with I/you/we/they, followed by the base verb."},"ref":{"id":"english-questions-1","part":"התרגיל המקורי"}},{"id":"english-questions-1-10","position":10,"type":"mcq","topic":"הווה פשוט — שאלות do / does","difficulty":"medium","prompt":"___ Susan work every day ?","choices":["Do","Does"],"correct":1,"explanation":{"he":"התשובה היא Does. בשאלה בהווה פשוט משתמשים ב־does עם he/she/it וב־do עם I/you/we/they; הפועל העיקרי נשאר בצורת הבסיס.","en":"The answer is Does. Questions use does with he/she/it and do with I/you/we/they, followed by the base verb."},"ref":{"id":"english-questions-1","part":"התרגיל המקורי"}},{"id":"english-questions-1-11","position":11,"type":"mcq","topic":"הווה פשוט — שאלות do / does","difficulty":"medium","prompt":"How ___ the children go to school ?","choices":["do","does"],"correct":0,"explanation":{"he":"התשובה היא do. בשאלה בהווה פשוט משתמשים ב־does עם he/she/it וב־do עם I/you/we/they; הפועל העיקרי נשאר בצורת הבסיס.","en":"The answer is do. Questions use does with he/she/it and do with I/you/we/they, followed by the base verb."},"ref":{"id":"english-questions-1","part":"התרגיל המקורי"}},{"id":"english-questions-1-12","position":12,"type":"mcq","topic":"הווה פשוט — שאלות do / does","difficulty":"medium","prompt":"How many days a week ___ she work ?","choices":["do","does"],"correct":1,"explanation":{"he":"התשובה היא does. בשאלה בהווה פשוט משתמשים ב־does עם he/she/it וב־do עם I/you/we/they; הפועל העיקרי נשאר בצורת הבסיס.","en":"The answer is does. Questions use does with he/she/it and do with I/you/we/they, followed by the base verb."},"ref":{"id":"english-questions-1","part":"התרגיל המקורי"}}]}]`),h0={quizzes:Vm};function u0(n,e=!1){const t=n[0].index!==null,i=new Set(Object.keys(n[0].attributes)),s=new Set(Object.keys(n[0].morphAttributes)),r={},o={},a=n[0].morphTargetsRelative,c=new xt;let l=0;for(let h=0;h<n.length;++h){const u=n[h];let f=0;if(t!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const p in u.attributes){if(!i.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+p+'" attribute exists among all geometries, or in none of them.'),null;r[p]===void 0&&(r[p]=[]),r[p].push(u.attributes[p]),f++}if(f!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const p in u.morphAttributes){if(!s.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[p]===void 0&&(o[p]=[]),o[p].push(u.morphAttributes[p])}if(e){let p;if(t)p=u.index.count;else if(u.attributes.position!==void 0)p=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,p,h),l+=p}}if(t){let h=0;const u=[];for(let f=0;f<n.length;++f){const p=n[f].index;for(let v=0;v<p.count;++v)u.push(p.getX(v)+h);h+=n[f].attributes.position.count}c.setIndex(u)}for(const h in r){const u=Mc(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;c.setAttribute(h,u)}for(const h in o){const u=o[h][0].length;if(u===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[h]=[];for(let f=0;f<u;++f){const p=[];for(let b=0;b<o[h].length;++b)p.push(o[h][b][f]);const v=Mc(p);if(!v)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;c.morphAttributes[h].push(v)}}return c}function Mc(n){let e,t,i,s=-1,r=0;for(let l=0;l<n.length;++l){const h=n[l];if(e===void 0&&(e=h.array.constructor),e!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=h.itemSize),t!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=h.normalized),i!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*t}const o=new e(r),a=new Ft(o,t,i);let c=0;for(let l=0;l<n.length;++l){const h=n[l];if(h.isInterleavedBufferAttribute){const u=c/t;for(let f=0,p=h.count;f<p;f++)for(let v=0;v<t;v++){const b=h.getComponent(f,v);a.setComponent(f+u,v,b)}}else o.set(h.array,c);c+=h.count*t}return s!==void 0&&(a.gpuType=s),a}const d0=(n,e)=>Math.hypot(n.x-e.x,n.z-e.z)<=1.8;function Pn(n,e,t,i=.14){const s=Math.hypot(e.x-n.x,e.z-n.z),r=Math.max(1,Math.ceil(s/i));for(let o=0;o<=r;o++){const a=o/r;if(t(n.x+(e.x-n.x)*a,n.z+(e.z-n.z)*a))return!1}return!0}function f0(n,e,t,{step:i=.6,radius:s=1.7,bound:r=ga}={}){if(![n.x,n.z,e.x,e.z].every(Number.isFinite)||t(n.x,n.z))return null;if(Math.hypot(n.x-e.x,n.z-e.z)<=s)return[];if(!t(e.x,e.z)&&Pn(n,e,t))return[{x:e.x,z:e.z}];const o=Math.floor(r*2/i)+1,a=o*o,c=E=>({x:E%o*i-r,z:Math.floor(E/o)*i-r}),l=[],h=new Float64Array(a).fill(1/0),u=new Int32Array(a).fill(-1),f=new Uint8Array(a),p=new Int8Array(a);function v(E){if(E<0||E>=a)return!1;if(!p[E]){const P=c(E);p[E]=t(P.x,P.z)?-1:1}return p[E]>0}const b=E=>Math.max(0,Math.hypot(E.x-e.x,E.z-e.z)-s);function m(E,P){let g=l.length;for(l.push({id:E,priority:P});g>0;){const T=g-1>>1;if(l[T].priority<=P)break;[l[T],l[g]]=[l[g],l[T]],g=T}}function d(){const E=l[0],P=l.pop();if(l.length){l[0]=P;let g=0;for(;;){const T=g*2+1,C=T+1;let x=g;if(T<l.length&&l[T].priority<l[x].priority&&(x=T),C<l.length&&l[C].priority<l[x].priority&&(x=C),x===g)break;[l[g],l[x]]=[l[x],l[g]],g=x}}return E.id}const w=Math.round((n.x+r)/i),S=Math.round((n.z+r)/i);for(let E=-2;E<=2;E++)for(let P=-2;P<=2;P++){const g=w+P,T=S+E;if(g<0||T<0||g>=o||T>=o)continue;const C=T*o+g,x=c(C);v(C)&&Pn(n,x,t)&&(h[C]=Math.hypot(x.x-n.x,x.z-n.z),m(C,h[C]+b(x)))}for(;l.length;){const E=d();if(f[E])continue;f[E]=1;const P=c(E);if(Math.hypot(P.x-e.x,P.z-e.z)<=Math.max(s,i*.72)){const C=[];for(let D=E;D!==-1;D=u[D])C.push(c(D));C.reverse(),s<i&&Pn(C.at(-1),e,t)&&C.push({...e});const x=[];let _=n,A=0;for(;A<C.length;){let D=A;for(;D+1<C.length&&Pn(_,C[D+1],t);)D++;x.push(C[D]),_=C[D],A=D+1}return x}const g=E%o,T=Math.floor(E/o);for(let C=-1;C<=1;C++)for(let x=-1;x<=1;x++){if(!x&&!C)continue;const _=g+x,A=T+C;if(_<0||A<0||_>=o||A>=o)continue;const D=A*o+_;if(f[D]||!v(D)||x&&C&&(!v(T*o+_)||!v(A*o+g)))continue;const I=c(D);if(!Pn(P,I,t))continue;const B=h[E]+i*Math.hypot(x,C);B>=h[D]||(h[D]=B,u[D]=E,m(D,B+b(I)))}}return null}export{$e as $,Kl as A,xn as B,Dr as C,Nh as D,eh as E,Ue as F,Ln as G,Hl as H,so as I,Ka as J,Rt as K,Vh as L,qa as M,Br as N,ro as O,th as P,Cc as Q,ao as R,oo as S,Km as T,Ut as U,F as V,km as W,Qc as X,Xh as Y,Zh as Z,Kh as _,gr as a,Gh as a0,El as a1,u0 as a2,dt as a3,jh as a4,Qt as a5,Oh as a6,mn as a7,Vt as a8,Qh as a9,La as aA,Qm as aB,Xm as aC,e0 as aD,s0 as aE,bo as aF,Gm as aG,r0 as aH,n0 as aI,c0 as aJ,wt as aK,qh as aL,Ja as aM,Ia as aN,ho as aO,ph as aP,io as aQ,l0 as aR,yi as aa,Hh as ab,Fs as ac,qn as ad,to as ae,ga as af,Wm as ag,no as ah,d0 as ai,f0 as aj,Ze as ak,Fe as al,Pn as am,h0 as an,_a as ao,$m as ap,Zm as aq,xr as ar,Jm as as,qm as at,Ec as au,oh as av,o0 as aw,i0 as ax,Ym as ay,Jl as az,nh as b,ih as c,a0 as d,t0 as e,Ql as f,In as g,jm as h,yo as i,Mo as j,rh as k,Sc as l,ah as m,co as n,Tc as o,vo as p,Wl as q,Hm as r,Xl as s,Ua as t,Kt as u,Tl as v,xt as w,wl as x,ws as y,wc as z};
