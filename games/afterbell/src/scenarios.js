// Each scenario owns three exclusive field tasks. Academic questions stay in PrepX.
const task=(kind,title,hint,x,z,extra={})=>({kind,title,hint,x,z,...extra});
const path=(kind,title,hint,points,extra={})=>task(kind,title,hint,...points[0],{points:points.map(([x,z])=>({x,z})),...extra});
export const SCENARIOS=[
 {id:'evidence',title:'תיק הראיות',quizzes:['facts'],brief:'חוקרים זירת תקלה: בודקים ממצאים, בונים קשרים ומשחזרים את הערב מתוך ראיות.',steps:[
 task('evidence-scene','בדיקת זירת התקלה','בדקו כל פריט בזירה. אספו רק שלושה ממצאים שאפשר לבדוק; השערה אינה ראיה.',-4,12),
 task('evidence-board','לוח הקשרים','חברו כל ממצא למסקנה היחידה שהוא תומך בה. אין להסיק מעבר למה שנמצא.',-14,-3),
 task('evidence-timeline','שחזור ארבעת האירועים','סדרו את הכרטיסים לפי חותמות הזמן שעליהם. הזיזו כרטיס למעלה או למטה, ואז הגישו את השחזור.',4,-10)]},
 {id:'witness',title:'העד שנעלם',quizzes:['questions'],brief:'חוקרים שתי עדויות, מזהים סתירה ובוחרים היכן לחפש את העד בעולם.',steps:[
 task('witness-interview','ראיון עם שני עדים','עברו בין נועה ואיתי. שאלו שאלות על מקום, זמן ואדם; אספו שלושה פרטים שימושיים לפני הסיכום.',10,-2),
 task('witness-timetable','העדות שלא מסתדרת','לוח המצלמות מציב את איתי בחממה ב־18:10 וב־18:20. סמנו את שתי הטענות שסותרות את הלוח.',18,2),
 path('witness-search','חיפוש לפי העדות','העד תיאר מים ומקום ישיבה. בחרו אתר חיפוש, לכו אליו ובדקו אותו. חיפוש שגוי נותן רמז נוסף.',[[19,11],[4,-10],[-7,20]])]},
 {id:'robot',title:'חילוץ הרובוט',quizzes:['instructions'],brief:'לא עוד אתחול פשוט: מתכנתים מעקף, מתקנים מעגל ומלווים רובוט אמיתי בחזרה לתחנה.',steps:[
 task('robot-route','תוכנית חילוץ במבוך','תכנתו מסלול ברשת 5×5: מ־S בפינה העליונה השמאלית אל G בפינה התחתונה הימנית. הימנעו מתאים חסומים.',4,-10),
 task('robot-circuit','תיקון ארבעה חיבורים','חברו כל יציאה בצבע ובצורה המתאימים. בוחרים יציאה ואז כניסה; חיבור לא מתאים לא נשמר.',18,2),
 path('robot-escort','מלווים את הרובוט הביתה','הרובוט נע לאט מכם. הובילו אותו דרך שלוש תחנות וחכו שיגיע לפני אישור כל תחנה.',[[19,11],[9,21],[-7,20]],{entity:'robot'})]},
 {id:'survey',title:'מודדי הקמפוס',quizzes:['physics-basics'],brief:'יוצאים לסקר אמיתי: מודדים מקטע, תוחמים חלקה ומתרגמים שרטוט למפת שטח.',steps:[
 task('survey-ruler','מדידה בין שתי נקודות','כוונו את קצוות הסרגל לשני הסימונים שעל המוט, ואז רשמו את האורך ביניהם. קוראים את ההפרש, לא את קצה הסרגל.',-4,12),
 task('survey-parcel','תיחום חלקת הקרקע','סמנו את כל המשבצות בתוך הגבול בצורת ר׳. כל משבצת היא מטר רבוע אחד. חשבו את שטח החלקה.',-14,-3),
 task('survey-scale','משרטוט למפת השטח','קנה המידה: כל סנטימטר בשרטוט הוא 10 מטרים בשטח. המבנה ברוחב 4 ס״מ ובעומק 3 ס״מ. מלאו את שתי המידות.',4,-10)]},
 {id:'freight',title:'משלוח במידות',quizzes:['physics-units'],brief:'מפעילים מרכז שילוח: מתקנים יחידות, מאזנים מטען ואורזים חלקים בעלי צורות שונות.',steps:[
 task('freight-manifest','תיקון תעודת המשלוח','לוח באורך 250 ס״מ וצינור באורך 0.8 מ׳ צריכים לצאת. השלימו את ההמרות ובחרו רכב שהלוח נכנס אליו.',18,2),
 task('freight-balance','איזון שלושה משקולות','חלקו את המשקולות 2, 3 ו־5 ק״ג בין שתי הכפות. כל משקולת חייבת להימצא על כף, ושני הצדדים צריכים להתאזן.',19,11),
 task('freight-packing','אריזה ללא חפיפה','הארגז הוא רשת ⁦4×3⁩. בחרו חלק, סובבו בעת הצורך ולחצו על משבצת להצבת הפינה שלו. ארזו את שלושת החלקים בלי חריגה או חפיפה.',-4,12)]},
 {id:'optics',title:'המעבדה המדויקת',quizzes:['physics-precision'],brief:'עובדים כמו צוות מעבדה: ממקדים תמונה, מתקנים זווית הסתכלות ובודקים מדידות חוזרות.',steps:[
 task('optics-focus','מיקוד וחשיפה','כוונו בנפרד את המיקוד ואת החשיפה עד ששלושת הסימנים חדים וברורים. רק אז צלמו את לוח הכיול.',-9,-12),
 task('optics-parallax','ביטול שגיאת ההסתכלות','בכל עין יישרו את הכוונת עם הקו המרכזי. שני המבטים צריכים להיפגש באותו סימון, ולא רק להיראות קרובים.',4,-10),
 task('optics-samples','סדרת מדידות חוזרות','קחו חמש מדידות. סמנו את הקריאה החריגה, והקלידו את הממוצע של ארבע הקריאות שנותרו.',10,-2)]},
 {id:'shadow',title:'סוד הצללים',quizzes:['physics-pole'],brief:'לומדים את המגדל דרך האור: מניעים מקור אור, משווים יחסים וקוראים שעון שמש.',steps:[
 task('shadow-light','מי מזיז את הצל?','הציבו את מקור האור בצד המזרחי, ואז סמנו לאיזה צד נופל הצל. נוגעים במקור ובצל בנפרד.',9,21),
 task('shadow-height','גובה מתוך שני צללים','עמוד הייחוס בגובה 2 מטרים מטיל צל באורך 3 מטרים. צל המגדל באורך 9 מטרים. כוונו את עמוד הייחוס ורשמו את גובה המגדל.',10,-2),
 task('shadow-sundial','שתי תצפיות בשעון השמש','העבירו את השעה ל־10 ול־14 ושמרו תצפית בכל שעה. לאחר מכן בחרו באיזו תצפית הצל קצר יותר.',-9,-12)]},
 {id:'rescue',title:'מחזירים את השועל',quizzes:['facts'],brief:'השועל הוא שותף למשימה: מרוויחים את אמונו, בונים לו מחסה ומטפלים בשלושה צרכים שונים.',steps:[
 task('rescue-trust','מרוויחים את אמון השועל','התקרבו לשועל בהליכה שקטה והישארו לידו שלוש שניות. קימה או התרחקות מפחיתות אמון; אין לחץ זמן.',-7,20,{entity:'fox'}),
 task('rescue-shelter','בונים פינת מחסה','מקמו מים בצד השמאלי, מצע בשורה האחורית וגגון במרכז. השאירו את המשבצת הקדמית האמצעית פנויה ככניסה.',-14,-3),
 task('rescue-care','קוראים את צורכי השועל','הרגיעו את השועל לפני הצעת מים. אחרי השתייה אפשר לתת לו לנוח במחסה. עקבו אחרי מדדי השקט, המים והמנוחה.',-9,-12)]},
 {id:'relay',title:'האות האחרון',quizzes:['questions'],brief:'מקימים קשר מחדש: מסנכרנים גל, משדרים הודעת מורס ומשקמים רשת עם צומת תקול.',steps:[
 task('relay-wave','סנכרון שני גלים','כוונו תדירות ומופע עד שהגל שלכם חופף לגל המקווקו. כיוון נכון של כפתור אחד בלבד אינו מספיק.',9,21),
 task('relay-morse','משדרים SOS','טבלת הקוד: S היא שלוש נקודות; O היא שלושה קווים. שדרו אות, סיימו אות, והמשיכו עד להודעה SOS.',19,11),
 task('relay-network','מעקף לצומת שנפל','חברו את התחנה משמאל אל התחנה מימין דרך התחנות התקינות שביניהן. הצומת האדום תקול ואסור להשתמש בו.',18,2)]},
 {id:'courier',title:'שליחי הלילה',quizzes:['instructions','english-v1-practice','english-vocabulary-12','english-vocabulary-20','english-vocabulary-28','english-parts-sort','english-parts-quiz','english-negative-1','english-negative-2','english-affirmative-1','english-affirmative-2','english-questions-1'],brief:'משלוח עם החלטות ותנועה: מתכננים מסלול, עוברים מסלול תנועה ומוסרים כל חבילה לארונית הנכונה.',steps:[
 task('courier-plan','מסלול עם תקציב מרחק','אוספים מפתח במחסן לפני הכניסה למעבדה, ומסיימים בשער. התקציב הוא 14 יחידות דרך. בחרו סדר עצירות ובדקו את הסכום.',-4,12),
 path('courier-course','מסלול ארבע התנועות','סימון 1: קפיצה. סימון 2: זינוק ב־Q. סימון 3: קפיצה. סימון 4: נחיתה ועמידה. השלימו את התנועות בשטח, לא מתוך חלון.',[[-8,4],[-14,-3],[-9,-12],[4,-10]]),
 path('courier-lockers','כל חבילה לארונית שלה','לכל ארונית קוד אחרת. הגיעו אליה ובחרו חבילה שהקוד שעליה הפוך לקוד הארונית. מסירה שגויה נשארת בתיק.',[[10,-2],[18,2],[19,11]])]}
];
export const scenarioById=id=>SCENARIOS.find(s=>s.id===id);
export function recommendedScenario(quizId,last){const a=SCENARIOS.filter(s=>s.quizzes.includes(quizId));return (a.find(s=>s.id!==last)||a[0]||SCENARIOS[0]).id;}
export const newScenario=id=>({id,revision:2,completed:[],checkpoint:0,sequence:[],commands:[],carrying:false,data:{}});
function safeData(v,depth=0){if(depth>5)return false;if(v===null||typeof v==='boolean')return true;if(typeof v==='number')return Number.isFinite(v)&&Math.abs(v)<10000;if(typeof v==='string')return v.length<=80;if(Array.isArray(v))return v.length<=64&&v.every(x=>safeData(x,depth+1));return !!v&&typeof v==='object'&&Object.keys(v).length<=32&&Object.entries(v).every(([k,x])=>!['__proto__','constructor','prototype'].includes(k)&&k.length<=40&&safeData(x,depth+1));}
export function restoreScenario(raw){
 if(!raw||!scenarioById(raw.id)||!Array.isArray(raw.completed)||raw.completed.length>3||raw.completed.some((n,i)=>n!==i)||!Number.isInteger(raw.checkpoint)||raw.checkpoint<0||raw.checkpoint>3||!Array.isArray(raw.sequence)||raw.sequence.length>3||!Array.isArray(raw.commands)||raw.commands.length>16||typeof raw.carrying!=='boolean')return null;
 if(raw.revision!==undefined&&raw.revision!==2)return null;
 if(raw.revision===2&&(!safeData(raw.data)||Array.isArray(raw.data)||typeof raw.data!=='object'||!raw.data))return null;
 if(raw.revision===2){const d=raw.data,arrays=['inspected','evidence','links','order','notes','claims','commands','wires','cells','bins','samples','observations','layout','edges','route','delivered'];for(const key of arrays){if(d[key]!==undefined&&(!Array.isArray(d[key])||d[key].some(n=>!Number.isFinite(n))))return null;}for(const [key,size]of [['links',3],['order',4],['bins',3],['placements',3],['layout',3]])if(d[key]!==undefined&&(!Array.isArray(d[key])||d[key].length!==size))return null;if(d.placements?.some(p=>p!==null&&(!Number.isInteger(p.x)||!Number.isInteger(p.y)||typeof p.rotate!=='boolean')))return null;if(d.letters!==undefined&&(!Array.isArray(d.letters)||d.letters.length>3||d.letters.some(s=>!['...','---'].includes(s))))return null;if(d.current!==undefined&&(typeof d.current!=='string'||!/^[-.]{0,3}$/.test(d.current)))return null;}

 return {...newScenario(raw.id),completed:[...raw.completed],checkpoint:raw.revision===2?raw.checkpoint:0,data:raw.revision===2?structuredClone(raw.data):{}};
}
export function scenarioStage(round){return ['owl','pigeon','raccoon'].findIndex(id=>!round.seals.includes(id))<0?3:['owl','pigeon','raccoon'].findIndex(id=>!round.seals.includes(id));}
export function scenarioStep(round){return scenarioById(round.scenario?.id)?.steps[scenarioStage(round)];}
export function taskData(round){const step=scenarioStep(round);if(!step)return {};const s=round.scenario;if(s.data.task!==step.kind){s.data={task:step.kind};s.checkpoint=0;}return s.data;}
export function scenarioGoal(round){const index=scenarioStage(round),step=scenarioStep(round);if(!step)return null;taskData(round);const done=round.scenario.completed.includes(index),point=(done?step.points?.at(-1):step.points?.[round.scenario.checkpoint])||step;
 return {id:`scenario:${round.scenario.id}:${index}:${round.scenario.checkpoint}:${done}`,kind:'scenario',index,...point,title:done?'משימת השטח הושלמה — לתיק הלימוד':step.title,hint:done?'לחצו על פעולה כדי להמשיך לשאלות.':step.hint,action:done?'לשאלות התרגול':'למשימת השטח'};}
