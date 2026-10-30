(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();function $u(n){const e=new Set(["1,1","15,1","4,9","13,11","4,5","11,5","12,9","3,3","7,1","9,3","1,7","5,11","9,11","15,7","1,7","2,7","3,7","19,3","20,3","21,3","19,7","21,11","15,15","17,11","21,3","9,15","19,11","10,5","12,5","13,5","11,9","13,9","14,9","15,9"]);function t(i){const r=n.map(u=>[...u]),s=[];let a=i;const o=()=>(a=a*1664525+1013904223>>>0,a/4294967296);for(let u=1;u<r.length-1;u++)for(let h=1;h<r[0].length-1;h++)s.push({x:h,y:u,rank:o()});s.sort((u,h)=>u.rank-h.rank);const l=({x:u,y:h})=>[[u-1,h],[u+1,h],[u,h-1],[u,h+1]].filter(([_,M])=>{var m;return((m=r[M])==null?void 0:m[_])&&r[M][_]!=="#"});let c=0;for(const u of s)c<14&&r[u.y][u.x]==="#"&&l(u).length>=2&&(r[u.y][u.x]=".",c++);const f=()=>{const u=[{x:1,y:1}],h=new Set(["1,1"]);for(let _=0;_<u.length;_++)for(const[M,m]of l(u[_]))h.has(`${M},${m}`)||(h.add(`${M},${m}`),u.push({x:M,y:m}));return r.flat().filter(_=>_!=="#").length===h.size};let d=0;for(const{x:u,y:h}of s)d<14&&r[h][u]==="."&&!e.has(`${u},${h}`)&&(r[h][u]="#",f()?d++:r[h][u]=".");return r.map(u=>u.join(""))}return[{id:"classic",title:"מבוך הצללים",tiles:n},{id:"moon",title:"מבוך אור הירח",tiles:t(2718)},{id:"ember",title:"מבוך הגחלים",tiles:t(6283)}]}const An=[{id:"scout",kind:"human",name:"אורי · סייר השבילים",title:"סייר השבילים",actionLabel:"לדבר עם אורי",x:3,y:7,path:[{x:3,y:7},{x:2,y:7},{x:1,y:7},{x:2,y:7}]},{id:"keeper",kind:"human",name:"מיה · שומרת הגן",title:"שומרת הגן",actionLabel:"לדבר עם מיה",x:19,y:3,path:[{x:19,y:3},{x:20,y:3},{x:21,y:3},{x:20,y:3}]},{id:"fox",kind:"fox",name:"שועל הגן",title:"שועל הגן",actionLabel:"להתקרב לשועל",x:19,y:7},{id:"rabbit",kind:"rabbit",name:"ארנב בין השיחים",title:"ארנב בין השיחים",actionLabel:"להתקרב בשקט",x:21,y:11},{id:"owl",kind:"owl",name:"ינשוף החורבות",title:"ינשוף החורבות",actionLabel:"להביט בינשוף",x:15,y:15},{id:"pump",kind:"pump",name:"משאבת הגן",title:"משאבת הגן",actionLabel:"למלא את קערת המים",x:17,y:11},{id:"lamp",kind:"lamp",name:"פנס הגן",title:"פנס הגן",actionLabel:"להדליק את הפנס",x:21,y:3},{id:"bench",kind:"bench",name:"ספסל בין החורבות",title:"ספסל בין החורבות",actionLabel:"לנוח לרגע",x:9,y:15}],Vr={x:19,y:11},Hl=["scoutGuided","lightsOn","waterFilled","foxFollowing","foxDrinking","rabbitCalm","rabbitFed","rabbitFollowing","owlObserved","benchRested","playerResting"],zo=(n,e)=>n.x===e.x&&n.y===e.y,as=n=>n&&Number.isInteger(n.x)&&Number.isInteger(n.y)&&n.x>=1&&n.x<=21&&n.y>=1&&n.y<=15,ju=n=>JSON.parse(JSON.stringify(n));function Gr(){return{version:1,...Object.fromEntries(Hl.map(n=>[n,!1])),interactions:{},dialogue:null,fox:{x:19,y:7,previous:{x:19,y:7},startedMs:0},foxMoveMs:0,rabbit:{x:21,y:11,previous:{x:21,y:11},startedMs:0},rabbitMoveMs:0}}function Ku(n,e=()=>!0,t=1/0){var r;const i=Gr();if(!n||n.version!==1)return i;for(const s of Hl)i[s]=n[s]===!0;for(const s of An)((r=n.interactions)==null?void 0:r[s.id])===1&&(i.interactions[s.id]=1);return as(n.fox)&&e(n.fox.x,n.fox.y)&&(i.fox={x:n.fox.x,y:n.fox.y,previous:as(n.fox.previous)&&e(n.fox.previous.x,n.fox.previous.y)&&Math.abs(n.fox.previous.x-n.fox.x)+Math.abs(n.fox.previous.y-n.fox.y)<=1?{...n.fox.previous}:{x:n.fox.x,y:n.fox.y},startedMs:Number.isFinite(n.fox.startedMs)&&n.fox.startedMs>=0&&n.fox.startedMs<1e12&&n.fox.startedMs<=t?n.fox.startedMs:0}),i.foxMoveMs=Number.isFinite(n.foxMoveMs)&&n.foxMoveMs>=0&&n.foxMoveMs<1e12&&n.foxMoveMs<=t?n.foxMoveMs:0,as(n.rabbit)&&e(n.rabbit.x,n.rabbit.y)&&(i.rabbit={x:n.rabbit.x,y:n.rabbit.y,previous:as(n.rabbit.previous)&&e(n.rabbit.previous.x,n.rabbit.previous.y)&&Math.abs(n.rabbit.previous.x-n.rabbit.x)+Math.abs(n.rabbit.previous.y-n.rabbit.y)<=1?{...n.rabbit.previous}:{x:n.rabbit.x,y:n.rabbit.y},startedMs:Number.isFinite(n.rabbit.startedMs)&&n.rabbit.startedMs>=0&&n.rabbit.startedMs<1e12&&n.rabbit.startedMs<=t?n.rabbit.startedMs:0}),i.rabbitMoveMs=Number.isFinite(n.rabbitMoveMs)&&n.rabbitMoveMs>=0&&n.rabbitMoveMs<1e12&&n.rabbitMoveMs<=t?n.rabbitMoveMs:0,i.rabbitFollowing=i.rabbitFollowing&&i.rabbitFed,i.rabbitCalm=i.rabbitCalm||i.rabbitFed,i.foxFollowing=i.foxFollowing&&i.waterFilled,i.foxDrinking=i.waterFilled&&!i.foxFollowing&&zo(i.fox,Vr),i}function wi(n,e=0,t=Gr()){var i;if(n.id==="fox"||n.id==="rabbit"){const r=t[n.id]||Gr()[n.id],s=r.previous||r,a=Math.max(0,Math.min(1,(e-r.startedMs)/(n.id==="rabbit"?420:550)));return{x:s.x+(r.x-s.x)*a,y:s.y+(r.y-s.y)*a,heading:Math.atan2(r.x-s.x,r.y-s.y),moving:a<1&&!zo(s,r)}}if((i=n.path)!=null&&i.length){const r=Math.floor(e/2400)%n.path.length,s=n.path[r],a=n.path[(r+1)%n.path.length],o=e%2400/2400;return{x:s.x+(a.x-s.x)*o,y:s.y+(a.y-s.y)*o,heading:Math.atan2(a.x-s.x,a.y-s.y),moving:!0}}return{x:n.x,y:n.y,heading:0,moving:!1}}function ko(n,e,t=0){var i;return!n||!Number.isFinite(n.x)||!Number.isFinite(n.y)?null:((i=An.map(r=>({entity:r,position:wi(r,t,e)})).map(r=>({...r,distance:Math.abs(r.position.x-n.x)+Math.abs(r.position.y-n.y)})).filter(r=>r.distance<=1.5).sort((r,s)=>r.distance-s.distance)[0])==null?void 0:i.entity)||null}function Zu(n,e,t,i=0,r="approach"){if(r!=="approach"&&!(r==="feed"&&e==="rabbit"))return null;const s=An.find(c=>c.id===e);if(!s||!t||!Number.isFinite(t.x)||!Number.isFinite(t.y))return null;const a=wi(s,i,n);if(Math.abs(a.x-t.x)+Math.abs(a.y-t.y)>1.5)return null;const o=ju(n);o.interactions[s.id]=1;let l;return s.id==="scout"?(o.scoutGuided=!0,l="שלושה חותמים, ומלכודות קצרות של עד שלוש שאלות. שביל הגן מתחבר לחורבות מדרום — אפשר להקיף ולחזור. סימנתי את הדרך ביומן שלכם."):s.id==="keeper"?(o.lightsOn=!0,l="טוב שהגעתם. הדלקתי בשבילכם את פנסי הגן. ליד החורבות יש משאבה וקערת מים — השועל יעריך את זה."):s.id==="pump"?(o.waterFilled=!0,l="המשאבה זורמת וקערת המים התמלאה. השועל מתקדם אליה בשבילי הגן."):s.id==="fox"?o.waterFilled?(o.foxFollowing=!0,o.foxDrinking=!1,l="השועל מזהה שעזרתם למלא מים, ומתקרב כדי ללכת אתכם. הוא יישאר על השבילים, במרחק בטוח."):l="השועל מרחרח את האוויר ומביט לכיוון המשאבה. נראה שהוא מחפש מים.":s.id==="rabbit"?(o.rabbitCalm=!0,r==="feed"?(o.rabbitFed=!0,o.rabbitFollowing=!0,l="הארנב מכרסם את הגזר. עכשיו יש לכם חבר לדרך — הוא ילך אחריכם בשביל!"):l=o.rabbitFed?"הארנב מזהה אתכם ומזיז את האוזניים. הוא ממשיך ללוות אתכם בשביל.":"הארנב מתקרב ומרים את האוזניים. לתת לו גזר?"):s.id==="owl"?(o.owlObserved=!0,l="הינשוף מסובב את ראשו אל המעבר הצפוני של החורבות. הדרך חוזרת למבוך — זו אינה דרך ללא מוצא."):s.id==="lamp"?(o.lightsOn=!0,l="הפנס נדלק, ואור חם מתפשט לאורך שבילי הגן."):(o.benchRested=!0,o.playerResting=!0,l="רגע שקט בין החורבות. שום התקדמות לא אבדה. אפשר לקום ולהמשיך בכל רגע."),o.dialogue={entityId:s.id,title:s.name,text:l},{world:o,notice:l,entity:s}}function Ju(n,e,t){if(!n||!e)return n;if(e.type==="move")return n.playerResting?{...n,playerResting:!1}:n;if(e.type!=="tick"||!Number.isFinite(e.elapsedMs)||typeof t!="function")return n;const i=n.foxFollowing?e.player:n.waterFilled?Vr:null;if(!i)return n;const r={x:n.fox.x,y:n.fox.y},s=t(r,i);if(!s)return n;const a=n.foxFollowing?1:0;if(s.length<=a){const l=n.waterFilled&&!n.foxFollowing&&zo(r,Vr);return l===n.foxDrinking?n:{...n,foxDrinking:l}}if(e.elapsedMs-n.foxMoveMs<650)return n;const o=s[0];return{...n,foxDrinking:!1,foxMoveMs:e.elapsedMs,fox:{...o,previous:r,startedMs:e.elapsedMs}}}function Tc(n,e,t){const i=Ju(n,e,t);if(!i||(e==null?void 0:e.type)!=="tick"||!Number.isFinite(e.elapsedMs)||typeof t!="function"||!i.rabbitFollowing||!i.rabbitFed||!e.player)return i;const r=i.rabbit||Gr().rabbit,s={x:r.x,y:r.y},a=t(s,e.player);return!a||a.length<=1||e.elapsedMs-(i.rabbitMoveMs||0)<480?i:{...i,rabbitMoveMs:e.elapsedMs,rabbit:{...a[0],previous:s,startedMs:e.elapsedMs}}}const Qu=["#######################","#S..#.....#....X#.....#","#.#.#.###.#.###.#.###.#","#.#...#...#...........#","#.#####.#####.#.#.#.#.#","#...A...#..B..#.#.#...#","###.#.###.#.###.#.###.#","#...#.....#...........#","#.#######.#####.#.#.#.#","#...C...#...G...#.#...#","#.###.#.###.#.#.#.###.#","#.....#.....#T........#","###.#####.#####.#.###.#","#.....#.....#.........#","#.###.#.###.#.#####.#.#","#.....................#","#######################"],ai=$u(Qu);let Lt=ai[0].tiles,Wl="classic";function Or(n="classic"){const e=ai.find(t=>t.id===n);if(!e)throw new Error("Unknown maze layout");return Lt=e.tiles,Wl=e.id,e}const sn={x:1,y:1},rr={x:15,y:1},ka={x:4,y:9},Va={x:13,y:11},ci=[{id:"floor",x:4,y:5,kind:"floor",title:"רצפת הסודות"},{id:"cage",x:11,y:5,kind:"cage",title:"כלוב הצללים"},{id:"guardian",x:12,y:9,kind:"guardian",title:"שומר החותם"}],ed=[{id:"embers",x:3,y:3,kind:"floor",title:"גשר הגחלים"},{id:"echo",x:7,y:1,kind:"cage",title:"מסדרון ההד"},{id:"whisper",x:9,y:3,kind:"guardian",title:"שער הלחישות"},{id:"runes",x:1,y:7,kind:"floor",title:"אבני הרונות"},{id:"well",x:5,y:11,kind:"cage",title:"באר הצללים"},{id:"arch",x:9,y:11,kind:"guardian",title:"קשת הסודות"},{id:"vault",x:15,y:7,kind:"cage",title:"חדר הכספת"}],Vo=[...ci,...ed];function Ai(n){return Vo.slice(0,Math.max(3,Math.ceil(n.length/3)))}function Xl(n){const e=Ai(n);return Object.fromEntries(e.map((t,i)=>[t.id,n.filter((r,s)=>Math.min(e.length-1,Math.floor(s*e.length/n.length))===i)]))}const Go=[{id:"prowler",kind:"shadow",encounter:"cage",path:[{x:10,y:5},{x:11,y:5},{x:12,y:5},{x:13,y:5}]},{id:"warden",kind:"guardian",encounter:"guardian",path:[{x:11,y:9},{x:12,y:9},{x:13,y:9},{x:14,y:9},{x:15,y:9}]}],ql=n=>n.id==="warden"?1900:1600;function Yl(n,e=0){var r;if(!((r=n==null?void 0:n.path)!=null&&r.length))return null;const t=n.path.length;if(t===1)return{...n.path[0]};const i=Math.floor(Math.max(0,e)/ql(n))%(t*2-2);return{...n.path[i<t?i:t*2-2-i]}}const td=new Set(["explore","question","feedback","capture","review","review-feedback","complete"]),$l=[{x:0,y:-1},{x:1,y:0},{x:0,y:1},{x:-1,y:0}],jl=n=>JSON.parse(JSON.stringify(n)),Ji=(n,e)=>n.x===e.x&&n.y===e.y,wc=(n,e)=>Math.abs(n.x-e.x)+Math.abs(n.y-e.y),hr=(n,e)=>Object.hasOwn(n.answers,e),Kl=n=>JSON.stringify(n.map(e=>[e.id,e.prompt,e.choices,e.correct,e.difficulty,e.explanation,e.ref])),Ac=(n,e)=>{const t=[...n];for(let i=t.length-1;i>0;i--){const r=Math.floor(e()*(i+1));[t[i],t[r]]=[t[r],t[i]]}return t},ln=(n,e)=>{var t;return Number.isInteger(n)&&Number.isInteger(e)&&!!((t=Lt[e])!=null&&t[n])&&Lt[e][n]!=="#"};function Fs(n,e){if(!n||!e||!ln(n.x,n.y)||!ln(e.x,e.y))return null;const t=[{...n,path:[]}],i=new Set([`${n.x},${n.y}`]);for(let r=0;r<t.length;r++){const s=t[r];if(Ji(s,e))return s.path;for(const a of $l){const o={x:s.x+a.x,y:s.y+a.y},l=`${o.x},${o.y}`;ln(o.x,o.y)&&!i.has(l)&&(i.add(l),t.push({...o,path:[...s.path,o]}))}}return null}function Zl(n){if(!Array.isArray(n)||n.length<1||n.length>30||new Set(n.map(e=>e.id)).size!==n.length||n.some(e=>typeof e.id!="string"||!Array.isArray(e.choices)||e.choices.length<2||!Number.isInteger(e.correct)||e.correct<0||e.correct>=e.choices.length))throw new Error("Invalid maze question content")}const Ys=(n,e)=>n.assignments[e]||[],Ho=n=>Ys(n,n.activeEncounter).find(e=>!hr(n,e)),$s=(n,e)=>Ys(n,e).every(t=>hr(n,t));function Wo(n){n.resolved=Vo.filter(e=>Object.hasOwn(n.assignments,e.id)&&$s(n,e.id)).map(e=>e.id),n.sealProofs||(n.sealProofs={});for(const e of ci)n.resolved.includes(e.id)&&!Object.hasOwn(n.sealProofs,e.id)&&(n.sealProofs[e.id]=[...Ys(n,e.id)]);n.seals=ci.filter(e=>n.seals.includes(e.id)||n.resolved.includes(e.id)).map(e=>e.id)}function nd(n,e){var o;const t=Object.fromEntries(ci.map((l,c)=>[l.id,n.order.filter((f,d)=>Math.min(2,Math.floor(d*3/n.order.length))===c)])),i=(l,c)=>Array.isArray(l)&&l.length===c.length&&l.every((f,d)=>f===c[d]),r=l=>e.assignments&&Object.keys(e.assignments).length===Object.keys(l).length&&Object.entries(l).every(([c,f])=>i(e.assignments[c],f)),s=r(t),a=r(n.assignments);n.seals=[],n.sealProofs={};for(const l of ci){if(!Array.isArray(e.seals)||!e.seals.includes(l.id))continue;const c=(o=e.sealProofs)==null?void 0:o[l.id],f=t[l.id],d=Ys(n,l.id);let u=null;i(c,f)||i(c,d)?u=c:s?u=f:a&&(u=d),u&&u.every(h=>hr(n,h))&&(n.seals.push(l.id),n.sealProofs[l.id]=[...u])}}function id(n,e){const t=new Set([...Vo,...Go.flatMap(o=>o.path)].map(o=>`${o.x},${o.y}`)),i=o=>o&&ln(o.x,o.y)&&!t.has(`${o.x},${o.y}`),r=n&&ln(n.x,n.y)?n:e,s=r?[{...r}]:[],a=new Set;for(let o=0;o<s.length;o++){const l=s[o],c=`${l.x},${l.y}`;if(!a.has(c)){if(a.add(c),i(l))return l;for(const f of $l){const d={x:l.x+f.x,y:l.y+f.y};ln(d.x,d.y)&&!a.has(`${d.x},${d.y}`)&&s.push(d)}}}if(i(e))return{...e};throw new Error("No reachable recovery tile")}function os(n,e){$s(n,e.id)||(n.activeEncounter=e.id,n.phase="question",n.notice=null)}function Rc(n,e=n.elapsedMs,t=n.elapsedMs){if(n.phase!=="explore"||n.graceMs>t-e)return null;const i=e+n.graceMs;let r=null;for(const s of Go){const a=ci.find(l=>l.id===s.encounter);if($s(n,a.id))continue;const o=ql(s);for(let l=Math.floor(i/o);l<=Math.floor(t/o);l++){const c=Math.max(i,l*o);Ji(n.player,Yl(s,c))&&(!r||c<r.time)&&(r={room:a,time:c})}}return r}function Ga(n,e){const t=n.order.filter(r=>{var s;return((s=n.answers[r])==null?void 0:s.correct)===!1&&e.some(a=>a.id===r)}),i=t.length?[t.at(-1),t.length>1?t.at(-2):t[0]]:[];n.review={ids:i,index:0,wrong:0,hint:0,correct:null,guided:i.length===0},n.phase="review"}function rd(n){n.hearts=3,n.player=id(n.capturePosition||n.player,n.checkpoint),n.checkpoint={...n.player},n.graceMs=5e3,n.phase="explore",n.activeEncounter=null,n.review=null,n.captureMs=0,n.notice="הצלחתם להשתחרר! ההתקדמות נשמרה. אפשר להמשיך מאותה מלכודת."}function Zr(n,e=Math.random){Zl(n);const t=Ac(n.map(s=>s.id),e),i=Xl(t),r={version:1,layoutId:Wl,giftsSeen:[],contentKey:Kl(n),order:t,choiceOrders:Object.fromEntries(n.map(s=>[s.id,Ac(s.choices.map((a,o)=>o),e)])),assignments:i,world:Gr(),phase:"explore",paused:!1,player:{...sn},checkpoint:{...sn},hearts:3,coins:0,seals:[],sealProofs:{},resolved:[],answers:{},activeEncounter:null,lastAnswer:null,review:null,capturePosition:null,captureMs:0,captureCount:0,graceMs:0,elapsedMs:0,clues:[],treasureCollected:!1,visited:[`${sn.x},${sn.y}`],notice:null};return Wo(r),r}function wn(n,e){var r,s;const t=n.phase==="review"||n.phase==="review-feedback"?(r=n.review)==null?void 0:r.ids[n.review.index]:n.phase==="feedback"?(s=n.lastAnswer)==null?void 0:s.id:Ho(n),i=e.find(a=>a.id===t);return i?{...i,options:(n.choiceOrders[t]||i.choices.map((a,o)=>o)).map(a=>({text:i.choices[a],original:a}))}:null}function sr(n,e){const t={easy:1,medium:1.5,hard:2},i=e.reduce((a,o)=>a+(t[o.difficulty]||1.5),0),r=e.reduce((a,o)=>{var l;return a+((l=n.answers[o.id])!=null&&l.correct?t[o.difficulty]||1.5:0)},0),s=e.filter(a=>hr(n,a.id)).length;return{answered:s,total:e.length,trapsResolved:Ai(e).filter(a=>n.resolved.includes(a.id)).length,trapsTotal:Ai(e).length,correct:e.filter(a=>{var o;return(o=n.answers[a.id])==null?void 0:o.correct}).length,score:i?Math.round(r/i*100):0,complete:s===e.length&&n.seals.length===3}}function Jl(n,e,t){var r;if(!n||!e||typeof e.type!="string")return n;if(e.type==="pause")return n.paused||n.phase==="complete"?n:{...n,paused:!0};if(e.type==="collect-gift"){const s=e.id;return n.resolved.includes(s)&&!n.giftsSeen.includes(s)?{...n,giftsSeen:[...n.giftsSeen,s]}:n}if(e.type==="resume")return n.paused?{...n,paused:!1}:n;if(n.paused||n.phase==="complete")return n;const i=jl(n);if(e.type==="world-interact"&&i.phase==="explore"){const s=Zu(i.world,e.entityId,i.player,i.elapsedMs,e.intent);return s?(i.world=s.world,i.notice=s.notice,i):n}if(e.type==="tick"){if(!Number.isFinite(e.ms)||e.ms<=0)return n;const s=Math.min(e.ms,6e4);if(i.phase==="explore"){const a=e.moving===!0?null:Rc(i,i.elapsedMs,i.elapsedMs+s);i.elapsedMs=a?a.time:i.elapsedMs+s,i.graceMs=a?0:Math.max(0,i.graceMs-s),i.world=Tc(i.world,{type:"tick",elapsedMs:i.elapsedMs,player:i.player},Fs),a&&os(i,a.room)}else if(i.phase==="capture")i.captureMs+=s,i.captureMs>=3e3&&Ga(i,t);else return n;return i}if(e.type==="skip-capture"&&i.phase==="capture")return Ga(i,t),i;if(e.type==="move"&&i.phase==="explore"){if(!Number.isInteger(e.dx)||!Number.isInteger(e.dy)||Math.abs(e.dx)+Math.abs(e.dy)!==1)return n;const s={x:i.player.x+e.dx,y:i.player.y+e.dy};if(!ln(s.x,s.y))return n;i.checkpoint={...i.player},i.player=s,i.notice=null,i.world=Tc(i.world,{type:"move",player:i.player},Fs);const a=`${s.x},${s.y}`;i.visited.includes(a)||i.visited.push(a),Ji(s,ka)&&!i.clues.includes("route")&&(i.clues.push("route"),i.notice="חריטה על הקיר: שלושה חותמים והשלמת המלכודות פותחים את השער. גם אחרי טעות, הדרך נשארת פתוחה."),Ji(s,Va)&&!i.treasureCollected&&(i.treasureCollected=!0,i.notice="מצאתם חדר אוצר סודי! התיבה שומרת אור לדרך חזרה.");const o=Ai(t).find(l=>Ji(l,s));if(o&&os(i,o),i.phase==="explore"&&i.graceMs===0){const l=Rc(i);l&&os(i,l.room)}return Ji(s,rr)&&(sr(i,t).complete?i.phase="complete":i.notice="כדי לפתוח את השער, אספו את שלושת החותמים והשלימו את המלכודות. לא צריך לענות נכון על הכול."),i}if(e.type==="interact"&&i.phase==="explore"){const s=Ai(t).find(a=>wc(a,i.player)<=1&&!$s(i,a.id));return s?(os(i,s),i):wc(i.player,rr)<=1?(sr(i,t).complete?i.phase="complete":i.notice="השער מחכה לשלושת החותמים ולהשלמת המלכודות. אפשר לטעות ולהמשיך.",i):n}if(e.type==="answer"&&i.phase==="question"){const s=wn(i,t);if(!s||hr(i,s.id)||!Number.isInteger(e.choice)||e.choice<0||e.choice>=s.choices.length)return n;const a=e.choice===s.correct;return i.answers[s.id]={choice:e.choice,correct:a},i.lastAnswer={id:s.id,choice:e.choice,correct:a},a?i.coins+=10:i.hearts=Math.max(0,i.hearts-1),Wo(i),i.hearts===0?(i.phase="capture",i.capturePosition={...i.player},i.captureMs=0,i.captureCount+=1):i.phase="feedback",i}if(e.type==="continue"&&i.phase==="feedback")return Ho(i)?i.phase="question":(i.phase="explore",i.activeEncounter=null,i.notice="החותם שלכם. הדרך פתוחה — ממשיכים לחקור!"),i;if(e.type==="review-answer"&&i.phase==="review"){const s=wn(i,t);return!s||i.review.guided||!Number.isInteger(e.choice)||e.choice<0||e.choice>=s.choices.length?n:(i.review.correct=e.choice===s.correct,i.review.correct||(i.review.wrong+=1,i.review.hint=Math.min(2,i.review.wrong)),i.phase="review-feedback",i)}return(e.type==="continue"||e.type==="guided-continue")&&(i.phase==="review-feedback"||i.phase==="review"&&((r=i.review)!=null&&r.guided))?(i.review.guided||i.review.correct||i.review.wrong>=2?i.review.guided||i.review.index===1?rd(i):(i.review.index+=1,i.review.wrong=0,i.review.hint=0,i.review.correct=null,i.phase="review"):(i.review.correct=null,i.phase="review"),i):n}function Ql(n,e){var t;try{Zl(e);const i=typeof n=="string"?JSON.parse(n):jl(n);if(!i||i.version!==1||i.contentKey!==Kl(e)||!Array.isArray(i.order)||i.order.length!==e.length||new Set(i.order).size!==e.length||i.order.some(a=>!e.some(o=>o.id===a)))return null;Or(i.layoutId||"classic");const r=Zr(e,()=>.999999);r.order=i.order,r.assignments=Xl(r.order),r.choiceOrders={};for(const a of e){const o=(t=i.choiceOrders)==null?void 0:t[a.id];r.choiceOrders[a.id]=Array.isArray(o)&&o.length===a.choices.length&&new Set(o).size===o.length&&o.every(l=>Number.isInteger(l)&&l>=0&&l<o.length)?o:a.choices.map((l,c)=>c)}if(!i.answers||typeof i.answers!="object"||Array.isArray(i.answers))return null;r.answers={};for(const[a,o]of Object.entries(i.answers)){const l=e.find(c=>c.id===a);if(!l||!Number.isInteger(o==null?void 0:o.choice)||o.choice<0||o.choice>=l.choices.length)return null;r.answers[a]={choice:o.choice,correct:o.choice===l.correct}}const s=a=>a&&ln(a.x,a.y);if(r.player=s(i.player)?i.player:s(i.checkpoint)?i.checkpoint:{...sn},r.checkpoint=s(i.checkpoint)?i.checkpoint:{...sn},r.hearts=Number.isInteger(i.hearts)?Math.min(3,Math.max(0,i.hearts)):3,r.coins=Object.values(r.answers).filter(a=>a.correct).length*10,r.clues=Array.isArray(i.clues)&&i.clues.includes("route")?["route"]:[],r.treasureCollected=i.treasureCollected===!0,r.visited=Array.isArray(i.visited)?[...new Set(i.visited.filter(a=>typeof a=="string"&&/^\d+,\d+$/.test(a)&&ln(...a.split(",").map(Number))))]:[],r.visited.includes(`${r.player.x},${r.player.y}`)||r.visited.push(`${r.player.x},${r.player.y}`),r.elapsedMs=Number.isFinite(i.elapsedMs)&&i.elapsedMs>=0&&i.elapsedMs<=Number.MAX_SAFE_INTEGER?i.elapsedMs:0,r.world=Ku(i.world,ln,r.elapsedMs),r.graceMs=Number.isFinite(i.graceMs)?Math.max(0,Math.min(5e3,i.graceMs)):0,r.captureCount=Number.isInteger(i.captureCount)&&i.captureCount>=0?i.captureCount:0,r.capturePosition=s(i.capturePosition)?i.capturePosition:{...r.player},r.captureMs=Number.isFinite(i.captureMs)?Math.max(0,Math.min(3e3,i.captureMs)):0,r.phase=td.has(i.phase)?i.phase:"explore",r.paused=i.paused===!0,r.activeEncounter=Ai(e).some(a=>a.id===i.activeEncounter)?i.activeEncounter:null,r.lastAnswer=i.lastAnswer&&hr(r,i.lastAnswer.id)?{id:i.lastAnswer.id,...r.answers[i.lastAnswer.id]}:null,nd(r,i),Wo(r),r.giftsSeen=Array.isArray(i.giftsSeen)?[...new Set(i.giftsSeen.filter(a=>r.resolved.includes(a)))]:[...r.resolved],r.phase==="complete"&&!sr(r,e).complete&&(r.phase="explore"),r.phase==="question"&&!Ho(r)&&(r.phase="explore",r.activeEncounter=null),r.phase==="feedback"&&!r.lastAnswer&&(r.phase="explore",r.activeEncounter=null),(r.phase==="capture"||r.phase==="review"||r.phase==="review-feedback"||r.hearts===0&&r.phase!=="complete")&&r.phase!=="capture"){Ga(r,e);const a=i.review;Array.isArray(a==null?void 0:a.ids)&&a.ids.length===2&&a.ids.every(l=>{var c;return((c=r.answers[l])==null?void 0:c.correct)===!1})&&(r.review.ids=a.ids,r.review.index=a.index===1?1:0,r.review.wrong=Number.isInteger(a.wrong)?Math.max(0,Math.min(2,a.wrong)):0,r.review.hint=r.review.wrong,r.review.correct=a.correct===!0?!0:a.correct===!1?!1:null,i.phase==="review-feedback"&&r.review.correct!==null&&(r.phase="review-feedback"))}return r}catch{return null}}const js={quizzes:[{id:"facts",subject_id:"hebrew",exam_id:"hebrew-v1-garden",title:"עובדה או דעה?",description:"מזהים מה אפשר לבדוק ומה מביע מחשבה אישית.",references:[{id:"garden-passage",kind:"passage",title:"הטקסט „תלמידי כיתה ז׳ הקימו גינה בבית הספר”",url:"garden-exam.html#article",attribution:null,parts:[{part:"הכותרת ושורת הפרטים",title:"הכותרת, הכותבת, מקום הפרסום והתאריך"},{part:"פסקה 1",title:"הקמת הגינה, הכיתות וההשקיה"},{part:"פסקה 2",title:"ההכנות לפני השתילה ומטרת הפעילות"},{part:"פסקה 3",title:"דברי התלמידים ומה יקרה בעוד חודש"},{part:"הטקסט כולו",title:"הטקסט כולו"}]}],questions:[{id:"facts-01",position:1,type:"mcq",topic:null,difficulty:null,prompt:"„בפעילות השתתפו שלוש כיתות.” מה זה?",choices:["עובדה","דעה"],correct:0,explanation:{he:"אפשר לבדוק כמה כיתות השתתפו בפעילות.",en:"The number of participating classes can be checked."},ref:{id:"garden-passage",part:"פסקה 1"}},{id:"facts-02",position:2,type:"mcq",topic:null,difficulty:null,prompt:"„שיעורים בגינה מעניינים יותר משיעורים בכיתה.” מה זה?",choices:["עובדה","דעה"],correct:1,explanation:{he:"„מעניינים יותר” הוא שיפוט אישי, ולכן זו דעה.",en:"“More interesting” is a personal judgment, so this is an opinion."},ref:{id:"garden-passage",part:"פסקה 3"}},{id:"facts-03",position:3,type:"mcq",topic:null,difficulty:null,prompt:"„התלמידים שתלו נענע, רוזמרין וחסה.” מה זה?",choices:["עובדה","דעה"],correct:0,explanation:{he:"אפשר לבדוק אילו צמחים נשתלו בגינה.",en:"The plants in the garden can be checked."},ref:{id:"garden-passage",part:"פסקה 1"}},{id:"facts-04",position:4,type:"mcq",topic:null,difficulty:null,prompt:"„נענע היא הצמח הכי מוצלח בגינה.” מה זה?",choices:["עובדה","דעה"],correct:1,explanation:{he:"„הכי מוצלח” מביע הערכה אישית ולא נתון מדיד שהוגדר כאן.",en:"“The best” is a personal evaluation, not a defined measurable fact here."},ref:{id:"garden-passage",part:null}},{id:"facts-05",position:5,type:"mcq",topic:null,difficulty:null,prompt:"„כל כיתה קיבלה אחריות להשקיה ביום אחר בשבוע.” מה זה?",choices:["עובדה","דעה"],correct:0,explanation:{he:"אפשר לבדוק את לוח ההשקיה של הכיתות.",en:"The class watering schedule can be checked."},ref:{id:"garden-passage",part:"פסקה 1"}},{id:"facts-06",position:6,type:"mcq",topic:null,difficulty:null,prompt:"„לדעתי, הפעילות בגינה נהדרת.” מה זה?",choices:["עובדה","דעה"],correct:1,explanation:{he:"המילה „לדעתי” מסמנת במפורש שהדובר מביע דעה.",en:"The word “in my opinion” clearly signals an opinion."},ref:{id:"garden-passage",part:null}}]},{id:"questions",subject_id:"hebrew",exam_id:"hebrew-v1-garden",title:"מילות שאלה",description:"בוחרים את מילת השאלה המתאימה למידע שמחפשים.",references:[{id:"garden-passage",kind:"passage",title:"הטקסט „תלמידי כיתה ז׳ הקימו גינה בבית הספר”",url:"garden-exam.html#article",attribution:null,parts:[{part:"הכותרת ושורת הפרטים",title:"הכותרת, הכותבת, מקום הפרסום והתאריך"},{part:"פסקה 1",title:"הקמת הגינה, הכיתות וההשקיה"},{part:"פסקה 2",title:"ההכנות לפני השתילה ומטרת הפעילות"},{part:"פסקה 3",title:"דברי התלמידים ומה יקרה בעוד חודש"},{part:"הטקסט כולו",title:"הטקסט כולו"}]}],questions:[{id:"questions-01",position:1,type:"mcq",topic:null,difficulty:null,prompt:"איזו מילת שאלה מתאימה לבירור מועד הקמת הגינה?",choices:["מתי","מי","כמה"],correct:0,explanation:{he:"„מתי” מבקשת זמן או מועד.",en:"“When” asks about a time or date."},ref:{id:"garden-passage",part:"פסקה 1"}},{id:"questions-02",position:2,type:"mcq",topic:null,difficulty:null,prompt:"איזו מילת שאלה מתאימה לבירור מספר הכיתות שהשתתפו?",choices:["כיצד","כמה","היכן"],correct:1,explanation:{he:"„כמה” מבקשת מספר או כמות.",en:"“How many” asks for a number or quantity."},ref:{id:"garden-passage",part:"פסקה 1"}},{id:"questions-03",position:3,type:"mcq",topic:null,difficulty:null,prompt:"איזו מילת שאלה מתאימה לשאלה על הסיבה לכך שקראו על הצמחים?",choices:["מדוע","מתי","מי"],correct:0,explanation:{he:"„מדוע” מבקשת סיבה: למה עשו זאת?",en:"“Why” asks for the reason something happened."},ref:{id:"garden-passage",part:"פסקה 2"}},{id:"questions-04",position:4,type:"mcq",topic:null,difficulty:null,prompt:"איזו מילת שאלה מתאימה לבירור המקום שבו הוקמה הגינה?",choices:["כמה","היכן","כיצד"],correct:1,explanation:{he:"„היכן” מבקשת מקום.",en:"“Where” asks about a place."},ref:{id:"garden-passage",part:"פסקה 1"}},{id:"questions-05",position:5,type:"mcq",topic:null,difficulty:null,prompt:"איזו מילת שאלה מתאימה לבירור האופן שבו חילקו את ההשקיה?",choices:["כיצד","מתי","מי"],correct:0,explanation:{he:"„כיצד” מבקשת דרך או אופן פעולה.",en:"“How” asks about the way something was done."},ref:{id:"garden-passage",part:"פסקה 1"}},{id:"questions-06",position:6,type:"mcq",topic:null,difficulty:null,prompt:"איזו מילת שאלה מתאימה לבירור מי הציעה להוסיף פרחים?",choices:["היכן","מי","מדוע"],correct:1,explanation:{he:"„מי” מבקשת לזהות אדם.",en:"“Who” asks which person did something."},ref:{id:"garden-passage",part:"פסקה 3"}}]},{id:"instructions",subject_id:"hebrew",exam_id:"hebrew-v1-garden",title:"מבינים הוראות",description:"מזהים מה בדיוק צריך לעשות לפי מילת ההוראה.",references:[{id:"garden-passage",kind:"passage",title:"הטקסט „תלמידי כיתה ז׳ הקימו גינה בבית הספר”",url:"garden-exam.html#article",attribution:null,parts:[{part:"הכותרת ושורת הפרטים",title:"הכותרת, הכותבת, מקום הפרסום והתאריך"},{part:"פסקה 1",title:"הקמת הגינה, הכיתות וההשקיה"},{part:"פסקה 2",title:"ההכנות לפני השתילה ומטרת הפעילות"},{part:"פסקה 3",title:"דברי התלמידים ומה יקרה בעוד חודש"},{part:"הטקסט כולו",title:"הטקסט כולו"}]}],questions:[{id:"instructions-01",position:1,type:"mcq",topic:null,difficulty:null,prompt:"בשאלה כתוב „העתיקו מהטקסט עובדה”. מה צריך לעשות?",choices:["לכתוב את המילים בדיוק כפי שהן בטקסט","להמציא עובדה חדשה","לכתוב מה חושבים"],correct:0,explanation:{he:"„העתיקו” פירושו להשתמש בניסוח שמופיע בטקסט.",en:"“Copy” means use the wording from the passage."},ref:{id:"garden-passage",part:null}},{id:"instructions-02",position:2,type:"mcq",topic:null,difficulty:null,prompt:"בשאלה כתוב „נמקו”. מה צריך להוסיף לתשובה?",choices:["כותרת בלבד","סיבה שמסבירה את הבחירה","תאריך הפרסום בלבד"],correct:1,explanation:{he:"„נמקו” מבקשת לתת סיבה או ראיה לבחירה.",en:"“Justify” asks for a reason or evidence."},ref:{id:"garden-passage",part:null}},{id:"instructions-03",position:3,type:"mcq",topic:null,difficulty:null,prompt:"בשאלה כתוב „ציינו”. איזו תשובה מתאימה בדרך כלל?",choices:["תשובה קצרה וברורה","סיפור ארוך שלא קשור לשאלה","שאלה חדשה"],correct:0,explanation:{he:"„ציינו” מבקשת למסור את הפרט המבוקש בקצרה.",en:"“State” usually asks for the requested detail briefly."},ref:{id:"garden-passage",part:null}},{id:"instructions-04",position:4,type:"mcq",topic:null,difficulty:null,prompt:"בשאלה כתוב „הסבירו”. מה צריך לעשות?",choices:["לכתוב מילה אחת בלבד","לתאר בפירוט כיצד או מדוע","להעתיק את הכותרת"],correct:1,explanation:{he:"„הסבירו” מבקשת להבהיר את הרעיון בעזרת פירוט או סיבה.",en:"“Explain” asks for details about how or why."},ref:{id:"garden-passage",part:null}},{id:"instructions-05",position:5,type:"mcq",topic:null,difficulty:null,prompt:"בשאלה כתוב „נסחו שאלה מלאה”. איזו תשובה מקיימת את ההוראה?",choices:["„שלוש כיתות”","„כמה כיתות השתתפו בפעילות?”","„כיתות”"],correct:1,explanation:{he:"שאלה מלאה כוללת מילת שאלה ומשפט שלם.",en:"A full question includes a question word and a complete sentence."},ref:{id:"garden-passage",part:null}},{id:"instructions-06",position:6,type:"mcq",topic:null,difficulty:null,prompt:"בשאלה כתוב „הביעו את דעתכם וכתבו נימוק”. מה צריך לכתוב?",choices:["רק עובדה מהטקסט","עמדה אישית וסיבה שתומכת בה","רק את שם הכותבת"],correct:1,explanation:{he:"צריך לציין מה חושבים ולתת סיבה אחת לפחות.",en:"State your view and give at least one supporting reason."},ref:{id:"garden-passage",part:null}}]},{id:"physics-basics",subject_id:"physics",exam_id:"physics-v1-assessment",title:"מדידה ושיטות מדידה",description:"מזהים תוצאות ומבדילים בין מדידה ישירה לעקיפה.",references:[{id:"physics-pdf",kind:"pdf",title:"סיכום נושא מדידות (PDF)",url:"assets/materials/physics-measurements-grade-7.pdf",attribution:"שרית שרת",parts:[{part:"עמוד 1",title:"מדידות: מהי מדידה, מדידה ישירה ומדידה עקיפה"},{part:"עמוד 2",title:"המרת יחידות אורך"},{part:"עמוד 3",title:"איך מודדים עובי של דף?"},{part:"עמוד 4",title:"דיוק ומדידה נכונה"},{part:"עמוד 5",title:"מודדים גובה של עמוד: הרעיון הגאומטרי"},{part:"עמוד 6",title:"מדידת העמוד בפועל"}]}],questions:[{id:"physics-basics-01",position:1,type:"mcq",topic:null,difficulty:null,prompt:"מה חייבים לציין בתוצאת מדידה?",choices:["מספר ויחידת מידה","מספר בלבד","שם כלי המדידה בלבד"],correct:0,explanation:{he:"תוצאת מדידה כוללת מספר ויחידה, למשל 14 ס״מ.",en:""},ref:{id:"physics-pdf",part:"עמוד 1"}},{id:"physics-basics-02",position:2,type:"mcq",topic:null,difficulty:null,prompt:"מדדתם אורך מחברת וקראתם את התוצאה מהסרגל. איזו מדידה זו?",choices:["ישירה","עקיפה","לא מדידה"],correct:0,explanation:{he:"במדידה ישירה קוראים את הגודל המבוקש מכלי המדידה.",en:""},ref:{id:"physics-pdf",part:"עמוד 1"}},{id:"physics-basics-03",position:3,type:"mcq",topic:null,difficulty:null,prompt:"מדדתם עובי של ערימת דפים וחילקתם במספר הדפים. איזו מדידה זו?",choices:["ישירה","עקיפה","הערכה ללא מדידה"],correct:1,explanation:{he:"מודדים גודל אחר ומחשבים ממנו את העובי הממוצע של דף.",en:""},ref:{id:"physics-pdf",part:"עמוד 1"}},{id:"physics-basics-04",position:4,type:"mcq",topic:null,difficulty:null,prompt:"איך מחשבים עובי ממוצע של דף בערימה?",choices:["עובי הערימה חלקי מספר הדפים","מספר הדפים חלקי עובי הערימה","עובי הערימה כפול מספר הדפים"],correct:0,explanation:{he:"מחלקים את עובי הערימה במספר הדפים, לא במספר העמודים.",en:""},ref:{id:"physics-pdf",part:"עמוד 3"}},{id:"physics-basics-05",position:5,type:"mcq",topic:null,difficulty:null,prompt:"ערימה של 100 דפים עובייה 10 מ״מ. מה העובי הממוצע של דף?",choices:["0.1 מ״מ","1 מ״מ","10 מ״מ"],correct:0,explanation:{he:"מחלקים 10 מ״מ ב־100 ומקבלים 0.1 מ״מ לדף.",en:""},ref:{id:"physics-pdf",part:"עמוד 3"}},{id:"physics-basics-06",position:6,type:"mcq",topic:null,difficulty:null,prompt:"למה כדאי למדוד ערימה של דפים מאותו סוג?",choices:["כדי להעריך את העובי הממוצע של דף מהסוג הזה","כי אין צורך לספור את הדפים","כדי לקבל תמיד תוצאה מדויקת לגמרי"],correct:0,explanation:{he:"דפים מאותו סוג מאפשרים אומדן שימושי יותר של עובי דף ממוצע.",en:""},ref:{id:"physics-pdf",part:"עמוד 3"}},{id:"physics-basics-07",position:7,type:"mcq",topic:null,difficulty:null,prompt:"מהי מדידה?",choices:["השוואה ליחידת מידה מוסכמת","ניחוש ללא השוואה","כתיבת שם הגוף"],correct:0,explanation:{he:"מדידה משווה גודל ליחידת מידה מוסכמת.",en:""},ref:{id:"physics-pdf",part:"עמוד 1"}},{id:"physics-basics-08",position:8,type:"mcq",topic:null,difficulty:null,prompt:"מה מתאים לתיאור אורך עיפרון?",choices:["14 ס״מ","14 בלבד","ס״מ בלבד"],correct:0,explanation:{he:"תוצאת מדידה כוללת גם מספר וגם יחידת מידה.",en:""},ref:{id:"physics-pdf",part:"עמוד 1"}},{id:"physics-basics-09",position:9,type:"mcq",topic:null,difficulty:null,prompt:"איזו פעולה היא מדידה עקיפה?",choices:["מדידת ערימת דפים וחלוקה במספר הדפים","קריאת אורך עיפרון מסרגל","קריאת הטמפרטורה ממדחום"],correct:0,explanation:{he:"מודדים את הערימה ומחשבים ממנה את עובי הדף הממוצע.",en:""},ref:{id:"physics-pdf",part:"עמוד 1"}},{id:"physics-basics-10",position:10,type:"mcq",topic:null,difficulty:null,prompt:"ערימה של 50 דפים היא בעובי 5 מ״מ. מה עובי דף ממוצע?",choices:["0.1 מ״מ","10 מ״מ","1 מ״מ"],correct:0,explanation:{he:"מחלקים 5 מ״מ ב־50 דפים ומקבלים 0.1 מ״מ לדף.",en:""},ref:{id:"physics-pdf",part:"עמוד 3"}},{id:"physics-basics-11",position:11,type:"mcq",topic:null,difficulty:null,prompt:"למה מודדים ערימת דפים בלי הכריכה?",choices:["כדי שהכריכה לא תוסיף עובי לתוצאה","כדי לשנות את מספר הדפים","כי הכריכה מחליפה את הסרגל"],correct:0,explanation:{he:"הכריכה אינה דף בערימה ולכן עובייה יטה את החישוב.",en:""},ref:{id:"physics-pdf",part:"עמוד 3"}}]},{id:"physics-units",subject_id:"physics",exam_id:"physics-v1-assessment",title:"המרת יחידות אורך",description:"מתרגלים קילומטרים, מטרים, סנטימטרים ומילימטרים.",references:[{id:"physics-pdf",kind:"pdf",title:"סיכום נושא מדידות (PDF)",url:"assets/materials/physics-measurements-grade-7.pdf",attribution:"שרית שרת",parts:[{part:"עמוד 1",title:"מדידות: מהי מדידה, מדידה ישירה ומדידה עקיפה"},{part:"עמוד 2",title:"המרת יחידות אורך"},{part:"עמוד 3",title:"איך מודדים עובי של דף?"},{part:"עמוד 4",title:"דיוק ומדידה נכונה"},{part:"עמוד 5",title:"מודדים גובה של עמוד: הרעיון הגאומטרי"},{part:"עמוד 6",title:"מדידת העמוד בפועל"}]}],questions:[{id:"physics-units-01",position:1,type:"mcq",topic:null,difficulty:null,prompt:"כמה סנטימטרים יש במטר אחד?",choices:["10","100","1,000"],correct:1,explanation:{he:"מטר אחד שווה ל־100 סנטימטרים.",en:""},ref:{id:"physics-pdf",part:"עמוד 2"}},{id:"physics-units-02",position:2,type:"mcq",topic:null,difficulty:null,prompt:"כמה מילימטרים יש בסנטימטר אחד?",choices:["10","100","1,000"],correct:0,explanation:{he:"סנטימטר אחד שווה ל־10 מילימטרים.",en:""},ref:{id:"physics-pdf",part:"עמוד 2"}},{id:"physics-units-03",position:3,type:"mcq",topic:null,difficulty:null,prompt:"כמה מטרים יש ב־2 קילומטרים?",choices:["200","2,000","20,000"],correct:1,explanation:{he:"קילומטר אחד הוא 1,000 מטרים, ולכן 2 ק״מ הם 2,000 מטרים.",en:""},ref:{id:"physics-pdf",part:"עמוד 2"}},{id:"physics-units-04",position:4,type:"mcq",topic:null,difficulty:null,prompt:"כמה סנטימטרים הם 2.4 מטרים?",choices:["24","240","2,400"],correct:1,explanation:{he:"ממטר לסנטימטר כופלים ב־100: 2.4 × 100 = 240.",en:""},ref:{id:"physics-pdf",part:"עמוד 2"}},{id:"physics-units-05",position:5,type:"mcq",topic:null,difficulty:null,prompt:"כמה מטרים הם 350 סנטימטרים?",choices:["3.5","35","0.35"],correct:0,explanation:{he:"מסנטימטר למטר מחלקים ב־100: 350 ÷ 100 = 3.5.",en:""},ref:{id:"physics-pdf",part:"עמוד 2"}},{id:"physics-units-06",position:6,type:"mcq",topic:null,difficulty:null,prompt:"כמה הם מטר אחד ועוד 25 ס״מ?",choices:["1.25 מטרים","26 מטרים","1.025 מטרים"],correct:0,explanation:{he:"ממירים 25 ס״מ ל־0.25 מטר ואז מחברים: 1 + 0.25 = 1.25.",en:""},ref:{id:"physics-pdf",part:"עמוד 2"}},{id:"physics-units-07",position:7,type:"mcq",topic:null,difficulty:null,prompt:"כמה מילימטרים הם 3 ס״מ?",choices:["30 מ״מ","3 מ״מ","300 מ״מ"],correct:0,explanation:{he:"כל סנטימטר הוא 10 מ״מ, ולכן 3 ס״מ הם 30 מ״מ.",en:""},ref:{id:"physics-pdf",part:"עמוד 2"}},{id:"physics-units-08",position:8,type:"mcq",topic:null,difficulty:null,prompt:"כמה סנטימטרים הם 12 מ״מ?",choices:["1.2 ס״מ","12 ס״מ","120 ס״מ"],correct:0,explanation:{he:"מחלקים את מספר המילימטרים ב־10: התוצאה היא 1.2 ס״מ.",en:""},ref:{id:"physics-pdf",part:"עמוד 2"}},{id:"physics-units-09",position:9,type:"mcq",topic:null,difficulty:null,prompt:"כמה קילומטרים הם 1,500 מטרים?",choices:["1.5 ק״מ","15 ק״מ","0.15 ק״מ"],correct:0,explanation:{he:"מחלקים ב־1,000: 1,500 מטרים הם 1.5 ק״מ.",en:""},ref:{id:"physics-pdf",part:"עמוד 2"}},{id:"physics-units-10",position:10,type:"mcq",topic:null,difficulty:null,prompt:"מה ארוך יותר: 90 ס״מ או מטר אחד?",choices:["מטר אחד","90 ס״מ","הם שווים"],correct:0,explanation:{he:"מטר אחד הוא 100 ס״מ, ולכן הוא ארוך מ־90 ס״מ.",en:""},ref:{id:"physics-pdf",part:"עמוד 2"}},{id:"physics-units-11",position:11,type:"mcq",topic:null,difficulty:null,prompt:"מה קורה לאורך עצמו כשממירים אותו מס״מ למ״מ?",choices:["האורך נשאר זהה","האורך גדל פי 10","האורך קטן פי 10"],correct:0,explanation:{he:"הגוף אינו משתנה; רק המספר והיחידה שבהם מתארים אותו משתנים.",en:""},ref:{id:"physics-pdf",part:"עמוד 2"}}]},{id:"physics-precision",subject_id:"physics",exam_id:"physics-v1-assessment",title:"מודדים נכון",description:"בוחרים כלי מתאים וקוראים את הסרגל בזהירות.",references:[{id:"physics-pdf",kind:"pdf",title:"סיכום נושא מדידות (PDF)",url:"assets/materials/physics-measurements-grade-7.pdf",attribution:"שרית שרת",parts:[{part:"עמוד 1",title:"מדידות: מהי מדידה, מדידה ישירה ומדידה עקיפה"},{part:"עמוד 2",title:"המרת יחידות אורך"},{part:"עמוד 3",title:"איך מודדים עובי של דף?"},{part:"עמוד 4",title:"דיוק ומדידה נכונה"},{part:"עמוד 5",title:"מודדים גובה של עמוד: הרעיון הגאומטרי"},{part:"עמוד 6",title:"מדידת העמוד בפועל"}]}],questions:[{id:"physics-precision-01",position:1,type:"mcq",topic:null,difficulty:null,prompt:"מאיזו נקודה בסרגל מתחילים למדוד אורך?",choices:["מסימון האפס","תמיד מקצה הסרגל","מהמספר 1"],correct:0,explanation:{he:"מצמידים את תחילת הגוף לסימון האפס, שלא תמיד נמצא בקצה הסרגל.",en:""},ref:{id:"physics-pdf",part:"עמוד 4"}},{id:"physics-precision-02",position:2,type:"mcq",topic:null,difficulty:null,prompt:"גוף מתחיל ב־2.0 ס״מ ומסתיים ב־8.2 ס״מ. מה אורכו?",choices:["6.2 ס״מ","8.2 ס״מ","10.2 ס״מ"],correct:0,explanation:{he:"מחסרים את קריאת ההתחלה מקריאת הסיום: 8.2 − 2.0 = 6.2 ס״מ.",en:""},ref:{id:"physics-pdf",part:"עמוד 4"}},{id:"physics-precision-03",position:3,type:"mcq",topic:null,difficulty:null,prompt:"איך מסתכלים על שנתות הסרגל כדי לצמצם טעות קריאה?",choices:["בניצב לסולם","באלכסון ככל האפשר","ממרחק גדול"],correct:0,explanation:{he:"מבט בניצב לסולם מצמצם שגיאת קריאה בגלל זווית ההסתכלות.",en:""},ref:{id:"physics-pdf",part:"עמוד 4"}},{id:"physics-precision-04",position:4,type:"mcq",topic:null,difficulty:null,prompt:"איזה כלי מתאים יותר למדידת אורך של חדר?",choices:["סרט מדידה","סרגל קצר בלבד","שעון"],correct:0,explanation:{he:"סרט מדידה מתאים יותר לאורכו של חדר.",en:""},ref:{id:"physics-pdf",part:"עמוד 4"}},{id:"physics-precision-05",position:5,type:"mcq",topic:null,difficulty:null,prompt:"מה מאפשרות שנתות קטנות יותר על כלי מדידה?",choices:["קריאה מפורטת יותר","ביטול מוחלט של כל טעות","שינוי האורך של הגוף"],correct:0,explanation:{he:"שנתות קטנות מאפשרות לקרוא את המדידה בפירוט רב יותר.",en:""},ref:{id:"physics-pdf",part:"עמוד 4"}},{id:"physics-precision-06",position:6,type:"mcq",topic:null,difficulty:null,prompt:"מדוע חוזרים על מדידה?",choices:["כדי לזהות חריגות ולהקטין השפעת שגיאות אקראיות","כדי לתקן בהכרח כלי פגום","כדי לשנות את גודל הגוף"],correct:0,explanation:{he:"חזרות מסייעות לזהות חריגות, אך אינן מתקנות כלי פגום או שיטה שגויה.",en:""},ref:{id:"physics-pdf",part:"עמוד 4"}},{id:"physics-precision-07",position:7,type:"mcq",topic:null,difficulty:null,prompt:"גוף מתחיל בסימון 3 ס״מ ומסתיים ב־9 ס״מ. מה אורכו?",choices:["6 ס״מ","9 ס״מ","12 ס״מ"],correct:0,explanation:{he:"מחסרים את קריאת ההתחלה מקריאת הסיום: 9 פחות 3 הם 6 ס״מ.",en:""},ref:{id:"physics-pdf",part:"עמוד 4"}},{id:"physics-precision-08",position:8,type:"mcq",topic:null,difficulty:null,prompt:"למה לא תמיד מתחילים למדוד מקצה הסרגל?",choices:["כי סימון האפס יכול להיות רחוק מהקצה","כי הסרגל תמיד מתחיל ב־1","כי אסור להשתמש בסימון האפס"],correct:0,explanation:{he:"חשוב להתחיל מסימון האפס; קצה הסרגל לא תמיד נמצא בדיוק באפס.",en:""},ref:{id:"physics-pdf",part:"עמוד 4"}},{id:"physics-precision-09",position:9,type:"mcq",topic:null,difficulty:null,prompt:"איזה כלי מתאים למדידת אורך של עיפרון?",choices:["סרגל עם שנתות קטנות","שעון עצר","מדחום"],correct:0,explanation:{he:"סרגל עם שנתות מתאימות מאפשר למדוד את אורך העיפרון.",en:""},ref:{id:"physics-pdf",part:"עמוד 4"}},{id:"physics-precision-10",position:10,type:"mcq",topic:null,difficulty:null,prompt:"מה חזרה על מדידה אינה מתקנת בהכרח?",choices:["שיטה שגויה או כלי פגום","טעות אקראית בודדת","תוצאה חריגה שאפשר לזהות"],correct:0,explanation:{he:"חזרה יכולה לעזור לזהות חריגות, אך אינה מתקנת כלי פגום או שיטה שגויה.",en:""},ref:{id:"physics-pdf",part:"עמוד 4"}},{id:"physics-precision-11",position:11,type:"mcq",topic:null,difficulty:null,prompt:"מה כדאי לבדוק לפני שרושמים תוצאה?",choices:["את היחידה, נקודת האפס וזווית ההסתכלות","רק את צבע כלי המדידה","רק את שם הגוף"],correct:0,explanation:{he:"יחידה מתאימה, נקודת אפס נכונה ומבט בניצב עוזרים למדוד נכון.",en:""},ref:{id:"physics-pdf",part:"עמוד 4"}}]},{id:"physics-pole",subject_id:"physics",exam_id:"physics-v1-assessment",title:"מודדים גובה של עמוד",description:"מחשבים גובה בעזרת זווית של 45° ומרחק אופקי.",references:[{id:"physics-pdf",kind:"pdf",title:"סיכום נושא מדידות (PDF)",url:"assets/materials/physics-measurements-grade-7.pdf",attribution:"שרית שרת",parts:[{part:"עמוד 1",title:"מדידות: מהי מדידה, מדידה ישירה ומדידה עקיפה"},{part:"עמוד 2",title:"המרת יחידות אורך"},{part:"עמוד 3",title:"איך מודדים עובי של דף?"},{part:"עמוד 4",title:"דיוק ומדידה נכונה"},{part:"עמוד 5",title:"מודדים גובה של עמוד: הרעיון הגאומטרי"},{part:"עמוד 6",title:"מדידת העמוד בפועל"}]}],questions:[{id:"physics-pole-01",position:1,type:"mcq",topic:null,difficulty:null,prompt:"בשיטת העמוד, באיזו זווית לאופק מכוונים אל ראש העמוד?",choices:["45°","90°","180°"],correct:0,explanation:{he:"מכוונים את קו הראייה בזווית של 45° ביחס לאופק.",en:""},ref:{id:"physics-pdf",part:"עמוד 5"}},{id:"physics-pole-02",position:2,type:"mcq",topic:null,difficulty:null,prompt:"מה שווה למרחק האופקי לעמוד בשיטת 45°?",choices:["גובה ראש העמוד מעל גובה העיניים","גובה העמוד כולו","גובה העיניים"],correct:0,explanation:{he:"במשולש ישר־זווית ושווה־שוקיים שני הניצבים שווים.",en:""},ref:{id:"physics-pdf",part:"עמוד 5"}},{id:"physics-pole-03",position:3,type:"mcq",topic:null,difficulty:null,prompt:"המרחק האופקי לעמוד 6 מטרים וגובה העיניים 1.4 מטרים. מה גובה העמוד?",choices:["7.4 מטרים","6 מטרים","4.6 מטרים"],correct:0,explanation:{he:"מחברים את המרחק האופקי לגובה העיניים: 6 + 1.4 = 7.4 מטרים.",en:""},ref:{id:"physics-pdf",part:"עמוד 6"}},{id:"physics-pole-04",position:4,type:"mcq",topic:null,difficulty:null,prompt:"איזה מרחק מודדים לצורך החישוב?",choices:["המרחק האופקי אל בסיס העמוד","אורך קו הראייה האלכסוני","המרחק מראש העמוד לקרקע באומדן"],correct:0,explanation:{he:"מודדים את המרחק האופקי מהנקודה שמתחת לעין אל בסיס העמוד.",en:""},ref:{id:"physics-pdf",part:"עמוד 6"}},{id:"physics-pole-05",position:5,type:"mcq",topic:null,difficulty:null,prompt:"איזה גובה מוסיפים למרחק האופקי?",choices:["גובה העיניים מעל הקרקע","גובה התלמיד כולו","גובה המשולש שביד"],correct:0,explanation:{he:"מוסיפים את גובה העיניים, כי המשולש מתחיל בגובה העין.",en:""},ref:{id:"physics-pdf",part:"עמוד 6"}},{id:"physics-pole-06",position:6,type:"mcq",topic:null,difficulty:null,prompt:"איזה תנאי נדרש לשיטה המתוארת?",choices:["קרקע אופקית ובסיס העמוד באותו מפלס","העמוד חייב להיות נמוך מהתלמיד","אין צורך לדעת את זווית הראייה"],correct:0,explanation:{he:"הנוסחה מתאימה כאשר הקרקע אופקית ובסיס העמוד באותו מפלס.",en:""},ref:{id:"physics-pdf",part:"עמוד 5"}},{id:"physics-pole-07",position:7,type:"mcq",topic:null,difficulty:null,prompt:"המרחק לעמוד 4 מטרים וגובה העיניים 1.5 מטרים. מה גובה העמוד בשיטת 45°?",choices:["5.5 מטרים","4 מטרים","2.5 מטרים"],correct:0,explanation:{he:"מחברים מרחק אופקי וגובה עיניים: 4 + 1.5 = 5.5 מטרים.",en:""},ref:{id:"physics-pdf",part:"עמוד 5"}},{id:"physics-pole-08",position:8,type:"mcq",topic:null,difficulty:null,prompt:"מה צריך לראות דרך הגליל כשקובעים את נקודת המדידה?",choices:["את ראש העמוד","את בסיס העמוד בלבד","את הקרקע מתחת לעיניים"],correct:0,explanation:{he:"מתקדמים או מתרחקים עד שרואים את ראש העמוד דרך הגליל המכוון ב־45°.",en:""},ref:{id:"physics-pdf",part:"עמוד 6"}},{id:"physics-pole-09",position:9,type:"mcq",topic:null,difficulty:null,prompt:"מהו תפקיד המשולש בעל זווית 45°?",choices:["לעזור לכוון את הגליל בזווית הנכונה לאופק","למדוד ישירות את גובה העמוד","למדוד את עובי העמוד"],correct:0,explanation:{he:"המשולש עוזר לקבע את הגליל בזווית של 45° ביחס לאופק.",en:""},ref:{id:"physics-pdf",part:"עמוד 6"}},{id:"physics-pole-10",position:10,type:"mcq",topic:null,difficulty:null,prompt:"אם המרחק האופקי לעמוד 5 מטרים, מה גובה ראש העמוד מעל גובה העיניים בשיטה זו?",choices:["5 מטרים","10 מטרים","2.5 מטרים"],correct:0,explanation:{he:"בזווית של 45° הניצבים במשולש שווים, ולכן הגובה מעל העיניים שווה למרחק האופקי.",en:""},ref:{id:"physics-pdf",part:"עמוד 5"}},{id:"physics-pole-11",position:11,type:"mcq",topic:null,difficulty:null,prompt:"למה זו מדידה עקיפה?",choices:["כי מודדים מרחק וגובה עיניים ומחשבים מהם את גובה העמוד","כי קוראים את גובה העמוד ישירות מסרגל","כי אין צורך למדוד דבר"],correct:0,explanation:{he:"גובה העמוד מתקבל מחישוב המבוסס על מדידות אחרות.",en:""},ref:{id:"physics-pdf",part:"עמוד 6"}}]}]},Os="facts",Hr=js.quizzes.map(({id:n,title:e,subject_id:t,questions:i})=>({id:n,title:e,subjectId:t,count:i.length})),Cc={easy:1,medium:1.5,hard:2},Pc=n=>typeof n=="string"&&/^[a-z0-9-]+$/.test(n);function sd(n){var t;if(typeof n!="string"||!n.trim())throw new Error("Invalid reference URL");const e=new URL(n,`${((t=globalThis.location)==null?void 0:t.origin)||"https://prepx.invalid"}/`);if(!["https:","http:"].includes(e.protocol))throw new Error("Invalid reference URL");return e.href}function Bs(n,{source:e=(n==null?void 0:n.source)||"snapshot",pinned:t=!1}={}){const i=Hr.find(c=>c.id===(n==null?void 0:n.id));if(!i||typeof n.title!="string"||!n.title.trim()||!Array.isArray(n.questions)||(t?n.questions.length<1||n.questions.length>30:n.questions.length!==i.count)||!Array.isArray(n.references))throw new Error("Invalid maze content");const r=n.references.map(c=>{if(!Pc(c.id)||typeof c.title!="string")throw new Error("Invalid question reference");return{...c,url:sd(c.url)}});if(new Set(r.map(c=>c.id)).size!==r.length)throw new Error("Duplicate reference");const s=n.questions.map(c=>{var u,h;const f=r.find(_=>{var M;return _.id===((M=c.ref)==null?void 0:M.id)});if(!Pc(c.id)||c.type!=="mcq"||typeof c.prompt!="string"||!c.prompt.trim()||!Array.isArray(c.choices)||c.choices.length<2||c.choices.length>8||c.choices.some(_=>typeof _!="string"||!_.trim())||!Number.isInteger(c.correct)||c.correct<0||c.correct>=c.choices.length||typeof((u=c.explanation)==null?void 0:u.he)!="string"||!c.explanation.he.trim()||!f||!(c.ref.part===null||typeof c.ref.part=="string"))throw new Error("Invalid practice question");if(c.ref.part&&!((h=f.parts)!=null&&h.some(_=>_.part===c.ref.part)))throw new Error("Unknown reference part");const d=Object.hasOwn(Cc,c.difficulty)?c.difficulty:"medium";return{id:c.id,type:"mcq",prompt:c.prompt,choices:[...c.choices],correct:c.correct,difficulty:d,weight:Cc[d],topic:c.topic||null,explanation:{he:c.explanation.he,en:typeof c.explanation.en=="string"?c.explanation.en:""},ref:{id:c.ref.id,part:c.ref.part},reference:{id:f.id,title:f.title,url:f.url,part:c.ref.part}}});if(new Set(s.map(c=>c.id)).size!==s.length)throw new Error("Duplicate question");const a={id:n.id,title:n.title,description:typeof n.description=="string"?n.description:"",subjectId:n.subject_id||n.subjectId||i.subjectId,questions:s,references:r,source:e==="live"?"live":"snapshot",offline:e!=="live"};let o=2166136261;const l=JSON.stringify(s.map(({id:c,prompt:f,choices:d,correct:u,difficulty:h,explanation:_,ref:M})=>({id:c,prompt:f,choices:d,correct:u,difficulty:h,explanation:_,ref:M})));for(const c of l)o=Math.imul(o^c.charCodeAt(0),16777619);return{...a,version:`maze-v1-${(o>>>0).toString(16)}`}}async function Ks({quizId:n=Os,fetchImpl:e=globalThis.fetch}={}){const t=js.quizzes.find(s=>s.id===n);if(!t)throw new Error("Unknown maze quiz");const i=new AbortController;let r;try{const s=new Promise((l,c)=>{r=setTimeout(()=>{i.abort(),c(new Error("Content timeout"))},2500)}),a=await Promise.race([Promise.resolve().then(()=>{var l;return e(new URL(`/api/quizzes/${encodeURIComponent(n)}`,`${((l=globalThis.location)==null?void 0:l.origin)||"https://prepx.invalid"}/`).href,{signal:i.signal,credentials:"omit"})}),s]);if(!a.ok)throw new Error("Content unavailable");const o=await Promise.race([a.json(),s]);if((o==null?void 0:o.id)!==n)throw new Error("Content mismatch");return Bs(o,{source:"live"})}catch{return Bs(t,{source:"snapshot"})}finally{clearTimeout(r)}}/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Xo="181",ad=0,Lc=1,od=2,eu=1,cd=2,zn=3,li=0,tn=1,kn=2,Gn=0,er=1,Dc=2,Ic=3,Uc=4,ld=5,yi=100,ud=101,dd=102,fd=103,hd=104,pd=200,md=201,xd=202,gd=203,Ha=204,Wa=205,_d=206,vd=207,Md=208,bd=209,yd=210,Sd=211,Ed=212,Td=213,wd=214,Xa=0,qa=1,Ya=2,ar=3,$a=4,ja=5,Ka=6,Za=7,tu=0,Ad=1,Rd=2,oi=0,Cd=1,Pd=2,Ld=3,nu=4,Dd=5,Id=6,Ud=7,iu=300,or=301,cr=302,Ja=303,Qa=304,Zs=306,eo=1e3,Vn=1001,to=1002,un=1003,Nd=1004,cs=1005,hn=1006,aa=1007,Ei=1008,Rn=1009,ru=1010,su=1011,Wr=1012,qo=1013,Ri=1014,En=1015,pr=1016,Yo=1017,$o=1018,Xr=1020,au=35902,ou=35899,cu=1021,lu=1022,vn=1023,qr=1026,Yr=1027,jo=1028,Ko=1029,Zo=1030,Jo=1031,Qo=1033,Ps=33776,Ls=33777,Ds=33778,Is=33779,no=35840,io=35841,ro=35842,so=35843,ao=36196,oo=37492,co=37496,lo=37808,uo=37809,fo=37810,ho=37811,po=37812,mo=37813,xo=37814,go=37815,_o=37816,vo=37817,Mo=37818,bo=37819,yo=37820,So=37821,Eo=36492,To=36494,wo=36495,Ao=36283,Ro=36284,Co=36285,Po=36286,Fd=3200,Od=3201,uu=0,Bd=1,ii="",an="srgb",lr="srgb-linear",zs="linear",mt="srgb",Ni=7680,Nc=519,zd=512,kd=513,Vd=514,du=515,Gd=516,Hd=517,Wd=518,Xd=519,Fc=35044,Oc="300 es",Tn=2e3,ks=2001;function fu(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Vs(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function qd(){const n=Vs("canvas");return n.style.display="block",n}const Bc={};function zc(...n){const e="THREE."+n.shift();console.log(e,...n)}function Ve(...n){const e="THREE."+n.shift();console.warn(e,...n)}function Et(...n){const e="THREE."+n.shift();console.error(e,...n)}function $r(...n){const e=n.join(" ");e in Bc||(Bc[e]=!0,Ve(...n))}function Yd(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}class mr{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const Xt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let kc=1234567;const Br=Math.PI/180,ur=180/Math.PI;function xr(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Xt[n&255]+Xt[n>>8&255]+Xt[n>>16&255]+Xt[n>>24&255]+"-"+Xt[e&255]+Xt[e>>8&255]+"-"+Xt[e>>16&15|64]+Xt[e>>24&255]+"-"+Xt[t&63|128]+Xt[t>>8&255]+"-"+Xt[t>>16&255]+Xt[t>>24&255]+Xt[i&255]+Xt[i>>8&255]+Xt[i>>16&255]+Xt[i>>24&255]).toLowerCase()}function Je(n,e,t){return Math.max(e,Math.min(t,n))}function ec(n,e){return(n%e+e)%e}function $d(n,e,t,i,r){return i+(n-e)*(r-i)/(t-e)}function jd(n,e,t){return n!==e?(t-n)/(e-n):0}function zr(n,e,t){return(1-t)*n+t*e}function Kd(n,e,t,i){return zr(n,e,1-Math.exp(-t*i))}function Zd(n,e=1){return e-Math.abs(ec(n,e*2)-e)}function Jd(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function Qd(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function ef(n,e){return n+Math.floor(Math.random()*(e-n+1))}function tf(n,e){return n+Math.random()*(e-n)}function nf(n){return n*(.5-Math.random())}function rf(n){n!==void 0&&(kc=n);let e=kc+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function sf(n){return n*Br}function af(n){return n*ur}function of(n){return(n&n-1)===0&&n!==0}function cf(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function lf(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function uf(n,e,t,i,r){const s=Math.cos,a=Math.sin,o=s(t/2),l=a(t/2),c=s((e+i)/2),f=a((e+i)/2),d=s((e-i)/2),u=a((e-i)/2),h=s((i-e)/2),_=a((i-e)/2);switch(r){case"XYX":n.set(o*f,l*d,l*u,o*c);break;case"YZY":n.set(l*u,o*f,l*d,o*c);break;case"ZXZ":n.set(l*d,l*u,o*f,o*c);break;case"XZX":n.set(o*f,l*_,l*h,o*c);break;case"YXY":n.set(l*h,o*f,l*_,o*c);break;case"ZYZ":n.set(l*_,l*h,o*f,o*c);break;default:Ve("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function Zi(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function jt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const ls={DEG2RAD:Br,RAD2DEG:ur,generateUUID:xr,clamp:Je,euclideanModulo:ec,mapLinear:$d,inverseLerp:jd,lerp:zr,damp:Kd,pingpong:Zd,smoothstep:Jd,smootherstep:Qd,randInt:ef,randFloat:tf,randFloatSpread:nf,seededRandom:rf,degToRad:sf,radToDeg:af,isPowerOfTwo:of,ceilPowerOfTwo:cf,floorPowerOfTwo:lf,setQuaternionFromProperEuler:uf,normalize:jt,denormalize:Zi};class $e{constructor(e=0,t=0){$e.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Je(this.x,e.x,t.x),this.y=Je(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Je(this.x,e,t),this.y=Je(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Je(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Je(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Jr{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,a,o){let l=i[r+0],c=i[r+1],f=i[r+2],d=i[r+3],u=s[a+0],h=s[a+1],_=s[a+2],M=s[a+3];if(o<=0){e[t+0]=l,e[t+1]=c,e[t+2]=f,e[t+3]=d;return}if(o>=1){e[t+0]=u,e[t+1]=h,e[t+2]=_,e[t+3]=M;return}if(d!==M||l!==u||c!==h||f!==_){let m=l*u+c*h+f*_+d*M;m<0&&(u=-u,h=-h,_=-_,M=-M,m=-m);let p=1-o;if(m<.9995){const y=Math.acos(m),S=Math.sin(y);p=Math.sin(p*y)/S,o=Math.sin(o*y)/S,l=l*p+u*o,c=c*p+h*o,f=f*p+_*o,d=d*p+M*o}else{l=l*p+u*o,c=c*p+h*o,f=f*p+_*o,d=d*p+M*o;const y=1/Math.sqrt(l*l+c*c+f*f+d*d);l*=y,c*=y,f*=y,d*=y}}e[t]=l,e[t+1]=c,e[t+2]=f,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,r,s,a){const o=i[r],l=i[r+1],c=i[r+2],f=i[r+3],d=s[a],u=s[a+1],h=s[a+2],_=s[a+3];return e[t]=o*_+f*d+l*h-c*u,e[t+1]=l*_+f*u+c*d-o*h,e[t+2]=c*_+f*h+o*u-l*d,e[t+3]=f*_-o*d-l*u-c*h,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),f=o(r/2),d=o(s/2),u=l(i/2),h=l(r/2),_=l(s/2);switch(a){case"XYZ":this._x=u*f*d+c*h*_,this._y=c*h*d-u*f*_,this._z=c*f*_+u*h*d,this._w=c*f*d-u*h*_;break;case"YXZ":this._x=u*f*d+c*h*_,this._y=c*h*d-u*f*_,this._z=c*f*_-u*h*d,this._w=c*f*d+u*h*_;break;case"ZXY":this._x=u*f*d-c*h*_,this._y=c*h*d+u*f*_,this._z=c*f*_+u*h*d,this._w=c*f*d-u*h*_;break;case"ZYX":this._x=u*f*d-c*h*_,this._y=c*h*d+u*f*_,this._z=c*f*_-u*h*d,this._w=c*f*d+u*h*_;break;case"YZX":this._x=u*f*d+c*h*_,this._y=c*h*d+u*f*_,this._z=c*f*_-u*h*d,this._w=c*f*d-u*h*_;break;case"XZY":this._x=u*f*d-c*h*_,this._y=c*h*d-u*f*_,this._z=c*f*_+u*h*d,this._w=c*f*d+u*h*_;break;default:Ve("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],f=t[6],d=t[10],u=i+o+d;if(u>0){const h=.5/Math.sqrt(u+1);this._w=.25/h,this._x=(f-l)*h,this._y=(s-c)*h,this._z=(a-r)*h}else if(i>o&&i>d){const h=2*Math.sqrt(1+i-o-d);this._w=(f-l)/h,this._x=.25*h,this._y=(r+a)/h,this._z=(s+c)/h}else if(o>d){const h=2*Math.sqrt(1+o-i-d);this._w=(s-c)/h,this._x=(r+a)/h,this._y=.25*h,this._z=(l+f)/h}else{const h=2*Math.sqrt(1+d-i-o);this._w=(a-r)/h,this._x=(s+c)/h,this._y=(l+f)/h,this._z=.25*h}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Je(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,f=t._w;return this._x=i*f+a*o+r*c-s*l,this._y=r*f+a*l+s*o-i*c,this._z=s*f+a*c+i*l-r*o,this._w=a*f-i*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t<=0)return this;if(t>=1)return this.copy(e);let i=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,r=-r,s=-s,a=-a,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),f=Math.sin(c);l=Math.sin(l*c)/f,t=Math.sin(t*c)/f,this._x=this._x*l+i*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+i*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class k{constructor(e=0,t=0,i=0){k.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Vc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Vc.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*i),f=2*(o*t-s*r),d=2*(s*i-a*t);return this.x=t+l*c+a*d-o*f,this.y=i+l*f+o*c-s*d,this.z=r+l*d+s*f-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Je(this.x,e.x,t.x),this.y=Je(this.y,e.y,t.y),this.z=Je(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Je(this.x,e,t),this.y=Je(this.y,e,t),this.z=Je(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Je(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=r*l-s*o,this.y=s*a-i*l,this.z=i*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return oa.copy(this).projectOnVector(e),this.sub(oa)}reflect(e){return this.sub(oa.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Je(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const oa=new k,Vc=new Jr;class He{constructor(e,t,i,r,s,a,o,l,c){He.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,l,c)}set(e,t,i,r,s,a,o,l,c){const f=this.elements;return f[0]=e,f[1]=r,f[2]=o,f[3]=t,f[4]=s,f[5]=l,f[6]=i,f[7]=a,f[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],f=i[4],d=i[7],u=i[2],h=i[5],_=i[8],M=r[0],m=r[3],p=r[6],y=r[1],S=r[4],T=r[7],C=r[2],E=r[5],L=r[8];return s[0]=a*M+o*y+l*C,s[3]=a*m+o*S+l*E,s[6]=a*p+o*T+l*L,s[1]=c*M+f*y+d*C,s[4]=c*m+f*S+d*E,s[7]=c*p+f*T+d*L,s[2]=u*M+h*y+_*C,s[5]=u*m+h*S+_*E,s[8]=u*p+h*T+_*L,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],f=e[8];return t*a*f-t*o*c-i*s*f+i*o*l+r*s*c-r*a*l}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],f=e[8],d=f*a-o*c,u=o*l-f*s,h=c*s-a*l,_=t*d+i*u+r*h;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const M=1/_;return e[0]=d*M,e[1]=(r*c-f*i)*M,e[2]=(o*i-r*a)*M,e[3]=u*M,e[4]=(f*t-r*l)*M,e[5]=(r*s-o*t)*M,e[6]=h*M,e[7]=(i*l-c*t)*M,e[8]=(a*t-i*s)*M,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(ca.makeScale(e,t)),this}rotate(e){return this.premultiply(ca.makeRotation(-e)),this}translate(e,t){return this.premultiply(ca.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const ca=new He,Gc=new He().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Hc=new He().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function df(){const n={enabled:!0,workingColorSpace:lr,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===mt&&(r.r=Hn(r.r),r.g=Hn(r.g),r.b=Hn(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===mt&&(r.r=tr(r.r),r.g=tr(r.g),r.b=tr(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===ii?zs:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return $r("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return $r("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[lr]:{primaries:e,whitePoint:i,transfer:zs,toXYZ:Gc,fromXYZ:Hc,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:an},outputColorSpaceConfig:{drawingBufferColorSpace:an}},[an]:{primaries:e,whitePoint:i,transfer:mt,toXYZ:Gc,fromXYZ:Hc,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:an}}}),n}const st=df();function Hn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function tr(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Fi;class ff{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Fi===void 0&&(Fi=Vs("canvas")),Fi.width=e.width,Fi.height=e.height;const r=Fi.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=Fi}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Vs("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Hn(s[a]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Hn(t[i]/255)*255):t[i]=Hn(t[i]);return{data:t,width:e.width,height:e.height}}else return Ve("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let hf=0;class tc{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:hf++}),this.uuid=xr(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(la(r[a].image)):s.push(la(r[a]))}else s=la(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function la(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?ff.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Ve("Texture: Unable to serialize Texture."),{})}let pf=0;const ua=new k;class Zt extends mr{constructor(e=Zt.DEFAULT_IMAGE,t=Zt.DEFAULT_MAPPING,i=Vn,r=Vn,s=hn,a=Ei,o=vn,l=Rn,c=Zt.DEFAULT_ANISOTROPY,f=ii){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:pf++}),this.uuid=xr(),this.name="",this.source=new tc(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new $e(0,0),this.repeat=new $e(1,1),this.center=new $e(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new He,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=f,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(ua).x}get height(){return this.source.getSize(ua).y}get depth(){return this.source.getSize(ua).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){Ve(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Ve(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==iu)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case eo:e.x=e.x-Math.floor(e.x);break;case Vn:e.x=e.x<0?0:1;break;case to:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case eo:e.y=e.y-Math.floor(e.y);break;case Vn:e.y=e.y<0?0:1;break;case to:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Zt.DEFAULT_IMAGE=null;Zt.DEFAULT_MAPPING=iu;Zt.DEFAULT_ANISOTROPY=1;class xt{constructor(e=0,t=0,i=0,r=1){xt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*i+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const l=e.elements,c=l[0],f=l[4],d=l[8],u=l[1],h=l[5],_=l[9],M=l[2],m=l[6],p=l[10];if(Math.abs(f-u)<.01&&Math.abs(d-M)<.01&&Math.abs(_-m)<.01){if(Math.abs(f+u)<.1&&Math.abs(d+M)<.1&&Math.abs(_+m)<.1&&Math.abs(c+h+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const S=(c+1)/2,T=(h+1)/2,C=(p+1)/2,E=(f+u)/4,L=(d+M)/4,z=(_+m)/4;return S>T&&S>C?S<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(S),r=E/i,s=L/i):T>C?T<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(T),i=E/r,s=z/r):C<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(C),i=L/s,r=z/s),this.set(i,r,s,t),this}let y=Math.sqrt((m-_)*(m-_)+(d-M)*(d-M)+(u-f)*(u-f));return Math.abs(y)<.001&&(y=1),this.x=(m-_)/y,this.y=(d-M)/y,this.z=(u-f)/y,this.w=Math.acos((c+h+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Je(this.x,e.x,t.x),this.y=Je(this.y,e.y,t.y),this.z=Je(this.z,e.z,t.z),this.w=Je(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Je(this.x,e,t),this.y=Je(this.y,e,t),this.z=Je(this.z,e,t),this.w=Je(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Je(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class mf extends mr{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:hn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new xt(0,0,e,t),this.scissorTest=!1,this.viewport=new xt(0,0,e,t);const r={width:e,height:t,depth:i.depth},s=new Zt(r);this.textures=[];const a=i.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){const t={minFilter:hn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new tc(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ci extends mf{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class hu extends Zt{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=un,this.minFilter=un,this.wrapR=Vn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class xf extends Zt{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=un,this.minFilter=un,this.wrapR=Vn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Pi{constructor(e=new k(1/0,1/0,1/0),t=new k(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(mn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(mn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=mn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,mn):mn.fromBufferAttribute(s,a),mn.applyMatrix4(e.matrixWorld),this.expandByPoint(mn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),us.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),us.copy(i.boundingBox)),us.applyMatrix4(e.matrixWorld),this.union(us)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,mn),mn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Tr),ds.subVectors(this.max,Tr),Oi.subVectors(e.a,Tr),Bi.subVectors(e.b,Tr),zi.subVectors(e.c,Tr),jn.subVectors(Bi,Oi),Kn.subVectors(zi,Bi),xi.subVectors(Oi,zi);let t=[0,-jn.z,jn.y,0,-Kn.z,Kn.y,0,-xi.z,xi.y,jn.z,0,-jn.x,Kn.z,0,-Kn.x,xi.z,0,-xi.x,-jn.y,jn.x,0,-Kn.y,Kn.x,0,-xi.y,xi.x,0];return!da(t,Oi,Bi,zi,ds)||(t=[1,0,0,0,1,0,0,0,1],!da(t,Oi,Bi,zi,ds))?!1:(fs.crossVectors(jn,Kn),t=[fs.x,fs.y,fs.z],da(t,Oi,Bi,zi,ds))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,mn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(mn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(In[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),In[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),In[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),In[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),In[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),In[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),In[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),In[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(In),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const In=[new k,new k,new k,new k,new k,new k,new k,new k],mn=new k,us=new Pi,Oi=new k,Bi=new k,zi=new k,jn=new k,Kn=new k,xi=new k,Tr=new k,ds=new k,fs=new k,gi=new k;function da(n,e,t,i,r){for(let s=0,a=n.length-3;s<=a;s+=3){gi.fromArray(n,s);const o=r.x*Math.abs(gi.x)+r.y*Math.abs(gi.y)+r.z*Math.abs(gi.z),l=e.dot(gi),c=t.dot(gi),f=i.dot(gi);if(Math.max(-Math.max(l,c,f),Math.min(l,c,f))>o)return!1}return!0}const gf=new Pi,wr=new k,fa=new k;class Qr{constructor(e=new k,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):gf.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;wr.subVectors(e,this.center);const t=wr.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(wr,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(fa.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(wr.copy(e.center).add(fa)),this.expandByPoint(wr.copy(e.center).sub(fa))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const Un=new k,ha=new k,hs=new k,Zn=new k,pa=new k,ps=new k,ma=new k;class pu{constructor(e=new k,t=new k(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Un)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Un.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Un.copy(this.origin).addScaledVector(this.direction,t),Un.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){ha.copy(e).add(t).multiplyScalar(.5),hs.copy(t).sub(e).normalize(),Zn.copy(this.origin).sub(ha);const s=e.distanceTo(t)*.5,a=-this.direction.dot(hs),o=Zn.dot(this.direction),l=-Zn.dot(hs),c=Zn.lengthSq(),f=Math.abs(1-a*a);let d,u,h,_;if(f>0)if(d=a*l-o,u=a*o-l,_=s*f,d>=0)if(u>=-_)if(u<=_){const M=1/f;d*=M,u*=M,h=d*(d+a*u+2*o)+u*(a*d+u+2*l)+c}else u=s,d=Math.max(0,-(a*u+o)),h=-d*d+u*(u+2*l)+c;else u=-s,d=Math.max(0,-(a*u+o)),h=-d*d+u*(u+2*l)+c;else u<=-_?(d=Math.max(0,-(-a*s+o)),u=d>0?-s:Math.min(Math.max(-s,-l),s),h=-d*d+u*(u+2*l)+c):u<=_?(d=0,u=Math.min(Math.max(-s,-l),s),h=u*(u+2*l)+c):(d=Math.max(0,-(a*s+o)),u=d>0?s:Math.min(Math.max(-s,-l),s),h=-d*d+u*(u+2*l)+c);else u=a>0?-s:s,d=Math.max(0,-(a*u+o)),h=-d*d+u*(u+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(ha).addScaledVector(hs,u),h}intersectSphere(e,t){Un.subVectors(e.center,this.origin);const i=Un.dot(this.direction),r=Un.dot(Un)-i*i,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,a,o,l;const c=1/this.direction.x,f=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(i=(e.min.x-u.x)*c,r=(e.max.x-u.x)*c):(i=(e.max.x-u.x)*c,r=(e.min.x-u.x)*c),f>=0?(s=(e.min.y-u.y)*f,a=(e.max.y-u.y)*f):(s=(e.max.y-u.y)*f,a=(e.min.y-u.y)*f),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),d>=0?(o=(e.min.z-u.z)*d,l=(e.max.z-u.z)*d):(o=(e.max.z-u.z)*d,l=(e.min.z-u.z)*d),i>l||o>r)||((o>i||i!==i)&&(i=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,Un)!==null}intersectTriangle(e,t,i,r,s){pa.subVectors(t,e),ps.subVectors(i,e),ma.crossVectors(pa,ps);let a=this.direction.dot(ma),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Zn.subVectors(this.origin,e);const l=o*this.direction.dot(ps.crossVectors(Zn,ps));if(l<0)return null;const c=o*this.direction.dot(pa.cross(Zn));if(c<0||l+c>a)return null;const f=-o*Zn.dot(ma);return f<0?null:this.at(f/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class vt{constructor(e,t,i,r,s,a,o,l,c,f,d,u,h,_,M,m){vt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,l,c,f,d,u,h,_,M,m)}set(e,t,i,r,s,a,o,l,c,f,d,u,h,_,M,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=i,p[12]=r,p[1]=s,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=f,p[10]=d,p[14]=u,p[3]=h,p[7]=_,p[11]=M,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new vt().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,r=1/ki.setFromMatrixColumn(e,0).length(),s=1/ki.setFromMatrixColumn(e,1).length(),a=1/ki.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(r),c=Math.sin(r),f=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const u=a*f,h=a*d,_=o*f,M=o*d;t[0]=l*f,t[4]=-l*d,t[8]=c,t[1]=h+_*c,t[5]=u-M*c,t[9]=-o*l,t[2]=M-u*c,t[6]=_+h*c,t[10]=a*l}else if(e.order==="YXZ"){const u=l*f,h=l*d,_=c*f,M=c*d;t[0]=u+M*o,t[4]=_*o-h,t[8]=a*c,t[1]=a*d,t[5]=a*f,t[9]=-o,t[2]=h*o-_,t[6]=M+u*o,t[10]=a*l}else if(e.order==="ZXY"){const u=l*f,h=l*d,_=c*f,M=c*d;t[0]=u-M*o,t[4]=-a*d,t[8]=_+h*o,t[1]=h+_*o,t[5]=a*f,t[9]=M-u*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const u=a*f,h=a*d,_=o*f,M=o*d;t[0]=l*f,t[4]=_*c-h,t[8]=u*c+M,t[1]=l*d,t[5]=M*c+u,t[9]=h*c-_,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const u=a*l,h=a*c,_=o*l,M=o*c;t[0]=l*f,t[4]=M-u*d,t[8]=_*d+h,t[1]=d,t[5]=a*f,t[9]=-o*f,t[2]=-c*f,t[6]=h*d+_,t[10]=u-M*d}else if(e.order==="XZY"){const u=a*l,h=a*c,_=o*l,M=o*c;t[0]=l*f,t[4]=-d,t[8]=c*f,t[1]=u*d+M,t[5]=a*f,t[9]=h*d-_,t[2]=_*d-h,t[6]=o*f,t[10]=M*d+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(_f,e,vf)}lookAt(e,t,i){const r=this.elements;return nn.subVectors(e,t),nn.lengthSq()===0&&(nn.z=1),nn.normalize(),Jn.crossVectors(i,nn),Jn.lengthSq()===0&&(Math.abs(i.z)===1?nn.x+=1e-4:nn.z+=1e-4,nn.normalize(),Jn.crossVectors(i,nn)),Jn.normalize(),ms.crossVectors(nn,Jn),r[0]=Jn.x,r[4]=ms.x,r[8]=nn.x,r[1]=Jn.y,r[5]=ms.y,r[9]=nn.y,r[2]=Jn.z,r[6]=ms.z,r[10]=nn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],f=i[1],d=i[5],u=i[9],h=i[13],_=i[2],M=i[6],m=i[10],p=i[14],y=i[3],S=i[7],T=i[11],C=i[15],E=r[0],L=r[4],z=r[8],b=r[12],g=r[1],A=r[5],U=r[9],R=r[13],Y=r[2],q=r[6],j=r[10],ie=r[14],X=r[3],ae=r[7],fe=r[11],De=r[15];return s[0]=a*E+o*g+l*Y+c*X,s[4]=a*L+o*A+l*q+c*ae,s[8]=a*z+o*U+l*j+c*fe,s[12]=a*b+o*R+l*ie+c*De,s[1]=f*E+d*g+u*Y+h*X,s[5]=f*L+d*A+u*q+h*ae,s[9]=f*z+d*U+u*j+h*fe,s[13]=f*b+d*R+u*ie+h*De,s[2]=_*E+M*g+m*Y+p*X,s[6]=_*L+M*A+m*q+p*ae,s[10]=_*z+M*U+m*j+p*fe,s[14]=_*b+M*R+m*ie+p*De,s[3]=y*E+S*g+T*Y+C*X,s[7]=y*L+S*A+T*q+C*ae,s[11]=y*z+S*U+T*j+C*fe,s[15]=y*b+S*R+T*ie+C*De,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],f=e[2],d=e[6],u=e[10],h=e[14],_=e[3],M=e[7],m=e[11],p=e[15];return _*(+s*l*d-r*c*d-s*o*u+i*c*u+r*o*h-i*l*h)+M*(+t*l*h-t*c*u+s*a*u-r*a*h+r*c*f-s*l*f)+m*(+t*c*d-t*o*h-s*a*d+i*a*h+s*o*f-i*c*f)+p*(-r*o*f-t*l*d+t*o*u+r*a*d-i*a*u+i*l*f)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],f=e[8],d=e[9],u=e[10],h=e[11],_=e[12],M=e[13],m=e[14],p=e[15],y=d*m*c-M*u*c+M*l*h-o*m*h-d*l*p+o*u*p,S=_*u*c-f*m*c-_*l*h+a*m*h+f*l*p-a*u*p,T=f*M*c-_*d*c+_*o*h-a*M*h-f*o*p+a*d*p,C=_*d*l-f*M*l-_*o*u+a*M*u+f*o*m-a*d*m,E=t*y+i*S+r*T+s*C;if(E===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const L=1/E;return e[0]=y*L,e[1]=(M*u*s-d*m*s-M*r*h+i*m*h+d*r*p-i*u*p)*L,e[2]=(o*m*s-M*l*s+M*r*c-i*m*c-o*r*p+i*l*p)*L,e[3]=(d*l*s-o*u*s-d*r*c+i*u*c+o*r*h-i*l*h)*L,e[4]=S*L,e[5]=(f*m*s-_*u*s+_*r*h-t*m*h-f*r*p+t*u*p)*L,e[6]=(_*l*s-a*m*s-_*r*c+t*m*c+a*r*p-t*l*p)*L,e[7]=(a*u*s-f*l*s+f*r*c-t*u*c-a*r*h+t*l*h)*L,e[8]=T*L,e[9]=(_*d*s-f*M*s-_*i*h+t*M*h+f*i*p-t*d*p)*L,e[10]=(a*M*s-_*o*s+_*i*c-t*M*c-a*i*p+t*o*p)*L,e[11]=(f*o*s-a*d*s-f*i*c+t*d*c+a*i*h-t*o*h)*L,e[12]=C*L,e[13]=(f*M*r-_*d*r+_*i*u-t*M*u-f*i*m+t*d*m)*L,e[14]=(_*o*r-a*M*r-_*i*l+t*M*l+a*i*m-t*o*m)*L,e[15]=(a*d*r-f*o*r+f*i*l-t*d*l-a*i*u+t*o*u)*L,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,a=e.x,o=e.y,l=e.z,c=s*a,f=s*o;return this.set(c*a+i,c*o-r*l,c*l+r*o,0,c*o+r*l,f*o+i,f*l-r*a,0,c*l-r*o,f*l+r*a,s*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,f=a+a,d=o+o,u=s*c,h=s*f,_=s*d,M=a*f,m=a*d,p=o*d,y=l*c,S=l*f,T=l*d,C=i.x,E=i.y,L=i.z;return r[0]=(1-(M+p))*C,r[1]=(h+T)*C,r[2]=(_-S)*C,r[3]=0,r[4]=(h-T)*E,r[5]=(1-(u+p))*E,r[6]=(m+y)*E,r[7]=0,r[8]=(_+S)*L,r[9]=(m-y)*L,r[10]=(1-(u+M))*L,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;let s=ki.set(r[0],r[1],r[2]).length();const a=ki.set(r[4],r[5],r[6]).length(),o=ki.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],xn.copy(this);const c=1/s,f=1/a,d=1/o;return xn.elements[0]*=c,xn.elements[1]*=c,xn.elements[2]*=c,xn.elements[4]*=f,xn.elements[5]*=f,xn.elements[6]*=f,xn.elements[8]*=d,xn.elements[9]*=d,xn.elements[10]*=d,t.setFromRotationMatrix(xn),i.x=s,i.y=a,i.z=o,this}makePerspective(e,t,i,r,s,a,o=Tn,l=!1){const c=this.elements,f=2*s/(t-e),d=2*s/(i-r),u=(t+e)/(t-e),h=(i+r)/(i-r);let _,M;if(l)_=s/(a-s),M=a*s/(a-s);else if(o===Tn)_=-(a+s)/(a-s),M=-2*a*s/(a-s);else if(o===ks)_=-a/(a-s),M=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=f,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=d,c[9]=h,c[13]=0,c[2]=0,c[6]=0,c[10]=_,c[14]=M,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,r,s,a,o=Tn,l=!1){const c=this.elements,f=2/(t-e),d=2/(i-r),u=-(t+e)/(t-e),h=-(i+r)/(i-r);let _,M;if(l)_=1/(a-s),M=a/(a-s);else if(o===Tn)_=-2/(a-s),M=-(a+s)/(a-s);else if(o===ks)_=-1/(a-s),M=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=f,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=d,c[9]=0,c[13]=h,c[2]=0,c[6]=0,c[10]=_,c[14]=M,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const ki=new k,xn=new vt,_f=new k(0,0,0),vf=new k(1,1,1),Jn=new k,ms=new k,nn=new k,Wc=new vt,Xc=new Jr;class Cn{constructor(e=0,t=0,i=0,r=Cn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],f=r[9],d=r[2],u=r[6],h=r[10];switch(t){case"XYZ":this._y=Math.asin(Je(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-f,h),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Je(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(o,h),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(Je(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,h),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Je(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,h),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Je(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-f,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(o,h));break;case"XZY":this._z=Math.asin(-Je(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-f,h),this._y=0);break;default:Ve("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Wc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Wc,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Xc.setFromEuler(this),this.setFromQuaternion(Xc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Cn.DEFAULT_ORDER="XYZ";class nc{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Mf=0;const qc=new k,Vi=new Jr,Nn=new vt,xs=new k,Ar=new k,bf=new k,yf=new Jr,Yc=new k(1,0,0),$c=new k(0,1,0),jc=new k(0,0,1),Kc={type:"added"},Sf={type:"removed"},Gi={type:"childadded",child:null},xa={type:"childremoved",child:null};class It extends mr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Mf++}),this.uuid=xr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=It.DEFAULT_UP.clone();const e=new k,t=new Cn,i=new Jr,r=new k(1,1,1);function s(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new vt},normalMatrix:{value:new He}}),this.matrix=new vt,this.matrixWorld=new vt,this.matrixAutoUpdate=It.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=It.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new nc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Vi.setFromAxisAngle(e,t),this.quaternion.multiply(Vi),this}rotateOnWorldAxis(e,t){return Vi.setFromAxisAngle(e,t),this.quaternion.premultiply(Vi),this}rotateX(e){return this.rotateOnAxis(Yc,e)}rotateY(e){return this.rotateOnAxis($c,e)}rotateZ(e){return this.rotateOnAxis(jc,e)}translateOnAxis(e,t){return qc.copy(e).applyQuaternion(this.quaternion),this.position.add(qc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Yc,e)}translateY(e){return this.translateOnAxis($c,e)}translateZ(e){return this.translateOnAxis(jc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Nn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?xs.copy(e):xs.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Ar.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Nn.lookAt(Ar,xs,this.up):Nn.lookAt(xs,Ar,this.up),this.quaternion.setFromRotationMatrix(Nn),r&&(Nn.extractRotation(r.matrixWorld),Vi.setFromRotationMatrix(Nn),this.quaternion.premultiply(Vi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Et("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Kc),Gi.child=e,this.dispatchEvent(Gi),Gi.child=null):Et("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Sf),xa.child=e,this.dispatchEvent(xa),xa.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Nn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Nn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Nn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Kc),Gi.child=e,this.dispatchEvent(Gi),Gi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ar,e,bf),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ar,yf,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,f=l.length;c<f;c++){const d=l[c];s(e.shapes,d)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),f=a(e.images),d=a(e.shapes),u=a(e.skeletons),h=a(e.animations),_=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),f.length>0&&(i.images=f),d.length>0&&(i.shapes=d),u.length>0&&(i.skeletons=u),h.length>0&&(i.animations=h),_.length>0&&(i.nodes=_)}return i.object=r,i;function a(o){const l=[];for(const c in o){const f=o[c];delete f.metadata,l.push(f)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}It.DEFAULT_UP=new k(0,1,0);It.DEFAULT_MATRIX_AUTO_UPDATE=!0;It.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const gn=new k,Fn=new k,ga=new k,On=new k,Hi=new k,Wi=new k,Zc=new k,_a=new k,va=new k,Ma=new k,ba=new xt,ya=new xt,Sa=new xt;class _n{constructor(e=new k,t=new k,i=new k){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),gn.subVectors(e,t),r.cross(gn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){gn.subVectors(r,t),Fn.subVectors(i,t),ga.subVectors(e,t);const a=gn.dot(gn),o=gn.dot(Fn),l=gn.dot(ga),c=Fn.dot(Fn),f=Fn.dot(ga),d=a*c-o*o;if(d===0)return s.set(0,0,0),null;const u=1/d,h=(c*l-o*f)*u,_=(a*f-o*l)*u;return s.set(1-h-_,_,h)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,On)===null?!1:On.x>=0&&On.y>=0&&On.x+On.y<=1}static getInterpolation(e,t,i,r,s,a,o,l){return this.getBarycoord(e,t,i,r,On)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,On.x),l.addScaledVector(a,On.y),l.addScaledVector(o,On.z),l)}static getInterpolatedAttribute(e,t,i,r,s,a){return ba.setScalar(0),ya.setScalar(0),Sa.setScalar(0),ba.fromBufferAttribute(e,t),ya.fromBufferAttribute(e,i),Sa.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(ba,s.x),a.addScaledVector(ya,s.y),a.addScaledVector(Sa,s.z),a}static isFrontFacing(e,t,i,r){return gn.subVectors(i,t),Fn.subVectors(e,t),gn.cross(Fn).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return gn.subVectors(this.c,this.b),Fn.subVectors(this.a,this.b),gn.cross(Fn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return _n.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return _n.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return _n.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return _n.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return _n.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let a,o;Hi.subVectors(r,i),Wi.subVectors(s,i),_a.subVectors(e,i);const l=Hi.dot(_a),c=Wi.dot(_a);if(l<=0&&c<=0)return t.copy(i);va.subVectors(e,r);const f=Hi.dot(va),d=Wi.dot(va);if(f>=0&&d<=f)return t.copy(r);const u=l*d-f*c;if(u<=0&&l>=0&&f<=0)return a=l/(l-f),t.copy(i).addScaledVector(Hi,a);Ma.subVectors(e,s);const h=Hi.dot(Ma),_=Wi.dot(Ma);if(_>=0&&h<=_)return t.copy(s);const M=h*c-l*_;if(M<=0&&c>=0&&_<=0)return o=c/(c-_),t.copy(i).addScaledVector(Wi,o);const m=f*_-h*d;if(m<=0&&d-f>=0&&h-_>=0)return Zc.subVectors(s,r),o=(d-f)/(d-f+(h-_)),t.copy(r).addScaledVector(Zc,o);const p=1/(m+M+u);return a=M*p,o=u*p,t.copy(i).addScaledVector(Hi,a).addScaledVector(Wi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const mu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Qn={h:0,s:0,l:0},gs={h:0,s:0,l:0};function Ea(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class Qe{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=an){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,st.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=st.workingColorSpace){return this.r=e,this.g=t,this.b=i,st.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=st.workingColorSpace){if(e=ec(e,1),t=Je(t,0,1),i=Je(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,a=2*i-s;this.r=Ea(a,s,e+1/3),this.g=Ea(a,s,e),this.b=Ea(a,s,e-1/3)}return st.colorSpaceToWorking(this,r),this}setStyle(e,t=an){function i(s){s!==void 0&&parseFloat(s)<1&&Ve("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Ve("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);Ve("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=an){const i=mu[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Ve("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Hn(e.r),this.g=Hn(e.g),this.b=Hn(e.b),this}copyLinearToSRGB(e){return this.r=tr(e.r),this.g=tr(e.g),this.b=tr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=an){return st.workingToColorSpace(qt.copy(this),e),Math.round(Je(qt.r*255,0,255))*65536+Math.round(Je(qt.g*255,0,255))*256+Math.round(Je(qt.b*255,0,255))}getHexString(e=an){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=st.workingColorSpace){st.workingToColorSpace(qt.copy(this),t);const i=qt.r,r=qt.g,s=qt.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let l,c;const f=(o+a)/2;if(o===a)l=0,c=0;else{const d=a-o;switch(c=f<=.5?d/(a+o):d/(2-a-o),a){case i:l=(r-s)/d+(r<s?6:0);break;case r:l=(s-i)/d+2;break;case s:l=(i-r)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=f,e}getRGB(e,t=st.workingColorSpace){return st.workingToColorSpace(qt.copy(this),t),e.r=qt.r,e.g=qt.g,e.b=qt.b,e}getStyle(e=an){st.workingToColorSpace(qt.copy(this),e);const t=qt.r,i=qt.g,r=qt.b;return e!==an?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(Qn),this.setHSL(Qn.h+e,Qn.s+t,Qn.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Qn),e.getHSL(gs);const i=zr(Qn.h,gs.h,t),r=zr(Qn.s,gs.s,t),s=zr(Qn.l,gs.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const qt=new Qe;Qe.NAMES=mu;let Ef=0;class es extends mr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ef++}),this.uuid=xr(),this.name="",this.type="Material",this.blending=er,this.side=li,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ha,this.blendDst=Wa,this.blendEquation=yi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Qe(0,0,0),this.blendAlpha=0,this.depthFunc=ar,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Nc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ni,this.stencilZFail=Ni,this.stencilZPass=Ni,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){Ve(`Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Ve(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==er&&(i.blending=this.blending),this.side!==li&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Ha&&(i.blendSrc=this.blendSrc),this.blendDst!==Wa&&(i.blendDst=this.blendDst),this.blendEquation!==yi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==ar&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Nc&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ni&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Ni&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Ni&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class xu extends es{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Qe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Cn,this.combine=tu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const At=new k,_s=new $e;let Tf=0;class bn{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Tf++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Fc,this.updateRanges=[],this.gpuType=En,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)_s.fromBufferAttribute(this,t),_s.applyMatrix3(e),this.setXY(t,_s.x,_s.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)At.fromBufferAttribute(this,t),At.applyMatrix3(e),this.setXYZ(t,At.x,At.y,At.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)At.fromBufferAttribute(this,t),At.applyMatrix4(e),this.setXYZ(t,At.x,At.y,At.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)At.fromBufferAttribute(this,t),At.applyNormalMatrix(e),this.setXYZ(t,At.x,At.y,At.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)At.fromBufferAttribute(this,t),At.transformDirection(e),this.setXYZ(t,At.x,At.y,At.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Zi(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=jt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Zi(t,this.array)),t}setX(e,t){return this.normalized&&(t=jt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Zi(t,this.array)),t}setY(e,t){return this.normalized&&(t=jt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Zi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=jt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Zi(t,this.array)),t}setW(e,t){return this.normalized&&(t=jt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=jt(t,this.array),i=jt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=jt(t,this.array),i=jt(i,this.array),r=jt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=jt(t,this.array),i=jt(i,this.array),r=jt(r,this.array),s=jt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Fc&&(e.usage=this.usage),e}}class gu extends bn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class _u extends bn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class gt extends bn{constructor(e,t,i){super(new Float32Array(e),t,i)}}let wf=0;const dn=new vt,Ta=new It,Xi=new k,rn=new Pi,Rr=new Pi,Bt=new k;class Jt extends mr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:wf++}),this.uuid=xr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(fu(e)?_u:gu)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new He().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return dn.makeRotationFromQuaternion(e),this.applyMatrix4(dn),this}rotateX(e){return dn.makeRotationX(e),this.applyMatrix4(dn),this}rotateY(e){return dn.makeRotationY(e),this.applyMatrix4(dn),this}rotateZ(e){return dn.makeRotationZ(e),this.applyMatrix4(dn),this}translate(e,t,i){return dn.makeTranslation(e,t,i),this.applyMatrix4(dn),this}scale(e,t,i){return dn.makeScale(e,t,i),this.applyMatrix4(dn),this}lookAt(e){return Ta.lookAt(e),Ta.updateMatrix(),this.applyMatrix4(Ta.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Xi).negate(),this.translate(Xi.x,Xi.y,Xi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new gt(i,3))}else{const i=Math.min(e.length,t.count);for(let r=0;r<i;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&Ve("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Pi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Et("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new k(-1/0,-1/0,-1/0),new k(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];rn.setFromBufferAttribute(s),this.morphTargetsRelative?(Bt.addVectors(this.boundingBox.min,rn.min),this.boundingBox.expandByPoint(Bt),Bt.addVectors(this.boundingBox.max,rn.max),this.boundingBox.expandByPoint(Bt)):(this.boundingBox.expandByPoint(rn.min),this.boundingBox.expandByPoint(rn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Et('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Qr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Et("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new k,1/0);return}if(e){const i=this.boundingSphere.center;if(rn.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];Rr.setFromBufferAttribute(o),this.morphTargetsRelative?(Bt.addVectors(rn.min,Rr.min),rn.expandByPoint(Bt),Bt.addVectors(rn.max,Rr.max),rn.expandByPoint(Bt)):(rn.expandByPoint(Rr.min),rn.expandByPoint(Rr.max))}rn.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)Bt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Bt));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],l=this.morphTargetsRelative;for(let c=0,f=o.count;c<f;c++)Bt.fromBufferAttribute(o,c),l&&(Xi.fromBufferAttribute(e,c),Bt.add(Xi)),r=Math.max(r,i.distanceToSquared(Bt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&Et('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Et("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new bn(new Float32Array(4*i.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let z=0;z<i.count;z++)o[z]=new k,l[z]=new k;const c=new k,f=new k,d=new k,u=new $e,h=new $e,_=new $e,M=new k,m=new k;function p(z,b,g){c.fromBufferAttribute(i,z),f.fromBufferAttribute(i,b),d.fromBufferAttribute(i,g),u.fromBufferAttribute(s,z),h.fromBufferAttribute(s,b),_.fromBufferAttribute(s,g),f.sub(c),d.sub(c),h.sub(u),_.sub(u);const A=1/(h.x*_.y-_.x*h.y);isFinite(A)&&(M.copy(f).multiplyScalar(_.y).addScaledVector(d,-h.y).multiplyScalar(A),m.copy(d).multiplyScalar(h.x).addScaledVector(f,-_.x).multiplyScalar(A),o[z].add(M),o[b].add(M),o[g].add(M),l[z].add(m),l[b].add(m),l[g].add(m))}let y=this.groups;y.length===0&&(y=[{start:0,count:e.count}]);for(let z=0,b=y.length;z<b;++z){const g=y[z],A=g.start,U=g.count;for(let R=A,Y=A+U;R<Y;R+=3)p(e.getX(R+0),e.getX(R+1),e.getX(R+2))}const S=new k,T=new k,C=new k,E=new k;function L(z){C.fromBufferAttribute(r,z),E.copy(C);const b=o[z];S.copy(b),S.sub(C.multiplyScalar(C.dot(b))).normalize(),T.crossVectors(E,b);const A=T.dot(l[z])<0?-1:1;a.setXYZW(z,S.x,S.y,S.z,A)}for(let z=0,b=y.length;z<b;++z){const g=y[z],A=g.start,U=g.count;for(let R=A,Y=A+U;R<Y;R+=3)L(e.getX(R+0)),L(e.getX(R+1)),L(e.getX(R+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new bn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let u=0,h=i.count;u<h;u++)i.setXYZ(u,0,0,0);const r=new k,s=new k,a=new k,o=new k,l=new k,c=new k,f=new k,d=new k;if(e)for(let u=0,h=e.count;u<h;u+=3){const _=e.getX(u+0),M=e.getX(u+1),m=e.getX(u+2);r.fromBufferAttribute(t,_),s.fromBufferAttribute(t,M),a.fromBufferAttribute(t,m),f.subVectors(a,s),d.subVectors(r,s),f.cross(d),o.fromBufferAttribute(i,_),l.fromBufferAttribute(i,M),c.fromBufferAttribute(i,m),o.add(f),l.add(f),c.add(f),i.setXYZ(_,o.x,o.y,o.z),i.setXYZ(M,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,h=t.count;u<h;u+=3)r.fromBufferAttribute(t,u+0),s.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),f.subVectors(a,s),d.subVectors(r,s),f.cross(d),i.setXYZ(u+0,f.x,f.y,f.z),i.setXYZ(u+1,f.x,f.y,f.z),i.setXYZ(u+2,f.x,f.y,f.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Bt.fromBufferAttribute(e,t),Bt.normalize(),e.setXYZ(t,Bt.x,Bt.y,Bt.z)}toNonIndexed(){function e(o,l){const c=o.array,f=o.itemSize,d=o.normalized,u=new c.constructor(l.length*f);let h=0,_=0;for(let M=0,m=l.length;M<m;M++){o.isInterleavedBufferAttribute?h=l[M]*o.data.stride+o.offset:h=l[M]*f;for(let p=0;p<f;p++)u[_++]=c[h++]}return new bn(u,f,d)}if(this.index===null)return Ve("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Jt,i=this.index.array,r=this.attributes;for(const o in r){const l=r[o],c=e(l,i);t.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let f=0,d=c.length;f<d;f++){const u=c[f],h=e(u,i);l.push(h)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],f=[];for(let d=0,u=c.length;d<u;d++){const h=c[d];f.push(h.toJSON(e.data))}f.length>0&&(r[l]=f,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const c in r){const f=r[c];this.setAttribute(c,f.clone(t))}const s=e.morphAttributes;for(const c in s){const f=[],d=s[c];for(let u=0,h=d.length;u<h;u++)f.push(d[u].clone(t));this.morphAttributes[c]=f}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,f=a.length;c<f;c++){const d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Jc=new vt,_i=new pu,vs=new Qr,Qc=new k,Ms=new k,bs=new k,ys=new k,wa=new k,Ss=new k,el=new k,Es=new k;class yn extends It{constructor(e=new Jt,t=new xu){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){Ss.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const f=o[l],d=s[l];f!==0&&(wa.fromBufferAttribute(d,e),a?Ss.addScaledVector(wa,f):Ss.addScaledVector(wa.sub(t),f))}t.add(Ss)}return t}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),vs.copy(i.boundingSphere),vs.applyMatrix4(s),_i.copy(e.ray).recast(e.near),!(vs.containsPoint(_i.origin)===!1&&(_i.intersectSphere(vs,Qc)===null||_i.origin.distanceToSquared(Qc)>(e.far-e.near)**2))&&(Jc.copy(s).invert(),_i.copy(e.ray).applyMatrix4(Jc),!(i.boundingBox!==null&&_i.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,_i)))}_computeIntersections(e,t,i){let r;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,f=s.attributes.uv1,d=s.attributes.normal,u=s.groups,h=s.drawRange;if(o!==null)if(Array.isArray(a))for(let _=0,M=u.length;_<M;_++){const m=u[_],p=a[m.materialIndex],y=Math.max(m.start,h.start),S=Math.min(o.count,Math.min(m.start+m.count,h.start+h.count));for(let T=y,C=S;T<C;T+=3){const E=o.getX(T),L=o.getX(T+1),z=o.getX(T+2);r=Ts(this,p,e,i,c,f,d,E,L,z),r&&(r.faceIndex=Math.floor(T/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const _=Math.max(0,h.start),M=Math.min(o.count,h.start+h.count);for(let m=_,p=M;m<p;m+=3){const y=o.getX(m),S=o.getX(m+1),T=o.getX(m+2);r=Ts(this,a,e,i,c,f,d,y,S,T),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let _=0,M=u.length;_<M;_++){const m=u[_],p=a[m.materialIndex],y=Math.max(m.start,h.start),S=Math.min(l.count,Math.min(m.start+m.count,h.start+h.count));for(let T=y,C=S;T<C;T+=3){const E=T,L=T+1,z=T+2;r=Ts(this,p,e,i,c,f,d,E,L,z),r&&(r.faceIndex=Math.floor(T/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const _=Math.max(0,h.start),M=Math.min(l.count,h.start+h.count);for(let m=_,p=M;m<p;m+=3){const y=m,S=m+1,T=m+2;r=Ts(this,a,e,i,c,f,d,y,S,T),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}}function Af(n,e,t,i,r,s,a,o){let l;if(e.side===tn?l=i.intersectTriangle(a,s,r,!0,o):l=i.intersectTriangle(r,s,a,e.side===li,o),l===null)return null;Es.copy(o),Es.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(Es);return c<t.near||c>t.far?null:{distance:c,point:Es.clone(),object:n}}function Ts(n,e,t,i,r,s,a,o,l,c){n.getVertexPosition(o,Ms),n.getVertexPosition(l,bs),n.getVertexPosition(c,ys);const f=Af(n,e,t,i,Ms,bs,ys,el);if(f){const d=new k;_n.getBarycoord(el,Ms,bs,ys,d),r&&(f.uv=_n.getInterpolatedAttribute(r,o,l,c,d,new $e)),s&&(f.uv1=_n.getInterpolatedAttribute(s,o,l,c,d,new $e)),a&&(f.normal=_n.getInterpolatedAttribute(a,o,l,c,d,new k),f.normal.dot(i.direction)>0&&f.normal.multiplyScalar(-1));const u={a:o,b:l,c,normal:new k,materialIndex:0};_n.getNormal(Ms,bs,ys,u.normal),f.face=u,f.barycoord=d}return f}class gr extends Jt{constructor(e=1,t=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],f=[],d=[];let u=0,h=0;_("z","y","x",-1,-1,i,t,e,a,s,0),_("z","y","x",1,-1,i,t,-e,a,s,1),_("x","z","y",1,1,e,i,t,r,a,2),_("x","z","y",1,-1,e,i,-t,r,a,3),_("x","y","z",1,-1,e,t,i,r,s,4),_("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new gt(c,3)),this.setAttribute("normal",new gt(f,3)),this.setAttribute("uv",new gt(d,2));function _(M,m,p,y,S,T,C,E,L,z,b){const g=T/L,A=C/z,U=T/2,R=C/2,Y=E/2,q=L+1,j=z+1;let ie=0,X=0;const ae=new k;for(let fe=0;fe<j;fe++){const De=fe*A-R;for(let je=0;je<q;je++){const ot=je*g-U;ae[M]=ot*y,ae[m]=De*S,ae[p]=Y,c.push(ae.x,ae.y,ae.z),ae[M]=0,ae[m]=0,ae[p]=E>0?1:-1,f.push(ae.x,ae.y,ae.z),d.push(je/L),d.push(1-fe/z),ie+=1}}for(let fe=0;fe<z;fe++)for(let De=0;De<L;De++){const je=u+De+q*fe,ot=u+De+q*(fe+1),nt=u+(De+1)+q*(fe+1),ht=u+(De+1)+q*fe;l.push(je,ot,ht),l.push(ot,nt,ht),X+=6}o.addGroup(h,X,b),h+=X,u+=ie}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new gr(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function dr(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(Ve("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone():Array.isArray(r)?e[t][i]=r.slice():e[t][i]=r}}return e}function Kt(n){const e={};for(let t=0;t<n.length;t++){const i=dr(n[t]);for(const r in i)e[r]=i[r]}return e}function Rf(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function vu(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:st.workingColorSpace}const Cf={clone:dr,merge:Kt};var Pf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Lf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Wn extends es{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Pf,this.fragmentShader=Lf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=dr(e.uniforms),this.uniformsGroups=Rf(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class Mu extends It{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new vt,this.projectionMatrix=new vt,this.projectionMatrixInverse=new vt,this.coordinateSystem=Tn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const ei=new k,tl=new $e,nl=new $e;class en extends Mu{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=ur*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Br*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ur*2*Math.atan(Math.tan(Br*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){ei.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ei.x,ei.y).multiplyScalar(-e/ei.z),ei.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(ei.x,ei.y).multiplyScalar(-e/ei.z)}getViewSize(e,t){return this.getViewBounds(e,tl,nl),t.subVectors(nl,tl)}setViewOffset(e,t,i,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Br*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,t-=a.offsetY*i/c,r*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const qi=-90,Yi=1;class Df extends It{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new en(qi,Yi,e,t);r.layers=this.layers,this.add(r);const s=new en(qi,Yi,e,t);s.layers=this.layers,this.add(s);const a=new en(qi,Yi,e,t);a.layers=this.layers,this.add(a);const o=new en(qi,Yi,e,t);o.layers=this.layers,this.add(o);const l=new en(qi,Yi,e,t);l.layers=this.layers,this.add(l);const c=new en(qi,Yi,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,a,o,l]=t;for(const c of t)this.remove(c);if(e===Tn)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===ks)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,f]=this.children,d=e.getRenderTarget(),u=e.getActiveCubeFace(),h=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const M=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(t,s),e.setRenderTarget(i,1,r),e.render(t,a),e.setRenderTarget(i,2,r),e.render(t,o),e.setRenderTarget(i,3,r),e.render(t,l),e.setRenderTarget(i,4,r),e.render(t,c),i.texture.generateMipmaps=M,e.setRenderTarget(i,5,r),e.render(t,f),e.setRenderTarget(d,u,h),e.xr.enabled=_,i.texture.needsPMREMUpdate=!0}}class bu extends Zt{constructor(e=[],t=or,i,r,s,a,o,l,c,f){super(e,t,i,r,s,a,o,l,c,f),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class If extends Ci{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new bu(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new gr(5,5,5),s=new Wn({name:"CubemapFromEquirect",uniforms:dr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:tn,blending:Gn});s.uniforms.tEquirect.value=t;const a=new yn(r,s),o=t.minFilter;return t.minFilter===Ei&&(t.minFilter=hn),new Df(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,r);e.setRenderTarget(s)}}class rt extends It{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Uf={type:"move"};class Aa{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new rt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new rt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new k,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new k),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new rt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new k,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new k),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const M of e.hand.values()){const m=t.getJointPose(M,i),p=this._getHandJoint(c,M);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const f=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=f.position.distanceTo(d.position),h=.02,_=.005;c.inputState.pinching&&u>h+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=h-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Uf)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new rt;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class Gs{constructor(e,t=1,i=1e3){this.isFog=!0,this.name="",this.color=new Qe(e),this.near=t,this.far=i}clone(){return new Gs(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class il extends It{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Cn,this.environmentIntensity=1,this.environmentRotation=new Cn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class yu extends Zt{constructor(e=null,t=1,i=1,r,s,a,o,l,c=un,f=un,d,u){super(null,a,o,l,c,f,r,s,d,u),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class rl extends bn{constructor(e,t,i,r=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const $i=new vt,sl=new vt,ws=[],al=new Pi,Nf=new vt,Cr=new yn,Pr=new Qr;class Ra extends yn{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new rl(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<i;r++)this.setMatrixAt(r,Nf)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Pi),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,$i),al.copy(e.boundingBox).applyMatrix4($i),this.boundingBox.union(al)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Qr),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,$i),Pr.copy(e.boundingSphere).applyMatrix4($i),this.boundingSphere.union(Pr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const i=t.morphTargetInfluences,r=this.morphTexture.source.data.data,s=i.length+1,a=e*s+1;for(let o=0;o<i.length;o++)i[o]=r[a+o]}raycast(e,t){const i=this.matrixWorld,r=this.count;if(Cr.geometry=this.geometry,Cr.material=this.material,Cr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Pr.copy(this.boundingSphere),Pr.applyMatrix4(i),e.ray.intersectsSphere(Pr)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,$i),sl.multiplyMatrices(i,$i),Cr.matrixWorld=sl,Cr.raycast(e,ws);for(let a=0,o=ws.length;a<o;a++){const l=ws[a];l.instanceId=s,l.object=this,t.push(l)}ws.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new rl(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const i=t.morphTargetInfluences,r=i.length+1;this.morphTexture===null&&(this.morphTexture=new yu(new Float32Array(r*this.count),r,this.count,jo,En));const s=this.morphTexture.source.data.data;let a=0;for(let c=0;c<i.length;c++)a+=i[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=r*e;s[l]=o,s.set(i,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Ca=new k,Ff=new k,Of=new He;class ti{constructor(e=new k(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=Ca.subVectors(i,t).cross(Ff.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(Ca),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||Of.getNormalMatrix(e),r=this.coplanarPoint(Ca).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const vi=new Qr,Bf=new $e(.5,.5),As=new k;class ic{constructor(e=new ti,t=new ti,i=new ti,r=new ti,s=new ti,a=new ti){this.planes=[e,t,i,r,s,a]}set(e,t,i,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Tn,i=!1){const r=this.planes,s=e.elements,a=s[0],o=s[1],l=s[2],c=s[3],f=s[4],d=s[5],u=s[6],h=s[7],_=s[8],M=s[9],m=s[10],p=s[11],y=s[12],S=s[13],T=s[14],C=s[15];if(r[0].setComponents(c-a,h-f,p-_,C-y).normalize(),r[1].setComponents(c+a,h+f,p+_,C+y).normalize(),r[2].setComponents(c+o,h+d,p+M,C+S).normalize(),r[3].setComponents(c-o,h-d,p-M,C-S).normalize(),i)r[4].setComponents(l,u,m,T).normalize(),r[5].setComponents(c-l,h-u,p-m,C-T).normalize();else if(r[4].setComponents(c-l,h-u,p-m,C-T).normalize(),t===Tn)r[5].setComponents(c+l,h+u,p+m,C+T).normalize();else if(t===ks)r[5].setComponents(l,u,m,T).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),vi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),vi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(vi)}intersectsSprite(e){vi.center.set(0,0,0);const t=Bf.distanceTo(e.center);return vi.radius=.7071067811865476+t,vi.applyMatrix4(e.matrixWorld),this.intersectsSphere(vi)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(As.x=r.normal.x>0?e.max.x:e.min.x,As.y=r.normal.y>0?e.max.y:e.min.y,As.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(As)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Su extends Zt{constructor(e,t,i=Ri,r,s,a,o=un,l=un,c,f=qr,d=1){if(f!==qr&&f!==Yr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:e,height:t,depth:d};super(u,r,s,a,o,l,f,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new tc(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Eu extends Zt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class rc extends Jt{constructor(e=1,t=1,i=4,r=8,s=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:i,radialSegments:r,heightSegments:s},t=Math.max(0,t),i=Math.max(1,Math.floor(i)),r=Math.max(3,Math.floor(r)),s=Math.max(1,Math.floor(s));const a=[],o=[],l=[],c=[],f=t/2,d=Math.PI/2*e,u=t,h=2*d+u,_=i*2+s,M=r+1,m=new k,p=new k;for(let y=0;y<=_;y++){let S=0,T=0,C=0,E=0;if(y<=i){const b=y/i,g=b*Math.PI/2;T=-f-e*Math.cos(g),C=e*Math.sin(g),E=-e*Math.cos(g),S=b*d}else if(y<=i+s){const b=(y-i)/s;T=-f+b*t,C=e,E=0,S=d+b*u}else{const b=(y-i-s)/i,g=b*Math.PI/2;T=f+e*Math.sin(g),C=e*Math.cos(g),E=e*Math.sin(g),S=d+u+b*d}const L=Math.max(0,Math.min(1,S/h));let z=0;y===0?z=.5/r:y===_&&(z=-.5/r);for(let b=0;b<=r;b++){const g=b/r,A=g*Math.PI*2,U=Math.sin(A),R=Math.cos(A);p.x=-C*R,p.y=T,p.z=C*U,o.push(p.x,p.y,p.z),m.set(-C*R,E,C*U),m.normalize(),l.push(m.x,m.y,m.z),c.push(g+z,L)}if(y>0){const b=(y-1)*M;for(let g=0;g<r;g++){const A=b+g,U=b+g+1,R=y*M+g,Y=y*M+g+1;a.push(A,U,R),a.push(U,Y,R)}}}this.setIndex(a),this.setAttribute("position",new gt(o,3)),this.setAttribute("normal",new gt(l,3)),this.setAttribute("uv",new gt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new rc(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}}class Hs extends Jt{constructor(e=1,t=32,i=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:r},t=Math.max(3,t);const s=[],a=[],o=[],l=[],c=new k,f=new $e;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let d=0,u=3;d<=t;d++,u+=3){const h=i+d/t*r;c.x=e*Math.cos(h),c.y=e*Math.sin(h),a.push(c.x,c.y,c.z),o.push(0,0,1),f.x=(a[u]/e+1)/2,f.y=(a[u+1]/e+1)/2,l.push(f.x,f.y)}for(let d=1;d<=t;d++)s.push(d,d+1,0);this.setIndex(s),this.setAttribute("position",new gt(a,3)),this.setAttribute("normal",new gt(o,3)),this.setAttribute("uv",new gt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Hs(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Rt extends Jt{constructor(e=1,t=1,i=1,r=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const f=[],d=[],u=[],h=[];let _=0;const M=[],m=i/2;let p=0;y(),a===!1&&(e>0&&S(!0),t>0&&S(!1)),this.setIndex(f),this.setAttribute("position",new gt(d,3)),this.setAttribute("normal",new gt(u,3)),this.setAttribute("uv",new gt(h,2));function y(){const T=new k,C=new k;let E=0;const L=(t-e)/i;for(let z=0;z<=s;z++){const b=[],g=z/s,A=g*(t-e)+e;for(let U=0;U<=r;U++){const R=U/r,Y=R*l+o,q=Math.sin(Y),j=Math.cos(Y);C.x=A*q,C.y=-g*i+m,C.z=A*j,d.push(C.x,C.y,C.z),T.set(q,L,j).normalize(),u.push(T.x,T.y,T.z),h.push(R,1-g),b.push(_++)}M.push(b)}for(let z=0;z<r;z++)for(let b=0;b<s;b++){const g=M[b][z],A=M[b+1][z],U=M[b+1][z+1],R=M[b][z+1];(e>0||b!==0)&&(f.push(g,A,R),E+=3),(t>0||b!==s-1)&&(f.push(A,U,R),E+=3)}c.addGroup(p,E,0),p+=E}function S(T){const C=_,E=new $e,L=new k;let z=0;const b=T===!0?e:t,g=T===!0?1:-1;for(let U=1;U<=r;U++)d.push(0,m*g,0),u.push(0,g,0),h.push(.5,.5),_++;const A=_;for(let U=0;U<=r;U++){const Y=U/r*l+o,q=Math.cos(Y),j=Math.sin(Y);L.x=b*j,L.y=m*g,L.z=b*q,d.push(L.x,L.y,L.z),u.push(0,g,0),E.x=q*.5+.5,E.y=j*.5*g+.5,h.push(E.x,E.y),_++}for(let U=0;U<r;U++){const R=C+U,Y=A+U;T===!0?f.push(Y,Y+1,R):f.push(Y+1,Y,R),z+=3}c.addGroup(p,z,T===!0?1:2),p+=z}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Rt(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class fn extends Rt{constructor(e=1,t=1,i=32,r=1,s=!1,a=0,o=Math.PI*2){super(0,e,t,i,r,s,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:r,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(e){return new fn(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class sc extends Jt{constructor(e=[],t=[],i=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:r};const s=[],a=[];o(r),c(i),f(),this.setAttribute("position",new gt(s,3)),this.setAttribute("normal",new gt(s.slice(),3)),this.setAttribute("uv",new gt(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(y){const S=new k,T=new k,C=new k;for(let E=0;E<t.length;E+=3)h(t[E+0],S),h(t[E+1],T),h(t[E+2],C),l(S,T,C,y)}function l(y,S,T,C){const E=C+1,L=[];for(let z=0;z<=E;z++){L[z]=[];const b=y.clone().lerp(T,z/E),g=S.clone().lerp(T,z/E),A=E-z;for(let U=0;U<=A;U++)U===0&&z===E?L[z][U]=b:L[z][U]=b.clone().lerp(g,U/A)}for(let z=0;z<E;z++)for(let b=0;b<2*(E-z)-1;b++){const g=Math.floor(b/2);b%2===0?(u(L[z][g+1]),u(L[z+1][g]),u(L[z][g])):(u(L[z][g+1]),u(L[z+1][g+1]),u(L[z+1][g]))}}function c(y){const S=new k;for(let T=0;T<s.length;T+=3)S.x=s[T+0],S.y=s[T+1],S.z=s[T+2],S.normalize().multiplyScalar(y),s[T+0]=S.x,s[T+1]=S.y,s[T+2]=S.z}function f(){const y=new k;for(let S=0;S<s.length;S+=3){y.x=s[S+0],y.y=s[S+1],y.z=s[S+2];const T=m(y)/2/Math.PI+.5,C=p(y)/Math.PI+.5;a.push(T,1-C)}_(),d()}function d(){for(let y=0;y<a.length;y+=6){const S=a[y+0],T=a[y+2],C=a[y+4],E=Math.max(S,T,C),L=Math.min(S,T,C);E>.9&&L<.1&&(S<.2&&(a[y+0]+=1),T<.2&&(a[y+2]+=1),C<.2&&(a[y+4]+=1))}}function u(y){s.push(y.x,y.y,y.z)}function h(y,S){const T=y*3;S.x=e[T+0],S.y=e[T+1],S.z=e[T+2]}function _(){const y=new k,S=new k,T=new k,C=new k,E=new $e,L=new $e,z=new $e;for(let b=0,g=0;b<s.length;b+=9,g+=6){y.set(s[b+0],s[b+1],s[b+2]),S.set(s[b+3],s[b+4],s[b+5]),T.set(s[b+6],s[b+7],s[b+8]),E.set(a[g+0],a[g+1]),L.set(a[g+2],a[g+3]),z.set(a[g+4],a[g+5]),C.copy(y).add(S).add(T).divideScalar(3);const A=m(C);M(E,g+0,y,A),M(L,g+2,S,A),M(z,g+4,T,A)}}function M(y,S,T,C){C<0&&y.x===1&&(a[S]=y.x-1),T.x===0&&T.z===0&&(a[S]=C/2/Math.PI+.5)}function m(y){return Math.atan2(y.z,-y.x)}function p(y){return Math.atan2(-y.y,Math.sqrt(y.x*y.x+y.z*y.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new sc(e.vertices,e.indices,e.radius,e.details)}}class kr extends sc{constructor(e=1,t=0){const i=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],r=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(i,r,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new kr(e.radius,e.detail)}}class Js extends Jt{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(i),l=Math.floor(r),c=o+1,f=l+1,d=e/o,u=t/l,h=[],_=[],M=[],m=[];for(let p=0;p<f;p++){const y=p*u-a;for(let S=0;S<c;S++){const T=S*d-s;_.push(T,-y,0),M.push(0,0,1),m.push(S/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let y=0;y<o;y++){const S=y+c*p,T=y+c*(p+1),C=y+1+c*(p+1),E=y+1+c*p;h.push(S,T,E),h.push(T,C,E)}this.setIndex(h),this.setAttribute("position",new gt(_,3)),this.setAttribute("normal",new gt(M,3)),this.setAttribute("uv",new gt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Js(e.width,e.height,e.widthSegments,e.heightSegments)}}class ac extends Jt{constructor(e=.5,t=1,i=32,r=1,s=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:r,thetaStart:s,thetaLength:a},i=Math.max(3,i),r=Math.max(1,r);const o=[],l=[],c=[],f=[];let d=e;const u=(t-e)/r,h=new k,_=new $e;for(let M=0;M<=r;M++){for(let m=0;m<=i;m++){const p=s+m/i*a;h.x=d*Math.cos(p),h.y=d*Math.sin(p),l.push(h.x,h.y,h.z),c.push(0,0,1),_.x=(h.x/t+1)/2,_.y=(h.y/t+1)/2,f.push(_.x,_.y)}d+=u}for(let M=0;M<r;M++){const m=M*(i+1);for(let p=0;p<i;p++){const y=p+m,S=y,T=y+i+1,C=y+i+2,E=y+1;o.push(S,T,E),o.push(T,C,E)}}this.setIndex(o),this.setAttribute("position",new gt(l,3)),this.setAttribute("normal",new gt(c,3)),this.setAttribute("uv",new gt(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ac(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class oc extends Jt{constructor(e=1,t=32,i=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(a+o,Math.PI);let c=0;const f=[],d=new k,u=new k,h=[],_=[],M=[],m=[];for(let p=0;p<=i;p++){const y=[],S=p/i;let T=0;p===0&&a===0?T=.5/t:p===i&&l===Math.PI&&(T=-.5/t);for(let C=0;C<=t;C++){const E=C/t;d.x=-e*Math.cos(r+E*s)*Math.sin(a+S*o),d.y=e*Math.cos(a+S*o),d.z=e*Math.sin(r+E*s)*Math.sin(a+S*o),_.push(d.x,d.y,d.z),u.copy(d).normalize(),M.push(u.x,u.y,u.z),m.push(E+T,1-S),y.push(c++)}f.push(y)}for(let p=0;p<i;p++)for(let y=0;y<t;y++){const S=f[p][y+1],T=f[p][y],C=f[p+1][y],E=f[p+1][y+1];(p!==0||a>0)&&h.push(S,T,E),(p!==i-1||l<Math.PI)&&h.push(T,C,E)}this.setIndex(h),this.setAttribute("position",new gt(_,3)),this.setAttribute("normal",new gt(M,3)),this.setAttribute("uv",new gt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new oc(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class ni extends Jt{constructor(e=1,t=.4,i=12,r=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:r,arc:s},i=Math.floor(i),r=Math.floor(r);const a=[],o=[],l=[],c=[],f=new k,d=new k,u=new k;for(let h=0;h<=i;h++)for(let _=0;_<=r;_++){const M=_/r*s,m=h/i*Math.PI*2;d.x=(e+t*Math.cos(m))*Math.cos(M),d.y=(e+t*Math.cos(m))*Math.sin(M),d.z=t*Math.sin(m),o.push(d.x,d.y,d.z),f.x=e*Math.cos(M),f.y=e*Math.sin(M),u.subVectors(d,f).normalize(),l.push(u.x,u.y,u.z),c.push(_/r),c.push(h/i)}for(let h=1;h<=i;h++)for(let _=1;_<=r;_++){const M=(r+1)*h+_-1,m=(r+1)*(h-1)+_-1,p=(r+1)*(h-1)+_,y=(r+1)*h+_;a.push(M,m,y),a.push(m,p,y)}this.setIndex(a),this.setAttribute("position",new gt(o,3)),this.setAttribute("normal",new gt(l,3)),this.setAttribute("uv",new gt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ni(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class zf extends es{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Qe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Qe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=uu,this.normalScale=new $e(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Cn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class kf extends es{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Fd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Vf extends es{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Qs extends It{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Qe(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class ol extends Qs{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(It.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Qe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Pa=new vt,cl=new k,ll=new k;class cc{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new $e(512,512),this.mapType=Rn,this.map=null,this.mapPass=null,this.matrix=new vt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ic,this._frameExtents=new $e(1,1),this._viewportCount=1,this._viewports=[new xt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;cl.setFromMatrixPosition(e.matrixWorld),t.position.copy(cl),ll.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(ll),t.updateMatrixWorld(),Pa.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Pa,t.coordinateSystem,t.reversedDepth),t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Pa)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class Gf extends cc{constructor(){super(new en(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,i=ur*2*e.angle*this.focus,r=this.mapSize.width/this.mapSize.height*this.aspect,s=e.distance||t.far;(i!==t.fov||r!==t.aspect||s!==t.far)&&(t.fov=i,t.aspect=r,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class Hf extends Qs{constructor(e,t,i=0,r=Math.PI/3,s=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(It.DEFAULT_UP),this.updateMatrix(),this.target=new It,this.distance=i,this.angle=r,this.penumbra=s,this.decay=a,this.map=null,this.shadow=new Gf}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const ul=new vt,Lr=new k,La=new k;class Wf extends cc{constructor(){super(new en(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new $e(4,2),this._viewportCount=6,this._viewports=[new xt(2,1,1,1),new xt(0,1,1,1),new xt(3,1,1,1),new xt(1,1,1,1),new xt(3,0,1,1),new xt(1,0,1,1)],this._cubeDirections=[new k(1,0,0),new k(-1,0,0),new k(0,0,1),new k(0,0,-1),new k(0,1,0),new k(0,-1,0)],this._cubeUps=[new k(0,1,0),new k(0,1,0),new k(0,1,0),new k(0,1,0),new k(0,0,1),new k(0,0,-1)]}updateMatrices(e,t=0){const i=this.camera,r=this.matrix,s=e.distance||i.far;s!==i.far&&(i.far=s,i.updateProjectionMatrix()),Lr.setFromMatrixPosition(e.matrixWorld),i.position.copy(Lr),La.copy(i.position),La.add(this._cubeDirections[t]),i.up.copy(this._cubeUps[t]),i.lookAt(La),i.updateMatrixWorld(),r.makeTranslation(-Lr.x,-Lr.y,-Lr.z),ul.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ul,i.coordinateSystem,i.reversedDepth)}}class Dr extends Qs{constructor(e,t,i=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=r,this.shadow=new Wf}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class lc extends Mu{constructor(e=-1,t=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,a=i+e,o=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,f=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=f*this.view.offsetY,l=o-f*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Xf extends cc{constructor(){super(new lc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Da extends Qs{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(It.DEFAULT_UP),this.updateMatrix(),this.target=new It,this.shadow=new Xf}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class qf extends en{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const dl=new vt;class Yf{constructor(e,t,i=0,r=1/0){this.ray=new pu(e,t),this.near=i,this.far=r,this.camera=null,this.layers=new nc,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Et("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return dl.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(dl),this}intersectObject(e,t=!0,i=[]){return Lo(e,this,i,t),i.sort(fl),i}intersectObjects(e,t=!0,i=[]){for(let r=0,s=e.length;r<s;r++)Lo(e[r],this,i,t);return i.sort(fl),i}}function fl(n,e){return n.distance-e.distance}function Lo(n,e,t,i){let r=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(r=!1),r===!0&&i===!0){const s=n.children;for(let a=0,o=s.length;a<o;a++)Lo(s[a],e,t,!0)}}function hl(n,e,t,i){const r=$f(i);switch(t){case cu:return n*e;case jo:return n*e/r.components*r.byteLength;case Ko:return n*e/r.components*r.byteLength;case Zo:return n*e*2/r.components*r.byteLength;case Jo:return n*e*2/r.components*r.byteLength;case lu:return n*e*3/r.components*r.byteLength;case vn:return n*e*4/r.components*r.byteLength;case Qo:return n*e*4/r.components*r.byteLength;case Ps:case Ls:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Ds:case Is:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case io:case so:return Math.max(n,16)*Math.max(e,8)/4;case no:case ro:return Math.max(n,8)*Math.max(e,8)/2;case ao:case oo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case co:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case lo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case uo:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case fo:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case ho:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case po:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case mo:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case xo:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case go:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case _o:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case vo:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Mo:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case bo:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case yo:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case So:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Eo:case To:case wo:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Ao:case Ro:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Co:case Po:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function $f(n){switch(n){case Rn:case ru:return{byteLength:1,components:1};case Wr:case su:case pr:return{byteLength:2,components:1};case Yo:case $o:return{byteLength:2,components:4};case Ri:case qo:case En:return{byteLength:4,components:1};case au:case ou:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Xo}}));typeof window<"u"&&(window.__THREE__?Ve("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Xo);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Tu(){let n=null,e=!1,t=null,i=null;function r(s,a){t(s,a),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function jf(n){const e=new WeakMap;function t(o,l){const c=o.array,f=o.usage,d=c.byteLength,u=n.createBuffer();n.bindBuffer(l,u),n.bufferData(l,c,f),o.onUploadCallback();let h;if(c instanceof Float32Array)h=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)h=n.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?h=n.HALF_FLOAT:h=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)h=n.SHORT;else if(c instanceof Uint32Array)h=n.UNSIGNED_INT;else if(c instanceof Int32Array)h=n.INT;else if(c instanceof Int8Array)h=n.BYTE;else if(c instanceof Uint8Array)h=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)h=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:h,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function i(o,l,c){const f=l.array,d=l.updateRanges;if(n.bindBuffer(c,o),d.length===0)n.bufferSubData(c,0,f);else{d.sort((h,_)=>h.start-_.start);let u=0;for(let h=1;h<d.length;h++){const _=d[u],M=d[h];M.start<=_.start+_.count+1?_.count=Math.max(_.count,M.start+M.count-_.start):(++u,d[u]=M)}d.length=u+1;for(let h=0,_=d.length;h<_;h++){const M=d[h];n.bufferSubData(c,M.start*f.BYTES_PER_ELEMENT,f,M.start,M.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(n.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const f=e.get(o);(!f||f.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:r,remove:s,update:a}}var Kf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Zf=`#ifdef USE_ALPHAHASH
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
#endif`,Jf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Qf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,eh=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,th=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,nh=`#ifdef USE_AOMAP
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
#endif`,ih=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,rh=`#ifdef USE_BATCHING
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
#endif`,sh=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,ah=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,oh=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,ch=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,lh=`#ifdef USE_IRIDESCENCE
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
#endif`,uh=`#ifdef USE_BUMPMAP
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
#endif`,dh=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,fh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,hh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,ph=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,mh=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,xh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,gh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,_h=`#if defined( USE_COLOR_ALPHA )
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
#endif`,vh=`#define PI 3.141592653589793
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
} // validated`,Mh=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,bh=`vec3 transformedNormal = objectNormal;
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
#endif`,yh=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Sh=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Eh=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Th=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,wh="gl_FragColor = linearToOutputTexel( gl_FragColor );",Ah=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Rh=`#ifdef USE_ENVMAP
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
#endif`,Ch=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Ph=`#ifdef USE_ENVMAP
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
#endif`,Lh=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Dh=`#ifdef USE_ENVMAP
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
#endif`,Ih=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Uh=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Nh=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Fh=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Oh=`#ifdef USE_GRADIENTMAP
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
}`,Bh=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,zh=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,kh=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Vh=`uniform bool receiveShadow;
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
#endif`,Gh=`#ifdef USE_ENVMAP
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
#endif`,Hh=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Wh=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Xh=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,qh=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Yh=`PhysicalMaterial material;
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
#endif`,$h=`uniform sampler2D dfgLUT;
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
}`,jh=`
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
#endif`,Kh=`#if defined( RE_IndirectDiffuse )
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
#endif`,Zh=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Jh=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Qh=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ep=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,tp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,np=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,ip=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,rp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,sp=`#if defined( USE_POINTS_UV )
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
#endif`,ap=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,op=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,cp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,lp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,up=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,dp=`#ifdef USE_MORPHTARGETS
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
#endif`,fp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,hp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,pp=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,mp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,xp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,gp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,_p=`#ifdef USE_NORMALMAP
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
#endif`,vp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Mp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,bp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,yp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Sp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Ep=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Tp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,wp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Ap=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Rp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Cp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Pp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Lp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Dp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Ip=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Up=`float getShadowMask() {
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
}`,Np=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Fp=`#ifdef USE_SKINNING
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
#endif`,Op=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Bp=`#ifdef USE_SKINNING
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
#endif`,zp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,kp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Vp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Gp=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Hp=`#ifdef USE_TRANSMISSION
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
#endif`,Wp=`#ifdef USE_TRANSMISSION
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
#endif`,Xp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,qp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Yp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,$p=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const jp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Kp=`uniform sampler2D t2D;
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
}`,Zp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Jp=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Qp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,e0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,t0=`#include <common>
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
}`,n0=`#if DEPTH_PACKING == 3200
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
}`,i0=`#define DISTANCE
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
}`,r0=`#define DISTANCE
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
}`,s0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,a0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,o0=`uniform float scale;
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
}`,c0=`uniform vec3 diffuse;
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
}`,l0=`#include <common>
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
}`,u0=`uniform vec3 diffuse;
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
}`,d0=`#define LAMBERT
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
}`,f0=`#define LAMBERT
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
}`,h0=`#define MATCAP
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
}`,p0=`#define MATCAP
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
}`,m0=`#define NORMAL
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
}`,x0=`#define NORMAL
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
}`,g0=`#define PHONG
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
}`,_0=`#define PHONG
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
}`,v0=`#define STANDARD
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
}`,M0=`#define STANDARD
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
}`,b0=`#define TOON
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
}`,y0=`#define TOON
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
}`,S0=`uniform float size;
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
}`,E0=`uniform vec3 diffuse;
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
}`,T0=`#include <common>
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
}`,w0=`uniform vec3 color;
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
}`,A0=`uniform float rotation;
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
}`,R0=`uniform vec3 diffuse;
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
}`,Xe={alphahash_fragment:Kf,alphahash_pars_fragment:Zf,alphamap_fragment:Jf,alphamap_pars_fragment:Qf,alphatest_fragment:eh,alphatest_pars_fragment:th,aomap_fragment:nh,aomap_pars_fragment:ih,batching_pars_vertex:rh,batching_vertex:sh,begin_vertex:ah,beginnormal_vertex:oh,bsdfs:ch,iridescence_fragment:lh,bumpmap_pars_fragment:uh,clipping_planes_fragment:dh,clipping_planes_pars_fragment:fh,clipping_planes_pars_vertex:hh,clipping_planes_vertex:ph,color_fragment:mh,color_pars_fragment:xh,color_pars_vertex:gh,color_vertex:_h,common:vh,cube_uv_reflection_fragment:Mh,defaultnormal_vertex:bh,displacementmap_pars_vertex:yh,displacementmap_vertex:Sh,emissivemap_fragment:Eh,emissivemap_pars_fragment:Th,colorspace_fragment:wh,colorspace_pars_fragment:Ah,envmap_fragment:Rh,envmap_common_pars_fragment:Ch,envmap_pars_fragment:Ph,envmap_pars_vertex:Lh,envmap_physical_pars_fragment:Gh,envmap_vertex:Dh,fog_vertex:Ih,fog_pars_vertex:Uh,fog_fragment:Nh,fog_pars_fragment:Fh,gradientmap_pars_fragment:Oh,lightmap_pars_fragment:Bh,lights_lambert_fragment:zh,lights_lambert_pars_fragment:kh,lights_pars_begin:Vh,lights_toon_fragment:Hh,lights_toon_pars_fragment:Wh,lights_phong_fragment:Xh,lights_phong_pars_fragment:qh,lights_physical_fragment:Yh,lights_physical_pars_fragment:$h,lights_fragment_begin:jh,lights_fragment_maps:Kh,lights_fragment_end:Zh,logdepthbuf_fragment:Jh,logdepthbuf_pars_fragment:Qh,logdepthbuf_pars_vertex:ep,logdepthbuf_vertex:tp,map_fragment:np,map_pars_fragment:ip,map_particle_fragment:rp,map_particle_pars_fragment:sp,metalnessmap_fragment:ap,metalnessmap_pars_fragment:op,morphinstance_vertex:cp,morphcolor_vertex:lp,morphnormal_vertex:up,morphtarget_pars_vertex:dp,morphtarget_vertex:fp,normal_fragment_begin:hp,normal_fragment_maps:pp,normal_pars_fragment:mp,normal_pars_vertex:xp,normal_vertex:gp,normalmap_pars_fragment:_p,clearcoat_normal_fragment_begin:vp,clearcoat_normal_fragment_maps:Mp,clearcoat_pars_fragment:bp,iridescence_pars_fragment:yp,opaque_fragment:Sp,packing:Ep,premultiplied_alpha_fragment:Tp,project_vertex:wp,dithering_fragment:Ap,dithering_pars_fragment:Rp,roughnessmap_fragment:Cp,roughnessmap_pars_fragment:Pp,shadowmap_pars_fragment:Lp,shadowmap_pars_vertex:Dp,shadowmap_vertex:Ip,shadowmask_pars_fragment:Up,skinbase_vertex:Np,skinning_pars_vertex:Fp,skinning_vertex:Op,skinnormal_vertex:Bp,specularmap_fragment:zp,specularmap_pars_fragment:kp,tonemapping_fragment:Vp,tonemapping_pars_fragment:Gp,transmission_fragment:Hp,transmission_pars_fragment:Wp,uv_pars_fragment:Xp,uv_pars_vertex:qp,uv_vertex:Yp,worldpos_vertex:$p,background_vert:jp,background_frag:Kp,backgroundCube_vert:Zp,backgroundCube_frag:Jp,cube_vert:Qp,cube_frag:e0,depth_vert:t0,depth_frag:n0,distanceRGBA_vert:i0,distanceRGBA_frag:r0,equirect_vert:s0,equirect_frag:a0,linedashed_vert:o0,linedashed_frag:c0,meshbasic_vert:l0,meshbasic_frag:u0,meshlambert_vert:d0,meshlambert_frag:f0,meshmatcap_vert:h0,meshmatcap_frag:p0,meshnormal_vert:m0,meshnormal_frag:x0,meshphong_vert:g0,meshphong_frag:_0,meshphysical_vert:v0,meshphysical_frag:M0,meshtoon_vert:b0,meshtoon_frag:y0,points_vert:S0,points_frag:E0,shadow_vert:T0,shadow_frag:w0,sprite_vert:A0,sprite_frag:R0},_e={common:{diffuse:{value:new Qe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new He}},envmap:{envMap:{value:null},envMapRotation:{value:new He},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new He}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new He}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new He},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new He},normalScale:{value:new $e(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new He},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new He}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new He}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new He}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Qe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Qe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0},uvTransform:{value:new He}},sprite:{diffuse:{value:new Qe(16777215)},opacity:{value:1},center:{value:new $e(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}}},Sn={basic:{uniforms:Kt([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.fog]),vertexShader:Xe.meshbasic_vert,fragmentShader:Xe.meshbasic_frag},lambert:{uniforms:Kt([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,_e.lights,{emissive:{value:new Qe(0)}}]),vertexShader:Xe.meshlambert_vert,fragmentShader:Xe.meshlambert_frag},phong:{uniforms:Kt([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,_e.lights,{emissive:{value:new Qe(0)},specular:{value:new Qe(1118481)},shininess:{value:30}}]),vertexShader:Xe.meshphong_vert,fragmentShader:Xe.meshphong_frag},standard:{uniforms:Kt([_e.common,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.roughnessmap,_e.metalnessmap,_e.fog,_e.lights,{emissive:{value:new Qe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag},toon:{uniforms:Kt([_e.common,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.gradientmap,_e.fog,_e.lights,{emissive:{value:new Qe(0)}}]),vertexShader:Xe.meshtoon_vert,fragmentShader:Xe.meshtoon_frag},matcap:{uniforms:Kt([_e.common,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,{matcap:{value:null}}]),vertexShader:Xe.meshmatcap_vert,fragmentShader:Xe.meshmatcap_frag},points:{uniforms:Kt([_e.points,_e.fog]),vertexShader:Xe.points_vert,fragmentShader:Xe.points_frag},dashed:{uniforms:Kt([_e.common,_e.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Xe.linedashed_vert,fragmentShader:Xe.linedashed_frag},depth:{uniforms:Kt([_e.common,_e.displacementmap]),vertexShader:Xe.depth_vert,fragmentShader:Xe.depth_frag},normal:{uniforms:Kt([_e.common,_e.bumpmap,_e.normalmap,_e.displacementmap,{opacity:{value:1}}]),vertexShader:Xe.meshnormal_vert,fragmentShader:Xe.meshnormal_frag},sprite:{uniforms:Kt([_e.sprite,_e.fog]),vertexShader:Xe.sprite_vert,fragmentShader:Xe.sprite_frag},background:{uniforms:{uvTransform:{value:new He},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Xe.background_vert,fragmentShader:Xe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new He}},vertexShader:Xe.backgroundCube_vert,fragmentShader:Xe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Xe.cube_vert,fragmentShader:Xe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Xe.equirect_vert,fragmentShader:Xe.equirect_frag},distanceRGBA:{uniforms:Kt([_e.common,_e.displacementmap,{referencePosition:{value:new k},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Xe.distanceRGBA_vert,fragmentShader:Xe.distanceRGBA_frag},shadow:{uniforms:Kt([_e.lights,_e.fog,{color:{value:new Qe(0)},opacity:{value:1}}]),vertexShader:Xe.shadow_vert,fragmentShader:Xe.shadow_frag}};Sn.physical={uniforms:Kt([Sn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new He},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new He},clearcoatNormalScale:{value:new $e(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new He},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new He},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new He},sheen:{value:0},sheenColor:{value:new Qe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new He},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new He},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new He},transmissionSamplerSize:{value:new $e},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new He},attenuationDistance:{value:0},attenuationColor:{value:new Qe(0)},specularColor:{value:new Qe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new He},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new He},anisotropyVector:{value:new $e},anisotropyMap:{value:null},anisotropyMapTransform:{value:new He}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag};const Rs={r:0,b:0,g:0},Mi=new Cn,C0=new vt;function P0(n,e,t,i,r,s,a){const o=new Qe(0);let l=s===!0?0:1,c,f,d=null,u=0,h=null;function _(S){let T=S.isScene===!0?S.background:null;return T&&T.isTexture&&(T=(S.backgroundBlurriness>0?t:e).get(T)),T}function M(S){let T=!1;const C=_(S);C===null?p(o,l):C&&C.isColor&&(p(C,1),T=!0);const E=n.xr.getEnvironmentBlendMode();E==="additive"?i.buffers.color.setClear(0,0,0,1,a):E==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(n.autoClear||T)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(S,T){const C=_(T);C&&(C.isCubeTexture||C.mapping===Zs)?(f===void 0&&(f=new yn(new gr(1,1,1),new Wn({name:"BackgroundCubeMaterial",uniforms:dr(Sn.backgroundCube.uniforms),vertexShader:Sn.backgroundCube.vertexShader,fragmentShader:Sn.backgroundCube.fragmentShader,side:tn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),f.geometry.deleteAttribute("normal"),f.geometry.deleteAttribute("uv"),f.onBeforeRender=function(E,L,z){this.matrixWorld.copyPosition(z.matrixWorld)},Object.defineProperty(f.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(f)),Mi.copy(T.backgroundRotation),Mi.x*=-1,Mi.y*=-1,Mi.z*=-1,C.isCubeTexture&&C.isRenderTargetTexture===!1&&(Mi.y*=-1,Mi.z*=-1),f.material.uniforms.envMap.value=C,f.material.uniforms.flipEnvMap.value=C.isCubeTexture&&C.isRenderTargetTexture===!1?-1:1,f.material.uniforms.backgroundBlurriness.value=T.backgroundBlurriness,f.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,f.material.uniforms.backgroundRotation.value.setFromMatrix4(C0.makeRotationFromEuler(Mi)),f.material.toneMapped=st.getTransfer(C.colorSpace)!==mt,(d!==C||u!==C.version||h!==n.toneMapping)&&(f.material.needsUpdate=!0,d=C,u=C.version,h=n.toneMapping),f.layers.enableAll(),S.unshift(f,f.geometry,f.material,0,0,null)):C&&C.isTexture&&(c===void 0&&(c=new yn(new Js(2,2),new Wn({name:"BackgroundMaterial",uniforms:dr(Sn.background.uniforms),vertexShader:Sn.background.vertexShader,fragmentShader:Sn.background.fragmentShader,side:li,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=C,c.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,c.material.toneMapped=st.getTransfer(C.colorSpace)!==mt,C.matrixAutoUpdate===!0&&C.updateMatrix(),c.material.uniforms.uvTransform.value.copy(C.matrix),(d!==C||u!==C.version||h!==n.toneMapping)&&(c.material.needsUpdate=!0,d=C,u=C.version,h=n.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null))}function p(S,T){S.getRGB(Rs,vu(n)),i.buffers.color.setClear(Rs.r,Rs.g,Rs.b,T,a)}function y(){f!==void 0&&(f.geometry.dispose(),f.material.dispose(),f=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(S,T=1){o.set(S),l=T,p(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(S){l=S,p(o,l)},render:M,addToRenderList:m,dispose:y}}function L0(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=u(null);let s=r,a=!1;function o(g,A,U,R,Y){let q=!1;const j=d(R,U,A);s!==j&&(s=j,c(s.object)),q=h(g,R,U,Y),q&&_(g,R,U,Y),Y!==null&&e.update(Y,n.ELEMENT_ARRAY_BUFFER),(q||a)&&(a=!1,T(g,A,U,R),Y!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(Y).buffer))}function l(){return n.createVertexArray()}function c(g){return n.bindVertexArray(g)}function f(g){return n.deleteVertexArray(g)}function d(g,A,U){const R=U.wireframe===!0;let Y=i[g.id];Y===void 0&&(Y={},i[g.id]=Y);let q=Y[A.id];q===void 0&&(q={},Y[A.id]=q);let j=q[R];return j===void 0&&(j=u(l()),q[R]=j),j}function u(g){const A=[],U=[],R=[];for(let Y=0;Y<t;Y++)A[Y]=0,U[Y]=0,R[Y]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:A,enabledAttributes:U,attributeDivisors:R,object:g,attributes:{},index:null}}function h(g,A,U,R){const Y=s.attributes,q=A.attributes;let j=0;const ie=U.getAttributes();for(const X in ie)if(ie[X].location>=0){const fe=Y[X];let De=q[X];if(De===void 0&&(X==="instanceMatrix"&&g.instanceMatrix&&(De=g.instanceMatrix),X==="instanceColor"&&g.instanceColor&&(De=g.instanceColor)),fe===void 0||fe.attribute!==De||De&&fe.data!==De.data)return!0;j++}return s.attributesNum!==j||s.index!==R}function _(g,A,U,R){const Y={},q=A.attributes;let j=0;const ie=U.getAttributes();for(const X in ie)if(ie[X].location>=0){let fe=q[X];fe===void 0&&(X==="instanceMatrix"&&g.instanceMatrix&&(fe=g.instanceMatrix),X==="instanceColor"&&g.instanceColor&&(fe=g.instanceColor));const De={};De.attribute=fe,fe&&fe.data&&(De.data=fe.data),Y[X]=De,j++}s.attributes=Y,s.attributesNum=j,s.index=R}function M(){const g=s.newAttributes;for(let A=0,U=g.length;A<U;A++)g[A]=0}function m(g){p(g,0)}function p(g,A){const U=s.newAttributes,R=s.enabledAttributes,Y=s.attributeDivisors;U[g]=1,R[g]===0&&(n.enableVertexAttribArray(g),R[g]=1),Y[g]!==A&&(n.vertexAttribDivisor(g,A),Y[g]=A)}function y(){const g=s.newAttributes,A=s.enabledAttributes;for(let U=0,R=A.length;U<R;U++)A[U]!==g[U]&&(n.disableVertexAttribArray(U),A[U]=0)}function S(g,A,U,R,Y,q,j){j===!0?n.vertexAttribIPointer(g,A,U,Y,q):n.vertexAttribPointer(g,A,U,R,Y,q)}function T(g,A,U,R){M();const Y=R.attributes,q=U.getAttributes(),j=A.defaultAttributeValues;for(const ie in q){const X=q[ie];if(X.location>=0){let ae=Y[ie];if(ae===void 0&&(ie==="instanceMatrix"&&g.instanceMatrix&&(ae=g.instanceMatrix),ie==="instanceColor"&&g.instanceColor&&(ae=g.instanceColor)),ae!==void 0){const fe=ae.normalized,De=ae.itemSize,je=e.get(ae);if(je===void 0)continue;const ot=je.buffer,nt=je.type,ht=je.bytesPerElement,K=nt===n.INT||nt===n.UNSIGNED_INT||ae.gpuType===qo;if(ae.isInterleavedBufferAttribute){const te=ae.data,ve=te.stride,ke=ae.offset;if(te.isInstancedInterleavedBuffer){for(let Ce=0;Ce<X.locationSize;Ce++)p(X.location+Ce,te.meshPerAttribute);g.isInstancedMesh!==!0&&R._maxInstanceCount===void 0&&(R._maxInstanceCount=te.meshPerAttribute*te.count)}else for(let Ce=0;Ce<X.locationSize;Ce++)m(X.location+Ce);n.bindBuffer(n.ARRAY_BUFFER,ot);for(let Ce=0;Ce<X.locationSize;Ce++)S(X.location+Ce,De/X.locationSize,nt,fe,ve*ht,(ke+De/X.locationSize*Ce)*ht,K)}else{if(ae.isInstancedBufferAttribute){for(let te=0;te<X.locationSize;te++)p(X.location+te,ae.meshPerAttribute);g.isInstancedMesh!==!0&&R._maxInstanceCount===void 0&&(R._maxInstanceCount=ae.meshPerAttribute*ae.count)}else for(let te=0;te<X.locationSize;te++)m(X.location+te);n.bindBuffer(n.ARRAY_BUFFER,ot);for(let te=0;te<X.locationSize;te++)S(X.location+te,De/X.locationSize,nt,fe,De*ht,De/X.locationSize*te*ht,K)}}else if(j!==void 0){const fe=j[ie];if(fe!==void 0)switch(fe.length){case 2:n.vertexAttrib2fv(X.location,fe);break;case 3:n.vertexAttrib3fv(X.location,fe);break;case 4:n.vertexAttrib4fv(X.location,fe);break;default:n.vertexAttrib1fv(X.location,fe)}}}}y()}function C(){z();for(const g in i){const A=i[g];for(const U in A){const R=A[U];for(const Y in R)f(R[Y].object),delete R[Y];delete A[U]}delete i[g]}}function E(g){if(i[g.id]===void 0)return;const A=i[g.id];for(const U in A){const R=A[U];for(const Y in R)f(R[Y].object),delete R[Y];delete A[U]}delete i[g.id]}function L(g){for(const A in i){const U=i[A];if(U[g.id]===void 0)continue;const R=U[g.id];for(const Y in R)f(R[Y].object),delete R[Y];delete U[g.id]}}function z(){b(),a=!0,s!==r&&(s=r,c(s.object))}function b(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:z,resetDefaultState:b,dispose:C,releaseStatesOfGeometry:E,releaseStatesOfProgram:L,initAttributes:M,enableAttribute:m,disableUnusedAttributes:y}}function D0(n,e,t){let i;function r(c){i=c}function s(c,f){n.drawArrays(i,c,f),t.update(f,i,1)}function a(c,f,d){d!==0&&(n.drawArraysInstanced(i,c,f,d),t.update(f,i,d))}function o(c,f,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,f,0,d);let h=0;for(let _=0;_<d;_++)h+=f[_];t.update(h,i,1)}function l(c,f,d,u){if(d===0)return;const h=e.get("WEBGL_multi_draw");if(h===null)for(let _=0;_<c.length;_++)a(c[_],f[_],u[_]);else{h.multiDrawArraysInstancedWEBGL(i,c,0,f,0,u,0,d);let _=0;for(let M=0;M<d;M++)_+=f[M]*u[M];t.update(_,i,1)}}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function I0(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const L=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(L.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(L){return!(L!==vn&&i.convert(L)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(L){const z=L===pr&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(L!==Rn&&i.convert(L)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&L!==En&&!z)}function l(L){if(L==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";L="mediump"}return L==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const f=l(c);f!==c&&(Ve("WebGLRenderer:",c,"not supported, using",f,"instead."),c=f);const d=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),h=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),M=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),y=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),S=n.getParameter(n.MAX_VARYING_VECTORS),T=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),C=_>0,E=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:h,maxVertexTextures:_,maxTextureSize:M,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:y,maxVaryings:S,maxFragmentUniforms:T,vertexTextures:C,maxSamples:E}}function U0(n){const e=this;let t=null,i=0,r=!1,s=!1;const a=new ti,o=new He,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const h=d.length!==0||u||i!==0||r;return r=u,i=d.length,h},this.beginShadows=function(){s=!0,f(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,u){t=f(d,u,0)},this.setState=function(d,u,h){const _=d.clippingPlanes,M=d.clipIntersection,m=d.clipShadows,p=n.get(d);if(!r||_===null||_.length===0||s&&!m)s?f(null):c();else{const y=s?0:i,S=y*4;let T=p.clippingState||null;l.value=T,T=f(_,u,S,h);for(let C=0;C!==S;++C)T[C]=t[C];p.clippingState=T,this.numIntersection=M?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function f(d,u,h,_){const M=d!==null?d.length:0;let m=null;if(M!==0){if(m=l.value,_!==!0||m===null){const p=h+M*4,y=u.matrixWorldInverse;o.getNormalMatrix(y),(m===null||m.length<p)&&(m=new Float32Array(p));for(let S=0,T=h;S!==M;++S,T+=4)a.copy(d[S]).applyMatrix4(y,o),a.normal.toArray(m,T),m[T+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=M,e.numIntersection=0,m}}function N0(n){let e=new WeakMap;function t(a,o){return o===Ja?a.mapping=or:o===Qa&&(a.mapping=cr),a}function i(a){if(a&&a.isTexture){const o=a.mapping;if(o===Ja||o===Qa)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new If(l.height);return c.fromEquirectangularTexture(n,a),e.set(a,c),a.addEventListener("dispose",r),t(c.texture,a.mapping)}else return null}}return a}function r(a){const o=a.target;o.removeEventListener("dispose",r);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}const ri=4,pl=[.125,.215,.35,.446,.526,.582],Si=20,F0=256,Ir=new lc,ml=new Qe;let Ia=null,Ua=0,Na=0,Fa=!1;const O0=new k;class xl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,r=100,s={}){const{size:a=256,position:o=O0}=s;Ia=this._renderer.getRenderTarget(),Ua=this._renderer.getActiveCubeFace(),Na=this._renderer.getActiveMipmapLevel(),Fa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,r,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=vl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=_l(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Ia,Ua,Na),this._renderer.xr.enabled=Fa,e.scissorTest=!1,ji(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===or||e.mapping===cr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ia=this._renderer.getRenderTarget(),Ua=this._renderer.getActiveCubeFace(),Na=this._renderer.getActiveMipmapLevel(),Fa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:hn,minFilter:hn,generateMipmaps:!1,type:pr,format:vn,colorSpace:lr,depthBuffer:!1},r=gl(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=gl(e,t,i);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=B0(s)),this._blurMaterial=k0(s,e,t),this._ggxMaterial=z0(s,e,t)}return r}_compileMaterial(e){const t=new yn(new Jt,e);this._renderer.compile(t,Ir)}_sceneToCubeUV(e,t,i,r,s){const l=new en(90,1,t,i),c=[1,-1,1,1,1,1],f=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,h=d.toneMapping;d.getClearColor(ml),d.toneMapping=oi,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(r),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new yn(new gr,new xu({name:"PMREM.Background",side:tn,depthWrite:!1,depthTest:!1})));const M=this._backgroundBox,m=M.material;let p=!1;const y=e.background;y?y.isColor&&(m.color.copy(y),e.background=null,p=!0):(m.color.copy(ml),p=!0);for(let S=0;S<6;S++){const T=S%3;T===0?(l.up.set(0,c[S],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+f[S],s.y,s.z)):T===1?(l.up.set(0,0,c[S]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+f[S],s.z)):(l.up.set(0,c[S],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+f[S]));const C=this._cubeSize;ji(r,T*C,S>2?C:0,C,C),d.setRenderTarget(r),p&&d.render(M,l),d.render(e,l)}d.toneMapping=h,d.autoClear=u,e.background=y}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===or||e.mapping===cr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=vl()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=_l());const s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;ji(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(a,Ir)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=i}_applyGGXFilter(e,t,i){const r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;const l=a.uniforms,c=i/(this._lodMeshes.length-1),f=t/(this._lodMeshes.length-1),d=Math.sqrt(c*c-f*f),u=.05+c*.95,h=d*u,{_lodMax:_}=this,M=this._sizeLods[i],m=3*M*(i>_-ri?i-_+ri:0),p=4*(this._cubeSize-M);l.envMap.value=e.texture,l.roughness.value=h,l.mipInt.value=_-t,ji(s,m,p,3*M,2*M),r.setRenderTarget(s),r.render(o,Ir),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=_-i,ji(e,m,p,3*M,2*M),r.setRenderTarget(e),r.render(o,Ir)}_blur(e,t,i,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,r,"latitudinal",s),this._halfBlur(a,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&Et("blur direction must be either latitudinal or longitudinal!");const f=3,d=this._lodMeshes[r];d.material=c;const u=c.uniforms,h=this._sizeLods[i]-1,_=isFinite(s)?Math.PI/(2*h):2*Math.PI/(2*Si-1),M=s/_,m=isFinite(s)?1+Math.floor(f*M):Si;m>Si&&Ve(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Si}`);const p=[];let y=0;for(let L=0;L<Si;++L){const z=L/M,b=Math.exp(-z*z/2);p.push(b),L===0?y+=b:L<m&&(y+=2*b)}for(let L=0;L<p.length;L++)p[L]=p[L]/y;u.envMap.value=e.texture,u.samples.value=m,u.weights.value=p,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:S}=this;u.dTheta.value=_,u.mipInt.value=S-i;const T=this._sizeLods[r],C=3*T*(r>S-ri?r-S+ri:0),E=4*(this._cubeSize-T);ji(t,C,E,3*T,2*T),l.setRenderTarget(t),l.render(d,Ir)}}function B0(n){const e=[],t=[],i=[];let r=n;const s=n-ri+1+pl.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);e.push(o);let l=1/o;a>n-ri?l=pl[a-n+ri-1]:a===0&&(l=0),t.push(l);const c=1/(o-2),f=-c,d=1+c,u=[f,f,d,f,d,d,f,f,d,d,f,d],h=6,_=6,M=3,m=2,p=1,y=new Float32Array(M*_*h),S=new Float32Array(m*_*h),T=new Float32Array(p*_*h);for(let E=0;E<h;E++){const L=E%3*2/3-1,z=E>2?0:-1,b=[L,z,0,L+2/3,z,0,L+2/3,z+1,0,L,z,0,L+2/3,z+1,0,L,z+1,0];y.set(b,M*_*E),S.set(u,m*_*E);const g=[E,E,E,E,E,E];T.set(g,p*_*E)}const C=new Jt;C.setAttribute("position",new bn(y,M)),C.setAttribute("uv",new bn(S,m)),C.setAttribute("faceIndex",new bn(T,p)),i.push(new yn(C,null)),r>ri&&r--}return{lodMeshes:i,sizeLods:e,sigmas:t}}function gl(n,e,t){const i=new Ci(n,e,t);return i.texture.mapping=Zs,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function ji(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function z0(n,e,t){return new Wn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:F0,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:ea(),fragmentShader:`

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
		`,blending:Gn,depthTest:!1,depthWrite:!1})}function k0(n,e,t){const i=new Float32Array(Si),r=new k(0,1,0);return new Wn({name:"SphericalGaussianBlur",defines:{n:Si,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:ea(),fragmentShader:`

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
		`,blending:Gn,depthTest:!1,depthWrite:!1})}function _l(){return new Wn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ea(),fragmentShader:`

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
		`,blending:Gn,depthTest:!1,depthWrite:!1})}function vl(){return new Wn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ea(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Gn,depthTest:!1,depthWrite:!1})}function ea(){return`

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
	`}function V0(n){let e=new WeakMap,t=null;function i(o){if(o&&o.isTexture){const l=o.mapping,c=l===Ja||l===Qa,f=l===or||l===cr;if(c||f){let d=e.get(o);const u=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==u)return t===null&&(t=new xl(n)),d=c?t.fromEquirectangular(o,d):t.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),d.texture;if(d!==void 0)return d.texture;{const h=o.image;return c&&h&&h.height>0||f&&h&&r(h)?(t===null&&(t=new xl(n)),d=c?t.fromEquirectangular(o):t.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),o.addEventListener("dispose",s),d.texture):null}}}return o}function r(o){let l=0;const c=6;for(let f=0;f<c;f++)o[f]!==void 0&&l++;return l===c}function s(o){const l=o.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:a}}function G0(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const r=n.getExtension(i);return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const r=t(i);return r===null&&$r("WebGLRenderer: "+i+" extension not supported."),r}}}function H0(n,e,t,i){const r={},s=new WeakMap;function a(d){const u=d.target;u.index!==null&&e.remove(u.index);for(const _ in u.attributes)e.remove(u.attributes[_]);u.removeEventListener("dispose",a),delete r[u.id];const h=s.get(u);h&&(e.remove(h),s.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(d,u){return r[u.id]===!0||(u.addEventListener("dispose",a),r[u.id]=!0,t.memory.geometries++),u}function l(d){const u=d.attributes;for(const h in u)e.update(u[h],n.ARRAY_BUFFER)}function c(d){const u=[],h=d.index,_=d.attributes.position;let M=0;if(h!==null){const y=h.array;M=h.version;for(let S=0,T=y.length;S<T;S+=3){const C=y[S+0],E=y[S+1],L=y[S+2];u.push(C,E,E,L,L,C)}}else if(_!==void 0){const y=_.array;M=_.version;for(let S=0,T=y.length/3-1;S<T;S+=3){const C=S+0,E=S+1,L=S+2;u.push(C,E,E,L,L,C)}}else return;const m=new(fu(u)?_u:gu)(u,1);m.version=M;const p=s.get(d);p&&e.remove(p),s.set(d,m)}function f(d){const u=s.get(d);if(u){const h=d.index;h!==null&&u.version<h.version&&c(d)}else c(d);return s.get(d)}return{get:o,update:l,getWireframeAttribute:f}}function W0(n,e,t){let i;function r(u){i=u}let s,a;function o(u){s=u.type,a=u.bytesPerElement}function l(u,h){n.drawElements(i,h,s,u*a),t.update(h,i,1)}function c(u,h,_){_!==0&&(n.drawElementsInstanced(i,h,s,u*a,_),t.update(h,i,_))}function f(u,h,_){if(_===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,h,0,s,u,0,_);let m=0;for(let p=0;p<_;p++)m+=h[p];t.update(m,i,1)}function d(u,h,_,M){if(_===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<u.length;p++)c(u[p]/a,h[p],M[p]);else{m.multiDrawElementsInstancedWEBGL(i,h,0,s,u,0,M,0,_);let p=0;for(let y=0;y<_;y++)p+=h[y]*M[y];t.update(p,i,1)}}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=f,this.renderMultiDrawInstances=d}function X0(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(s/3);break;case n.LINES:t.lines+=o*(s/2);break;case n.LINE_STRIP:t.lines+=o*(s-1);break;case n.LINE_LOOP:t.lines+=o*s;break;case n.POINTS:t.points+=o*s;break;default:Et("WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function q0(n,e,t){const i=new WeakMap,r=new xt;function s(a,o,l){const c=a.morphTargetInfluences,f=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=f!==void 0?f.length:0;let u=i.get(o);if(u===void 0||u.count!==d){let g=function(){z.dispose(),i.delete(o),o.removeEventListener("dispose",g)};var h=g;u!==void 0&&u.texture.dispose();const _=o.morphAttributes.position!==void 0,M=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],y=o.morphAttributes.normal||[],S=o.morphAttributes.color||[];let T=0;_===!0&&(T=1),M===!0&&(T=2),m===!0&&(T=3);let C=o.attributes.position.count*T,E=1;C>e.maxTextureSize&&(E=Math.ceil(C/e.maxTextureSize),C=e.maxTextureSize);const L=new Float32Array(C*E*4*d),z=new hu(L,C,E,d);z.type=En,z.needsUpdate=!0;const b=T*4;for(let A=0;A<d;A++){const U=p[A],R=y[A],Y=S[A],q=C*E*4*A;for(let j=0;j<U.count;j++){const ie=j*b;_===!0&&(r.fromBufferAttribute(U,j),L[q+ie+0]=r.x,L[q+ie+1]=r.y,L[q+ie+2]=r.z,L[q+ie+3]=0),M===!0&&(r.fromBufferAttribute(R,j),L[q+ie+4]=r.x,L[q+ie+5]=r.y,L[q+ie+6]=r.z,L[q+ie+7]=0),m===!0&&(r.fromBufferAttribute(Y,j),L[q+ie+8]=r.x,L[q+ie+9]=r.y,L[q+ie+10]=r.z,L[q+ie+11]=Y.itemSize===4?r.w:1)}}u={count:d,texture:z,size:new $e(C,E)},i.set(o,u),o.addEventListener("dispose",g)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let _=0;for(let m=0;m<c.length;m++)_+=c[m];const M=o.morphTargetsRelative?1:1-_;l.getUniforms().setValue(n,"morphTargetBaseInfluence",M),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",u.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",u.size)}return{update:s}}function Y0(n,e,t,i){let r=new WeakMap;function s(l){const c=i.render.frame,f=l.geometry,d=e.get(l,f);if(r.get(d)!==c&&(e.update(d),r.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),r.get(l)!==c&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const u=l.skeleton;r.get(u)!==c&&(u.update(),r.set(u,c))}return d}function a(){r=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:a}}const wu=new Zt,Ml=new Su(1,1),Au=new hu,Ru=new xf,Cu=new bu,bl=[],yl=[],Sl=new Float32Array(16),El=new Float32Array(9),Tl=new Float32Array(4);function _r(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=bl[r];if(s===void 0&&(s=new Float32Array(r),bl[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(s,o)}return s}function Nt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Ft(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function ta(n,e){let t=yl[e];t===void 0&&(t=new Int32Array(e),yl[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function $0(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function j0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Nt(t,e))return;n.uniform2fv(this.addr,e),Ft(t,e)}}function K0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Nt(t,e))return;n.uniform3fv(this.addr,e),Ft(t,e)}}function Z0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Nt(t,e))return;n.uniform4fv(this.addr,e),Ft(t,e)}}function J0(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Nt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Ft(t,e)}else{if(Nt(t,i))return;Tl.set(i),n.uniformMatrix2fv(this.addr,!1,Tl),Ft(t,i)}}function Q0(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Nt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Ft(t,e)}else{if(Nt(t,i))return;El.set(i),n.uniformMatrix3fv(this.addr,!1,El),Ft(t,i)}}function em(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Nt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Ft(t,e)}else{if(Nt(t,i))return;Sl.set(i),n.uniformMatrix4fv(this.addr,!1,Sl),Ft(t,i)}}function tm(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function nm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Nt(t,e))return;n.uniform2iv(this.addr,e),Ft(t,e)}}function im(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Nt(t,e))return;n.uniform3iv(this.addr,e),Ft(t,e)}}function rm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Nt(t,e))return;n.uniform4iv(this.addr,e),Ft(t,e)}}function sm(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function am(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Nt(t,e))return;n.uniform2uiv(this.addr,e),Ft(t,e)}}function om(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Nt(t,e))return;n.uniform3uiv(this.addr,e),Ft(t,e)}}function cm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Nt(t,e))return;n.uniform4uiv(this.addr,e),Ft(t,e)}}function lm(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(Ml.compareFunction=du,s=Ml):s=wu,t.setTexture2D(e||s,r)}function um(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||Ru,r)}function dm(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||Cu,r)}function fm(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||Au,r)}function hm(n){switch(n){case 5126:return $0;case 35664:return j0;case 35665:return K0;case 35666:return Z0;case 35674:return J0;case 35675:return Q0;case 35676:return em;case 5124:case 35670:return tm;case 35667:case 35671:return nm;case 35668:case 35672:return im;case 35669:case 35673:return rm;case 5125:return sm;case 36294:return am;case 36295:return om;case 36296:return cm;case 35678:case 36198:case 36298:case 36306:case 35682:return lm;case 35679:case 36299:case 36307:return um;case 35680:case 36300:case 36308:case 36293:return dm;case 36289:case 36303:case 36311:case 36292:return fm}}function pm(n,e){n.uniform1fv(this.addr,e)}function mm(n,e){const t=_r(e,this.size,2);n.uniform2fv(this.addr,t)}function xm(n,e){const t=_r(e,this.size,3);n.uniform3fv(this.addr,t)}function gm(n,e){const t=_r(e,this.size,4);n.uniform4fv(this.addr,t)}function _m(n,e){const t=_r(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function vm(n,e){const t=_r(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function Mm(n,e){const t=_r(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function bm(n,e){n.uniform1iv(this.addr,e)}function ym(n,e){n.uniform2iv(this.addr,e)}function Sm(n,e){n.uniform3iv(this.addr,e)}function Em(n,e){n.uniform4iv(this.addr,e)}function Tm(n,e){n.uniform1uiv(this.addr,e)}function wm(n,e){n.uniform2uiv(this.addr,e)}function Am(n,e){n.uniform3uiv(this.addr,e)}function Rm(n,e){n.uniform4uiv(this.addr,e)}function Cm(n,e,t){const i=this.cache,r=e.length,s=ta(t,r);Nt(i,s)||(n.uniform1iv(this.addr,s),Ft(i,s));for(let a=0;a!==r;++a)t.setTexture2D(e[a]||wu,s[a])}function Pm(n,e,t){const i=this.cache,r=e.length,s=ta(t,r);Nt(i,s)||(n.uniform1iv(this.addr,s),Ft(i,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||Ru,s[a])}function Lm(n,e,t){const i=this.cache,r=e.length,s=ta(t,r);Nt(i,s)||(n.uniform1iv(this.addr,s),Ft(i,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||Cu,s[a])}function Dm(n,e,t){const i=this.cache,r=e.length,s=ta(t,r);Nt(i,s)||(n.uniform1iv(this.addr,s),Ft(i,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||Au,s[a])}function Im(n){switch(n){case 5126:return pm;case 35664:return mm;case 35665:return xm;case 35666:return gm;case 35674:return _m;case 35675:return vm;case 35676:return Mm;case 5124:case 35670:return bm;case 35667:case 35671:return ym;case 35668:case 35672:return Sm;case 35669:case 35673:return Em;case 5125:return Tm;case 36294:return wm;case 36295:return Am;case 36296:return Rm;case 35678:case 36198:case 36298:case 36306:case 35682:return Cm;case 35679:case 36299:case 36307:return Pm;case 35680:case 36300:case 36308:case 36293:return Lm;case 36289:case 36303:case 36311:case 36292:return Dm}}class Um{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=hm(t.type)}}class Nm{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Im(t.type)}}class Fm{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],i)}}}const Oa=/(\w+)(\])?(\[|\.)?/g;function wl(n,e){n.seq.push(e),n.map[e.id]=e}function Om(n,e,t){const i=n.name,r=i.length;for(Oa.lastIndex=0;;){const s=Oa.exec(i),a=Oa.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){wl(t,c===void 0?new Um(o,n,e):new Nm(o,n,e));break}else{let d=t.map[o];d===void 0&&(d=new Fm(o),wl(t,d)),t=d}}}class Us{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(t,r),a=e.getUniformLocation(t,s.name);Om(s,a,this)}}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&i.push(a)}return i}}function Al(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const Bm=37297;let zm=0;function km(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}const Rl=new He;function Vm(n){st._getMatrix(Rl,st.workingColorSpace,n);const e=`mat3( ${Rl.elements.map(t=>t.toFixed(4))} )`;switch(st.getTransfer(n)){case zs:return[e,"LinearTransferOETF"];case mt:return[e,"sRGBTransferOETF"];default:return Ve("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Cl(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),s=(n.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+km(n.getShaderSource(e),o)}else return s}function Gm(n,e){const t=Vm(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Hm(n,e){let t;switch(e){case Cd:t="Linear";break;case Pd:t="Reinhard";break;case Ld:t="Cineon";break;case nu:t="ACESFilmic";break;case Id:t="AgX";break;case Ud:t="Neutral";break;case Dd:t="Custom";break;default:Ve("WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Cs=new k;function Wm(){st.getLuminanceCoefficients(Cs);const n=Cs.x.toFixed(4),e=Cs.y.toFixed(4),t=Cs.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Xm(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ur).join(`
`)}function qm(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function Ym(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),a=s.name;let o=1;s.type===n.FLOAT_MAT2&&(o=2),s.type===n.FLOAT_MAT3&&(o=3),s.type===n.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function Ur(n){return n!==""}function Pl(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Ll(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const $m=/^[ \t]*#include +<([\w\d./]+)>/gm;function Do(n){return n.replace($m,Km)}const jm=new Map;function Km(n,e){let t=Xe[e];if(t===void 0){const i=jm.get(e);if(i!==void 0)t=Xe[i],Ve('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Do(t)}const Zm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Dl(n){return n.replace(Zm,Jm)}function Jm(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Il(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}function Qm(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===eu?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===cd?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===zn&&(e="SHADOWMAP_TYPE_VSM"),e}function ex(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case or:case cr:e="ENVMAP_TYPE_CUBE";break;case Zs:e="ENVMAP_TYPE_CUBE_UV";break}return e}function tx(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case cr:e="ENVMAP_MODE_REFRACTION";break}return e}function nx(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case tu:e="ENVMAP_BLENDING_MULTIPLY";break;case Ad:e="ENVMAP_BLENDING_MIX";break;case Rd:e="ENVMAP_BLENDING_ADD";break}return e}function ix(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function rx(n,e,t,i){const r=n.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=Qm(t),c=ex(t),f=tx(t),d=nx(t),u=ix(t),h=Xm(t),_=qm(s),M=r.createProgram();let m,p,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Ur).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Ur).join(`
`),p.length>0&&(p+=`
`)):(m=[Il(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+f:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ur).join(`
`),p=[Il(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+f:"",t.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==oi?"#define TONE_MAPPING":"",t.toneMapping!==oi?Xe.tonemapping_pars_fragment:"",t.toneMapping!==oi?Hm("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Xe.colorspace_pars_fragment,Gm("linearToOutputTexel",t.outputColorSpace),Wm(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ur).join(`
`)),a=Do(a),a=Pl(a,t),a=Ll(a,t),o=Do(o),o=Pl(o,t),o=Ll(o,t),a=Dl(a),o=Dl(o),t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,m=[h,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===Oc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Oc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const S=y+m+a,T=y+p+o,C=Al(r,r.VERTEX_SHADER,S),E=Al(r,r.FRAGMENT_SHADER,T);r.attachShader(M,C),r.attachShader(M,E),t.index0AttributeName!==void 0?r.bindAttribLocation(M,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(M,0,"position"),r.linkProgram(M);function L(A){if(n.debug.checkShaderErrors){const U=r.getProgramInfoLog(M)||"",R=r.getShaderInfoLog(C)||"",Y=r.getShaderInfoLog(E)||"",q=U.trim(),j=R.trim(),ie=Y.trim();let X=!0,ae=!0;if(r.getProgramParameter(M,r.LINK_STATUS)===!1)if(X=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,M,C,E);else{const fe=Cl(r,C,"vertex"),De=Cl(r,E,"fragment");Et("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(M,r.VALIDATE_STATUS)+`

Material Name: `+A.name+`
Material Type: `+A.type+`

Program Info Log: `+q+`
`+fe+`
`+De)}else q!==""?Ve("WebGLProgram: Program Info Log:",q):(j===""||ie==="")&&(ae=!1);ae&&(A.diagnostics={runnable:X,programLog:q,vertexShader:{log:j,prefix:m},fragmentShader:{log:ie,prefix:p}})}r.deleteShader(C),r.deleteShader(E),z=new Us(r,M),b=Ym(r,M)}let z;this.getUniforms=function(){return z===void 0&&L(this),z};let b;this.getAttributes=function(){return b===void 0&&L(this),b};let g=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return g===!1&&(g=r.getProgramParameter(M,Bm)),g},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(M),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=zm++,this.cacheKey=e,this.usedTimes=1,this.program=M,this.vertexShader=C,this.fragmentShader=E,this}let sx=0;class ax{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new ox(e),t.set(e,i)),i}}class ox{constructor(e){this.id=sx++,this.code=e,this.usedTimes=0}}function cx(n,e,t,i,r,s,a){const o=new nc,l=new ax,c=new Set,f=[],d=r.logarithmicDepthBuffer,u=r.vertexTextures;let h=r.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function M(b){return c.add(b),b===0?"uv":`uv${b}`}function m(b,g,A,U,R){const Y=U.fog,q=R.geometry,j=b.isMeshStandardMaterial?U.environment:null,ie=(b.isMeshStandardMaterial?t:e).get(b.envMap||j),X=ie&&ie.mapping===Zs?ie.image.height:null,ae=_[b.type];b.precision!==null&&(h=r.getMaxPrecision(b.precision),h!==b.precision&&Ve("WebGLProgram.getParameters:",b.precision,"not supported, using",h,"instead."));const fe=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,De=fe!==void 0?fe.length:0;let je=0;q.morphAttributes.position!==void 0&&(je=1),q.morphAttributes.normal!==void 0&&(je=2),q.morphAttributes.color!==void 0&&(je=3);let ot,nt,ht,K;if(ae){const Ke=Sn[ae];ot=Ke.vertexShader,nt=Ke.fragmentShader}else ot=b.vertexShader,nt=b.fragmentShader,l.update(b),ht=l.getVertexShaderID(b),K=l.getFragmentShaderID(b);const te=n.getRenderTarget(),ve=n.state.buffers.depth.getReversed(),ke=R.isInstancedMesh===!0,Ce=R.isBatchedMesh===!0,qe=!!b.map,Tt=!!b.matcap,We=!!ie,_t=!!b.aoMap,D=!!b.lightMap,Oe=!!b.bumpMap,Ye=!!b.normalMap,ct=!!b.displacementMap,Me=!!b.emissiveMap,Mt=!!b.metalnessMap,Ae=!!b.roughnessMap,Be=b.anisotropy>0,w=b.clearcoat>0,v=b.dispersion>0,V=b.iridescence>0,$=b.sheen>0,Q=b.transmission>0,H=Be&&!!b.anisotropyMap,Ee=w&&!!b.clearcoatMap,me=w&&!!b.clearcoatNormalMap,Ie=w&&!!b.clearcoatRoughnessMap,ye=V&&!!b.iridescenceMap,ne=V&&!!b.iridescenceThicknessMap,oe=$&&!!b.sheenColorMap,Re=$&&!!b.sheenRoughnessMap,Pe=!!b.specularMap,se=!!b.specularColorMap,Le=!!b.specularIntensityMap,I=Q&&!!b.transmissionMap,xe=Q&&!!b.thicknessMap,le=!!b.gradientMap,ue=!!b.alphaMap,re=b.alphaTest>0,J=!!b.alphaHash,be=!!b.extensions;let Ue=oi;b.toneMapped&&(te===null||te.isXRRenderTarget===!0)&&(Ue=n.toneMapping);const pt={shaderID:ae,shaderType:b.type,shaderName:b.name,vertexShader:ot,fragmentShader:nt,defines:b.defines,customVertexShaderID:ht,customFragmentShaderID:K,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:h,batching:Ce,batchingColor:Ce&&R._colorsTexture!==null,instancing:ke,instancingColor:ke&&R.instanceColor!==null,instancingMorph:ke&&R.morphTexture!==null,supportsVertexTextures:u,outputColorSpace:te===null?n.outputColorSpace:te.isXRRenderTarget===!0?te.texture.colorSpace:lr,alphaToCoverage:!!b.alphaToCoverage,map:qe,matcap:Tt,envMap:We,envMapMode:We&&ie.mapping,envMapCubeUVHeight:X,aoMap:_t,lightMap:D,bumpMap:Oe,normalMap:Ye,displacementMap:u&&ct,emissiveMap:Me,normalMapObjectSpace:Ye&&b.normalMapType===Bd,normalMapTangentSpace:Ye&&b.normalMapType===uu,metalnessMap:Mt,roughnessMap:Ae,anisotropy:Be,anisotropyMap:H,clearcoat:w,clearcoatMap:Ee,clearcoatNormalMap:me,clearcoatRoughnessMap:Ie,dispersion:v,iridescence:V,iridescenceMap:ye,iridescenceThicknessMap:ne,sheen:$,sheenColorMap:oe,sheenRoughnessMap:Re,specularMap:Pe,specularColorMap:se,specularIntensityMap:Le,transmission:Q,transmissionMap:I,thicknessMap:xe,gradientMap:le,opaque:b.transparent===!1&&b.blending===er&&b.alphaToCoverage===!1,alphaMap:ue,alphaTest:re,alphaHash:J,combine:b.combine,mapUv:qe&&M(b.map.channel),aoMapUv:_t&&M(b.aoMap.channel),lightMapUv:D&&M(b.lightMap.channel),bumpMapUv:Oe&&M(b.bumpMap.channel),normalMapUv:Ye&&M(b.normalMap.channel),displacementMapUv:ct&&M(b.displacementMap.channel),emissiveMapUv:Me&&M(b.emissiveMap.channel),metalnessMapUv:Mt&&M(b.metalnessMap.channel),roughnessMapUv:Ae&&M(b.roughnessMap.channel),anisotropyMapUv:H&&M(b.anisotropyMap.channel),clearcoatMapUv:Ee&&M(b.clearcoatMap.channel),clearcoatNormalMapUv:me&&M(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ie&&M(b.clearcoatRoughnessMap.channel),iridescenceMapUv:ye&&M(b.iridescenceMap.channel),iridescenceThicknessMapUv:ne&&M(b.iridescenceThicknessMap.channel),sheenColorMapUv:oe&&M(b.sheenColorMap.channel),sheenRoughnessMapUv:Re&&M(b.sheenRoughnessMap.channel),specularMapUv:Pe&&M(b.specularMap.channel),specularColorMapUv:se&&M(b.specularColorMap.channel),specularIntensityMapUv:Le&&M(b.specularIntensityMap.channel),transmissionMapUv:I&&M(b.transmissionMap.channel),thicknessMapUv:xe&&M(b.thicknessMap.channel),alphaMapUv:ue&&M(b.alphaMap.channel),vertexTangents:!!q.attributes.tangent&&(Ye||Be),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,pointsUvs:R.isPoints===!0&&!!q.attributes.uv&&(qe||ue),fog:!!Y,useFog:b.fog===!0,fogExp2:!!Y&&Y.isFogExp2,flatShading:b.flatShading===!0&&b.wireframe===!1,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:ve,skinning:R.isSkinnedMesh===!0,morphTargets:q.morphAttributes.position!==void 0,morphNormals:q.morphAttributes.normal!==void 0,morphColors:q.morphAttributes.color!==void 0,morphTargetsCount:De,morphTextureStride:je,numDirLights:g.directional.length,numPointLights:g.point.length,numSpotLights:g.spot.length,numSpotLightMaps:g.spotLightMap.length,numRectAreaLights:g.rectArea.length,numHemiLights:g.hemi.length,numDirLightShadows:g.directionalShadowMap.length,numPointLightShadows:g.pointShadowMap.length,numSpotLightShadows:g.spotShadowMap.length,numSpotLightShadowsWithMaps:g.numSpotLightShadowsWithMaps,numLightProbes:g.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:b.dithering,shadowMapEnabled:n.shadowMap.enabled&&A.length>0,shadowMapType:n.shadowMap.type,toneMapping:Ue,decodeVideoTexture:qe&&b.map.isVideoTexture===!0&&st.getTransfer(b.map.colorSpace)===mt,decodeVideoTextureEmissive:Me&&b.emissiveMap.isVideoTexture===!0&&st.getTransfer(b.emissiveMap.colorSpace)===mt,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===kn,flipSided:b.side===tn,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:be&&b.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(be&&b.extensions.multiDraw===!0||Ce)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return pt.vertexUv1s=c.has(1),pt.vertexUv2s=c.has(2),pt.vertexUv3s=c.has(3),c.clear(),pt}function p(b){const g=[];if(b.shaderID?g.push(b.shaderID):(g.push(b.customVertexShaderID),g.push(b.customFragmentShaderID)),b.defines!==void 0)for(const A in b.defines)g.push(A),g.push(b.defines[A]);return b.isRawShaderMaterial===!1&&(y(g,b),S(g,b),g.push(n.outputColorSpace)),g.push(b.customProgramCacheKey),g.join()}function y(b,g){b.push(g.precision),b.push(g.outputColorSpace),b.push(g.envMapMode),b.push(g.envMapCubeUVHeight),b.push(g.mapUv),b.push(g.alphaMapUv),b.push(g.lightMapUv),b.push(g.aoMapUv),b.push(g.bumpMapUv),b.push(g.normalMapUv),b.push(g.displacementMapUv),b.push(g.emissiveMapUv),b.push(g.metalnessMapUv),b.push(g.roughnessMapUv),b.push(g.anisotropyMapUv),b.push(g.clearcoatMapUv),b.push(g.clearcoatNormalMapUv),b.push(g.clearcoatRoughnessMapUv),b.push(g.iridescenceMapUv),b.push(g.iridescenceThicknessMapUv),b.push(g.sheenColorMapUv),b.push(g.sheenRoughnessMapUv),b.push(g.specularMapUv),b.push(g.specularColorMapUv),b.push(g.specularIntensityMapUv),b.push(g.transmissionMapUv),b.push(g.thicknessMapUv),b.push(g.combine),b.push(g.fogExp2),b.push(g.sizeAttenuation),b.push(g.morphTargetsCount),b.push(g.morphAttributeCount),b.push(g.numDirLights),b.push(g.numPointLights),b.push(g.numSpotLights),b.push(g.numSpotLightMaps),b.push(g.numHemiLights),b.push(g.numRectAreaLights),b.push(g.numDirLightShadows),b.push(g.numPointLightShadows),b.push(g.numSpotLightShadows),b.push(g.numSpotLightShadowsWithMaps),b.push(g.numLightProbes),b.push(g.shadowMapType),b.push(g.toneMapping),b.push(g.numClippingPlanes),b.push(g.numClipIntersection),b.push(g.depthPacking)}function S(b,g){o.disableAll(),g.supportsVertexTextures&&o.enable(0),g.instancing&&o.enable(1),g.instancingColor&&o.enable(2),g.instancingMorph&&o.enable(3),g.matcap&&o.enable(4),g.envMap&&o.enable(5),g.normalMapObjectSpace&&o.enable(6),g.normalMapTangentSpace&&o.enable(7),g.clearcoat&&o.enable(8),g.iridescence&&o.enable(9),g.alphaTest&&o.enable(10),g.vertexColors&&o.enable(11),g.vertexAlphas&&o.enable(12),g.vertexUv1s&&o.enable(13),g.vertexUv2s&&o.enable(14),g.vertexUv3s&&o.enable(15),g.vertexTangents&&o.enable(16),g.anisotropy&&o.enable(17),g.alphaHash&&o.enable(18),g.batching&&o.enable(19),g.dispersion&&o.enable(20),g.batchingColor&&o.enable(21),g.gradientMap&&o.enable(22),b.push(o.mask),o.disableAll(),g.fog&&o.enable(0),g.useFog&&o.enable(1),g.flatShading&&o.enable(2),g.logarithmicDepthBuffer&&o.enable(3),g.reversedDepthBuffer&&o.enable(4),g.skinning&&o.enable(5),g.morphTargets&&o.enable(6),g.morphNormals&&o.enable(7),g.morphColors&&o.enable(8),g.premultipliedAlpha&&o.enable(9),g.shadowMapEnabled&&o.enable(10),g.doubleSided&&o.enable(11),g.flipSided&&o.enable(12),g.useDepthPacking&&o.enable(13),g.dithering&&o.enable(14),g.transmission&&o.enable(15),g.sheen&&o.enable(16),g.opaque&&o.enable(17),g.pointsUvs&&o.enable(18),g.decodeVideoTexture&&o.enable(19),g.decodeVideoTextureEmissive&&o.enable(20),g.alphaToCoverage&&o.enable(21),b.push(o.mask)}function T(b){const g=_[b.type];let A;if(g){const U=Sn[g];A=Cf.clone(U.uniforms)}else A=b.uniforms;return A}function C(b,g){let A;for(let U=0,R=f.length;U<R;U++){const Y=f[U];if(Y.cacheKey===g){A=Y,++A.usedTimes;break}}return A===void 0&&(A=new rx(n,g,b,s),f.push(A)),A}function E(b){if(--b.usedTimes===0){const g=f.indexOf(b);f[g]=f[f.length-1],f.pop(),b.destroy()}}function L(b){l.remove(b)}function z(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:T,acquireProgram:C,releaseProgram:E,releaseShaderCache:L,programs:f,dispose:z}}function lx(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function r(a,o,l){n.get(a)[o]=l}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function ux(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function Ul(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Nl(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function a(d,u,h,_,M,m){let p=n[e];return p===void 0?(p={id:d.id,object:d,geometry:u,material:h,groupOrder:_,renderOrder:d.renderOrder,z:M,group:m},n[e]=p):(p.id=d.id,p.object=d,p.geometry=u,p.material=h,p.groupOrder=_,p.renderOrder=d.renderOrder,p.z=M,p.group=m),e++,p}function o(d,u,h,_,M,m){const p=a(d,u,h,_,M,m);h.transmission>0?i.push(p):h.transparent===!0?r.push(p):t.push(p)}function l(d,u,h,_,M,m){const p=a(d,u,h,_,M,m);h.transmission>0?i.unshift(p):h.transparent===!0?r.unshift(p):t.unshift(p)}function c(d,u){t.length>1&&t.sort(d||ux),i.length>1&&i.sort(u||Ul),r.length>1&&r.sort(u||Ul)}function f(){for(let d=e,u=n.length;d<u;d++){const h=n[d];if(h.id===null)break;h.id=null,h.object=null,h.geometry=null,h.material=null,h.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:o,unshift:l,finish:f,sort:c}}function dx(){let n=new WeakMap;function e(i,r){const s=n.get(i);let a;return s===void 0?(a=new Nl,n.set(i,[a])):r>=s.length?(a=new Nl,s.push(a)):a=s[r],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function fx(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new k,color:new Qe};break;case"SpotLight":t={position:new k,direction:new k,color:new Qe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new k,color:new Qe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new k,skyColor:new Qe,groundColor:new Qe};break;case"RectAreaLight":t={color:new Qe,position:new k,halfWidth:new k,halfHeight:new k};break}return n[e.id]=t,t}}}function hx(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $e};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $e};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $e,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let px=0;function mx(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function xx(n){const e=new fx,t=hx(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new k);const r=new k,s=new vt,a=new vt;function o(c){let f=0,d=0,u=0;for(let b=0;b<9;b++)i.probe[b].set(0,0,0);let h=0,_=0,M=0,m=0,p=0,y=0,S=0,T=0,C=0,E=0,L=0;c.sort(mx);for(let b=0,g=c.length;b<g;b++){const A=c[b],U=A.color,R=A.intensity,Y=A.distance,q=A.shadow&&A.shadow.map?A.shadow.map.texture:null;if(A.isAmbientLight)f+=U.r*R,d+=U.g*R,u+=U.b*R;else if(A.isLightProbe){for(let j=0;j<9;j++)i.probe[j].addScaledVector(A.sh.coefficients[j],R);L++}else if(A.isDirectionalLight){const j=e.get(A);if(j.color.copy(A.color).multiplyScalar(A.intensity),A.castShadow){const ie=A.shadow,X=t.get(A);X.shadowIntensity=ie.intensity,X.shadowBias=ie.bias,X.shadowNormalBias=ie.normalBias,X.shadowRadius=ie.radius,X.shadowMapSize=ie.mapSize,i.directionalShadow[h]=X,i.directionalShadowMap[h]=q,i.directionalShadowMatrix[h]=A.shadow.matrix,y++}i.directional[h]=j,h++}else if(A.isSpotLight){const j=e.get(A);j.position.setFromMatrixPosition(A.matrixWorld),j.color.copy(U).multiplyScalar(R),j.distance=Y,j.coneCos=Math.cos(A.angle),j.penumbraCos=Math.cos(A.angle*(1-A.penumbra)),j.decay=A.decay,i.spot[M]=j;const ie=A.shadow;if(A.map&&(i.spotLightMap[C]=A.map,C++,ie.updateMatrices(A),A.castShadow&&E++),i.spotLightMatrix[M]=ie.matrix,A.castShadow){const X=t.get(A);X.shadowIntensity=ie.intensity,X.shadowBias=ie.bias,X.shadowNormalBias=ie.normalBias,X.shadowRadius=ie.radius,X.shadowMapSize=ie.mapSize,i.spotShadow[M]=X,i.spotShadowMap[M]=q,T++}M++}else if(A.isRectAreaLight){const j=e.get(A);j.color.copy(U).multiplyScalar(R),j.halfWidth.set(A.width*.5,0,0),j.halfHeight.set(0,A.height*.5,0),i.rectArea[m]=j,m++}else if(A.isPointLight){const j=e.get(A);if(j.color.copy(A.color).multiplyScalar(A.intensity),j.distance=A.distance,j.decay=A.decay,A.castShadow){const ie=A.shadow,X=t.get(A);X.shadowIntensity=ie.intensity,X.shadowBias=ie.bias,X.shadowNormalBias=ie.normalBias,X.shadowRadius=ie.radius,X.shadowMapSize=ie.mapSize,X.shadowCameraNear=ie.camera.near,X.shadowCameraFar=ie.camera.far,i.pointShadow[_]=X,i.pointShadowMap[_]=q,i.pointShadowMatrix[_]=A.shadow.matrix,S++}i.point[_]=j,_++}else if(A.isHemisphereLight){const j=e.get(A);j.skyColor.copy(A.color).multiplyScalar(R),j.groundColor.copy(A.groundColor).multiplyScalar(R),i.hemi[p]=j,p++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=_e.LTC_FLOAT_1,i.rectAreaLTC2=_e.LTC_FLOAT_2):(i.rectAreaLTC1=_e.LTC_HALF_1,i.rectAreaLTC2=_e.LTC_HALF_2)),i.ambient[0]=f,i.ambient[1]=d,i.ambient[2]=u;const z=i.hash;(z.directionalLength!==h||z.pointLength!==_||z.spotLength!==M||z.rectAreaLength!==m||z.hemiLength!==p||z.numDirectionalShadows!==y||z.numPointShadows!==S||z.numSpotShadows!==T||z.numSpotMaps!==C||z.numLightProbes!==L)&&(i.directional.length=h,i.spot.length=M,i.rectArea.length=m,i.point.length=_,i.hemi.length=p,i.directionalShadow.length=y,i.directionalShadowMap.length=y,i.pointShadow.length=S,i.pointShadowMap.length=S,i.spotShadow.length=T,i.spotShadowMap.length=T,i.directionalShadowMatrix.length=y,i.pointShadowMatrix.length=S,i.spotLightMatrix.length=T+C-E,i.spotLightMap.length=C,i.numSpotLightShadowsWithMaps=E,i.numLightProbes=L,z.directionalLength=h,z.pointLength=_,z.spotLength=M,z.rectAreaLength=m,z.hemiLength=p,z.numDirectionalShadows=y,z.numPointShadows=S,z.numSpotShadows=T,z.numSpotMaps=C,z.numLightProbes=L,i.version=px++)}function l(c,f){let d=0,u=0,h=0,_=0,M=0;const m=f.matrixWorldInverse;for(let p=0,y=c.length;p<y;p++){const S=c[p];if(S.isDirectionalLight){const T=i.directional[d];T.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),T.direction.sub(r),T.direction.transformDirection(m),d++}else if(S.isSpotLight){const T=i.spot[h];T.position.setFromMatrixPosition(S.matrixWorld),T.position.applyMatrix4(m),T.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),T.direction.sub(r),T.direction.transformDirection(m),h++}else if(S.isRectAreaLight){const T=i.rectArea[_];T.position.setFromMatrixPosition(S.matrixWorld),T.position.applyMatrix4(m),a.identity(),s.copy(S.matrixWorld),s.premultiply(m),a.extractRotation(s),T.halfWidth.set(S.width*.5,0,0),T.halfHeight.set(0,S.height*.5,0),T.halfWidth.applyMatrix4(a),T.halfHeight.applyMatrix4(a),_++}else if(S.isPointLight){const T=i.point[u];T.position.setFromMatrixPosition(S.matrixWorld),T.position.applyMatrix4(m),u++}else if(S.isHemisphereLight){const T=i.hemi[M];T.direction.setFromMatrixPosition(S.matrixWorld),T.direction.transformDirection(m),M++}}}return{setup:o,setupView:l,state:i}}function Fl(n){const e=new xx(n),t=[],i=[];function r(f){c.camera=f,t.length=0,i.length=0}function s(f){t.push(f)}function a(f){i.push(f)}function o(){e.setup(t)}function l(f){e.setupView(t,f)}const c={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:o,setupLightsView:l,pushLight:s,pushShadow:a}}function gx(n){let e=new WeakMap;function t(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new Fl(n),e.set(r,[o])):s>=a.length?(o=new Fl(n),a.push(o)):o=a[s],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const _x=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,vx=`uniform sampler2D shadow_pass;
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
}`;function Mx(n,e,t){let i=new ic;const r=new $e,s=new $e,a=new xt,o=new kf({depthPacking:Od}),l=new Vf,c={},f=t.maxTextureSize,d={[li]:tn,[tn]:li,[kn]:kn},u=new Wn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new $e},radius:{value:4}},vertexShader:_x,fragmentShader:vx}),h=u.clone();h.defines.HORIZONTAL_PASS=1;const _=new Jt;_.setAttribute("position",new bn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const M=new yn(_,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=eu;let p=this.type;this.render=function(E,L,z){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||E.length===0)return;const b=n.getRenderTarget(),g=n.getActiveCubeFace(),A=n.getActiveMipmapLevel(),U=n.state;U.setBlending(Gn),U.buffers.depth.getReversed()===!0?U.buffers.color.setClear(0,0,0,0):U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);const R=p!==zn&&this.type===zn,Y=p===zn&&this.type!==zn;for(let q=0,j=E.length;q<j;q++){const ie=E[q],X=ie.shadow;if(X===void 0){Ve("WebGLShadowMap:",ie,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;r.copy(X.mapSize);const ae=X.getFrameExtents();if(r.multiply(ae),s.copy(X.mapSize),(r.x>f||r.y>f)&&(r.x>f&&(s.x=Math.floor(f/ae.x),r.x=s.x*ae.x,X.mapSize.x=s.x),r.y>f&&(s.y=Math.floor(f/ae.y),r.y=s.y*ae.y,X.mapSize.y=s.y)),X.map===null||R===!0||Y===!0){const De=this.type!==zn?{minFilter:un,magFilter:un}:{};X.map!==null&&X.map.dispose(),X.map=new Ci(r.x,r.y,De),X.map.texture.name=ie.name+".shadowMap",X.camera.updateProjectionMatrix()}n.setRenderTarget(X.map),n.clear();const fe=X.getViewportCount();for(let De=0;De<fe;De++){const je=X.getViewport(De);a.set(s.x*je.x,s.y*je.y,s.x*je.z,s.y*je.w),U.viewport(a),X.updateMatrices(ie,De),i=X.getFrustum(),T(L,z,X.camera,ie,this.type)}X.isPointLightShadow!==!0&&this.type===zn&&y(X,z),X.needsUpdate=!1}p=this.type,m.needsUpdate=!1,n.setRenderTarget(b,g,A)};function y(E,L){const z=e.update(M);u.defines.VSM_SAMPLES!==E.blurSamples&&(u.defines.VSM_SAMPLES=E.blurSamples,h.defines.VSM_SAMPLES=E.blurSamples,u.needsUpdate=!0,h.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new Ci(r.x,r.y)),u.uniforms.shadow_pass.value=E.map.texture,u.uniforms.resolution.value=E.mapSize,u.uniforms.radius.value=E.radius,n.setRenderTarget(E.mapPass),n.clear(),n.renderBufferDirect(L,null,z,u,M,null),h.uniforms.shadow_pass.value=E.mapPass.texture,h.uniforms.resolution.value=E.mapSize,h.uniforms.radius.value=E.radius,n.setRenderTarget(E.map),n.clear(),n.renderBufferDirect(L,null,z,h,M,null)}function S(E,L,z,b){let g=null;const A=z.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(A!==void 0)g=A;else if(g=z.isPointLight===!0?l:o,n.localClippingEnabled&&L.clipShadows===!0&&Array.isArray(L.clippingPlanes)&&L.clippingPlanes.length!==0||L.displacementMap&&L.displacementScale!==0||L.alphaMap&&L.alphaTest>0||L.map&&L.alphaTest>0||L.alphaToCoverage===!0){const U=g.uuid,R=L.uuid;let Y=c[U];Y===void 0&&(Y={},c[U]=Y);let q=Y[R];q===void 0&&(q=g.clone(),Y[R]=q,L.addEventListener("dispose",C)),g=q}if(g.visible=L.visible,g.wireframe=L.wireframe,b===zn?g.side=L.shadowSide!==null?L.shadowSide:L.side:g.side=L.shadowSide!==null?L.shadowSide:d[L.side],g.alphaMap=L.alphaMap,g.alphaTest=L.alphaToCoverage===!0?.5:L.alphaTest,g.map=L.map,g.clipShadows=L.clipShadows,g.clippingPlanes=L.clippingPlanes,g.clipIntersection=L.clipIntersection,g.displacementMap=L.displacementMap,g.displacementScale=L.displacementScale,g.displacementBias=L.displacementBias,g.wireframeLinewidth=L.wireframeLinewidth,g.linewidth=L.linewidth,z.isPointLight===!0&&g.isMeshDistanceMaterial===!0){const U=n.properties.get(g);U.light=z}return g}function T(E,L,z,b,g){if(E.visible===!1)return;if(E.layers.test(L.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&g===zn)&&(!E.frustumCulled||i.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,E.matrixWorld);const R=e.update(E),Y=E.material;if(Array.isArray(Y)){const q=R.groups;for(let j=0,ie=q.length;j<ie;j++){const X=q[j],ae=Y[X.materialIndex];if(ae&&ae.visible){const fe=S(E,ae,b,g);E.onBeforeShadow(n,E,L,z,R,fe,X),n.renderBufferDirect(z,null,R,fe,E,X),E.onAfterShadow(n,E,L,z,R,fe,X)}}}else if(Y.visible){const q=S(E,Y,b,g);E.onBeforeShadow(n,E,L,z,R,q,null),n.renderBufferDirect(z,null,R,q,E,null),E.onAfterShadow(n,E,L,z,R,q,null)}}const U=E.children;for(let R=0,Y=U.length;R<Y;R++)T(U[R],L,z,b,g)}function C(E){E.target.removeEventListener("dispose",C);for(const z in c){const b=c[z],g=E.target.uuid;g in b&&(b[g].dispose(),delete b[g])}}}const bx={[Xa]:qa,[Ya]:Ka,[$a]:Za,[ar]:ja,[qa]:Xa,[Ka]:Ya,[Za]:$a,[ja]:ar};function yx(n,e){function t(){let I=!1;const xe=new xt;let le=null;const ue=new xt(0,0,0,0);return{setMask:function(re){le!==re&&!I&&(n.colorMask(re,re,re,re),le=re)},setLocked:function(re){I=re},setClear:function(re,J,be,Ue,pt){pt===!0&&(re*=Ue,J*=Ue,be*=Ue),xe.set(re,J,be,Ue),ue.equals(xe)===!1&&(n.clearColor(re,J,be,Ue),ue.copy(xe))},reset:function(){I=!1,le=null,ue.set(-1,0,0,0)}}}function i(){let I=!1,xe=!1,le=null,ue=null,re=null;return{setReversed:function(J){if(xe!==J){const be=e.get("EXT_clip_control");J?be.clipControlEXT(be.LOWER_LEFT_EXT,be.ZERO_TO_ONE_EXT):be.clipControlEXT(be.LOWER_LEFT_EXT,be.NEGATIVE_ONE_TO_ONE_EXT),xe=J;const Ue=re;re=null,this.setClear(Ue)}},getReversed:function(){return xe},setTest:function(J){J?te(n.DEPTH_TEST):ve(n.DEPTH_TEST)},setMask:function(J){le!==J&&!I&&(n.depthMask(J),le=J)},setFunc:function(J){if(xe&&(J=bx[J]),ue!==J){switch(J){case Xa:n.depthFunc(n.NEVER);break;case qa:n.depthFunc(n.ALWAYS);break;case Ya:n.depthFunc(n.LESS);break;case ar:n.depthFunc(n.LEQUAL);break;case $a:n.depthFunc(n.EQUAL);break;case ja:n.depthFunc(n.GEQUAL);break;case Ka:n.depthFunc(n.GREATER);break;case Za:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ue=J}},setLocked:function(J){I=J},setClear:function(J){re!==J&&(xe&&(J=1-J),n.clearDepth(J),re=J)},reset:function(){I=!1,le=null,ue=null,re=null,xe=!1}}}function r(){let I=!1,xe=null,le=null,ue=null,re=null,J=null,be=null,Ue=null,pt=null;return{setTest:function(Ke){I||(Ke?te(n.STENCIL_TEST):ve(n.STENCIL_TEST))},setMask:function(Ke){xe!==Ke&&!I&&(n.stencilMask(Ke),xe=Ke)},setFunc:function(Ke,Qt,Ot){(le!==Ke||ue!==Qt||re!==Ot)&&(n.stencilFunc(Ke,Qt,Ot),le=Ke,ue=Qt,re=Ot)},setOp:function(Ke,Qt,Ot){(J!==Ke||be!==Qt||Ue!==Ot)&&(n.stencilOp(Ke,Qt,Ot),J=Ke,be=Qt,Ue=Ot)},setLocked:function(Ke){I=Ke},setClear:function(Ke){pt!==Ke&&(n.clearStencil(Ke),pt=Ke)},reset:function(){I=!1,xe=null,le=null,ue=null,re=null,J=null,be=null,Ue=null,pt=null}}}const s=new t,a=new i,o=new r,l=new WeakMap,c=new WeakMap;let f={},d={},u=new WeakMap,h=[],_=null,M=!1,m=null,p=null,y=null,S=null,T=null,C=null,E=null,L=new Qe(0,0,0),z=0,b=!1,g=null,A=null,U=null,R=null,Y=null;const q=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let j=!1,ie=0;const X=n.getParameter(n.VERSION);X.indexOf("WebGL")!==-1?(ie=parseFloat(/^WebGL (\d)/.exec(X)[1]),j=ie>=1):X.indexOf("OpenGL ES")!==-1&&(ie=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),j=ie>=2);let ae=null,fe={};const De=n.getParameter(n.SCISSOR_BOX),je=n.getParameter(n.VIEWPORT),ot=new xt().fromArray(De),nt=new xt().fromArray(je);function ht(I,xe,le,ue){const re=new Uint8Array(4),J=n.createTexture();n.bindTexture(I,J),n.texParameteri(I,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(I,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let be=0;be<le;be++)I===n.TEXTURE_3D||I===n.TEXTURE_2D_ARRAY?n.texImage3D(xe,0,n.RGBA,1,1,ue,0,n.RGBA,n.UNSIGNED_BYTE,re):n.texImage2D(xe+be,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,re);return J}const K={};K[n.TEXTURE_2D]=ht(n.TEXTURE_2D,n.TEXTURE_2D,1),K[n.TEXTURE_CUBE_MAP]=ht(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),K[n.TEXTURE_2D_ARRAY]=ht(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),K[n.TEXTURE_3D]=ht(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),te(n.DEPTH_TEST),a.setFunc(ar),Oe(!1),Ye(Lc),te(n.CULL_FACE),_t(Gn);function te(I){f[I]!==!0&&(n.enable(I),f[I]=!0)}function ve(I){f[I]!==!1&&(n.disable(I),f[I]=!1)}function ke(I,xe){return d[I]!==xe?(n.bindFramebuffer(I,xe),d[I]=xe,I===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=xe),I===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=xe),!0):!1}function Ce(I,xe){let le=h,ue=!1;if(I){le=u.get(xe),le===void 0&&(le=[],u.set(xe,le));const re=I.textures;if(le.length!==re.length||le[0]!==n.COLOR_ATTACHMENT0){for(let J=0,be=re.length;J<be;J++)le[J]=n.COLOR_ATTACHMENT0+J;le.length=re.length,ue=!0}}else le[0]!==n.BACK&&(le[0]=n.BACK,ue=!0);ue&&n.drawBuffers(le)}function qe(I){return _!==I?(n.useProgram(I),_=I,!0):!1}const Tt={[yi]:n.FUNC_ADD,[ud]:n.FUNC_SUBTRACT,[dd]:n.FUNC_REVERSE_SUBTRACT};Tt[fd]=n.MIN,Tt[hd]=n.MAX;const We={[pd]:n.ZERO,[md]:n.ONE,[xd]:n.SRC_COLOR,[Ha]:n.SRC_ALPHA,[yd]:n.SRC_ALPHA_SATURATE,[Md]:n.DST_COLOR,[_d]:n.DST_ALPHA,[gd]:n.ONE_MINUS_SRC_COLOR,[Wa]:n.ONE_MINUS_SRC_ALPHA,[bd]:n.ONE_MINUS_DST_COLOR,[vd]:n.ONE_MINUS_DST_ALPHA,[Sd]:n.CONSTANT_COLOR,[Ed]:n.ONE_MINUS_CONSTANT_COLOR,[Td]:n.CONSTANT_ALPHA,[wd]:n.ONE_MINUS_CONSTANT_ALPHA};function _t(I,xe,le,ue,re,J,be,Ue,pt,Ke){if(I===Gn){M===!0&&(ve(n.BLEND),M=!1);return}if(M===!1&&(te(n.BLEND),M=!0),I!==ld){if(I!==m||Ke!==b){if((p!==yi||T!==yi)&&(n.blendEquation(n.FUNC_ADD),p=yi,T=yi),Ke)switch(I){case er:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Dc:n.blendFunc(n.ONE,n.ONE);break;case Ic:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Uc:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:Et("WebGLState: Invalid blending: ",I);break}else switch(I){case er:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Dc:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Ic:Et("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Uc:Et("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Et("WebGLState: Invalid blending: ",I);break}y=null,S=null,C=null,E=null,L.set(0,0,0),z=0,m=I,b=Ke}return}re=re||xe,J=J||le,be=be||ue,(xe!==p||re!==T)&&(n.blendEquationSeparate(Tt[xe],Tt[re]),p=xe,T=re),(le!==y||ue!==S||J!==C||be!==E)&&(n.blendFuncSeparate(We[le],We[ue],We[J],We[be]),y=le,S=ue,C=J,E=be),(Ue.equals(L)===!1||pt!==z)&&(n.blendColor(Ue.r,Ue.g,Ue.b,pt),L.copy(Ue),z=pt),m=I,b=!1}function D(I,xe){I.side===kn?ve(n.CULL_FACE):te(n.CULL_FACE);let le=I.side===tn;xe&&(le=!le),Oe(le),I.blending===er&&I.transparent===!1?_t(Gn):_t(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),a.setFunc(I.depthFunc),a.setTest(I.depthTest),a.setMask(I.depthWrite),s.setMask(I.colorWrite);const ue=I.stencilWrite;o.setTest(ue),ue&&(o.setMask(I.stencilWriteMask),o.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),o.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),Me(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?te(n.SAMPLE_ALPHA_TO_COVERAGE):ve(n.SAMPLE_ALPHA_TO_COVERAGE)}function Oe(I){g!==I&&(I?n.frontFace(n.CW):n.frontFace(n.CCW),g=I)}function Ye(I){I!==ad?(te(n.CULL_FACE),I!==A&&(I===Lc?n.cullFace(n.BACK):I===od?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):ve(n.CULL_FACE),A=I}function ct(I){I!==U&&(j&&n.lineWidth(I),U=I)}function Me(I,xe,le){I?(te(n.POLYGON_OFFSET_FILL),(R!==xe||Y!==le)&&(n.polygonOffset(xe,le),R=xe,Y=le)):ve(n.POLYGON_OFFSET_FILL)}function Mt(I){I?te(n.SCISSOR_TEST):ve(n.SCISSOR_TEST)}function Ae(I){I===void 0&&(I=n.TEXTURE0+q-1),ae!==I&&(n.activeTexture(I),ae=I)}function Be(I,xe,le){le===void 0&&(ae===null?le=n.TEXTURE0+q-1:le=ae);let ue=fe[le];ue===void 0&&(ue={type:void 0,texture:void 0},fe[le]=ue),(ue.type!==I||ue.texture!==xe)&&(ae!==le&&(n.activeTexture(le),ae=le),n.bindTexture(I,xe||K[I]),ue.type=I,ue.texture=xe)}function w(){const I=fe[ae];I!==void 0&&I.type!==void 0&&(n.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function v(){try{n.compressedTexImage2D(...arguments)}catch(I){I("WebGLState:",I)}}function V(){try{n.compressedTexImage3D(...arguments)}catch(I){I("WebGLState:",I)}}function $(){try{n.texSubImage2D(...arguments)}catch(I){I("WebGLState:",I)}}function Q(){try{n.texSubImage3D(...arguments)}catch(I){I("WebGLState:",I)}}function H(){try{n.compressedTexSubImage2D(...arguments)}catch(I){I("WebGLState:",I)}}function Ee(){try{n.compressedTexSubImage3D(...arguments)}catch(I){I("WebGLState:",I)}}function me(){try{n.texStorage2D(...arguments)}catch(I){I("WebGLState:",I)}}function Ie(){try{n.texStorage3D(...arguments)}catch(I){I("WebGLState:",I)}}function ye(){try{n.texImage2D(...arguments)}catch(I){I("WebGLState:",I)}}function ne(){try{n.texImage3D(...arguments)}catch(I){I("WebGLState:",I)}}function oe(I){ot.equals(I)===!1&&(n.scissor(I.x,I.y,I.z,I.w),ot.copy(I))}function Re(I){nt.equals(I)===!1&&(n.viewport(I.x,I.y,I.z,I.w),nt.copy(I))}function Pe(I,xe){let le=c.get(xe);le===void 0&&(le=new WeakMap,c.set(xe,le));let ue=le.get(I);ue===void 0&&(ue=n.getUniformBlockIndex(xe,I.name),le.set(I,ue))}function se(I,xe){const ue=c.get(xe).get(I);l.get(xe)!==ue&&(n.uniformBlockBinding(xe,ue,I.__bindingPointIndex),l.set(xe,ue))}function Le(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),f={},ae=null,fe={},d={},u=new WeakMap,h=[],_=null,M=!1,m=null,p=null,y=null,S=null,T=null,C=null,E=null,L=new Qe(0,0,0),z=0,b=!1,g=null,A=null,U=null,R=null,Y=null,ot.set(0,0,n.canvas.width,n.canvas.height),nt.set(0,0,n.canvas.width,n.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:te,disable:ve,bindFramebuffer:ke,drawBuffers:Ce,useProgram:qe,setBlending:_t,setMaterial:D,setFlipSided:Oe,setCullFace:Ye,setLineWidth:ct,setPolygonOffset:Me,setScissorTest:Mt,activeTexture:Ae,bindTexture:Be,unbindTexture:w,compressedTexImage2D:v,compressedTexImage3D:V,texImage2D:ye,texImage3D:ne,updateUBOMapping:Pe,uniformBlockBinding:se,texStorage2D:me,texStorage3D:Ie,texSubImage2D:$,texSubImage3D:Q,compressedTexSubImage2D:H,compressedTexSubImage3D:Ee,scissor:oe,viewport:Re,reset:Le}}function Sx(n,e,t,i,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new $e,f=new WeakMap;let d;const u=new WeakMap;let h=!1;try{h=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(w,v){return h?new OffscreenCanvas(w,v):Vs("canvas")}function M(w,v,V){let $=1;const Q=Be(w);if((Q.width>V||Q.height>V)&&($=V/Math.max(Q.width,Q.height)),$<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){const H=Math.floor($*Q.width),Ee=Math.floor($*Q.height);d===void 0&&(d=_(H,Ee));const me=v?_(H,Ee):d;return me.width=H,me.height=Ee,me.getContext("2d").drawImage(w,0,0,H,Ee),Ve("WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+H+"x"+Ee+")."),me}else return"data"in w&&Ve("WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),w;return w}function m(w){return w.generateMipmaps}function p(w){n.generateMipmap(w)}function y(w){return w.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?n.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function S(w,v,V,$,Q=!1){if(w!==null){if(n[w]!==void 0)return n[w];Ve("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let H=v;if(v===n.RED&&(V===n.FLOAT&&(H=n.R32F),V===n.HALF_FLOAT&&(H=n.R16F),V===n.UNSIGNED_BYTE&&(H=n.R8)),v===n.RED_INTEGER&&(V===n.UNSIGNED_BYTE&&(H=n.R8UI),V===n.UNSIGNED_SHORT&&(H=n.R16UI),V===n.UNSIGNED_INT&&(H=n.R32UI),V===n.BYTE&&(H=n.R8I),V===n.SHORT&&(H=n.R16I),V===n.INT&&(H=n.R32I)),v===n.RG&&(V===n.FLOAT&&(H=n.RG32F),V===n.HALF_FLOAT&&(H=n.RG16F),V===n.UNSIGNED_BYTE&&(H=n.RG8)),v===n.RG_INTEGER&&(V===n.UNSIGNED_BYTE&&(H=n.RG8UI),V===n.UNSIGNED_SHORT&&(H=n.RG16UI),V===n.UNSIGNED_INT&&(H=n.RG32UI),V===n.BYTE&&(H=n.RG8I),V===n.SHORT&&(H=n.RG16I),V===n.INT&&(H=n.RG32I)),v===n.RGB_INTEGER&&(V===n.UNSIGNED_BYTE&&(H=n.RGB8UI),V===n.UNSIGNED_SHORT&&(H=n.RGB16UI),V===n.UNSIGNED_INT&&(H=n.RGB32UI),V===n.BYTE&&(H=n.RGB8I),V===n.SHORT&&(H=n.RGB16I),V===n.INT&&(H=n.RGB32I)),v===n.RGBA_INTEGER&&(V===n.UNSIGNED_BYTE&&(H=n.RGBA8UI),V===n.UNSIGNED_SHORT&&(H=n.RGBA16UI),V===n.UNSIGNED_INT&&(H=n.RGBA32UI),V===n.BYTE&&(H=n.RGBA8I),V===n.SHORT&&(H=n.RGBA16I),V===n.INT&&(H=n.RGBA32I)),v===n.RGB&&(V===n.UNSIGNED_INT_5_9_9_9_REV&&(H=n.RGB9_E5),V===n.UNSIGNED_INT_10F_11F_11F_REV&&(H=n.R11F_G11F_B10F)),v===n.RGBA){const Ee=Q?zs:st.getTransfer($);V===n.FLOAT&&(H=n.RGBA32F),V===n.HALF_FLOAT&&(H=n.RGBA16F),V===n.UNSIGNED_BYTE&&(H=Ee===mt?n.SRGB8_ALPHA8:n.RGBA8),V===n.UNSIGNED_SHORT_4_4_4_4&&(H=n.RGBA4),V===n.UNSIGNED_SHORT_5_5_5_1&&(H=n.RGB5_A1)}return(H===n.R16F||H===n.R32F||H===n.RG16F||H===n.RG32F||H===n.RGBA16F||H===n.RGBA32F)&&e.get("EXT_color_buffer_float"),H}function T(w,v){let V;return w?v===null||v===Ri||v===Xr?V=n.DEPTH24_STENCIL8:v===En?V=n.DEPTH32F_STENCIL8:v===Wr&&(V=n.DEPTH24_STENCIL8,Ve("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===Ri||v===Xr?V=n.DEPTH_COMPONENT24:v===En?V=n.DEPTH_COMPONENT32F:v===Wr&&(V=n.DEPTH_COMPONENT16),V}function C(w,v){return m(w)===!0||w.isFramebufferTexture&&w.minFilter!==un&&w.minFilter!==hn?Math.log2(Math.max(v.width,v.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?v.mipmaps.length:1}function E(w){const v=w.target;v.removeEventListener("dispose",E),z(v),v.isVideoTexture&&f.delete(v)}function L(w){const v=w.target;v.removeEventListener("dispose",L),g(v)}function z(w){const v=i.get(w);if(v.__webglInit===void 0)return;const V=w.source,$=u.get(V);if($){const Q=$[v.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&b(w),Object.keys($).length===0&&u.delete(V)}i.remove(w)}function b(w){const v=i.get(w);n.deleteTexture(v.__webglTexture);const V=w.source,$=u.get(V);delete $[v.__cacheKey],a.memory.textures--}function g(w){const v=i.get(w);if(w.depthTexture&&(w.depthTexture.dispose(),i.remove(w.depthTexture)),w.isWebGLCubeRenderTarget)for(let $=0;$<6;$++){if(Array.isArray(v.__webglFramebuffer[$]))for(let Q=0;Q<v.__webglFramebuffer[$].length;Q++)n.deleteFramebuffer(v.__webglFramebuffer[$][Q]);else n.deleteFramebuffer(v.__webglFramebuffer[$]);v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer[$])}else{if(Array.isArray(v.__webglFramebuffer))for(let $=0;$<v.__webglFramebuffer.length;$++)n.deleteFramebuffer(v.__webglFramebuffer[$]);else n.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&n.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let $=0;$<v.__webglColorRenderbuffer.length;$++)v.__webglColorRenderbuffer[$]&&n.deleteRenderbuffer(v.__webglColorRenderbuffer[$]);v.__webglDepthRenderbuffer&&n.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const V=w.textures;for(let $=0,Q=V.length;$<Q;$++){const H=i.get(V[$]);H.__webglTexture&&(n.deleteTexture(H.__webglTexture),a.memory.textures--),i.remove(V[$])}i.remove(w)}let A=0;function U(){A=0}function R(){const w=A;return w>=r.maxTextures&&Ve("WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+r.maxTextures),A+=1,w}function Y(w){const v=[];return v.push(w.wrapS),v.push(w.wrapT),v.push(w.wrapR||0),v.push(w.magFilter),v.push(w.minFilter),v.push(w.anisotropy),v.push(w.internalFormat),v.push(w.format),v.push(w.type),v.push(w.generateMipmaps),v.push(w.premultiplyAlpha),v.push(w.flipY),v.push(w.unpackAlignment),v.push(w.colorSpace),v.join()}function q(w,v){const V=i.get(w);if(w.isVideoTexture&&Mt(w),w.isRenderTargetTexture===!1&&w.isExternalTexture!==!0&&w.version>0&&V.__version!==w.version){const $=w.image;if($===null)Ve("WebGLRenderer: Texture marked for update but no image data found.");else if($.complete===!1)Ve("WebGLRenderer: Texture marked for update but image is incomplete");else{K(V,w,v);return}}else w.isExternalTexture&&(V.__webglTexture=w.sourceTexture?w.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,V.__webglTexture,n.TEXTURE0+v)}function j(w,v){const V=i.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&V.__version!==w.version){K(V,w,v);return}else w.isExternalTexture&&(V.__webglTexture=w.sourceTexture?w.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,V.__webglTexture,n.TEXTURE0+v)}function ie(w,v){const V=i.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&V.__version!==w.version){K(V,w,v);return}t.bindTexture(n.TEXTURE_3D,V.__webglTexture,n.TEXTURE0+v)}function X(w,v){const V=i.get(w);if(w.version>0&&V.__version!==w.version){te(V,w,v);return}t.bindTexture(n.TEXTURE_CUBE_MAP,V.__webglTexture,n.TEXTURE0+v)}const ae={[eo]:n.REPEAT,[Vn]:n.CLAMP_TO_EDGE,[to]:n.MIRRORED_REPEAT},fe={[un]:n.NEAREST,[Nd]:n.NEAREST_MIPMAP_NEAREST,[cs]:n.NEAREST_MIPMAP_LINEAR,[hn]:n.LINEAR,[aa]:n.LINEAR_MIPMAP_NEAREST,[Ei]:n.LINEAR_MIPMAP_LINEAR},De={[zd]:n.NEVER,[Xd]:n.ALWAYS,[kd]:n.LESS,[du]:n.LEQUAL,[Vd]:n.EQUAL,[Wd]:n.GEQUAL,[Gd]:n.GREATER,[Hd]:n.NOTEQUAL};function je(w,v){if(v.type===En&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===hn||v.magFilter===aa||v.magFilter===cs||v.magFilter===Ei||v.minFilter===hn||v.minFilter===aa||v.minFilter===cs||v.minFilter===Ei)&&Ve("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(w,n.TEXTURE_WRAP_S,ae[v.wrapS]),n.texParameteri(w,n.TEXTURE_WRAP_T,ae[v.wrapT]),(w===n.TEXTURE_3D||w===n.TEXTURE_2D_ARRAY)&&n.texParameteri(w,n.TEXTURE_WRAP_R,ae[v.wrapR]),n.texParameteri(w,n.TEXTURE_MAG_FILTER,fe[v.magFilter]),n.texParameteri(w,n.TEXTURE_MIN_FILTER,fe[v.minFilter]),v.compareFunction&&(n.texParameteri(w,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(w,n.TEXTURE_COMPARE_FUNC,De[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===un||v.minFilter!==cs&&v.minFilter!==Ei||v.type===En&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||i.get(v).__currentAnisotropy){const V=e.get("EXT_texture_filter_anisotropic");n.texParameterf(w,V.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,r.getMaxAnisotropy())),i.get(v).__currentAnisotropy=v.anisotropy}}}function ot(w,v){let V=!1;w.__webglInit===void 0&&(w.__webglInit=!0,v.addEventListener("dispose",E));const $=v.source;let Q=u.get($);Q===void 0&&(Q={},u.set($,Q));const H=Y(v);if(H!==w.__cacheKey){Q[H]===void 0&&(Q[H]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,V=!0),Q[H].usedTimes++;const Ee=Q[w.__cacheKey];Ee!==void 0&&(Q[w.__cacheKey].usedTimes--,Ee.usedTimes===0&&b(v)),w.__cacheKey=H,w.__webglTexture=Q[H].texture}return V}function nt(w,v,V){return Math.floor(Math.floor(w/V)/v)}function ht(w,v,V,$){const H=w.updateRanges;if(H.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,v.width,v.height,V,$,v.data);else{H.sort((ne,oe)=>ne.start-oe.start);let Ee=0;for(let ne=1;ne<H.length;ne++){const oe=H[Ee],Re=H[ne],Pe=oe.start+oe.count,se=nt(Re.start,v.width,4),Le=nt(oe.start,v.width,4);Re.start<=Pe+1&&se===Le&&nt(Re.start+Re.count-1,v.width,4)===se?oe.count=Math.max(oe.count,Re.start+Re.count-oe.start):(++Ee,H[Ee]=Re)}H.length=Ee+1;const me=n.getParameter(n.UNPACK_ROW_LENGTH),Ie=n.getParameter(n.UNPACK_SKIP_PIXELS),ye=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,v.width);for(let ne=0,oe=H.length;ne<oe;ne++){const Re=H[ne],Pe=Math.floor(Re.start/4),se=Math.ceil(Re.count/4),Le=Pe%v.width,I=Math.floor(Pe/v.width),xe=se,le=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,Le),n.pixelStorei(n.UNPACK_SKIP_ROWS,I),t.texSubImage2D(n.TEXTURE_2D,0,Le,I,xe,le,V,$,v.data)}w.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,me),n.pixelStorei(n.UNPACK_SKIP_PIXELS,Ie),n.pixelStorei(n.UNPACK_SKIP_ROWS,ye)}}function K(w,v,V){let $=n.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&($=n.TEXTURE_2D_ARRAY),v.isData3DTexture&&($=n.TEXTURE_3D);const Q=ot(w,v),H=v.source;t.bindTexture($,w.__webglTexture,n.TEXTURE0+V);const Ee=i.get(H);if(H.version!==Ee.__version||Q===!0){t.activeTexture(n.TEXTURE0+V);const me=st.getPrimaries(st.workingColorSpace),Ie=v.colorSpace===ii?null:st.getPrimaries(v.colorSpace),ye=v.colorSpace===ii||me===Ie?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ye);let ne=M(v.image,!1,r.maxTextureSize);ne=Ae(v,ne);const oe=s.convert(v.format,v.colorSpace),Re=s.convert(v.type);let Pe=S(v.internalFormat,oe,Re,v.colorSpace,v.isVideoTexture);je($,v);let se;const Le=v.mipmaps,I=v.isVideoTexture!==!0,xe=Ee.__version===void 0||Q===!0,le=H.dataReady,ue=C(v,ne);if(v.isDepthTexture)Pe=T(v.format===Yr,v.type),xe&&(I?t.texStorage2D(n.TEXTURE_2D,1,Pe,ne.width,ne.height):t.texImage2D(n.TEXTURE_2D,0,Pe,ne.width,ne.height,0,oe,Re,null));else if(v.isDataTexture)if(Le.length>0){I&&xe&&t.texStorage2D(n.TEXTURE_2D,ue,Pe,Le[0].width,Le[0].height);for(let re=0,J=Le.length;re<J;re++)se=Le[re],I?le&&t.texSubImage2D(n.TEXTURE_2D,re,0,0,se.width,se.height,oe,Re,se.data):t.texImage2D(n.TEXTURE_2D,re,Pe,se.width,se.height,0,oe,Re,se.data);v.generateMipmaps=!1}else I?(xe&&t.texStorage2D(n.TEXTURE_2D,ue,Pe,ne.width,ne.height),le&&ht(v,ne,oe,Re)):t.texImage2D(n.TEXTURE_2D,0,Pe,ne.width,ne.height,0,oe,Re,ne.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){I&&xe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ue,Pe,Le[0].width,Le[0].height,ne.depth);for(let re=0,J=Le.length;re<J;re++)if(se=Le[re],v.format!==vn)if(oe!==null)if(I){if(le)if(v.layerUpdates.size>0){const be=hl(se.width,se.height,v.format,v.type);for(const Ue of v.layerUpdates){const pt=se.data.subarray(Ue*be/se.data.BYTES_PER_ELEMENT,(Ue+1)*be/se.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,re,0,0,Ue,se.width,se.height,1,oe,pt)}v.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,re,0,0,0,se.width,se.height,ne.depth,oe,se.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,re,Pe,se.width,se.height,ne.depth,0,se.data,0,0);else Ve("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else I?le&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,re,0,0,0,se.width,se.height,ne.depth,oe,Re,se.data):t.texImage3D(n.TEXTURE_2D_ARRAY,re,Pe,se.width,se.height,ne.depth,0,oe,Re,se.data)}else{I&&xe&&t.texStorage2D(n.TEXTURE_2D,ue,Pe,Le[0].width,Le[0].height);for(let re=0,J=Le.length;re<J;re++)se=Le[re],v.format!==vn?oe!==null?I?le&&t.compressedTexSubImage2D(n.TEXTURE_2D,re,0,0,se.width,se.height,oe,se.data):t.compressedTexImage2D(n.TEXTURE_2D,re,Pe,se.width,se.height,0,se.data):Ve("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):I?le&&t.texSubImage2D(n.TEXTURE_2D,re,0,0,se.width,se.height,oe,Re,se.data):t.texImage2D(n.TEXTURE_2D,re,Pe,se.width,se.height,0,oe,Re,se.data)}else if(v.isDataArrayTexture)if(I){if(xe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ue,Pe,ne.width,ne.height,ne.depth),le)if(v.layerUpdates.size>0){const re=hl(ne.width,ne.height,v.format,v.type);for(const J of v.layerUpdates){const be=ne.data.subarray(J*re/ne.data.BYTES_PER_ELEMENT,(J+1)*re/ne.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,J,ne.width,ne.height,1,oe,Re,be)}v.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ne.width,ne.height,ne.depth,oe,Re,ne.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Pe,ne.width,ne.height,ne.depth,0,oe,Re,ne.data);else if(v.isData3DTexture)I?(xe&&t.texStorage3D(n.TEXTURE_3D,ue,Pe,ne.width,ne.height,ne.depth),le&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ne.width,ne.height,ne.depth,oe,Re,ne.data)):t.texImage3D(n.TEXTURE_3D,0,Pe,ne.width,ne.height,ne.depth,0,oe,Re,ne.data);else if(v.isFramebufferTexture){if(xe)if(I)t.texStorage2D(n.TEXTURE_2D,ue,Pe,ne.width,ne.height);else{let re=ne.width,J=ne.height;for(let be=0;be<ue;be++)t.texImage2D(n.TEXTURE_2D,be,Pe,re,J,0,oe,Re,null),re>>=1,J>>=1}}else if(Le.length>0){if(I&&xe){const re=Be(Le[0]);t.texStorage2D(n.TEXTURE_2D,ue,Pe,re.width,re.height)}for(let re=0,J=Le.length;re<J;re++)se=Le[re],I?le&&t.texSubImage2D(n.TEXTURE_2D,re,0,0,oe,Re,se):t.texImage2D(n.TEXTURE_2D,re,Pe,oe,Re,se);v.generateMipmaps=!1}else if(I){if(xe){const re=Be(ne);t.texStorage2D(n.TEXTURE_2D,ue,Pe,re.width,re.height)}le&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,oe,Re,ne)}else t.texImage2D(n.TEXTURE_2D,0,Pe,oe,Re,ne);m(v)&&p($),Ee.__version=H.version,v.onUpdate&&v.onUpdate(v)}w.__version=v.version}function te(w,v,V){if(v.image.length!==6)return;const $=ot(w,v),Q=v.source;t.bindTexture(n.TEXTURE_CUBE_MAP,w.__webglTexture,n.TEXTURE0+V);const H=i.get(Q);if(Q.version!==H.__version||$===!0){t.activeTexture(n.TEXTURE0+V);const Ee=st.getPrimaries(st.workingColorSpace),me=v.colorSpace===ii?null:st.getPrimaries(v.colorSpace),Ie=v.colorSpace===ii||Ee===me?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ie);const ye=v.isCompressedTexture||v.image[0].isCompressedTexture,ne=v.image[0]&&v.image[0].isDataTexture,oe=[];for(let J=0;J<6;J++)!ye&&!ne?oe[J]=M(v.image[J],!0,r.maxCubemapSize):oe[J]=ne?v.image[J].image:v.image[J],oe[J]=Ae(v,oe[J]);const Re=oe[0],Pe=s.convert(v.format,v.colorSpace),se=s.convert(v.type),Le=S(v.internalFormat,Pe,se,v.colorSpace),I=v.isVideoTexture!==!0,xe=H.__version===void 0||$===!0,le=Q.dataReady;let ue=C(v,Re);je(n.TEXTURE_CUBE_MAP,v);let re;if(ye){I&&xe&&t.texStorage2D(n.TEXTURE_CUBE_MAP,ue,Le,Re.width,Re.height);for(let J=0;J<6;J++){re=oe[J].mipmaps;for(let be=0;be<re.length;be++){const Ue=re[be];v.format!==vn?Pe!==null?I?le&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,be,0,0,Ue.width,Ue.height,Pe,Ue.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,be,Le,Ue.width,Ue.height,0,Ue.data):Ve("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):I?le&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,be,0,0,Ue.width,Ue.height,Pe,se,Ue.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,be,Le,Ue.width,Ue.height,0,Pe,se,Ue.data)}}}else{if(re=v.mipmaps,I&&xe){re.length>0&&ue++;const J=Be(oe[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,ue,Le,J.width,J.height)}for(let J=0;J<6;J++)if(ne){I?le&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,oe[J].width,oe[J].height,Pe,se,oe[J].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,Le,oe[J].width,oe[J].height,0,Pe,se,oe[J].data);for(let be=0;be<re.length;be++){const pt=re[be].image[J].image;I?le&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,be+1,0,0,pt.width,pt.height,Pe,se,pt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,be+1,Le,pt.width,pt.height,0,Pe,se,pt.data)}}else{I?le&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,Pe,se,oe[J]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,Le,Pe,se,oe[J]);for(let be=0;be<re.length;be++){const Ue=re[be];I?le&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,be+1,0,0,Pe,se,Ue.image[J]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,be+1,Le,Pe,se,Ue.image[J])}}}m(v)&&p(n.TEXTURE_CUBE_MAP),H.__version=Q.version,v.onUpdate&&v.onUpdate(v)}w.__version=v.version}function ve(w,v,V,$,Q,H){const Ee=s.convert(V.format,V.colorSpace),me=s.convert(V.type),Ie=S(V.internalFormat,Ee,me,V.colorSpace),ye=i.get(v),ne=i.get(V);if(ne.__renderTarget=v,!ye.__hasExternalTextures){const oe=Math.max(1,v.width>>H),Re=Math.max(1,v.height>>H);Q===n.TEXTURE_3D||Q===n.TEXTURE_2D_ARRAY?t.texImage3D(Q,H,Ie,oe,Re,v.depth,0,Ee,me,null):t.texImage2D(Q,H,Ie,oe,Re,0,Ee,me,null)}t.bindFramebuffer(n.FRAMEBUFFER,w),Me(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,$,Q,ne.__webglTexture,0,ct(v)):(Q===n.TEXTURE_2D||Q>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,$,Q,ne.__webglTexture,H),t.bindFramebuffer(n.FRAMEBUFFER,null)}function ke(w,v,V){if(n.bindRenderbuffer(n.RENDERBUFFER,w),v.depthBuffer){const $=v.depthTexture,Q=$&&$.isDepthTexture?$.type:null,H=T(v.stencilBuffer,Q),Ee=v.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,me=ct(v);Me(v)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,me,H,v.width,v.height):V?n.renderbufferStorageMultisample(n.RENDERBUFFER,me,H,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,H,v.width,v.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Ee,n.RENDERBUFFER,w)}else{const $=v.textures;for(let Q=0;Q<$.length;Q++){const H=$[Q],Ee=s.convert(H.format,H.colorSpace),me=s.convert(H.type),Ie=S(H.internalFormat,Ee,me,H.colorSpace),ye=ct(v);V&&Me(v)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,ye,Ie,v.width,v.height):Me(v)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ye,Ie,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,Ie,v.width,v.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Ce(w,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,w),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const $=i.get(v.depthTexture);$.__renderTarget=v,(!$.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),q(v.depthTexture,0);const Q=$.__webglTexture,H=ct(v);if(v.depthTexture.format===qr)Me(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,Q,0,H):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,Q,0);else if(v.depthTexture.format===Yr)Me(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,Q,0,H):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,Q,0);else throw new Error("Unknown depthTexture format")}function qe(w){const v=i.get(w),V=w.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==w.depthTexture){const $=w.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),$){const Q=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,$.removeEventListener("dispose",Q)};$.addEventListener("dispose",Q),v.__depthDisposeCallback=Q}v.__boundDepthTexture=$}if(w.depthTexture&&!v.__autoAllocateDepthBuffer){if(V)throw new Error("target.depthTexture not supported in Cube render targets");const $=w.texture.mipmaps;$&&$.length>0?Ce(v.__webglFramebuffer[0],w):Ce(v.__webglFramebuffer,w)}else if(V){v.__webglDepthbuffer=[];for(let $=0;$<6;$++)if(t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[$]),v.__webglDepthbuffer[$]===void 0)v.__webglDepthbuffer[$]=n.createRenderbuffer(),ke(v.__webglDepthbuffer[$],w,!1);else{const Q=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,H=v.__webglDepthbuffer[$];n.bindRenderbuffer(n.RENDERBUFFER,H),n.framebufferRenderbuffer(n.FRAMEBUFFER,Q,n.RENDERBUFFER,H)}}else{const $=w.texture.mipmaps;if($&&$.length>0?t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=n.createRenderbuffer(),ke(v.__webglDepthbuffer,w,!1);else{const Q=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,H=v.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,H),n.framebufferRenderbuffer(n.FRAMEBUFFER,Q,n.RENDERBUFFER,H)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function Tt(w,v,V){const $=i.get(w);v!==void 0&&ve($.__webglFramebuffer,w,w.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),V!==void 0&&qe(w)}function We(w){const v=w.texture,V=i.get(w),$=i.get(v);w.addEventListener("dispose",L);const Q=w.textures,H=w.isWebGLCubeRenderTarget===!0,Ee=Q.length>1;if(Ee||($.__webglTexture===void 0&&($.__webglTexture=n.createTexture()),$.__version=v.version,a.memory.textures++),H){V.__webglFramebuffer=[];for(let me=0;me<6;me++)if(v.mipmaps&&v.mipmaps.length>0){V.__webglFramebuffer[me]=[];for(let Ie=0;Ie<v.mipmaps.length;Ie++)V.__webglFramebuffer[me][Ie]=n.createFramebuffer()}else V.__webglFramebuffer[me]=n.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){V.__webglFramebuffer=[];for(let me=0;me<v.mipmaps.length;me++)V.__webglFramebuffer[me]=n.createFramebuffer()}else V.__webglFramebuffer=n.createFramebuffer();if(Ee)for(let me=0,Ie=Q.length;me<Ie;me++){const ye=i.get(Q[me]);ye.__webglTexture===void 0&&(ye.__webglTexture=n.createTexture(),a.memory.textures++)}if(w.samples>0&&Me(w)===!1){V.__webglMultisampledFramebuffer=n.createFramebuffer(),V.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let me=0;me<Q.length;me++){const Ie=Q[me];V.__webglColorRenderbuffer[me]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,V.__webglColorRenderbuffer[me]);const ye=s.convert(Ie.format,Ie.colorSpace),ne=s.convert(Ie.type),oe=S(Ie.internalFormat,ye,ne,Ie.colorSpace,w.isXRRenderTarget===!0),Re=ct(w);n.renderbufferStorageMultisample(n.RENDERBUFFER,Re,oe,w.width,w.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+me,n.RENDERBUFFER,V.__webglColorRenderbuffer[me])}n.bindRenderbuffer(n.RENDERBUFFER,null),w.depthBuffer&&(V.__webglDepthRenderbuffer=n.createRenderbuffer(),ke(V.__webglDepthRenderbuffer,w,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(H){t.bindTexture(n.TEXTURE_CUBE_MAP,$.__webglTexture),je(n.TEXTURE_CUBE_MAP,v);for(let me=0;me<6;me++)if(v.mipmaps&&v.mipmaps.length>0)for(let Ie=0;Ie<v.mipmaps.length;Ie++)ve(V.__webglFramebuffer[me][Ie],w,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+me,Ie);else ve(V.__webglFramebuffer[me],w,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+me,0);m(v)&&p(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ee){for(let me=0,Ie=Q.length;me<Ie;me++){const ye=Q[me],ne=i.get(ye);let oe=n.TEXTURE_2D;(w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(oe=w.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(oe,ne.__webglTexture),je(oe,ye),ve(V.__webglFramebuffer,w,ye,n.COLOR_ATTACHMENT0+me,oe,0),m(ye)&&p(oe)}t.unbindTexture()}else{let me=n.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(me=w.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(me,$.__webglTexture),je(me,v),v.mipmaps&&v.mipmaps.length>0)for(let Ie=0;Ie<v.mipmaps.length;Ie++)ve(V.__webglFramebuffer[Ie],w,v,n.COLOR_ATTACHMENT0,me,Ie);else ve(V.__webglFramebuffer,w,v,n.COLOR_ATTACHMENT0,me,0);m(v)&&p(me),t.unbindTexture()}w.depthBuffer&&qe(w)}function _t(w){const v=w.textures;for(let V=0,$=v.length;V<$;V++){const Q=v[V];if(m(Q)){const H=y(w),Ee=i.get(Q).__webglTexture;t.bindTexture(H,Ee),p(H),t.unbindTexture()}}}const D=[],Oe=[];function Ye(w){if(w.samples>0){if(Me(w)===!1){const v=w.textures,V=w.width,$=w.height;let Q=n.COLOR_BUFFER_BIT;const H=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Ee=i.get(w),me=v.length>1;if(me)for(let ye=0;ye<v.length;ye++)t.bindFramebuffer(n.FRAMEBUFFER,Ee.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ye,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,Ee.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ye,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,Ee.__webglMultisampledFramebuffer);const Ie=w.texture.mipmaps;Ie&&Ie.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Ee.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Ee.__webglFramebuffer);for(let ye=0;ye<v.length;ye++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(Q|=n.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(Q|=n.STENCIL_BUFFER_BIT)),me){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Ee.__webglColorRenderbuffer[ye]);const ne=i.get(v[ye]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,ne,0)}n.blitFramebuffer(0,0,V,$,0,0,V,$,Q,n.NEAREST),l===!0&&(D.length=0,Oe.length=0,D.push(n.COLOR_ATTACHMENT0+ye),w.depthBuffer&&w.resolveDepthBuffer===!1&&(D.push(H),Oe.push(H),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Oe)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,D))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),me)for(let ye=0;ye<v.length;ye++){t.bindFramebuffer(n.FRAMEBUFFER,Ee.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ye,n.RENDERBUFFER,Ee.__webglColorRenderbuffer[ye]);const ne=i.get(v[ye]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,Ee.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ye,n.TEXTURE_2D,ne,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Ee.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.resolveDepthBuffer===!1&&l){const v=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[v])}}}function ct(w){return Math.min(r.maxSamples,w.samples)}function Me(w){const v=i.get(w);return w.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function Mt(w){const v=a.render.frame;f.get(w)!==v&&(f.set(w,v),w.update())}function Ae(w,v){const V=w.colorSpace,$=w.format,Q=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||V!==lr&&V!==ii&&(st.getTransfer(V)===mt?($!==vn||Q!==Rn)&&Ve("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Et("WebGLTextures: Unsupported texture color space:",V)),v}function Be(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(c.width=w.naturalWidth||w.width,c.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(c.width=w.displayWidth,c.height=w.displayHeight):(c.width=w.width,c.height=w.height),c}this.allocateTextureUnit=R,this.resetTextureUnits=U,this.setTexture2D=q,this.setTexture2DArray=j,this.setTexture3D=ie,this.setTextureCube=X,this.rebindTextures=Tt,this.setupRenderTarget=We,this.updateRenderTargetMipmap=_t,this.updateMultisampleRenderTarget=Ye,this.setupDepthRenderbuffer=qe,this.setupFrameBufferTexture=ve,this.useMultisampledRTT=Me}function Ex(n,e){function t(i,r=ii){let s;const a=st.getTransfer(r);if(i===Rn)return n.UNSIGNED_BYTE;if(i===Yo)return n.UNSIGNED_SHORT_4_4_4_4;if(i===$o)return n.UNSIGNED_SHORT_5_5_5_1;if(i===au)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===ou)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===ru)return n.BYTE;if(i===su)return n.SHORT;if(i===Wr)return n.UNSIGNED_SHORT;if(i===qo)return n.INT;if(i===Ri)return n.UNSIGNED_INT;if(i===En)return n.FLOAT;if(i===pr)return n.HALF_FLOAT;if(i===cu)return n.ALPHA;if(i===lu)return n.RGB;if(i===vn)return n.RGBA;if(i===qr)return n.DEPTH_COMPONENT;if(i===Yr)return n.DEPTH_STENCIL;if(i===jo)return n.RED;if(i===Ko)return n.RED_INTEGER;if(i===Zo)return n.RG;if(i===Jo)return n.RG_INTEGER;if(i===Qo)return n.RGBA_INTEGER;if(i===Ps||i===Ls||i===Ds||i===Is)if(a===mt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===Ps)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Ls)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Ds)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Is)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Ps)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Ls)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Ds)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Is)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===no||i===io||i===ro||i===so)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===no)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===io)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===ro)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===so)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===ao||i===oo||i===co)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===ao||i===oo)return a===mt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===co)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===lo||i===uo||i===fo||i===ho||i===po||i===mo||i===xo||i===go||i===_o||i===vo||i===Mo||i===bo||i===yo||i===So)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===lo)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===uo)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===fo)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===ho)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===po)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===mo)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===xo)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===go)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===_o)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===vo)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Mo)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===bo)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===yo)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===So)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Eo||i===To||i===wo)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===Eo)return a===mt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===To)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===wo)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Ao||i===Ro||i===Co||i===Po)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===Ao)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Ro)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Co)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Po)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Xr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const Tx=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,wx=`
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

}`;class Ax{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new Eu(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new Wn({vertexShader:Tx,fragmentShader:wx,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new yn(new Js(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Rx extends mr{constructor(e,t){super();const i=this;let r=null,s=1,a=null,o="local-floor",l=1,c=null,f=null,d=null,u=null,h=null,_=null;const M=typeof XRWebGLBinding<"u",m=new Ax,p={},y=t.getContextAttributes();let S=null,T=null;const C=[],E=[],L=new $e;let z=null;const b=new en;b.viewport=new xt;const g=new en;g.viewport=new xt;const A=[b,g],U=new qf;let R=null,Y=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let te=C[K];return te===void 0&&(te=new Aa,C[K]=te),te.getTargetRaySpace()},this.getControllerGrip=function(K){let te=C[K];return te===void 0&&(te=new Aa,C[K]=te),te.getGripSpace()},this.getHand=function(K){let te=C[K];return te===void 0&&(te=new Aa,C[K]=te),te.getHandSpace()};function q(K){const te=E.indexOf(K.inputSource);if(te===-1)return;const ve=C[te];ve!==void 0&&(ve.update(K.inputSource,K.frame,c||a),ve.dispatchEvent({type:K.type,data:K.inputSource}))}function j(){r.removeEventListener("select",q),r.removeEventListener("selectstart",q),r.removeEventListener("selectend",q),r.removeEventListener("squeeze",q),r.removeEventListener("squeezestart",q),r.removeEventListener("squeezeend",q),r.removeEventListener("end",j),r.removeEventListener("inputsourceschange",ie);for(let K=0;K<C.length;K++){const te=E[K];te!==null&&(E[K]=null,C[K].disconnect(te))}R=null,Y=null,m.reset();for(const K in p)delete p[K];e.setRenderTarget(S),h=null,u=null,d=null,r=null,T=null,ht.stop(),i.isPresenting=!1,e.setPixelRatio(z),e.setSize(L.width,L.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){s=K,i.isPresenting===!0&&Ve("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){o=K,i.isPresenting===!0&&Ve("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(K){c=K},this.getBaseLayer=function(){return u!==null?u:h},this.getBinding=function(){return d===null&&M&&(d=new XRWebGLBinding(r,t)),d},this.getFrame=function(){return _},this.getSession=function(){return r},this.setSession=async function(K){if(r=K,r!==null){if(S=e.getRenderTarget(),r.addEventListener("select",q),r.addEventListener("selectstart",q),r.addEventListener("selectend",q),r.addEventListener("squeeze",q),r.addEventListener("squeezestart",q),r.addEventListener("squeezeend",q),r.addEventListener("end",j),r.addEventListener("inputsourceschange",ie),y.xrCompatible!==!0&&await t.makeXRCompatible(),z=e.getPixelRatio(),e.getSize(L),M&&"createProjectionLayer"in XRWebGLBinding.prototype){let ve=null,ke=null,Ce=null;y.depth&&(Ce=y.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ve=y.stencil?Yr:qr,ke=y.stencil?Xr:Ri);const qe={colorFormat:t.RGBA8,depthFormat:Ce,scaleFactor:s};d=this.getBinding(),u=d.createProjectionLayer(qe),r.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),T=new Ci(u.textureWidth,u.textureHeight,{format:vn,type:Rn,depthTexture:new Su(u.textureWidth,u.textureHeight,ke,void 0,void 0,void 0,void 0,void 0,void 0,ve),stencilBuffer:y.stencil,colorSpace:e.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{const ve={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:s};h=new XRWebGLLayer(r,t,ve),r.updateRenderState({baseLayer:h}),e.setPixelRatio(1),e.setSize(h.framebufferWidth,h.framebufferHeight,!1),T=new Ci(h.framebufferWidth,h.framebufferHeight,{format:vn,type:Rn,colorSpace:e.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}T.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),ht.setContext(r),ht.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function ie(K){for(let te=0;te<K.removed.length;te++){const ve=K.removed[te],ke=E.indexOf(ve);ke>=0&&(E[ke]=null,C[ke].disconnect(ve))}for(let te=0;te<K.added.length;te++){const ve=K.added[te];let ke=E.indexOf(ve);if(ke===-1){for(let qe=0;qe<C.length;qe++)if(qe>=E.length){E.push(ve),ke=qe;break}else if(E[qe]===null){E[qe]=ve,ke=qe;break}if(ke===-1)break}const Ce=C[ke];Ce&&Ce.connect(ve)}}const X=new k,ae=new k;function fe(K,te,ve){X.setFromMatrixPosition(te.matrixWorld),ae.setFromMatrixPosition(ve.matrixWorld);const ke=X.distanceTo(ae),Ce=te.projectionMatrix.elements,qe=ve.projectionMatrix.elements,Tt=Ce[14]/(Ce[10]-1),We=Ce[14]/(Ce[10]+1),_t=(Ce[9]+1)/Ce[5],D=(Ce[9]-1)/Ce[5],Oe=(Ce[8]-1)/Ce[0],Ye=(qe[8]+1)/qe[0],ct=Tt*Oe,Me=Tt*Ye,Mt=ke/(-Oe+Ye),Ae=Mt*-Oe;if(te.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(Ae),K.translateZ(Mt),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert(),Ce[10]===-1)K.projectionMatrix.copy(te.projectionMatrix),K.projectionMatrixInverse.copy(te.projectionMatrixInverse);else{const Be=Tt+Mt,w=We+Mt,v=ct-Ae,V=Me+(ke-Ae),$=_t*We/w*Be,Q=D*We/w*Be;K.projectionMatrix.makePerspective(v,V,$,Q,Be,w),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}}function De(K,te){te===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(te.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(r===null)return;let te=K.near,ve=K.far;m.texture!==null&&(m.depthNear>0&&(te=m.depthNear),m.depthFar>0&&(ve=m.depthFar)),U.near=g.near=b.near=te,U.far=g.far=b.far=ve,(R!==U.near||Y!==U.far)&&(r.updateRenderState({depthNear:U.near,depthFar:U.far}),R=U.near,Y=U.far),U.layers.mask=K.layers.mask|6,b.layers.mask=U.layers.mask&3,g.layers.mask=U.layers.mask&5;const ke=K.parent,Ce=U.cameras;De(U,ke);for(let qe=0;qe<Ce.length;qe++)De(Ce[qe],ke);Ce.length===2?fe(U,b,g):U.projectionMatrix.copy(b.projectionMatrix),je(K,U,ke)};function je(K,te,ve){ve===null?K.matrix.copy(te.matrixWorld):(K.matrix.copy(ve.matrixWorld),K.matrix.invert(),K.matrix.multiply(te.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(te.projectionMatrix),K.projectionMatrixInverse.copy(te.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=ur*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return U},this.getFoveation=function(){if(!(u===null&&h===null))return l},this.setFoveation=function(K){l=K,u!==null&&(u.fixedFoveation=K),h!==null&&h.fixedFoveation!==void 0&&(h.fixedFoveation=K)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(U)},this.getCameraTexture=function(K){return p[K]};let ot=null;function nt(K,te){if(f=te.getViewerPose(c||a),_=te,f!==null){const ve=f.views;h!==null&&(e.setRenderTargetFramebuffer(T,h.framebuffer),e.setRenderTarget(T));let ke=!1;ve.length!==U.cameras.length&&(U.cameras.length=0,ke=!0);for(let We=0;We<ve.length;We++){const _t=ve[We];let D=null;if(h!==null)D=h.getViewport(_t);else{const Ye=d.getViewSubImage(u,_t);D=Ye.viewport,We===0&&(e.setRenderTargetTextures(T,Ye.colorTexture,Ye.depthStencilTexture),e.setRenderTarget(T))}let Oe=A[We];Oe===void 0&&(Oe=new en,Oe.layers.enable(We),Oe.viewport=new xt,A[We]=Oe),Oe.matrix.fromArray(_t.transform.matrix),Oe.matrix.decompose(Oe.position,Oe.quaternion,Oe.scale),Oe.projectionMatrix.fromArray(_t.projectionMatrix),Oe.projectionMatrixInverse.copy(Oe.projectionMatrix).invert(),Oe.viewport.set(D.x,D.y,D.width,D.height),We===0&&(U.matrix.copy(Oe.matrix),U.matrix.decompose(U.position,U.quaternion,U.scale)),ke===!0&&U.cameras.push(Oe)}const Ce=r.enabledFeatures;if(Ce&&Ce.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&M){d=i.getBinding();const We=d.getDepthInformation(ve[0]);We&&We.isValid&&We.texture&&m.init(We,r.renderState)}if(Ce&&Ce.includes("camera-access")&&M){e.state.unbindTexture(),d=i.getBinding();for(let We=0;We<ve.length;We++){const _t=ve[We].camera;if(_t){let D=p[_t];D||(D=new Eu,p[_t]=D);const Oe=d.getCameraImage(_t);D.sourceTexture=Oe}}}}for(let ve=0;ve<C.length;ve++){const ke=E[ve],Ce=C[ve];ke!==null&&Ce!==void 0&&Ce.update(ke,te,c||a)}ot&&ot(K,te),te.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:te}),_=null}const ht=new Tu;ht.setAnimationLoop(nt),this.setAnimationLoop=function(K){ot=K},this.dispose=function(){}}}const bi=new Cn,Cx=new vt;function Px(n,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,vu(n)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function r(m,p,y,S,T){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(m,p):p.isMeshToonMaterial?(s(m,p),d(m,p)):p.isMeshPhongMaterial?(s(m,p),f(m,p)):p.isMeshStandardMaterial?(s(m,p),u(m,p),p.isMeshPhysicalMaterial&&h(m,p,T)):p.isMeshMatcapMaterial?(s(m,p),_(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),M(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,y,S):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===tn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===tn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const y=e.get(p),S=y.envMap,T=y.envMapRotation;S&&(m.envMap.value=S,bi.copy(T),bi.x*=-1,bi.y*=-1,bi.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(bi.y*=-1,bi.z*=-1),m.envMapRotation.value.setFromMatrix4(Cx.makeRotationFromEuler(bi)),m.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,y,S){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*y,m.scale.value=S*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function f(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function u(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function h(m,p,y){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===tn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=y.texture,m.transmissionSamplerSize.value.set(y.width,y.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,p){p.matcap&&(m.matcap.value=p.matcap)}function M(m,p){const y=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(y.matrixWorld),m.nearDistance.value=y.shadow.camera.near,m.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function Lx(n,e,t,i){let r={},s={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,S){const T=S.program;i.uniformBlockBinding(y,T)}function c(y,S){let T=r[y.id];T===void 0&&(_(y),T=f(y),r[y.id]=T,y.addEventListener("dispose",m));const C=S.program;i.updateUBOMapping(y,C);const E=e.render.frame;s[y.id]!==E&&(u(y),s[y.id]=E)}function f(y){const S=d();y.__bindingPointIndex=S;const T=n.createBuffer(),C=y.__size,E=y.usage;return n.bindBuffer(n.UNIFORM_BUFFER,T),n.bufferData(n.UNIFORM_BUFFER,C,E),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,S,T),T}function d(){for(let y=0;y<o;y++)if(a.indexOf(y)===-1)return a.push(y),y;return Et("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(y){const S=r[y.id],T=y.uniforms,C=y.__cache;n.bindBuffer(n.UNIFORM_BUFFER,S);for(let E=0,L=T.length;E<L;E++){const z=Array.isArray(T[E])?T[E]:[T[E]];for(let b=0,g=z.length;b<g;b++){const A=z[b];if(h(A,E,b,C)===!0){const U=A.__offset,R=Array.isArray(A.value)?A.value:[A.value];let Y=0;for(let q=0;q<R.length;q++){const j=R[q],ie=M(j);typeof j=="number"||typeof j=="boolean"?(A.__data[0]=j,n.bufferSubData(n.UNIFORM_BUFFER,U+Y,A.__data)):j.isMatrix3?(A.__data[0]=j.elements[0],A.__data[1]=j.elements[1],A.__data[2]=j.elements[2],A.__data[3]=0,A.__data[4]=j.elements[3],A.__data[5]=j.elements[4],A.__data[6]=j.elements[5],A.__data[7]=0,A.__data[8]=j.elements[6],A.__data[9]=j.elements[7],A.__data[10]=j.elements[8],A.__data[11]=0):(j.toArray(A.__data,Y),Y+=ie.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,U,A.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function h(y,S,T,C){const E=y.value,L=S+"_"+T;if(C[L]===void 0)return typeof E=="number"||typeof E=="boolean"?C[L]=E:C[L]=E.clone(),!0;{const z=C[L];if(typeof E=="number"||typeof E=="boolean"){if(z!==E)return C[L]=E,!0}else if(z.equals(E)===!1)return z.copy(E),!0}return!1}function _(y){const S=y.uniforms;let T=0;const C=16;for(let L=0,z=S.length;L<z;L++){const b=Array.isArray(S[L])?S[L]:[S[L]];for(let g=0,A=b.length;g<A;g++){const U=b[g],R=Array.isArray(U.value)?U.value:[U.value];for(let Y=0,q=R.length;Y<q;Y++){const j=R[Y],ie=M(j),X=T%C,ae=X%ie.boundary,fe=X+ae;T+=ae,fe!==0&&C-fe<ie.storage&&(T+=C-fe),U.__data=new Float32Array(ie.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=T,T+=ie.storage}}}const E=T%C;return E>0&&(T+=C-E),y.__size=T,y.__cache={},this}function M(y){const S={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(S.boundary=4,S.storage=4):y.isVector2?(S.boundary=8,S.storage=8):y.isVector3||y.isColor?(S.boundary=16,S.storage=12):y.isVector4?(S.boundary=16,S.storage=16):y.isMatrix3?(S.boundary=48,S.storage=48):y.isMatrix4?(S.boundary=64,S.storage=64):y.isTexture?Ve("WebGLRenderer: Texture samplers can not be part of an uniforms group."):Ve("WebGLRenderer: Unsupported uniform value type.",y),S}function m(y){const S=y.target;S.removeEventListener("dispose",m);const T=a.indexOf(S.__bindingPointIndex);a.splice(T,1),n.deleteBuffer(r[S.id]),delete r[S.id],delete s[S.id]}function p(){for(const y in r)n.deleteBuffer(r[y]);a=[],r={},s={}}return{bind:l,update:c,dispose:p}}const Dx=new Uint16Array([11481,15204,11534,15171,11808,15015,12385,14843,12894,14716,13396,14600,13693,14483,13976,14366,14237,14171,14405,13961,14511,13770,14605,13598,14687,13444,14760,13305,14822,13066,14876,12857,14923,12675,14963,12517,14997,12379,15025,12230,15049,12023,15070,11843,15086,11687,15100,11551,15111,11433,15120,11330,15127,11217,15132,11060,15135,10922,15138,10801,15139,10695,15139,10600,13012,14923,13020,14917,13064,14886,13176,14800,13349,14666,13513,14526,13724,14398,13960,14230,14200,14020,14383,13827,14488,13651,14583,13491,14667,13348,14740,13132,14803,12908,14856,12713,14901,12542,14938,12394,14968,12241,14992,12017,15010,11822,15024,11654,15034,11507,15041,11380,15044,11269,15044,11081,15042,10913,15037,10764,15031,10635,15023,10520,15014,10419,15003,10330,13657,14676,13658,14673,13670,14660,13698,14622,13750,14547,13834,14442,13956,14317,14112,14093,14291,13889,14407,13704,14499,13538,14586,13389,14664,13201,14733,12966,14792,12758,14842,12577,14882,12418,14915,12272,14940,12033,14959,11826,14972,11646,14980,11490,14983,11355,14983,11212,14979,11008,14971,10830,14961,10675,14950,10540,14936,10420,14923,10315,14909,10204,14894,10041,14089,14460,14090,14459,14096,14452,14112,14431,14141,14388,14186,14305,14252,14130,14341,13941,14399,13756,14467,13585,14539,13430,14610,13272,14677,13026,14737,12808,14790,12617,14833,12449,14869,12303,14896,12065,14916,11845,14929,11655,14937,11490,14939,11347,14936,11184,14930,10970,14921,10783,14912,10621,14900,10480,14885,10356,14867,10247,14848,10062,14827,9894,14805,9745,14400,14208,14400,14206,14402,14198,14406,14174,14415,14122,14427,14035,14444,13913,14469,13767,14504,13613,14548,13463,14598,13324,14651,13082,14704,12858,14752,12658,14795,12483,14831,12330,14860,12106,14881,11875,14895,11675,14903,11501,14905,11351,14903,11178,14900,10953,14892,10757,14880,10589,14865,10442,14847,10313,14827,10162,14805,9965,14782,9792,14757,9642,14731,9507,14562,13883,14562,13883,14563,13877,14566,13862,14570,13830,14576,13773,14584,13689,14595,13582,14613,13461,14637,13336,14668,13120,14704,12897,14741,12695,14776,12516,14808,12358,14835,12150,14856,11910,14870,11701,14878,11519,14882,11361,14884,11187,14880,10951,14871,10748,14858,10572,14842,10418,14823,10286,14801,10099,14777,9897,14751,9722,14725,9567,14696,9430,14666,9309,14702,13604,14702,13604,14702,13600,14703,13591,14705,13570,14707,13533,14709,13477,14712,13400,14718,13305,14727,13106,14743,12907,14762,12716,14784,12539,14807,12380,14827,12190,14844,11943,14855,11727,14863,11539,14870,11376,14871,11204,14868,10960,14858,10748,14845,10565,14829,10406,14809,10269,14786,10058,14761,9852,14734,9671,14705,9512,14674,9374,14641,9253,14608,9076,14821,13366,14821,13365,14821,13364,14821,13358,14821,13344,14821,13320,14819,13252,14817,13145,14815,13011,14814,12858,14817,12698,14823,12539,14832,12389,14841,12214,14850,11968,14856,11750,14861,11558,14866,11390,14867,11226,14862,10972,14853,10754,14840,10565,14823,10401,14803,10259,14780,10032,14754,9820,14725,9635,14694,9473,14661,9333,14627,9203,14593,8988,14557,8798,14923,13014,14922,13014,14922,13012,14922,13004,14920,12987,14919,12957,14915,12907,14909,12834,14902,12738,14894,12623,14888,12498,14883,12370,14880,12203,14878,11970,14875,11759,14873,11569,14874,11401,14872,11243,14865,10986,14855,10762,14842,10568,14825,10401,14804,10255,14781,10017,14754,9799,14725,9611,14692,9445,14658,9301,14623,9139,14587,8920,14548,8729,14509,8562,15008,12672,15008,12672,15008,12671,15007,12667,15005,12656,15001,12637,14997,12605,14989,12556,14978,12490,14966,12407,14953,12313,14940,12136,14927,11934,14914,11742,14903,11563,14896,11401,14889,11247,14879,10992,14866,10767,14851,10570,14833,10400,14812,10252,14789,10007,14761,9784,14731,9592,14698,9424,14663,9279,14627,9088,14588,8868,14548,8676,14508,8508,14467,8360,15080,12386,15080,12386,15079,12385,15078,12383,15076,12378,15072,12367,15066,12347,15057,12315,15045,12253,15030,12138,15012,11998,14993,11845,14972,11685,14951,11530,14935,11383,14920,11228,14904,10981,14887,10762,14870,10567,14850,10397,14827,10248,14803,9997,14774,9771,14743,9578,14710,9407,14674,9259,14637,9048,14596,8826,14555,8632,14514,8464,14471,8317,14427,8182,15139,12008,15139,12008,15138,12008,15137,12007,15135,12003,15130,11990,15124,11969,15115,11929,15102,11872,15086,11794,15064,11693,15041,11581,15013,11459,14987,11336,14966,11170,14944,10944,14921,10738,14898,10552,14875,10387,14850,10239,14824,9983,14794,9758,14762,9563,14728,9392,14692,9244,14653,9014,14611,8791,14569,8597,14526,8427,14481,8281,14436,8110,14391,7885,15188,11617,15188,11617,15187,11617,15186,11618,15183,11617,15179,11612,15173,11601,15163,11581,15150,11546,15133,11495,15110,11427,15083,11346,15051,11246,15024,11057,14996,10868,14967,10687,14938,10517,14911,10362,14882,10206,14853,9956,14821,9737,14787,9543,14752,9375,14715,9228,14675,8980,14632,8760,14589,8565,14544,8395,14498,8248,14451,8049,14404,7824,14357,7630,15228,11298,15228,11298,15227,11299,15226,11301,15223,11303,15219,11302,15213,11299,15204,11290,15191,11271,15174,11217,15150,11129,15119,11015,15087,10886,15057,10744,15024,10599,14990,10455,14957,10318,14924,10143,14891,9911,14856,9701,14820,9516,14782,9352,14744,9200,14703,8946,14659,8725,14615,8533,14568,8366,14521,8220,14472,7992,14423,7770,14374,7578,14315,7408,15260,10819,15260,10819,15259,10822,15258,10826,15256,10832,15251,10836,15246,10841,15237,10838,15225,10821,15207,10788,15183,10734,15151,10660,15120,10571,15087,10469,15049,10359,15012,10249,14974,10041,14937,9837,14900,9647,14860,9475,14820,9320,14779,9147,14736,8902,14691,8688,14646,8499,14598,8335,14549,8189,14499,7940,14448,7720,14397,7529,14347,7363,14256,7218,15285,10410,15285,10411,15285,10413,15284,10418,15282,10425,15278,10434,15272,10442,15264,10449,15252,10445,15235,10433,15210,10403,15179,10358,15149,10301,15113,10218,15073,10059,15033,9894,14991,9726,14951,9565,14909,9413,14865,9273,14822,9073,14777,8845,14730,8641,14682,8459,14633,8300,14583,8129,14531,7883,14479,7670,14426,7482,14373,7321,14305,7176,14201,6939,15305,9939,15305,9940,15305,9945,15304,9955,15302,9967,15298,9989,15293,10010,15286,10033,15274,10044,15258,10045,15233,10022,15205,9975,15174,9903,15136,9808,15095,9697,15053,9578,15009,9451,14965,9327,14918,9198,14871,8973,14825,8766,14775,8579,14725,8408,14675,8259,14622,8058,14569,7821,14515,7615,14460,7435,14405,7276,14350,7108,14256,6866,14149,6653,15321,9444,15321,9445,15321,9448,15320,9458,15317,9470,15314,9490,15310,9515,15302,9540,15292,9562,15276,9579,15251,9577,15226,9559,15195,9519,15156,9463,15116,9389,15071,9304,15025,9208,14978,9023,14927,8838,14878,8661,14827,8496,14774,8344,14722,8206,14667,7973,14612,7749,14556,7555,14499,7382,14443,7229,14385,7025,14322,6791,14210,6588,14100,6409,15333,8920,15333,8921,15332,8927,15332,8943,15329,8965,15326,9002,15322,9048,15316,9106,15307,9162,15291,9204,15267,9221,15244,9221,15212,9196,15175,9134,15133,9043,15088,8930,15040,8801,14990,8665,14938,8526,14886,8391,14830,8261,14775,8087,14719,7866,14661,7664,14603,7482,14544,7322,14485,7178,14426,6936,14367,6713,14281,6517,14166,6348,14054,6198,15341,8360,15341,8361,15341,8366,15341,8379,15339,8399,15336,8431,15332,8473,15326,8527,15318,8585,15302,8632,15281,8670,15258,8690,15227,8690,15191,8664,15149,8612,15104,8543,15055,8456,15001,8360,14948,8259,14892,8122,14834,7923,14776,7734,14716,7558,14656,7397,14595,7250,14534,7070,14472,6835,14410,6628,14350,6443,14243,6283,14125,6135,14010,5889,15348,7715,15348,7717,15348,7725,15347,7745,15345,7780,15343,7836,15339,7905,15334,8e3,15326,8103,15310,8193,15293,8239,15270,8270,15240,8287,15204,8283,15163,8260,15118,8223,15067,8143,15014,8014,14958,7873,14899,7723,14839,7573,14778,7430,14715,7293,14652,7164,14588,6931,14524,6720,14460,6531,14396,6362,14330,6210,14207,6015,14086,5781,13969,5576,15352,7114,15352,7116,15352,7128,15352,7159,15350,7195,15348,7237,15345,7299,15340,7374,15332,7457,15317,7544,15301,7633,15280,7703,15251,7754,15216,7775,15176,7767,15131,7733,15079,7670,15026,7588,14967,7492,14906,7387,14844,7278,14779,7171,14714,6965,14648,6770,14581,6587,14515,6420,14448,6269,14382,6123,14299,5881,14172,5665,14049,5477,13929,5310,15355,6329,15355,6330,15355,6339,15355,6362,15353,6410,15351,6472,15349,6572,15344,6688,15337,6835,15323,6985,15309,7142,15287,7220,15260,7277,15226,7310,15188,7326,15142,7318,15090,7285,15036,7239,14976,7177,14914,7045,14849,6892,14782,6736,14714,6581,14645,6433,14576,6293,14506,6164,14438,5946,14369,5733,14270,5540,14140,5369,14014,5216,13892,5043,15357,5483,15357,5484,15357,5496,15357,5528,15356,5597,15354,5692,15351,5835,15347,6011,15339,6195,15328,6317,15314,6446,15293,6566,15268,6668,15235,6746,15197,6796,15152,6811,15101,6790,15046,6748,14985,6673,14921,6583,14854,6479,14785,6371,14714,6259,14643,6149,14571,5946,14499,5750,14428,5567,14358,5401,14242,5250,14109,5111,13980,4870,13856,4657,15359,4555,15359,4557,15358,4573,15358,4633,15357,4715,15355,4841,15353,5061,15349,5216,15342,5391,15331,5577,15318,5770,15299,5967,15274,6150,15243,6223,15206,6280,15161,6310,15111,6317,15055,6300,14994,6262,14928,6208,14860,6141,14788,5994,14715,5838,14641,5684,14566,5529,14492,5384,14418,5247,14346,5121,14216,4892,14079,4682,13948,4496,13822,4330,15359,3498,15359,3501,15359,3520,15359,3598,15358,3719,15356,3860,15355,4137,15351,4305,15344,4563,15334,4809,15321,5116,15303,5273,15280,5418,15250,5547,15214,5653,15170,5722,15120,5761,15064,5763,15002,5733,14935,5673,14865,5597,14792,5504,14716,5400,14640,5294,14563,5185,14486,5041,14410,4841,14335,4655,14191,4482,14051,4325,13918,4183,13790,4012,15360,2282,15360,2285,15360,2306,15360,2401,15359,2547,15357,2748,15355,3103,15352,3349,15345,3675,15336,4020,15324,4272,15307,4496,15285,4716,15255,4908,15220,5086,15178,5170,15128,5214,15072,5234,15010,5231,14943,5206,14871,5166,14796,5102,14718,4971,14639,4833,14559,4687,14480,4541,14402,4401,14315,4268,14167,4142,14025,3958,13888,3747,13759,3556,15360,923,15360,925,15360,946,15360,1052,15359,1214,15357,1494,15356,1892,15352,2274,15346,2663,15338,3099,15326,3393,15309,3679,15288,3980,15260,4183,15226,4325,15185,4437,15136,4517,15080,4570,15018,4591,14950,4581,14877,4545,14800,4485,14720,4411,14638,4325,14556,4231,14475,4136,14395,3988,14297,3803,14145,3628,13999,3465,13861,3314,13729,3177,15360,263,15360,264,15360,272,15360,325,15359,407,15358,548,15356,780,15352,1144,15347,1580,15339,2099,15328,2425,15312,2795,15292,3133,15264,3329,15232,3517,15191,3689,15143,3819,15088,3923,15025,3978,14956,3999,14882,3979,14804,3931,14722,3855,14639,3756,14554,3645,14470,3529,14388,3409,14279,3289,14124,3173,13975,3055,13834,2848,13701,2658,15360,49,15360,49,15360,52,15360,75,15359,111,15358,201,15356,283,15353,519,15348,726,15340,1045,15329,1415,15314,1795,15295,2173,15269,2410,15237,2649,15197,2866,15150,3054,15095,3140,15032,3196,14963,3228,14888,3236,14808,3224,14725,3191,14639,3146,14553,3088,14466,2976,14382,2836,14262,2692,14103,2549,13952,2409,13808,2278,13674,2154,15360,4,15360,4,15360,4,15360,13,15359,33,15358,59,15357,112,15353,199,15348,302,15341,456,15331,628,15316,827,15297,1082,15272,1332,15241,1601,15202,1851,15156,2069,15101,2172,15039,2256,14970,2314,14894,2348,14813,2358,14728,2344,14640,2311,14551,2263,14463,2203,14376,2133,14247,2059,14084,1915,13930,1761,13784,1609,13648,1464,15360,0,15360,0,15360,0,15360,3,15359,18,15358,26,15357,53,15354,80,15348,97,15341,165,15332,238,15318,326,15299,427,15275,529,15245,654,15207,771,15161,885,15108,994,15046,1089,14976,1170,14900,1229,14817,1266,14731,1284,14641,1282,14550,1260,14460,1223,14370,1174,14232,1116,14066,1050,13909,981,13761,910,13623,839]);let Bn=null;function Ix(){return Bn===null&&(Bn=new yu(Dx,32,32,Zo,pr),Bn.minFilter=hn,Bn.magFilter=hn,Bn.wrapS=Vn,Bn.wrapT=Vn,Bn.generateMipmaps=!1,Bn.needsUpdate=!0),Bn}class Ux{constructor(e={}){const{canvas:t=qd(),context:i=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:f="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1}=e;this.isWebGLRenderer=!0;let h;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");h=i.getContextAttributes().alpha}else h=a;const _=new Set([Qo,Jo,Ko]),M=new Set([Rn,Ri,Wr,Xr,Yo,$o]),m=new Uint32Array(4),p=new Int32Array(4);let y=null,S=null;const T=[],C=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=oi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const E=this;let L=!1;this._outputColorSpace=an;let z=0,b=0,g=null,A=-1,U=null;const R=new xt,Y=new xt;let q=null;const j=new Qe(0);let ie=0,X=t.width,ae=t.height,fe=1,De=null,je=null;const ot=new xt(0,0,X,ae),nt=new xt(0,0,X,ae);let ht=!1;const K=new ic;let te=!1,ve=!1;const ke=new vt,Ce=new k,qe=new xt,Tt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let We=!1;function _t(){return g===null?fe:1}let D=i;function Oe(x,P){return t.getContext(x,P)}try{const x={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:f,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Xo}`),t.addEventListener("webglcontextlost",re,!1),t.addEventListener("webglcontextrestored",J,!1),t.addEventListener("webglcontextcreationerror",be,!1),D===null){const P="webgl2";if(D=Oe(P,x),D===null)throw Oe(P)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(x){throw x("WebGLRenderer: "+x.message),x}let Ye,ct,Me,Mt,Ae,Be,w,v,V,$,Q,H,Ee,me,Ie,ye,ne,oe,Re,Pe,se,Le,I,xe;function le(){Ye=new G0(D),Ye.init(),Le=new Ex(D,Ye),ct=new I0(D,Ye,e,Le),Me=new yx(D,Ye),ct.reversedDepthBuffer&&u&&Me.buffers.depth.setReversed(!0),Mt=new X0(D),Ae=new lx,Be=new Sx(D,Ye,Me,Ae,ct,Le,Mt),w=new N0(E),v=new V0(E),V=new jf(D),I=new L0(D,V),$=new H0(D,V,Mt,I),Q=new Y0(D,$,V,Mt),Re=new q0(D,ct,Be),ye=new U0(Ae),H=new cx(E,w,v,Ye,ct,I,ye),Ee=new Px(E,Ae),me=new dx,Ie=new gx(Ye),oe=new P0(E,w,v,Me,Q,h,l),ne=new Mx(E,Q,ct),xe=new Lx(D,Mt,ct,Me),Pe=new D0(D,Ye,Mt),se=new W0(D,Ye,Mt),Mt.programs=H.programs,E.capabilities=ct,E.extensions=Ye,E.properties=Ae,E.renderLists=me,E.shadowMap=ne,E.state=Me,E.info=Mt}le();const ue=new Rx(E,D);this.xr=ue,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const x=Ye.get("WEBGL_lose_context");x&&x.loseContext()},this.forceContextRestore=function(){const x=Ye.get("WEBGL_lose_context");x&&x.restoreContext()},this.getPixelRatio=function(){return fe},this.setPixelRatio=function(x){x!==void 0&&(fe=x,this.setSize(X,ae,!1))},this.getSize=function(x){return x.set(X,ae)},this.setSize=function(x,P,N=!0){if(ue.isPresenting){Ve("WebGLRenderer: Can't change size while VR device is presenting.");return}X=x,ae=P,t.width=Math.floor(x*fe),t.height=Math.floor(P*fe),N===!0&&(t.style.width=x+"px",t.style.height=P+"px"),this.setViewport(0,0,x,P)},this.getDrawingBufferSize=function(x){return x.set(X*fe,ae*fe).floor()},this.setDrawingBufferSize=function(x,P,N){X=x,ae=P,fe=N,t.width=Math.floor(x*N),t.height=Math.floor(P*N),this.setViewport(0,0,x,P)},this.getCurrentViewport=function(x){return x.copy(R)},this.getViewport=function(x){return x.copy(ot)},this.setViewport=function(x,P,N,G){x.isVector4?ot.set(x.x,x.y,x.z,x.w):ot.set(x,P,N,G),Me.viewport(R.copy(ot).multiplyScalar(fe).round())},this.getScissor=function(x){return x.copy(nt)},this.setScissor=function(x,P,N,G){x.isVector4?nt.set(x.x,x.y,x.z,x.w):nt.set(x,P,N,G),Me.scissor(Y.copy(nt).multiplyScalar(fe).round())},this.getScissorTest=function(){return ht},this.setScissorTest=function(x){Me.setScissorTest(ht=x)},this.setOpaqueSort=function(x){De=x},this.setTransparentSort=function(x){je=x},this.getClearColor=function(x){return x.copy(oe.getClearColor())},this.setClearColor=function(){oe.setClearColor(...arguments)},this.getClearAlpha=function(){return oe.getClearAlpha()},this.setClearAlpha=function(){oe.setClearAlpha(...arguments)},this.clear=function(x=!0,P=!0,N=!0){let G=0;if(x){let O=!1;if(g!==null){const ee=g.texture.format;O=_.has(ee)}if(O){const ee=g.texture.type,he=M.has(ee),ge=oe.getClearColor(),pe=oe.getClearAlpha(),Se=ge.r,we=ge.g,ce=ge.b;he?(m[0]=Se,m[1]=we,m[2]=ce,m[3]=pe,D.clearBufferuiv(D.COLOR,0,m)):(p[0]=Se,p[1]=we,p[2]=ce,p[3]=pe,D.clearBufferiv(D.COLOR,0,p))}else G|=D.COLOR_BUFFER_BIT}P&&(G|=D.DEPTH_BUFFER_BIT),N&&(G|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),D.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",re,!1),t.removeEventListener("webglcontextrestored",J,!1),t.removeEventListener("webglcontextcreationerror",be,!1),oe.dispose(),me.dispose(),Ie.dispose(),Ae.dispose(),w.dispose(),v.dispose(),Q.dispose(),I.dispose(),xe.dispose(),H.dispose(),ue.dispose(),ue.removeEventListener("sessionstart",br),ue.removeEventListener("sessionend",Di),kt.stop()};function re(x){x.preventDefault(),zc("WebGLRenderer: Context Lost."),L=!0}function J(){zc("WebGLRenderer: Context Restored."),L=!1;const x=Mt.autoReset,P=ne.enabled,N=ne.autoUpdate,G=ne.needsUpdate,O=ne.type;le(),Mt.autoReset=x,ne.enabled=P,ne.autoUpdate=N,ne.needsUpdate=G,ne.type=O}function be(x){Et("WebGLRenderer: A WebGL context could not be created. Reason: ",x.statusMessage)}function Ue(x){const P=x.target;P.removeEventListener("dispose",Ue),pt(P)}function pt(x){Ke(x),Ae.remove(x)}function Ke(x){const P=Ae.get(x).programs;P!==void 0&&(P.forEach(function(N){H.releaseProgram(N)}),x.isShaderMaterial&&H.releaseShaderCache(x))}this.renderBufferDirect=function(x,P,N,G,O,ee){P===null&&(P=Tt);const he=O.isMesh&&O.matrixWorld.determinant()<0,ge=sa(x,P,N,G,O);Me.setMaterial(G,he);let pe=N.index,Se=1;if(G.wireframe===!0){if(pe=$.getWireframeAttribute(N),pe===void 0)return;Se=2}const we=N.drawRange,ce=N.attributes.position;let Fe=we.start*Se,Ze=(we.start+we.count)*Se;ee!==null&&(Fe=Math.max(Fe,ee.start*Se),Ze=Math.min(Ze,(ee.start+ee.count)*Se)),pe!==null?(Fe=Math.max(Fe,0),Ze=Math.min(Ze,pe.count)):ce!=null&&(Fe=Math.max(Fe,0),Ze=Math.min(Ze,ce.count));const at=Ze-Fe;if(at<0||at===1/0)return;I.setup(O,G,ge,N,pe);let lt,ut=Pe;if(pe!==null&&(lt=V.get(pe),ut=se,ut.setIndex(lt)),O.isMesh)G.wireframe===!0?(Me.setLineWidth(G.wireframeLinewidth*_t()),ut.setMode(D.LINES)):ut.setMode(D.TRIANGLES);else if(O.isLine){let Ne=G.linewidth;Ne===void 0&&(Ne=1),Me.setLineWidth(Ne*_t()),O.isLineSegments?ut.setMode(D.LINES):O.isLineLoop?ut.setMode(D.LINE_LOOP):ut.setMode(D.LINE_STRIP)}else O.isPoints?ut.setMode(D.POINTS):O.isSprite&&ut.setMode(D.TRIANGLES);if(O.isBatchedMesh)if(O._multiDrawInstances!==null)$r("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ut.renderMultiDrawInstances(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount,O._multiDrawInstances);else if(Ye.get("WEBGL_multi_draw"))ut.renderMultiDraw(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount);else{const Ne=O._multiDrawStarts,dt=O._multiDrawCounts,et=O._multiDrawCount,Ht=pe?V.get(pe).bytesPerElement:1,Dn=Ae.get(G).currentProgram.getUniforms();for(let Wt=0;Wt<et;Wt++)Dn.setValue(D,"_gl_DrawID",Wt),ut.render(Ne[Wt]/Ht,dt[Wt])}else if(O.isInstancedMesh)ut.renderInstances(Fe,at,O.count);else if(N.isInstancedBufferGeometry){const Ne=N._maxInstanceCount!==void 0?N._maxInstanceCount:1/0,dt=Math.min(N.instanceCount,Ne);ut.renderInstances(Fe,at,dt)}else ut.render(Fe,at)};function Qt(x,P,N){x.transparent===!0&&x.side===kn&&x.forceSinglePass===!1?(x.side=tn,x.needsUpdate=!0,Yn(x,P,N),x.side=li,x.needsUpdate=!0,Yn(x,P,N),x.side=kn):Yn(x,P,N)}this.compile=function(x,P,N=null){N===null&&(N=x),S=Ie.get(N),S.init(P),C.push(S),N.traverseVisible(function(O){O.isLight&&O.layers.test(P.layers)&&(S.pushLight(O),O.castShadow&&S.pushShadow(O))}),x!==N&&x.traverseVisible(function(O){O.isLight&&O.layers.test(P.layers)&&(S.pushLight(O),O.castShadow&&S.pushShadow(O))}),S.setupLights();const G=new Set;return x.traverse(function(O){if(!(O.isMesh||O.isPoints||O.isLine||O.isSprite))return;const ee=O.material;if(ee)if(Array.isArray(ee))for(let he=0;he<ee.length;he++){const ge=ee[he];Qt(ge,N,O),G.add(ge)}else Qt(ee,N,O),G.add(ee)}),S=C.pop(),G},this.compileAsync=function(x,P,N=null){const G=this.compile(x,P,N);return new Promise(O=>{function ee(){if(G.forEach(function(he){Ae.get(he).currentProgram.isReady()&&G.delete(he)}),G.size===0){O(x);return}setTimeout(ee,10)}Ye.get("KHR_parallel_shader_compile")!==null?ee():setTimeout(ee,10)})};let Ot=null;function Xn(x){Ot&&Ot(x)}function br(){kt.stop()}function Di(){kt.start()}const kt=new Tu;kt.setAnimationLoop(Xn),typeof self<"u"&&kt.setContext(self),this.setAnimationLoop=function(x){Ot=x,ue.setAnimationLoop(x),x===null?kt.stop():kt.start()},ue.addEventListener("sessionstart",br),ue.addEventListener("sessionend",Di),this.render=function(x,P){if(P!==void 0&&P.isCamera!==!0){Et("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(L===!0)return;if(x.matrixWorldAutoUpdate===!0&&x.updateMatrixWorld(),P.parent===null&&P.matrixWorldAutoUpdate===!0&&P.updateMatrixWorld(),ue.enabled===!0&&ue.isPresenting===!0&&(ue.cameraAutoUpdate===!0&&ue.updateCamera(P),P=ue.getCamera()),x.isScene===!0&&x.onBeforeRender(E,x,P,g),S=Ie.get(x,C.length),S.init(P),C.push(S),ke.multiplyMatrices(P.projectionMatrix,P.matrixWorldInverse),K.setFromProjectionMatrix(ke,Tn,P.reversedDepth),ve=this.localClippingEnabled,te=ye.init(this.clippingPlanes,ve),y=me.get(x,T.length),y.init(),T.push(y),ue.enabled===!0&&ue.isPresenting===!0){const ee=E.xr.getDepthSensingMesh();ee!==null&&yr(ee,P,-1/0,E.sortObjects)}yr(x,P,0,E.sortObjects),y.finish(),E.sortObjects===!0&&y.sort(De,je),We=ue.enabled===!1||ue.isPresenting===!1||ue.hasDepthSensing()===!1,We&&oe.addToRenderList(y,x),this.info.render.frame++,te===!0&&ye.beginShadows();const N=S.state.shadowsArray;ne.render(N,x,P),te===!0&&ye.endShadows(),this.info.autoReset===!0&&this.info.reset();const G=y.opaque,O=y.transmissive;if(S.setupLights(),P.isArrayCamera){const ee=P.cameras;if(O.length>0)for(let he=0,ge=ee.length;he<ge;he++){const pe=ee[he];qn(G,O,x,pe)}We&&oe.render(x);for(let he=0,ge=ee.length;he<ge;he++){const pe=ee[he];hi(y,x,pe,pe.viewport)}}else O.length>0&&qn(G,O,x,P),We&&oe.render(x),hi(y,x,P);g!==null&&b===0&&(Be.updateMultisampleRenderTarget(g),Be.updateRenderTargetMipmap(g)),x.isScene===!0&&x.onAfterRender(E,x,P),I.resetDefaultState(),A=-1,U=null,C.pop(),C.length>0?(S=C[C.length-1],te===!0&&ye.setGlobalState(E.clippingPlanes,S.state.camera)):S=null,T.pop(),T.length>0?y=T[T.length-1]:y=null};function yr(x,P,N,G){if(x.visible===!1)return;if(x.layers.test(P.layers)){if(x.isGroup)N=x.renderOrder;else if(x.isLOD)x.autoUpdate===!0&&x.update(P);else if(x.isLight)S.pushLight(x),x.castShadow&&S.pushShadow(x);else if(x.isSprite){if(!x.frustumCulled||K.intersectsSprite(x)){G&&qe.setFromMatrixPosition(x.matrixWorld).applyMatrix4(ke);const he=Q.update(x),ge=x.material;ge.visible&&y.push(x,he,ge,N,qe.z,null)}}else if((x.isMesh||x.isLine||x.isPoints)&&(!x.frustumCulled||K.intersectsObject(x))){const he=Q.update(x),ge=x.material;if(G&&(x.boundingSphere!==void 0?(x.boundingSphere===null&&x.computeBoundingSphere(),qe.copy(x.boundingSphere.center)):(he.boundingSphere===null&&he.computeBoundingSphere(),qe.copy(he.boundingSphere.center)),qe.applyMatrix4(x.matrixWorld).applyMatrix4(ke)),Array.isArray(ge)){const pe=he.groups;for(let Se=0,we=pe.length;Se<we;Se++){const ce=pe[Se],Fe=ge[ce.materialIndex];Fe&&Fe.visible&&y.push(x,he,Fe,N,qe.z,ce)}}else ge.visible&&y.push(x,he,ge,N,qe.z,null)}}const ee=x.children;for(let he=0,ge=ee.length;he<ge;he++)yr(ee[he],P,N,G)}function hi(x,P,N,G){const{opaque:O,transmissive:ee,transparent:he}=x;S.setupLightsView(N),te===!0&&ye.setGlobalState(E.clippingPlanes,N),G&&Me.viewport(R.copy(G)),O.length>0&&Ln(O,P,N),ee.length>0&&Ln(ee,P,N),he.length>0&&Ln(he,P,N),Me.buffers.depth.setTest(!0),Me.buffers.depth.setMask(!0),Me.buffers.color.setMask(!0),Me.setPolygonOffset(!1)}function qn(x,P,N,G){if((N.isScene===!0?N.overrideMaterial:null)!==null)return;S.state.transmissionRenderTarget[G.id]===void 0&&(S.state.transmissionRenderTarget[G.id]=new Ci(1,1,{generateMipmaps:!0,type:Ye.has("EXT_color_buffer_half_float")||Ye.has("EXT_color_buffer_float")?pr:Rn,minFilter:Ei,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:st.workingColorSpace}));const ee=S.state.transmissionRenderTarget[G.id],he=G.viewport||R;ee.setSize(he.z*E.transmissionResolutionScale,he.w*E.transmissionResolutionScale);const ge=E.getRenderTarget(),pe=E.getActiveCubeFace(),Se=E.getActiveMipmapLevel();E.setRenderTarget(ee),E.getClearColor(j),ie=E.getClearAlpha(),ie<1&&E.setClearColor(16777215,.5),E.clear(),We&&oe.render(N);const we=E.toneMapping;E.toneMapping=oi;const ce=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),S.setupLightsView(G),te===!0&&ye.setGlobalState(E.clippingPlanes,G),Ln(x,N,G),Be.updateMultisampleRenderTarget(ee),Be.updateRenderTargetMipmap(ee),Ye.has("WEBGL_multisampled_render_to_texture")===!1){let Fe=!1;for(let Ze=0,at=P.length;Ze<at;Ze++){const lt=P[Ze],{object:ut,geometry:Ne,material:dt,group:et}=lt;if(dt.side===kn&&ut.layers.test(G.layers)){const Ht=dt.side;dt.side=tn,dt.needsUpdate=!0,ts(ut,N,G,Ne,dt,et),dt.side=Ht,dt.needsUpdate=!0,Fe=!0}}Fe===!0&&(Be.updateMultisampleRenderTarget(ee),Be.updateRenderTargetMipmap(ee))}E.setRenderTarget(ge,pe,Se),E.setClearColor(j,ie),ce!==void 0&&(G.viewport=ce),E.toneMapping=we}function Ln(x,P,N){const G=P.isScene===!0?P.overrideMaterial:null;for(let O=0,ee=x.length;O<ee;O++){const he=x[O],{object:ge,geometry:pe,group:Se}=he;let we=he.material;we.allowOverride===!0&&G!==null&&(we=G),ge.layers.test(N.layers)&&ts(ge,P,N,pe,we,Se)}}function ts(x,P,N,G,O,ee){x.onBeforeRender(E,P,N,G,O,ee),x.modelViewMatrix.multiplyMatrices(N.matrixWorldInverse,x.matrixWorld),x.normalMatrix.getNormalMatrix(x.modelViewMatrix),O.onBeforeRender(E,P,N,G,x,ee),O.transparent===!0&&O.side===kn&&O.forceSinglePass===!1?(O.side=tn,O.needsUpdate=!0,E.renderBufferDirect(N,P,G,O,x,ee),O.side=li,O.needsUpdate=!0,E.renderBufferDirect(N,P,G,O,x,ee),O.side=kn):E.renderBufferDirect(N,P,G,O,x,ee),x.onAfterRender(E,P,N,G,O,ee)}function Yn(x,P,N){P.isScene!==!0&&(P=Tt);const G=Ae.get(x),O=S.state.lights,ee=S.state.shadowsArray,he=O.state.version,ge=H.getParameters(x,O.state,ee,P,N),pe=H.getProgramCacheKey(ge);let Se=G.programs;G.environment=x.isMeshStandardMaterial?P.environment:null,G.fog=P.fog,G.envMap=(x.isMeshStandardMaterial?v:w).get(x.envMap||G.environment),G.envMapRotation=G.environment!==null&&x.envMap===null?P.environmentRotation:x.envMapRotation,Se===void 0&&(x.addEventListener("dispose",Ue),Se=new Map,G.programs=Se);let we=Se.get(pe);if(we!==void 0){if(G.currentProgram===we&&G.lightsStateVersion===he)return is(x,ge),we}else ge.uniforms=H.getUniforms(x),x.onBeforeCompile(ge,E),we=H.acquireProgram(ge,pe),Se.set(pe,we),G.uniforms=ge.uniforms;const ce=G.uniforms;return(!x.isShaderMaterial&&!x.isRawShaderMaterial||x.clipping===!0)&&(ce.clippingPlanes=ye.uniform),is(x,ge),G.needsLights=ss(x),G.lightsStateVersion=he,G.needsLights&&(ce.ambientLightColor.value=O.state.ambient,ce.lightProbe.value=O.state.probe,ce.directionalLights.value=O.state.directional,ce.directionalLightShadows.value=O.state.directionalShadow,ce.spotLights.value=O.state.spot,ce.spotLightShadows.value=O.state.spotShadow,ce.rectAreaLights.value=O.state.rectArea,ce.ltc_1.value=O.state.rectAreaLTC1,ce.ltc_2.value=O.state.rectAreaLTC2,ce.pointLights.value=O.state.point,ce.pointLightShadows.value=O.state.pointShadow,ce.hemisphereLights.value=O.state.hemi,ce.directionalShadowMap.value=O.state.directionalShadowMap,ce.directionalShadowMatrix.value=O.state.directionalShadowMatrix,ce.spotShadowMap.value=O.state.spotShadowMap,ce.spotLightMatrix.value=O.state.spotLightMatrix,ce.spotLightMap.value=O.state.spotLightMap,ce.pointShadowMap.value=O.state.pointShadowMap,ce.pointShadowMatrix.value=O.state.pointShadowMatrix),G.currentProgram=we,G.uniformsList=null,we}function ns(x){if(x.uniformsList===null){const P=x.currentProgram.getUniforms();x.uniformsList=Us.seqWithValue(P.seq,x.uniforms)}return x.uniformsList}function is(x,P){const N=Ae.get(x);N.outputColorSpace=P.outputColorSpace,N.batching=P.batching,N.batchingColor=P.batchingColor,N.instancing=P.instancing,N.instancingColor=P.instancingColor,N.instancingMorph=P.instancingMorph,N.skinning=P.skinning,N.morphTargets=P.morphTargets,N.morphNormals=P.morphNormals,N.morphColors=P.morphColors,N.morphTargetsCount=P.morphTargetsCount,N.numClippingPlanes=P.numClippingPlanes,N.numIntersection=P.numClipIntersection,N.vertexAlphas=P.vertexAlphas,N.vertexTangents=P.vertexTangents,N.toneMapping=P.toneMapping}function sa(x,P,N,G,O){P.isScene!==!0&&(P=Tt),Be.resetTextureUnits();const ee=P.fog,he=G.isMeshStandardMaterial?P.environment:null,ge=g===null?E.outputColorSpace:g.isXRRenderTarget===!0?g.texture.colorSpace:lr,pe=(G.isMeshStandardMaterial?v:w).get(G.envMap||he),Se=G.vertexColors===!0&&!!N.attributes.color&&N.attributes.color.itemSize===4,we=!!N.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),ce=!!N.morphAttributes.position,Fe=!!N.morphAttributes.normal,Ze=!!N.morphAttributes.color;let at=oi;G.toneMapped&&(g===null||g.isXRRenderTarget===!0)&&(at=E.toneMapping);const lt=N.morphAttributes.position||N.morphAttributes.normal||N.morphAttributes.color,ut=lt!==void 0?lt.length:0,Ne=Ae.get(G),dt=S.state.lights;if(te===!0&&(ve===!0||x!==U)){const ft=x===U&&G.id===A;ye.setState(G,x,ft)}let et=!1;G.version===Ne.__version?(Ne.needsLights&&Ne.lightsStateVersion!==dt.state.version||Ne.outputColorSpace!==ge||O.isBatchedMesh&&Ne.batching===!1||!O.isBatchedMesh&&Ne.batching===!0||O.isBatchedMesh&&Ne.batchingColor===!0&&O.colorTexture===null||O.isBatchedMesh&&Ne.batchingColor===!1&&O.colorTexture!==null||O.isInstancedMesh&&Ne.instancing===!1||!O.isInstancedMesh&&Ne.instancing===!0||O.isSkinnedMesh&&Ne.skinning===!1||!O.isSkinnedMesh&&Ne.skinning===!0||O.isInstancedMesh&&Ne.instancingColor===!0&&O.instanceColor===null||O.isInstancedMesh&&Ne.instancingColor===!1&&O.instanceColor!==null||O.isInstancedMesh&&Ne.instancingMorph===!0&&O.morphTexture===null||O.isInstancedMesh&&Ne.instancingMorph===!1&&O.morphTexture!==null||Ne.envMap!==pe||G.fog===!0&&Ne.fog!==ee||Ne.numClippingPlanes!==void 0&&(Ne.numClippingPlanes!==ye.numPlanes||Ne.numIntersection!==ye.numIntersection)||Ne.vertexAlphas!==Se||Ne.vertexTangents!==we||Ne.morphTargets!==ce||Ne.morphNormals!==Fe||Ne.morphColors!==Ze||Ne.toneMapping!==at||Ne.morphTargetsCount!==ut)&&(et=!0):(et=!0,Ne.__version=G.version);let Ht=Ne.currentProgram;et===!0&&(Ht=Yn(G,P,O));let Dn=!1,Wt=!1,$n=!1;const bt=Ht.getUniforms(),Te=Ne.uniforms;if(Me.useProgram(Ht.program)&&(Dn=!0,Wt=!0,$n=!0),G.id!==A&&(A=G.id,Wt=!0),Dn||U!==x){Me.buffers.depth.getReversed()&&x.reversedDepth!==!0&&(x._reversedDepth=!0,x.updateProjectionMatrix()),bt.setValue(D,"projectionMatrix",x.projectionMatrix),bt.setValue(D,"viewMatrix",x.matrixWorldInverse);const ze=bt.map.cameraPosition;ze!==void 0&&ze.setValue(D,Ce.setFromMatrixPosition(x.matrixWorld)),ct.logarithmicDepthBuffer&&bt.setValue(D,"logDepthBufFC",2/(Math.log(x.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&bt.setValue(D,"isOrthographic",x.isOrthographicCamera===!0),U!==x&&(U=x,Wt=!0,$n=!0)}if(O.isSkinnedMesh){bt.setOptional(D,O,"bindMatrix"),bt.setOptional(D,O,"bindMatrixInverse");const ft=O.skeleton;ft&&(ft.boneTexture===null&&ft.computeBoneTexture(),bt.setValue(D,"boneTexture",ft.boneTexture,Be))}O.isBatchedMesh&&(bt.setOptional(D,O,"batchingTexture"),bt.setValue(D,"batchingTexture",O._matricesTexture,Be),bt.setOptional(D,O,"batchingIdTexture"),bt.setValue(D,"batchingIdTexture",O._indirectTexture,Be),bt.setOptional(D,O,"batchingColorTexture"),O._colorsTexture!==null&&bt.setValue(D,"batchingColorTexture",O._colorsTexture,Be));const it=N.morphAttributes;if((it.position!==void 0||it.normal!==void 0||it.color!==void 0)&&Re.update(O,N,Ht),(Wt||Ne.receiveShadow!==O.receiveShadow)&&(Ne.receiveShadow=O.receiveShadow,bt.setValue(D,"receiveShadow",O.receiveShadow)),G.isMeshGouraudMaterial&&G.envMap!==null&&(Te.envMap.value=pe,Te.flipEnvMap.value=pe.isCubeTexture&&pe.isRenderTargetTexture===!1?-1:1),G.isMeshStandardMaterial&&G.envMap===null&&P.environment!==null&&(Te.envMapIntensity.value=P.environmentIntensity),Te.dfgLUT!==void 0&&(Te.dfgLUT.value=Ix()),Wt&&(bt.setValue(D,"toneMappingExposure",E.toneMappingExposure),Ne.needsLights&&rs(Te,$n),ee&&G.fog===!0&&Ee.refreshFogUniforms(Te,ee),Ee.refreshMaterialUniforms(Te,G,fe,ae,S.state.transmissionRenderTarget[x.id]),Us.upload(D,ns(Ne),Te,Be)),G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(Us.upload(D,ns(Ne),Te,Be),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&bt.setValue(D,"center",O.center),bt.setValue(D,"modelViewMatrix",O.modelViewMatrix),bt.setValue(D,"normalMatrix",O.normalMatrix),bt.setValue(D,"modelMatrix",O.matrixWorld),G.isShaderMaterial||G.isRawShaderMaterial){const ft=G.uniformsGroups;for(let ze=0,$t=ft.length;ze<$t;ze++){const wt=ft[ze];xe.update(wt,Ht),xe.bind(wt,Ht)}}return Ht}function rs(x,P){x.ambientLightColor.needsUpdate=P,x.lightProbe.needsUpdate=P,x.directionalLights.needsUpdate=P,x.directionalLightShadows.needsUpdate=P,x.pointLights.needsUpdate=P,x.pointLightShadows.needsUpdate=P,x.spotLights.needsUpdate=P,x.spotLightShadows.needsUpdate=P,x.rectAreaLights.needsUpdate=P,x.hemisphereLights.needsUpdate=P}function ss(x){return x.isMeshLambertMaterial||x.isMeshToonMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isShadowMaterial||x.isShaderMaterial&&x.lights===!0}this.getActiveCubeFace=function(){return z},this.getActiveMipmapLevel=function(){return b},this.getRenderTarget=function(){return g},this.setRenderTargetTextures=function(x,P,N){const G=Ae.get(x);G.__autoAllocateDepthBuffer=x.resolveDepthBuffer===!1,G.__autoAllocateDepthBuffer===!1&&(G.__useRenderToTexture=!1),Ae.get(x.texture).__webglTexture=P,Ae.get(x.depthTexture).__webglTexture=G.__autoAllocateDepthBuffer?void 0:N,G.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(x,P){const N=Ae.get(x);N.__webglFramebuffer=P,N.__useDefaultFramebuffer=P===void 0};const B=D.createFramebuffer();this.setRenderTarget=function(x,P=0,N=0){g=x,z=P,b=N;let G=!0,O=null,ee=!1,he=!1;if(x){const pe=Ae.get(x);if(pe.__useDefaultFramebuffer!==void 0)Me.bindFramebuffer(D.FRAMEBUFFER,null),G=!1;else if(pe.__webglFramebuffer===void 0)Be.setupRenderTarget(x);else if(pe.__hasExternalTextures)Be.rebindTextures(x,Ae.get(x.texture).__webglTexture,Ae.get(x.depthTexture).__webglTexture);else if(x.depthBuffer){const ce=x.depthTexture;if(pe.__boundDepthTexture!==ce){if(ce!==null&&Ae.has(ce)&&(x.width!==ce.image.width||x.height!==ce.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Be.setupDepthRenderbuffer(x)}}const Se=x.texture;(Se.isData3DTexture||Se.isDataArrayTexture||Se.isCompressedArrayTexture)&&(he=!0);const we=Ae.get(x).__webglFramebuffer;x.isWebGLCubeRenderTarget?(Array.isArray(we[P])?O=we[P][N]:O=we[P],ee=!0):x.samples>0&&Be.useMultisampledRTT(x)===!1?O=Ae.get(x).__webglMultisampledFramebuffer:Array.isArray(we)?O=we[N]:O=we,R.copy(x.viewport),Y.copy(x.scissor),q=x.scissorTest}else R.copy(ot).multiplyScalar(fe).floor(),Y.copy(nt).multiplyScalar(fe).floor(),q=ht;if(N!==0&&(O=B),Me.bindFramebuffer(D.FRAMEBUFFER,O)&&G&&Me.drawBuffers(x,O),Me.viewport(R),Me.scissor(Y),Me.setScissorTest(q),ee){const pe=Ae.get(x.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+P,pe.__webglTexture,N)}else if(he){const pe=P;for(let Se=0;Se<x.textures.length;Se++){const we=Ae.get(x.textures[Se]);D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0+Se,we.__webglTexture,N,pe)}}else if(x!==null&&N!==0){const pe=Ae.get(x.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,pe.__webglTexture,N)}A=-1},this.readRenderTargetPixels=function(x,P,N,G,O,ee,he,ge=0){if(!(x&&x.isWebGLRenderTarget)){Et("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let pe=Ae.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&he!==void 0&&(pe=pe[he]),pe){Me.bindFramebuffer(D.FRAMEBUFFER,pe);try{const Se=x.textures[ge],we=Se.format,ce=Se.type;if(!ct.textureFormatReadable(we)){Et("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ct.textureTypeReadable(ce)){Et("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}P>=0&&P<=x.width-G&&N>=0&&N<=x.height-O&&(x.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+ge),D.readPixels(P,N,G,O,Le.convert(we),Le.convert(ce),ee))}finally{const Se=g!==null?Ae.get(g).__webglFramebuffer:null;Me.bindFramebuffer(D.FRAMEBUFFER,Se)}}},this.readRenderTargetPixelsAsync=async function(x,P,N,G,O,ee,he,ge=0){if(!(x&&x.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let pe=Ae.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&he!==void 0&&(pe=pe[he]),pe)if(P>=0&&P<=x.width-G&&N>=0&&N<=x.height-O){Me.bindFramebuffer(D.FRAMEBUFFER,pe);const Se=x.textures[ge],we=Se.format,ce=Se.type;if(!ct.textureFormatReadable(we))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ct.textureTypeReadable(ce))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Fe=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,Fe),D.bufferData(D.PIXEL_PACK_BUFFER,ee.byteLength,D.STREAM_READ),x.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+ge),D.readPixels(P,N,G,O,Le.convert(we),Le.convert(ce),0);const Ze=g!==null?Ae.get(g).__webglFramebuffer:null;Me.bindFramebuffer(D.FRAMEBUFFER,Ze);const at=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await Yd(D,at,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,Fe),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,ee),D.deleteBuffer(Fe),D.deleteSync(at),ee}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(x,P=null,N=0){const G=Math.pow(2,-N),O=Math.floor(x.image.width*G),ee=Math.floor(x.image.height*G),he=P!==null?P.x:0,ge=P!==null?P.y:0;Be.setTexture2D(x,0),D.copyTexSubImage2D(D.TEXTURE_2D,N,0,0,he,ge,O,ee),Me.unbindTexture()};const W=D.createFramebuffer(),Z=D.createFramebuffer();this.copyTextureToTexture=function(x,P,N=null,G=null,O=0,ee=null){ee===null&&(O!==0?($r("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ee=O,O=0):ee=0);let he,ge,pe,Se,we,ce,Fe,Ze,at;const lt=x.isCompressedTexture?x.mipmaps[ee]:x.image;if(N!==null)he=N.max.x-N.min.x,ge=N.max.y-N.min.y,pe=N.isBox3?N.max.z-N.min.z:1,Se=N.min.x,we=N.min.y,ce=N.isBox3?N.min.z:0;else{const it=Math.pow(2,-O);he=Math.floor(lt.width*it),ge=Math.floor(lt.height*it),x.isDataArrayTexture?pe=lt.depth:x.isData3DTexture?pe=Math.floor(lt.depth*it):pe=1,Se=0,we=0,ce=0}G!==null?(Fe=G.x,Ze=G.y,at=G.z):(Fe=0,Ze=0,at=0);const ut=Le.convert(P.format),Ne=Le.convert(P.type);let dt;P.isData3DTexture?(Be.setTexture3D(P,0),dt=D.TEXTURE_3D):P.isDataArrayTexture||P.isCompressedArrayTexture?(Be.setTexture2DArray(P,0),dt=D.TEXTURE_2D_ARRAY):(Be.setTexture2D(P,0),dt=D.TEXTURE_2D),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,P.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,P.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,P.unpackAlignment);const et=D.getParameter(D.UNPACK_ROW_LENGTH),Ht=D.getParameter(D.UNPACK_IMAGE_HEIGHT),Dn=D.getParameter(D.UNPACK_SKIP_PIXELS),Wt=D.getParameter(D.UNPACK_SKIP_ROWS),$n=D.getParameter(D.UNPACK_SKIP_IMAGES);D.pixelStorei(D.UNPACK_ROW_LENGTH,lt.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,lt.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,Se),D.pixelStorei(D.UNPACK_SKIP_ROWS,we),D.pixelStorei(D.UNPACK_SKIP_IMAGES,ce);const bt=x.isDataArrayTexture||x.isData3DTexture,Te=P.isDataArrayTexture||P.isData3DTexture;if(x.isDepthTexture){const it=Ae.get(x),ft=Ae.get(P),ze=Ae.get(it.__renderTarget),$t=Ae.get(ft.__renderTarget);Me.bindFramebuffer(D.READ_FRAMEBUFFER,ze.__webglFramebuffer),Me.bindFramebuffer(D.DRAW_FRAMEBUFFER,$t.__webglFramebuffer);for(let wt=0;wt<pe;wt++)bt&&(D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Ae.get(x).__webglTexture,O,ce+wt),D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Ae.get(P).__webglTexture,ee,at+wt)),D.blitFramebuffer(Se,we,he,ge,Fe,Ze,he,ge,D.DEPTH_BUFFER_BIT,D.NEAREST);Me.bindFramebuffer(D.READ_FRAMEBUFFER,null),Me.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else if(O!==0||x.isRenderTargetTexture||Ae.has(x)){const it=Ae.get(x),ft=Ae.get(P);Me.bindFramebuffer(D.READ_FRAMEBUFFER,W),Me.bindFramebuffer(D.DRAW_FRAMEBUFFER,Z);for(let ze=0;ze<pe;ze++)bt?D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,it.__webglTexture,O,ce+ze):D.framebufferTexture2D(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,it.__webglTexture,O),Te?D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,ft.__webglTexture,ee,at+ze):D.framebufferTexture2D(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,ft.__webglTexture,ee),O!==0?D.blitFramebuffer(Se,we,he,ge,Fe,Ze,he,ge,D.COLOR_BUFFER_BIT,D.NEAREST):Te?D.copyTexSubImage3D(dt,ee,Fe,Ze,at+ze,Se,we,he,ge):D.copyTexSubImage2D(dt,ee,Fe,Ze,Se,we,he,ge);Me.bindFramebuffer(D.READ_FRAMEBUFFER,null),Me.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else Te?x.isDataTexture||x.isData3DTexture?D.texSubImage3D(dt,ee,Fe,Ze,at,he,ge,pe,ut,Ne,lt.data):P.isCompressedArrayTexture?D.compressedTexSubImage3D(dt,ee,Fe,Ze,at,he,ge,pe,ut,lt.data):D.texSubImage3D(dt,ee,Fe,Ze,at,he,ge,pe,ut,Ne,lt):x.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,ee,Fe,Ze,he,ge,ut,Ne,lt.data):x.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,ee,Fe,Ze,lt.width,lt.height,ut,lt.data):D.texSubImage2D(D.TEXTURE_2D,ee,Fe,Ze,he,ge,ut,Ne,lt);D.pixelStorei(D.UNPACK_ROW_LENGTH,et),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,Ht),D.pixelStorei(D.UNPACK_SKIP_PIXELS,Dn),D.pixelStorei(D.UNPACK_SKIP_ROWS,Wt),D.pixelStorei(D.UNPACK_SKIP_IMAGES,$n),ee===0&&P.generateMipmaps&&D.generateMipmap(dt),Me.unbindTexture()},this.initRenderTarget=function(x){Ae.get(x).__webglFramebuffer===void 0&&Be.setupRenderTarget(x)},this.initTexture=function(x){x.isCubeTexture?Be.setTextureCube(x,0):x.isData3DTexture?Be.setTexture3D(x,0):x.isDataArrayTexture||x.isCompressedArrayTexture?Be.setTexture2DArray(x,0):Be.setTexture2D(x,0),Me.unbindTexture()},this.resetState=function(){z=0,b=0,g=null,Me.reset(),I.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Tn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=st._getDrawingBufferColorSpace(e),t.unpackColorSpace=st._getUnpackColorSpace()}}function Pu(n){var rs,ss;const e=new Ux({canvas:n,antialias:!0,alpha:!1,powerPreference:"low-power"});e.setPixelRatio(Math.min(window.devicePixelRatio||1,1.75)),e.outputColorSpace=an,e.toneMapping=nu,e.toneMappingExposure=1.08;const t=new il;t.background=new Qe("#101e26"),t.fog=new Gs("#101e26",19,36);const i=new lc(-5,5,5,-5,.1,70),r=new Yf,s=new ti(new k(0,1,0),0),a=new k,o=new k(sn.x,0,sn.y),l=new vt,c=new Set;let f="",d=0,u="maze";const h=(B,W={})=>{const Z=new zf({color:B,roughness:.9,...W});return c.add(Z),Z},_=(rs=ai.find(B=>B.tiles===Lt))==null?void 0:rs.id,M=_==="moon"?["#4b4c70","#68688a","#2b304b"]:_==="ember"?["#645044","#80674e","#3d302b"]:["#34515a","#405c65","#22373e"],m=h(M[0]),p=h(M[1]),y=h("#22373e"),S=h("#304850"),T=h("#c09550",{metalness:.45,roughness:.55}),C=h("#111b26"),E=h("#ffd78a",{emissive:"#ffb541",emissiveIntensity:1.5}),L=h("#9ce9d7",{emissive:"#3aaf9d",emissiveIntensity:1}),z=h("#aa8cde",{emissive:"#7250a2",emissiveIntensity:.65}),b=h("#dd766c",{emissive:"#b13932",emissiveIntensity:.4}),g=B=>(c.add(B),B),A=(B,W,Z)=>g(new gr(B,W,Z)),U=B=>g(new oc(B,12,8)),R=(B,W,Z,x=0,P=0,N=0)=>{const G=new yn(B,W);return G.position.set(x,P,N),Z.add(G),G};t.add(new ol("#c6e9e5","#263a49",2.1));const Y=new Da("#b6d4e4",1.9);Y.position.set(-5,12,5),t.add(Y);const q=new Da("#ffd2a1",.9);q.position.set(7,4,-3),t.add(q);const j=[],ie=[],X=[];Lt.forEach((B,W)=>[...B].forEach((Z,x)=>{(Z==="#"?j:ie).push({x,y:W}),Z!=="#"&&(x*7+W*11)%9===0&&X.push({x,y:W})}));const ae=(B,W,Z,x)=>{const P=new Ra(B,W,Z.length);return Z.forEach((N,G)=>{l.makeTranslation(N.x,x,N.y),P.setMatrixAt(G,l)}),P.instanceMatrix.needsUpdate=!0,t.add(P),P},fe=ae(A(.98,.14,.98),h("#ffffff"),ie,-.08);ie.forEach((B,W)=>fe.setColorAt(W,new Qe(B.x>=16?"#2b413b":B.y>=13?"#3d4344":M[2]))),fe.instanceColor&&(fe.instanceColor.needsUpdate=!0),ae(A(.95,.72,.95),m,j,.28),ae(A(1,.08,1),p,j,.66),ae(A(.014,.01,.97),m,j,.705),ae(A(.98,.01,.012),m,j,.705),ae(A(.86,.018,.86),S,X,.005);const De=R(A(Lt[0].length+.8,.35,Lt.length+.8),C,t,(Lt[0].length-1)/2,-.3,(Lt.length-1)/2);De.name="maze-foundation";function je(B,W=!1){const Z=new rt;Z.position.set(B.x,0,B.y),t.add(Z);const x=A(.15,1.4,.22);R(x,m,Z,-.39,.65,0),R(x,m,Z,.39,.65,0),R(A(.95,.2,.28),p,Z,0,1.34,0);const P=R(A(.62,1.08,.035),W?z:L,Z,0,.6,0);P.material=h(W?"#8066bd":"#2e8a80",{emissive:W?"#51337e":"#217b73",emissiveIntensity:.8,transparent:!0,opacity:.5});for(const N of[-.39,.39])R(A(.06,.65,.25),W?z:L,Z,N,.75,0);return{group:Z,glow:P}}je(sn);const ot=je(rr,!0),nt=new Map;function ht(B,W){const Z=new rt;Z.position.set(B.x,.04,B.y),t.add(Z);const x=R(g(new ni(.36,.035,5,24)),z,Z,0,.035,0);x.rotation.x=Math.PI/2;const P=R(g(new kr(.15)),E,Z,0,.45,0);for(let N=-1;N<=1;N+=2)R(A(.08,.3,.08),T,Z,N*.37,.17,-.3),R(U(.055),E,Z,N*.37,.37,-.3);if(B.kind==="floor"){const N=new rt;Z.add(N);for(const G of[-.7,.6,1.8]){const O=R(A(.04,.02,.63),C,N,0,.01,0);O.rotation.y=G}}else if(B.kind==="cage"){for(const N of[-.33,.33])R(A(.035,.65,.035),T,Z,N,.32,.3);R(A(.72,.035,.035),T,Z,0,.65,.3)}else R(A(.22,.48,.2),m,Z,0,.2,.28),R(g(new kr(.12)),z,Z,0,.54,.28);return{group:Z,ring:x,seal:P,encounter:B,index:W}}ci.forEach((B,W)=>nt.set(B.id,ht(B,W)));const K=new rt;K.position.set(ka.x,0,ka.y),t.add(K),R(A(.45,.25,.4),m,K,0,.12,0);const te=R(A(.3,.045,.24),L,K,0,.29,0);te.rotation.y=-.2;const ve=new rt;ve.position.set(Va.x,0,Va.y),t.add(ve),R(A(.49,.3,.35),h("#745443"),ve,0,.16,0);const ke=R(A(.51,.12,.38),T,ve,0,.35,0);R(A(.075,.16,.37),E,ve,0,.27,0);const Ce=h("#e6b268"),qe=h("#dfb99a"),Tt=h("#243348");function We(B,W="#282b34",Z=qe,x=!1){const P=new rt,N=typeof B=="string"?h(B):B,G=h(W),O=R(g(new Rt(.145,.13,.34,9)),N,P,0,.62,0);R(g(new Rt(.045,.05,.08,7)),Z,P,0,.83,0);const ee=R(U(.115),Z,P,0,.96,-.01);ee.scale.set(.94,1.1,.94),R(U(.119),G,P,0,1.025,.005).scale.set(1,.55,.92);for(const ce of[-.043,.043])R(U(.013),C,P,ce,.98,-.111);R(U(.024),Z,P,0,.955,-.125),R(A(.04,.008,.009),G,P,0,.925,-.114),R(A(.22,.26,.09),h("#705c4c"),P,0,.62,.145);const ge=[],pe=[],Se=[];for(const ce of[-1,1]){const Fe=new rt;Fe.position.set(ce*.083,.43,0),P.add(Fe),ge.push(Fe),R(g(new Rt(.055,.047,.19,7)),Tt,Fe,0,-.09,0);const Ze=new rt;Ze.position.y=-.19,Fe.add(Ze),pe.push(Ze),R(g(new Rt(.046,.038,.18,7)),Tt,Ze,0,-.085,0),R(A(.09,.055,.15),C,Ze,0,-.18,-.025);const at=new rt;at.position.set(ce*.18,.75,0),P.add(at),Se.push(at),R(g(new Rt(.045,.04,.18,7)),N,at,0,-.09,0);const lt=new rt;lt.position.y=-.17,lt.rotation.x=-.12,at.add(lt),R(g(new Rt(.037,.032,.15,7)),N,lt,0,-.075,0),R(U(.039),Z,lt,0,-.16,0)}let we=null;if(x){we=R(A(.1,.145,.1),E,P,.22,.31,-.05),R(g(new ni(.055,.012,4,10)),T,P,.22,.43,-.05);const ce=new Dr("#ffc271",2,4.5,2);ce.position.set(.28,.6,-.18),P.add(ce)}return{group:P,torso:O,head:ee,legs:ge,knees:pe,arms:Se,lantern:we}}function _t(B,W,Z,x=1){const P=Z?Math.min(1,x/2.4):0;B.legs.forEach((N,G)=>{N.rotation.x=Math.sin(W+G*Math.PI)*.55*P}),B.knees.forEach((N,G)=>{N.rotation.x=Math.max(0,-Math.sin(W+G*Math.PI))*.65*P}),B.arms.forEach((N,G)=>{N.rotation.x=-Math.sin(W+G*Math.PI)*.34*P}),B.torso.position.y=.62+Math.abs(Math.sin(W))*.018*P,B.torso.rotation.z=Math.sin(W)*.025*P,B.head.position.y=.96+Math.abs(Math.sin(W))*.009*P}const D=We(Ce,"#252b32",qe,!0),Oe=D.group;t.add(Oe);let Ye=0,ct=null,Me={...sn},Mt=!1;const Ae=R(g(new ac(.26,.3,32)),L,t,sn.x,.015,sn.y);Ae.rotation.x=-Math.PI/2;function Be(){const B=new rt,W=h("#45425c");R(U(.23),W,B,0,.27,.03),R(U(.14),C,B,0,.21,-.2);for(const Z of[-.065,.065])R(U(.035),b,B,Z,.25,-.33);for(let Z=-1;Z<=1;Z+=2)for(let x=0;x<4;x++){const P=new rt;P.position.set(Z*.12,.24,-.16+x*.12),B.add(P);const N=R(A(.3,.035,.035),W,P,Z*.14,.02,0);N.rotation.z=Z*.35;const G=R(A(.22,.035,.035),W,P,Z*.35,-.07,0);G.rotation.z=Z*-.65}return B}function w(){const B=new rt,W=h("#8175a0",{emissive:"#332540",emissiveIntensity:.45});R(g(new fn(.29,.65,9)),W,B,0,.42,0),R(U(.19),C,B,0,.73,0);for(const Z of[-.065,.065])R(U(.028),L,B,Z,.76,-.17);for(const Z of[-1,1]){const x=R(A(.14,.4,.14),W,B,Z*.29,.55,0);x.rotation.z=Z*.55}return B}const v=Go.map((B,W)=>{const Z=W===0?Be():w();return t.add(Z),{...B,group:Z,index:W}}),V=h("#e0d5b8"),$=h("#a85d36"),Q=h("#695442"),H=h("#365949"),Ee=h("#61aeb9",{transparent:!0,opacity:.85,metalness:.3,roughness:.25}),me=new Map;function Ie(B){const W=new rt,Z=[];let x,P=null,N=[];if(B==="fox"){R(U(.22),$,W,0,.23,.02).scale.set(.63,.75,1.35),x=new rt,x.position.set(0,.3,-.27),W.add(x),R(U(.115),$,x);const O=R(g(new fn(.073,.17,7)),V,x,0,-.02,-.13);O.rotation.x=-Math.PI/2,R(U(.026),C,x,0,-.02,-.22);for(const ee of[-1,1])R(g(new fn(.055,.14,5)),$,x,ee*.072,.12,0),R(U(.015),C,x,ee*.07,.035,-.09);P=new rt,P.position.set(0,.2,.27),P.rotation.x=1.05,W.add(P),R(g(new Rt(.065,.09,.32,7)),$,P,0,.12,0),R(g(new fn(.065,.17,7)),V,P,0,.36,0);for(const ee of[-.1,.1])for(const he of[-.16,.19]){const ge=new rt;ge.position.set(ee,.21,he),W.add(ge),Z.push(ge),R(g(new Rt(.03,.023,.18,6)),$,ge,0,-.075,0),R(U(.035),C,ge,0,-.15,-.015)}}else if(B==="rabbit"){R(U(.18),V,W,0,.18,.035).scale.set(.78,.9,1.2),x=new rt,x.position.set(0,.27,-.17),W.add(x),R(U(.1),V,x);for(const O of[-1,1]){const ee=R(g(new rc(.026,.15,3,7)),V,x,O*.043,.16,0);ee.rotation.z=O*-.12,N.push(ee),R(U(.013),C,x,O*.06,.02,-.075),R(A(.07,.04,.14),V,W,O*.085,.035,-.08)}R(U(.018),h("#c7908c"),x,0,-.015,-.096),R(U(.055),V,W,0,.16,.23)}else{R(g(new Rt(.14,.19,.52,9)),m,W,0,.26,0),R(U(.17),Q,W,0,.71,0).scale.set(.9,1.22,.83);for(const ee of[-1,1])R(U(.12),Q,W,ee*.14,.72,0).scale.set(.4,1.25,.8);x=new rt,x.position.set(0,.96,-.01),W.add(x),R(U(.145),Q,x);for(const ee of[-1,1])R(U(.055),V,x,ee*.063,.01,-.115),R(U(.024),C,x,ee*.063,.01,-.16),R(g(new fn(.04,.1,5)),Q,x,ee*.1,.13,0);const O=R(g(new fn(.035,.08,5)),T,x,0,-.035,-.15);O.rotation.x=-Math.PI/2}return{group:W,head:x,tail:P,ears:N,feet:Z}}An.forEach(B=>{let W;if(B.kind==="human"){W=We(B.id==="scout"?"#688ba0":"#80976c",B.id==="scout"?"#34302c":"#4f352c");const Z=R(g(new kr(.065)),B.id==="scout"?L:E,W.group,0,1.28,0);W.marker=Z}else if(["fox","rabbit","owl"].includes(B.kind))W=Ie(B.kind);else if(W={group:new rt},B.kind==="pump"){R(A(.35,.12,.35),m,W.group,-.24,.06,.14),R(g(new Rt(.075,.11,.48,8)),H,W.group,-.24,.33,.14);const Z=R(g(new Rt(.035,.035,.27,7)),T,W.group,-.08,.48,.14);Z.rotation.z=Math.PI/2,R(A(.05,.36,.04),T,W.group,-.31,.64,.14).rotation.z=-.5,W.stream=R(g(new Rt(.016,.025,.33,6)),Ee,W.group,.045,.27,.14),W.drops=Array.from({length:3},()=>R(U(.025),Ee,W.group,.045,.3,.14))}else if(B.kind==="lamp")R(g(new Rt(.035,.06,1.45,8)),T,W.group,.3,.72,.22),R(A(.3,.07,.28),C,W.group,.3,1.5,.22),W.bulb=R(A(.18,.25,.18),h("#554d35",{emissive:"#ffba5a",emissiveIntensity:0}),W.group,.3,1.33,.22),W.light=new Dr("#ffd395",0,6,2),W.light.position.set(.3,1.33,.22),W.group.add(W.light);else{for(const Z of[-.29,.29])R(A(.06,.3,.26),m,W.group,Z,.15,.22);R(A(.85,.07,.31),Q,W.group,0,.32,.22),R(A(.85,.23,.05),Q,W.group,0,.49,.37)}W.group.position.set(B.x,0,B.y),t.add(W.group),W.distance=0,W.last={x:B.x,y:B.y},me.set(B.id,{entity:B,...W})});const ye=new rt;ye.position.set(Vr.x+.3,0,Vr.y),t.add(ye),R(g(new Rt(.18,.15,.09,12,1,!0)),T,ye,0,.05,0),R(g(new Rt(.145,.145,.015,12)),C,ye,0,.015,0);const ne=R(g(new Hs(.147,16)),Ee,ye,0,.075,0);ne.rotation.x=-Math.PI/2;const oe=new Ra(g(new Hs(.055,8)),E,48);t.add(oe),oe.count=0,j.filter(B=>(B.x>=17||B.y>=13)&&B.x>0&&B.x<Lt[0].length-1&&B.y>0&&B.y<Lt.length-1&&(B.x*3+B.y)%5===0).forEach(B=>{const W=new rt;W.position.set(B.x,.7,B.y),t.add(W),R(g(new Rt(.06,.09,.7,6)),Q,W,0,.35,0),R(g(new fn(.42,.8,7)),H,W,0,.95,0),R(g(new fn(.31,.7,7)),H,W,0,1.37,0)});for(const B of[{x:6,y:13},{x:12,y:13},{x:18,y:14}])((ss=Lt[B.y])==null?void 0:ss[B.x])==="#"&&(R(A(.42,1.1,.4),m,t,B.x,1.2,B.y),R(A(.7,.18,.58),p,t,B.x+.13,1.82,B.y));const Re=new rt;t.add(Re);const Pe=h("#8b8399",{metalness:.7,roughness:.3});for(let B=0;B<10;B++){const W=B/10*Math.PI*2;R(A(.035,1.35,.035),Pe,Re,Math.cos(W)*.43,.65,Math.sin(W)*.43)}R(g(new Rt(.46,.46,.07,10)),Pe,Re,0,1.34,0),R(g(new ni(.43,.035,4,20)),Pe,Re,0,.15,0).rotation.x=Math.PI/2;const se=new il;se.background=new Qe("#0b161d"),se.fog=new Gs("#0b161d",5,10);const Le=new en(60,1,.04,20);Le.position.set(0,1.27,1.75),Le.lookAt(0,1.24,-2.8),se.add(new ol("#94c8ce","#15212b",1.45));const I=new Da("#91b3cf",1.4);I.position.set(-2,3,1),se.add(I);const xe=h("#2b414b"),le=h("#15262f"),ue=h("#60676b",{metalness:.72,roughness:.38}),re=h("#8d9290",{metalness:.65,roughness:.35});R(A(5,.15,7),y,se,0,-.08,-1);for(const B of[-2.35,2.35])R(A(.3,3.1,7),xe,se,B,1.5,-1);R(A(5,3.1,.35),le,se,0,1.5,-4.2),R(A(5,.2,7),le,se,0,3.05,-1);const J=A(.84,.4,.17);for(const B of[0,1]){const W=[];for(let x=B;x<7;x+=2)for(let P=0;P<6;P++)W.push([-2.1+P*.87+(B?.12:0),.2+x*.43,-3.94]);const Z=new Ra(J,B?m:xe,W.length);W.forEach((x,P)=>{l.makeTranslation(...x),Z.setMatrixAt(P,l)}),Z.instanceMatrix.needsUpdate=!0,se.add(Z)}for(let B=0;B<9;B++)R(A(4.4,.008,.015),le,se,0,.006,-3.7+B*.6);const be=[];for(const B of[-1,1]){const W=B*1.55;R(A(.09,.55,.1),T,se,W,1.5,-3.65),R(g(new fn(.13,.32,7)),E,se,W,1.91,-3.65);const Z=new Dr("#ffad56",8,5,2);Z.position.set(W,1.91,-3.45),se.add(Z),be.push(Z)}const Ue=w();Ue.scale.setScalar(2.35),Ue.position.set(0,0,-2.55),Ue.rotation.y=Math.PI,se.add(Ue);for(const B of[-1,1]){const W=R(g(new fn(.07,.24,5)),z,Ue,B*.14,.93,0);W.rotation.z=B*-.3}const pt=new Dr("#9a74d0",3,3.5,2);pt.position.set(0,1.8,-2.2),se.add(pt);const Ke=new rt;se.add(Ke);const Qt=A(.065,2.75,.065);for(const B of[-1.62,-1.08,1.08,1.62])R(Qt,ue,Ke,B,1.38,-.55);for(const B of[.15,2.65])R(A(3.5,.1,.12),re,Ke,0,B,-.55);for(const B of[-1,1])for(const W of[.1,.7,1.3])R(Qt,ue,Ke,B*1.75,1.38,W);const Ot=new rt;Ot.position.set(-.56,0,-.55),Ke.add(Ot);for(const B of[0,1.12])R(Qt,re,Ot,B,1.38,0);for(const B of[.38,2.4])R(A(1.16,.075,.075),ue,Ot,.56,B,0);const Xn=new rt;Xn.position.set(.56,.9,.07),Ot.add(Xn);const br=R(A(.25,.3,.12),h("#c09550",{metalness:.45,roughness:.5}),Xn);R(g(new ni(.085,.023,6,14,Math.PI)),re,Xn,0,.16,0),R(A(.025,.075,.013),C,Xn,0,0,.07);const Di=[];for(const B of[-1,1]){const W=new rt;W.position.set(B*.76,.72,-.43),Ke.add(W);for(let Z=0;Z<5;Z++){const x=R(g(new ni(.05,.014,4,10)),re,W,B*Z*.07,Z*.07,0);x.rotation.y=Z%2?.8:0}Di.push(W)}const kt=new rt;kt.position.set(.42,.85,.5),se.add(kt);const yr=R(A(.2,.5,.23),h("#314b55"),kt,0,-.2,.11);yr.rotation.x=-.3,R(U(.105),h("#b99276"),kt,0,.08,-.04),R(A(.17,.24,.17),E,kt,-.03,-.13,-.22);for(const B of[-1,1])R(A(.018,.26,.19),T,kt,-.03+B*.09,-.13,-.22);R(g(new ni(.08,.018,5,12)),T,kt,-.03,.07,-.22);const hi=new Dr("#ffca81",2,4,2);hi.position.set(.1,.95,-.2),se.add(hi);const qn=new Hf("#ffd59a",0,7,.38,.6,1.7);qn.position.set(.5,1.05,.75),qn.target.position.set(0,1.25,-3.3),se.add(qn,qn.target);let Ln=0;function ts(B,W,Z,x=null){var ge,pe,Se,we;B.paused||(Ln=W?0:((B.elapsedMs||0)+(B.captureMs||0))/1e3);const P=ls.clamp(Number(Z.lookYaw)||0,-.3,.3);Le.lookAt(-Math.sin(P)*4.5,1.24,-2.8);const N=!!Z.lanternRaised;if(kt.position.y=N?1.05:.85,hi.position.y=N?1.25:.95,hi.intensity=N?4:2,qn.intensity=N?14:0,br.material.emissive.set(Z.lockInspected?"#ab6f21":"#000000"),br.material.emissiveIntensity=Z.lockInspected?.65:0,!B.paused){const ce=Z.rattleMs>0;Ke.position.x=ce&&!W?Math.sin(Z.rattleMs*.055)*.018:0,Ue.rotation.z=ce&&!W?-.06:0,Ue.position.z=ce?-2.38:-2.55,pt.color.set(ce?"#c27683":"#9a74d0")}const G=((ge=B.review)==null?void 0:ge.index)||0;Di[0].visible=G<1,Di[1].visible=!0;const O=B.phase==="feedback"&&((pe=B.resolved)==null?void 0:pe.includes(B.activeEncounter))||B.phase==="review-feedback"&&G>=1&&(((Se=B.review)==null?void 0:Se.correct)||((we=B.review)==null?void 0:we.wrong)>=2),ee=!W&&Number.isFinite(x),he=ee?1-(1-ls.clamp(x,0,1))**3:1;Ot.rotation.y=ee?-1.35*(1-he):O?-.28:0,Ke.position.y=ee?1.4*(1-he):0,Le.position.z=1.75+(ee?.28*(1-he):0),Xn.visible=!O,Ue.position.y=W?0:Math.sin(Ln*1.5)*.025,kt.rotation.z=W?0:Math.sin(Ln*1.2)*.015,be.forEach((ce,Fe)=>{ce.intensity=8+Math.sin(Ln*3+Fe)*.4}),se.updateMatrixWorld(),e.render(se,Le)}function Yn(){const{width:B,height:W}=n.getBoundingClientRect(),Z=`${B}/${W}`;if(Z===f||B<=0||W<=0)return;f=Z,e.setSize(B,W,!1);const x=B/W;Le.aspect=x,Le.updateProjectionMatrix();const P=x<.9?5.3:x>1.6?5:5.7;i.left=-P*x,i.right=P*x,i.top=P,i.bottom=-P,i.updateProjectionMatrix()}function ns(B,{intro:W=!1,reducedMotion:Z=!1,encounters:x=ci,interaction:P={},movement:N=null,guidePath:G=[],trapEntry:O=null,greeting:ee=null}={}){var et,Ht,Dn,Wt,$n,bt;Yn();const he=["question","feedback","capture","review","review-feedback"].includes(B.phase);if(u=he&&!W?"first-person-cage":"maze",he&&!W){ts(B,Z,P,O);return}x.forEach((Te,it)=>{nt.has(Te.id)||nt.set(Te.id,ht(Te,it))});const ge=new Set(x.map(Te=>Te.id));nt.forEach(Te=>{Te.group.visible=ge.has(Te.encounter.id)});const pe=Z?0:(B.elapsedMs||0)/1e3,Se=B.elapsedMs||0,we=ct===null?0:Math.min(.1,Math.max(0,Se-ct)/1e3);ct=Se;const ce=N&&Number.isFinite(N.x)&&Number.isFinite(N.y)?N:B.player||sn,Fe=Math.hypot(ce.x-Me.x,ce.y-Me.y),Ze=!B.paused&&(N?!!N.moving:Fe>.001);Fe>1e-4&&Fe<2&&(Ye+=Fe,d=Math.atan2(Me.x-ce.x,Me.y-ce.y)),N&&Number.isFinite(N.heading)&&(d=N.heading),Me={x:ce.x,y:ce.y};const at=new k(ce.x,0,ce.y);Oe.position.copy(at);const lt=Math.atan2(Math.sin(d-Oe.rotation.y),Math.cos(d-Oe.rotation.y));N||Z?Oe.rotation.y=d:Oe.rotation.y+=lt*(1-Math.exp(-14*we)),_t(D,Ye*Math.PI*2/1.15,Ze&&!Z,(N==null?void 0:N.speed)||2.4),(et=B.world)!=null&&et.playerResting&&!Ze&&(D.legs.forEach(Te=>{Te.rotation.x=-.65}),D.knees.forEach(Te=>{Te.rotation.x=1.2}),Oe.position.y=-.1),me.forEach(Te=>{var Er,_c,vc,Mc,bc,yc,Sc;const{entity:it,group:ft}=Te,ze=wi(it,Se,B.world),$t=Math.hypot(ze.x-Te.last.x,ze.y-Te.last.y);$t<2&&(Te.distance+=$t),Te.last={x:ze.x,y:ze.y},ft.position.set(ze.x,0,ze.y);const wt=!B.paused&&(ee==null?void 0:ee.entityId)===it.id,Sr=wt?Math.atan2(ze.x-ce.x,ze.y-ce.y):(ze.heading||0)+Math.PI,Ii=Math.atan2(Math.sin(Sr-ft.rotation.y),Math.cos(Sr-ft.rotation.y));if(ft.rotation.y+=Ii*(Z?1:1-Math.exp(-9*we)),it.kind==="human")_t(Te,Te.distance*Math.PI*2/1.15,ze.moving&&!Z,1.15),Te.arms[1].rotation.z=wt?-1.7:0,wt&&(Te.arms[1].rotation.x=Z?-.3:-.3+Math.sin(pe*9)*.18),Te.marker.rotation.y=pe*.5;else if(it.kind==="fox"){const Ui=Te.distance*Math.PI*2/.7;Te.feet.forEach((mi,Ec)=>{mi.rotation.x=ze.moving&&!Z?Math.sin(Ui+(Ec===0||Ec===3?0:Math.PI))*.5:0}),Te.tail.rotation.z=Z?0:Math.sin(pe*(wt?8:2))*(wt?.3:.12);const pi=((Er=B.world)==null?void 0:Er.foxDrinking)&&!wt;Te.head.rotation.x=pi?.45:0,Te.head.position.y=pi?.23:.3,pi&&(ft.rotation.y=-Math.PI/2)}else it.kind==="rabbit"?((_c=B.world)!=null&&_c.rabbitCalm&&!ze.moving&&(ft.rotation.y=Math.atan2(ze.x-ce.x,ze.y-ce.y)),ft.position.y=ze.moving&&!Z?Math.abs(Math.sin(Se/90))*.1:0,Te.head.rotation.x=wt?-.12:(vc=B.world)!=null&&vc.rabbitCalm?.15:0,Te.ears.forEach((Ui,pi)=>{var mi;Ui.rotation.z=(pi?1:-1)*(wt?.04:(mi=B.world)!=null&&mi.rabbitCalm?.32:.12)})):it.kind==="owl"?Te.head.rotation.y=wt||(Mc=B.world)!=null&&Mc.owlObserved?Math.atan2(ze.x-ce.x,ze.y-ce.y)-ft.rotation.y:Z?0:Math.sin(pe*.45)*.45:it.kind==="pump"?(Te.stream.visible=!!((bc=B.world)!=null&&bc.waterFilled),Te.drops.forEach((Ui,pi)=>{var mi;Ui.visible=!!((mi=B.world)!=null&&mi.waterFilled),Ui.position.y=.43-(pe*.6+pi*.11)%.33})):it.kind==="lamp"&&(Te.bulb.material.emissiveIntensity=(yc=B.world)!=null&&yc.lightsOn?1.5:0,Te.light.intensity=(Sc=B.world)!=null&&Sc.lightsOn?9:0)}),ne.visible=!!((Ht=B.world)!=null&&Ht.waterFilled);const ut=(Dn=B.world)!=null&&Dn.scoutGuided?G.slice(0,48):[];oe.count=ut.length,ut.forEach((Te,it)=>{l.makeRotationX(-Math.PI/2),l.setPosition(Te.x,.025,Te.y),oe.setMatrixAt(it,l)}),oe.instanceMatrix.needsUpdate=!0,D.lantern.material.emissiveIntensity=1.5+Math.sin(pe*3)*.08,Ae.position.set(Oe.position.x,.017,Oe.position.z),Ae.visible=B.graceMs>0||W,nt.forEach(({group:Te,ring:it,seal:ft,encounter:ze,index:$t})=>{var Sr,Ii,Er;const wt=((Sr=B.seals)==null?void 0:Sr.includes(ze.id))||((Er=(Ii=B.resolved)==null?void 0:Ii.includes)==null?void 0:Er.call(Ii,ze.id));it.material=wt?L:z,ft.visible=!wt,ft.rotation.y=pe*.8+$t,ft.position.y=.45+Math.sin(pe*2+$t)*.05,Te.visible=ge.has(ze.id)}),v.forEach(Te=>{const{group:it,index:ft}=Te,ze=Yl(Te,B.elapsedMs||0);if(!ze)return;const $t=it.userData.tile;$t&&($t.x!==ze.x||$t.y!==ze.y)&&(it.rotation.y=Math.atan2($t.x-ze.x,$t.y-ze.y)),it.userData.tile=ze,it.position.set(ze.x,ft?Math.sin(pe*1.8)*.07:0,ze.y)}),te.material=(Wt=B.clues)!=null&&Wt.includes("route")?T:L,ke.rotation.x=B.treasureCollected?-.65:0,ot.glow.material.opacity=(($n=B.seals)==null?void 0:$n.length)>=3&&Object.keys(B.answers||{}).length===((bt=B.order)==null?void 0:bt.length)?.8:.3;const Ne=["capture","review","review-feedback"].includes(B.phase);Re.visible=Ne,Re.position.set(ce.x,0,ce.y),B.phase==="capture"&&!Z&&(Re.position.y=Math.max(0,1.6-(B.captureMs??0)/900));const dt=at.clone();dt.x=ls.clamp(dt.x,2.8,Lt[0].length-3.8),dt.z=ls.clamp(dt.z,2.8,Lt.length-3.8),!Mt||Z?(o.copy(dt),Mt=!0):o.lerp(dt,1-Math.exp(-8*we)),i.position.set(o.x+3.8,12,o.z+7.8),i.lookAt(o.x,0,o.z),t.updateMatrixWorld(),e.render(t,i)}function is(B,W){const Z=n.getBoundingClientRect();return r.setFromCamera(new $e((B-Z.left)/Z.width*2-1,-(W-Z.top)/Z.height*2+1),i),r.ray.intersectPlane(s,a)?{x:Math.round(a.x),y:Math.round(a.z)}:null}function sa(){for(const B of c)B.dispose();e.dispose()}return Yn(),{render:ns,resize:Yn,cellFromPointer:is,dispose:sa,getView:()=>u}}(function(n){const e={easy:1,medium:1.5,hard:2},t=u=>u&&Object.hasOwn(e,u.difficulty)?e[u.difficulty]:e.medium,i=u=>Number.isFinite(u)?Math.min(1,Math.max(0,u)):0;function r(u,h){const _=u||[],M=h||{},m=_.reduce((C,E)=>C+t(E),0);if(!m)return{earned:0,pending:0,max:100,percent:0};let p=0,y=0;for(const C of _){const E=t(C)/m*100;C.type==="open"?y+=E:p+=i(M[C.id])*E}p=Math.round(p),y=Math.round(y);const S=100-y,T=S>0?Math.min(100,Math.round(p/S*100)):0;return{earned:p,pending:y,max:100,percent:T}}function s(u){return u>=90?3:u>=75?2:u>=50?1:0}function a(u){return u>=90?"great":u>=50?"ok":"low"}function o(u,h=Math.random){const _=u.slice();for(let M=_.length-1;M>0;M--){const m=Math.floor(h()*(M+1));[_[M],_[m]]=[_[m],_[M]]}return _}function l(u,h=Math.random){const _=o(u.choices.map((M,m)=>m),h);return{...u,choices:_.map(M=>u.choices[M]),correct:_.indexOf(u.correct),order:_}}function c(u,h){const _=h||{};return u.filter(M=>M.type!=="open"&&!(i(_[M.id])>=1))}function f(u,h,_,M=3){const m=u.slice();return m.splice(Math.min(h+1+M,u.length),0,{..._,reask:!0}),m}function d(u){return u>0&&u%3===0}n.QuizCore={WEIGHT:e,scoreQuiz:r,starsFor:s,feedbackTier:a,shuffled:o,shuffleChoices:l,missedQuestions:c,scheduleReask:f,streakCelebrates:d}})(globalThis);const Ol=2.7,Ki=12,Lu=n=>n&&Number.isInteger(n.x)&&Number.isInteger(n.y),Nx=(n,e)=>n.x===e.x&&n.y===e.y;function jr(n){if(!Lu(n))throw new TypeError("Movement needs an integer player tile");return{position:{...n},origin:{...n},target:null,speed:0,heading:0,moving:!1,elapsed:0}}function Fx(n,e){return Nx(n.origin,e)?n:{...jr(e),heading:n.heading}}function Ox(n,e){let t=e.nextCell;if(e.direction){const{dx:i,dy:r}=e.direction;if(!Number.isInteger(i)||!Number.isInteger(r)||Math.abs(i)+Math.abs(r)!==1)return null;t={x:n.origin.x+i,y:n.origin.y+r}}return!Lu(t)||Math.abs(t.x-n.origin.x)+Math.abs(t.y-n.origin.y)!==1||typeof e.canWalk!="function"||!e.canWalk(t.x,t.y)?null:{x:t.x,y:t.y}}function Bx(n,e,t,i){const r=Math.max(Ki,e**2/(2*n)),s=i?Ol:Math.min(Ol,Math.sqrt((2*n+e**2/Ki)/(1/Ki+1/r))),a=Math.max(0,(s-e)/Ki),o=(e+s)*a/2,l=i?0:s**2/(2*r),c=Math.max(0,(n-o-l)/s),f=i?0:s/r;if(t>=a+c+f-1e-10)return{distance:n,speed:i?s:0,arrived:!0};let d=0,u=e;const h=Math.min(t,a);d+=e*h+Ki*h**2/2,u+=Ki*h,t-=h;const _=Math.min(t,c);return d+=s*_,t-=_,t>0&&(d+=s*t-r*t**2/2,u=s-r*t),{distance:d,speed:u,arrived:!1}}function zx(n,e={}){const t={movement:n,arrived:null};if(e.paused||!Number.isFinite(e.dt)||e.dt<=0)return t;const i=Math.min(e.dt,.1),r=n.target||Ox(n,e);if(!r)return n.speed?{movement:{...n,speed:0},arrived:null}:t;const s=r.x-n.origin.x,a=r.y-n.origin.y,o=Math.atan2(-s,-a),l=Math.atan2(Math.sin(o-n.heading),Math.cos(o-n.heading)),c=n.heading+l*(1-Math.exp(-14*i)),f=Math.abs(n.position.x-n.origin.x)+Math.abs(n.position.y-n.origin.y),d=!e.direction||e.direction.dx===s&&e.direction.dy===a,u=e.continuous===!0&&d&&typeof e.canWalk=="function"&&e.canWalk(r.x+s,r.y+a),h=Bx(1-f,n.speed,i,u),_=Math.min(1,f+h.distance);return h.arrived?{movement:{position:{...r},origin:{...r},target:null,speed:h.speed,heading:c,moving:!1,elapsed:0},arrived:{...r,dx:s,dy:a}}:{movement:{...n,position:{x:n.origin.x+s*_,y:n.origin.y+a*_},target:r,speed:h.speed,heading:c,moving:!0,elapsed:n.elapsed+i},arrived:null}}const kx=Object.freeze(["look-left","look-center","look-right","lantern","rattle","inspect"]),Du=Object.freeze({"look-left":"מבט שמאלה","look-center":"מבט קדימה","look-right":"מבט ימינה",lantern:"הרמה / הורדה של הפנס",rattle:"ניעור הסורגים",inspect:"בדיקת המנעול"}),Vx=new Set(["question","feedback","capture","review","review-feedback"]),Bl=.42,zl=.21,Gx=480;function uc(){return{lookYaw:0,lanternRaised:!1,rattleMs:0,lockInspected:!1,notice:""}}function Iu(n,e,t={}){const i=typeof e=="string"?e:e==null?void 0:e.type;if(i==="reset")return uc();if(t.paused||!Vx.has(t.phase))return n;if(i==="tick"){const l=e.ms??e.dt;return!Number.isFinite(l)||l<=0||n.rattleMs===0?n:{...n,rattleMs:t.reducedMotion?0:Math.max(0,n.rattleMs-l)}}if(!kx.includes(i))return n;if(i.startsWith("look-")){const l=i==="look-center"?0:Math.max(-Bl,Math.min(Bl,n.lookYaw+(i==="look-left"?zl:-zl)));return{...n,lookYaw:l,notice:Du[i]}}if(i==="lantern"){const l=!n.lanternRaised;return{...n,lanternRaised:l,notice:l?"הפנס מורם ומאיר את הסורגים והמנעול.":"הפנס הונמך."}}if(i==="rattle")return{...n,rattleMs:t.reducedMotion?0:Gx,notice:"הסורגים חזקים. השומר שמע את הרעש והביט לכאן. השאלות הן הדרך החוצה."};const r=Math.max(0,Math.floor(Number(t.total)||0)),s=Math.min(r,Math.max(0,Math.floor(Number(t.answered)||0))),a=Math.max(1,Math.floor(Number(t.reviewIndex)||0)+1),o=t.phase==="capture"?"המנעול סגור. שלבי החילוץ ייפתחו מיד; אפשר לדלג על סצנת הלכידה.":t.phase.startsWith("review")?`המנעול מחכה לשלב חילוץ ${a}. ממשיכים דרך שאלות החזרה.`:`נענו ${s} מתוך ${r} שאלות. המנעול ייפתח בסיום שאלות המלכודת.`;return{...n,lockInspected:!0,notice:o}}const Hx=new Map(js.quizzes.flatMap(n=>n.questions).map(n=>[n.id,n])),Uu={"questions-01":{context:"רוצים לברר את זמן הקמת הגינה בבית הספר.",prompt:"באיזו מילת שאלה נשתמש?"},"questions-02":{context:"רוצים לברר את מספר הכיתות שהשתתפו בהקמת הגינה.",prompt:"באיזו מילת שאלה נשתמש?"},"questions-03":{context:"התלמידים קראו על צמחים לפני השתילה.",prompt:"איזו מילת שאלה מבקשת סיבה?"},"questions-04":{context:"תלמידים הקימו גינה בבית הספר.",prompt:"איזו מילת שאלה מבקשת מקום?"},"questions-05":{context:"שלוש כיתות חילקו ביניהן את ימי ההשקיה.",prompt:"איזו מילת שאלה מבקשת דרך פעולה?"},"questions-06":{context:"עלתה הצעה להוסיף פרחים לגינה.",prompt:"איזו מילת שאלה מבקשת לזהות אדם?"},"instructions-01":{context:"ההוראה: ״העתיקו מהטקסט עובדה״.",prompt:"מה צריך לעשות?"},"instructions-02":{context:"ההוראה: ״נמקו״.",prompt:"מה צריך להוסיף לתשובה?"},"instructions-03":{context:"ההוראה: ״ציינו״.",prompt:"איזו תשובה מתאימה?"},"instructions-04":{context:"ההוראה: ״הסבירו״.",prompt:"מה צריך לעשות?"},"instructions-05":{context:"ההוראה: ״נסחו שאלה מלאה״.",prompt:"איזו תשובה מקיימת את ההוראה?"},"instructions-06":{context:"ההוראה: ״הביעו את דעתכם וכתבו נימוק״.",prompt:"מה צריך לכתוב?"},"physics-pole-01":{context:"מודדים גובה עמוד בעזרת גליל חלול ומשולש ישר־זווית ושווה־שוקיים.",prompt:"באיזו זווית לאופק מכוונים לראש העמוד?"},"physics-pole-02":{context:"מביטים לראש עמוד בזווית 45° לאופק, על קרקע אופקית.",prompt:"מה שווה למרחק האופקי לעמוד?"},"physics-pole-03":{context:"מביטים לראש עמוד ב־45°, על קרקע אופקית. המרחק האופקי: 6 מ׳. גובה העיניים: 1.4 מ׳.",prompt:"מה גובה העמוד?"},"physics-pole-04":{context:"מודדים גובה עמוד בעזרת גליל המכוון לראשו ב־45° לאופק.",prompt:"איזה מרחק מודדים לצורך החישוב?"},"physics-pole-05":{context:"מביטים לראש עמוד ב־45° לאופק, על קרקע אופקית.",prompt:"איזה גובה מוסיפים למרחק האופקי?"},"physics-pole-06":{context:"מביטים לראש עמוד ב־45°. מחשבים את גובהו ממרחק אופקי וגובה העיניים.",prompt:"איזה תנאי קרקע נדרש לחישוב?"},"physics-pole-07":{context:"מביטים לראש עמוד ב־45°, על קרקע אופקית. המרחק האופקי: 4 מ׳. גובה העיניים: 1.5 מ׳.",prompt:"מה גובה העמוד?"},"physics-pole-08":{context:"למדידת גובה עמוד נעזרים בגליל חלול, במשולש 45° ובסרט מדידה.",prompt:"מה צריך לראות דרך הגליל?"},"physics-pole-09":{context:"למדידת גובה עמוד נעזרים בגליל חלול, במשולש 45° ובסרט מדידה.",prompt:"מה תפקיד המשולש?"},"physics-pole-10":{context:"מביטים לראש עמוד ב־45°, על קרקע אופקית. המרחק האופקי לעמוד: 5 מ׳.",prompt:"מה גובה ראש העמוד מעל העיניים?"},"physics-pole-11":{context:"מודדים מרחק אופקי לעמוד וגובה עיניים, ואז מחשבים את גובה העמוד.",prompt:"למה זו מדידה עקיפה?"}};for(const n of js.quizzes.find(e=>e.id==="facts").questions)Uu[n.id]={context:n.prompt.slice(0,-7),prompt:"עובדה או דעה?"};function Wx(n,e){var t,i;return e&&n.prompt===e.prompt&&n.correct===e.correct&&JSON.stringify(n.choices)===JSON.stringify(e.choices)&&((t=n.ref)==null?void 0:t.id)===e.ref.id&&((i=n.ref)==null?void 0:i.part)===e.ref.part}function Xx(n){const e={prompt:typeof(n==null?void 0:n.prompt)=="string"?n.prompt:"",context:"",sourceLabel:"",adapted:!1},t=Hx.get(n==null?void 0:n.id);if(!Wx(n,t))return e;const i=Uu[n.id],r=n.ref.id==="garden-passage"?"הגינה בבית הספר":`מדידות · ${n.ref.part}`;return{...e,...i,sourceLabel:r,adapted:!!i}}const qx=1.65,kl=2.35,Yx=12e3,$x=3400,jx=new Set(["human","fox","rabbit","owl"]);function Nu(){return{clockMs:0,sequence:0,nearby:{},lastSpoken:{},active:null}}function Kx(n,e){return n.id==="scout"?"היי! אני אורי. צריכים עזרה למצוא דרך?":n.id==="keeper"?"שלום! אני מיה. ברוכים הבאים לגן.":n.id==="fox"?e!=null&&e.foxFollowing?"השועל מכשכש בזנב ומתקרב אליכם.":e!=null&&e.waterFilled?"השועל מרים את ראשו ומרחרח לשלום.":"השועל מרים אוזניים ומרחרח לעברכם.":n.id==="rabbit"?e!=null&&e.rabbitCalm?"הארנב מזהה אתכם ומציץ מבין השיחים.":"הארנב מזקיף אוזניים ומביט בכם.":"הוּ־הוּ! הינשוף מסובב אליכם את ראשו."}function Zx(n,{dt:e=0,player:t,world:i,elapsedMs:r=0,phase:s="explore",paused:a=!1}={}){if(s!=="explore")return n.active?{...n,active:null}:n;if(a||!t||!Number.isFinite(t.x)||!Number.isFinite(t.y)||!Number.isFinite(e)||e<0)return n;const o=Math.min(e,6e4),l=n.clockMs+o,c={...n,clockMs:l,nearby:{...n.nearby},lastSpoken:{...n.lastSpoken}};if(c.active=n.active&&n.active.remainingMs>o?{...n.active,remainingMs:n.active.remainingMs-o}:null,c.active){const d=An.find(h=>h.id===c.active.entityId),u=wi(d,r,i);Math.abs(u.x-t.x)+Math.abs(u.y-t.y)>=kl&&(c.active=null)}const f=[];for(const d of An.filter(u=>jx.has(u.kind))){const u=wi(d,r,i),h=Math.abs(u.x-t.x)+Math.abs(u.y-t.y);h>=kl?c.nearby[d.id]=!1:h<=qx&&!n.nearby[d.id]&&(c.nearby[d.id]=!0,(n.lastSpoken[d.id]===void 0||l-n.lastSpoken[d.id]>=Yx)&&(f.push({entity:d,distance:h}),c.nearby[d.id]=!1))}if(!c.active&&f.length){const{entity:d}=f.sort((u,h)=>u.distance-h.distance)[0];c.sequence++,c.nearby[d.id]=!0,c.lastSpoken[d.id]=l,c.active={entityId:d.id,kind:d.kind,name:d.name,text:Kx(d,i),sequence:c.sequence,remainingMs:$x}}return c}const de=n=>document.getElementById(n),si="prepx-shadow-maze-session-v1",Kr=matchMedia("(prefers-reduced-motion: reduce)"),Pt=de("game-dialog");let tt,F,St,yt=!1,Ut=null,Io=null,nr=!1,ui=!0,Uo=!1,Yt=[],Ba=0,Nr=null,za=0,Ge=null,pn=null,ir=null,Ws=!1,Qi=[],Mn=uc(),Xs=Nu(),Gt=null;const dc=900,na=new Set(["question","feedback","capture","review","review-feedback"]),Pn=new Set,Ns=new Map;function vr(){Ns.clear(),ir=null}const fr=()=>(F==null?void 0:F.phase)==="explore"?F.resolved.find(n=>!F.giftsSeen.includes(n)):null,Li=()=>Ai(tt.questions),fc=()=>yt&&(F==null?void 0:F.phase)==="explore"&&!F.paused&&!Ut?Xs.active:null;function Fu(){const n=fc(),e=de("nearby-greeting");e.hidden=!n,n&&e.dataset.sequence!==String(n.sequence)&&(de("greeting-name").textContent=n.name,de("greeting-text").textContent=n.text,e.dataset.sequence=String(n.sequence))}const Mr=()=>({intro:!yt,reducedMotion:Kr.matches,encounters:Li(),interaction:Mn,guidePath:Qi,greeting:fc(),trapEntry:Gt?1-Gt.remaining/dc:null,movement:Ge?{x:Ge.position.x,y:Ge.position.y,speed:Ge.speed,heading:Ge.heading,moving:Ge.moving||Ge.speed>0}:void 0});function Ou(){var e;const n=F.assignments[F.activeEncounter]||[];return{phase:F.phase,paused:F.paused,reducedMotion:Kr.matches,reviewIndex:((e=F.review)==null?void 0:e.index)||0,answered:n.filter(t=>F.answers[t]).length,total:n.length}}function Jx(){return`<details class="cell-tools" id="cell-tools"><summary>לבדוק את הכלוב</summary><div class="cell-controls" aria-label="פעולות בתוך הכלוב">${["look-left","look-right","lantern","rattle","inspect"].map(n=>`<button type="button" data-cell-action="${n}" aria-label="${Ti(Du[n])}"${n==="lantern"?` aria-pressed="${Mn.lanternRaised}"`:""}>${Ti({"look-left":"שמאלה","look-right":"ימינה",lantern:"פנס",rattle:"סורגים",inspect:"מנעול"}[n])}</button>`).join("")}</div><p id="cell-notice" class="cell-notice" role="status">${Ti(Mn.notice||"בחרו פעולה כדי להסתכל סביב.")}</p></details>`}function Qx(n){var e;F.phase==="feedback"&&mc("המעבר נעצר בזמן שבודקים את הכלוב."),Mn=Iu(Mn,n,Ou()),de("cell-notice")&&(de("cell-notice").textContent=Mn.notice),(e=document.querySelector('[data-cell-action="lantern"]'))==null||e.setAttribute("aria-pressed",String(Mn.lanternRaised)),St==null||St.render(F,Mr())}const Bu={up:[0,-1],right:[1,0],down:[0,1],left:[-1,0]},Ti=n=>String(n??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]);function eg(n){const e=document.createElement("template");return e.innerHTML=String(n??""),e.content.textContent||""}const Vt=n=>Ti(eg(n));function tg(n){try{const e=new URL(n==null?void 0:n.url,new URL("../../",location.href));return["http:","https:"].includes(e.protocol)?e.href:null}catch{return null}}function zu(n){var r,s;const e=n==null?void 0:n.reference,t=Vt([(e==null?void 0:e.title)||((r=n==null?void 0:n.ref)==null?void 0:r.id),(e==null?void 0:e.part)||((s=n==null?void 0:n.ref)==null?void 0:s.part)].filter(Boolean).join(" · ")),i=tg(e);return t?`<div class="reference">מקור: ${i?`<a href="${Ti(i)}" target="_blank" rel="noopener noreferrer">${t} ↗</a>`:t}</div>`:""}function No(n){var e,t;return`<p class="explanation">${Vt(((e=n==null?void 0:n.explanation)==null?void 0:e.he)||"")}</p>${(t=n==null?void 0:n.explanation)!=null&&t.en?`<p class="small-note" dir="ltr">${Vt(n.explanation.en)}</p>`:""}${zu(n)}`}const Fo="ההתקדמות אינה נשמרת בדפדפן הזה. אפשר להמשיך עכשיו, אבל יציאה או רענון עלולים לאבד אותה.";function hc(){ui=!1,de("storage-warning").hidden=!1;const n=document.querySelector(".privacy");if(n&&(n.textContent=Fo+" אין שליחת תשובות או שם."),de("encounter-menu")&&(de("encounter-menu").textContent="השהיה או יציאה · ללא שמירה"),Pt.open&&!document.querySelector(".dialog-save-warning")){const e=document.createElement("p");e.className="dialog-save-warning",e.setAttribute("role","status"),e.textContent=Fo,de("dialog-content").prepend(e)}}function ia(){if(!(!tt||!F||!ui||Uo))try{sessionStorage.setItem(si,JSON.stringify({content:tt,state:F}))}catch{hc()}}function ra(){clearTimeout(Io),Io=null}function zt(n){var r,s;if(!F)return;const e=Jl(F,n,tt.questions);if(e===F)return;const t=F.phase,i=(r=wn(F,tt.questions))==null?void 0:r.id;F=e,Ge&&(Ge=Fx(Ge,F.player)),F.phase!=="explore"&&(Pn.clear(),vr(),pn=null,Ws=!1,Ge&&(Ge={...jr(F.player),heading:Ge.heading})),t==="explore"&&na.has(F.phase)&&(Mn=uc()),t==="explore"&&F.phase==="question"&&!Kr.matches&&(Gt={remaining:dc,encounter:F.activeEncounter}),F.phase!=="question"&&(Gt=null),(n.type!=="tick"||F.phase!==t)&&ia(),F.phase!=="explore"&&(Yt=[]),(t!==F.phase||i!==((s=wn(F,tt.questions))==null?void 0:s.id)||n.type!=="tick")&&(ra(),di())}function pc(){Pt.open&&Pt.close(),Nr!=null&&Nr.isConnected&&Nr.focus({preventScroll:!0})}function on(n,e="button"){const t=na.has(F.phase)&&!Ut;Pt.classList.remove("gift-sheet"),Pt.classList.toggle("cell-sheet",t),Pt.classList.toggle("trap-entry",t&&!!Gt);const i=ui?"":`<p class="dialog-save-warning" role="status">${Fo}</p>`,r=yt&&!Ut&&F.phase!=="complete"?`<button id="encounter-menu" class="reading-button">${Gt?"השהיה":`השהיה או יציאה · ${ui?"ההתקדמות נשמרת":"ללא שמירה"}`}</button>`:"";de("dialog-content").innerHTML=i+n+(t&&!Gt?Jx():"")+r,Ct("encounter-menu",()=>fi("pause")),document.querySelectorAll("[data-cell-action]").forEach(s=>s.addEventListener("click",()=>Qx(s.dataset.cellAction))),document.querySelectorAll(".cell-tools,.feedback-explanation").forEach(s=>s.addEventListener("toggle",()=>{s.open&&F.phase==="feedback"&&mc()})),Pt.open||(Nr=document.activeElement,Pt.showModal()),Pt.scrollTop=0,queueMicrotask(()=>{var s;return(s=de("dialog-content").querySelector("#skip-trap-entry,[data-choice],#continue-button,#skip-capture,#guided-continue,#close-panel,#resume-button"))==null?void 0:s.focus({preventScroll:!0})})}const Dt=(n,e,t=!0)=>`<button id="${n}" class="button ${t?"primary":""}">${e}</button>`,cn=(n,e)=>`<div class="dialog-kicker"><span>${n}</span><span>מבוך הצללים</span></div>${e?`<h2 id="dialog-title">${e}</h2>`:""}`;function Ct(n,e){var t;(t=de(n))==null||t.addEventListener("click",e)}function Oo(){nr=!1,zt({type:"continue"})}function mc(n="המעבר נעצר"){var e;F.phase==="feedback"&&(nr=!0,ra(),de("read-feedback")&&(de("read-feedback").textContent=n),de("feedback-actions")&&(de("feedback-actions").hidden=!1),de("continue-button")||((e=de("feedback-actions"))==null||e.insertAdjacentHTML("beforeend",Dt("continue-button","להמשיך אחרי הקריאה")),Ct("continue-button",Oo)))}function ku(){Gt=null,di(),St==null||St.render(F,Mr())}function ng(){const n=Li().find(e=>e.id===F.activeEncounter);on(cn("מלכודת הופעלה",Vt((n==null?void 0:n.title)||"הכלוב נסגר"))+'<p class="trap-entry-message">השער נסגר. עונים ומשתחררים.</p>'+Dt("skip-trap-entry","לשאלות ←")),Ct("skip-trap-entry",ku)}function ig(){var o;const n=F.phase.startsWith("review"),e=wn(F,tt.questions);if(n&&((o=F.review)!=null&&o.guided)){on(cn("חדר ההיחלצות","הדרך החוצה פתוחה")+"<p>הרימו את הידית. ההתקדמות נשמרת.</p>"+Dt("guided-continue","לפתוח ולהשתחרר")),Ct("guided-continue",()=>zt({type:"guided-continue"}));return}if(!e){on(cn("אפשר להמשיך","חומר התרגול אינו זמין")+'<p>אפשר לחזור לעמוד הבית. ההתקדמות התקינה נשמרה בלשונית הזו.</p><a class="dialog-link" href="/index.html">חזרה ל־PrepX</a>');return}const t=Li().find(l=>l.id===F.activeEncounter),i=F.assignments[F.activeEncounter]||[],r=i.filter(l=>F.answers[l]).length,s=Xx(e),a=n&&F.review.hint?`<p class="explanation">רמז: ${Vt(e.explanation.he)}</p>`:"";on(cn(n?`חדר ההיחלצות · שלב ${F.review.index+1} מתוך 2`:`${Vt(t==null?void 0:t.title)} · שאלה ${r+1} מתוך ${i.length}`,"")+(s.context?`<p class="question-context" id="question-context">${Vt(s.context)}</p>`:"")+`<h2 id="dialog-title">${Vt(s.prompt)}</h2>`+(n?'<p class="small-note">חזרה עם רמזים · בלי איבוד לבבות</p>':"")+a+`<div class="answers">${e.options.map((l,c)=>`<button class="answer" data-choice="${l.original}"><span class="answer-index">${c+1}</span><span>${Vt(l.text)}</span></button>`).join("")}</div><details class="question-source" id="question-source"><summary>מקור השאלה</summary>${zu(e)}</details>`),document.querySelectorAll("[data-choice]").forEach(l=>{let c=!1;l.addEventListener("pointerdown",()=>{c=!0}),l.addEventListener("pointercancel",()=>{c=!1}),l.addEventListener("keydown",f=>{f.repeat&&["Enter"," "].includes(f.key)&&f.preventDefault()}),l.addEventListener("click",f=>{var u;const d=c;c=!1,!(f.detail>0&&!d)&&(F.phase!==(n?"review":"question")||((u=wn(F,tt.questions))==null?void 0:u.id)!==e.id||(nr=!1,zt({type:n?"review-answer":"answer",choice:Number(l.dataset.choice)})))})})}function rg(){var o;const n=F.phase==="review-feedback",e=wn(F,tt.questions),t=n?F.review.correct:(o=F.lastAnswer)==null?void 0:o.correct,i=n&&!t&&F.review.wrong>=2,r=t?n?"השרשרת משתחררת!":"תשובה נכונה!":n?"יש עוד דרך לפתור":"תשובה לא נכונה",s=t?n?"עוד שרשרת השתחררה.":"+10 מטבעות":n?"מנסים שוב עם רמז.":"לב אחד ירד · ממשיכים מכאן",a=e?`<p>התשובה הנכונה: <strong>${Vt(e.choices[e.correct])}</strong></p>`:"";on(cn(n?"חדר ההיחלצות":"תוצאת המלכודת","")+`<div class="feedback-label"><span class="feedback-mark ${t?"":"wrong"}" aria-hidden="true">${t?"✓":"↘"}</span><h2 id="dialog-title">${r}</h2></div><p>${s}</p>`+(i||!n||t?a:"")+(n?No(e):`<details class="feedback-explanation" id="feedback-explanation"><summary>למה זו התשובה?</summary>${No(e)}</details>`)+`<div class="dialog-actions" id="feedback-actions"${!n&&!nr?" hidden":""}>${n?Dt("continue-button",i?"הבנתי, לשחרר את השרשרת":t?"לשלב הבא":"לנסות עם רמז"):nr?Dt("continue-button","להמשיך אחרי הקריאה"):""}</div>`+(n?"":'<button id="read-feedback" class="reading-button">לעצור ולקרוא</button>')),Ct("continue-button",Oo),Ct("read-feedback",()=>{mc(),de("feedback-explanation").open=!0}),!n&&!nr&&(Io=setTimeout(()=>{F.phase==="feedback"&&!F.paused&&!Ut&&Oo()},1500))}function sg(){on(cn("נתפסתם","שתי שרשראות. דרך אחת החוצה.")+"<p>שתי שאלות עם רמזים ישחררו אתכם. ההתקדמות נשמרת.</p>"+Dt("skip-capture","להשתחרר עם רמזים")),Ct("skip-capture",()=>zt({type:"skip-capture"}))}function Vu(n=!1){var r;const e=sr(F,tt.questions),t=((r=globalThis.QuizCore)==null?void 0:r.starsFor(e.score))||0,i=tt.questions.filter(s=>F.answers[s.id]).map(s=>`<div class="review-item"><strong>${F.answers[s.id].correct?"✓":"↘"} ${Vt(s.prompt)}</strong><p>התשובה שלכם: ${Vt(s.choices[F.answers[s.id].choice])}</p><p>התשובה הנכונה: ${Vt(s.choices[s.correct])}</p>${No(s)}</div>`).join("");on(cn("השער פתוח","יצאתם ממבוך הצללים!")+`<p>כל שלושת החותמים שלכם. גם דרך עם טעויות מובילה החוצה.</p><div class="result-grid"><div><strong>${e.score}</strong><small>ציון ידע מתוך 100</small></div><div><strong>${F.coins}</strong><small>מטבעות משחק</small></div><div><strong>${F.captureCount}</strong><small>היחלצויות</small></div></div><p class="small-note">${"★".repeat(t)}${"☆".repeat(3-t)} · הציון מבוסס על התשובות הראשונות בלבד. החזרה בחדר ההיחלצות אינה משנה אותו.</p>`+(n?i:Dt("review-result","לעבור על התשובות",!1))+'<a class="dialog-link" href="/index.html">בחזרה ל־PrepX · לבחור הרפתקה אחרת</a>'),Ct("review-result",()=>Vu(!0)),de("dialog-content").insertAdjacentHTML("beforeend",Dt("change-subject","הרפתקה חדשה · החלפת נושא",!1)),Ct("change-subject",gc)}function fi(n){!yt||F.phase==="complete"||(ra(),Yt=[],Pn.clear(),vr(),pn=null,Ut=n,zt({type:"pause"}),di())}function Fr(){Ut=null,zt({type:"resume"}),di()}function Vl(){if(Ut==="map"){const n=Lt.map((e,t)=>[...e].map((i,r)=>{const s=r===F.player.x&&t===F.player.y,a=Li().find(c=>c.x===r&&c.y===t),o=An.find(c=>{const f=wi(c,F.elapsedMs,F.world);return Math.round(f.x)===r&&Math.round(f.y)===t}),l=s?"●":o?o.kind==="human"?"♟":"·":a?F.resolved.includes(a.id)?"✓":"✧":r===rr.x&&t===rr.y?"↗":i==="S"?"⌂":"";return`<span class="map-cell ${i==="#"?"wall":""} ${F.visited.includes(`${r},${t}`)?"visited":""} ${a?"seal":""} ${s?"player":""}" aria-hidden="true">${l}</span>`}).join("")).join("");on(cn("מפה · הזמן נעצר","מצאו את הדרך שלכם")+`<div class="map-grid" style="grid-template-columns:repeat(${Lt[0].length},1fr);aspect-ratio:${Lt[0].length}/${Lt.length}" role="img" aria-label="מפת המבוך. נקודה מסמנת אתכם, כוכב מסמן מלכודת, חץ מסמן יציאה.">${n}</div><p class="map-legend">● אתם כאן · ✧ מלכודת · ✓ הושלמה · ♟ דמות · ↗ יציאה<br>הגן המזרחי והחורבות בדרום מחוברים למבוך בכמה מעברים. חפשו דמויות, חיות ומשאבת מים.</p>`+Dt("close-panel","חזרה למבוך")),Ct("close-panel",Fr)}else if(Ut==="world"){const n=F.world.dialogue,e=(n==null?void 0:n.entityId)==="scout",t=(n==null?void 0:n.entityId)==="rabbit";on(cn(e?"מפגש עם סייר השבילים":"מפגש בגן",Vt((n==null?void 0:n.title)||"אורח בשביל"))+`<p>${Vt((n==null?void 0:n.text)||"יש עוד הרבה לגלות בין השבילים.")}</p><p class="small-note" id="world-topic-text">אפשר לעצור, לשאול ולהכיר את המקום. אין כאן שאלת מבחן.</p><div class="dialog-actions">${t&&!F.world.rabbitFed?Dt("feed-rabbit","לתת לארנב גזר 🥕"):""}${t?"":Dt("world-topic","מה עוד יש באזור?",!1)}${Dt("close-panel",t&&F.world.rabbitFollowing?"לצאת לדרך יחד":"להמשיך לחקור")}</div>`),Ct("close-panel",Fr),Ct("feed-rabbit",()=>{zt({type:"resume"}),zt({type:"world-interact",entityId:"rabbit",intent:"feed"}),zt({type:"pause"}),St==null||St.render(F,Mr())}),Ct("world-topic",()=>{de("world-topic-text").textContent=e?"השביל המואר מוביל למלכודת שטרם סיימתם. בגן המזרחי תמצאו שומרת, משאבה ובעלי חיים. המעברים הדרומיים חוזרים לחצר — אין צורך להתחיל מחדש.":"כשממלאים את קערת המים, השועל מגיע לשתות. אפשר להתקרב אליו ולהציע לו ללכת איתכם. בחורבות מחכה ינשוף, ובין השיחים מסתתר ארנב."})}else Ut==="journal"?(on(cn("יומן הדרך · הזמן נעצר","רמזים שנשארים איתכם")+`<p class="small-note">מתנות שנאספו: ${F.giftsSeen.length} ✧</p><ul class="hint-list"><li>מצאו את המלכודות המסומנות בחותם זוהר. בכל אחת עד שלוש שאלות.</li><li>השלמת השאלות נותנת חותם, גם אחרי טעות.</li><li>כדי להשתחרר מכלוב, אפשר להיעזר ברמזים. אחרי שתי טעויות תקבלו פתרון מודרך.</li>${F.clues.length?"<li>החריטה שגיליתם: שלושה חותמים פותחים את השער. לא צריך לענות נכון על הכול.</li>":"<li>חפשו חריטה מוארת על קיר המבוך.</li>"}${F.treasureCollected?"<li>גיליתם את חדר האוצר הסודי!</li>":""}<li>מפגשים בגנים ובחורבות: ${Object.keys(F.world.interactions).length} מתוך ${An.length}.</li>${F.world.scoutGuided?"<li>הסייר סימן את הדרך למלכודת הקרובה שטרם הושלמה.</li>":""}${F.world.waterFilled?"<li>מילאתם את קערת המים בגן.</li>":""}${F.world.foxFollowing?"<li>השועל מכיר אתכם ומלווה אתכם בשביל.</li>":""}</ul>`+Dt("close-panel","חזרה להרפתקה")),Ct("close-panel",Fr)):(on(cn("המשחק בהשהיה","הדרך תחכה לכם")+`<p>${ui?"ההתקדמות נשמרת בלשונית הזו.":"ההתקדמות אינה נשמרת. הישארו בלשונית הזו כדי להמשיך."} הלבבות, היצורים והמלכודות מחכים עד שתחזרו.</p><p class="small-note">תנועה: החצים או WASD. אפשר ללחוץ על שביל. E לבדיקה מקרוב. F למסך מלא.</p>`+Dt("resume-button","להמשיך מאותו מקום")+`<a class="dialog-link" href="/index.html">חזרה ל־PrepX · ${ui?"ההתקדמות תישמר":"ללא שמירה"}</a>`),de("dialog-content").insertAdjacentHTML("beforeend",Dt("change-subject","הרפתקה חדשה · החלפת נושא",!1)),Ct("change-subject",gc),Ct("resume-button",Fr))}function di(){if(!F)return;Fu();const n=yt&&na.has(F.phase);document.body.dataset.encounter=String(n),de("maze-canvas").setAttribute("aria-label",n?"מבט מגוף ראשון בתוך כלוב. מעבר לסורגים עומד השומר. השתמשו בכפתורי הכלוב כדי להביט, להאיר ולבדוק.":"מבוך תלת־ממדי. תנועה עם החצים או WASD, או לחיצה על שביל."),de("hearts").textContent=Array.from({length:3},(t,i)=>i<F.hearts?"♥":"♡").join(" "),de("hearts").setAttribute("aria-label",`${F.hearts} לבבות מתוך 3`),de("coins").textContent=F.coins,de("seals").textContent=`${F.seals.length} / 3`,de("offline-badge").hidden=!tt.offline;const e=sr(F,tt.questions);if(Qi=[],F.world.scoutGuided)for(const t of Li().filter(i=>!F.resolved.includes(i.id))){const i=Fs(F.player,t);i&&(!Qi.length||i.length<Qi.length)&&(Qi=i)}if(de("location-label").textContent=n?"בתוך הכלוב · מבט מגוף ראשון":e.complete?"שער היציאה מחכה":ai.find(t=>t.id===F.layoutId).title,de("objective-text").textContent=e.complete?"סיימתם את המלכודות. מצאו את השער הזוהר.":`מלכודות ${e.trapsResolved} מתוך ${e.trapsTotal} · ${e.answered} מתוך ${e.total} שאלות`,de("notice").textContent=F.notice||`מפגשים בעולם: ${Object.keys(F.world.interactions).length} מתוך ${An.length}. הסייר מחכה בשבילים, ובגן המזרחי יש עוד דמויות ובעלי חיים.`,document.querySelectorAll("[data-direction],#interact-button").forEach(t=>t.disabled=!yt||F.paused||F.phase!=="explore"),!!yt){if(Ut){Vl();return}if(F.paused){Ut="pause",Vl();return}fr()?og():Gt&&F.phase==="question"?ng():F.phase==="question"||F.phase==="review"?ig():F.phase==="feedback"||F.phase==="review-feedback"?rg():F.phase==="capture"?sg():F.phase==="complete"?Vu():pc()}}function Bo(n){!yt||Pt.open||Ut||F.phase!=="explore"||Bu[n]&&(Yt=[],pn=n)}function xc(){if(!yt||F.paused||F.phase!=="explore")return;if(Ge!=null&&Ge.target){Ws=!0,Pn.clear(),vr(),Yt=[],pn=null;return}Ws=!1;const n=ko(F.player,F.world,F.elapsedMs);n?(zt({type:"world-interact",entityId:n.id}),(n.kind==="human"||n.id==="rabbit")&&fi("world"),St==null||St.render(F,Mr())):zt({type:"interact"})}function Gu(){if(!yt||F.phase!=="explore"||F.paused)return;const n=ko(F.player,F.world,F.elapsedMs),e=(n==null?void 0:n.actionLabel)||"לבדוק מקרוב";de("interact-button").textContent!==e&&(de("interact-button").textContent=e)}function Hu(n){var a,o;if(!Ge||!yt)return;const e=ir||[...Pn].at(-1)||pn,t=e?Bu[e]:null,i=Ge.target;let r=!!(ir||Pn.size);if(!t&&Yt.length>1){const l=Yt[0],c=Yt[1];r=c.x-l.x===l.x-Ge.origin.x&&c.y-l.y===l.y-Ge.origin.y}const s=zx(Ge,{direction:t?{dx:t[0],dy:t[1]}:void 0,nextCell:t?void 0:Yt[0],continuous:r,canWalk:ln,paused:F.paused||F.phase!=="explore"||Pt.open,dt:n/1e3});Ge=s.movement,pn&&(Ge.target||s.arrived||!ln(Ge.origin.x+((t==null?void 0:t[0])||0),Ge.origin.y+((t==null?void 0:t[1])||0)))&&(pn=null),s.arrived&&(((a=Yt[0])==null?void 0:a.x)===s.arrived.x&&((o=Yt[0])==null?void 0:o.y)===s.arrived.y&&Yt.shift(),zt({type:"move",dx:s.arrived.dx,dy:s.arrived.dy}),Ws&&xc()),!i&&!Ge.target&&!s.arrived&&t&&(pn=null),Gu()}function Wu(){!F||!St||(Xs=Nu(),de("nearby-greeting").removeAttribute("data-sequence"),yt=!0,document.body.dataset.intro="false",de("intro").hidden=!0,F.paused&&(F=Jl(F,{type:"resume"},tt.questions)),Ut=null,Ge=jr(F.player),ia(),di(),Gu(),St.resize(),de("maze-canvas").focus({preventScroll:!0}))}de("start-button").addEventListener("click",Wu);de("pause-button").addEventListener("click",()=>fi("pause"));de("map-button").addEventListener("click",()=>fi("map"));de("journal-button").addEventListener("click",()=>fi("journal"));de("world-map-button").addEventListener("click",()=>fi("map"));de("interact-button").addEventListener("click",xc);document.querySelectorAll("[data-direction]").forEach(n=>{n.addEventListener("pointerdown",e=>{e.button!==0||n.disabled||(e.preventDefault(),n.setPointerCapture(e.pointerId),Ns.set(e.pointerId,n.dataset.direction),ir=n.dataset.direction,Bo(ir))});for(const e of["pointerup","pointercancel","lostpointercapture"])n.addEventListener(e,t=>{Ns.delete(t.pointerId)&&(ir=[...Ns.values()].at(-1)||null,e!=="pointerup"&&(pn=null))});n.addEventListener("click",e=>{e.detail===0&&Bo(n.dataset.direction)})});Pt.addEventListener("cancel",n=>{var e,t;n.preventDefault(),Ut==="subjects"?(e=de("cancel-subject"))!=null&&e.disabled||(t=de("cancel-subject"))==null||t.click():Ut?Fr():fr()?zt({type:"collect-gift",id:fr()}):F.phase==="explore"&&pc()});const qs={ArrowUp:"up",ArrowRight:"right",ArrowDown:"down",ArrowLeft:"left",w:"up",d:"right",s:"down",a:"left"};window.addEventListener("keydown",n=>{var t,i,r;if(n.ctrlKey||n.metaKey||n.altKey)return;const e=qs[n.key]||qs[n.key.toLowerCase()];e&&yt&&!Pt.open&&(n.preventDefault(),n.repeat||(Yt=[],Bo(e),Pn.add(e))),n.key==="Escape"&&yt&&!Pt.open&&(n.preventDefault(),fi("pause")),n.key.toLowerCase()==="e"&&yt&&!Pt.open&&xc(),n.key.toLowerCase()==="f"&&yt&&!Pt.open&&(document.fullscreenElement?(t=document.exitFullscreen)==null||t.call(document):(r=(i=document.querySelector(".game-shell")).requestFullscreen)==null||r.call(i).catch(()=>{}))});window.addEventListener("keyup",n=>Pn.delete(qs[n.key]||qs[n.key.toLowerCase()]));window.addEventListener("blur",()=>{Pn.clear(),vr(),pn=null,Yt=[]});document.addEventListener("visibilitychange",()=>{document.hidden&&yt&&!F.paused&&F.phase!=="complete"&&fi("pause")});de("maze-canvas").addEventListener("click",n=>{if(!yt||Pt.open||F.phase!=="explore")return;const e=St.cellFromPointer(n.clientX,n.clientY);if(e&&ln(e.x,e.y)){Pn.clear(),vr(),pn=null;const t=(Ge==null?void 0:Ge.target)||F.player;Yt=Fs(t,e)||[],Ge!=null&&Ge.target&&Yt.unshift({...Ge.target})}});function Xu(n){!F||!yt||fr()||(Gt&&!F.paused&&!Ut&&(Gt.remaining=Math.max(0,Gt.remaining-n),(Gt.remaining===0||Kr.matches)&&ku()),Mn=Iu(Mn,{type:"tick",dt:n},Ou()),zt({type:"tick",ms:n,moving:!!(Ge!=null&&Ge.target)}),Kr.matches&&F.phase==="capture"&&zt({type:"skip-capture"}),Xs=Zx(Xs,{dt:n,player:(Ge==null?void 0:Ge.position)||F.player,world:F.world,elapsedMs:F.elapsedMs,phase:F.phase,paused:F.paused||!yt}),Fu())}window.advanceTime=n=>{for(let e=Math.min(n,6e4);e>0;e-=16.667){const t=Math.min(16.667,e);Hu(t),Xu(t)}St==null||St.render(F,Mr())};window.render_game_to_text=()=>{var n;return JSON.stringify(F?{coordinates:"tile origin upper-left; x right/east, y down/south; directions are world axes",layoutId:F.layoutId,gifts:F.giftsSeen,pendingGift:fr(),maze:Lt,quizId:tt.id,started:yt,phase:F.phase,paused:F.paused,player:F.player,movement:Ge,greeting:fc(),world:F.world,worldEntities:An.map(e=>({...e,position:wi(e,F.elapsedMs,F.world)})),nearbyEntity:((n=ko(F.player,F.world,F.elapsedMs))==null?void 0:n.id)||null,hearts:F.hearts,coins:F.coins,seals:F.seals,progress:sr(F,tt.questions),activeEncounter:F.activeEncounter,review:F.review,captureCount:F.captureCount,captureMs:F.captureMs,elapsedMs:F.elapsedMs,graceMs:F.graceMs,currentQuestion:wn(F,tt.questions)?{id:wn(F,tt.questions).id,options:wn(F,tt.questions).options}:null,encounters:Li().map(e=>({...e,resolved:F.resolved.includes(e.id),questions:F.assignments[e.id].length,answered:F.assignments[e.id].filter(t=>F.answers[t]).length})),exit:rr,clues:F.clues,treasureCollected:F.treasureCollected,notice:F.notice,source:tt.source,contentVersion:tt.version,storageAvailable:ui,panel:Ut,trapEntry:Gt?{active:!0,elapsedMs:dc-Gt.remaining,remainingMs:Gt.remaining,encounter:Gt.encounter}:null,view:na.has(F.phase)&&yt?"first-person-cage":"maze",interaction:Mn}:{phase:"loading"})};function qu(n){const e=Ba?Math.min(100,n-Ba):0;Ba=n,F&&(Hu(e),Xu(e),za+=e,za>1500&&(ia(),za=0),St==null||St.render(F,Mr())),requestAnimationFrame(qu)}function Yu(){Ge=jr(F.player),Qi=[];const n=de("quiz-select");n.innerHTML=Hr.map(t=>`<option value="${Ti(t.id)}">${Vt(t.title)}</option>`).join(""),n.value=tt.id;const e=Object.keys(F.answers).length>0||F.visited.length>1;n.disabled=e,de("new-adventure-button").hidden=!e,de("start-button").textContent=e?"להמשיך מאותו מקום":"להיכנס למבוך ←",de("start-button").disabled=!1,n.addEventListener("change",async()=>{n.disabled=!0,de("start-button").disabled=!0,de("start-button").textContent="טוענים את חומר התרגול…";try{tt=await Ks({quizId:n.value}),F=Zr(tt.questions),Ge=jr(F.player),ia(),di(),de("start-button").textContent="להיכנס למבוך ←"}catch{de("notice").textContent="לא הצלחנו לטעון תרגול. אפשר לנסות שוב או לחזור ל־PrepX."}finally{n.disabled=!1,de("start-button").disabled=!1}}),de("layout-name").textContent=ai.find(t=>t.id===F.layoutId).title,di(),requestAnimationFrame(qu)}function ag(n){return`<svg viewBox="0 0 100 104" width="106" height="110" aria-hidden="true">${['<polygon points="20,24 50,8 80,24 94,46 50,96 6,46" fill="#f2c477"/><path d="M20 24 34 46 50 8 66 46 80 24M6 46H94M34 46 50 96 66 46" fill="none" stroke="#fff2c9" stroke-width="3"/><path d="M66 46H94L50 96Z" fill="#ac7139"/><path d="M20 24 6 46H34Z" fill="#fff0bc"/>','<circle cx="50" cy="28" r="20" fill="none" stroke="#f2c477" stroke-width="12"/><path d="M50 49V94M50 72H72M50 86H65" fill="none" stroke="#f2c477" stroke-width="12" stroke-linecap="round"/>','<path d="m50 5 13 30 32 4-24 23 7 33-28-17-28 17 7-33L5 39l32-4Z" fill="#f2c477" stroke="#fff0bb" stroke-width="3"/><path d="M50 5V78L29 62Z" fill="#fff0bb"/>'][n%3]}</svg>`}function og(){const n=fr(),e=Li().findIndex(i=>i.id===n),t=["גביש אור","מפתח הירח","כוכב השומר","אבן להבה","פנינת ההד","נוצת הלחישות","אבן רונות","טיפת אור","קשת זהב","יהלום הכספת"];on(cn("המלכודת הושלמה!","מתנה לדרך")+`<div class="gift-scene" aria-hidden="true"><div class="gift-rays"></div><div class="gift-gem">${ag(e)}</div>${Array.from({length:12},(i,r)=>`<i style="--i:${r}"></i>`).join("")}</div><h3 class="gift-name">${t[e]||"גביש אור"}</h3><p class="gift-description">מתנה לאוסף שלכם · גם אחרי טעויות ממשיכים!</p>`+Dt("collect-gift","לקחת ולהמשיך ←")),Pt.classList.add("gift-sheet"),de("collect-gift").focus({preventScroll:!0}),Ct("collect-gift",()=>{Pt.classList.remove("gift-sheet"),zt({type:"collect-gift",id:n})})}function gc(){var e;ra(),Pn.clear(),vr(),pn=null,Yt=[],yt&&F.phase!=="complete"&&zt({type:"pause"}),Ut="subjects",on(cn("הרפתקה חדשה","מה מתרגלים עכשיו?")+`<label for="new-subject">נושא לתרגול</label><select id="new-subject">${Hr.map(t=>`<option value="${Ti(t.id)}">${Vt(t.title)}</option>`).join("")}</select><p class="small-note">ההרפתקה הנוכחית תישמר בלשונית הזו. הרפתקה חדשה מתחילה במבוך אחר.</p><p id="subject-error" role="status"></p>`+Dt("new-subject-start","להתחיל הרפתקה חדשה")+Dt("resume-subject","לחזור להרפתקה השמורה בנושא הזה",!1)+Dt("cancel-subject","חזרה למשחק",!1)),Pt.classList.remove("gift-sheet"),de("new-subject").value=((e=Hr.find(t=>t.id!==tt.id))==null?void 0:e.id)||tt.id;const n=()=>{try{de("resume-subject").hidden=!sessionStorage.getItem(si+"-subject-"+de("new-subject").value)}catch{de("resume-subject").hidden=!0}};n(),de("new-subject").addEventListener("change",n),Ct("new-subject-start",()=>Gl(!1)),Ct("resume-subject",()=>Gl(!0)),Ct("cancel-subject",()=>{Ut=null,yt?(zt({type:"resume"}),di()):pc()}),de("new-subject").focus({preventScroll:!0})}async function Gl(n){const e=de("new-subject").value;document.querySelectorAll("#dialog-content button,#new-subject").forEach(t=>t.disabled=!0);try{if(!ui)throw new Error("Storage unavailable");let t;if(n){const s=sessionStorage.getItem(si+"-subject-"+e);t=sessionStorage.getItem(s);const a=JSON.parse(t),o=Bs(a.content,{pinned:!0});if(o.id!==e||!Ql(a.state,o.questions))throw new Error("Invalid archived run")}else{const s=await Ks({quizId:e}),a=ai.findIndex(o=>o.id===F.layoutId);Or(ai[(a+1)%ai.length].id),t=JSON.stringify({content:s,state:Zr(s.questions)})}Or(F.layoutId);const i=JSON.stringify({content:tt,state:F}),r=si+"-run-"+Date.now();if(sessionStorage.setItem(r,i),sessionStorage.getItem(r)!==i)throw new Error("Archive not verified");sessionStorage.setItem(si+"-subject-"+tt.id,r),Uo=!0,sessionStorage.setItem(si,t),location.reload()}catch{Uo=!1,Or(F.layoutId),de("subject-error").textContent="לא הצלחנו לפתוח הרפתקה. המשחק הנוכחי נשאר כאן; אפשר לנסות שוב.",document.querySelectorAll("#dialog-content button,#new-subject").forEach(t=>t.disabled=!1)}}de("new-adventure-button").addEventListener("click",gc);async function cg(n,e){var t;e.disabled=!0;try{const i=await Ks({quizId:Os});try{const r=si+"-unrestorable-"+Date.now();if(sessionStorage.setItem(r,n),sessionStorage.getItem(r)!==n)throw new Error("Backup verification failed")}catch{hc()}tt=i,Or(),F=Zr(tt.questions),St||(St=Pu(de("maze-canvas"))),de("start-button").onclick=null,de("quiz-select").hidden=!1,(t=document.querySelector(".recovery-actions"))==null||t.remove(),Yu(),Wu()}catch{e.disabled=!1,de("notice").textContent="לא הצלחנו לפתוח הרפתקה נפרדת. השמירה הקודמת נשארה ללא שינוי."}}async function lg(){document.body.dataset.intro="true";try{let n=null,e=!1,t=null;try{t=sessionStorage.getItem(si)}catch{hc()}if(t)try{const i=JSON.parse(t),r=Bs(i.content,{pinned:!0}),s=Ql(i.state,r.questions);s?n={content:r,state:s}:e=!0}catch{e=!0}if(e){de("start-button").textContent="לנסות לשחזר שוב",de("start-button").disabled=!1,de("notice").textContent="לא הצלחנו לשחזר את ההרפתקה. השמירה הקודמת נשארה ללא שינוי.",de("start-button").onclick=()=>location.reload(),de("quiz-select").hidden=!0;const i=document.createElement("div");i.className="recovery-actions";const r=document.createElement("button");r.id="new-expedition-button",r.className="button",r.textContent="הרפתקה נפרדת · שמירת העותק הישן",r.addEventListener("click",()=>cg(t,r)),i.append(r);const s=document.createElement("a");s.className="dialog-link",s.href="/index.html",s.textContent="חזרה ל־PrepX בלי לשנות את השמירה",i.append(s),de("start-button").after(i);return}if(n)tt=n.content,F=n.state;else{const i=new URLSearchParams(location.search).get("quiz")||Os,r=Hr.some(s=>s.id===i);tt=await Ks({quizId:r?i:Os}),F=Zr(tt.questions),r||(F.notice="הקישור הפנה לתרגול לא מוכר. בחרנו תרגול זמין; אפשר לבחור אחר לפני הכניסה.")}try{St=Pu(de("maze-canvas"))}catch{de("renderer-error").hidden=!1;return}Yu()}catch{de("start-button").textContent="לנסות לטעון שוב",de("start-button").disabled=!1,de("start-button").onclick=()=>location.reload(),de("notice").textContent="חומר התרגול לא נטען. אפשר לנסות שוב בלי לאבד התקדמות."}}lg();
