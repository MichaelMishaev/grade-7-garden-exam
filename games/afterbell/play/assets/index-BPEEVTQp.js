(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const Md=[{name:"רחבת הכניסה",x:0,z:10},{name:"שביל הספרייה",x:-10,z:1},{name:"גינת החממה",x:9,z:-5},{name:"דרך המגדל",x:10,z:13},{name:"מצפה הצפון",x:7,z:-16},{name:"שביל הגחליליות",x:-7,z:20}],Wi=[{title:"מסילת הכוכבים",story:"באמצע מופע הכיתה כבה המקרן. שלושה פנסי שמיים התפזרו ברחבי הקמפוס. חברו אותם כדי לצייר שוב כוכבים מעל בית הספר.",sites:[0,2,4],tasks:["sparks","ring","mirror"],sequence:[1,0,2]},{title:"מצעד הגחליליות",story:"הגחליליות יצאו מהאגם לפני שהפנסים נדלקו. הדליקו להן שלוש תחנות אור שיובילו את המצעד עד השער.",sites:[1,3,5],tasks:["mirror","sparks","ring"],sequence:[2,1,0]},{title:"האות מהמצפה",story:"המצפה קלט אות מקוטע. שלוש משואות בקמפוס מחזיקות חלקים ממנו. חברו את האות כדי לחשוף את קבוצת הכוכבים שממנה הגיע.",sites:[3,4,1],tasks:["ring","mirror","sparks"],sequence:[0,2,1]}],Sd={sparks:"שובל הניצוצות",ring:"טבעת הרוח",mirror:"מראות הירח"},jc=["ירח ☾","שמש ☀","כוכב ✧"];function Ed(n,e=Math.random){const t=Wi.map((i,s)=>s).filter(i=>i!==n);return{edition:t[Math.floor(e()*t.length)],steps:[0,0,0]}}function $t(n,e){const t=Wi[n.edition],i=t.tasks[e];return{...Md[t.sites[e]],task:i,title:Sd[i],index:e}}function Yi(n,e){const t=$t(n,e).task;return n.steps[e]==={sparks:7,ring:1,mirror:3}[t]}function Td(n){return!!n&&Number.isInteger(n.edition)&&!!Wi[n.edition]&&Array.isArray(n.steps)&&n.steps.length===3&&n.steps.every((e,t)=>Number.isInteger(e)&&e>=0&&e<={sparks:7,ring:1,mirror:3}[$t(n,t).task])}function va(n){return[[-2,2],[2,1],[0,-2.5]].map(([e,t],i)=>({x:n.x+e,z:n.z+t,bit:i}))}function wd(n,e,t,i){if(!e.length)return null;const s=e.includes(t)?t:e.sort((l,u)=>{const d=f=>{const p=$t(n,f);return Math.hypot(p.x-i.x,p.z-i.z)};return d(l)-d(u)})[0],r=$t(n,s),o=Yi(n,s),a=!o&&r.task==="sparks"&&va(r).find(l=>!(n.steps[s]&1<<l.bit)),c=o?"האור מוכן. הפעילו את הפנס וענו על שאלות התרגול.":{sparks:"אספו שלושה ניצוצות בשטח, בכל סדר.",ring:"קפצו לתוך הטבעת, או הפעילו את המתג בבסיס שלה.",mirror:"כוונו שלוש מראות לפי סדר הסמלים שעל הלוח."}[r.task];return{...r,...a||{},id:"relay-"+s+"-"+n.steps[s],title:r.title+" · "+r.name,hint:c,action:"אל הפנס"}}const wt=(n,e,t,i,s,r={})=>({kind:n,title:e,hint:t,x:i,z:s,...r}),Cr=(n,e,t,i,s={})=>wt(n,e,t,...i[0],{points:i.map(([r,o])=>({x:r,z:o})),...s}),la=[{id:"evidence",title:"תיק הראיות",quizzes:["facts"],brief:"חוקרים זירת תקלה: בודקים ממצאים, בונים קשרים ומשחזרים את הערב מתוך ראיות.",steps:[wt("evidence-scene","בדיקת זירת התקלה","בדקו כל פריט בזירה. אספו רק שלושה ממצאים שאפשר לבדוק; השערה אינה ראיה.",-4,12),wt("evidence-board","לוח הקשרים","חברו כל ממצא למסקנה היחידה שהוא תומך בה. אין להסיק מעבר למה שנמצא.",-14,-3),wt("evidence-timeline","שחזור ארבעת האירועים","סדרו את הכרטיסים לפי חותמות הזמן שעליהם. הזיזו כרטיס למעלה או למטה, ואז הגישו את השחזור.",4,-10)]},{id:"witness",title:"העד שנעלם",quizzes:["questions"],brief:"חוקרים שתי עדויות, מזהים סתירה ובוחרים היכן לחפש את העד בעולם.",steps:[wt("witness-interview","ראיון עם שני עדים","עברו בין נועה ואיתי. שאלו שאלות על מקום, זמן ואדם; אספו שלושה פרטים שימושיים לפני הסיכום.",10,-2),wt("witness-timetable","העדות שלא מסתדרת","לוח המצלמות מציב את איתי בחממה ב־18:10 וב־18:20. סמנו את שתי הטענות שסותרות את הלוח.",18,2),Cr("witness-search","חיפוש לפי העדות","העד תיאר מים ומקום ישיבה. בחרו אתר חיפוש, לכו אליו ובדקו אותו. חיפוש שגוי נותן רמז נוסף.",[[19,11],[4,-10],[-7,20]])]},{id:"robot",title:"חילוץ הרובוט",quizzes:["instructions"],brief:"לא עוד אתחול פשוט: מתכנתים מעקף, מתקנים מעגל ומלווים רובוט אמיתי בחזרה לתחנה.",steps:[wt("robot-route","תוכנית חילוץ במבוך","תכנתו מסלול ברשת 5×5: מ־S בפינה העליונה השמאלית אל G בפינה התחתונה הימנית. הימנעו מתאים חסומים.",4,-10),wt("robot-circuit","תיקון ארבעה חיבורים","חברו כל יציאה בצבע ובצורה המתאימים. בוחרים יציאה ואז כניסה; חיבור לא מתאים לא נשמר.",18,2),Cr("robot-escort","מלווים את הרובוט הביתה","הרובוט נע לאט מכם. הובילו אותו דרך שלוש תחנות וחכו שיגיע לפני אישור כל תחנה.",[[19,11],[9,21],[-7,20]],{entity:"robot"})]},{id:"survey",title:"מודדי הקמפוס",quizzes:["physics-basics"],brief:"יוצאים לסקר אמיתי: מודדים מקטע, תוחמים חלקה ומתרגמים שרטוט למפת שטח.",steps:[wt("survey-ruler","מדידה בין שתי נקודות","כוונו את קצוות הסרגל לשני הסימונים שעל המוט, ואז רשמו את האורך ביניהם. קוראים את ההפרש, לא את קצה הסרגל.",-4,12),wt("survey-parcel","תיחום חלקת הקרקע","סמנו את כל המשבצות בתוך הגבול בצורת ר׳. כל משבצת היא מטר רבוע אחד. חשבו את שטח החלקה.",-14,-3),wt("survey-scale","משרטוט למפת השטח","קנה המידה: כל סנטימטר בשרטוט הוא 10 מטרים בשטח. המבנה ברוחב 4 ס״מ ובעומק 3 ס״מ. מלאו את שתי המידות.",4,-10)]},{id:"freight",title:"משלוח במידות",quizzes:["physics-units"],brief:"מפעילים מרכז שילוח: מתקנים יחידות, מאזנים מטען ואורזים חלקים בעלי צורות שונות.",steps:[wt("freight-manifest","תיקון תעודת המשלוח","לוח באורך 250 ס״מ וצינור באורך 0.8 מ׳ צריכים לצאת. השלימו את ההמרות ובחרו רכב שהלוח נכנס אליו.",18,2),wt("freight-balance","איזון שלושה משקולות","חלקו את המשקולות 2, 3 ו־5 ק״ג בין שתי הכפות. כל משקולת חייבת להימצא על כף, ושני הצדדים צריכים להתאזן.",19,11),wt("freight-packing","אריזה ללא חפיפה","הארגז הוא רשת ⁦4×3⁩. בחרו חלק, סובבו בעת הצורך ולחצו על משבצת להצבת הפינה שלו. ארזו את שלושת החלקים בלי חריגה או חפיפה.",-4,12)]},{id:"optics",title:"המעבדה המדויקת",quizzes:["physics-precision"],brief:"עובדים כמו צוות מעבדה: ממקדים תמונה, מתקנים זווית הסתכלות ובודקים מדידות חוזרות.",steps:[wt("optics-focus","מיקוד וחשיפה","כוונו בנפרד את המיקוד ואת החשיפה עד ששלושת הסימנים חדים וברורים. רק אז צלמו את לוח הכיול.",-9,-12),wt("optics-parallax","ביטול שגיאת ההסתכלות","בכל עין יישרו את הכוונת עם הקו המרכזי. שני המבטים צריכים להיפגש באותו סימון, ולא רק להיראות קרובים.",4,-10),wt("optics-samples","סדרת מדידות חוזרות","קחו חמש מדידות. סמנו את הקריאה החריגה, והקלידו את הממוצע של ארבע הקריאות שנותרו.",10,-2)]},{id:"shadow",title:"סוד הצללים",quizzes:["physics-pole"],brief:"לומדים את המגדל דרך האור: מניעים מקור אור, משווים יחסים וקוראים שעון שמש.",steps:[wt("shadow-light","מי מזיז את הצל?","הציבו את מקור האור בצד המזרחי, ואז סמנו לאיזה צד נופל הצל. נוגעים במקור ובצל בנפרד.",9,21),wt("shadow-height","גובה מתוך שני צללים","עמוד הייחוס בגובה 2 מטרים מטיל צל באורך 3 מטרים. צל המגדל באורך 9 מטרים. כוונו את עמוד הייחוס ורשמו את גובה המגדל.",10,-2),wt("shadow-sundial","שתי תצפיות בשעון השמש","העבירו את השעה ל־10 ול־14 ושמרו תצפית בכל שעה. לאחר מכן בחרו באיזו תצפית הצל קצר יותר.",-9,-12)]},{id:"rescue",title:"מחזירים את השועל",quizzes:["facts"],brief:"השועל הוא שותף למשימה: מרוויחים את אמונו, בונים לו מחסה ומטפלים בשלושה צרכים שונים.",steps:[wt("rescue-trust","מרוויחים את אמון השועל","התקרבו לשועל בהליכה שקטה והישארו לידו שלוש שניות. קימה או התרחקות מפחיתות אמון; אין לחץ זמן.",-7,20,{entity:"fox"}),wt("rescue-shelter","בונים פינת מחסה","מקמו מים בצד השמאלי, מצע בשורה האחורית וגגון במרכז. השאירו את המשבצת הקדמית האמצעית פנויה ככניסה.",-14,-3),wt("rescue-care","קוראים את צורכי השועל","הרגיעו את השועל לפני הצעת מים. אחרי השתייה אפשר לתת לו לנוח במחסה. עקבו אחרי מדדי השקט, המים והמנוחה.",-9,-12)]},{id:"relay",title:"האות האחרון",quizzes:["questions"],brief:"מקימים קשר מחדש: מסנכרנים גל, משדרים הודעת מורס ומשקמים רשת עם צומת תקול.",steps:[wt("relay-wave","סנכרון שני גלים","כוונו תדירות ומופע עד שהגל שלכם חופף לגל המקווקו. כיוון נכון של כפתור אחד בלבד אינו מספיק.",9,21),wt("relay-morse","משדרים SOS","טבלת הקוד: S היא שלוש נקודות; O היא שלושה קווים. שדרו אות, סיימו אות, והמשיכו עד להודעה SOS.",19,11),wt("relay-network","מעקף לצומת שנפל","חברו את התחנה משמאל אל התחנה מימין דרך התחנות התקינות שביניהן. הצומת האדום תקול ואסור להשתמש בו.",18,2)]},{id:"courier",title:"שליחי הלילה",quizzes:["instructions"],brief:"משלוח עם החלטות ותנועה: מתכננים מסלול, עוברים מסלול תנועה ומוסרים כל חבילה לארונית הנכונה.",steps:[wt("courier-plan","מסלול עם תקציב מרחק","אוספים מפתח במחסן לפני הכניסה למעבדה, ומסיימים בשער. התקציב הוא 14 יחידות דרך. בחרו סדר עצירות ובדקו את הסכום.",-4,12),Cr("courier-course","מסלול ארבע התנועות","סימון 1: קפיצה. סימון 2: זינוק ב־Q. סימון 3: קפיצה. סימון 4: נחיתה ועמידה. השלימו את התנועות בשטח, לא מתוך חלון.",[[-8,4],[-14,-3],[-9,-12],[4,-10]]),Cr("courier-lockers","כל חבילה לארונית שלה","לכל ארונית קוד אחרת. הגיעו אליה ובחרו חבילה שהקוד שעליה הפוך לקוד הארונית. מסירה שגויה נשארת בתיק.",[[10,-2],[18,2],[19,11]])]}],Tn=n=>la.find(e=>e.id===n);function _c(n,e){const t=la.filter(i=>i.quizzes.includes(n));return(t.find(i=>i.id!==e)||t[0]||la[0]).id}const fu=n=>({id:n,revision:2,completed:[],checkpoint:0,sequence:[],commands:[],carrying:!1,data:{}});function bo(n,e=0){return e>5?!1:n===null||typeof n=="boolean"?!0:typeof n=="number"?Number.isFinite(n)&&Math.abs(n)<1e4:typeof n=="string"?n.length<=80:Array.isArray(n)?n.length<=64&&n.every(t=>bo(t,e+1)):!!n&&typeof n=="object"&&Object.keys(n).length<=32&&Object.entries(n).every(([t,i])=>!["__proto__","constructor","prototype"].includes(t)&&t.length<=40&&bo(i,e+1))}function Ad(n){var e;if(!n||!Tn(n.id)||!Array.isArray(n.completed)||n.completed.length>3||n.completed.some((t,i)=>t!==i)||!Number.isInteger(n.checkpoint)||n.checkpoint<0||n.checkpoint>3||!Array.isArray(n.sequence)||n.sequence.length>3||!Array.isArray(n.commands)||n.commands.length>16||typeof n.carrying!="boolean"||n.revision!==void 0&&n.revision!==2||n.revision===2&&(!bo(n.data)||Array.isArray(n.data)||typeof n.data!="object"||!n.data))return null;if(n.revision===2){const t=n.data,i=["inspected","evidence","links","order","notes","claims","commands","wires","cells","bins","samples","observations","layout","edges","route","delivered"];for(const s of i)if(t[s]!==void 0&&(!Array.isArray(t[s])||t[s].some(r=>!Number.isFinite(r))))return null;for(const[s,r]of[["links",3],["order",4],["bins",3],["placements",3],["layout",3]])if(t[s]!==void 0&&(!Array.isArray(t[s])||t[s].length!==r))return null;if((e=t.placements)!=null&&e.some(s=>s!==null&&(!Number.isInteger(s.x)||!Number.isInteger(s.y)||typeof s.rotate!="boolean"))||t.letters!==void 0&&(!Array.isArray(t.letters)||t.letters.length>3||t.letters.some(s=>!["...","---"].includes(s)))||t.current!==void 0&&(typeof t.current!="string"||!/^[-.]{0,3}$/.test(t.current)))return null}return{...fu(n.id),completed:[...n.completed],checkpoint:n.revision===2?n.checkpoint:0,data:n.revision===2?structuredClone(n.data):{}}}function Qn(n){return["owl","pigeon","raccoon"].findIndex(e=>!n.seals.includes(e))<0?3:["owl","pigeon","raccoon"].findIndex(e=>!n.seals.includes(e))}function Un(n){var e,t;return(t=Tn((e=n.scenario)==null?void 0:e.id))==null?void 0:t.steps[Qn(n)]}function Si(n){const e=Un(n);if(!e)return{};const t=n.scenario;return t.data.task!==e.kind&&(t.data={task:e.kind},t.checkpoint=0),t.data}function Ys(n){var r,o;const e=Qn(n),t=Un(n);if(!t)return null;Si(n);const i=n.scenario.completed.includes(e),s=(i?(r=t.points)==null?void 0:r.at(-1):(o=t.points)==null?void 0:o[n.scenario.checkpoint])||t;return{id:`scenario:${n.scenario.id}:${e}:${n.scenario.checkpoint}:${i}`,kind:"scenario",index:e,...s,title:i?"משימת השטח הושלמה — לתיק הלימוד":t.title,hint:i?"לחצו על פעולה כדי להמשיך לשאלות.":t.hint,action:i?"לשאלות התרגול":"למשימת השטח"}}const hu=["צילום: שלושה חלונות מוארים","ניחוש: מישהו כנראה נשאר בכיתה","לוג: הפסקת חשמל ב־18:12","דעה: זה המסוף הכי גרוע","כרטיס כניסה חתום ב־18:05","שמועה: התקלה קרתה בגלל שועל"],Rd=[{label:"18:12 · הפסקת חשמל",time:12},{label:"18:20 · נעילת המבנה",time:20},{label:"18:00 · פתיחת המעבדה",time:0},{label:"18:05 · כניסת הצוות",time:5}],hr=[[0,1],[1,3],[3,4],[4,5],[1,2],[2,5],[0,3],[3,5]],pu=[0,1,2,3,4,8];function mu(n){let e=0,t=0;const i=[{x:e,z:t}];for(const s of n){const r=[[1,0],[0,1],[-1,0],[0,-1]][s];if(!r)return{ok:!1,trail:i};if(e+=r[0],t+=r[1],i.push({x:e,z:t}),e<0||e>4||t<0||t>4||[[1,1],[2,1],[2,2],[3,3]].some(o=>o[0]===e&&o[1]===t))return{ok:!1,trail:i}}return{ok:e===4&&t===4,trail:i}}function yo(n){const e=[[2,2],[2,1],[1,2]],t=[];for(let i=0;i<3;i++){const s=n==null?void 0:n[i];if(!s)continue;let[r,o]=e[i];s.rotate&&([r,o]=[o,r]);for(let a=0;a<o;a++)for(let c=0;c<r;c++){const l=s.x+c,u=s.y+a;if(l<0||l>3||u<0||u>2)return null;const d=u*4+l;if(t.some(f=>f.id===d))return null;t.push({id:d,piece:i})}}return t}function xu(n){const e=[[0,3,8,12],[3,0,4,10],[8,4,0,5],[12,10,5,0]];let t=0,i=0;for(const s of n)t+=e[i][s+1],i=s+1;return t}const tr=(n,e)=>Array.isArray(n)&&n.length===e.length&&[...n].sort((t,i)=>t-i).every((t,i)=>t===[...e].sort((s,r)=>s-r)[i]),bs=(n,e)=>n.includes(e)?n.filter(t=>t!==e):[...n,e];function Mo(n,e,t={x:0,z:0},i={}){const s=n.scenario,r=Un(n),o=Qn(n);if(!s||!r)return{ok:!1,message:"אין משימת שטח פעילה."};if(s.completed.includes(o))return{ok:!0,complete:!0,message:"השלב כבר הושלם."};const a=Si(n),c=Ys(n);if(Math.hypot(t.x-c.x,t.z-c.z)>2.2)return{ok:!1,message:"התקרבו למקום המשימה בשטח."};const l=r.kind,u=e.value;let d=!1,f="הפעולה עוד לא משלימה את המשימה. בדקו את הנתונים ונסו שוב.",p=!0;if(e.type==="reset")return s.data={task:l},{ok:!0,message:"משימת השטח אופסה. אפשר לנסות דרך אחרת."};if(e.type==="clear"&&["a","b","c","number","vehicle","answer","selected","rotate"].includes(e.key)&&delete a[e.key],e.type==="set"&&typeof e.key=="string"&&["a","b","c","number","vehicle","answer","selected","rotate"].includes(e.key)&&Number.isFinite(u)&&Math.abs(u)<1e3&&(a[e.key]=u),l==="evidence-scene"&&(a.inspected??(a.inspected=[]),a.evidence??(a.evidence=[]),e.type==="inspect"&&Number.isInteger(u)&&u>=0&&u<6&&(a.inspected=bs(a.inspected,u),f=hu[u]),e.type==="collect"&&a.inspected.includes(u)&&(a.evidence=bs(a.evidence,u),f="הממצא עודכן בתיק הראיות."),e.type==="submit"&&(d=tr(a.evidence,[0,2,4]))),l==="evidence-board"&&(a.links??(a.links=[-1,-1,-1]),e.type==="link"&&[0,1,2].includes(e.row)&&[0,1,2].includes(u)&&(a.links[e.row]=u),e.type==="submit"&&(d=a.links.every((m,_)=>m===[2,0,1][_]))),l==="evidence-timeline"){if(a.order??(a.order=[0,1,2,3]),e.type==="move"&&Number.isInteger(e.row)&&[0,1,2,3].includes(e.row)&&[-1,1].includes(u)){const m=e.row+u;m>=0&&m<4&&([a.order[e.row],a.order[m]]=[a.order[m],a.order[e.row]])}e.type==="submit"&&(d=a.order.every((m,_)=>m===[2,3,0,1][_]))}if(l==="witness-interview"){if(a.notes??(a.notes=[]),e.type==="ask"&&[0,1].includes(e.row)&&[0,1,2].includes(u)){const m=e.row*3+u;a.notes.includes(m)||a.notes.push(m),f=[["נועה: הייתי בספרייה.","נועה: ראיתי את השעון מציג 18:10.","נועה: איתי עבר ליד החממה."],["איתי: שמעתי מים ליד מקום ישיבה.","איתי: הסתכלתי בשעון ב־18:20.","איתי: העד היה לבד."]][e.row][u]}e.type==="submit"&&(d=[0,1,3].every(m=>a.notes.includes(m)))}if(l==="witness-timetable"&&(a.claims??(a.claims=[]),e.type==="claim"&&[0,1,2,3].includes(u)&&(a.claims=bs(a.claims,u)),e.type==="submit"&&(d=tr(a.claims,[1,3]))),l==="witness-search"){if(e.type==="search"&&[0,1,2].includes(u))return s.checkpoint=u,{ok:!0,walk:!0,message:"אתר החיפוש סומן. לכו אליו ובדקו בשטח."};e.type==="find"&&(d=s.checkpoint===2,f=d?"העד נמצא ליד המים והספסל.":"אין כאן עד. חפשו מקום שיש בו גם מים וגם ישיבה.")}if(l==="robot-route"&&(a.commands??(a.commands=[]),e.type==="command"&&[0,1,2,3].includes(u)&&a.commands.length<16&&a.commands.push(u),e.type==="execute"&&(a.executed=!0,d=mu(a.commands).ok,f="הרובוט לא הגיע ליעד. בדקו את הרשת והמחסומים.")),l==="robot-circuit"&&(a.wires??(a.wires=[]),e.type==="wire"&&[0,1,2,3].includes(e.row)&&[0,1,2,3].includes(u)&&(u===[2,0,3,1][e.row]?(a.wires=bs(a.wires,e.row),f="החיבור תקין."):(p=!1,f="הצורה והצבע אינם תואמים. החיבור לא נשמר.")),e.type==="submit"&&(d=tr(a.wires,[0,1,2,3]))),l==="robot-escort"&&e.type==="checkpoint"){const m=i.companion;if(!m||Math.hypot(m.x-c.x,m.z-c.z)>3)return{ok:!1,message:"חכו לרובוט. גם הוא צריך להגיע לתחנה."};if(s.checkpoint<2)return s.checkpoint++,{ok:!0,walk:!0,message:"הרובוט הגיע. ממשיכים יחד לתחנה הבאה."};d=!0}if(l==="survey-ruler"&&e.type==="submit"&&(d=a.a===2&&a.b===9&&a.number===7),l==="survey-parcel"&&(a.cells??(a.cells=[]),e.type==="cell"&&Number.isInteger(u)&&u>=0&&u<12&&(a.cells=bs(a.cells,u)),e.type==="submit"&&(d=tr(a.cells,pu)&&a.number===6)),l==="survey-scale"&&e.type==="submit"&&(d=a.a===40&&a.b===30),l==="freight-manifest"&&e.type==="submit"&&(d=a.a===2.5&&a.b===80&&a.vehicle===1),l==="freight-balance"&&(a.bins??(a.bins=[-1,-1,-1]),e.type==="bin"&&[0,1,2].includes(e.row)&&[0,1].includes(u)&&(a.bins[e.row]=u),e.type==="submit")){const m=[2,3,5],_=a.bins.reduce((h,w,R)=>h+(w===0?m[R]:0),0),x=a.bins.reduce((h,w,R)=>h+(w===1?m[R]:0),0);d=a.bins.every(h=>h>=0)&&_===x}if(l==="freight-packing"){if(a.placements??(a.placements=[null,null,null]),e.type==="place"&&[0,1,2].includes(a.selected)&&Number.isInteger(u)&&u>=0&&u<12){const m=[...a.placements];m[a.selected]={x:u%4,y:Math.floor(u/4),rotate:a.rotate===1},yo(m)?(a.placements=m,f="החלק הוצב בארגז."):(p=!1,f="החלק חורג מהארגז או חופף לחלק אחר.")}e.type==="submit"&&(d=a.placements.every(Boolean)&&yo(a.placements)!==null)}if(l==="optics-focus"&&e.type==="submit"&&(d=a.a===7&&a.b===3),l==="optics-parallax"&&e.type==="submit"&&(d=a.a===0&&a.b===0),l==="optics-samples"&&(a.samples??(a.samples=[]),e.type==="sample"&&a.samples.length<5&&a.samples.push([4.1,4.2,9.8,4.2,4.3][a.samples.length]),e.type==="submit"&&(d=a.samples.length===5&&a.selected===2&&Math.abs(a.number-4.2)<.001)),l==="shadow-light"&&e.type==="submit"&&(d=a.a===1&&a.b===3),l==="shadow-height"&&e.type==="submit"&&(d=a.a===2&&a.number===6),l==="shadow-sundial"&&(a.observations??(a.observations=[]),e.type==="observe"&&[10,14].includes(a.a)&&!a.observations.includes(a.a)&&a.observations.push(a.a),e.type==="submit"&&(d=tr(a.observations,[10,14])&&a.answer===14)),l==="rescue-trust"&&e.type==="befriend"&&(d=(a.trust||0)>=3,f="התכופפו ליד השועל והמתינו עד שמד האמון יתמלא."),l==="rescue-shelter"&&(a.layout??(a.layout=[-1,-1,-1]),e.type==="shelter"&&[0,1,2].includes(a.selected)&&Number.isInteger(u)&&u>=0&&u<9&&(a.layout[a.selected]=u),e.type==="submit"&&(d=a.layout[0]%3===0&&a.layout[1]<3&&a.layout[1]>=0&&a.layout[2]===4&&new Set(a.layout).size===3&&!a.layout.includes(7))),l==="rescue-care"&&(a.calm??(a.calm=0),a.water??(a.water=0),a.rest??(a.rest=0),e.type==="care"&&(u===0&&(a.calm=Math.min(3,a.calm+1),f="השועל נרגע קצת."),u===1&&(a.calm<3?(p=!1,f="השועל עדיין חושש. קודם יוצרים שקט."):(a.water=Math.min(2,a.water+1),f="השועל שותה.")),u===2&&(a.water<2?(p=!1,f="השועל עדיין צריך מים לפני מנוחה."):(a.rest=1,f="השועל נח במחסה."))),e.type==="submit"&&(d=a.calm===3&&a.water===2&&a.rest===1)),l==="relay-wave"&&e.type==="submit"&&(d=a.a===3&&a.b===2),l==="relay-morse"&&(a.letters??(a.letters=[]),a.current??(a.current=""),e.type==="symbol"&&[".","-"].includes(u)&&a.current.length<3&&(a.current+=u),e.type==="letter"&&(["...","---"].includes(a.current)&&a.letters.length<3?(a.letters.push(a.current),a.current="",f="האות שודרה."):(p=!1,f="אות מכילה שלוש נקודות או שלושה קווים. אפסו אם צריך.")),e.type==="submit"&&(d=JSON.stringify(a.letters)===JSON.stringify(["...","---","..."])&&a.current==="")),l==="relay-network"&&(a.edges??(a.edges=[]),e.type==="edge"&&Number.isInteger(u)&&u>=0&&u<hr.length&&(a.edges=bs(a.edges,u)),e.type==="submit")){const m=new Set([0]);for(let _=0;_<6;_++)for(const x of a.edges){const[h,w]=hr[x];m.has(h)&&m.add(w),m.has(w)&&m.add(h)}d=[0,1,3,4,5].every(_=>m.has(_))&&!a.edges.some(_=>hr[_].includes(2))}if(l==="courier-plan"&&(a.route??(a.route=[]),e.type==="stop"&&[0,1,2].includes(u)&&!a.route.includes(u)&&a.route.push(u),e.type==="submit"&&(d=a.route.length===3&&a.route.indexOf(0)<a.route.indexOf(1)&&a.route.at(-1)===2&&xu(a.route)<=14)),l==="courier-course"&&e.type==="checkpoint"){if(!(s.checkpoint===1?i.dashing:s.checkpoint===3?t.y===0:t.y>.25))return{ok:!1,message:s.checkpoint===1?"הטבעת דורשת זינוק ב־Q.":s.checkpoint===3?"נחתו ועמדו בסימון האחרון.":"קפצו בתוך הטבעת."};if(s.checkpoint<3)return s.checkpoint++,{ok:!0,walk:!0,message:"החיישן הופעל. התנועה הבאה מסומנת."};d=!0}if(l==="courier-lockers"&&(a.delivered??(a.delivered=[]),e.type==="deliver"&&[0,1,2].includes(u))){if(u!==[1,2,0][s.checkpoint]||a.delivered.includes(u))return{ok:!1,message:"קוד החבילה לא מתאים לארונית. החבילה נשארה בתיק."};if(a.delivered.push(u),s.checkpoint<2)return s.checkpoint++,{ok:!0,walk:!0,message:"החבילה נמסרה. הארונית הבאה מסומנת."};d=!0}return d?(s.completed.push(o),s.carrying=!1,{ok:!0,complete:!0,message:"✓ משימת השטח הושלמה. ממשיכים לתיק הלימוד."}):{ok:e.type==="submit"||e.type==="execute"||e.type==="befriend"?!1:p,message:f}}function Cd(n,e,t,i){var o;const s=Un(n);if(!s||n.scenario.completed.includes(Qn(n)))return;const r=Si(n);if(s.kind==="rescue-trust"){const a=((o=t.companion)==null?void 0:o.type)==="fox"?t.companion:s,c=Math.hypot(e.x-a.x,e.z-a.z)<2.2;r.trust=Math.max(0,Math.min(3,(r.trust||0)+(c&&t.crouching&&!t.dashing?i:-i*.5)))}}const Ei=n=>String(n??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),ft=(n,e,t="",i="",s="")=>`<button class="secondary task-action" data-action="${e}" data-value="${t}" data-row="${i}" ${s}>${Ei(n)}</button>`,It=(n="בדיקת המשימה")=>`<button class="primary task-action" data-action="submit" data-value="" data-row="">${Ei(n)}</button>`,Ii=(n,e,t="")=>`<label class="task-input">${Ei(n)}<input type="number" inputmode="decimal" step="any" data-key="${e}" value="${t??""}"></label>`,si=(n,e,t,i,s)=>`<label class="task-input">${Ei(n)} <output data-readout="${e}">${t}</output><input type="range" min="${i}" max="${s}" step="1" data-key="${e}" value="${t}"></label>`,ri=n=>`<div class="task-card">${n}</div>`,Pn=(n,e="0 0 260 150")=>`<svg class="task-diagram" viewBox="${e}" role="img" aria-label="תרשים המשימה">${n}</svg>`,en=(n,e,t,i,s="#d6b783",r=3)=>`<line x1="${n}" y1="${e}" x2="${t}" y2="${i}" stroke="${s}" stroke-width="${r}"/>`,Yt=(n,e,t)=>`<text x="${n}" y="${e}" text-anchor="middle" fill="#edf1e9" font-size="12">${Ei(t)}</text>`,ts=(n,e,t,i="#a8cbbb")=>`<circle cx="${n}" cy="${e}" r="${t}" fill="${i}"/>`,Ia=(n,e,t,i)=>`<div class="task-grid" style="--columns:${e}">${Array.from({length:n},(s,r)=>ft(i(r).label,t,r,"",`aria-label="משבצת ${r+1}: ${Ei(i(r).label||"פנויה")}" aria-pressed="${!!i(r).selected}" style="${i(r).style||""}"`)).join("")}</div>`,Yc=["צפון ↑","מזרח →","דרום ↓","מערב ←"];function ln(n,e){if(n==="robot-route"){const t=mu(e.commands||[]),i=e.executed?t.trail.at(-1):{x:0,z:0};return Pn(Array.from({length:25},(s,r)=>{const o=r%5,a=Math.floor(r/5),c=[[1,1],[2,1],[2,2],[3,3]].some(l=>l[0]===o&&l[1]===a);return`<rect x="${o*40+2}" y="${a*40+2}" width="36" height="36" fill="${c?"#875d4c":"#29434b"}"/>`+Yt(o*40+20,a*40+25,r===0?"S":r===24?"G":c?"×":"")}).join("")+(e.executed?`<polyline points="${t.trail.map(s=>`${s.x*40+20},${s.z*40+20}`).join(" ")}" fill="none" stroke="#f0d19a" stroke-width="3"/>`:"")+`<circle id="task-robot" cx="${i.x*40+20}" cy="${i.z*40+20}" r="9" fill="#b7ddc4"/>`,"0 0 200 200")}if(n==="robot-circuit")return Pn([0,1,2,3].map(t=>{const i=[2,0,3,1][t];return ts(35,25+t*32,8,["#97c2dd","#d6b783","#9ac19a","#e1e8dd"][t])+ts(225,25+t*32,8,["#d6b783","#e1e8dd","#97c2dd","#9ac19a"][t])+((e.wires||[]).includes(t)?en(45,25+t*32,215,25+i*32):"")}).join(""));if(n==="survey-ruler")return Pn('<rect x="40" y="32" width="140" height="14" fill="#d6b783"/>'+Array.from({length:13},(t,i)=>en(i*20,65,i*20,78)+Yt(i*20,95,i)).join("")+en((e.a??0)*20,10,(e.a??0)*20,105,"#a9d8c3")+en((e.b??12)*20,10,(e.b??12)*20,105,"#d5a69b"),"0 0 250 115");if(n==="survey-scale")return Pn('<rect x="45" y="20" width="160" height="100" fill="#29434b" stroke="#e0c28a"/>'+Yt(125,12,"4 ס״מ")+Yt(225,75,"3 ס״מ")+Yt(125,145,"1 ס״מ = 10 מ׳"));if(n==="freight-balance"){const t=e.bins||[-1,-1,-1],i=[2,3,5],s=i.reduce((o,a,c)=>o+(t[c]===0?a:0),0),r=i.reduce((o,a,c)=>o+(t[c]===1?a:0),0);return Pn(`<g transform="rotate(${(r-s)*2} 130 55)">${en(30,55,230,55)}${en(40,55,40,110)}${en(220,55,220,110)}<path d="M10 110Q40 145 70 110M190 110Q220 145 250 110" fill="#64877b"/>${Yt(40,100,s+" ק״ג")}${Yt(220,100,r+" ק״ג")}</g><path d="M115 145L130 55L145 145Z" fill="#b39d77"/>`)}if(n==="optics-focus"){const t=Math.abs((e.a??0)-7)*.7,i=Math.max(.25,1-Math.abs((e.b??0)-3)*.15);return`<div class="focus-target" style="filter:blur(${t}px) brightness(${i})">${Pn('<path d="M35 115V25H65V115M100 115V45H130V115M165 115V65H195V115" fill="none" stroke="#e6e9d3" stroke-width="8"/>')}</div>`}if(n==="optics-parallax")return`<div class="sight-pair">${[e.a??-3,e.b??3].map((t,i)=>Pn(en(65,15,65,105,"#e9d2a5",6)+en(65+t*12,5,65+t*12,115,"#95c7bd",2)+en(20,60,110,60,"#95c7bd",2)+Yt(65,135,i?"עין ימין":"עין שמאל"),"0 0 130 145")).join("")}</div>`;if(n==="optics-samples")return Pn((e.samples||[]).map((t,i)=>ts(30+i*45,130-t*10,6,e.selected===i?"#dc9b83":"#a9d5bd")+Yt(30+i*45,148,t)).join(""));if(n==="shadow-light"){const t=e.a??0,i=[0,85,0,-85][t],s=[-50,0,50,0][t];return Pn(ts(130+i,75+s,12,"#f1d69d")+en(130,75,130-i*.8,75-s*.8,"#8ba0a7",12)+ts(130,75,8)+Yt(130,14,"צפון")+Yt(245,78,"מזרח")+Yt(130,145,"דרום")+Yt(15,78,"מערב"))}if(n==="shadow-height")return Pn(en(30,120,30,120-(e.a??1)*20,"#adc8af",7)+en(125,120,125,10,"#c9b17e",9)+en(30,125,90,125,"#879b9f",5)+en(125,125,250,125,"#879b9f",5)+Yt(60,145,"צל: 3 מ׳")+Yt(190,145,"צל: 9 מ׳")+Yt(30,15,"ייחוס"));if(n==="shadow-sundial"){const t=e.a??9,i=(t-13)*.32,s=t===10?75:t===14?45:55+Math.abs(t-13)*8;return Pn('<ellipse cx="130" cy="80" rx="110" ry="55" fill="#29434b"/>'+en(130,80,130+Math.sin(i)*s,80+Math.cos(i)*s,"#d6bd89",7)+ts(130,80,6)+Yt(130,22,`${t}:00`))}if(n==="rescue-trust")return`<meter min="0" max="3" value="${e.trust||0}"></meter><p>${Math.round((e.trust||0)/3*100)}% אמון</p>`;if(n==="rescue-care")return["שקט","מים","מנוחה"].map((t,i)=>`<label>${t}<meter min="0" max="${[3,2,1][i]}" value="${[e.calm||0,e.water||0,e.rest||0][i]}"></meter></label>`).join("");if(n==="relay-wave"){const t=(i,s)=>Array.from({length:80},(r,o)=>`${o*3.2},${75+Math.sin(o/79*Math.PI*2*i+s)*38}`).join(" ");return Pn(`<polyline points="${t(3,2)}" fill="none" stroke="#f1d49a" stroke-dasharray="5 4" stroke-width="3"/><polyline points="${t(e.a??1,e.b??0)}" fill="none" stroke="#95cabb" stroke-width="2"/>`)}if(n==="relay-network"){const t=[[15,70],[65,20],[65,120],[125,70],[185,20],[245,70]];return Pn(hr.map(([i,s],r)=>en(...t[i],...t[s],(e.edges||[]).includes(r)?"#edce93":"#42606a",(e.edges||[]).includes(r)?4:1)).join("")+t.map(([i,s],r)=>ts(i,s,12,r===2?"#b77b67":"#83af9c")+Yt(i,s+4,r+1)).join(""))}return""}function Pd(n,e,t){const i=Un(e),s=i.kind;let r=Si(e);function o(){var u,d,f,p;r=Si(e);let c="";const l=m=>`aria-pressed="${m}"`;if(s==="evidence-scene"&&(c='<p>זירת המעבדה · שישה פריטים לבדיקה</p><div class="task-grid" style="--columns:3">'+["חלונות ▤","כיסא ◇","יומן ▥","מסוף ▣","כרטיס ▱","עקבות ⋮"].map((m,_)=>{var x;return ft(m,"inspect",_,"",l((x=r.inspected)==null?void 0:x.includes(_)))}).join("")+"</div>"+(r.inspected||[]).map(m=>{var _;return ri(`<p>${Ei(hu[m])}</p>${ft((_=r.evidence)!=null&&_.includes(m)?"✓ בתיק":"לתיק הראיות","collect",m)}`)}).join("")+It("סיכום שלוש הראיות")),s==="evidence-board"&&(c=["צילום שלושה חלונות","לוג הפסקת חשמל","כרטיס כניסה חתום"].map((m,_)=>`<label class="task-input">${m}<select data-link-row="${_}"><option value="-1">בחרו מסקנה</option>${["מועד התקלה ידוע","הצוות נכנס לפני התקלה","נראו שלושה מקורות אור"].map((x,h)=>{var w;return`<option value="${h}" ${((w=r.links)==null?void 0:w[_])===h?"selected":""}>${x}</option>`}).join("")}</select></label>`).join("")+It("בדיקת הקשרים")),s==="evidence-timeline"&&(c=(r.order||[0,1,2,3]).map((m,_)=>ri(`<strong>${Ei(Rd[m].label)}</strong><div class="task-row">${ft("למעלה ↑","move",-1,_,_===0?"disabled":"")}${ft("למטה ↓","move",1,_,_===3?"disabled":"")}</div>`)).join("")+It("הגשת השחזור")),s==="witness-interview"&&(c=["נועה · הספרייה","איתי · החממה"].map((m,_)=>ri(`<h3>${m}</h3><div class="task-row">${["איפה היית?","מתי זה קרה?","את מי ראית?"].map((x,h)=>{var w;return ft(x,"ask",h,_,l((w=r.notes)==null?void 0:w.includes(_*3+h)))}).join("")}</div>`)).join("")+`<p>פרטי עדות שנאספו: ${((u=r.notes)==null?void 0:u.length)||0}</p>`+It("סיכום הראיונות")),s==="witness-timetable"&&(c=ri("<p>מצלמות: 18:10 · נועה בספרייה, איתי בחממה<br>18:20 · איתי עדיין בחממה</p>")+["נועה בספרייה ב־18:10","איתי בספרייה ב־18:10","איתי בחממה ב־18:20","איתי ליד האגם ב־18:20"].map((m,_)=>{var x;return ft(m,"claim",_,"",l((x=r.claims)==null?void 0:x.includes(_)))}).join("")+It("בדיקת הסתירות")),s==="witness-search"&&(c=ri(`<p>אתר נוכחי: ${["מגדל הקשר","המעבדה","הספסל ליד האגם"][e.scenario.checkpoint]}</p>${ft("בדיקת המקום הזה","find")}`)+["מגדל הקשר","המעבדה","הספסל ליד האגם"].map((m,_)=>ft("לחפש: "+m,"search",_)).join("")),s==="robot-route"&&(c=`<div data-preview>${ln(s,r)}</div><p dir="ltr">${(r.commands||[]).map(m=>["→","↓","←","↑"][m]).join(" ")||"S → G"}</p><div class="program-controls" dir="ltr">${["מזרחה →","דרומה ↓","מערבה ←","צפונה ↑"].map((m,_)=>ft(m,"command",_)).join("")}</div>${ft("הרצת המסלול","execute")}`),s==="robot-circuit"&&(c=`<div data-preview>${ln(s,r)}</div><h3>בוחרים יציאה</h3><div class="task-grid" style="--columns:2">${["△ כחול","○ זהוב","□ ירוק","◇ לבן"].map((m,_)=>ft(m,"set",_,"",`data-key="selected" ${l(r.selected===_)}`)).join("")}</div><h3>מחברים לכניסה</h3><div class="task-grid" style="--columns:2">${["○ זהוב","◇ לבן","△ כחול","□ ירוק"].map((m,_)=>ft(m,"wire",_,r.selected??-1)).join("")}</div><p>${((d=r.wires)==null?void 0:d.length)||0}/4 חיבורים תקינים</p>`+It("בדיקת המעגל")),s==="survey-ruler"&&(c=`<div data-preview>${ln(s,r)}</div>`+si("קצה ראשון","a",r.a??0,0,12)+si("קצה שני","b",r.b??12,0,12)+Ii("האורך בין הקצוות","number",r.number)+It("תיעוד המדידה")),s==="survey-parcel"&&(c=Ia(12,4,"cell",m=>{var _,x;return{label:(_=r.cells)!=null&&_.includes(m)?"✓":"",selected:(x=r.cells)==null?void 0:x.includes(m),style:pu.includes(m)?"border-color:#e2c18b;background:#304a42":"background:#172630"}})+Ii("שטח החלקה במטרים רבועים","number",r.number)+It("שמירת גבולות ושטח")),s==="survey-scale"&&(c=`<div data-preview>${ln(s,r)}</div>`+Ii("רוחב המבנה בשטח, במטרים","a",r.a)+Ii("עומק המבנה בשטח, במטרים","b",r.b)+It("שמירת מפת השטח")),s==="freight-manifest"&&(c=ri("<p>לוח: 250 ס״מ · צינור: 0.8 מ׳</p>")+Ii("אורך הלוח במטרים","a",r.a)+Ii("אורך הצינור בסנטימטרים","b",r.b)+"<h3>רכב הובלה</h3>"+["טנדר · אורך תא 2 מ׳","משאית · אורך תא 3 מ׳"].map((m,_)=>ft(m,"set",_,"",`data-key="vehicle" ${l(r.vehicle===_)}`)).join("")+It("אישור תעודת המשלוח")),s==="freight-balance"&&(c=`<div data-preview>${ln(s,r)}</div>`+[2,3,5].map((m,_)=>{var x,h;return ri(`<strong>${m} ק״ג</strong><div class="task-row">${ft("כף שמאל","bin",0,_,l(((x=r.bins)==null?void 0:x[_])===0))}${ft("כף ימין","bin",1,_,l(((h=r.bins)==null?void 0:h[_])===1))}</div>`)}).join("")+It("שקילת המטען")),s==="freight-packing"){const m=yo(r.placements)||[];c='<div class="task-row">'+["ריבוע ⁦2×2⁩","מלבן ⁦2×1⁩","צינור ⁦1×2⁩"].map((_,x)=>ft(_,"set",x,"",`data-key="selected" ${l(r.selected===x)}`)).join("")+"</div>"+ft(r.rotate?"✓ סיבוב של רבע סיבוב":"סיבוב החלק ↻","set",r.rotate?0:1,"",'data-key="rotate"')+Ia(12,4,"place",_=>{const x=m.find(h=>h.id===_);return{label:x?["א","ב","ג"][x.piece]:"·",style:x?`background:${["#5e8177","#8a7257","#5d7890"][x.piece]}`:""}})+It("סגירת הארגז")}s==="optics-focus"&&(c=`<div data-preview>${ln(s,r)}</div>`+si("מיקוד","a",r.a??0,0,10)+si("חשיפה","b",r.b??0,0,8)+It("צילום לוח הכיול")),s==="optics-parallax"&&(c=`<div data-preview>${ln(s,r)}</div>`+si("זווית עין שמאל","a",r.a??-3,-4,4)+si("זווית עין ימין","b",r.b??3,-4,4)+It("אישור יישור המבטים")),s==="optics-samples"&&(c=`<div data-preview>${ln(s,r)}</div>${ft("קחו מדידה נוספת","sample","","",(((f=r.samples)==null?void 0:f.length)||0)>=5?"disabled":"")}<p>${((p=r.samples)==null?void 0:p.length)||0}/5 מדידות</p>`+(r.samples||[]).map((m,_)=>ft(`${m} · ${r.selected===_?"✓ חריגה":"סימון כחריגה"}`,"set",_,"",'data-key="selected"')).join("")+Ii("ממוצע ארבע המדידות התקינות","number",r.number)+It("אישור סדרת המדידות")),s==="shadow-light"&&(c=`<div data-preview>${ln(s,r)}</div><h3>מיקום מקור האור</h3><div class="task-grid" style="--columns:2">${Yc.map((m,_)=>ft(m,"set",_,"",`data-key="a" ${l(r.a===_)}`)).join("")}</div><h3>כיוון הצל</h3><div class="task-grid" style="--columns:2">${Yc.map((m,_)=>ft(m,"set",_,"",`data-key="b" ${l(r.b===_)}`)).join("")}</div>`+It("בדיקת התחזית")),s==="shadow-height"&&(c=`<div data-preview>${ln(s,r)}</div>`+si("גובה עמוד הייחוס במטרים","a",r.a??1,1,4)+Ii("גובה המגדל במטרים","number",r.number)+It("רישום גובה המגדל")),s==="shadow-sundial"&&(c=`<div data-preview>${ln(s,r)}</div>`+si("שעת התצפית","a",r.a??9,9,17)+ft("שמירת התצפית","observe")+`<p>תצפיות שנשמרו: ${(r.observations||[]).map(m=>`${m}:00 · צל ${m===10?5:3} מ׳`).join(" / ")||"עדיין אין"}</p><h3>באיזו שעה הצל קצר יותר?</h3>`+[10,14].map(m=>ft(m+":00","set",m,"",`data-key="answer" ${l(r.answer===m)}`)).join("")+It("סיכום התצפיות")),s==="rescue-trust"&&(c=`<div data-preview>${ln(s,r)}</div>`+ft("להציע חברות לשועל","befriend")),s==="rescue-shelter"&&(c='<div class="task-row">'+["קערת מים","מצע רך","גגון"].map((m,_)=>ft(m,"set",_,"",`data-key="selected" ${l(r.selected===_)}`)).join("")+"</div>"+Ia(9,3,"shelter",m=>({label:m===7?"כניסה":(r.layout||[]).includes(m)?["מים","מצע","גגון"][(r.layout||[]).indexOf(m)]:"·",style:m===7?"border-color:#d7c08d":""}))+It("בדיקת המחסה")),s==="rescue-care"&&(c=`<div data-preview>${ln(s,r)}</div>`+["יוצרים שקט ליד השועל","מציעים קערת מים","נותנים לנוח במחסה"].map((m,_)=>ft(m,"care",_)).join("")+It("בדיקת צורכי השועל")),s==="relay-wave"&&(c=`<div data-preview>${ln(s,r)}</div>`+si("תדירות","a",r.a??1,1,6)+si("מופע","b",r.b??0,0,5)+It("נעילת הסנכרון")),s==="relay-morse"&&(c=ri(`<p dir="ltr" class="morse-code">${(r.letters||[]).join(" / ")} / ${Ei(r.current||"")}</p><div class="task-row">${ft("נקודה ·","symbol",".")}${ft("קו —","symbol","-")}${ft("סיום אות","letter")}</div>`)+It("שידור ההודעה")),s==="relay-network"&&(c=`<div data-preview>${ln(s,r)}</div><div class="task-grid" style="--columns:2">${hr.map(([m,_],x)=>{var h;return ft(`תחנה ${m+1} ↔ תחנה ${_+1}`,"edge",x,"",l((h=r.edges)==null?void 0:h.includes(x)))}).join("")}</div>`+It("בדיקת חיבור הרשת")),s==="courier-plan"&&(c=ri("<p>כניסה→מחסן: 3 · כניסה→מעבדה: 8 · כניסה→שער: 12<br>מחסן→מעבדה: 4 · מחסן→שער: 10 · מעבדה→שער: 5</p>")+'<div class="task-row">'+["מחסן ומפתח","מעבדה","שער"].map((m,_)=>{var x;return ft(m,"stop",_,"",(x=r.route)!=null&&x.includes(_)?"disabled":"")}).join("")+`</div><p>${(r.route||[]).map(m=>["מחסן","מעבדה","שער"][m]).join(" ← ")||"בחרו עצירה ראשונה"}</p><strong>מרחק: ${xu(r.route||[])} / 14</strong>`+It("אישור תוכנית המסירה")),s==="courier-lockers"&&(c=ri(`<h3>ארונית ${e.scenario.checkpoint+1} · קוד <bdi>${["4A","7C","2B"][e.scenario.checkpoint]}</bdi></h3><p>הקוד שעל החבילה צריך להיות הפוך לקוד הארונית.</p>`)+["B2","A4","C7"].map((m,_)=>ft((r.delivered||[]).includes(_)?`✓ ${m} נמסרה`:`מסירת חבילה ${m}`,"deliver",_,"",(r.delivered||[]).includes(_)?"disabled":"")).join("")),n.innerHTML=`<div class="task-workspace" data-task-kind="${s}">${c}<button class="text-button" data-action="reset" data-value="" data-row="">איפוס משימת השטח</button></div>`}function a(){const c=n.querySelector("[data-preview]");c&&(c.innerHTML=ln(s,r));for(const l of n.querySelectorAll("[data-readout]"))l.textContent=r[l.dataset.readout]??""}return n.onclick=c=>{const l=c.target.closest("button[data-action]");if(!l||!n.contains(l))return;let u=l.dataset.value;u!==""&&Number.isFinite(Number(u))&&(u=Number(u));const d={type:l.dataset.action,value:u,row:l.dataset.row===""?void 0:Number(l.dataset.row),key:l.dataset.key},f=t(d);if(!f.complete&&!f.walk){o();const p=[...n.querySelectorAll("button[data-action]")].find(m=>m.dataset.action===l.dataset.action&&m.dataset.value===l.dataset.value&&m.dataset.row===l.dataset.row&&m.dataset.key===l.dataset.key);p==null||p.focus({preventScroll:!0})}},n.oninput=c=>{const l=c.target;l.matches("input[data-key]")&&(t({type:l.value===""?"clear":"set",key:l.dataset.key,value:Number(l.value)},!1),a())},n.onchange=c=>{const l=c.target;l.matches("select[data-link-row]")&&t({type:"link",row:Number(l.dataset.linkRow),value:Number(l.value)})},o(),{render:o,refreshPreview:a}}function Ld(n=globalThis.crypto){if(typeof n.randomUUID=="function")return n.randomUUID();const e=n.getRandomValues(new Uint8Array(16));e[6]=e[6]&15|64,e[8]=e[8]&63|128;const t=[...e].map(i=>i.toString(16).padStart(2,"0")).join("");return`${t.slice(0,8)}-${t.slice(8,12)}-${t.slice(12,16)}-${t.slice(16,20)}-${t.slice(20)}`}const Nn=[{id:"bench",name:"הספסל ליד האגם",x:-6,z:10,range:3,kind:"rest",description:"פסק זמן קטן. הספסל לא ישאל מה הספקתם היום.",action:"לשבת לרגע"},{id:"door",name:"דלת המבואה",x:-2,z:-15.5,range:2.8,kind:"toggle",description:"הדלת הידנית של המבואה עדיין עובדת. בפנים: מקום שקט ולוח הפרויקט.",action:"לפתוח את הדלת"},{id:"lamp",name:"פנס הרחבה",x:-2,z:10,range:2.4,kind:"toggle",description:"מפסק מקומי. לפחות דבר אחד כאן לא דורש סיסמה.",action:"לכבות את הפנס"},{id:"basketball",name:"עמדת הקליעה",x:12,z:22,range:2.8,kind:"play",description:"הכדור נמצא על הקו. זריקה רגועה, בלי שעון ובלי טבלת דירוג.",action:"לזרוק לסל"},{id:"locker",name:"ארונית צוות איינשטיין",x:-10,z:-13,range:2.5,kind:"inspect",description:"על הדלת: ״ציוד משותף. רעיונות פחות״. בפנים נשאר פתק מסבב העבודה האחרון.",action:"לפתוח את הארונית"},{id:"noticeboard",name:"לוח ההאקתון",x:-4,z:5,range:2.4,kind:"clue",description:"רשימת סוף יום: כרטיס הגישה עבר מערבה מהספרייה; הגיבוי הונח ממזרח למעבדה; האנטנה נשארה בדרום־מערב. אף אחד לא סימן ״החזרתי״.",action:"לתעד את הרמז ביומן"},{id:"telescope",name:"עמדת תצפית לאגם",x:-8,z:16.7,range:2.5,kind:"observe",description:"עדשה מכוונת לאגם. אפשר להתקרב למראה בלי לרדוף אחרי בעלי החיים.",action:"להביט דרך העדשה"},{id:"water",name:"קערת המים",x:-8.5,z:8,range:2.5,kind:"care",description:"קערה נקייה בפינת הטבע. ממלאים מים ונותנים לבעלי החיים לבחור אם להתקרב.",action:"למלא מים"},{id:"planter",name:"ערוגת המעבדה",x:23,z:-6,range:2.5,kind:"care",description:"פרויקט השקיה שעובד גם בלי Wi-Fi. העלים קצת שמוטים; המשפך עדיין כאן.",action:"להשקות את הערוגה"},{id:"recycling",name:"פינת המחזור",x:5,z:10,range:2.5,kind:"help",description:"שלוש פחיות נשארו אחרי ההאקתון. ״מישהו יאסוף״ עדיין לא הגיע.",action:"לאסוף את הפחיות למחזור"},{id:"solar",name:"לוח תאורת השביל",x:19,z:8,range:2.6,kind:"puzzle",description:"שלושה מתגים, שלושה סימונים. הדליקו רק ירח ועץ כדי להאיר את פינת הטבע. אין קנס ואין לחץ זמן.",action:"לכוון את המתגים"},{id:"bike",name:"עמדת האופניים",x:-21,z:-8.5,range:2.5,kind:"play",description:"הפעמון תקוע בזווית. מיישרים, בודקים צלצול ומקווים שהשומר לא יחשוב שכבר בוקר.",action:"לבדוק את הפעמון"}];function Sr(n={}){const e=n&&typeof n=="object"&&!Array.isArray(n)?n:{},t=s=>Number.isSafeInteger(e[s])?Math.max(0,Math.min(9999,e[s])):0,i=s=>Array.isArray(s)?[...new Set(s.filter(r=>Nn.some(o=>o.id===r)))]:[];return{checkedEquipment:Array.isArray(e.checkedEquipment)?[...new Set(e.checkedEquipment.filter(s=>["card","fuse","antenna"].includes(s)))]:[],visited:i(e.visited),doorOpen:e.doorOpen===!0,lampOn:e.lampOn!==!1,lockerOpen:e.lockerOpen===!0,waterFilled:e.waterFilled===!0,watered:e.watered===!0,recycled:e.recycled===!0,switches:[0,1,2].map(s=>Array.isArray(e.switches)&&e.switches[s]===!0),shots:t("shots"),observations:t("observations"),bells:t("bells"),helped:Array.isArray(e.helped)?[...new Set(e.helped.filter(s=>["owl","pigeon","raccoon"].includes(s)))]:[],animalNotes:Array.isArray(e.animalNotes)?[...new Set(e.animalNotes.filter(s=>Number.isInteger(s)&&s>=0&&s<19))]:[],following:Number.isInteger(e.following)&&e.following>=0&&e.following<16?e.following:null,seated:e.seated===!0}}const Er=n=>n.switches[0]&&!n.switches[1]&&n.switches[2];function ba(n,e){return{bench:e.seated?"יושבים":"פנוי",door:e.doorOpen?"פתוחה":"סגורה",lamp:e.lampOn?"דולק":"כבוי",basketball:`${e.shots} קליעות`,locker:e.lockerOpen?"פתוחה":"סגורה",noticeboard:e.visited.includes("noticeboard")?"הרמז תועד":"רמז חדש",telescope:`${e.observations} תצפיות`,water:e.waterFilled?"הקערה מלאה":"הקערה ריקה",planter:e.watered?"הערוגה הושקתה":"זקוקה למים",recycling:e.recycled?"הרחבה נקייה":"3 פחיות בשטח",solar:Er(e)?"השביל מואר":"התאורה כבויה",bike:`${e.bells} צלצולים`}[n.id]}function gu(n,e){return{bench:e.seated?"לקום ולהמשיך":n.action,door:e.doorOpen?"לסגור את הדלת":n.action,lamp:e.lampOn?n.action:"להדליק את הפנס",locker:e.lockerOpen?"לסגור את הארונית":n.action,water:e.waterFilled?"לצפות ליד קערת המים":n.action,planter:e.watered?"לבדוק את העלים":n.action,recycling:e.recycled?"לבדוק את הפינה הנקייה":n.action,noticeboard:e.visited.includes("noticeboard")?"לקרוא שוב את הרמז":n.action}[n.id]||n.action}const je=[{id:"owl",name:"נועה",role:"צוות התוכנה · הספרייה",system:"מסוף הגישה",color:"#91b6c5",x:-13,z:-9,line:"המסוף נתקע וכולם שולחים לי הוראות שונות. אני צריכה לבדוק מה באמת קרה, לא עוד עשר השערות. אפשר לעבור איתי על הדברים אחד־אחד?",choices:["נקשיב למה שכבר בדקה ונבחר יחד צעד אחד","ננסה לשנות הכול בבת אחת","נחליט שהיא לא מבינה ונתפוס פיקוד"],need:0,reply:"מעולה. סוף סוף מישהו שלא מציע לכבות ולהדליק את כל בית הספר.",wrong:"נועה מצביעה על רשימת הבדיקות. היא מבקשת שיתוף פעולה וסדר, לא עוד רעש."},{id:"pigeon",name:"איתי",role:"צוות הרובוטיקה · החממה",system:"מערכת הגיבוי",color:"#b5bd9d",x:13,z:-7,line:"אני מחזיק את בקר הגיבוי כבר רבע שעה, ואף אחד לא שאל אם אני צריך עזרה. לא, הכול בסדר. ברור. רק קצת נגמרות לי הידיים.",choices:["נשאל מה אפשר לקחת ממנו ונתחלק במשימה","נגיד לו להפסיק להתלונן","נתחיל להסביר לו איך לעבוד מהר יותר"],need:0,reply:"קחו את החלק של למצוא ציוד. אני אקח את החלק של לא להפיל את הפרויקט של כל הכיתה.",wrong:"הוא מסתכל על הציוד שבידיים שלו. הבעיה היא עומס, לא חוסר ידע."},{id:"raccoon",name:"אדם",role:"צוות התקשורת · מגדל הקשר",system:"ערוץ הקשר",color:"#c6aa83",x:10,z:14,line:"שמעתם את הרעש מהיער? אני יודע שזאת כנראה חיה. עדיין, מעדיף לא לעבור שם לבד. לא צריך להכריז על זה בקבוצת הכיתה.",choices:["נציע להתקדם יחד ולשמור את זה בינינו","נצלם אותו כדי להצחיק את הקבוצה","נגיד שאין שום סיבה להרגיש ככה"],need:0,reply:"תודה. מסתבר שעבודת צוות היא גם לצאת מהמצגת וללכת ביחד.",wrong:"אדם ביקש חברה ודיסקרטיות. אפשר לעזור בלי לבטל את מה שהוא מרגיש."}],Gt=[{id:"card",name:"כרטיס צוות איינשטיין",short:"כרטיס גישה",x:-21,z:-3,npc:0,hint:"על שולחן העבודה שממערב לספרייה, ליד השביל לאגם.",clue:"על הכרטיס כתוב: צוות איינשטיין — כיתת הייטק. בגב הכרטיס רשומה הערה: נוהל היציאה דורש אימות של שלושת מסופי הפרויקט.",report:"כרטיס הגישה נמצא. המסוף בספרייה יכול להתחבר עכשיו למערכת התרגול."},{id:"fuse",name:"יחידת גיבוי לפרויקט",short:"יחידת גיבוי",x:21,z:3,npc:1,hint:"בארגז הציוד שממזרח לחממה. חפשו את הסימון הצהוב.",clue:"זו יחידת גיבוי לימודית של הרובוטיקה. על המדבקה: מי שלוקח — מחזיר. מתחת, מישהו הוסיף: כן, גם אם זה עובד.",report:"יחידת הגיבוי נמצאה. איתי יוכל להפעיל את התחנה אחרי בדיקת התרגול."},{id:"antenna",name:"אנטנת תחנת הקשר",short:"אנטנה",x:-8,z:22,npc:2,hint:"ליד עמדת הקשר הישנה, בדרום־מערב המתחם.",clue:"מחברת פתוחה ליד האנטנה: צוות התקשורת, ז׳ איינשטיין. כששלוש התחנות פעילות, השער חוזר למצב יציאה. ברקע נשמע רעש — הפעם באמת ברווז.",report:"האנטנה נמצאה. חוזרים לאדם במגדל ומשלימים את בדיקת הקשר."}],Gs={x:0,z:-25},So=(n,e=Math.random)=>{const t=[...n];for(let i=t.length-1;i>0;i--){const s=Math.floor(e()*(i+1));[t[i],t[s]]=[t[s],t[i]]}return t};function _u(n){return!!n&&typeof n.id=="string"&&typeof n.title=="string"&&Array.isArray(n.references)&&Array.isArray(n.questions)&&n.questions.length>0&&n.questions.length<=30&&new Set(n.questions.map(e=>e.id)).size===n.questions.length&&n.questions.every(e=>{var t;return typeof e.id=="string"&&typeof e.prompt=="string"&&e.type==="mcq"&&Array.isArray(e.choices)&&e.choices.length>=2&&e.choices.every(i=>typeof i=="string")&&Number.isInteger(e.correct)&&e.correct>=0&&e.correct<e.choices.length&&typeof((t=e.explanation)==null?void 0:t.he)=="string"&&n.references.some(i=>{var s,r;return i.id===((s=e.ref)==null?void 0:s.id)&&(!e.ref.part||((r=i.parts)==null?void 0:r.some(o=>o.part===e.ref.part)))})})}function Dd(n,e=Math.random){if(!_u(n))throw new Error("Invalid quiz");const t=So(n.questions,e).map(i=>({...i,options:So(i.choices.map((s,r)=>({text:s,original:r})),e)}));return{quizId:n.id,questions:t,assignments:je.map((i,s)=>t.filter((r,o)=>o%3===s).map(r=>r.id)),environment:Sr(),answers:{},understood:[],seals:[],items:[],collected:[],elapsed:0,player:{x:0,z:9},startedAt:Date.now(),attemptId:Ld()}}function Id(n,e,t){if(Object.hasOwn(n.answers,e))return null;const i=n.questions.find(r=>r.id===e);if(!i||!Number.isInteger(t)||t<0||t>=i.choices.length)return null;const s={choice:t,correct:t===i.correct};return n.answers[e]=s,s}function Mn(n,e){const t=n.assignments[e];return{answered:t.filter(i=>Object.hasOwn(n.answers,i)).length,total:t.length,next:t.find(i=>!Object.hasOwn(n.answers,i))}}function vu(n){const e={easy:1,medium:1.5,hard:2},t=n.questions.reduce((i,s)=>i+(e[s.difficulty]||1.5),0);return Math.round(n.questions.reduce((i,s)=>{var r;return i+((r=n.answers[s.id])!=null&&r.correct?e[s.difficulty]||1.5:0)},0)/t*100)}const Ud=n=>n>=90?3:n>=75?2:n>=50?1:0;function Ti(n){return n.seals.length===3&&Object.keys(n.answers).length===n.questions.length}function bu(n,e){try{const t=JSON.parse(n);if(!t||t.quizId!==e.id||typeof t.attemptId!="string"||!Number.isFinite(t.startedAt)||!Number.isFinite(t.elapsed)||t.elapsed<0||!Array.isArray(t.questions)||t.questions.length!==e.questions.length||!t.player||!Number.isFinite(t.player.x)||!Number.isFinite(t.player.z)||Math.abs(t.player.x)>27||Math.abs(t.player.z)>27||t.participantName!==void 0&&(typeof t.participantName!="string"||!t.participantName.trim()||t.participantName.length>60))return null;const i=new Set;for(const s of t.questions){const r=e.questions.find(o=>o.id===s.id);if(!r||i.has(s.id)||JSON.stringify({...s,options:void 0})!==JSON.stringify(r)||(i.add(s.id),!Array.isArray(s.options)||s.options.length!==r.choices.length||new Set(s.options.map(o=>o.original)).size!==s.options.length||s.options.some(o=>r.choices[o.original]!==o.text)))return null}if(!t.answers||typeof t.answers!="object")return null;for(const[s,r]of Object.entries(t.answers)){const o=e.questions.find(a=>a.id===s);if(!o||!Number.isInteger(r.choice)||r.choice<0||r.choice>=o.choices.length||r.correct!==(r.choice===o.correct))return null}if(t.assignments=je.map((s,r)=>t.questions.filter((o,a)=>a%3===r).map(o=>o.id)),!Array.isArray(t.understood)||t.understood.some(s=>!je.some(r=>r.id===s))||(t.items=Array.isArray(t.items)?[...new Set(t.items.filter(s=>Gt.some(r=>r.id===s)))]:[],t.relay&&!Td(t.relay)))return null;if(t.seals=je.filter((s,r)=>(t.relay?Yi(t.relay,r):t.understood.includes(s.id)&&t.items.includes(Gt[r].id))&&Mn(t,r).answered===Mn(t,r).total).map(s=>s.id),t.collected=Array.isArray(t.collected)?[...new Set(t.collected.filter(s=>Number.isInteger(s)&&s>=0&&s<12))]:[],t.scenario!==void 0){if(t.scenario=Ad(t.scenario),!t.scenario)return null;t.seals=t.seals.filter(s=>t.scenario.completed.includes(je.findIndex(r=>r.id===s)))}return t.environment=Sr(t.environment),t}catch{return null}}function Ki(n,e,t=n.player){if(Ti(n))return{id:"exit",kind:"exit",...Gs,title:"השער פתוח — יוצאים הביתה",hint:"לכו בעקבות השביל המואר ולחצו על כפתור היציאה ליד השער.",action:"לשער היציאה"};if(n.scenario)return Ys(n);const i=je.map((u,d)=>d).filter(u=>!n.seals.includes(je[u].id));if(n.relay)return wd(n.relay,i,e,t);const s=i.filter(u=>n.understood.includes(je[u].id)||n.items.includes(Gt[u].id)),r=s.length?s:i,o=i.includes(e)?e:r.sort((u,d)=>Math.hypot(t.x-je[u].x,t.z-je[u].z)-Math.hypot(t.x-je[d].x,t.z-je[d].z))[0],a=je[o],c=Gt[o];if(!n.understood.includes(a.id))return{id:a.id+":meet",kind:"npc",index:o,x:a.x,z:a.z,title:`דברו עם ${a.name}`,hint:`${["ליד הספרייה","ליד החממה","ליד מגדל הקשר"][o]} — התקרבו ולחצו על שיחה. ${a.name} מחכה לכם.`,action:`אל ${a.name}`};if(!n.items.includes(c.id))return{id:c.id+":find",kind:"equipment",index:o,x:c.x,z:c.z,title:`מצאו ובדקו ${c.short}`,hint:c.hint,action:"לציוד החסר"};const l=Mn(n,o);return{id:a.id+":return",kind:"npc",index:o,x:a.x,z:a.z,title:`החזירו את הציוד ל${a.name}`,hint:`הציוד איתכם. חזרו לתחנה והשלימו ${l.total-l.answered} שאלות כדי להפעיל את ${a.system}.`,action:`חזרה ל${a.name}`}}const Fd=[{id:"water",title:"עזרה בפינת הטבע",hint:"מלאו את קערת המים ותנו לארנב להתקרב.",done:n=>n.waterFilled},{id:"locker",title:"הפתק שנשאר מאחור",hint:"פתחו את ארונית הצוות כדי לחשוף רמז לאנטנה.",done:n=>n.visited.includes("locker")},{id:"solar",title:"להחזיר אור לשביל",hint:"כוונו את מתגי התאורה לפי הסימונים שעל המכסה.",done:n=>Er(n)},{id:"basketball",title:"שלוש זריקות להפסקה",hint:"קלעו שלוש פעמים. אפילו השומר צריך הפסקה.",done:n=>n.shots>=3},{id:"telescope",title:"מי מסתובב באגם?",hint:"השתמשו בעמדת התצפית וגלו מי ממשיך בסיור.",done:n=>n.observations>0}],yu={card:{title:"שחזור קוד הגישה",hint:"על הסורק חרוט הסדר: משולש ← ריבוע ← עיגול. לחצו על הסמלים באותו סדר.",options:["משולש △","ריבוע □","עיגול ○"],sequence:[0,1,2]},fuse:{title:"בדיקת יחידת ההדגמה",hint:"לפי המדבקה: מחברים את הכבל, מפעילים בדיקה, ואז נועלים את המכסה.",options:["בדיקה ◇","נעילת מכסה ▣","חיבור כבל ↔"],sequence:[2,0,1]},antenna:{title:"כיוון האות",hint:"במחברת מסומן ערוץ 5. כוונו את החוגה עד שהאות יציב, ואז אשרו."}};function Nd(n,e,t){var i,s;return((s=(i=yu[n])==null?void 0:i.sequence)==null?void 0:s[e])===t}function Bs(n){if(!(n!=null&&n.scenario))return Fd;const e={evidence:"lamp",witness:"telescope",robot:"planter",survey:"door",freight:"recycling",optics:"bench",shadow:"solar",rescue:"water",relay:"bike",courier:"basketball"},t=Nn.find(r=>r.id===e[n.scenario.id]);if(!t)return[];const i={lamp:"בדיקת התאורה בזירה",telescope:"תצפית בעקבות העד",planter:"עזרה בחממת הרובוטיקה",door:"סקר הכניסה למבנה",recycling:"פינוי אזור השילוח",bench:"עמדת תצפית יציבה",solar:"להחזיר אור למסלול הצללים",water:"מים לחיות הקמפוס",bike:"בדיקת אות גיבוי קולי",basketball:"תרגול קליעה בין משלוחים"},s=r=>t.id==="solar"?Er(r):t.id==="water"?r.waterFilled:t.id==="planter"?r.watered:t.id==="recycling"?r.recycled:t.id==="basketball"?r.shots>0:t.id==="telescope"?r.observations>0:t.id==="bike"?r.bells>0:r.visited.includes(t.id);return[{...t,title:i[t.id],hint:t.description,done:s}]}var Od=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function zd(n){if(Object.prototype.hasOwnProperty.call(n,"__esModule"))return n;var e=n.default;if(typeof e=="function"){var t=function i(){return this instanceof i?Reflect.construct(e,arguments,this.constructor):e.apply(this,arguments)};t.prototype=e.prototype}else t={};return Object.defineProperty(t,"__esModule",{value:!0}),Object.keys(n).forEach(function(i){var s=Object.getOwnPropertyDescriptor(n,i);Object.defineProperty(t,i,s.get?s:{enumerable:!0,get:function(){return n[i]}})}),t}var Ua={exports:{}};const Bd={},kd=Object.freeze(Object.defineProperty({__proto__:null,default:Bd},Symbol.toStringTag,{value:"Module"})),Kc=zd(kd);/**
 * [js-sha256]{@link https://github.com/emn178/js-sha256}
 *
 * @version 0.11.1
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2014-2025
 * @license MIT
 */var Zc;function Vd(){return Zc||(Zc=1,(function(n){(function(){var e="input is invalid type",t=typeof window=="object",i=t?window:{};i.JS_SHA256_NO_WINDOW&&(t=!1);var s=!t&&typeof self=="object",r=!i.JS_SHA256_NO_NODE_JS&&typeof process=="object"&&process.versions&&process.versions.node&&process.type!="renderer";r?i=Od:s&&(i=self);var o=!i.JS_SHA256_NO_COMMON_JS&&!0&&n.exports,a=!i.JS_SHA256_NO_ARRAY_BUFFER&&typeof ArrayBuffer<"u",c="0123456789abcdef".split(""),l=[-2147483648,8388608,32768,128],u=[24,16,8,0],d=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298],f=["hex","array","digest","arrayBuffer"],p=[];(i.JS_SHA256_NO_NODE_JS||!Array.isArray)&&(Array.isArray=function(v){return Object.prototype.toString.call(v)==="[object Array]"}),a&&(i.JS_SHA256_NO_ARRAY_BUFFER_IS_VIEW||!ArrayBuffer.isView)&&(ArrayBuffer.isView=function(v){return typeof v=="object"&&v.buffer&&v.buffer.constructor===ArrayBuffer});var m=function(v,C){return function(L){return new R(C,!0).update(L)[v]()}},_=function(v){var C=m("hex",v);r&&(C=x(C,v)),C.create=function(){return new R(v)},C.update=function(b){return C.create().update(b)};for(var L=0;L<f.length;++L){var g=f[L];C[g]=m(g,v)}return C},x=function(v,C){var L=Kc,g=Kc.Buffer,b=C?"sha224":"sha256",P;g.from&&!i.JS_SHA256_NO_BUFFER_FROM?P=g.from:P=function(I){return new g(I)};var N=function(I){if(typeof I=="string")return L.createHash(b).update(I,"utf8").digest("hex");if(I==null)throw new Error(e);return I.constructor===ArrayBuffer&&(I=new Uint8Array(I)),Array.isArray(I)||ArrayBuffer.isView(I)||I.constructor===g?L.createHash(b).update(P(I)).digest("hex"):v(I)};return N},h=function(v,C){return function(L,g){return new A(L,C,!0).update(g)[v]()}},w=function(v){var C=h("hex",v);C.create=function(b){return new A(b,v)},C.update=function(b,P){return C.create(b).update(P)};for(var L=0;L<f.length;++L){var g=f[L];C[g]=h(g,v)}return C};function R(v,C){C?(p[0]=p[16]=p[1]=p[2]=p[3]=p[4]=p[5]=p[6]=p[7]=p[8]=p[9]=p[10]=p[11]=p[12]=p[13]=p[14]=p[15]=0,this.blocks=p):this.blocks=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],v?(this.h0=3238371032,this.h1=914150663,this.h2=812702999,this.h3=4144912697,this.h4=4290775857,this.h5=1750603025,this.h6=1694076839,this.h7=3204075428):(this.h0=1779033703,this.h1=3144134277,this.h2=1013904242,this.h3=2773480762,this.h4=1359893119,this.h5=2600822924,this.h6=528734635,this.h7=1541459225),this.block=this.start=this.bytes=this.hBytes=0,this.finalized=this.hashed=!1,this.first=!0,this.is224=v}R.prototype.update=function(v){if(!this.finalized){var C,L=typeof v;if(L!=="string"){if(L==="object"){if(v===null)throw new Error(e);if(a&&v.constructor===ArrayBuffer)v=new Uint8Array(v);else if(!Array.isArray(v)&&(!a||!ArrayBuffer.isView(v)))throw new Error(e)}else throw new Error(e);C=!0}for(var g,b=0,P,N=v.length,I=this.blocks;b<N;){if(this.hashed&&(this.hashed=!1,I[0]=this.block,this.block=I[16]=I[1]=I[2]=I[3]=I[4]=I[5]=I[6]=I[7]=I[8]=I[9]=I[10]=I[11]=I[12]=I[13]=I[14]=I[15]=0),C)for(P=this.start;b<N&&P<64;++b)I[P>>>2]|=v[b]<<u[P++&3];else for(P=this.start;b<N&&P<64;++b)g=v.charCodeAt(b),g<128?I[P>>>2]|=g<<u[P++&3]:g<2048?(I[P>>>2]|=(192|g>>>6)<<u[P++&3],I[P>>>2]|=(128|g&63)<<u[P++&3]):g<55296||g>=57344?(I[P>>>2]|=(224|g>>>12)<<u[P++&3],I[P>>>2]|=(128|g>>>6&63)<<u[P++&3],I[P>>>2]|=(128|g&63)<<u[P++&3]):(g=65536+((g&1023)<<10|v.charCodeAt(++b)&1023),I[P>>>2]|=(240|g>>>18)<<u[P++&3],I[P>>>2]|=(128|g>>>12&63)<<u[P++&3],I[P>>>2]|=(128|g>>>6&63)<<u[P++&3],I[P>>>2]|=(128|g&63)<<u[P++&3]);this.lastByteIndex=P,this.bytes+=P-this.start,P>=64?(this.block=I[16],this.start=P-64,this.hash(),this.hashed=!0):this.start=P}return this.bytes>4294967295&&(this.hBytes+=this.bytes/4294967296<<0,this.bytes=this.bytes%4294967296),this}},R.prototype.finalize=function(){if(!this.finalized){this.finalized=!0;var v=this.blocks,C=this.lastByteIndex;v[16]=this.block,v[C>>>2]|=l[C&3],this.block=v[16],C>=56&&(this.hashed||this.hash(),v[0]=this.block,v[16]=v[1]=v[2]=v[3]=v[4]=v[5]=v[6]=v[7]=v[8]=v[9]=v[10]=v[11]=v[12]=v[13]=v[14]=v[15]=0),v[14]=this.hBytes<<3|this.bytes>>>29,v[15]=this.bytes<<3,this.hash()}},R.prototype.hash=function(){var v=this.h0,C=this.h1,L=this.h2,g=this.h3,b=this.h4,P=this.h5,N=this.h6,I=this.h7,H=this.blocks,X,Z,re,K,ie,te,pe,Pe,ze,He,ut;for(X=16;X<64;++X)ie=H[X-15],Z=(ie>>>7|ie<<25)^(ie>>>18|ie<<14)^ie>>>3,ie=H[X-2],re=(ie>>>17|ie<<15)^(ie>>>19|ie<<13)^ie>>>10,H[X]=H[X-16]+Z+H[X-7]+re<<0;for(ut=C&L,X=0;X<64;X+=4)this.first?(this.is224?(Pe=300032,ie=H[0]-1413257819,I=ie-150054599<<0,g=ie+24177077<<0):(Pe=704751109,ie=H[0]-210244248,I=ie-1521486534<<0,g=ie+143694565<<0),this.first=!1):(Z=(v>>>2|v<<30)^(v>>>13|v<<19)^(v>>>22|v<<10),re=(b>>>6|b<<26)^(b>>>11|b<<21)^(b>>>25|b<<7),Pe=v&C,K=Pe^v&L^ut,pe=b&P^~b&N,ie=I+re+pe+d[X]+H[X],te=Z+K,I=g+ie<<0,g=ie+te<<0),Z=(g>>>2|g<<30)^(g>>>13|g<<19)^(g>>>22|g<<10),re=(I>>>6|I<<26)^(I>>>11|I<<21)^(I>>>25|I<<7),ze=g&v,K=ze^g&C^Pe,pe=I&b^~I&P,ie=N+re+pe+d[X+1]+H[X+1],te=Z+K,N=L+ie<<0,L=ie+te<<0,Z=(L>>>2|L<<30)^(L>>>13|L<<19)^(L>>>22|L<<10),re=(N>>>6|N<<26)^(N>>>11|N<<21)^(N>>>25|N<<7),He=L&g,K=He^L&v^ze,pe=N&I^~N&b,ie=P+re+pe+d[X+2]+H[X+2],te=Z+K,P=C+ie<<0,C=ie+te<<0,Z=(C>>>2|C<<30)^(C>>>13|C<<19)^(C>>>22|C<<10),re=(P>>>6|P<<26)^(P>>>11|P<<21)^(P>>>25|P<<7),ut=C&L,K=ut^C&g^He,pe=P&N^~P&I,ie=b+re+pe+d[X+3]+H[X+3],te=Z+K,b=v+ie<<0,v=ie+te<<0,this.chromeBugWorkAround=!0;this.h0=this.h0+v<<0,this.h1=this.h1+C<<0,this.h2=this.h2+L<<0,this.h3=this.h3+g<<0,this.h4=this.h4+b<<0,this.h5=this.h5+P<<0,this.h6=this.h6+N<<0,this.h7=this.h7+I<<0},R.prototype.hex=function(){this.finalize();var v=this.h0,C=this.h1,L=this.h2,g=this.h3,b=this.h4,P=this.h5,N=this.h6,I=this.h7,H=c[v>>>28&15]+c[v>>>24&15]+c[v>>>20&15]+c[v>>>16&15]+c[v>>>12&15]+c[v>>>8&15]+c[v>>>4&15]+c[v&15]+c[C>>>28&15]+c[C>>>24&15]+c[C>>>20&15]+c[C>>>16&15]+c[C>>>12&15]+c[C>>>8&15]+c[C>>>4&15]+c[C&15]+c[L>>>28&15]+c[L>>>24&15]+c[L>>>20&15]+c[L>>>16&15]+c[L>>>12&15]+c[L>>>8&15]+c[L>>>4&15]+c[L&15]+c[g>>>28&15]+c[g>>>24&15]+c[g>>>20&15]+c[g>>>16&15]+c[g>>>12&15]+c[g>>>8&15]+c[g>>>4&15]+c[g&15]+c[b>>>28&15]+c[b>>>24&15]+c[b>>>20&15]+c[b>>>16&15]+c[b>>>12&15]+c[b>>>8&15]+c[b>>>4&15]+c[b&15]+c[P>>>28&15]+c[P>>>24&15]+c[P>>>20&15]+c[P>>>16&15]+c[P>>>12&15]+c[P>>>8&15]+c[P>>>4&15]+c[P&15]+c[N>>>28&15]+c[N>>>24&15]+c[N>>>20&15]+c[N>>>16&15]+c[N>>>12&15]+c[N>>>8&15]+c[N>>>4&15]+c[N&15];return this.is224||(H+=c[I>>>28&15]+c[I>>>24&15]+c[I>>>20&15]+c[I>>>16&15]+c[I>>>12&15]+c[I>>>8&15]+c[I>>>4&15]+c[I&15]),H},R.prototype.toString=R.prototype.hex,R.prototype.digest=function(){this.finalize();var v=this.h0,C=this.h1,L=this.h2,g=this.h3,b=this.h4,P=this.h5,N=this.h6,I=this.h7,H=[v>>>24&255,v>>>16&255,v>>>8&255,v&255,C>>>24&255,C>>>16&255,C>>>8&255,C&255,L>>>24&255,L>>>16&255,L>>>8&255,L&255,g>>>24&255,g>>>16&255,g>>>8&255,g&255,b>>>24&255,b>>>16&255,b>>>8&255,b&255,P>>>24&255,P>>>16&255,P>>>8&255,P&255,N>>>24&255,N>>>16&255,N>>>8&255,N&255];return this.is224||H.push(I>>>24&255,I>>>16&255,I>>>8&255,I&255),H},R.prototype.array=R.prototype.digest,R.prototype.arrayBuffer=function(){this.finalize();var v=new ArrayBuffer(this.is224?28:32),C=new DataView(v);return C.setUint32(0,this.h0),C.setUint32(4,this.h1),C.setUint32(8,this.h2),C.setUint32(12,this.h3),C.setUint32(16,this.h4),C.setUint32(20,this.h5),C.setUint32(24,this.h6),this.is224||C.setUint32(28,this.h7),v};function A(v,C,L){var g,b=typeof v;if(b==="string"){var P=[],N=v.length,I=0,H;for(g=0;g<N;++g)H=v.charCodeAt(g),H<128?P[I++]=H:H<2048?(P[I++]=192|H>>>6,P[I++]=128|H&63):H<55296||H>=57344?(P[I++]=224|H>>>12,P[I++]=128|H>>>6&63,P[I++]=128|H&63):(H=65536+((H&1023)<<10|v.charCodeAt(++g)&1023),P[I++]=240|H>>>18,P[I++]=128|H>>>12&63,P[I++]=128|H>>>6&63,P[I++]=128|H&63);v=P}else if(b==="object"){if(v===null)throw new Error(e);if(a&&v.constructor===ArrayBuffer)v=new Uint8Array(v);else if(!Array.isArray(v)&&(!a||!ArrayBuffer.isView(v)))throw new Error(e)}else throw new Error(e);v.length>64&&(v=new R(C,!0).update(v).array());var X=[],Z=[];for(g=0;g<64;++g){var re=v[g]||0;X[g]=92^re,Z[g]=54^re}R.call(this,C,L),this.update(Z),this.oKeyPad=X,this.inner=!0,this.sharedMemory=L}A.prototype=new R,A.prototype.finalize=function(){if(R.prototype.finalize.call(this),this.inner){this.inner=!1;var v=this.array();R.call(this,this.is224,this.sharedMemory),this.update(this.oKeyPad),this.update(v),R.prototype.finalize.call(this)}};var E=_();E.sha256=E,E.sha224=_(!0),E.sha256.hmac=w(),E.sha224.hmac=w(!0),o?n.exports=E:(i.sha256=E.sha256,i.sha224=E.sha224)})()})(Ua)),Ua.exports}var Gd=Vd();function Hd(n){return Gd.sha256(JSON.stringify(n.questions.map(({id:e,prompt:t,choices:i,correct:s,difficulty:r})=>({id:e,prompt:t,choices:i,correct:s,difficulty:r??null}))))}/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const vc="181",Wd=0,Jc=1,$d=2,Mu=1,Su=2,gi=3,Zi=0,wn=1,Gn=2,wi=0,ks=1,Qc=2,el=3,tl=4,qd=5,cs=100,Xd=101,jd=102,Yd=103,Kd=104,Zd=200,Jd=201,Qd=202,ef=203,Eo=204,To=205,tf=206,nf=207,sf=208,rf=209,af=210,of=211,cf=212,lf=213,uf=214,wo=0,Ao=1,Ro=2,Hs=3,Co=4,Po=5,Lo=6,Do=7,Eu=0,df=1,ff=2,$i=0,hf=1,pf=2,mf=3,Tu=4,xf=5,gf=6,_f=7,wu=300,Ws=301,$s=302,Io=303,Uo=304,ya=306,ua=1e3,Mi=1001,Fo=1002,On=1003,vf=1004,Pr=1005,Hn=1006,Fa=1007,us=1008,ui=1009,Au=1010,Ru=1011,mr=1012,bc=1013,fs=1014,ci=1015,Ks=1016,yc=1017,Mc=1018,xr=1020,Cu=35902,Pu=35899,Lu=1021,Du=1022,Zn=1023,gr=1026,_r=1027,Sc=1028,Ec=1029,Tc=1030,wc=1031,Ac=1033,ta=33776,na=33777,ia=33778,sa=33779,No=35840,Oo=35841,zo=35842,Bo=35843,ko=36196,Vo=37492,Go=37496,Ho=37808,Wo=37809,$o=37810,qo=37811,Xo=37812,jo=37813,Yo=37814,Ko=37815,Zo=37816,Jo=37817,Qo=37818,ec=37819,tc=37820,nc=37821,ic=36492,sc=36494,rc=36495,ac=36283,oc=36284,cc=36285,lc=36286,bf=3200,yf=3201,Iu=0,Mf=1,Gi="",gn="srgb",qs="srgb-linear",da="linear",Mt="srgb",ys=7680,nl=519,Sf=512,Ef=513,Tf=514,Uu=515,wf=516,Af=517,Rf=518,Cf=519,il=35044,sl="300 es",li=2e3,fa=2001;function Fu(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function ha(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Pf(){const n=ha("canvas");return n.style.display="block",n}const rl={};function al(...n){const e="THREE."+n.shift();console.log(e,...n)}function Ke(...n){const e="THREE."+n.shift();console.warn(e,...n)}function Ot(...n){const e="THREE."+n.shift();console.error(e,...n)}function vr(...n){const e=n.join(" ");e in rl||(rl[e]=!0,Ke(...n))}function Lf(n,e,t){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}class Zs{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const s=i[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}}const un=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Na=Math.PI/180,pa=180/Math.PI;function Tr(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(un[n&255]+un[n>>8&255]+un[n>>16&255]+un[n>>24&255]+"-"+un[e&255]+un[e>>8&255]+"-"+un[e>>16&15|64]+un[e>>24&255]+"-"+un[t&63|128]+un[t>>8&255]+"-"+un[t>>16&255]+un[t>>24&255]+un[i&255]+un[i>>8&255]+un[i>>16&255]+un[i>>24&255]).toLowerCase()}function ot(n,e,t){return Math.max(e,Math.min(t,n))}function Df(n,e){return(n%e+e)%e}function Oa(n,e,t){return(1-t)*n+t*e}function nr(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function yn(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}class st{constructor(e=0,t=0){st.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ot(this.x,e.x,t.x),this.y=ot(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ot(this.x,e,t),this.y=ot(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(ot(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(ot(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*i-o*s+e.x,this.y=r*s+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Js{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,o,a){let c=i[s+0],l=i[s+1],u=i[s+2],d=i[s+3],f=r[o+0],p=r[o+1],m=r[o+2],_=r[o+3];if(a<=0){e[t+0]=c,e[t+1]=l,e[t+2]=u,e[t+3]=d;return}if(a>=1){e[t+0]=f,e[t+1]=p,e[t+2]=m,e[t+3]=_;return}if(d!==_||c!==f||l!==p||u!==m){let x=c*f+l*p+u*m+d*_;x<0&&(f=-f,p=-p,m=-m,_=-_,x=-x);let h=1-a;if(x<.9995){const w=Math.acos(x),R=Math.sin(w);h=Math.sin(h*w)/R,a=Math.sin(a*w)/R,c=c*h+f*a,l=l*h+p*a,u=u*h+m*a,d=d*h+_*a}else{c=c*h+f*a,l=l*h+p*a,u=u*h+m*a,d=d*h+_*a;const w=1/Math.sqrt(c*c+l*l+u*u+d*d);c*=w,l*=w,u*=w,d*=w}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,s,r,o){const a=i[s],c=i[s+1],l=i[s+2],u=i[s+3],d=r[o],f=r[o+1],p=r[o+2],m=r[o+3];return e[t]=a*m+u*d+c*p-l*f,e[t+1]=c*m+u*f+l*d-a*p,e[t+2]=l*m+u*p+a*f-c*d,e[t+3]=u*m-a*d-c*f-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(i/2),u=a(s/2),d=a(r/2),f=c(i/2),p=c(s/2),m=c(r/2);switch(o){case"XYZ":this._x=f*u*d+l*p*m,this._y=l*p*d-f*u*m,this._z=l*u*m+f*p*d,this._w=l*u*d-f*p*m;break;case"YXZ":this._x=f*u*d+l*p*m,this._y=l*p*d-f*u*m,this._z=l*u*m-f*p*d,this._w=l*u*d+f*p*m;break;case"ZXY":this._x=f*u*d-l*p*m,this._y=l*p*d+f*u*m,this._z=l*u*m+f*p*d,this._w=l*u*d-f*p*m;break;case"ZYX":this._x=f*u*d-l*p*m,this._y=l*p*d+f*u*m,this._z=l*u*m-f*p*d,this._w=l*u*d+f*p*m;break;case"YZX":this._x=f*u*d+l*p*m,this._y=l*p*d+f*u*m,this._z=l*u*m-f*p*d,this._w=l*u*d-f*p*m;break;case"XZY":this._x=f*u*d-l*p*m,this._y=l*p*d-f*u*m,this._z=l*u*m+f*p*d,this._w=l*u*d+f*p*m;break;default:Ke("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],s=t[4],r=t[8],o=t[1],a=t[5],c=t[9],l=t[2],u=t[6],d=t[10],f=i+a+d;if(f>0){const p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(u-c)*p,this._y=(r-l)*p,this._z=(o-s)*p}else if(i>a&&i>d){const p=2*Math.sqrt(1+i-a-d);this._w=(u-c)/p,this._x=.25*p,this._y=(s+o)/p,this._z=(r+l)/p}else if(a>d){const p=2*Math.sqrt(1+a-i-d);this._w=(r-l)/p,this._x=(s+o)/p,this._y=.25*p,this._z=(c+u)/p}else{const p=2*Math.sqrt(1+d-i-a);this._w=(o-s)/p,this._x=(r+l)/p,this._y=(c+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ot(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,s=e._y,r=e._z,o=e._w,a=t._x,c=t._y,l=t._z,u=t._w;return this._x=i*u+o*a+s*l-r*c,this._y=s*u+o*c+r*a-i*l,this._z=r*u+o*l+i*c-s*a,this._w=o*u-i*a-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t<=0)return this;if(t>=1)return this.copy(e);let i=e._x,s=e._y,r=e._z,o=e._w,a=this.dot(e);a<0&&(i=-i,s=-s,r=-r,o=-o,a=-a);let c=1-t;if(a<.9995){const l=Math.acos(a),u=Math.sin(l);c=Math.sin(c*l)/u,t=Math.sin(t*l)/u,this._x=this._x*c+i*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+o*t,this._onChangeCallback()}else this._x=this._x*c+i*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+o*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class B{constructor(e=0,t=0,i=0){B.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(ol.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(ol.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(e){const t=this.x,i=this.y,s=this.z,r=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*s-a*i),u=2*(a*t-r*s),d=2*(r*i-o*t);return this.x=t+c*l+o*d-a*u,this.y=i+c*u+a*l-r*d,this.z=s+c*d+r*u-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ot(this.x,e.x,t.x),this.y=ot(this.y,e.y,t.y),this.z=ot(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ot(this.x,e,t),this.y=ot(this.y,e,t),this.z=ot(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(ot(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,s=e.y,r=e.z,o=t.x,a=t.y,c=t.z;return this.x=s*c-r*a,this.y=r*o-i*c,this.z=i*a-s*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return za.copy(this).projectOnVector(e),this.sub(za)}reflect(e){return this.sub(za.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(ot(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const za=new B,ol=new Js;class Ze{constructor(e,t,i,s,r,o,a,c,l){Ze.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,o,a,c,l)}set(e,t,i,s,r,o,a,c,l){const u=this.elements;return u[0]=e,u[1]=s,u[2]=a,u[3]=t,u[4]=r,u[5]=c,u[6]=i,u[7]=o,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,o=i[0],a=i[3],c=i[6],l=i[1],u=i[4],d=i[7],f=i[2],p=i[5],m=i[8],_=s[0],x=s[3],h=s[6],w=s[1],R=s[4],A=s[7],E=s[2],v=s[5],C=s[8];return r[0]=o*_+a*w+c*E,r[3]=o*x+a*R+c*v,r[6]=o*h+a*A+c*C,r[1]=l*_+u*w+d*E,r[4]=l*x+u*R+d*v,r[7]=l*h+u*A+d*C,r[2]=f*_+p*w+m*E,r[5]=f*x+p*R+m*v,r[8]=f*h+p*A+m*C,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8];return t*o*u-t*a*l-i*r*u+i*a*c+s*r*l-s*o*c}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],d=u*o-a*l,f=a*c-u*r,p=l*r-o*c,m=t*d+i*f+s*p;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/m;return e[0]=d*_,e[1]=(s*l-u*i)*_,e[2]=(a*i-s*o)*_,e[3]=f*_,e[4]=(u*t-s*c)*_,e[5]=(s*r-a*t)*_,e[6]=p*_,e[7]=(i*c-l*t)*_,e[8]=(o*t-i*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,o,a){const c=Math.cos(r),l=Math.sin(r);return this.set(i*c,i*l,-i*(c*o+l*a)+o+e,-s*l,s*c,-s*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Ba.makeScale(e,t)),this}rotate(e){return this.premultiply(Ba.makeRotation(-e)),this}translate(e,t){return this.premultiply(Ba.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Ba=new Ze,cl=new Ze().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ll=new Ze().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function If(){const n={enabled:!0,workingColorSpace:qs,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===Mt&&(s.r=Ai(s.r),s.g=Ai(s.g),s.b=Ai(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===Mt&&(s.r=Vs(s.r),s.g=Vs(s.g),s.b=Vs(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Gi?da:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return vr("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return vr("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[qs]:{primaries:e,whitePoint:i,transfer:da,toXYZ:cl,fromXYZ:ll,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:gn},outputColorSpaceConfig:{drawingBufferColorSpace:gn}},[gn]:{primaries:e,whitePoint:i,transfer:Mt,toXYZ:cl,fromXYZ:ll,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:gn}}}),n}const pt=If();function Ai(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Vs(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Ms;class Uf{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Ms===void 0&&(Ms=ha("canvas")),Ms.width=e.width,Ms.height=e.height;const s=Ms.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),i=Ms}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=ha("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Ai(r[o]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Ai(t[i]/255)*255):t[i]=Ai(t[i]);return{data:t,width:e.width,height:e.height}}else return Ke("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Ff=0;class Rc{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Ff++}),this.uuid=Tr(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(ka(s[o].image)):r.push(ka(s[o]))}else r=ka(s);i.url=r}return t||(e.images[this.uuid]=i),i}}function ka(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Uf.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Ke("Texture: Unable to serialize Texture."),{})}let Nf=0;const Va=new B;class hn extends Zs{constructor(e=hn.DEFAULT_IMAGE,t=hn.DEFAULT_MAPPING,i=Mi,s=Mi,r=Hn,o=us,a=Zn,c=ui,l=hn.DEFAULT_ANISOTROPY,u=Gi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Nf++}),this.uuid=Tr(),this.name="",this.source=new Rc(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new st(0,0),this.repeat=new st(1,1),this.center=new st(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ze,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Va).x}get height(){return this.source.getSize(Va).y}get depth(){return this.source.getSize(Va).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){Ke(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Ke(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==wu)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ua:e.x=e.x-Math.floor(e.x);break;case Mi:e.x=e.x<0?0:1;break;case Fo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ua:e.y=e.y-Math.floor(e.y);break;case Mi:e.y=e.y<0?0:1;break;case Fo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}hn.DEFAULT_IMAGE=null;hn.DEFAULT_MAPPING=wu;hn.DEFAULT_ANISOTROPY=1;class St{constructor(e=0,t=0,i=0,s=1){St.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*i+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r;const c=e.elements,l=c[0],u=c[4],d=c[8],f=c[1],p=c[5],m=c[9],_=c[2],x=c[6],h=c[10];if(Math.abs(u-f)<.01&&Math.abs(d-_)<.01&&Math.abs(m-x)<.01){if(Math.abs(u+f)<.1&&Math.abs(d+_)<.1&&Math.abs(m+x)<.1&&Math.abs(l+p+h-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const R=(l+1)/2,A=(p+1)/2,E=(h+1)/2,v=(u+f)/4,C=(d+_)/4,L=(m+x)/4;return R>A&&R>E?R<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(R),s=v/i,r=C/i):A>E?A<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(A),i=v/s,r=L/s):E<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(E),i=C/r,s=L/r),this.set(i,s,r,t),this}let w=Math.sqrt((x-m)*(x-m)+(d-_)*(d-_)+(f-u)*(f-u));return Math.abs(w)<.001&&(w=1),this.x=(x-m)/w,this.y=(d-_)/w,this.z=(f-u)/w,this.w=Math.acos((l+p+h-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ot(this.x,e.x,t.x),this.y=ot(this.y,e.y,t.y),this.z=ot(this.z,e.z,t.z),this.w=ot(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ot(this.x,e,t),this.y=ot(this.y,e,t),this.z=ot(this.z,e,t),this.w=ot(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(ot(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Of extends Zs{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Hn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new St(0,0,e,t),this.scissorTest=!1,this.viewport=new St(0,0,e,t);const s={width:e,height:t,depth:i.depth},r=new hn(s);this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){const t={minFilter:Hn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new Rc(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class hs extends Of{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Nu extends hn{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=On,this.minFilter=On,this.wrapR=Mi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class zf extends hn{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=On,this.minFilter=On,this.wrapR=Mi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ms{constructor(e=new B(1/0,1/0,1/0),t=new B(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(qn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(qn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=qn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,qn):qn.fromBufferAttribute(r,o),qn.applyMatrix4(e.matrixWorld),this.expandByPoint(qn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Lr.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Lr.copy(i.boundingBox)),Lr.applyMatrix4(e.matrixWorld),this.union(Lr)}const s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,qn),qn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ir),Dr.subVectors(this.max,ir),Ss.subVectors(e.a,ir),Es.subVectors(e.b,ir),Ts.subVectors(e.c,ir),Ui.subVectors(Es,Ss),Fi.subVectors(Ts,Es),ns.subVectors(Ss,Ts);let t=[0,-Ui.z,Ui.y,0,-Fi.z,Fi.y,0,-ns.z,ns.y,Ui.z,0,-Ui.x,Fi.z,0,-Fi.x,ns.z,0,-ns.x,-Ui.y,Ui.x,0,-Fi.y,Fi.x,0,-ns.y,ns.x,0];return!Ga(t,Ss,Es,Ts,Dr)||(t=[1,0,0,0,1,0,0,0,1],!Ga(t,Ss,Es,Ts,Dr))?!1:(Ir.crossVectors(Ui,Fi),t=[Ir.x,Ir.y,Ir.z],Ga(t,Ss,Es,Ts,Dr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,qn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(qn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(di[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),di[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),di[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),di[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),di[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),di[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),di[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),di[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(di),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const di=[new B,new B,new B,new B,new B,new B,new B,new B],qn=new B,Lr=new ms,Ss=new B,Es=new B,Ts=new B,Ui=new B,Fi=new B,ns=new B,ir=new B,Dr=new B,Ir=new B,is=new B;function Ga(n,e,t,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){is.fromArray(n,r);const a=s.x*Math.abs(is.x)+s.y*Math.abs(is.y)+s.z*Math.abs(is.z),c=e.dot(is),l=t.dot(is),u=i.dot(is);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}const Bf=new ms,sr=new B,Ha=new B;class xs{constructor(e=new B,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):Bf.setFromPoints(e).getCenter(i);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;sr.subVectors(e,this.center);const t=sr.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(sr,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ha.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(sr.copy(e.center).add(Ha)),this.expandByPoint(sr.copy(e.center).sub(Ha))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const fi=new B,Wa=new B,Ur=new B,Ni=new B,$a=new B,Fr=new B,qa=new B;class Ma{constructor(e=new B,t=new B(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,fi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=fi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(fi.copy(this.origin).addScaledVector(this.direction,t),fi.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){Wa.copy(e).add(t).multiplyScalar(.5),Ur.copy(t).sub(e).normalize(),Ni.copy(this.origin).sub(Wa);const r=e.distanceTo(t)*.5,o=-this.direction.dot(Ur),a=Ni.dot(this.direction),c=-Ni.dot(Ur),l=Ni.lengthSq(),u=Math.abs(1-o*o);let d,f,p,m;if(u>0)if(d=o*c-a,f=o*a-c,m=r*u,d>=0)if(f>=-m)if(f<=m){const _=1/u;d*=_,f*=_,p=d*(d+o*f+2*a)+f*(o*d+f+2*c)+l}else f=r,d=Math.max(0,-(o*f+a)),p=-d*d+f*(f+2*c)+l;else f=-r,d=Math.max(0,-(o*f+a)),p=-d*d+f*(f+2*c)+l;else f<=-m?(d=Math.max(0,-(-o*r+a)),f=d>0?-r:Math.min(Math.max(-r,-c),r),p=-d*d+f*(f+2*c)+l):f<=m?(d=0,f=Math.min(Math.max(-r,-c),r),p=f*(f+2*c)+l):(d=Math.max(0,-(o*r+a)),f=d>0?r:Math.min(Math.max(-r,-c),r),p=-d*d+f*(f+2*c)+l);else f=o>0?-r:r,d=Math.max(0,-(o*f+a)),p=-d*d+f*(f+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(Wa).addScaledVector(Ur,f),p}intersectSphere(e,t){fi.subVectors(e.center,this.origin);const i=fi.dot(this.direction),s=fi.dot(fi)-i*i,r=e.radius*e.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=i-o,c=i+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,o,a,c;const l=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,f=this.origin;return l>=0?(i=(e.min.x-f.x)*l,s=(e.max.x-f.x)*l):(i=(e.max.x-f.x)*l,s=(e.min.x-f.x)*l),u>=0?(r=(e.min.y-f.y)*u,o=(e.max.y-f.y)*u):(r=(e.max.y-f.y)*u,o=(e.min.y-f.y)*u),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),d>=0?(a=(e.min.z-f.z)*d,c=(e.max.z-f.z)*d):(a=(e.max.z-f.z)*d,c=(e.min.z-f.z)*d),i>c||a>s)||((a>i||i!==i)&&(i=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,fi)!==null}intersectTriangle(e,t,i,s,r){$a.subVectors(t,e),Fr.subVectors(i,e),qa.crossVectors($a,Fr);let o=this.direction.dot(qa),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Ni.subVectors(this.origin,e);const c=a*this.direction.dot(Fr.crossVectors(Ni,Fr));if(c<0)return null;const l=a*this.direction.dot($a.cross(Ni));if(l<0||c+l>o)return null;const u=-a*Ni.dot(qa);return u<0?null:this.at(u/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class vt{constructor(e,t,i,s,r,o,a,c,l,u,d,f,p,m,_,x){vt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,o,a,c,l,u,d,f,p,m,_,x)}set(e,t,i,s,r,o,a,c,l,u,d,f,p,m,_,x){const h=this.elements;return h[0]=e,h[4]=t,h[8]=i,h[12]=s,h[1]=r,h[5]=o,h[9]=a,h[13]=c,h[2]=l,h[6]=u,h[10]=d,h[14]=f,h[3]=p,h[7]=m,h[11]=_,h[15]=x,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new vt().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,s=1/ws.setFromMatrixColumn(e,0).length(),r=1/ws.setFromMatrixColumn(e,1).length(),o=1/ws.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,s=e.y,r=e.z,o=Math.cos(i),a=Math.sin(i),c=Math.cos(s),l=Math.sin(s),u=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){const f=o*u,p=o*d,m=a*u,_=a*d;t[0]=c*u,t[4]=-c*d,t[8]=l,t[1]=p+m*l,t[5]=f-_*l,t[9]=-a*c,t[2]=_-f*l,t[6]=m+p*l,t[10]=o*c}else if(e.order==="YXZ"){const f=c*u,p=c*d,m=l*u,_=l*d;t[0]=f+_*a,t[4]=m*a-p,t[8]=o*l,t[1]=o*d,t[5]=o*u,t[9]=-a,t[2]=p*a-m,t[6]=_+f*a,t[10]=o*c}else if(e.order==="ZXY"){const f=c*u,p=c*d,m=l*u,_=l*d;t[0]=f-_*a,t[4]=-o*d,t[8]=m+p*a,t[1]=p+m*a,t[5]=o*u,t[9]=_-f*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){const f=o*u,p=o*d,m=a*u,_=a*d;t[0]=c*u,t[4]=m*l-p,t[8]=f*l+_,t[1]=c*d,t[5]=_*l+f,t[9]=p*l-m,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){const f=o*c,p=o*l,m=a*c,_=a*l;t[0]=c*u,t[4]=_-f*d,t[8]=m*d+p,t[1]=d,t[5]=o*u,t[9]=-a*u,t[2]=-l*u,t[6]=p*d+m,t[10]=f-_*d}else if(e.order==="XZY"){const f=o*c,p=o*l,m=a*c,_=a*l;t[0]=c*u,t[4]=-d,t[8]=l*u,t[1]=f*d+_,t[5]=o*u,t[9]=p*d-m,t[2]=m*d-p,t[6]=a*u,t[10]=_*d+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(kf,e,Vf)}lookAt(e,t,i){const s=this.elements;return Ln.subVectors(e,t),Ln.lengthSq()===0&&(Ln.z=1),Ln.normalize(),Oi.crossVectors(i,Ln),Oi.lengthSq()===0&&(Math.abs(i.z)===1?Ln.x+=1e-4:Ln.z+=1e-4,Ln.normalize(),Oi.crossVectors(i,Ln)),Oi.normalize(),Nr.crossVectors(Ln,Oi),s[0]=Oi.x,s[4]=Nr.x,s[8]=Ln.x,s[1]=Oi.y,s[5]=Nr.y,s[9]=Ln.y,s[2]=Oi.z,s[6]=Nr.z,s[10]=Ln.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,o=i[0],a=i[4],c=i[8],l=i[12],u=i[1],d=i[5],f=i[9],p=i[13],m=i[2],_=i[6],x=i[10],h=i[14],w=i[3],R=i[7],A=i[11],E=i[15],v=s[0],C=s[4],L=s[8],g=s[12],b=s[1],P=s[5],N=s[9],I=s[13],H=s[2],X=s[6],Z=s[10],re=s[14],K=s[3],ie=s[7],te=s[11],pe=s[15];return r[0]=o*v+a*b+c*H+l*K,r[4]=o*C+a*P+c*X+l*ie,r[8]=o*L+a*N+c*Z+l*te,r[12]=o*g+a*I+c*re+l*pe,r[1]=u*v+d*b+f*H+p*K,r[5]=u*C+d*P+f*X+p*ie,r[9]=u*L+d*N+f*Z+p*te,r[13]=u*g+d*I+f*re+p*pe,r[2]=m*v+_*b+x*H+h*K,r[6]=m*C+_*P+x*X+h*ie,r[10]=m*L+_*N+x*Z+h*te,r[14]=m*g+_*I+x*re+h*pe,r[3]=w*v+R*b+A*H+E*K,r[7]=w*C+R*P+A*X+E*ie,r[11]=w*L+R*N+A*Z+E*te,r[15]=w*g+R*I+A*re+E*pe,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],o=e[1],a=e[5],c=e[9],l=e[13],u=e[2],d=e[6],f=e[10],p=e[14],m=e[3],_=e[7],x=e[11],h=e[15];return m*(+r*c*d-s*l*d-r*a*f+i*l*f+s*a*p-i*c*p)+_*(+t*c*p-t*l*f+r*o*f-s*o*p+s*l*u-r*c*u)+x*(+t*l*d-t*a*p-r*o*d+i*o*p+r*a*u-i*l*u)+h*(-s*a*u-t*c*d+t*a*f+s*o*d-i*o*f+i*c*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],d=e[9],f=e[10],p=e[11],m=e[12],_=e[13],x=e[14],h=e[15],w=d*x*l-_*f*l+_*c*p-a*x*p-d*c*h+a*f*h,R=m*f*l-u*x*l-m*c*p+o*x*p+u*c*h-o*f*h,A=u*_*l-m*d*l+m*a*p-o*_*p-u*a*h+o*d*h,E=m*d*c-u*_*c-m*a*f+o*_*f+u*a*x-o*d*x,v=t*w+i*R+s*A+r*E;if(v===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const C=1/v;return e[0]=w*C,e[1]=(_*f*r-d*x*r-_*s*p+i*x*p+d*s*h-i*f*h)*C,e[2]=(a*x*r-_*c*r+_*s*l-i*x*l-a*s*h+i*c*h)*C,e[3]=(d*c*r-a*f*r-d*s*l+i*f*l+a*s*p-i*c*p)*C,e[4]=R*C,e[5]=(u*x*r-m*f*r+m*s*p-t*x*p-u*s*h+t*f*h)*C,e[6]=(m*c*r-o*x*r-m*s*l+t*x*l+o*s*h-t*c*h)*C,e[7]=(o*f*r-u*c*r+u*s*l-t*f*l-o*s*p+t*c*p)*C,e[8]=A*C,e[9]=(m*d*r-u*_*r-m*i*p+t*_*p+u*i*h-t*d*h)*C,e[10]=(o*_*r-m*a*r+m*i*l-t*_*l-o*i*h+t*a*h)*C,e[11]=(u*a*r-o*d*r-u*i*l+t*d*l+o*i*p-t*a*p)*C,e[12]=E*C,e[13]=(u*_*s-m*d*s+m*i*f-t*_*f-u*i*x+t*d*x)*C,e[14]=(m*a*s-o*_*s-m*i*c+t*_*c+o*i*x-t*a*x)*C,e[15]=(o*d*s-u*a*s+u*i*c-t*d*c-o*i*f+t*a*f)*C,this}scale(e){const t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),s=Math.sin(t),r=1-i,o=e.x,a=e.y,c=e.z,l=r*o,u=r*a;return this.set(l*o+i,l*a-s*c,l*c+s*a,0,l*a+s*c,u*a+i,u*c-s*o,0,l*c-s*a,u*c+s*o,r*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,o){return this.set(1,i,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){const s=this.elements,r=t._x,o=t._y,a=t._z,c=t._w,l=r+r,u=o+o,d=a+a,f=r*l,p=r*u,m=r*d,_=o*u,x=o*d,h=a*d,w=c*l,R=c*u,A=c*d,E=i.x,v=i.y,C=i.z;return s[0]=(1-(_+h))*E,s[1]=(p+A)*E,s[2]=(m-R)*E,s[3]=0,s[4]=(p-A)*v,s[5]=(1-(f+h))*v,s[6]=(x+w)*v,s[7]=0,s[8]=(m+R)*C,s[9]=(x-w)*C,s[10]=(1-(f+_))*C,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){const s=this.elements;let r=ws.set(s[0],s[1],s[2]).length();const o=ws.set(s[4],s[5],s[6]).length(),a=ws.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],Xn.copy(this);const l=1/r,u=1/o,d=1/a;return Xn.elements[0]*=l,Xn.elements[1]*=l,Xn.elements[2]*=l,Xn.elements[4]*=u,Xn.elements[5]*=u,Xn.elements[6]*=u,Xn.elements[8]*=d,Xn.elements[9]*=d,Xn.elements[10]*=d,t.setFromRotationMatrix(Xn),i.x=r,i.y=o,i.z=a,this}makePerspective(e,t,i,s,r,o,a=li,c=!1){const l=this.elements,u=2*r/(t-e),d=2*r/(i-s),f=(t+e)/(t-e),p=(i+s)/(i-s);let m,_;if(c)m=r/(o-r),_=o*r/(o-r);else if(a===li)m=-(o+r)/(o-r),_=-2*o*r/(o-r);else if(a===fa)m=-o/(o-r),_=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=d,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,s,r,o,a=li,c=!1){const l=this.elements,u=2/(t-e),d=2/(i-s),f=-(t+e)/(t-e),p=-(i+s)/(i-s);let m,_;if(c)m=1/(o-r),_=o/(o-r);else if(a===li)m=-2/(o-r),_=-(o+r)/(o-r);else if(a===fa)m=-1/(o-r),_=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=0,l[12]=f,l[1]=0,l[5]=d,l[9]=0,l[13]=p,l[2]=0,l[6]=0,l[10]=m,l[14]=_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const ws=new B,Xn=new vt,kf=new B(0,0,0),Vf=new B(1,1,1),Oi=new B,Nr=new B,Ln=new B,ul=new vt,dl=new Js;class ei{constructor(e=0,t=0,i=0,s=ei.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const s=e.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],u=s[9],d=s[2],f=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin(ot(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-ot(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(ot(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-ot(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(ot(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-ot(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,p),this._y=0);break;default:Ke("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return ul.makeRotationFromQuaternion(e),this.setFromRotationMatrix(ul,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return dl.setFromEuler(this),this.setFromQuaternion(dl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ei.DEFAULT_ORDER="XYZ";class Cc{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Gf=0;const fl=new B,As=new Js,hi=new vt,Or=new B,rr=new B,Hf=new B,Wf=new Js,hl=new B(1,0,0),pl=new B(0,1,0),ml=new B(0,0,1),xl={type:"added"},$f={type:"removed"},Rs={type:"childadded",child:null},Xa={type:"childremoved",child:null};class Bt extends Zs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Gf++}),this.uuid=Tr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Bt.DEFAULT_UP.clone();const e=new B,t=new ei,i=new Js,s=new B(1,1,1);function r(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new vt},normalMatrix:{value:new Ze}}),this.matrix=new vt,this.matrixWorld=new vt,this.matrixAutoUpdate=Bt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Bt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Cc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return As.setFromAxisAngle(e,t),this.quaternion.multiply(As),this}rotateOnWorldAxis(e,t){return As.setFromAxisAngle(e,t),this.quaternion.premultiply(As),this}rotateX(e){return this.rotateOnAxis(hl,e)}rotateY(e){return this.rotateOnAxis(pl,e)}rotateZ(e){return this.rotateOnAxis(ml,e)}translateOnAxis(e,t){return fl.copy(e).applyQuaternion(this.quaternion),this.position.add(fl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(hl,e)}translateY(e){return this.translateOnAxis(pl,e)}translateZ(e){return this.translateOnAxis(ml,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(hi.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Or.copy(e):Or.set(e,t,i);const s=this.parent;this.updateWorldMatrix(!0,!1),rr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?hi.lookAt(rr,Or,this.up):hi.lookAt(Or,rr,this.up),this.quaternion.setFromRotationMatrix(hi),s&&(hi.extractRotation(s.matrixWorld),As.setFromRotationMatrix(hi),this.quaternion.premultiply(As.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Ot("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(xl),Rs.child=e,this.dispatchEvent(Rs),Rs.child=null):Ot("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent($f),Xa.child=e,this.dispatchEvent(Xa),Xa.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),hi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),hi.multiply(e.parent.matrixWorld)),e.applyMatrix4(hi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(xl),Rs.child=e,this.dispatchEvent(Rs),Rs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){const o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(rr,e,Hf),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(rr,Wf,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const d=c[l];r(e.shapes,d)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(e.materials,this.material[c]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];s.animations.push(r(e.animations,c))}}if(t){const a=o(e.geometries),c=o(e.materials),l=o(e.textures),u=o(e.images),d=o(e.shapes),f=o(e.skeletons),p=o(e.animations),m=o(e.nodes);a.length>0&&(i.geometries=a),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),u.length>0&&(i.images=u),d.length>0&&(i.shapes=d),f.length>0&&(i.skeletons=f),p.length>0&&(i.animations=p),m.length>0&&(i.nodes=m)}return i.object=s,i;function o(a){const c=[];for(const l in a){const u=a[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}}Bt.DEFAULT_UP=new B(0,1,0);Bt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Bt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const jn=new B,pi=new B,ja=new B,mi=new B,Cs=new B,Ps=new B,gl=new B,Ya=new B,Ka=new B,Za=new B,Ja=new St,Qa=new St,eo=new St;class Kn{constructor(e=new B,t=new B,i=new B){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),jn.subVectors(e,t),s.cross(jn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){jn.subVectors(s,t),pi.subVectors(i,t),ja.subVectors(e,t);const o=jn.dot(jn),a=jn.dot(pi),c=jn.dot(ja),l=pi.dot(pi),u=pi.dot(ja),d=o*l-a*a;if(d===0)return r.set(0,0,0),null;const f=1/d,p=(l*c-a*u)*f,m=(o*u-a*c)*f;return r.set(1-p-m,m,p)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,mi)===null?!1:mi.x>=0&&mi.y>=0&&mi.x+mi.y<=1}static getInterpolation(e,t,i,s,r,o,a,c){return this.getBarycoord(e,t,i,s,mi)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,mi.x),c.addScaledVector(o,mi.y),c.addScaledVector(a,mi.z),c)}static getInterpolatedAttribute(e,t,i,s,r,o){return Ja.setScalar(0),Qa.setScalar(0),eo.setScalar(0),Ja.fromBufferAttribute(e,t),Qa.fromBufferAttribute(e,i),eo.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(Ja,r.x),o.addScaledVector(Qa,r.y),o.addScaledVector(eo,r.z),o}static isFrontFacing(e,t,i,s){return jn.subVectors(i,t),pi.subVectors(e,t),jn.cross(pi).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return jn.subVectors(this.c,this.b),pi.subVectors(this.a,this.b),jn.cross(pi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Kn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Kn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,r){return Kn.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return Kn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Kn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,s=this.b,r=this.c;let o,a;Cs.subVectors(s,i),Ps.subVectors(r,i),Ya.subVectors(e,i);const c=Cs.dot(Ya),l=Ps.dot(Ya);if(c<=0&&l<=0)return t.copy(i);Ka.subVectors(e,s);const u=Cs.dot(Ka),d=Ps.dot(Ka);if(u>=0&&d<=u)return t.copy(s);const f=c*d-u*l;if(f<=0&&c>=0&&u<=0)return o=c/(c-u),t.copy(i).addScaledVector(Cs,o);Za.subVectors(e,r);const p=Cs.dot(Za),m=Ps.dot(Za);if(m>=0&&p<=m)return t.copy(r);const _=p*l-c*m;if(_<=0&&l>=0&&m<=0)return a=l/(l-m),t.copy(i).addScaledVector(Ps,a);const x=u*m-p*d;if(x<=0&&d-u>=0&&p-m>=0)return gl.subVectors(r,s),a=(d-u)/(d-u+(p-m)),t.copy(s).addScaledVector(gl,a);const h=1/(x+_+f);return o=_*h,a=f*h,t.copy(i).addScaledVector(Cs,o).addScaledVector(Ps,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Ou={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},zi={h:0,s:0,l:0},zr={h:0,s:0,l:0};function to(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class at{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=gn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,pt.colorSpaceToWorking(this,t),this}setRGB(e,t,i,s=pt.workingColorSpace){return this.r=e,this.g=t,this.b=i,pt.colorSpaceToWorking(this,s),this}setHSL(e,t,i,s=pt.workingColorSpace){if(e=Df(e,1),t=ot(t,0,1),i=ot(i,0,1),t===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+t):i+t-i*t,o=2*i-r;this.r=to(o,r,e+1/3),this.g=to(o,r,e),this.b=to(o,r,e-1/3)}return pt.colorSpaceToWorking(this,s),this}setStyle(e,t=gn){function i(r){r!==void 0&&parseFloat(r)<1&&Ke("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Ke("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);Ke("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=gn){const i=Ou[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Ke("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ai(e.r),this.g=Ai(e.g),this.b=Ai(e.b),this}copyLinearToSRGB(e){return this.r=Vs(e.r),this.g=Vs(e.g),this.b=Vs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=gn){return pt.workingToColorSpace(dn.copy(this),e),Math.round(ot(dn.r*255,0,255))*65536+Math.round(ot(dn.g*255,0,255))*256+Math.round(ot(dn.b*255,0,255))}getHexString(e=gn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=pt.workingColorSpace){pt.workingToColorSpace(dn.copy(this),t);const i=dn.r,s=dn.g,r=dn.b,o=Math.max(i,s,r),a=Math.min(i,s,r);let c,l;const u=(a+o)/2;if(a===o)c=0,l=0;else{const d=o-a;switch(l=u<=.5?d/(o+a):d/(2-o-a),o){case i:c=(s-r)/d+(s<r?6:0);break;case s:c=(r-i)/d+2;break;case r:c=(i-s)/d+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=pt.workingColorSpace){return pt.workingToColorSpace(dn.copy(this),t),e.r=dn.r,e.g=dn.g,e.b=dn.b,e}getStyle(e=gn){pt.workingToColorSpace(dn.copy(this),e);const t=dn.r,i=dn.g,s=dn.b;return e!==gn?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(zi),this.setHSL(zi.h+e,zi.s+t,zi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(zi),e.getHSL(zr);const i=Oa(zi.h,zr.h,t),s=Oa(zi.s,zr.s,t),r=Oa(zi.l,zr.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const dn=new at;at.NAMES=Ou;let qf=0;class gs extends Zs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:qf++}),this.uuid=Tr(),this.name="",this.type="Material",this.blending=ks,this.side=Zi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Eo,this.blendDst=To,this.blendEquation=cs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new at(0,0,0),this.blendAlpha=0,this.depthFunc=Hs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=nl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ys,this.stencilZFail=ys,this.stencilZPass=ys,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){Ke(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Ke(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==ks&&(i.blending=this.blending),this.side!==Zi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Eo&&(i.blendSrc=this.blendSrc),this.blendDst!==To&&(i.blendDst=this.blendDst),this.blendEquation!==cs&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Hs&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==nl&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ys&&(i.stencilFail=this.stencilFail),this.stencilZFail!==ys&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==ys&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const o=[];for(const a in r){const c=r[a];delete c.metadata,o.push(c)}return o}if(t){const r=s(e.textures),o=s(e.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class _i extends gs{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new at(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ei,this.combine=Eu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Vt=new B,Br=new st;let Xf=0;class Wn{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Xf++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=il,this.updateRanges=[],this.gpuType=ci,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Br.fromBufferAttribute(this,t),Br.applyMatrix3(e),this.setXY(t,Br.x,Br.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Vt.fromBufferAttribute(this,t),Vt.applyMatrix3(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Vt.fromBufferAttribute(this,t),Vt.applyMatrix4(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Vt.fromBufferAttribute(this,t),Vt.applyNormalMatrix(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Vt.fromBufferAttribute(this,t),Vt.transformDirection(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=nr(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=yn(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=nr(t,this.array)),t}setX(e,t){return this.normalized&&(t=yn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=nr(t,this.array)),t}setY(e,t){return this.normalized&&(t=yn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=nr(t,this.array)),t}setZ(e,t){return this.normalized&&(t=yn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=nr(t,this.array)),t}setW(e,t){return this.normalized&&(t=yn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=yn(t,this.array),i=yn(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=yn(t,this.array),i=yn(i,this.array),s=yn(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=yn(t,this.array),i=yn(i,this.array),s=yn(s,this.array),r=yn(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==il&&(e.usage=this.usage),e}}class zu extends Wn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Bu extends Wn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class At extends Wn{constructor(e,t,i){super(new Float32Array(e),t,i)}}let jf=0;const Vn=new vt,no=new Bt,Ls=new B,Dn=new ms,ar=new ms,Kt=new B;class jt extends Zs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:jf++}),this.uuid=Tr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Fu(e)?Bu:zu)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Ze().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Vn.makeRotationFromQuaternion(e),this.applyMatrix4(Vn),this}rotateX(e){return Vn.makeRotationX(e),this.applyMatrix4(Vn),this}rotateY(e){return Vn.makeRotationY(e),this.applyMatrix4(Vn),this}rotateZ(e){return Vn.makeRotationZ(e),this.applyMatrix4(Vn),this}translate(e,t,i){return Vn.makeTranslation(e,t,i),this.applyMatrix4(Vn),this}scale(e,t,i){return Vn.makeScale(e,t,i),this.applyMatrix4(Vn),this}lookAt(e){return no.lookAt(e),no.updateMatrix(),this.applyMatrix4(no.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ls).negate(),this.translate(Ls.x,Ls.y,Ls.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let s=0,r=e.length;s<r;s++){const o=e[s];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new At(i,3))}else{const i=Math.min(e.length,t.count);for(let s=0;s<i;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Ke("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ms);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ot("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new B(-1/0,-1/0,-1/0),new B(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){const r=t[i];Dn.setFromBufferAttribute(r),this.morphTargetsRelative?(Kt.addVectors(this.boundingBox.min,Dn.min),this.boundingBox.expandByPoint(Kt),Kt.addVectors(this.boundingBox.max,Dn.max),this.boundingBox.expandByPoint(Kt)):(this.boundingBox.expandByPoint(Dn.min),this.boundingBox.expandByPoint(Dn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ot('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new xs);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ot("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new B,1/0);return}if(e){const i=this.boundingSphere.center;if(Dn.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];ar.setFromBufferAttribute(a),this.morphTargetsRelative?(Kt.addVectors(Dn.min,ar.min),Dn.expandByPoint(Kt),Kt.addVectors(Dn.max,ar.max),Dn.expandByPoint(Kt)):(Dn.expandByPoint(ar.min),Dn.expandByPoint(ar.max))}Dn.getCenter(i);let s=0;for(let r=0,o=e.count;r<o;r++)Kt.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(Kt));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],c=this.morphTargetsRelative;for(let l=0,u=a.count;l<u;l++)Kt.fromBufferAttribute(a,l),c&&(Ls.fromBufferAttribute(e,l),Kt.add(Ls)),s=Math.max(s,i.distanceToSquared(Kt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Ot('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Ot("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Wn(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let L=0;L<i.count;L++)a[L]=new B,c[L]=new B;const l=new B,u=new B,d=new B,f=new st,p=new st,m=new st,_=new B,x=new B;function h(L,g,b){l.fromBufferAttribute(i,L),u.fromBufferAttribute(i,g),d.fromBufferAttribute(i,b),f.fromBufferAttribute(r,L),p.fromBufferAttribute(r,g),m.fromBufferAttribute(r,b),u.sub(l),d.sub(l),p.sub(f),m.sub(f);const P=1/(p.x*m.y-m.x*p.y);isFinite(P)&&(_.copy(u).multiplyScalar(m.y).addScaledVector(d,-p.y).multiplyScalar(P),x.copy(d).multiplyScalar(p.x).addScaledVector(u,-m.x).multiplyScalar(P),a[L].add(_),a[g].add(_),a[b].add(_),c[L].add(x),c[g].add(x),c[b].add(x))}let w=this.groups;w.length===0&&(w=[{start:0,count:e.count}]);for(let L=0,g=w.length;L<g;++L){const b=w[L],P=b.start,N=b.count;for(let I=P,H=P+N;I<H;I+=3)h(e.getX(I+0),e.getX(I+1),e.getX(I+2))}const R=new B,A=new B,E=new B,v=new B;function C(L){E.fromBufferAttribute(s,L),v.copy(E);const g=a[L];R.copy(g),R.sub(E.multiplyScalar(E.dot(g))).normalize(),A.crossVectors(v,g);const P=A.dot(c[L])<0?-1:1;o.setXYZW(L,R.x,R.y,R.z,P)}for(let L=0,g=w.length;L<g;++L){const b=w[L],P=b.start,N=b.count;for(let I=P,H=P+N;I<H;I+=3)C(e.getX(I+0)),C(e.getX(I+1)),C(e.getX(I+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Wn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let f=0,p=i.count;f<p;f++)i.setXYZ(f,0,0,0);const s=new B,r=new B,o=new B,a=new B,c=new B,l=new B,u=new B,d=new B;if(e)for(let f=0,p=e.count;f<p;f+=3){const m=e.getX(f+0),_=e.getX(f+1),x=e.getX(f+2);s.fromBufferAttribute(t,m),r.fromBufferAttribute(t,_),o.fromBufferAttribute(t,x),u.subVectors(o,r),d.subVectors(s,r),u.cross(d),a.fromBufferAttribute(i,m),c.fromBufferAttribute(i,_),l.fromBufferAttribute(i,x),a.add(u),c.add(u),l.add(u),i.setXYZ(m,a.x,a.y,a.z),i.setXYZ(_,c.x,c.y,c.z),i.setXYZ(x,l.x,l.y,l.z)}else for(let f=0,p=t.count;f<p;f+=3)s.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),u.subVectors(o,r),d.subVectors(s,r),u.cross(d),i.setXYZ(f+0,u.x,u.y,u.z),i.setXYZ(f+1,u.x,u.y,u.z),i.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Kt.fromBufferAttribute(e,t),Kt.normalize(),e.setXYZ(t,Kt.x,Kt.y,Kt.z)}toNonIndexed(){function e(a,c){const l=a.array,u=a.itemSize,d=a.normalized,f=new l.constructor(c.length*u);let p=0,m=0;for(let _=0,x=c.length;_<x;_++){a.isInterleavedBufferAttribute?p=c[_]*a.data.stride+a.offset:p=c[_]*u;for(let h=0;h<u;h++)f[m++]=l[p++]}return new Wn(f,u,d)}if(this.index===null)return Ke("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new jt,i=this.index.array,s=this.attributes;for(const a in s){const c=s[a],l=e(c,i);t.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const c=[],l=r[a];for(let u=0,d=l.length;u<d;u++){const f=l[u],p=e(f,i);c.push(p)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const c in i){const l=i[c];e.data.attributes[c]=l.toJSON(e.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let d=0,f=l.length;d<f;d++){const p=l[d];u.push(p.toJSON(e.data))}u.length>0&&(s[c]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const s=e.attributes;for(const l in s){const u=s[l];this.setAttribute(l,u.clone(t))}const r=e.morphAttributes;for(const l in r){const u=[],d=r[l];for(let f=0,p=d.length;f<p;f++)u.push(d[f].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let l=0,u=o.length;l<u;l++){const d=o[l];this.addGroup(d.start,d.count,d.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const _l=new vt,ss=new Ma,kr=new xs,vl=new B,Vr=new B,Gr=new B,Hr=new B,io=new B,Wr=new B,bl=new B,$r=new B;class _n extends Bt{constructor(e=new jt,t=new _i){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(s,e);const a=this.morphTargetInfluences;if(r&&a){Wr.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const u=a[c],d=r[c];u!==0&&(io.fromBufferAttribute(d,e),o?Wr.addScaledVector(io,u):Wr.addScaledVector(io.sub(t),u))}t.add(Wr)}return t}raycast(e,t){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),kr.copy(i.boundingSphere),kr.applyMatrix4(r),ss.copy(e.ray).recast(e.near),!(kr.containsPoint(ss.origin)===!1&&(ss.intersectSphere(kr,vl)===null||ss.origin.distanceToSquared(vl)>(e.far-e.near)**2))&&(_l.copy(r).invert(),ss.copy(e.ray).applyMatrix4(_l),!(i.boundingBox!==null&&ss.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,ss)))}_computeIntersections(e,t,i){let s;const r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,d=r.attributes.normal,f=r.groups,p=r.drawRange;if(a!==null)if(Array.isArray(o))for(let m=0,_=f.length;m<_;m++){const x=f[m],h=o[x.materialIndex],w=Math.max(x.start,p.start),R=Math.min(a.count,Math.min(x.start+x.count,p.start+p.count));for(let A=w,E=R;A<E;A+=3){const v=a.getX(A),C=a.getX(A+1),L=a.getX(A+2);s=qr(this,h,e,i,l,u,d,v,C,L),s&&(s.faceIndex=Math.floor(A/3),s.face.materialIndex=x.materialIndex,t.push(s))}}else{const m=Math.max(0,p.start),_=Math.min(a.count,p.start+p.count);for(let x=m,h=_;x<h;x+=3){const w=a.getX(x),R=a.getX(x+1),A=a.getX(x+2);s=qr(this,o,e,i,l,u,d,w,R,A),s&&(s.faceIndex=Math.floor(x/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let m=0,_=f.length;m<_;m++){const x=f[m],h=o[x.materialIndex],w=Math.max(x.start,p.start),R=Math.min(c.count,Math.min(x.start+x.count,p.start+p.count));for(let A=w,E=R;A<E;A+=3){const v=A,C=A+1,L=A+2;s=qr(this,h,e,i,l,u,d,v,C,L),s&&(s.faceIndex=Math.floor(A/3),s.face.materialIndex=x.materialIndex,t.push(s))}}else{const m=Math.max(0,p.start),_=Math.min(c.count,p.start+p.count);for(let x=m,h=_;x<h;x+=3){const w=x,R=x+1,A=x+2;s=qr(this,o,e,i,l,u,d,w,R,A),s&&(s.faceIndex=Math.floor(x/3),t.push(s))}}}}function Yf(n,e,t,i,s,r,o,a){let c;if(e.side===wn?c=i.intersectTriangle(o,r,s,!0,a):c=i.intersectTriangle(s,r,o,e.side===Zi,a),c===null)return null;$r.copy(a),$r.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo($r);return l<t.near||l>t.far?null:{distance:l,point:$r.clone(),object:n}}function qr(n,e,t,i,s,r,o,a,c,l){n.getVertexPosition(a,Vr),n.getVertexPosition(c,Gr),n.getVertexPosition(l,Hr);const u=Yf(n,e,t,i,Vr,Gr,Hr,bl);if(u){const d=new B;Kn.getBarycoord(bl,Vr,Gr,Hr,d),s&&(u.uv=Kn.getInterpolatedAttribute(s,a,c,l,d,new st)),r&&(u.uv1=Kn.getInterpolatedAttribute(r,a,c,l,d,new st)),o&&(u.normal=Kn.getInterpolatedAttribute(o,a,c,l,d,new B),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const f={a,b:c,c:l,normal:new B,materialIndex:0};Kn.getNormal(Vr,Gr,Hr,f.normal),u.face=f,u.barycoord=d}return u}class _s extends jt{constructor(e=1,t=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const c=[],l=[],u=[],d=[];let f=0,p=0;m("z","y","x",-1,-1,i,t,e,o,r,0),m("z","y","x",1,-1,i,t,-e,o,r,1),m("x","z","y",1,1,e,i,t,s,o,2),m("x","z","y",1,-1,e,i,-t,s,o,3),m("x","y","z",1,-1,e,t,i,s,r,4),m("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(c),this.setAttribute("position",new At(l,3)),this.setAttribute("normal",new At(u,3)),this.setAttribute("uv",new At(d,2));function m(_,x,h,w,R,A,E,v,C,L,g){const b=A/C,P=E/L,N=A/2,I=E/2,H=v/2,X=C+1,Z=L+1;let re=0,K=0;const ie=new B;for(let te=0;te<Z;te++){const pe=te*P-I;for(let Pe=0;Pe<X;Pe++){const ze=Pe*b-N;ie[_]=ze*w,ie[x]=pe*R,ie[h]=H,l.push(ie.x,ie.y,ie.z),ie[_]=0,ie[x]=0,ie[h]=v>0?1:-1,u.push(ie.x,ie.y,ie.z),d.push(Pe/C),d.push(1-te/L),re+=1}}for(let te=0;te<L;te++)for(let pe=0;pe<C;pe++){const Pe=f+pe+X*te,ze=f+pe+X*(te+1),He=f+(pe+1)+X*(te+1),ut=f+(pe+1)+X*te;c.push(Pe,ze,ut),c.push(ze,He,ut),K+=6}a.addGroup(p,K,g),p+=K,f+=re}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new _s(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Xs(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const s=n[t][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(Ke("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone():Array.isArray(s)?e[t][i]=s.slice():e[t][i]=s}}return e}function xn(n){const e={};for(let t=0;t<n.length;t++){const i=Xs(n[t]);for(const s in i)e[s]=i[s]}return e}function Kf(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function ku(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:pt.workingColorSpace}const Zf={clone:Xs,merge:xn};var Jf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Qf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ci extends gs{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Jf,this.fragmentShader=Qf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Xs(e.uniforms),this.uniformsGroups=Kf(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class Vu extends Bt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new vt,this.projectionMatrix=new vt,this.projectionMatrixInverse=new vt,this.coordinateSystem=li,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Bi=new B,yl=new st,Ml=new st;class Sn extends Vu{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=pa*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Na*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return pa*2*Math.atan(Math.tan(Na*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Bi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Bi.x,Bi.y).multiplyScalar(-e/Bi.z),Bi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Bi.x,Bi.y).multiplyScalar(-e/Bi.z)}getViewSize(e,t){return this.getViewBounds(e,yl,Ml),t.subVectors(Ml,yl)}setViewOffset(e,t,i,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Na*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,t-=o.offsetY*i/l,s*=o.width/c,i*=o.height/l}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Ds=-90,Is=1;class eh extends Bt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Sn(Ds,Is,e,t);s.layers=this.layers,this.add(s);const r=new Sn(Ds,Is,e,t);r.layers=this.layers,this.add(r);const o=new Sn(Ds,Is,e,t);o.layers=this.layers,this.add(o);const a=new Sn(Ds,Is,e,t);a.layers=this.layers,this.add(a);const c=new Sn(Ds,Is,e,t);c.layers=this.layers,this.add(c);const l=new Sn(Ds,Is,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,s,r,o,a,c]=t;for(const l of t)this.remove(l);if(e===li)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===fa)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,c,l,u]=this.children,d=e.getRenderTarget(),f=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,s),e.render(t,r),e.setRenderTarget(i,1,s),e.render(t,o),e.setRenderTarget(i,2,s),e.render(t,a),e.setRenderTarget(i,3,s),e.render(t,c),e.setRenderTarget(i,4,s),e.render(t,l),i.texture.generateMipmaps=_,e.setRenderTarget(i,5,s),e.render(t,u),e.setRenderTarget(d,f,p),e.xr.enabled=m,i.texture.needsPMREMUpdate=!0}}class Gu extends hn{constructor(e=[],t=Ws,i,s,r,o,a,c,l,u){super(e,t,i,s,r,o,a,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class th extends hs{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new Gu(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new _s(5,5,5),r=new Ci({name:"CubemapFromEquirect",uniforms:Xs(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:wn,blending:wi});r.uniforms.tEquirect.value=t;const o=new _n(s,r),a=t.minFilter;return t.minFilter===us&&(t.minFilter=Hn),new eh(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,i=!0,s=!0){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,s);e.setRenderTarget(r)}}class xt extends Bt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const nh={type:"move"};class so{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new xt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new xt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new B,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new B),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new xt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new B,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new B),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(const _ of e.hand.values()){const x=t.getJointPose(_,i),h=this._getHandJoint(l,_);x!==null&&(h.matrix.fromArray(x.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,h.jointRadius=x.radius),h.visible=x!==null}const u=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],f=u.position.distanceTo(d.position),p=.02,m=.005;l.inputState.pinching&&f>p+m?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&f<=p-m&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(nh)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new xt;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class Pc{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new at(e),this.density=t}clone(){return new Pc(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class ih extends Bt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ei,this.environmentIntensity=1,this.environmentRotation=new ei,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Hu extends hn{constructor(e=null,t=1,i=1,s,r,o,a,c,l=On,u=On,d,f){super(null,o,a,c,l,u,s,r,d,f),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Sl extends Wn{constructor(e,t,i,s=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Us=new vt,El=new vt,Xr=[],Tl=new ms,sh=new vt,or=new _n,cr=new xs;class rh extends _n{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Sl(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,sh)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new ms),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Us),Tl.copy(e.boundingBox).applyMatrix4(Us),this.boundingBox.union(Tl)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new xs),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Us),cr.copy(e.boundingSphere).applyMatrix4(Us),this.boundingSphere.union(cr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const i=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=i.length+1,o=e*r+1;for(let a=0;a<i.length;a++)i[a]=s[o+a]}raycast(e,t){const i=this.matrixWorld,s=this.count;if(or.geometry=this.geometry,or.material=this.material,or.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),cr.copy(this.boundingSphere),cr.applyMatrix4(i),e.ray.intersectsSphere(cr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Us),El.multiplyMatrices(i,Us),or.matrixWorld=El,or.raycast(e,Xr);for(let o=0,a=Xr.length;o<a;o++){const c=Xr[o];c.instanceId=r,c.object=this,t.push(c)}Xr.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Sl(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const i=t.morphTargetInfluences,s=i.length+1;this.morphTexture===null&&(this.morphTexture=new Hu(new Float32Array(s*this.count),s,this.count,Sc,ci));const r=this.morphTexture.source.data.data;let o=0;for(let l=0;l<i.length;l++)o+=i[l];const a=this.geometry.morphTargetsRelative?1:1-o,c=s*e;r[c]=a,r.set(i,c+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const ro=new B,ah=new B,oh=new Ze;class Vi{constructor(e=new B(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const s=ro.subVectors(i,t).cross(ah.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(ro),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(i,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||oh.getNormalMatrix(e),s=this.coplanarPoint(ro).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const rs=new xs,ch=new st(.5,.5),jr=new B;class Lc{constructor(e=new Vi,t=new Vi,i=new Vi,s=new Vi,r=new Vi,o=new Vi){this.planes=[e,t,i,s,r,o]}set(e,t,i,s,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=li,i=!1){const s=this.planes,r=e.elements,o=r[0],a=r[1],c=r[2],l=r[3],u=r[4],d=r[5],f=r[6],p=r[7],m=r[8],_=r[9],x=r[10],h=r[11],w=r[12],R=r[13],A=r[14],E=r[15];if(s[0].setComponents(l-o,p-u,h-m,E-w).normalize(),s[1].setComponents(l+o,p+u,h+m,E+w).normalize(),s[2].setComponents(l+a,p+d,h+_,E+R).normalize(),s[3].setComponents(l-a,p-d,h-_,E-R).normalize(),i)s[4].setComponents(c,f,x,A).normalize(),s[5].setComponents(l-c,p-f,h-x,E-A).normalize();else if(s[4].setComponents(l-c,p-f,h-x,E-A).normalize(),t===li)s[5].setComponents(l+c,p+f,h+x,E+A).normalize();else if(t===fa)s[5].setComponents(c,f,x,A).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),rs.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),rs.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(rs)}intersectsSprite(e){rs.center.set(0,0,0);const t=ch.distanceTo(e.center);return rs.radius=.7071067811865476+t,rs.applyMatrix4(e.matrixWorld),this.intersectsSphere(rs)}intersectsSphere(e){const t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const s=t[i];if(jr.x=s.normal.x>0?e.max.x:e.min.x,jr.y=s.normal.y>0?e.max.y:e.min.y,jr.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(jr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Wu extends gs{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new at(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const ma=new B,xa=new B,wl=new vt,lr=new Ma,Yr=new xs,ao=new B,Al=new B;class lh extends Bt{constructor(e=new jt,t=new Wu){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let s=1,r=t.count;s<r;s++)ma.fromBufferAttribute(t,s-1),xa.fromBufferAttribute(t,s),i[s]=i[s-1],i[s]+=ma.distanceTo(xa);e.setAttribute("lineDistance",new At(i,1))}else Ke("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Yr.copy(i.boundingSphere),Yr.applyMatrix4(s),Yr.radius+=r,e.ray.intersectsSphere(Yr)===!1)return;wl.copy(s).invert(),lr.copy(e.ray).applyMatrix4(wl);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,u=i.index,f=i.attributes.position;if(u!==null){const p=Math.max(0,o.start),m=Math.min(u.count,o.start+o.count);for(let _=p,x=m-1;_<x;_+=l){const h=u.getX(_),w=u.getX(_+1),R=Kr(this,e,lr,c,h,w,_);R&&t.push(R)}if(this.isLineLoop){const _=u.getX(m-1),x=u.getX(p),h=Kr(this,e,lr,c,_,x,m-1);h&&t.push(h)}}else{const p=Math.max(0,o.start),m=Math.min(f.count,o.start+o.count);for(let _=p,x=m-1;_<x;_+=l){const h=Kr(this,e,lr,c,_,_+1,_);h&&t.push(h)}if(this.isLineLoop){const _=Kr(this,e,lr,c,m-1,p,m-1);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Kr(n,e,t,i,s,r,o){const a=n.geometry.attributes.position;if(ma.fromBufferAttribute(a,s),xa.fromBufferAttribute(a,r),t.distanceSqToSegment(ma,xa,ao,Al)>i)return;ao.applyMatrix4(n.matrixWorld);const l=e.ray.origin.distanceTo(ao);if(!(l<e.near||l>e.far))return{distance:l,point:Al.clone().applyMatrix4(n.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:n}}class $u extends gs{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new at(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Rl=new vt,uc=new Ma,Zr=new xs,Jr=new B;class uh extends Bt{constructor(e=new jt,t=new $u){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Zr.copy(i.boundingSphere),Zr.applyMatrix4(s),Zr.radius+=r,e.ray.intersectsSphere(Zr)===!1)return;Rl.copy(s).invert(),uc.copy(e.ray).applyMatrix4(Rl);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=i.index,d=i.attributes.position;if(l!==null){const f=Math.max(0,o.start),p=Math.min(l.count,o.start+o.count);for(let m=f,_=p;m<_;m++){const x=l.getX(m);Jr.fromBufferAttribute(d,x),Cl(Jr,x,c,s,e,t,this)}}else{const f=Math.max(0,o.start),p=Math.min(d.count,o.start+o.count);for(let m=f,_=p;m<_;m++)Jr.fromBufferAttribute(d,m),Cl(Jr,m,c,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Cl(n,e,t,i,s,r,o){const a=uc.distanceSqToPoint(n);if(a<t){const c=new B;uc.closestPointToPoint(n,c),c.applyMatrix4(i);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class oo extends hn{constructor(e,t,i,s,r,o,a,c,l){super(e,t,i,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class qu extends hn{constructor(e,t,i=fs,s,r,o,a=On,c=On,l,u=gr,d=1){if(u!==gr&&u!==_r)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:e,height:t,depth:d};super(f,s,r,o,a,c,u,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Rc(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Xu extends hn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Os extends jt{constructor(e=1,t=1,i=4,s=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:i,radialSegments:s,heightSegments:r},t=Math.max(0,t),i=Math.max(1,Math.floor(i)),s=Math.max(3,Math.floor(s)),r=Math.max(1,Math.floor(r));const o=[],a=[],c=[],l=[],u=t/2,d=Math.PI/2*e,f=t,p=2*d+f,m=i*2+r,_=s+1,x=new B,h=new B;for(let w=0;w<=m;w++){let R=0,A=0,E=0,v=0;if(w<=i){const g=w/i,b=g*Math.PI/2;A=-u-e*Math.cos(b),E=e*Math.sin(b),v=-e*Math.cos(b),R=g*d}else if(w<=i+r){const g=(w-i)/r;A=-u+g*t,E=e,v=0,R=d+g*f}else{const g=(w-i-r)/i,b=g*Math.PI/2;A=u+e*Math.sin(b),E=e*Math.cos(b),v=e*Math.sin(b),R=d+f+g*d}const C=Math.max(0,Math.min(1,R/p));let L=0;w===0?L=.5/s:w===m&&(L=-.5/s);for(let g=0;g<=s;g++){const b=g/s,P=b*Math.PI*2,N=Math.sin(P),I=Math.cos(P);h.x=-E*I,h.y=A,h.z=E*N,a.push(h.x,h.y,h.z),x.set(-E*I,v,E*N),x.normalize(),c.push(x.x,x.y,x.z),l.push(b+L,C)}if(w>0){const g=(w-1)*_;for(let b=0;b<s;b++){const P=g+b,N=g+b+1,I=w*_+b,H=w*_+b+1;o.push(P,N,I),o.push(N,H,I)}}}this.setIndex(o),this.setAttribute("position",new At(a,3)),this.setAttribute("normal",new At(c,3)),this.setAttribute("uv",new At(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Os(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}}class vi extends jt{constructor(e=1,t=1,i=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const u=[],d=[],f=[],p=[];let m=0;const _=[],x=i/2;let h=0;w(),o===!1&&(e>0&&R(!0),t>0&&R(!1)),this.setIndex(u),this.setAttribute("position",new At(d,3)),this.setAttribute("normal",new At(f,3)),this.setAttribute("uv",new At(p,2));function w(){const A=new B,E=new B;let v=0;const C=(t-e)/i;for(let L=0;L<=r;L++){const g=[],b=L/r,P=b*(t-e)+e;for(let N=0;N<=s;N++){const I=N/s,H=I*c+a,X=Math.sin(H),Z=Math.cos(H);E.x=P*X,E.y=-b*i+x,E.z=P*Z,d.push(E.x,E.y,E.z),A.set(X,C,Z).normalize(),f.push(A.x,A.y,A.z),p.push(I,1-b),g.push(m++)}_.push(g)}for(let L=0;L<s;L++)for(let g=0;g<r;g++){const b=_[g][L],P=_[g+1][L],N=_[g+1][L+1],I=_[g][L+1];(e>0||g!==0)&&(u.push(b,P,I),v+=3),(t>0||g!==r-1)&&(u.push(P,N,I),v+=3)}l.addGroup(h,v,0),h+=v}function R(A){const E=m,v=new st,C=new B;let L=0;const g=A===!0?e:t,b=A===!0?1:-1;for(let N=1;N<=s;N++)d.push(0,x*b,0),f.push(0,b,0),p.push(.5,.5),m++;const P=m;for(let N=0;N<=s;N++){const H=N/s*c+a,X=Math.cos(H),Z=Math.sin(H);C.x=g*Z,C.y=x*b,C.z=g*X,d.push(C.x,C.y,C.z),f.push(0,b,0),v.x=X*.5+.5,v.y=Z*.5*b+.5,p.push(v.x,v.y),m++}for(let N=0;N<s;N++){const I=E+N,H=P+N;A===!0?u.push(H,H+1,I):u.push(H+1,H,I),L+=3}l.addGroup(h,L,A===!0?1:2),h+=L}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new vi(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Dc extends vi{constructor(e=1,t=1,i=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,i,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new Dc(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Ic extends jt{constructor(e=[],t=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:s};const r=[],o=[];a(s),l(i),u(),this.setAttribute("position",new At(r,3)),this.setAttribute("normal",new At(r.slice(),3)),this.setAttribute("uv",new At(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(w){const R=new B,A=new B,E=new B;for(let v=0;v<t.length;v+=3)p(t[v+0],R),p(t[v+1],A),p(t[v+2],E),c(R,A,E,w)}function c(w,R,A,E){const v=E+1,C=[];for(let L=0;L<=v;L++){C[L]=[];const g=w.clone().lerp(A,L/v),b=R.clone().lerp(A,L/v),P=v-L;for(let N=0;N<=P;N++)N===0&&L===v?C[L][N]=g:C[L][N]=g.clone().lerp(b,N/P)}for(let L=0;L<v;L++)for(let g=0;g<2*(v-L)-1;g++){const b=Math.floor(g/2);g%2===0?(f(C[L][b+1]),f(C[L+1][b]),f(C[L][b])):(f(C[L][b+1]),f(C[L+1][b+1]),f(C[L+1][b]))}}function l(w){const R=new B;for(let A=0;A<r.length;A+=3)R.x=r[A+0],R.y=r[A+1],R.z=r[A+2],R.normalize().multiplyScalar(w),r[A+0]=R.x,r[A+1]=R.y,r[A+2]=R.z}function u(){const w=new B;for(let R=0;R<r.length;R+=3){w.x=r[R+0],w.y=r[R+1],w.z=r[R+2];const A=x(w)/2/Math.PI+.5,E=h(w)/Math.PI+.5;o.push(A,1-E)}m(),d()}function d(){for(let w=0;w<o.length;w+=6){const R=o[w+0],A=o[w+2],E=o[w+4],v=Math.max(R,A,E),C=Math.min(R,A,E);v>.9&&C<.1&&(R<.2&&(o[w+0]+=1),A<.2&&(o[w+2]+=1),E<.2&&(o[w+4]+=1))}}function f(w){r.push(w.x,w.y,w.z)}function p(w,R){const A=w*3;R.x=e[A+0],R.y=e[A+1],R.z=e[A+2]}function m(){const w=new B,R=new B,A=new B,E=new B,v=new st,C=new st,L=new st;for(let g=0,b=0;g<r.length;g+=9,b+=6){w.set(r[g+0],r[g+1],r[g+2]),R.set(r[g+3],r[g+4],r[g+5]),A.set(r[g+6],r[g+7],r[g+8]),v.set(o[b+0],o[b+1]),C.set(o[b+2],o[b+3]),L.set(o[b+4],o[b+5]),E.copy(w).add(R).add(A).divideScalar(3);const P=x(E);_(v,b+0,w,P),_(C,b+2,R,P),_(L,b+4,A,P)}}function _(w,R,A,E){E<0&&w.x===1&&(o[R]=w.x-1),A.x===0&&A.z===0&&(o[R]=E/2/Math.PI+.5)}function x(w){return Math.atan2(w.z,-w.x)}function h(w){return Math.atan2(-w.y,Math.sqrt(w.x*w.x+w.z*w.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ic(e.vertices,e.indices,e.radius,e.details)}}class Uc extends Ic{constructor(e=1,t=0){const i=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(i,s,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Uc(e.radius,e.detail)}}class js extends jt{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};const r=e/2,o=t/2,a=Math.floor(i),c=Math.floor(s),l=a+1,u=c+1,d=e/a,f=t/c,p=[],m=[],_=[],x=[];for(let h=0;h<u;h++){const w=h*f-o;for(let R=0;R<l;R++){const A=R*d-r;m.push(A,-w,0),_.push(0,0,1),x.push(R/a),x.push(1-h/c)}}for(let h=0;h<c;h++)for(let w=0;w<a;w++){const R=w+l*h,A=w+l*(h+1),E=w+1+l*(h+1),v=w+1+l*h;p.push(R,A,v),p.push(A,E,v)}this.setIndex(p),this.setAttribute("position",new At(m,3)),this.setAttribute("normal",new At(_,3)),this.setAttribute("uv",new At(x,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new js(e.width,e.height,e.widthSegments,e.heightSegments)}}class Yn extends jt{constructor(e=.5,t=1,i=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:s,thetaStart:r,thetaLength:o},i=Math.max(3,i),s=Math.max(1,s);const a=[],c=[],l=[],u=[];let d=e;const f=(t-e)/s,p=new B,m=new st;for(let _=0;_<=s;_++){for(let x=0;x<=i;x++){const h=r+x/i*o;p.x=d*Math.cos(h),p.y=d*Math.sin(h),c.push(p.x,p.y,p.z),l.push(0,0,1),m.x=(p.x/t+1)/2,m.y=(p.y/t+1)/2,u.push(m.x,m.y)}d+=f}for(let _=0;_<s;_++){const x=_*(i+1);for(let h=0;h<i;h++){const w=h+x,R=w,A=w+i+1,E=w+i+2,v=w+1;a.push(R,A,v),a.push(A,E,v)}}this.setIndex(a),this.setAttribute("position",new At(c,3)),this.setAttribute("normal",new At(l,3)),this.setAttribute("uv",new At(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Yn(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class ga extends jt{constructor(e=1,t=32,i=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const c=Math.min(o+a,Math.PI);let l=0;const u=[],d=new B,f=new B,p=[],m=[],_=[],x=[];for(let h=0;h<=i;h++){const w=[],R=h/i;let A=0;h===0&&o===0?A=.5/t:h===i&&c===Math.PI&&(A=-.5/t);for(let E=0;E<=t;E++){const v=E/t;d.x=-e*Math.cos(s+v*r)*Math.sin(o+R*a),d.y=e*Math.cos(o+R*a),d.z=e*Math.sin(s+v*r)*Math.sin(o+R*a),m.push(d.x,d.y,d.z),f.copy(d).normalize(),_.push(f.x,f.y,f.z),x.push(v+A,1-R),w.push(l++)}u.push(w)}for(let h=0;h<i;h++)for(let w=0;w<t;w++){const R=u[h][w+1],A=u[h][w],E=u[h+1][w],v=u[h+1][w+1];(h!==0||o>0)&&p.push(R,A,v),(h!==i-1||c<Math.PI)&&p.push(A,E,v)}this.setIndex(p),this.setAttribute("position",new At(m,3)),this.setAttribute("normal",new At(_,3)),this.setAttribute("uv",new At(x,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ga(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class ds extends jt{constructor(e=1,t=.4,i=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:s,arc:r},i=Math.floor(i),s=Math.floor(s);const o=[],a=[],c=[],l=[],u=new B,d=new B,f=new B;for(let p=0;p<=i;p++)for(let m=0;m<=s;m++){const _=m/s*r,x=p/i*Math.PI*2;d.x=(e+t*Math.cos(x))*Math.cos(_),d.y=(e+t*Math.cos(x))*Math.sin(_),d.z=t*Math.sin(x),a.push(d.x,d.y,d.z),u.x=e*Math.cos(_),u.y=e*Math.sin(_),f.subVectors(d,u).normalize(),c.push(f.x,f.y,f.z),l.push(m/s),l.push(p/i)}for(let p=1;p<=i;p++)for(let m=1;m<=s;m++){const _=(s+1)*p+m-1,x=(s+1)*(p-1)+m-1,h=(s+1)*(p-1)+m,w=(s+1)*p+m;o.push(_,x,w),o.push(x,h,w)}this.setIndex(o),this.setAttribute("position",new At(a,3)),this.setAttribute("normal",new At(c,3)),this.setAttribute("uv",new At(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ds(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class ki extends gs{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new at(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new at(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Iu,this.normalScale=new st(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ei,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class dh extends gs{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=bf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class fh extends gs{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Sa extends Bt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new at(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class hh extends Sa{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Bt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new at(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const co=new vt,Pl=new B,Ll=new B;class Fc{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new st(512,512),this.mapType=ui,this.map=null,this.mapPass=null,this.matrix=new vt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Lc,this._frameExtents=new st(1,1),this._viewportCount=1,this._viewports=[new St(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;Pl.setFromMatrixPosition(e.matrixWorld),t.position.copy(Pl),Ll.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Ll),t.updateMatrixWorld(),co.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(co,t.coordinateSystem,t.reversedDepth),t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(co)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class ph extends Fc{constructor(){super(new Sn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,i=pa*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(i!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=i,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class mh extends Sa{constructor(e,t,i=0,s=Math.PI/3,r=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Bt.DEFAULT_UP),this.updateMatrix(),this.target=new Bt,this.distance=i,this.angle=s,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new ph}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const Dl=new vt,ur=new B,lo=new B;class xh extends Fc{constructor(){super(new Sn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new st(4,2),this._viewportCount=6,this._viewports=[new St(2,1,1,1),new St(0,1,1,1),new St(3,1,1,1),new St(1,1,1,1),new St(3,0,1,1),new St(1,0,1,1)],this._cubeDirections=[new B(1,0,0),new B(-1,0,0),new B(0,0,1),new B(0,0,-1),new B(0,1,0),new B(0,-1,0)],this._cubeUps=[new B(0,1,0),new B(0,1,0),new B(0,1,0),new B(0,1,0),new B(0,0,1),new B(0,0,-1)]}updateMatrices(e,t=0){const i=this.camera,s=this.matrix,r=e.distance||i.far;r!==i.far&&(i.far=r,i.updateProjectionMatrix()),ur.setFromMatrixPosition(e.matrixWorld),i.position.copy(ur),lo.copy(i.position),lo.add(this._cubeDirections[t]),i.up.copy(this._cubeUps[t]),i.lookAt(lo),i.updateMatrixWorld(),s.makeTranslation(-ur.x,-ur.y,-ur.z),Dl.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Dl,i.coordinateSystem,i.reversedDepth)}}class uo extends Sa{constructor(e,t,i=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new xh}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class ju extends Vu{constructor(e=-1,t=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-e,o=i+e,a=s+t,c=s-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class gh extends Fc{constructor(){super(new ju(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Il extends Sa{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Bt.DEFAULT_UP),this.updateMatrix(),this.target=new Bt,this.shadow=new gh}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class _h extends Sn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const Ul=new vt;class vh{constructor(e,t,i=0,s=1/0){this.ray=new Ma(e,t),this.near=i,this.far=s,this.camera=null,this.layers=new Cc,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Ot("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Ul.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Ul),this}intersectObject(e,t=!0,i=[]){return dc(e,this,i,t),i.sort(Fl),i}intersectObjects(e,t=!0,i=[]){for(let s=0,r=e.length;s<r;s++)dc(e[s],this,i,t);return i.sort(Fl),i}}function Fl(n,e){return n.distance-e.distance}function dc(n,e,t,i){let s=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(s=!1),s===!0&&i===!0){const r=n.children;for(let o=0,a=r.length;o<a;o++)dc(r[o],e,t,!0)}}function Nl(n,e,t,i){const s=bh(i);switch(t){case Lu:return n*e;case Sc:return n*e/s.components*s.byteLength;case Ec:return n*e/s.components*s.byteLength;case Tc:return n*e*2/s.components*s.byteLength;case wc:return n*e*2/s.components*s.byteLength;case Du:return n*e*3/s.components*s.byteLength;case Zn:return n*e*4/s.components*s.byteLength;case Ac:return n*e*4/s.components*s.byteLength;case ta:case na:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case ia:case sa:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Oo:case Bo:return Math.max(n,16)*Math.max(e,8)/4;case No:case zo:return Math.max(n,8)*Math.max(e,8)/2;case ko:case Vo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Go:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Ho:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Wo:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case $o:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case qo:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Xo:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case jo:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Yo:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Ko:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Zo:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Jo:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Qo:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case ec:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case tc:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case nc:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case ic:case sc:case rc:return Math.ceil(n/4)*Math.ceil(e/4)*16;case ac:case oc:return Math.ceil(n/4)*Math.ceil(e/4)*8;case cc:case lc:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function bh(n){switch(n){case ui:case Au:return{byteLength:1,components:1};case mr:case Ru:case Ks:return{byteLength:2,components:1};case yc:case Mc:return{byteLength:2,components:4};case fs:case bc:case ci:return{byteLength:4,components:1};case Cu:case Pu:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:vc}}));typeof window<"u"&&(window.__THREE__?Ke("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=vc);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Yu(){let n=null,e=!1,t=null,i=null;function s(r,o){t(r,o),i=n.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function yh(n){const e=new WeakMap;function t(a,c){const l=a.array,u=a.usage,d=l.byteLength,f=n.createBuffer();n.bindBuffer(c,f),n.bufferData(c,l,u),a.onUploadCallback();let p;if(l instanceof Float32Array)p=n.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)p=n.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=n.SHORT;else if(l instanceof Uint32Array)p=n.UNSIGNED_INT;else if(l instanceof Int32Array)p=n.INT;else if(l instanceof Int8Array)p=n.BYTE;else if(l instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:d}}function i(a,c,l){const u=c.array,d=c.updateRanges;if(n.bindBuffer(l,a),d.length===0)n.bufferSubData(l,0,u);else{d.sort((p,m)=>p.start-m.start);let f=0;for(let p=1;p<d.length;p++){const m=d[f],_=d[p];_.start<=m.start+m.count+1?m.count=Math.max(m.count,_.start+_.count-m.start):(++f,d[f]=_)}d.length=f+1;for(let p=0,m=d.length;p<m;p++){const _=d[p];n.bufferSubData(l,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=e.get(a);c&&(n.deleteBuffer(c.buffer),e.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=e.get(a);if(l===void 0)e.set(a,t(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var Mh=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Sh=`#ifdef USE_ALPHAHASH
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
#endif`,Eh=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Th=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,wh=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Ah=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Rh=`#ifdef USE_AOMAP
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
#endif`,Ch=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Ph=`#ifdef USE_BATCHING
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
#endif`,Lh=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Dh=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Ih=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Uh=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Fh=`#ifdef USE_IRIDESCENCE
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
#endif`,Nh=`#ifdef USE_BUMPMAP
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
#endif`,Oh=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,zh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Bh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,kh=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Vh=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Gh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Hh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Wh=`#if defined( USE_COLOR_ALPHA )
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
#endif`,$h=`#define PI 3.141592653589793
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
} // validated`,qh=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Xh=`vec3 transformedNormal = objectNormal;
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
#endif`,jh=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Yh=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Kh=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Zh=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Jh="gl_FragColor = linearToOutputTexel( gl_FragColor );",Qh=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,ep=`#ifdef USE_ENVMAP
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
#endif`,tp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,np=`#ifdef USE_ENVMAP
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
#endif`,ip=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,sp=`#ifdef USE_ENVMAP
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
#endif`,rp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ap=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,op=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,cp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,lp=`#ifdef USE_GRADIENTMAP
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
}`,up=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,dp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,fp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,hp=`uniform bool receiveShadow;
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
#endif`,pp=`#ifdef USE_ENVMAP
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
#endif`,mp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,xp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,gp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,_p=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,vp=`PhysicalMaterial material;
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
#endif`,bp=`uniform sampler2D dfgLUT;
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
}`,yp=`
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
#endif`,Mp=`#if defined( RE_IndirectDiffuse )
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
#endif`,Sp=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Ep=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Tp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,wp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ap=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Rp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Cp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Pp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Lp=`#if defined( USE_POINTS_UV )
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
#endif`,Dp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Ip=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Up=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Fp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Np=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Op=`#ifdef USE_MORPHTARGETS
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
#endif`,zp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Bp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,kp=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Vp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Gp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Hp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Wp=`#ifdef USE_NORMALMAP
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
#endif`,$p=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,qp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Xp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,jp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Yp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Kp=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Zp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Jp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Qp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,e0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,t0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,n0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,i0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,s0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,r0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,a0=`float getShadowMask() {
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
}`,o0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,c0=`#ifdef USE_SKINNING
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
#endif`,l0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,u0=`#ifdef USE_SKINNING
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
#endif`,d0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,f0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,h0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,p0=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,m0=`#ifdef USE_TRANSMISSION
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
#endif`,x0=`#ifdef USE_TRANSMISSION
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
#endif`,g0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,_0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,v0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,b0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const y0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,M0=`uniform sampler2D t2D;
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
}`,S0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,E0=`#ifdef ENVMAP_TYPE_CUBE
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
}`,T0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,w0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,A0=`#include <common>
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
}`,R0=`#if DEPTH_PACKING == 3200
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
}`,C0=`#define DISTANCE
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
}`,P0=`#define DISTANCE
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
}`,L0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,D0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,I0=`uniform float scale;
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
}`,U0=`uniform vec3 diffuse;
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
}`,F0=`#include <common>
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
}`,N0=`uniform vec3 diffuse;
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
}`,O0=`#define LAMBERT
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
}`,z0=`#define LAMBERT
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
}`,B0=`#define MATCAP
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
}`,k0=`#define MATCAP
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
}`,V0=`#define NORMAL
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
}`,G0=`#define NORMAL
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
}`,H0=`#define PHONG
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
}`,W0=`#define PHONG
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
}`,$0=`#define STANDARD
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
}`,q0=`#define STANDARD
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
}`,X0=`#define TOON
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
}`,j0=`#define TOON
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
}`,Y0=`uniform float size;
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
}`,K0=`uniform vec3 diffuse;
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
}`,Z0=`#include <common>
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
}`,J0=`uniform vec3 color;
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
}`,Q0=`uniform float rotation;
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
}`,em=`uniform vec3 diffuse;
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
}`,Je={alphahash_fragment:Mh,alphahash_pars_fragment:Sh,alphamap_fragment:Eh,alphamap_pars_fragment:Th,alphatest_fragment:wh,alphatest_pars_fragment:Ah,aomap_fragment:Rh,aomap_pars_fragment:Ch,batching_pars_vertex:Ph,batching_vertex:Lh,begin_vertex:Dh,beginnormal_vertex:Ih,bsdfs:Uh,iridescence_fragment:Fh,bumpmap_pars_fragment:Nh,clipping_planes_fragment:Oh,clipping_planes_pars_fragment:zh,clipping_planes_pars_vertex:Bh,clipping_planes_vertex:kh,color_fragment:Vh,color_pars_fragment:Gh,color_pars_vertex:Hh,color_vertex:Wh,common:$h,cube_uv_reflection_fragment:qh,defaultnormal_vertex:Xh,displacementmap_pars_vertex:jh,displacementmap_vertex:Yh,emissivemap_fragment:Kh,emissivemap_pars_fragment:Zh,colorspace_fragment:Jh,colorspace_pars_fragment:Qh,envmap_fragment:ep,envmap_common_pars_fragment:tp,envmap_pars_fragment:np,envmap_pars_vertex:ip,envmap_physical_pars_fragment:pp,envmap_vertex:sp,fog_vertex:rp,fog_pars_vertex:ap,fog_fragment:op,fog_pars_fragment:cp,gradientmap_pars_fragment:lp,lightmap_pars_fragment:up,lights_lambert_fragment:dp,lights_lambert_pars_fragment:fp,lights_pars_begin:hp,lights_toon_fragment:mp,lights_toon_pars_fragment:xp,lights_phong_fragment:gp,lights_phong_pars_fragment:_p,lights_physical_fragment:vp,lights_physical_pars_fragment:bp,lights_fragment_begin:yp,lights_fragment_maps:Mp,lights_fragment_end:Sp,logdepthbuf_fragment:Ep,logdepthbuf_pars_fragment:Tp,logdepthbuf_pars_vertex:wp,logdepthbuf_vertex:Ap,map_fragment:Rp,map_pars_fragment:Cp,map_particle_fragment:Pp,map_particle_pars_fragment:Lp,metalnessmap_fragment:Dp,metalnessmap_pars_fragment:Ip,morphinstance_vertex:Up,morphcolor_vertex:Fp,morphnormal_vertex:Np,morphtarget_pars_vertex:Op,morphtarget_vertex:zp,normal_fragment_begin:Bp,normal_fragment_maps:kp,normal_pars_fragment:Vp,normal_pars_vertex:Gp,normal_vertex:Hp,normalmap_pars_fragment:Wp,clearcoat_normal_fragment_begin:$p,clearcoat_normal_fragment_maps:qp,clearcoat_pars_fragment:Xp,iridescence_pars_fragment:jp,opaque_fragment:Yp,packing:Kp,premultiplied_alpha_fragment:Zp,project_vertex:Jp,dithering_fragment:Qp,dithering_pars_fragment:e0,roughnessmap_fragment:t0,roughnessmap_pars_fragment:n0,shadowmap_pars_fragment:i0,shadowmap_pars_vertex:s0,shadowmap_vertex:r0,shadowmask_pars_fragment:a0,skinbase_vertex:o0,skinning_pars_vertex:c0,skinning_vertex:l0,skinnormal_vertex:u0,specularmap_fragment:d0,specularmap_pars_fragment:f0,tonemapping_fragment:h0,tonemapping_pars_fragment:p0,transmission_fragment:m0,transmission_pars_fragment:x0,uv_pars_fragment:g0,uv_pars_vertex:_0,uv_vertex:v0,worldpos_vertex:b0,background_vert:y0,background_frag:M0,backgroundCube_vert:S0,backgroundCube_frag:E0,cube_vert:T0,cube_frag:w0,depth_vert:A0,depth_frag:R0,distanceRGBA_vert:C0,distanceRGBA_frag:P0,equirect_vert:L0,equirect_frag:D0,linedashed_vert:I0,linedashed_frag:U0,meshbasic_vert:F0,meshbasic_frag:N0,meshlambert_vert:O0,meshlambert_frag:z0,meshmatcap_vert:B0,meshmatcap_frag:k0,meshnormal_vert:V0,meshnormal_frag:G0,meshphong_vert:H0,meshphong_frag:W0,meshphysical_vert:$0,meshphysical_frag:q0,meshtoon_vert:X0,meshtoon_frag:j0,points_vert:Y0,points_frag:K0,shadow_vert:Z0,shadow_frag:J0,sprite_vert:Q0,sprite_frag:em},be={common:{diffuse:{value:new at(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ze},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ze}},envmap:{envMap:{value:null},envMapRotation:{value:new Ze},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ze}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ze}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ze},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ze},normalScale:{value:new st(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ze},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ze}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ze}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ze}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new at(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new at(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0},uvTransform:{value:new Ze}},sprite:{diffuse:{value:new at(16777215)},opacity:{value:1},center:{value:new st(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ze},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0}}},oi={basic:{uniforms:xn([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.fog]),vertexShader:Je.meshbasic_vert,fragmentShader:Je.meshbasic_frag},lambert:{uniforms:xn([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.fog,be.lights,{emissive:{value:new at(0)}}]),vertexShader:Je.meshlambert_vert,fragmentShader:Je.meshlambert_frag},phong:{uniforms:xn([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.fog,be.lights,{emissive:{value:new at(0)},specular:{value:new at(1118481)},shininess:{value:30}}]),vertexShader:Je.meshphong_vert,fragmentShader:Je.meshphong_frag},standard:{uniforms:xn([be.common,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.roughnessmap,be.metalnessmap,be.fog,be.lights,{emissive:{value:new at(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Je.meshphysical_vert,fragmentShader:Je.meshphysical_frag},toon:{uniforms:xn([be.common,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.gradientmap,be.fog,be.lights,{emissive:{value:new at(0)}}]),vertexShader:Je.meshtoon_vert,fragmentShader:Je.meshtoon_frag},matcap:{uniforms:xn([be.common,be.bumpmap,be.normalmap,be.displacementmap,be.fog,{matcap:{value:null}}]),vertexShader:Je.meshmatcap_vert,fragmentShader:Je.meshmatcap_frag},points:{uniforms:xn([be.points,be.fog]),vertexShader:Je.points_vert,fragmentShader:Je.points_frag},dashed:{uniforms:xn([be.common,be.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Je.linedashed_vert,fragmentShader:Je.linedashed_frag},depth:{uniforms:xn([be.common,be.displacementmap]),vertexShader:Je.depth_vert,fragmentShader:Je.depth_frag},normal:{uniforms:xn([be.common,be.bumpmap,be.normalmap,be.displacementmap,{opacity:{value:1}}]),vertexShader:Je.meshnormal_vert,fragmentShader:Je.meshnormal_frag},sprite:{uniforms:xn([be.sprite,be.fog]),vertexShader:Je.sprite_vert,fragmentShader:Je.sprite_frag},background:{uniforms:{uvTransform:{value:new Ze},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Je.background_vert,fragmentShader:Je.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ze}},vertexShader:Je.backgroundCube_vert,fragmentShader:Je.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Je.cube_vert,fragmentShader:Je.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Je.equirect_vert,fragmentShader:Je.equirect_frag},distanceRGBA:{uniforms:xn([be.common,be.displacementmap,{referencePosition:{value:new B},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Je.distanceRGBA_vert,fragmentShader:Je.distanceRGBA_frag},shadow:{uniforms:xn([be.lights,be.fog,{color:{value:new at(0)},opacity:{value:1}}]),vertexShader:Je.shadow_vert,fragmentShader:Je.shadow_frag}};oi.physical={uniforms:xn([oi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ze},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ze},clearcoatNormalScale:{value:new st(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ze},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ze},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ze},sheen:{value:0},sheenColor:{value:new at(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ze},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ze},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ze},transmissionSamplerSize:{value:new st},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ze},attenuationDistance:{value:0},attenuationColor:{value:new at(0)},specularColor:{value:new at(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ze},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ze},anisotropyVector:{value:new st},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ze}}]),vertexShader:Je.meshphysical_vert,fragmentShader:Je.meshphysical_frag};const Qr={r:0,b:0,g:0},as=new ei,tm=new vt;function nm(n,e,t,i,s,r,o){const a=new at(0);let c=r===!0?0:1,l,u,d=null,f=0,p=null;function m(R){let A=R.isScene===!0?R.background:null;return A&&A.isTexture&&(A=(R.backgroundBlurriness>0?t:e).get(A)),A}function _(R){let A=!1;const E=m(R);E===null?h(a,c):E&&E.isColor&&(h(E,1),A=!0);const v=n.xr.getEnvironmentBlendMode();v==="additive"?i.buffers.color.setClear(0,0,0,1,o):v==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||A)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function x(R,A){const E=m(A);E&&(E.isCubeTexture||E.mapping===ya)?(u===void 0&&(u=new _n(new _s(1,1,1),new Ci({name:"BackgroundCubeMaterial",uniforms:Xs(oi.backgroundCube.uniforms),vertexShader:oi.backgroundCube.vertexShader,fragmentShader:oi.backgroundCube.fragmentShader,side:wn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(v,C,L){this.matrixWorld.copyPosition(L.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),as.copy(A.backgroundRotation),as.x*=-1,as.y*=-1,as.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(as.y*=-1,as.z*=-1),u.material.uniforms.envMap.value=E,u.material.uniforms.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=A.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(tm.makeRotationFromEuler(as)),u.material.toneMapped=pt.getTransfer(E.colorSpace)!==Mt,(d!==E||f!==E.version||p!==n.toneMapping)&&(u.material.needsUpdate=!0,d=E,f=E.version,p=n.toneMapping),u.layers.enableAll(),R.unshift(u,u.geometry,u.material,0,0,null)):E&&E.isTexture&&(l===void 0&&(l=new _n(new js(2,2),new Ci({name:"BackgroundMaterial",uniforms:Xs(oi.background.uniforms),vertexShader:oi.background.vertexShader,fragmentShader:oi.background.fragmentShader,side:Zi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=E,l.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,l.material.toneMapped=pt.getTransfer(E.colorSpace)!==Mt,E.matrixAutoUpdate===!0&&E.updateMatrix(),l.material.uniforms.uvTransform.value.copy(E.matrix),(d!==E||f!==E.version||p!==n.toneMapping)&&(l.material.needsUpdate=!0,d=E,f=E.version,p=n.toneMapping),l.layers.enableAll(),R.unshift(l,l.geometry,l.material,0,0,null))}function h(R,A){R.getRGB(Qr,ku(n)),i.buffers.color.setClear(Qr.r,Qr.g,Qr.b,A,o)}function w(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(R,A=1){a.set(R),c=A,h(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(R){c=R,h(a,c)},render:_,addToRenderList:x,dispose:w}}function im(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=f(null);let r=s,o=!1;function a(b,P,N,I,H){let X=!1;const Z=d(I,N,P);r!==Z&&(r=Z,l(r.object)),X=p(b,I,N,H),X&&m(b,I,N,H),H!==null&&e.update(H,n.ELEMENT_ARRAY_BUFFER),(X||o)&&(o=!1,A(b,P,N,I),H!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(H).buffer))}function c(){return n.createVertexArray()}function l(b){return n.bindVertexArray(b)}function u(b){return n.deleteVertexArray(b)}function d(b,P,N){const I=N.wireframe===!0;let H=i[b.id];H===void 0&&(H={},i[b.id]=H);let X=H[P.id];X===void 0&&(X={},H[P.id]=X);let Z=X[I];return Z===void 0&&(Z=f(c()),X[I]=Z),Z}function f(b){const P=[],N=[],I=[];for(let H=0;H<t;H++)P[H]=0,N[H]=0,I[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:N,attributeDivisors:I,object:b,attributes:{},index:null}}function p(b,P,N,I){const H=r.attributes,X=P.attributes;let Z=0;const re=N.getAttributes();for(const K in re)if(re[K].location>=0){const te=H[K];let pe=X[K];if(pe===void 0&&(K==="instanceMatrix"&&b.instanceMatrix&&(pe=b.instanceMatrix),K==="instanceColor"&&b.instanceColor&&(pe=b.instanceColor)),te===void 0||te.attribute!==pe||pe&&te.data!==pe.data)return!0;Z++}return r.attributesNum!==Z||r.index!==I}function m(b,P,N,I){const H={},X=P.attributes;let Z=0;const re=N.getAttributes();for(const K in re)if(re[K].location>=0){let te=X[K];te===void 0&&(K==="instanceMatrix"&&b.instanceMatrix&&(te=b.instanceMatrix),K==="instanceColor"&&b.instanceColor&&(te=b.instanceColor));const pe={};pe.attribute=te,te&&te.data&&(pe.data=te.data),H[K]=pe,Z++}r.attributes=H,r.attributesNum=Z,r.index=I}function _(){const b=r.newAttributes;for(let P=0,N=b.length;P<N;P++)b[P]=0}function x(b){h(b,0)}function h(b,P){const N=r.newAttributes,I=r.enabledAttributes,H=r.attributeDivisors;N[b]=1,I[b]===0&&(n.enableVertexAttribArray(b),I[b]=1),H[b]!==P&&(n.vertexAttribDivisor(b,P),H[b]=P)}function w(){const b=r.newAttributes,P=r.enabledAttributes;for(let N=0,I=P.length;N<I;N++)P[N]!==b[N]&&(n.disableVertexAttribArray(N),P[N]=0)}function R(b,P,N,I,H,X,Z){Z===!0?n.vertexAttribIPointer(b,P,N,H,X):n.vertexAttribPointer(b,P,N,I,H,X)}function A(b,P,N,I){_();const H=I.attributes,X=N.getAttributes(),Z=P.defaultAttributeValues;for(const re in X){const K=X[re];if(K.location>=0){let ie=H[re];if(ie===void 0&&(re==="instanceMatrix"&&b.instanceMatrix&&(ie=b.instanceMatrix),re==="instanceColor"&&b.instanceColor&&(ie=b.instanceColor)),ie!==void 0){const te=ie.normalized,pe=ie.itemSize,Pe=e.get(ie);if(Pe===void 0)continue;const ze=Pe.buffer,He=Pe.type,ut=Pe.bytesPerElement,ne=He===n.INT||He===n.UNSIGNED_INT||ie.gpuType===bc;if(ie.isInterleavedBufferAttribute){const ce=ie.data,Ae=ce.stride,Ye=ie.offset;if(ce.isInstancedInterleavedBuffer){for(let Ue=0;Ue<K.locationSize;Ue++)h(K.location+Ue,ce.meshPerAttribute);b.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=ce.meshPerAttribute*ce.count)}else for(let Ue=0;Ue<K.locationSize;Ue++)x(K.location+Ue);n.bindBuffer(n.ARRAY_BUFFER,ze);for(let Ue=0;Ue<K.locationSize;Ue++)R(K.location+Ue,pe/K.locationSize,He,te,Ae*ut,(Ye+pe/K.locationSize*Ue)*ut,ne)}else{if(ie.isInstancedBufferAttribute){for(let ce=0;ce<K.locationSize;ce++)h(K.location+ce,ie.meshPerAttribute);b.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=ie.meshPerAttribute*ie.count)}else for(let ce=0;ce<K.locationSize;ce++)x(K.location+ce);n.bindBuffer(n.ARRAY_BUFFER,ze);for(let ce=0;ce<K.locationSize;ce++)R(K.location+ce,pe/K.locationSize,He,te,pe*ut,pe/K.locationSize*ce*ut,ne)}}else if(Z!==void 0){const te=Z[re];if(te!==void 0)switch(te.length){case 2:n.vertexAttrib2fv(K.location,te);break;case 3:n.vertexAttrib3fv(K.location,te);break;case 4:n.vertexAttrib4fv(K.location,te);break;default:n.vertexAttrib1fv(K.location,te)}}}}w()}function E(){L();for(const b in i){const P=i[b];for(const N in P){const I=P[N];for(const H in I)u(I[H].object),delete I[H];delete P[N]}delete i[b]}}function v(b){if(i[b.id]===void 0)return;const P=i[b.id];for(const N in P){const I=P[N];for(const H in I)u(I[H].object),delete I[H];delete P[N]}delete i[b.id]}function C(b){for(const P in i){const N=i[P];if(N[b.id]===void 0)continue;const I=N[b.id];for(const H in I)u(I[H].object),delete I[H];delete N[b.id]}}function L(){g(),o=!0,r!==s&&(r=s,l(r.object))}function g(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:L,resetDefaultState:g,dispose:E,releaseStatesOfGeometry:v,releaseStatesOfProgram:C,initAttributes:_,enableAttribute:x,disableUnusedAttributes:w}}function sm(n,e,t){let i;function s(l){i=l}function r(l,u){n.drawArrays(i,l,u),t.update(u,i,1)}function o(l,u,d){d!==0&&(n.drawArraysInstanced(i,l,u,d),t.update(u,i,d))}function a(l,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,u,0,d);let p=0;for(let m=0;m<d;m++)p+=u[m];t.update(p,i,1)}function c(l,u,d,f){if(d===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<l.length;m++)o(l[m],u[m],f[m]);else{p.multiDrawArraysInstancedWEBGL(i,l,0,u,0,f,0,d);let m=0;for(let _=0;_<d;_++)m+=u[_]*f[_];t.update(m,i,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function rm(n,e,t,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const C=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(C){return!(C!==Zn&&i.convert(C)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(C){const L=C===Ks&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==ui&&i.convert(C)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==ci&&!L)}function c(C){if(C==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const u=c(l);u!==l&&(Ke("WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const d=t.logarithmicDepthBuffer===!0,f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),m=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_TEXTURE_SIZE),x=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),h=n.getParameter(n.MAX_VERTEX_ATTRIBS),w=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),R=n.getParameter(n.MAX_VARYING_VECTORS),A=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),E=m>0,v=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:m,maxTextureSize:_,maxCubemapSize:x,maxAttributes:h,maxVertexUniforms:w,maxVaryings:R,maxFragmentUniforms:A,vertexTextures:E,maxSamples:v}}function am(n){const e=this;let t=null,i=0,s=!1,r=!1;const o=new Vi,a=new Ze,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){const p=d.length!==0||f||i!==0||s;return s=f,i=d.length,p},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,f){t=u(d,f,0)},this.setState=function(d,f,p){const m=d.clippingPlanes,_=d.clipIntersection,x=d.clipShadows,h=n.get(d);if(!s||m===null||m.length===0||r&&!x)r?u(null):l();else{const w=r?0:i,R=w*4;let A=h.clippingState||null;c.value=A,A=u(m,f,R,p);for(let E=0;E!==R;++E)A[E]=t[E];h.clippingState=A,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=w}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(d,f,p,m){const _=d!==null?d.length:0;let x=null;if(_!==0){if(x=c.value,m!==!0||x===null){const h=p+_*4,w=f.matrixWorldInverse;a.getNormalMatrix(w),(x===null||x.length<h)&&(x=new Float32Array(h));for(let R=0,A=p;R!==_;++R,A+=4)o.copy(d[R]).applyMatrix4(w,a),o.normal.toArray(x,A),x[A+3]=o.constant}c.value=x,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,x}}function om(n){let e=new WeakMap;function t(o,a){return a===Io?o.mapping=Ws:a===Uo&&(o.mapping=$s),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===Io||a===Uo)if(e.has(o)){const c=e.get(o).texture;return t(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new th(c.height);return l.fromEquirectangularTexture(n,o),e.set(o,l),o.addEventListener("dispose",s),t(l.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function r(){e=new WeakMap}return{get:i,dispose:r}}const Hi=4,Ol=[.125,.215,.35,.446,.526,.582],ls=20,cm=256,dr=new ju,zl=new at;let fo=null,ho=0,po=0,mo=!1;const lm=new B;class Bl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,s=100,r={}){const{size:o=256,position:a=lm}=r;fo=this._renderer.getRenderTarget(),ho=this._renderer.getActiveCubeFace(),po=this._renderer.getActiveMipmapLevel(),mo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,i,s,c,a),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Gl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Vl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(fo,ho,po),this._renderer.xr.enabled=mo,e.scissorTest=!1,Fs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ws||e.mapping===$s?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),fo=this._renderer.getRenderTarget(),ho=this._renderer.getActiveCubeFace(),po=this._renderer.getActiveMipmapLevel(),mo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Hn,minFilter:Hn,generateMipmaps:!1,type:Ks,format:Zn,colorSpace:qs,depthBuffer:!1},s=kl(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=kl(e,t,i);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=um(r)),this._blurMaterial=fm(r,e,t),this._ggxMaterial=dm(r,e,t)}return s}_compileMaterial(e){const t=new _n(new jt,e);this._renderer.compile(t,dr)}_sceneToCubeUV(e,t,i,s,r){const c=new Sn(90,1,t,i),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,f=d.autoClear,p=d.toneMapping;d.getClearColor(zl),d.toneMapping=$i,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new _n(new _s,new _i({name:"PMREM.Background",side:wn,depthWrite:!1,depthTest:!1})));const _=this._backgroundBox,x=_.material;let h=!1;const w=e.background;w?w.isColor&&(x.color.copy(w),e.background=null,h=!0):(x.color.copy(zl),h=!0);for(let R=0;R<6;R++){const A=R%3;A===0?(c.up.set(0,l[R],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+u[R],r.y,r.z)):A===1?(c.up.set(0,0,l[R]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+u[R],r.z)):(c.up.set(0,l[R],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+u[R]));const E=this._cubeSize;Fs(s,A*E,R>2?E:0,E,E),d.setRenderTarget(s),h&&d.render(_,c),d.render(e,c)}d.toneMapping=p,d.autoClear=f,e.background=w}_textureToCubeUV(e,t){const i=this._renderer,s=e.mapping===Ws||e.mapping===$s;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Gl()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Vl());const r=s?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=r;const a=r.uniforms;a.envMap.value=e;const c=this._cubeSize;Fs(t,0,0,3*c,2*c),i.setRenderTarget(t),i.render(o,dr)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=i}_applyGGXFilter(e,t,i){const s=this._renderer,r=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[i];a.material=o;const c=o.uniforms,l=i/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),d=Math.sqrt(l*l-u*u),f=.05+l*.95,p=d*f,{_lodMax:m}=this,_=this._sizeLods[i],x=3*_*(i>m-Hi?i-m+Hi:0),h=4*(this._cubeSize-_);c.envMap.value=e.texture,c.roughness.value=p,c.mipInt.value=m-t,Fs(r,x,h,3*_,2*_),s.setRenderTarget(r),s.render(a,dr),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=m-i,Fs(e,x,h,3*_,2*_),s.setRenderTarget(e),s.render(a,dr)}_blur(e,t,i,s,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,s,"latitudinal",r),this._halfBlur(o,e,i,i,s,"longitudinal",r)}_halfBlur(e,t,i,s,r,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&Ot("blur direction must be either latitudinal or longitudinal!");const u=3,d=this._lodMeshes[s];d.material=l;const f=l.uniforms,p=this._sizeLods[i]-1,m=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*ls-1),_=r/m,x=isFinite(r)?1+Math.floor(u*_):ls;x>ls&&Ke(`sigmaRadians, ${r}, is too large and will clip, as it requested ${x} samples when the maximum is set to ${ls}`);const h=[];let w=0;for(let C=0;C<ls;++C){const L=C/_,g=Math.exp(-L*L/2);h.push(g),C===0?w+=g:C<x&&(w+=2*g)}for(let C=0;C<h.length;C++)h[C]=h[C]/w;f.envMap.value=e.texture,f.samples.value=x,f.weights.value=h,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:R}=this;f.dTheta.value=m,f.mipInt.value=R-i;const A=this._sizeLods[s],E=3*A*(s>R-Hi?s-R+Hi:0),v=4*(this._cubeSize-A);Fs(t,E,v,3*A,2*A),c.setRenderTarget(t),c.render(d,dr)}}function um(n){const e=[],t=[],i=[];let s=n;const r=n-Hi+1+Ol.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);e.push(a);let c=1/a;o>n-Hi?c=Ol[o-n+Hi-1]:o===0&&(c=0),t.push(c);const l=1/(a-2),u=-l,d=1+l,f=[u,u,d,u,d,d,u,u,d,d,u,d],p=6,m=6,_=3,x=2,h=1,w=new Float32Array(_*m*p),R=new Float32Array(x*m*p),A=new Float32Array(h*m*p);for(let v=0;v<p;v++){const C=v%3*2/3-1,L=v>2?0:-1,g=[C,L,0,C+2/3,L,0,C+2/3,L+1,0,C,L,0,C+2/3,L+1,0,C,L+1,0];w.set(g,_*m*v),R.set(f,x*m*v);const b=[v,v,v,v,v,v];A.set(b,h*m*v)}const E=new jt;E.setAttribute("position",new Wn(w,_)),E.setAttribute("uv",new Wn(R,x)),E.setAttribute("faceIndex",new Wn(A,h)),i.push(new _n(E,null)),s>Hi&&s--}return{lodMeshes:i,sizeLods:e,sigmas:t}}function kl(n,e,t){const i=new hs(n,e,t);return i.texture.mapping=ya,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Fs(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function dm(n,e,t){return new Ci({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:cm,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Ea(),fragmentShader:`

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
		`,blending:wi,depthTest:!1,depthWrite:!1})}function fm(n,e,t){const i=new Float32Array(ls),s=new B(0,1,0);return new Ci({name:"SphericalGaussianBlur",defines:{n:ls,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Ea(),fragmentShader:`

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
		`,blending:wi,depthTest:!1,depthWrite:!1})}function Vl(){return new Ci({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ea(),fragmentShader:`

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
		`,blending:wi,depthTest:!1,depthWrite:!1})}function Gl(){return new Ci({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ea(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:wi,depthTest:!1,depthWrite:!1})}function Ea(){return`

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
	`}function hm(n){let e=new WeakMap,t=null;function i(a){if(a&&a.isTexture){const c=a.mapping,l=c===Io||c===Uo,u=c===Ws||c===$s;if(l||u){let d=e.get(a);const f=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return t===null&&(t=new Bl(n)),d=l?t.fromEquirectangular(a,d):t.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),d.texture;if(d!==void 0)return d.texture;{const p=a.image;return l&&p&&p.height>0||u&&p&&s(p)?(t===null&&(t=new Bl(n)),d=l?t.fromEquirectangular(a):t.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),a.addEventListener("dispose",r),d.texture):null}}}return a}function s(a){let c=0;const l=6;for(let u=0;u<l;u++)a[u]!==void 0&&c++;return c===l}function r(a){const c=a.target;c.removeEventListener("dispose",r);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:o}}function pm(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const s=n.getExtension(i);return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const s=t(i);return s===null&&vr("WebGLRenderer: "+i+" extension not supported."),s}}}function mm(n,e,t,i){const s={},r=new WeakMap;function o(d){const f=d.target;f.index!==null&&e.remove(f.index);for(const m in f.attributes)e.remove(f.attributes[m]);f.removeEventListener("dispose",o),delete s[f.id];const p=r.get(f);p&&(e.remove(p),r.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(d,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,t.memory.geometries++),f}function c(d){const f=d.attributes;for(const p in f)e.update(f[p],n.ARRAY_BUFFER)}function l(d){const f=[],p=d.index,m=d.attributes.position;let _=0;if(p!==null){const w=p.array;_=p.version;for(let R=0,A=w.length;R<A;R+=3){const E=w[R+0],v=w[R+1],C=w[R+2];f.push(E,v,v,C,C,E)}}else if(m!==void 0){const w=m.array;_=m.version;for(let R=0,A=w.length/3-1;R<A;R+=3){const E=R+0,v=R+1,C=R+2;f.push(E,v,v,C,C,E)}}else return;const x=new(Fu(f)?Bu:zu)(f,1);x.version=_;const h=r.get(d);h&&e.remove(h),r.set(d,x)}function u(d){const f=r.get(d);if(f){const p=d.index;p!==null&&f.version<p.version&&l(d)}else l(d);return r.get(d)}return{get:a,update:c,getWireframeAttribute:u}}function xm(n,e,t){let i;function s(f){i=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function c(f,p){n.drawElements(i,p,r,f*o),t.update(p,i,1)}function l(f,p,m){m!==0&&(n.drawElementsInstanced(i,p,r,f*o,m),t.update(p,i,m))}function u(f,p,m){if(m===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,r,f,0,m);let x=0;for(let h=0;h<m;h++)x+=p[h];t.update(x,i,1)}function d(f,p,m,_){if(m===0)return;const x=e.get("WEBGL_multi_draw");if(x===null)for(let h=0;h<f.length;h++)l(f[h]/o,p[h],_[h]);else{x.multiDrawElementsInstancedWEBGL(i,p,0,r,f,0,_,0,m);let h=0;for(let w=0;w<m;w++)h+=p[w]*_[w];t.update(h,i,1)}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function gm(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=a*(r/3);break;case n.LINES:t.lines+=a*(r/2);break;case n.LINE_STRIP:t.lines+=a*(r-1);break;case n.LINE_LOOP:t.lines+=a*r;break;case n.POINTS:t.points+=a*r;break;default:Ot("WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function _m(n,e,t){const i=new WeakMap,s=new St;function r(o,a,c){const l=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=u!==void 0?u.length:0;let f=i.get(a);if(f===void 0||f.count!==d){let b=function(){L.dispose(),i.delete(a),a.removeEventListener("dispose",b)};var p=b;f!==void 0&&f.texture.dispose();const m=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,x=a.morphAttributes.color!==void 0,h=a.morphAttributes.position||[],w=a.morphAttributes.normal||[],R=a.morphAttributes.color||[];let A=0;m===!0&&(A=1),_===!0&&(A=2),x===!0&&(A=3);let E=a.attributes.position.count*A,v=1;E>e.maxTextureSize&&(v=Math.ceil(E/e.maxTextureSize),E=e.maxTextureSize);const C=new Float32Array(E*v*4*d),L=new Nu(C,E,v,d);L.type=ci,L.needsUpdate=!0;const g=A*4;for(let P=0;P<d;P++){const N=h[P],I=w[P],H=R[P],X=E*v*4*P;for(let Z=0;Z<N.count;Z++){const re=Z*g;m===!0&&(s.fromBufferAttribute(N,Z),C[X+re+0]=s.x,C[X+re+1]=s.y,C[X+re+2]=s.z,C[X+re+3]=0),_===!0&&(s.fromBufferAttribute(I,Z),C[X+re+4]=s.x,C[X+re+5]=s.y,C[X+re+6]=s.z,C[X+re+7]=0),x===!0&&(s.fromBufferAttribute(H,Z),C[X+re+8]=s.x,C[X+re+9]=s.y,C[X+re+10]=s.z,C[X+re+11]=H.itemSize===4?s.w:1)}}f={count:d,texture:L,size:new st(E,v)},i.set(a,f),a.addEventListener("dispose",b)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",o.morphTexture,t);else{let m=0;for(let x=0;x<l.length;x++)m+=l[x];const _=a.morphTargetsRelative?1:1-m;c.getUniforms().setValue(n,"morphTargetBaseInfluence",_),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",f.texture,t),c.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:r}}function vm(n,e,t,i){let s=new WeakMap;function r(c){const l=i.render.frame,u=c.geometry,d=e.get(c,u);if(s.get(d)!==l&&(e.update(d),s.set(d,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const f=c.skeleton;s.get(f)!==l&&(f.update(),s.set(f,l))}return d}function o(){s=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:o}}const Ku=new hn,Hl=new qu(1,1),Zu=new Nu,Ju=new zf,Qu=new Gu,Wl=[],$l=[],ql=new Float32Array(16),Xl=new Float32Array(9),jl=new Float32Array(4);function Qs(n,e,t){const i=n[0];if(i<=0||i>0)return n;const s=e*t;let r=Wl[s];if(r===void 0&&(r=new Float32Array(s),Wl[s]=r),e!==0){i.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,n[o].toArray(r,a)}return r}function qt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Xt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Ta(n,e){let t=$l[e];t===void 0&&(t=new Int32Array(e),$l[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function bm(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function ym(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(qt(t,e))return;n.uniform2fv(this.addr,e),Xt(t,e)}}function Mm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(qt(t,e))return;n.uniform3fv(this.addr,e),Xt(t,e)}}function Sm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(qt(t,e))return;n.uniform4fv(this.addr,e),Xt(t,e)}}function Em(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(qt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Xt(t,e)}else{if(qt(t,i))return;jl.set(i),n.uniformMatrix2fv(this.addr,!1,jl),Xt(t,i)}}function Tm(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(qt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Xt(t,e)}else{if(qt(t,i))return;Xl.set(i),n.uniformMatrix3fv(this.addr,!1,Xl),Xt(t,i)}}function wm(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(qt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Xt(t,e)}else{if(qt(t,i))return;ql.set(i),n.uniformMatrix4fv(this.addr,!1,ql),Xt(t,i)}}function Am(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function Rm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(qt(t,e))return;n.uniform2iv(this.addr,e),Xt(t,e)}}function Cm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(qt(t,e))return;n.uniform3iv(this.addr,e),Xt(t,e)}}function Pm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(qt(t,e))return;n.uniform4iv(this.addr,e),Xt(t,e)}}function Lm(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function Dm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(qt(t,e))return;n.uniform2uiv(this.addr,e),Xt(t,e)}}function Im(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(qt(t,e))return;n.uniform3uiv(this.addr,e),Xt(t,e)}}function Um(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(qt(t,e))return;n.uniform4uiv(this.addr,e),Xt(t,e)}}function Fm(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(Hl.compareFunction=Uu,r=Hl):r=Ku,t.setTexture2D(e||r,s)}function Nm(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||Ju,s)}function Om(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||Qu,s)}function zm(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||Zu,s)}function Bm(n){switch(n){case 5126:return bm;case 35664:return ym;case 35665:return Mm;case 35666:return Sm;case 35674:return Em;case 35675:return Tm;case 35676:return wm;case 5124:case 35670:return Am;case 35667:case 35671:return Rm;case 35668:case 35672:return Cm;case 35669:case 35673:return Pm;case 5125:return Lm;case 36294:return Dm;case 36295:return Im;case 36296:return Um;case 35678:case 36198:case 36298:case 36306:case 35682:return Fm;case 35679:case 36299:case 36307:return Nm;case 35680:case 36300:case 36308:case 36293:return Om;case 36289:case 36303:case 36311:case 36292:return zm}}function km(n,e){n.uniform1fv(this.addr,e)}function Vm(n,e){const t=Qs(e,this.size,2);n.uniform2fv(this.addr,t)}function Gm(n,e){const t=Qs(e,this.size,3);n.uniform3fv(this.addr,t)}function Hm(n,e){const t=Qs(e,this.size,4);n.uniform4fv(this.addr,t)}function Wm(n,e){const t=Qs(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function $m(n,e){const t=Qs(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function qm(n,e){const t=Qs(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function Xm(n,e){n.uniform1iv(this.addr,e)}function jm(n,e){n.uniform2iv(this.addr,e)}function Ym(n,e){n.uniform3iv(this.addr,e)}function Km(n,e){n.uniform4iv(this.addr,e)}function Zm(n,e){n.uniform1uiv(this.addr,e)}function Jm(n,e){n.uniform2uiv(this.addr,e)}function Qm(n,e){n.uniform3uiv(this.addr,e)}function ex(n,e){n.uniform4uiv(this.addr,e)}function tx(n,e,t){const i=this.cache,s=e.length,r=Ta(t,s);qt(i,r)||(n.uniform1iv(this.addr,r),Xt(i,r));for(let o=0;o!==s;++o)t.setTexture2D(e[o]||Ku,r[o])}function nx(n,e,t){const i=this.cache,s=e.length,r=Ta(t,s);qt(i,r)||(n.uniform1iv(this.addr,r),Xt(i,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||Ju,r[o])}function ix(n,e,t){const i=this.cache,s=e.length,r=Ta(t,s);qt(i,r)||(n.uniform1iv(this.addr,r),Xt(i,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||Qu,r[o])}function sx(n,e,t){const i=this.cache,s=e.length,r=Ta(t,s);qt(i,r)||(n.uniform1iv(this.addr,r),Xt(i,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||Zu,r[o])}function rx(n){switch(n){case 5126:return km;case 35664:return Vm;case 35665:return Gm;case 35666:return Hm;case 35674:return Wm;case 35675:return $m;case 35676:return qm;case 5124:case 35670:return Xm;case 35667:case 35671:return jm;case 35668:case 35672:return Ym;case 35669:case 35673:return Km;case 5125:return Zm;case 36294:return Jm;case 36295:return Qm;case 36296:return ex;case 35678:case 36198:case 36298:case 36306:case 35682:return tx;case 35679:case 36299:case 36307:return nx;case 35680:case 36300:case 36308:case 36293:return ix;case 36289:case 36303:case 36311:case 36292:return sx}}class ax{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Bm(t.type)}}class ox{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=rx(t.type)}}class cx{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(e,t[a.id],i)}}}const xo=/(\w+)(\])?(\[|\.)?/g;function Yl(n,e){n.seq.push(e),n.map[e.id]=e}function lx(n,e,t){const i=n.name,s=i.length;for(xo.lastIndex=0;;){const r=xo.exec(i),o=xo.lastIndex;let a=r[1];const c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){Yl(t,l===void 0?new ax(a,n,e):new ox(a,n,e));break}else{let d=t.map[a];d===void 0&&(d=new cx(a),Yl(t,d)),t=d}}}class ra{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const r=e.getActiveUniform(t,s),o=e.getUniformLocation(t,r.name);lx(r,o,this)}}setValue(e,t,i,s){const r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){const s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,o=t.length;r!==o;++r){const a=t[r],c=i[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,s)}}static seqWithValue(e,t){const i=[];for(let s=0,r=e.length;s!==r;++s){const o=e[s];o.id in t&&i.push(o)}return i}}function Kl(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const ux=37297;let dx=0;function fx(n,e){const t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}const Zl=new Ze;function hx(n){pt._getMatrix(Zl,pt.workingColorSpace,n);const e=`mat3( ${Zl.elements.map(t=>t.toFixed(4))} )`;switch(pt.getTransfer(n)){case da:return[e,"LinearTransferOETF"];case Mt:return[e,"sRGBTransferOETF"];default:return Ke("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Jl(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=(n.getShaderInfoLog(e)||"").trim();if(i&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const a=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+fx(n.getShaderSource(e),a)}else return r}function px(n,e){const t=hx(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function mx(n,e){let t;switch(e){case hf:t="Linear";break;case pf:t="Reinhard";break;case mf:t="Cineon";break;case Tu:t="ACESFilmic";break;case gf:t="AgX";break;case _f:t="Neutral";break;case xf:t="Custom";break;default:Ke("WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const ea=new B;function xx(){pt.getLuminanceCoefficients(ea);const n=ea.x.toFixed(4),e=ea.y.toFixed(4),t=ea.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function gx(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(fr).join(`
`)}function _x(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function vx(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(e,s),o=r.name;let a=1;r.type===n.FLOAT_MAT2&&(a=2),r.type===n.FLOAT_MAT3&&(a=3),r.type===n.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:n.getAttribLocation(e,o),locationSize:a}}return t}function fr(n){return n!==""}function Ql(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function eu(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const bx=/^[ \t]*#include +<([\w\d./]+)>/gm;function fc(n){return n.replace(bx,Mx)}const yx=new Map;function Mx(n,e){let t=Je[e];if(t===void 0){const i=yx.get(e);if(i!==void 0)t=Je[i],Ke('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return fc(t)}const Sx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function tu(n){return n.replace(Sx,Ex)}function Ex(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function nu(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}function Tx(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Mu?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===Su?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===gi&&(e="SHADOWMAP_TYPE_VSM"),e}function wx(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case Ws:case $s:e="ENVMAP_TYPE_CUBE";break;case ya:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Ax(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case $s:e="ENVMAP_MODE_REFRACTION";break}return e}function Rx(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Eu:e="ENVMAP_BLENDING_MULTIPLY";break;case df:e="ENVMAP_BLENDING_MIX";break;case ff:e="ENVMAP_BLENDING_ADD";break}return e}function Cx(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function Px(n,e,t,i){const s=n.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const c=Tx(t),l=wx(t),u=Ax(t),d=Rx(t),f=Cx(t),p=gx(t),m=_x(r),_=s.createProgram();let x,h,w=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(x=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(fr).join(`
`),x.length>0&&(x+=`
`),h=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(fr).join(`
`),h.length>0&&(h+=`
`)):(x=[nu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(fr).join(`
`),h=[nu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==$i?"#define TONE_MAPPING":"",t.toneMapping!==$i?Je.tonemapping_pars_fragment:"",t.toneMapping!==$i?mx("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Je.colorspace_pars_fragment,px("linearToOutputTexel",t.outputColorSpace),xx(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(fr).join(`
`)),o=fc(o),o=Ql(o,t),o=eu(o,t),a=fc(a),a=Ql(a,t),a=eu(a,t),o=tu(o),a=tu(a),t.isRawShaderMaterial!==!0&&(w=`#version 300 es
`,x=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+x,h=["#define varying in",t.glslVersion===sl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===sl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+h);const R=w+x+o,A=w+h+a,E=Kl(s,s.VERTEX_SHADER,R),v=Kl(s,s.FRAGMENT_SHADER,A);s.attachShader(_,E),s.attachShader(_,v),t.index0AttributeName!==void 0?s.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function C(P){if(n.debug.checkShaderErrors){const N=s.getProgramInfoLog(_)||"",I=s.getShaderInfoLog(E)||"",H=s.getShaderInfoLog(v)||"",X=N.trim(),Z=I.trim(),re=H.trim();let K=!0,ie=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(K=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,_,E,v);else{const te=Jl(s,E,"vertex"),pe=Jl(s,v,"fragment");Ot("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+X+`
`+te+`
`+pe)}else X!==""?Ke("WebGLProgram: Program Info Log:",X):(Z===""||re==="")&&(ie=!1);ie&&(P.diagnostics={runnable:K,programLog:X,vertexShader:{log:Z,prefix:x},fragmentShader:{log:re,prefix:h}})}s.deleteShader(E),s.deleteShader(v),L=new ra(s,_),g=vx(s,_)}let L;this.getUniforms=function(){return L===void 0&&C(this),L};let g;this.getAttributes=function(){return g===void 0&&C(this),g};let b=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return b===!1&&(b=s.getProgramParameter(_,ux)),b},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=dx++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=E,this.fragmentShader=v,this}let Lx=0;class Dx{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new Ix(e),t.set(e,i)),i}}class Ix{constructor(e){this.id=Lx++,this.code=e,this.usedTimes=0}}function Ux(n,e,t,i,s,r,o){const a=new Cc,c=new Dx,l=new Set,u=[],d=s.logarithmicDepthBuffer,f=s.vertexTextures;let p=s.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(g){return l.add(g),g===0?"uv":`uv${g}`}function x(g,b,P,N,I){const H=N.fog,X=I.geometry,Z=g.isMeshStandardMaterial?N.environment:null,re=(g.isMeshStandardMaterial?t:e).get(g.envMap||Z),K=re&&re.mapping===ya?re.image.height:null,ie=m[g.type];g.precision!==null&&(p=s.getMaxPrecision(g.precision),p!==g.precision&&Ke("WebGLProgram.getParameters:",g.precision,"not supported, using",p,"instead."));const te=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,pe=te!==void 0?te.length:0;let Pe=0;X.morphAttributes.position!==void 0&&(Pe=1),X.morphAttributes.normal!==void 0&&(Pe=2),X.morphAttributes.color!==void 0&&(Pe=3);let ze,He,ut,ne;if(ie){const ht=oi[ie];ze=ht.vertexShader,He=ht.fragmentShader}else ze=g.vertexShader,He=g.fragmentShader,c.update(g),ut=c.getVertexShaderID(g),ne=c.getFragmentShaderID(g);const ce=n.getRenderTarget(),Ae=n.state.buffers.depth.getReversed(),Ye=I.isInstancedMesh===!0,Ue=I.isBatchedMesh===!0,Qe=!!g.map,kt=!!g.matcap,et=!!re,Tt=!!g.aoMap,O=!!g.lightMap,tt=!!g.bumpMap,nt=!!g.normalMap,_t=!!g.displacementMap,Te=!!g.emissiveMap,Rt=!!g.metalnessMap,Ne=!!g.roughnessMap,Xe=g.anisotropy>0,D=g.clearcoat>0,y=g.dispersion>0,q=g.iridescence>0,se=g.sheen>0,oe=g.transmission>0,Q=Xe&&!!g.anisotropyMap,Le=D&&!!g.clearcoatMap,ve=D&&!!g.clearcoatNormalMap,Be=D&&!!g.clearcoatRoughnessMap,De=q&&!!g.iridescenceMap,le=q&&!!g.iridescenceThicknessMap,fe=se&&!!g.sheenColorMap,Ge=se&&!!g.sheenRoughnessMap,ke=!!g.specularMap,ee=!!g.specularColorMap,qe=!!g.specularIntensityMap,z=oe&&!!g.transmissionMap,ge=oe&&!!g.thicknessMap,me=!!g.gradientMap,xe=!!g.alphaMap,ue=g.alphaTest>0,ae=!!g.alphaHash,we=!!g.extensions;let We=$i;g.toneMapped&&(ce===null||ce.isXRRenderTarget===!0)&&(We=n.toneMapping);const dt={shaderID:ie,shaderType:g.type,shaderName:g.name,vertexShader:ze,fragmentShader:He,defines:g.defines,customVertexShaderID:ut,customFragmentShaderID:ne,isRawShaderMaterial:g.isRawShaderMaterial===!0,glslVersion:g.glslVersion,precision:p,batching:Ue,batchingColor:Ue&&I._colorsTexture!==null,instancing:Ye,instancingColor:Ye&&I.instanceColor!==null,instancingMorph:Ye&&I.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:ce===null?n.outputColorSpace:ce.isXRRenderTarget===!0?ce.texture.colorSpace:qs,alphaToCoverage:!!g.alphaToCoverage,map:Qe,matcap:kt,envMap:et,envMapMode:et&&re.mapping,envMapCubeUVHeight:K,aoMap:Tt,lightMap:O,bumpMap:tt,normalMap:nt,displacementMap:f&&_t,emissiveMap:Te,normalMapObjectSpace:nt&&g.normalMapType===Mf,normalMapTangentSpace:nt&&g.normalMapType===Iu,metalnessMap:Rt,roughnessMap:Ne,anisotropy:Xe,anisotropyMap:Q,clearcoat:D,clearcoatMap:Le,clearcoatNormalMap:ve,clearcoatRoughnessMap:Be,dispersion:y,iridescence:q,iridescenceMap:De,iridescenceThicknessMap:le,sheen:se,sheenColorMap:fe,sheenRoughnessMap:Ge,specularMap:ke,specularColorMap:ee,specularIntensityMap:qe,transmission:oe,transmissionMap:z,thicknessMap:ge,gradientMap:me,opaque:g.transparent===!1&&g.blending===ks&&g.alphaToCoverage===!1,alphaMap:xe,alphaTest:ue,alphaHash:ae,combine:g.combine,mapUv:Qe&&_(g.map.channel),aoMapUv:Tt&&_(g.aoMap.channel),lightMapUv:O&&_(g.lightMap.channel),bumpMapUv:tt&&_(g.bumpMap.channel),normalMapUv:nt&&_(g.normalMap.channel),displacementMapUv:_t&&_(g.displacementMap.channel),emissiveMapUv:Te&&_(g.emissiveMap.channel),metalnessMapUv:Rt&&_(g.metalnessMap.channel),roughnessMapUv:Ne&&_(g.roughnessMap.channel),anisotropyMapUv:Q&&_(g.anisotropyMap.channel),clearcoatMapUv:Le&&_(g.clearcoatMap.channel),clearcoatNormalMapUv:ve&&_(g.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Be&&_(g.clearcoatRoughnessMap.channel),iridescenceMapUv:De&&_(g.iridescenceMap.channel),iridescenceThicknessMapUv:le&&_(g.iridescenceThicknessMap.channel),sheenColorMapUv:fe&&_(g.sheenColorMap.channel),sheenRoughnessMapUv:Ge&&_(g.sheenRoughnessMap.channel),specularMapUv:ke&&_(g.specularMap.channel),specularColorMapUv:ee&&_(g.specularColorMap.channel),specularIntensityMapUv:qe&&_(g.specularIntensityMap.channel),transmissionMapUv:z&&_(g.transmissionMap.channel),thicknessMapUv:ge&&_(g.thicknessMap.channel),alphaMapUv:xe&&_(g.alphaMap.channel),vertexTangents:!!X.attributes.tangent&&(nt||Xe),vertexColors:g.vertexColors,vertexAlphas:g.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,pointsUvs:I.isPoints===!0&&!!X.attributes.uv&&(Qe||xe),fog:!!H,useFog:g.fog===!0,fogExp2:!!H&&H.isFogExp2,flatShading:g.flatShading===!0&&g.wireframe===!1,sizeAttenuation:g.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:Ae,skinning:I.isSkinnedMesh===!0,morphTargets:X.morphAttributes.position!==void 0,morphNormals:X.morphAttributes.normal!==void 0,morphColors:X.morphAttributes.color!==void 0,morphTargetsCount:pe,morphTextureStride:Pe,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:g.dithering,shadowMapEnabled:n.shadowMap.enabled&&P.length>0,shadowMapType:n.shadowMap.type,toneMapping:We,decodeVideoTexture:Qe&&g.map.isVideoTexture===!0&&pt.getTransfer(g.map.colorSpace)===Mt,decodeVideoTextureEmissive:Te&&g.emissiveMap.isVideoTexture===!0&&pt.getTransfer(g.emissiveMap.colorSpace)===Mt,premultipliedAlpha:g.premultipliedAlpha,doubleSided:g.side===Gn,flipSided:g.side===wn,useDepthPacking:g.depthPacking>=0,depthPacking:g.depthPacking||0,index0AttributeName:g.index0AttributeName,extensionClipCullDistance:we&&g.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(we&&g.extensions.multiDraw===!0||Ue)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:g.customProgramCacheKey()};return dt.vertexUv1s=l.has(1),dt.vertexUv2s=l.has(2),dt.vertexUv3s=l.has(3),l.clear(),dt}function h(g){const b=[];if(g.shaderID?b.push(g.shaderID):(b.push(g.customVertexShaderID),b.push(g.customFragmentShaderID)),g.defines!==void 0)for(const P in g.defines)b.push(P),b.push(g.defines[P]);return g.isRawShaderMaterial===!1&&(w(b,g),R(b,g),b.push(n.outputColorSpace)),b.push(g.customProgramCacheKey),b.join()}function w(g,b){g.push(b.precision),g.push(b.outputColorSpace),g.push(b.envMapMode),g.push(b.envMapCubeUVHeight),g.push(b.mapUv),g.push(b.alphaMapUv),g.push(b.lightMapUv),g.push(b.aoMapUv),g.push(b.bumpMapUv),g.push(b.normalMapUv),g.push(b.displacementMapUv),g.push(b.emissiveMapUv),g.push(b.metalnessMapUv),g.push(b.roughnessMapUv),g.push(b.anisotropyMapUv),g.push(b.clearcoatMapUv),g.push(b.clearcoatNormalMapUv),g.push(b.clearcoatRoughnessMapUv),g.push(b.iridescenceMapUv),g.push(b.iridescenceThicknessMapUv),g.push(b.sheenColorMapUv),g.push(b.sheenRoughnessMapUv),g.push(b.specularMapUv),g.push(b.specularColorMapUv),g.push(b.specularIntensityMapUv),g.push(b.transmissionMapUv),g.push(b.thicknessMapUv),g.push(b.combine),g.push(b.fogExp2),g.push(b.sizeAttenuation),g.push(b.morphTargetsCount),g.push(b.morphAttributeCount),g.push(b.numDirLights),g.push(b.numPointLights),g.push(b.numSpotLights),g.push(b.numSpotLightMaps),g.push(b.numHemiLights),g.push(b.numRectAreaLights),g.push(b.numDirLightShadows),g.push(b.numPointLightShadows),g.push(b.numSpotLightShadows),g.push(b.numSpotLightShadowsWithMaps),g.push(b.numLightProbes),g.push(b.shadowMapType),g.push(b.toneMapping),g.push(b.numClippingPlanes),g.push(b.numClipIntersection),g.push(b.depthPacking)}function R(g,b){a.disableAll(),b.supportsVertexTextures&&a.enable(0),b.instancing&&a.enable(1),b.instancingColor&&a.enable(2),b.instancingMorph&&a.enable(3),b.matcap&&a.enable(4),b.envMap&&a.enable(5),b.normalMapObjectSpace&&a.enable(6),b.normalMapTangentSpace&&a.enable(7),b.clearcoat&&a.enable(8),b.iridescence&&a.enable(9),b.alphaTest&&a.enable(10),b.vertexColors&&a.enable(11),b.vertexAlphas&&a.enable(12),b.vertexUv1s&&a.enable(13),b.vertexUv2s&&a.enable(14),b.vertexUv3s&&a.enable(15),b.vertexTangents&&a.enable(16),b.anisotropy&&a.enable(17),b.alphaHash&&a.enable(18),b.batching&&a.enable(19),b.dispersion&&a.enable(20),b.batchingColor&&a.enable(21),b.gradientMap&&a.enable(22),g.push(a.mask),a.disableAll(),b.fog&&a.enable(0),b.useFog&&a.enable(1),b.flatShading&&a.enable(2),b.logarithmicDepthBuffer&&a.enable(3),b.reversedDepthBuffer&&a.enable(4),b.skinning&&a.enable(5),b.morphTargets&&a.enable(6),b.morphNormals&&a.enable(7),b.morphColors&&a.enable(8),b.premultipliedAlpha&&a.enable(9),b.shadowMapEnabled&&a.enable(10),b.doubleSided&&a.enable(11),b.flipSided&&a.enable(12),b.useDepthPacking&&a.enable(13),b.dithering&&a.enable(14),b.transmission&&a.enable(15),b.sheen&&a.enable(16),b.opaque&&a.enable(17),b.pointsUvs&&a.enable(18),b.decodeVideoTexture&&a.enable(19),b.decodeVideoTextureEmissive&&a.enable(20),b.alphaToCoverage&&a.enable(21),g.push(a.mask)}function A(g){const b=m[g.type];let P;if(b){const N=oi[b];P=Zf.clone(N.uniforms)}else P=g.uniforms;return P}function E(g,b){let P;for(let N=0,I=u.length;N<I;N++){const H=u[N];if(H.cacheKey===b){P=H,++P.usedTimes;break}}return P===void 0&&(P=new Px(n,b,g,r),u.push(P)),P}function v(g){if(--g.usedTimes===0){const b=u.indexOf(g);u[b]=u[u.length-1],u.pop(),g.destroy()}}function C(g){c.remove(g)}function L(){c.dispose()}return{getParameters:x,getProgramCacheKey:h,getUniforms:A,acquireProgram:E,releaseProgram:v,releaseShaderCache:C,programs:u,dispose:L}}function Fx(){let n=new WeakMap;function e(o){return n.has(o)}function t(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function s(o,a,c){n.get(o)[a]=c}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:r}}function Nx(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function iu(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function su(){const n=[];let e=0;const t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function o(d,f,p,m,_,x){let h=n[e];return h===void 0?(h={id:d.id,object:d,geometry:f,material:p,groupOrder:m,renderOrder:d.renderOrder,z:_,group:x},n[e]=h):(h.id=d.id,h.object=d,h.geometry=f,h.material=p,h.groupOrder=m,h.renderOrder=d.renderOrder,h.z=_,h.group=x),e++,h}function a(d,f,p,m,_,x){const h=o(d,f,p,m,_,x);p.transmission>0?i.push(h):p.transparent===!0?s.push(h):t.push(h)}function c(d,f,p,m,_,x){const h=o(d,f,p,m,_,x);p.transmission>0?i.unshift(h):p.transparent===!0?s.unshift(h):t.unshift(h)}function l(d,f){t.length>1&&t.sort(d||Nx),i.length>1&&i.sort(f||iu),s.length>1&&s.sort(f||iu)}function u(){for(let d=e,f=n.length;d<f;d++){const p=n[d];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:a,unshift:c,finish:u,sort:l}}function Ox(){let n=new WeakMap;function e(i,s){const r=n.get(i);let o;return r===void 0?(o=new su,n.set(i,[o])):s>=r.length?(o=new su,r.push(o)):o=r[s],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function zx(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new B,color:new at};break;case"SpotLight":t={position:new B,direction:new B,color:new at,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new B,color:new at,distance:0,decay:0};break;case"HemisphereLight":t={direction:new B,skyColor:new at,groundColor:new at};break;case"RectAreaLight":t={color:new at,position:new B,halfWidth:new B,halfHeight:new B};break}return n[e.id]=t,t}}}function Bx(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new st};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new st};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new st,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let kx=0;function Vx(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function Gx(n){const e=new zx,t=Bx(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new B);const s=new B,r=new vt,o=new vt;function a(l){let u=0,d=0,f=0;for(let g=0;g<9;g++)i.probe[g].set(0,0,0);let p=0,m=0,_=0,x=0,h=0,w=0,R=0,A=0,E=0,v=0,C=0;l.sort(Vx);for(let g=0,b=l.length;g<b;g++){const P=l[g],N=P.color,I=P.intensity,H=P.distance,X=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)u+=N.r*I,d+=N.g*I,f+=N.b*I;else if(P.isLightProbe){for(let Z=0;Z<9;Z++)i.probe[Z].addScaledVector(P.sh.coefficients[Z],I);C++}else if(P.isDirectionalLight){const Z=e.get(P);if(Z.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const re=P.shadow,K=t.get(P);K.shadowIntensity=re.intensity,K.shadowBias=re.bias,K.shadowNormalBias=re.normalBias,K.shadowRadius=re.radius,K.shadowMapSize=re.mapSize,i.directionalShadow[p]=K,i.directionalShadowMap[p]=X,i.directionalShadowMatrix[p]=P.shadow.matrix,w++}i.directional[p]=Z,p++}else if(P.isSpotLight){const Z=e.get(P);Z.position.setFromMatrixPosition(P.matrixWorld),Z.color.copy(N).multiplyScalar(I),Z.distance=H,Z.coneCos=Math.cos(P.angle),Z.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),Z.decay=P.decay,i.spot[_]=Z;const re=P.shadow;if(P.map&&(i.spotLightMap[E]=P.map,E++,re.updateMatrices(P),P.castShadow&&v++),i.spotLightMatrix[_]=re.matrix,P.castShadow){const K=t.get(P);K.shadowIntensity=re.intensity,K.shadowBias=re.bias,K.shadowNormalBias=re.normalBias,K.shadowRadius=re.radius,K.shadowMapSize=re.mapSize,i.spotShadow[_]=K,i.spotShadowMap[_]=X,A++}_++}else if(P.isRectAreaLight){const Z=e.get(P);Z.color.copy(N).multiplyScalar(I),Z.halfWidth.set(P.width*.5,0,0),Z.halfHeight.set(0,P.height*.5,0),i.rectArea[x]=Z,x++}else if(P.isPointLight){const Z=e.get(P);if(Z.color.copy(P.color).multiplyScalar(P.intensity),Z.distance=P.distance,Z.decay=P.decay,P.castShadow){const re=P.shadow,K=t.get(P);K.shadowIntensity=re.intensity,K.shadowBias=re.bias,K.shadowNormalBias=re.normalBias,K.shadowRadius=re.radius,K.shadowMapSize=re.mapSize,K.shadowCameraNear=re.camera.near,K.shadowCameraFar=re.camera.far,i.pointShadow[m]=K,i.pointShadowMap[m]=X,i.pointShadowMatrix[m]=P.shadow.matrix,R++}i.point[m]=Z,m++}else if(P.isHemisphereLight){const Z=e.get(P);Z.skyColor.copy(P.color).multiplyScalar(I),Z.groundColor.copy(P.groundColor).multiplyScalar(I),i.hemi[h]=Z,h++}}x>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=be.LTC_FLOAT_1,i.rectAreaLTC2=be.LTC_FLOAT_2):(i.rectAreaLTC1=be.LTC_HALF_1,i.rectAreaLTC2=be.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=d,i.ambient[2]=f;const L=i.hash;(L.directionalLength!==p||L.pointLength!==m||L.spotLength!==_||L.rectAreaLength!==x||L.hemiLength!==h||L.numDirectionalShadows!==w||L.numPointShadows!==R||L.numSpotShadows!==A||L.numSpotMaps!==E||L.numLightProbes!==C)&&(i.directional.length=p,i.spot.length=_,i.rectArea.length=x,i.point.length=m,i.hemi.length=h,i.directionalShadow.length=w,i.directionalShadowMap.length=w,i.pointShadow.length=R,i.pointShadowMap.length=R,i.spotShadow.length=A,i.spotShadowMap.length=A,i.directionalShadowMatrix.length=w,i.pointShadowMatrix.length=R,i.spotLightMatrix.length=A+E-v,i.spotLightMap.length=E,i.numSpotLightShadowsWithMaps=v,i.numLightProbes=C,L.directionalLength=p,L.pointLength=m,L.spotLength=_,L.rectAreaLength=x,L.hemiLength=h,L.numDirectionalShadows=w,L.numPointShadows=R,L.numSpotShadows=A,L.numSpotMaps=E,L.numLightProbes=C,i.version=kx++)}function c(l,u){let d=0,f=0,p=0,m=0,_=0;const x=u.matrixWorldInverse;for(let h=0,w=l.length;h<w;h++){const R=l[h];if(R.isDirectionalLight){const A=i.directional[d];A.direction.setFromMatrixPosition(R.matrixWorld),s.setFromMatrixPosition(R.target.matrixWorld),A.direction.sub(s),A.direction.transformDirection(x),d++}else if(R.isSpotLight){const A=i.spot[p];A.position.setFromMatrixPosition(R.matrixWorld),A.position.applyMatrix4(x),A.direction.setFromMatrixPosition(R.matrixWorld),s.setFromMatrixPosition(R.target.matrixWorld),A.direction.sub(s),A.direction.transformDirection(x),p++}else if(R.isRectAreaLight){const A=i.rectArea[m];A.position.setFromMatrixPosition(R.matrixWorld),A.position.applyMatrix4(x),o.identity(),r.copy(R.matrixWorld),r.premultiply(x),o.extractRotation(r),A.halfWidth.set(R.width*.5,0,0),A.halfHeight.set(0,R.height*.5,0),A.halfWidth.applyMatrix4(o),A.halfHeight.applyMatrix4(o),m++}else if(R.isPointLight){const A=i.point[f];A.position.setFromMatrixPosition(R.matrixWorld),A.position.applyMatrix4(x),f++}else if(R.isHemisphereLight){const A=i.hemi[_];A.direction.setFromMatrixPosition(R.matrixWorld),A.direction.transformDirection(x),_++}}}return{setup:a,setupView:c,state:i}}function ru(n){const e=new Gx(n),t=[],i=[];function s(u){l.camera=u,t.length=0,i.length=0}function r(u){t.push(u)}function o(u){i.push(u)}function a(){e.setup(t)}function c(u){e.setupView(t,u)}const l={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function Hx(n){let e=new WeakMap;function t(s,r=0){const o=e.get(s);let a;return o===void 0?(a=new ru(n),e.set(s,[a])):r>=o.length?(a=new ru(n),o.push(a)):a=o[r],a}function i(){e=new WeakMap}return{get:t,dispose:i}}const Wx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,$x=`uniform sampler2D shadow_pass;
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
}`;function qx(n,e,t){let i=new Lc;const s=new st,r=new st,o=new St,a=new dh({depthPacking:yf}),c=new fh,l={},u=t.maxTextureSize,d={[Zi]:wn,[wn]:Zi,[Gn]:Gn},f=new Ci({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new st},radius:{value:4}},vertexShader:Wx,fragmentShader:$x}),p=f.clone();p.defines.HORIZONTAL_PASS=1;const m=new jt;m.setAttribute("position",new Wn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new _n(m,f),x=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Mu;let h=this.type;this.render=function(v,C,L){if(x.enabled===!1||x.autoUpdate===!1&&x.needsUpdate===!1||v.length===0)return;const g=n.getRenderTarget(),b=n.getActiveCubeFace(),P=n.getActiveMipmapLevel(),N=n.state;N.setBlending(wi),N.buffers.depth.getReversed()===!0?N.buffers.color.setClear(0,0,0,0):N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);const I=h!==gi&&this.type===gi,H=h===gi&&this.type!==gi;for(let X=0,Z=v.length;X<Z;X++){const re=v[X],K=re.shadow;if(K===void 0){Ke("WebGLShadowMap:",re,"has no shadow.");continue}if(K.autoUpdate===!1&&K.needsUpdate===!1)continue;s.copy(K.mapSize);const ie=K.getFrameExtents();if(s.multiply(ie),r.copy(K.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/ie.x),s.x=r.x*ie.x,K.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/ie.y),s.y=r.y*ie.y,K.mapSize.y=r.y)),K.map===null||I===!0||H===!0){const pe=this.type!==gi?{minFilter:On,magFilter:On}:{};K.map!==null&&K.map.dispose(),K.map=new hs(s.x,s.y,pe),K.map.texture.name=re.name+".shadowMap",K.camera.updateProjectionMatrix()}n.setRenderTarget(K.map),n.clear();const te=K.getViewportCount();for(let pe=0;pe<te;pe++){const Pe=K.getViewport(pe);o.set(r.x*Pe.x,r.y*Pe.y,r.x*Pe.z,r.y*Pe.w),N.viewport(o),K.updateMatrices(re,pe),i=K.getFrustum(),A(C,L,K.camera,re,this.type)}K.isPointLightShadow!==!0&&this.type===gi&&w(K,L),K.needsUpdate=!1}h=this.type,x.needsUpdate=!1,n.setRenderTarget(g,b,P)};function w(v,C){const L=e.update(_);f.defines.VSM_SAMPLES!==v.blurSamples&&(f.defines.VSM_SAMPLES=v.blurSamples,p.defines.VSM_SAMPLES=v.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),v.mapPass===null&&(v.mapPass=new hs(s.x,s.y)),f.uniforms.shadow_pass.value=v.map.texture,f.uniforms.resolution.value=v.mapSize,f.uniforms.radius.value=v.radius,n.setRenderTarget(v.mapPass),n.clear(),n.renderBufferDirect(C,null,L,f,_,null),p.uniforms.shadow_pass.value=v.mapPass.texture,p.uniforms.resolution.value=v.mapSize,p.uniforms.radius.value=v.radius,n.setRenderTarget(v.map),n.clear(),n.renderBufferDirect(C,null,L,p,_,null)}function R(v,C,L,g){let b=null;const P=L.isPointLight===!0?v.customDistanceMaterial:v.customDepthMaterial;if(P!==void 0)b=P;else if(b=L.isPointLight===!0?c:a,n.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const N=b.uuid,I=C.uuid;let H=l[N];H===void 0&&(H={},l[N]=H);let X=H[I];X===void 0&&(X=b.clone(),H[I]=X,C.addEventListener("dispose",E)),b=X}if(b.visible=C.visible,b.wireframe=C.wireframe,g===gi?b.side=C.shadowSide!==null?C.shadowSide:C.side:b.side=C.shadowSide!==null?C.shadowSide:d[C.side],b.alphaMap=C.alphaMap,b.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,b.map=C.map,b.clipShadows=C.clipShadows,b.clippingPlanes=C.clippingPlanes,b.clipIntersection=C.clipIntersection,b.displacementMap=C.displacementMap,b.displacementScale=C.displacementScale,b.displacementBias=C.displacementBias,b.wireframeLinewidth=C.wireframeLinewidth,b.linewidth=C.linewidth,L.isPointLight===!0&&b.isMeshDistanceMaterial===!0){const N=n.properties.get(b);N.light=L}return b}function A(v,C,L,g,b){if(v.visible===!1)return;if(v.layers.test(C.layers)&&(v.isMesh||v.isLine||v.isPoints)&&(v.castShadow||v.receiveShadow&&b===gi)&&(!v.frustumCulled||i.intersectsObject(v))){v.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,v.matrixWorld);const I=e.update(v),H=v.material;if(Array.isArray(H)){const X=I.groups;for(let Z=0,re=X.length;Z<re;Z++){const K=X[Z],ie=H[K.materialIndex];if(ie&&ie.visible){const te=R(v,ie,g,b);v.onBeforeShadow(n,v,C,L,I,te,K),n.renderBufferDirect(L,null,I,te,v,K),v.onAfterShadow(n,v,C,L,I,te,K)}}}else if(H.visible){const X=R(v,H,g,b);v.onBeforeShadow(n,v,C,L,I,X,null),n.renderBufferDirect(L,null,I,X,v,null),v.onAfterShadow(n,v,C,L,I,X,null)}}const N=v.children;for(let I=0,H=N.length;I<H;I++)A(N[I],C,L,g,b)}function E(v){v.target.removeEventListener("dispose",E);for(const L in l){const g=l[L],b=v.target.uuid;b in g&&(g[b].dispose(),delete g[b])}}}const Xx={[wo]:Ao,[Ro]:Lo,[Co]:Do,[Hs]:Po,[Ao]:wo,[Lo]:Ro,[Do]:Co,[Po]:Hs};function jx(n,e){function t(){let z=!1;const ge=new St;let me=null;const xe=new St(0,0,0,0);return{setMask:function(ue){me!==ue&&!z&&(n.colorMask(ue,ue,ue,ue),me=ue)},setLocked:function(ue){z=ue},setClear:function(ue,ae,we,We,dt){dt===!0&&(ue*=We,ae*=We,we*=We),ge.set(ue,ae,we,We),xe.equals(ge)===!1&&(n.clearColor(ue,ae,we,We),xe.copy(ge))},reset:function(){z=!1,me=null,xe.set(-1,0,0,0)}}}function i(){let z=!1,ge=!1,me=null,xe=null,ue=null;return{setReversed:function(ae){if(ge!==ae){const we=e.get("EXT_clip_control");ae?we.clipControlEXT(we.LOWER_LEFT_EXT,we.ZERO_TO_ONE_EXT):we.clipControlEXT(we.LOWER_LEFT_EXT,we.NEGATIVE_ONE_TO_ONE_EXT),ge=ae;const We=ue;ue=null,this.setClear(We)}},getReversed:function(){return ge},setTest:function(ae){ae?ce(n.DEPTH_TEST):Ae(n.DEPTH_TEST)},setMask:function(ae){me!==ae&&!z&&(n.depthMask(ae),me=ae)},setFunc:function(ae){if(ge&&(ae=Xx[ae]),xe!==ae){switch(ae){case wo:n.depthFunc(n.NEVER);break;case Ao:n.depthFunc(n.ALWAYS);break;case Ro:n.depthFunc(n.LESS);break;case Hs:n.depthFunc(n.LEQUAL);break;case Co:n.depthFunc(n.EQUAL);break;case Po:n.depthFunc(n.GEQUAL);break;case Lo:n.depthFunc(n.GREATER);break;case Do:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}xe=ae}},setLocked:function(ae){z=ae},setClear:function(ae){ue!==ae&&(ge&&(ae=1-ae),n.clearDepth(ae),ue=ae)},reset:function(){z=!1,me=null,xe=null,ue=null,ge=!1}}}function s(){let z=!1,ge=null,me=null,xe=null,ue=null,ae=null,we=null,We=null,dt=null;return{setTest:function(ht){z||(ht?ce(n.STENCIL_TEST):Ae(n.STENCIL_TEST))},setMask:function(ht){ge!==ht&&!z&&(n.stencilMask(ht),ge=ht)},setFunc:function(ht,bt,Ht){(me!==ht||xe!==bt||ue!==Ht)&&(n.stencilFunc(ht,bt,Ht),me=ht,xe=bt,ue=Ht)},setOp:function(ht,bt,Ht){(ae!==ht||we!==bt||We!==Ht)&&(n.stencilOp(ht,bt,Ht),ae=ht,we=bt,We=Ht)},setLocked:function(ht){z=ht},setClear:function(ht){dt!==ht&&(n.clearStencil(ht),dt=ht)},reset:function(){z=!1,ge=null,me=null,xe=null,ue=null,ae=null,we=null,We=null,dt=null}}}const r=new t,o=new i,a=new s,c=new WeakMap,l=new WeakMap;let u={},d={},f=new WeakMap,p=[],m=null,_=!1,x=null,h=null,w=null,R=null,A=null,E=null,v=null,C=new at(0,0,0),L=0,g=!1,b=null,P=null,N=null,I=null,H=null;const X=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Z=!1,re=0;const K=n.getParameter(n.VERSION);K.indexOf("WebGL")!==-1?(re=parseFloat(/^WebGL (\d)/.exec(K)[1]),Z=re>=1):K.indexOf("OpenGL ES")!==-1&&(re=parseFloat(/^OpenGL ES (\d)/.exec(K)[1]),Z=re>=2);let ie=null,te={};const pe=n.getParameter(n.SCISSOR_BOX),Pe=n.getParameter(n.VIEWPORT),ze=new St().fromArray(pe),He=new St().fromArray(Pe);function ut(z,ge,me,xe){const ue=new Uint8Array(4),ae=n.createTexture();n.bindTexture(z,ae),n.texParameteri(z,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(z,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let we=0;we<me;we++)z===n.TEXTURE_3D||z===n.TEXTURE_2D_ARRAY?n.texImage3D(ge,0,n.RGBA,1,1,xe,0,n.RGBA,n.UNSIGNED_BYTE,ue):n.texImage2D(ge+we,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ue);return ae}const ne={};ne[n.TEXTURE_2D]=ut(n.TEXTURE_2D,n.TEXTURE_2D,1),ne[n.TEXTURE_CUBE_MAP]=ut(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),ne[n.TEXTURE_2D_ARRAY]=ut(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),ne[n.TEXTURE_3D]=ut(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ce(n.DEPTH_TEST),o.setFunc(Hs),tt(!1),nt(Jc),ce(n.CULL_FACE),Tt(wi);function ce(z){u[z]!==!0&&(n.enable(z),u[z]=!0)}function Ae(z){u[z]!==!1&&(n.disable(z),u[z]=!1)}function Ye(z,ge){return d[z]!==ge?(n.bindFramebuffer(z,ge),d[z]=ge,z===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=ge),z===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=ge),!0):!1}function Ue(z,ge){let me=p,xe=!1;if(z){me=f.get(ge),me===void 0&&(me=[],f.set(ge,me));const ue=z.textures;if(me.length!==ue.length||me[0]!==n.COLOR_ATTACHMENT0){for(let ae=0,we=ue.length;ae<we;ae++)me[ae]=n.COLOR_ATTACHMENT0+ae;me.length=ue.length,xe=!0}}else me[0]!==n.BACK&&(me[0]=n.BACK,xe=!0);xe&&n.drawBuffers(me)}function Qe(z){return m!==z?(n.useProgram(z),m=z,!0):!1}const kt={[cs]:n.FUNC_ADD,[Xd]:n.FUNC_SUBTRACT,[jd]:n.FUNC_REVERSE_SUBTRACT};kt[Yd]=n.MIN,kt[Kd]=n.MAX;const et={[Zd]:n.ZERO,[Jd]:n.ONE,[Qd]:n.SRC_COLOR,[Eo]:n.SRC_ALPHA,[af]:n.SRC_ALPHA_SATURATE,[sf]:n.DST_COLOR,[tf]:n.DST_ALPHA,[ef]:n.ONE_MINUS_SRC_COLOR,[To]:n.ONE_MINUS_SRC_ALPHA,[rf]:n.ONE_MINUS_DST_COLOR,[nf]:n.ONE_MINUS_DST_ALPHA,[of]:n.CONSTANT_COLOR,[cf]:n.ONE_MINUS_CONSTANT_COLOR,[lf]:n.CONSTANT_ALPHA,[uf]:n.ONE_MINUS_CONSTANT_ALPHA};function Tt(z,ge,me,xe,ue,ae,we,We,dt,ht){if(z===wi){_===!0&&(Ae(n.BLEND),_=!1);return}if(_===!1&&(ce(n.BLEND),_=!0),z!==qd){if(z!==x||ht!==g){if((h!==cs||A!==cs)&&(n.blendEquation(n.FUNC_ADD),h=cs,A=cs),ht)switch(z){case ks:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Qc:n.blendFunc(n.ONE,n.ONE);break;case el:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case tl:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:Ot("WebGLState: Invalid blending: ",z);break}else switch(z){case ks:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Qc:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case el:Ot("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case tl:Ot("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ot("WebGLState: Invalid blending: ",z);break}w=null,R=null,E=null,v=null,C.set(0,0,0),L=0,x=z,g=ht}return}ue=ue||ge,ae=ae||me,we=we||xe,(ge!==h||ue!==A)&&(n.blendEquationSeparate(kt[ge],kt[ue]),h=ge,A=ue),(me!==w||xe!==R||ae!==E||we!==v)&&(n.blendFuncSeparate(et[me],et[xe],et[ae],et[we]),w=me,R=xe,E=ae,v=we),(We.equals(C)===!1||dt!==L)&&(n.blendColor(We.r,We.g,We.b,dt),C.copy(We),L=dt),x=z,g=!1}function O(z,ge){z.side===Gn?Ae(n.CULL_FACE):ce(n.CULL_FACE);let me=z.side===wn;ge&&(me=!me),tt(me),z.blending===ks&&z.transparent===!1?Tt(wi):Tt(z.blending,z.blendEquation,z.blendSrc,z.blendDst,z.blendEquationAlpha,z.blendSrcAlpha,z.blendDstAlpha,z.blendColor,z.blendAlpha,z.premultipliedAlpha),o.setFunc(z.depthFunc),o.setTest(z.depthTest),o.setMask(z.depthWrite),r.setMask(z.colorWrite);const xe=z.stencilWrite;a.setTest(xe),xe&&(a.setMask(z.stencilWriteMask),a.setFunc(z.stencilFunc,z.stencilRef,z.stencilFuncMask),a.setOp(z.stencilFail,z.stencilZFail,z.stencilZPass)),Te(z.polygonOffset,z.polygonOffsetFactor,z.polygonOffsetUnits),z.alphaToCoverage===!0?ce(n.SAMPLE_ALPHA_TO_COVERAGE):Ae(n.SAMPLE_ALPHA_TO_COVERAGE)}function tt(z){b!==z&&(z?n.frontFace(n.CW):n.frontFace(n.CCW),b=z)}function nt(z){z!==Wd?(ce(n.CULL_FACE),z!==P&&(z===Jc?n.cullFace(n.BACK):z===$d?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Ae(n.CULL_FACE),P=z}function _t(z){z!==N&&(Z&&n.lineWidth(z),N=z)}function Te(z,ge,me){z?(ce(n.POLYGON_OFFSET_FILL),(I!==ge||H!==me)&&(n.polygonOffset(ge,me),I=ge,H=me)):Ae(n.POLYGON_OFFSET_FILL)}function Rt(z){z?ce(n.SCISSOR_TEST):Ae(n.SCISSOR_TEST)}function Ne(z){z===void 0&&(z=n.TEXTURE0+X-1),ie!==z&&(n.activeTexture(z),ie=z)}function Xe(z,ge,me){me===void 0&&(ie===null?me=n.TEXTURE0+X-1:me=ie);let xe=te[me];xe===void 0&&(xe={type:void 0,texture:void 0},te[me]=xe),(xe.type!==z||xe.texture!==ge)&&(ie!==me&&(n.activeTexture(me),ie=me),n.bindTexture(z,ge||ne[z]),xe.type=z,xe.texture=ge)}function D(){const z=te[ie];z!==void 0&&z.type!==void 0&&(n.bindTexture(z.type,null),z.type=void 0,z.texture=void 0)}function y(){try{n.compressedTexImage2D(...arguments)}catch(z){z("WebGLState:",z)}}function q(){try{n.compressedTexImage3D(...arguments)}catch(z){z("WebGLState:",z)}}function se(){try{n.texSubImage2D(...arguments)}catch(z){z("WebGLState:",z)}}function oe(){try{n.texSubImage3D(...arguments)}catch(z){z("WebGLState:",z)}}function Q(){try{n.compressedTexSubImage2D(...arguments)}catch(z){z("WebGLState:",z)}}function Le(){try{n.compressedTexSubImage3D(...arguments)}catch(z){z("WebGLState:",z)}}function ve(){try{n.texStorage2D(...arguments)}catch(z){z("WebGLState:",z)}}function Be(){try{n.texStorage3D(...arguments)}catch(z){z("WebGLState:",z)}}function De(){try{n.texImage2D(...arguments)}catch(z){z("WebGLState:",z)}}function le(){try{n.texImage3D(...arguments)}catch(z){z("WebGLState:",z)}}function fe(z){ze.equals(z)===!1&&(n.scissor(z.x,z.y,z.z,z.w),ze.copy(z))}function Ge(z){He.equals(z)===!1&&(n.viewport(z.x,z.y,z.z,z.w),He.copy(z))}function ke(z,ge){let me=l.get(ge);me===void 0&&(me=new WeakMap,l.set(ge,me));let xe=me.get(z);xe===void 0&&(xe=n.getUniformBlockIndex(ge,z.name),me.set(z,xe))}function ee(z,ge){const xe=l.get(ge).get(z);c.get(ge)!==xe&&(n.uniformBlockBinding(ge,xe,z.__bindingPointIndex),c.set(ge,xe))}function qe(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},ie=null,te={},d={},f=new WeakMap,p=[],m=null,_=!1,x=null,h=null,w=null,R=null,A=null,E=null,v=null,C=new at(0,0,0),L=0,g=!1,b=null,P=null,N=null,I=null,H=null,ze.set(0,0,n.canvas.width,n.canvas.height),He.set(0,0,n.canvas.width,n.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:ce,disable:Ae,bindFramebuffer:Ye,drawBuffers:Ue,useProgram:Qe,setBlending:Tt,setMaterial:O,setFlipSided:tt,setCullFace:nt,setLineWidth:_t,setPolygonOffset:Te,setScissorTest:Rt,activeTexture:Ne,bindTexture:Xe,unbindTexture:D,compressedTexImage2D:y,compressedTexImage3D:q,texImage2D:De,texImage3D:le,updateUBOMapping:ke,uniformBlockBinding:ee,texStorage2D:ve,texStorage3D:Be,texSubImage2D:se,texSubImage3D:oe,compressedTexSubImage2D:Q,compressedTexSubImage3D:Le,scissor:fe,viewport:Ge,reset:qe}}function Yx(n,e,t,i,s,r,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new st,u=new WeakMap;let d;const f=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(D,y){return p?new OffscreenCanvas(D,y):ha("canvas")}function _(D,y,q){let se=1;const oe=Xe(D);if((oe.width>q||oe.height>q)&&(se=q/Math.max(oe.width,oe.height)),se<1)if(typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&D instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&D instanceof ImageBitmap||typeof VideoFrame<"u"&&D instanceof VideoFrame){const Q=Math.floor(se*oe.width),Le=Math.floor(se*oe.height);d===void 0&&(d=m(Q,Le));const ve=y?m(Q,Le):d;return ve.width=Q,ve.height=Le,ve.getContext("2d").drawImage(D,0,0,Q,Le),Ke("WebGLRenderer: Texture has been resized from ("+oe.width+"x"+oe.height+") to ("+Q+"x"+Le+")."),ve}else return"data"in D&&Ke("WebGLRenderer: Image in DataTexture is too big ("+oe.width+"x"+oe.height+")."),D;return D}function x(D){return D.generateMipmaps}function h(D){n.generateMipmap(D)}function w(D){return D.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:D.isWebGL3DRenderTarget?n.TEXTURE_3D:D.isWebGLArrayRenderTarget||D.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function R(D,y,q,se,oe=!1){if(D!==null){if(n[D]!==void 0)return n[D];Ke("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+D+"'")}let Q=y;if(y===n.RED&&(q===n.FLOAT&&(Q=n.R32F),q===n.HALF_FLOAT&&(Q=n.R16F),q===n.UNSIGNED_BYTE&&(Q=n.R8)),y===n.RED_INTEGER&&(q===n.UNSIGNED_BYTE&&(Q=n.R8UI),q===n.UNSIGNED_SHORT&&(Q=n.R16UI),q===n.UNSIGNED_INT&&(Q=n.R32UI),q===n.BYTE&&(Q=n.R8I),q===n.SHORT&&(Q=n.R16I),q===n.INT&&(Q=n.R32I)),y===n.RG&&(q===n.FLOAT&&(Q=n.RG32F),q===n.HALF_FLOAT&&(Q=n.RG16F),q===n.UNSIGNED_BYTE&&(Q=n.RG8)),y===n.RG_INTEGER&&(q===n.UNSIGNED_BYTE&&(Q=n.RG8UI),q===n.UNSIGNED_SHORT&&(Q=n.RG16UI),q===n.UNSIGNED_INT&&(Q=n.RG32UI),q===n.BYTE&&(Q=n.RG8I),q===n.SHORT&&(Q=n.RG16I),q===n.INT&&(Q=n.RG32I)),y===n.RGB_INTEGER&&(q===n.UNSIGNED_BYTE&&(Q=n.RGB8UI),q===n.UNSIGNED_SHORT&&(Q=n.RGB16UI),q===n.UNSIGNED_INT&&(Q=n.RGB32UI),q===n.BYTE&&(Q=n.RGB8I),q===n.SHORT&&(Q=n.RGB16I),q===n.INT&&(Q=n.RGB32I)),y===n.RGBA_INTEGER&&(q===n.UNSIGNED_BYTE&&(Q=n.RGBA8UI),q===n.UNSIGNED_SHORT&&(Q=n.RGBA16UI),q===n.UNSIGNED_INT&&(Q=n.RGBA32UI),q===n.BYTE&&(Q=n.RGBA8I),q===n.SHORT&&(Q=n.RGBA16I),q===n.INT&&(Q=n.RGBA32I)),y===n.RGB&&(q===n.UNSIGNED_INT_5_9_9_9_REV&&(Q=n.RGB9_E5),q===n.UNSIGNED_INT_10F_11F_11F_REV&&(Q=n.R11F_G11F_B10F)),y===n.RGBA){const Le=oe?da:pt.getTransfer(se);q===n.FLOAT&&(Q=n.RGBA32F),q===n.HALF_FLOAT&&(Q=n.RGBA16F),q===n.UNSIGNED_BYTE&&(Q=Le===Mt?n.SRGB8_ALPHA8:n.RGBA8),q===n.UNSIGNED_SHORT_4_4_4_4&&(Q=n.RGBA4),q===n.UNSIGNED_SHORT_5_5_5_1&&(Q=n.RGB5_A1)}return(Q===n.R16F||Q===n.R32F||Q===n.RG16F||Q===n.RG32F||Q===n.RGBA16F||Q===n.RGBA32F)&&e.get("EXT_color_buffer_float"),Q}function A(D,y){let q;return D?y===null||y===fs||y===xr?q=n.DEPTH24_STENCIL8:y===ci?q=n.DEPTH32F_STENCIL8:y===mr&&(q=n.DEPTH24_STENCIL8,Ke("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===fs||y===xr?q=n.DEPTH_COMPONENT24:y===ci?q=n.DEPTH_COMPONENT32F:y===mr&&(q=n.DEPTH_COMPONENT16),q}function E(D,y){return x(D)===!0||D.isFramebufferTexture&&D.minFilter!==On&&D.minFilter!==Hn?Math.log2(Math.max(y.width,y.height))+1:D.mipmaps!==void 0&&D.mipmaps.length>0?D.mipmaps.length:D.isCompressedTexture&&Array.isArray(D.image)?y.mipmaps.length:1}function v(D){const y=D.target;y.removeEventListener("dispose",v),L(y),y.isVideoTexture&&u.delete(y)}function C(D){const y=D.target;y.removeEventListener("dispose",C),b(y)}function L(D){const y=i.get(D);if(y.__webglInit===void 0)return;const q=D.source,se=f.get(q);if(se){const oe=se[y.__cacheKey];oe.usedTimes--,oe.usedTimes===0&&g(D),Object.keys(se).length===0&&f.delete(q)}i.remove(D)}function g(D){const y=i.get(D);n.deleteTexture(y.__webglTexture);const q=D.source,se=f.get(q);delete se[y.__cacheKey],o.memory.textures--}function b(D){const y=i.get(D);if(D.depthTexture&&(D.depthTexture.dispose(),i.remove(D.depthTexture)),D.isWebGLCubeRenderTarget)for(let se=0;se<6;se++){if(Array.isArray(y.__webglFramebuffer[se]))for(let oe=0;oe<y.__webglFramebuffer[se].length;oe++)n.deleteFramebuffer(y.__webglFramebuffer[se][oe]);else n.deleteFramebuffer(y.__webglFramebuffer[se]);y.__webglDepthbuffer&&n.deleteRenderbuffer(y.__webglDepthbuffer[se])}else{if(Array.isArray(y.__webglFramebuffer))for(let se=0;se<y.__webglFramebuffer.length;se++)n.deleteFramebuffer(y.__webglFramebuffer[se]);else n.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&n.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&n.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let se=0;se<y.__webglColorRenderbuffer.length;se++)y.__webglColorRenderbuffer[se]&&n.deleteRenderbuffer(y.__webglColorRenderbuffer[se]);y.__webglDepthRenderbuffer&&n.deleteRenderbuffer(y.__webglDepthRenderbuffer)}const q=D.textures;for(let se=0,oe=q.length;se<oe;se++){const Q=i.get(q[se]);Q.__webglTexture&&(n.deleteTexture(Q.__webglTexture),o.memory.textures--),i.remove(q[se])}i.remove(D)}let P=0;function N(){P=0}function I(){const D=P;return D>=s.maxTextures&&Ke("WebGLTextures: Trying to use "+D+" texture units while this GPU supports only "+s.maxTextures),P+=1,D}function H(D){const y=[];return y.push(D.wrapS),y.push(D.wrapT),y.push(D.wrapR||0),y.push(D.magFilter),y.push(D.minFilter),y.push(D.anisotropy),y.push(D.internalFormat),y.push(D.format),y.push(D.type),y.push(D.generateMipmaps),y.push(D.premultiplyAlpha),y.push(D.flipY),y.push(D.unpackAlignment),y.push(D.colorSpace),y.join()}function X(D,y){const q=i.get(D);if(D.isVideoTexture&&Rt(D),D.isRenderTargetTexture===!1&&D.isExternalTexture!==!0&&D.version>0&&q.__version!==D.version){const se=D.image;if(se===null)Ke("WebGLRenderer: Texture marked for update but no image data found.");else if(se.complete===!1)Ke("WebGLRenderer: Texture marked for update but image is incomplete");else{ne(q,D,y);return}}else D.isExternalTexture&&(q.__webglTexture=D.sourceTexture?D.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,q.__webglTexture,n.TEXTURE0+y)}function Z(D,y){const q=i.get(D);if(D.isRenderTargetTexture===!1&&D.version>0&&q.__version!==D.version){ne(q,D,y);return}else D.isExternalTexture&&(q.__webglTexture=D.sourceTexture?D.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,q.__webglTexture,n.TEXTURE0+y)}function re(D,y){const q=i.get(D);if(D.isRenderTargetTexture===!1&&D.version>0&&q.__version!==D.version){ne(q,D,y);return}t.bindTexture(n.TEXTURE_3D,q.__webglTexture,n.TEXTURE0+y)}function K(D,y){const q=i.get(D);if(D.version>0&&q.__version!==D.version){ce(q,D,y);return}t.bindTexture(n.TEXTURE_CUBE_MAP,q.__webglTexture,n.TEXTURE0+y)}const ie={[ua]:n.REPEAT,[Mi]:n.CLAMP_TO_EDGE,[Fo]:n.MIRRORED_REPEAT},te={[On]:n.NEAREST,[vf]:n.NEAREST_MIPMAP_NEAREST,[Pr]:n.NEAREST_MIPMAP_LINEAR,[Hn]:n.LINEAR,[Fa]:n.LINEAR_MIPMAP_NEAREST,[us]:n.LINEAR_MIPMAP_LINEAR},pe={[Sf]:n.NEVER,[Cf]:n.ALWAYS,[Ef]:n.LESS,[Uu]:n.LEQUAL,[Tf]:n.EQUAL,[Rf]:n.GEQUAL,[wf]:n.GREATER,[Af]:n.NOTEQUAL};function Pe(D,y){if(y.type===ci&&e.has("OES_texture_float_linear")===!1&&(y.magFilter===Hn||y.magFilter===Fa||y.magFilter===Pr||y.magFilter===us||y.minFilter===Hn||y.minFilter===Fa||y.minFilter===Pr||y.minFilter===us)&&Ke("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(D,n.TEXTURE_WRAP_S,ie[y.wrapS]),n.texParameteri(D,n.TEXTURE_WRAP_T,ie[y.wrapT]),(D===n.TEXTURE_3D||D===n.TEXTURE_2D_ARRAY)&&n.texParameteri(D,n.TEXTURE_WRAP_R,ie[y.wrapR]),n.texParameteri(D,n.TEXTURE_MAG_FILTER,te[y.magFilter]),n.texParameteri(D,n.TEXTURE_MIN_FILTER,te[y.minFilter]),y.compareFunction&&(n.texParameteri(D,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(D,n.TEXTURE_COMPARE_FUNC,pe[y.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===On||y.minFilter!==Pr&&y.minFilter!==us||y.type===ci&&e.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||i.get(y).__currentAnisotropy){const q=e.get("EXT_texture_filter_anisotropic");n.texParameterf(D,q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,s.getMaxAnisotropy())),i.get(y).__currentAnisotropy=y.anisotropy}}}function ze(D,y){let q=!1;D.__webglInit===void 0&&(D.__webglInit=!0,y.addEventListener("dispose",v));const se=y.source;let oe=f.get(se);oe===void 0&&(oe={},f.set(se,oe));const Q=H(y);if(Q!==D.__cacheKey){oe[Q]===void 0&&(oe[Q]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,q=!0),oe[Q].usedTimes++;const Le=oe[D.__cacheKey];Le!==void 0&&(oe[D.__cacheKey].usedTimes--,Le.usedTimes===0&&g(y)),D.__cacheKey=Q,D.__webglTexture=oe[Q].texture}return q}function He(D,y,q){return Math.floor(Math.floor(D/q)/y)}function ut(D,y,q,se){const Q=D.updateRanges;if(Q.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,y.width,y.height,q,se,y.data);else{Q.sort((le,fe)=>le.start-fe.start);let Le=0;for(let le=1;le<Q.length;le++){const fe=Q[Le],Ge=Q[le],ke=fe.start+fe.count,ee=He(Ge.start,y.width,4),qe=He(fe.start,y.width,4);Ge.start<=ke+1&&ee===qe&&He(Ge.start+Ge.count-1,y.width,4)===ee?fe.count=Math.max(fe.count,Ge.start+Ge.count-fe.start):(++Le,Q[Le]=Ge)}Q.length=Le+1;const ve=n.getParameter(n.UNPACK_ROW_LENGTH),Be=n.getParameter(n.UNPACK_SKIP_PIXELS),De=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,y.width);for(let le=0,fe=Q.length;le<fe;le++){const Ge=Q[le],ke=Math.floor(Ge.start/4),ee=Math.ceil(Ge.count/4),qe=ke%y.width,z=Math.floor(ke/y.width),ge=ee,me=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,qe),n.pixelStorei(n.UNPACK_SKIP_ROWS,z),t.texSubImage2D(n.TEXTURE_2D,0,qe,z,ge,me,q,se,y.data)}D.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,ve),n.pixelStorei(n.UNPACK_SKIP_PIXELS,Be),n.pixelStorei(n.UNPACK_SKIP_ROWS,De)}}function ne(D,y,q){let se=n.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(se=n.TEXTURE_2D_ARRAY),y.isData3DTexture&&(se=n.TEXTURE_3D);const oe=ze(D,y),Q=y.source;t.bindTexture(se,D.__webglTexture,n.TEXTURE0+q);const Le=i.get(Q);if(Q.version!==Le.__version||oe===!0){t.activeTexture(n.TEXTURE0+q);const ve=pt.getPrimaries(pt.workingColorSpace),Be=y.colorSpace===Gi?null:pt.getPrimaries(y.colorSpace),De=y.colorSpace===Gi||ve===Be?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,y.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,y.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,De);let le=_(y.image,!1,s.maxTextureSize);le=Ne(y,le);const fe=r.convert(y.format,y.colorSpace),Ge=r.convert(y.type);let ke=R(y.internalFormat,fe,Ge,y.colorSpace,y.isVideoTexture);Pe(se,y);let ee;const qe=y.mipmaps,z=y.isVideoTexture!==!0,ge=Le.__version===void 0||oe===!0,me=Q.dataReady,xe=E(y,le);if(y.isDepthTexture)ke=A(y.format===_r,y.type),ge&&(z?t.texStorage2D(n.TEXTURE_2D,1,ke,le.width,le.height):t.texImage2D(n.TEXTURE_2D,0,ke,le.width,le.height,0,fe,Ge,null));else if(y.isDataTexture)if(qe.length>0){z&&ge&&t.texStorage2D(n.TEXTURE_2D,xe,ke,qe[0].width,qe[0].height);for(let ue=0,ae=qe.length;ue<ae;ue++)ee=qe[ue],z?me&&t.texSubImage2D(n.TEXTURE_2D,ue,0,0,ee.width,ee.height,fe,Ge,ee.data):t.texImage2D(n.TEXTURE_2D,ue,ke,ee.width,ee.height,0,fe,Ge,ee.data);y.generateMipmaps=!1}else z?(ge&&t.texStorage2D(n.TEXTURE_2D,xe,ke,le.width,le.height),me&&ut(y,le,fe,Ge)):t.texImage2D(n.TEXTURE_2D,0,ke,le.width,le.height,0,fe,Ge,le.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){z&&ge&&t.texStorage3D(n.TEXTURE_2D_ARRAY,xe,ke,qe[0].width,qe[0].height,le.depth);for(let ue=0,ae=qe.length;ue<ae;ue++)if(ee=qe[ue],y.format!==Zn)if(fe!==null)if(z){if(me)if(y.layerUpdates.size>0){const we=Nl(ee.width,ee.height,y.format,y.type);for(const We of y.layerUpdates){const dt=ee.data.subarray(We*we/ee.data.BYTES_PER_ELEMENT,(We+1)*we/ee.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ue,0,0,We,ee.width,ee.height,1,fe,dt)}y.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ue,0,0,0,ee.width,ee.height,le.depth,fe,ee.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ue,ke,ee.width,ee.height,le.depth,0,ee.data,0,0);else Ke("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else z?me&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,ue,0,0,0,ee.width,ee.height,le.depth,fe,Ge,ee.data):t.texImage3D(n.TEXTURE_2D_ARRAY,ue,ke,ee.width,ee.height,le.depth,0,fe,Ge,ee.data)}else{z&&ge&&t.texStorage2D(n.TEXTURE_2D,xe,ke,qe[0].width,qe[0].height);for(let ue=0,ae=qe.length;ue<ae;ue++)ee=qe[ue],y.format!==Zn?fe!==null?z?me&&t.compressedTexSubImage2D(n.TEXTURE_2D,ue,0,0,ee.width,ee.height,fe,ee.data):t.compressedTexImage2D(n.TEXTURE_2D,ue,ke,ee.width,ee.height,0,ee.data):Ke("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):z?me&&t.texSubImage2D(n.TEXTURE_2D,ue,0,0,ee.width,ee.height,fe,Ge,ee.data):t.texImage2D(n.TEXTURE_2D,ue,ke,ee.width,ee.height,0,fe,Ge,ee.data)}else if(y.isDataArrayTexture)if(z){if(ge&&t.texStorage3D(n.TEXTURE_2D_ARRAY,xe,ke,le.width,le.height,le.depth),me)if(y.layerUpdates.size>0){const ue=Nl(le.width,le.height,y.format,y.type);for(const ae of y.layerUpdates){const we=le.data.subarray(ae*ue/le.data.BYTES_PER_ELEMENT,(ae+1)*ue/le.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,ae,le.width,le.height,1,fe,Ge,we)}y.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,le.width,le.height,le.depth,fe,Ge,le.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,ke,le.width,le.height,le.depth,0,fe,Ge,le.data);else if(y.isData3DTexture)z?(ge&&t.texStorage3D(n.TEXTURE_3D,xe,ke,le.width,le.height,le.depth),me&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,le.width,le.height,le.depth,fe,Ge,le.data)):t.texImage3D(n.TEXTURE_3D,0,ke,le.width,le.height,le.depth,0,fe,Ge,le.data);else if(y.isFramebufferTexture){if(ge)if(z)t.texStorage2D(n.TEXTURE_2D,xe,ke,le.width,le.height);else{let ue=le.width,ae=le.height;for(let we=0;we<xe;we++)t.texImage2D(n.TEXTURE_2D,we,ke,ue,ae,0,fe,Ge,null),ue>>=1,ae>>=1}}else if(qe.length>0){if(z&&ge){const ue=Xe(qe[0]);t.texStorage2D(n.TEXTURE_2D,xe,ke,ue.width,ue.height)}for(let ue=0,ae=qe.length;ue<ae;ue++)ee=qe[ue],z?me&&t.texSubImage2D(n.TEXTURE_2D,ue,0,0,fe,Ge,ee):t.texImage2D(n.TEXTURE_2D,ue,ke,fe,Ge,ee);y.generateMipmaps=!1}else if(z){if(ge){const ue=Xe(le);t.texStorage2D(n.TEXTURE_2D,xe,ke,ue.width,ue.height)}me&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,fe,Ge,le)}else t.texImage2D(n.TEXTURE_2D,0,ke,fe,Ge,le);x(y)&&h(se),Le.__version=Q.version,y.onUpdate&&y.onUpdate(y)}D.__version=y.version}function ce(D,y,q){if(y.image.length!==6)return;const se=ze(D,y),oe=y.source;t.bindTexture(n.TEXTURE_CUBE_MAP,D.__webglTexture,n.TEXTURE0+q);const Q=i.get(oe);if(oe.version!==Q.__version||se===!0){t.activeTexture(n.TEXTURE0+q);const Le=pt.getPrimaries(pt.workingColorSpace),ve=y.colorSpace===Gi?null:pt.getPrimaries(y.colorSpace),Be=y.colorSpace===Gi||Le===ve?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,y.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,y.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Be);const De=y.isCompressedTexture||y.image[0].isCompressedTexture,le=y.image[0]&&y.image[0].isDataTexture,fe=[];for(let ae=0;ae<6;ae++)!De&&!le?fe[ae]=_(y.image[ae],!0,s.maxCubemapSize):fe[ae]=le?y.image[ae].image:y.image[ae],fe[ae]=Ne(y,fe[ae]);const Ge=fe[0],ke=r.convert(y.format,y.colorSpace),ee=r.convert(y.type),qe=R(y.internalFormat,ke,ee,y.colorSpace),z=y.isVideoTexture!==!0,ge=Q.__version===void 0||se===!0,me=oe.dataReady;let xe=E(y,Ge);Pe(n.TEXTURE_CUBE_MAP,y);let ue;if(De){z&&ge&&t.texStorage2D(n.TEXTURE_CUBE_MAP,xe,qe,Ge.width,Ge.height);for(let ae=0;ae<6;ae++){ue=fe[ae].mipmaps;for(let we=0;we<ue.length;we++){const We=ue[we];y.format!==Zn?ke!==null?z?me&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,we,0,0,We.width,We.height,ke,We.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,we,qe,We.width,We.height,0,We.data):Ke("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):z?me&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,we,0,0,We.width,We.height,ke,ee,We.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,we,qe,We.width,We.height,0,ke,ee,We.data)}}}else{if(ue=y.mipmaps,z&&ge){ue.length>0&&xe++;const ae=Xe(fe[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,xe,qe,ae.width,ae.height)}for(let ae=0;ae<6;ae++)if(le){z?me&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,fe[ae].width,fe[ae].height,ke,ee,fe[ae].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,qe,fe[ae].width,fe[ae].height,0,ke,ee,fe[ae].data);for(let we=0;we<ue.length;we++){const dt=ue[we].image[ae].image;z?me&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,we+1,0,0,dt.width,dt.height,ke,ee,dt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,we+1,qe,dt.width,dt.height,0,ke,ee,dt.data)}}else{z?me&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,ke,ee,fe[ae]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,qe,ke,ee,fe[ae]);for(let we=0;we<ue.length;we++){const We=ue[we];z?me&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,we+1,0,0,ke,ee,We.image[ae]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,we+1,qe,ke,ee,We.image[ae])}}}x(y)&&h(n.TEXTURE_CUBE_MAP),Q.__version=oe.version,y.onUpdate&&y.onUpdate(y)}D.__version=y.version}function Ae(D,y,q,se,oe,Q){const Le=r.convert(q.format,q.colorSpace),ve=r.convert(q.type),Be=R(q.internalFormat,Le,ve,q.colorSpace),De=i.get(y),le=i.get(q);if(le.__renderTarget=y,!De.__hasExternalTextures){const fe=Math.max(1,y.width>>Q),Ge=Math.max(1,y.height>>Q);oe===n.TEXTURE_3D||oe===n.TEXTURE_2D_ARRAY?t.texImage3D(oe,Q,Be,fe,Ge,y.depth,0,Le,ve,null):t.texImage2D(oe,Q,Be,fe,Ge,0,Le,ve,null)}t.bindFramebuffer(n.FRAMEBUFFER,D),Te(y)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,se,oe,le.__webglTexture,0,_t(y)):(oe===n.TEXTURE_2D||oe>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&oe<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,se,oe,le.__webglTexture,Q),t.bindFramebuffer(n.FRAMEBUFFER,null)}function Ye(D,y,q){if(n.bindRenderbuffer(n.RENDERBUFFER,D),y.depthBuffer){const se=y.depthTexture,oe=se&&se.isDepthTexture?se.type:null,Q=A(y.stencilBuffer,oe),Le=y.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ve=_t(y);Te(y)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ve,Q,y.width,y.height):q?n.renderbufferStorageMultisample(n.RENDERBUFFER,ve,Q,y.width,y.height):n.renderbufferStorage(n.RENDERBUFFER,Q,y.width,y.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Le,n.RENDERBUFFER,D)}else{const se=y.textures;for(let oe=0;oe<se.length;oe++){const Q=se[oe],Le=r.convert(Q.format,Q.colorSpace),ve=r.convert(Q.type),Be=R(Q.internalFormat,Le,ve,Q.colorSpace),De=_t(y);q&&Te(y)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,De,Be,y.width,y.height):Te(y)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,De,Be,y.width,y.height):n.renderbufferStorage(n.RENDERBUFFER,Be,y.width,y.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Ue(D,y){if(y&&y.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,D),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const se=i.get(y.depthTexture);se.__renderTarget=y,(!se.__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),X(y.depthTexture,0);const oe=se.__webglTexture,Q=_t(y);if(y.depthTexture.format===gr)Te(y)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,oe,0,Q):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,oe,0);else if(y.depthTexture.format===_r)Te(y)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,oe,0,Q):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,oe,0);else throw new Error("Unknown depthTexture format")}function Qe(D){const y=i.get(D),q=D.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==D.depthTexture){const se=D.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),se){const oe=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,se.removeEventListener("dispose",oe)};se.addEventListener("dispose",oe),y.__depthDisposeCallback=oe}y.__boundDepthTexture=se}if(D.depthTexture&&!y.__autoAllocateDepthBuffer){if(q)throw new Error("target.depthTexture not supported in Cube render targets");const se=D.texture.mipmaps;se&&se.length>0?Ue(y.__webglFramebuffer[0],D):Ue(y.__webglFramebuffer,D)}else if(q){y.__webglDepthbuffer=[];for(let se=0;se<6;se++)if(t.bindFramebuffer(n.FRAMEBUFFER,y.__webglFramebuffer[se]),y.__webglDepthbuffer[se]===void 0)y.__webglDepthbuffer[se]=n.createRenderbuffer(),Ye(y.__webglDepthbuffer[se],D,!1);else{const oe=D.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Q=y.__webglDepthbuffer[se];n.bindRenderbuffer(n.RENDERBUFFER,Q),n.framebufferRenderbuffer(n.FRAMEBUFFER,oe,n.RENDERBUFFER,Q)}}else{const se=D.texture.mipmaps;if(se&&se.length>0?t.bindFramebuffer(n.FRAMEBUFFER,y.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=n.createRenderbuffer(),Ye(y.__webglDepthbuffer,D,!1);else{const oe=D.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Q=y.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,Q),n.framebufferRenderbuffer(n.FRAMEBUFFER,oe,n.RENDERBUFFER,Q)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function kt(D,y,q){const se=i.get(D);y!==void 0&&Ae(se.__webglFramebuffer,D,D.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),q!==void 0&&Qe(D)}function et(D){const y=D.texture,q=i.get(D),se=i.get(y);D.addEventListener("dispose",C);const oe=D.textures,Q=D.isWebGLCubeRenderTarget===!0,Le=oe.length>1;if(Le||(se.__webglTexture===void 0&&(se.__webglTexture=n.createTexture()),se.__version=y.version,o.memory.textures++),Q){q.__webglFramebuffer=[];for(let ve=0;ve<6;ve++)if(y.mipmaps&&y.mipmaps.length>0){q.__webglFramebuffer[ve]=[];for(let Be=0;Be<y.mipmaps.length;Be++)q.__webglFramebuffer[ve][Be]=n.createFramebuffer()}else q.__webglFramebuffer[ve]=n.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){q.__webglFramebuffer=[];for(let ve=0;ve<y.mipmaps.length;ve++)q.__webglFramebuffer[ve]=n.createFramebuffer()}else q.__webglFramebuffer=n.createFramebuffer();if(Le)for(let ve=0,Be=oe.length;ve<Be;ve++){const De=i.get(oe[ve]);De.__webglTexture===void 0&&(De.__webglTexture=n.createTexture(),o.memory.textures++)}if(D.samples>0&&Te(D)===!1){q.__webglMultisampledFramebuffer=n.createFramebuffer(),q.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,q.__webglMultisampledFramebuffer);for(let ve=0;ve<oe.length;ve++){const Be=oe[ve];q.__webglColorRenderbuffer[ve]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,q.__webglColorRenderbuffer[ve]);const De=r.convert(Be.format,Be.colorSpace),le=r.convert(Be.type),fe=R(Be.internalFormat,De,le,Be.colorSpace,D.isXRRenderTarget===!0),Ge=_t(D);n.renderbufferStorageMultisample(n.RENDERBUFFER,Ge,fe,D.width,D.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ve,n.RENDERBUFFER,q.__webglColorRenderbuffer[ve])}n.bindRenderbuffer(n.RENDERBUFFER,null),D.depthBuffer&&(q.__webglDepthRenderbuffer=n.createRenderbuffer(),Ye(q.__webglDepthRenderbuffer,D,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(Q){t.bindTexture(n.TEXTURE_CUBE_MAP,se.__webglTexture),Pe(n.TEXTURE_CUBE_MAP,y);for(let ve=0;ve<6;ve++)if(y.mipmaps&&y.mipmaps.length>0)for(let Be=0;Be<y.mipmaps.length;Be++)Ae(q.__webglFramebuffer[ve][Be],D,y,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ve,Be);else Ae(q.__webglFramebuffer[ve],D,y,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0);x(y)&&h(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Le){for(let ve=0,Be=oe.length;ve<Be;ve++){const De=oe[ve],le=i.get(De);let fe=n.TEXTURE_2D;(D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(fe=D.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(fe,le.__webglTexture),Pe(fe,De),Ae(q.__webglFramebuffer,D,De,n.COLOR_ATTACHMENT0+ve,fe,0),x(De)&&h(fe)}t.unbindTexture()}else{let ve=n.TEXTURE_2D;if((D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(ve=D.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ve,se.__webglTexture),Pe(ve,y),y.mipmaps&&y.mipmaps.length>0)for(let Be=0;Be<y.mipmaps.length;Be++)Ae(q.__webglFramebuffer[Be],D,y,n.COLOR_ATTACHMENT0,ve,Be);else Ae(q.__webglFramebuffer,D,y,n.COLOR_ATTACHMENT0,ve,0);x(y)&&h(ve),t.unbindTexture()}D.depthBuffer&&Qe(D)}function Tt(D){const y=D.textures;for(let q=0,se=y.length;q<se;q++){const oe=y[q];if(x(oe)){const Q=w(D),Le=i.get(oe).__webglTexture;t.bindTexture(Q,Le),h(Q),t.unbindTexture()}}}const O=[],tt=[];function nt(D){if(D.samples>0){if(Te(D)===!1){const y=D.textures,q=D.width,se=D.height;let oe=n.COLOR_BUFFER_BIT;const Q=D.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Le=i.get(D),ve=y.length>1;if(ve)for(let De=0;De<y.length;De++)t.bindFramebuffer(n.FRAMEBUFFER,Le.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+De,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,Le.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+De,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,Le.__webglMultisampledFramebuffer);const Be=D.texture.mipmaps;Be&&Be.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Le.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Le.__webglFramebuffer);for(let De=0;De<y.length;De++){if(D.resolveDepthBuffer&&(D.depthBuffer&&(oe|=n.DEPTH_BUFFER_BIT),D.stencilBuffer&&D.resolveStencilBuffer&&(oe|=n.STENCIL_BUFFER_BIT)),ve){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Le.__webglColorRenderbuffer[De]);const le=i.get(y[De]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,le,0)}n.blitFramebuffer(0,0,q,se,0,0,q,se,oe,n.NEAREST),c===!0&&(O.length=0,tt.length=0,O.push(n.COLOR_ATTACHMENT0+De),D.depthBuffer&&D.resolveDepthBuffer===!1&&(O.push(Q),tt.push(Q),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,tt)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,O))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),ve)for(let De=0;De<y.length;De++){t.bindFramebuffer(n.FRAMEBUFFER,Le.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+De,n.RENDERBUFFER,Le.__webglColorRenderbuffer[De]);const le=i.get(y[De]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,Le.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+De,n.TEXTURE_2D,le,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Le.__webglMultisampledFramebuffer)}else if(D.depthBuffer&&D.resolveDepthBuffer===!1&&c){const y=D.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[y])}}}function _t(D){return Math.min(s.maxSamples,D.samples)}function Te(D){const y=i.get(D);return D.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function Rt(D){const y=o.render.frame;u.get(D)!==y&&(u.set(D,y),D.update())}function Ne(D,y){const q=D.colorSpace,se=D.format,oe=D.type;return D.isCompressedTexture===!0||D.isVideoTexture===!0||q!==qs&&q!==Gi&&(pt.getTransfer(q)===Mt?(se!==Zn||oe!==ui)&&Ke("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ot("WebGLTextures: Unsupported texture color space:",q)),y}function Xe(D){return typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement?(l.width=D.naturalWidth||D.width,l.height=D.naturalHeight||D.height):typeof VideoFrame<"u"&&D instanceof VideoFrame?(l.width=D.displayWidth,l.height=D.displayHeight):(l.width=D.width,l.height=D.height),l}this.allocateTextureUnit=I,this.resetTextureUnits=N,this.setTexture2D=X,this.setTexture2DArray=Z,this.setTexture3D=re,this.setTextureCube=K,this.rebindTextures=kt,this.setupRenderTarget=et,this.updateRenderTargetMipmap=Tt,this.updateMultisampleRenderTarget=nt,this.setupDepthRenderbuffer=Qe,this.setupFrameBufferTexture=Ae,this.useMultisampledRTT=Te}function Kx(n,e){function t(i,s=Gi){let r;const o=pt.getTransfer(s);if(i===ui)return n.UNSIGNED_BYTE;if(i===yc)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Mc)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Cu)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Pu)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Au)return n.BYTE;if(i===Ru)return n.SHORT;if(i===mr)return n.UNSIGNED_SHORT;if(i===bc)return n.INT;if(i===fs)return n.UNSIGNED_INT;if(i===ci)return n.FLOAT;if(i===Ks)return n.HALF_FLOAT;if(i===Lu)return n.ALPHA;if(i===Du)return n.RGB;if(i===Zn)return n.RGBA;if(i===gr)return n.DEPTH_COMPONENT;if(i===_r)return n.DEPTH_STENCIL;if(i===Sc)return n.RED;if(i===Ec)return n.RED_INTEGER;if(i===Tc)return n.RG;if(i===wc)return n.RG_INTEGER;if(i===Ac)return n.RGBA_INTEGER;if(i===ta||i===na||i===ia||i===sa)if(o===Mt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===ta)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===na)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===ia)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===sa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===ta)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===na)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===ia)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===sa)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===No||i===Oo||i===zo||i===Bo)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===No)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Oo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===zo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Bo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===ko||i===Vo||i===Go)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===ko||i===Vo)return o===Mt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Go)return o===Mt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Ho||i===Wo||i===$o||i===qo||i===Xo||i===jo||i===Yo||i===Ko||i===Zo||i===Jo||i===Qo||i===ec||i===tc||i===nc)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Ho)return o===Mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Wo)return o===Mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===$o)return o===Mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===qo)return o===Mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Xo)return o===Mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===jo)return o===Mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Yo)return o===Mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Ko)return o===Mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Zo)return o===Mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Jo)return o===Mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Qo)return o===Mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===ec)return o===Mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===tc)return o===Mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===nc)return o===Mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===ic||i===sc||i===rc)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===ic)return o===Mt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===sc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===rc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===ac||i===oc||i===cc||i===lc)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===ac)return r.COMPRESSED_RED_RGTC1_EXT;if(i===oc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===cc)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===lc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===xr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const Zx=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Jx=`
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

}`;class Qx{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new Xu(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new Ci({vertexShader:Zx,fragmentShader:Jx,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new _n(new js(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class eg extends Zs{constructor(e,t){super();const i=this;let s=null,r=1,o=null,a="local-floor",c=1,l=null,u=null,d=null,f=null,p=null,m=null;const _=typeof XRWebGLBinding<"u",x=new Qx,h={},w=t.getContextAttributes();let R=null,A=null;const E=[],v=[],C=new st;let L=null;const g=new Sn;g.viewport=new St;const b=new Sn;b.viewport=new St;const P=[g,b],N=new _h;let I=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ne){let ce=E[ne];return ce===void 0&&(ce=new so,E[ne]=ce),ce.getTargetRaySpace()},this.getControllerGrip=function(ne){let ce=E[ne];return ce===void 0&&(ce=new so,E[ne]=ce),ce.getGripSpace()},this.getHand=function(ne){let ce=E[ne];return ce===void 0&&(ce=new so,E[ne]=ce),ce.getHandSpace()};function X(ne){const ce=v.indexOf(ne.inputSource);if(ce===-1)return;const Ae=E[ce];Ae!==void 0&&(Ae.update(ne.inputSource,ne.frame,l||o),Ae.dispatchEvent({type:ne.type,data:ne.inputSource}))}function Z(){s.removeEventListener("select",X),s.removeEventListener("selectstart",X),s.removeEventListener("selectend",X),s.removeEventListener("squeeze",X),s.removeEventListener("squeezestart",X),s.removeEventListener("squeezeend",X),s.removeEventListener("end",Z),s.removeEventListener("inputsourceschange",re);for(let ne=0;ne<E.length;ne++){const ce=v[ne];ce!==null&&(v[ne]=null,E[ne].disconnect(ce))}I=null,H=null,x.reset();for(const ne in h)delete h[ne];e.setRenderTarget(R),p=null,f=null,d=null,s=null,A=null,ut.stop(),i.isPresenting=!1,e.setPixelRatio(L),e.setSize(C.width,C.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ne){r=ne,i.isPresenting===!0&&Ke("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ne){a=ne,i.isPresenting===!0&&Ke("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(ne){l=ne},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return d===null&&_&&(d=new XRWebGLBinding(s,t)),d},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(ne){if(s=ne,s!==null){if(R=e.getRenderTarget(),s.addEventListener("select",X),s.addEventListener("selectstart",X),s.addEventListener("selectend",X),s.addEventListener("squeeze",X),s.addEventListener("squeezestart",X),s.addEventListener("squeezeend",X),s.addEventListener("end",Z),s.addEventListener("inputsourceschange",re),w.xrCompatible!==!0&&await t.makeXRCompatible(),L=e.getPixelRatio(),e.getSize(C),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let Ae=null,Ye=null,Ue=null;w.depth&&(Ue=w.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Ae=w.stencil?_r:gr,Ye=w.stencil?xr:fs);const Qe={colorFormat:t.RGBA8,depthFormat:Ue,scaleFactor:r};d=this.getBinding(),f=d.createProjectionLayer(Qe),s.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),A=new hs(f.textureWidth,f.textureHeight,{format:Zn,type:ui,depthTexture:new qu(f.textureWidth,f.textureHeight,Ye,void 0,void 0,void 0,void 0,void 0,void 0,Ae),stencilBuffer:w.stencil,colorSpace:e.outputColorSpace,samples:w.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const Ae={antialias:w.antialias,alpha:!0,depth:w.depth,stencil:w.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,t,Ae),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),A=new hs(p.framebufferWidth,p.framebufferHeight,{format:Zn,type:ui,colorSpace:e.outputColorSpace,stencilBuffer:w.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}A.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),ut.setContext(s),ut.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function re(ne){for(let ce=0;ce<ne.removed.length;ce++){const Ae=ne.removed[ce],Ye=v.indexOf(Ae);Ye>=0&&(v[Ye]=null,E[Ye].disconnect(Ae))}for(let ce=0;ce<ne.added.length;ce++){const Ae=ne.added[ce];let Ye=v.indexOf(Ae);if(Ye===-1){for(let Qe=0;Qe<E.length;Qe++)if(Qe>=v.length){v.push(Ae),Ye=Qe;break}else if(v[Qe]===null){v[Qe]=Ae,Ye=Qe;break}if(Ye===-1)break}const Ue=E[Ye];Ue&&Ue.connect(Ae)}}const K=new B,ie=new B;function te(ne,ce,Ae){K.setFromMatrixPosition(ce.matrixWorld),ie.setFromMatrixPosition(Ae.matrixWorld);const Ye=K.distanceTo(ie),Ue=ce.projectionMatrix.elements,Qe=Ae.projectionMatrix.elements,kt=Ue[14]/(Ue[10]-1),et=Ue[14]/(Ue[10]+1),Tt=(Ue[9]+1)/Ue[5],O=(Ue[9]-1)/Ue[5],tt=(Ue[8]-1)/Ue[0],nt=(Qe[8]+1)/Qe[0],_t=kt*tt,Te=kt*nt,Rt=Ye/(-tt+nt),Ne=Rt*-tt;if(ce.matrixWorld.decompose(ne.position,ne.quaternion,ne.scale),ne.translateX(Ne),ne.translateZ(Rt),ne.matrixWorld.compose(ne.position,ne.quaternion,ne.scale),ne.matrixWorldInverse.copy(ne.matrixWorld).invert(),Ue[10]===-1)ne.projectionMatrix.copy(ce.projectionMatrix),ne.projectionMatrixInverse.copy(ce.projectionMatrixInverse);else{const Xe=kt+Rt,D=et+Rt,y=_t-Ne,q=Te+(Ye-Ne),se=Tt*et/D*Xe,oe=O*et/D*Xe;ne.projectionMatrix.makePerspective(y,q,se,oe,Xe,D),ne.projectionMatrixInverse.copy(ne.projectionMatrix).invert()}}function pe(ne,ce){ce===null?ne.matrixWorld.copy(ne.matrix):ne.matrixWorld.multiplyMatrices(ce.matrixWorld,ne.matrix),ne.matrixWorldInverse.copy(ne.matrixWorld).invert()}this.updateCamera=function(ne){if(s===null)return;let ce=ne.near,Ae=ne.far;x.texture!==null&&(x.depthNear>0&&(ce=x.depthNear),x.depthFar>0&&(Ae=x.depthFar)),N.near=b.near=g.near=ce,N.far=b.far=g.far=Ae,(I!==N.near||H!==N.far)&&(s.updateRenderState({depthNear:N.near,depthFar:N.far}),I=N.near,H=N.far),N.layers.mask=ne.layers.mask|6,g.layers.mask=N.layers.mask&3,b.layers.mask=N.layers.mask&5;const Ye=ne.parent,Ue=N.cameras;pe(N,Ye);for(let Qe=0;Qe<Ue.length;Qe++)pe(Ue[Qe],Ye);Ue.length===2?te(N,g,b):N.projectionMatrix.copy(g.projectionMatrix),Pe(ne,N,Ye)};function Pe(ne,ce,Ae){Ae===null?ne.matrix.copy(ce.matrixWorld):(ne.matrix.copy(Ae.matrixWorld),ne.matrix.invert(),ne.matrix.multiply(ce.matrixWorld)),ne.matrix.decompose(ne.position,ne.quaternion,ne.scale),ne.updateMatrixWorld(!0),ne.projectionMatrix.copy(ce.projectionMatrix),ne.projectionMatrixInverse.copy(ce.projectionMatrixInverse),ne.isPerspectiveCamera&&(ne.fov=pa*2*Math.atan(1/ne.projectionMatrix.elements[5]),ne.zoom=1)}this.getCamera=function(){return N},this.getFoveation=function(){if(!(f===null&&p===null))return c},this.setFoveation=function(ne){c=ne,f!==null&&(f.fixedFoveation=ne),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=ne)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(N)},this.getCameraTexture=function(ne){return h[ne]};let ze=null;function He(ne,ce){if(u=ce.getViewerPose(l||o),m=ce,u!==null){const Ae=u.views;p!==null&&(e.setRenderTargetFramebuffer(A,p.framebuffer),e.setRenderTarget(A));let Ye=!1;Ae.length!==N.cameras.length&&(N.cameras.length=0,Ye=!0);for(let et=0;et<Ae.length;et++){const Tt=Ae[et];let O=null;if(p!==null)O=p.getViewport(Tt);else{const nt=d.getViewSubImage(f,Tt);O=nt.viewport,et===0&&(e.setRenderTargetTextures(A,nt.colorTexture,nt.depthStencilTexture),e.setRenderTarget(A))}let tt=P[et];tt===void 0&&(tt=new Sn,tt.layers.enable(et),tt.viewport=new St,P[et]=tt),tt.matrix.fromArray(Tt.transform.matrix),tt.matrix.decompose(tt.position,tt.quaternion,tt.scale),tt.projectionMatrix.fromArray(Tt.projectionMatrix),tt.projectionMatrixInverse.copy(tt.projectionMatrix).invert(),tt.viewport.set(O.x,O.y,O.width,O.height),et===0&&(N.matrix.copy(tt.matrix),N.matrix.decompose(N.position,N.quaternion,N.scale)),Ye===!0&&N.cameras.push(tt)}const Ue=s.enabledFeatures;if(Ue&&Ue.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&_){d=i.getBinding();const et=d.getDepthInformation(Ae[0]);et&&et.isValid&&et.texture&&x.init(et,s.renderState)}if(Ue&&Ue.includes("camera-access")&&_){e.state.unbindTexture(),d=i.getBinding();for(let et=0;et<Ae.length;et++){const Tt=Ae[et].camera;if(Tt){let O=h[Tt];O||(O=new Xu,h[Tt]=O);const tt=d.getCameraImage(Tt);O.sourceTexture=tt}}}}for(let Ae=0;Ae<E.length;Ae++){const Ye=v[Ae],Ue=E[Ae];Ye!==null&&Ue!==void 0&&Ue.update(Ye,ce,l||o)}ze&&ze(ne,ce),ce.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ce}),m=null}const ut=new Yu;ut.setAnimationLoop(He),this.setAnimationLoop=function(ne){ze=ne},this.dispose=function(){}}}const os=new ei,tg=new vt;function ng(n,e){function t(x,h){x.matrixAutoUpdate===!0&&x.updateMatrix(),h.value.copy(x.matrix)}function i(x,h){h.color.getRGB(x.fogColor.value,ku(n)),h.isFog?(x.fogNear.value=h.near,x.fogFar.value=h.far):h.isFogExp2&&(x.fogDensity.value=h.density)}function s(x,h,w,R,A){h.isMeshBasicMaterial||h.isMeshLambertMaterial?r(x,h):h.isMeshToonMaterial?(r(x,h),d(x,h)):h.isMeshPhongMaterial?(r(x,h),u(x,h)):h.isMeshStandardMaterial?(r(x,h),f(x,h),h.isMeshPhysicalMaterial&&p(x,h,A)):h.isMeshMatcapMaterial?(r(x,h),m(x,h)):h.isMeshDepthMaterial?r(x,h):h.isMeshDistanceMaterial?(r(x,h),_(x,h)):h.isMeshNormalMaterial?r(x,h):h.isLineBasicMaterial?(o(x,h),h.isLineDashedMaterial&&a(x,h)):h.isPointsMaterial?c(x,h,w,R):h.isSpriteMaterial?l(x,h):h.isShadowMaterial?(x.color.value.copy(h.color),x.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function r(x,h){x.opacity.value=h.opacity,h.color&&x.diffuse.value.copy(h.color),h.emissive&&x.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(x.map.value=h.map,t(h.map,x.mapTransform)),h.alphaMap&&(x.alphaMap.value=h.alphaMap,t(h.alphaMap,x.alphaMapTransform)),h.bumpMap&&(x.bumpMap.value=h.bumpMap,t(h.bumpMap,x.bumpMapTransform),x.bumpScale.value=h.bumpScale,h.side===wn&&(x.bumpScale.value*=-1)),h.normalMap&&(x.normalMap.value=h.normalMap,t(h.normalMap,x.normalMapTransform),x.normalScale.value.copy(h.normalScale),h.side===wn&&x.normalScale.value.negate()),h.displacementMap&&(x.displacementMap.value=h.displacementMap,t(h.displacementMap,x.displacementMapTransform),x.displacementScale.value=h.displacementScale,x.displacementBias.value=h.displacementBias),h.emissiveMap&&(x.emissiveMap.value=h.emissiveMap,t(h.emissiveMap,x.emissiveMapTransform)),h.specularMap&&(x.specularMap.value=h.specularMap,t(h.specularMap,x.specularMapTransform)),h.alphaTest>0&&(x.alphaTest.value=h.alphaTest);const w=e.get(h),R=w.envMap,A=w.envMapRotation;R&&(x.envMap.value=R,os.copy(A),os.x*=-1,os.y*=-1,os.z*=-1,R.isCubeTexture&&R.isRenderTargetTexture===!1&&(os.y*=-1,os.z*=-1),x.envMapRotation.value.setFromMatrix4(tg.makeRotationFromEuler(os)),x.flipEnvMap.value=R.isCubeTexture&&R.isRenderTargetTexture===!1?-1:1,x.reflectivity.value=h.reflectivity,x.ior.value=h.ior,x.refractionRatio.value=h.refractionRatio),h.lightMap&&(x.lightMap.value=h.lightMap,x.lightMapIntensity.value=h.lightMapIntensity,t(h.lightMap,x.lightMapTransform)),h.aoMap&&(x.aoMap.value=h.aoMap,x.aoMapIntensity.value=h.aoMapIntensity,t(h.aoMap,x.aoMapTransform))}function o(x,h){x.diffuse.value.copy(h.color),x.opacity.value=h.opacity,h.map&&(x.map.value=h.map,t(h.map,x.mapTransform))}function a(x,h){x.dashSize.value=h.dashSize,x.totalSize.value=h.dashSize+h.gapSize,x.scale.value=h.scale}function c(x,h,w,R){x.diffuse.value.copy(h.color),x.opacity.value=h.opacity,x.size.value=h.size*w,x.scale.value=R*.5,h.map&&(x.map.value=h.map,t(h.map,x.uvTransform)),h.alphaMap&&(x.alphaMap.value=h.alphaMap,t(h.alphaMap,x.alphaMapTransform)),h.alphaTest>0&&(x.alphaTest.value=h.alphaTest)}function l(x,h){x.diffuse.value.copy(h.color),x.opacity.value=h.opacity,x.rotation.value=h.rotation,h.map&&(x.map.value=h.map,t(h.map,x.mapTransform)),h.alphaMap&&(x.alphaMap.value=h.alphaMap,t(h.alphaMap,x.alphaMapTransform)),h.alphaTest>0&&(x.alphaTest.value=h.alphaTest)}function u(x,h){x.specular.value.copy(h.specular),x.shininess.value=Math.max(h.shininess,1e-4)}function d(x,h){h.gradientMap&&(x.gradientMap.value=h.gradientMap)}function f(x,h){x.metalness.value=h.metalness,h.metalnessMap&&(x.metalnessMap.value=h.metalnessMap,t(h.metalnessMap,x.metalnessMapTransform)),x.roughness.value=h.roughness,h.roughnessMap&&(x.roughnessMap.value=h.roughnessMap,t(h.roughnessMap,x.roughnessMapTransform)),h.envMap&&(x.envMapIntensity.value=h.envMapIntensity)}function p(x,h,w){x.ior.value=h.ior,h.sheen>0&&(x.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),x.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(x.sheenColorMap.value=h.sheenColorMap,t(h.sheenColorMap,x.sheenColorMapTransform)),h.sheenRoughnessMap&&(x.sheenRoughnessMap.value=h.sheenRoughnessMap,t(h.sheenRoughnessMap,x.sheenRoughnessMapTransform))),h.clearcoat>0&&(x.clearcoat.value=h.clearcoat,x.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(x.clearcoatMap.value=h.clearcoatMap,t(h.clearcoatMap,x.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(x.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,t(h.clearcoatRoughnessMap,x.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(x.clearcoatNormalMap.value=h.clearcoatNormalMap,t(h.clearcoatNormalMap,x.clearcoatNormalMapTransform),x.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===wn&&x.clearcoatNormalScale.value.negate())),h.dispersion>0&&(x.dispersion.value=h.dispersion),h.iridescence>0&&(x.iridescence.value=h.iridescence,x.iridescenceIOR.value=h.iridescenceIOR,x.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],x.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(x.iridescenceMap.value=h.iridescenceMap,t(h.iridescenceMap,x.iridescenceMapTransform)),h.iridescenceThicknessMap&&(x.iridescenceThicknessMap.value=h.iridescenceThicknessMap,t(h.iridescenceThicknessMap,x.iridescenceThicknessMapTransform))),h.transmission>0&&(x.transmission.value=h.transmission,x.transmissionSamplerMap.value=w.texture,x.transmissionSamplerSize.value.set(w.width,w.height),h.transmissionMap&&(x.transmissionMap.value=h.transmissionMap,t(h.transmissionMap,x.transmissionMapTransform)),x.thickness.value=h.thickness,h.thicknessMap&&(x.thicknessMap.value=h.thicknessMap,t(h.thicknessMap,x.thicknessMapTransform)),x.attenuationDistance.value=h.attenuationDistance,x.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(x.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(x.anisotropyMap.value=h.anisotropyMap,t(h.anisotropyMap,x.anisotropyMapTransform))),x.specularIntensity.value=h.specularIntensity,x.specularColor.value.copy(h.specularColor),h.specularColorMap&&(x.specularColorMap.value=h.specularColorMap,t(h.specularColorMap,x.specularColorMapTransform)),h.specularIntensityMap&&(x.specularIntensityMap.value=h.specularIntensityMap,t(h.specularIntensityMap,x.specularIntensityMapTransform))}function m(x,h){h.matcap&&(x.matcap.value=h.matcap)}function _(x,h){const w=e.get(h).light;x.referencePosition.value.setFromMatrixPosition(w.matrixWorld),x.nearDistance.value=w.shadow.camera.near,x.farDistance.value=w.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function ig(n,e,t,i){let s={},r={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(w,R){const A=R.program;i.uniformBlockBinding(w,A)}function l(w,R){let A=s[w.id];A===void 0&&(m(w),A=u(w),s[w.id]=A,w.addEventListener("dispose",x));const E=R.program;i.updateUBOMapping(w,E);const v=e.render.frame;r[w.id]!==v&&(f(w),r[w.id]=v)}function u(w){const R=d();w.__bindingPointIndex=R;const A=n.createBuffer(),E=w.__size,v=w.usage;return n.bindBuffer(n.UNIFORM_BUFFER,A),n.bufferData(n.UNIFORM_BUFFER,E,v),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,R,A),A}function d(){for(let w=0;w<a;w++)if(o.indexOf(w)===-1)return o.push(w),w;return Ot("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(w){const R=s[w.id],A=w.uniforms,E=w.__cache;n.bindBuffer(n.UNIFORM_BUFFER,R);for(let v=0,C=A.length;v<C;v++){const L=Array.isArray(A[v])?A[v]:[A[v]];for(let g=0,b=L.length;g<b;g++){const P=L[g];if(p(P,v,g,E)===!0){const N=P.__offset,I=Array.isArray(P.value)?P.value:[P.value];let H=0;for(let X=0;X<I.length;X++){const Z=I[X],re=_(Z);typeof Z=="number"||typeof Z=="boolean"?(P.__data[0]=Z,n.bufferSubData(n.UNIFORM_BUFFER,N+H,P.__data)):Z.isMatrix3?(P.__data[0]=Z.elements[0],P.__data[1]=Z.elements[1],P.__data[2]=Z.elements[2],P.__data[3]=0,P.__data[4]=Z.elements[3],P.__data[5]=Z.elements[4],P.__data[6]=Z.elements[5],P.__data[7]=0,P.__data[8]=Z.elements[6],P.__data[9]=Z.elements[7],P.__data[10]=Z.elements[8],P.__data[11]=0):(Z.toArray(P.__data,H),H+=re.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,N,P.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(w,R,A,E){const v=w.value,C=R+"_"+A;if(E[C]===void 0)return typeof v=="number"||typeof v=="boolean"?E[C]=v:E[C]=v.clone(),!0;{const L=E[C];if(typeof v=="number"||typeof v=="boolean"){if(L!==v)return E[C]=v,!0}else if(L.equals(v)===!1)return L.copy(v),!0}return!1}function m(w){const R=w.uniforms;let A=0;const E=16;for(let C=0,L=R.length;C<L;C++){const g=Array.isArray(R[C])?R[C]:[R[C]];for(let b=0,P=g.length;b<P;b++){const N=g[b],I=Array.isArray(N.value)?N.value:[N.value];for(let H=0,X=I.length;H<X;H++){const Z=I[H],re=_(Z),K=A%E,ie=K%re.boundary,te=K+ie;A+=ie,te!==0&&E-te<re.storage&&(A+=E-te),N.__data=new Float32Array(re.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=A,A+=re.storage}}}const v=A%E;return v>0&&(A+=E-v),w.__size=A,w.__cache={},this}function _(w){const R={boundary:0,storage:0};return typeof w=="number"||typeof w=="boolean"?(R.boundary=4,R.storage=4):w.isVector2?(R.boundary=8,R.storage=8):w.isVector3||w.isColor?(R.boundary=16,R.storage=12):w.isVector4?(R.boundary=16,R.storage=16):w.isMatrix3?(R.boundary=48,R.storage=48):w.isMatrix4?(R.boundary=64,R.storage=64):w.isTexture?Ke("WebGLRenderer: Texture samplers can not be part of an uniforms group."):Ke("WebGLRenderer: Unsupported uniform value type.",w),R}function x(w){const R=w.target;R.removeEventListener("dispose",x);const A=o.indexOf(R.__bindingPointIndex);o.splice(A,1),n.deleteBuffer(s[R.id]),delete s[R.id],delete r[R.id]}function h(){for(const w in s)n.deleteBuffer(s[w]);o=[],s={},r={}}return{bind:c,update:l,dispose:h}}const sg=new Uint16Array([11481,15204,11534,15171,11808,15015,12385,14843,12894,14716,13396,14600,13693,14483,13976,14366,14237,14171,14405,13961,14511,13770,14605,13598,14687,13444,14760,13305,14822,13066,14876,12857,14923,12675,14963,12517,14997,12379,15025,12230,15049,12023,15070,11843,15086,11687,15100,11551,15111,11433,15120,11330,15127,11217,15132,11060,15135,10922,15138,10801,15139,10695,15139,10600,13012,14923,13020,14917,13064,14886,13176,14800,13349,14666,13513,14526,13724,14398,13960,14230,14200,14020,14383,13827,14488,13651,14583,13491,14667,13348,14740,13132,14803,12908,14856,12713,14901,12542,14938,12394,14968,12241,14992,12017,15010,11822,15024,11654,15034,11507,15041,11380,15044,11269,15044,11081,15042,10913,15037,10764,15031,10635,15023,10520,15014,10419,15003,10330,13657,14676,13658,14673,13670,14660,13698,14622,13750,14547,13834,14442,13956,14317,14112,14093,14291,13889,14407,13704,14499,13538,14586,13389,14664,13201,14733,12966,14792,12758,14842,12577,14882,12418,14915,12272,14940,12033,14959,11826,14972,11646,14980,11490,14983,11355,14983,11212,14979,11008,14971,10830,14961,10675,14950,10540,14936,10420,14923,10315,14909,10204,14894,10041,14089,14460,14090,14459,14096,14452,14112,14431,14141,14388,14186,14305,14252,14130,14341,13941,14399,13756,14467,13585,14539,13430,14610,13272,14677,13026,14737,12808,14790,12617,14833,12449,14869,12303,14896,12065,14916,11845,14929,11655,14937,11490,14939,11347,14936,11184,14930,10970,14921,10783,14912,10621,14900,10480,14885,10356,14867,10247,14848,10062,14827,9894,14805,9745,14400,14208,14400,14206,14402,14198,14406,14174,14415,14122,14427,14035,14444,13913,14469,13767,14504,13613,14548,13463,14598,13324,14651,13082,14704,12858,14752,12658,14795,12483,14831,12330,14860,12106,14881,11875,14895,11675,14903,11501,14905,11351,14903,11178,14900,10953,14892,10757,14880,10589,14865,10442,14847,10313,14827,10162,14805,9965,14782,9792,14757,9642,14731,9507,14562,13883,14562,13883,14563,13877,14566,13862,14570,13830,14576,13773,14584,13689,14595,13582,14613,13461,14637,13336,14668,13120,14704,12897,14741,12695,14776,12516,14808,12358,14835,12150,14856,11910,14870,11701,14878,11519,14882,11361,14884,11187,14880,10951,14871,10748,14858,10572,14842,10418,14823,10286,14801,10099,14777,9897,14751,9722,14725,9567,14696,9430,14666,9309,14702,13604,14702,13604,14702,13600,14703,13591,14705,13570,14707,13533,14709,13477,14712,13400,14718,13305,14727,13106,14743,12907,14762,12716,14784,12539,14807,12380,14827,12190,14844,11943,14855,11727,14863,11539,14870,11376,14871,11204,14868,10960,14858,10748,14845,10565,14829,10406,14809,10269,14786,10058,14761,9852,14734,9671,14705,9512,14674,9374,14641,9253,14608,9076,14821,13366,14821,13365,14821,13364,14821,13358,14821,13344,14821,13320,14819,13252,14817,13145,14815,13011,14814,12858,14817,12698,14823,12539,14832,12389,14841,12214,14850,11968,14856,11750,14861,11558,14866,11390,14867,11226,14862,10972,14853,10754,14840,10565,14823,10401,14803,10259,14780,10032,14754,9820,14725,9635,14694,9473,14661,9333,14627,9203,14593,8988,14557,8798,14923,13014,14922,13014,14922,13012,14922,13004,14920,12987,14919,12957,14915,12907,14909,12834,14902,12738,14894,12623,14888,12498,14883,12370,14880,12203,14878,11970,14875,11759,14873,11569,14874,11401,14872,11243,14865,10986,14855,10762,14842,10568,14825,10401,14804,10255,14781,10017,14754,9799,14725,9611,14692,9445,14658,9301,14623,9139,14587,8920,14548,8729,14509,8562,15008,12672,15008,12672,15008,12671,15007,12667,15005,12656,15001,12637,14997,12605,14989,12556,14978,12490,14966,12407,14953,12313,14940,12136,14927,11934,14914,11742,14903,11563,14896,11401,14889,11247,14879,10992,14866,10767,14851,10570,14833,10400,14812,10252,14789,10007,14761,9784,14731,9592,14698,9424,14663,9279,14627,9088,14588,8868,14548,8676,14508,8508,14467,8360,15080,12386,15080,12386,15079,12385,15078,12383,15076,12378,15072,12367,15066,12347,15057,12315,15045,12253,15030,12138,15012,11998,14993,11845,14972,11685,14951,11530,14935,11383,14920,11228,14904,10981,14887,10762,14870,10567,14850,10397,14827,10248,14803,9997,14774,9771,14743,9578,14710,9407,14674,9259,14637,9048,14596,8826,14555,8632,14514,8464,14471,8317,14427,8182,15139,12008,15139,12008,15138,12008,15137,12007,15135,12003,15130,11990,15124,11969,15115,11929,15102,11872,15086,11794,15064,11693,15041,11581,15013,11459,14987,11336,14966,11170,14944,10944,14921,10738,14898,10552,14875,10387,14850,10239,14824,9983,14794,9758,14762,9563,14728,9392,14692,9244,14653,9014,14611,8791,14569,8597,14526,8427,14481,8281,14436,8110,14391,7885,15188,11617,15188,11617,15187,11617,15186,11618,15183,11617,15179,11612,15173,11601,15163,11581,15150,11546,15133,11495,15110,11427,15083,11346,15051,11246,15024,11057,14996,10868,14967,10687,14938,10517,14911,10362,14882,10206,14853,9956,14821,9737,14787,9543,14752,9375,14715,9228,14675,8980,14632,8760,14589,8565,14544,8395,14498,8248,14451,8049,14404,7824,14357,7630,15228,11298,15228,11298,15227,11299,15226,11301,15223,11303,15219,11302,15213,11299,15204,11290,15191,11271,15174,11217,15150,11129,15119,11015,15087,10886,15057,10744,15024,10599,14990,10455,14957,10318,14924,10143,14891,9911,14856,9701,14820,9516,14782,9352,14744,9200,14703,8946,14659,8725,14615,8533,14568,8366,14521,8220,14472,7992,14423,7770,14374,7578,14315,7408,15260,10819,15260,10819,15259,10822,15258,10826,15256,10832,15251,10836,15246,10841,15237,10838,15225,10821,15207,10788,15183,10734,15151,10660,15120,10571,15087,10469,15049,10359,15012,10249,14974,10041,14937,9837,14900,9647,14860,9475,14820,9320,14779,9147,14736,8902,14691,8688,14646,8499,14598,8335,14549,8189,14499,7940,14448,7720,14397,7529,14347,7363,14256,7218,15285,10410,15285,10411,15285,10413,15284,10418,15282,10425,15278,10434,15272,10442,15264,10449,15252,10445,15235,10433,15210,10403,15179,10358,15149,10301,15113,10218,15073,10059,15033,9894,14991,9726,14951,9565,14909,9413,14865,9273,14822,9073,14777,8845,14730,8641,14682,8459,14633,8300,14583,8129,14531,7883,14479,7670,14426,7482,14373,7321,14305,7176,14201,6939,15305,9939,15305,9940,15305,9945,15304,9955,15302,9967,15298,9989,15293,10010,15286,10033,15274,10044,15258,10045,15233,10022,15205,9975,15174,9903,15136,9808,15095,9697,15053,9578,15009,9451,14965,9327,14918,9198,14871,8973,14825,8766,14775,8579,14725,8408,14675,8259,14622,8058,14569,7821,14515,7615,14460,7435,14405,7276,14350,7108,14256,6866,14149,6653,15321,9444,15321,9445,15321,9448,15320,9458,15317,9470,15314,9490,15310,9515,15302,9540,15292,9562,15276,9579,15251,9577,15226,9559,15195,9519,15156,9463,15116,9389,15071,9304,15025,9208,14978,9023,14927,8838,14878,8661,14827,8496,14774,8344,14722,8206,14667,7973,14612,7749,14556,7555,14499,7382,14443,7229,14385,7025,14322,6791,14210,6588,14100,6409,15333,8920,15333,8921,15332,8927,15332,8943,15329,8965,15326,9002,15322,9048,15316,9106,15307,9162,15291,9204,15267,9221,15244,9221,15212,9196,15175,9134,15133,9043,15088,8930,15040,8801,14990,8665,14938,8526,14886,8391,14830,8261,14775,8087,14719,7866,14661,7664,14603,7482,14544,7322,14485,7178,14426,6936,14367,6713,14281,6517,14166,6348,14054,6198,15341,8360,15341,8361,15341,8366,15341,8379,15339,8399,15336,8431,15332,8473,15326,8527,15318,8585,15302,8632,15281,8670,15258,8690,15227,8690,15191,8664,15149,8612,15104,8543,15055,8456,15001,8360,14948,8259,14892,8122,14834,7923,14776,7734,14716,7558,14656,7397,14595,7250,14534,7070,14472,6835,14410,6628,14350,6443,14243,6283,14125,6135,14010,5889,15348,7715,15348,7717,15348,7725,15347,7745,15345,7780,15343,7836,15339,7905,15334,8e3,15326,8103,15310,8193,15293,8239,15270,8270,15240,8287,15204,8283,15163,8260,15118,8223,15067,8143,15014,8014,14958,7873,14899,7723,14839,7573,14778,7430,14715,7293,14652,7164,14588,6931,14524,6720,14460,6531,14396,6362,14330,6210,14207,6015,14086,5781,13969,5576,15352,7114,15352,7116,15352,7128,15352,7159,15350,7195,15348,7237,15345,7299,15340,7374,15332,7457,15317,7544,15301,7633,15280,7703,15251,7754,15216,7775,15176,7767,15131,7733,15079,7670,15026,7588,14967,7492,14906,7387,14844,7278,14779,7171,14714,6965,14648,6770,14581,6587,14515,6420,14448,6269,14382,6123,14299,5881,14172,5665,14049,5477,13929,5310,15355,6329,15355,6330,15355,6339,15355,6362,15353,6410,15351,6472,15349,6572,15344,6688,15337,6835,15323,6985,15309,7142,15287,7220,15260,7277,15226,7310,15188,7326,15142,7318,15090,7285,15036,7239,14976,7177,14914,7045,14849,6892,14782,6736,14714,6581,14645,6433,14576,6293,14506,6164,14438,5946,14369,5733,14270,5540,14140,5369,14014,5216,13892,5043,15357,5483,15357,5484,15357,5496,15357,5528,15356,5597,15354,5692,15351,5835,15347,6011,15339,6195,15328,6317,15314,6446,15293,6566,15268,6668,15235,6746,15197,6796,15152,6811,15101,6790,15046,6748,14985,6673,14921,6583,14854,6479,14785,6371,14714,6259,14643,6149,14571,5946,14499,5750,14428,5567,14358,5401,14242,5250,14109,5111,13980,4870,13856,4657,15359,4555,15359,4557,15358,4573,15358,4633,15357,4715,15355,4841,15353,5061,15349,5216,15342,5391,15331,5577,15318,5770,15299,5967,15274,6150,15243,6223,15206,6280,15161,6310,15111,6317,15055,6300,14994,6262,14928,6208,14860,6141,14788,5994,14715,5838,14641,5684,14566,5529,14492,5384,14418,5247,14346,5121,14216,4892,14079,4682,13948,4496,13822,4330,15359,3498,15359,3501,15359,3520,15359,3598,15358,3719,15356,3860,15355,4137,15351,4305,15344,4563,15334,4809,15321,5116,15303,5273,15280,5418,15250,5547,15214,5653,15170,5722,15120,5761,15064,5763,15002,5733,14935,5673,14865,5597,14792,5504,14716,5400,14640,5294,14563,5185,14486,5041,14410,4841,14335,4655,14191,4482,14051,4325,13918,4183,13790,4012,15360,2282,15360,2285,15360,2306,15360,2401,15359,2547,15357,2748,15355,3103,15352,3349,15345,3675,15336,4020,15324,4272,15307,4496,15285,4716,15255,4908,15220,5086,15178,5170,15128,5214,15072,5234,15010,5231,14943,5206,14871,5166,14796,5102,14718,4971,14639,4833,14559,4687,14480,4541,14402,4401,14315,4268,14167,4142,14025,3958,13888,3747,13759,3556,15360,923,15360,925,15360,946,15360,1052,15359,1214,15357,1494,15356,1892,15352,2274,15346,2663,15338,3099,15326,3393,15309,3679,15288,3980,15260,4183,15226,4325,15185,4437,15136,4517,15080,4570,15018,4591,14950,4581,14877,4545,14800,4485,14720,4411,14638,4325,14556,4231,14475,4136,14395,3988,14297,3803,14145,3628,13999,3465,13861,3314,13729,3177,15360,263,15360,264,15360,272,15360,325,15359,407,15358,548,15356,780,15352,1144,15347,1580,15339,2099,15328,2425,15312,2795,15292,3133,15264,3329,15232,3517,15191,3689,15143,3819,15088,3923,15025,3978,14956,3999,14882,3979,14804,3931,14722,3855,14639,3756,14554,3645,14470,3529,14388,3409,14279,3289,14124,3173,13975,3055,13834,2848,13701,2658,15360,49,15360,49,15360,52,15360,75,15359,111,15358,201,15356,283,15353,519,15348,726,15340,1045,15329,1415,15314,1795,15295,2173,15269,2410,15237,2649,15197,2866,15150,3054,15095,3140,15032,3196,14963,3228,14888,3236,14808,3224,14725,3191,14639,3146,14553,3088,14466,2976,14382,2836,14262,2692,14103,2549,13952,2409,13808,2278,13674,2154,15360,4,15360,4,15360,4,15360,13,15359,33,15358,59,15357,112,15353,199,15348,302,15341,456,15331,628,15316,827,15297,1082,15272,1332,15241,1601,15202,1851,15156,2069,15101,2172,15039,2256,14970,2314,14894,2348,14813,2358,14728,2344,14640,2311,14551,2263,14463,2203,14376,2133,14247,2059,14084,1915,13930,1761,13784,1609,13648,1464,15360,0,15360,0,15360,0,15360,3,15359,18,15358,26,15357,53,15354,80,15348,97,15341,165,15332,238,15318,326,15299,427,15275,529,15245,654,15207,771,15161,885,15108,994,15046,1089,14976,1170,14900,1229,14817,1266,14731,1284,14641,1282,14550,1260,14460,1223,14370,1174,14232,1116,14066,1050,13909,981,13761,910,13623,839]);let xi=null;function rg(){return xi===null&&(xi=new Hu(sg,32,32,Tc,Ks),xi.minFilter=Hn,xi.magFilter=Hn,xi.wrapS=Mi,xi.wrapT=Mi,xi.generateMipmaps=!1,xi.needsUpdate=!0),xi}class ag{constructor(e={}){const{canvas:t=Pf(),context:i=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=o;const m=new Set([Ac,wc,Ec]),_=new Set([ui,fs,mr,xr,yc,Mc]),x=new Uint32Array(4),h=new Int32Array(4);let w=null,R=null;const A=[],E=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=$i,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const v=this;let C=!1;this._outputColorSpace=gn;let L=0,g=0,b=null,P=-1,N=null;const I=new St,H=new St;let X=null;const Z=new at(0);let re=0,K=t.width,ie=t.height,te=1,pe=null,Pe=null;const ze=new St(0,0,K,ie),He=new St(0,0,K,ie);let ut=!1;const ne=new Lc;let ce=!1,Ae=!1;const Ye=new vt,Ue=new B,Qe=new St,kt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let et=!1;function Tt(){return b===null?te:1}let O=i;function tt(T,V){return t.getContext(T,V)}try{const T={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${vc}`),t.addEventListener("webglcontextlost",ue,!1),t.addEventListener("webglcontextrestored",ae,!1),t.addEventListener("webglcontextcreationerror",we,!1),O===null){const V="webgl2";if(O=tt(V,T),O===null)throw tt(V)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw T("WebGLRenderer: "+T.message),T}let nt,_t,Te,Rt,Ne,Xe,D,y,q,se,oe,Q,Le,ve,Be,De,le,fe,Ge,ke,ee,qe,z,ge;function me(){nt=new pm(O),nt.init(),qe=new Kx(O,nt),_t=new rm(O,nt,e,qe),Te=new jx(O,nt),_t.reversedDepthBuffer&&f&&Te.buffers.depth.setReversed(!0),Rt=new gm(O),Ne=new Fx,Xe=new Yx(O,nt,Te,Ne,_t,qe,Rt),D=new om(v),y=new hm(v),q=new yh(O),z=new im(O,q),se=new mm(O,q,Rt,z),oe=new vm(O,se,q,Rt),Ge=new _m(O,_t,Xe),De=new am(Ne),Q=new Ux(v,D,y,nt,_t,z,De),Le=new ng(v,Ne),ve=new Ox,Be=new Hx(nt),fe=new nm(v,D,y,Te,oe,p,c),le=new qx(v,oe,_t),ge=new ig(O,Rt,_t,Te),ke=new sm(O,nt,Rt),ee=new xm(O,nt,Rt),Rt.programs=Q.programs,v.capabilities=_t,v.extensions=nt,v.properties=Ne,v.renderLists=ve,v.shadowMap=le,v.state=Te,v.info=Rt}me();const xe=new eg(v,O);this.xr=xe,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){const T=nt.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=nt.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return te},this.setPixelRatio=function(T){T!==void 0&&(te=T,this.setSize(K,ie,!1))},this.getSize=function(T){return T.set(K,ie)},this.setSize=function(T,V,j=!0){if(xe.isPresenting){Ke("WebGLRenderer: Can't change size while VR device is presenting.");return}K=T,ie=V,t.width=Math.floor(T*te),t.height=Math.floor(V*te),j===!0&&(t.style.width=T+"px",t.style.height=V+"px"),this.setViewport(0,0,T,V)},this.getDrawingBufferSize=function(T){return T.set(K*te,ie*te).floor()},this.setDrawingBufferSize=function(T,V,j){K=T,ie=V,te=j,t.width=Math.floor(T*j),t.height=Math.floor(V*j),this.setViewport(0,0,T,V)},this.getCurrentViewport=function(T){return T.copy(I)},this.getViewport=function(T){return T.copy(ze)},this.setViewport=function(T,V,j,W){T.isVector4?ze.set(T.x,T.y,T.z,T.w):ze.set(T,V,j,W),Te.viewport(I.copy(ze).multiplyScalar(te).round())},this.getScissor=function(T){return T.copy(He)},this.setScissor=function(T,V,j,W){T.isVector4?He.set(T.x,T.y,T.z,T.w):He.set(T,V,j,W),Te.scissor(H.copy(He).multiplyScalar(te).round())},this.getScissorTest=function(){return ut},this.setScissorTest=function(T){Te.setScissorTest(ut=T)},this.setOpaqueSort=function(T){pe=T},this.setTransparentSort=function(T){Pe=T},this.getClearColor=function(T){return T.copy(fe.getClearColor())},this.setClearColor=function(){fe.setClearColor(...arguments)},this.getClearAlpha=function(){return fe.getClearAlpha()},this.setClearAlpha=function(){fe.setClearAlpha(...arguments)},this.clear=function(T=!0,V=!0,j=!0){let W=0;if(T){let G=!1;if(b!==null){const he=b.texture.format;G=m.has(he)}if(G){const he=b.texture.type,Me=_.has(he),Ee=fe.getClearColor(),Se=fe.getClearAlpha(),de=Ee.r,$e=Ee.g,Oe=Ee.b;Me?(x[0]=de,x[1]=$e,x[2]=Oe,x[3]=Se,O.clearBufferuiv(O.COLOR,0,x)):(h[0]=de,h[1]=$e,h[2]=Oe,h[3]=Se,O.clearBufferiv(O.COLOR,0,h))}else W|=O.COLOR_BUFFER_BIT}V&&(W|=O.DEPTH_BUFFER_BIT),j&&(W|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),O.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ue,!1),t.removeEventListener("webglcontextrestored",ae,!1),t.removeEventListener("webglcontextcreationerror",we,!1),fe.dispose(),ve.dispose(),Be.dispose(),Ne.dispose(),D.dispose(),y.dispose(),oe.dispose(),z.dispose(),ge.dispose(),Q.dispose(),xe.dispose(),xe.removeEventListener("sessionstart",Wt),xe.removeEventListener("sessionend",Rn),vn.stop()};function ue(T){T.preventDefault(),al("WebGLRenderer: Context Lost."),C=!0}function ae(){al("WebGLRenderer: Context Restored."),C=!1;const T=Rt.autoReset,V=le.enabled,j=le.autoUpdate,W=le.needsUpdate,G=le.type;me(),Rt.autoReset=T,le.enabled=V,le.autoUpdate=j,le.needsUpdate=W,le.type=G}function we(T){Ot("WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function We(T){const V=T.target;V.removeEventListener("dispose",We),dt(V)}function dt(T){ht(T),Ne.remove(T)}function ht(T){const V=Ne.get(T).programs;V!==void 0&&(V.forEach(function(j){Q.releaseProgram(j)}),T.isShaderMaterial&&Q.releaseShaderCache(T))}this.renderBufferDirect=function(T,V,j,W,G,he){V===null&&(V=kt);const Me=G.isMesh&&G.matrixWorld.determinant()<0,Ee=Cn(T,V,j,W,G);Te.setMaterial(W,Me);let Se=j.index,de=1;if(W.wireframe===!0){if(Se=se.getWireframeAttribute(j),Se===void 0)return;de=2}const $e=j.drawRange,Oe=j.attributes.position;let it=$e.start*de,mt=($e.start+$e.count)*de;he!==null&&(it=Math.max(it,he.start*de),mt=Math.min(mt,(he.start+he.count)*de)),Se!==null?(it=Math.max(it,0),mt=Math.min(mt,Se.count)):Oe!=null&&(it=Math.max(it,0),mt=Math.min(mt,Oe.count));const Ct=mt-it;if(Ct<0||Ct===1/0)return;z.setup(G,W,Ee,j,Se);let Lt,rt=ke;if(Se!==null&&(Lt=q.get(Se),rt=ee,rt.setIndex(Lt)),G.isMesh)W.wireframe===!0?(Te.setLineWidth(W.wireframeLinewidth*Tt()),rt.setMode(O.LINES)):rt.setMode(O.TRIANGLES);else if(G.isLine){let Ie=W.linewidth;Ie===void 0&&(Ie=1),Te.setLineWidth(Ie*Tt()),G.isLineSegments?rt.setMode(O.LINES):G.isLineLoop?rt.setMode(O.LINE_LOOP):rt.setMode(O.LINE_STRIP)}else G.isPoints?rt.setMode(O.POINTS):G.isSprite&&rt.setMode(O.TRIANGLES);if(G.isBatchedMesh)if(G._multiDrawInstances!==null)vr("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),rt.renderMultiDrawInstances(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount,G._multiDrawInstances);else if(nt.get("WEBGL_multi_draw"))rt.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else{const Ie=G._multiDrawStarts,Pt=G._multiDrawCounts,ct=G._multiDrawCount,rn=Se?q.get(Se).bytesPerElement:1,Di=Ne.get(W).currentProgram.getUniforms();for(let mn=0;mn<ct;mn++)Di.setValue(O,"_gl_DrawID",mn),rt.render(Ie[mn]/rn,Pt[mn])}else if(G.isInstancedMesh)rt.renderInstances(it,Ct,G.count);else if(j.isInstancedBufferGeometry){const Ie=j._maxInstanceCount!==void 0?j._maxInstanceCount:1/0,Pt=Math.min(j.instanceCount,Ie);rt.renderInstances(it,Ct,Pt)}else rt.render(it,Ct)};function bt(T,V,j){T.transparent===!0&&T.side===Gn&&T.forceSinglePass===!1?(T.side=wn,T.needsUpdate=!0,Pi(T,V,j),T.side=Zi,T.needsUpdate=!0,Pi(T,V,j),T.side=Gn):Pi(T,V,j)}this.compile=function(T,V,j=null){j===null&&(j=T),R=Be.get(j),R.init(V),E.push(R),j.traverseVisible(function(G){G.isLight&&G.layers.test(V.layers)&&(R.pushLight(G),G.castShadow&&R.pushShadow(G))}),T!==j&&T.traverseVisible(function(G){G.isLight&&G.layers.test(V.layers)&&(R.pushLight(G),G.castShadow&&R.pushShadow(G))}),R.setupLights();const W=new Set;return T.traverse(function(G){if(!(G.isMesh||G.isPoints||G.isLine||G.isSprite))return;const he=G.material;if(he)if(Array.isArray(he))for(let Me=0;Me<he.length;Me++){const Ee=he[Me];bt(Ee,j,G),W.add(Ee)}else bt(he,j,G),W.add(he)}),R=E.pop(),W},this.compileAsync=function(T,V,j=null){const W=this.compile(T,V,j);return new Promise(G=>{function he(){if(W.forEach(function(Me){Ne.get(Me).currentProgram.isReady()&&W.delete(Me)}),W.size===0){G(T);return}setTimeout(he,10)}nt.get("KHR_parallel_shader_compile")!==null?he():setTimeout(he,10)})};let Ht=null;function An(T){Ht&&Ht(T)}function Wt(){vn.stop()}function Rn(){vn.start()}const vn=new Yu;vn.setAnimationLoop(An),typeof self<"u"&&vn.setContext(self),this.setAnimationLoop=function(T){Ht=T,xe.setAnimationLoop(T),T===null?vn.stop():vn.start()},xe.addEventListener("sessionstart",Wt),xe.addEventListener("sessionend",Rn),this.render=function(T,V){if(V!==void 0&&V.isCamera!==!0){Ot("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),V.parent===null&&V.matrixWorldAutoUpdate===!0&&V.updateMatrixWorld(),xe.enabled===!0&&xe.isPresenting===!0&&(xe.cameraAutoUpdate===!0&&xe.updateCamera(V),V=xe.getCamera()),T.isScene===!0&&T.onBeforeRender(v,T,V,b),R=Be.get(T,E.length),R.init(V),E.push(R),Ye.multiplyMatrices(V.projectionMatrix,V.matrixWorldInverse),ne.setFromProjectionMatrix(Ye,li,V.reversedDepth),Ae=this.localClippingEnabled,ce=De.init(this.clippingPlanes,Ae),w=ve.get(T,A.length),w.init(),A.push(w),xe.enabled===!0&&xe.isPresenting===!0){const he=v.xr.getDepthSensingMesh();he!==null&&Bn(he,V,-1/0,v.sortObjects)}Bn(T,V,0,v.sortObjects),w.finish(),v.sortObjects===!0&&w.sort(pe,Pe),et=xe.enabled===!1||xe.isPresenting===!1||xe.hasDepthSensing()===!1,et&&fe.addToRenderList(w,T),this.info.render.frame++,ce===!0&&De.beginShadows();const j=R.state.shadowsArray;le.render(j,T,V),ce===!0&&De.endShadows(),this.info.autoReset===!0&&this.info.reset();const W=w.opaque,G=w.transmissive;if(R.setupLights(),V.isArrayCamera){const he=V.cameras;if(G.length>0)for(let Me=0,Ee=he.length;Me<Ee;Me++){const Se=he[Me];vs(W,G,T,Se)}et&&fe.render(T);for(let Me=0,Ee=he.length;Me<Ee;Me++){const Se=he[Me];Nt(w,T,Se,Se.viewport)}}else G.length>0&&vs(W,G,T,V),et&&fe.render(T),Nt(w,T,V);b!==null&&g===0&&(Xe.updateMultisampleRenderTarget(b),Xe.updateRenderTargetMipmap(b)),T.isScene===!0&&T.onAfterRender(v,T,V),z.resetDefaultState(),P=-1,N=null,E.pop(),E.length>0?(R=E[E.length-1],ce===!0&&De.setGlobalState(v.clippingPlanes,R.state.camera)):R=null,A.pop(),A.length>0?w=A[A.length-1]:w=null};function Bn(T,V,j,W){if(T.visible===!1)return;if(T.layers.test(V.layers)){if(T.isGroup)j=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(V);else if(T.isLight)R.pushLight(T),T.castShadow&&R.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||ne.intersectsSprite(T)){W&&Qe.setFromMatrixPosition(T.matrixWorld).applyMatrix4(Ye);const Me=oe.update(T),Ee=T.material;Ee.visible&&w.push(T,Me,Ee,j,Qe.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||ne.intersectsObject(T))){const Me=oe.update(T),Ee=T.material;if(W&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),Qe.copy(T.boundingSphere.center)):(Me.boundingSphere===null&&Me.computeBoundingSphere(),Qe.copy(Me.boundingSphere.center)),Qe.applyMatrix4(T.matrixWorld).applyMatrix4(Ye)),Array.isArray(Ee)){const Se=Me.groups;for(let de=0,$e=Se.length;de<$e;de++){const Oe=Se[de],it=Ee[Oe.materialIndex];it&&it.visible&&w.push(T,Me,it,j,Qe.z,Oe)}}else Ee.visible&&w.push(T,Me,Ee,j,Qe.z,null)}}const he=T.children;for(let Me=0,Ee=he.length;Me<Ee;Me++)Bn(he[Me],V,j,W)}function Nt(T,V,j,W){const{opaque:G,transmissive:he,transparent:Me}=T;R.setupLightsView(j),ce===!0&&De.setGlobalState(v.clippingPlanes,j),W&&Te.viewport(I.copy(W)),G.length>0&&Jt(G,V,j),he.length>0&&Jt(he,V,j),Me.length>0&&Jt(Me,V,j),Te.buffers.depth.setTest(!0),Te.buffers.depth.setMask(!0),Te.buffers.color.setMask(!0),Te.setPolygonOffset(!1)}function vs(T,V,j,W){if((j.isScene===!0?j.overrideMaterial:null)!==null)return;R.state.transmissionRenderTarget[W.id]===void 0&&(R.state.transmissionRenderTarget[W.id]=new hs(1,1,{generateMipmaps:!0,type:nt.has("EXT_color_buffer_half_float")||nt.has("EXT_color_buffer_float")?Ks:ui,minFilter:us,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:pt.workingColorSpace}));const he=R.state.transmissionRenderTarget[W.id],Me=W.viewport||I;he.setSize(Me.z*v.transmissionResolutionScale,Me.w*v.transmissionResolutionScale);const Ee=v.getRenderTarget(),Se=v.getActiveCubeFace(),de=v.getActiveMipmapLevel();v.setRenderTarget(he),v.getClearColor(Z),re=v.getClearAlpha(),re<1&&v.setClearColor(16777215,.5),v.clear(),et&&fe.render(j);const $e=v.toneMapping;v.toneMapping=$i;const Oe=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),R.setupLightsView(W),ce===!0&&De.setGlobalState(v.clippingPlanes,W),Jt(T,j,W),Xe.updateMultisampleRenderTarget(he),Xe.updateRenderTargetMipmap(he),nt.has("WEBGL_multisampled_render_to_texture")===!1){let it=!1;for(let mt=0,Ct=V.length;mt<Ct;mt++){const Lt=V[mt],{object:rt,geometry:Ie,material:Pt,group:ct}=Lt;if(Pt.side===Gn&&rt.layers.test(W.layers)){const rn=Pt.side;Pt.side=wn,Pt.needsUpdate=!0,sn(rt,j,W,Ie,Pt,ct),Pt.side=rn,Pt.needsUpdate=!0,it=!0}}it===!0&&(Xe.updateMultisampleRenderTarget(he),Xe.updateRenderTargetMipmap(he))}v.setRenderTarget(Ee,Se,de),v.setClearColor(Z,re),Oe!==void 0&&(W.viewport=Oe),v.toneMapping=$e}function Jt(T,V,j){const W=V.isScene===!0?V.overrideMaterial:null;for(let G=0,he=T.length;G<he;G++){const Me=T[G],{object:Ee,geometry:Se,group:de}=Me;let $e=Me.material;$e.allowOverride===!0&&W!==null&&($e=W),Ee.layers.test(j.layers)&&sn(Ee,V,j,Se,$e,de)}}function sn(T,V,j,W,G,he){T.onBeforeRender(v,V,j,W,G,he),T.modelViewMatrix.multiplyMatrices(j.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),G.onBeforeRender(v,V,j,W,T,he),G.transparent===!0&&G.side===Gn&&G.forceSinglePass===!1?(G.side=wn,G.needsUpdate=!0,v.renderBufferDirect(j,V,W,G,T,he),G.side=Zi,G.needsUpdate=!0,v.renderBufferDirect(j,V,W,G,T,he),G.side=Gn):v.renderBufferDirect(j,V,W,G,T,he),T.onAfterRender(v,V,j,W,G,he)}function Pi(T,V,j){V.isScene!==!0&&(V=kt);const W=Ne.get(T),G=R.state.lights,he=R.state.shadowsArray,Me=G.state.version,Ee=Q.getParameters(T,G.state,he,V,j),Se=Q.getProgramCacheKey(Ee);let de=W.programs;W.environment=T.isMeshStandardMaterial?V.environment:null,W.fog=V.fog,W.envMap=(T.isMeshStandardMaterial?y:D).get(T.envMap||W.environment),W.envMapRotation=W.environment!==null&&T.envMap===null?V.environmentRotation:T.envMapRotation,de===void 0&&(T.addEventListener("dispose",We),de=new Map,W.programs=de);let $e=de.get(Se);if($e!==void 0){if(W.currentProgram===$e&&W.lightsStateVersion===Me)return bn(T,Ee),$e}else Ee.uniforms=Q.getUniforms(T),T.onBeforeCompile(Ee,v),$e=Q.acquireProgram(Ee,Se),de.set(Se,$e),W.uniforms=Ee.uniforms;const Oe=W.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Oe.clippingPlanes=De.uniform),bn(T,Ee),W.needsLights=ti(T),W.lightsStateVersion=Me,W.needsLights&&(Oe.ambientLightColor.value=G.state.ambient,Oe.lightProbe.value=G.state.probe,Oe.directionalLights.value=G.state.directional,Oe.directionalLightShadows.value=G.state.directionalShadow,Oe.spotLights.value=G.state.spot,Oe.spotLightShadows.value=G.state.spotShadow,Oe.rectAreaLights.value=G.state.rectArea,Oe.ltc_1.value=G.state.rectAreaLTC1,Oe.ltc_2.value=G.state.rectAreaLTC2,Oe.pointLights.value=G.state.point,Oe.pointLightShadows.value=G.state.pointShadow,Oe.hemisphereLights.value=G.state.hemi,Oe.directionalShadowMap.value=G.state.directionalShadowMap,Oe.directionalShadowMatrix.value=G.state.directionalShadowMatrix,Oe.spotShadowMap.value=G.state.spotShadowMap,Oe.spotLightMatrix.value=G.state.spotLightMatrix,Oe.spotLightMap.value=G.state.spotLightMap,Oe.pointShadowMap.value=G.state.pointShadowMap,Oe.pointShadowMatrix.value=G.state.pointShadowMatrix),W.currentProgram=$e,W.uniformsList=null,$e}function Ve(T){if(T.uniformsList===null){const V=T.currentProgram.getUniforms();T.uniformsList=ra.seqWithValue(V.seq,T.uniforms)}return T.uniformsList}function bn(T,V){const j=Ne.get(T);j.outputColorSpace=V.outputColorSpace,j.batching=V.batching,j.batchingColor=V.batchingColor,j.instancing=V.instancing,j.instancingColor=V.instancingColor,j.instancingMorph=V.instancingMorph,j.skinning=V.skinning,j.morphTargets=V.morphTargets,j.morphNormals=V.morphNormals,j.morphColors=V.morphColors,j.morphTargetsCount=V.morphTargetsCount,j.numClippingPlanes=V.numClippingPlanes,j.numIntersection=V.numClipIntersection,j.vertexAlphas=V.vertexAlphas,j.vertexTangents=V.vertexTangents,j.toneMapping=V.toneMapping}function Cn(T,V,j,W,G){V.isScene!==!0&&(V=kt),Xe.resetTextureUnits();const he=V.fog,Me=W.isMeshStandardMaterial?V.environment:null,Ee=b===null?v.outputColorSpace:b.isXRRenderTarget===!0?b.texture.colorSpace:qs,Se=(W.isMeshStandardMaterial?y:D).get(W.envMap||Me),de=W.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,$e=!!j.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),Oe=!!j.morphAttributes.position,it=!!j.morphAttributes.normal,mt=!!j.morphAttributes.color;let Ct=$i;W.toneMapped&&(b===null||b.isXRRenderTarget===!0)&&(Ct=v.toneMapping);const Lt=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,rt=Lt!==void 0?Lt.length:0,Ie=Ne.get(W),Pt=R.state.lights;if(ce===!0&&(Ae===!0||T!==N)){const Qt=T===N&&W.id===P;De.setState(W,T,Qt)}let ct=!1;W.version===Ie.__version?(Ie.needsLights&&Ie.lightsStateVersion!==Pt.state.version||Ie.outputColorSpace!==Ee||G.isBatchedMesh&&Ie.batching===!1||!G.isBatchedMesh&&Ie.batching===!0||G.isBatchedMesh&&Ie.batchingColor===!0&&G.colorTexture===null||G.isBatchedMesh&&Ie.batchingColor===!1&&G.colorTexture!==null||G.isInstancedMesh&&Ie.instancing===!1||!G.isInstancedMesh&&Ie.instancing===!0||G.isSkinnedMesh&&Ie.skinning===!1||!G.isSkinnedMesh&&Ie.skinning===!0||G.isInstancedMesh&&Ie.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&Ie.instancingColor===!1&&G.instanceColor!==null||G.isInstancedMesh&&Ie.instancingMorph===!0&&G.morphTexture===null||G.isInstancedMesh&&Ie.instancingMorph===!1&&G.morphTexture!==null||Ie.envMap!==Se||W.fog===!0&&Ie.fog!==he||Ie.numClippingPlanes!==void 0&&(Ie.numClippingPlanes!==De.numPlanes||Ie.numIntersection!==De.numIntersection)||Ie.vertexAlphas!==de||Ie.vertexTangents!==$e||Ie.morphTargets!==Oe||Ie.morphNormals!==it||Ie.morphColors!==mt||Ie.toneMapping!==Ct||Ie.morphTargetsCount!==rt)&&(ct=!0):(ct=!0,Ie.__version=W.version);let rn=Ie.currentProgram;ct===!0&&(rn=Pi(W,V,G));let Di=!1,mn=!1,ii=!1;const yt=rn.getUniforms(),an=Ie.uniforms;if(Te.useProgram(rn.program)&&(Di=!0,mn=!0,ii=!0),W.id!==P&&(P=W.id,mn=!0),Di||N!==T){Te.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),yt.setValue(O,"projectionMatrix",T.projectionMatrix),yt.setValue(O,"viewMatrix",T.matrixWorldInverse);const on=yt.map.cameraPosition;on!==void 0&&on.setValue(O,Ue.setFromMatrixPosition(T.matrixWorld)),_t.logarithmicDepthBuffer&&yt.setValue(O,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&yt.setValue(O,"isOrthographic",T.isOrthographicCamera===!0),N!==T&&(N=T,mn=!0,ii=!0)}if(G.isSkinnedMesh){yt.setOptional(O,G,"bindMatrix"),yt.setOptional(O,G,"bindMatrixInverse");const Qt=G.skeleton;Qt&&(Qt.boneTexture===null&&Qt.computeBoneTexture(),yt.setValue(O,"boneTexture",Qt.boneTexture,Xe))}G.isBatchedMesh&&(yt.setOptional(O,G,"batchingTexture"),yt.setValue(O,"batchingTexture",G._matricesTexture,Xe),yt.setOptional(O,G,"batchingIdTexture"),yt.setValue(O,"batchingIdTexture",G._indirectTexture,Xe),yt.setOptional(O,G,"batchingColorTexture"),G._colorsTexture!==null&&yt.setValue(O,"batchingColorTexture",G._colorsTexture,Xe));const Dt=j.morphAttributes;if((Dt.position!==void 0||Dt.normal!==void 0||Dt.color!==void 0)&&Ge.update(G,j,rn),(mn||Ie.receiveShadow!==G.receiveShadow)&&(Ie.receiveShadow=G.receiveShadow,yt.setValue(O,"receiveShadow",G.receiveShadow)),W.isMeshGouraudMaterial&&W.envMap!==null&&(an.envMap.value=Se,an.flipEnvMap.value=Se.isCubeTexture&&Se.isRenderTargetTexture===!1?-1:1),W.isMeshStandardMaterial&&W.envMap===null&&V.environment!==null&&(an.envMapIntensity.value=V.environmentIntensity),an.dfgLUT!==void 0&&(an.dfgLUT.value=rg()),mn&&(yt.setValue(O,"toneMappingExposure",v.toneMappingExposure),Ie.needsLights&&wr(an,ii),he&&W.fog===!0&&Le.refreshFogUniforms(an,he),Le.refreshMaterialUniforms(an,W,te,ie,R.state.transmissionRenderTarget[T.id]),ra.upload(O,Ve(Ie),an,Xe)),W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(ra.upload(O,Ve(Ie),an,Xe),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&yt.setValue(O,"center",G.center),yt.setValue(O,"modelViewMatrix",G.modelViewMatrix),yt.setValue(O,"normalMatrix",G.normalMatrix),yt.setValue(O,"modelMatrix",G.matrixWorld),W.isShaderMaterial||W.isRawShaderMaterial){const Qt=W.uniformsGroups;for(let on=0,er=Qt.length;on<er;on++){const cn=Qt[on];ge.update(cn,rn),ge.bind(cn,rn)}}return rn}function wr(T,V){T.ambientLightColor.needsUpdate=V,T.lightProbe.needsUpdate=V,T.directionalLights.needsUpdate=V,T.directionalLightShadows.needsUpdate=V,T.pointLights.needsUpdate=V,T.pointLightShadows.needsUpdate=V,T.spotLights.needsUpdate=V,T.spotLightShadows.needsUpdate=V,T.rectAreaLights.needsUpdate=V,T.hemisphereLights.needsUpdate=V}function ti(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return L},this.getActiveMipmapLevel=function(){return g},this.getRenderTarget=function(){return b},this.setRenderTargetTextures=function(T,V,j){const W=Ne.get(T);W.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,W.__autoAllocateDepthBuffer===!1&&(W.__useRenderToTexture=!1),Ne.get(T.texture).__webglTexture=V,Ne.get(T.depthTexture).__webglTexture=W.__autoAllocateDepthBuffer?void 0:j,W.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,V){const j=Ne.get(T);j.__webglFramebuffer=V,j.__useDefaultFramebuffer=V===void 0};const ni=O.createFramebuffer();this.setRenderTarget=function(T,V=0,j=0){b=T,L=V,g=j;let W=!0,G=null,he=!1,Me=!1;if(T){const Se=Ne.get(T);if(Se.__useDefaultFramebuffer!==void 0)Te.bindFramebuffer(O.FRAMEBUFFER,null),W=!1;else if(Se.__webglFramebuffer===void 0)Xe.setupRenderTarget(T);else if(Se.__hasExternalTextures)Xe.rebindTextures(T,Ne.get(T.texture).__webglTexture,Ne.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const Oe=T.depthTexture;if(Se.__boundDepthTexture!==Oe){if(Oe!==null&&Ne.has(Oe)&&(T.width!==Oe.image.width||T.height!==Oe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Xe.setupDepthRenderbuffer(T)}}const de=T.texture;(de.isData3DTexture||de.isDataArrayTexture||de.isCompressedArrayTexture)&&(Me=!0);const $e=Ne.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray($e[V])?G=$e[V][j]:G=$e[V],he=!0):T.samples>0&&Xe.useMultisampledRTT(T)===!1?G=Ne.get(T).__webglMultisampledFramebuffer:Array.isArray($e)?G=$e[j]:G=$e,I.copy(T.viewport),H.copy(T.scissor),X=T.scissorTest}else I.copy(ze).multiplyScalar(te).floor(),H.copy(He).multiplyScalar(te).floor(),X=ut;if(j!==0&&(G=ni),Te.bindFramebuffer(O.FRAMEBUFFER,G)&&W&&Te.drawBuffers(T,G),Te.viewport(I),Te.scissor(H),Te.setScissorTest(X),he){const Se=Ne.get(T.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+V,Se.__webglTexture,j)}else if(Me){const Se=V;for(let de=0;de<T.textures.length;de++){const $e=Ne.get(T.textures[de]);O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0+de,$e.__webglTexture,j,Se)}}else if(T!==null&&j!==0){const Se=Ne.get(T.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,Se.__webglTexture,j)}P=-1},this.readRenderTargetPixels=function(T,V,j,W,G,he,Me,Ee=0){if(!(T&&T.isWebGLRenderTarget)){Ot("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Se=Ne.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Me!==void 0&&(Se=Se[Me]),Se){Te.bindFramebuffer(O.FRAMEBUFFER,Se);try{const de=T.textures[Ee],$e=de.format,Oe=de.type;if(!_t.textureFormatReadable($e)){Ot("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!_t.textureTypeReadable(Oe)){Ot("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}V>=0&&V<=T.width-W&&j>=0&&j<=T.height-G&&(T.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+Ee),O.readPixels(V,j,W,G,qe.convert($e),qe.convert(Oe),he))}finally{const de=b!==null?Ne.get(b).__webglFramebuffer:null;Te.bindFramebuffer(O.FRAMEBUFFER,de)}}},this.readRenderTargetPixelsAsync=async function(T,V,j,W,G,he,Me,Ee=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Se=Ne.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Me!==void 0&&(Se=Se[Me]),Se)if(V>=0&&V<=T.width-W&&j>=0&&j<=T.height-G){Te.bindFramebuffer(O.FRAMEBUFFER,Se);const de=T.textures[Ee],$e=de.format,Oe=de.type;if(!_t.textureFormatReadable($e))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!_t.textureTypeReadable(Oe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const it=O.createBuffer();O.bindBuffer(O.PIXEL_PACK_BUFFER,it),O.bufferData(O.PIXEL_PACK_BUFFER,he.byteLength,O.STREAM_READ),T.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+Ee),O.readPixels(V,j,W,G,qe.convert($e),qe.convert(Oe),0);const mt=b!==null?Ne.get(b).__webglFramebuffer:null;Te.bindFramebuffer(O.FRAMEBUFFER,mt);const Ct=O.fenceSync(O.SYNC_GPU_COMMANDS_COMPLETE,0);return O.flush(),await Lf(O,Ct,4),O.bindBuffer(O.PIXEL_PACK_BUFFER,it),O.getBufferSubData(O.PIXEL_PACK_BUFFER,0,he),O.deleteBuffer(it),O.deleteSync(Ct),he}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,V=null,j=0){const W=Math.pow(2,-j),G=Math.floor(T.image.width*W),he=Math.floor(T.image.height*W),Me=V!==null?V.x:0,Ee=V!==null?V.y:0;Xe.setTexture2D(T,0),O.copyTexSubImage2D(O.TEXTURE_2D,j,0,0,Me,Ee,G,he),Te.unbindTexture()};const kn=O.createFramebuffer(),Li=O.createFramebuffer();this.copyTextureToTexture=function(T,V,j=null,W=null,G=0,he=null){he===null&&(G!==0?(vr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),he=G,G=0):he=0);let Me,Ee,Se,de,$e,Oe,it,mt,Ct;const Lt=T.isCompressedTexture?T.mipmaps[he]:T.image;if(j!==null)Me=j.max.x-j.min.x,Ee=j.max.y-j.min.y,Se=j.isBox3?j.max.z-j.min.z:1,de=j.min.x,$e=j.min.y,Oe=j.isBox3?j.min.z:0;else{const Dt=Math.pow(2,-G);Me=Math.floor(Lt.width*Dt),Ee=Math.floor(Lt.height*Dt),T.isDataArrayTexture?Se=Lt.depth:T.isData3DTexture?Se=Math.floor(Lt.depth*Dt):Se=1,de=0,$e=0,Oe=0}W!==null?(it=W.x,mt=W.y,Ct=W.z):(it=0,mt=0,Ct=0);const rt=qe.convert(V.format),Ie=qe.convert(V.type);let Pt;V.isData3DTexture?(Xe.setTexture3D(V,0),Pt=O.TEXTURE_3D):V.isDataArrayTexture||V.isCompressedArrayTexture?(Xe.setTexture2DArray(V,0),Pt=O.TEXTURE_2D_ARRAY):(Xe.setTexture2D(V,0),Pt=O.TEXTURE_2D),O.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,V.flipY),O.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,V.premultiplyAlpha),O.pixelStorei(O.UNPACK_ALIGNMENT,V.unpackAlignment);const ct=O.getParameter(O.UNPACK_ROW_LENGTH),rn=O.getParameter(O.UNPACK_IMAGE_HEIGHT),Di=O.getParameter(O.UNPACK_SKIP_PIXELS),mn=O.getParameter(O.UNPACK_SKIP_ROWS),ii=O.getParameter(O.UNPACK_SKIP_IMAGES);O.pixelStorei(O.UNPACK_ROW_LENGTH,Lt.width),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,Lt.height),O.pixelStorei(O.UNPACK_SKIP_PIXELS,de),O.pixelStorei(O.UNPACK_SKIP_ROWS,$e),O.pixelStorei(O.UNPACK_SKIP_IMAGES,Oe);const yt=T.isDataArrayTexture||T.isData3DTexture,an=V.isDataArrayTexture||V.isData3DTexture;if(T.isDepthTexture){const Dt=Ne.get(T),Qt=Ne.get(V),on=Ne.get(Dt.__renderTarget),er=Ne.get(Qt.__renderTarget);Te.bindFramebuffer(O.READ_FRAMEBUFFER,on.__webglFramebuffer),Te.bindFramebuffer(O.DRAW_FRAMEBUFFER,er.__webglFramebuffer);for(let cn=0;cn<Se;cn++)yt&&(O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Ne.get(T).__webglTexture,G,Oe+cn),O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Ne.get(V).__webglTexture,he,Ct+cn)),O.blitFramebuffer(de,$e,Me,Ee,it,mt,Me,Ee,O.DEPTH_BUFFER_BIT,O.NEAREST);Te.bindFramebuffer(O.READ_FRAMEBUFFER,null),Te.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else if(G!==0||T.isRenderTargetTexture||Ne.has(T)){const Dt=Ne.get(T),Qt=Ne.get(V);Te.bindFramebuffer(O.READ_FRAMEBUFFER,kn),Te.bindFramebuffer(O.DRAW_FRAMEBUFFER,Li);for(let on=0;on<Se;on++)yt?O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Dt.__webglTexture,G,Oe+on):O.framebufferTexture2D(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,Dt.__webglTexture,G),an?O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Qt.__webglTexture,he,Ct+on):O.framebufferTexture2D(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,Qt.__webglTexture,he),G!==0?O.blitFramebuffer(de,$e,Me,Ee,it,mt,Me,Ee,O.COLOR_BUFFER_BIT,O.NEAREST):an?O.copyTexSubImage3D(Pt,he,it,mt,Ct+on,de,$e,Me,Ee):O.copyTexSubImage2D(Pt,he,it,mt,de,$e,Me,Ee);Te.bindFramebuffer(O.READ_FRAMEBUFFER,null),Te.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else an?T.isDataTexture||T.isData3DTexture?O.texSubImage3D(Pt,he,it,mt,Ct,Me,Ee,Se,rt,Ie,Lt.data):V.isCompressedArrayTexture?O.compressedTexSubImage3D(Pt,he,it,mt,Ct,Me,Ee,Se,rt,Lt.data):O.texSubImage3D(Pt,he,it,mt,Ct,Me,Ee,Se,rt,Ie,Lt):T.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,he,it,mt,Me,Ee,rt,Ie,Lt.data):T.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,he,it,mt,Lt.width,Lt.height,rt,Lt.data):O.texSubImage2D(O.TEXTURE_2D,he,it,mt,Me,Ee,rt,Ie,Lt);O.pixelStorei(O.UNPACK_ROW_LENGTH,ct),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,rn),O.pixelStorei(O.UNPACK_SKIP_PIXELS,Di),O.pixelStorei(O.UNPACK_SKIP_ROWS,mn),O.pixelStorei(O.UNPACK_SKIP_IMAGES,ii),he===0&&V.generateMipmaps&&O.generateMipmap(Pt),Te.unbindTexture()},this.initRenderTarget=function(T){Ne.get(T).__webglFramebuffer===void 0&&Xe.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?Xe.setTextureCube(T,0):T.isData3DTexture?Xe.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?Xe.setTexture2DArray(T,0):Xe.setTexture2D(T,0),Te.unbindTexture()},this.resetState=function(){L=0,g=0,b=null,Te.reset(),z.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return li}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=pt._getDrawingBufferColorSpace(e),t.unpackColorSpace=pt._getUnpackColorSpace()}}function og({scene:n,box:e,ball:t,cyl:i,mesh:s,segment:r,mat:o,sign:a,softPool:c,doorLeaves:l,doorBlocker:u,lampFixture:d}){const f=new Set,p=new Map,m=te=>(f.add(te),te);for(const te of Nn){const pe=m(s(new Yn(.36,.4,24),"#c6b387",te.x,.09,te.z));pe.rotation.x=-Math.PI/2,p.set(te.id,pe)}l.forEach(m),m(d.bulb),e(-10,1.05,-13,.95,2.1,.6,"#50676e"),e(-10,1.05,-12.68,.76,1.9,.02,"#293941");const _=new xt;_.position.set(-10.46,0,-12.63),n.add(_),m(_),e(.46,1.05,0,.9,2.08,.055,"#718380",_),e(.78,1.03,.04,.045,.23,.05,"#c2bfa9",_);const x=m(e(-10,1.1,-12.65,.48,.34,.025,"#d9cfac"));a(-10,2.35,-12.6,2.5,"איינשטיין · ציוד משותף");const h=m(t(-4,2.35,5.13,.055,"#b47e56"));for(const te of[-.35,.35])r([-8,1.25,16.7],[-8+te,0,16.7+.35],.025,"#8b9491");r([-8,1.25,16.7],[-8,0,16.25],.025,"#8b9491");const w=s(new vi(.14,.18,.95,12),"#6b777b",-8,1.45,16.7);w.rotation.z=Math.PI/2,w.rotation.y=-.35;const R=t(-8.46,1.45,16.54,.13,"#7fabb1");R.scale.x=.17,i(-8.5,.12,8,.42,.22,"#9caaa1");const A=m(i(-8.5,.245,8,.36,.015,"#5696a3"));e(23,.3,-6,2,.6,1.2,"#79644d"),e(23,.62,-6,1.85,.03,1.05,"#3e493c");const E=new xt;E.position.set(23,.62,-6),n.add(E),m(E);for(const te of[-.6,0,.6]){r([te,0,0],[te,.72,0],.025,"#708762",E);for(const pe of[-1,1]){const Pe=t(te+pe*.14,.45,0,.19,"#7b936c",E);Pe.scale.set(.8,.35,1.9),Pe.rotation.z=pe*.7}}i(24.1,.3,-5.8,.25,.55,"#809595"),r([24.1,.4,-5.8],[24.6,.6,-5.8],.065,"#809595"),e(5,.6,10,.85,1.2,.85,"#536d67"),e(5,1.23,10,.96,.12,.96,"#718b7e"),a(5,1.45,10.44,1.7,"מחזור");const v=new xt;n.add(v),m(v);for(let te=0;te<3;te++){const pe=i(4.1+te*.4,.12,10.8+te%2*.4,.1,.3,["#a5aaa0","#a98b71","#7b979b"][te],v);pe.rotation.z=1.2+te*.2}e(19,.8,8,1.4,1.6,.55,"#465a61");const C=[-.43,0,.43].map(te=>m(e(19+te,1.05,8.32,.14,.35,.1,"#b39e78")));a(19,1.9,8.33,2.7,"תאורת השביל","ירח · שמש · עץ");const L=[];for(const[te,pe]of[[16,7],[13,6],[10,5]]){i(te,.32,pe,.08,.64,"#52615f");const Pe=m(t(te,.67,pe,.13,"#d0bd8c")),ze=c(te,pe,3.2);L.push({bulb:Pe,pool:ze})}const g=m(t(-21.48,.99,-8.5,.085,"#b6b7a5")),b=[0,1,2].map(te=>{const pe=m(s(new Yn(.22,.24,24),"#d1c49f",-21.48,1.05,-8.4));return pe.visible=!1,pe}),P=m(t(12,.25,22,.24,"#a87848")),N=m(s(new ds(.242,.01,4,24),"#3d3933",0,0,0,P));N.rotation.x=Math.PI/2;let I=Sr(),H=-1,X=-1,Z=0,re=0;function K(te,{animate:pe=!0}={}){I=te,l.forEach((ze,He)=>{ze.rotation.y=I.doorOpen?He===0?-Math.PI*.46:Math.PI*.46:0}),u.disabled=I.doorOpen,d.bulb.material=o(I.lampOn?"#d6b884":"#566368",I.lampOn),d.pool.visible=I.lampOn,_.rotation.y=I.lockerOpen?-Math.PI*.65:0,x.visible=I.lockerOpen,h.material=o(I.visited.includes("noticeboard")?"#a4c4a3":"#b47e56"),A.visible=I.waterFilled,E.scale.y=I.watered?1.3:.58,v.visible=!I.recycled;const Pe=Er(I);C.forEach((ze,He)=>{ze.rotation.x=I.switches[He]?-.55:.55,ze.material=o(I.switches[He]?"#b8cdb0":"#b39e78")}),L.forEach(ze=>{ze.bulb.material=o(Pe?"#dfc58e":"#66716a",Pe),ze.pool.visible=Pe});for(const[ze,He]of p)He.material=o(I.visited.includes(ze)?"#8da892":"#c6b387");pe&&I.shots>Z&&(H=0),pe&&I.bells>re&&(X=0),Z=I.shots,re=I.bells}function ie(te,pe){if(H>=0){H+=te;const Pe=Math.min(H/1.35,1);if(P.position.set(12+3.58*Pe,.25+2.58*Pe+Math.sin(Pe*Math.PI)*2.45,22),P.rotation.z-=te*4,Pe===1){const ze=Math.min((H-1.35)/.8,1);P.position.set(15.58-3.58*ze,2.83*(1-ze)+Math.sin(ze*Math.PI)*.45,22),ze===1&&(H=-1,P.position.set(12,.25,22))}}X>=0&&(X+=te,g.rotation.z=pe?0:Math.sin(X*34)*.2,b.forEach((Pe,ze)=>{Pe.visible=X<1.2;const He=.6+(X+ze*.16)*2;Pe.scale.setScalar(He),Pe.rotation.y=.6}),X>1.2&&(X=-1,g.rotation.z=0))}return{dynamic:f,sync:K,update:ie,get animation(){return{basketballInFlight:H>=0,bellRinging:X>=0}}}}const cg=JSON.parse('[{"id":"facts","subject_id":"hebrew","exam_id":"hebrew-v1-garden","title":"עובדה או דעה?","description":"מזהים מה אפשר לבדוק ומה מביע מחשבה אישית.","references":[{"id":"garden-passage","kind":"passage","title":"הטקסט „תלמידי כיתה ז׳ הקימו גינה בבית הספר”","url":"garden-exam.html#article","attribution":null,"parts":[{"part":"הכותרת ושורת הפרטים","title":"הכותרת, הכותבת, מקום הפרסום והתאריך"},{"part":"פסקה 1","title":"הקמת הגינה, הכיתות וההשקיה"},{"part":"פסקה 2","title":"ההכנות לפני השתילה ומטרת הפעילות"},{"part":"פסקה 3","title":"דברי התלמידים ומה יקרה בעוד חודש"},{"part":"הטקסט כולו","title":"הטקסט כולו"}]}],"questions":[{"id":"facts-01","position":1,"type":"mcq","topic":null,"difficulty":null,"prompt":"„בפעילות השתתפו שלוש כיתות.” מה זה?","choices":["עובדה","דעה"],"correct":0,"explanation":{"he":"אפשר לבדוק כמה כיתות השתתפו בפעילות.","en":"The number of participating classes can be checked."},"ref":{"id":"garden-passage","part":"פסקה 1"}},{"id":"facts-02","position":2,"type":"mcq","topic":null,"difficulty":null,"prompt":"„שיעורים בגינה מעניינים יותר משיעורים בכיתה.” מה זה?","choices":["עובדה","דעה"],"correct":1,"explanation":{"he":"„מעניינים יותר” הוא שיפוט אישי, ולכן זו דעה.","en":"“More interesting” is a personal judgment, so this is an opinion."},"ref":{"id":"garden-passage","part":"פסקה 3"}},{"id":"facts-03","position":3,"type":"mcq","topic":null,"difficulty":null,"prompt":"„התלמידים שתלו נענע, רוזמרין וחסה.” מה זה?","choices":["עובדה","דעה"],"correct":0,"explanation":{"he":"אפשר לבדוק אילו צמחים נשתלו בגינה.","en":"The plants in the garden can be checked."},"ref":{"id":"garden-passage","part":"פסקה 1"}},{"id":"facts-04","position":4,"type":"mcq","topic":null,"difficulty":null,"prompt":"„נענע היא הצמח הכי מוצלח בגינה.” מה זה?","choices":["עובדה","דעה"],"correct":1,"explanation":{"he":"„הכי מוצלח” מביע הערכה אישית ולא נתון מדיד שהוגדר כאן.","en":"“The best” is a personal evaluation, not a defined measurable fact here."},"ref":{"id":"garden-passage","part":null}},{"id":"facts-05","position":5,"type":"mcq","topic":null,"difficulty":null,"prompt":"„כל כיתה קיבלה אחריות להשקיה ביום אחר בשבוע.” מה זה?","choices":["עובדה","דעה"],"correct":0,"explanation":{"he":"אפשר לבדוק את לוח ההשקיה של הכיתות.","en":"The class watering schedule can be checked."},"ref":{"id":"garden-passage","part":"פסקה 1"}},{"id":"facts-06","position":6,"type":"mcq","topic":null,"difficulty":null,"prompt":"„לדעתי, הפעילות בגינה נהדרת.” מה זה?","choices":["עובדה","דעה"],"correct":1,"explanation":{"he":"המילה „לדעתי” מסמנת במפורש שהדובר מביע דעה.","en":"The word “in my opinion” clearly signals an opinion."},"ref":{"id":"garden-passage","part":null}}]},{"id":"questions","subject_id":"hebrew","exam_id":"hebrew-v1-garden","title":"מילות שאלה","description":"בוחרים את מילת השאלה המתאימה למידע שמחפשים.","references":[{"id":"garden-passage","kind":"passage","title":"הטקסט „תלמידי כיתה ז׳ הקימו גינה בבית הספר”","url":"garden-exam.html#article","attribution":null,"parts":[{"part":"הכותרת ושורת הפרטים","title":"הכותרת, הכותבת, מקום הפרסום והתאריך"},{"part":"פסקה 1","title":"הקמת הגינה, הכיתות וההשקיה"},{"part":"פסקה 2","title":"ההכנות לפני השתילה ומטרת הפעילות"},{"part":"פסקה 3","title":"דברי התלמידים ומה יקרה בעוד חודש"},{"part":"הטקסט כולו","title":"הטקסט כולו"}]}],"questions":[{"id":"questions-01","position":1,"type":"mcq","topic":null,"difficulty":null,"prompt":"איזו מילת שאלה מתאימה לבירור מועד הקמת הגינה?","choices":["מתי","מי","כמה"],"correct":0,"explanation":{"he":"„מתי” מבקשת זמן או מועד.","en":"“When” asks about a time or date."},"ref":{"id":"garden-passage","part":"פסקה 1"}},{"id":"questions-02","position":2,"type":"mcq","topic":null,"difficulty":null,"prompt":"איזו מילת שאלה מתאימה לבירור מספר הכיתות שהשתתפו?","choices":["כיצד","כמה","היכן"],"correct":1,"explanation":{"he":"„כמה” מבקשת מספר או כמות.","en":"“How many” asks for a number or quantity."},"ref":{"id":"garden-passage","part":"פסקה 1"}},{"id":"questions-03","position":3,"type":"mcq","topic":null,"difficulty":null,"prompt":"איזו מילת שאלה מתאימה לשאלה על הסיבה לכך שקראו על הצמחים?","choices":["מדוע","מתי","מי"],"correct":0,"explanation":{"he":"„מדוע” מבקשת סיבה: למה עשו זאת?","en":"“Why” asks for the reason something happened."},"ref":{"id":"garden-passage","part":"פסקה 2"}},{"id":"questions-04","position":4,"type":"mcq","topic":null,"difficulty":null,"prompt":"איזו מילת שאלה מתאימה לבירור המקום שבו הוקמה הגינה?","choices":["כמה","היכן","כיצד"],"correct":1,"explanation":{"he":"„היכן” מבקשת מקום.","en":"“Where” asks about a place."},"ref":{"id":"garden-passage","part":"פסקה 1"}},{"id":"questions-05","position":5,"type":"mcq","topic":null,"difficulty":null,"prompt":"איזו מילת שאלה מתאימה לבירור האופן שבו חילקו את ההשקיה?","choices":["כיצד","מתי","מי"],"correct":0,"explanation":{"he":"„כיצד” מבקשת דרך או אופן פעולה.","en":"“How” asks about the way something was done."},"ref":{"id":"garden-passage","part":"פסקה 1"}},{"id":"questions-06","position":6,"type":"mcq","topic":null,"difficulty":null,"prompt":"איזו מילת שאלה מתאימה לבירור מי הציעה להוסיף פרחים?","choices":["היכן","מי","מדוע"],"correct":1,"explanation":{"he":"„מי” מבקשת לזהות אדם.","en":"“Who” asks which person did something."},"ref":{"id":"garden-passage","part":"פסקה 3"}}]},{"id":"instructions","subject_id":"hebrew","exam_id":"hebrew-v1-garden","title":"מבינים הוראות","description":"מזהים מה בדיוק צריך לעשות לפי מילת ההוראה.","references":[{"id":"garden-passage","kind":"passage","title":"הטקסט „תלמידי כיתה ז׳ הקימו גינה בבית הספר”","url":"garden-exam.html#article","attribution":null,"parts":[{"part":"הכותרת ושורת הפרטים","title":"הכותרת, הכותבת, מקום הפרסום והתאריך"},{"part":"פסקה 1","title":"הקמת הגינה, הכיתות וההשקיה"},{"part":"פסקה 2","title":"ההכנות לפני השתילה ומטרת הפעילות"},{"part":"פסקה 3","title":"דברי התלמידים ומה יקרה בעוד חודש"},{"part":"הטקסט כולו","title":"הטקסט כולו"}]}],"questions":[{"id":"instructions-01","position":1,"type":"mcq","topic":null,"difficulty":null,"prompt":"בשאלה כתוב „העתיקו מהטקסט עובדה”. מה צריך לעשות?","choices":["לכתוב את המילים בדיוק כפי שהן בטקסט","להמציא עובדה חדשה","לכתוב מה חושבים"],"correct":0,"explanation":{"he":"„העתיקו” פירושו להשתמש בניסוח שמופיע בטקסט.","en":"“Copy” means use the wording from the passage."},"ref":{"id":"garden-passage","part":null}},{"id":"instructions-02","position":2,"type":"mcq","topic":null,"difficulty":null,"prompt":"בשאלה כתוב „נמקו”. מה צריך להוסיף לתשובה?","choices":["כותרת בלבד","סיבה שמסבירה את הבחירה","תאריך הפרסום בלבד"],"correct":1,"explanation":{"he":"„נמקו” מבקשת לתת סיבה או ראיה לבחירה.","en":"“Justify” asks for a reason or evidence."},"ref":{"id":"garden-passage","part":null}},{"id":"instructions-03","position":3,"type":"mcq","topic":null,"difficulty":null,"prompt":"בשאלה כתוב „ציינו”. איזו תשובה מתאימה בדרך כלל?","choices":["תשובה קצרה וברורה","סיפור ארוך שלא קשור לשאלה","שאלה חדשה"],"correct":0,"explanation":{"he":"„ציינו” מבקשת למסור את הפרט המבוקש בקצרה.","en":"“State” usually asks for the requested detail briefly."},"ref":{"id":"garden-passage","part":null}},{"id":"instructions-04","position":4,"type":"mcq","topic":null,"difficulty":null,"prompt":"בשאלה כתוב „הסבירו”. מה צריך לעשות?","choices":["לכתוב מילה אחת בלבד","לתאר בפירוט כיצד או מדוע","להעתיק את הכותרת"],"correct":1,"explanation":{"he":"„הסבירו” מבקשת להבהיר את הרעיון בעזרת פירוט או סיבה.","en":"“Explain” asks for details about how or why."},"ref":{"id":"garden-passage","part":null}},{"id":"instructions-05","position":5,"type":"mcq","topic":null,"difficulty":null,"prompt":"בשאלה כתוב „נסחו שאלה מלאה”. איזו תשובה מקיימת את ההוראה?","choices":["„שלוש כיתות”","„כמה כיתות השתתפו בפעילות?”","„כיתות”"],"correct":1,"explanation":{"he":"שאלה מלאה כוללת מילת שאלה ומשפט שלם.","en":"A full question includes a question word and a complete sentence."},"ref":{"id":"garden-passage","part":null}},{"id":"instructions-06","position":6,"type":"mcq","topic":null,"difficulty":null,"prompt":"בשאלה כתוב „הביעו את דעתכם וכתבו נימוק”. מה צריך לכתוב?","choices":["רק עובדה מהטקסט","עמדה אישית וסיבה שתומכת בה","רק את שם הכותבת"],"correct":1,"explanation":{"he":"צריך לציין מה חושבים ולתת סיבה אחת לפחות.","en":"State your view and give at least one supporting reason."},"ref":{"id":"garden-passage","part":null}}]},{"id":"physics-basics","subject_id":"physics","exam_id":"physics-v1-assessment","title":"מדידה ושיטות מדידה","description":"מזהים תוצאות ומבדילים בין מדידה ישירה לעקיפה.","references":[{"id":"physics-pdf","kind":"pdf","title":"סיכום נושא מדידות (PDF)","url":"assets/materials/physics-measurements-grade-7.pdf","attribution":"שרית שרת","parts":[{"part":"עמוד 1","title":"מדידות: מהי מדידה, מדידה ישירה ומדידה עקיפה"},{"part":"עמוד 2","title":"המרת יחידות אורך"},{"part":"עמוד 3","title":"איך מודדים עובי של דף?"},{"part":"עמוד 4","title":"דיוק ומדידה נכונה"},{"part":"עמוד 5","title":"מודדים גובה של עמוד: הרעיון הגאומטרי"},{"part":"עמוד 6","title":"מדידת העמוד בפועל"}]}],"questions":[{"id":"physics-basics-01","position":1,"type":"mcq","topic":null,"difficulty":null,"prompt":"מה חייבים לציין בתוצאת מדידה?","choices":["מספר ויחידת מידה","מספר בלבד","שם כלי המדידה בלבד"],"correct":0,"explanation":{"he":"תוצאת מדידה כוללת מספר ויחידה, למשל 14 ס״מ.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 1"}},{"id":"physics-basics-02","position":2,"type":"mcq","topic":null,"difficulty":null,"prompt":"מדדתם אורך מחברת וקראתם את התוצאה מהסרגל. איזו מדידה זו?","choices":["ישירה","עקיפה","לא מדידה"],"correct":0,"explanation":{"he":"במדידה ישירה קוראים את הגודל המבוקש מכלי המדידה.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 1"}},{"id":"physics-basics-03","position":3,"type":"mcq","topic":null,"difficulty":null,"prompt":"מדדתם עובי של ערימת דפים וחילקתם במספר הדפים. איזו מדידה זו?","choices":["ישירה","עקיפה","הערכה ללא מדידה"],"correct":1,"explanation":{"he":"מודדים גודל אחר ומחשבים ממנו את העובי הממוצע של דף.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 1"}},{"id":"physics-basics-04","position":4,"type":"mcq","topic":null,"difficulty":null,"prompt":"איך מחשבים עובי ממוצע של דף בערימה?","choices":["עובי הערימה חלקי מספר הדפים","מספר הדפים חלקי עובי הערימה","עובי הערימה כפול מספר הדפים"],"correct":0,"explanation":{"he":"מחלקים את עובי הערימה במספר הדפים, לא במספר העמודים.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 3"}},{"id":"physics-basics-05","position":5,"type":"mcq","topic":null,"difficulty":null,"prompt":"ערימה של 100 דפים עובייה 10 מ״מ. מה העובי הממוצע של דף?","choices":["0.1 מ״מ","1 מ״מ","10 מ״מ"],"correct":0,"explanation":{"he":"מחלקים 10 מ״מ ב־100 ומקבלים 0.1 מ״מ לדף.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 3"}},{"id":"physics-basics-06","position":6,"type":"mcq","topic":null,"difficulty":null,"prompt":"למה כדאי למדוד ערימה של דפים מאותו סוג?","choices":["כדי להעריך את העובי הממוצע של דף מהסוג הזה","כי אין צורך לספור את הדפים","כדי לקבל תמיד תוצאה מדויקת לגמרי"],"correct":0,"explanation":{"he":"דפים מאותו סוג מאפשרים אומדן שימושי יותר של עובי דף ממוצע.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 3"}},{"id":"physics-basics-07","position":7,"type":"mcq","topic":null,"difficulty":null,"prompt":"מהי מדידה?","choices":["השוואה ליחידת מידה מוסכמת","ניחוש ללא השוואה","כתיבת שם הגוף"],"correct":0,"explanation":{"he":"מדידה משווה גודל ליחידת מידה מוסכמת.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 1"}},{"id":"physics-basics-08","position":8,"type":"mcq","topic":null,"difficulty":null,"prompt":"מה מתאים לתיאור אורך עיפרון?","choices":["14 ס״מ","14 בלבד","ס״מ בלבד"],"correct":0,"explanation":{"he":"תוצאת מדידה כוללת גם מספר וגם יחידת מידה.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 1"}},{"id":"physics-basics-09","position":9,"type":"mcq","topic":null,"difficulty":null,"prompt":"איזו פעולה היא מדידה עקיפה?","choices":["מדידת ערימת דפים וחלוקה במספר הדפים","קריאת אורך עיפרון מסרגל","קריאת הטמפרטורה ממדחום"],"correct":0,"explanation":{"he":"מודדים את הערימה ומחשבים ממנה את עובי הדף הממוצע.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 1"}},{"id":"physics-basics-10","position":10,"type":"mcq","topic":null,"difficulty":null,"prompt":"ערימה של 50 דפים היא בעובי 5 מ״מ. מה עובי דף ממוצע?","choices":["0.1 מ״מ","10 מ״מ","1 מ״מ"],"correct":0,"explanation":{"he":"מחלקים 5 מ״מ ב־50 דפים ומקבלים 0.1 מ״מ לדף.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 3"}},{"id":"physics-basics-11","position":11,"type":"mcq","topic":null,"difficulty":null,"prompt":"למה מודדים ערימת דפים בלי הכריכה?","choices":["כדי שהכריכה לא תוסיף עובי לתוצאה","כדי לשנות את מספר הדפים","כי הכריכה מחליפה את הסרגל"],"correct":0,"explanation":{"he":"הכריכה אינה דף בערימה ולכן עובייה יטה את החישוב.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 3"}}]},{"id":"physics-units","subject_id":"physics","exam_id":"physics-v1-assessment","title":"המרת יחידות אורך","description":"מתרגלים קילומטרים, מטרים, סנטימטרים ומילימטרים.","references":[{"id":"physics-pdf","kind":"pdf","title":"סיכום נושא מדידות (PDF)","url":"assets/materials/physics-measurements-grade-7.pdf","attribution":"שרית שרת","parts":[{"part":"עמוד 1","title":"מדידות: מהי מדידה, מדידה ישירה ומדידה עקיפה"},{"part":"עמוד 2","title":"המרת יחידות אורך"},{"part":"עמוד 3","title":"איך מודדים עובי של דף?"},{"part":"עמוד 4","title":"דיוק ומדידה נכונה"},{"part":"עמוד 5","title":"מודדים גובה של עמוד: הרעיון הגאומטרי"},{"part":"עמוד 6","title":"מדידת העמוד בפועל"}]}],"questions":[{"id":"physics-units-01","position":1,"type":"mcq","topic":null,"difficulty":null,"prompt":"כמה סנטימטרים יש במטר אחד?","choices":["10","100","1,000"],"correct":1,"explanation":{"he":"מטר אחד שווה ל־100 סנטימטרים.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 2"}},{"id":"physics-units-02","position":2,"type":"mcq","topic":null,"difficulty":null,"prompt":"כמה מילימטרים יש בסנטימטר אחד?","choices":["10","100","1,000"],"correct":0,"explanation":{"he":"סנטימטר אחד שווה ל־10 מילימטרים.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 2"}},{"id":"physics-units-03","position":3,"type":"mcq","topic":null,"difficulty":null,"prompt":"כמה מטרים יש ב־2 קילומטרים?","choices":["200","2,000","20,000"],"correct":1,"explanation":{"he":"קילומטר אחד הוא 1,000 מטרים, ולכן 2 ק״מ הם 2,000 מטרים.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 2"}},{"id":"physics-units-04","position":4,"type":"mcq","topic":null,"difficulty":null,"prompt":"כמה סנטימטרים הם 2.4 מטרים?","choices":["24","240","2,400"],"correct":1,"explanation":{"he":"ממטר לסנטימטר כופלים ב־100: 2.4 × 100 = 240.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 2"}},{"id":"physics-units-05","position":5,"type":"mcq","topic":null,"difficulty":null,"prompt":"כמה מטרים הם 350 סנטימטרים?","choices":["3.5","35","0.35"],"correct":0,"explanation":{"he":"מסנטימטר למטר מחלקים ב־100: 350 ÷ 100 = 3.5.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 2"}},{"id":"physics-units-06","position":6,"type":"mcq","topic":null,"difficulty":null,"prompt":"כמה הם מטר אחד ועוד 25 ס״מ?","choices":["1.25 מטרים","26 מטרים","1.025 מטרים"],"correct":0,"explanation":{"he":"ממירים 25 ס״מ ל־0.25 מטר ואז מחברים: 1 + 0.25 = 1.25.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 2"}},{"id":"physics-units-07","position":7,"type":"mcq","topic":null,"difficulty":null,"prompt":"כמה מילימטרים הם 3 ס״מ?","choices":["30 מ״מ","3 מ״מ","300 מ״מ"],"correct":0,"explanation":{"he":"כל סנטימטר הוא 10 מ״מ, ולכן 3 ס״מ הם 30 מ״מ.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 2"}},{"id":"physics-units-08","position":8,"type":"mcq","topic":null,"difficulty":null,"prompt":"כמה סנטימטרים הם 12 מ״מ?","choices":["1.2 ס״מ","12 ס״מ","120 ס״מ"],"correct":0,"explanation":{"he":"מחלקים את מספר המילימטרים ב־10: התוצאה היא 1.2 ס״מ.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 2"}},{"id":"physics-units-09","position":9,"type":"mcq","topic":null,"difficulty":null,"prompt":"כמה קילומטרים הם 1,500 מטרים?","choices":["1.5 ק״מ","15 ק״מ","0.15 ק״מ"],"correct":0,"explanation":{"he":"מחלקים ב־1,000: 1,500 מטרים הם 1.5 ק״מ.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 2"}},{"id":"physics-units-10","position":10,"type":"mcq","topic":null,"difficulty":null,"prompt":"מה ארוך יותר: 90 ס״מ או מטר אחד?","choices":["מטר אחד","90 ס״מ","הם שווים"],"correct":0,"explanation":{"he":"מטר אחד הוא 100 ס״מ, ולכן הוא ארוך מ־90 ס״מ.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 2"}},{"id":"physics-units-11","position":11,"type":"mcq","topic":null,"difficulty":null,"prompt":"מה קורה לאורך עצמו כשממירים אותו מס״מ למ״מ?","choices":["האורך נשאר זהה","האורך גדל פי 10","האורך קטן פי 10"],"correct":0,"explanation":{"he":"הגוף אינו משתנה; רק המספר והיחידה שבהם מתארים אותו משתנים.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 2"}}]},{"id":"physics-precision","subject_id":"physics","exam_id":"physics-v1-assessment","title":"מודדים נכון","description":"בוחרים כלי מתאים וקוראים את הסרגל בזהירות.","references":[{"id":"physics-pdf","kind":"pdf","title":"סיכום נושא מדידות (PDF)","url":"assets/materials/physics-measurements-grade-7.pdf","attribution":"שרית שרת","parts":[{"part":"עמוד 1","title":"מדידות: מהי מדידה, מדידה ישירה ומדידה עקיפה"},{"part":"עמוד 2","title":"המרת יחידות אורך"},{"part":"עמוד 3","title":"איך מודדים עובי של דף?"},{"part":"עמוד 4","title":"דיוק ומדידה נכונה"},{"part":"עמוד 5","title":"מודדים גובה של עמוד: הרעיון הגאומטרי"},{"part":"עמוד 6","title":"מדידת העמוד בפועל"}]}],"questions":[{"id":"physics-precision-01","position":1,"type":"mcq","topic":null,"difficulty":null,"prompt":"מאיזו נקודה בסרגל מתחילים למדוד אורך?","choices":["מסימון האפס","תמיד מקצה הסרגל","מהמספר 1"],"correct":0,"explanation":{"he":"מצמידים את תחילת הגוף לסימון האפס, שלא תמיד נמצא בקצה הסרגל.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 4"}},{"id":"physics-precision-02","position":2,"type":"mcq","topic":null,"difficulty":null,"prompt":"גוף מתחיל ב־2.0 ס״מ ומסתיים ב־8.2 ס״מ. מה אורכו?","choices":["6.2 ס״מ","8.2 ס״מ","10.2 ס״מ"],"correct":0,"explanation":{"he":"מחסרים את קריאת ההתחלה מקריאת הסיום: 8.2 − 2.0 = 6.2 ס״מ.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 4"}},{"id":"physics-precision-03","position":3,"type":"mcq","topic":null,"difficulty":null,"prompt":"איך מסתכלים על שנתות הסרגל כדי לצמצם טעות קריאה?","choices":["בניצב לסולם","באלכסון ככל האפשר","ממרחק גדול"],"correct":0,"explanation":{"he":"מבט בניצב לסולם מצמצם שגיאת קריאה בגלל זווית ההסתכלות.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 4"}},{"id":"physics-precision-04","position":4,"type":"mcq","topic":null,"difficulty":null,"prompt":"איזה כלי מתאים יותר למדידת אורך של חדר?","choices":["סרט מדידה","סרגל קצר בלבד","שעון"],"correct":0,"explanation":{"he":"סרט מדידה מתאים יותר לאורכו של חדר.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 4"}},{"id":"physics-precision-05","position":5,"type":"mcq","topic":null,"difficulty":null,"prompt":"מה מאפשרות שנתות קטנות יותר על כלי מדידה?","choices":["קריאה מפורטת יותר","ביטול מוחלט של כל טעות","שינוי האורך של הגוף"],"correct":0,"explanation":{"he":"שנתות קטנות מאפשרות לקרוא את המדידה בפירוט רב יותר.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 4"}},{"id":"physics-precision-06","position":6,"type":"mcq","topic":null,"difficulty":null,"prompt":"מדוע חוזרים על מדידה?","choices":["כדי לזהות חריגות ולהקטין השפעת שגיאות אקראיות","כדי לתקן בהכרח כלי פגום","כדי לשנות את גודל הגוף"],"correct":0,"explanation":{"he":"חזרות מסייעות לזהות חריגות, אך אינן מתקנות כלי פגום או שיטה שגויה.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 4"}},{"id":"physics-precision-07","position":7,"type":"mcq","topic":null,"difficulty":null,"prompt":"גוף מתחיל בסימון 3 ס״מ ומסתיים ב־9 ס״מ. מה אורכו?","choices":["6 ס״מ","9 ס״מ","12 ס״מ"],"correct":0,"explanation":{"he":"מחסרים את קריאת ההתחלה מקריאת הסיום: 9 פחות 3 הם 6 ס״מ.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 4"}},{"id":"physics-precision-08","position":8,"type":"mcq","topic":null,"difficulty":null,"prompt":"למה לא תמיד מתחילים למדוד מקצה הסרגל?","choices":["כי סימון האפס יכול להיות רחוק מהקצה","כי הסרגל תמיד מתחיל ב־1","כי אסור להשתמש בסימון האפס"],"correct":0,"explanation":{"he":"חשוב להתחיל מסימון האפס; קצה הסרגל לא תמיד נמצא בדיוק באפס.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 4"}},{"id":"physics-precision-09","position":9,"type":"mcq","topic":null,"difficulty":null,"prompt":"איזה כלי מתאים למדידת אורך של עיפרון?","choices":["סרגל עם שנתות קטנות","שעון עצר","מדחום"],"correct":0,"explanation":{"he":"סרגל עם שנתות מתאימות מאפשר למדוד את אורך העיפרון.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 4"}},{"id":"physics-precision-10","position":10,"type":"mcq","topic":null,"difficulty":null,"prompt":"מה חזרה על מדידה אינה מתקנת בהכרח?","choices":["שיטה שגויה או כלי פגום","טעות אקראית בודדת","תוצאה חריגה שאפשר לזהות"],"correct":0,"explanation":{"he":"חזרה יכולה לעזור לזהות חריגות, אך אינה מתקנת כלי פגום או שיטה שגויה.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 4"}},{"id":"physics-precision-11","position":11,"type":"mcq","topic":null,"difficulty":null,"prompt":"מה כדאי לבדוק לפני שרושמים תוצאה?","choices":["את היחידה, נקודת האפס וזווית ההסתכלות","רק את צבע כלי המדידה","רק את שם הגוף"],"correct":0,"explanation":{"he":"יחידה מתאימה, נקודת אפס נכונה ומבט בניצב עוזרים למדוד נכון.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 4"}}]},{"id":"physics-pole","subject_id":"physics","exam_id":"physics-v1-assessment","title":"מודדים גובה של עמוד","description":"מחשבים גובה בעזרת זווית של 45° ומרחק אופקי.","references":[{"id":"physics-pdf","kind":"pdf","title":"סיכום נושא מדידות (PDF)","url":"assets/materials/physics-measurements-grade-7.pdf","attribution":"שרית שרת","parts":[{"part":"עמוד 1","title":"מדידות: מהי מדידה, מדידה ישירה ומדידה עקיפה"},{"part":"עמוד 2","title":"המרת יחידות אורך"},{"part":"עמוד 3","title":"איך מודדים עובי של דף?"},{"part":"עמוד 4","title":"דיוק ומדידה נכונה"},{"part":"עמוד 5","title":"מודדים גובה של עמוד: הרעיון הגאומטרי"},{"part":"עמוד 6","title":"מדידת העמוד בפועל"}]}],"questions":[{"id":"physics-pole-01","position":1,"type":"mcq","topic":null,"difficulty":null,"prompt":"בשיטת העמוד, באיזו זווית לאופק מכוונים אל ראש העמוד?","choices":["45°","90°","180°"],"correct":0,"explanation":{"he":"מכוונים את קו הראייה בזווית של 45° ביחס לאופק.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 5"}},{"id":"physics-pole-02","position":2,"type":"mcq","topic":null,"difficulty":null,"prompt":"מה שווה למרחק האופקי לעמוד בשיטת 45°?","choices":["גובה ראש העמוד מעל גובה העיניים","גובה העמוד כולו","גובה העיניים"],"correct":0,"explanation":{"he":"במשולש ישר־זווית ושווה־שוקיים שני הניצבים שווים.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 5"}},{"id":"physics-pole-03","position":3,"type":"mcq","topic":null,"difficulty":null,"prompt":"המרחק האופקי לעמוד 6 מטרים וגובה העיניים 1.4 מטרים. מה גובה העמוד?","choices":["7.4 מטרים","6 מטרים","4.6 מטרים"],"correct":0,"explanation":{"he":"מחברים את המרחק האופקי לגובה העיניים: 6 + 1.4 = 7.4 מטרים.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 6"}},{"id":"physics-pole-04","position":4,"type":"mcq","topic":null,"difficulty":null,"prompt":"איזה מרחק מודדים לצורך החישוב?","choices":["המרחק האופקי אל בסיס העמוד","אורך קו הראייה האלכסוני","המרחק מראש העמוד לקרקע באומדן"],"correct":0,"explanation":{"he":"מודדים את המרחק האופקי מהנקודה שמתחת לעין אל בסיס העמוד.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 6"}},{"id":"physics-pole-05","position":5,"type":"mcq","topic":null,"difficulty":null,"prompt":"איזה גובה מוסיפים למרחק האופקי?","choices":["גובה העיניים מעל הקרקע","גובה התלמיד כולו","גובה המשולש שביד"],"correct":0,"explanation":{"he":"מוסיפים את גובה העיניים, כי המשולש מתחיל בגובה העין.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 6"}},{"id":"physics-pole-06","position":6,"type":"mcq","topic":null,"difficulty":null,"prompt":"איזה תנאי נדרש לשיטה המתוארת?","choices":["קרקע אופקית ובסיס העמוד באותו מפלס","העמוד חייב להיות נמוך מהתלמיד","אין צורך לדעת את זווית הראייה"],"correct":0,"explanation":{"he":"הנוסחה מתאימה כאשר הקרקע אופקית ובסיס העמוד באותו מפלס.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 5"}},{"id":"physics-pole-07","position":7,"type":"mcq","topic":null,"difficulty":null,"prompt":"המרחק לעמוד 4 מטרים וגובה העיניים 1.5 מטרים. מה גובה העמוד בשיטת 45°?","choices":["5.5 מטרים","4 מטרים","2.5 מטרים"],"correct":0,"explanation":{"he":"מחברים מרחק אופקי וגובה עיניים: 4 + 1.5 = 5.5 מטרים.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 5"}},{"id":"physics-pole-08","position":8,"type":"mcq","topic":null,"difficulty":null,"prompt":"מה צריך לראות דרך הגליל כשקובעים את נקודת המדידה?","choices":["את ראש העמוד","את בסיס העמוד בלבד","את הקרקע מתחת לעיניים"],"correct":0,"explanation":{"he":"מתקדמים או מתרחקים עד שרואים את ראש העמוד דרך הגליל המכוון ב־45°.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 6"}},{"id":"physics-pole-09","position":9,"type":"mcq","topic":null,"difficulty":null,"prompt":"מהו תפקיד המשולש בעל זווית 45°?","choices":["לעזור לכוון את הגליל בזווית הנכונה לאופק","למדוד ישירות את גובה העמוד","למדוד את עובי העמוד"],"correct":0,"explanation":{"he":"המשולש עוזר לקבע את הגליל בזווית של 45° ביחס לאופק.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 6"}},{"id":"physics-pole-10","position":10,"type":"mcq","topic":null,"difficulty":null,"prompt":"אם המרחק האופקי לעמוד 5 מטרים, מה גובה ראש העמוד מעל גובה העיניים בשיטה זו?","choices":["5 מטרים","10 מטרים","2.5 מטרים"],"correct":0,"explanation":{"he":"בזווית של 45° הניצבים במשולש שווים, ולכן הגובה מעל העיניים שווה למרחק האופקי.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 5"}},{"id":"physics-pole-11","position":11,"type":"mcq","topic":null,"difficulty":null,"prompt":"למה זו מדידה עקיפה?","choices":["כי מודדים מרחק וגובה עיניים ומחשבים מהם את גובה העמוד","כי קוראים את גובה העמוד ישירות מסרגל","כי אין צורך למדוד דבר"],"correct":0,"explanation":{"he":"גובה העמוד מתקבל מחישוב המבוסס על מדידות אחרות.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 6"}}]}]'),wa={quizzes:cg};function lg(n,e){const t=new xt;n.add(t);const i=new _i({color:"#f3c574"}),s=new _i({color:"#9ef5dc"}),r=new Uc(.34),o=new ds(1.05,.085,8,36),a=new _s(.55,.76,.12);function c(f,p,m,_,x){const h=new _n(f,i);return h.position.set(m,_,x),p.add(h),h}const l=Array.from({length:3},()=>{const f=new xt;t.add(f);const p=c(o,f,0,1.65,0),m=c(r,f,0,2.9,0);m.scale.setScalar(1.6);const _=[-1,0,1].map(h=>c(a,f,h*.75,.65,0)),x=Array.from({length:3},()=>c(r,t,0,1,0));return{group:f,ring:p,diamond:m,panels:_,sparks:x}}),u=new xt;t.add(u),u.position.set(0,5,-25);const d=[[-3,0,0],[-1,2,0],[1,1,0],[3,3,0],[4,1,0]];for(const[f,p,m]of d)c(r,u,f,p,m);return u.add(new lh(new jt().setFromPoints(d.map(f=>new B(...f))),new Wu({color:"#f3c574"}))),t.visible=!1,{sync(f){t.visible=!!f.relay,t.visible&&(u.visible=f.seals.length===3,l.forEach(({group:p,ring:m,diamond:_,panels:x,sparks:h},w)=>{const R=$t(f.relay,w),A=Yi(f.relay,w);p.position.set(R.x,0,R.z),_.material=m.material=A?s:i,m.rotation.x=R.task==="ring"?0:Math.PI/2,m.position.y=R.task==="ring"?1.65:.16,x.forEach((E,v)=>{E.visible=R.task==="mirror",E.material=f.relay.steps[w]>v?s:i}),va(R).forEach((E,v)=>{h[v].position.set(E.x,1,E.z),h[v].visible=R.task==="sparks"&&!(f.relay.steps[w]&1<<v)})}))},tick(f){!t.visible||e||(l.forEach(({diamond:p,sparks:m},_)=>{p.rotation.y=f,p.position.y=2.9+.17*Math.sin(f*2+_);for(const x of m)x.visible&&(x.rotation.y=f*2,x.position.y=1+.18*Math.sin(f*3+x.position.x))}),u.position.y=5+.3*Math.sin(f))}}}function ug(n,e=!1){const t=n[0].index!==null,i=new Set(Object.keys(n[0].attributes)),s=new Set(Object.keys(n[0].morphAttributes)),r={},o={},a=n[0].morphTargetsRelative,c=new jt;let l=0;for(let u=0;u<n.length;++u){const d=n[u];let f=0;if(t!==(d.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const p in d.attributes){if(!i.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+p+'" attribute exists among all geometries, or in none of them.'),null;r[p]===void 0&&(r[p]=[]),r[p].push(d.attributes[p]),f++}if(f!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(a!==d.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const p in d.morphAttributes){if(!s.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;o[p]===void 0&&(o[p]=[]),o[p].push(d.morphAttributes[p])}if(e){let p;if(t)p=d.index.count;else if(d.attributes.position!==void 0)p=d.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,p,u),l+=p}}if(t){let u=0;const d=[];for(let f=0;f<n.length;++f){const p=n[f].index;for(let m=0;m<p.count;++m)d.push(p.getX(m)+u);u+=n[f].attributes.position.count}c.setIndex(d)}for(const u in r){const d=au(r[u]);if(!d)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;c.setAttribute(u,d)}for(const u in o){const d=o[u][0].length;if(d===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[u]=[];for(let f=0;f<d;++f){const p=[];for(let _=0;_<o[u].length;++_)p.push(o[u][_][f]);const m=au(p);if(!m)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;c.morphAttributes[u].push(m)}}return c}function au(n){let e,t,i,s=-1,r=0;for(let l=0;l<n.length;++l){const u=n[l];if(e===void 0&&(e=u.array.constructor),e!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=u.itemSize),t!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=u.normalized),i!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=u.gpuType),s!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=u.count*t}const o=new e(r),a=new Wn(o,t,i);let c=0;for(let l=0;l<n.length;++l){const u=n[l];if(u.isInterleavedBufferAttribute){const d=c/t;for(let f=0,p=u.count;f<p;f++)for(let m=0;m<t;m++){const _=u.getComponent(f,m);a.setComponent(f+d,m,_)}}else o.set(u.array,c);c+=u.count*t}return s!==void 0&&(a.gpuType=s),a}const dg=(n,e)=>Math.hypot(n.x-e.x,n.z-e.z)<=1.8;function zs(n,e,t,i=.14){const s=Math.hypot(e.x-n.x,e.z-n.z),r=Math.max(1,Math.ceil(s/i));for(let o=0;o<=r;o++){const a=o/r;if(t(n.x+(e.x-n.x)*a,n.z+(e.z-n.z)*a))return!1}return!0}function go(n,e,t,{step:i=.6,radius:s=1.7,bound:r=27}={}){if(![n.x,n.z,e.x,e.z].every(Number.isFinite)||t(n.x,n.z))return null;if(Math.hypot(n.x-e.x,n.z-e.z)<=s)return[];const o=Math.floor(r*2/i)+1,a=o*o,c=A=>({x:A%o*i-r,z:Math.floor(A/o)*i-r}),l=[],u=new Float64Array(a).fill(1/0),d=new Int32Array(a).fill(-1),f=new Uint8Array(a),p=new Int8Array(a);function m(A){if(A<0||A>=a)return!1;if(!p[A]){const E=c(A);p[A]=t(E.x,E.z)?-1:1}return p[A]>0}const _=A=>Math.max(0,Math.hypot(A.x-e.x,A.z-e.z)-s);function x(A,E){let v=l.length;for(l.push({id:A,priority:E});v>0;){const C=v-1>>1;if(l[C].priority<=E)break;[l[C],l[v]]=[l[v],l[C]],v=C}}function h(){const A=l[0],E=l.pop();if(l.length){l[0]=E;let v=0;for(;;){const C=v*2+1,L=C+1;let g=v;if(C<l.length&&l[C].priority<l[g].priority&&(g=C),L<l.length&&l[L].priority<l[g].priority&&(g=L),g===v)break;[l[v],l[g]]=[l[g],l[v]],v=g}}return A.id}const w=Math.round((n.x+r)/i),R=Math.round((n.z+r)/i);for(let A=-2;A<=2;A++)for(let E=-2;E<=2;E++){const v=w+E,C=R+A;if(v<0||C<0||v>=o||C>=o)continue;const L=C*o+v,g=c(L);m(L)&&zs(n,g,t)&&(u[L]=Math.hypot(g.x-n.x,g.z-n.z),x(L,u[L]+_(g)))}for(;l.length;){const A=h();if(f[A])continue;f[A]=1;const E=c(A);if(Math.hypot(E.x-e.x,E.z-e.z)<=Math.max(s,i*.72)){const L=[];for(let N=A;N!==-1;N=d[N])L.push(c(N));L.reverse(),s<i&&zs(L.at(-1),e,t)&&L.push({...e});const g=[];let b=n,P=0;for(;P<L.length;){let N=P;for(;N+1<L.length&&zs(b,L[N+1],t);)N++;g.push(L[N]),b=L[N],P=N+1}return g}const v=A%o,C=Math.floor(A/o);for(let L=-1;L<=1;L++)for(let g=-1;g<=1;g++){if(!g&&!L)continue;const b=v+g,P=C+L;if(b<0||P<0||b>=o||P>=o)continue;const N=P*o+b;if(f[N]||!m(N)||g&&L&&(!m(C*o+b)||!m(P*o+v)))continue;const I=c(N);if(!zs(E,I,t))continue;const H=u[A]+i*Math.hypot(g,L);H>=u[N]||(u[N]=H,d[N]=A,x(N,H+_(I)))}}return null}function fg(n,{reduced:e=!1,onMove:t,onInteract:i,onCollect:s,onEnvironmentChange:r}){let o=7919;const a=()=>((o=o*16807%2147483647)-1)/2147483646,c=new ih;c.background=new at("#1a2833"),c.fog=new Pc("#1a2833",.011);const l=new Sn(46,innerWidth/innerHeight,.1,210),u=new ag({antialias:!0,powerPreference:"high-performance"});u.setPixelRatio(Math.min(devicePixelRatio,innerWidth<600?1.15:1.5)),u.setSize(innerWidth,innerHeight),u.shadowMap.enabled=!0,u.shadowMap.type=Su,u.outputColorSpace=gn,u.toneMapping=Tu,u.toneMappingExposure=1.25,u.domElement.setAttribute("aria-label","קמפוס בית הספר בתלת־ממד. זזים בחצים או במקשי WASD; אפשר ללחוץ על הקרקע."),n.appendChild(u.domElement),c.add(new hh("#b3c5de","#374039",1.25));const d=new Il("#a4bdd5",2);d.position.set(-22,34,12),d.castShadow=!0,d.shadow.mapSize.set(innerWidth<600?1024:1536,innerWidth<600?1024:1536),Object.assign(d.shadow.camera,{left:-38,right:38,top:38,bottom:-38,near:.1,far:100}),d.shadow.bias=-6e-4,d.shadow.normalBias=.035,c.add(d);const f=new Il("#d7a270",.65);f.position.set(12,7,-40),c.add(f);const p=new Map;function m(M,U=!1){const F=`${M}/${U}`;return p.has(F)||p.set(F,new ki({color:M,roughness:.9,...U?{emissive:M,emissiveIntensity:1.15}:{}})),p.get(F)}function _(M){const U=document.createElement("canvas");U.width=U.height=256;const F=U.getContext("2d");F.fillStyle=M==="grass"?"#798073":M==="brick"?"#9b8a79":"#969a9b",F.fillRect(0,0,256,256);for(let Y=0;Y<11e3;Y++){const _e=Math.floor(a()*60),Ce=a()*256,Re=a()*256;F.fillStyle=`rgba(${_e},${_e},${_e},${a()*.13})`,F.fillRect(Ce,Re,M==="grass"?1:2,M==="grass"?4:2)}if(M==="brick"){F.strokeStyle="#6b6f6b",F.lineWidth=2;for(let Y=0;Y<256;Y+=32){F.beginPath(),F.moveTo(0,Y),F.lineTo(256,Y),F.stroke();for(let _e=Y%64?32:0;_e<256;_e+=64)F.beginPath(),F.moveTo(_e,Y),F.lineTo(_e,Y+32),F.stroke()}}const k=new oo(U);return k.colorSpace=gn,k.wrapS=k.wrapT=ua,k.repeat.set(M==="grass"?26:3,M==="grass"?26:3),k.anisotropy=4,k}const x=new ki({color:"#667560",map:_("grass"),roughness:1}),h=new ki({color:"#a8aba5",map:_("concrete"),roughness:.95}),w=new ki({color:"#b0a698",map:_("brick"),roughness:1}),R=new ki({color:"#717677",map:_("concrete"),roughness:.95});function A(M,U,F,k,Y,_e=c,Ce=!1){const Re=typeof U=="string"?m(U,Ce):U,Fe=new _n(M,Re);return Fe.position.set(F,k,Y),Fe.castShadow=!Ce,Fe.receiveShadow=!Ce,_e.add(Fe),Fe}const E=(M,U,F,k,Y,_e,Ce,Re=c,Fe=!1)=>A(new _s(k,Y,_e),Ce,M,U,F,Re,Fe),v=(M,U,F,k,Y,_e=c,Ce=1,Re=!1)=>A(new ga(k,12,8),Y,M,U,F,_e,Re),C=(M,U,F,k,Y,_e,Ce=c,Re=8)=>A(new Dc(k,Y,Re),_e,M,U,F,Ce),L=(M,U,F,k,Y,_e,Ce=c,Re=10)=>A(new vi(k,k,Y,Re),_e,M,U,F,Ce);function g(M,U,F,k,Y,_e,Ce,Re=c){const Fe=v(M,U,F,1,Ce,Re);return Fe.scale.set(k,Y,_e),Fe}function b(M,U,F,k,Y=c){const _e=new B(...M),Ce=new B(...U),Re=Ce.clone().sub(_e),Fe=A(new vi(F*.7,F,Re.length(),7),k,..._e.clone().add(Ce).multiplyScalar(.5).toArray(),Y);return Fe.quaternion.setFromUnitVectors(new B(0,1,0),Re.normalize()),Fe}const P=[],N=(M,U,F)=>P.push({x:M,z:U,r:F});function I(M,U){return Math.abs(M)>27||Math.abs(U)>27||P.some(F=>!F.disabled&&(F.hx!==void 0?Math.abs(M-F.x)<F.hx+.28&&Math.abs(U-F.z)<F.hz+.28:F.r?Math.hypot(M-F.x,U-F.z)<F.r+.35:((M-F.x)/(F.rx+.3))**2+((U-F.z)/(F.rz+.3))**2<1))}function H(M,U,F,k,Y,_e=.03){const Ce=A(new vi(1,1,.045,48),Y,M,_e,U);return Ce.scale.set(F,1,k),Ce}const X=E(0,-.2,0,180,.3,180,x);X.castShadow=!1;for(let M=0;M<9;M++){const U=M/9*Math.PI*2,F=g(Math.cos(U)*72,3,Math.sin(U)*72,24,9+a()*9,20,"#273c3d");F.castShadow=!1}function Z(M,U=2.3){for(let F=0;F<M.length-1;F++){const k=M[F],Y=M[F+1],_e=Math.hypot(Y[0]-k[0],Y[1]-k[1]),Ce=E((k[0]+Y[0])/2,.015,(k[1]+Y[1])/2,U,.055,_e,R);Ce.rotation.y=Math.atan2(Y[0]-k[0],Y[1]-k[1]),H(k[0],k[1],U/2,U/2,R,.046)}}Z([[0,25],[0,12],[-3,4],[0,-4],[0,-12]],3.1),Z([[-3,4],[-10,1],[-13,-9],[-15,-17]],2.5),Z([[0,-4],[8,-5],[13,-7],[20,-13]],2.5),Z([[0,12],[10,14],[19,18]],2.5),Z([[-13,-9],[-7,-15],[0,-16],[8,-17],[13,-7]],2.1),Z([[0,-12],[7,-17],[7,-24],[0,-25]],2.2),H(0,9,4.6,3.8,h,.05),H(-17,13,7.1,5.5,"#4c5c52",.025);const re=new ki({color:"#214d5b",roughness:.18,metalness:.45});H(-17,13,6.7,5.2,re,.06),P.push({x:-17,z:13,rx:6.5,rz:5});for(let M=0;M<28;M++){const U=a()*Math.PI*2,F=-17+Math.cos(U)*7,k=13+Math.sin(U)*5.5;for(let Y=0;Y<3;Y++)b([F+Y*.1,0,k],[F+Y*.1+.08,.5+a()*.5,k],.018,"#7a8464")}for(let M=0;M<7;M++){const U=M*.9;H(-17+Math.cos(U)*4.6,13+Math.sin(U)*3,.28,.23,"#71836b",.09)}const K=new ki({color:"#687b83",roughness:.22,metalness:.55}),ie=new ki({color:"#c7b38d",emissive:"#b38551",emissiveIntensity:.55,roughness:.35}),te=[],pe={x:-2,z:-16.86,hx:1.34,hz:.09};function Pe(){const M=new xt;M.position.set(-2,0,-20),c.add(M),E(0,4.9,0,12,3.2,6,w,M),E(0,6.65,0,12.6,.35,6.6,h,M),E(0,.03,0,12,.08,6,h,M),E(0,1.65,-2.85,12,3.3,.3,w,M);for(const U of[-1,1])E(U*5.85,1.65,0,.3,3.3,6,w,M),E(U*3.68,1.65,2.9,4.64,3.3,.2,w,M);E(0,1.2,-2.65,5,1.4,.04,"#526660",M),E(0,1.2,-2.6,2.2,.9,.04,"#d6cfb6",M),E(0,.2,3.5,13,.4,1.5,h,M),E(0,.08,4.15,6,.16,.7,h,M);for(const U of[-1,1]){const F=new xt;F.position.set(U*1.34,0,3.14),M.add(F),E(-U*.67,1.65,0,1.32,3.3,.07,K,F),L(-U*1.13,1.5,.08,.025,.5,"#b5b9b6",F),te.push(F)}E(0,3.7,3.8,3.4,.13,1.5,"#45555d",M);for(const U of[-4.75,-3.15,3.15,4.75])for(const F of[1.9,4.65])E(U,F,3.045,1.3,1.7,.12,"#34424a",M),E(U,F,3.115,1.12,1.5,.03,(U+F)%2>.9?ie:K,M),E(U,F,3.14,.04,1.55,.05,"#9a9e98",M),E(U,F+.02,3.14,1.16,.04,.05,"#9a9e98",M);for(const U of[-5.2,-1.7,1.7,5.2])E(U,3.25,3.11,.15,6.5,.15,"#c4c2b8",M);E(-3.9,7.05,-.8,2,.7,1.1,"#626e73",M);for(let U=0;U<7;U++)E(-4.7+U*.25,7.1,-.2,.05,.45,.05,"#34434b",M);L(4,8,-1,.06,2.7,"#7a868b",M),b([3.5,8.5,-1],[4.5,8.5,-1],.025,"#929a9b",M),P.push(pe,{x:-2,z:-22.85,hx:6,hz:.15},{x:-7.85,z:-20,hx:.15,hz:3},{x:3.85,z:-20,hx:.15,hz:3},{x:-5.68,z:-17.1,hx:2.32,hz:.1},{x:1.68,z:-17.1,hx:2.32,hz:.1})}Pe();function ze(M,U,F=!1){const k=new xt;if(k.position.set(M,0,U),c.add(k),E(0,1.9,0,5.5,3.8,4.4,F?"#445e60":w,k),E(0,3.95,0,5.8,.25,4.7,h,k),F){for(const Y of[-2,-.7,.7,2])E(Y,2,2.23,1.05,2.9,.08,K,k),E(Y,2,2.3,.06,3.6,.08,"#a2b2ab",k);for(const Y of[-1.5,0,1.5])E(-2.8,2,Y,.08,2.9,1.1,K,k)}else E(-1.8,2.1,2.25,1.3,1.5,.08,ie,k),E(1.8,2.1,2.25,1.3,1.5,.08,K,k);return E(0,1.5,2.3,1.2,3,.1,"#293b42",k),E(0,1.6,2.37,.9,2.5,.05,K,k),E(0,.12,2.8,3,.24,1.1,h,k),N(M,U,3.45),k}ze(-17,-12),ze(18,-11,!0);const He=new xt;He.position.set(16,0,16),c.add(He);for(const M of[-.85,.85])for(const U of[-.85,.85])b([M,0,U],[M*.6,8,U*.6],.085,"#737b7d",He);for(let M=0;M<8;M+=2)b([-.85,M,-.85],[.85,M+2,-.85],.04,"#646f73",He),b([-.85,M,.85],[.85,M+2,.85],.04,"#646f73",He),E(0,M,0,1.8,.08,1.8,"#566269",He);E(0,8.2,0,2.8,.2,2.8,"#59666b",He),L(0,9.5,0,.045,2.6,"#9aa9ad",He),E(0,10.4,0,1.7,.05,.05,"#9aa9ad",He);const ut=A(new ga(.65,16,10,0,Math.PI*2,0,Math.PI/2),"#819398",.85,7.8,.9,He);ut.rotation.x=-Math.PI/2,N(16,16,1.7);function ne(M,U){const F=Math.hypot(U[0]-M[0],U[1]-M[1]),k=Math.ceil(F/2.5);for(let Y=0;Y<=k;Y++){const _e=Y/k;E(M[0]+(U[0]-M[0])*_e,1.05,M[1]+(U[1]-M[1])*_e,.07,2.1,.07,"#48585e")}for(const Y of[.5,1.4,2.05])b([M[0],Y,M[1]],[U[0],Y,U[1]],.018,"#738184")}ne([-27,-27],[-3,-27]),ne([3,-27],[27,-27]),ne([-27,-27],[-27,27]),ne([27,-27],[27,27]),ne([-27,27],[27,27]),E(-2.5,2.4,-25,.38,4.8,.5,h),E(2.5,2.4,-25,.38,4.8,.5,h),E(0,4.8,-25,5.4,.3,.6,"#5b686c");const ce=new xt;c.add(ce);const Ae=[-1,1].map(M=>{const U=new xt;U.position.set(M*2.2,0,-25),ce.add(U);for(let F=0;F<7;F++)E(-M*F*.32,1.9,0,.045,3.8,.08,"#66757a",U);for(const F of[.7,2.7,3.8])E(-M*1,F,0,2.15,.06,.08,"#66757a",U);return U}),Ye=[-1.15,0,1.15].map(M=>E(M,4.8,-24.65,.28,.13,.06,"#b66c4f",c,!0)),Ue=new uo("#accca0",0,8,2);Ue.position.set(0,3.5,-25),c.add(Ue);function Qe(M,U,F,k="#d9b574"){const Y=document.createElement("canvas");Y.width=Y.height=64;const _e=Y.getContext("2d"),Ce=_e.createRadialGradient(32,32,1,32,32,32);Ce.addColorStop(0,"rgba(244,211,153,.24)"),Ce.addColorStop(1,"rgba(244,211,153,0)"),_e.fillStyle=Ce,_e.fillRect(0,0,64,64);const Re=new _n(new js(F,F),new _i({map:new oo(Y),transparent:!0,depthWrite:!1,color:k}));return Re.rotation.x=-Math.PI/2,Re.position.set(M,.11,U),c.add(Re),Re}function kt(M,U){L(M,1.9,U,.045,3.8,"#43525b"),E(M,3.75,U+.24,.15,.13,.65,"#b8b6a3",c);const F=E(M,3.68,U+.35,.11,.025,.4,"#d6b884",c,!0),k=Qe(M,U+1.1,4.8);return{bulb:F,pool:k}}const et=kt(-2,10);[[2,-4],[-12,-7],[12,-5],[10,12],[-5,-13],[6,-22],[2,-25],[-8,2],[18,4]].forEach(M=>kt(...M));const Tt=new uo("#e5b777",12,14,2);Tt.position.set(-2,3.8,-15.5),c.add(Tt);function O(M,U,F=0){const k=new xt;k.position.set(M,0,U),k.rotation.y=F,c.add(k);for(let Y=0;Y<4;Y++)E(0,.56,-.33+Y*.22,2.5,.06,.17,"#837864",k);for(let Y=0;Y<3;Y++)E(0,.95+Y*.17,-.48,2.5,.12,.06,"#837864",k);for(const Y of[-.9,.9])E(Y,.27,0,.07,.54,.73,"#3d4a51",k),E(Y,.98,-.48,.06,.84,.06,"#3d4a51",k);N(M,U,1.15)}O(8,15),O(-10,-8,Math.PI/2),O(-6,10),E(11,.015,22,11,.05,7,"#606f6c");for(const M of[5.6,16.4])E(M,.06,22,.04,.01,6.7,"#b8b9ad");for(const M of[18.7,25.3])E(11,.06,M,10.8,.01,.04,"#b8b9ad");const tt=A(new Yn(1.75,1.78,48),"#b8b9ad",11,.07,22);tt.rotation.x=-Math.PI/2,L(16.3,1.65,22,.07,3.3,"#6e7b7d"),E(15.95,3.1,22,.08,1.05,1.6,"#9da9a5"),E(15.89,3.05,22,.02,.5,.75,"#c1c6b5");const nt=A(new ds(.27,.025,5,18),"#a87957",15.58,2.83,22);nt.rotation.x=Math.PI/2,N(16.3,22,.25);for(let M=0;M<3;M++){const U=-20.5+M*.5,F=A(new ds(.35,.035,5,12,Math.PI),"#7e898a",U,.35,-8.5);F.rotation.y=Math.PI/2}for(const M of[-22,-21]){const U=A(new ds(.31,.035,5,18),"#26353d",M,.35,-8.5);U.rotation.y=Math.PI/2}b([-22,.35,-8.5],[-21.5,.9,-8.5],.025,"#93624d"),b([-21,.35,-8.5],[-21.5,.9,-8.5],.025,"#93624d"),b([-22,.35,-8.5],[-21,.35,-8.5],.025,"#93624d");function _t(M,U,F=1){const k=new xt;k.position.set(M,0,U),k.scale.setScalar(F),c.add(k);const Y=(a()-.5)*.6;b([0,0,0],[Y,4.6,0],.19,"#665f51",k);for(let _e=0;_e<4;_e++){const Ce=_e*Math.PI*.5+a()*.5,Re=Math.cos(Ce)*(1+a()*.5),Fe=Math.sin(Ce)*(1+a()*.5),Ut=3.5+a()*2;b([Y*.6,2.4+_e*.4,0],[Re,Ut,Fe],.075,"#605c4e",k);const $n=g(Re,Ut+.7,Fe,1.4+a()*.6,1.5+a()*.6,1.3+a()*.6,["#344a3e","#405947","#465b49","#51634c"][_e],k);$n.rotation.z=(a()-.5)*.8}N(M,U,.45*F)}for(let M=0;M<56;M++){const U=M%4,F=-29+Math.floor(M/4)*4.1,k=a()*2;_t(U<2?F:(U===2?-29:29)+k,U<2?(U===0?-29:29)+k:F,.75+a()*.45)}[[-23,-8],[-24,-3],[-22,1],[-20,-3],[-8,20],[-5,23],[6,26],[21,5],[24,1],[21,-2],[8,-13],[-7,-5],[-9,-18],[22,22],[-24,22],[-9,16]].forEach(([M,U])=>_t(M,U,.65+a()*.4));for(let M=0;M<120;M++){const U=(a()-.5)*54,F=(a()-.5)*54;if(!(Math.abs(U)<4||P.some(k=>Math.hypot(U-k.x,F-k.z)<(k.r||7)+.8)))if(M%5===0){const k=g(U,.2,F,.45+a()*.3,.25,.4,"#737b72");k.rotation.y=a()*6}else for(let k=0;k<3;k++)b([U+k*.1,0,F],[U+k*.1+.08,.25+a()*.25,F+.06],.012,"#6c7c5d")}function Te(M,U,F,k,Y,_e=""){const Ce=document.createElement("canvas");Ce.width=1024,Ce.height=256;const Re=Ce.getContext("2d");Re.fillStyle="#243139",Re.fillRect(0,0,1024,256),Re.strokeStyle="#a5a894",Re.lineWidth=4,Re.strokeRect(12,12,1e3,232),Re.textAlign="center",Re.direction="rtl",Re.fillStyle="#e1dfd1",Re.font="bold 62px Arial",Re.fillText(Y,512,_e?108:150),_e&&(Re.font="34px Arial",Re.fillStyle="#bfc6bb",Re.fillText(_e,512,190));const Fe=new oo(Ce);Fe.colorSpace=gn,Fe.anisotropy=4;const Ut=new _n(new js(k,k/4),new _i({map:Fe,side:Gn}));return Ut.position.set(M,U,F),c.add(Ut),Ut}Te(-2,5.75,-16.75,10,"בית הספר שי עגנון","כיתה ז׳ איינשטיין · כיתת הייטק"),Te(-17,3.55,-9.65,4.4,"01 · ספריית איינשטיין"),Te(18,3.55,-8.65,4.4,"02 · מעבדת ההייטק"),Te(16,3.2,17.1,3.2,"03 · תחנת הקשר"),Te(0,5.55,-24.8,4.8,"יציאה"),E(-4,1.1,5,.07,2.2,.07,"#64716d"),Te(-4,2.1,5.1,3.5,"קמפוס שי עגנון","ז׳ איינשטיין · כיתת הייטק"),v(-38,30,-57,1.7,"#bbcbd3",c,3,!0);const Rt=[];for(let M=0;M<85;M++){const U=a()*Math.PI*2,F=65+a()*35;Rt.push(Math.cos(U)*F,25+a()*40,Math.sin(U)*F)}const Ne=new jt;Ne.setAttribute("position",new At(Rt,3)),c.add(new uh(Ne,new $u({color:"#bbcad6",size:.08,transparent:!0,opacity:.65})));const Xe=new Map;function D(M,U,F){const k=new xt;return k.position.set(U,0,F),c.add(k),E(0,.45,0,.85,.9,.6,"#4b575a",k),E(0,.95,0,1.05,.1,.8,"#7c8580",k),Xe.set(M,k),k}const y=D("card",-21,-3);E(0,1.05,0,.48,.035,.3,"#c7c8b8",y),E(-.11,1.073,0,.12,.005,.18,"#507c86",y);for(let M=0;M<3;M++)E(.08,1.073,-.07+M*.065,.17,.005,.015,"#606765",y);const q=D("fuse",21,3),se=L(0,1.09,0,.07,.45,"#d6ccac",q);se.rotation.z=Math.PI/2;for(const M of[-.21,.21]){const U=L(M,1.09,0,.075,.07,"#a6b0b2",q);U.rotation.z=Math.PI/2}const oe=D("antenna",-8,22);E(0,1.12,0,.35,.25,.22,"#2e3e48",oe),b([0,1.25,0],[.24,2.05,.02],.018,"#bbc5c1",oe),E(0,1.14,.12,.19,.1,.025,"#718576",oe);const Q=je.map((M,U)=>{const F=new xt;F.position.set(M.x+1.2,0,M.z-.9),c.add(F),E(0,.65,0,.7,1.3,.45,"#4a585d",F);const k=E(0,1.05,.24,.48,.34,.025,"#a4784e",F,!0);E(0,.67,.25,.45,.06,.05,"#7b8988",F);const Y=new uo("#e3ae72",0,7,2);return Y.position.set(M.x,2.5,M.z),c.add(Y),{g:F,screen:k,light:Y}}),Le=og({scene:c,box:E,ball:v,cyl:L,mesh:A,segment:b,mat:m,sign:Te,softPool:Qe,doorLeaves:te,doorBlocker:pe,lampFixture:et}),ve={value:new B},Be={value:0},De=new Set;c.traverse(M=>{if(M.isMesh)for(const U of[M.material].flat())De.add(U)});for(const M of De)M.onBeforeCompile=U=>{U.uniforms.sightPlayer=ve,U.uniforms.sightEnabled=Be,U.vertexShader=`varying vec3 vSightPosition;
`+U.vertexShader,U.vertexShader=U.vertexShader.replace("#include <project_vertex>",`#include <project_vertex>
        vSightPosition=(modelMatrix*vec4(transformed,1.0)).xyz;`),U.fragmentShader=`varying vec3 vSightPosition;
uniform vec3 sightPlayer;
uniform float sightEnabled;
`+U.fragmentShader,U.fragmentShader=U.fragmentShader.replace("#include <clipping_planes_fragment>",`#include <clipping_planes_fragment>
        if(sightEnabled>0.5 && vSightPosition.y>0.22){
          vec3 sightLine=sightPlayer-cameraPosition;
          float sightLength=length(sightLine);
          vec3 sightDirection=sightLine/sightLength;
          vec3 sightOffset=vSightPosition-cameraPosition;
          float sightDepth=dot(sightOffset,sightDirection);
          float sightDistance=length(sightOffset-sightDirection*sightDepth);
          if(sightDepth>0.0 && sightDepth<sightLength+0.35 && sightDistance<2.6) discard;
        }`)},M.customProgramCacheKey=()=>"player-sight-corridor-v1";c.updateMatrixWorld(!0);const le=new Set([ce,...Ye,...Xe.values(),...Q.map(M=>M.g),...Le.dynamic]),fe=new Map,Ge=[];c.traverse(M=>{if(!M.isMesh)return;let U=M;for(;U;){if(le.has(U))return;U=U.parent}if(M.material.transparent)return;const F=fe.get(M.material)||[];F.push(M.geometry.clone().applyMatrix4(M.matrixWorld)),fe.set(M.material,F),Ge.push(M)});for(const[M,U]of fe){const F=ug(U);if(!F)continue;const k=new _n(F,M);k.castShadow=!M.isMeshBasicMaterial&&!(M.emissiveIntensity>1),k.receiveShadow=!0,c.add(k);for(const Y of U)Y.dispose()}for(const M of Ge)M.removeFromParent(),M.geometry.dispose();function ke(M="#a26e4e",U="#c7a78b",F="#313236",k=!0){const Y=new xt,_e=[],Ce=[];for(const Re of[-1,1]){const Fe=new xt;Fe.position.set(Re*.13,.91,0),Y.add(Fe),A(new Os(.1,.59,4,8),"#3e4b55",0,-.36,0,Fe),g(0,-.83,.09,.115,.08,.23,"#27343a",Fe),_e.push(Fe)}A(new Os(.235,.4,4,10),M,0,1.22,0,Y).scale.z=.7,g(0,1.48,-.08,.24,.16,.18,M,Y),L(0,1.57,0,.075,.15,U,Y),g(0,1.77,.015,.17,.215,.16,U,Y),g(0,1.89,-.035,.177,.12,.17,F,Y),g(0,1.82,-.12,.17,.16,.06,F,Y);for(const Re of[-.065,.065])v(Re,1.79,.169,.015,"#343833",Y);g(0,1.73,.18,.025,.035,.045,U,Y);for(const Re of[-1,1]){const Fe=new xt;Fe.position.set(Re*.27,1.47,0),Y.add(Fe),A(new Os(.075,.36,4,8),M,0,-.21,0,Fe),g(0,-.49,0,.07,.1,.065,U,Fe),Fe.rotation.z=Re*.09,Ce.push(Fe)}if(k){const Re=A(new Os(.19,.26,4,8),"#33434a",0,1.2,-.24,Y);Re.scale.z=.55;for(const Fe of[-1,1])E(Fe*.14,1.31,.16,.04,.43,.025,"#c0b69b",Y);E(0,1.2,-.37,.21,.1,.035,"#8b9b91",Y)}return Y.userData={legs:_e,arms:Ce},Y}const ee=ke();ee.position.set(0,0,9),c.add(ee);const qe=A(new vi(.035,.045,.18,8),"#303c42",.3,.92,.13,ee);qe.rotation.x=Math.PI/2,v(.3,.92,.23,.03,"#e6d4a5",ee,1,!0);const z=new Bt;z.position.set(.3,.1,6),ee.add(z);const ge=new mh("#f0dab1",18,13,.36,.65,1.6);ge.position.set(.3,.95,.24),ge.target=z,ee.add(ge);const me=A(new Yn(.43,.46,40),"#b9c2b3",0,.1,9,c,!0);me.rotation.x=-Math.PI/2;function xe(M="#9f704e",U=!1){const F=new xt,k=[];g(0,.48,0,.21,.26,.56,M,F),g(0,.67,.43,.22,.24,.24,M,F);const Y=C(0,.61,.7,.115,.35,"#c7c3ac",F,10);Y.rotation.x=Math.PI/2,v(0,.61,.88,.04,"#293533",F);for(const Ce of[-.13,.13])C(Ce,.99,.42,.1,.3,M,F,4),C(Ce,.99,.45,.055,.18,"#62564c",F,4),v(Ce,.73,.59,.022,"#252d2d",F);for(const Ce of[-.14,.14])for(const Re of[-.31,.32]){const Fe=new xt;Fe.position.set(Ce,.45,Re),F.add(Fe),L(0,-.19,0,.045,.4,"#514c44",Fe,7),g(0,-.39,.03,.05,.04,.1,"#353c39",Fe),k.push(Fe)}const _e=g(0,.56,-.76,.16,.17,.49,M,F);return _e.rotation.x=-.4,g(0,.72,-1.1,.13,.13,.2,"#c6c4ae",F),F.userData={legs:k},U&&F.scale.setScalar(.85),F}function ue(M,U){const F=new xt;if(M==="rabbit"){g(0,.24,0,.19,.22,.32,U,F),g(0,.43,.24,.15,.17,.16,U,F);for(const k of[-.075,.075]){const Y=g(k,.71,.2,.04,.21,.045,U,F);Y.rotation.z=k>0?-.15:.15,v(k,.47,.37,.014,"#263330",F)}g(0,.16,-.28,.085,.09,.08,"#bcbdb0",F);for(const k of[-.15,.15])g(k,.07,.13,.08,.06,.16,U,F)}else{g(0,.32,0,.18,.23,.3,U,F),g(0,.59,.18,.13,.14,.13,U,F);const k=C(0,.57,.37,.035,.15,"#ad9367",F,8);k.rotation.x=Math.PI/2;for(const Y of[-.09,.09])v(Y,.62,.28,.012,"#222e30",F);for(const Y of[-.075,.075])L(Y,.08,.04,.016,.16,"#887c62",F,6);g(-.16,.34,-.02,.04,.17,.25,"#58676b",F),g(.16,.34,-.02,.04,.17,.25,"#58676b",F)}return F}const ae=je.map((M,U)=>{const F=ke(["#65747c","#6c7357","#7c5350"][U],["#b5947b","#c7a88a","#af8c72"][U],["#353231","#3c332c","#292e31"][U],U!==1);F.position.set(M.x,0,M.z),F.rotation.y=.3-U*.45,c.add(F);const k=A(new Yn(.65,.68,36),M.color,M.x,.1,M.z,c,!0);k.rotation.x=-Math.PI/2;const Y=v(M.x,2.35,M.z,.065,"#c1b995",c,1,!0);return{g:F,marker:Y,ring:k}}),we=[];for(let M=0;M<16;M++){const U=M%3===0?"fox":M%3===1?"rabbit":"bird",F=U==="fox"?xe("#947553",!0):ue(U,U==="rabbit"?"#9d9d8c":"#7d8a8b");let k=(a()-.5)*43,Y=(a()-.5)*43;for(let _e=0;_e<80&&I(k,Y);_e++)k=(a()-.5)*43,Y=(a()-.5)*43;F.position.set(k,0,Y),c.add(F),we.push({g:F,type:U,angle:a()*Math.PI*2,speed:.3+a()*.55,turn:a()*4})}for(let M=0;M<3;M++){const U=ue("duck","#8f947b");U.scale.setScalar(1.05),c.add(U),we.push({g:U,type:"duck",angle:M*2,speed:.3,turn:0})}const We=Array.from({length:12},(M,U)=>{const F=[[-4,12],[-8,4],[-14,-3],[-9,-12],[4,-10],[10,-2],[18,2],[19,11],[9,21],[-7,20],[-23,-1],[5,-23]],[k,Y]=F[U];return{x:k,z:Y,mesh:v(k,1.1,Y,.055,"#c9c693",c,1,!0)}}),dt=A(new Yn(.26,.3,24),"#c1c9b4",0,.12,0,c,!0);dt.rotation.x=-Math.PI/2,dt.visible=!1;const ht=lg(c,e),bt=new Set;let Ht={x:0,z:0},An=null,Wt=!1,Rn=!1,vn=0,Bn=0,Nt=0,vs=!1,Jt=Sr(),sn=!1,Pi=!1;const Ve={goal:null,endpoint:null,route:[],following:!1,arrived:!1,blocked:!1,anchor:null,lastPlan:-10};let bn=[],Cn=null,wr=-1,ti=!1,ni=!1,kn=0,Li=0;const T=E(0,1.05,.5,.55,.4,.4,"#d6b783",ee);T.visible=!1;const V=Array.from({length:4},(M,U)=>{const F=new xt;c.add(F),F.visible=!1;const k=A(new Yn(.65,.82,24),new _i({color:"#efd09b",depthTest:!1,side:Gn}),0,.19,0,F);k.rotation.x=-Math.PI/2,k.renderOrder=3;for(let Y=0;Y<=U;Y++)E((Y-U/2)*.24,.22,0,.12,.06,.28,"#fff1c7",F,!0);return F}),j=new xt;c.add(j),j.visible=!1;const W={};for(const M of["evidence","witness","robot","survey","freight","optics","shadow","rescue","relay","courier"]){const U=new xt;U.visible=!1,j.add(U),W[M]=U}E(0,.8,0,1.4,1.1,.15,"#6f8582",W.evidence);for(let M=0;M<3;M++)E((M-1)*.4,.85,.1,.28,.45,.03,"#ded8ba",W.evidence);W.witness.add(ke("#657f8c"));function G(){const M=new xt;E(0,.65,0,.7,.65,.5,"#b3bba7",M),E(0,.86,.28,.4,.13,.04,"#cfe9ca",M,!0);for(const U of[-.4,.4]){const F=L(U,.22,0,.18,.12,"#3e5157",M);F.rotation.z=Math.PI/2}return M}W.robot.add(G());for(const M of[-.4,.4])b([M,0,.3],[0,1.2,0],.04,"#acb7a1",W.survey);b([0,0,-.4],[0,1.2,0],.04,"#acb7a1",W.survey),E(0,1.25,0,.6,.2,.3,"#cfb77d",W.survey);for(let M=0;M<3;M++)E((M-1)*.45,.25+(M===1?.5:0),0,.4,.5,.5,["#ac8c61","#8ba58f","#91a7b2"][M],W.freight);E(0,1,0,.65,.4,.5,"#819b9e",W.optics);const he=L(0,1,.35,.17,.3,"#d1bd89",W.optics);he.rotation.x=Math.PI/2,b([0,0,0],[0,.8,0],.05,"#9ba9a1",W.optics),L(0,1,0,.07,2,"#d4bb88",W.shadow),v(.7,2.2,0,.18,"#f1d8a3",W.shadow,1,!0),E(0,.4,0,1,.8,.8,"#8d9e7c",W.rescue),C(0,1,0,.85,.5,"#a78d65",W.rescue,4),E(0,.25,.42,.4,.5,.03,"#263b40",W.rescue),L(0,1,0,.05,2,"#81969d",W.relay);for(let M=0;M<3;M++)E(0,1.3+M*.3,0,1-M*.2,.05,.05,"#d5bf91",W.relay);E(0,.8,0,.8,1.6,.5,"#738f91",W.courier),E(0,1,.28,.55,.08,.03,"#d5c28e",W.courier,!0);function Me(M,U=0,F=!1){V.forEach((k,Y)=>{var Ce;const _e=((Ce=M==null?void 0:M.points)==null?void 0:Ce[Y])||(Y===0?M:null);k.visible=Wt&&!!_e,_e&&(k.position.set(_e.x,0,_e.z),k.scale.setScalar(F?.85:Y===U?1.2:.8))}),j.visible=Wt&&!!M&&!M.points;for(const[k,Y]of Object.entries(W))Y.visible=(M==null?void 0:M.kind.startsWith(k+"-"))||!1;M&&j.position.set(M.x+1.2,0,M.z)}const Ee=G(),Se=xe("#c49369",!0);c.add(Ee,Se),Ee.visible=Se.visible=!1;const de={type:null,key:null,x:0,z:0,route:[],planned:-10};function $e(M,U,F){if(!Wt||!M){de.type=null,Ee.visible=Se.visible=!1;return}if(de.key!==U||de.type!==M){de.key=U,de.type=M;let k={x:F.x,z:F.z};if(I(k.x,k.z)){for(const[Y,_e]of[[F.x-1,F.z],[F.x,F.z-1],[F.x+1,F.z+1]])if(!I(Y,_e)){k={x:Y,z:_e};break}}de.x=k.x,de.z=k.z,de.route=[],de.planned=-10}Ee.visible=M==="robot",Se.visible=M==="fox",(M==="robot"?Ee:Se).position.set(de.x,0,de.z)}function Oe(M){if(de.type!=="robot")return;if(Math.hypot(de.x-ee.position.x,de.z-ee.position.z)>1.15){for(Nt-de.planned>.8&&(de.route=go({x:de.x,z:de.z},ee.position,I,{radius:1.1})||[],de.planned=Nt);de.route.length&&Math.hypot(de.route[0].x-de.x,de.route[0].z-de.z)<.12;)de.route.shift();const F=de.route[0];if(F){const k=F.x-de.x,Y=F.z-de.z,_e=Math.hypot(k,Y),Ce=Math.min(_e,M*2.6),Re={x:de.x+k/_e*Ce,z:de.z+Y/_e*Ce};zs(de,Re,I)&&(de.x=Re.x,de.z=Re.z,Ee.rotation.y=Math.atan2(k,Y))}}Ee.position.set(de.x,0,de.z)}function it(){return de.type?{type:de.type,x:de.x,z:de.z}:null}function mt(M){!Wt||Rn||ni||(ti=!!M,kn=0)}function Ct(){return!Wt||Rn||ni||ti||Li>0?!1:(es(),sn=!1,Dt(),kn=.24,Li=1.8,!0)}function Lt(){return{crouching:ti,carrying:ni,dashing:kn>0,dashCooldown:+Li.toFixed(2)}}const rt=new rh(new Yn(.09,.16,8),new _i({color:"#efd09b",transparent:!0,opacity:.95,depthWrite:!1,depthTest:!1,side:Gn}),160);rt.count=0,rt.frustumCulled=!1,rt.renderOrder=2,c.add(rt);const Ie=new xt;c.add(Ie),Ie.visible=!1;const Pt=A(new Yn(.56,.63,32),"#e4be7d",0,.16,0,Ie,!0);Pt.rotation.x=-Math.PI/2;const ct=C(0,2.8,0,.22,.5,"#e4be7d",Ie,4);ct.rotation.z=Math.PI,A(new vi(.025,.025,2.3,6),new _i({color:"#e4be7d",transparent:!0,opacity:.3,depthWrite:!1}),0,1.4,0,Ie);const rn=new vt,Di=new Js().setFromEuler(new ei(-Math.PI/2,0,0)),mn=new B(1,1,1);function ii(){if(rt.count=0,Ie.visible=Wt&&!!Ve.goal,!Wt||!Ve.goal)return;const M=Ve.endpoint||Ve.goal;Ie.position.set(M.x,0,M.z);let U={x:ee.position.x,z:ee.position.z},F=0;for(const k of Ve.route){const Y=Math.hypot(k.x-U.x,k.z-U.z),_e=Math.ceil(Y/.75);for(let Ce=1;Ce<=_e&&F<160;Ce++){const Re=Ce/_e;rn.compose(new B(U.x+(k.x-U.x)*Re,.15,U.z+(k.z-U.z)*Re),Di,mn),rt.setMatrixAt(F++,rn)}U=k}rt.count=F,rt.instanceMatrix.needsUpdate=!0,wr=Nt}function yt(){if(!Ve.goal)return;const M={x:ee.position.x,z:ee.position.z},U=dg(M,Ve.goal)?[]:go(M,Ve.goal,I);Ve.route=U||[],Ve.endpoint=U===null?null:U.at(-1)||M,Ve.blocked=U===null,Ve.arrived=U!==null&&U.length===0,Ve.anchor=M,Ve.lastPlan=Nt,Ve.following&&(bn=[...Ve.route],Cn=Ve.blocked||Ve.arrived?null:"guide",Cn||(Ve.following=!1)),ii()}function an(M,U){return!Number.isFinite(M)||!Number.isFinite(U)||Math.abs(M)>27||Math.abs(U)>27?!1:(Ve.goal={x:M,z:U},Ve.following=!1,bn=[],Cn=null,An=null,yt(),!Ve.blocked)}function Dt(){Ve.following=!1,bn=[],Cn=null,An=null,dt.visible=!1}function Qt(){return!Wt||Rn||!Ve.goal||(es(),sn=!1,yt(),Ve.blocked||Ve.arrived)?!1:(Ve.following=!0,Cn="guide",bn=[...Ve.route],bt.clear(),Ht={x:0,z:0},!0)}function on(){let M=0,U=ee.position;for(const F of Ve.route)M+=Math.hypot(F.x-U.x,F.z-U.z),U=F;return{following:Ve.following,arrived:Ve.arrived,blocked:Ve.blocked,goal:Ve.goal&&{...Ve.goal},remaining:+M.toFixed(1),route:Ve.route.map(F=>({...F})),endpoint:Ve.endpoint&&{...Ve.endpoint}}}function er(M){es(),sn=!1,Dt();const U=go({x:ee.position.x,z:ee.position.z},M,I,{radius:.1});U!=null&&U.length&&(bn=U,Cn="click",dt.position.set(U.at(-1).x,.12,U.at(-1).z),dt.visible=!0)}const cn=new B;function Wc(){Wt&&!Rn&&Bn===0&&(es(),sn=!1,Dt(),vn=5.8)}function es(){Jt.seated&&(Jt.seated=!1,ee.position.set(-6,0,11.8),r==null||r({seated:!1}))}function xd(M,U){Jt=M,Le.sync(M,U),M.seated?(ee.position.set(-6,-.35,10.1),ee.rotation.y=0,Pi=!0):Pi&&(ee.position.set(-6,0,11.8),Pi=!1),ae.forEach((F,k)=>{const Y=M.helped.includes(je[k].id);F.g.userData.arms[0].rotation.x=Y?-1.1:0,F.g.userData.arms[1].rotation.x=Y?-.45:0,F.ring.material=m(Y?"#bbd0ab":je[k].color,!0)})}function gd(M){Wt=M,de.key=null,de.type=null,Ee.visible=Se.visible=!1,ti=!1,ni=!1,kn=0,Li=0,V.forEach(U=>U.visible=!1),j.visible=!1,Dt(),bt.clear(),sn=!1,ii()}function $c(M){Rn=M,kn=0,bt.clear(),Ht={x:0,z:0},An=null,dt.visible=!1}function _d(){bt.clear(),Ht={x:0,z:0},Dt()}window.addEventListener("blur",_d),window.addEventListener("keydown",M=>{!Wt||Rn||M.target.matches("input,select,textarea")||(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Space","KeyW","KeyA","KeyS","KeyD"].includes(M.code)&&M.preventDefault(),bt.add(M.code),M.code==="Space"&&Wc(),M.code==="KeyC"&&!M.repeat&&mt(!ti),M.code==="KeyQ"&&!M.repeat&&Ct(),M.code==="KeyE"&&!M.repeat&&i())}),window.addEventListener("keyup",M=>bt.delete(M.code));const qc=new vh,vd=new Vi(new B(0,1,0),0);let Ar=null;u.domElement.addEventListener("pointerdown",M=>{Ar={x:M.clientX,y:M.clientY}}),u.domElement.addEventListener("pointerup",M=>{if(!Wt||Rn||!Ar||Math.hypot(M.clientX-Ar.x,M.clientY-Ar.y)>10)return;qc.setFromCamera(new st(M.clientX/innerWidth*2-1,1-M.clientY/innerHeight*2),l);const U=new B;qc.ray.intersectPlane(vd,U)&&Math.abs(U.x)<27&&Math.abs(U.z)<27&&er({x:U.x,z:U.z})});const bd=new B(11.5,12.5,15.55);function La(M,U=!0){if(Rn||(Nt+=M,ht.tick(Nt)),Wt&&!Rn){Li=Math.max(0,Li-M),kn=Math.max(0,kn-M);let F=(bt.has("KeyD")||bt.has("ArrowRight")?1:0)-(bt.has("KeyA")||bt.has("ArrowLeft")?1:0)+Ht.x,k=(bt.has("KeyS")||bt.has("ArrowDown")?1:0)-(bt.has("KeyW")||bt.has("ArrowUp")?1:0)+Ht.z,Y=F*.806+k*.592,_e=-F*.592+k*.806;if(F||k)es(),sn=!1,Dt();else if(Cn){for(;bn.length&&Math.hypot(bn[0].x-ee.position.x,bn[0].z-ee.position.z)<.1;)bn.shift(),Cn==="guide"&&Ve.route.shift();bn.length?(An=bn[0],Y=An.x-ee.position.x,_e=An.z-ee.position.z):(Cn==="guide"&&(Ve.arrived=!0,Ve.following=!1),Cn=null,An=null,dt.visible=!1,Y=_e=0,ii())}kn>0&&(Y=Math.sin(ee.rotation.y),_e=Math.cos(ee.rotation.y),An=null),An&&(es(),sn=!1);const Ce=Math.hypot(Y,_e),Re=Ce>.05&&!Jt.seated&&!sn;if(Re){const Fe=ni?2.7:ti?1.8:kn>0?11:bt.has("ShiftLeft")||bt.has("ShiftRight")?7.2:4.5,Ut=An?Math.min(Ce,M*Fe):M*Fe,$n=ee.position.x+Y/Ce*Ut,Rr=ee.position.z+_e/Ce*Ut;if(An)if(zs(ee.position,{x:$n,z:Rr},I))ee.position.x=$n,ee.position.z=Rr;else{const yd=Cn==="guide";Dt(),yd&&(Ve.blocked=!0,Ve.lastPlan=Nt)}else I($n,ee.position.z)||(ee.position.x=$n),I(ee.position.x,Rr)||(ee.position.z=Rr);ee.rotation.y=Math.atan2(Y,_e)}Ve.goal&&!Ve.following&&Nt-Ve.lastPlan>=1&&(!Ve.anchor||Math.hypot(ee.position.x-Ve.anchor.x,ee.position.z-Ve.anchor.z)>1.1||Ve.blocked)&&yt(),Nt-wr>.3&&ii(),(Bn>0||vn>0)&&(vn-=14*M,Bn=Math.max(0,Bn+vn*M),Bn===0&&(vn=0)),ee.scale.y=ti?.66:1,T.visible=ni,ee.position.y=Jt.seated?-.35:Bn+(!e&&Re?Math.sin(Nt*14)*.025:0),ee.userData.legs.forEach((Fe,Ut)=>Fe.rotation.x=Jt.seated?-1.3:!e&&Re?Math.sin(Nt*10+Ut*Math.PI)*.5:0),ee.userData.arms.forEach((Fe,Ut)=>Fe.rotation.x=Jt.seated?-.35:!e&&Re?Math.sin(Nt*10+Ut*Math.PI+Math.PI)*.3:0),me.position.set(ee.position.x,.1,ee.position.z);for(let Fe=0;Fe<We.length;Fe++){const Ut=We[Fe];Ut.mesh.visible&&Math.hypot(ee.position.x-Ut.x,ee.position.z-Ut.z)<.95&&(Ut.mesh.visible=!1,s(Fe))}Oe(M),t(ee.position.x,ee.position.z,M)}if(Rn||(Le.update(M,e),we.forEach((F,k)=>{if(F.type==="duck"){F.g.position.set(-17+Math.cos(Nt*.13+k*2)*3,.08,13+Math.sin(Nt*.13+k*2)*2),F.g.rotation.y=-(Nt*.13+k*2);return}const Y=Jt.following===k,_e=Y?ee.position:Jt.waterFilled&&k===1?{x:-8.5,z:8}:null;let Ce=F.speed;if(_e){const Ut=_e.x-F.g.position.x,$n=_e.z-F.g.position.z;F.angle=Math.atan2(Ut,$n),Ce=Math.hypot(Ut,$n)>(Y?1.7:.6)?Y?3.2:1:0}else F.turn-=M,F.turn<=0&&(F.angle+=(a()-.5)*2.4,F.turn=2+a()*4);const Re=F.g.position.x+Math.sin(F.angle)*M*Ce,Fe=F.g.position.z+Math.cos(F.angle)*M*Ce;I(Re,Fe)?F.angle+=Math.PI*.7:(F.g.position.x=Re,F.g.position.z=Fe),F.g.rotation.y=F.angle,!e&&F.g.userData.legs&&F.g.userData.legs.forEach((Ut,$n)=>Ut.rotation.x=Math.sin(Nt*7+$n%2*Math.PI)*.35),e||(F.g.position.y=F.type==="rabbit"?Math.abs(Math.sin(Nt*4+k))*.07:Math.abs(Math.sin(Nt*5+k))*.015)}),e||We.forEach((F,k)=>{F.mesh.position.y=1.1+Math.sin(Nt*1.3+k)*.12})),Wt&&sn)cn.set(-17,.6,13),l.position.set(-9,3.7,18.5),l.lookAt(cn);else if(Wt){const F=new B(ee.position.x,1,ee.position.z);cn.lerp(F,e?1:1-Math.exp(-M*5));const k=bd.clone().multiplyScalar(innerWidth<600?1.2:1);l.position.copy(cn).add(k),l.lookAt(cn)}else{const F=innerWidth<600;cn.set(F?0:7,1,F?-7:-2),l.position.set(F?35:38,F?25:27,F?39:38),l.lookAt(cn)}Be.value=Wt&&!sn?1:0,ve.value.copy(ee.position).y+=1,U&&u.render(c,l)}let Da=performance.now();function Xc(M){const U=Math.min((M-Da)/1e3,.05);Da=M,vs||La(U),requestAnimationFrame(Xc)}return requestAnimationFrame(Xc),window.addEventListener("resize",()=>{l.aspect=innerWidth/innerHeight,l.updateProjectionMatrix(),u.setSize(innerWidth,innerHeight)}),u.domElement.addEventListener("webglcontextlost",M=>{M.preventDefault(),$c(!0),n.dispatchEvent(new CustomEvent("worldlost"))}),La(0),{hideRelay(){ht.sync({})},setActive:gd,setPaused:$c,setCompanion:$e,getCompanion:it,jump:Wc,dash:Ct,setCrouching:mt,movement:Lt,setCarrying(M){ni=!!M,ni&&(ti=!1,kn=0)},setScenario:Me,guideTo:an,followGuide:Qt,stopGuide:Dt,guidance:on,setJoystick(M,U){Ht={x:M,z:U},(M||U)&&Dt()},setPlayer(M,U){Jt.seated&&es(),sn=!1,Dt(),Bn=vn=0,ee.position.set(M,0,U),cn.set(M,1,U),Ve.goal&&yt()},getPlayer:()=>({x:ee.position.x,z:ee.position.z,y:Bn}),animals:()=>we.map((M,U)=>({id:U,type:M.type,x:+M.g.position.x.toFixed(1),z:+M.g.position.z.toFixed(1),following:Jt.following===U,observed:Jt.animalNotes.includes(U)})),setEnvironment:xd,observe(M){sn=M,Dt(),bt.clear(),Ht={x:0,z:0}},isObserving:()=>sn,environmentAnimation:()=>Le.animation,performance:()=>({drawCalls:u.info.render.calls,triangles:u.info.render.triangles,pixelRatio:u.getPixelRatio()}),project(M,U,F){const k=new B(M,U,F).project(l);return{x:(k.x+1)/2*innerWidth,y:(1-k.y)/2*innerHeight,visible:k.z<1&&Math.abs(k.x)<1&&Math.abs(k.y)<1}},setProgress(M){ht.sync(M),We.forEach((U,F)=>U.mesh.visible=!M.collected.includes(F)),ae.forEach((U,F)=>U.marker.visible=!M.relay&&!M.scenario&&!M.seals.includes(je[F].id));for(const[U,F]of Xe)F.visible=!M.relay&&!M.scenario&&!(M.items||[]).includes(U);Q.forEach((U,F)=>{const k=M.seals.includes(je[F].id);U.screen.material=m(k?"#91aa8b":"#a4784e",!0),U.light.intensity=k?12:0}),Ye.forEach((U,F)=>U.material=m(M.seals.length>F?"#a7c1a0":"#9f684f",!0)),Ae.forEach((U,F)=>U.rotation.y=M.seals.length===3?F===0?-1.35:1.35:0),Ue.intensity=M.seals.length===3?10:0},advanceTime(M){vs=!0;for(let U=0;U<Math.min(M,6e4);U+=1e3/60)La(1/60,!1);u.render(c,l)},resumeRealtime(){vs=!1,Da=performance.now()},blocked:I,dispose(){u.dispose()}}}const $=n=>document.getElementById(n),ye=n=>String(n??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),hg=matchMedia("(prefers-reduced-motion: reduce)").matches,Fn={get(n){try{return localStorage.getItem(n)}catch{return null}},set(n,e){try{return localStorage.setItem(n,e),!0}catch{return!1}}},Nc="prepx-afterbell-draft-v1",Oc="prepx-afterbell-pending-v1";function zc(){try{const n=JSON.parse(Fn.get(Oc)||"[]");return Array.isArray(n)?n:[]}catch{return[]}}function pg(n){const e=zc().filter(t=>t.id!==n.id);return e.push(n),Fn.set(Oc,JSON.stringify(e))}async function ed(n){try{const e=await fetch("/api/afterbell/attempts",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n),signal:AbortSignal.timeout(6e3)});return!e.ok||(await e.json()).saved!==!0?!1:(Fn.set(Oc,JSON.stringify(zc().filter(i=>i.id!==n.id))),!0)}catch{return!1}}async function td(){for(const n of zc())await ed(n)&&lt==="complete"&&(S==null?void 0:S.attemptId)===n.id&&$("save-status")&&($("save-status").textContent="✓ התוצאה נשמרה בהיסטוריית המשחק.")}window.addEventListener("online",td);let zt=null,zn="",aa=0,Bc=0,In=null,Zt=0,ps=null,_a="",hc=!1,nd=!1,tn=wa.quizzes[0],S=null,lt="menu",bi=null,pc="snapshot",Jn=null,ou=null,yi=null,Ns=!1,ai=null,J=null,_o=0,mc=null,oa=null,cu=0;const Ji=$("dialog"),qi=$("quiz");qi.innerHTML=Object.entries({hebrew:"עברית",physics:"פיזיקה"}).map(([n,e])=>`<optgroup label="${e}">${wa.quizzes.filter(t=>t.subject_id===n).map(t=>`<option value="${ye(t.id)}">${e} · ${ye(t.title)}</option>`).join("")}</optgroup>`).join("");const Qi=$("scenario");Qi.innerHTML=la.map((n,e)=>`<option value="${n.id}">${String(e+1).padStart(2,"0")} · ${ye(n.title)}</option>`).join("");function Aa(){const n=Tn(Qi.value);$("scenario-preview").textContent=n.brief}Qi.onchange=Aa;const lu=new URLSearchParams(location.search).get("quiz");wa.quizzes.some(n=>n.id===lu)&&(qi.value=lu);Qi.value=_c(qi.value,Fn.get("prepx-afterbell-last-scenario"));Aa();$("player-name").value=Fn.get("prepx-afterbell-name")||"";function Ft(n){$("toast").textContent=n,$("toast").classList.add("visible"),clearTimeout(ou),ou=setTimeout(()=>$("toast").classList.remove("visible"),3300)}function En(n=!0){if(Ns)try{ai??(ai=new AudioContext),ai.resume();const e=ai.createOscillator(),t=ai.createGain();e.connect(t),t.connect(ai.destination),e.type="sine",e.frequency.setValueAtTime(n?520:270,ai.currentTime),e.frequency.exponentialRampToValueAtTime(n?780:220,ai.currentTime+.12),t.gain.setValueAtTime(.035,ai.currentTime),t.gain.exponentialRampToValueAtTime(.001,ai.currentTime+.25),e.start(),e.stop(ai.currentTime+.26)}catch{}}function pn(){if(S)try{sessionStorage.setItem(Nc,JSON.stringify(S)),hc=!0}catch{hc=!1}}function id(){try{return sessionStorage.getItem(Nc)}catch{return null}}function uu(){try{sessionStorage.removeItem(Nc)}catch{}}function sd(){const n=bu(id(),tn);$("resume").classList.toggle("hidden",!n)}async function rd(){const n=++cu,e=qi.value;$("start").disabled=!0,$("scenario-start").disabled=$("relay-start").disabled=!0,$("resume").disabled=!0,$("source-status").textContent="מתחברים לשאלות של PrepX…";let t=wa.quizzes.find(s=>s.id===e),i="snapshot";try{const s=await fetch(`/api/afterbell/quizzes/${e}`,{signal:AbortSignal.timeout(3500)});if(s.ok){const r=await s.json();r.id===e&&_u(r)&&(t=r,i="database")}}catch{}n===cu&&(tn=t,pc=i,$("source-status").textContent=pc==="database"?`● ${tn.questions.length} שאלות מחוברות למאגר PrepX`:`מצב לא מקוון · ${tn.questions.length} שאלות מעותק מאגר PrepX`,$("start").disabled=!J,$("scenario-start").disabled=$("relay-start").disabled=!J,$("resume").disabled=!J,sd())}qi.addEventListener("change",()=>{Qi.value=_c(qi.value,Fn.get("prepx-afterbell-last-scenario")),Aa();const n=new URL(location.href);n.searchParams.set("quiz",qi.value),history.replaceState(null,"",n),rd()});function gt(){clearTimeout(Jn),Jn=null,yi=null,Ji.open&&Ji.close(),lt!=="menu"&&lt!=="complete"&&(lt="explore",bi=null,J==null||J.setPaused(!1)),lt==="menu"&&(J==null||J.setPaused(!1)),oa==null||oa.focus()}function Et(n,e,t){t!=="question"&&t!=="feedback"&&(bi=null),clearTimeout(Jn),yi=null,oa=document.activeElement,lt=t,J==null||J.setPaused(!0),$("dialog-eyebrow").textContent=n,$("dialog-body").innerHTML=e,Ji.open||Ji.showModal(),$("dialog-body").scrollTop=0,$("close-dialog").focus(),vg(),pd()}$("close-dialog").addEventListener("click",()=>{lt==="complete"?Ca():gt()});Ji.addEventListener("cancel",n=>{n.preventDefault(),lt==="complete"?Ca():gt()});function Ra(n=!1,e=!1,t=!1){if(!J)return;const i=$("player-name").value.trim();if(!i){$("player-name").setCustomValidity("רק שם או כינוי, ומתחילים."),$("player-name").reportValidity(),$("player-name").focus();return}if($("player-name").setCustomValidity(""),Fn.set("prepx-afterbell-name",i),S=n?bu(id(),tn):null,S??(S=Dd(tn)),e&&(S.relay=Ed(Number(Fn.get("afterbell-last-relay")??-1)),Fn.set("afterbell-last-relay",String(S.relay.edition))),!n&&t&&(S.scenario=fu(Qi.value),Fn.set("prepx-afterbell-last-scenario",S.scenario.id)),zt=null,Zt=null,zn="",Bc=aa=S.elapsed,document.querySelector(".quest-panel .eyebrow").textContent=S.relay?Wi[S.relay.edition].title:"מערכות הקמפוס",_a=S.participantName||i,S.participantName=_a,mc=null,zt=null,zn="",lt="explore",$("welcome").classList.add("hidden"),$("hud").classList.remove("hidden"),$("pause").classList.remove("hidden"),document.body.classList.add("playing"),J.setPlayer(S.player.x,S.player.z),J.setActive(!0),J.setPaused(!1),J.setProgress(S),S.environment=Sr(S.environment),J.setEnvironment(S.environment,{animate:!1}),J.resumeRealtime(),nn(),pn(),$("scenario-heading").textContent=S.relay?Wi[S.relay.edition].title:S.scenario?`${Tn(S.scenario.id).title} · תיק שטח`:"מערכות הקמפוס",$("world-labels").innerHTML=je.map(s=>`<span class="world-label" id="label-${s.id}"><b>${je.indexOf(s)+1}</b>${ye(s.name)}</span>`).join("")+Gt.map(s=>`<span class="world-label equipment-label" id="label-${s.id}">▣ ${ye(s.short)}</span>`).join("")+'<span class="world-label" id="label-exit">שער היציאה</span><span class="world-label environment-label" id="label-environment"></span><span class="world-label" id="label-field"></span>',Zt=Ki(S,null,J.getPlayer()).index??-1,ps=null,zn="",nn(),!n&&S.relay){const s=Wi[S.relay.edition];Et("תיק שטח 02 · מסילת הכוכבים",`<h2 id="dialog-title">${s.title}</h2><p class="dialog-copy">${s.story}</p><p class="feedback-note">בחרו פנס בעזרת המספרים במפה. אפשר להגיע לבד או עם ״ללכת איתי״. בכל פנס מחכים אתגר שטח ושאלות מתוך ${ye(tn.title)}. אין מגבלת זמן.</p><button id="begin-adventure" class="primary">יוצאים בעקבות האור ←</button>`,"tutorial"),$("begin-adventure").onclick=()=>{gt(),ji()}}else if(!n&&S.scenario){const s=Tn(S.scenario.id);Et("תיק שטח · "+s.title,`<h2 id="dialog-title">${ye(s.title)}</h2><p class="dialog-copy">${ye(s.brief)}</p><ol class="tutorial-steps">${s.steps.map(r=>`<li>${ye(r.title)}</li>`).join("")}</ol><p class="feedback-note">בכל שלב: משימת שטח אחרת ואז שאלות מ${ye(tn.title)}. C להליכה שקטה, Q לזינוק קצר, רווח לקפיצה. בנייד יש כפתורים. עם מטען הולכים לאט. אין לחץ זמן או קנס על טעויות בשטח.</p><button id="begin-adventure" class="primary">למשימה הראשונה ←</button>`,"tutorial"),$("begin-adventure").onclick=()=>{gt(),ji()}}else n||(Et("תדריך · ז׳ איינשטיין",'<h2 id="dialog-title">החשמל נפל. השער נשאר נעול.</h2><p class="school-name">בית הספר שי עגנון · כיתת הייטק</p><p class="dialog-copy">נשארתם אחרי ההאקתון. שלוש תחנות הפרויקט כבו, וביער מסתובב שועל שלא מצא את הדרך החוצה. הצוות שלכם עדיין במתחם.</p><ol class="tutorial-steps"><li>המשימה הקרובה כבר מסומנת. הולכים בעקבות הנקודות המוארות ומקשיבים לאיש הצוות.</li><li>מאתרים את הציוד החסר ומפעילים את בדיקת השטח שלו: קוד, חיבורים או כיוון אות.</li><li>משלימים את שאלות התרגול בכל תחנה, מפעילים את שלוש המערכות ויוצאים בשער הצפוני.</li></ol><p class="feedback-note">אפשר לחקור בכל סדר. ״ללכת איתי״ מוביל אתכם ליעד; ״צריך רמז?״ מסביר מה עושים. משימות הצד מוסיפות אתגרים בדרך. אין לחץ זמן.</p><button id="begin-adventure" class="primary">יוצאים לבדוק את המתחם ←</button>',"tutorial"),$("begin-adventure").onclick=()=>{gt(),ji(),Ft("המשימה הראשונה מסומנת למעלה. עקבו אחרי הנקודות המוארות, או לחצו על ״ללכת איתי״.")})}$("player-name").addEventListener("input",()=>{$("player-name").setCustomValidity("")});$("scenario-start").onclick=()=>Ra(!1,!1,!0);$("relay-start").addEventListener("click",()=>Ra(!1,!0));$("start").addEventListener("click",()=>Ra());$("resume").addEventListener("click",()=>Ra(!0));function Ca(){gt(),lt="menu",J.hideRelay(),J.setActive(!1),Qi.value=_c(qi.value,Fn.get("prepx-afterbell-last-scenario")),Aa(),J.setPaused(!1),J.resumeRealtime(),$("welcome").classList.remove("hidden"),$("hud").classList.add("hidden"),$("pause").classList.add("hidden"),document.body.classList.remove("playing"),sd()}function kc(){if(!S||!J)return null;const n=J.getPlayer(),e=S.scenario&&Ys(S);if(e&&Math.hypot(n.x-e.x,n.z-e.z)<2.2)return{type:"scenario",d:0};if(J.isObserving())return{type:"observation",d:0};if(S.environment.seated)return{type:"environment",id:"bench",d:0};const t=Nn.find(r=>r.id===zt);if(t){const r=Math.hypot(n.x-t.x,n.z-t.z);if(r<t.range)return{type:"environment",id:t.id,d:r}}let i=null;if(S.relay)for(let r=0;r<3;r++){const o=$t(S.relay,r),a=Math.hypot(n.x-o.x,n.z-o.z);if(a<2.8&&!S.seals.includes(je[r].id)&&(i={type:"relay",i:r,d:a}),o.task==="sparks")for(const c of va(o)){if(S.relay.steps[r]&1<<c.bit)continue;const l=Math.hypot(n.x-c.x,n.z-c.z);l<1.95&&(!i||i.type!=="spark"||l<i.d)&&(i={type:"spark",i:r,bit:c.bit,d:l})}}else je.forEach((r,o)=>{const a=Math.hypot(n.x-r.x,n.z-r.z);a<3.5&&(!i||a<i.d)&&(i={type:"npc",i:o,d:a})}),Gt.forEach((r,o)=>{if(S.scenario||S.items.includes(r.id))return;const a=Math.hypot(n.x-r.x,n.z-r.z);a<2.8&&(!i||a<i.d)&&(i={type:"equipment",i:o,d:a})});const s=Math.hypot(n.x-Gs.x,n.z-Gs.z);return s<3.5&&(!i||s<i.d)&&(i={type:"exit",d:s}),i||(Nn.forEach(r=>{const o=Math.hypot(n.x-r.x,n.z-r.z);o<r.range&&(!i||o<i.d)&&(i={type:"environment",id:r.id,d:o})}),J.animals().forEach(r=>{if(r.type==="duck")return;const o=Math.hypot(n.x-r.x,n.z-r.z);o<2.4&&(!i||o<i.d-.8)&&(i={type:"animal",id:r.id,d:o})}),i)}function Vc(){if(lt!=="explore")return;const n=kc();if(n){if(n.type==="relay"||n.type==="spark"){md(n);return}if(n.type==="scenario"){od();return}if(n.type==="observation"){J.observe(!1),ji();return}if(n.type==="environment"){gc(n.id);return}if(n.type==="animal"){gg(n.id);return}n.type==="exit"?Ti(S)?Eg():Ft(S.relay?`נותרו ${3-S.seals.length} פנסים להדלקה. בחרו פנס במפה.`:`עוד ${3-S.seals.length} מערכות צריכות לחזור לפעולה. בחרו תחנה במפה.`):n.type==="equipment"?xg(n.i):ad(n.i)}}$("interact").addEventListener("click",Vc);const mg=["נ","א","א"];function br(n){const e=je[n];return`<div class="character-chip"><div class="portrait" aria-hidden="true">${mg[n]}</div><div><h2 id="dialog-title">${ye(e.name)}</h2><small>${ye(e.role)}</small></div></div><button class="text-button npc-chat" data-npc-chat="${n}">לשוחח ולעזור לצוות ↗</button>`}function ad(n){if(S.scenario){const i=Ys(S);if(i){Ft(i.hint);return}Ft("כל משימות השטח הושלמו. השער פתוח.");return}const e=je[n];if(Mn(S,n),S.seals.includes(e.id)){Et("חברים לדרך",br(n)+`<p class="dialog-copy">${n===0?"מסוף הגישה פעיל. רשמתי את התקלה. עכשיו רק צריך להסביר למורה למה התאריך בדוח הוא מחר.":n===1?"מערכת הגיבוי פועלת. פעם הבאה נבדוק אותה לפני שכולם הולכים הביתה. רעיון מהפכני.":"הקשר חזר. אם תשמעו רעש מהיער — הפעם אני הולך לבדוק. עם פנס. ועם מישהו."}</p><button id="back-world" class="primary">ממשיכים לחקור ←</button>`,"dialogue"),$("back-world").onclick=gt;return}if(S.understood.includes(e.id)){S.items.includes(Gt[n].id)?Xi(n):xc(n);return}const t=So(e.choices.map((i,s)=>({text:i,original:s})));Et("לפני שפותרים, מקשיבים",br(n)+`<p class="dialog-copy">${ye(e.line)}</p><div class="options">${t.map(i=>`<button class="option social" data-choice="${i.original}">${ye(i.text)}</button>`).join("")}</div><p id="social-feedback" class="feedback-note" role="status"></p>`,"dialogue"),document.querySelectorAll(".social").forEach(i=>i.onclick=()=>{if(Number(i.dataset.choice)!==e.need){$("social-feedback").textContent=e.wrong,En(!1);return}S.understood.push(e.id),pn(),En(),xc(n)})}function xc(n){const e=je[n],t=Gt[n],i=S.items.includes(t.id);Et(`תחנה ${n+1} · ${e.system}`,br(n)+`<p class="dialog-copy">${ye(e.reply)}</p><div class="journal-entry"><h3>${i?"✓ הציוד איתכם":`נדרש: ${ye(t.name)}`}</h3><p>${ye(i?t.report:t.hint)}</p></div><p class="feedback-note">${Mn(S,n).total} שאלות מהתרגול הנבחר מפעילות את בדיקת התחנה. ציון הלימוד נפרד מהציוד ומהחקירה.</p><button class="primary" id="${i?"begin-questions":"track-equipment"}">${i?"מפעילים את מסוף התרגול":"סימון הציוד במפה"} ←</button>`,"mission"),i?$("begin-questions").onclick=()=>Xi(n):$("track-equipment").onclick=()=>{Zt=n,ps=t.id,gt(),nn(),Ft(t.hint)}}function od(){const n=Un(S),e=Qn(S);if(!n)return;const t=Ys(S),i=J.getPlayer();if(Math.hypot(i.x-t.x,i.z-t.z)>2.2)return;if(S.scenario.completed.includes(e)){S.items.includes(Gt[e].id)||S.items.push(Gt[e].id),S.understood.includes(je[e].id)||S.understood.push(je[e].id),pn(),J.setProgress(S),Xi(e);return}if(["robot-escort","rescue-trust","courier-course"].includes(n.kind)){const r=Mo(S,{type:n.kind==="rescue-trust"?"befriend":"checkpoint"},i,{...J.movement(),companion:J.getCompanion()});pn(),zn="",nn(),Ft(r.message);return}Et(`תיק שטח · שלב ${e+1}/3`,`<h2 id="dialog-title">${ye(n.title)}</h2><p class="dialog-copy">${ye(n.hint)}</p><div class="field-check scenario-puzzle"><div id="task-workspace"></div><p id="scenario-status" role="status">משימת שטח · אינה משנה את ציון הלימוד</p><button id="field-to-quiz" class="primary hidden">✓ הושלם — לשאלות התרגול ←</button></div>`,"field");let s;s=Pd($("task-workspace"),S,(r,o=!0)=>{const a=Mo(S,r,J.getPlayer(),{...J.movement(),companion:J.getCompanion()});return pn(),o&&($("scenario-status").textContent=a.message),a.walk?(gt(),zn="",nn(),Ft(a.message),a):(a.complete&&(s.render(),$("task-workspace").querySelectorAll("button,input,select").forEach(c=>c.disabled=!0),$("field-to-quiz").classList.remove("hidden"),$("field-to-quiz").focus(),J.setProgress(S),nn(),En()),a)}),$("field-to-quiz").onclick=()=>od()}function xg(n){const e=Gt[n],t=yu[e.id],i=S.environment.checkedEquipment.includes(e.id);In={id:e.id,step:0,channel:1},Et("ממצא בשטח · בדיקת ציוד",`<h2 id="dialog-title">${ye(e.name)}</h2><p class="dialog-copy">${ye(e.clue)}</p><section class="field-check"><h3>${ye(t.title)}</h3><p>${ye(t.hint)}</p><div id="field-controls">${i?"":e.id==="antenna"?'<label for="radio-channel">ערוץ הקשר</label><div class="tuner"><button class="secondary" id="channel-down" aria-label="ערוץ קודם">−</button><output id="radio-channel">1</output><button class="secondary" id="channel-up" aria-label="ערוץ הבא">+</button></div><meter id="signal-meter" min="0" max="5" value="1">עוצמת אות</meter><button class="secondary" id="test-signal">בדיקת האות</button>':`<div class="field-options">${t.options.map((r,o)=>`<button class="secondary" data-operation="${o}">${ye(r)}</button>`).join("")}</div>`}</div><p id="field-status" role="status">${i?"✓ הבדיקה הושלמה. אפשר לקחת את הציוד.":"בצעו את הבדיקה כדי לשחרר את הציוד. אין לחץ זמן."}</p></section><button class="primary" id="collect-equipment" ${i?"":"disabled"}>לקחת ולהמשיך ←</button>`,"equipment");function s(){S.environment.checkedEquipment.push(e.id),pn(),$("field-status").textContent="✓ הבדיקה הצליחה. הציוד מוכן — קחו אותו וחזרו לצוות.",$("field-controls").innerHTML='<div class="field-success">✓ הציוד מגיב</div>',$("collect-equipment").disabled=!1,En()}if(document.querySelectorAll("[data-operation]").forEach(r=>r.onclick=()=>{const o=In.step;if(!Nd(e.id,o,Number(r.dataset.operation))){In.step=0,document.querySelectorAll("[data-operation]").forEach(a=>a.classList.remove("operation-done")),$("field-status").textContent="הסדר עדיין לא מתאים. הרמז נשאר למעלה — מנסים שוב מההתחלה.",En(!1);return}r.classList.add("operation-done"),In.step++,$("field-status").textContent=`✓ שלב ${In.step} מתוך 3`,En(),In.step===3&&s()}),!i&&e.id==="antenna"){const r=o=>{In.channel=Math.max(1,Math.min(7,In.channel+o)),$("radio-channel").textContent=In.channel,$("signal-meter").value=5-Math.abs(5-In.channel),$("field-status").textContent=In.channel===5?"האות יציב. לחצו על בדיקת האות.":"עדיין יש רעש. בדקו את הערוץ המסומן במחברת."};$("channel-down").onclick=()=>r(-1),$("channel-up").onclick=()=>r(1),$("test-signal").onclick=()=>{In.channel===5?s():($("field-status").textContent="הערוץ לא מתאים. במחברת מסומן 5.",En(!1))}}$("collect-equipment").onclick=()=>{S.environment.checkedEquipment.includes(e.id)&&(S.items.includes(e.id)||S.items.push(e.id),Zt=e.npc,ps=null,zt=null,pn(),J.setProgress(S),gt(),nn(),En(),Ft(e.report))}}function fn(n={},e){S&&(Object.assign(S.environment,n),e&&!S.environment.visited.includes(e)&&S.environment.visited.push(e),J.setEnvironment(S.environment),pn(),nn(),ji())}function vo(n){const e=J.getPlayer();return Math.hypot(e.x-n.x,e.z-n.z)<n.range+.1}function gc(n){const e=Nn.find(s=>s.id===n);if(!e||!vo(e))return;const t=S.environment;if(n==="solar"){Et("מנגנון מקומי · חקירה חופשית",`<h2 id="dialog-title">${ye(e.name)}</h2><p class="dialog-copy">${ye(e.description)}</p><div class="environment-switches">${["ירח","שמש","עץ"].map((s,r)=>`<button class="secondary env-switch" data-env-switch="${r}" aria-pressed="${t.switches[r]}"><span>${s}</span><b>${t.switches[r]?"פועל":"כבוי"}</b></button>`).join("")}</div><p id="env-puzzle-status" class="feedback" role="status">${Er(t)?"התאורה פועלת. שלושה פנסי שביל נדלקו.":"ההערה על המכסה: ירח ועץ פועלים, שמש כבויה."}</p><button id="env-leave" class="primary">חזרה לשביל ←</button>`,"environment"),document.querySelectorAll("[data-env-switch]").forEach(s=>s.onclick=()=>{if(!vo(e))return;const r=[...S.environment.switches];r[Number(s.dataset.envSwitch)]=!r[Number(s.dataset.envSwitch)],fn({switches:r},n),gc(n)}),$("env-leave").onclick=gt;return}const i=S.scenario&&["locker","noticeboard"].includes(n)?Tn(S.scenario.id).brief+" "+Tn(S.scenario.id).steps.map(s=>s.title).join(" · "):n==="locker"&&t.lockerOpen?"הפתק בארונית: ״אדם השאיר את האנטנה ליד עמדת הקשר הישנה בדרום־מערב. אם אתם מחזירים, באמת תחזירו.״":e.description;Et("חקירה חופשית · ללא ציון",`<div class="environment-heading"><span class="environment-category">${ye(ba(e,t))}</span><h2 id="dialog-title">${ye(e.name)}</h2></div><p class="dialog-copy">${ye(i)}</p><p class="feedback-note">פעולה בקמפוס. אינה מוסיפה שאלות ואינה משנה את ציון התרגול.</p><button id="env-primary" class="primary" data-environment="${n}">${ye(gu(e,t))} ←</button>`,"environment"),$("env-primary").onclick=()=>{if(!vo(e))return;const s=S.environment;let r="";if(n==="bench"&&(fn({seated:!s.seated},n),r=s.seated?"אפשר להישאר רגע. כדי לקום: תנועה או כפתור הפעולה.":"חוזרים לשטח."),n==="door"){const o=J.getPlayer();if(s.doorOpen&&Math.abs(o.x+2)<1.6&&Math.abs(o.z+16.86)<.75){Ft("זוזו מעט מפתח הדלת לפני שסוגרים אותה.");return}fn({doorOpen:!s.doorOpen},n),r=s.doorOpen?"הדלת נפתחה. אפשר להיכנס למבואה.":"דלת המבואה נסגרה."}if(n==="lamp"&&(fn({lampOn:!s.lampOn},n),r=s.lampOn?"הרחבה מוארת שוב.":"הפנס כובה. פנס היד שלכם עדיין פועל."),n==="basketball"){if(J.environmentAnimation().basketballInFlight){Ft("הכדור בדרך חזרה. עוד רגע.");return}fn({shots:s.shots+1},n),r=`קליעה ${s.shots}. הכדור חוזר לעמדה.`}if(n==="locker"){if(fn({lockerOpen:!s.lockerOpen},n),s.lockerOpen){gc(n);return}r="הארונית סגורה. הרמז נשאר ביומן."}n==="noticeboard"&&(fn({},n),r=S.scenario?"שלוש המשימות של תיק השטח מופיעות ביומן.":"שלושת מיקומי הציוד תועדו ביומן. גם כתב היד החשוד."),n==="telescope"&&(fn({observations:s.observations+1},n),J.observe(!0),r="תצפית באגם. לחצו על סיום התצפית כדי לחזור."),n==="water"&&(fn({waterFilled:!0},n),r="הקערה מלאה. ארנב מהחצר מתקרב בקצב שלו."),n==="planter"&&(fn({watered:!0},n),r="העלים התרוממו. התברר שהפתרון היה מים."),n==="recycling"&&(fn({recycled:!0},n),r="שלוש פחיות הגיעו למחזור. עכשיו נשאר לסדר את תיקיית הפרויקט."),n==="bike"&&(fn({bells:s.bells+1},n),En(),r="הפעמון מצלצל. בדיקת החומרה הסתיימה."),gt(),Ft(r)}}const cd={fox:"שועל",rabbit:"ארנב",bird:"ציפור",duck:"ברווז"};function gg(n){const e=J.animals().find(i=>i.id===n);if(!e)return;const t=J.getPlayer();Math.hypot(t.x-e.x,t.z-e.z)>2.8||(fn({animalNotes:[...new Set([...S.environment.animalNotes,n])]}),Et("יומן טבע · הקמפוס אחרי הלימודים",`<h2 id="dialog-title">${cd[e.type]} בשטח</h2><p class="dialog-copy">${e.type==="fox"?"הוא עוצר, מקשיב, וממשיך. נראה שיש לו תוכנית טובה משלנו. אפשר לתת לו ללכת לידכם בקצב שלו.":e.type==="rabbit"?"האוזניים זזות לפני כל השאר. התצפית נשמרה ביומן; אין צורך להתקרב יותר.":e.type==="duck"?"שלושה ברווזים ממשיכים בסיור באגם. כנראה הם לא קיבלו את הודעת הביטול.":"הציפור כבר מכירה את כל הקמפוס. היא לא מתרשמת במיוחד מכיתת ההייטק."}</p>${e.type!=="duck"?`<button id="animal-follow" class="primary">${e.following?"לתת לו להמשיך בדרכו":"ללכת יחד קצת"} ←</button>`:""}<button id="animal-leave" class="secondary">להמשיך לחקור</button>`,"environment"),$("animal-follow")&&($("animal-follow").onclick=()=>{fn({following:S.environment.following===n?null:n}),gt(),Ft(S.environment.following===n?"חבר חדש הולך לידכם. אפשר להיפרד דרך אותה פעולת מפגש.":"הוא חוזר לסיבוב שלו בקמפוס.")}),$("animal-leave").onclick=gt)}function _g(n){const e=je[n],t=S.environment.helped.includes(e.id),i=[["היומן של נועה מלא בדיקות קטנות. ״כשכל אחד משנה דבר אחר, מתקבלים שלושה באגים ודיון ארוך. נתחיל בעובדות.״","היא מראה את הכיוון של הספרייה: ״כרטיס הצוות נשאר על שולחן העבודה ממערב. תיקי הפרויקט משום מה מסודרים פחות מהקוד.״"],["איתי מצביע על החממה. ״הרובוט היה אמור להשקות. כרגע הוא בעיקר מתעניין בלהיות כבוי.״","״יחידת הגיבוי נמצאת בארגז שממזרח למעבדה. מי שהניח אותה שם קרא לזה פתרון זמני. זה היה בשבוע שעבר.״"],["״הרעש היה מהאגם. בדקתי. ברווז. לא צריך לציין את זה בסיכום ההאקתון.״","״האנטנה נשארה בדרום־מערב. אם נלך יחד לשם, אני אבדוק את השביל ואתם תבדקו שאין עוד ברווז מפתיע.״"]][n];Et("שיחה עם הצוות",br(n)+`<div class="options"><button class="secondary" data-chat-topic="0">איך הולך בינתיים?</button><button class="secondary" data-chat-topic="1">יש עוד רמז לציוד?</button><button id="npc-help" class="primary">${t?"כבר עזרנו · לבדוק מה השתנה":["לעזור לסדר את הבדיקות","לעזור להניח את הבקר","לבדוק יחד את כיוון הרעש"][n]} ←</button></div><p id="npc-chat-reply" class="dialog-copy" role="status"></p><button id="npc-back" class="text-button">בחזרה למשימת התחנה ←</button>`,"conversation"),document.querySelectorAll("[data-chat-topic]").forEach(s=>s.onclick=()=>{$("npc-chat-reply").textContent=i[Number(s.dataset.chatTopic)]}),$("npc-help").onclick=()=>{fn({helped:[...new Set([...S.environment.helped,e.id])]}),$("npc-chat-reply").textContent=["נועה מסמנת בדיקה אחת ברשימה ומרימה יד בתודה. ״מדהים, אפשר לפתור דברים בלי ישיבה של שעה.״","איתי מניח את הבקר על העמדה. ״עכשיו יש לי יד פנויה. בשביל להצביע על התקלה הבאה.״","אדם מסמן את כיוון האגם. ״תודה שבדקתם איתי. מוכן להחזיר את הקשר.״"][n],$("npc-help").textContent="העזרה תועדה ביומן"},$("npc-back").onclick=()=>ad(n)}function vg(){document.querySelectorAll("[data-npc-chat]").forEach(n=>n.onclick=()=>_g(Number(n.dataset.npcChat)))}function ld(n){const e=tn.references.find(i=>i.id===n.ref.id);if(!e)return"";let t;try{if(t=new URL(e.url||"subject.html?subject="+tn.subject_id,"https://hitech.agnon.online/"),!["https:","http:"].includes(t.protocol))return""}catch{return""}return`<a class="reference" target="_blank" rel="noopener noreferrer" href="${ye(t.href)}">מקור: ${ye(e.title)}${n.ref.part?" · "+ye(n.ref.part):""} ↗</a>`}function Xi(n){if(S.scenario&&!S.scenario.completed.includes(n)){gt(),Ft("משלימים קודם את משימת השטח.");return}if(!S.relay&&!S.items.includes(Gt[n].id)){xc(n);return}const e=Mn(S,n);if(!e.next){yg(n);return}const t=S.questions.find(i=>i.id===e.next);bi=t,Et(S.relay?$t(S.relay,n).title:`${je[n].name} · ${je[n].system}`,`<div class="question-meta"><span>${ye(tn.title)}</span><span>שאלה ${Object.keys(S.answers).length+1} מתוך ${S.questions.length}</span></div><div class="progress-line"><i style="width:${Object.keys(S.answers).length/S.questions.length*100}%"></i></div><h2 id="dialog-title">${ye(t.prompt)}</h2>${ld(t)}${S.relay?"":`<button class="text-button npc-chat" data-npc-chat="${n}">רגע לשיחה עם ${ye(je[n].name)} ↗</button>`}<div class="options" id="answer-options">${t.options.map((i,s)=>`<button class="option answer" data-choice="${i.original}"><span class="number">${s+1}</span><span>${ye(i.text)}</span></button>`).join("")}</div><div id="answer-feedback" aria-live="polite"></div>`,"question"),bi=t,document.querySelectorAll(".answer").forEach(i=>i.onclick=()=>bg(t,Number(i.dataset.choice),n))}function bg(n,e,t){const i=Id(S,n.id,e);i&&(lt="feedback",pn(),nn(),En(i.correct),document.querySelectorAll(".answer").forEach(s=>{s.disabled=!0;const r=Number(s.dataset.choice);r===n.correct&&s.classList.add("correct"),r===e&&s.classList.add("selected",i.correct?"correct":"wrong")}),$("answer-feedback").innerHTML=`<div class="feedback"><strong>${i.correct?"✓ תשובה נכונה.":"↺ לא הפעם. הנה ההסבר."}</strong><p>${ye(n.explanation.he)}</p>${n.explanation.en?`<p class="english" lang="en" dir="ltr">${ye(n.explanation.en)}</p>`:""}</div><button class="text-button" id="hold-feedback">להשהות ולקרוא את ההסבר</button><p class="feedback-note">התשובה נעולה. ההסבר נשאר גם ביומן.</p>`,yi=()=>Xi(t),Jn=setTimeout(()=>{yi=null,Xi(t)},1500),$("hold-feedback").onclick=()=>{clearTimeout(Jn),Jn=null,yi=null,$("hold-feedback").textContent="חזרה להמשך אוטומטי",$("hold-feedback").onclick=()=>{yi=()=>Xi(t),Jn=setTimeout(yi,1500),$("hold-feedback").disabled=!0}})}function yg(n){if(S.scenario&&!S.scenario.completed.includes(n)||!(S.relay?Yi(S.relay,n):S.items.includes(Gt[n].id)&&S.understood.includes(je[n].id))||Mn(S,n).next)return;const t=je[n];if(S.seals.includes(t.id)||S.seals.push(t.id),Zt=Ki(S,null,J.getPlayer()).index??-1,ps=null,zt=null,pn(),J.setProgress(S),nn(),En(),S.relay){Et("פנס שמיים · "+S.seals.length+" מתוך 3",`<div class="relay-star" aria-hidden="true">✧</div><h2 id="dialog-title">${$t(S.relay,n).name} מואר עכשיו</h2><p class="dialog-copy">${Ti(S)?"קבוצת הכוכבים של הכיתה זורחת מעל השער הצפוני. בואו לראות אותה.":"קרן אור נוספת הצטרפה למופע. בחרו איזה פנס להדליק עכשיו."}</p><button id="continue-world" class="primary">חזרה לשטח ←</button>`,"reward"),$("continue-world").onclick=gt;return}Et(`מערכת ${S.seals.length} מתוך 3 חזרה לפעולה`,br(n)+`<div class="score-big" style="font-size:52px">✓</div><h2 class="finish-title">${ye(t.system)} — פעיל</h2><p class="dialog-copy">${Ti(S)?"הגישה, הגיבוי והקשר פעילים. השער הצפוני נפתח. הגיע הזמן לצאת מהמתחם.":S.scenario?"שלב התיק הושלם. משימת השטח הבאה כבר מסומנת במפה.":"התחנה מגיבה. אפשר להמשיך לכל אחת מהתחנות האחרות. המפה עודכנה."}</p><button id="continue-world" class="primary">${Ti(S)?"לשער היציאה":"חזרה לשטח"} ←</button>`,"reward"),$("continue-world").onclick=gt}function nn(){S&&($("seal-slots").innerHTML=je.map((n,e)=>`<button class="seal ${S.seals.includes(n.id)?"done":""} ${(S.scenario?Qn(S)===e:Zt===e)?"selected":""}" data-npc="${e}" title="${ye(S.relay?$t(S.relay,e).title:S.scenario?Tn(S.scenario.id).steps[e].title:n.name)}" aria-label="תחנה ${e+1}: ${ye(S.relay?$t(S.relay,e).title:n.name)}. ${S.seals.includes(n.id)?"הושלם":"הצגת הכיוון"}" aria-pressed="${Zt===e}">${S.seals.includes(n.id)?"✓":e+1}</button>`).join(""),document.querySelectorAll("[data-npc]").forEach(n=>n.onclick=()=>{if(S.scenario){zt=null,zn="",yr(),Ft("משימות התיק מתקדמות לפי הסדר. המשימה הנוכחית מסומנת.");return}zt=null,Zt=Number(n.dataset.npc),ps=S.understood.includes(je[Zt].id)&&!S.items.includes(Gt[Zt].id)?Gt[Zt].id:null,nn()}),$("question-progress").innerHTML=`<bdi dir="ltr">${Object.keys(S.answers).length} / ${S.questions.length}</bdi> שאלות`,$("firefly-count").innerHTML=`✧ <bdi dir="ltr">${S.collected.length} / 12</bdi>`,$("objective").textContent=Ki(S,Zt,J.getPlayer()).title,$("environment-progress")&&($("environment-progress").textContent=`${S.environment.visited.length}/12 תגליות`),$("quest-sub").textContent=Ki(S,Zt,J.getPlayer()).hint,yr())}function Pa(){return Nn.find(n=>n.id===zt)||Ki(S,Zt,J.getPlayer())}function yr(){var o,a,c,l,u,d;if(!S||!J)return;J.setCarrying(!!((o=S.scenario)!=null&&o.carrying));const n=J.movement();$("crouch").setAttribute("aria-pressed",String(n.crouching)),$("crouch").disabled=n.carrying,$("dash").disabled=n.carrying||n.crouching||n.dashCooldown>0,$("dash").textContent=n.carrying?"נושאים ציוד":n.dashCooldown>0?`זינוק · ${n.dashCooldown.toFixed(1)}`:"זינוק Q";const e=S.scenario&&Un(S);J.setScenario(e,(a=S.scenario)==null?void 0:a.checkpoint,(c=S.scenario)==null?void 0:c.completed.includes(Qn(S))),J.setCompanion(e==null?void 0:e.entity,S.attemptId+":"+((e==null?void 0:e.kind)||""),e?{x:Si(S).robotX??e.x+(e.entity==="fox"?0:1),z:Si(S).robotZ??e.z+(e.entity==="fox"?0:1)}:null);const t=Pa(),i=t.id,s=Ki(S,Zt,J.getPlayer());i!==zn&&(zn=i,(l=J.guideTo)==null||l.call(J,t.x,t.z),$("objective").textContent=zt?`משימת שטח: ${t.name}`:s.title,$("quest-sub").textContent=zt?((u=Bs(S).find(f=>f.id===t.id))==null?void 0:u.hint)||t.description:s.hint,aa=S.elapsed),(e==null?void 0:e.kind)==="rescue-trust"&&!S.scenario.completed.includes(Qn(S))&&($("quest-sub").textContent=e.hint+` · אמון: ${Math.round((Si(S).trust||0)/3*100)}%`);const r=(d=J.guidance)==null?void 0:d.call(J);if($("follow-path").textContent=r!=null&&r.following?"עצירת ההליכה":r!=null&&r.arrived?"הגעתם — לפעולה":"ללכת איתי",$("follow-path").disabled=lt!=="explore",zt){const f=Bs(S).find(p=>p.id===zt);if(f!=null&&f.done(S.environment)){zt=null,zn="",Ft("✓ משימת הצד הושלמה. חוזרים למסלול הראשי — אפשר לבחור עוד משימת צד.");return}}lt==="explore"&&S.elapsed-Bc>18&&S.elapsed-aa>25&&(aa=S.elapsed,Ft(`הצעד הבא: ${s.title}. כפתור ״ללכת איתי״ יוביל אתכם, או פתחו רמז.`))}$("follow-path").onclick=()=>{var e,t,i;if(lt!=="explore")return;const n=(e=J.guidance)==null?void 0:e.call(J);if(n!=null&&n.following){(t=J.stopGuide)==null||t.call(J);return}if(n!=null&&n.arrived){Vc();return}(i=J.followGuide)==null||i.call(J),Ft("עוקבים אחרי השביל. תנועה בג׳ויסטיק או בחצים מחזירה לכם את השליטה.")};$("mission-hint").onclick=()=>{if(!S)return;const n=Pa(),e=Ki(S,Zt,J.getPlayer());Et("קשר צוות · הצעד הבא",`<h2 id="dialog-title">${ye(zt?n.name:e.title)}</h2><p class="dialog-copy">${ye(zt?n.description:e.hint)}</p><ol class="tutorial-steps"><li>הנקודות המוארות עוקפות עצים ומבנים ומובילות ליעד.</li><li>אפשר ללכת לבד או ללחוץ על ״ללכת איתי״. תנועה ידנית עוצרת את ההובלה.</li><li>כשמגיעים, לחצו על כפתור הפעולה הגדול. הוא אומר בדיוק מה אפשר לעשות.</li></ol><button id="hint-return" class="primary">הבנתי, ממשיכים לשטח ←</button><button id="hint-main" class="text-button">חזרה למשימה הראשית</button>`,"hint"),$("hint-return").onclick=gt,$("hint-main").onclick=()=>{zt=null,zn="",gt(),nn()}};$("side-task").onclick=()=>{S&&(Et("חקירה חופשית · אתגרי שטח",`<h2 id="dialog-title">עוד משהו לעשות בדרך</h2><p class="dialog-copy">${Bs(S).filter(n=>n.done(S.environment)).length} מתוך ${Bs(S).length} משימות צד הושלמו. בוחרים משימה והשביל מתעדכן. הציון הלימודי נשאר נפרד.</p>${Bs(S).map(n=>`<button class="side-mission ${n.done(S.environment)?"side-done":""}" data-side-mission="${n.id}"><strong>${n.done(S.environment)?"✓ ":""}${ye(n.title)}</strong><span>${ye(n.hint)}</span><small>${n.done(S.environment)?"הושלם":"סימון מסלול ←"}</small></button>`).join("")}<button id="side-main" class="text-button">להמשיך במשימה הראשית ←</button>`,"sidequests"),document.querySelectorAll("[data-side-mission]").forEach(n=>n.onclick=()=>{zt=n.dataset.sideMission,zn="",gt(),yr()}),$("side-main").onclick=()=>{zt=null,zn="",gt(),nn()})};function ji(){var l;if(!J||!S||lt==="menu")return;const n=J.getPlayer();if(yr(),innerWidth<600){const u=document.querySelector(".quest-panel").getBoundingClientRect().bottom;$("map-toggle").style.top=u+12+"px",document.querySelector(".map-panel").style.top=u+66+"px"}else $("map-toggle").style.top="",document.querySelector(".map-panel").style.top="";$("minimap").innerHTML=`<path d="M0 25 L0 12 L-3 4 L0 -4 L0 -12 L7 -17 L7 -24 L0 -25 M-3 4 L-10 1 L-13 -9 M0 -4 L13 -7 M0 12 L10 14" fill="none" stroke="#719480" stroke-width="1.4"/><ellipse cx="-17" cy="13" rx="6.5" ry="5" fill="#467e86"/><rect x="-8" y="-23" width="12" height="6" fill="#718a78" rx="1"/>${je.map((u,d)=>{const f=S.relay?{...u,...$t(S.relay,d)}:u;return`<circle cx="${f.x}" cy="${f.z}" r="2.2" fill="${S.seals.includes(f.id)?"#5f8270":f.color}"/><text x="${f.x}" y="${f.z+1}" font-size="3" text-anchor="middle" fill="#152d30">${S.seals.includes(f.id)?"✓":d+1}</text>`}).join("")}<path d="M-2 -26H2V-23H-2Z" fill="${Ti(S)?"#daf69f":"#91a78d"}"/>${Gt.filter(u=>!S.items.includes(u.id)&&(ps===u.id||S.understood.includes(je[u.npc].id))).map(u=>`<rect x="${u.x-1.5}" y="${u.z-1.5}" width="3" height="3" fill="#d9b47d"/>`).join("")}${S.scenario&&Un(S)?(Un(S).points||[Un(S)]).map((u,d)=>`<circle cx="${u.x}" cy="${u.z}" r="1.6" fill="#fff1c7"/><text x="${u.x}" y="${u.z+1}" font-size="2.7" text-anchor="middle" fill="#152d30">${d+1}</text>`).join(""):""}${Nn.map(u=>`<circle cx="${u.x}" cy="${u.z}" r="${zt===u.id?1.6:.7}" fill="${zt===u.id?"#fff1c7":S.environment.visited.includes(u.id)?"#8ba994":"#b39e7a"}"/>`).join("")}<circle cx="${n.x}" cy="${n.z}" r="2.1" fill="#e8a169" stroke="#fff4cd" stroke-width=".7"/>`,$("location").textContent=n.z<-14?"ליד בית הספר":n.x<-10?"הספרייה והאגם":n.x>8&&n.z>5?"מגדל הפנס":n.x>8?"החממה":"קרחת היער";const e=Pa(),t=J.project(e.x,0,e.z),i=J.project(n.x,0,n.z);$("compass").style.transform=`rotate(${Math.atan2(t.x-i.x,i.y-t.y)*180/Math.PI}deg)`,$("direction-text").textContent=`${e.name||e.title} · ${Math.round(Math.hypot(n.x-e.x,n.z-e.z))} צעדים`,je.forEach(u=>{const d=$("label-"+u.id);if(!d)return;const f=S.relay?$t(S.relay,je.indexOf(u)):u;S.relay&&(d.textContent=je.indexOf(u)+1+" · "+f.title);const p=J.project(f.x,3.7,f.z);d.style.left=p.x+"px",d.style.top=p.y+"px",d.style.display=p.visible&&!S.scenario?"block":"none",d.classList.toggle("done",S.seals.includes(u.id))}),Gt.forEach(u=>{const d=$("label-"+u.id);if(!d)return;const f=J.project(u.x,2,u.z),p=Math.hypot(n.x-u.x,n.z-u.z);d.style.left=f.x+"px",d.style.top=f.y+"px",d.style.display=!S.relay&&!S.scenario&&!S.items.includes(u.id)&&f.visible&&(ps===u.id||p<7)?"block":"none"});const s=$("label-exit"),r=J.project(Gs.x,6.2,Gs.z);s&&(s.style.left=r.x+"px",s.style.top=r.y+"px",s.style.display=r.visible?"block":"none");const o=$("label-field");if(o){const u=S.scenario&&Ys(S);if(u){const d=J.project(u.x,2,u.z);o.textContent=u.title,o.style.left=d.x+"px",o.style.top=d.y+"px",o.style.display=d.visible?"block":"none"}else o.style.display="none"}const a=kc();$("interact").classList.toggle("hidden",!a||lt!=="explore"),a&&($("interact").innerHTML=a.type==="relay"?$t(S.relay,a.i).title:a.type==="spark"?"לאסוף ניצוץ ✧":a.type==="scenario"?`${S.scenario.completed.includes(Qn(S))?"לשאלות התרגול":ye(Un(S).title)} <kbd>E</kbd>`:a.type==="observation"?"סיום התצפית <kbd>E</kbd>":a.type==="environment"?`${ye(a.id==="bench"&&S.environment.seated?"לקום מהספסל":Nn.find(u=>u.id===a.id).name)} <kbd>E</kbd>`:a.type==="animal"?`מפגש עם ${cd[(l=J.animals().find(u=>u.id===a.id))==null?void 0:l.type]||"חיה"} <kbd>E</kbd>`:a.type==="exit"?`${Ti(S)?"יוצאים הביתה":"לבדוק את השער"} <kbd>E</kbd>`:a.type==="equipment"?`לבדוק ${ye(Gt[a.i].short)} <kbd>E</kbd>`:`לדבר עם ${ye(je[a.i].name)} <kbd>E</kbd>`);const c=$("label-environment");if(c){const u=(a==null?void 0:a.type)==="environment"?Nn.find(d=>d.id===a.id):null;if(u&&lt==="explore"){const d=J.project(u.x,2.2,u.z);c.textContent=ba(u,S.environment)+" · "+u.name,c.style.left=d.x+"px",c.style.top=d.y+"px",c.style.display=d.visible&&!S.scenario?"block":"none"}else c.style.display="none"}}function ca(){return S.questions.filter(n=>Object.hasOwn(S.answers,n.id)).map(n=>{const e=S.answers[n.id];return`<details class="review-item"><summary>${e.correct?"✓":"↺"} ${ye(n.prompt)}</summary><p>התשובה שלכם: ${ye(n.choices[e.choice])}</p><p>התשובה הנכונה: ${ye(n.choices[n.correct])}</p><p>${ye(n.explanation.he)}</p>${n.explanation.en?`<p lang="en" dir="ltr">${ye(n.explanation.en)}</p>`:""}${ld(n)}</details>`}).join("")}function Mg(){if(S){if(S.relay){Et("יומן המסילה",`<h2 id="dialog-title">${Wi[S.relay.edition].title}</h2>${je.map((n,e)=>`<div class="journal-entry"><h3>${S.seals.includes(n.id)?"✓":"◇"} ${$t(S.relay,e).title}</h3><p>${$t(S.relay,e).name} · ${Mn(S,e).answered} מתוך ${Mn(S,e).total} שאלות</p></div>`).join("")}${ca()}`,"journal");return}if(S.scenario){const n=Tn(S.scenario.id);Et("יומן תיק השטח",`<h2 id="dialog-title">${ye(n.title)}</h2><p class="dialog-copy">${ye(n.brief)}</p>${n.steps.map((e,t)=>`<div class="journal-entry"><h3>${S.seals.includes(je[t].id)?"✓":S.scenario.completed.includes(t)?"◇":"□"} ${t+1} · ${ye(e.title)}</h3><p>${ye(e.hint)}</p><p>${S.scenario.completed.includes(t)?"משימת השטח הושלמה":"משימת השטח ממתינה"} · ${Mn(S,t).answered}/${Mn(S,t).total} שאלות</p></div>`).join("")}<p class="feedback-note">משימות השטח והחקירה נפרדות מציון הלימוד. התשובות שכבר נמסרו נעולות.</p><h3>התשובות וההסברים</h3>${ca()||'<p class="feedback-note">השאלות יופיעו כאן אחרי שתענו.</p>'}`,"journal");return}Et("כל מה שגיליתם",`<h2 id="dialog-title">יומן ההרפתקה</h2>${S.scenario?`<h3>${ye(Tn(S.scenario.id).title)}</h3>${Tn(S.scenario.id).steps.map((n,e)=>`<p>${S.scenario.completed.includes(e)?"✓":"◇"} ${ye(n.title)}</p>`).join("")}`:""}${je.map((n,e)=>`<div class="journal-entry"><h3>${S.seals.includes(n.id)?"✓":"◇"} ${ye(n.name)}</h3><p>${ye(n.role)} · ${Mn(S,e).answered} מתוך ${Mn(S,e).total} שאלות</p><p>${e===0?"מצפון־מערב, ליד הספרייה.":e===1?"מצפון־מזרח, ליד החממה.":"מדרום־מזרח, ליד מגדל הפנס."}</p></div>`).join("")}<h3>ציוד וממצאים</h3>${Gt.map(n=>`<div class="journal-entry"><h3>${S.items.includes(n.id)?"✓":"□"} ${ye(n.name)}</h3><p>${ye(S.items.includes(n.id)?n.clue:n.hint)}</p></div>`).join("")}<h3>חקירה בקמפוס · ${S.environment.visited.length}/12</h3>${Nn.map(n=>`<div class="journal-entry"><h3>${S.environment.visited.includes(n.id)?"✓":"□"} ${ye(n.name)}</h3><p>${ye(ba(n,S.environment))} · ${S.environment.visited.includes(n.id)?ye(n.description):"אפשר לגלות בשטח. המפה מציגה את המיקום."}</p><button class="text-button" data-track-environment="${n.id}">להציג מיקום במפה ←</button></div>`).join("")}<p class="feedback-note">מפגשי טבע: ${S.environment.animalNotes.length} · עזרה לצוות: ${S.environment.helped.length}/3</p><h3>השאלות שכבר פתרתם</h3><p class="feedback-note">התשובות נעולות. אפשר לקרוא וללמוד מהן בכל רגע.</p>${ca()||'<p class="feedback-note">השאלות יופיעו כאן אחרי שתענו.</p>'}`,"journal"),document.querySelectorAll("[data-track-environment]").forEach(n=>n.onclick=()=>{const e=Nn.find(t=>t.id===n.dataset.trackEnvironment);zt=e.id,gt(),yr(),document.body.classList.add("map-open"),$("map-toggle").setAttribute("aria-expanded","true"),Ft(`${e.name} סומן במפה.`)})}}$("journal").onclick=Mg;const Ri=document.createElement("button");Ri.id="map-toggle";Ri.className="secondary map-toggle";Ri.textContent="מפה";Ri.setAttribute("aria-expanded","false");Ri.setAttribute("aria-controls","minimap");$("hud").appendChild(Ri);Ri.onclick=()=>{const n=document.body.classList.toggle("map-open");Ri.setAttribute("aria-expanded",String(n)),Ri.textContent=n?"סגירת מפה":"מפה"};const ud=document.createElement("span");ud.id="environment-progress";document.querySelector(".quest-bottom").appendChild(ud);function dd(){if(S!=null&&S.scenario){const n=Tn(lt==="menu"?Qi.value:S.scenario.id);Et("תדריך שטח · "+n.title,`<h2 id="dialog-title">${ye(n.title)}</h2><p class="dialog-copy">${ye(n.brief)}</p><ol class="tutorial-steps">${n.steps.map(e=>`<li>${ye(e.title)} — ${ye(e.hint)}</li>`).join("")}</ol><p class="feedback-note">WASD או חצים לתנועה, רווח לקפיצה, C להליכה שקטה, Q לזינוק עם התאוששות קצרה. עם מטען הולכים לאט ולא מזנקים. בנייד: ג׳ויסטיק וכפתורי קפיצה, שקט וזינוק. אחרי כל משימת שטח משלימים שאלות מהתרגול; אפשר לחזור ולקרוא תשובות ביומן. אחרי שלושה שלבים, יוצאים בשער.</p><button id="got-it" class="primary">חזרה למשימה ←</button>`,lt==="menu"?"menu":"help"),$("got-it").onclick=gt;return}if(lt==="menu"||S!=null&&S.relay){Et("מדריך שטח",'<h2 id="dialog-title">איך מדליקים את השמיים?</h2><div class="journal-entry"><h3>בוחרים פנס</h3><p>בחרו מספר בלוח המשימה. לכו בעזרת החצים או הג׳ויסטיק, או לחצו על ״ללכת איתי״.</p></div><div class="journal-entry"><h3>מחפשים אור</h3><p>אספו ניצוצות, קפצו בטבעת בעזרת רווח או כפתור החץ, וכוונו את המראות לפי הסמלים. בטבעת יש גם מתג קרקע.</p></div><div class="journal-entry"><h3>מציירים כוכבים</h3><p>ליד פנס טעון לחצו על כפתור הפעולה או על E וענו על שאלות התרגול. אחרי שלושה פנסים, פנו אל השער הצפוני.</p></div><p class="feedback-note">במשימת הקמפוס המקורית הצוות מחכה לציוד ליד שלוש התחנות.</p><button id="got-it" class="primary">חזרה ←</button>',lt==="menu"?"menu":"help"),$("got-it").onclick=gt;return}Et("תדריך שטח",'<h2 id="dialog-title">איך יוצאים מכאן.</h2><div class="journal-entry"><h3>01 · משוטטים</h3><p>מקשי WASD או חצים כדי לזוז, רווח לקפוץ, Shift לרוץ. אפשר ללחוץ על הקרקע. בנייד: גוררים את העיגול וקופצים בכפתור החץ.</p></div><div class="journal-entry"><h3>02 · מקשיבים לחברים</h3><p>מתקרבים לדמות ולוחצים E או על כפתור השיחה. מבינים מה היא צריכה, מאתרים את הציוד שהוא צריך וחוזרים אליו להפעלת מסוף התרגול.</p></div><div class="journal-entry"><h3>03 · פותרים ויוצאים</h3><p>השאלות מגיעות מחומר התרגול שלכם. כל תשובה ננעלת ויש הסבר. אחרי הפעלת שלוש המערכות מגיעים לשער בצפון. אין זמן קצוב ואין קנס על טעות.</p></div><div class="journal-entry"><h3>חקירה חופשית</h3><p>מגלים 12 מקומות לפעולה: יושבים, פותחים דלתות, קולעים לסל, משקים וצופים בטבע. מתקרבים, לוחצים על הכפתור הגדול ובוחרים פעולה. ביומן יש מיקומים ורמזים. החקירה ועזרה לצוות אינן משנות את ציון הלימוד. F למסך מלא. Escape להשהיה.</p></div><button id="got-it" class="primary">חזרה למשימה ←</button>',S&&lt!=="menu"?"help":"menu"),$("got-it").onclick=gt}$("how").onclick=dd;function Gc(){if(!(lt==="menu"||lt==="complete")){if(Ji.open){gt();return}Et("היער יכול לחכות",`<h2 id="dialog-title">רגע לנשום.</h2><p class="dialog-copy">${hc?"ההתקדמות נשמרה בלשונית הזאת.":"הדפדפן חסם שמירה מקומית. השאירו את הלשונית פתוחה כדי להמשיך."} העולם ממתין לכם.</p><div class="options"><button id="unpause" class="primary">חזרה ליער ←</button><button id="show-controls" class="secondary">איך משחקים?</button><button id="menu" class="secondary">חזרה למסך הפתיחה</button></div>`,"paused"),$("unpause").onclick=gt,$("show-controls").onclick=dd,$("menu").onclick=Ca}}$("pause").onclick=Gc;async function fd(){try{document.fullscreenElement?await document.exitFullscreen():await document.documentElement.requestFullscreen()}catch{Ft("הדפדפן הזה לא מאפשר מסך מלא. אפשר להמשיך לשחק כרגיל.")}}$("fullscreen").onclick=fd;$("sound").onclick=()=>{Ns=!Ns,$("sound").setAttribute("aria-pressed",String(Ns)),$("sound").setAttribute("aria-label",Ns?"כיבוי צלילים":"הפעלת צלילים"),$("sound").style.color=Ns?"#d9bd85":"",En()};window.addEventListener("keydown",n=>{var e;n.target.matches("input,select,textarea")||(n.code==="KeyF"&&(n.preventDefault(),fd()),n.code==="Escape"&&!Ji.open&&(n.preventDefault(),Gc()),lt==="question"&&/^Digit[1-4]$/.test(n.code)&&((e=document.querySelectorAll(".answer")[Number(n.code.slice(-1))-1])==null||e.click()))});document.addEventListener("visibilitychange",()=>{document.hidden&&lt==="explore"&&Gc(),document.hidden&&Jn?(clearTimeout(Jn),Jn=null):!document.hidden&&lt==="feedback"&&yi&&(Jn=setTimeout(yi,1500))});window.addEventListener("pagehide",pn);async function Sg(n){return Hd(n)}async function du(n=S,e=tn,t=_a){const i={id:n.attemptId,name:t,quizId:e.id,answers:Object.entries(n.answers).map(([s,r])=>({id:s,choice:r.choice})),startedAt:n.startedAt,contentHash:await Sg(e)};return nd=pg(i),ed(i)}async function Eg(){if(!Ti(S)||lt==="complete")return;const n=S,e=tn,t=_a,i=S.attemptId;pn();const s=vu(S),r=Ud(s),o=Object.values(S.answers).filter(u=>u.correct).length,a=`prepx-best-${tn.id}`,c=Number(Fn.get(a));(!Number.isFinite(c)||s>c)&&Fn.set(a,String(s)),Et("הגעתם הביתה ✧",`${S.relay?`<svg class="relay-finale" viewBox="0 0 180 64" role="img" aria-label="קבוצת הכוכבים של הכיתה"><polyline points="18,48 57,15 96,35 137,8 162,35"/> ${[[18,48],[57,15],[96,35],[137,8],[162,35]].map(([u,d])=>`<path transform="translate(${u} ${d})" d="M0 -6 L2 -2 6 0 2 2 0 6 -2 2 -6 0 -2 -2Z"/>`).join("")}</svg>`:""}<div class="stars" aria-label="${r} כוכבים מתוך שלושה">${"★".repeat(r)+"☆".repeat(3-r)}</div><h2 class="finish-title" id="dialog-title">${S.relay?"הכוכבים נדלקו מעל בית הספר.":"המערכות פעילות.<br>הדרך החוצה פתוחה."}</h2><p class="finish-title feedback-note">צוות איינשטיין, המשימה הושלמה. בפעם הבאה נשארים להאקתון בשעות האור.</p><div class="score-big">${s}<small> / 100</small></div><div class="stats-row"><div><strong>${o}/${S.questions.length}</strong><small>תשובות נכונות</small></div><div><strong>3</strong><small>${S.relay?"פנסים דולקים":"מערכות פעילות"}</small></div><div><strong>${S.collected.length}</strong><small>גחליליות</small></div></div><p id="save-status" class="saved-note" role="status">שומרים את התוצאה בהיסטוריית המשחק…</p><div class="dialog-actions"><button id="replay" class="primary">משימה חדשה ↺</button><a class="secondary" href="https://hitech.agnon.online/subject.html?subject=${tn.subject_id}">לחומר הלימוד ↗</a></div><button id="review-results" class="text-button">התשובות וההסברים שלכם <span>↓</span></button><div id="final-review" class="hidden">${ca()}</div>`,"complete"),$("replay").onclick=()=>{uu(),S=null,Ca()},$("review-results").onclick=()=>$("final-review").classList.toggle("hidden"),mc=du(n,e,t);const l=await mc;if(lt==="complete"&&(S==null?void 0:S.attemptId)===i&&($("save-status").textContent=l?"✓ התוצאה נשמרה בהיסטוריית המשחק. לא נשלח דוא״ל.":nd?"אין חיבור להיסטוריה כרגע. התוצאה נשמרה במכשיר וממתינה לשליחה.":"השמירה נכשלה והדפדפן חסם שמירה מקומית. השאירו את הלשונית פתוחה ונסו שוב.",!l)){const u=document.createElement("button");u.className="text-button",u.textContent="לנסות לשמור שוב",u.onclick=async()=>{u.disabled=!0,await du(n,e,t)?($("save-status").textContent="✓ התוצאה נשמרה בהיסטוריית המשחק.",u.remove()):u.disabled=!1},$("save-status").after(u)}l&&(S==null?void 0:S.attemptId)===i&&uu()}try{J=fg($("world"),{reduced:hg,onInteract:Vc,onEnvironmentChange:n=>{S&&fn(n)},onCollect:n=>{!S||S.collected.includes(n)||(S.collected.push(n),nn(),pn(),En(),S.collected.length%3===0&&Ft(`${S.collected.length} נקודות טבע תועדו ביומן. החקירה לא משנה את ציון הלימוד.`))},onMove:(n,e,t)=>{if(S){if(Math.hypot(n-S.player.x,e-S.player.z)>.01&&(Bc=S.elapsed),S.player={x:n,z:e},S.relay&&lt==="explore"&&Tg(n,e),S.elapsed+=t,S.scenario){const i=Un(S),s={...J.movement(),companion:J.getCompanion()};if(Cd(S,J.getPlayer(),s,t),(i==null?void 0:i.kind)==="robot-escort"&&s.companion){const r=Si(S);r.robotX=s.companion.x,r.robotZ=s.companion.z}if(lt==="explore"&&(i==null?void 0:i.kind)==="courier-course"&&!S.scenario.completed.includes(Qn(S))){const r=Mo(S,{type:"checkpoint"},J.getPlayer(),s);r.ok&&(pn(),zn="",nn(),Ft(r.message))}}_o+=t,_o>1&&(_o=0,pn())}}}),$("loading").classList.add("hidden")}catch{$("loading").innerHTML='<div style="max-width:320px;text-align:center"><h2>היער צריך דפדפן עם תלת־ממד.</h2><p>נסו לעדכן את הדפדפן או להפעיל האצת חומרה.</p><a href="https://hitech.agnon.online/" class="primary">בינתיים, לתרגול הרגיל ←</a></div>',$("start").disabled=!0}$("world").addEventListener("worldlost",()=>{Et("החיבור לתלת־ממד נעצר",'<h2 id="dialog-title">נשמר לכם מקום ביער.</h2><p class="dialog-copy">רעננו את העמוד ובחרו בהמשך ההרפתקה השמורה.</p><button id="reload" class="primary">רענון וחזרה</button>',"paused"),$("reload").onclick=()=>location.reload()});const Mr=$("joystick");let Hc=null;function hd(n){if(Hc!==n.pointerId)return;const e=Mr.getBoundingClientRect();let t=(n.clientX-e.left-e.width/2)/36,i=(n.clientY-e.top-e.height/2)/36;const s=Math.max(1,Math.hypot(t,i));t/=s,i/=s,J==null||J.setJoystick(t,i),$("stick").style.transform=`translate(${t*28}px,${i*28}px)`}Mr.addEventListener("pointerdown",n=>{Hc=n.pointerId,Mr.setPointerCapture(n.pointerId),hd(n)});Mr.addEventListener("pointermove",hd);function pd(){Hc=null,J==null||J.setJoystick(0,0),$("stick").style.transform=""}for(const n of["pointerup","pointercancel","lostpointercapture"])Mr.addEventListener(n,pd);$("jump").onclick=()=>J==null?void 0:J.jump();$("crouch").onclick=()=>{J==null||J.setCrouching(!J.movement().crouching),ji()};$("dash").onclick=()=>{J==null||J.dash(),ji()};setInterval(ji,80);window.render_game_to_text=()=>{var n;return JSON.stringify({mode:lt,coordinateSystem:"x east, z south; y up; world -27..27. Arrow/WASD movement is camera-relative.",source:pc,quiz:tn.id,scenario:S!=null&&S.scenario?{...S.scenario,title:Tn(S.scenario.id).title,stage:Qn(S),step:Un(S)}:null,movement:J?{...J.movement(),companion:J.getCompanion()}:null,player:J==null?void 0:J.getPlayer(),target:kc(),environment:S?Nn.map(e=>({...e,state:ba(e,S.environment),visited:S.environment.visited.includes(e.id),action:gu(e,S.environment)})):[],environmentState:(S==null?void 0:S.environment)||null,environmentAnimation:J==null?void 0:J.environmentAnimation(),observing:(J==null?void 0:J.isObserving())||!1,rendering:J==null?void 0:J.performance(),relay:S!=null&&S.relay?{...S.relay,stations:[0,1,2].map(e=>$t(S.relay,e))}:null,mission:S?{objective:Ki(S,Zt,J.getPlayer()),target:Pa(),navigation:(n=J==null?void 0:J.guidance)==null?void 0:n.call(J),fieldCheck:In,sideCompleted:Bs(S).filter(e=>e.done(S.environment)).length}:null,npcs:je.map((e,t)=>({id:e.id,x:e.x,z:e.z,understood:(S==null?void 0:S.understood.includes(e.id))||!1,sealed:(S==null?void 0:S.seals.includes(e.id))||!1,progress:S?Mn(S,t):null})),equipment:Gt.map(e=>({id:e.id,x:e.x,z:e.z,collected:(S==null?void 0:S.items.includes(e.id))||!1})),exit:{...Gs,open:S?Ti(S):!1},question:bi&&["question","feedback"].includes(lt)?{id:bi.id,prompt:bi.prompt,options:bi.options.map(e=>e.text),locked:!!(S!=null&&S.answers[bi.id])}:null,answered:S?Object.keys(S.answers).length:0,total:tn.questions.length,score:S?vu(S):0,fireflies:(S==null?void 0:S.collected.length)||0,elapsed:Math.floor((S==null?void 0:S.elapsed)||0),animals:J==null?void 0:J.animals(),paused:Ji.open})};window.advanceTime=n=>J==null?void 0:J.advanceTime(n);rd().then(td);function pr(n,e){const t=S.relay;t.steps[n]!==e&&(t.steps[n]=e,pn(),J.setProgress(S),nn(),En(),Ft(Yi(t,n)?"✧ הפנס טעון! הפעילו אותו כדי לפתוח את התרגול.":$t(t,n).task==="sparks"?"✧ ניצוץ נאסף":"✧ המראה מכוונת"))}function Tg(n,e){const t=S.relay;for(let i=0;i<3;i++){if(Yi(t,i))continue;const s=$t(t,i);if(s.task==="sparks")for(const r of va(s))Math.hypot(n-r.x,e-r.z)<.95&&pr(i,t.steps[i]|1<<r.bit);s.task==="ring"&&J.getPlayer().y>.65&&Math.hypot(n-s.x,e-s.z)<1.95&&pr(i,1)}}function md(n){const{i:e}=n,t=S.relay,i=$t(t,e);if(Zt=e,zt=null,n.type==="spark"){pr(e,t.steps[e]|1<<n.bit);return}if(Yi(t,e)){Xi(e);return}if(i.task==="sparks"){Ft("עקבו אחרי הניצוצות הזהובים ואספו את שלושתם."),nn();return}if(i.task==="ring"){Et("טבעת הרוח",'<h2 id="dialog-title">מרימים את האור</h2><p class="dialog-copy">קפצו בתוך הטבעת בלחיצה על רווח או על חץ הקפיצה. אפשר גם להטעין אותה בעזרת מתג הקרקע.</p><button id="ring-jump" class="primary">חזרה לטבעת ←</button><button id="ground-switch" class="secondary">הפעלת מתג הקרקע</button>',"relay"),$("ring-jump").onclick=gt,$("ground-switch").onclick=()=>{gt(),pr(e,1)};return}const s=Wi[t.edition].sequence;Et("מראות הירח",`<h2 id="dialog-title">כוונו את המראות</h2><p class="dialog-copy">הסדר החרוט על הלוח</p><ol class="relay-sequence">${s.map((r,o)=>`<li>${o<t.steps[e]?"✓ ":""}${jc[r]}</li>`).join("")}</ol><div class="field-options">${jc.map((r,o)=>`<button class="secondary" data-mirror="${o}">${r}</button>`).join("")}</div><p id="mirror-feedback" role="status">בחרו את הסמל בשלב ${t.steps[e]+1}.</p>`,"relay"),document.querySelectorAll("[data-mirror]").forEach(r=>r.onclick=()=>{if(Number(r.dataset.mirror)!==s[t.steps[e]]){$("mirror-feedback").textContent="המראה עוד חשוכה. נסו את הסמל המסומן בשלב "+(t.steps[e]+1)+".";return}pr(e,t.steps[e]+1),Yi(t,e)?(gt(),Xi(e)):md(n)})}