export const EVIDENCE=['צילום: שלושה חלונות מוארים','ניחוש: מישהו כנראה נשאר בכיתה','לוג: הפסקת חשמל ב־18:12','דעה: זה המסוף הכי גרוע','כרטיס כניסה חתום ב־18:05','שמועה: התקלה קרתה בגלל שועל'];
export const TIMELINE=[{label:'18:12 · הפסקת חשמל',time:12},{label:'18:20 · נעילת המבנה',time:20},{label:'18:00 · פתיחת המעבדה',time:0},{label:'18:05 · כניסת הצוות',time:5}];
export const NETWORK=[[0,1],[1,3],[3,4],[4,5],[1,2],[2,5],[0,3],[3,5]];
export const PARCEL=[0,1,2,3,4,8];
export function runProgram(commands){let x=0,z=0;const trail=[{x,z}];for(const c of commands){const d=[[1,0],[0,1],[-1,0],[0,-1]][c];if(!d)return {ok:false,trail};x+=d[0];z+=d[1];trail.push({x,z});if(x<0||x>4||z<0||z>4||[[1,1],[2,1],[2,2],[3,3]].some(p=>p[0]===x&&p[1]===z))return {ok:false,trail};}return {ok:x===4&&z===4,trail};}
export function packingCells(placements){const shapes=[[2,2],[2,1],[1,2]],cells=[];for(let i=0;i<3;i++){const p=placements?.[i];if(!p)continue;let[w,h]=shapes[i];if(p.rotate)[w,h]=[h,w];for(let y=0;y<h;y++)for(let x=0;x<w;x++){const cx=p.x+x,cy=p.y+y;if(cx<0||cx>3||cy<0||cy>2)return null;const id=cy*4+cx;if(cells.some(c=>c.id===id))return null;cells.push({id,piece:i});}}return cells;}
export function routeCost(order){const cost=[[0,3,8,12],[3,0,4,10],[8,4,0,5],[12,10,5,0]];let total=0,from=0;for(const n of order){total+=cost[from][n+1];from=n+1;}return total;}
const exact=(a,b)=>Array.isArray(a)&&a.length===b.length&&[...a].sort((a,b)=>a-b).every((x,i)=>x===[...b].sort((a,b)=>a-b)[i]);
const toggle=(a,n)=>a.includes(n)?a.filter(x=>x!==n):[...a,n];
export function fieldAction(round,action,player={x:0,z:0},movement={}){
 const s=round.scenario,step=scenarioStep(round),index=scenarioStage(round);if(!s||!step)return {ok:false,message:'אין משימת שטח פעילה.'};if(s.completed.includes(index))return {ok:true,complete:true,message:'השלב כבר הושלם.'};
 const d=taskData(round),goal=scenarioGoal(round);if(Math.hypot(player.x-goal.x,player.z-goal.z)>2.2)return {ok:false,message:'התקרבו למקום המשימה בשטח.'};
 const k=step.kind,n=action.value;let solved=false,message='הפעולה עוד לא משלימה את המשימה. בדקו את הנתונים ונסו שוב.',ok=true;
 if(action.type==='reset'){s.data={task:k};return {ok:true,message:'משימת השטח אופסה. אפשר לנסות דרך אחרת.'};}
 if(action.type==='clear'&&['a','b','c','number','vehicle','answer','selected','rotate'].includes(action.key))delete d[action.key];
 if(action.type==='set'&&typeof action.key==='string'&&['a','b','c','number','vehicle','answer','selected','rotate'].includes(action.key)&&Number.isFinite(n)&&Math.abs(n)<1000)d[action.key]=n;
 if(k==='evidence-scene'){
  d.inspected??=[];d.evidence??=[];
  if(action.type==='inspect'&&Number.isInteger(n)&&n>=0&&n<6){d.inspected=toggle(d.inspected,n);message=EVIDENCE[n];}
  if(action.type==='collect'&&d.inspected.includes(n)){d.evidence=toggle(d.evidence,n);message='הממצא עודכן בתיק הראיות.';}
  if(action.type==='submit')solved=exact(d.evidence,[0,2,4]);
 }
 if(k==='evidence-board'){d.links??=[-1,-1,-1];if(action.type==='link'&&[0,1,2].includes(action.row)&&[0,1,2].includes(n))d.links[action.row]=n;if(action.type==='submit')solved=d.links.every((v,i)=>v===[2,0,1][i]);}
 if(k==='evidence-timeline'){d.order??=[0,1,2,3];if(action.type==='move'&&Number.isInteger(action.row)&&[0,1,2,3].includes(action.row)&&[-1,1].includes(n)){const to=action.row+n;if(to>=0&&to<4)[d.order[action.row],d.order[to]]=[d.order[to],d.order[action.row]];}if(action.type==='submit')solved=d.order.every((v,i)=>v===[2,3,0,1][i]);}
 if(k==='witness-interview'){d.notes??=[];if(action.type==='ask'&&[0,1].includes(action.row)&&[0,1,2].includes(n)){const token=action.row*3+n;if(!d.notes.includes(token))d.notes.push(token);message=[['נועה: הייתי בספרייה.','נועה: ראיתי את השעון מציג 18:10.','נועה: איתי עבר ליד החממה.'],['איתי: שמעתי מים ליד מקום ישיבה.','איתי: הסתכלתי בשעון ב־18:20.','איתי: העד היה לבד.']][action.row][n];}if(action.type==='submit')solved=[0,1,3].every(n=>d.notes.includes(n));}
 if(k==='witness-timetable'){d.claims??=[];if(action.type==='claim'&&[0,1,2,3].includes(n))d.claims=toggle(d.claims,n);if(action.type==='submit')solved=exact(d.claims,[1,3]);}
 if(k==='witness-search'){if(action.type==='search'&&[0,1,2].includes(n)){s.checkpoint=n;return {ok:true,walk:true,message:'אתר החיפוש סומן. לכו אליו ובדקו בשטח.'};}if(action.type==='find'){solved=s.checkpoint===2;message=solved?'העד נמצא ליד המים והספסל.':'אין כאן עד. חפשו מקום שיש בו גם מים וגם ישיבה.';}}
 if(k==='robot-route'){d.commands??=[];if(action.type==='command'&&[0,1,2,3].includes(n)&&d.commands.length<16)d.commands.push(n);if(action.type==='execute'){d.executed=true;solved=runProgram(d.commands).ok;message='הרובוט לא הגיע ליעד. בדקו את הרשת והמחסומים.';}}
 if(k==='robot-circuit'){d.wires??=[];if(action.type==='wire'&&[0,1,2,3].includes(action.row)&&[0,1,2,3].includes(n)){if(n===[2,0,3,1][action.row]){d.wires=toggle(d.wires,action.row);message='החיבור תקין.';}else{ok=false;message='הצורה והצבע אינם תואמים. החיבור לא נשמר.';}}if(action.type==='submit')solved=exact(d.wires,[0,1,2,3]);}
 if(k==='robot-escort'&&action.type==='checkpoint'){const robot=movement.companion;if(!robot||Math.hypot(robot.x-goal.x,robot.z-goal.z)>3)return {ok:false,message:'חכו לרובוט. גם הוא צריך להגיע לתחנה.'};if(s.checkpoint<2){s.checkpoint++;return {ok:true,walk:true,message:'הרובוט הגיע. ממשיכים יחד לתחנה הבאה.'};}solved=true;}
 if(k==='survey-ruler'&&action.type==='submit')solved=d.a===2&&d.b===9&&d.number===7;
 if(k==='survey-parcel'){d.cells??=[];if(action.type==='cell'&&Number.isInteger(n)&&n>=0&&n<12)d.cells=toggle(d.cells,n);if(action.type==='submit')solved=exact(d.cells,PARCEL)&&d.number===6;}
 if(k==='survey-scale'&&action.type==='submit')solved=d.a===40&&d.b===30;
 if(k==='freight-manifest'&&action.type==='submit')solved=d.a===2.5&&d.b===80&&d.vehicle===1;
 if(k==='freight-balance'){d.bins??=[-1,-1,-1];if(action.type==='bin'&&[0,1,2].includes(action.row)&&[0,1].includes(n))d.bins[action.row]=n;if(action.type==='submit'){const masses=[2,3,5],left=d.bins.reduce((sum,bin,i)=>sum+(bin===0?masses[i]:0),0),right=d.bins.reduce((sum,bin,i)=>sum+(bin===1?masses[i]:0),0);solved=d.bins.every(n=>n>=0)&&left===right;}}
 if(k==='freight-packing'){d.placements??=[null,null,null];if(action.type==='place'&&[0,1,2].includes(d.selected)&&Number.isInteger(n)&&n>=0&&n<12){const next=[...d.placements];next[d.selected]={x:n%4,y:Math.floor(n/4),rotate:d.rotate===1};if(packingCells(next)){d.placements=next;message='החלק הוצב בארגז.';}else{ok=false;message='החלק חורג מהארגז או חופף לחלק אחר.';}}if(action.type==='submit')solved=d.placements.every(Boolean)&&packingCells(d.placements)!==null;}
 if(k==='optics-focus'&&action.type==='submit')solved=d.a===7&&d.b===3;
 if(k==='optics-parallax'&&action.type==='submit')solved=d.a===0&&d.b===0;
 if(k==='optics-samples'){d.samples??=[];if(action.type==='sample'&&d.samples.length<5)d.samples.push([4.1,4.2,9.8,4.2,4.3][d.samples.length]);if(action.type==='submit')solved=d.samples.length===5&&d.selected===2&&Math.abs(d.number-4.2)<.001;}
 if(k==='shadow-light'&&action.type==='submit')solved=d.a===1&&d.b===3;
 if(k==='shadow-height'&&action.type==='submit')solved=d.a===2&&d.number===6;
 if(k==='shadow-sundial'){d.observations??=[];if(action.type==='observe'&&[10,14].includes(d.a)&&!d.observations.includes(d.a))d.observations.push(d.a);if(action.type==='submit')solved=exact(d.observations,[10,14])&&d.answer===14;}
 if(k==='rescue-trust'&&action.type==='befriend'){solved=(d.trust||0)>=3;message='התכופפו ליד השועל והמתינו עד שמד האמון יתמלא.';}
 if(k==='rescue-shelter'){d.layout??=[-1,-1,-1];if(action.type==='shelter'&&[0,1,2].includes(d.selected)&&Number.isInteger(n)&&n>=0&&n<9){d.layout[d.selected]=n;}if(action.type==='submit')solved=d.layout[0]%3===0&&d.layout[1]<3&&d.layout[1]>=0&&d.layout[2]===4&&new Set(d.layout).size===3&&!d.layout.includes(7);}
 if(k==='rescue-care'){d.calm??=0;d.water??=0;d.rest??=0;if(action.type==='care'){if(n===0){d.calm=Math.min(3,d.calm+1);message='השועל נרגע קצת.';}if(n===1){if(d.calm<3){ok=false;message='השועל עדיין חושש. קודם יוצרים שקט.';}else{d.water=Math.min(2,d.water+1);message='השועל שותה.';}}if(n===2){if(d.water<2){ok=false;message='השועל עדיין צריך מים לפני מנוחה.';}else{d.rest=1;message='השועל נח במחסה.';}}}if(action.type==='submit')solved=d.calm===3&&d.water===2&&d.rest===1;}
 if(k==='relay-wave'&&action.type==='submit')solved=d.a===3&&d.b===2;
 if(k==='relay-morse'){d.letters??=[];d.current??='';if(action.type==='symbol'&&['.','-'].includes(n)&&d.current.length<3)d.current+=n;if(action.type==='letter'){if(['...','---'].includes(d.current)&&d.letters.length<3){d.letters.push(d.current);d.current='';message='האות שודרה.';}else{ok=false;message='אות מכילה שלוש נקודות או שלושה קווים. אפסו אם צריך.';}}if(action.type==='submit')solved=JSON.stringify(d.letters)===JSON.stringify(['...','---','...'])&&d.current==='';}
 if(k==='relay-network'){d.edges??=[];if(action.type==='edge'&&Number.isInteger(n)&&n>=0&&n<NETWORK.length)d.edges=toggle(d.edges,n);if(action.type==='submit'){const reached=new Set([0]);for(let pass=0;pass<6;pass++)for(const i of d.edges){const[a,b]=NETWORK[i];if(reached.has(a))reached.add(b);if(reached.has(b))reached.add(a);}solved=[0,1,3,4,5].every(n=>reached.has(n))&&!d.edges.some(i=>NETWORK[i].includes(2));}}
 if(k==='courier-plan'){d.route??=[];if(action.type==='stop'&&[0,1,2].includes(n)&&!d.route.includes(n))d.route.push(n);if(action.type==='submit')solved=d.route.length===3&&d.route.indexOf(0)<d.route.indexOf(1)&&d.route.at(-1)===2&&routeCost(d.route)<=14;}
 if(k==='courier-course'&&action.type==='checkpoint'){const valid=s.checkpoint===1?movement.dashing:s.checkpoint===3?player.y===0:player.y>.25;if(!valid)return {ok:false,message:s.checkpoint===1?'הטבעת דורשת זינוק ב־Q.':s.checkpoint===3?'נחתו ועמדו בסימון האחרון.':'קפצו בתוך הטבעת.'};if(s.checkpoint<3){s.checkpoint++;return {ok:true,walk:true,message:'החיישן הופעל. התנועה הבאה מסומנת.'};}solved=true;}
 if(k==='courier-lockers'){d.delivered??=[];if(action.type==='deliver'&&[0,1,2].includes(n)){if(n!==[1,2,0][s.checkpoint]||d.delivered.includes(n))return {ok:false,message:'קוד החבילה לא מתאים לארונית. החבילה נשארה בתיק.'};d.delivered.push(n);if(s.checkpoint<2){s.checkpoint++;return {ok:true,walk:true,message:'החבילה נמסרה. הארונית הבאה מסומנת.'};}solved=true;}}
 if(solved){s.completed.push(index);s.carrying=false;return {ok:true,complete:true,message:'✓ משימת השטח הושלמה. ממשיכים לתיק הלימוד.'};}
 return {ok:action.type==='submit'||action.type==='execute'||action.type==='befriend'?false:ok,message};
}
export function tickField(round,player,movement,dt){const step=scenarioStep(round);if(!step||round.scenario.completed.includes(scenarioStage(round)))return;const d=taskData(round);if(step.kind==='rescue-trust'){const target=movement.companion?.type==='fox'?movement.companion:step,near=Math.hypot(player.x-target.x,player.z-target.z)<2.2;d.trust=Math.max(0,Math.min(3,(d.trust||0)+(near&&movement.crouching&&!movement.dashing?dt:-dt*.5)));}}
